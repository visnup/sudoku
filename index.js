var solve = require('./solve');

var hard = [ '6  2   3 ',
             ' 2  7   8',
             '  9  4   ',
             ' 6    3  ',
             '8       1',
             '  7    4 ',
             '   6  9  ',
             '4   3  2 ',
             ' 7   9  5' ];
var board = hard.map(function(s) { return s.split('').map(Number) });

console.log(solve(board));
