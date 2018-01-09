
import { StorageService } from "../../services/storage.service";
import { Component } from "../../core/decorators/component.decorator";
import BaseComponent from "../base.component";
import CardsShowerComponent from "../card/cards-shower/cards-shower.component";

@Component({
    selector: "fc-home-page",
    template: require("./home.component.html"),
    styles: require("./home.component.scss"),
    children: [CardsShowerComponent]
})
export default class HomeComponent extends BaseComponent {
    constructor() {
        super();
        this.storage = new StorageService(localStorage);
        this.subscriptions = [];
    }

    initializeHook() {
        this.subscriptions.push(this.config.store.state$
            .map(state => state.cards)
            .filter(cards => cards !== this.cards)
            .do(cards => this.cards = cards)
            .do(() => this.render())
            .subscribe()
        );
    }

    destroyHook() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}