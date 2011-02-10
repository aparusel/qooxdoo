/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

************************************************************************ */

/**
 * EXPERIMENTAL!
 *
 * A virtual form widget that allows text entry as well as selection from a
 * list.
 *
 * @childControl textfield {qx.ui.form.TextField} Field for text entry.
 * @childControl button {qx.ui.form.Button} Opens the list popup.
 */
qx.Class.define("qx.ui.form.VirtualComboBox", {

  extend : qx.ui.form.AbstractVirtualPopupList,

  implement : [qx.ui.form.IStringForm],

  construct : function(model) {
    this.base(arguments, model);

    this._createChildControl("textfield");
    this._createChildControl("button");
    this.getChildControl("dropdown").getChildControl("list").setSelectionMode("single");
  },

  properties : {

    // overridden
    appearance : {
      refine : true,
      init : "virtual-combobox"
    },

    // overridden
    width : {
      refine : true,
      init : 120
    },

    /**
     * The currently selected or entered value. 
     */
    value : {
      nullable : true,
      event : "changeValue",
      apply : "_applyValue"
    },
    
    /**
     * Formatting function that will be applied to the value of a selected model
     * item's label before it is written to the text field. Also used to find 
     * and preselect the first list entry that begins with the current content
     * of the text field when the dropdown list is opened. Can be used e.g. to 
     * strip HTML tags from rich-formatted item labels. The function will be 
     * called with the item's label (String) as the only parameter.
     */
    defaultFormat : {
      check : "Function",
      init : null,
      nullable : true
    }
  },

  members :
  {

    __selection : null,
    __selectionBindingId : null,

    // overridden
    _createChildControlImpl : function(id, hash)
    {
      var control;

      switch (id) {
        case "textfield" :
          control = new qx.ui.form.TextField();
          control.setFocusable(false);
          control.addState("inner");
          this._add(control, {
                flex : 1
              });
          break;

        case "button" :
          control = new qx.ui.form.Button();
          control.setFocusable(false);
          control.setKeepActive(true);
          control.addState("inner");
          this._add(control);
          break;
      }

      return control || this.base(arguments, id);
    },

    // overridden
    tabFocus : function()
    {
      var field = this.getChildControl("textfield");

      field.getFocusElement().focus();
      field.selectAllText();
    },

    // overridden
    focus : function()
    {
      this.base(arguments);
      this.getChildControl("textfield").getFocusElement().focus();
    },

    // overridden
    _beforeOpen : function()
    {
      this._selectFirstMatch();
    },

    // overridden
    _handleKeyboard : function(event)
    {
      var action = this._getAction(event);
      
      switch(action)
      {
        case "select":
          this.setValue(this.getChildControl("textfield").getValue());
          break;
          
       /*
       case "none":
          return;
          break;
       */

        default:
          this.base(arguments, event);
          break;
      }
    },
    
    // overridden
    _getAction : function(event)
    {
      var keyIdentifier = event.getKeyIdentifier();
      var isOpen = this.getChildControl("dropdown").isVisible();

      if (!isOpen && keyIdentifier === "Enter") {
        return "select";
      } else {
        return this.base(arguments, event);
        
        /*
        var action = this.base(arguments, event);
        switch(action)
        {
          case "selectPrevious":
          case "selectNext":
          case "selectFirst":
          case "selectLast":
            var value = this.getChildControl("textfield").getValue();
            if (value !== "") {
              return "none";
            }
          default:
            return action;
        }
        */
      }
    },
      
    // overridden
    _handleMouse : function(event)
    {
      this.base(arguments, event);

      var type = event.getType();
      var target = event.getTarget();
      if (type === "click" && target == this.getChildControl("button")) {
        this.toggle();
      }
    },

    // overridden
    _bindWidget : function()
    {
      if (this.__selectionBindingId) {
        this.__selection.removeBinding(this.__selectionBindingId);
        this.__selectionBindingId = null;
      }

      this.__selection = this.getChildControl("dropdown").getSelection();

      var labelSourcePath = this._getBindPath("", this.getLabelPath());
      this.__selectionBindingId = this.__selection.bind(labelSourcePath, 
        this, "value", this.__getLabelFilterOptions());
    },

    /**
     * Returns an options map used for binding the selected item's label to
     * the {@link #value} property. If {@link #stripTags} is set, a converter 
     * that strips HTML tags from the label string is added.
     * 
     * @return {Map} Options map
     */
    __getLabelFilterOptions : function()
    {
      var labelOptions = this.getLabelOptions();
      var options = null;
      var formatter = this.getDefaultFormat();
      
      if (labelOptions != null) {
        options = qx.lang.Object.clone(labelOptions);
        
        if (formatter) {
          options.converter = function(data, model) {
            data = labelOptions.converter(data, model);
            return formatter(data);
          }
        }
      } else {
        if (formatter) {
          options = {
            converter : formatter
          }
        }
      }
      
      return options;
    },

    /**
     * Selects the first list item that starts with the text field's
     * value.
     */
    _selectFirstMatch : function()
    {
      var value = this.getChildControl("textfield").getValue();
      var labelPath = this.getLabelPath();
      if (this.__selection.getItem(0) !== value) {
        var model = this.getModel();
        var lookupTable = this.getChildControl("dropdown").getChildControl("list")._getLookupTable();
        for (var i = 0, l = lookupTable.length; i < l; i++) {
          var modelItem = model.getItem(lookupTable[i]);
          var itemLabel = null;
          if (labelPath) {
            itemLabel = qx.data.SingleValueBinding.getValueFromObject(modelItem, labelPath);
          }
          else if (typeof(modelItem) == "string") {
            itemLabel = modelItem;
          }
          if (itemLabel && this.getDefaultFormat()) {
            itemLabel = this.getDefaultFormat()(qx.lang.String.stripTags(itemLabel));
          }
          if (itemLabel && itemLabel.indexOf(value) == 0) {
            this.getChildControl("dropdown").setPreselected(modelItem);
            break;
          }
        }
      }
    },

    _applyValue : function(value, old)
    {
      if (value && value !== old) {
        var textfield = this.getChildControl("textfield");
        textfield.setValue(value);
      }
    },

    /*
     * ---------------------------------------------------------------------------
     * TEXTFIELD SELECTION API
     * ---------------------------------------------------------------------------
     */

    /**
     * Returns the current selection. This method only works if the
     * widget is already created and added to the document.
     *
     * @return {String|null}
     */
    getTextSelection : function()
    {
      return this.getChildControl("textfield").getTextSelection();
    },

    /**
     * Returns the current selection length. This method only works
     * if the widget is already created and added to the document.
     *
     * @return {Integer|null}
     */
    getTextSelectionLength : function()
    {
      return this.getChildControl("textfield").getTextSelectionLength();
    },

    /**
     * Set the selection to the given start and end (zero-based). If
     * no end value is given the selection will extend to the end of
     * the textfield's content. This method only works if the widget
     * is already created and added to the document.
     *
     * @param start
     *            {Integer} start of the selection (zero-based)
     * @param end
     *            {Integer} end of the selection
     */
    setTextSelection : function(start, end)
    {
      this.getChildControl("textfield").setTextSelection(start,  end);
    },

    /**
     * Clears the current selection. This method only works if the
     * widget is already created and added to the document.
     */
    clearTextSelection : function()
    {
      this.getChildControl("textfield").clearTextSelection();
    },

    /**
     * Selects the whole content
     */
    selectAllText : function()
    {
      this.getChildControl("textfield").selectAllText();
    },

    /**
     * Clear any text selection, then select all text
     */
    resetAllTextSelection : function()
    {
      this.clearTextSelection();
      this.selectAllText();
    }
  }
});