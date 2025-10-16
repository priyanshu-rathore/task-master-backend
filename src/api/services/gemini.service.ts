import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';
import { ITask } from "../models/Task";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined in the environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * Creates a text-only prompt to send to the Gemini model.
 * @param prompt The string prompt to send.
 * @returns The generated text response.
 */
const generateText = async (prompt: string): Promise<string> => {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating text with Gemini:", error);
    return "Unable to process AI request at this time.";
  }
};

/**
 * Generates a summary for a list of tasks using the Gemini API.
 * @param tasks An array of task documents.
 * @returns A string containing the AI-generated summary.
 */
export const generateProjectSummary = async (tasks: ITask[]): Promise<string> => {
  if (tasks.length === 0) {
    return "This project has no tasks to summarize.";
  }

  // Create a simplified text representation of tasks for the prompt
  const taskDetails = tasks.map(task => 
    `- Title: ${task.title} (Status: ${task.status})`
  ).join("\n");

  const prompt = `
    Analyze the following list of tasks for a project and provide a brief, insightful summary.
    Comment on the overall progress and identify any potential bottlenecks based on the number of tasks in each status category (To Do, In Progress, Done).

    Tasks:
    ${taskDetails}

    Summary:
  `;

  return generateText(prompt);
};

/**
 * Answers a specific question about a list of tasks using the Gemini API.
 * @param question The user's question.
 * @param tasks An array of task documents to use as context.
 * @returns A string containing the AI-generated answer.
 */
export const answerProjectQuestion = async (question: string, tasks: ITask[]): Promise<string> => {
  if (tasks.length === 0) {
    return "I can't answer questions because there are no tasks in this project.";
  }
  
  const taskContext = tasks.map(task => 
    `- Task: "${task.title}", Status: "${task.status}", Description: "${task.description}"`
  ).join("\n");

  const prompt = `
    You are a project management assistant. Based *only* on the following task data, answer the user's question.

    Task Data:
    ${taskContext}

    User's Question: "${question}"

    Answer:
  `;

  return generateText(prompt);
};
