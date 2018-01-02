
import { StorageService } from "../../services/storage.service";
import HomeComponent from "../home/home.component";
import NewsComponent from "../news/news.component";
import BaseComponent from "../base.component";
import HeaderComponent from "../header/header.component";
import FooterComponent from "../footer/footer.component";
import ModalWindowComponent from "../modal/modal-window.component";
import { Component } from "../../core/decorators/component.decorator";

@Component({
    selector: "fc-app",
    template: require("./app.component.html"),
    styles: require("./app.component.scss"),
    children: [
        HeaderComponent,
        HomeComponent,
        NewsComponent,
        FooterComponent,
        ModalWindowComponent
    ]
})
export default class AppComponent extends BaseComponent {
    constructor() {
        super();
        this.storage = new StorageService(localStorage);
    }
}

