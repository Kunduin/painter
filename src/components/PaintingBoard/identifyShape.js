export const judgeShape = path => {
  let result = [];
  if (path.length > 3) {
    for (let i = 0; i < path.length - 4; i++) {
      const begin = path[i];
      const center = path[i + 2];
      const end = path[i + 4];
      const aX = center.x - begin.x;
      const aY = center.y - begin.y;
      const bX = end.x - center.x;
      const bY = end.y - center.y;
      let angle = 0;

      angle = Math.atan2(bY, bX) - Math.atan2(aY, aX);
      if (angle > Math.PI) angle -= 2 * Math.PI;
      if (angle < -Math.PI) angle += 2 * Math.PI;
      if (Math.abs(angle) > 1) {
        result.push(center);
        i += 3;
      }
    }
  }

  if (result.length < 2) {
    return {
      type: `圆形`,
      shapedPath: [...path]
    };
  } else {
    return {
      type: `${result.length + 1}边形`,
      shapedPath: [path[0], ...result]
    };
  }
};
