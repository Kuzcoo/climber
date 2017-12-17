import {ctx} from '../Settings';
import {getImageByName} from '../../lib/Assets';

export function draw() {
  ctx.drawImage(
    getImageByName('game_over'),
    98,
    231 - 40
  );
}