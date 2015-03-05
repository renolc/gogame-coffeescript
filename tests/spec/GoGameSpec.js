// Generated by CoffeeScript 1.8.0
describe('A go game', function() {
  beforeEach(function() {
    jasmine.addMatchers({
      toBeEmpty: function() {
        return {
          compare: function(actual) {
            return {
              pass: actual.toString().indexOf('b') === -1 && actual.toString().indexOf('w') === -1
            };
          }
        };
      },
      toInclude: function() {
        return {
          compare: function(actual, expected) {
            return {
              pass: actual.indexOf(expected) !== -1
            };
          }
        };
      },
      toBeA: function() {
        return {
          compare: function(actual, expected) {
            return {
              pass: actual instanceof expected
            };
          }
        };
      }
    });
    return this.game = new GoGame();
  });

  /*
  Game tests
   */
  it('should have a board', function() {
    return expect(this.game.board).toBeA(Board);
  });
  it('should start with black', function() {
    return expect(this.game.turn).toBe(Cell.PIECE.BLACK);
  });
  it('should alternate turns after passing', function() {
    this.game.pass();
    expect(this.game.turn).toBe(Cell.PIECE.WHITE);
    this.game.pass();
    return expect(this.game.turn).toBe(Cell.PIECE.BLACK);
  });

  /*
  Play tests
   */
  describe('play', function() {
    beforeEach(function() {
      this.originalTurn = this.game.turn;
      return this.cell = this.game.play(0, 0);
    });
    it('should return the cell played on', function() {
      return expect(this.cell).toBeA(Cell);
    });
    it('should set the value of the cell to the current turn', function() {
      return expect(this.cell.value).toBe(this.originalTurn);
    });
    return it('should alternate turns', function() {
      expect(this.game.turn).toBe(Cell.PIECE.WHITE);
      this.game.play(0, 1);
      return expect(this.game.turn).toBe(Cell.PIECE.BLACK);
    });
  });

  /*
  Board tests
   */
  return describe('board', function() {
    beforeEach(function() {
      return this.board = this.game.board;
    });
    it('should have a size of 9', function() {
      return expect(this.board.size).toBe(9);
    });
    it('should be composed of cells', function() {
      return expect(this.board.at(0, 0)).toBeA(Cell);
    });
    it('should have reference to cell clusters', function() {
      return expect(this.board.clusters).toBeA(Array);
    });

    /*
    Cell tesss
     */
    return describe('cell', function() {
      beforeEach(function() {
        return this.cell = this.board.at(3, 2);
      });
      it('should start as empty', function() {
        return expect(this.cell.value).toBe(Cell.PIECE.EMPTY);
      });
      it('should reference the cell above it', function() {
        return expect(this.cell.up).toBe(this.board.at(3, 1));
      });
      it('should reference the cell below it', function() {
        return expect(this.cell.down).toBe(this.board.at(3, 3));
      });
      it('should reference the cell to the left of it', function() {
        return expect(this.cell.left).toBe(this.board.at(2, 2));
      });
      return it('should reference the cell to the right of it', function() {
        return expect(this.cell.right).toBe(this.board.at(4, 2));
      });
    });
  });
});
