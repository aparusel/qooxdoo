/* ************************************************************************

   qooxdoo - the new era of web development

   Copyright:
     2004-2006 by 1&1 Internet AG, Germany
     http://www.1und1.de | http://www.1and1.com
     All rights reserved

   License:
     LGPL 2.1: http://creativecommons.org/licenses/LGPL/2.1/

   Internet:
     * http://qooxdoo.org

   Authors:
     * Sebastian Werner (wpbasti)
       <sebastian dot werner at 1und1 dot de>
     * Andreas Ecker (ecker)
       <andreas dot ecker at 1und1 dot de>

************************************************************************ */

/* ************************************************************************

#module(image)
#use(qx.io.image.ImagePreloader)

************************************************************************ */

qx.OO.defineClass("qx.io.image.ImagePreloaderSystem", qx.core.Target,
function(vPreloadList, vCallBack, vCallBackScope)
{
  qx.core.Target.call(this);

  this._list = vPreloadList;

  // Create timer
  this._timer = new qx.client.Timer(this.getSetting("timeout"));
  this._timer.addEventListener("interval", this._oninterval, this);

  // If we use the compact syntax, automatically add an event listeners and start the loading process
  if (vCallBack)
  {
    this.addEventListener(qx.constant.Event.COMPLETED, vCallBack, vCallBackScope || null);
    this.start();
  }
});

qx.Proto._stopped = false;



/*
---------------------------------------------------------------------------
  DEFAULT SETTINGS
---------------------------------------------------------------------------
*/

qx.Settings.setDefaultSetting("timeout", 3000);





/*
---------------------------------------------------------------------------
  USER ACCESS
---------------------------------------------------------------------------
*/

qx.Proto.start = function()
{
  if (qx.lang.Object.isEmpty(this._list))
  {
    this.createDispatchEvent(qx.constant.Event.COMPLETED);
    return;
  }

  for (var vSource in this._list)
  {
    var vPreloader = qx.manager.object.ImagePreloaderManager.create(qx.manager.object.ImageManager.buildUri(vSource));

    if (vPreloader.isErroneous() || vPreloader.isLoaded())
    {
      delete this._list[vSource];
    }
    else
    {
      vPreloader._origSource = vSource;

      vPreloader.addEventListener(qx.constant.Event.LOAD, this._onload, this);
      vPreloader.addEventListener(qx.constant.Event.ERROR, this._onerror, this);
    }
  }

  // Initial check
  this._check();
}





/*
---------------------------------------------------------------------------
  EVENT LISTENERS
---------------------------------------------------------------------------
*/

qx.Proto._onload = function(e)
{
  delete this._list[e.getTarget()._origSource];
  this._check();
}

qx.Proto._onerror = function(e)
{
  delete this._list[e.getTarget()._origSource];
  this._check();
}

qx.Proto._oninterval = function(e)
{
  this.debug("The following images couldn't preloaded: " + qx.lang.Object.getKeysAsString(this._list));
  this.debug("Canceling...");

  this._stopped = true;
  this._timer.stop();

  this.createDispatchEvent(qx.constant.Event.COMPLETED);
}






/*
---------------------------------------------------------------------------
  CHECK
---------------------------------------------------------------------------
*/

qx.Proto._check = function()
{
  if (this._stopped) {
    return;
  }

  // this.debug("Check: " + qx.lang.Object.getKeysAsString(this._list));

  if (qx.lang.Object.isEmpty(this._list))
  {
    this._timer.stop();
    this.createDispatchEvent(qx.constant.Event.COMPLETED);
  }
  else
  {
    // Restart timer for timeout
    this._timer.restart();
  }
}






/*
---------------------------------------------------------------------------
  DISPOSER
---------------------------------------------------------------------------
*/

qx.Proto.dispose = function()
{
  if (this.getDisposed()) {
    return true;
  }

  this._list = null;

  if (this._timer)
  {
    this._timer.dispose();
    this._timer = null;
  }

  return qx.core.Target.prototype.dispose.call(this);
}
