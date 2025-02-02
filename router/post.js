const express = require("express");
const { addPost, updatePost, deletePost, getAllPost, upload } = require("../controller/post");
const { requireAuth, checkPostOwnership } = require("../middleware/user.checker");
const router = express.Router();

router.post('/create', requireAuth ,upload.single("image"), addPost);
router.get('/all-posts', getAllPost)
router.put('/update/:id', requireAuth, upload.single('image'), checkPostOwnership, updatePost)
router.delete('/delete/:id', requireAuth, checkPostOwnership, deletePost)
module.exports = router;