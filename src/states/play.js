import {
  clearScreen,
  background
} from '../../lib/Utils';

import Game from '../../lib/Game';

import Collider from '../../lib/Collider';

import {
  GAME_PLAY,
  GAME_HIT
} from './states';

import {
  map,
  climber
} from './load';

import {
  decrement as decrementLife,
  draw as drawLife
} from '../Life';

import {
  initialize as initLasers,
  update as updateLasers,
  draw as drawLasers
} from '../LaserPool';

var framesElasped = 0;
const framesTilNextRound = 120;

initLasers(7);

Game.addState(
  GAME_PLAY,
  {
    'handleInputs': () => {

    },
    
    'update': () => {
      if (Collider.isColliding('climber', 'laser')) {
        climber.setHurtState();

        Game.setState(GAME_HIT);

        if (decrementLife()) {
        }
      }
      updateLasers();
      climber.update();
    },

    'draw': () => {
      clearScreen();
      background('black');
      map.draw();
      drawLasers();
      climber.draw();
      drawLife();
    }
  }
);

Game.addState(
  GAME_HIT,
  {
    'handleInputs': () => {

    },
    
    'update': () => {
      framesElasped++;

      if (framesElasped === framesTilNextRound) {
        framesElasped = 0;
        Game.setState(GAME_PLAY);
      }

      updateLasers();
      climber.update();
    },

    'draw': () => {
      clearScreen();
      background('black');
      map.draw();
      drawLasers();
      climber.draw();
      drawLife();
    }
  }
);