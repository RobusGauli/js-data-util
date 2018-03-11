window.onload = function() {
  const canvas = document.getElementById('main');
  const context = canvas.getContext('2d');
  
  const width = canvas.width = window.innerWidth;
  const height = canvas.height = window.innerHeight;
  
  const cols = rows = 100;
  const size = 4;
  
  function makeInitialGrid() {
    const grid = [];
    for (let col = 0; col < cols; col++) {
      const colVector = [];
      for (let row = 0; row < rows; row++) {
        colVector.push(-1);
        
      }
      grid.push(colVector);
    }
    return grid;
  }
  
  
  function paintGrid(grid) {
    for (let col = 0; col < cols; col++) {
      for ( let row = 0; row < rows; row++) {
        const val = grid[col][row];
        if (val === 1) {
          context.save();
          context.fillStyle = 'rgb(0, 0, 0)';
          context.fillRect(col * size, row * size, size, size );
          context.restore();
        } else {
          context.save();
          context.fillStyle = 'rgb(255, 255, 255)';
          context.fillRect(col * size, row * size, size , size);
          context.restore();
        }
       }
    }
  }
  const copyGrid = grid =>
    JSON.parse(JSON.stringify(grid));
  
  let currentGrid = makeInitialGrid();
  
  let direction = "RIGHT";
  let currentCol = 90;
  let currentRow = 90;
  
  function generateNewGrid(grid) {
    const newGrid = copyGrid(grid);
    const currentSquare = newGrid[currentCol][currentRow];
    if (currentSquare == -1) {
      // that means the white grid
      if (direction === 'UP') {
        // turn right
          direction = 'RIGHT';
        // flip the state
          newGrid[currentCol][currentRow] = currentSquare * -1;
        // move forwar one unit
          currentCol = ((currentCol + 1 + cols) % cols)
        
      } else if (direction === 'DOWN'){
          direction = 'LEFT';
          newGrid[currentCol][currentRow] = currentSquare * -1;
          currentCol = ((currentCol - 1 + cols) % cols)
      } else if (direction === 'RIGHT') {
        
        direction = 'DOWN';
        newGrid[currentCol][currentRow] = currentSquare * -1;
        currentRow = ((currentRow + 1 + rows) % rows);
      } else {
        direction = 'UP';
        newGrid[currentCol][currentRow] = currentSquare * -1;
        currentRow = ((currentRow - 1 + rows) % rows);
      }
    } else {
      if (direction === 'UP') {
        // turn right
          direction = 'LEFT';
        // flip the state
          newGrid[currentCol][currentRow] = currentSquare * -1;
        // move forwar one unit
          currentCol = ((currentCol - 1 + cols) % cols)
        
      } else if (direction === 'DOWN'){
          direction = 'RIGHT';
          newGrid[currentCol][currentRow] = currentSquare * -1;
          currentCol = ((currentCol + 1 + cols) % cols)
      } else if (direction === 'LEFT') {
        
        direction = 'DOWN';
        newGrid[currentCol][currentRow] = currentSquare * -1;
        currentRow = ((currentRow + 1 + rows) % rows);
      } else {
        direction = 'UP';
        newGrid[currentCol][currentRow] = currentSquare * -1;
        currentRow = ((currentRow - 1 + rows) % rows);
      }
      
    }
    
    return newGrid;
    
  }
  function draw() {
    paintGrid(currentGrid);
    currentGrid = generateNewGrid(currentGrid);
  }
  
  function _draw() {
    context.clearRect(0, 0, width, height);
    context.save();
    draw();
    context.restore();
    requestAnimationFrame(_draw);
  }
  
  
  _draw();
  
}


