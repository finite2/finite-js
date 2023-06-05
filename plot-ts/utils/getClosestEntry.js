/**
 *
 * @param {Array} data array of entries to compare against
 * @param {number} value numeric value to compare to
 * @param {func} getter function to extract metric from data entry for comparison to value
 * @returns
 */
export const getClosestEntry = (data, value, getter) => {
  if (value === null || data === null) {
    return null;
  }
  let delta = Infinity;
  let point = null;

  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const compValue = getter(element);
    if (compValue === null) continue;
    const dist = Math.abs(compValue - value);
    if (dist !== null && dist < delta) {
      point = element;
      delta = dist;
    }
  }

  return point;
};
