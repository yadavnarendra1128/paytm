const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const { signUpSchema, signInSchema, updateSchema } = require("../zod");
const { User, Account } = require("../db");
const { JWT_SECRET } = require("../config");
const { authenticateToken } = require("../middleware");

router.get("/", (req, res) => {
  res.json("port running");
});

router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    res.status(500).json({
      msg: "Error fetching users",
      error: error.message,
    });
  }
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signUpSchema.safeParse(body);
  if (!success) {
    res.status(400).json({
      msg: "username or password must be strings",
    });
  }
  const user = await User.findOne({ username: body.email });
  if (user) {
    return res.json({
      msg: "User already exists",
    });
  }
  const newUser = await User.create(
    {username: body.email, password: body.password, firstName: body.firstName, lastName: body.lastName}
    );
  const userId = newUser._id;
  const token = jwt.sign({ userId: userId }, JWT_SECRET);
  await Account.create({
    userId: userId,
    balance: 1 + Math.random() * 10000,
  });
  res.json({ msg: "User created successfully", token: token });
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const { success } = signInSchema.safeParse(body);
  if (!success) {
    return res.status(400).json({
      msg: "body data type must be valid",
    });
  }
  const user = await User.findOne({
    username: body.email,
    password: body.password,
  });
  if (!user) {
    return res.status(401).json({ msg: "Error Logging In" });
  }
  const token = jwt.sign({ userId: user._id }, JWT_SECRET);
  return res.json({ msg: "User logged in successfully", token: token });
});

router.put("/", authenticateToken, async (req, res) => {
  const body = req.body;
  const { success } = updateSchema.safeParse(body);
  if (!success) {
    return res.status(400).json({ msg: "Invalid Characters" });
  }
  await User.updateOne(body, {
    id: req.userId,
  });
  res.json({ msg: "User updated successfully" });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });
  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
