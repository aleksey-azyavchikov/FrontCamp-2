var express = require("express");
var router = express.Router();
var mapper = require("../helpers/mapper");
var database = require("../db/database");

router.get("/", (request, response) => {
    const TodoSchema = database.schemes.todoSchema;
    TodoSchema.find({}, (error, data) => {
        let result = error ? error : { todos: data }
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

router.put("/:id", (request, response) => {
    let TodoSchema = database.schemes.todoSchema;
    let TodoModel = database.models.Todo;
    let todo = new TodoModel();

    mapper.mapProperties(request.body, todo, () => {},
        (index) => index !== "_id"
    );

    TodoSchema.findByIdAndUpdate(request.params.id, { $set: todo }, (error, todo) => {
        if (error) {
            response.json(error);
        }
        response.send(todo);
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

router.delete("/:id", (request, response) => {
    const TodoSchema = database.schemes.todoSchema;
    TodoSchema.find({ _id: request.params.id }).remove((error) => {
        error
            ? response.send(error)
            : TodoSchema.find({}, (error, data) => {
                error ?
                    response.send(error) :
                    response.send({ todos: data });
            });
    });
})


module.exports = router;