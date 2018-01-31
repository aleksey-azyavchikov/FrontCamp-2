
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var mongoose = require('mongoose');

var index = require('./routes/index.route');
var news = require('./routes/news.route');
var appConfig = require("./configs/app.config")

var app = express();

var database = require('./db/database');
database
    .clearSchemes()
    .configureSchemes()
    .connect(appConfig.dbName);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.set('view engine', 'html');
//app.engine('html', ejs.renderFile)

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
})

// app.use((request, response, next) => {
//     database.connect(appConfig.dbName);
//     let afterResponse = () => {
//         // any other clean ups
//         mongoose.connection.close(() => console.log('Mongoose connection disconnected'));
//     }

//     // hooks to execute after response
//     response.on('finish', afterResponse);
//     response.on('close', afterResponse);
//     next();
// })

app.use('/', index);
app.use('/news', news);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;