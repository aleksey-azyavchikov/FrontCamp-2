import { StorageService } from "../services/storage.service";

export class BaseComponent {
    constructor(config) {
        this.storage = config && config.storage || new StorageService(localStorage);
    }

    buildComponent() {
        this.bindHtmlHook(this.selector, this.template);
        this.defineDomElementsHook();
        this.checkDomElementsHook();
        this.bindHandlersHook();
        this.initializeHook();
    }

    bindHtmlHook(selector, template) {
        let elements = document.getElementsByTagName(selector);
        for(let element of elements) {
            element.innerHTML = template;
        }
    }

    defineDomElementsHook() {}
    
    checkDomElementsHook() {
        for(let key of Object.keys(this.domElements)) {
            let element = this.domElements[key];
            if(!Boolean(element)) {
                console.error("Dom elements is not found:", key);
            }
        }
    }

    bindHandlersHook() {}

    initializeHook() {}
}