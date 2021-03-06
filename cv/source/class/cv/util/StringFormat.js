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


/**
 * Sprinff like formatter for Strings
 *
 */
qx.Class.define("cv.util.StringFormat", {
  extend: qx.core.Object,
  type : "singleton",

  /*
   *****************************************************************************
   CONSTRUCTOR
   *****************************************************************************
   */
  construct: function () {
    this.base(arguments);
    this._re = {
      not_string: /[^s]/,
      number: /[diefg]/,
      json: /[j]/,
      not_json: /[^j]/,
      text: /^[^\x25]+/,
      modulo: /^\x25{2}/,
      placeholder: /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijosuxX])/,
      key: /^([a-z_][a-z_\d]*)/i,
      key_access: /^\.([a-z_][a-z_\d]*)/i,
      index_access: /^\[(\d+)\]/,
      sign: /^[\+\-]/
    };

    this._cache = {};
  },

  /*
   *****************************************************************************
   MEMBERS
   *****************************************************************************
   */
  members: {
    _re: null,
    _cache: null,

    sprintf : function () {
      var key = arguments[0];
      if (!(this._cache[key] && this._cache.hasOwnProperty(key))) {
        this._cache[key] = this.parse(key);
      }
      return this.format(this._cache[key], arguments)
    },

    format: function (parse_tree, argv) {
      var cursor = 1, tree_length = parse_tree.length, node_type = "", arg, output = [], i, k, match, pad, pad_character, pad_length, is_positive = true, sign = "";
      for (i = 0; i < tree_length; i++) {
        node_type = this._getType(parse_tree[i]);
        if (node_type === "string") {
          output[output.length] = parse_tree[i]
        }
        else if (node_type === "array") {
          match = parse_tree[i]; // convenience purposes only
          if (match[2]) { // keyword argument
            arg = argv[cursor];
            for (k = 0; k < match[2].length; k++) {
              if (!arg.hasOwnProperty(match[2][k])) {
                throw new Error(this.sprintf("[sprintf] property '%s' does not exist", match[2][k]))
              }
              arg = arg[match[2][k]]
            }
          }
          else if (match[1]) { // positional argument (explicit)
            arg = argv[match[1]]
          }
          else { // positional argument (implicit)
            arg = argv[cursor++]
          }

          if (this._getType(arg) == "function") {
            arg = arg()
          }

          if (this._re.not_string.test(match[8]) && this._re.not_json.test(match[8]) && (this._getType(arg) != "number" && isNaN(arg))) {
            throw new TypeError(this.sprintf("[sprintf] expecting number but found %s", this._getType(arg)))
          }

          if (this._re.number.test(match[8])) {
            is_positive = arg >= 0
          }

          switch (match[8]) {
            case "b":
              arg = arg.toString(2);
              break;
            case "c":
              arg = String.fromCharCode(arg);
              break;
            case "d":
            case "i":
              arg = parseInt(arg, 10);
              break;
            case "j":
              arg = JSON.stringify(arg, null, match[6] ? parseInt(match[6]) : 0);
              break;
            case "e":
              arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential();
              break;
            case "f":
              arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg);
              break;
            case "g":
              arg = match[7] ? parseFloat(arg).toPrecision(match[7]) : parseFloat(arg);
              break;
            case "o":
              arg = arg.toString(8);
              break;
            case "s":
              arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg);
              break;
            case "u":
              arg = arg >>> 0;
              break;
            case "x":
              arg = arg.toString(16);
              break;
            case "X":
              arg = arg.toString(16).toUpperCase();
              break
          }
          if (this._re.json.test(match[8])) {
            output[output.length] = arg
          }
          else {
            if (this._re.number.test(match[8]) && (!is_positive || match[3])) {
              sign = is_positive ? "+" : "-";
              arg = arg.toString().replace(this._re.sign, "")
            }
            else {
              sign = ""
            }
            pad_character = match[4] ? match[4] === "0" ? "0" : match[4].charAt(1) : " ";
            pad_length = match[6] - (sign + arg).length;
            pad = match[6] ? (pad_length > 0 ? this.strRepeat(pad_character, pad_length) : "") : "";
            output[output.length] = match[5] ? sign + arg + pad : (pad_character === "0" ? sign + pad + arg : pad + sign + arg)
          }
        }
      }
      return output.join("")
    },

    parse: function (fmt) {
      var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
      while (_fmt) {
        if ((match = this._re.text.exec(_fmt)) !== null) {
          parse_tree[parse_tree.length] = match[0]
        }
        else if ((match = this._re.modulo.exec(_fmt)) !== null) {
          parse_tree[parse_tree.length] = "%"
        }
        else if ((match = this._re.placeholder.exec(_fmt)) !== null) {
          if (match[2]) {
            arg_names |= 1;
            var field_list = [], replacement_field = match[2], field_match = [];
            if ((field_match = this._re.key.exec(replacement_field)) !== null) {
              field_list[field_list.length] = field_match[1];
              while ((replacement_field = replacement_field.substring(field_match[0].length)) !== "") {
                if ((field_match = this._re.key_access.exec(replacement_field)) !== null) {
                  field_list[field_list.length] = field_match[1]
                }
                else if ((field_match = this._re.index_access.exec(replacement_field)) !== null) {
                  field_list[field_list.length] = field_match[1]
                }
                else {
                  throw new SyntaxError("[sprintf] failed to parse named argument key")
                }
              }
            }
            else {
              throw new SyntaxError("[sprintf] failed to parse named argument key")
            }
            match[2] = field_list
          }
          else {
            arg_names |= 2
          }
          if (arg_names === 3) {
            throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported")
          }
          parse_tree[parse_tree.length] = match
        }
        else {
          throw new SyntaxError("[sprintf] unexpected placeholder")
        }
        _fmt = _fmt.substring(match[0].length)
      }
      return parse_tree
    },

    vsprintf: function (fmt, argv, _argv) {
      _argv = (argv || []).slice(0);
      _argv.splice(0, 0, fmt);
      return this.sprintf(null, _argv)
    },

    /**
     * helpers
     */
    _getType: function (variable) {
      return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase()
    },

    strRepeat: function (input, multiplier) {
      return new Array(multiplier + 1).join(input)
    }
  }
});

