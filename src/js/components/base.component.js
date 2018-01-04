import { Guid } from "../core/guid";
import { ComponentLoader } from "../core/component.loader";
import { HtmlAnalyzer } from "../core/html/html.analyzer";

export default class BaseComponent {
    constructor() {
    }

    buildComponent(additional) {
        this.mergeConfigs(this.config, additional);

        const config = this.config;
        this.bindHtml(config);
        this.defineDomElementsHook();
        this.checkDomElements(config);
        this.bindHandlersHook();
        this.loadChildComponents(config);
        this.initializeHook();
    }

    render() {
        const config = this.config;
        this.bindHtml(config);
        this.renderChildComponents(config)
    }

    bindHtml({ ref, template }) {
        ref.innerHTML = template;
        HtmlAnalyzer.getInstance().analyze(ref, this);
    }

    defineDomElementsHook() {}
    
    checkDomElements({ selector }) {
        if(!Boolean(this.domElements)) {
            return;
        }
        for(let key of Object.keys(this.domElements)) {
            let element = this.domElements[key];
            if(!Boolean(element)) {
                console.error("Dom elements is not found:", key, selector);
            }
        }
    }

    bindHandlersHook() {}

    initializeHook() { console.log("Component", this.config)};

    mergeConfigs(baseConfig, additionalConfig) {
        Object.assign(
            baseConfig, 
            additionalConfig, 
            { 
                id: Guid.create(),
                childComponents: []
            }
        );
    }

    loadChildComponents(config) {
        const { children = [] }  = config;
        const defaultChildConfig = this.getDefauldChildConfig(config);
        children.forEach(child => { 
           let childComponents = ComponentLoader.loadComponent(child, defaultChildConfig);
           childComponents.forEach(childComponent => config.childComponents.push(childComponent))
        });
    }

    renderChildComponents(config) {
        const { childComponents = [] }  = config;
        childComponents.forEach(childComponent => {
            childComponent.render();
        });
    }

    getDefauldChildConfig({ref, store}) {
        return {
            pref: ref,
            store: store
        }
    } 
}