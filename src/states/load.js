import {canvasWidth, canvasHeight} from '../Settings';

import Game from '../../lib/Game';

import {
  loadImages
} from '../../lib/Assets';

import {init as initKeyBoarder} from '../../lib/Keyboarder';

import Map from '../Map';
import Climber from '../Climber';

import {
  GAME_LOAD,
  GAME_PLAY
} from './states';

export const climber = new Climber(0, canvasHeight - (56 + 19));
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
    {name: 'climber', path: '../assets/climber.png'},
    {name: 'level1', path: '../assets/level1.png'},
  ]);
}