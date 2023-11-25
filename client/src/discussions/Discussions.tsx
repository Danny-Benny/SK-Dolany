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
      <DiscussionsSelector title={"Verejnost"} />
      <DiscussionsSelector title={"Občané dolan"} />
      <DiscussionsSelector title={"Hráči SK"} />
      <DiscussionsSelector title={"Výbor SK"} />
    </div>
  );
};

export default Discussions;
