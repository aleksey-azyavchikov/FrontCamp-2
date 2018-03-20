import { Singleton } from "./decorators/singleton.decorator";

@Singleton()
class ApiInvoker {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    set key(value) {
        this.apiKey = value;
    }

    get Url() {
        return `https://newsapi.org/v1/articles?source=bbc-news&apiKey=${this.apiKey}`;
    }

    invokeGet(endpointUrl, requestInit = {}) {
        return this.invoke(endpointUrl, requestInit, { method: "GET", mode: "cors" });
    }

    invokePost(endpointUrl, requestInit = {}) {
        let init = {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" }
        };
        return this.invoke(endpointUrl, requestInit, init);
    }

    invokePut(endpointUrl, requestInit = {}) {
        let init = {
            method: "PUT",
            mode: "cors",
            headers: { "Content-Type": "application/json" }
        };
        return this.invoke(endpointUrl, requestInit, init);
    }

    invokeDelete(endpointUrl, requestInit = {}) {
        return this.invoke(endpointUrl, requestInit, { method: "DELETE", mode: "cors" });
    }

    invoke(endpointUrl, requestInit = {}, init = {}) {
        const hasBody = Object.keys(requestInit).length > 0 && requestInit.constructor === Object;

        if (hasBody) {
            Object.assign(init, {body: JSON.stringify(requestInit) });
        }

        let request = new Request(endpointUrl);
        return new Promise((resolve, reject) => {
            fetch(request, init)
                .then(response => response.json())
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    }
}

export const ApiInvokerService = ApiInvoker.i()