/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2006 STZ-IDA, Germany, http://www.stz-ida.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Til Schneider (til132)

************************************************************************ */

/* ************************************************************************

#module(ui_table)

************************************************************************ */

/**
 * Shows the header of a table.
 */
qx.Class.define("qx.ui.table.pane.Header",
{
  extend : qx.ui.core.Widget,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param paneScroller {qx.ui.table.pane.Scroller} the TablePaneScroller the header belongs to.
   */
  construct : function(paneScroller)
  {
    this.base(arguments);
    this._setLayout(new qx.ui.layout.HBox());

    this._paneScroller = paneScroller;
  },






  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * Returns the TablePaneScroller this header belongs to.
     *
     * @type member
     * @return {qx.ui.table.pane.Scroller} the TablePaneScroller.
     */
    getPaneScroller : function() {
      return this._paneScroller;
    },


    /**
     * Returns the table this header belongs to.
     *
     * @type member
     * @return {qx.ui.table.Table} the table.
     */
    getTable : function() {
      return this._paneScroller.getTable();
    },


    /**
     * Event handler. Called the column order has changed.
     *
     * @return {void}
     */
    onColOrderChanged : function() {
      this._updateContent(true);
    },


    /**
     * Event handler. Called when the pane model has changed.
     */
    onPaneModelChanged : function() {
      this._updateContent(true);
    },


    /**
     * Event handler. Called when the table model meta data has changed.
     *
     * @return {void}
     */
    onTableModelMetaDataChanged : function() {
      this._updateContent();
    },


    /**
     * Sets the column width. This overrides the width from the column model.
     *
     * @param col {Integer} the column to change the width for.
     * @param width {Integer} the new width.
     * @return {void}
     */
    setColumnWidth : function(col, width)
    {
      var x = this.getPaneScroller().getTablePaneModel().getX(col);
      var children = this._getChildren();

      if (children[x] != null) {
        children[x].setWidth(width);
      }
    },


    /**
     * Sets the column the mouse is currently over.
     *
     * @param col {Integer} the model index of the column the mouse is currently over or
     *      null if the mouse is over no column.
     * @return {void}
     */
    setMouseOverColumn : function(col)
    {
      if (col != this._lastMouseOverColumn)
      {
        var paneModel = this.getPaneScroller().getTablePaneModel();
        var children = this._getChildren();

        if (this._lastMouseOverColumn != null)
        {
          var widget = children[paneModel.getX(this._lastMouseOverColumn)];

          if (widget != null) {
            widget.removeState("hovered");
          }
        }

        if (col != null) {
          children[paneModel.getX(col)].addState("hovered");
        }

        this._lastMouseOverColumn = col;
      }
    },


    /**
     * Shows the feedback shown while a column is moved by the user.
     *
     * @param col {Integer} the model index of the column to show the move feedback for.
     * @param x {Integer} the x position the left side of the feeback should have
     *      (in pixels, relative to the left side of the header).
     * @return {void}
     */
    showColumnMoveFeedback : function(col, x)
    {
      var pos = this.getContainerLocation();

      if (this._moveFeedback == null)
      {
        var xPos = this.getPaneScroller().getTablePaneModel().getX(col);
        var cellWidget = this._getChildren()[xPos];

        var tableModel = this.getTable().getTableModel();
        var columnModel = this.getTable().getTableColumnModel();

        var cellInfo =
        {
          xPos : xPos,
          col  : col,
          name : tableModel.getColumnName(col)
        };

        var cellRenderer = columnModel.getHeaderCellRenderer(col);
        var feedback = cellRenderer.createHeaderCell(cellInfo);

        var size = cellWidget.getBounds();

        // Configure the feedback
        feedback.setWidth(size.width);
        feedback.setHeight(size.height);
        feedback.setZIndex(1000000);
        feedback.setOpacity(0.8);
        feedback.setLayoutProperties({top: pos.top});

        qx.core.Init.getApplication().getRoot().add(feedback);
        this._moveFeedback = feedback;
      }

      this._moveFeedback.setLayoutProperties({left: pos.left + x});
      this._moveFeedback.show();
    },


    /**
     * Hides the feedback shown while a column is moved by the user.
     */
    hideColumnMoveFeedback : function()
    {
      if (this._moveFeedback != null)
      {
        this._moveFeedback.getLayoutParent().remove(this._moveFeedback);
        this._moveFeedback.dispose();
        this._moveFeedback = null;
      }
    },


    /**
     * Returns whether the column move feedback is currently shown.
     *
     * @type member
     * @return {var} TODOC
     */
    isShowingColumnMoveFeedback : function() {
      return this._moveFeedback != null;
    },


    /**
     * Updates the content of the header.
     *
     * @param completeUpdate {Boolean} if true a complete update is performed. On a
     *      complete update all header widgets are recreated.
     * @return {void}
     */
    _updateContent : function(completeUpdate)
    {
      var tableModel = this.getTable().getTableModel();
      var columnModel = this.getTable().getTableColumnModel();
      var paneModel = this.getPaneScroller().getTablePaneModel();

      var children = this._getChildren();
      var colCount = paneModel.getColumnCount();

      var sortedColum = tableModel.getSortColumnIndex();

      // Remove all widgets on the complete update
      if (completeUpdate) {
        this._cleanUpCells();
      }

      // Update the header
      var cellInfo = {};
      cellInfo.sortedAscending = tableModel.isSortAscending();

      for (var x=0; x<colCount; x++)
      {
        var col = paneModel.getColumnAtX(x);

        var colWidth = columnModel.getColumnWidth(col);

        // TODO: Get real cell renderer
        var cellRenderer = columnModel.getHeaderCellRenderer(col);

        cellInfo.xPos = x;
        cellInfo.col = col;
        cellInfo.name = tableModel.getColumnName(col);
        cellInfo.editable = tableModel.isColumnEditable(col);
        cellInfo.sorted = (col == sortedColum);

        // Get the cached widget
        var cachedWidget = children[x];

        // Create or update the widget
        if (cachedWidget == null)
        {
          // We have no cached widget -> create it
          cachedWidget = cellRenderer.createHeaderCell(cellInfo);

          cachedWidget.set(
          {
            width  : colWidth
          });

          this._add(cachedWidget);
        }
        else
        {
          // This widget already created before -> recycle it
          cellRenderer.updateHeaderCell(cellInfo, cachedWidget);
        }
      }
    },


    /**
     * Cleans up all header cells.
     *
     * @return {void}
     */
    _cleanUpCells : function()
    {
      var children = this._getChildren();

      for (var x=children.length-1; x>=0; x--)
      {
        var cellWidget = children[x];

        this._remove(cellWidget);
        cellWidget.dispose();
      }
    }
  },




  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function() {
    this._disposeObjects("_paneScroller");
  }
});
