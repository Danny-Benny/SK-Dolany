import React, { useState, useEffect } from "react";
import DiscussionsSelector from "./components/discussionsSelector";
import { useAuth } from "../components/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Discussions = () => {
  const { isAuthenticated, userRole } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!isAuthenticated()) {
        navigate("/login");
      }

      setLoading(false);
    };

    checkAuthAndRedirect();
  }, [isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader color={"#36D7B7"} loading={loading} size={50} />
      </div>
    );
  }

  return (
    <div>
      {(userRole === "public" ||
        userRole === "citizen" ||
        userRole === "player" ||
        userRole === "management") && (
        <DiscussionsSelector title={"Verejnost"} />
      )}
      {(userRole === "citizen" ||
        userRole === "player" ||
        userRole === "management") && (
        <DiscussionsSelector title={"Občané dolan"} />
      )}
      {(userRole === "player" || userRole === "management") && (
        <DiscussionsSelector title={"Hráči SK"} />
      )}
      {userRole === "management" && <DiscussionsSelector title={"Výbor SK"} />}
    </div>
  );
};

export default Discussions;
