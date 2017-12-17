import {ctx} from './Settings';
import {getImageByName} from '../lib/Assets';

var life = 2;

export const getLife = () => life;

export function decrement() {
  life = life - 1;

  return life === 0;
}

export function draw() {
  for (let i = 0; i < life; i++) {
    ctx.drawImage(
      getImageByName('sprite'),
      2*16,
      3*19,
      16,
      17,
      32*i+8,
      231-40,
      16,
      17
    );    
  }
}