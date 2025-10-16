import express, { Application, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

// Import routes
import projectRoutes from "./api/routes/project.routes";
import taskRoutes from "./api/routes/task.routes";
import aiRoutes from "./api/routes/ai.routes";

const app: Application = express();

// --- CORS Configuration ---
const allowedOrigins = [
  "https://task-master-pro-chi.vercel.app", // ✅ Your deployed frontend
  "http://localhost:5173",                  // ✅ Local dev (Vite)
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn("❌ Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// --- Middleware Chain ---

// 1. Enable CORS for all routes
app.use(cors(corsOptions));

// 2. Handle preflight OPTIONS requests explicitly
app.options("*", cors(corsOptions));

// 3. Parse JSON requests
app.use(express.json());

// --- API Routes ---
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/ai", aiRoutes);

// --- Health Check Route ---
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// --- 404 Handler ---
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

export default app;
