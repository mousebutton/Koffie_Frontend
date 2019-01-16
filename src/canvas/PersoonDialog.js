import {fabric} from 'fabric'

export default class PersoonDialog {

  constructor(canvas) {
    this.id = "";
    this.canvas = canvas;
    this.currentId = Math.round(Math.random() * 1000000);
  }

  buildDialog(left, top, user) {
    let containerWidth = 180;
    let containerHeight = 100;

    let dialogContainer = new fabric.Rect({
      width: containerWidth, height: containerHeight,
      fill: "#aaa49d",
      stroke: "black",
      strokeWidth: 1,
      left: left + 30,
      top: top - 25,
      selectable: false,
      centeredRotation: true,
      objectType: "dialog",
      id: this.currentId,
      rx: 5,
      ry: 5
    });

    let posRight = dialogContainer.left + containerWidth - 25;
    let posTop = dialogContainer.top + 5;

    let closeButton = new fabric.Rect({
      width: 20, height: 20,
      fill: "red",
      stroke: "red",
      strokeWidth: 1,
      hoverCursor: "pointer",
      left: posRight,
      top: posTop,
      selectable: false,
      centeredRotation: true,
      objectType: "dialogClose",
      id: this.currentId,
      rx: 5,
      ry: 5
    });

    let userDetails = new fabric.Text(
      user.firstName + ' ' + 
      user.lastName + '\n' +  
      user.email + '\n' , {

      left: left + 30,
      top: top - 25,
      fontSize: 12,
      fontFamily: 'Helvetica',
      hasBorders: false,
      hasControls: false,
      hasRotatingPoint: false,
      lockMovementX: true,
      lockMovementY: true
    });

    closeButton.on("mouseup", (e) => {
      let id = e.target.id;
      this.canvas.getObjects().forEach((object) => {
        if (object.id == id) {
          this.canvas.remove(object);
          this.canvas.remove(userDetails);
        }
      });
      this.canvas.renderAll();
    });

    this.canvas.add(dialogContainer);
    this.canvas.add(closeButton);
    this.canvas.add(userDetails);
  }
}
