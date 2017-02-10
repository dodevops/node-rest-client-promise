/*global module:false*/
module.exports = function (grunt) {

    grunt.initConfig(
        {
            eslint: {
                gruntfile: ['Gruntfile.js'],
                lib: ['lib/**/*.js'],
                test: ['test/**/*_test.js'],
                options: {
                    configFile: '.eslintrc'
                }
            },

            mochaTest: {
                test: {
                    options: {
                        reporter: 'spec',
                        quiet: false,
                        timeout: 2000
                    },
                    src: ['test/**/*.js']
                }
            }

        }
    );

    grunt.loadNpmTasks('gruntify-eslint');
    grunt.loadNpmTasks('grunt-mocha-test');

    // Test task
    grunt.registerTask(
        'test',
        [
            'eslint',
            'mochaTest'
        ]
    );

};
