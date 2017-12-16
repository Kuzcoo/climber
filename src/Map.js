import {ctx} from './Settings';
import {getImageByName} from '../lib/Assets';
import {ladders} from './Ladders';

export default class Map {

  constructor(x, y, levelNum) {
    this.x = x;
    this.y = y;
    this.level = levelNum;
  }

  hasLadder(x, y) {
    return ladders.some(ladderCoords => {
      return x > ladderCoords.x &&
             x < ladderCoords.x + 16 &&
             y > ladderCoords.y - 28 &&
             y < ladderCoords.y;
    });
  }

  hasLadderBelow(x, y) {
    return ladders.some(ladderCoords => {
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