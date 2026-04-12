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
            let res = await axios.get("http://localhost:4000/author-api/articles", { 
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
     {articles.map((article) => (
    <div key={article._id} className={`${articleCardClass} relative flex flex-col`}>
        {/* Status Badge */}
        <span className={article.isArticleActive ? articleStatusActive : articleStatusDeleted}>
            {article.isArticleActive ? "ACTIVE" : "DELETED"}
        </span>
        
        <h3 className={articleTitle}>{article.title}</h3>
        <p className={articleExcerpt}>{article.content.substring(0, 100)}...</p>
        
        <div className="mt-auto">
            <div className={articleMeta}>
                <span>{article.category}</span>
                <span>{formatDate(article.updatedAt)}</span>
            </div>
            {/* Button to navigate to ArticleByID */}
            <button 
                onClick={() => openArticle(article)} 
                className={`${ghostBtn} w-full mt-4`}
            >
                View Article
            </button>
        </div>
    </div>
))}
    </div>
  );
}

export default AuthorArticles;