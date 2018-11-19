import {fabric} from 'fabric'
import Stoel from './Stoel'
import CoffeeMachine from './CoffeeMachine'
import PersoonDialog from "./PersoonDialog";

export default class Canvas {

  constructor(canvasId, chairsForCanvas, coffeeMachine, orderModal) {
    this.orderModal = orderModal;
    this.canvas = new fabric.Canvas(canvasId);

    this.canvas.setWidth(1050);
    this.canvas.setHeight(window.innerHeight);
    this.chairsForCanvas = chairsForCanvas;
    this.coffeeMachine = coffeeMachine;
    this.canvas.selection = false;
    this.canvas.hoverCursor = "pointer";
    this.canvas.centeredRotation = true;
    this.addBackground();
    this.canvas.on("mouse:down", this.handleMouseDown);
  }

  handleMouseDown = (e) => {
    // console.log(e);
    let persoonDialog = new PersoonDialog(this.canvas);
    let target = e.target;

    if (target && target.type === "image") {
      switch (target.objectType) {
        case "persoonInfo":
          this.canvas.remove(target);
          break;
        case "coffeeMachine":
          
          break;
        case "persoon":
          let posLeft = target.left + target.width + 5;
          let posTop = target.top - 20;
          persoonDialog.buildDialog(posLeft,posTop);
          break;
        default:
      }
    }
  };

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
    new Stoel(this.canvas, imgLocation, left, top, rotation, user);
  };

  addCoffeeMachine(imgLocation, left, top) {
    new CoffeeMachine(this.canvas, imgLocation, left, top)
  }

}
