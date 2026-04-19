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

  const { register, handleSubmit, reset } = useForm();
  const user = useAuth((state) => state.currentUser);

  const [article, setArticle] = useState(location.state || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ FETCH ARTICLE
  useEffect(() => {
    const getArticleById = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:4000/user-api/article/${id}`,
          { withCredentials: true }
        );

        if (res.status === 200) {
          setArticle(res.data.payload);
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Error loading article"
        );
      } finally {
        setLoading(false);
      }
    };

    if (!location.state) {
      getArticleById();
    }
  }, [id, location.state]);

  //  FORMAT DATE
  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  //  DELETE / RESTORE
  const toggleArticleStatus = async () => {
    try {
      const res = await axios.patch(
        "http://localhost:4000/author-api/articles",
        {
          articleId: article._id,
          isArticleActive: !article.isArticleActive,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setArticle(res.data.payload);
      }
    } catch (err) {
      console.error(err);
    }
  };

  //  EDIT
  const editArticle = () => {
    navigate(`/edit-article/${article._id}`, {
      state: article,
    });
  };

  //  ADD COMMENT
  const addComment = async (commentObj) => {
    try {
      const res = await axios.put(
        "https://capstone-project-bhy0.onrender.com/user-api/articles",
        {
          articleId: article._id,
          comment: commentObj.comment,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setArticle(res.data.payload);
        reset();
      }
    } catch (err) {
      console.error(err);
    }
  };

  //  UI STATES
  if (loading) return <p className={loadingClass}>Loading...</p>;
  if (error) return <p className={errorClass}>{error}</p>;
  if (!article) return null;

  //  Hide deleted for users
  if (!article.isArticleActive && user?.role !== "AUTHOR") {
    return (
      <p className={errorClass}>
        This article is not available
      </p>
    );
  }

  return (
    <div className={articlePageWrapper}>
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 mb-4"
      >
        ← Back
      </button>

      {/* HEADER */}
      <div className={articleHeader}>
        <span className={articleCategory}>
          {article.category}
        </span>

        <h1 className={`${articleMainTitle} uppercase`}>
          {article.title}
        </h1>

        <div className={articleAuthorRow}>
          <div className={authorInfo}>
             {article.author?.firstName || "Author"}
          </div>
          <div>{formatDate(article.createdAt)}</div>
        </div>
      </div>

      {/* CONTENT */}
      <div className={articleContent}>
        {article.content}
      </div>

      {/* AUTHOR ACTIONS */}
      {user?.role === "AUTHOR" && (
        <div className={articleActions}>
          <button className={editBtn} onClick={editArticle}>
            Edit
          </button>

          <button
            className={deleteBtn}
            onClick={toggleArticleStatus}
          >
            {article.isArticleActive
              ? "Delete"
              : "Restore"}
          </button>
        </div>
      )}

      {/* COMMENT FORM */}
      {user?.role === "USER" && (
        <div className={articleActions}>
          <form
            onSubmit={handleSubmit(addComment)}
            className="w-full"
          >
            <input
              type="text"
              {...register("comment", { required: true })}
              className={inputClass}
              placeholder="Write your comment..."
            />

            <button
              type="submit"
              className={editBtn}
            >
              Add Comment
            </button>
          </form>
        </div>
      )}

      {/* COMMENTS */}
      <div className={commentsWrapper}>
        {article.comments?.length === 0 && (
          <p className="text-center text-sm text-gray-400">
            No comments yet
          </p>
        )}

        {article.comments?.map((commentObj, index) => {
          const name =
            commentObj.user?.email || "User";
          const firstLetter =
            name.charAt(0).toUpperCase();

          return (
            <div key={index} className={commentCard}>
              <div className={commentHeader}>
                <div className={commentUserRow}>
                  {commentObj.user?.profileImageUrl ? (
                    <img
                      src={commentObj.user.profileImageUrl}
                      alt="user"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className={avatar}>
                      {firstLetter}
                    </div>
                  )}

                  <div>
                    <p className={commentUser}>
                      {name}
                    </p>
                    <p className={commentTime}>
                      {formatDate(
                        commentObj.createdAt
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <p className={commentText}>
                {commentObj.comment}
              </p>
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      <div className={articleFooter}>
        Last updated: {formatDate(article.updatedAt)}
      </div>
    </div>
  );
}

export default ArticleByID;