import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const resetToken = searchParams.get("token");

  const handlePasswordReset = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/mailer/resetPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: resetToken, password }),
        }
      );

      if (response.ok) {
        alert("Password reset successfully");
        navigate("/login");
      } else {
        alert("Failed to reset password");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="reset-password-form">
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handlePasswordReset}>Reset Password</button>
    </div>
  );
};

export default ResetPassword;
