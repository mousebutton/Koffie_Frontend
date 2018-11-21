import {fabric} from 'fabric'

export default class CoffeeMenu {

  constructor(canvas) {
    this.id = "";
    this.canvas = canvas;
    this.currentId = Math.round(Math.random() * 10000000);

    this.coffeeTypes = [];
    this.coffeeTypes["americano"] = "/static/coffees/americano.png";
    this.coffeeTypes["cappucino"] = "/static/coffees/cappucino.png";
    this.coffeeTypes["cocao"] = "/static/coffees/Cocao.png";
    this.coffeeTypes["espresso"] = "/static/coffees/espresso.png";
  }

  buildDialog(left, top) {
    let containerWidth = 180;
    let containerHeight = 200;

    let dialogContainer = this.buildContainer(containerWidth, containerHeight, left, top);

    let posLeft = dialogContainer.left + containerWidth - 25;
    let posTop = dialogContainer.top + 5;

    let closeButton = this.buildCloseButton(posLeft, posTop);

    this.addCoffeeType("americano", dialogContainer.left + 25, dialogContainer.top + 50);
    this.addCoffeeType("cappucino", dialogContainer.left + 25, dialogContainer.top + 100);
    this.addCoffeeType("cocao", dialogContainer.left + 75, dialogContainer.top + 50);

    closeButton.on("mouseup", (e) => {
      let id = e.target.id;
      console.log("remove objects with id: " + id);
      this.canvas.getObjects().forEach((object) => {
        if (object.id == id) {
          this.canvas.remove(object);
        }
      });
      this.canvas.renderAll();
    });

    this.canvas.add(dialogContainer);
    this.canvas.add(closeButton);
  }

  buildContainer(containerWidth, containerHeight, left, top) {
    return new fabric.Rect({
      width: containerWidth, height: containerHeight,
      fill: "#aaa49d",
      stroke: "black",
      strokeWidth: 1,

      left: left + 45,
      top: top - 60,
      selectable: false,
      centeredRotation: true,
      objectType: "dialogContainer",
      id: this.currentId,
      rx: 5,
      ry: 5
    });
  }

  buildCloseButton(posLeft, posTop) {
    return new fabric.Rect({
      width: 20, height: 20,
      fill: "red",
      stroke: "red",
      strokeWidth: 1,
      hoverCursor: "pointer",
      left: posLeft,
      top: posTop,
      selectable: false,
      centeredRotation: true,
      objectType: "dialogClose",
      id: this.currentId,
      rx: 5,
      ry: 5
    });
  }

  addCoffeeType(coffeeType, left, top) {

    fabric.Image.fromURL(this.coffeeTypes[coffeeType], img => {
      img.left = left;
      img.top = top;
      img.centeredRotation = true;
      img.hoverCursor = "pointer";
      img.selectable = false;
      img.originX = "center";
      img.originY = "center";
      img.scaleX = 0.3;
      img.scaleY = 0.3;

      img.objectType = "coffee";
      img.coffeeType = coffeeType;
      img.id = this.currentId;

      img.on("mouseup", (e) => {
        alert("je wilt deze coffee: " + e.target.coffeeType);
      });

      this.canvas.add(img);
    });
  }
}
