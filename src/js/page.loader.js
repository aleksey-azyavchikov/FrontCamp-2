class PageLoader {
    constructor(apiInvoker) {
        this.apiInvoker = apiInvoker;
    }

    loadPage(selector, page) {
        this.apiInvoker.getHtml(page.getPagePath(), (html) => {
            document.getElementById(selector).innerHTML = html;
            page.setup();
        })
    }
}