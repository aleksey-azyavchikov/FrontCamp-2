export class Article {
    constructor() {
        this.author = "";
        this.title = "";
        this.description = "";
        this.url = "";
        this.urlToImage = "";
        this.publishedAt = "";
        this.image = { data: null, contentType: "" };
    }
}