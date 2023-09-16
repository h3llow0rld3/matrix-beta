export class ButtonEvents {
  static mouseMove(event) {
    const target = event.target;
    const button = target.closest("button");
    if (!button)
      return;

    const x = event.offsetX;
    const y = event.offsetY;
    button.style.setProperty('--mouse-x', x + "px");
    button.style.setProperty('--mouse-y', y + "px");
  }
}