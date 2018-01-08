import { Component } from "../../../../core/decorators/component.decorator";
import BaseComponent from "../../../base.component";
import { ActionType } from "../../../../reducers/action-type";

@Component({
    selector: "fc-sign-in-section",
    template: require("./sign-in.section.component.html"),
    styles: require("./sign-in.section.component.scss")
})
export default class SignInSectionComponent extends BaseComponent {
    constructor() {
        super();
        this.subscriptions = [];
        this.user = {};
    }

    defineDomElementsHook() {
        let domElements = {
            signOffButton: this.config.ref.querySelector("#signOff")
        }
        this.domElements = domElements;
    }

    bindHandlersHook() {
        this.bindEvent(this.domElements.signOffButton, "click", () => {
            this.config.store.dispatch({ 
                type: ActionType.AddUserInfo,
                payload: {
                    name: "",
                    apiKey: ""
                }
            });
        });
    }

    initializeHook() {
        super.initializeHook();
        
        this.subscriptions.push(this.config.store.state$
            .filter(state => state.user !== this.user)
            .do(state => this.user = state.user)
            .do(() => console.log("User", this.user, this.config.selector))
            .do(() => this.render())
            .subscribe());
    }

    destroyHook() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}