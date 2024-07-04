import mongoose from "mongoose";
async function connectDB(url) {
  mongoose.connect(url);
}

export { connectDB };
