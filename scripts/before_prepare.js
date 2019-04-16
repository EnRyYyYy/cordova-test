const overwriteActivity = require('./overwriteActivity')
const addBuildExtras = require('./addBuildExtras')
const fmtHookLimiter = require('./loggingUtils').fmtHookLimiter
module.exports = (context) => {    
    return new Promise((resolve, reject)=>{

        const promises = [];
        console.log(fmtHookLimiter('BEFORE_PREPARE started'));
        promises.push(overwriteActivity());
        promises.push(addBuildExtras());
        Promise.all(promises).then((r1, r2) => {
            console.log(fmtHookLimiter("BEFORE_PREARE completed successfully"))
        })
    })
}