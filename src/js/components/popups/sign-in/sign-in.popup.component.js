import { Component } from "../../../core/decorators/component.decorator";
import BaseComponent from "../../base.component";
import { ActionType } from "../../../reducers/action-type";
import { setTimeout } from "timers";

@Component({
    selector: "fc-sign-in-popup",
    template: require("./sign-in.popup.component.html"),
    styles: require("./sign-in.popup.component.scss") 
})
export default class SignInPopupComponent extends BaseComponent {
    constructor() {
        super();
        
    }

    initializeHook() {
        this.config.store.subscribe(newState => {
            console.log("State", newState);
        });
    }

    defineDomElementsHook() {
        const { ref } = this.config;
        let domElements = {
            signInButton: ref.querySelector("#signInButton"),
            inputName: ref.querySelector("#inputName"),
            inputApiKey: ref.querySelector("#inputApiKey"),
            signInModal: $("#signInModal")
        };
        this.domElements = domElements;
    }

    bindHandlersHook() {
        this.domElements.signInButton.addEventListener("click", () => {
            console.log(this.domElements.inputName.value);
            const name = this.domElements.inputName.value;
            const apiKey = this.domElements.inputApiKey.value;
            this.config.store.dispatch({ 
                type: ActionType.AddUserInfo,
                payload: { name, apiKey }
            });
            setTimeout(() => {

            }, 0)
            this.domElements.signInModal.modal("hide");
        });
    }
}