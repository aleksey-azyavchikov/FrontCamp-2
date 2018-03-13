
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const index = require("./routes/index.route");
const news = require("./routes/news.route");
var appConfig = require("./configs/app.config");
appConfig.isDevelopment = process.env.NODE_ENV.trim() === "development";

const app = express();

const database = require("./db/database");
database
    .clearSchemes()
    .configureSchemes()
    .connect(appConfig.dbName);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

//app.set('view engine', 'html');
//app.engine('html', ejs.renderFile)

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());
app.use(session({
    secret: appConfig.session.secret,
    key: appConfig.session.key,
    cookie: appConfig.session.cookie,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        mongooseConnection: database.connection
    })
}))
app.use(express.static(path.join(__dirname, "public")));

app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
})

// app.use((request, response) => {
//     request.session.number = request.session.number + 1 || 1;
//     response.send("Visitors: " + request.session.number); 
// })
// app.use("/", index);
app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "public", "build", "index.html"))
})
app.use("/api/news", news);

// Go to Welcome page.
// app.get("*", function(req, res) {
//     res.redirect("/");
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;