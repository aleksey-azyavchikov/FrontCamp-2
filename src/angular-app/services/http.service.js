import { ApiInvokerService } from "../../core/api";


module.exports = function (ngModule) {
    ngModule.factory("httpService", function () {
        let apiInvoker = ApiInvokerService;
        return {
            apiInvoker: apiInvoker,
            getArticles: function (success) {
                // this.apiInvoker.invoke(
                //     ApiInvoker.buildUrl(Constants.apiServer, Constants.apiEndPoints.news.article.getArticles()),
                //     { method: "GET", mode: "cors" },
                //     (data) => {
                //         success(data);
                //     },
                //     (error) => console.error(error)
                // );
            },
            deleteArticle: function (id, success) {
                // if (!confirm("Are you sure?")) return;
                // apiInvoker.invoke(
                //     ApiInvoker.buildUrl(Constants.apiServer, Constants.apiEndPoints.news.article.deleteArticle(id)),
                //     { method: "DELETE", headers: { "Content-Type": "application/json" }, mode: "cors", body: JSON.stringify({ id: id }) },
                //     (data) => {
                //         success(data);
                //     },
                //     (error) => console.error(error)
                // );
            },
            getArticleById: function (id, success) {
                // apiInvoker.invoke(
                //     ApiInvoker.buildUrl(Constants.apiServer, Constants.apiEndPoints.news.article.getArticle(id)),
                //     { method: "GET", mode: "cors" },
                //     (data) => {
                //         success(data);
                //     },
                //     (error) => console.error(error)
                // )
            },
            updateArticle: function (id, article, success) {
                // apiInvoker.invoke(
                //     ApiInvoker.buildUrl(Constants.apiServer, Constants.apiEndPoints.news.article.putArticle(id)),
                //     { method: "PUT", headers: { "Content-Type": "application/json" }, mode: "cors", body: JSON.stringify({ article: article }) },
                //     (data) => {
                //         success(data);
                //     },
                //     (error) => console.error(error)
                // );
            },
            addArticle: function (article, success) {
                // apiInvoker.invoke(
                //     ApiInvoker.buildUrl(Constants.apiServer, Constants.apiEndPoints.news.article.postArticle()),
                //     { method: "POST", headers: { "Content-Type": "application/json" }, mode: "cors", body: JSON.stringify({ article: article }) },
                //     (data) => {
                //         success(data);
                //     },
                //     (error) => console.error(error)
                // );
            }

        }
    });
}