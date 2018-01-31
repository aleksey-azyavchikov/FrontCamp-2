import { Component } from "../../../../../core/decorators/component.decorator";
import BaseComponent from "../../../../base.component";
import { EditorMode } from "../../../../../core/enums/editor-mode.enum";
import { ActionType } from "../../../../../reducers/action-type";

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
        this.mode = null;
        this.EditorMode = EditorMode;
    }

    initializeHook() {
        this.selected = this.config.params.selected;
        this.mode = this.config.params.mode;
    }

    defineDomElementsHook() {
        let domElements = {
            panel: this.config.ref.querySelector(".panel"),
            removeItemModal: $("#removeItemModal")
        };
        
        this.domElements = domElements;
    }

    bindHandlersHook() {
        this.bindEvent(this.domElements.panel, "click", (event) => { 
            console.log(event);
            if(event.target.id === EditorMode.Delete) {
                this.domElements.removeItemModal.modal("show");
            }
            this.dispatchMode(event.target.id);
        });
    }

    dispatchMode(mode) {
        this.config.store.dispatch({ 
            type: ActionType.SetArchiveEditorMode,
            payload: mode
        });
    }
}