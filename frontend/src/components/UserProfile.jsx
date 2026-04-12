import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { 
  articleGrid, articleCardClass, articleTitle, ghostBtn, 
  loadingClass, errorClass, timestampClass, articleExcerpt, articleMeta, divider 
} from "../styles/common.js";

function UserProfile() {
  const logout = useAuth((state) => state.logout);
  const currentUser = useAuth((state) => state.currentUser);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);
      try {
        let res = await axios.get("http://localhost:4000/user-api/articles", { withCredentials: true });
        if (res.status === 200) {
          setArticles(res.data.payload);
        }
      } catch (err) {
        setError(err.response?.data?.error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    getArticles();
  }, []);

  const onLogout = async () => {
    await logout();
    navigate("/login"); // Missing in snippet: needs to return to login after clearing cookie
  };

  const navigateToArticleByID = (articleObj) => {
    navigate(`/article/${articleObj._id}`, { state: articleObj });
  };

  if (loading) return <p className={loadingClass}>Loading articles...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Profile Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center text-2xl font-bold">
            {currentUser?.firstName?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold">Welcome, {currentUser?.firstName}!</h1>
            <p className="text-gray-500">Explore the latest articles</p>
          </div>
        </div>
        <button onClick={onLogout} className="text-red-600 font-medium hover:underline">Logout</button>
      </div>

      <div className={divider}></div>

      {/* ERROR */}
      {error && <p className={errorClass}>{error}</p>}

      {/* Article Grid - Missing in snippet */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <div key={article._id} className={articleCardClass}>
            <span className="text-xs font-bold text-[#0066cc] uppercase tracking-wider">{article.category}</span>
            <h2 className={articleTitle}>{article.title}</h2>
            <p className={articleExcerpt}>{article.content.substring(0, 120)}...</p>
            
            <div className={articleMeta}>
              <span>By Author</span> {/* Backend returns author ID, can be populated if needed */}
              <span className={timestampClass}>
                {new Date(article.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            <button 
              onClick={() => navigateToArticleByID(article)} 
              className={`${ghostBtn} w-full mt-4`}
            >
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProfile;