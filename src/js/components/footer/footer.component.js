import BaseComponent from "../base.component";

export default class FooterComponent extends BaseComponent {
    constructor() {
        super();
        this.config = {
            selector: FooterComponent.selector,
            template: require("./footer.component.html"),
            styles: require("./footer.component.scss"),
        };
    }

    static get selector() {
        const selector = "fc-footer";
        return selector;
    }
}