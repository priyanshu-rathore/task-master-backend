"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTask = exports.updateExistingTask = exports.addNewTask = exports.findTasksByProjectId = void 0;
const Task_1 = __importDefault(require("../models/Task"));
// Finds all tasks for a given project ID
const findTasksByProjectId = (projectId) => {
    return Task_1.default.find({ project: projectId }).exec();
};
exports.findTasksByProjectId = findTasksByProjectId;
// Creates a new task
const addNewTask = (taskData) => {
    const task = new Task_1.default(taskData);
    return task.save();
};
exports.addNewTask = addNewTask;
// Updates a task, including its status and column
const updateExistingTask = (id, taskData) => {
    return Task_1.default.findByIdAndUpdate(id, taskData, { new: true }).exec();
};
exports.updateExistingTask = updateExistingTask;
// Deletes a task
const removeTask = (id) => {
    return Task_1.default.findByIdAndDelete(id).exec();
};
exports.removeTask = removeTask;
