import { existsSync, readFileSync, writeFileSync, readdirSync } from "fs";
import { extname } from "path";

type JsonObjectProps = Record<string, unknown>;

const directory = "./input";
const directoryFiles = readdirSync(directory, "utf-8");

let filePath: string;
let file: string;

function checkDirectory(directory: string): boolean {
  let directoryExists = existsSync(directory);
  try {
    if (!directoryExists) {
      throw new Error("Directory does not exist");
    }
    return directoryExists;
  } catch (error) {
    throw error;
  }
}

function checkFile(file: string): boolean {
  let fileExists = existsSync(file);
  try {
    if (!fileExists) {
      throw new Error("File does not exist");
    }
    return fileExists;
  } catch (error) {
    throw error;
  }
}

function checkFileExtension(file: string): boolean {
  const fileIsCsv = extname(file) === ".csv";
  try {
    if (!fileIsCsv) {
      throw new Error("File is not a CSV");
    }
    return fileIsCsv;
  } catch (error) {
    throw error;
  }
}

function readFile(filePath: string): string {
  const csvBuffer = readFileSync(filePath);
  const csv = csvBuffer.toString().replace(";", ",");
  return csv;
}

function formatFileToJSON(csv: string): JsonObjectProps[] {
  const lines = csv.split("\n");
  const headers = lines[0].split(",");
  const data = lines
    .slice(1)
    .filter(Boolean)
    .map((line) => line.split(","));

  const json = data.reduce<JsonObjectProps[]>((acc, row) => {
    const jsonObj = row.reduce<JsonObjectProps>((acc, cur, idx) => {
      acc[headers[idx]] = cur;
      return acc;
    }, {});
    return [...acc, jsonObj];
  }, []);
  return json;
}

function writeJsonFile(json: JsonObjectProps[]): void {
  writeFileSync(
    `./output/${file.replace(".csv", "")}.json`,
    JSON.stringify(json, null, 2)
  );
}

function run(): void {
  const directoryExists = checkDirectory(directory);
  const fileExists = checkFile(`${directory}/${file}`);
  const isCsvFile = checkFileExtension(file);
  if (directoryExists && fileExists && isCsvFile) {
    const csv = readFile(filePath);
    const json = formatFileToJSON(csv);
    writeJsonFile(json);
  }
}

function convertAllFiles(): void {
  directoryFiles.forEach((item: string) => {
    file = item;
    filePath = directory + "/" + file;
    run();
  });
}

convertAllFiles();
