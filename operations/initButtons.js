import { ButtonEvents } from "./buttonsEvents.js";

export class InitButtons {
  static init() {
    const options = document.getElementById("menu-options");

    InitButtons._addEvents(options);
  }

  static _addEvents(options) {
    options.addEventListener("mousemove", ButtonEvents.mouseMove);
  }
}