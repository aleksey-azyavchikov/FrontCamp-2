import brand from "../../../content/images/brand.png";
import { ComponentLoader } from "../../core/component.loader";
import ModalWindowComponent from "../modal/modal-window.component";
import { Component } from "../../core/decorators/component.decorator";
import BaseComponent from "../base.component";

@Component({
    selector: "fc-header",
    template: require("./header.component.html"),
    styles: require("./header.component.scss"),
})
export default class HeaderComponent extends BaseComponent {
    constructor() {
        super();
        // super();
        // this.config = {
        //     selector: HeaderComponent.selector,
        //     template: require("./header.component.html"),
        //     styles: require("./header.component.scss"),
        // };
        this.isSearchEnabled = true;
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