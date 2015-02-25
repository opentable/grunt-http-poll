module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                'tests/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        'http-poll': {
            'server': {
                options: {
                    endpoint: 'http://127.0.0.1:8888/503after3attempts',
                    statuscode: 503
                }
            },
            'otherserver': {
                options: {
                    endpoint: 'http://127.0.0.1:8888/503after3attempts',
                    statuscode: 503
                }
            },
            'badserver': {
                options: {
                    endpoint: 'http://127.0.0.1:8888',
                    statuscode: 200,
                    timeout: 3000,
                    timeoutIsError: false
                }
            },
            'otherbadserver': {
                options: {
                    endpoint: 'http://127.0.0.1:8000',
                    statuscode: 200,
                    timeout: 3000,
                    timeoutIsError: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('test', ['jshint', 'start-server', 'http-poll', 'kill-server']);
    grunt.registerTask('default', ['test']);
    grunt.loadTasks('tasks');
    grunt.loadTasks('tests/tasks');
};
