<template>
  <div>
    <div>
      <canvas id="c"></canvas>
    </div>
  </div>
</template>

<script>
  import Canvas from "../canvas/Canvas";

  export default {
    name: "Canvas",

    methods: {},

    mounted() {
      this.canvas = new Canvas('c');

      this.canvas.addImage("/static/stoel.png", 200, 200, 0);
      this.canvas.addImage("/static/stoel.png", 200, 260, 0);
      this.canvas.addImage("/static/stoel.png", 360, 200, 180);
      this.canvas.addImage("/static/stoel.png", 360, 260, 180);
      // this.canvas.addImage("/static/stoel.png", 300, 100, 180);
      // this.canvas.addImage("/static/stoel.png", 400, 200, 270);
    }
  }
</script>

<style scoped>

</style>
