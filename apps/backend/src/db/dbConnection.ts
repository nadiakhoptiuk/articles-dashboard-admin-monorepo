import mongoose, { MongooseError } from "mongoose";

const MONGO_URI: string = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error("Missing MongoDB URI");
}

export async function connectToDB() {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO_URI as string);
    console.log("Database connection is successful");
  } catch (err) {
    if (err instanceof MongooseError) {
      console.log(`Database connection failed with error: ${err.message}`);
    } else {
      console.log(err);
    }
    process.exit(1);
  }
}
