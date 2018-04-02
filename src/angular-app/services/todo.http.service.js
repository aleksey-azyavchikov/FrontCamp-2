import { ApiInvokerService } from "../../core/api";
import { Endpoints } from "../../core/endpoints";  


module.exports = function (ngModule) {
    ngModule.factory("todoHttpService", function () {
        const apiInvoker = ApiInvokerService;
        return {
            apiInvoker: apiInvoker,
            getTodos: function (success) {
                this.apiInvoker.invokeGet(Endpoints.Todos())
                    .then(data => success(data))
                    .catch(error => console.error(error));
            },
            getTodoById: function (id, success) {
                this.apiInvoker.invokeGet(Endpoints.Todos({ id }))
                    .then(data => success(data))
                    .catch(error => console.error(error));
            },
            updateTodo: function (id, todo, success) {
                this.apiInvoker.invokePut(Endpoints.Todos({ id }), { ...todo })
                    .then(data => success ? success(data) : null)
                    .catch(error => console.error(error));
            },
            addTodo: function (todo, success) {
                this.apiInvoker.invokePost(Endpoints.Todos(), { ...todo })
                    .then(data => success ? success(data) : null)
                    .catch(error => console.error(error));
            }
        }
    });
}