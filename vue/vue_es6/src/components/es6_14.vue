<template>

</template>

<script>
export default {
	data() {
		es6_14()
		return {

		}
	}
}

// 二进制数组
function es6_14() {
// 	es6中二进制数组包括：
// 	ArrayBuffer对象
// 	TypedArray视图
// 	DataView视图
// 	ArrayBuffer对象代表原始的二进制数据，TypedArray视图用来读写简单类型的二进制数据，DataView视图用来读写复杂类型的二进制数据。

// 	以ArrayBuffer对象为例：

// 	<input type='file' name='fileInput' id='fileInput' v-on:change='showImg' />
// 		<img :src="buffer" />

// 		<script>
// 			function arrayBufferToBase64( buffer ) {
//         var binary = '';
//         var bytes = new Uint8Array( buffer );
//         var len = bytes.byteLength;
//         for (var i = 0; i < len; i++) {
// 				binary += String.fromCharCode(bytes[i]);
// 			}
//         return window.btoa( binary );
//     }
// var thisa;
// export default {
// 				name: 'hello',
//   data () {
// 				studyEs6();
// 			return {
// 				buffer:'data:image/png;base64,',
//       msg: '欢迎 to Your Vue.js App',

//     }
//   },
//   created (){
// 				thisa = this;
// 			},
//   methods: {
// 				showImg:function(){
//       //alert(thisa);
//        var fileInput = document.getElementById('fileInput');
//         //alert(fileInput);
//         var file = fileInput.files[0];
//         //alert(file);
//         var reader = new FileReader();
//         //alert(reader);
//         reader.readAsArrayBuffer(file);
//         reader.onload = function () {
//           var arrayBuffer = reader.result;//reader.result.toByteArray;
//           //alert(thisa.msg);
//           let arrayBase = arrayBufferToBase64(arrayBuffer);
//           thisa.buffer='data:image/png;base64,'+arrayBase;
//         };
//     }
//   }
// }
// function studyEs6(){

// 			}
}
</script>

