/*! Picturefill - Responsive Images that work today. (and mimic the proposed Picture element with span elements). Author: Scott Jehl, Filament Group, 2012 | License: MIT/GPLv2 */

(function( w ){

  // Enable strict mode
  "use strict";

  w.picturefill = function() {
    var ps = w.document.getElementsByTagName( "div" );

    // Loop the pictures
    for( var i = 0, il = ps.length; i < il; i++ ){
      if( ps[ i ].getAttribute( "data-picture" ) !== null ){

        var sources = ps[ i ].getElementsByTagName( "div" ),
          matches = [];

        // See if which sources match
        for( var j = 0, jl = sources.length; j < jl; j++ ){
          var media = sources[ j ].getAttribute( "data-media" );
          // if there's no media specified, OR w.matchMedia is supported 
          if( !media || ( w.matchMedia && w.matchMedia( media ).matches ) ){
            matches.push( sources[ j ] );
          }
        }

      // Find any existing img element in the picture element
      var picImg = ps[ i ].getElementsByTagName( "img" )[ 0 ];

      if( matches.length ){
        var matchedEl = matches.pop();
        if( !picImg ){
          picImg = w.document.createElement( "img" );
          picImg.alt = ps[ i ].getAttribute( "data-alt" );
        }

        picImg.src =  matchedEl.getAttribute( "data-src" );
        matchedEl.appendChild( picImg );
      }
      else if( picImg ){
        picImg.parentNode.removeChild( picImg );
      }
    }
    }
  };

  // Run on resize and domready (w.load as a fallback)
  if( w.addEventListener ){
    w.addEventListener( "resize", w.picturefill, false );
    w.addEventListener( "DOMContentLoaded", function(){
      w.picturefill();
      // Run once only
      w.removeEventListener( "load", w.picturefill, false );
    }, false );
    w.addEventListener( "load", w.picturefill, false );
  }
  else if( w.attachEvent ){
    w.attachEvent( "onload", w.picturefill );
  }

}( this ));


/*!
 * enquire.js v2.1.0 - Awesome Media Queries in JavaScript
 * Copyright (c) 2013 Nick Williams - http://wicky.nillia.ms/enquire.js
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */

(function(t,i,n){var e=i.matchMedia;"undefined"!=typeof module&&module.exports?module.exports=n(e):"function"==typeof define&&define.amd?define(function(){return i[t]=n(e)}):i[t]=n(e)})("enquire",this,function(t){"use strict";function i(t,i){var n,e=0,s=t.length;for(e;s>e&&(n=i(t[e],e),n!==!1);e++);}function n(t){return"[object Array]"===Object.prototype.toString.apply(t)}function e(t){return"function"==typeof t}function s(t){this.options=t,!t.deferSetup&&this.setup()}function o(i,n){this.query=i,this.isUnconditional=n,this.handlers=[],this.mql=t(i);var e=this;this.listener=function(t){e.mql=t,e.assess()},this.mql.addListener(this.listener)}function r(){if(!t)throw Error("matchMedia not present, legacy browsers require a polyfill");this.queries={},this.browserIsIncapable=!t("only all").matches}return s.prototype={setup:function(){this.options.setup&&this.options.setup(),this.initialised=!0},on:function(){!this.initialised&&this.setup(),this.options.match&&this.options.match()},off:function(){this.options.unmatch&&this.options.unmatch()},destroy:function(){this.options.destroy?this.options.destroy():this.off()},equals:function(t){return this.options===t||this.options.match===t}},o.prototype={addHandler:function(t){var i=new s(t);this.handlers.push(i),this.matches()&&i.on()},removeHandler:function(t){var n=this.handlers;i(n,function(i,e){return i.equals(t)?(i.destroy(),!n.splice(e,1)):void 0})},matches:function(){return this.mql.matches||this.isUnconditional},clear:function(){i(this.handlers,function(t){t.destroy()}),this.mql.removeListener(this.listener),this.handlers.length=0},assess:function(){var t=this.matches()?"on":"off";i(this.handlers,function(i){i[t]()})}},r.prototype={register:function(t,s,r){var h=this.queries,u=r&&this.browserIsIncapable;return h[t]||(h[t]=new o(t,u)),e(s)&&(s={match:s}),n(s)||(s=[s]),i(s,function(i){h[t].addHandler(i)}),this},unregister:function(t,i){var n=this.queries[t];return n&&(i?n.removeHandler(i):(n.clear(),delete this.queries[t])),this}},new r});

