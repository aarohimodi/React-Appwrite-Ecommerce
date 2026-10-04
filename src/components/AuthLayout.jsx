import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AuthLayout({ children, authentication = true }) {
  const authStatus = useSelector((state) => state.auth.status);
  if (authentication && !authStatus) {
    return <Navigate to="/login" />;
  }
  if (!authentication && authStatus) {
    return <Navigate to="/" />;
  }
  return children;
}

export default AuthLayout;
