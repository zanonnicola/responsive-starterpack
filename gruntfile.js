module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {

            // Concatenate js files
            // https://github.com/gruntjs/grunt-contrib-concat

            dist: {
                src: [
                    'js/min/jquery-1.9.1.min.js',
                    'js/min/plugins.min.js', // All JS in the libs folder
                    'js/min/functions.min.js'  // This specific file
                ],
                dest: 'js/build/production.min.js',
            }
        },
        processhtml: {

            // Process html files at build time to modify them depending on the release environment
            // https://npmjs.org/package/grunt-processhtml

            options: {
              data: {
                message: 'Done!'
              }
            },
            dist: {
                files: {
                    'build/index.html': ['index.html']
                }
            }
        },
        phantomas: {
            // Grunt plugin wrapping phantomas to measure frontend performance
            // This grunt plugin executes phantomas for you and visualizes the returned metrics in a generated index.html for you. It will keep track of history, so that you can set it up and check reports after every deployment of your site.
            // https://github.com/stefanjudis/grunt-phantomas   
            yourSite : {
                options : {
                    indexPath : './phantomas/',
                    options   : {
                        'timeout' : 60
                    },
                    url : 'http://www.nicola-zanon.com/'
                }
            }
        },
        grunticon: {
            //Grunticon takes a folder of SVG/PNG files (typically, icons that you've drawn in an application like Adobe Illustrator), and outputs them to CSS in 3 formats: svg data urls, png data urls, and a third fallback CSS file with references to regular png images, which are also automatically generated and placed in a folder.
            // https://github.com/filamentgroup/grunticon
            myIcons: {
                files: [{
                    expand: true,
                    cwd: 'css/icons',
                    src: ['*.svg', '*.png'],
                    dest: "css/icons/output"
                }],
                options: {
                }
            }
        },

        autoprefixer: {
            // Parse CSS and add vendor prefixes to CSS rules using values from the Can I Use.
            // https://github.com/nDmitry/grunt-autoprefixer
            options: {
              // Task-specific options go here.
              browsers: ['last 2 version']
            },

            // if you have specified only the `src` param, the destination will be set automatically,
            // so source files will be overwritten
            no_dest: {
              src: 'css/global.css' 
            }
        },
        svgmin: {  
            // Minify SVG 
            // https://github.com/sindresorhus/grunt-svgmin         
            options: {                 
                plugins: [
                    { removeViewBox: false },
                    { removeUselessStrokeAndFill: false }
                ]
            },
            dist: {                     // Target
                files: [{               // Dictionary of files
                    expand: true,       // Enable dynamic expansion.
                    cwd: 'img',     // Src matches are relative to this path.
                    src: ['**/*.svg'],  // Actual pattern(s) to match.
                    dest: 'img',       // Destination path prefix.
                    ext: '.svg'     // Dest filepaths will have this extension.
                    // ie: optimise img/src/branding/logo.svg and store it in img/branding/logo.min.svg
                }]
            }
        },
        smushit: {
            mygroup: {
                src: ['img/*.png','img/*.jpg'],
                dest: 'img/min'
            }
        }, 
        watch: {
            // Run predefined tasks whenever watched file patterns are added, changed or deleted.
            // https://github.com/gruntjs/grunt-contrib-watch
            scripts: {
                files: ['js/min/*.js'],
                tasks: ['concat'],
                options: {
                    spawn: false,
                },
            } 
        }
    });

    // 3. Where I tell Grunt I plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-phantomas');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-grunticon');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-smushit');

    // 4. Where I tell Grunt what to do when I type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'processhtml', 'autoprefixer', 'grunticon:myIcons', 'svgmin', 'smushit', 'phantomas']);

};