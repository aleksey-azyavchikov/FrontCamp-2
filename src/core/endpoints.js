import { Constants } from "./constants";

export class Endpoints {
    static NewsApi = (replacements) => `https://newsapi.org/v1/articles?source=bbc-news&apiKey=${replacements.apiKey}`;
    static Articles = (replacements) => `${Constants.apiServer}/api/news/${replacements && replacements.id || ""}`;
    static Users = (replacements) => `${Constants.apiServer}/api/users/${replacements && replacements.id || ""}`;
    static Auth = () => `${Constants.apiServer}/api/users/auth`;
    static Todos = (replacements) => `${Constants.apiServer}/api/todos/${replacements && replacements.id || ""}`;
}