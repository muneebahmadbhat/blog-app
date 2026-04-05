import express from "express";
import Post from "../models/Post.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// CREATE POST
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      author: req.user.id,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// GET ALL POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name");
    res.json(posts);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// GET SINGLE POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name");
    res.json(post);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// UPDATE POST
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json("Unauthorized");
    }

    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// DELETE POST
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json("Unauthorized");
    }

    await post.deleteOne();
    res.json("Post deleted");
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export default router;
