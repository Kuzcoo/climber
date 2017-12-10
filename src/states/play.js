import {
  clearScreen,
  background
} from '../../lib/Utils';

import Game from '../../lib/Game';

import {
  GAME_PLAY
} from './states';

import {
  map,
  climber
} from './load';

Game.addState(
  GAME_PLAY,
  {
    'handleInputs': () => {

    },
    
    'update': () => {
      climber.update();
    },

    'draw': () => {
      clearScreen();
      background('black');
      map.draw();
      climber.draw();
    }
  }
);