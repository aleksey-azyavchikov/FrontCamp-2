
class Article {
    constructor() {
        this.text = "";
        this.completed = false;
        this.creationDate = new Date();
    }

    static configMongoose() {
        let mongoseConfig =  {
            text: String,
            completed: Boolean,
            creationDate: Date
        };

        return {
            name: "Todo",
            collection: "todos",
            mongoseConfig
        }
    }
}

module.exports = Article;