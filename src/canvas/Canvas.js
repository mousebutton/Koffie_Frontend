import {fabric} from 'fabric'
import Persoon from './Persoon'
import CoffeeMachine from './CoffeeMachine'

export default class Canvas {

  constructor(canvasId, chairsForCanvas, coffeeMachine, orderModal) {
    this.orderModal = orderModal;
    this.canvas = new fabric.Canvas(canvasId);

    this.initCanvas(chairsForCanvas, coffeeMachine);
  }

  initCanvas(ch, c) {
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
    this.addChair(220, 340, 0);
    this.addChair(370, 240, 90);
    this.addChair(500, 340, 180);
    this.addCoffeeMachine(400, 100);
    this.addTable(250, 280, 0);
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

  addChair(left, top, rotation, user) {
    new Persoon(this.canvas, "/static/stoel.png", left, top, rotation, user);
  };

  addCoffeeMachine(left, top) {
    new CoffeeMachine(this.canvas, "/static/coffee_machine.png", left, top, 0, 50)
  }

  addTable(left, top, rotation) {
    fabric.Image.fromURL("/static/tafel.png", img => {
      img.left = left;
      img.top = top;

      img.selectable = false;
      img.hoverCursor = "default";

      this.canvas.add(img);
    });
  }
}
