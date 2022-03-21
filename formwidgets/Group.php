<?php

namespace Bbctop\Core\FormWidgets;

use Html;
use Backend\Classes\FormWidgetBase;

/**
 * 后端百度地图
 * 用法:
 * _group:
 *     type: group
 *     label: 标题
 *     collapse_title: 可收起标题
 *     is_collapsed: false
 *     span: auto
 * field:
 *     type: text
 *     ...
 * _group_end:
 *     type: groupend
 */
class Group extends FormWidgetBase
{

    public function init()
    {
        $this->fieldPosition = $this->getConfig('fieldPosition', []);
        
    }

    public function prepareVars()
    {
        $this->vars['collapse_title'] = $this->getConfig('collapse_title');
        $this->vars['is_collapsed'] = $this->getConfig('is_collapsed');
        $this->vars['group_type'] = $this->getConfig('group_type','collapse');
        // $this->vars['field'] = $this->formField;
    }

    public function render()
    {
        $this->prepareVars();
        return $this->makePartial('group');
    }


    public function loadAssets()
    {
        $this->addCss("css/bbc.group.css");
        $this->addJs("js/bbc.group.js");
    }
}
