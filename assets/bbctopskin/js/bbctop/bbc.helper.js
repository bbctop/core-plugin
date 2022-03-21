(function ($) { "use strict";
  if ($.bbc === undefined) $.bbc = {}

  $.bbc.lang = $('html').attr('lang')

  if ($.bbc.helper === undefined) $.bbc.helper = {}

  $.bbc.helper.createModal = function(opt) {
    var lang = $.bbc.lang
    opt.btn = opt.btn || {}
    if (!$.oc.langMessages[lang].popup) lang = 'zh-cn'
    if(opt.heading) {
      opt.heading = `
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">
            ${opt.heading}
          </h4>
        </div>
      `
    }else{
      opt.content = '<button type="button" class="close" data-dismiss="popup">&times;</button>' + opt.content
    }
    console.log(opt.footer)
    if(!opt.noFooter) {
      if(opt.footer) {
        opt.footer = `
          <div class="modal-footer">
          ${opt.footer}
          </div>
        `
      }else{
        var btnok = opt.btn.ok || $.oc.langMessages[lang].popup.ok
        var btncancel = opt.btn.cancel || $.oc.langMessages[lang].popup.cancel
        opt.footer = `
          <div class="modal-footer text-right">
            <button class="btn btn-default btn-cancel" data-dismiss="modal" type="button">${btncancel}</button>
            <button class="btn btn-primary btn-ok" type="button">${btnok}</button>
          </div>
        `
      }
    }else{
      opt.footer = ''
    }
    

    const tpl = `
    <div class="control-popup modal fade ${opt.class}" id="${opt.id}" tabindex="-1" aria-labelledby="${opt.id}" aria-hidden="true">
      <div class="modal-dialog modal-dialog-center ${opt.size}">
        <div class="modal-content">
          ${opt.heading}
          <div class="modal-body">
          ${opt.content}
          </div>
          ${opt.footer}
        </div>
      </div>
    </div>`
    $('body').append(tpl)
  }
  
  $.bbc.helper.createId = function(length) {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
   return result.join('');
  }

  $.bbc.helper.isChinese = function(str) {
    str = str.replace(/\s/g, '');
    if (!str || !str.match(/[\u4E00-\uFA29]/g)) {
        // console.log("Oops, Please input Chinese character.");
        return false;
    }
    // console.log('Chinese character');
    return true;
  }

})(window.jQuery);



