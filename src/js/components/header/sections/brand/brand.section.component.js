import { Component } from "../../../../core/decorators/component.decorator";
import BaseComponent from "../../../base.component";
import brand from "../../../../../content/images/brand.png";

@Component({
    selector: "fc-brand-section",
    template: require("./brand.section.component.html"),
    styles: require("./brand.section.component.scss"),
    stable: true
})
export default class BrandSectionComponent extends BaseComponent {
    constructor() {
        super()
    }

    defineDomElementsHook() {
        let domElements = {
            brandImage: this.config.ref.querySelector("#brand")
        };
        this.domElements = domElements;
    }

    initializeHook() {
        this.domElements.brandImage.src = brand;
    }
}