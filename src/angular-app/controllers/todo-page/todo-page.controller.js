
module.exports = function(ngModule) { 
    ngModule.controller("todoPageCtrl", [
        "$scope", 
        "todoService", 
        "todoHttpService", 
        function (
            $scope,
            todoService,
            todoHttpService
        ) {
        const ctrl = this;
        ctrl.todos = [];
        ctrl.todoFilters = todoService.todoFilters;
        ctrl.filterByDay = "";

        todoHttpService.getTodos((data) => {
            data.todos.forEach(todo => todo.createdDate = new Date(todo.createdDate));
            ctrl.todos = data.todos;
            $scope.$apply();
        });
    }]);
}