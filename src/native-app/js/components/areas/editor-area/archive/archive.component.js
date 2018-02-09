import BaseComponent from "../../../base.component";
import { Component } from "../../../../core/decorators/component.decorator";
import { ApiInvoker } from "../../../../core/api";
import { Endpoints } from "../../../../core/endpoints";
import { TemplateHelpers } from "../../../../helpers/templates/template.helper";
import ArchiveTableComponent from "./archive-table/archive-table.component";
import ArchivePanelComponent from "./archive-panel/archive-panel.component";
import ArchiveEditorComponent from "./archive-editor/archive-editor.component";
import { EditorMode } from "../../../../core/enums/editor-mode.enum";
import { ActionType } from "../../../../reducers/action-type";
import { CommandService } from "../../../../services/command.service";

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
        let commandService = CommandService.getInstance();
        this.subscriptions.push(commandService.updateArticles
            .do(() => this.getArticlesHttp())
            .subscribe()
        );

        this.subscriptions.push(this.config.store.state$
            .map(state => state.articleModel.selected)
            .filter(selected => this.selected !== selected)
            .do(selected => this.selected = selected)
            .do(() => this.render())
            .subscribe()
        );

        this.subscriptions.push(this.config.store.state$
            .map(state => state.articleModel.articles)
            .filter(articles => this.articles !== articles)
            .do(articles => this.articles = articles)
            .do(() => this.render())
            .subscribe()
        );

        this.subscriptions.push(this.config.store.state$
            .map(state => state.editorModes.archiveMode)
            .filter(mode => this.mode !== mode)
            .do(mode => this.mode = mode)
            .do(() => this.render())
            .subscribe()
        );

        commandService.updateArticles.next();
    }

    getArticlesHttp() {
        let apiInvoker = ApiInvoker.getInstance();
        apiInvoker.invokeGet(Endpoints.Articles())
            .then(data => this.updateArticles(TemplateHelpers.getInstance().formatArticles(data.articles)));
    }

    updateArticles(articles) {
        this.config.store.dispatch({
            type: ActionType.UpdateArticles,
            payload: articles
        })
    }

    

    isFullTable() {
        let result = this.mode === EditorMode.None || this.mode === EditorMode.Delete;
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