import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";


export default function MainLayout() {
  return (
    <>
      <Navbar />
     
      <Outlet />
     
      <Footer />
    </>
  );
}
