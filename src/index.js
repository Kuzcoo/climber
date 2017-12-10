import {
  configure as configureUtils,
  setCanvasSize,
  background
} from '../lib/Utils';

import {
  ctx,
  canvas,
  canvasWidth,
  canvasHeight,
  frameWidth,
  frameHeight,
  framePosX,
  framePosY
} from './Settings';

import {
  GAME_LOAD
} from './states/states';

import Game from '../lib/Game';

import './states/load';
import './states/play';

configureUtils({
  canvas,
  ctx,
  canvasWidth,
  canvasHeight
});

setCanvasSize();

Game.setState(GAME_LOAD);
Game.load();