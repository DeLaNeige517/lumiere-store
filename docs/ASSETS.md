# 资产说明（图片 / 字体）

本项目的全部视觉资产都在仓库内，**不依赖任何外部 CDN**。

---

## 1. 图片

### 1.1 来源

18 张商品与场景照片由 **MiniMax `image-01` 模型**（通过 `mmx` CLI）生成，统一使用「奶油马卡龙 + 柔光棚拍 + 极简高端」的风格提示词生成，以保证整站视觉一致。

### 1.2 目录

| 路径 | 数量 | 用途 |
| --- | --- | --- |
| `public/images/hero/` | 1 | Hero 首屏主视觉（Air Pro 无线耳机） |
| `public/images/products/` | 9 | 商品卡配图（Air Pro / Studio / Watch S / Band / Halo / Home / Mag / Go / Loop） |
| `public/images/collections/` | 4 | 精选系列场景（灵感出行 / 静谧时刻 / 健康生活 / 家居灵感） |
| `public/images/lifestyle/` | 3 | 灵感生活文章配图（城市漫游 / 高效日常 / 自在身心） |
| `public/images/promo/` | 1 | 促销 Banner 礼盒组合 |

### 1.3 重新生成

```bash
# 需要先安装并登录 mmx CLI
npm run images:generate     # 约 2 分钟，18 张
npm run images:optimize     # 用 sharp 压缩
```

生成脚本位于 `scripts/generate-images.sh` 与 `scripts/generate-images-2.sh`，内置了完整的风格提示词（`STYLE` 变量），改动风格时只需修改该变量即可让全站图片保持同步。

### 1.4 规格与优化

| 类别 | 源尺寸 | 交付宽度 | 格式 | 质量 |
| --- | --- | --- | --- | --- |
| Hero | 1536 × 1152 | 1600 | JPEG（mozjpeg） | 86 |
| 商品图 | 1024 × 1024 | 900 | JPEG | 84 |
| 系列图 | 1024 × 768 | 960 | JPEG | 82 |
| 文章图 | 1024 × 680 | 1000 | JPEG | 82 |
| 促销图 | 1536 × 768 | 1500 | JPEG | 84 |

- 色度采样 `4:4:4`，避免渐变背景出现色带
- 总体积：**2.53MB → 0.68MB**
- 商品图通过 `next/image` 按需生成 WebP/AVIF；Hero、系列、文章图为 `<img>` 直出

### 1.5 许可与声明

图片为 AI 生成的演示素材，仅用于本项目展示用途。仓库中的「商品」不对应任何真实品牌或真实商品，价格、参数、评价均为虚构。

### 1.6 文档配图

`docs/images/` 下为项目文档与 README 使用的页面截图：

| 文件 | 尺寸 | 说明 |
| --- | --- | --- |
| `hero.jpg` | 2880 × 1800 | Hero 首屏 |
| `collections.jpg` | 2880 × 1800 | 精选系列 |
| `products.jpg` | 2880 × 1800 | 人气单品 |
| `promo.jpg` | 2880 × 1800 | 促销 Banner |
| `journal.jpg` | 2880 × 1800 | 灵感生活 |
| `reviews.jpg` | 2880 × 1800 | 用户评价 |
| `cart.jpg` | 2880 × 1800 | 购物车抽屉 |
| `mobile-hero.jpg` | 1170 × 2532 | 移动端首屏 |
| `mobile-products.jpg` | 1170 × 2532 | 移动端商品列表 |
| `mobile-menu.jpg` | 1170 × 2532 | 移动端菜单 |

**采集方式**：Playwright + Chrome，桌面视口 `1440 × 900 @ DSF 2`，移动视口 `390 × 844 @ DSF 3`，即**原生像素不做缩放**。

**压缩参数**：JPEG（mozjpeg）`quality: 92` + `chromaSubsampling: "4:4:4"` + progressive。4:4:4 是关键——页面大量使用浅粉 / 淡紫渐变，2:2:0 色度抽样会在渐变边缘产生明显色块。原始 PNG 合计 15.1MB，压缩后 2.55MB。

---

## 2. 字体

### 2.1 来源

| 字族 | 用途 | 许可 |
| --- | --- | --- |
| **Plus Jakarta Sans** | 拉丁正文与标题 | SIL Open Font License 1.1 |
| **Instrument Serif** | 英文点缀与品牌标识 | SIL Open Font License 1.1 |

抓取自 Google Fonts，已**裁剪为 latin / latin-ext 两个子集**并本地自托管。

### 2.2 文件

```
src/assets/fonts/
├── PlusJakartaSans-{400,500,600,700,800}-latin.woff2
├── PlusJakartaSans-{400,500,600,700,800}-latin-ext.woff2
├── PlusJakartaSans-500i-latin.woff2
├── PlusJakartaSans-500i-latin-ext.woff2
├── InstrumentSerif-400-latin.woff2
├── InstrumentSerif-400-latin-ext.woff2
├── InstrumentSerif-400i-latin.woff2
└── InstrumentSerif-400i-latin-ext.woff2
```

共 15 个文件，约 **368KB**。通过 `next/font/local` 引入，自动生成 `font-display: swap` 与尺寸调整，消除 FOUT。

### 2.3 中文

中文使用系统字体栈，**不打包 CJK 字体**（完整 CJK 字体通常 > 10MB）：

```css
"PingFang SC",        /* macOS / iOS */
"HarmonyOS Sans SC",  /* 华为鸿蒙 */
"Noto Sans CJK SC",   /* Linux */
"Microsoft YaHei",    /* Windows */
```

### 2.4 重新抓取

```bash
npm run fonts:fetch
```

---

## 3. 图标

全部来自 **[lucide-react](https://lucide.dev)**（ISC License），`strokeWidth` 统一在 1.6 ~ 1.9 区间，保证线性风格一致。

图标按语义分组：

- 导航与操作：`Search` `UserRound` `Heart` `ShoppingBag` `Menu` `X` `Plus` `Minus` `Trash2`
- 区块：`ArrowRight` `ArrowUpRight` `Gift` `Quote` `Sparkles` `LayoutGrid` `SearchX`
- 分类：`Grid2x2` `Watch` `Headphones` `Lamp` `Plane`
- 表单与状态：`Mail` `Check` `Info` `Clock` `BatteryCharging` `Waves`

---

## 4. 品牌图形

`src/app/icon.svg` 与 `src/components/layout/BrandMark.tsx` 中的图形为原创 SVG：一枚由「光晕渐变」构成的抽象水滴，对应品牌名 *Lumière*（法语「光」）与标语「科技点亮更好的日常」。

品牌色渐变：`#E8A2BA → #B3A0E6 → #83AAD2`（粉 → 紫 → 蓝）。
