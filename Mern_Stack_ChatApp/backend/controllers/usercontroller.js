const asyncHandler = require("express-async-handler");
const User = require("../Models/userModal");
const generateToken = require("../config/generateToken");

//for signup/(or)/register page:---
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    //checking user entries not empty
    res.status(400);
    throw new Error("Please enter all Fields");
  }

  const userExists = await User.findOne({ email });
  //checking that user with given email id for sign up page should be unique....
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    //querying database
    name,
    email,
    password,
  });

  if (user) {
    //sending  user details and json token at frontend
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the user.");
  }
});

//for login page:----
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//api to get all users -- send data to backend ;
//api structure ==> /api/user?search=riddhi
const allUsers = asyncHandler(async (req, res) => {
  //access of object of query-words.
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  // console.log(keyword);

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports = { registerUser, authUser, allUsers };
