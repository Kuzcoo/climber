import {ctx} from './Settings';
import {getImageByName} from '../lib/Assets';

export default class Laser {
  width = 4;
  height = 20;
  velocity = 0.5;
  isActive = false;
  spritePos = 48;
  framesElapsed = 0;
  startAfterFrames = 0;
  savedPos = 0;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.savedPos = y;
  }

  activate(numOfFramesTilStart) {
    this.isActive = true;
    this.startAfterFrames = numOfFramesTilStart;
  }

  desactivate() {
    this.isActive = false;
    this.framesElapsed = 0;
  }

  reset() {
    this.x = 0;
    this.y = this.savedPos;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }

  update() {
    if (this.isActive && 
        this.framesElapsed >= this.startAfterFrames) {
      this.x += this.velocity;
    }
    this.framesElapsed++;
  }

  draw() {
    ctx.drawImage(
      getImageByName('sprite'),
      this.spritePos,
      37,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}