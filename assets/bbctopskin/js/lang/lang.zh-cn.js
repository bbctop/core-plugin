/*
 * This file has been compiled from: /modules/system/lang/zh-cn/client.php
 */
if ($.oc === undefined) $.oc = {}
if ($.oc.langMessages === undefined) $.oc.langMessages = {}
$.oc.langMessages['zh-cn'] = $.extend(
    $.oc.langMessages['zh-cn'] || {},
    {
      "markdowneditor": {
        "formatting": "格式化",
        "quote": "引用",
        "code": "代码",
        "header1": "标题 1",
        "header2": "标题 2",
        "header3": "标题 3",
        "header4": "标题 4",
        "header5": "标题 5",
        "header6": "标题 6",
        "bold": "粗体",
        "italic": "斜体",
        "unorderedlist": "无序列表",
        "orderedlist": "有序列表",
        "video": "视频",
        "image": "图片",
        "link": "链接",
        "horizontalrule": "插入分割线",
        "fullscreen": "全屏",
        "preview": "预览"
      },
      "mediamanager": {
        "insert_link": "插入链接",
        "insert_image": "插入图片",
        "insert_video": "插入视频",
        "insert_audio": "插入音频",
        "invalid_file_empty_insert": "请选择要插入的文件。",
        "invalid_file_single_insert": "请选择要插入的文件。",
        "invalid_image_empty_insert": "请选择要插入的图片文件。",
        "invalid_video_empty_insert": "请选择要插入的视频文件。",
        "invalid_audio_empty_insert": "请选择要插入的音频文件。"
      },
      "alert": {
        "error": "错误",
        "confirm": "确认",
        "dismiss": "取消",
        "confirm_button_text": "确定",
        "cancel_button_text": "取消",
        "widget_remove_confirm": "删除这个小部件?"
      },
      "datepicker": {
        "previousMonth": "上一个月",
        "nextMonth": "下一个月",
        "months": [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
          "十一月",
          "十二月"
        ],
        "weekdays": [
          "周日",
          "周一",
          "周二",
          "周三",
          "周四",
          "周五",
          "周六"
        ],
        "weekdaysShort": [
          "日",
          "一",
          "二",
          "三",
          "四",
          "五",
          "六"
        ]
      },
      "colorpicker": {
        "choose": "Ok"
      },
      "filter": {
        "group": {
          "all": "全部"
        },
        "scopes": {
          "apply_button_text": "应用",
          "clear_button_text": "清除"
        },
        "dates": {
          "all": "全部",
          "filter_button_text": "筛选",
          "reset_button_text": "重置",
          "date_placeholder": "日期",
          "after_placeholder": "之后",
          "before_placeholder": "之前"
        },
        "numbers": {
          "all": "全部",
          "filter_button_text": "过滤器",
          "reset_button_text": "重置",
          "min_placeholder": "最小",
          "max_placeholder": "最大"
        }
      },
      "eventlog": {
        "show_stacktrace": "显示堆栈",
        "hide_stacktrace": "隐藏堆栈",
        "tabs": {
          "formatted": "格式化",
          "raw": "原始"
        },
        "editor": {
          "title": "源代码编辑器",
          "description": "您的系统应配置一个侦听这些 URL 的方案",
          "openWith": "打开方式",
          "remember_choice": "记住本次会话选择的选项",
          "open": "打开",
          "cancel": "取消"
        }
      },
      "upload": {
        "max_files": "您不能上传任何文件",
        "invalid_file_type": "您不能上传这种类型的文件",
        "file_too_big": "文件太大 ({{filesize}}MB)。 最大文件大小：{{maxFilesize}}MB",
        "response_error": "服务器响应 {{statusCode}} 代码",
        "remove_file": "删除文件"
      },
      "popup": {
        "ok": "确定",
        "cancel" : "取消"
      }
    }
);

//! moment.js locale configuration v2.22.2

;(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../moment')) :
   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';


    var zhCn = moment.defineLocale('zh-cn', {
        months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
        monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
        weekdaysShort : '周日_周一_周二_周三_周四_周五_周六'.split('_'),
        weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'YYYY/MM/DD',
            LL : 'YYYY年M月D日',
            LLL : 'YYYY年M月D日Ah点mm分',
            LLLL : 'YYYY年M月D日ddddAh点mm分',
            l : 'YYYY/M/D',
            ll : 'YYYY年M月D日',
            lll : 'YYYY年M月D日 HH:mm',
            llll : 'YYYY年M月D日dddd HH:mm'
        },
        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === '凌晨' || meridiem === '早上' ||
                    meridiem === '上午') {
                return hour;
            } else if (meridiem === '下午' || meridiem === '晚上') {
                return hour + 12;
            } else {
                // '中午'
                return hour >= 11 ? hour : hour + 12;
            }
        },
        meridiem : function (hour, minute, isLower) {
            var hm = hour * 100 + minute;
            if (hm < 600) {
                return '凌晨';
            } else if (hm < 900) {
                return '早上';
            } else if (hm < 1130) {
                return '上午';
            } else if (hm < 1230) {
                return '中午';
            } else if (hm < 1800) {
                return '下午';
            } else {
                return '晚上';
            }
        },
        calendar : {
            sameDay : '[今天]LT',
            nextDay : '[明天]LT',
            nextWeek : '[下]ddddLT',
            lastDay : '[昨天]LT',
            lastWeek : '[上]ddddLT',
            sameElse : 'L'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
        ordinal : function (number, period) {
            switch (period) {
                case 'd':
                case 'D':
                case 'DDD':
                    return number + '日';
                case 'M':
                    return number + '月';
                case 'w':
                case 'W':
                    return number + '周';
                default:
                    return number;
            }
        },
        relativeTime : {
            future : '%s内',
            past : '%s前',
            s : '几秒',
            ss : '%d 秒',
            m : '1 分钟',
            mm : '%d 分钟',
            h : '1 小时',
            hh : '%d 小时',
            d : '1 天',
            dd : '%d 天',
            M : '1 个月',
            MM : '%d 个月',
            y : '1 年',
            yy : '%d 年'
        },
        week : {
            // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });

    return zhCn;

})));

