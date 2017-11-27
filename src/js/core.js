window.onload = function () {
    let pageLoader = new PageLoader();
    let homePage = new HomePage();
    let newsPage = new NewsPage();

    let apiKey = localStorage.getItem(Constants.key);
        apiKey === null 
            ? pageLoader.loadPage("content", homePage)
            : pageLoader.loadPage("content", newsPage)
}







