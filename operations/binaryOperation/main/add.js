import { BinaryOperation } from "../binaryOperation.js";
import { GoogleIconsProfider } from "../../main/icons/googleIconsProvider.js";
import { MatrixResult } from "../../matrix/matrixResult.js";
import { DropDownPanel } from "../../main/dropDownPanel/dropDownPanel.js";

export class Add extends BinaryOperation {
  constructor() {
    super();

    this._inputs = {
      rowsLeft: this._sizeInputElems.leftInputRows,
      rowsRight: this._sizeInputElems.rightInputRows,
      columnsLeft: this._sizeInputElems.leftInputColumns,
      columnsRight: this._sizeInputElems.rightInputColumns,
    }

    this._init();
  }

  addResult() {
    this._updateResults();
    
    const result = this._add();
    const matrixElem = MatrixResult.getMatrix(result);
    const dropDownPanel = DropDownPanel.getPanel("Результат", matrixElem);
    this.results.append(dropDownPanel);
  }

  _add() {
    const leftMatrixInput = this.operandsData.left.matrixInput;
    const rightMatrixInput = this.operandsData.right.matrixInput;

    if (leftMatrixInput.rows != rightMatrixInput.rows 
      || leftMatrixInput.columns != rightMatrixInput.columns) {
        alert("При сложении двух матриц число строк и число столбцов каждой матрицы должны быть равными!")
    }

    const leftMatrix = leftMatrixInput.load();
    const rightMatrix = rightMatrixInput.load();
    const result = [];

    for (let i = 0; i < leftMatrixInput.rows; ++i) {
      const row = [];
      for (let j = 0; j < leftMatrixInput.columns; ++j) {
        row.push(leftMatrix[i][j] + rightMatrix[i][j]);
      }
      result.push(row);
    }

    return result;
  }

  _init() {
    this._onInput();
    this._addOperatorIcon();
    this._operatorButtonOnClick();
    this._addOperatorButtonPrompt();
  }

  _addOperatorButtonPrompt() {
    const operator = this.operandsData.operatorButton;
    operator.setAttribute("data-prompt", "Сложить");
  }

  _operatorButtonOnClick() {
    const operator = this.operandsData.operatorButton;
    operator.addEventListener("click", () => {
      this.addResult();
    });
  }

  _addOperatorIcon() {
    const operator = this.operandsData.operatorButton;
    const icon = GoogleIconsProfider.getIcon("add");
    operator.append(icon);
  }

  _onInput() {
    this._sizeInputs._addOnInputEvent(this._inputs.rowsLeft, this._inputs.rowsRight);
    this._sizeInputs._addOnInputEvent(this._inputs.rowsRight, this._inputs.rowsLeft);
    this._sizeInputs._addOnInputEvent(this._inputs.columnsLeft, this._inputs.columnsRight);
    this._sizeInputs._addOnInputEvent(this._inputs.columnsRight, this._inputs.columnsLeft);
  }
}