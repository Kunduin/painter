export const findMaxX = (path = []) => {
  return path.reduce((pre, cur) => {
    return pre.x > cur.x ? pre : cur;
  }).x;
};

export const findMaxY = (path = []) => {
  return path.reduce((pre, cur) => {
    return pre.y > cur.y ? pre : cur;
  }).y;
};

export const findMiniX = (path = []) => {
  return path.reduce((pre, cur) => {
    return pre.x < cur.x ? pre : cur;
  }).x;
};

export const findMiniY = (path = []) => {
  return path.reduce((pre, cur) => {
    return pre.y < cur.y ? pre : cur;
  }).y;
};

export const getRangeOfXY = path => {
  return {
    maxX: findMaxX(path),
    miniX: findMiniX(path),
    maxY: findMaxY(path),
    miniY: findMiniY(path)
  };
};
