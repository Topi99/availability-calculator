/**
 * Parses an hour in HH:MM format to decimal.
 * @param {string} hour with HH:MM format
 */
export const toDecimal = (hour) => {
  const [hours, minutes] = hour.split(":");
  return parseInt(hours) + parseInt(minutes) / 60;
};

/**
 * Parses an hour from decimal to HH:MM format.
 * @param {number} hour 
 * @returns {string} Hour in HH:MM format
 */
export const toString = (hour) => {
  const hours = parseInt(hour);
  const minutes = hour - hours;
  return `${("0" + hours).slice(-2)}:${("0" + minutes * 60).slice(-2)}`
};
