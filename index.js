const fs = require("fs");
const directory = "./input";
const file = directory + "/exemplo.csv";

function checkDirectory(directory) {
  let directoryExists = true;
  if (!fs.existsSync(directory)) {
    directoryExists = false;
    return console.log(`Diretório "${directory}" não encontrado!`);
  }

  console.log(`Diretório "${directory}" encontrado!`);
  return directoryExists;
}

function checkFile(file) {
  let fileExists = true;
  if (!fs.existsSync(file)) {
    console.log(`Arquivo "${file}" não encontrado!`);
    return (fileExists = false);
  }
  if (fileExists) {
    const subArray = file.split(".");
    if (subArray[2] != "csv") {
      console.log("O arquivo não é csv!");
      return (fileExists = false);
    }
  }
  console.log(`Arquivo "${file}" encontrado!`);
  return fileExists;
}

function readFile(directoryExists, fileExists) {
  directoryExists = checkDirectory(directory);

  if (directoryExists) fileExists = checkFile(file);

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
  return fs.writeFileSync("./output/file.json", JSON.stringify(arr));
}

createJsonFile();
