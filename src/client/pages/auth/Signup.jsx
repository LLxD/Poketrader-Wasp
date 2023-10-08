import React from "react";
import { Link } from "react-router-dom";
import { SignupForm } from "@wasp/auth/forms/Signup";
export default function Signup() {
  return (
    <>
      <SignupForm />
      <br />
      <span className="text-sm font-medium text-gray-900">
        I already have an account (<Link to="/login">go to login</Link>).
      </span>
    </>
  );
}
