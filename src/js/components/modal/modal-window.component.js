import BaseComponent from "../base.component";
export default class ModalWindowComponent extends BaseComponent {
    constructor() {
        super();
        this.config = {
            selector: ModalWindowComponent.selector,
            template: require("./modal-window.component.html"),
            styles: require("./modal-window.component.scss")
        };
    }

    static get selector() {
        const selector = "fc-popup";
        return selector;
    }

    defineDomElementsHook() {
        let domElements = {
            //spanElement: document.getElementsByTagName("span")[0],
            //popupElement: document.getElementsByClassName("error-api")[0]
        };
        this.domElements = domElements;
    }

    showErrorPopup(text) {
        this.domElements.spanElement.textContent = text;
        this.domElements.popupElement.style.display = "block";
    }
}