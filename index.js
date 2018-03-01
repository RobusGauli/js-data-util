
export const range = (start, stop, step) => {
  if (typeof start !== 'number') {
    throw new Error('require atleast one argument');
  }
  if (typeof start  === 'number' && !stop) {
    stop = start;
    start = 0;
  }

  if (
    typeof start === 'number' &&
    typeof stop === 'number' 
  ) {
    // that means is has positve vive
    step = (typeof step === 'number') 
      ? step
      : 1;
    let result = [];
    // that means we have a default step of 1 or give user input 
    if (step < 0) {
      for (let i = start; i > stop; i+= step) {
        result.push(i);
      }
    
    } else  {
      for (let i = start; i < stop; i += step) {
        result.push(i);
      }
    }
    return result;
  }
}

export const matrix = (rows, cols) => range(1, rows + 1)
  .map((row) => {
    return range(1, cols + 1)
      .map(col => [row, col]) 
  });






