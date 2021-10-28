import { Router } from "express";
import passport from "../../loaders/passport";
import config, { logger } from "@config";

const router = Router();

router.get("/", (_, res) => res.redirect("login"));

router.get("/login", (req, res) => {
  if (req.user) {
    res.redirect("../../user/dashboard");
  } else {
    res.render("login");
  }
});
/**
 * Github Oauth
 */
router.get("/github", passport.authenticate("github"));

/**
 * Github Oauth Callback
 */
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication
    res.redirect("../../user/dashboard");
  }
);

export default router;
