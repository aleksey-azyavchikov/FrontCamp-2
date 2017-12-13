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

    getJson(succesHandler, errorHandler, endpointUrl) {
        let url = endpointUrl;
        if(url === undefined || url === null) {
            url = this.Url;
        }
        if(errorHandler === undefined) {
            errorHandler = function (error) { console.log("error"); console.log(error) } ;
        }
        if(succesHandler === undefined) {
            succesHandler = function (data) { console.log("success"); console.log(data);  return data} ;
        }
        let request = new Request(url);
        let init = { method: "GET", mode: "cors" }
        
        return new Promise((resolve, reject) => { 
            fetch(request, init)
                .then(response => response.json())
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    }

    static getInstance() {
        return this.instance = !Boolean(this.instance)
            ? new ApiInvoker()
            : this.instance;
    }
}