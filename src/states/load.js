import {canvasWidth, canvasHeight} from '../Settings';

import Game from '../../lib/Game';

import {
  loadImages
} from '../../lib/Assets';

import {init as initKeyBoarder} from '../../lib/Keyboarder';
import Collider from '../../lib/Collider';

import Map from '../Map';
import Climber from '../Climber';

import {
  GAME_LOAD,
  GAME_PLAY
} from './states';

export const climber = new Climber(
  canvasWidth - 18, 
  canvasHeight - (56 + 18)
  );
export const map = new Map(0, 0);

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
  loadResources()
    .then(message => {
      if ('LOAD_SUCESS' === message) {
        setPlayState();
      }
    });
}

function setPlayState() {
  Game.setState(GAME_PLAY);
  Game.start();
};

function loadResources() {
  return loadImages([
    {name: 'sprite', path: '../assets/sprite.png'},
    {name: 'level1', path: '../assets/level1.png'},
  ]);
}