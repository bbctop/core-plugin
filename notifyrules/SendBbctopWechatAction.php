<?php namespace Bbctop\Core\Notifyrules;
use Config;
use System\Classes\MailManager;
use System\Models\MailTemplate;
use RainLab\Notify\Classes\ActionBase;
use ApplicationException;
/**
 * Bbctop 微信公众号通知
 * @author 武志伟 <wzw0425@qq.com>
 */
class SendBbctopWechatAction extends ActionBase
{


    /**
     * 返回有关此事件的信息，包括名称和描述。
     */
    public function actionDetails()
    {
        return [
            'name'        => '撰写BBCTOP微信通知',
            'description' => '通过BBCTOP公众号向关注人发送消息',
            'icon'        => 'icon-envelope'
        ];
    }

    /**
     * Triggers this action.
     * @param array $params
     * @return void
     */
    public function triggerAction($params)
    {

        $template = $this->host->mail_template;

        if (!$template) {
            throw new ApplicationException('缺少有效的邮件模板');
        }

        $mailTemplate = new MailTemplate;
        $template=$mailTemplate->findOrMakeTemplate($template);

        $headers = array(
            'Accept' => 'application/json',
            'Accept-Charset' => 'utf-8'
        );
        $url = 'apimsg.bbctop.cn/Api/october';
        $data['apipwd'] =$this->authcode('a1853efr*&^|**67&#*$($($$*$*#@(@(($*$$**($');
        $data['site_url']  =$_SERVER['SERVER_NAME'];
        $data['backend']  ='october';
        $data['web_site_name'] = $template->subject;
        $data['content'] =MailManager::instance()->renderTextTemplate($template,$params);
// dump( $data['content']);exit;
        //请求设置
        $config = array(
            //请求链接
            'base_uri' => $url,
            'headers' => $headers,
            'form_params' => $data,
            'http_errors' => true,
            'verify' => false,
            'timeout' => 60
        );
        $client = new \GuzzleHttp\Client($config);
        try {
            $request = $client->request(strtoupper('POST')); // 请求
            $http_status = $request->getStatusCode(); // 响应状态码
            $response = json_decode($request->getBody()->getContents(),true); //响应内容
            if ($response['code']!=100000) {
                throw new ApplicationException($response['msg']);
            }
        }catch (\Exception $exception) {
            throw new ApplicationException($exception);
        }


    }




    /**
    * 字符串加密、解密函数
    * @param string  $string   字符串
    * @param string  $operation  ENCODE为加密，DECODE为解密，可选参数，默认为ENCODE，
    * @param string  $key    密钥：数字、字母、下划线
    * @param string  $expiry   过期时间
    * @return  string
    */
    Protected function authcode($string, $operation = 'ENCODE', $key = '', $expiry = 0) {
     $ckey_length = 4;
     $key = md5('Bbc$#^(@T*%op>)');
     $keya = md5(substr($key, 0, 16));
     $keyb = md5(substr($key, 16, 16));
     $keyc = $ckey_length ? ($operation == 'DECODE' ? substr($string, 0, $ckey_length): substr(md5(microtime()), -$ckey_length)) : '';
     $cryptkey = $keya.md5($keya.$keyc);
     $key_length = strlen($cryptkey);
     $string = $operation == 'DECODE' ? base64_decode(substr($string, $ckey_length)) : sprintf('%010d', $expiry ? $expiry + time() : 0).substr(md5($string.$keyb), 0, 16).$string;
     $string_length = strlen($string);
     $result = '';
     $box = range(0, 255);
     $rndkey = array();
     for($i = 0; $i <= 255; $i++) {$rndkey[$i] = ord($cryptkey[$i % $key_length]);}
     for($j = $i = 0; $i < 256; $i++) {
       $j = ($j + $box[$i] + $rndkey[$i]) % 256;
       $tmp = $box[$i];
       $box[$i] = $box[$j];
       $box[$j] = $tmp;
     }
     for($a = $j = $i = 0; $i < $string_length; $i++) {
       $a = ($a + 1) % 256;
       $j = ($j + $box[$a]) % 256;
       $tmp = $box[$a];
       $box[$a] = $box[$j];
       $box[$j] = $tmp;
       $result .= chr(ord($string[$i]) ^ ($box[($box[$a] + $box[$j]) % 256]));
     }
     if($operation == 'DECODE') {
       if((substr($result, 0, 10) == 0 || substr($result, 0, 10) - time() > 0) && substr($result, 10, 16) == substr(md5(substr($result, 26).$keyb), 0, 16)) {
       return substr($result, 26);} else {return '';}
     } else {return $keyc.str_replace('=', '', base64_encode($result));}
    }
    /**
     * Field configuration for the action.
     */
    public function defineFormFields()
    {
        return 'fields.yaml';
    }

    /**
     * 定义自定义字段的验证规则。
     * @return array
     */
    public function defineValidationRules()
    {
        return [
            'mail_template' => 'required',
        ];
    }

    public function getMailTemplateOptions()
    {
        $codes = array_keys(MailTemplate::listAllTemplates());
        $result = array_combine($codes, $codes);
        return $result;
    }

}
