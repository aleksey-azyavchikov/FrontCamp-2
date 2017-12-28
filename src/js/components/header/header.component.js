import BaseComponent from "../base.component";
import brand from "../../../content/images/brand.png";
import { ComponentLoader } from "../../core/component.loader";
import ModalWindowComponent from "../modal/modal-window.component";

export default class HeaderComponent extends BaseComponent {
    constructor() {
        super();
        this.config = {
            selector: HeaderComponent.selector,
            template: require("./header.component.html"),
            styles: require("./header.component.scss"),
        };
        this.isSearchEnabled = true;
    }

    static get selector() {
        const selector = "fc-header";
        return selector;
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
        this.domElements.brandImage.src = brand;
    }
}