import { ValidationFactory, EnumFieldsValidators } from "../../core/validation.js";
import { BaseComponent } from "../base.component";
import { ComponentLoader } from "../../core/component.loader";
import { NewsComponent } from "../news/news.component";
import { Constants } from "../../core/constants";
import ModalWindowComponent from "../modal/modal-window.component";

import template from "./home.component.html";
import css from "./home.component.scss";

export class HomeComponent extends BaseComponent {
    constructor(config) {
        super(config);
        this.template = config && config.template || template;
        this.selector = config && config.selector || this.defaultSelector;
    }

    get defaultSelector() {
        const selector = "page";
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
                ComponentLoader
                    .loadComponent(new ModalWindowComponent())
                    .showErrorPopup(error);
            }, 1000)
            return;
        } 
    
        this.storage.setItem(Constants.key, proxy.value);
        ComponentLoader.loadComponent(new NewsComponent());
    }
}