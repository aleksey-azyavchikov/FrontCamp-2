var express = require("express");
var router = express.Router();
var mapper = require("../helpers/mapper");
var database = require("../db/database");

router.get("/", (request, response) => {
    const UserSchema = database.schemes.userSchema;
    UserSchema.find({}, (error, data) => {
        // let user = new database.models.User();
        // data = mapper.mapProperties(data, user);
        let result = error ? error : { users: data }
        response.json(result);
    })
});

router.get("/:id", (request, response) => {
    const UserSchema = database.schemes.userSchema;
    UserSchema.findById(request.params.id, (error, data) => {
        let result = error ? error : data 
        response.json(result);
    });
});

router.post("/", (request, response) => {
    const UserModel = database.models.User;
    let user = new UserModel();
    
    mapper.mapProperties(request.body, user);
    
    const UserSchema = database.schemes.userSchema;
    new UserSchema(user).save((error) => {
        error ? response.json("Error") : response.json("ok");
    });
});

router.put("/:id", (request, response) => {
    let ArticleSchema = database.schemes.articleSchema;
    let Article = database.models.Article;
    let article = new Article();

    mapper.mapProperties(request.body, article,
        (source, destination) => {
            destination.image.data = source.image && source.image.data || null;
            destination.image.contentType = source.image && source.image.contentType || null;
        },
        (index) => index !== "_id"
    );

    ArticleSchema.findByIdAndUpdate(request.params.id, { $set: article }, (error, article) => {
        if (error) {
            response.json(error);
        }
        response.send(article);
    });
});

router.delete("/:id", (request, response) => {
    let ArticleSchema = database.schemes.articleSchema;
    ArticleSchema.find({ _id: request.params.id }).remove((error) => {
        error
            ? response.send(error)
            : ArticleSchema.find({}, (error, data) => {
                error ?
                    response.send(error) :
                    response.send({ articles: data });
            });
    });
})


module.exports = router;