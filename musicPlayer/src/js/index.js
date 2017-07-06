$(function(){
    var viewWidth = $(window).width(),
        viewHeight = $(window).height()
        desWidth = 640,
        musicId = 0,
        $main = $('#main'),
        $contentUl = $('.music-content .content-ul'),
        $musicTitle = $('#music-list .music-title'),
        $contentUlList = $('.content-ul-list'),
        $musicdetails = $('#musicdetails'),
        $detailsAllTime = $('#detailsAllTime'),
        $detailsNowTime = $('#detailsNowTime'),
        $detaols_tip = $('.detaols-tip'),
        $detailsAudioProUp = $('#detailsAudioProUp'),
        $detailsAudioProBar = $('#detailsAudioProBar'),
        $detailsAudioPro = $musicdetails.find('.details-audioPro');
        $audio = $('.audio'),
        $audioBtn = $audio.find('.audio-btn'),
        $detailsPlay = $musicdetails.find('.details-play'),
        oAudio = $('#loadAudio').get(0),
        touchstart = 'touchstart',
        touchmove = 'touchmove',
        touchend = 'touchend';
    
    /**
     * 初始化播放器
     */
    function init(){
        device();
        musicList.init();
        musicDetails.init();
        musicAudio.init();
    }

    /**
     * 兼容移动端和PC端
     */
    function device(){
        // navigator.userAgent获取用户代理值（PC还是移动端）
        var isMobile = /Mobile/i.test(navigator.userAgent);

        if(viewWidth > desWidth){
            $main.css('width',desWidth + 'px');
        }

        if(!isMobile){
            touchstart = 'mousedown';
            touchmove = 'mousemove';
            touchend = 'mouseup';
        }
    }

    /**
     * js操作音乐列表页
     */
    var musicList = (function(){
        var musicListUrl = '../../musicList.php',
            bbsUrl = 'http://bbs.miaov.com/forum.php?mod=viewthread&tid=14670s',
            parentH = $('.music-content').height(),
            childH = 0,
            count = 0,
            downY = 0,
            //  downT获取当前UL定位top值
            downT = 0,
            prevY = 0,
            speed = 0,
            onoff1 = true,
            onoff2 = true,
            onoff3 = true,
            isReq = true,
            timer = null;
           

        function init(){ //初始化
            // for(var i = 0; i < 20; i++){
                start();
            // }   
            
            bin();
            moveScroll()
        };

        function bin(){
            $musicTitle.on(touchstart,function(){   //点击title跳转页面
                window.location = bbsUrl;
            });

            $contentUl.on(touchend,'li',function(){
                if(onoff3){
                    $(this).attr('class','content-ul-list active').siblings().attr('class','content-ul-list');
                    
                    // 获取元素中保存的歌曲ID，通过ajax获取点击后该歌曲的所有信息
                    musicId = $(this).attr('musicid');
                    musicAudio.id(musicId);
                }
            });
    
            $audio.on('click',function(){
                if(musicId){
                    musicDetails.sildeUp();
                }
            });
        };

        function start(){
            isReq = false;

            data(function(data){
                isReq = true;
                $.each(data,function(idx,obj){
                    var $node = createDom(obj);
                    // console.log($node)
                    $contentUl.append($node);
                    childH += $node.outerHeight(true);                   
                });
                // console.log(childH)
                if(childH < parentH && isReq) {
                    start();
                }             
            });  
        }

        function data(callback){    //获取音乐数据
            $.ajax({
                url: musicListUrl,
                type: 'GET',
                dataType: 'json'
                // jsonp:'callback',
                // jsonpCallback: "callbackName"
            }).done(function(data){
                callback(data);
            }).fail(function(){
                console.log('请求失败，请重新刷新页面！')
            })          
        };

        function createDom(data){
            // var li = '<li class="content-ul-list"><h3 class="title">' + data[0].title + '</h3><p class="name">' + data[0].artist + '</p></li>'
            var li = '<li musicid="'+ data.id +'" class="content-ul-list"><h3 class="title">'+(data.musicName)+'</h3><p class="name">'+(data.name)+'</p></li>';            
            return $(li)
        };

        function moveScroll(){  //滑动列表
            // $(document).on(touchmove,function(eve){ //阻止页面的默认事件
            //     eve.preventDefault();
            // })

            $contentUl.on(touchstart,function(eve){
                // 如何请求数据后，Ul小于列表页，不做任何滑动
                // if(parentH > childH){ return false };

                // eve.originalEvent -> 将jQ的event转为js的event
                // 移动端获取eve事件需要eve.originalEvent.changedTouches可以获取点击的坐标
                var touch = eve.originalEvent.changedTouches ? eve.originalEvent.changedTouches[0]:eve;
                // console.log(touch)

                var This = this,
                    onoff1 = true,
                    onoff2 = true;
                
                onoff3 = true;
                downY1 = touch.pageY;
                downT = $(this).position().top; //jQ的position()方法获取当前元素定位值
                
                timer && clearInterval(timer);  //判断定时器是否开启，有则清除

                // $(this).before('<div class="loading"></div>')
                
                $(document).on(touchmove + '.move',function(eve){
                    onoff3 = false;

                    var touch = eve.originalEvent.changedTouches ? eve.originalEvent.changedTouches[0]:eve,
                        iTop = $(This).position().top;

                    // 获取鼠标或者手指滑动速度
                    speed = touch.pageY - prevY;
                    prevY = touch.pageY;

                    if(iTop >= 0){  //控制列表头部下拉时的距离
                        if(onoff1){
                            onoff1 = false;
                            downY = touch.pageY
                        }                 
                        $(This).css('transform','translate3d(0,'+ ((touch.pageY - downY) / 5) + 'px,0)')    //除于3是为了降低滑动的距离
                    }else if(iTop <= (parentH - childH)){   //控制列表尾部下拉时的距离
                        if(onoff2){
                            onoff2 = false;
                            downY = touch.pageY;
                            // console.log(downY)
                        }   
                        $(This).css('transform','translate3d(0,'+ ((touch.pageY - downY) / 3 + (parentH - childH)) + 'px,0)')                        
                    }else{
                        $(This).css('transform','translate3d(0,'+ (touch.pageY - downY + downT) + 'px,0)')
                    }
                });

                $(document).on(touchend + '.move',function(){
                    // var $loading = $('.loading');

                    //  当鼠标放开下按的时候，取消命名空间为.move的事件
                    $(this).off('.move');

                    timer && clearInterval(timer);

                    if(!onoff3){
                        timer = setInterval(function(){ //通过定时器去做恢复列表动画
                            var iTop = $(This).position().top;
                            if(Math.abs(speed) <= 1 || iTop > 50 || iTop < parentH - childH){
                                timer && clearInterval(timer);
                                if(iTop >= 0){
                                    // $loading.fadeOut(200);
                                    $(This).css({transition:'.2s'});
                                    $(This).css('transform','translate3d(0,0,0)');
                                    // $contentUl.empty();
                                    // childH = 0;
                                    // start();                               
                                }else if(iTop <= parentH - childH){
                                    $(This).css({transition:'.2s'})
                                    $(This).css('transform','translate3d(0,'+ (parentH - childH) +'px,0)')
                                }
                            }else{
                                speed *= 0.7;   //将速度减慢
                                $(This).css('transform','translate3d(0,'+ (iTop + speed) +'px,0)')
                            }
                        },13)
                    }
                    
                })

                return false;   //阻止事件冒泡
            });

            // transition在webkit和firefox无法使用removeProperty去掉transition的效果
            // transition一旦定义将会永久执行，所以会导致出现滑动列表的卡顿现象
            // 所以使用transitonend事件，让过度动画结束后，将transition清空
            $contentUl.on('transitonend webkitTransitionEnd',function(){
				$(this).css('transition','');
			});
        };


        function show(sName,sMusicName,sImg){
            $audio.find('img').attr('src','./img/' + sImg);
            $audio.find('h3').html(sMusicName);
            $audio.find('p').html(sName);
            $audio.find('.audio-btn').show();        
        }

        return {
            init: init,
            show: show
        }

    })();

    var musicDetails = (function(){ //音乐详情页操作
        function init(){
            $musicdetails.css('transform','translate3d(0,' + viewHeight + 'px,0)');

            bin();
        };

        function sildeUp(){
            $musicdetails.css('transition','0.5s');
            $musicdetails.css('transform','translate3d(0,0,0)');
        };

        function sildeDown(){
            $musicdetails.css('transform','translate3d(0,' + viewHeight + 'px,0)');
        };

        function bin(){
            $detaols_tip.on('click',function(){
                sildeDown();
            })
        }

        function show(sName,sMusicName,sImg){
            $musicdetails.find('.details-name').html(sMusicName + '<span>' + sName + '</span>')
        }

        return {
            init: init,
            sildeUp: sildeUp,
            show: show
        };
    })();

    var musicAudio = (function(){   //音乐播放操作
        var onoff = true,
            timer = null,
            scale = 0,
            disX = 0,
            parenW = $detailsAudioPro.width();

        function init(){
            bin();
        };

        function id(id){
            $.ajax({
                url: '../../musicAudio.php',
                type: 'GET',
                dataType: 'json',
                data: {
                    id: id
                }
            }).done(function(data){
                show(data)
            }).fail(function(){
                console.log('请求失败，请重新请求！')
            })
        };

        function bin(){
            $audioBtn.add($detailsPlay).on(touchstart,function(){
                if(onoff){
                    play();
                }else{
                    pause();
                }

                return false;
            });

            $detailsAudioProBar.on(touchstart,function(eve){
                var touch = eve.originalEvent.changedTouches ? eve.originalEvent.changedTouches[0]:eve;
                var This = this;

                disX = touch.pageX - $(this).position().left;
                timer && clearInterval(timer);

                $(document).on(touchmove + '.move',function(eve){
                    var touch = eve.originalEvent.changedTouches ? eve.originalEvent.changedTouches[0]:eve;
                    var L = touch.pageX - disX;

                    if(L <= 0){
                        L = 0;
                    }else if(L >= parenW){
                        L = parenW;
                    }

                    $(This).css('left',L);

                });
                $(document).on(touchend + '.move',function(){
                    $(this).off('.move');

                })
            });
        }

        // 保存通过id获取当前歌曲的所有信息，并触发对应列表页的dom修改
        function show(obj){
            var sName = obj.name,
                sMusicName = obj.musicName,
                sLyric = obj.lyric,
                sImg = obj.img,
                sAudio = obj.audio;             
            
            musicList.show(sName,sMusicName,sImg);
            musicDetails.show(sName,sMusicName,sImg);
            oAudio.src = '../../img/' + sAudio;
            $(oAudio).one('canplaythrough',function(){
                play();
                $detailsAllTime.html(formatTime(oAudio.duration));
            });
        };

        function play(){    //播放
            onoff = false;

            $audio.find('img').addClass('Imgrotate');
            $audioBtn.css('backgroundImage',"url('../img/list_audioPause.png')");
            $detailsPlay.css('backgroundImage',"url('../img/details_pause.png')");
            oAudio.play();
            playing();
            timer && clearInterval(timer);
            setInterval(playing,1000);
        };

        function pause(){   //暂停
            onoff = true;

            $audio.find('img').removeClass('Imgrotate');
            $audioBtn.css('backgroundImage',"url('../img/list_audioPlay.png')");
            $detailsPlay.css('backgroundImage',"url('../img/details_play.png')");
            oAudio.pause();
        };

        function formatTime(num){   //转换获取的音频时长
            var iM = Math.floor(num % 3600 / 60),
                iS = Math.floor(num % 60)

            return toZero(iM) + ':' + toZero(iS);
        }

        function toZero(num){
            if(num < 10){
                return '0' + num;
            }else{
                return '' + num;
            }
        }

        function playing(){ //播放进行中
            $detailsNowTime.html(formatTime(oAudio.currentTime));
            scale = oAudio.currentTime / oAudio.duration;
            $detailsAudioProUp.css('width',scale * 100 + '%');
            $detailsAudioProBar.css('left',scale * 100 + '%');
        }

        return {
            init: init,
            id: id
        }
    })();

    init();
});