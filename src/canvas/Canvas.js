import {fabric} from 'fabric'
import Persoon from './Persoon'
import CoffeeMachine from './CoffeeMachine'

export default class Canvas {

  constructor(canvasId, chairsForCanvas, coffeeMachine, orderModal) {
    console.log(chairsForCanvas);
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
    this.addStage(ch);
  }

  addStage(ch) {

    // dynamic
    for (let i = 0; i < ch.length; i++) {
      let chair = ch[i];
      this.addChair(chair);
    }
    // static
    // this.addChair(220, 340, 0);
    // this.addChair(370, 240, 90);
    // this.addChair(500, 340, 180);

    this.addCoffeeMachine(400, 100);
    this.addTable(250, 280, 0);
  }

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

  // dynamic
  addChair(chair) {
    new Persoon(this.canvas, chair);
  };

  // static 
  // addChair(left, top, rotation, user) {
  //   new Persoon(this.canvas, "/static/stoel.png", left, top, rotation, user);
  // };

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
