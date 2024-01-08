import React, { useState } from "react";

type ForgotPasswordModalProps = {
  onClose: () => void;
};

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  onClose,
}) => {
  const [email, setEmail] = useState("");

  const handleResetRequest = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/mailer/requestResetPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        console.log("Reset link sent to email");
      } else {
        console.error("Failed to send reset link");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Reset Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleResetRequest}>Request Password Reset</button>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
