import Laser from './Laser';
import Collider from '../lib/Collider';

var lasers = [];
const framesByLaser = 240;
var framesElapsed = 0;
var isFirstLaunch = true;
const laserYPositions = [
  131,
  83,
  35,
  155,
  107,
  59,
  11
];

export function initialize(n, velocity) {
  createLasers(n, velocity);
  launchFirstThree();
}

export function launchLasers() {
  let availableLasers = lasers.filter( (laser,i) => {
    return !lasers[i].instance.isActive;
  });

  launchFirstThree();

  availableLasers.forEach((laser, i) => {
    laser.alive = true;
    laser.instance.reset();
    laser.instance.activate(
      Math.max(160, Math.random()*300)
    );
  });
}

export function reset(n, velocity) {
 lasers = [];

 Collider.removeEntity('laser');
 initialize(n, velocity);
}

export function update() {
  

  launchLasers();

  lasers.filter(laser => laser.alive)
    .forEach(laser => {
      if (isOutOfScreen(laser)) {
        laser.instance.desactivate();
        laser.alive = false;
      } else {
        laser.instance.update();        
      }
    });
}

export function draw() {
  lasers.filter(laser => laser.alive)
    .forEach(laser => {
      laser.instance.draw()
    });
}

function launchFirstThree() {
  for (let i = 0; i < 3; i++) {
    lasers[i].instance.activate(60);
  }
}

function createLasers(n, velocity) {
  for (let i = 0; i < n; i++) {
    lasers.push({
      alive: true,
      instance: new Laser(0, laserYPositions[i], velocity)
    });

    Collider.addEntity('laser', lasers[i].instance);
  }
}

function isOutOfScreen(laser) {
  return laser.instance.x > 304;
}