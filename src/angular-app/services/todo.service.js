


module.exports = function (ngModule) {
    ngModule.service("todoService", function () {
        var svc = this;
        svc.todoFilters = {
            completed: (item) => item.completed,
            uncompleted: (item) => !item.completed,
            all: (item) => true,
            non: (item) => false
        };
    });
}