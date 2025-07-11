import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uplaodMedia } from "../utils/cloudinary.js";
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // console.log("The data", req.body);
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(500)
        .json({ message: "User already exists login", success: false });
    }

    const hashedPasssword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPasssword,
    });
    return res.status(200).json({
      message: "Account registered successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log("Error in registering the user", error.message);
    return res
      .status(500)
      .json({ message: "Failed to register", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(404)
        .json({ message: "Incorrect email or password", success: false });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(404)
        .json({ message: "Incorrect email or password", success: false });
    }
    generateToken(res, user, `welcome back ${user.name}`);
  } catch (error) {
    console.log("Error in logging the user", error.message);
    res.status(500).json({ message: "Failed to login", success: false });
  }
};

export const logout = async (_, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
      })
      .json({ message: "Logged out successfully", success: true });
  } catch (error) {
    console.log("Error in logging out", error.message);
    res.status(500).json({ message: "Failed to logout", success: false });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("+password");
    if (!user) {
      return res
        .status(404)
        .json({ message: "Profile not found", success: false });
    }
    return res.status(200).json({ user, success: true });
  } catch (error) {
    console.log("Error in getting the Profile", error.message);
    res.status(500).json({ message: "Failed to get Profile", success: false });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name } = req.body;
    const profilePhoto = req.file;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    // extra the public id of the old image from url if it exists;
    if (user.photoUrl) {
      const publicId = user.photoUrl.split("/").pop().split(".")[0];
      deleteMediaFromCloudinary(publicId);
    }
    const cloudResponse = await uplaodMedia(profilePhoto.path);
    const photoUrl = cloudResponse.secure_url;
    const updatedData = { name, photoUrl };
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("+password");
    return res.status(200).json({
      message: "Profile upadted successfully",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.log("Error in updating the Profile", error.message);
    res
      .status(500)
      .json({ message: "Failed to update Profile", success: false });
  }
};
