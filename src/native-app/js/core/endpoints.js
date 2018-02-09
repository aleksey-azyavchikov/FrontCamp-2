import { Constants } from "./constants";

export class Endpoints {
    static NewsApi = (replacements) => `https://newsapi.org/v1/articles?source=bbc-news&apiKey=${replacements.apiKey}`;
    static Articles = (replacements) => `${Constants.apiServer}/news/${replacements && replacements.id || ""}`;
}