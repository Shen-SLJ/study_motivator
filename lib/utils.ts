
/**
 * Returns whether a value can be parsed as a number
 * 
 * @param value a value to test
 */
function isNumberParsable(value: any) {
  return !isNaN(Number(value))
}