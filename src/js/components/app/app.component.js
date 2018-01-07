
import { Component } from "../../core/decorators/component.decorator";
import { StorageService } from "../../services/storage.service";
import HomeComponent from "../home/home.component";
import NewsComponent from "../news/news.component";
import BaseComponent from "../base.component";
import HeaderComponent from "../header/header.component";
import FooterComponent from "../footer/footer.component";
import PopupContainerComponent from "../popups/popup-container/popup-container.component";

@Component({
    selector: "fc-app",
    template: require("./app.component.html"),
    styles: require("./app.component.scss"),
    children: [
        HeaderComponent,
        HomeComponent,
        NewsComponent,
        FooterComponent,
        PopupContainerComponent
    ]
})
export default class AppComponent extends BaseComponent {
    constructor() {
        super();
        this.storage = new StorageService(localStorage);
    }

    initializeHook() {
        this.config.store.state$
            .filter(state => state.user !== this.user)
            .do(state => this.user = state.user)
            .do(() => console.log("User", this.user, this.config.selector))
            .do(() => this.render())
            .subscribe()
    }
}

