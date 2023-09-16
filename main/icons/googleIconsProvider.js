export class GoogleIconsProfider {
  static getIcon(name) {
    const icon = document.createElement("i");
    icon.classList.add("material-icons");
    icon.textContent = name;

    return icon;
  }
}