(function ($) {
  if ($.bbc === undefined) $.bbc = {}

  $.bbc.lang = $('html').attr('lang')

  if ($.bbc.helper === undefined) $.bbc.helper = {}

  $.bbc.helper.createModal = function(opt) {
    var lang = $.bbc.lang
    opt.btn = opt.btn || {}

    if (!$.oc.langMessages[lang].popup) lang = 'zh-cn'

    if (!$.oc.langMessages['zh-cn'].popup) {
      $.oc.langMessages['zh-cn'].popup = {
        ok: '确认',
        cancel: '取消'
      }
    }

    if(opt.heading) {
      opt.heading = `
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">
            ${opt.heading}
          </h4>
        </div>
      `;
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
        `;
      }else{
        var btnok = opt.btn.ok || $.oc.langMessages[lang].popup.ok
        var btncancel = opt.btn.cancel || $.oc.langMessages[lang].popup.cancel
        opt.footer = `
          <div class="modal-footer text-right">
            <button class="btn btn-default btn-cancel" data-dismiss="modal" type="button">${btncancel}</button>
            <button class="btn btn-primary btn-ok" type="button">${btnok}</button>
          </div>
        `;
      }
    }else{
      opt.footer = '';
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
    </div>`;
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

  if($.oc.fieldRepeater) $.oc.fieldRepeater.DEFAULTS.removeConfirm = '你确定吗?'

  const Tab = $.fn.ocTab.Constructor

  Tab.prototype.init = function () {
    var self = this;
    $('> li', this.$tabsContainer).each(function(index) {
        var tabName = self.$el.attr('id')+'-'+pinyinUtil.getPinyin($(this).text().trim(),'-',false,true)[0]
        $(this).find('a').attr('href','#'+tabName)
        self.initTab(this);
    });

    this.$el.on('close.oc.tab', function(ev, data){
        ev.preventDefault();
        var force = (data !== undefined && data.force !== undefined) ? data.force : false;
        self.closeTab($(ev.target).closest('ul.nav-tabs > li, div.tab-content > div'), force);
    });

    this.$el.on('mousedown', "li[data-tab-id]", function (ev) {
        if (ev.key === '2') {
            $(ev.target).trigger('close.oc.tab');
        }
    });

    this.$el.on('toggleCollapse.oc.tab', function(ev, data){
        ev.preventDefault();
        $(ev.target).closest('div.tab-content > div').toggleClass('collapsed');
    });

    this.$el.on('modified.oc.tab', function(ev){
        ev.preventDefault();
        self.modifyTab($(ev.target).closest('ul.nav-tabs > li, div.tab-content > div'));
    });

    this.$el.on('unmodified.oc.tab', function(ev){
        ev.preventDefault();
        self.unmodifyTab($(ev.target).closest('ul.nav-tabs > li, div.tab-content > div'));
    });

    this.$tabsContainer.on('shown.bs.tab', 'li', function(){
        $(window).trigger('oc.updateUi');

        var tabUrl = $('> a', this).data('tabUrl');

        if (!tabUrl && self.options.linkable) {
            tabUrl = $('> a', this).attr('href');
        }

        if (tabUrl) {
            window.history.replaceState({}, 'Tab link reference', tabUrl);
        }
    })

    if (this.options.slidable) {
        this.$pagesContainer.touchwipe({
            wipeRight: function(){ self.prev(); },
            wipeLeft: function(){ self.next(); },
            preventDefaultEvents: false,
            min_move_x: 60
        });
    }

    this.$tabsContainer.toolbar({
        scrollClassContainer: this.$el
    });

    this.updateClasses();

    if (location.hash && this.options.linkable) {
        $('li > a[href="' + location.hash + '"]', this.$tabsContainer).tab('show');
    }
  }

  $.fn.ocTab = function (option) {
    var args = arguments;

    return this.each(function () {
        var $this = $(this);
        var data  = $this.data('oc.tab');
        var options = $.extend({}, Tab.DEFAULTS, $this.data(), typeof option == 'object' && option);

        if (!data) {
            $this.data('oc.tab', (data = new Tab(this, options)));
        }
        if (typeof option == 'string') {
            var methodArgs = [];
            for (var i=1; i<args.length; i++) {
                methodArgs.push(args[i]);
            }

            data[option].apply(data, methodArgs);
        }
    })
  }
  

})(window.jQuery);



