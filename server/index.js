const fs = require('fs');
const fileName = './house.json';
const house = require(fileName);

function genRand(min, max, decimalPlaces) {  
  var rand = Math.random()*(max-min) + min;
  var power = Math.pow(10, decimalPlaces);
  return Math.floor(rand*power) / power;
}

function intervalFunc() {
  house.rooms.forEach(room => {
    room['temperature'] = genRand(21, 25, 2);
  });

  fs.writeFile(fileName, JSON.stringify(house), writeJSON = err => {
    if (err) return console.log(err);
  });
}

setInterval(intervalFunc, 300);