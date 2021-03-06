var EnumFieldsValidators = { 
    ApiKeyField: 0,
    OtherField: 1
}

class ValidationFactory {
     constructor() {
     }

     getProxy(validatorIndex) {
         return new Proxy({}, this.getValidator(validatorIndex));
     }

     getValidator(validatorIndex) {
         switch(validatorIndex) {
             case EnumFieldsValidators.ApiKeyField : {
                 return {
                     set: (obj, prop, value) => {
                         if(value.length != 32) {
                             throw new RangeError(Constants.validationMessage);
                         }
                         obj[prop] = value;
                         return true;
                     }
                 }
             }
             case EnumFieldsValidators.OtherField : 
             default : {
                 return {
                     set: (obj, prop, value) => {
                        obj[prop] = value;
                     }
                 }
             }
         }
     }
}