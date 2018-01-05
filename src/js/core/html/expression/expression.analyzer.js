import { CmIfDirective } from "./custom-directives/cmIf-directive";

export class ExpressionAnalyzer {
    constructor() {
        this.analyzers = [new CmIfDirective()];
    }

    static getInstance() {
        return this.instance = !Boolean(this.instance)
            ? new ExpressionAnalyzer()
            : this.instance;
    }

    analyze(domElement, scope) {
        this.analyzers.forEach(analyzer => analyzer.analyze(domElement, scope));
    }
}