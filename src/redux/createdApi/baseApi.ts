import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
 

  prepareHeaders: (headers) => {
     console.log(import.meta.env.VITE_API_BASE_URL);
    // const token = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;
    // if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  tagTypes: ["product"],
  endpoints: () => ({}),
});

