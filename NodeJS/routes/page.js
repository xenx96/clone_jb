import { Router } from "express";
const router = Router();
/**
 * redirect와 Render를 주의해서 사용해주세요!
 *
 */

router.get("/", (req, res, next) => {
  res.redirect("api-docs");
});

export default router;
