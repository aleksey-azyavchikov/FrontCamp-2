import { Singleton } from "./decorators/singleton.decorator";

@Singleton()
export class ComponentLoader {

    loadComponent(module, config) {
        let components = [];
        const refs = this.defineRefComponents(module, config);
        for(let ref of refs) {
            const component = this.createComponent(module, config, ref);
            components.push(component);
        }
        return components;
    }

    defineRefComponents(module, config) {
        if (config === undefined || config === null) {
            config = {};
        }
    
        this.checkProperty("selector", module.selector, module);
        this.checkProperty("pref", config.pref, config);
        this.checkProperty("store", config.store, config);

        const refs = config.pref.getElementsByTagName(module.selector);
        return refs;
    }

    createComponent(module, config, ref) {
        let component = new module();
        component.buildComponent({
            pref: config.pref, 
            store: config.store,
            ref: ref
        });

        return component;
    }

    checkProperty(propertyName, value, object) {
        const message = `The component doesn't provide property: ${propertyName}`;
        if(!Boolean(value)) {
            throw new Error(message, object);
        }
    }
}