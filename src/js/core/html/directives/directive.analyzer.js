import { CmIfDirective } from "./custom-directives/cm-if.directive";
import { AnalyzerSingleton } from "../../decorators/analyzer-singleton.decorator";
import { SwitchCaseAnalyzer } from "./custom-directives/switch-case.analyzer";

@AnalyzerSingleton({
    analyzers: [
        CmIfDirective.getInstance(),
        SwitchCaseAnalyzer.getInstance()
    ]
})
export class DirectiveAnalyzer {}