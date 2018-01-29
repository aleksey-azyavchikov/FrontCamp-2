import { Component } from "../../core/decorators/component.decorator";
import BaseComponent from "../base.component";
import { ActionType } from "../../reducers/action-type";
import { SubPageType } from "../../core/enums/subpage-type.enum";

@Component({
    selector: "fc-navigation",
    template: require("./navigation.component.html"),
    styles: require("./navigation.component.scss"),
    children: []
})
export default class NavigationComponent extends BaseComponent {
    constructor() {
        super();
    }

    initializeHook() {
        this.items = this.config.params.items;
        this.active = this.config.params.selected;
    }

    defineDomElementsHook() {
        let domElements = {
            links: this.config.ref.querySelectorAll("a")
        }
        this.domElements = domElements;
    }

    bindHandlersHook() {
        for (let link of this.domElements.links) {
            this.bindEvent(link, "click", () => {;
                this.config.store.dispatch({ 
                    type: ActionType.SetActiveSubPage,
                    payload: SubPageType[link.textContent]
                });
            })
        }
    }

    postInitializeHook() {
        for (let link of this.domElements.links) {
            if (link.textContent === this.active) {
                link.className += " active";
            }
        }
    }
}