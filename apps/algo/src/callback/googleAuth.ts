import { Router } from "express";
import passport from "passport";
import { handleCallback } from "../helpers/handleCallback";

const googleCallback: Router = Router();

googleCallback.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

googleCallback.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async function (req, res) {
    const rawUser = req.user as any;
    console.log(rawUser);
    handleCallback(
      res,
      rawUser.emails[0].value,
      rawUser.id,
      rawUser.displayName,
      ""
    );
  }
);

googleCallback.get("/auth/google/success", (_, res) => {
  res.send("Hello");
  console.log("FINISHED");
});

export { googleCallback };
