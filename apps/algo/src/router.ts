import { Router } from "express";
import session from "express-session";
import parser from "body-parser";
import { validatedEnv } from "./constants";
import { initGoogle } from "./auth/googleAuth";
import { googleCallback } from "./callback/googleAuth";

const router: Router = Router();
initGoogle();
router.use(parser.json());
router.use(googleCallback)
router.use(
  session({
    secret: validatedEnv.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 600000 },
  })
);

export default router;
