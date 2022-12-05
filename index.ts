const fs = require("fs");
const path = require("path");
//const directory = path.join(__dirname, "./input");
const directory = "./input";
let file;

function checkDirectory(directory) {
  let directoryExists = false;
  if (!fs.existsSync(directory)) {
    console.log(`Diretório "${directory}" não encontrado!`);
    return directoryExists;
  }

  console.log(`Diretório "${directory}" encontrado!`);
  return (directoryExists = true);
}

function checkFile(fileWithPath) {
  let fileExists = false;
  if (!fs.existsSync(fileWithPath)) {
    console.log(`Arquivo "${fileWithPath}" não encontrado!`);
    return fileExists;
  }
  console.log(`Arquivo "${fileWithPath}" encontrado!`);
  return (fileExists = true);
}

function checkFileExtension(fileWithPath) {
  let fileExists = checkFile(fileWithPath);
  const isCsvFile = path.extname(fileWithPath) === ".csv"
  if (fileExists && !isCsvFile) {
    console.log("O arquivo não é csv!");
    return (fileExists = false);
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
  const data = lines.slice(1).map((line) => line.split(","));
  data.pop();

  const json = data.reduce((acc, row) => {
    const jsonObj = row.reduce((acc, cur, idx) => {
      acc[headers[idx]] = cur;
      return acc;
    }, {});
    return [...acc, jsonObj];
  }, []);
  return json;
}

function createJsonFile(arr, csv) {
  arr = convertFile(csv);

  if (!arr) return console.log("Houve um erro na conversão!");

  console.log(
    `O arquivo '${file}' foi convertido para o formato JSON e adicionado na pasta 'output'!\n`
  );
  return fs.writeFileSync(
    `./output/${file.split(".csv")}.json`,
    JSON.stringify(arr, null, 2)
  );
}

function run() {
  const directoryFiles = fs.readdirSync(directory, "utf-8");
  directoryFiles.forEach((item) => {
    fileWithPath = `${directory}/${item}`;
    file = item;
    createJsonFile();
  });
}

run();
