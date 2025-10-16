"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.answerProjectQuestion = exports.generateProjectSummary = void 0;
const generative_ai_1 = require("@google/generative-ai");
require("dotenv/config");
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined in the environment variables.");
}
const genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
/**
 * Creates a text-only prompt to send to the Gemini model.
 * @param prompt The string prompt to send.
 * @returns The generated text response.
 */
const generateText = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield model.generateContent(prompt);
        const response = yield result.response;
        return response.text();
    }
    catch (error) {
        console.error("Error generating text with Gemini:", error);
        return "Unable to process AI request at this time.";
    }
});
/**
 * Generates a summary for a list of tasks using the Gemini API.
 * @param tasks An array of task documents.
 * @returns A string containing the AI-generated summary.
 */
const generateProjectSummary = (tasks) => __awaiter(void 0, void 0, void 0, function* () {
    if (tasks.length === 0) {
        return "This project has no tasks to summarize.";
    }
    // Create a simplified text representation of tasks for the prompt
    const taskDetails = tasks.map(task => `- Title: ${task.title} (Status: ${task.status})`).join("\n");
    const prompt = `
    Analyze the following list of tasks for a project and provide a brief, insightful summary.
    Comment on the overall progress and identify any potential bottlenecks based on the number of tasks in each status category (To Do, In Progress, Done).

    Tasks:
    ${taskDetails}

    Summary:
  `;
    return generateText(prompt);
});
exports.generateProjectSummary = generateProjectSummary;
/**
 * Answers a specific question about a list of tasks using the Gemini API.
 * @param question The user's question.
 * @param tasks An array of task documents to use as context.
 * @returns A string containing the AI-generated answer.
 */
const answerProjectQuestion = (question, tasks) => __awaiter(void 0, void 0, void 0, function* () {
    if (tasks.length === 0) {
        return "I can't answer questions because there are no tasks in this project.";
    }
    const taskContext = tasks.map(task => `- Task: "${task.title}", Status: "${task.status}", Description: "${task.description}"`).join("\n");
    const prompt = `
    You are a project management assistant. Based *only* on the following task data, answer the user's question.

    Task Data:
    ${taskContext}

    User's Question: "${question}"

    Answer:
  `;
    return generateText(prompt);
});
exports.answerProjectQuestion = answerProjectQuestion;
