
module.exports = function (ngModule) {
    ngModule.controller("articleShowerCtrl", [
        "$scope", 
        "articleHttpService",
        function (
            $scope, 
            articleHttpService
        ) {
        const ctrl = this;
        ctrl.articles = [];

        ctrl.deleteArticle = function (id) {
            articleHttpService.deleteArticle(id, (data) => {
                articleHttpService.getArticles((data) => {
                    ctrl.articles = data.articles;
                    $scope.$apply();
                });
            });
        }

        ctrl.updateArticle = function(id, article) {
            articleHttpService.updateArticle(id, article, () => {
                articleHttpService.getArticles((data) => {
                    ctrl.articles = data.articles;
                    $scope.$apply();
                });
            });
        }
        
        ctrl.onSubmit = function (title) {
            ctrl.updateArticle(ctrl.selected._id, {...ctrl.selected, title: title })
        };
        
        ctrl.select = function (article) {
            ctrl.selected = article;
        }
        
        articleHttpService.getArticles((data) => {
            ctrl.articles = data.articles;
            $scope.$apply();
        });
    }]);
}