export class TemplateHelpers {
    constructor() {
    }
    
    static async getArticleTemplate(data) {
        const css = await import("./partial-styles/article.css");
        const template = `${data.articles.map(article => `
            <li>
                <article>
                    <h4 class="header">${article.title}</h4>
                    <img class="image" src="${article.urlToImage}">
                    <div class="description">${article.description}</div>
                    <a class="source" href="${article.url}">Source</a>
                    <div class="author">${article.author}</div>
                    <div class="time">${TemplateHelpers.getInstance().getActualDate(article.publishedAt)}</div>
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

    static getInstance() {
        return this.instance = !Boolean(this.instance)
            ? new TemplateHelpers()
            : this.instance;
    }
}

export const getArticleTemplate = async (data) => TemplateHelpers.getArticleTemplate(data)