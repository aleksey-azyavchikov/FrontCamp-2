
import { Component } from "../../core/decorators/component.decorator";
import { StorageService } from "../../services/storage.service";
import HomeComponent from "../home/home.component";
import NewsComponent from "../news/news.component";
import BaseComponent from "../base.component";
import HeaderComponent from "../header/header.component";
import FooterComponent from "../footer/footer.component";
import PopupContainerComponent from "../popups/popup-container/popup-container.component";
import { PageType } from "../../core/enums/page-type.enum";

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
        this.subscriptions = [];
        this.activePage = PageType.Home;
        this.PageType = PageType;
        this.storage = new StorageService(localStorage);
    }

    initializeHook() {
        this.subscriptions.push(this.config.store.state$
            .map(state => state.activePage)
            .filter(activePage => this.activePage !== activePage)
            .do(activePage => this.activePage = activePage)
            .do(() => this.render())
            .subscribe()
        );
    }

    destroyHook() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}

