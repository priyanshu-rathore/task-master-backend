"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Schema for the Column subdocument
const ColumnSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
});
// Schema for the Project document
const ProjectSchema = new mongoose_1.Schema({
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
exports.default = (0, mongoose_1.model)('Project', ProjectSchema);
