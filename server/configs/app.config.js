module.exports = {
    dbConnection: (dbName) => `mongodb://localhost:27017/${dbName}`,
    dbName: "frontcamp",
    dbRemoteConnection: (dbName) => `mongodb://Aliaksei:qwer1T22@test-shard-00-00-t1vbk.mongodb.net:27017,test-shard-00-01-t1vbk.mongodb.net:27017,test-shard-00-02-t1vbk.mongodb.net:27017/${dbName}?authSource=admin&replicaSet=Test-shard-0&ssl=true`,
    session: {
        secret: "ShowMustGoOn",
        key: "sid",
        cookie: {
            path: "/",
            httpOnly: true,
            maxAge: null
        }
    },
    isDevelopment: true,
    applicationType: "react"
}