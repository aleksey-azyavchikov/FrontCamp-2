import { BaseDirective } from "./base.directive";
import { DirectiveSingleton } from "../../../decorators/directive-singleton.decorator";

@DirectiveSingleton({
    directiveName: "cmIf"
})
export class CmIfDirective extends BaseDirective {
    constructor() {
        super();
    }

    analyzeDirective(innerDomElement, scope) {
        if(this.checklDirective(innerDomElement, scope)) {
            this.applyDirective(innerDomElement)
        }
    }

    checklDirective(innerDomElement, scope) {
        return !super.execute(innerDomElement, scope);
    }

    applyDirective(innerDomElement) {
        innerDomElement.remove();
    }
}