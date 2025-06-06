import mongoose from "mongoose";

let mongoURI =
  process.env.Mongo_URI ||
  "mongodb+srv://mdizharpasha07:MasjideAbu@cluster0.3aigaq0.mongodb.net/?retryWrites=true";

const dbConnect = () => {
  mongoose
    .connect(mongoURI, {
      dbName: "Mosque_Members",
    })
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.error("Failed to connect DB:", err));
};

export default dbConnect;
