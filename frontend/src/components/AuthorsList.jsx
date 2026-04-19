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
} from "../styles/common";

import { useEffect, useState } from "react";
import axios from "axios";

function AuthorsList() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch authors
  const fetchAuthors = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "https://capstone-project-bhy0.onrender.com/admin-api/authors",
        { withCredentials: true }
      );

      setAuthors(res.data.payload || []);
    } catch (err) {
      setError("Failed to load authors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  // Loading
  if (loading) {
    return <div className={loadingClass}>Loading authors...</div>;
  }

  // Error
  if (error) {
    return <div className={errorClass}>{error}</div>;
  }

  // Empty
  if (authors.length === 0) {
    return <div className={emptyStateClass}>No authors found</div>;
  }

  return (
    <div className={pageBackground}>
      <div className={pageWrapper}>
        <h1 className={pageTitleClass}>Authors</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {authors.map((author) => (
            <div key={author._id} className={cardClass}>
              
              {/* PROFILE */}
              <div className="flex items-center gap-4">
                <img
                  src={
                    author.profileImageUrl ||
                    "https://via.placeholder.com/80"
                  }
                  alt="author"
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div>
                  <h2 className="text-base font-semibold text-[#1d1d1f]">
                    {author.firstName} {author.lastName}
                  </h2>
                  <p className={bodyText}>{author.email}</p>
                  <p className={mutedText}>Role: {author.role}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AuthorsList;