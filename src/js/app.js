import { Constants } from "./core/constants.js";
import { StorageService } from "./services/storage.service";
import { ComponentLoader } from "./core/component.loader";
import { HomeComponent } from "./components/home/home.component";
import { NewsComponent } from "./components/news/news.component";

import css from "../css/core.css";
export class App {
    constructor() {
        this.storage = new StorageService();
    }
    run() {
        let apiKey = this.storage.getItem(Constants.key);
            apiKey === null 
                ? ComponentLoader.loadComponent(new HomeComponent())
                : ComponentLoader.loadComponent(new NewsComponent())
    }
}

