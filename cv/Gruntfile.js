// requires
var util = require('util');
var qx = require("../external/qooxdoo/tool/grunt");
var appConfig;

// grunt
module.exports = function(grunt) {
  var config = {
    appConfig : grunt.file.readJSON( 'Manifest.json' ) || {},

    banner: '/* \n' +
    ' * <%= appConfig.info.name %> - version <%= appConfig.info.version %> - <%= grunt.template.today("dd-mm-yyyy") %>\n' +
    ' *  \@see(<%= appConfig.info.homepage %>)\n' +
    ' * \n' +
    ' * <%= appConfig.info.description %>\n' +
    ' *  \@see(<%= appConfig.info.links[0] %>)\n' +
    ' *  \@see(<%= appConfig.info.links[1] %>)\n' +
    ' * \n' +
    ' * copyright (c) <%= grunt.template.today("yyyy") %> <%= appConfig.info.authors[0].name %> [<%= appConfig.info.authors[0].email %>]\n' +
    ' * \n' +
    ' * based on: \n'+
    ' * cometvisu.js (c) 2010 by <%= appConfig.info.authors[1].name %> [<%= appConfig.info.authors[1].email %>]\n'+
    ' * \n' +
    ' * This program is free software; you can redistribute it and/or modify it\n' +
    ' * under the terms of the GNU General Public License as published by the Free\n' +
    ' * Software Foundation; either version 3 of the License, or (at your option)\n' +
    ' * any later version.\n' +
    ' * \n' +
    ' * This program is distributed in the hope that it will be useful, but WITHOUT\n' +
    ' * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or\n' +
    ' * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for\n' +
    ' * more details.\n' +
    ' *\n' +
    ' * You should have received a copy of the GNU General Public License along\n' +
    ' * with this program; if not, write to the Free Software Foundation, Inc.,\n' +
    ' * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA\n'+
    ' */\n',

    generator_config: {
      let: {
      }
    },

    common: {
      "APPLICATION" : "cv",
      "QOOXDOO_PATH" : "../external/qooxdoo",
      "LOCALES": ["en"],
      "QXTHEME": "cv.theme.Theme"
    },

    // webfont generation
    webfont: {
      icons: {
        src: [
          'cache/icons/*.svg'
        ],
        dest: 'source/resource/cv/font',
        options: {
          font : "CVIconFont",
          normalize : true,
          customOutput: [{
            template: 'templates/IconSet.jstemp',
            dest: 'source/class/cv/config/IconSet.js'
          }],
          autoHint : false
        },
        types : "ttf"
      }
    },

    svgmin: {
      options: {
        plugins: [
          {convertTransform: false}
        ]
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: '../external/icons/raw_svg/',
            src: '*.svg',
            dest: 'cache/icons/'
          },
          {
            expand: true,
            cwd: 'source/resource/cv/icons/',
            src: '*.svg',
            dest: 'cache/icons/'
          }
        ]
      }
    },

    // license header adding
    usebanner: {
      dist: {
        options: {
          position: 'top',
          replace : true,
          linebreak : true,
          banner: '<%= banner %>'
        },
        files: {
          src: [ 'source/class/cv/**/*.js', 'templates/*.jstemp' ]
        }
      }
    },

    // appcache
    manifest: {
      generate: {
        options: {
          basePath: 'build/',
          network: ['http://*', 'https://*'],
          preferOnline: true,
          headcomment: " <%= appConfig.info.name %> v<%= appConfig.info.version %>",
          verbose: true,
          timestamp: true,
          hash: true,
          master: ['index.html']
          //process: function(path) {
          //  return path.substring('build/'.length);
          //}
        },
        src: [
          'script/*.js',
          'resource/cv/**/*.ttf',
          'resource/cv/**/*.woff',
          'resource/cv/**/*.eot',
          'resource/cv/**/*.png'
        ],
        dest: 'build/manifest.appcache'
      }
    },

    // make a zipfile
    compress: {
      main: {
        options: {
          mode : 'tgz',
          archive: function() {
            return "Qometvisu-0.0.1-SNAPSHOT.tar.gz"
          }
        },
        files: [
          { expand: true, cwd: 'build', src: ['./**'], dest: 'qometvisu/' } // includes files in path
        ]
      }
    },

    // woff and eot generation is done with sfntool as it creates significantly smaller files
    exec : {
      make_woff : {
        cmd : 'java -jar ../tools/sfnttool.jar -w source/resource/cv/font/CVIconFont.ttf source/resource/cv/font/CVIconFont.woff'
      },
      make_eot : {
        cmd : 'java -jar ../tools/sfnttool.jar -e -x source/resource/cv/font/CVIconFont.ttf source/resource/cv/font/CVIconFont.eot'
      },
      deploy : {
        cmd : 'scp -r build/* tobiasb@home:/usr/share/openhab/webapps/qometvisu/'
      }
    },

    clean: {
      cache : [ 'cache/*']
    }
  };

  var mergedConf = qx.config.mergeConfig(config);


  grunt.initConfig(mergedConf);

  qx.task.registerTasks(grunt);

  grunt.loadNpmTasks('grunt-webfont');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-manifest');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // create a chained task for webfont generation
  grunt.registerTask('generate-font', ['svgmin', 'webfont', 'exec:make_woff', 'exec:make_eot']);
  grunt.registerTask('build-release', ['build', 'manifest', 'compress']);
  grunt.registerTask('install', ['build', 'manifest' ,'exec:deploy'])
};
