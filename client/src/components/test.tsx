import React from "react";
import { useAuth } from "./auth/AuthContext";

const AnyComponent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {isAuthenticated() ? (
        <p>Welcome! This content is only visible to logged-in users.</p>
      ) : (
        <p>Please log in to access this content.</p>
      )}
    </div>
  );
};

export default AnyComponent;
