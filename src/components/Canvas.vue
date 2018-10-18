<template>
  <div>
    <div>
      <canvas id="c"></canvas>
    </div>
    <div>
      <button>Click</button>
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
      this.canvas.addImage("/static/logo.png");

    }
  }
</script>

<style scoped>

</style>
