
module.exports = function (ngModule) {
    ngModule.controller("articleShowerCtrl", [
        "$scope", 
        "httpService",
        "todoService", 
        function (
            $scope, 
            httpService, 
            todoService
        ) {
        const ctrl = this;
        ctrl.articles = [];

        ctrl.deleteArticle = function (id) {
            httpService.deleteArticle(id, (data) => {
                httpService.getArticles((data) => {
                    ctrl.articles = data.articles;
                    $scope.$apply();
                })
            });
        }

        httpService.getArticles((data) => {
            ctrl.articles = data.articles;
            $scope.$apply();
        });
    }]);
}