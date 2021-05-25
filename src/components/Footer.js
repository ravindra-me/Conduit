import React from "react";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div className="text-center mt-8">
      <Link to="/login" className="mr-4 text-green-500">
        Sign In
      </Link>
      or
      <Link to="/signup" className="ml-4 mr-4 text-green-500">
        Sign Up
      </Link>
      to add comments on this article.
    </div>
  );
}
