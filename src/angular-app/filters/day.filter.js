
const diffDays = (firstDate, secondDate) => {
    const oneDay = 24*60*60*1000;
    const result = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
    return result;
}

module.exports = function(ngModule) {
    ngModule.filter("filterByDay", function() {
        return function(array, days) {
            days = days || 0;
            const result = array.filter(item => diffDays(new Date(), item.createdDate) >= days);
            return result;
        };
    })
}

