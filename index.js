const fs = require("fs");
const path = require("path");
const directory = "./input";
const file = directory + "/exemplo.csv";

function checkDirectory(directory) {
  let directoryExists = false;
  if (fs.existsSync(directory)) {
    console.log(`Diretório "${directory}" encontrado!`);
    return directoryExists = true;
  }

  console.log(`Diretório "${directory}" não encontrado!`);
  return directoryExists;
}

function checkFile(file) {
  let fileExists = false;
  if (fs.existsSync(file)) {
    console.log(`Arquivo "${file}" encontrado!`);
    return (fileExists = true);
  }
  console.log(`Arquivo "${file}" não encontrado!`);
  return fileExists;
}

function checkFileExtension(file) {
  let fileExists = checkFile(file)
  if (fileExists === true) {
    if (path.extname(file) != ".csv") {
      console.log("O arquivo não é csv!");
      return (fileExists = false);
    }
  }
  return fileExists;
}

function readFile(directoryExists, fileExists) {
  directoryExists = checkDirectory(directory);

  if (directoryExists) fileExists = checkFileExtension(file);

  if (!fileExists) return null;

  const csv = fs.readFileSync(file, "utf-8");
  console.log(`\nConteúdo do arquivo:\n${csv}\n`);
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

  console.log(arr);
  console.log(
    "\nO arquivo foi convertido para o formato JSON e adicionado na pasta 'output'!"
  );
  return fs.writeFileSync("./output/file.json", JSON.stringify(arr, null, 2));
}

createJsonFile();
