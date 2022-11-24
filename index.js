const fs = require("fs");

fs.readFile("./data/exemplo.csv", "utf-8", function (err, csv) {
  if (err) throw err;
  //console.log(csv)
  const lines = csv.split("\n");
  const keys = lines[0].split(",");
  const data = lines.slice(1).map((linha) => linha.split(","));
  const arr = [];

  for (const row of data) {
    const jsonObj = {};
    for (const col in row) {
      jsonObj[keys[col]] = row[col];
    }
    arr.push(jsonObj);
  }
  console.log(arr);

  fs.writeFileSync("./output/file.json", JSON.stringify(arr));
});
