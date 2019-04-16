const path = require('path')
const shell = require('shelljs')
const chalk = require('chalk')

const fmtHookLimiter = chalk.bgBlue.white;
const fmtTaskStarted = (fnName)=> (`Running task ${chalk.yellow(fnName)}...`);
const fmtTaskCompleted = (fnName)=> (`Task ${chalk.green(fnName)} completed.\n`);

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
        shell.cp('-f', path.join(sourcePath, 'Activity.java'), activity_path);

        console.log("Replacing file placeholoders...")
        
        shell.sed('-i', /__ACTIVITY__/, safe_activity_name, activity_path);
        console.log(`__ACTIVITY__ => ${safe_activity_name}` );
        
        shell.sed('-i', /__ID__/, package_name, activity_path);
        console.log(`__ID__ => ${package_name}` );
        console.log(fmtTaskCompleted(arguments.callee.name));
        resolve();
    })
}

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

module.exports = (context) => {    
    return new Promise((resolve, reject)=>{
        console.log(fmtHookLimiter('BEFORE_PREPARE started'));
        const p1 = overwriteActivity();
        const p2 = addBuildExtras();
        Promise.all([p1,p2]).then((r1, r2) => {
            console.log(fmtHookLimiter("BEFORE_PREARE completed successfully"))
        })
    })
}