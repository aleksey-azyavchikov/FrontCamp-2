import { Component } from "../../../core/decorators/component.decorator";
import BaseComponent from "../../base.component";
import { ActionType } from "../../../reducers/action-type";
import { EditorMode } from "../../../core/enums/editor-mode.enum";
import { CommandService } from "../../../services/command.service";

@Component({
    selector: "fc-remove-item-popup",
    template: require("./remove-item.popup.component.html"),
    styles: require("./remove-item.popup.component.scss") 
})
export default class RemoveItemPopupComponent extends BaseComponent {
    constructor() {
        super();
        
    }
    defineDomElementsHook() {
        const { ref } = this.config;
        let domElements = {
            yesButton: ref.querySelector("#yesButton"),
            noButton: ref.querySelector("#noButton"),
            removeItemModal: $("#removeItemModal")
        };
        this.domElements = domElements;
    }

    bindHandlersHook() {
        this.bindEvent(this.domElements.yesButton, "click", () => {
            let commandService = CommandService.getInstance();
            commandService.removeArticle.next();
            this.domElements.removeItemModal.modal("hide");
            this.dispatchMode(EditorMode.None);
        });

        this.bindEvent(this.domElements.noButton, "click", () => {
            this.dispatchMode(EditorMode.None);
        });
    }

    dispatchMode(mode) {
        this.config.store.dispatch({ 
            type: ActionType.SetArchiveEditorMode,
            payload: mode
        });
    }
}