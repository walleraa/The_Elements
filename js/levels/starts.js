// [top, left]
let levelStarts = [];
function getStarts() {
    start1();
    start2();
    start3();
    return levelStarts;
}//end getStarts

function start1() {
    levelStarts.push([90, 5]);
}//end start1

function start2() {
    levelStarts.push([1, 1]);
}//end start2

function start3() {
    levelStarts.push([50, 50]);
}//end start3