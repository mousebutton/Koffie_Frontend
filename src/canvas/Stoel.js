import {fabric} from 'fabric'

export default class Stoel {

  constructor(canvas, imgLocation, left, top, rotation) {
    fabric.Image.fromURL(imgLocation, img => {
      img.left = left;
      img.top = top;
      img.centeredRotation = true;
      img.selectable = false;
      img.originX = "center";
      img.originY = "center";

      canvas.add(img);

      img.angle = rotation;
      // canvas.renderAll();
    });
  }
}
