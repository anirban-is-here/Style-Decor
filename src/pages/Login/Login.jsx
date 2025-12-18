import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import UseAuth from "../../hooks/UseAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { signInUser, setLoading } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  console.log(from);

  const handleSignIn = (data) => {
    setLoading(true);
    Swal.fire({
      title: "Logging you in...",
      text: "Please wait a moment",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    signInUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        if (user) {
          Swal.close();
          Swal.fire({
            icon: "success",
            title: "Login Successful!",
            text: `Welcome back ${user.displayName || "User"}!`,
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            setLoading(false);
            // redirect to home
            navigate(from, { replace: true });
          });
        }
      })
      .catch((error) => {
        console.log(error.message);
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message.slice(22, -2),
          confirmButtonText: "Try Again",
          confirmButtonColor: "#dc2626",
        });
      });
  };
  return (
    <div>
      <h2 className="text-4xl font-bold mb-4">Welcome Back</h2>
      <p>Login with ZapShift</p>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <fieldset className="fieldset  rounded-box w-xs  mt-4">
          <label className="label font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />

          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="input"
            placeholder="Password"
          />

          <a className="hover:font-semibold mt-2" href="">
            Forgot Password?
          </a>

          <button className="btn btn-primary my-2">Login</button>

          <p className="text-sm">
            Don’t have any account?{" "}
            <span>
              <Link
                state={location.state}
                to="/register"
                className="link font-semibold"
              >
                Register
              </Link>
            </span>
          </p>
          <h1 className="text-center text-lg">or</h1>
        </fieldset>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
