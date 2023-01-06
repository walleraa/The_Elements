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
        if (top <= blockBottom && bottom <= blockBottom && top >= blockTop && bottom >= blockTop)
            return step >= limit || right <= limit;
        else if (top <= blockBottom && bottom >= blockBottom)
            return step >= limit || right <= limit;
        else if (bottom >= blockTop && top <= blockTop)
            return step >= limit || right <= limit;
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
        if (top <= blockBottom && bottom <= blockBottom && top >= blockTop && bottom >= blockTop)
            return step <= limit || left >= limit;
        else if (top <= blockBottom && bottom >= blockBottom)
            return step <= limit || left >= limit;
        else if (bottom >= blockTop && top <= blockTop)
            return step <= limit || left >= limit;
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
        if (left <= blockRight && right <= blockRight && left >= blockLeft && right >= blockLeft)
            return step >= limit || bottom <= limit;
        else if (left <= blockRight && right >= blockRight)
            return step >= limit || bottom <= limit;
        else if (right >= blockLeft && left <= blockLeft)
            return step >= limit || bottom <= limit;
    }//end for
    return true;
}

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
        if (left <= blockRight && right <= blockRight && left >= blockLeft && right >= blockLeft)
            return step <= limit || top >= limit;
        else if (left <= blockRight && right >= blockRight)
            return step <= limit || top >= limit;
        else if (right >= blockLeft && left <= blockLeft)
            return step <= limit || top >= limit;
    }//end for
    return true;
}