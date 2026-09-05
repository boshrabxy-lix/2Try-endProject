import React, { Children } from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import MainLayout from "./components/layouts/Mainlayout";
import Cart from "./pages/cart/Cart";
import Register from "./pages/auth/register/Register";
import Login from "./pages/auth/login/Login";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    Children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ]
  },
]);

export default router;