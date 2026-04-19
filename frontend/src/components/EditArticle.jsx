import { useForm } from "react-hook-form";
import { 
  pageBackground, formCard, formTitle, formGroup, labelClass, 
  inputClass, submitBtn, errorClass, loadingClass 
} from "../styles/common";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";
import { useState } from "react";

function EditArticle() {
  // 1. Get the article data passed from ArticleByID via navigate state
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 2. Initialize form with existing article data as default values
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: state
  });

  // 3. Logic to save changes
  const onEditArticle = async (modifiedArticle) => {
    setLoading(true);
    try {
      // Add the articleId specifically required by the backend PUT route [6]
      modifiedArticle.articleId = state._id;

      let res = await axios.put(
        "https://capstone-project-bhy0.onrender.com/author-api/articles", 
        modifiedArticle, 
        { withCredentials: true }
      );

      if (res.status === 200) {
        // Navigate back to the detailed view with the updated data [4], [5]
        navigate(`/article/${state._id}`, { state: res.data.payload });
      }
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className={loadingClass}>Saving changes...</p>;

  return (
    <div className={`${pageBackground} flex items-center justify-center py-16 px-4`}>
      <div className={formCard}>
        <h2 className={formTitle}>Edit Article</h2>
        <form onSubmit={handleSubmit(onEditArticle)}>
          {/* Title Field */}
          <div className={formGroup}>
            <label className={labelClass}>Title</label>
            <input 
              {...register("title", { required: "Title is required" })} 
              className={inputClass} 
            />
            {errors.title && <p className={errorClass}>{errors.title.message}</p>}
          </div>

          {/* Category Field */}
          <div className={formGroup}>
            <label className={labelClass}>Category</label>
            <select {...register("category")} className={inputClass}>
              <option value="Programming">Programming</option>
              <option value="AI">AI</option>
              <option value="Gadgets">Gadgets</option>
            </select>
          </div>

          {/* Content Field */}
          <div className={formGroup}>
            <label className={labelClass}>Content</label>
            <textarea 
              {...register("content", { required: "Content is required" })} 
              className={`${inputClass} h-40`} 
            />
            {errors.content && <p className={errorClass}>{errors.content.message}</p>}
          </div>

          <button type="submit" className={submitBtn}>Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default EditArticle;