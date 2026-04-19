import {
  pageBackground,
  pageWrapper,
  pageTitleClass,
  bodyText,
  primaryBtn,
  articleGrid,
  articleCardClass,
  articleTitle,
  articleExcerpt,
  loadingClass,
  subHeadingClass,
  linkClass,
  tagClass,
  timestampClass
} from "../styles/common";

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchArticles = async () => {
    try {
      const res = await axios.get("https://capstone-project-bhy0.onrender.com/user-api/articles", { 
        withCredentials: true 
      });
      if (res.status === 200) {
        setArticles(res.data.payload);
      }
    } catch (err) {
      console.error("Failed to load articles", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className={`${pageBackground} overflow-x-hidden relative`}>
      {/* GLOW OVERLAYS - Purely aesthetic aurora effect */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[0%] right-[-5%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>
      </div>

      <div className={pageWrapper}>
        
        {/* HERO SECTION */}
        <div className="text-center py-16 md:py-32 mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className={`${pageTitleClass} px-4`}>
            Welcome to BlogSphere
          </h1>

          <p className={`${bodyText} max-w-2xl mx-auto mt-8 text-lg md:text-xl opacity-90`}>
            Discover insightful articles, share your ideas, and explore content
            created by talented authors around the world.
          </p>

          <div className="flex justify-center gap-6 mt-12">
            <button
              className={primaryBtn}
              onClick={() => navigate("/articles")}
            >
              Explore Articles
            </button>
          </div>
        </div>

        {/* FEATURED ARTICLES SECTION */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-12 border-b border-indigo-50 pb-6">
            <h2 className={subHeadingClass}>
              Latest Articles
            </h2>
            <button 
              onClick={() => navigate("/articles")}
              className={linkClass}
            >
              View All
            </button>
          </div>

          {loading ? (
            <div className={loadingClass}>Fetching the latest stories...</div>
          ) : (
            <div className={articleGrid}>
              {articles.slice(0, 6).map((article, index) => (
                <div
                  key={article._id}
                  className={`${articleCardClass} flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-700`}
                  style={{ animationDelay: `${index * 100}ms` }} // Staggered entrance
                  onClick={() => navigate(`/article/${article._id}`)}
                >
                  {/* Category Badge - Using tagClass for pop */}
                  <span className={`${tagClass} mb-4`}>
                    {article.category || "General"}
                  </span>

                  <h3 className={articleTitle}>
                    {article.title}
                  </h3>

                  <p className={`${articleExcerpt} flex-1 mt-4`}>
                    {article.content?.replace(/<[^>]*>/g, '').slice(0, 110)}...
                  </p>

                  <div className="mt-8 pt-6 border-t border-indigo-50/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] text-white font-bold shadow-lg shadow-indigo-100">
                        {article.authorName?.charAt(0) || "U"}
                      </div>
                      <span className="text-sm font-bold text-slate-700">
                         {article.authorName || "Anonymous"}
                      </span>
                    </div>
                    <span className={timestampClass}>
                      {new Date(article.createdAt).toLocaleDateString(undefined, { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Home;