<?php namespace Bbctop\Core\Traits;

use File;
use Cms\Classes\Theme;

/**
 * FieldsHelper Trait
 * 表单的一些组手函数
 *
 * @package Bbctop\Core
 * @author 雷浩研 <jacky040789@gmail.com>
 */
trait FieldsHelper
{
  use \System\Traits\ConfigMaker;

  public function makeGroup($group, $fields) {
    $group['type'] = 'group';
    $code = str_random(10);
    foreach ($fields as $k => &$v) {
      if($group['span'] == 'row') {
        // $v['spanClass'] = 'span-'.$v['span'].' '.$v['spanClass'];
        $v['span'] = 'row';
      }
      $v['tab'] = $group['tab'];
    }
    return [
      "_{$code}_group" => $group
    ] + $fields + [
      "_{$code}_group_end" => [
        'type' => 'groupend',
        'tab' => $group['tab'],
        'span' => $group['span']
      ]
    ];
  }

  public function makeBbctopFields($fields) {
    if(is_string($fields)) {
      $fields = (array)$this->makeConfig($fields);
    }
    if(!$fields) return [];
    $new_fields = [];
    foreach ($fields as $name => $field) {
      if(strpos($name,'_group') === 0) {
        $group = $field;
        $group_fields = $group['fields'];
        unset($group['fields']);
        $new_fields += $this->makeGroup($group,$group_fields);
      }else{
        $new_fields[$name] = $field; 
      }
    }
    return $new_fields;
  }

  public function getThemeMeta($code) {
    $theme = Theme::getActiveTheme();
    $yaml = $theme->getPath()."/meta/$code.yaml";
    $config = [];
    if(File::exists($yaml)) {
        $config = (array)$this->makeConfig($yaml);
    }else if($theme->hasParentTheme()) {
        $yaml = $theme->getParentTheme()->getPath()."/meta/$code.yaml";
        if(File::exists($yaml)) {
            $config = (array)$this->makeConfig($yaml);
        }
    }
    return $config;
  }
}