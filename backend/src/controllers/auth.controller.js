import User from "../../models/User.js";
import { generateToken } from "../../lib/utils.js";
import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "../email/emailHandler.js";
import { ENV } from "../../lib/env.js";
import cloudinary from "../../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    // Required fields check
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All field are required" });
    }
    //  Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please provide a valid email address",
      });
    }
    //  Password length check (FIXED)
    if (password < 6) {
      return res
        .status(400)
        .json({ message: "Password Must be at least 6 character" });
    }

    //exists email
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    //salting password
    const salt = await bcrypt.genSalt(10);
    const hassPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hassPassword,
    });
    if (newUser) {
      const saveUser = await newUser.save();
      generateToken(saveUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        emai: newUser.email,
        profilePic: newUser.profilePic,
      });

      ///sent email using Email Resend package

      try {
        const { CLIENT_URL } = ENV;
        sendWelcomeEmail(saveUser.email, saveUser.fullName, CLIENT_URL);
      } catch (error) {
        console.error(error);
      }
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in Signup controller:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });
    const isPassWordCorrect = await bcrypt.compare(password, user.password);
    if (!isPassWordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error in Log in controller :", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const logout = (_, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged Out successfully" });
};
export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    if (!profilePic)
      return res.status(400).json({ message: "Profile Pic is require" });
    const userId = req.user._id;
    const uploadResponse = await cloudinary.upload(profilePic);
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    console.error("Error in updateprofie function", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
