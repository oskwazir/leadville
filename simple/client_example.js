const redis = require('./redis');
const assert = require('assert');

redis.set('key','value',function(err){
    if(err){throw err;}

    redis.get('key',function(err,value){
        if(err){throw err;}

        assert.equal('value',value);

        console.log('yay it works!');

        redis.quit();
    })
});