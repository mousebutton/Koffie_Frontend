import {fabric} from 'fabric'
import PersoonDialog from "./PersoonDialog"

export default class Stoel {

  constructor(canvas, imgLocation, left, top, rotation, user) {
    // Add chair to canvas
    this.persoonDialog = new PersoonDialog(canvas);

    fabric.Image.fromURL(imgLocation, img => {
      img.left = left;
      img.top = top;
      img.centeredRotation = true;
      img.selectable = false;
      img.originX = "center";
      img.originY = "center";
      canvas.add(img);
      img.angle = rotation;
      img.objectType = "persoon";

      img.on("mouseup", (e) => {
        this.persoonDialog.buildDialog(e.target.left, e.target.top);
      });
      // canvas.renderAll();
    });
  }
}
