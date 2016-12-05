/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(3);


/***/ },

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(73);
	
	var _util = __webpack_require__(72);
	
	var TEMPLATE = '\n    <div class="bg-light"></div>\n    <div class="logo"></div>\n    <div class="light-lazer"></div>\n    <div class="light-point"></div>\n    <div class="human"></div>\n    <div class="progress">\u5DF2\u52A0\u8F7D<b>20</b>%</div>\n';
	
	var ready = (0, _util.domready)();
	
	var loadPreloadManifest = function loadPreloadManifest() {
	    return new _util.Promise(function (resolve, reject) {
	        var queue = new _util.createjs.LoadQueue(true);
	
	        queue.on('fileload', function (e) {
	            var item = e.item;
	
	
	            var el = _util.doc.querySelector('.' + item.id);
	            el.style.backgroundImage = 'url(' + item.src + ')';
	        });
	
	        var progressTextEl = _util.doc.querySelector('.progress b');
	
	        queue.on('progress', function (e) {
	            var loaded = e.loaded,
	                total = e.total;
	
	
	            var percent = (loaded / total).toFixed(2);
	            var all = Math.round(percent * 30 + 20);
	            progressTextEl.textContent = String(all);
	        });
	
	        queue.on('error', reject);
	
	        queue.on('complete', resolve);
	
	        queue.loadManifest({
	            path: 'assets/preload/',
	            manifest: [{ id: 'bg-dark', src: 'bg-1.jpg' }, { id: 'bg-light', src: 'bg-2.jpg' }, { id: 'human', src: 'human.png' }, { id: 'light-point', src: 'light-1.png' }, { id: 'light-lazer', src: 'light-2.png' }, { id: 'logo', src: 'logo.jpg' }]
	        });
	    });
	};
	
	var bgLightEl = void 0;
	function processBackground(percent) {
	    bgLightEl = bgLightEl || _util.doc.querySelector('.bg-light');
	    bgLightEl.style.opacity = String(percent);
	}
	
	var lightPointEl = void 0;
	var lightLazerEl = void 0;
	function processLight(percent) {
	    lightPointEl = lightPointEl || _util.doc.querySelector('.light-point');
	    lightLazerEl = lightLazerEl || _util.doc.querySelector('.light-lazer');
	
	    if (percent >= 0.6 && percent < 0.9) {
	        lightPointEl.className = 'light-point anime';
	        lightLazerEl.className = 'light-lazer anime';
	    } else if (percent >= 0.9) {
	        lightPointEl.className = 'light-point anime end';
	        lightLazerEl.className = 'light-lazer anime end';
	    }
	}
	
	var logoEl = void 0;
	function processLogo(percent) {
	    logoEl = logoEl || _util.doc.querySelector('.logo');
	    if (percent >= 0.9 && percent < 1) {
	        logoEl.className = 'logo anime';
	    } else if (percent >= 1) {
	        logoEl.className = 'logo anime end';
	    }
	}
	
	var loadGameManifest = function loadGameManifest() {
	    return new _util.Promise(function (resolve, reject) {
	        var queue = new _util.createjs.LoadQueue(true);
	
	        var progressTextEl = _util.doc.querySelector('.progress b');
	
	        queue.on('progress', function (e) {
	            var loaded = e.loaded,
	                total = e.total;
	
	
	            var percent = (loaded / total).toFixed(2);
	            var all = Math.round(percent * 50 + 50);
	            progressTextEl.textContent = String(all);
	            processBackground(percent);
	            processLight(all / 100);
	            processLogo(all / 100);
	        });
	
	        queue.on('error', reject);
	
	        queue.on('complete', resolve);
	
	        queue.loadManifest({
	            path: 'assets/game/',
	            manifest: ['galaxy-1.jpg', 'galaxy-2.jpg', 'galaxy-3.jpg']
	        });
	
	        queue.loadManifest({
	            path: 'dist/',
	            manifest: ['game.js']
	        });
	    });
	};
	
	(0, _util.domready)().then(function () {
	    _util.doc.body.setAttribute('id', 'preload');
	    _util.doc.body.className = 'bg-dark';
	    _util.doc.body.innerHTML = TEMPLATE;
	
	    return loadPreloadManifest();
	}).then(function () {
	
	    return loadGameManifest();
	}).then(function () {
	    return window.startGame;
	});

