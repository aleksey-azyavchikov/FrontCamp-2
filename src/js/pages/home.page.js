
class HomePage extends BasePage {
    constructor() {
        super();
        this.pageName = "home";
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
                this.showErrorPopup(error);
            }, 1000)
            return;
        } 
    
        localStorage.setItem(Constants.key, proxy.value); 
        location.reload();
    }
}