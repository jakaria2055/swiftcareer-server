import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/database.js";
import userRouter from "./src/routes/userRoutes.js";
import companyRouter from "./src/routes/companyRoutes.js";
import jobRouter from "./src/routes/jobRoutes.js";
dotenv.config({});

const app = express();

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Server is running fine...",
    timestamp: new Date().toISOString(),
    success: true,
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

const PORT = process.env.PORT || 5000;

//API's
app.use("/api/users", userRouter);
app.use("/api/company", companyRouter);
app.use("/api/job", jobRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on ${PORT}`);
});

//38:00
