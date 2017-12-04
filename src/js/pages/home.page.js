
class HomePage extends BasePage {
    constructor() {
        super();
        this.pageName = "home";
        console.log("Test");
    }

    setup() {
        let buttonElement = document.getElementsByTagName("button")[0];
        buttonElement.addEventListener("click", this.handler.bind(this))
    }

    handler() {
        let inputElement = document.getElementsByTagName("input")[0];
        try
        {   
            this.checkValue(inputElement.value);
        } catch(error) {
            setTimeout(() => {
                super.showErrorPopup(error);
            }, 1000)
            return;
        } 
    
        localStorage.setItem(Constants.key, inputElement.value); 
        location.reload();
    }

    checkValue(value) {
        if(value.length > 32) {
            throw new Error(Constants.validationMessage);
        }
    }
}