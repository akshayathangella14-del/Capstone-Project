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
} from "../styles/common";

import { useEffect, useState } from "react";
import axios from "axios";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch articles
  const fetchArticles = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:4000/user-api/articles"
      );

      setArticles(res.data.payload || []);
    } catch (err) {
      setError("Failed to load articles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Loading
  if (loading) {
    return <div className={loadingClass}>Loading articles...</div>;
  }

  // Error
  if (error) {
    return <div className={errorClass}>{error}</div>;
  }

  // Empty
  if (articles.length === 0) {
    return <div className={emptyStateClass}>No articles available</div>;
  }

  return (
    <div className={pageBackground}>
      <div className={pageWrapper}>
        <h1 className={pageTitleClass}>Articles</h1>

        <div className={articleGrid}>
          {articles.map((article) => (
            <div key={article._id} className={articleCardClass}>
              
              {/* TITLE */}
              <h2 className={articleTitle}>
                {article.title}
              </h2>

              {/* EXCERPT */}
              <p className={articleExcerpt}>
                {article.content?.slice(0, 100)}...
              </p>

              {/* META */}
              <div className={articleMeta}>
                By {article.authorName || "Unknown"} •{" "}
                {new Date(article.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Articles;