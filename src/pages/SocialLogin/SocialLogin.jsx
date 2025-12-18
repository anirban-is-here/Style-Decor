import React from "react";

import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";
import UseAuth from "../../hooks/UseAuth";



const SocialLogin = () => {
  const { signInWithGoogle, setLoading } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  // Login handler
  const handleSignInWithGoogle = () => {
    setLoading(true);
    Swal.fire({
      title: "Logging you in...",
      text: "Please wait a moment",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    signInWithGoogle().then(async (result) => {
      const loggedInUser = result.user;

      const userInfo = {
        name: loggedInUser.displayName,
        email: loggedInUser.email,
      };

      const res = await fetch("http://localhost:5000/api/auth/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });

      const data = await res.json();

      localStorage.setItem("token", data.token); // store JWT

      Swal.close();

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: `Welcome ${loggedInUser.displayName || "User"}!`,
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
          setLoading(false)
        navigate(from, { replace: true });
      });
    });
  };

  return (
    <>
      <button
        onClick={handleSignInWithGoogle}
        className="btn bg-white text-black border-[#e5e5e5]"
      >
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        Login with Google
      </button>
    </>
  );
};

export default SocialLogin;
