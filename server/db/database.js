var mongoose = require("mongoose");
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

    get connection() {
        return mongoose.connection;
    }

    clearSchemes() {
        this._schemes = {};
        return this;
    }

    configureSchemes() {
        return this
            .configureArticle()
            .configureUser()
            .configureTodo();
    }

    configureScheme(name, config) {
        const scheme = new mongoose.Schema(config.mongoseConfig, { collection: config.collection, versionKey: false });
        const model = mongoose.model(config.name, scheme, config.collection);
        Object.assign(this._schemes, { [name]: model });
        return this;
    }

    configureArticle() {
        return this.configureScheme("articleSchema", this._models.Article.configMongoose());
    }

    configureUser() {
        return this.configureScheme("userSchema", this._models.User.configMongoose());
    }

    configureTodo() {
        return this.configureScheme("todoSchema", this._models.Todo.configMongoose());
    }

    connect(dbName = "") {
        const connection = appConfig.isDevelopment
            ? appConfig.dbConnection(dbName)
            : appConfig.dbRemoteConnection(dbName);

        mongoose.connect(
            connection,
            (error) => {
                error
                    ? console.log("connection error with db", dbName, error)
                    : console.log("connection successful with db");
            });
    }

    static get Instance() {
        let result = this.instance = this.instance
            ? this.instance
            : new DatabaseBuilder()
        return result;
    }
}

module.exports = DatabaseBuilder.Instance