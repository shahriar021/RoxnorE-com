export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export interface DetailSkeletonProps {
  thumbnailCount?: number;
  infoRows?: number;
  imageHeight?: number;
}

export interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export interface RecentProduct {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  category: string;
}