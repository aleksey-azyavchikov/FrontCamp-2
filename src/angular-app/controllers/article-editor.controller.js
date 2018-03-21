import { Mapper } from "./../../core/mapper";
import { Article } from "../models/article.model";

import image from "../../content/images/default-thumbnail.jpg";

module.exports = function(ngModule) {
    ngModule.controller("articleEditorCtrl", ["$scope", "httpService", "$routeParams", "$location", function($scope, httpService, $routeParams, $location) {
        let ctrl = this;

        ctrl.id = $routeParams.articleId;
        ctrl.article = new Article();
        ctrl.article.urlToImage = image;
        ctrl.filePath;
        ctrl.file;
        ctrl.loadImage = (event) => {
            ctrl.filePath = event.target.files[0];
            let fileReader = new FileReader();
            fileReader.onload = (loadEvent) => {
                ctrl.file = loadEvent.target.result;
                let article = ctrl.article;
                article.image.data = loadEvent.target.result;
                $scope.$apply();
            }
            fileReader.readAsDataURL(this.filePath);
        }
        ctrl.isEditMode = ctrl.id !== undefined && ctrl.id !== null;

        ctrl.getArticleById = function (id) {
            httpService.getArticleById(id, (data) => {
                Mapper.mapProperties(data.article, ctrl.article, (source, destination) => {
                        destination.image.data = source.image && source.image.data || null;
                        destination.image.contentType = source.image && source.image.contentType || "";
                    });
                    $scope.$apply();
            })
        };

        ctrl.addArticle = function () {
            httpService.addArticle(ctrl.article, (data) => {
                $location.path("/articles");
                $scope.$apply();
            });
        };

        ctrl.updateArticle = function () {
            httpService.updateArticle(ctrl.id, ctrl.article, (data) => {
                $location.path("/articles");
                $scope.$apply();
            });
        };

        ctrl.getImage = function() {
            return ctrl.article.image.data !== undefined && 
                   ctrl.article.image.data !== null &&
                   ctrl.article.image.data !== ""
                ? ctrl.article.image.data 
                : ctrl.article.urlToImage;
        }

        if(ctrl.isEditMode) {
            ctrl.getArticleById($routeParams.articleId);
        }
    }]);
}