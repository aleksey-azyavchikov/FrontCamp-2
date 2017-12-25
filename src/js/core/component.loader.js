export class ComponentLoader {

    static loadComponent(module, config) {
        if (config === undefined || config === null) {
            config = {};
        }
        const component = new module().buildComponent(config);
        return component;
    }
}