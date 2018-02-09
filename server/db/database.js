var mongoose = require('mongoose');
var appConfig = require("../configs/app.config");
var models = require("./db-models/models");

class DatabaseBuilder {
    constructor() {
        this._schemes = {};
        this._models = models;
    }

    get schemes() {
        return this._schemes;
    }

    get models() {
        return this._models;
    }

    clearSchemes() {
        this._schemes = {};
        return this;
    }

    configureSchemes() {
        return this.configureArticle();
    }

    configureArticle() {
        let config = this._models.Article.configMongoose();
        let article = new mongoose.Schema(config.mongoseConfig, { collection: config.collection, versionKey: false });
        let articleSchema = mongoose.model(config.name, article, config.collection);
        Object.assign(this._schemes, { articleSchema });
        return this;
    }

    connect(dbName = "") {
        mongoose.connect(appConfig.dbConnection(dbName), (error) => {
            Boolean(error)
                ? console.log('connection error with db', dbName, error)
                : console.log('connection successful with db');
        });
    }

    static get Instance() {
        let result = this.instance = Boolean(this.instance)
            ? this.instance
            : new DatabaseBuilder()
        return result;
    }
}

module.exports = DatabaseBuilder.Instance