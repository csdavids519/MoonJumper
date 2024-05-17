//board
let board;
let boardWidth = 800;
let boardHeight = 650;
let boardFloor = boardHeight - 20;
let context;


//space man const properties
const spaceManWidth = 35;
const spaceManHeight = 40;
const spaceManX = boardWidth / 7;
const spaceManY = boardFloor - spaceManHeight;

//lander properties
const landerWidth = 100;
const landerHeight = 60;
const landerX = boardWidth; // first position of the lander when created
const landerY = boardFloor - landerHeight;

let landerImage;


//jump objects array
let jumpObjectArray = [];


// space man object
let spaceMan = {
    x: spaceManX,
    y: spaceManY,
    width: spaceManWidth,
    height: spaceManHeight
}


//object lander
let lander = {
    x: landerX,
    y: landerY,
    width: landerWidth,
    height: landerHeight
}

// physics
let velocityX = -2; // jumping objects moving left speed
let velocityY = 0; // spaceman jump speed
let gravity;


// ON WINDOW LOAD
window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); // used to draw on the canvas
    requestAnimationFrame(update);
    setInterval(placeJumpObjects, 1500); // every 1.5 seconds call placeJumpObjects
    document.addEventListener("keydown", jumpSpaceMan); // check for button press to move space man
    // document.addEventListener("keydown", rocketSpaceMan);
    // document.addEventListener("keyup", endRocketSpaceMan);
}


// call animation frame to draw a rectangle to clear the previous frames
function update() { // this created the function "update"
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);


    // add gravity
    if (spaceMan.y < spaceManY - 20) {
        gravity = 0.5;
    } else {
        gravity = 0;
    }
    velocityY += gravity;
    spaceMan.y += velocityY;
    // context.fillRect(bird.x, bird.y, bird.width, bird.height); // after the canvas is clear, draw the fish bird again with
    context.fillRect(spaceMan.x, spaceMan.y, spaceMan.width, spaceMan.height);

    // move objects each frame
    for (let i = 0; i < jumpObjectArray.length; i++) {
        let jumpObject = jumpObjectArray[i]; // pass all object properties of array to jumpObject
        jumpObject.x += velocityX;
        context.fillRect(jumpObject.x, lander.y, lander.width, lander.height);
    }

}

// function to create new objects to jump
function placeJumpObjects() {

    // let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    // let openingSpace = board.height/4;

    // create new object at starting position 
    let landerJumpObject = {
        x: landerX,
        y: landerY,
        width: landerWidth,
        height: landerHeight
    }

    jumpObjectArray.push(landerJumpObject);

}

// add key stroke controls
function jumpSpaceMan(event) {
    if (event.code == "Space") {
        //jump
        velocityY = -1;
    }

    if (event.code == "ShiftRight" || "ShiftLeft") {
        // rocket jump
        velocityY = -1;
    }
}