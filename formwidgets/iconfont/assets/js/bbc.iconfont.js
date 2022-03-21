+(function($){
  var Base = $.oc.foundation.base,
      BaseProto = Base.prototype
  
  var Iconfont = function (element,option) {
    this.$el = $(element)
    this.id = this.$el.attr('id')
    this.popup_id = `${this.id}-popup`
    this.$popup = $(`#${this.id}-popup`)
    this.$el.next().attr('data-target','#'+this.popup_id)
    this.data = this.$el.data()
    this.error = []
    Base.call(this)
    this.init()
  }

  Iconfont.prototype = Object.create(BaseProto)
  Iconfont.prototype.constructor = Iconfont

  Iconfont.prototype.init = function () {
    this.createModal()
    this.initEvent()
  }

  Iconfont.prototype.createModal = function (e) {
    if(!$(this.popup_id).length) {
      this.$iconlist = $(`<div class="control-tabs primary-tabs layout has-tabs iconfont--tab">
        <div class="layout-row min-size">
          <ul class="nav nav-tabs"></ul>
        </div>
        <div class="tab-content layout-row">
        </div>
      </div>`)
      $.bbc.helper.createModal({
        id: this.popup_id,
        class: 'popup-iconfont',
        heading: '请选择图标',
        noFooter: true,
        content: `
        <form>
          <div class="popup-iconfont--list">
            <div class="loading-indicator-container">
              <div class="loading-indicator indicator-center">
                <span></span>
              </div>
            </div>
          </div>
        </form>`
      })
      this.$popup = $(`#${this.id}-popup`)
      this.getIcon()
    }
  }

  Iconfont.prototype.getIcon = function () {
    const _this = this
    let error = 0, success = 0, count = 0
    for (let k in this.data.iconPack) {
      const iconpack = this.data.iconPack[k]
      count++
      $.get(iconpack.css, function(e,status,xhr) {
        if(xhr.status == 200) {
          const classname = e.match(/.?[a-zA-Z-]+[_a-zA-Z0-9-]*(:before)/g)
          const iconClass = JSON.stringify(classname).replace(/\./g,'').replace(/:before/g,'')
          iconpack.icons = JSON.parse(iconClass)
          _this.appendIconPack(k,iconpack)
          success++
        }else{
          error++
        }
        if(success + error == count) {
          _this.$popup.find('.popup-iconfont--list').html(_this.$iconlist)
          _this.$popup.find('.nav-tabs>li:first-child a').tab('show')
        }
      })
    }
  }



  Iconfont.prototype.appendIconPack = function (k,iconpack) {
    this.$iconlist.find('.nav-tabs').append(`
      <li>
        <a href="#${this.id}-tab-${k}" data-toggle="tab" title="${iconpack.label}">
          <span class="title"><span>${iconpack.label}</span></span>
        </a>
      </li>
    `)
    let iconhtml = ''
    for (let i = 0, icon; icon = iconpack.icons[i]; i++ ) {
      iconhtml += `<li><a href="javascript:;" data-icon="${k} ${icon}"><i class="iconfont--icon ${k} ${icon}"></i></a></li>`
    }
    this.$iconlist.find('.tab-content').append(`
      <div class="tab-pane" id="${this.id}-tab-${k}">
        <ul class="iconfont--list">
          ${iconhtml}
        </ul>
      </div>
    `)
  }

  Iconfont.prototype.initEvent = function () {
    const _this = this
    this.$popup.on('click','[data-icon]',function(){
      const icon = $(this).data('icon')
      _this.$el.val(icon)
      _this.$el.prev().html(`<i class="${icon}"></i>`)
      _this.$popup.modal('hide')
    })
    _this.$el.on('input', function(){
      const icon = _this.$el.val()
      _this.$el.prev().html(`<i class="${icon}"></i>`)
    })
  }

  var old = $.fn.Iconfont

  $.fn.Iconfont = function (option) {
      var args = Array.prototype.slice.call(arguments, 1), result
      this.each(function () {
          var $this = $(this)
          var data = $this.data('bbc.iconfont')
          var options = $.extend({}, Iconfont.DEFAULTS, $this.data(), typeof option == 'object' && option)
          if (!data) $this.data('bbc.iconfont', (data = new Iconfont(this, options)))
          if (typeof option == 'string') result = data[option].apply(data, args)
          if (typeof result != 'undefined') return false
      })

      return result ? result : this
  }

  $.fn.Iconfont.Constructor = Iconfont

  // Iconfont NO CONFLICT
  // =================

  $.fn.Iconfont.noConflict = function () {
      $.fn.Iconfont = old
      return this
  }

  // Iconfont DATA-API
  // ===============

  $(document).render(function () {
      $('[data-control="iconfont"]').Iconfont();
  })
})(window.jQuery)