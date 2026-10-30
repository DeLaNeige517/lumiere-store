import type {
  Article,
  Category,
  CategoryId,
  Collection,
  Product,
  Testimonial,
} from "@/types";

export const BRAND = {
  name: "Lumière",
  nameZh: "露弥尔",
  tagline: "科技点亮更好的日常",
  taglineEn: "Light up a better everyday",
  description:
    "Lumière 以克制的设计与温柔的科技，为你的日常挑选值得长久陪伴的好物。",
} as const;

export interface NavLink {
  label: string;
  href: string;
  /** 点击时同步应用的商品分类 */
  category?: Exclude<CategoryId, "all" | "inspiration">;
}

export const NAV_LINKS: NavLink[] = [
  { label: "首页", href: "#home" },
  { label: "精选系列", href: "#collections" },
  { label: "音频设备", href: "#products", category: "audio" },
  { label: "智能穿戴", href: "#products", category: "wearables" },
  { label: "生活方式", href: "#inspiration" },
];

export const CATEGORIES: Category[] = [
  {
    id: "all",
    name: "全部产品",
    caption: "完整探索",
    accent: "from-blush-200 to-lilac-200",
    glow: "rgba(241,188,205,0.55)",
    icon: "grid",
  },
  {
    id: "wearables",
    name: "智能穿戴",
    caption: "Watch · Band",
    accent: "from-blush-200 to-champagne-200",
    glow: "rgba(240,224,189,0.55)",
    icon: "watch",
  },
  {
    id: "audio",
    name: "音频设备",
    caption: "Air · Studio",
    accent: "from-lilac-200 to-mist-200",
    glow: "rgba(202,188,240,0.55)",
    icon: "headphones",
  },
  {
    id: "home",
    name: "智能家居",
    caption: "Halo · Home",
    accent: "from-mist-200 to-champagne-200",
    glow: "rgba(208,227,243,0.55)",
    icon: "lamp",
  },
  {
    id: "travel",
    name: "出行配件",
    caption: "Go · Mag",
    accent: "from-champagne-200 to-blush-200",
    glow: "rgba(232,162,186,0.5)",
    icon: "plane",
  },
  {
    id: "inspiration",
    name: "灵感生活",
    caption: "编辑精选",
    accent: "from-lilac-200 to-mist-200",
    glow: "rgba(179,160,230,0.5)",
    icon: "sparkles",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "air-pro",
    name: "Lumière Air Pro 无线耳机",
    subtitle: "主动降噪 · 空间音频",
    description:
      "三麦克风降噪系统搭配自适应通透模式，通勤与专注之间自由切换。",
    price: 1299,
    originalPrice: 1599,
    rating: 4.9,
    reviews: 2486,
    category: "audio",
    image: "/images/products/p-earbuds.jpg",
    tags: ["新品", "旗舰"],
    editorial: true,
    colors: [
      { name: "月白", hex: "#F7F3EE" },
      { name: "浅粉", hex: "#F1BCCD" },
      { name: "雾蓝", hex: "#A9C9E6" },
    ],
    highlights: ["42dB 深度降噪", "32 小时续航", "IPX4 防水"],
  },
  {
    id: "studio",
    name: "Lumière Studio 头戴耳机",
    subtitle: "Hi-Res 无线 · 头戴式",
    description:
      "40mm 镀钛振膜带来开阔声场，记忆棉耳罩把外界安静留在外面。",
    price: 1899,
    rating: 4.8,
    reviews: 1382,
    category: "audio",
    image: "/images/products/p-headphone.jpg",
    tags: ["旗舰"],
    colors: [
      { name: "云白", hex: "#F5F2ED" },
      { name: "香槟", hex: "#E0C48F" },
    ],
    highlights: ["Hi-Res 无损", "60 小时续航", "多设备切换"],
  },
  {
    id: "watch-s",
    name: "Lumière Watch S 智能手表",
    subtitle: "全天候健康 · 定位",
    description:
      "蓝宝石表镜与钛合金中框，记录每一次心率、睡眠与行程。",
    price: 2499,
    rating: 4.9,
    reviews: 3174,
    category: "wearables",
    image: "/images/products/p-watch.jpg",
    tags: ["热卖", "旗舰"],
    editorial: true,
    colors: [
      { name: "香槟金", hex: "#E0C48F" },
      { name: "雾霾蓝", hex: "#A9C9E6" },
      { name: "淡紫", hex: "#CABCF0" },
    ],
    highlights: ["蓝宝石表镜", "14 天续航", "双频 GPS"],
  },
  {
    id: "band",
    name: "Lumière Band 轻量智能手环",
    subtitle: "轻若无感 · 睡眠监测",
    description:
      "18g 轻盈机身贴合手腕，全天候心率与睡眠节律洞察。",
    price: 699,
    originalPrice: 799,
    rating: 4.6,
    reviews: 921,
    category: "wearables",
    image: "/images/products/p-band.jpg",
    tags: ["新品"],
    colors: [
      { name: "奶白", hex: "#F8F4EF" },
      { name: "淡紫", hex: "#CABCF0" },
    ],
    highlights: ["18g 轻量", "10 天续航", "50m 防水"],
  },
  {
    id: "halo",
    name: "Lumière Halo 智能氛围灯",
    subtitle: "全光谱 · 情景联动",
    description:
      "1600 万色柔和光晕，随昼夜节律与音乐缓慢呼吸。",
    price: 599,
    rating: 4.7,
    reviews: 1608,
    category: "home",
    image: "/images/products/p-lamp.jpg",
    tags: ["新品"],
    editorial: true,
    colors: [
      { name: "雾霾蓝", hex: "#A9C9E6" },
      { name: "香槟", hex: "#E0C48F" },
    ],
    highlights: ["1600 万色", "节奏灯效", "语音唤醒"],
  },
  {
    id: "home-speaker",
    name: "Lumière Home 智能音箱",
    subtitle: "环绕声场 · 家庭中枢",
    description:
      "360° 声场与自然人声交互，一个音箱接管全屋的日常节奏。",
    price: 899,
    rating: 4.5,
    reviews: 742,
    category: "home",
    image: "/images/products/p-speaker.jpg",
    tags: [],
    colors: [
      { name: "奶油白", hex: "#F8F4EE" },
      { name: "雾霾蓝", hex: "#A9C9E6" },
    ],
    highlights: ["360° 环绕", "远场语音", "全屋互联"],
  },
  {
    id: "mag",
    name: "Lumière Mag 磁吸充电宝",
    subtitle: "无线快充 · 轻若无感",
    description:
      "贴上即充，10000mAh 大容量装进比信用卡更薄的机身。",
    price: 399,
    rating: 4.7,
    reviews: 2841,
    category: "travel",
    image: "/images/products/p-charger.jpg",
    tags: ["热卖"],
    editorial: true,
    colors: [
      { name: "月白", hex: "#F7F3EE" },
      { name: "浅粉", hex: "#F1BCCD" },
    ],
    highlights: ["10000mAh", "15W 磁吸快充", "航空可携带"],
  },
  {
    id: "go",
    name: "Lumière Go 便携投影仪",
    subtitle: "1080P · 自动校正",
    description:
      "掌心大小，落地即投，自动梯形校正让每一面墙都成为好屏幕。",
    price: 2199,
    rating: 4.6,
    reviews: 486,
    category: "travel",
    image: "/images/products/p-projector.jpg",
    tags: ["新品"],
    colors: [{ name: "奶油白", hex: "#F8F4EE" }],
    highlights: ["1080P 原生", "自动校正", "内置电池"],
  },
  {
    id: "loop",
    name: "Lumière Loop 颈挂耳机",
    subtitle: "记忆颈环 · 轻听随行",
    description:
      "柔韧记忆颈环贴合颈线，随时取用，运动中也不会掉落。",
    price: 999,
    originalPrice: 1199,
    rating: 4.4,
    reviews: 613,
    category: "audio",
    image: "/images/products/p-neckphone.jpg",
    tags: [],
    colors: [
      { name: "月白", hex: "#F7F3EE" },
      { name: "雾霾蓝", hex: "#A9C9E6" },
    ],
    highlights: ["IPX7 防水", "8 小时续航", "双麦克风"],
  },
];

