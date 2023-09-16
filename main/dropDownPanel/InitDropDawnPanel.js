export class InitDropDownPanel {
  static init() {
    this._addDocumentOnClickEvent();
  }

  static _addDocumentOnClickEvent() {
    document.addEventListener("click", onClick);

    function onClick(event) {
      const target = event.target;
      const panel = target.closest(".drop-down-panel");
      if (!panel)
        return;

      if (target.classList.contains("title")) {
        const content = panel.querySelector(".content");
        const contentHeight = content.scrollHeight;
        
        if (panel.classList.contains("active")) {
          content.style.height = "0px";
          content.style.overflow = "hidden";

          // const removedDataPrompt = panel.titleElem.getAttribute("removed-data-prompt");
          // panel.titleElem.setAttribute("data-prompt", removedDataPrompt);
        }
        else {
          // panel.titleElem.removeAttribute("data-prompt");
          content.style.height = contentHeight + "px";
          content.style.overflow = "";
        }
        
        panel.classList.toggle("active");
      }
    }
  }
}