import { ValidationFactory, EnumFieldsValidators } from "../../core/validation.js";
import { Constants } from "../../core/constants";
import BaseComponent from "../base.component";
import { StorageService } from "../../services/storage.service";
import { Component } from "../../core/decorators/component.decorator";
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
            .do(() => console.log("Rerer", this.cards))
            .do(() => this.render())
            .subscribe()
        );
    }

    destroyHook() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    defineDomElementsHook() {
        // let domElements = {
        //     buttonElement: document.getElementsByTagName("button")[0],
        //     inputElement: document.getElementsByTagName("input")[0]
        // };
        // this.domElements = domElements;
    }
    
    bindHandlersHook() {
        // this.domElements.buttonElement.addEventListener("click", () => this.applyKey());
    }

    applyKey() {
        let validationFactory = ValidationFactory.getInstance();
        let proxy = validationFactory.getProxy(EnumFieldsValidators.ApiKeyField);
        
        try
        {   
            proxy.value = this.domElements.inputElement.value;;
        } catch(error) {
            setTimeout(() => {
                // ComponentLoader
                //     .loadComponent(ModalWindowComponent, this.config)
                //     .showErrorPopup(error);
            }, 1000)
            return;
        } 
    
        this.storage.setItem(Constants.key, proxy.value);
        // ComponentLoader.loadComponent(NewsComponent, this.config);
    }
}