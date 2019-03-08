const fs = require('fs');
const path = require('path');
const sql = require('./task_submit');

const corrected = sql.map(elem => {
   const obj = {
      ...elem
   };
   obj.error_count = parseInt(elem.error_count);
   obj.test_count = parseInt(elem.test_count);
   if (elem.test_list.length > 1) {
      let test_list = elem.test_list.split('ID');
      test_list.shift();
      test_list = test_list.map(elem_list => {
         let x = `ID${elem_list}`.replace(/\\\\/g, '');
         //console.log(x.substring(x.length - 3));
         // prettier-ignore
         if ((x.substring(x.length - 3) === '","') || (x.substring(x.length - 3) === '""]')) {
            x = x.slice(0, x.length - 3);
         }
         return x;
      });
      obj.test_list = test_list;
   }
   return obj;
});

fs.writeFile('zwrotkaZBazy.json', JSON.stringify(corrected, null, '\t'), function(err) {
   if (err) throw err;
   console.log('complete');
});

//console.log(corrected);
