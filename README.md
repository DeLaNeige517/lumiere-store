# Lumière 露弥尔 · 科技点亮更好的日常

一个高保真的 **科技生活方式电商首页**，采用 Apple 极简设计语言 + 奶油马卡龙配色 + Glassmorphism 玻璃拟态 + 轻粒子特效。

> 本站为演示项目：商品、评价、价格均为模拟数据，不含真实后端、数据库与支付系统。

---

## 快速开始

```bash
npm install
npm run dev        # 开发模式 → http://localhost:3000
npm run build      # 生产构建
npm run start      # 启动生产服务
npm run lint       # ESLint 检查
```

要求 Node.js ≥ 20（开发使用 Node 24）。

---

## 技术栈

| 能力 | 选型 | 说明 |
| --- | --- | --- |
| 框架 | **Next.js 16**（App Router）+ React 19 | 全站静态预渲染，构建产物为纯静态页面 |
| 语言 | **TypeScript**（strict） | 全量类型安全，`npm run build` 内含类型检查 |
| 样式 | **Tailwind CSS v4** | 采用 CSS-first `@theme` 设计令牌，无 `tailwind.config.ts` |
| 动画 | **Motion for React**（`motion` v14） | 滚动淡入、视差、布局动画、抽屉与弹层过渡 |
| 图标 | **lucide-react** | 全站统一线性图标风格 |
| 字体 | 本地自托管 | Plus Jakarta Sans + Instrument Serif（`next/font/local`） |

### 离线可构建

字体文件与全部图片都已下载到仓库内（`src/assets/fonts/`、`public/images/`），构建过程 **不依赖公网**，可直接在无外网环境编译与部署。

---

## 目录结构

```
src/
├── app/
│   ├── layout.tsx            # 根布局：本地字体、metadata、StoreProvider
│   ├── page.tsx              # 首页组合 + 全局渐变背景
│   ├── globals.css           # 设计系统：@theme 令牌、玻璃工具类、关键帧
│   └── icon.svg              # 品牌图标（favicon）
├── assets/fonts/             # 自托管 woff2 字体
├── components/
│   ├── providers/
│   │   └── StoreProvider.tsx # 购物车 / 收藏 / 分类 / 搜索的全局状态（useReducer）
│   ├── layout/
│   │   ├── Navbar.tsx        # 固定磨砂导航、滚动增强、搜索下拉、移动端菜单
│   │   ├── Footer.tsx        # 品牌区、链接分栏、社交、邮件订阅
│   │   ├── CartDrawer.tsx    # 购物车抽屉（数量增减、免运费进度）
│   │   ├── WishlistDrawer.tsx# 收藏夹抽屉
│   │   ├── SearchPanel.tsx   # 全屏搜索面板（移动端 / 快捷入口）
│   │   ├── Toaster.tsx       # 轻量 Toast 反馈
│   │   └── BrandMark.tsx     # 品牌 Logo 图形
│   ├── sections/             # Hero / Categories / Collections / FeaturedProducts
│   │                         # / PromoBanner / Inspiration / Testimonials
│   ├── commerce/
│   │   └── ProductCard.tsx   # 商品卡：图片、评分、色卡、收藏、加购
│   ├── effects/
│   │   ├── Particles.tsx     # Canvas 微粒场（移动端降密度、可暂停）
│   │   ├── AuroraBackdrop.tsx# 动态渐变光晕
│   │   ├── Reveal.tsx        # 滚动淡入封装
│   │   └── Spotlight.tsx     # 鼠标跟随高光 Hook
│   └── ui/                   # Button / GlassCard / Drawer / SectionHeading / StarRating
├── lib/
│   ├── data.ts               # 全部模拟数据（商品、分类、系列、文章、评价）
│   ├── motion.ts             # 共享动效变体与缓动
│   └── utils.ts              # cn()、价格格式化
└── types/index.ts            # 领域类型
```

---

## 设计系统

