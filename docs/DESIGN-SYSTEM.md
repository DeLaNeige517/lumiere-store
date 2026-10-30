# Lumière 设计系统

> 本文记录 Lumière 露弥尔的视觉语言。所有取值均可在 `src/app/globals.css` 的 `@theme` 块与 `src/components/ui/` 中找到对应实现。

---

## 1. 设计原则

| 原则 | 落地方式 |
| --- | --- |
| **留白优先** | 区块之间保留 `py-16 ~ py-24` 的呼吸空间，标题与正文之间至少 `mt-4` |
| **层次靠光而非线** | 用渐变、毛玻璃和柔和阴影区分层级，避免使用硬边框和分割线 |
| **克制的动效** | 动效只用于「引导注意力」，不用于炫技；时长控制在 0.4s ~ 0.8s |
| **可读性优先** | 玻璃底上的文字一律使用 `ink-700` 及以上色阶，正文行高 ≥ 1.75 |
| **触感一致** | 同一类交互（卡片 / 按钮 / 图标）使用同一套 hover 与 focus 反馈 |

---

## 2. 色彩

### 2.1 主色板

| Token | 主色 | 浅色 | 深色 | 典型用途 |
| --- | --- | --- | --- | --- |
| `cream` | `#FFFCFA` | `#FDF8F3` | `#ECE0D3` | 页面底、卡片底、输入框底 |
| `blush` | `#FCE8EF` | `#F8D5E1` | `#C96F8F` | 光晕、标签、主 CTA 渐变 |
| `lilac` | `#F0EAFC` | `#E1D8F7` | `#7F68C4` | 玻璃高光、图标底、分类卡 |
| `mist` | `#E6F1F9` | `#D0E3F3` | `#4F7BA6` | 冷调平衡、科技感表达 |
| `champagne` | `#F9F0DC` | `#F0E0BD` | `#8A6C3C` | 评分、价格、质感细节 |

### 2.2 文字色阶

| Token | 值 | 用途 |
| --- | --- | --- |
| `ink-900` | `#24212C` | 主标题、价格 |
| `ink-800` | `#322E3C` | 正文强调、按钮文字 |
| `ink-700` | `#4B4757` | 正文、导航选中态 |
| `ink-500` | `#706C7D` | 次级说明、卡片描述 |
| `ink-400` | `#938F9E` | 标签、辅助信息 |
| `ink-300` | `#B7B3BF` | 占位符、禁用态 |

### 2.3 渐变

```css
/* 标题渐变 —— 马卡龙三色过渡 */
.text-aurora {
  background: linear-gradient(100deg, #b0739a 0%, #e79cb8 30%, #a795e2 62%, #7aabd8 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}

/* 主按钮渐变 —— 由暖到冷，保证层次 */
background: linear-gradient(135deg, #FFF7F9 0%, #FBDDE8 34%, #E7DDFA 68%, #D9EAF8 100%);

/* 极光背景层 */
background: linear-gradient(180deg, #FFFDFB 0%, #FDF7F4 38%, #F6F1FA 72%, #EFF4F9 100%);
```

> 渐变使用原则：**只在流动方向上出现一次色彩过渡**。避免同屏出现三个以上渐变主体，否则会从「轻盈」滑向「廉价」。

---

## 3. 字体

### 3.1 字族

```css
--font-sans: var(--font-jakarta), "PingFang SC", "HarmonyOS Sans SC",
              "Noto Sans CJK SC", "Noto Sans SC", "Microsoft YaHei", system-ui, sans-serif;
--font-serif: var(--font-instrument), "Songti SC", "Noto Serif CJK SC", serif;
```

- **Plus Jakarta Sans**（OFL-1.1）：拉丁正文与标题，几何感强、字腔开阔，适合精致商业界面
- **Instrument Serif**（OFL-1.1）：仅用于英文点缀（`Best Sellers` / `Collections` / `Journal` / `Reviews`）与品牌标识 `Lumière`
- **中文**：系统 CJK 栈。中文使用 `font-semibold`（600）而非 700，避免在部分设备上过重

