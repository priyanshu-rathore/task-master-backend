import { Router } from 'express';
import * as projectController from '../controllers/project.controller';

const projectRoutes = Router();

// Define routes for the Project resource
projectRoutes.post('/', projectController.createProject);
projectRoutes.get('/', projectController.getProjects);
projectRoutes.get('/:id', projectController.getProjectById);
projectRoutes.put('/:id', projectController.updateProject);
projectRoutes.delete('/:id', projectController.deleteProject);

export default projectRoutes;
