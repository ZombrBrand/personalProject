$(function(){
    var viewWidth = $(window).width(),
        desWidth = 640,
        $main = $('#main'),
        $contentUl = $('.music-content .content-ul');

    /**
     * 初始化播放器
     */
    function init(){
        device();
        musicList.init();
    }

    /**
     * 兼容移动端和PC端
     */
    function device(){
        if(viewWidth > desWidth){
            $main.css('width',desWidth + 'px');
        }
    }

    /**
     * js操作音乐列表页
     */
    var musicList = (function(){
        var musicListUrl = 'musicList.php';

        function init(){    //初始化
            data();
        }

        function data(){
            $.ajax({
                url: musicListUrl,
                type: 'GET',
                dataType: 'json'
            }).done(function(data){
                $.each(data,function(idx,obj){
                    var $li = '<li class="content-ul-list active"><h3 class="title">' + obj.musicName + '</h3><p class="name">' + obj.name + '</p></li>'
                    $contentUl.append($li);
                })
            }).fail(function(){
                console.log('请求失败，请重新刷新页面！')
            })
        }

        return {
            init: init
        };

    })();

    init();
    
});