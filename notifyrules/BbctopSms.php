<?php namespace Bbctop\Core\Notifyrules;
/**
 * Bbctop短信发送类
 * @Author: 武志伟 <wzw0425@qq.com>
 * @Date:   2022-05-01 18:15:21
 * @Last Modified by:   Marte
 * @Last Modified time: 2022-05-09 10:09:24
 */
use Cache;
use Request;
use Config;
use Log;
use October\Rain\Extension\ExtensionBase;
class BbctopSms extends ExtensionBase
{

    protected $sms_un;
    protected $sms_pwd;
    protected $mobile;

    public function __construct($parent)
    {
        $this->sms_un =Config::get('bbctop.core::sms_un');
        $this->sms_pwd = Config::get('bbctop.core::sms_pwd');
    }
    /**
     * 发送短信
     * @param string msg 短信内容
     * @param int mobile 短信内容
     * @return void
     */
    public function sendMessages(string $msg,int $mobile):array
    {
        $this->mobile =$mobile;

        // 当前IP手机号10分钟内只能尝试10次，每次尝试间隔60s
        if (!$this->validator('tenm',600,10)||!$this->validator('onem',60,1)) {
            return ['code'=>false,'msg'=>'发送频繁'];
        }
        $notifyPars = array(
            'un' => $this->sms_un,
            'pwd' => $this->sms_pwd,
            'msg' => $msg,
            'mobile'=> $mobile,
        );

        $result = array(
            '1' => '发送成功',
            '-1' => '用户名或密码为空',
            '-2' => '手机号不正确',
            '-3' => 'msg参数为空',
            '-4' => '短信字数超长',
            '-5' => '群发手机号码个数超限（群发一个包最多300个号码）',
            '-6' => '黑名单号码',
            '-7' => '请求参数为空',
            '-8' => '短信内容含有屏蔽词',
            '-9' => '短信账户不存在',
            '-10' => '短信账户已经停用',
            '-11' => '短信账户余额不足',
            '-12' => '密码错误',
            '-16' => 'IP服务器鉴权错误',
            '-17' => '单发手机号码个数超限（单发一次只能提交1个号码',
            '-21' => '提交速度超限',
            '-22' => '手机号达到当天发送限制',
            '-99' => '系统异常',
        );
        $url = 'http://si.800617.com:4400/sms/SendSMS.aspx?' . http_build_query($notifyPars);
        $xmls = trim(@file_get_contents($url));
        $xml =simplexml_load_string($xmls);
        $xmljson= json_encode($xml);
        $notifyResult=json_decode($xmljson,true);

        if ($notifyResult['Result']!='1') {
            Log::info('SMS运营商返回错误：'.$result[$notifyResult['Result']].'.  短信内容：'.$msg);

            return ['code'=>false,'msg'=>'短信发送失败'];
        }
        return ['code'=>true];
    }
    /**
     * 发送验证
     * @param string $code 标识
     * @param int $duration 锁定时长
     * @param int $blocknum 锁定次数
     * @return array
     */
    private function validator(string $code,int $duration=600,int $blocknum=10)
    {
        $nowtime=time();
        $ip=$code.Request::ip();
        $mobile=$code.$this->mobile;
        $num=Cache::get($code.'blocknum')+1;//锁定次数累计
        if (Cache::get($ip)||Cache::get($mobile)) {
            Cache::put($code.'blocknum', $num, $duration);//记录IP
        }else{
            Cache::put($ip, $nowtime, $duration);//记录IP
            Cache::put($mobile, $nowtime, $duration);//记录手机号
        }
        if ($num>$blocknum) {
            return false;
        }
        return true;
    }
}