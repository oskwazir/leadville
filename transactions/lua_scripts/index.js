const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const noScriptRegExp = /NOSCRIPT/;
const scriptNames = ['increment'];
const scripts = {};

scriptNames.forEach(function(scriptName){
    var body  = fs.readFileSync(
        path.join(__dirname,`${scriptName}.lua`),
        {encoding:'utf8'}
    );

    scripts[scriptName] = {
        body: body,
        digest: crypto.createHash('sha1').update(body).digest('hex')
    };
});

const execute = function execute(redis,scriptName,keyCount){
    var args = Array.prototype.slice.call(arguments);
    var cb = args[args.length - 1];
    var redis = args.shift();
    var scriptName = args.shift();
    var script = scripts[scriptName];

    if (!script) {
        cb(new Error('script is not defined: ' + scriptName));
    }
    else {
        var digest = script.digest;
        args.unshift(digest);
        args[args.length - 1] = callback;
        redis.evalsha.apply(redis, args);
    }

    function callback(err) {
        if (err && err.message.match(noScriptRegExp)) {
          args[0] = script.body;
          redis.eval.apply(redis, args);
        }
        else {
          cb.apply(null, arguments);
        }
    };
}







exports.execute = execute;