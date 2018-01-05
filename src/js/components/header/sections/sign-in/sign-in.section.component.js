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
    }

    initializeHook() {
        super.initializeHook();
        
        this.config.store.state$
            .filter(state => state.user !== this.user)
            .do(state => this.user = state.user)
            .do(() => this.render())
            .do(() => console.log("User", this.user, this.config.selector))
            .subscribe()
    }

    isUserNameDefined() {
        let result = Boolean(this.user) && Boolean(this.user.name);
        return result
    }
}