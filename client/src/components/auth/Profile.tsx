import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

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
  const [users, setUsers] = useState<UserProfile[]>([]);
  const navigate = useNavigate();
  const { isAuthenticated, userRole } = useAuth();
  const availableRoles = ["public", "citizens", "players", "management"];

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

    const fetchUsers = async () => {
      try {
        const response = await fetch("/auth/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const usersData = await response.json();
        setUsers(usersData);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchProfile();
    fetchUsers();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isAdmin = () => isAuthenticated() && userRole === "management";

  const handleChangeRole = async (username: string, newRole: string) => {
    try {
      const response = await fetch("/auth/setRole", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ username, role: newRole }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const updatedUsers = users.map((user) =>
        user.username === username ? { ...user, role: newRole } : user
      );
      setUsers(updatedUsers);
    } catch (err) {
      console.error("Error changing role:", err);
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 mt-5">{error}</div>;
  }

  return (
    <>
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Profile</h2>
        {userProfile ? (
          <div>
            <div className="mb-4">
              <span className="block text-gray-700 font-bold">Username</span>
              <span className="block text-gray-600">
                {userProfile.username}
              </span>
            </div>
            <div className="mb-4">
              <span className="block text-gray-700 font-bold">Name</span>
              <span className="block text-gray-600">{userProfile.name}</span>
            </div>
            <div className="mb-4">
              <span className="block text-gray-700 font-bold">Surname</span>
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
          <div className="text-center text-gray-600">
            No profile data available.
          </div>
        )}
        <button
          onClick={handleLogout}
          className="mt-4 w-full bg-mygreen text-white py-2 rounded hover:bg-mygreen2 transition duration-300"
        >
          Logout
        </button>
      </div>
      {isAdmin() && (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Admin Sekce</h2>
          <div>
            {users.map((user) => (
              <div
                key={user.username}
                className="flex justify-between items-center border-b border-gray-300 py-2"
              >
                <div>
                  <span className="font-bold">{user.username}</span> -{" "}
                  {user.email} - {user.role}
                </div>
                <div>
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleChangeRole(user.username, e.target.value)
                    }
                    className="bg-gray-200 rounded px-2 py-1"
                  >
                    {availableRoles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
