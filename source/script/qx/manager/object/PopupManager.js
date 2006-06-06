/* ************************************************************************

   qooxdoo - the new era of web development

   Copyright:
     2004-2006 by Schlund + Partner AG, Germany
     All rights reserved

   License:
     LGPL 2.1: http://creativecommons.org/licenses/LGPL/2.1/

   Internet:
     * http://qooxdoo.org

   Authors:
     * Sebastian Werner (wpbasti)
       <sw at schlund dot de>
     * Andreas Ecker (ecker)
       <ae at schlund dot de>

************************************************************************ */

/* ************************************************************************

#package(popup)

************************************************************************ */

/*!
  This singleton is used to manager multiple instances of popups and their state.
*/
qx.OO.defineClass("qx.manager.object.PopupManager", qx.manager.object.ObjectManager, 
function() {
  qx.manager.object.ObjectManager.call(this);
});



/*
---------------------------------------------------------------------------
  METHODS
---------------------------------------------------------------------------
*/

qx.Proto.update = function(vTarget)
{
  // be sure that target is correctly set (needed for contains() later)
  if (!(vTarget instanceof qx.ui.core.Widget)) {
    vTarget = null;
  };

  var vPopup, vHashCode;
  var vAll = this.getAll();

  for (vHashCode in vAll)
  {
    vPopup = vAll[vHashCode];

    if(!vPopup.getAutoHide() || vTarget == vPopup || vPopup.contains(vTarget)) {
      continue;
    };

    vPopup.hide();
  };
};






/*
---------------------------------------------------------------------------
  SINGLETON INSTANCE
---------------------------------------------------------------------------
*/

qx.manager.object.PopupManager = new qx.manager.object.PopupManager;
