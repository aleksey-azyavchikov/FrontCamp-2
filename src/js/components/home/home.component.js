import { ValidationFactory, EnumFieldsValidators } from "../../core/validation.js";
import { Constants } from "../../core/constants";
import BaseComponent from "../base.component";
import { StorageService } from "../../services/storage.service";
export default class HomeComponent extends BaseComponent {
    constructor() {
        super();
        this.config = {
            selector: HomeComponent.selector,
            template: require("./home.component.html"),
            styles: require("./home.component.scss"),
        };
        this.storage = new StorageService(localStorage);
    }

    static get selector() {
        const selector = "fc-home-page";
        return selector;
    }

    defineDomElementsHook() {
        let domElements = {
            buttonElement: document.getElementsByTagName("button")[0],
            inputElement: document.getElementsByTagName("input")[0]
        };
        this.domElements = domElements;
    }
    
    bindHandlersHook() {
        this.domElements.buttonElement.addEventListener("click", () => this.applyKey());
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