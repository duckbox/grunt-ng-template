/*
 * grunt-ng-template
 * https://github.com/duckbox/grunt-ng-template.git
 *
 * Copyright (c) 2013 Chris Grant (@duckbox)
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function (grunt) {

    grunt.registerMultiTask('ng_template', 'Make external angular templates inline', function () {

        var configs = {
            TEMPLATE: '<script type="text/ng-template" id="<% filename %>">' + grunt.util.linefeed + '<% content %>' + grunt.util.linefeed + '</script>',
            partials: [],
            comment_line: '<!-- ng:templates -->' + grunt.util.linefeed + '<% content %>' + grunt.util.linefeed + '<!-- end ng:templates -->',
            PATH: require('path'),
            appDir_path: require('path').resolve(this.options().appDir)
        },
            BASE_FILE = this.options().appDir + '/' + this.options().indexFile,
            ABS_PATH = process.cwd();

        function stripTemplates() {

            var base_file = grunt.file.read(BASE_FILE),

                stripped_html = base_file.replace(/<script type="text\/ng-template" ([^'"]|"[^"]*"|'[^']*')*?<\/script>/gi, '');
            stripped_html = stripped_html.replace(/\s\s<!-- ng\:templates -->\s+<!-- end ng:templates -->\s\s/g, '');
            stripped_html = stripped_html.replace(/\s<!-- ng\:templates -->\s+<!-- end ng:templates -->\s/g, '');
            stripped_html = stripped_html.replace(/<!-- ng\:templates -->\s+<!-- end ng:templates -->/g, '');

            return stripped_html;

        }


        grunt.file.write(BASE_FILE, stripTemplates());

        this.files.forEach(function (f) {

            if (!grunt.file.exists(f.orig.src[0])) {
                grunt.fail.warn('Directory ' + f.orig.src[0] + ' could not be found');
                return false;
            }

            var src = f.src.filter(function (filepath) {

                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }


            }).map(function (filepath) {

                if (grunt.file.isDir(filepath)) {

                    grunt.file.recurse(filepath, function (abspath, rootdir, subdir, filename) {

                        if (filename.indexOf('.html') > -1) {

                            grunt.log.ok(configs.PATH.resolve(abspath).replace(configs.appDir_path, '').replace(/^\//, ''));

                            var _filename = configs.PATH.resolve(abspath).replace(configs.appDir_path, '').replace(/^\//, ''),
                                content = grunt.file.read(configs.PATH.resolve(abspath)),
                                parsed = configs.TEMPLATE.replace('<% filename %>', _filename).replace('<% content %>', content);

                            configs.partials.push(parsed);

                        }

                    });

                } else {
                    grunt.fail.warn(filepath + ' is an invalid directory');
                }

            });

        });

        var new_content = configs.partials.reverse().join(grunt.util.linefeed),
            old_file = grunt.file.read(BASE_FILE),
            BODY_END = old_file.search('</body>'),
            _begin = old_file.substring(0, BODY_END),
            _end = old_file.substring(BODY_END);

        if (this.options().concat) {
            new_content = new_content.replace(new RegExp("\>[\n\t ]+\<", "g"), "><");
        }

        grunt.file.write(BASE_FILE, _begin + grunt.util.linefeed + configs.comment_line.replace('<% content %>', new_content) + grunt.util.linefeed + _end);

    });

};