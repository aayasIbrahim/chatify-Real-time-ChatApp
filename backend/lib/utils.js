import jwt from "jsonwebtoken";
import { ENV } from "./env.js";


export const generateToken = (userId, res) => {
  const { JWT_SECRET } = ENV;
  console.log(JWT_SECRET)
  if (!JWT_SECRET) {
    throw new Error("JWT_Secret is not configuration");
  }

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, //MS
    httpOnly: true, //prevent xss attacks:cross-site scripting
    sameSite: "strict",
    secure: (ENV.NODE_ENV = "devlopment" ? false : true),
  });
  return token;
};
