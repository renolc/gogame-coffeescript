describe 'A go game', ->

  beforeEach ->
    jasmine.addMatchers
      toInclude: ->
        compare: (actual, expected) ->
          if actual instanceof Cluster
            pass: actual.cells.indexOf(expected) != -1
          else
            pass: actual.indexOf(expected) != -1

      toBeA: ->
        compare: (actual, expected) ->
          pass: actual instanceof expected

    @game = new GoGame()


  ###
  Game tests
  ###

  it 'should have a board', ->
    expect @game.board
      .toBeA Board

  it 'should start with black', ->
    expect @game.turn
      .toBe Cell.PIECE.BLACK

  it 'should alternate turns after passing', ->
    @game.pass()

    expect @game.turn
      .toBe Cell.PIECE.WHITE

    @game.pass()

    expect @game.turn
      .toBe Cell.PIECE.BLACK


  ###
  Play tests
  ###

  describe 'play', ->

    beforeEach ->
      @originalTurn = @game.turn
      @cell = @game.play(4, 5)

    it 'should return the cell played on', ->
      expect @cell
        .toBeA Cell

    it 'should set the value of the cell to the current turn', ->
      expect @cell.value
        .toBe @originalTurn

    it 'should alternate turns', ->
      expect @game.turn
        .toBe Cell.PIECE.WHITE

      @game.play(0, 1)

      expect @game.turn
        .toBe Cell.PIECE.BLACK

    it 'should create a cluster related to the cell that contains it', ->
      expect @cell.cluster
        .toBeA Cluster

      expect @cell.cluster
        .toInclude @cell

    it 'should merge clusters when played next to a similar piece', ->
      @game.pass()
      @cell2 = @game.play(4, 4)

      expect @cell.cluster
        .toBe @cell2.cluster

      expect @cell.cluster
        .toInclude @cell

      expect @cell.cluster
        .toInclude @cell2

    ###
    Cluster tests
    ###

    describe 'cluster', ->

      beforeEach ->
        @cluster = @cell.cluster

      it 'should contain the liberties of the default cells', ->
        liberties = @cluster.liberties()

        expect liberties
          .toEqual @cell.liberties()

        expect liberties
          .toInclude @cell.up

        expect liberties
          .toInclude @cell.down

        expect liberties
          .toInclude @cell.left

        expect liberties
          .toInclude @cell.right


  ###
  Board tests
  ###

  describe 'board', ->

    beforeEach ->
      @board = @game.board

    it 'should have a size of 9', ->
      expect @board.size
        .toBe 9

    it 'should be composed of cells', ->
      expect @board.at(0, 0)
        .toBeA Cell


    ###
    Cell tests
    ###

    describe 'cell', ->

      beforeEach ->
        @cell = @board.at(3, 2)

      it 'should start as empty', ->
        expect @cell.value
          .toBe Cell.PIECE.EMPTY

      it 'should reference the cell above it', ->
        expect @cell.up
          .toBe @board.at(3, 1)

      it 'should reference the cell below it', ->
        expect @cell.down
          .toBe @board.at(3, 3)

      it 'should reference the cell to the left of it', ->
        expect @cell.left
          .toBe @board.at(2, 2)

      it 'should reference the cell to the right of it', ->
        expect @cell.right
          .toBe @board.at(4, 2)

      it 'should reference all its surounding cells', ->
        expect @cell.surrounding()
          .toBeA Array

        expect @cell.surrounding()
          .toInclude @cell.up

        expect @cell.surrounding()
          .toInclude @cell.down

        expect @cell.surrounding()
          .toInclude @cell.left

        expect @cell.surrounding()
          .toInclude @cell.right
