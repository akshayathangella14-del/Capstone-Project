import exp from 'express'
import { verifyToken } from "../middlewares/VerifyToken.js"
import { ArticleModel } from '../models/ArticleModel.js'
export const userApp = exp.Router()

// Read articles of all authors
userApp.get("/articles", async (req, res) => {
    try {
        const articlesList = await ArticleModel.find({ isArticleActive: true })
            .populate("author", "firstName lastName profileImageUrl");

        res.status(200).json({
            message: "articles",
            payload: articlesList
        });
    } catch (err) {
        res.status(500).json({
            message: "Error fetching articles",
            error: err.message
        });
    }
});

// Add comment to an article
userApp.put("/articles", verifyToken("USER"), async (req, res) => {
    const { articleId, comment } = req.body
    const articleDocument = await ArticleModel.findOne({ _id: articleId, isArticleActive: true });
    
    if (!articleDocument) {
        return res.status(404).json({ message: "Article not found" })
    }

    const userId = req.user?.id
    // Add comment to comments array
    articleDocument.comments.push({ user: userId, comment: comment })
    await articleDocument.save()
    
    // Return populated document so frontend gets user details for the new comment
    const updatedArticle = await ArticleModel.findById(articleId).populate("comments.user", "firstName lastName profileImageUrl");
    res.status(200).json({ message: "Comment added successfully", payload: updatedArticle })
})

// Get article by ID
userApp.get("/article/:id", verifyToken("USER", "AUTHOR"), async (req, res) => {
    try {
        const articleId = req.params.id;
        const article = await ArticleModel.findById(articleId).populate("comments.user", "firstName lastName profileImageUrl");
        
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }
        res.status(200).json({ message: "Article found", payload: article });
    } catch (err) {
        res.status(500).json({ message: "error", error: err.message });
    }
});