import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./db.js";
import userRoute from "./routes/user.route.js";
import dotenv from "dotenv";
dotenv.config({});
const app = express();
const port = process.env.PORT || 5000;
const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1/user", userRoute);
app.get("/", (req, res) => {
  res.json({ message: "Ther server is running" });
});
app.listen(port, () => {
  connectDB();
  console.log(`Server is running in http://localhost:${port}/`);
});
 