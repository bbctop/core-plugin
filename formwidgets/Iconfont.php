<?php

namespace Bbctop\Core\FormWidgets;

use Html;
use Backend\Classes\FormWidgetBase;

/**
 * 图标组件
 * 用法:
 * iconfont:
 *    type: iconfont
 *    label: 图标选择
 *    pack: 
 *        iconsmind:
 *            label: Iconsmind图标
 *            css: /themes/o8101/assets/css/iconsmind.css
 *        stack:
 *            label: Stack图标
 *            css: /themes/o8101/assets/css/stack-interface.css
 *        socicon:
 *            label: 品牌图标
 *            css: /themes/o8101/assets/css/socicon.css
 * 
 */
class Iconfont extends FormWidgetBase
{
    protected $pack;

    public function init()
    {
        $this->fieldPosition = $this->getConfig('fieldPosition', []);
    }

    public function prepareVars()
    {
        // $this->pack = $this->getConfig('pack', []);
        $this->vars['name'] = $this->formField->getName();
        $this->vars['field'] = $this->formField;
        $this->vars['pack'] = $this->pack;
        $this->vars['value'] = $this->getLoadValue();;
    }

    public function render()
    {
        $this->prepareVars();
        return $this->makePartial('iconfont');
    }


    public function loadAssets()
    {   
        $pack = $this->pack = $this->getConfig('pack', []);
        if(!empty($pack)) {
            foreach ($pack as $key => $value) {
                if($value['css']) $this->addCss($value['css']);
            }
        }
        $this->addCss("css/bbc.iconfont.css");
        $this->addJs("js/bbc.iconfont.js");
    }
}
