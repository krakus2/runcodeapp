const fs = require("fs");
const path = require("path");

/* const args = process.argv.slice(2);
console.log(typeof Number(args[0])); */
const myPath = path.join("client");
console.log(myPath)

 fs.readdir(myPath, (err, array) => {
    array.forEach(elem => console.log(elem))
}); 

