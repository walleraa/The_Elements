// [top, left, starting direction, type]
let levelEnemies = [];
function getEnemies() {
    enemies1();
    enemies2();
    enemies3();
    return levelEnemies;
}//end getEnemies

function enemies1() {
    levelEnemies.push([]);
}//end enemies1

function enemies2() {
    levelEnemies.push([]);
}//end enemies2

function enemies3() {
    levelEnemies.push([[0, 0, 0, 0], [80, 60, 0, 0], [40, 84, 0, 1]]);
}//end enemies3