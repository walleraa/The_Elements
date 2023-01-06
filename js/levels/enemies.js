// [top, left, starting direction, type]
levels = [];
function getEnemies() {
    level1();
    level2();
    level3();
    return levels;
}//end getEnemies

function level1() {
    levels.push([]);
}//end level1

function level2() {
    levels.push([]);
}//end level2

function level3() {
    levels.push([0, 0, 0, 0]);
}//end level3