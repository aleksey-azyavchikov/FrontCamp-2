
module.exports = function (ngModule) {
    ngModule.controller("titleFormCtrl", [
        function (
        ) {
        const ctrl = this;
        ctrl.title = ctrl.title || "";
        ctrl.submit = function (event) {
            event.preventDefault(); 
            if(!ctrl.title) return; 
            ctrl.onSubmit({title: ctrl.title});
        }
    }]);
}