/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Tino Butz (tbtz)

************************************************************************ */

/**
 * EXPERIMENTAL - NOT READY FOR PRODUCTION
 *
 * The TextArea is a multi-line text input field.
 */
qx.Class.define("qx.ui.mobile.form.TextArea",
{
  extend : qx.ui.mobile.core.Widget,
  include : [
    qx.ui.mobile.form.MValue,
    qx.ui.mobile.form.MText,
    qx.ui.form.MForm,
    qx.ui.form.MModelProperty
  ],
  implement : [
    qx.ui.form.IForm,
    qx.ui.form.IModel
  ],


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param value {var?null} The value of the widget.
   */
  construct : function(value)
  {
    this.base(arguments);
  },


  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    // overridden
    defaultCssClass :
    {
      refine : true,
      init : "textArea"
    },
    
    /**
     * Whether this textarea is enabled or not
     */
    enabled :
    {
      init: true,
      check : "Boolean",
      nullable: false,
      event : "changeEnabled",
      apply: "_applyEnabled"
    }
  },


  members :
  {
    // overridden
    _getTagName : function()
    {
      return "textarea";
    },
    
    /**
     * Sets the enable property to the new value
     * @param value {Boolean}, the new value of the textarea
     * @param old {Boolean?}, the old value of the textarea
     * 
     */
    _applyEnabled : function(value,old)
    {
      if(value)
      {
        this._setAttribute("disabled",null)
      }
      else
      {
        this._setAttribute("disabled","disabled");
      }
    }
  }
});
