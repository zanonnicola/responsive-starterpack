// Reference: http://www.paulirish.com/2009/markup-based-unobtrusive-comprehensive-dom-ready-execution
//            http://viget.com/extend/javascript-execution-patterns-for-non-web-apps

SITE = {
  init: function() {
    SITE.features.init();
  }
};


SITE.features = {
  common: {
    init: function() {

      // Common function
      // Navigation
      // Layout

      // SVG images swapping

      if (Modernizr.svg == false) {
          var imgs = document.getElementsByTagName('img');
          var dotSVG = /.*\.svg$/;
          for (var i = 0; i != imgs.length; ++i) {
              if(imgs[i].src.match(dotSVG)) {
                imgs[i].src = imgs[i].src.slice(0, -3) + "png";
            }
          }
      };
    } // END init
  }, // END common
 
  homeFunctions: {
    init: function() {

      // ... Do stuff on the page

      console.log("It works!")

    } // END init
  },

  hack: {
    init: function() {

      Modernizr.addTest("boxsizing", function() {
        return Modernizr.testAllProps("boxSizing") && (document.documentMode === undefined || document.documentMode > 7);
      });
      
      // Simple boxsizing polyfill

      if(!($("html").hasClass("boxsizing"))){
        $("*").each(function(){
            if($(this).css("display")=="block"){
                var f, a, n;
                f = $(this).outerWidth();
                a = $(this).width();
                n = a-(f-a);
                $(this).css("width", n);
            }
          });
      };
      
      Modernizr.load([
        {
          test: Modernizr.mq('only all'),
          nope: 'js/polyfills/respond.min.js'
        },
        {
            test: window.matchMedia,
            nope: "js/polyfills/matchmedia.min.js"
        }
      ]);
      if(document.documentMode) {
        document.documentElement.className+=' ie'+document.documentMode;
      }

      // background-size polyfill

      Modernizr.load({
        test: Modernizr.backgroundsize,
          nope: ['js/polyfills/backstretch.min.js', 'js/min/doSomething.min.js']
      });

      // IE related stuff...

    } // END init
  }, // END hack

  init: function() {
    var features = $('body').data('features');
    var featuresArray = [];
 
    if(features) {
      featuresArray = features.split(' ');
 
      for(var x = 0, length = featuresArray.length; x < length; x++) {
        var func = featuresArray[x];
 
        if(this[func] && typeof this[func].init === 'function') {
          this[func].init();
        }
      }
    }
  } // END init 
};

$(document).ready(SITE.init);