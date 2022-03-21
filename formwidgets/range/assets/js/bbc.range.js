+function ($) { "use strict";

function bbc_range_generate_grid(range,grid) {
  var gw = 100/range, g = Math.ceil(range/grid), result = '', gc = Number(range % grid)
  console.log(gc)
  for (var i = 0; i<g; i++) {
    if(gc != 0 && i == g - 1) {
      result += '<i style="width:'+gw * gc+'%"></i>'
    }else{
      result += '<i style="width:'+gw * grid+'%"></i>'
    }
  }
  return result+'<div style="clear: both"></div>'
}

$(document).on('render', function(){
  $('[data-control="range"]').not('.init-bbc-range').each(function() {
    var _this = $(this),
		max = _this.attr('max'),
		min = _this.attr('min'),
    grid = _this.attr('grid'),
    val = _this.val(),
    wrap = $('<div class="bbc-range-wrapper"><div class="bbc-range-track"></div></div>'),
    rangeUi = $('<div class="bbc-range-ui"><div class="bbc-range-dot"></div></div>')
    if(grid) {
      var range = max-min
      wrap.append('<div class="bbc-range-grid" data-max="'+max+'" data-min="'+min+'">'+bbc_range_generate_grid(range,grid)+'</div>')
    }
    _this.wrap(wrap)
    _this.addClass('init-bbc-range')
		_this.before(rangeUi);
    
		rangeUi.css("width", (_this.val()-min)/(max-min)*100+'%').children().attr('data-value',val);
		_this.on('mousemove touchmove change',function() {
      var val = _this.val()
			rangeUi.css("width",(_this.val()-min)/(max-min)*100+'%').children().attr('data-value',val);
		})
	})
})

}(window.jQuery)