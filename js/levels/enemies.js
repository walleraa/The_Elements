/* 
    NOTE: Might implement an optimization where enemies_() function gets called
    in the add blocks and add enemies phase so it only holds the current level info
    in memory as opposed to all of the levels
*/
// [top, left, starting direction, type]
let levelEnemies = [];
function getEnemies() {
    enemies1();
    enemies2();
    enemies3();
    enemies4();
    enemies5();
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

function enemies4() {
    levelEnemies.push([[12, 83, 1, 2], [82, 47, 1, 3]]);
}//end enemies4

function enemies5() {
    levelEnemies.push([[5, 80, 1, 4]]);
}//end enemies5