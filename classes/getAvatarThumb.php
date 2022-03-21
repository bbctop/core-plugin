<?php
namespace Bbctop\Core\Classes;
use Symfony\Component\HttpFoundation\File\File as FileObj;
/**
 * 获取默认头像
 *
 * @author 武志伟
 */
class getAvatarThumb extends FileObj
{

  public function getThumb($size1, $size2, $options)
  {
    return '/plugins/bbctop/core/assets/img/avatar.png';
  }
}
