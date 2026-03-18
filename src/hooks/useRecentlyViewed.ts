import { useState, useEffect } from "react";
import type { Product, RecentProduct } from "../types/products";

const STORAGE_KEY = "roxnor_recently_viewed";
const MAX_ITEMS = 5;
const EVENT_KEY = "roxnor_recently_viewed_updated";

const getStored = (): RecentProduct[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentProduct[]>(getStored);

  // listen for updates from other components
  useEffect(() => {
    const handleUpdate = () => {
      setRecentlyViewed(getStored());
    };

    window.addEventListener(EVENT_KEY, handleUpdate);
    return () => window.removeEventListener(EVENT_KEY, handleUpdate);
  }, []);

  const addToRecentlyViewed = (product: Product) => {
    const prev = getStored();
    const filtered = prev.filter((p) => p.id !== product.id);
    const updated = [
      {
        id: product.id,
        title: product.title,
        thumbnail: product.thumbnail,
        price: product.price,
        category: product.category,
      },
      ...filtered,
    ].slice(0, MAX_ITEMS);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event(EVENT_KEY));
    } catch {
      // ignore
    }

    setRecentlyViewed(updated);
  };

  const clearRecentlyViewed = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRecentlyViewed([]);
    window.dispatchEvent(new Event(EVENT_KEY));
  };

  return { recentlyViewed, addToRecentlyViewed, clearRecentlyViewed };
};
