
/**
 * Returns whether a value can be parsed as a number
 * 
 * @param value a value to test
 */
export function isNumberParsable(value: any) {
  return !isNaN(Number(value))
}