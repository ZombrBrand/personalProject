<template>
	<div @wheel="scollPage($event)">
		<transition-group :name="name" tag="div"
			@enter="enter"
			@leave="leave"
		>
			<div class="block" v-for="(item,index) in bgColor" :key="index" :style="{'background-color':item}" v-show="curIndex === index" @transitionend="end">
				{{ index+1 }}

				<slot v-if="index+1 === 2" :state="state" :curIndex="curIndex"></slot>


			</div>
		</transition-group>
	</div>
</template>

<script>
export default {
	props: {
		bgColor: Array
	},
	data() {
		return {
			name: '',
			flag: true,
			curIndex: 0,
			endCount: 0,
			state: ''
		}
	},
	methods: {
		scollPage(e) {
			if (e.deltaY > 0) {
				if (this.curIndex >= this.bgColor.length - 1) {
					// this.endCount = 0
					this.flag = true
					return
				}
				// 向下滚
				if (this.flag) {
					this.flag = false
					this.name = "down"
					this.curIndex++;
				}
			}
			if (e.deltaY < 0) {
				if (this.curIndex <= 0) {
					// this.endCount = 0
					this.flag = true
					return
				}
				// 向上滚
				if (this.flag) {
					this.flag = false
					this.name = "up"
					this.curIndex--;
				}
			}
		},
		end() {
			this.endCount++;
			if (this.endCount >= 2) {
				this.flag = true
				this.endCount = 0
				// this.state = 'transitionEnd'
			}
		},
		enter(el,done){
			this.state = "enter"
		},
		leave(el,done){
			this.state = "leave"
		}
	}
}
</script>

<style scoped lang='scss'>
.block {
	position: absolute;
	width: 100%;
	height: 100%;
	color: #fff;
	font-size: 24px;
	text-align: center;
}

.down-enter-active {
	transition: all 1s ease;
	transform: translateY(0);
}

.down-leave-active {
	transition: all 1s ease;
	transform: translateY(-100%);
}

.down-enter {
	transform: translateY(100%);
}

.down-leave {
	transform: translateY(0);
}

.up-enter-active {
	transition: all 1s ease;
	transform: translateY(0);
}

.up-leave-active {
	transition: all 1s ease;
	transform: translateY(100%);
}

.up-enter {
	transform: translateY(-100%);
}

.up-leave {
	transform: translateY(0);
}
</style>
