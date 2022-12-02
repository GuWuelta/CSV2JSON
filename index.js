const fs = require("fs");
const path = require("path");
const directory = "./input";
let file;
let directoryFiles;

function checkDirectory(directory) {
  let directoryExists = false;
  if (fs.existsSync(directory)) {
    console.log(`Diretório "${directory}" encontrado!`);
    return (directoryExists = true);
  }

  console.log(`Diretório "${directory}" não encontrado!`);
  return directoryExists;
}

function checkFile(fileWithPath) {
  let fileExists = false;
  if (fs.existsSync(fileWithPath)) {
    console.log(`Arquivo "${fileWithPath}" encontrado!`);
    return (fileExists = true);
  }
  console.log(`Arquivo "${fileWithPath}" não encontrado!`);
  return fileExists;
}

function checkFileExtension(fileWithPath) {
  let fileExists = checkFile(fileWithPath);
  if (fileExists === true) {
    if (path.extname(fileWithPath) != ".csv") {
      console.log("O arquivo não é csv!");
      return (fileExists = false);
    }
  }
  return fileExists;
}

function readFile(directoryExists, fileExists) {
  directoryExists = checkDirectory(directory);

  if (directoryExists) fileExists = checkFileExtension(fileWithPath);

  if (!fileExists) return null;

  const csv = fs.readFileSync(fileWithPath, "utf-8");
  return csv;
}

function convertFile(csv) {
  csv = readFile();

  if (!csv) return null;

  const lines = csv.split("\n");
  const headers = lines[0].split(",");
  const data = lines.slice(1).map((linha) => linha.split(","));
  data.pop();

  const arr = [];

  for (const row of data) {
    const jsonObj = {};
    for (const col in row) {
      jsonObj[headers[col]] = row[col];
    }
    arr.push(jsonObj);
  }
  return arr;
}

function createJsonFile(arr, csv) {
  arr = convertFile(csv);

  if (arr === null) return console.log("Houve um erro na conversão!");

  console.log(
    `O arquivo '${file}' foi convertido para o formato JSON e adicionado na pasta 'output'!\n`
  );
  return fs.writeFileSync(
    `./output/${file.split(".csv")}.json`,
    JSON.stringify(arr, null, 2)
  );
}

function run() {
  directoryFiles = fs.readdirSync(directory, "utf-8");
  for (item of directoryFiles) {
    fileWithPath = `${directory}/${item}`;
    file = item;
    createJsonFile();
  }
}

run();
