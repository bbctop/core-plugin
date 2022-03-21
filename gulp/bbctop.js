const gulp = require("gulp");
const sass = require("gulp-dart-sass");
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require('gulp-sourcemaps');

const concat = require('gulp-concat');
const merge = require('merge-stream');
const plumber = require("gulp-plumber");
const uglify = require("gulp-uglify");

const args = require('yargs').argv;
const fs = require('fs');

const log = require('gulplog');

const webpack = require('webpack')

const apath = require('path');

module.exports = {
  plugin: 'bbctop.core',
  widget_type: ['widgets','reportwidgets','formwidgets','behaviors'],
  widgets_dir: {},
  widgets_build_task: [],
  js_build_task: [],
  plugin_path: '',
  script_config: false,
  webpack_config: '',
  path: '',

  getStylesOptions: function(project) {

    const styles = {
      src: `${project}/sass/**/*.sass`,
      dest: `${project}/css`,
      maps: `${project}/css`,
    }
    return styles
  },
  

  getInput: function() {
    // if(typeof args.target != String) {
    //   console.error('Error: Please enter command like "npm run watch bbctop:ui" or "npm run build bbctop:ui"')
    //   return false
    // }
    const result = args.target.split(":")
    if(result[0] != 'bbctop') {
      console.error('Error: Please enter command like "npm run watch bbctop:ui" or "npm run build bbctop:ui"')
      return false
    }

    const $return = {
      type: result[1],
      value: args._[1],
    }

    if($return.type == 'plugins') {
      $return.path = this.getPluginPath($return.value)
    }

    return $return

  },

  getPluginPath: function(plugin) {
    const plugin_name = plugin.replace('.','/')
    console.log(plugin_name)
    return `../../${plugin_name}/assets`
  },

  sassTasks: function(path) {
    const $folder = this.getStylesOptions(path)
		return gulp.src($folder.src)
			.pipe(sourcemaps.init())
			.pipe(
				plumber(function(err) {
					console.log("Styles Task Error");
					this.emit("end");
				})
			)
			// .pipe(sass({outputStyle: 'compressed'}).on("error", sass.logError))
			.pipe(sass().on("error", sass.logError))
			.pipe(
				autoprefixer({
					browsers: ["last 10 versions"],
					cascade: false,
					grid: true
				})
			)
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest($folder.dest))
  },

  getScriptConfig: function(path) {
    const config_path = `${path}/script.config.js`
    this.path = path
    this.script_config = false
    try {
      if (fs.existsSync(config_path)) {
        this.script_config = require(`.${config_path}`);
      }
    } catch(err) {
      console.error(err)
    }
    return this
  },

  getWebpackConfig: function(path) {
    const config_path = `${path}/webpack.config.js`
    this.path = path
    if(this.webpack_config) return this
    try {
      if (fs.existsSync(config_path)) {
        this.webpack_config = require(`.${config_path}`);
        this.webpack_config.entry = `${path}/js/webpack/${this.webpack_config.entry}`
        this.webpack_config.output.path = apath.resolve(`${path}/js/`,'dist');
      }
    } catch(err) {
      console.error(err)
    }
    return this
  },

  jsWebpackTasks: function (params) {
    if(!this.webpack_config) return false;
    const _this = this
    const config = this.webpack_config
    console.log(config)
    gulp.task(`corejs:webpack`, function (done) {
      return new Promise((resolve, reject) => {
        webpack(config, (err, stats) => {
            if (err) {
                return reject(err)
            }
            if (stats.hasErrors()) {
                return reject(new Error(stats.compilation.errors.join('\n')))
            }
            resolve()
        })
      })
    })
  },

  jsWebpackWatch: function() {
    if(!this.webpack_config) return false
    gulp.watch(`${this.path}/js/webpack/**/*.js`, gulp.registry().get(`corejs:webpack`))
  },

  jsWebpackOnBuild: function(done) {
    return new Promise((resolve, reject) => {
      webpack(webpackConfig, (err, stats) => {
          if (err) {
              return reject(err)
          }
          if (stats.hasErrors()) {
              return reject(new Error(stats.compilation.errors.join('\n')))
          }
          resolve()
      })
    })
  },

  assetsPath: function(src) {
    return src.map(item => `${this.path}/${item}`)
  },

  jsTasks: function() {
    // console.log(this.script_config)
    if(!this.script_config) return false
    for(let k in this.script_config) {
      const script =  this.script_config[k]
      const path = script.dest_path || 'js'
      const root_path = this.path
      const jsdest = `${root_path}/${path}/${k}.min.js`
      const src = this.assetsPath(script.src)
      if(script && script.src.length) {
        gulp.task(`corejs:${k}`, function () {
          return gulp
          .src(src)
          .pipe(
            plumber(function(err) {
              console.log("Scripts Task Error");
              console.log(err);
              this.emit("end");
            })
          )
          .pipe(concat(jsdest))
          .pipe(gulp.dest('./'))
          .pipe(uglify())
          .pipe(gulp.dest('./'))
        })
        this.js_build_task.push(`corejs:${k}`)
      }
    }
  },

  jsWatch: function() {
    if(!this.script_config) return false
    for(let k in this.script_config) {
      const script =  this.script_config[k]
      const src = this.assetsPath(script.src)
      if(script && script.src.length) {
        gulp.watch(src, gulp.registry().get(`corejs:${k}`))
      }
    }
  },


  getWidgetsDir: function(plugin) {
    this.plugin = plugin
    this.plugin_path = plugin.split('.').join('/')
    this.widgets_dir = {}
    let result
    for (let i=0, type; type = this.widget_type[i]; i++) {
      
      const srcPath = `../../${this.plugin_path}/${type}`
      if(fs.existsSync(srcPath)) {
        const dir = fs.readdirSync(srcPath,{ withFileTypes: true }).filter(file => fs.existsSync(`${srcPath}/${file.name}/assets/sass`))
        if(dir.length) {
          if(!result) result = {}
          result[type] = dir
        }
      }
    }
    this.widgets_dir = result
  },

  widgetsTask: function(plugin = 'bbctop.core') {
    const bbctop = this
    bbctop.getWidgetsDir(plugin)
    const plugin_path = bbctop.plugin_path
    
    if(bbctop.widgets_dir) {
      for (let o in bbctop.widgets_dir) {
        const widget_dir = bbctop.widgets_dir[o]
        for (let a = 0, dir; dir = widget_dir[a]; a++) {
          console.log(`${plugin}:${o}.${dir.name}`,`../../${plugin_path}/${o}/${dir.name}/assets`)
          gulp.task(`${plugin}:${o}.${dir.name}`, function () {
            return bbctop.sassTasks(`../../${plugin_path}/${o}/${dir.name}/assets`)
          });
          bbctop.widgets_build_task.push(`${plugin}:${o}.${dir.name}`)
        }
      }
    }
  },

  widgetsWatch: function() {
    const watch_css = []
    const bbctop = this
    if(bbctop.widgets_dir) {
      for (let o in bbctop.widgets_dir) {
        const widget_dir = bbctop.widgets_dir[o]
        for (let a = 0, dir; dir = widget_dir[a]; a++) {
          gulp.watch(`../../${this.plugin_path}/${o}/${dir.name}/assets/sass/**/*.sass`, gulp.registry().get(`${this.plugin}:${o}.${dir.name}`))
          watch_css.push(`../../${this.plugin_path}/${o}/${dir.name}/assets/css/**/*.css`)
        }
      }
    }
    gulp.watch(watch_css).on('change', function(file,e){
      log.info('Compiled %s', file)
    });
  },
  
  addTaskToMerge: function(task) {
    merge.add(task)
    return merge;
  }
};