import { Router } from "express";
import passport from "passport";
import config, { logger } from "../config";

const router = Router();

/**
 * Github Oauth
 */
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

/**
 * Github Oauth Callback
 */
router.get("/github/callback", (req, res, next) => {
  passport.authenticate(
    "github",
    { failureRedirect: "/login" },
    async (err, user) => {
      if (err) return next(err);
      try {
        // const authService = container.resolve(AuthService);
        // const token = await authService.authenticate(user);
        // res.redirect(`${config.BASE_URL}/?authtoken=${token}`);
        logger.debug(user);
      } catch (err) {
        next(err);
      }
    }
  )(req, res, next);
});

export default router;
