import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import cors from "cors"
import cookieParser from "cookie-parser"

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config({ path: ".env" });
}

const uri = process.env.MONGO_URI ?? "mongodb://localhost:27017/db";

const app = express();
const port = process.env.PORT ?? 3001;

app.use(express.json());

async function startServer() {
  try {
    await mongoose.connect(uri);

    console.log("Successfully connected to MongoDB via Mongoose!");

    app.use(cors({
      origin: "http://localhost:3000",
      methods: [ "GET", "POST", "PUT", "DELETE" ],
      credentials: true,
    }));

    app.use(cookieParser());

    app.use("/api/users", userRoutes);
    app.use("/api/auth", authRoutes);

    // Start Express server
    app.listen(port, () => {
      console.log(`Backend server running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB via Mongoose:", err);
  }
}

// Start the server
startServer();
