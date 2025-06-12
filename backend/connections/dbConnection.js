import mongoose from "mongoose";

let mongoURI = process.env.Mongo_URI;

const dbConnect = () => {
  mongoose
    .connect(mongoURI, {
      dbName: "Mosque_Members",
    })
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.error("Failed to connect DB:", err));
};

export default dbConnect;
