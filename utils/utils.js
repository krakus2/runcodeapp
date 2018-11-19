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

const zmienNazwyTypow = typ => {
    let returnType = typ;
    if(returnType === 'long') returnType = 'int64';
    if(returnType === 'int') returnType = 'int32';
    if(returnType   === 'short') returnType = 'int16'
    if(returnType   === 'byte') returnType = 'uInt8';
    if(returnType === 'bool') returnType = 'boolean';
    return "System." + returnType.charAt(0).toUpperCase() + returnType.slice(1);
}

exports.zmienNazwyTypow = zmienNazwyTypow;
