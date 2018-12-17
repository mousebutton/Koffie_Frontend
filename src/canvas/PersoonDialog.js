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
      fill: "#bfad0f",
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

    // dynamic
    let userDetails = new fabric.Text( user.firstName + ' ' + user.lastName + '\n' + 
                                        user.email, {
      left: left + 30,
      top: top - 25,
      fontSize: 22,
    });

    closeButton.on("mouseup", (e) => {
      let id = e.target.id;
      console.log("remove objects with id: " + id);
      this.canvas.getObjects().forEach((object) => {
        if (object.id == id) {
          this.canvas.remove(object);

          // dynamic
          this.canvas.remove(userDetails);
        }
      });
      this.canvas.renderAll();
    });

    

    this.canvas.add(dialogContainer);
    this.canvas.add(closeButton);

    // dynamic
    this.canvas.add(userDetails);

    // this.currentId += 1;
    //create rect (omhulsel)
    //create rect (close knop, kan ook image worden)
    //create images (de koffie knoppen)
  }
}
