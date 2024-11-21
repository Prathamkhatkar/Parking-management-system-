import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SigninSignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username,
      email,
      phoneNumber: phone, // Match backend naming
      password,
      role,
    };
  
    try {
      let response;
      if (isSignUp) {
        response = await axios.post("http://localhost:5001/api/users/register", data);
        if (response.data.success) {
          alert(response.data.message); // Display backend success message
          navigate("/");
        }
      } else {
        response = await axios.post("http://localhost:5001/api/users/login", {
          email,
          password,
        });
        if (response.data.success) {
          alert(response.data.message); // Display backend success message
          navigate("/");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred."); // Backend error message
      console.error(err);
    }
  };
  
  return (
    <div className="bg-black flex items-center justify-center min-h-screen">
      <div className="bg-purple-700 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
                placeholder="Enter your username"
              />
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {isSignUp && (
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
                placeholder="Enter your phone number"
              />
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {isSignUp && (
            <div className="mb-4">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500"
              >
                <option value="">Select a role</option>
                <option value="admin">Admin</option>
                <option value="user">User </option>
              </select>
            </div>
          )}

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <div>
            <button
              type="submit"
              className="px-8 py-4 bg-rose-400 rounded-md text-white font-semibold"
            >
              {isSignUp ? "Sign Up" : "Login"}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <span
            className="text-sm text-blue-500 cursor-pointer"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SigninSignUp;
