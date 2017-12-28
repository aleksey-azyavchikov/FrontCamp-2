import { Guid } from "../core/guid";
import { DirectiveAnalyzer } from "../core/directives/directive.analyzer";

export default class BaseComponent {
    constructor() {
        this.config = {};
    }

    static get selector() { return null }

    buildComponent(newConfig) {
        this.setup(newConfig);
        this.bindHtmlHook(this.config.ref, this.config.template);
        this.defineDomElementsHook();
        this.checkDomElementsHook();
        this.bindHandlersHook();
        this.initializeHook();
    }

    bindHtmlHook(ref, template) {
        ref.innerHTML = template;
        DirectiveAnalyzer.getInstance().analyze(ref, this);
    }

    defineDomElementsHook() {}
    
    checkDomElementsHook() {
        if(!Boolean(this.domElements)) {
            return;
        }
        for(let key of Object.keys(this.domElements)) {
            let element = this.domElements[key];
            if(!Boolean(element)) {
                console.error("Dom elements is not found:", key, this.config.selector);
            }
        }
    }

    bindHandlersHook() {}

    initializeHook() {}

    setup(newConfig) {
        this.config.id = Guid.create();
        this.config.template = newConfig && newConfig.template || this.config.template;
        this.config.selector = newConfig && newConfig.selector || this.config.selector;
        this.config.ref = newConfig && newConfig.ref || this.config.ref;
        console.log("Setup", this.config.selector);
    }
}