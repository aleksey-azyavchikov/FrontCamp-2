
module.exports = function (ngModule) {
    ngModule.controller("editTodoPageCtrl", [
        "$scope",
        "$routeParams",
        "$location",
        "todoHttpService",
        function (
            $scope,
            $routeParams,
            $location,
            todoHttpService
        ) {
            const ctrl = this;

            if($routeParams.id) {
                todoHttpService.getTodoById($routeParams.id, (data) => {
                    ctrl.todo = data
                    ctrl.title = data.text;
                    $scope.$apply();
                });
            }

            ctrl.submitTodo = function (title) {
                ctrl.todo
                    ? todoHttpService.updateTodo(ctrl.todo._id, { ...ctrl.todo, text: title }, () => {
                        $location.path("/todos");
                        $scope.$apply();
                    })
                    : todoHttpService.addTodo({ text: title, completed: false }, () => {
                        $location.path("/todos");
                        $scope.$apply();
                    });

            }

            // ctrl.deleteArticle = function (id) {
            //     articleHttpService.deleteArticle(id, (data) => {
            //         articleHttpService.getArticles((data) => {
            //             ctrl.articles = data.articles;
            //             $scope.$apply();
            //         })
            //     });
            // }

            // articleHttpService.getArticles((data) => {
            //     ctrl.articles = data.articles;
            //     $scope.$apply();
            // });
        }]);
}