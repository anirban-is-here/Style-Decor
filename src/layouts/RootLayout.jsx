import React from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="container mx-auto px-5">
      <Navbar></Navbar>
      <Outlet className=""></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