### 3.2 字号阶梯

| 用途 | 类名 | 尺寸 | 行高 | 字距 |
| --- | --- | --- | --- | --- |
| Hero 主标题 | `clamp(2.6rem, 7.4vw, 4.9rem)` | 41.6 → 78.4px | 1.08 | -0.035em |
| 区块标题 | `clamp(1.85rem, 3.6vw, 3rem)` | 29.6 → 48px | 1.16 | -0.02em |
| 卡片标题 | `16.5px` | — | 1.4 | -0.012em |
| 正文 | `15.5px` / `13.5px` | — | 1.9 / 1.85 | 0 |
| 辅助说明 | `11.5px` | — | 1.4 | 0.02em |
| 英文点缀 | `text-aurora` + `font-serif` | — | 1.1 | -0.01em |

> 中文标题的负字距建议控制在 `-0.02em` 以内，过度收紧会让笔画粘连。

---

## 4. 圆角与阴影

| Token | 值 | 用途 |
| --- | --- | --- |
| `--radius-md` | `1rem` | 小徽标、内嵌区块 |
| `--radius-lg` | `1.375rem` | 分类卡 |
| `--radius-xl` | `1.75rem` | 商品卡、抽屉内容 |
| `--radius-2xl` | `2.25rem` | Hero 主视觉、促销 Banner |
| `--shadow-soft` | `0 12px 34px -18px rgba(96,78,118,.35)` | 轻悬浮 |
| `--shadow-glass` | 内高光 + `0 18px 46px -22px rgba(96,78,118,.32)` | 玻璃卡片默认 |
| `--shadow-glass-lg` | 内高光 + `0 34px 80px -30px rgba(96,78,118,.4)` | 浮层、抽屉 |
| `--shadow-float` | `0 30px 70px -28px rgba(96,78,118,.45)` | Hero 主视觉 |

**阴影通则**：所有阴影带紫灰色相（`96,78,118`）而非纯黑，与马卡龙底色协调；一律使用负 spread，模拟环境光的漫射而非硬投影。

---

## 5. 玻璃拟态

### 5.1 三个层级

| 类名 | 模糊 | 饱和度 | 场景 |
| --- | --- | --- | --- |
| `.glass` | `blur(22px)` | `170%` | 常规卡片、导航、筛选按钮 |
| `.glass-strong` | `blur(30px)` | `180%` | 抽屉、弹层、页脚订阅卡 |
| `.glass-soft` | `blur(14px)` | `150%` | 卡片内嵌区域 |

### 5.2 边缘高光

玻璃卡片统一使用两层叠加：

```css
border: 1px solid rgba(255,255,255,0.75);          /* 亮边 */
box-shadow: inset 0 1px 0 rgba(255,255,255,0.9);  /* 顶部内高光 */
```

### 5.3 鼠标跟随高光

```css
.glass-card { position: relative; isolation: isolate; }
.glass-card::before {
  content: ""; position: absolute; inset: 0; z-index: 0;
  border-radius: inherit; pointer-events: none; opacity: 0;
  transition: opacity .55s var(--ease-silk);
  background: radial-gradient(420px circle at var(--mx,50%) var(--my,0%),
              rgba(255,255,255,.78), transparent 62%);
}
.glass-card:hover::before { opacity: 1; }
.glass-card > * { position: relative; z-index: 1; }
```

`--mx` / `--my` 由 `GlassCard` 的 `onMouseMove` 实时写入。

> ⚠️ 实现注意：高光层使用 `opacity` 过渡而**非位移**，避免元素在 hover 时移动导致点击热区漂移。

---

## 6. 动效

### 6.1 缓动

```css
--ease-silk: cubic-bezier(0.22, 1, 0.36, 1);  /* 主力 */
--ease-soft: cubic-bezier(0.4, 0, 0.2, 1);    /* 背景漂移 */
```

### 6.2 时长表

