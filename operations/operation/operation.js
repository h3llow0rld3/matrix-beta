export class Operation {
  constructor() {
    this.container = this._createContainer();

    this.operandsContainer = this._createOperandsContainer();
    // this.results = this._createResultsContainer();
  }

  _createContainer() {
    const container = document.createElement("div");
    container.classList.add("container");
    
    const main = document.getElementById("main");
    main.append(container);
    
    return container;
  }

  _createOperandsContainer() {
    const operandsContainer = document.createElement("div");
    operandsContainer.classList.add("operands-container");
    
    this.container.append(operandsContainer);
    return operandsContainer;
  }

  _updateResults() {
    this.results?.remove();
    this.results = this._createResultsContainer();
  }

  _createResultsContainer() {
    const results = document.createElement("div");
    results.classList.add("results");
    
    this.container.append(results);
    return results;
  }
}