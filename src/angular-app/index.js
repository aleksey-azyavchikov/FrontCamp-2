//import { Base } from './pages/base/base.jsx';
import "./index.scss";
var angular = require("angular");

var ngModule = angular.module("app", [require("angular-route")]);

ngModule.config(["$locationProvider", "$routeProvider", 
    ($locationProvider, $routeProvider) => {
    $locationProvider.hashPrefix("");
    $routeProvider
        .when("/articles", {
            template : "<article-shower></article-shower>"})
        .when("/article/add", {
            template : "<article-editor></article-editor>"})
        .when("/article/:articleId/edit", {
            template : "<article-editor></article-editor>"})
        .when("/todos", {
            template : "<todo-page></todo-page>"})
        .when("/todos/edit/:id", {
            template : "<edit-todo-page></edit-todo-page>"})
        .when("/todos/add", {
            template : "<edit-todo-page></edit-todo-page>"})
        .otherwise({ redirectTo: "/articles" });
}]);

require("./services")(ngModule);
require("./controllers")(ngModule);
require("./directives")(ngModule);
require("./filters")(ngModule);
require("./validators")(ngModule);


