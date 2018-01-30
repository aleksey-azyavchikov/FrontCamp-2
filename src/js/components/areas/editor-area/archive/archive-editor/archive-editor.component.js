import { Component } from "../../../../../core/decorators/component.decorator";
import BaseComponent from "../../../../base.component";
import { EditorMode } from "../../../../../core/enums/editor-mode.enum";

@Component({
    selector: "fc-archive-editor",
    template: require("./archive-editor.component.html"),
    styles: require("./archive-editor.component.scss"),
    children: []
})
export default class ArchiveEditorComponent extends BaseComponent {
    constructor() {
        super();
        this.selected = null;
        this.mode = null;
    }

    initializeParamsHook() {
        this.mode = this.config.params.mode;
        this.selected = this.mode === EditorMode.Add ? null : this.config.params.selected;
    }

    initializeHook() {

    }

    destroyHook() {
    }
}