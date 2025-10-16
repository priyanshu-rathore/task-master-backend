import express, { Application, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

// Import routes
import projectRoutes from "./api/routes/project.routes";
import taskRoutes from "./api/routes/task.routes";
import aiRoutes from "./api/routes/ai.routes"; // Import the new AI routes

const app: Application = express();

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- API Routes ---
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/ai", aiRoutes); // Use the AI routes

// A simple health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Handle 404 for routes not found
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

export default app;
