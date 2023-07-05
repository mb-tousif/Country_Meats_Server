import express, { Application } from "express";
import cors from "cors";
import httpStatus from 'http-status';
import dotenv from "dotenv";
import ConnectSerer from "./Server/server";
import router from "./App/Router";
import GlobalErrorHandler from "./Utilities/globalErrorHandler";
import config from "./Config";
import cookieParser from 'cookie-parser';

dotenv.config();
const app : Application = express();
app.use(cors({ origin: "*" }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

ConnectSerer();

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center; padding: 20px; color:#753a88'><span style='color: green'>🛢 </span>Server is successfully running 🚀</h1>"
  );
});

app.use("/api/v1", router);
app.use(GlobalErrorHandler)

app.listen(config.port, () => {
  console.log(`Server running on port: ${config.port} 🚀`);
});

app.all("*", (req, res) => {
 res.status(httpStatus.NOT_FOUND).json({
    success: false,
    status: "fail",
    message: `🚦 Requested ${req.originalUrl} this Route Not Found 💥`,
 });
});
