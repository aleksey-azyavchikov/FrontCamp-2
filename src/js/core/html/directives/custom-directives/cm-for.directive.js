import { BaseDirective } from "./base.directive";
import { DirectiveAnalyzerSingleton } from "../../../decorators/analyzers/directive-analyzer-singleton.decorator";
import { ContentExpression } from "../../expression/custom-expressions/content.expression";

@DirectiveAnalyzerSingleton({
    directiveName: "cmFor"
})
export class CmForDirective extends BaseDirective {
    constructor() {
        super();
    }

    analyzeDirective(innerDomElement, scope) {
        let innerHtml = innerDomElement.innerHTML;
        let result = this.execute(innerDomElement, innerHtml, scope, this.transformHtml);
        innerDomElement.innerHTML = result;
    }

    execute(innerDomElement, innerHtml, scope, transform) {
        let expression = innerDomElement.getAttribute(this.directiveName);
        let fun = new Function("innerHtml, transform", this.getExpression(expression));
        let result = fun.call(scope, innerHtml, transform);
        return result;
    }

    getExpression(expression) {
        let variable = expression.replace(/\s+/g, " ").split(" ")[1];
        return `
        let result = ""
        for(${expression})
        {
            console.log("This", { ${variable}: ${variable} });
            let str = transform(innerHtml,  { ${variable}: ${variable} });
            result += str;
        }
        return result;`
    }

    transformHtml(innerHtml, scope) {
        return ContentExpression.getInstance().analyzeExpression(innerHtml, scope);
    }
}