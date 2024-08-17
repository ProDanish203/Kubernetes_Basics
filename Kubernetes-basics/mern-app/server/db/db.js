import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}`);
    mongoose.connection.on("connected", () => {
      console.log(`Database Connected Successfully: ${conn.connection.host}`);
    });
    mongoose.connection.on("error", (err) => {
      console.log("err connecting", err);
    });
  } catch (e) {
    console.log("Database Connection Error: \n", e);
  }
};
