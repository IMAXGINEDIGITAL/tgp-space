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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	var _util = __webpack_require__(6);
	
	var _scroller = __webpack_require__(61);
	
	var _scroller2 = _interopRequireDefault(_scroller);
	
	var _stage = __webpack_require__(121);
	
	var _stage2 = _interopRequireDefault(_stage);
	
	var _helloWorld = __webpack_require__(133);
	
	var _helloWorld2 = _interopRequireDefault(_helloWorld);
	
	var _cloud = __webpack_require__(136);
	
	var _cloud2 = _interopRequireDefault(_cloud);
	
	var _star = __webpack_require__(137);
	
	var _star2 = _interopRequireDefault(_star);
	
	var _elements = __webpack_require__(138);
	
	var _map = __webpack_require__(144);
	
	var _map2 = _interopRequireDefault(_map);
	
	var _ticker = __webpack_require__(147);
	
	var _ticker2 = _interopRequireDefault(_ticker);
	
	var _pop = __webpack_require__(163);
	
	var _pop2 = _interopRequireDefault(_pop);
	
	var _textConfig = __webpack_require__(166);
	
	var _textConfig2 = _interopRequireDefault(_textConfig);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var preload = _util.win.assetsPreload,
	    items = _util.win.assetsItems;
	
	
	var scrollSlowRatio = 0.5;
	var viewport = (0, _util.query)(_util.doc.body, '#game');
	var scroller = void 0;
	var ticker = void 0;
	var stage = void 0;
	var helloWorld = void 0;
	var cloud = void 0;
	var star = void 0;
	var elements = void 0;
	var elementCount = void 0;
	var map = void 0;
	var pop = void 0;
	
	function showTip(config) {
	    elementCount && elementCount.show({
	        tip: config.tip,
	        bgType: config.bgType
	    });
	}
	
	function showPop(config) {
	    scroller && (scroller.enable = false);
	
	    return pop && pop.popup({
	        title: config.title,
	        text: config.text,
	        shareble: config.shareble,
	        bgType: config.bgType,
	        onleftclick: function onleftclick() {
	            pop.close().then(function () {
	                return scroller.enable = true;
	            });
	        },
	        onrightclick: function onrightclick() {
	            pop.close().then(function () {
	                return scroller.enable = true;
	            });
	        },
	        oncloseclick: function oncloseclick() {
	            pop.close().then(function () {
	                return scroller.enable = true;
	            });
	        }
	    });
	}
	
	preload.then(function () {
	    // prevent event
	    viewport.addEventListener('touchstart', function (e) {
	        return e.preventDefault();
	    });
	    viewport.addEventListener('touchmove', function (e) {
	        return e.preventDefault();
	    });
	    viewport.addEventListener('touchend', function (e) {
	        return e.preventDefault();
	    });
	}).then(function () {
	    // ticker
	    ticker = new _ticker2.default();
	    ticker.run();
	}).then(function () {
	    // helloworld
	    helloWorld = new _helloWorld2.default(viewport, items);
	    return helloWorld.ready();
	}).then(function () {
	    // stage
	    stage = new _stage2.default(viewport);
	    return stage.ready();
	}).then(function () {
	    // scroller
	    scroller = new _scroller2.default(stage.width, stage.height, stage.vw, stage.vh, scrollSlowRatio);
	    scroller.enable = false;
	    return scroller.ready();
	}).then(function () {
	    // things
	    var promises = [];
	
	    star = new _star2.default(stage, items);
	    promises.push(star.ready());
	
	    elements = new _elements.Elements(stage, items);
	    promises.push(elements.ready());
	
	    cloud = new _cloud2.default(stage, items);
	    promises.push(cloud.ready());
	
	    return _util.Promise.all(promises);
	}).then(function () {
	    // render
	    var firstRendered = false;
	    var scrollX = 0;
	    var scrollY = 0;
	    var starRollY = stage.vh;
	    var starRollId = ticker.add(function () {
	        starRollY -= starRollSpeed;
	        if (starRollY < 0) {
	            starRollY = stage.vh;
	        }
	    });
	    var starRollSpeed = 1;
	    var showTextId = void 0;
	    var showGlodId = void 0;
	    var flyCoinId = void 0;
	    var clearCloudId = void 0;
	    var hoverSlice = stage.getHoverSlice(0, 0);
	    var focusSlice = stage.getFocusSlice(stage.sliceWidth / 2, stage.sliceHeight / 2);
	
	    scroller.on('scrollstart', function (e) {
	        if (clearCloudId) {
	            ticker.delete(clearCloudId);
	            clearCloudId = null;
	        }
	    });
	
	    scroller.on('scrolling', function (e) {
	        scrollX = e.x;
	        scrollY = e.y;
	        hoverSlice = stage.getHoverSlice(scrollX, scrollY);
	        focusSlice = stage.getFocusSlice(scrollX + stage.sliceWidth / 2, scrollY + stage.sliceHeight / 2);
	    });
	
	    scroller.on('scrollend', function (e) {
	        if (focusSlice) {
	            clearCloudId = ticker.add(cloud.clear(focusSlice));
	            if (focusSlice.type >= 2) {
	                showTextId = ticker.add(elements.showText(focusSlice));
	            }
	        }
	    });
	
	    scroller.on('tap', function (e) {
	        if (e.originalEvent.target === stage.canvas && focusSlice) {
	            (function () {
	                var tapFocusSlice = stage.getFocusSlice(e.ex, e.ey);
	                if (tapFocusSlice) {
	                    showGlodId = ticker.add(elements.showGold(tapFocusSlice));
	                    ticker.end(showGlodId).then(function () {
	                        return flyCoinId = ticker.add(elements.flyCoin(tapFocusSlice));
	                    });
	                }
	            })();
	        }
	    });
	
	    ticker.on('aftertick', function (e) {
	        elementCount && elementCount.update(stage.specialAmount, stage.specialFound, stage.totalAmount, stage.focusedAmount);
	
	        elements.drawImages(hoverSlice, focusSlice, scrollX, scrollY);
	        cloud.drawImages(hoverSlice, focusSlice, scrollX, scrollY);
	
	        stage.offscreenRender.clearRect(0, 0, stage.vw, stage.vh);
	        stage.offscreenRender.drawImage(star.image, 0, starRollY, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);
	        stage.offscreenRender.drawImage(elements.canvas, 0, 0, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);
	        stage.offscreenRender.drawImage(cloud.canvas, 0, 0, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);
	
	        stage.render.clearRect(0, 0, stage.vw, stage.vh);
	        stage.render.drawImage(stage.offscreenCanvas, 0, 0, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);
	    });
	}).then(function () {
	    // show helloworld
	    var repeat = 8;
	    var promise = _util.Promise.resolve();
	
	    for (var i = 0; i < repeat; i++) {
	        promise = promise.then(function () {
	            var tickerId = ticker.add(helloWorld.play());
	            return ticker.end(tickerId);
	        }).then(function () {
	            return (0, _util.delay)(500 + Math.random() * 500);
	        });
	    }
	
	    return promise.then(function () {
	        return (0, _util.delay)(1000);
	    }).then(function () {
	        return helloWorld.ending();
	    });
	}).then(function () {
	    // pop
	    pop = new _pop2.default(viewport);
	    return pop.ready();
	}).then(function () {
	    // map
	    map = new _map2.default(viewport, stage.hSlice, stage.vSlice);
	
	    scroller.on('scrolling', function (e) {
	        var xp = e.x / stage.width;
	        var yp = e.y / stage.height;
	        map.update(xp, yp);
	    });
	
	    scroller.on('scrollend', function (e) {
	        var xp = e.x / stage.width;
	        var yp = e.y / stage.height;
	        map.clear(xp, yp);
	
	        var focusSlice = stage.getFocusSlice(e.x + stage.sliceWidth / 2, e.y + stage.sliceHeight / 2);
	        if (focusSlice && focusSlice.distance) {
	            map.text(focusSlice.distance);
	        }
	    });
	
	    return map.ready();
	}).then(function () {
	    // elements count
	    elementCount = new _elements.ElementCount(viewport, items);
	
	    elementCount.on('update', function (_ref) {
	        var found = _ref.found,
	            amount = _ref.amount,
	            total = _ref.total,
	            focus = _ref.focus;
	
	        var config = void 0;
	
	        if (found === amount && focus === total) {
	            config = _textConfig2.default['gg'];
	        } else if (focus === total) {
	            config = _textConfig2.default['blacksheepwall'];
	        } else {
	            config = _textConfig2.default['found' + found];
	        }
	
	        if (config) {
	            if (config.type === 'tip') {
	                showTip(config);
	            } else if (config.type === 'popup') {
	                showPop(config);
	            }
	        }
	    });
	
	    return elementCount.ready();
	}).then(function () {
	    // bone
	    var boneX = stage.width / 2 - stage.vw / 2;
	    var boneY = stage.height - stage.vh / 2;
	    scroller.enable = true;
	    scroller.scrollTo(boneX, boneY);
	}).then(function () {
	    return (0, _util.delay)(2000);
	}).then(function () {
	    // show guide
	    return showPop(_textConfig2.default.gl);
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/.0.25.0@css-loader/index.js!./game.css", function() {
				var newContent = require("!!./../node_modules/.0.25.0@css-loader/index.js!./game.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "#game {\n    width: 100%;\n    height: 100%;\n    padding: 0;\n    margin: 0;\n}", ""]);
	
	// exports


/***/ },
/* 4 */
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
/* 5 */
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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.caf = exports.raf = exports.getDistance = exports.getRect = exports.queryAll = exports.query = exports.img2Canvas = exports.loadImg = exports.delay = exports.domready = exports.appendStyle = exports.createjs = exports.Promise = exports.defer = exports.doc = exports.win = undefined;
	
	var _toConsumableArray2 = __webpack_require__(7);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
	
	function defer() {
	    var deferred = {};
	    var promise = new Promise(function (resolve, reject) {
	        deferred.resolve = resolve;
	        deferred.reject = reject;
	    });
	    deferred.promise = promise;
	    return deferred;
	}
	
	function delay(time) {
	    return new Promise(function (resolve, reject) {
	        setTimeout(resolve, time);
	    });
	}
	
	function query(viewport, selector) {
	    return viewport.querySelector(selector);
	}
	
	function queryAll(viewport, selector) {
	    return [].concat((0, _toConsumableArray3.default)(viewport.querySelectorAll(selector)));
	}
	
	function getRect(el) {
	    return el.rects || (el.rects = el.getBoundingClientRect());
	}
	
	function getDistance(x1, y1, x2, y2) {
	    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
	}
	
	function loadImg(src) {
	    var image = new Image();
	
	    return [image, new Promise(function (resolve, reject) {
	        image.onload = function () {
	            return resolve(image);
	        };
	        image.src = src;
	    })];
	}
	
	function img2Canvas(image, width, height) {
	    var canvas = doc.createElement('canvas');
	    canvas.width = width;
	    canvas.height = height;
	    var context = canvas.getContext('2d');
	    context.drawImage(image, 0, 0, width, height);
	    return [canvas, context];
	}
	
	var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (fn) {
	    return setTimeout(fn, 1 / 60);
	};
	
	var caf = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || function (id) {
	    clearTimeout(id);
	};
	
	exports.win = win;
	exports.doc = doc;
	exports.defer = defer;
	exports.Promise = Promise;
	exports.createjs = createjs;
	exports.appendStyle = appendStyle;
	exports.domready = domready;
	exports.delay = delay;
	exports.loadImg = loadImg;
	exports.img2Canvas = img2Canvas;
	exports.query = query;
	exports.queryAll = queryAll;
	exports.getRect = getRect;
	exports.getDistance = getDistance;
	exports.raf = raf;
	exports.caf = caf;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _from = __webpack_require__(8);
	
	var _from2 = _interopRequireDefault(_from);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }
	
	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(9), __esModule: true };

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(10);
	__webpack_require__(54);
	module.exports = __webpack_require__(18).Array.from;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(11)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(14)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(12)
	  , defined   = __webpack_require__(13);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(15)
	  , $export        = __webpack_require__(16)
	  , redefine       = __webpack_require__(31)
	  , hide           = __webpack_require__(21)
	  , has            = __webpack_require__(32)
	  , Iterators      = __webpack_require__(33)
	  , $iterCreate    = __webpack_require__(34)
	  , setToStringTag = __webpack_require__(50)
	  , getPrototypeOf = __webpack_require__(52)
	  , ITERATOR       = __webpack_require__(51)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(17)
	  , core      = __webpack_require__(18)
	  , ctx       = __webpack_require__(19)
	  , hide      = __webpack_require__(21)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 17 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 18 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(20);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(22)
	  , createDesc = __webpack_require__(30);
	module.exports = __webpack_require__(26) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(23)
	  , IE8_DOM_DEFINE = __webpack_require__(25)
	  , toPrimitive    = __webpack_require__(29)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(26) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(24);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(26) && !__webpack_require__(27)(function(){
	  return Object.defineProperty(__webpack_require__(28)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(27)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(24)
	  , document = __webpack_require__(17).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(24);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(21);

/***/ },
/* 32 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(35)
	  , descriptor     = __webpack_require__(30)
	  , setToStringTag = __webpack_require__(50)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(21)(IteratorPrototype, __webpack_require__(51)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(23)
	  , dPs         = __webpack_require__(36)
	  , enumBugKeys = __webpack_require__(48)
	  , IE_PROTO    = __webpack_require__(45)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(28)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(49).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(22)
	  , anObject = __webpack_require__(23)
	  , getKeys  = __webpack_require__(37);
	
	module.exports = __webpack_require__(26) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(38)
	  , enumBugKeys = __webpack_require__(48);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(32)
	  , toIObject    = __webpack_require__(39)
	  , arrayIndexOf = __webpack_require__(42)(false)
	  , IE_PROTO     = __webpack_require__(45)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(40)
	  , defined = __webpack_require__(13);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(41);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(39)
	  , toLength  = __webpack_require__(43)
	  , toIndex   = __webpack_require__(44);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(12)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(12)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(46)('keys')
	  , uid    = __webpack_require__(47);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(17)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 47 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 48 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(17).document && document.documentElement;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(22).f
	  , has = __webpack_require__(32)
	  , TAG = __webpack_require__(51)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(46)('wks')
	  , uid        = __webpack_require__(47)
	  , Symbol     = __webpack_require__(17).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(32)
	  , toObject    = __webpack_require__(53)
	  , IE_PROTO    = __webpack_require__(45)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(13);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(19)
	  , $export        = __webpack_require__(16)
	  , toObject       = __webpack_require__(53)
	  , call           = __webpack_require__(55)
	  , isArrayIter    = __webpack_require__(56)
	  , toLength       = __webpack_require__(43)
	  , createProperty = __webpack_require__(57)
	  , getIterFn      = __webpack_require__(58);
	
	$export($export.S + $export.F * !__webpack_require__(60)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(23);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(33)
	  , ITERATOR   = __webpack_require__(51)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(22)
	  , createDesc      = __webpack_require__(30);
	
	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(59)
	  , ITERATOR  = __webpack_require__(51)('iterator')
	  , Iterators = __webpack_require__(33);
	module.exports = __webpack_require__(18).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(41)
	  , TAG = __webpack_require__(51)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(51)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;
	
	var _getPrototypeOf = __webpack_require__(62);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(66);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(67);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(71);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(96);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _util = __webpack_require__(6);
	
	__webpack_require__(104);
	
	var _event = __webpack_require__(105);
	
	var _event2 = _interopRequireDefault(_event);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Scroller = function (_Event) {
	    (0, _inherits3.default)(Scroller, _Event);
	
	    function Scroller(width, height, vw, vh) {
	        var scale = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
	        (0, _classCallCheck3.default)(this, Scroller);
	
	        var _this = (0, _possibleConstructorReturn3.default)(this, (Scroller.__proto__ || (0, _getPrototypeOf2.default)(Scroller)).call(this));
	
	        _this._isScrolling = false;
	        _this._enable = false;
	        _this._scale = scale;
	
	        _this.width = width;
	        _this.height = height;
	        _this.vw = vw;
	        _this.vh = vh;
	        _this.x = 0;
	        _this.y = 0;
	        _this.lx = 0;
	        _this.ly = 0;
	        return _this;
	    }
	
	    (0, _createClass3.default)(Scroller, [{
	        key: '_emit',
	        value: function _emit(name, originalEvent) {
	            var extra = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
	            var e = {
	                x: this.x,
	                y: this.y,
	                lx: this.lx,
	                ly: this.ly,
	                originalEvent: originalEvent
	            };
	
	            for (var key in extra) {
	                e[key] = extra[key];
	            }
	
	            this.emit(name, e);
	        }
	    }, {
	        key: 'ready',
	        value: function ready() {
	            var _this2 = this;
	
	            return new _util.Promise(function (resolve, reject) {
	                _this2._isScrolling = false;
	
	                var emitTap = function emitTap(e) {
	                    _this2._emit('tap', e, {
	                        ex: _this2.x + e.touch.clientX,
	                        ey: _this2.y + e.touch.clientY
	                    });
	                };
	
	                var emitStart = function emitStart(e) {
	                    _this2._isScrolling = true;
	                    _this2.lx = _this2.x;
	                    _this2.ly = _this2.y;
	                    _this2._emit('scrollstart', e);
	                };
	
	                var emitScroll = function emitScroll(e) {
	                    return _this2._emit('scrolling', e);
	                };
	
	                var emitEnd = function emitEnd(e) {
	                    _this2._isScrolling = false;
	                    _this2._emit('scrollend', e);
	                };
	
	                var calXY = function calXY(e, noScale) {
	                    var displacementX = e.displacementX,
	                        displacementY = e.displacementY;
	
	
	                    var scale = noScale ? 1 : _this2._scale;
	                    var x = _this2.lx - displacementX * scale;
	                    var y = _this2.ly - displacementY * scale;
	
	                    x = Math.min(Math.max(0, x), _this2.width - _this2.vw);
	                    y = Math.min(Math.max(0, y), _this2.height - _this2.vh);
	
	                    _this2.x = x;
	                    _this2.y = y;
	                    return true;
	                };
	
	                _util.doc.body.addEventListener('tap', function (e) {
	                    _this2._enable && emitTap(e);
	                });
	
	                _util.doc.body.addEventListener('panstart', function (e) {
	                    return _this2._enable && emitStart(e);
	                });
	
	                _util.doc.body.addEventListener('panmove', function (e) {
	                    return _this2._enable && calXY(e) && emitScroll(e);
	                });
	
	                _util.doc.body.addEventListener('panend', function (e) {
	                    return _this2._enable && emitEnd(e);
	                });
	
	                _this2.scrollTo = function (x, y) {
	                    emitStart();
	                    calXY({
	                        displacementX: _this2.x - x,
	                        displacementY: _this2.y - y
	                    }, true);
	                    emitScroll();
	                    emitEnd();
	                };
	
	                resolve();
	            });
	        }
	    }, {
	        key: 'isScrolling',
	        get: function get() {
	            return this._isScrolling;
	        }
	    }, {
	        key: 'scale',
	        get: function get() {
	            return this._scale;
	        },
	        set: function set(scale) {
	            this._scale = scale;
	        }
	    }, {
	        key: 'enable',
	        get: function get() {
	            return this._enable;
	        },
	        set: function set(enable) {
	            this._enable = enable;
	        }
	    }]);
	    return Scroller;
	}(_event2.default);
	
	exports.default = Scroller;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(63), __esModule: true };

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(64);
	module.exports = __webpack_require__(18).Object.getPrototypeOf;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(53)
	  , $getPrototypeOf = __webpack_require__(52);
	
	__webpack_require__(65)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(16)
	  , core    = __webpack_require__(18)
	  , fails   = __webpack_require__(27);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 66 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(68);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(69), __esModule: true };

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(70);
	var $Object = __webpack_require__(18).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(16);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(26), 'Object', {defineProperty: __webpack_require__(22).f});

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _typeof2 = __webpack_require__(72);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }
	
	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(73);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(80);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(74), __esModule: true };

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(10);
	__webpack_require__(75);
	module.exports = __webpack_require__(79).f('iterator');

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(76);
	var global        = __webpack_require__(17)
	  , hide          = __webpack_require__(21)
	  , Iterators     = __webpack_require__(33)
	  , TO_STRING_TAG = __webpack_require__(51)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(77)
	  , step             = __webpack_require__(78)
	  , Iterators        = __webpack_require__(33)
	  , toIObject        = __webpack_require__(39);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(14)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 77 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 78 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(51);

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(81), __esModule: true };

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(82);
	__webpack_require__(93);
	__webpack_require__(94);
	__webpack_require__(95);
	module.exports = __webpack_require__(18).Symbol;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(17)
	  , has            = __webpack_require__(32)
	  , DESCRIPTORS    = __webpack_require__(26)
	  , $export        = __webpack_require__(16)
	  , redefine       = __webpack_require__(31)
	  , META           = __webpack_require__(83).KEY
	  , $fails         = __webpack_require__(27)
	  , shared         = __webpack_require__(46)
	  , setToStringTag = __webpack_require__(50)
	  , uid            = __webpack_require__(47)
	  , wks            = __webpack_require__(51)
	  , wksExt         = __webpack_require__(79)
	  , wksDefine      = __webpack_require__(84)
	  , keyOf          = __webpack_require__(85)
	  , enumKeys       = __webpack_require__(86)
	  , isArray        = __webpack_require__(89)
	  , anObject       = __webpack_require__(23)
	  , toIObject      = __webpack_require__(39)
	  , toPrimitive    = __webpack_require__(29)
	  , createDesc     = __webpack_require__(30)
	  , _create        = __webpack_require__(35)
	  , gOPNExt        = __webpack_require__(90)
	  , $GOPD          = __webpack_require__(92)
	  , $DP            = __webpack_require__(22)
	  , $keys          = __webpack_require__(37)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(91).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(88).f  = $propertyIsEnumerable;
	  __webpack_require__(87).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(15)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);
	
	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(21)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(47)('meta')
	  , isObject = __webpack_require__(24)
	  , has      = __webpack_require__(32)
	  , setDesc  = __webpack_require__(22).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(27)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(17)
	  , core           = __webpack_require__(18)
	  , LIBRARY        = __webpack_require__(15)
	  , wksExt         = __webpack_require__(79)
	  , defineProperty = __webpack_require__(22).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(37)
	  , toIObject = __webpack_require__(39);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(37)
	  , gOPS    = __webpack_require__(87)
	  , pIE     = __webpack_require__(88);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 87 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 88 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(41);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(39)
	  , gOPN      = __webpack_require__(91).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(38)
	  , hiddenKeys = __webpack_require__(48).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(88)
	  , createDesc     = __webpack_require__(30)
	  , toIObject      = __webpack_require__(39)
	  , toPrimitive    = __webpack_require__(29)
	  , has            = __webpack_require__(32)
	  , IE8_DOM_DEFINE = __webpack_require__(25)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(26) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 93 */
/***/ function(module, exports) {



/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(84)('asyncIterator');

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(84)('observable');

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _setPrototypeOf = __webpack_require__(97);
	
	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);
	
	var _create = __webpack_require__(101);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _typeof2 = __webpack_require__(72);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }
	
	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(98), __esModule: true };

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(99);
	module.exports = __webpack_require__(18).Object.setPrototypeOf;

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(16);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(100).set});

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(24)
	  , anObject = __webpack_require__(23);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(19)(Function.call, __webpack_require__(92).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(102), __esModule: true };

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(103);
	var $Object = __webpack_require__(18).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(16)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(35)});

/***/ },
/* 104 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	(function (win) {
	
	    'use strict';
	
	    // major events supported:
	    // panstart
	    // panmove
	    // panend
	    // swipe
	    // longpress
	
	    // extra events supported:
	    // dualtouchstart
	    // dualtouch
	    // dualtouchend
	    // verticalpanstart
	    // horizontalpanstart
	    // verticalpanmove
	    // horizontalpanmove
	    // tap
	    // doubletap
	    // verticalswipe
	    // horizontalswipe
	    // pressend
	
	    var doc = win.document,
	        docEl = doc.documentElement,
	        slice = Array.prototype.slice,
	        gestures = {},
	        lastTap = null;
	
	    /**
	    * 找到两个结点共同的最小根结点
	    * 如果跟结点不存在，则返回null
	    *
	    * @param  {Element} el1 第一个结点
	    * @param  {Element} el2 第二个结点
	    * @return {Element}     根结点
	    */
	    function getCommonAncestor(el1, el2) {
	        var el = el1;
	        while (el) {
	            if (el.contains(el2) || el === el2) {
	                return el;
	            }
	            el = el.parentNode;
	        }
	        return null;
	    }
	
	    /**
	    * 触发一个事件
	    *
	    * @param  {Element} element 目标结点
	    * @param  {string}  type    事件类型
	    * @param  {object}  extra   对事件对象的扩展
	    */
	    function fireEvent(element, type, extra) {
	        var event = doc.createEvent('HTMLEvents');
	        event.initEvent(type, true, true);
	
	        if ((typeof extra === 'undefined' ? 'undefined' : _typeof(extra)) === 'object') {
	            for (var p in extra) {
	                event[p] = extra[p];
	            }
	        }
	
	        element.dispatchEvent(event);
	    }
	
	    /**
	    * 计算变换效果
	    * 假设坐标系上有4个点ABCD
	    * > 旋转：从AB旋转到CD的角度
	    * > 缩放：从AB长度变换到CD长度的比例
	    * > 位移：从A点位移到C点的横纵位移
	    *
	    * @param  {number} x1 上述第1个点的横坐标
	    * @param  {number} y1 上述第1个点的纵坐标
	    * @param  {number} x2 上述第2个点的横坐标
	    * @param  {number} y2 上述第2个点的纵坐标
	    * @param  {number} x3 上述第3个点的横坐标
	    * @param  {number} y3 上述第3个点的纵坐标
	    * @param  {number} x4 上述第4个点的横坐标
	    * @param  {number} y4 上述第4个点的纵坐标
	    * @return {object}    变换效果，形如{rotate, scale, translate[2], matrix[3][3]}
	    */
	    function calc(x1, y1, x2, y2, x3, y3, x4, y4) {
	        var rotate = Math.atan2(y4 - y3, x4 - x3) - Math.atan2(y2 - y1, x2 - x1),
	            scale = Math.sqrt((Math.pow(y4 - y3, 2) + Math.pow(x4 - x3, 2)) / (Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2))),
	            translate = [x3 - scale * x1 * Math.cos(rotate) + scale * y1 * Math.sin(rotate), y3 - scale * y1 * Math.cos(rotate) - scale * x1 * Math.sin(rotate)];
	        return {
	            rotate: rotate,
	            scale: scale,
	            translate: translate,
	            matrix: [[scale * Math.cos(rotate), -scale * Math.sin(rotate), translate[0]], [scale * Math.sin(rotate), scale * Math.cos(rotate), translate[1]], [0, 0, 1]]
	        };
	    }
	
	    /**
	    * 捕获touchstart事件，将每一个新增的触点添加到gestrues
	    * 如果之前尚无被记录的触点，则绑定touchmove, touchend, touchcancel事件
	    *
	    * 新增触点默认处于tapping状态
	    * 500毫秒之后如果还处于tapping状态，则触发press手势
	    * 如果触点数为2，则触发dualtouchstart手势，该手势的目标结点为两个触点共同的最小根结点
	    *
	    * @event
	    * @param  {event} event
	    */
	    function touchstartHandler(event) {
	
	        if (Object.keys(gestures).length === 0) {
	            docEl.addEventListener('touchmove', touchmoveHandler, false);
	            docEl.addEventListener('touchend', touchendHandler, false);
	            docEl.addEventListener('touchcancel', touchcancelHandler, false);
	        }
	
	        var gesture, touch, touchRecord, elements;
	
	        function genPressHandler(element, touch) {
	            return function () {
	                if (gesture.status === 'tapping') {
	                    gesture.status = 'pressing';
	
	                    fireEvent(element, 'longpress', {
	                        // add touch data for weex
	                        touch: touch,
	                        touches: event.touches,
	                        changedTouches: event.changedTouches,
	                        touchEvent: event
	                    });
	                }
	
	                clearTimeout(gesture.pressingHandler);
	                gesture.pressingHandler = null;
	            };
	        }
	
	        // record every touch
	        for (var i = 0; i < event.changedTouches.length; i++) {
	            touch = event.changedTouches[i];
	            touchRecord = {};
	
	            for (var _p in touch) {
	                touchRecord[_p] = touch[_p];
	            }
	
	            gesture = {
	                startTouch: touchRecord,
	                startTime: Date.now(),
	                status: 'tapping',
	                element: event.srcElement || event.target,
	                pressingHandler: setTimeout(genPressHandler(event.srcElement || event.target, event.changedTouches[i]), 500)
	            };
	            gestures[touch.identifier] = gesture;
	        }
	
	        if (Object.keys(gestures).length === 2) {
	            elements = [];
	
	            for (var p in gestures) {
	                elements.push(gestures[p].element);
	            }
	
	            fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouchstart', {
	                touches: slice.call(event.touches),
	                touchEvent: event
	            });
	        }
	    }
	
	    /**
	    * 捕获touchmove事件，处理pan和dual的相关手势
	    *
	    * 1. 遍历每个触点：
	    * > 如果触点之前处于tapping状态，且位移超过10像素，则认定为进入panning状态
	    * 先触发panstart手势，然后根据移动的方向选择性触发horizontalpanstart或verticalpanstart手势
	    * > 如果触点之前处于panning状态，则根据pan的初始方向触发horizontalpan或verticalpan手势
	    *
	    * 2. 如果当前触点数为2，则计算出几何变换的各项参数，触发dualtouch手势
	    *
	    * @event
	    * @param  {event} event
	    */
	    function touchmoveHandler(event) {
	        // TODO: 函数太大了，影响可读性，建议分解并加必要的注释
	
	        // 遍历每个触点：
	        // 1. 如果触点之前处于tapping状态，且位移超过10像素，则认定为进入panning状态
	        // 先触发panstart手势，然后根据移动的方向选择性触发horizontalpanstart或verticalpanstart手势
	        // 2. 如果触点之前处于panning状态，则根据pan的初始方向触发horizontalpan或verticalpan手势
	        for (var i = 0; i < event.changedTouches.length; i++) {
	            var touch = event.changedTouches[i],
	                gesture = gestures[touch.identifier];
	
	            if (!gesture) {
	                return;
	            }
	
	            if (!gesture.lastTouch) {
	                gesture.lastTouch = gesture.startTouch;
	            }
	            if (!gesture.lastTime) {
	                gesture.lastTime = gesture.startTime;
	            }
	            if (!gesture.velocityX) {
	                gesture.velocityX = 0;
	            }
	            if (!gesture.velocityY) {
	                gesture.velocityY = 0;
	            }
	            if (!gesture.duration) {
	                gesture.duration = 0;
	            }
	
	            var time = Date.now() - gesture.lastTime;
	            var vx = (touch.clientX - gesture.lastTouch.clientX) / time,
	                vy = (touch.clientY - gesture.lastTouch.clientY) / time;
	
	            var RECORD_DURATION = 70;
	            if (time > RECORD_DURATION) {
	                time = RECORD_DURATION;
	            }
	            if (gesture.duration + time > RECORD_DURATION) {
	                gesture.duration = RECORD_DURATION - time;
	            }
	
	            gesture.velocityX = (gesture.velocityX * gesture.duration + vx * time) / (gesture.duration + time);
	            gesture.velocityY = (gesture.velocityY * gesture.duration + vy * time) / (gesture.duration + time);
	            gesture.duration += time;
	
	            gesture.lastTouch = {};
	
	            for (var p in touch) {
	                gesture.lastTouch[p] = touch[p];
	            }
	            gesture.lastTime = Date.now();
	
	            var displacementX = touch.clientX - gesture.startTouch.clientX,
	                displacementY = touch.clientY - gesture.startTouch.clientY,
	                distance = Math.sqrt(Math.pow(displacementX, 2) + Math.pow(displacementY, 2));
	
	            // magic number 10: moving 10px means pan, not tap
	            if ((gesture.status === 'tapping' || gesture.status === 'pressing') && distance > 10) {
	                gesture.status = 'panning';
	                gesture.isVertical = !(Math.abs(displacementX) > Math.abs(displacementY));
	
	                fireEvent(gesture.element, 'panstart', {
	                    touch: touch,
	                    touches: event.touches,
	                    changedTouches: event.changedTouches,
	                    touchEvent: event,
	                    isVertical: gesture.isVertical
	                });
	
	                fireEvent(gesture.element, (gesture.isVertical ? 'vertical' : 'horizontal') + 'panstart', {
	                    touch: touch,
	                    touchEvent: event
	                });
	            }
	
	            if (gesture.status === 'panning') {
	                gesture.panTime = Date.now();
	
	                fireEvent(gesture.element, 'panmove', {
	                    displacementX: displacementX,
	                    displacementY: displacementY,
	                    touch: touch,
	                    touches: event.touches,
	                    changedTouches: event.changedTouches,
	                    touchEvent: event,
	                    isVertical: gesture.isVertical
	                });
	
	                if (gesture.isVertical) {
	                    fireEvent(gesture.element, 'verticalpanmove', {
	                        displacementY: displacementY,
	                        touch: touch,
	                        touchEvent: event
	                    });
	                } else {
	                    fireEvent(gesture.element, 'horizontalpanmove', {
	                        displacementX: displacementX,
	                        touch: touch,
	                        touchEvent: event
	                    });
	                }
	            }
	        }
	
	        // 如果当前触点数为2，则计算出几何变换的各项参数，触发dualtouch手势
	        if (Object.keys(gestures).length === 2) {
	            var position = [],
	                current = [],
	                elements = [],
	                transform = void 0;
	
	            for (var _i = 0; _i < event.touches.length; _i++) {
	                var _touch = event.touches[_i];
	                var _gesture = gestures[_touch.identifier];
	                position.push([_gesture.startTouch.clientX, _gesture.startTouch.clientY]);
	                current.push([_touch.clientX, _touch.clientY]);
	            }
	
	            for (var _p2 in gestures) {
	                elements.push(gestures[_p2].element);
	            }
	
	            transform = calc(position[0][0], position[0][1], position[1][0], position[1][1], current[0][0], current[0][1], current[1][0], current[1][1]);
	            fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouch', {
	                transform: transform,
	                touches: event.touches,
	                touchEvent: event
	            });
	        }
	    }
	
	    /**
	    * 捕获touchend事件
	    *
	    * 1. 如果当前触点数为2，则触发dualtouchend手势
	    *
	    * 2. 遍历每个触点：
	    * > 如果处于tapping状态，则触发tap手势
	    * 如果之前300毫秒出现过tap手势，则升级为doubletap手势
	    * > 如果处于panning状态，则根据滑出的速度，触发panend/flick手势
	    * flick手势被触发之后，再根据滑出的方向触发verticalflick/horizontalflick手势
	    * > 如果处于pressing状态，则触发pressend手势
	    *
	    * 3. 解绑定所有相关事件
	    *
	    * @event
	    * @param  {event} event
	    */
	    function touchendHandler(event) {
	
	        if (Object.keys(gestures).length === 2) {
	            var elements = [];
	            for (var p in gestures) {
	                elements.push(gestures[p].element);
	            }
	            fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouchend', {
	                touches: slice.call(event.touches),
	                touchEvent: event
	            });
	        }
	
	        for (var i = 0; i < event.changedTouches.length; i++) {
	            var touch = event.changedTouches[i],
	                id = touch.identifier,
	                gesture = gestures[id];
	
	            if (!gesture) {
	                continue;
	            }
	
	            if (gesture.pressingHandler) {
	                clearTimeout(gesture.pressingHandler);
	                gesture.pressingHandler = null;
	            }
	
	            if (gesture.status === 'tapping') {
	                gesture.timestamp = Date.now();
	                fireEvent(gesture.element, 'tap', {
	                    touch: touch,
	                    touchEvent: event
	                });
	
	                if (lastTap && gesture.timestamp - lastTap.timestamp < 300) {
	                    fireEvent(gesture.element, 'doubletap', {
	                        touch: touch,
	                        touchEvent: event
	                    });
	                }
	
	                lastTap = gesture;
	            }
	
	            if (gesture.status === 'panning') {
	                var now = Date.now();
	                var duration = now - gesture.startTime,
	
	                // velocityX = (touch.clientX - gesture.startTouch.clientX) / duration,
	                // velocityY = (touch.clientY - gesture.startTouch.clientY) / duration,
	                displacementX = touch.clientX - gesture.startTouch.clientX,
	                    displacementY = touch.clientY - gesture.startTouch.clientY;
	
	                var velocity = Math.sqrt(gesture.velocityY * gesture.velocityY + gesture.velocityX * gesture.velocityX);
	                var isflick = velocity > 0.5 && now - gesture.lastTime < 100;
	                var extra = {
	                    duration: duration,
	                    isflick: isflick,
	                    velocityX: gesture.velocityX,
	                    velocityY: gesture.velocityY,
	                    displacementX: displacementX,
	                    displacementY: displacementY,
	                    touch: touch,
	                    touches: event.touches,
	                    changedTouches: event.changedTouches,
	                    touchEvent: event,
	                    isVertical: gesture.isVertical
	                };
	
	                fireEvent(gesture.element, 'panend', extra);
	                if (isflick) {
	                    fireEvent(gesture.element, 'swipe', extra);
	
	                    if (gesture.isVertical) {
	                        fireEvent(gesture.element, 'verticalswipe', extra);
	                    } else {
	                        fireEvent(gesture.element, 'horizontalswipe', extra);
	                    }
	                }
	            }
	
	            if (gesture.status === 'pressing') {
	                fireEvent(gesture.element, 'pressend', {
	                    touch: touch,
	                    touchEvent: event
	                });
	            }
	
	            delete gestures[id];
	        }
	
	        if (Object.keys(gestures).length === 0) {
	            docEl.removeEventListener('touchmove', touchmoveHandler, false);
	            docEl.removeEventListener('touchend', touchendHandler, false);
	            docEl.removeEventListener('touchcancel', touchcancelHandler, false);
	        }
	    }
	
	    /**
	    * 捕获touchcancel事件
	    *
	    * 1. 如果当前触点数为2，则触发dualtouchend手势
	    *
	    * 2. 遍历每个触点：
	    * > 如果处于panning状态，则触发panend手势
	    * > 如果处于pressing状态，则触发pressend手势
	    *
	    * 3. 解绑定所有相关事件
	    *
	    * @event
	    * @param  {event} event
	    */
	    function touchcancelHandler(event) {
	        // TODO: 和touchendHandler大量重复，建议DRY
	
	        if (Object.keys(gestures).length === 2) {
	            var elements = [];
	            for (var p in gestures) {
	                elements.push(gestures[p].element);
	            }
	            fireEvent(getCommonAncestor(elements[0], elements[1]), 'dualtouchend', {
	                touches: slice.call(event.touches),
	                touchEvent: event
	            });
	        }
	
	        for (var i = 0; i < event.changedTouches.length; i++) {
	            var touch = event.changedTouches[i],
	                id = touch.identifier,
	                gesture = gestures[id];
	
	            if (!gesture) {
	                continue;
	            }
	
	            if (gesture.pressingHandler) {
	                clearTimeout(gesture.pressingHandler);
	                gesture.pressingHandler = null;
	            }
	
	            if (gesture.status === 'panning') {
	                fireEvent(gesture.element, 'panend', {
	                    touch: touch,
	                    touches: event.touches,
	                    changedTouches: event.changedTouches,
	                    touchEvent: event
	                });
	            }
	            if (gesture.status === 'pressing') {
	                fireEvent(gesture.element, 'pressend', {
	                    touch: touch,
	                    touchEvent: event
	                });
	            }
	            delete gestures[id];
	        }
	
	        if (Object.keys(gestures).length === 0) {
	            docEl.removeEventListener('touchmove', touchmoveHandler, false);
	            docEl.removeEventListener('touchend', touchendHandler, false);
	            docEl.removeEventListener('touchcancel', touchcancelHandler, false);
	        }
	    }
	
	    docEl.addEventListener('touchstart', touchstartHandler, false);
	})(window);

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _classCallCheck2 = __webpack_require__(66);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _eventEmitter = __webpack_require__(106);
	
	var _eventEmitter2 = _interopRequireDefault(_eventEmitter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Event = function Event() {
	  (0, _classCallCheck3.default)(this, Event);
	};
	
	exports.default = Event;
	
	(0, _eventEmitter2.default)(Event.prototype);

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var d        = __webpack_require__(107)
	  , callable = __webpack_require__(120)
	
	  , apply = Function.prototype.apply, call = Function.prototype.call
	  , create = Object.create, defineProperty = Object.defineProperty
	  , defineProperties = Object.defineProperties
	  , hasOwnProperty = Object.prototype.hasOwnProperty
	  , descriptor = { configurable: true, enumerable: false, writable: true }
	
	  , on, once, off, emit, methods, descriptors, base;
	
	on = function (type, listener) {
		var data;
	
		callable(listener);
	
		if (!hasOwnProperty.call(this, '__ee__')) {
			data = descriptor.value = create(null);
			defineProperty(this, '__ee__', descriptor);
			descriptor.value = null;
		} else {
			data = this.__ee__;
		}
		if (!data[type]) data[type] = listener;
		else if (typeof data[type] === 'object') data[type].push(listener);
		else data[type] = [data[type], listener];
	
		return this;
	};
	
	once = function (type, listener) {
		var once, self;
	
		callable(listener);
		self = this;
		on.call(this, type, once = function () {
			off.call(self, type, once);
			apply.call(listener, this, arguments);
		});
	
		once.__eeOnceListener__ = listener;
		return this;
	};
	
	off = function (type, listener) {
		var data, listeners, candidate, i;
	
		callable(listener);
	
		if (!hasOwnProperty.call(this, '__ee__')) return this;
		data = this.__ee__;
		if (!data[type]) return this;
		listeners = data[type];
	
		if (typeof listeners === 'object') {
			for (i = 0; (candidate = listeners[i]); ++i) {
				if ((candidate === listener) ||
						(candidate.__eeOnceListener__ === listener)) {
					if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
					else listeners.splice(i, 1);
				}
			}
		} else {
			if ((listeners === listener) ||
					(listeners.__eeOnceListener__ === listener)) {
				delete data[type];
			}
		}
	
		return this;
	};
	
	emit = function (type) {
		var i, l, listener, listeners, args;
	
		if (!hasOwnProperty.call(this, '__ee__')) return;
		listeners = this.__ee__[type];
		if (!listeners) return;
	
		if (typeof listeners === 'object') {
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) args[i - 1] = arguments[i];
	
			listeners = listeners.slice();
			for (i = 0; (listener = listeners[i]); ++i) {
				apply.call(listener, this, args);
			}
		} else {
			switch (arguments.length) {
			case 1:
				call.call(listeners, this);
				break;
			case 2:
				call.call(listeners, this, arguments[1]);
				break;
			case 3:
				call.call(listeners, this, arguments[1], arguments[2]);
				break;
			default:
				l = arguments.length;
				args = new Array(l - 1);
				for (i = 1; i < l; ++i) {
					args[i - 1] = arguments[i];
				}
				apply.call(listeners, this, args);
			}
		}
	};
	
	methods = {
		on: on,
		once: once,
		off: off,
		emit: emit
	};
	
	descriptors = {
		on: d(on),
		once: d(once),
		off: d(off),
		emit: d(emit)
	};
	
	base = defineProperties({}, descriptors);
	
	module.exports = exports = function (o) {
		return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
	};
	exports.methods = methods;


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var assign        = __webpack_require__(108)
	  , normalizeOpts = __webpack_require__(115)
	  , isCallable    = __webpack_require__(116)
	  , contains      = __webpack_require__(117)
	
	  , d;
	
	d = module.exports = function (dscr, value/*, options*/) {
		var c, e, w, options, desc;
		if ((arguments.length < 2) || (typeof dscr !== 'string')) {
			options = value;
			value = dscr;
			dscr = null;
		} else {
			options = arguments[2];
		}
		if (dscr == null) {
			c = w = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
			w = contains.call(dscr, 'w');
		}
	
		desc = { value: value, configurable: c, enumerable: e, writable: w };
		return !options ? desc : assign(normalizeOpts(options), desc);
	};
	
	d.gs = function (dscr, get, set/*, options*/) {
		var c, e, options, desc;
		if (typeof dscr !== 'string') {
			options = set;
			set = get;
			get = dscr;
			dscr = null;
		} else {
			options = arguments[3];
		}
		if (get == null) {
			get = undefined;
		} else if (!isCallable(get)) {
			options = get;
			get = set = undefined;
		} else if (set == null) {
			set = undefined;
		} else if (!isCallable(set)) {
			options = set;
			set = undefined;
		}
		if (dscr == null) {
			c = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
		}
	
		desc = { get: get, set: set, configurable: c, enumerable: e };
		return !options ? desc : assign(normalizeOpts(options), desc);
	};


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(109)()
		? Object.assign
		: __webpack_require__(110);


/***/ },
/* 109 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
		var assign = Object.assign, obj;
		if (typeof assign !== 'function') return false;
		obj = { foo: 'raz' };
		assign(obj, { bar: 'dwa' }, { trzy: 'trzy' });
		return (obj.foo + obj.bar + obj.trzy) === 'razdwatrzy';
	};


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var keys  = __webpack_require__(111)
	  , value = __webpack_require__(114)
	
	  , max = Math.max;
	
	module.exports = function (dest, src/*, …srcn*/) {
		var error, i, l = max(arguments.length, 2), assign;
		dest = Object(value(dest));
		assign = function (key) {
			try { dest[key] = src[key]; } catch (e) {
				if (!error) error = e;
			}
		};
		for (i = 1; i < l; ++i) {
			src = arguments[i];
			keys(src).forEach(assign);
		}
		if (error !== undefined) throw error;
		return dest;
	};


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(112)()
		? Object.keys
		: __webpack_require__(113);


/***/ },
/* 112 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
		try {
			Object.keys('primitive');
			return true;
		} catch (e) { return false; }
	};


/***/ },
/* 113 */
/***/ function(module, exports) {

	'use strict';
	
	var keys = Object.keys;
	
	module.exports = function (object) {
		return keys(object == null ? object : Object(object));
	};


/***/ },
/* 114 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (value) {
		if (value == null) throw new TypeError("Cannot use null or undefined");
		return value;
	};


/***/ },
/* 115 */
/***/ function(module, exports) {

	'use strict';
	
	var forEach = Array.prototype.forEach, create = Object.create;
	
	var process = function (src, obj) {
		var key;
		for (key in src) obj[key] = src[key];
	};
	
	module.exports = function (options/*, …options*/) {
		var result = create(null);
		forEach.call(arguments, function (options) {
			if (options == null) return;
			process(Object(options), result);
		});
		return result;
	};


/***/ },
/* 116 */
/***/ function(module, exports) {

	// Deprecated
	
	'use strict';
	
	module.exports = function (obj) { return typeof obj === 'function'; };


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(118)()
		? String.prototype.contains
		: __webpack_require__(119);


/***/ },
/* 118 */
/***/ function(module, exports) {

	'use strict';
	
	var str = 'razdwatrzy';
	
	module.exports = function () {
		if (typeof str.contains !== 'function') return false;
		return ((str.contains('dwa') === true) && (str.contains('foo') === false));
	};


/***/ },
/* 119 */
/***/ function(module, exports) {

	'use strict';
	
	var indexOf = String.prototype.indexOf;
	
	module.exports = function (searchString/*, position*/) {
		return indexOf.call(this, searchString, arguments[1]) > -1;
	};


/***/ },
/* 120 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (fn) {
		if (typeof fn !== 'function') throw new TypeError(fn + " is not a function");
		return fn;
	};


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;
	
	var _getPrototypeOf = __webpack_require__(62);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(66);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(67);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(71);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(96);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	__webpack_require__(122);
	
	var _util = __webpack_require__(6);
	
	var _canvas = __webpack_require__(124);
	
	var _sliceConfig = __webpack_require__(132);
	
	var _sliceConfig2 = _interopRequireDefault(_sliceConfig);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var sliceWidth = 750;
	var sliceHeight = 1334;
	var hSlice = 9;
	var vSlice = 14;
	var width = sliceWidth * hSlice;
	var height = sliceHeight * vSlice;
	
	var Stage = function (_CanvasRender) {
	    (0, _inherits3.default)(Stage, _CanvasRender);
	
	    function Stage(viewport) {
	        (0, _classCallCheck3.default)(this, Stage);
	
	        var _getRect = (0, _util.getRect)(viewport),
	            vw = _getRect.width,
	            vh = _getRect.height;
	
	        var stageEl = (0, _util.query)(viewport, '#stage');
	
	        var _this = (0, _possibleConstructorReturn3.default)(this, (Stage.__proto__ || (0, _getPrototypeOf2.default)(Stage)).call(this, stageEl, vw, vh));
	
	        _this.stageEl = stageEl;
	        _this.vw = vw;
	        _this.vh = vh;
	        _this.width = vw * hSlice;
	        _this.height = vw / (width / hSlice) * height;
	        _this.hSlice = hSlice;
	        _this.vSlice = vSlice;
	        _this.sliceWidth = _this.width / hSlice;
	        _this.sliceHeight = _this.height / vSlice;
	        _this.slices = [];
	
	        for (var v = 0; v < _this.vSlice; v++) {
	            for (var h = 0; h < _this.hSlice; h++) {
	                var index = v * _this.hSlice + h;
	                var config = {
	                    index: v * _this.hSlice + h,
	                    h: h,
	                    v: v
	                };
	                if (_sliceConfig2.default[String(index)]) {
	                    for (var key in _sliceConfig2.default[String(index)]) {
	                        config[key] = _sliceConfig2.default[String(index)][key];
	                    }
	                }
	
	                _this.slices.push(config);
	            }
	        }
	        return _this;
	    }
	
	    (0, _createClass3.default)(Stage, [{
	        key: 'getSlice',
	        value: function getSlice(scrollX, scrollY) {
	            var h = parseInt(scrollX / this.sliceWidth);
	            var v = parseInt(scrollY / this.sliceHeight);
	            return this.slices[v * this.hSlice + h];
	        }
	    }, {
	        key: 'getHoverSlice',
	        value: function getHoverSlice(scrollX, scrollY) {
	            var hover = this.getSlice(scrollX, scrollY);
	            var h = hover.h,
	                v = hover.v,
	                index = hover.index;
	
	            var related = [];
	
	            if (h < this.hSlice - 1) {
	                related.push(this.slices[index + 1]);
	            }
	
	            if (v < this.vSlice - 1) {
	                related.push(this.slices[index + this.hSlice]);
	            }
	
	            if (h < this.hSlice - 1 && v < this.vSlice - 1) {
	                related.push(this.slices[index + this.hSlice + 1]);
	            }
	
	            return [hover].concat(related).map(function (slice) {
	                slice.hovered = true;
	                return slice;
	            });
	        }
	    }, {
	        key: 'getFocusSlice',
	        value: function getFocusSlice(cx, cy) {
	            var h = parseInt(cx / this.sliceWidth);
	            var v = parseInt(cy / this.sliceHeight);
	            var dx = parseInt(cx % this.sliceWidth);
	            var dy = parseInt(cy % this.sliceHeight);
	
	            var slice = void 0;
	            if (dx > this.sliceWidth * 0.25 && dx < this.sliceWidth * 0.75 && dy > this.sliceHeight * 0.25 && dy < this.sliceHeight * 0.75) {
	                slice = this.slices[v * this.hSlice + h];
	                slice.focused = true;
	            }
	
	            return slice;
	        }
	    }, {
	        key: 'ready',
	        value: function ready() {
	            var _this2 = this;
	
	            return new _util.Promise(function (resolve, reject) {
	                _this2.stageEl.style.display = '';
	                resolve();
	            });
	        }
	    }, {
	        key: 'totalAmount',
	        get: function get() {
	            return this.slices.length;
	        }
	    }, {
	        key: 'specialAmount',
	        get: function get() {
	            return this.slices.filter(function (slice) {
	                return slice.type === 3;
	            }).length;
	        }
	    }, {
	        key: 'specialFound',
	        get: function get() {
	            return this.slices.filter(function (slice) {
	                return slice.type === 3 && slice.found;
	            }).length;
	        }
	    }, {
	        key: 'focusedAmount',
	        get: function get() {
	            return this.slices.filter(function (slice) {
	                return slice.focused;
	            }).length;
	        }
	    }, {
	        key: 'hoveredAmount',
	        get: function get() {
	            return this.slices.filter(function (slice) {
	                return slice.hovered;
	            }).length;
	        }
	    }]);
	    return Stage;
	}(_canvas.CanvasRender);
	
	exports.default = Stage;

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(123);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/.0.25.0@css-loader/index.js!./stage.css", function() {
				var newContent = require("!!./../node_modules/.0.25.0@css-loader/index.js!./stage.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "#stage {\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    left: 0;\n    top: 0;\n    -webkit-tranform: translateZ(9px);\n}", ""]);
	
	// exports


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CanvasRender = exports.CanvasImage = undefined;
	
	var _slicedToArray2 = __webpack_require__(125);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _classCallCheck2 = __webpack_require__(66);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(67);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _util = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var CanvasImage = exports.CanvasImage = function () {
	    function CanvasImage(canvas, width, height) {
	        (0, _classCallCheck3.default)(this, CanvasImage);
	
	        if (!(canvas instanceof HTMLCanvasElement)) {
	            height = width;
	            width = canvas;
	            canvas = null;
	        }
	
	        this.width = width;
	        this.height = height;
	        this.canvas = canvas || _util.doc.createElement('canvas');
	        this.canvas.width = width;
	        this.canvas.height = height;
	        this.render = this.canvas.getContext('2d');
	        this._image;
	    }
	
	    (0, _createClass3.default)(CanvasImage, [{
	        key: 'draw',
	        value: function draw(params) {
	            var _this = this;
	
	            var loaded = params.map(function (param) {
	                var deferred = (0, _util.defer)();
	
	                if (param.img) {
	                    deferred.resolve(param);
	                } else if (param.src) {
	                    var _loadImg = (0, _util.loadImg)(param.src),
	                        _loadImg2 = (0, _slicedToArray3.default)(_loadImg, 2),
	                        img = _loadImg2[0],
	                        promise = _loadImg2[1];
	
	                    param.img = img;
	                    promise.then(function () {
	                        return deferred.resolve(param);
	                    });
	                } else {
	                    deferred.resolve(param);
	                }
	
	                return deferred.promise;
	            });
	
	            return _util.Promise.all(loaded).then(function (params) {
	                _this.render.clearRect(0, 0, _this.width, _this.height);
	
	                params.forEach(function (param) {
	                    var _render;
	
	                    var args = [param.img];
	
	                    if (param.sx != null) {
	                        args.push(param.sx);
	                    }
	                    if (param.sx != null) {
	                        args.push(param.sy);
	                    }
	                    if (param.sw != null) {
	                        args.push(param.sw);
	                    }
	                    if (param.sh != null) {
	                        args.push(param.sh);
	                    }
	
	                    args.push(param.x, param.y);
	
	                    if (param.width != null) {
	                        args.push(param.width);
	                    }
	                    if (param.height != null) {
	                        args.push(param.height);
	                    }
	
	                    (_render = _this.render).drawImage.apply(_render, args);
	                });
	            });
	        }
	    }, {
	        key: 'image',
	        get: function get() {
	            if (!this._image) {
	                this._image = new Image();
	                this._image.src = this.canvas.toDataURL();
	            }
	            return this._image;
	        }
	    }]);
	    return CanvasImage;
	}();
	
	var CanvasRender = exports.CanvasRender = function () {
	    function CanvasRender(canvas, width, height) {
	        (0, _classCallCheck3.default)(this, CanvasRender);
	
	        this.width = width;
	        this.height = height;
	        this._visible = new CanvasImage(canvas, width, height);
	        this._offscreen = new CanvasImage(width, height);
	    }
	
	    (0, _createClass3.default)(CanvasRender, [{
	        key: 'canvas',
	        get: function get() {
	            return this._visible.canvas;
	        }
	    }, {
	        key: 'render',
	        get: function get() {
	            return this._visible.render;
	        }
	    }, {
	        key: 'image',
	        get: function get() {
	            return this._visible.image;
	        }
	    }, {
	        key: 'offscreenCanvas',
	        get: function get() {
	            return this._offscreen.canvas;
	        }
	    }, {
	        key: 'offscreenRender',
	        get: function get() {
	            return this._offscreen.render;
	        }
	    }, {
	        key: 'offscreenImage',
	        get: function get() {
	            return this._offscreen.image;
	        }
	    }]);
	    return CanvasRender;
	}();

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _isIterable2 = __webpack_require__(126);
	
	var _isIterable3 = _interopRequireDefault(_isIterable2);
	
	var _getIterator2 = __webpack_require__(129);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;
	
	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);
	
	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }
	
	    return _arr;
	  }
	
	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(127), __esModule: true };

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(75);
	__webpack_require__(10);
	module.exports = __webpack_require__(128);

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(59)
	  , ITERATOR  = __webpack_require__(51)('iterator')
	  , Iterators = __webpack_require__(33);
	module.exports = __webpack_require__(18).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(130), __esModule: true };

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(75);
	__webpack_require__(10);
	module.exports = __webpack_require__(131);

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(23)
	  , get      = __webpack_require__(58);
	module.exports = __webpack_require__(18).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 132 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    'TYPE': {
	        'single': 1,
	        'static': 2,
	        'dynamic': 3
	    },
	    '2': {
	        type: 2
	    },
	    '8': {
	        type: 2
	    },
	    '10': {
	        distance: '5000光年',
	        type: 2
	    },
	    '18': {
	        distance: '450光年',
	        type: 2
	    },
	    '21': {
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 400,
	        coinY: 150
	    },
	    '23': {
	        distance: '1400光年',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 400,
	        coinY: 150
	    },
	    '28': {
	        distance: '980光年',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 400,
	        coinY: 150
	    },
	    '31': {
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 400,
	        coinY: 150
	    },
	    '34': {
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 400,
	        coinY: 150
	    },
	    '38': {
	        distance: '4000光年',
	        type: 1
	    },
	    '41': {
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 400,
	        coinY: 150
	    },
	    '44': {
	        distance: '400光年',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 400,
	        coinY: 150
	    },
	    '46': {
	        distance: '8.6光年',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 400,
	        coinY: 150
	    },
	    '49': {
	        distance: '25.04光年',
	        type: 2
	    },
	    '56': {
	        distance: '4.22光年',
	        type: 2
	    },
	    '59': {
	        distance: '16.7光年',
	        type: 2
	    },
	    '61': {
	        distance: '20.4光年',
	        type: 2
	    },
	    '64': {
	        distance: '107.712亿公里',
	        type: 2
	    },
	    '67': {
	        type: 2
	    },
	    '69': {
	        distance: '101.728亿公里',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 400,
	        coinY: 150
	    },
	    '74': {
	        distance: '59亿公里',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 400,
	        coinY: 150
	    },
	    '76': {
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 400,
	        coinY: 150
	    },
	    '79': {
	        distance: '43.5亿公里',
	        type: 2
	    },
	    '82': {
	        distance: '27.19亿公里',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 400,
	        coinY: 150
	    },
	    '84': {
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 400,
	        coinY: 150
	    },
	    '87': {
	        distance: '12.8亿公里',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 400,
	        coinY: 150
	    },
	    '91': {
	        type: 1
	    },
	    '94': {
	        distance: '1.496亿公里',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 400,
	        coinY: 150
	    },
	    '97': {
	        type: 1
	    },
	    '99': {
	        type: 2
	    },
	    '102': {
	        distance: '0.92亿公里',
	        type: 2
	    },
	    '105': {
	        distance: '6.3亿公里',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 400,
	        coinY: 150
	    },
	    '113': {
	        distance: '4150万公里',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 400,
	        coinY: 150
	    },
	    '115': {
	        type: 2
	    },
	    '118': {
	        distance: '5500万公里',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 400,
	        coinY: 150
	    },
	    '120': {
	        type: 1
	    },
	    '121': {
	        distance: '0公里',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 400,
	        coinY: 150
	    },
	    '122': {
	        type: 1
	    },
	    '123': {
	        distance: '38.44公里',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 400,
	        coinY: 150
	    },
	    '125': {
	        type: 2
	    }
	};

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;
	
	var _classCallCheck2 = __webpack_require__(66);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(67);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	__webpack_require__(134);
	
	var _util = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var HelloWorld = function () {
	    function HelloWorld(viewport, items) {
	        (0, _classCallCheck3.default)(this, HelloWorld);
	
	        this.wrapEl = (0, _util.query)(viewport, '#helloworld');
	        this.wrapEl.style.backgroundImage = 'url(' + items['helloworld'].src + ')';
	    }
	
	    (0, _createClass3.default)(HelloWorld, [{
	        key: 'play',
	        value: function play() {
	            var _this = this;
	
	            var duration = 400;
	            var count = 6;
	
	            return function (_ref) {
	                var elapsed = _ref.elapsed,
	                    delta = _ref.delta;
	
	                if (elapsed <= duration) {
	                    var index = parseInt(count * elapsed / duration);
	                    _this.wrapEl.style.backgroundPositionX = '-' + index * 10 + 'rem';
	                } else {
	                    _this.wrapEl.style.backgroundPositionX = '0';
	                    return true;
	                }
	            };
	        }
	    }, {
	        key: 'ending',
	        value: function ending() {
	            this.wrapEl.style.display = 'none';
	        }
	    }, {
	        key: 'ready',
	        value: function ready() {
	            var _this2 = this;
	
	            return new _util.Promise(function (resolve, reject) {
	                _this2.wrapEl.style.display = '';
	                resolve();
	            });
	        }
	    }]);
	    return HelloWorld;
	}();
	
	exports.default = HelloWorld;

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(135);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/.0.25.0@css-loader/index.js!./helloworld.css", function() {
				var newContent = require("!!./../node_modules/.0.25.0@css-loader/index.js!./helloworld.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "#helloworld {\n    width: 100%;\n    height: 100%;\n    background-position: 0 center;\n    background-size: 60rem 17.786rem;\n    background-repeat: no-repeat;\n    position: absolute;\n    -webkit-tranform: translateZ(9999px);\n}", ""]);
	
	// exports


/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;
	
	var _slicedToArray2 = __webpack_require__(125);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _typeof2 = __webpack_require__(72);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _getIterator2 = __webpack_require__(129);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _getPrototypeOf = __webpack_require__(62);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(66);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(67);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(71);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(96);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _util = __webpack_require__(6);
	
	var _canvas = __webpack_require__(124);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Cloud = function (_CanvasImage) {
	    (0, _inherits3.default)(Cloud, _CanvasImage);
	
	    function Cloud(stage, items) {
	        (0, _classCallCheck3.default)(this, Cloud);
	
	        var _this = (0, _possibleConstructorReturn3.default)(this, (Cloud.__proto__ || (0, _getPrototypeOf2.default)(Cloud)).call(this, stage.vw, stage.vh));
	
	        _this.hSlice = stage.hSlice;
	        _this.vSlice = stage.vSlice;
	        _this.sliceWidth = stage.sliceWidth;
	        _this.sliceHeight = stage.sliceHeight;
	        _this.items = items;
	        return _this;
	    }
	
	    (0, _createClass3.default)(Cloud, [{
	        key: 'drawImages',
	        value: function drawImages(hovers, focus, scrollX, scrollY) {
	            var _this2 = this;
	
	            var params = [];
	            var ids = [];
	            var scale = 0.4;
	
	            var pushParams = function pushParams(id) {
	                if (ids.indexOf(id) < 0 && _this2.slices[id]) {
	                    var _slices$id = _this2.slices[id],
	                        x = _slices$id.x,
	                        y = _slices$id.y,
	                        width = _slices$id.width,
	                        height = _slices$id.height,
	                        canvas = _slices$id.canvas;
	
	
	                    params.push({
	                        x: x - width * scale / 2 - scrollX,
	                        y: y - height * scale / 2 - scrollY,
	                        width: width * (1 + scale),
	                        height: height * (1 + scale),
	                        img: canvas
	                    });
	                }
	                ids.push(id);
	            };
	
	            if (hovers) {
	                var _iteratorNormalCompletion = true;
	                var _didIteratorError = false;
	                var _iteratorError = undefined;
	
	                try {
	                    for (var _iterator = (0, _getIterator3.default)(hovers), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                        var hover = _step.value;
	
	                        pushParams(String(hover.index));
	                    }
	                } catch (err) {
	                    _didIteratorError = true;
	                    _iteratorError = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion && _iterator.return) {
	                            _iterator.return();
	                        }
	                    } finally {
	                        if (_didIteratorError) {
	                            throw _iteratorError;
	                        }
	                    }
	                }
	            }
	
	            if (focus) {
	                if (focus.h < this.hSlice - 1) {
	                    pushParams(focus.index + 1);
	                }
	
	                if (focus.h > 1) {
	                    pushParams(focus.index - 1);
	                }
	
	                if (focus.v < this.vSlice - 1) {
	                    pushParams(focus.index + this.hSlice);
	                }
	
	                if (focus.v > 1) {
	                    pushParams(focus.index - this.hSlice);
	                }
	            }
	
	            this.draw(params);
	        }
	    }, {
	        key: 'clear',
	        value: function clear(focus) {
	            var _this3 = this;
	
	            var cleared = focus.cleared,
	                index = focus.index;
	
	
	            var slice = this.slices[String(index)];
	
	            if (slice) {
	                var _ret = function () {
	                    var img = slice.img,
	                        render = slice.render;
	
	
	                    if (!cleared) {
	                        var _ret2 = function () {
	                            var duration = 2500;
	
	                            return {
	                                v: {
	                                    v: function v(_ref) {
	                                        var delta = _ref.delta,
	                                            elapsed = _ref.elapsed;
	
	                                        if (elapsed <= duration) {
	                                            render.globalAlpha -= delta / duration;
	                                        } else {
	                                            render.globalAlpha = 0;
	                                            focus.cleared = true;
	                                        }
	                                        render.clearRect(0, 0, _this3.sliceWidth, _this3.sliceHeight);
	                                        render.drawImage(img, 0, 0, _this3.sliceWidth, _this3.sliceHeight);
	                                        return focus.cleared;
	                                    }
	                                }
	                            };
	                        }();
	
	                        if ((typeof _ret2 === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret2)) === "object") return _ret2.v;
	                    }
	                }();
	
	                if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
	            }
	        }
	    }, {
	        key: 'ready',
	        value: function ready() {
	            this.slices = {};
	
	            var img = this.items['cloud'].obj;
	
	            for (var i = 1; i <= this.hSlice * this.vSlice; i++) {
	                var x = (i - 1) % this.hSlice;
	                var y = parseInt((i - 1) / this.hSlice);
	
	                var _img2Canvas = (0, _util.img2Canvas)(img, this.sliceWidth, this.sliceHeight),
	                    _img2Canvas2 = (0, _slicedToArray3.default)(_img2Canvas, 2),
	                    canvas = _img2Canvas2[0],
	                    render = _img2Canvas2[1];
	
	                this.slices[String(i - 1)] = {
	                    img: img,
	                    canvas: canvas,
	                    render: render,
	                    x: x * this.sliceWidth,
	                    y: y * this.sliceHeight,
	                    width: this.sliceWidth,
	                    height: this.sliceHeight
	                };
	            }
	
	            return _util.Promise.resolve();
	        }
	    }]);
	    return Cloud;
	}(_canvas.CanvasImage);
	
	exports.default = Cloud;

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;
	
	var _getPrototypeOf = __webpack_require__(62);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(66);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(67);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(71);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(96);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _util = __webpack_require__(6);
	
	var _canvas = __webpack_require__(124);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Star = function (_CanvasImage) {
	    (0, _inherits3.default)(Star, _CanvasImage);
	
	    function Star(stage, items) {
	        (0, _classCallCheck3.default)(this, Star);
	
	        var _this = (0, _possibleConstructorReturn3.default)(this, (Star.__proto__ || (0, _getPrototypeOf2.default)(Star)).call(this, stage.vw, stage.vh * 2));
	
	        _this.width = stage.vw;
	        _this.height = stage.vh * 2;
	        _this.vw = stage.vw;
	        _this.vh = stage.vh;
	        _this.items = items;
	        return _this;
	    }
	
	    (0, _createClass3.default)(Star, [{
	        key: 'ready',
	        value: function ready() {
	            return this.draw([{
	                img: this.items['star'].obj,
	                x: 0,
	                y: 0,
	                width: this.width,
	                height: this.vh
	            }, {
	                img: this.items['star'].obj,
	                x: 0,
	                y: this.vh,
	                width: this.width,
	                height: this.vh
	            }]);
	        }
	    }]);
	    return Star;
	}(_canvas.CanvasImage);
	
	exports.default = Star;

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ElementCount = exports.Elements = undefined;
	
	var _slicedToArray2 = __webpack_require__(125);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _keys = __webpack_require__(139);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _getIterator2 = __webpack_require__(129);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _typeof2 = __webpack_require__(72);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _getPrototypeOf = __webpack_require__(62);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(66);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(67);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(71);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(96);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	__webpack_require__(142);
	
	var _util = __webpack_require__(6);
	
	var _event = __webpack_require__(105);
	
	var _event2 = _interopRequireDefault(_event);
	
	var _canvas = __webpack_require__(124);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var originSliceWidth = 750;
	var originSliceHeight = 1334;
	
	var Elements = exports.Elements = function (_CanvasImage) {
	    (0, _inherits3.default)(Elements, _CanvasImage);
	
	    function Elements(stage, items) {
	        (0, _classCallCheck3.default)(this, Elements);
	
	        var _this = (0, _possibleConstructorReturn3.default)(this, (Elements.__proto__ || (0, _getPrototypeOf2.default)(Elements)).call(this, stage.vw, stage.vh));
	
	        _this.hSlice = stage.hSlice;
	        _this.vSlice = stage.vSlice;
	        _this.sliceWidth = stage.sliceWidth;
	        _this.sliceHeight = stage.sliceHeight;
	        _this.items = items;
	        _this.scaleRatio = _this.sliceWidth / originSliceWidth;
	        return _this;
	    }
	
	    (0, _createClass3.default)(Elements, [{
	        key: 'showText',
	        value: function showText(focus) {
	            var shown = focus.shown,
	                index = focus.index;
	
	
	            var slice = this.slices[String(index)];
	            if (slice) {
	                if (!shown) {
	                    var _ret = function () {
	                        var delay = 1500;
	                        var duration = 1000;
	
	                        return {
	                            v: function v(_ref) {
	                                var delta = _ref.delta,
	                                    elapsed = _ref.elapsed;
	
	                                if (elapsed <= delay) {
	                                    slice.textAlpha = 0;
	                                } else if (elapsed - delay <= duration) {
	                                    slice.textAlpha = (elapsed - delay) / duration;
	                                } else {
	                                    slice.textAlpha = 1;
	                                    focus.shown = true;
	                                }
	                                return focus.shown;
	                            }
	                        };
	                    }();
	
	                    if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
	                }
	            }
	        }
	    }, {
	        key: 'showGold',
	        value: function showGold(focus) {
	            var found = focus.found,
	                index = focus.index,
	                y1 = focus.y1,
	                y2 = focus.y2;
	
	
	            var slice = this.slices[String(index)];
	            if (slice) {
	                if (!found) {
	                    var _ret2 = function () {
	                        var duration = 1000;
	
	                        return {
	                            v: function v(_ref2) {
	                                var delta = _ref2.delta,
	                                    elapsed = _ref2.elapsed;
	
	                                if (elapsed <= duration) {
	                                    slice.goldY = y1 + (y2 - y1) * elapsed / duration;
	                                } else {
	                                    slice.goldY = y2;
	                                    focus.found = true;
	                                }
	
	                                return focus.found;
	                            }
	                        };
	                    }();
	
	                    if ((typeof _ret2 === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret2)) === "object") return _ret2.v;
	                }
	            }
	        }
	    }, {
	        key: 'flyCoin',
	        value: function flyCoin(focus) {
	            var noCoin = focus.noCoin,
	                index = focus.index,
	                coinX = focus.coinX,
	                coinY = focus.coinY;
	
	
	            var slice = this.slices[String(index)];
	            if (slice) {
	                if (!noCoin) {
	                    var _ret3 = function () {
	                        var coin = slice.coin;
	                        var duration = 500;
	                        var endX = 650;
	                        var endY = 50;
	
	                        return {
	                            v: function v(_ref3) {
	                                var delta = _ref3.delta,
	                                    elapsed = _ref3.elapsed;
	
	                                if (elapsed <= duration) {
	                                    var percent = elapsed / duration;
	                                    coin.x = coinX + (endX - coinX) * percent;
	                                    coin.y = coinY + (endY - coinY) * percent;
	                                    coin.scale += delta / duration * 5;
	                                    coin.slow -= delta / duration * 5;
	                                } else {
	                                    coin.x = endX;
	                                    coin.y = endY;
	                                    focus.noCoin = true;
	                                }
	
	                                return focus.noCoin;
	                            }
	                        };
	                    }();
	
	                    if ((typeof _ret3 === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret3)) === "object") return _ret3.v;
	                }
	            }
	        }
	    }, {
	        key: 'drawImages',
	        value: function drawImages(hovers, focus, scrollX, scrollY) {
	            var params = [];
	            if (hovers) {
	                var _iteratorNormalCompletion = true;
	                var _didIteratorError = false;
	                var _iteratorError = undefined;
	
	                try {
	                    for (var _iterator = (0, _getIterator3.default)(hovers), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                        var hover = _step.value;
	                        var type = hover.type,
	                            index = hover.index,
	                            y1 = hover.y1,
	                            y2 = hover.y2,
	                            coinX = hover.coinX,
	                            coinY = hover.coinY,
	                            noCoin = hover.noCoin,
	                            found = hover.found;
	
	
	                        var slice = this.slices[String(index)];
	                        if (slice) {
	                            var x = slice.x,
	                                y = slice.y,
	                                width = slice.width,
	                                height = slice.height,
	                                canvasImage = slice.canvasImage,
	                                staticImg = slice.staticImg,
	                                textImg = slice.textImg,
	                                _slice$textAlpha = slice.textAlpha,
	                                textAlpha = _slice$textAlpha === undefined ? 0 : _slice$textAlpha,
	                                goldImg = slice.goldImg,
	                                coin = slice.coin;
	
	
	                            canvasImage.render.clearRect(0, 0, width, height);
	
	                            if (type >= 1) {
	                                canvasImage.render.drawImage(staticImg, 0, 0, width, height);
	                            }
	
	                            if (type >= 2) {
	                                canvasImage.render.save();
	                                canvasImage.render.globalAlpha = textAlpha || 0;
	                                canvasImage.render.drawImage(textImg, 0, 0, width, height);
	                                canvasImage.render.restore();
	                            }
	
	                            if (type >= 3) {
	
	                                if (slice.goldY != null) {
	                                    var goldY = slice.goldY;
	                                    var _y = goldY * this.scaleRatio;
	                                    canvasImage.render.drawImage(goldImg, 0, goldY, originSliceWidth, originSliceHeight - goldY, 0, _y, width, height - _y);
	                                }
	
	                                if (this.coins.length && !noCoin) {
	                                    var _index = coin.index,
	                                        slow = coin.slow,
	                                        scale = coin.scale,
	                                        _coin$x = coin.x,
	                                        _x = _coin$x === undefined ? coinX : _coin$x,
	                                        _coin$y = coin.y,
	                                        _y2 = _coin$y === undefined ? coinY : _coin$y;
	
	                                    slow = slow < 1 ? 1 : slow;
	                                    scale = scale > 10 ? 10 : scale;
	
	                                    var coinImg = this.coins[parseInt(_index / slow)];
	                                    if (coinImg) {
	                                        var _width = coinImg.width,
	                                            _height = coinImg.height;
	
	                                        canvasImage.render.drawImage(coinImg, _x * this.scaleRatio, _y2 * this.scaleRatio, _width / scale, _height / scale);
	                                    }
	                                    coin.index = (coin.index + 1) % (this.coins.length * slow);
	                                }
	                            }
	
	                            params.push({
	                                x: x - scrollX,
	                                y: y - scrollY,
	                                width: width,
	                                height: height,
	                                img: canvasImage.canvas
	                            });
	                        }
	                    }
	                } catch (err) {
	                    _didIteratorError = true;
	                    _iteratorError = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion && _iterator.return) {
	                            _iterator.return();
	                        }
	                    } finally {
	                        if (_didIteratorError) {
	                            throw _iteratorError;
	                        }
	                    }
	                }
	            }
	
	            this.draw(params);
	        }
	    }, {
	        key: 'ready',
	        value: function ready() {
	            var _this2 = this;
	
	            var loaded = [];
	            this.coins = [];
	            this.slices = {};
	
	            (0, _keys2.default)(this.items).filter(function (id) {
	                return id.match(/^coin\d$/);
	            }).forEach(function (id) {
	                _this2.coins.push(_this2.items[id].obj);
	            });
	
	            (0, _keys2.default)(this.items).filter(function (id) {
	                return id.match(/^i\d+\-e\-(s|w|g)/);
	            }).forEach(function (id) {
	                var item = _this2.items[id];
	
	                var _id$match = id.match(/^i(\d+)\-e\-(s|w|g)$/),
	                    _id$match2 = (0, _slicedToArray3.default)(_id$match, 3),
	                    index = _id$match2[1],
	                    type = _id$match2[2];
	
	                var x = Number(index) % _this2.hSlice;
	                var y = parseInt(Number(index) / _this2.hSlice);
	                var slice = _this2.slices[String(index)];
	                if (!slice) {
	                    slice = _this2.slices[String(index)] = {
	                        coin: {
	                            index: 0,
	                            slow: 8,
	                            scale: 3
	                        },
	                        canvasImage: new _canvas.CanvasImage(_this2.sliceWidth, _this2.sliceHeight),
	                        x: x * _this2.sliceWidth,
	                        y: y * _this2.sliceHeight,
	                        width: _this2.sliceWidth,
	                        height: _this2.sliceHeight
	                    };
	                }
	
	                if (type === 's') {
	                    slice.staticImg = item.obj;
	                } else if (type === 'w') {
	                    slice.textImg = item.obj;
	                } else if (type === 'g') {
	                    slice.goldImg = item.obj;
	                }
	            });
	
	            return _util.Promise.all(loaded);
	        }
	    }]);
	    return Elements;
	}(_canvas.CanvasImage);
	
	var ElementCount = exports.ElementCount = function (_Event) {
	    (0, _inherits3.default)(ElementCount, _Event);
	
	    function ElementCount(viewport, items) {
	        (0, _classCallCheck3.default)(this, ElementCount);
	
	        var _this3 = (0, _possibleConstructorReturn3.default)(this, (ElementCount.__proto__ || (0, _getPrototypeOf2.default)(ElementCount)).call(this));
	
	        _this3.wrapEl = (0, _util.query)(viewport, '#elements-count');
	        _this3.textEl = (0, _util.query)(_this3.wrapEl, '.text');
	        _this3.textNumberEl = (0, _util.query)(_this3.textEl, '.number');
	        _this3.textTipEl = (0, _util.query)(_this3.textEl, '.tip');
	        _this3.textBgEl = (0, _util.query)(_this3.textEl, '.bg');
	        _this3.barEl = (0, _util.query)(_this3.wrapEl, '.progress .bar');
	        _this3.tipsEl = (0, _util.query)(_this3.wrapEl, '.tips');
	
	        _this3.found = 0;
	        _this3.amount = 0;
	        _this3.total = 0;
	        _this3.focus = 0;
	        _this3.items = items;
	        return _this3;
	    }
	
	    (0, _createClass3.default)(ElementCount, [{
	        key: 'update',
	        value: function update(amount, found, total, focus) {
	            if (found !== this.found || amount !== this.amount || total !== this.total || focus !== this.focus) {
	                this.textNumberEl.textContent = found + '/' + amount;
	                this.barEl.style.width = found / amount * 100 + '%';
	
	                if (found !== 0) {
	                    this.emit('update', {
	                        found: found,
	                        amount: amount,
	                        total: total,
	                        focus: focus
	                    });
	                }
	
	                this.found = found;
	                this.amount = amount;
	                this.total = total;
	                this.focus = focus;
	            }
	        }
	    }, {
	        key: 'show',
	        value: function show(_ref4) {
	            var _this4 = this;
	
	            var tip = _ref4.tip,
	                bgType = _ref4.bgType;
	
	            var items = this.items;
	
	            return new _util.Promise(function (resolve, reject) {
	                _this4.textTipEl.innerHTML = tip;
	                _this4.textBgEl.className = 'bg bg' + bgType;
	                _this4.textBgEl.style.backgroundImage = 'url(' + items['tipBg' + bgType].src + ')';
	                _this4.wrapEl.className = 'open';
	
	                (0, _util.delay)(400).then(function () {
	                    _this4.textTipEl.style.display = '';
	                    _this4.textBgEl.style.display = '';
	                    return (0, _util.delay)(3000);
	                }).then(function () {
	                    _this4.textTipEl.style.display = 'none';
	                    _this4.textBgEl.style.display = 'none';
	                    _this4.wrapEl.className = '';
	                    return (0, _util.delay)(400);
	                }).then(function () {
	                    resolve();
	                });
	            });
	        }
	    }, {
	        key: 'ready',
	        value: function ready() {
	            var _this5 = this;
	
	            return new _util.Promise(function (resolve, reject) {
	                _this5.wrapEl.style.display = '';
	
	                var keyframes = '';
	                (0, _keys2.default)(_this5.items).filter(function (id) {
	                    return id.match(/^coin\d$/);
	                }).forEach(function (id, i) {
	                    var item = _this5.items[id];
	                    keyframes += '\n                    ' + 1 / 6 * i * 100 + '% {\n                        background-image: url(' + item.src + ');\n                    }\n                ';
	
	                    if (i === 0) {
	                        keyframes += '\n                        100% {\n                            background-image: url(' + item.src + ');\n                        }\n                    ';
	                    }
	                });
	
	                (0, _util.appendStyle)('\n                @-webkit-keyframes coin {\n                    ' + keyframes + '\n                }\n            ');
	
	                _this5.tipsEl.style.webkitAnimation = 'coin 1s linear 0s infinite';
	
	                resolve(_this5);
	            });
	        }
	    }]);
	    return ElementCount;
	}(_event2.default);

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(140), __esModule: true };

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(141);
	module.exports = __webpack_require__(18).Object.keys;

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(53)
	  , $keys    = __webpack_require__(37);
	
	__webpack_require__(65)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(143);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/.0.25.0@css-loader/index.js!./elements.css", function() {
				var newContent = require("!!./../node_modules/.0.25.0@css-loader/index.js!./elements.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "#elements-count {\n    position: absolute;\n    right: 0.73rem;\n    top: 0.4rem;\n    color: #00ddf1;\n    font-size: 12px;\n    display: -webkit-box;\n    -webkit-box-pack: center;\n    -webkit-box-align: center;\n    background-repeat: no-repeat;\n    background-position: 0 center;\n    background-size: 1.106rem 0.413rem;\n}\n\n#elements-count .textWrap {\n    width: 1.106rem;\n    height: 0.413rem;\n    position: relative;\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAfCAYAAAA89UfsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAANdJREFUeNqclD0LgVEYho+P8lqMMsrMrkxkNCn8LYMfQTEYSBaTUjIZRcliUaQM5ON+6o1Fby53XZ06dXW+nvOE3PrUdM7F3SctsXQBCX+Zq4solZKiSCVLRSSo5IkqlSx5kaFSSDT88WfJkvZXRJLzz+ZRKeHfJpIsJZGiUkTUqGTJihyV3nVJJavLMpUshfAfWxyaEAPCVszIKk/RtpFIc7EhV34VPfq4I3Ek0kGMacHatm5EWokF+YQP0aE9Yip2RLqIPm1hA3Em0l5MaFvuinuQ9BJgAFqNIhUPhZOEAAAAAElFTkSuQmCC);\n    background-repeat: no-repeat;\n    background-position: right center;\n    background-size: 0.173rem 0.413rem;\n    overflow: visible;\n}\n\n#elements-count .text {\n    width: 1.3rem;\n    height: 0.5rem;\n    position: absolute;\n    border: 1px solid #00ddf1;\n    border-radius: 4px;\n    box-sizing: border-box;\n    right: 0.17rem;\n    top: -0.18rem;\n    box-shadow: 2px 3px 0px rgba(0, 221, 241, 0.5);\n    -webkit-transition: all 0.4s ease-in 0s;\n    overflow: visible;\n}\n\n#elements-count.open .text {\n    width: 5.8rem;\n    height: 2.3rem;\n    box-shadow: none;\n}\n\n#elements-count .text .number {\n    text-align: center;\n    position: absolute;\n    top: 0;\n    right: 0;\n    width: 1.3rem;\n    height: 0.5rem;\n    line-height: 0.5rem;\n    text-align: center;\n}\n\n#elements-count .text .tip {\n    position: absolute;\n    width: 3.306rem;\n    height: 1.24rem;\n    line-height: 1.2em;\n    left: 0.2rem;\n    top: 0.36rem;\n    font-size: 12px;\n    color: #00ddf1;\n}\n\n#elements-count .text .bg {\n    position: absolute;\n    left: 3.506rem;\n    top: 0.36rem;\n    background-repeat: no-repeat;\n    background-position: 0 0;\n    background-size: contain;\n}\n\n#elements-count .text .bg.bg1 {\n    width: 2.066rem;\n    height: 1.8rem;\n}\n\n#elements-count .text .bg.bg2 {\n    width: 2.253rem;\n    height: 1.946rem;\n}\n\n#elements-count .text .bg.bg3 {\n    width: 2.346rem;\n    height: 1.933rem;\n}\n\n#elements-count .progress {\n    box-sizing: border-box;\n    width: 1.8rem;\n    height: 0.3rem;\n    border: 1px solid #00ddf1;\n    border-radius: 0.15rem;\n    margin: 0 4px;\n}\n\n#elements-count .progress .bar{\n    width: 0;\n    height: 100%;\n    background-color: #00ddf1;\n    border-radius: 0.15rem;\n}\n\n#elements-count .tips {\n    width: 0.667rem;\n    height: 0.64rem;\n    background-size: contain;\n    background-position: center center;\n    background-repeat: no-repeat;\n}\n/*\n@-webkit-keyframes coin {\n    0% {\n        background-image: url(assets/2x/game/coin-1.png);\n    }\n\n    16.6% {\n        background-image: url(assets/2x/game/coin-2.png);\n    }\n\n    33.3% {\n        background-image: url(assets/2x/game/coin-3.png);\n    } \n\n    50% {\n        background-image: url(assets/2x/game/coin-4.png);\n    } \n\n    66.6% {\n        background-image: url(assets/2x/game/coin-5.png);\n    } \n\n    83.3% {\n        background-image: url(assets/2x/game/coin-6.png);\n    } \n\n    100% {\n        background-image: url(assets/2x/game/coin-1.png);\n    } \n}*/", ""]);
	
	// exports


/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;
	
	var _getPrototypeOf = __webpack_require__(62);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(66);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(67);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(71);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(96);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	__webpack_require__(145);
	
	var _util = __webpack_require__(6);
	
	var _event = __webpack_require__(105);
	
	var _event2 = _interopRequireDefault(_event);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Map = function (_Event) {
	    (0, _inherits3.default)(Map, _Event);
	
	    function Map(viewport, hSlice, vSlice) {
	        (0, _classCallCheck3.default)(this, Map);
	
	        var _this = (0, _possibleConstructorReturn3.default)(this, (Map.__proto__ || (0, _getPrototypeOf2.default)(Map)).call(this));
	
	        _this.viewport = (0, _util.query)(viewport, '#stage-map');
	        _this.wrapEl = (0, _util.query)(_this.viewport, '.wrap');
	        _this.canvasEl = (0, _util.query)(_this.viewport, 'canvas');
	        _this.render = _this.canvasEl.getContext('2d');
	        _this.indicatorEl = (0, _util.query)(_this.viewport, '.indicator');
	        _this.textEl = (0, _util.query)(_this.viewport, '.text b');
	        _this.hSlice = hSlice;
	        _this.vSlice = vSlice;
	        _this.opened = false;
	        return _this;
	    }
	
	    (0, _createClass3.default)(Map, [{
	        key: 'text',
	        value: function text(str) {
	            this.textEl.textContent = str;
	        }
	    }, {
	        key: 'update',
	        value: function update(xp, yp) {
	            var _getRect = (0, _util.getRect)(this.canvasEl),
	                cWidth = _getRect.width,
	                cHeight = _getRect.height;
	
	            var _getRect2 = (0, _util.getRect)(this.indicatorEl),
	                iWidth = _getRect2.width,
	                iHeight = _getRect2.height;
	
	            var sWidth = this.sliceWidth,
	                sHeight = this.sliceHeight;
	
	
	            this.indicatorEl.style.webkitTransform = 'translate3d(' + (cWidth * xp + sWidth / 2 - iWidth / 2) + 'px, ' + (cHeight * yp + sHeight / 2 - iHeight / 2) + 'px, 0)';
	        }
	    }, {
	        key: 'clear',
	        value: function clear(xp, yp) {
	            var _getRect3 = (0, _util.getRect)(this.canvasEl),
	                cWidth = _getRect3.width,
	                cHeight = _getRect3.height;
	
	            var sWidth = this.sliceWidth,
	                sHeight = this.sliceHeight;
	
	
	            this.render.fillRect(cWidth * xp, cHeight * yp, sWidth, sHeight);
	        }
	    }, {
	        key: 'ready',
	        value: function ready() {
	            var _this2 = this;
	
	            return new _util.Promise(function (resolve, reject) {
	                _this2.viewport.style.display = '';
	
	                var _getRect4 = (0, _util.getRect)(_this2.canvasEl),
	                    width = _getRect4.width,
	                    height = _getRect4.height;
	
	                _this2.width = width;
	                _this2.height = height;
	                _this2.sliceWidth = width / _this2.hSlice;
	                _this2.sliceHeight = height / _this2.vSlice;
	
	                _this2.canvasEl.width = width;
	                _this2.canvasEl.height = height;
	                _this2.render.clearRect(0, 0, width, height);
	                _this2.render.fillStyle = '#016fa0';
	                _this2.render.fillRect(0, 0, width, height);
	                _this2.render.fillStyle = 'rgba(0, 0, 0, 1)';
	                _this2.render.globalCompositeOperation = 'destination-out';
	
	                resolve(_this2);
	            });
	        }
	    }]);
	    return Map;
	}(_event2.default);
	
	exports.default = Map;

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(146);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/.0.25.0@css-loader/index.js!./map.css", function() {
				var newContent = require("!!./../node_modules/.0.25.0@css-loader/index.js!./map.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "#stage-map {\n    position: absolute;\n    left: 0.5rem;\n    bottom: 0.5rem;\n    background-position: 0.4rem 0.7rem;\n    background-repeat: no-repeat;\n    background-size: 1.09rem 0.853rem;\n    height: 84px;\n    -webkit-transform: translateZ(999px);\n    display: -webkit-box;\n    -webkit-box-pack: center;\n    -webkit-box-align: center;\n}\n\n#stage-map .wrap {\n    border: 1px solid #016fa0;\n    box-sizing: border-box;\n    width: 30.3px;\n    height: 100%;\n    background-position: 0 0;\n    background-repeat: no-repeat;\n    background-size: contain;\n    background-color: #000;\n    overflow: hidden;\n    position: relative;\n}\n\n#stage-map .map {\n    width: 100%;\n    height: 100%;\n}\n\n#stage-map .indicator {\n    left: 0;\n    top: 0;\n    width: 4px;\n    height: 4px;\n    border-radius: 50%;\n    position: absolute;\n    background-color: rgb(50, 50, 50);\n    opacity: 0;\n    -webkit-animation: flash 0.4s linear 0s infinite alternate;\n}\n\n\n#stage-map .text {\n    background-image: url(data:image/png;base64,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);\n    background-size: 1.2rem;\n    background-position: center 0.2rem;\n    background-repeat: no-repeat;\n    box-sizing: border-box;\n    color: #00ddf1;\n    font-size: 12px;\n    width: 100px;\n    height: 100%;\n    line-height: 1.5em;\n    left: 0.1rem;\n    top: 1.8rem;\n    text-align: center;\n    padding-top: 50px;\n}\n\n#stage-map .text b {\n    font-size: 15px;\n    margin-top: 4px;\n    color: #FFF;\n}\n\n\n@-webkit-keyframes flash {\n    0% {\n        opacity: 0;\n    }\n\n    100% {\n        opacity: 1;\n    }\n}", ""]);
	
	// exports


/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;
	
	var _toConsumableArray2 = __webpack_require__(7);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	var _map = __webpack_require__(148);
	
	var _map2 = _interopRequireDefault(_map);
	
	var _getPrototypeOf = __webpack_require__(62);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(66);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(67);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(71);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(96);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _util = __webpack_require__(6);
	
	var _event = __webpack_require__(105);
	
	var _event2 = _interopRequireDefault(_event);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Ticker = function (_Event) {
	    (0, _inherits3.default)(Ticker, _Event);
	
	    function Ticker() {
	        var _ref;
	
	        (0, _classCallCheck3.default)(this, Ticker);
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }
	
	        var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = Ticker.__proto__ || (0, _getPrototypeOf2.default)(Ticker)).call.apply(_ref, [this].concat(args)));
	
	        _this._id = 0;
	        _this._mapF = new _map2.default();
	        _this._mapC = new _map2.default();
	        return _this;
	    }
	
	    (0, _createClass3.default)(Ticker, [{
	        key: 'add',
	        value: function add(f) {
	            if (f && !this._mapC.has(f)) {
	                var id = this._id++;
	                this._mapF.set(id, f);
	                this._mapC.set(f, {
	                    id: id,
	                    deferred: (0, _util.defer)(),
	                    cancel: false,
	                    start: 0,
	                    elapsed: 0,
	                    delta: 0
	                });
	                return id;
	            }
	        }
	    }, {
	        key: 'has',
	        value: function has(id) {
	            return typeof id === 'number' && this._mapF.has(id);
	        }
	    }, {
	        key: 'delete',
	        value: function _delete(id) {
	            if (this.has(id)) {
	                var f = this._mapF.get(id);
	                var c = this._mapC.get(f);
	                c.cancel = true;
	                c.deferred.resolve();
	                this._mapF.delete(id);
	                this._mapC.delete(f);
	            }
	        }
	    }, {
	        key: 'end',
	        value: function end(id) {
	            if (this.has(id)) {
	                var f = this._mapF.get(id);
	                var c = this._mapC.get(f);
	                return c.deferred.promise;
	            } else {
	                return _util.Promise.resolve();
	            }
	        }
	    }, {
	        key: 'cancel',
	        value: function cancel() {
	            if (this.rid) {
	                (0, _util.caf)(this.rid);
	            }
	        }
	    }, {
	        key: 'run',
	        value: function run() {
	            var _this2 = this;
	
	            this.start = Date.now();
	            this.elapsed = 0;
	            this.delta = 0;
	
	            var tick = function tick() {
	                _this2.rid = (0, _util.raf)(tick);
	
	                var now = Date.now();
	                var elapsed = now - _this2.start;
	
	                _this2.delta = elapsed - _this2.elapsed;
	                _this2.elapsed = elapsed;
	
	                _this2.emit('beforetick', {
	                    start: _this2.start,
	                    delta: _this2.delta,
	                    elapsed: _this2.elapsed
	                });
	
	                var keys = [].concat((0, _toConsumableArray3.default)(_this2._mapC.keys()));
	
	                keys.forEach(function (f) {
	                    var c = _this2._mapC.get(f);
	
	                    if (!c.cancel) {
	                        var _now = Date.now();
	                        c.start = c.start || (c.start = _now);
	
	                        var _elapsed = _now - c.start;
	                        c.delta = _elapsed - c.elapsed;
	                        c.elapsed = _elapsed;
	
	                        if (f(c, _this2)) {
	                            _this2.delete(c.id);
	                        }
	                    }
	                });
	
	                now = Date.now();
	                elapsed = now - _this2.start;
	
	                _this2.delta = elapsed - _this2.elapsed;
	                _this2.elapsed = elapsed;
	
	                _this2.emit('aftertick', {
	                    start: _this2.start,
	                    delta: _this2.delta,
	                    elapsed: _this2.elapsed
	                });
	            };
	
	            this.rid = (0, _util.raf)(tick);
	
	            return true;
	        }
	    }]);
	    return Ticker;
	}(_event2.default);
	
	exports.default = Ticker;

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(149), __esModule: true };

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(93);
	__webpack_require__(10);
	__webpack_require__(75);
	__webpack_require__(150);
	__webpack_require__(160);
	module.exports = __webpack_require__(18).Map;

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(151);
	
	// 23.1 Map Objects
	module.exports = __webpack_require__(156)('Map', function(get){
	  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key){
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value){
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var dP          = __webpack_require__(22).f
	  , create      = __webpack_require__(35)
	  , redefineAll = __webpack_require__(152)
	  , ctx         = __webpack_require__(19)
	  , anInstance  = __webpack_require__(153)
	  , defined     = __webpack_require__(13)
	  , forOf       = __webpack_require__(154)
	  , $iterDefine = __webpack_require__(14)
	  , step        = __webpack_require__(78)
	  , setSpecies  = __webpack_require__(155)
	  , DESCRIPTORS = __webpack_require__(26)
	  , fastKey     = __webpack_require__(83).fastKey
	  , SIZE        = DESCRIPTORS ? '_s' : 'size';
	
	var getEntry = function(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that._i[index];
	  // frozen object case
	  for(entry = that._f; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	};
	
	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      anInstance(that, C, NAME, '_i');
	      that._i = create(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that._f == entry)that._f = next;
	          if(that._l == entry)that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        anInstance(this, C, 'forEach');
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
	          , entry;
	        while(entry = entry ? entry.n : this._f){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if(DESCRIPTORS)dP(C.prototype, 'size', {
	      get: function(){
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that._f)that._f = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function(C, NAME, IS_MAP){
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function(iterated, kind){
	      this._t = iterated;  // target
	      this._k = kind;      // kind
	      this._l = undefined; // previous
	    }, function(){
	      var that  = this
	        , kind  = that._k
	        , entry = that._l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);
	
	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(21);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 153 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(19)
	  , call        = __webpack_require__(55)
	  , isArrayIter = __webpack_require__(56)
	  , anObject    = __webpack_require__(23)
	  , toLength    = __webpack_require__(43)
	  , getIterFn   = __webpack_require__(58)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(17)
	  , core        = __webpack_require__(18)
	  , dP          = __webpack_require__(22)
	  , DESCRIPTORS = __webpack_require__(26)
	  , SPECIES     = __webpack_require__(51)('species');
	
	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global         = __webpack_require__(17)
	  , $export        = __webpack_require__(16)
	  , meta           = __webpack_require__(83)
	  , fails          = __webpack_require__(27)
	  , hide           = __webpack_require__(21)
	  , redefineAll    = __webpack_require__(152)
	  , forOf          = __webpack_require__(154)
	  , anInstance     = __webpack_require__(153)
	  , isObject       = __webpack_require__(24)
	  , setToStringTag = __webpack_require__(50)
	  , dP             = __webpack_require__(22).f
	  , each           = __webpack_require__(157)(0)
	  , DESCRIPTORS    = __webpack_require__(26);
	
	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  if(!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	    meta.NEED = true;
	  } else {
	    C = wrapper(function(target, iterable){
	      anInstance(target, C, NAME, '_c');
	      target._c = new Base;
	      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
	    });
	    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','),function(KEY){
	      var IS_ADDER = KEY == 'add' || KEY == 'set';
	      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
	        anInstance(this, C, KEY);
	        if(!IS_ADDER && IS_WEAK && !isObject(a))return KEY == 'get' ? undefined : false;
	        var result = this._c[KEY](a === 0 ? 0 : a, b);
	        return IS_ADDER ? this : result;
	      });
	    });
	    if('size' in proto)dP(C.prototype, 'size', {
	      get: function(){
	        return this._c.size;
	      }
	    });
	  }
	
	  setToStringTag(C, NAME);
	
	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F, O);
	
	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);
	
	  return C;
	};

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx      = __webpack_require__(19)
	  , IObject  = __webpack_require__(40)
	  , toObject = __webpack_require__(53)
	  , toLength = __webpack_require__(43)
	  , asc      = __webpack_require__(158);
	module.exports = function(TYPE, $create){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
	    , create        = $create || asc;
	  return function($this, callbackfn, that){
	    var O      = toObject($this)
	      , self   = IObject(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor = __webpack_require__(159);
	
	module.exports = function(original, length){
	  return new (speciesConstructor(original))(length);
	};

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(24)
	  , isArray  = __webpack_require__(89)
	  , SPECIES  = __webpack_require__(51)('species');
	
	module.exports = function(original){
	  var C;
	  if(isArray(original)){
	    C = original.constructor;
	    // cross-realm fallback
	    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
	    if(isObject(C)){
	      C = C[SPECIES];
	      if(C === null)C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(16);
	
	$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(161)('Map')});

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var classof = __webpack_require__(59)
	  , from    = __webpack_require__(162);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    return from(this);
	  };
	};

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	var forOf = __webpack_require__(154);
	
	module.exports = function(iter, ITERATOR){
	  var result = [];
	  forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};


/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;
	
	var _classCallCheck2 = __webpack_require__(66);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(67);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	__webpack_require__(164);
	
	var _util = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Pop = function () {
	    function Pop(viewport) {
	        (0, _classCallCheck3.default)(this, Pop);
	
	        this.popEl = (0, _util.query)(viewport, '#pop');
	    }
	
	    (0, _createClass3.default)(Pop, [{
	        key: 'ready',
	        value: function ready() {
	            var _this = this;
	
	            return new _util.Promise(function (resolve, reject) {
	                _this.contentEl = (0, _util.query)(_this.popEl, '.content');
	                _this.closeEl = (0, _util.query)(_this.popEl, '.popClose');
	                _this.titleEl = (0, _util.query)(_this.popEl, '.title');
	                _this.textEl = (0, _util.query)(_this.popEl, '.text');
	                _this.bg1El = (0, _util.query)(_this.popEl, '.popBg1');
	                _this.bg2El = (0, _util.query)(_this.popEl, '.popBg2');
	                _this.btnsEl = (0, _util.query)(_this.popEl, '.btns');
	                _this.leftBtnEl = (0, _util.query)(_this.popEl, '.popBtn.left');
	                _this.rightBtnEl = (0, _util.query)(_this.popEl, '.popBtn.right');
	
	                resolve();
	            });
	        }
	    }, {
	        key: 'close',
	        value: function close() {
	            var _this2 = this;
	
	            this.contentEl.style.visibility = 'hidden';
	            this.btnsEl.style.visibility = 'hidden';
	            this.popEl.className = this.popEl.className.replace('open', 'close');
	
	            return (0, _util.delay)(600).then(function () {
	                _this2.popEl.style.display = 'none';
	                _this2.popEl.className = '';
	            });
	        }
	    }, {
	        key: 'popup',
	        value: function popup(_ref) {
	            var _this3 = this;
	
	            var shareble = _ref.shareble,
	                title = _ref.title,
	                text = _ref.text,
	                bgType = _ref.bgType,
	                onleftclick = _ref.onleftclick,
	                onrightclick = _ref.onrightclick,
	                oncloseclick = _ref.oncloseclick;
	
	            return new _util.Promise(function (resolve, reject) {
	                _this3.popEl.style.display = '';
	
	                _this3.titleEl.textContent = title;
	                _this3.textEl.innerHTML = text;
	                _this3.popEl.className += '  bg' + bgType;
	
	                if (shareble) {
	                    _this3.popEl.className += ' shareble';
	                }
	
	                var handler = function handler(e) {
	                    e.preventDefault();
	                    _this3.leftBtnEl.removeEventListener('tap', onLeftClick);
	                    _this3.rightBtnEl.removeEventListener('tap', onRightClick);
	                    _this3.closeEl.removeEventListener('tap', onCloseClick);
	                    return _util.Promise.resolve();
	                };
	
	                function onLeftClick(e) {
	                    handler(e).then(function () {
	                        return onleftclick && onleftclick();
	                    });
	                }
	
	                _this3.leftBtnEl.addEventListener('tap', onLeftClick);
	
	                function onRightClick(e) {
	                    handler(e).then(function () {
	                        return onrightclick && onrightclick();
	                    });
	                }
	
	                _this3.rightBtnEl.addEventListener('tap', onRightClick);
	
	                function onCloseClick(e) {
	                    handler(e).then(function () {
	                        return oncloseclick && oncloseclick();
	                    });
	                }
	
	                _this3.closeEl.addEventListener('tap', onCloseClick);
	
	                (0, _util.raf)(function () {
	                    return _this3.popEl.className += ' open';
	                });
	
	                (0, _util.delay)(400).then(function () {
	                    _this3.contentEl.style.visibility = '';
	                    _this3.btnsEl.style.visibility = '';
	                    resolve();
	                });
	            });
	        }
	    }]);
	    return Pop;
	}();
	
	exports.default = Pop;

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(165);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/.0.25.0@css-loader/index.js!./pop.css", function() {
				var newContent = require("!!./../node_modules/.0.25.0@css-loader/index.js!./pop.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "#pop {\n    position: absolute;\n    left: 0;\n    top: 0;\n    background-color: rgba(255, 255, 255, 0.6);\n    -webkit-transform: translateZ(9999px);\n    width: 100%;\n    height: 100%;\n    display: -webkit-box;\n    -webkit-box-pack: center;\n    -webkit-box-align: center;\n}\n\n#pop .wrap {\n    background-position: 0 0;\n    background-repeat: no-repeat;\n    background-size: contain;\n    position: relative;\n}\n\n#pop .popPanel {\n    width: 4.26rem;\n    height: 7.84rem;\n    position: absolute;\n    background-repeat: no-repeat;\n    background-size: 8.52rem 7.84rem;\n    overflow: hidden;\n}\n\n#pop .popPanel.left {\n    left: 0;\n    top: 0;\n    background-position: -100% 0;\n}\n\n#pop .popPanel.right {\n    right: 0;\n    top: 0;\n    background-position: 200% 0;\n}\n\n#pop.open .popPanel.left {\n    -webkit-animation: openleftwin 0.4s ease-out 0s forwards;\n}\n\n#pop.open .popPanel.right {\n    -webkit-animation: openrightwin 0.4s ease-out 0s forwards;\n}\n\n#pop.close .popPanel.left {\n    -webkit-animation: closeleftwin 0.4s ease-in 0s forwards;\n}\n\n#pop.close .popPanel.right {\n    -webkit-animation: closerightwin 0.4s ease-in 0s forwards;\n}\n\n@-webkit-keyframes openleftwin {\n    0% {\n        background-position: -100% 0;\n    }\n\n    100% {\n        background-position: 0 0;\n    }\n}\n\n@-webkit-keyframes openrightwin {\n    0% {\n        background-position: 200% 0;\n    }\n\n    100% {\n        background-position: 100% 0;\n    }\n}\n\n@-webkit-keyframes closeleftwin {\n    0% {\n        background-position: 0 0;\n    }\n\n    100% {\n        background-position: -100% 0;\n    }\n}\n\n@-webkit-keyframes closerightwin {\n    0% {\n        background-position: 100% 0;\n    }\n\n    100% {\n        background-position: 200% 0;\n    }\n}\n\n#pop .content {\n    width: 8.53rem;\n    height: 7.84rem;\n    overflow: hidden;\n    position: relative;\n}\n\n#pop .popBg1 {\n    display: none;\n    position: absolute;\n    width: 3.36rem;\n    height: 2.92rem;\n    right: 5px;\n    bottom: 2px;\n    background-repeat: no-repeat;\n    background-position: 0 0;\n    background-size: contain;\n}\n\n#pop.bg1 .popBg1 {\n    display: block;\n}\n\n#pop .popBg2 {\n    display: none;\n    position: absolute;\n    width: 4.36rem;\n    height: 3.346rem;\n    right: 5px;\n    bottom: 2px;\n    background-repeat: no-repeat;\n    background-position: 0 0;\n    background-size: contain;\n}\n\n#pop.bg2 .popBg2 {\n    display: block;\n}\n\n#pop .popBg3 {\n    display: none;\n    position: absolute;\n    width: 4.626rem;\n    height: 3.506rem;\n    right: 5px;\n    bottom: 2px;\n    background-repeat: no-repeat;\n    background-position: 0 0;\n    background-size: contain;\n}\n\n#pop.bg3 .popBg3 {\n    display: block;\n}\n\n#pop .popTip1 {\n    position: absolute;\n    left: 0.867rem;\n    top: 1.1rem;\n    width: 1.867rem;\n    height: 1rem;\n    background-position: 0 1rem;\n    background-repeat: no-repeat;\n    background-size: contain;\n    -webkit-animation: typetext1 1.5s linear 0s infinite;\n    overflow: hidden;\n}\n\n@-webkit-keyframes typetext1 {\n    0% {\n        -webkit-transform: translateY(-100%);\n        background-position: 0 1rem;\n    }\n\n    16% {\n        -webkit-transform: translateY(-100%);\n        background-position: 0 1rem;\n    }\n    16.667% {\n        -webkit-transform: translateY(-83.333%);\n        background-position: 0 0.833rem;\n    }\n\n    33% {\n        -webkit-transform: translateY(-83.333%);\n        background-position: 0 0.833rem;\n    }\n    33.333% {\n        -webkit-transform: translateY(-66.666%);\n        background-position: 0 0.666rem;\n    }\n\n    49.999% {\n        -webkit-transform: translateY(-66.666%);\n        background-position: 0 0.666rem;\n    }\n    50% {\n        -webkit-transform: translateY(-50%);\n        background-position: 0 0.5rem;\n    }\n\n    66% {\n        -webkit-transform: translateY(-50%);\n        background-position: 0 0.5rem;\n    }\n    66.666% {\n        -webkit-transform: translateY(-33.333%);\n        background-position: 0 0.333rem;\n    }\n\n    83% {\n        -webkit-transform: translateY(-33.333%);\n        background-position: 0 0.333rem;\n    }\n    83.333% {\n        -webkit-transform: translateY(-16.667%);\n        background-position: 0 0.167rem;\n    }\n\n    99.999% {\n        -webkit-transform: translateY(-16.667%);\n        background-position: 0 0.167rem;\n    }\n    100% {\n        -webkit-transform: translateY(0%);\n        background-position: 0 0;\n    }\n}\n\n\n#pop .popTip2 {\n    position: absolute;\n    left: 0.867rem;\n    top: 4.68rem;\n    width: 1.867rem;\n    height: 1.573rem;\n    background-position: 0 1.573rem;\n    background-repeat: no-repeat;\n    background-size: contain;\n    -webkit-animation: typetext2 2s linear 0s infinite;\n}\n\n\n@-webkit-keyframes typetext2 {\n    0% {\n        -webkit-transform: translateY(-100%);\n        background-position: 0 1.573rem;\n    }\n\n    9.999% {\n        -webkit-transform: translateY(-100%);\n        background-position: 0 1.573rem;\n    }\n    10% {\n        -webkit-transform: translateY(-90%);\n        background-position: 0 1.415rem;\n    }\n\n    19.999% {\n        -webkit-transform: translateY(-90%);\n        background-position: 0 1.415rem;\n    }\n    20% {\n        -webkit-transform: translateY(-80%);\n        background-position: 0 1.258rem;\n    }\n\n    29.999% {\n        -webkit-transform: translateY(-80%);\n        background-position: 0 1.258rem;\n    }\n    30% {\n        -webkit-transform: translateY(-70%);\n        background-position: 0 1.101rem;\n    }\n\n    39.999% {\n        -webkit-transform: translateY(-70%);\n        background-position: 0 1.101rem;\n    }\n    40% {\n        -webkit-transform: translateY(-60%);\n        background-position: 0 0.9438rem;\n    }\n\n    49.999% {\n        -webkit-transform: translateY(-60%);\n        background-position: 0 0.9438rem;\n    }\n    50% {\n        -webkit-transform: translateY(-50%);\n        background-position: 0 0.7865rem;\n    }\n\n    59.999% {\n        -webkit-transform: translateY(-50%);\n        background-position: 0 0.7865rem;\n    }\n    60% {\n        -webkit-transform: translateY(-40%);\n        background-position: 0 0.6292rem;\n    }\n\n    69.999% {\n        -webkit-transform: translateY(-40%);\n        background-position: 0 0.6292rem;\n    }\n    70% {\n        -webkit-transform: translateY(-30%);\n        background-position: 0 0.4719rem;\n    }\n\n    79.999% {\n        -webkit-transform: translateY(-30%);\n        background-position: 0 0.4719rem;\n    }\n    80% {\n        -webkit-transform: translateY(-20%);\n        background-position: 0 0.3146rem;\n    }\n\n    89.999% {\n        -webkit-transform: translateY(-20%);\n        background-position: 0 0.3146rem;\n    }\n    90% {\n        -webkit-transform: translateY(-10%);\n        background-position: 0 0.1573rem;\n    }\n\n    99.999% {\n        -webkit-transform: translateY(-10%);\n        background-position: 0 0.1573rem;\n    }\n    100% {\n        -webkit-transform: translateY(0);\n        background-position: 0 0;\n    }\n}\n\n#pop .popIcon {\n    position: absolute;\n    left: 1.04rem;\n    top: 2.226rem;\n    width: 1.8rem;\n    height: 2.253rem;\n    background-position: 0 0;\n    background-repeat: no-repeat;\n    background-size: 3.6rem 2.253rem;\n    -webkit-animation: sprites 1s linear 0s infinite;\n}\n\n@-webkit-keyframes sprites {\n    0% {\n        background-position: 0 0;\n    }\n\n    49.999% {\n        background-position: 0 0;\n    }\n\n    50% {\n        background-position: -1.8rem 0;\n    }\n\n    100% {\n        background-position: -1.8rem 0;\n    } \n}\n\n#pop .title {\n    position: absolute;\n    width: 5rem;\n    left: 3rem;\n    top: 1.693rem;\n    font-size: 16px;\n    color: #FFF;\n    text-shadow:\n        2px 0 2px rgba(0, 203, 227, 0.3),\n        0 2px 2px rgba(0, 203, 227, 0.3), \n        0 -2px 2px rgba(0, 203, 227, 0.3),\n        -2px 0 2px rgba(0, 203, 227, 0.3);\n    white-space: nowrap;\n}\n\n#pop .text {\n    position: absolute;\n    width: 5rem;\n    left: 3rem;\n    top: 2.586rem;\n    font-size: 12px;\n    color: #00cbe3;\n    text-shadow:\n        1px 0 1px rgba(0, 203, 227, 0.3),\n        0 1px 1px rgba(0, 203, 227, 0.3), \n        0 -1px 1px rgba(0, 203, 227, 0.3),\n        -1px 0 1px rgba(0, 203, 227, 0.3);\n}\n\n#pop .popClose {\n    position: absolute;\n    left: 0;\n    bottom: 0.546rem;\n    width: 100%;\n    height: 1.2rem;\n    background-position: center center;\n    background-repeat: no-repeat;\n    background-size: 1.2rem 1.2rem;\n}\n\n#pop.shareble .popClose {\n    display: none;\n}\n\n#pop .btns {\n    display: none;\n    width: 100%;\n    -webkit-box-pack: center;\n    -webkit-box-align: center; \n    padding-top: 0.5rem;\n}\n\n#pop.shareble .btns{\n    display: -webkit-box;\n}\n\n#pop .popBtn {\n    width: 2.68rem;\n    height: 0.773rem;\n    line-height: 0.773rem;\n    text-align: center;\n    color: #FFF;\n    background-position: 0 0;\n    background-repeat: no-repeat;\n    background-size: contain;\n    margin: 0 0.4rem;\n}", ""]);
	
	// exports


/***/ },
/* 166 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    loading: {
	        texts: [[['欢迎来到TGP游戏世界'], ['欢迎来到TGP游戏世界'], ['欢迎来到TGP游戏世界'], ['欢迎来到TGP游戏世界']], [['欢迎来到TGP游戏世界'], ['欢迎来到TGP游戏世界'], ['欢迎来到TGP游戏世界']], [['欢迎来到TGP游戏世界'], ['欢迎来到TGP游戏世界'], ['欢迎来到TGP游戏世界'], ['欢迎来到TGP游戏世界'], ['欢迎来到TGP游戏世界']], [['欢迎来到TGP游戏世界'], ['欢迎来到TGP游戏世界'], ['欢迎来到TGP游戏世界'], ['欢迎来到TGP游戏世界']]]
	    },
	
	    gl: { // 开场引导
	        type: 'popup',
	        title: '欢迎来到TGP游戏世界',
	        text: '散布在宇宙中的神秘力量，找到他们，神秘“鸡腿”在等你',
	        shareble: false,
	        bgType: 1
	    },
	
	    found5: { // 找到5个
	        type: 'tip',
	        tip: '赞！已发现5个游戏星球。<br/>神秘”鸡腿”就在星空深处，等你哟！',
	        bgType: 1
	    },
	
	    found15: { // 找到15个
	        type: 'tip',
	        tip: '啊！还差5个！<br/>离“鸡腿”还差5个！',
	        bgType: 2
	    },
	
	    found20: { // 找到20个
	        type: 'popup',
	        title: '找到全部游戏星球！',
	        text: '我去！你还真找全了！<br/>给跪，请收下我的鸡腿！',
	        bgType: 3,
	        shareble: true
	    },
	
	    blacksheepwall: { // 地图全开
	        type: 'popup',
	        title: '探索了整个宇宙！',
	        text: '勤奋的少年，宇宙是不是充满了奥妙，去TGP的游戏世界，那里也是一样。',
	        bgType: 2,
	        shareble: true
	    },
	
	    gg: { //地图全开 + 找到20个
	        type: 'popup',
	        title: '找到全部游戏星球！',
	        text: '至此你已看完，奥妙的宇宙和纷繁的TGP世界，你可以去分享了。',
	        bgType: 3,
	        shareble: true
	    }
	};

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzIzNjk0YmFhMmUzZjU1NTAzMWEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuY3NzPzY3MzciLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuY3NzIiwid2VicGFjazovLy8uL34vLjAuMjUuMEBjc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4wLjEzLjFAc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvYXJyYXkvZnJvbS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RlZmluZWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXJhdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2h0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1ncG8uanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuZnJvbS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jYWxsLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jcmVhdGUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jbGFzc29mLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRldGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qtc2FwLmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuLmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sL2l0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1zdGVwLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MtZXh0LmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN5bWJvbC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWV0YS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fa2V5b2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0ta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi1leHQuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BuLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wZC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wub2JzZXJ2YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9oZWxwZXJzL2luaGVyaXRzLmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L3NldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXByb3RvLmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4wLjEuMEBnZXN0dXJlLWpzL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMC4zLjRAZXZlbnQtZW1pdHRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4wLjEuMUBkL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3QvYXNzaWduL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3QvYXNzaWduL2lzLWltcGxlbWVudGVkLmpzIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3QvYXNzaWduL3NoaW0uanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMC4xMC4xMkBlczUtZXh0L29iamVjdC9rZXlzL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3Qva2V5cy9pcy1pbXBsZW1lbnRlZC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4wLjEwLjEyQGVzNS1leHQvb2JqZWN0L2tleXMvc2hpbS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4wLjEwLjEyQGVzNS1leHQvb2JqZWN0L3ZhbGlkLXZhbHVlLmpzIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3Qvbm9ybWFsaXplLW9wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMC4xMC4xMkBlczUtZXh0L29iamVjdC9pcy1jYWxsYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4wLjEwLjEyQGVzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMC4xMC4xMkBlczUtZXh0L3N0cmluZy8jL2NvbnRhaW5zL2lzLWltcGxlbWVudGVkLmpzIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9zdHJpbmcvIy9jb250YWlucy9zaGltLmpzIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3QvdmFsaWQtY2FsbGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9zdGFnZS5jc3M/M2I4MiIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhZ2UuY3NzIiwid2VicGFjazovLy8uL3NyYy9jYW52YXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvaXMtaXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2xpY2VDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbGxvV29ybGQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbGxvd29ybGQuY3NzPzQ2Y2IiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbGxvd29ybGQuY3NzIiwid2VicGFjazovLy8uL3NyYy9jbG91ZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3Rhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzLmpzIiwid2VicGFjazovLy8uL3NyYy9lbGVtZW50cy5jc3M/ODEwZSIsIndlYnBhY2s6Ly8vLi9zcmMvZWxlbWVudHMuY3NzIiwid2VicGFjazovLy8uL3NyYy9tYXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC5jc3M/OWNkYiIsIndlYnBhY2s6Ly8vLi9zcmMvbWFwLmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGlja2VyLmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvbWFwLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9tYXAuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm1hcC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29sbGVjdGlvbi1zdHJvbmcuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLWFsbC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4taW5zdGFuY2UuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Zvci1vZi5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXNwZWNpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvbGxlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LW1ldGhvZHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LXNwZWNpZXMtY3JlYXRlLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1zcGVjaWVzLWNvbnN0cnVjdG9yLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5tYXAudG8tanNvbi5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29sbGVjdGlvbi10by1qc29uLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1mcm9tLWl0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL3NyYy9wb3AuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BvcC5jc3M/NzZlOCIsIndlYnBhY2s6Ly8vLi9zcmMvcG9wLmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGV4dENvbmZpZy5qcyJdLCJuYW1lcyI6WyJwcmVsb2FkIiwiYXNzZXRzUHJlbG9hZCIsIml0ZW1zIiwiYXNzZXRzSXRlbXMiLCJzY3JvbGxTbG93UmF0aW8iLCJ2aWV3cG9ydCIsImJvZHkiLCJzY3JvbGxlciIsInRpY2tlciIsInN0YWdlIiwiaGVsbG9Xb3JsZCIsImNsb3VkIiwic3RhciIsImVsZW1lbnRzIiwiZWxlbWVudENvdW50IiwibWFwIiwicG9wIiwic2hvd1RpcCIsImNvbmZpZyIsInNob3ciLCJ0aXAiLCJiZ1R5cGUiLCJzaG93UG9wIiwiZW5hYmxlIiwicG9wdXAiLCJ0aXRsZSIsInRleHQiLCJzaGFyZWJsZSIsIm9ubGVmdGNsaWNrIiwiY2xvc2UiLCJ0aGVuIiwib25yaWdodGNsaWNrIiwib25jbG9zZWNsaWNrIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInJ1biIsInJlYWR5Iiwid2lkdGgiLCJoZWlnaHQiLCJ2dyIsInZoIiwicHJvbWlzZXMiLCJwdXNoIiwiYWxsIiwiZmlyc3RSZW5kZXJlZCIsInNjcm9sbFgiLCJzY3JvbGxZIiwic3RhclJvbGxZIiwic3RhclJvbGxJZCIsImFkZCIsInN0YXJSb2xsU3BlZWQiLCJzaG93VGV4dElkIiwic2hvd0dsb2RJZCIsImZseUNvaW5JZCIsImNsZWFyQ2xvdWRJZCIsImhvdmVyU2xpY2UiLCJnZXRIb3ZlclNsaWNlIiwiZm9jdXNTbGljZSIsImdldEZvY3VzU2xpY2UiLCJzbGljZVdpZHRoIiwic2xpY2VIZWlnaHQiLCJvbiIsImRlbGV0ZSIsIngiLCJ5IiwiY2xlYXIiLCJ0eXBlIiwic2hvd1RleHQiLCJvcmlnaW5hbEV2ZW50IiwidGFyZ2V0IiwiY2FudmFzIiwidGFwRm9jdXNTbGljZSIsImV4IiwiZXkiLCJzaG93R29sZCIsImVuZCIsImZseUNvaW4iLCJ1cGRhdGUiLCJzcGVjaWFsQW1vdW50Iiwic3BlY2lhbEZvdW5kIiwidG90YWxBbW91bnQiLCJmb2N1c2VkQW1vdW50IiwiZHJhd0ltYWdlcyIsIm9mZnNjcmVlblJlbmRlciIsImNsZWFyUmVjdCIsImRyYXdJbWFnZSIsImltYWdlIiwicmVuZGVyIiwib2Zmc2NyZWVuQ2FudmFzIiwicmVwZWF0IiwicHJvbWlzZSIsInJlc29sdmUiLCJpIiwidGlja2VySWQiLCJwbGF5IiwiTWF0aCIsInJhbmRvbSIsImVuZGluZyIsImhTbGljZSIsInZTbGljZSIsInhwIiwieXAiLCJkaXN0YW5jZSIsImZvdW5kIiwiYW1vdW50IiwidG90YWwiLCJmb2N1cyIsImJvbmVYIiwiYm9uZVkiLCJzY3JvbGxUbyIsImdsIiwid2luIiwid2luZG93IiwiZG9jIiwiZG9jdW1lbnQiLCJQcm9taXNlIiwiY3JlYXRlanMiLCJhcHBlbmRTdHlsZSIsImNzc1RleHQiLCJzdHlsZSIsImNyZWF0ZUVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiYXBwZW5kQ2hpbGQiLCJkb21yZWFkeSIsInJlamVjdCIsInJlYWR5U3RhdGUiLCJkZWZlciIsImRlZmVycmVkIiwiZGVsYXkiLCJ0aW1lIiwic2V0VGltZW91dCIsInF1ZXJ5Iiwic2VsZWN0b3IiLCJxdWVyeVNlbGVjdG9yIiwicXVlcnlBbGwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZ2V0UmVjdCIsImVsIiwicmVjdHMiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJnZXREaXN0YW5jZSIsIngxIiwieTEiLCJ4MiIsInkyIiwic3FydCIsImxvYWRJbWciLCJzcmMiLCJJbWFnZSIsIm9ubG9hZCIsImltZzJDYW52YXMiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsInJhZiIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSIsImZuIiwiY2FmIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJ3ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZSIsImlkIiwiY2xlYXJUaW1lb3V0IiwiU2Nyb2xsZXIiLCJzY2FsZSIsIl9pc1Njcm9sbGluZyIsIl9lbmFibGUiLCJfc2NhbGUiLCJseCIsImx5IiwibmFtZSIsImV4dHJhIiwia2V5IiwiZW1pdCIsImVtaXRUYXAiLCJfZW1pdCIsInRvdWNoIiwiY2xpZW50WCIsImNsaWVudFkiLCJlbWl0U3RhcnQiLCJlbWl0U2Nyb2xsIiwiZW1pdEVuZCIsImNhbFhZIiwibm9TY2FsZSIsImRpc3BsYWNlbWVudFgiLCJkaXNwbGFjZW1lbnRZIiwibWluIiwibWF4IiwiRXZlbnQiLCJwcm90b3R5cGUiLCJTdGFnZSIsInN0YWdlRWwiLCJzbGljZXMiLCJ2IiwiaCIsImluZGV4IiwiU3RyaW5nIiwicGFyc2VJbnQiLCJob3ZlciIsImdldFNsaWNlIiwicmVsYXRlZCIsInNsaWNlIiwiaG92ZXJlZCIsImN4IiwiY3kiLCJkeCIsImR5IiwiZm9jdXNlZCIsImRpc3BsYXkiLCJsZW5ndGgiLCJmaWx0ZXIiLCJDYW52YXNJbWFnZSIsIkhUTUxDYW52YXNFbGVtZW50IiwiX2ltYWdlIiwicGFyYW1zIiwibG9hZGVkIiwicGFyYW0iLCJpbWciLCJmb3JFYWNoIiwiYXJncyIsInN4Iiwic3kiLCJzdyIsInNoIiwidG9EYXRhVVJMIiwiQ2FudmFzUmVuZGVyIiwiX3Zpc2libGUiLCJfb2Zmc2NyZWVuIiwiY29pblgiLCJjb2luWSIsIkhlbGxvV29ybGQiLCJ3cmFwRWwiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJkdXJhdGlvbiIsImNvdW50IiwiZWxhcHNlZCIsImRlbHRhIiwiYmFja2dyb3VuZFBvc2l0aW9uWCIsIkNsb3VkIiwiaG92ZXJzIiwiaWRzIiwicHVzaFBhcmFtcyIsImluZGV4T2YiLCJkcmF3IiwiY2xlYXJlZCIsImdsb2JhbEFscGhhIiwib2JqIiwiU3RhciIsIm9yaWdpblNsaWNlV2lkdGgiLCJvcmlnaW5TbGljZUhlaWdodCIsIkVsZW1lbnRzIiwic2NhbGVSYXRpbyIsInNob3duIiwidGV4dEFscGhhIiwiZ29sZFkiLCJub0NvaW4iLCJjb2luIiwiZW5kWCIsImVuZFkiLCJwZXJjZW50Iiwic2xvdyIsImNhbnZhc0ltYWdlIiwic3RhdGljSW1nIiwidGV4dEltZyIsImdvbGRJbWciLCJzYXZlIiwicmVzdG9yZSIsImNvaW5zIiwiY29pbkltZyIsIm1hdGNoIiwiaXRlbSIsIk51bWJlciIsIkVsZW1lbnRDb3VudCIsInRleHRFbCIsInRleHROdW1iZXJFbCIsInRleHRUaXBFbCIsInRleHRCZ0VsIiwiYmFyRWwiLCJ0aXBzRWwiLCJpbm5lckhUTUwiLCJjbGFzc05hbWUiLCJrZXlmcmFtZXMiLCJ3ZWJraXRBbmltYXRpb24iLCJNYXAiLCJjYW52YXNFbCIsImluZGljYXRvckVsIiwib3BlbmVkIiwic3RyIiwiY1dpZHRoIiwiY0hlaWdodCIsImlXaWR0aCIsImlIZWlnaHQiLCJzV2lkdGgiLCJzSGVpZ2h0Iiwid2Via2l0VHJhbnNmb3JtIiwiZmlsbFJlY3QiLCJmaWxsU3R5bGUiLCJnbG9iYWxDb21wb3NpdGVPcGVyYXRpb24iLCJUaWNrZXIiLCJfaWQiLCJfbWFwRiIsIl9tYXBDIiwiZiIsImhhcyIsInNldCIsImNhbmNlbCIsInN0YXJ0IiwiZ2V0IiwiYyIsInJpZCIsIkRhdGUiLCJub3ciLCJ0aWNrIiwia2V5cyIsIlBvcCIsInBvcEVsIiwiY29udGVudEVsIiwiY2xvc2VFbCIsInRpdGxlRWwiLCJiZzFFbCIsImJnMkVsIiwiYnRuc0VsIiwibGVmdEJ0bkVsIiwicmlnaHRCdG5FbCIsInZpc2liaWxpdHkiLCJyZXBsYWNlIiwiaGFuZGxlciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJvbkxlZnRDbGljayIsIm9uUmlnaHRDbGljayIsIm9uQ2xvc2VDbGljayIsImxvYWRpbmciLCJ0ZXh0cyIsImZvdW5kNSIsImZvdW5kMTUiLCJmb3VuZDIwIiwiYmxhY2tzaGVlcHdhbGwiLCJnZyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0Q0E7O0FBQ0E7O0FBVUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUlBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7S0FHbUJBLE8sYUFBZkMsYTtLQUNhQyxLLGFBQWJDLFc7OztBQUdKLEtBQU1DLGtCQUFrQixHQUF4QjtBQUNBLEtBQUlDLFdBQVcsaUJBQU0sVUFBSUMsSUFBVixFQUFnQixPQUFoQixDQUFmO0FBQ0EsS0FBSUMsaUJBQUo7QUFDQSxLQUFJQyxlQUFKO0FBQ0EsS0FBSUMsY0FBSjtBQUNBLEtBQUlDLG1C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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkJBQTBCOztBQUUxQjtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ25JQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUEsVUFBUztBQUNUO0FBQ0E7Ozs7Ozs7QUM5REE7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7O0FDSkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUTtBQUNSLGVBQWMsYUFBYSxHQUFHLGVBQWU7QUFDN0M7QUFDQTs7Ozs7OztBQ1JBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPLHNCQUFzQixFQUFFO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLGFBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNyQkE7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7O0FDSkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFLFlBQVksY0FBYztBQUM1Qjs7Ozs7OztBQ1BBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztBQ05BOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDTEE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBOzs7Ozs7O0FDaEJBOztBQUVBOztBQUVBLGtD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QUFNLDRCQUhEO0FBSUxMLGlCQUFRLENBSkg7QUFLTE0sbUJBQVU7QUFMTCxNQWxERTs7QUEwRFhzVCxxQkFBZ0IsRUFBRTtBQUNkOVEsZUFBTSxPQURNO0FBRVoxQyxnQkFBTyxVQUZLO0FBR1pDLGVBQU0sb0NBSE07QUFJWkwsaUJBQVEsQ0FKSTtBQUtaTSxtQkFBVTtBQUxFLE1BMURMOztBQWtFWHVULFNBQUksRUFBRTtBQUNGL1EsZUFBTSxPQUROO0FBRUExQyxnQkFBTyxXQUZQO0FBR0FDLGVBQU0sZ0NBSE47QUFJQUwsaUJBQVEsQ0FKUjtBQUtBTSxtQkFBVTtBQUxWO0FBbEVPLEUiLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGMyMzY5NGJhYTJlM2Y1NTUwMzFhIiwiaW1wb3J0ICcuL2dhbWUuY3NzJztcbmltcG9ydCB7XG4gICAgd2luLFxuICAgIGRvYyxcbiAgICBQcm9taXNlLFxuICAgIGRlZmVyLFxuICAgIHF1ZXJ5LFxuICAgIHF1ZXJ5QWxsLFxuICAgIGdldFJlY3QsXG4gICAgZGVsYXlcbn0gZnJvbSAnLi91dGlsJztcbmltcG9ydCBTY3JvbGxlciBmcm9tICcuL3Njcm9sbGVyJztcbmltcG9ydCBTdGFnZSBmcm9tICcuL3N0YWdlJztcbmltcG9ydCBIZWxsb1dvcmxkIGZyb20gJy4vaGVsbG9Xb3JsZCc7XG5pbXBvcnQgQ2xvdWQgZnJvbSAnLi9jbG91ZCc7XG5pbXBvcnQgU3RhciBmcm9tICcuL3N0YXInO1xuaW1wb3J0IHtcbiAgICBFbGVtZW50cyxcbiAgICBFbGVtZW50Q291bnRcbn0gZnJvbSAnLi9lbGVtZW50cyc7XG5pbXBvcnQgTWFwIGZyb20gJy4vbWFwJztcbmltcG9ydCBUaWNrZXIgZnJvbSAnLi90aWNrZXInO1xuaW1wb3J0IFBvcCBmcm9tICcuL3BvcCc7XG5pbXBvcnQgdGV4dENvbmZpZyBmcm9tICcuL3RleHRDb25maWcnO1xuXG5jb25zdCB7XG4gICAgYXNzZXRzUHJlbG9hZDogcHJlbG9hZCxcbiAgICBhc3NldHNJdGVtczogaXRlbXMsXG59ID0gd2luO1xuXG5jb25zdCBzY3JvbGxTbG93UmF0aW8gPSAwLjU7XG5sZXQgdmlld3BvcnQgPSBxdWVyeShkb2MuYm9keSwgJyNnYW1lJyk7XG5sZXQgc2Nyb2xsZXI7XG5sZXQgdGlja2VyO1xubGV0IHN0YWdlO1xubGV0IGhlbGxvV29ybGQ7XG5sZXQgY2xvdWQ7XG5sZXQgc3RhcjtcbmxldCBlbGVtZW50cztcbmxldCBlbGVtZW50Q291bnQ7XG5sZXQgbWFwO1xubGV0IHBvcDtcblxuZnVuY3Rpb24gc2hvd1RpcChjb25maWcpIHtcbiAgICBlbGVtZW50Q291bnQgJiYgZWxlbWVudENvdW50LnNob3coe1xuICAgICAgICB0aXA6IGNvbmZpZy50aXAsXG4gICAgICAgIGJnVHlwZTogY29uZmlnLmJnVHlwZVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBzaG93UG9wKGNvbmZpZykge1xuICAgIHNjcm9sbGVyICYmIChzY3JvbGxlci5lbmFibGUgPSBmYWxzZSk7XG5cbiAgICByZXR1cm4gcG9wICYmIHBvcC5wb3B1cCh7XG4gICAgICAgIHRpdGxlOiBjb25maWcudGl0bGUsXG4gICAgICAgIHRleHQ6IGNvbmZpZy50ZXh0LFxuICAgICAgICBzaGFyZWJsZTogY29uZmlnLnNoYXJlYmxlLFxuICAgICAgICBiZ1R5cGU6IGNvbmZpZy5iZ1R5cGUsXG4gICAgICAgIG9ubGVmdGNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICBwb3AuY2xvc2UoKS50aGVuKCgpID0+IHNjcm9sbGVyLmVuYWJsZSA9IHRydWUpO1xuICAgICAgICB9LFxuICAgICAgICBvbnJpZ2h0Y2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgIHBvcC5jbG9zZSgpLnRoZW4oKCkgPT4gc2Nyb2xsZXIuZW5hYmxlID0gdHJ1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uY2xvc2VjbGljazogKCkgPT4ge1xuICAgICAgICAgICAgcG9wLmNsb3NlKCkudGhlbigoKSA9PiBzY3JvbGxlci5lbmFibGUgPSB0cnVlKTtcbiAgICAgICAgfVxuICAgIH0pIFxufVxuXG5wcmVsb2FkXG4gICAgLnRoZW4oKCkgPT4geyAvLyBwcmV2ZW50IGV2ZW50XG4gICAgICAgIHZpZXdwb3J0LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBlID0+IGUucHJldmVudERlZmF1bHQoKSk7XG4gICAgICAgIHZpZXdwb3J0LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGUgPT4gZS5wcmV2ZW50RGVmYXVsdCgpKTtcbiAgICAgICAgdmlld3BvcnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBlID0+IGUucHJldmVudERlZmF1bHQoKSk7XG4gICAgfSlcbiAgICAudGhlbigoKSA9PiB7IC8vIHRpY2tlclxuICAgICAgICB0aWNrZXIgPSBuZXcgVGlja2VyKCk7XG4gICAgICAgIHRpY2tlci5ydW4oKTtcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHsgLy8gaGVsbG93b3JsZFxuICAgICAgICBoZWxsb1dvcmxkID0gbmV3IEhlbGxvV29ybGQodmlld3BvcnQsIGl0ZW1zKTtcbiAgICAgICAgcmV0dXJuIGhlbGxvV29ybGQucmVhZHkoKTtcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHsgLy8gc3RhZ2VcbiAgICAgICAgc3RhZ2UgPSBuZXcgU3RhZ2Uodmlld3BvcnQpO1xuICAgICAgICByZXR1cm4gc3RhZ2UucmVhZHkoKTtcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHsgLy8gc2Nyb2xsZXJcbiAgICAgICAgc2Nyb2xsZXIgPSBuZXcgU2Nyb2xsZXIoc3RhZ2Uud2lkdGgsIHN0YWdlLmhlaWdodCwgc3RhZ2UudncsIHN0YWdlLnZoLCBzY3JvbGxTbG93UmF0aW8pO1xuICAgICAgICBzY3JvbGxlci5lbmFibGUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHNjcm9sbGVyLnJlYWR5KCk7XG4gICAgfSlcbiAgICAudGhlbigoKSA9PiB7IC8vIHRoaW5nc1xuICAgICAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuXG4gICAgICAgIHN0YXIgPSBuZXcgU3RhcihzdGFnZSwgaXRlbXMpO1xuICAgICAgICBwcm9taXNlcy5wdXNoKHN0YXIucmVhZHkoKSk7XG5cbiAgICAgICAgZWxlbWVudHMgPSBuZXcgRWxlbWVudHMoc3RhZ2UsIGl0ZW1zKTtcbiAgICAgICAgcHJvbWlzZXMucHVzaChlbGVtZW50cy5yZWFkeSgpKTtcblxuICAgICAgICBjbG91ZCA9IG5ldyBDbG91ZChzdGFnZSwgaXRlbXMpO1xuICAgICAgICBwcm9taXNlcy5wdXNoKGNsb3VkLnJlYWR5KCkpO1xuXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgfSlcbiAgICAudGhlbigoKSA9PiB7IC8vIHJlbmRlclxuICAgICAgICBsZXQgZmlyc3RSZW5kZXJlZCA9IGZhbHNlO1xuICAgICAgICBsZXQgc2Nyb2xsWCA9IDA7XG4gICAgICAgIGxldCBzY3JvbGxZID0gMDtcbiAgICAgICAgbGV0IHN0YXJSb2xsWSA9IHN0YWdlLnZoO1xuICAgICAgICBsZXQgc3RhclJvbGxJZCA9IHRpY2tlci5hZGQoKCkgPT4ge1xuICAgICAgICAgICAgc3RhclJvbGxZIC09IHN0YXJSb2xsU3BlZWQ7XG4gICAgICAgICAgICBpZiAoc3RhclJvbGxZIDwgMCkge1xuICAgICAgICAgICAgICAgIHN0YXJSb2xsWSA9IHN0YWdlLnZoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IHN0YXJSb2xsU3BlZWQgPSAxO1xuICAgICAgICBsZXQgc2hvd1RleHRJZDtcbiAgICAgICAgbGV0IHNob3dHbG9kSWQ7XG4gICAgICAgIGxldCBmbHlDb2luSWQ7XG4gICAgICAgIGxldCBjbGVhckNsb3VkSWQ7XG4gICAgICAgIGxldCBob3ZlclNsaWNlID0gc3RhZ2UuZ2V0SG92ZXJTbGljZSgwLCAwKTtcbiAgICAgICAgbGV0IGZvY3VzU2xpY2UgPSBzdGFnZS5nZXRGb2N1c1NsaWNlKHN0YWdlLnNsaWNlV2lkdGggLyAyLCBzdGFnZS5zbGljZUhlaWdodCAvIDIpO1xuXG4gICAgICAgIHNjcm9sbGVyLm9uKCdzY3JvbGxzdGFydCcsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKGNsZWFyQ2xvdWRJZCkge1xuICAgICAgICAgICAgICAgIHRpY2tlci5kZWxldGUoY2xlYXJDbG91ZElkKTtcbiAgICAgICAgICAgICAgICBjbGVhckNsb3VkSWQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBzY3JvbGxlci5vbignc2Nyb2xsaW5nJywgZSA9PiB7XG4gICAgICAgICAgICBzY3JvbGxYID0gZS54O1xuICAgICAgICAgICAgc2Nyb2xsWSA9IGUueTtcbiAgICAgICAgICAgIGhvdmVyU2xpY2UgPSBzdGFnZS5nZXRIb3ZlclNsaWNlKHNjcm9sbFgsIHNjcm9sbFkpO1xuICAgICAgICAgICAgZm9jdXNTbGljZSA9IHN0YWdlLmdldEZvY3VzU2xpY2Uoc2Nyb2xsWCArIHN0YWdlLnNsaWNlV2lkdGggLyAyLCBzY3JvbGxZICsgc3RhZ2Uuc2xpY2VIZWlnaHQgLyAyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2Nyb2xsZXIub24oJ3Njcm9sbGVuZCcsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKGZvY3VzU2xpY2UpIHtcbiAgICAgICAgICAgICAgICBjbGVhckNsb3VkSWQgPSB0aWNrZXIuYWRkKGNsb3VkLmNsZWFyKGZvY3VzU2xpY2UpKTtcbiAgICAgICAgICAgICAgICBpZiAoZm9jdXNTbGljZS50eXBlID49IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd1RleHRJZCA9IHRpY2tlci5hZGQoZWxlbWVudHMuc2hvd1RleHQoZm9jdXNTbGljZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2Nyb2xsZXIub24oJ3RhcCcsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKGUub3JpZ2luYWxFdmVudC50YXJnZXQgPT09IHN0YWdlLmNhbnZhc1xuICAgICAgICAgICAgICAgICAgICAmJiBmb2N1c1NsaWNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFwRm9jdXNTbGljZSA9IHN0YWdlLmdldEZvY3VzU2xpY2UoZS5leCwgZS5leSk7XG4gICAgICAgICAgICAgICAgaWYgKHRhcEZvY3VzU2xpY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0dsb2RJZCA9IHRpY2tlci5hZGQoZWxlbWVudHMuc2hvd0dvbGQodGFwRm9jdXNTbGljZSkpO1xuICAgICAgICAgICAgICAgICAgICB0aWNrZXIuZW5kKHNob3dHbG9kSWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZseUNvaW5JZCA9IHRpY2tlci5hZGQoZWxlbWVudHMuZmx5Q29pbih0YXBGb2N1c1NsaWNlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGlja2VyLm9uKCdhZnRlcnRpY2snLCBlID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnRDb3VudCAmJiBlbGVtZW50Q291bnQudXBkYXRlKFxuICAgICAgICAgICAgICAgIHN0YWdlLnNwZWNpYWxBbW91bnQsXG4gICAgICAgICAgICAgICAgc3RhZ2Uuc3BlY2lhbEZvdW5kLFxuICAgICAgICAgICAgICAgIHN0YWdlLnRvdGFsQW1vdW50LFxuICAgICAgICAgICAgICAgIHN0YWdlLmZvY3VzZWRBbW91bnRcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGVsZW1lbnRzLmRyYXdJbWFnZXMoaG92ZXJTbGljZSwgZm9jdXNTbGljZSwgc2Nyb2xsWCwgc2Nyb2xsWSk7XG4gICAgICAgICAgICBjbG91ZC5kcmF3SW1hZ2VzKGhvdmVyU2xpY2UsIGZvY3VzU2xpY2UsIHNjcm9sbFgsIHNjcm9sbFkpO1xuXG4gICAgICAgICAgICBzdGFnZS5vZmZzY3JlZW5SZW5kZXIuY2xlYXJSZWN0KDAsIDAsIHN0YWdlLnZ3LCBzdGFnZS52aCk7XG4gICAgICAgICAgICBzdGFnZS5vZmZzY3JlZW5SZW5kZXIuZHJhd0ltYWdlKHN0YXIuaW1hZ2UsIDAsIHN0YXJSb2xsWSwgc3RhZ2UudncsIHN0YWdlLnZoLCAwLCAwLCBzdGFnZS52dywgc3RhZ2UudmgpO1xuICAgICAgICAgICAgc3RhZ2Uub2Zmc2NyZWVuUmVuZGVyLmRyYXdJbWFnZShlbGVtZW50cy5jYW52YXMsIDAsIDAsIHN0YWdlLnZ3LCBzdGFnZS52aCwgMCwgMCwgc3RhZ2UudncsIHN0YWdlLnZoKTtcbiAgICAgICAgICAgIHN0YWdlLm9mZnNjcmVlblJlbmRlci5kcmF3SW1hZ2UoY2xvdWQuY2FudmFzLCAwLCAwLCBzdGFnZS52dywgc3RhZ2UudmgsIDAsIDAsIHN0YWdlLnZ3LCBzdGFnZS52aCk7XG5cbiAgICAgICAgICAgIHN0YWdlLnJlbmRlci5jbGVhclJlY3QoMCwgMCwgc3RhZ2UudncsIHN0YWdlLnZoKTtcbiAgICAgICAgICAgIHN0YWdlLnJlbmRlci5kcmF3SW1hZ2Uoc3RhZ2Uub2Zmc2NyZWVuQ2FudmFzLCAwLCAwLCBzdGFnZS52dywgc3RhZ2UudmgsIDAsIDAsIHN0YWdlLnZ3LCBzdGFnZS52aCk7XG4gICAgICAgIH0pO1xuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4geyAvLyBzaG93IGhlbGxvd29ybGRcbiAgICAgICAgY29uc3QgcmVwZWF0ID0gODtcbiAgICAgICAgbGV0IHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlcGVhdDsgaSsrKSB7XG4gICAgICAgICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0aWNrZXJJZCA9IHRpY2tlci5hZGQoaGVsbG9Xb3JsZC5wbGF5KCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aWNrZXIuZW5kKHRpY2tlcklkKTtcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4gZGVsYXkoNTAwICsgTWF0aC5yYW5kb20oKSAqIDUwMCkpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKCgpID0+IGRlbGF5KDEwMDApKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IGhlbGxvV29ybGQuZW5kaW5nKCkpO1xuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4geyAvLyBwb3BcbiAgICAgICAgcG9wID0gbmV3IFBvcCh2aWV3cG9ydCk7XG4gICAgICAgIHJldHVybiBwb3AucmVhZHkoKTtcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHsgLy8gbWFwXG4gICAgICAgIG1hcCA9IG5ldyBNYXAodmlld3BvcnQsIHN0YWdlLmhTbGljZSwgc3RhZ2UudlNsaWNlKTtcblxuICAgICAgICBzY3JvbGxlci5vbignc2Nyb2xsaW5nJywgZSA9PiB7XG4gICAgICAgICAgICBjb25zdCB4cCA9IGUueCAvIHN0YWdlLndpZHRoO1xuICAgICAgICAgICAgY29uc3QgeXAgPSBlLnkgLyBzdGFnZS5oZWlnaHQ7XG4gICAgICAgICAgICBtYXAudXBkYXRlKHhwLCB5cCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNjcm9sbGVyLm9uKCdzY3JvbGxlbmQnLCBlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHhwID0gZS54IC8gc3RhZ2Uud2lkdGg7XG4gICAgICAgICAgICBjb25zdCB5cCA9IGUueSAvIHN0YWdlLmhlaWdodDtcbiAgICAgICAgICAgIG1hcC5jbGVhcih4cCwgeXApO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBmb2N1c1NsaWNlID0gc3RhZ2UuZ2V0Rm9jdXNTbGljZShlLnggKyBzdGFnZS5zbGljZVdpZHRoIC8gMiwgZS55ICsgc3RhZ2Uuc2xpY2VIZWlnaHQgLyAyKTtcbiAgICAgICAgICAgIGlmIChmb2N1c1NsaWNlICYmIGZvY3VzU2xpY2UuZGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICBtYXAudGV4dChmb2N1c1NsaWNlLmRpc3RhbmNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG1hcC5yZWFkeSgpO1xuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4geyAvLyBlbGVtZW50cyBjb3VudFxuICAgICAgICBlbGVtZW50Q291bnQgPSBuZXcgRWxlbWVudENvdW50KHZpZXdwb3J0LCBpdGVtcyk7XG5cbiAgICAgICAgZWxlbWVudENvdW50Lm9uKCd1cGRhdGUnLCAoe1xuICAgICAgICAgICAgZm91bmQsXG4gICAgICAgICAgICBhbW91bnQsXG4gICAgICAgICAgICB0b3RhbCxcbiAgICAgICAgICAgIGZvY3VzXG4gICAgICAgIH0pID0+IHtcbiAgICAgICAgICAgIGxldCBjb25maWc7XG5cbiAgICAgICAgICAgIGlmIChmb3VuZCA9PT0gYW1vdW50XG4gICAgICAgICAgICAgICAgJiYgZm9jdXMgPT09IHRvdGFsKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnID0gdGV4dENvbmZpZ1snZ2cnXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9jdXMgPT09IHRvdGFsKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnID0gdGV4dENvbmZpZ1snYmxhY2tzaGVlcHdhbGwnXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uZmlnID0gdGV4dENvbmZpZ1tgZm91bmQke2ZvdW5kfWBdO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGlmIChjb25maWcpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnLnR5cGUgPT09ICd0aXAnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dUaXAoY29uZmlnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy50eXBlID09PSAncG9wdXAnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dQb3AoY29uZmlnKTsgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnRDb3VudC5yZWFkeSgpO1xuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4geyAvLyBib25lXG4gICAgICAgIGNvbnN0IGJvbmVYID0gc3RhZ2Uud2lkdGggLyAyIC0gc3RhZ2UudncgLyAyO1xuICAgICAgICBjb25zdCBib25lWSA9IHN0YWdlLmhlaWdodCAtIHN0YWdlLnZoIC8gMjtcbiAgICAgICAgc2Nyb2xsZXIuZW5hYmxlID0gdHJ1ZTtcbiAgICAgICAgc2Nyb2xsZXIuc2Nyb2xsVG8oYm9uZVgsIGJvbmVZKTtcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IGRlbGF5KDIwMDApKVxuICAgIC50aGVuKCgpID0+IHsgLy8gc2hvdyBndWlkZVxuICAgICAgICByZXR1cm4gc2hvd1BvcCh0ZXh0Q29uZmlnLmdsKTtcbiAgICB9KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9nYW1lLmpzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL2dhbWUuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLy4uL25vZGVfbW9kdWxlcy8uMC4xMy4xQHN0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvaW5kZXguanMhLi9nYW1lLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vZ2FtZS5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2dhbWUuY3NzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIjZ2FtZSB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIG1hcmdpbjogMDtcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjI1LjBAY3NzLWxvYWRlciEuL3NyYy9nYW1lLmNzc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdHZhciBsaXN0ID0gW107XHJcblxyXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcclxuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XHJcblx0XHR2YXIgcmVzdWx0ID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHRoaXNbaV07XHJcblx0XHRcdGlmKGl0ZW1bMl0pIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGl0ZW1bMV0gKyBcIn1cIik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbVsxXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHQuam9pbihcIlwiKTtcclxuXHR9O1xyXG5cclxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxyXG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcclxuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxyXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XHJcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcclxuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxyXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xyXG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXHJcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXHJcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXHJcblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXHJcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XHJcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XHJcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHRyZXR1cm4gbGlzdDtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjI1LjBAY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG52YXIgc3R5bGVzSW5Eb20gPSB7fSxcclxuXHRtZW1vaXplID0gZnVuY3Rpb24oZm4pIHtcclxuXHRcdHZhciBtZW1vO1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdFx0cmV0dXJuIG1lbW87XHJcblx0XHR9O1xyXG5cdH0sXHJcblx0aXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gL21zaWUgWzYtOV1cXGIvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSk7XHJcblx0fSksXHJcblx0Z2V0SGVhZEVsZW1lbnQgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcclxuXHR9KSxcclxuXHRzaW5nbGV0b25FbGVtZW50ID0gbnVsbCxcclxuXHRzaW5nbGV0b25Db3VudGVyID0gMCxcclxuXHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XHJcblx0aWYodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XHJcblx0XHRpZih0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcclxuXHR9XHJcblxyXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxyXG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcclxuXHJcblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIDxoZWFkPi5cclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xyXG5cclxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QpO1xyXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xyXG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcclxuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xyXG5cdFx0fVxyXG5cdFx0aWYobmV3TGlzdCkge1xyXG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QpO1xyXG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XHJcblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcclxuXHRcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspXHJcblx0XHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXSgpO1xyXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpIHtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0aWYoZG9tU3R5bGUpIHtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyhsaXN0KSB7XHJcblx0dmFyIHN0eWxlcyA9IFtdO1xyXG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xyXG5cdFx0dmFyIGlkID0gaXRlbVswXTtcclxuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xyXG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcclxuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xyXG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xyXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pXHJcblx0XHRcdHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcclxuXHR9XHJcblx0cmV0dXJuIHN0eWxlcztcclxufVxyXG5cclxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCkge1xyXG5cdHZhciBoZWFkID0gZ2V0SGVhZEVsZW1lbnQoKTtcclxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcFtzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcclxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xyXG5cdFx0aWYoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XHJcblx0XHRcdGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgaGVhZC5maXJzdENoaWxkKTtcclxuXHRcdH0gZWxzZSBpZihsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xyXG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGVFbGVtZW50KTtcclxuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcclxuXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcuIE11c3QgYmUgJ3RvcCcgb3IgJ2JvdHRvbScuXCIpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xyXG5cdHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0dmFyIGlkeCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGVFbGVtZW50KTtcclxuXHRpZihpZHggPj0gMCkge1xyXG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcblx0c3R5bGVFbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCk7XHJcblx0cmV0dXJuIHN0eWxlRWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucykge1xyXG5cdHZhciBsaW5rRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xyXG5cdGxpbmtFbGVtZW50LnJlbCA9IFwic3R5bGVzaGVldFwiO1xyXG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rRWxlbWVudCk7XHJcblx0cmV0dXJuIGxpbmtFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZShvYmosIG9wdGlvbnMpIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50LCB1cGRhdGUsIHJlbW92ZTtcclxuXHJcblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XHJcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcclxuXHRcdHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xyXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgZmFsc2UpO1xyXG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSk7XHJcblx0fSBlbHNlIGlmKG9iai5zb3VyY2VNYXAgJiZcclxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XHJcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuXHRcdFx0aWYoc3R5bGVFbGVtZW50LmhyZWYpXHJcblx0XHRcdFx0VVJMLnJldm9rZU9iamVjdFVSTChzdHlsZUVsZW1lbnQuaHJlZik7XHJcblx0XHR9O1xyXG5cdH0gZWxzZSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHR1cGRhdGUob2JqKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xyXG5cdFx0aWYobmV3T2JqKSB7XHJcblx0XHRcdGlmKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcClcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmVtb3ZlKCk7XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgdGV4dFN0b3JlID0gW107XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XHJcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XHJcblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcclxuXHR9O1xyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyhzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xyXG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcclxuXHJcblx0aWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcclxuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGVFbGVtZW50LmNoaWxkTm9kZXM7XHJcblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xyXG5cclxuXHRpZihtZWRpYSkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxyXG5cdH1cclxuXHJcblx0aWYoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XHJcblx0fSBlbHNlIHtcclxuXHRcdHdoaWxlKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVMaW5rKGxpbmtFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcclxuXHJcblx0aWYoc291cmNlTWFwKSB7XHJcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxyXG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xyXG5cdH1cclxuXHJcblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XHJcblxyXG5cdHZhciBvbGRTcmMgPSBsaW5rRWxlbWVudC5ocmVmO1xyXG5cclxuXHRsaW5rRWxlbWVudC5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuXHJcblx0aWYob2xkU3JjKVxyXG5cdFx0VVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4xMy4xQHN0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJjb25zdCB3aW4gPSB3aW5kb3c7XG5jb25zdCB7XG4gICAgZG9jdW1lbnQ6IGRvYyxcbiAgICBQcm9taXNlLFxuICAgIGNyZWF0ZWpzXG59ID0gd2luO1xuXG5mdW5jdGlvbiBhcHBlbmRTdHlsZShjc3NUZXh0KSB7XG4gICAgY29uc3Qgc3R5bGUgPSBkb2MuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBzdHlsZS50ZXh0Q29udGVudCA9IGNzc1RleHQ7XG4gICAgZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5mdW5jdGlvbiBkb21yZWFkeSgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAoZG9jLnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgcmVzb2x2ZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZGVmZXIoKSB7XG4gICAgY29uc3QgZGVmZXJyZWQgPSB7fTtcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBkZWZlcnJlZC5yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgZGVmZXJyZWQucmVqZWN0ID0gcmVqZWN0XG4gICAgfSk7XG4gICAgZGVmZXJyZWQucHJvbWlzZSA9IHByb21pc2U7XG4gICAgcmV0dXJuIGRlZmVycmVkO1xufVxuXG5mdW5jdGlvbiBkZWxheSh0aW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgc2V0VGltZW91dChyZXNvbHZlLCB0aW1lKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcXVlcnkodmlld3BvcnQsIHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIHZpZXdwb3J0LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xufVxuXG5mdW5jdGlvbiBxdWVyeUFsbCh2aWV3cG9ydCwgc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gWy4uLnZpZXdwb3J0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXTtcbn1cblxuZnVuY3Rpb24gZ2V0UmVjdChlbCkge1xuICAgIHJldHVybiBlbC5yZWN0cyB8fCAoZWwucmVjdHMgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSk7XG59XG5cbmZ1bmN0aW9uIGdldERpc3RhbmNlKHgxLCB5MSwgeDIsIHkyKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydCgoeDEgLSB4MikgKiAoeDEgLSB4MikgKyAoeTEgLSB5MikgKiAoeTEgLSB5MikpO1xufVxuXG5mdW5jdGlvbiBsb2FkSW1nKHNyYykge1xuICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XG5cbiAgICByZXR1cm4gW1xuICAgICAgICBpbWFnZSxcbiAgICAgICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaW1hZ2Uub25sb2FkID0gKCkgPT4gcmVzb2x2ZShpbWFnZSk7XG4gICAgICAgICAgICBpbWFnZS5zcmMgPSBzcmM7XG4gICAgICAgIH0pXG4gICAgXTtcbn1cblxuZnVuY3Rpb24gaW1nMkNhbnZhcyhpbWFnZSwgd2lkdGgsIGhlaWdodCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGRvYy5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjb250ZXh0LmRyYXdJbWFnZShpbWFnZSwgMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgcmV0dXJuIFtjYW52YXMsIGNvbnRleHRdO1xufVxuXG5jb25zdCByYWYgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICBmdW5jdGlvbihmbikge3JldHVybiBzZXRUaW1lb3V0KGZuLCAxIC8gNjApfTtcblxuY29uc3QgY2FmID0gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IFxuICAgICAgICAgICAgd2luZG93LndlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICBmdW5jdGlvbihpZCkge2NsZWFyVGltZW91dChpZCl9O1xuXG5leHBvcnQge1xuICAgIHdpbixcbiAgICBkb2MsXG4gICAgZGVmZXIsXG4gICAgUHJvbWlzZSxcbiAgICBjcmVhdGVqcyxcbiAgICBhcHBlbmRTdHlsZSxcbiAgICBkb21yZWFkeSxcbiAgICBkZWxheSxcbiAgICBsb2FkSW1nLFxuICAgIGltZzJDYW52YXMsXG4gICAgcXVlcnksXG4gICAgcXVlcnlBbGwsXG4gICAgZ2V0UmVjdCxcbiAgICBnZXREaXN0YW5jZSxcbiAgICByYWYsXG4gICAgY2FmXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWwuanMiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9mcm9tID0gcmVxdWlyZShcIi4uL2NvcmUtanMvYXJyYXkvZnJvbVwiKTtcblxudmFyIF9mcm9tMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Zyb20pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcnIyW2ldID0gYXJyW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBhcnIyO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAoMCwgX2Zyb20yLmRlZmF1bHQpKGFycik7XG4gIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2FycmF5L2Zyb21cIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvYXJyYXkvZnJvbS5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuYXJyYXkuZnJvbScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuQXJyYXkuZnJvbTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9hcnJheS9mcm9tLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRhdCAgPSByZXF1aXJlKCcuL19zdHJpbmctYXQnKSh0cnVlKTtcblxuLy8gMjEuMS4zLjI3IFN0cmluZy5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShTdHJpbmcsICdTdHJpbmcnLCBmdW5jdGlvbihpdGVyYXRlZCl7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGluZGV4ID0gdGhpcy5faVxuICAgICwgcG9pbnQ7XG4gIGlmKGluZGV4ID49IE8ubGVuZ3RoKXJldHVybiB7dmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZX07XG4gIHBvaW50ID0gJGF0KE8sIGluZGV4KTtcbiAgdGhpcy5faSArPSBwb2ludC5sZW5ndGg7XG4gIHJldHVybiB7dmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZX07XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIGRlZmluZWQgICA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbi8vIHRydWUgIC0+IFN0cmluZyNhdFxuLy8gZmFsc2UgLT4gU3RyaW5nI2NvZGVQb2ludEF0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFRPX1NUUklORyl7XG4gIHJldHVybiBmdW5jdGlvbih0aGF0LCBwb3Mpe1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpXG4gICAgICAsIGkgPSB0b0ludGVnZXIocG9zKVxuICAgICAgLCBsID0gcy5sZW5ndGhcbiAgICAgICwgYSwgYjtcbiAgICBpZihpIDwgMCB8fCBpID49IGwpcmV0dXJuIFRPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGEgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbCB8fCAoYiA9IHMuY2hhckNvZGVBdChpICsgMSkpIDwgMHhkYzAwIHx8IGIgPiAweGRmZmZcbiAgICAgID8gVE9fU1RSSU5HID8gcy5jaGFyQXQoaSkgOiBhXG4gICAgICA6IFRPX1NUUklORyA/IHMuc2xpY2UoaSwgaSArIDIpIDogKGEgLSAweGQ4MDAgPDwgMTApICsgKGIgLSAweGRjMDApICsgMHgxMDAwMDtcbiAgfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3RyaW5nLWF0LmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgID0gTWF0aC5jZWlsXG4gICwgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgPT0gdW5kZWZpbmVkKXRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZICAgICAgICA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCByZWRlZmluZSAgICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCBoaWRlICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIGhhcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBJdGVyYXRvcnMgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgJGl0ZXJDcmVhdGUgICAgPSByZXF1aXJlKCcuL19pdGVyLWNyZWF0ZScpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJylcbiAgLCBJVEVSQVRPUiAgICAgICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgQlVHR1kgICAgICAgICAgPSAhKFtdLmtleXMgJiYgJ25leHQnIGluIFtdLmtleXMoKSkgLy8gU2FmYXJpIGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxuICAsIEZGX0lURVJBVE9SICAgID0gJ0BAaXRlcmF0b3InXG4gICwgS0VZUyAgICAgICAgICAgPSAna2V5cydcbiAgLCBWQUxVRVMgICAgICAgICA9ICd2YWx1ZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCl7XG4gICRpdGVyQ3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgdmFyIGdldE1ldGhvZCA9IGZ1bmN0aW9uKGtpbmQpe1xuICAgIGlmKCFCVUdHWSAmJiBraW5kIGluIHByb3RvKXJldHVybiBwcm90b1traW5kXTtcbiAgICBzd2l0Y2goa2luZCl7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgfTtcbiAgdmFyIFRBRyAgICAgICAgPSBOQU1FICsgJyBJdGVyYXRvcidcbiAgICAsIERFRl9WQUxVRVMgPSBERUZBVUxUID09IFZBTFVFU1xuICAgICwgVkFMVUVTX0JVRyA9IGZhbHNlXG4gICAgLCBwcm90byAgICAgID0gQmFzZS5wcm90b3R5cGVcbiAgICAsICRuYXRpdmUgICAgPSBwcm90b1tJVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF1cbiAgICAsICRkZWZhdWx0ICAgPSAkbmF0aXZlIHx8IGdldE1ldGhvZChERUZBVUxUKVxuICAgICwgJGVudHJpZXMgICA9IERFRkFVTFQgPyAhREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKCdlbnRyaWVzJykgOiB1bmRlZmluZWRcbiAgICAsICRhbnlOYXRpdmUgPSBOQU1FID09ICdBcnJheScgPyBwcm90by5lbnRyaWVzIHx8ICRuYXRpdmUgOiAkbmF0aXZlXG4gICAgLCBtZXRob2RzLCBrZXksIEl0ZXJhdG9yUHJvdG90eXBlO1xuICAvLyBGaXggbmF0aXZlXG4gIGlmKCRhbnlOYXRpdmUpe1xuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoJGFueU5hdGl2ZS5jYWxsKG5ldyBCYXNlKSk7XG4gICAgaWYoSXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUpe1xuICAgICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgICAgc2V0VG9TdHJpbmdUYWcoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgICAvLyBmaXggZm9yIHNvbWUgb2xkIGVuZ2luZXNcbiAgICAgIGlmKCFMSUJSQVJZICYmICFoYXMoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SKSloaWRlKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgfVxuICB9XG4gIC8vIGZpeCBBcnJheSN7dmFsdWVzLCBAQGl0ZXJhdG9yfS5uYW1lIGluIFY4IC8gRkZcbiAgaWYoREVGX1ZBTFVFUyAmJiAkbmF0aXZlICYmICRuYXRpdmUubmFtZSAhPT0gVkFMVUVTKXtcbiAgICBWQUxVRVNfQlVHID0gdHJ1ZTtcbiAgICAkZGVmYXVsdCA9IGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gJG5hdGl2ZS5jYWxsKHRoaXMpOyB9O1xuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZigoIUxJQlJBUlkgfHwgRk9SQ0VEKSAmJiAoQlVHR1kgfHwgVkFMVUVTX0JVRyB8fCAhcHJvdG9bSVRFUkFUT1JdKSl7XG4gICAgaGlkZShwcm90bywgSVRFUkFUT1IsICRkZWZhdWx0KTtcbiAgfVxuICAvLyBQbHVnIGZvciBsaWJyYXJ5XG4gIEl0ZXJhdG9yc1tOQU1FXSA9ICRkZWZhdWx0O1xuICBJdGVyYXRvcnNbVEFHXSAgPSByZXR1cm5UaGlzO1xuICBpZihERUZBVUxUKXtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiAgREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiAgICBJU19TRVQgICAgID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiAkZW50cmllc1xuICAgIH07XG4gICAgaWYoRk9SQ0VEKWZvcihrZXkgaW4gbWV0aG9kcyl7XG4gICAgICBpZighKGtleSBpbiBwcm90bykpcmVkZWZpbmUocHJvdG8sIGtleSwgbWV0aG9kc1trZXldKTtcbiAgICB9IGVsc2UgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoQlVHR1kgfHwgVkFMVUVTX0JVRyksIE5BTUUsIG1ldGhvZHMpO1xuICB9XG4gIHJldHVybiBtZXRob2RzO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IHRydWU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbGlicmFyeS5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBjdHggICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIGhpZGUgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uKHR5cGUsIG5hbWUsIHNvdXJjZSl7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GXG4gICAgLCBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HXG4gICAgLCBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TXG4gICAgLCBJU19QUk9UTyAgPSB0eXBlICYgJGV4cG9ydC5QXG4gICAgLCBJU19CSU5EICAgPSB0eXBlICYgJGV4cG9ydC5CXG4gICAgLCBJU19XUkFQICAgPSB0eXBlICYgJGV4cG9ydC5XXG4gICAgLCBleHBvcnRzICAgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KVxuICAgICwgZXhwUHJvdG8gID0gZXhwb3J0c1tQUk9UT1RZUEVdXG4gICAgLCB0YXJnZXQgICAgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdXG4gICAgLCBrZXksIG93biwgb3V0O1xuICBpZihJU19HTE9CQUwpc291cmNlID0gbmFtZTtcbiAgZm9yKGtleSBpbiBzb3VyY2Upe1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgaWYob3duICYmIGtleSBpbiBleHBvcnRzKWNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBleHBvcnRzW2tleV0gPSBJU19HTE9CQUwgJiYgdHlwZW9mIHRhcmdldFtrZXldICE9ICdmdW5jdGlvbicgPyBzb3VyY2Vba2V5XVxuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgOiBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbClcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIDogSVNfV1JBUCAmJiB0YXJnZXRba2V5XSA9PSBvdXQgPyAoZnVuY3Rpb24oQyl7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgICBpZih0aGlzIGluc3RhbmNlb2YgQyl7XG4gICAgICAgICAgc3dpdGNoKGFyZ3VtZW50cy5sZW5ndGgpe1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEM7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgQyhhKTtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDKGEsIGIpO1xuICAgICAgICAgIH0gcmV0dXJuIG5ldyBDKGEsIGIsIGMpO1xuICAgICAgICB9IHJldHVybiBDLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5tZXRob2RzLiVOQU1FJVxuICAgIGlmKElTX1BST1RPKXtcbiAgICAgIChleHBvcnRzLnZpcnR1YWwgfHwgKGV4cG9ydHMudmlydHVhbCA9IHt9KSlba2V5XSA9IG91dDtcbiAgICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5wcm90b3R5cGUuJU5BTUUlXG4gICAgICBpZih0eXBlICYgJGV4cG9ydC5SICYmIGV4cFByb3RvICYmICFleHBQcm90b1trZXldKWhpZGUoZXhwUHJvdG8sIGtleSwgb3V0KTtcbiAgICB9XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgIFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7dmVyc2lvbjogJzIuNC4wJ307XG5pZih0eXBlb2YgX19lID09ICdudW1iZXInKV9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIHRoYXQsIGxlbmd0aCl7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmKHRoYXQgPT09IHVuZGVmaW5lZClyZXR1cm4gZm47XG4gIHN3aXRjaChsZW5ndGgpe1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhLCBiKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigvKiAuLi5hcmdzICovKXtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZih0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGRQICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgZFAgICAgICAgICAgICAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcyl0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZigndmFsdWUnIGluIEF0dHJpYnV0ZXMpT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoIWlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZXNjcmlwdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnRcbiAgLy8gaW4gb2xkIElFIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnXG4gICwgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBTKXtcbiAgaWYoIWlzT2JqZWN0KGl0KSlyZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZihTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgaWYoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaXRtYXAsIHZhbHVlKXtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlICA6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlICAgIDogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZSAgICAgICA6IHZhbHVlXG4gIH07XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19oaWRlJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUuanNcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGFzLmpzXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0ge307XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlcmF0b3JzLmpzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcbnZhciBjcmVhdGUgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKVxuICAsIGRlc2NyaXB0b3IgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2hpZGUnKShJdGVyYXRvclByb3RvdHlwZSwgcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyksIGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCl7XG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwge25leHQ6IGRlc2NyaXB0b3IoMSwgbmV4dCl9KTtcbiAgc2V0VG9TdHJpbmdUYWcoQ29uc3RydWN0b3IsIE5BTUUgKyAnIEl0ZXJhdG9yJyk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxudmFyIGFuT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBkUHMgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcHMnKVxuICAsIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpXG4gICwgSUVfUFJPVE8gICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJylcbiAgLCBFbXB0eSAgICAgICA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH1cbiAgLCBQUk9UT1RZUEUgICA9ICdwcm90b3R5cGUnO1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgY3JlYXRlRGljdCA9IGZ1bmN0aW9uKCl7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2lmcmFtZScpXG4gICAgLCBpICAgICAgPSBlbnVtQnVnS2V5cy5sZW5ndGhcbiAgICAsIGx0ICAgICA9ICc8J1xuICAgICwgZ3QgICAgID0gJz4nXG4gICAgLCBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHJlcXVpcmUoJy4vX2h0bWwnKS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zY3JpcHQtdXJsXG4gIC8vIGNyZWF0ZURpY3QgPSBpZnJhbWUuY29udGVudFdpbmRvdy5PYmplY3Q7XG4gIC8vIGh0bWwucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShsdCArICdzY3JpcHQnICsgZ3QgKyAnZG9jdW1lbnQuRj1PYmplY3QnICsgbHQgKyAnL3NjcmlwdCcgKyBndCk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIGNyZWF0ZURpY3QgPSBpZnJhbWVEb2N1bWVudC5GO1xuICB3aGlsZShpLS0pZGVsZXRlIGNyZWF0ZURpY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tpXV07XG4gIHJldHVybiBjcmVhdGVEaWN0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpe1xuICB2YXIgcmVzdWx0O1xuICBpZihPICE9PSBudWxsKXtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5O1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IGNyZWF0ZURpY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRQcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGRQICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgZ2V0S2V5cyAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcyl7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyAgID0gZ2V0S2V5cyhQcm9wZXJ0aWVzKVxuICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAsIGkgPSAwXG4gICAgLCBQO1xuICB3aGlsZShsZW5ndGggPiBpKWRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XG4gIHJldHVybiBPO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHBzLmpzXG4vLyBtb2R1bGUgaWQgPSAzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKVxuICAsIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTyl7XG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBoYXMgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIHRvSU9iamVjdCAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpXG4gICwgSUVfUFJPVE8gICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgbmFtZXMpe1xuICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KG9iamVjdClcbiAgICAsIGkgICAgICA9IDBcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBrZXk7XG4gIGZvcihrZXkgaW4gTylpZihrZXkgIT0gSUVfUFJPVE8paGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKWlmKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSl7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qc1xuLy8gbW9kdWxlIGlkID0gMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpXG4gICwgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWlvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvTGVuZ3RoICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgdG9JbmRleCAgID0gcmVxdWlyZSgnLi9fdG8taW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oSVNfSU5DTFVERVMpe1xuICByZXR1cm4gZnVuY3Rpb24oJHRoaXMsIGVsLCBmcm9tSW5kZXgpe1xuICAgIHZhciBPICAgICAgPSB0b0lPYmplY3QoJHRoaXMpXG4gICAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSB0b0luZGV4KGZyb21JbmRleCwgbGVuZ3RoKVxuICAgICAgLCB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgaWYoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpd2hpbGUobGVuZ3RoID4gaW5kZXgpe1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgaWYodmFsdWUgIT0gdmFsdWUpcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjdG9JbmRleCBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKWlmKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pe1xuICAgICAgaWYoT1tpbmRleF0gPT09IGVsKXJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanNcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBtYXggICAgICAgPSBNYXRoLm1heFxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpbmRleCwgbGVuZ3RoKXtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCdrZXlzJylcbiAgLCB1aWQgICAgPSByZXF1aXJlKCcuL191aWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHNoYXJlZFtrZXldIHx8IChzaGFyZWRba2V5XSA9IHVpZChrZXkpKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qc1xuLy8gbW9kdWxlIGlkID0gNDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJ1xuICAsIHN0b3JlICA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qc1xuLy8gbW9kdWxlIGlkID0gNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgaWQgPSAwXG4gICwgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanNcbi8vIG1vZHVsZSBpZCA9IDQ3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gNDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19odG1sLmpzXG4vLyBtb2R1bGUgaWQgPSA0OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBkZWYgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mXG4gICwgaGFzID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgdGFnLCBzdGF0KXtcbiAgaWYoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSlkZWYoaXQsIFRBRywge2NvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHRhZ30pO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qc1xuLy8gbW9kdWxlIGlkID0gNTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgc3RvcmUgICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCd3a3MnKVxuICAsIHVpZCAgICAgICAgPSByZXF1aXJlKCcuL191aWQnKVxuICAsIFN5bWJvbCAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5TeW1ib2xcbiAgLCBVU0VfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PSAnZnVuY3Rpb24nO1xuXG52YXIgJGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUpe1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBVU0VfU1lNQk9MICYmIFN5bWJvbFtuYW1lXSB8fCAoVVNFX1NZTUJPTCA/IFN5bWJvbCA6IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTtcblxuJGV4cG9ydHMuc3RvcmUgPSBzdG9yZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MuanNcbi8vIG1vZHVsZSBpZCA9IDUxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gMTkuMS4yLjkgLyAxNS4yLjMuMiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciBoYXMgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgdG9PYmplY3QgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIElFX1BST1RPICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpXG4gICwgT2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbihPKXtcbiAgTyA9IHRvT2JqZWN0KE8pO1xuICBpZihoYXMoTywgSUVfUFJPVE8pKXJldHVybiBPW0lFX1BST1RPXTtcbiAgaWYodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcil7XG4gICAgcmV0dXJuIE8uY29uc3RydWN0b3IucHJvdG90eXBlO1xuICB9IHJldHVybiBPIGluc3RhbmNlb2YgT2JqZWN0ID8gT2JqZWN0UHJvdG8gOiBudWxsO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ3BvLmpzXG4vLyBtb2R1bGUgaWQgPSA1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGN0eCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgdG9PYmplY3QgICAgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIGNhbGwgICAgICAgICAgID0gcmVxdWlyZSgnLi9faXRlci1jYWxsJylcbiAgLCBpc0FycmF5SXRlciAgICA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKVxuICAsIHRvTGVuZ3RoICAgICAgID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX2NyZWF0ZS1wcm9wZXJ0eScpXG4gICwgZ2V0SXRlckZuICAgICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19pdGVyLWRldGVjdCcpKGZ1bmN0aW9uKGl0ZXIpeyBBcnJheS5mcm9tKGl0ZXIpOyB9KSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjIuMSBBcnJheS5mcm9tKGFycmF5TGlrZSwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gIGZyb206IGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlLyosIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKi8pe1xuICAgIHZhciBPICAgICAgID0gdG9PYmplY3QoYXJyYXlMaWtlKVxuICAgICAgLCBDICAgICAgID0gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyA/IHRoaXMgOiBBcnJheVxuICAgICAgLCBhTGVuICAgID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgLCBtYXBmbiAgID0gYUxlbiA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWRcbiAgICAgICwgbWFwcGluZyA9IG1hcGZuICE9PSB1bmRlZmluZWRcbiAgICAgICwgaW5kZXggICA9IDBcbiAgICAgICwgaXRlckZuICA9IGdldEl0ZXJGbihPKVxuICAgICAgLCBsZW5ndGgsIHJlc3VsdCwgc3RlcCwgaXRlcmF0b3I7XG4gICAgaWYobWFwcGluZyltYXBmbiA9IGN0eChtYXBmbiwgYUxlbiA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQsIDIpO1xuICAgIC8vIGlmIG9iamVjdCBpc24ndCBpdGVyYWJsZSBvciBpdCdzIGFycmF5IHdpdGggZGVmYXVsdCBpdGVyYXRvciAtIHVzZSBzaW1wbGUgY2FzZVxuICAgIGlmKGl0ZXJGbiAhPSB1bmRlZmluZWQgJiYgIShDID09IEFycmF5ICYmIGlzQXJyYXlJdGVyKGl0ZXJGbikpKXtcbiAgICAgIGZvcihpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKE8pLCByZXN1bHQgPSBuZXcgQzsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOyBpbmRleCsrKXtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IGNhbGwoaXRlcmF0b3IsIG1hcGZuLCBbc3RlcC52YWx1ZSwgaW5kZXhdLCB0cnVlKSA6IHN0ZXAudmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgICBmb3IocmVzdWx0ID0gbmV3IEMobGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4Kyspe1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCBtYXBwaW5nID8gbWFwZm4oT1tpbmRleF0sIGluZGV4KSA6IE9baW5kZXhdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0Lmxlbmd0aCA9IGluZGV4O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuZnJvbS5qc1xuLy8gbW9kdWxlIGlkID0gNTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBjYWxsIHNvbWV0aGluZyBvbiBpdGVyYXRvciBzdGVwIHdpdGggc2FmZSBjbG9zaW5nIG9uIGVycm9yXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXRlcmF0b3IsIGZuLCB2YWx1ZSwgZW50cmllcyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGVudHJpZXMgPyBmbihhbk9iamVjdCh2YWx1ZSlbMF0sIHZhbHVlWzFdKSA6IGZuKHZhbHVlKTtcbiAgLy8gNy40LjYgSXRlcmF0b3JDbG9zZShpdGVyYXRvciwgY29tcGxldGlvbilcbiAgfSBjYXRjaChlKXtcbiAgICB2YXIgcmV0ID0gaXRlcmF0b3JbJ3JldHVybiddO1xuICAgIGlmKHJldCAhPT0gdW5kZWZpbmVkKWFuT2JqZWN0KHJldC5jYWxsKGl0ZXJhdG9yKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNhbGwuanNcbi8vIG1vZHVsZSBpZCA9IDU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gY2hlY2sgb24gZGVmYXVsdCBBcnJheSBpdGVyYXRvclxudmFyIEl0ZXJhdG9ycyAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIElURVJBVE9SICAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgIT09IHVuZGVmaW5lZCAmJiAoSXRlcmF0b3JzLkFycmF5ID09PSBpdCB8fCBBcnJheVByb3RvW0lURVJBVE9SXSA9PT0gaXQpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA1NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcbnZhciAkZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGNyZWF0ZURlc2MgICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIGluZGV4LCB2YWx1ZSl7XG4gIGlmKGluZGV4IGluIG9iamVjdCkkZGVmaW5lUHJvcGVydHkuZihvYmplY3QsIGluZGV4LCBjcmVhdGVEZXNjKDAsIHZhbHVlKSk7XG4gIGVsc2Ugb2JqZWN0W2luZGV4XSA9IHZhbHVlO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jcmVhdGUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGNsYXNzb2YgICA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKVxuICAsIElURVJBVE9SICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvck1ldGhvZCA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgIT0gdW5kZWZpbmVkKXJldHVybiBpdFtJVEVSQVRPUl1cbiAgICB8fCBpdFsnQEBpdGVyYXRvciddXG4gICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanNcbi8vIG1vZHVsZSBpZCA9IDU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gZ2V0dGluZyB0YWcgZnJvbSAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKVxuICAsIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpXG4gIC8vIEVTMyB3cm9uZyBoZXJlXG4gICwgQVJHID0gY29mKGZ1bmN0aW9uKCl7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT0gJ0FyZ3VtZW50cyc7XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIFNjcmlwdCBBY2Nlc3MgRGVuaWVkIGVycm9yXG52YXIgdHJ5R2V0ID0gZnVuY3Rpb24oaXQsIGtleSl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgTywgVCwgQjtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKFQgPSB0cnlHZXQoTyA9IE9iamVjdChpdCksIFRBRykpID09ICdzdHJpbmcnID8gVFxuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQVJHID8gY29mKE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKEIgPSBjb2YoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiBCO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jbGFzc29mLmpzXG4vLyBtb2R1bGUgaWQgPSA1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBJVEVSQVRPUiAgICAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIFNBRkVfQ0xPU0lORyA9IGZhbHNlO1xuXG50cnkge1xuICB2YXIgcml0ZXIgPSBbN11bSVRFUkFUT1JdKCk7XG4gIHJpdGVyWydyZXR1cm4nXSA9IGZ1bmN0aW9uKCl7IFNBRkVfQ0xPU0lORyA9IHRydWU7IH07XG4gIEFycmF5LmZyb20ocml0ZXIsIGZ1bmN0aW9uKCl7IHRocm93IDI7IH0pO1xufSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMsIHNraXBDbG9zaW5nKXtcbiAgaWYoIXNraXBDbG9zaW5nICYmICFTQUZFX0NMT1NJTkcpcmV0dXJuIGZhbHNlO1xuICB2YXIgc2FmZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBhcnIgID0gWzddXG4gICAgICAsIGl0ZXIgPSBhcnJbSVRFUkFUT1JdKCk7XG4gICAgaXRlci5uZXh0ID0gZnVuY3Rpb24oKXsgcmV0dXJuIHtkb25lOiBzYWZlID0gdHJ1ZX07IH07XG4gICAgYXJyW0lURVJBVE9SXSA9IGZ1bmN0aW9uKCl7IHJldHVybiBpdGVyOyB9O1xuICAgIGV4ZWMoYXJyKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gc2FmZTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZXRlY3QuanNcbi8vIG1vZHVsZSBpZCA9IDYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiaW1wb3J0IHtcbiAgICB3aW4sXG4gICAgZG9jLFxuICAgIFByb21pc2UsXG4gICAgcXVlcnksXG4gICAgcXVlcnlBbGwsXG4gICAgZ2V0UmVjdFxufSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0ICdnZXN0dXJlLWpzJztcbmltcG9ydCBFdmVudCBmcm9tICcuL2V2ZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Nyb2xsZXIgZXh0ZW5kcyBFdmVudHtcbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0LCB2dywgdmgsIHNjYWxlID0gMSkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX2lzU2Nyb2xsaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2VuYWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9zY2FsZSA9IHNjYWxlO1xuXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMudncgPSB2dztcbiAgICAgICAgdGhpcy52aCA9IHZoO1xuICAgICAgICB0aGlzLnggPSAwO1xuICAgICAgICB0aGlzLnkgPSAwO1xuICAgICAgICB0aGlzLmx4ID0gMDtcbiAgICAgICAgdGhpcy5seSA9IDA7XG4gICAgfVxuXG4gICAgZ2V0IGlzU2Nyb2xsaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNTY3JvbGxpbmc7XG4gICAgfVxuXG4gICAgZ2V0IHNjYWxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NhbGU7XG4gICAgfVxuXG4gICAgc2V0IHNjYWxlKHNjYWxlKSB7XG4gICAgICAgIHRoaXMuX3NjYWxlID0gc2NhbGU7XG4gICAgfVxuXG4gICAgZ2V0IGVuYWJsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuYWJsZTtcbiAgICB9XG5cbiAgICBzZXQgZW5hYmxlKGVuYWJsZSkge1xuICAgICAgICB0aGlzLl9lbmFibGUgPSBlbmFibGU7XG4gICAgfVxuXG4gICAgX2VtaXQobmFtZSwgb3JpZ2luYWxFdmVudCwgZXh0cmEgPSB7fSkge1xuICAgICAgICBjb25zdCBlID0ge1xuICAgICAgICAgICAgeDogdGhpcy54LFxuICAgICAgICAgICAgeTogdGhpcy55LFxuICAgICAgICAgICAgbHg6IHRoaXMubHgsXG4gICAgICAgICAgICBseTogdGhpcy5seSxcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnRcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBleHRyYSkge1xuICAgICAgICAgICAgZVtrZXldID0gZXh0cmFba2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW1pdChuYW1lLCBlKTtcbiAgICB9XG5cbiAgICByZWFkeSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2lzU2Nyb2xsaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGNvbnN0IGVtaXRUYXAgPSBlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbWl0KCd0YXAnLCBlLCB7XG4gICAgICAgICAgICAgICAgICAgIGV4OiB0aGlzLnggKyBlLnRvdWNoLmNsaWVudFgsXG4gICAgICAgICAgICAgICAgICAgIGV5OiB0aGlzLnkgKyBlLnRvdWNoLmNsaWVudFlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZW1pdFN0YXJ0ID0gZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5faXNTY3JvbGxpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMubHggPSB0aGlzLng7XG4gICAgICAgICAgICAgICAgdGhpcy5seSA9IHRoaXMueTtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbWl0KCdzY3JvbGxzdGFydCcsIGUpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29uc3QgZW1pdFNjcm9sbCA9IGUgPT4gdGhpcy5fZW1pdCgnc2Nyb2xsaW5nJywgZSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGVtaXRFbmQgPSBlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pc1Njcm9sbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Njcm9sbGVuZCcsIGUpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29uc3QgY2FsWFkgPSAoZSwgbm9TY2FsZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxhY2VtZW50WCxcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxhY2VtZW50WVxuICAgICAgICAgICAgICAgIH0gPSBlO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgc2NhbGUgPSBub1NjYWxlID8gMSA6IHRoaXMuX3NjYWxlO1xuICAgICAgICAgICAgICAgIGxldCB4ID0gdGhpcy5seCAtIGRpc3BsYWNlbWVudFggKiBzY2FsZTtcbiAgICAgICAgICAgICAgICBsZXQgeSA9IHRoaXMubHkgLSBkaXNwbGFjZW1lbnRZICogc2NhbGU7XG5cbiAgICAgICAgICAgICAgICB4ID0gTWF0aC5taW4oTWF0aC5tYXgoMCwgeCksIHRoaXMud2lkdGggLSB0aGlzLnZ3KTtcbiAgICAgICAgICAgICAgICB5ID0gTWF0aC5taW4oTWF0aC5tYXgoMCwgeSksIHRoaXMuaGVpZ2h0IC0gdGhpcy52aCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICAgICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRvYy5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3RhcCcsIGUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2VuYWJsZSAmJiBlbWl0VGFwKGUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRvYy5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3BhbnN0YXJ0JywgZSA9PiBcbiAgICAgICAgICAgICAgICB0aGlzLl9lbmFibGUgJiYgZW1pdFN0YXJ0KGUpXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBkb2MuYm9keS5hZGRFdmVudExpc3RlbmVyKCdwYW5tb3ZlJywgZSA9PiBcbiAgICAgICAgICAgICAgICB0aGlzLl9lbmFibGUgJiYgY2FsWFkoZSkgJiYgZW1pdFNjcm9sbChlKSBcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGRvYy5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3BhbmVuZCcsIGUgPT4gXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5hYmxlICYmIGVtaXRFbmQoZSkgICAgICBcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG8gPSAoeCwgeSkgPT4ge1xuICAgICAgICAgICAgICAgIGVtaXRTdGFydCgpO1xuICAgICAgICAgICAgICAgIGNhbFhZKHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxhY2VtZW50WDogdGhpcy54IC0geCxcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxhY2VtZW50WTogdGhpcy55IC0geVxuICAgICAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICAgICAgICAgIGVtaXRTY3JvbGwoKTtcbiAgICAgICAgICAgICAgICBlbWl0RW5kKCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2Nyb2xsZXIuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1wcm90b3R5cGUtb2ZcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanNcbi8vIG1vZHVsZSBpZCA9IDYyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmdldC1wcm90b3R5cGUtb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5nZXRQcm90b3R5cGVPZjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qc1xuLy8gbW9kdWxlIGlkID0gNjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyAxOS4xLjIuOSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciB0b09iamVjdCAgICAgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsICRnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdnZXRQcm90b3R5cGVPZicsIGZ1bmN0aW9uKCl7XG4gIHJldHVybiBmdW5jdGlvbiBnZXRQcm90b3R5cGVPZihpdCl7XG4gICAgcmV0dXJuICRnZXRQcm90b3R5cGVPZih0b09iamVjdChpdCkpO1xuICB9O1xufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmdldC1wcm90b3R5cGUtb2YuanNcbi8vIG1vZHVsZSBpZCA9IDY0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gbW9zdCBPYmplY3QgbWV0aG9kcyBieSBFUzYgc2hvdWxkIGFjY2VwdCBwcmltaXRpdmVzXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgY29yZSAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIGZhaWxzICAgPSByZXF1aXJlKCcuL19mYWlscycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihLRVksIGV4ZWMpe1xuICB2YXIgZm4gID0gKGNvcmUuT2JqZWN0IHx8IHt9KVtLRVldIHx8IE9iamVjdFtLRVldXG4gICAgLCBleHAgPSB7fTtcbiAgZXhwW0tFWV0gPSBleGVjKGZuKTtcbiAgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiBmYWlscyhmdW5jdGlvbigpeyBmbigxKTsgfSksICdPYmplY3QnLCBleHApO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qtc2FwLmpzXG4vLyBtb2R1bGUgaWQgPSA2NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanNcbi8vIG1vZHVsZSBpZCA9IDY2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmluZVByb3BlcnR5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICgwLCBfZGVmaW5lUHJvcGVydHkyLmRlZmF1bHQpKHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzXG4vLyBtb2R1bGUgaWQgPSA2N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDY4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKXtcbiAgcmV0dXJuICRPYmplY3QuZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDY5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbi8vIDE5LjEuMi40IC8gMTUuMi4zLjYgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpLCAnT2JqZWN0Jywge2RlZmluZVByb3BlcnR5OiByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF90eXBlb2YyID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG52YXIgX3R5cGVvZjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90eXBlb2YyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHNlbGYsIGNhbGwpIHtcbiAgaWYgKCFzZWxmKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIGNhbGwgJiYgKCh0eXBlb2YgY2FsbCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiAoMCwgX3R5cGVvZjMuZGVmYXVsdCkoY2FsbCkpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuLmpzXG4vLyBtb2R1bGUgaWQgPSA3MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2l0ZXJhdG9yID0gcmVxdWlyZShcIi4uL2NvcmUtanMvc3ltYm9sL2l0ZXJhdG9yXCIpO1xuXG52YXIgX2l0ZXJhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2l0ZXJhdG9yKTtcblxudmFyIF9zeW1ib2wgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9zeW1ib2xcIik7XG5cbnZhciBfc3ltYm9sMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N5bWJvbCk7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgX2l0ZXJhdG9yMi5kZWZhdWx0ID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gX3N5bWJvbDIuZGVmYXVsdCAmJiBvYmogIT09IF9zeW1ib2wyLmRlZmF1bHQucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgX3R5cGVvZihfaXRlcmF0b3IyLmRlZmF1bHQpID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG9iaik7XG59IDogZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICYmIHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBfc3ltYm9sMi5kZWZhdWx0ICYmIG9iaiAhPT0gX3N5bWJvbDIuZGVmYXVsdC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG9iaik7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy90eXBlb2YuanNcbi8vIG1vZHVsZSBpZCA9IDcyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wvaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDczXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fd2tzLWV4dCcpLmYoJ2l0ZXJhdG9yJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA3NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgZ2xvYmFsICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgaGlkZSAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIEl0ZXJhdG9ycyAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIFRPX1NUUklOR19UQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxuZm9yKHZhciBjb2xsZWN0aW9ucyA9IFsnTm9kZUxpc3QnLCAnRE9NVG9rZW5MaXN0JywgJ01lZGlhTGlzdCcsICdTdHlsZVNoZWV0TGlzdCcsICdDU1NSdWxlTGlzdCddLCBpID0gMDsgaSA8IDU7IGkrKyl7XG4gIHZhciBOQU1FICAgICAgID0gY29sbGVjdGlvbnNbaV1cbiAgICAsIENvbGxlY3Rpb24gPSBnbG9iYWxbTkFNRV1cbiAgICAsIHByb3RvICAgICAgPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlO1xuICBpZihwcm90byAmJiAhcHJvdG9bVE9fU1RSSU5HX1RBR10paGlkZShwcm90bywgVE9fU1RSSU5HX1RBRywgTkFNRSk7XG4gIEl0ZXJhdG9yc1tOQU1FXSA9IEl0ZXJhdG9ycy5BcnJheTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDc1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuL19hZGQtdG8tdW5zY29wYWJsZXMnKVxuICAsIHN0ZXAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLXN0ZXAnKVxuICAsIEl0ZXJhdG9ycyAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIHRvSU9iamVjdCAgICAgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG5cbi8vIDIyLjEuMy40IEFycmF5LnByb3RvdHlwZS5lbnRyaWVzKClcbi8vIDIyLjEuMy4xMyBBcnJheS5wcm90b3R5cGUua2V5cygpXG4vLyAyMi4xLjMuMjkgQXJyYXkucHJvdG90eXBlLnZhbHVlcygpXG4vLyAyMi4xLjMuMzAgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24oaXRlcmF0ZWQsIGtpbmQpe1xuICB0aGlzLl90ID0gdG9JT2JqZWN0KGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gIHRoaXMuX2sgPSBraW5kOyAgICAgICAgICAgICAgICAvLyBraW5kXG4vLyAyMi4xLjUuMi4xICVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGtpbmQgID0gdGhpcy5fa1xuICAgICwgaW5kZXggPSB0aGlzLl9pKys7XG4gIGlmKCFPIHx8IGluZGV4ID49IE8ubGVuZ3RoKXtcbiAgICB0aGlzLl90ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBzdGVwKDEpO1xuICB9XG4gIGlmKGtpbmQgPT0gJ2tleXMnICApcmV0dXJuIHN0ZXAoMCwgaW5kZXgpO1xuICBpZihraW5kID09ICd2YWx1ZXMnKXJldHVybiBzdGVwKDAsIE9baW5kZXhdKTtcbiAgcmV0dXJuIHN0ZXAoMCwgW2luZGV4LCBPW2luZGV4XV0pO1xufSwgJ3ZhbHVlcycpO1xuXG4vLyBhcmd1bWVudHNMaXN0W0BAaXRlcmF0b3JdIGlzICVBcnJheVByb3RvX3ZhbHVlcyUgKDkuNC40LjYsIDkuNC40LjcpXG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG5hZGRUb1Vuc2NvcGFibGVzKCdrZXlzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCd2YWx1ZXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ2VudHJpZXMnKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gNzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYWRkLXRvLXVuc2NvcGFibGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA3N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9uZSwgdmFsdWUpe1xuICByZXR1cm4ge3ZhbHVlOiB2YWx1ZSwgZG9uZTogISFkb25lfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1zdGVwLmpzXG4vLyBtb2R1bGUgaWQgPSA3OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX3drcycpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1leHQuanNcbi8vIG1vZHVsZSBpZCA9IDc5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbFwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wuanNcbi8vIG1vZHVsZSBpZCA9IDgwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3ltYm9sJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3LnN5bWJvbC5vYnNlcnZhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5TeW1ib2w7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA4MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0Jztcbi8vIEVDTUFTY3JpcHQgNiBzeW1ib2xzIHNoaW1cbnZhciBnbG9iYWwgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIERFU0NSSVBUT1JTICAgID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCByZWRlZmluZSAgICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCBNRVRBICAgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGEnKS5LRVlcbiAgLCAkZmFpbHMgICAgICAgICA9IHJlcXVpcmUoJy4vX2ZhaWxzJylcbiAgLCBzaGFyZWQgICAgICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgdWlkICAgICAgICAgICAgPSByZXF1aXJlKCcuL191aWQnKVxuICAsIHdrcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fd2tzJylcbiAgLCB3a3NFeHQgICAgICAgICA9IHJlcXVpcmUoJy4vX3drcy1leHQnKVxuICAsIHdrc0RlZmluZSAgICAgID0gcmVxdWlyZSgnLi9fd2tzLWRlZmluZScpXG4gICwga2V5T2YgICAgICAgICAgPSByZXF1aXJlKCcuL19rZXlvZicpXG4gICwgZW51bUtleXMgICAgICAgPSByZXF1aXJlKCcuL19lbnVtLWtleXMnKVxuICAsIGlzQXJyYXkgICAgICAgID0gcmVxdWlyZSgnLi9faXMtYXJyYXknKVxuICAsIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCB0b0lPYmplY3QgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBjcmVhdGVEZXNjICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxuICAsIF9jcmVhdGUgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpXG4gICwgZ09QTkV4dCAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbi1leHQnKVxuICAsICRHT1BEICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKVxuICAsICREUCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCAka2V5cyAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BEICAgICAgICAgICA9ICRHT1BELmZcbiAgLCBkUCAgICAgICAgICAgICA9ICREUC5mXG4gICwgZ09QTiAgICAgICAgICAgPSBnT1BORXh0LmZcbiAgLCAkU3ltYm9sICAgICAgICA9IGdsb2JhbC5TeW1ib2xcbiAgLCAkSlNPTiAgICAgICAgICA9IGdsb2JhbC5KU09OXG4gICwgX3N0cmluZ2lmeSAgICAgPSAkSlNPTiAmJiAkSlNPTi5zdHJpbmdpZnlcbiAgLCBQUk9UT1RZUEUgICAgICA9ICdwcm90b3R5cGUnXG4gICwgSElEREVOICAgICAgICAgPSB3a3MoJ19oaWRkZW4nKVxuICAsIFRPX1BSSU1JVElWRSAgID0gd2tzKCd0b1ByaW1pdGl2ZScpXG4gICwgaXNFbnVtICAgICAgICAgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZVxuICAsIFN5bWJvbFJlZ2lzdHJ5ID0gc2hhcmVkKCdzeW1ib2wtcmVnaXN0cnknKVxuICAsIEFsbFN5bWJvbHMgICAgID0gc2hhcmVkKCdzeW1ib2xzJylcbiAgLCBPUFN5bWJvbHMgICAgICA9IHNoYXJlZCgnb3Atc3ltYm9scycpXG4gICwgT2JqZWN0UHJvdG8gICAgPSBPYmplY3RbUFJPVE9UWVBFXVxuICAsIFVTRV9OQVRJVkUgICAgID0gdHlwZW9mICRTeW1ib2wgPT0gJ2Z1bmN0aW9uJ1xuICAsIFFPYmplY3QgICAgICAgID0gZ2xvYmFsLlFPYmplY3Q7XG4vLyBEb24ndCB1c2Ugc2V0dGVycyBpbiBRdCBTY3JpcHQsIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8xNzNcbnZhciBzZXR0ZXIgPSAhUU9iamVjdCB8fCAhUU9iamVjdFtQUk9UT1RZUEVdIHx8ICFRT2JqZWN0W1BST1RPVFlQRV0uZmluZENoaWxkO1xuXG4vLyBmYWxsYmFjayBmb3Igb2xkIEFuZHJvaWQsIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD02ODdcbnZhciBzZXRTeW1ib2xEZXNjID0gREVTQ1JJUFRPUlMgJiYgJGZhaWxzKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBfY3JlYXRlKGRQKHt9LCAnYScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiBkUCh0aGlzLCAnYScsIHt2YWx1ZTogN30pLmE7IH1cbiAgfSkpLmEgIT0gNztcbn0pID8gZnVuY3Rpb24oaXQsIGtleSwgRCl7XG4gIHZhciBwcm90b0Rlc2MgPSBnT1BEKE9iamVjdFByb3RvLCBrZXkpO1xuICBpZihwcm90b0Rlc2MpZGVsZXRlIE9iamVjdFByb3RvW2tleV07XG4gIGRQKGl0LCBrZXksIEQpO1xuICBpZihwcm90b0Rlc2MgJiYgaXQgIT09IE9iamVjdFByb3RvKWRQKE9iamVjdFByb3RvLCBrZXksIHByb3RvRGVzYyk7XG59IDogZFA7XG5cbnZhciB3cmFwID0gZnVuY3Rpb24odGFnKXtcbiAgdmFyIHN5bSA9IEFsbFN5bWJvbHNbdGFnXSA9IF9jcmVhdGUoJFN5bWJvbFtQUk9UT1RZUEVdKTtcbiAgc3ltLl9rID0gdGFnO1xuICByZXR1cm4gc3ltO1xufTtcblxudmFyIGlzU3ltYm9sID0gVVNFX05BVElWRSAmJiB0eXBlb2YgJFN5bWJvbC5pdGVyYXRvciA9PSAnc3ltYm9sJyA/IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJztcbn0gOiBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCBpbnN0YW5jZW9mICRTeW1ib2w7XG59O1xuXG52YXIgJGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgRCl7XG4gIGlmKGl0ID09PSBPYmplY3RQcm90bykkZGVmaW5lUHJvcGVydHkoT1BTeW1ib2xzLCBrZXksIEQpO1xuICBhbk9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEQpO1xuICBpZihoYXMoQWxsU3ltYm9scywga2V5KSl7XG4gICAgaWYoIUQuZW51bWVyYWJsZSl7XG4gICAgICBpZighaGFzKGl0LCBISURERU4pKWRQKGl0LCBISURERU4sIGNyZWF0ZURlc2MoMSwge30pKTtcbiAgICAgIGl0W0hJRERFTl1ba2V5XSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0paXRbSElEREVOXVtrZXldID0gZmFsc2U7XG4gICAgICBEID0gX2NyZWF0ZShELCB7ZW51bWVyYWJsZTogY3JlYXRlRGVzYygwLCBmYWxzZSl9KTtcbiAgICB9IHJldHVybiBzZXRTeW1ib2xEZXNjKGl0LCBrZXksIEQpO1xuICB9IHJldHVybiBkUChpdCwga2V5LCBEKTtcbn07XG52YXIgJGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKGl0LCBQKXtcbiAgYW5PYmplY3QoaXQpO1xuICB2YXIga2V5cyA9IGVudW1LZXlzKFAgPSB0b0lPYmplY3QoUCkpXG4gICAgLCBpICAgID0gMFxuICAgICwgbCA9IGtleXMubGVuZ3RoXG4gICAgLCBrZXk7XG4gIHdoaWxlKGwgPiBpKSRkZWZpbmVQcm9wZXJ0eShpdCwga2V5ID0ga2V5c1tpKytdLCBQW2tleV0pO1xuICByZXR1cm4gaXQ7XG59O1xudmFyICRjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaXQsIFApe1xuICByZXR1cm4gUCA9PT0gdW5kZWZpbmVkID8gX2NyZWF0ZShpdCkgOiAkZGVmaW5lUHJvcGVydGllcyhfY3JlYXRlKGl0KSwgUCk7XG59O1xudmFyICRwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKGtleSl7XG4gIHZhciBFID0gaXNFbnVtLmNhbGwodGhpcywga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKSk7XG4gIGlmKHRoaXMgPT09IE9iamVjdFByb3RvICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT1BTeW1ib2xzLCBrZXkpKXJldHVybiBmYWxzZTtcbiAgcmV0dXJuIEUgfHwgIWhhcyh0aGlzLCBrZXkpIHx8ICFoYXMoQWxsU3ltYm9scywga2V5KSB8fCBoYXModGhpcywgSElEREVOKSAmJiB0aGlzW0hJRERFTl1ba2V5XSA/IEUgOiB0cnVlO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpe1xuICBpdCAgPSB0b0lPYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBpZihpdCA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpcmV0dXJuO1xuICB2YXIgRCA9IGdPUEQoaXQsIGtleSk7XG4gIGlmKEQgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIShoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKSlELmVudW1lcmFibGUgPSB0cnVlO1xuICByZXR1cm4gRDtcbn07XG52YXIgJGdldE93blByb3BlcnR5TmFtZXMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KXtcbiAgdmFyIG5hbWVzICA9IGdPUE4odG9JT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpe1xuICAgIGlmKCFoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYga2V5ICE9IEhJRERFTiAmJiBrZXkgIT0gTUVUQSlyZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpe1xuICB2YXIgSVNfT1AgID0gaXQgPT09IE9iamVjdFByb3RvXG4gICAgLCBuYW1lcyAgPSBnT1BOKElTX09QID8gT1BTeW1ib2xzIDogdG9JT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpe1xuICAgIGlmKGhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiAoSVNfT1AgPyBoYXMoT2JqZWN0UHJvdG8sIGtleSkgOiB0cnVlKSlyZXN1bHQucHVzaChBbGxTeW1ib2xzW2tleV0pO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xuXG4vLyAxOS40LjEuMSBTeW1ib2woW2Rlc2NyaXB0aW9uXSlcbmlmKCFVU0VfTkFUSVZFKXtcbiAgJFN5bWJvbCA9IGZ1bmN0aW9uIFN5bWJvbCgpe1xuICAgIGlmKHRoaXMgaW5zdGFuY2VvZiAkU3ltYm9sKXRocm93IFR5cGVFcnJvcignU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yIScpO1xuICAgIHZhciB0YWcgPSB1aWQoYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpO1xuICAgIHZhciAkc2V0ID0gZnVuY3Rpb24odmFsdWUpe1xuICAgICAgaWYodGhpcyA9PT0gT2JqZWN0UHJvdG8pJHNldC5jYWxsKE9QU3ltYm9scywgdmFsdWUpO1xuICAgICAgaWYoaGFzKHRoaXMsIEhJRERFTikgJiYgaGFzKHRoaXNbSElEREVOXSwgdGFnKSl0aGlzW0hJRERFTl1bdGFnXSA9IGZhbHNlO1xuICAgICAgc2V0U3ltYm9sRGVzYyh0aGlzLCB0YWcsIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbiAgICB9O1xuICAgIGlmKERFU0NSSVBUT1JTICYmIHNldHRlcilzZXRTeW1ib2xEZXNjKE9iamVjdFByb3RvLCB0YWcsIHtjb25maWd1cmFibGU6IHRydWUsIHNldDogJHNldH0pO1xuICAgIHJldHVybiB3cmFwKHRhZyk7XG4gIH07XG4gIHJlZGVmaW5lKCRTeW1ib2xbUFJPVE9UWVBFXSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgICByZXR1cm4gdGhpcy5faztcbiAgfSk7XG5cbiAgJEdPUEQuZiA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gICREUC5mICAgPSAkZGVmaW5lUHJvcGVydHk7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZiA9IGdPUE5FeHQuZiA9ICRnZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICByZXF1aXJlKCcuL19vYmplY3QtcGllJykuZiAgPSAkcHJvcGVydHlJc0VudW1lcmFibGU7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJykuZiA9ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbiAgaWYoREVTQ1JJUFRPUlMgJiYgIXJlcXVpcmUoJy4vX2xpYnJhcnknKSl7XG4gICAgcmVkZWZpbmUoT2JqZWN0UHJvdG8sICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsICRwcm9wZXJ0eUlzRW51bWVyYWJsZSwgdHJ1ZSk7XG4gIH1cblxuICB3a3NFeHQuZiA9IGZ1bmN0aW9uKG5hbWUpe1xuICAgIHJldHVybiB3cmFwKHdrcyhuYW1lKSk7XG4gIH1cbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwge1N5bWJvbDogJFN5bWJvbH0pO1xuXG5mb3IodmFyIHN5bWJvbHMgPSAoXG4gIC8vIDE5LjQuMi4yLCAxOS40LjIuMywgMTkuNC4yLjQsIDE5LjQuMi42LCAxOS40LjIuOCwgMTkuNC4yLjksIDE5LjQuMi4xMCwgMTkuNC4yLjExLCAxOS40LjIuMTIsIDE5LjQuMi4xMywgMTkuNC4yLjE0XG4gICdoYXNJbnN0YW5jZSxpc0NvbmNhdFNwcmVhZGFibGUsaXRlcmF0b3IsbWF0Y2gscmVwbGFjZSxzZWFyY2gsc3BlY2llcyxzcGxpdCx0b1ByaW1pdGl2ZSx0b1N0cmluZ1RhZyx1bnNjb3BhYmxlcydcbikuc3BsaXQoJywnKSwgaSA9IDA7IHN5bWJvbHMubGVuZ3RoID4gaTsgKXdrcyhzeW1ib2xzW2krK10pO1xuXG5mb3IodmFyIHN5bWJvbHMgPSAka2V5cyh3a3Muc3RvcmUpLCBpID0gMDsgc3ltYm9scy5sZW5ndGggPiBpOyApd2tzRGVmaW5lKHN5bWJvbHNbaSsrXSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsICdTeW1ib2wnLCB7XG4gIC8vIDE5LjQuMi4xIFN5bWJvbC5mb3Ioa2V5KVxuICAnZm9yJzogZnVuY3Rpb24oa2V5KXtcbiAgICByZXR1cm4gaGFzKFN5bWJvbFJlZ2lzdHJ5LCBrZXkgKz0gJycpXG4gICAgICA/IFN5bWJvbFJlZ2lzdHJ5W2tleV1cbiAgICAgIDogU3ltYm9sUmVnaXN0cnlba2V5XSA9ICRTeW1ib2woa2V5KTtcbiAgfSxcbiAgLy8gMTkuNC4yLjUgU3ltYm9sLmtleUZvcihzeW0pXG4gIGtleUZvcjogZnVuY3Rpb24ga2V5Rm9yKGtleSl7XG4gICAgaWYoaXNTeW1ib2woa2V5KSlyZXR1cm4ga2V5T2YoU3ltYm9sUmVnaXN0cnksIGtleSk7XG4gICAgdGhyb3cgVHlwZUVycm9yKGtleSArICcgaXMgbm90IGEgc3ltYm9sIScpO1xuICB9LFxuICB1c2VTZXR0ZXI6IGZ1bmN0aW9uKCl7IHNldHRlciA9IHRydWU7IH0sXG4gIHVzZVNpbXBsZTogZnVuY3Rpb24oKXsgc2V0dGVyID0gZmFsc2U7IH1cbn0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnT2JqZWN0Jywge1xuICAvLyAxOS4xLjIuMiBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4gIGNyZWF0ZTogJGNyZWF0ZSxcbiAgLy8gMTkuMS4yLjQgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4gIGRlZmluZVByb3BlcnR5OiAkZGVmaW5lUHJvcGVydHksXG4gIC8vIDE5LjEuMi4zIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpXG4gIGRlZmluZVByb3BlcnRpZXM6ICRkZWZpbmVQcm9wZXJ0aWVzLFxuICAvLyAxOS4xLjIuNiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJGdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgLy8gMTkuMS4yLjcgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogJGdldE93blByb3BlcnR5TmFtZXMsXG4gIC8vIDE5LjEuMi44IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoTylcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiAkZ2V0T3duUHJvcGVydHlTeW1ib2xzXG59KTtcblxuLy8gMjQuMy4yIEpTT04uc3RyaW5naWZ5KHZhbHVlIFssIHJlcGxhY2VyIFssIHNwYWNlXV0pXG4kSlNPTiAmJiAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICghVVNFX05BVElWRSB8fCAkZmFpbHMoZnVuY3Rpb24oKXtcbiAgdmFyIFMgPSAkU3ltYm9sKCk7XG4gIC8vIE1TIEVkZ2UgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIHt9XG4gIC8vIFdlYktpdCBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMgbnVsbFxuICAvLyBWOCB0aHJvd3Mgb24gYm94ZWQgc3ltYm9sc1xuICByZXR1cm4gX3N0cmluZ2lmeShbU10pICE9ICdbbnVsbF0nIHx8IF9zdHJpbmdpZnkoe2E6IFN9KSAhPSAne30nIHx8IF9zdHJpbmdpZnkoT2JqZWN0KFMpKSAhPSAne30nO1xufSkpLCAnSlNPTicsIHtcbiAgc3RyaW5naWZ5OiBmdW5jdGlvbiBzdHJpbmdpZnkoaXQpe1xuICAgIGlmKGl0ID09PSB1bmRlZmluZWQgfHwgaXNTeW1ib2woaXQpKXJldHVybjsgLy8gSUU4IHJldHVybnMgc3RyaW5nIG9uIHVuZGVmaW5lZFxuICAgIHZhciBhcmdzID0gW2l0XVxuICAgICAgLCBpICAgID0gMVxuICAgICAgLCByZXBsYWNlciwgJHJlcGxhY2VyO1xuICAgIHdoaWxlKGFyZ3VtZW50cy5sZW5ndGggPiBpKWFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcmVwbGFjZXIgPSBhcmdzWzFdO1xuICAgIGlmKHR5cGVvZiByZXBsYWNlciA9PSAnZnVuY3Rpb24nKSRyZXBsYWNlciA9IHJlcGxhY2VyO1xuICAgIGlmKCRyZXBsYWNlciB8fCAhaXNBcnJheShyZXBsYWNlcikpcmVwbGFjZXIgPSBmdW5jdGlvbihrZXksIHZhbHVlKXtcbiAgICAgIGlmKCRyZXBsYWNlcil2YWx1ZSA9ICRyZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsdWUpO1xuICAgICAgaWYoIWlzU3ltYm9sKHZhbHVlKSlyZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBhcmdzWzFdID0gcmVwbGFjZXI7XG4gICAgcmV0dXJuIF9zdHJpbmdpZnkuYXBwbHkoJEpTT04sIGFyZ3MpO1xuICB9XG59KTtcblxuLy8gMTkuNC4zLjQgU3ltYm9sLnByb3RvdHlwZVtAQHRvUHJpbWl0aXZlXShoaW50KVxuJFN5bWJvbFtQUk9UT1RZUEVdW1RPX1BSSU1JVElWRV0gfHwgcmVxdWlyZSgnLi9faGlkZScpKCRTeW1ib2xbUFJPVE9UWVBFXSwgVE9fUFJJTUlUSVZFLCAkU3ltYm9sW1BST1RPVFlQRV0udmFsdWVPZik7XG4vLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZygkU3ltYm9sLCAnU3ltYm9sJyk7XG4vLyAyMC4yLjEuOSBNYXRoW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhNYXRoLCAnTWF0aCcsIHRydWUpO1xuLy8gMjQuMy4zIEpTT05bQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKGdsb2JhbC5KU09OLCAnSlNPTicsIHRydWUpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN5bWJvbC5qc1xuLy8gbW9kdWxlIGlkID0gODJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgTUVUQSAgICAgPSByZXF1aXJlKCcuL191aWQnKSgnbWV0YScpXG4gICwgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGhhcyAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBzZXREZXNjICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZcbiAgLCBpZCAgICAgICA9IDA7XG52YXIgaXNFeHRlbnNpYmxlID0gT2JqZWN0LmlzRXh0ZW5zaWJsZSB8fCBmdW5jdGlvbigpe1xuICByZXR1cm4gdHJ1ZTtcbn07XG52YXIgRlJFRVpFID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIGlzRXh0ZW5zaWJsZShPYmplY3QucHJldmVudEV4dGVuc2lvbnMoe30pKTtcbn0pO1xudmFyIHNldE1ldGEgPSBmdW5jdGlvbihpdCl7XG4gIHNldERlc2MoaXQsIE1FVEEsIHt2YWx1ZToge1xuICAgIGk6ICdPJyArICsraWQsIC8vIG9iamVjdCBJRFxuICAgIHc6IHt9ICAgICAgICAgIC8vIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH19KTtcbn07XG52YXIgZmFzdEtleSA9IGZ1bmN0aW9uKGl0LCBjcmVhdGUpe1xuICAvLyByZXR1cm4gcHJpbWl0aXZlIHdpdGggcHJlZml4XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJyA/IGl0IDogKHR5cGVvZiBpdCA9PSAnc3RyaW5nJyA/ICdTJyA6ICdQJykgKyBpdDtcbiAgaWYoIWhhcyhpdCwgTUVUQSkpe1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYoIWlzRXh0ZW5zaWJsZShpdCkpcmV0dXJuICdGJztcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmKCFjcmVhdGUpcmV0dXJuICdFJztcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gb2JqZWN0IElEXG4gIH0gcmV0dXJuIGl0W01FVEFdLmk7XG59O1xudmFyIGdldFdlYWsgPSBmdW5jdGlvbihpdCwgY3JlYXRlKXtcbiAgaWYoIWhhcyhpdCwgTUVUQSkpe1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYoIWlzRXh0ZW5zaWJsZShpdCkpcmV0dXJuIHRydWU7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZighY3JlYXRlKXJldHVybiBmYWxzZTtcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gaGFzaCB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9IHJldHVybiBpdFtNRVRBXS53O1xufTtcbi8vIGFkZCBtZXRhZGF0YSBvbiBmcmVlemUtZmFtaWx5IG1ldGhvZHMgY2FsbGluZ1xudmFyIG9uRnJlZXplID0gZnVuY3Rpb24oaXQpe1xuICBpZihGUkVFWkUgJiYgbWV0YS5ORUVEICYmIGlzRXh0ZW5zaWJsZShpdCkgJiYgIWhhcyhpdCwgTUVUQSkpc2V0TWV0YShpdCk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgbWV0YSA9IG1vZHVsZS5leHBvcnRzID0ge1xuICBLRVk6ICAgICAgTUVUQSxcbiAgTkVFRDogICAgIGZhbHNlLFxuICBmYXN0S2V5OiAgZmFzdEtleSxcbiAgZ2V0V2VhazogIGdldFdlYWssXG4gIG9uRnJlZXplOiBvbkZyZWV6ZVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19tZXRhLmpzXG4vLyBtb2R1bGUgaWQgPSA4M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBnbG9iYWwgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBMSUJSQVJZICAgICAgICA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKVxuICAsIHdrc0V4dCAgICAgICAgID0gcmVxdWlyZSgnLi9fd2tzLWV4dCcpXG4gICwgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgdmFyICRTeW1ib2wgPSBjb3JlLlN5bWJvbCB8fCAoY29yZS5TeW1ib2wgPSBMSUJSQVJZID8ge30gOiBnbG9iYWwuU3ltYm9sIHx8IHt9KTtcbiAgaWYobmFtZS5jaGFyQXQoMCkgIT0gJ18nICYmICEobmFtZSBpbiAkU3ltYm9sKSlkZWZpbmVQcm9wZXJ0eSgkU3ltYm9sLCBuYW1lLCB7dmFsdWU6IHdrc0V4dC5mKG5hbWUpfSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1kZWZpbmUuanNcbi8vIG1vZHVsZSBpZCA9IDg0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGdldEtleXMgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgZWwpe1xuICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KG9iamVjdClcbiAgICAsIGtleXMgICA9IGdldEtleXMoTylcbiAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgLCBpbmRleCAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKGxlbmd0aCA+IGluZGV4KWlmKE9ba2V5ID0ga2V5c1tpbmRleCsrXV0gPT09IGVsKXJldHVybiBrZXk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2tleW9mLmpzXG4vLyBtb2R1bGUgaWQgPSA4NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIGFsbCBlbnVtZXJhYmxlIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBzeW1ib2xzXG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BTICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKVxuICAsIHBJRSAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIHJlc3VsdCAgICAgPSBnZXRLZXlzKGl0KVxuICAgICwgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgaWYoZ2V0U3ltYm9scyl7XG4gICAgdmFyIHN5bWJvbHMgPSBnZXRTeW1ib2xzKGl0KVxuICAgICAgLCBpc0VudW0gID0gcElFLmZcbiAgICAgICwgaSAgICAgICA9IDBcbiAgICAgICwga2V5O1xuICAgIHdoaWxlKHN5bWJvbHMubGVuZ3RoID4gaSlpZihpc0VudW0uY2FsbChpdCwga2V5ID0gc3ltYm9sc1tpKytdKSlyZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0ta2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gODZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzXG4vLyBtb2R1bGUgaWQgPSA4N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanNcbi8vIG1vZHVsZSBpZCA9IDg4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gNy4yLjIgSXNBcnJheShhcmd1bWVudClcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBpc0FycmF5KGFyZyl7XG4gIHJldHVybiBjb2YoYXJnKSA9PSAnQXJyYXknO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS5qc1xuLy8gbW9kdWxlIGlkID0gODlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBmYWxsYmFjayBmb3IgSUUxMSBidWdneSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB3aXRoIGlmcmFtZSBhbmQgd2luZG93XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgZ09QTiAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mXG4gICwgdG9TdHJpbmcgID0ge30udG9TdHJpbmc7XG5cbnZhciB3aW5kb3dOYW1lcyA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xuXG52YXIgZ2V0V2luZG93TmFtZXMgPSBmdW5jdGlvbihpdCl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGdPUE4oaXQpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB3aW5kb3dOYW1lcy5zbGljZSgpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCl7XG4gIHJldHVybiB3aW5kb3dOYW1lcyAmJiB0b1N0cmluZy5jYWxsKGl0KSA9PSAnW29iamVjdCBXaW5kb3ddJyA/IGdldFdpbmRvd05hbWVzKGl0KSA6IGdPUE4odG9JT2JqZWN0KGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4tZXh0LmpzXG4vLyBtb2R1bGUgaWQgPSA5MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIDE5LjEuMi43IC8gMTUuMi4zLjQgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbnZhciAka2V5cyAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKVxuICAsIGhpZGRlbktleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJykuY29uY2F0KCdsZW5ndGgnLCAncHJvdG90eXBlJyk7XG5cbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoTyl7XG4gIHJldHVybiAka2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4uanNcbi8vIG1vZHVsZSBpZCA9IDkxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIHBJRSAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpXG4gICwgY3JlYXRlRGVzYyAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgLCB0b0lPYmplY3QgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpXG4gICwgZ09QRCAgICAgICAgICAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZ09QRCA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKXtcbiAgTyA9IHRvSU9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBpZihJRThfRE9NX0RFRklORSl0cnkge1xuICAgIHJldHVybiBnT1BEKE8sIFApO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKGhhcyhPLCBQKSlyZXR1cm4gY3JlYXRlRGVzYyghcElFLmYuY2FsbChPLCBQKSwgT1tQXSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BkLmpzXG4vLyBtb2R1bGUgaWQgPSA5MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnYXN5bmNJdGVyYXRvcicpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnN5bWJvbC5hc3luYy1pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gOTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJyZXF1aXJlKCcuL193a3MtZGVmaW5lJykoJ29ic2VydmFibGUnKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wub2JzZXJ2YWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gOTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9zZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mXCIpO1xuXG52YXIgX3NldFByb3RvdHlwZU9mMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NldFByb3RvdHlwZU9mKTtcblxudmFyIF9jcmVhdGUgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvY3JlYXRlXCIpO1xuXG52YXIgX2NyZWF0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGUpO1xuXG52YXIgX3R5cGVvZjIgPSByZXF1aXJlKFwiLi4vaGVscGVycy90eXBlb2ZcIik7XG5cbnZhciBfdHlwZW9mMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3R5cGVvZjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgKHR5cGVvZiBzdXBlckNsYXNzID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6ICgwLCBfdHlwZW9mMy5kZWZhdWx0KShzdXBlckNsYXNzKSkpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gKDAsIF9jcmVhdGUyLmRlZmF1bHQpKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2YyLmRlZmF1bHQgPyAoMCwgX3NldFByb3RvdHlwZU9mMi5kZWZhdWx0KShzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMuanNcbi8vIG1vZHVsZSBpZCA9IDk2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzXG4vLyBtb2R1bGUgaWQgPSA5N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Quc2V0UHJvdG90eXBlT2Y7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L3NldC1wcm90b3R5cGUtb2YuanNcbi8vIG1vZHVsZSBpZCA9IDk4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gMTkuMS4zLjE5IE9iamVjdC5zZXRQcm90b3R5cGVPZihPLCBwcm90bylcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtzZXRQcm90b3R5cGVPZjogcmVxdWlyZSgnLi9fc2V0LXByb3RvJykuc2V0fSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YuanNcbi8vIG1vZHVsZSBpZCA9IDk5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gV29ya3Mgd2l0aCBfX3Byb3RvX18gb25seS4gT2xkIHY4IGNhbid0IHdvcmsgd2l0aCBudWxsIHByb3RvIG9iamVjdHMuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGNoZWNrID0gZnVuY3Rpb24oTywgcHJvdG8pe1xuICBhbk9iamVjdChPKTtcbiAgaWYoIWlzT2JqZWN0KHByb3RvKSAmJiBwcm90byAhPT0gbnVsbCl0aHJvdyBUeXBlRXJyb3IocHJvdG8gKyBcIjogY2FuJ3Qgc2V0IGFzIHByb3RvdHlwZSFcIik7XG59O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8ICgnX19wcm90b19fJyBpbiB7fSA/IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBmdW5jdGlvbih0ZXN0LCBidWdneSwgc2V0KXtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNldCA9IHJlcXVpcmUoJy4vX2N0eCcpKEZ1bmN0aW9uLmNhbGwsIHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJykuZihPYmplY3QucHJvdG90eXBlLCAnX19wcm90b19fJykuc2V0LCAyKTtcbiAgICAgICAgc2V0KHRlc3QsIFtdKTtcbiAgICAgICAgYnVnZ3kgPSAhKHRlc3QgaW5zdGFuY2VvZiBBcnJheSk7XG4gICAgICB9IGNhdGNoKGUpeyBidWdneSA9IHRydWU7IH1cbiAgICAgIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90byl7XG4gICAgICAgIGNoZWNrKE8sIHByb3RvKTtcbiAgICAgICAgaWYoYnVnZ3kpTy5fX3Byb3RvX18gPSBwcm90bztcbiAgICAgICAgZWxzZSBzZXQoTywgcHJvdG8pO1xuICAgICAgICByZXR1cm4gTztcbiAgICAgIH07XG4gICAgfSh7fSwgZmFsc2UpIDogdW5kZWZpbmVkKSxcbiAgY2hlY2s6IGNoZWNrXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1wcm90by5qc1xuLy8gbW9kdWxlIGlkID0gMTAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2NyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGUoUCwgRCl7XG4gIHJldHVybiAkT2JqZWN0LmNyZWF0ZShQLCBEKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtjcmVhdGU6IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDEwM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbihmdW5jdGlvbiAod2luKSB7XG5cbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvLyBtYWpvciBldmVudHMgc3VwcG9ydGVkOlxuICAgIC8vIHBhbnN0YXJ0XG4gICAgLy8gcGFubW92ZVxuICAgIC8vIHBhbmVuZFxuICAgIC8vIHN3aXBlXG4gICAgLy8gbG9uZ3ByZXNzXG5cbiAgICAvLyBleHRyYSBldmVudHMgc3VwcG9ydGVkOlxuICAgIC8vIGR1YWx0b3VjaHN0YXJ0XG4gICAgLy8gZHVhbHRvdWNoXG4gICAgLy8gZHVhbHRvdWNoZW5kXG4gICAgLy8gdmVydGljYWxwYW5zdGFydFxuICAgIC8vIGhvcml6b250YWxwYW5zdGFydFxuICAgIC8vIHZlcnRpY2FscGFubW92ZVxuICAgIC8vIGhvcml6b250YWxwYW5tb3ZlXG4gICAgLy8gdGFwXG4gICAgLy8gZG91YmxldGFwXG4gICAgLy8gdmVydGljYWxzd2lwZVxuICAgIC8vIGhvcml6b250YWxzd2lwZVxuICAgIC8vIHByZXNzZW5kXG5cbiAgICB2YXIgZG9jID0gd2luLmRvY3VtZW50LFxuICAgICAgICBkb2NFbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQsXG4gICAgICAgIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLFxuICAgICAgICBnZXN0dXJlcyA9IHt9LFxuICAgICAgICBsYXN0VGFwID0gbnVsbDtcblxuICAgIC8qKlxuICAgICog5om+5Yiw5Lik5Liq57uT54K55YWx5ZCM55qE5pyA5bCP5qC557uT54K5XG4gICAgKiDlpoLmnpzot5/nu5PngrnkuI3lrZjlnKjvvIzliJnov5Tlm55udWxsXG4gICAgKlxuICAgICogQHBhcmFtICB7RWxlbWVudH0gZWwxIOesrOS4gOS4que7k+eCuVxuICAgICogQHBhcmFtICB7RWxlbWVudH0gZWwyIOesrOS6jOS4que7k+eCuVxuICAgICogQHJldHVybiB7RWxlbWVudH0gICAgIOaguee7k+eCuVxuICAgICovXG4gICAgZnVuY3Rpb24gZ2V0Q29tbW9uQW5jZXN0b3IoZWwxLCBlbDIpIHtcbiAgICAgICAgdmFyIGVsID0gZWwxO1xuICAgICAgICB3aGlsZSAoZWwpIHtcbiAgICAgICAgICAgIGlmIChlbC5jb250YWlucyhlbDIpIHx8IGVsID09PSBlbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbCA9IGVsLnBhcmVudE5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiDop6blj5HkuIDkuKrkuovku7ZcbiAgICAqXG4gICAgKiBAcGFyYW0gIHtFbGVtZW50fSBlbGVtZW50IOebruagh+e7k+eCuVxuICAgICogQHBhcmFtICB7c3RyaW5nfSAgdHlwZSAgICDkuovku7bnsbvlnotcbiAgICAqIEBwYXJhbSAge29iamVjdH0gIGV4dHJhICAg5a+55LqL5Lu25a+56LGh55qE5omp5bGVXG4gICAgKi9cbiAgICBmdW5jdGlvbiBmaXJlRXZlbnQoZWxlbWVudCwgdHlwZSwgZXh0cmEpIHtcbiAgICAgICAgdmFyIGV2ZW50ID0gZG9jLmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJyk7XG4gICAgICAgIGV2ZW50LmluaXRFdmVudCh0eXBlLCB0cnVlLCB0cnVlKTtcblxuICAgICAgICBpZiAoKHR5cGVvZiBleHRyYSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoZXh0cmEpKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gZXh0cmEpIHtcbiAgICAgICAgICAgICAgICBldmVudFtwXSA9IGV4dHJhW3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIOiuoeeul+WPmOaNouaViOaenFxuICAgICog5YGH6K6+5Z2Q5qCH57O75LiK5pyJNOS4queCuUFCQ0RcbiAgICAqID4g5peL6L2s77ya5LuOQULml4vovazliLBDROeahOinkuW6plxuICAgICogPiDnvKnmlL7vvJrku45BQumVv+W6puWPmOaNouWIsENE6ZW/5bqm55qE5q+U5L6LXG4gICAgKiA+IOS9jeenu++8muS7jkHngrnkvY3np7vliLBD54K555qE5qiq57q15L2N56e7XG4gICAgKlxuICAgICogQHBhcmFtICB7bnVtYmVyfSB4MSDkuIrov7DnrKwx5Liq54K555qE5qiq5Z2Q5qCHXG4gICAgKiBAcGFyYW0gIHtudW1iZXJ9IHkxIOS4iui/sOesrDHkuKrngrnnmoTnurXlnZDmoIdcbiAgICAqIEBwYXJhbSAge251bWJlcn0geDIg5LiK6L+w56ysMuS4queCueeahOaoquWdkOagh1xuICAgICogQHBhcmFtICB7bnVtYmVyfSB5MiDkuIrov7DnrKwy5Liq54K555qE57q15Z2Q5qCHXG4gICAgKiBAcGFyYW0gIHtudW1iZXJ9IHgzIOS4iui/sOesrDPkuKrngrnnmoTmqKrlnZDmoIdcbiAgICAqIEBwYXJhbSAge251bWJlcn0geTMg5LiK6L+w56ysM+S4queCueeahOe6teWdkOagh1xuICAgICogQHBhcmFtICB7bnVtYmVyfSB4NCDkuIrov7DnrKw05Liq54K555qE5qiq5Z2Q5qCHXG4gICAgKiBAcGFyYW0gIHtudW1iZXJ9IHk0IOS4iui/sOesrDTkuKrngrnnmoTnurXlnZDmoIdcbiAgICAqIEByZXR1cm4ge29iamVjdH0gICAg5Y+Y5o2i5pWI5p6c77yM5b2i5aaCe3JvdGF0ZSwgc2NhbGUsIHRyYW5zbGF0ZVsyXSwgbWF0cml4WzNdWzNdfVxuICAgICovXG4gICAgZnVuY3Rpb24gY2FsYyh4MSwgeTEsIHgyLCB5MiwgeDMsIHkzLCB4NCwgeTQpIHtcbiAgICAgICAgdmFyIHJvdGF0ZSA9IE1hdGguYXRhbjIoeTQgLSB5MywgeDQgLSB4MykgLSBNYXRoLmF0YW4yKHkyIC0geTEsIHgyIC0geDEpLFxuICAgICAgICAgICAgc2NhbGUgPSBNYXRoLnNxcnQoKE1hdGgucG93KHk0IC0geTMsIDIpICsgTWF0aC5wb3coeDQgLSB4MywgMikpIC8gKE1hdGgucG93KHkyIC0geTEsIDIpICsgTWF0aC5wb3coeDIgLSB4MSwgMikpKSxcbiAgICAgICAgICAgIHRyYW5zbGF0ZSA9IFt4MyAtIHNjYWxlICogeDEgKiBNYXRoLmNvcyhyb3RhdGUpICsgc2NhbGUgKiB5MSAqIE1hdGguc2luKHJvdGF0ZSksIHkzIC0gc2NhbGUgKiB5MSAqIE1hdGguY29zKHJvdGF0ZSkgLSBzY2FsZSAqIHgxICogTWF0aC5zaW4ocm90YXRlKV07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByb3RhdGU6IHJvdGF0ZSxcbiAgICAgICAgICAgIHNjYWxlOiBzY2FsZSxcbiAgICAgICAgICAgIHRyYW5zbGF0ZTogdHJhbnNsYXRlLFxuICAgICAgICAgICAgbWF0cml4OiBbW3NjYWxlICogTWF0aC5jb3Mocm90YXRlKSwgLXNjYWxlICogTWF0aC5zaW4ocm90YXRlKSwgdHJhbnNsYXRlWzBdXSwgW3NjYWxlICogTWF0aC5zaW4ocm90YXRlKSwgc2NhbGUgKiBNYXRoLmNvcyhyb3RhdGUpLCB0cmFuc2xhdGVbMV1dLCBbMCwgMCwgMV1dXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiDmjZXojrd0b3VjaHN0YXJ05LqL5Lu277yM5bCG5q+P5LiA5Liq5paw5aKe55qE6Kem54K55re75Yqg5YiwZ2VzdHJ1ZXNcbiAgICAqIOWmguaenOS5i+WJjeWwmuaXoOiiq+iusOW9leeahOinpueCue+8jOWImee7keWumnRvdWNobW92ZSwgdG91Y2hlbmQsIHRvdWNoY2FuY2Vs5LqL5Lu2XG4gICAgKlxuICAgICog5paw5aKe6Kem54K56buY6K6k5aSE5LqOdGFwcGluZ+eKtuaAgVxuICAgICogNTAw5q+r56eS5LmL5ZCO5aaC5p6c6L+Y5aSE5LqOdGFwcGluZ+eKtuaAge+8jOWImeinpuWPkXByZXNz5omL5Yq/XG4gICAgKiDlpoLmnpzop6bngrnmlbDkuLoy77yM5YiZ6Kem5Y+RZHVhbHRvdWNoc3RhcnTmiYvlir/vvIzor6XmiYvlir/nmoTnm67moIfnu5PngrnkuLrkuKTkuKrop6bngrnlhbHlkIznmoTmnIDlsI/moLnnu5PngrlcbiAgICAqXG4gICAgKiBAZXZlbnRcbiAgICAqIEBwYXJhbSAge2V2ZW50fSBldmVudFxuICAgICovXG4gICAgZnVuY3Rpb24gdG91Y2hzdGFydEhhbmRsZXIoZXZlbnQpIHtcblxuICAgICAgICBpZiAoT2JqZWN0LmtleXMoZ2VzdHVyZXMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgZG9jRWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdG91Y2htb3ZlSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICAgICAgZG9jRWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0b3VjaGVuZEhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIGRvY0VsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdG91Y2hjYW5jZWxIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZ2VzdHVyZSwgdG91Y2gsIHRvdWNoUmVjb3JkLCBlbGVtZW50cztcblxuICAgICAgICBmdW5jdGlvbiBnZW5QcmVzc0hhbmRsZXIoZWxlbWVudCwgdG91Y2gpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGdlc3R1cmUuc3RhdHVzID09PSAndGFwcGluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgZ2VzdHVyZS5zdGF0dXMgPSAncHJlc3NpbmcnO1xuXG4gICAgICAgICAgICAgICAgICAgIGZpcmVFdmVudChlbGVtZW50LCAnbG9uZ3ByZXNzJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIHRvdWNoIGRhdGEgZm9yIHdlZXhcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoOiB0b3VjaCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoZXM6IGV2ZW50LnRvdWNoZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VkVG91Y2hlczogZXZlbnQuY2hhbmdlZFRvdWNoZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaEV2ZW50OiBldmVudFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoZ2VzdHVyZS5wcmVzc2luZ0hhbmRsZXIpO1xuICAgICAgICAgICAgICAgIGdlc3R1cmUucHJlc3NpbmdIYW5kbGVyID0gbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZWNvcmQgZXZlcnkgdG91Y2hcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdG91Y2ggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1tpXTtcbiAgICAgICAgICAgIHRvdWNoUmVjb3JkID0ge307XG5cbiAgICAgICAgICAgIGZvciAodmFyIF9wIGluIHRvdWNoKSB7XG4gICAgICAgICAgICAgICAgdG91Y2hSZWNvcmRbX3BdID0gdG91Y2hbX3BdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBnZXN0dXJlID0ge1xuICAgICAgICAgICAgICAgIHN0YXJ0VG91Y2g6IHRvdWNoUmVjb3JkLFxuICAgICAgICAgICAgICAgIHN0YXJ0VGltZTogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICd0YXBwaW5nJyxcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBldmVudC5zcmNFbGVtZW50IHx8IGV2ZW50LnRhcmdldCxcbiAgICAgICAgICAgICAgICBwcmVzc2luZ0hhbmRsZXI6IHNldFRpbWVvdXQoZ2VuUHJlc3NIYW5kbGVyKGV2ZW50LnNyY0VsZW1lbnQgfHwgZXZlbnQudGFyZ2V0LCBldmVudC5jaGFuZ2VkVG91Y2hlc1tpXSksIDUwMClcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBnZXN0dXJlc1t0b3VjaC5pZGVudGlmaWVyXSA9IGdlc3R1cmU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoT2JqZWN0LmtleXMoZ2VzdHVyZXMpLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgZWxlbWVudHMgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBnZXN0dXJlcykge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzLnB1c2goZ2VzdHVyZXNbcF0uZWxlbWVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZpcmVFdmVudChnZXRDb21tb25BbmNlc3RvcihlbGVtZW50c1swXSwgZWxlbWVudHNbMV0pLCAnZHVhbHRvdWNoc3RhcnQnLCB7XG4gICAgICAgICAgICAgICAgdG91Y2hlczogc2xpY2UuY2FsbChldmVudC50b3VjaGVzKSxcbiAgICAgICAgICAgICAgICB0b3VjaEV2ZW50OiBldmVudFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAqIOaNleiOt3RvdWNobW92ZeS6i+S7tu+8jOWkhOeQhnBhbuWSjGR1YWznmoTnm7jlhbPmiYvlir9cbiAgICAqXG4gICAgKiAxLiDpgY3ljobmr4/kuKrop6bngrnvvJpcbiAgICAqID4g5aaC5p6c6Kem54K55LmL5YmN5aSE5LqOdGFwcGluZ+eKtuaAge+8jOS4lOS9jeenu+i2hei/hzEw5YOP57Sg77yM5YiZ6K6k5a6a5Li66L+b5YWlcGFubmluZ+eKtuaAgVxuICAgICog5YWI6Kem5Y+RcGFuc3RhcnTmiYvlir/vvIznhLblkI7moLnmja7np7vliqjnmoTmlrnlkJHpgInmi6nmgKfop6blj5Fob3Jpem9udGFscGFuc3RhcnTmiJZ2ZXJ0aWNhbHBhbnN0YXJ05omL5Yq/XG4gICAgKiA+IOWmguaenOinpueCueS5i+WJjeWkhOS6jnBhbm5pbmfnirbmgIHvvIzliJnmoLnmja5wYW7nmoTliJ3lp4vmlrnlkJHop6blj5Fob3Jpem9udGFscGFu5oiWdmVydGljYWxwYW7miYvlir9cbiAgICAqXG4gICAgKiAyLiDlpoLmnpzlvZPliY3op6bngrnmlbDkuLoy77yM5YiZ6K6h566X5Ye65Yeg5L2V5Y+Y5o2i55qE5ZCE6aG55Y+C5pWw77yM6Kem5Y+RZHVhbHRvdWNo5omL5Yq/XG4gICAgKlxuICAgICogQGV2ZW50XG4gICAgKiBAcGFyYW0gIHtldmVudH0gZXZlbnRcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHRvdWNobW92ZUhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgLy8gVE9ETzog5Ye95pWw5aSq5aSn5LqG77yM5b2x5ZON5Y+v6K+75oCn77yM5bu66K6u5YiG6Kej5bm25Yqg5b+F6KaB55qE5rOo6YeKXG5cbiAgICAgICAgLy8g6YGN5Y6G5q+P5Liq6Kem54K577yaXG4gICAgICAgIC8vIDEuIOWmguaenOinpueCueS5i+WJjeWkhOS6jnRhcHBpbmfnirbmgIHvvIzkuJTkvY3np7votoXov4cxMOWDj+e0oO+8jOWImeiupOWumuS4uui/m+WFpXBhbm5pbmfnirbmgIFcbiAgICAgICAgLy8g5YWI6Kem5Y+RcGFuc3RhcnTmiYvlir/vvIznhLblkI7moLnmja7np7vliqjnmoTmlrnlkJHpgInmi6nmgKfop6blj5Fob3Jpem9udGFscGFuc3RhcnTmiJZ2ZXJ0aWNhbHBhbnN0YXJ05omL5Yq/XG4gICAgICAgIC8vIDIuIOWmguaenOinpueCueS5i+WJjeWkhOS6jnBhbm5pbmfnirbmgIHvvIzliJnmoLnmja5wYW7nmoTliJ3lp4vmlrnlkJHop6blj5Fob3Jpem9udGFscGFu5oiWdmVydGljYWxwYW7miYvlir9cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbaV0sXG4gICAgICAgICAgICAgICAgZ2VzdHVyZSA9IGdlc3R1cmVzW3RvdWNoLmlkZW50aWZpZXJdO1xuXG4gICAgICAgICAgICBpZiAoIWdlc3R1cmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghZ2VzdHVyZS5sYXN0VG91Y2gpIHtcbiAgICAgICAgICAgICAgICBnZXN0dXJlLmxhc3RUb3VjaCA9IGdlc3R1cmUuc3RhcnRUb3VjaDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZ2VzdHVyZS5sYXN0VGltZSkge1xuICAgICAgICAgICAgICAgIGdlc3R1cmUubGFzdFRpbWUgPSBnZXN0dXJlLnN0YXJ0VGltZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZ2VzdHVyZS52ZWxvY2l0eVgpIHtcbiAgICAgICAgICAgICAgICBnZXN0dXJlLnZlbG9jaXR5WCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWdlc3R1cmUudmVsb2NpdHlZKSB7XG4gICAgICAgICAgICAgICAgZ2VzdHVyZS52ZWxvY2l0eVkgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFnZXN0dXJlLmR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgZ2VzdHVyZS5kdXJhdGlvbiA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB0aW1lID0gRGF0ZS5ub3coKSAtIGdlc3R1cmUubGFzdFRpbWU7XG4gICAgICAgICAgICB2YXIgdnggPSAodG91Y2guY2xpZW50WCAtIGdlc3R1cmUubGFzdFRvdWNoLmNsaWVudFgpIC8gdGltZSxcbiAgICAgICAgICAgICAgICB2eSA9ICh0b3VjaC5jbGllbnRZIC0gZ2VzdHVyZS5sYXN0VG91Y2guY2xpZW50WSkgLyB0aW1lO1xuXG4gICAgICAgICAgICB2YXIgUkVDT1JEX0RVUkFUSU9OID0gNzA7XG4gICAgICAgICAgICBpZiAodGltZSA+IFJFQ09SRF9EVVJBVElPTikge1xuICAgICAgICAgICAgICAgIHRpbWUgPSBSRUNPUkRfRFVSQVRJT047XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZ2VzdHVyZS5kdXJhdGlvbiArIHRpbWUgPiBSRUNPUkRfRFVSQVRJT04pIHtcbiAgICAgICAgICAgICAgICBnZXN0dXJlLmR1cmF0aW9uID0gUkVDT1JEX0RVUkFUSU9OIC0gdGltZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZ2VzdHVyZS52ZWxvY2l0eVggPSAoZ2VzdHVyZS52ZWxvY2l0eVggKiBnZXN0dXJlLmR1cmF0aW9uICsgdnggKiB0aW1lKSAvIChnZXN0dXJlLmR1cmF0aW9uICsgdGltZSk7XG4gICAgICAgICAgICBnZXN0dXJlLnZlbG9jaXR5WSA9IChnZXN0dXJlLnZlbG9jaXR5WSAqIGdlc3R1cmUuZHVyYXRpb24gKyB2eSAqIHRpbWUpIC8gKGdlc3R1cmUuZHVyYXRpb24gKyB0aW1lKTtcbiAgICAgICAgICAgIGdlc3R1cmUuZHVyYXRpb24gKz0gdGltZTtcblxuICAgICAgICAgICAgZ2VzdHVyZS5sYXN0VG91Y2ggPSB7fTtcblxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiB0b3VjaCkge1xuICAgICAgICAgICAgICAgIGdlc3R1cmUubGFzdFRvdWNoW3BdID0gdG91Y2hbcF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnZXN0dXJlLmxhc3RUaW1lID0gRGF0ZS5ub3coKTtcblxuICAgICAgICAgICAgdmFyIGRpc3BsYWNlbWVudFggPSB0b3VjaC5jbGllbnRYIC0gZ2VzdHVyZS5zdGFydFRvdWNoLmNsaWVudFgsXG4gICAgICAgICAgICAgICAgZGlzcGxhY2VtZW50WSA9IHRvdWNoLmNsaWVudFkgLSBnZXN0dXJlLnN0YXJ0VG91Y2guY2xpZW50WSxcbiAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IE1hdGguc3FydChNYXRoLnBvdyhkaXNwbGFjZW1lbnRYLCAyKSArIE1hdGgucG93KGRpc3BsYWNlbWVudFksIDIpKTtcblxuICAgICAgICAgICAgLy8gbWFnaWMgbnVtYmVyIDEwOiBtb3ZpbmcgMTBweCBtZWFucyBwYW4sIG5vdCB0YXBcbiAgICAgICAgICAgIGlmICgoZ2VzdHVyZS5zdGF0dXMgPT09ICd0YXBwaW5nJyB8fCBnZXN0dXJlLnN0YXR1cyA9PT0gJ3ByZXNzaW5nJykgJiYgZGlzdGFuY2UgPiAxMCkge1xuICAgICAgICAgICAgICAgIGdlc3R1cmUuc3RhdHVzID0gJ3Bhbm5pbmcnO1xuICAgICAgICAgICAgICAgIGdlc3R1cmUuaXNWZXJ0aWNhbCA9ICEoTWF0aC5hYnMoZGlzcGxhY2VtZW50WCkgPiBNYXRoLmFicyhkaXNwbGFjZW1lbnRZKSk7XG5cbiAgICAgICAgICAgICAgICBmaXJlRXZlbnQoZ2VzdHVyZS5lbGVtZW50LCAncGFuc3RhcnQnLCB7XG4gICAgICAgICAgICAgICAgICAgIHRvdWNoOiB0b3VjaCxcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hlczogZXZlbnQudG91Y2hlcyxcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlZFRvdWNoZXM6IGV2ZW50LmNoYW5nZWRUb3VjaGVzLFxuICAgICAgICAgICAgICAgICAgICB0b3VjaEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgaXNWZXJ0aWNhbDogZ2VzdHVyZS5pc1ZlcnRpY2FsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBmaXJlRXZlbnQoZ2VzdHVyZS5lbGVtZW50LCAoZ2VzdHVyZS5pc1ZlcnRpY2FsID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJykgKyAncGFuc3RhcnQnLCB7XG4gICAgICAgICAgICAgICAgICAgIHRvdWNoOiB0b3VjaCxcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hFdmVudDogZXZlbnRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGdlc3R1cmUuc3RhdHVzID09PSAncGFubmluZycpIHtcbiAgICAgICAgICAgICAgICBnZXN0dXJlLnBhblRpbWUgPSBEYXRlLm5vdygpO1xuXG4gICAgICAgICAgICAgICAgZmlyZUV2ZW50KGdlc3R1cmUuZWxlbWVudCwgJ3Bhbm1vdmUnLCB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYWNlbWVudFg6IGRpc3BsYWNlbWVudFgsXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYWNlbWVudFk6IGRpc3BsYWNlbWVudFksXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoOiB0b3VjaCxcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hlczogZXZlbnQudG91Y2hlcyxcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlZFRvdWNoZXM6IGV2ZW50LmNoYW5nZWRUb3VjaGVzLFxuICAgICAgICAgICAgICAgICAgICB0b3VjaEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgaXNWZXJ0aWNhbDogZ2VzdHVyZS5pc1ZlcnRpY2FsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZ2VzdHVyZS5pc1ZlcnRpY2FsKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpcmVFdmVudChnZXN0dXJlLmVsZW1lbnQsICd2ZXJ0aWNhbHBhbm1vdmUnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGFjZW1lbnRZOiBkaXNwbGFjZW1lbnRZLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2g6IHRvdWNoLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hFdmVudDogZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZmlyZUV2ZW50KGdlc3R1cmUuZWxlbWVudCwgJ2hvcml6b250YWxwYW5tb3ZlJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxhY2VtZW50WDogZGlzcGxhY2VtZW50WCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoOiB0b3VjaCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoRXZlbnQ6IGV2ZW50XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOWmguaenOW9k+WJjeinpueCueaVsOS4ujLvvIzliJnorqHnrpflh7rlh6DkvZXlj5jmjaLnmoTlkITpobnlj4LmlbDvvIzop6blj5FkdWFsdG91Y2jmiYvlir9cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGdlc3R1cmVzKS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIHZhciBwb3NpdGlvbiA9IFtdLFxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBbXSxcbiAgICAgICAgICAgICAgICBlbGVtZW50cyA9IFtdLFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybSA9IHZvaWQgMDtcblxuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGV2ZW50LnRvdWNoZXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIF90b3VjaCA9IGV2ZW50LnRvdWNoZXNbX2ldO1xuICAgICAgICAgICAgICAgIHZhciBfZ2VzdHVyZSA9IGdlc3R1cmVzW190b3VjaC5pZGVudGlmaWVyXTtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbi5wdXNoKFtfZ2VzdHVyZS5zdGFydFRvdWNoLmNsaWVudFgsIF9nZXN0dXJlLnN0YXJ0VG91Y2guY2xpZW50WV0pO1xuICAgICAgICAgICAgICAgIGN1cnJlbnQucHVzaChbX3RvdWNoLmNsaWVudFgsIF90b3VjaC5jbGllbnRZXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAodmFyIF9wMiBpbiBnZXN0dXJlcykge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzLnB1c2goZ2VzdHVyZXNbX3AyXS5lbGVtZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdHJhbnNmb3JtID0gY2FsYyhwb3NpdGlvblswXVswXSwgcG9zaXRpb25bMF1bMV0sIHBvc2l0aW9uWzFdWzBdLCBwb3NpdGlvblsxXVsxXSwgY3VycmVudFswXVswXSwgY3VycmVudFswXVsxXSwgY3VycmVudFsxXVswXSwgY3VycmVudFsxXVsxXSk7XG4gICAgICAgICAgICBmaXJlRXZlbnQoZ2V0Q29tbW9uQW5jZXN0b3IoZWxlbWVudHNbMF0sIGVsZW1lbnRzWzFdKSwgJ2R1YWx0b3VjaCcsIHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zZm9ybSxcbiAgICAgICAgICAgICAgICB0b3VjaGVzOiBldmVudC50b3VjaGVzLFxuICAgICAgICAgICAgICAgIHRvdWNoRXZlbnQ6IGV2ZW50XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICog5o2V6I63dG91Y2hlbmTkuovku7ZcbiAgICAqXG4gICAgKiAxLiDlpoLmnpzlvZPliY3op6bngrnmlbDkuLoy77yM5YiZ6Kem5Y+RZHVhbHRvdWNoZW5k5omL5Yq/XG4gICAgKlxuICAgICogMi4g6YGN5Y6G5q+P5Liq6Kem54K577yaXG4gICAgKiA+IOWmguaenOWkhOS6jnRhcHBpbmfnirbmgIHvvIzliJnop6blj5F0YXDmiYvlir9cbiAgICAqIOWmguaenOS5i+WJjTMwMOavq+enkuWHuueOsOi/h3RhcOaJi+WKv++8jOWImeWNh+e6p+S4umRvdWJsZXRhcOaJi+WKv1xuICAgICogPiDlpoLmnpzlpITkuo5wYW5uaW5n54q25oCB77yM5YiZ5qC55o2u5ruR5Ye655qE6YCf5bqm77yM6Kem5Y+RcGFuZW5kL2ZsaWNr5omL5Yq/XG4gICAgKiBmbGlja+aJi+WKv+iiq+inpuWPkeS5i+WQju+8jOWGjeagueaNrua7keWHuueahOaWueWQkeinpuWPkXZlcnRpY2FsZmxpY2svaG9yaXpvbnRhbGZsaWNr5omL5Yq/XG4gICAgKiA+IOWmguaenOWkhOS6jnByZXNzaW5n54q25oCB77yM5YiZ6Kem5Y+RcHJlc3NlbmTmiYvlir9cbiAgICAqXG4gICAgKiAzLiDop6Pnu5HlrprmiYDmnInnm7jlhbPkuovku7ZcbiAgICAqXG4gICAgKiBAZXZlbnRcbiAgICAqIEBwYXJhbSAge2V2ZW50fSBldmVudFxuICAgICovXG4gICAgZnVuY3Rpb24gdG91Y2hlbmRIYW5kbGVyKGV2ZW50KSB7XG5cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGdlc3R1cmVzKS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50cyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBnZXN0dXJlcykge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzLnB1c2goZ2VzdHVyZXNbcF0uZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaXJlRXZlbnQoZ2V0Q29tbW9uQW5jZXN0b3IoZWxlbWVudHNbMF0sIGVsZW1lbnRzWzFdKSwgJ2R1YWx0b3VjaGVuZCcsIHtcbiAgICAgICAgICAgICAgICB0b3VjaGVzOiBzbGljZS5jYWxsKGV2ZW50LnRvdWNoZXMpLFxuICAgICAgICAgICAgICAgIHRvdWNoRXZlbnQ6IGV2ZW50XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciB0b3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzW2ldLFxuICAgICAgICAgICAgICAgIGlkID0gdG91Y2guaWRlbnRpZmllcixcbiAgICAgICAgICAgICAgICBnZXN0dXJlID0gZ2VzdHVyZXNbaWRdO1xuXG4gICAgICAgICAgICBpZiAoIWdlc3R1cmUpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGdlc3R1cmUucHJlc3NpbmdIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGdlc3R1cmUucHJlc3NpbmdIYW5kbGVyKTtcbiAgICAgICAgICAgICAgICBnZXN0dXJlLnByZXNzaW5nSGFuZGxlciA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChnZXN0dXJlLnN0YXR1cyA9PT0gJ3RhcHBpbmcnKSB7XG4gICAgICAgICAgICAgICAgZ2VzdHVyZS50aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgIGZpcmVFdmVudChnZXN0dXJlLmVsZW1lbnQsICd0YXAnLCB7XG4gICAgICAgICAgICAgICAgICAgIHRvdWNoOiB0b3VjaCxcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hFdmVudDogZXZlbnRcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChsYXN0VGFwICYmIGdlc3R1cmUudGltZXN0YW1wIC0gbGFzdFRhcC50aW1lc3RhbXAgPCAzMDApIHtcbiAgICAgICAgICAgICAgICAgICAgZmlyZUV2ZW50KGdlc3R1cmUuZWxlbWVudCwgJ2RvdWJsZXRhcCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoOiB0b3VjaCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoRXZlbnQ6IGV2ZW50XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxhc3RUYXAgPSBnZXN0dXJlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZ2VzdHVyZS5zdGF0dXMgPT09ICdwYW5uaW5nJykge1xuICAgICAgICAgICAgICAgIHZhciBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgIHZhciBkdXJhdGlvbiA9IG5vdyAtIGdlc3R1cmUuc3RhcnRUaW1lLFxuXG4gICAgICAgICAgICAgICAgLy8gdmVsb2NpdHlYID0gKHRvdWNoLmNsaWVudFggLSBnZXN0dXJlLnN0YXJ0VG91Y2guY2xpZW50WCkgLyBkdXJhdGlvbixcbiAgICAgICAgICAgICAgICAvLyB2ZWxvY2l0eVkgPSAodG91Y2guY2xpZW50WSAtIGdlc3R1cmUuc3RhcnRUb3VjaC5jbGllbnRZKSAvIGR1cmF0aW9uLFxuICAgICAgICAgICAgICAgIGRpc3BsYWNlbWVudFggPSB0b3VjaC5jbGllbnRYIC0gZ2VzdHVyZS5zdGFydFRvdWNoLmNsaWVudFgsXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYWNlbWVudFkgPSB0b3VjaC5jbGllbnRZIC0gZ2VzdHVyZS5zdGFydFRvdWNoLmNsaWVudFk7XG5cbiAgICAgICAgICAgICAgICB2YXIgdmVsb2NpdHkgPSBNYXRoLnNxcnQoZ2VzdHVyZS52ZWxvY2l0eVkgKiBnZXN0dXJlLnZlbG9jaXR5WSArIGdlc3R1cmUudmVsb2NpdHlYICogZ2VzdHVyZS52ZWxvY2l0eVgpO1xuICAgICAgICAgICAgICAgIHZhciBpc2ZsaWNrID0gdmVsb2NpdHkgPiAwLjUgJiYgbm93IC0gZ2VzdHVyZS5sYXN0VGltZSA8IDEwMDtcbiAgICAgICAgICAgICAgICB2YXIgZXh0cmEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgaXNmbGljazogaXNmbGljayxcbiAgICAgICAgICAgICAgICAgICAgdmVsb2NpdHlYOiBnZXN0dXJlLnZlbG9jaXR5WCxcbiAgICAgICAgICAgICAgICAgICAgdmVsb2NpdHlZOiBnZXN0dXJlLnZlbG9jaXR5WSxcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxhY2VtZW50WDogZGlzcGxhY2VtZW50WCxcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxhY2VtZW50WTogZGlzcGxhY2VtZW50WSxcbiAgICAgICAgICAgICAgICAgICAgdG91Y2g6IHRvdWNoLFxuICAgICAgICAgICAgICAgICAgICB0b3VjaGVzOiBldmVudC50b3VjaGVzLFxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VkVG91Y2hlczogZXZlbnQuY2hhbmdlZFRvdWNoZXMsXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICBpc1ZlcnRpY2FsOiBnZXN0dXJlLmlzVmVydGljYWxcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgZmlyZUV2ZW50KGdlc3R1cmUuZWxlbWVudCwgJ3BhbmVuZCcsIGV4dHJhKTtcbiAgICAgICAgICAgICAgICBpZiAoaXNmbGljaykge1xuICAgICAgICAgICAgICAgICAgICBmaXJlRXZlbnQoZ2VzdHVyZS5lbGVtZW50LCAnc3dpcGUnLCBleHRyYSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGdlc3R1cmUuaXNWZXJ0aWNhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlyZUV2ZW50KGdlc3R1cmUuZWxlbWVudCwgJ3ZlcnRpY2Fsc3dpcGUnLCBleHRyYSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJlRXZlbnQoZ2VzdHVyZS5lbGVtZW50LCAnaG9yaXpvbnRhbHN3aXBlJywgZXh0cmEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZ2VzdHVyZS5zdGF0dXMgPT09ICdwcmVzc2luZycpIHtcbiAgICAgICAgICAgICAgICBmaXJlRXZlbnQoZ2VzdHVyZS5lbGVtZW50LCAncHJlc3NlbmQnLCB7XG4gICAgICAgICAgICAgICAgICAgIHRvdWNoOiB0b3VjaCxcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hFdmVudDogZXZlbnRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGVsZXRlIGdlc3R1cmVzW2lkXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhnZXN0dXJlcykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBkb2NFbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0b3VjaG1vdmVIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgICAgICBkb2NFbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRvdWNoZW5kSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICAgICAgZG9jRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0b3VjaGNhbmNlbEhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICog5o2V6I63dG91Y2hjYW5jZWzkuovku7ZcbiAgICAqXG4gICAgKiAxLiDlpoLmnpzlvZPliY3op6bngrnmlbDkuLoy77yM5YiZ6Kem5Y+RZHVhbHRvdWNoZW5k5omL5Yq/XG4gICAgKlxuICAgICogMi4g6YGN5Y6G5q+P5Liq6Kem54K577yaXG4gICAgKiA+IOWmguaenOWkhOS6jnBhbm5pbmfnirbmgIHvvIzliJnop6blj5FwYW5lbmTmiYvlir9cbiAgICAqID4g5aaC5p6c5aSE5LqOcHJlc3NpbmfnirbmgIHvvIzliJnop6blj5FwcmVzc2VuZOaJi+WKv1xuICAgICpcbiAgICAqIDMuIOino+e7keWumuaJgOacieebuOWFs+S6i+S7tlxuICAgICpcbiAgICAqIEBldmVudFxuICAgICogQHBhcmFtICB7ZXZlbnR9IGV2ZW50XG4gICAgKi9cbiAgICBmdW5jdGlvbiB0b3VjaGNhbmNlbEhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgLy8gVE9ETzog5ZKMdG91Y2hlbmRIYW5kbGVy5aSn6YeP6YeN5aSN77yM5bu66K6uRFJZXG5cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGdlc3R1cmVzKS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50cyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBnZXN0dXJlcykge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzLnB1c2goZ2VzdHVyZXNbcF0uZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaXJlRXZlbnQoZ2V0Q29tbW9uQW5jZXN0b3IoZWxlbWVudHNbMF0sIGVsZW1lbnRzWzFdKSwgJ2R1YWx0b3VjaGVuZCcsIHtcbiAgICAgICAgICAgICAgICB0b3VjaGVzOiBzbGljZS5jYWxsKGV2ZW50LnRvdWNoZXMpLFxuICAgICAgICAgICAgICAgIHRvdWNoRXZlbnQ6IGV2ZW50XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciB0b3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzW2ldLFxuICAgICAgICAgICAgICAgIGlkID0gdG91Y2guaWRlbnRpZmllcixcbiAgICAgICAgICAgICAgICBnZXN0dXJlID0gZ2VzdHVyZXNbaWRdO1xuXG4gICAgICAgICAgICBpZiAoIWdlc3R1cmUpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGdlc3R1cmUucHJlc3NpbmdIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGdlc3R1cmUucHJlc3NpbmdIYW5kbGVyKTtcbiAgICAgICAgICAgICAgICBnZXN0dXJlLnByZXNzaW5nSGFuZGxlciA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChnZXN0dXJlLnN0YXR1cyA9PT0gJ3Bhbm5pbmcnKSB7XG4gICAgICAgICAgICAgICAgZmlyZUV2ZW50KGdlc3R1cmUuZWxlbWVudCwgJ3BhbmVuZCcsIHtcbiAgICAgICAgICAgICAgICAgICAgdG91Y2g6IHRvdWNoLFxuICAgICAgICAgICAgICAgICAgICB0b3VjaGVzOiBldmVudC50b3VjaGVzLFxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VkVG91Y2hlczogZXZlbnQuY2hhbmdlZFRvdWNoZXMsXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoRXZlbnQ6IGV2ZW50XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZ2VzdHVyZS5zdGF0dXMgPT09ICdwcmVzc2luZycpIHtcbiAgICAgICAgICAgICAgICBmaXJlRXZlbnQoZ2VzdHVyZS5lbGVtZW50LCAncHJlc3NlbmQnLCB7XG4gICAgICAgICAgICAgICAgICAgIHRvdWNoOiB0b3VjaCxcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hFdmVudDogZXZlbnRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlbGV0ZSBnZXN0dXJlc1tpZF07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoT2JqZWN0LmtleXMoZ2VzdHVyZXMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgZG9jRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdG91Y2htb3ZlSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICAgICAgZG9jRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0b3VjaGVuZEhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIGRvY0VsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdG91Y2hjYW5jZWxIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkb2NFbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdG91Y2hzdGFydEhhbmRsZXIsIGZhbHNlKTtcbn0pKHdpbmRvdyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjEuMEBnZXN0dXJlLWpzL3NyYy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnZXZlbnQtZW1pdHRlcic7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudCB7fVxuRXZlbnRFbWl0dGVyKEV2ZW50LnByb3RvdHlwZSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2V2ZW50LmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZCAgICAgICAgPSByZXF1aXJlKCdkJylcbiAgLCBjYWxsYWJsZSA9IHJlcXVpcmUoJ2VzNS1leHQvb2JqZWN0L3ZhbGlkLWNhbGxhYmxlJylcblxuICAsIGFwcGx5ID0gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LCBjYWxsID0gRnVuY3Rpb24ucHJvdG90eXBlLmNhbGxcbiAgLCBjcmVhdGUgPSBPYmplY3QuY3JlYXRlLCBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eVxuICAsIGRlZmluZVByb3BlcnRpZXMgPSBPYmplY3QuZGVmaW5lUHJvcGVydGllc1xuICAsIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxuICAsIGRlc2NyaXB0b3IgPSB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlIH1cblxuICAsIG9uLCBvbmNlLCBvZmYsIGVtaXQsIG1ldGhvZHMsIGRlc2NyaXB0b3JzLCBiYXNlO1xuXG5vbiA9IGZ1bmN0aW9uICh0eXBlLCBsaXN0ZW5lcikge1xuXHR2YXIgZGF0YTtcblxuXHRjYWxsYWJsZShsaXN0ZW5lcik7XG5cblx0aWYgKCFoYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMsICdfX2VlX18nKSkge1xuXHRcdGRhdGEgPSBkZXNjcmlwdG9yLnZhbHVlID0gY3JlYXRlKG51bGwpO1xuXHRcdGRlZmluZVByb3BlcnR5KHRoaXMsICdfX2VlX18nLCBkZXNjcmlwdG9yKTtcblx0XHRkZXNjcmlwdG9yLnZhbHVlID0gbnVsbDtcblx0fSBlbHNlIHtcblx0XHRkYXRhID0gdGhpcy5fX2VlX187XG5cdH1cblx0aWYgKCFkYXRhW3R5cGVdKSBkYXRhW3R5cGVdID0gbGlzdGVuZXI7XG5cdGVsc2UgaWYgKHR5cGVvZiBkYXRhW3R5cGVdID09PSAnb2JqZWN0JykgZGF0YVt0eXBlXS5wdXNoKGxpc3RlbmVyKTtcblx0ZWxzZSBkYXRhW3R5cGVdID0gW2RhdGFbdHlwZV0sIGxpc3RlbmVyXTtcblxuXHRyZXR1cm4gdGhpcztcbn07XG5cbm9uY2UgPSBmdW5jdGlvbiAodHlwZSwgbGlzdGVuZXIpIHtcblx0dmFyIG9uY2UsIHNlbGY7XG5cblx0Y2FsbGFibGUobGlzdGVuZXIpO1xuXHRzZWxmID0gdGhpcztcblx0b24uY2FsbCh0aGlzLCB0eXBlLCBvbmNlID0gZnVuY3Rpb24gKCkge1xuXHRcdG9mZi5jYWxsKHNlbGYsIHR5cGUsIG9uY2UpO1xuXHRcdGFwcGx5LmNhbGwobGlzdGVuZXIsIHRoaXMsIGFyZ3VtZW50cyk7XG5cdH0pO1xuXG5cdG9uY2UuX19lZU9uY2VMaXN0ZW5lcl9fID0gbGlzdGVuZXI7XG5cdHJldHVybiB0aGlzO1xufTtcblxub2ZmID0gZnVuY3Rpb24gKHR5cGUsIGxpc3RlbmVyKSB7XG5cdHZhciBkYXRhLCBsaXN0ZW5lcnMsIGNhbmRpZGF0ZSwgaTtcblxuXHRjYWxsYWJsZShsaXN0ZW5lcik7XG5cblx0aWYgKCFoYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMsICdfX2VlX18nKSkgcmV0dXJuIHRoaXM7XG5cdGRhdGEgPSB0aGlzLl9fZWVfXztcblx0aWYgKCFkYXRhW3R5cGVdKSByZXR1cm4gdGhpcztcblx0bGlzdGVuZXJzID0gZGF0YVt0eXBlXTtcblxuXHRpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ29iamVjdCcpIHtcblx0XHRmb3IgKGkgPSAwOyAoY2FuZGlkYXRlID0gbGlzdGVuZXJzW2ldKTsgKytpKSB7XG5cdFx0XHRpZiAoKGNhbmRpZGF0ZSA9PT0gbGlzdGVuZXIpIHx8XG5cdFx0XHRcdFx0KGNhbmRpZGF0ZS5fX2VlT25jZUxpc3RlbmVyX18gPT09IGxpc3RlbmVyKSkge1xuXHRcdFx0XHRpZiAobGlzdGVuZXJzLmxlbmd0aCA9PT0gMikgZGF0YVt0eXBlXSA9IGxpc3RlbmVyc1tpID8gMCA6IDFdO1xuXHRcdFx0XHRlbHNlIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdGlmICgobGlzdGVuZXJzID09PSBsaXN0ZW5lcikgfHxcblx0XHRcdFx0KGxpc3RlbmVycy5fX2VlT25jZUxpc3RlbmVyX18gPT09IGxpc3RlbmVyKSkge1xuXHRcdFx0ZGVsZXRlIGRhdGFbdHlwZV07XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG5lbWl0ID0gZnVuY3Rpb24gKHR5cGUpIHtcblx0dmFyIGksIGwsIGxpc3RlbmVyLCBsaXN0ZW5lcnMsIGFyZ3M7XG5cblx0aWYgKCFoYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMsICdfX2VlX18nKSkgcmV0dXJuO1xuXHRsaXN0ZW5lcnMgPSB0aGlzLl9fZWVfX1t0eXBlXTtcblx0aWYgKCFsaXN0ZW5lcnMpIHJldHVybjtcblxuXHRpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ29iamVjdCcpIHtcblx0XHRsID0gYXJndW1lbnRzLmxlbmd0aDtcblx0XHRhcmdzID0gbmV3IEFycmF5KGwgLSAxKTtcblx0XHRmb3IgKGkgPSAxOyBpIDwgbDsgKytpKSBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcblxuXHRcdGxpc3RlbmVycyA9IGxpc3RlbmVycy5zbGljZSgpO1xuXHRcdGZvciAoaSA9IDA7IChsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXSk7ICsraSkge1xuXHRcdFx0YXBwbHkuY2FsbChsaXN0ZW5lciwgdGhpcywgYXJncyk7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuXHRcdGNhc2UgMTpcblx0XHRcdGNhbGwuY2FsbChsaXN0ZW5lcnMsIHRoaXMpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAyOlxuXHRcdFx0Y2FsbC5jYWxsKGxpc3RlbmVycywgdGhpcywgYXJndW1lbnRzWzFdKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMzpcblx0XHRcdGNhbGwuY2FsbChsaXN0ZW5lcnMsIHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcblx0XHRcdGJyZWFrO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRsID0gYXJndW1lbnRzLmxlbmd0aDtcblx0XHRcdGFyZ3MgPSBuZXcgQXJyYXkobCAtIDEpO1xuXHRcdFx0Zm9yIChpID0gMTsgaSA8IGw7ICsraSkge1xuXHRcdFx0XHRhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdH1cblx0XHRcdGFwcGx5LmNhbGwobGlzdGVuZXJzLCB0aGlzLCBhcmdzKTtcblx0XHR9XG5cdH1cbn07XG5cbm1ldGhvZHMgPSB7XG5cdG9uOiBvbixcblx0b25jZTogb25jZSxcblx0b2ZmOiBvZmYsXG5cdGVtaXQ6IGVtaXRcbn07XG5cbmRlc2NyaXB0b3JzID0ge1xuXHRvbjogZChvbiksXG5cdG9uY2U6IGQob25jZSksXG5cdG9mZjogZChvZmYpLFxuXHRlbWl0OiBkKGVtaXQpXG59O1xuXG5iYXNlID0gZGVmaW5lUHJvcGVydGllcyh7fSwgZGVzY3JpcHRvcnMpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmdW5jdGlvbiAobykge1xuXHRyZXR1cm4gKG8gPT0gbnVsbCkgPyBjcmVhdGUoYmFzZSkgOiBkZWZpbmVQcm9wZXJ0aWVzKE9iamVjdChvKSwgZGVzY3JpcHRvcnMpO1xufTtcbmV4cG9ydHMubWV0aG9kcyA9IG1ldGhvZHM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMy40QGV2ZW50LWVtaXR0ZXIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDEwNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFzc2lnbiAgICAgICAgPSByZXF1aXJlKCdlczUtZXh0L29iamVjdC9hc3NpZ24nKVxuICAsIG5vcm1hbGl6ZU9wdHMgPSByZXF1aXJlKCdlczUtZXh0L29iamVjdC9ub3JtYWxpemUtb3B0aW9ucycpXG4gICwgaXNDYWxsYWJsZSAgICA9IHJlcXVpcmUoJ2VzNS1leHQvb2JqZWN0L2lzLWNhbGxhYmxlJylcbiAgLCBjb250YWlucyAgICAgID0gcmVxdWlyZSgnZXM1LWV4dC9zdHJpbmcvIy9jb250YWlucycpXG5cbiAgLCBkO1xuXG5kID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZHNjciwgdmFsdWUvKiwgb3B0aW9ucyovKSB7XG5cdHZhciBjLCBlLCB3LCBvcHRpb25zLCBkZXNjO1xuXHRpZiAoKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB8fCAodHlwZW9mIGRzY3IgIT09ICdzdHJpbmcnKSkge1xuXHRcdG9wdGlvbnMgPSB2YWx1ZTtcblx0XHR2YWx1ZSA9IGRzY3I7XG5cdFx0ZHNjciA9IG51bGw7XG5cdH0gZWxzZSB7XG5cdFx0b3B0aW9ucyA9IGFyZ3VtZW50c1syXTtcblx0fVxuXHRpZiAoZHNjciA9PSBudWxsKSB7XG5cdFx0YyA9IHcgPSB0cnVlO1xuXHRcdGUgPSBmYWxzZTtcblx0fSBlbHNlIHtcblx0XHRjID0gY29udGFpbnMuY2FsbChkc2NyLCAnYycpO1xuXHRcdGUgPSBjb250YWlucy5jYWxsKGRzY3IsICdlJyk7XG5cdFx0dyA9IGNvbnRhaW5zLmNhbGwoZHNjciwgJ3cnKTtcblx0fVxuXG5cdGRlc2MgPSB7IHZhbHVlOiB2YWx1ZSwgY29uZmlndXJhYmxlOiBjLCBlbnVtZXJhYmxlOiBlLCB3cml0YWJsZTogdyB9O1xuXHRyZXR1cm4gIW9wdGlvbnMgPyBkZXNjIDogYXNzaWduKG5vcm1hbGl6ZU9wdHMob3B0aW9ucyksIGRlc2MpO1xufTtcblxuZC5ncyA9IGZ1bmN0aW9uIChkc2NyLCBnZXQsIHNldC8qLCBvcHRpb25zKi8pIHtcblx0dmFyIGMsIGUsIG9wdGlvbnMsIGRlc2M7XG5cdGlmICh0eXBlb2YgZHNjciAhPT0gJ3N0cmluZycpIHtcblx0XHRvcHRpb25zID0gc2V0O1xuXHRcdHNldCA9IGdldDtcblx0XHRnZXQgPSBkc2NyO1xuXHRcdGRzY3IgPSBudWxsO1xuXHR9IGVsc2Uge1xuXHRcdG9wdGlvbnMgPSBhcmd1bWVudHNbM107XG5cdH1cblx0aWYgKGdldCA9PSBudWxsKSB7XG5cdFx0Z2V0ID0gdW5kZWZpbmVkO1xuXHR9IGVsc2UgaWYgKCFpc0NhbGxhYmxlKGdldCkpIHtcblx0XHRvcHRpb25zID0gZ2V0O1xuXHRcdGdldCA9IHNldCA9IHVuZGVmaW5lZDtcblx0fSBlbHNlIGlmIChzZXQgPT0gbnVsbCkge1xuXHRcdHNldCA9IHVuZGVmaW5lZDtcblx0fSBlbHNlIGlmICghaXNDYWxsYWJsZShzZXQpKSB7XG5cdFx0b3B0aW9ucyA9IHNldDtcblx0XHRzZXQgPSB1bmRlZmluZWQ7XG5cdH1cblx0aWYgKGRzY3IgPT0gbnVsbCkge1xuXHRcdGMgPSB0cnVlO1xuXHRcdGUgPSBmYWxzZTtcblx0fSBlbHNlIHtcblx0XHRjID0gY29udGFpbnMuY2FsbChkc2NyLCAnYycpO1xuXHRcdGUgPSBjb250YWlucy5jYWxsKGRzY3IsICdlJyk7XG5cdH1cblxuXHRkZXNjID0geyBnZXQ6IGdldCwgc2V0OiBzZXQsIGNvbmZpZ3VyYWJsZTogYywgZW51bWVyYWJsZTogZSB9O1xuXHRyZXR1cm4gIW9wdGlvbnMgPyBkZXNjIDogYXNzaWduKG5vcm1hbGl6ZU9wdHMob3B0aW9ucyksIGRlc2MpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4xLjFAZC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vaXMtaW1wbGVtZW50ZWQnKSgpXG5cdD8gT2JqZWN0LmFzc2lnblxuXHQ6IHJlcXVpcmUoJy4vc2hpbScpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjEwLjEyQGVzNS1leHQvb2JqZWN0L2Fzc2lnbi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIGFzc2lnbiA9IE9iamVjdC5hc3NpZ24sIG9iajtcblx0aWYgKHR5cGVvZiBhc3NpZ24gIT09ICdmdW5jdGlvbicpIHJldHVybiBmYWxzZTtcblx0b2JqID0geyBmb286ICdyYXonIH07XG5cdGFzc2lnbihvYmosIHsgYmFyOiAnZHdhJyB9LCB7IHRyenk6ICd0cnp5JyB9KTtcblx0cmV0dXJuIChvYmouZm9vICsgb2JqLmJhciArIG9iai50cnp5KSA9PT0gJ3JhemR3YXRyenknO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4xMC4xMkBlczUtZXh0L29iamVjdC9hc3NpZ24vaXMtaW1wbGVtZW50ZWQuanNcbi8vIG1vZHVsZSBpZCA9IDEwOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxudmFyIGtleXMgID0gcmVxdWlyZSgnLi4va2V5cycpXG4gICwgdmFsdWUgPSByZXF1aXJlKCcuLi92YWxpZC12YWx1ZScpXG5cbiAgLCBtYXggPSBNYXRoLm1heDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZGVzdCwgc3JjLyosIOKApnNyY24qLykge1xuXHR2YXIgZXJyb3IsIGksIGwgPSBtYXgoYXJndW1lbnRzLmxlbmd0aCwgMiksIGFzc2lnbjtcblx0ZGVzdCA9IE9iamVjdCh2YWx1ZShkZXN0KSk7XG5cdGFzc2lnbiA9IGZ1bmN0aW9uIChrZXkpIHtcblx0XHR0cnkgeyBkZXN0W2tleV0gPSBzcmNba2V5XTsgfSBjYXRjaCAoZSkge1xuXHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlO1xuXHRcdH1cblx0fTtcblx0Zm9yIChpID0gMTsgaSA8IGw7ICsraSkge1xuXHRcdHNyYyA9IGFyZ3VtZW50c1tpXTtcblx0XHRrZXlzKHNyYykuZm9yRWFjaChhc3NpZ24pO1xuXHR9XG5cdGlmIChlcnJvciAhPT0gdW5kZWZpbmVkKSB0aHJvdyBlcnJvcjtcblx0cmV0dXJuIGRlc3Q7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjEwLjEyQGVzNS1leHQvb2JqZWN0L2Fzc2lnbi9zaGltLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9pcy1pbXBsZW1lbnRlZCcpKClcblx0PyBPYmplY3Qua2V5c1xuXHQ6IHJlcXVpcmUoJy4vc2hpbScpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjEwLjEyQGVzNS1leHQvb2JqZWN0L2tleXMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDExMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cdHRyeSB7XG5cdFx0T2JqZWN0LmtleXMoJ3ByaW1pdGl2ZScpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlKSB7IHJldHVybiBmYWxzZTsgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4xMC4xMkBlczUtZXh0L29iamVjdC9rZXlzL2lzLWltcGxlbWVudGVkLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbnZhciBrZXlzID0gT2JqZWN0LmtleXM7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCkge1xuXHRyZXR1cm4ga2V5cyhvYmplY3QgPT0gbnVsbCA/IG9iamVjdCA6IE9iamVjdChvYmplY3QpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3Qva2V5cy9zaGltLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdGlmICh2YWx1ZSA9PSBudWxsKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHVzZSBudWxsIG9yIHVuZGVmaW5lZFwiKTtcblx0cmV0dXJuIHZhbHVlO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4xMC4xMkBlczUtZXh0L29iamVjdC92YWxpZC12YWx1ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZm9yRWFjaCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLCBjcmVhdGUgPSBPYmplY3QuY3JlYXRlO1xuXG52YXIgcHJvY2VzcyA9IGZ1bmN0aW9uIChzcmMsIG9iaikge1xuXHR2YXIga2V5O1xuXHRmb3IgKGtleSBpbiBzcmMpIG9ialtrZXldID0gc3JjW2tleV07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcHRpb25zLyosIOKApm9wdGlvbnMqLykge1xuXHR2YXIgcmVzdWx0ID0gY3JlYXRlKG51bGwpO1xuXHRmb3JFYWNoLmNhbGwoYXJndW1lbnRzLCBmdW5jdGlvbiAob3B0aW9ucykge1xuXHRcdGlmIChvcHRpb25zID09IG51bGwpIHJldHVybjtcblx0XHRwcm9jZXNzKE9iamVjdChvcHRpb25zKSwgcmVzdWx0KTtcblx0fSk7XG5cdHJldHVybiByZXN1bHQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjEwLjEyQGVzNS1leHQvb2JqZWN0L25vcm1hbGl6ZS1vcHRpb25zLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBEZXByZWNhdGVkXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nOyB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjEwLjEyQGVzNS1leHQvb2JqZWN0L2lzLWNhbGxhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9pcy1pbXBsZW1lbnRlZCcpKClcblx0PyBTdHJpbmcucHJvdG90eXBlLmNvbnRhaW5zXG5cdDogcmVxdWlyZSgnLi9zaGltJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMTAuMTJAZXM1LWV4dC9zdHJpbmcvIy9jb250YWlucy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyID0gJ3JhemR3YXRyenknO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblx0aWYgKHR5cGVvZiBzdHIuY29udGFpbnMgIT09ICdmdW5jdGlvbicpIHJldHVybiBmYWxzZTtcblx0cmV0dXJuICgoc3RyLmNvbnRhaW5zKCdkd2EnKSA9PT0gdHJ1ZSkgJiYgKHN0ci5jb250YWlucygnZm9vJykgPT09IGZhbHNlKSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjEwLjEyQGVzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvaXMtaW1wbGVtZW50ZWQuanNcbi8vIG1vZHVsZSBpZCA9IDExOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxudmFyIGluZGV4T2YgPSBTdHJpbmcucHJvdG90eXBlLmluZGV4T2Y7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNlYXJjaFN0cmluZy8qLCBwb3NpdGlvbiovKSB7XG5cdHJldHVybiBpbmRleE9mLmNhbGwodGhpcywgc2VhcmNoU3RyaW5nLCBhcmd1bWVudHNbMV0pID4gLTE7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjEwLjEyQGVzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvc2hpbS5qc1xuLy8gbW9kdWxlIGlkID0gMTE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbikge1xuXHRpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB0aHJvdyBuZXcgVHlwZUVycm9yKGZuICsgXCIgaXMgbm90IGEgZnVuY3Rpb25cIik7XG5cdHJldHVybiBmbjtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3QvdmFsaWQtY2FsbGFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDEyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImltcG9ydCAnLi9zdGFnZS5jc3MnO1xuaW1wb3J0IHtcbiAgICB3aW4sXG4gICAgZG9jLFxuICAgIFByb21pc2UsXG4gICAgcXVlcnksXG4gICAgcXVlcnlBbGwsXG4gICAgZ2V0UmVjdFxufSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHtcbiAgICBDYW52YXNSZW5kZXJcbn0gZnJvbSAnLi9jYW52YXMnO1xuaW1wb3J0IHNsaWNlQ29uZmlnIGZyb20gJy4vc2xpY2VDb25maWcnO1xuXG5jb25zdCBzbGljZVdpZHRoID0gNzUwO1xuY29uc3Qgc2xpY2VIZWlnaHQgPSAxMzM0O1xuY29uc3QgaFNsaWNlID0gOTtcbmNvbnN0IHZTbGljZSA9IDE0O1xuY29uc3Qgd2lkdGggPSBzbGljZVdpZHRoICogaFNsaWNlO1xuY29uc3QgaGVpZ2h0ID0gc2xpY2VIZWlnaHQgKiB2U2xpY2U7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YWdlIGV4dGVuZHMgQ2FudmFzUmVuZGVye1xuICAgIGNvbnN0cnVjdG9yKHZpZXdwb3J0KSB7XG4gICAgICAgIGNvbnN0IHt3aWR0aDogdncsIGhlaWdodDogdmh9ID0gZ2V0UmVjdCh2aWV3cG9ydCk7XG4gICAgICAgIGNvbnN0IHN0YWdlRWwgPSBxdWVyeSh2aWV3cG9ydCwgJyNzdGFnZScpO1xuXG4gICAgICAgIHN1cGVyKHN0YWdlRWwsIHZ3LCB2aCk7XG5cbiAgICAgICAgdGhpcy5zdGFnZUVsID0gc3RhZ2VFbDtcbiAgICAgICAgdGhpcy52dyA9IHZ3O1xuICAgICAgICB0aGlzLnZoID0gdmg7XG4gICAgICAgIHRoaXMud2lkdGggPSB2dyAqIGhTbGljZTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSB2dyAvICh3aWR0aCAvIGhTbGljZSkgKiBoZWlnaHQ7XG4gICAgICAgIHRoaXMuaFNsaWNlID0gaFNsaWNlO1xuICAgICAgICB0aGlzLnZTbGljZSA9IHZTbGljZTtcbiAgICAgICAgdGhpcy5zbGljZVdpZHRoID0gdGhpcy53aWR0aCAvIGhTbGljZTtcbiAgICAgICAgdGhpcy5zbGljZUhlaWdodCA9IHRoaXMuaGVpZ2h0IC8gdlNsaWNlO1xuICAgICAgICB0aGlzLnNsaWNlcyA9IFtdO1xuXG5cbiAgICAgICAgZm9yIChsZXQgdiA9IDA7IHYgPCB0aGlzLnZTbGljZTsgdisrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBoID0gMDsgaCA8IHRoaXMuaFNsaWNlOyBoKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHYgKiB0aGlzLmhTbGljZSArIGg7XG4gICAgICAgICAgICAgICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgICAgICAgICAgICAgICBpbmRleDogdiAqIHRoaXMuaFNsaWNlICsgaCxcbiAgICAgICAgICAgICAgICAgICAgaCxcbiAgICAgICAgICAgICAgICAgICAgdlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKHNsaWNlQ29uZmlnW1N0cmluZyhpbmRleCldKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHNsaWNlQ29uZmlnW1N0cmluZyhpbmRleCldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWdba2V5XSA9IHNsaWNlQ29uZmlnW1N0cmluZyhpbmRleCldW2tleV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNsaWNlcy5wdXNoKGNvbmZpZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgdG90YWxBbW91bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNsaWNlcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgZ2V0IHNwZWNpYWxBbW91bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNsaWNlcy5maWx0ZXIoc2xpY2UgPT5cbiAgICAgICAgICAgIHNsaWNlLnR5cGUgPT09IDNcbiAgICAgICAgKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgZ2V0IHNwZWNpYWxGb3VuZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2xpY2VzLmZpbHRlcihzbGljZSA9PlxuICAgICAgICAgICAgc2xpY2UudHlwZSA9PT0gMyAmJiBzbGljZS5mb3VuZFxuICAgICAgICApLmxlbmd0aDtcbiAgICB9XG5cbiAgICBnZXQgZm9jdXNlZEFtb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2xpY2VzLmZpbHRlcihzbGljZSA9PlxuICAgICAgICAgICAgc2xpY2UuZm9jdXNlZFxuICAgICAgICApLmxlbmd0aDtcbiAgICB9XG5cbiAgICBnZXQgaG92ZXJlZEFtb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2xpY2VzLmZpbHRlcihzbGljZSA9PlxuICAgICAgICAgICAgc2xpY2UuaG92ZXJlZFxuICAgICAgICApLmxlbmd0aDtcbiAgICB9XG5cbiAgICBnZXRTbGljZShzY3JvbGxYLCBzY3JvbGxZKSB7XG4gICAgICAgIGNvbnN0IGggPSBwYXJzZUludChzY3JvbGxYIC8gdGhpcy5zbGljZVdpZHRoKTtcbiAgICAgICAgY29uc3QgdiA9IHBhcnNlSW50KHNjcm9sbFkgLyB0aGlzLnNsaWNlSGVpZ2h0KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2xpY2VzW3YgKiB0aGlzLmhTbGljZSArIGhdO1xuICAgIH1cblxuICAgIGdldEhvdmVyU2xpY2Uoc2Nyb2xsWCwgc2Nyb2xsWSkge1xuICAgICAgICBjb25zdCBob3ZlciA9IHRoaXMuZ2V0U2xpY2Uoc2Nyb2xsWCwgc2Nyb2xsWSk7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGgsXG4gICAgICAgICAgICB2LFxuICAgICAgICAgICAgaW5kZXhcbiAgICAgICAgfSA9IGhvdmVyO1xuICAgICAgICBjb25zdCByZWxhdGVkID0gW107XG5cbiAgICAgICAgaWYgKGggPCB0aGlzLmhTbGljZSAtIDEpIHtcbiAgICAgICAgICAgIHJlbGF0ZWQucHVzaCh0aGlzLnNsaWNlc1tpbmRleCArIDFdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2IDwgdGhpcy52U2xpY2UgLSAxKSB7XG4gICAgICAgICAgICByZWxhdGVkLnB1c2godGhpcy5zbGljZXNbaW5kZXggKyB0aGlzLmhTbGljZV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGggPCB0aGlzLmhTbGljZSAtIDFcbiAgICAgICAgICAgICYmIHYgPCB0aGlzLnZTbGljZSAtIDEpIHtcbiAgICAgICAgICAgIHJlbGF0ZWQucHVzaCh0aGlzLnNsaWNlc1tpbmRleCArIHRoaXMuaFNsaWNlICsgMV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIGhvdmVyLFxuICAgICAgICAgICAgLi4ucmVsYXRlZFxuICAgICAgICBdLm1hcChzbGljZSA9PiB7XG4gICAgICAgICAgICBzbGljZS5ob3ZlcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBzbGljZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0Rm9jdXNTbGljZShjeCwgY3kpIHtcbiAgICAgICAgY29uc3QgaCA9IHBhcnNlSW50KGN4IC8gdGhpcy5zbGljZVdpZHRoKTtcbiAgICAgICAgY29uc3QgdiA9IHBhcnNlSW50KGN5IC8gdGhpcy5zbGljZUhlaWdodCk7XG4gICAgICAgIGNvbnN0IGR4ID0gcGFyc2VJbnQoY3ggJSB0aGlzLnNsaWNlV2lkdGgpO1xuICAgICAgICBjb25zdCBkeSA9IHBhcnNlSW50KGN5ICUgdGhpcy5zbGljZUhlaWdodCk7XG5cbiAgICAgICAgbGV0IHNsaWNlO1xuICAgICAgICBpZiAoZHggPiB0aGlzLnNsaWNlV2lkdGggKiAwLjI1ICYmIGR4IDwgdGhpcy5zbGljZVdpZHRoICogMC43NVxuICAgICAgICAgICAgICAgICYmIGR5ID4gdGhpcy5zbGljZUhlaWdodCAqIDAuMjUgJiYgZHkgPCB0aGlzLnNsaWNlSGVpZ2h0ICogMC43NSkge1xuICAgICAgICAgICAgc2xpY2UgPSB0aGlzLnNsaWNlc1t2ICogdGhpcy5oU2xpY2UgKyBoXTtcbiAgICAgICAgICAgIHNsaWNlLmZvY3VzZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNsaWNlO1xuICAgIH1cblxuICAgIHJlYWR5KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdGFnZUVsLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zdGFnZS5qcyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvaW5kZXguanMhLi9zdGFnZS5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjEzLjFAc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0YWdlLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vc3RhZ2UuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zdGFnZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDEyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiI3N0YWdlIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiAwO1xcbiAgICB0b3A6IDA7XFxuICAgIC13ZWJraXQtdHJhbmZvcm06IHRyYW5zbGF0ZVooOXB4KTtcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjI1LjBAY3NzLWxvYWRlciEuL3NyYy9zdGFnZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDEyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge1xuICAgIHdpbixcbiAgICBkb2MsXG4gICAgUHJvbWlzZSxcbiAgICBkZWZlcixcbiAgICBsb2FkSW1nLFxuICAgIHF1ZXJ5LFxuICAgIHF1ZXJ5QWxsLFxuICAgIGdldFJlY3Rcbn0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGNsYXNzIENhbnZhc0ltYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihjYW52YXMsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgaWYgKCEoY2FudmFzIGluc3RhbmNlb2YgSFRNTENhbnZhc0VsZW1lbnQpKSB7XG4gICAgICAgICAgICBoZWlnaHQgPSB3aWR0aDtcbiAgICAgICAgICAgIHdpZHRoID0gY2FudmFzO1xuICAgICAgICAgICAgY2FudmFzID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzIHx8IGRvYy5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLnJlbmRlciA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIHRoaXMuX2ltYWdlO1xuICAgIH1cblxuICAgIGdldCBpbWFnZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pbWFnZSkge1xuICAgICAgICAgICAgdGhpcy5faW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlLnNyYyA9IHRoaXMuY2FudmFzLnRvRGF0YVVSTCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9pbWFnZTtcbiAgICB9XG5cbiAgICBkcmF3KHBhcmFtcykge1xuICAgICAgICBjb25zdCBsb2FkZWQgPSBwYXJhbXMubWFwKHBhcmFtID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRlZmVycmVkID0gZGVmZXIoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHBhcmFtLmltZykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocGFyYW0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbS5zcmMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBbaW1nLCBwcm9taXNlXSA9IGxvYWRJbWcocGFyYW0uc3JjKTtcbiAgICAgICAgICAgICAgICBwYXJhbS5pbWcgPSBpbWc7XG4gICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKCgpID0+IGRlZmVycmVkLnJlc29sdmUocGFyYW0pKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShwYXJhbSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwobG9hZGVkKVxuICAgICAgICAgICAgLnRoZW4ocGFyYW1zID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlci5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuXG4gICAgICAgICAgICAgICAgcGFyYW1zLmZvckVhY2gocGFyYW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhcmdzID0gW3BhcmFtLmltZ107XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtLnN4ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwYXJhbS5zeCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtLnN4ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwYXJhbS5zeSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtLnN3ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwYXJhbS5zdyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtLnNoICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwYXJhbS5zaCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocGFyYW0ueCwgcGFyYW0ueSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtLndpZHRoICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwYXJhbS53aWR0aCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtLmhlaWdodCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocGFyYW0uaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXIuZHJhd0ltYWdlKC4uLmFyZ3MpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7IFxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIENhbnZhc1JlbmRlciB7XG4gICAgY29uc3RydWN0b3IoY2FudmFzLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSBuZXcgQ2FudmFzSW1hZ2UoY2FudmFzLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5fb2Zmc2NyZWVuID0gbmV3IENhbnZhc0ltYWdlKHdpZHRoLCBoZWlnaHQpOyBcbiAgICB9XG5cbiAgICBnZXQgY2FudmFzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlzaWJsZS5jYW52YXM7XG4gICAgfVxuXG4gICAgZ2V0IHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Zpc2libGUucmVuZGVyO1xuICAgIH1cblxuICAgIGdldCBpbWFnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Zpc2libGUuaW1hZ2U7XG4gICAgfVxuXG4gICAgZ2V0IG9mZnNjcmVlbkNhbnZhcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29mZnNjcmVlbi5jYW52YXM7XG4gICAgfVxuXG4gICAgZ2V0IG9mZnNjcmVlblJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29mZnNjcmVlbi5yZW5kZXI7XG4gICAgfVxuXG4gICAgZ2V0IG9mZnNjcmVlbkltYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb2Zmc2NyZWVuLmltYWdlO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2FudmFzLmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfaXNJdGVyYWJsZTIgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9pcy1pdGVyYWJsZVwiKTtcblxudmFyIF9pc0l0ZXJhYmxlMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzSXRlcmFibGUyKTtcblxudmFyIF9nZXRJdGVyYXRvcjIgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9nZXQtaXRlcmF0b3JcIik7XG5cbnZhciBfZ2V0SXRlcmF0b3IzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0SXRlcmF0b3IyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkge1xuICAgIHZhciBfYXJyID0gW107XG4gICAgdmFyIF9uID0gdHJ1ZTtcbiAgICB2YXIgX2QgPSBmYWxzZTtcbiAgICB2YXIgX2UgPSB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgX2kgPSAoMCwgX2dldEl0ZXJhdG9yMy5kZWZhdWx0KShhcnIpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kID0gdHJ1ZTtcbiAgICAgIF9lID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gX2FycjtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgICAgcmV0dXJuIGFycjtcbiAgICB9IGVsc2UgaWYgKCgwLCBfaXNJdGVyYWJsZTMuZGVmYXVsdCkoT2JqZWN0KGFycikpKSB7XG4gICAgICByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbiAgICB9XG4gIH07XG59KCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXkuanNcbi8vIG1vZHVsZSBpZCA9IDEyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9pcy1pdGVyYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gMTI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwicmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb3JlLmlzLWl0ZXJhYmxlJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vaXMtaXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDEyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBjbGFzc29mICAgPSByZXF1aXJlKCcuL19jbGFzc29mJylcbiAgLCBJVEVSQVRPUiAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuaXNJdGVyYWJsZSA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIE8gPSBPYmplY3QoaXQpO1xuICByZXR1cm4gT1tJVEVSQVRPUl0gIT09IHVuZGVmaW5lZFxuICAgIHx8ICdAQGl0ZXJhdG9yJyBpbiBPXG4gICAgfHwgSXRlcmF0b3JzLmhhc093blByb3BlcnR5KGNsYXNzb2YoTykpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDEyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3JcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGdldCAgICAgID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmdldEl0ZXJhdG9yID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgaXRlckZuID0gZ2V0KGl0KTtcbiAgaWYodHlwZW9mIGl0ZXJGbiAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICByZXR1cm4gYW5PYmplY3QoaXRlckZuLmNhbGwoaXQpKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMTMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiZXhwb3J0IGRlZmF1bHQge1xuICAgICdUWVBFJzoge1xuICAgICAgICAnc2luZ2xlJzogMSxcbiAgICAgICAgJ3N0YXRpYyc6IDIsXG4gICAgICAgICdkeW5hbWljJzogM1xuICAgIH0sXG4gICAgJzInOiB7XG4gICAgICAgIHR5cGU6IDJcbiAgICB9LFxuICAgICc4Jzoge1xuICAgICAgICB0eXBlOiAyXG4gICAgfSzCoFxuICAgICcxMCc6IHtcbiAgICAgICAgZGlzdGFuY2U6ICc1MDAw5YWJ5bm0JyxcbiAgICAgICAgdHlwZTogMlxuICAgIH0sXG4gICAgJzE4Jzoge1xuICAgICAgICBkaXN0YW5jZTogJzQ1MOWFieW5tCcsXG4gICAgICAgIHR5cGU6IDJcbiAgICB9LFxuICAgICcyMSc6IHtcbiAgICAgICAgeTE6IDEzMzQsXG4gICAgICAgIHkyOiAwLFxuICAgICAgICB0eXBlOiAzLFxuICAgICAgICBjb2luWDogNDAwLFxuICAgICAgICBjb2luWTogMTUwXG4gICAgfSxcbiAgICAnMjMnOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnMTQwMOWFieW5tCcsXG4gICAgICAgIHkxOiAxMzM0LFxuICAgICAgICB5MjogMCxcbiAgICAgICAgdHlwZTogMyxcbiAgICAgICAgY29pblg6IDQwMCxcbiAgICAgICAgY29pblk6IDE1MFxuICAgIH0sXG4gICAgJzI4Jzoge1xuICAgICAgICBkaXN0YW5jZTogJzk4MOWFieW5tCcsXG4gICAgICAgIHkxOiAxMzM0LFxuICAgICAgICB5MjogMCxcbiAgICAgICAgdHlwZTogMyxcbiAgICAgICAgY29pblg6IDQwMCxcbiAgICAgICAgY29pblk6IDE1MFxuICAgIH0sXG4gICAgJzMxJzoge1xuICAgICAgICB5MTogMTMzNCxcbiAgICAgICAgeTI6IDAsXG4gICAgICAgIHR5cGU6IDMsXG4gICAgICAgIGNvaW5YOiA0MDAsXG4gICAgICAgIGNvaW5ZOiAxNTBcbiAgICB9LFxuICAgICczNCc6IHtcbiAgICAgICAgeTE6IDEzMzQsXG4gICAgICAgIHkyOiAwLFxuICAgICAgICB0eXBlOiAzLFxuICAgICAgICBjb2luWDogNDAwLFxuICAgICAgICBjb2luWTogMTUwXG4gICAgfSxcbiAgICAnMzgnOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnNDAwMOWFieW5tCcsXG4gICAgICAgIHR5cGU6IDFcbiAgICB9LFxuICAgICc0MSc6IHtcbiAgICAgICAgeTE6IDEzMzQsXG4gICAgICAgIHkyOiAwLFxuICAgICAgICB0eXBlOiAzLFxuICAgICAgICBjb2luWDogNDAwLFxuICAgICAgICBjb2luWTogMTUwXG4gICAgfSxcbiAgICAnNDQnOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnNDAw5YWJ5bm0JyxcbiAgICAgICAgeTE6IDEzMzQsXG4gICAgICAgIHkyOiAwLFxuICAgICAgICB0eXBlOiAzLFxuICAgICAgICBjb2luWDogNDAwLFxuICAgICAgICBjb2luWTogMTUwXG4gICAgfSxcbiAgICAnNDYnOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnOC425YWJ5bm0JyxcbiAgICAgICAgeTE6IDEzMzQsXG4gICAgICAgIHkyOiAwLFxuICAgICAgICB0eXBlOiAzLFxuICAgICAgICBjb2luWDogNDAwLFxuICAgICAgICBjb2luWTogMTUwXG4gICAgfSxcbiAgICAnNDknOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnMjUuMDTlhYnlubQnLFxuICAgICAgICB0eXBlOiAyXG4gICAgfSxcbiAgICAnNTYnOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnNC4yMuWFieW5tCcsXG4gICAgICAgIHR5cGU6IDJcbiAgICB9LFxuICAgICc1OSc6IHtcbiAgICAgICAgZGlzdGFuY2U6ICcxNi435YWJ5bm0JyxcbiAgICAgICAgdHlwZTogMlxuICAgIH0sXG4gICAgJzYxJzoge1xuICAgICAgICBkaXN0YW5jZTogJzIwLjTlhYnlubQnLFxuICAgICAgICB0eXBlOiAyXG4gICAgfSxcbiAgICAnNjQnOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnMTA3LjcxMuS6v+WFrOmHjCcsXG4gICAgICAgIHR5cGU6IDJcbiAgICB9LFxuICAgICc2Nyc6IHtcbiAgICAgICAgdHlwZTogMlxuICAgIH0sXG4gICAgJzY5Jzoge1xuICAgICAgICBkaXN0YW5jZTogJzEwMS43Mjjkur/lhazph4wnLFxuICAgICAgICB5MTogMTMzNCxcbiAgICAgICAgeTI6IDAsXG4gICAgICAgIHR5cGU6IDMsXG4gICAgICAgIGNvaW5YOiA0MDAsXG4gICAgICAgIGNvaW5ZOiAxNTBcbiAgICB9LFxuICAgICc3NCc6IHtcbiAgICAgICAgZGlzdGFuY2U6ICc1OeS6v+WFrOmHjCcsXG4gICAgICAgIHkxOiAxMzM0LFxuICAgICAgICB5MjogMCxcbiAgICAgICAgdHlwZTogMyxcbiAgICAgICAgY29pblg6IDQwMCxcbiAgICAgICAgY29pblk6IDE1MFxuICAgIH0sXG4gICAgJzc2Jzoge1xuICAgICAgICB5MTogMTMzNCxcbiAgICAgICAgeTI6IDAsXG4gICAgICAgIHR5cGU6IDMsXG4gICAgICAgIGNvaW5YOiA0MDAsXG4gICAgICAgIGNvaW5ZOiAxNTBcbiAgICB9LFxuICAgICc3OSc6IHtcbiAgICAgICAgZGlzdGFuY2U6ICc0My415Lq/5YWs6YeMJyxcbiAgICAgICAgdHlwZTogMlxuICAgIH0sXG4gICAgJzgyJzoge1xuICAgICAgICBkaXN0YW5jZTogJzI3LjE55Lq/5YWs6YeMJyxcbiAgICAgICAgeTE6IDEzMzQsXG4gICAgICAgIHkyOiAwLFxuICAgICAgICB0eXBlOiAzLFxuICAgICAgICBjb2luWDogNDAwLFxuICAgICAgICBjb2luWTogMTUwXG4gICAgfSxcbiAgICAnODQnOiB7XG4gICAgICAgIHkxOiAxMzM0LFxuICAgICAgICB5MjogMCxcbiAgICAgICAgdHlwZTogMyxcbiAgICAgICAgY29pblg6IDQwMCxcbiAgICAgICAgY29pblk6IDE1MFxuICAgIH0sXG4gICAgJzg3Jzoge1xuICAgICAgICBkaXN0YW5jZTogJzEyLjjkur/lhazph4wnLFxuICAgICAgICB5MTogMTMzNCxcbiAgICAgICAgeTI6IDAsXG4gICAgICAgIHR5cGU6IDMsXG4gICAgICAgIGNvaW5YOiA0MDAsXG4gICAgICAgIGNvaW5ZOiAxNTBcbiAgICB9LFxuICAgICc5MSc6IHtcbiAgICAgICAgdHlwZTogMVxuICAgIH0sXG4gICAgJzk0Jzoge1xuICAgICAgICBkaXN0YW5jZTogJzEuNDk25Lq/5YWs6YeMJyxcbiAgICAgICAgeTE6IDEzMzQsXG4gICAgICAgIHkyOiAwLFxuICAgICAgICB0eXBlOiAzLFxuICAgICAgICBjb2luWDogNDAwLFxuICAgICAgICBjb2luWTogMTUwXG4gICAgfSxcbiAgICAnOTcnOiB7XG4gICAgICAgIHR5cGU6IDFcbiAgICB9LFxuICAgICc5OSc6IHtcbiAgICAgICAgdHlwZTogMlxuICAgIH0sXG4gICAgJzEwMic6IHtcbiAgICAgICAgZGlzdGFuY2U6ICcwLjky5Lq/5YWs6YeMJyxcbiAgICAgICAgdHlwZTogMlxuICAgIH0sXG4gICAgJzEwNSc6IHtcbiAgICAgICAgZGlzdGFuY2U6ICc2LjPkur/lhazph4wnLFxuICAgICAgICB5MTogMTMzNCxcbiAgICAgICAgeTI6IDAsXG4gICAgICAgIHR5cGU6IDMsXG4gICAgICAgIGNvaW5YOiA0MDAsXG4gICAgICAgIGNvaW5ZOiAxNTBcbiAgICB9LFxuICAgICcxMTMnOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnNDE1MOS4h+WFrOmHjCcsXG4gICAgICAgIHkxOiAxMzM0LFxuICAgICAgICB5MjogMCxcbiAgICAgICAgdHlwZTogMyxcbiAgICAgICAgY29pblg6IDQwMCxcbiAgICAgICAgY29pblk6IDE1MFxuICAgIH0sXG4gICAgJzExNSc6IHtcbiAgICAgICAgdHlwZTogMlxuICAgIH0sXG4gICAgJzExOCc6IHtcbiAgICAgICAgZGlzdGFuY2U6ICc1NTAw5LiH5YWs6YeMJyxcbiAgICAgICAgeTE6IDEzMzQsXG4gICAgICAgIHkyOiAwLFxuICAgICAgICB0eXBlOiAzLFxuICAgICAgICBjb2luWDogNDAwLFxuICAgICAgICBjb2luWTogMTUwXG4gICAgfSxcbiAgICAnMTIwJzoge1xuICAgICAgICB0eXBlOiAxXG4gICAgfSxcbiAgICAnMTIxJzoge1xuICAgICAgICBkaXN0YW5jZTogJzDlhazph4wnLFxuICAgICAgICB5MTogMTMzNCxcbiAgICAgICAgeTI6IDAsXG4gICAgICAgIHR5cGU6IDMsXG4gICAgICAgIGNvaW5YOiA0MDAsXG4gICAgICAgIGNvaW5ZOiAxNTBcbiAgICB9LFxuICAgICcxMjInOiB7XG4gICAgICAgIHR5cGU6IDFcbiAgICB9LFxuICAgICcxMjMnOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnMzguNDTlhazph4wnLFxuICAgICAgICB5MTogMTMzNCxcbiAgICAgICAgeTI6IDAsXG4gICAgICAgIHR5cGU6IDMsXG4gICAgICAgIGNvaW5YOiA0MDAsXG4gICAgICAgIGNvaW5ZOiAxNTBcbiAgICB9LFxuICAgICcxMjUnOiB7XG4gICAgICAgIHR5cGU6IDJcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NsaWNlQ29uZmlnLmpzIiwiaW1wb3J0ICcuL2hlbGxvd29ybGQuY3NzJztcbmltcG9ydCB7XG4gICAgd2luLFxuICAgIGRvYyxcbiAgICBQcm9taXNlLFxuICAgIGRlZmVyLFxuICAgIHF1ZXJ5LFxuICAgIHF1ZXJ5QWxsLFxuICAgIGdldFJlY3Rcbn0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVsbG9Xb3JsZCB7XG4gICAgY29uc3RydWN0b3Iodmlld3BvcnQsIGl0ZW1zKSB7XG4gICAgICAgIHRoaXMud3JhcEVsID0gcXVlcnkodmlld3BvcnQsICcjaGVsbG93b3JsZCcpO1xuICAgICAgICB0aGlzLndyYXBFbC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7aXRlbXNbJ2hlbGxvd29ybGQnXS5zcmN9KWA7XG4gICAgfVxuXG4gICAgcGxheSgpIHtcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSA0MDA7XG4gICAgICAgIGNvbnN0IGNvdW50ID0gNjtcblxuICAgICAgICByZXR1cm4gKHtcbiAgICAgICAgICAgIGVsYXBzZWQsXG4gICAgICAgICAgICBkZWx0YVxuICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgICBpZiAoZWxhcHNlZCA8PSBkdXJhdGlvbikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gcGFyc2VJbnQoY291bnQgKiBlbGFwc2VkIC8gZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcEVsLnN0eWxlLmJhY2tncm91bmRQb3NpdGlvblggPSBgLSR7aW5kZXggKiAxMH1yZW1gO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBFbC5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb25YID0gJzAnO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGVuZGluZygpIHtcbiAgICAgICAgdGhpcy53cmFwRWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG5cbiAgICByZWFkeSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMud3JhcEVsLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9oZWxsb1dvcmxkLmpzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL2hlbGxvd29ybGQuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLy4uL25vZGVfbW9kdWxlcy8uMC4xMy4xQHN0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvaW5kZXguanMhLi9oZWxsb3dvcmxkLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vaGVsbG93b3JsZC5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2hlbGxvd29ybGQuY3NzXG4vLyBtb2R1bGUgaWQgPSAxMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIiNoZWxsb3dvcmxkIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCBjZW50ZXI7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogNjByZW0gMTcuNzg2cmVtO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIC13ZWJraXQtdHJhbmZvcm06IHRyYW5zbGF0ZVooOTk5OXB4KTtcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjI1LjBAY3NzLWxvYWRlciEuL3NyYy9oZWxsb3dvcmxkLmNzc1xuLy8gbW9kdWxlIGlkID0gMTM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7XG4gICAgd2luLFxuICAgIGRvYyxcbiAgICBQcm9taXNlLFxuICAgIGRlZmVyLFxuICAgIGltZzJDYW52YXMsXG4gICAgcXVlcnksXG4gICAgcXVlcnlBbGwsXG4gICAgZ2V0UmVjdCxcbiAgICBnZXREaXN0YW5jZVxufSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHtcbiAgICBDYW52YXNJbWFnZVxufSBmcm9tICcuL2NhbnZhcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsb3VkIGV4dGVuZHMgQ2FudmFzSW1hZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHN0YWdlLCBpdGVtcykge1xuICAgICAgICBzdXBlcihzdGFnZS52dywgc3RhZ2UudmgpO1xuXG4gICAgICAgIHRoaXMuaFNsaWNlID0gc3RhZ2UuaFNsaWNlO1xuICAgICAgICB0aGlzLnZTbGljZSA9IHN0YWdlLnZTbGljZTtcbiAgICAgICAgdGhpcy5zbGljZVdpZHRoID0gc3RhZ2Uuc2xpY2VXaWR0aDtcbiAgICAgICAgdGhpcy5zbGljZUhlaWdodCA9IHN0YWdlLnNsaWNlSGVpZ2h0O1xuICAgICAgICB0aGlzLml0ZW1zID0gaXRlbXM7XG4gICAgfVxuXG4gICAgZHJhd0ltYWdlcyhob3ZlcnMsIGZvY3VzLCBzY3JvbGxYLCBzY3JvbGxZKSB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IFtdO1xuICAgICAgICBjb25zdCBpZHMgPSBbXTtcbiAgICAgICAgY29uc3Qgc2NhbGUgPSAwLjQ7XG5cbiAgICAgICAgY29uc3QgcHVzaFBhcmFtcyA9IGlkID0+IHtcbiAgICAgICAgICAgIGlmIChpZHMuaW5kZXhPZihpZCkgPCAwXG4gICAgICAgICAgICAgICAgICAgICYmIHRoaXMuc2xpY2VzW2lkXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICAgICAgeCxcbiAgICAgICAgICAgICAgICAgICAgeSxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzXG4gICAgICAgICAgICAgICAgfSA9IHRoaXMuc2xpY2VzW2lkXTtcblxuICAgICAgICAgICAgICAgIHBhcmFtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgeDogeCAtIHdpZHRoICogc2NhbGUgLyAyIC0gc2Nyb2xsWCxcbiAgICAgICAgICAgICAgICAgICAgeTogeSAtIGhlaWdodCAqIHNjYWxlIC8gMiAtIHNjcm9sbFksXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aCAqICgxICsgc2NhbGUpLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGhlaWdodCAqICgxICsgc2NhbGUpLFxuICAgICAgICAgICAgICAgICAgICBpbWc6IGNhbnZhc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWRzLnB1c2goaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhvdmVycykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBob3ZlciBvZiBob3ZlcnMpIHtcbiAgICAgICAgICAgICAgICBwdXNoUGFyYW1zKFN0cmluZyhob3Zlci5pbmRleCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZvY3VzKSB7XG4gICAgICAgICAgICBpZiAoZm9jdXMuaCA8IHRoaXMuaFNsaWNlIC0gMSkge1xuICAgICAgICAgICAgICAgIHB1c2hQYXJhbXMoZm9jdXMuaW5kZXggKyAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGZvY3VzLmggPiAxKSB7XG4gICAgICAgICAgICAgICAgcHVzaFBhcmFtcyhmb2N1cy5pbmRleCAtIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZm9jdXMudiA8IHRoaXMudlNsaWNlIC0gMSkge1xuICAgICAgICAgICAgICAgIHB1c2hQYXJhbXMoZm9jdXMuaW5kZXggKyB0aGlzLmhTbGljZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChmb2N1cy52ID4gMSkge1xuICAgICAgICAgICAgICAgIHB1c2hQYXJhbXMoZm9jdXMuaW5kZXggLSB0aGlzLmhTbGljZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRyYXcocGFyYW1zKTtcbiAgICB9XG5cbiAgICBjbGVhcihmb2N1cykge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBjbGVhcmVkLFxuICAgICAgICAgICAgaW5kZXhcbiAgICAgICAgfSA9IGZvY3VzO1xuXG4gICAgICAgIGNvbnN0IHNsaWNlID0gdGhpcy5zbGljZXNbU3RyaW5nKGluZGV4KV07XG5cbiAgICAgICAgaWYgKHNsaWNlKSB7XG4gICAgICAgICAgICBsZXQge1xuICAgICAgICAgICAgICAgIGltZyxcbiAgICAgICAgICAgICAgICByZW5kZXJcbiAgICAgICAgICAgIH0gPSBzbGljZTtcblxuICAgICAgICAgICAgaWYgKCFjbGVhcmVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZHVyYXRpb24gPSAyNTAwO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuICh7XG4gICAgICAgICAgICAgICAgICAgIGRlbHRhLFxuICAgICAgICAgICAgICAgICAgICBlbGFwc2VkXG4gICAgICAgICAgICAgICAgfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxhcHNlZCA8PSBkdXJhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyLmdsb2JhbEFscGhhIC09IGRlbHRhIC8gZHVyYXRpb247XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXIuZ2xvYmFsQWxwaGEgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXMuY2xlYXJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyLmNsZWFyUmVjdCgwLCAwLCB0aGlzLnNsaWNlV2lkdGgsIHRoaXMuc2xpY2VIZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICByZW5kZXIuZHJhd0ltYWdlKGltZywgMCwgMCwgdGhpcy5zbGljZVdpZHRoLCB0aGlzLnNsaWNlSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvY3VzLmNsZWFyZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVhZHkoKSB7XG4gICAgICAgIHRoaXMuc2xpY2VzID0ge307XG5cbiAgICAgICAgY29uc3QgaW1nID0gdGhpcy5pdGVtc1snY2xvdWQnXS5vYmo7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gdGhpcy5oU2xpY2UgKiB0aGlzLnZTbGljZTsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB4ID0gKGkgLSAxKSAlIHRoaXMuaFNsaWNlO1xuICAgICAgICAgICAgY29uc3QgeSA9IHBhcnNlSW50KChpIC0gMSkgLyB0aGlzLmhTbGljZSk7XG4gICAgICAgICAgICBjb25zdCBbY2FudmFzLCByZW5kZXJdID0gaW1nMkNhbnZhcyhpbWcsIHRoaXMuc2xpY2VXaWR0aCwgdGhpcy5zbGljZUhlaWdodCk7XG5cbiAgICAgICAgICAgIHRoaXMuc2xpY2VzW1N0cmluZyhpIC0gMSldID0ge1xuICAgICAgICAgICAgICAgIGltZyxcbiAgICAgICAgICAgICAgICBjYW52YXMsXG4gICAgICAgICAgICAgICAgcmVuZGVyLFxuICAgICAgICAgICAgICAgIHg6IHggKiB0aGlzLnNsaWNlV2lkdGgsXG4gICAgICAgICAgICAgICAgeTogeSAqIHRoaXMuc2xpY2VIZWlnaHQsXG4gICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMuc2xpY2VXaWR0aCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMuc2xpY2VIZWlnaHRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Nsb3VkLmpzIiwiaW1wb3J0IHtcbiAgICB3aW4sXG4gICAgZG9jLFxuICAgIFByb21pc2UsXG4gICAgZGVmZXIsXG4gICAgcXVlcnksXG4gICAgcXVlcnlBbGwsXG4gICAgZ2V0UmVjdFxufSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHtcbiAgICBDYW52YXNJbWFnZVxufSBmcm9tICcuL2NhbnZhcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXIgZXh0ZW5kcyBDYW52YXNJbWFnZSB7XG4gICAgY29uc3RydWN0b3Ioc3RhZ2UsIGl0ZW1zKSB7XG4gICAgICAgIHN1cGVyKHN0YWdlLnZ3LCBzdGFnZS52aCAqIDIpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy53aWR0aCA9IHN0YWdlLnZ3O1xuICAgICAgICB0aGlzLmhlaWdodCA9IHN0YWdlLnZoICogMjtcbiAgICAgICAgdGhpcy52dyA9IHN0YWdlLnZ3O1xuICAgICAgICB0aGlzLnZoID0gc3RhZ2Uudmg7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBpdGVtcztcbiAgICB9XG5cbiAgICByZWFkeSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZHJhdyhbe1xuICAgICAgICAgICAgaW1nOiB0aGlzLml0ZW1zWydzdGFyJ10ub2JqLFxuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICB3aWR0aDogdGhpcy53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy52aFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbWc6IHRoaXMuaXRlbXNbJ3N0YXInXS5vYmosXG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogdGhpcy52aCxcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnZoXG4gICAgICAgIH1dKTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3N0YXIuanMiLCJpbXBvcnQgJy4vZWxlbWVudHMuY3NzJztcbmltcG9ydCB7XG4gICAgd2luLFxuICAgIGRvYyxcbiAgICBQcm9taXNlLFxuICAgIGRlZmVyLFxuICAgIGRlbGF5LFxuICAgIHF1ZXJ5LFxuICAgIHF1ZXJ5QWxsLFxuICAgIGdldFJlY3QsXG4gICAgZ2V0RGlzdGFuY2UsXG4gICAgYXBwZW5kU3R5bGUsXG4gICAgcmFmLFxuICAgIGNhZlxufSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IEV2ZW50IGZyb20gJy4vZXZlbnQnO1xuaW1wb3J0IHtcbiAgICBDYW52YXNJbWFnZVxufSBmcm9tICcuL2NhbnZhcyc7XG5cbmNvbnN0IG9yaWdpblNsaWNlV2lkdGggPSA3NTA7XG5jb25zdCBvcmlnaW5TbGljZUhlaWdodCA9IDEzMzRcblxuZXhwb3J0IGNsYXNzIEVsZW1lbnRzIGV4dGVuZHMgQ2FudmFzSW1hZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHN0YWdlLCBpdGVtcykge1xuICAgICAgICBzdXBlcihzdGFnZS52dywgc3RhZ2UudmgpO1xuXG4gICAgICAgIHRoaXMuaFNsaWNlID0gc3RhZ2UuaFNsaWNlO1xuICAgICAgICB0aGlzLnZTbGljZSA9IHN0YWdlLnZTbGljZTtcbiAgICAgICAgdGhpcy5zbGljZVdpZHRoID0gc3RhZ2Uuc2xpY2VXaWR0aDtcbiAgICAgICAgdGhpcy5zbGljZUhlaWdodCA9IHN0YWdlLnNsaWNlSGVpZ2h0O1xuICAgICAgICB0aGlzLml0ZW1zID0gaXRlbXM7XG4gICAgICAgIHRoaXMuc2NhbGVSYXRpbyA9IHRoaXMuc2xpY2VXaWR0aCAvIG9yaWdpblNsaWNlV2lkdGg7XG4gICAgfVxuXG4gICAgc2hvd1RleHQoZm9jdXMpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgc2hvd24sXG4gICAgICAgICAgICBpbmRleFxuICAgICAgICB9ID0gZm9jdXM7XG5cbiAgICAgICAgY29uc3Qgc2xpY2UgPSB0aGlzLnNsaWNlc1tTdHJpbmcoaW5kZXgpXTtcbiAgICAgICAgaWYgKHNsaWNlKSB7XG4gICAgICAgICAgICBpZiAoIXNob3duKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGVsYXkgPSAxNTAwO1xuICAgICAgICAgICAgICAgIGNvbnN0IGR1cmF0aW9uID0gMTAwMDtcblxuICAgICAgICAgICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgICAgICAgICBkZWx0YSxcbiAgICAgICAgICAgICAgICAgICAgZWxhcHNlZFxuICAgICAgICAgICAgICAgIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsYXBzZWQgPD0gZGVsYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNlLnRleHRBbHBoYSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxhcHNlZCAtIGRlbGF5IDw9IGR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGljZS50ZXh0QWxwaGEgPSAoZWxhcHNlZCAtIGRlbGF5KSAvIGR1cmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2UudGV4dEFscGhhID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzLnNob3duID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm9jdXMuc2hvd247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd0dvbGQoZm9jdXMpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgZm91bmQsXG4gICAgICAgICAgICBpbmRleCxcbiAgICAgICAgICAgIHkxLFxuICAgICAgICAgICAgeTJcbiAgICAgICAgfSA9IGZvY3VzO1xuXG4gICAgICAgIGNvbnN0IHNsaWNlID0gdGhpcy5zbGljZXNbU3RyaW5nKGluZGV4KV07XG4gICAgICAgIGlmIChzbGljZSkge1xuICAgICAgICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGR1cmF0aW9uID0gMTAwMDtcblxuICAgICAgICAgICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgICAgICAgICBkZWx0YSxcbiAgICAgICAgICAgICAgICAgICAgZWxhcHNlZFxuICAgICAgICAgICAgICAgIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsYXBzZWQgPD0gZHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNlLmdvbGRZID0geTEgKyAoeTIgLSB5MSkgKiBlbGFwc2VkIC8gZHVyYXRpb247XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGljZS5nb2xkWSA9IHkyO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXMuZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvY3VzLmZvdW5kO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZseUNvaW4oZm9jdXMpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgbm9Db2luLFxuICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICBjb2luWCxcbiAgICAgICAgICAgIGNvaW5ZXG4gICAgICAgIH0gPSBmb2N1cztcblxuICAgICAgICBjb25zdCBzbGljZSA9IHRoaXMuc2xpY2VzW1N0cmluZyhpbmRleCldO1xuICAgICAgICBpZiAoc2xpY2UpIHtcbiAgICAgICAgICAgIGlmICghbm9Db2luKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29pbiA9IHNsaWNlLmNvaW47XG4gICAgICAgICAgICAgICAgY29uc3QgZHVyYXRpb24gPSA1MDA7XG4gICAgICAgICAgICAgICAgY29uc3QgZW5kWCA9IDY1MDtcbiAgICAgICAgICAgICAgICBjb25zdCBlbmRZID0gNTA7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKHtcbiAgICAgICAgICAgICAgICAgICAgZGVsdGEsXG4gICAgICAgICAgICAgICAgICAgIGVsYXBzZWRcbiAgICAgICAgICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGFwc2VkIDw9IGR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwZXJjZW50ID0gZWxhcHNlZCAvIGR1cmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29pbi54ID0gY29pblggKyAoZW5kWCAtIGNvaW5YKSAqIHBlcmNlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2luLnkgPSBjb2luWSArIChlbmRZIC0gY29pblkpICogcGVyY2VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvaW4uc2NhbGUgKz0gZGVsdGEgLyBkdXJhdGlvbiAqIDU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2luLnNsb3cgLT0gZGVsdGEgLyBkdXJhdGlvbiAqIDU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2luLnggPSBlbmRYO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29pbi55ID0gZW5kWTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzLm5vQ29pbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm9jdXMubm9Db2luO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBkcmF3SW1hZ2VzKGhvdmVycywgZm9jdXMsIHNjcm9sbFgsIHNjcm9sbFkpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gW107XG4gICAgICAgIGlmIChob3ZlcnMpIHtcbiAgICAgICAgICAgZm9yIChjb25zdCBob3ZlciBvZiBob3ZlcnMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgICAgICAgIGluZGV4LFxuICAgICAgICAgICAgICAgICAgICB5MSxcbiAgICAgICAgICAgICAgICAgICAgeTIsXG4gICAgICAgICAgICAgICAgICAgIGNvaW5YLFxuICAgICAgICAgICAgICAgICAgICBjb2luWSxcbiAgICAgICAgICAgICAgICAgICAgbm9Db2luLFxuICAgICAgICAgICAgICAgICAgICBmb3VuZFxuICAgICAgICAgICAgICAgIH0gPSBob3ZlcjtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlID0gdGhpcy5zbGljZXNbU3RyaW5nKGluZGV4KV07XG4gICAgICAgICAgICAgICAgaWYgKHNsaWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHgsXG4gICAgICAgICAgICAgICAgICAgICAgICB5LFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW52YXNJbWFnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0ltZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHRJbWcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0QWxwaGEgPSAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ29sZEltZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvaW5cbiAgICAgICAgICAgICAgICAgICAgfSA9IHNsaWNlO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhbnZhc0ltYWdlLnJlbmRlci5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPj0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzSW1hZ2UucmVuZGVyLmRyYXdJbWFnZShzdGF0aWNJbWcsIDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPj0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzSW1hZ2UucmVuZGVyLnNhdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbnZhc0ltYWdlLnJlbmRlci5nbG9iYWxBbHBoYSA9IHRleHRBbHBoYSB8fCAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzSW1hZ2UucmVuZGVyLmRyYXdJbWFnZSh0ZXh0SW1nLCAwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbnZhc0ltYWdlLnJlbmRlci5yZXN0b3JlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA+PSAzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzbGljZS5nb2xkWSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZ29sZFkgPSBzbGljZS5nb2xkWTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB5ID0gZ29sZFkgKiB0aGlzLnNjYWxlUmF0aW87XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzSW1hZ2UucmVuZGVyLmRyYXdJbWFnZShnb2xkSW1nLCAwLCBnb2xkWSwgb3JpZ2luU2xpY2VXaWR0aCwgb3JpZ2luU2xpY2VIZWlnaHQgLSBnb2xkWSwgMCwgeSwgd2lkdGgsIGhlaWdodCAtIHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jb2lucy5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgIW5vQ29pbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeCA9IGNvaW5YLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ID0gY29pbllcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ID0gY29pbjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3cgPSBzbG93IDwgMSA/IDEgOiBzbG93O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlID0gc2NhbGUgPiAxMCA/IDEwIDogc2NhbGU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2luSW1nID0gdGhpcy5jb2luc1twYXJzZUludChpbmRleCAvIHNsb3cpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29pbkltZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7d2lkdGgsIGhlaWdodH0gPSBjb2luSW1nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW52YXNJbWFnZS5yZW5kZXIuZHJhd0ltYWdlKGNvaW5JbWcsIHggKiB0aGlzLnNjYWxlUmF0aW8sIHkgKiB0aGlzLnNjYWxlUmF0aW8sIHdpZHRoIC8gc2NhbGUsIGhlaWdodCAvIHNjYWxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29pbi5pbmRleCA9IChjb2luLmluZGV4ICsgMSkgJSAodGhpcy5jb2lucy5sZW5ndGggKiBzbG93KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogeCAtIHNjcm9sbFgsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiB5IC0gc2Nyb2xsWSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgaW1nOiBjYW52YXNJbWFnZS5jYW52YXNcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kcmF3KHBhcmFtcyk7XG4gICAgfVxuXG4gICAgcmVhZHkoKSB7XG4gICAgICAgIGNvbnN0IGxvYWRlZCA9IFtdO1xuICAgICAgICB0aGlzLmNvaW5zID0gW107XG4gICAgICAgIHRoaXMuc2xpY2VzID0ge307XG5cbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5pdGVtcykuZmlsdGVyKGlkID0+XG4gICAgICAgICAgICBpZC5tYXRjaCgvXmNvaW5cXGQkLylcbiAgICAgICAgKS5mb3JFYWNoKGlkID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29pbnMucHVzaCh0aGlzLml0ZW1zW2lkXS5vYmopO1xuICAgICAgICB9KTtcblxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLml0ZW1zKS5maWx0ZXIoaWQgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGlkLm1hdGNoKC9eaVxcZCtcXC1lXFwtKHN8d3xnKS8pO1xuICAgICAgICB9KS5mb3JFYWNoKGlkID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLml0ZW1zW2lkXTtcbiAgICAgICAgICAgIGNvbnN0IFssIGluZGV4LCB0eXBlXSA9IGlkLm1hdGNoKC9eaShcXGQrKVxcLWVcXC0oc3x3fGcpJC8pO1xuXG4gICAgICAgICAgICBjb25zdCB4ID0gTnVtYmVyKGluZGV4KSAlIHRoaXMuaFNsaWNlO1xuICAgICAgICAgICAgY29uc3QgeSA9IHBhcnNlSW50KE51bWJlcihpbmRleCkgLyB0aGlzLmhTbGljZSk7XG4gICAgICAgICAgICBsZXQgc2xpY2UgPSB0aGlzLnNsaWNlc1tTdHJpbmcoaW5kZXgpXTtcbiAgICAgICAgICAgIGlmICghc2xpY2UpIHtcbiAgICAgICAgICAgICAgICBzbGljZSA9IHRoaXMuc2xpY2VzW1N0cmluZyhpbmRleCldID0ge1xuICAgICAgICAgICAgICAgICAgICBjb2luOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsb3c6IDgsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FsZTogM1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBjYW52YXNJbWFnZTogbmV3IENhbnZhc0ltYWdlKHRoaXMuc2xpY2VXaWR0aCwgdGhpcy5zbGljZUhlaWdodCksXG4gICAgICAgICAgICAgICAgICAgIHg6IHggKiB0aGlzLnNsaWNlV2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIHk6IHkgKiB0aGlzLnNsaWNlSGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy5zbGljZVdpZHRoLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMuc2xpY2VIZWlnaHQsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3MnKSB7XG4gICAgICAgICAgICAgICAgc2xpY2Uuc3RhdGljSW1nID0gaXRlbS5vYmo7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd3Jykge1xuICAgICAgICAgICAgICAgIHNsaWNlLnRleHRJbWcgPSBpdGVtLm9iajtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2cnKSB7XG4gICAgICAgICAgICAgICAgc2xpY2UuZ29sZEltZyA9IGl0ZW0ub2JqO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwobG9hZGVkKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBFbGVtZW50Q291bnQgZXh0ZW5kcyBFdmVudCB7XG4gICAgY29uc3RydWN0b3Iodmlld3BvcnQsIGl0ZW1zKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy53cmFwRWwgPSBxdWVyeSh2aWV3cG9ydCwgJyNlbGVtZW50cy1jb3VudCcpO1xuICAgICAgICB0aGlzLnRleHRFbCA9IHF1ZXJ5KHRoaXMud3JhcEVsLCAnLnRleHQnKTtcbiAgICAgICAgdGhpcy50ZXh0TnVtYmVyRWwgPSBxdWVyeSh0aGlzLnRleHRFbCwgJy5udW1iZXInKTtcbiAgICAgICAgdGhpcy50ZXh0VGlwRWwgPSBxdWVyeSh0aGlzLnRleHRFbCwgJy50aXAnKTtcbiAgICAgICAgdGhpcy50ZXh0QmdFbCA9IHF1ZXJ5KHRoaXMudGV4dEVsLCAnLmJnJyk7XG4gICAgICAgIHRoaXMuYmFyRWwgPSBxdWVyeSh0aGlzLndyYXBFbCwgJy5wcm9ncmVzcyAuYmFyJyk7XG4gICAgICAgIHRoaXMudGlwc0VsID0gcXVlcnkodGhpcy53cmFwRWwsICcudGlwcycpOyBcblxuICAgICAgICB0aGlzLmZvdW5kID0gMDtcbiAgICAgICAgdGhpcy5hbW91bnQgPSAwO1xuICAgICAgICB0aGlzLnRvdGFsID0gMDtcbiAgICAgICAgdGhpcy5mb2N1cyA9IDA7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBpdGVtcztcbiAgICB9XG5cbiAgICB1cGRhdGUoYW1vdW50LCBmb3VuZCwgdG90YWwsIGZvY3VzKSB7XG4gICAgICAgIGlmIChmb3VuZCAhPT0gdGhpcy5mb3VuZCBcbiAgICAgICAgICAgIHx8IGFtb3VudCAhPT0gdGhpcy5hbW91bnRcbiAgICAgICAgICAgIHx8IHRvdGFsICE9PSB0aGlzLnRvdGFsXG4gICAgICAgICAgICB8fCBmb2N1cyAhPT0gdGhpcy5mb2N1cykge1xuICAgICAgICAgICAgdGhpcy50ZXh0TnVtYmVyRWwudGV4dENvbnRlbnQgPSBgJHtmb3VuZH0vJHthbW91bnR9YDtcbiAgICAgICAgICAgIHRoaXMuYmFyRWwuc3R5bGUud2lkdGggPSBgJHtmb3VuZC9hbW91bnQqMTAwfSVgO1xuXG4gICAgICAgICAgICBpZiAoZm91bmQgIT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ3VwZGF0ZScsIHtcbiAgICAgICAgICAgICAgICAgICAgZm91bmQsXG4gICAgICAgICAgICAgICAgICAgIGFtb3VudCxcbiAgICAgICAgICAgICAgICAgICAgdG90YWwsXG4gICAgICAgICAgICAgICAgICAgIGZvY3VzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZm91bmQgPSBmb3VuZDtcbiAgICAgICAgICAgIHRoaXMuYW1vdW50ID0gYW1vdW50O1xuICAgICAgICAgICAgdGhpcy50b3RhbCA9IHRvdGFsO1xuICAgICAgICAgICAgdGhpcy5mb2N1cyA9IGZvY3VzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvdyh7XG4gICAgICAgIHRpcCxcbiAgICAgICAgYmdUeXBlXG4gICAgfSkge1xuICAgICAgICBjb25zdCBpdGVtcyA9IHRoaXMuaXRlbXM7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMudGV4dFRpcEVsLmlubmVySFRNTCA9IHRpcDtcbiAgICAgICAgICAgIHRoaXMudGV4dEJnRWwuY2xhc3NOYW1lID0gYGJnIGJnJHtiZ1R5cGV9YDtcbiAgICAgICAgICAgIHRoaXMudGV4dEJnRWwuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXG4gICAgICAgICAgICAgICAgYHVybCgke2l0ZW1zWyd0aXBCZycgKyBiZ1R5cGVdLnNyY30pYDtcbiAgICAgICAgICAgIHRoaXMud3JhcEVsLmNsYXNzTmFtZSA9ICdvcGVuJztcblxuICAgICAgICAgICAgZGVsYXkoNDAwKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0VGlwRWwuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHRCZ0VsLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlbGF5KDMwMDApO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHRUaXBFbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHRCZ0VsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud3JhcEVsLmNsYXNzTmFtZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVsYXkoNDAwKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlYWR5KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy53cmFwRWwuc3R5bGUuZGlzcGxheSA9ICcnO1xuXG4gICAgICAgICAgICBsZXQga2V5ZnJhbWVzID0gJyc7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLml0ZW1zKS5maWx0ZXIoaWQgPT5cbiAgICAgICAgICAgICAgICBpZC5tYXRjaCgvXmNvaW5cXGQkLylcbiAgICAgICAgICAgICkuZm9yRWFjaCgoaWQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5pdGVtc1tpZF07XG4gICAgICAgICAgICAgICAga2V5ZnJhbWVzICs9IGBcbiAgICAgICAgICAgICAgICAgICAgJHsxIC8gNiAqIGkgKiAxMDB9JSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtpdGVtLnNyY30pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYDtcblxuICAgICAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGtleWZyYW1lcyArPSBgXG4gICAgICAgICAgICAgICAgICAgICAgICAxMDAlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtpdGVtLnNyY30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBgOyAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGFwcGVuZFN0eWxlKGBcbiAgICAgICAgICAgICAgICBALXdlYmtpdC1rZXlmcmFtZXMgY29pbiB7XG4gICAgICAgICAgICAgICAgICAgICR7a2V5ZnJhbWVzfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGApO1xuXG4gICAgICAgICAgICB0aGlzLnRpcHNFbC5zdHlsZS53ZWJraXRBbmltYXRpb24gPSAnY29pbiAxcyBsaW5lYXIgMHMgaW5maW5pdGUnO1xuXG4gICAgICAgICAgICByZXNvbHZlKHRoaXMpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2VsZW1lbnRzLmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmtleXM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXMuanNcbi8vIG1vZHVsZSBpZCA9IDE0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIDE5LjEuMi4xNCBPYmplY3Qua2V5cyhPKVxudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCAka2V5cyAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgna2V5cycsIGZ1bmN0aW9uKCl7XG4gIHJldHVybiBmdW5jdGlvbiBrZXlzKGl0KXtcbiAgICByZXR1cm4gJGtleXModG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vZWxlbWVudHMuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLy4uL25vZGVfbW9kdWxlcy8uMC4xMy4xQHN0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvaW5kZXguanMhLi9lbGVtZW50cy5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL2VsZW1lbnRzLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZWxlbWVudHMuY3NzXG4vLyBtb2R1bGUgaWQgPSAxNDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIiNlbGVtZW50cy1jb3VudCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgcmlnaHQ6IDAuNzNyZW07XFxuICAgIHRvcDogMC40cmVtO1xcbiAgICBjb2xvcjogIzAwZGRmMTtcXG4gICAgZm9udC1zaXplOiAxMnB4O1xcbiAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gICAgLXdlYmtpdC1ib3gtcGFjazogY2VudGVyO1xcbiAgICAtd2Via2l0LWJveC1hbGlnbjogY2VudGVyO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIGNlbnRlcjtcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxLjEwNnJlbSAwLjQxM3JlbTtcXG59XFxuXFxuI2VsZW1lbnRzLWNvdW50IC50ZXh0V3JhcCB7XFxuICAgIHdpZHRoOiAxLjEwNnJlbTtcXG4gICAgaGVpZ2h0OiAwLjQxM3JlbTtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBMEFBQUFmQ0FZQUFBQTg5VWZzQUFBQUdYUkZXSFJUYjJaMGQyRnlaUUJCWkc5aVpTQkpiV0ZuWlZKbFlXUjVjY2xsUEFBQUFOZEpSRUZVZU5xY2xEMExnVkVZaG8rUDhscU1Nc3JNcmt4a05DbjhMWU1mUVRFWVNCYVRVaklaUmNsaVVhUU01T04rNm8xRmJ5NTNYWjA2ZFhXK252T0UzUHJVZE03RjNTY3RzWFFCQ1grWnE0c29sWktpU0NWTFJTU281SWtxbFN4NWthRlNTRFQ4OFdmSmt2WlhSSkx6eitaUktlSGZKcElzSlpHaVVrVFVxR1RKaWh5VjNuVkpKYXZMTXBVc2hmQWZXeHlhRUFQQ1ZzeklLay9SdHBGSWM3RWhWMzRWUGZxNEkzRWswa0dNYWNIYXRtNUVXb2tGK1lRUDBhRTlZaXAyUkxxSVBtMWhBM0VtMGw1TWFGdnVpbnVROUJKZ0FGcU5JaFVQaFpPRUFBQUFBRWxGVGtTdVFtQ0MpO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiByaWdodCBjZW50ZXI7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogMC4xNzNyZW0gMC40MTNyZW07XFxuICAgIG92ZXJmbG93OiB2aXNpYmxlO1xcbn1cXG5cXG4jZWxlbWVudHMtY291bnQgLnRleHQge1xcbiAgICB3aWR0aDogMS4zcmVtO1xcbiAgICBoZWlnaHQ6IDAuNXJlbTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjMDBkZGYxO1xcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIHJpZ2h0OiAwLjE3cmVtO1xcbiAgICB0b3A6IC0wLjE4cmVtO1xcbiAgICBib3gtc2hhZG93OiAycHggM3B4IDBweCByZ2JhKDAsIDIyMSwgMjQxLCAwLjUpO1xcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjRzIGVhc2UtaW4gMHM7XFxuICAgIG92ZXJmbG93OiB2aXNpYmxlO1xcbn1cXG5cXG4jZWxlbWVudHMtY291bnQub3BlbiAudGV4dCB7XFxuICAgIHdpZHRoOiA1LjhyZW07XFxuICAgIGhlaWdodDogMi4zcmVtO1xcbiAgICBib3gtc2hhZG93OiBub25lO1xcbn1cXG5cXG4jZWxlbWVudHMtY291bnQgLnRleHQgLm51bWJlciB7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICB3aWR0aDogMS4zcmVtO1xcbiAgICBoZWlnaHQ6IDAuNXJlbTtcXG4gICAgbGluZS1oZWlnaHQ6IDAuNXJlbTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4jZWxlbWVudHMtY291bnQgLnRleHQgLnRpcCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDMuMzA2cmVtO1xcbiAgICBoZWlnaHQ6IDEuMjRyZW07XFxuICAgIGxpbmUtaGVpZ2h0OiAxLjJlbTtcXG4gICAgbGVmdDogMC4ycmVtO1xcbiAgICB0b3A6IDAuMzZyZW07XFxuICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgY29sb3I6ICMwMGRkZjE7XFxufVxcblxcbiNlbGVtZW50cy1jb3VudCAudGV4dCAuYmcge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxlZnQ6IDMuNTA2cmVtO1xcbiAgICB0b3A6IDAuMzZyZW07XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMDtcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xcbn1cXG5cXG4jZWxlbWVudHMtY291bnQgLnRleHQgLmJnLmJnMSB7XFxuICAgIHdpZHRoOiAyLjA2NnJlbTtcXG4gICAgaGVpZ2h0OiAxLjhyZW07XFxufVxcblxcbiNlbGVtZW50cy1jb3VudCAudGV4dCAuYmcuYmcyIHtcXG4gICAgd2lkdGg6IDIuMjUzcmVtO1xcbiAgICBoZWlnaHQ6IDEuOTQ2cmVtO1xcbn1cXG5cXG4jZWxlbWVudHMtY291bnQgLnRleHQgLmJnLmJnMyB7XFxuICAgIHdpZHRoOiAyLjM0NnJlbTtcXG4gICAgaGVpZ2h0OiAxLjkzM3JlbTtcXG59XFxuXFxuI2VsZW1lbnRzLWNvdW50IC5wcm9ncmVzcyB7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIHdpZHRoOiAxLjhyZW07XFxuICAgIGhlaWdodDogMC4zcmVtO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjMDBkZGYxO1xcbiAgICBib3JkZXItcmFkaXVzOiAwLjE1cmVtO1xcbiAgICBtYXJnaW46IDAgNHB4O1xcbn1cXG5cXG4jZWxlbWVudHMtY291bnQgLnByb2dyZXNzIC5iYXJ7XFxuICAgIHdpZHRoOiAwO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMGRkZjE7XFxuICAgIGJvcmRlci1yYWRpdXM6IDAuMTVyZW07XFxufVxcblxcbiNlbGVtZW50cy1jb3VudCAudGlwcyB7XFxuICAgIHdpZHRoOiAwLjY2N3JlbTtcXG4gICAgaGVpZ2h0OiAwLjY0cmVtO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxufVxcbi8qXFxuQC13ZWJraXQta2V5ZnJhbWVzIGNvaW4ge1xcbiAgICAwJSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoYXNzZXRzLzJ4L2dhbWUvY29pbi0xLnBuZyk7XFxuICAgIH1cXG5cXG4gICAgMTYuNiUge1xcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGFzc2V0cy8yeC9nYW1lL2NvaW4tMi5wbmcpO1xcbiAgICB9XFxuXFxuICAgIDMzLjMlIHtcXG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChhc3NldHMvMngvZ2FtZS9jb2luLTMucG5nKTtcXG4gICAgfSBcXG5cXG4gICAgNTAlIHtcXG4gICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChhc3NldHMvMngvZ2FtZS9jb2luLTQucG5nKTtcXG4gICAgfSBcXG5cXG4gICAgNjYuNiUge1xcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGFzc2V0cy8yeC9nYW1lL2NvaW4tNS5wbmcpO1xcbiAgICB9IFxcblxcbiAgICA4My4zJSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoYXNzZXRzLzJ4L2dhbWUvY29pbi02LnBuZyk7XFxuICAgIH0gXFxuXFxuICAgIDEwMCUge1xcbiAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGFzc2V0cy8yeC9nYW1lL2NvaW4tMS5wbmcpO1xcbiAgICB9IFxcbn0qL1wiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4yNS4wQGNzcy1sb2FkZXIhLi9zcmMvZWxlbWVudHMuY3NzXG4vLyBtb2R1bGUgaWQgPSAxNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICcuL21hcC5jc3MnO1xuaW1wb3J0IHtcbiAgICB3aW4sXG4gICAgZG9jLFxuICAgIFByb21pc2UsXG4gICAgcXVlcnksXG4gICAgcXVlcnlBbGwsXG4gICAgZ2V0UmVjdFxufSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IEV2ZW50IGZyb20gJy4vZXZlbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXAgZXh0ZW5kcyBFdmVudCB7XG4gICAgY29uc3RydWN0b3Iodmlld3BvcnQsIGhTbGljZSwgdlNsaWNlKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy52aWV3cG9ydCA9IHF1ZXJ5KHZpZXdwb3J0LCAnI3N0YWdlLW1hcCcpO1xuICAgICAgICB0aGlzLndyYXBFbCA9IHF1ZXJ5KHRoaXMudmlld3BvcnQsICcud3JhcCcpO1xuICAgICAgICB0aGlzLmNhbnZhc0VsID0gcXVlcnkodGhpcy52aWV3cG9ydCwgJ2NhbnZhcycpO1xuICAgICAgICB0aGlzLnJlbmRlciA9IHRoaXMuY2FudmFzRWwuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgdGhpcy5pbmRpY2F0b3JFbCA9IHF1ZXJ5KHRoaXMudmlld3BvcnQsICcuaW5kaWNhdG9yJyk7XG4gICAgICAgIHRoaXMudGV4dEVsID0gcXVlcnkodGhpcy52aWV3cG9ydCwgJy50ZXh0IGInKTtcbiAgICAgICAgdGhpcy5oU2xpY2UgPSBoU2xpY2U7XG4gICAgICAgIHRoaXMudlNsaWNlID0gdlNsaWNlO1xuICAgICAgICB0aGlzLm9wZW5lZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHRleHQoc3RyKSB7XG4gICAgICAgIHRoaXMudGV4dEVsLnRleHRDb250ZW50ID0gc3RyO1xuICAgIH1cblxuICAgIHVwZGF0ZSh4cCwgeXApIHtcbiAgICAgICAgY29uc3Qge3dpZHRoOiBjV2lkdGgsIGhlaWdodDogY0hlaWdodH0gPSBnZXRSZWN0KHRoaXMuY2FudmFzRWwpO1xuICAgICAgICBjb25zdCB7d2lkdGg6IGlXaWR0aCwgaGVpZ2h0OiBpSGVpZ2h0fSA9IGdldFJlY3QodGhpcy5pbmRpY2F0b3JFbCk7XG4gICAgICAgIGNvbnN0IHtzbGljZVdpZHRoOiBzV2lkdGgsIHNsaWNlSGVpZ2h0OiBzSGVpZ2h0fSA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5pbmRpY2F0b3JFbC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBcbiAgICAgICAgICAgIGB0cmFuc2xhdGUzZCgke2NXaWR0aCAqIHhwICsgc1dpZHRoIC8gMiAtIGlXaWR0aCAvIDJ9cHgsICR7Y0hlaWdodCAqIHlwICsgc0hlaWdodCAvIDIgLSBpSGVpZ2h0IC8gMn1weCwgMClgO1xuICAgIH1cblxuICAgIGNsZWFyKHhwLCB5cCkge1xuICAgICAgICBjb25zdCB7d2lkdGg6IGNXaWR0aCwgaGVpZ2h0OiBjSGVpZ2h0fSA9IGdldFJlY3QodGhpcy5jYW52YXNFbCk7XG4gICAgICAgIGNvbnN0IHtzbGljZVdpZHRoOiBzV2lkdGgsIHNsaWNlSGVpZ2h0OiBzSGVpZ2h0fSA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5yZW5kZXIuZmlsbFJlY3QoY1dpZHRoICogeHAsIGNIZWlnaHQgKiB5cCwgc1dpZHRoLCBzSGVpZ2h0KTtcbiAgICB9XG5cbiAgICByZWFkeSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMudmlld3BvcnQuc3R5bGUuZGlzcGxheSA9ICcnO1xuXG4gICAgICAgICAgICBjb25zdCB7d2lkdGgsIGhlaWdodH0gPSBnZXRSZWN0KHRoaXMuY2FudmFzRWwpO1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLnNsaWNlV2lkdGggPSB3aWR0aCAvIHRoaXMuaFNsaWNlO1xuICAgICAgICAgICAgdGhpcy5zbGljZUhlaWdodCA9IGhlaWdodCAvIHRoaXMudlNsaWNlO1xuXG4gICAgICAgICAgICB0aGlzLmNhbnZhc0VsLndpZHRoID0gd2lkdGg7XG4gICAgICAgICAgICB0aGlzLmNhbnZhc0VsLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyLmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyLmZpbGxTdHlsZSA9ICcjMDE2ZmEwJztcbiAgICAgICAgICAgIHRoaXMucmVuZGVyLmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIuZmlsbFN0eWxlID0gJ3JnYmEoMCwgMCwgMCwgMSknO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ2Rlc3RpbmF0aW9uLW91dCc7XG5cbiAgICAgICAgICAgIHJlc29sdmUodGhpcyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFwLmpzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL21hcC5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjEzLjFAc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL21hcC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL21hcC5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21hcC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDE0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiI3N0YWdlLW1hcCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGVmdDogMC41cmVtO1xcbiAgICBib3R0b206IDAuNXJlbTtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMC40cmVtIDAuN3JlbTtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxLjA5cmVtIDAuODUzcmVtO1xcbiAgICBoZWlnaHQ6IDg0cHg7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDk5OXB4KTtcXG4gICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICAgIC13ZWJraXQtYm94LXBhY2s6IGNlbnRlcjtcXG4gICAgLXdlYmtpdC1ib3gtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuI3N0YWdlLW1hcCAud3JhcCB7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICMwMTZmYTA7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIHdpZHRoOiAzMC4zcHg7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuI3N0YWdlLW1hcCAubWFwIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG59XFxuXFxuI3N0YWdlLW1hcCAuaW5kaWNhdG9yIHtcXG4gICAgbGVmdDogMDtcXG4gICAgdG9wOiAwO1xcbiAgICB3aWR0aDogNHB4O1xcbiAgICBoZWlnaHQ6IDRweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig1MCwgNTAsIDUwKTtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgLXdlYmtpdC1hbmltYXRpb246IGZsYXNoIDAuNHMgbGluZWFyIDBzIGluZmluaXRlIGFsdGVybmF0ZTtcXG59XFxuXFxuXFxuI3N0YWdlLW1hcCAudGV4dCB7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUVJQUFBQkNDQVlBQUFEalZBRG9BQUFBR1hSRldIUlRiMlowZDJGeVpRQkJaRzlpWlNCSmJXRm5aVkpsWVdSNWNjbGxQQUFBQ1NGSlJFRlVlTnJrbkFsc0ZWVVVocWV2WTF0cUJZcFNLQXEyZ0tBc0xvamloZ3FJaXRHRWFCUVZneUZ1VVZHaUF1NUtYTmhSTkM2NGdIR1BnUWpFRFJBVXdTS0NJTkFxaTRCS1ZaQkZiQzJDRklybnBOL283V1RlNjh4Nzg4b3JuT1JQZWRONXc3M25udnVmLzV5WmFacTF2c3lxQThzVzVBb2FDbklFRFFTWkFodW83UVY3Qkg4TEtnVGxnaDE4VHFxbEpja1JhWUtqQkMwRWVZS3NCSyszVzdCRjhKdGdtMkIvcWp0Q0oxd29PSnBWVDRhcFUzNFIvQ1RZbFdxT09GelFWbkNNSUdMVmpWWGhrSFdDblFmYUVicS8yd2xhc3gwT2hPazIyU0JZQzhmVXVTT2FDenFIc1AvRDNESWxnazExNVloMFFTZEJLeXMxYlNNTzJaZE1SeWdCbms0YVRHWFR0THM0Q0prR2NZUk92bHNLYlFVL1crVnJuQkthSXhvTHpoQWNadFV2cThRWk8ybzdNZUl6RXVxakV5ekczTTNQVnE3TkVWbGNxRDQ2d2UyTXJIZ2RrVjdQT01IUGdxYkg0NGhPOVNBN0JMR0d6Q21RSTVxbnNFNUl4Rm94TjErT3NGR01CNnQxTmtyL0dwTjJXN3NrODBLR29MMmdRSkJQcjhLbWNLcWcxRjdGejJUeGhjN3grMWc2UXF2SUhra29vUFI2WFFRWENFNWp3dXZwTWZ3TmllVlF2cmRoc0Q4TFBoVE1DU3FYZlJacW41dFZxOXNSSnlXQkcvU2FBeUdyV1lJdkJiOXkvQ1JrOEZMQnRSUk12MUZlbnljNG45cGhqR0F6RHMybjNHOG1hRVNFN2NTcHkvMklKNk1tV2VIbENLMGplb2JZVDlCVnZZWGE1QTFDc1Jjcm9STVp4c1NHQy9xUTNpd0d0d2dSTjF2UVFYQzI0RWNpNWdmS2JuVmFHZW94aTYxMnBtQ040RFdyOWk2VzlqTStjK29SYzlJRklUcEIyM1JqcmVvKzVXQW1ycCtYc1pKRGNNSnl0a2szNDdzNitkNUV5MUFXYUFST09GSXdUekNGeUNvV3JPWTYwd1gzRWhFWCtSaGpoRG5YeUJyNnMyV0lUaGpEeWs0VVBFcVlQMFJZM3c4bjZFcThLTGpkK081bUp0TGFReGxPZ1ZmdUU1d1M0LytmQmhuNnNaYU9EeUxHNERORDJnNlBDUlpDZEU4SVNwbDhieWJ0cUR0MXdtVldkWS9Uc2RjRlY3dXV1WlR0cGQvOUZoSWRSbVJGczhOOWpqZVRLUHZQRWZraFJjTWc5dTViOE0zRGdxOEk3VDdHZWUrU0pTNTFUVmozN1luR01jMG92eHZSMms4d2xaYmNYVkd5VzI3QTJxaUY2WWltSVRpaEsvdDZnbFY5YjBJSjdSNzJlYTV4M3R1Q2Z3UTNHOGYrRkV3VzNPcTY1Z3pCSmE1alNwclBRS0k5UGNaeENVNzFhMDBkUVpWdEpkNTZUeU5GdmlrNFFYQ2poNVRWK3hIdnNkKzdHc2ZWYVNNRk45SDNjT3dQd1VyWFZxa2dTcXJJTFAwRlgxai9OMjN6MEVHREFuYmRzbTNYYXNWclRyOWl2dUFWOHZ0K3lHOFZxVE9meVdhNG5QQTRhZlZrMXpWZkVOemdDdjhsU09RQmd0R0M4WUp6U1lNUk10UTdkS2VDV0s0ZFVvV3BFNW1KZDhkQW1ucnRZOW56WG1xMWpITXY0UGVtVFVWaHRuVWQxOVI2T1N2ZkFnZGZqQ091RVd6bjM0RXJVeHZTU3JSMjBIVDJFaXZTeGNkM2lnVHZFeUhIdTM2M0VHM3dvT3Y0YXJaTFZ5TUtGeURhcnFMRUhoN25ISExzRVBpaFBmdi9Ed2dzVnYrd0NBSnN5NWJJZHAyekdHRTAzQlZCdXMxZUZseG5IRzhOOFZxazEwY2c0WGlzZ2UzYXMvSFcrT3RKY1Y1VnEwcml1U2hCalp5N280ZzNyVU0rUVlka2U0Z2tqZHp1eHJGRzFDUmxPQ0dSTythWmRxejJWWUQwczhrUkprVEhhdVQwTXJpaUYybjFLSS92NzZNMldJdmVjRHZoT3h6eHRIRnNOeW5VNFpxY0JCMWgyMUY2RW9IQ0N0RlR6RjZ0SW14VlV6eFFpOXpWS3ZRcG9tcUV4MWhLSWRRaGhoUFY2YU9NMHZ3dkhMRWxVVWNrWXRtUTFPOFVNRm9ITlBGUnZPMkRLNmFSQ250N25MT1pPcVUvVHJXb1hEV2ozRUVkVXhDU0lxNnlFU1B4OEVRbXBIWTAyajR6U3VpN1M5LzU1UHBDb3NGTDFhNkRURlZNWFVpL1lTSmpIVTNhekNEMUg1RUFTZjYzTUhhYzNSOWw3anVKaUJtSXBma3h6dC9NYXM3aFhFMnpIV09rMW9uSTdiT29WYlFZdXhLdTJZTWNIMFRLemtNL0pHSjdiUzRjTklWZWhsNjRtLzA5RUFaZlNtVG9DbTZsVWl5aDVENlRVcnd3Mm1BZ3pTVkVXaU80b0pJcTFvbTJ5Y2o0TnFUVmlqaVVwTnYyMkF5eVVZQXY2VmE0bmhEZHhLVHo0WVlYcURFeVdLa0NsRjl0RDVKc0lDdTBnUncvSWNLVUg4NHh6dnVNUHNkVE5HTTZ1NXV3Y2RvdTJ3cisyTTBBd25VeG44c3Bqcm96cUNjRFhLc012aWpCdWR1SkdwWGR6N3JLNlc5cCtUMUJCTTlGYnM4TXdSRVZFUWJqMS9LTUhxUnBuN0x5S3A2KzhYR2RUU2pGb1pDbDFocVQyRTRhRVgxZFRsaUNEbm1BdGw4cFNyYVFLalJSSzdjRGRIMmRuc01LajV4ZGhQenRBWUdkNk1wRSsrR0w1ZFFTR29YYTFqOVY4QUhSTkNwS0pUeWJSczdEUmhFMkNjMHlNd1IrVU50aG84aDIrU1RNSTFsMUwxMHdtWGJhYmJUUzhpRGlIYlRvbStPZ0xqUlg1dEMxZW80VTZFV2VrOWcybzdtZUUzMFIrT0g1TVBoQmZlQUlxcTJXdi9zWjJ6MnFSY2NXa2U0R3d4T0ZwTHRjb3hVM0Z4WFloMVpiVmd6Rk9ZNXJqRFA2cWF0cDdvd25wWWJ4Yk9UV2FqMVFmVjhqejlWU2oyWkhzQXB6VVlYbEhpTEw2V0MvVGR0c0dWdmhETGJPY2JVb1RyM3V4NlJrczhoYVMyUThpSklkR1pLcTFDZHF0amlPaU1EVWZqclpMWkc0N1ZtNVA0MXFzSm5CRGRQUkJWZVFhV0xtY1FUWGRIaWpuMnU3ektNTmVDOTg4MUFJYXRMaUdycEZxOHc3WFIzSTQzNnRKZWMzaGwvK2dXOUtjYzRnUGsrQUd3WWErOXdaeENwUzhVcklzeTk2eEZTa2s4a1F3NGlFSjYzd0hsSmZ4eGlTZXNzdm5TWnVkOUx0UEp5ZFJ0YXBwRTk1T2xHUWJwQmtDZHV2R0dtdG5QSVJFYlkzcFBIVnVPVlhGemVCZXlESkcxczFid0kzSXgwMnhQazdpWUNOS05IendTOW9qdTlESGxmVW04Q1dsZHpIQXJvanVqb1M2aHVJakozMEljekhBbXl5ekN4K2h2MWFRcTJQQmNUREZVR3RDVVZUYTZJa2h6Q3RRSEgreE9ydlR1SVlOdEQ1c21JNXdpWXFEb2FuNmJ4c045RlFnMnNpVVJSZHNYWHdXb2tYNFVaaU5GSktEMElubEZwUlhtT0lsU3FMTFo4UGROY1RLNDhWNlpGYTVPNFNWRjk5dHozMFQvYkY0d2dMQmJjSThWTmZyWkk1N0lxZDN3Lzhhd3BhWFhyZCs5QWlhMGdJVGdqdE5RV0wycUhJQ3ZIMVFsZkpIVTM1SmRwbktQTGJlQXBTVi96RmhjTW1VSlhQMnp4NkJLOG1TSXhGak5rSzJ4R09seGZRWVFyTFZPYU9OWEw3WHJaTHZCWG1SdXFaUU5HYlNxODdhbmRMbjNYUW51ZkNPQlZqbmI3dTZKYmpxZkFDckVib0d1c0F2UURycmxvUDZWZWkzYWJOblFJY2txeWlMYVZma3ZmcVB4elNmellobXJuL2tJWit6ckQrLzBNYVZjamZTdlo1bmY4aGpYOEZHQUJnNkh3em1xb3RIQUFBQUFCSlJVNUVya0pnZ2c9PSk7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogMS4ycmVtO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgMC4ycmVtO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICBjb2xvcjogIzAwZGRmMTtcXG4gICAgZm9udC1zaXplOiAxMnB4O1xcbiAgICB3aWR0aDogMTAwcHg7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgbGluZS1oZWlnaHQ6IDEuNWVtO1xcbiAgICBsZWZ0OiAwLjFyZW07XFxuICAgIHRvcDogMS44cmVtO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHBhZGRpbmctdG9wOiA1MHB4O1xcbn1cXG5cXG4jc3RhZ2UtbWFwIC50ZXh0IGIge1xcbiAgICBmb250LXNpemU6IDE1cHg7XFxuICAgIG1hcmdpbi10b3A6IDRweDtcXG4gICAgY29sb3I6ICNGRkY7XFxufVxcblxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBmbGFzaCB7XFxuICAgIDAlIHtcXG4gICAgICAgIG9wYWNpdHk6IDA7XFxuICAgIH1cXG5cXG4gICAgMTAwJSB7XFxuICAgICAgICBvcGFjaXR5OiAxO1xcbiAgICB9XFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4yNS4wQGNzcy1sb2FkZXIhLi9zcmMvbWFwLmNzc1xuLy8gbW9kdWxlIGlkID0gMTQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7XG4gICAgd2luLFxuICAgIGRvYyxcbiAgICBQcm9taXNlLFxuICAgIGRlZmVyLFxuICAgIHF1ZXJ5LFxuICAgIHF1ZXJ5QWxsLFxuICAgIGdldFJlY3QsXG4gICAgZ2V0RGlzdGFuY2UsXG4gICAgcmFmLFxuICAgIGNhZlxufSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IEV2ZW50IGZyb20gJy4vZXZlbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaWNrZXIgZXh0ZW5kcyBFdmVudHtcbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuXG4gICAgICAgIHRoaXMuX2lkID0gMDtcbiAgICAgICAgdGhpcy5fbWFwRiA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5fbWFwQyA9IG5ldyBNYXAoKTtcbiAgICB9XG5cbiAgICBhZGQoZikge1xuICAgICAgICBpZiAoZiAmJiAhdGhpcy5fbWFwQy5oYXMoZikpIHtcbiAgICAgICAgICAgIGNvbnN0IGlkID0gdGhpcy5faWQrKztcbiAgICAgICAgICAgIHRoaXMuX21hcEYuc2V0KGlkLCBmKTtcbiAgICAgICAgICAgIHRoaXMuX21hcEMuc2V0KGYsIHtcbiAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQ6IGRlZmVyKCksXG4gICAgICAgICAgICAgICAgY2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdGFydDogMCxcbiAgICAgICAgICAgICAgICBlbGFwc2VkOiAwLFxuICAgICAgICAgICAgICAgIGRlbHRhOiAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhcyhpZCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGlkID09PSAnbnVtYmVyJyAmJiB0aGlzLl9tYXBGLmhhcyhpZCk7XG4gICAgfVxuXG4gICAgZGVsZXRlKGlkKSB7XG4gICAgICAgIGlmICh0aGlzLmhhcyhpZCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGYgPSB0aGlzLl9tYXBGLmdldChpZCk7XG4gICAgICAgICAgICBjb25zdCBjID0gdGhpcy5fbWFwQy5nZXQoZik7XG4gICAgICAgICAgICBjLmNhbmNlbCA9IHRydWU7XG4gICAgICAgICAgICBjLmRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgIHRoaXMuX21hcEYuZGVsZXRlKGlkKTtcbiAgICAgICAgICAgIHRoaXMuX21hcEMuZGVsZXRlKGYpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZW5kKGlkKSB7XG4gICAgICAgIGlmICh0aGlzLmhhcyhpZCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGYgPSB0aGlzLl9tYXBGLmdldChpZCk7XG4gICAgICAgICAgICBjb25zdCBjID0gdGhpcy5fbWFwQy5nZXQoZik7XG4gICAgICAgICAgICByZXR1cm4gYy5kZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FuY2VsKCkge1xuICAgICAgICBpZiAodGhpcy5yaWQpIHtcbiAgICAgICAgICAgIGNhZih0aGlzLnJpZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBydW4oKSB7XG4gICAgICAgIHRoaXMuc3RhcnQgPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLmVsYXBzZWQgPSAwO1xuICAgICAgICB0aGlzLmRlbHRhID0gMDtcblxuICAgICAgICBjb25zdCB0aWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yaWQgPSByYWYodGljayk7XG5cbiAgICAgICAgICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgbGV0IGVsYXBzZWQgPSBub3cgLSB0aGlzLnN0YXJ0O1xuXG4gICAgICAgICAgICB0aGlzLmRlbHRhID0gZWxhcHNlZCAtIHRoaXMuZWxhcHNlZDtcbiAgICAgICAgICAgIHRoaXMuZWxhcHNlZCA9IGVsYXBzZWQ7XG5cbiAgICAgICAgICAgIHRoaXMuZW1pdCgnYmVmb3JldGljaycsIHtcbiAgICAgICAgICAgICAgICBzdGFydDogdGhpcy5zdGFydCxcbiAgICAgICAgICAgICAgICBkZWx0YTogdGhpcy5kZWx0YSxcbiAgICAgICAgICAgICAgICBlbGFwc2VkOiB0aGlzLmVsYXBzZWRcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBrZXlzID0gWy4uLnRoaXMuX21hcEMua2V5cygpXTtcblxuICAgICAgICAgICAga2V5cy5mb3JFYWNoKGYgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGMgPSB0aGlzLl9tYXBDLmdldChmKTtcblxuICAgICAgICAgICAgICAgIGlmICghYy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICAgICAgYy5zdGFydCA9IGMuc3RhcnQgfHwgKGMuc3RhcnQgPSBub3cpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsYXBzZWQgPSBub3cgLSBjLnN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICBjLmRlbHRhID0gZWxhcHNlZCAtIGMuZWxhcHNlZDtcbiAgICAgICAgICAgICAgICAgICAgYy5lbGFwc2VkID0gZWxhcHNlZDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZihjLCB0aGlzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxldGUoYy5pZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIGVsYXBzZWQgPSBub3cgLSB0aGlzLnN0YXJ0O1xuXG4gICAgICAgICAgICB0aGlzLmRlbHRhID0gZWxhcHNlZCAtIHRoaXMuZWxhcHNlZDtcbiAgICAgICAgICAgIHRoaXMuZWxhcHNlZCA9IGVsYXBzZWQ7XG5cbiAgICAgICAgICAgIHRoaXMuZW1pdCgnYWZ0ZXJ0aWNrJywge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiB0aGlzLnN0YXJ0LFxuICAgICAgICAgICAgICAgIGRlbHRhOiB0aGlzLmRlbHRhLFxuICAgICAgICAgICAgICAgIGVsYXBzZWQ6IHRoaXMuZWxhcHNlZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJpZCA9IHJhZih0aWNrKTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3RpY2tlci5qcyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9tYXBcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvbWFwLmpzXG4vLyBtb2R1bGUgaWQgPSAxNDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYubWFwJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNy5tYXAudG8tanNvbicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL19jb3JlJykuTWFwO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL21hcC5qc1xuLy8gbW9kdWxlIGlkID0gMTQ5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHN0cm9uZyA9IHJlcXVpcmUoJy4vX2NvbGxlY3Rpb24tc3Ryb25nJyk7XG5cbi8vIDIzLjEgTWFwIE9iamVjdHNcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29sbGVjdGlvbicpKCdNYXAnLCBmdW5jdGlvbihnZXQpe1xuICByZXR1cm4gZnVuY3Rpb24gTWFwKCl7IHJldHVybiBnZXQodGhpcywgYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpOyB9O1xufSwge1xuICAvLyAyMy4xLjMuNiBNYXAucHJvdG90eXBlLmdldChrZXkpXG4gIGdldDogZnVuY3Rpb24gZ2V0KGtleSl7XG4gICAgdmFyIGVudHJ5ID0gc3Ryb25nLmdldEVudHJ5KHRoaXMsIGtleSk7XG4gICAgcmV0dXJuIGVudHJ5ICYmIGVudHJ5LnY7XG4gIH0sXG4gIC8vIDIzLjEuMy45IE1hcC5wcm90b3R5cGUuc2V0KGtleSwgdmFsdWUpXG4gIHNldDogZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUpe1xuICAgIHJldHVybiBzdHJvbmcuZGVmKHRoaXMsIGtleSA9PT0gMCA/IDAgOiBrZXksIHZhbHVlKTtcbiAgfVxufSwgc3Ryb25nLCB0cnVlKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5tYXAuanNcbi8vIG1vZHVsZSBpZCA9IDE1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcbnZhciBkUCAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZcbiAgLCBjcmVhdGUgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKVxuICAsIHJlZGVmaW5lQWxsID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUtYWxsJylcbiAgLCBjdHggICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgYW5JbnN0YW5jZSAgPSByZXF1aXJlKCcuL19hbi1pbnN0YW5jZScpXG4gICwgZGVmaW5lZCAgICAgPSByZXF1aXJlKCcuL19kZWZpbmVkJylcbiAgLCBmb3JPZiAgICAgICA9IHJlcXVpcmUoJy4vX2Zvci1vZicpXG4gICwgJGl0ZXJEZWZpbmUgPSByZXF1aXJlKCcuL19pdGVyLWRlZmluZScpXG4gICwgc3RlcCAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLXN0ZXAnKVxuICAsIHNldFNwZWNpZXMgID0gcmVxdWlyZSgnLi9fc2V0LXNwZWNpZXMnKVxuICAsIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKVxuICAsIGZhc3RLZXkgICAgID0gcmVxdWlyZSgnLi9fbWV0YScpLmZhc3RLZXlcbiAgLCBTSVpFICAgICAgICA9IERFU0NSSVBUT1JTID8gJ19zJyA6ICdzaXplJztcblxudmFyIGdldEVudHJ5ID0gZnVuY3Rpb24odGhhdCwga2V5KXtcbiAgLy8gZmFzdCBjYXNlXG4gIHZhciBpbmRleCA9IGZhc3RLZXkoa2V5KSwgZW50cnk7XG4gIGlmKGluZGV4ICE9PSAnRicpcmV0dXJuIHRoYXQuX2lbaW5kZXhdO1xuICAvLyBmcm96ZW4gb2JqZWN0IGNhc2VcbiAgZm9yKGVudHJ5ID0gdGhhdC5fZjsgZW50cnk7IGVudHJ5ID0gZW50cnkubil7XG4gICAgaWYoZW50cnkuayA9PSBrZXkpcmV0dXJuIGVudHJ5O1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0Q29uc3RydWN0b3I6IGZ1bmN0aW9uKHdyYXBwZXIsIE5BTUUsIElTX01BUCwgQURERVIpe1xuICAgIHZhciBDID0gd3JhcHBlcihmdW5jdGlvbih0aGF0LCBpdGVyYWJsZSl7XG4gICAgICBhbkluc3RhbmNlKHRoYXQsIEMsIE5BTUUsICdfaScpO1xuICAgICAgdGhhdC5faSA9IGNyZWF0ZShudWxsKTsgLy8gaW5kZXhcbiAgICAgIHRoYXQuX2YgPSB1bmRlZmluZWQ7ICAgIC8vIGZpcnN0IGVudHJ5XG4gICAgICB0aGF0Ll9sID0gdW5kZWZpbmVkOyAgICAvLyBsYXN0IGVudHJ5XG4gICAgICB0aGF0W1NJWkVdID0gMDsgICAgICAgICAvLyBzaXplXG4gICAgICBpZihpdGVyYWJsZSAhPSB1bmRlZmluZWQpZm9yT2YoaXRlcmFibGUsIElTX01BUCwgdGhhdFtBRERFUl0sIHRoYXQpO1xuICAgIH0pO1xuICAgIHJlZGVmaW5lQWxsKEMucHJvdG90eXBlLCB7XG4gICAgICAvLyAyMy4xLjMuMSBNYXAucHJvdG90eXBlLmNsZWFyKClcbiAgICAgIC8vIDIzLjIuMy4yIFNldC5wcm90b3R5cGUuY2xlYXIoKVxuICAgICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCl7XG4gICAgICAgIGZvcih2YXIgdGhhdCA9IHRoaXMsIGRhdGEgPSB0aGF0Ll9pLCBlbnRyeSA9IHRoYXQuX2Y7IGVudHJ5OyBlbnRyeSA9IGVudHJ5Lm4pe1xuICAgICAgICAgIGVudHJ5LnIgPSB0cnVlO1xuICAgICAgICAgIGlmKGVudHJ5LnApZW50cnkucCA9IGVudHJ5LnAubiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBkZWxldGUgZGF0YVtlbnRyeS5pXTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0Ll9mID0gdGhhdC5fbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhhdFtTSVpFXSA9IDA7XG4gICAgICB9LFxuICAgICAgLy8gMjMuMS4zLjMgTWFwLnByb3RvdHlwZS5kZWxldGUoa2V5KVxuICAgICAgLy8gMjMuMi4zLjQgU2V0LnByb3RvdHlwZS5kZWxldGUodmFsdWUpXG4gICAgICAnZGVsZXRlJzogZnVuY3Rpb24oa2V5KXtcbiAgICAgICAgdmFyIHRoYXQgID0gdGhpc1xuICAgICAgICAgICwgZW50cnkgPSBnZXRFbnRyeSh0aGF0LCBrZXkpO1xuICAgICAgICBpZihlbnRyeSl7XG4gICAgICAgICAgdmFyIG5leHQgPSBlbnRyeS5uXG4gICAgICAgICAgICAsIHByZXYgPSBlbnRyeS5wO1xuICAgICAgICAgIGRlbGV0ZSB0aGF0Ll9pW2VudHJ5LmldO1xuICAgICAgICAgIGVudHJ5LnIgPSB0cnVlO1xuICAgICAgICAgIGlmKHByZXYpcHJldi5uID0gbmV4dDtcbiAgICAgICAgICBpZihuZXh0KW5leHQucCA9IHByZXY7XG4gICAgICAgICAgaWYodGhhdC5fZiA9PSBlbnRyeSl0aGF0Ll9mID0gbmV4dDtcbiAgICAgICAgICBpZih0aGF0Ll9sID09IGVudHJ5KXRoYXQuX2wgPSBwcmV2O1xuICAgICAgICAgIHRoYXRbU0laRV0tLTtcbiAgICAgICAgfSByZXR1cm4gISFlbnRyeTtcbiAgICAgIH0sXG4gICAgICAvLyAyMy4yLjMuNiBTZXQucHJvdG90eXBlLmZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgICAgIC8vIDIzLjEuMy41IE1hcC5wcm90b3R5cGUuZm9yRWFjaChjYWxsYmFja2ZuLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICAgICAgZm9yRWFjaDogZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFja2ZuIC8qLCB0aGF0ID0gdW5kZWZpbmVkICovKXtcbiAgICAgICAgYW5JbnN0YW5jZSh0aGlzLCBDLCAnZm9yRWFjaCcpO1xuICAgICAgICB2YXIgZiA9IGN0eChjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCwgMylcbiAgICAgICAgICAsIGVudHJ5O1xuICAgICAgICB3aGlsZShlbnRyeSA9IGVudHJ5ID8gZW50cnkubiA6IHRoaXMuX2Ype1xuICAgICAgICAgIGYoZW50cnkudiwgZW50cnkuaywgdGhpcyk7XG4gICAgICAgICAgLy8gcmV2ZXJ0IHRvIHRoZSBsYXN0IGV4aXN0aW5nIGVudHJ5XG4gICAgICAgICAgd2hpbGUoZW50cnkgJiYgZW50cnkucillbnRyeSA9IGVudHJ5LnA7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAvLyAyMy4xLjMuNyBNYXAucHJvdG90eXBlLmhhcyhrZXkpXG4gICAgICAvLyAyMy4yLjMuNyBTZXQucHJvdG90eXBlLmhhcyh2YWx1ZSlcbiAgICAgIGhhczogZnVuY3Rpb24gaGFzKGtleSl7XG4gICAgICAgIHJldHVybiAhIWdldEVudHJ5KHRoaXMsIGtleSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYoREVTQ1JJUFRPUlMpZFAoQy5wcm90b3R5cGUsICdzaXplJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gZGVmaW5lZCh0aGlzW1NJWkVdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gQztcbiAgfSxcbiAgZGVmOiBmdW5jdGlvbih0aGF0LCBrZXksIHZhbHVlKXtcbiAgICB2YXIgZW50cnkgPSBnZXRFbnRyeSh0aGF0LCBrZXkpXG4gICAgICAsIHByZXYsIGluZGV4O1xuICAgIC8vIGNoYW5nZSBleGlzdGluZyBlbnRyeVxuICAgIGlmKGVudHJ5KXtcbiAgICAgIGVudHJ5LnYgPSB2YWx1ZTtcbiAgICAvLyBjcmVhdGUgbmV3IGVudHJ5XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoYXQuX2wgPSBlbnRyeSA9IHtcbiAgICAgICAgaTogaW5kZXggPSBmYXN0S2V5KGtleSwgdHJ1ZSksIC8vIDwtIGluZGV4XG4gICAgICAgIGs6IGtleSwgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBrZXlcbiAgICAgICAgdjogdmFsdWUsICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIHZhbHVlXG4gICAgICAgIHA6IHByZXYgPSB0aGF0Ll9sLCAgICAgICAgICAgICAvLyA8LSBwcmV2aW91cyBlbnRyeVxuICAgICAgICBuOiB1bmRlZmluZWQsICAgICAgICAgICAgICAgICAgLy8gPC0gbmV4dCBlbnRyeVxuICAgICAgICByOiBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gcmVtb3ZlZFxuICAgICAgfTtcbiAgICAgIGlmKCF0aGF0Ll9mKXRoYXQuX2YgPSBlbnRyeTtcbiAgICAgIGlmKHByZXYpcHJldi5uID0gZW50cnk7XG4gICAgICB0aGF0W1NJWkVdKys7XG4gICAgICAvLyBhZGQgdG8gaW5kZXhcbiAgICAgIGlmKGluZGV4ICE9PSAnRicpdGhhdC5faVtpbmRleF0gPSBlbnRyeTtcbiAgICB9IHJldHVybiB0aGF0O1xuICB9LFxuICBnZXRFbnRyeTogZ2V0RW50cnksXG4gIHNldFN0cm9uZzogZnVuY3Rpb24oQywgTkFNRSwgSVNfTUFQKXtcbiAgICAvLyBhZGQgLmtleXMsIC52YWx1ZXMsIC5lbnRyaWVzLCBbQEBpdGVyYXRvcl1cbiAgICAvLyAyMy4xLjMuNCwgMjMuMS4zLjgsIDIzLjEuMy4xMSwgMjMuMS4zLjEyLCAyMy4yLjMuNSwgMjMuMi4zLjgsIDIzLjIuMy4xMCwgMjMuMi4zLjExXG4gICAgJGl0ZXJEZWZpbmUoQywgTkFNRSwgZnVuY3Rpb24oaXRlcmF0ZWQsIGtpbmQpe1xuICAgICAgdGhpcy5fdCA9IGl0ZXJhdGVkOyAgLy8gdGFyZ2V0XG4gICAgICB0aGlzLl9rID0ga2luZDsgICAgICAvLyBraW5kXG4gICAgICB0aGlzLl9sID0gdW5kZWZpbmVkOyAvLyBwcmV2aW91c1xuICAgIH0sIGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgdGhhdCAgPSB0aGlzXG4gICAgICAgICwga2luZCAgPSB0aGF0Ll9rXG4gICAgICAgICwgZW50cnkgPSB0aGF0Ll9sO1xuICAgICAgLy8gcmV2ZXJ0IHRvIHRoZSBsYXN0IGV4aXN0aW5nIGVudHJ5XG4gICAgICB3aGlsZShlbnRyeSAmJiBlbnRyeS5yKWVudHJ5ID0gZW50cnkucDtcbiAgICAgIC8vIGdldCBuZXh0IGVudHJ5XG4gICAgICBpZighdGhhdC5fdCB8fCAhKHRoYXQuX2wgPSBlbnRyeSA9IGVudHJ5ID8gZW50cnkubiA6IHRoYXQuX3QuX2YpKXtcbiAgICAgICAgLy8gb3IgZmluaXNoIHRoZSBpdGVyYXRpb25cbiAgICAgICAgdGhhdC5fdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIHN0ZXAoMSk7XG4gICAgICB9XG4gICAgICAvLyByZXR1cm4gc3RlcCBieSBraW5kXG4gICAgICBpZihraW5kID09ICdrZXlzJyAgKXJldHVybiBzdGVwKDAsIGVudHJ5LmspO1xuICAgICAgaWYoa2luZCA9PSAndmFsdWVzJylyZXR1cm4gc3RlcCgwLCBlbnRyeS52KTtcbiAgICAgIHJldHVybiBzdGVwKDAsIFtlbnRyeS5rLCBlbnRyeS52XSk7XG4gICAgfSwgSVNfTUFQID8gJ2VudHJpZXMnIDogJ3ZhbHVlcycgLCAhSVNfTUFQLCB0cnVlKTtcblxuICAgIC8vIGFkZCBbQEBzcGVjaWVzXSwgMjMuMS4yLjIsIDIzLjIuMi4yXG4gICAgc2V0U3BlY2llcyhOQU1FKTtcbiAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2xsZWN0aW9uLXN0cm9uZy5qc1xuLy8gbW9kdWxlIGlkID0gMTUxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRhcmdldCwgc3JjLCBzYWZlKXtcbiAgZm9yKHZhciBrZXkgaW4gc3JjKXtcbiAgICBpZihzYWZlICYmIHRhcmdldFtrZXldKXRhcmdldFtrZXldID0gc3JjW2tleV07XG4gICAgZWxzZSBoaWRlKHRhcmdldCwga2V5LCBzcmNba2V5XSk7XG4gIH0gcmV0dXJuIHRhcmdldDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUtYWxsLmpzXG4vLyBtb2R1bGUgaWQgPSAxNTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBDb25zdHJ1Y3RvciwgbmFtZSwgZm9yYmlkZGVuRmllbGQpe1xuICBpZighKGl0IGluc3RhbmNlb2YgQ29uc3RydWN0b3IpIHx8IChmb3JiaWRkZW5GaWVsZCAhPT0gdW5kZWZpbmVkICYmIGZvcmJpZGRlbkZpZWxkIGluIGl0KSl7XG4gICAgdGhyb3cgVHlwZUVycm9yKG5hbWUgKyAnOiBpbmNvcnJlY3QgaW52b2NhdGlvbiEnKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLWluc3RhbmNlLmpzXG4vLyBtb2R1bGUgaWQgPSAxNTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgY3R4ICAgICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIGNhbGwgICAgICAgID0gcmVxdWlyZSgnLi9faXRlci1jYWxsJylcbiAgLCBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKVxuICAsIGFuT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCB0b0xlbmd0aCAgICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgZ2V0SXRlckZuICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpXG4gICwgQlJFQUsgICAgICAgPSB7fVxuICAsIFJFVFVSTiAgICAgID0ge307XG52YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXRlcmFibGUsIGVudHJpZXMsIGZuLCB0aGF0LCBJVEVSQVRPUil7XG4gIHZhciBpdGVyRm4gPSBJVEVSQVRPUiA/IGZ1bmN0aW9uKCl7IHJldHVybiBpdGVyYWJsZTsgfSA6IGdldEl0ZXJGbihpdGVyYWJsZSlcbiAgICAsIGYgICAgICA9IGN0eChmbiwgdGhhdCwgZW50cmllcyA/IDIgOiAxKVxuICAgICwgaW5kZXggID0gMFxuICAgICwgbGVuZ3RoLCBzdGVwLCBpdGVyYXRvciwgcmVzdWx0O1xuICBpZih0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ZXJhYmxlICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIC8vIGZhc3QgY2FzZSBmb3IgYXJyYXlzIHdpdGggZGVmYXVsdCBpdGVyYXRvclxuICBpZihpc0FycmF5SXRlcihpdGVyRm4pKWZvcihsZW5ndGggPSB0b0xlbmd0aChpdGVyYWJsZS5sZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKyl7XG4gICAgcmVzdWx0ID0gZW50cmllcyA/IGYoYW5PYmplY3Qoc3RlcCA9IGl0ZXJhYmxlW2luZGV4XSlbMF0sIHN0ZXBbMV0pIDogZihpdGVyYWJsZVtpbmRleF0pO1xuICAgIGlmKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pcmV0dXJuIHJlc3VsdDtcbiAgfSBlbHNlIGZvcihpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKGl0ZXJhYmxlKTsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOyApe1xuICAgIHJlc3VsdCA9IGNhbGwoaXRlcmF0b3IsIGYsIHN0ZXAudmFsdWUsIGVudHJpZXMpO1xuICAgIGlmKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcbmV4cG9ydHMuQlJFQUsgID0gQlJFQUs7XG5leHBvcnRzLlJFVFVSTiA9IFJFVFVSTjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mb3Itb2YuanNcbi8vIG1vZHVsZSBpZCA9IDE1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBkUCAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpXG4gICwgU1BFQ0lFUyAgICAgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEtFWSl7XG4gIHZhciBDID0gdHlwZW9mIGNvcmVbS0VZXSA9PSAnZnVuY3Rpb24nID8gY29yZVtLRVldIDogZ2xvYmFsW0tFWV07XG4gIGlmKERFU0NSSVBUT1JTICYmIEMgJiYgIUNbU1BFQ0lFU10pZFAuZihDLCBTUEVDSUVTLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH1cbiAgfSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1zcGVjaWVzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBtZXRhICAgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGEnKVxuICAsIGZhaWxzICAgICAgICAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKVxuICAsIGhpZGUgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgcmVkZWZpbmVBbGwgICAgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKVxuICAsIGZvck9mICAgICAgICAgID0gcmVxdWlyZSgnLi9fZm9yLW9mJylcbiAgLCBhbkluc3RhbmNlICAgICA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJylcbiAgLCBpc09iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgZFAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mXG4gICwgZWFjaCAgICAgICAgICAgPSByZXF1aXJlKCcuL19hcnJheS1tZXRob2RzJykoMClcbiAgLCBERVNDUklQVE9SUyAgICA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oTkFNRSwgd3JhcHBlciwgbWV0aG9kcywgY29tbW9uLCBJU19NQVAsIElTX1dFQUspe1xuICB2YXIgQmFzZSAgPSBnbG9iYWxbTkFNRV1cbiAgICAsIEMgICAgID0gQmFzZVxuICAgICwgQURERVIgPSBJU19NQVAgPyAnc2V0JyA6ICdhZGQnXG4gICAgLCBwcm90byA9IEMgJiYgQy5wcm90b3R5cGVcbiAgICAsIE8gICAgID0ge307XG4gIGlmKCFERVNDUklQVE9SUyB8fCB0eXBlb2YgQyAhPSAnZnVuY3Rpb24nIHx8ICEoSVNfV0VBSyB8fCBwcm90by5mb3JFYWNoICYmICFmYWlscyhmdW5jdGlvbigpe1xuICAgIG5ldyBDKCkuZW50cmllcygpLm5leHQoKTtcbiAgfSkpKXtcbiAgICAvLyBjcmVhdGUgY29sbGVjdGlvbiBjb25zdHJ1Y3RvclxuICAgIEMgPSBjb21tb24uZ2V0Q29uc3RydWN0b3Iod3JhcHBlciwgTkFNRSwgSVNfTUFQLCBBRERFUik7XG4gICAgcmVkZWZpbmVBbGwoQy5wcm90b3R5cGUsIG1ldGhvZHMpO1xuICAgIG1ldGEuTkVFRCA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgQyA9IHdyYXBwZXIoZnVuY3Rpb24odGFyZ2V0LCBpdGVyYWJsZSl7XG4gICAgICBhbkluc3RhbmNlKHRhcmdldCwgQywgTkFNRSwgJ19jJyk7XG4gICAgICB0YXJnZXQuX2MgPSBuZXcgQmFzZTtcbiAgICAgIGlmKGl0ZXJhYmxlICE9IHVuZGVmaW5lZClmb3JPZihpdGVyYWJsZSwgSVNfTUFQLCB0YXJnZXRbQURERVJdLCB0YXJnZXQpO1xuICAgIH0pO1xuICAgIGVhY2goJ2FkZCxjbGVhcixkZWxldGUsZm9yRWFjaCxnZXQsaGFzLHNldCxrZXlzLHZhbHVlcyxlbnRyaWVzLHRvSlNPTicuc3BsaXQoJywnKSxmdW5jdGlvbihLRVkpe1xuICAgICAgdmFyIElTX0FEREVSID0gS0VZID09ICdhZGQnIHx8IEtFWSA9PSAnc2V0JztcbiAgICAgIGlmKEtFWSBpbiBwcm90byAmJiAhKElTX1dFQUsgJiYgS0VZID09ICdjbGVhcicpKWhpZGUoQy5wcm90b3R5cGUsIEtFWSwgZnVuY3Rpb24oYSwgYil7XG4gICAgICAgIGFuSW5zdGFuY2UodGhpcywgQywgS0VZKTtcbiAgICAgICAgaWYoIUlTX0FEREVSICYmIElTX1dFQUsgJiYgIWlzT2JqZWN0KGEpKXJldHVybiBLRVkgPT0gJ2dldCcgPyB1bmRlZmluZWQgOiBmYWxzZTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuX2NbS0VZXShhID09PSAwID8gMCA6IGEsIGIpO1xuICAgICAgICByZXR1cm4gSVNfQURERVIgPyB0aGlzIDogcmVzdWx0O1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYoJ3NpemUnIGluIHByb3RvKWRQKEMucHJvdG90eXBlLCAnc2l6ZScsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Muc2l6ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNldFRvU3RyaW5nVGFnKEMsIE5BTUUpO1xuXG4gIE9bTkFNRV0gPSBDO1xuICAkZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiwgTyk7XG5cbiAgaWYoIUlTX1dFQUspY29tbW9uLnNldFN0cm9uZyhDLCBOQU1FLCBJU19NQVApO1xuXG4gIHJldHVybiBDO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2xsZWN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAxNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyAwIC0+IEFycmF5I2ZvckVhY2hcbi8vIDEgLT4gQXJyYXkjbWFwXG4vLyAyIC0+IEFycmF5I2ZpbHRlclxuLy8gMyAtPiBBcnJheSNzb21lXG4vLyA0IC0+IEFycmF5I2V2ZXJ5XG4vLyA1IC0+IEFycmF5I2ZpbmRcbi8vIDYgLT4gQXJyYXkjZmluZEluZGV4XG52YXIgY3R4ICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIElPYmplY3QgID0gcmVxdWlyZSgnLi9faW9iamVjdCcpXG4gICwgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCBhc2MgICAgICA9IHJlcXVpcmUoJy4vX2FycmF5LXNwZWNpZXMtY3JlYXRlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFRZUEUsICRjcmVhdGUpe1xuICB2YXIgSVNfTUFQICAgICAgICA9IFRZUEUgPT0gMVxuICAgICwgSVNfRklMVEVSICAgICA9IFRZUEUgPT0gMlxuICAgICwgSVNfU09NRSAgICAgICA9IFRZUEUgPT0gM1xuICAgICwgSVNfRVZFUlkgICAgICA9IFRZUEUgPT0gNFxuICAgICwgSVNfRklORF9JTkRFWCA9IFRZUEUgPT0gNlxuICAgICwgTk9fSE9MRVMgICAgICA9IFRZUEUgPT0gNSB8fCBJU19GSU5EX0lOREVYXG4gICAgLCBjcmVhdGUgICAgICAgID0gJGNyZWF0ZSB8fCBhc2M7XG4gIHJldHVybiBmdW5jdGlvbigkdGhpcywgY2FsbGJhY2tmbiwgdGhhdCl7XG4gICAgdmFyIE8gICAgICA9IHRvT2JqZWN0KCR0aGlzKVxuICAgICAgLCBzZWxmICAgPSBJT2JqZWN0KE8pXG4gICAgICAsIGYgICAgICA9IGN0eChjYWxsYmFja2ZuLCB0aGF0LCAzKVxuICAgICAgLCBsZW5ndGggPSB0b0xlbmd0aChzZWxmLmxlbmd0aClcbiAgICAgICwgaW5kZXggID0gMFxuICAgICAgLCByZXN1bHQgPSBJU19NQVAgPyBjcmVhdGUoJHRoaXMsIGxlbmd0aCkgOiBJU19GSUxURVIgPyBjcmVhdGUoJHRoaXMsIDApIDogdW5kZWZpbmVkXG4gICAgICAsIHZhbCwgcmVzO1xuICAgIGZvcig7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspaWYoTk9fSE9MRVMgfHwgaW5kZXggaW4gc2VsZil7XG4gICAgICB2YWwgPSBzZWxmW2luZGV4XTtcbiAgICAgIHJlcyA9IGYodmFsLCBpbmRleCwgTyk7XG4gICAgICBpZihUWVBFKXtcbiAgICAgICAgaWYoSVNfTUFQKXJlc3VsdFtpbmRleF0gPSByZXM7ICAgICAgICAgICAgLy8gbWFwXG4gICAgICAgIGVsc2UgaWYocmVzKXN3aXRjaChUWVBFKXtcbiAgICAgICAgICBjYXNlIDM6IHJldHVybiB0cnVlOyAgICAgICAgICAgICAgICAgICAgLy8gc29tZVxuICAgICAgICAgIGNhc2UgNTogcmV0dXJuIHZhbDsgICAgICAgICAgICAgICAgICAgICAvLyBmaW5kXG4gICAgICAgICAgY2FzZSA2OiByZXR1cm4gaW5kZXg7ICAgICAgICAgICAgICAgICAgIC8vIGZpbmRJbmRleFxuICAgICAgICAgIGNhc2UgMjogcmVzdWx0LnB1c2godmFsKTsgICAgICAgICAgICAgICAvLyBmaWx0ZXJcbiAgICAgICAgfSBlbHNlIGlmKElTX0VWRVJZKXJldHVybiBmYWxzZTsgICAgICAgICAgLy8gZXZlcnlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIElTX0ZJTkRfSU5ERVggPyAtMSA6IElTX1NPTUUgfHwgSVNfRVZFUlkgPyBJU19FVkVSWSA6IHJlc3VsdDtcbiAgfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktbWV0aG9kcy5qc1xuLy8gbW9kdWxlIGlkID0gMTU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gOS40LjIuMyBBcnJheVNwZWNpZXNDcmVhdGUob3JpZ2luYWxBcnJheSwgbGVuZ3RoKVxudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX2FycmF5LXNwZWNpZXMtY29uc3RydWN0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvcmlnaW5hbCwgbGVuZ3RoKXtcbiAgcmV0dXJuIG5ldyAoc3BlY2llc0NvbnN0cnVjdG9yKG9yaWdpbmFsKSkobGVuZ3RoKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktc3BlY2llcy1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDE1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgaXNBcnJheSAgPSByZXF1aXJlKCcuL19pcy1hcnJheScpXG4gICwgU1BFQ0lFUyAgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9yaWdpbmFsKXtcbiAgdmFyIEM7XG4gIGlmKGlzQXJyYXkob3JpZ2luYWwpKXtcbiAgICBDID0gb3JpZ2luYWwuY29uc3RydWN0b3I7XG4gICAgLy8gY3Jvc3MtcmVhbG0gZmFsbGJhY2tcbiAgICBpZih0eXBlb2YgQyA9PSAnZnVuY3Rpb24nICYmIChDID09PSBBcnJheSB8fCBpc0FycmF5KEMucHJvdG90eXBlKSkpQyA9IHVuZGVmaW5lZDtcbiAgICBpZihpc09iamVjdChDKSl7XG4gICAgICBDID0gQ1tTUEVDSUVTXTtcbiAgICAgIGlmKEMgPT09IG51bGwpQyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0gcmV0dXJuIEMgPT09IHVuZGVmaW5lZCA/IEFycmF5IDogQztcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktc3BlY2llcy1jb25zdHJ1Y3Rvci5qc1xuLy8gbW9kdWxlIGlkID0gMTU5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL0RhdmlkQnJ1YW50L01hcC1TZXQucHJvdG90eXBlLnRvSlNPTlxudmFyICRleHBvcnQgID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5SLCAnTWFwJywge3RvSlNPTjogcmVxdWlyZSgnLi9fY29sbGVjdGlvbi10by1qc29uJykoJ01hcCcpfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcubWFwLnRvLWpzb24uanNcbi8vIG1vZHVsZSBpZCA9IDE2MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EYXZpZEJydWFudC9NYXAtU2V0LnByb3RvdHlwZS50b0pTT05cbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpXG4gICwgZnJvbSAgICA9IHJlcXVpcmUoJy4vX2FycmF5LWZyb20taXRlcmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oTkFNRSl7XG4gIHJldHVybiBmdW5jdGlvbiB0b0pTT04oKXtcbiAgICBpZihjbGFzc29mKHRoaXMpICE9IE5BTUUpdGhyb3cgVHlwZUVycm9yKE5BTUUgKyBcIiN0b0pTT04gaXNuJ3QgZ2VuZXJpY1wiKTtcbiAgICByZXR1cm4gZnJvbSh0aGlzKTtcbiAgfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29sbGVjdGlvbi10by1qc29uLmpzXG4vLyBtb2R1bGUgaWQgPSAxNjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgZm9yT2YgPSByZXF1aXJlKCcuL19mb3Itb2YnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdGVyLCBJVEVSQVRPUil7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgZm9yT2YoaXRlciwgZmFsc2UsIHJlc3VsdC5wdXNoLCByZXN1bHQsIElURVJBVE9SKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1mcm9tLWl0ZXJhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSAxNjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJpbXBvcnQgJy4vcG9wLmNzcyc7XG5pbXBvcnQge1xuICAgIHdpbixcbiAgICBkb2MsXG4gICAgUHJvbWlzZSxcbiAgICBxdWVyeSxcbiAgICBxdWVyeUFsbCxcbiAgICBnZXRSZWN0LFxuICAgIGdldERpc3RhbmNlLFxuICAgIHJhZixcbiAgICBkZWxheVxufSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3Age1xuICAgIGNvbnN0cnVjdG9yKHZpZXdwb3J0KSB7XG4gICAgICAgIHRoaXMucG9wRWwgPSBxdWVyeSh2aWV3cG9ydCwgJyNwb3AnKTtcbiAgICB9XG5cbiAgICByZWFkeSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudEVsID0gcXVlcnkodGhpcy5wb3BFbCwgJy5jb250ZW50Jyk7XG4gICAgICAgICAgICB0aGlzLmNsb3NlRWwgPSBxdWVyeSh0aGlzLnBvcEVsLCAnLnBvcENsb3NlJyk7XG4gICAgICAgICAgICB0aGlzLnRpdGxlRWwgPSBxdWVyeSh0aGlzLnBvcEVsLCAnLnRpdGxlJyk7XG4gICAgICAgICAgICB0aGlzLnRleHRFbCA9IHF1ZXJ5KHRoaXMucG9wRWwsICcudGV4dCcpO1xuICAgICAgICAgICAgdGhpcy5iZzFFbCA9IHF1ZXJ5KHRoaXMucG9wRWwsICcucG9wQmcxJyk7XG4gICAgICAgICAgICB0aGlzLmJnMkVsID0gcXVlcnkodGhpcy5wb3BFbCwgJy5wb3BCZzInKTtcbiAgICAgICAgICAgIHRoaXMuYnRuc0VsID0gcXVlcnkodGhpcy5wb3BFbCwgJy5idG5zJyk7XG4gICAgICAgICAgICB0aGlzLmxlZnRCdG5FbCA9IHF1ZXJ5KHRoaXMucG9wRWwsICcucG9wQnRuLmxlZnQnKTtcbiAgICAgICAgICAgIHRoaXMucmlnaHRCdG5FbCA9IHF1ZXJ5KHRoaXMucG9wRWwsICcucG9wQnRuLnJpZ2h0Jyk7XG5cbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIHRoaXMuY29udGVudEVsLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgICAgdGhpcy5idG5zRWwuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgICB0aGlzLnBvcEVsLmNsYXNzTmFtZSA9IHRoaXMucG9wRWwuY2xhc3NOYW1lLnJlcGxhY2UoJ29wZW4nLCAnY2xvc2UnKTtcblxuICAgICAgICByZXR1cm4gZGVsYXkoNjAwKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucG9wRWwuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICAgICAgICAgdGhpcy5wb3BFbC5jbGFzc05hbWUgPSAnJztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcG9wdXAoe1xuICAgICAgICBzaGFyZWJsZSxcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIHRleHQsXG4gICAgICAgIGJnVHlwZSxcbiAgICAgICAgb25sZWZ0Y2xpY2ssXG4gICAgICAgIG9ucmlnaHRjbGljayxcbiAgICAgICAgb25jbG9zZWNsaWNrXG4gICAgfSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wb3BFbC5zdHlsZS5kaXNwbGF5ID0gJyc7XG5cbiAgICAgICAgICAgIHRoaXMudGl0bGVFbC50ZXh0Q29udGVudCA9IHRpdGxlO1xuICAgICAgICAgICAgdGhpcy50ZXh0RWwuaW5uZXJIVE1MID0gdGV4dDtcbiAgICAgICAgICAgIHRoaXMucG9wRWwuY2xhc3NOYW1lICs9IGAgIGJnJHtiZ1R5cGV9YDtcblxuICAgICAgICAgICAgaWYgKHNoYXJlYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3BFbC5jbGFzc05hbWUgKz0gYCBzaGFyZWJsZWA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXIgPSAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxlZnRCdG5FbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0YXAnLCBvbkxlZnRDbGljayk7XG4gICAgICAgICAgICAgICAgdGhpcy5yaWdodEJ0bkVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RhcCcsIG9uUmlnaHRDbGljayk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZUVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RhcCcsIG9uQ2xvc2VDbGljayk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBvbkxlZnRDbGljayhlKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcihlKS50aGVuKCgpID0+IG9ubGVmdGNsaWNrICYmIG9ubGVmdGNsaWNrKCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmxlZnRCdG5FbC5hZGRFdmVudExpc3RlbmVyKCd0YXAnLCBvbkxlZnRDbGljayk7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uUmlnaHRDbGljayhlKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcihlKS50aGVuKCgpID0+IG9ucmlnaHRjbGljayAmJiBvbnJpZ2h0Y2xpY2soKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucmlnaHRCdG5FbC5hZGRFdmVudExpc3RlbmVyKCd0YXAnLCBvblJpZ2h0Q2xpY2spO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBvbkNsb3NlQ2xpY2soZSkge1xuICAgICAgICAgICAgICAgIGhhbmRsZXIoZSkudGhlbigoKSA9PiBvbmNsb3NlY2xpY2sgJiYgb25jbG9zZWNsaWNrKCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNsb3NlRWwuYWRkRXZlbnRMaXN0ZW5lcigndGFwJywgb25DbG9zZUNsaWNrKTtcblxuICAgICAgICAgICAgcmFmKCgpID0+IHRoaXMucG9wRWwuY2xhc3NOYW1lICs9ICcgb3BlbicpO1xuXG4gICAgICAgICAgICBkZWxheSg0MDApLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudEVsLnN0eWxlLnZpc2liaWxpdHkgPSAnJztcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bnNFbC5zdHlsZS52aXNpYmlsaXR5ID0gJyc7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcG9wLmpzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL3BvcC5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjEzLjFAc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL3BvcC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL3BvcC5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3BvcC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDE2NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiI3BvcCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGVmdDogMDtcXG4gICAgdG9wOiAwO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNik7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDk5OTlweCk7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgICAtd2Via2l0LWJveC1wYWNrOiBjZW50ZXI7XFxuICAgIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbiNwb3AgLndyYXAge1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4jcG9wIC5wb3BQYW5lbCB7XFxuICAgIHdpZHRoOiA0LjI2cmVtO1xcbiAgICBoZWlnaHQ6IDcuODRyZW07XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1zaXplOiA4LjUycmVtIDcuODRyZW07XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbiNwb3AgLnBvcFBhbmVsLmxlZnQge1xcbiAgICBsZWZ0OiAwO1xcbiAgICB0b3A6IDA7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IC0xMDAlIDA7XFxufVxcblxcbiNwb3AgLnBvcFBhbmVsLnJpZ2h0IHtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIHRvcDogMDtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMjAwJSAwO1xcbn1cXG5cXG4jcG9wLm9wZW4gLnBvcFBhbmVsLmxlZnQge1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogb3BlbmxlZnR3aW4gMC40cyBlYXNlLW91dCAwcyBmb3J3YXJkcztcXG59XFxuXFxuI3BvcC5vcGVuIC5wb3BQYW5lbC5yaWdodCB7XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBvcGVucmlnaHR3aW4gMC40cyBlYXNlLW91dCAwcyBmb3J3YXJkcztcXG59XFxuXFxuI3BvcC5jbG9zZSAucG9wUGFuZWwubGVmdCB7XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBjbG9zZWxlZnR3aW4gMC40cyBlYXNlLWluIDBzIGZvcndhcmRzO1xcbn1cXG5cXG4jcG9wLmNsb3NlIC5wb3BQYW5lbC5yaWdodCB7XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBjbG9zZXJpZ2h0d2luIDAuNHMgZWFzZS1pbiAwcyBmb3J3YXJkcztcXG59XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIG9wZW5sZWZ0d2luIHtcXG4gICAgMCUge1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogLTEwMCUgMDtcXG4gICAgfVxcblxcbiAgICAxMDAlIHtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMDtcXG4gICAgfVxcbn1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgb3BlbnJpZ2h0d2luIHtcXG4gICAgMCUge1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMjAwJSAwO1xcbiAgICB9XFxuXFxuICAgIDEwMCUge1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMTAwJSAwO1xcbiAgICB9XFxufVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBjbG9zZWxlZnR3aW4ge1xcbiAgICAwJSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XFxuICAgIH1cXG5cXG4gICAgMTAwJSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAtMTAwJSAwO1xcbiAgICB9XFxufVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBjbG9zZXJpZ2h0d2luIHtcXG4gICAgMCUge1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMTAwJSAwO1xcbiAgICB9XFxuXFxuICAgIDEwMCUge1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMjAwJSAwO1xcbiAgICB9XFxufVxcblxcbiNwb3AgLmNvbnRlbnQge1xcbiAgICB3aWR0aDogOC41M3JlbTtcXG4gICAgaGVpZ2h0OiA3Ljg0cmVtO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbiNwb3AgLnBvcEJnMSB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDMuMzZyZW07XFxuICAgIGhlaWdodDogMi45MnJlbTtcXG4gICAgcmlnaHQ6IDVweDtcXG4gICAgYm90dG9tOiAycHg7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMDtcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xcbn1cXG5cXG4jcG9wLmJnMSAucG9wQmcxIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbiNwb3AgLnBvcEJnMiB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDQuMzZyZW07XFxuICAgIGhlaWdodDogMy4zNDZyZW07XFxuICAgIHJpZ2h0OiA1cHg7XFxuICAgIGJvdHRvbTogMnB4O1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXG59XFxuXFxuI3BvcC5iZzIgLnBvcEJnMiB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4jcG9wIC5wb3BCZzMge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiA0LjYyNnJlbTtcXG4gICAgaGVpZ2h0OiAzLjUwNnJlbTtcXG4gICAgcmlnaHQ6IDVweDtcXG4gICAgYm90dG9tOiAycHg7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMDtcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xcbn1cXG5cXG4jcG9wLmJnMyAucG9wQmczIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbiNwb3AgLnBvcFRpcDEge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxlZnQ6IDAuODY3cmVtO1xcbiAgICB0b3A6IDEuMXJlbTtcXG4gICAgd2lkdGg6IDEuODY3cmVtO1xcbiAgICBoZWlnaHQ6IDFyZW07XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMXJlbTtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogdHlwZXRleHQxIDEuNXMgbGluZWFyIDBzIGluZmluaXRlO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgdHlwZXRleHQxIHtcXG4gICAgMCUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwMCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAxcmVtO1xcbiAgICB9XFxuXFxuICAgIDE2JSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTAwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDFyZW07XFxuICAgIH1cXG4gICAgMTYuNjY3JSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtODMuMzMzJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuODMzcmVtO1xcbiAgICB9XFxuXFxuICAgIDMzJSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtODMuMzMzJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuODMzcmVtO1xcbiAgICB9XFxuICAgIDMzLjMzMyUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTY2LjY2NiUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjY2NnJlbTtcXG4gICAgfVxcblxcbiAgICA0OS45OTklIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC02Ni42NjYlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC42NjZyZW07XFxuICAgIH1cXG4gICAgNTAlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjVyZW07XFxuICAgIH1cXG5cXG4gICAgNjYlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjVyZW07XFxuICAgIH1cXG4gICAgNjYuNjY2JSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMzMuMzMzJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuMzMzcmVtO1xcbiAgICB9XFxuXFxuICAgIDgzJSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMzMuMzMzJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuMzMzcmVtO1xcbiAgICB9XFxuICAgIDgzLjMzMyUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTE2LjY2NyUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjE2N3JlbTtcXG4gICAgfVxcblxcbiAgICA5OS45OTklIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xNi42NjclKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC4xNjdyZW07XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XFxuICAgIH1cXG59XFxuXFxuXFxuI3BvcCAucG9wVGlwMiB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGVmdDogMC44NjdyZW07XFxuICAgIHRvcDogNC42OHJlbTtcXG4gICAgd2lkdGg6IDEuODY3cmVtO1xcbiAgICBoZWlnaHQ6IDEuNTczcmVtO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDEuNTczcmVtO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiB0eXBldGV4dDIgMnMgbGluZWFyIDBzIGluZmluaXRlO1xcbn1cXG5cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgdHlwZXRleHQyIHtcXG4gICAgMCUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwMCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAxLjU3M3JlbTtcXG4gICAgfVxcblxcbiAgICA5Ljk5OSUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwMCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAxLjU3M3JlbTtcXG4gICAgfVxcbiAgICAxMCUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTkwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDEuNDE1cmVtO1xcbiAgICB9XFxuXFxuICAgIDE5Ljk5OSUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTkwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDEuNDE1cmVtO1xcbiAgICB9XFxuICAgIDIwJSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtODAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMS4yNThyZW07XFxuICAgIH1cXG5cXG4gICAgMjkuOTk5JSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtODAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMS4yNThyZW07XFxuICAgIH1cXG4gICAgMzAlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC03MCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAxLjEwMXJlbTtcXG4gICAgfVxcblxcbiAgICAzOS45OTklIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC03MCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAxLjEwMXJlbTtcXG4gICAgfVxcbiAgICA0MCUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTYwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuOTQzOHJlbTtcXG4gICAgfVxcblxcbiAgICA0OS45OTklIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC02MCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjk0MzhyZW07XFxuICAgIH1cXG4gICAgNTAlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjc4NjVyZW07XFxuICAgIH1cXG5cXG4gICAgNTkuOTk5JSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC43ODY1cmVtO1xcbiAgICB9XFxuICAgIDYwJSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNDAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC42MjkycmVtO1xcbiAgICB9XFxuXFxuICAgIDY5Ljk5OSUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTQwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuNjI5MnJlbTtcXG4gICAgfVxcbiAgICA3MCUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTMwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuNDcxOXJlbTtcXG4gICAgfVxcblxcbiAgICA3OS45OTklIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjQ3MTlyZW07XFxuICAgIH1cXG4gICAgODAlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0yMCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjMxNDZyZW07XFxuICAgIH1cXG5cXG4gICAgODkuOTk5JSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMjAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC4zMTQ2cmVtO1xcbiAgICB9XFxuICAgIDkwJSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC4xNTczcmVtO1xcbiAgICB9XFxuXFxuICAgIDk5Ljk5OSUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuMTU3M3JlbTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwO1xcbiAgICB9XFxufVxcblxcbiNwb3AgLnBvcEljb24ge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxlZnQ6IDEuMDRyZW07XFxuICAgIHRvcDogMi4yMjZyZW07XFxuICAgIHdpZHRoOiAxLjhyZW07XFxuICAgIGhlaWdodDogMi4yNTNyZW07XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMDtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1zaXplOiAzLjZyZW0gMi4yNTNyZW07XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzcHJpdGVzIDFzIGxpbmVhciAwcyBpbmZpbml0ZTtcXG59XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIHNwcml0ZXMge1xcbiAgICAwJSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XFxuICAgIH1cXG5cXG4gICAgNDkuOTk5JSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XFxuICAgIH1cXG5cXG4gICAgNTAlIHtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IC0xLjhyZW0gMDtcXG4gICAgfVxcblxcbiAgICAxMDAlIHtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IC0xLjhyZW0gMDtcXG4gICAgfSBcXG59XFxuXFxuI3BvcCAudGl0bGUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiA1cmVtO1xcbiAgICBsZWZ0OiAzcmVtO1xcbiAgICB0b3A6IDEuNjkzcmVtO1xcbiAgICBmb250LXNpemU6IDE2cHg7XFxuICAgIGNvbG9yOiAjRkZGO1xcbiAgICB0ZXh0LXNoYWRvdzpcXG4gICAgICAgIDJweCAwIDJweCByZ2JhKDAsIDIwMywgMjI3LCAwLjMpLFxcbiAgICAgICAgMCAycHggMnB4IHJnYmEoMCwgMjAzLCAyMjcsIDAuMyksIFxcbiAgICAgICAgMCAtMnB4IDJweCByZ2JhKDAsIDIwMywgMjI3LCAwLjMpLFxcbiAgICAgICAgLTJweCAwIDJweCByZ2JhKDAsIDIwMywgMjI3LCAwLjMpO1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbn1cXG5cXG4jcG9wIC50ZXh0IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogNXJlbTtcXG4gICAgbGVmdDogM3JlbTtcXG4gICAgdG9wOiAyLjU4NnJlbTtcXG4gICAgZm9udC1zaXplOiAxMnB4O1xcbiAgICBjb2xvcjogIzAwY2JlMztcXG4gICAgdGV4dC1zaGFkb3c6XFxuICAgICAgICAxcHggMCAxcHggcmdiYSgwLCAyMDMsIDIyNywgMC4zKSxcXG4gICAgICAgIDAgMXB4IDFweCByZ2JhKDAsIDIwMywgMjI3LCAwLjMpLCBcXG4gICAgICAgIDAgLTFweCAxcHggcmdiYSgwLCAyMDMsIDIyNywgMC4zKSxcXG4gICAgICAgIC0xcHggMCAxcHggcmdiYSgwLCAyMDMsIDIyNywgMC4zKTtcXG59XFxuXFxuI3BvcCAucG9wQ2xvc2Uge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxlZnQ6IDA7XFxuICAgIGJvdHRvbTogMC41NDZyZW07XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEuMnJlbTtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxLjJyZW0gMS4ycmVtO1xcbn1cXG5cXG4jcG9wLnNoYXJlYmxlIC5wb3BDbG9zZSB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbiNwb3AgLmJ0bnMge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgLXdlYmtpdC1ib3gtcGFjazogY2VudGVyO1xcbiAgICAtd2Via2l0LWJveC1hbGlnbjogY2VudGVyOyBcXG4gICAgcGFkZGluZy10b3A6IDAuNXJlbTtcXG59XFxuXFxuI3BvcC5zaGFyZWJsZSAuYnRuc3tcXG4gICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxufVxcblxcbiNwb3AgLnBvcEJ0biB7XFxuICAgIHdpZHRoOiAyLjY4cmVtO1xcbiAgICBoZWlnaHQ6IDAuNzczcmVtO1xcbiAgICBsaW5lLWhlaWdodDogMC43NzNyZW07XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgY29sb3I6ICNGRkY7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMDtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xcbiAgICBtYXJnaW46IDAgMC40cmVtO1xcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMjUuMEBjc3MtbG9hZGVyIS4vc3JjL3BvcC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDE2NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgbG9hZGluZzoge1xuICAgICAgICB0ZXh0czogW1xuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFsn5qyi6L+O5p2l5YiwVEdQ5ri45oiP5LiW55WMJ10sXG4gICAgICAgICAgICAgICAgWyfmrKLov47mnaXliLBUR1DmuLjmiI/kuJbnlYwnXSxcbiAgICAgICAgICAgICAgICBbJ+asoui/juadpeWIsFRHUOa4uOaIj+S4lueVjCddLFxuICAgICAgICAgICAgICAgIFsn5qyi6L+O5p2l5YiwVEdQ5ri45oiP5LiW55WMJ11cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgWyfmrKLov47mnaXliLBUR1DmuLjmiI/kuJbnlYwnXSxcbiAgICAgICAgICAgICAgICBbJ+asoui/juadpeWIsFRHUOa4uOaIj+S4lueVjCddLFxuICAgICAgICAgICAgICAgIFsn5qyi6L+O5p2l5YiwVEdQ5ri45oiP5LiW55WMJ11cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgWyfmrKLov47mnaXliLBUR1DmuLjmiI/kuJbnlYwnXSxcbiAgICAgICAgICAgICAgICBbJ+asoui/juadpeWIsFRHUOa4uOaIj+S4lueVjCddLFxuICAgICAgICAgICAgICAgIFsn5qyi6L+O5p2l5YiwVEdQ5ri45oiP5LiW55WMJ10sXG4gICAgICAgICAgICAgICAgWyfmrKLov47mnaXliLBUR1DmuLjmiI/kuJbnlYwnXSxcbiAgICAgICAgICAgICAgICBbJ+asoui/juadpeWIsFRHUOa4uOaIj+S4lueVjCddXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIFsn5qyi6L+O5p2l5YiwVEdQ5ri45oiP5LiW55WMJ10sXG4gICAgICAgICAgICAgICAgWyfmrKLov47mnaXliLBUR1DmuLjmiI/kuJbnlYwnXSxcbiAgICAgICAgICAgICAgICBbJ+asoui/juadpeWIsFRHUOa4uOaIj+S4lueVjCddLFxuICAgICAgICAgICAgICAgIFsn5qyi6L+O5p2l5YiwVEdQ5ri45oiP5LiW55WMJ11cbiAgICAgICAgICAgIF0gICBcbiAgICAgICAgXVxuICAgIH0sXG5cbiAgICBnbDogeyAvLyDlvIDlnLrlvJXlr7xcbiAgICAgICAgdHlwZTogJ3BvcHVwJyxcbiAgICAgICAgdGl0bGU6ICfmrKLov47mnaXliLBUR1DmuLjmiI/kuJbnlYwnLFxuICAgICAgICB0ZXh0OiAn5pWj5biD5Zyo5a6H5a6Z5Lit55qE56We56eY5Yqb6YeP77yM5om+5Yiw5LuW5Lus77yM56We56eY4oCc6bih6IW/4oCd5Zyo562J5L2gJyxcbiAgICAgICAgc2hhcmVibGU6IGZhbHNlLFxuICAgICAgICBiZ1R5cGU6IDFcbiAgICB9LFxuXG4gICAgZm91bmQ1OiB7IC8vIOaJvuWIsDXkuKpcbiAgICAgICAgdHlwZTogJ3RpcCcsXG4gICAgICAgIHRpcDogJ+i1nu+8geW3suWPkeeOsDXkuKrmuLjmiI/mmJ/nkIPjgII8YnIvPuelnuenmOKAnem4oeiFv+KAneWwseWcqOaYn+epuua3seWkhO+8jOetieS9oOWTn++8gScsXG4gICAgICAgIGJnVHlwZTogMVxuICAgIH0sXG5cbiAgICBmb3VuZDE1OiB7IC8vIOaJvuWIsDE15LiqXG4gICAgICAgIHR5cGU6ICd0aXAnLFxuICAgICAgICB0aXA6ICfllYrvvIHov5jlt6415Liq77yBPGJyLz7nprvigJzpuKHohb/igJ3ov5jlt6415Liq77yBJyxcbiAgICAgICAgYmdUeXBlOiAyXG4gICAgfSxcblxuICAgIGZvdW5kMjA6IHsgLy8g5om+5YiwMjDkuKpcbiAgICAgICAgdHlwZTogJ3BvcHVwJyxcbiAgICAgICAgdGl0bGU6ICfmib7liLDlhajpg6jmuLjmiI/mmJ/nkIPvvIEnLFxuICAgICAgICB0ZXh0OiAn5oiR5Y6777yB5L2g6L+Y55yf5om+5YWo5LqG77yBPGJyLz7nu5not6rvvIzor7fmlLbkuIvmiJHnmoTpuKHohb/vvIEnLFxuICAgICAgICBiZ1R5cGU6IDMsXG4gICAgICAgIHNoYXJlYmxlOiB0cnVlXG4gICAgfSxcblxuICAgIGJsYWNrc2hlZXB3YWxsOiB7IC8vIOWcsOWbvuWFqOW8gFxuICAgICAgICB0eXBlOiAncG9wdXAnLFxuICAgICAgICB0aXRsZTogJ+aOoue0ouS6huaVtOS4quWuh+Wume+8gScsXG4gICAgICAgIHRleHQ6ICfli6TlpYvnmoTlsJHlubTvvIzlroflrpnmmK/kuI3mmK/lhYXmu6HkuoblpaXlppnvvIzljrtUR1DnmoTmuLjmiI/kuJbnlYzvvIzpgqPph4zkuZ/mmK/kuIDmoLfjgIInLFxuICAgICAgICBiZ1R5cGU6IDIsXG4gICAgICAgIHNoYXJlYmxlOiB0cnVlXG4gICAgfSxcblxuICAgIGdnOiB7IC8v5Zyw5Zu+5YWo5byAICsg5om+5YiwMjDkuKpcbiAgICAgICAgdHlwZTogJ3BvcHVwJyzCoFxuICAgICAgICB0aXRsZTogJ+aJvuWIsOWFqOmDqOa4uOaIj+aYn+eQg++8gScsXG4gICAgICAgIHRleHQ6ICfoh7PmraTkvaDlt7LnnIvlrozvvIzlpaXlppnnmoTlroflrpnlkoznurfnuYHnmoRUR1DkuJbnlYzvvIzkvaDlj6/ku6XljrvliIbkuqvkuobjgIInLFxuICAgICAgICBiZ1R5cGU6IDMsXG4gICAgICAgIHNoYXJlYmxlOiB0cnVlXG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90ZXh0Q29uZmlnLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==