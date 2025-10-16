import { Schema, model, Document } from 'mongoose';

// Interface for the Task document
export interface ITask extends Document {
  title: string;
  description: string;
  status: string;
  project: Schema.Types.ObjectId; // Reference to the Project model
  columnId: Schema.Types.ObjectId; // Reference to a specific column in the project
}

const TaskSchema = new Schema<ITask>({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  status: {
    type: String,
    required: true,
    default: 'To Do',
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  columnId: {
    type: Schema.Types.ObjectId,
    required: true,
  }
});

export default model<ITask>('Task', TaskSchema);
