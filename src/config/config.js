import { config } from "dotenv";
import args from "./args.js";

const MODE = args.mode;
const ENV_PATH = MODE === "dev" ? "./.env.dev" : "./.env.prod";

config({ path: ENV_PATH });

export default {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};
