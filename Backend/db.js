import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    const conn =await mongoose.connect(process.env.MONGO_URI);
    console.log(`connected to mongoDB`);
  } catch (error) {
    throw new Error("Error in connecting to mongo server");
  }
};
