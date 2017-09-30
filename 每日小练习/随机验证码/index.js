function str(num1, num2) {
		let a = ''
		for (let i = 0; i < num2; i++) {
			a += i
		}
		for (let i = 0; i < num1; i++) {
			a += String.fromCharCode(65 + i); //输出A-Z  26个大写字母
		}
		for (let i = 0; i < num1; i++) {
			a += String.fromCharCode(97 + i); //输出a-z  26个小写字母
		}
		return a
	}