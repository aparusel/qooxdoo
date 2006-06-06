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

#package(core)
#require(qx.OO)

************************************************************************ */

qx.OO.defineClass("qx.constant.Core",
{
  // Characters
  EMPTY : "",
  SPACE : " ",
  SLASH : "/",
  DOT : ".",
  ZERO : "0",
  QUOTE : "\"",
  NEWLINE : "\n",
  SINGLEQUOTE : "'",
  STAR : "*",
  PLUS : "+",
  MINUS : "-",
  COMMA : ",",
  DASH : "-",
  UNDERLINE : "_",
  SEMICOLON : ";",
  COLON : ":",
  EQUAL : "=",
  AMPERSAND : "&",
  QUESTIONMARK : "?",
  HASH : "#",
  SMALLER : "<",
  BIGGER : ">",

  // Units
  PERCENT : "%",
  PIXEL : "px",
  MILLISECONDS : "ms",

  // Values
  FLEX : "1*",
  ZEROPIXEL : "0px",
  HUNDREDPERCENT : "100%",

  // Strings
  YES : "yes",
  NO : "no",
  ON : "on",
  OFF : "off",
  SET : "set",
  GET : "get",
  DEFAULT : "default",
  AUTO : "auto",
  NONE : "none",
  DISABLED : "disabled",
  HIDDEN : "hidden"
});
