import { StorageService } from "../services/storage.service";

export class BaseComponent {
    constructor(config) {
        this.storage = config && config.storage || new StorageService(localStorage);
        this.domElements = null;
    }

    buildComponent() {
        this.bindHtml(this.selector, this.template);
        this.defineDomElements();
        this.bindHandlers();
        this.load();
    }

    bindHtml(selector, template) {
        let elements = document.getElementsByTagName(selector);
        for(let element of elements) {
            element.innerHTML = template;
        }
    }

    defineDomElements() {}

    bindHandlers() {}

    load() {}

    // showErrorPopup(text) {
    //     let spanElement = document.getElementsByTagName("span")[0];
    //     let popupElement = document.getElementsByClassName("error-api")[0];
    //     spanElement.textContent = text;
    //     popupElement.style.display = "block";
    // }
}