class PageLoader {
    constructor() {
    }
    
    loadPage(selector, page) {
        let apiInvoker = new ApiInvoker();
        apiInvoker.getHtml(page.getPagePath(), (html) => {
            document.getElementById(selector).innerHTML = html;
            page.setup();
        })
    }
}