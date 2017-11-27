
class NewsPage extends BasePage {
    constructor() {
        super();
        this.pageName = "news";
    }

    setup() {
        let buttonElement = document.getElementsByTagName("button")[0];
        buttonElement.addEventListener("click", () => {
            localStorage.removeItem(Constants.key);
            location.reload();
        })
        this.handler();
    }

    handler() {
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
                    <article>
                        <h4 class="header">${article.title}</h4>
                        <img class="image" src="${article.urlToImage}">
                        <div class="description">${article.description}</div>
                        <a class="source" href="${article.url}">Source</a>
                        <div class="author">${article.author}</div>
                        <div class="time">${article.publishedAt}</div>
                    </article>
                </li>
            `)}`;
            ul.innerHTML = template; 
        },
        (error) => {
            this.showErrorPopup(Constants.requestErrorMessage);
        });
    }
} 