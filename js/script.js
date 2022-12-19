const character = document.querySelector("#character");
const boundary = document.querySelector("#game");
const height = boundary.offsetHeight;
const width = boundary.offsetWidth;
const charHeight = character.offsetHeight;
const charWidth = character.offsetWidth;
let paceY = 0;
let paceX = 0;
const percentY = height/100;
const percentX = width/100; 
// const levels = []
// [width, height, top, left]
const blocks = [[5, 35, 35, 40], [13, 3, 80, 67]];

function main() {
    step();
    addBlocks();
    keystrokes();
    console.log(height);
    console.log(width);
}//end main

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
    });
}//end keystrokes

function move(direction) {
    const curPosLeft = character.offsetLeft;
    const curPosTop = character.offsetTop;
    let step = 0;
    switch(direction) {
        case "left":
            step = curPosLeft - paceX;
            // if (step >= 0)
            //     character.style.left = step + 'px';
            if (checkLeft(step, curPosTop))
                character.style.left = step + 'px';
            // else
            //     console.log("BLOCKED");
            //     character.style.left = '0px';
            break;


        case "up":
            step = curPosTop - paceY;
            if (checkUp(step, curPosLeft))
                character.style.top = step + 'px';
            // else
            //     character.style.top = '0px';
            break;


        case "right":
            step = curPosLeft + paceX;
            if (checkRight(step, curPosTop))
                character.style.left = step + 'px';
            // else
            //     character.style.left = (width - charWidth) + 'px';
            break;


        case "down":
            step = curPosTop + paceY;
            if (checkDown(step, curPosLeft))
                character.style.top = step + 'px';
            // else
            //     character.style.top = (height - charHeight) + 'px';
            break;


    }//end switch
}//end move

function addBlocks() {
    let info = [];
    let style = "";
    for (let i = 0; i < blocks.length; ++i) {
        info = blocks[i];
        style = "width:" + info[0] + "%; height:" + info[1] + "%; ";
        style += "top: " + info[2] + "%; left:" + info[3] + "%; ";
        boundary.insertAdjacentHTML('beforeend', 
            '<div id="block" style="'+style+'background-color:red; position: absolute;"></div>'
        );
    }//end for
}//end addBlocks

function checkLeft(step, top) {
    const bottom = top + charHeight;
    const right = step + charWidth;
    let limit = 0;
    let blockBottom = 0;
    let blockTop = 0;
    if (step < 0)
        return false;
    for (let i = 0; i < blocks.length; ++ i) {
        limit = blocks[i][3] + blocks[i][0];
        limit *= percentX;
        blockBottom = blocks[i][2] + blocks[i][1];
        blockBottom *= percentY;
        blockTop = blocks[i][2] * percentY;
        if (top <= blockBottom && bottom <= blockBottom && top >= blockTop && bottom >= blockTop)
            return step >= limit || right <= limit;
        else if (top <= blockBottom && bottom >= blockBottom)
            return step >= limit || right <= limit;
        else if (bottom >= blockTop && top <= blockTop)
            return step >= limit || right <= limit;
    }//end for
    return true;
}//end checkLeft

function checkRight(step, top) {
    const bottom = top + charHeight;
    const left = step;
    let limit = 0;
    let blockBottom = 0;
    let blockTop = 0;
    step = step + charWidth;
    if (step > width)
        return false;
    for (let i = 0; i < blocks.length; ++ i) {
        limit = blocks[i][3];
        limit *= percentX;
        blockBottom = blocks[i][2] + blocks[i][1];
        blockBottom *= percentY;
        blockTop = blocks[i][2] * percentY;
        if (top <= blockBottom && bottom <= blockBottom && top >= blockTop && bottom >= blockTop)
            return step <= limit || left >= limit;
        else if (top <= blockBottom && bottom >= blockBottom)
            return step <= limit || left >= limit;
        else if (bottom >= blockTop && top <= blockTop)
            return step <= limit || left >= limit;
    }//end for
    return true;
}//end checkRight

function checkUp (step, left) {
    const right = left + charWidth;
    const bottom = step + charHeight;
    let limit = 0;
    let blockRight = 0;
    let blockLeft = 0;
    if (step < 0)
        return false;
    for (let i = 0; i < blocks.length; ++ i) {
        limit = blocks[i][2] + blocks[i][1];
        limit *= percentY;
        blockRight = blocks[i][3] + blocks[i][0];
        blockRight *= percentX;
        blockLeft = blocks[i][3] * percentX;
        if (left <= blockRight && right <= blockRight && left >= blockLeft && right >= blockLeft)
            return step >= limit || bottom <= limit;
        else if (left <= blockRight && right >= blockRight)
            return step >= limit || bottom <= limit;
        else if (right >= blockLeft && left <= blockLeft)
            return step >= limit || bottom <= limit;
    }//end for
    return true;
}

function checkDown (step, left) {
    const right = left + charWidth;
    const top = step;
    let limit = 0;
    let blockRight = 0;
    let blockLeft = 0;
    step = step + charHeight;
    if (step > height)
        return false;
    for (let i = 0; i < blocks.length; ++ i) {
        limit = blocks[i][2];
        limit *= percentY;
        blockRight = blocks[i][3] + blocks[i][0];
        blockRight *= percentX;
        blockLeft = blocks[i][3] * percentX;
        if (left <= blockRight && right <= blockRight && left >= blockLeft && right >= blockLeft)
            return step <= limit || top >= limit;
        else if (left <= blockRight && right >= blockRight)
            return step <= limit || top >= limit;
        else if (right >= blockLeft && left <= blockLeft)
            return step <= limit || top >= limit;
    }//end for
    return true;
}

main();