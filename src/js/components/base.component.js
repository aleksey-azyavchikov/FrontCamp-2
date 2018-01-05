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
        this.buildComponent({});
        // const config = this.config;
        // this.bindHtml(config);
        // // this.defineDomElementsHook();
        // // this.checkDomElements(config);
        // // this.bindHandlersHook();
        // // this.loadChildComponents(config);
        // this.renderChildComponents(config)
    }

    bindHtml({ ref, template }) {
        ref.innerHTML = template;
        HtmlAnalyzer.getInstance().analyze(ref, this);
    }

    defineDomElementsHook() {}

    bindHandlersHook() {}

    initializeHook() { 
        //console.log("Component: ", this.config.selector, this.config); 
        console.log("Component: ", this.config.selector); 
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
        // this.renderChildComponents(config);
        const { children = [] }  = config;
        const defaultChildConfig = this.getDefauldChildConfig(config);
        children.forEach(child => { 
           let childComponents = ComponentLoader.getInstance().loadComponent(child, defaultChildConfig);
           childComponents.forEach(childComponent => config.childComponents.push(childComponent))
        });
    }

    renderChildComponents(config) {
        this.updateChildren(config);
        this.renderChildren(config);
    }

    renderChildren(config) {
        const { childComponents = [] } = config;
        const unstableChildComponents = childComponents.filter(childComponents => !childComponents.stable);
        unstableChildComponents.forEach(childComponent => childComponent.render());
    }

    updateChildren(config) {
        this.removeUnvisibleChildren(config);
        this.createNewChildren(config);
    }

    removeUnvisibleChildren(config) {
        const before = config.childComponents;
        const removedChildComponents = config.childComponents.filter(childComponent => !Boolean(childComponent.config.ref));
        removedChildComponents.forEach(removedChildComponent => removedChildComponent.destroy(config));
        config.childComponents = config.childComponents.filter(childComponent => Boolean(childComponent.config.ref));
        const after = config.childComponents;
        if(before.length !== after.length) {
            console.log("Remove: ", config.selector, ": ", before, " -> ", after);
        }
    }

    createNewChildren(config) {
        const before = config.childComponents;
        const { children = [] }  = config;
        const componentLoader = ComponentLoader.getInstance();
        let defaultChildConfig = this.getDefauldChildConfig(config);
        children.forEach(child => {
            let childRefs = componentLoader.defineRefComponents(child, defaultChildConfig);
            for(let childRef of childRefs) {
                if(!this.checkChildRefExist(config, childRef)) {
                    const component = componentLoader.createComponent(child, defaultChildConfig, childRef);
                    config.childComponents.push(component);
                }
            }
        });
        const after = config.childComponents;
        if(before.length !== after.length) {
            console.log("Create: ", config.selector, ": ", before, " -> ", after);
        }
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

    destroy(config) {
        const before = config.childComponents;
        config.childComponents.forEach(childComponent => childComponent.destroy());
        config.childComponents = [];
        this.destroyHook();
        const after = config.childComponents;
        if(before.length !== after.length) {
            console.log("Destroy: ", config.selector, ": ", before, " -> ", after);
        }
    }
}