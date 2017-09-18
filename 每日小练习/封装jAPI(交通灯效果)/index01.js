const traffic = document.querySelector('#traffic')

var stateList = ['wait','stop','pass'],
		currenStateindex = 0;

setInterval(animate,2000);

function animate(){
	var state = stateList[currenStateindex]
	traffic.className = state

	currenStateindex = (currenStateindex + 1) % stateList.length
}

