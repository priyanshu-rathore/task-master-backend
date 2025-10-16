# Project & Task Management API 

This is the backend API for a MERN stack project management application. It is built with Node.js, Express, and TypeScript, following a functional programming style and a Model-View-Controller (MVC) architecture. It uses Mongoose for MongoDB object data modeling and includes an integration with the Gemini AI for intelligent task analysis.

## Features

-   **RESTful API**: Clean, predictable endpoints for managing projects and tasks.
-   **Functional & MVC Architecture**: A clear separation of concerns with functional services for business logic and a classic MVC structure.
-   **MongoDB Integration**: Uses Mongoose for robust data modeling and database interaction.
-   **AI-Powered Assistant**: Integrated with Google's Gemini API for:
    -   **Task Summarization**: Get AI-generated summaries of project progress.
    -   **Q&A**: Ask natural language questions about project tasks.
-   **TypeScript**: Fully typed for better developer experience and code quality.
-   **Environment-Based Configuration**: Uses `.env` files for easy configuration.

## Tech Stack

-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Database**: MongoDB with Mongoose
-   **Language**: TypeScript
-   **AI**: Google Gemini API (`@google/generative-ai`)
-   **Dev Environment**: `nodemon` and `ts-node` for live reloading

---

## Local Installation and Setup Guide

Follow these steps to get the backend server running on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18.x or later recommended)
-   [Yarn](https://yarnpkg.com/) (or `npm`)
-   [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally. Alternatively, you can use a free MongoDB Atlas cluster.

### Step 1: Clone the Repository

If you haven't already, clone the project repository to your local machine. This guide assumes you are in the `backend` directory.


### Step 2: Install Dependencies

Install the project dependencies using Yarn or npm.


### Step 3: Create and Configure the Environment File

The server requires environment variables to connect to the database and use the AI API.

1.  Create a `.env` file in the root of the `backend` directory.
2.  Copy the contents of `.env.example` into your new `.env` file if one is provided, or create it from scratch.

Your `.env` file should look like this:

backend/.env
Server Configuration
PORT=5000

MongoDB Connection String
Make sure your MongoDB server is running on the default port,
or replace this with your MongoDB Atlas connection string.
MONGODB_URI=mongodb://127.0.0.1:27017/task-db

Frontend URL for CORS
CLIENT_URL=http://localhost:3000

Gemini API Key
Get your key from Google AI Studio and paste it here.
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE


**Important**:
-   Ensure your MongoDB server is running.
-   Replace `YOUR_GEMINI_API_KEY_HERE` with your actual key from [Google AI Studio](https://ai.google.dev/).

### Step 4: Run the Development Server

Start the server in development mode. It will use `nodemon` to automatically restart whenever you make changes to a file in the `src` directory


If everything is set up correctly, you should see the following output in your terminal:

[nodemon] starting ts-node ./src/server.ts
Successfully connected to MongoDB.
Server is listening on port 5000


The backend API is now running and ready to accept requests!

### Available Scripts

-   `yarn dev`: Starts the server in development mode with live reloading.
-   `yarn build`: Compiles the TypeScript code into JavaScript in the `dist` folder.
-   `yarn start`: Runs the compiled JavaScript code from the `dist` folder (for production).

---

## API Endpoints

The API is structured around REST principles. Here are the main endpoints:

-   `GET /api/projects`: Get all projects.
-   `POST /api/projects`: Create a new project.
-   `PUT /api/projects/:id`: Update a specific project.
-   `DELETE /api/projects/:id`: Delete a specific project.
-   `GET /api/tasks?projectId=<id>`: Get all tasks for a specific project.
-   `POST /api/tasks`: Create a new task.
-   `PUT /api/tasks/:id`: Update a specific task.
-   `DELETE /api/tasks/:id`: Delete a specific task.
-   `GET /api/ai/summarize/:projectId`: Get an AI-generated summary of a project.
-   `POST /api/ai/ask/:projectId`: Ask a question about a project.

.

