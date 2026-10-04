import React, { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", className = "", error, ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label htmlFor="id" className="inline-block mb-1 pl-1 font-medium">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        ref={ref}
        {...props}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none 
        border w-full transition duration-200 
        ${
          error
            ? "border-red-500 focus:ring-2 focus:ring-red-400"
            : "border-gray-300 focus:ring-2 focus:ring-indigo-500"
        } 
        ${className}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
});

export default Input;
