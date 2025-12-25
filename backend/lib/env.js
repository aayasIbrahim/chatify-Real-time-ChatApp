import dotenv from "dotenv";
dotenv.config();
export const ENV = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  EMAIL_FROM: process.env.EMAIL_FROM,
  EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
  CLIENT_URL: process.env.CLIENT_URL,
  ClOUDINARY_CLOUD_NAME: process.env.ClOUDINARY_CLOUD_NAME,
  ClOUDINARY_API_KEY: process.env.ClOUDINARY_API_KEY,
  ClOUDINARY_API_SECRET: process.env.ClOUDINARY_API_SECRET,
  ARCJET_KEY: process.env.ARCJET_KEY,
  ARCJET_ENV: process.env.ARCJET_ENV,
};
