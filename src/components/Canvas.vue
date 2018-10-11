<template>
  <div>
    <canvas id="c"></canvas>
  </div>
</template>

<script>
  import {fabric} from 'fabric'

  export default {
    name: "Canvas",

    methods: {
      getRect(l, r) {
        let rect = new fabric.Rect({
          width: 100, height: 100,
          left: l, top: r,
          fill: 'red',
          angle: 0
        });

        return rect;
      },
      getCircle: function (x, y, r, pos) {
        let points = this.getCirclePoints(x, y, r, pos);
        return new fabric.Circle({
          radius: r,
          fill: this.getRandomColor(),
          left: points.x,
          top: points.y,
          selectable: false
        });
      },
      getCirclePoints(cx, cy, r, angle) {
        return {
          x: cx + (r + 50 * Math.cos(angle * Math.PI / 180)),
          y: cy + (r + 50 * Math.sin(angle * Math.PI / 180))
        };
      },
      getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
    },
    mounted() {
      var canvas = new fabric.Canvas('c');
      let angle = 0;

      canvas.renderOnAddRemove = false;

      canvas.setWidth(1500);
      canvas.setHeight(1500);

      let getCircle = this.getCircle.bind(this);
      setInterval(function () {
        angle += 3;
        // canvas.clear();
        canvas.add(getCircle(300, 200, 20, angle));
        // canvas.add(getCircle(100, 200, 20, angle+100));
        // canvas.add(getCircle(400, 300, 20, angle+200));
        // canvas.add(getCircle(500, 500, 20, angle+200));
        canvas.renderAll();
        console.log(angle/3);
      }, 100 );



      // canvas.add(rect);
      // setInterval(function () {
      //   if (rect.left >= 550) {
      //     lefOrRight = -1;
      //   } else if (rect.left <= 450) {
      //     lefOrRight = 1;
      //   }
      //   rect.left += lefOrRight;
      //   canvas.renderAll();
      // }, 5);
    }
  }
</script>

<style scoped>

</style>
