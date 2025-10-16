import { Router } from "express";
import * as taskController from "../controllers/task.controller";

const taskRoutes = Router();

// Define routes for the Task resource
taskRoutes.post("/", taskController.createTask);
taskRoutes.get("/", taskController.getTasks); // e.g., /api/tasks?projectId=...
taskRoutes.put("/:id", taskController.updateTask);
taskRoutes.delete("/:id", taskController.deleteTask);

export default taskRoutes;
