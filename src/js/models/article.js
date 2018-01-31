export class Article {
    constructor(article) {
        this.author = article && article.author || "";
        this.title = article && article.title || "";
        this.description = article && article.description || "";
        this.url = article && article.url || "";
        this.urlToImage = article && article.urlToImage || "";
        this.publishedAt = article && article.publishedAt || "";
        this.image = article && article.image || {};
    }
}