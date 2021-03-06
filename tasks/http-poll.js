module.exports = function(grunt){
    var request = require('request'),
        async = require('async'),
        finished = false;

    var execute = function(options, done){
        grunt.verbose.writeln('Making request: ' + options.endpoint);
        var res = request({
            url: options.endpoint,
            headers: {
                'user-agent': 'grunt-http-poll'
            }
        }, function(err, res, body){
            if(err){
                grunt.verbose.writeln(err);
                return done();
            }

            var statusCode = res && res.statusCode;

            if(statusCode === options.statuscode){
                grunt.log.ok(statusCode);
                finished = true;
                return done();
            }

            grunt.verbose.writeln(statusCode + ' => ' + (body || '(empty)'));
            done();
        });
    };

    grunt.registerMultiTask('http-poll', function(){
        var done = this.async();
        var timeout = false;
        var options = this.options({
            pollinterval: 1000,
            timeout: 10000,
            timeoutIsError: true
        });
        finished = false;

        grunt.verbose.writeflags(options);

        var globalTimeout = setTimeout(function(){
          timeout = true;
        }, options.timeout);

        async.until(function(){
          return timeout || finished;
        }, function(cb){
          execute(options, function(){
            setTimeout(cb, options.pollinterval);
          });
        }, function(err){
          clearTimeout(globalTimeout);
          if(!finished && options.timeoutIsError){
            err = new Error("timeout elapsed before seeing statuscode: " + options.statuscode);
          }

          done(err);
        });
    });
};
