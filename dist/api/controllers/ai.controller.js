"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.askQuestion = exports.summarizeProject = void 0;
const geminiService = __importStar(require("../services/gemini.service"));
const taskService = __importStar(require("../services/task.service"));
/**
 * Controller to handle summarizing all tasks in a project.
 */
const summarizeProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId } = req.params;
    if (!projectId) {
        return res.status(400).json({ message: "Project ID is required." });
    }
    try {
        const tasks = yield taskService.findTasksByProjectId(projectId);
        const summary = yield geminiService.generateProjectSummary(tasks);
        res.status(200).json({ summary });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to generate summary", error });
    }
});
exports.summarizeProject = summarizeProject;
/**
 * Controller to handle answering a question about a project.
 */
const askQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId } = req.params;
    const { question } = req.body;
    if (!projectId || !question) {
        return res.status(400).json({ message: "Project ID and a question are required." });
    }
    try {
        const tasks = yield taskService.findTasksByProjectId(projectId);
        const answer = yield geminiService.answerProjectQuestion(question, tasks);
        res.status(200).json({ answer });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to get answer from AI", error });
    }
});
exports.askQuestion = askQuestion;
