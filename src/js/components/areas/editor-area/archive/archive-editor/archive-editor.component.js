import { Component } from "../../../../../core/decorators/component.decorator";
import BaseComponent from "../../../../base.component";
import { EditorMode } from "../../../../../core/enums/editor-mode.enum";
import defaultImage from "../../../../../../content/images/default-thumbnail.jpg";
import { ApiInvoker } from "../../../../../core/api";
import { Endpoints } from "../../../../../core/endpoints";
import { Article } from "../../../../../models/article";
import { ActionType } from "../../../../../reducers/action-type";
import { CommandService } from "../../../../../services/command.service";

@Component({
    selector: "fc-archive-editor",
    template: require("./archive-editor.component.html"),
    styles: require("./archive-editor.component.scss"),
    children: []
})
export default class ArchiveEditorComponent extends BaseComponent {
    constructor() {
        super();
        this.selected = null;
        this.mode = null;
    }

    get isAddMode() {
        return this.mode === EditorMode.Add;
    }

    initializeParamsHook() {
        this.mode = this.config.params.mode;
        this.selected = this.isAddMode ? null : this.config.params.selected;
    }

    initializeHook() {
        this.image = { path: null, data: null };
    }

    defineDomElementsHook() {
        let domElements = {
            titleInput: this.config.ref.querySelector("input[id='inputTitle']"),
            descriptionInput: this.config.ref.querySelector("textarea[id='inputDescription']"),
            sourceInput: this.config.ref.querySelector("input[id='inputSource']"),
            authorInput: this.config.ref.querySelector("input[id='inputAuthor']"),
            urlImageInput: this.config.ref.querySelector("input[id='inputImageUrl']"),

            image: this.config.ref.querySelector("#image"),
            fileInput: this.config.ref.querySelector("input[type='file']"),
            submitButton: this.config.ref.querySelector("button[id='submit']"),
            cancelButton: this.config.ref.querySelector("button[id='cancel']")
        }
        this.domElements = domElements;
    }

    bindHandlersHook() {
        this.bindEvent(this.domElements.fileInput, "change", (event) => this.loadImage(event))
        this.bindEvent(this.domElements.submitButton, "click", (event) => this.submit(event))
        this.bindEvent(this.domElements.cancelButton, "click", (event) => this.cancel(event))
    }

    postInitializeHook() {
        if(!this.isNoImage()) {
            this.domElements.image.src = this.isAddMode ? defaultImage : this.getImageData(this.selected);
        }
    }

    getImageData(selected) {
        let result = selected && selected.image && selected.image.data ? selected.image.data.toString("base64") : selected.urlToImage;
        return result;
    }

    loadImage(event) {
        this.image.path = event.target.files[0];
        let fileReader = new FileReader();
        fileReader.onload = (loadEvent) => {
            this.image.data = loadEvent.target.result;
            this.domElements.image.setAttribute("src", this.image.data);
        }
        fileReader.readAsDataURL(this.image.path);
    }

    getArticle() {
        let article = new Article({ 
            title: this.domElements.titleInput.value,
            description: this.domElements.descriptionInput.value,
            author: this.domElements.authorInput.value,
            url: this.domElements.sourceInput.value,
            urlToImage: this.domElements.urlImageInput.value,
            image: this.getImageDataForRequest(),
         });
         console.log(article);
         return article;
    }

    getImageDataForRequest() {
        let image = {
            data: this.isAddMode && this.image && this.image.data || null,
            contentType: this.isAddMode && this.image && this.image.path && this.image.path.type || null
        }
        return image;
    }

    submit() {
        let apiInvoker = ApiInvoker.getInstance();
        let article = this.getArticle();
        let httpCall = this.isAddMode 
            ? apiInvoker.invokePost(Endpoints.Articles(), { body: JSON.stringify(article) })
            : apiInvoker.invokePut(Endpoints.Articles({ id: this.selected._id }), { body: JSON.stringify(article) });
        
        let commandService = CommandService.getInstance();
        httpCall
            .then(() => this.dispatchMode(EditorMode.None))
            .then(() => commandService.updateArticles.next());
    }

    cancel() {
        this.dispatchMode(EditorMode.None);
    }

    isNoImage() {
        let result = !this.isAddMode && 
            (this.selected.urlToImage === null || 
            this.selected.urlToImage === "") &&
            (this.selected.image === undefined ||
            this.selected.image.data === null);

        return result;
    }

    dispatchMode(mode) {
        this.config.store.dispatch({ 
            type: ActionType.SetArchiveEditorMode,
            payload: mode
        });
    }
}