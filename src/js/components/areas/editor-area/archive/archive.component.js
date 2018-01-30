import BaseComponent from "../../../base.component";
import { Component } from "../../../../core/decorators/component.decorator";
import { ApiInvoker } from "../../../../core/api";
import { Endpoints } from "../../../../core/endpoints";
import { TemplateHelpers } from "../../../../helpers/templates/template.helper";
import ArchivePanelComponent from "./archive-panel/archive-panel.component";

@Component({
    selector: "fc-archive",
    template: require("./archive.component.html"),
    styles: require("./archive.component.scss"),
    children: [
        ArchivePanelComponent
    ]
})
export default class ArchiveComponent extends BaseComponent {
    constructor() {
        super();
        this.articles = [];
        this.selected = null;
    }

    initializeHook() {
        console.log("Select", this.selected);
        let apiInvoker = ApiInvoker.getInstance();
        apiInvoker.invokeGet(Endpoints.Articles())
            .then(data => this.articles = this.format(data.articles))
            .then(_ => this.render())
    }

    defineDomElementsHook() {
        let domElements = {
            rows: this.config.ref.querySelectorAll("tbody tr"),
            body: this.config.ref.querySelector("tbody"),
        };
        this.domElements = domElements;
    }

    bindHandlersHook() {
        this.bindEvent(this.domElements.body, "click", (event) => {
            let finded = this.articles.find(article => article._id === event.target.parentNode.id);
            this.selected = finded === this.selected ? null : finded;
            this.render();
        })
    }

    format(articles) {
        let helper = TemplateHelpers.getInstance();
        return articles.map(article => {
             article.publishedAt = helper.getActualDate(article.publishedAt);
             return article;
        });
    }
}