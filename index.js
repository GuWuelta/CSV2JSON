var fs = require('fs');

fs.readFile('./data/exemplo.csv', 'utf-8', function (err, data) {
    if(err) throw err;
    console.log(data)
    const lines = data.split('\n');
    const keys = lines[0].split(',');
    const dados = lines.slice(1, lines.length - 1).map((linha) => linha.split(","))
    console.log(lines)
    console.log(keys)
    console.log(dados)
    i = 1
    while(i < lines.length) {
        console.log(keys[0] + " e " + keys[1]+ " : " + lines[i])
        i++
    }
    console.log("--------------------------")
    console.log(keys[0] + ":" + dados[0][0] + "," + keys[1] + ":" + dados[0][1])

    for (const row of dados) {
        for (const col of row){
        }
    }
});






