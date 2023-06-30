import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  URL: process.env.MONGODB_URL,
  saltRounds: process.env.SALT_ROUNDS as unknown as number,
};