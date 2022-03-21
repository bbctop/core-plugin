<?php
namespace Bbctop\Core\Classes;
/**
 * 前端站点底部版权区域规范
 *
 * @author 武志伟
 */
class GlobalFooter
{
    /**
     * Bbctop版权
     */
    public static function bbctop_copyright()
    {
        return "<a class='px-0 py-0' href='https://www.bbctop.com' title='网站开发 'target='_blank'>网站开发</a>:<a class='px-0 py-0' href='https://www.bbctop.com' title='超越无限' target='_blank'>超越无限</a>";
    }
    /**
     * 公网安备
     */
    public static function beian($options)
    {
        if ($options) {
            preg_match('/\d+/',$options,$arr);
            if ($arr) {
              return "<a class='beian' rel='nofollow' href='http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=$arr[0]' target='_blank'><img src='/plugins/bbctop/core/assets/img/gongan.png' alt='beian'>$options</a>";
            }else{
              return "<a class='beian' rel='nofollow' href='http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=xxxxxxxxxxxxxx' target='_blank'><img src='/plugins/bbctop/core/assets/img/gongan.png' alt='beian'>$options</a>";
            }
        }
    }
    /**
     * 网站所有者版权
     */
    public static function copyright($options)
    {
        if($options) return "©&nbsp;".date('Y')."&nbsp;".$options;
    }
    /**
     * 增值电信业务经营许可证(ICP)
     */
    public static function icp($options)
    {
      $global_icp='';
        if ($options) {
            $httphost=\Illuminate\Support\Facades\Request::getHttpHost();
            foreach ($options as $key => $value) {
              if(!@$value['host']) $global_icp=$value['icp'];
              if($httphost==@$value['host']){
                $global_icp=$value['icp'];
                break;
              }
            }
            if($global_icp) return "<a target='_blank' rel='nofollow' href='https://beian.miit.gov.cn'>$global_icp</a>";
        }
    }
}
