import { useParams, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../store/authStore";
import {
  articlePageWrapper,
  articleHeader,
  articleCategory,
  articleMainTitle,
  articleAuthorRow,
  authorInfo,
  articleContent,
  articleFooter,
  articleActions,
  editBtn,
  deleteBtn,
  loadingClass,
  errorClass,
  inputClass,
  commentsWrapper,
  commentCard,
  commentHeader,
  commentUserRow,
  avatar,
  commentUser,
  commentTime,
  commentText,
} from "../styles/common.js";
import { useForm } from "react-hook-form";

function ArticleByID() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const user = useAuth((state) => state.currentUser);

  const [article, setArticle] = useState(location.state || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

useEffect(() => {
    const getArticleById = async () => {
        setLoading(true);
        try {
            let res = await axios.get(`http://localhost:4000/user-api/article/${id}`, { withCredentials: true });
            if (res.status === 200) {
                setArticle(res.data.payload);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Error loading article");
        } finally {
            setLoading(false);
        }
    };

    if (!article) {
        getArticleById();
    }
}, [id, article]);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // delete & restore article
 const toggleArticleStatus = async () => {
    const newStatus = !article.isArticleActive;
    try {
        let res = await axios.patch("http://localhost:4000/author-api/articles", 
            { articleId: article._id, isArticleActive: newStatus }, 
            { withCredentials: true }
        );
        if (res.status === 200) {
            // Update local state with the updated article from backend
            setArticle(res.data.payload);
        }
    } catch (err) {
        console.error("Error updating status:", err);
    }
};

  //edit article
  const editArticle = (articleObj) => {
    navigate("/edit-article", { state: articleObj });
  };

  //post comment by user
  const addComment = async (commentObj) => {
    commentObj.articleId = article._id;
    try {
        let res = await axios.put("http://localhost:4000/user-api/articles", commentObj, { withCredentials: true });
        if (res.status === 200) {
            // Backend returns the updated article document with populated user info
            setArticle(res.data.payload);
        }
    } catch (err) {
        console.error("Error adding comment:", err);
    }
};

  if (loading) return <p className={loadingClass}>Loading article...</p>;
  if (error) return <p className={errorClass}>{error}</p>;
  if (!article) return null;

  return (
    <div className={articlePageWrapper}>
      {/* Header */}
      <div className={articleHeader}>
        <span className={articleCategory}>{article.category}</span>

        <h1 className={`${articleMainTitle} uppercase`}>{article.title}</h1>

        <div className={articleAuthorRow}>
          <div className={authorInfo}>✍️ {article.author?.firstName || "Author"}</div>

          <div>{formatDate(article.createdAt)}</div>
        </div>
      </div>

      {/* Content */}
      <div className={articleContent}>{article.content}</div>

      {/* AUTHOR actions */}
      {user?.role === "AUTHOR" && (
        <div className={articleActions}>
          <button className={editBtn} onClick={() => editArticle(article)}>
            Edit
          </button>

          <button className={deleteBtn} onClick={toggleArticleStatus}>
            {article.isArticleActive ? "Delete" : "Restore"}
          </button>
        </div>
      )}
      {/* form to add comment if role is USER */}
      {/* USER actions */}
      {user?.role === "USER" && (
        <div className={articleActions}>
          <form onSubmit={handleSubmit(addComment)}>
            <input
              type="text"
              {...register("comment")}
              className={inputClass}
              placeholder="Write your comment here..."
            />
            <button type="submit" className="bg-amber-600 text-white px-5 py-2 rounded-2xl mt-5">
              Add comment
            </button>
          </form>
        </div>
      )}

      {/* comments */}
      {/* Comments */}
      <div className={commentsWrapper}>
        {article.comments?.length === 0 && <p className="text-[#a1a1a6] text-sm text-center">No comments yet</p>}

        {article.comments?.map((commentObj, index) => {
          const name = commentObj.user?.email || "User";
          const firstLetter = name.charAt(0).toUpperCase();

          return (
            <div key={index} className={commentCard}>
              {/* Header */}
              <div className={commentHeader}>
                <div className={commentUserRow}>
                  <div className={avatar}>{firstLetter}</div>

                  <div>
                    <p className={commentUser}>{name}</p>
                    <p className={commentTime}>{formatDate(commentObj.createdAt || new Date())}</p>
                  </div>
                </div>
              </div>

              {/* Comment */}
              <p className={commentText}>{commentObj.comment}</p>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className={articleFooter}>Last updated: {formatDate(article.updatedAt)}</div>
    </div>
  );
}

export default ArticleByID;

// {
//   "user":"6989799b7013502767d3f82b",
//   "articleId":"6989750220ce5bf826ec4f7e",
//   "comment":"good article"
// }



