export class ComponentLoader {

    static loadComponent(component, config) {
        if (config === undefined || config === null) {
            config = {};
        }
        component.buildComponent();
        return component;
    }
}