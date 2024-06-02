import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../Appwrite/Auth";
import { useDispatch } from "react-redux";
import { Button, Input, Logo } from "./index";
import { set, useForm } from "react-hook-form";
import { login } from "../store/AuthSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);

      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign in
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="fullName"
              placeholder="enter your name"
              type="text"
              {...register("text", {
                required: true,
              })}
            />

            <Input
              label="email"
              placeholder="enter your email address"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchpattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                      value || "Email address must be valid address"
                    ),
                },
              })}
            />

            <Input 
            label = "password: "
            placeholder = "enter your password"
            type = "password"
            {...register('password', {
                required: true
            })}
            />

            <Button type="submit" className="w-full">Create Account</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
