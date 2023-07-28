import { Router } from "express";
import passport from "passport";
import store from "store";

import { handleConnect, handleUpdate } from "../helpers";
import { checkConnection } from "../helpers/checkConnection";
import { setQuery } from "../middleware";

const googleCallback: Router = Router();

googleCallback.get(
  "/auth/google",
  setQuery(),
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
    console.log(rawUser.accessToken);
    const { address } = store.get("data");
    const isConnection = await checkConnection(address, "GOOGLE");
    console.log(isConnection);
    if (isConnection) {
      console.log(isConnection);
      handleUpdate(address, "GOOGLE", res);
    } else {
      handleConnect(
        res,
        rawUser.emails[0].value,
        rawUser.id,
        rawUser.displayName,
        "GOOGLE"
      );
    }
  }
);

export { googleCallback };