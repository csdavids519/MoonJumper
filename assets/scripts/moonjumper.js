//board
let board;
let boardWidth = window.innerWidth * 0.8;
let boardHeight = window.innerHeight * 0.8;
let boardFloor = boardHeight - 20;
let context;
let mobileJumpButton;
let mobileJetPackButton;

// fuel level indicator properties
const fuelLevelWidth = 20;
const fuelLevelHeight = 100;
const fuelLevelX = 20;
const fuelLevelY = boardFloor - 100;
let fuelLevelCurrent = -100;

//space man properties
const spaceManWidth = 60;
const spaceManHeight = 127;
const spaceManX = boardWidth / 10;
const spaceManY = boardFloor - spaceManHeight;
let spaceManImg;

//rock small properties
const rockSmallWidth = 50;
const rockSmallHeight = 60;
const rockSmallX = boardWidth;
const rockSmallY = boardFloor - rockSmallHeight;
const rockSmallCollisionBuffer = rockSmallWidth / 4;
let rockSmallImg;

//rock large properties
const rockLargeWidth = 106;
const rockLargeHeight = 100;
const rockLargeX = boardWidth;
const rockLargeY = boardFloor - rockLargeHeight;
const rockLargeCollisionBuffer = rockLargeWidth / 4;
let rockLargeImg;

//lander properties
const landerWidth = 208;
const landerHeight = 182;
const landerX = boardWidth;
const landerY = boardFloor - landerHeight;
const landerCollisionBuffer = landerWidth / 4;
let landerImg;

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

// Game functions
let score = 0;
let scoreLast = 0;
let gameOver = false;

// physics
let velocityX = -2; // jumping objects moving left speed
let velocityY = 0; // spaceman jump speed - written by keypress event
let gravity = 0.3;

/************************************************
 * ON WINDOW LOAD
 ************************************************/
window.onload = function () {
    board = document.getElementById("board");
    mobileJumpButton = document.getElementById("mobileJumpButton");
    mobileJetPackButton = document.getElementById("mobileJetPackButton");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); // used to draw on the canvas
    requestAnimationFrame(update);
    setInterval(manageJetPack, 1500); // add jet pack fuel every 500ms
    document.addEventListener("keydown", jumpSpaceMan); // check for button press to move space man
    document.addEventListener("keydown", jetPackSpaceMan);
    mobileJumpButton.addEventListener("click", jumpSpaceMan);
    mobileJetPackButton.addEventListener("click", jetPackSpaceMan);

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

/************************************************
 *  UPDATE SCREEN 
 ************************************************/
// call animation frame to draw a rectangle to clear the previous frames
function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
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
            gameOver = true;
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

    //clear jumpObjects
    while (jumpObjectArray.length > 2 && (jumpObjectArray[1].x < 0)) {
        jumpObjectArray.shift(); //removes first element from the array
    }

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

    if (gameOver) {
        context.fillStyle = "black";
        context.fillRect(0, 0, boardWidth, boardHeight / 2);
        context.fillStyle = "white";
        context.font = "30px sans-serif";
        context.fillText("GAME OVER", 10, 100);
        context.font = "30px sans-serif";
        context.fillText("SCORE: " + score, 10, 150);
        context.font = "30px sans-serif";
        context.fillText("Jump to retry!", 10, 200);
    }
}

// function to add fuel to jet pack
function manageJetPack() {
    if (fuelLevelCurrent <= 0 && fuelLevelCurrent > -100) {
        fuelLevelCurrent = fuelLevelCurrent - 10;
    }
}

/************************************************
 * PLACE NEW JUMP OBJECTS
 ************************************************/
