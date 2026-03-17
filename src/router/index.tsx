import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProductList from "../pages/ProductList";
import ProductDetail from "../pages/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <ProductList /> },
      { path: "products/:id", element: <ProductDetail /> },
    ],
  },
]);
