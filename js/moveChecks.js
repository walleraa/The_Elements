function checkLeft(step, top, level) {
    let blocks = blockInfo[level];
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
        if ((blockTop <= top && blockBottom >= top) || (blockTop <= bottom && blockBottom >= bottom))
            if (!(step >= limit || right <= limit))
                return false;
    }//end for
    return true;
}//end checkLeft

function checkRight(step, top, level) {
    let blocks = blockInfo[level];
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
        if ((blockTop <= top && blockBottom >= top) || (blockTop <= bottom && blockBottom >= bottom))
            if (!(step <= limit || left >= limit))
                return false;
    }//end for
    return true;
}//end checkRight

function checkUp (step, left, level) {
    let blocks = blockInfo[level];
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
        if ((blockLeft <= left && blockRight >= left) || (blockLeft <= right && blockRight >= right))
            if (!(step >= limit || bottom <= limit))
                return false;
    }//end for
    return true;
}//end checkUp

function checkDown (step, left, level) {
    let blocks = blockInfo[level];
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
        if ((blockLeft <= left && blockRight >= left) || (blockLeft <= right && blockRight >= right))
            if (!(step <= limit || top >= limit))
                return false;
    }//end for
    return true;
}//end checkDown

function checkEnemies(top, left, level) {
    let enemies = enemyInfo[level];
    const bottom = top + charHeight;
    const right = left + charWidth;
    let enemyTop = 0;
    let enemyBottom = 0;
    let enemyLeft = 0;
    let enemyRight = 0;
    for (let i = 0; i < enemies.length; ++i) {
        enemyTop = enemies[i][0] * percentY;
        enemyLeft = enemies[i][1] * percentX;
        switch(enemies[i][3]) {
            case 0:
                enemyBottom = enemyTop + 8 * percentY;
                enemyRight = enemyLeft + 3 * percentX;
                break;
            case 1:
                enemyBottom = enemyTop + 8 * percentY;
                enemyRight = enemyLeft + 3 * percentX;
                break;
            case 2:
                enemyBottom = enemyTop + 8 * percentY;
                enemyRight = enemyLeft + 5 * percentX;
        }//end switch
        if ((enemyTop <= top && enemyBottom >= top) || (enemyTop <= bottom && enemyBottom >= bottom)) {
            if ((enemyLeft <= left && enemyRight >= left) || (enemyLeft <= right && enemyRight >= right)) {
                console.log("Killed by enemy of type " + enemies[i][3]);
                alert("GAME OVER");
                return false;
            }//end inner if
        }//end if
    }//end for
    return true;
}//end checkEnemies