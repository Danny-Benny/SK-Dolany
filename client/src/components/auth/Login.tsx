import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ForgotPasswordModal from "./forgotPassword";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showModal, setShowModal] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Received data:", data);
        console.log(data);
        navigate("/profile");

        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userRole", data.user.role);
          console.log("Token stored in local storage:", data.token);
          console.log("All items in local storage:", localStorage);
        } else {
          console.error("Token not found in the response");
        }
      } else {
        console.error("Failed to login. Status:", response.status);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-100 p-6 text-center">
        <div className="bg-white p-4 rounded-2xl shadow-xl max-w-xl">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <input
            type="text"
            placeholder="Uživatelské jméno"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border rounded w-full mb-2"
          />
          <input
            type="password"
            placeholder="Heslo"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded w-full mb-2"
          />
          <div className="flex justify-between">
            <button
              onClick={() => navigate("/register")}
              className="text-black p-2 rounded"
            >
              Ještě nemáte účet?
            </button>
            <div></div>
            <button onClick={handleLogin} className=" text-black p-2 rounded">
              Login
            </button>
            <button onClick={() => setShowModal(true)}>Forgot Password?</button>
            {showModal && (
              <ForgotPasswordModal onClose={() => setShowModal(false)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
