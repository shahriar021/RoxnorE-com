import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  tagTypes: ["product"],
  endpoints: () => ({}),
});

