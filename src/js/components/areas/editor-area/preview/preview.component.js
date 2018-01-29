import BaseComponent from "../../../base.component";
import { Component } from "../../../../core/decorators/component.decorator";

@Component({
    selector: "fc-preview",
    template: require("./preview.component.html"),
    styles: require("./preview.component.scss"),
    children: []
})
export default class PreviewComponent extends BaseComponent {
    constructor() {
        super();
    }

    initializeHook() {
    }

    destroyHook() {
    }
}