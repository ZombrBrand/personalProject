// class
class Person{
	constructor(name){
		this.name = name;
		this.hobbies = [];
	}

	getName(){
		console.log(this.name);
		return this.name
	}

	get hobby(){
		return this.hobbies
	}

	set hobby(hobby){
		this.hobbies.push(hobby);
	}
}

// class Student继承Person
class Student extends Person {
	constructor(name){
		// 初始化父类的constructor
		super(name);
	}

	sayHello(){
		console.log('hello')
	}

	// 重置父类getName()方法
	getName(){
		console.log(super.getName(),this.name);
	}
}