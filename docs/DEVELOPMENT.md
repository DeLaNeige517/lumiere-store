# 开发指南

---

## 1. 环境准备

```bash
node -v      # 需要 ≥ 20（开发使用 24）
npm -v
```

安装：

```bash
npm install
npm run dev      # http://localhost:3000
```

> 依赖版本已在 `package-lock.json` 中锁定，CI 与本地保持一致。

---

## 2. 常用命令

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 启动开发服务器（Turbopack + HMR） |
| `npm run build` | 生产构建，包含 TypeScript 严格类型检查 |
| `npm start` | 启动生产服务器 |
| `npm run lint` | ESLint（Next.js Core Web Vitals 规则集） |
| `npm run images:generate` | 用 `mmx` CLI 重新生成全部商品/场景图 |
| `npm run images:optimize` | 用 `sharp` 压缩图片（重绘后建议执行） |
| `npm run fonts:fetch` | 重新抓取本地字体子集到 `src/assets/fonts/` |

---

## 3. 目录职责

```
src/
├── app/          路由与全局样式。page.tsx 只做区块组合，不写业务逻辑
├── components/
│   ├── providers/ 全局状态。购物车、收藏、分类、搜索都在这里
│   ├── layout/    页面级框架：导航、页脚、抽屉、弹层
│   ├── sections/  首页区块。一个区块一个文件
│   ├── commerce/  可复用的电商组件（商品卡）
│   ├── effects/   背景与动效原语
│   └── ui/        无业务语义的基础组件
├── lib/          数据、工具、共享动效变体
└── types/        领域类型
```

**分层原则**：`sections` → `commerce`/`ui` → `effects`，上层可以依赖下层，下层不反向依赖上层。

---

## 4. 全局状态

所有跨组件状态集中在 `src/components/providers/StoreProvider.tsx`，用 `useReducer` + Context 实现，不引入额外状态库。

```ts
interface StoreState {
  cart: CartItem[];          // 购物车
  wishlist: string[];        // 收藏的商品 id
  activeCategory: CategoryId;// 当前分类筛选
  query: string;             // 搜索关键词
}
```

消费方式：

```tsx
"use client";
import { useStore } from "@/components/providers/StoreProvider";

const { cart, addToCart, toggleWishlist, isWishlisted, setCategory } = useStore();
```

### 约定

- 组件内**不要**重复存储购物车 / 收藏数据，一律从 `useStore()` 取
- 变更后需要用户反馈的，统一调用 `notify(title, description?, tone?)`，它会触发 Toast
- 打开抽屉前先关闭其它抽屉，避免两个面板叠加

---

## 5. 组件开发规范

### 5.1 基础结构

```tsx
"use client";                                   // 需要事件 / 状态时才加

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_SILK } from "@/lib/motion";

export function MyThing({ title }: { title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: EASE_SILK }}
      className="..."
    >
      ...
    </motion.div>
  );
}
```

### 5.2 滚动进场

统一使用 `whileInView` + `viewport={{ once: true }}`；或用封装好的 `<Reveal>`：

```tsx
<Reveal delay={0.1} y={26}>...</Reveal>
```

### 5.3 样式约定

- 颜色、圆角、阴影一律用令牌类（`bg-cream-50`、`rounded-2xl`、`shadow-glass`）
- 玻璃卡片用 `<GlassCard>`，会自动带上鼠标跟随高光
- 交互元素必须有 `focus-visible` 反馈（全局已定义）
- 用 `cn()` 合并类名，避免字符串拼接

### 5.4 动画注意事项

1. **不要让 hover 状态下发生位移**——元素移动会让点击热区漂移，真实用户会点空
2. 需要位移时用 `transform` 而非 `top/left`
3. 隐藏态元素加 `pointer-events-none`，显现时再打开
4. 新增长动画前先确认不会影响低端机帧率

---

## 6. 扩展：新增一个商品

商品数据集中在 `src/lib/data.ts` 的 `PRODUCTS` 数组。