| 场景 | 时长 |
| --- | --- |
| 按钮 hover / 按压 | 0.3 ~ 0.35s |
| 卡片悬浮上浮 | 0.55s |
| 滚动淡入上移 | 0.8s |
| 抽屉进出 | 0.55s |
| Toast | 0.45s |
| 极光光晕漂移 | 26s / 32s / 38s（循环） |

### 6.3 关键帧

| 名称 | 作用 |
| --- | --- |
| `aurora-a/b/c` | Hero 背景光晕的不同漂移轨迹与缩放 |
| `float-slow` | 上下轻浮 |
| `drift` | 斜向漂移 |
| `shimmer` | 按钮扫光 |
| `pulse-ring` | 状态点扩散脉冲 |

### 6.4 减少动态效果

`prefers-reduced-motion: reduce` 时：

1. CSS 层：所有 `animation-duration` / `transition-duration` 归零，`scroll-behavior` 改为 `auto`
2. JS 层（`Particles.tsx`）：只绘制一帧静态微粒，不再启动 `requestAnimationFrame`
3. JS 层（`Reveal.tsx`）：初始状态改为纯 `opacity: 0`，位移取消

---

## 7. 组件规范

### 7.1 按钮

| 变体 | 外观 | 使用 |
| --- | --- | --- |
| `primary` | 马卡龙渐变 + 白色描边 + 柔和投影 | 每个区块至多一个 |
| `glass` | 磨砂玻璃 | 次级操作 |
| `solid` | `ink-900` 实底 + 米白文字 | 深色背景上的 CTA |
| `ghost` | 无底色 | 列表内小操作 |

尺寸：`sm` h-9 / `md` h-11 / `lg` h-52(px)，圆角统一 `rounded-full`。

所有按钮带 **扫光层**：hover 时一道 `rgba(255,255,255,.75)` 高光从左扫到右（`900ms`）。

### 7.2 卡片

- 圆角 `rounded-2xl`（商品/系列）/ `rounded-xl`（小卡）
- 边框 `border-white/60`（普通）/ `border-white/70`（强调）
- 默认 `bg-white/55`，hover 提升到 `bg-white/70`
- 悬浮上浮 `-translate-y-2`（8px），图片同步 `scale-[1.08]`

### 7.3 图标

- 全部来自 `lucide-react`，`strokeWidth` 1.6 ~ 1.9
- 尺寸档位：14（行内）/ 16（按钮内）/ 17 ~ 19（导航、标题区）
- 图标按钮统一 `h-10 w-10` 圆形点击区，保证触控友好

### 7.4 图片

| 场景 | 容器比例 | 处理 |
| --- | --- | --- |
| Hero 主视觉 | `4 / 3.4` | `object-cover` + hover `scale-[1.07]` |
| 商品卡 | `4 / 3.4` | `next/image` + hover `scale-[1.08]` |
| 系列卡 | `4 / 5` | 玻璃信息条压在底部，描述移至图外 |
| 文章卡 | `16 / 10` | 底部渐变遮罩 + 左上分类标签 |

---

## 8. 文案规范

- **中文**：句号结尾；标题不使用感叹号；不使用「欢迎」「您好」等寒暄
- **英文点缀**：首字母大写，仅作视觉配角，不承载信息
- **价格**：统一 `¥` + 千分位，无小数（`¥1,299`）
- **演示声明**：涉及模拟数据的位置必须有可见声明（用户评价区、页脚）

---

## 9. 落地检查清单

新增组件或区块时逐条核对：

- [ ] 是否使用了令牌而非硬编码颜色？
- [ ] 文字对比度在玻璃底上是否 ≥ 4.5:1？
- [ ] 悬停时元素是否会位移导致点击热区漂移？
- [ ] 是否有 `aria-label` / `aria-pressed`？
- [ ] 键盘 Tab 可达，焦点可见？
- [ ] `prefers-reduced-motion` 下内容仍完整可见？
- [ ] 移动端 390px 下不横向溢出？
