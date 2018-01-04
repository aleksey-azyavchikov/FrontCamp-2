export class BaseDirective {
    constructor() {
        this.directiveName = null;
    }

    query() {
        return `[${this.directiveName}]`;
    }

    analyze(domElement, scope) {
        const directiveQuery = this.query(); 
        const directiveName = this.directiveName;
        let innerDomElement;
        do {
            innerDomElement = this.findDirective(domElement, directiveQuery);
            if (Boolean(innerDomElement)) {
                this.analyzeDirective(innerDomElement, directiveName, scope);
                this.removeDirective(innerDomElement, directiveName);
            }
        } while(Boolean(innerDomElement));
    }

    findDirective(domElement, directiveQuery) {
        let innerDomElement = domElement.querySelector(directiveQuery);
        return innerDomElement;
    }

    removeDirective(domElement, directiveName) {
        domElement.removeAttribute(directiveName);
    }

    analyzeOne() { }
}