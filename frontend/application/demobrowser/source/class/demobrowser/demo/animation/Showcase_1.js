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
     * Jonathan Rass (jonathan_rass)

************************************************************************ */

/* ************************************************************************

#use(qx.legacy.theme.ClassicRoyale)

************************************************************************ */



/**
 * qx.fx offers low level animation capabilites for DOM elements.
 */
qx.Class.define("demobrowser.demo.animation.Showcase_1",
{
  extend : demobrowser.Demo,
  include : [ qx.legacy.application.MGuiCompat ],

  members :
  {
  
  
    _toggleEnable : function()
    {
      var status = (this._groupBoxes.gbxBase.getEnabled() === false);

      for (var box in this._groupBoxes) {
        this._groupBoxes[box].setEnabled(status);
      }
    },
  
    main : function()
    {
      this.base(arguments);
      this.compat();

      /* Demo element */
      this._demoElementStyle = 'font-size:12pt;text-align:center;font-family:"Trebuchet MS","Lucida Grande",Verdana,sans-serif;color:white;left:240px;top:90px;position:absolute;width:200px;height:55px;border:2px #000000 solid;background-color:#134275;z-Index:2;';
      this._demoElement = qx.bom.Element.create(
        'div',
        {
          style     : this._demoElementStyle,
          id        : "testDiv",
          innerHTML : 'Welcome to <br><b style="color:#F3FFB3;">qooxdoo</b> animations!'
        }
      );
      
      var doc = qx.legacy.ui.core.ClientDocument.getInstance();
      
      /* UI elements: */
      var main = new qx.legacy.ui.layout.VerticalBoxLayout();
      main.setPadding(10);
      main.setWidth(140);

      this._groupBoxes = {
        gbxBase : new qx.legacy.ui.groupbox.GroupBox("Base effects"),
        gbxAttention : new qx.legacy.ui.groupbox.GroupBox("Attention effects"),
        gbxVanish : new qx.legacy.ui.groupbox.GroupBox("Vanish effects"),
        gbxAppear : new qx.legacy.ui.groupbox.GroupBox("Appear effects")
      };

      var vbxBase = new qx.legacy.ui.layout.VerticalBoxLayout();
      vbxBase.set({
        spacing : 5,
        minWidth : 110
      });

      var btnOpacity = new qx.legacy.ui.form.Button("Toggle Opacity");
      var btnDimensions = new qx.legacy.ui.form.Button("Toggle Size");
      var btnPosition = new qx.legacy.ui.form.Button("Toggle Position");
      var btnBackground = new qx.legacy.ui.form.Button("Toggle Background");

      vbxBase.add(btnOpacity, btnDimensions, btnPosition, btnBackground);
      this._groupBoxes.gbxBase.add(vbxBase);

      
      var vbxAttention = new qx.legacy.ui.layout.VerticalBoxLayout();
      vbxAttention.set({
        spacing : 5,
        minWidth : 110
      });

      var btnShake = new qx.legacy.ui.form.Button("Shake");
      var btnColorFlow = new qx.legacy.ui.form.Button("ColorFlow");
      var btnPulsate = new qx.legacy.ui.form.Button("Pulsate");
      vbxAttention.add(btnShake, btnColorFlow, btnPulsate);
      this._groupBoxes.gbxAttention.add(vbxAttention);


      var vbxVanish = new qx.legacy.ui.layout.VerticalBoxLayout();
      vbxVanish.set({
        spacing : 5,
        minWidth : 110
      });

      var btnPuff = new qx.legacy.ui.form.Button("Puff");
      var btnDropOut = new qx.legacy.ui.form.Button("DropOut");
      var btnShrink = new qx.legacy.ui.form.Button("Shrink");
      var btnSwitchOff = new qx.legacy.ui.form.Button("SwitchOff");
      vbxVanish.add(btnPuff, btnDropOut, btnShrink, btnSwitchOff);
      this._groupBoxes.gbxVanish.add(vbxVanish);

      var vbxAppear = new qx.legacy.ui.layout.VerticalBoxLayout();
      vbxAppear.set({
        spacing : 5,
        minWidth : 110
      });

      var btnGrow = new qx.legacy.ui.form.Button("Grow");
      var btnFadeIn = new qx.legacy.ui.form.Button("FadeIn");
      vbxAppear.add(btnGrow, btnFadeIn);
      this._groupBoxes.gbxAppear.add(vbxAppear);

      for(var box in this._groupBoxes)
      {
        this._groupBoxes[box].setDimension("auto", "auto");
        main.add(this._groupBoxes[box]);
      }
      
      doc.add(main)
      document.body.appendChild(this._demoElement);
      
      
      /* Effects: */
      
      var fadeToggle = new qx.fx.effect.core.Fade(this._demoElement);

      fadeToggle.addListener("setup", function(){
        this._toggleEnable();
      }, this);

      fadeToggle.addListener("finish", function(){
        this._toggleEnable();
      }, this);

      btnOpacity.addListener("execute", function(){
        var status = qx.bom.element.Style.get(this._demoElement, "display");
        fadeToggle.set({
          from : (status == "block") ? 1 : 0,
          to   : (status == "block") ? 0 : 1
        });
        fadeToggle.start();
      }, this);
      
      
      
      var dimensionsToggle = new qx.fx.effect.core.Scale(this._demoElement);

      dimensionsToggle.addListener("setup", function(){
        this._toggleEnable();
      }, this);

      dimensionsToggle.addListener("finish", function(){
        this._toggleEnable();
      }, this);

      btnDimensions.addListener("execute", function(){
        var status = qx.bom.element.Dimension.getWidth(this._demoElement);
        dimensionsToggle.setScaleTo((status > 200) ? 80 : 120);
        dimensionsToggle.start();
      }, this);
     
      
      
      var positionToggle = new qx.fx.effect.core.Move(this._demoElement);

      positionToggle.addListener("setup", function(){
        this._toggleEnable();
      }, this);

      positionToggle.addListener("finish", function(){
        this._toggleEnable();
      }, this);

      btnPosition.addListener("execute", function(){
        var status = qx.bom.element.Location.getLeft(this._demoElement);
        positionToggle.set({
          x          : (status < 300) ? 300 : -300,
          y          : (status < 300) ? 100 : -100,
          transition : "spring"
        });
        positionToggle.start();
      }, this);
     
      
      
      var backgroundToggle = new qx.fx.effect.core.Highlight(this._demoElement);

      backgroundToggle.addListener("setup", function(){
        this._toggleEnable();
      }, this);

      backgroundToggle.addListener("finish", function(){
        this._toggleEnable();
      }, this);

      btnBackground.addListener("execute", function(){
        var status = qx.bom.element.Style.get(this._demoElement, "backgroundColor");
        backgroundToggle.set({
          startColor        : (status == "rgb(19, 66, 117)") ? "#134275" : "#7CFC00",
          endColor          : (status == "rgb(19, 66, 117)") ? "#7CFC00" : "#134275",
          restoreBackground : false
        });
        backgroundToggle.start();
      }, this);
     
      
      
      var shake = new qx.fx.effect.combination.Shake(this._demoElement);

      shake.addListener("setup", function(){
        this._toggleEnable();
      }, this);

      shake.addListener("finish", function(){
        this._toggleEnable();
      }, this);

      btnShake.addListener("execute", function(){
        shake.start();
      });
     
      
      
      var colorFlow = new qx.fx.effect.combination.ColorFlow(this._demoElement);

      colorFlow.addListener("setup", function(){
        this._toggleEnable();
      }, this);

      colorFlow.addListener("finish", function(){
        this._toggleEnable();
      }, this);

      btnColorFlow.addListener("execute", function(){
        var status = qx.bom.element.Style.get(this._demoElement, "backgroundColor");
        colorFlow.set({
          startColor : (status == "rgb(19, 66, 117)") ? "#134275" : "#7CFC00",
          endColor   : (status == "rgb(19, 66, 117)") ? "#7CFC00" : "#134275"
        });
        colorFlow.start();
      }, this);
     
      
      
      var pulsate = new qx.fx.effect.combination.Pulsate(this._demoElement);

      pulsate.addListener("setup", function(){
        this._toggleEnable();
      }, this);

      pulsate.addListener("finish", function(){
        this._toggleEnable();
      }, this);

      btnPulsate.addListener("execute", function(){
        pulsate.start();
      });
     
      
      
      var puff = new qx.fx.effect.combination.Puff(this._demoElement);
      puff.setModifyDisplay(false);

      puff.addListener("setup", function(){
        this._toggleEnable();
      }, this);

      puff.addListener("finish", function(){
        this._toggleEnable();
      }, this);

      btnPuff.addListener("execute", function(){
        puff.start();
      });
     
      
      
      var dropOut = new qx.fx.effect.combination.DropOut(this._demoElement);
      dropOut.setModifyDisplay(false);

      dropOut.addListener("setup", function(){
        this._toggleEnable();
      }, this);

      dropOut.addListener("finish", function(){
        this._toggleEnable();
      }, this);

      btnDropOut.addListener("execute", function(){
        dropOut.start();
      });
     
      
      
      var shrink = new qx.fx.effect.combination.Shrink(this._demoElement);
      shrink.setModifyDisplay(false);

      shrink.addListener("setup", function(){
        this._toggleEnable();
      }, this);

      shrink.addListener("finish", function(){
        this._toggleEnable();
      }, this);

      btnShrink.addListener("execute", function(){
        shrink.start();
      });
     
      
      
      var switchoff = new qx.fx.effect.combination.SwitchOff(this._demoElement);
      switchoff.setModifyDisplay(false);

      switchoff.addListener("setup", function(){
        this._toggleEnable();
      }, this);

      switchoff.addListener("finish", function(){
        this._toggleEnable();
      }, this);

      btnSwitchOff.addListener("execute", function(){
        switchoff.start();
      });
     
      
      
      var grow = new qx.fx.effect.combination.Grow(this._demoElement);

      grow.addListener("setup", function(){
        this._toggleEnable();
      }, this);

      grow.addListener("finish", function(){
        this._toggleEnable();
      }, this);

      btnGrow.addListener("execute", function(){
        grow.start();
      });
     
      
      
      var fade = new qx.fx.effect.core.Fade(this._demoElement);
      fade.set({
        from : 0,
        to : 1,
        modifyDisplay : false
      });

      fade.addListener("setup", function(){
        this._toggleEnable();
      }, this);

      fade.addListener("finish", function(){
        this._toggleEnable();
      }, this);

      btnFadeIn.addListener("execute", function(){
        fade.start();
      });

    }

  }

});
