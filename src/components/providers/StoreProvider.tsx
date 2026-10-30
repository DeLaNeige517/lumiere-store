"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import type { CartItem, CategoryId, Product } from "@/types";

/* ------------------------------------------------------------------ */
/* State                                                               */
/* ------------------------------------------------------------------ */

interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  activeCategory: CategoryId;
  query: string;
}

type StoreAction =
  | { type: "add"; product: Product }
  | { type: "remove"; id: string }
  | { type: "increment"; id: string }
  | { type: "decrement"; id: string }
  | { type: "toggleWishlist"; id: string }
  | { type: "setCategory"; category: CategoryId }
  | { type: "setQuery"; query: string }
  | { type: "clear" };

const initialState: StoreState = {
  cart: [],
  wishlist: [],
  activeCategory: "all",
  query: "",
};

function reducer(state: StoreState, action: StoreAction): StoreState {
  switch (action.type) {
    case "add": {
      const existing = state.cart.find((i) => i.product.id === action.product.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { product: action.product, quantity: 1 }],
      };
    }
    case "remove":
      return {
        ...state,
        cart: state.cart.filter((i) => i.product.id !== action.id),
      };
    case "increment":
      return {
        ...state,
        cart: state.cart.map((i) =>
          i.product.id === action.id ? { ...i, quantity: i.quantity + 1 } : i,
        ),
      };
    case "decrement":
      return {
        ...state,
        cart: state.cart.map((i) =>
          i.product.id === action.id
            ? { ...i, quantity: Math.max(1, i.quantity - 1) }
            : i,
        ),
      };
    case "toggleWishlist": {
      const has = state.wishlist.includes(action.id);
      return {
        ...state,
        wishlist: has
          ? state.wishlist.filter((id) => id !== action.id)
          : [...state.wishlist, action.id],
      };
    }
    case "setCategory":
      return { ...state, activeCategory: action.category };
    case "setQuery":
      return { ...state, query: action.query };
    case "clear":
      return initialState;
    default:
      return state;
  }
}

/* ------------------------------------------------------------------ */
/* Toast                                                               */
/* ------------------------------------------------------------------ */

export interface ToastItem {
  id: number;
  title: string;
  description?: string;
  tone: "success" | "info";
}

interface StoreContextValue extends StoreState {
  cartCount: number;
  cartTotal: number;
  cartOpen: boolean;
  searchOpen: boolean;
  wishlistOpen: boolean;
  wishlistCount: number;
  toasts: ToastItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  setCategory: (category: CategoryId) => void;
  setQuery: (query: string) => void;
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setWishlistOpen: (open: boolean) => void;
  notify: (title: string, description?: string, tone?: "success" | "info") => void;
  dismissToast: (id: number) => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

/* ------------------------------------------------------------------ */
/* Provider                                                            */
/* ------------------------------------------------------------------ */

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const toastId = useRef(0);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const notify = useCallback(
    (title: string, description?: string, tone: "success" | "info" = "success") => {
      const id = ++toastId.current;
      setToasts((prev) => [...prev.slice(-2), { id, title, description, tone }]);
      window.setTimeout(() => dismissToast(id), 3200);
    },
    [dismissToast],
  );

  const addToCart = useCallback(
    (product: Product) => {
      dispatch({ type: "add", product });
      notify("已加入购物车", product.name);
    },
    [notify],
  );

  const removeFromCart = useCallback(
    (id: string) => {
      dispatch({ type: "remove", id });
      notify("已移出购物车", "你可以随时重新添加", "info");
    },
    [notify],
  );

  const increment = useCallback((id: string) => dispatch({ type: "increment", id }), []);
  const decrement = useCallback((id: string) => dispatch({ type: "decrement", id }), []);

  const toggleWishlist = useCallback(
    (id: string) => {
      const wasSaved = state.wishlist.includes(id);
      dispatch({ type: "toggleWishlist", id });
      notify(
        wasSaved ? "已取消收藏" : "已加入收藏",
        wasSaved ? undefined : "可以在收藏夹中找到它",
        "info",
      );
    },
    [notify, state.wishlist],
  );

  const isWishlisted = useCallback(
    (id: string) => state.wishlist.includes(id),
    [state.wishlist],
  );

  const setCategory = useCallback(
    (category: CategoryId) => dispatch({ type: "setCategory", category }),
    [],
  );
  const setQuery = useCallback(
    (query: string) => dispatch({ type: "setQuery", query }),
    [],
  );

  const cartCount = useMemo(
    () => state.cart.reduce((sum, item) => sum + item.quantity, 0),
    [state.cart],
  );

  const cartTotal = useMemo(
    () => state.cart.reduce((sum, item) => sum + item.quantity * item.product.price, 0),
    [state.cart],
  );

  // 锁定背景滚动（购物车 / 搜索面板打开时）
  useEffect(() => {
    const locked = cartOpen || searchOpen || wishlistOpen;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, searchOpen, wishlistOpen]);

  const value = useMemo<StoreContextValue>(
    () => ({
      ...state,
      cartCount,
      cartTotal,
      cartOpen,
      searchOpen,
      wishlistOpen,
      wishlistCount: state.wishlist.length,
      toasts,
      addToCart,
      removeFromCart,
      increment,
      decrement,
      toggleWishlist,
      isWishlisted,
      setCategory,
      setQuery,
      setCartOpen,
      setSearchOpen,
      setWishlistOpen,
      notify,
      dismissToast,
    }),
    [
      state,
      cartCount,
      cartTotal,
      cartOpen,
      searchOpen,
      wishlistOpen,
      toasts,
      addToCart,
      removeFromCart,
      increment,
      decrement,
      toggleWishlist,
      isWishlisted,
      setCategory,
      setQuery,
      notify,
      dismissToast,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error("useStore 必须在 StoreProvider 内部使用");
  }
  return ctx;
}
