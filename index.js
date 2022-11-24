const fs = require("fs");
const directory = "./data";
const file = directory + "/exemplo.csv";

function checkDirectory(directory) {
  let directoryExists = true;
  if (!fs.existsSync(directory)) {
    console.log(`Diretório "${directory}" não encontrado!`);
    directoryExists = false;
  } else {
    console.log(`Diretório "${directory}" encontrado!`);
  }
  return directoryExists;
}

function checkFile(file) {
  let fileExists = true;
  if (!fs.existsSync(file)) {
    console.log(`Arquivo "${file}" não encontrado!`);
    fileExists = false;
  } else {
    console.log(`Arquivo "${file}" encontrado!`);
  }
  return fileExists;
}

function readFile(directoryExists, fileExists) {
  directoryExists = checkDirectory(directory);
  fileExists = checkFile(file);
  if (fileExists === true && directoryExists === true) {
    const csv = fs.readFileSync(file, "utf-8");
    console.log(`\nConteúdo do arquivo:\n${csv}\n`);
    return csv;
  } else {
    return null;
  }
}

function convertFile(csv) {
  csv = readFile();

  if (csv != null) {
    const lines = csv.split("\n");
    const headers = lines[0].split(",");
    const data = lines.slice(1).map((linha) => linha.split(","));

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
  return null;
}

function createJsonFile(arr, csv) {
  arr = convertFile(csv);
  
  if (arr != null) {
    console.log(arr);
    console.log("\nO arquivo foi convertido para o formato JSON e adicionado na pasta 'output'!");
    return fs.writeFileSync("./output/file.json", JSON.stringify(arr));
  } else {
    return console.log("Houve um erro na conversão!")
  }
}

createJsonFile();
