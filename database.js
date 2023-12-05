import mongoose from "mongoose";



// Custom function to find or create a user

// Function to connect to the MongoDB database
const connectDb = async (DATABASE_URI) => {
  try {
    

    const DB_OPTIONS = {
      dbName: "OAUth",
    };

    await mongoose.connect(DATABASE_URI, DB_OPTIONS);
    console.log("Connected successfully");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

export { connectDb};
