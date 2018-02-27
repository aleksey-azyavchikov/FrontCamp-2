
export function Singleton() {
    return function (target) {
        target.i = function() {
            return this.instance = !Boolean(this.instance)
                ? new target()
                : this.instance;
        }
    }
}