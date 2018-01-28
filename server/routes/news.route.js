var express = require("express");
var router = express.Router();
var mapper = require('../helpers/mapper');
var database = require("../db/database");

/* GET home page. */
router.get('/', function (request, response) {
    let ArticleSchema = database.shemes.ArticleSchema;
    ArticleSchema.find({}, function (error, data) {
        error ? response.send(error) : response.send({ articles: data });
    })
});

router.post('/article', function (request, response) {
    let Article = database.models.Article;
    let article = new Article();
    mapper.mapProperties(request.body, article, (source, destination) => {
        destination.image.data = source.image.data;
        destination.image.contentType = source.image.contentType
    });
    let ArticleSchema = database.shemes.ArticleSchema;
    new ArticleSchema(article).save((error, document) => {
        if (error) request.send("Error");
    });
    response.send('ok');
});


module.exports = router;