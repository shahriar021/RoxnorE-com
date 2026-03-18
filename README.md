# Roxnor — Product Management

A product management interface built with React, TypeScript, and Redux Toolkit.

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 + TypeScript |
| Build Tool | Vite |
| State Management | Redux Toolkit |
| Data Fetching | RTK Query |
| UI Library | Ant Design |
| Styling | Tailwind CSS + SCSS Modules |
| Routing | React Router v6 |
| API | DummyJSON |

---

## Getting Started

### Prerequisites
- Node.js 20
- npm 10.8.2

### Installation

```bash
# Clone the repository
git clone https://github.com/shahriar021/RoxnorE-com.git
cd RoxnorE-com

# Install dependencies
npm install --legacy-peer-deps
```

### Environment Setup

Create a `.env` file in the root of the project:

```bash
cp .env.example .env
```

Your `.env` should contain:

```
VITE_API_BASE_URL=https://dummyjson.com
```

> The base API URL is kept in environment variables following best practices, even though DummyJSON is a public API. In a production environment this would point to a private backend URL that should never be committed to source control.

### Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## Project Structure

```
src/
├── components/
│   └── common/
│       ├── Navbar/               # Global navigation with recently viewed
│       └── Skeleton/             # Reusable skeleton loaders
│           ├── TableSkeleton.tsx
│           └── DetailSkeleton.tsx
├── hooks/
│   └── useRecentlyViewed.ts      # Local storage hook for recently viewed products
├── pages/
│   ├── ProductList/              # Product listing page
│   └── ProductDetail/            # Product detail + edit drawer
├── redux/
│   ├── createdApi/
│   │   └── baseApi.ts            # RTK Query base API instance
│   ├── features/
│   │   └── products/
│   │       └── productsApi.ts    # Product endpoints via injectEndpoints
│   └── store.ts                  # Redux store configuration
├── router/
│   └── index.tsx                 # React Router configuration
├── styles/
│   └── global.scss               # Global styles + Tailwind import
├── types/
│   └── product.ts                # TypeScript interfaces for product data
└── main.tsx                      # App entry point
```

---

## Architecture Decisions

### Feature-based folder structure
Code is organized by feature rather than file type. All product-related API, types, and logic live under `redux/features/products/`. This scales well as the app grows — adding a new feature means adding a new folder, not scattering files across multiple directories.

### RTK Query via `injectEndpoints`
Instead of creating a separate `createApi` instance per feature, a single `baseApi` instance is created in `createdApi/baseApi.ts` and endpoints are injected per feature using `injectEndpoints`. This keeps the Redux store clean with a single reducer path while still maintaining feature separation.

### Styling: Tailwind + SCSS Modules
Two styling approaches are used intentionally:
- **Tailwind CSS** — for layout utilities and quick spacing in shared components like Navbar
- **SCSS Modules** — for component-specific styles that require nesting, pseudo-selectors, and more complex rules (ProductList, ProductDetail)

This avoids the verbosity of writing everything in Tailwind while keeping styles scoped and avoiding class name collisions.

### Reusable Skeleton Components
Skeleton loaders are built as generic, configurable components in `components/common/Skeleton/` rather than hardcoded per page. `TableSkeleton` accepts `rows` and `columns` props, `DetailSkeleton` accepts `thumbnailCount` and `infoRows`. This makes them reusable across any future list or detail pages.

### Local Storage — Recently Viewed
A custom `useRecentlyViewed` hook manages recently viewed products in localStorage. It uses a custom browser event (`roxnor_recently_viewed_updated`) to sync state between the Navbar and ProductDetail page without prop drilling or adding to the Redux store — keeping server state and UI state cleanly separated.

---

## Features Implemented

### — Product List
- Ant Design Table with product thumbnail, title, price, rating, stock, category
- Pagination with total count
- Search via `/products/search` endpoint
- Category filter via `/products/categories` endpoint
- Color-coded ratings and stock badges
- View button navigates to product detail

### — Product Detail
- Dynamic routing via `/products/:id`
- Image gallery with clickable thumbnails
- Price, rating, stock displayed as stat cards
- Edit button opens Ant Design Drawer
- Form validation with custom rules (required, min length, number ranges)
- Loading and error states handled

### some extra work
- **Skeleton loaders** — both list and detail pages show skeleton UI while fetching
- **Recently Viewed** — last 5 viewed products stored in localStorage, accessible from navbar dropdown with clear option
- **Environment variables** — API base URL stored in `.env`, not hardcoded

---

## Notes

- DummyJSON does not persist data — the edit form is frontend-only as specified in the requirements
- `--legacy-peer-deps` is required during install due to a peer dependency conflict between Vite 8 and `@tailwindcss/vite` (Tailwind has not yet updated their peer dep range to support Vite 8)