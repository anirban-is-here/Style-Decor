import React from "react";
import authImg from '../assets/auth.jpg'

import { Outlet } from "react-router";
import Logo from "../components/Logo";

const AuthLayout = () => {
  return (
    <div className="flex max-w-9xl mx-auto ">
      <div className="bg-white/80 h-full w-1/2 pt-5 flex flex-col gap-10 justify-center items-center">
        <div className="pl-7">
          <Logo></Logo>
        </div>
        <div className="    flex justify-center gap-5 items-center h-full ">
          <Outlet></Outlet>
        </div>
      </div>
      <div className="flex justify-center items-center ">
        <img className="w-200 h-200 " src={authImg} alt="Authentication" />
      </div>
    </div>
  );
};

export default AuthLayout;

