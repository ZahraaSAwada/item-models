// src/index.ts
import express, { NextFunction, Request, Response } from "express";
import analyticsRoutes from "./route/analytics.route";
import { HttpException } from "./util/exceptions/HttpException";

const app = express();

// Parse incoming JSON request bodies
app.use(express.json());

// Mount the analytics routes under the /analytics prefix
app.use("/analytics", analyticsRoutes);

// 404 handler — for any request that matched no route above
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not Found" });
});

// Global error handler — catches everything forwarded by asyncHandler
app.use(
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HttpException) {
      res.status(err.status).json({
        message: err.message,
        details: err.details || undefined,
      });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});