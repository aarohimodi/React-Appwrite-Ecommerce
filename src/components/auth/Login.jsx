import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Input from "../Input";
import { login as authlogin } from "../../store/authSlice";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import Button from "../Button";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    setError("");
    setLoading(true);
    try {
      const session = await authService.login(data);

      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(
            authlogin({
              $id: userData.$id,
              name: userData.name,
              email: userData.email,
            })
          );
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-2">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-6">
          Login to continue Shopping
        </p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
            })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your Password"
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required",
            })}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Sign In"}
          </Button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          <Link to="/signup" className="text-indigo-500 hover:underline">
            {" "}
            Don't have an account?
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
