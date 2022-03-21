(function ($) { "use strict";
  // extend october preset

  function getDropdown(result) {
    var li = ''
    result.forEach(pinyin => {
      li+=`<li><a href="#">${pinyin.toLowerCase()}</a></li>`
    });
    return li
  }

  function setInputPreset(result, input, inputPreset) {
    var li = getDropdown(result), dropdown = input.next().find('.dropdown-menu')
    console.log(li)
    dropdown.html(li)
    inputPreset.val(result[0].toLowerCase())
    if(result.length > 1) dropdown.parent().removeClass('hidden')
    else dropdown.parent().addClass('hidden')
  }
  
  // extend october presetengine
  var presetEngine = $.oc.presetEngine
  $.oc.presetEngine = {}
  $.oc.presetEngine.formatValue = function(options, srcValue) {

    var value = srcValue,
    inputPreset = $(`[type=text][data-input-preset='${options.inputPreset}']`),
    input = inputPreset
    
    // check if is multilanguage
    if(input.parent().data('control') == 'multilingual') input = input.parent()
    
    var title = input.prev().text(),
    $pinyinSelect = input.next()

    if($.bbc.helper.isChinese(srcValue)) {
      var result = pinyinUtil.getPinyin(srcValue,'',false,true),
      value = result[0],
      li = getDropdown(result)
      
      const checkbox_id = $.bbc.helper.createId(8)
      var html = `
        <div class="bbc-pinyin-select dropdown  pull-right">  
          <a href="javascript:;" data-toggle="dropdown">+更多${title.trim()}选择</a>
          <ul class="dropdown-menu dropdown-menu-right">${li}</ul>
        </div>
        <div class="checkbox custom-checkbox"><input type="checkbox" class="isFirstletter pinyin-checkbox" id="pinyin-${checkbox_id}"><label for="pinyin-${checkbox_id}" class="storm-icon-pseudo">拼音首字母</label></div>
        <div class="checkbox custom-checkbox"><input type="checkbox" class="isDashed pinyin-checkbox" id="pinyin-c-${checkbox_id}"><label for="pinyin-c-${checkbox_id}" class="storm-icon-pseudo">每个拼音用“-”分开</label></div>
      `
      if(!$pinyinSelect.length || !$pinyinSelect.hasClass('bbc-pinyin-select-wrap')) {
        
        input.after(`
          <div class="bbc-pinyin-select-wrap">
            ${html}
          </div>
        `)
        $pinyinSelect = input.next()
      }

      if($pinyinSelect.hasClass('bbc-pinyin-select-wrap')){
        $pinyinSelect.html(html)
        if(result.length > 1) $pinyinSelect.children('.bbc-pinyin-select').removeClass('hidden')
        else $pinyinSelect.children('.bbc-pinyin-select').addClass('hidden')
      }

      $pinyinSelect.find('.dropdown-menu').on('click', 'a', function(){
        inputPreset.val($(this).text())
      })

      $pinyinSelect.find('.isFirstletter').on('change', function(){
        if($(this).prop('checked')) {
          $pinyinSelect.find('.isDashed').prop('checked',false)
          var new_result = pinyinUtil.getFirstLetter(srcValue,true)
          setInputPreset(new_result,input,inputPreset)
        }else{
          setInputPreset(result,input,inputPreset)
        }
      })

      $pinyinSelect.find('.isDashed').on('change', function(){
        if($(this).prop('checked')) {
          $pinyinSelect.find('.isFirstletter').prop('checked',false)
          var new_result = pinyinUtil.getPinyin(srcValue,'-',false,true)
          setInputPreset(new_result,input,inputPreset)
        }else{
          setInputPreset(result,input,inputPreset)
        }
      })
      console.log(options)
    }else{
      if($pinyinSelect.hasClass('bbc-pinyin-select-wrap')) $pinyinSelect.html('')
    }
    value = presetEngine.formatValue(options, value)
    return value
  }
  
  function htmlencode (rawStr) {
    return rawStr.replace(/[\u00A0-\u9999<>\&]/g, function(i) {
      return '&#'+i.charCodeAt(0)+';';
    });
  }

  $(function(){
    $('.preload').addClass('loaded');
    var clipboard = new ClipboardJS('[data-clipboard-target]');
    clipboard.on('success', function(e) {
      var msg = $(e.trigger).data('msg') || '拷贝成功！'
      $.oc.flashMsg({class:'success',text:msg})
    });
  })

})(window.jQuery);