import { Constants } from "../../core/constants";
import { ComponentLoader } from "../../core/component.loader.js";
import { ApiInvoker } from "../../core/api";
import ModalWindowComponent from "../modal/modal-window.component";
import HomeComponent from "../home/home.component";
import BaseComponent from "../base.component.js";
import { StorageService } from "../../services/storage.service";

export default class NewsComponent extends BaseComponent {
    constructor() {
        super();
        this.config = {
            selector: "page",
            template: require("./news.component.html"),
            styles: require("./news.component.scss")
        };
        this.storage = new StorageService(localStorage);
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
        ComponentLoader.loadComponent(HomeComponent)
    }

    showHandler() {
        let apiKey = this.storage.getItem(Constants.key);
        if(apiKey === null) { 
            ComponentLoader.loadComponent(HomeComponent);
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
            .catch(error => ComponentLoader.loadComponent(ModalWindowComponent)
                .showErrorPopup(error))
    }
} 