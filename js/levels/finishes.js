// [top, left]
let levelFinishes = [];
function getFinishes() {
    finish1();
    finish2();
    finish3();
    finish4();
    return levelFinishes;
}//end getFinishes

function finish1() {
    levelFinishes.push([50, 50]);
}//end finish1

function finish2() {
    levelFinishes.push([1, 95]);
}//end finish2

function finish3() {
    levelFinishes.push([90, 95]);
}//end finish3

function finish4() {
    levelFinishes.push([79, 84]);
}//end finish4