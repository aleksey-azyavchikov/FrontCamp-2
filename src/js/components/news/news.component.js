import { Constants } from "../../core/constants";
import { ApiInvoker } from "../../core/api";
import { StorageService } from "../../services/storage.service";
import { Component } from "../../core/decorators/component.decorator";
import BaseComponent from "../base.component.js";

@Component({
    selector: "fc-news-page",
    template: require("./news.component.html"),
    styles: require("./news.component.scss")
})
export default class NewsComponent extends BaseComponent {
    constructor() {
        super();
        this.storage = new StorageService(localStorage);
    }

    defineDomElementsHook() {
        // let domElements = {
        //     showNewsbuttonElement: document.getElementById("show-news"),
        //     resetNewsbuttonElement: document.getElementById("reset-news"),
        //     ulElement: document.getElementsByTagName("ul")[0]
        // };
        // this.domElements = domElements;
    }

    bindHandlersHook() {
        // this.domElements.showNewsbuttonElement.addEventListener("click", () => this.showHandler());
        // this.domElements.resetNewsbuttonElement.addEventListener("click", () => this.resetHandler());
    }

    resetHandler() {
        this.storage.removeItem(Constants.key);
        // ComponentLoader.loadComponent(HomeComponent)
    }

    showHandler() {
        let apiKey = this.storage.getItem(Constants.key);
        if(apiKey === null) { 
            // ComponentLoader.loadComponent(HomeComponent);
            return;
        }

        let apiInvoker = ApiInvoker.getInstance();
        apiInvoker.key = apiKey;

        // These promises will be executed on runtime step.
        // Need to find out how to make them as deferred. 
        const articleData = apiInvoker.getJson();
        const templateModule = import(/* webpackChunkName="olol" */ "../../helpers/templates/template.helper.js");

        Promise.all([articleData, templateModule])
            .then(values => values[1].getArticleTemplate(values[0]))
            .then(template => this.domElements.ulElement.innerHTML = template)
            .catch(error => console.error(error));
    }
} 