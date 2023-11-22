import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

        if (data.token) {
          localStorage.setItem("token", data.token);
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
        <div className="bg-white p-4 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border rounded w-full mb-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded w-full mb-2"
          />
          <div className="flex justify-between">
            <div></div>
            <button onClick={handleLogin} className=" text-black p-2 rounded">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
