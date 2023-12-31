import React from "react";
import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to Poketrader!</h1>
      <p className="text-lg">
        This is the home page of the application. Here, you can navigate to
        other pages and learn more about the app.
      </p>
      <div className="mt-4">
        <Link
          to="/trade"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Go to Trade Area
        </Link>
        <Link
          to="/profile"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Go to Profile
        </Link>
      </div>
    </div>
  );
}
