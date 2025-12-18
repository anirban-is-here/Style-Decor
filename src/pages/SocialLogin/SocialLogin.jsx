import React from "react";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";
import UseAuth from "../../hooks/UseAuth";
import api from "../../services/api"; // Axios instance pointing to your backend

const SocialLogin = () => {
  const { signInWithGoogle, setLoading } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSignInWithGoogle = async () => {
    setLoading(true);
    Swal.fire({
      title: "Logging you in...",
      text: "Please wait...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const result = await signInWithGoogle();
      const loggedInUser = result.user;

      // Send user info to your deployed backend
      const res = await api.post("/api/auth/google-login", {
        name: loggedInUser.displayName,
        email: loggedInUser.email,
      });

      // Save JWT in localStorage (matching your Axios instance)
      localStorage.setItem("access-token", res.data.token);

      Swal.close();
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: `Welcome ${loggedInUser.displayName || "User"}!`,
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        setLoading(false);
        navigate(from, { replace: true });
      });
    } catch (err) {
      console.error(err);
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Unable to login. Please try again.",
      });
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignInWithGoogle}
      className="btn bg-white text-black border-[#e5e5e5]"
    >
      Login with Google
    </button>
  );
};

export default SocialLogin;
