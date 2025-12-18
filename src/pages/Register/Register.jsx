import React from "react";

import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import UseAuth from "../../hooks/UseAuth";
import Swal from "sweetalert2";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const imageHostKey = import.meta.env.VITE_IMGBB_KEY;

  const { registerUser, updateUserProfile } = UseAuth();

  const handleRegistration = (data) => {
    const image = data.image[0];

    console.log(data, image);
    registerUser(data.email, data.password).then((result) => {
      const user = result.user;
      console.log(user);
      // upload image to imgbb
      const formData = new FormData();
      formData.append("image", image);
      const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
      axios
        .post(url, formData)
        .then((res) => {
          console.log(res.data.data.display_url);
          updateUserProfile({
            displayName: data.name,
            photoURL: res.data.data.display_url,
          })
            .then(() => {
              // profile updated
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Welcome to ZapShift. Your account has been created successfully.",
        confirmButtonText: "Login Now",

        confirmButtonColor: "#16a34a",
      })
        .then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Registration Failed",
            text: "Something went wrong. Please try again.",
            confirmButtonText: "Retry",
            confirmButtonColor: "#dc2626",
          });
        });
    });
  };

  return (
    <div>
      <h2 className="text-5xl font-bold mb-4">Create an Account</h2>
      <p>Register with ZapShift</p>
      <form onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset  rounded-box w-xs  mt-4">
          <label className="label font-medium">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Name"
          />

          <label className="label font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />

          <label className="label font-medium">Upload Image</label>
          <input
            type="file"
            {...register("image", { required: true })}
            className="input pt-1 text-primary-content"
          />

          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/,
            })}
            className="input"
            placeholder="Password"
          />

          {errors.password?.type === "pattern" && (
            <p className="text-red-600">
              Password must have one uppercase and one special character.
            </p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-600">
              Password must be 6 characters or longer.
            </p>
          )}

          <button className="btn btn-primary my-2">Register</button>

          <p className="text-sm">
            Already have an account?{" "}
            <span>
              <Link
                state={location.state}
                to="/login"
                className="link font-semibold"
              >
                Login
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

export default Register;
