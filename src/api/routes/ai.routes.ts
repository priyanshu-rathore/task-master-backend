import { Router } from "express";
import * as aiController from "../controllers/ai.controller";

const aiRoutes = Router();

// Route to get an AI-generated summary for a project
// GET /api/ai/summarize/:projectId
aiRoutes.get("/summarize/:projectId", aiController.summarizeProject);

// Route to ask a question about a project
// POST /api/ai/ask/:projectId
aiRoutes.post("/ask/:projectId", aiController.askQuestion);

export default aiRoutes;
