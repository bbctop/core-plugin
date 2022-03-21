$(document).on('plugin.bbctop.ready',function(){
  console.log('test')
  if(!$('.split-container').length) return false
  $('.split-container').height($(window).height() - $('.split').offset().top - 1 - 20)
  Split(['#split-left', '#split-right'], {
    minSize: 300,
    onDragEnd: function(){
      $(window).trigger('resize')
    }
  })
  $('#split-left').on('scroll',function(){
    var top = $(this).scrollTop()
    var th = $(this).find('.table th')
    th.css({position: 'relative', top: top})
  })
})
function onClickRecord(handle,data,update = {split_update: '#split-right'}) {
  $.request(handle,{data:data,update:update})
}

function splitCancel() {
  $("#split-right").html('<div class="layout control-tabs oc-logo-transparent"></div>')
}
