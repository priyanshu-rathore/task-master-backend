"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) {
    console.error("FATAL ERROR: MONGODB_URI is not defined.");
    process.exit(1);
}
mongoose_1.default.connect(MONGO_URI)
    .then(() => {
    console.log('Successfully connected to MongoDB.');
    app_1.default.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch(err => {
    console.error('Connection error', err);
    process.exit(1);
});
