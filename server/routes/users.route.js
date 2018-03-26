var express = require("express");
var router = express.Router();
var mapper = require("../helpers/mapper");
var database = require("../db/database");
var encryptor = require("../helpers/encrypter");

router.get("/", (request, response) => {
    const UserSchema = database.schemes.userSchema;
    UserSchema.find({}, (error, data) => {
        // let user = new database.models.User();
        // data = mapper.mapProperties(data, user);
        let result = error ? error : { users: data }
        response.json(result);
    });
});

router.get("/:id", (request, response) => {
    const UserSchema = database.schemes.userSchema;
    UserSchema.findById(request.params.id, (error, data) => {
        let result = error ? error : data 
        response.json(result);
    });
});

router.post("/", (request, response, next) => {
    const UserModel = database.models.User;
    const UserSchema = database.schemes.userSchema;
    let user = new UserModel();
    
    mapper.mapProperties(request.body, user);
    UserSchema.findOne({ email: user.email }, (error, data) => {
        if(data) return response.json({error: "Email already exist"});
        encryptor.hashPassword(user, next, (user) => {
            new UserSchema(user).save((error) => {
                error ? response.json({message: "Error"}) : response.json({message: null});
            });
        });
    });
});

router.post("/auth", (request, response, next) => {
    const UserModel = database.models.User;
    const UserSchema = database.schemes.userSchema;
    let user = new UserModel();
    
    mapper.mapProperties(request.body, user);
    UserSchema.findOne({ email: user.email }, (error, data) => {
        const isAuth = false;
        if(!data) return response.json({isAuth: isAuth});
        encryptor.check(user.password, data.password, (result, error) => {
            if(error) return response.json({isAuth: isAuth});
            response.json({isAuth: result});
        }); 
    });
});


module.exports = router;