import React from "react";
import { Link } from "react-router-dom";
import { LoginForm } from "@wasp/auth/forms/Login";
export default function Login() {
  return (
    <>
      <LoginForm />
      <br />
      <span className="text-sm font-medium text-gray-900">
        Don't have an account yet? <Link to="/signup">go to signup</Link>.
      </span>
    </>
  );
}
