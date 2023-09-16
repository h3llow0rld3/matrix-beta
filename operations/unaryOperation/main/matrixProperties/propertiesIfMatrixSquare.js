export class PropertiesIfMatrixSquare {
  constructor(mainProperties) {
    this.matrixArr = mainProperties.matrixArr;
    this.properties = mainProperties.properties;
    this.size = mainProperties.matrixSize.rows;
  }

  setProperties() {
    const properties = this._getDiagonalRelatedProperties();
    this.properties.propertiesIfMatrixSquare = properties;
  }

  _getDiagonalRelatedProperties() {
    const matrixArr = this.matrixArr;
    const size = this.size;
    const properties = {
      isDiagonal: true,
      isIdentity: true,
      isUpperTriangular: true,
      isLowerTriangular: true,
      isSymmetric: true,
    };

    if (this.properties.isNull) {
      properties.isIdentity = false;
      return properties;
    }
    
  
    for (let i = 0; i < size; ++i) {
      for (let j = 0; j <= i; ++j) {
        if (i === j) {
          if (matrixArr[i][j] !== 1) {
            properties.isIdentity = false;
          }
        } else {
          if (matrixArr[i][j] !== 0 || matrixArr[j][i] !== 0) {
            properties.isDiagonal = false;
            properties.isIdentity = false;
          }
          if (matrixArr[i][j] !== 0) {
            properties.isLowerTriangular = false;
          }
          if (matrixArr[j][i] !== 0) {
            properties.isUpperTriangular = false;
          }
          if (matrixArr[i][j] !== matrixArr[j][i]) {
            properties.isSymmetric = false;
          }
        }
      }
    }
  
    return properties;
  }
}