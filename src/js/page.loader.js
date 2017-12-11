export class PageLoader {
    constructor(apiInvoker) {
        this.apiInvoker = apiInvoker;
    }

    loadPage(selector, page) {
        document.getElementById(selector).innerHTML = page.template;
        page.setup();
    }
}