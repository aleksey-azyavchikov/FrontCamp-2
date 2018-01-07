import { AnalyzerSingleton } from "../../decorators/analyzers/analyzer-singleton.decorator";
import { ContentExpression } from "./custom-expressions/content.expression";

@AnalyzerSingleton({
    analyzers: [
        ContentExpression.getInstance()
    ]
})
export class ExpressionAnalyzer {
    constructor() {
    }
}