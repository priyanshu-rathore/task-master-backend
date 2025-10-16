import { Request, Response } from 'express';
import * as projectService from '../services/project.service';

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await projectService.findAllProjects();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve projects", error });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await projectService.findProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve project", error });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const project = await projectService.addNewProject(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: "Failed to create project", error });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const updatedProject = await projectService.updateExistingProject(req.params.id, req.body);
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: "Failed to update project", error });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const deletedProject = await projectService.removeProject(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ message: "Failed to delete project", error });
  }
};
