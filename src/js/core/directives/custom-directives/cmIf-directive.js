import { BaseDirective } from "./base-directive";


export class CmIfDirective extends BaseDirective {
    constructor() {
        super();
        this.directiveName = "cmIf";
    }

    analyze(domElement, scope) {
        super.analyze(domElement, scope);
    }

    analyzeDirective(innerDomElement, directiveName, scope) {
        if(this.checkIfDirective(innerDomElement, directiveName, scope)) {
            this.applyIfDirective(innerDomElement)
        }
    }

    checkIfDirective(innerDomElement, directiveName, scope) {
        let value = innerDomElement.getAttribute(this.directiveName);
        var fun = new Function("scope", this.getExpression2(value));
        //var fun = eval(this.getExpression(value));
        let result = fun(scope);
        console.log(result);
        return result;
    }

    applyIfDirective(innerDomElement) {
        innerDomElement.remove();
    }

    getExpression(expression) {
        return `(function() { return !${expression} })`;
    }

    getExpression2(expression) {
        return `return !${expression}`;
    } 
}