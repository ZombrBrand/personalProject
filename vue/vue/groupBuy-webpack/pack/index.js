/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(8);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(9);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../node_modules/_css-loader@0.28.10@css-loader/index.js!./item.css", function() {
		var newContent = require("!!../../../node_modules/_css-loader@0.28.10@css-loader/index.js!./item.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var router = __webpack_require__(4)

__webpack_require__(16)

var app = new Vue({
	el: '#app',
	router: router,
	data: {
		search: '',
		searchValue: ''
	},
	computed: {
		searchShow: function() {
			return this.$route.path.indexOf('detail') < 0
		}
	},
	methods: {
		seachResult: function() {
			if(this.search === '') {
				return
			}
			this.searchValue = this.search
			this.search = ''
		},
		goBack: function() {
			history.go(-1) //控制浏览器返回键
		}
	}
})

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var Home = __webpack_require__(5)
var List = __webpack_require__(10)
var Detail = __webpack_require__(13)

var routes = [{
	path: '/home',
	component: Home
}, {
	path: '/list/:type/:id',
	component: List
}, {
	path: '/detail/:id',
	component: Detail
}, {
	path: '*',
	redirect: '/home'
}]

module.exports = new VueRouter({
	routes: routes
})

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(6)
__webpack_require__(2)

module.exports = Vue.extend({
	template: '#home',
	data: function() {
		return {
			types: [{
					id: 1,
					url: 'img/icon/01.png',
					text: '美食'
				},
				{
					id: 2,
					url: 'img/icon/02.png',
					text: '电影'
				},
				{
					id: 3,
					url: 'img/icon/03.png',
					text: '酒店'
				},
				{
					id: 4,
					url: 'img/icon/04.png',
					text: '休闲'
				},
				{
					id: 5,
					url: 'img/icon/05.png',
					text: '外卖'
				},
				{
					id: 6,
					url: 'img/icon/06.png',
					text: 'ktv'
				},
				{
					id: 7,
					url: 'img/icon/07.png',
					text: '周边游'
				},
				{
					id: 8,
					url: 'img/icon/08.png',
					text: '丽人'
				},
				{
					id: 9,
					url: 'img/icon/09.png',
					text: '小吃'
				},
				{
					id: 10,
					url: 'img/icon/10.png',
					text: '火车票'
				}
			],
			ad: [],
			list: []
		}
	},
	created: function() {
		this.$http
			.get('./data/home.json', {
				params: {
					id: this.$route.params.id
				}
			})
			.then(function(res) {
				var data = res.data
				if(data && data.errno === 0) {
					this.ad = data.data.ad
					this.list = data.data.list
				}

			})
	}
})

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(7);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../node_modules/_css-loader@0.28.10@css-loader/index.js!./home.css", function() {
		var newContent = require("!!../../../node_modules/_css-loader@0.28.10@css-loader/index.js!./home.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "/*首页icon样式*/\r\n\r\n.home .types {\r\n\tdisplay: flex;\r\n\tflex-wrap: wrap;\r\n\tjustify-content: space-between;\r\n\tbackground-color: #fff;\r\n\tpadding: 10px 0;\r\n\tmargin-bottom: 10px;\r\n\ttext-align: center;\r\n}\r\n\r\n.home .types li {\r\n\twidth: 20%;\r\n}\r\n\r\n.home .types a {\r\n\tdisplay: block;\r\n}\r\n\r\n.home .types li img {\r\n\twidth: 60%;\r\n}\r\n\r\n.home .types li span {\r\n\tdisplay: block;\r\n\tmargin: 0 10px 5px 10px;\r\n\tfont-size: 12px;\r\n}\r\n\r\n\r\n/*广告栏样式*/\r\n\r\n.home .activity {\r\n\tdisplay: flex;\r\n\tflex-wrap: wrap;\r\n\tjustify-content: flex-start;\r\n\tbackground-color: #fff;\r\n\tmargin-bottom: 10px;\r\n}\r\n\r\n.home .activity li {\r\n\twidth: 33.33333333%;\r\n\tborder-right: 1px solid #ccc;\r\n\tpadding: 15px 0;\r\n\ttext-align: center;\r\n\tbox-sizing: border-box;\r\n}\r\n\r\n.home .activity li:last-child {\r\n\tborder-right: none;\r\n}\r\n\r\n.home .activity li img {\r\n\twidth: 60%;\r\n}\r\n\r\n.home .activity h3 {\r\n\tfont-size: 18px;\r\n}\r\n\r\n.home .activity p {\r\n\tfont-size: 14px;\r\n\tmargin: 10px 0;\r\n}", ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "/*产品列表页*/\r\n\r\n.product {\r\n\tbackground-color: #fff;\r\n\tpadding: 0 10px;\r\n}\r\n\r\n.product h3 {\r\n\tfont-size: 18px;\r\n\tfont-weight: normal;\r\n\tpadding: 10px 0;\r\n}\r\n\r\n.product li {\r\n\tpadding: 10px 0;\r\n\tborder-top: 1px solid #ccc;\r\n}\r\n\r\n.product a {\r\n\tdisplay: block;\r\n}\r\n\r\n.product img {\r\n\twidth: 100px;\r\n}\r\n\r\n.product .right {\r\n\tpadding-left: 110px;\r\n\tfont-size: 12px;\r\n}\r\n\r\n.product p {\r\n\theight: 45px;\r\n\tfont-size: 14px;\r\n\tfont-weight: 700;\r\n}\r\n\r\n.product .price {\r\n\tcolor: #06C1AE;\r\n\tmargin-right: 5px;\r\n}", ""]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(11)
__webpack_require__(2)

module.exports = Vue.extend({
	template: '#list',
	props: ['search'],
	data: function() {
		return {
			order: [{
					id: 'price',
					text: '价格排序'
				},
				{
					id: 'sales',
					text: '销量排序'
				},
				{
					id: 'evaluate',
					text: '好评排序'
				},
				{
					id: 'discount',
					text: '优惠排序'
				}
			],
			list: [],
			other: [],
			toggle: true
		}
	},
	created: function() {
		this.$http
			.get('./data/list.json', {
				params: {
					id: this.$route.params.id
				}
			})
			.then(function(res) {
				var data = res.data
				if(data && data.errno === 0) {
					this.list = data.data.slice(0, 3)
					this.other = data.data.slice(3)
				}

			})
	},
	computed: {
		listFilter: function(v) {
			var _this = this
			_this.other = _this.other.filter(function(item) {
				return item.title.indexOf(_this.search) >= 0
			})
			return _this.list.filter(function(item) {
				return item.title.indexOf(_this.search) >= 0
			})
		}
	},
	methods: {
		showList: function() {
			this.list = this.list.concat(this.other)
			this.other = []
		},
		orderList: function(value) {
			if(value === "discount") {
				this.list.sort(function(a, b) {
					a = a['originPrice'] - a['price']
					b = b['originPrice'] - b['price']

					return a - b
				})
			}

			if(this.toggle) {
				this.list.sort(function(a, b) {
					return a[value] - b[value]
				})
				this.toggle = false
			} else {
				this.list.sort(function(a, b) {
					return b[value] - a[value]
				})
				this.toggle = true
			}
		}
	}
})

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(12);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../node_modules/_css-loader@0.28.10@css-loader/index.js!./list.css", function() {
		var newContent = require("!!../../../node_modules/_css-loader@0.28.10@css-loader/index.js!./list.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".list .order-list {\r\n\tdisplay: flex;\r\n\tjustify-content: space-around;\r\n\tbackground-color: #fff;\r\n\ttext-align: center;\r\n}\r\n\r\n.list .order-list li {\r\n\tposition: relative;\r\n\twidth: 25%;\r\n\tpadding: 5px 0;\r\n\tfont-size: 12px;\r\n}\r\n\r\n.list .order-list li+li {\r\n\tborder-left: 1px solid #ccc;\r\n}\r\n\r\n.list .order-list span.arrow,\r\n.list .order-list span.arrow::after {\r\n\tposition: absolute;\r\n\ttop: 50%;\r\n\tright: 12px;\r\n\tmargin-top: -2px;\r\n\tborder: 5px solid transparent;\r\n\tborder-top-color: #000;\r\n}\r\n\r\n\r\n/*.list .order-list span.arrow::after {\r\n\tcontent: '';\r\n\ttop: -5px;\r\n\tleft: -5px;\r\n\tborder-top-color: #fff;\r\n}*/\r\n\r\n.list .load-more {\r\n\theight: 40px;\r\n\tborder-top: 1px solid #ccc;\r\n\tborder-bottom: 1px solid #ccc;\r\n\tbackground-color: #fff;\r\n\tline-height: 40px;\r\n\ttext-align: center;\r\n\tcolor: #06C1AE;\r\n}\r\n\r\n.list .center {\r\n\tposition: relative;\r\n\twidth: 180px;\r\n\tmargin: 0 auto;\r\n}\r\n\r\n.list .center .arrow {\r\n\tposition: absolute;\r\n\ttop: 50%;\r\n\tright: 6px;\r\n\tmargin-top: -3px;\r\n\tborder: 10px solid transparent;\r\n\tborder-top-color: #06C1AE;\r\n}\r\n\r\n.list .center .white {\r\n\ttop: -9px;\r\n\tright: -10px;\r\n\tborder-top-color: #fff;\r\n}", ""]);

// exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(14)

module.exports = Vue.extend({
	template: '#detail',
	data: function() {
		return {
			data: ''
		}
	},
	created: function() {
		this.$http
			.get('data/product.json', {
				params: {
					id: this.$route.params.id
				}
			})
			.then(function(res) {
				var data = res.data
				if(data.errno === 0) {
					this.data = data.data
				}
			})
	}
})

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(15);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../node_modules/_css-loader@0.28.10@css-loader/index.js!./detail.css", function() {
		var newContent = require("!!../../../node_modules/_css-loader@0.28.10@css-loader/index.js!./detail.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "/*详情页*/\r\n.detail .banner {\r\n\tposition: relative;\r\n}\r\n\r\n.detail .banner img {\r\n\tdisplay: block;\r\n\twidth: 100%;\r\n}\r\n\r\n.detail .banner .caption {\r\n\tposition: absolute;\r\n\tleft: 20px;\r\n\tbottom: 20px;\r\n\tcolor: #fff\r\n}\r\n\r\n.detail .banner .caption h2 {\r\n\tmargin: 5px;\r\n}\r\n\r\n.detail .price-col {\r\n\theight: 60px;\r\n\tpadding: 5px 10px;\r\n\tbackground-color: #fff;\r\n\tborder-bottom: 1px solid #ccc;\r\n}\r\n\r\n.detail .price-col .price {\r\n\tfont-size: 38px;\r\n\tcolor: #06C1AE;\r\n}\r\n\r\n.detail .price-col .btn {\r\n\tpadding: 10px 15px;\r\n\tbackground-color: #f60;\r\n\tcolor: #fff;\r\n\tfont-size: 14px;\r\n\tmargin-top: 13px;\r\n}\r\n\r\n.detail .return-purchase {\r\n\tdisplay: flex;\r\n\tflex-wrap: wrap;\r\n\tbackground-color: #fff;\r\n\tpadding: 15px 10px 0;\r\n\tmargin-bottom: 10px;\r\n}\r\n\r\n.detail .return-purchase li {\r\n\twidth: 50%;\r\n\tmargin-bottom: 10px;\r\n\tcolor: yellowgreen;\r\n\tfont-size: 14px;\r\n}\r\n\r\n.detail .return-purchase li:last-child {\r\n\tcolor: #000;\r\n}\r\n\r\n.detail .store-information {\r\n\tbackground-color: #fff;\r\n\tpadding: 10px;\r\n\tline-height: 30px;\r\n\tmargin-bottom: 5px;\r\n}\r\n\r\n.detail .store-information h2 {\r\n\tpadding-bottom: 10px;\r\n\tborder-bottom: 1px solid #ccc;\r\n\tfont-weight: 500;\r\n}\r\n\r\n.detail .store-information .address {\r\n\tpadding: 15px 0;\r\n\tborder-bottom: 1px solid #ccc;\r\n}\r\n\r\n.detail .branch a {\r\n\tdisplay: block;\r\n\tpadding-top: 5px;\r\n\tcolor: skyblue;\r\n\tfont-size: 16px;\r\n}\r\n\r\n.detail .announcement {\r\n\tbackground-color: #fff;\r\n\tpadding: 10px;\r\n}\r\n\r\n.detail .announcement h2 {\r\n\tpadding-bottom: 10px;\r\n\tborder-bottom: 1px solid #ccc;\r\n\tfont-weight: 500;\r\n}\r\n\r\n.detail .announcement ul {\r\n\tpadding: 10px 0;\r\n}\r\n\r\n.detail .announcement li h3 {\r\n\tcolor: #f90;\r\n\tline-height: 50px;\r\n\tfont-weight: normal;\r\n}\r\n\r\n.detail .announcement li p {\r\n\tline-height: 30px;\r\n}/*详情页*/\r\n.detail .banner {\r\n\tposition: relative;\r\n}\r\n\r\n.detail .banner img {\r\n\tdisplay: block;\r\n\twidth: 100%;\r\n}\r\n\r\n.detail .banner .caption {\r\n\tposition: absolute;\r\n\tleft: 20px;\r\n\tbottom: 20px;\r\n\tcolor: #fff\r\n}\r\n\r\n.detail .banner .caption h2 {\r\n\tmargin: 5px;\r\n}\r\n\r\n.detail .price-col {\r\n\theight: 60px;\r\n\tpadding: 5px 10px;\r\n\tbackground-color: #fff;\r\n\tborder-bottom: 1px solid #ccc;\r\n}\r\n\r\n.detail .price-col .price {\r\n\tfont-size: 38px;\r\n\tcolor: #06C1AE;\r\n}\r\n\r\n.detail .price-col .btn {\r\n\tpadding: 10px 15px;\r\n\tbackground-color: #f60;\r\n\tcolor: #fff;\r\n\tfont-size: 14px;\r\n\tmargin-top: 13px;\r\n}\r\n\r\n.detail .return-purchase {\r\n\tdisplay: flex;\r\n\tflex-wrap: wrap;\r\n\tbackground-color: #fff;\r\n\tpadding: 15px 10px 0;\r\n\tmargin-bottom: 10px;\r\n}\r\n\r\n.detail .return-purchase li {\r\n\twidth: 50%;\r\n\tmargin-bottom: 10px;\r\n\tcolor: yellowgreen;\r\n\tfont-size: 14px;\r\n}\r\n\r\n.detail .return-purchase li:last-child {\r\n\tcolor: #000;\r\n}\r\n\r\n.detail .store-information {\r\n\tbackground-color: #fff;\r\n\tpadding: 10px;\r\n\tline-height: 30px;\r\n\tmargin-bottom: 5px;\r\n}\r\n\r\n.detail .store-information h2 {\r\n\tpadding-bottom: 10px;\r\n\tborder-bottom: 1px solid #ccc;\r\n\tfont-weight: 500;\r\n}\r\n\r\n.detail .store-information .address {\r\n\tpadding: 15px 0;\r\n\tborder-bottom: 1px solid #ccc;\r\n}\r\n\r\n.detail .branch a {\r\n\tdisplay: block;\r\n\tpadding-top: 5px;\r\n\tcolor: skyblue;\r\n\tfont-size: 16px;\r\n}\r\n\r\n.detail .announcement {\r\n\tbackground-color: #fff;\r\n\tpadding: 10px;\r\n}\r\n\r\n.detail .announcement h2 {\r\n\tpadding-bottom: 10px;\r\n\tborder-bottom: 1px solid #ccc;\r\n\tfont-weight: 500;\r\n}\r\n\r\n.detail .announcement ul {\r\n\tpadding: 10px 0;\r\n}\r\n\r\n.detail .announcement li h3 {\r\n\tcolor: #f90;\r\n\tline-height: 50px;\r\n\tfont-weight: normal;\r\n}\r\n\r\n.detail .announcement li p {\r\n\tline-height: 30px;\r\n}", ""]);

// exports


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(17);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../node_modules/_css-loader@0.28.10@css-loader/index.js!./app.css", function() {
		var newContent = require("!!../node_modules/_css-loader@0.28.10@css-loader/index.js!./app.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "* {\r\n\tpadding: 0;\r\n\tmargin: 0;\r\n\tlist-style: none;\r\n}\r\n\r\nbody {\r\n\tbackground-color: #efefef;\r\n}\r\n\r\ninput {\r\n\tborder: none;\r\n\toutline: none;\r\n}\r\n\r\na,\r\na:hover,\r\na:visited,\r\na:link,\r\na:active {\r\n\tcolor: #333;\r\n\ttext-decoration: none;\r\n\t-webkit-tap-highlight-color: rgba(255, 0, 0, 0);\r\n}\r\n\r\np {\r\n\tfont-size: 16px;\r\n\tfont-weight: normal;\r\n}\r\n\r\n.clearfix:after {\r\n\tcontent: '';\r\n\tdisplay: block;\r\n\tclear: both;\r\n}\r\n\r\n.f-l {\r\n\tfloat: left;\r\n}\r\n\r\n.f-r {\r\n\tfloat: right;\r\n}\r\n\r\n.color-0 {\r\n\tcolor: red;\r\n}\r\n\r\n.color-1 {\r\n\tcolor: green;\r\n}\r\n\r\n.color-2 {\r\n\tcolor: purple;\r\n}\r\n\r\n.header {\r\n\tbackground-color: #06C1AE;\r\n\theight: 60px;\r\n\tline-height: 60px;\r\n\tcolor: #fff;\r\n\tpadding: 0 15px;\r\n}\r\n\r\n.header h1 {\r\n\tpadding-left: 30px;\r\n\ttext-align: center;\r\n\tfont-size: 26px;\r\n}\r\n\r\n.header .login {\r\n\theight: 60px;\r\n\tpadding-top: 5px;\r\n\tbox-sizing: border-box;\r\n}\r\n\r\n.header .goback {\r\n\tposition: relative;\r\n}\r\n\r\n.header .goback .arrow {\r\n\tposition: absolute;\r\n\tleft: 0;\r\n\ttop: 23px;\r\n\tborder: 10px solid transparent;\r\n\tborder-right-color: #fff;\r\n}\r\n\r\n.header .goback .arrow.green {\r\n\tborder-right-color: #06c1ae;\r\n\tleft: 3px;\r\n}\r\n\r\n.search {\r\n\tpadding: 10px 20px;\r\n\tbackground-color: #fff;\r\n}\r\n\r\n.search input {\r\n\twidth: 100%;\r\n\tpadding: 10px 20px;\r\n\tbackground-color: #efefef;\r\n\tbox-sizing: border-box;\r\n\tborder-radius: 19px;\r\n}", ""]);

// exports


/***/ })
/******/ ]);