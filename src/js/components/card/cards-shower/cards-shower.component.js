import { Component } from "../../../core/decorators/component.decorator";
import BaseComponent from "../../base.component";
import CardComponent from "../card.component";

@Component({
    selector: "fc-cards-shower",
    template: require("./cards-shower.component.html"),
    styles: require("./cards-shower.component.scss"),
    children: [CardComponent]
})
export default class CardsShowerComponent extends BaseComponent {
    constructor() {
        super();
    }

    initializeHook() {
        this.cards = this.config.params.cards;
    }
}