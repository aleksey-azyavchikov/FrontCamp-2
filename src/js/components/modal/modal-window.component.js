import { BaseComponent } from "../base.component";

import template from "./modal-window.component.html";
import css from "./modal-window.component.scss";

export default class ModalWindowComponent extends BaseComponent {
    constructor(config) {
        super(config);
        this.template = config && config.template || template;
        this.selector = config && config.selector || this.defaultSelector;
    }

    get defaultSelector() {
        const selector = "popup";
        return selector;
    }

    defineDomElementsHook() {
        let domElements = {
            spanElement: document.getElementsByTagName("span")[0],
            popupElement: document.getElementsByClassName("error-api")[0]
        };
        this.domElements = domElements;
    }

    showErrorPopup(text) {
        this.domElements.spanElement.textContent = text;
        this.domElements.popupElement.style.display = "block";
    }
}