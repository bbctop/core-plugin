# BBCTOP 核心插件

## 命令行

首先配置Bbctop Composer服务器
```
composer config repositories.bbctop composer https://gateway.f.bbctop.cn/packages/packages.json
```

安装Bbctop核心插件
```
composer require bbctop/core-plugin
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

# Twig Markup

在模板里 dump 数据
```
{{ data|dd }}
```

单行Markdown编译
```
{{ '*text*'|mdl }}
```

JSON转换数组
```
{{ string|json_decode }}
```

# 新增表单组件

## Group 组件

```yaml
_group:
  type: group
  label: 标题
  collapse_title: 可收起标题
  is_collapsed: false
  span: auto
name:
  type: text
  lable: 名称
  ...
_group_end:
  type: groupend
```

## Range 区间组件

```yaml
range:
  label: 滑动条
  type: range
  min: 1
  max: 50
  step: 1
```