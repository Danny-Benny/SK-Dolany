import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token);

        if (!token) {
          console.log(
            "Token not found in local storage. Redirecting to login..."
          );
          navigate("/login");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/protected/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch profile. Status: ${response.status}`
          );
        }

        const data = await response.json();
        setProfile(data.user);
      } catch (error) {
        console.error("Error fetching profile:", (error as Error).message);
        setProfile(null);
      }
    };

    fetchProfile();
  }, [navigate]);

  return (
    <div>
      <h2>Profile</h2>
      {profile ? (
        <div>
          <p>This is a protected route</p>
          {/* Display other profile information */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
