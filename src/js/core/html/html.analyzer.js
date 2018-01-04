import { DirectiveAnalyzer } from "./directives/directive.analyzer";

export class HtmlAnalyzer {
    constructor() {
        this.analyzers = [new DirectiveAnalyzer()];
    }

    static getInstance() {
        return this.instance = !Boolean(this.instance)
            ? new DirectiveAnalyzer()
            : this.instance;
    }

    analyze(domElement, scope) {
        this.analyzers.forEach(analyzer => analyzer.analyze(domElement, scope));
    }
}