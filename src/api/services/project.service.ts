import Project, { IProject } from '../models/Project';

type ProjectData = {
  name: string;
  description?: string;
};

// Returns a promise that resolves to an array of all projects
export const findAllProjects = (): Promise<IProject[]> => {
  return Project.find().sort({ createdDate: -1 }).exec();
};

// Returns a promise that resolves to a single project or null
export const findProjectById = (id: string): Promise<IProject | null> => {
  return Project.findById(id).exec();
};

// Creates a new project and returns a promise that resolves to the created project
export const addNewProject = (projectData: ProjectData): Promise<IProject> => {
  const project = new Project({
    ...projectData,
    columns: [{ name: 'To Do' }, { name: 'In Progress' }, { name: 'Done' }],
  });
  return project.save();
};

// Updates a project and returns a promise that resolves to the updated project or null
export const updateExistingProject = (id: string, projectData: Partial<ProjectData>): Promise<IProject | null> => {
  return Project.findByIdAndUpdate(id, projectData, { new: true }).exec();
};

// Deletes a project and returns a promise that resolves to the deleted document or null
export const removeProject = (id: string): Promise<IProject | null> => {
  return Project.findByIdAndDelete(id).exec();
};
