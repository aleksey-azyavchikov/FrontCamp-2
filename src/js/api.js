class ApiInvoker
{
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    get Url() {
        return `https://newsapi.org/v1/articles?source=bbc-news&apiKey=${this.apiKey}`;
    }

    getJson(succesHandler, errorHandler, endpointUrl) {
        let url = endpointUrl;
        if(url === undefined || url === null) {
            url = this.Url;
        }
        if(errorHandler === undefined || errorHandler === null) {
            errorHandler = function (error) { console.log("error"); console.log(error) } ;
        }
        if(succesHandler === undefined || succesHandler === null) {
            succesHandler = function (data) { console.log("success"); console.log(data) } ;
        }
        let request = new Request(url);
        let init = { method: "GET", mode: "cors" }
        
        fetch(request, init)
            .then(response => response.json())
            .then(data => succesHandler(data))
            .catch(error => errorHandler(error))
    }
}