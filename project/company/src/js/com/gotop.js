var goTop = (function(){
	function GoTop($ct){
		this.$ct = $ct;
		this.isScroll = true;
		this.init();
		this.bind();
	}

	GoTop.prototype = {

		init: function(){
			this.$nav = this.$ct.find('.nav');

			var $goTop = this.$goTop = $('<span>回到顶部</span>');
			$goTop.addClass('go-top');
			this.$ct.find('body').append($goTop);
		},

		bind: function(){
			var _this = this;

			this.$goTop.on('click',function(){
				_this.gotop();
			})

			this.$ct.on('scroll',function(){
				_this.scroll()				
			})
		},

		gotop: function(){
			$('html,body').stop().animate({
				scrollTop: 0
			},500)

		},

		scroll: function(){
			var $scroll = this.$ct.scrollTop();
			var _this = this;

			if($scroll > 500 && $scroll < 600){
				this.$goTop.stop().animate({
					right: 0
				},500,function(){
					_this.isScroll = true;
				});
				this.$nav.stop().fadeOut(300);
			}else if($scroll < 500){
				this.$goTop.stop().animate({
					right: '-110px'
				},500);
				this.$nav.stop().fadeIn(300);
			}
		}
	}

	return {
		init: function($ct){
			new GoTop($ct);
		}
	}

})()


