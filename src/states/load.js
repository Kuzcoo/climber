import {canvasWidth, canvasHeight} from '../Settings';

import Game from '../../lib/Game';

import {
  loadImages
} from '../../lib/Assets';

import {init as initKeyBoarder} from '../../lib/Keyboarder';
import Collider from '../../lib/Collider';

import Map from '../Map';
import Climber from '../Climber';
import Goal from '../Goal';

import {
  GAME_LOAD,
  GAME_PLAY
} from './states';

export const climber = new Climber(canvasWidth - 18, canvasHeight - (56 + 18));
export const map = new Map(0, 0, 'level1');
export const goal = new Goal(32, 25);


setLoadState();

export function setLoadState() {
  Game.addState(
    GAME_LOAD,
    {
      load
    }
  );
}

function load() {
  initKeyBoarder();

  Collider.addEntity('climber', climber);
  Collider.addEntity('goal', goal);

  loadSprite()
    .then(() => loadLevel(1))
    .then(() => setPlayState());
}

function loadSprite() {
  return loadImages([
    {name: 'sprite', path: '../assets/sprite.png'}
  ]);
}

export function loadLevel(levelNum) {
  return loadImages([
    {name: 'level1', path: `../assets/level${levelNum}.png`}
  ]);
}

function setPlayState() {
  Game.setState(GAME_PLAY);
  Game.start();
};
