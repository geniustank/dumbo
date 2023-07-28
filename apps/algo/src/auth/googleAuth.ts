import passport from "passport";
import google from "passport-google-oauth20";

import { validatedEnv } from "../constants";

export function initGoogle() {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (user, done) {
    return done(null, user as any);
  });
  passport.use(
    new google.Strategy(
      {
        clientID: validatedEnv.GOOGLE_ID,
        clientSecret: validatedEnv.GOOGLE_SECRET,
        callbackURL: `${validatedEnv.BASE_URL}/auth/google/callback`,
        scope: [
          "https://www.googleapis.com/auth/userinfo.profile",
          "https://www.googleapis.com/auth/userinfo.email",
        ],
      },
      async (_: any, __: any, profile: any, done: any) => {
        done(null, profile);
      }
    )
  );
}