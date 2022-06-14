+function ($) { "use strict";

function initNestedForm () {
  // $('.fancy-layout .remove-tabless .form-tabless-fields').removeClass('form-tabless-fields')
  $('.bbc-nestedform-collapse').each(function(){
    const $this = $(this)
    if($this.hasClass('bbc-nestedform-loaded')) return false;
    console.log('loaded collapse')
    $this.addClass('bbc-nestedform-loaded')
    console.log($this)
    var $label = $this.children('label'), 
        id = $.bbc.helper.createId(6),
        $nestedform = $this.children('.nested-form')
    $this.addClass('bbc-group bbc-group-collapse')
    
    var label = $label.addClass('hidden').text()
    $label.after(`
      <div class="bbc-group-header d-flex align-items-center">
        <h3 class="bbc-group-title">
          <a data-control="collapse" href="#nestedform-${id}">
            <i class="icon-angle-down"></i>
            ${label}
          </a>
        </h3>
      </div>
    `)
    $nestedform.find('.form-tabless-fields').removeClass('form-tabless-fields').addClass('bbc-group-body clearfix')
    $nestedform.addClass('bbc-group-panel').attr('id',`nestedform-${id}`)
  })
    
}

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

$(document).on('render',function(){
  initNestedForm()
})
}(window.jQuery)