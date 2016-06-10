module.exports = function (grunt) {

  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    today: grunt.template.today('yyyymmdd'),

    clean: {
      dist: ['dist'],
      release: ['_releases/<%= pkg.version %>'],
      site: ['_gh_pages']
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: ['*.js', 'src/*.js']
    },

    jscs: {
      options: {
        config: '.jscsrc'
      },
      files: ['*.js', 'src/*.js']
    },

    uglify: {
      options: {
        preserveComments: 'some'
      },
      dist: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      },
      site: {
        src: 'docs/js/main.js',
        dest: '_gh_pages/js/main.js'
      }
    },

    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      files: ['docs/css/*.css']
    },

    cssmin: {
      options: {
        compatibility: 'ie8',
        keepSpecialComments: '*',
        noAdvanced: true
      },
      dist: {
        src: 'docs/css/main.css',
        dest: '_gh_pages/css/main.css'
      }
    },

    nodeunit: {
      files: ['test/*.js']
    },

    replace: {
      dist: {
        options: {
          prefix: '@',
          patterns: [{
            match: 'VERSION',
            replacement: '<%= pkg.version %>'
          }, {
            match: 'YEAR',
            replacement: new Date().getFullYear()
          }, {
            match: 'DATE',
            replacement: new Date().toISOString()
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: 'dist/*.js',
          dest: 'dist/'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          '_gh_pages/index.html': 'docs/index.html'
        }
      }
    },

    copy: {
      dist: {
        expand: true,
        flatten: true,
        src: 'src/*.js',
        dest: 'dist'
      },
      release: {
        expand: true,
        flatten: true,
        src: 'dist/*.js',
        dest: '_releases/<%= pkg.version %>'
      },
      site: {
        expand: true,
        flatten: true,
        src: 'dist/*.js',
        dest: '_gh_pages/js/'
      },
      html: {
        expand: true,
        flatten: true,
        src: 'docs/*.html',
        dest: '_gh_pages'
      }
    },

    watch: {
      files: [
        'src/<%= pkg.name %>.js'
      ],
      tasks: 'jshint'
    }
  });

  // Loading dependencies
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('site', ['clean:site', 'uglify:site', 'copy:site', 'csslint', 'cssmin', 'copy:html', 'htmlmin']);

  grunt.registerTask('default', ['clean', 'jshint', 'jscs', 'nodeunit', 'uglify:dist', 'copy:dist', 'replace', 'copy:release']);
};
