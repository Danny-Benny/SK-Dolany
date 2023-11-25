import React, { useState, useEffect } from "react";
import DiscussionsSelector from "./components/discussionsSelector";
import { useAuth } from "../components/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Discussions = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      // Simulate an asynchronous check for authentication
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if the user is authenticated
      if (!isAuthenticated()) {
        // If not authenticated, redirect to /login
        navigate("/login");
      }

      // Set loading to false after the check is complete
      setLoading(false);
    };

    // Call the authentication check function
    checkAuthAndRedirect();
  }, [isAuthenticated, navigate]);

  // Render a loading spinner while checking authentication
  if (loading) {
    const spinnerStyle = {
      display: "block",
      margin: "0 auto",
      borderColor: "red",
    };

    return (
      <div className="text-center mt-4">
        <ClipLoader
          color={"#36D7B7"}
          loading={loading}
          size={50}
          style={spinnerStyle}
        />
      </div>
    );
  }

  // If authenticated, render the DiscussionsSelector components
  return (
    <div>
      <DiscussionsSelector title={"Verejnost"} />
      <DiscussionsSelector title={"Občané dolan"} />
      <DiscussionsSelector title={"Hráči SK"} />
      <DiscussionsSelector title={"Výbor SK"} />
    </div>
  );
};

export default Discussions;
