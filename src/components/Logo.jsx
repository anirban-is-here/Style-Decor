import React from 'react';
import logo from "../../src/assets/logo.png";
import { Link } from 'react-router';

const Logo = () => {
    return (
      <div>
        <Link
          to={"/"}
          className="logo flex items-center justify-center gap-3 ml-5 bg-transparent"
        >
          <img className="h-15 w-15 " src={logo} alt="" />
          <h2 className="font-bold text-2xl">
            Style <span className="">Decor</span>
          </h2>
        </Link>
      </div>
    );
};

export default Logo;