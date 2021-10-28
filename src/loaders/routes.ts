import { router as authRoutes } from "../components/auth";
import { router as userRoutes } from "../components/user";

import { Router } from "express";

const apiRouter = Router();
apiRouter.use("/auth", authRoutes);
apiRouter.use(
  "/user",
  (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect("../auth/login");
    }
  },
  userRoutes
);

export const apiRoutes = apiRouter;
