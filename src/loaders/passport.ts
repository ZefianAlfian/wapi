import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import config, { logger } from "../config";

const githubS = new GitHubStrategy(
  {
    clientID: config.GITHUB_CLIENT_ID,
    clientSecret: config.GITHUB_CLIENT_SECRET,
    callbackURL: config.GITHUB_CALLBACK_URL,
  },
  function (
    accessToken: string,
    refreshToken: string,
    profile: unknown,
    done: (err?: Error | null, profile?: unknown) => void
  ) {
    logger.debug(accessToken);
    done(null, profile);
  }
);
passport.serializeUser(function (user, done) {
  logger.debug(user);
  done(null, user);
});

passport.deserializeUser(function (id: string, done) {
  logger.debug(id);
  done(null, id);
});

passport.use(githubS);

export default passport;
