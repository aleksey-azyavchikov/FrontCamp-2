
class User {
    constructor() {
        this.name = "";
        this.password = "";
        this.email = "";
    }

    static configMongoose() {
        let mongoseConfig =  {
            name: String,
            password: String,
            email: String,
        };

        return {
            name: "User",
            collection: "users",
            mongoseConfig
        }
    }
}

module.exports = User;