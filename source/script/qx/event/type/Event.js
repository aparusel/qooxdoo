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

#package(eventcore)

************************************************************************ */

/*!
  The qooxdoo core event object. Each event object for qx.core.Targets should extend this class.
*/
qx.OO.defineClass("qx.event.type.Event", qx.core.Object, 
function(vType)
{
  qx.core.Object.call(this, false);

  this.setType(vType);
});

qx.OO.addFastProperty({ name : "type", setOnlyOnce : true });

qx.OO.addFastProperty({ name : "originalTarget", setOnlyOnce : true });
qx.OO.addFastProperty({ name : "target", setOnlyOnce : true });
qx.OO.addFastProperty({ name : "relatedTarget", setOnlyOnce : true });
qx.OO.addFastProperty({ name : "currentTarget" });

qx.OO.addFastProperty({ name : "bubbles", defaultValue : false, noCompute : true });
qx.OO.addFastProperty({ name : "propagationStopped", defaultValue : true, noCompute : true });
qx.OO.addFastProperty({ name : "defaultPrevented", defaultValue : false, noCompute : true });




/*
---------------------------------------------------------------------------
  SHORTCUTS
---------------------------------------------------------------------------
*/

qx.Proto.preventDefault = function() {
  this.setDefaultPrevented(true);
};

qx.Proto.stopPropagation = function() {
  this.setPropagationStopped(true);
};




/*
---------------------------------------------------------------------------
  DISPOSER
---------------------------------------------------------------------------
*/

qx.Proto.dispose = function()
{
  if(this.getDisposed()) {
    return;
  };

  this._valueOriginalTarget = null;
  this._valueTarget = null;
  this._valueRelatedTarget = null;
  this._valueCurrentTarget = null;

  return qx.core.Object.prototype.dispose.call(this);
};
