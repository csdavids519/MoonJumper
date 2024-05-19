//board
let board;
let boardWidth = 800;
let boardHeight = 500;
let boardFloor = boardHeight - 20;
let context;

// fuel level indicator properties
const fuelLevelWidth = 20;
const fuelLevelHeight = 100;
const fuelLevelX = 20;
const fuelLevelY = 200;
let fuelLevelCurrent = -100;

//space man const properties
const spaceManWidth = 60;
const spaceManHeight = 127;
const spaceManX = boardWidth / 10;
const spaceManY = boardFloor - spaceManHeight;

//lander properties
const landerWidth = 50;
const landerHeight = 60;
const landerX = boardWidth; // first position of the lander when created
const landerY = boardFloor - landerHeight;

let landerImage;

// debug
let debugArray = [];
let countUpdate = 0;

//jump objects array
let jumpObjectArray = [];

// space man object
let spaceMan = {
    x: spaceManX,
    y: spaceManY,
    width: spaceManWidth,
    height: spaceManHeight,
    onFloor: false
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
let gravity = .3;


// ON WINDOW LOAD
window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); // used to draw on the canvas
    requestAnimationFrame(update);
    setInterval(placeJumpObjects, 2500); // every 1.5 seconds call placeJumpObjects
    setInterval(manageJetPack, 1500); // add jet pack fuel every 500ms
    // setInterval(funDebugArray, 2000);
    document.addEventListener("keydown", jumpSpaceMan); // check for button press to move space man
    document.addEventListener("keydown", rocketSpaceMan);

    //load images
    spaceManImg = new Image();
    spaceManImg.src = "./spaceman.png";
    spaceManImg.onload = function () {
        context.drawImage(spaceManImg, spaceMan.x, spaceMan.y, spaceMan.width, spaceMan.height);
    }

}

// call animation frame to draw a rectangle to clear the previous frames
function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    // add gravity
    if (spaceMan.y < spaceManY) {
        velocityY = velocityY + gravity;
    }

    // set the new space man image on the update
    spaceMan.y = Math.max(0, spaceMan.y + velocityY); // stop space man from jumping over the board height
    spaceMan.y = Math.min(spaceManY, spaceMan.y); // stop space man from moving past the floor
    // context.fillRect(spaceMan.x, spaceMan.y, spaceMan.width, spaceMan.height);   -- old remove this when image is working
    context.drawImage(spaceManImg, spaceMan.x, spaceMan.y, spaceMan.width, spaceMan.height);

    // check if space man is on the floor to allow jumping
    if (spaceMan.y < (spaceManY - 10)) {
        spaceMan.onFloor = false;
    }

    if (spaceMan.y > (spaceManY - 10)) {
        spaceMan.onFloor = true;
    }

    // move objects each frame
    for (let i = 0; i < jumpObjectArray.length; i++) {
        let jumpObject = jumpObjectArray[i]; // pass all object properties of array to jumpObject
        jumpObject.x += velocityX;
        context.fillRect(jumpObject.x, lander.y, lander.width, lander.height);
    }

    // draw jet pack fuel level
    context.strokeRect(fuelLevelX, fuelLevelY, fuelLevelWidth, fuelLevelHeight);
    context.fillRect(fuelLevelX, fuelLevelY + fuelLevelHeight, fuelLevelWidth, fuelLevelCurrent);
}

// function to add fuel to jet pack
function manageJetPack() {
    if (fuelLevelCurrent <= 0 && fuelLevelCurrent > -100) {
        fuelLevelCurrent = fuelLevelCurrent - 5;
    }
    console.log(fuelLevelCurrent);
}

// function to create new objects to jump
function placeJumpObjects() {
    // create new object at starting position 
    let landerJumpObject = {
        x: landerX,
        y: landerY,
        width: landerWidth,
        height: landerHeight
    }
    jumpObjectArray.push(landerJumpObject);
}

let keypress; // log the key for debug
// add key stroke controls
function jumpSpaceMan(event) {
    if (event.code == "Space" && spaceMan.onFloor) {
        //jump
        velocityY = -10;
        keypress = 'Space'
    }
}

function rocketSpaceMan(event) {
    if (event.code == "ControlLeft" && fuelLevelCurrent < 0) {
        // rocket jump
        velocityY = -7;
        keypress = 'ControlLeft'
        console.log(fuelLevelCurrent);

        fuelLevelCurrent = Math.min(0, fuelLevelCurrent + 10);
    }
}

// function to manage the jet fuel usage of space man
// function jetFuel() {
//     let 

// }

// function funDebugArray() {
//     let debugArrayObject = {
//         x: spaceMan.x,
//         y: spaceMan.y,
//         veloY: velocityY,
//         g: gravity,
//         key: keypress,
//         onFloor: spaceMan.onFloor,
//         updatecnt: countUpdate
//     }


//     debugArray.push(debugArrayObject);
//     console.table(debugArray);
// }