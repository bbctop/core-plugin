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
     * 返回可用的短信供应商
     */
    public static function getProvidersOptions(){

        return ['Bbctop.Core.Notifyrules.BbctopSms' => 'BBCTOP短信平台'];
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


        try {
            // 如果尚未实现，则实现行为
            if (!$this->isClassExtendedWith($this->host->providers)) {
                $this->implement[] = $this->host->providers;
            }
            $this->sendMessages(MailManager::instance()->renderTextTemplate($template,$params),$recipient);
        }
        catch (Exception $ex) {
            throw new ApplicationException($ex->getMessage());
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
