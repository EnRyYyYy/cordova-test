const fmtTaskStarted = require('./loggingUtils').fmtTaskStarted;
const fmtTaskCompleted = require('./loggingUtils').fmtTaskCompleted;
const shell = require('shelljs')
const path = require('path')

function addBuildExtras() {
    return new Promise((resolve, reject) => {
        console.log(fmtTaskStarted(arguments.callee.name));
        console.log("Copying build-extras file into project...");
        const src = path.join(__dirname, 'sources', 'build-extras.gradle');
        const dest = path.join(__dirname, '..', 'platforms', 'android', 'app', 'build-extras.gradle');
        console.log(`Source path: ${src}`);
        console.log(`Destination path: ${dest}`);
        shell.cp('-f', src, dest)
        console.log(fmtTaskCompleted(arguments.callee.name));
        resolve();
    })
}

module.exports = addBuildExtras