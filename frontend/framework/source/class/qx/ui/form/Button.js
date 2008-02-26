/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * A Button widget
 *
 * If the user presses the button by clicking on ito pressing the enter or
 * space key, The button fires an {@link qx.ui.core.MExecutable#execute} event.
 *
 * If the {@link @link qx.ui.core.MExecutable#command} property is set, the
 * command is executed as well.
 *
 * @appearance button
 * @state abandoned
 * @state over
 * @state pressed
 */
qx.Class.define("qx.ui.form.Button",
{
  extend : qx.ui.basic.Atom,
  include : qx.ui.core.MExecutable,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(label, iconUrl)
  {
    this.base(arguments, label, iconUrl);

    this.initTabIndex();

    this.addListener("mouseover", this._onmouseover);
    this.addListener("mouseout", this._onmouseout);
    this.addListener("mousedown", this._onmousedown);
    this.addListener("mouseup", this._onmouseup);

    this.addListener("keydown", this._onkeydown);
    this.addListener("keyup", this._onkeyup);
  },


  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    appearance :
    {
      refine : true,
      init : "button"
    },

    tabIndex :
    {
      refine : true,
      init : 1
    }
  },



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * Listener method for "mouseover" event
     * <ul>
     * <li>Adds state "over"</li>
     * <li>Removes "abandoned" and adds "pressed" state (if "abandoned" state is set)</li>
     * </ul>
     *
     * @type member
     * @param e {Event} Mouse event
     * @return {void}
     */
    _onmouseover : function(e)
    {
      if (!e.isTargetInsideWidget(this)) {
        return;
      }

      if (this.hasState("abandoned"))
      {
        this.removeState("abandoned");
        this.addState("pressed");
      }

      this.addState("over");
    },


    /**
     * Listener method for "mouseout" event
     * <ul>
     * <li>Removes "over" state</li>
     * <li>Adds "abandoned" and removes "pressed" state (if "pressed" state is set)</li>
     * </ul>
     *
     * @type member
     * @param e {Event} Mouse event
     * @return {void}
     */
    _onmouseout : function(e)
    {
      if (!e.isTargetInsideWidget(this)) {
        return;
      }

      this.removeState("over");

      if (this.hasState("pressed"))
      {
        this.removeState("pressed");
        this.addState("abandoned");
      }
    },


    /**
     * Listener method for "mousedown" event
     * <ul>
     * <li>Removes "abandoned" state</li>
     * <li>Adds "pressed" state</li>
     * </ul>
     *
     * @type member
     * @param e {Event} Mouse event
     * @return {void}
     */
    _onmousedown : function(e)
    {
      if (!e.isLeftPressed()) {
        return;
      }

      // Activate capturing if the button get a mouseout while
      // the button is pressed.
      this.capture();

      this.removeState("abandoned");
      this.addState("pressed");
    },


    /**
     * Listener method for "mouseup" event
     * <ul>
     * <li>Removes "pressed" state (if set)</li>
     * <li>Removes "abandoned" state (if set)</li>
     * <li>Adds "over" state (if "abandoned" state is not set)</li>
     *
     * @type member
     * @param e {Event} Mouse event
     * @return {void}
     */
    _onmouseup : function(e)
    {
      this.releaseCapture();

      // We must remove the states before executing the command
      // because in cases were the window lost the focus while
      // executing we get the capture phase back (mouseout).
      var hasPressed = this.hasState("pressed");
      var hasAbandoned = this.hasState("abandoned");

      if (hasPressed) {
        this.removeState("pressed");
      }

      if (hasAbandoned) {
        this.removeState("abandoned");
      }

      if (!hasAbandoned)
      {
        this.addState("over");

        if (hasPressed) {
          this.execute();
        }
      }
    },


    /**
     * Listener method for "keydown" event.<br/>
     * Removes "abandoned" and adds "pressed" state
     * for the keys "Enter" or "Space"
     *
     * @type member
     * @param e {Event} Key event
     * @return {void}
     */
    _onkeydown : function(e)
    {
      switch(e.getKeyIdentifier())
      {
        case "Enter":
        case "Space":
          this.removeState("abandoned");
          this.addState("pressed");
          e.stopPropagation();
      }
    },


    /**
     * Listener method for "keyup" event.<br/>
     * Removes "abandoned" and "pressed" state (if "pressed" state is set)
     * for the keys "Enter" or "Space"
     *
     * @type member
     * @param e {Event} Key event
     * @return {void}
     */
    _onkeyup : function(e)
    {
      switch(e.getKeyIdentifier())
      {
        case "Enter":
        case "Space":
          if (this.hasState("pressed"))
          {
            this.removeState("abandoned");
            this.removeState("pressed");
            this.execute();
            e.stopPropagation();
          }
      }
    }
  }
});