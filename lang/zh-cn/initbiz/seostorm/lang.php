<?php return [
    'plugin' => [
        'name' => 'SEO',
        'description' => '页面SEO管理',
    ],
    'permissions' => [
        'settings_tab' => 'SEO',
        'config' => 'SEO管理权限',
    ],
    'form_widgets' => [
        'migrate' => 'Migrate',
        'migrating' => 'Migrating',
        'migrate_head' => 'Arcane.SEO migrator',
        'migrate_comment' => 'To migrate from Arcane.SEO plugin, click the button below. It will override your current configuration.',
        'migrate_confirm' => 'Are you sure you want to migrate the settings from Arcane.SEO?',
        'successfully_migrated' => 'The migration was successfull',
    ],
    'form' => [
        'general' => [
            'meta_title_label' => 'SEO标题',
            'meta_description_label' => 'SEO描述',
            'og_title_label' => 'OG:title',
            'og_title_comment' => '建议50-60字符',
            'og_title_placeholder' => '页面标题',
            'og_description_label' => 'OG:description',
            'og_description_comment' => '最佳长度是155',
            'og_description_placeholder' => '页面描述',
            'canonical_url_label' => '规范网址(Canonical URL)',
            'canonical_url_comment' => '此页面应指向的规范网址。你可以在这里使用TWIG语法。',
            'robot_index_label' => 'Robots index',
            'robot_index_comment' => '指定搜索引擎是否应索引此页面',
            'robot_follow_label' => 'Robots follow',
            'robot_follow_comment' => '指定搜索引擎是否应遵循此页面上的链接',
            'robot_advanced_label' => 'Advanced robots',
            'robot_advanced_comment' => '向 robots 元标记添加附加指令，您也可以在此处使用TWIG语法',
            'robot_empty' => '不设置',
            'enabled_in_sitemap_label' => 'Enable in the sitemap.xml',
            'enabled_in_sitemap_comment' => 'Page will appear in the sitemap.xml',
            'use_updated_at_label' => 'Use "updated_at" from the model as "Last time modified"',
            'use_updated_at_comment' => 'If the updated_at field isnt available in the model it will default to the files last time modified aka: <b>Page::$mtime</b>',
            'lastmod_label' => 'Last time modified',
            'lastmod_comment' => 'Date and time this page was last modified (will be overwritten by the updated_at if checked)',
            'changefreq_label' => 'Changing frequency',
            'changefreq_comment' => 'Tell search engines how frequently this page changes',
            'priority_label' => 'Priority',
            'priority_comment' => 'Rank the importance of the page to search engines',
            'og_type_label' => 'OG:type',
            'og_type_comment' => '默认为 website',
            'og_type_placeholder' => 'website article video etc...',
            'og_card_label' => 'OG:card',
            'og_ref_image_label' => 'OG:image',
            'og_ref_image_comment' => '这将优先于 OG:image',
            'og_ref_image_placeholder' => '图片路径',
            'og_image_label' => 'OG:image',
            'og_image_comment' => '来自媒体库OG:image',
            'tab_meta' => 'Meta标签',
            'tab_sitemap' => 'Sitemap',
            'tab_open_graph' => 'Open Graph',
            'model_class_label' => 'Model class',
            'model_class_comment' => 'Associate this page with a model links will be generated from it\'s records',
            'model_class_placeholder' => 'Author\Plugin\Models\ModelClass',
            'model_scope_label' => 'Model scope',
            'model_scope_comment' => 'Filter the records using this scope',
            'model_scope_placeholder' => 'e.g. isPublished',
            'model_params_label' => 'Model parameters',
            'model_params_comment' => 'Get the URL parameters from related objects',
            'model_params_placeholder' => 'slug:slug|categorySlug:category.slug',
        ],
        'settings' => [
            'category_label' => 'SEO配置',
            'label' => '常规配置',
            'description' => '配置SEO',
            'tab_meta' => 'Meta',
            'tab_sitemap' => 'Sitemap',
            'tab_head' => '<head>',
            'tab_robots' => 'Robots',
            'tab_favicon' => 'Favicon',
            'tab_htaccess' => '.htaccess',
            'tab_social_media' => 'Social Media',
            'tab_migrate' => 'Migrate',
            'enable_site_meta' => 'Enable title and description meta tags',
            'enable_sitemap' => 'Enable sitemap.xml',
            'site_name' => '网站名称',
            'site_name_placeholder' => '您的网站名称',
            'site_name_position' => '网站名称展示位置',
            'site_name_position_prefix' => '前缀',
            'site_name_position_suffix' => '后缀',
            'site_name_position_nowhere' => '不显示',
            'site_name_position_commentAbove' => '选择网站名称在标题中的显示方式',
            'site_name_separator' => '站点名称分隔符',
            'site_name_separator_placeholder' => '|',
            'site_name_separator_comment' => '用于分隔站点名称和标题的字符，例如：页面标题|站点名称',
            'site_description' => '默认描述',
            'site_description_placeholder' => '您的网站说明',
            'extra_meta' => '附加<head>内容',
            'extra_meta_comment' => '附加meta标签',
            'enable_robots_txt' => '开启robots.txt',
            'enable_robots_meta' => '开启 robots meta 标签',
            'robots_txt' => 'robots.txt',
            'favicon_enabled' => '开启 favicon.ico',
            'favicon_enabled_comment' => '这将生成一路由到/favicon.ico',
            'favicon_16' => '将网站图标大小调整为 16x16',
            'favicon' => '选择您的网站图标',
            'favicon_prompt' => '单击%s搜索媒体库',
            'enable_og' => '启用 Open Graph',
            'enable_og_comment' => '显示 Open Graph 标签',
            'site_image_from' => '从哪里获取默认站点图像',
            'site_image_from_media' => '媒体库',
            'site_image_from_fileupload' => '文件上传',
            'site_image_from_url' => 'Url',
            'site_image' => '网站图片',
            'site_image_prompt' => '拖动文件或单击此处',
            'fb_app_id' => 'Facebook App ID',
            'fb_app_id_comment' => 'The fb:app_id OG tag',
            'og_locale' => 'OG:locale',
            'og_locale_comment' => '为社交媒体设置您网站的区域设置（例如 en_US）。 <a target="__blank" href="http://ogp.me/#optional">点击这里了解更多信息。</a>',
            'og_locale_alternate' => 'OG:locale:alternate',
            'og_locale_alternate_comment' => '为社交媒体设置您网站的备用区域设置（例如 en_US）。 <a target="__blank" href="http://ogp.me/#optional">点击这里了解更多信息。</a>',
            'site_image_hint' => '图片的推荐分辨率为 1200px x 627px',
            'og_site_name' => 'OG:site_name',
            'og_site_name_comment' => '如果您的对象是较大网站的一部分，则应为整个网站显示的名称。例如，“初始化”。',
        ],
        'htaccess' => [
            'label' => '.htaccess',
            'description' => '管理.htaccess文件',
        ]
    ],
    'components' => [
        'group' => [
            'properties' => '特性',
            'product' => '产品',
            'offer' => '提供',
            'reviews' => '评价',
        ],
        'seo' => [
            'name' => 'Seo',
            'description' => '在适当位置呈现 SEO meta 标签',
        ],
    ],
    'editor' => [
        'translate' => 'Translate SEO'
    ]
];
