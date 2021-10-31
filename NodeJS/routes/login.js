import { Router } from "express";
import { isLogginJWT, isNotLogginJWT } from "../middleware/auth.js";
import * as login from "../service/loginService.js";
const router = Router();

router.get("/company", isLogginJWT, (req, res, next) => {
  res.render("/login");
});

router.post("/company", isLogginJWT, login.loginJWT);

export default router;
