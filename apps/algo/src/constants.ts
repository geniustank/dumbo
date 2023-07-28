import { config } from "dotenv";
import { envSchema } from "./types";

config();

export const validatedEnv = envSchema.parse(process.env);
