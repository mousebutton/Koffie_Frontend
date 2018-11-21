import {fabric} from 'fabric'
import CoffeeMenu from './CoffeeMenu'

export default class CoffeeMachine {

  constructor(canvas, imgLocation, left, top, rotation, scale) {
    this.coffeeMenu = new CoffeeMenu(canvas);

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
        this.coffeeMenu.buildDialog(e.target.left, e.target.top);
      })
    });
  }
}
