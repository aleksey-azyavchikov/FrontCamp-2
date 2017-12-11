export class BasePage {
    constructor() {
        this.pageName = null;
        this.template = null;
    }

    getPagePath() {
        return `pages/${this.pageName}.html`
    }

    setup() {}

    showErrorPopup(text) {
        let spanElement = document.getElementsByTagName("span")[0];
        let popupElement = document.getElementsByClassName("error-api")[0];
        spanElement.textContent = text;
        popupElement.style.display = "block";
    }
}