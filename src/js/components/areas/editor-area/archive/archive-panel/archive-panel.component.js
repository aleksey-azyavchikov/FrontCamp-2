import { Component } from "../../../../../core/decorators/component.decorator";
import BaseComponent from "../../../../base.component";

@Component({
    selector: "fc-archive-panel",
    template: require("./archive-panel.component.html"),
    styles: require("./archive-panel.component.scss"),
    children: []
})
export default class ArchivePanelComponent extends BaseComponent {
    constructor() {
        super();
        this.selected = null;
    }

    initializeHook() {
        this.selected = this.config.params.selected;
    }
}