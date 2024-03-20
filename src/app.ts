import express, { Request, Response, Application, NextFunction } from "express";
import ErrorHandler from "./utils/ErrorHandler";
import AuthRouter from "./routes/auth.routes";
import UserRouter from "./routes/user.routes";
import cors from "cors";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", AuthRouter);
app.use("/api/users", UserRouter);

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
