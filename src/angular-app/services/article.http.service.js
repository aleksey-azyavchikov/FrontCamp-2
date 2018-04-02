import { ApiInvokerService } from "../../core/api";
import { Endpoints } from "../../core/endpoints";  


module.exports = function (ngModule) {
    ngModule.factory("articleHttpService", function () {
        const apiInvoker = ApiInvokerService;
        return {
            apiInvoker: apiInvoker,
            getArticles: function (success) {
                this.apiInvoker.invokeGet(Endpoints.Articles())
                    .then(data => success(data))
                    .catch(error => console.error(error));
            },
            deleteArticle: function (id, success) {
                if (!confirm("Are you sure?")) return;
                this.apiInvoker.invokeDelete(Endpoints.Articles({ id }))
                    .then(data => success(data))
                    .catch(error => console.error(error));
            },
            getArticleById: function (id, success) {
                this.apiInvoker.invokeGet(Endpoints.Articles({ id }))
                    .then(data => success(data))
                    .catch(error => console.error(error));
            },
            updateArticle: function (id, article, success) {
                this.apiInvoker.invokePut(Endpoints.Articles({ id }), { ...article })
                    .then(data => success(data))
                    .catch(error => console.error(error));
            },
            addArticle: function (article, success) {
                this.apiInvoker.invokePost(Endpoints.Articles(), { ...article })
                    .then(data => success(data))
                    .catch(error => console.error(error));
            }
        }
    });
}