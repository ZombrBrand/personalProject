var gulp = require('gulp');

// css压缩插件
var cssnano = require('gulp-cssnano');

// 文件合并
var concat = require('gulp-concat');

// 删除文件插件
var rimraf = require('gulp-rimraf');

// 一行配置实现文件名添加MD5并替换原有链接

/*
	例子
	var md5 = require("gulp-md5-plus");
	 
	gulp.src("./src/*.css")
	    .pipe(md5(10,'./output/index.html'))
	    .pipe(gulp.dest("./dist"));
*/

var md5 = require('gulp-md5-plus');


var gulp = require('gulp');
var rev = require('gulp-rev'); //娣诲姞鐗堟湰鍙�
var revReplace = require('gulp-rev-replace'); //鐗堟湰鍙锋浛鎹�
var useref = require('gulp-useref'); //瑙ｆ瀽html璧勬簮瀹氫綅
var gulpif = require('gulp-if');
var filter = require('gulp-filter');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso'); //css浼樺寲鍘嬬缉
var clean = require('gulp-clean');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');

gulp.task("dist:img", () =>
    gulp.src('src/imgs/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/imgs'))
);


gulp.task("dist:css", function() {
    gulp.src('dist/css/*').pipe(clean());
    return gulp.src('src/**/*.less')
        .pipe(less())
        .pipe(csso())
        .pipe(concat('merge.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'))
})

gulp.task("src:css", function() {
    gulp.src('src/css/*').pipe(clean());
    return gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('src/css'))
})

gulp.task("dist:js", function() {
    gulp.src('dist/js/*').pipe(clean());
    return gulp.src('src/**/*.js')
        .pipe(uglify())
        .pipe(concat('merge.js'))
        .pipe(gulp.dest('dist/js'))
})

gulp.task("revision", ['dist:css', 'dist:js'], function() {
    return gulp.src(["dist/**/*.css", "dist/**/*.js"])
        .pipe(rev())
        .pipe(gulp.dest('dist'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist'))
})

gulp.task("index", ["revision"], function() {
    var manifest = gulp.src("./dist/rev-manifest.json");

    return gulp.src("src/index.html")
        .pipe(revReplace({
            manifest: manifest
        }))
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

gulp.task("watch", function() {
    gulp.watch('src/**/*.less', ['src:css'])
})


gulp.task('connect', function() {
    connect.server({
        root: 'src',
        livereload: true
    });
});

gulp.task('reload', function() {
    gulp.src('src/*.html')
        .pipe(connect.reload());
});

gulp.task('change', function() {
    gulp.watch(['src/**/*'], ['src:css', 'reload']);
});

gulp.task('server', ['connect', "change"]);





// 分析代码
// var jshint = require('gulp-jshint');

// 任务出错，继续执行并返回报错
// var plumber = require('gule-plumber');

// 创建gulp任务
// gulp.task('build:css',function(){

// 	// 压缩代码前先删除相应的文件，因为有时候会导致不更新
// 	gulp.src('./dist/css/*.css')
// 		.pipe(rimraf({force:true}))

// 	// 需要输出的文档位置
// 	gulp.src('./src/css/*.css')
// 		.pipe(concat('index-merge.css'))
// 		.pipe(cssnano())
// 		.pipe(gulp.dest('dist/css/'))

// });

// gulp.task('build:js',function(){

// 	gulp.src('./dist/css/*.js')
// 		.pipe(rimraf({force:true}))

// 	gulp.src('./src/js/*.js')
// 		// .pipe(plumber())
// 		// .pipe(jshint())
// 		// .pipe(jshint.reporter('default'))
// 		.pipe(uglify())
// 		.pipe(concat('index-merge.js'))
// 		.pipe(gulp.dest('dist/js/'))
// })

// //	相当于合并数组里的任务同时进行，由于是defaule，所以命令行可以只输入gulp
// gulp.task('aa',['build:css','build:js'])