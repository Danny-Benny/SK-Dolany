import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  username: string;
  name: string;
  surname: string;
  email: string;
  role: string;
}

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("/protected/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setUserProfile(data.user);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");
    // Navigate the user to the login page
    navigate("/login");
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 mt-5">{error}</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Profil</h2>
      {userProfile ? (
        <div>
          <div className="mb-4">
            <span className="block text-gray-700 font-bold">Uživatelské Jméno</span>
            <span className="block text-gray-600">{userProfile.username}</span>
          </div>
          <div className="mb-4">
            <span className="block text-gray-700 font-bold">Jméno</span>
            <span className="block text-gray-600">{userProfile.name}</span>
          </div>
          <div className="mb-4">
            <span className="block text-gray-700 font-bold">Přijmení</span>
            <span className="block text-gray-600">{userProfile.surname}</span>
          </div>
          <div className="mb-4">
            <span className="block text-gray-700 font-bold">Email</span>
            <span className="block text-gray-600">{userProfile.email}</span>
          </div>
          <div className="mb-4">
            <span className="block text-gray-700 font-bold">Role</span>
            <span className="block text-gray-600">{userProfile.role}</span>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-600">No profile data available.</div>
      )}
      <button
        onClick={handleLogout}
        className="mt-4 w-full bg-mygreen text-white py-2 rounded hover:bg-mygreen2 transition duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
