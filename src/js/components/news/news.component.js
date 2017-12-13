import { BaseComponent } from "../base.component.js";
import { Constants } from "../../core/constants";
import { ComponentLoader } from "../../core/component.loader.js";
import { HomeComponent } from "../home/home.component";
import { ApiInvoker } from "../../core/api";
import ModalWindowComponent from "../modal/modal-window.component";

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

    defineDomElementsHook() {
        let domElements = {
            showNewsbuttonElement: document.getElementById("show-news"),
            resetNewsbuttonElement: document.getElementById("reset-news"),
            ulElement: document.getElementsByTagName("ul")[0]
        };
        this.domElements = domElements;
    }

    bindHandlersHook() {
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

        let apiInvoker = ApiInvoker.getInstance();
        apiInvoker.key = apiKey;

        // These promises will be executed on runtime step.
        // Need to find out how to make them as deferred. 
        const articleData = apiInvoker.getJson();
        const templateModule = import("../../helpers/templates/template.helper.js");

        Promise.all([articleData, templateModule])
            .then(values => values[1].getArticleTemplate(values[0]))
            .then(template => this.domElements.ulElement.innerHTML = template)
            .catch(error => ComponentLoader.loadComponent(new ModalWindowComponent()).showErrorPopup(error))
    }
} 