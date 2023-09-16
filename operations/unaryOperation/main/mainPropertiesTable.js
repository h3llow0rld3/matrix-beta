export class MainPropertiesTable {
  constructor(properties) {
    const table = document.createElement("table");
    const tBody = document.createElement("tbody");
    const tHead = document.createElement("thead");

    table.classList.add("matrix-properties");
    
    table.append(tHead);
    table.append(tBody);

    this._tHead = tHead;
    this._yesOrNo = ["Нет", "Да"];
    this._table = table;
    this._tBody = tBody;

    this.properties = properties;
    this._createTable();
  }

  getTable() {
    return this._table;
  }

  _createTable() {
    this._addTableHead();
    const yesOrNo = this._yesOrNo;
    const properties = this.properties;
    const propertyNames = {
      "Размер матрицы": `${properties.size.rows}x${properties.size.columns}`,
      "Является ли матрица пустой": yesOrNo[+properties.isEmpty],
      "Является ли матрица квадратной": yesOrNo[+properties.isSquare],
      "Является ли матрица нулевой": yesOrNo[+properties.isNull],
    }

    if (properties.isSquare) {
      this._addPropertiesIfMatrixSquare(propertyNames);
    }

    this._addProperties(propertyNames);
  }

  _addProperties(propertyNames) {
    for (const [key, value] of Object.entries(propertyNames)) {
      this._addTableRow(key, value);
    }
  }

  _addTableHead() {
    const tr = document.createElement("tr");
    const propertyName = document.createElement("th");
    const value = document.createElement("th");
    propertyName.textContent = "Свойство";
    value.textContent = "Значение";

    tr.append(propertyName, value);
    // const tr = this._createTableRow("Свойство", "Значение");
    this._tHead.append(tr);
  }

  _addPropertiesIfMatrixSquare(propertyNames) {
    const yesOrNo = this._yesOrNo;
    const properties = this.properties.propertiesIfMatrixSquare;

    propertyNames["Является ли матрица диагональной"] = yesOrNo[+properties.isDiagonal];
    propertyNames["Является ли матрица единичной"] = yesOrNo[+properties.isIdentity];
    propertyNames["Является ли матрица треугольной (сверху)"] = yesOrNo[+properties.isUpperTriangular];
    propertyNames["Является ли матрица треугольной (снизу)"] = yesOrNo[+properties.isLowerTriangular];
    propertyNames["Является ли матрица симметричной"] = yesOrNo[+properties.isSymmetric];
  }

  _addTableRow(propertyName, value) {
    const tr = this._createTableRow(propertyName, value);
    this._tBody.append(tr);
  }

  _createTableRow(propertyName, value, tagName="tr") {
    const tr = document.createElement("tr");
    const propertyNameTd = document.createElement("td");
    const valueTd = document.createElement("td");
    
    propertyNameTd.textContent = propertyName;
    valueTd.textContent = value;
    
    tr.append(propertyNameTd);
    tr.append(valueTd);

    return tr;
  }
}