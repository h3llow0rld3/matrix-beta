export class MatrixResult {
  static getMatrix(arrMatrix) {
    return this._createMatrix(arrMatrix);
  }

  static _createMatrix(arrMatrix) {
    const matrix = document.createElement("table");
    matrix.classList.add("matrix-result");
    // this._addEvents(matrix);

    for (let i = 0; i < arrMatrix.length; ++i) {
      let row = document.createElement("tr");
      for (let j = 0; j < arrMatrix[i].length; ++j) {
        let column = document.createElement("td");

        column.setAttribute("data-prompt", `Строка: ${i + 1} Столбец: ${j + 1}`);
        column.textContent = arrMatrix[i][j];
        row.append(column);
      }
      matrix.append(row);
    }

    return matrix;
  }
}