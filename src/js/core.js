const key = "BbcNews"

window.onload = function () {
    let apiKey = localStorage.getItem(key);
        let homePage = "home";
        let newsPage = "news";

        apiKey === null 
            ? $("#content").load(getPage(homePage), loadHomePage) 
            : $("#content").load(getPage(newsPage), loadNewsPage);
}

function getPage(page) {
    return `pages/${page}.html`
}

function loadHomePage() {
    let errorApi = $(".error-api");
    errorApi.hide();

    $("button").click(() => {
        let input = $("input");
        let spanError = $("span");
        let errorApi = $(".error-api");
        let validationFactory = new ValidationFactory();
        let proxy = validationFactory.getProxy(EnumFieldsValidators.ApiKeyField);

        
        try
        {   
            let apiKey = input.val();
            proxy.value = apiKey;
        } catch(error) {
            setTimeout(() => {
                spanError.text(error);
                errorApi.show();
            }, 1000)
            return;
        } 

        errorApi.hide();
        localStorage.setItem(key, proxy.value); 
        input.val("");
        location.reload();
        });
}

function loadNewsPage() {
    let errorApi = $(".error-api");
    errorApi.hide();

    $("button").click(() => {
        localStorage.removeItem(key);
        location.reload();
        return;
    });

    let apiKey = localStorage.getItem(key);
    if(apiKey === null) { 
        location.reload();
        return;
    }

    let apiInvoker = new ApiInvoker(apiKey);
    apiInvoker.getJson((data) => {
        let ul = $("ul");
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
        ul.append(template);
    },
    (error) => {
        let spanError = $("span");
        spanError.text("Error on server side");
        errorApi.show();
    });
}





