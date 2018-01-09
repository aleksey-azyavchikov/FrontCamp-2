import { Component } from "../../core/decorators/component.decorator";
import BaseComponent from "../base.component";
@Component({
    selector: "fc-carousel",
    template: require("./carousel.component.html"),
    styles: require("./carousel.component.scss")
})
export default class CarouselComponent extends BaseComponent {
    constructor() {
        super()
    }

    initializeHook() {
        this.template = this.config.params.template
    }

    defineDomElementsHook() {
        let domElements = {
            carouselBodyDiv: this.config.ref.querySelector("#carouselBody")
        }
        this.domElements = domElements;
        this.domElements.carouselBodyDiv.innerHTML = this.template;
        $("#carouselExampleIndicators").carousel();
    }


}