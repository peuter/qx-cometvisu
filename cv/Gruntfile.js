// requires
var util = require('util');
var qx = require("../external/qooxdoo/tool/grunt");
var appConfig;

// grunt
module.exports = function(grunt) {
  var config = {
    appConfig : grunt.file.readJSON( 'Manifest.json' ) || {},

    banner: '/* <%= appConfig.info.name %> - version <%= appConfig.info.version %> - <%= grunt.template.today("dd-mm-yyyy") %>\n' +
    ' * <%= appConfig.info.description %>\n' +
    ' * copyright (c) <%= grunt.template.today("yyyy") %> <%= appConfig.info.authors[0].name %> [<%= appConfig.info.authors[0].email %>]\n' +
    ' * \n' +
    ' * based on the original cometvisu.js (c) 2010 by <%= appConfig.info.authors[1].name %> [<%= appConfig.info.authors[1].email %>]\n'+
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
          '../external/icons/raw_svg/*.svg',
          'source/resource/cv/icons/*.svg'
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
        }
      }
    },

    usebanner: {
      dist: {
        options: {
          position: 'top',
          replace : true,
          linebreak : true,
          banner: '<%= banner %>'
        },
        files: {
          src: [ 'source/class/cv/**/*.js' ]
        }
      }
    }
  };

  var mergedConf = qx.config.mergeConfig(config);


  grunt.initConfig(mergedConf);

  qx.task.registerTasks(grunt);

  grunt.loadNpmTasks('grunt-webfont');
  grunt.loadNpmTasks('grunt-banner');
};
