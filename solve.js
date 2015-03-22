var _ = require('lodash');

module.exports = function(board) {
  return solve(board, next(board));
};

// recursively try guesses until the board is full
function solve(board, cell) {
  if (!cell) return board;

  var r = cell[0], c = cell[1], guesses = cell[2], nextBoard;
  if (guesses.length) {
    for (var i = 0; i < guesses.length; i++) {
      board[r][c] = guesses[i];
      if (nextBoard = solve(board, next(board)))
        return nextBoard;
    }
    board[r][c] = 0;  // back out
  }
}

// the already taken values for a given cell
function taken(board, r, c) {
  var br = Math.floor(r/3)*3, bc = Math.floor(c/3)*3;
  var row = board[r],
      col = _.pluck(board, c),
      box = _.map(_.slice(board, br, br+3), function(r) {
        return _.slice(r, bc, bc+3)
      });
  return row.concat(col, box[0], box[1], box[2]);
}

// the next cell to try, based on least number of possible guesses
var numbers = _.shuffle(_.range(1, 10));
function next(board) {
  var cell, least = 10;
  _.forEach(board, function(row, r) {
    _.forEach(row, function(v, c) {
      if (v) return;
      var guesses = _.difference(numbers, taken(board, r, c));
      if (guesses.length < least) {
        cell = [r, c, guesses];
        least = guesses.length;
      }
    });
  });
  return cell;
}
