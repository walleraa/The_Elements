// Having trouble with module files for Javascript means I can't do this as a JSON file
// So it's going to have to be in Javscript with a get function
// Each second level array is a level, each inside array is a block
// [width, height, top, left]
function getBlocks() {
    const levelBlocks = [[[5, 35, 35, 40], [13, 3, 80, 67]], [[85, 85, 6, 6]]];
    return levelBlocks;
}