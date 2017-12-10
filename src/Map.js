import {ctx} from './Settings';
import {getImageByName} from '../lib/Assets';
import {level1} from './levels/level1';

export default class Map {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.level = 'level1';
  }

  hasLadder(x, y) {
    return level1.ladders.some(ladderCoords => {
      return x > ladderCoords.x &&
             x < ladderCoords.x + 16 &&
             y > ladderCoords.y - 28 &&
             y < ladderCoords.y;
    });
  }

  hasLadderBelow(x, y) {
    return level1.ladders.some(ladderCoords => {
      return x > ladderCoords.x &&
             x < ladderCoords.x + 16 &&
             y === ladderCoords.y - 24;
    });
  }

  draw() {
    ctx.drawImage(
      getImageByName(this.level),
      0,
      0
    );
  }
}