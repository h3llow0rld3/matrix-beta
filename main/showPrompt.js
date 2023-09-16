export class ShowPrompt {
  constructor() {
    this.promptElem = this._createPromptElem();
    this.timerId;
    this.delayId;
    this.flagDelay = true;
    this.promptContentElem;
  }

  init() {
    this._addDocumentEvents();
  }

  _addDocumentEvents() {
    document.addEventListener("mouseover", (event) => this._onMouseOverDocument(event, this));
    document.addEventListener("mouseout", (event) => this._onMouseOutDocument(event, this));
  }

  _createPromptElem() {
    const promptElem = document.createElement("div");

    promptElem.id = "prompt";
    promptElem.style.display = "none";
    document.body.append(promptElem);

    return promptElem;
  }

  _removePromptContentElemIfExist() {
    if (this.promptContentElem) {
      this.promptContentElem.remove();
    }
  }

  _createPromptContentElem(content) {
    const promptContentElem = document.createElement("div");
    promptContentElem.classList.add("prompt-content-elem");

    this.promptContentElem = promptContentElem;
    this.promptElem.append(promptContentElem);
    promptContentElem.append(content);

    return promptContentElem;
  }

  _showPrompt(elem) {
    const promptElem = this.promptElem;
    promptElem.style.display = "";
    elem.addEventListener("mousedown", () => this._onMouseDown(this));

    const coords = elem.getBoundingClientRect();
    const coordsRelToDocument = this._getCoords(elem);

    promptElem.style.top = coordsRelToDocument.bottom + 10 + "px";
    promptElem.style.left = coordsRelToDocument.left + "px";
    promptElem.style.transform = "translate(0px, 0px)";

    if (coords.top > document.documentElement.clientHeight - coords.height - 30) {
      promptElem.style.top = coordsRelToDocument.top - coords.height - 10 + "px";
    }

    if (coords.left > promptElem.offsetWidth / 2 - 30) {
      promptElem.style.left = coordsRelToDocument.left + coords.width / 2 + "px";
      promptElem.style.transform = "translate(-50%, 0px)";
    }
    
    if (coords.left > document.documentElement.clientWidth - promptElem.offsetWidth - 30) {
      promptElem.style.left = coordsRelToDocument.right + "px";
      promptElem.style.transform = "translate(-100%, 0px)";
    }

    this._removePromptContentElemIfExist();
    promptElem.textContent = elem.getAttribute("data-prompt");

    if (elem.dataPromptElem) {
      this._createPromptContentElem(elem.dataPromptElem);
    }
  }

  _onMouseDown(context) {
    context.promptElem.style.display = "none";
  }

  _onMouseOutDocument(event, context) {
    const relatedTarget = event.relatedTarget;
  
    clearTimeout(context.timerId);
    context.promptElem.style.display = "none";
    if (relatedTarget?.removeEventListener) {
      relatedTarget.removeEventListener("mousedown", context._onMouseDown);
    }

    clearTimeout(context.delayId);
    context.delayId = setTimeout(() => {
      context.flagDelay = false;
    }, 200);
  }

  _onMouseOverDocument(event, context) {
    const target = event.target?.closest("[data-prompt]");

    // if (target.hasAttribute("data-prompt")) {
    if (target) {
      if (context.flagDelay) {
        context._showPrompt(target);

        setTimeout(() => {
          clearTimeout(context.delayId);
          context.flagDelay = true;
        }, 0);
      } else {
        context.timerId = setTimeout(() => {
          context._showPrompt(target);

          setTimeout(() => {
            clearTimeout(context.delayId);
            context.flagDelay = true;
          }, 0);
        }, 400);
      }
    }
  }
  
  _getCoords(elem) {
    const box = elem.getBoundingClientRect();
  
    return {
      top: box.top + window.pageYOffset,
      right: box.right + window.pageXOffset,
      bottom: box.bottom + window.pageYOffset,
      left: box.left + window.pageXOffset,
      width: box.width,
      height: box.height,
    };
  }
}