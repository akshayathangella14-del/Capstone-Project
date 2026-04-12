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
  articleMeta,
  loadingClass,
} from "../styles/common";

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch latest articles
 const fetchArticles = async () => {
  try {
    // 1. Change to user-api to see all active articles
    // 2. Add withCredentials: true to send the JWT cookie
    const res = await axios.get("http://localhost:4000/user-api/articles", { 
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
    <div className={pageBackground}>
      <div className={pageWrapper}>
        
        {/* HERO SECTION */}
        <div className="text-center mb-20">
          <h1 className={pageTitleClass}>
            Welcome to BlogSphere
          </h1>

          <p className={`${bodyText} max-w-xl mx-auto mt-4`}>
            Discover insightful articles, share your ideas, and explore content
            created by talented authors around the world.
          </p>

          <button
            className={`${primaryBtn} mt-6`}
            onClick={() => navigate("/articles")}
          >
            Explore Articles
          </button>
        </div>

        {/* FEATURED ARTICLES */}
        <div>
          <h2 className="text-2xl font-bold text-[#1d1d1f] mb-6">
            Latest Articles
          </h2>

          {loading ? (
            <div className={loadingClass}>Loading articles...</div>
          ) : (
            <div className={articleGrid}>
              {articles.map((article) => (
                <div
                  key={article._id}
                  className={articleCardClass}
                  onClick={() => navigate(`/article/${article._id}`)}
                >
                  <h3 className={articleTitle}>
                    {article.title}
                  </h3>

                  <p className={articleExcerpt}>
                    {article.content?.slice(0, 90)}...
                  </p>

                  <div className={articleMeta}>
                    By {article.authorName || "Unknown"} •{" "}
                    {new Date(article.createdAt).toLocaleDateString()}
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