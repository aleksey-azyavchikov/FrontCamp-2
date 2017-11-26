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
             case 0 : {
                 return {
                     set: (obj, prop, value) => {
                         if(value.length != 32) {
                             throw new RangeError('Api key should has 32 symbols');
                         }
                         obj[prop] = value;
                         return true;
                     }
                 }
             }
             case 1 : 
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