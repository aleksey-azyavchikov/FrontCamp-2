import "./index.scss";
import { ComponentLoader } from "./js/core/component.loader";
import App from "./js/components/app/app.component.js";

ComponentLoader.loadComponent(App, { pref: document.body });