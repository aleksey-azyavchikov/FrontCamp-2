import { Component } from "../../../core/decorators/component.decorator";
import BaseComponent from "../../base.component";
import SignInPopupComponent from "../sign-in/sign-in.popup.component";

@Component({
    selector: "fc-popup-container",
    template: require("./popup-container.component.html"),
    styles: require("./popup-container.component.scss"),
    children: [SignInPopupComponent] 
})
export default class PopupContainerComponent extends BaseComponent {
    constructor() {
        super();
    }
}