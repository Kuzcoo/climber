const LOAD_SUCESS = 'LOAD_SUCESS';

var _images = {};

export function getImageByName(name) {
  return _images[name];
}

export function loadImages(imagesArray) {
  return new Promise(resolve => {
    resolveImages(imagesArray)
      .then(imagesOutput => {
        imagesOutput.forEach( ({name, img}) => {
          _images[name] = img;
        });

        resolve(LOAD_SUCESS);
      });
  });
}

function resolveImages(imagesArray) {
  let images = imagesArray.map(imageObj => {
    return resolveImage(imageObj.name, imageObj.path);
  });

  return Promise.all(images);
}

function resolveImage(name, path) {
  return new Promise(resolve => {
    let img = document.createElement('img');
    img.onload = () => resolve({name, img});
    img.src = path;
  });
}