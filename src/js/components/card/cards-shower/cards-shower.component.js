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
        this.subscriptions = [];
    }

    initializeHook() {
        this.subscriptions.push(this.config.store.state$
            .map(state => state.cards)
            .filter(cards => cards !== this.cards)
            .do(cards => this.cards = cards)
            .do(() => console.log("Rerer", this.cards))
            .do(() => this.render())
            .subscribe()
        );
    }

    destroyHook() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}