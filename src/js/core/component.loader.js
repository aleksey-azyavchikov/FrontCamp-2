export class ComponentLoader {

    static loadComponent(module, config) {
        if (config === undefined || config === null) {
            config = {};
        }
    
        ComponentLoader.checkProperty("selector", module.selector, module);
        ComponentLoader.checkProperty("pref", config.pref, config);
        ComponentLoader.checkProperty("store", config.store, config);

        const refs = config.pref.getElementsByTagName(module.selector);
        let components = [];
        for (let ref of refs) {
            let component = new module();
            component.buildComponent({
                pref: config.pref, 
                store: config.store,
                ref: ref
            });
            components.push(component)
        }

        return components;
    }

    static checkProperty(propertyName, value, object) {
        const message = `The component doesn't provide property: ${propertyName}`;
        if(!Boolean(value)) {
            throw new Error(message, object);
        }
    }
}