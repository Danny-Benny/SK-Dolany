import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleRegister = async () => {
    try {
      if (password !== passwordAgain) {
        console.error("Passwords do not match");
        setPasswordsMatch(false);
        return;
      }

      setPasswordsMatch(true);

      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          name,
          surname,
          email,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate("/profile");
      } else {
        console.error("Failed to register. Status:", response.status);
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-100 p-6 text-center">
        <div className="bg-white p-4 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Registrace</h2>
          <input
            type="text"
            placeholder="Jméno"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="Příjmení"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className="p-2 border rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="Uživatelské jméno"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border rounded w-full mb-2"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Heslo"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border rounded w-full mb-2"
            />
            <button
              className="absolute top-0 right-0 mt-2 mr-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="relative">
            <input
              type={showPasswordAgain ? "text" : "password"}
              placeholder="Heslo znovu"
              value={passwordAgain}
              onChange={(e) => setPasswordAgain(e.target.value)}
              className="p-2 border rounded w-full mb-2"
            />
            <button
              className="absolute top-0 right-0 mt-2 mr-2"
              onClick={() => setShowPasswordAgain(!showPasswordAgain)}
            >
              {showPasswordAgain ? "Hide" : "Show"}
            </button>
          </div>
          {!passwordsMatch && (
            <p className="text-red-500 text-left">
              Hesla nejsou shodná. Zadejte stejná hesla.
            </p>
          )}
          <div className="flex justify-between">
            <div></div>
            <button onClick={handleRegister} className="text-black p-2 rounded">
              Registrace
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
