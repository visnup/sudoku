var _ = require('lodash');

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

function taken(board, r, c) {
  var br = Math.floor(r/3)*3,
      bc = Math.floor(c/3)*3;
  var row = board[r],
      col = _.pluck(board, c),
      box = board.slice(br, br+3).map(function(r) { return r.slice(bc, bc+3) });
  return row.concat(col, box[0], box[1], box[2]);
}

var numbers = _.shuffle(_.range(1, 10));
console.log((function solve(board, cell) {
  if (cell === 81)
    return board;

  var r = Math.floor(cell / 9),
      c = cell % 9;

  if (board[r][c])
    return solve(board, cell+1);

  var guesses = _.difference(numbers, taken(board, r, c)), nextBoard;
  if (guesses.length) {
    for (var i = 0; i < guesses.length; i++) {
      board[r][c] = guesses[i];
      if (nextBoard = solve(board, cell+1))
        return nextBoard;
    }
    board[r][c] = 0;  // back out
  }
})(board, 0));
