import React, { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async () => {
    try {
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
        console.log(data); // handle success
      } else {
        console.error("Failed to register. Status:", response.status);
        // You can handle error scenarios here
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
          <input
            type="password"
            placeholder="Heslo"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded w-full mb-2"
          />
          <div className="flex justify-between">
            {/* Empty div for spacing */}
            <div></div>
            <button
              onClick={handleRegister}
              className=" text-black p-2 rounded"
            >
              Registrace
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
