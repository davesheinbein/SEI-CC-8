const fs = require('fs');
// if its your own module you need to give it the
// file path
const daysOfTheWeek = require('./days-of-the-week');
// you can skip the js node knows

console.log(daysOfTheWeek);

console.log(daysOfTheWeek.getWeekDay(1))
// line 1 is how we use a module
// console.log(typeof fs);
 
fs.writeFile('./hello.txt', 'Helloooooooo!', function() {
  console.log('done creating file');
});