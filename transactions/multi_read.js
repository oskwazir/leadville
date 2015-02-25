const redis = require('../redis');

redis.multi()
.set('key 1','value 1')
.get('key 1')
.set('key 2','value 2')
.get('key 2')
    .exec(function(err,results){
    if(err){throw err;}

    console.log(`terminated. results: ${results}`);
    redis.quit();
});

