import {fabric} from 'fabric'

export default class CoffeeMachine {

  constructor(canvas, imgLocation, left, top, rotation, scale) {
    fabric.Image.fromURL(imgLocation, img => {
      img.left = left;
      img.top = top;
      img.centeredRotation = true;
      img.selectable = false;
      img.originX = "center";
      img.originY = "center";
      img.scaleX = scale / 100;
      img.scaleY = scale / 100;
      img.hoverCursor = "pointer";

      canvas.add(img);

      img.angle = rotation;
      // canvas.renderAll();

      img.on("mouseup", (e) => {

      })
    });
  }
}
