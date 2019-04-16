const fmtTaskStarted = require('./loggingUtils').fmtTaskStarted;
const fmtTaskCompleted = require('./loggingUtils').fmtTaskCompleted;
const fmtTaskFailed = require('./loggingUtils').fmtTaskFailed;
const shell = require('shelljs')
const path = require('path')

function getPackageName(package) {
    return package.split(".");
}

function overwriteActivity() {
    return new Promise((resolve, reject) => {
        console.log(fmtTaskStarted(arguments.callee.name));
        console.log("Overwriting default Cordova activity...")
        const package_name = "it.emorb.testapp";
        const packageDir = getPackageName(package_name);

        const sourcePath = path.join(__dirname, 'sources');
        const safe_activity_name = "MainActivity";
        const activity_path = path.join(__dirname, '..', 'platforms', 'android', 'app', 'src', 'main', 'java', ...packageDir, `${safe_activity_name}.java`);

        console.log(`Copying Activity.java in ${activity_path}`)
        const copyResult = shell.cp('-f', path.join(sourcePath, 'Activity.java'), activity_path);
        
        console.log("Replacing file placeholoders...")

        shell.sed('-i', /__ACTIVITY__/, safe_activity_name, activity_path);
        console.log(`__ACTIVITY__ => ${safe_activity_name}`);

        shell.sed('-i', /__ID__/, package_name, activity_path);
        console.log(`__ID__ => ${package_name}`);
        console.log(fmtTaskCompleted(arguments.callee.name));
        resolve();
    })
}
module.exports = overwriteActivity