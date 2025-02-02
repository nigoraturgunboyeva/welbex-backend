const jwt = require("jsonwebtoken");
const Post = require("../model/post");
const requireAuth = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);  
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
const checkPostOwnership = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.author.toString() !== req.userId) { 
            return res.status(403).json({ message: "Forbidden: You can only edit or delete your own post." });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
module.exports = { requireAuth , checkPostOwnership};