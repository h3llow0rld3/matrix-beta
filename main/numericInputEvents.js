import { NumericInputCleaner } from "./numericInputCleaner.js";

export class NumericInputEvents {
  static addEvents() {
    document.addEventListener("focusin", NumericInputEvents.onInputFocus);
    document.addEventListener("focusout", NumericInputEvents.onInputBlur);
    document.addEventListener("keydown", NumericInputEvents.onKeyDown);
  }

  static onKeyDown(event) {
    const target = event.target;
    if (!target.classList.contains("numeric-input"))
      return;

    const key = event.key;
    if (!((key >= '0' && key <= '9') || NumericInputEvents.allowedKeys.includes(key) ||
      (event.keyCode >= 37 && event.keyCode <= 49)))

      event.preventDefault();
  }

  static onInputFocus(event) {
    const target = event.target;
    if (!target.classList.contains("numeric-input"))
      return;

    if (target?.value === "0")
      target.value = "";
    else {
      target?.select();
    }
  }

  static onInputBlur(event) {
    const target = event.target;
    if (!target.classList.contains("numeric-input"))
      return;

    if (target?.value === "")
      target.value = "0";
    else {
      target.value = NumericInputCleaner.clear(target.value);
    }
  }
}

NumericInputEvents.allowedKeys = ["Delete", "Backspace"];