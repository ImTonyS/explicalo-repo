import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

// BLOG SCHEMA
const blogSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    author: {
      type: String,
      trim: true,
    },
    intro: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// add plugin that converts mongoose to json
blogSchema.plugin(toJSON);

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
