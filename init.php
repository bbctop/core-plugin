<?php 
/**
 * 自定义函数放这里
 */

if(!function_exists('bbctop_skin_assets')) {
  function bbctop_skin_assets($url) {
    return asset('/plugins/bbctop/core/assets/bbctopskin/'.$url);
  }
}

if(!function_exists('bbctop_skin_path')) {
  function bbctop_skin_path($path='') {
    return plugins_path('bbctop/core/skin/').$path;
  }
}

if(!function_exists('bbctop_formwidget_assets')) {
  function bbctop_formwidget_assets($path='') {
    return '~/plugins/bbctop/core/assets/formwidgets/'.$path;
  }
}

if(!function_exists('bbc_media')) {
  function bbc_media ($image, $default = '') {
    if(empty($image) && !empty($default)) return Url::asset($default);
    if(!empty($image)) return \Media\Classes\MediaLibrary::url($image);
  }
}

if(!function_exists('is_china_mobile')) {
  /**
   * 手机号码校验(三大运营商最新号段 合作版 2021-03)
   * 移动号段：
   * 134 135 136 137 138 139 147 148 150 151 152 157 158 159 172 178 182 183 184 187 188 195 198
   * 
   * 联通号段：
   * 130 131 132 145 146 155 156 166 167 171 175 176 185 186 196
   * 
   * 电信号段：
   * 133 149 153 173 174 177 180 181 189 191 193 199
   * 
   * 虚拟运营商:
   * 162 165 167 170 171
   * 
   * 13开头排序：(0-9)（134 135 136 137 138 139 130 131 132 133）
   * 14开头排序：(5-9)（147 148 145 146 149）
   * 15开头排序：(0-3|5-9)（150 151 152 157 158 159 155 156 153）
   * 16开头排序：(6-7)（166 167）
   * 17开头排序：(1-8)（172 178 171 175 176 173 174 177）
   * 18开头排序：(0-9)（182 183 184 187 188 185 186 180 181 189）
   * 19开头排序：(1|3|5|6|8|9)（195 198 196 191 193 199）
   *
   * @param phone 手机号码
   * @return 是否属于三大运营商号段范围
   * @see {https://www.qqzeng.com/article/phone.html}
   */
  function is_china_mobile(String $phone) {

    $phone = strtr( $phone, array( '-' => '', ' '=> '', '(' => '', ')' => '' ) );
    // 验证手机号
    if (preg_match("/^(\+86)?0?1[3456789]\d{9}$/",$phone)) {
      return true;
    }else{
      return false;
    }

  }

}

if(!function_exists('is_china_phone')) {

  function is_china_phone(String $phone) {

    $phone = strtr( $phone, array( '-' => '', ' '=> '', '(' => '', ')' => '' ) );
    // 验证手机号
    if (is_china_mobile($phone)) {
      return true;
    //验证400电话
    }else if(preg_match("/^(\+86)?(400)[0-9]{7}$/",$phone)) {
      return true;
    //固定电话
    }else if(preg_match("/^(0\d{2,3})(\d{7,8})(\d{3,})?$/",$phone)) {
      return true;
    }else{
      return false;
    }

  }
}

// 获取当前主题目录
if(!function_exists('get_active_theme_dir')) {
  function get_active_theme_dir () {
    $theme = Cms\Classes\Theme::getActiveTheme();
    $themeDir = $theme->getDirName();
    if($theme->hasParentTheme()) {
      $themeDir = $theme->getParentTheme()->getDirName();
    }
    return $themeDir;
  }
}