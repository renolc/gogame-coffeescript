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
      }
    });
    return this.game = new GoGame();
  });
  it('starts empty', function() {
    return expect(this.game).toBeEmpty();
  });
  it('should start with black', function() {
    return expect(this.game.turn).toEqual(this.game.PIECE.BLACK);
  });
  it('should be able to chain commands', function() {
    this.game.play(0, 0).play(1, 0).pass();
    return expect(this.game.turn).toEqual(this.game.PIECE.WHITE);
  });
  describe('when a player places a piece not on an edge', function() {
    beforeEach(function() {
      this.game.play(2, 3);
      return this.cell = this.game.board[2][3];
    });
    it('should have an cell value of black', function() {
      return expect(this.cell.value).toEqual(this.game.PIECE.BLACK);
    });
    it('should alternate turns', function() {
      expect(this.game.turn).toEqual(this.game.PIECE.WHITE);
      this.game.play(0, 0);
      return expect(this.game.turn).toEqual(this.game.PIECE.BLACK);
    });
    return it('should reference all the the pieces around it', function() {
      expect(this.cell.surroundingCells().length).toEqual(4);
      expect(this.cell.up()).toBe(this.game.board[2][2]);
      expect(this.cell.down()).toBe(this.game.board[2][4]);
      expect(this.cell.left()).toBe(this.game.board[1][3]);
      return expect(this.cell.right()).toBe(this.game.board[3][3]);
    });
  });
  return describe('when a player passes', function() {
    var originalBoard;
    originalBoard = null;
    beforeEach(function() {
      originalBoard = this.game.toString();
      return this.game.pass();
    });
    it('should not change the board', function() {
      return expect(this.game.toString()).toEqual(originalBoard);
    });
    return it('should alternate turns', function() {
      expect(this.game.turn).toEqual(this.game.PIECE.WHITE);
      this.game.pass();
      return expect(this.game.turn).toEqual(this.game.PIECE.BLACK);
    });
  });
});
