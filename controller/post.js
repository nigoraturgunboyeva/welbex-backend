const multer = require("multer");
const Post = require("../model/post");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Store images in 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Unique filename
    },
});
const upload = multer({ storage });

const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).send(posts);

    } catch (error) {
        console.log('errow while getting all posts', error);
        res.status(500).send(error)
    }
}
const addPost = async (req, res) => {
    try {
        const { description  } = req.body;
        const author = req.userId
        const image = req.file ? req.file.filename : null; 

        const newPost = new Post({
            author,
            description,
            img: image, 
        });

        await newPost.save();

        res.status(201).json({ data: newPost, message: "Post is posted" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
};
const updatePost = async (req, res) => {
    try {
      // Check if a new image is uploaded
      const imageUrl = req.file ? req.file.filename : null; // Store the image filename or null
  
      // Update the post data
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          description: req.body.description,  // Update the description
          img: imageUrl,                      // If a new image was uploaded, update the img field
        },
        { new: true }
      );
  
      // Check if post was found and updated
      if (!updatedPost) return res.status(404).send("Cannot find post to update");
  
      res.status(200).send(updatedPost);  // Return the updated post
    } catch (error) {
      console.log('Error while updating post:', error);
      res.status(500).send(error.message);  // Handle errors
    }
  };
  
const deletePost = async (req, res) => {
    try {
        const deletePost = await Post.findByIdAndDelete(req.params.id)
        if(!deletePost) return res.status(404).send("The comment to be deleted was not found!!!")
        res.status(200).send(deletePost)
    } catch (error) {
        console.log('errow while deleting post', error);
        res.status(500).send(error)
    }
}

module.exports = { addPost , upload, updatePost, deletePost, getAllPost}