/* QX-CometVisu - version master - 13-02-2016
 * This is a port of the CometVisu based on the qooxdoo framework
 * copyright (c) 2016 Tobias Bräutigam (Peuter) [tbraeutigam at gmail dot com]
 * 
 * based on the original cometvisu.js (c) 2010 by Christian Mayer (ChristianMayer) [CometVisu at ChristianMayer dot de]
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


/**
 * Font definitions
 */
qx.Theme.define("cv.theme.metal.Font",
{
  extend : cv.theme.pure.Font,

  fonts :
  {
    "Dosis" : {
      family: ["Dosis"],
      sources: [
        {
          family: "Dosis",
          source: [
            "resource/cv/designs/metal/fonts/Dosis-Medium.ttf"
          ]
        }
      ]
    },

    "group-title" :
    {
      size : 18,
      color : "white",
      family : [ 'Dosis','Helvetica','sans-serif' ]
    },

    "default" :
    {
      size : 22,
      color : "white",
      family : [ 'Dosis','Helvetica','sans-serif' ]
    },

    "subtext" :
    {
      size : 14,
      color : "white",
      family : [ 'Dosis','Helvetica','sans-serif' ]
    },
    
    "title" :
    {
      size : 38,
      lineHeight : 2.5,
      bold : true,
      color : "white",
      family : [ 'Dosis','Helvetica','sans-serif' ]
    }
  }
});