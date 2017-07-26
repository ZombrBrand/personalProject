const gulp = require('gulp');
const browseSync = require('browser-sync').create();
const babel = require('gulp-babel');
const reload = browseSync.reload

gulp.task('js',function(){
    gulp.src('./src/index.js')
        .pipe(babel({
            presets:['es2015']
        }))
        .pipe(gulp.dest('./dist/'))
        .pipe(reload({stream:true}))
});

gulp.task("default",function(){
    browseSync.init({
        server:{
            baseDir:'./'
        },
        port:'1222'
    });
    gulp.watch('src/*.js',['js'])
})