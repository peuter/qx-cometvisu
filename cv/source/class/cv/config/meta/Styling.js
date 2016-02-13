/* 
 * QometVisu - version 0.0.1-SNAPSHOT - 13-02-2016
 *  @see(https://github.com/peuter/qx-cometvisu)
 * 
 * This is a port of the CometVisu smart home visualization, based on the qooxdoo framework
 *  @see(https://github.com/cometvisu/cometvisu)
 *  @see(https://github.com/qooxdoo/qooxdoo)
 * 
 * copyright (c) 2016 Tobias Bräutigam (Peuter) [tbraeutigam at gmail dot com]
 * 
 * based on: 
 * cometvisu.js (c) 2010 by Christian Mayer (ChristianMayer) [CometVisu at ChristianMayer dot de]
 * 
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */


//noinspection JSUnusedGlobalSymbols
/**
 * 
 *
 */
qx.Class.define("cv.config.meta.Styling",
{
  extend : cv.config.meta.Base,

  /*
   *****************************************************************************
      CONSTRCUTOR
   *****************************************************************************
   */
  construct : function(node) {
    this.base(arguments, node);
  },
  
   /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */
  properties : {
    
    classnames : {
      check : "qx.data.Array",
      nullable : true
    },
    value : {
      check : "Object",
      nullable : true
    },
    defaultValue : {
      check : "String",
      nullable : true
    },
    range : {
      check : "Object",
      nullable : true
    }
  },
  
   /*
   *****************************************************************************
      MEMBERS
   *****************************************************************************
   */
  members : {
    
    _parseNode : function(node) {
      this.base(arguments, node);

      this.setValue({});
      this.setRange({});
      
      var classnames = new qx.data.Array();
      var entries = node.getElementsByTagName('entry');
      for (var i=0; i < entries.length; i++) {
        var entry = entries.item(i);
        
        classnames.push(entry.textContent);
        // check for default entry
        var isDefaultValue = entry.attributes.getNamedItem('default');
        if (isDefaultValue) {
          isDefaultValue = isDefaultValue.value === "true";
        } else {
          isDefaultValue = false;
        }
        // now set the mapped values
        var val = entry.attributes.getNamedItem('value');
        if (val) {
          this.getValue()[val.value] = entry.textContent;
          if (isDefaultValue) {
            this.setDefaulValue(val.value);
          }
        }
        else {
          var min = parseFloat(entry.attributes.getNamedItem('range_min').value);
          var max = parseFloat(entry.attributes.getNamedItem('range_max').value);
          
          this.getRange().min = [ max, entry.textContent ];
          if (isDefaultValue) {
            this.setDefaultValue(min);
          }
        }      
      }
      this.setClassnames(classnames);
    }
  }
});
