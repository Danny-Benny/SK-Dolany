import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ForgotPasswordModal from "./forgotPassword";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [showModal, setShowModal] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch("/auth/login", {
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
        setError(true);
        setErrorMessage("Špatné heslo nebo uživatelské jméno.");
        console.error("Failed to login. Status:", response.status);
      }
    } catch (error) {
      setError(true);
      setErrorMessage("Nastala chyba při přihlašování.");
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
            className={`p-2 border rounded w-full mb-2 ${
              error ? "border-red" : ""
            }`}
          />
          <input
            type="password"
            placeholder="Heslo"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`p-2 border rounded w-full mb-2 ${
              error ? "border-red" : ""
            }`}
          />
          {error && <p className="text-red text-sm mb-2">{errorMessage}</p>}
          <div className="flex justify-between">
            <button
              onClick={() => navigate("/register")}
              className="mt-2 font-bold py-2 px-3 rounded-md bg-mygreen text-white hover:bg-mygreen2 transition duration-300"
            >
              Ještě nemáte účet?
            </button>
            <div></div>
            <button onClick={() => setShowModal(true)} className="mt-2 px-3">
              Zapomenuté heslo?
            </button>
            {showModal && (
              <ForgotPasswordModal onClose={() => setShowModal(false)} />
            )}
            <button
              onClick={handleLogin}
              className="mt-2 font-bold py-2 px-3 rounded-md bg-mygreen text-white hover:bg-mygreen2 transition duration-300"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
