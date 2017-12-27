import BaseComponent from "../base.component";

export default class FooterComponent extends BaseComponent {
    constructor() {
        super();
        this.config = {
            selector: "fc-footer",
            template: require("./footer.component.html"),
            styles: require("./footer.component.scss"),
        };
    }
}