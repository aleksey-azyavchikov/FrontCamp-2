import { Component } from "../../core/decorators/component.decorator";
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
        // this.domElements.signInButton.addEventListener("click", () => {
        //     $('#myModal').on('shown.bs.modal', function () {
        //         $('#myInput').trigger('focus')
        //     })
        // });
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