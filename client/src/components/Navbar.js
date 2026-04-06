import { Link } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");

  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg px-6 py-4 flex justify-between items-center">
      {/* Logo */}

      <Link to="/" className="text-white font-bold text-2xl tracking-wide">
        Blog App
      </Link>
      {/* Links */}
      <div className="flex items-center space-x-6 text-white font-medium">
        <Link to="/" className="hover:text-gray-200 transition duration-200">
          Home
        </Link>

        {token ? (
          <>
            <Link
              to="/create"
              className="hover:text-gray-200 transition duration-200"
            >
              Create
            </Link>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
              className="bg-white text-purple-600 px-4 py-1.5 rounded-lg hover:bg-gray-100 transition duration-200 font-semibold"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:text-gray-200 transition duration-200"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-white text-purple-600 px-4 py-1.5 rounded-lg hover:bg-gray-100 transition duration-200 font-semibold"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
