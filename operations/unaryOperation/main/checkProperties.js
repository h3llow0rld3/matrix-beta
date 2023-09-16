import { UnaryOperation } from "../unaryOperation.js";
import { DropDownPanel } from "../../../main/dropDownPanel/dropDownPanel.js";
import { MainProperties } from "./matrixProperties/mainProperties.js";
import { MainPropertiesTable } from "./mainPropertiesTable.js";

export class CheckProperties extends UnaryOperation {
  constructor() {
    super();

    this._init();
  }

  _init() {
    const matrixInput = this.unaryContainer.matrixInput;
    const arrMatrix = matrixInput.load();

    const mainProperties = new MainProperties(arrMatrix);
    mainProperties.generateProperties();

    this.properties = mainProperties.properties;
    this.arrMatrix = arrMatrix;
    this.matrixInput = matrixInput;
  }

  test() {
    const btn = document.createElement("button");
    this.container.append(btn);

    btn.textContent = "test";
    btn.onclick = () => {
      this._updateResults();

      
    }
  }

  _createOperators() {
    const operatorsContainer = this._createOperandsContainer();
    
  }

  _createOperatorsContainer() {
    const operatorsContainer = document.createElement("div");
    operatorsContainer.classList.add("operators-container");

    return operatorsContainer;
  }

  _getPropertiesPanel() {
    const matrixInput = this.unaryContainer.matrixInput;
    const arrMatrix = matrixInput.load();

    const mainProperties = new MainProperties(arrMatrix);
    mainProperties.generateProperties();
    const propsTable = new MainPropertiesTable(props.properties);
    const table = propsTable.getTable();
    DropDownPanel.getPanel("Свойства");
    const dropDownPanel = DropDownPanel.getPanel("Результат", table);
    // this.results.append(dropDownPanel);
    return dropDownPanel;
  }
}