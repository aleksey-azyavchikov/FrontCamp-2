import BaseComponent from "../base.component";
import { Component } from "../../core/decorators/component.decorator";

@Component({
    selector: "fc-popup",
    template: require("./modal-window.component.html"),
    styles: require("./modal-window.component.scss") 
})
export default class ModalWindowComponent extends BaseComponent {
    constructor() {
        super();
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