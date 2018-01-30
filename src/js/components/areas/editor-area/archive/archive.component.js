import BaseComponent from "../../../base.component";
import { Component } from "../../../../core/decorators/component.decorator";
import { ApiInvoker } from "../../../../core/api";
import { Endpoints } from "../../../../core/endpoints";
import { TemplateHelpers } from "../../../../helpers/templates/template.helper";
import ArchiveTableComponent from "./archive-table/archive-table.component";
import ArchivePanelComponent from "./archive-panel/archive-panel.component";
import ArchiveEditorComponent from "./archive-editor/archive-editor.component";
import { EditorMode } from "../../../../core/enums/editor-mode.enum";

@Component({
    selector: "fc-archive",
    template: require("./archive.component.html"),
    styles: require("./archive.component.scss"),
    children: [
        ArchiveTableComponent,
        ArchivePanelComponent,
        ArchiveEditorComponent
    ]
})
export default class ArchiveComponent extends BaseComponent {
    constructor() {
        super();
        this.subscriptions = []
        this.articles = [];
        this.selected = null;
        this.mode = null;
    }

    initializeHook() {
        console.log("Select", this.selected);
        let apiInvoker = ApiInvoker.getInstance();
        apiInvoker.invokeGet(Endpoints.Articles())
            .then(data => this.articles = this.format(data.articles))
            .then(_ => this.render())
        
        this.subscriptions.push(this.config.store.state$
            .map(state => state.selectedArticle)
            .filter(selectedArticle => this.selected !== selectedArticle)
            .do(selectedArticle => this.selected = selectedArticle)
            .do(() => this.render())
            .subscribe()
        );

        this.subscriptions.push(this.config.store.state$
            .map(state => { console.log(state); return state.editorModes.archiveMode })
            .filter(mode => this.mode !== mode)
            .do(mode => this.mode = mode)
            .do(() => this.render())
            .subscribe()
        );
    }

    format(articles) {
        let helper = TemplateHelpers.getInstance();
        return articles.map(article => {
             article.publishedAt = helper.getActualDate(article.publishedAt);
             return article;
        });
    }

    isFullTable() {
        let result = this.mode === EditorMode.None || this.mode === EditorMode.Delete;
        console.log("rere", result);
        return result;
    }

    isEditorEnable() {
        let result = this.mode === EditorMode.Add || (this.mode === EditorMode.Edit && this.selected);
        return result;
    }

    destroyHook() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe())
    }
}