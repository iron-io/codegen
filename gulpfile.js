'use strict';

var fs = require('fs');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('swagger:compile', function(done){
    var CodeGen = require('swagger-js-codegen').CodeGen;
    var requirements = '{ "dependencies": { "request": "2.57.0", "q": "1.4.1"}}'
    // Templates used are a modified version from
    // https://github.com/wcandillon/swagger-js-codegen/tree/master/templates
    var apis = [
        {
            swagger: 'ironmqV3.json',
            moduleName: 'ironmq-api',
            className: 'IronMqApi',
            templates: {
              class: fs.readFileSync("templates/node-class.mustache", "utf8"),
              method: fs.readFileSync("templates/method.mustache", "utf8"),
              request: fs.readFileSync("templates/node-request.mustache", "utf8")
            }
        }
    ];
    var dest = 'target/nodejs';
    apis.forEach(function(api){
        var swagger = JSON.parse(fs.readFileSync(api.swagger, 'utf-8'));
        var source = CodeGen.getCustomCode({ moduleName: api.moduleName, className: api.className, template: api.templates, swagger: swagger });
        fs.writeFileSync(dest + '/' + api.moduleName + '.js', source, 'UTF-8');
    });
    fs.writeFileSync(dest+'/package.json', requirements ,"UTF-8");
    done();
});

gulp.task('swagger', ['swagger:compile']);


