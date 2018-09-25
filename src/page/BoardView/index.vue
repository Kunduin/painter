<template>
  <div class="board-view">
    <div class="logo">
      Painter
    </div>
    <div class="action">
      <el-tooltip
        class="action-item"
        effect="dark"
        content="清空画板"
        placement="left">
        <div @click="clearBoard">
          <img src="../../assets/round-delete_outline-24px.svg">
        </div>
      </el-tooltip>
      <el-tooltip
        class="action-item"
        effect="dark"
        content="保存画板"
        placement="left">
        <div @click="saveBoard">
          <img src="../../assets/round-save_alt-24px.svg">
        </div>
      </el-tooltip>
    </div>
    <painting-board v-model="shapes"/>
  </div>
</template>
<script>
import PaintingBoard from "@/components/PaintingBoard";
const SHAPES = "shapes";

export default {
  name: "BoardView",
  components: {
    "painting-board": PaintingBoard
  },
  data() {
    return {
      shapes: []
    };
  },
  created() {
    // 每次加载页面读取存储信息
    this.shapes = JSON.parse(localStorage.getItem(SHAPES)) || [];
  },
  methods: {
    clearBoard() {
      this.shapes = [];
    },
    /**
     * 存储形状状态
     */
    saveBoard() {
      localStorage.setItem(SHAPES, JSON.stringify(this.shapes));
      this.$message({
        showClose: true,
        message: "保存成功",
        type: "success"
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.board-view {
  background-color: #191515;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
}
.logo {
  color: white;
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 30px;
  font-family: "Monoton", cursive;
}

.action {
}
.action {
  position: absolute;
  top: 20px;
  right: 20px;
  .action-item {
    width: 40px;
    height: 40px;
    display: flex;
    fill: white;
    justify-content: center;
    align-items: center;
    border: 1.5px solid white;
    border-radius: 50%;
    cursor: pointer;
    margin-bottom: 20px;
  }
}
</style>
