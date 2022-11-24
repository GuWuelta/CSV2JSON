const fs = require("fs");

function readFile() {
  const csv = fs.readFileSync("./data/exemplo.csv", "utf-8");
  return csv;
}

function convertFile(csv) {
  csv = readFile();

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

function createJsonFile(arr, csv) {
  arr = convertFile(csv);
  console.log(arr);
  return fs.writeFileSync("./output/file.json", JSON.stringify(arr));
}

createJsonFile();