// function to create new objects to jump
function placeJumpObjects() {
    if (gameOver) {
        return;
    }

    let jumpGapFactorScore;
    let jumpObjectNum;
    let jumpObjectGap;
    let jumpObjectGapMin = boardWidth - 100;
    let jumpObject = {
        objectNumber: 0,
        collisionBuffer: 0,
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        passed: false,
    };

    // modify jump gap based on player score 
    //value of boardWidth/1 = very easy, value of boardWidth/1000 = very hard
    context.fillStyle = "white";
    context.font = "45px sans-serif";
    if (score < 10) {
        context.fillText("Level 1", boardWidth / 2, 45);
        jumpGapFactorScore = boardWidth / 5;
    } else if (score < 100) {
        context.fillText("Level 2", boardWidth / 2, 45);
        jumpGapFactorScore = boardWidth / 10;
    } else if (score < 200) {
        context.fillText("Level 3", boardWidth / 2, 45);
        jumpGapFactorScore = boardWidth / 50;
    } else if (score < 500) {
        context.fillText("Level 4", boardWidth / 2, 45);
        jumpGapFactorScore = boardWidth / 100;
    } else if (score < 1000) {
        context.fillText("Level 5", boardWidth / 2, 45);
        jumpGapFactorScore = boardWidth / 500;
    } else {
        context.fillText("Level 6", boardWidth / 2, 45);
        jumpGapFactorScore = boardWidth / 1000;
    }

    // pick jump object at random 0,1,2 possible
    function randomJumpObjects() {
        return Math.floor(Math.random() * 3);
    }

    // make object gap random
    function randomJumpGap() {
        return Math.floor(Math.random() * boardWidth / 2) + jumpGapFactorScore;
    }

    let jumprand = randomJumpGap();
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
        jumpObject.collisionBuffer = rockSmallCollisionBuffer;
        jumpObject.x = rockSmallX;
        jumpObject.y = rockSmallY;
        jumpObject.width = rockSmallWidth;
        jumpObject.height = rockSmallHeight;

        //push to array
        jumpObjectArray.push(jumpObject);
    }

    /**********************************
     * LOAD NEW JUMP OBJECT TO ARRAY
     **********************************/
    // check last jump object has passed gap distance
    if ((jumpObjectArray[jumpObjectArray.length - 1].x + jumpObjectArray[jumpObjectArray.length - 1].width) < jumpObjectGap) {
        // create new object at starting position 
        if (jumpObjectNum == 0) {
            // small rock
            jumpObject.objectNumber = jumpObjectNum;
            jumpObject.collisionBuffer = rockSmallCollisionBuffer;
            jumpObject.x = rockSmallX;
            jumpObject.y = rockSmallY;
            jumpObject.width = rockSmallWidth;
            jumpObject.height = rockSmallHeight;
        } else if (jumpObjectNum == 1) {
            // large rock
            jumpObject.objectNumber = jumpObjectNum;
            jumpObject.collisionBuffer = rockLargeCollisionBuffer;
            jumpObject.x = rockLargeX;
            jumpObject.y = rockLargeY;
            jumpObject.width = rockLargeWidth;
            jumpObject.height = rockLargeHeight;
        } else if (jumpObjectNum == 2) {
            // lander small
            jumpObject.objectNumber = jumpObjectNum;
            jumpObject.collisionBuffer = landerCollisionBuffer;
            jumpObject.x = landerX;
            jumpObject.y = landerY;
            jumpObject.width = landerWidth;
            jumpObject.height = landerHeight;
        }

        //push to array
        jumpObjectArray.push(jumpObject);
    }
}

/************************************************
 * MANAGE KEY PRESS EVENT
 ************************************************/
// add key stroke controls
function jumpSpaceMan(event) {
    if ((event.code == "Space" || event.type == "click") && spaceMan.onFloor) {
        //jump
        velocityY = -12;
    }

    //reset game
    if (gameOver) {
        spaceMan.y = spaceManY;
        jumpObjectArray = [];
        score = 0;
        fuelLevelCurrent = -100;
        gameOver = false;
    }
}

function jetPackSpaceMan(event) {
    if ((event.code == "ControlLeft" || event.type == "click") && fuelLevelCurrent < 0) {
        // rocket jump
        velocityY = -7;

        fuelLevelCurrent = Math.min(0, fuelLevelCurrent + 10);
    }
}

/************************************************
 * MANAGE OBJECT COLLISION
 ************************************************/
function detectCollision(a, b) {
    let c = (b.x + b.collisionBuffer); // c is b.x with collision buffer amount added 
    let d = (b.y + b.collisionBuffer); // d is b.y with collision buffer amount added
    let e = ((b.x + b.width) - b.collisionBuffer); // e is b.width less collision buffer amount

    return a.x < e && //a's top left corner doesn't reach b's top right corner
        a.x + a.width > c && //a's top right corner passes b's top left corner
        a.y < d + b.height && //a's top left corner doesn't reach b's bottom left corner
        a.y + a.height > d; //a's bottom left corner passes b's top left corner
}