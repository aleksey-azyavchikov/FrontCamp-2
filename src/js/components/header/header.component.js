import BaseComponent from "../base.component";

export default class HeaderComponent extends BaseComponent {
    constructor() {
        super();
        this.config = {
            selector: "header",
            template: require("./header.component.html"),
            styles: require("./header.component.scss"),
        };
    }
}