import { Router } from "express";
import session from "express-session";
import parser from "body-parser";
import { validatedEnv } from "./constants";

const router: Router = Router();

router.use(parser.json());
router.use(
  session({
    secret: validatedEnv.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 600000 },
  })
);

export default router;
