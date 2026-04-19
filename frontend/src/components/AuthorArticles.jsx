import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../store/authStore";

import {
  articleCardClass,
  articleTitle,
  articleExcerpt,
  articleMeta,
  ghostBtn,
  loadingClass,
  errorClass,
  emptyStateClass,
  articleStatusActive,
  articleStatusDeleted,
} from "../styles/common";

function AuthorArticles() {
  const navigate = useNavigate();
  const user = useAuth((state) => state.currentUser);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("user in author profile",user)
  
 useEffect(() => {
    const getAuthorArticles = async () => {
        setLoading(true);
        try {
            // Calling the Author-specific API to get own articles
            let res = await axios.get("https://capstone-project-bhy0.onrender.com/author-api/articles", { 
                withCredentials: true 
            });
            if (res.status === 200) {
                setArticles(res.data.payload);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load articles");
        } finally {
            setLoading(false);
        }
    };

    if (user) {
        getAuthorArticles();
    }
}, [user]);

  const openArticle = (article) => {
    navigate(`/article/${article._id}`, {
      state: article,
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
    });
  };

  if (loading) return <p className={loadingClass}>Loading articles...</p>;
  if (error) return <p className={errorClass}>{error}</p>;

  if (articles.length === 0) {
    return <div className={emptyStateClass}>You haven't published any articles yet.</div>;
  }
return (
  /* Changed to max 2 columns because the sidebar takes space */
  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
    {articles.map((article) => (
      <div 
        key={article._id} 
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between hover:shadow-md transition-shadow duration-300 min-h-[250px]"
      >
        <div>
          <div className="flex justify-between items-start mb-4">
            <span className="bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              {article.category}
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
              article.isArticleActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {article.isArticleActive ? "ACTIVE" : "DELETED"}
            </span>
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
            {article.title}
          </h3>
          
          <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
            {article.content.substring(0, 120)}...
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
          <span className="text-xs text-gray-400 font-medium">
            {formatDate(article.updatedAt)}
          </span>
          <button 
            onClick={() => openArticle(article)} 
            className="text-indigo-600 font-semibold text-sm hover:text-indigo-800 transition-colors"
          >
            Read More →
          </button>
        </div>
      </div>
    ))}
  </div>
);
}

export default AuthorArticles;