import { Guid } from "../core/guid";
import { DirectiveAnalyzer } from "../core/directives/directive.analyzer";
import { ComponentLoader } from "../core/component.loader";

export default class BaseComponent {
    constructor() {
    }

    buildComponent(additional) {
        const config = this.config;
        this.mergeConfigs(config, additional);
        this.bindHtml();
        this.defineDomElementsHook();
        this.checkDomElements();
        this.bindHandlersHook();
        this.loadChildComponents();
        this.initializeHook();
    }

    render() {
        this.bindHtmlHook(this.config.ref, this.config.template);
    }

    bindHtml() {
        const config = this.config;
        const { ref } = config;
        const { template } = config;
        ref.innerHTML = template;
        DirectiveAnalyzer.getInstance().analyze(ref, this);
    }

    defineDomElementsHook() {}
    
    checkDomElements() {
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

    initializeHook() { console.log("Component", this.config)};

    mergeConfigs(baseConfig, additionalConfig) {
        Object.assign(this.config, baseConfig, additionalConfig, { id: Guid.create() });
    }

    loadChildComponents() {
        const config = this.config;
        const { children = [] } = config
        const defaultChildConfig = this.getDefauldChildConfig(config);
        children.forEach(child => ComponentLoader.loadComponent(child, defaultChildConfig))
    }

    getDefauldChildConfig(config) {
        return {
            pref: config.ref
        }
    } 
}