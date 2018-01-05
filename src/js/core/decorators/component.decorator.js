import { Guid } from "../guid";

export function Component(config) {
    return function (target) {
        target.selector = config.selector;
        Object.assign(config, {
            id: Guid.create(),
            childComponents: [],
            stable: false
        }, config);
        target.prototype.config = config;
    }
}