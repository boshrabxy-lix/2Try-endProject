import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline, ThemeProvider } from "@mui/material";
import getTheme from "./Theme";
import useThemeStore from "./store/useThemeStore";
export default function App() {
  const queryClient = new QueryClient();
   const mode= useThemeStore((state)=>state.mode);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={getTheme(mode)} >
            <CssBaseline />
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}