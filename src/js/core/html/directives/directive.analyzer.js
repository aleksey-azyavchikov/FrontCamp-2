import { CmIfDirective } from "./custom-directives/cm-if.directive";
import { SwitchCaseAnalyzer } from "./custom-directives/switch-case.analyzer";
import { AnalyzerSingleton } from "../../decorators/analyzers/analyzer-singleton.decorator";
import { CmForDirective } from "./custom-directives/cm-for.directive";

@AnalyzerSingleton({
    analyzers: [
        CmForDirective.getInstance(),
        CmIfDirective.getInstance(),
        SwitchCaseAnalyzer.getInstance()
    ]
})
export class DirectiveAnalyzer {}