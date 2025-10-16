"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProject = exports.updateExistingProject = exports.addNewProject = exports.findProjectById = exports.findAllProjects = void 0;
const Project_1 = __importDefault(require("../models/Project"));
// Returns a promise that resolves to an array of all projects
const findAllProjects = () => {
    return Project_1.default.find().sort({ createdDate: -1 }).exec();
};
exports.findAllProjects = findAllProjects;
// Returns a promise that resolves to a single project or null
const findProjectById = (id) => {
    return Project_1.default.findById(id).exec();
};
exports.findProjectById = findProjectById;
// Creates a new project and returns a promise that resolves to the created project
const addNewProject = (projectData) => {
    const project = new Project_1.default(Object.assign(Object.assign({}, projectData), { columns: [{ name: 'To Do' }, { name: 'In Progress' }, { name: 'Done' }] }));
    return project.save();
};
exports.addNewProject = addNewProject;
// Updates a project and returns a promise that resolves to the updated project or null
const updateExistingProject = (id, projectData) => {
    return Project_1.default.findByIdAndUpdate(id, projectData, { new: true }).exec();
};
exports.updateExistingProject = updateExistingProject;
// Deletes a project and returns a promise that resolves to the deleted document or null
const removeProject = (id) => {
    return Project_1.default.findByIdAndDelete(id).exec();
};
exports.removeProject = removeProject;
