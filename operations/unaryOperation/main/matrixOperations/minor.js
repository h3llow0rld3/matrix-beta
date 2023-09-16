export class Minor {
  constructor(arrMatrix) {
    this.arrMatrix = arrMatrix;
  }

  getMinor(row, column) {
    const minorMatrix = this.arrMatrix
      .filter((_, i) => i !== row)
      .map(rowArr => rowArr.filter((_, j) => j !== column));

    return minorMatrix;
  }
}