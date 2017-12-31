export class ComponentLoader {

    static loadComponent(module, config) {
        if (config === undefined || config === null) {
            config = {};
        }
        
        const { selector } = module;
        if(!Boolean(selector)) {
            throw new Error("The component doesn't provide selector", module);
        }
        const { pref } = config; 
        if(!Boolean(pref)) {
            throw new Error("The component doesn't provide parent ref", module);
        }

        const refs = pref.getElementsByTagName(module.selector);
        let components = [];
        for (let ref of refs) {
            components.push(new module().buildComponent({pref: pref, ref: ref }))
        }

        // need refactor.
        return components[0];
    }
}