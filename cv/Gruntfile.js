// requires
var util = require('util');
var qx = require("../external/qooxdoo/tool/grunt");

// grunt
module.exports = function(grunt) {
  var config = {

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

    /*
    myTask: {
      options: {},
      myTarget: {
        options: {}
      }
    }
    */
    // webfont generation
    webfont: {
      icons: {
        src: [
          '../external/icons/raw_svg/*.svg',
          'source/resource/cv/icons/*.svg'
        ],
        dest: 'source/resource/cv/font',
        options: {
          customOutput: [{
            template: 'templates/IconSet.jstemp',
            dest: 'source/class/cv/config/IconSet.js'
          }],
          autoHint : false
        }
      }
    }
  };

  var mergedConf = qx.config.mergeConfig(config);
  // console.log(util.inspect(mergedConf, false, null));
  grunt.initConfig(mergedConf);

  qx.task.registerTasks(grunt);

  grunt.loadNpmTasks('grunt-webfont');

  // grunt.loadNpmTasks('grunt-my-plugin');
};
