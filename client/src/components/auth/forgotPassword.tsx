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
      const response = await fetch("/mailer/requestResetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

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
        <span className="close cursor-pointer" onClick={onClose}>
          &times;
        </span>
        <h2>Resetování hesla přes email</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleResetRequest}
          className="mt-2 font-bold py-2 px-3 rounded-md bg-mygreen text-white hover:bg-mygreen2 transition duration-300"
        >
          Požádat o změnu hesla
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
