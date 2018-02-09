import { Component } from "../../core/decorators/component.decorator";
import BaseComponent from "../base.component";
import BrandSectionComponent from "./sections/brand/brand.section.component";
import SignInSectionComponent from "./sections/sign-in/sign-in.section.component";
import GreeterSectionComponent from "./sections/greeter/greeter.section.component";

@Component({
    selector: "fc-header",
    template: require("./header.component.html"),
    styles: require("./header.component.scss"),
    children: [
        BrandSectionComponent,
        SignInSectionComponent,
        GreeterSectionComponent
    ]
})
export default class HeaderComponent extends BaseComponent {
    constructor() {
        super();
        this.isSearchEnabled = false;
        this.activePage = "";
        this.subscriptions = [];
    }

    initializeHook() {
        this.subscriptions.push(this.config.store.state$
            .map(state => state.activePage)
            .filter(activePage => this.activePage !== activePage)
            .do(activePage => this.activePage = activePage)
            .do(() => this.render())
            .subscribe()
        );
    }

    destroyHook() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}