import { BasePage } from "../base.page.js";
import { Constants } from "../../constants.js";
import { ValidationFactory, EnumFieldsValidators } from "../../validation.js";

import template from "./home.html";
import css from "./home.css";

export class HomePage extends BasePage {
    constructor() {
        super();
        this.pageName = "home";
        this.template = template;
    }

    setup() {
        let buttonElement = document.getElementsByTagName("button")[0];
        buttonElement.addEventListener("click", this.handler)
    }

    handler() {
        let inputElement = document.getElementsByTagName("input")[0];
        let validationFactory = new ValidationFactory();
        let proxy = validationFactory.getProxy(EnumFieldsValidators.ApiKeyField);
        
        try
        {   
            proxy.value = inputElement.value;;
        } catch(error) {
            setTimeout(() => {
                super.showErrorPopup(error);
            }, 1000)
            return;
        } 
    
        localStorage.setItem(Constants.key, proxy.value); 
        location.reload();
    }
}