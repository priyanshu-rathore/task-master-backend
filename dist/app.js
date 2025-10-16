"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
// Import routes
const project_routes_1 = __importDefault(require("./api/routes/project.routes"));
const task_routes_1 = __importDefault(require("./api/routes/task.routes"));
const ai_routes_1 = __importDefault(require("./api/routes/ai.routes")); // Import the new AI routes
const app = (0, express_1.default)();
// --- Middlewares ---
app.use((0, cors_1.default)({ origin: process.env.CLIENT_URL }));
app.use(express_1.default.json());
// --- API Routes ---
app.use('/api/projects', project_routes_1.default);
app.use('/api/tasks', task_routes_1.default);
app.use('/api/ai', ai_routes_1.default); // Use the AI routes
// A simple health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});
// Handle 404 for routes not found
app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
});
exports.default = app;
