import { CmCaseDirective } from "./cm-case.directive";
import { CmSwitchDirective } from "./cm-switch.directive";
import { AnalyzerSingleton } from "../../../decorators/analyzers/analyzer-singleton.decorator";

@AnalyzerSingleton({
    analyzers: [
        CmSwitchDirective.getInstance(),
        CmCaseDirective.getInstance()
    ]
})
export class SwitchCaseAnalyzer {
    constructor() {
    }

    analyze(domElement, scope) {
        let switchDirective = this.analyzers[0];
        let caseDirective = this.analyzers[1];

        switchDirective.analyzers.push(caseDirective);
        caseDirective.analyzers.push(switchDirective);
        
        switchDirective.analyze(domElement, scope);
    }
}