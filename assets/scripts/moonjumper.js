//board
let board;
let boardWidth = window.innerWidth * 0.8;
let boardHeight = window.innerHeight * 0.8;
let boardFloor = boardHeight - 20;
let context;

// fuel level indicator properties
const fuelLevelWidth = 20;
const fuelLevelHeight = 100;
const fuelLevelX = 20;
const fuelLevelY = boardFloor - 100;
let fuelLevelCurrent = -100;

//space man const properties
const spaceManWidth = 60;
const spaceManHeight = 127;
const spaceManX = boardWidth / 10;
const spaceManY = boardFloor - spaceManHeight;
let spaceManImg;

//lander properties
const landerWidth = 208;
const landerHeight = 182;
const landerX = boardWidth;
const landerY = boardFloor - landerHeight;
let landerImg;

//rock small properties
const rockSmallWidth = 50;
const rockSmallHeight = 60;
const rockSmallX = boardWidth;
const rockSmallY = boardFloor - rockSmallHeight;
let rockSmallImg;

//rock large properties
const rockLargeWidth = 106;
const rockLargeHeight = 100;
const rockLargeX = boardWidth;
const rockLargeY = boardFloor - rockLargeHeight;
let rockLargeImg;

//jump objects array
let jumpObjectArray = [0];

//space man object
let spaceMan = {
    x: spaceManX,
    y: spaceManY,
    width: spaceManWidth,
    height: spaceManHeight,
    onFloor: false
};

let score = 0;
let scoreLast = 0;

// physics
let velocityX = -2; // jumping objects moving left speed
let velocityY = 0; // spaceman jump speed
let gravity = 0.3;


// ON WINDOW LOAD
window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); // used to draw on the canvas
    requestAnimationFrame(update);
    setInterval(manageJetPack, 1500); // add jet pack fuel every 500ms
    document.addEventListener("keydown", jumpSpaceMan); // check for button press to move space man
    document.addEventListener("keydown", rocketSpaceMan);

    //load images
    spaceManImg = new Image();
    spaceManImg.src = "./assets/images/spaceman.png";
    spaceManImg.onload = function () {
        context.drawImage(spaceManImg, spaceMan.x, spaceMan.y, spaceMan.width, spaceMan.height);
    };

    rockSmallImg = new Image();
    rockSmallImg.src = "./assets/images/rock_small.png";

    rockLargeImg = new Image();
    rockLargeImg.src = "./assets/images/rock_large.png";

    landerImg = new Image();
    landerImg.src = "./assets/images/lander_small.png";
};


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
    context.drawImage(spaceManImg, spaceMan.x, spaceMan.y, spaceMan.width, spaceMan.height);

    // check if space man is on the floor to allow jumping
    if (spaceMan.y < (spaceManY - 10)) {
        spaceMan.onFloor = false;
    } else if (spaceMan.y > (spaceManY - 10)) {
        spaceMan.onFloor = true;
    }

    // move objects each frame
    for (let i = 0; i < jumpObjectArray.length; i++) {
        let jumpObjectCurrent = jumpObjectArray[i]; // pass all object properties of array to jumpObject
        jumpObjectCurrent.x += velocityX;

        if (jumpObjectCurrent.objectNumber == 0) {
            //small rock
            context.drawImage(rockSmallImg, jumpObjectCurrent.x, jumpObjectCurrent.y, jumpObjectCurrent.width, jumpObjectCurrent.height);
            // calc score
            if (!jumpObjectCurrent.passed && spaceMan.x > jumpObjectCurrent.x + jumpObjectCurrent.width) {
                score += 1;
                jumpObjectCurrent.passed = true;
            }

        } else if (jumpObjectCurrent.objectNumber == 1) {
            //large rock
            context.drawImage(rockLargeImg, jumpObjectCurrent.x, jumpObjectCurrent.y, jumpObjectCurrent.width, jumpObjectCurrent.height);
            // calc score
            if (!jumpObjectCurrent.passed && spaceMan.x > jumpObjectCurrent.x + jumpObjectCurrent.width) {
                score += 5;
                jumpObjectCurrent.passed = true;
            }
        } else if (jumpObjectCurrent.objectNumber == 2) {
            //lander 
            context.drawImage(landerImg, jumpObjectCurrent.x, jumpObjectCurrent.y, jumpObjectCurrent.width, jumpObjectCurrent.height);
            // calc score
            if (!jumpObjectCurrent.passed && spaceMan.x > jumpObjectCurrent.x + jumpObjectCurrent.width) {
                score += 10;
                jumpObjectCurrent.passed = true;
            }
        }

        if (detectCollision(spaceMan, jumpObjectCurrent)) {
            // gameOver = true;
            console.log("collision!!")
        }
    }

    // draw jet pack fuel level
    if (fuelLevelCurrent >= -30) {
        context.fillStyle = "yellow";
    } else {
        context.fillStyle = "green";
    }
    context.strokeRect(fuelLevelX, fuelLevelY, fuelLevelWidth, fuelLevelHeight);
    context.fillRect(fuelLevelX, fuelLevelY + fuelLevelHeight, fuelLevelWidth, fuelLevelCurrent);

    // call place new objects
    placeJumpObjects();

    // code copy
    //clear jumpObjects
    while (jumpObjectArray.length > 0 && jumpObjectArray[0].x < -jumpObjectArray[0].x) {
        jumpObjectArray.shift(); //removes first element from the array
    }

    //code copy - edit
    //score
    if (scoreLast !== score && score > 0) {
        scoreLast = score;
        context.fillStyle = "LawnGreen";
        context.font = "100px sans-serif";
        context.fillText(("+ ", score), 50, 100);

    } else {
        context.fillStyle = "white";
        context.font = "45px sans-serif";
        context.fillText(score, 5, 45);
    }
}



