import express from "express";

import isAuthenticated from "../middleware/isAuthenticated.js";
import { createCourse, getAllCreatorCourses } from "../controllers/course.controller.js";
const router = express.Router();

router.post("/createCourse", isAuthenticated, createCourse);
router.get("/getAllCoursesOfCreator",isAuthenticated,getAllCreatorCourses)
export default router;
