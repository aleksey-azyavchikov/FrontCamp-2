
import { ApiInvoker } from "../../core/api";
import { StorageService } from "../../services/storage.service";
import { Component } from "../../core/decorators/component.decorator";
import BaseComponent from "../base.component.js";
import CarouselComponent from "../carousel/carousel.component";
import EditorAreaComponent from "../areas/editor-area/editor-area.component";

@Component({
    selector: "fc-news-page",
    template: require("./news.component.html"),
    styles: require("./news.component.scss"),
    children: [
        CarouselComponent,
        EditorAreaComponent
    ]
})
export default class NewsComponent extends BaseComponent {
    constructor() {
        super();
        this.storage = new StorageService(localStorage);
        this.subscriptions = [];
        this.apiKey = null;
        this.template = null;
    }

    initializeHook() {
        super.initializeHook();
        
        // this.subscriptions.push(this.config.store.state$
        //     .map(state => state.user)
        //     .filter(user => Boolean(user) && Boolean(user.apiKey) && this.apiKey !== user.apiKey)
        //     .do(user => this.apiKey = user.apiKey)
        //     .do(() => this.showNews())
        //     .subscribe()
        // );
    }

    destroyHook() {
        // this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    showNews() {
        let apiInvoker = ApiInvoker.getInstance();
        apiInvoker.key = this.apiKey;

        // These promises will be executed on runtime step.
        // Need to find out how to make them as deferred. 
        const articleData = apiInvoker.getJson();
        const templateModule = import(/* webpackChunkName="olol" */ "../../helpers/templates/template.helper.js");

        Promise.all([articleData, templateModule])
            .then(values => values[1].getCarouselTemplate(values[0]))
            .then(template => this.template = template)
            .then(_ => this.render())
            .catch(error => console.error(error));
    }
} 