/***/ },

/***/ 72:
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var win = window;
	var doc = win.document,
	    Promise = win.Promise,
	    createjs = win.createjs;
	
	
	function appendStyle(cssText) {
	    var style = doc.createElement('style');
	    style.textContent = cssText;
	    doc.getElementsByTagName('head')[0].appendChild(style);
	}
	
	function domready() {
	    return new Promise(function (resolve, reject) {
	        if (doc.readyState === 'complete') {
	            resolve();
	        } else {
	            doc.addEventListener('DOMContentLoaded', resolve);
	        }
	    });
	}
	
	function delay(time) {
	    return new Promise(function (resolve, reject) {
	        setTimeout(resolve, time);
	    });
	}
	
	exports.win = win;
	exports.doc = doc;
	exports.Promise = Promise;
	exports.createjs = createjs;
	exports.appendStyle = appendStyle;
	exports.domready = domready;
	exports.delay = delay;

/***/ },

/***/ 73:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(74);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(76)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/.0.25.0@css-loader/index.js!./preload.css", function() {
				var newContent = require("!!./../node_modules/.0.25.0@css-loader/index.js!./preload.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 74:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(75)();
	// imports
	
	
	// module
	exports.push([module.id, "#preload {\n    width: 100%;\n    height: 100%;\n    background-position: left bottom;\n    background-repeat: no-repeat;\n    background-size: cover;\n    position: relative;\n}\n\n#preload .bg-light {\n    width: 100%;\n    height: 100%;\n    background-position: left bottom;\n    background-repeat: no-repeat;\n    background-size: cover;\n    opacity: 0;\n    -webkit-transition: opacity 0.4s linear 0s;\n    position: relative;\n}\n\n#preload .human {\n    position: absolute;\n    width: 1.68rem;\n    height: 3.36rem;\n    background-position: left bottom;\n    background-repeat: no-repeat;\n    background-size: cover;\n    left: 0.53rem;\n    bottom: 0.133rem;\n}\n\n#preload .light-point {\n    position: absolute;\n    width: 2.2rem;\n    height: 2.2rem;\n    background-position: left bottom;\n    background-repeat: no-repeat;\n    background-size: cover;\n    opacity: 0;\n    left: 1.05rem;\n    bottom: 2.35rem;\n}\n\n#preload .light-point.anime {\n    -webkit-transition: opacity 0.4s linear 0s;\n    opacity: 1;\n}\n\n#preload .light-point.anime.end {\n    -webkit-transition: none;\n    opacity: 1;\n}\n\n#preload .light-lazer {\n    position: absolute;\n    width: 7.36rem;\n    height: 10.33rem;\n    background-position: left bottom;\n    background-repeat: no-repeat;\n    background-size: cover;\n    left: 2rem;\n    bottom: 3.4rem;\n    opacity: 0;\n    -webkit-transform: rotate(0deg);\n    -webkit-transform-origin: 0 bottom;\n}\n\n#preload .light-lazer.anime {\n    -webkit-transition: opacity 0.6s linear 0s;\n    -webkit-animation: lazer-swing 1s linear 0.6s infinite alternate;\n    opacity: 1;\n}\n\n#preload .light-lazer.anime.end {\n    -webkit-transition: none;\n    -webkit-animation: none;\n    opacity: 1;\n}\n\n@-webkit-keyframes lazer-swing {\n    0% {\n        -webkit-transform: rotate(-15deg);\n    }\n\n    100% {\n        -webkit-transform: rotate(15deg);\n    }\n}\n\n#preload .logo {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    background-position: left bottom;\n    background-repeat: no-repeat;\n    background-size: cover;\n    left: 0;\n    bottom: 0;\n    opacity: 0;\n}\n\n#preload .logo.anime {\n    -webkit-transition: opacity 0.6s linear 0s;\n    opacity: 1;\n}\n\n#preload .logo.anime.end {\n    -webkit-transition: none;\n    opacity: 1;\n}\n\n#preload .progress {\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    color: #FFF;\n    font-size: 20px;\n    display: -webkit-box;\n    -webkit-box-pack: center;\n    -webkit-box-align: center;\n}", ""]);
	
	// exports


/***/ },

/***/ 75:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
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


/***/ },

/***/ 76:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
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
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
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
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }

/******/ });
//# sourceMappingURL=preload.js.map