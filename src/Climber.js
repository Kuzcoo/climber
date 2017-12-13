import {ctx} from './Settings';
import {getImageByName} from '../lib/Assets';
import {KEY, isPressed} from '../lib/Keyboarder';
import {map} from './states/load';

const STATE_STAND = 'STATE_STAND';
const STATE_WALK = 'STATE_WALK';
const STATE_CLIMB = 'STATE_CLIMB';
const STATE_HURT = 'STATE_HURT';
const DIR_LEFT = 0;
const DIR_RIGHT = 1;
const DIR_CLIMB = 2;
const SPRITE_HURT_POS_Y = 3;

export default class Climber {
  width = 16;
  height = 18;
  velocity = 1;
  imageNumber = 0;
  state = STATE_STAND;
  framesByImage = 8;
  framesElapsed = 0;
  direction = DIR_LEFT;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  canClimb() {
    return map.hasLadder(this.x + this.width/2, this.y);
  }

  canClimbDown() {
    return map.hasLadderBelow(this.x + this.width/2, this.y+this.height);
  }

  hasEndedClimb() {
    return !map.hasLadder(this.x + this.width/2, this.y+14);    
  }

  hasEndedClimbDown() {
    return !map.hasLadder(this.x + this.width/2, this.y+18);    
  }

  updateClimbFrame() {
    this.framesElapsed++;
    if (this.framesElapsed < this.framesByImage) {
      return;
    }

    this.framesElapsed = 0;

    this.imageNumber = ++this.imageNumber === 2 ?
      0 :
      this.imageNumber;     
  }

  updateWalkFrame() {
    this.framesElapsed++;

    if (this.framesElapsed < this.framesByImage) {
      return;
    }

    this.framesElapsed = 0;

    this.imageNumber = ++this.imageNumber === 3 ?
      0 :
      this.imageNumber; 
  }

  handleClimb() {
    if (isPressed(KEY.UP)) {
      if (this.hasEndedClimb()) {
        return this.state = STATE_STAND;
      }

      this.y -= this.velocity/2;
      this.updateClimbFrame();
    }

    if (isPressed(KEY.DOWN)) {
      if (this.hasEndedClimbDown()) {
        return this.state = STATE_STAND;
      }

      this.y += this.velocity/2;
      this.updateClimbFrame();
    }
  }

  handleStand() {
    if (isPressed(KEY.LEFT)) {
      this.x -= this.velocity;
      this.direction = DIR_LEFT;
      this.imageNumber = 1;
      this.state = STATE_WALK;
    }

    if (isPressed(KEY.RIGHT)) {
      this.x += this.velocity;
      this.direction = DIR_RIGHT;
      this.imageNumber = 1;
      this.state = STATE_WALK;
    }

    if (isPressed(KEY.UP)) {
      if (!this.canClimb()) return;

      this.y -= this.velocity;
      this.direction = DIR_CLIMB;
      this.imageNumber = 0;
      this.state = STATE_CLIMB;
    }

    if (isPressed(KEY.DOWN)) {
      if (!this.canClimbDown()) return;

      this.y += this.velocity;
      this.direction = DIR_CLIMB;
      this.imageNumber = 0;
      this.state = STATE_CLIMB;
    }
  }

  handleWalk() {
    if (!isPressed(KEY.LEFT) &&
        !isPressed(KEY.RIGHT)) {
      this.imageNumber = 0;
      this.framesElapsed = 0;
      return this.state = STATE_STAND;
    }

    if (isPressed(KEY.LEFT)) {
      this.x -= this.velocity;
      this.updateWalkFrame();
    }

    if (isPressed(KEY.RIGHT)) {
      this.x += this.velocity;
      this.updateWalkFrame();
    }
  }

  setHurtState() {
    if (this.state === STATE_HURT) return;

    this.state = STATE_HURT;
    this.setHurtGraphics();
  }

  setHurtGraphics() {
    this.framesElapsed = 0;
    this.imageNumber = 0;
    this.direction = SPRITE_HURT_POS_Y;
  }

  updateHurtFrame() {
    this.framesElapsed++;

    if (this.framesElapsed < this.framesByImage) {
      return;
    }

    this.framesElapsed = 0;

    this.imageNumber = ++this.imageNumber === 2 ?
      0 :
      this.imageNumber; 
  }

  handleHurt() {
    this.updateHurtFrame();
  }

  handleInputs() {
    switch (this.state) {
      case STATE_STAND:
        this.handleStand();
      break;
      case STATE_WALK:
        this.handleWalk();
      break;
      case STATE_CLIMB:
        this.handleClimb();
      break;
      case STATE_HURT:
        this.handleHurt();
      break;
    };
  }

  update() {
    this.handleInputs();
  }

  draw() {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
      getImageByName('sprite'),
      this.imageNumber*this.width, 
      this.direction*this.height+this.direction,
      this.width,
      this.height,
      this.x, 
      this.y,
      this.width,
      this.height
    )
  }
}