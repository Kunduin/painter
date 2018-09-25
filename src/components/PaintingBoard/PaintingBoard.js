import { generateId } from "@/util/idGenerator";
import {
  findMaxX,
  findMaxY,
  findMiniX,
  findMiniY,
  getRangeOfXY
} from "@/components/PaintingBoard/PathUtil";
import { judgeShape } from "@/components/PaintingBoard/identifyShape";
import toMaterialStyle from "material-color-hash";
import {
  IDENTIFY_TEXT_BACKGROUND_COLOR,
  IDENTIFY_TEXT_FONT_COLOR
} from "@/components/PaintingBoard/paintStyle";

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

  setShapes = shapes => {
    this.shapes = shapes;
    this.repaintAllShapes();
  };

  getShapes = () => {
    return this.shapes.slice(0);
  };

  /**
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
   * @public
   */
  endDrawAShape = () => {
    const canvas = this.canvas;
    canvas.closePath();
    canvas.restore();
    this.identifyTheFinalShape();
    console.log(this.shapes);
    return this.shapes;
  };

  /**
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
    console.log(type);
    this.repaintAllShapes();
  };

  /**
   * @private
   */
  drawIdentifyRect = path => {
    const maxX = findMaxX(path);
    const miniX = findMiniX(path);
    const maxY = findMaxY(path);
    const miniY = findMiniY(path);
    const canvas = this.canvas;
    console.log(miniX, miniY, maxX, maxX);
    canvas.strokeRect(miniX, miniY, maxX - miniX, maxY - miniY);
  };

  /**
   * @private
   */
  drawUserHandDrawnShape = pathFunction => {};

  /**
   * @private
   */
  repaintAllShapes = (activeId = "") => {
    this.cleanCanvas();
    const { canvas, shapes } = this;
    canvas.save();
    canvas.lineWidth = 3;

    shapes.forEach(item => {
      const {
        type,
        strokeColor,
        id,
        shapedPath,
        maxX,
        miniX,
        maxY,
        miniY
      } = item;
      const middle = { x: (maxX + miniX) / 2, y: (maxY + miniY) / 2 };
      canvas.strokeStyle = strokeColor;
      if (activeId === id) {
        canvas.strokeRect(
          miniX - 10,
          miniY - 10,
          maxX - miniX + 20,
          maxY - miniY + 20
        );
      }
      if (type) {
        if (type !== "圆形") {
          canvas.beginPath();
          canvas.moveTo(shapedPath[0].x, shapedPath[0].y);
          for (let i = 1; i < shapedPath.length; i++) {
            canvas.lineTo(shapedPath[i].x, shapedPath[i].y);
          }
        } else {
          canvas.beginPath();
          const ellipseX = middle.x;
          const ellipseY = middle.y;
          const radiusX = ellipseX - miniX;
          const radiusY = ellipseY - miniY;
          canvas.ellipse(
            ellipseX,
            ellipseY,
            radiusX,
            radiusY,
            0,
            0,
            2 * Math.PI
          );
        }
        canvas.closePath();
        if (activeId === id) {
          canvas.fillStyle = strokeColor;
          canvas.fill();
        } else {
          canvas.stroke();
        }

        canvas.fillStyle = strokeColor;
        canvas.fillRect(middle.x - 40, middle.y - 15, 80, 30);
        canvas.fillStyle = IDENTIFY_TEXT_FONT_COLOR;
        canvas.font = "20px arial";
        canvas.textBaseline = "middle";
        canvas.textAlign = "center";
        canvas.fillText(type, middle.x, middle.y);
      }
    });
    canvas.restore();
  };

  /**
   * @private
   */
  cleanCanvas = () => {
    const { canvas, rawCanvasHeight, rawCanvasWidth } = this;
    canvas.clearRect(0, 0, rawCanvasWidth, rawCanvasHeight);
  };
}
