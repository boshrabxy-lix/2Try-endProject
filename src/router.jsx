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
import Favorites from "./pages/favorites/Favorites";
import Checkout from "./pages/cart/Checkout";
import CheckCart from "./pages/cart/CheckCart";
import ProtectedRouter from "../ProtectedRouter";
import Review from "./pages/cart/Review";

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
        path: "Cart",
        element:
          <ProtectedRouter>
            <CheckCart />,
          </ProtectedRouter>,
        children: [
          {
            index: true,
            element: <Cart />,
          },
          {
            path: "checkout",
            element: <Checkout />,
          },
          {
            path: 'review',
            element: <Review />
          },
        ]
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
        path: "favorites",
        element: <Favorites />,
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
      //  {
      //   path: "profile",
      //   element:
      //     <ProtectedRouter>
      //       <Profile />
      //     </ProtectedRouter>,
      //   children: [
      //     {
      //       index: true,
      //       element: <ProfileInfo />
      //     },
      //     {
      //       path: "orders",
      //       element: <ProfileOrders />
      //     },
      //     {
      //       path: "settings",
      //       element: <SettingPage />
      //     },
      //      {
      //       path: "UserInfo",
      //       element: <PUserInfo />
      //     },
      //   ]
      // },
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