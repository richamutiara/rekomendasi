import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OptionPage from "./components/options/OptionPage";
import "bootstrap/dist/css/bootstrap.min.css";
import NavHeader from "./components/NavHeader";
import ErrorPage from "./components/error/ErrorPage";
import AdminPage from "./components/admin/AdminPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavHeader />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "options",
        element: <OptionPage />,
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
