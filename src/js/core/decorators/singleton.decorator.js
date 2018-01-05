
export function Singleton() {
    return function (target) {
        target.getInstance = function() {
            return this.instance = !Boolean(this.instance)
                ? new target()
                : this.instance;
        }
    }
}