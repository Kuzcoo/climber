var entities = {};

export default {
  addEntity,
  removeEntity,
  isColliding
};

function addEntity(name, entity) {
  if (!entities[name]) {
    entities[name] = [];
  }

  entities[name].push(entity);
}

function removeEntity(name) {
  entities[name] = null;
}

function isColliding(firstEntityName, secondEntityName) {
  let firstEntity = entities[firstEntityName][0];

  return entities[secondEntityName].some(entity => (
    entity.x < firstEntity.x + firstEntity.width &&
    entity.x + entity.width > firstEntity.x &&
    entity.y < firstEntity.y + firstEntity.height &&
    entity.height + entity.y > firstEntity.y
  ));
}