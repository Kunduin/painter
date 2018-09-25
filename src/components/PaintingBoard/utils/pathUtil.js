/**
 * 寻找路径最大x
 * @param path
 */
export const findMaxX = (path = []) => {
  return path.reduce((pre, cur) => {
    return pre.x > cur.x ? pre : cur;
  }).x;
};

/**
 * 寻找路径最大y
 * @param path
 */
export const findMaxY = (path = []) => {
  return path.reduce((pre, cur) => {
    return pre.y > cur.y ? pre : cur;
  }).y;
};

/**
 * 寻找路径最小x
 * @param path
 */
export const findMiniX = (path = []) => {
  return path.reduce((pre, cur) => {
    return pre.x < cur.x ? pre : cur;
  }).x;
};

/**
 * 寻找路径最小y
 * @param path
 */
export const findMiniY = (path = []) => {
  return path.reduce((pre, cur) => {
    return pre.y < cur.y ? pre : cur;
  }).y;
};

/**
 * 寻找路径最大x 最小x 最大y 最小y
 * @param path
 */
export const getRangeOfXY = path => {
  return {
    maxX: findMaxX(path),
    miniX: findMiniX(path),
    maxY: findMaxY(path),
    miniY: findMiniY(path)
  };
};
