import {ctx} from './Settings';
import {getImageByName} from '../lib/Assets';

var life = 2;

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
      16*(i*1.5)+16,
      231-20,
      16,
      17
    );    
  }
}