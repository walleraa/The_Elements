const character = document.querySelector("#character");
const boundary = document.querySelector("#game");
const height = boundary.offsetHeight;
const width = boundary.offsetWidth;
const charHeight = character.offsetHeight;
const charWidth = character.offsetWidth;
let paceY = 0;
let paceX = 0;
// const levels = []
const blocks = [[5, 35, 35, 40]];

function main() {
    step();
    addBlocks();
    keystrokes();
}//end main

function step() {
    //This function is to calculate the percentage to know how far to move
    const pace = 2; //Calculating for 1%
    paceY = height/100 * pace;
    paceX = width/100 * pace;
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
            if (step >= 0)
                character.style.left = step + 'px';
            // else
            //     character.style.left = '0px';
            break;


        case "up":
            step = curPosTop - paceY;
            if (step >= 0)
                character.style.top = step + 'px';
            // else
            //     character.style.top = '0px';
            break;


        case "right":
            step = curPosLeft + paceX;
            if (step <= width - charWidth)
                character.style.left = step + 'px';
            // else
            //     character.style.left = (width - charWidth) + 'px';
            break;


        case "down":
            step = curPosTop + paceY;
            if (step <= height - charHeight)
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
        boundary.insertAdjacentHTML('beforeend', '<div id="block" style="'+style+'background-color:red; position: relative;"></div>');
        // boundary.innerHTML = blockHTML;
    }//end for
    keystrokes();
    // console.log(boundary);
}//end addBlocks

main();