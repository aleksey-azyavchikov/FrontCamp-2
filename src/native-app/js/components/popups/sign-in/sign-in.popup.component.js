import { Component } from "../../../core/decorators/component.decorator";
import BaseComponent from "../../base.component";
import { ActionType } from "../../../reducers/action-type";
import { PageType } from "../../../core/enums/page-type.enum";
import { ValidationFactory, ValidationConditions } from "../../../core/validation";
import { ExpressionAnalyzer } from "../../../core/html/expression/expression.analyzer";

@Component({
    selector: "fc-sign-in-popup",
    template: require("./sign-in.popup.component.html"),
    styles: require("./sign-in.popup.component.scss") 
})
export default class SignInPopupComponent extends BaseComponent {
    constructor() {
        super();
        
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
            let requiredValidator = ValidationFactory
                .getInstance()
                .getValidator(ValidationConditions.RequiredField);

            const name = requiredValidator.validate(this.domElements.inputName.value);
            const apiKey = requiredValidator.validate(this.domElements.inputApiKey.value);

            if(Boolean(name) && Boolean(apiKey)) {
                this.dispatchData(name, apiKey);
                this.domElements.signInModal.modal("hide");
            }
        });
    }

    dispatchData(name, apiKey) {
        this.config.store.dispatch({ 
            type: ActionType.AddUserInfo,
            payload: { name, apiKey }
        });

        this.config.store.dispatch({ 
            type: ActionType.SetActivePage,
            payload: {
                activePage: PageType.News
            }
        });
    }
}