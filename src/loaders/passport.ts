import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as AnonymousStrategy } from "passport-anonymous";
import config from "../config";

passport.use(
  new GitHubStrategy(
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
      done(null, profile);
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.JWT_SECRET,
    },
    function (jwtPayload, done) {
      done(null, jwtPayload);
    }
  )
);

passport.use(new AnonymousStrategy());

export default passport;
