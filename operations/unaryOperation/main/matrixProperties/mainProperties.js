import { PropertiesIfMatrixSquare } from "./propertiesIfMatrixSquare.js";

export class MainProperties {
  constructor(matrixArr) {
    this.matrixArr = matrixArr;
    this.matrixSize = this._getMatrixSize();
  }

  generateProperties() {
    const properties = {
      size: this.matrixSize,
      isEmpty: this._isEmpty(),
      isSquare: this._isSquare(),
      isNull: this._isNull(),
    };
    
    this.properties = properties;

    if (properties.isSquare) {
      const propertiesIfMatrixSquare = new PropertiesIfMatrixSquare(this);
      propertiesIfMatrixSquare.setProperties();
    }
  }

  _getMatrixSize() {
    const matrixSize = {};
    const rows = this.matrixArr.length;

    matrixSize.rows = rows;
    if (rows === 0)
      matrixSize.columns = 0;
    else
      matrixSize.columns = this.matrixArr[0].length;

    return matrixSize;
  }

  _isEmpty() {
    return this.matrixSize.rows === 0;
  }

  _isNull() {
    for (let i = 0; i < this.matrixSize.rows; ++i) {
      for (let j = 0; j < this.matrixSize.columns; ++j) {
        if (this.matrixArr[i][j] !== 0)
          return false;
      }
    }

    return true;
  }

  _isSquare() {
    return !this._isEmpty() && (this.matrixSize.rows == this.matrixSize.columns);
  }

  // _isSymmetric() {
  //   const matrixArr = this.matrixArr;
  //   const rows = this.size.rows;

  //   if (!MainProperties._isSquare(matrixArr)) {
  //     return false;
  //   }

  //   if (rows === 0) {
  //     return false;
  //   }

  //   for (let i = 0; i < rows; ++i) {
  //     for (let j = 0; j < i; ++j) {
  //       if (matrixArr[i][j] !== matrixArr[j][i]) {
  //         return false;
  //       }
  //     }
  //   }

  //   return true;
  // }
}