import { Schema, model, Document } from 'mongoose';

// Interface for a Column subdocument
export interface IColumn extends Document {
  name: string;
}

// Interface for the Project document
export interface IProject extends Document {
  name: string;
  description: string;
  createdDate: Date;
  columns: IColumn[];
}

// Schema for the Column subdocument
const ColumnSchema = new Schema<IColumn>({
  name: { type: String, required: true },
});

// Schema for the Project document
const ProjectSchema = new Schema<IProject>({
  name: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  columns: [ColumnSchema],
});

export default model<IProject>('Project', ProjectSchema);
