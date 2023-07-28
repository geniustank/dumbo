import { z } from "zod";

const envSchema = z
  .object({
    PORT: z.string().default("8080"),
    DATABASE_URL: z.string(),
    SECRET: z.string(),
    GOOGLE_ID: z.string(),
    GOOGLE_SECRET: z.string(),
    BASE_URL: z.string(),
  })
  .required();

export { envSchema };
