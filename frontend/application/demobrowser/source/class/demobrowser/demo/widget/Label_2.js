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

qx.Class.define("demobrowser.demo.widget.Label_2",
{
  extend : qx.application.Standalone,
  include : [demobrowser.MDemoApplication],

  members :
  {
    main: function()
    {
      this.base(arguments);

      // Call demo mixin init
      this.initDemo();

      var doc = new qx.ui.root.Application(document);

      var decor = new qx.ui.decoration.Basic(1, "solid", "black");

      var vbox = new qx.ui.layout.VBox;
      vbox.setSpacing(20);

      var container = new qx.ui.core.Widget().set({
        layout: vbox,
        decorator: decor,
        width: 300
      });
      doc.add(container, 20, 20);

      var label1 = new qx.ui.basic.Label().set({
        decorator: decor,
        rich : true,
        content: "Screenshots #1 and #2 show that the label can be reduced in size to 102 pixels horizontally or to 55 pixels vertically, so long as there is enough space in the other direction. Screenshot #3 shows what happens when the label is squeezed down to its minimum height and minimum width."
      });
      vbox.add(label1);

      var label2 = new qx.ui.basic.Label().set({
        decorator: decor,
        rich : true,
        content: "We would like QLabel to tell the layout that screenshot #1 and screenshot #2 are acceptable but that screenshot #3 is not. The sizeHint() and minimumSizeHint() functions cannot do this, so Qt provides a complementary mechanism: height-for-width."
      });
      vbox.add(label2);

      var label3 = new qx.ui.basic.Label().set({
        decorator: decor,
        rich : true,
        content: "Every widget's QSizePolicy contains a boolean height-for-width flag that indicates whether or not the widget is able to trade width for height and height for width. The layout will call the virtual function QWidget::heightForWidth() as necessary to determine the desired height for a height-for-width widget with a given width."
      });

      vbox.add(label3);
    }
  }
});
