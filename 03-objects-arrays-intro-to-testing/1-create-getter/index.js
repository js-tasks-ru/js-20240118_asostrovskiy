/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const splitPath = path.split('.');

  return function (obj) {
    let data = obj;

    if (!splitPath.length) {
      return undefined;
    }

    for (let key = 0; key < splitPath.length; key++) {
      if (data.hasOwnProperty(splitPath[key])) {
        data = data[splitPath[key]];
      } else {
        data = undefined;
        break;
      }
    }
    return data;
  };
}