export const COLLECTIONS: Collection[] = [
  {
    id: "travel",
    title: "灵感出行",
    subtitle: "Journey",
    description: "为城市漫游准备的轻装清单，让每一次出发都更从容。",
    image: "/images/collections/c-travel.jpg",
    count: 12,
    accent: "rgba(232,162,186,0.5)",
  },
  {
    id: "quiet",
    title: "静谧时刻",
    subtitle: "Stillness",
    description: "把噪音留在外面，为专注留出一块安静的地方。",
    image: "/images/collections/c-quiet.jpg",
    count: 9,
    accent: "rgba(202,188,240,0.5)",
  },
  {
    id: "health",
    title: "健康生活",
    subtitle: "Vitality",
    description: "记录身体的每一个信号，用数据照顾好长期的自己。",
    image: "/images/collections/c-health.jpg",
    count: 8,
    accent: "rgba(169,201,230,0.5)",
  },
  {
    id: "home",
    title: "家居灵感",
    subtitle: "Home",
    description: "柔和光线与温柔响应，构成理想的居住氛围。",
    image: "/images/collections/c-home.jpg",
    count: 14,
    accent: "rgba(240,224,189,0.5)",
  },
];

export const ARTICLES: Article[] = [
  {
    id: "city",
    title: "城市漫游",
    excerpt:
      "把城市当作一间巨大的房间：戴上降噪耳机，穿过午后的人潮，用声音重新丈量一条街的长度。",
    category: "出行灵感",
    readTime: "6 分钟阅读",
    image: "/images/lifestyle/l-city.jpg",
    date: "2026 年 10 月 18 日",
  },
  {
    id: "efficient",
    title: "高效日常",
    excerpt:
      "真正高效的桌面不需要更多设备。一台笔记本、一盏氛围灯和一副随时待命的耳机，就足够撑起一天。",
    category: "桌面美学",
    readTime: "5 分钟阅读",
    image: "/images/lifestyle/l-efficient.jpg",
    date: "2026 年 10 月 09 日",
  },
  {
    id: "wellness",
    title: "自在身心",
    excerpt:
      "从一次深呼吸开始，让设备安静下来。记录心率与睡眠的意义，是让你少一点焦虑，多一点笃定。",
    category: "身心平衡",
    readTime: "7 分钟阅读",
    image: "/images/lifestyle/l-wellness.jpg",
    date: "2026 年 09 月 27 日",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "林知遥",
    role: "产品设计师 · 杭州",
    rating: 5,
    initials: "知遥",
    accent: "linear-gradient(135deg,#F1BCCD,#CABCF0)",
    purchased: "Lumière Air Pro 无线耳机",
    content:
      "降噪开启的瞬间，办公室的空调声和人声都退到很远的地方。奶油白的配色放在桌面上也不突兀，像本来就属于那里的一件小物。",
  },
  {
    id: "t2",
    name: "陈屿",
    role: "摄影师 · 上海",
    rating: 5,
    initials: "陈屿",
    accent: "linear-gradient(135deg,#A9C9E6,#F0E0BD)",
    purchased: "Lumière Watch S 智能手表",
    content:
      "外出拍摄时手表很轻，几乎忘记它的存在。夜间血氧与心率记录让我第一次看懂自己的睡眠节律，数据很克制，界面也很舒服。",
  },
  {
    id: "t3",
    name: "苏晚",
    role: "独立咖啡师 · 成都",
    rating: 4,
    initials: "苏晚",
    accent: "linear-gradient(135deg,#CABCF0,#F1BCCD)",
    purchased: "Lumière Halo 智能氛围灯",
    content:
      "傍晚把 Halo 调成暖橘色，吧台的光一下就有了氛围。灯效变化很慢很柔，客人常以为我们换了新的灯泡。",
  },
];

export const FOOTER_COLUMNS = [
  {
    title: "购物指南",
    links: ["全部商品", "新品上市", "精选系列", "礼品卡", "企业采购"],
  },
  {
    title: "服务支持",
    links: ["配送与安装", "退换货政策", "产品保修", "常见问题", "联系我们"],
  },
  {
    title: "关于我们",
    links: ["品牌故事", "设计理念", "可持续承诺", "加入我们", "媒体中心"],
  },
] as const;

export const SOCIALS = [
  { label: "微信", handle: "@lumiere" },
  { label: "小红书", handle: "@lumiere.daily" },
  { label: "微博", handle: "@lumieretech" },
  { label: "抖音", handle: "@lumiere" },
] as const;

export const STATS = [
  { value: "128万", label: "用户的选择" },
  { value: "4.9", label: "平均商品评分" },
  { value: "300+", label: "城市配送覆盖" },
] as const;
