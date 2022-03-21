+function ($) { "use strict";


$(document).on('click','[data-control="collapse"]', function(e) {
  e.preventDefault();
  var _this = $(this),
  target = _this.data('target') || _this.attr('href'),
  $target = $(target),
  is_collapsed = _this.hasClass('collapsed')
  if(!is_collapsed) {
    _this.addClass('collapsed')
    $target.addClass('collapse')
  }else{
    _this.removeClass('collapsed')
    $target.removeClass('collapse')

  }
})

}(window.jQuery)