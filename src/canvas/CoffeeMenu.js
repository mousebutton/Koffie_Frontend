import {fabric} from 'fabric'
import axios from "axios";
import config from "../config/config";
const baseUrl = config.url + "/api"

var selectedCoffee = '';
var sugar = false;
var milk = false;
var dialogId;
var coffeeText = '';

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
    let containerHeight = 360;
    let dialogContainer = this.buildContainer(containerWidth, containerHeight, left, top);
    let posLeft = dialogContainer.left + containerWidth - 25;
    let posTop = dialogContainer.top + 5;
    let closeButton = this.buildCloseButton(posLeft, posTop);
    let orderButton = this.buildOrderButton(455, 340);

    axios
      .get(baseUrl + "/admin/drinks/all", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then((e) => {
        let coffees = e.data;
        let pos = [];
        pos[0] = {left: dialogContainer.left + 25, top: dialogContainer.top + 50};
        pos[1] = {left: dialogContainer.left + 25, top: dialogContainer.top + 100};
        pos[2] = {left: dialogContainer.left + 75, top: dialogContainer.top + 50};
        pos[3] = {left: dialogContainer.left + 75, top: dialogContainer.top + 100};
        pos[4] = {left: dialogContainer.left + 125, top: dialogContainer.top + 50};
        pos[5] = {left: dialogContainer.left + 125, top: dialogContainer.top + 100};
        pos[6] = {left: dialogContainer.left + 25, top: dialogContainer.top + 150};
        pos[7] = {left: dialogContainer.left + 75, top: dialogContainer.top + 150};

        for (let i = 0; i < coffees.length; i++) {
          let coffeeType = coffees[i].name;
          let coffeeUrl = coffees[i].imageUrl;
          this.addCoffeeType(coffeeType, coffeeUrl, pos[i].left, pos[i].top);
        }
      })
      .catch(function (error) {
        console.log(error);
      });


    closeButton.on("mouseup", (e) => {
      this.selectedCoffee = '';
      this.milk = false;
      this.sugar = false;
      let id = e.target.id;
      this.canvas.getObjects().forEach((object) => {
        if (object.id == id) {
          this.canvas.remove(object);
        }
      });
      this.updateTextObjects();
      this.canvas.renderAll();
    });

    orderButton.on("mouseup", (e) => {
      this.orderCoffee();
    });
    this.dialogId = dialogContainer.id;
    this.canvas.add(dialogContainer);
    this.buildSugarbutton('../static/no-sugar.png', 490,300);
    this.buildMilkButton('../static/no-milk.png', 570, 300);
    this.canvas.add(closeButton);
    this.canvas.add(orderButton);
    
  }

  buildSugarbutton(coffeeUrl, left, top) {
    fabric.Image.fromURL(coffeeUrl, img => {
      img.left = left;
      img.top = top;
      img.centeredRotation = true;
      img.hoverCursor = "pointer";
      img.selectable = false;
      img.originX = "center";
      img.originY = "center";
      img.scaleX = 0.06;
      img.scaleY = 0.06;
      img.objectType = "coffee";
      img.id = this.currentId;
      img.on("mouseup", (e) => {
          this.sugar = !this.sugar;
          this.updateSugarButton();
      });
      this.canvas.add(img);
    });
  }

  updateSugarButton() {
    let imageUrl = this.sugar? '../static/sugar.png' : '../static/no-sugar.png';
    fabric.Image.fromURL(imageUrl, img => {
      img.left = 490;
      img.top = 300;
      img.centeredRotation = true;
      img.hoverCursor = "pointer";
      img.selectable = false;
      img.originX = "center";
      img.originY = "center";
      img.scaleX = 0.06;
      img.scaleY = 0.06;
      img.objectType = "coffee";
      img.id = this.currentId;
      img.on("mouseup", (e) => {
        this.sugar = !this.sugar;
        this.updateSugarButton();
    });

      this.canvas.add(img);
    });
  }

  buildMilkButton(coffeeUrl, left, top) {
    fabric.Image.fromURL(coffeeUrl, img => {
      img.left = left;
      img.top = top;
      img.centeredRotation = true;
      img.hoverCursor = "pointer";
      img.selectable = false;
      img.originX = "center";
      img.originY = "center";
      img.scaleX = 0.06;
      img.scaleY = 0.06;
      img.objectType = "coffee";
      img.id = this.currentId;
      img.on("mouseup", (e) => {
        this.milk = !this.milk;
        this.updateMilkButton();
      });
      this.canvas.add(img);
    });
  }

  updateMilkButton() {
    let imageUrl = this.milk? '../static/milk.png' : '../static/no-milk.png';
    fabric.Image.fromURL(imageUrl, img => {
      img.left = 570;
      img.top = 300;
      img.centeredRotation = true;
      img.hoverCursor = "pointer";
      img.selectable = false;
      img.originX = "center";
      img.originY = "center";
      img.scaleX = 0.06;
      img.scaleY = 0.06;
      img.objectType = "coffee";
      img.id = this.currentId;
      img.on("mouseup", (e) => {
        this.milk = !this.milk;
        this.updateMilkButton();
    });

      this.canvas.add(img);
    });
  }

  buildOrderButton(left, top) {
    return new fabric.Rect({
      width: 160, height: 40,
      fill: "lightGreen",
      stroke: "green",
      strokeWidth: 2,
      hoverCursor: "pointer",
      left: left,
      top: top,
      selectable: false,
      centeredRotation: true,
      objectType: "dialogClose",
      id: this.currentId,
      rx: 5,
      ry: 5
    });
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

  buildCoffeeTypeText(text) {
    return new fabric.Text(text,  {
        left: 480,
        top: 230,
        fontSize: 24,
        fontFamily: 'Helvetica',
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true
    });
  }

  addCoffeeType(coffeeType, coffeeUrl, left, top) {
    fabric.Image.fromURL(coffeeUrl, img => {
      img.left = left;
      img.top = top;
      img.centeredRotation = true;
      img.hoverCursor = "pointer";
      img.selectable = false;
      img.originX = "center";
      img.originY = "center";
      img.scaleToHeight(50);
      img.objectType = "coffee";
      img.coffeeType = coffeeType;
      img.id = this.currentId;

      img.on("mouseup", (e) => {
        this.sugar = false;
        this.milk = false;
        this.updateMilkButton();
        this.updateSugarButton();
        this.selectedCoffee = coffeeType;
        this.coffeeText = this.buildCoffeeTypeText(coffeeType);
        this.updateTextObjects();
        this.canvas.add(this.coffeeText);
      });
      this.canvas.add(img);
    });
  }

  updateTextObjects = function() {
    this.canvas.getObjects().forEach((object) => {
      if(object.left === this.coffeeText.left && object.top === this.coffeeText.top) {
        this.canvas.remove(object);
      }
    });
  }

  orderCoffee = function() {
    let user = JSON.parse(localStorage.getItem("user"));
    let id = user.id;

    if (this.selectedCoffee != undefined && this.selectedCoffee != '') {
      axios
      .post(baseUrl + "/users/makeorder", {
        "coffee": this.selectedCoffee,
        "milk": this.milk,
        "sugar": this.sugar,
        "userId": id
      })
      .then((e) => {
        this.selectedCoffee = '';
        this.milk = false;
        this.sugar = false;
        if(e.status === 200) {
          this.canvas.getObjects().forEach((object) => {
            if (object.id == this.dialogId) {
              this.canvas.remove(object);
              this.updateTextObjects();
            }
          });
          this.canvas.renderAll();
        }
      });
    }

    else {
      this.coffeeText = this.buildCoffeeTypeText('Select drink');
      this.updateTextObjects();
      this.canvas.add(this.coffeeText);
    }

  }
}
