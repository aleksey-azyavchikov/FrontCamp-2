import { ComponentLoader } from "../../core/component.loader";
import { Component } from "../../core/decorators/component.decorator";
import ModalWindowComponent from "../modal/modal-window.component";
import BaseComponent from "../base.component";
import brand from "../../../content/images/brand.png";

@Component({
    selector: "fc-header",
    template: require("./header.component.html"),
    styles: require("./header.component.scss")
})
export default class HeaderComponent extends BaseComponent {
    constructor() {
        super();
        this.isSearchEnabled = false;
    }

    bindHandlersHook() {
        this.domElements.signInButton.addEventListener("click", () => ComponentLoader.loadComponent(ModalWindowComponent));
    }

    defineDomElementsHook() {
        let domElements = {
            brandImage: document.getElementById("brand"),
            signInButton: document.getElementById("sign-in"),
        };
        this.domElements = domElements;
    }

    initializeHook() {
        super.initializeHook();
        this.domElements.brandImage.src = brand;
    }
}