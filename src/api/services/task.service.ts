import Task, { ITask } from '../models/Task';
import { Schema } from 'mongoose';

type TaskData = {
  title: string;
  description?: string;
  project: string | Schema.Types.ObjectId;
  columnId: string | Schema.Types.ObjectId;
  status: string;
};

// Finds all tasks for a given project ID
export const findTasksByProjectId = (projectId: string): Promise<ITask[]> => {
  return Task.find({ project: projectId }).exec();
};

// Creates a new task
export const addNewTask = (taskData: TaskData): Promise<ITask> => {
  const task = new Task(taskData);
  return task.save();
};

// Updates a task, including its status and column
export const updateExistingTask = (id: string, taskData: Partial<TaskData>): Promise<ITask | null> => {
  return Task.findByIdAndUpdate(id, taskData, { new: true }).exec();
};

// Deletes a task
export const removeTask = (id: string): Promise<ITask | null> => {
  return Task.findByIdAndDelete(id).exec();
};
