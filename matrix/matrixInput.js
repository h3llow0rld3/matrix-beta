import { MatrixEvents } from "./matrixEvents.js";

export class MatrixInput {
  constructor() {
    this._rows = 3;
    this._columns = 3;
    this._maxLengthValue = 6;
    this._initMatrixContainer();
  }

  update(rows, columns) {
    let matrix = this._matrixContainer.getElementsByTagName("table")[0];
    const arrMatrix = this.load();

    this._rows = rows;
    this._columns = columns;

    matrix.remove();
    matrix = this._createMatrix(arrMatrix);

    this._matrixContainer.append(matrix);
  }

  load() {
    const matrixContainer = this._matrixContainer;
    const arrMatrix = [];
    const rows = matrixContainer.getElementsByClassName("row");

    for (const row of rows) {
      const arrRow = [];
      const columns = row.getElementsByClassName("column");

      for (const column of columns) {
        const input = column.getElementsByTagName("input")[0];
        arrRow.push(+input.value);
      }
      arrMatrix.push(arrRow);
    }

    return arrMatrix;
  }

  paste(matrix) {
    this._rows = matrix.rows;
    this._columns = matrix.columns;
    this._createMatrix(matrix.matrix);
  }

  createSizeInputs() {
    /*
    <inputsContainer>
      <rowsInputContainer>
        <rowsText>text</rowsText>
        <inputRows />
      </rowsInputContainer>

      <columnsInputContainer>
        <columnsText>text</columnsText>
        <inputColumns />
      </columnsInputContainer>
    </inputsContainer>
    */
    const inputsContainer = document.createElement("div");
    const columnsInputContainer = document.createElement("span");
    const rowsInputContainer = document.createElement("span");
    const rowsText = document.createElement("span");
    const columnsText = document.createElement("span");
    const inputColumns = document.createElement("input");
    const inputRows = document.createElement("input");

    inputColumns.matrixInput = this;
    inputRows.matrixInput = this;

    inputRows.setAttribute("maxlength", "3");
    inputColumns.setAttribute("maxlength", "3");

    inputRows.classList.add("numeric-input");
    inputColumns.classList.add("numeric-input");

    inputRows.value = this._rows;
    inputColumns.value = this._columns;

    inputsContainer.classList.add("inputs-container");

    rowsText.textContent = "Строки: ";
    columnsText.textContent = "Столбцы: ";

    columnsInputContainer.append(columnsText);
    rowsInputContainer.append(rowsText);

    columnsInputContainer.append(inputColumns);
    rowsInputContainer.append(inputRows);

    columnsInputContainer.classList.add("columns-input-container");
    rowsInputContainer.classList.add("rows-input-container");

    columnsInputContainer.inputElem = inputColumns;
    rowsInputContainer.inputElem = inputRows;

    inputsContainer.append(rowsInputContainer);
    inputsContainer.append(columnsInputContainer);

    inputsContainer.columnsInputContainer = columnsInputContainer;
    inputsContainer.rowsInputContainer = rowsInputContainer;

    this.inputsContainer = inputsContainer;

    return inputsContainer;
  }

  _initMatrixContainer() {
    let matrixContainer = document.createElement("div");

    matrixContainer.classList.add("input-matrix-container");
    matrixContainer.append(this._createMatrix());
    this._matrixContainer = matrixContainer;
  }

  _createMatrix(oldMatrix) {
    let matrix = document.createElement("table");
    matrix.classList.add("matrix");
    matrix.matrixInput = this;

    matrix.setAttribute("tabindex", "0");
    this._addEvents(matrix);

    for (let i = 0; i < this._rows; ++i) {
      let row = document.createElement("tr");
      row.classList.add("row");
      for (let j = 0; j < this._columns; ++j) {
        let column = document.createElement("td");
        let input = this._createInput();

        input.setAttribute("row", `${i + 1}`);
        input.setAttribute("column", `${j + 1}`);

        if (oldMatrix !== undefined && i < oldMatrix.length && j < oldMatrix[i].length) {
          input.value = oldMatrix[i][j];
        }

        column.append(input);

        let underline = document.createElement("div");
        underline.classList.add("underline");
        column.append(underline);

        column.classList.add("column");

        row.append(column);
      }
      matrix.append(row);
    }

    return matrix;
  }

  _addEvents(matrixContainer) {
    matrixContainer.addEventListener("focusin", MatrixEvents.onInputFocus);
    matrixContainer.addEventListener("focusout", MatrixEvents.onInputBlur);
    matrixContainer.addEventListener("input", MatrixEvents.onInput);
    matrixContainer.addEventListener("keydown", MatrixEvents.onKeyDown);
  }

  _createInput() {
    let input = document.createElement("input");
    input.type = "text";
    input.setAttribute("maxlength", `${this._maxLengthValue}`);
    input.classList.add("matrix-value");
    input.classList.add("numeric-input");
    input.value = "0";

    return input;
  }

  get matrixContainer() {
    return this._matrixContainer;
  }

  get rows() {
    return this._rows;
  }

  get columns() {
    return this._columns;
  }
}