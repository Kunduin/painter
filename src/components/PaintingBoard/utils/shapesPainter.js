import { CYCLE } from "@/components/PaintingBoard/data/shapeType";
import { IDENTIFY_TEXT_FONT_COLOR } from "@/components/PaintingBoard/data/paintStyle";

/**
 * 绘制每个图形
 * @param item
 * @param canvas
 * @param activeId
 */
export const paintEachShapes = (item, canvas, activeId) => {
  const { type, strokeColor, id, shapedPath, maxX, miniX, maxY, miniY } = item;
  const middle = { x: (maxX + miniX) / 2, y: (maxY + miniY) / 2 };
  canvas.strokeStyle = strokeColor;

  /**
   * 绘制文本
   */
  function drawDescribe() {
    canvas.fillStyle = strokeColor;
    canvas.fillRect(middle.x - 40, middle.y - 15, 80, 30);
    canvas.fillStyle = IDENTIFY_TEXT_FONT_COLOR;
    canvas.font = "20px arial";
    canvas.textBaseline = "middle";
    canvas.textAlign = "center";
    canvas.fillText(type, middle.x, middle.y);
  }

  /**
   * 绘制形状
   */
  function drawShapes() {
    if (type !== CYCLE) {
      canvas.beginPath();
      canvas.moveTo(shapedPath[0].x, shapedPath[0].y);
      for (let i = 1; i < shapedPath.length; i++) {
        canvas.lineTo(shapedPath[i].x, shapedPath[i].y);
      }
      canvas.closePath();
    } else {
      canvas.beginPath();
      const ellipseX = middle.x;
      const ellipseY = middle.y;
      const radiusX = ellipseX - miniX;
      const radiusY = ellipseY - miniY;
      canvas.ellipse(ellipseX, ellipseY, radiusX, radiusY, 0, 0, 2 * Math.PI);
      canvas.closePath();
    }
  }

  /**
   * 绘制选中区域
   */
  function drawSelection() {
    canvas.fillStyle = strokeColor;
    canvas.strokeRect(
      miniX - 10,
      miniY - 10,
      maxX - miniX + 20,
      maxY - miniY + 20
    );
    canvas.fill();
  }

  if (type) {
    drawShapes();
    if (activeId === id) {
      drawSelection();
    } else {
      canvas.stroke();
    }
    drawDescribe();
  }
};
