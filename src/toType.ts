/* -------------------------------------------------------------------------- */
/*                                   toType                                   */
/* -------------------------------------------------------------------------- */

export type TypeValue =
  | "array"
  | "async-function"
  | "boolean"
  | "error"
  | "function"
  | "map"
  | "null"
  | "number"
  | "object"
  | "promise"
  | "set"
  | "string"
  | "undefined"
  | "weak-map";

const toType = (obj: unknown): TypeValue => {
  const result = {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .split(/(?=[A-Z])/)
    .join("-")
    .toLowerCase();

  return result as TypeValue;
};

export default toType;
/* ----------------------------- toType() Usage ----------------------------- */
