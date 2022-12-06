import fs from "fs";
import path from "path";

const directory: string = "./input";

function checkDirectory(directory: string): boolean {
  let directoryExists: boolean = false;
  if (!fs.existsSync(directory)) {
    console.error("Directory does not exist: " + directory);
    return directoryExists;
  }
  console.log("Directory exists: " + directory);
  return (directoryExists = true);
}

function checkFile(fileWithPath: string): boolean {
  let fileExists: boolean = false;
  if (!fs.existsSync(fileWithPath)) {
    console.error("File does not exist: " + directory);
    return fileExists;
  }
  console.log("File exists: " + directory);
  return (fileExists = true);
}

function checkFileExtension(fileWithPath: string): boolean {
  let fileExists: boolean = checkFile(fileWithPath);
  const fileExtension: string = path.extname(fileWithPath);
  if (fileExtension != ".csv") throw new Error("File is not csv");

  return fileExists;
}

// function readFile(directoryExists: boolean);
