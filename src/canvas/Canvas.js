import {fabric} from 'fabric'
import Stoel from './Stoel'

export default class Canvas {

  constructor(canvasId) {
    this.canvas = new fabric.Canvas(canvasId);
    this.canvas.setWidth(window.innerWidth);
    this.canvas.setHeight(window.innerHeight);
    // this.canvas.backgroundColor = "#DBD2C9";
    this.canvas.selection = false;
    this.canvas.hoverCursor = "pointer";
    this.canvas.centeredRotation = true;

    this.addBackground();
    this.canvas.on("mouse:down", this.handleMouseDown);
  }

  handleMouseDown = (e) => {
    console.log(e);
    let target = e.target;
    if (target && target.type === "image" && target.height <= 300) {
      let posLeft = target.left + target.width + 5;
      let posRight = target.top - 20;
      console.log(target);
      this.canvas.add(this.addRectToChair(posLeft, posRight));
    } else if(target.type === "rect") {
      this.canvas.remove(target);
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
      width: 100, height: 100,
      fill: "#bfad0f",
      stroke: "black",
      strokeWidth: 1,

      left: left,
      top: top,
      selectable: true,
      centeredRotation: true
    });
  };

  addImage(imgLocation, left, top, rotation) {
    new Stoel(this.canvas, imgLocation, left, top, rotation);
  }
}
