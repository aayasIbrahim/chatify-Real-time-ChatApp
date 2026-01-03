import { v2 as cloudinary } from "cloudinary";

import { ENV } from "../lib/env.js";

cloudinary.config({
  cloud_name: ENV.ClOUDINARY_CLOUD_NAME,
  api_key: ENV.ClOUDINARY_API_KEY,
  api_secret: ENV.ClOUDINARY_API_SECRET,
});
export default cloudinary;
