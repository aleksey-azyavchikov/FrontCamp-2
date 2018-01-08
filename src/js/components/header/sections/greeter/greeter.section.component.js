import { Component } from "../../../../core/decorators/component.decorator";
import BaseComponent from "../../../base.component";

@Component({
    selector: "fc-greeter-section",
    template: require("./greeter.section.component.html"),
    styles: require("./greeter.section.component.scss")
})
export default class GreeterSectionComponent extends BaseComponent {
    constructor() {
        super()
        this.subscriptions = [];
        this.user = {};
    }

    initializeHook() {
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