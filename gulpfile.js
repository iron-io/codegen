'use strict';

var fs = require('fs');
var util = require('util');
var gulp = require('gulp');
var sequence = require('run-sequence');
var $ = require('gulp-load-plugins')();
var exec = require('child_process').exec;
var yaml = require('js-yaml');

var apiFile = "ironmqV3.json"

gulp.task('yaml:convert', function(done) {
  var text = fs.readFileSync('ironmqV3.yml', "utf-8")
  console.log("writing ironmqV3.json");
  var data = yaml.safeLoad(text);
  fs.writeFileSync('ironmqV3.json', JSON.stringify(data), "UTF-8");
});

// Uses swagger-codegen-cli to autogenerate the code
gulp.task('swagger:generate', function(done) {
  var langs = ['ruby', 'python', 'java', 'php']
  var executable = "./modules/swagger-codegen-cli/target/swagger-codegen-cli.jar"
  langs.forEach(function(lang) {
    var dest = "target/" + lang;
    var command = util.format('java -jar %s generate -i %s -l %s -o %s', executable, apiFile, dest)
    exec(command, function(error, stdout, stderr) {
      console.log("Writing " + lang + " to " + dest);
      if(error != null) {
        console.log("Error: " + error);
      }
    });
  });
});

// Nodejs compilation
gulp.task('swagger:nodejs', function(done){
    var CodeGen = require('swagger-js-codegen').CodeGen;
    var requirements = '{ "dependencies": { "request": "2.57.0", "q": "1.4.1"}}'
    // Templates used are a modified version from
    // https://github.com/wcandillon/swagger-js-codegen/tree/master/templates
    var apis = [
        {
            swagger: apiFile,
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
        console.log('Writing node-js to ' + dest);
        fs.writeFileSync(dest + '/' + api.moduleName + '.js', source, 'UTF-8');
    });
    fs.writeFileSync(dest+'/package.json', requirements ,"UTF-8");
    done();
});

gulp.task('default', ['yaml:convert', 'swagger:nodejs', 'swagger:generate']);
