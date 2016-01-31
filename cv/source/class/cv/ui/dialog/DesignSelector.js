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
 * This dialog shows the available designs and allows to select one of them
 *
 * @author tobiasb
 */
qx.Class.define("cv.ui.dialog.DesignSelector",
  {
    extend: qx.ui.window.Window,

    /*
     *****************************************************************************
      CONSTRUCTOR
     *****************************************************************************
     */
    construct :function(title, icon) {
      this.base(arguments, title, icon);

      this.setModal(true);

      // add design selection
      var list = new qx.ui.form.SelectBox();

      var themes = qx.Theme.getAll();
      for (var key in themes) {
        //noinspection JSUnfilteredForInLoop
        var theme = themes[key];
        if (theme.type === "meta") {
          list.add(new qx.ui.form.ListItem(theme.name.replace("cv.theme.","")));
        }
      }

      this.add(list);

      list.addListener("changeSelection", function(e) {
        if (e.getData() && e.getData().length === 1) {
          this.fireDataEvent("designSelected", e.getData()[0]);
        }
        this.close();
      }, this);
    },

    /*
     *****************************************************************************
      EVENTS
     *****************************************************************************
     */
    events :  {
      designSelected : "qx.event.type.Data"
    }
  });
