# 部署指南

Lumière 是纯前端静态站点，所有依赖（含字体与图片）均已内置，**目标服务器不需要访问公网**。

---

## 1. 构建

在开发机上完成构建：

```bash
npm ci
npm run build
```

产物：

```
.next/            # Next.js 构建输出（含静态导出）
```

由于页面全部为静态预渲染，也可用 `output: "export"` 导出纯静态目录（见第 4 节）。

---

## 2. 直接托管 `next start`

```bash
npm start                 # 默认 3000 端口
PORT=8080 npm start       # 自定义端口
```

适合内网服务器直接运行。

---

## 3. Nginx 托管静态资源

### 3.1 导出静态目录

在 `next.config.ts` 中开启静态导出：

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  outputFileTracingRoot: process.cwd(),
  images: { unoptimized: true },   // 导出模式下禁用图片优化
  turbopack: { root: process.cwd() },
};

export default nextConfig;
```

```bash
npm run build
# 产物位于 out/
```

### 3.2 Nginx 配置

```nginx
server {
    listen 80;
    server_name lumiere.example.internal;

    root /var/www/lumiere/out;
    index index.html;

    # 带 hash 的静态资源长缓存
    location /_next/static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /images/ {
        expires 30d;
        add_header Cache-Control "public";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
    gzip_min_length 1024;
}
```

---

## 4. Docker（内网可构建）

### 4.1 Dockerfile

```dockerfile
# ---- 构建阶段（需要能访问 npm registry）----
FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- 运行阶段（无需公网）----
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./

EXPOSE 3000
CMD ["npm", "start"]
```

### 4.2 构建与推送到内网镜像仓库

```bash
# 在开发机完成构建（此步可访问公网）
docker build -t registry.internal.lumiere/lumiere-store:1.0.0 .

docker push registry.internal.lumiere/lumiere-store:1.0.0
```

### 4.3 目标服务器部署

```bash
# 目标服务器无需访问公网，仅需能访问内网镜像仓库
docker pull registry.internal.lumiere/lumiere-store:1.0.0

docker run -d \
  --name lumiere-store \
  --restart unless-stopped \
  -p 3000:3000 \
  registry.internal.lumiere/lumiere-store:1.0.0
```

若目标环境不便访问镜像仓库：

```bash
# 开发机导出镜像
docker save registry.internal.lumiere/lumiere-store:1.0.0 | gzip > lumiere-store-1.0.0.tar.gz

# 通过受控方式传输后，在目标主机导入
gunzip -c lumiere-store-1.0.0.tar.gz | docker load
docker run -d --name lumiere-store -p 3000:3000 lumiere-store:1.0.0
```

### 4.4 docker-compose 示例

```yaml
services:
  lumiere:
    image: registry.internal.lumiere/lumiere-store:1.0.0
    container_name: lumiere-store
    restart: unless-stopped
    ports:
      - "3000:3000"
```

---

## 5. 离线部署检查清单

发布到内网 / 生产前逐条确认：

- [ ] 镜像、依赖、运行时资源已全部包含在镜像内或已在内网准备好
- [ ] 部署配置使用内网镜像地址或已预加载的固定 tag / digest
- [ ] 目标服务器不需要临时访问公网
- [ ] 未把任何公网凭据、内网凭据或生产密钥写入镜像、代码、日志或提交内容
- [ ] 字体与图片均为本地资源，无外链 CDN 请求

> 本项目已满足以上全部条件：`src/assets/fonts/` 自托管字体、`public/images/` 本地图片、`package-lock.json` 锁定依赖、构建产物不含任何凭据。

---

## 6. 验证部署结果

```bash
curl -I http://<host>:3000/            # 期望 200
curl -s http://<host>:3000/ | grep -c "科技点亮"   # 期望 ≥ 1
```

浏览器打开后确认：图片全部加载（无破图）、字体为 Plus Jakarta Sans、中文正常显示、粒子与玻璃效果生效。
