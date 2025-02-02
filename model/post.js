const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
    {
        img: String,
        description: {
            type: String,
        },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "  ", required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("post", postSchema);