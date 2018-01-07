import { Component } from "../../core/decorators/component.decorator";
import BaseComponent from "../base.component";
import BrandSectionComponent from "./sections/brand/brand.section.component";
import SignInSectionComponent from "./sections/sign-in/sign-in.section.component";

@Component({
    selector: "fc-header",
    template: require("./header.component.html"),
    styles: require("./header.component.scss"),
    children: [
        BrandSectionComponent,
        SignInSectionComponent
    ]
})
export default class HeaderComponent extends BaseComponent {
    constructor() {
        super();
        this.isSearchEnabled = false;
        this.name = "OLO";
    }
}