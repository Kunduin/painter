import { generateId } from "@/util/idGenerator";
import { getRangeOfXY } from "@/components/PaintingBoard/utils/pathUtil";
import { judgeShape } from "@/components/PaintingBoard/utils/identifyShape";
import toMaterialStyle from "material-color-hash";
import { paintEachShapes } from "@/components/PaintingBoard/utils/shapesPainter";

export default class paintingBrush {
  shapes = [];
  rawCanvas = null;
  canvas = null;
  rawCanvasHeight = 0;
  rawCanvasWidth = 0;
  selectedItemId = null;

  constructor(canvas) {
    this.rawCanvas = canvas;
    this.rawCanvasHeight = canvas.height;
    this.rawCanvasWidth = canvas.width;
    this.canvas = canvas.getContext("2d");
  }

  /**
   * 设置形状
   * @param shapes
   */
  setShapes = shapes => {
    this.shapes = shapes;
    this.repaintAllShapes();
  };

  /**
   * 获得形状
   * @return {*[]}
   */
  getShapes = () => {
    return this.shapes.slice(0);
  };

  /**
   * 开始绘制图像
   * @public
   */
  startDrawAShape = ({ x, y }) => {
    const canvas = this.canvas;
    const id = generateId();
    const { backgroundColor } = toMaterialStyle(id, 700);
    const strokeColor = backgroundColor;
    this.shapes.push({
      id,
      strokeColor,
      path: [{ x, y }]
    });

    canvas.beginPath();
    canvas.lineWidth = 3;
    canvas.strokeStyle = strokeColor;
    canvas.moveTo(x, y);
    canvas.save();
    return this.shapes;
  };

  /**
   * 正在绘制图像
   * @public
   */
  keepDrawingAShape = ({ x, y }) => {
    const canvas = this.canvas;
    const shape = this.shapes.pop();
    shape.path.push({ x, y });
    this.shapes.push(shape);
    canvas.lineTo(x, y);
    canvas.stroke();
    return this.shapes;
  };

  /**
   * 结束绘制形状
   * @public
   */
  endDrawAShape = () => {
    const canvas = this.canvas;
    canvas.closePath();
    canvas.restore();
    this.identifyTheFinalShape();
    return this.shapes;
  };

  /**
   * 选中图形
   * @public
   */
  hoverItems = ({ x, y }) => {
    const { shapes } = this;
    let { selectedItemId } = this;
    shapes.forEach(item => {
      const { maxX, miniX, maxY, miniY } = item;
      if (x < maxX && x > miniX && y < maxY && y > miniY) {
        this.repaintAllShapes(item.id);
        selectedItemId = item.id;
      } else if (!selectedItemId) {
        this.repaintAllShapes();
        selectedItemId = null;
      }
    });
  };

  /**
   * 判读用户绘制图形
   * @private
   */
  identifyTheFinalShape = () => {
    const theFinalShape = this.shapes.pop();
    const { path = [] } = theFinalShape;
    const identifiedShapes = judgeShape(path);
    const { type, shapedPath } = identifiedShapes;
    const rangeOfXY = getRangeOfXY(shapedPath);
    this.shapes.push({
      ...theFinalShape,
      ...rangeOfXY,
      type,
      shapedPath
    });
    this.repaintAllShapes();
  };

  /**
   * 重绘所有图形
   * @private
   */
  repaintAllShapes = activeId => {
    this.cleanCanvas();
    const { canvas, shapes } = this;
    canvas.save();
    canvas.lineWidth = 3;
    shapes.forEach(item => {
      paintEachShapes(item, canvas, activeId);
    });
    canvas.restore();
  };

  /**
   * 清空canvas区域
   * @private
   */
  cleanCanvas = () => {
    const { canvas, rawCanvasHeight, rawCanvasWidth } = this;
    canvas.clearRect(0, 0, rawCanvasWidth, rawCanvasHeight);
  };
}
