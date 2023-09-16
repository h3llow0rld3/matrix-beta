import { Operation } from "../operation/operation.js";
import { MatrixInput } from "../../matrix/matrixInput.js";

export class UnaryOperation extends Operation {
  constructor() {
    super();

    this._createOperand();

    this._addSizeInputs();
  }

  _createOperand() {
    const unaryContainer = document.createElement("div");
    unaryContainer.classList.add("unary-container");
    this.operandsContainer.append(unaryContainer);

    this.unaryContainer = unaryContainer;

    this._addMatrixInput(unaryContainer);
  }

  _addMatrixInput(container) {
    const matrixInput = new MatrixInput();
    container.matrixInput = matrixInput;
    container.append(matrixInput.matrixContainer);
  }

  _addSizeInputs() {
    const sizeInputs = this._createSizeInputs();
    this.operandsContainer.append(sizeInputs);
  }

  _createSizeInputs() {
    const context = this;
    const sizeInputs = this.unaryContainer.matrixInput.createSizeInputs();

    sizeInputs.addEventListener("input", onInputHandler);

    function onInputHandler(event) {
      if (event?.target?.matrixInput)
        context._updateMatrix(event.target.matrixInput);
    }

    return sizeInputs;
  }

  _updateMatrix(matrixInput) {
    const inputRows = matrixInput.inputsContainer.rowsInputContainer.inputElem;
    const inputColumns = matrixInput.inputsContainer.columnsInputContainer.inputElem;
    matrixInput.update(+inputRows.value, +inputColumns.value);
  }
}