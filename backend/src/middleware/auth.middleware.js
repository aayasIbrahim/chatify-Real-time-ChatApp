import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import { ENV } from "../../lib/env.js";

export const protectRoute = async (req, res, next) => {
  try {
    // ✅ Cookie name must match what you set in login/signup
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    // ✅ Verify JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, ENV.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    // ✅ Find user in DB
    const user = await User.findById(decoded.userId).select("-password");
    if (!user)
      return res.status(404).json({ message: "User not found" });

    // ✅ Attach user to req
    req.user = user;
    next();
  } catch (error) {
    console.error("Error from protectRoute:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
