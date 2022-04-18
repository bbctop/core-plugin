# BBCTOP 核心插件

首先配置Bbctop Composer服务器
```
composer config repositories.bbctop composer https://gateway.f.bbctop.cn/packages/packages.json
```
弄完这一步就可以运行下面命令行 进行安装插件或主题。

安装BBCTOP插件
```
php artisan bbctop-plugin:install bbctop.themecore
```

安装BBCTOP插件
```
php artisan bbctop-theme:install bbctop.21001m
```

删除插件/主题请用官方命令
```
php artisan plugin:remove bbctop.themecore
php artisan theme:remove 21001m
```
