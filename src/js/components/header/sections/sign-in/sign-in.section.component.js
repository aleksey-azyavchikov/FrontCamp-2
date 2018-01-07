import { Component } from "../../../../core/decorators/component.decorator";
import BaseComponent from "../../../base.component";

@Component({
    selector: "fc-sign-in-section",
    template: require("./sign-in.section.component.html"),
    styles: require("./sign-in.section.component.scss")
})
export default class SignInSectionComponent extends BaseComponent {
    constructor() {
        super();
        this.num = 3;
        this.name = "Sing Off";
        this.subscriptions = [];
        this.user = {};
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

    isUserNameDefined() {
        let result = Boolean(this.user) && Boolean(this.user.name);
        return result
    }
}