export function Component(config) {
    return function (target) {
        target.selector = config.selector;
        // target.prototype = Object.create(BaseComponent.prototype);
        target.prototype.config = config;
        // target.prototype.constructor = target;
    }
}