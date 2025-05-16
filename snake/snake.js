// snake.js
// iteration 2

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// settings
const gridSize = 10; // size of each cell
const tileCount = 40; // 400/10 = 40 tiles per row/column

// velocity 
let velocityX = 0;
let velocityY = 0;

// Snake body (array of x, y objects)
let snakeBody = [
    {x:10, y: 10} // initial position, near the center
];

// Initial position of the food
let food = {x: 5, y: 10};

// let speed = 2; // move 20px every frame 

// Game loop runs 5 times per second 
setInterval(game, 200);

// Key listener
document.addEventListener('keydown', keyDown);

function game(){
    // Update snake's head based on velocity
    let headX = snakeBody[0].x + velocityX;
    let headY = snakeBody[0].y + velocityY;

    // Wrap around if outside boundaries
    if(headX < 0){
        headX = tileCount - 1;
    }
    if(headX > tileCount - 1){
        headX = 0;
    }
    if(headY < 0){
        headY = tileCount - 1;
    }

    if(headY > tileCount - 1){
        headY = 0;
    }

    // Add the new head to the front of snakeBody
    snakeBody.unshift({x:headX, y:headY});

    // if snake eats the food, don't remove the tail
    if(headX === food.x && headY === food.y){
        // Reposition the food 
        food.x = Math.floor(Math.random()*tileCount);
        food.y = Math.floor(Math.random()*tileCount);
    } else {
        snakeBody.pop();
    }

    // Draw everything 
    drawGame();
}

function drawGame(){
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize,
        gridSize, gridSize);
    
    // Draw Snake
    ctx.fillStyle = 'green';
    snakeBody.forEach(segment => {
        ctx.fillRect(segment.x*gridSize, segment.y * gridSize,
            gridSize, gridSize);
    });
}

function keyDown(e){
    switch(e.key){
        case 'ArrowLeft':
            // Prevent reversing directly
            if(velocityX !== 1){
                velocityX = -1;
                velocityY = 0;
            }
            break; 
        
        case 'ArrowRight':
            if(velocityX !== -1){
                velocityX = 1;
                velocityY = 0;
            }
            break; 
        
        case 'ArrowUp':
            if(velocityY !== 1){
                velocityX = 0;
                velocityY = -1;
            }
            break; 
        
        case 'ArrowDown':
            if(velocityY !== -1){
                velocityX = 0;
                velocityY = 1;
            }
            break;

        case 'Escape':
            velocityX = 0;
            velocityY = 0;
            break; 
    }
}
