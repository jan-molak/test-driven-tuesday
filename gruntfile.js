'use strict';

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-cov');

    grunt.registerTask('default',  ['test']);
    grunt.registerTask('test',     ['mochacov:watch']);
    grunt.registerTask('coverage', ['mochacov:report']);


    grunt.registerTask('timestamp', function() {
        grunt.log.subhead(new Date());
    });

    grunt.initConfig({

        src: {
            js:    ['src/**/*.js'],
            specs: ['spec/**/*.js']
        },

        target: 'target',


        clean: [ '<%= target %>' ],

        jshint: {
            src: [ '<%= src.js %>', '<%= src.specs %>'],
            options: {
                jshintrc: true
            }
        },

        watch: {
            options: {
                spawn: true
            },
            files: [
                'gruntfile.js',
                '<%= src.js %>',
                '<%= src.specs %>'
            ],
            tasks: [ 'clean', 'default']
        },

        mochacov: {
            options: {
                files: '<%= src.specs %>'
            },
            watch: {
                options: {
                    reporter: 'spec'
                }
            },
            report: {
                options: {
                    reporter: 'html-cov',
                    output:   '<%= target %>/coverage.html'
                }
            }
        }
    });
};