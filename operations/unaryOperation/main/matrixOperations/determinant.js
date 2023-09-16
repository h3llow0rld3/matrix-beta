import { MatrixEvents } from "../../../../matrix/matrixEvents.js";
import { Minor } from "./minor.js";

export class Determinant {
  constructor(arrMatrix) {
    this.arrMatrix = arrMatrix;
    this.minor = new Minor(arrMatrix);
  }

  getDeterminant() {
    return this._determinant(this.arrMatrix);
  }

  _determinant(matrix) {
    if (matrix.length == 1) {
      return matrix[0][0];
    }
  }
}