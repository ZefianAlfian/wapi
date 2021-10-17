import { Router } from "express";

const router = Router();

router.get("/login", async (req, res) => {
  res.send("HI");
});

export default router;
