import { Request, Response } from 'express';
import * as taskService from '../services/task.service';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.query;
    if (typeof projectId !== 'string') {
      return res.status(400).json({ message: "A 'projectId' query parameter is required." });
    }
    const tasks = await taskService.findTasksByProjectId(projectId);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve tasks", error });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const task = await taskService.addNewTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: "Failed to create task", error });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const updatedTask = await taskService.updateExistingTask(req.params.id, req.body);
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: "Failed to update task", error });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const deletedTask = await taskService.removeTask(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task", error });
  }
};
