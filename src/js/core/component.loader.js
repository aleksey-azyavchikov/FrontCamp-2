export class ComponentLoader {

    static loadComponent(module, config) {
        if (config === undefined || config === null) {
            config = {};
        }
        const selector = module.selector;
        if(!Boolean(selector)) {
            throw new Error("The component doesn't have selector", module);
        }

        const refs = document.getElementsByTagName(module.selector);
        let components = [];
        for (let ref of refs) {
            components.push(new module().buildComponent({ ref: ref }))
        }

        return components[0];
    }
}