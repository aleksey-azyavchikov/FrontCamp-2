var mongoose = require("mongoose");
var appConfig = require("../configs/app.config");
var models = require("./db-models/models");

class DatabaseBuilder {
    constructor() {
        this._schemes = {};
        this._originals= {};
        this._models = models;
    }

    get schemes() {
        return this._schemes;
    }

    get originals() {
        return this._originals;
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
        Object.assign(this._originals, { [name]: scheme });

        const model = mongoose.model(config.name, scheme, config.collection);
        Object.assign(this._schemes, { [name]: model });
        return this;
    }

    configureArticle() {
        const name = "articleSchema";
        return this.configureScheme(name, this._models.Article.configMongoose());
    }

    configureUser() {
        const name = "userSchema";
        return this.configureScheme(name, this._models.User.configMongoose())
    }

    configureTodo() {
        const name = "todoSchema";
        return this.configureScheme(name, this._models.Todo.configMongoose());
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