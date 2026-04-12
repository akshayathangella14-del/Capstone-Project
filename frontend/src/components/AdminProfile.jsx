import {
  pageBackground,
  pageWrapper,
  headingClass,
  bodyText,
  mutedText,
  primaryBtn,
  secondaryBtn,
  cardClass,
} from "../styles/common";

import { useEffect, useState } from "react";
import axios from "axios";

function AdminProfile() {
  const [admin, setAdmin] = useState(null);
  const [error, setError] = useState(null);

  // Fetch logged-in admin details
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/auth/check-auth",
        { withCredentials: true }
      );

      setAdmin(res.data.payload);
    } catch (err) {
      setError("Failed to load profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:4000/auth/logout", {
        withCredentials: true,
      });
      window.location.replace("/login");
    } catch (err) {
      console.log(err);
    }
  };

  if (error) return <p className="text-center text-red-500">{error}</p>;

  if (!admin)
    return <p className="text-center mt-20 text-gray-400">Loading...</p>;

  return (
    <div className={pageBackground}>
      <div className={pageWrapper}>
        <h1 className={headingClass}>Admin Profile</h1>

        <div className="mt-8">
          <div className={cardClass}>
            {/* PROFILE HEADER */}
            <div className="flex items-center gap-6">
              <img
                src={
                  admin.profileImageUrl ||
                  "https://via.placeholder.com/100"
                }
                alt="profile"
                className="w-24 h-24 rounded-full object-cover"
              />

              <div>
                <h2 className="text-xl font-semibold text-[#1d1d1f]">
                  {admin.firstName} {admin.lastName}
                </h2>
                <p className={bodyText}>{admin.email}</p>
                <p className={mutedText}>Role: {admin.role}</p>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-8 flex gap-4">
              <button className={secondaryBtn}>
                Edit Profile
              </button>

              <button
                className={primaryBtn}
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;