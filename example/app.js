window.onload = function() {

  var Game = new GoGame(19);

  var Images;
  var canvas, drawingContext;
  var mousePosition, lastMousePosition;

  function init() {
    initCanvasAndContext();
    loadImagesAndDraw();
  }

  function initCanvasAndContext() {
    // init canvas and context
    canvas = document.createElement('canvas');
    drawingContext = canvas.getContext('2d');

    canvas.width  = Game.board.size * 20;
    canvas.height = Game.board.size * 20;

    // add canvas to the body
    document.body.appendChild(canvas);

    // add mouse event handlers
    addEvent(canvas, 'mousemove', onMouseMove);
    addEvent(canvas, 'click', onMouseClick);
    addEvent(canvas, 'mouseout', onMouseOut);
    addEvent(document.getElementById('pass'), 'click', onPassClick);
  }

  function loadImagesAndDraw() {
    Images = {
      INTERSECTION: new Image(),
      TOPLEFT:      new Image(),
      TOPRIGHT:     new Image(),
      BOTTOMLEFT:   new Image(),
      BOTTOMRIGHT:  new Image(),
      TOP:          new Image(),
      RIGHT:        new Image(),
      LEFT:         new Image(),
      BOTTOM:       new Image(),
      BLACK:        new Image(),
      WHITE:        new Image()
    };

    // wait for all of the images to load before drawing the board
    var imagesLoadedCount = 0;
    for (k in Images) {
      v = Images[k];
      imagesLoadedCount++;
      v.onload = function() {
        imagesLoadedCount--;
        if (imagesLoadedCount === 0) {
          draw();
        }
      };
    }

    // set the sources at the same time to kick off image loading
    Images.TOP.src           = 'img/topEdge.png';
    Images.RIGHT.src         = 'img/rightEdge.png';
    Images.BOTTOM.src        = 'img/bottomEdge.png';
    Images.LEFT.src          = 'img/leftEdge.png';
    Images.TOPRIGHT.src      = 'img/topRight.png';
    Images.TOPLEFT.src       = 'img/topLeft.png';
    Images.BOTTOMRIGHT.src   = 'img/bottomRight.png';
    Images.BOTTOMLEFT.src    = 'img/bottomLeft.png';
    Images.INTERSECTION.src  = 'img/intersection.png';
    Images.BLACK.src         = 'img/black.png';
    Images.WHITE.src         = 'img/white.png';
  }

  function draw() {
    for (row = 0; row < Game.board.size; row++) {
      for (col = 0; col < Game.board.size; col++) {
        drawCell(row, col);
      }
    }

    drawHover();
  }

  function drawHover() {
    if (mousePosition){
      if (Game.board.at(mousePosition.row, mousePosition.col).value === Cell.PIECE.EMPTY) {
        drawingContext.save();
        drawingContext.globalAlpha = 0.5;
        drawImage(getGamePieceImage(Game.turn), mousePosition.row, mousePosition.col);
        drawingContext.restore();
      }
    }
  }

  function drawCell(row, col) {
    var img;

    if (row === 0 && col === 0)
      img = Images.TOPLEFT
    else if (row === 0 && col === Game.board.size - 1)
      img = Images.TOPRIGHT
    else if (row === Game.board.size - 1 && col === 0)
      img = Images.BOTTOMLEFT
    else if (row === Game.board.size - 1 && col === Game.board.size - 1)
      img = Images.BOTTOMRIGHT
    else if (row === 0)
      img = Images.TOP
    else if (row === Game.board.size - 1)
      img = Images.BOTTOM
    else if (col === 0)
      img = Images.LEFT
    else if (col === Game.board.size - 1)
      img = Images.RIGHT
    else
      img = Images.INTERSECTION

    drawImage(img, row, col);

    img = getGamePieceImage(Game.board.at(row, col).value);
    if (img)
      drawImage(img, row, col);
  }

  function drawImage(img, row, col) {
    var CELL_SIZE = 20;

    drawingContext.drawImage(img, col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  }

  function addEvent(element, event, handler) {
    if (element.addEventListener)
      element.addEventListener(event, handler, false);
    else if (element.attachEvent)
      element.attachEvent('on' + event, handler);
    else
      element['on' + event] = handler;
  }

  function onMouseMove(e) {
    lastMousePosition = mousePosition;
    mousePosition = {
      col: Math.floor((e.pageX - canvas.offsetLeft) / 20),
      row: Math.floor((e.pageY - canvas.offsetTop) / 20)
    };

    draw();
  }

  function onMouseOut(e) {
    mousePosition = null;
    draw();
  }

  function onMouseClick(e) {
    Game.play(mousePosition.row, mousePosition.col);
    draw();
  }

  function onPassClick(e) {
    Game.pass();
  }

  function getGamePieceImage(from) {
    var img;
    switch(from) {
      case Cell.PIECE.BLACK:
        img = Images.BLACK;
        break;
      case Cell.PIECE.WHITE:
        img = Images.WHITE;
    }
    return img;
  }

  init();
};
