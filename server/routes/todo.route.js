var express = require("express");
var router = express.Router();
var mapper = require("../helpers/mapper");
var database = require("../db/database");

router.get("/", (request, response) => {
    const TodoSchema = database.schemes.todoSchema;
    TodoSchema.find({}, (error, data) => {
        let result = error ? error : { users: data }
        response.json(result);
    })
});

router.get("/:id", (request, response) => {
    const TodoSchema = database.schemes.todoSchema;
    TodoSchema.findById(request.params.id, (error, data) => {
        let result = error ? error : data 
        response.json(result);
    });
});

router.post("/", (request, response) => {
    const TodoModel = database.models.Todo;
    let todo = new TodoModel();
    
    mapper.mapProperties(request.body, todo);
    
    const TodoSchema = database.schemes.todoSchema;
    new TodoSchema(todo).save((error) => {
        error ? response.json("Error") : response.json("ok");
    });
});


module.exports = router;