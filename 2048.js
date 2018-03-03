window.onload = function() {
  // 
  const canvas = document.getElementById('root');
  const context = canvas.getContext('2d');
  
  const width = canvas.width = window.innerWidth;
  const height = canvas.height  = window.innerHeight;
  
  const rows = cols = 4;
  const size = 100;
  
  function* chain(...args) {
    for (let iterable of args) {
      yield* iterable;
    }
  }
  
  class Cell {
    constructor() {
      this.value = 0;
      this.merged = false;
    }
    
    static show(x, y) {
      context.save();
      context.beginPath();
      context.fillRect(x * size, y * size, size, size);
      context.closePath();
      context.restore();
    } 
  }
  
  class Grid {
    constructor() {
      this.spots = new Array(rows)
        .fill(0)
        .map((_, row) => {
          return new Array(cols)
            .fill(0)
            .map((_, col) => {
              return {
                row: row,
                col: col,
                value: 0,
              }
          })  
        });
      
    }
    
    transpose() {
      // transpose the list
      //make a copy
      const spots = new Array(rows)
        .fill(0)
        .map((_, row) => {
          return new Array(cols)
            .fill(0)
            .map((_, col) => {
            return ({
              row: row,
              col: col,
              value: 0,
            })
          })
        });
      
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
           
          const temp = this.spots[row][col].row;
          this.spots[row][col].row = this.spots[row][col].col;
          this.spots[row][col].col = temp;
        }
      }
      
      
    }
    
    moveAllToRight() {
      // here we need to move entire grid to the right
      const newGrid = []
      
      for (let row = 0; row < rows; row++) {
        const newRow = new Array(cols)
          .fill(0)
          .map((_, col) => ({
            row: row, col: col, value: 0
          }));
        let availableCol = cols - 1;
        for (let col = cols - 1; col >= 0; col--) {
          // herer we move from the right to left
          // get the current grid cell
          const cell = this.spots[row][col];
          if (cell.value !== 0) {
            // that means we have a value
            newRow[availableCol].value = cell.value;
            //decrement the available column spot
            availableCol -= 1;
          }
        }
        newGrid.push(newRow);
      }
      
      // now we have a grid we ca go ahead and merge from right to left
      
      const finalGrid = [];
      for (let row = 0; row < rows; row++) {
        const newRow = new Array(cols)
          .fill(0)
          .map((_, col) => ({
            row: row, col: col, value: 0
          }));
        
        for (let col = cols - 1; col >= 0; col--) {
          if (col > 1 && newGrid[row][col].value === newGrid[row][col - 1].value) {
            // that means we have to merge
            const newValue = newGrid[row][col].value + newGrid[row][col-1].value;
            newRow[col].value = newValue;
          } else {
            newRow[col].value = newGrid[row][col].value;
          }
        }
        finalGrid.push(newRow);
      }
      
      this.spots = finalGrid;
      
    }
    
    moveAllToLeft() {
      // here we need to move entire grid to the right
      const newGrid = []
      
      for (let row = 0; row < rows; row++) {
        const newRow = new Array(cols)
          .fill(0)
          .map((_, col) => ({
            row: row, col: col, value: 0
          }));
        let availableCol = 0;
        for (let col = 0; col < cols; col++) {
          // herer we move from the right to left
          // get the current grid cell
          const cell = this.spots[row][col];
          if (cell.value !== 0) {
            // that means we have a value
            newRow[availableCol].value = cell.value;
            //decrement the available column spot
            availableCol += 1;
          }
        }
        newGrid.push(newRow);
      }
      //
      
      // once we have the new Grid we go on to merge from left to right
      const finalGrid = []
      for (let row = 0; row < rows; row++) {
        const newRow = new Array(cols)
          .fill(0)
          .map((_, col) => ({
            row: row, col: col, value: 0,
          }));
        let availableCol = 0;
        for(let col = 0; col < cols; col++) {
          if (col < cols - 1 && newGrid[row][col].value === newGrid[row][col + 1].value) {
            // that means we have to merge them both
            const newValue = newGrid[row][col].value + newGrid[row][col + 1].value
            newGrid[row][col + 1].value = 0;
            newRow[col].value = newValue;
          } else {
            newRow[col].value = newGrid[row][col].value;
          }
        }
        finalGrid.push(newRow);
      }
      
      this.spots = finalGrid;
    }
    
    
    generateRandomValue() {
      // from the origin grid create a new grid with a spot filled with the value
      // copy the original grid and add a new value to the grid
      const newGrid = [];
      let generated = false;
      let availableSpots = []
      for (let row = 0; row < rows; row++) {
        const newRow = []
        for (let col = 0; col < cols; col++) {
          if (this.spots[row][col].value === 0) {
            // that means this is the available row and col
            availableSpots.push([row, col]);
          }
          newRow.push({
            row: row, col: col, value: this.spots[row][col].value    
          });
        }
        newGrid.push(newRow);
      }
      
      // after copying and knowingt the available spots 
      
      if (availableSpots.length <= 0) {
        // that means there are no spots left
        console.log('game over');
        this.spots = newGrid;
        return;
      }
      
      // there are avaulable space then choose one randomly
      
      const choosenIndex = Math.floor(Math.random()  * availableSpots.length);
      const cRow = availableSpots[choosenIndex][0];
      const cCol = availableSpots[choosenIndex][1];
      newGrid[cRow][cCol].value = Math.random() < 0.5 ? 2 : 4;
      this.spots = newGrid;
      
    }
    
   
  }
  
  let grid;
  let opp = false;
  function setup() {
    grid = new Grid();
    
  }
  
  function draw() {
    for (let spot of chain(...grid.spots)) {
      context.save();
      context.translate((spot.col) * size, (spot.row) * size);
      context.beginPath();
      
      context.fillStyle = 'rgba(0, 0, 0, 0.4)';
      context.fillRect(0, 0, size - 5, size -5);
      
      context.fillStyle = 'rgba(255, 255, 255, 1)';
      context.font = '20px tahoma';
      if (spot.value !== 0) {
      context.fillText(spot.value , size / 2 - 10, size - size / 2 + 10);
      }
      
      
      context.closePath();
      context.restore();
    }
  }
  
  
  function onMouseDown() {
    grid.generateRandomValue();
    
  }
  
  function onKeyDown(e) {
    //37 38 39 40
    console.log(e.keyCode);
    if (e.keyCode === 39) {
      opp = false;
      grid.moveAllToRight();
      
    } else if (e.keyCode === 37) {
      opp = false
      grid.moveAllToLeft();
    } else if (e.keyCode === 38) {
      // move everything to up
      
     // grid.moveAllToRight();
      
      grid.moveAllToRight();
      opp = true;
      
    }
    
  }
  
  function _draw() {
    context.clearRect(0, 0, width, height);
    context.save();
    draw();
    context.restore();
    requestAnimationFrame(_draw);
  }
  
  setup();
  _draw();
  
  document.addEventListener('mousedown', onMouseDown)
  document.addEventListener('keydown', onKeyDown);
  
}
