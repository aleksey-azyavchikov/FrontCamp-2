
module.exports = function (ngModule) {
    ngModule.controller("todoItemCtrl", [
        "$scope",
        "$location",
        "todoHttpService",
        function (
            $scope,
            $location,
            todoHttpService
        ) {
            const ctrl = this;
            ctrl.completeTodo = (todo) => {
                todo.completed = !todo.completed;
                todo.completedDate = todo.completed ? new Date() : undefined;
            };

            ctrl.deleteTodo = function (id) {
                todoHttpService.deleteTodo(id, (data) => {
                    $scope.$apply();
                });
            }

            ctrl.edit = function(id) {
                $location.path(`/todos/edit/${id}`);
            }
        }
    ]);
}