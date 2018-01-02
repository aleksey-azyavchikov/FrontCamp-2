import { Component } from "../../core/decorators/component.decorator";
import BaseComponent from "../base.component";

// @Component({
//     selector: "fc-footer",
//     template: require("./footer.component.html"),
//     styles: require("./footer.component.scss") 
// })
export default class FooterComponent extends BaseComponent {
    constructor() {
        super();
        this.config = {
            selector: "fc-footer",
            template: require("./footer.component.html"),
            styles: require("./footer.component.scss")
        }
    }

    static get selector() {
        const selector = "fc-footer";
        return selector;
    }
}