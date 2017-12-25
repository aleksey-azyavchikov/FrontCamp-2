import { Constants } from "../../core/constants.js";
import { StorageService } from "../../services/storage.service";
import { ComponentLoader } from "../../core/component.loader";
import HomeComponent from "../home/home.component";
import NewsComponent from "../news/news.component";
import BaseComponent from "../base.component";

export default class AppComponent extends BaseComponent {
    constructor() {
        super();
        this.config = {
            selector: "app",
            template: require("./app.component.html"),
            styles: require("./app.component.scss")
        };
        this.storage = new StorageService(localStorage);
    }

    initializeHook() {
        this.run();
    }

    run() {
        let apiKey = this.storage.getItem(Constants.key);
            apiKey === null 
                ? ComponentLoader.loadComponent(HomeComponent)
                : ComponentLoader.loadComponent(NewsComponent)
    }
}

