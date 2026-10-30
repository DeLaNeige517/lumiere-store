export type CategoryId =
  | "all"
  | "wearables"
  | "audio"
  | "home"
  | "travel"
  | "inspiration";

export interface Category {
  id: CategoryId;
  name: string;
  caption: string;
  accent: string;
  glow: string;
  icon: "sparkles" | "watch" | "headphones" | "lamp" | "plane" | "grid";
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  category: Exclude<CategoryId, "all" | "inspiration">;
  image: string;
  tags: string[];
  editorial?: boolean;
  colors: { name: string; hex: string }[];
  highlights: string[];
}

export interface Collection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  count: number;
  accent: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  date: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  content: string;
  initials: string;
  accent: string;
  purchased: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
