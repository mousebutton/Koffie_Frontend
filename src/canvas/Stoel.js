import { fabric } from 'fabric'

export default class Stoel{

  constructor(canvas, imgLocation) {
    fabric.Image.fromURL(imgLocation, function(img) {
      img.left = 100;
      img.top = 100;
      canvas.add(img);
    });
  }
}
