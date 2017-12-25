import { StorageService } from "../services/storage.service";

export default class BaseComponent {
    constructor() {
        this.config = {};
    }

    buildComponent(newConfig) {
        this.setup(newConfig);
        this.bindHtmlHook(this.config.selector, this.config.template);
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
        if(!Boolean(this.domElements)) {
            return;
        }
        for(let key of Object.keys(this.domElements)) {
            let element = this.domElements[key];
            if(!Boolean(element)) {
                console.error("Dom elements is not found:", key);
            }
        }
    }

    bindHandlersHook() {}

    initializeHook() {}

    setup(newConfig) {
        this.config.template = newConfig && newConfig.template || this.config.template;
        this.config.selector = newConfig && newConfig.selector || this.config.selector;
    }
}