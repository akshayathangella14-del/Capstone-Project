import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router";

import {
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
  loadingClass,
} from "../styles/common";
import { useAuth } from "../store/authStore";

function WriteArticles() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth((state) => state.currentUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

const submitArticle = async (articleObj) => {
  setLoading(true);
  try {
    // 1. Ensure the author ID is attached to the article object from the global state
    if (!currentUser?._id) {
      console.log("User not logged in");
      return;
    }
    articleObj.author = currentUser._id;

    // 2. Make the POST request to the Author API
    let res = await axios.post(
      "http://localhost:4000/author-api/articles", 
      articleObj, 
      { withCredentials: true }
    );

    // 3. Navigate back to the author's articles list on success
    if (res.status === 201) {
      navigate("/author-profile/articles");
    }
  } catch (err) {
    console.log("Error creating article:", err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className={formCard}>
      <h2 className={formTitle}>Write New Article</h2>

      <form onSubmit={handleSubmit(submitArticle)}>
        {/* Title */}
        <div className={formGroup}>
          <label className={labelClass}>Title</label>

          <input
            type="text"
            className={inputClass}
            placeholder="Enter article title"
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 5,
                message: "Title must be at least 5 characters",
              },
            })}
          />

          {errors.title && <p className={errorClass}>{errors.title.message}</p>}
        </div>

        {/* Category */}
        <div className={formGroup}>
          <label className={labelClass}>Category</label>

          <select
            className={inputClass}
            {...register("category", {
              required: "Category is required",
            })}
          >
            <option value="">Select category</option>
            <option value="technology">Technology</option>
            <option value="programming">Programming</option>
            <option value="ai">AI</option>
            <option value="web-development">Web Development</option>
          </select>

          {errors.category && <p className={errorClass}>{errors.category.message}</p>}
        </div>

        {/* Content */}
        <div className={formGroup}>
          <label className={labelClass}>Content</label>

          <textarea
            rows="8"
            className={inputClass}
            placeholder="Write your article content..."
            {...register("content", {
              required: "Content is required",
              minLength: {
                value: 50,
                message: "Content must be at least 50 characters",
              },
            })}
          />

          {errors.content && <p className={errorClass}>{errors.content.message}</p>}
        </div>

        {/* Submit */}
        <button className={submitBtn} type="submit" disabled={loading}>
          {loading ? "Publishing..." : "Publish Article"}
        </button>

        {loading && <p className={loadingClass}>Publishing article...</p>}
      </form>
    </div>
  );
}

export default WriteArticles;