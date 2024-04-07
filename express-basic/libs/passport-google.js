import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oidc";

import userService from "../services/user.service.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env["GOOGLE_CLIENT_ID"],
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
      callbackURL: "/api/oauth2/redirect/google",
      scope: ["profile", "email"],
    },
    async function verify(issuer, profile, cb) {
      console.log(issuer, "issuer", profile, "profile");
      const email = profile.emails[0].value;
      const user = await userService.getOneUser(email);

      if (!user) {
        const fullName = profile.displayName.split(" ");
        try {
          const user = await userService.createUser(
            fullName[0],
            fullName[1],
            email,
            null,
            profile.id
          );
          profile.userId = user.id;
          cb(null, profile);
          return;
        } catch (error) {
          cb(error, null);
        }
        return;
      }
      profile.userId = user.id;
      console.log(profile, "profile");
      cb(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
