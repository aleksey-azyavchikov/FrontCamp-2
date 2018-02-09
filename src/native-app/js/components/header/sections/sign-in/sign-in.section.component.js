import { Component } from "../../../../core/decorators/component.decorator";
import BaseComponent from "../../../base.component";
import { ActionType } from "../../../../reducers/action-type";
import { PageType } from "../../../../core/enums/page-type.enum";

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
            this.config.store.dispatch({ 
                type: ActionType.SetActivePage,
                payload: {
                    activePage: PageType.Home
                }
            });
        });
    }

    initializeHook() {
        super.initializeHook();
        
        this.subscriptions.push(this.config.store.state$
            .map(state => state.user)
            .filter(user => this.user !== user)
            .do(user => this.user = user)
            .do(() => this.render())
            .subscribe());
    }

    destroyHook() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}