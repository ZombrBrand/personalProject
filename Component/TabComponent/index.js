// function Tabswitch($ct){
// 	  		this.ct = $ct;
// 	  		this.uls = $ct.children();
// 	  		this.init();
// 	  		this.bind();
// 	  	}

// Tabswitch.prototype = {
// 	init: function(){
// 		this.optionCar = this.uls.eq(0);
// 		this.optionCont = this.uls.eq(1);
// 		this.carLis = this.optionCar.children();
// 		this.contLis = this.optionCont.children();
// 	},

// 	bind: function(){
// 		var _this = this;
// 		var carLis = this.carLis
// 		var contLis = this.contLis;
// 		carLis.on('click',function(){
// 			var $this = $(this)
// 			var $index = $this.index();
// 			$this.siblings().removeClass('active');
// 			$this.addClass('active');

// 			contLis.removeClass('show');
// 			contLis.eq($index).addClass('show');
// 		})
// 	}
// }

function Tabswitch(ct){
	this.ct = ct;
	// console.log(this.ct)
	this.init();
	this.bind();
}

Tabswitch.prototype = {

	init: function(){
		this.optionsCar = this.ct.children[0];
		this.optionsCont = this.ct.children[1];
		this.carLis = this.optionsCar.children;
		this.contLis = this.optionsCont.children;
	},

	bind: function(){
		// console.log(this.carLis)
		var carLis = this.carLis;
		var contLis = this.contLis;
		[].forEach.call(carLis,function(carLi){
			carLi.addEventListener('click',function(e){
				var index = [].indexOf.call(carLis,e.target);

				[].forEach.call(carLis,function(node){
					node.classList.remove('active');
				})
				this.classList.add('active');

				[].forEach.call(contLis,function(node){
					node.classList.remove('show');
				})
				contLis[index].classList.add('show');

			})
		})

	}
}

