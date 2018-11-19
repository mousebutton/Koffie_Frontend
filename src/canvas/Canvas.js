import {fabric} from 'fabric'
import Persoon from './Persoon'
import CoffeeMachine from './CoffeeMachine'

export default class Canvas {

  constructor(canvasId, chairsForCanvas, coffeeMachine, orderModal) {
    this.orderModal = orderModal;
    this.canvas = new fabric.Canvas(canvasId);

    this.initCanvas(chairsForCanvas, coffeeMachine);
  }

  initCanvas(ch,c) {
    this.canvas.setWidth(1050);
    this.canvas.setHeight(window.innerHeight);
    this.canvas.selection = false;
    this.canvas.hoverCursor = "default";
    this.canvas.centeredRotation = true;

    this.chairsForCanvas = ch;
    this.coffeeMachine = c;

    this.addBackground();
  }

  addStage() {
    this.addChair("/static/stoel.png", 200, 200, 0);
  }

  addChairs(chairs) {

  }

  getObjectOnClick(left, top) {
    // Get CoffeeMachine
    if (this.coffeeMachine.leftPos === left && this.coffeeMachine.topPos === top) {
      //Show coffee menu
      // this.orderModal.orderCoffee();
      return;
    }
    // Get chair object
    for (var i = 0; i < this.chairsForCanvas.length; i++) {
      let chair = this.chairsForCanvas[i];
      if (chair.leftPos === left && chair.topPos === top) {
        if (chair.user === null) {
          alert('This chair is free');
          break;
        }
        else {
          alert(chair.user.email);
          break;
        }
      }
    }
  };

  addBackground() {
    fabric.Image.fromURL("/static/background.png", img => {
      img.left = 0;
      img.top = 0;

      img.selectable = false;
      img.hoverCursor = "default";

      this.canvas.add(img);
      this.canvas.sendToBack(img);
    });
  }


  addRectToChair = (left, top) => {
    return new fabric.Rect({
      width: 180, height: 100,
      fill: "#bfad0f",
      stroke: "black",
      strokeWidth: 1,

      left: left,
      top: top,
      selectable: true,
      centeredRotation: true,
      objectType: "popup"
    });
  };

  addChair(imgLocation, left, top, rotation, user) {
    new Persoon(this.canvas, imgLocation, left, top, rotation, user);
  };

  addCoffeeMachine(imgLocation, left, top) {
    new CoffeeMachine(this.canvas, imgLocation, left, top)
  }

}
