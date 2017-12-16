import {
  clearScreen,
  background
} from '../../lib/Utils';

import Levels from '../Levels';

import Game from '../../lib/Game';

import Collider from '../../lib/Collider';

import {
  GAME_PLAY,
  GAME_HIT,
  GAME_OVER
} from './states';

import {
  map,
  climber,
  goal,
  loadLevel
} from './load';

import {
  decrement as decrementLife,
  draw as drawLife,
  getLife
} from '../Life';

import {
  initialize as initLasers,
  reset as resetLasers,
  update as updateLasers,
  draw as drawLasers
} from '../LaserPool';

var framesElasped = 0;
const framesTilNextRound = 120;
var isLoadingNextLevel = false;
var currentLevel = 1;

initLasers(7, getLaserVelocity());

Game.addState(
  GAME_OVER,
  {
    'handleInputs': () => {

    },

    'update': () => {

    },

    'draw': () => {

    }
  }
);

Game.addState(
  GAME_PLAY,
  {
    'handleInputs': () => {

    },
    
    'update': () => {
      if (isLoadingNextLevel) return;

      if (Collider.isColliding('climber', 'laser')) {
        climber.setHurtState();
        decrementLife();
        Game.setState(GAME_HIT);
      }

      if (Collider.isColliding('climber', 'goal')) {
        isLoadingNextLevel = true;
        loadLevel(++currentLevel)
          .then(() => {
            resetLasers(7, getLaserVelocity());
            climber.reset();
            isLoadingNextLevel = false;
          });
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
      goal.draw();
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

        if (getLife() !== 0) {
          climber.reset();
          resetLasers(7, getLaserVelocity());
          Game.setState(GAME_PLAY);          
        } else {
          Game.setState(GAME_OVER);
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

function getLaserVelocity() {
  return Levels['level' + currentLevel].laserVelocity;
}