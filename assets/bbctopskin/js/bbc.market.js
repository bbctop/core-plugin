+function ($) { "use strict";
$(window).on('load',function(){

  $.oc.installProcess.searchSubmit = function(el) {
    var
        $el = $(el),
        $input = $el.find('.product-search-input.tt-input:first');
  
    if (!$input.data('searchReady')) {
        return;
    }
  
    $el.popup();
  
    $input.typeahead('val', '');
  }
})
}(window.jQuery);