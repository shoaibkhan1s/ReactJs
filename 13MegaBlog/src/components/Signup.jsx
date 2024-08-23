import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Navigation aur linking ke liye import kiya
import authService from "../appwrite/auth"; // Appwrite se authentication service import kiya
import { useForm } from "react-hook-form"; // Form handling ke liye React Hook Form ka use
import { login } from "../store/authSlice"; // Redux ke login action ko import kiya
import { Button, Input, Logo } from "./index"; // Button, Input aur Logo components ko import kiya
import { useDispatch } from "react-redux"; // Redux dispatch function ko use karne ke liye

function Signup() {
  const dispatch = useDispatch(); // Redux dispatch ko initialize kiya
  const navigate = useNavigate(); // Navigation ke liye hook use kiya
  const { register, handleSubmit } = useForm(); // useForm ka use form ko manage aur submit karne ke liye
  const [error, setError] = useState(""); // Error message ko handle karne ke liye state banayi

  const create = async (data) => { // Account create karne ke liye function
    setError(""); // Error ko reset kar rahe hain
    try {
      const session = await authService.createAccount(data); // Appwrite se account create karne ki koshish karte hain
      if (session) {
        const userData = await authService.getCurrentUser(); // Agar account create ho jata hai, toh user data fetch karte hain
        if (userData) dispatch(login(userData)); // Redux store me user data save karte hain
        navigate("/"); // User ko home page pe redirect karte hain
      }
    } catch (error) { // Agar account creation fail hota hai toh error message set karte hain
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full"> {/* Container jo center me align karta hai */}
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 ">
        <div className="mb-2 flex justify-center"> {/* Logo ko center me align karne ke liye */}
          <span className="inline-block w-full max-w=[100px]">
            <Logo width="100%" /> {/* Logo component jo app ka logo dikhata hai */}
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight ">
          Sign up to create account
        </h2> {/* Heading jo batata hai ki user account create kar raha hai */}
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign in
          </Link> {/* Agar user ke paas account hai toh sign in karne ka link */}
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>} {/* Agar error hai toh red color me error message dikhaye */}
        
        <form onSubmit={handleSubmit(create)}> {/* Form submit hone pe handleSubmit function call hota hai */}
          <div className="space-y-5">
            <Input
              label="Full Name" // Full name input field
              placeholder="Enter your full name" // Placeholder text jo dikhaya jayega
              {...register("name", { // useForm se name field ko register kar rahe hain
                required: true, // Required validation set kiya
              })}
            />
            <Input
              label="Email: " // Email input field
              type="email"
              placeholder="Enter your email" // Placeholder text
              {...register("email", { // useForm se email field ko register kar rahe hain
                required: true, // Required validation set kiya
                validate: {
                  matchPattern: (value) =>
                    /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || // Email validation pattern
                    "Enter valid email address", // Validation error message
                },
              })}
            />
            <Input
              type="password" // Password input field
              label="Password"
              placeholder="Enter your password" // Placeholder text
              {...register("password", { // useForm se password field ko register kar rahe hain
                required: true, // Required validation set kiya
              })}
            />
            <Button type="submit" className="w-full">Create Account</Button> {/* Form submit button */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
