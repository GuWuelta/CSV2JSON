"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const directory = "./input";
function checkDirectory(directory) {
    let directoryExists = false;
    if (!fs_1.default.existsSync(directory)) {
        console.error("Directory does not exist: " + directory);
        return directoryExists;
    }
    console.log("Directory exists: " + directory);
    return (directoryExists = true);
}
function checkFile(fileWithPath) {
    let fileExists = false;
    if (!fs_1.default.existsSync(fileWithPath)) {
        console.error("File does not exist: " + directory);
        return fileExists;
    }
    console.log("File exists: " + directory);
    return (fileExists = true);
}
function checkFileExtension(fileWithPath, fileExists) {
    fileExists = checkFile(fileWithPath);
    const fileExtension = path_1.default.extname(fileWithPath);
}
