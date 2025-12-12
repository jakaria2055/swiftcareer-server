import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/database.js";
import userRouter from "./src/routes/userRoutes.js";
import companyRouter from "./src/routes/companyRoutes.js";
import jobRouter from "./src/routes/jobRoutes.js";
import applicationRouter from "./src/routes/applicationRoutes.js";
dotenv.config({});

const app = express();

// app.get("/", (req, res) => {
//   return res.status(200).json({
//     message: "Server is running fine...",
//     timestamp: new Date().toISOString(),
//     success: true,
//   });
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: ["https://swiftcareer-client.vercel.app"],
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;

//API's
app.use("/api/users", userRouter);
app.use("/api/company", companyRouter);
app.use("/api/job", jobRouter);
app.use("/api/application", applicationRouter);

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log("Server is running on PORT: ", +PORT));
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on ${PORT}`);
});


