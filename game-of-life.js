// lets make the game of life 

window.onload = function() {
  const canvas = document.getElementById('main');
  const context = canvas.getContext('2d');
  
  
  const width = canvas.width = window.innerWidth;
  const height = canvas.height = window.innerHeight;
  const size = 10;
  const rows = 60;
  const cols = 60;
  
  class Cell {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.isAlive = false;
    }
    
    show() {
      context.save();
      context.beginPath()
      context.translate(this.x * size, this.y * size);
      context.fillStyle = 'rgba(0, 0, 0, 0.4)'
      if (this.isAlive) {
        context.fillRect(0, 0, size - 2, size - 2);
      }
      
      
      context.closePath();
      context.restore();
    }
  }
  
  class Grid {
    constructor() {
      this.cells = new Array(cols)
        .fill(0)
        .map((_, col) => {
          return new Array(rows).fill(0)
          .map((_, row) => {
            return new Cell(row, col);
          })
      });
      
      // console.log(this.cells);
      
      
    }
    
   countAlive(row, col) {
      let total = 0;
      for( let i = -1; i < 2; i++) {
        for( let j = -1; j < 2; j++) {
          if (this.cells) {
            if (this.cells[(row + j + rows) % rows ][(col + i + cols) % cols].isAlive) {
            total += 1;
            }  
          }
          
        }
      }
     return total;
   }
    
    show() {
      for(let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
          let cell = this.cells[row][col];
          
          cell.show();
        }
        
      }
    }
    
    seed() {
      for(let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
          let cell = this.cells[row][col];
          
          cell.isAlive = Math.random() < 0.6;
        }
        
      }
    }
    
    generateNew() {
      // i have the old grid and i will construct the new grid accoding to old grid
      const newGrid = [];
      for (let col = 0; col < cols ; col++) {
        const newCol = [];
        for (let row = 0; row < rows; row++) {
            // only get the inner side
            // evert cell has 8 neighbors
            let alive = this.countAlive(row, col);
            let currentCell = this.cells[row][col];
            let newCell = new Cell(row, col);
            //newCell.isAlive = true;
            if(currentCell.isAlive) {
              alive = alive - 1;
            }
            
            if(currentCell.isAlive && (alive === 2 || alive  === 3) ) {    
              newCell.isAlive = true;
            } else if(currentCell.isAlive && (alive > 3 || alive < 2) ) {
            newCell.isAlive = false; 
            }else if(!currentCell.isAlive && alive === 3) {
              newCell.isAlive = true;
            } else {
              //get the old state
              newCell.isActive = currentCell.isActive || Math.random() < 0.1;
            }
          

          newCol.push(newCell);
        }
        newGrid.push(newCol);
    //  }
      

      //console.log(this.cells);
      }
       this.cells = newGrid;
    }
  }
  
  let grid;
  function setup() {
    grid = new Grid();
   grid.seed();

  }
  
  function draw() {
    //grid.generateNew();
    grid.show();
    grid.generateNew();
    
    
    //grid.generateNew();
  }
  
  function _draw() {
    context.clearRect(0, 0, width, height);
    context.save();
    draw()
    context.restore();
   
    requestAnimationFrame(_draw);
  }
  
 setup();
_draw()
  
  
}
