import { ApiInvoker } from "./api.js";
import { PageLoader } from "./page.loader.js";
import { HomePage } from "./pages/home.page.js";
import { NewsPage } from "./pages/news.page.js";
import { Constants } from "./constants.js";

export class App {
    constructor() {
        let apiInvoker = new ApiInvoker();
        this.pageLoader = new PageLoader(apiInvoker);
    }
    run() {
        let homePage = new HomePage();
        let newsPage = new NewsPage();
    
        let apiKey = localStorage.getItem(Constants.key);
            apiKey === null 
                ? this.pageLoader.loadPage("content", homePage)
                : this.pageLoader.loadPage("content", newsPage)
    }
}