// function to add fuel to jet pack
function manageJetPack() {
    if (fuelLevelCurrent <= 0 && fuelLevelCurrent > -100) {
        fuelLevelCurrent = fuelLevelCurrent - 5;
    }
}

// function to create new objects to jump
function placeJumpObjects() {
    let jumpGapFactorScore;
    let jumpObjectNum;
    let jumpObjectGap;
    let jumpObjectGapMin = boardWidth - 100;
    let jumpObject = {
        objectNumber: 0,
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        passed: false,
        debugJumpGap: 0, //DEBUG -REMOVE
        debugJumpRan: 0,
        debugJumpGapFactor: 0
    };

    // modify jump gap based on player score 
    //value of boardWidth/1 = very easy, value of boardWidth/1000 = very hard
    if (score < 10) {
        jumpGapFactorScore = boardWidth / 5;
    } else if (score < 100) {
        jumpGapFactorScore = boardWidth / 10;
    } else if (score < 200) {
        jumpGapFactorScore = boardWidth / 50;
    } else if (score < 500) {
        jumpGapFactorScore = boardWidth / 100;
    } else if (score < 5000) {
        jumpGapFactorScore = boardWidth / 500;
    }

    // test git push and fetch


    // pick jump object at random 0,1,2 possible
    function randomJumpObjects() {
        return Math.floor(Math.random() * 3);
    }

    // make object gap random
    function randomJumpGap() {
        return Math.floor(Math.random() * boardWidth / 2) + jumpGapFactorScore;
    }

    let jumprand = randomJumpGap()
    jumpObjectGap = jumpObjectGapMin - jumprand;
    jumpObjectNum = randomJumpObjects();


    // check if array is empty
    let firstJumpObject = false;
    if (jumpObjectArray == 0) {
        firstJumpObject = true;
    }

    // always load small rock to start jump array
    if (firstJumpObject) {
        jumpObject.objectNumber = 0;
        jumpObject.x = rockSmallX;
        jumpObject.y = rockSmallY;
        jumpObject.width = rockSmallWidth;
        jumpObject.height = rockSmallHeight;

        jumpObjectArray.push(jumpObject);
        console.table(jumpObjectArray);
    }

    // check last jump object has passed gap distance
    if ((jumpObjectArray[jumpObjectArray.length - 1].x + jumpObjectArray[jumpObjectArray.length - 1].width) < jumpObjectGap) {
        // create new object at starting position 
        if (jumpObjectNum == 0) {
            // small rock
            jumpObject.objectNumber = jumpObjectNum;
            jumpObject.x = rockSmallX;
            jumpObject.y = rockSmallY;
            jumpObject.width = rockSmallWidth;
            jumpObject.height = rockSmallHeight;
        } else if (jumpObjectNum == 1) {
            // large rock
            jumpObject.objectNumber = jumpObjectNum;
            jumpObject.x = rockLargeX;
            jumpObject.y = rockLargeY;
            jumpObject.width = rockLargeWidth;
            jumpObject.height = rockLargeHeight;
        } else if (jumpObjectNum == 2) {
            // lander small
            jumpObject.objectNumber = jumpObjectNum;
            jumpObject.x = landerX;
            jumpObject.y = landerY;
            jumpObject.width = landerWidth;
            jumpObject.height = landerHeight;
        }
        jumpObject.debugJumpGap = jumpObjectGap;
        jumpObject.debugJumpRan = jumprand;
        jumpObject.debugJumpGapFactor = jumpGapFactorScore;

        jumpObjectArray.push(jumpObject);
        console.table(jumpObjectArray);
    }
}

// add key stroke controls
function jumpSpaceMan(event) {
    if (event.code == "Space" && spaceMan.onFloor) {
        //jump
        velocityY = -10;
    }
}

function rocketSpaceMan(event) {
    if (event.code == "ControlLeft" && fuelLevelCurrent < 0) {
        // rocket jump
        velocityY = -7;
        keypress = 'ControlLeft';

        fuelLevelCurrent = Math.min(0, fuelLevelCurrent + 10);
    }
}

// code copy ImKennyYip
function detectCollision(a, b) {
    return a.x < b.x + b.width && //a's top left corner doesn't reach b's top right corner
        a.x + a.width > b.x && //a's top right corner passes b's top left corner
        a.y < b.y + b.height && //a's top left corner doesn't reach b's bottom left corner
        a.y + a.height > b.y; //a's bottom left corner passes b's top left corner
}