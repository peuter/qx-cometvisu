/* cometvisu.js (c) 2010 by Christian Mayer [CometVisu at ChristianMayer dot de]
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
 *
 * @asset(cv/font/icons.ttf)
 * @asset(cv/font/icons.woff)
 */
qx.Theme.define("cv.theme.Font",
{
  extend : qx.theme.modern.Font,

  fonts :
  {
    "default" :
    {
      size : 18,
      family : ['URW Gothic L','Century Gothic','Apple Gothic',"arial","sans-serif"]
    },
    
    "title" :
    {
      size : 38,
      lineHeight : 2.5,
      bold : true,
      family : ['URW Gothic L','Century Gothic','Apple Gothic',"arial","sans-serif"]
    },

    "icons" :
    {
      family : ["CVIconFont"],
      sources : [
        {
          family : "CVIconFont",
          source : [
            "cv/font/icons.woff", "cv/font/icons.ttf"
          ]
        }
      ]
    }
  }
});