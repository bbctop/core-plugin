var AssetManager = function() {

  var o = {

      load: function(collection, callback) {
          var jsList = (collection.js) ? collection.js : [],
              cssList = (collection.css) ? collection.css : [],
              imgList = (collection.img) ? collection.img : []

          jsList = $.grep(jsList, function(item){
              return $('head script[src="'+item+'"]').length == 0
          })

          cssList = $.grep(cssList, function(item){
              return $('head link[href="'+item+'"]').length == 0
          })

          var cssCounter = 0,
              jsLoaded = false,
              imgLoaded = false

          if (jsList.length === 0 && cssList.length === 0 && imgList.length === 0) {
              callback && callback()
              return
          }

          o.loadJavaScript(jsList, function(){
              jsLoaded = true
              checkLoaded()
          })

          $.each(cssList, function(index, source){
              o.loadStyleSheet(source, function(){
                  cssCounter++
                  checkLoaded()
              })
          })

          o.loadImage(imgList, function(){
              imgLoaded = true
              checkLoaded()
          })

          function checkLoaded() {
              if (!imgLoaded)
                  return false

              if (!jsLoaded)
                  return false

              if (cssCounter < cssList.length)
                  return false

              callback && callback()
          }
      },

      /*
       * Loads StyleSheet files
       */
      loadStyleSheet: function(source, callback) {
          var cssElement = document.createElement('link')

          cssElement.setAttribute('rel', 'stylesheet')
          cssElement.setAttribute('type', 'text/css')
          cssElement.setAttribute('href', source)
          cssElement.addEventListener('load', callback, false)

          if (typeof cssElement != 'undefined') {
              document.getElementsByTagName('head')[0].appendChild(cssElement)
          }

          return cssElement
      },

      /*
       * Loads JavaScript files in sequence
       */
      loadJavaScript: function(sources, callback) {
          if (sources.length <= 0)
              return callback()
          console.log(source)

          var source = sources.shift(),
              jsElement = document.createElement('script');

          jsElement.setAttribute('type', 'text/javascript')
          jsElement.setAttribute('src', source)
          jsElement.addEventListener('load', function() {
              o.loadJavaScript(sources, callback)
          }, false)

          if (typeof jsElement != 'undefined') {
              document.getElementsByTagName('head')[0].appendChild(jsElement)
          }
      },

      /*
       * Loads Image files
       */
      loadImage: function(sources, callback) {
          if (sources.length <= 0)
              return callback()

          var loaded = 0
          $.each(sources, function(index, source){
              var img = new Image()
              img.onload = function() {
                  if (++loaded == sources.length && callback)
                      callback()
              }
              img.src = source
          })
      }

  };

  return o;
};

var assetManager = new AssetManager();