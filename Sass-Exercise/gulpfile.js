const gulp = require('gulp');
const browseSync = require('browser-sync').create();
const sass = require('gulp-sass');
const reload = browseSync.reload;

gulp.task('sass',function(){
    return gulp.src('./sass/index.scss')
               .pipe(sass({
                   outputStyle:'expanded'
               }).on('error',sass.logError))
               .pipe(gulp.dest('./css'))
               .pipe(reload({stream:true}));       
})

gulp.task("default",function(){
    browseSync.init({
        server:{
            baseDir:'./'
        },
        port:'1222'
    });
    gulp.watch('./sass/*.scss',['sass']);
    gulp.watch('./*.html').on('change',reload);
})