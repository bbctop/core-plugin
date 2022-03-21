<?php namespace Bbctop\Core;

use System\Classes\PluginBase;
use Backend\Classes\Skin as AbstractSkin;
use Bbctop\Core\Listener\PluginEventSubscriber;
use Bbctop\Core\Skin\BbctopSkin;
use Backend\Models\User;
use Backend\Classes\WidgetBase;
use Event;
use Config;
use Backend;
use Validator;


class Plugin extends PluginBase
{

    // 处理覆盖语言包
    public function __construct($app)
    {
        parent::__construct($app);

        $this->setBbctopLang($app);

    }

    public function boot() {
        $this->setBbctopSkin();
        Backend\Classes\Controller::extend(function($controller) {
            array_push($controller->implement,'Bbctop\Core\Behaviors\BbctopController');
        });
        $this->registerValidator();
    }

    public function registerValidator()
    {
        Validator::extend('china_phone',\Bbctop\Core\Validation\ChinaPhone::class);
        Validator::extend('china_mobile',\Bbctop\ConversionTools\Validation\ChinaMobile::class);
    }
    
    public function registerMarkupTags()
    {
        return [
                'functions' => [
                    'beian' => ['Bbctop\Core\Classes\GlobalFooter','beian'],
                    'bbctop_copyright' => ['Bbctop\Core\Classes\GlobalFooter','bbctop_copyright'],
                    'copyright' => ['Bbctop\Core\Classes\GlobalFooter','copyright'],
                    'icp' => ['Bbctop\Core\Classes\GlobalFooter','icp'],
                    'bbc_dump' => function ($data) {
                        dump($data);
                        return '';
                    },
                    'brackets2span' => function ($str,$tag='span',$class='') {
                        if($str) {
                            return str_replace('[','<'.$tag.(!empty($class)?(' class="'.$class.'"'):'').'>',str_replace(']','</'.$tag.'>',$str));
                          }else{
                            return '';
                          }
                        return '';
                    }
                ]
            ];
    }
 
    public function registerFormWidgets()
    {
        return [
            'Bbctop\Core\FormWidgets\Range' => [
                'label' => 'bbctop.core::lang.widget.name',
                'code'  => 'range'
            ],
            'Bbctop\Core\FormWidgets\Group' => [
                'label' => 'bbctop.core::lang.widget.name',
                'code'  => 'group'
            ],
            'Bbctop\Core\FormWidgets\Iconfont' => [
                'label' => 'bbctop.core::lang.widget.name',
                'code'  => 'iconfont'
            ],
        ];
    }
    // public function backendSkinPaths()
    // {
    //     return plugins_path('/bbctop/core/skin/layouts');
    // }

    public function registerComponents()
    {
    }

    public function registerSettings()
    {
    }

    public function registerEditorBlocks()
    {
        return [
            'raw' => [
                'settings' => [
                    'class' => 'RawTool'
                ],
            ],
        ];
    }

    // 设置覆盖源layouts,widgets,plugin的视图路径
    public function setBbctopSkin () {

        Event::subscribe(new PluginEventSubscriber());
        Config::set('backend.skin', BbctopSkin::class);

        WidgetBase::extend(function (WidgetBase $widget) {
            $origViewPath = $widget->guessViewPath();
            $newViewPath = str_replace(base_path().DIRECTORY_SEPARATOR, '', $origViewPath);
            $newViewPath = bbctop_skin_path($newViewPath);
            $widget->addViewPath($newViewPath.'/partials');
        });
    }


    // 语言包覆盖
    public function setBbctopLang ($app) {
        $app->singleton('translation.loader', function ($app) {
            $nsPath = str_replace('\\', DIRECTORY_SEPARATOR, strtolower(__NAMESPACE__));
            $langPath = plugins_path($nsPath . '/lang');
            return new \October\Rain\Translation\FileLoader($app['files'], $langPath);
        });
    }
}
