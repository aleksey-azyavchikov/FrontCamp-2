window.onload = function () {
    let apiKey = localStorage.getItem(Constants.key);
        let homePage = "home";
        let newsPage = "news";

        apiKey === null 
            ? loadPage("content", getPage(homePage), loadHomePage) 
            : loadPage("content", getPage(newsPage), loadNewsPage);
}

function getPage(page) {
    return `pages/${page}.html`
}

function loadPage(selector, url, handler) {
    let apiInvoker = new ApiInvoker();
    apiInvoker.getHtml(url, (html) => {
        document.getElementById(selector).innerHTML = html;
        handler();
    })
}

function loadHomePage() {
    let buttonElement = document.getElementsByTagName("button")[0];
    buttonElement.addEventListener("click", homePageHandler)
}


function homePageHandler() {
    let inputElement = document.getElementsByTagName("input")[0];
    let validationFactory = new ValidationFactory();
    let proxy = validationFactory.getProxy(EnumFieldsValidators.ApiKeyField);
    
    try
    {   
        proxy.value = inputElement.value;;
    } catch(error) {
        setTimeout(() => {
            showErrorPopup(error);
        }, 1000)
        return;
    } 

    localStorage.setItem(Constants.key, proxy.value); 
    location.reload();
}

function loadNewsPage() {
    let buttonElement = document.getElementsByTagName("button")[0];
    buttonElement.addEventListener("click", () => {
        localStorage.removeItem(Constants.key);
        location.reload();
    })
    newsPageHandler();
}

function newsPageHandler() {
    let apiKey = localStorage.getItem(Constants.key);
    if(apiKey === null) { 
        location.reload();
        return;
    }

    let apiInvoker = new ApiInvoker(apiKey);
    apiInvoker.getJson((data) => {
        let ul = document.getElementsByTagName("ul")[0];
        const template = `${data.articles.map(article => `
            <li>
                <h4 class="header">${article.title}</h4>
                <img class="image" src="${article.urlToImage}">
                <div class="description">${article.description}</div>
                <a class="source" href="${article.url}">Source</a>
                <div class="author">${article.author}</div>
                <div class="time">${article.publishedAt}</div>
            </li>
        `)}`;
        ul.innerHTML = template; 
    },
    (error) => {
        showErrorPopup(message);
    });
}

function showErrorPopup(text) {
    let spanElement = document.getElementsByTagName("span")[0];
    let popupElement = document.getElementsByClassName("error-api")[0];
    spanElement.textContent = error
    popupElement.style.display = "block";
}





