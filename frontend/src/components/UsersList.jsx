import {
  pageBackground,
  pageWrapper,
  pageTitleClass,
  cardClass,
  bodyText,
  mutedText,
  loadingClass,
  errorClass,
  emptyStateClass,
  deleteBtn,
} from "../styles/common";

import { useEffect, useState } from "react";
import axios from "axios";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:4000/admin-api/users",
        { withCredentials: true }
      );

      setUsers(res.data.payload || []);
    } catch (err) {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
  const handleDelete = async (userId) => {
    try {
      await axios.delete(
        `http://localhost:4000/admin-api/users/${userId}`,
        { withCredentials: true }
      );

      // Update UI after delete
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      console.log(err);
      setError("Failed to delete user");
    }
  };

  // Loading
  if (loading) {
    return <div className={loadingClass}>Loading users...</div>;
  }

  // Error
  if (error) {
    return <div className={errorClass}>{error}</div>;
  }

  // Empty
  if (users.length === 0) {
    return <div className={emptyStateClass}>No users found</div>;
  }

  return (
    <div className={pageBackground}>
      <div className={pageWrapper}>
        <h1 className={pageTitleClass}>Users</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {users.map((user) => (
            <div key={user._id} className={cardClass}>
              
              {/* PROFILE */}
              <div className="flex items-center gap-4">
                <img
                  src={
                    user.profileImageUrl ||
                    "https://via.placeholder.com/80"
                  }
                  alt="user"
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div>
                  <h2 className="text-base font-semibold text-[#1d1d1f]">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className={bodyText}>{user.email}</p>
                  <p className={mutedText}>Role: {user.role}</p>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="mt-4 flex justify-end">
                <button
                  className={deleteBtn}
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UsersList;