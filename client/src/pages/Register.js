import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/api/auth/register", { name, email, password });
      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create Account 🚀
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-200"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-purple-600 cursor-pointer font-medium"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