```ts
{
  id: "air-pro",                       // 唯一 id，同时用作收藏 key
  name: "Lumière Air Pro 无线耳机",
  subtitle: "主动降噪 · 空间音频",      // 卡片左上角的分类小字
  description: "三麦克风降噪系统搭配自适应通透模式，通勤与专注之间自由切换。",
  price: 1299,
  originalPrice: 1599,                 // 可选，显示划线价
  rating: 4.9,
  reviews: 2486,
  category: "audio",                   // audio | wearables | home | travel
  image: "/images/products/p-earbuds.jpg",
  tags: ["新品", "旗舰"],               // 可选，图片左上角标签
  editorial: true,                     // 可选，是否进入「灵感生活」分类
  colors: [{ name: "月白", hex: "#F7F3EE" }],
  highlights: ["42dB 深度降噪", "32 小时续航", "IPX4 防水"],
}
```

新增后需同步：

1. 把图片放到 `public/images/products/`
2. `npm run images:optimize` 压缩
3. 若新增了品类，在 `CATEGORIES` 中补充分类项并选择对应图标

---

## 7. 扩展：新增一个首页区块

1. 在 `src/components/sections/` 新建组件，命名为区块语义（如 `Newsletter.tsx`）
2. 用 `<SectionHeading>` 统一标题样式：

```tsx
<SectionHeading
  eyebrow="Journal"                  // 英文小标签，可选
  title={<>灵感生活<span className="text-ink-300"> · </span><span className="font-serif text-ink-400">Journal</span></>}
  description="..."
  action={<button>...</button>}
/>
```

3. 在 `src/app/page.tsx` 中按视觉顺序插入
4. 若需要锚点导航，给 `<section>` 加 `id` 与 `scroll-mt-24`

---

## 8. 设计令牌在哪里改

全部集中在 `src/app/globals.css` 的 `@theme` 块：

```css
@theme {
  --color-cream-50: #fffcfa;
  --color-blush-200: #f8d5e1;
  --radius-xl: 1.75rem;
  --shadow-glass: ...;
  --ease-silk: cubic-bezier(0.22, 1, 0.36, 1);
  --animate-float-slow: float-slow 9s ease-in-out infinite;
}
```

改完令牌，所有使用 `bg-cream-50`、`rounded-xl` 等工具类的位置会同步更新。

> Tailwind v4 是 CSS-first 配置，**不存在** `tailwind.config.ts`。需要注册新的工具类时用 `@utility` 关键字。

---

## 9. 质量检查

提交前请确认：

```bash
npm run lint     # 必须零告警
npm run build    # 必须通过（含类型检查）
```

页面层面的自查：

- [ ] 1440 / 820 / 390 / 1920 四种宽度均无溢出与错位
- [ ] 每个按钮都有明确反馈
- [ ] 键盘 Tab 可遍历全部交互元素
- [ ] 开启「减少动态效果」后内容完整
- [ ] 控制台无报错

---

## 10. 常见问题

**Q：新增了 Tailwind 类名但不生效？**
A：Tailwind v4 会扫描源码生成工具类。若类名是动态拼接（如 `` `bg-${color}` ``），无法被扫描到，必须写成完整字面量或使用 safelist 方案。本项目已避免动态类名拼接。

**Q：玻璃背景在某些浏览器上很糊？**
A：`backdrop-filter` 需要 `-webkit-` 前缀，`.glass` 系列已同时提供。若父级有 `overflow: hidden` 或 `filter`，会创建新的层叠上下文导致模糊失效，请检查父级。

**Q：动画在低端设备卡顿？**
A：优先减少粒子数量与大面积 `blur`。`.glass-strong` 的 `blur(30px)` 成本较高，不要大面积使用。

**Q：如何接入真实数据？**
A：把 `src/lib/data.ts` 换成 API 请求即可。组件只依赖 `Product` / `Collection` / `Article` / `Testimonial` 四个类型，替换数据源不需要改动 UI 层。
