const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const tasks = require('../routes/api/tasks');

const trescUrl = 'http://localhost:5000/api/tasks/zipTresc'; //absolute path to specified port, might not work on other machines
const testyUrl = 'http://localhost:5000/api/tasks/zipTesty'; //absolute path to specified port, might not work on other machines

const apiCall = async () => {
   //TODO - skorzystac z wyeksportowanych funkcji z tasks robiacych zapytanie do bazy, a nie z wlasnego endpointa
   //nie wiem czemu te zaimportowane funkcje nie chca nic zwrocic
   const response1 = await fetch(trescUrl);
   const zadania = await response1.json();
   const response2 = await fetch(testyUrl);
   const testy = await response2.json();
   console.log(JSON.stringify(testy, null, '\t'));

   fs.writeFile('tresciZadan.json', JSON.stringify(zadania, null, '\t'), function(err) {
      if (err) throw err;
      console.log('complete 1');
   });

   const testsPath = path.join(__dirname, '..', 'daneDoTestow');
   ensureExists(testsPath, 0744, function(err) {
      //tworzy nowy folder z testami
      if (err) throw err;
      else console.log('complete 2');
   });

   testy.forEach(zadanie => {
      const nazwaPliku = `${zadanie[0]}.json`;
      const tablicaTestow = [];
      for (let i = 1; i < zadanie.length; i++) {
         tablicaTestow.push(zadanie[i]);
      }
      fs.writeFile(
         `${testsPath}/${nazwaPliku}`,
         JSON.stringify(tablicaTestow, null, '\t'),
         function(err) {
            if (err) throw err;
            console.log('complete 3');
         }
      );
   });
};

function ensureExists(path, mask, cb) {
   if (typeof mask == 'function') {
      // allow the `mask` parameter to be optional
      cb = mask;
      mask = 0777;
   }
   fs.mkdir(path, mask, function(err) {
      if (err) {
         if (err.code == 'EEXIST') cb(null);
         // ignore the error if the folder already exists
         else cb(err); // something else went wrong
      } else cb(null); // successfully created folder
   });
}

apiCall();
