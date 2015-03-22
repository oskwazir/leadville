const redis = require('../redis');


function done(err, result){
    if(err){ throw err; }

    console.log(`new value: ${result}`);
    redis.quit();
}

for(var i =0; i < 10; i++){
    redis.decr('decr.js key', done);
}

