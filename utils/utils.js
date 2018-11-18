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
    if(returnType   === 'long') returnType = 'int64';

}

exports.splitArray = splitArray;
