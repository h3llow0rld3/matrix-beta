import { NumericInputCleaner } from "../../main/numericInputCleaner.js";

export class SizeInputs {
  constructor(operandsData, binaryOperation) {
    this.operandsData = operandsData;
    this.binaryOperation = binaryOperation;
  }

  init() {
    this._addSizeInputs();
    this._addInputSizeEvents();
  }

  _addSizeInputs() {
    const left = this.operandsData.left;
    const right = this.operandsData.right;
    
    const leftSizeInput = left.matrixInput.createSizeInputs();
    const rightSizeInput = right.matrixInput.createSizeInputs();

    left.matrixInput.sizeInput = leftSizeInput;
    right.matrixInput.sizeInput = rightSizeInput;

    const _sizeInputElems = this._sizeInputElems = this.binaryOperation._sizeInputElems = {
      leftInputRows: leftSizeInput.rowsInputContainer.inputElem,
      rightInputRows: rightSizeInput.rowsInputContainer.inputElem,
      leftInputColumns: leftSizeInput.columnsInputContainer.inputElem,
      rightInputColumns: rightSizeInput.columnsInputContainer.inputElem,
    }

    // _sizeInputElems.leftInputRows.matrixInput = 
    //   _sizeInputElems.leftInputColumns.matrixInput = left.matrixInput;
    // _sizeInputElems.rightInputRows.matrixInput = 
    //   _sizeInputElems.rightInputColumns.matrixInput = right.matrixInput;

    this.binaryOperation._addTableRow(leftSizeInput, rightSizeInput);
  }

  _addOnInputEvent(elem, changeElemValue) {
    elem.addEventListener("input", () => {
      changeElemValue.value = NumericInputCleaner.clear(elem.value);
      this._updateMatrix(changeElemValue.matrixInput);
    });
  }

  _updateMatrix(matrixInput) {
    const inputRows = matrixInput.inputsContainer.rowsInputContainer.inputElem;
    const inputColumns = matrixInput.inputsContainer.columnsInputContainer.inputElem;
    matrixInput.update(+inputRows.value, +inputColumns.value);
  }

  _addInputSizeEvents() {
    const context = this;
    const { 
      leftInputRows,
      rightInputRows,
      leftInputColumns,
      rightInputColumns,
    } = this._sizeInputElems;

    leftInputRows.addEventListener("input", onInputHandler);
    rightInputRows.addEventListener("input", onInputHandler);
    leftInputColumns.addEventListener("input", onInputHandler);
    rightInputColumns.addEventListener("input", onInputHandler);

    function onInputHandler(event) {
      if (event?.target?.matrixInput)
        context._updateMatrix(event.target.matrixInput);
    }
  }
}