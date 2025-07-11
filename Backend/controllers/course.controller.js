import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";
export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res
        .status(200)
        .json({ message: "Invalid credentials", success: false });
    }
    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });
    return res
      .status(201)
      .json({ message: "Course created", course, success: true });
  } catch (error) {
    console.log("Error while creating a course", error.message);
    return res
      .status(500)
      .json({ message: "Error in creating a course ", success: false });
  }
};

export const getAllCreatorCourses = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId }).sort({
      createdAt: -1,
    });
    if (!courses) {
      return res
        .status(404)
        .json({ message: "courses not found ", success: false, course: [] });
    }
    return res.status(200).json({ courses });
  } catch (error) {
    console.log("Error in getting course", error.message);
    return res
      .status(500)
      .json({ message: "Error in getting the Courses ", success: false });
  }
};

export const editCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId);
  } catch (error) {
    console.log("Error occured while Editing the course", error.message);
    return res.status(500).json({
      message: "Error occured while Editing the course ",
      success: false,
    });
  }
};
