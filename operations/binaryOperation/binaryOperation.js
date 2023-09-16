import { Operation } from "../operation/operation.js";
import { MatrixInput } from "../../matrix/matrixInput.js";
import { SizeInputs } from "./sizeInputs.js";

export class BinaryOperation extends Operation {
  constructor() {
    super();

    this._createOperands();
    this._initSizeInputs();
  }

  _createOperands() {
    const tableData = this._createTable();
    const left = document.createElement("div");
    const right = document.createElement("div");
    const operatorButton = document.createElement("div");

    left.classList.add("left-operand");
    right.classList.add("right-operand");
    operatorButton.classList.add("operator-button");

    tableData.left.append(left);
    tableData.right.append(right);
    tableData.operator.append(operatorButton);

    this.operandsContainer.append(tableData.table);
    this._table = tableData.table;

    this._addMatrixInput(left);
    this._addMatrixInput(right);

    this.operandsData = {
      left,
      right,
      operatorButton,
    }
  }

  _initSizeInputs() {
    const sizeInputs = new SizeInputs(this.operandsData, this);
    sizeInputs.init();
    this._sizeInputs = sizeInputs;
  }

  _addMatrixInput(container) {
    const matrixInput = new MatrixInput();
    container.matrixInput = matrixInput;
    container.append(matrixInput.matrixContainer);
  }

  _createTable() {
    const table = document.createElement("table");
    const tblBody = document.createElement("tbody");

    table.classList.add("operands-table");

    table.append(tblBody);

    const {tr, left, right, operator} = this._createTableRow();
    tblBody.append(tr);

    left.classList.add("operand-td", "left-operand-td");
    right.classList.add("operand-td", "left-operand-td");

    operator.classList.add("operator-button-td");

    return {
      table,
      left,
      operator,
      right,
    }
  }

  _createTableRow() {
    const tr = document.createElement("tr");
    for (let i = 0; i < 3; ++i) {
      const td = document.createElement("td");
      tr.append(td);
    }

    const left = tr.cells[0];
    const operator = tr.cells[1];
    const right = tr.cells[2];

    left.classList.add("left");
    right.classList.add("right");

    return {
      tr,
      right,
      left,
      operator,
    }
  }

  _addTableRow(leftData, rightData, operatorData) {
    const {tr, left, right, operator} = this._createTableRow();
    if (leftData)
      left.append(leftData);
    if (rightData)
      right.append(rightData);
    if (operatorData)
      operator.append(operatorData);

    this._table.append(tr);
  }
}