// Having trouble with module files for Javascript means I can't do this as a JSON file
// So it's going to have to be in Javscript with a get function
// Each second level array is a level, each inside array is a block
// [width, height, top, left]
let levels = [];
function getBlocks() {
    // const levelBlocks = [[[5, 35, 35, 40], [13, 3, 80, 67]], [[85, 85, 6, 6]]];
    level1();
    level2();
    return levels;
}//end getBlocks

function level1() {
    levels.push([[5, 35, 35, 40], [13, 3, 80, 67]]);
}//end level1

function level2() {
    levels.push([[85, 85, 6, 6]]);
}//end level2

function level3() {

}//end level3