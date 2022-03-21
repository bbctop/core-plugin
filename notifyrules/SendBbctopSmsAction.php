<?php namespace Bbctop\Core\Notifyrules;

use Config;
use System\Classes\MailManager;
use System\Models\MailTemplate;
use RainLab\Notify\Classes\ActionBase;
use ApplicationException;
/**
 * Bbctop短信发送类
 * @author 武志伟 <wzw0425@qq.com>
 */
class SendBbctopSmsAction extends ActionBase
{

    public $recipientModes = [
        'user_sms' => '用户手机号[user_sms]（如果适用）',
        'sender_sms' => '发送人用户手机号[sender_sms]（如果适用）',
        'custom' => '特定的手机号（多个请用英文逗号隔开）',
    ];
    /**
     * 返回有关此事件的信息，包括名称和描述。
     */
    public function actionDetails()
    {
        return [
            'name'        => '撰写BBCTOP短信通知',
            'description' => '通过BBCTOP短信向用户发送消息',
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
        $recipient = $this->getRecipientAddress($params);
        $mailTemplate = new MailTemplate;
        $template=$mailTemplate->findOrMakeTemplate($template);
        
        $notifyPars = array(
            'un' => $this->host->sms_un,
            'pwd' => $this->host->sms_pwd,
            'msg' => MailManager::instance()->renderTextTemplate($template,$params),
            'mobile'=> $recipient,
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
            throw new ApplicationException($result[$notifyResult['Result']]);
        }

    }
    protected function getRecipientAddress($params)
    {
        $mode = $this->host->send_to_mode;
        // 特定的手机号
        if ($mode == 'custom') {
            return $this->host->send_to_custom;
        }
        if ($mode == 'user_sms' || $mode == 'sender_sms') {
            return array_get($params, $mode);
        }
    }
    /**
     * Field configuration for the action.
     */
    public function defineFormFields()
    {
        return 'fields.yaml';
    }

    public function getSendToModeOptions()
    {
        $modes = $this->recipientModes;


        return $modes;
    }

    /**
     * 定义自定义字段的验证规则。
     * @return array
     */
    public function defineValidationRules()
    {
        return [
            'mail_template' => 'required',
            'send_to_mode' => 'required',
            'sms_un' => 'required',
            'sms_pwd' => 'required',
        ];
    }

    public function getMailTemplateOptions()
    {
        $codes = array_keys(MailTemplate::listAllTemplates());
        $result = array_combine($codes, $codes);
        return $result;
    }
}
