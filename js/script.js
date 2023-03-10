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
const starts = getStarts();
const finish = getFinishes();
const blockInfo = getBlocks();
const enemyInfo = getEnemies();

let curLevel = 0;
// console.log(starts);
let curPosLeft = starts[curLevel][1];
let curPosTop = starts[curLevel][0];

function main() {
    // localStorage.removeItem("level");
    console.log(localStorage.getItem("level"));
    loadLevel();
    step();
    addChar(curLevel);
    addBlocks(curLevel);
    addFinish(curLevel);
    addEnemies(curLevel);
    addItems(curLevel);
    keystrokes();
    console.log(height);
    console.log(width);
}//end main

function loadLevel() {
    let level = localStorage.getItem("level");
    if (level) {
        curLevel = parseInt(level);
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
            trigger(curLevel);
        }//ENTER
        else if (event.key === "u") {
            localStorage.removeItem("level");
            curLevel -= 1;
            if (curLevel < 0)
                curLevel = 0;
            localStorage.setItem("level", curLevel);
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
    curPosLeft = character.offsetLeft;
    curPosTop = character.offsetTop;
    if (!checkEnemies(curPosTop, curPosLeft, curLevel)) {
        location.reload();
    }//end if to reload the page in the occurence of a game over
}//end move

function trigger(level) {
    const top = portal.offsetTop;
    const bottom = top + portal.offsetHeight;
    const left = portal.offsetLeft;
    const right = left + portal.offsetWidth;
    const curPosBottom = curPosTop + charHeight;
    const curPosRight = curPosLeft + charWidth;
    if ((curPosTop <= top && curPosBottom >= top) || (curPosTop <= bottom && curPosBottom >= bottom)) {
        if ((curPosLeft <= left && curPosRight >= left) || (curPosLeft <= right && curPosRight >= right)) {
            if (curLevel === blockInfo.length - 1) {
                console.log("No more levels at the moment!");
            }//end if
            else {
                curLevel += 1;
                localStorage.removeItem("level"); //Have to remove then set or else it gets funky for some reason
                localStorage.setItem("level", curLevel);
                location.reload();
            }//end else
        }//end if
    }//end if
    else {
        switch(level) {
            case 4:
                const itemTop = 15 * percentY;
                const itemBottom = itemTop + 3 * percentY;
                const itemLeft = 85 * percentX;
                const itemRight = itemLeft + 3 * percentX;
                
                if ((curPosTop <= itemTop && curPosBottom >= itemTop) || (curPosTop <= itemBottom && curPosBottom >= itemBottom)) {
                    if ((curPosLeft <= itemLeft && curPosRight >= itemLeft) || (curPosLeft <= itemRight && curPosRight >= itemRight))
                        console.log("Item picked up");
                }//end if
        }//end switch
    }//end else
}//end trigger

function addChar(level) {
    character.style.top = starts[level][0] + '%';
    character.style.left = starts[level][1] + '%';
}//end addChar

function addBlocks(level) {
    let info = [];
    let style = "";
    let blocks = blockInfo[level];
    for (let i = 0; i < blocks.length; ++i) {
        info = blocks[i];
        style = "width:" + info[0] + "%; height:" + info[1] + "%; ";
        style += "top: " + info[2] + "%; left:" + info[3] + "%; ";
        boundary.insertAdjacentHTML('beforeend', 
            '<div id="block" style="'+style+'background-color:red; position: absolute;"></div>'
        );
    }//end for
}//end addBlocks

function addEnemies(level) {
    let info = [];
    let style = "";
    let type = "";
    let id = "";
    let enemies = enemyInfo[level];
    for (let i = 0; i < enemies.length; ++i) {
        info = enemies[i];
        style = "top:" + info[0] + "%; left:" + info[1] + "%; ";

        switch(info[3]) {
            case 0:
                type = "width: 3%; height:8%; background-color:orange; position: absolute;";
                break;
            case 1:
                type = "width: 3%; height: 8%; background-color:grey; position: absolute;";
                break;
            case 2:
                type = "width: 5%; height: 8%; background-color: magenta; position: absolute;";
                type += '"></div><div id="sight" style="width: 2%; height: 8%; ';
                type += 'top:'+info[0]+"%; left:" + info[1]+"%; ";
                type += "background-color: #FFD700; position: absolute";
                break;
            case 3:
                type = "width: 3%; height: 8%; background-color: darkblue; position:absolute;";
                id = ' class="patroller"';
                enemyInfo[level][i].push(setInterval(updateEnemy, 1000, info[2], i, 1, level, 1000, info[3]));
                break;
            case 4:
                type = "width: 3%; height: 8%; background-color: purple; position:absolute;";
                id = ' class="stroller"';
                enemyInfo[level][i].push(setInterval(updateEnemy, 500, info[2], i, 1, level, 500, info[3]));
                break;
        }//end switch

        boundary.insertAdjacentHTML('beforeend', 
            '<div id='+i+' style="'+style+type+'"'+id+'></div>'
        ); 
    }//end for
}//end addEnemies

function updateEnemy(direction, id, pace, level, duration, type) {
    let enemy = document.getElementById(id);
    let step = 0;
    switch(direction) {
        case 0: // case to go up
            step = enemy.offsetTop - pace * percentY;
            if (checkUp(step, enemy.offsetLeft, level)) {
                enemy.style.top = step + 'px';
                enemyInfo[level][id][0] -= pace;
            }//end if to see if we hit a wall
            else
                changeDirection(direction, id, pace, level, duration, type);
            break;
        case 1: // case to go left
            step = enemy.offsetLeft - pace * percentX;
            if (checkLeft(step, enemy.offsetTop, level)) {
                enemy.style.left = step + 'px';
                enemyInfo[level][id][1] -= pace;
            }//end if
            else
                changeDirection(direction, id, pace, level, duration, type);
            break;
        case 2: // case to go down
            step = enemy.offsetTop + pace * percentY;
            if (checkDown(step, enemy.offsetLeft, level)) {
                enemy.style.top = step + 'px';
                enemyInfo[level][id][0] += pace;
            }//end if
            else
                changeDirection(direction, id, pace, level, duration, type);
            break;
        case 3: // case to go right
            step = enemy.offsetLeft + pace * percentX;
            if (checkRight(step, enemy.offsetTop, level)) {
                enemy.style.left = step + 'px';
                enemyInfo[level][id][1] += pace;
            }//end if
            else
                changeDirection(direction, id, pace, level, duration, type);
            break;
    }//end switch
    if (!checkEnemies(character.offsetTop, character.offsetLeft, level)) {
        clearInterval(enemyInfo[level][id][4]); 
        /*  
            clearInterval prevents the enemy running through you after game over 
            and causing a bunch of game over alerts
        */
        location.reload();
    }//end if to reload the page in the occurence of a game over
}//end updateEnemy

function changeDirection(direction, id, pace, level, duration, type) {
    clearInterval(enemyInfo[level][id][4]); 
    let newDir = 0;
    let intervalId = 0;
    switch(type) {
        case 3:
            newDir = (direction + 2) % 4;
            intervalId = setInterval(updateEnemy, duration, newDir, id, pace, level, duration, type);
            break;
        case 4:
            newDir = (direction + 1) % 4;
            intervalId = setInterval(updateEnemy, duration, newDir, id, pace, level, duration, type);
            break;
    }//end switch
    enemyInfo[level][id][4] = intervalId;
}//end changeDirection

function addItems(level) {
    let item = "";
    switch(level) {
        case 4:
            item = '<div style="width: 3%; height: 3%; background-color: black; position:absolute;';
            item += 'top: 15%; left: 85%"></div>';
    }//end switch
    boundary.insertAdjacentHTML('beforeend', item);
}//end addItems

function addFinish(level) {
    portal.style.top = finish[level][0] + '%';
    portal.style.left = finish[level][1] + '%';
}//end addFinish


main();