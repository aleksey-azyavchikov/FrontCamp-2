import { Component } from "../../../../../core/decorators/component.decorator";
import BaseComponent from "../../../../base.component";
import { EditorMode } from "../../../../../core/enums/editor-mode.enum";
import { ActionType } from "../../../../../reducers/action-type";
import { CommandService } from "../../../../../services/command.service";
import { ApiInvoker } from "../../../../../core/api";
import { Endpoints } from "../../../../../core/endpoints";

@Component({
    selector: "fc-archive-panel",
    template: require("./archive-panel.component.html"),
    styles: require("./archive-panel.component.scss"),
    children: []
})
export default class ArchivePanelComponent extends BaseComponent {
    constructor() {
        super();
        this.subscriptions = [];
        this.selected = null;
        this.mode = null;
        this.EditorMode = EditorMode;
    }

    initializeHook() {
        this.selected = this.config.params.selected;
        this.mode = this.config.params.mode;

        let commandService = CommandService.getInstance();
        this.subscriptions.push(commandService.removeArticle
            .do(() => this.removeArticleHttp(this.selected._id))
            .subscribe()
        );

    }

    destroyHook() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    defineDomElementsHook() {
        let domElements = {
            panel: this.config.ref.querySelector(".panel"),
            removeItemModal: $("#removeItemModal")
        };
        
        this.domElements = domElements;
    }

    bindHandlersHook() {
        this.bindEvent(this.domElements.panel, "click", (event) => { 
            this.processDeleteAction(event.target.id);
            this.dispatchMode(event.target.id);
        });
    }

    dispatchMode(mode) {
        this.config.store.dispatch({ 
            type: ActionType.SetArchiveEditorMode,
            payload: mode
        });
    }

    processDeleteAction(mode) {
        if(mode === EditorMode.Delete) {
            this.domElements.removeItemModal.modal("show");
        }
    }

    removeArticleHttp(id) {
        let commandService = CommandService.getInstance();
        let apiInvoker = ApiInvoker.getInstance();
        apiInvoker.invokeDelete(Endpoints.Articles({ id: id }))
            .then(() => commandService.updateArticles.next());
    }
}