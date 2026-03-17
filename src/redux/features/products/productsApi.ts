import type { Category, Product, ProductsResponse } from "../../../types/products";
import { baseApi } from "../../createdApi/baseApi";


export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, { limit: number; skip: number }>({
      query: ({ limit, skip }) => `/products?limit=${limit}&skip=${skip}`,
    }),
    searchProducts: builder.query<ProductsResponse, string>({
      query: (q) => `/products/search?q=${q}`,
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
    }),
    getCategories: builder.query<Category[], void>({
      query: () => "/products/categories",
    }),
    getProductsByCategory: builder.query<ProductsResponse, string>({
      query: (category) => `/products/category/${category}`,
    }),
  }),
});

export const { useGetProductsQuery, useSearchProductsQuery, useGetProductByIdQuery, useGetCategoriesQuery, useGetProductsByCategoryQuery } =
  productsApi;
