const character = document.querySelector("#character");
const boundary = document.querySelector("#game");
const portal = document.querySelector("#portal");
const height = boundary.offsetHeight;
const width = boundary.offsetWidth;
const charHeight = character.offsetHeight;
const charWidth = character.offsetWidth;
let paceY = 0;
let paceX = 0;
const percentY = height/100;
const percentX = width/100; 
// [top, left]
const starts = [[90, 5], [1, 1]];
// [top, left]
const finish = [[50, 50],[1, 95]];
// [width, height, top, left]
// const levels = [[[5, 35, 35, 40], [13, 3, 80, 67]], [[85, 85, 6, 6]]];
const levelBlocks = getBlocks();

let curLevel = 0;

let curPosLeft = starts[curLevel][1];
let curPosTop = starts[curLevel][0];

function main() {
    console.log(localStorage.getItem("level"));
    loadLevel();
    step();
    addChar(curLevel);
    addBlocks(curLevel);
    addFinish(curLevel);
    keystrokes();
    console.log(height);
    console.log(width);
}//end main

function loadLevel() {
    let level = localStorage.getItem("level");
    if (level) {
        curLevel = level;
    }
    else {
        console.log("No previous progression to load!");
    }
}//end loadLevel

function step() {
    //This function is to calculate the percentage to know how far to move
    const pace = 2; //Calculating for 1%
    paceY = percentY * pace;
    paceX = percentX * pace;
}//end step

function keystrokes() {
    document.addEventListener("keydown", 
        (event) => {
        if(event.key === "a" || event.key === "ArrowLeft") {
            move("left");
        }//LEFT
        else if (event.key === "w" || event.key === "ArrowUp") {
            move("up");
        }//UP
        else if (event.key === "d" || event.key === "ArrowRight") {
            move("right");
        }//RIGHT
        else if (event.key === "s" || event.key === "ArrowDown") {
            move("down");
        }//DOWN
        else if (event.key === " ") {
            trigger();
        }//ENTER
        else if (event.key === "u") {
            localStorage.removeItem("level");
            location.reload();
        }//Right now this just exists to make testing easier
    });
}//end keystrokes

function move(direction) {
    curPosLeft = character.offsetLeft;
    curPosTop = character.offsetTop;
    let step = 0;
    switch(direction) {
        case "left":
            step = curPosLeft - paceX;
            // if (step >= 0)
            //     character.style.left = step + 'px';
            if (checkLeft(step, curPosTop, curLevel))
                character.style.left = step + 'px';
            // else
            //     console.log("BLOCKED");
            //     character.style.left = '0px';
            break;


        case "up":
            step = curPosTop - paceY;
            if (checkUp(step, curPosLeft, curLevel))
                character.style.top = step + 'px';
            // else
            //     character.style.top = '0px';
            break;


        case "right":
            step = curPosLeft + paceX;
            if (checkRight(step, curPosTop, curLevel))
                character.style.left = step + 'px';
            // else
            //     character.style.left = (width - charWidth) + 'px';
            break;


        case "down":
            step = curPosTop + paceY;
            if (checkDown(step, curPosLeft, curLevel))
                character.style.top = step + 'px';
            // else
            //     character.style.top = (height - charHeight) + 'px';
            break;


    }//end switch
}//end move

function trigger() {
    const top = portal.offsetTop;
    const bottom = top + portal.offsetHeight;
    const left = portal.offsetLeft;
    const right = left + portal.offsetWidth;
    if (curPosTop >= top && curPosTop <= bottom && curPosLeft >= left && curPosLeft <= right) {
        if (parseInt(curLevel) === levelBlocks.length - 1) {
            console.log("No more levels at the moment!");
        }//end if
        else {
            curLevel += 1;
            localStorage.removeItem("level"); //Have to remove then set or else it gets funky for some reason
            localStorage.setItem("level", curLevel);
            location.reload();
        }//end else
    }//end if
}//end trigger

function addChar(level) {
    character.style.top = starts[level][0] + '%';
    character.style.left = starts[level][1] + '%';
}//end addChar

function addBlocks(level) {
    let info = [];
    let style = "";
    let blocks = levelBlocks[level];
    for (let i = 0; i < blocks.length; ++i) {
        info = blocks[i];
        style = "width:" + info[0] + "%; height:" + info[1] + "%; ";
        style += "top: " + info[2] + "%; left:" + info[3] + "%; ";
        boundary.insertAdjacentHTML('beforeend', 
            '<div id="block" style="'+style+'background-color:red; position: absolute;"></div>'
        );
    }//end for
}//end addBlocks

function addFinish(level) {
    portal.style.top = finish[level][0] + '%';
    portal.style.left = finish[level][1] + '%';
}//end addFinish

main();