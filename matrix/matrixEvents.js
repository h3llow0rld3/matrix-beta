export class MatrixEvents {
  static onInputFocus(event) {
    const target = event.target;
    if (!target.classList.contains("matrix-value"))
      return;

    MatrixEvents.showUnderline(target);
  }

  static onInputBlur(event) {
    const target = event.target;
    if (!target.classList.contains("matrix-value"))
      return;

    const underline = target.nextElementSibling;
    underline.style.width = "0px";
  }

  static onKeyDown(event) {
    const arrows = {
      UP_ARROW: 38,
      DOWN_ARROW: 40,
      LEFT_ARROW: 37,
      RIGHT_ARROW: 39,
    }

    const target = event.target;
    if (!target.classList.contains("matrix-value"))
      return; 
    // const row = +target.row;
    // const column = +target.column;
    const row = +target.getAttribute("row");
    const column = +target.getAttribute("column");
    const keyCode = event.keyCode;
    const matrix = target.closest(".matrix");
    const size = {
      rows: matrix.matrixInput.rows,
      columns: matrix.matrixInput.columns,
    }

    if (keyCode === arrows.UP_ARROW) {
      if (row !== 1) {
        const focusInput = matrix.querySelector(`input[row="${row - 1}"][column="${column}"]`);
        focusInput?.focus();
        event.preventDefault();
      }
    } else if (keyCode === arrows.DOWN_ARROW) {
        if (row !== size.rows) {
          const focusInput = matrix.querySelector(`input[row="${row + 1}"][column="${column}"]`);
          focusInput?.focus();
          event.preventDefault();
        }
    } else if (keyCode === arrows.LEFT_ARROW && target.selectionStart === 0) {
        if (column !== 1) {
          const focusInput = matrix.querySelector(`input[row="${row}"][column="${column - 1}"]`);
          focusInput?.focus();
          event.preventDefault();
        }
    } else if (keyCode === arrows.RIGHT_ARROW && target.selectionEnd === target.value.length) {
        if (column !== size.columns) {
          const focusInput = matrix.querySelector(`input[row="${row}"][column="${column + 1}"]`);
          focusInput?.focus();
          event.preventDefault();
        }
    }
  }

  static onInput(event) {
    const target = event.target;
    if (!target.classList.contains("matrix-value"))
      return;

    MatrixEvents.showUnderline(target);
  }

  static showUnderline(input) {
    const underline = input.nextElementSibling;
    const textWidth = MatrixEvents._getInputTextLenght(input);

    underline.style.width = `${textWidth + 8}px`;
  }

  static _getInputTextLenght(input) {
    const tempDiv = document.createElement('div');
    tempDiv.textContent = input.value;
    tempDiv.className = "check-input-text-length";

    document.body.append(tempDiv);
    const textWidth = tempDiv.scrollWidth;
    document.body.removeChild(tempDiv);

    return textWidth;
  }
}