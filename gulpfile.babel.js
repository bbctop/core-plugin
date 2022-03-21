// const Project = require('./config/index.js');
// import { Project } from "./config";

const gulp = require("gulp");
const pug = require("gulp-pug");
const bbctop = require('./gulp/bbctop.js');

const log = require('gulplog');
const through2 = require('through2');
// const imagemin = require("gulp-imagemin");

const concat = require('gulp-concat');
const uglify = require("gulp-uglify");

const merge = require('merge-stream');
const autoprefixer = require("gulp-autoprefixer");
// const cached = require("gulp-cached");
// const remember = require("gulp-remember");
// const del = require("del");
const plumber = require("gulp-plumber");

// bbctop.getConfig();
const input = bbctop.getInput();

let modules, widgets = []

const task_group = []

switch (input.type) {
	case 'skin':
		gulp.task('skin', function () {
			return bbctop.sassTasks(`./assets/bbctopskin`)
		});
		bbctop.widgetsTask()
	break;
	case 'plugins':
		gulp.task(input.value, function () {
			return bbctop.sassTasks(input.path)
		});
		bbctop.widgetsTask(input.value)
	break;
	case 'corejs':
		bbctop.getScriptConfig(`./assets/bbctopskin`).jsTasks()
		bbctop.getWebpackConfig(`./assets/bbctopskin`).jsWebpackTasks()
	break;
}



/* Images
 * ------ */

// function images() {
// 	return gulp
// 		.src(options.images.src)
// 		.pipe(
// 			cache(
// 				imagemin({
// 					interlaced: true
// 				})
// 			)
// 		)
// 		.pipe(gulp.dest(options.images.dest));
// }

/* Fonts
 * ------ */

// function fonts() {
// 	return gulp.src(options.fonts.src).pipe(gulp.dest(options.fonts.dest));
// }

/* Clean up
 * ------ */

// async function clean() {
// 	return Promise.resolve(del.sync("public"));
// }


function watchFiles() {
	// console.log(options.scripts.src)
	// var watcher = gulp.watch(options.pug.all, views)
	// watcher.on('change', function(path, stats) {
	// 	newpath = path
	// });
	const watch_css = []

	switch (input.type) {
		case 'skin':
			gulp.watch('./assets/bbctopskin/sass/**/*.sass', gulp.registry().get('skin'))
			watch_css.push(`./assets/bbctopskin/css/**/*.css`)
			break;
		case 'plugins':
			gulp.watch(`${input.path}/sass/**/*.sass`, gulp.registry().get(input.value))
			watch_css.push(`${input.path}/css/**/*.css`)
			break;
		case 'corejs':
			bbctop.getScriptConfig(`./assets/bbctopskin`).jsWatch()
			bbctop.getWebpackConfig(`./assets/bbctopskin`).jsWebpackWatch()
			break;
	}

	gulp.watch(watch_css).on('change', function(file,e){
		log.info('Compiled %s', file)
	});

	if(input.type == 'skin' || input.type == 'plugins') bbctop.widgetsWatch()
}
let task = []

switch (input.type) {
	case 'skin':
		task = ['skin']
		break;
	case 'plugins':
		task = [input.value]
		break;
	case 'corejs':
		if(bbctop.js_build_task)
			task = bbctop.js_build_task
		break;
}
if(bbctop.widgets_build_task && task)
	task = task.concat(bbctop.widgets_build_task)
else if(bbctop.widgets_build_task)
	task = bbctop.widgets_build_task
console.log(bbctop.widgets_build_task)
const build = gulp.series(...task)

const watch = gulp.parallel(watchFiles);
// export tasks

// exports.scripts = scripts;
// exports.images = images;
// exports.fonts = fonts;
// exports.clean = clean;
// for (let i in path) {
// 	exports[i] = global[i];
// }
// exports.ui_sass = ui_sass;
// // exports.ui = ui;
// exports.cms_sass = cms_sass;
// exports.system_sass = system_sass;
// exports.backend_sass = backend_sass;

// exports.views = views;
exports.build = build;
exports.watch = watch;
exports.default = build;