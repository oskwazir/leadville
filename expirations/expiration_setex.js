const redis = require('../redis');
redis.setex('some key',2,'some value');

setInterval(function(){
    redis.get('some key', function(err,value){
        if(err){throw err;}

        if (value){
            console.log(`Value:${value}`);
        } else {
            console.log('No value found');
            process.exit();
        }
    })
}, 1e3);