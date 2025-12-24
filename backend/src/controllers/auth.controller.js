import User from "../../models/User.js";
import { generateToken } from "../../lib/utils.js";
import bcrypt from "bcryptjs";

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
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        emai: newUser.email,
        profilePic: newUser.profilePic,
      });
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
