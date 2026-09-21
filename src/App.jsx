import {React,useEffect} from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline, ThemeProvider } from "@mui/material";
import getTheme from "./Theme";
import "./i18next";
import { useTranslation } from "react-i18next";
import useThemeStore from "./store/useThemeStore";
import Swiper from 'swiper';
import 'swiper/css';


export default function App() {
  const queryClient = new QueryClient();
  const mode = useThemeStore((state) => state.mode);
  const { i18n } = useTranslation();

  const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
      delay: 5000,
    },
  });
  
  useEffect(() => {
    const dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
  }, [i18n.language]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <ThemeProvider theme={getTheme(mode)} >
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}