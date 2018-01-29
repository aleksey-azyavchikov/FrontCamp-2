import { Singleton } from "./decorators/singleton.decorator";

@Singleton()
export class ApiInvoker
{
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
        return this.invoke(endpointUrl, requestInit, { method: "POST", mode: "cors" });
    }

    invokePut(endpointUrl, requestInit = {}) {
        return this.invoke(endpointUrl, requestInit, { method: "PUT", mode: "cors" });
    }

    invokeDelete(endpointUrl, requestInit = {}) {
        return this.invoke(endpointUrl, requestInit, { method: "DELETE", mode: "cors" });
    }

    invoke(endpointUrl, requestInit = {}, init = {}) {
        Object(init, requestInit)
        let request = new Request(endpointUrl);
        return new Promise((resolve, reject) => { 
            fetch(request, init)
                .then(response => response.json())
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    }
}