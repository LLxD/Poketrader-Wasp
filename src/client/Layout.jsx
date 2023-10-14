import { Link } from "react-router-dom";
import useAuth from "@wasp/auth/useAuth";
import logout from "@wasp/auth/logout";
import "./Main.css";

export const Layout = ({ children }) => {
  const { data: user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary-800 text-white p-4">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <Link to="/">
            <h1 className="text-xl2 font-semibold">Poketrader</h1>
          </Link>
          {user ? (
            <div className="grid grid-flow-col gap-2 items-center">
              <Link to="/profile">
                <span className="underline">Hi, {user.username}! </span>
              </Link>
              <button
                onClick={logout}
                className="text-xl2 p-2 border shadow rounded"
              >
                (Log out)
              </button>
            </div>
          ) : (
            <Link to="/login">
              <h1 className="text-xl2 underline">Log in</h1>
            </Link>
          )}
        </div>
      </header>
      <main className="container mx-auto px-4 py-2 flex-grow max-w-lg">
        {user ? (
          children
        ) : (
          <h1 className="text-center my-16">
            Please,{" "}
            <Link className="underline" to="/signup">
              Sign Up
            </Link>{" "}
            or{" "}
            <Link className="underline" to="/login">
              Login
            </Link>{" "}
          </h1>
        )}
      </main>
      <footer>
        <div className="container mx-auto p-4">
          <p className="text-center text-gray-500 text-sm">
            Poketrader ~ Powered by Wasp
          </p>
        </div>
      </footer>
    </div>
  );
};
