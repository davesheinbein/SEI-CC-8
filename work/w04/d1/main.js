const fileSystem = require('fs');
// fs stands for filesystem
console.log(fileSystem);

fileSystem.writeFile('./hello.txt', 'hello jerry', function(){
    console.log('done creating the file')
})

fileSystem.writeFile('./goodbye.txt', 'hello jerry', function(){
    console.log('done creating the file')
})