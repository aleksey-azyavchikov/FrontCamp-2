import { Component } from "../../../core/decorators/component.decorator";
import BaseComponent from "../../base.component";
import { ActionType } from "../../../reducers/action-type";
import { PageType } from "../../../core/enums/page-type.enum";

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
            removeItemModal: $("#removeItemModal")
        };
        this.domElements = domElements;
    }

    bindHandlersHook() {
        this.bindEvent(this.domElements.yesButton, "click", () => {
            this.domElements.removeItemModal.modal("hide");
        });
    }

}