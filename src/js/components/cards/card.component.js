import { Component } from "../../core/decorators/component.decorator";
import BaseComponent from "../base.component";

@Component({
    selector: "fc-card",
    template: require("./card.component.html"),
    styles: require("./card.component.scss"),
})
export default class CardComponent extends BaseComponent {
    constructor() {
        super();
        this.config.params;
    }
}