import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OptionPage from "./components/options/OptionPage";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavHeader from "./components/NavHeader";
import ErrorPage from "./components/error/ErrorPage";
import AdminPage from "./components/admin/AdminPage";
import DetailPage from "./components/rental/DetailPage";
import SearchPage from "./components/search/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavHeader />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <OptionPage />,
      },
      {
        path: "/detail/:id",
        element: <DetailPage />,
      },
      {
        path: "search-results",
        element: <SearchPage />,
      },
    ],
  },
  {
    path: "admin",
    element: <AdminPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
