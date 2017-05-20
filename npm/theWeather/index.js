#!/usr/bin/env node

var axios = require('axios');

var data = {}

// process.argv会返回node的运行目录和当前js文件地址
// 命令行输出文件后面添加信息如：node xxx.js hello 则将会当作第三参数添加到process.argv数组里

// console.log(process.argv);

if(process.argv[2]){
	data.params = {
		city: process.argv[2]
	}
}

axios.get('http://api.jirengu.com/weather.php',data)
	.then(function(response){
		var data = response.data,
			index = data.results[0].index,
			weather_data = data.results[0].weather_data;

		console.log('当天日期：' + data.date);
		console.log('城市：' + data.results[0].currentCity);
		console.log('PM2.5：' + data.results[0].pm25);

		console.log('')
		console.log('建议：')
		console.log('')

		for(var i = 0; i < index.length; i++){
			var count = 0;

			for(var k in index[i]){
				count++
				if(count === 4){
					console.log('  ' + index[i]['title'] + ':' + index[i]['zs'])
					console.log('  ' + index[i]['tipt'] + ':' + index[i]['des'])
					console.log('')
				}
			}
		}

		console.log('')
		console.log('一周天气预报：')
		console.log('')

		for(var i = 0; i < weather_data.length; i++){
			var arr = [],
				count = 0;

			for(var k in weather_data[i]){
				if(k === 'dayPictureUrl' || k === 'nightPictureUrl'){
					continue;
				}else{
					arr.push(weather_data[i][k]);
				}
			}
			console.log('  ' + arr.join(','));
		}
		

		// console.log('weather_data：' + data.results[0].weather_data[0]);
	})
	.catch(function(error){
		console.log(error);
	});


