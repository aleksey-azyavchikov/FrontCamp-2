import { Constants } from "../../core/constants.js";
import { StorageService } from "../../services/storage.service";
import { ComponentLoader } from "../../core/component.loader";
import HomeComponent from "../home/home.component";
import NewsComponent from "../news/news.component";
import BaseComponent from "../base.component";
import HeaderComponent from "../header/header.component";
import FooterComponent from "../footer/footer.component";
import ModalWindowComponent from "../modal/modal-window.component";
export default class AppComponent extends BaseComponent {
    constructor() {
        super();
        this.config = {
            selector: AppComponent.selector,
            template: require("./app.component.html"),
            styles: require("./app.component.scss")
        };
        this.storage = new StorageService(localStorage);
    }

    static get selector() {
        const selector = "fc-app";
        return selector;
    }

    initializeHook() {
        ComponentLoader.loadComponent(HeaderComponent);
        ComponentLoader.loadComponent(FooterComponent);
        ComponentLoader.loadComponent(ModalWindowComponent);
        this.run();
    }

    run() {
        let apiKey = this.storage.getItem(Constants.key);
            apiKey === null 
                ? ComponentLoader.loadComponent(HomeComponent)
                : ComponentLoader.loadComponent(NewsComponent)
    }
}

