const { Router } = require("express");
const router = Router();
const Post = require("../models/Post");
const User = require("../models/User");
const { v4: uuidv4 } = require("uuid");

router.get("/public/user", async (req, res) => {
  // if (!req.isAuthenticated()) {
  //   return res.status(403).json({ message: "User not authenticated" });
  // }

  // const user = req.user;
  // console.log(user);

  // if (!user) {
  //   return res.status(404).json({ message: "User not found!" });
  // }

  const publicPosts = await Post.find({
    private: false,
    username: user.username.toLowerCase(),
  });
  return res.status(200).json({ publicPosts: publicPosts });
});

router.get("/private/user", async (req, res) => {
  // if (!req.isAuthenticated()) {
  //   return res.status(403).json({ message: "User not authenticated" });
  // }

  // const user = req.user;
  // console.log(user);

  // if (!user) {
  //   return res.status(404).json({ message: "User not found" });
  // }

  const privatePosts = await Post.find({
    private: true,
    username: `${req.body.username}`.toLowerCase(),
  });
  return res.status(200).json({ privatePosts });
});

router.get("/all/user/:username", async (req, res) => {
  // if (!req.isAuthenticated()) {
  //   return res.status(403).json({ message: "User not authenticated" });
  // }

  // const user = req.user;
  // console.log(user);

  // if (!user) {
  //   return res.status(404).json({ message: "User not found" });
  // }

  const username = req.params.username;

  const posts = await Post.find({
    username,
  });

  return res.status(200).json({ posts });
});

router.get("/public/global", async (req, res) => {
  const globalPosts = await Post.find({
    private: false,
  });
  return res.status(200).json({ globalPosts });
});

router.post("/new", async (req, res) => {
  // if (!req.isAuthenticated()) {
  //   return res.status(403).json({ message: "User not authenticated" });
  // }

  // const user = req.user;
  // console.log(user);

  // if (!user) {
  //   return res.status(404).json({ message: "User not found" });
  // }

  const newPost = await Post.create({
    postId: uuidv4(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    feelingStatus: req.body.feelingStatus,
    suicidalThoughts: req.body.suicidalThoughts,
    gratefulFor: req.body.gratefulFor,
    private: req.body.private,
    date: new Date(),
  });

  await newPost.save();

  return res.status(200).json(newPost);
});

router.post("/toggleStatus", async (req, res) => {
  // if (!req.isAuthenticated()) {
  //   return res.status(403).json({ message: "User not authenticated" });
  // }

  const postId = req.body.postId;
  console.log(postId);

  const postToEdit = await Post.findOne({ postId: postId });

  if (!postToEdit) {
    return res
      .status(400)
      .json({ message: `Post with ID: ${postId} does not exist!` });
  }

  const updatedPost = await Post.updateOne({ postId }, [
    { $set: { private: { $not: "$private" } } },
  ]);

  return res.status(200).json({ ...updatedPost });
});

module.exports = router;
