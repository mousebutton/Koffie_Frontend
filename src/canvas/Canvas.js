import { fabric } from 'fabric'
import Stoel from './Stoel'

export default class Canvas {

  canvas;

  constructor(canvasId) {
    this.canvas = new fabric.Canvas(canvasId);
    this.canvas.setWidth(1000);
    this.canvas.setHeight(1000);

    this.canvas.renderOnAddRemove = false;
  }
  addImage(imgLocation) {
    this.stoel = new Stoel(this.canvas,imgLocation);
  }
  renderAll() {
    this.canvas.renderAll();
  }
}
