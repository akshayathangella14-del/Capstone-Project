import {
  pageBackground,
  pageWrapper,
  pageTitleClass,
  articleGrid,
  articleCardClass,
  articleTitle,
  articleExcerpt,
  articleMeta,
  loadingClass,
  emptyStateClass,
  errorClass,
  tagClass, // Assuming this exists in your common.js
} from "../styles/common";

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchArticles = async () => {
    try {
      setLoading(true);
      // Get the token from wherever you store it
      const token = localStorage.getItem("token"); 

      const res = await axios.get("https://capstone-project-bhy0.onrender.com/user-api/articles", {
        headers: {
          Authorization: token ? `Bearer ${token}` : ""
        }
      });
      setArticles(res.data.payload || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load articles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) return (
    <div className={`${pageBackground} flex items-center justify-center`}>
      <div className={loadingClass}>Fetching latest stories...</div>
    </div>
  );

  if (error) return <div className={`${errorClass} m-10`}>{error}</div>;

  return (
    <div className={`${pageBackground} min-h-screen`}>
      <div className={pageWrapper}>
        
        {/* Header Section */}
        <div className="mb-16 border-b border-gray-100 pb-8">
          <h1 className={pageTitleClass}>Articles</h1>
          <p className="text-gray-500 mt-2 text-lg">
            Explore the latest thoughts, tutorials, and insights from our community.
          </p>
        </div>

        {/* Optimized Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article._id}
              className={`${articleCardClass} group flex flex-col justify-between h-full hover:shadow-2xl transition-all duration-500 ease-out border-white/40`}
              onClick={() => navigate(`/article/${article._id}`, { state: article })}
            >
              <div>
                {/* Category/Tag placeholder */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider">
                    {article.category || "General"}
                  </span>
                  <span className="text-gray-300 text-xs">•</span>
                  <span className="text-gray-400 text-[10px] font-medium uppercase tracking-widest">
                    5 min read
                  </span>
                </div>

                <h2 className={`${articleTitle} group-hover:text-indigo-600 transition-colors duration-300 leading-tight`}>
                  {article.title}
                </h2>

                <p className={`${articleExcerpt} mt-4 text-gray-500 line-clamp-3`}>
                  {article.content}
                </p>
              </div>

              {/* Footer info with Avatar placeholder */}
              <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                    {article.author?.firstName?.charAt(0) || "U"}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-800">
                      {article.author?.firstName || "Unknown"}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {new Date(article.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                </div>
                
                {/* Visual Arrow link */}
                <div className="text-indigo-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Articles;