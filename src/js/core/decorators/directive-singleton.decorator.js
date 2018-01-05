import { AnalyzerSingleton } from "./analyzer-singleton.decorator";

export function DirectiveSingleton(config) {
    return function (target) {
        target.prototype.directiveName = config.directiveName;
        AnalyzerSingleton(config)(target);
        let a = target;
    }
}