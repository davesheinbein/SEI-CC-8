// console.log(module)

const person = {
	name: 'jim'
}


module.exports.weekdays = 
	['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

module.exports.getWeekDay = function(dayNo) {
	if (dayNo < 0 || dayNo > 6) dayNo = 0;
	return exports.weekdays[dayNo];
};

// module.exports = {'name':'sei'}