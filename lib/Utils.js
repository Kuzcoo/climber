var _canvas = null;
var _ctx = null;
var _canvasWidth = null;
var _canvasHeight = null;

export const setCanvasSize = () => {
  _canvas.width = _canvasWidth;
  _canvas.height = _canvasHeight;
}

export const background = (color) => {
  _ctx.fillStyle = color;
  _ctx.fillRect(0, 0, _canvasWidth, _canvasHeight);
};

export const clearScreen = () => {
  _ctx.clearRect(0, 0, _canvasWidth, _canvasHeight);
};

export const configure = ({
  canvas,
  ctx,
  canvasWidth,
  canvasHeight
}) => {
  _canvas = canvas;
  _ctx = ctx;
  _canvasWidth = canvasWidth;
  _canvasHeight = canvasHeight;
};