### 配色（奶油马卡龙）

| 名称 | 主色 | 用途 |
| --- | --- | --- |
| 奶油白 `cream` | `#FFFCFA` → `#F6EEE5` | 页面底色、卡片底 |
| 浅粉 `blush` | `#FCE8EF` / `#E8A2BA` | 主视觉光晕、标签、强调 |
| 淡紫 `lilac` | `#F0EAFC` / `#B3A0E6` | 玻璃高光、次级强调 |
| 雾霾蓝 `mist` | `#E6F1F9` / `#83AAD2` | 冷调平衡、科技感 |
| 香槟金 `champagne` | `#F9F0DC` / `#E0C48F` | 评分、价格、质感 |
| 墨色 `ink` | `#24212C` → `#B7B3BF` | 文字层级 |

标题渐变 `text-aurora`、玻璃工具类 `.glass / .glass-strong / .glass-soft`、描边 `.gradient-ring`、鼠标高光 `.glass-card` 均定义在 `globals.css`。

### 动效

- **粒子**：`Particles.tsx` 使用 Canvas + `requestAnimationFrame`，移动端自动降到 45% 密度，页面不可见时自动暂停。
- **减少动态效果**：`prefers-reduced-motion: reduce` 时，粒子只绘制一帧静态分布，所有 CSS 过渡被禁用；Motion 动画降级为纯淡入。
- **滚动**：模块进入视口时淡入上移；导航栏滚动后增强背景模糊与描边。
- **视差**：Hero 主视觉与内容随滚动产生不同速率的位移。
- **交互**：卡片悬浮上浮、图片缩放、玻璃高光跟随鼠标；按钮有扫光与按压反馈。

---

## 功能说明

| 功能 | 位置 | 行为 |
| --- | --- | --- |
| 商品分类筛选 | 分类卡片 + 人气单品筛选条 | 6 个分类实时过滤商品，带数量角标与空状态 |
| 搜索 | 导航栏输入框 / 移动端搜索面板 | 实时匹配名称、副标题、描述与标签，并显示命中数量 |
| 收藏 | 商品卡心形按钮 | 收藏数量角标 + 收藏夹抽屉，可一键全部加购 |
| 购物车 | 导航栏购物袋 | 抽屉式购物车，数量增减、移除、小计与免运费进度条 |
| 查看全部 | 人气单品区 | 默认展示 6 件，可展开全部 9 件商品 |
| 邮件订阅 | 页脚 | 邮箱格式校验 + 成功态切换 |
| 移动端菜单 | 导航栏汉堡 | 侧滑抽屉，含导航、搜索与购物车入口 |

所有按钮均有明确行为；涉及演示环境的入口（账户、文章详情、结算、社交链接）会以 Toast 明确说明。

---

## 图片资源

全部 18 张商品 / 场景照片由 `mmx` CLI 生成（`image-01` 模型），统一使用「奶油马卡龙 + 柔光棚拍 + 极简高端」风格提示词，保证整站视觉一致。

```bash
# 重新生成图片（需 mmx CLI 已登录）
bash scripts/generate-images.sh
bash scripts/generate-images-2.sh

# 压缩优化（2.53MB → 0.68MB）
node scripts/optimize-images.mjs

# 重新抓取本地字体（可选）
node scripts/fetch-fonts.mjs
```

图片存放于 `public/images/{hero,products,collections,lifestyle,promo}`，商品图通过 `next/image` 按需优化输出。

---

## 验证记录

- `npm run build` ✅ 通过，无警告；`npm run lint` ✅ 零告警。
- Playwright + Chrome 实机回归：桌面 1440px / 平板 820px / 移动 390px / 超宽 1920px 截图校验。
- 交互回归：分类筛选、搜索、收藏、购物车加减、展开全部、订阅提交 —— 全部通过，**控制台零错误**。
- `prefers-reduced-motion: reduce` 下内容完整可见，无元素停留在不可见状态。
