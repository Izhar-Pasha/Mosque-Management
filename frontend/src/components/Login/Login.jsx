import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { login } from "../api_calls/authAPI.js";
import toast from "react-hot-toast";
import "./Login.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();

  const queryClient = useQueryClient();

  const Login = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("Successfully login");
      queryClient.invalidateQueries({ queryKey: ["login"] });
      navigate("/api/dashboard");
    },
    onError: (err) => {
      toast.error(
        err.response?.data.message || err.message || "Something went wrong"
      );
      return;
    },
  });

  const onSubmit = (data) => {
    Login.mutate(data);
    reset();
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>LOGIN</h1>
        <input
          type="text"
          placeholder="User name"
          autoComplete="userName"
          {...register("userName", { required: true })}
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          {...register("password", { required: true })}
        />
        <button type="submit">Login</button>
      </form>
      <h4>MASJID - E - ABU BACKER</h4>
    </div>
  );
};

export default Login;
