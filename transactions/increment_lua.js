const fs = require('fs');
const path = require('path');
const redis = require('../redis');

const script = fs.readFileSync(
    path.join(__dirname,'lua_scripts','increment.lua'),
    {encoding:'utf8'});

const increment = function increment(key, cb){
    'use strict';
    redis.eval(script,1,key,cb);
};

for(var i = 0; i < 10; i++){
    increment('some key', function(err,newValue){
        if(err){throw err;}

        console.log(`Set new value to ${newValue}`);
        redis.quit();
    })
}

