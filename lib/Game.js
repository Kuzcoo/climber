var gameState = null;
var cancelFrameId = null;

var stateHandlers = {};

const addState = (stateName, stateObject) => {
  stateHandlers[stateName] = stateObject;
};

const setState = (stateName) => {
  gameState = stateName;
};

const gameLoop = () => {
  update();
  draw();

  cancelFrameId = requestAnimationFrame(gameLoop);
}

const load = () => {
  stateHandlers[gameState].load();  
};

const handleInputs = () => {
  stateHandlers[gameState].handleInputs();
};

const update = () => {
  stateHandlers[gameState].update();
};

const draw = () => {
  stateHandlers[gameState].draw();
};

const start = () => {
  if (cancelFrameId) {
    cancelAnimationFrame(cancelFrameId);
  }

  gameLoop();
};

const Game = function () {
  return {
    addState,
    setState,
    load,
    handleInputs,
    update,
    draw,
    start
  };
}();

export default Game;