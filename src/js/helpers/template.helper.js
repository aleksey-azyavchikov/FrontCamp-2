export class TemplateHelpers {
    static getArticleTemplate(data) {
        const template = `${data.articles.map(article => `
            <li>
                <article>
                    <h4 class="header">${article.title}</h4>
                    <img class="image" src="${article.urlToImage}">
                    <div class="description">${article.description}</div>
                    <a class="source" href="${article.url}">Source</a>
                    <div class="author">${article.author}</div>
                    <div class="time">${this.getActualDate(article.publishedAt)}</div>
                </article>
            </li>
        `)}`;
        return template;
    }

    getActualDate(str) {
        let result = str === null 
            ? ""
            : str.substring(0, 10);

        return result;
    }
}