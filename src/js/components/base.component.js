import { Guid } from "../core/guid";
import { ComponentLoader } from "../core/component.loader";
import { HtmlAnalyzer } from "../core/html/html.analyzer";
import { CmParamsDirective } from "../core/html/directives/custom-directives/cm-params.directive";

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
        this.destroyChildrenComponents();
        this.buildComponent({});
    }

    bindHtml({ ref, template }) {
        ref.innerHTML = template;
        HtmlAnalyzer.getInstance().analyze(ref, this);
    }

    defineDomElementsHook() {}

    bindHandlersHook() {}

    bindEvent(element, eventName,  action) {
        if(element) {
            element.addEventListener(eventName, () => action());
        }
    }

    initializeHook() { 
        console.log("Component: ", this.config.selector, this.config.params); 
    }

    destroyHook() {}
    
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
        const loader = ComponentLoader.getInstance();
        const defaultChildConfiga = this.getDefauldChildConfig(config);
        children.forEach(child => {
            const childRefs = loader.defineRefComponents(child, defaultChildConfiga);
            for(let childRef of childRefs) {
                let defaultChildConfig = this.getDefauldChildConfig(config);
                let params = CmParamsDirective.getInstance().analyze(childRef, this);
                Object.assign(defaultChildConfig, { params });
                console.log("Confog", defaultChildConfig);
                const component = loader.createComponent(child, defaultChildConfig, childRef);
                config.childComponents.push(component);
            }
        });
    }

    checkChildRefExist(config, childRef) {
        const { childComponents = [] } = config;
        return Boolean(childComponents.find(childComponent => childComponent.config.ref === childRef));
    }

    getDefauldChildConfig({ref, store}) {
        return {
            pref: ref,
            store: store
        }
    }

    destroyChildrenComponents() {
        this.config.childComponents.forEach(childComponent => childComponent.destroy());
        this.config.childComponents = [];
    }

    destroy() {
        this.destroyChildrenComponents();
        this.destroyHook();
    }
}