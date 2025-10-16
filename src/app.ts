import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';

// Import routes
import projectRoutes from './api/routes/project.routes';
import taskRoutes from './api/routes/task.routes';
import aiRoutes from './api/routes/ai.routes';

const app: Application = express();

// --- CORS Configuration ---
// This is a more robust configuration than a simple app.use(cors()).
const corsOptions: cors.CorsOptions = {
  // We are setting origin to true to reflect whatever the request origin is.
  // This is effectively the same as '*' but can be more reliable in some proxy environments.
  origin: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Explicitly allow all common methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow common headers
  credentials: true, // Allow cookies/authorization headers
};

// --- Middleware Chain ---
// The order here is CRITICAL.

// 1. Enable CORS for all routes. This should be the first middleware.
app.use(cors(corsOptions));

// 2. Explicitly handle preflight requests.
// This is a safety net. The cors() middleware usually handles this, but being explicit
// can solve issues with certain proxies or non-standard client requests.
app.options('*', cors(corsOptions));

// 3. Enable JSON body parsing. This comes AFTER CORS.
app.use(express.json());

// --- API Routes ---
// Register your routes AFTER all the general middleware.
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/ai', aiRoutes);

// --- Health Check and 404 Handler ---
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Handle 404 for any routes not found. This should be the last route handler.
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

export default app;

