# 参与贡献

欢迎为 Lumière 贡献改进。

## 快速开始

```bash
npm install
npm run dev
```

提交前必须通过：

```bash
npm run lint
npm run build
```

## 提交规范

- 一个提交只做一件事，提交信息首行用中文或英文祈使句，控制在 72 字符内
- 新增依赖前先确认 Tailwind / Motion 已无法满足需求
- 涉及视觉改动的提交，请附上改动前后的截图

## 视觉改动规范

1. **只改令牌，不改硬编码**——颜色、圆角、阴影请在 `src/app/globals.css` 的 `@theme` 中调整
2. **保持马卡龙色相**——新增颜色请取自现有五个色族，阴影保持紫灰色相 `rgba(96,78,118,…)`
3. **动效克制**——新增动画时长不超过 0.8s，且不得在 hover 时产生位移（会破坏点击热区）
4. **对比度**——玻璃底上的正文对比度需 ≥ 4.5:1

完整规范见 [`docs/DESIGN-SYSTEM.md`](docs/DESIGN-SYSTEM.md)。

## 提交检查清单

- [ ] `npm run lint` 零告警
- [ ] `npm run build` 通过
- [ ] 1440 / 820 / 390 / 1920 四种宽度无溢出
- [ ] 新增交互元素带 `aria-label`，可键盘操作
- [ ] `prefers-reduced-motion: reduce` 下内容完整可见
- [ ] 未提交任何凭据、密钥或 `.env` 文件

## 多平台同步

项目同时维护 GitHub 与 Gitee 两个远程仓库：

- GitHub：`https://github.com/DeLaNeige517/lumiere-store`
- Gitee：`https://gitee.com/hugo-zhe/lumiere-store`

推送命令：

```bash
git push origin main                       # GitHub（origin 为默认上游）
git push gitee main                        # Gitee
npm run sync:gitee                        # Gitee：建仓 + 设置描述 + 推送（需令牌）
```

Gitee 同步脚本需要私人令牌（`projects` 权限），令牌来源二选一：

```bash
export GITEE_TOKEN=xxxxxxxx                # 方式一：环境变量
echo xxxxxxxx > ~/.gitee_token && chmod 600 ~/.gitee_token   # 方式二：本地文件
```

> 令牌只写入环境变量或 `~/.gitee_token`（权限 600），**不要**写进脚本、仓库或提交记录。

---

## 问题反馈

提交 Issue 时请附上：复现步骤、浏览器与分辨率、期望行为与实际行为、相关截图。
