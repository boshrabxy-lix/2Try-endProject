import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import MainLayout from "./components/layouts/Mainlayout";
import Cart from "./pages/cart/Cart";
import Register from "./pages/auth/register/Register";
import Login from "./pages/auth/login/Login";
import AuthLayout from "./components/layouts/Authlayout";
import ProductPage from "./pages/productPage/ProductPage";
import CategoriesPage from "./pages/categoriesPage/CategoriesPage";
import JournalAbout from "./pages/journalAbout/JournalAbout";
import ContactSupport from "./pages/contactSupport/ContactSupport";
import ProByCategory from "./pages/proByCategory/ProByCategory";
import ProductDetails from "./pages/productDetails/ProductDetails";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "products",
        element: <ProductPage />,
      },
      {
        path: "collections",
        element: <CategoriesPage />,
      },
      {
        path: "journal",
        element: <JournalAbout />,
      },
      {
        path: "contact",
        element: <ContactSupport />,
      },
      {
        path: "Products/collections/:id",
        element: <ProByCategory />
      }, 
      {
        path: "Products/:id",
        element: <ProductDetails />
      },
    ]
  }
  , {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        index: true,
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