import { DirectiveAnalyzer } from "./directives/directive.analyzer";
import { AnalyzerSingleton } from "../decorators/analyzer-singleton.decorator";

@AnalyzerSingleton({
    analyzers: [
        DirectiveAnalyzer.getInstance()
    ]
})
export class HtmlAnalyzer {}