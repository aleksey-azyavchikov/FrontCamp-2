import { BaseComponent } from "../base.component.js";
import { Constants } from "../../core/constants";
import { ApiInvoker } from "../../core/api.js";
import { ComponentLoader } from "../../core/component.loader.js";
import { TemplateHelpers } from "../../helpers/template.helper";

import template from "./news.component.html";
import css from "./news.component.css";

export class NewsComponent extends BaseComponent {
    constructor(config) {
        super(config);
        this.template = config && config.template || template;
        this.selector = config && config.selector || this.defaultSelector;
    }

    get defaultSelector() {
        const selector = "page";
        return selector;
    }

    defineDomElements() {
        let domElements = {
            showNewsbuttonElement: document.getElementById("show-news"),
            resetNewsbuttonElement: document.getElementById("reset-news"),
            ulElement: document.getElementsByTagName("ul")[0]
        };
        this.domElements = domElements;
    }

    bindHandlers() {
        this.domElements.showNewsbuttonElement.addEventListener("click", () => this.showHandler());
        this.domElements.resetNewsbuttonElement.addEventListener("click", () => this.resetHandler());
    }

    resetHandler() {
        this.storage.removeItem(Constants.key);
        ComponentLoader.loadComponent(new HomeComponent())
    }

    showHandler() {
        let apiKey = this.storage.getItem(Constants.key);
        if(apiKey === null) { 
            ComponentLoader.loadComponent(new HomeComponent());
            return;
        }

        let apiInvoker = new ApiInvoker(apiKey);
        apiInvoker.getJson(data => {
            const template = TemplateHelpers.getArticleTemplate(data);
            this.domElements.ulElement.innerHTML = template; 
        },
        (error) => {
            // super.showErrorPopup(Constants.requestErrorMessage);
        });
    }

    initialize() {
        let apiKey = localStorage.getItem(Constants.key);
        if(apiKey === null) { 
            ComponentLoader.loadComponent(new HomeComponent(), { selector: "page" });
            return;
        }
    
        
    }
} 