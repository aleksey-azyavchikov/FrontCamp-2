import { BaseDirective } from "./base.directive";
import { DirectiveSingleton } from "../../../decorators/directive-singleton.decorator";

@DirectiveSingleton({
    directiveName: "cmCase",
})
export class CmCaseDirective extends BaseDirective {
    constructor() {
        super();
    }

    analyzeDirective(innerDomElement, scope, switchValue) {
        this.analyzers.forEach(analyzer => analyzer.analyze(innerDomElement, scope));
        let caseValue = super.execute(innerDomElement, scope);
        if(switchValue !== caseValue) {
            this.applyDirective(innerDomElement)
        }
    }

    applyDirective(innerDomElement) {
        innerDomElement.remove();
    }
}