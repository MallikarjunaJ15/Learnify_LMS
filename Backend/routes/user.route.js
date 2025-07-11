import express from "express";
import {
  getProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import uplaod from "../utils/multer.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/getProfile", isAuthenticated, getProfile);
router.put(
  "/updateProfile",
  isAuthenticated,
  uplaod.single("profilePhoto"),
  updateProfile
);
export default router;
