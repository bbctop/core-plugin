<?php

namespace Bbctop\Core\FormWidgets;

use Html;
use Backend\Classes\FormWidgetBase;

/**
 * 后端百度地图
 * 用法:
 * map:
 *     label: 'Range'
 *     type: range
 *     min: 1
 *     max: 50
 *     step: 1
 *     grid: 1
 * 
 */
class Range extends FormWidgetBase
{

    public function init()
    {
        $this->fieldPosition = $this->getConfig('fieldPosition', []);
        
    }

    public function prepareVars()
    {
        $this->vars['name'] = $this->formField->getName();
        $this->vars['code'] = $this->getLoadValue();
        $this->vars['field'] = $this->formField;
        $this->vars['min'] = $this->getConfig('min', 0);
        $this->vars['max'] = $this->getConfig('max', 1000);
        $this->vars['step'] = $this->getConfig('step', 1);
        $this->vars['grid'] = $this->getConfig('grid', 1);
        $this->vars['value'] = $this->getLoadValue();;
        $this->vars['default'] = $this->getConfig('default', 12);
        
    }

    public function render()
    {
        $this->prepareVars();
        return $this->makePartial('range');
    }


    public function loadAssets()
    {
        $this->addCss("css/bbc.range.css");
        $this->addJs("js/bbc.range.js");
    }
}
