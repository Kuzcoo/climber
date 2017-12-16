import {ctx} from './Settings';

export default class Goal {
  width = 6;
  height = 6;
  color = "white";

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    ctx.fillStyle = this.color;

    ctx.fillRect(
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}