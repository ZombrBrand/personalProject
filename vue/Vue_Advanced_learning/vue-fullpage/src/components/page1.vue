<template>
	<div class="letter">
		<span v-for="(item,index) in codes" :key="index" v-html="item"></span>
		<span v-show="flags">|</span>
	</div>
</template>

<script>
export default {
	props: ['state', 'curindex'],
	data() {
		return {
			flags: true,
			letter: 'AVueProject'.split('').concat(['<br />', '<div>{</div>'], 'return "lzijian"'.split(''), ['<br />', '}']),
			letterIndex: 0,
			codes: [],
			timer1: null,
			timer2: null
		}
	},
	methods: {
		addCode() {
			this.codes.push(this.letter[this.letterIndex])
			this.letterIndex++;
		},
		showChage() {
			this.flags = !this.flags
			this.clearCode()
		},
		clearCode() {
			if (this.letterIndex >= this.letter.length) {
				this.stop()
			}
		},
		start() {
			this.timer1 = setInterval(this.addCode, 250)
			this.timer2 = setInterval(this.showChage, 250)
		},
		stop() {
			clearInterval(this.timer1)
			clearInterval(this.timer2)
			this.flags = false
			this.timer1 = null
			this.timer2 = null
		}
	},
	watch: {
		curindex() {
			if (this.state === "enter") {
				if (this.curindex === 1) {
					this.start()
				}
				if (this.curindex != 1) {
					this.stop()
					this.codes = []
					this.letterIndex = 0
				}
			}
			if (this.state == "leave") {
				if (this.curindex === 1) {
					this.start()
				}
				if (this.curindex !== 1) {
					this.stop()
					this.codes = []
					this.letterIndex = 0
				}
			}
		}
	}
}
</script>

<style scoped lang='scss'>
.letter {
	position: absolute;
	bottom: 30px;
	left: 10px;
	font-size: 36px;
	text-align: left;
}
</style>
