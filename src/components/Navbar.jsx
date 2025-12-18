import React from "react";

import { Link, Navigate, NavLink } from "react-router";


import Swal from "sweetalert2";
import UseAuth from "../hooks/UseAuth";
import Logo from "./Logo";

const Navbar = () => {
  const { user, loading, signOutUser } = UseAuth();

  const handleLogout = () => {
    Swal.fire({
      title: "Logging you out...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    signOutUser()
      .then(() => {
        Swal.close();
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have successfully logged out.",
          timer: 1200,
          showConfirmButton: false,
        }).then(() => {
          Navigate("/login"); // redirect to home
        });
      })
      .catch((error) => {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Logout Failed",
          text: error.message,
        });
      });
  };
  const activeClass =
    "px-4 py-2 rounded-full bg-primary mr-2 transition-all duration-300 ease-in-out";
  const normalClass =
    "px-4 py-2 rounded-full text-secondary hover:text-black mr-2 transition-all duration-300 ease-in-out";

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? activeClass : normalClass)}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/coverage"
          className={({ isActive }) => (isActive ? activeClass : normalClass)}
        >
          Services
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? activeClass : normalClass)}
        >
          About 
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/pricing"
          className={({ isActive }) => (isActive ? activeClass : normalClass)}
        >
          Contact
        </NavLink>
      </li>
    
      {user && (
        <li>
          <NavLink
            to="/parcels"
            className={({ isActive }) => (isActive ? activeClass : normalClass)}
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar  bg-base-100 shadow-md z-50 px-8 h-17 rounded-xl">
      {/* Navbar Start */}
      <div className="navbar-start flex items-center gap-4 ">
        {/* Mobile Dropdown */}
        <div className="lg:hidden dropdown">
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-white rounded-xl shadow-lg mt-2 w-60 p-4"
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
        <Logo></Logo>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-md font-bold">{links}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center gap-2">
        {loading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : user ? (
          <div className="dropdown dropdown-end">
            <button className="rounded-full">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User Avatar"
                  className="rounded-full w-12 h-12"
                />
              ) : user.displayName ? (
                user.displayName[0].toUpperCase()
              ) : (
                "U"
              )}
            </button>
            <ul className="dropdown-content menu p-2 shadow bg-white rounded-box mt-2 w-48">
              <li>
                <button>Profile</button>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link to={"/login"} className="btn rounded-lg font-bold text-lg">
              Sign In
            </Link>
            <Link
              to={"/register"}
              className="btn rounded-lg btn-primary text-secondary font-bold text-lg "
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
