<template>
  <div class="canvas-body">
    <canvas
      ref="drawingBoard"
      :width="width"
      :height="height"
      @mousedown="canvasOnMouseDown"
      @mousemove="canvasOnMouseMove"
      @mouseup="canvasOnMouseUp"
      @click="canvasOnClicked"/>
  </div>
</template>
<script>
import PaintingBrush from "@/components/PaintingBoard/PaintingBoard";

export default {
  name: "PaintingBoard",
  props: {
    value: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      isDown: false
    };
  },
  watch: {
    value(newShapes, oldShapes = []) {
      if (newShapes.length !== oldShapes.length) {
        this.paintingBrush.setShapes(newShapes);
      }
    }
  },
  mounted() {
    const canvas = this.$refs.drawingBoard;
    this.paintingBrush = new PaintingBrush(canvas);
    this.paintingBrush.setShapes(this.value);
  },
  methods: {
    canvasOnMouseDown: function(event) {
      this.isDown = true;
      const { offsetX, offsetY } = event;
      this.paintingBrush.startDrawAShape({
        x: offsetX,
        y: offsetY
      });
    },
    canvasOnMouseMove: function(event) {
      const { offsetX, offsetY } = event;
      if (this.isDown) {
        this.paintingBrush.keepDrawingAShape({
          x: offsetX,
          y: offsetY
        });
      } else {
        this.paintingBrush.hoverItems({
          x: offsetX,
          y: offsetY
        });
      }
    },
    canvasOnMouseUp: function() {
      this.isDown = false;
      this.paintingBrush.endDrawAShape();
      this.$emit("input", this.paintingBrush.getShapes());
    },
    canvasOnClicked: function(event) {
      console.log(event);
      console.log(this.shapes);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.canvas-body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url("../../assets/dark-wood.jpg");
}
</style>
