/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (typeof size === 'undefined') {
    return string;
  }

  let readyString = '';
  let count = 1;

  if (string.length && size) {
    for (let index = 0; index < string.length; index++) {
      if (!index) {
        readyString += string[index];
        continue;
      }

      if (string[index - 1] === string[index]) {
        if (count < size) {
          readyString = readyString + string[index];
          count += 1;
        }
      } else {
        readyString = readyString + string[index];
        count = 1;
      }
    }
  }
  return readyString;
}
