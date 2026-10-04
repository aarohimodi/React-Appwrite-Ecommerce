import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Input from "../Input";
import Button from "../Button";
import { login as authLogin } from "../../store/authSlice";
import authService from "../../appwrite/auth";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const create = async (data) => {
    try {
      setError("");
      setLoading(true);
      const session = await authService.createAccount(data);

      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(
            authLogin({
              $id: userData.$id,
              name: userData.name,
              email: userData.email,
            })
          );
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message || "Sign Up Failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-2">Create Account</h2>
        <p className="text-center text-gray-500 mb-6">
          Start your shopping journey
        </p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit(create)} className="space-y-4">
          <Input
            label="Name"
            placeholder="Enter Your Name"
            error={errors.name?.message}
            {...register("name", {
              required: "Name is required",
            })}
          />
          <Input
            label="Email"
            placeholder="Enter Your Email"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
            })}
          />
          <Input
            label="Password"
            placeholder="Enter Your Password"
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Minimum 8 characters required",
              },
            })}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?
          <Link to="/login" className="text-indigo-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
