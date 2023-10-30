
const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        category_id: { type: String, required: true },
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date, default: Date.now },
      }
);

module.exports = mongoose.model("Post", postSchema);