const fs = require('fs');
const path = require('path');

function deleteFolderRecursive(myPath) {
  if (fs.existsSync(myPath) && fs.lstatSync(myPath).isDirectory()) {
    fs.readdirSync(myPath).forEach(function(file, index){
      const curPath = path.join(myPath, file);

      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });

    console.log(`Deleting directory "${myPath}"...`);
    fs.rmdirSync(myPath);
  }
};

console.log("Cleaning working tree...");

deleteFolderRecursive("./client/build");

console.log("Successfully cleaned working tree!");