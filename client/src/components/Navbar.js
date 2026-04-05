import { Link } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");

  return (
    <div className="bg-white shadow-md p-4 flex justify-between">
      <h1 className="font-bold text-xl">Blog App</h1>

      <div className="space-x-4">
        <Link to="/">Home</Link>

        {token ? (
          <>
            <Link to="/create">Create</Link>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
