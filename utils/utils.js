const splitArray = (inputArray, perChunk) => {
   return inputArray.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / perChunk);

      if (!resultArray[chunkIndex]) {
         resultArray[chunkIndex] = []; // start a new chunk
      }

      resultArray[chunkIndex].push(item);

      return resultArray;
   }, []);
};

function isNumeric(n) {
   return !isNaN(parseFloat(n)) && isFinite(n);
}

function escapeRegExp(str) {
   return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}

function replaceAll(str, find, replace) {
   return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

const zmienNazwyTypow = typ => {
   let returnType = typ;
   if (returnType === 'long') returnType = 'int64';
   if (returnType === 'int') returnType = 'int32';
   if (returnType === 'short') returnType = 'int16';
   if (returnType === 'byte') returnType = 'uInt8';
   if (returnType === 'bool') returnType = 'boolean';
   return 'System.' + returnType.charAt(0).toUpperCase() + returnType.slice(1);
};

const returnValue = value => {
   if (isNumeric(value)) {
      return Number(value);
   } else {
      return replaceAll(value, '"', '').trim();
   }
};

// prettier-ignore
const returnArrayValue = value => {
   return value.split(',').map(elem => {
      if (isNumeric(elem)) {
         return Number(elem);
      } else {
         return replaceAll(elem, '\"', '').trim();
      }
   });
};

module.exports = {
   zmienNazwyTypow,
   returnValue,
   returnArrayValue
};
