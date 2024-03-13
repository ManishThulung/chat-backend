import express, { Request, Response, Application, NextFunction } from "express";
import ErrorHandler from "./utils/ErrorHandler";
import HouseRouter from "./routes/houseRoutes";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/house", HouseRouter);

// with this the app does not crash but throws error in json file
app.use(
  (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Internal server error";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
    });
  }
);

export default app;
