import {fabric} from 'fabric'
import PersoonDialog from "./PersoonDialog"

export default class Persoon {

  // dynamic
  constructor(canvas, chair) { //imgLocation, left, top, rotation, user

    let user = chair.user === null ? null : chair.user;
    let imgLocation = chair.user === null ? '/static/stoel.png' : chair.user.avatar;
    let leftPos = chair.leftPos;
    let topPos = chair.topPos;
    let rotation = chair.rotation;
    
    this.persoonDialog = new PersoonDialog(canvas);

    fabric.Image.fromURL(imgLocation, img => {
      // user avatar on the canvas
      let scale = 50 / img.width;
      img.scaleX = scale;
      img.scaleY = scale;

      img.left = leftPos;
      img.top = topPos;
      img.centeredRotation = true;
      img.hoverCursor = "pointer";
      img.selectable = false;
      img.originX = "center";
      img.originY = "center";
      img.angle = rotation;
      img.objectType = "persoon";

      img.on("mouseup", (e) => {
        if (user != null) {
          this.persoonDialog.buildDialog(e.target.left, e.target.top, user);
        }
      });

      canvas.add(img);
      // canvas.renderAll();
    });
  }

  // static
  // constructor(canvas, imgLocation, left, top, rotation, user) {
  //   // Add chair to canvas
  //   this.persoonDialog = new PersoonDialog(canvas);

  //   fabric.Image.fromURL(imgLocation, img => {
  //     img.left = left;
  //     img.top = top;
  //     img.centeredRotation = true;
  //     img.hoverCursor = "pointer";
  //     img.selectable = false;
  //     img.originX = "center";
  //     img.originY = "center";
  //     img.angle = rotation;
  //     img.objectType = "persoon";

  //     img.on("mouseup", (e) => {
  //       this.persoonDialog.buildDialog(e.target.left, e.target.top);
  //     });

  //     canvas.add(img);
  //     // canvas.renderAll();
  //   });
  // }

}
