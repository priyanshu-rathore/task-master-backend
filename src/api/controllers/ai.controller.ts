import { Request, Response } from 'express';
import * as geminiService from '../services/gemini.service';
import * as taskService from '../services/task.service';

/**
 * Controller to handle summarizing all tasks in a project.
 */
export const summarizeProject = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  if (!projectId) {
    return res.status(400).json({ message: "Project ID is required." });
  }

  try {
    const tasks = await taskService.findTasksByProjectId(projectId);
    const summary = await geminiService.generateProjectSummary(tasks);
    res.status(200).json({ summary });
  } catch (error) {
    res.status(500).json({ message: "Failed to generate summary", error });
  }
};

/**
 * Controller to handle answering a question about a project.
 */
export const askQuestion = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const { question } = req.body;

  if (!projectId || !question) {
    return res.status(400).json({ message: "Project ID and a question are required." });
  }

  try {
    const tasks = await taskService.findTasksByProjectId(projectId);
    const answer = await geminiService.answerProjectQuestion(question, tasks);
    res.status(200).json({ answer });
  } catch (error) {
    res.status(500).json({ message: "Failed to get answer from AI", error });
  }
};
