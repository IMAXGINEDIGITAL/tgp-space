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
	
	var _opening = __webpack_require__(133);
	
	var _opening2 = _interopRequireDefault(_opening);
	
	var _helloWorld = __webpack_require__(139);
	
	var _helloWorld2 = _interopRequireDefault(_helloWorld);
	
	var _cloud = __webpack_require__(142);
	
	var _cloud2 = _interopRequireDefault(_cloud);
	
	var _star = __webpack_require__(143);
	
	var _star2 = _interopRequireDefault(_star);
	
	var _elements = __webpack_require__(144);
	
	var _map = __webpack_require__(147);
	
	var _map2 = _interopRequireDefault(_map);
	
	var _ticker = __webpack_require__(150);
	
	var _ticker2 = _interopRequireDefault(_ticker);
	
	var _pop = __webpack_require__(166);
	
	var _pop2 = _interopRequireDefault(_pop);
	
	var _textConfig = __webpack_require__(169);
	
	var _textConfig2 = _interopRequireDefault(_textConfig);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var preload = _util.win.assetsPreload,
	    items = _util.win.assetsItems;
	
	
	var viewport = (0, _util.query)(_util.doc.body, '#game');
	var scroller = void 0;
	var ticker = void 0;
	var stage = void 0;
	var opening = void 0;
	var helloWorld = void 0;
	var cloud = void 0;
	var star = void 0;
	var staticElements = void 0;
	var animeElements = void 0;
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
	
	    pop && pop.popup({
	        title: config.title,
	        text: config.text,
	        shareble: true,
	        bgType: config.bgType,
	        onleftclick: function onleftclick() {
	            // pop.close().then(() => scroller.enable = true);
	        },
	        onrightclick: function onrightclick() {
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
	    // opening
	    opening = new _opening2.default(viewport, items);
	    return opening.ready().then(function () {
	        var frameId = ticker.add(opening.play());
	        var starId = ticker.add(opening.star());
	
	        return _util.Promise.all([ticker.end(frameId), ticker.end(starId)]);
	    }).then(function () {
	        return opening.chicken().then(function () {
	            return (0, _util.delay)(2000);
	        });
	    }).then(function () {
	        return opening.ending();
	    });
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
	    scroller = new _scroller2.default(stage.width, stage.height, stage.vw, stage.vh, 0.3);
	    scroller.enable = false;
	    return scroller.ready();
	}).then(function () {
	    // things
	    var promises = [];
	
	    // staticElements = new StaticElements(stage, items);
	    // promises.push(staticElements.ready());
	
	    // animeElements = new AnimeElements(stage, items);
	    // promises.push(animeElements.ready());
	
	    cloud = new _cloud2.default(stage, items);
	    promises.push(cloud.ready());
	
	    star = new _star2.default(stage, items);
	    promises.push(star.ready());
	
	    return _util.Promise.all(promises);
	}).then(function () {
	    // render
	    var firstRendered = false;
	    var scrollX = 0;
	    var scrollY = 0;
	    // let playAnimeId;
	    var clearCloudId = void 0;
	    var starRollY = stage.vh;
	    var starRollId = ticker.add(function () {
	        starRollY -= starRollSpeed;
	        if (starRollY < 0) {
	            starRollY = stage.vh;
	        }
	    });
	    var starRollSpeed = 1;
	
	    scroller.on('scrollstart', function (e) {
	        if (clearCloudId) {
	            ticker.delete(clearCloudId);
	            clearCloudId = null;
	        }
	
	        // if (playAnimeId) {
	        //     ticker.delete(playAnimeId);
	        //     playAnimeId = null;
	        // }
	    });
	
	    scroller.on('scrolling', function (e) {
	        scrollX = e.x;
	        scrollY = e.y;
	        // const [hover, related] = stage.getHoverSlice(scrollX, scrollY);
	        // staticElements.drawImages(scrollX, scrollY);
	        // animeElements.drawImages(scrollX, scrollY);
	        // cloud.drawImages([hover, ...related]);
	    });
	
	    scroller.on('scrollend', function (e) {
	        var focusSlice = stage.getFocusSlice(scrollX, scrollY);
	        if (focusSlice) {
	            clearCloudId = ticker.add(cloud.clear(focusSlice));
	        }
	    });
	
	    scroller.on('tap', function (e) {
	        // if (e.originalEvent.target === stage.canvas) {
	        //     playAnimeId = ticker.add(animeElements.play(e.ex, e.ey));
	        // }
	    });
	
	    ticker.on('aftertick', function (e) {
	        elementCount && elementCount.update(stage.specialAmount, stage.specialFound);
	
	        var hoverSlice = stage.getHoverSlice(scrollX, scrollY);
	        // if (!firstRendered
	        //         || scroller.isScrolling
	        //         // || ticker.has(playAnimeId)
	        //         || ticker.has(clearCloudId)
	        //         || ticker.has(starRollId)
	        //     ) {
	
	        // if (ticker.has(playAnimeId)) {
	        //     animeElements.drawImages(scrollX, scrollY);
	        // }
	
	        // if (!firstRendered
	        // || ticker.has(clearCloudId)) {
	        cloud.drawImages(hoverSlice, scrollX, scrollY);
	        // }
	
	        // if (!firstRendered
	        // || scroller.isScrolling
	        //         || ticker.has(playAnimeId)
	        // || ticker.has(clearCloudId)) {
	        stage.offscreenRender.clearRect(0, 0, stage.vw, stage.vh);
	        //     stage.offscreenRender.drawImage(staticElements.canvas, 0, 0, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);
	        //     stage.offscreenRender.drawImage(animeElements.canvas, 0, 0, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);
	        stage.offscreenRender.drawImage(star.image, 0, starRollY, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);
	        stage.offscreenRender.drawImage(cloud.canvas, 0, 0, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);
	        // }
	
	        stage.render.clearRect(0, 0, stage.vw, stage.vh);
	        stage.render.drawImage(stage.offscreenCanvas, 0, 0, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);
	        // }
	    });
	}).then(function () {
	    // show helloworld
	    var tickerId = ticker.add(helloWorld.play());
	    return ticker.end(tickerId).then(function () {
	        return (0, _util.delay)(2000);
	    }).then(function () {
	        return helloWorld.ending();
	    });
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
	        var focusSlice = stage.getFocusSlice(e.x, e.y);
	        if (focusSlice && focusSlice.distance) {
	            map.text(focusSlice.distance);
	        }
	    });
	
	    return map.ready();
	}).then(function () {
	    // pop
	    pop = new _pop2.default(viewport);
	    return pop.ready();
	}).then(function () {
	    // elements count
	    elementCount = new _elements.ElementCount(viewport, items);
	
	    elementCount.on('found', function (_ref) {
	        var found = _ref.found,
	            amount = _ref.amount,
	            time = _ref.time;
	
	        var config = _textConfig2.default['found' + found];
	
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
	    // show guide
	    showTip(_textConfig2.default.guide);
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
	
	            if (h > 1) {
	                related.push(this.slices[index - 1]);
	            }
	
	            if (v < this.vSlice - 1) {
	                related.push(this.slices[index + this.hSlice]);
	            }
	
	            if (v > 1) {
	                related.push(this.slices[index - this.hSlice]);
	            }
	
	            if (h < this.hSlice - 1 && v < this.vSlice - 1) {
	                related.push(this.slices[index + this.hSlice + 1]);
	            }
	
	            if (h > 1 && v > 1) {
	                related.push(this.slices[index - this.hSlice - 1]);
	            }
	
	            return [hover].concat(related).map(function (slice) {
	                slice.hovered = true;
	                return slice;
	            });
	        }
	    }, {
	        key: 'getFocusSlice',
	        value: function getFocusSlice(scrollX, scrollY) {
	            var cx = scrollX + this.sliceWidth / 2;
	            var cy = scrollY + this.sliceHeight / 2;
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
	                return slice.special;
	            }).length;
	        }
	    }, {
	        key: 'specialFound',
	        get: function get() {
	            return this.slices.filter(function (slice) {
	                return slice.special && slice.found;
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
	
	                    var args = [param.img, param.x, param.y];
	
	                    if (param.width != null) {
	                        args.push(param.width);
	                    }
	                    if (param.height != null) {
	                        args.push(param.height);
	                    }
	
	                    if (param.sx != null) {
	                        args.push(param.sx);
	                    }
	                    if (param.sx != null) {
	                        args.push(param.sx);
	                    }
	                    if (param.sw != null) {
	                        args.push(param.sw);
	                    }
	                    if (param.sh != null) {
	                        args.push(param.sh);
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
	    '113': {
	        distance: '4150万公里'
	    },
	    '121': {
	        distance: '0公里',
	        special: true
	    },
	    '123': {
	        distance: '38.44万公里',
	        special: true
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
	
	var _keys = __webpack_require__(134);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _slicedToArray2 = __webpack_require__(125);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _classCallCheck2 = __webpack_require__(66);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(67);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	__webpack_require__(137);
	
	var _util = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Opening = function () {
	    function Opening(viewport, items) {
	        (0, _classCallCheck3.default)(this, Opening);
	
	        this.viewport = viewport;
	        this.wrapEl = (0, _util.query)(viewport, '#opening');
	        this.items = items;
	    }
	
	    (0, _createClass3.default)(Opening, [{
	        key: 'star',
	        value: function star() {
	            var _this = this;
	
	            var duration = this.duration;
	            var count = this.starsCount;
	            var limit = 3;
	            var els = [];
	            var ratio = 0.1;
	
	            for (var i = 0; i < limit; i++) {
	                var el = _util.doc.createElement('div');
	                el.className = 'star';
	                el.idle = true;
	                els.push(el);
	            }
	
	            var randomStar = function randomStar() {
	                var n = parseInt(Math.random() * count) + 1;
	                return _this.items['openingStar' + n].src;
	            };
	
	            var getIdleEl = function getIdleEl() {
	                return els.filter(function (el) {
	                    return el.idle;
	                })[0];
	            };
	
	            var randomStart = function randomStart() {
	                var x = _this.boneX + (Math.random() * 10 - 5);
	                var y = _this.boneY + (Math.random() * 10 - 5);
	                var scale = Math.random() * 0.1;
	                var rotate = Math.random() * 16 - 8;
	                return [x, y, scale, rotate];
	            };
	
	            var randomEnd = function randomEnd() {
	                var n = parseInt(Math.random() * 4);
	                var x = void 0;
	                var y = void 0;
	
	                if (n === 0) {
	                    x = -Math.random() * 125 - 125;
	                    y = Math.random() * _this.height;
	                } else if (n === 1) {
	                    x = Math.random() * _this.width;
	                    y = -Math.random() * 125 - 125;
	                } else if (n === 2) {
	                    x = _this.width + Math.random() * 125 + 125;
	                    y = _this.height * Math.random();
	                } else if (n === 3) {
	                    x = _this.width * Math.random();
	                    y = _this.height + Math.random() * 125 + 125;
	                }
	
	                var scale = Math.random() * 0.2 + 0.8;
	                var rotate = Math.random() * 16 - 8;
	
	                return [x, y, scale, rotate];
	            };
	
	            return function (_ref) {
	                var elapsed = _ref.elapsed,
	                    delta = _ref.delta;
	
	                if (elapsed > duration) {
	                    _this.wrapEl.innerHTML = '';
	                    return true;
	                }
	
	                var el = void 0;
	                if (Math.random() < ratio && (el = getIdleEl())) {
	                    (function () {
	                        var starSrc = randomStar();
	
	                        var _randomStart = randomStart(),
	                            _randomStart2 = (0, _slicedToArray3.default)(_randomStart, 4),
	                            startX = _randomStart2[0],
	                            startY = _randomStart2[1],
	                            startScale = _randomStart2[2],
	                            startRotate = _randomStart2[3];
	
	                        var _randomEnd = randomEnd(),
	                            _randomEnd2 = (0, _slicedToArray3.default)(_randomEnd, 4),
	                            endX = _randomEnd2[0],
	                            endY = _randomEnd2[1],
	                            endScale = _randomEnd2[2],
	                            endRotate = _randomEnd2[3];
	
	                        var end = function end(e) {
	                            el.removeEventListener('webkitTransitionEnd', end);
	                            _this.wrapEl.removeChild(el);
	                            el.style.cssText = '';
	                            el.idle = true;
	                        };
	
	                        el.idle = false;
	                        el.style.webkitTransition = '-webkit-transform 0.4s ease-out 0s';
	                        el.style.webkitTransform = 'translate3d(' + startX + 'px, ' + startY + 'px, 0px) scale(' + startScale + ')  rotate(' + startRotate + 'deg)';
	                        el.style.backgroundImage = 'url(' + starSrc + ')';
	                        el.addEventListener('webkitTransitionEnd', end);
	
	                        _this.wrapEl.appendChild(el);
	
	                        (0, _util.raf)(function () {
	                            el.style.webkitTransform = 'translate3d(' + endX + 'px, ' + endY + 'px, 0px) scale(' + endScale + ') rotate(' + endRotate + 'deg)';
	                        });
	                    })();
	                }
	            };
	        }
	    }, {
	        key: 'chicken',
	        value: function chicken() {
	            var items = this.items;
	            var el = _util.doc.createElement('div');
	            el.className = 'chicken';
	            el.style.webkitTransition = '-webkit-transform 0.4s ease-out 0s';
	            el.style.webkitTransform = 'translate3d(' + this.boneX + 'px, ' + this.boneY + 'px, 0px) scale(0)';
	            el.style.backgroundImage = 'url(' + items['openingChicken'].src + ')';
	
	            this.wrapEl.innerHTML = '';
	            this.wrapEl.appendChild(el);
	
	            var width = this.width,
	                height = this.height;
	
	
	            return new _util.Promise(function (resolve, reject) {
	                var end = function end(e) {
	                    el.removeEventListener('webkitTransitionEnd', end);
	                    resolve();
	                };
	
	                el.addEventListener('webkitTransitionEnd', end);
	
	                (0, _util.raf)(function () {
	                    el.style.webkitTransform = 'translate3d(' + (width / 2 - 300 / 2) + 'px, ' + (height / 2 - 240 / 2) + 'px, 0px) scale(1)';
	                });
	            });
	        }
	    }, {
	        key: 'play',
	        value: function play() {
	            var _this2 = this;
	
	            var items = this.items;
	            var duration = this.duration;
	            var count = this.framesCount;
	            var index = 0;
	
	            return function (_ref2) {
	                var elapsed = _ref2.elapsed,
	                    delta = _ref2.delta;
	
	                if (elapsed <= duration) {
	                    _this2.wrapEl.style.backgroundImage = 'url(' + items['opening' + (index + 1)].src + ')';
	                    index++;
	                    index %= count;
	                } else {
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
	            var _this3 = this;
	
	            var items = this.items;
	
	            return new _util.Promise(function (resolve, reject) {
	                _this3.duration = 3000;
	
	                _this3.framesCount = (0, _keys2.default)(_this3.items).filter(function (key) {
	                    return key.match(/^opening\d+$/);
	                }).length;
	
	                _this3.starsCount = (0, _keys2.default)(_this3.items).filter(function (key) {
	                    return key.match(/^openingStar\d+$/);
	                }).length;
	
	                _this3.wrapEl.style.display = '';
	
	                var _getRect = (0, _util.getRect)(_this3.wrapEl),
	                    width = _getRect.width,
	                    height = _getRect.height;
	
	                _this3.width = width;
	                _this3.height = height;
	                _this3.boneX = _this3.width / 2;
	                _this3.boneY = _this3.width / 2;
	                resolve();
	            });
	        }
	    }]);
	    return Opening;
	}();
	
	exports.default = Opening;

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(135), __esModule: true };

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(136);
	module.exports = __webpack_require__(18).Object.keys;

/***/ },
/* 136 */
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
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(138);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/.0.25.0@css-loader/index.js!./opening.css", function() {
				var newContent = require("!!./../node_modules/.0.25.0@css-loader/index.js!./opening.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "#opening {\n    width: 100%;\n    height: 100%;\n    background-position: 0 center;\n    background-size: cover;\n    background-repeat: no-repeat;\n    position: absolute;\n    -webkit-tranform: translateZ(9999px);\n}\n\n#opening .star {\n    left: 0;\n    top: 0;\n    position: absolute;\n    width: 6.667rem;\n    height: 6.667rem;\n    background-repeat: no-repeat;\n    background-position: 0 0;\n    background-size: contain;\n    will-change: -webkit-transform;\n    -webkit-transform-origin: 0 0 0;\n}\n\n#opening .chicken {\n    left: 0;\n    top: 0;\n    position: absolute;\n    width: 7.96rem;\n    height: 6.32rem;\n    background-repeat: no-repeat;\n    background-position: left 0;\n    background-size: 16.133rem 6.32rem;\n    will-change: -webkit-transform;\n    -webkit-transform-origin: 0 0 0;\n    -webkit-animation: fly 0.2s linear 0s infinite;\n}\n\n@-webkit-keyframes fly {\n    0% {\n        background-position: left 0;\n    }\n\n    49.999% {\n        background-position: left 0;\n    }\n    50% {\n        background-position: right 0;\n    }\n\n    100% {\n        background-position: right 0;\n    }\n}", ""]);
	
	// exports


/***/ },
/* 139 */
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
	
	__webpack_require__(140);
	
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
	
	            var duration = 3000;
	            var times = 5;
	            var count = 6;
	
	            return function (_ref) {
	                var elapsed = _ref.elapsed,
	                    delta = _ref.delta;
	
	                if (elapsed <= duration) {
	                    var index = parseInt(count * times * elapsed / duration) % count;
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
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(141);
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
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "#helloworld {\n    width: 100%;\n    height: 100%;\n    background-position: 0 center;\n    background-size: 60rem 17.786rem;\n    background-repeat: no-repeat;\n    position: absolute;\n    -webkit-tranform: translateZ(9999px);\n}", ""]);
	
	// exports


/***/ },
/* 142 */
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
	        _this.sliceWidth = stage.width / stage.hSlice;
	        _this.sliceHeight = stage.height / stage.vSlice;
	        _this.items = items;
	        return _this;
	    }
	
	    (0, _createClass3.default)(Cloud, [{
	        key: 'drawImages',
	        value: function drawImages(slices, scrollX, scrollY) {
	            var params = [];
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = (0, _getIterator3.default)(slices), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var slice = _step.value;
	
	                    if (this.slices[String(slice.index)]) {
	                        var _slices$String = this.slices[String(slice.index)],
	                            x = _slices$String.x,
	                            y = _slices$String.y,
	                            width = _slices$String.width,
	                            height = _slices$String.height,
	                            canvas = _slices$String.canvas;
	
	
	                        params.push({
	                            x: x - width * 0.4 - scrollX,
	                            y: y - height * 0.4 - scrollY,
	                            width: width * 1.8,
	                            height: height * 1.8,
	                            img: canvas
	                        });
	                    }
	                }
	
	                // this.render.save();
	                // this.render.scale(3, 3);
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
	
	            this.draw(params);
	            // this.render.restore();
	        }
	    }, {
	        key: 'clear',
	        value: function clear(focusSilce) {
	            var _this2 = this;
	
	            var cleared = focusSilce.cleared,
	                index = focusSilce.index;
	
	
	            var slice = this.slices[String(index)];
	
	            if (slice) {
	                var _ret = function () {
	                    var img = slice.img,
	                        render = slice.render;
	
	
	                    if (!cleared) {
	                        var _ret2 = function () {
	                            var duration = 1500;
	
	                            return {
	                                v: {
	                                    v: function v(_ref) {
	                                        var delta = _ref.delta,
	                                            elapsed = _ref.elapsed;
	
	                                        if (elapsed <= duration) {
	                                            render.globalAlpha -= delta / duration;
	                                        } else {
	                                            render.globalAlpha = 0;
	                                            focusSilce.cleared = true;
	                                        }
	                                        render.clearRect(0, 0, _this2.sliceWidth, _this2.sliceHeight);
	                                        render.drawImage(img, 0, 0, _this2.sliceWidth, _this2.sliceHeight);
	                                        return focusSilce.cleared;
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
/* 143 */
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
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ElementCount = exports.AnimeElements = exports.StaticElements = undefined;
	
	var _slicedToArray2 = __webpack_require__(125);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _typeof2 = __webpack_require__(72);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _keys = __webpack_require__(134);
	
	var _keys2 = _interopRequireDefault(_keys);
	
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
	
	var _canvas = __webpack_require__(124);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var StaticElements = exports.StaticElements = function (_CanvasImage) {
	    (0, _inherits3.default)(StaticElements, _CanvasImage);
	
	    function StaticElements(stage, items) {
	        (0, _classCallCheck3.default)(this, StaticElements);
	
	        var _this = (0, _possibleConstructorReturn3.default)(this, (StaticElements.__proto__ || (0, _getPrototypeOf2.default)(StaticElements)).call(this, stage.vw, stage.vh));
	
	        _this.hSlice = stage.hSlice;
	        _this.vSlice = stage.vSlice;
	        _this.sliceWidth = stage.width / stage.hSlice;
	        _this.sliceHeight = stage.height / stage.vSlice;
	        _this.items = items;
	        return _this;
	    }
	
	    (0, _createClass3.default)(StaticElements, [{
	        key: 'drawImages',
	        value: function drawImages(scrollX, scrollY) {
	            var _this2 = this;
	
	            var x = parseInt(scrollX / this.sliceWidth);
	            var y = parseInt(scrollY / this.sliceHeight);
	            var index = y * this.hSlice + x;
	
	            var params = [];
	
	            var pushParams = function pushParams(index) {
	                var slice = _this2.slices[String(index)];
	                params.push({
	                    x: slice.x - scrollX,
	                    y: slice.y - scrollY,
	                    width: slice.width,
	                    height: slice.height,
	                    img: _this2.slices[index].img
	                });
	            };
	
	            if (this.slices[String(index)]) {
	                pushParams(index);
	            }
	
	            if (x < 4 && this.slices[String(index + 1)]) {
	                pushParams(index + 1);
	            }
	
	            if (y < 9 && this.slices[String(index + this.hSlice)]) {
	                pushParams(index + this.hSlice);
	            }
	
	            if (x < 4 && y < 9 && this.slices[String(index + this.hSlice + 1)]) {
	                pushParams(index + this.hSlice + 1);
	            }
	
	            this.draw(params);
	        }
	    }, {
	        key: 'ready',
	        value: function ready() {
	            var _this3 = this;
	
	            var loaded = [];
	            this.slices = {};
	
	            (0, _keys2.default)(this.items).filter(function (id) {
	                return id.indexOf('static-') === 0;
	            }).forEach(function (id) {
	                var item = _this3.items[id];
	                var index = parseInt(id.match(/^static-(\d+)$/)[1]);
	                var deferred = (0, _util.defer)();
	                var image = new Image();
	                image.onload = function () {
	                    return deferred.resolve();
	                };
	                image.src = item.src;
	                loaded.push(deferred.promise);
	
	                var x = (index - 1) % _this3.hSlice;
	                var y = parseInt((index - 1) / _this3.hSlice);
	
	                _this3.slices[String(index - 1)] = {
	                    img: image,
	                    x: x * _this3.sliceWidth,
	                    y: y * _this3.sliceHeight,
	                    width: _this3.sliceWidth,
	                    height: _this3.sliceHeight
	                };
	            });
	
	            return _util.Promise.all(loaded);
	        }
	    }]);
	    return StaticElements;
	}(_canvas.CanvasImage);
	
	var AnimeElements = exports.AnimeElements = function (_CanvasImage2) {
	    (0, _inherits3.default)(AnimeElements, _CanvasImage2);
	
	    function AnimeElements(stage, items) {
	        (0, _classCallCheck3.default)(this, AnimeElements);
	
	        var _this4 = (0, _possibleConstructorReturn3.default)(this, (AnimeElements.__proto__ || (0, _getPrototypeOf2.default)(AnimeElements)).call(this, stage.vw, stage.vh));
	
	        _this4.hSlice = stage.hSlice;
	        _this4.vSlice = stage.vSlice;
	        _this4.sliceWidth = stage.width / stage.hSlice;
	        _this4.sliceHeight = stage.height / stage.vSlice;
	        _this4.items = items;
	        return _this4;
	    }
	
	    (0, _createClass3.default)(AnimeElements, [{
	        key: 'drawImages',
	        value: function drawImages(scrollX, scrollY) {
	            var _this5 = this;
	
	            var x = parseInt(scrollX / this.sliceWidth);
	            var y = parseInt(scrollY / this.sliceHeight);
	            var index = y * this.hSlice + x;
	
	            var params = [];
	            var pushParams = function pushParams(index) {
	                var slice = _this5.slices[String(index)];
	                if (slice.frame < slice.imgs.length) {
	                    params.push({
	                        x: slice.x - scrollX,
	                        y: slice.y - scrollY,
	                        width: slice.width,
	                        height: slice.height,
	                        img: slice.imgs[slice.frame]
	                    });
	                }
	            };
	
	            if (this.slices[String(index)]) {
	                pushParams(index);
	            }
	
	            if (x < 4 && this.slices[String(index + 1)]) {
	                pushParams(index + 1);
	            }
	
	            if (y < 9 && this.slices[String(index + this.hSlice)]) {
	                pushParams(index + this.hSlice);
	            }
	
	            if (x < 4 && y < 9 && this.slices[String(index + this.hSlice + 1)]) {
	                pushParams(index + this.hSlice + 1);
	            }
	
	            this.draw(params);
	        }
	    }, {
	        key: 'play',
	        value: function play(ex, ey) {
	            var x = parseInt(ex / this.sliceWidth);
	            var y = parseInt(ey / this.sliceHeight);
	            var index = y * this.hSlice + x;
	            var slice = this.slices[String(index)];
	
	            if (slice && slice.frame < slice.imgs.length && !slice.completed) {
	                var _ret = function () {
	                    var duration = 1000;
	
	                    return {
	                        v: function v(_ref) {
	                            var delta = _ref.delta,
	                                elapsed = _ref.elapsed;
	
	                            var count = slice.imgs.length;
	                            var frame = Math.floor(count * (elapsed / duration));
	
	                            if (frame < count) {
	                                slice.frame = frame;
	                            } else {
	                                slice.completed = true;
	                                slice.frame = count - 1;
	                                return true;
	                            }
	                        }
	                    };
	                }();
	
	                if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
	            }
	        }
	    }, {
	        key: 'ready',
	        value: function ready() {
	            var _this6 = this;
	
	            var loaded = [];
	            this.slices = {};
	
	            (0, _keys2.default)(this.items).filter(function (id) {
	                return id.indexOf('anime-') === 0;
	            }).forEach(function (id) {
	                var item = _this6.items[id];
	
	                var _id$match$slice$filte = id.match(/^anime-(\d+)-(\d+)$/).slice(1, 3).filter(function (i) {
	                    return parseInt(i);
	                }),
	                    _id$match$slice$filte2 = (0, _slicedToArray3.default)(_id$match$slice$filte, 2),
	                    index = _id$match$slice$filte2[0],
	                    frame = _id$match$slice$filte2[1];
	
	                var deferred = (0, _util.defer)();
	                var image = new Image();
	                image.onload = function () {
	                    return deferred.resolve();
	                };
	                image.src = item.src;
	                loaded.push(deferred.promise);
	
	                var x = (index - 1) % _this6.hSlice;
	                var y = parseInt((index - 1) / _this6.hSlice);
	
	                var slice = _this6.slices[String(index - 1)];
	                if (!slice) {
	                    slice = _this6.slices[String(index - 1)] = {
	                        imgs: [],
	                        frame: 0,
	                        x: x * _this6.sliceWidth,
	                        y: y * _this6.sliceHeight,
	                        width: _this6.sliceWidth,
	                        height: _this6.sliceHeight
	                    };
	                }
	                slice.imgs[frame - 1] = image;
	            });
	
	            return _util.Promise.all(loaded);
	        }
	    }, {
	        key: 'amount',
	        get: function get() {
	            return (0, _keys2.default)(this.slices).length;
	        }
	    }, {
	        key: 'found',
	        get: function get() {
	            var _this7 = this;
	
	            return (0, _keys2.default)(this.slices).filter(function (i) {
	                return _this7.slices[i].completed;
	            }).length;
	        }
	    }]);
	    return AnimeElements;
	}(_canvas.CanvasImage);
	
	var ElementCount = exports.ElementCount = function (_Event) {
	    (0, _inherits3.default)(ElementCount, _Event);
	
	    function ElementCount(viewport, items) {
	        (0, _classCallCheck3.default)(this, ElementCount);
	
	        var _this8 = (0, _possibleConstructorReturn3.default)(this, (ElementCount.__proto__ || (0, _getPrototypeOf2.default)(ElementCount)).call(this));
	
	        _this8.step = 5;
	        _this8.wrapEl = (0, _util.query)(viewport, '#elements-count');
	        _this8.textEl = (0, _util.query)(_this8.wrapEl, '.text');
	        _this8.textNumberEl = (0, _util.query)(_this8.textEl, '.number');
	        _this8.textTipEl = (0, _util.query)(_this8.textEl, '.tip');
	        _this8.textBgEl = (0, _util.query)(_this8.textEl, '.bg');
	        _this8.barEl = (0, _util.query)(_this8.wrapEl, '.progress .bar');
	        _this8.found = 0;
	        _this8.amount = 0;
	        _this8.items = items;
	        return _this8;
	    }
	
	    (0, _createClass3.default)(ElementCount, [{
	        key: 'update',
	        value: function update(amount, found) {
	            if (found !== this.found || amount !== this.amount) {
	                this.textNumberEl.textContent = found + '/' + amount;
	                this.barEl.style.width = found / amount * 100 + '%';
	
	                if (found !== 0 && found % this.step === 0) {
	                    this.emit('found', {
	                        found: found,
	                        amount: amount,
	                        time: parseInt(found / this.step)
	                    });
	                }
	                this.found = found;
	                this.amount = amount;
	            }
	        }
	    }, {
	        key: 'show',
	        value: function show(_ref2) {
	            var _this9 = this;
	
	            var tip = _ref2.tip,
	                bgType = _ref2.bgType;
	
	            var items = this.items;
	
	            return new _util.Promise(function (resolve, reject) {
	                _this9.textTipEl.innerHTML = tip;
	                _this9.textBgEl.className = 'bg bg' + bgType;
	                _this9.textBgEl.style.backgroundImage = 'url(' + items['tipBg' + bgType].src + ')';
	                _this9.wrapEl.className = 'open';
	
	                (0, _util.delay)(400).then(function () {
	                    _this9.textTipEl.style.display = '';
	                    _this9.textBgEl.style.display = '';
	                    return (0, _util.delay)(3000);
	                }).then(function () {
	                    _this9.textTipEl.style.display = 'none';
	                    _this9.textBgEl.style.display = 'none';
	                    _this9.wrapEl.className = '';
	                    return (0, _util.delay)(400);
	                }).then(function () {
	                    resolve();
	                });
	            });
	        }
	    }, {
	        key: 'ready',
	        value: function ready() {
	            var _this10 = this;
	
	            return new _util.Promise(function (resolve, reject) {
	                _this10.wrapEl.style.display = '';
	                resolve(_this10);
	            });
	        }
	    }]);
	    return ElementCount;
	}(_event2.default);

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
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "#elements-count {\n    position: absolute;\n    right: 0.73rem;\n    top: 0.4rem;\n    color: #00ddf1;\n    font-size: 12px;\n    display: -webkit-box;\n    -webkit-box-pack: center;\n    -webkit-box-align: center;\n    background-repeat: no-repeat;\n    background-position: 0 center;\n    background-size: 1.106rem 0.413rem;\n}\n\n#elements-count .textWrap {\n    width: 1.106rem;\n    height: 0.413rem;\n    position: relative;\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAfCAYAAAA89UfsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAANdJREFUeNqclD0LgVEYho+P8lqMMsrMrkxkNCn8LYMfQTEYSBaTUjIZRcliUaQM5ON+6o1Fby53XZ06dXW+nvOE3PrUdM7F3SctsXQBCX+Zq4solZKiSCVLRSSo5IkqlSx5kaFSSDT88WfJkvZXRJLzz+ZRKeHfJpIsJZGiUkTUqGTJihyV3nVJJavLMpUshfAfWxyaEAPCVszIKk/RtpFIc7EhV34VPfq4I3Ek0kGMacHatm5EWokF+YQP0aE9Yip2RLqIPm1hA3Em0l5MaFvuinuQ9BJgAFqNIhUPhZOEAAAAAElFTkSuQmCC);\n    background-repeat: no-repeat;\n    background-position: right center;\n    background-size: 0.173rem 0.413rem;\n    overflow: visible;\n}\n\n#elements-count .text {\n    width: 1.3rem;\n    height: 0.5rem;\n    position: absolute;\n    border: 1px solid #00ddf1;\n    border-radius: 4px;\n    box-sizing: border-box;\n    right: 0.17rem;\n    top: -0.18rem;\n    box-shadow: 2px 3px 0px rgba(0, 221, 241, 0.5);\n    -webkit-transition: all 0.4s ease-in 0s;\n    overflow: visible;\n}\n\n#elements-count.open .text {\n    width: 5.8rem;\n    height: 2.3rem;\n    box-shadow: none;\n}\n\n#elements-count .text .number {\n    text-align: center;\n    position: absolute;\n    top: 0;\n    right: 0;\n    width: 1.3rem;\n    height: 0.5rem;\n    line-height: 0.5rem;\n    text-align: center;\n}\n\n#elements-count .text .tip {\n    position: absolute;\n    width: 3.306rem;\n    height: 1.24rem;\n    line-height: 1.2em;\n    left: 0.2rem;\n    top: 0.36rem;\n    font-size: 12px;\n    color: #00ddf1;\n}\n\n#elements-count .text .bg {\n    position: absolute;\n    left: 3.506rem;\n    top: 0.36rem;\n    background-repeat: no-repeat;\n    background-position: 0 0;\n    background-size: contain;\n}\n\n#elements-count .text .bg.bg1 {\n    width: 2.066rem;\n    height: 1.8rem;\n}\n\n#elements-count .text .bg.bg2 {\n    width: 2.253rem;\n    height: 1.946rem;\n}\n\n#elements-count .text .bg.bg3 {\n    width: 2.346rem;\n    height: 1.933rem;\n}\n\n#elements-count .progress {\n    box-sizing: border-box;\n    width: 1.8rem;\n    height: 0.3rem;\n    border: 1px solid #00ddf1;\n    border-radius: 0.15rem;\n    margin: 0 4px;\n}\n\n#elements-count .progress .bar{\n    width: 0;\n    height: 100%;\n    background-color: #00ddf1;\n    border-radius: 0.15rem;\n}", ""]);
	
	// exports


/***/ },
/* 147 */
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
	
	__webpack_require__(148);
	
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
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(149);
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
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "#stage-map {\n    position: absolute;\n    left: 0.5rem;\n    bottom: 0.5rem;\n    background-position: 0.4rem 0.7rem;\n    background-repeat: no-repeat;\n    background-size: 1.09rem 0.853rem;\n    height: 84px;\n    -webkit-transform: translateZ(999px);\n    display: -webkit-box;\n    -webkit-box-pack: center;\n    -webkit-box-align: center;\n}\n\n#stage-map .wrap {\n    border: 1px solid #016fa0;\n    box-sizing: border-box;\n    width: 30.3px;\n    height: 100%;\n    background-position: 0 0;\n    background-repeat: no-repeat;\n    background-size: contain;\n    background-color: #000;\n    overflow: hidden;\n    position: relative;\n}\n\n#stage-map .map {\n    width: 100%;\n    height: 100%;\n}\n\n#stage-map .indicator {\n    left: 0;\n    top: 0;\n    width: 4px;\n    height: 4px;\n    border-radius: 50%;\n    position: absolute;\n    background-color: rgb(50, 50, 50);\n    opacity: 0;\n    -webkit-animation: flash 0.4s linear 0s infinite alternate;\n}\n\n\n#stage-map .text {\n    background-image: url(data:image/png;base64,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);\n    background-size: 1.2rem;\n    background-position: center 0.2rem;\n    background-repeat: no-repeat;\n    box-sizing: border-box;\n    color: #00ddf1;\n    font-size: 12px;\n    width: 100px;\n    height: 100%;\n    line-height: 1.5em;\n    left: 0.1rem;\n    top: 1.8rem;\n    text-align: center;\n    padding-top: 50px;\n}\n\n#stage-map .text b {\n    font-size: 15px;\n    margin-top: 4px;\n    color: #FFF;\n}\n\n\n@-webkit-keyframes flash {\n    0% {\n        opacity: 0;\n    }\n\n    100% {\n        opacity: 1;\n    }\n}", ""]);
	
	// exports


/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;
	
	var _toConsumableArray2 = __webpack_require__(7);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	var _map = __webpack_require__(151);
	
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
	        key: 'run',
	        value: function run() {
	            var _this2 = this;
	
	            this.start = Date.now();
	            this.elapsed = 0;
	            this.delta = 0;
	
	            var tick = function tick() {
	                (0, _util.raf)(tick);
	
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
	            (0, _util.raf)(tick);
	
	            return true;
	        }
	    }]);
	    return Ticker;
	}(_event2.default);
	
	exports.default = Ticker;

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(152), __esModule: true };

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(93);
	__webpack_require__(10);
	__webpack_require__(75);
	__webpack_require__(153);
	__webpack_require__(163);
	module.exports = __webpack_require__(18).Map;

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(154);
	
	// 23.1 Map Objects
	module.exports = __webpack_require__(159)('Map', function(get){
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
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var dP          = __webpack_require__(22).f
	  , create      = __webpack_require__(35)
	  , redefineAll = __webpack_require__(155)
	  , ctx         = __webpack_require__(19)
	  , anInstance  = __webpack_require__(156)
	  , defined     = __webpack_require__(13)
	  , forOf       = __webpack_require__(157)
	  , $iterDefine = __webpack_require__(14)
	  , step        = __webpack_require__(78)
	  , setSpecies  = __webpack_require__(158)
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
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(21);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 156 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 157 */
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
/* 158 */
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
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global         = __webpack_require__(17)
	  , $export        = __webpack_require__(16)
	  , meta           = __webpack_require__(83)
	  , fails          = __webpack_require__(27)
	  , hide           = __webpack_require__(21)
	  , redefineAll    = __webpack_require__(155)
	  , forOf          = __webpack_require__(157)
	  , anInstance     = __webpack_require__(156)
	  , isObject       = __webpack_require__(24)
	  , setToStringTag = __webpack_require__(50)
	  , dP             = __webpack_require__(22).f
	  , each           = __webpack_require__(160)(0)
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
/* 160 */
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
	  , asc      = __webpack_require__(161);
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
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor = __webpack_require__(162);
	
	module.exports = function(original, length){
	  return new (speciesConstructor(original))(length);
	};

/***/ },
/* 162 */
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
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(16);
	
	$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(164)('Map')});

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var classof = __webpack_require__(59)
	  , from    = __webpack_require__(165);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    return from(this);
	  };
	};

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	var forOf = __webpack_require__(157);
	
	module.exports = function(iter, ITERATOR){
	  var result = [];
	  forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};


/***/ },
/* 166 */
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
	
	__webpack_require__(167);
	
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
	                onrightclick = _ref.onrightclick;
	
	            return new _util.Promise(function (resolve, reject) {
	                _this3.popEl.style.display = '';
	
	                _this3.titleEl.textContent = title;
	                _this3.textEl.innerHTML = text;
	
	                if (shareble) {
	                    _this3.popEl.className += ' shareble bg' + bgType;
	                }
	
	                var handler = function handler(e) {
	                    e.preventDefault();
	                    _this3.leftBtnEl.removeEventListener('tap', onLeftClick);
	                    _this3.rightBtnEl.removeEventListener('tap', onRightClick);
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
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(168);
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
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "#pop {\n    position: absolute;\n    left: 0;\n    top: 0;\n    background-color: rgba(255, 255, 255, 0.6);\n    -webkit-transform: translateZ(9999px);\n    width: 100%;\n    height: 100%;\n    display: -webkit-box;\n    -webkit-box-pack: center;\n    -webkit-box-align: center;\n}\n\n#pop .wrap {\n    background-position: 0 0;\n    background-repeat: no-repeat;\n    background-size: contain;\n    position: relative;\n}\n\n#pop .popPanel {\n    width: 4.26rem;\n    height: 7.84rem;\n    position: absolute;\n    background-repeat: no-repeat;\n    background-size: 8.52rem 7.84rem;\n    overflow: hidden;\n}\n\n#pop .popPanel.left {\n    left: 0;\n    top: 0;\n    background-position: -100% 0;\n}\n\n#pop .popPanel.right {\n    right: 0;\n    top: 0;\n    background-position: 200% 0;\n}\n\n#pop.open .popPanel.left {\n    -webkit-animation: openleftwin 0.4s ease-out 0s forwards;\n}\n\n#pop.open .popPanel.right {\n    -webkit-animation: openrightwin 0.4s ease-out 0s forwards;\n}\n\n#pop.close .popPanel.left {\n    -webkit-animation: closeleftwin 0.4s ease-in 0s forwards;\n}\n\n#pop.close .popPanel.right {\n    -webkit-animation: closerightwin 0.4s ease-in 0s forwards;\n}\n\n@-webkit-keyframes openleftwin {\n    0% {\n        background-position: -100% 0;\n    }\n\n    100% {\n        background-position: 0 0;\n    }\n}\n\n@-webkit-keyframes openrightwin {\n    0% {\n        background-position: 200% 0;\n    }\n\n    100% {\n        background-position: 100% 0;\n    }\n}\n\n@-webkit-keyframes closeleftwin {\n    0% {\n        background-position: 0 0;\n    }\n\n    100% {\n        background-position: -100% 0;\n    }\n}\n\n@-webkit-keyframes closerightwin {\n    0% {\n        background-position: 100% 0;\n    }\n\n    100% {\n        background-position: 200% 0;\n    }\n}\n\n#pop .content {\n    width: 8.53rem;\n    height: 7.84rem;\n    overflow: hidden;\n    position: relative;\n}\n\n#pop .popBg1 {\n    display: none;\n    position: absolute;\n    width: 4.36rem;\n    height: 3.346rem;\n    right: 5px;\n    bottom: 2px;\n    background-repeat: no-repeat;\n    background-position: 0 0;\n    background-size: contain;\n}\n\n#pop.bg1 .popBg1 {\n    display: block;\n}\n\n#pop .popBg2 {\n    display: none;\n    position: absolute;\n    width: 4.626rem;\n    height: 3.506rem;\n    right: 5px;\n    bottom: 2px;\n    background-repeat: no-repeat;\n    background-position: 0 0;\n    background-size: contain;\n}\n\n#pop.bg2 .popBg2 {\n    display: block;\n}\n\n#pop.shareble .popBg1 {\n    display: block;\n}\n\n#pop.shareble .popBg2 {\n    display: block;\n}\n\n#pop .popTip1 {\n    position: absolute;\n    left: 0.867rem;\n    top: 1.1rem;\n    width: 1.867rem;\n    height: 1rem;\n    background-position: 0 1rem;\n    background-repeat: no-repeat;\n    background-size: contain;\n    -webkit-animation: typetext1 1.5s linear 0s infinite;\n    overflow: hidden;\n}\n\n@-webkit-keyframes typetext1 {\n    0% {\n        -webkit-transform: translateY(-100%);\n        background-position: 0 1rem;\n    }\n\n    16% {\n        -webkit-transform: translateY(-100%);\n        background-position: 0 1rem;\n    }\n    16.667% {\n        -webkit-transform: translateY(-83.333%);\n        background-position: 0 0.833rem;\n    }\n\n    33% {\n        -webkit-transform: translateY(-83.333%);\n        background-position: 0 0.833rem;\n    }\n    33.333% {\n        -webkit-transform: translateY(-66.666%);\n        background-position: 0 0.666rem;\n    }\n\n    49.999% {\n        -webkit-transform: translateY(-66.666%);\n        background-position: 0 0.666rem;\n    }\n    50% {\n        -webkit-transform: translateY(-50%);\n        background-position: 0 0.5rem;\n    }\n\n    66% {\n        -webkit-transform: translateY(-50%);\n        background-position: 0 0.5rem;\n    }\n    66.666% {\n        -webkit-transform: translateY(-33.333%);\n        background-position: 0 0.333rem;\n    }\n\n    83% {\n        -webkit-transform: translateY(-33.333%);\n        background-position: 0 0.333rem;\n    }\n    83.333% {\n        -webkit-transform: translateY(-16.667%);\n        background-position: 0 0.167rem;\n    }\n\n    99.999% {\n        -webkit-transform: translateY(-16.667%);\n        background-position: 0 0.167rem;\n    }\n    100% {\n        -webkit-transform: translateY(0%);\n        background-position: 0 0;\n    }\n}\n\n\n#pop .popTip2 {\n    position: absolute;\n    left: 0.867rem;\n    top: 4.68rem;\n    width: 1.867rem;\n    height: 1.573rem;\n    background-position: 0 1.573rem;\n    background-repeat: no-repeat;\n    background-size: contain;\n    -webkit-animation: typetext2 2s linear 0s infinite;\n}\n\n\n@-webkit-keyframes typetext2 {\n    0% {\n        -webkit-transform: translateY(-100%);\n        background-position: 0 1.573rem;\n    }\n\n    9.999% {\n        -webkit-transform: translateY(-100%);\n        background-position: 0 1.573rem;\n    }\n    10% {\n        -webkit-transform: translateY(-90%);\n        background-position: 0 1.415rem;\n    }\n\n    19.999% {\n        -webkit-transform: translateY(-90%);\n        background-position: 0 1.415rem;\n    }\n    20% {\n        -webkit-transform: translateY(-80%);\n        background-position: 0 1.258rem;\n    }\n\n    29.999% {\n        -webkit-transform: translateY(-80%);\n        background-position: 0 1.258rem;\n    }\n    30% {\n        -webkit-transform: translateY(-70%);\n        background-position: 0 1.101rem;\n    }\n\n    39.999% {\n        -webkit-transform: translateY(-70%);\n        background-position: 0 1.101rem;\n    }\n    40% {\n        -webkit-transform: translateY(-60%);\n        background-position: 0 0.9438rem;\n    }\n\n    49.999% {\n        -webkit-transform: translateY(-60%);\n        background-position: 0 0.9438rem;\n    }\n    50% {\n        -webkit-transform: translateY(-50%);\n        background-position: 0 0.7865rem;\n    }\n\n    59.999% {\n        -webkit-transform: translateY(-50%);\n        background-position: 0 0.7865rem;\n    }\n    60% {\n        -webkit-transform: translateY(-40%);\n        background-position: 0 0.6292rem;\n    }\n\n    69.999% {\n        -webkit-transform: translateY(-40%);\n        background-position: 0 0.6292rem;\n    }\n    70% {\n        -webkit-transform: translateY(-30%);\n        background-position: 0 0.4719rem;\n    }\n\n    79.999% {\n        -webkit-transform: translateY(-30%);\n        background-position: 0 0.4719rem;\n    }\n    80% {\n        -webkit-transform: translateY(-20%);\n        background-position: 0 0.3146rem;\n    }\n\n    89.999% {\n        -webkit-transform: translateY(-20%);\n        background-position: 0 0.3146rem;\n    }\n    90% {\n        -webkit-transform: translateY(-10%);\n        background-position: 0 0.1573rem;\n    }\n\n    99.999% {\n        -webkit-transform: translateY(-10%);\n        background-position: 0 0.1573rem;\n    }\n    100% {\n        -webkit-transform: translateY(0);\n        background-position: 0 0;\n    }\n}\n\n#pop .popIcon {\n    position: absolute;\n    left: 1.04rem;\n    top: 2.226rem;\n    width: 1.8rem;\n    height: 2.253rem;\n    background-position: 0 0;\n    background-repeat: no-repeat;\n    background-size: 3.6rem 2.253rem;\n    -webkit-animation: sprites 1s linear 0s infinite;\n}\n\n@-webkit-keyframes sprites {\n    0% {\n        background-position: 0 0;\n    }\n\n    49.999% {\n        background-position: 0 0;\n    }\n\n    50% {\n        background-position: -1.8rem 0;\n    }\n\n    100% {\n        background-position: -1.8rem 0;\n    } \n}\n\n#pop .title {\n    position: absolute;\n    width: 5rem;\n    left: 3rem;\n    top: 1.693rem;\n    font-size: 16px;\n    color: #FFF;\n    text-shadow:\n        2px 0 2px rgba(0, 203, 227, 0.3),\n        0 2px 2px rgba(0, 203, 227, 0.3), \n        0 -2px 2px rgba(0, 203, 227, 0.3),\n        -2px 0 2px rgba(0, 203, 227, 0.3);\n}\n\n#pop .text {\n    position: absolute;\n    width: 5rem;\n    left: 3rem;\n    top: 2.586rem;\n    font-size: 12px;\n    color: #00cbe3;\n    text-shadow:\n        1px 0 1px rgba(0, 203, 227, 0.3),\n        0 1px 1px rgba(0, 203, 227, 0.3), \n        0 -1px 1px rgba(0, 203, 227, 0.3),\n        -1px 0 1px rgba(0, 203, 227, 0.3);\n}\n\n#pop .popClose {\n    position: absolute;\n    left: 0;\n    bottom: 0.546rem;\n    width: 100%;\n    height: 1.2rem;\n    background-position: center center;\n    background-repeat: no-repeat;\n    background-size: 1.2rem 1.2rem;\n}\n\n#pop.shareble .popClose {\n    display: none;\n}\n\n#pop .btns {\n    display: none;\n    width: 100%;\n    -webkit-box-pack: center;\n    -webkit-box-align: center; \n    padding-top: 0.5rem;\n}\n\n#pop.shareble .btns{\n    display: -webkit-box;\n}\n\n#pop .popBtn {\n    width: 2.68rem;\n    height: 0.773rem;\n    line-height: 0.773rem;\n    text-align: center;\n    color: #FFF;\n    background-position: 0 0;\n    background-repeat: no-repeat;\n    background-size: contain;\n    margin: 0 0.4rem;\n}", ""]);
	
	// exports


/***/ },
/* 169 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    guide: { // 开场引导
	        type: 'tip',
	        tip: '散布在宇宙中的神秘力量，找到他们，神秘“鸡腿”在等你',
	        bgType: 1
	    },
	
	    found5: { // 找到5个
	        type: 'tip',
	        tip: '赞！已发现5个游戏星球。神秘”鸡腿”就在星空深处，等你哟！',
	        bgType: 2
	    },
	
	    found15: { // 找到15个
	        type: 'tip',
	        tip: '啊！还差5个！<br>离“鸡腿”还差5个！',
	        bgType: 3
	    },
	
	    found20: { // 找到20个
	        type: 'popup',
	        title: '找到全部游戏星球！',
	        text: '我去！你还真找全了！<br>给跪，请收下我的鸡腿！',
	        bgType: 2
	    },
	
	    blacksheepwall: { // 地图全开
	        type: 'popup',
	        title: '找到全部游戏星球！',
	        text: '勤奋的少年，宇宙是不是充满了奥妙，去TGP的游戏世界，那里也是一样。',
	        bgType: 1
	    }
	};

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWQyNGE4ZTQwNWYwNGNiZDM3MTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuY3NzPzY3MzciLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuY3NzIiwid2VicGFjazovLy8uL34vLjAuMjUuMEBjc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4wLjEzLjFAc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvYXJyYXkvZnJvbS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RlZmluZWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXJhdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2h0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1ncG8uanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuZnJvbS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jYWxsLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jcmVhdGUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jbGFzc29mLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRldGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qtc2FwLmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuLmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sL2l0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1zdGVwLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MtZXh0LmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN5bWJvbC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWV0YS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fa2V5b2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0ta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi1leHQuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BuLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wZC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wub2JzZXJ2YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9oZWxwZXJzL2luaGVyaXRzLmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L3NldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXByb3RvLmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4wLjEuMEBnZXN0dXJlLWpzL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMC4zLjRAZXZlbnQtZW1pdHRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4wLjEuMUBkL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3QvYXNzaWduL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3QvYXNzaWduL2lzLWltcGxlbWVudGVkLmpzIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3QvYXNzaWduL3NoaW0uanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMC4xMC4xMkBlczUtZXh0L29iamVjdC9rZXlzL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3Qva2V5cy9pcy1pbXBsZW1lbnRlZC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4wLjEwLjEyQGVzNS1leHQvb2JqZWN0L2tleXMvc2hpbS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4wLjEwLjEyQGVzNS1leHQvb2JqZWN0L3ZhbGlkLXZhbHVlLmpzIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3Qvbm9ybWFsaXplLW9wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMC4xMC4xMkBlczUtZXh0L29iamVjdC9pcy1jYWxsYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4wLjEwLjEyQGVzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMC4xMC4xMkBlczUtZXh0L3N0cmluZy8jL2NvbnRhaW5zL2lzLWltcGxlbWVudGVkLmpzIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9zdHJpbmcvIy9jb250YWlucy9zaGltLmpzIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3QvdmFsaWQtY2FsbGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9zdGFnZS5jc3M/M2I4MiIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhZ2UuY3NzIiwid2VicGFjazovLy8uL3NyYy9jYW52YXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvaXMtaXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2xpY2VDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wZW5pbmcuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzLmpzIiwid2VicGFjazovLy8uL3NyYy9vcGVuaW5nLmNzcz8xY2ZkIiwid2VicGFjazovLy8uL3NyYy9vcGVuaW5nLmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvaGVsbG9Xb3JsZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaGVsbG93b3JsZC5jc3M/NDZjYiIsIndlYnBhY2s6Ly8vLi9zcmMvaGVsbG93b3JsZC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Nsb3VkLmpzIiwid2VicGFjazovLy8uL3NyYy9zdGFyLmpzIiwid2VicGFjazovLy8uL3NyYy9lbGVtZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZWxlbWVudHMuY3NzPzgxMGUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VsZW1lbnRzLmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFwLmpzIiwid2VicGFjazovLy8uL3NyYy9tYXAuY3NzPzljZGIiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpY2tlci5qcyIsIndlYnBhY2s6Ly8vLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL21hcC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vbWFwLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5tYXAuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvbGxlY3Rpb24tc3Ryb25nLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS1hbGwuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLWluc3RhbmNlLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mb3Itb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1zcGVjaWVzLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2xsZWN0aW9uLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1tZXRob2RzLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1zcGVjaWVzLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktc3BlY2llcy1jb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcubWFwLnRvLWpzb24uanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvbGxlY3Rpb24tdG8tanNvbi5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktZnJvbS1pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcG9wLmpzIiwid2VicGFjazovLy8uL3NyYy9wb3AuY3NzPzc2ZTgiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BvcC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RleHRDb25maWcuanMiXSwibmFtZXMiOlsicHJlbG9hZCIsImFzc2V0c1ByZWxvYWQiLCJpdGVtcyIsImFzc2V0c0l0ZW1zIiwidmlld3BvcnQiLCJib2R5Iiwic2Nyb2xsZXIiLCJ0aWNrZXIiLCJzdGFnZSIsIm9wZW5pbmciLCJoZWxsb1dvcmxkIiwiY2xvdWQiLCJzdGFyIiwic3RhdGljRWxlbWVudHMiLCJhbmltZUVsZW1lbnRzIiwiZWxlbWVudENvdW50IiwibWFwIiwicG9wIiwic2hvd1RpcCIsImNvbmZpZyIsInNob3ciLCJ0aXAiLCJiZ1R5cGUiLCJzaG93UG9wIiwiZW5hYmxlIiwicG9wdXAiLCJ0aXRsZSIsInRleHQiLCJzaGFyZWJsZSIsIm9ubGVmdGNsaWNrIiwib25yaWdodGNsaWNrIiwiY2xvc2UiLCJ0aGVuIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInJ1biIsInJlYWR5IiwiZnJhbWVJZCIsImFkZCIsInBsYXkiLCJzdGFySWQiLCJhbGwiLCJlbmQiLCJjaGlja2VuIiwiZW5kaW5nIiwid2lkdGgiLCJoZWlnaHQiLCJ2dyIsInZoIiwicHJvbWlzZXMiLCJwdXNoIiwiZmlyc3RSZW5kZXJlZCIsInNjcm9sbFgiLCJzY3JvbGxZIiwiY2xlYXJDbG91ZElkIiwic3RhclJvbGxZIiwic3RhclJvbGxJZCIsInN0YXJSb2xsU3BlZWQiLCJvbiIsImRlbGV0ZSIsIngiLCJ5IiwiZm9jdXNTbGljZSIsImdldEZvY3VzU2xpY2UiLCJjbGVhciIsInVwZGF0ZSIsInNwZWNpYWxBbW91bnQiLCJzcGVjaWFsRm91bmQiLCJob3ZlclNsaWNlIiwiZ2V0SG92ZXJTbGljZSIsImRyYXdJbWFnZXMiLCJvZmZzY3JlZW5SZW5kZXIiLCJjbGVhclJlY3QiLCJkcmF3SW1hZ2UiLCJpbWFnZSIsImNhbnZhcyIsInJlbmRlciIsIm9mZnNjcmVlbkNhbnZhcyIsInRpY2tlcklkIiwiaFNsaWNlIiwidlNsaWNlIiwieHAiLCJ5cCIsImRpc3RhbmNlIiwiZm91bmQiLCJhbW91bnQiLCJ0aW1lIiwidHlwZSIsImJvbmVYIiwiYm9uZVkiLCJzY3JvbGxUbyIsImd1aWRlIiwid2luIiwid2luZG93IiwiZG9jIiwiZG9jdW1lbnQiLCJQcm9taXNlIiwiY3JlYXRlanMiLCJhcHBlbmRTdHlsZSIsImNzc1RleHQiLCJzdHlsZSIsImNyZWF0ZUVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiYXBwZW5kQ2hpbGQiLCJkb21yZWFkeSIsInJlc29sdmUiLCJyZWplY3QiLCJyZWFkeVN0YXRlIiwiZGVmZXIiLCJkZWZlcnJlZCIsInByb21pc2UiLCJkZWxheSIsInNldFRpbWVvdXQiLCJxdWVyeSIsInNlbGVjdG9yIiwicXVlcnlTZWxlY3RvciIsInF1ZXJ5QWxsIiwicXVlcnlTZWxlY3RvckFsbCIsImdldFJlY3QiLCJlbCIsInJlY3RzIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiZ2V0RGlzdGFuY2UiLCJ4MSIsInkxIiwieDIiLCJ5MiIsIk1hdGgiLCJzcXJ0IiwibG9hZEltZyIsInNyYyIsIkltYWdlIiwib25sb2FkIiwiaW1nMkNhbnZhcyIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwicmFmIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiZm4iLCJjYWYiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsIndlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lIiwiaWQiLCJjbGVhclRpbWVvdXQiLCJTY3JvbGxlciIsInNjYWxlIiwiX2lzU2Nyb2xsaW5nIiwiX2VuYWJsZSIsIl9zY2FsZSIsImx4IiwibHkiLCJuYW1lIiwib3JpZ2luYWxFdmVudCIsImV4dHJhIiwia2V5IiwiZW1pdCIsImVtaXRUYXAiLCJfZW1pdCIsImV4IiwidG91Y2giLCJjbGllbnRYIiwiZXkiLCJjbGllbnRZIiwiZW1pdFN0YXJ0IiwiZW1pdFNjcm9sbCIsImVtaXRFbmQiLCJjYWxYWSIsIm5vU2NhbGUiLCJkaXNwbGFjZW1lbnRYIiwiZGlzcGxhY2VtZW50WSIsIm1pbiIsIm1heCIsIkV2ZW50IiwicHJvdG90eXBlIiwic2xpY2VXaWR0aCIsInNsaWNlSGVpZ2h0IiwiU3RhZ2UiLCJzdGFnZUVsIiwic2xpY2VzIiwidiIsImgiLCJpbmRleCIsIlN0cmluZyIsInBhcnNlSW50IiwiaG92ZXIiLCJnZXRTbGljZSIsInJlbGF0ZWQiLCJzbGljZSIsImhvdmVyZWQiLCJjeCIsImN5IiwiZHgiLCJkeSIsImZvY3VzZWQiLCJkaXNwbGF5IiwibGVuZ3RoIiwiZmlsdGVyIiwic3BlY2lhbCIsIkNhbnZhc0ltYWdlIiwiSFRNTENhbnZhc0VsZW1lbnQiLCJfaW1hZ2UiLCJwYXJhbXMiLCJsb2FkZWQiLCJwYXJhbSIsImltZyIsImZvckVhY2giLCJhcmdzIiwic3giLCJzdyIsInNoIiwidG9EYXRhVVJMIiwiQ2FudmFzUmVuZGVyIiwiX3Zpc2libGUiLCJfb2Zmc2NyZWVuIiwiT3BlbmluZyIsIndyYXBFbCIsImR1cmF0aW9uIiwiY291bnQiLCJzdGFyc0NvdW50IiwibGltaXQiLCJlbHMiLCJyYXRpbyIsImkiLCJjbGFzc05hbWUiLCJpZGxlIiwicmFuZG9tU3RhciIsIm4iLCJyYW5kb20iLCJnZXRJZGxlRWwiLCJyYW5kb21TdGFydCIsInJvdGF0ZSIsInJhbmRvbUVuZCIsImVsYXBzZWQiLCJkZWx0YSIsImlubmVySFRNTCIsInN0YXJTcmMiLCJzdGFydFgiLCJzdGFydFkiLCJzdGFydFNjYWxlIiwic3RhcnRSb3RhdGUiLCJlbmRYIiwiZW5kWSIsImVuZFNjYWxlIiwiZW5kUm90YXRlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbW92ZUNoaWxkIiwid2Via2l0VHJhbnNpdGlvbiIsIndlYmtpdFRyYW5zZm9ybSIsImJhY2tncm91bmRJbWFnZSIsImZyYW1lc0NvdW50IiwibWF0Y2giLCJIZWxsb1dvcmxkIiwidGltZXMiLCJiYWNrZ3JvdW5kUG9zaXRpb25YIiwiQ2xvdWQiLCJkcmF3IiwiZm9jdXNTaWxjZSIsImNsZWFyZWQiLCJnbG9iYWxBbHBoYSIsIm9iaiIsIlN0YXIiLCJTdGF0aWNFbGVtZW50cyIsInB1c2hQYXJhbXMiLCJpbmRleE9mIiwiaXRlbSIsIkFuaW1lRWxlbWVudHMiLCJmcmFtZSIsImltZ3MiLCJjb21wbGV0ZWQiLCJmbG9vciIsIkVsZW1lbnRDb3VudCIsInN0ZXAiLCJ0ZXh0RWwiLCJ0ZXh0TnVtYmVyRWwiLCJ0ZXh0VGlwRWwiLCJ0ZXh0QmdFbCIsImJhckVsIiwiTWFwIiwiY2FudmFzRWwiLCJpbmRpY2F0b3JFbCIsIm9wZW5lZCIsInN0ciIsImNXaWR0aCIsImNIZWlnaHQiLCJpV2lkdGgiLCJpSGVpZ2h0Iiwic1dpZHRoIiwic0hlaWdodCIsImZpbGxSZWN0IiwiZmlsbFN0eWxlIiwiZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uIiwiVGlja2VyIiwiX2lkIiwiX21hcEYiLCJfbWFwQyIsImYiLCJoYXMiLCJzZXQiLCJjYW5jZWwiLCJzdGFydCIsImdldCIsImMiLCJEYXRlIiwibm93IiwidGljayIsImtleXMiLCJQb3AiLCJwb3BFbCIsImNvbnRlbnRFbCIsImNsb3NlRWwiLCJ0aXRsZUVsIiwiYmcxRWwiLCJiZzJFbCIsImJ0bnNFbCIsImxlZnRCdG5FbCIsInJpZ2h0QnRuRWwiLCJ2aXNpYmlsaXR5IiwicmVwbGFjZSIsImhhbmRsZXIiLCJvbkxlZnRDbGljayIsIm9uUmlnaHRDbGljayIsImZvdW5kNSIsImZvdW5kMTUiLCJmb3VuZDIwIiwiYmxhY2tzaGVlcHdhbGwiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDdENBOztBQUNBOztBQVVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUtBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7S0FHbUJBLE8sYUFBZkMsYTtLQUNhQyxLLGFBQWJDLFc7OztBQUdKLEtBQUlDLFdBQVcsaUJBQU0sVUFBSUMsSUFBVixFQUFnQixPQUFoQixDQUFmO0FBQ0EsS0FBSUMsaUJBQUo7QUFDQSxLQUFJQyxlQUFKO0FBQ0EsS0FBSUMsY0FBSjtBQUNBLEtBQUlDLGdCQUFKO0FBQ0EsS0FBSUMsbUJBQUo7QUFD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QUVsQjs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsY0FBYSw0QkFBNEI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE9BQU87O0FBRXBCO0FBQ0EsY0FBYSwyQkFBMkI7QUFDeEM7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMEI7O0FBRTFCO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbklBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQSxVQUFTO0FBQ1Q7QUFDQTs7Ozs7OztBQzlEQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFRO0FBQ1IsZUFBYyxhQUFhLEdBQUcsZUFBZTtBQUM3QztBQUNBOzs7Ozs7O0FDUkE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU8sc0JBQXNCLEVBQUU7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsYUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3JCQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUUsWUFBWSxjQUFjO0FBQzVCOzs7Ozs7O0FDUEE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7O0FDTkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNMQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7Ozs7Ozs7QUNoQkE7O0FBRUE7O0FBRUEsa0NBQWlDLGtDQUFrQzs7Ozs7OztBQ0puRTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1BBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztBQ05BOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTEE7O0FBQ0E7O0FBUUE7O0FBR0E7Ozs7OztBQUVBLEtBQU1DLGFBQWEsR0FBbkI7QUFDQSxLQUFNQyxjQUFjLElBQXBCO0FBQ0EsS0FBTWxHLFNBQVMsQ0FBZjtBQUNBLEtBQU1DLFNBQVMsRUFBZjtBQUNBLEtBQU1uQyxRQUFRbUksYUFBYWpHLE1BQTNCO0FBQ0EsS0FBTWpDLFNBQVNtSSxjQUFjakcsTUFBN0I7O0tBRXFCa0csSzs7O0FBQ2pCLG9CQUFZL0ssUUFBWixFQUFzQjtBQUFBOztBQUFBLHdCQUNjLG1CQUFRQSxRQUFSLENBRGQ7QUFBQSxhQUNKNEMsRUFESSxZQUNYRixLQURXO0FBQUEsYUFDUUcsRUFEUixZQUNBRixNQURBOztBQUVsQixhQUFNcUksVUFBVSxpQkFBTWhMLFFBQU4sRUFBZ0IsUUFBaEIsQ0FBaEI7O0FBRmtCLHlJQUlaZ0wsT0FKWSxFQUlIcEksRUFKRyxFQUlDQyxFQUpEOztBQU1sQixlQUFLbUksT0FBTCxHQUFlQSxPQUFmO0FBQ0EsZUFBS3BJLEVBQUwsR0FBVUEsRUFBVjtBQUNBLGVBQUtDLEVBQUwsR0FBVUEsRUFBVjtBQUNBLGVBQUtILEtBQUwsR0FBYUUsS0FBS2dDLE1BQWxCO0FBQ0EsZUFBS2pDLE1BQUwsR0FBY0MsTUFBTUYsUUFBUWtDLE1BQWQsSUFBd0JqQyxNQUF0QztBQUNBLGVBQUtpQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxlQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxlQUFLZ0csVUFBTCxHQUFrQixNQUFLbkksS0FBTCxHQUFha0MsTUFBL0I7QUFDQSxlQUFLa0csV0FBTCxHQUFtQixNQUFLbkksTUFBTCxHQUFja0MsTUFBakM7QUFDQSxlQUFLb0csTUFBTCxHQUFjLEVBQWQ7O0FBRUEsY0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUksTUFBS3JHLE1BQXpCLEVBQWlDcUcsR0FBakMsRUFBc0M7QUFDbEMsa0JBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJLE1BQUt2RyxNQUF6QixFQUFpQ3VHLEdBQWpDLEVBQXNDO0FBQ2xDLHFCQUFNQyxRQUFRRixJQUFJLE1BQUt0RyxNQUFULEdBQWtCdUcsQ0FBaEM7QUFDQSxxQkFBTXBLLFNBQVM7QUFDWHFLLDRCQUFPRixJQUFJLE1BQUt0RyxNQUFULEdBQWtCdUcsQ0FEZDtBQUVYQSx5QkFGVztBQUdYRDtBQUhXLGtCQUFmO0FBS0EscUJBQUksc0JBQVlHLE9BQU9ELEtBQVAsQ0FBWixDQUFKLEVBQWdDO0FBQzVCLDBCQUFLLElBQU0zQixHQUFYLElBQWtCLHNCQUFZNEIsT0FBT0QsS0FBUCxDQUFaLENBQWxCLEVBQThDO0FBQzFDckssZ0NBQU8wSSxHQUFQLElBQWMsc0JBQVk0QixPQUFPRCxLQUFQLENBQVosRUFBMkIzQixHQUEzQixDQUFkO0FBQ0g7QUFDSjs7QUFFRCx1QkFBS3dCLE1BQUwsQ0FBWWxJLElBQVosQ0FBaUJoQyxNQUFqQjtBQUNIO0FBQ0o7QUFqQ2lCO0FBa0NyQjs7OztrQ0E4QlFrQyxPLEVBQVNDLE8sRUFBUztBQUN2QixpQkFBTWlJLElBQUlHLFNBQVNySSxVQUFVLEtBQUs0SCxVQUF4QixDQUFWO0FBQ0EsaUJBQU1LLElBQUlJLFNBQVNwSSxVQUFVLEtBQUs0SCxXQUF4QixDQUFWO0FBQ0Esb0JBQU8sS0FBS0csTUFBTCxDQUFZQyxJQUFJLEtBQUt0RyxNQUFULEdBQWtCdUcsQ0FBOUIsQ0FBUDtBQUNIOzs7dUNBRWFsSSxPLEVBQVNDLE8sRUFBUztBQUM1QixpQkFBTXFJLFFBQVEsS0FBS0MsUUFBTCxDQUFjdkksT0FBZCxFQUF1QkMsT0FBdkIsQ0FBZDtBQUQ0QixpQkFHeEJpSSxDQUh3QixHQU14QkksS0FOd0IsQ0FHeEJKLENBSHdCO0FBQUEsaUJBSXhCRCxDQUp3QixHQU14QkssS0FOd0IsQ0FJeEJMLENBSndCO0FBQUEsaUJBS3hCRSxLQUx3QixHQU14QkcsS0FOd0IsQ0FLeEJILEtBTHdCOztBQU81QixpQkFBTUssVUFBVSxFQUFoQjs7QUFFQSxpQkFBSU4sSUFBSSxLQUFLdkcsTUFBTCxHQUFjLENBQXRCLEVBQXlCO0FBQ3JCNkcseUJBQVExSSxJQUFSLENBQWEsS0FBS2tJLE1BQUwsQ0FBWUcsUUFBUSxDQUFwQixDQUFiO0FBQ0g7O0FBRUQsaUJBQUlELElBQUksQ0FBUixFQUFXO0FBQ1BNLHlCQUFRMUksSUFBUixDQUFhLEtBQUtrSSxNQUFMLENBQVlHLFFBQVEsQ0FBcEIsQ0FBYjtBQUNIOztBQUVELGlCQUFJRixJQUFJLEtBQUtyRyxNQUFMLEdBQWMsQ0FBdEIsRUFBeUI7QUFDckI0Ryx5QkFBUTFJLElBQVIsQ0FBYSxLQUFLa0ksTUFBTCxDQUFZRyxRQUFRLEtBQUt4RyxNQUF6QixDQUFiO0FBQ0g7O0FBRUQsaUJBQUlzRyxJQUFJLENBQVIsRUFBVztBQUNQTyx5QkFBUTFJLElBQVIsQ0FBYSxLQUFLa0ksTUFBTCxDQUFZRyxRQUFRLEtBQUt4RyxNQUF6QixDQUFiO0FBQ0g7O0FBRUQsaUJBQUl1RyxJQUFJLEtBQUt2RyxNQUFMLEdBQWMsQ0FBbEIsSUFDR3NHLElBQUksS0FBS3JHLE1BQUwsR0FBYyxDQUR6QixFQUM0QjtBQUN4QjRHLHlCQUFRMUksSUFBUixDQUFhLEtBQUtrSSxNQUFMLENBQVlHLFFBQVEsS0FBS3hHLE1BQWIsR0FBc0IsQ0FBbEMsQ0FBYjtBQUNIOztBQUVELGlCQUFJdUcsSUFBSSxDQUFKLElBQVNELElBQUksQ0FBakIsRUFBb0I7QUFDaEJPLHlCQUFRMUksSUFBUixDQUFhLEtBQUtrSSxNQUFMLENBQVlHLFFBQVEsS0FBS3hHLE1BQWIsR0FBc0IsQ0FBbEMsQ0FBYjtBQUNIOztBQUVELG9CQUFPLENBQ0gyRyxLQURHLFNBRUFFLE9BRkEsRUFHTDdLLEdBSEssQ0FHRCxpQkFBUztBQUNYOEssdUJBQU1DLE9BQU4sR0FBZ0IsSUFBaEI7QUFDQSx3QkFBT0QsS0FBUDtBQUNILGNBTk0sQ0FBUDtBQU9IOzs7dUNBRWF6SSxPLEVBQVNDLE8sRUFBUztBQUM1QixpQkFBTTBJLEtBQUszSSxVQUFVLEtBQUs0SCxVQUFMLEdBQWtCLENBQXZDO0FBQ0EsaUJBQU1nQixLQUFLM0ksVUFBVSxLQUFLNEgsV0FBTCxHQUFtQixDQUF4QztBQUNBLGlCQUFNSyxJQUFJRyxTQUFTTSxLQUFLLEtBQUtmLFVBQW5CLENBQVY7QUFDQSxpQkFBTUssSUFBSUksU0FBU08sS0FBSyxLQUFLZixXQUFuQixDQUFWO0FBQ0EsaUJBQU1nQixLQUFLUixTQUFTTSxLQUFLLEtBQUtmLFVBQW5CLENBQVg7QUFDQSxpQkFBTWtCLEtBQUtULFNBQVNPLEtBQUssS0FBS2YsV0FBbkIsQ0FBWDs7QUFFQSxpQkFBSVksY0FBSjtBQUNBLGlCQUFJSSxLQUFLLEtBQUtqQixVQUFMLEdBQWtCLElBQXZCLElBQStCaUIsS0FBSyxLQUFLakIsVUFBTCxHQUFrQixJQUF0RCxJQUNPa0IsS0FBSyxLQUFLakIsV0FBTCxHQUFtQixJQUQvQixJQUN1Q2lCLEtBQUssS0FBS2pCLFdBQUwsR0FBbUIsSUFEbkUsRUFDeUU7QUFDckVZLHlCQUFRLEtBQUtULE1BQUwsQ0FBWUMsSUFBSSxLQUFLdEcsTUFBVCxHQUFrQnVHLENBQTlCLENBQVI7QUFDQU8sdUJBQU1NLE9BQU4sR0FBZ0IsSUFBaEI7QUFDSDs7QUFFRCxvQkFBT04sS0FBUDtBQUNIOzs7aUNBRU87QUFBQTs7QUFDSixvQkFBTyxrQkFBWSxVQUFDbkYsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3BDLHdCQUFLd0UsT0FBTCxDQUFhL0UsS0FBYixDQUFtQmdHLE9BQW5CLEdBQTZCLEVBQTdCO0FBQ0ExRjtBQUNILGNBSE0sQ0FBUDtBQUlIOzs7NkJBcEdpQjtBQUNkLG9CQUFPLEtBQUswRSxNQUFMLENBQVlpQixNQUFuQjtBQUNIOzs7NkJBRW1CO0FBQ2hCLG9CQUFPLEtBQUtqQixNQUFMLENBQVlrQixNQUFaLENBQW1CO0FBQUEsd0JBQ3RCVCxNQUFNVSxPQURnQjtBQUFBLGNBQW5CLEVBRUxGLE1BRkY7QUFHSDs7OzZCQUVrQjtBQUNmLG9CQUFPLEtBQUtqQixNQUFMLENBQVlrQixNQUFaLENBQW1CO0FBQUEsd0JBQ3RCVCxNQUFNVSxPQUFOLElBQWlCVixNQUFNekcsS0FERDtBQUFBLGNBQW5CLEVBRUxpSCxNQUZGO0FBR0g7Ozs2QkFFbUI7QUFDaEIsb0JBQU8sS0FBS2pCLE1BQUwsQ0FBWWtCLE1BQVosQ0FBbUI7QUFBQSx3QkFDdEJULE1BQU1NLE9BRGdCO0FBQUEsY0FBbkIsRUFFTEUsTUFGRjtBQUdIOzs7NkJBRW1CO0FBQ2hCLG9CQUFPLEtBQUtqQixNQUFMLENBQVlrQixNQUFaLENBQW1CO0FBQUEsd0JBQ3RCVCxNQUFNQyxPQURnQjtBQUFBLGNBQW5CLEVBRUxPLE1BRkY7QUFHSDs7Ozs7bUJBL0RnQm5CLEs7Ozs7OztBQ3JCckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBd0Y7QUFDeEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxpQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEU7Ozs7OztBQ3BCQTtBQUNBOzs7QUFHQTtBQUNBLG1DQUFrQyxrQkFBa0IsbUJBQW1CLHlCQUF5QixjQUFjLGFBQWEsd0NBQXdDLEdBQUc7O0FBRXRLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1BBOzs7O0tBV2FzQixXLFdBQUFBLFc7QUFDVCwwQkFBWTdILE1BQVosRUFBb0I5QixLQUFwQixFQUEyQkMsTUFBM0IsRUFBbUM7QUFBQTs7QUFDL0IsYUFBSSxFQUFFNkIsa0JBQWtCOEgsaUJBQXBCLENBQUosRUFBNEM7QUFDeEMzSixzQkFBU0QsS0FBVDtBQUNBQSxxQkFBUThCLE1BQVI7QUFDQUEsc0JBQVMsSUFBVDtBQUNIOztBQUVELGNBQUs5QixLQUFMLEdBQWFBLEtBQWI7QUFDQSxjQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxjQUFLNkIsTUFBTCxHQUFjQSxVQUFVLFVBQUkwQixhQUFKLENBQWtCLFFBQWxCLENBQXhCO0FBQ0EsY0FBSzFCLE1BQUwsQ0FBWTlCLEtBQVosR0FBb0JBLEtBQXBCO0FBQ0EsY0FBSzhCLE1BQUwsQ0FBWTdCLE1BQVosR0FBcUJBLE1BQXJCO0FBQ0EsY0FBSzhCLE1BQUwsR0FBYyxLQUFLRCxNQUFMLENBQVk2RCxVQUFaLENBQXVCLElBQXZCLENBQWQ7QUFDQSxjQUFLa0UsTUFBTDtBQUNIOzs7OzhCQVVJQyxNLEVBQVE7QUFBQTs7QUFDVCxpQkFBTUMsU0FBU0QsT0FBTzVMLEdBQVAsQ0FBVyxpQkFBUztBQUMvQixxQkFBTStGLFdBQVcsa0JBQWpCOztBQUVBLHFCQUFJK0YsTUFBTUMsR0FBVixFQUFlO0FBQ1hoRyw4QkFBU0osT0FBVCxDQUFpQm1HLEtBQWpCO0FBQ0gsa0JBRkQsTUFFTyxJQUFJQSxNQUFNMUUsR0FBVixFQUFlO0FBQUEsb0NBQ0ssbUJBQVEwRSxNQUFNMUUsR0FBZCxDQURMO0FBQUE7QUFBQSx5QkFDWDJFLEdBRFc7QUFBQSx5QkFDTi9GLE9BRE07O0FBRWxCOEYsMkJBQU1DLEdBQU4sR0FBWUEsR0FBWjtBQUNBL0YsNkJBQVFoRixJQUFSLENBQWE7QUFBQSxnQ0FBTStFLFNBQVNKLE9BQVQsQ0FBaUJtRyxLQUFqQixDQUFOO0FBQUEsc0JBQWI7QUFDSCxrQkFKTSxNQUlBO0FBQ0gvRiw4QkFBU0osT0FBVCxDQUFpQm1HLEtBQWpCO0FBQ0g7O0FBRUQsd0JBQU8vRixTQUFTQyxPQUFoQjtBQUNILGNBZGMsQ0FBZjs7QUFnQkEsb0JBQU8sY0FBUXRFLEdBQVIsQ0FBWW1LLE1BQVosRUFDRjdLLElBREUsQ0FDRyxrQkFBVTtBQUNaLHVCQUFLNkMsTUFBTCxDQUFZSixTQUFaLENBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCLE1BQUszQixLQUFqQyxFQUF3QyxNQUFLQyxNQUE3Qzs7QUFFQTZKLHdCQUFPSSxPQUFQLENBQWUsaUJBQVM7QUFBQTs7QUFDcEIseUJBQU1DLE9BQU8sQ0FBQ0gsTUFBTUMsR0FBUCxFQUFZRCxNQUFNakosQ0FBbEIsRUFBcUJpSixNQUFNaEosQ0FBM0IsQ0FBYjs7QUFFQSx5QkFBSWdKLE1BQU1oSyxLQUFOLElBQWUsSUFBbkIsRUFBeUI7QUFDckJtSyw4QkFBSzlKLElBQUwsQ0FBVTJKLE1BQU1oSyxLQUFoQjtBQUNIO0FBQ0QseUJBQUlnSyxNQUFNL0osTUFBTixJQUFnQixJQUFwQixFQUEwQjtBQUN0QmtLLDhCQUFLOUosSUFBTCxDQUFVMkosTUFBTS9KLE1BQWhCO0FBQ0g7O0FBRUQseUJBQUkrSixNQUFNSSxFQUFOLElBQVksSUFBaEIsRUFBc0I7QUFDbEJELDhCQUFLOUosSUFBTCxDQUFVMkosTUFBTUksRUFBaEI7QUFDSDtBQUNELHlCQUFJSixNQUFNSSxFQUFOLElBQVksSUFBaEIsRUFBc0I7QUFDbEJELDhCQUFLOUosSUFBTCxDQUFVMkosTUFBTUksRUFBaEI7QUFDSDtBQUNELHlCQUFJSixNQUFNSyxFQUFOLElBQVksSUFBaEIsRUFBc0I7QUFDbEJGLDhCQUFLOUosSUFBTCxDQUFVMkosTUFBTUssRUFBaEI7QUFDSDtBQUNELHlCQUFJTCxNQUFNTSxFQUFOLElBQVksSUFBaEIsRUFBc0I7QUFDbEJILDhCQUFLOUosSUFBTCxDQUFVMkosTUFBTU0sRUFBaEI7QUFDSDs7QUFFRCxzQ0FBS3ZJLE1BQUwsRUFBWUgsU0FBWixnQkFBeUJ1SSxJQUF6QjtBQUNILGtCQXhCRDtBQXlCSCxjQTdCRSxDQUFQO0FBOEJIOzs7NkJBdkRXO0FBQ1IsaUJBQUksQ0FBQyxLQUFLTixNQUFWLEVBQWtCO0FBQ2Qsc0JBQUtBLE1BQUwsR0FBYyxJQUFJdEUsS0FBSixFQUFkO0FBQ0Esc0JBQUtzRSxNQUFMLENBQVl2RSxHQUFaLEdBQWtCLEtBQUt4RCxNQUFMLENBQVl5SSxTQUFaLEVBQWxCO0FBQ0g7QUFDRCxvQkFBTyxLQUFLVixNQUFaO0FBQ0g7Ozs7O0tBb0RRVyxZLFdBQUFBLFk7QUFDVCwyQkFBWTFJLE1BQVosRUFBb0I5QixLQUFwQixFQUEyQkMsTUFBM0IsRUFBbUM7QUFBQTs7QUFDL0IsY0FBS0QsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsY0FBS0MsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsY0FBS3dLLFFBQUwsR0FBZ0IsSUFBSWQsV0FBSixDQUFnQjdILE1BQWhCLEVBQXdCOUIsS0FBeEIsRUFBK0JDLE1BQS9CLENBQWhCO0FBQ0EsY0FBS3lLLFVBQUwsR0FBa0IsSUFBSWYsV0FBSixDQUFnQjNKLEtBQWhCLEVBQXVCQyxNQUF2QixDQUFsQjtBQUNIOzs7OzZCQUVZO0FBQ1Qsb0JBQU8sS0FBS3dLLFFBQUwsQ0FBYzNJLE1BQXJCO0FBQ0g7Ozs2QkFFWTtBQUNULG9CQUFPLEtBQUsySSxRQUFMLENBQWMxSSxNQUFyQjtBQUNIOzs7NkJBRVc7QUFDUixvQkFBTyxLQUFLMEksUUFBTCxDQUFjNUksS0FBckI7QUFDSDs7OzZCQUVxQjtBQUNsQixvQkFBTyxLQUFLNkksVUFBTCxDQUFnQjVJLE1BQXZCO0FBQ0g7Ozs2QkFFcUI7QUFDbEIsb0JBQU8sS0FBSzRJLFVBQUwsQ0FBZ0IzSSxNQUF2QjtBQUNIOzs7NkJBRW9CO0FBQ2pCLG9CQUFPLEtBQUsySSxVQUFMLENBQWdCN0ksS0FBdkI7QUFDSDs7Ozs7Ozs7O0FDcEhMOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHVDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5REFBd0QsK0JBQStCO0FBQ3ZGOztBQUVBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxFQUFDLEc7Ozs7OztBQ2xERCxtQkFBa0IseUQ7Ozs7OztBQ0FsQjtBQUNBO0FBQ0EsMkM7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHOzs7Ozs7QUNSQSxtQkFBa0IseUQ7Ozs7OztBQ0FsQjtBQUNBO0FBQ0EsMkM7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7Ozs7Ozs7O21CQ05lO0FBQ1gsWUFBTztBQUNIUyxtQkFBVTtBQURQLE1BREk7QUFJWCxZQUFPO0FBQ0hBLG1CQUFVLEtBRFA7QUFFSG9ILGtCQUFTO0FBRk4sTUFKSTtBQVFYLFlBQU87QUFDSHBILG1CQUFVLFVBRFA7QUFFSG9ILGtCQUFTO0FBRk47QUFSSSxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FmOztBQUNBOzs7O0tBWXFCaUIsTztBQUNqQixzQkFBWXJOLFFBQVosRUFBc0JGLEtBQXRCLEVBQTZCO0FBQUE7O0FBQ3pCLGNBQUtFLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsY0FBS3NOLE1BQUwsR0FBYyxpQkFBTXROLFFBQU4sRUFBZ0IsVUFBaEIsQ0FBZDtBQUNBLGNBQUtGLEtBQUwsR0FBYUEsS0FBYjtBQUNIOzs7O2dDQUVNO0FBQUE7O0FBQ0gsaUJBQU15TixXQUFXLEtBQUtBLFFBQXRCO0FBQ0EsaUJBQU1DLFFBQVEsS0FBS0MsVUFBbkI7QUFDQSxpQkFBTUMsUUFBUSxDQUFkO0FBQ0EsaUJBQU1DLE1BQU0sRUFBWjtBQUNBLGlCQUFNQyxRQUFRLEdBQWQ7O0FBRUEsa0JBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJSCxLQUFwQixFQUEyQkcsR0FBM0IsRUFBZ0M7QUFDNUIscUJBQU14RyxLQUFLLFVBQUluQixhQUFKLENBQWtCLEtBQWxCLENBQVg7QUFDQW1CLG9CQUFHeUcsU0FBSCxHQUFlLE1BQWY7QUFDQXpHLG9CQUFHMEcsSUFBSCxHQUFVLElBQVY7QUFDQUoscUJBQUk1SyxJQUFKLENBQVNzRSxFQUFUO0FBQ0g7O0FBRUQsaUJBQU0yRyxhQUFhLFNBQWJBLFVBQWEsR0FBTTtBQUNyQixxQkFBTUMsSUFBSTNDLFNBQVN6RCxLQUFLcUcsTUFBTCxLQUFnQlYsS0FBekIsSUFBa0MsQ0FBNUM7QUFDQSx3QkFBTyxNQUFLMU4sS0FBTCxpQkFBeUJtTyxDQUF6QixFQUE4QmpHLEdBQXJDO0FBQ0gsY0FIRDs7QUFLQSxpQkFBTW1HLFlBQVksU0FBWkEsU0FBWSxHQUFNO0FBQ3BCLHdCQUFPUixJQUFJeEIsTUFBSixDQUFXO0FBQUEsNEJBQU05RSxHQUFHMEcsSUFBVDtBQUFBLGtCQUFYLEVBQTBCLENBQTFCLENBQVA7QUFDSCxjQUZEOztBQUlBLGlCQUFNSyxjQUFjLFNBQWRBLFdBQWMsR0FBTTtBQUN0QixxQkFBTTNLLElBQUksTUFBSzRCLEtBQUwsSUFBY3dDLEtBQUtxRyxNQUFMLEtBQWdCLEVBQWhCLEdBQXFCLENBQW5DLENBQVY7QUFDQSxxQkFBTXhLLElBQUksTUFBSzRCLEtBQUwsSUFBY3VDLEtBQUtxRyxNQUFMLEtBQWdCLEVBQWhCLEdBQXFCLENBQW5DLENBQVY7QUFDQSxxQkFBTWxGLFFBQVFuQixLQUFLcUcsTUFBTCxLQUFnQixHQUE5QjtBQUNBLHFCQUFNRyxTQUFTeEcsS0FBS3FHLE1BQUwsS0FBZ0IsRUFBaEIsR0FBcUIsQ0FBcEM7QUFDQSx3QkFBTyxDQUFDekssQ0FBRCxFQUFJQyxDQUFKLEVBQU9zRixLQUFQLEVBQWNxRixNQUFkLENBQVA7QUFDSCxjQU5EOztBQVFBLGlCQUFNQyxZQUFZLFNBQVpBLFNBQVksR0FBTTtBQUNwQixxQkFBSUwsSUFBSTNDLFNBQVN6RCxLQUFLcUcsTUFBTCxLQUFnQixDQUF6QixDQUFSO0FBQ0EscUJBQUl6SyxVQUFKO0FBQ0EscUJBQUlDLFVBQUo7O0FBRUEscUJBQUl1SyxNQUFNLENBQVYsRUFBYTtBQUNUeEsseUJBQUksQ0FBQ29FLEtBQUtxRyxNQUFMLEVBQUQsR0FBaUIsR0FBakIsR0FBdUIsR0FBM0I7QUFDQXhLLHlCQUFJbUUsS0FBS3FHLE1BQUwsS0FBZ0IsTUFBS3ZMLE1BQXpCO0FBQ0gsa0JBSEQsTUFHTyxJQUFJc0wsTUFBTSxDQUFWLEVBQWE7QUFDaEJ4Syx5QkFBSW9FLEtBQUtxRyxNQUFMLEtBQWdCLE1BQUt4TCxLQUF6QjtBQUNBZ0IseUJBQUksQ0FBQ21FLEtBQUtxRyxNQUFMLEVBQUQsR0FBaUIsR0FBakIsR0FBdUIsR0FBM0I7QUFDSCxrQkFITSxNQUdBLElBQUlELE1BQU0sQ0FBVixFQUFhO0FBQ2hCeEsseUJBQUksTUFBS2YsS0FBTCxHQUFhbUYsS0FBS3FHLE1BQUwsS0FBZ0IsR0FBN0IsR0FBbUMsR0FBdkM7QUFDQXhLLHlCQUFJLE1BQUtmLE1BQUwsR0FBY2tGLEtBQUtxRyxNQUFMLEVBQWxCO0FBQ0gsa0JBSE0sTUFHQSxJQUFJRCxNQUFNLENBQVYsRUFBYTtBQUNoQnhLLHlCQUFJLE1BQUtmLEtBQUwsR0FBYW1GLEtBQUtxRyxNQUFMLEVBQWpCO0FBQ0F4Syx5QkFBSSxNQUFLZixNQUFMLEdBQWNrRixLQUFLcUcsTUFBTCxLQUFnQixHQUE5QixHQUFvQyxHQUF4QztBQUNIOztBQUVELHFCQUFNbEYsUUFBUW5CLEtBQUtxRyxNQUFMLEtBQWdCLEdBQWhCLEdBQXNCLEdBQXBDO0FBQ0EscUJBQU1HLFNBQVN4RyxLQUFLcUcsTUFBTCxLQUFnQixFQUFoQixHQUFxQixDQUFwQzs7QUFFQSx3QkFBTyxDQUFDekssQ0FBRCxFQUFJQyxDQUFKLEVBQU9zRixLQUFQLEVBQWNxRixNQUFkLENBQVA7QUFDSCxjQXZCRDs7QUF5QkEsb0JBQU8sZ0JBR0Q7QUFBQSxxQkFGRkUsT0FFRSxRQUZGQSxPQUVFO0FBQUEscUJBREZDLEtBQ0UsUUFERkEsS0FDRTs7QUFDRixxQkFBSUQsVUFBVWhCLFFBQWQsRUFBd0I7QUFDcEIsMkJBQUtELE1BQUwsQ0FBWW1CLFNBQVosR0FBd0IsRUFBeEI7QUFDQSw0QkFBTyxJQUFQO0FBQ0g7O0FBRUQscUJBQUlwSCxXQUFKO0FBQ0EscUJBQUlRLEtBQUtxRyxNQUFMLEtBQWdCTixLQUFoQixLQUNRdkcsS0FBSzhHLFdBRGIsQ0FBSixFQUMrQjtBQUFBO0FBQzNCLDZCQUFNTyxVQUFVVixZQUFoQjs7QUFEMkIsNENBRXVCSSxhQUZ2QjtBQUFBO0FBQUEsNkJBRXBCTyxNQUZvQjtBQUFBLDZCQUVaQyxNQUZZO0FBQUEsNkJBRUpDLFVBRkk7QUFBQSw2QkFFUUMsV0FGUjs7QUFBQSwwQ0FHZVIsV0FIZjtBQUFBO0FBQUEsNkJBR3BCUyxJQUhvQjtBQUFBLDZCQUdkQyxJQUhjO0FBQUEsNkJBR1JDLFFBSFE7QUFBQSw2QkFHRUMsU0FIRjs7QUFLM0IsNkJBQU0zTSxNQUFNLFNBQU5BLEdBQU0sSUFBSztBQUNiOEUsZ0NBQUc4SCxtQkFBSCxDQUF1QixxQkFBdkIsRUFBOEM1TSxHQUE5QztBQUNBLG1DQUFLK0ssTUFBTCxDQUFZOEIsV0FBWixDQUF3Qi9ILEVBQXhCO0FBQ0FBLGdDQUFHcEIsS0FBSCxDQUFTRCxPQUFULEdBQW1CLEVBQW5CO0FBQ0FxQixnQ0FBRzBHLElBQUgsR0FBVSxJQUFWO0FBQ0gsMEJBTEQ7O0FBT0ExRyw0QkFBRzBHLElBQUgsR0FBVSxLQUFWO0FBQ0ExRyw0QkFBR3BCLEtBQUgsQ0FBU29KLGdCQUFULEdBQTRCLG9DQUE1QjtBQUNBaEksNEJBQUdwQixLQUFILENBQVNxSixlQUFULG9CQUEwQ1gsTUFBMUMsWUFBdURDLE1BQXZELHVCQUErRUMsVUFBL0Usa0JBQXNHQyxXQUF0RztBQUNBekgsNEJBQUdwQixLQUFILENBQVNzSixlQUFULFlBQWtDYixPQUFsQztBQUNBckgsNEJBQUd4RixnQkFBSCxDQUFvQixxQkFBcEIsRUFBMkNVLEdBQTNDOztBQUVBLCtCQUFLK0ssTUFBTCxDQUFZakgsV0FBWixDQUF3QmdCLEVBQXhCOztBQUVBLHdDQUFJLFlBQU07QUFDTkEsZ0NBQUdwQixLQUFILENBQVNxSixlQUFULG9CQUEwQ1AsSUFBMUMsWUFBcURDLElBQXJELHVCQUEyRUMsUUFBM0UsaUJBQStGQyxTQUEvRjtBQUNILDBCQUZEO0FBcEIyQjtBQXVCOUI7QUFDSixjQW5DRDtBQW9DSDs7O21DQUVTO0FBQ04saUJBQU1wUCxRQUFRLEtBQUtBLEtBQW5CO0FBQ0EsaUJBQU11SCxLQUFLLFVBQUluQixhQUFKLENBQWtCLEtBQWxCLENBQVg7QUFDQW1CLGdCQUFHeUcsU0FBSCxHQUFlLFNBQWY7QUFDQXpHLGdCQUFHcEIsS0FBSCxDQUFTb0osZ0JBQVQsR0FBNEIsb0NBQTVCO0FBQ0FoSSxnQkFBR3BCLEtBQUgsQ0FBU3FKLGVBQVQsb0JBQTBDLEtBQUtqSyxLQUEvQyxZQUEyRCxLQUFLQyxLQUFoRTtBQUNBK0IsZ0JBQUdwQixLQUFILENBQVNzSixlQUFULFlBQWtDelAsTUFBTSxnQkFBTixFQUF3QmtJLEdBQTFEOztBQUVBLGtCQUFLc0YsTUFBTCxDQUFZbUIsU0FBWixHQUF3QixFQUF4QjtBQUNBLGtCQUFLbkIsTUFBTCxDQUFZakgsV0FBWixDQUF3QmdCLEVBQXhCOztBQVRNLGlCQVlGM0UsS0FaRSxHQWNGLElBZEUsQ0FZRkEsS0FaRTtBQUFBLGlCQWFGQyxNQWJFLEdBY0YsSUFkRSxDQWFGQSxNQWJFOzs7QUFnQk4sb0JBQU8sa0JBQVksVUFBQzRELE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNwQyxxQkFBTWpFLE1BQU0sU0FBTkEsR0FBTSxJQUFLO0FBQ2I4RSx3QkFBRzhILG1CQUFILENBQXVCLHFCQUF2QixFQUE4QzVNLEdBQTlDO0FBQ0FnRTtBQUNILGtCQUhEOztBQUtBYyxvQkFBR3hGLGdCQUFILENBQW9CLHFCQUFwQixFQUEyQ1UsR0FBM0M7O0FBRUEsZ0NBQUksWUFBTTtBQUNOOEUsd0JBQUdwQixLQUFILENBQVNxSixlQUFULHFCQUEwQzVNLFFBQVEsQ0FBUixHQUFZLE1BQU0sQ0FBNUQsY0FBb0VDLFNBQVMsQ0FBVCxHQUFhLE1BQU0sQ0FBdkY7QUFDSCxrQkFGRDtBQUdILGNBWE0sQ0FBUDtBQVlIOzs7Z0NBRU07QUFBQTs7QUFDSCxpQkFBTTdDLFFBQVEsS0FBS0EsS0FBbkI7QUFDQSxpQkFBTXlOLFdBQVcsS0FBS0EsUUFBdEI7QUFDQSxpQkFBTUMsUUFBUSxLQUFLZ0MsV0FBbkI7QUFDQSxpQkFBSXBFLFFBQVEsQ0FBWjs7QUFFQSxvQkFBTyxpQkFHRDtBQUFBLHFCQUZGbUQsT0FFRSxTQUZGQSxPQUVFO0FBQUEscUJBREZDLEtBQ0UsU0FERkEsS0FDRTs7QUFDRixxQkFBSUQsV0FBV2hCLFFBQWYsRUFBeUI7QUFDckIsNEJBQUtELE1BQUwsQ0FBWXJILEtBQVosQ0FBa0JzSixlQUFsQixZQUEyQ3pQLE1BQU0sYUFBYXNMLFFBQVEsQ0FBckIsQ0FBTixFQUErQnBELEdBQTFFO0FBQ0FvRDtBQUNBQSw4QkFBU29DLEtBQVQ7QUFDSCxrQkFKRCxNQUlPO0FBQ0gsNEJBQU8sSUFBUDtBQUNIO0FBQ0osY0FYRDtBQVlIOzs7a0NBRVE7QUFDTCxrQkFBS0YsTUFBTCxDQUFZckgsS0FBWixDQUFrQmdHLE9BQWxCLEdBQTRCLE1BQTVCO0FBQ0g7OztpQ0FFTztBQUFBOztBQUNKLGlCQUFNbk0sUUFBUSxLQUFLQSxLQUFuQjs7QUFFQSxvQkFBTyxrQkFBWSxVQUFDeUcsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3BDLHdCQUFLK0csUUFBTCxHQUFnQixJQUFoQjs7QUFFQSx3QkFBS2lDLFdBQUwsR0FBbUIsb0JBQVksT0FBSzFQLEtBQWpCLEVBQ0VxTSxNQURGLENBQ1M7QUFBQSw0QkFBTzFDLElBQUlnRyxLQUFKLENBQVUsY0FBVixDQUFQO0FBQUEsa0JBRFQsRUFFRXZELE1BRnJCOztBQUlBLHdCQUFLdUIsVUFBTCxHQUFrQixvQkFBWSxPQUFLM04sS0FBakIsRUFDR3FNLE1BREgsQ0FDVTtBQUFBLDRCQUFPMUMsSUFBSWdHLEtBQUosQ0FBVSxrQkFBVixDQUFQO0FBQUEsa0JBRFYsRUFFR3ZELE1BRnJCOztBQUlBLHdCQUFLb0IsTUFBTCxDQUFZckgsS0FBWixDQUFrQmdHLE9BQWxCLEdBQTRCLEVBQTVCOztBQVhvQyxnQ0FhWixtQkFBUSxPQUFLcUIsTUFBYixDQWJZO0FBQUEscUJBYTdCNUssS0FiNkIsWUFhN0JBLEtBYjZCO0FBQUEscUJBYXRCQyxNQWJzQixZQWF0QkEsTUFic0I7O0FBY3BDLHdCQUFLRCxLQUFMLEdBQWFBLEtBQWI7QUFDQSx3QkFBS0MsTUFBTCxHQUFjQSxNQUFkO0FBQ0Esd0JBQUswQyxLQUFMLEdBQWEsT0FBSzNDLEtBQUwsR0FBYSxDQUExQjtBQUNBLHdCQUFLNEMsS0FBTCxHQUFhLE9BQUs1QyxLQUFMLEdBQWEsQ0FBMUI7QUFDQTZEO0FBQ0gsY0FuQk0sQ0FBUDtBQW9CSDs7Ozs7bUJBbExnQjhHLE87Ozs7OztBQ2JyQixtQkFBa0IseUQ7Ozs7OztBQ0FsQjtBQUNBLHNEOzs7Ozs7QUNEQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLEU7Ozs7OztBQ1JEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQXdGO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsaUNBQWdDLFVBQVUsRUFBRTtBQUM1QyxFOzs7Ozs7QUNwQkE7QUFDQTs7O0FBR0E7QUFDQSxxQ0FBb0Msa0JBQWtCLG1CQUFtQixvQ0FBb0MsNkJBQTZCLG1DQUFtQyx5QkFBeUIsMkNBQTJDLEdBQUcsb0JBQW9CLGNBQWMsYUFBYSx5QkFBeUIsc0JBQXNCLHVCQUF1QixtQ0FBbUMsK0JBQStCLCtCQUErQixxQ0FBcUMsc0NBQXNDLEdBQUcsdUJBQXVCLGNBQWMsYUFBYSx5QkFBeUIscUJBQXFCLHNCQUFzQixtQ0FBbUMsa0NBQWtDLHlDQUF5QyxxQ0FBcUMsc0NBQXNDLHFEQUFxRCxHQUFHLDRCQUE0QixVQUFVLHNDQUFzQyxPQUFPLGlCQUFpQixzQ0FBc0MsT0FBTyxXQUFXLHVDQUF1QyxPQUFPLGNBQWMsdUNBQXVDLE9BQU8sR0FBRzs7QUFFeG9DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUEE7O0FBQ0E7Ozs7S0FVcUJxQyxVO0FBQ2pCLHlCQUFZMVAsUUFBWixFQUFzQkYsS0FBdEIsRUFBNkI7QUFBQTs7QUFDekIsY0FBS3dOLE1BQUwsR0FBYyxpQkFBTXROLFFBQU4sRUFBZ0IsYUFBaEIsQ0FBZDtBQUNBLGNBQUtzTixNQUFMLENBQVlySCxLQUFaLENBQWtCc0osZUFBbEIsWUFBMkN6UCxNQUFNLFlBQU4sRUFBb0JrSSxHQUEvRDtBQUNIOzs7O2dDQUVNO0FBQUE7O0FBQ0gsaUJBQU11RixXQUFXLElBQWpCO0FBQ0EsaUJBQU1vQyxRQUFRLENBQWQ7QUFDQSxpQkFBTW5DLFFBQVEsQ0FBZDs7QUFFQSxvQkFBTyxnQkFHRDtBQUFBLHFCQUZGZSxPQUVFLFFBRkZBLE9BRUU7QUFBQSxxQkFERkMsS0FDRSxRQURGQSxLQUNFOztBQUNGLHFCQUFJRCxXQUFXaEIsUUFBZixFQUF5QjtBQUNyQix5QkFBTW5DLFFBQVFFLFNBQVNrQyxRQUFRbUMsS0FBUixHQUFnQnBCLE9BQWhCLEdBQTBCaEIsUUFBbkMsSUFBK0NDLEtBQTdEO0FBQ0EsMkJBQUtGLE1BQUwsQ0FBWXJILEtBQVosQ0FBa0IySixtQkFBbEIsU0FBNEN4RSxRQUFRLEVBQXBEO0FBQ0gsa0JBSEQsTUFHTztBQUNILDJCQUFLa0MsTUFBTCxDQUFZckgsS0FBWixDQUFrQjJKLG1CQUFsQixHQUF3QyxHQUF4QztBQUNBLDRCQUFPLElBQVA7QUFDSDtBQUNKLGNBWEQ7QUFZSDs7O2tDQUVRO0FBQ0wsa0JBQUt0QyxNQUFMLENBQVlySCxLQUFaLENBQWtCZ0csT0FBbEIsR0FBNEIsTUFBNUI7QUFDSDs7O2lDQUVPO0FBQUE7O0FBQ0osb0JBQU8sa0JBQVksVUFBQzFGLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNwQyx3QkFBSzhHLE1BQUwsQ0FBWXJILEtBQVosQ0FBa0JnRyxPQUFsQixHQUE0QixFQUE1QjtBQUNBMUY7QUFDSCxjQUhNLENBQVA7QUFJSDs7Ozs7bUJBbENnQm1KLFU7Ozs7OztBQ1hyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUF3RjtBQUN4RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLGlDQUFnQyxVQUFVLEVBQUU7QUFDNUMsRTs7Ozs7O0FDcEJBO0FBQ0E7OztBQUdBO0FBQ0Esd0NBQXVDLGtCQUFrQixtQkFBbUIsb0NBQW9DLHVDQUF1QyxtQ0FBbUMseUJBQXlCLDJDQUEyQyxHQUFHOztBQUVqUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1BBOztBQVdBOzs7O0tBSXFCRyxLOzs7QUFDakIsb0JBQVl6UCxLQUFaLEVBQW1CTixLQUFuQixFQUEwQjtBQUFBOztBQUFBLHlJQUNoQk0sTUFBTXdDLEVBRFUsRUFDTnhDLE1BQU15QyxFQURBOztBQUd0QixlQUFLK0IsTUFBTCxHQUFjeEUsTUFBTXdFLE1BQXBCO0FBQ0EsZUFBS0MsTUFBTCxHQUFjekUsTUFBTXlFLE1BQXBCO0FBQ0EsZUFBS2dHLFVBQUwsR0FBa0J6SyxNQUFNc0MsS0FBTixHQUFjdEMsTUFBTXdFLE1BQXRDO0FBQ0EsZUFBS2tHLFdBQUwsR0FBbUIxSyxNQUFNdUMsTUFBTixHQUFldkMsTUFBTXlFLE1BQXhDO0FBQ0EsZUFBSy9FLEtBQUwsR0FBYUEsS0FBYjtBQVBzQjtBQVF6Qjs7OztvQ0FFVW1MLE0sRUFBUWhJLE8sRUFBU0MsTyxFQUFTO0FBQ2pDLGlCQUFNc0osU0FBUyxFQUFmO0FBRGlDO0FBQUE7QUFBQTs7QUFBQTtBQUVqQyxpRUFBb0J2QixNQUFwQiw0R0FBNEI7QUFBQSx5QkFBakJTLEtBQWlCOztBQUN4Qix5QkFBSSxLQUFLVCxNQUFMLENBQVlJLE9BQU9LLE1BQU1OLEtBQWIsQ0FBWixDQUFKLEVBQXNDO0FBQUEsOENBTzlCLEtBQUtILE1BQUwsQ0FBWUksT0FBT0ssTUFBTU4sS0FBYixDQUFaLENBUDhCO0FBQUEsNkJBRTlCM0gsQ0FGOEIsa0JBRTlCQSxDQUY4QjtBQUFBLDZCQUc5QkMsQ0FIOEIsa0JBRzlCQSxDQUg4QjtBQUFBLDZCQUk5QmhCLEtBSjhCLGtCQUk5QkEsS0FKOEI7QUFBQSw2QkFLOUJDLE1BTDhCLGtCQUs5QkEsTUFMOEI7QUFBQSw2QkFNOUI2QixNQU44QixrQkFNOUJBLE1BTjhCOzs7QUFTbENnSSxnQ0FBT3pKLElBQVAsQ0FBWTtBQUNSVSxnQ0FBR0EsSUFBSWYsUUFBUSxHQUFaLEdBQWtCTyxPQURiO0FBRVJTLGdDQUFHQSxJQUFJZixTQUFTLEdBQWIsR0FBbUJPLE9BRmQ7QUFHUlIsb0NBQU9BLFFBQVEsR0FIUDtBQUlSQyxxQ0FBUUEsU0FBUyxHQUpUO0FBS1JnSyxrQ0FBS25JO0FBTEcsMEJBQVo7QUFPSDtBQUNKOztBQUVEO0FBQ0E7QUF2QmlDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBd0JqQyxrQkFBS3NMLElBQUwsQ0FBVXRELE1BQVY7QUFDQTtBQUNIOzs7K0JBRUt1RCxVLEVBQVk7QUFBQTs7QUFBQSxpQkFFVkMsT0FGVSxHQUlWRCxVQUpVLENBRVZDLE9BRlU7QUFBQSxpQkFHVjVFLEtBSFUsR0FJVjJFLFVBSlUsQ0FHVjNFLEtBSFU7OztBQU1kLGlCQUFNTSxRQUFRLEtBQUtULE1BQUwsQ0FBWUksT0FBT0QsS0FBUCxDQUFaLENBQWQ7O0FBRUEsaUJBQUlNLEtBQUosRUFBVztBQUFBO0FBQUEseUJBR0hpQixHQUhHLEdBS0hqQixLQUxHLENBR0hpQixHQUhHO0FBQUEseUJBSUhsSSxNQUpHLEdBS0hpSCxLQUxHLENBSUhqSCxNQUpHOzs7QUFPUCx5QkFBSSxDQUFDdUwsT0FBTCxFQUFjO0FBQUE7QUFDVixpQ0FBTXpDLFdBQVcsSUFBakI7O0FBRUE7QUFBQTtBQUFBLHdDQUFPLGlCQUdEO0FBQUEsNkNBRkZpQixLQUVFLFFBRkZBLEtBRUU7QUFBQSw2Q0FERkQsT0FDRSxRQURGQSxPQUNFOztBQUNGLDZDQUFJQSxXQUFXaEIsUUFBZixFQUF5QjtBQUNyQjlJLG9EQUFPd0wsV0FBUCxJQUFzQnpCLFFBQVFqQixRQUE5QjtBQUNILDBDQUZELE1BRU87QUFDSDlJLG9EQUFPd0wsV0FBUCxHQUFxQixDQUFyQjtBQUNBRix3REFBV0MsT0FBWCxHQUFxQixJQUFyQjtBQUNIO0FBQ0R2TCxnREFBT0osU0FBUCxDQUFpQixDQUFqQixFQUFvQixDQUFwQixFQUF1QixPQUFLd0csVUFBNUIsRUFBd0MsT0FBS0MsV0FBN0M7QUFDQXJHLGdEQUFPSCxTQUFQLENBQWlCcUksR0FBakIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsT0FBSzlCLFVBQWpDLEVBQTZDLE9BQUtDLFdBQWxEO0FBQ0EsZ0RBQU9pRixXQUFXQyxPQUFsQjtBQUNIO0FBYkQ7QUFBQTtBQUhVOztBQUFBO0FBaUJiO0FBeEJNOztBQUFBO0FBeUJWO0FBQ0o7OztpQ0FFTztBQUNKLGtCQUFLL0UsTUFBTCxHQUFjLEVBQWQ7O0FBRUEsaUJBQU0wQixNQUFNLEtBQUs3TSxLQUFMLENBQVcsT0FBWCxFQUFvQm9RLEdBQWhDOztBQUVBLGtCQUFLLElBQUlyQyxJQUFJLENBQWIsRUFBZ0JBLEtBQUssS0FBS2pKLE1BQUwsR0FBYyxLQUFLQyxNQUF4QyxFQUFnRGdKLEdBQWhELEVBQXFEO0FBQ2pELHFCQUFNcEssSUFBSSxDQUFDb0ssSUFBSSxDQUFMLElBQVUsS0FBS2pKLE1BQXpCO0FBQ0EscUJBQU1sQixJQUFJNEgsU0FBUyxDQUFDdUMsSUFBSSxDQUFMLElBQVUsS0FBS2pKLE1BQXhCLENBQVY7O0FBRmlELG1DQUd4QixzQkFBVytILEdBQVgsRUFBZ0IsS0FBSzlCLFVBQXJCLEVBQWlDLEtBQUtDLFdBQXRDLENBSHdCO0FBQUE7QUFBQSxxQkFHMUN0RyxNQUgwQztBQUFBLHFCQUdsQ0MsTUFIa0M7O0FBS2pELHNCQUFLd0csTUFBTCxDQUFZSSxPQUFPd0MsSUFBSSxDQUFYLENBQVosSUFBNkI7QUFDekJsQiw2QkFEeUI7QUFFekJuSSxtQ0FGeUI7QUFHekJDLG1DQUh5QjtBQUl6QmhCLHdCQUFHQSxJQUFJLEtBQUtvSCxVQUphO0FBS3pCbkgsd0JBQUdBLElBQUksS0FBS29ILFdBTGE7QUFNekJwSSw0QkFBTyxLQUFLbUksVUFOYTtBQU96QmxJLDZCQUFRLEtBQUttSTtBQVBZLGtCQUE3QjtBQVNIOztBQUVELG9CQUFPLGNBQVF2RSxPQUFSLEVBQVA7QUFDSDs7Ozs7bUJBakdnQnNKLEs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZyQjs7QUFTQTs7OztLQUlxQk0sSTs7O0FBQ2pCLG1CQUFZL1AsS0FBWixFQUFtQk4sS0FBbkIsRUFBMEI7QUFBQTs7QUFBQSx1SUFDaEJNLE1BQU13QyxFQURVLEVBQ054QyxNQUFNeUMsRUFBTixHQUFXLENBREw7O0FBR3RCLGVBQUtILEtBQUwsR0FBYXRDLE1BQU13QyxFQUFuQjtBQUNBLGVBQUtELE1BQUwsR0FBY3ZDLE1BQU15QyxFQUFOLEdBQVcsQ0FBekI7QUFDQSxlQUFLRCxFQUFMLEdBQVV4QyxNQUFNd0MsRUFBaEI7QUFDQSxlQUFLQyxFQUFMLEdBQVV6QyxNQUFNeUMsRUFBaEI7QUFDQSxlQUFLL0MsS0FBTCxHQUFhQSxLQUFiO0FBUHNCO0FBUXpCOzs7O2lDQUVPO0FBQ0osb0JBQU8sS0FBS2dRLElBQUwsQ0FBVSxDQUFDO0FBQ2RuRCxzQkFBSyxLQUFLN00sS0FBTCxDQUFXLE1BQVgsRUFBbUJvUSxHQURWO0FBRWR6TSxvQkFBRyxDQUZXO0FBR2RDLG9CQUFHLENBSFc7QUFJZGhCLHdCQUFPLEtBQUtBLEtBSkU7QUFLZEMseUJBQVEsS0FBS0U7QUFMQyxjQUFELEVBTWQ7QUFDQzhKLHNCQUFLLEtBQUs3TSxLQUFMLENBQVcsTUFBWCxFQUFtQm9RLEdBRHpCO0FBRUN6TSxvQkFBRyxDQUZKO0FBR0NDLG9CQUFHLEtBQUtiLEVBSFQ7QUFJQ0gsd0JBQU8sS0FBS0EsS0FKYjtBQUtDQyx5QkFBUSxLQUFLRTtBQUxkLGNBTmMsQ0FBVixDQUFQO0FBYUg7Ozs7O21CQXpCZ0JzTixJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNickI7O0FBQ0E7O0FBYUE7Ozs7QUFDQTs7OztLQUlhQyxjLFdBQUFBLGM7OztBQUNULDZCQUFZaFEsS0FBWixFQUFtQk4sS0FBbkIsRUFBMEI7QUFBQTs7QUFBQSwySkFDaEJNLE1BQU13QyxFQURVLEVBQ054QyxNQUFNeUMsRUFEQTs7QUFHdEIsZUFBSytCLE1BQUwsR0FBY3hFLE1BQU13RSxNQUFwQjtBQUNBLGVBQUtDLE1BQUwsR0FBY3pFLE1BQU15RSxNQUFwQjtBQUNBLGVBQUtnRyxVQUFMLEdBQWtCekssTUFBTXNDLEtBQU4sR0FBY3RDLE1BQU13RSxNQUF0QztBQUNBLGVBQUtrRyxXQUFMLEdBQW1CMUssTUFBTXVDLE1BQU4sR0FBZXZDLE1BQU15RSxNQUF4QztBQUNBLGVBQUsvRSxLQUFMLEdBQWFBLEtBQWI7QUFQc0I7QUFRekI7Ozs7b0NBRVVtRCxPLEVBQVNDLE8sRUFBUztBQUFBOztBQUN6QixpQkFBSU8sSUFBSTZILFNBQVNySSxVQUFVLEtBQUs0SCxVQUF4QixDQUFSO0FBQ0EsaUJBQUluSCxJQUFJNEgsU0FBU3BJLFVBQVUsS0FBSzRILFdBQXhCLENBQVI7QUFDQSxpQkFBSU0sUUFBUTFILElBQUksS0FBS2tCLE1BQVQsR0FBa0JuQixDQUE5Qjs7QUFFQSxpQkFBTStJLFNBQVMsRUFBZjs7QUFFQSxpQkFBTTZELGFBQWEsU0FBYkEsVUFBYSxDQUFDakYsS0FBRCxFQUFXO0FBQzFCLHFCQUFNTSxRQUFRLE9BQUtULE1BQUwsQ0FBWUksT0FBT0QsS0FBUCxDQUFaLENBQWQ7QUFDQW9CLHdCQUFPekosSUFBUCxDQUFZO0FBQ1JVLHdCQUFHaUksTUFBTWpJLENBQU4sR0FBVVIsT0FETDtBQUVSUyx3QkFBR2dJLE1BQU1oSSxDQUFOLEdBQVVSLE9BRkw7QUFHUlIsNEJBQU9nSixNQUFNaEosS0FITDtBQUlSQyw2QkFBUStJLE1BQU0vSSxNQUpOO0FBS1JnSywwQkFBSyxPQUFLMUIsTUFBTCxDQUFZRyxLQUFaLEVBQW1CdUI7QUFMaEIsa0JBQVo7QUFPSCxjQVREOztBQVdBLGlCQUFJLEtBQUsxQixNQUFMLENBQVlJLE9BQU9ELEtBQVAsQ0FBWixDQUFKLEVBQWdDO0FBQzVCaUYsNEJBQVdqRixLQUFYO0FBQ0g7O0FBRUQsaUJBQUkzSCxJQUFJLENBQUosSUFBUyxLQUFLd0gsTUFBTCxDQUFZSSxPQUFPRCxRQUFRLENBQWYsQ0FBWixDQUFiLEVBQTZDO0FBQ3pDaUYsNEJBQVdqRixRQUFRLENBQW5CO0FBQ0g7O0FBRUQsaUJBQUkxSCxJQUFJLENBQUosSUFBUyxLQUFLdUgsTUFBTCxDQUFZSSxPQUFPRCxRQUFRLEtBQUt4RyxNQUFwQixDQUFaLENBQWIsRUFBdUQ7QUFDbkR5TCw0QkFBV2pGLFFBQVEsS0FBS3hHLE1BQXhCO0FBQ0g7O0FBRUQsaUJBQUluQixJQUFJLENBQUosSUFBU0MsSUFBSSxDQUFiLElBQWtCLEtBQUt1SCxNQUFMLENBQVlJLE9BQU9ELFFBQVEsS0FBS3hHLE1BQWIsR0FBc0IsQ0FBN0IsQ0FBWixDQUF0QixFQUFvRTtBQUNoRXlMLDRCQUFXakYsUUFBUSxLQUFLeEcsTUFBYixHQUFzQixDQUFqQztBQUNIOztBQUVELGtCQUFLa0wsSUFBTCxDQUFVdEQsTUFBVjtBQUNIOzs7aUNBRU87QUFBQTs7QUFDSixpQkFBTUMsU0FBUyxFQUFmO0FBQ0Esa0JBQUt4QixNQUFMLEdBQWMsRUFBZDs7QUFFQSxpQ0FBWSxLQUFLbkwsS0FBakIsRUFBd0JxTSxNQUF4QixDQUErQixjQUFNO0FBQ2pDLHdCQUFPdEQsR0FBR3lILE9BQUgsQ0FBVyxTQUFYLE1BQTBCLENBQWpDO0FBQ0gsY0FGRCxFQUVHMUQsT0FGSCxDQUVXLGNBQU07QUFDYixxQkFBTTJELE9BQU8sT0FBS3pRLEtBQUwsQ0FBVytJLEVBQVgsQ0FBYjtBQUNBLHFCQUFNdUMsUUFBUUUsU0FBU3pDLEdBQUc0RyxLQUFILENBQVMsZ0JBQVQsRUFBMkIsQ0FBM0IsQ0FBVCxDQUFkO0FBQ0EscUJBQU05SSxXQUFXLGtCQUFqQjtBQUNBLHFCQUFNcEMsUUFBUSxJQUFJMEQsS0FBSixFQUFkO0FBQ0ExRCx1QkFBTTJELE1BQU4sR0FBZTtBQUFBLDRCQUFNdkIsU0FBU0osT0FBVCxFQUFOO0FBQUEsa0JBQWY7QUFDQWhDLHVCQUFNeUQsR0FBTixHQUFZdUksS0FBS3ZJLEdBQWpCO0FBQ0F5RSx3QkFBTzFKLElBQVAsQ0FBWTRELFNBQVNDLE9BQXJCOztBQUVBLHFCQUFJbkQsSUFBSSxDQUFDMkgsUUFBUSxDQUFULElBQWMsT0FBS3hHLE1BQTNCO0FBQ0EscUJBQUlsQixJQUFJNEgsU0FBUyxDQUFDRixRQUFRLENBQVQsSUFBYyxPQUFLeEcsTUFBNUIsQ0FBUjs7QUFFQSx3QkFBS3FHLE1BQUwsQ0FBWUksT0FBT0QsUUFBUSxDQUFmLENBQVosSUFBaUM7QUFDN0J1QiwwQkFBS3BJLEtBRHdCO0FBRTdCZCx3QkFBR0EsSUFBSSxPQUFLb0gsVUFGaUI7QUFHN0JuSCx3QkFBR0EsSUFBSSxPQUFLb0gsV0FIaUI7QUFJN0JwSSw0QkFBTyxPQUFLbUksVUFKaUI7QUFLN0JsSSw2QkFBUSxPQUFLbUk7QUFMZ0Isa0JBQWpDO0FBT0gsY0FyQkQ7O0FBdUJBLG9CQUFPLGNBQVF4SSxHQUFSLENBQVltSyxNQUFaLENBQVA7QUFDSDs7Ozs7S0FHUStELGEsV0FBQUEsYTs7O0FBQ1QsNEJBQVlwUSxLQUFaLEVBQW1CTixLQUFuQixFQUEwQjtBQUFBOztBQUFBLDBKQUNoQk0sTUFBTXdDLEVBRFUsRUFDTnhDLE1BQU15QyxFQURBOztBQUd0QixnQkFBSytCLE1BQUwsR0FBY3hFLE1BQU13RSxNQUFwQjtBQUNBLGdCQUFLQyxNQUFMLEdBQWN6RSxNQUFNeUUsTUFBcEI7QUFDQSxnQkFBS2dHLFVBQUwsR0FBa0J6SyxNQUFNc0MsS0FBTixHQUFjdEMsTUFBTXdFLE1BQXRDO0FBQ0EsZ0JBQUtrRyxXQUFMLEdBQW1CMUssTUFBTXVDLE1BQU4sR0FBZXZDLE1BQU15RSxNQUF4QztBQUNBLGdCQUFLL0UsS0FBTCxHQUFhQSxLQUFiO0FBUHNCO0FBUXpCOzs7O29DQVVVbUQsTyxFQUFTQyxPLEVBQVM7QUFBQTs7QUFDekIsaUJBQUlPLElBQUk2SCxTQUFTckksVUFBVSxLQUFLNEgsVUFBeEIsQ0FBUjtBQUNBLGlCQUFJbkgsSUFBSTRILFNBQVNwSSxVQUFVLEtBQUs0SCxXQUF4QixDQUFSO0FBQ0EsaUJBQUlNLFFBQVExSCxJQUFJLEtBQUtrQixNQUFULEdBQWtCbkIsQ0FBOUI7O0FBRUEsaUJBQU0rSSxTQUFTLEVBQWY7QUFDQSxpQkFBTTZELGFBQWEsU0FBYkEsVUFBYSxDQUFDakYsS0FBRCxFQUFXO0FBQzFCLHFCQUFNTSxRQUFRLE9BQUtULE1BQUwsQ0FBWUksT0FBT0QsS0FBUCxDQUFaLENBQWQ7QUFDQSxxQkFBSU0sTUFBTStFLEtBQU4sR0FBYy9FLE1BQU1nRixJQUFOLENBQVd4RSxNQUE3QixFQUFxQztBQUNqQ00sNEJBQU96SixJQUFQLENBQVk7QUFDUlUsNEJBQUdpSSxNQUFNakksQ0FBTixHQUFVUixPQURMO0FBRVJTLDRCQUFHZ0ksTUFBTWhJLENBQU4sR0FBVVIsT0FGTDtBQUdSUixnQ0FBT2dKLE1BQU1oSixLQUhMO0FBSVJDLGlDQUFRK0ksTUFBTS9JLE1BSk47QUFLUmdLLDhCQUFLakIsTUFBTWdGLElBQU4sQ0FBV2hGLE1BQU0rRSxLQUFqQjtBQUxHLHNCQUFaO0FBT0g7QUFDSixjQVhEOztBQWFBLGlCQUFJLEtBQUt4RixNQUFMLENBQVlJLE9BQU9ELEtBQVAsQ0FBWixDQUFKLEVBQWdDO0FBQzVCaUYsNEJBQVdqRixLQUFYO0FBQ0g7O0FBRUQsaUJBQUkzSCxJQUFJLENBQUosSUFBUyxLQUFLd0gsTUFBTCxDQUFZSSxPQUFPRCxRQUFRLENBQWYsQ0FBWixDQUFiLEVBQTZDO0FBQ3pDaUYsNEJBQVdqRixRQUFRLENBQW5CO0FBQ0g7O0FBRUQsaUJBQUkxSCxJQUFJLENBQUosSUFBUyxLQUFLdUgsTUFBTCxDQUFZSSxPQUFPRCxRQUFRLEtBQUt4RyxNQUFwQixDQUFaLENBQWIsRUFBdUQ7QUFDbkR5TCw0QkFBV2pGLFFBQVEsS0FBS3hHLE1BQXhCO0FBQ0g7O0FBRUQsaUJBQUluQixJQUFJLENBQUosSUFBU0MsSUFBSSxDQUFiLElBQWtCLEtBQUt1SCxNQUFMLENBQVlJLE9BQU9ELFFBQVEsS0FBS3hHLE1BQWIsR0FBc0IsQ0FBN0IsQ0FBWixDQUF0QixFQUFvRTtBQUNoRXlMLDRCQUFXakYsUUFBUSxLQUFLeEcsTUFBYixHQUFzQixDQUFqQztBQUNIOztBQUVELGtCQUFLa0wsSUFBTCxDQUFVdEQsTUFBVjtBQUNIOzs7OEJBRUkzQyxFLEVBQUlHLEUsRUFBSTtBQUNULGlCQUFNdkcsSUFBSTZILFNBQVN6QixLQUFLLEtBQUtnQixVQUFuQixDQUFWO0FBQ0EsaUJBQU1uSCxJQUFJNEgsU0FBU3RCLEtBQUssS0FBS2MsV0FBbkIsQ0FBVjtBQUNBLGlCQUFNTSxRQUFRMUgsSUFBSSxLQUFLa0IsTUFBVCxHQUFrQm5CLENBQWhDO0FBQ0EsaUJBQU1pSSxRQUFRLEtBQUtULE1BQUwsQ0FBWUksT0FBT0QsS0FBUCxDQUFaLENBQWQ7O0FBRUEsaUJBQUlNLFNBQVNBLE1BQU0rRSxLQUFOLEdBQWMvRSxNQUFNZ0YsSUFBTixDQUFXeEUsTUFBbEMsSUFBNEMsQ0FBQ1IsTUFBTWlGLFNBQXZELEVBQWtFO0FBQUE7QUFDOUQseUJBQU1wRCxXQUFXLElBQWpCOztBQUVBO0FBQUEsNEJBQU8saUJBR0Q7QUFBQSxpQ0FGRmlCLEtBRUUsUUFGRkEsS0FFRTtBQUFBLGlDQURGRCxPQUNFLFFBREZBLE9BQ0U7O0FBQ0YsaUNBQU1mLFFBQVE5QixNQUFNZ0YsSUFBTixDQUFXeEUsTUFBekI7QUFDQSxpQ0FBTXVFLFFBQVE1SSxLQUFLK0ksS0FBTCxDQUFXcEQsU0FBU2UsVUFBVWhCLFFBQW5CLENBQVgsQ0FBZDs7QUFFQSxpQ0FBSWtELFFBQVFqRCxLQUFaLEVBQW1CO0FBQ2Y5Qix1Q0FBTStFLEtBQU4sR0FBY0EsS0FBZDtBQUNILDhCQUZELE1BRU87QUFDSC9FLHVDQUFNaUYsU0FBTixHQUFrQixJQUFsQjtBQUNBakYsdUNBQU0rRSxLQUFOLEdBQWNqRCxRQUFRLENBQXRCO0FBQ0Esd0NBQU8sSUFBUDtBQUNIO0FBQ0o7QUFkRDtBQUg4RDs7QUFBQTtBQWtCakU7QUFDSjs7O2lDQUVPO0FBQUE7O0FBQ0osaUJBQU1mLFNBQVMsRUFBZjtBQUNBLGtCQUFLeEIsTUFBTCxHQUFjLEVBQWQ7O0FBRUEsaUNBQVksS0FBS25MLEtBQWpCLEVBQXdCcU0sTUFBeEIsQ0FBK0IsY0FBTTtBQUNqQyx3QkFBT3RELEdBQUd5SCxPQUFILENBQVcsUUFBWCxNQUF5QixDQUFoQztBQUNILGNBRkQsRUFFRzFELE9BRkgsQ0FFVyxjQUFNO0FBQ2IscUJBQU0yRCxPQUFPLE9BQUt6USxLQUFMLENBQVcrSSxFQUFYLENBQWI7O0FBRGEsNkNBRVVBLEdBQUc0RyxLQUFILENBQVMscUJBQVQsRUFDRS9ELEtBREYsQ0FDUSxDQURSLEVBQ1csQ0FEWCxFQUNjUyxNQURkLENBQ3FCO0FBQUEsNEJBQUtiLFNBQVN1QyxDQUFULENBQUw7QUFBQSxrQkFEckIsQ0FGVjtBQUFBO0FBQUEscUJBRU56QyxLQUZNO0FBQUEscUJBRUNxRixLQUZEOztBQUtiLHFCQUFNOUosV0FBVyxrQkFBakI7QUFDQSxxQkFBTXBDLFFBQVEsSUFBSTBELEtBQUosRUFBZDtBQUNBMUQsdUJBQU0yRCxNQUFOLEdBQWU7QUFBQSw0QkFBTXZCLFNBQVNKLE9BQVQsRUFBTjtBQUFBLGtCQUFmO0FBQ0FoQyx1QkFBTXlELEdBQU4sR0FBWXVJLEtBQUt2SSxHQUFqQjtBQUNBeUUsd0JBQU8xSixJQUFQLENBQVk0RCxTQUFTQyxPQUFyQjs7QUFFQSxxQkFBSW5ELElBQUksQ0FBQzJILFFBQVEsQ0FBVCxJQUFjLE9BQUt4RyxNQUEzQjtBQUNBLHFCQUFJbEIsSUFBSTRILFNBQVMsQ0FBQ0YsUUFBUSxDQUFULElBQWMsT0FBS3hHLE1BQTVCLENBQVI7O0FBRUEscUJBQUk4RyxRQUFRLE9BQUtULE1BQUwsQ0FBWUksT0FBT0QsUUFBUSxDQUFmLENBQVosQ0FBWjtBQUNBLHFCQUFJLENBQUNNLEtBQUwsRUFBWTtBQUNSQSw2QkFBUSxPQUFLVCxNQUFMLENBQVlJLE9BQU9ELFFBQVEsQ0FBZixDQUFaLElBQWlDO0FBQ3JDc0YsK0JBQU0sRUFEK0I7QUFFckNELGdDQUFPLENBRjhCO0FBR3JDaE4sNEJBQUdBLElBQUksT0FBS29ILFVBSHlCO0FBSXJDbkgsNEJBQUdBLElBQUksT0FBS29ILFdBSnlCO0FBS3JDcEksZ0NBQU8sT0FBS21JLFVBTHlCO0FBTXJDbEksaUNBQVEsT0FBS21JO0FBTndCLHNCQUF6QztBQVFIO0FBQ0RZLHVCQUFNZ0YsSUFBTixDQUFXRCxRQUFRLENBQW5CLElBQXdCbE0sS0FBeEI7QUFDSCxjQTVCRDs7QUE4QkEsb0JBQU8sY0FBUWpDLEdBQVIsQ0FBWW1LLE1BQVosQ0FBUDtBQUNIOzs7NkJBNUdZO0FBQ1Qsb0JBQU8sb0JBQVksS0FBS3hCLE1BQWpCLEVBQXlCaUIsTUFBaEM7QUFDSDs7OzZCQUVXO0FBQUE7O0FBQ1Isb0JBQU8sb0JBQVksS0FBS2pCLE1BQWpCLEVBQXlCa0IsTUFBekIsQ0FBZ0M7QUFBQSx3QkFBSyxPQUFLbEIsTUFBTCxDQUFZNEMsQ0FBWixFQUFlOEMsU0FBcEI7QUFBQSxjQUFoQyxFQUErRHpFLE1BQXRFO0FBQ0g7Ozs7O0tBeUdRMkUsWSxXQUFBQSxZOzs7QUFDVCwyQkFBWTdRLFFBQVosRUFBc0JGLEtBQXRCLEVBQTZCO0FBQUE7O0FBQUE7O0FBR3pCLGdCQUFLZ1IsSUFBTCxHQUFZLENBQVo7QUFDQSxnQkFBS3hELE1BQUwsR0FBYyxpQkFBTXROLFFBQU4sRUFBZ0IsaUJBQWhCLENBQWQ7QUFDQSxnQkFBSytRLE1BQUwsR0FBYyxpQkFBTSxPQUFLekQsTUFBWCxFQUFtQixPQUFuQixDQUFkO0FBQ0EsZ0JBQUswRCxZQUFMLEdBQW9CLGlCQUFNLE9BQUtELE1BQVgsRUFBbUIsU0FBbkIsQ0FBcEI7QUFDQSxnQkFBS0UsU0FBTCxHQUFpQixpQkFBTSxPQUFLRixNQUFYLEVBQW1CLE1BQW5CLENBQWpCO0FBQ0EsZ0JBQUtHLFFBQUwsR0FBZ0IsaUJBQU0sT0FBS0gsTUFBWCxFQUFtQixLQUFuQixDQUFoQjtBQUNBLGdCQUFLSSxLQUFMLEdBQWEsaUJBQU0sT0FBSzdELE1BQVgsRUFBbUIsZ0JBQW5CLENBQWI7QUFDQSxnQkFBS3JJLEtBQUwsR0FBYSxDQUFiO0FBQ0EsZ0JBQUtDLE1BQUwsR0FBYyxDQUFkO0FBQ0EsZ0JBQUtwRixLQUFMLEdBQWFBLEtBQWI7QUFaeUI7QUFhNUI7Ozs7Z0NBRU1vRixNLEVBQVFELEssRUFBTztBQUNsQixpQkFBSUEsVUFBVSxLQUFLQSxLQUFmLElBQ0dDLFdBQVcsS0FBS0EsTUFEdkIsRUFDK0I7QUFDM0Isc0JBQUs4TCxZQUFMLENBQWtCN0ssV0FBbEIsR0FBbUNsQixLQUFuQyxTQUE0Q0MsTUFBNUM7QUFDQSxzQkFBS2lNLEtBQUwsQ0FBV2xMLEtBQVgsQ0FBaUJ2RCxLQUFqQixHQUE0QnVDLFFBQU1DLE1BQU4sR0FBYSxHQUF6Qzs7QUFFQSxxQkFBSUQsVUFBVSxDQUFWLElBQWVBLFFBQVEsS0FBSzZMLElBQWIsS0FBc0IsQ0FBekMsRUFBNEM7QUFDeEMsMEJBQUtwSCxJQUFMLENBQVUsT0FBVixFQUFtQjtBQUNmekUsZ0NBQU9BLEtBRFE7QUFFZkMsaUNBQVFBLE1BRk87QUFHZkMsK0JBQU1tRyxTQUFTckcsUUFBUSxLQUFLNkwsSUFBdEI7QUFIUyxzQkFBbkI7QUFLSDtBQUNELHNCQUFLN0wsS0FBTCxHQUFhQSxLQUFiO0FBQ0Esc0JBQUtDLE1BQUwsR0FBY0EsTUFBZDtBQUNIO0FBQ0o7OztxQ0FLRTtBQUFBOztBQUFBLGlCQUZDakUsR0FFRCxTQUZDQSxHQUVEO0FBQUEsaUJBRENDLE1BQ0QsU0FEQ0EsTUFDRDs7QUFDQyxpQkFBTXBCLFFBQVEsS0FBS0EsS0FBbkI7O0FBRUEsb0JBQU8sa0JBQVksVUFBQ3lHLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNwQyx3QkFBS3lLLFNBQUwsQ0FBZXhDLFNBQWYsR0FBMkJ4TixHQUEzQjtBQUNBLHdCQUFLaVEsUUFBTCxDQUFjcEQsU0FBZCxhQUFrQzVNLE1BQWxDO0FBQ0Esd0JBQUtnUSxRQUFMLENBQWNqTCxLQUFkLENBQW9Cc0osZUFBcEIsWUFDV3pQLE1BQU0sVUFBVW9CLE1BQWhCLEVBQXdCOEcsR0FEbkM7QUFFQSx3QkFBS3NGLE1BQUwsQ0FBWVEsU0FBWixHQUF3QixNQUF4Qjs7QUFFQSxrQ0FBTSxHQUFOLEVBQ0tsTSxJQURMLENBQ1UsWUFBTTtBQUNSLDRCQUFLcVAsU0FBTCxDQUFlaEwsS0FBZixDQUFxQmdHLE9BQXJCLEdBQStCLEVBQS9CO0FBQ0EsNEJBQUtpRixRQUFMLENBQWNqTCxLQUFkLENBQW9CZ0csT0FBcEIsR0FBOEIsRUFBOUI7QUFDQSw0QkFBTyxpQkFBTSxJQUFOLENBQVA7QUFDSCxrQkFMTCxFQU1LckssSUFOTCxDQU1VLFlBQU07QUFDUiw0QkFBS3FQLFNBQUwsQ0FBZWhMLEtBQWYsQ0FBcUJnRyxPQUFyQixHQUErQixNQUEvQjtBQUNBLDRCQUFLaUYsUUFBTCxDQUFjakwsS0FBZCxDQUFvQmdHLE9BQXBCLEdBQThCLE1BQTlCO0FBQ0EsNEJBQUtxQixNQUFMLENBQVlRLFNBQVosR0FBd0IsRUFBeEI7QUFDQSw0QkFBTyxpQkFBTSxHQUFOLENBQVA7QUFDSCxrQkFYTCxFQVlLbE0sSUFaTCxDQVlVLFlBQU07QUFDUjJFO0FBQ0gsa0JBZEw7QUFlSCxjQXRCTSxDQUFQO0FBdUJIOzs7aUNBRU87QUFBQTs7QUFDSixvQkFBTyxrQkFBWSxVQUFDQSxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDcEMseUJBQUs4RyxNQUFMLENBQVlySCxLQUFaLENBQWtCZ0csT0FBbEIsR0FBNEIsRUFBNUI7QUFDQTFGO0FBQ0gsY0FITSxDQUFQO0FBSUg7Ozs7Ozs7OztBQ2xTTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUF3RjtBQUN4RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLGlDQUFnQyxVQUFVLEVBQUU7QUFDNUMsRTs7Ozs7O0FDcEJBO0FBQ0E7OztBQUdBO0FBQ0EsNENBQTJDLHlCQUF5QixxQkFBcUIsa0JBQWtCLHFCQUFxQixzQkFBc0IsMkJBQTJCLCtCQUErQixnQ0FBZ0MsbUNBQW1DLG9DQUFvQyx5Q0FBeUMsR0FBRywrQkFBK0Isc0JBQXNCLHVCQUF1Qix5QkFBeUIsMkNBQTJDLHFhQUFxYSxtQ0FBbUMsd0NBQXdDLHlDQUF5Qyx3QkFBd0IsR0FBRywyQkFBMkIsb0JBQW9CLHFCQUFxQix5QkFBeUIsZ0NBQWdDLHlCQUF5Qiw2QkFBNkIscUJBQXFCLG9CQUFvQixxREFBcUQsOENBQThDLHdCQUF3QixHQUFHLGdDQUFnQyxvQkFBb0IscUJBQXFCLHVCQUF1QixHQUFHLG1DQUFtQyx5QkFBeUIseUJBQXlCLGFBQWEsZUFBZSxvQkFBb0IscUJBQXFCLDBCQUEwQix5QkFBeUIsR0FBRyxnQ0FBZ0MseUJBQXlCLHNCQUFzQixzQkFBc0IseUJBQXlCLG1CQUFtQixtQkFBbUIsc0JBQXNCLHFCQUFxQixHQUFHLCtCQUErQix5QkFBeUIscUJBQXFCLG1CQUFtQixtQ0FBbUMsK0JBQStCLCtCQUErQixHQUFHLG1DQUFtQyxzQkFBc0IscUJBQXFCLEdBQUcsbUNBQW1DLHNCQUFzQix1QkFBdUIsR0FBRyxtQ0FBbUMsc0JBQXNCLHVCQUF1QixHQUFHLCtCQUErQiw2QkFBNkIsb0JBQW9CLHFCQUFxQixnQ0FBZ0MsNkJBQTZCLG9CQUFvQixHQUFHLG1DQUFtQyxlQUFlLG1CQUFtQixnQ0FBZ0MsNkJBQTZCLEdBQUc7O0FBRS9uRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1BBOztBQUNBOztBQVFBOzs7Ozs7S0FFcUI2SyxHOzs7QUFDakIsa0JBQVlwUixRQUFaLEVBQXNCNEUsTUFBdEIsRUFBOEJDLE1BQTlCLEVBQXNDO0FBQUE7O0FBQUE7O0FBR2xDLGVBQUs3RSxRQUFMLEdBQWdCLGlCQUFNQSxRQUFOLEVBQWdCLFlBQWhCLENBQWhCO0FBQ0EsZUFBS3NOLE1BQUwsR0FBYyxpQkFBTSxNQUFLdE4sUUFBWCxFQUFxQixPQUFyQixDQUFkO0FBQ0EsZUFBS3FSLFFBQUwsR0FBZ0IsaUJBQU0sTUFBS3JSLFFBQVgsRUFBcUIsUUFBckIsQ0FBaEI7QUFDQSxlQUFLeUUsTUFBTCxHQUFjLE1BQUs0TSxRQUFMLENBQWNoSixVQUFkLENBQXlCLElBQXpCLENBQWQ7QUFDQSxlQUFLaUosV0FBTCxHQUFtQixpQkFBTSxNQUFLdFIsUUFBWCxFQUFxQixZQUFyQixDQUFuQjtBQUNBLGVBQUsrUSxNQUFMLEdBQWMsaUJBQU0sTUFBSy9RLFFBQVgsRUFBcUIsU0FBckIsQ0FBZDtBQUNBLGVBQUs0RSxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxlQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxlQUFLME0sTUFBTCxHQUFjLEtBQWQ7QUFYa0M7QUFZckM7Ozs7OEJBRUlDLEcsRUFBSztBQUNOLGtCQUFLVCxNQUFMLENBQVk1SyxXQUFaLEdBQTBCcUwsR0FBMUI7QUFDSDs7O2dDQUVNMU0sRSxFQUFJQyxFLEVBQUk7QUFBQSw0QkFDOEIsbUJBQVEsS0FBS3NNLFFBQWIsQ0FEOUI7QUFBQSxpQkFDR0ksTUFESCxZQUNKL08sS0FESTtBQUFBLGlCQUNtQmdQLE9BRG5CLFlBQ1cvTyxNQURYOztBQUFBLDZCQUU4QixtQkFBUSxLQUFLMk8sV0FBYixDQUY5QjtBQUFBLGlCQUVHSyxNQUZILGFBRUpqUCxLQUZJO0FBQUEsaUJBRW1Ca1AsT0FGbkIsYUFFV2pQLE1BRlg7O0FBQUEsaUJBR1FrUCxNQUhSLEdBR3dDLElBSHhDLENBR0poSCxVQUhJO0FBQUEsaUJBRzZCaUgsT0FIN0IsR0FHd0MsSUFIeEMsQ0FHZ0JoSCxXQUhoQjs7O0FBS1gsa0JBQUt3RyxXQUFMLENBQWlCckwsS0FBakIsQ0FBdUJxSixlQUF2QixxQkFDbUJtQyxTQUFTM00sRUFBVCxHQUFjK00sU0FBUyxDQUF2QixHQUEyQkYsU0FBUyxDQUR2RCxjQUMrREQsVUFBVTNNLEVBQVYsR0FBZStNLFVBQVUsQ0FBekIsR0FBNkJGLFVBQVUsQ0FEdEc7QUFFSDs7OytCQUVLOU0sRSxFQUFJQyxFLEVBQUk7QUFBQSw2QkFDK0IsbUJBQVEsS0FBS3NNLFFBQWIsQ0FEL0I7QUFBQSxpQkFDSUksTUFESixhQUNIL08sS0FERztBQUFBLGlCQUNvQmdQLE9BRHBCLGFBQ1kvTyxNQURaOztBQUFBLGlCQUVTa1AsTUFGVCxHQUV5QyxJQUZ6QyxDQUVIaEgsVUFGRztBQUFBLGlCQUU4QmlILE9BRjlCLEdBRXlDLElBRnpDLENBRWlCaEgsV0FGakI7OztBQUlWLGtCQUFLckcsTUFBTCxDQUFZc04sUUFBWixDQUFxQk4sU0FBUzNNLEVBQTlCLEVBQWtDNE0sVUFBVTNNLEVBQTVDLEVBQWdEOE0sTUFBaEQsRUFBd0RDLE9BQXhEO0FBQ0g7OztpQ0FFTztBQUFBOztBQUNKLG9CQUFPLGtCQUFZLFVBQUN2TCxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDcEMsd0JBQUt4RyxRQUFMLENBQWNpRyxLQUFkLENBQW9CZ0csT0FBcEIsR0FBOEIsRUFBOUI7O0FBRG9DLGlDQUdaLG1CQUFRLE9BQUtvRixRQUFiLENBSFk7QUFBQSxxQkFHN0IzTyxLQUg2QixhQUc3QkEsS0FINkI7QUFBQSxxQkFHdEJDLE1BSHNCLGFBR3RCQSxNQUhzQjs7QUFJcEMsd0JBQUtELEtBQUwsR0FBYUEsS0FBYjtBQUNBLHdCQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSx3QkFBS2tJLFVBQUwsR0FBa0JuSSxRQUFRLE9BQUtrQyxNQUEvQjtBQUNBLHdCQUFLa0csV0FBTCxHQUFtQm5JLFNBQVMsT0FBS2tDLE1BQWpDOztBQUVBLHdCQUFLd00sUUFBTCxDQUFjM08sS0FBZCxHQUFzQkEsS0FBdEI7QUFDQSx3QkFBSzJPLFFBQUwsQ0FBYzFPLE1BQWQsR0FBdUJBLE1BQXZCO0FBQ0Esd0JBQUs4QixNQUFMLENBQVlKLFNBQVosQ0FBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIzQixLQUE1QixFQUFtQ0MsTUFBbkM7QUFDQSx3QkFBSzhCLE1BQUwsQ0FBWXVOLFNBQVosR0FBd0IsU0FBeEI7QUFDQSx3QkFBS3ZOLE1BQUwsQ0FBWXNOLFFBQVosQ0FBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsRUFBMkJyUCxLQUEzQixFQUFrQ0MsTUFBbEM7QUFDQSx3QkFBSzhCLE1BQUwsQ0FBWXVOLFNBQVosR0FBd0Isa0JBQXhCO0FBQ0Esd0JBQUt2TixNQUFMLENBQVl3Tix3QkFBWixHQUF1QyxpQkFBdkM7O0FBRUExTDtBQUNILGNBbEJNLENBQVA7QUFtQkg7Ozs7O21CQXZEZ0I2SyxHOzs7Ozs7QUNYckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBd0Y7QUFDeEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxpQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEU7Ozs7OztBQ3BCQTtBQUNBOzs7QUFHQTtBQUNBLHVDQUFzQyx5QkFBeUIsbUJBQW1CLHFCQUFxQix5Q0FBeUMsbUNBQW1DLHdDQUF3QyxtQkFBbUIsMkNBQTJDLDJCQUEyQiwrQkFBK0IsZ0NBQWdDLEdBQUcsc0JBQXNCLGdDQUFnQyw2QkFBNkIsb0JBQW9CLG1CQUFtQiwrQkFBK0IsbUNBQW1DLCtCQUErQiw2QkFBNkIsdUJBQXVCLHlCQUF5QixHQUFHLHFCQUFxQixrQkFBa0IsbUJBQW1CLEdBQUcsMkJBQTJCLGNBQWMsYUFBYSxpQkFBaUIsa0JBQWtCLHlCQUF5Qix5QkFBeUIsd0NBQXdDLGlCQUFpQixpRUFBaUUsR0FBRyx3QkFBd0IsMkNBQTJDLHFyR0FBcXJHLDhCQUE4Qix5Q0FBeUMsbUNBQW1DLDZCQUE2QixxQkFBcUIsc0JBQXNCLG1CQUFtQixtQkFBbUIseUJBQXlCLG1CQUFtQixrQkFBa0IseUJBQXlCLHdCQUF3QixHQUFHLHdCQUF3QixzQkFBc0Isc0JBQXNCLGtCQUFrQixHQUFHLGdDQUFnQyxVQUFVLHFCQUFxQixPQUFPLGNBQWMscUJBQXFCLE9BQU8sR0FBRzs7QUFFcHZKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQQTs7QUFZQTs7Ozs7O0tBRXFCYyxNOzs7QUFDakIsdUJBQXFCO0FBQUE7O0FBQUE7O0FBQUEsMkNBQU5yRixJQUFNO0FBQU5BLGlCQUFNO0FBQUE7O0FBQUEsc0tBQ1JBLElBRFE7O0FBR2pCLGVBQUtzRixHQUFMLEdBQVcsQ0FBWDtBQUNBLGVBQUtDLEtBQUwsR0FBYSxtQkFBYjtBQUNBLGVBQUtDLEtBQUwsR0FBYSxtQkFBYjtBQUxpQjtBQU1wQjs7Ozs2QkFFR0MsQyxFQUFHO0FBQ0gsaUJBQUlBLEtBQUssQ0FBQyxLQUFLRCxLQUFMLENBQVdFLEdBQVgsQ0FBZUQsQ0FBZixDQUFWLEVBQTZCO0FBQ3pCLHFCQUFNekosS0FBSyxLQUFLc0osR0FBTCxFQUFYO0FBQ0Esc0JBQUtDLEtBQUwsQ0FBV0ksR0FBWCxDQUFlM0osRUFBZixFQUFtQnlKLENBQW5CO0FBQ0Esc0JBQUtELEtBQUwsQ0FBV0csR0FBWCxDQUFlRixDQUFmLEVBQWtCO0FBQ2R6Six5QkFBSUEsRUFEVTtBQUVkbEMsK0JBQVUsa0JBRkk7QUFHZDhMLDZCQUFRLEtBSE07QUFJZEMsNEJBQU8sQ0FKTztBQUtkbkUsOEJBQVMsQ0FMSztBQU1kQyw0QkFBTztBQU5PLGtCQUFsQjtBQVFBLHdCQUFPM0YsRUFBUDtBQUNIO0FBQ0o7Ozs2QkFFR0EsRSxFQUFJO0FBQ0osb0JBQU8sT0FBT0EsRUFBUCxLQUFjLFFBQWQsSUFBMEIsS0FBS3VKLEtBQUwsQ0FBV0csR0FBWCxDQUFlMUosRUFBZixDQUFqQztBQUNIOzs7aUNBRU1BLEUsRUFBSTtBQUNQLGlCQUFJLEtBQUswSixHQUFMLENBQVMxSixFQUFULENBQUosRUFBa0I7QUFDZCxxQkFBTXlKLElBQUksS0FBS0YsS0FBTCxDQUFXTyxHQUFYLENBQWU5SixFQUFmLENBQVY7QUFDQSxxQkFBTStKLElBQUksS0FBS1AsS0FBTCxDQUFXTSxHQUFYLENBQWVMLENBQWYsQ0FBVjtBQUNBTSxtQkFBRUgsTUFBRixHQUFXLElBQVg7QUFDQUcsbUJBQUVqTSxRQUFGLENBQVdKLE9BQVg7QUFDQSxzQkFBSzZMLEtBQUwsQ0FBVzVPLE1BQVgsQ0FBa0JxRixFQUFsQjtBQUNBLHNCQUFLd0osS0FBTCxDQUFXN08sTUFBWCxDQUFrQjhPLENBQWxCO0FBQ0g7QUFDSjs7OzZCQUVHekosRSxFQUFJO0FBQ0osaUJBQUksS0FBSzBKLEdBQUwsQ0FBUzFKLEVBQVQsQ0FBSixFQUFrQjtBQUNkLHFCQUFNeUosSUFBSSxLQUFLRixLQUFMLENBQVdPLEdBQVgsQ0FBZTlKLEVBQWYsQ0FBVjtBQUNBLHFCQUFNK0osSUFBSSxLQUFLUCxLQUFMLENBQVdNLEdBQVgsQ0FBZUwsQ0FBZixDQUFWO0FBQ0Esd0JBQU9NLEVBQUVqTSxRQUFGLENBQVdDLE9BQWxCO0FBQ0gsY0FKRCxNQUlPO0FBQ0gsd0JBQU8sY0FBUUwsT0FBUixFQUFQO0FBQ0g7QUFDSjs7OytCQUVLO0FBQUE7O0FBQ0Ysa0JBQUttTSxLQUFMLEdBQWFHLEtBQUtDLEdBQUwsRUFBYjtBQUNBLGtCQUFLdkUsT0FBTCxHQUFlLENBQWY7QUFDQSxrQkFBS0MsS0FBTCxHQUFhLENBQWI7O0FBRUEsaUJBQU11RSxPQUFPLFNBQVBBLElBQU8sR0FBTTtBQUNmLGdDQUFJQSxJQUFKOztBQUVBLHFCQUFJRCxNQUFNRCxLQUFLQyxHQUFMLEVBQVY7QUFDQSxxQkFBSXZFLFVBQVV1RSxNQUFNLE9BQUtKLEtBQXpCOztBQUVBLHdCQUFLbEUsS0FBTCxHQUFhRCxVQUFVLE9BQUtBLE9BQTVCO0FBQ0Esd0JBQUtBLE9BQUwsR0FBZUEsT0FBZjs7QUFFQSx3QkFBSzdFLElBQUwsQ0FBVSxZQUFWLEVBQXdCO0FBQ3BCZ0osNEJBQU8sT0FBS0EsS0FEUTtBQUVwQmxFLDRCQUFPLE9BQUtBLEtBRlE7QUFHcEJELDhCQUFTLE9BQUtBO0FBSE0sa0JBQXhCOztBQU1BLHFCQUFNeUUsa0RBQVcsT0FBS1gsS0FBTCxDQUFXVyxJQUFYLEVBQVgsRUFBTjs7QUFFQUEsc0JBQUtwRyxPQUFMLENBQWEsYUFBSztBQUNkLHlCQUFNZ0csSUFBSSxPQUFLUCxLQUFMLENBQVdNLEdBQVgsQ0FBZUwsQ0FBZixDQUFWOztBQUVBLHlCQUFJLENBQUNNLEVBQUVILE1BQVAsRUFBZTtBQUNYLDZCQUFNSyxPQUFNRCxLQUFLQyxHQUFMLEVBQVo7QUFDQUYsMkJBQUVGLEtBQUYsR0FBVUUsRUFBRUYsS0FBRixLQUFZRSxFQUFFRixLQUFGLEdBQVVJLElBQXRCLENBQVY7O0FBRUEsNkJBQU12RSxXQUFVdUUsT0FBTUYsRUFBRUYsS0FBeEI7QUFDQUUsMkJBQUVwRSxLQUFGLEdBQVVELFdBQVVxRSxFQUFFckUsT0FBdEI7QUFDQXFFLDJCQUFFckUsT0FBRixHQUFZQSxRQUFaOztBQUVBLDZCQUFJK0QsRUFBRU0sQ0FBRixTQUFKLEVBQWdCO0FBQ1osb0NBQUtwUCxNQUFMLENBQVlvUCxFQUFFL0osRUFBZDtBQUNIO0FBQ0o7QUFDSixrQkFmRDs7QUFpQkFpSyx1QkFBTUQsS0FBS0MsR0FBTCxFQUFOO0FBQ0F2RSwyQkFBVXVFLE1BQU0sT0FBS0osS0FBckI7O0FBRUEsd0JBQUtsRSxLQUFMLEdBQWFELFVBQVUsT0FBS0EsT0FBNUI7QUFDQSx3QkFBS0EsT0FBTCxHQUFlQSxPQUFmOztBQUVBLHdCQUFLN0UsSUFBTCxDQUFVLFdBQVYsRUFBdUI7QUFDbkJnSiw0QkFBTyxPQUFLQSxLQURPO0FBRW5CbEUsNEJBQU8sT0FBS0EsS0FGTztBQUduQkQsOEJBQVMsT0FBS0E7QUFISyxrQkFBdkI7QUFLSCxjQTdDRDtBQThDQSw0QkFBSXdFLElBQUo7O0FBRUEsb0JBQU8sSUFBUDtBQUNIOzs7OzttQkF4R2dCYixNOzs7Ozs7QUNkckIsbUJBQWtCLHlEOzs7Ozs7QUNBbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDOzs7Ozs7QUNMQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5QkFBd0IsbUVBQW1FO0FBQzNGLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsZ0I7Ozs7OztBQ2hCRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBc0IsT0FBTztBQUM3QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBNkI7QUFDN0IsMkJBQTBCO0FBQzFCLDJCQUEwQjtBQUMxQixzQkFBcUI7QUFDckI7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBNkQsT0FBTztBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBeUI7QUFDekIsc0JBQXFCO0FBQ3JCLDJCQUEwQjtBQUMxQixNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxHOzs7Ozs7QUM3SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSCxHOzs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0gsRzs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLGlCQUFpQixFQUFFO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZ0UsZ0JBQWdCO0FBQ2hGO0FBQ0E7QUFDQSxJQUFHLDJDQUEyQyxnQ0FBZ0M7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCOzs7Ozs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQW9CLGFBQWE7QUFDakMsSUFBRztBQUNILEc7Ozs7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEc7Ozs7OztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVMsZUFBZTtBQUN4QjtBQUNBO0FBQ0E7QUFDQSx1Q0FBc0M7QUFDdEM7QUFDQSwrQkFBOEI7QUFDOUIsOEJBQTZCO0FBQzdCLGdDQUErQjtBQUMvQixvQ0FBbUM7QUFDbkMsVUFBUywrQkFBK0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHOzs7Ozs7QUMzQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRzs7Ozs7O0FDTEE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILEc7Ozs7OztBQ2ZBO0FBQ0E7O0FBRUEsd0NBQXVDLHdDQUFnRCxFOzs7Ozs7QUNIdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7OztBQ1JBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTs7QUFDQTs7OztLQVlxQmUsRztBQUNqQixrQkFBWWpULFFBQVosRUFBc0I7QUFBQTs7QUFDbEIsY0FBS2tULEtBQUwsR0FBYSxpQkFBTWxULFFBQU4sRUFBZ0IsTUFBaEIsQ0FBYjtBQUNIOzs7O2lDQUVPO0FBQUE7O0FBQ0osb0JBQU8sa0JBQVksVUFBQ3VHLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNwQyx1QkFBSzJNLFNBQUwsR0FBaUIsaUJBQU0sTUFBS0QsS0FBWCxFQUFrQixVQUFsQixDQUFqQjtBQUNBLHVCQUFLRSxPQUFMLEdBQWUsaUJBQU0sTUFBS0YsS0FBWCxFQUFrQixXQUFsQixDQUFmO0FBQ0EsdUJBQUtHLE9BQUwsR0FBZSxpQkFBTSxNQUFLSCxLQUFYLEVBQWtCLFFBQWxCLENBQWY7QUFDQSx1QkFBS25DLE1BQUwsR0FBYyxpQkFBTSxNQUFLbUMsS0FBWCxFQUFrQixPQUFsQixDQUFkO0FBQ0EsdUJBQUtJLEtBQUwsR0FBYSxpQkFBTSxNQUFLSixLQUFYLEVBQWtCLFNBQWxCLENBQWI7QUFDQSx1QkFBS0ssS0FBTCxHQUFhLGlCQUFNLE1BQUtMLEtBQVgsRUFBa0IsU0FBbEIsQ0FBYjtBQUNBLHVCQUFLTSxNQUFMLEdBQWMsaUJBQU0sTUFBS04sS0FBWCxFQUFrQixPQUFsQixDQUFkO0FBQ0EsdUJBQUtPLFNBQUwsR0FBaUIsaUJBQU0sTUFBS1AsS0FBWCxFQUFrQixjQUFsQixDQUFqQjtBQUNBLHVCQUFLUSxVQUFMLEdBQWtCLGlCQUFNLE1BQUtSLEtBQVgsRUFBa0IsZUFBbEIsQ0FBbEI7O0FBRUEzTTtBQUNILGNBWk0sQ0FBUDtBQWFIOzs7aUNBRU87QUFBQTs7QUFDSixrQkFBSzRNLFNBQUwsQ0FBZWxOLEtBQWYsQ0FBcUIwTixVQUFyQixHQUFrQyxRQUFsQztBQUNBLGtCQUFLSCxNQUFMLENBQVl2TixLQUFaLENBQWtCME4sVUFBbEIsR0FBK0IsUUFBL0I7QUFDQSxrQkFBS1QsS0FBTCxDQUFXcEYsU0FBWCxHQUF1QixLQUFLb0YsS0FBTCxDQUFXcEYsU0FBWCxDQUFxQjhGLE9BQXJCLENBQTZCLE1BQTdCLEVBQXFDLE9BQXJDLENBQXZCOztBQUVBLG9CQUFPLGlCQUFNLEdBQU4sRUFBV2hTLElBQVgsQ0FBZ0IsWUFBTTtBQUN6Qix3QkFBS3NSLEtBQUwsQ0FBV2pOLEtBQVgsQ0FBaUJnRyxPQUFqQixHQUEyQixNQUEzQjtBQUNBLHdCQUFLaUgsS0FBTCxDQUFXcEYsU0FBWCxHQUF1QixFQUF2QjtBQUNILGNBSE0sQ0FBUDtBQUlIOzs7cUNBU0U7QUFBQTs7QUFBQSxpQkFOQ3RNLFFBTUQsUUFOQ0EsUUFNRDtBQUFBLGlCQUxDRixLQUtELFFBTENBLEtBS0Q7QUFBQSxpQkFKQ0MsSUFJRCxRQUpDQSxJQUlEO0FBQUEsaUJBSENMLE1BR0QsUUFIQ0EsTUFHRDtBQUFBLGlCQUZDTyxXQUVELFFBRkNBLFdBRUQ7QUFBQSxpQkFEQ0MsWUFDRCxRQURDQSxZQUNEOztBQUNDLG9CQUFPLGtCQUFZLFVBQUM2RSxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDcEMsd0JBQUswTSxLQUFMLENBQVdqTixLQUFYLENBQWlCZ0csT0FBakIsR0FBMkIsRUFBM0I7O0FBRUEsd0JBQUtvSCxPQUFMLENBQWFsTixXQUFiLEdBQTJCN0UsS0FBM0I7QUFDQSx3QkFBS3lQLE1BQUwsQ0FBWXRDLFNBQVosR0FBd0JsTixJQUF4Qjs7QUFFQSxxQkFBSUMsUUFBSixFQUFjO0FBQ1YsNEJBQUswUixLQUFMLENBQVdwRixTQUFYLHFCQUF1QzVNLE1BQXZDO0FBQ0g7O0FBRUQscUJBQU0yUyxVQUFVLFNBQVZBLE9BQVUsQ0FBQy9SLENBQUQsRUFBTztBQUNuQkEsdUJBQUVDLGNBQUY7QUFDQSw0QkFBSzBSLFNBQUwsQ0FBZXRFLG1CQUFmLENBQW1DLEtBQW5DLEVBQTBDMkUsV0FBMUM7QUFDQSw0QkFBS0osVUFBTCxDQUFnQnZFLG1CQUFoQixDQUFvQyxLQUFwQyxFQUEyQzRFLFlBQTNDO0FBQ0EsNEJBQU8sY0FBUXhOLE9BQVIsRUFBUDtBQUNILGtCQUxEOztBQU9BLDBCQUFTdU4sV0FBVCxDQUFxQmhTLENBQXJCLEVBQXdCO0FBQ3BCK1IsNkJBQVEvUixDQUFSLEVBQVdGLElBQVgsQ0FBZ0I7QUFBQSxnQ0FBTUgsZUFBZUEsYUFBckI7QUFBQSxzQkFBaEI7QUFDSDs7QUFFRCx3QkFBS2dTLFNBQUwsQ0FBZTVSLGdCQUFmLENBQWdDLEtBQWhDLEVBQXVDaVMsV0FBdkM7O0FBRUEsMEJBQVNDLFlBQVQsQ0FBc0JqUyxDQUF0QixFQUF5QjtBQUNyQitSLDZCQUFRL1IsQ0FBUixFQUFXRixJQUFYLENBQWdCO0FBQUEsZ0NBQU1GLGdCQUFnQkEsY0FBdEI7QUFBQSxzQkFBaEI7QUFDSDs7QUFFRCx3QkFBS2dTLFVBQUwsQ0FBZ0I3UixnQkFBaEIsQ0FBaUMsS0FBakMsRUFBd0NrUyxZQUF4Qzs7QUFFQSxnQ0FBSTtBQUFBLDRCQUFNLE9BQUtiLEtBQUwsQ0FBV3BGLFNBQVgsSUFBd0IsT0FBOUI7QUFBQSxrQkFBSjs7QUFFQSxrQ0FBTSxHQUFOLEVBQVdsTSxJQUFYLENBQWdCLFlBQU07QUFDbEIsNEJBQUt1UixTQUFMLENBQWVsTixLQUFmLENBQXFCME4sVUFBckIsR0FBa0MsRUFBbEM7QUFDQSw0QkFBS0gsTUFBTCxDQUFZdk4sS0FBWixDQUFrQjBOLFVBQWxCLEdBQStCLEVBQS9CO0FBQ0FwTjtBQUNILGtCQUpEO0FBS0gsY0FwQ00sQ0FBUDtBQXFDSDs7Ozs7bUJBN0VnQjBNLEc7Ozs7OztBQ2JyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUF3RjtBQUN4RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLGlDQUFnQyxVQUFVLEVBQUU7QUFDNUMsRTs7Ozs7O0FDcEJBO0FBQ0E7OztBQUdBO0FBQ0EsaUNBQWdDLHlCQUF5QixjQUFjLGFBQWEsaURBQWlELDRDQUE0QyxrQkFBa0IsbUJBQW1CLDJCQUEyQiwrQkFBK0IsZ0NBQWdDLEdBQUcsZ0JBQWdCLCtCQUErQixtQ0FBbUMsK0JBQStCLHlCQUF5QixHQUFHLG9CQUFvQixxQkFBcUIsc0JBQXNCLHlCQUF5QixtQ0FBbUMsdUNBQXVDLHVCQUF1QixHQUFHLHlCQUF5QixjQUFjLGFBQWEsbUNBQW1DLEdBQUcsMEJBQTBCLGVBQWUsYUFBYSxrQ0FBa0MsR0FBRyw4QkFBOEIsK0RBQStELEdBQUcsK0JBQStCLGdFQUFnRSxHQUFHLCtCQUErQiwrREFBK0QsR0FBRyxnQ0FBZ0MsZ0VBQWdFLEdBQUcsb0NBQW9DLFVBQVUsdUNBQXVDLE9BQU8sY0FBYyxtQ0FBbUMsT0FBTyxHQUFHLHFDQUFxQyxVQUFVLHNDQUFzQyxPQUFPLGNBQWMsc0NBQXNDLE9BQU8sR0FBRyxxQ0FBcUMsVUFBVSxtQ0FBbUMsT0FBTyxjQUFjLHVDQUF1QyxPQUFPLEdBQUcsc0NBQXNDLFVBQVUsc0NBQXNDLE9BQU8sY0FBYyxzQ0FBc0MsT0FBTyxHQUFHLG1CQUFtQixxQkFBcUIsc0JBQXNCLHVCQUF1Qix5QkFBeUIsR0FBRyxrQkFBa0Isb0JBQW9CLHlCQUF5QixxQkFBcUIsdUJBQXVCLGlCQUFpQixrQkFBa0IsbUNBQW1DLCtCQUErQiwrQkFBK0IsR0FBRyxzQkFBc0IscUJBQXFCLEdBQUcsa0JBQWtCLG9CQUFvQix5QkFBeUIsc0JBQXNCLHVCQUF1QixpQkFBaUIsa0JBQWtCLG1DQUFtQywrQkFBK0IsK0JBQStCLEdBQUcsc0JBQXNCLHFCQUFxQixHQUFHLDJCQUEyQixxQkFBcUIsR0FBRywyQkFBMkIscUJBQXFCLEdBQUcsbUJBQW1CLHlCQUF5QixxQkFBcUIsa0JBQWtCLHNCQUFzQixtQkFBbUIsa0NBQWtDLG1DQUFtQywrQkFBK0IsMkRBQTJELHVCQUF1QixHQUFHLGtDQUFrQyxVQUFVLCtDQUErQyxzQ0FBc0MsT0FBTyxhQUFhLCtDQUErQyxzQ0FBc0MsT0FBTyxlQUFlLGtEQUFrRCwwQ0FBMEMsT0FBTyxhQUFhLGtEQUFrRCwwQ0FBMEMsT0FBTyxlQUFlLGtEQUFrRCwwQ0FBMEMsT0FBTyxpQkFBaUIsa0RBQWtELDBDQUEwQyxPQUFPLFdBQVcsOENBQThDLHdDQUF3QyxPQUFPLGFBQWEsOENBQThDLHdDQUF3QyxPQUFPLGVBQWUsa0RBQWtELDBDQUEwQyxPQUFPLGFBQWEsa0RBQWtELDBDQUEwQyxPQUFPLGVBQWUsa0RBQWtELDBDQUEwQyxPQUFPLGlCQUFpQixrREFBa0QsMENBQTBDLE9BQU8sWUFBWSw0Q0FBNEMsbUNBQW1DLE9BQU8sR0FBRyxxQkFBcUIseUJBQXlCLHFCQUFxQixtQkFBbUIsc0JBQXNCLHVCQUF1QixzQ0FBc0MsbUNBQW1DLCtCQUErQix5REFBeUQsR0FBRyxvQ0FBb0MsVUFBVSwrQ0FBK0MsMENBQTBDLE9BQU8sZ0JBQWdCLCtDQUErQywwQ0FBMEMsT0FBTyxXQUFXLDhDQUE4QywwQ0FBMEMsT0FBTyxpQkFBaUIsOENBQThDLDBDQUEwQyxPQUFPLFdBQVcsOENBQThDLDBDQUEwQyxPQUFPLGlCQUFpQiw4Q0FBOEMsMENBQTBDLE9BQU8sV0FBVyw4Q0FBOEMsMENBQTBDLE9BQU8saUJBQWlCLDhDQUE4QywwQ0FBMEMsT0FBTyxXQUFXLDhDQUE4QywyQ0FBMkMsT0FBTyxpQkFBaUIsOENBQThDLDJDQUEyQyxPQUFPLFdBQVcsOENBQThDLDJDQUEyQyxPQUFPLGlCQUFpQiw4Q0FBOEMsMkNBQTJDLE9BQU8sV0FBVyw4Q0FBOEMsMkNBQTJDLE9BQU8saUJBQWlCLDhDQUE4QywyQ0FBMkMsT0FBTyxXQUFXLDhDQUE4QywyQ0FBMkMsT0FBTyxpQkFBaUIsOENBQThDLDJDQUEyQyxPQUFPLFdBQVcsOENBQThDLDJDQUEyQyxPQUFPLGlCQUFpQiw4Q0FBOEMsMkNBQTJDLE9BQU8sV0FBVyw4Q0FBOEMsMkNBQTJDLE9BQU8saUJBQWlCLDhDQUE4QywyQ0FBMkMsT0FBTyxZQUFZLDJDQUEyQyxtQ0FBbUMsT0FBTyxHQUFHLG1CQUFtQix5QkFBeUIsb0JBQW9CLG9CQUFvQixvQkFBb0IsdUJBQXVCLCtCQUErQixtQ0FBbUMsdUNBQXVDLHVEQUF1RCxHQUFHLGdDQUFnQyxVQUFVLG1DQUFtQyxPQUFPLGlCQUFpQixtQ0FBbUMsT0FBTyxhQUFhLHlDQUF5QyxPQUFPLGNBQWMseUNBQXlDLE9BQU8sSUFBSSxpQkFBaUIseUJBQXlCLGtCQUFrQixpQkFBaUIsb0JBQW9CLHNCQUFzQixrQkFBa0IsaU1BQWlNLEdBQUcsZ0JBQWdCLHlCQUF5QixrQkFBa0IsaUJBQWlCLG9CQUFvQixzQkFBc0IscUJBQXFCLGlNQUFpTSxHQUFHLG9CQUFvQix5QkFBeUIsY0FBYyx1QkFBdUIsa0JBQWtCLHFCQUFxQix5Q0FBeUMsbUNBQW1DLHFDQUFxQyxHQUFHLDZCQUE2QixvQkFBb0IsR0FBRyxnQkFBZ0Isb0JBQW9CLGtCQUFrQiwrQkFBK0IsZ0NBQWdDLDJCQUEyQixHQUFHLHdCQUF3QiwyQkFBMkIsR0FBRyxrQkFBa0IscUJBQXFCLHVCQUF1Qiw0QkFBNEIseUJBQXlCLGtCQUFrQiwrQkFBK0IsbUNBQW1DLCtCQUErQix1QkFBdUIsR0FBRzs7QUFFcnhSOzs7Ozs7Ozs7Ozs7bUJDUGU7QUFDWHpOLFlBQU8sRUFBRTtBQUNMSixlQUFNLEtBREg7QUFFSG5FLGNBQUssNEJBRkY7QUFHSEMsaUJBQVE7QUFITCxNQURJOztBQU9YOFMsYUFBUSxFQUFFO0FBQ041TyxlQUFNLEtBREY7QUFFSm5FLGNBQUssK0JBRkQ7QUFHSkMsaUJBQVE7QUFISixNQVBHOztBQWFYK1MsY0FBUyxFQUFFO0FBQ1A3TyxlQUFNLEtBREQ7QUFFTG5FLGNBQUssdUJBRkE7QUFHTEMsaUJBQVE7QUFISCxNQWJFOztBQW1CWGdULGNBQVMsRUFBRTtBQUNQOU8sZUFBTSxPQUREO0FBRUw5RCxnQkFBTyxXQUZGO0FBR0xDLGVBQU0sMkJBSEQ7QUFJTEwsaUJBQVE7QUFKSCxNQW5CRTs7QUEwQlhpVCxxQkFBZ0IsRUFBRTtBQUNkL08sZUFBTSxPQURNO0FBRVo5RCxnQkFBTyxXQUZLO0FBR1pDLGVBQU0sb0NBSE07QUFJWkwsaUJBQVE7QUFKSTtBQTFCTCxFIiwiZmlsZSI6ImdhbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlZDI0YThlNDA1ZjA0Y2JkMzcxMCIsImltcG9ydCAnLi9nYW1lLmNzcyc7XG5pbXBvcnQge1xuICAgIHdpbixcbiAgICBkb2MsXG4gICAgUHJvbWlzZSxcbiAgICBkZWZlcixcbiAgICBxdWVyeSxcbiAgICBxdWVyeUFsbCxcbiAgICBnZXRSZWN0LFxuICAgIGRlbGF5XG59IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgU2Nyb2xsZXIgZnJvbSAnLi9zY3JvbGxlcic7XG5pbXBvcnQgU3RhZ2UgZnJvbSAnLi9zdGFnZSc7XG5pbXBvcnQgT3BlbmluZyBmcm9tICcuL29wZW5pbmcnO1xuaW1wb3J0IEhlbGxvV29ybGQgZnJvbSAnLi9oZWxsb1dvcmxkJztcbmltcG9ydCBDbG91ZCBmcm9tICcuL2Nsb3VkJztcbmltcG9ydCBTdGFyIGZyb20gJy4vc3Rhcic7XG5pbXBvcnQge1xuICAgIFN0YXRpY0VsZW1lbnRzLFxuICAgIEFuaW1lRWxlbWVudHMsXG4gICAgRWxlbWVudENvdW50XG59IGZyb20gJy4vZWxlbWVudHMnO1xuaW1wb3J0IE1hcCBmcm9tICcuL21hcCc7XG5pbXBvcnQgVGlja2VyIGZyb20gJy4vdGlja2VyJztcbmltcG9ydCBQb3AgZnJvbSAnLi9wb3AnO1xuaW1wb3J0IHRleHRDb25maWcgZnJvbSAnLi90ZXh0Q29uZmlnJztcblxuY29uc3Qge1xuICAgIGFzc2V0c1ByZWxvYWQ6IHByZWxvYWQsXG4gICAgYXNzZXRzSXRlbXM6IGl0ZW1zLFxufSA9IHdpbjtcblxubGV0IHZpZXdwb3J0ID0gcXVlcnkoZG9jLmJvZHksICcjZ2FtZScpO1xubGV0IHNjcm9sbGVyO1xubGV0IHRpY2tlcjtcbmxldCBzdGFnZTtcbmxldCBvcGVuaW5nO1xubGV0IGhlbGxvV29ybGQ7XG5sZXQgY2xvdWQ7XG5sZXQgc3RhcjtcbmxldCBzdGF0aWNFbGVtZW50cztcbmxldCBhbmltZUVsZW1lbnRzO1xubGV0IGVsZW1lbnRDb3VudDtcbmxldCBtYXA7XG5sZXQgcG9wO1xuXG5mdW5jdGlvbiBzaG93VGlwKGNvbmZpZykge1xuICAgIGVsZW1lbnRDb3VudCAmJiBlbGVtZW50Q291bnQuc2hvdyh7XG4gICAgICAgIHRpcDogY29uZmlnLnRpcCxcbiAgICAgICAgYmdUeXBlOiBjb25maWcuYmdUeXBlXG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHNob3dQb3AoY29uZmlnKSB7XG4gICAgc2Nyb2xsZXIgJiYgKHNjcm9sbGVyLmVuYWJsZSA9IGZhbHNlKTtcblxuICAgIHBvcCAmJiBwb3AucG9wdXAoe1xuICAgICAgICB0aXRsZTogY29uZmlnLnRpdGxlLFxuICAgICAgICB0ZXh0OiBjb25maWcudGV4dCxcbiAgICAgICAgc2hhcmVibGU6IHRydWUsXG4gICAgICAgIGJnVHlwZTogY29uZmlnLmJnVHlwZSxcbiAgICAgICAgb25sZWZ0Y2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgIC8vIHBvcC5jbG9zZSgpLnRoZW4oKCkgPT4gc2Nyb2xsZXIuZW5hYmxlID0gdHJ1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9ucmlnaHRjbGljazogKCkgPT4ge1xuICAgICAgICAgICAgcG9wLmNsb3NlKCkudGhlbigoKSA9PiBzY3JvbGxlci5lbmFibGUgPSB0cnVlKTtcbiAgICAgICAgfVxuICAgIH0pIFxufVxuXG5wcmVsb2FkXG4gICAgLnRoZW4oKCkgPT4geyAvLyBwcmV2ZW50IGV2ZW50XG4gICAgICAgIHZpZXdwb3J0LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBlID0+IGUucHJldmVudERlZmF1bHQoKSk7XG4gICAgICAgIHZpZXdwb3J0LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGUgPT4gZS5wcmV2ZW50RGVmYXVsdCgpKTtcbiAgICAgICAgdmlld3BvcnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBlID0+IGUucHJldmVudERlZmF1bHQoKSk7XG4gICAgfSlcbiAgICAudGhlbigoKSA9PiB7IC8vIHRpY2tlclxuICAgICAgICB0aWNrZXIgPSBuZXcgVGlja2VyKCk7XG4gICAgICAgIHRpY2tlci5ydW4oKTtcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHsgLy8gb3BlbmluZ1xuICAgICAgICBvcGVuaW5nID0gbmV3IE9wZW5pbmcodmlld3BvcnQsIGl0ZW1zKTtcbiAgICAgICAgcmV0dXJuIG9wZW5pbmcucmVhZHkoKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZnJhbWVJZCA9IHRpY2tlci5hZGQob3BlbmluZy5wbGF5KCkpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGFySWQgPSB0aWNrZXIuYWRkKG9wZW5pbmcuc3RhcigpKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgICAgICAgICAgdGlja2VyLmVuZChmcmFtZUlkKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpY2tlci5lbmQoc3RhcklkKVxuICAgICAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wZW5pbmcuY2hpY2tlbigpLnRoZW4oKCkgPT4gZGVsYXkoMjAwMCkpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gb3BlbmluZy5lbmRpbmcoKSlcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHsgLy8gaGVsbG93b3JsZFxuICAgICAgICBoZWxsb1dvcmxkID0gbmV3IEhlbGxvV29ybGQodmlld3BvcnQsIGl0ZW1zKTtcbiAgICAgICAgcmV0dXJuIGhlbGxvV29ybGQucmVhZHkoKTtcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHsgLy8gc3RhZ2VcbiAgICAgICAgc3RhZ2UgPSBuZXcgU3RhZ2Uodmlld3BvcnQpO1xuICAgICAgICByZXR1cm4gc3RhZ2UucmVhZHkoKTtcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHsgLy8gc2Nyb2xsZXJcbiAgICAgICAgc2Nyb2xsZXIgPSBuZXcgU2Nyb2xsZXIoc3RhZ2Uud2lkdGgsIHN0YWdlLmhlaWdodCwgc3RhZ2UudncsIHN0YWdlLnZoLCAwLjMpO1xuICAgICAgICBzY3JvbGxlci5lbmFibGUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHNjcm9sbGVyLnJlYWR5KCk7XG4gICAgfSlcbiAgICAudGhlbigoKSA9PiB7IC8vIHRoaW5nc1xuICAgICAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuXG4gICAgICAgIC8vIHN0YXRpY0VsZW1lbnRzID0gbmV3IFN0YXRpY0VsZW1lbnRzKHN0YWdlLCBpdGVtcyk7XG4gICAgICAgIC8vIHByb21pc2VzLnB1c2goc3RhdGljRWxlbWVudHMucmVhZHkoKSk7XG5cbiAgICAgICAgLy8gYW5pbWVFbGVtZW50cyA9IG5ldyBBbmltZUVsZW1lbnRzKHN0YWdlLCBpdGVtcyk7XG4gICAgICAgIC8vIHByb21pc2VzLnB1c2goYW5pbWVFbGVtZW50cy5yZWFkeSgpKTtcblxuICAgICAgICBjbG91ZCA9IG5ldyBDbG91ZChzdGFnZSwgaXRlbXMpO1xuICAgICAgICBwcm9taXNlcy5wdXNoKGNsb3VkLnJlYWR5KCkpO1xuXG4gICAgICAgIHN0YXIgPSBuZXcgU3RhcihzdGFnZSwgaXRlbXMpO1xuICAgICAgICBwcm9taXNlcy5wdXNoKHN0YXIucmVhZHkoKSk7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHsgLy8gcmVuZGVyXG4gICAgICAgIGxldCBmaXJzdFJlbmRlcmVkID0gZmFsc2U7XG4gICAgICAgIGxldCBzY3JvbGxYID0gMDtcbiAgICAgICAgbGV0IHNjcm9sbFkgPSAwO1xuICAgICAgICAvLyBsZXQgcGxheUFuaW1lSWQ7XG4gICAgICAgIGxldCBjbGVhckNsb3VkSWQ7XG4gICAgICAgIGxldCBzdGFyUm9sbFkgPSBzdGFnZS52aDtcbiAgICAgICAgbGV0IHN0YXJSb2xsSWQgPSB0aWNrZXIuYWRkKCgpID0+IHtcbiAgICAgICAgICAgIHN0YXJSb2xsWSAtPSBzdGFyUm9sbFNwZWVkO1xuICAgICAgICAgICAgaWYgKHN0YXJSb2xsWSA8IDApIHtcbiAgICAgICAgICAgICAgICBzdGFyUm9sbFkgPSBzdGFnZS52aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBzdGFyUm9sbFNwZWVkID0gMTtcblxuICAgICAgICBzY3JvbGxlci5vbignc2Nyb2xsc3RhcnQnLCBlID0+IHtcbiAgICAgICAgICAgIGlmIChjbGVhckNsb3VkSWQpIHtcbiAgICAgICAgICAgICAgICB0aWNrZXIuZGVsZXRlKGNsZWFyQ2xvdWRJZCk7XG4gICAgICAgICAgICAgICAgY2xlYXJDbG91ZElkID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgKHBsYXlBbmltZUlkKSB7XG4gICAgICAgICAgICAvLyAgICAgdGlja2VyLmRlbGV0ZShwbGF5QW5pbWVJZCk7XG4gICAgICAgICAgICAvLyAgICAgcGxheUFuaW1lSWQgPSBudWxsO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9KTtcblxuICAgICAgICBzY3JvbGxlci5vbignc2Nyb2xsaW5nJywgZSA9PiB7XG4gICAgICAgICAgICBzY3JvbGxYID0gZS54O1xuICAgICAgICAgICAgc2Nyb2xsWSA9IGUueTtcbiAgICAgICAgICAgIC8vIGNvbnN0IFtob3ZlciwgcmVsYXRlZF0gPSBzdGFnZS5nZXRIb3ZlclNsaWNlKHNjcm9sbFgsIHNjcm9sbFkpO1xuICAgICAgICAgICAgLy8gc3RhdGljRWxlbWVudHMuZHJhd0ltYWdlcyhzY3JvbGxYLCBzY3JvbGxZKTtcbiAgICAgICAgICAgIC8vIGFuaW1lRWxlbWVudHMuZHJhd0ltYWdlcyhzY3JvbGxYLCBzY3JvbGxZKTtcbiAgICAgICAgICAgIC8vIGNsb3VkLmRyYXdJbWFnZXMoW2hvdmVyLCAuLi5yZWxhdGVkXSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNjcm9sbGVyLm9uKCdzY3JvbGxlbmQnLCBlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZvY3VzU2xpY2UgPSBzdGFnZS5nZXRGb2N1c1NsaWNlKHNjcm9sbFgsIHNjcm9sbFkpO1xuICAgICAgICAgICAgaWYgKGZvY3VzU2xpY2UpIHtcbiAgICAgICAgICAgICAgICBjbGVhckNsb3VkSWQgPSB0aWNrZXIuYWRkKGNsb3VkLmNsZWFyKGZvY3VzU2xpY2UpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2Nyb2xsZXIub24oJ3RhcCcsIGUgPT4ge1xuICAgICAgICAgICAgLy8gaWYgKGUub3JpZ2luYWxFdmVudC50YXJnZXQgPT09IHN0YWdlLmNhbnZhcykge1xuICAgICAgICAgICAgLy8gICAgIHBsYXlBbmltZUlkID0gdGlja2VyLmFkZChhbmltZUVsZW1lbnRzLnBsYXkoZS5leCwgZS5leSkpO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aWNrZXIub24oJ2FmdGVydGljaycsIGUgPT4ge1xuICAgICAgICAgICAgZWxlbWVudENvdW50ICYmIGVsZW1lbnRDb3VudC51cGRhdGUoc3RhZ2Uuc3BlY2lhbEFtb3VudCwgc3RhZ2Uuc3BlY2lhbEZvdW5kKTtcblxuICAgICAgICAgICAgY29uc3QgaG92ZXJTbGljZSA9IHN0YWdlLmdldEhvdmVyU2xpY2Uoc2Nyb2xsWCwgc2Nyb2xsWSk7XG4gICAgICAgICAgICAvLyBpZiAoIWZpcnN0UmVuZGVyZWRcbiAgICAgICAgICAgIC8vICAgICAgICAgfHwgc2Nyb2xsZXIuaXNTY3JvbGxpbmdcbiAgICAgICAgICAgIC8vICAgICAgICAgLy8gfHwgdGlja2VyLmhhcyhwbGF5QW5pbWVJZClcbiAgICAgICAgICAgIC8vICAgICAgICAgfHwgdGlja2VyLmhhcyhjbGVhckNsb3VkSWQpXG4gICAgICAgICAgICAvLyAgICAgICAgIHx8IHRpY2tlci5oYXMoc3RhclJvbGxJZClcbiAgICAgICAgICAgIC8vICAgICApIHtcblxuICAgICAgICAgICAgICAgIC8vIGlmICh0aWNrZXIuaGFzKHBsYXlBbmltZUlkKSkge1xuICAgICAgICAgICAgICAgIC8vICAgICBhbmltZUVsZW1lbnRzLmRyYXdJbWFnZXMoc2Nyb2xsWCwgc2Nyb2xsWSk7XG4gICAgICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgICAgICAgLy8gaWYgKCFmaXJzdFJlbmRlcmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB8fCB0aWNrZXIuaGFzKGNsZWFyQ2xvdWRJZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xvdWQuZHJhd0ltYWdlcyhob3ZlclNsaWNlLCBzY3JvbGxYLCBzY3JvbGxZKTtcbiAgICAgICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAgICAgICAvLyBpZiAoIWZpcnN0UmVuZGVyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHx8IHNjcm9sbGVyLmlzU2Nyb2xsaW5nXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB8fCB0aWNrZXIuaGFzKHBsYXlBbmltZUlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfHwgdGlja2VyLmhhcyhjbGVhckNsb3VkSWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWdlLm9mZnNjcmVlblJlbmRlci5jbGVhclJlY3QoMCwgMCwgc3RhZ2UudncsIHN0YWdlLnZoKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgc3RhZ2Uub2Zmc2NyZWVuUmVuZGVyLmRyYXdJbWFnZShzdGF0aWNFbGVtZW50cy5jYW52YXMsIDAsIDAsIHN0YWdlLnZ3LCBzdGFnZS52aCwgMCwgMCwgc3RhZ2UudncsIHN0YWdlLnZoKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgc3RhZ2Uub2Zmc2NyZWVuUmVuZGVyLmRyYXdJbWFnZShhbmltZUVsZW1lbnRzLmNhbnZhcywgMCwgMCwgc3RhZ2UudncsIHN0YWdlLnZoLCAwLCAwLCBzdGFnZS52dywgc3RhZ2UudmgpO1xuICAgICAgICAgICAgICAgICAgICBzdGFnZS5vZmZzY3JlZW5SZW5kZXIuZHJhd0ltYWdlKHN0YXIuaW1hZ2UsIDAsIHN0YXJSb2xsWSwgc3RhZ2UudncsIHN0YWdlLnZoLCAwLCAwLCBzdGFnZS52dywgc3RhZ2UudmgpO1xuICAgICAgICAgICAgICAgICAgICBzdGFnZS5vZmZzY3JlZW5SZW5kZXIuZHJhd0ltYWdlKGNsb3VkLmNhbnZhcywgMCwgMCwgc3RhZ2UudncsIHN0YWdlLnZoLCAwLCAwLCBzdGFnZS52dywgc3RhZ2UudmgpO1xuICAgICAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgICAgIHN0YWdlLnJlbmRlci5jbGVhclJlY3QoMCwgMCwgc3RhZ2UudncsIHN0YWdlLnZoKTtcbiAgICAgICAgICAgICAgICBzdGFnZS5yZW5kZXIuZHJhd0ltYWdlKHN0YWdlLm9mZnNjcmVlbkNhbnZhcywgMCwgMCwgc3RhZ2UudncsIHN0YWdlLnZoLCAwLCAwLCBzdGFnZS52dywgc3RhZ2UudmgpO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9KTtcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHsgLy8gc2hvdyBoZWxsb3dvcmxkXG4gICAgICAgIGNvbnN0IHRpY2tlcklkID0gdGlja2VyLmFkZChoZWxsb1dvcmxkLnBsYXkoKSk7XG4gICAgICAgIHJldHVybiB0aWNrZXIuZW5kKHRpY2tlcklkKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBkZWxheSgyMDAwKSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gaGVsbG9Xb3JsZC5lbmRpbmcoKSk7XG4gICAgfSlcbiAgICAudGhlbigoKSA9PiB7IC8vIG1hcFxuICAgICAgICBtYXAgPSBuZXcgTWFwKHZpZXdwb3J0LCBzdGFnZS5oU2xpY2UsIHN0YWdlLnZTbGljZSk7XG5cbiAgICAgICAgc2Nyb2xsZXIub24oJ3Njcm9sbGluZycsIGUgPT4ge1xuICAgICAgICAgICAgY29uc3QgeHAgPSBlLnggLyBzdGFnZS53aWR0aDtcbiAgICAgICAgICAgIGNvbnN0IHlwID0gZS55IC8gc3RhZ2UuaGVpZ2h0O1xuICAgICAgICAgICAgbWFwLnVwZGF0ZSh4cCwgeXApO1xuICAgICAgICB9KTtcblxuICAgICAgICBzY3JvbGxlci5vbignc2Nyb2xsZW5kJywgZSA9PiB7XG4gICAgICAgICAgICBjb25zdCB4cCA9IGUueCAvIHN0YWdlLndpZHRoO1xuICAgICAgICAgICAgY29uc3QgeXAgPSBlLnkgLyBzdGFnZS5oZWlnaHQ7XG4gICAgICAgICAgICBtYXAuY2xlYXIoeHAsIHlwKTtcbiAgICAgICAgICAgIGNvbnN0IGZvY3VzU2xpY2UgPSBzdGFnZS5nZXRGb2N1c1NsaWNlKGUueCwgZS55KTtcbiAgICAgICAgICAgIGlmIChmb2N1c1NsaWNlICYmIGZvY3VzU2xpY2UuZGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICBtYXAudGV4dChmb2N1c1NsaWNlLmRpc3RhbmNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG1hcC5yZWFkeSgpO1xuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4geyAvLyBwb3BcbiAgICAgICAgcG9wID0gbmV3IFBvcCh2aWV3cG9ydCk7XG4gICAgICAgIHJldHVybiBwb3AucmVhZHkoKTtcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHsgLy8gZWxlbWVudHMgY291bnRcbiAgICAgICAgZWxlbWVudENvdW50ID0gbmV3IEVsZW1lbnRDb3VudCh2aWV3cG9ydCwgaXRlbXMpO1xuXG4gICAgICAgIGVsZW1lbnRDb3VudC5vbignZm91bmQnLCAoe1xuICAgICAgICAgICAgZm91bmQsXG4gICAgICAgICAgICBhbW91bnQsXG4gICAgICAgICAgICB0aW1lXG4gICAgICAgIH0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHRleHRDb25maWdbYGZvdW5kJHtmb3VuZH1gXTtcblxuICAgICAgICAgICAgaWYgKGNvbmZpZykge1xuICAgICAgICAgICAgICAgIGlmIChjb25maWcudHlwZSA9PT0gJ3RpcCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd1RpcChjb25maWcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLnR5cGUgPT09ICdwb3B1cCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd1BvcChjb25maWcpOyAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZWxlbWVudENvdW50LnJlYWR5KCk7XG4gICAgfSlcbiAgICAudGhlbigoKSA9PiB7IC8vIGJvbmVcbiAgICAgICAgY29uc3QgYm9uZVggPSBzdGFnZS53aWR0aCAvIDIgLSBzdGFnZS52dyAvIDI7XG4gICAgICAgIGNvbnN0IGJvbmVZID0gc3RhZ2UuaGVpZ2h0IC0gc3RhZ2UudmggLyAyO1xuICAgICAgICBzY3JvbGxlci5lbmFibGUgPSB0cnVlO1xuICAgICAgICBzY3JvbGxlci5zY3JvbGxUbyhib25lWCwgYm9uZVkpO1xuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4geyAvLyBzaG93IGd1aWRlXG4gICAgICAgIHNob3dUaXAodGV4dENvbmZpZy5ndWlkZSk7XG4gICAgfSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2FtZS5qcyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvaW5kZXguanMhLi9nYW1lLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi8uLi9ub2RlX21vZHVsZXMvLjAuMTMuMUBzdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vZ2FtZS5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL2dhbWUuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9nYW1lLmNzc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiI2dhbWUge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBtYXJnaW46IDA7XFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4yNS4wQGNzcy1sb2FkZXIhLi9zcmMvZ2FtZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cclxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHJcblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcclxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XHJcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xyXG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XHJcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcclxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcclxuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxyXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xyXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxyXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxyXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xyXG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xyXG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4yNS4wQGNzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxudmFyIHN0eWxlc0luRG9tID0ge30sXHJcblx0bWVtb2l6ZSA9IGZ1bmN0aW9uKGZuKSB7XHJcblx0XHR2YXIgbWVtbztcclxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHRcdHJldHVybiBtZW1vO1xyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIC9tc2llIFs2LTldXFxiLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpO1xyXG5cdH0pLFxyXG5cdGdldEhlYWRFbGVtZW50ID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XHJcblx0fSksXHJcblx0c2luZ2xldG9uRWxlbWVudCA9IG51bGwsXHJcblx0c2luZ2xldG9uQ291bnRlciA9IDAsXHJcblx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AgPSBbXTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xyXG5cdGlmKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xyXG5cdFx0aWYodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XHJcblx0fVxyXG5cclxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cclxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXHJcblx0aWYgKHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XHJcblxyXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiA8aGVhZD4uXHJcblx0aWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcclxuXHJcblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0KTtcclxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcclxuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XHJcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcclxuXHRcdH1cclxuXHRcdGlmKG5ld0xpc3QpIHtcclxuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0KTtcclxuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcclxuXHRcdH1cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xyXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XHJcblx0XHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKVxyXG5cdFx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oKTtcclxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKSB7XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdGlmKGRvbVN0eWxlKSB7XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIHBhcnRzID0gW107XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMobGlzdCkge1xyXG5cdHZhciBzdHlsZXMgPSBbXTtcclxuXHR2YXIgbmV3U3R5bGVzID0ge307XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcclxuXHRcdHZhciBpZCA9IGl0ZW1bMF07XHJcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcclxuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XHJcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcclxuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcclxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKVxyXG5cdFx0XHRzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XHJcblx0fVxyXG5cdHJldHVybiBzdHlsZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZUVsZW1lbnQpIHtcclxuXHR2YXIgaGVhZCA9IGdldEhlYWRFbGVtZW50KCk7XHJcblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Bbc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XHJcblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcclxuXHRcdGlmKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xyXG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGhlYWQuZmlyc3RDaGlsZCk7XHJcblx0XHR9IGVsc2UgaWYobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcclxuXHRcdFx0aGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlRWxlbWVudCk7XHJcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XHJcblx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnLiBNdXN0IGJlICd0b3AnIG9yICdib3R0b20nLlwiKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcclxuXHRzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdHZhciBpZHggPSBzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlRWxlbWVudCk7XHJcblx0aWYoaWR4ID49IDApIHtcclxuXHRcdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG5cdHN0eWxlRWxlbWVudC50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xyXG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZUVsZW1lbnQpO1xyXG5cdHJldHVybiBzdHlsZUVsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpIHtcclxuXHR2YXIgbGlua0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcclxuXHRsaW5rRWxlbWVudC5yZWwgPSBcInN0eWxlc2hlZXRcIjtcclxuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGlua0VsZW1lbnQpO1xyXG5cdHJldHVybiBsaW5rRWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCwgdXBkYXRlLCByZW1vdmU7XHJcblxyXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xyXG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBzaW5nbGV0b25FbGVtZW50IHx8IChzaW5nbGV0b25FbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIGZhbHNlKTtcclxuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIHRydWUpO1xyXG5cdH0gZWxzZSBpZihvYmouc291cmNlTWFwICYmXHJcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xyXG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCk7XHJcblx0XHRyZW1vdmUgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XHJcblx0XHRcdGlmKHN0eWxlRWxlbWVudC5ocmVmKVxyXG5cdFx0XHRcdFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGVFbGVtZW50LmhyZWYpO1xyXG5cdFx0fTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xyXG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCk7XHJcblx0XHRyZW1vdmUgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0dXBkYXRlKG9iaik7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZShuZXdPYmopIHtcclxuXHRcdGlmKG5ld09iaikge1xyXG5cdFx0XHRpZihuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJlbW92ZSgpO1xyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XHJcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xyXG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xyXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XHJcblx0fTtcclxufSkoKTtcclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcoc3R5bGVFbGVtZW50LCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcclxuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XHJcblxyXG5cdGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XHJcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlRWxlbWVudC5jaGlsZE5vZGVzO1xyXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xyXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcclxuXHJcblx0aWYobWVkaWEpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcclxuXHR9XHJcblxyXG5cdGlmKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR3aGlsZShzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlTGluayhsaW5rRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XHJcblxyXG5cdGlmKHNvdXJjZU1hcCkge1xyXG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcclxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcclxuXHR9XHJcblxyXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xyXG5cclxuXHR2YXIgb2xkU3JjID0gbGlua0VsZW1lbnQuaHJlZjtcclxuXHJcblx0bGlua0VsZW1lbnQuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcblxyXG5cdGlmKG9sZFNyYylcclxuXHRcdFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMTMuMUBzdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiY29uc3Qgd2luID0gd2luZG93O1xuY29uc3Qge1xuICAgIGRvY3VtZW50OiBkb2MsXG4gICAgUHJvbWlzZSxcbiAgICBjcmVhdGVqc1xufSA9IHdpbjtcblxuZnVuY3Rpb24gYXBwZW5kU3R5bGUoY3NzVGV4dCkge1xuICAgIGNvbnN0IHN0eWxlID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgc3R5bGUudGV4dENvbnRlbnQgPSBjc3NUZXh0O1xuICAgIGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxuZnVuY3Rpb24gZG9tcmVhZHkoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKGRvYy5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHJlc29sdmUpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGRlZmVyKCkge1xuICAgIGNvbnN0IGRlZmVycmVkID0ge307XG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgIGRlZmVycmVkLnJlamVjdCA9IHJlamVjdFxuICAgIH0pO1xuICAgIGRlZmVycmVkLnByb21pc2UgPSBwcm9taXNlO1xuICAgIHJldHVybiBkZWZlcnJlZDtcbn1cblxuZnVuY3Rpb24gZGVsYXkodGltZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgdGltZSk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHF1ZXJ5KHZpZXdwb3J0LCBzZWxlY3Rvcikge1xuICAgIHJldHVybiB2aWV3cG9ydC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbn1cblxuZnVuY3Rpb24gcXVlcnlBbGwodmlld3BvcnQsIHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIFsuLi52aWV3cG9ydC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKV07XG59XG5cbmZ1bmN0aW9uIGdldFJlY3QoZWwpIHtcbiAgICByZXR1cm4gZWwucmVjdHMgfHwgKGVsLnJlY3RzID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpO1xufVxuXG5mdW5jdGlvbiBnZXREaXN0YW5jZSh4MSwgeTEsIHgyLCB5Mikge1xuICAgIHJldHVybiBNYXRoLnNxcnQoKHgxIC0geDIpICogKHgxIC0geDIpICsgKHkxIC0geTIpICogKHkxIC0geTIpKTtcbn1cblxuZnVuY3Rpb24gbG9hZEltZyhzcmMpIHtcbiAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuXG4gICAgcmV0dXJuIFtcbiAgICAgICAgaW1hZ2UsXG4gICAgICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHJlc29sdmUoaW1hZ2UpO1xuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gc3JjO1xuICAgICAgICB9KVxuICAgIF07XG59XG5cbmZ1bmN0aW9uIGltZzJDYW52YXMoaW1hZ2UsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICBjb25zdCBjYW52YXMgPSBkb2MuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcbiAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgIHJldHVybiBbY2FudmFzLCBjb250ZXh0XTtcbn1cblxuY29uc3QgcmFmID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24oZm4pIHtyZXR1cm4gc2V0VGltZW91dChmbiwgMSAvIDYwKX07XG5cbmNvbnN0IGNhZiA9IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSB8fCBcbiAgICAgICAgICAgIHdpbmRvdy53ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24oaWQpIHtjbGVhclRpbWVvdXQoaWQpfTtcblxuZXhwb3J0IHtcbiAgICB3aW4sXG4gICAgZG9jLFxuICAgIGRlZmVyLFxuICAgIFByb21pc2UsXG4gICAgY3JlYXRlanMsXG4gICAgYXBwZW5kU3R5bGUsXG4gICAgZG9tcmVhZHksXG4gICAgZGVsYXksXG4gICAgbG9hZEltZyxcbiAgICBpbWcyQ2FudmFzLFxuICAgIHF1ZXJ5LFxuICAgIHF1ZXJ5QWxsLFxuICAgIGdldFJlY3QsXG4gICAgZ2V0RGlzdGFuY2UsXG4gICAgcmFmLFxuICAgIGNhZlxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlsLmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZnJvbSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL2FycmF5L2Zyb21cIik7XG5cbnZhciBfZnJvbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9mcm9tKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyMltpXSA9IGFycltpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyMjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gKDAsIF9mcm9tMi5kZWZhdWx0KShhcnIpO1xuICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy90b0NvbnN1bWFibGVBcnJheS5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9hcnJheS9mcm9tXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL2FycmF5L2Zyb20uanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LmFycmF5LmZyb20nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLkFycmF5LmZyb207XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbS5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcbnZhciAkYXQgID0gcmVxdWlyZSgnLi9fc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24oaXRlcmF0ZWQpe1xuICB0aGlzLl90ID0gU3RyaW5nKGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4vLyAyMS4xLjUuMi4xICVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBpbmRleCA9IHRoaXMuX2lcbiAgICAsIHBvaW50O1xuICBpZihpbmRleCA+PSBPLmxlbmd0aClyZXR1cm4ge3ZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWV9O1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIHRoaXMuX2kgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4ge3ZhbHVlOiBwb2ludCwgZG9uZTogZmFsc2V9O1xufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBkZWZpbmVkICAgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG4vLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihUT19TVFJJTkcpe1xuICByZXR1cm4gZnVuY3Rpb24odGhhdCwgcG9zKXtcbiAgICB2YXIgcyA9IFN0cmluZyhkZWZpbmVkKHRoYXQpKVxuICAgICAgLCBpID0gdG9JbnRlZ2VyKHBvcylcbiAgICAgICwgbCA9IHMubGVuZ3RoXG4gICAgICAsIGEsIGI7XG4gICAgaWYoaSA8IDAgfHwgaSA+PSBsKXJldHVybiBUT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGwgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxuICAgICAgOiBUT19TVFJJTkcgPyBzLnNsaWNlKGksIGkgKyAyKSA6IChhIC0gMHhkODAwIDw8IDEwKSArIChiIC0gMHhkYzAwKSArIDB4MTAwMDA7XG4gIH07XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3N0cmluZy1hdC5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsICA9IE1hdGguY2VpbFxuICAsIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSAgICAgICAgPSByZXF1aXJlKCcuL19saWJyYXJ5JylcbiAgLCAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgcmVkZWZpbmUgICAgICAgPSByZXF1aXJlKCcuL19yZWRlZmluZScpXG4gICwgaGlkZSAgICAgICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgSXRlcmF0b3JzICAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsICRpdGVyQ3JlYXRlICAgID0gcmVxdWlyZSgnLi9faXRlci1jcmVhdGUnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpXG4gICwgSVRFUkFUT1IgICAgICAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIEJVR0dZICAgICAgICAgID0gIShbXS5rZXlzICYmICduZXh0JyBpbiBbXS5rZXlzKCkpIC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbiAgLCBGRl9JVEVSQVRPUiAgICA9ICdAQGl0ZXJhdG9yJ1xuICAsIEtFWVMgICAgICAgICAgID0gJ2tleXMnXG4gICwgVkFMVUVTICAgICAgICAgPSAndmFsdWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpe1xuICAkaXRlckNyZWF0ZShDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG4gIHZhciBnZXRNZXRob2QgPSBmdW5jdGlvbihraW5kKXtcbiAgICBpZighQlVHR1kgJiYga2luZCBpbiBwcm90bylyZXR1cm4gcHJvdG9ba2luZF07XG4gICAgc3dpdGNoKGtpbmQpe1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gIH07XG4gIHZhciBUQUcgICAgICAgID0gTkFNRSArICcgSXRlcmF0b3InXG4gICAgLCBERUZfVkFMVUVTID0gREVGQVVMVCA9PSBWQUxVRVNcbiAgICAsIFZBTFVFU19CVUcgPSBmYWxzZVxuICAgICwgcHJvdG8gICAgICA9IEJhc2UucHJvdG90eXBlXG4gICAgLCAkbmF0aXZlICAgID0gcHJvdG9bSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdXG4gICAgLCAkZGVmYXVsdCAgID0gJG5hdGl2ZSB8fCBnZXRNZXRob2QoREVGQVVMVClcbiAgICAsICRlbnRyaWVzICAgPSBERUZBVUxUID8gIURFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZCgnZW50cmllcycpIDogdW5kZWZpbmVkXG4gICAgLCAkYW55TmF0aXZlID0gTkFNRSA9PSAnQXJyYXknID8gcHJvdG8uZW50cmllcyB8fCAkbmF0aXZlIDogJG5hdGl2ZVxuICAgICwgbWV0aG9kcywga2V5LCBJdGVyYXRvclByb3RvdHlwZTtcbiAgLy8gRml4IG5hdGl2ZVxuICBpZigkYW55TmF0aXZlKXtcbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKCRhbnlOYXRpdmUuY2FsbChuZXcgQmFzZSkpO1xuICAgIGlmKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlKXtcbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xuICAgICAgLy8gZml4IGZvciBzb21lIG9sZCBlbmdpbmVzXG4gICAgICBpZighTElCUkFSWSAmJiAhaGFzKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUikpaGlkZShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgIH1cbiAgfVxuICAvLyBmaXggQXJyYXkje3ZhbHVlcywgQEBpdGVyYXRvcn0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmKERFRl9WQUxVRVMgJiYgJG5hdGl2ZSAmJiAkbmF0aXZlLm5hbWUgIT09IFZBTFVFUyl7XG4gICAgVkFMVUVTX0JVRyA9IHRydWU7XG4gICAgJGRlZmF1bHQgPSBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuICRuYXRpdmUuY2FsbCh0aGlzKTsgfTtcbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYoKCFMSUJSQVJZIHx8IEZPUkNFRCkgJiYgKEJVR0dZIHx8IFZBTFVFU19CVUcgfHwgIXByb3RvW0lURVJBVE9SXSkpe1xuICAgIGhpZGUocHJvdG8sIElURVJBVE9SLCAkZGVmYXVsdCk7XG4gIH1cbiAgLy8gUGx1ZyBmb3IgbGlicmFyeVxuICBJdGVyYXRvcnNbTkFNRV0gPSAkZGVmYXVsdDtcbiAgSXRlcmF0b3JzW1RBR10gID0gcmV0dXJuVGhpcztcbiAgaWYoREVGQVVMVCl7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogIERFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChWQUxVRVMpLFxuICAgICAga2V5czogICAgSVNfU0VUICAgICA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogJGVudHJpZXNcbiAgICB9O1xuICAgIGlmKEZPUkNFRClmb3Ioa2V5IGluIG1ldGhvZHMpe1xuICAgICAgaWYoIShrZXkgaW4gcHJvdG8pKXJlZGVmaW5lKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XG4gICAgfSBlbHNlICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKEJVR0dZIHx8IFZBTFVFU19CVUcpLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxuICByZXR1cm4gbWV0aG9kcztcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZWZpbmUuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSB0cnVlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2xpYnJhcnkuanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgID0gcmVxdWlyZSgnLi9fY29yZScpXG4gICwgY3R4ICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBoaWRlICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbih0eXBlLCBuYW1lLCBzb3VyY2Upe1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRlxuICAgICwgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuR1xuICAgICwgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuU1xuICAgICwgSVNfUFJPVE8gID0gdHlwZSAmICRleHBvcnQuUFxuICAgICwgSVNfQklORCAgID0gdHlwZSAmICRleHBvcnQuQlxuICAgICwgSVNfV1JBUCAgID0gdHlwZSAmICRleHBvcnQuV1xuICAgICwgZXhwb3J0cyAgID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSlcbiAgICAsIGV4cFByb3RvICA9IGV4cG9ydHNbUFJPVE9UWVBFXVxuICAgICwgdGFyZ2V0ICAgID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXVxuICAgICwga2V5LCBvd24sIG91dDtcbiAgaWYoSVNfR0xPQkFMKXNvdXJjZSA9IG5hbWU7XG4gIGZvcihrZXkgaW4gc291cmNlKXtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIGlmKG93biAmJiBrZXkgaW4gZXhwb3J0cyljb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uKEMpe1xuICAgICAgdmFyIEYgPSBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgICAgaWYodGhpcyBpbnN0YW5jZW9mIEMpe1xuICAgICAgICAgIHN3aXRjaChhcmd1bWVudHMubGVuZ3RoKXtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBDO1xuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IEMoYSk7XG4gICAgICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgQyhhLCBiKTtcbiAgICAgICAgICB9IHJldHVybiBuZXcgQyhhLCBiLCBjKTtcbiAgICAgICAgfSByZXR1cm4gQy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIEZbUFJPVE9UWVBFXSA9IENbUFJPVE9UWVBFXTtcbiAgICAgIHJldHVybiBGO1xuICAgIC8vIG1ha2Ugc3RhdGljIHZlcnNpb25zIGZvciBwcm90b3R5cGUgbWV0aG9kc1xuICAgIH0pKG91dCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUubWV0aG9kcy4lTkFNRSVcbiAgICBpZihJU19QUk9UTyl7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYodHlwZSAmICRleHBvcnQuUiAmJiBleHBQcm90byAmJiAhZXhwUHJvdG9ba2V5XSloaWRlKGV4cFByb3RvLCBrZXksIG91dCk7XG4gICAgfVxuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YCBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZiA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZih0eXBlb2YgX19nID09ICdudW1iZXInKV9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0ge3ZlcnNpb246ICcyLjQuMCd9O1xuaWYodHlwZW9mIF9fZSA9PSAnbnVtYmVyJylfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCB0aGF0LCBsZW5ndGgpe1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZih0aGF0ID09PSB1bmRlZmluZWQpcmV0dXJuIGZuO1xuICBzd2l0Y2gobGVuZ3RoKXtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbihhKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24oYSwgYil7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oLyogLi4uYXJncyAqLyl7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBkUCAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBhbk9iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpXG4gICwgdG9QcmltaXRpdmUgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIGRQICAgICAgICAgICAgID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyl7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZihJRThfRE9NX0RFRklORSl0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICBpZignZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKU9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKCFpc09iamVjdChpdCkpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50XG4gIC8vIGluIG9sZCBJRSB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0J1xuICAsIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgUyl7XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZih0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYml0bWFwLCB2YWx1ZSl7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZSAgOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZSAgICA6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWUgICAgICAgOiB2YWx1ZVxuICB9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faGlkZScpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwga2V5KXtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qc1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXJhdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG52YXIgY3JlYXRlICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJylcbiAgLCBkZXNjcmlwdG9yICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG5cbi8vIDI1LjEuMi4xLjEgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19oaWRlJykoSXRlcmF0b3JQcm90b3R5cGUsIHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpLCBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpe1xuICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHtuZXh0OiBkZXNjcmlwdG9yKDEsIG5leHQpfSk7XG4gIHNldFRvU3RyaW5nVGFnKENvbnN0cnVjdG9yLCBOQU1FICsgJyBJdGVyYXRvcicpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbnZhciBhbk9iamVjdCAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgZFBzICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHBzJylcbiAgLCBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKVxuICAsIElFX1BST1RPICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpXG4gICwgRW1wdHkgICAgICAgPSBmdW5jdGlvbigpeyAvKiBlbXB0eSAqLyB9XG4gICwgUFJPVE9UWVBFICAgPSAncHJvdG90eXBlJztcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIGNyZWF0ZURpY3QgPSBmdW5jdGlvbigpe1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdpZnJhbWUnKVxuICAgICwgaSAgICAgID0gZW51bUJ1Z0tleXMubGVuZ3RoXG4gICAgLCBsdCAgICAgPSAnPCdcbiAgICAsIGd0ICAgICA9ICc+J1xuICAgICwgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICByZXF1aXJlKCcuL19odG1sJykuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0Oic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2NyaXB0LXVybFxuICAvLyBjcmVhdGVEaWN0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuT2JqZWN0O1xuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUobHQgKyAnc2NyaXB0JyArIGd0ICsgJ2RvY3VtZW50LkY9T2JqZWN0JyArIGx0ICsgJy9zY3JpcHQnICsgZ3QpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICBjcmVhdGVEaWN0ID0gaWZyYW1lRG9jdW1lbnQuRjtcbiAgd2hpbGUoaS0tKWRlbGV0ZSBjcmVhdGVEaWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbaV1dO1xuICByZXR1cm4gY3JlYXRlRGljdCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKXtcbiAgdmFyIHJlc3VsdDtcbiAgaWYoTyAhPT0gbnVsbCl7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eTtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBjcmVhdGVEaWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkUHMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBkUCAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGdldEtleXMgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpe1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgICA9IGdldEtleXMoUHJvcGVydGllcylcbiAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgLCBpID0gMFxuICAgICwgUDtcbiAgd2hpbGUobGVuZ3RoID4gaSlkUC5mKE8sIFAgPSBrZXlzW2krK10sIFByb3BlcnRpZXNbUF0pO1xuICByZXR1cm4gTztcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwcy5qc1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbnZhciAka2V5cyAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJylcbiAgLCBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pe1xuICByZXR1cm4gJGtleXMoTywgZW51bUJ1Z0tleXMpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgaGFzICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCB0b0lPYmplY3QgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKVxuICAsIElFX1BST1RPICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIG5hbWVzKXtcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwga2V5O1xuICBmb3Ioa2V5IGluIE8paWYoa2V5ICE9IElFX1BST1RPKWhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSlpZihoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpe1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanNcbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanNcbi8vIG1vZHVsZSBpZCA9IDQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCB0b0xlbmd0aCAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIHRvSW5kZXggICA9IHJlcXVpcmUoJy4vX3RvLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKElTX0lOQ0xVREVTKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKCR0aGlzLCBlbCwgZnJvbUluZGV4KXtcbiAgICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KCR0aGlzKVxuICAgICAgLCBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aClcbiAgICAgICwgaW5kZXggID0gdG9JbmRleChmcm9tSW5kZXgsIGxlbmd0aClcbiAgICAgICwgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIGlmKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKXdoaWxlKGxlbmd0aCA+IGluZGV4KXtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIGlmKHZhbHVlICE9IHZhbHVlKXJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I3RvSW5kZXggaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKylpZihJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKXtcbiAgICAgIGlmKE9baW5kZXhdID09PSBlbClyZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWxlbmd0aC5qc1xuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgbWF4ICAgICAgID0gTWF0aC5tYXhcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaW5kZXgsIGxlbmd0aCl7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWluZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpXG4gICwgdWlkICAgID0gcmVxdWlyZSgnLi9fdWlkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanNcbi8vIG1vZHVsZSBpZCA9IDQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXydcbiAgLCBzdG9yZSAgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQuanNcbi8vIG1vZHVsZSBpZCA9IDQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGlkID0gMFxuICAsIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdWlkLmpzXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gKFxuICAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJ1xuKS5zcGxpdCgnLCcpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDQ4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faHRtbC5qc1xuLy8gbW9kdWxlIGlkID0gNDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgZGVmID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZlxuICAsIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIHRhZywgc3RhdCl7XG4gIGlmKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpZGVmKGl0LCBUQUcsIHtjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiB0YWd9KTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXRvLXN0cmluZy10YWcuanNcbi8vIG1vZHVsZSBpZCA9IDUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIHN0b3JlICAgICAgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgnd2tzJylcbiAgLCB1aWQgICAgICAgID0gcmVxdWlyZSgnLi9fdWlkJylcbiAgLCBTeW1ib2wgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuU3ltYm9sXG4gICwgVVNFX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT0gJ2Z1bmN0aW9uJztcblxudmFyICRleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgVVNFX1NZTUJPTCAmJiBTeW1ib2xbbmFtZV0gfHwgKFVTRV9TWU1CT0wgPyBTeW1ib2wgOiB1aWQpKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07XG5cbiRleHBvcnRzLnN0b3JlID0gc3RvcmU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLmpzXG4vLyBtb2R1bGUgaWQgPSA1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIDE5LjEuMi45IC8gMTUuMi4zLjIgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG52YXIgaGFzICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIHRvT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBJRV9QUk9UTyAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKVxuICAsIE9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24oTyl7XG4gIE8gPSB0b09iamVjdChPKTtcbiAgaWYoaGFzKE8sIElFX1BST1RPKSlyZXR1cm4gT1tJRV9QUk9UT107XG4gIGlmKHR5cGVvZiBPLmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgTyBpbnN0YW5jZW9mIE8uY29uc3RydWN0b3Ipe1xuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvIDogbnVsbDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdwby5qc1xuLy8gbW9kdWxlIGlkID0gNTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSA1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcbnZhciBjdHggICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHRvT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBjYWxsICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXItY2FsbCcpXG4gICwgaXNBcnJheUl0ZXIgICAgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJylcbiAgLCB0b0xlbmd0aCAgICAgICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgY3JlYXRlUHJvcGVydHkgPSByZXF1aXJlKCcuL19jcmVhdGUtcHJvcGVydHknKVxuICAsIGdldEl0ZXJGbiAgICAgID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKShmdW5jdGlvbihpdGVyKXsgQXJyYXkuZnJvbShpdGVyKTsgfSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4yLjEgQXJyYXkuZnJvbShhcnJheUxpa2UsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICBmcm9tOiBmdW5jdGlvbiBmcm9tKGFycmF5TGlrZS8qLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZCovKXtcbiAgICB2YXIgTyAgICAgICA9IHRvT2JqZWN0KGFycmF5TGlrZSlcbiAgICAgICwgQyAgICAgICA9IHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgPyB0aGlzIDogQXJyYXlcbiAgICAgICwgYUxlbiAgICA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgICwgbWFwZm4gICA9IGFMZW4gPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkXG4gICAgICAsIG1hcHBpbmcgPSBtYXBmbiAhPT0gdW5kZWZpbmVkXG4gICAgICAsIGluZGV4ICAgPSAwXG4gICAgICAsIGl0ZXJGbiAgPSBnZXRJdGVyRm4oTylcbiAgICAgICwgbGVuZ3RoLCByZXN1bHQsIHN0ZXAsIGl0ZXJhdG9yO1xuICAgIGlmKG1hcHBpbmcpbWFwZm4gPSBjdHgobWFwZm4sIGFMZW4gPiAyID8gYXJndW1lbnRzWzJdIDogdW5kZWZpbmVkLCAyKTtcbiAgICAvLyBpZiBvYmplY3QgaXNuJ3QgaXRlcmFibGUgb3IgaXQncyBhcnJheSB3aXRoIGRlZmF1bHQgaXRlcmF0b3IgLSB1c2Ugc2ltcGxlIGNhc2VcbiAgICBpZihpdGVyRm4gIT0gdW5kZWZpbmVkICYmICEoQyA9PSBBcnJheSAmJiBpc0FycmF5SXRlcihpdGVyRm4pKSl7XG4gICAgICBmb3IoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChPKSwgcmVzdWx0ID0gbmV3IEM7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgaW5kZXgrKyl7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIG1hcHBpbmcgPyBjYWxsKGl0ZXJhdG9yLCBtYXBmbiwgW3N0ZXAudmFsdWUsIGluZGV4XSwgdHJ1ZSkgOiBzdGVwLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgICAgZm9yKHJlc3VsdCA9IG5ldyBDKGxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKXtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IG1hcGZuKE9baW5kZXhdLCBpbmRleCkgOiBPW2luZGV4XSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5sZW5ndGggPSBpbmRleDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5LmZyb20uanNcbi8vIG1vZHVsZSBpZCA9IDU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gY2FsbCBzb21ldGhpbmcgb24gaXRlcmF0b3Igc3RlcCB3aXRoIHNhZmUgY2xvc2luZyBvbiBlcnJvclxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXJhdG9yLCBmbiwgdmFsdWUsIGVudHJpZXMpe1xuICB0cnkge1xuICAgIHJldHVybiBlbnRyaWVzID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gIH0gY2F0Y2goZSl7XG4gICAgdmFyIHJldCA9IGl0ZXJhdG9yWydyZXR1cm4nXTtcbiAgICBpZihyZXQgIT09IHVuZGVmaW5lZClhbk9iamVjdChyZXQuY2FsbChpdGVyYXRvcikpO1xuICAgIHRocm93IGU7XG4gIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jYWxsLmpzXG4vLyBtb2R1bGUgaWQgPSA1NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3JcbnZhciBJdGVyYXRvcnMgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCBJVEVSQVRPUiAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBBcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ICE9PSB1bmRlZmluZWQgJiYgKEl0ZXJhdG9ycy5BcnJheSA9PT0gaXQgfHwgQXJyYXlQcm90b1tJVEVSQVRPUl0gPT09IGl0KTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtYXJyYXktaXRlci5qc1xuLy8gbW9kdWxlIGlkID0gNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG52YXIgJGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBjcmVhdGVEZXNjICAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0LCBpbmRleCwgdmFsdWUpe1xuICBpZihpbmRleCBpbiBvYmplY3QpJGRlZmluZVByb3BlcnR5LmYob2JqZWN0LCBpbmRleCwgY3JlYXRlRGVzYygwLCB2YWx1ZSkpO1xuICBlbHNlIG9iamVjdFtpbmRleF0gPSB2YWx1ZTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3JlYXRlLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBjbGFzc29mICAgPSByZXF1aXJlKCcuL19jbGFzc29mJylcbiAgLCBJVEVSQVRPUiAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3JNZXRob2QgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ICE9IHVuZGVmaW5lZClyZXR1cm4gaXRbSVRFUkFUT1JdXG4gICAgfHwgaXRbJ0BAaXRlcmF0b3InXVxuICAgIHx8IEl0ZXJhdG9yc1tjbGFzc29mKGl0KV07XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kLmpzXG4vLyBtb2R1bGUgaWQgPSA1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKVxuICAvLyBFUzMgd3JvbmcgaGVyZVxuICAsIEFSRyA9IGNvZihmdW5jdGlvbigpeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUQUcpKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY2xhc3NvZi5qc1xuLy8gbW9kdWxlIGlkID0gNTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgSVRFUkFUT1IgICAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBTQUZFX0NMT1NJTkcgPSBmYWxzZTtcblxudHJ5IHtcbiAgdmFyIHJpdGVyID0gWzddW0lURVJBVE9SXSgpO1xuICByaXRlclsncmV0dXJuJ10gPSBmdW5jdGlvbigpeyBTQUZFX0NMT1NJTkcgPSB0cnVlOyB9O1xuICBBcnJheS5mcm9tKHJpdGVyLCBmdW5jdGlvbigpeyB0aHJvdyAyOyB9KTtcbn0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjLCBza2lwQ2xvc2luZyl7XG4gIGlmKCFza2lwQ2xvc2luZyAmJiAhU0FGRV9DTE9TSU5HKXJldHVybiBmYWxzZTtcbiAgdmFyIHNhZmUgPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyICA9IFs3XVxuICAgICAgLCBpdGVyID0gYXJyW0lURVJBVE9SXSgpO1xuICAgIGl0ZXIubmV4dCA9IGZ1bmN0aW9uKCl7IHJldHVybiB7ZG9uZTogc2FmZSA9IHRydWV9OyB9O1xuICAgIGFycltJVEVSQVRPUl0gPSBmdW5jdGlvbigpeyByZXR1cm4gaXRlcjsgfTtcbiAgICBleGVjKGFycik7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIHNhZmU7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGV0ZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSA2MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImltcG9ydCB7XG4gICAgd2luLFxuICAgIGRvYyxcbiAgICBQcm9taXNlLFxuICAgIHF1ZXJ5LFxuICAgIHF1ZXJ5QWxsLFxuICAgIGdldFJlY3Rcbn0gZnJvbSAnLi91dGlsJztcbmltcG9ydCAnZ2VzdHVyZS1qcyc7XG5pbXBvcnQgRXZlbnQgZnJvbSAnLi9ldmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcm9sbGVyIGV4dGVuZHMgRXZlbnR7XG4gICAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCwgdncsIHZoLCBzY2FsZSA9IDEpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9pc1Njcm9sbGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9lbmFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fc2NhbGUgPSBzY2FsZTtcblxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLnZ3ID0gdnc7XG4gICAgICAgIHRoaXMudmggPSB2aDtcbiAgICAgICAgdGhpcy54ID0gMDtcbiAgICAgICAgdGhpcy55ID0gMDtcbiAgICAgICAgdGhpcy5seCA9IDA7XG4gICAgICAgIHRoaXMubHkgPSAwO1xuICAgIH1cblxuICAgIGdldCBpc1Njcm9sbGluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzU2Nyb2xsaW5nO1xuICAgIH1cblxuICAgIGdldCBzY2FsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjYWxlO1xuICAgIH1cblxuICAgIHNldCBzY2FsZShzY2FsZSkge1xuICAgICAgICB0aGlzLl9zY2FsZSA9IHNjYWxlO1xuICAgIH1cblxuICAgIGdldCBlbmFibGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lbmFibGU7XG4gICAgfVxuXG4gICAgc2V0IGVuYWJsZShlbmFibGUpIHtcbiAgICAgICAgdGhpcy5fZW5hYmxlID0gZW5hYmxlO1xuICAgIH1cblxuICAgIF9lbWl0KG5hbWUsIG9yaWdpbmFsRXZlbnQsIGV4dHJhID0ge30pIHtcbiAgICAgICAgY29uc3QgZSA9IHtcbiAgICAgICAgICAgIHg6IHRoaXMueCxcbiAgICAgICAgICAgIHk6IHRoaXMueSxcbiAgICAgICAgICAgIGx4OiB0aGlzLmx4LFxuICAgICAgICAgICAgbHk6IHRoaXMubHksXG4gICAgICAgICAgICBvcmlnaW5hbEV2ZW50XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gZXh0cmEpIHtcbiAgICAgICAgICAgIGVba2V5XSA9IGV4dHJhW2tleV07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVtaXQobmFtZSwgZSk7XG4gICAgfVxuXG4gICAgcmVhZHkoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9pc1Njcm9sbGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICBjb25zdCBlbWl0VGFwID0gZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZW1pdCgndGFwJywgZSwge1xuICAgICAgICAgICAgICAgICAgICBleDogdGhpcy54ICsgZS50b3VjaC5jbGllbnRYLFxuICAgICAgICAgICAgICAgICAgICBleTogdGhpcy55ICsgZS50b3VjaC5jbGllbnRZXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGVtaXRTdGFydCA9IGUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2lzU2Nyb2xsaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmx4ID0gdGhpcy54O1xuICAgICAgICAgICAgICAgIHRoaXMubHkgPSB0aGlzLnk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZW1pdCgnc2Nyb2xsc3RhcnQnLCBlKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IGVtaXRTY3JvbGwgPSBlID0+IHRoaXMuX2VtaXQoJ3Njcm9sbGluZycsIGUpO1xuXG4gICAgICAgICAgICBjb25zdCBlbWl0RW5kID0gZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5faXNTY3JvbGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbWl0KCdzY3JvbGxlbmQnLCBlKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IGNhbFhZID0gKGUsIG5vU2NhbGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYWNlbWVudFgsXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYWNlbWVudFlcbiAgICAgICAgICAgICAgICB9ID0gZTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHNjYWxlID0gbm9TY2FsZSA/IDEgOiB0aGlzLl9zY2FsZTtcbiAgICAgICAgICAgICAgICBsZXQgeCA9IHRoaXMubHggLSBkaXNwbGFjZW1lbnRYICogc2NhbGU7XG4gICAgICAgICAgICAgICAgbGV0IHkgPSB0aGlzLmx5IC0gZGlzcGxhY2VtZW50WSAqIHNjYWxlO1xuXG4gICAgICAgICAgICAgICAgeCA9IE1hdGgubWluKE1hdGgubWF4KDAsIHgpLCB0aGlzLndpZHRoIC0gdGhpcy52dyk7XG4gICAgICAgICAgICAgICAgeSA9IE1hdGgubWluKE1hdGgubWF4KDAsIHkpLCB0aGlzLmhlaWdodCAtIHRoaXMudmgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkb2MuYm9keS5hZGRFdmVudExpc3RlbmVyKCd0YXAnLCBlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbmFibGUgJiYgZW1pdFRhcChlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkb2MuYm9keS5hZGRFdmVudExpc3RlbmVyKCdwYW5zdGFydCcsIGUgPT4gXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5hYmxlICYmIGVtaXRTdGFydChlKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgZG9jLmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigncGFubW92ZScsIGUgPT4gXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5hYmxlICYmIGNhbFhZKGUpICYmIGVtaXRTY3JvbGwoZSkgXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBkb2MuYm9keS5hZGRFdmVudExpc3RlbmVyKCdwYW5lbmQnLCBlID0+IFxuICAgICAgICAgICAgICAgIHRoaXMuX2VuYWJsZSAmJiBlbWl0RW5kKGUpICAgICAgXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB0aGlzLnNjcm9sbFRvID0gKHgsIHkpID0+IHtcbiAgICAgICAgICAgICAgICBlbWl0U3RhcnQoKTtcbiAgICAgICAgICAgICAgICBjYWxYWSh7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYWNlbWVudFg6IHRoaXMueCAtIHgsXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYWNlbWVudFk6IHRoaXMueSAtIHlcbiAgICAgICAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgICAgICAgICBlbWl0U2Nyb2xsKCk7XG4gICAgICAgICAgICAgICAgZW1pdEVuZCgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3Njcm9sbGVyLmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtcHJvdG90eXBlLW9mXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9nZXQtcHJvdG90eXBlLW9mLmpzXG4vLyBtb2R1bGUgaWQgPSA2MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LXByb3RvdHlwZS1vZicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtcHJvdG90eXBlLW9mLmpzXG4vLyBtb2R1bGUgaWQgPSA2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjIuOSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciB0b09iamVjdCAgICAgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsICRnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdnZXRQcm90b3R5cGVPZicsIGZ1bmN0aW9uKCl7XG4gIHJldHVybiBmdW5jdGlvbiBnZXRQcm90b3R5cGVPZihpdCl7XG4gICAgcmV0dXJuICRnZXRQcm90b3R5cGVPZih0b09iamVjdChpdCkpO1xuICB9O1xufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmdldC1wcm90b3R5cGUtb2YuanNcbi8vIG1vZHVsZSBpZCA9IDY0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIG1vc3QgT2JqZWN0IG1ldGhvZHMgYnkgRVM2IHNob3VsZCBhY2NlcHQgcHJpbWl0aXZlc1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGNvcmUgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBmYWlscyAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oS0VZLCBleGVjKXtcbiAgdmFyIGZuICA9IChjb3JlLk9iamVjdCB8fCB7fSlbS0VZXSB8fCBPYmplY3RbS0VZXVxuICAgICwgZXhwID0ge307XG4gIGV4cFtLRVldID0gZXhlYyhmbik7XG4gICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogZmFpbHMoZnVuY3Rpb24oKXsgZm4oMSk7IH0pLCAnT2JqZWN0JywgZXhwKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXNhcC5qc1xuLy8gbW9kdWxlIGlkID0gNjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzXG4vLyBtb2R1bGUgaWQgPSA2NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIik7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmaW5lUHJvcGVydHkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0oKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MuanNcbi8vIG1vZHVsZSBpZCA9IDY3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDY4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHknKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyl7XG4gIHJldHVybiAkT2JqZWN0LmRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA2OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuLy8gMTkuMS4yLjQgLyAxNS4yLjMuNiBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyksICdPYmplY3QnLCB7ZGVmaW5lUHJvcGVydHk6IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZ9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA3MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF90eXBlb2YyID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG52YXIgX3R5cGVvZjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90eXBlb2YyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHNlbGYsIGNhbGwpIHtcbiAgaWYgKCFzZWxmKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIGNhbGwgJiYgKCh0eXBlb2YgY2FsbCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiAoMCwgX3R5cGVvZjMuZGVmYXVsdCkoY2FsbCkpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuLmpzXG4vLyBtb2R1bGUgaWQgPSA3MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9pdGVyYXRvciA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvclwiKTtcblxudmFyIF9pdGVyYXRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pdGVyYXRvcik7XG5cbnZhciBfc3ltYm9sID0gcmVxdWlyZShcIi4uL2NvcmUtanMvc3ltYm9sXCIpO1xuXG52YXIgX3N5bWJvbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zeW1ib2wpO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIF9pdGVyYXRvcjIuZGVmYXVsdCA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IF9zeW1ib2wyLmRlZmF1bHQgJiYgb2JqICE9PSBfc3ltYm9sMi5kZWZhdWx0LnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIF90eXBlb2YoX2l0ZXJhdG9yMi5kZWZhdWx0KSA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopO1xufSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gX3N5bWJvbDIuZGVmYXVsdCAmJiBvYmogIT09IF9zeW1ib2wyLmRlZmF1bHQucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzXG4vLyBtb2R1bGUgaWQgPSA3MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gNzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fd2tzLWV4dCcpLmYoJ2l0ZXJhdG9yJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA3NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuL2VzNi5hcnJheS5pdGVyYXRvcicpO1xudmFyIGdsb2JhbCAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGhpZGUgICAgICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBJdGVyYXRvcnMgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCBUT19TVFJJTkdfVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbmZvcih2YXIgY29sbGVjdGlvbnMgPSBbJ05vZGVMaXN0JywgJ0RPTVRva2VuTGlzdCcsICdNZWRpYUxpc3QnLCAnU3R5bGVTaGVldExpc3QnLCAnQ1NTUnVsZUxpc3QnXSwgaSA9IDA7IGkgPCA1OyBpKyspe1xuICB2YXIgTkFNRSAgICAgICA9IGNvbGxlY3Rpb25zW2ldXG4gICAgLCBDb2xsZWN0aW9uID0gZ2xvYmFsW05BTUVdXG4gICAgLCBwcm90byAgICAgID0gQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZTtcbiAgaWYocHJvdG8gJiYgIXByb3RvW1RPX1NUUklOR19UQUddKWhpZGUocHJvdG8sIFRPX1NUUklOR19UQUcsIE5BTUUpO1xuICBJdGVyYXRvcnNbTkFNRV0gPSBJdGVyYXRvcnMuQXJyYXk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSA3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJylcbiAgLCBzdGVwICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faXRlci1zdGVwJylcbiAgLCBJdGVyYXRvcnMgICAgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCB0b0lPYmplY3QgICAgICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoQXJyYXksICdBcnJheScsIGZ1bmN0aW9uKGl0ZXJhdGVkLCBraW5kKXtcbiAgdGhpcy5fdCA9IHRvSU9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAgLy8ga2luZFxuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBraW5kICA9IHRoaXMuX2tcbiAgICAsIGluZGV4ID0gdGhpcy5faSsrO1xuICBpZighTyB8fCBpbmRleCA+PSBPLmxlbmd0aCl7XG4gICAgdGhpcy5fdCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gc3RlcCgxKTtcbiAgfVxuICBpZihraW5kID09ICdrZXlzJyAgKXJldHVybiBzdGVwKDAsIGluZGV4KTtcbiAgaWYoa2luZCA9PSAndmFsdWVzJylyZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDc2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpeyAvKiBlbXB0eSAqLyB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qc1xuLy8gbW9kdWxlIGlkID0gNzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRvbmUsIHZhbHVlKXtcbiAgcmV0dXJuIHt2YWx1ZTogdmFsdWUsIGRvbmU6ICEhZG9uZX07XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItc3RlcC5qc1xuLy8gbW9kdWxlIGlkID0gNzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJleHBvcnRzLmYgPSByZXF1aXJlKCcuL193a3MnKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MtZXh0LmpzXG4vLyBtb2R1bGUgaWQgPSA3OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC5qc1xuLy8gbW9kdWxlIGlkID0gODBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3ltYm9sJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3LnN5bWJvbC5vYnNlcnZhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5TeW1ib2w7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA4MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG4vLyBFQ01BU2NyaXB0IDYgc3ltYm9scyBzaGltXG52YXIgZ2xvYmFsICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGhhcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBERVNDUklQVE9SUyAgICA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJylcbiAgLCAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgcmVkZWZpbmUgICAgICAgPSByZXF1aXJlKCcuL19yZWRlZmluZScpXG4gICwgTUVUQSAgICAgICAgICAgPSByZXF1aXJlKCcuL19tZXRhJykuS0VZXG4gICwgJGZhaWxzICAgICAgICAgPSByZXF1aXJlKCcuL19mYWlscycpXG4gICwgc2hhcmVkICAgICAgICAgPSByZXF1aXJlKCcuL19zaGFyZWQnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIHVpZCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fdWlkJylcbiAgLCB3a3MgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3drcycpXG4gICwgd2tzRXh0ICAgICAgICAgPSByZXF1aXJlKCcuL193a3MtZXh0JylcbiAgLCB3a3NEZWZpbmUgICAgICA9IHJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKVxuICAsIGtleU9mICAgICAgICAgID0gcmVxdWlyZSgnLi9fa2V5b2YnKVxuICAsIGVudW1LZXlzICAgICAgID0gcmVxdWlyZSgnLi9fZW51bS1rZXlzJylcbiAgLCBpc0FycmF5ICAgICAgICA9IHJlcXVpcmUoJy4vX2lzLWFycmF5JylcbiAgLCBhbk9iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgdG9JT2JqZWN0ICAgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgY3JlYXRlRGVzYyAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgLCBfY3JlYXRlICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKVxuICAsIGdPUE5FeHQgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4tZXh0JylcbiAgLCAkR09QRCAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJylcbiAgLCAkRFAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgJGtleXMgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpXG4gICwgZ09QRCAgICAgICAgICAgPSAkR09QRC5mXG4gICwgZFAgICAgICAgICAgICAgPSAkRFAuZlxuICAsIGdPUE4gICAgICAgICAgID0gZ09QTkV4dC5mXG4gICwgJFN5bWJvbCAgICAgICAgPSBnbG9iYWwuU3ltYm9sXG4gICwgJEpTT04gICAgICAgICAgPSBnbG9iYWwuSlNPTlxuICAsIF9zdHJpbmdpZnkgICAgID0gJEpTT04gJiYgJEpTT04uc3RyaW5naWZ5XG4gICwgUFJPVE9UWVBFICAgICAgPSAncHJvdG90eXBlJ1xuICAsIEhJRERFTiAgICAgICAgID0gd2tzKCdfaGlkZGVuJylcbiAgLCBUT19QUklNSVRJVkUgICA9IHdrcygndG9QcmltaXRpdmUnKVxuICAsIGlzRW51bSAgICAgICAgID0ge30ucHJvcGVydHlJc0VudW1lcmFibGVcbiAgLCBTeW1ib2xSZWdpc3RyeSA9IHNoYXJlZCgnc3ltYm9sLXJlZ2lzdHJ5JylcbiAgLCBBbGxTeW1ib2xzICAgICA9IHNoYXJlZCgnc3ltYm9scycpXG4gICwgT1BTeW1ib2xzICAgICAgPSBzaGFyZWQoJ29wLXN5bWJvbHMnKVxuICAsIE9iamVjdFByb3RvICAgID0gT2JqZWN0W1BST1RPVFlQRV1cbiAgLCBVU0VfTkFUSVZFICAgICA9IHR5cGVvZiAkU3ltYm9sID09ICdmdW5jdGlvbidcbiAgLCBRT2JqZWN0ICAgICAgICA9IGdsb2JhbC5RT2JqZWN0O1xuLy8gRG9uJ3QgdXNlIHNldHRlcnMgaW4gUXQgU2NyaXB0LCBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMTczXG52YXIgc2V0dGVyID0gIVFPYmplY3QgfHwgIVFPYmplY3RbUFJPVE9UWVBFXSB8fCAhUU9iamVjdFtQUk9UT1RZUEVdLmZpbmRDaGlsZDtcblxuLy8gZmFsbGJhY2sgZm9yIG9sZCBBbmRyb2lkLCBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9Njg3XG52YXIgc2V0U3ltYm9sRGVzYyA9IERFU0NSSVBUT1JTICYmICRmYWlscyhmdW5jdGlvbigpe1xuICByZXR1cm4gX2NyZWF0ZShkUCh7fSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpeyByZXR1cm4gZFAodGhpcywgJ2EnLCB7dmFsdWU6IDd9KS5hOyB9XG4gIH0pKS5hICE9IDc7XG59KSA/IGZ1bmN0aW9uKGl0LCBrZXksIEQpe1xuICB2YXIgcHJvdG9EZXNjID0gZ09QRChPYmplY3RQcm90bywga2V5KTtcbiAgaWYocHJvdG9EZXNjKWRlbGV0ZSBPYmplY3RQcm90b1trZXldO1xuICBkUChpdCwga2V5LCBEKTtcbiAgaWYocHJvdG9EZXNjICYmIGl0ICE9PSBPYmplY3RQcm90bylkUChPYmplY3RQcm90bywga2V5LCBwcm90b0Rlc2MpO1xufSA6IGRQO1xuXG52YXIgd3JhcCA9IGZ1bmN0aW9uKHRhZyl7XG4gIHZhciBzeW0gPSBBbGxTeW1ib2xzW3RhZ10gPSBfY3JlYXRlKCRTeW1ib2xbUFJPVE9UWVBFXSk7XG4gIHN5bS5fayA9IHRhZztcbiAgcmV0dXJuIHN5bTtcbn07XG5cbnZhciBpc1N5bWJvbCA9IFVTRV9OQVRJVkUgJiYgdHlwZW9mICRTeW1ib2wuaXRlcmF0b3IgPT0gJ3N5bWJvbCcgPyBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCc7XG59IDogZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgaW5zdGFuY2VvZiAkU3ltYm9sO1xufTtcblxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIEQpe1xuICBpZihpdCA9PT0gT2JqZWN0UHJvdG8pJGRlZmluZVByb3BlcnR5KE9QU3ltYm9scywga2V5LCBEKTtcbiAgYW5PYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBhbk9iamVjdChEKTtcbiAgaWYoaGFzKEFsbFN5bWJvbHMsIGtleSkpe1xuICAgIGlmKCFELmVudW1lcmFibGUpe1xuICAgICAgaWYoIWhhcyhpdCwgSElEREVOKSlkUChpdCwgSElEREVOLCBjcmVhdGVEZXNjKDEsIHt9KSk7XG4gICAgICBpdFtISURERU5dW2tleV0gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZihoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKWl0W0hJRERFTl1ba2V5XSA9IGZhbHNlO1xuICAgICAgRCA9IF9jcmVhdGUoRCwge2VudW1lcmFibGU6IGNyZWF0ZURlc2MoMCwgZmFsc2UpfSk7XG4gICAgfSByZXR1cm4gc2V0U3ltYm9sRGVzYyhpdCwga2V5LCBEKTtcbiAgfSByZXR1cm4gZFAoaXQsIGtleSwgRCk7XG59O1xudmFyICRkZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhpdCwgUCl7XG4gIGFuT2JqZWN0KGl0KTtcbiAgdmFyIGtleXMgPSBlbnVtS2V5cyhQID0gdG9JT2JqZWN0KFApKVxuICAgICwgaSAgICA9IDBcbiAgICAsIGwgPSBrZXlzLmxlbmd0aFxuICAgICwga2V5O1xuICB3aGlsZShsID4gaSkkZGVmaW5lUHJvcGVydHkoaXQsIGtleSA9IGtleXNbaSsrXSwgUFtrZXldKTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciAkY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGl0LCBQKXtcbiAgcmV0dXJuIFAgPT09IHVuZGVmaW5lZCA/IF9jcmVhdGUoaXQpIDogJGRlZmluZVByb3BlcnRpZXMoX2NyZWF0ZShpdCksIFApO1xufTtcbnZhciAkcHJvcGVydHlJc0VudW1lcmFibGUgPSBmdW5jdGlvbiBwcm9wZXJ0eUlzRW51bWVyYWJsZShrZXkpe1xuICB2YXIgRSA9IGlzRW51bS5jYWxsKHRoaXMsIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSkpO1xuICBpZih0aGlzID09PSBPYmplY3RQcm90byAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKE9QU3ltYm9scywga2V5KSlyZXR1cm4gZmFsc2U7XG4gIHJldHVybiBFIHx8ICFoYXModGhpcywga2V5KSB8fCAhaGFzKEFsbFN5bWJvbHMsIGtleSkgfHwgaGFzKHRoaXMsIEhJRERFTikgJiYgdGhpc1tISURERU5dW2tleV0gPyBFIDogdHJ1ZTtcbn07XG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KXtcbiAgaXQgID0gdG9JT2JqZWN0KGl0KTtcbiAga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKTtcbiAgaWYoaXQgPT09IE9iamVjdFByb3RvICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT1BTeW1ib2xzLCBrZXkpKXJldHVybjtcbiAgdmFyIEQgPSBnT1BEKGl0LCBrZXkpO1xuICBpZihEICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICEoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSkpRC5lbnVtZXJhYmxlID0gdHJ1ZTtcbiAgcmV0dXJuIEQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eU5hbWVzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCl7XG4gIHZhciBuYW1lcyAgPSBnT1BOKHRvSU9iamVjdChpdCkpXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwgaSAgICAgID0gMFxuICAgICwga2V5O1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKXtcbiAgICBpZighaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pICYmIGtleSAhPSBISURERU4gJiYga2V5ICE9IE1FVEEpcmVzdWx0LnB1c2goa2V5KTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGl0KXtcbiAgdmFyIElTX09QICA9IGl0ID09PSBPYmplY3RQcm90b1xuICAgICwgbmFtZXMgID0gZ09QTihJU19PUCA/IE9QU3ltYm9scyA6IHRvSU9iamVjdChpdCkpXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwgaSAgICAgID0gMFxuICAgICwga2V5O1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKXtcbiAgICBpZihoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYgKElTX09QID8gaGFzKE9iamVjdFByb3RvLCBrZXkpIDogdHJ1ZSkpcmVzdWx0LnB1c2goQWxsU3ltYm9sc1trZXldKTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcblxuLy8gMTkuNC4xLjEgU3ltYm9sKFtkZXNjcmlwdGlvbl0pXG5pZighVVNFX05BVElWRSl7XG4gICRTeW1ib2wgPSBmdW5jdGlvbiBTeW1ib2woKXtcbiAgICBpZih0aGlzIGluc3RhbmNlb2YgJFN5bWJvbCl0aHJvdyBUeXBlRXJyb3IoJ1N5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvciEnKTtcbiAgICB2YXIgdGFnID0gdWlkKGFyZ3VtZW50cy5sZW5ndGggPiAwID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkKTtcbiAgICB2YXIgJHNldCA9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgIGlmKHRoaXMgPT09IE9iamVjdFByb3RvKSRzZXQuY2FsbChPUFN5bWJvbHMsIHZhbHVlKTtcbiAgICAgIGlmKGhhcyh0aGlzLCBISURERU4pICYmIGhhcyh0aGlzW0hJRERFTl0sIHRhZykpdGhpc1tISURERU5dW3RhZ10gPSBmYWxzZTtcbiAgICAgIHNldFN5bWJvbERlc2ModGhpcywgdGFnLCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG4gICAgfTtcbiAgICBpZihERVNDUklQVE9SUyAmJiBzZXR0ZXIpc2V0U3ltYm9sRGVzYyhPYmplY3RQcm90bywgdGFnLCB7Y29uZmlndXJhYmxlOiB0cnVlLCBzZXQ6ICRzZXR9KTtcbiAgICByZXR1cm4gd3JhcCh0YWcpO1xuICB9O1xuICByZWRlZmluZSgkU3ltYm9sW1BST1RPVFlQRV0sICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCl7XG4gICAgcmV0dXJuIHRoaXMuX2s7XG4gIH0pO1xuXG4gICRHT1BELmYgPSAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuICAkRFAuZiAgID0gJGRlZmluZVByb3BlcnR5O1xuICByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmYgPSBnT1BORXh0LmYgPSAkZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpLmYgID0gJHByb3BlcnR5SXNFbnVtZXJhYmxlO1xuICByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpLmYgPSAkZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG4gIGlmKERFU0NSSVBUT1JTICYmICFyZXF1aXJlKCcuL19saWJyYXJ5Jykpe1xuICAgIHJlZGVmaW5lKE9iamVjdFByb3RvLCAncHJvcGVydHlJc0VudW1lcmFibGUnLCAkcHJvcGVydHlJc0VudW1lcmFibGUsIHRydWUpO1xuICB9XG5cbiAgd2tzRXh0LmYgPSBmdW5jdGlvbihuYW1lKXtcbiAgICByZXR1cm4gd3JhcCh3a3MobmFtZSkpO1xuICB9XG59XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIHtTeW1ib2w6ICRTeW1ib2x9KTtcblxuZm9yKHZhciBzeW1ib2xzID0gKFxuICAvLyAxOS40LjIuMiwgMTkuNC4yLjMsIDE5LjQuMi40LCAxOS40LjIuNiwgMTkuNC4yLjgsIDE5LjQuMi45LCAxOS40LjIuMTAsIDE5LjQuMi4xMSwgMTkuNC4yLjEyLCAxOS40LjIuMTMsIDE5LjQuMi4xNFxuICAnaGFzSW5zdGFuY2UsaXNDb25jYXRTcHJlYWRhYmxlLGl0ZXJhdG9yLG1hdGNoLHJlcGxhY2Usc2VhcmNoLHNwZWNpZXMsc3BsaXQsdG9QcmltaXRpdmUsdG9TdHJpbmdUYWcsdW5zY29wYWJsZXMnXG4pLnNwbGl0KCcsJyksIGkgPSAwOyBzeW1ib2xzLmxlbmd0aCA+IGk7ICl3a3Moc3ltYm9sc1tpKytdKTtcblxuZm9yKHZhciBzeW1ib2xzID0gJGtleXMod2tzLnN0b3JlKSwgaSA9IDA7IHN5bWJvbHMubGVuZ3RoID4gaTsgKXdrc0RlZmluZShzeW1ib2xzW2krK10pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnU3ltYm9sJywge1xuICAvLyAxOS40LjIuMSBTeW1ib2wuZm9yKGtleSlcbiAgJ2Zvcic6IGZ1bmN0aW9uKGtleSl7XG4gICAgcmV0dXJuIGhhcyhTeW1ib2xSZWdpc3RyeSwga2V5ICs9ICcnKVxuICAgICAgPyBTeW1ib2xSZWdpc3RyeVtrZXldXG4gICAgICA6IFN5bWJvbFJlZ2lzdHJ5W2tleV0gPSAkU3ltYm9sKGtleSk7XG4gIH0sXG4gIC8vIDE5LjQuMi41IFN5bWJvbC5rZXlGb3Ioc3ltKVxuICBrZXlGb3I6IGZ1bmN0aW9uIGtleUZvcihrZXkpe1xuICAgIGlmKGlzU3ltYm9sKGtleSkpcmV0dXJuIGtleU9mKFN5bWJvbFJlZ2lzdHJ5LCBrZXkpO1xuICAgIHRocm93IFR5cGVFcnJvcihrZXkgKyAnIGlzIG5vdCBhIHN5bWJvbCEnKTtcbiAgfSxcbiAgdXNlU2V0dGVyOiBmdW5jdGlvbigpeyBzZXR0ZXIgPSB0cnVlOyB9LFxuICB1c2VTaW1wbGU6IGZ1bmN0aW9uKCl7IHNldHRlciA9IGZhbHNlOyB9XG59KTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgJ09iamVjdCcsIHtcbiAgLy8gMTkuMS4yLjIgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuICBjcmVhdGU6ICRjcmVhdGUsXG4gIC8vIDE5LjEuMi40IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuICBkZWZpbmVQcm9wZXJ0eTogJGRlZmluZVByb3BlcnR5LFxuICAvLyAxOS4xLjIuMyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKVxuICBkZWZpbmVQcm9wZXJ0aWVzOiAkZGVmaW5lUHJvcGVydGllcyxcbiAgLy8gMTkuMS4yLjYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKVxuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsXG4gIC8vIDE5LjEuMi43IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG4gIGdldE93blByb3BlcnR5TmFtZXM6ICRnZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICAvLyAxOS4xLjIuOCBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKE8pXG4gIGdldE93blByb3BlcnR5U3ltYm9sczogJGdldE93blByb3BlcnR5U3ltYm9sc1xufSk7XG5cbi8vIDI0LjMuMiBKU09OLnN0cmluZ2lmeSh2YWx1ZSBbLCByZXBsYWNlciBbLCBzcGFjZV1dKVxuJEpTT04gJiYgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoIVVTRV9OQVRJVkUgfHwgJGZhaWxzKGZ1bmN0aW9uKCl7XG4gIHZhciBTID0gJFN5bWJvbCgpO1xuICAvLyBNUyBFZGdlIGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyB7fVxuICAvLyBXZWJLaXQgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIG51bGxcbiAgLy8gVjggdGhyb3dzIG9uIGJveGVkIHN5bWJvbHNcbiAgcmV0dXJuIF9zdHJpbmdpZnkoW1NdKSAhPSAnW251bGxdJyB8fCBfc3RyaW5naWZ5KHthOiBTfSkgIT0gJ3t9JyB8fCBfc3RyaW5naWZ5KE9iamVjdChTKSkgIT0gJ3t9Jztcbn0pKSwgJ0pTT04nLCB7XG4gIHN0cmluZ2lmeTogZnVuY3Rpb24gc3RyaW5naWZ5KGl0KXtcbiAgICBpZihpdCA9PT0gdW5kZWZpbmVkIHx8IGlzU3ltYm9sKGl0KSlyZXR1cm47IC8vIElFOCByZXR1cm5zIHN0cmluZyBvbiB1bmRlZmluZWRcbiAgICB2YXIgYXJncyA9IFtpdF1cbiAgICAgICwgaSAgICA9IDFcbiAgICAgICwgcmVwbGFjZXIsICRyZXBsYWNlcjtcbiAgICB3aGlsZShhcmd1bWVudHMubGVuZ3RoID4gaSlhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICAgIHJlcGxhY2VyID0gYXJnc1sxXTtcbiAgICBpZih0eXBlb2YgcmVwbGFjZXIgPT0gJ2Z1bmN0aW9uJykkcmVwbGFjZXIgPSByZXBsYWNlcjtcbiAgICBpZigkcmVwbGFjZXIgfHwgIWlzQXJyYXkocmVwbGFjZXIpKXJlcGxhY2VyID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSl7XG4gICAgICBpZigkcmVwbGFjZXIpdmFsdWUgPSAkcmVwbGFjZXIuY2FsbCh0aGlzLCBrZXksIHZhbHVlKTtcbiAgICAgIGlmKCFpc1N5bWJvbCh2YWx1ZSkpcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgYXJnc1sxXSA9IHJlcGxhY2VyO1xuICAgIHJldHVybiBfc3RyaW5naWZ5LmFwcGx5KCRKU09OLCBhcmdzKTtcbiAgfVxufSk7XG5cbi8vIDE5LjQuMy40IFN5bWJvbC5wcm90b3R5cGVbQEB0b1ByaW1pdGl2ZV0oaGludClcbiRTeW1ib2xbUFJPVE9UWVBFXVtUT19QUklNSVRJVkVdIHx8IHJlcXVpcmUoJy4vX2hpZGUnKSgkU3ltYm9sW1BST1RPVFlQRV0sIFRPX1BSSU1JVElWRSwgJFN5bWJvbFtQUk9UT1RZUEVdLnZhbHVlT2YpO1xuLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoJFN5bWJvbCwgJ1N5bWJvbCcpO1xuLy8gMjAuMi4xLjkgTWF0aFtAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoTWF0aCwgJ01hdGgnLCB0cnVlKTtcbi8vIDI0LjMuMyBKU09OW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhnbG9iYWwuSlNPTiwgJ0pTT04nLCB0cnVlKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zeW1ib2wuanNcbi8vIG1vZHVsZSBpZCA9IDgyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBNRVRBICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpKCdtZXRhJylcbiAgLCBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgaGFzICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIHNldERlc2MgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZlxuICAsIGlkICAgICAgID0gMDtcbnZhciBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGZ1bmN0aW9uKCl7XG4gIHJldHVybiB0cnVlO1xufTtcbnZhciBGUkVFWkUgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gaXNFeHRlbnNpYmxlKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSkpO1xufSk7XG52YXIgc2V0TWV0YSA9IGZ1bmN0aW9uKGl0KXtcbiAgc2V0RGVzYyhpdCwgTUVUQSwge3ZhbHVlOiB7XG4gICAgaTogJ08nICsgKytpZCwgLy8gb2JqZWN0IElEXG4gICAgdzoge30gICAgICAgICAgLy8gd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfX0pO1xufTtcbnZhciBmYXN0S2V5ID0gZnVuY3Rpb24oaXQsIGNyZWF0ZSl7XG4gIC8vIHJldHVybiBwcmltaXRpdmUgd2l0aCBwcmVmaXhcbiAgaWYoIWlzT2JqZWN0KGl0KSlyZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnID8gaXQgOiAodHlwZW9mIGl0ID09ICdzdHJpbmcnID8gJ1MnIDogJ1AnKSArIGl0O1xuICBpZighaGFzKGl0LCBNRVRBKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYoIWNyZWF0ZSlyZXR1cm4gJ0UnO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBvYmplY3QgSURcbiAgfSByZXR1cm4gaXRbTUVUQV0uaTtcbn07XG52YXIgZ2V0V2VhayA9IGZ1bmN0aW9uKGl0LCBjcmVhdGUpe1xuICBpZighaGFzKGl0LCBNRVRBKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmKCFjcmVhdGUpcmV0dXJuIGZhbHNlO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBoYXNoIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH0gcmV0dXJuIGl0W01FVEFdLnc7XG59O1xuLy8gYWRkIG1ldGFkYXRhIG9uIGZyZWV6ZS1mYW1pbHkgbWV0aG9kcyBjYWxsaW5nXG52YXIgb25GcmVlemUgPSBmdW5jdGlvbihpdCl7XG4gIGlmKEZSRUVaRSAmJiBtZXRhLk5FRUQgJiYgaXNFeHRlbnNpYmxlKGl0KSAmJiAhaGFzKGl0LCBNRVRBKSlzZXRNZXRhKGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciBtZXRhID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIEtFWTogICAgICBNRVRBLFxuICBORUVEOiAgICAgZmFsc2UsXG4gIGZhc3RLZXk6ICBmYXN0S2V5LFxuICBnZXRXZWFrOiAgZ2V0V2VhayxcbiAgb25GcmVlemU6IG9uRnJlZXplXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX21ldGEuanNcbi8vIG1vZHVsZSBpZCA9IDgzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnbG9iYWwgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBMSUJSQVJZICAgICAgICA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKVxuICAsIHdrc0V4dCAgICAgICAgID0gcmVxdWlyZSgnLi9fd2tzLWV4dCcpXG4gICwgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgdmFyICRTeW1ib2wgPSBjb3JlLlN5bWJvbCB8fCAoY29yZS5TeW1ib2wgPSBMSUJSQVJZID8ge30gOiBnbG9iYWwuU3ltYm9sIHx8IHt9KTtcbiAgaWYobmFtZS5jaGFyQXQoMCkgIT0gJ18nICYmICEobmFtZSBpbiAkU3ltYm9sKSlkZWZpbmVQcm9wZXJ0eSgkU3ltYm9sLCBuYW1lLCB7dmFsdWU6IHdrc0V4dC5mKG5hbWUpfSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1kZWZpbmUuanNcbi8vIG1vZHVsZSBpZCA9IDg0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnZXRLZXlzICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpXG4gICwgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIGVsKXtcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgLCBrZXlzICAgPSBnZXRLZXlzKE8pXG4gICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICwgaW5kZXggID0gMFxuICAgICwga2V5O1xuICB3aGlsZShsZW5ndGggPiBpbmRleClpZihPW2tleSA9IGtleXNbaW5kZXgrK11dID09PSBlbClyZXR1cm4ga2V5O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19rZXlvZi5qc1xuLy8gbW9kdWxlIGlkID0gODVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gYWxsIGVudW1lcmFibGUgb2JqZWN0IGtleXMsIGluY2x1ZGVzIHN5bWJvbHNcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIGdPUFMgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpXG4gICwgcElFICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgcmVzdWx0ICAgICA9IGdldEtleXMoaXQpXG4gICAgLCBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICBpZihnZXRTeW1ib2xzKXtcbiAgICB2YXIgc3ltYm9scyA9IGdldFN5bWJvbHMoaXQpXG4gICAgICAsIGlzRW51bSAgPSBwSUUuZlxuICAgICAgLCBpICAgICAgID0gMFxuICAgICAgLCBrZXk7XG4gICAgd2hpbGUoc3ltYm9scy5sZW5ndGggPiBpKWlmKGlzRW51bS5jYWxsKGl0LCBrZXkgPSBzeW1ib2xzW2krK10pKXJlc3VsdC5wdXNoKGtleSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSA4NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzXG4vLyBtb2R1bGUgaWQgPSA4N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtcGllLmpzXG4vLyBtb2R1bGUgaWQgPSA4OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjIuMiBJc0FycmF5KGFyZ3VtZW50KVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXkoYXJnKXtcbiAgcmV0dXJuIGNvZihhcmcpID09ICdBcnJheSc7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSA4OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBmYWxsYmFjayBmb3IgSUUxMSBidWdneSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB3aXRoIGlmcmFtZSBhbmQgd2luZG93XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgZ09QTiAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mXG4gICwgdG9TdHJpbmcgID0ge30udG9TdHJpbmc7XG5cbnZhciB3aW5kb3dOYW1lcyA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xuXG52YXIgZ2V0V2luZG93TmFtZXMgPSBmdW5jdGlvbihpdCl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGdPUE4oaXQpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB3aW5kb3dOYW1lcy5zbGljZSgpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCl7XG4gIHJldHVybiB3aW5kb3dOYW1lcyAmJiB0b1N0cmluZy5jYWxsKGl0KSA9PSAnW29iamVjdCBXaW5kb3ddJyA/IGdldFdpbmRvd05hbWVzKGl0KSA6IGdPUE4odG9JT2JqZWN0KGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4tZXh0LmpzXG4vLyBtb2R1bGUgaWQgPSA5MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjIuNyAvIDE1LjIuMy40IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG52YXIgJGtleXMgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJylcbiAgLCBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpLmNvbmNhdCgnbGVuZ3RoJywgJ3Byb3RvdHlwZScpO1xuXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pe1xuICByZXR1cm4gJGtleXMoTywgaGlkZGVuS2V5cyk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BuLmpzXG4vLyBtb2R1bGUgaWQgPSA5MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgcElFICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJylcbiAgLCBjcmVhdGVEZXNjICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxuICAsIHRvSU9iamVjdCAgICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9QcmltaXRpdmUgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIGhhcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJylcbiAgLCBnT1BEICAgICAgICAgICA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBnT1BEIDogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApe1xuICBPID0gdG9JT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgcmV0dXJuIGdPUEQoTywgUCk7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgaWYoaGFzKE8sIFApKXJldHVybiBjcmVhdGVEZXNjKCFwSUUuZi5jYWxsKE8sIFApLCBPW1BdKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcGQuanNcbi8vIG1vZHVsZSBpZCA9IDkyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnYXN5bmNJdGVyYXRvcicpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnN5bWJvbC5hc3luYy1pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gOTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi9fd2tzLWRlZmluZScpKCdvYnNlcnZhYmxlJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDk1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3NldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L3NldC1wcm90b3R5cGUtb2ZcIik7XG5cbnZhciBfc2V0UHJvdG90eXBlT2YyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2V0UHJvdG90eXBlT2YpO1xuXG52YXIgX2NyZWF0ZSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9jcmVhdGVcIik7XG5cbnZhciBfY3JlYXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZSk7XG5cbnZhciBfdHlwZW9mMiA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL3R5cGVvZlwiKTtcblxudmFyIF90eXBlb2YzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdHlwZW9mMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyAodHlwZW9mIHN1cGVyQ2xhc3MgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogKDAsIF90eXBlb2YzLmRlZmF1bHQpKHN1cGVyQ2xhc3MpKSk7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSAoMCwgX2NyZWF0ZTIuZGVmYXVsdCkoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIF9zZXRQcm90b3R5cGVPZjIuZGVmYXVsdCA/ICgwLCBfc2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbmhlcml0cy5qc1xuLy8gbW9kdWxlIGlkID0gOTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzXG4vLyBtb2R1bGUgaWQgPSA5N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LnNldFByb3RvdHlwZU9mO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzXG4vLyBtb2R1bGUgaWQgPSA5OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjMuMTkgT2JqZWN0LnNldFByb3RvdHlwZU9mKE8sIHByb3RvKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0Jywge3NldFByb3RvdHlwZU9mOiByZXF1aXJlKCcuL19zZXQtcHJvdG8nKS5zZXR9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZi5qc1xuLy8gbW9kdWxlIGlkID0gOTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gV29ya3Mgd2l0aCBfX3Byb3RvX18gb25seS4gT2xkIHY4IGNhbid0IHdvcmsgd2l0aCBudWxsIHByb3RvIG9iamVjdHMuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGNoZWNrID0gZnVuY3Rpb24oTywgcHJvdG8pe1xuICBhbk9iamVjdChPKTtcbiAgaWYoIWlzT2JqZWN0KHByb3RvKSAmJiBwcm90byAhPT0gbnVsbCl0aHJvdyBUeXBlRXJyb3IocHJvdG8gKyBcIjogY2FuJ3Qgc2V0IGFzIHByb3RvdHlwZSFcIik7XG59O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8ICgnX19wcm90b19fJyBpbiB7fSA/IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBmdW5jdGlvbih0ZXN0LCBidWdneSwgc2V0KXtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNldCA9IHJlcXVpcmUoJy4vX2N0eCcpKEZ1bmN0aW9uLmNhbGwsIHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJykuZihPYmplY3QucHJvdG90eXBlLCAnX19wcm90b19fJykuc2V0LCAyKTtcbiAgICAgICAgc2V0KHRlc3QsIFtdKTtcbiAgICAgICAgYnVnZ3kgPSAhKHRlc3QgaW5zdGFuY2VvZiBBcnJheSk7XG4gICAgICB9IGNhdGNoKGUpeyBidWdneSA9IHRydWU7IH1cbiAgICAgIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90byl7XG4gICAgICAgIGNoZWNrKE8sIHByb3RvKTtcbiAgICAgICAgaWYoYnVnZ3kpTy5fX3Byb3RvX18gPSBwcm90bztcbiAgICAgICAgZWxzZSBzZXQoTywgcHJvdG8pO1xuICAgICAgICByZXR1cm4gTztcbiAgICAgIH07XG4gICAgfSh7fSwgZmFsc2UpIDogdW5kZWZpbmVkKSxcbiAgY2hlY2s6IGNoZWNrXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1wcm90by5qc1xuLy8gbW9kdWxlIGlkID0gMTAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvY3JlYXRlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDEwMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuY3JlYXRlJyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZShQLCBEKXtcbiAgcmV0dXJuICRPYmplY3QuY3JlYXRlKFAsIEQpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtjcmVhdGU6IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDEwM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG4oZnVuY3Rpb24gKHdpbikge1xuXG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLy8gbWFqb3IgZXZlbnRzIHN1cHBvcnRlZDpcbiAgICAvLyBwYW5zdGFydFxuICAgIC8vIHBhbm1vdmVcbiAgICAvLyBwYW5lbmRcbiAgICAvLyBzd2lwZVxuICAgIC8vIGxvbmdwcmVzc1xuXG4gICAgLy8gZXh0cmEgZXZlbnRzIHN1cHBvcnRlZDpcbiAgICAvLyBkdWFsdG91Y2hzdGFydFxuICAgIC8vIGR1YWx0b3VjaFxuICAgIC8vIGR1YWx0b3VjaGVuZFxuICAgIC8vIHZlcnRpY2FscGFuc3RhcnRcbiAgICAvLyBob3Jpem9udGFscGFuc3RhcnRcbiAgICAvLyB2ZXJ0aWNhbHBhbm1vdmVcbiAgICAvLyBob3Jpem9udGFscGFubW92ZVxuICAgIC8vIHRhcFxuICAgIC8vIGRvdWJsZXRhcFxuICAgIC8vIHZlcnRpY2Fsc3dpcGVcbiAgICAvLyBob3Jpem9udGFsc3dpcGVcbiAgICAvLyBwcmVzc2VuZFxuXG4gICAgdmFyIGRvYyA9IHdpbi5kb2N1bWVudCxcbiAgICAgICAgZG9jRWwgPSBkb2MuZG9jdW1lbnRFbGVtZW50LFxuICAgICAgICBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZSxcbiAgICAgICAgZ2VzdHVyZXMgPSB7fSxcbiAgICAgICAgbGFzdFRhcCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAqIOaJvuWIsOS4pOS4que7k+eCueWFseWQjOeahOacgOWwj+aguee7k+eCuVxuICAgICog5aaC5p6c6Lef57uT54K55LiN5a2Y5Zyo77yM5YiZ6L+U5ZuebnVsbFxuICAgICpcbiAgICAqIEBwYXJhbSAge0VsZW1lbnR9IGVsMSDnrKzkuIDkuKrnu5PngrlcbiAgICAqIEBwYXJhbSAge0VsZW1lbnR9IGVsMiDnrKzkuozkuKrnu5PngrlcbiAgICAqIEByZXR1cm4ge0VsZW1lbnR9ICAgICDmoLnnu5PngrlcbiAgICAqL1xuICAgIGZ1bmN0aW9uIGdldENvbW1vbkFuY2VzdG9yKGVsMSwgZWwyKSB7XG4gICAgICAgIHZhciBlbCA9IGVsMTtcbiAgICAgICAgd2hpbGUgKGVsKSB7XG4gICAgICAgICAgICBpZiAoZWwuY29udGFpbnMoZWwyKSB8fCBlbCA9PT0gZWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWwgPSBlbC5wYXJlbnROb2RlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICog6Kem5Y+R5LiA5Liq5LqL5Lu2XG4gICAgKlxuICAgICogQHBhcmFtICB7RWxlbWVudH0gZWxlbWVudCDnm67moIfnu5PngrlcbiAgICAqIEBwYXJhbSAge3N0cmluZ30gIHR5cGUgICAg5LqL5Lu257G75Z6LXG4gICAgKiBAcGFyYW0gIHtvYmplY3R9ICBleHRyYSAgIOWvueS6i+S7tuWvueixoeeahOaJqeWxlVxuICAgICovXG4gICAgZnVuY3Rpb24gZmlyZUV2ZW50KGVsZW1lbnQsIHR5cGUsIGV4dHJhKSB7XG4gICAgICAgIHZhciBldmVudCA9IGRvYy5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpO1xuICAgICAgICBldmVudC5pbml0RXZlbnQodHlwZSwgdHJ1ZSwgdHJ1ZSk7XG5cbiAgICAgICAgaWYgKCh0eXBlb2YgZXh0cmEgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGV4dHJhKSkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIGV4dHJhKSB7XG4gICAgICAgICAgICAgICAgZXZlbnRbcF0gPSBleHRyYVtwXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiDorqHnrpflj5jmjaLmlYjmnpxcbiAgICAqIOWBh+iuvuWdkOagh+ezu+S4iuaciTTkuKrngrlBQkNEXG4gICAgKiA+IOaXi+i9rO+8muS7jkFC5peL6L2s5YiwQ0TnmoTop5LluqZcbiAgICAqID4g57yp5pS+77ya5LuOQULplb/luqblj5jmjaLliLBDROmVv+W6pueahOavlOS+i1xuICAgICogPiDkvY3np7vvvJrku45B54K55L2N56e75YiwQ+eCueeahOaoque6teS9jeenu1xuICAgICpcbiAgICAqIEBwYXJhbSAge251bWJlcn0geDEg5LiK6L+w56ysMeS4queCueeahOaoquWdkOagh1xuICAgICogQHBhcmFtICB7bnVtYmVyfSB5MSDkuIrov7DnrKwx5Liq54K555qE57q15Z2Q5qCHXG4gICAgKiBAcGFyYW0gIHtudW1iZXJ9IHgyIOS4iui/sOesrDLkuKrngrnnmoTmqKrlnZDmoIdcbiAgICAqIEBwYXJhbSAge251bWJlcn0geTIg5LiK6L+w56ysMuS4queCueeahOe6teWdkOagh1xuICAgICogQHBhcmFtICB7bnVtYmVyfSB4MyDkuIrov7DnrKwz5Liq54K555qE5qiq5Z2Q5qCHXG4gICAgKiBAcGFyYW0gIHtudW1iZXJ9IHkzIOS4iui/sOesrDPkuKrngrnnmoTnurXlnZDmoIdcbiAgICAqIEBwYXJhbSAge251bWJlcn0geDQg5LiK6L+w56ysNOS4queCueeahOaoquWdkOagh1xuICAgICogQHBhcmFtICB7bnVtYmVyfSB5NCDkuIrov7DnrKw05Liq54K555qE57q15Z2Q5qCHXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9ICAgIOWPmOaNouaViOaenO+8jOW9ouWmgntyb3RhdGUsIHNjYWxlLCB0cmFuc2xhdGVbMl0sIG1hdHJpeFszXVszXX1cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGNhbGMoeDEsIHkxLCB4MiwgeTIsIHgzLCB5MywgeDQsIHk0KSB7XG4gICAgICAgIHZhciByb3RhdGUgPSBNYXRoLmF0YW4yKHk0IC0geTMsIHg0IC0geDMpIC0gTWF0aC5hdGFuMih5MiAtIHkxLCB4MiAtIHgxKSxcbiAgICAgICAgICAgIHNjYWxlID0gTWF0aC5zcXJ0KChNYXRoLnBvdyh5NCAtIHkzLCAyKSArIE1hdGgucG93KHg0IC0geDMsIDIpKSAvIChNYXRoLnBvdyh5MiAtIHkxLCAyKSArIE1hdGgucG93KHgyIC0geDEsIDIpKSksXG4gICAgICAgICAgICB0cmFuc2xhdGUgPSBbeDMgLSBzY2FsZSAqIHgxICogTWF0aC5jb3Mocm90YXRlKSArIHNjYWxlICogeTEgKiBNYXRoLnNpbihyb3RhdGUpLCB5MyAtIHNjYWxlICogeTEgKiBNYXRoLmNvcyhyb3RhdGUpIC0gc2NhbGUgKiB4MSAqIE1hdGguc2luKHJvdGF0ZSldO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcm90YXRlOiByb3RhdGUsXG4gICAgICAgICAgICBzY2FsZTogc2NhbGUsXG4gICAgICAgICAgICB0cmFuc2xhdGU6IHRyYW5zbGF0ZSxcbiAgICAgICAgICAgIG1hdHJpeDogW1tzY2FsZSAqIE1hdGguY29zKHJvdGF0ZSksIC1zY2FsZSAqIE1hdGguc2luKHJvdGF0ZSksIHRyYW5zbGF0ZVswXV0sIFtzY2FsZSAqIE1hdGguc2luKHJvdGF0ZSksIHNjYWxlICogTWF0aC5jb3Mocm90YXRlKSwgdHJhbnNsYXRlWzFdXSwgWzAsIDAsIDFdXVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICog5o2V6I63dG91Y2hzdGFydOS6i+S7tu+8jOWwhuavj+S4gOS4quaWsOWinueahOinpueCuea3u+WKoOWIsGdlc3RydWVzXG4gICAgKiDlpoLmnpzkuYvliY3lsJrml6DooqvorrDlvZXnmoTop6bngrnvvIzliJnnu5Hlrpp0b3VjaG1vdmUsIHRvdWNoZW5kLCB0b3VjaGNhbmNlbOS6i+S7tlxuICAgICpcbiAgICAqIOaWsOWinuinpueCuem7mOiupOWkhOS6jnRhcHBpbmfnirbmgIFcbiAgICAqIDUwMOavq+enkuS5i+WQjuWmguaenOi/mOWkhOS6jnRhcHBpbmfnirbmgIHvvIzliJnop6blj5FwcmVzc+aJi+WKv1xuICAgICog5aaC5p6c6Kem54K55pWw5Li6Mu+8jOWImeinpuWPkWR1YWx0b3VjaHN0YXJ05omL5Yq/77yM6K+l5omL5Yq/55qE55uu5qCH57uT54K55Li65Lik5Liq6Kem54K55YWx5ZCM55qE5pyA5bCP5qC557uT54K5XG4gICAgKlxuICAgICogQGV2ZW50XG4gICAgKiBAcGFyYW0gIHtldmVudH0gZXZlbnRcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHRvdWNoc3RhcnRIYW5kbGVyKGV2ZW50KSB7XG5cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGdlc3R1cmVzKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGRvY0VsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRvdWNobW92ZUhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIGRvY0VsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdG91Y2hlbmRIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgICAgICBkb2NFbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRvdWNoY2FuY2VsSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGdlc3R1cmUsIHRvdWNoLCB0b3VjaFJlY29yZCwgZWxlbWVudHM7XG5cbiAgICAgICAgZnVuY3Rpb24gZ2VuUHJlc3NIYW5kbGVyKGVsZW1lbnQsIHRvdWNoKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChnZXN0dXJlLnN0YXR1cyA9PT0gJ3RhcHBpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGdlc3R1cmUuc3RhdHVzID0gJ3ByZXNzaW5nJztcblxuICAgICAgICAgICAgICAgICAgICBmaXJlRXZlbnQoZWxlbWVudCwgJ2xvbmdwcmVzcycsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0b3VjaCBkYXRhIGZvciB3ZWV4XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaDogdG91Y2gsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaGVzOiBldmVudC50b3VjaGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlZFRvdWNoZXM6IGV2ZW50LmNoYW5nZWRUb3VjaGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hFdmVudDogZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGdlc3R1cmUucHJlc3NpbmdIYW5kbGVyKTtcbiAgICAgICAgICAgICAgICBnZXN0dXJlLnByZXNzaW5nSGFuZGxlciA9IG51bGw7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVjb3JkIGV2ZXJ5IHRvdWNoXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbaV07XG4gICAgICAgICAgICB0b3VjaFJlY29yZCA9IHt9O1xuXG4gICAgICAgICAgICBmb3IgKHZhciBfcCBpbiB0b3VjaCkge1xuICAgICAgICAgICAgICAgIHRvdWNoUmVjb3JkW19wXSA9IHRvdWNoW19wXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZ2VzdHVyZSA9IHtcbiAgICAgICAgICAgICAgICBzdGFydFRvdWNoOiB0b3VjaFJlY29yZCxcbiAgICAgICAgICAgICAgICBzdGFydFRpbWU6IERhdGUubm93KCksXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAndGFwcGluZycsXG4gICAgICAgICAgICAgICAgZWxlbWVudDogZXZlbnQuc3JjRWxlbWVudCB8fCBldmVudC50YXJnZXQsXG4gICAgICAgICAgICAgICAgcHJlc3NpbmdIYW5kbGVyOiBzZXRUaW1lb3V0KGdlblByZXNzSGFuZGxlcihldmVudC5zcmNFbGVtZW50IHx8IGV2ZW50LnRhcmdldCwgZXZlbnQuY2hhbmdlZFRvdWNoZXNbaV0pLCA1MDApXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZ2VzdHVyZXNbdG91Y2guaWRlbnRpZmllcl0gPSBnZXN0dXJlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGdlc3R1cmVzKS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIGVsZW1lbnRzID0gW107XG5cbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gZ2VzdHVyZXMpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5wdXNoKGdlc3R1cmVzW3BdLmVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmaXJlRXZlbnQoZ2V0Q29tbW9uQW5jZXN0b3IoZWxlbWVudHNbMF0sIGVsZW1lbnRzWzFdKSwgJ2R1YWx0b3VjaHN0YXJ0Jywge1xuICAgICAgICAgICAgICAgIHRvdWNoZXM6IHNsaWNlLmNhbGwoZXZlbnQudG91Y2hlcyksXG4gICAgICAgICAgICAgICAgdG91Y2hFdmVudDogZXZlbnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiDmjZXojrd0b3VjaG1vdmXkuovku7bvvIzlpITnkIZwYW7lkoxkdWFs55qE55u45YWz5omL5Yq/XG4gICAgKlxuICAgICogMS4g6YGN5Y6G5q+P5Liq6Kem54K577yaXG4gICAgKiA+IOWmguaenOinpueCueS5i+WJjeWkhOS6jnRhcHBpbmfnirbmgIHvvIzkuJTkvY3np7votoXov4cxMOWDj+e0oO+8jOWImeiupOWumuS4uui/m+WFpXBhbm5pbmfnirbmgIFcbiAgICAqIOWFiOinpuWPkXBhbnN0YXJ05omL5Yq/77yM54S25ZCO5qC55o2u56e75Yqo55qE5pa55ZCR6YCJ5oup5oCn6Kem5Y+RaG9yaXpvbnRhbHBhbnN0YXJ05oiWdmVydGljYWxwYW5zdGFydOaJi+WKv1xuICAgICogPiDlpoLmnpzop6bngrnkuYvliY3lpITkuo5wYW5uaW5n54q25oCB77yM5YiZ5qC55o2ucGFu55qE5Yid5aeL5pa55ZCR6Kem5Y+RaG9yaXpvbnRhbHBhbuaIlnZlcnRpY2FscGFu5omL5Yq/XG4gICAgKlxuICAgICogMi4g5aaC5p6c5b2T5YmN6Kem54K55pWw5Li6Mu+8jOWImeiuoeeul+WHuuWHoOS9leWPmOaNoueahOWQhOmhueWPguaVsO+8jOinpuWPkWR1YWx0b3VjaOaJi+WKv1xuICAgICpcbiAgICAqIEBldmVudFxuICAgICogQHBhcmFtICB7ZXZlbnR9IGV2ZW50XG4gICAgKi9cbiAgICBmdW5jdGlvbiB0b3VjaG1vdmVIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIC8vIFRPRE86IOWHveaVsOWkquWkp+S6hu+8jOW9seWTjeWPr+ivu+aAp++8jOW7uuiuruWIhuino+W5tuWKoOW/heimgeeahOazqOmHilxuXG4gICAgICAgIC8vIOmBjeWOhuavj+S4quinpueCue+8mlxuICAgICAgICAvLyAxLiDlpoLmnpzop6bngrnkuYvliY3lpITkuo50YXBwaW5n54q25oCB77yM5LiU5L2N56e76LaF6L+HMTDlg4/ntKDvvIzliJnorqTlrprkuLrov5vlhaVwYW5uaW5n54q25oCBXG4gICAgICAgIC8vIOWFiOinpuWPkXBhbnN0YXJ05omL5Yq/77yM54S25ZCO5qC55o2u56e75Yqo55qE5pa55ZCR6YCJ5oup5oCn6Kem5Y+RaG9yaXpvbnRhbHBhbnN0YXJ05oiWdmVydGljYWxwYW5zdGFydOaJi+WKv1xuICAgICAgICAvLyAyLiDlpoLmnpzop6bngrnkuYvliY3lpITkuo5wYW5uaW5n54q25oCB77yM5YiZ5qC55o2ucGFu55qE5Yid5aeL5pa55ZCR6Kem5Y+RaG9yaXpvbnRhbHBhbuaIlnZlcnRpY2FscGFu5omL5Yq/XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciB0b3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzW2ldLFxuICAgICAgICAgICAgICAgIGdlc3R1cmUgPSBnZXN0dXJlc1t0b3VjaC5pZGVudGlmaWVyXTtcblxuICAgICAgICAgICAgaWYgKCFnZXN0dXJlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWdlc3R1cmUubGFzdFRvdWNoKSB7XG4gICAgICAgICAgICAgICAgZ2VzdHVyZS5sYXN0VG91Y2ggPSBnZXN0dXJlLnN0YXJ0VG91Y2g7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWdlc3R1cmUubGFzdFRpbWUpIHtcbiAgICAgICAgICAgICAgICBnZXN0dXJlLmxhc3RUaW1lID0gZ2VzdHVyZS5zdGFydFRpbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWdlc3R1cmUudmVsb2NpdHlYKSB7XG4gICAgICAgICAgICAgICAgZ2VzdHVyZS52ZWxvY2l0eVggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFnZXN0dXJlLnZlbG9jaXR5WSkge1xuICAgICAgICAgICAgICAgIGdlc3R1cmUudmVsb2NpdHlZID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZ2VzdHVyZS5kdXJhdGlvbikge1xuICAgICAgICAgICAgICAgIGdlc3R1cmUuZHVyYXRpb24gPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdGltZSA9IERhdGUubm93KCkgLSBnZXN0dXJlLmxhc3RUaW1lO1xuICAgICAgICAgICAgdmFyIHZ4ID0gKHRvdWNoLmNsaWVudFggLSBnZXN0dXJlLmxhc3RUb3VjaC5jbGllbnRYKSAvIHRpbWUsXG4gICAgICAgICAgICAgICAgdnkgPSAodG91Y2guY2xpZW50WSAtIGdlc3R1cmUubGFzdFRvdWNoLmNsaWVudFkpIC8gdGltZTtcblxuICAgICAgICAgICAgdmFyIFJFQ09SRF9EVVJBVElPTiA9IDcwO1xuICAgICAgICAgICAgaWYgKHRpbWUgPiBSRUNPUkRfRFVSQVRJT04pIHtcbiAgICAgICAgICAgICAgICB0aW1lID0gUkVDT1JEX0RVUkFUSU9OO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGdlc3R1cmUuZHVyYXRpb24gKyB0aW1lID4gUkVDT1JEX0RVUkFUSU9OKSB7XG4gICAgICAgICAgICAgICAgZ2VzdHVyZS5kdXJhdGlvbiA9IFJFQ09SRF9EVVJBVElPTiAtIHRpbWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGdlc3R1cmUudmVsb2NpdHlYID0gKGdlc3R1cmUudmVsb2NpdHlYICogZ2VzdHVyZS5kdXJhdGlvbiArIHZ4ICogdGltZSkgLyAoZ2VzdHVyZS5kdXJhdGlvbiArIHRpbWUpO1xuICAgICAgICAgICAgZ2VzdHVyZS52ZWxvY2l0eVkgPSAoZ2VzdHVyZS52ZWxvY2l0eVkgKiBnZXN0dXJlLmR1cmF0aW9uICsgdnkgKiB0aW1lKSAvIChnZXN0dXJlLmR1cmF0aW9uICsgdGltZSk7XG4gICAgICAgICAgICBnZXN0dXJlLmR1cmF0aW9uICs9IHRpbWU7XG5cbiAgICAgICAgICAgIGdlc3R1cmUubGFzdFRvdWNoID0ge307XG5cbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gdG91Y2gpIHtcbiAgICAgICAgICAgICAgICBnZXN0dXJlLmxhc3RUb3VjaFtwXSA9IHRvdWNoW3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ2VzdHVyZS5sYXN0VGltZSA9IERhdGUubm93KCk7XG5cbiAgICAgICAgICAgIHZhciBkaXNwbGFjZW1lbnRYID0gdG91Y2guY2xpZW50WCAtIGdlc3R1cmUuc3RhcnRUb3VjaC5jbGllbnRYLFxuICAgICAgICAgICAgICAgIGRpc3BsYWNlbWVudFkgPSB0b3VjaC5jbGllbnRZIC0gZ2VzdHVyZS5zdGFydFRvdWNoLmNsaWVudFksXG4gICAgICAgICAgICAgICAgZGlzdGFuY2UgPSBNYXRoLnNxcnQoTWF0aC5wb3coZGlzcGxhY2VtZW50WCwgMikgKyBNYXRoLnBvdyhkaXNwbGFjZW1lbnRZLCAyKSk7XG5cbiAgICAgICAgICAgIC8vIG1hZ2ljIG51bWJlciAxMDogbW92aW5nIDEwcHggbWVhbnMgcGFuLCBub3QgdGFwXG4gICAgICAgICAgICBpZiAoKGdlc3R1cmUuc3RhdHVzID09PSAndGFwcGluZycgfHwgZ2VzdHVyZS5zdGF0dXMgPT09ICdwcmVzc2luZycpICYmIGRpc3RhbmNlID4gMTApIHtcbiAgICAgICAgICAgICAgICBnZXN0dXJlLnN0YXR1cyA9ICdwYW5uaW5nJztcbiAgICAgICAgICAgICAgICBnZXN0dXJlLmlzVmVydGljYWwgPSAhKE1hdGguYWJzKGRpc3BsYWNlbWVudFgpID4gTWF0aC5hYnMoZGlzcGxhY2VtZW50WSkpO1xuXG4gICAgICAgICAgICAgICAgZmlyZUV2ZW50KGdlc3R1cmUuZWxlbWVudCwgJ3BhbnN0YXJ0Jywge1xuICAgICAgICAgICAgICAgICAgICB0b3VjaDogdG91Y2gsXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoZXM6IGV2ZW50LnRvdWNoZXMsXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZWRUb3VjaGVzOiBldmVudC5jaGFuZ2VkVG91Y2hlcyxcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIGlzVmVydGljYWw6IGdlc3R1cmUuaXNWZXJ0aWNhbFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgZmlyZUV2ZW50KGdlc3R1cmUuZWxlbWVudCwgKGdlc3R1cmUuaXNWZXJ0aWNhbCA/ICd2ZXJ0aWNhbCcgOiAnaG9yaXpvbnRhbCcpICsgJ3BhbnN0YXJ0Jywge1xuICAgICAgICAgICAgICAgICAgICB0b3VjaDogdG91Y2gsXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoRXZlbnQ6IGV2ZW50XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChnZXN0dXJlLnN0YXR1cyA9PT0gJ3Bhbm5pbmcnKSB7XG4gICAgICAgICAgICAgICAgZ2VzdHVyZS5wYW5UaW1lID0gRGF0ZS5ub3coKTtcblxuICAgICAgICAgICAgICAgIGZpcmVFdmVudChnZXN0dXJlLmVsZW1lbnQsICdwYW5tb3ZlJywge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGFjZW1lbnRYOiBkaXNwbGFjZW1lbnRYLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGFjZW1lbnRZOiBkaXNwbGFjZW1lbnRZLFxuICAgICAgICAgICAgICAgICAgICB0b3VjaDogdG91Y2gsXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoZXM6IGV2ZW50LnRvdWNoZXMsXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZWRUb3VjaGVzOiBldmVudC5jaGFuZ2VkVG91Y2hlcyxcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIGlzVmVydGljYWw6IGdlc3R1cmUuaXNWZXJ0aWNhbFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGdlc3R1cmUuaXNWZXJ0aWNhbCkge1xuICAgICAgICAgICAgICAgICAgICBmaXJlRXZlbnQoZ2VzdHVyZS5lbGVtZW50LCAndmVydGljYWxwYW5tb3ZlJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxhY2VtZW50WTogZGlzcGxhY2VtZW50WSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoOiB0b3VjaCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoRXZlbnQ6IGV2ZW50XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZpcmVFdmVudChnZXN0dXJlLmVsZW1lbnQsICdob3Jpem9udGFscGFubW92ZScsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYWNlbWVudFg6IGRpc3BsYWNlbWVudFgsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaDogdG91Y2gsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaEV2ZW50OiBldmVudFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyDlpoLmnpzlvZPliY3op6bngrnmlbDkuLoy77yM5YiZ6K6h566X5Ye65Yeg5L2V5Y+Y5o2i55qE5ZCE6aG55Y+C5pWw77yM6Kem5Y+RZHVhbHRvdWNo5omL5Yq/XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhnZXN0dXJlcykubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICB2YXIgcG9zaXRpb24gPSBbXSxcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gW10sXG4gICAgICAgICAgICAgICAgZWxlbWVudHMgPSBbXSxcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm0gPSB2b2lkIDA7XG5cbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBldmVudC50b3VjaGVzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHZhciBfdG91Y2ggPSBldmVudC50b3VjaGVzW19pXTtcbiAgICAgICAgICAgICAgICB2YXIgX2dlc3R1cmUgPSBnZXN0dXJlc1tfdG91Y2guaWRlbnRpZmllcl07XG4gICAgICAgICAgICAgICAgcG9zaXRpb24ucHVzaChbX2dlc3R1cmUuc3RhcnRUb3VjaC5jbGllbnRYLCBfZ2VzdHVyZS5zdGFydFRvdWNoLmNsaWVudFldKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50LnB1c2goW190b3VjaC5jbGllbnRYLCBfdG91Y2guY2xpZW50WV0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKHZhciBfcDIgaW4gZ2VzdHVyZXMpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5wdXNoKGdlc3R1cmVzW19wMl0uZWxlbWVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRyYW5zZm9ybSA9IGNhbGMocG9zaXRpb25bMF1bMF0sIHBvc2l0aW9uWzBdWzFdLCBwb3NpdGlvblsxXVswXSwgcG9zaXRpb25bMV1bMV0sIGN1cnJlbnRbMF1bMF0sIGN1cnJlbnRbMF1bMV0sIGN1cnJlbnRbMV1bMF0sIGN1cnJlbnRbMV1bMV0pO1xuICAgICAgICAgICAgZmlyZUV2ZW50KGdldENvbW1vbkFuY2VzdG9yKGVsZW1lbnRzWzBdLCBlbGVtZW50c1sxXSksICdkdWFsdG91Y2gnLCB7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2Zvcm0sXG4gICAgICAgICAgICAgICAgdG91Y2hlczogZXZlbnQudG91Y2hlcyxcbiAgICAgICAgICAgICAgICB0b3VjaEV2ZW50OiBldmVudFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAqIOaNleiOt3RvdWNoZW5k5LqL5Lu2XG4gICAgKlxuICAgICogMS4g5aaC5p6c5b2T5YmN6Kem54K55pWw5Li6Mu+8jOWImeinpuWPkWR1YWx0b3VjaGVuZOaJi+WKv1xuICAgICpcbiAgICAqIDIuIOmBjeWOhuavj+S4quinpueCue+8mlxuICAgICogPiDlpoLmnpzlpITkuo50YXBwaW5n54q25oCB77yM5YiZ6Kem5Y+RdGFw5omL5Yq/XG4gICAgKiDlpoLmnpzkuYvliY0zMDDmr6vnp5Llh7rnjrDov4d0YXDmiYvlir/vvIzliJnljYfnuqfkuLpkb3VibGV0YXDmiYvlir9cbiAgICAqID4g5aaC5p6c5aSE5LqOcGFubmluZ+eKtuaAge+8jOWImeagueaNrua7keWHuueahOmAn+W6pu+8jOinpuWPkXBhbmVuZC9mbGlja+aJi+WKv1xuICAgICogZmxpY2vmiYvlir/ooqvop6blj5HkuYvlkI7vvIzlho3moLnmja7mu5Hlh7rnmoTmlrnlkJHop6blj5F2ZXJ0aWNhbGZsaWNrL2hvcml6b250YWxmbGlja+aJi+WKv1xuICAgICogPiDlpoLmnpzlpITkuo5wcmVzc2luZ+eKtuaAge+8jOWImeinpuWPkXByZXNzZW5k5omL5Yq/XG4gICAgKlxuICAgICogMy4g6Kej57uR5a6a5omA5pyJ55u45YWz5LqL5Lu2XG4gICAgKlxuICAgICogQGV2ZW50XG4gICAgKiBAcGFyYW0gIHtldmVudH0gZXZlbnRcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHRvdWNoZW5kSGFuZGxlcihldmVudCkge1xuXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhnZXN0dXJlcykubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudHMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gZ2VzdHVyZXMpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5wdXNoKGdlc3R1cmVzW3BdLmVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlyZUV2ZW50KGdldENvbW1vbkFuY2VzdG9yKGVsZW1lbnRzWzBdLCBlbGVtZW50c1sxXSksICdkdWFsdG91Y2hlbmQnLCB7XG4gICAgICAgICAgICAgICAgdG91Y2hlczogc2xpY2UuY2FsbChldmVudC50b3VjaGVzKSxcbiAgICAgICAgICAgICAgICB0b3VjaEV2ZW50OiBldmVudFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdG91Y2ggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1tpXSxcbiAgICAgICAgICAgICAgICBpZCA9IHRvdWNoLmlkZW50aWZpZXIsXG4gICAgICAgICAgICAgICAgZ2VzdHVyZSA9IGdlc3R1cmVzW2lkXTtcblxuICAgICAgICAgICAgaWYgKCFnZXN0dXJlKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChnZXN0dXJlLnByZXNzaW5nSGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChnZXN0dXJlLnByZXNzaW5nSGFuZGxlcik7XG4gICAgICAgICAgICAgICAgZ2VzdHVyZS5wcmVzc2luZ0hhbmRsZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZ2VzdHVyZS5zdGF0dXMgPT09ICd0YXBwaW5nJykge1xuICAgICAgICAgICAgICAgIGdlc3R1cmUudGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICBmaXJlRXZlbnQoZ2VzdHVyZS5lbGVtZW50LCAndGFwJywge1xuICAgICAgICAgICAgICAgICAgICB0b3VjaDogdG91Y2gsXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoRXZlbnQ6IGV2ZW50XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAobGFzdFRhcCAmJiBnZXN0dXJlLnRpbWVzdGFtcCAtIGxhc3RUYXAudGltZXN0YW1wIDwgMzAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpcmVFdmVudChnZXN0dXJlLmVsZW1lbnQsICdkb3VibGV0YXAnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaDogdG91Y2gsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaEV2ZW50OiBldmVudFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsYXN0VGFwID0gZ2VzdHVyZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGdlc3R1cmUuc3RhdHVzID09PSAncGFubmluZycpIHtcbiAgICAgICAgICAgICAgICB2YXIgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICB2YXIgZHVyYXRpb24gPSBub3cgLSBnZXN0dXJlLnN0YXJ0VGltZSxcblxuICAgICAgICAgICAgICAgIC8vIHZlbG9jaXR5WCA9ICh0b3VjaC5jbGllbnRYIC0gZ2VzdHVyZS5zdGFydFRvdWNoLmNsaWVudFgpIC8gZHVyYXRpb24sXG4gICAgICAgICAgICAgICAgLy8gdmVsb2NpdHlZID0gKHRvdWNoLmNsaWVudFkgLSBnZXN0dXJlLnN0YXJ0VG91Y2guY2xpZW50WSkgLyBkdXJhdGlvbixcbiAgICAgICAgICAgICAgICBkaXNwbGFjZW1lbnRYID0gdG91Y2guY2xpZW50WCAtIGdlc3R1cmUuc3RhcnRUb3VjaC5jbGllbnRYLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGFjZW1lbnRZID0gdG91Y2guY2xpZW50WSAtIGdlc3R1cmUuc3RhcnRUb3VjaC5jbGllbnRZO1xuXG4gICAgICAgICAgICAgICAgdmFyIHZlbG9jaXR5ID0gTWF0aC5zcXJ0KGdlc3R1cmUudmVsb2NpdHlZICogZ2VzdHVyZS52ZWxvY2l0eVkgKyBnZXN0dXJlLnZlbG9jaXR5WCAqIGdlc3R1cmUudmVsb2NpdHlYKTtcbiAgICAgICAgICAgICAgICB2YXIgaXNmbGljayA9IHZlbG9jaXR5ID4gMC41ICYmIG5vdyAtIGdlc3R1cmUubGFzdFRpbWUgPCAxMDA7XG4gICAgICAgICAgICAgICAgdmFyIGV4dHJhID0ge1xuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgICAgICAgICAgICAgIGlzZmxpY2s6IGlzZmxpY2ssXG4gICAgICAgICAgICAgICAgICAgIHZlbG9jaXR5WDogZ2VzdHVyZS52ZWxvY2l0eVgsXG4gICAgICAgICAgICAgICAgICAgIHZlbG9jaXR5WTogZ2VzdHVyZS52ZWxvY2l0eVksXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYWNlbWVudFg6IGRpc3BsYWNlbWVudFgsXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYWNlbWVudFk6IGRpc3BsYWNlbWVudFksXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoOiB0b3VjaCxcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hlczogZXZlbnQudG91Y2hlcyxcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlZFRvdWNoZXM6IGV2ZW50LmNoYW5nZWRUb3VjaGVzLFxuICAgICAgICAgICAgICAgICAgICB0b3VjaEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgaXNWZXJ0aWNhbDogZ2VzdHVyZS5pc1ZlcnRpY2FsXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGZpcmVFdmVudChnZXN0dXJlLmVsZW1lbnQsICdwYW5lbmQnLCBleHRyYSk7XG4gICAgICAgICAgICAgICAgaWYgKGlzZmxpY2spIHtcbiAgICAgICAgICAgICAgICAgICAgZmlyZUV2ZW50KGdlc3R1cmUuZWxlbWVudCwgJ3N3aXBlJywgZXh0cmEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChnZXN0dXJlLmlzVmVydGljYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcmVFdmVudChnZXN0dXJlLmVsZW1lbnQsICd2ZXJ0aWNhbHN3aXBlJywgZXh0cmEpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlyZUV2ZW50KGdlc3R1cmUuZWxlbWVudCwgJ2hvcml6b250YWxzd2lwZScsIGV4dHJhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGdlc3R1cmUuc3RhdHVzID09PSAncHJlc3NpbmcnKSB7XG4gICAgICAgICAgICAgICAgZmlyZUV2ZW50KGdlc3R1cmUuZWxlbWVudCwgJ3ByZXNzZW5kJywge1xuICAgICAgICAgICAgICAgICAgICB0b3VjaDogdG91Y2gsXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoRXZlbnQ6IGV2ZW50XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRlbGV0ZSBnZXN0dXJlc1tpZF07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoT2JqZWN0LmtleXMoZ2VzdHVyZXMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgZG9jRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdG91Y2htb3ZlSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICAgICAgZG9jRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0b3VjaGVuZEhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIGRvY0VsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdG91Y2hjYW5jZWxIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAqIOaNleiOt3RvdWNoY2FuY2Vs5LqL5Lu2XG4gICAgKlxuICAgICogMS4g5aaC5p6c5b2T5YmN6Kem54K55pWw5Li6Mu+8jOWImeinpuWPkWR1YWx0b3VjaGVuZOaJi+WKv1xuICAgICpcbiAgICAqIDIuIOmBjeWOhuavj+S4quinpueCue+8mlxuICAgICogPiDlpoLmnpzlpITkuo5wYW5uaW5n54q25oCB77yM5YiZ6Kem5Y+RcGFuZW5k5omL5Yq/XG4gICAgKiA+IOWmguaenOWkhOS6jnByZXNzaW5n54q25oCB77yM5YiZ6Kem5Y+RcHJlc3NlbmTmiYvlir9cbiAgICAqXG4gICAgKiAzLiDop6Pnu5HlrprmiYDmnInnm7jlhbPkuovku7ZcbiAgICAqXG4gICAgKiBAZXZlbnRcbiAgICAqIEBwYXJhbSAge2V2ZW50fSBldmVudFxuICAgICovXG4gICAgZnVuY3Rpb24gdG91Y2hjYW5jZWxIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIC8vIFRPRE86IOWSjHRvdWNoZW5kSGFuZGxlcuWkp+mHj+mHjeWkje+8jOW7uuiurkRSWVxuXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhnZXN0dXJlcykubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudHMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gZ2VzdHVyZXMpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5wdXNoKGdlc3R1cmVzW3BdLmVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlyZUV2ZW50KGdldENvbW1vbkFuY2VzdG9yKGVsZW1lbnRzWzBdLCBlbGVtZW50c1sxXSksICdkdWFsdG91Y2hlbmQnLCB7XG4gICAgICAgICAgICAgICAgdG91Y2hlczogc2xpY2UuY2FsbChldmVudC50b3VjaGVzKSxcbiAgICAgICAgICAgICAgICB0b3VjaEV2ZW50OiBldmVudFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdG91Y2ggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1tpXSxcbiAgICAgICAgICAgICAgICBpZCA9IHRvdWNoLmlkZW50aWZpZXIsXG4gICAgICAgICAgICAgICAgZ2VzdHVyZSA9IGdlc3R1cmVzW2lkXTtcblxuICAgICAgICAgICAgaWYgKCFnZXN0dXJlKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChnZXN0dXJlLnByZXNzaW5nSGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChnZXN0dXJlLnByZXNzaW5nSGFuZGxlcik7XG4gICAgICAgICAgICAgICAgZ2VzdHVyZS5wcmVzc2luZ0hhbmRsZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZ2VzdHVyZS5zdGF0dXMgPT09ICdwYW5uaW5nJykge1xuICAgICAgICAgICAgICAgIGZpcmVFdmVudChnZXN0dXJlLmVsZW1lbnQsICdwYW5lbmQnLCB7XG4gICAgICAgICAgICAgICAgICAgIHRvdWNoOiB0b3VjaCxcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hlczogZXZlbnQudG91Y2hlcyxcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlZFRvdWNoZXM6IGV2ZW50LmNoYW5nZWRUb3VjaGVzLFxuICAgICAgICAgICAgICAgICAgICB0b3VjaEV2ZW50OiBldmVudFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGdlc3R1cmUuc3RhdHVzID09PSAncHJlc3NpbmcnKSB7XG4gICAgICAgICAgICAgICAgZmlyZUV2ZW50KGdlc3R1cmUuZWxlbWVudCwgJ3ByZXNzZW5kJywge1xuICAgICAgICAgICAgICAgICAgICB0b3VjaDogdG91Y2gsXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoRXZlbnQ6IGV2ZW50XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWxldGUgZ2VzdHVyZXNbaWRdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGdlc3R1cmVzKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGRvY0VsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRvdWNobW92ZUhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIGRvY0VsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdG91Y2hlbmRIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgICAgICBkb2NFbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRvdWNoY2FuY2VsSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZG9jRWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRvdWNoc3RhcnRIYW5kbGVyLCBmYWxzZSk7XG59KSh3aW5kb3cpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4xLjBAZ2VzdHVyZS1qcy9zcmMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDEwNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJ2V2ZW50LWVtaXR0ZXInO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnQge31cbkV2ZW50RW1pdHRlcihFdmVudC5wcm90b3R5cGUpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ldmVudC5qcyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGQgICAgICAgID0gcmVxdWlyZSgnZCcpXG4gICwgY2FsbGFibGUgPSByZXF1aXJlKCdlczUtZXh0L29iamVjdC92YWxpZC1jYWxsYWJsZScpXG5cbiAgLCBhcHBseSA9IEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseSwgY2FsbCA9IEZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsXG4gICwgY3JlYXRlID0gT2JqZWN0LmNyZWF0ZSwgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHlcbiAgLCBkZWZpbmVQcm9wZXJ0aWVzID0gT2JqZWN0LmRlZmluZVByb3BlcnRpZXNcbiAgLCBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHlcbiAgLCBkZXNjcmlwdG9yID0geyBjb25maWd1cmFibGU6IHRydWUsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSB9XG5cbiAgLCBvbiwgb25jZSwgb2ZmLCBlbWl0LCBtZXRob2RzLCBkZXNjcmlwdG9ycywgYmFzZTtcblxub24gPSBmdW5jdGlvbiAodHlwZSwgbGlzdGVuZXIpIHtcblx0dmFyIGRhdGE7XG5cblx0Y2FsbGFibGUobGlzdGVuZXIpO1xuXG5cdGlmICghaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLCAnX19lZV9fJykpIHtcblx0XHRkYXRhID0gZGVzY3JpcHRvci52YWx1ZSA9IGNyZWF0ZShudWxsKTtcblx0XHRkZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX19lZV9fJywgZGVzY3JpcHRvcik7XG5cdFx0ZGVzY3JpcHRvci52YWx1ZSA9IG51bGw7XG5cdH0gZWxzZSB7XG5cdFx0ZGF0YSA9IHRoaXMuX19lZV9fO1xuXHR9XG5cdGlmICghZGF0YVt0eXBlXSkgZGF0YVt0eXBlXSA9IGxpc3RlbmVyO1xuXHRlbHNlIGlmICh0eXBlb2YgZGF0YVt0eXBlXSA9PT0gJ29iamVjdCcpIGRhdGFbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG5cdGVsc2UgZGF0YVt0eXBlXSA9IFtkYXRhW3R5cGVdLCBsaXN0ZW5lcl07XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG5vbmNlID0gZnVuY3Rpb24gKHR5cGUsIGxpc3RlbmVyKSB7XG5cdHZhciBvbmNlLCBzZWxmO1xuXG5cdGNhbGxhYmxlKGxpc3RlbmVyKTtcblx0c2VsZiA9IHRoaXM7XG5cdG9uLmNhbGwodGhpcywgdHlwZSwgb25jZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRvZmYuY2FsbChzZWxmLCB0eXBlLCBvbmNlKTtcblx0XHRhcHBseS5jYWxsKGxpc3RlbmVyLCB0aGlzLCBhcmd1bWVudHMpO1xuXHR9KTtcblxuXHRvbmNlLl9fZWVPbmNlTGlzdGVuZXJfXyA9IGxpc3RlbmVyO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbm9mZiA9IGZ1bmN0aW9uICh0eXBlLCBsaXN0ZW5lcikge1xuXHR2YXIgZGF0YSwgbGlzdGVuZXJzLCBjYW5kaWRhdGUsIGk7XG5cblx0Y2FsbGFibGUobGlzdGVuZXIpO1xuXG5cdGlmICghaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLCAnX19lZV9fJykpIHJldHVybiB0aGlzO1xuXHRkYXRhID0gdGhpcy5fX2VlX187XG5cdGlmICghZGF0YVt0eXBlXSkgcmV0dXJuIHRoaXM7XG5cdGxpc3RlbmVycyA9IGRhdGFbdHlwZV07XG5cblx0aWYgKHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdvYmplY3QnKSB7XG5cdFx0Zm9yIChpID0gMDsgKGNhbmRpZGF0ZSA9IGxpc3RlbmVyc1tpXSk7ICsraSkge1xuXHRcdFx0aWYgKChjYW5kaWRhdGUgPT09IGxpc3RlbmVyKSB8fFxuXHRcdFx0XHRcdChjYW5kaWRhdGUuX19lZU9uY2VMaXN0ZW5lcl9fID09PSBsaXN0ZW5lcikpIHtcblx0XHRcdFx0aWYgKGxpc3RlbmVycy5sZW5ndGggPT09IDIpIGRhdGFbdHlwZV0gPSBsaXN0ZW5lcnNbaSA/IDAgOiAxXTtcblx0XHRcdFx0ZWxzZSBsaXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRpZiAoKGxpc3RlbmVycyA9PT0gbGlzdGVuZXIpIHx8XG5cdFx0XHRcdChsaXN0ZW5lcnMuX19lZU9uY2VMaXN0ZW5lcl9fID09PSBsaXN0ZW5lcikpIHtcblx0XHRcdGRlbGV0ZSBkYXRhW3R5cGVdO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0aGlzO1xufTtcblxuZW1pdCA9IGZ1bmN0aW9uICh0eXBlKSB7XG5cdHZhciBpLCBsLCBsaXN0ZW5lciwgbGlzdGVuZXJzLCBhcmdzO1xuXG5cdGlmICghaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLCAnX19lZV9fJykpIHJldHVybjtcblx0bGlzdGVuZXJzID0gdGhpcy5fX2VlX19bdHlwZV07XG5cdGlmICghbGlzdGVuZXJzKSByZXR1cm47XG5cblx0aWYgKHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdvYmplY3QnKSB7XG5cdFx0bCA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cdFx0YXJncyA9IG5ldyBBcnJheShsIC0gMSk7XG5cdFx0Zm9yIChpID0gMTsgaSA8IGw7ICsraSkgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG5cblx0XHRsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuc2xpY2UoKTtcblx0XHRmb3IgKGkgPSAwOyAobGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV0pOyArK2kpIHtcblx0XHRcdGFwcGx5LmNhbGwobGlzdGVuZXIsIHRoaXMsIGFyZ3MpO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcblx0XHRjYXNlIDE6XG5cdFx0XHRjYWxsLmNhbGwobGlzdGVuZXJzLCB0aGlzKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMjpcblx0XHRcdGNhbGwuY2FsbChsaXN0ZW5lcnMsIHRoaXMsIGFyZ3VtZW50c1sxXSk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDM6XG5cdFx0XHRjYWxsLmNhbGwobGlzdGVuZXJzLCB0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSk7XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0bCA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cdFx0XHRhcmdzID0gbmV3IEFycmF5KGwgLSAxKTtcblx0XHRcdGZvciAoaSA9IDE7IGkgPCBsOyArK2kpIHtcblx0XHRcdFx0YXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG5cdFx0XHR9XG5cdFx0XHRhcHBseS5jYWxsKGxpc3RlbmVycywgdGhpcywgYXJncyk7XG5cdFx0fVxuXHR9XG59O1xuXG5tZXRob2RzID0ge1xuXHRvbjogb24sXG5cdG9uY2U6IG9uY2UsXG5cdG9mZjogb2ZmLFxuXHRlbWl0OiBlbWl0XG59O1xuXG5kZXNjcmlwdG9ycyA9IHtcblx0b246IGQob24pLFxuXHRvbmNlOiBkKG9uY2UpLFxuXHRvZmY6IGQob2ZmKSxcblx0ZW1pdDogZChlbWl0KVxufTtcblxuYmFzZSA9IGRlZmluZVByb3BlcnRpZXMoe30sIGRlc2NyaXB0b3JzKTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZnVuY3Rpb24gKG8pIHtcblx0cmV0dXJuIChvID09IG51bGwpID8gY3JlYXRlKGJhc2UpIDogZGVmaW5lUHJvcGVydGllcyhPYmplY3QobyksIGRlc2NyaXB0b3JzKTtcbn07XG5leHBvcnRzLm1ldGhvZHMgPSBtZXRob2RzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjMuNEBldmVudC1lbWl0dGVyL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxMDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYXNzaWduICAgICAgICA9IHJlcXVpcmUoJ2VzNS1leHQvb2JqZWN0L2Fzc2lnbicpXG4gICwgbm9ybWFsaXplT3B0cyA9IHJlcXVpcmUoJ2VzNS1leHQvb2JqZWN0L25vcm1hbGl6ZS1vcHRpb25zJylcbiAgLCBpc0NhbGxhYmxlICAgID0gcmVxdWlyZSgnZXM1LWV4dC9vYmplY3QvaXMtY2FsbGFibGUnKVxuICAsIGNvbnRhaW5zICAgICAgPSByZXF1aXJlKCdlczUtZXh0L3N0cmluZy8jL2NvbnRhaW5zJylcblxuICAsIGQ7XG5cbmQgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkc2NyLCB2YWx1ZS8qLCBvcHRpb25zKi8pIHtcblx0dmFyIGMsIGUsIHcsIG9wdGlvbnMsIGRlc2M7XG5cdGlmICgoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHx8ICh0eXBlb2YgZHNjciAhPT0gJ3N0cmluZycpKSB7XG5cdFx0b3B0aW9ucyA9IHZhbHVlO1xuXHRcdHZhbHVlID0gZHNjcjtcblx0XHRkc2NyID0gbnVsbDtcblx0fSBlbHNlIHtcblx0XHRvcHRpb25zID0gYXJndW1lbnRzWzJdO1xuXHR9XG5cdGlmIChkc2NyID09IG51bGwpIHtcblx0XHRjID0gdyA9IHRydWU7XG5cdFx0ZSA9IGZhbHNlO1xuXHR9IGVsc2Uge1xuXHRcdGMgPSBjb250YWlucy5jYWxsKGRzY3IsICdjJyk7XG5cdFx0ZSA9IGNvbnRhaW5zLmNhbGwoZHNjciwgJ2UnKTtcblx0XHR3ID0gY29udGFpbnMuY2FsbChkc2NyLCAndycpO1xuXHR9XG5cblx0ZGVzYyA9IHsgdmFsdWU6IHZhbHVlLCBjb25maWd1cmFibGU6IGMsIGVudW1lcmFibGU6IGUsIHdyaXRhYmxlOiB3IH07XG5cdHJldHVybiAhb3B0aW9ucyA/IGRlc2MgOiBhc3NpZ24obm9ybWFsaXplT3B0cyhvcHRpb25zKSwgZGVzYyk7XG59O1xuXG5kLmdzID0gZnVuY3Rpb24gKGRzY3IsIGdldCwgc2V0LyosIG9wdGlvbnMqLykge1xuXHR2YXIgYywgZSwgb3B0aW9ucywgZGVzYztcblx0aWYgKHR5cGVvZiBkc2NyICE9PSAnc3RyaW5nJykge1xuXHRcdG9wdGlvbnMgPSBzZXQ7XG5cdFx0c2V0ID0gZ2V0O1xuXHRcdGdldCA9IGRzY3I7XG5cdFx0ZHNjciA9IG51bGw7XG5cdH0gZWxzZSB7XG5cdFx0b3B0aW9ucyA9IGFyZ3VtZW50c1szXTtcblx0fVxuXHRpZiAoZ2V0ID09IG51bGwpIHtcblx0XHRnZXQgPSB1bmRlZmluZWQ7XG5cdH0gZWxzZSBpZiAoIWlzQ2FsbGFibGUoZ2V0KSkge1xuXHRcdG9wdGlvbnMgPSBnZXQ7XG5cdFx0Z2V0ID0gc2V0ID0gdW5kZWZpbmVkO1xuXHR9IGVsc2UgaWYgKHNldCA9PSBudWxsKSB7XG5cdFx0c2V0ID0gdW5kZWZpbmVkO1xuXHR9IGVsc2UgaWYgKCFpc0NhbGxhYmxlKHNldCkpIHtcblx0XHRvcHRpb25zID0gc2V0O1xuXHRcdHNldCA9IHVuZGVmaW5lZDtcblx0fVxuXHRpZiAoZHNjciA9PSBudWxsKSB7XG5cdFx0YyA9IHRydWU7XG5cdFx0ZSA9IGZhbHNlO1xuXHR9IGVsc2Uge1xuXHRcdGMgPSBjb250YWlucy5jYWxsKGRzY3IsICdjJyk7XG5cdFx0ZSA9IGNvbnRhaW5zLmNhbGwoZHNjciwgJ2UnKTtcblx0fVxuXG5cdGRlc2MgPSB7IGdldDogZ2V0LCBzZXQ6IHNldCwgY29uZmlndXJhYmxlOiBjLCBlbnVtZXJhYmxlOiBlIH07XG5cdHJldHVybiAhb3B0aW9ucyA/IGRlc2MgOiBhc3NpZ24obm9ybWFsaXplT3B0cyhvcHRpb25zKSwgZGVzYyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjEuMUBkL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxMDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vaXMtaW1wbGVtZW50ZWQnKSgpXG5cdD8gT2JqZWN0LmFzc2lnblxuXHQ6IHJlcXVpcmUoJy4vc2hpbScpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjEwLjEyQGVzNS1leHQvb2JqZWN0L2Fzc2lnbi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBhc3NpZ24gPSBPYmplY3QuYXNzaWduLCBvYmo7XG5cdGlmICh0eXBlb2YgYXNzaWduICE9PSAnZnVuY3Rpb24nKSByZXR1cm4gZmFsc2U7XG5cdG9iaiA9IHsgZm9vOiAncmF6JyB9O1xuXHRhc3NpZ24ob2JqLCB7IGJhcjogJ2R3YScgfSwgeyB0cnp5OiAndHJ6eScgfSk7XG5cdHJldHVybiAob2JqLmZvbyArIG9iai5iYXIgKyBvYmoudHJ6eSkgPT09ICdyYXpkd2F0cnp5Jztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3QvYXNzaWduL2lzLWltcGxlbWVudGVkLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIga2V5cyAgPSByZXF1aXJlKCcuLi9rZXlzJylcbiAgLCB2YWx1ZSA9IHJlcXVpcmUoJy4uL3ZhbGlkLXZhbHVlJylcblxuICAsIG1heCA9IE1hdGgubWF4O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkZXN0LCBzcmMvKiwg4oCmc3JjbiovKSB7XG5cdHZhciBlcnJvciwgaSwgbCA9IG1heChhcmd1bWVudHMubGVuZ3RoLCAyKSwgYXNzaWduO1xuXHRkZXN0ID0gT2JqZWN0KHZhbHVlKGRlc3QpKTtcblx0YXNzaWduID0gZnVuY3Rpb24gKGtleSkge1xuXHRcdHRyeSB7IGRlc3Rba2V5XSA9IHNyY1trZXldOyB9IGNhdGNoIChlKSB7XG5cdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGU7XG5cdFx0fVxuXHR9O1xuXHRmb3IgKGkgPSAxOyBpIDwgbDsgKytpKSB7XG5cdFx0c3JjID0gYXJndW1lbnRzW2ldO1xuXHRcdGtleXMoc3JjKS5mb3JFYWNoKGFzc2lnbik7XG5cdH1cblx0aWYgKGVycm9yICE9PSB1bmRlZmluZWQpIHRocm93IGVycm9yO1xuXHRyZXR1cm4gZGVzdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3QvYXNzaWduL3NoaW0uanNcbi8vIG1vZHVsZSBpZCA9IDExMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9pcy1pbXBsZW1lbnRlZCcpKClcblx0PyBPYmplY3Qua2V5c1xuXHQ6IHJlcXVpcmUoJy4vc2hpbScpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjEwLjEyQGVzNS1leHQvb2JqZWN0L2tleXMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDExMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXHR0cnkge1xuXHRcdE9iamVjdC5rZXlzKCdwcmltaXRpdmUnKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZSkgeyByZXR1cm4gZmFsc2U7IH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3Qva2V5cy9pcy1pbXBsZW1lbnRlZC5qc1xuLy8gbW9kdWxlIGlkID0gMTEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIGtleXMgPSBPYmplY3Qua2V5cztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG5cdHJldHVybiBrZXlzKG9iamVjdCA9PSBudWxsID8gb2JqZWN0IDogT2JqZWN0KG9iamVjdCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4xMC4xMkBlczUtZXh0L29iamVjdC9rZXlzL3NoaW0uanNcbi8vIG1vZHVsZSBpZCA9IDExM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdGlmICh2YWx1ZSA9PSBudWxsKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHVzZSBudWxsIG9yIHVuZGVmaW5lZFwiKTtcblx0cmV0dXJuIHZhbHVlO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4xMC4xMkBlczUtZXh0L29iamVjdC92YWxpZC12YWx1ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIGZvckVhY2ggPSBBcnJheS5wcm90b3R5cGUuZm9yRWFjaCwgY3JlYXRlID0gT2JqZWN0LmNyZWF0ZTtcblxudmFyIHByb2Nlc3MgPSBmdW5jdGlvbiAoc3JjLCBvYmopIHtcblx0dmFyIGtleTtcblx0Zm9yIChrZXkgaW4gc3JjKSBvYmpba2V5XSA9IHNyY1trZXldO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3B0aW9ucy8qLCDigKZvcHRpb25zKi8pIHtcblx0dmFyIHJlc3VsdCA9IGNyZWF0ZShudWxsKTtcblx0Zm9yRWFjaC5jYWxsKGFyZ3VtZW50cywgZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0XHRpZiAob3B0aW9ucyA9PSBudWxsKSByZXR1cm47XG5cdFx0cHJvY2VzcyhPYmplY3Qob3B0aW9ucyksIHJlc3VsdCk7XG5cdH0pO1xuXHRyZXR1cm4gcmVzdWx0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4xMC4xMkBlczUtZXh0L29iamVjdC9ub3JtYWxpemUtb3B0aW9ucy5qc1xuLy8gbW9kdWxlIGlkID0gMTE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIERlcHJlY2F0ZWRcblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbic7IH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3QvaXMtY2FsbGFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDExNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9pcy1pbXBsZW1lbnRlZCcpKClcblx0PyBTdHJpbmcucHJvdG90eXBlLmNvbnRhaW5zXG5cdDogcmVxdWlyZSgnLi9zaGltJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMTAuMTJAZXM1LWV4dC9zdHJpbmcvIy9jb250YWlucy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIHN0ciA9ICdyYXpkd2F0cnp5JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cdGlmICh0eXBlb2Ygc3RyLmNvbnRhaW5zICE9PSAnZnVuY3Rpb24nKSByZXR1cm4gZmFsc2U7XG5cdHJldHVybiAoKHN0ci5jb250YWlucygnZHdhJykgPT09IHRydWUpICYmIChzdHIuY29udGFpbnMoJ2ZvbycpID09PSBmYWxzZSkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4xMC4xMkBlczUtZXh0L3N0cmluZy8jL2NvbnRhaW5zL2lzLWltcGxlbWVudGVkLmpzXG4vLyBtb2R1bGUgaWQgPSAxMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5kZXhPZiA9IFN0cmluZy5wcm90b3R5cGUuaW5kZXhPZjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2VhcmNoU3RyaW5nLyosIHBvc2l0aW9uKi8pIHtcblx0cmV0dXJuIGluZGV4T2YuY2FsbCh0aGlzLCBzZWFyY2hTdHJpbmcsIGFyZ3VtZW50c1sxXSkgPiAtMTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMTAuMTJAZXM1LWV4dC9zdHJpbmcvIy9jb250YWlucy9zaGltLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbikge1xuXHRpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB0aHJvdyBuZXcgVHlwZUVycm9yKGZuICsgXCIgaXMgbm90IGEgZnVuY3Rpb25cIik7XG5cdHJldHVybiBmbjtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3QvdmFsaWQtY2FsbGFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDEyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgJy4vc3RhZ2UuY3NzJztcbmltcG9ydCB7XG4gICAgd2luLFxuICAgIGRvYyxcbiAgICBQcm9taXNlLFxuICAgIHF1ZXJ5LFxuICAgIHF1ZXJ5QWxsLFxuICAgIGdldFJlY3Rcbn0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7XG4gICAgQ2FudmFzUmVuZGVyXG59IGZyb20gJy4vY2FudmFzJztcbmltcG9ydCBzbGljZUNvbmZpZyBmcm9tICcuL3NsaWNlQ29uZmlnJztcblxuY29uc3Qgc2xpY2VXaWR0aCA9IDc1MDtcbmNvbnN0IHNsaWNlSGVpZ2h0ID0gMTMzNDtcbmNvbnN0IGhTbGljZSA9IDk7XG5jb25zdCB2U2xpY2UgPSAxNDtcbmNvbnN0IHdpZHRoID0gc2xpY2VXaWR0aCAqIGhTbGljZTtcbmNvbnN0IGhlaWdodCA9IHNsaWNlSGVpZ2h0ICogdlNsaWNlO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFnZSBleHRlbmRzIENhbnZhc1JlbmRlcntcbiAgICBjb25zdHJ1Y3Rvcih2aWV3cG9ydCkge1xuICAgICAgICBjb25zdCB7d2lkdGg6IHZ3LCBoZWlnaHQ6IHZofSA9IGdldFJlY3Qodmlld3BvcnQpO1xuICAgICAgICBjb25zdCBzdGFnZUVsID0gcXVlcnkodmlld3BvcnQsICcjc3RhZ2UnKTtcblxuICAgICAgICBzdXBlcihzdGFnZUVsLCB2dywgdmgpO1xuXG4gICAgICAgIHRoaXMuc3RhZ2VFbCA9IHN0YWdlRWw7XG4gICAgICAgIHRoaXMudncgPSB2dztcbiAgICAgICAgdGhpcy52aCA9IHZoO1xuICAgICAgICB0aGlzLndpZHRoID0gdncgKiBoU2xpY2U7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdncgLyAod2lkdGggLyBoU2xpY2UpICogaGVpZ2h0O1xuICAgICAgICB0aGlzLmhTbGljZSA9IGhTbGljZTtcbiAgICAgICAgdGhpcy52U2xpY2UgPSB2U2xpY2U7XG4gICAgICAgIHRoaXMuc2xpY2VXaWR0aCA9IHRoaXMud2lkdGggLyBoU2xpY2U7XG4gICAgICAgIHRoaXMuc2xpY2VIZWlnaHQgPSB0aGlzLmhlaWdodCAvIHZTbGljZTtcbiAgICAgICAgdGhpcy5zbGljZXMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCB2ID0gMDsgdiA8IHRoaXMudlNsaWNlOyB2KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGggPSAwOyBoIDwgdGhpcy5oU2xpY2U7IGgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdiAqIHRoaXMuaFNsaWNlICsgaDtcbiAgICAgICAgICAgICAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiB2ICogdGhpcy5oU2xpY2UgKyBoLFxuICAgICAgICAgICAgICAgICAgICBoLFxuICAgICAgICAgICAgICAgICAgICB2XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAoc2xpY2VDb25maWdbU3RyaW5nKGluZGV4KV0pIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gc2xpY2VDb25maWdbU3RyaW5nKGluZGV4KV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ1trZXldID0gc2xpY2VDb25maWdbU3RyaW5nKGluZGV4KV1ba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuc2xpY2VzLnB1c2goY29uZmlnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB0b3RhbEFtb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2xpY2VzLmxlbmd0aDtcbiAgICB9XG5cbiAgICBnZXQgc3BlY2lhbEFtb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2xpY2VzLmZpbHRlcihzbGljZSA9PlxuICAgICAgICAgICAgc2xpY2Uuc3BlY2lhbFxuICAgICAgICApLmxlbmd0aDtcbiAgICB9XG5cbiAgICBnZXQgc3BlY2lhbEZvdW5kKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zbGljZXMuZmlsdGVyKHNsaWNlID0+XG4gICAgICAgICAgICBzbGljZS5zcGVjaWFsICYmIHNsaWNlLmZvdW5kXG4gICAgICAgICkubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldCBmb2N1c2VkQW1vdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zbGljZXMuZmlsdGVyKHNsaWNlID0+XG4gICAgICAgICAgICBzbGljZS5mb2N1c2VkXG4gICAgICAgICkubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldCBob3ZlcmVkQW1vdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zbGljZXMuZmlsdGVyKHNsaWNlID0+XG4gICAgICAgICAgICBzbGljZS5ob3ZlcmVkXG4gICAgICAgICkubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldFNsaWNlKHNjcm9sbFgsIHNjcm9sbFkpIHtcbiAgICAgICAgY29uc3QgaCA9IHBhcnNlSW50KHNjcm9sbFggLyB0aGlzLnNsaWNlV2lkdGgpO1xuICAgICAgICBjb25zdCB2ID0gcGFyc2VJbnQoc2Nyb2xsWSAvIHRoaXMuc2xpY2VIZWlnaHQpO1xuICAgICAgICByZXR1cm4gdGhpcy5zbGljZXNbdiAqIHRoaXMuaFNsaWNlICsgaF07XG4gICAgfVxuXG4gICAgZ2V0SG92ZXJTbGljZShzY3JvbGxYLCBzY3JvbGxZKSB7XG4gICAgICAgIGNvbnN0IGhvdmVyID0gdGhpcy5nZXRTbGljZShzY3JvbGxYLCBzY3JvbGxZKTtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgaCxcbiAgICAgICAgICAgIHYsXG4gICAgICAgICAgICBpbmRleFxuICAgICAgICB9ID0gaG92ZXI7XG4gICAgICAgIGNvbnN0IHJlbGF0ZWQgPSBbXTtcblxuICAgICAgICBpZiAoaCA8IHRoaXMuaFNsaWNlIC0gMSkge1xuICAgICAgICAgICAgcmVsYXRlZC5wdXNoKHRoaXMuc2xpY2VzW2luZGV4ICsgMV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGggPiAxKSB7XG4gICAgICAgICAgICByZWxhdGVkLnB1c2godGhpcy5zbGljZXNbaW5kZXggLSAxXSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodiA8IHRoaXMudlNsaWNlIC0gMSkge1xuICAgICAgICAgICAgcmVsYXRlZC5wdXNoKHRoaXMuc2xpY2VzW2luZGV4ICsgdGhpcy5oU2xpY2VdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2ID4gMSkge1xuICAgICAgICAgICAgcmVsYXRlZC5wdXNoKHRoaXMuc2xpY2VzW2luZGV4IC0gdGhpcy5oU2xpY2VdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoIDwgdGhpcy5oU2xpY2UgLSAxXG4gICAgICAgICAgICAmJiB2IDwgdGhpcy52U2xpY2UgLSAxKSB7XG4gICAgICAgICAgICByZWxhdGVkLnB1c2godGhpcy5zbGljZXNbaW5kZXggKyB0aGlzLmhTbGljZSArIDFdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoID4gMSAmJiB2ID4gMSkge1xuICAgICAgICAgICAgcmVsYXRlZC5wdXNoKHRoaXMuc2xpY2VzW2luZGV4IC0gdGhpcy5oU2xpY2UgLSAxXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgaG92ZXIsXG4gICAgICAgICAgICAuLi5yZWxhdGVkXG4gICAgICAgIF0ubWFwKHNsaWNlID0+IHtcbiAgICAgICAgICAgIHNsaWNlLmhvdmVyZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHNsaWNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRGb2N1c1NsaWNlKHNjcm9sbFgsIHNjcm9sbFkpIHtcbiAgICAgICAgY29uc3QgY3ggPSBzY3JvbGxYICsgdGhpcy5zbGljZVdpZHRoIC8gMjtcbiAgICAgICAgY29uc3QgY3kgPSBzY3JvbGxZICsgdGhpcy5zbGljZUhlaWdodCAvIDI7XG4gICAgICAgIGNvbnN0IGggPSBwYXJzZUludChjeCAvIHRoaXMuc2xpY2VXaWR0aCk7XG4gICAgICAgIGNvbnN0IHYgPSBwYXJzZUludChjeSAvIHRoaXMuc2xpY2VIZWlnaHQpO1xuICAgICAgICBjb25zdCBkeCA9IHBhcnNlSW50KGN4ICUgdGhpcy5zbGljZVdpZHRoKTtcbiAgICAgICAgY29uc3QgZHkgPSBwYXJzZUludChjeSAlIHRoaXMuc2xpY2VIZWlnaHQpO1xuXG4gICAgICAgIGxldCBzbGljZTtcbiAgICAgICAgaWYgKGR4ID4gdGhpcy5zbGljZVdpZHRoICogMC4yNSAmJiBkeCA8IHRoaXMuc2xpY2VXaWR0aCAqIDAuNzVcbiAgICAgICAgICAgICAgICAmJiBkeSA+IHRoaXMuc2xpY2VIZWlnaHQgKiAwLjI1ICYmIGR5IDwgdGhpcy5zbGljZUhlaWdodCAqIDAuNzUpIHtcbiAgICAgICAgICAgIHNsaWNlID0gdGhpcy5zbGljZXNbdiAqIHRoaXMuaFNsaWNlICsgaF07XG4gICAgICAgICAgICBzbGljZS5mb2N1c2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzbGljZTtcbiAgICB9XG5cbiAgICByZWFkeSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RhZ2VFbC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc3RhZ2UuanMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vc3RhZ2UuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLy4uL25vZGVfbW9kdWxlcy8uMC4xMy4xQHN0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvaW5kZXguanMhLi9zdGFnZS5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0YWdlLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc3RhZ2UuY3NzXG4vLyBtb2R1bGUgaWQgPSAxMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIiNzdGFnZSB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGVmdDogMDtcXG4gICAgdG9wOiAwO1xcbiAgICAtd2Via2l0LXRyYW5mb3JtOiB0cmFuc2xhdGVaKDlweCk7XFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4yNS4wQGNzcy1sb2FkZXIhLi9zcmMvc3RhZ2UuY3NzXG4vLyBtb2R1bGUgaWQgPSAxMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtcbiAgICB3aW4sXG4gICAgZG9jLFxuICAgIFByb21pc2UsXG4gICAgZGVmZXIsXG4gICAgbG9hZEltZyxcbiAgICBxdWVyeSxcbiAgICBxdWVyeUFsbCxcbiAgICBnZXRSZWN0XG59IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBjbGFzcyBDYW52YXNJbWFnZSB7XG4gICAgY29uc3RydWN0b3IoY2FudmFzLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIGlmICghKGNhbnZhcyBpbnN0YW5jZW9mIEhUTUxDYW52YXNFbGVtZW50KSkge1xuICAgICAgICAgICAgaGVpZ2h0ID0gd2lkdGg7XG4gICAgICAgICAgICB3aWR0aCA9IGNhbnZhcztcbiAgICAgICAgICAgIGNhbnZhcyA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcyB8fCBkb2MuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5yZW5kZXIgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICB0aGlzLl9pbWFnZTtcbiAgICB9XG5cbiAgICBnZXQgaW1hZ2UoKSB7XG4gICAgICAgIGlmICghdGhpcy5faW1hZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICB0aGlzLl9pbWFnZS5zcmMgPSB0aGlzLmNhbnZhcy50b0RhdGFVUkwoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5faW1hZ2U7XG4gICAgfVxuXG4gICAgZHJhdyhwYXJhbXMpIHtcbiAgICAgICAgY29uc3QgbG9hZGVkID0gcGFyYW1zLm1hcChwYXJhbSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkZWZlcnJlZCA9IGRlZmVyKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChwYXJhbS5pbWcpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHBhcmFtKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW0uc3JjKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgW2ltZywgcHJvbWlzZV0gPSBsb2FkSW1nKHBhcmFtLnNyYyk7XG4gICAgICAgICAgICAgICAgcGFyYW0uaW1nID0gaW1nO1xuICAgICAgICAgICAgICAgIHByb21pc2UudGhlbigoKSA9PiBkZWZlcnJlZC5yZXNvbHZlKHBhcmFtKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocGFyYW0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKGxvYWRlZClcbiAgICAgICAgICAgIC50aGVuKHBhcmFtcyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXIuY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcblxuICAgICAgICAgICAgICAgIHBhcmFtcy5mb3JFYWNoKHBhcmFtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJncyA9IFtwYXJhbS5pbWcsIHBhcmFtLngsIHBhcmFtLnldO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbS53aWR0aCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocGFyYW0ud2lkdGgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbS5oZWlnaHQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHBhcmFtLmhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW0uc3ggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHBhcmFtLnN4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW0uc3ggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHBhcmFtLnN4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW0uc3cgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHBhcmFtLnN3KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW0uc2ggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHBhcmFtLnNoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyLmRyYXdJbWFnZSguLi5hcmdzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pOyBcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDYW52YXNSZW5kZXIge1xuICAgIGNvbnN0cnVjdG9yKGNhbnZhcywgd2lkdGgsIGhlaWdodCkge1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLl92aXNpYmxlID0gbmV3IENhbnZhc0ltYWdlKGNhbnZhcywgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHRoaXMuX29mZnNjcmVlbiA9IG5ldyBDYW52YXNJbWFnZSh3aWR0aCwgaGVpZ2h0KTsgXG4gICAgfVxuXG4gICAgZ2V0IGNhbnZhcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Zpc2libGUuY2FudmFzO1xuICAgIH1cblxuICAgIGdldCByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aXNpYmxlLnJlbmRlcjtcbiAgICB9XG5cbiAgICBnZXQgaW1hZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aXNpYmxlLmltYWdlO1xuICAgIH1cblxuICAgIGdldCBvZmZzY3JlZW5DYW52YXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vZmZzY3JlZW4uY2FudmFzO1xuICAgIH1cblxuICAgIGdldCBvZmZzY3JlZW5SZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vZmZzY3JlZW4ucmVuZGVyO1xuICAgIH1cblxuICAgIGdldCBvZmZzY3JlZW5JbWFnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29mZnNjcmVlbi5pbWFnZTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NhbnZhcy5qcyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2lzSXRlcmFibGUyID0gcmVxdWlyZShcIi4uL2NvcmUtanMvaXMtaXRlcmFibGVcIik7XG5cbnZhciBfaXNJdGVyYWJsZTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0l0ZXJhYmxlMik7XG5cbnZhciBfZ2V0SXRlcmF0b3IyID0gcmVxdWlyZShcIi4uL2NvcmUtanMvZ2V0LWl0ZXJhdG9yXCIpO1xuXG52YXIgX2dldEl0ZXJhdG9yMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldEl0ZXJhdG9yMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHtcbiAgICB2YXIgX2FyciA9IFtdO1xuICAgIHZhciBfbiA9IHRydWU7XG4gICAgdmFyIF9kID0gZmFsc2U7XG4gICAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAodmFyIF9pID0gKDAsIF9nZXRJdGVyYXRvcjMuZGVmYXVsdCkoYXJyKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBfZCA9IHRydWU7XG4gICAgICBfZSA9IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIF9hcnI7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICAgIHJldHVybiBhcnI7XG4gICAgfSBlbHNlIGlmICgoMCwgX2lzSXRlcmFibGUzLmRlZmF1bHQpKE9iamVjdChhcnIpKSkge1xuICAgICAgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG4gICAgfVxuICB9O1xufSgpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSAxMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vaXMtaXRlcmFibGVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvaXMtaXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDEyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29yZS5pcy1pdGVyYWJsZScpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgY2xhc3NvZiAgID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpXG4gICwgSVRFUkFUT1IgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmlzSXRlcmFibGUgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBPID0gT2JqZWN0KGl0KTtcbiAgcmV0dXJuIE9bSVRFUkFUT1JdICE9PSB1bmRlZmluZWRcbiAgICB8fCAnQEBpdGVyYXRvcicgaW4gT1xuICAgIHx8IEl0ZXJhdG9ycy5oYXNPd25Qcm9wZXJ0eShjbGFzc29mKE8pKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmlzLWl0ZXJhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMTI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwicmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvcicpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMTMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBnZXQgICAgICA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvciA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIGl0ZXJGbiA9IGdldChpdCk7XG4gIGlmKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgcmV0dXJuIGFuT2JqZWN0KGl0ZXJGbi5jYWxsKGl0KSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDEzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICAnMTEzJzoge1xuICAgICAgICBkaXN0YW5jZTogJzQxNTDkuIflhazph4wnXG4gICAgfSxcbiAgICAnMTIxJzoge1xuICAgICAgICBkaXN0YW5jZTogJzDlhazph4wnLFxuICAgICAgICBzcGVjaWFsOiB0cnVlXG4gICAgfSxcbiAgICAnMTIzJzoge1xuICAgICAgICBkaXN0YW5jZTogJzM4LjQ05LiH5YWs6YeMJyxcbiAgICAgICAgc3BlY2lhbDogdHJ1ZVxuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2xpY2VDb25maWcuanMiLCJpbXBvcnQgJy4vb3BlbmluZy5jc3MnO1xuaW1wb3J0IHtcbiAgICB3aW4sXG4gICAgZG9jLFxuICAgIFByb21pc2UsXG4gICAgZGVmZXIsXG4gICAgcXVlcnksXG4gICAgcXVlcnlBbGwsXG4gICAgZ2V0UmVjdCxcbiAgICByYWYsXG4gICAgZGVsYXlcbn0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3BlbmluZyB7XG4gICAgY29uc3RydWN0b3Iodmlld3BvcnQsIGl0ZW1zKSB7XG4gICAgICAgIHRoaXMudmlld3BvcnQgPSB2aWV3cG9ydDtcbiAgICAgICAgdGhpcy53cmFwRWwgPSBxdWVyeSh2aWV3cG9ydCwgJyNvcGVuaW5nJyk7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBpdGVtcztcbiAgICB9XG5cbiAgICBzdGFyKCkge1xuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IHRoaXMuZHVyYXRpb247XG4gICAgICAgIGNvbnN0IGNvdW50ID0gdGhpcy5zdGFyc0NvdW50O1xuICAgICAgICBjb25zdCBsaW1pdCA9IDM7XG4gICAgICAgIGNvbnN0IGVscyA9IFtdO1xuICAgICAgICBjb25zdCByYXRpbyA9IDAuMTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbWl0OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGVsID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZWwuY2xhc3NOYW1lID0gJ3N0YXInO1xuICAgICAgICAgICAgZWwuaWRsZSA9IHRydWU7XG4gICAgICAgICAgICBlbHMucHVzaChlbCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByYW5kb21TdGFyID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbiA9IHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiBjb3VudCkgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXNbYG9wZW5pbmdTdGFyJHtufWBdLnNyYztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGdldElkbGVFbCA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBlbHMuZmlsdGVyKGVsID0+IGVsLmlkbGUpWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmFuZG9tU3RhcnQgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB4ID0gdGhpcy5ib25lWCArIChNYXRoLnJhbmRvbSgpICogMTAgLSA1KTtcbiAgICAgICAgICAgIGNvbnN0IHkgPSB0aGlzLmJvbmVZICsgKE1hdGgucmFuZG9tKCkgKiAxMCAtIDUpO1xuICAgICAgICAgICAgY29uc3Qgc2NhbGUgPSBNYXRoLnJhbmRvbSgpICogMC4xO1xuICAgICAgICAgICAgY29uc3Qgcm90YXRlID0gTWF0aC5yYW5kb20oKSAqIDE2IC0gODtcbiAgICAgICAgICAgIHJldHVybiBbeCwgeSwgc2NhbGUsIHJvdGF0ZV07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByYW5kb21FbmQgPSAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgbiA9IHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiA0KTtcbiAgICAgICAgICAgIGxldCB4O1xuICAgICAgICAgICAgbGV0IHk7XG5cbiAgICAgICAgICAgIGlmIChuID09PSAwKSB7XG4gICAgICAgICAgICAgICAgeCA9IC1NYXRoLnJhbmRvbSgpICogMTI1IC0gMTI1O1xuICAgICAgICAgICAgICAgIHkgPSBNYXRoLnJhbmRvbSgpICogdGhpcy5oZWlnaHQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG4gPT09IDEpIHtcbiAgICAgICAgICAgICAgICB4ID0gTWF0aC5yYW5kb20oKSAqIHRoaXMud2lkdGg7XG4gICAgICAgICAgICAgICAgeSA9IC1NYXRoLnJhbmRvbSgpICogMTI1IC0gMTI1O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuID09PSAyKSB7XG4gICAgICAgICAgICAgICAgeCA9IHRoaXMud2lkdGggKyBNYXRoLnJhbmRvbSgpICogMTI1ICsgMTI1O1xuICAgICAgICAgICAgICAgIHkgPSB0aGlzLmhlaWdodCAqIE1hdGgucmFuZG9tKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG4gPT09IDMpIHtcbiAgICAgICAgICAgICAgICB4ID0gdGhpcy53aWR0aCAqIE1hdGgucmFuZG9tKCk7XG4gICAgICAgICAgICAgICAgeSA9IHRoaXMuaGVpZ2h0ICsgTWF0aC5yYW5kb20oKSAqIDEyNSArIDEyNTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgc2NhbGUgPSBNYXRoLnJhbmRvbSgpICogMC4yICsgMC44O1xuICAgICAgICAgICAgY29uc3Qgcm90YXRlID0gTWF0aC5yYW5kb20oKSAqIDE2IC0gODtcblxuICAgICAgICAgICAgcmV0dXJuIFt4LCB5LCBzY2FsZSwgcm90YXRlXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgZWxhcHNlZCxcbiAgICAgICAgICAgIGRlbHRhXG4gICAgICAgIH0pID0+IHtcbiAgICAgICAgICAgIGlmIChlbGFwc2VkID4gZHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBFbC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGVsO1xuICAgICAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPCByYXRpb1xuICAgICAgICAgICAgICAgICAgICAmJiAoZWwgPSBnZXRJZGxlRWwoKSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFyU3JjID0gcmFuZG9tU3RhcigpO1xuICAgICAgICAgICAgICAgIGNvbnN0IFtzdGFydFgsIHN0YXJ0WSwgc3RhcnRTY2FsZSwgc3RhcnRSb3RhdGVdID0gcmFuZG9tU3RhcnQoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBbZW5kWCwgZW5kWSwgZW5kU2NhbGUsIGVuZFJvdGF0ZV0gPSByYW5kb21FbmQoKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb25zdCBlbmQgPSBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2Via2l0VHJhbnNpdGlvbkVuZCcsIGVuZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud3JhcEVsLnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgICAgICAgICAgICAgICAgZWwuc3R5bGUuY3NzVGV4dCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICBlbC5pZGxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBlbC5pZGxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZWwuc3R5bGUud2Via2l0VHJhbnNpdGlvbiA9ICctd2Via2l0LXRyYW5zZm9ybSAwLjRzIGVhc2Utb3V0IDBzJztcbiAgICAgICAgICAgICAgICBlbC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHtzdGFydFh9cHgsICR7c3RhcnRZfXB4LCAwcHgpIHNjYWxlKCR7c3RhcnRTY2FsZX0pICByb3RhdGUoJHtzdGFydFJvdGF0ZX1kZWcpYDtcbiAgICAgICAgICAgICAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7c3RhclNyY30pYDtcbiAgICAgICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRUcmFuc2l0aW9uRW5kJywgZW5kKTtcblxuICAgICAgICAgICAgICAgIHRoaXMud3JhcEVsLmFwcGVuZENoaWxkKGVsKTtcblxuICAgICAgICAgICAgICAgIHJhZigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVsLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke2VuZFh9cHgsICR7ZW5kWX1weCwgMHB4KSBzY2FsZSgke2VuZFNjYWxlfSkgcm90YXRlKCR7ZW5kUm90YXRlfWRlZylgO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hpY2tlbigpIHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSB0aGlzLml0ZW1zO1xuICAgICAgICBjb25zdCBlbCA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZWwuY2xhc3NOYW1lID0gJ2NoaWNrZW4nO1xuICAgICAgICBlbC5zdHlsZS53ZWJraXRUcmFuc2l0aW9uID0gJy13ZWJraXQtdHJhbnNmb3JtIDAuNHMgZWFzZS1vdXQgMHMnO1xuICAgICAgICBlbC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHt0aGlzLmJvbmVYfXB4LCAke3RoaXMuYm9uZVl9cHgsIDBweCkgc2NhbGUoMClgO1xuICAgICAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7aXRlbXNbJ29wZW5pbmdDaGlja2VuJ10uc3JjfSlgO1xuXG4gICAgICAgIHRoaXMud3JhcEVsLmlubmVySFRNTCA9ICcnO1xuICAgICAgICB0aGlzLndyYXBFbC5hcHBlbmRDaGlsZChlbCk7XG5cbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICBoZWlnaHRcbiAgICAgICAgfSA9IHRoaXM7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVuZCA9IGUgPT4ge1xuICAgICAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBlbmQpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0VHJhbnNpdGlvbkVuZCcsIGVuZCk7XG5cbiAgICAgICAgICAgIHJhZigoKSA9PiB7XG4gICAgICAgICAgICAgICAgZWwuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKCR7d2lkdGggLyAyIC0gMzAwIC8gMn1weCwgJHtoZWlnaHQgLyAyIC0gMjQwIC8gMn1weCwgMHB4KSBzY2FsZSgxKWA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcGxheSgpIHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSB0aGlzLml0ZW1zO1xuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IHRoaXMuZHVyYXRpb247XG4gICAgICAgIGNvbnN0IGNvdW50ID0gdGhpcy5mcmFtZXNDb3VudDtcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcblxuICAgICAgICByZXR1cm4gKHtcbiAgICAgICAgICAgIGVsYXBzZWQsXG4gICAgICAgICAgICBkZWx0YVxuICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgICBpZiAoZWxhcHNlZCA8PSBkdXJhdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcEVsLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtpdGVtc1snb3BlbmluZycgKyAoaW5kZXggKyAxKV0uc3JjfSlgO1xuICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICAgICAgaW5kZXggJT0gY291bnQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGVuZGluZygpIHtcbiAgICAgICAgdGhpcy53cmFwRWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG5cbiAgICByZWFkeSgpIHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSB0aGlzLml0ZW1zO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmR1cmF0aW9uID0gMzAwMDtcblxuICAgICAgICAgICAgdGhpcy5mcmFtZXNDb3VudCA9IE9iamVjdC5rZXlzKHRoaXMuaXRlbXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoa2V5ID0+IGtleS5tYXRjaCgvXm9wZW5pbmdcXGQrJC8pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubGVuZ3RoO1xuXG4gICAgICAgICAgICB0aGlzLnN0YXJzQ291bnQgPSBPYmplY3Qua2V5cyh0aGlzLml0ZW1zKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKGtleSA9PiBrZXkubWF0Y2goL15vcGVuaW5nU3RhclxcZCskLykpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5sZW5ndGg7XG5cbiAgICAgICAgICAgIHRoaXMud3JhcEVsLnN0eWxlLmRpc3BsYXkgPSAnJztcblxuICAgICAgICAgICAgY29uc3Qge3dpZHRoLCBoZWlnaHR9ID0gZ2V0UmVjdCh0aGlzLndyYXBFbCk7XG4gICAgICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgICAgIHRoaXMuYm9uZVggPSB0aGlzLndpZHRoIC8gMjtcbiAgICAgICAgICAgIHRoaXMuYm9uZVkgPSB0aGlzLndpZHRoIC8gMjtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9vcGVuaW5nLmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmtleXM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXMuanNcbi8vIG1vZHVsZSBpZCA9IDEzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIDE5LjEuMi4xNCBPYmplY3Qua2V5cyhPKVxudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCAka2V5cyAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgna2V5cycsIGZ1bmN0aW9uKCl7XG4gIHJldHVybiBmdW5jdGlvbiBrZXlzKGl0KXtcbiAgICByZXR1cm4gJGtleXModG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vb3BlbmluZy5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjEzLjFAc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL29wZW5pbmcuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvaW5kZXguanMhLi9vcGVuaW5nLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvb3BlbmluZy5jc3Ncbi8vIG1vZHVsZSBpZCA9IDEzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiI29wZW5pbmcge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIGNlbnRlcjtcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAtd2Via2l0LXRyYW5mb3JtOiB0cmFuc2xhdGVaKDk5OTlweCk7XFxufVxcblxcbiNvcGVuaW5nIC5zdGFyIHtcXG4gICAgbGVmdDogMDtcXG4gICAgdG9wOiAwO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiA2LjY2N3JlbTtcXG4gICAgaGVpZ2h0OiA2LjY2N3JlbTtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxuICAgIHdpbGwtY2hhbmdlOiAtd2Via2l0LXRyYW5zZm9ybTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiAwIDAgMDtcXG59XFxuXFxuI29wZW5pbmcgLmNoaWNrZW4ge1xcbiAgICBsZWZ0OiAwO1xcbiAgICB0b3A6IDA7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDcuOTZyZW07XFxuICAgIGhlaWdodDogNi4zMnJlbTtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogbGVmdCAwO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDE2LjEzM3JlbSA2LjMycmVtO1xcbiAgICB3aWxsLWNoYW5nZTogLXdlYmtpdC10cmFuc2Zvcm07XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogMCAwIDA7XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBmbHkgMC4ycyBsaW5lYXIgMHMgaW5maW5pdGU7XFxufVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBmbHkge1xcbiAgICAwJSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBsZWZ0IDA7XFxuICAgIH1cXG5cXG4gICAgNDkuOTk5JSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBsZWZ0IDA7XFxuICAgIH1cXG4gICAgNTAlIHtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IHJpZ2h0IDA7XFxuICAgIH1cXG5cXG4gICAgMTAwJSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiByaWdodCAwO1xcbiAgICB9XFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4yNS4wQGNzcy1sb2FkZXIhLi9zcmMvb3BlbmluZy5jc3Ncbi8vIG1vZHVsZSBpZCA9IDEzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgJy4vaGVsbG93b3JsZC5jc3MnO1xuaW1wb3J0IHtcbiAgICB3aW4sXG4gICAgZG9jLFxuICAgIFByb21pc2UsXG4gICAgZGVmZXIsXG4gICAgcXVlcnksXG4gICAgcXVlcnlBbGwsXG4gICAgZ2V0UmVjdFxufSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWxsb1dvcmxkIHtcbiAgICBjb25zdHJ1Y3Rvcih2aWV3cG9ydCwgaXRlbXMpIHtcbiAgICAgICAgdGhpcy53cmFwRWwgPSBxdWVyeSh2aWV3cG9ydCwgJyNoZWxsb3dvcmxkJyk7XG4gICAgICAgIHRoaXMud3JhcEVsLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtpdGVtc1snaGVsbG93b3JsZCddLnNyY30pYDtcbiAgICB9XG5cbiAgICBwbGF5KCkge1xuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IDMwMDA7XG4gICAgICAgIGNvbnN0IHRpbWVzID0gNTtcbiAgICAgICAgY29uc3QgY291bnQgPSA2O1xuXG4gICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgZWxhcHNlZCxcbiAgICAgICAgICAgIGRlbHRhXG4gICAgICAgIH0pID0+IHtcbiAgICAgICAgICAgIGlmIChlbGFwc2VkIDw9IGR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBwYXJzZUludChjb3VudCAqIHRpbWVzICogZWxhcHNlZCAvIGR1cmF0aW9uKSAlIGNvdW50O1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcEVsLnN0eWxlLmJhY2tncm91bmRQb3NpdGlvblggPSBgLSR7aW5kZXggKiAxMH1yZW1gO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBFbC5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb25YID0gJzAnO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGVuZGluZygpIHtcbiAgICAgICAgdGhpcy53cmFwRWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG5cbiAgICByZWFkeSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMud3JhcEVsLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9oZWxsb1dvcmxkLmpzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL2hlbGxvd29ybGQuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLy4uL25vZGVfbW9kdWxlcy8uMC4xMy4xQHN0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvaW5kZXguanMhLi9oZWxsb3dvcmxkLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vaGVsbG93b3JsZC5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2hlbGxvd29ybGQuY3NzXG4vLyBtb2R1bGUgaWQgPSAxNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIiNoZWxsb3dvcmxkIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCBjZW50ZXI7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogNjByZW0gMTcuNzg2cmVtO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIC13ZWJraXQtdHJhbmZvcm06IHRyYW5zbGF0ZVooOTk5OXB4KTtcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjI1LjBAY3NzLWxvYWRlciEuL3NyYy9oZWxsb3dvcmxkLmNzc1xuLy8gbW9kdWxlIGlkID0gMTQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7XG4gICAgd2luLFxuICAgIGRvYyxcbiAgICBQcm9taXNlLFxuICAgIGRlZmVyLFxuICAgIGltZzJDYW52YXMsXG4gICAgcXVlcnksXG4gICAgcXVlcnlBbGwsXG4gICAgZ2V0UmVjdCxcbiAgICBnZXREaXN0YW5jZVxufSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHtcbiAgICBDYW52YXNJbWFnZVxufSBmcm9tICcuL2NhbnZhcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsb3VkIGV4dGVuZHMgQ2FudmFzSW1hZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHN0YWdlLCBpdGVtcykge1xuICAgICAgICBzdXBlcihzdGFnZS52dywgc3RhZ2UudmgpO1xuXG4gICAgICAgIHRoaXMuaFNsaWNlID0gc3RhZ2UuaFNsaWNlO1xuICAgICAgICB0aGlzLnZTbGljZSA9IHN0YWdlLnZTbGljZTtcbiAgICAgICAgdGhpcy5zbGljZVdpZHRoID0gc3RhZ2Uud2lkdGggLyBzdGFnZS5oU2xpY2U7XG4gICAgICAgIHRoaXMuc2xpY2VIZWlnaHQgPSBzdGFnZS5oZWlnaHQgLyBzdGFnZS52U2xpY2U7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBpdGVtcztcbiAgICB9XG5cbiAgICBkcmF3SW1hZ2VzKHNsaWNlcywgc2Nyb2xsWCwgc2Nyb2xsWSkge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBzbGljZSBvZiBzbGljZXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNsaWNlc1tTdHJpbmcoc2xpY2UuaW5kZXgpXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICAgICAgeCxcbiAgICAgICAgICAgICAgICAgICAgeSxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzXG4gICAgICAgICAgICAgICAgfSA9IHRoaXMuc2xpY2VzW1N0cmluZyhzbGljZS5pbmRleCldO1xuXG4gICAgICAgICAgICAgICAgcGFyYW1zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB4OiB4IC0gd2lkdGggKiAwLjQgLSBzY3JvbGxYLFxuICAgICAgICAgICAgICAgICAgICB5OiB5IC0gaGVpZ2h0ICogMC40IC0gc2Nyb2xsWSxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoICogMS44LFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGhlaWdodCAqIDEuOCxcbiAgICAgICAgICAgICAgICAgICAgaW1nOiBjYW52YXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRoaXMucmVuZGVyLnNhdmUoKTtcbiAgICAgICAgLy8gdGhpcy5yZW5kZXIuc2NhbGUoMywgMyk7XG4gICAgICAgIHRoaXMuZHJhdyhwYXJhbXMpO1xuICAgICAgICAvLyB0aGlzLnJlbmRlci5yZXN0b3JlKCk7XG4gICAgfVxuXG4gICAgY2xlYXIoZm9jdXNTaWxjZSkge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBjbGVhcmVkLFxuICAgICAgICAgICAgaW5kZXhcbiAgICAgICAgfSA9IGZvY3VzU2lsY2U7XG5cbiAgICAgICAgY29uc3Qgc2xpY2UgPSB0aGlzLnNsaWNlc1tTdHJpbmcoaW5kZXgpXTtcblxuICAgICAgICBpZiAoc2xpY2UpIHtcblxuICAgICAgICAgICAgbGV0IHtcbiAgICAgICAgICAgICAgICBpbWcsXG4gICAgICAgICAgICAgICAgcmVuZGVyXG4gICAgICAgICAgICB9ID0gc2xpY2U7XG5cbiAgICAgICAgICAgIGlmICghY2xlYXJlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGR1cmF0aW9uID0gMTUwMDtcblxuICAgICAgICAgICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgICAgICAgICBkZWx0YSxcbiAgICAgICAgICAgICAgICAgICAgZWxhcHNlZFxuICAgICAgICAgICAgICAgIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsYXBzZWQgPD0gZHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlci5nbG9iYWxBbHBoYSAtPSBkZWx0YSAvIGR1cmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyLmdsb2JhbEFscGhhID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzU2lsY2UuY2xlYXJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyLmNsZWFyUmVjdCgwLCAwLCB0aGlzLnNsaWNlV2lkdGgsIHRoaXMuc2xpY2VIZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICByZW5kZXIuZHJhd0ltYWdlKGltZywgMCwgMCwgdGhpcy5zbGljZVdpZHRoLCB0aGlzLnNsaWNlSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvY3VzU2lsY2UuY2xlYXJlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWFkeSgpIHtcbiAgICAgICAgdGhpcy5zbGljZXMgPSB7fTtcblxuICAgICAgICBjb25zdCBpbWcgPSB0aGlzLml0ZW1zWydjbG91ZCddLm9iajtcblxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSB0aGlzLmhTbGljZSAqIHRoaXMudlNsaWNlOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHggPSAoaSAtIDEpICUgdGhpcy5oU2xpY2U7XG4gICAgICAgICAgICBjb25zdCB5ID0gcGFyc2VJbnQoKGkgLSAxKSAvIHRoaXMuaFNsaWNlKTtcbiAgICAgICAgICAgIGNvbnN0IFtjYW52YXMsIHJlbmRlcl0gPSBpbWcyQ2FudmFzKGltZywgdGhpcy5zbGljZVdpZHRoLCB0aGlzLnNsaWNlSGVpZ2h0KTtcblxuICAgICAgICAgICAgdGhpcy5zbGljZXNbU3RyaW5nKGkgLSAxKV0gPSB7XG4gICAgICAgICAgICAgICAgaW1nLFxuICAgICAgICAgICAgICAgIGNhbnZhcyxcbiAgICAgICAgICAgICAgICByZW5kZXIsXG4gICAgICAgICAgICAgICAgeDogeCAqIHRoaXMuc2xpY2VXaWR0aCxcbiAgICAgICAgICAgICAgICB5OiB5ICogdGhpcy5zbGljZUhlaWdodCxcbiAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy5zbGljZVdpZHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodDogdGhpcy5zbGljZUhlaWdodFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2xvdWQuanMiLCJpbXBvcnQge1xuICAgIHdpbixcbiAgICBkb2MsXG4gICAgUHJvbWlzZSxcbiAgICBkZWZlcixcbiAgICBxdWVyeSxcbiAgICBxdWVyeUFsbCxcbiAgICBnZXRSZWN0XG59IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQge1xuICAgIENhbnZhc0ltYWdlXG59IGZyb20gJy4vY2FudmFzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhciBleHRlbmRzIENhbnZhc0ltYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihzdGFnZSwgaXRlbXMpIHtcbiAgICAgICAgc3VwZXIoc3RhZ2UudncsIHN0YWdlLnZoICogMik7XG4gICAgICAgIFxuICAgICAgICB0aGlzLndpZHRoID0gc3RhZ2Uudnc7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gc3RhZ2UudmggKiAyO1xuICAgICAgICB0aGlzLnZ3ID0gc3RhZ2Uudnc7XG4gICAgICAgIHRoaXMudmggPSBzdGFnZS52aDtcbiAgICAgICAgdGhpcy5pdGVtcyA9IGl0ZW1zO1xuICAgIH1cblxuICAgIHJlYWR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kcmF3KFt7XG4gICAgICAgICAgICBpbWc6IHRoaXMuaXRlbXNbJ3N0YXInXS5vYmosXG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnZoXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGltZzogdGhpcy5pdGVtc1snc3RhciddLm9iaixcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiB0aGlzLnZoLFxuICAgICAgICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMudmhcbiAgICAgICAgfV0pO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc3Rhci5qcyIsImltcG9ydCAnLi9lbGVtZW50cy5jc3MnO1xuaW1wb3J0IHtcbiAgICB3aW4sXG4gICAgZG9jLFxuICAgIFByb21pc2UsXG4gICAgZGVmZXIsXG4gICAgZGVsYXksXG4gICAgcXVlcnksXG4gICAgcXVlcnlBbGwsXG4gICAgZ2V0UmVjdCxcbiAgICBnZXREaXN0YW5jZSxcbiAgICByYWYsXG4gICAgY2FmXG59IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgRXZlbnQgZnJvbSAnLi9ldmVudCc7XG5pbXBvcnQge1xuICAgIENhbnZhc0ltYWdlXG59IGZyb20gJy4vY2FudmFzJztcblxuZXhwb3J0IGNsYXNzIFN0YXRpY0VsZW1lbnRzIGV4dGVuZHMgQ2FudmFzSW1hZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHN0YWdlLCBpdGVtcykge1xuICAgICAgICBzdXBlcihzdGFnZS52dywgc3RhZ2UudmgpO1xuXG4gICAgICAgIHRoaXMuaFNsaWNlID0gc3RhZ2UuaFNsaWNlO1xuICAgICAgICB0aGlzLnZTbGljZSA9IHN0YWdlLnZTbGljZTtcbiAgICAgICAgdGhpcy5zbGljZVdpZHRoID0gc3RhZ2Uud2lkdGggLyBzdGFnZS5oU2xpY2U7XG4gICAgICAgIHRoaXMuc2xpY2VIZWlnaHQgPSBzdGFnZS5oZWlnaHQgLyBzdGFnZS52U2xpY2U7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBpdGVtcztcbiAgICB9XG5cbiAgICBkcmF3SW1hZ2VzKHNjcm9sbFgsIHNjcm9sbFkpIHtcbiAgICAgICAgbGV0IHggPSBwYXJzZUludChzY3JvbGxYIC8gdGhpcy5zbGljZVdpZHRoKTtcbiAgICAgICAgbGV0IHkgPSBwYXJzZUludChzY3JvbGxZIC8gdGhpcy5zbGljZUhlaWdodCk7XG4gICAgICAgIGxldCBpbmRleCA9IHkgKiB0aGlzLmhTbGljZSArIHg7XG5cbiAgICAgICAgY29uc3QgcGFyYW1zID0gW107XG5cbiAgICAgICAgY29uc3QgcHVzaFBhcmFtcyA9IChpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2xpY2UgPSB0aGlzLnNsaWNlc1tTdHJpbmcoaW5kZXgpXTtcbiAgICAgICAgICAgIHBhcmFtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICB4OiBzbGljZS54IC0gc2Nyb2xsWCxcbiAgICAgICAgICAgICAgICB5OiBzbGljZS55IC0gc2Nyb2xsWSxcbiAgICAgICAgICAgICAgICB3aWR0aDogc2xpY2Uud2lkdGgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBzbGljZS5oZWlnaHQsXG4gICAgICAgICAgICAgICAgaW1nOiB0aGlzLnNsaWNlc1tpbmRleF0uaW1nXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNsaWNlc1tTdHJpbmcoaW5kZXgpXSkge1xuICAgICAgICAgICAgcHVzaFBhcmFtcyhpbmRleClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh4IDwgNCAmJiB0aGlzLnNsaWNlc1tTdHJpbmcoaW5kZXggKyAxKV0pIHtcbiAgICAgICAgICAgIHB1c2hQYXJhbXMoaW5kZXggKyAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh5IDwgOSAmJiB0aGlzLnNsaWNlc1tTdHJpbmcoaW5kZXggKyB0aGlzLmhTbGljZSldKSB7XG4gICAgICAgICAgICBwdXNoUGFyYW1zKGluZGV4ICsgdGhpcy5oU2xpY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHggPCA0ICYmIHkgPCA5ICYmIHRoaXMuc2xpY2VzW1N0cmluZyhpbmRleCArIHRoaXMuaFNsaWNlICsgMSldKSB7XG4gICAgICAgICAgICBwdXNoUGFyYW1zKGluZGV4ICsgdGhpcy5oU2xpY2UgKyAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZHJhdyhwYXJhbXMpO1xuICAgIH1cblxuICAgIHJlYWR5KCkge1xuICAgICAgICBjb25zdCBsb2FkZWQgPSBbXTtcbiAgICAgICAgdGhpcy5zbGljZXMgPSB7fTtcblxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLml0ZW1zKS5maWx0ZXIoaWQgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGlkLmluZGV4T2YoJ3N0YXRpYy0nKSA9PT0gMDtcbiAgICAgICAgfSkuZm9yRWFjaChpZCA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5pdGVtc1tpZF07XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHBhcnNlSW50KGlkLm1hdGNoKC9ec3RhdGljLShcXGQrKSQvKVsxXSk7XG4gICAgICAgICAgICBjb25zdCBkZWZlcnJlZCA9IGRlZmVyKCk7XG4gICAgICAgICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgaW1hZ2Uub25sb2FkID0gKCkgPT4gZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gaXRlbS5zcmM7XG4gICAgICAgICAgICBsb2FkZWQucHVzaChkZWZlcnJlZC5wcm9taXNlKTtcblxuICAgICAgICAgICAgbGV0IHggPSAoaW5kZXggLSAxKSAlIHRoaXMuaFNsaWNlO1xuICAgICAgICAgICAgbGV0IHkgPSBwYXJzZUludCgoaW5kZXggLSAxKSAvIHRoaXMuaFNsaWNlKTtcblxuICAgICAgICAgICAgdGhpcy5zbGljZXNbU3RyaW5nKGluZGV4IC0gMSldID0ge1xuICAgICAgICAgICAgICAgIGltZzogaW1hZ2UsXG4gICAgICAgICAgICAgICAgeDogeCAqIHRoaXMuc2xpY2VXaWR0aCxcbiAgICAgICAgICAgICAgICB5OiB5ICogdGhpcy5zbGljZUhlaWdodCxcbiAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy5zbGljZVdpZHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodDogdGhpcy5zbGljZUhlaWdodFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwobG9hZGVkKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBbmltZUVsZW1lbnRzIGV4dGVuZHMgQ2FudmFzSW1hZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHN0YWdlLCBpdGVtcykge1xuICAgICAgICBzdXBlcihzdGFnZS52dywgc3RhZ2UudmgpO1xuXG4gICAgICAgIHRoaXMuaFNsaWNlID0gc3RhZ2UuaFNsaWNlO1xuICAgICAgICB0aGlzLnZTbGljZSA9IHN0YWdlLnZTbGljZTtcbiAgICAgICAgdGhpcy5zbGljZVdpZHRoID0gc3RhZ2Uud2lkdGggLyBzdGFnZS5oU2xpY2U7XG4gICAgICAgIHRoaXMuc2xpY2VIZWlnaHQgPSBzdGFnZS5oZWlnaHQgLyBzdGFnZS52U2xpY2U7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBpdGVtcztcbiAgICB9XG5cbiAgICBnZXQgYW1vdW50KCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5zbGljZXMpLmxlbmd0aDtcbiAgICB9XG5cbiAgICBnZXQgZm91bmQoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLnNsaWNlcykuZmlsdGVyKGkgPT4gdGhpcy5zbGljZXNbaV0uY29tcGxldGVkKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgZHJhd0ltYWdlcyhzY3JvbGxYLCBzY3JvbGxZKSB7XG4gICAgICAgIGxldCB4ID0gcGFyc2VJbnQoc2Nyb2xsWCAvIHRoaXMuc2xpY2VXaWR0aCk7XG4gICAgICAgIGxldCB5ID0gcGFyc2VJbnQoc2Nyb2xsWSAvIHRoaXMuc2xpY2VIZWlnaHQpO1xuICAgICAgICBsZXQgaW5kZXggPSB5ICogdGhpcy5oU2xpY2UgKyB4O1xuXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IFtdO1xuICAgICAgICBjb25zdCBwdXNoUGFyYW1zID0gKGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzbGljZSA9IHRoaXMuc2xpY2VzW1N0cmluZyhpbmRleCldO1xuICAgICAgICAgICAgaWYgKHNsaWNlLmZyYW1lIDwgc2xpY2UuaW1ncy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBwYXJhbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHg6IHNsaWNlLnggLSBzY3JvbGxYLFxuICAgICAgICAgICAgICAgICAgICB5OiBzbGljZS55IC0gc2Nyb2xsWSxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHNsaWNlLndpZHRoLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHNsaWNlLmhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgaW1nOiBzbGljZS5pbWdzW3NsaWNlLmZyYW1lXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2xpY2VzW1N0cmluZyhpbmRleCldKSB7XG4gICAgICAgICAgICBwdXNoUGFyYW1zKGluZGV4KVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHggPCA0ICYmIHRoaXMuc2xpY2VzW1N0cmluZyhpbmRleCArIDEpXSkge1xuICAgICAgICAgICAgcHVzaFBhcmFtcyhpbmRleCArIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHkgPCA5ICYmIHRoaXMuc2xpY2VzW1N0cmluZyhpbmRleCArIHRoaXMuaFNsaWNlKV0pIHtcbiAgICAgICAgICAgIHB1c2hQYXJhbXMoaW5kZXggKyB0aGlzLmhTbGljZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoeCA8IDQgJiYgeSA8IDkgJiYgdGhpcy5zbGljZXNbU3RyaW5nKGluZGV4ICsgdGhpcy5oU2xpY2UgKyAxKV0pIHtcbiAgICAgICAgICAgIHB1c2hQYXJhbXMoaW5kZXggKyB0aGlzLmhTbGljZSArIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kcmF3KHBhcmFtcyk7XG4gICAgfVxuXG4gICAgcGxheShleCwgZXkpIHtcbiAgICAgICAgY29uc3QgeCA9IHBhcnNlSW50KGV4IC8gdGhpcy5zbGljZVdpZHRoKTtcbiAgICAgICAgY29uc3QgeSA9IHBhcnNlSW50KGV5IC8gdGhpcy5zbGljZUhlaWdodCk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0geSAqIHRoaXMuaFNsaWNlICsgeDtcbiAgICAgICAgY29uc3Qgc2xpY2UgPSB0aGlzLnNsaWNlc1tTdHJpbmcoaW5kZXgpXTtcblxuICAgICAgICBpZiAoc2xpY2UgJiYgc2xpY2UuZnJhbWUgPCBzbGljZS5pbWdzLmxlbmd0aCAmJiAhc2xpY2UuY29tcGxldGVkKSB7XG4gICAgICAgICAgICBjb25zdCBkdXJhdGlvbiA9IDEwMDA7XG5cbiAgICAgICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgICAgIGRlbHRhLFxuICAgICAgICAgICAgICAgIGVsYXBzZWRcbiAgICAgICAgICAgIH0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb3VudCA9IHNsaWNlLmltZ3MubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZyYW1lID0gTWF0aC5mbG9vcihjb3VudCAqIChlbGFwc2VkIC8gZHVyYXRpb24pKTtcblxuICAgICAgICAgICAgICAgIGlmIChmcmFtZSA8IGNvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWNlLmZyYW1lID0gZnJhbWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2xpY2UuY29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc2xpY2UuZnJhbWUgPSBjb3VudCAtIDE7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlYWR5KCkge1xuICAgICAgICBjb25zdCBsb2FkZWQgPSBbXTtcbiAgICAgICAgdGhpcy5zbGljZXMgPSB7fTtcblxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLml0ZW1zKS5maWx0ZXIoaWQgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGlkLmluZGV4T2YoJ2FuaW1lLScpID09PSAwO1xuICAgICAgICB9KS5mb3JFYWNoKGlkID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLml0ZW1zW2lkXTtcbiAgICAgICAgICAgIGNvbnN0IFtpbmRleCwgZnJhbWVdID0gaWQubWF0Y2goL15hbmltZS0oXFxkKyktKFxcZCspJC8pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoMSwgMykuZmlsdGVyKGkgPT4gcGFyc2VJbnQoaSkpO1xuXG4gICAgICAgICAgICBjb25zdCBkZWZlcnJlZCA9IGRlZmVyKCk7XG4gICAgICAgICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgaW1hZ2Uub25sb2FkID0gKCkgPT4gZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gaXRlbS5zcmM7XG4gICAgICAgICAgICBsb2FkZWQucHVzaChkZWZlcnJlZC5wcm9taXNlKTtcblxuICAgICAgICAgICAgbGV0IHggPSAoaW5kZXggLSAxKSAlIHRoaXMuaFNsaWNlO1xuICAgICAgICAgICAgbGV0IHkgPSBwYXJzZUludCgoaW5kZXggLSAxKSAvIHRoaXMuaFNsaWNlKTtcblxuICAgICAgICAgICAgbGV0IHNsaWNlID0gdGhpcy5zbGljZXNbU3RyaW5nKGluZGV4IC0gMSldO1xuICAgICAgICAgICAgaWYgKCFzbGljZSkge1xuICAgICAgICAgICAgICAgIHNsaWNlID0gdGhpcy5zbGljZXNbU3RyaW5nKGluZGV4IC0gMSldID0ge1xuICAgICAgICAgICAgICAgICAgICBpbWdzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgZnJhbWU6IDAsXG4gICAgICAgICAgICAgICAgICAgIHg6IHggKiB0aGlzLnNsaWNlV2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIHk6IHkgKiB0aGlzLnNsaWNlSGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy5zbGljZVdpZHRoLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMuc2xpY2VIZWlnaHRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzbGljZS5pbWdzW2ZyYW1lIC0gMV0gPSBpbWFnZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKGxvYWRlZCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRWxlbWVudENvdW50IGV4dGVuZHMgRXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKHZpZXdwb3J0LCBpdGVtcykge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuc3RlcCA9IDU7XG4gICAgICAgIHRoaXMud3JhcEVsID0gcXVlcnkodmlld3BvcnQsICcjZWxlbWVudHMtY291bnQnKTtcbiAgICAgICAgdGhpcy50ZXh0RWwgPSBxdWVyeSh0aGlzLndyYXBFbCwgJy50ZXh0Jyk7XG4gICAgICAgIHRoaXMudGV4dE51bWJlckVsID0gcXVlcnkodGhpcy50ZXh0RWwsICcubnVtYmVyJyk7XG4gICAgICAgIHRoaXMudGV4dFRpcEVsID0gcXVlcnkodGhpcy50ZXh0RWwsICcudGlwJyk7XG4gICAgICAgIHRoaXMudGV4dEJnRWwgPSBxdWVyeSh0aGlzLnRleHRFbCwgJy5iZycpO1xuICAgICAgICB0aGlzLmJhckVsID0gcXVlcnkodGhpcy53cmFwRWwsICcucHJvZ3Jlc3MgLmJhcicpO1xuICAgICAgICB0aGlzLmZvdW5kID0gMDtcbiAgICAgICAgdGhpcy5hbW91bnQgPSAwO1xuICAgICAgICB0aGlzLml0ZW1zID0gaXRlbXM7XG4gICAgfVxuXG4gICAgdXBkYXRlKGFtb3VudCwgZm91bmQpIHtcbiAgICAgICAgaWYgKGZvdW5kICE9PSB0aGlzLmZvdW5kIFxuICAgICAgICAgICAgfHwgYW1vdW50ICE9PSB0aGlzLmFtb3VudCkge1xuICAgICAgICAgICAgdGhpcy50ZXh0TnVtYmVyRWwudGV4dENvbnRlbnQgPSBgJHtmb3VuZH0vJHthbW91bnR9YDtcbiAgICAgICAgICAgIHRoaXMuYmFyRWwuc3R5bGUud2lkdGggPSBgJHtmb3VuZC9hbW91bnQqMTAwfSVgO1xuXG4gICAgICAgICAgICBpZiAoZm91bmQgIT09IDAgJiYgZm91bmQgJSB0aGlzLnN0ZXAgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2ZvdW5kJywge1xuICAgICAgICAgICAgICAgICAgICBmb3VuZDogZm91bmQsXG4gICAgICAgICAgICAgICAgICAgIGFtb3VudDogYW1vdW50LFxuICAgICAgICAgICAgICAgICAgICB0aW1lOiBwYXJzZUludChmb3VuZCAvIHRoaXMuc3RlcClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZm91bmQgPSBmb3VuZDtcbiAgICAgICAgICAgIHRoaXMuYW1vdW50ID0gYW1vdW50O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvdyh7XG4gICAgICAgIHRpcCxcbiAgICAgICAgYmdUeXBlXG4gICAgfSkge1xuICAgICAgICBjb25zdCBpdGVtcyA9IHRoaXMuaXRlbXM7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMudGV4dFRpcEVsLmlubmVySFRNTCA9IHRpcDtcbiAgICAgICAgICAgIHRoaXMudGV4dEJnRWwuY2xhc3NOYW1lID0gYGJnIGJnJHtiZ1R5cGV9YDtcbiAgICAgICAgICAgIHRoaXMudGV4dEJnRWwuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXG4gICAgICAgICAgICAgICAgYHVybCgke2l0ZW1zWyd0aXBCZycgKyBiZ1R5cGVdLnNyY30pYDtcbiAgICAgICAgICAgIHRoaXMud3JhcEVsLmNsYXNzTmFtZSA9ICdvcGVuJztcblxuICAgICAgICAgICAgZGVsYXkoNDAwKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0VGlwRWwuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHRCZ0VsLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlbGF5KDMwMDApO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHRUaXBFbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHRCZ0VsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud3JhcEVsLmNsYXNzTmFtZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVsYXkoNDAwKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlYWR5KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy53cmFwRWwuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgICAgcmVzb2x2ZSh0aGlzKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lbGVtZW50cy5qcyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvaW5kZXguanMhLi9lbGVtZW50cy5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjEzLjFAc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL2VsZW1lbnRzLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vZWxlbWVudHMuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9lbGVtZW50cy5jc3Ncbi8vIG1vZHVsZSBpZCA9IDE0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiI2VsZW1lbnRzLWNvdW50IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICByaWdodDogMC43M3JlbTtcXG4gICAgdG9wOiAwLjRyZW07XFxuICAgIGNvbG9yOiAjMDBkZGYxO1xcbiAgICBmb250LXNpemU6IDEycHg7XFxuICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgICAtd2Via2l0LWJveC1wYWNrOiBjZW50ZXI7XFxuICAgIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgY2VudGVyO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEuMTA2cmVtIDAuNDEzcmVtO1xcbn1cXG5cXG4jZWxlbWVudHMtY291bnQgLnRleHRXcmFwIHtcXG4gICAgd2lkdGg6IDEuMTA2cmVtO1xcbiAgICBoZWlnaHQ6IDAuNDEzcmVtO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUEwQUFBQWZDQVlBQUFBODlVZnNBQUFBR1hSRldIUlRiMlowZDJGeVpRQkJaRzlpWlNCSmJXRm5aVkpsWVdSNWNjbGxQQUFBQU5kSlJFRlVlTnFjbEQwTGdWRVlobytQOGxxTU1zck1ya3hrTkNuOExZTWZRVEVZU0JhVFVqSVpSY2xpVWFRTTVPTis2bzFGYnk1M1haMDZkWFcrbnZPRTNQclVkTTdGM1NjdHNYUUJDWCtacTRzb2xaS2lTQ1ZMUlNTbzVJa3FsU3g1a2FGU1NEVDg4V2ZKa3ZaWFJKTHp6K1pSS2VIZkpwSXNKWkdpVWtUVXFHVEppaHlWM25WSkphdkxNcFVzaGZBZld4eWFFQVBDVnN6SUtrL1J0cEZJYzdFaFYzNFZQZnE0STNFazBrR01hY0hhdG01RVdva0YrWVFQMGFFOVlpcDJSTHFJUG0xaEEzRW0wbDVNYUZ2dWludVE5QkpnQUZxTkloVVBoWk9FQUFBQUFFbEZUa1N1UW1DQyk7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IHJpZ2h0IGNlbnRlcjtcXG4gICAgYmFja2dyb3VuZC1zaXplOiAwLjE3M3JlbSAwLjQxM3JlbTtcXG4gICAgb3ZlcmZsb3c6IHZpc2libGU7XFxufVxcblxcbiNlbGVtZW50cy1jb3VudCAudGV4dCB7XFxuICAgIHdpZHRoOiAxLjNyZW07XFxuICAgIGhlaWdodDogMC41cmVtO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICMwMGRkZjE7XFxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgcmlnaHQ6IDAuMTdyZW07XFxuICAgIHRvcDogLTAuMThyZW07XFxuICAgIGJveC1zaGFkb3c6IDJweCAzcHggMHB4IHJnYmEoMCwgMjIxLCAyNDEsIDAuNSk7XFxuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDAuNHMgZWFzZS1pbiAwcztcXG4gICAgb3ZlcmZsb3c6IHZpc2libGU7XFxufVxcblxcbiNlbGVtZW50cy1jb3VudC5vcGVuIC50ZXh0IHtcXG4gICAgd2lkdGg6IDUuOHJlbTtcXG4gICAgaGVpZ2h0OiAyLjNyZW07XFxuICAgIGJveC1zaGFkb3c6IG5vbmU7XFxufVxcblxcbiNlbGVtZW50cy1jb3VudCAudGV4dCAubnVtYmVyIHtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMDtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIHdpZHRoOiAxLjNyZW07XFxuICAgIGhlaWdodDogMC41cmVtO1xcbiAgICBsaW5lLWhlaWdodDogMC41cmVtO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbiNlbGVtZW50cy1jb3VudCAudGV4dCAudGlwIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMy4zMDZyZW07XFxuICAgIGhlaWdodDogMS4yNHJlbTtcXG4gICAgbGluZS1oZWlnaHQ6IDEuMmVtO1xcbiAgICBsZWZ0OiAwLjJyZW07XFxuICAgIHRvcDogMC4zNnJlbTtcXG4gICAgZm9udC1zaXplOiAxMnB4O1xcbiAgICBjb2xvcjogIzAwZGRmMTtcXG59XFxuXFxuI2VsZW1lbnRzLWNvdW50IC50ZXh0IC5iZyB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGVmdDogMy41MDZyZW07XFxuICAgIHRvcDogMC4zNnJlbTtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxufVxcblxcbiNlbGVtZW50cy1jb3VudCAudGV4dCAuYmcuYmcxIHtcXG4gICAgd2lkdGg6IDIuMDY2cmVtO1xcbiAgICBoZWlnaHQ6IDEuOHJlbTtcXG59XFxuXFxuI2VsZW1lbnRzLWNvdW50IC50ZXh0IC5iZy5iZzIge1xcbiAgICB3aWR0aDogMi4yNTNyZW07XFxuICAgIGhlaWdodDogMS45NDZyZW07XFxufVxcblxcbiNlbGVtZW50cy1jb3VudCAudGV4dCAuYmcuYmczIHtcXG4gICAgd2lkdGg6IDIuMzQ2cmVtO1xcbiAgICBoZWlnaHQ6IDEuOTMzcmVtO1xcbn1cXG5cXG4jZWxlbWVudHMtY291bnQgLnByb2dyZXNzIHtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgd2lkdGg6IDEuOHJlbTtcXG4gICAgaGVpZ2h0OiAwLjNyZW07XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICMwMGRkZjE7XFxuICAgIGJvcmRlci1yYWRpdXM6IDAuMTVyZW07XFxuICAgIG1hcmdpbjogMCA0cHg7XFxufVxcblxcbiNlbGVtZW50cy1jb3VudCAucHJvZ3Jlc3MgLmJhcntcXG4gICAgd2lkdGg6IDA7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwZGRmMTtcXG4gICAgYm9yZGVyLXJhZGl1czogMC4xNXJlbTtcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjI1LjBAY3NzLWxvYWRlciEuL3NyYy9lbGVtZW50cy5jc3Ncbi8vIG1vZHVsZSBpZCA9IDE0NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgJy4vbWFwLmNzcyc7XG5pbXBvcnQge1xuICAgIHdpbixcbiAgICBkb2MsXG4gICAgUHJvbWlzZSxcbiAgICBxdWVyeSxcbiAgICBxdWVyeUFsbCxcbiAgICBnZXRSZWN0XG59IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgRXZlbnQgZnJvbSAnLi9ldmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcCBleHRlbmRzIEV2ZW50IHtcbiAgICBjb25zdHJ1Y3Rvcih2aWV3cG9ydCwgaFNsaWNlLCB2U2xpY2UpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLnZpZXdwb3J0ID0gcXVlcnkodmlld3BvcnQsICcjc3RhZ2UtbWFwJyk7XG4gICAgICAgIHRoaXMud3JhcEVsID0gcXVlcnkodGhpcy52aWV3cG9ydCwgJy53cmFwJyk7XG4gICAgICAgIHRoaXMuY2FudmFzRWwgPSBxdWVyeSh0aGlzLnZpZXdwb3J0LCAnY2FudmFzJyk7XG4gICAgICAgIHRoaXMucmVuZGVyID0gdGhpcy5jYW52YXNFbC5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICB0aGlzLmluZGljYXRvckVsID0gcXVlcnkodGhpcy52aWV3cG9ydCwgJy5pbmRpY2F0b3InKTtcbiAgICAgICAgdGhpcy50ZXh0RWwgPSBxdWVyeSh0aGlzLnZpZXdwb3J0LCAnLnRleHQgYicpO1xuICAgICAgICB0aGlzLmhTbGljZSA9IGhTbGljZTtcbiAgICAgICAgdGhpcy52U2xpY2UgPSB2U2xpY2U7XG4gICAgICAgIHRoaXMub3BlbmVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdGV4dChzdHIpIHtcbiAgICAgICAgdGhpcy50ZXh0RWwudGV4dENvbnRlbnQgPSBzdHI7XG4gICAgfVxuXG4gICAgdXBkYXRlKHhwLCB5cCkge1xuICAgICAgICBjb25zdCB7d2lkdGg6IGNXaWR0aCwgaGVpZ2h0OiBjSGVpZ2h0fSA9IGdldFJlY3QodGhpcy5jYW52YXNFbCk7XG4gICAgICAgIGNvbnN0IHt3aWR0aDogaVdpZHRoLCBoZWlnaHQ6IGlIZWlnaHR9ID0gZ2V0UmVjdCh0aGlzLmluZGljYXRvckVsKTtcbiAgICAgICAgY29uc3Qge3NsaWNlV2lkdGg6IHNXaWR0aCwgc2xpY2VIZWlnaHQ6IHNIZWlnaHR9ID0gdGhpcztcblxuICAgICAgICB0aGlzLmluZGljYXRvckVsLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IFxuICAgICAgICAgICAgYHRyYW5zbGF0ZTNkKCR7Y1dpZHRoICogeHAgKyBzV2lkdGggLyAyIC0gaVdpZHRoIC8gMn1weCwgJHtjSGVpZ2h0ICogeXAgKyBzSGVpZ2h0IC8gMiAtIGlIZWlnaHQgLyAyfXB4LCAwKWA7XG4gICAgfVxuXG4gICAgY2xlYXIoeHAsIHlwKSB7XG4gICAgICAgIGNvbnN0IHt3aWR0aDogY1dpZHRoLCBoZWlnaHQ6IGNIZWlnaHR9ID0gZ2V0UmVjdCh0aGlzLmNhbnZhc0VsKTtcbiAgICAgICAgY29uc3Qge3NsaWNlV2lkdGg6IHNXaWR0aCwgc2xpY2VIZWlnaHQ6IHNIZWlnaHR9ID0gdGhpcztcblxuICAgICAgICB0aGlzLnJlbmRlci5maWxsUmVjdChjV2lkdGggKiB4cCwgY0hlaWdodCAqIHlwLCBzV2lkdGgsIHNIZWlnaHQpO1xuICAgIH1cblxuICAgIHJlYWR5KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy52aWV3cG9ydC5zdHlsZS5kaXNwbGF5ID0gJyc7XG5cbiAgICAgICAgICAgIGNvbnN0IHt3aWR0aCwgaGVpZ2h0fSA9IGdldFJlY3QodGhpcy5jYW52YXNFbCk7XG4gICAgICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgICAgIHRoaXMuc2xpY2VXaWR0aCA9IHdpZHRoIC8gdGhpcy5oU2xpY2U7XG4gICAgICAgICAgICB0aGlzLnNsaWNlSGVpZ2h0ID0gaGVpZ2h0IC8gdGhpcy52U2xpY2U7XG5cbiAgICAgICAgICAgIHRoaXMuY2FudmFzRWwud2lkdGggPSB3aWR0aDtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzRWwuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIuY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIuZmlsbFN0eWxlID0gJyMwMTZmYTAnO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIuZmlsbFJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlci5maWxsU3R5bGUgPSAncmdiYSgwLCAwLCAwLCAxKSc7XG4gICAgICAgICAgICB0aGlzLnJlbmRlci5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnZGVzdGluYXRpb24tb3V0JztcblxuICAgICAgICAgICAgcmVzb2x2ZSh0aGlzKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYXAuanMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vbWFwLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi8uLi9ub2RlX21vZHVsZXMvLjAuMTMuMUBzdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vbWFwLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vbWFwLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbWFwLmNzc1xuLy8gbW9kdWxlIGlkID0gMTQ4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIjc3RhZ2UtbWFwIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiAwLjVyZW07XFxuICAgIGJvdHRvbTogMC41cmVtO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwLjRyZW0gMC43cmVtO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEuMDlyZW0gMC44NTNyZW07XFxuICAgIGhlaWdodDogODRweDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVooOTk5cHgpO1xcbiAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gICAgLXdlYmtpdC1ib3gtcGFjazogY2VudGVyO1xcbiAgICAtd2Via2l0LWJveC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4jc3RhZ2UtbWFwIC53cmFwIHtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzAxNmZhMDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgd2lkdGg6IDMwLjNweDtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4jc3RhZ2UtbWFwIC5tYXAge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4jc3RhZ2UtbWFwIC5pbmRpY2F0b3Ige1xcbiAgICBsZWZ0OiAwO1xcbiAgICB0b3A6IDA7XFxuICAgIHdpZHRoOiA0cHg7XFxuICAgIGhlaWdodDogNHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDUwLCA1MCwgNTApO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogZmxhc2ggMC40cyBsaW5lYXIgMHMgaW5maW5pdGUgYWx0ZXJuYXRlO1xcbn1cXG5cXG5cXG4jc3RhZ2UtbWFwIC50ZXh0IHtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBRUlBQUFCQ0NBWUFBQURqVkFEb0FBQUFHWFJGV0hSVGIyWjBkMkZ5WlFCQlpHOWlaU0JKYldGblpWSmxZV1I1Y2NsbFBBQUFDU0ZKUkVGVWVOcmtuQWxzRlZVVWhxZXZZMXRxQllwU0tBcTJnS0FzTG9qaWhncUlpdEdFYUJRVmd5RnVVVkdpQXU1S1hOaFJOQzY0Z0hHUGdRakVEUkFVd1NLQ0lOQXFpNEJLVlpCRmJDMkNGSXJucE4vbzdXVGU2OHg3ODhvcm5PUlBlZE41dzczbm52dWYvNXlaYVpxMXZzeXFBOHNXNUFvYUNuSUVEUVNaQWh1bzdRVjdCSDhMS2dUbGdoMThUcXFsSmNrUmFZS2pCQzBFZVlLc0JLKzNXN0JGOEp0Z20yQi9xanRDSjF3b09KcFZUNGFwVTM0Ui9DVFlsV3FPT0Z6UVZuQ01JR0xWalZYaGtIV0NuUWZhRWJxLzJ3bGFzeDBPaE9rMjJTQllDOGZVdVNPYUN6cUhzUC9EM0RJbGdrMTE1WWgwUVNkQkt5czFiU01PMlpkTVJ5Z0JuazRhVEdYVHRMczRDSmtHY1lST3Zsc0tiUVUvVytWcm5CS2FJeG9MemhBY1p0VXZxOFFaTzJvN01lSXpFdXFqRXl6RzNNM1BWcTdORVZsY3FENDZ3ZTJNckhnZGtWN1BPTUhQZ3FiSDQ0aE85U0E3QkxHR3pDbVFJNXFuc0U1SXhGb3hOMStPc0ZHTUI2dDFOa3IvR3BOMlc3c2s4MEtHb0wyZ1FKQlByOEttY0txZzFGN0Z6MlR4aGM3eCsxZzZRcXZJSGtrb29QUjZYUVFYQ0U1and1dnBNZndOaWVWUXZyZGhzRDhMUGhUTUNTcVhmUlpxbjV0VnE5c1JKeVdCRy9TYUF5R3JXWUl2QmI5eS9DUms4RkxCdFJSTXYxRmVueWM0bjlwaGpHQXpEczJuM0c4bWFFU0U3Y1NweS8ySUo2TW1XZUhsQ0swamVvYllUOUJWdllYYTVBMUNzUmNyb1JNWnhzU0dDL3FRM2l3R3R3Z1JOMXZRUVhDMjRFY2k1Z2ZLYm5WYUdlb3hpNjEycG1DTjREV3I5aTZXOWpNK2Mrb1JjOUlGSVRwQjIzUmpyZW8rNVdBbXJwK1hzWkpEY01KeXRrazM0N3M2K2Q1RXkxQVdhQVJPT0ZJd1R6Q0Z5Q29Xck9ZNjB3WDNFaEVYK1JoamhEblh5QnI2czJXSVRoakR5azRVUEVxWVAwUlkzdzhuNkVxOEtMamQrTzVtSnRMYVF4bE9nVmZ1RTV3UzQvK2ZCaG42c1phT0R5TEc0RE5EMmc2UENSWkNkRThJU3BsOGJ5YnRxRHQxd21WV2RZL1RzZGNGVjd1dXVaVHRwZC85RmhJZFJtUkZzOE45amplVEtQdlBFZmtoUmNNZzl1NWI4TTNEZ3E4STdUN0dlZStTSlM1MVRWajM3WW5HTWMwb3Z4dlIyazh3bFpiY1hWR3lXMjdBMnFpRjZZaW1JVGloSy90NmdsVjliMElKN1I3MmVhNXgzdHVDZndRM0c4ZitGRXdXM09xNjVnekJKYTVqU3ByUFFLSTlQY1p4Q1U3MWEwMGRRWlZ0SmQ1NlR5TkZ2aWs0UVhDamg1VFYreEh2c2QrN0dzZlZhU01GTjlIM2NPd1B3VXJYVnFrZ1NxcklMUDBGWDFqL04yM3owRUdEQW5iZHNtM1hhc1ZyVHI5aXZ1QVY4dnQreUc4VnFUT2Z5V2E0blBBNGFmVmsxelZmRU56Z0N2OGxTT1FCZ3RHQzhZSnpTWU1STXRRN2RLZUNXSzRkVW9XcEU1bUpkOGRBbW5ydFk5bnpYbXExakhNdjRQZW1UVVZodG5VZDE5UjZPU3ZmQWdkZmpDT3VFV3puMzRFclV4dlNTclIyMEhUMkVpdlN4Y2QzaWdUdkV5SEh1MzYzRUczd29PdjRhclpMVnlNS0Z5RGFycUxFSGg3bkhITHNFUGloUGZ2L0R3Z3NWdit3Q0FKc3k1YklkcDJ6R0dFMDNCVkJ1czFlRmx4bkhHOE44VnFrMTBjZzRYaXNnZTNhcy9IVytPdEpjVjVWcTByaXVTaEJqWnk3bzRnM3JVTStRWWRrZTRna2pkenV4ckZHMUNSbE9DR1JPK2FaZHF6MlZZRDBzOGtSSmtUSGF1VDBNcmlpRjJuMUtJL3Y3Nk0yV0l2ZWNEdmhPeHp4dEhGc055blU0WnFjQkIxaDIxRjZFb0hDQ3RGVHpGNnRJbXhWVXp4UWk5elZLdlFwb21xRXgxaEtJZFFoaGhQVjZhT00wdnd2SExFbFVVY2tZdG1RMU84VU1Gb0hOUEZSdk8yREs2YVJDbnQ3bkxPWk9xVS9UcldvWERXajNFRWRVeENTSXE2eUVTUHg4RVFtcEhZMDJqNHpTdWk3UzkvNTVQcENvc0ZMMWE2RFRGVk1YVWkvWVNKakhVM2F6Q0QxSDVFQVNmNjNNSGFjM1I5bDdqdUppQm1JcGZreHp0L01hczdoWEUyekhXT2sxb25JN2JPb1ZiUVl1eEt1MllNY0gwVEt6a00vSkdKN2JTNGNOSVZlaGw2NG0vMDlFQVpmU21Ub0NtNmxVaXloNUQ2VFVyd3cybUFnelNWRVdpTzRvSklxMW9tMnljajROcVRWaWppVXBOdjIyQXl5VVlBdjZWYTRuaERkeEtUejRZWVhxREV5V0trQ2xGOXRENUpzSUN1MGdSdy9JY0tVSDg0eHp2dU1Qc2RUTkdNNnU1dXdjZG91MndyKzJNMEF3blV4bjhzcGpyb3pxQ2NEWEtzTXZpakJ1ZHVKR3BYZHo3cks2VzlwK1QxQkJNOUZiczhNd1JFVkVRYmoxL0tNSHFScG43THlLcDYrOFhHZFRTakZvWkNsMWhxVDJFNGFFWDFkVGxpQ0RubUF0bDhwU3JhUUtqUlJLN2NEZEgyZG5zTUtqNXhkaFB6dEFZR2Q2TXBFKytHTDVkUVNHb1hhMWo5VjhBSFJOQ3BLSlR5YlJzN0RSaEUyQ2MweU13UitVTnRobzhoMitTVE1JMWwxTDEwd21YYmFiYlRTOGlEaUhiVG9tK09nTGpSWDV0QzFlbzRVNkVXZWs5ZzJvN21lRTMwUitPSDVNUGhCZmVBSXFxMld2L3NaMnoycVJjY1drZTRHd3hPRnBMdGNveFUzRnhYWWgxWmJWZ3pGT1k1cmpEUDZxYXRwN293bnBZYnhiT1RXYWoxUWZWOGp6OVZTajJaSHNBcHpVWVhsSGlMTDZXQy9UZHRzR1Z2aERMYk9jYlVvVHIzdXg2UmtzOGhhUzJROGlKSWRHWktxMUNkcXRqaU9pTURVZmpyWkxaRzQ3Vm01UDQxcXNKbkJEZFBSQlZlUWFXTG1jUVRYZEhpam4ydTd6S01OZUM5ODgxQUlhdExpR3JwRnE4dzdYUjNJNDM2dEplYzNobC8rZ1c5S2NjNGdQaytBR3dZYSs5d1p4Q3BTOFVySXN5OTZ4RlNrazhrUXc0aUVKNjN3SGxKZnh4aVNlc3N2blNadWQ5THRQSnlkUnRhcHBFOTVPbEdRYnBCa0NkdXZHR210blBJUkViWTNwUEhWdU9WWEZ6ZUJleURKRzFzMWJ3STNJeDAyeFBrN2lZQ05LTkh6d1M5b2p1OURIbGZVbThDV2xkekhBcm9qdWpvUzZodUlqSjMwSWN6SEFteXl6Q3graHYxYVFxMlBCY1RERlVHdENVVlRhNklraHpDdFFISCt4T3J2VHVJWU50RDVzbUk1d2lZcURvYW42YnhzTjlGUWcyc2lVUlJkc1hYd1dva1g0VVppTkZKS0QwSW5sRnBSWG1PSWxTcUxMWjhQZE5jVEs0OFY2WkZhNU80U1ZGOTl0ejMwVC9iRjR3Z0xCYmNJOFZOZnJaSTU3SXFkM3cvOGF3cGFYWHJkKzlBaWEwZ0lUZ2p0TlFXTDJxSElDdkgxUWxmSkhVMzVKZHBuS1BMYmVBcFNWL3pGaGNNbVVKWFAyeng2Qks4bVNJeEZqTmtLMnhHT2x4ZlFZUXJMVk9hT05YTDdYclpMdkJYbVJ1cVpRTkdiU3E4N2FuZExuM1hRbnVmQ09CVmpuYjd1NkpianFmQUNyRWJvR3VzQXZRRHJybG9QNlZlaTNhYk5uUUlja3F5aUxhVmZrdmZxUHh6U2Z6WWhtcm4va0laK3pyRCsvME1hVmNqZlN2WjVuZjhoalg4RkdBQmc2SHd6bXFvdEhBQUFBQUJKUlU1RXJrSmdnZz09KTtcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxLjJyZW07XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciAwLjJyZW07XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIGNvbG9yOiAjMDBkZGYxO1xcbiAgICBmb250LXNpemU6IDEycHg7XFxuICAgIHdpZHRoOiAxMDBweDtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBsaW5lLWhlaWdodDogMS41ZW07XFxuICAgIGxlZnQ6IDAuMXJlbTtcXG4gICAgdG9wOiAxLjhyZW07XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgcGFkZGluZy10b3A6IDUwcHg7XFxufVxcblxcbiNzdGFnZS1tYXAgLnRleHQgYiB7XFxuICAgIGZvbnQtc2l6ZTogMTVweDtcXG4gICAgbWFyZ2luLXRvcDogNHB4O1xcbiAgICBjb2xvcjogI0ZGRjtcXG59XFxuXFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIGZsYXNoIHtcXG4gICAgMCUge1xcbiAgICAgICAgb3BhY2l0eTogMDtcXG4gICAgfVxcblxcbiAgICAxMDAlIHtcXG4gICAgICAgIG9wYWNpdHk6IDE7XFxuICAgIH1cXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjI1LjBAY3NzLWxvYWRlciEuL3NyYy9tYXAuY3NzXG4vLyBtb2R1bGUgaWQgPSAxNDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtcbiAgICB3aW4sXG4gICAgZG9jLFxuICAgIFByb21pc2UsXG4gICAgZGVmZXIsXG4gICAgcXVlcnksXG4gICAgcXVlcnlBbGwsXG4gICAgZ2V0UmVjdCxcbiAgICBnZXREaXN0YW5jZSxcbiAgICByYWYsXG4gICAgY2FmXG59IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgRXZlbnQgZnJvbSAnLi9ldmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpY2tlciBleHRlbmRzIEV2ZW50e1xuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAgICAgdGhpcy5faWQgPSAwO1xuICAgICAgICB0aGlzLl9tYXBGID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLl9tYXBDID0gbmV3IE1hcCgpO1xuICAgIH1cblxuICAgIGFkZChmKSB7XG4gICAgICAgIGlmIChmICYmICF0aGlzLl9tYXBDLmhhcyhmKSkge1xuICAgICAgICAgICAgY29uc3QgaWQgPSB0aGlzLl9pZCsrO1xuICAgICAgICAgICAgdGhpcy5fbWFwRi5zZXQoaWQsIGYpO1xuICAgICAgICAgICAgdGhpcy5fbWFwQy5zZXQoZiwge1xuICAgICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgICBkZWZlcnJlZDogZGVmZXIoKSxcbiAgICAgICAgICAgICAgICBjYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN0YXJ0OiAwLFxuICAgICAgICAgICAgICAgIGVsYXBzZWQ6IDAsXG4gICAgICAgICAgICAgICAgZGVsdGE6IDBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFzKGlkKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgaWQgPT09ICdudW1iZXInICYmIHRoaXMuX21hcEYuaGFzKGlkKTtcbiAgICB9XG5cbiAgICBkZWxldGUoaWQpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzKGlkKSkge1xuICAgICAgICAgICAgY29uc3QgZiA9IHRoaXMuX21hcEYuZ2V0KGlkKTtcbiAgICAgICAgICAgIGNvbnN0IGMgPSB0aGlzLl9tYXBDLmdldChmKTtcbiAgICAgICAgICAgIGMuY2FuY2VsID0gdHJ1ZTtcbiAgICAgICAgICAgIGMuZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgdGhpcy5fbWFwRi5kZWxldGUoaWQpO1xuICAgICAgICAgICAgdGhpcy5fbWFwQy5kZWxldGUoZik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlbmQoaWQpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzKGlkKSkge1xuICAgICAgICAgICAgY29uc3QgZiA9IHRoaXMuX21hcEYuZ2V0KGlkKTtcbiAgICAgICAgICAgIGNvbnN0IGMgPSB0aGlzLl9tYXBDLmdldChmKTtcbiAgICAgICAgICAgIHJldHVybiBjLmRlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBydW4oKSB7XG4gICAgICAgIHRoaXMuc3RhcnQgPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLmVsYXBzZWQgPSAwO1xuICAgICAgICB0aGlzLmRlbHRhID0gMDtcblxuICAgICAgICBjb25zdCB0aWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgcmFmKHRpY2spO1xuXG4gICAgICAgICAgICBsZXQgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIGxldCBlbGFwc2VkID0gbm93IC0gdGhpcy5zdGFydDtcblxuICAgICAgICAgICAgdGhpcy5kZWx0YSA9IGVsYXBzZWQgLSB0aGlzLmVsYXBzZWQ7XG4gICAgICAgICAgICB0aGlzLmVsYXBzZWQgPSBlbGFwc2VkO1xuXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2JlZm9yZXRpY2snLCB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHRoaXMuc3RhcnQsXG4gICAgICAgICAgICAgICAgZGVsdGE6IHRoaXMuZGVsdGEsXG4gICAgICAgICAgICAgICAgZWxhcHNlZDogdGhpcy5lbGFwc2VkXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3Qga2V5cyA9IFsuLi50aGlzLl9tYXBDLmtleXMoKV07XG5cbiAgICAgICAgICAgIGtleXMuZm9yRWFjaChmID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjID0gdGhpcy5fbWFwQy5nZXQoZik7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgICAgICAgICAgICAgIGMuc3RhcnQgPSBjLnN0YXJ0IHx8IChjLnN0YXJ0ID0gbm93KTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGFwc2VkID0gbm93IC0gYy5zdGFydDtcbiAgICAgICAgICAgICAgICAgICAgYy5kZWx0YSA9IGVsYXBzZWQgLSBjLmVsYXBzZWQ7XG4gICAgICAgICAgICAgICAgICAgIGMuZWxhcHNlZCA9IGVsYXBzZWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGYoYywgdGhpcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlKGMuaWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgICAgICBlbGFwc2VkID0gbm93IC0gdGhpcy5zdGFydDtcblxuICAgICAgICAgICAgdGhpcy5kZWx0YSA9IGVsYXBzZWQgLSB0aGlzLmVsYXBzZWQ7XG4gICAgICAgICAgICB0aGlzLmVsYXBzZWQgPSBlbGFwc2VkO1xuXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2FmdGVydGljaycsIHtcbiAgICAgICAgICAgICAgICBzdGFydDogdGhpcy5zdGFydCxcbiAgICAgICAgICAgICAgICBkZWx0YTogdGhpcy5kZWx0YSxcbiAgICAgICAgICAgICAgICBlbGFwc2VkOiB0aGlzLmVsYXBzZWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJhZih0aWNrKTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3RpY2tlci5qcyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9tYXBcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvbWFwLmpzXG4vLyBtb2R1bGUgaWQgPSAxNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZycpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2Lm1hcCcpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczcubWFwLnRvLWpzb24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9fY29yZScpLk1hcDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9tYXAuanNcbi8vIG1vZHVsZSBpZCA9IDE1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG52YXIgc3Ryb25nID0gcmVxdWlyZSgnLi9fY29sbGVjdGlvbi1zdHJvbmcnKTtcblxuLy8gMjMuMSBNYXAgT2JqZWN0c1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb2xsZWN0aW9uJykoJ01hcCcsIGZ1bmN0aW9uKGdldCl7XG4gIHJldHVybiBmdW5jdGlvbiBNYXAoKXsgcmV0dXJuIGdldCh0aGlzLCBhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7IH07XG59LCB7XG4gIC8vIDIzLjEuMy42IE1hcC5wcm90b3R5cGUuZ2V0KGtleSlcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoa2V5KXtcbiAgICB2YXIgZW50cnkgPSBzdHJvbmcuZ2V0RW50cnkodGhpcywga2V5KTtcbiAgICByZXR1cm4gZW50cnkgJiYgZW50cnkudjtcbiAgfSxcbiAgLy8gMjMuMS4zLjkgTWFwLnByb3RvdHlwZS5zZXQoa2V5LCB2YWx1ZSlcbiAgc2V0OiBmdW5jdGlvbiBzZXQoa2V5LCB2YWx1ZSl7XG4gICAgcmV0dXJuIHN0cm9uZy5kZWYodGhpcywga2V5ID09PSAwID8gMCA6IGtleSwgdmFsdWUpO1xuICB9XG59LCBzdHJvbmcsIHRydWUpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm1hcC5qc1xuLy8gbW9kdWxlIGlkID0gMTUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbnZhciBkUCAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZcbiAgLCBjcmVhdGUgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKVxuICAsIHJlZGVmaW5lQWxsID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUtYWxsJylcbiAgLCBjdHggICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgYW5JbnN0YW5jZSAgPSByZXF1aXJlKCcuL19hbi1pbnN0YW5jZScpXG4gICwgZGVmaW5lZCAgICAgPSByZXF1aXJlKCcuL19kZWZpbmVkJylcbiAgLCBmb3JPZiAgICAgICA9IHJlcXVpcmUoJy4vX2Zvci1vZicpXG4gICwgJGl0ZXJEZWZpbmUgPSByZXF1aXJlKCcuL19pdGVyLWRlZmluZScpXG4gICwgc3RlcCAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLXN0ZXAnKVxuICAsIHNldFNwZWNpZXMgID0gcmVxdWlyZSgnLi9fc2V0LXNwZWNpZXMnKVxuICAsIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKVxuICAsIGZhc3RLZXkgICAgID0gcmVxdWlyZSgnLi9fbWV0YScpLmZhc3RLZXlcbiAgLCBTSVpFICAgICAgICA9IERFU0NSSVBUT1JTID8gJ19zJyA6ICdzaXplJztcblxudmFyIGdldEVudHJ5ID0gZnVuY3Rpb24odGhhdCwga2V5KXtcbiAgLy8gZmFzdCBjYXNlXG4gIHZhciBpbmRleCA9IGZhc3RLZXkoa2V5KSwgZW50cnk7XG4gIGlmKGluZGV4ICE9PSAnRicpcmV0dXJuIHRoYXQuX2lbaW5kZXhdO1xuICAvLyBmcm96ZW4gb2JqZWN0IGNhc2VcbiAgZm9yKGVudHJ5ID0gdGhhdC5fZjsgZW50cnk7IGVudHJ5ID0gZW50cnkubil7XG4gICAgaWYoZW50cnkuayA9PSBrZXkpcmV0dXJuIGVudHJ5O1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0Q29uc3RydWN0b3I6IGZ1bmN0aW9uKHdyYXBwZXIsIE5BTUUsIElTX01BUCwgQURERVIpe1xuICAgIHZhciBDID0gd3JhcHBlcihmdW5jdGlvbih0aGF0LCBpdGVyYWJsZSl7XG4gICAgICBhbkluc3RhbmNlKHRoYXQsIEMsIE5BTUUsICdfaScpO1xuICAgICAgdGhhdC5faSA9IGNyZWF0ZShudWxsKTsgLy8gaW5kZXhcbiAgICAgIHRoYXQuX2YgPSB1bmRlZmluZWQ7ICAgIC8vIGZpcnN0IGVudHJ5XG4gICAgICB0aGF0Ll9sID0gdW5kZWZpbmVkOyAgICAvLyBsYXN0IGVudHJ5XG4gICAgICB0aGF0W1NJWkVdID0gMDsgICAgICAgICAvLyBzaXplXG4gICAgICBpZihpdGVyYWJsZSAhPSB1bmRlZmluZWQpZm9yT2YoaXRlcmFibGUsIElTX01BUCwgdGhhdFtBRERFUl0sIHRoYXQpO1xuICAgIH0pO1xuICAgIHJlZGVmaW5lQWxsKEMucHJvdG90eXBlLCB7XG4gICAgICAvLyAyMy4xLjMuMSBNYXAucHJvdG90eXBlLmNsZWFyKClcbiAgICAgIC8vIDIzLjIuMy4yIFNldC5wcm90b3R5cGUuY2xlYXIoKVxuICAgICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCl7XG4gICAgICAgIGZvcih2YXIgdGhhdCA9IHRoaXMsIGRhdGEgPSB0aGF0Ll9pLCBlbnRyeSA9IHRoYXQuX2Y7IGVudHJ5OyBlbnRyeSA9IGVudHJ5Lm4pe1xuICAgICAgICAgIGVudHJ5LnIgPSB0cnVlO1xuICAgICAgICAgIGlmKGVudHJ5LnApZW50cnkucCA9IGVudHJ5LnAubiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBkZWxldGUgZGF0YVtlbnRyeS5pXTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0Ll9mID0gdGhhdC5fbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhhdFtTSVpFXSA9IDA7XG4gICAgICB9LFxuICAgICAgLy8gMjMuMS4zLjMgTWFwLnByb3RvdHlwZS5kZWxldGUoa2V5KVxuICAgICAgLy8gMjMuMi4zLjQgU2V0LnByb3RvdHlwZS5kZWxldGUodmFsdWUpXG4gICAgICAnZGVsZXRlJzogZnVuY3Rpb24oa2V5KXtcbiAgICAgICAgdmFyIHRoYXQgID0gdGhpc1xuICAgICAgICAgICwgZW50cnkgPSBnZXRFbnRyeSh0aGF0LCBrZXkpO1xuICAgICAgICBpZihlbnRyeSl7XG4gICAgICAgICAgdmFyIG5leHQgPSBlbnRyeS5uXG4gICAgICAgICAgICAsIHByZXYgPSBlbnRyeS5wO1xuICAgICAgICAgIGRlbGV0ZSB0aGF0Ll9pW2VudHJ5LmldO1xuICAgICAgICAgIGVudHJ5LnIgPSB0cnVlO1xuICAgICAgICAgIGlmKHByZXYpcHJldi5uID0gbmV4dDtcbiAgICAgICAgICBpZihuZXh0KW5leHQucCA9IHByZXY7XG4gICAgICAgICAgaWYodGhhdC5fZiA9PSBlbnRyeSl0aGF0Ll9mID0gbmV4dDtcbiAgICAgICAgICBpZih0aGF0Ll9sID09IGVudHJ5KXRoYXQuX2wgPSBwcmV2O1xuICAgICAgICAgIHRoYXRbU0laRV0tLTtcbiAgICAgICAgfSByZXR1cm4gISFlbnRyeTtcbiAgICAgIH0sXG4gICAgICAvLyAyMy4yLjMuNiBTZXQucHJvdG90eXBlLmZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgICAgIC8vIDIzLjEuMy41IE1hcC5wcm90b3R5cGUuZm9yRWFjaChjYWxsYmFja2ZuLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICAgICAgZm9yRWFjaDogZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFja2ZuIC8qLCB0aGF0ID0gdW5kZWZpbmVkICovKXtcbiAgICAgICAgYW5JbnN0YW5jZSh0aGlzLCBDLCAnZm9yRWFjaCcpO1xuICAgICAgICB2YXIgZiA9IGN0eChjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCwgMylcbiAgICAgICAgICAsIGVudHJ5O1xuICAgICAgICB3aGlsZShlbnRyeSA9IGVudHJ5ID8gZW50cnkubiA6IHRoaXMuX2Ype1xuICAgICAgICAgIGYoZW50cnkudiwgZW50cnkuaywgdGhpcyk7XG4gICAgICAgICAgLy8gcmV2ZXJ0IHRvIHRoZSBsYXN0IGV4aXN0aW5nIGVudHJ5XG4gICAgICAgICAgd2hpbGUoZW50cnkgJiYgZW50cnkucillbnRyeSA9IGVudHJ5LnA7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAvLyAyMy4xLjMuNyBNYXAucHJvdG90eXBlLmhhcyhrZXkpXG4gICAgICAvLyAyMy4yLjMuNyBTZXQucHJvdG90eXBlLmhhcyh2YWx1ZSlcbiAgICAgIGhhczogZnVuY3Rpb24gaGFzKGtleSl7XG4gICAgICAgIHJldHVybiAhIWdldEVudHJ5KHRoaXMsIGtleSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYoREVTQ1JJUFRPUlMpZFAoQy5wcm90b3R5cGUsICdzaXplJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gZGVmaW5lZCh0aGlzW1NJWkVdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gQztcbiAgfSxcbiAgZGVmOiBmdW5jdGlvbih0aGF0LCBrZXksIHZhbHVlKXtcbiAgICB2YXIgZW50cnkgPSBnZXRFbnRyeSh0aGF0LCBrZXkpXG4gICAgICAsIHByZXYsIGluZGV4O1xuICAgIC8vIGNoYW5nZSBleGlzdGluZyBlbnRyeVxuICAgIGlmKGVudHJ5KXtcbiAgICAgIGVudHJ5LnYgPSB2YWx1ZTtcbiAgICAvLyBjcmVhdGUgbmV3IGVudHJ5XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoYXQuX2wgPSBlbnRyeSA9IHtcbiAgICAgICAgaTogaW5kZXggPSBmYXN0S2V5KGtleSwgdHJ1ZSksIC8vIDwtIGluZGV4XG4gICAgICAgIGs6IGtleSwgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBrZXlcbiAgICAgICAgdjogdmFsdWUsICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIHZhbHVlXG4gICAgICAgIHA6IHByZXYgPSB0aGF0Ll9sLCAgICAgICAgICAgICAvLyA8LSBwcmV2aW91cyBlbnRyeVxuICAgICAgICBuOiB1bmRlZmluZWQsICAgICAgICAgICAgICAgICAgLy8gPC0gbmV4dCBlbnRyeVxuICAgICAgICByOiBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gcmVtb3ZlZFxuICAgICAgfTtcbiAgICAgIGlmKCF0aGF0Ll9mKXRoYXQuX2YgPSBlbnRyeTtcbiAgICAgIGlmKHByZXYpcHJldi5uID0gZW50cnk7XG4gICAgICB0aGF0W1NJWkVdKys7XG4gICAgICAvLyBhZGQgdG8gaW5kZXhcbiAgICAgIGlmKGluZGV4ICE9PSAnRicpdGhhdC5faVtpbmRleF0gPSBlbnRyeTtcbiAgICB9IHJldHVybiB0aGF0O1xuICB9LFxuICBnZXRFbnRyeTogZ2V0RW50cnksXG4gIHNldFN0cm9uZzogZnVuY3Rpb24oQywgTkFNRSwgSVNfTUFQKXtcbiAgICAvLyBhZGQgLmtleXMsIC52YWx1ZXMsIC5lbnRyaWVzLCBbQEBpdGVyYXRvcl1cbiAgICAvLyAyMy4xLjMuNCwgMjMuMS4zLjgsIDIzLjEuMy4xMSwgMjMuMS4zLjEyLCAyMy4yLjMuNSwgMjMuMi4zLjgsIDIzLjIuMy4xMCwgMjMuMi4zLjExXG4gICAgJGl0ZXJEZWZpbmUoQywgTkFNRSwgZnVuY3Rpb24oaXRlcmF0ZWQsIGtpbmQpe1xuICAgICAgdGhpcy5fdCA9IGl0ZXJhdGVkOyAgLy8gdGFyZ2V0XG4gICAgICB0aGlzLl9rID0ga2luZDsgICAgICAvLyBraW5kXG4gICAgICB0aGlzLl9sID0gdW5kZWZpbmVkOyAvLyBwcmV2aW91c1xuICAgIH0sIGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgdGhhdCAgPSB0aGlzXG4gICAgICAgICwga2luZCAgPSB0aGF0Ll9rXG4gICAgICAgICwgZW50cnkgPSB0aGF0Ll9sO1xuICAgICAgLy8gcmV2ZXJ0IHRvIHRoZSBsYXN0IGV4aXN0aW5nIGVudHJ5XG4gICAgICB3aGlsZShlbnRyeSAmJiBlbnRyeS5yKWVudHJ5ID0gZW50cnkucDtcbiAgICAgIC8vIGdldCBuZXh0IGVudHJ5XG4gICAgICBpZighdGhhdC5fdCB8fCAhKHRoYXQuX2wgPSBlbnRyeSA9IGVudHJ5ID8gZW50cnkubiA6IHRoYXQuX3QuX2YpKXtcbiAgICAgICAgLy8gb3IgZmluaXNoIHRoZSBpdGVyYXRpb25cbiAgICAgICAgdGhhdC5fdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIHN0ZXAoMSk7XG4gICAgICB9XG4gICAgICAvLyByZXR1cm4gc3RlcCBieSBraW5kXG4gICAgICBpZihraW5kID09ICdrZXlzJyAgKXJldHVybiBzdGVwKDAsIGVudHJ5LmspO1xuICAgICAgaWYoa2luZCA9PSAndmFsdWVzJylyZXR1cm4gc3RlcCgwLCBlbnRyeS52KTtcbiAgICAgIHJldHVybiBzdGVwKDAsIFtlbnRyeS5rLCBlbnRyeS52XSk7XG4gICAgfSwgSVNfTUFQID8gJ2VudHJpZXMnIDogJ3ZhbHVlcycgLCAhSVNfTUFQLCB0cnVlKTtcblxuICAgIC8vIGFkZCBbQEBzcGVjaWVzXSwgMjMuMS4yLjIsIDIzLjIuMi4yXG4gICAgc2V0U3BlY2llcyhOQU1FKTtcbiAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2xsZWN0aW9uLXN0cm9uZy5qc1xuLy8gbW9kdWxlIGlkID0gMTU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0YXJnZXQsIHNyYywgc2FmZSl7XG4gIGZvcih2YXIga2V5IGluIHNyYyl7XG4gICAgaWYoc2FmZSAmJiB0YXJnZXRba2V5XSl0YXJnZXRba2V5XSA9IHNyY1trZXldO1xuICAgIGVsc2UgaGlkZSh0YXJnZXQsIGtleSwgc3JjW2tleV0pO1xuICB9IHJldHVybiB0YXJnZXQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLWFsbC5qc1xuLy8gbW9kdWxlIGlkID0gMTU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIENvbnN0cnVjdG9yLCBuYW1lLCBmb3JiaWRkZW5GaWVsZCl7XG4gIGlmKCEoaXQgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikgfHwgKGZvcmJpZGRlbkZpZWxkICE9PSB1bmRlZmluZWQgJiYgZm9yYmlkZGVuRmllbGQgaW4gaXQpKXtcbiAgICB0aHJvdyBUeXBlRXJyb3IobmFtZSArICc6IGluY29ycmVjdCBpbnZvY2F0aW9uIScpO1xuICB9IHJldHVybiBpdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4taW5zdGFuY2UuanNcbi8vIG1vZHVsZSBpZCA9IDE1NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgY3R4ICAgICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIGNhbGwgICAgICAgID0gcmVxdWlyZSgnLi9faXRlci1jYWxsJylcbiAgLCBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKVxuICAsIGFuT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCB0b0xlbmd0aCAgICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgZ2V0SXRlckZuICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpXG4gICwgQlJFQUsgICAgICAgPSB7fVxuICAsIFJFVFVSTiAgICAgID0ge307XG52YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXRlcmFibGUsIGVudHJpZXMsIGZuLCB0aGF0LCBJVEVSQVRPUil7XG4gIHZhciBpdGVyRm4gPSBJVEVSQVRPUiA/IGZ1bmN0aW9uKCl7IHJldHVybiBpdGVyYWJsZTsgfSA6IGdldEl0ZXJGbihpdGVyYWJsZSlcbiAgICAsIGYgICAgICA9IGN0eChmbiwgdGhhdCwgZW50cmllcyA/IDIgOiAxKVxuICAgICwgaW5kZXggID0gMFxuICAgICwgbGVuZ3RoLCBzdGVwLCBpdGVyYXRvciwgcmVzdWx0O1xuICBpZih0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ZXJhYmxlICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIC8vIGZhc3QgY2FzZSBmb3IgYXJyYXlzIHdpdGggZGVmYXVsdCBpdGVyYXRvclxuICBpZihpc0FycmF5SXRlcihpdGVyRm4pKWZvcihsZW5ndGggPSB0b0xlbmd0aChpdGVyYWJsZS5sZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKyl7XG4gICAgcmVzdWx0ID0gZW50cmllcyA/IGYoYW5PYmplY3Qoc3RlcCA9IGl0ZXJhYmxlW2luZGV4XSlbMF0sIHN0ZXBbMV0pIDogZihpdGVyYWJsZVtpbmRleF0pO1xuICAgIGlmKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pcmV0dXJuIHJlc3VsdDtcbiAgfSBlbHNlIGZvcihpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKGl0ZXJhYmxlKTsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOyApe1xuICAgIHJlc3VsdCA9IGNhbGwoaXRlcmF0b3IsIGYsIHN0ZXAudmFsdWUsIGVudHJpZXMpO1xuICAgIGlmKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcbmV4cG9ydHMuQlJFQUsgID0gQlJFQUs7XG5leHBvcnRzLlJFVFVSTiA9IFJFVFVSTjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mb3Itb2YuanNcbi8vIG1vZHVsZSBpZCA9IDE1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGNvcmUgICAgICAgID0gcmVxdWlyZSgnLi9fY29yZScpXG4gICwgZFAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKVxuICAsIFNQRUNJRVMgICAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihLRVkpe1xuICB2YXIgQyA9IHR5cGVvZiBjb3JlW0tFWV0gPT0gJ2Z1bmN0aW9uJyA/IGNvcmVbS0VZXSA6IGdsb2JhbFtLRVldO1xuICBpZihERVNDUklQVE9SUyAmJiBDICYmICFDW1NQRUNJRVNdKWRQLmYoQywgU1BFQ0lFUywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9XG4gIH0pO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtc3BlY2llcy5qc1xuLy8gbW9kdWxlIGlkID0gMTU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIG1ldGEgICAgICAgICAgID0gcmVxdWlyZSgnLi9fbWV0YScpXG4gICwgZmFpbHMgICAgICAgICAgPSByZXF1aXJlKCcuL19mYWlscycpXG4gICwgaGlkZSAgICAgICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCByZWRlZmluZUFsbCAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lLWFsbCcpXG4gICwgZm9yT2YgICAgICAgICAgPSByZXF1aXJlKCcuL19mb3Itb2YnKVxuICAsIGFuSW5zdGFuY2UgICAgID0gcmVxdWlyZSgnLi9fYW4taW5zdGFuY2UnKVxuICAsIGlzT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCBkUCAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZcbiAgLCBlYWNoICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2FycmF5LW1ldGhvZHMnKSgwKVxuICAsIERFU0NSSVBUT1JTICAgID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihOQU1FLCB3cmFwcGVyLCBtZXRob2RzLCBjb21tb24sIElTX01BUCwgSVNfV0VBSyl7XG4gIHZhciBCYXNlICA9IGdsb2JhbFtOQU1FXVxuICAgICwgQyAgICAgPSBCYXNlXG4gICAgLCBBRERFUiA9IElTX01BUCA/ICdzZXQnIDogJ2FkZCdcbiAgICAsIHByb3RvID0gQyAmJiBDLnByb3RvdHlwZVxuICAgICwgTyAgICAgPSB7fTtcbiAgaWYoIURFU0NSSVBUT1JTIHx8IHR5cGVvZiBDICE9ICdmdW5jdGlvbicgfHwgIShJU19XRUFLIHx8IHByb3RvLmZvckVhY2ggJiYgIWZhaWxzKGZ1bmN0aW9uKCl7XG4gICAgbmV3IEMoKS5lbnRyaWVzKCkubmV4dCgpO1xuICB9KSkpe1xuICAgIC8vIGNyZWF0ZSBjb2xsZWN0aW9uIGNvbnN0cnVjdG9yXG4gICAgQyA9IGNvbW1vbi5nZXRDb25zdHJ1Y3Rvcih3cmFwcGVyLCBOQU1FLCBJU19NQVAsIEFEREVSKTtcbiAgICByZWRlZmluZUFsbChDLnByb3RvdHlwZSwgbWV0aG9kcyk7XG4gICAgbWV0YS5ORUVEID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBDID0gd3JhcHBlcihmdW5jdGlvbih0YXJnZXQsIGl0ZXJhYmxlKXtcbiAgICAgIGFuSW5zdGFuY2UodGFyZ2V0LCBDLCBOQU1FLCAnX2MnKTtcbiAgICAgIHRhcmdldC5fYyA9IG5ldyBCYXNlO1xuICAgICAgaWYoaXRlcmFibGUgIT0gdW5kZWZpbmVkKWZvck9mKGl0ZXJhYmxlLCBJU19NQVAsIHRhcmdldFtBRERFUl0sIHRhcmdldCk7XG4gICAgfSk7XG4gICAgZWFjaCgnYWRkLGNsZWFyLGRlbGV0ZSxmb3JFYWNoLGdldCxoYXMsc2V0LGtleXMsdmFsdWVzLGVudHJpZXMsdG9KU09OJy5zcGxpdCgnLCcpLGZ1bmN0aW9uKEtFWSl7XG4gICAgICB2YXIgSVNfQURERVIgPSBLRVkgPT0gJ2FkZCcgfHwgS0VZID09ICdzZXQnO1xuICAgICAgaWYoS0VZIGluIHByb3RvICYmICEoSVNfV0VBSyAmJiBLRVkgPT0gJ2NsZWFyJykpaGlkZShDLnByb3RvdHlwZSwgS0VZLCBmdW5jdGlvbihhLCBiKXtcbiAgICAgICAgYW5JbnN0YW5jZSh0aGlzLCBDLCBLRVkpO1xuICAgICAgICBpZighSVNfQURERVIgJiYgSVNfV0VBSyAmJiAhaXNPYmplY3QoYSkpcmV0dXJuIEtFWSA9PSAnZ2V0JyA/IHVuZGVmaW5lZCA6IGZhbHNlO1xuICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5fY1tLRVldKGEgPT09IDAgPyAwIDogYSwgYik7XG4gICAgICAgIHJldHVybiBJU19BRERFUiA/IHRoaXMgOiByZXN1bHQ7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZignc2l6ZScgaW4gcHJvdG8pZFAoQy5wcm90b3R5cGUsICdzaXplJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gdGhpcy5fYy5zaXplO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc2V0VG9TdHJpbmdUYWcoQywgTkFNRSk7XG5cbiAgT1tOQU1FXSA9IEM7XG4gICRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GLCBPKTtcblxuICBpZighSVNfV0VBSyljb21tb24uc2V0U3Ryb25nKEMsIE5BTUUsIElTX01BUCk7XG5cbiAgcmV0dXJuIEM7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvbGxlY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IDE1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAwIC0+IEFycmF5I2ZvckVhY2hcbi8vIDEgLT4gQXJyYXkjbWFwXG4vLyAyIC0+IEFycmF5I2ZpbHRlclxuLy8gMyAtPiBBcnJheSNzb21lXG4vLyA0IC0+IEFycmF5I2V2ZXJ5XG4vLyA1IC0+IEFycmF5I2ZpbmRcbi8vIDYgLT4gQXJyYXkjZmluZEluZGV4XG52YXIgY3R4ICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIElPYmplY3QgID0gcmVxdWlyZSgnLi9faW9iamVjdCcpXG4gICwgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCBhc2MgICAgICA9IHJlcXVpcmUoJy4vX2FycmF5LXNwZWNpZXMtY3JlYXRlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFRZUEUsICRjcmVhdGUpe1xuICB2YXIgSVNfTUFQICAgICAgICA9IFRZUEUgPT0gMVxuICAgICwgSVNfRklMVEVSICAgICA9IFRZUEUgPT0gMlxuICAgICwgSVNfU09NRSAgICAgICA9IFRZUEUgPT0gM1xuICAgICwgSVNfRVZFUlkgICAgICA9IFRZUEUgPT0gNFxuICAgICwgSVNfRklORF9JTkRFWCA9IFRZUEUgPT0gNlxuICAgICwgTk9fSE9MRVMgICAgICA9IFRZUEUgPT0gNSB8fCBJU19GSU5EX0lOREVYXG4gICAgLCBjcmVhdGUgICAgICAgID0gJGNyZWF0ZSB8fCBhc2M7XG4gIHJldHVybiBmdW5jdGlvbigkdGhpcywgY2FsbGJhY2tmbiwgdGhhdCl7XG4gICAgdmFyIE8gICAgICA9IHRvT2JqZWN0KCR0aGlzKVxuICAgICAgLCBzZWxmICAgPSBJT2JqZWN0KE8pXG4gICAgICAsIGYgICAgICA9IGN0eChjYWxsYmFja2ZuLCB0aGF0LCAzKVxuICAgICAgLCBsZW5ndGggPSB0b0xlbmd0aChzZWxmLmxlbmd0aClcbiAgICAgICwgaW5kZXggID0gMFxuICAgICAgLCByZXN1bHQgPSBJU19NQVAgPyBjcmVhdGUoJHRoaXMsIGxlbmd0aCkgOiBJU19GSUxURVIgPyBjcmVhdGUoJHRoaXMsIDApIDogdW5kZWZpbmVkXG4gICAgICAsIHZhbCwgcmVzO1xuICAgIGZvcig7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspaWYoTk9fSE9MRVMgfHwgaW5kZXggaW4gc2VsZil7XG4gICAgICB2YWwgPSBzZWxmW2luZGV4XTtcbiAgICAgIHJlcyA9IGYodmFsLCBpbmRleCwgTyk7XG4gICAgICBpZihUWVBFKXtcbiAgICAgICAgaWYoSVNfTUFQKXJlc3VsdFtpbmRleF0gPSByZXM7ICAgICAgICAgICAgLy8gbWFwXG4gICAgICAgIGVsc2UgaWYocmVzKXN3aXRjaChUWVBFKXtcbiAgICAgICAgICBjYXNlIDM6IHJldHVybiB0cnVlOyAgICAgICAgICAgICAgICAgICAgLy8gc29tZVxuICAgICAgICAgIGNhc2UgNTogcmV0dXJuIHZhbDsgICAgICAgICAgICAgICAgICAgICAvLyBmaW5kXG4gICAgICAgICAgY2FzZSA2OiByZXR1cm4gaW5kZXg7ICAgICAgICAgICAgICAgICAgIC8vIGZpbmRJbmRleFxuICAgICAgICAgIGNhc2UgMjogcmVzdWx0LnB1c2godmFsKTsgICAgICAgICAgICAgICAvLyBmaWx0ZXJcbiAgICAgICAgfSBlbHNlIGlmKElTX0VWRVJZKXJldHVybiBmYWxzZTsgICAgICAgICAgLy8gZXZlcnlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIElTX0ZJTkRfSU5ERVggPyAtMSA6IElTX1NPTUUgfHwgSVNfRVZFUlkgPyBJU19FVkVSWSA6IHJlc3VsdDtcbiAgfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktbWV0aG9kcy5qc1xuLy8gbW9kdWxlIGlkID0gMTYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDkuNC4yLjMgQXJyYXlTcGVjaWVzQ3JlYXRlKG9yaWdpbmFsQXJyYXksIGxlbmd0aClcbnZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19hcnJheS1zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob3JpZ2luYWwsIGxlbmd0aCl7XG4gIHJldHVybiBuZXcgKHNwZWNpZXNDb25zdHJ1Y3RvcihvcmlnaW5hbCkpKGxlbmd0aCk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LXNwZWNpZXMtY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAxNjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBpc0FycmF5ICA9IHJlcXVpcmUoJy4vX2lzLWFycmF5JylcbiAgLCBTUEVDSUVTICA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob3JpZ2luYWwpe1xuICB2YXIgQztcbiAgaWYoaXNBcnJheShvcmlnaW5hbCkpe1xuICAgIEMgPSBvcmlnaW5hbC5jb25zdHJ1Y3RvcjtcbiAgICAvLyBjcm9zcy1yZWFsbSBmYWxsYmFja1xuICAgIGlmKHR5cGVvZiBDID09ICdmdW5jdGlvbicgJiYgKEMgPT09IEFycmF5IHx8IGlzQXJyYXkoQy5wcm90b3R5cGUpKSlDID0gdW5kZWZpbmVkO1xuICAgIGlmKGlzT2JqZWN0KEMpKXtcbiAgICAgIEMgPSBDW1NQRUNJRVNdO1xuICAgICAgaWYoQyA9PT0gbnVsbClDID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfSByZXR1cm4gQyA9PT0gdW5kZWZpbmVkID8gQXJyYXkgOiBDO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1zcGVjaWVzLWNvbnN0cnVjdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxNjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL0RhdmlkQnJ1YW50L01hcC1TZXQucHJvdG90eXBlLnRvSlNPTlxudmFyICRleHBvcnQgID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5SLCAnTWFwJywge3RvSlNPTjogcmVxdWlyZSgnLi9fY29sbGVjdGlvbi10by1qc29uJykoJ01hcCcpfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcubWFwLnRvLWpzb24uanNcbi8vIG1vZHVsZSBpZCA9IDE2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vRGF2aWRCcnVhbnQvTWFwLVNldC5wcm90b3R5cGUudG9KU09OXG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKVxuICAsIGZyb20gICAgPSByZXF1aXJlKCcuL19hcnJheS1mcm9tLWl0ZXJhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE5BTUUpe1xuICByZXR1cm4gZnVuY3Rpb24gdG9KU09OKCl7XG4gICAgaWYoY2xhc3NvZih0aGlzKSAhPSBOQU1FKXRocm93IFR5cGVFcnJvcihOQU1FICsgXCIjdG9KU09OIGlzbid0IGdlbmVyaWNcIik7XG4gICAgcmV0dXJuIGZyb20odGhpcyk7XG4gIH07XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvbGxlY3Rpb24tdG8tanNvbi5qc1xuLy8gbW9kdWxlIGlkID0gMTY0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBmb3JPZiA9IHJlcXVpcmUoJy4vX2Zvci1vZicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXIsIElURVJBVE9SKXtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3JPZihpdGVyLCBmYWxzZSwgcmVzdWx0LnB1c2gsIHJlc3VsdCwgSVRFUkFUT1IpO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWZyb20taXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDE2NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgJy4vcG9wLmNzcyc7XG5pbXBvcnQge1xuICAgIHdpbixcbiAgICBkb2MsXG4gICAgUHJvbWlzZSxcbiAgICBxdWVyeSxcbiAgICBxdWVyeUFsbCxcbiAgICBnZXRSZWN0LFxuICAgIGdldERpc3RhbmNlLFxuICAgIHJhZixcbiAgICBkZWxheVxufSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3Age1xuICAgIGNvbnN0cnVjdG9yKHZpZXdwb3J0KSB7XG4gICAgICAgIHRoaXMucG9wRWwgPSBxdWVyeSh2aWV3cG9ydCwgJyNwb3AnKTtcbiAgICB9XG5cbiAgICByZWFkeSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudEVsID0gcXVlcnkodGhpcy5wb3BFbCwgJy5jb250ZW50Jyk7XG4gICAgICAgICAgICB0aGlzLmNsb3NlRWwgPSBxdWVyeSh0aGlzLnBvcEVsLCAnLnBvcENsb3NlJyk7XG4gICAgICAgICAgICB0aGlzLnRpdGxlRWwgPSBxdWVyeSh0aGlzLnBvcEVsLCAnLnRpdGxlJyk7XG4gICAgICAgICAgICB0aGlzLnRleHRFbCA9IHF1ZXJ5KHRoaXMucG9wRWwsICcudGV4dCcpO1xuICAgICAgICAgICAgdGhpcy5iZzFFbCA9IHF1ZXJ5KHRoaXMucG9wRWwsICcucG9wQmcxJyk7XG4gICAgICAgICAgICB0aGlzLmJnMkVsID0gcXVlcnkodGhpcy5wb3BFbCwgJy5wb3BCZzInKTtcbiAgICAgICAgICAgIHRoaXMuYnRuc0VsID0gcXVlcnkodGhpcy5wb3BFbCwgJy5idG5zJyk7XG4gICAgICAgICAgICB0aGlzLmxlZnRCdG5FbCA9IHF1ZXJ5KHRoaXMucG9wRWwsICcucG9wQnRuLmxlZnQnKTtcbiAgICAgICAgICAgIHRoaXMucmlnaHRCdG5FbCA9IHF1ZXJ5KHRoaXMucG9wRWwsICcucG9wQnRuLnJpZ2h0Jyk7XG5cbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIHRoaXMuY29udGVudEVsLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgICAgdGhpcy5idG5zRWwuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgICB0aGlzLnBvcEVsLmNsYXNzTmFtZSA9IHRoaXMucG9wRWwuY2xhc3NOYW1lLnJlcGxhY2UoJ29wZW4nLCAnY2xvc2UnKTtcblxuICAgICAgICByZXR1cm4gZGVsYXkoNjAwKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucG9wRWwuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICAgICAgICAgdGhpcy5wb3BFbC5jbGFzc05hbWUgPSAnJztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcG9wdXAoe1xuICAgICAgICBzaGFyZWJsZSxcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIHRleHQsXG4gICAgICAgIGJnVHlwZSxcbiAgICAgICAgb25sZWZ0Y2xpY2ssXG4gICAgICAgIG9ucmlnaHRjbGlja1xuICAgIH0pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMucG9wRWwuc3R5bGUuZGlzcGxheSA9ICcnO1xuXG4gICAgICAgICAgICB0aGlzLnRpdGxlRWwudGV4dENvbnRlbnQgPSB0aXRsZTtcbiAgICAgICAgICAgIHRoaXMudGV4dEVsLmlubmVySFRNTCA9IHRleHQ7XG5cbiAgICAgICAgICAgIGlmIChzaGFyZWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucG9wRWwuY2xhc3NOYW1lICs9IGAgc2hhcmVibGUgYmcke2JnVHlwZX1gO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBoYW5kbGVyID0gKGUpID0+IHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5sZWZ0QnRuRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndGFwJywgb25MZWZ0Q2xpY2spO1xuICAgICAgICAgICAgICAgIHRoaXMucmlnaHRCdG5FbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0YXAnLCBvblJpZ2h0Q2xpY2spO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gb25MZWZ0Q2xpY2soZSkge1xuICAgICAgICAgICAgICAgIGhhbmRsZXIoZSkudGhlbigoKSA9PiBvbmxlZnRjbGljayAmJiBvbmxlZnRjbGljaygpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5sZWZ0QnRuRWwuYWRkRXZlbnRMaXN0ZW5lcigndGFwJywgb25MZWZ0Q2xpY2spO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBvblJpZ2h0Q2xpY2soZSkge1xuICAgICAgICAgICAgICAgIGhhbmRsZXIoZSkudGhlbigoKSA9PiBvbnJpZ2h0Y2xpY2sgJiYgb25yaWdodGNsaWNrKCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnJpZ2h0QnRuRWwuYWRkRXZlbnRMaXN0ZW5lcigndGFwJywgb25SaWdodENsaWNrKTtcblxuICAgICAgICAgICAgcmFmKCgpID0+IHRoaXMucG9wRWwuY2xhc3NOYW1lICs9ICcgb3BlbicpO1xuXG4gICAgICAgICAgICBkZWxheSg0MDApLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudEVsLnN0eWxlLnZpc2liaWxpdHkgPSAnJztcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bnNFbC5zdHlsZS52aXNpYmlsaXR5ID0gJyc7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcG9wLmpzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL3BvcC5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjEzLjFAc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL3BvcC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL3BvcC5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3BvcC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDE2N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiI3BvcCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGVmdDogMDtcXG4gICAgdG9wOiAwO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNik7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDk5OTlweCk7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgICAtd2Via2l0LWJveC1wYWNrOiBjZW50ZXI7XFxuICAgIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbiNwb3AgLndyYXAge1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4jcG9wIC5wb3BQYW5lbCB7XFxuICAgIHdpZHRoOiA0LjI2cmVtO1xcbiAgICBoZWlnaHQ6IDcuODRyZW07XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1zaXplOiA4LjUycmVtIDcuODRyZW07XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbiNwb3AgLnBvcFBhbmVsLmxlZnQge1xcbiAgICBsZWZ0OiAwO1xcbiAgICB0b3A6IDA7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IC0xMDAlIDA7XFxufVxcblxcbiNwb3AgLnBvcFBhbmVsLnJpZ2h0IHtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIHRvcDogMDtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMjAwJSAwO1xcbn1cXG5cXG4jcG9wLm9wZW4gLnBvcFBhbmVsLmxlZnQge1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogb3BlbmxlZnR3aW4gMC40cyBlYXNlLW91dCAwcyBmb3J3YXJkcztcXG59XFxuXFxuI3BvcC5vcGVuIC5wb3BQYW5lbC5yaWdodCB7XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBvcGVucmlnaHR3aW4gMC40cyBlYXNlLW91dCAwcyBmb3J3YXJkcztcXG59XFxuXFxuI3BvcC5jbG9zZSAucG9wUGFuZWwubGVmdCB7XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBjbG9zZWxlZnR3aW4gMC40cyBlYXNlLWluIDBzIGZvcndhcmRzO1xcbn1cXG5cXG4jcG9wLmNsb3NlIC5wb3BQYW5lbC5yaWdodCB7XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBjbG9zZXJpZ2h0d2luIDAuNHMgZWFzZS1pbiAwcyBmb3J3YXJkcztcXG59XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIG9wZW5sZWZ0d2luIHtcXG4gICAgMCUge1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogLTEwMCUgMDtcXG4gICAgfVxcblxcbiAgICAxMDAlIHtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMDtcXG4gICAgfVxcbn1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgb3BlbnJpZ2h0d2luIHtcXG4gICAgMCUge1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMjAwJSAwO1xcbiAgICB9XFxuXFxuICAgIDEwMCUge1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMTAwJSAwO1xcbiAgICB9XFxufVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBjbG9zZWxlZnR3aW4ge1xcbiAgICAwJSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XFxuICAgIH1cXG5cXG4gICAgMTAwJSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAtMTAwJSAwO1xcbiAgICB9XFxufVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBjbG9zZXJpZ2h0d2luIHtcXG4gICAgMCUge1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMTAwJSAwO1xcbiAgICB9XFxuXFxuICAgIDEwMCUge1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMjAwJSAwO1xcbiAgICB9XFxufVxcblxcbiNwb3AgLmNvbnRlbnQge1xcbiAgICB3aWR0aDogOC41M3JlbTtcXG4gICAgaGVpZ2h0OiA3Ljg0cmVtO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbiNwb3AgLnBvcEJnMSB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDQuMzZyZW07XFxuICAgIGhlaWdodDogMy4zNDZyZW07XFxuICAgIHJpZ2h0OiA1cHg7XFxuICAgIGJvdHRvbTogMnB4O1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXG59XFxuXFxuI3BvcC5iZzEgLnBvcEJnMSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4jcG9wIC5wb3BCZzIge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiA0LjYyNnJlbTtcXG4gICAgaGVpZ2h0OiAzLjUwNnJlbTtcXG4gICAgcmlnaHQ6IDVweDtcXG4gICAgYm90dG9tOiAycHg7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMDtcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xcbn1cXG5cXG4jcG9wLmJnMiAucG9wQmcyIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbiNwb3Auc2hhcmVibGUgLnBvcEJnMSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4jcG9wLnNoYXJlYmxlIC5wb3BCZzIge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuI3BvcCAucG9wVGlwMSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGVmdDogMC44NjdyZW07XFxuICAgIHRvcDogMS4xcmVtO1xcbiAgICB3aWR0aDogMS44NjdyZW07XFxuICAgIGhlaWdodDogMXJlbTtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAxcmVtO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiB0eXBldGV4dDEgMS41cyBsaW5lYXIgMHMgaW5maW5pdGU7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyB0eXBldGV4dDEge1xcbiAgICAwJSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTAwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDFyZW07XFxuICAgIH1cXG5cXG4gICAgMTYlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMDAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMXJlbTtcXG4gICAgfVxcbiAgICAxNi42NjclIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC04My4zMzMlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC44MzNyZW07XFxuICAgIH1cXG5cXG4gICAgMzMlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC04My4zMzMlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC44MzNyZW07XFxuICAgIH1cXG4gICAgMzMuMzMzJSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNjYuNjY2JSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuNjY2cmVtO1xcbiAgICB9XFxuXFxuICAgIDQ5Ljk5OSUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTY2LjY2NiUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjY2NnJlbTtcXG4gICAgfVxcbiAgICA1MCUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuNXJlbTtcXG4gICAgfVxcblxcbiAgICA2NiUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuNXJlbTtcXG4gICAgfVxcbiAgICA2Ni42NjYlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMy4zMzMlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC4zMzNyZW07XFxuICAgIH1cXG5cXG4gICAgODMlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMy4zMzMlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC4zMzNyZW07XFxuICAgIH1cXG4gICAgODMuMzMzJSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTYuNjY3JSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuMTY3cmVtO1xcbiAgICB9XFxuXFxuICAgIDk5Ljk5OSUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTE2LjY2NyUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjE2N3JlbTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMDtcXG4gICAgfVxcbn1cXG5cXG5cXG4jcG9wIC5wb3BUaXAyIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiAwLjg2N3JlbTtcXG4gICAgdG9wOiA0LjY4cmVtO1xcbiAgICB3aWR0aDogMS44NjdyZW07XFxuICAgIGhlaWdodDogMS41NzNyZW07XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMS41NzNyZW07XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXG4gICAgLXdlYmtpdC1hbmltYXRpb246IHR5cGV0ZXh0MiAycyBsaW5lYXIgMHMgaW5maW5pdGU7XFxufVxcblxcblxcbkAtd2Via2l0LWtleWZyYW1lcyB0eXBldGV4dDIge1xcbiAgICAwJSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTAwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDEuNTczcmVtO1xcbiAgICB9XFxuXFxuICAgIDkuOTk5JSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTAwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDEuNTczcmVtO1xcbiAgICB9XFxuICAgIDEwJSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtOTAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMS40MTVyZW07XFxuICAgIH1cXG5cXG4gICAgMTkuOTk5JSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtOTAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMS40MTVyZW07XFxuICAgIH1cXG4gICAgMjAlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC04MCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAxLjI1OHJlbTtcXG4gICAgfVxcblxcbiAgICAyOS45OTklIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC04MCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAxLjI1OHJlbTtcXG4gICAgfVxcbiAgICAzMCUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTcwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDEuMTAxcmVtO1xcbiAgICB9XFxuXFxuICAgIDM5Ljk5OSUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTcwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDEuMTAxcmVtO1xcbiAgICB9XFxuICAgIDQwJSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNjAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC45NDM4cmVtO1xcbiAgICB9XFxuXFxuICAgIDQ5Ljk5OSUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTYwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuOTQzOHJlbTtcXG4gICAgfVxcbiAgICA1MCUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuNzg2NXJlbTtcXG4gICAgfVxcblxcbiAgICA1OS45OTklIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjc4NjVyZW07XFxuICAgIH1cXG4gICAgNjAlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC00MCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjYyOTJyZW07XFxuICAgIH1cXG5cXG4gICAgNjkuOTk5JSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNDAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC42MjkycmVtO1xcbiAgICB9XFxuICAgIDcwJSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMzAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC40NzE5cmVtO1xcbiAgICB9XFxuXFxuICAgIDc5Ljk5OSUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTMwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuNDcxOXJlbTtcXG4gICAgfVxcbiAgICA4MCUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTIwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuMzE0NnJlbTtcXG4gICAgfVxcblxcbiAgICA4OS45OTklIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0yMCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjMxNDZyZW07XFxuICAgIH1cXG4gICAgOTAlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjE1NzNyZW07XFxuICAgIH1cXG5cXG4gICAgOTkuOTk5JSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC4xNTczcmVtO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XFxuICAgIH1cXG59XFxuXFxuI3BvcCAucG9wSWNvbiB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGVmdDogMS4wNHJlbTtcXG4gICAgdG9wOiAyLjIyNnJlbTtcXG4gICAgd2lkdGg6IDEuOHJlbTtcXG4gICAgaGVpZ2h0OiAyLjI1M3JlbTtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDMuNnJlbSAyLjI1M3JlbTtcXG4gICAgLXdlYmtpdC1hbmltYXRpb246IHNwcml0ZXMgMXMgbGluZWFyIDBzIGluZmluaXRlO1xcbn1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgc3ByaXRlcyB7XFxuICAgIDAlIHtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMDtcXG4gICAgfVxcblxcbiAgICA0OS45OTklIHtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMDtcXG4gICAgfVxcblxcbiAgICA1MCUge1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogLTEuOHJlbSAwO1xcbiAgICB9XFxuXFxuICAgIDEwMCUge1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogLTEuOHJlbSAwO1xcbiAgICB9IFxcbn1cXG5cXG4jcG9wIC50aXRsZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDVyZW07XFxuICAgIGxlZnQ6IDNyZW07XFxuICAgIHRvcDogMS42OTNyZW07XFxuICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gICAgY29sb3I6ICNGRkY7XFxuICAgIHRleHQtc2hhZG93OlxcbiAgICAgICAgMnB4IDAgMnB4IHJnYmEoMCwgMjAzLCAyMjcsIDAuMyksXFxuICAgICAgICAwIDJweCAycHggcmdiYSgwLCAyMDMsIDIyNywgMC4zKSwgXFxuICAgICAgICAwIC0ycHggMnB4IHJnYmEoMCwgMjAzLCAyMjcsIDAuMyksXFxuICAgICAgICAtMnB4IDAgMnB4IHJnYmEoMCwgMjAzLCAyMjcsIDAuMyk7XFxufVxcblxcbiNwb3AgLnRleHQge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiA1cmVtO1xcbiAgICBsZWZ0OiAzcmVtO1xcbiAgICB0b3A6IDIuNTg2cmVtO1xcbiAgICBmb250LXNpemU6IDEycHg7XFxuICAgIGNvbG9yOiAjMDBjYmUzO1xcbiAgICB0ZXh0LXNoYWRvdzpcXG4gICAgICAgIDFweCAwIDFweCByZ2JhKDAsIDIwMywgMjI3LCAwLjMpLFxcbiAgICAgICAgMCAxcHggMXB4IHJnYmEoMCwgMjAzLCAyMjcsIDAuMyksIFxcbiAgICAgICAgMCAtMXB4IDFweCByZ2JhKDAsIDIwMywgMjI3LCAwLjMpLFxcbiAgICAgICAgLTFweCAwIDFweCByZ2JhKDAsIDIwMywgMjI3LCAwLjMpO1xcbn1cXG5cXG4jcG9wIC5wb3BDbG9zZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGVmdDogMDtcXG4gICAgYm90dG9tOiAwLjU0NnJlbTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMS4ycmVtO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEuMnJlbSAxLjJyZW07XFxufVxcblxcbiNwb3Auc2hhcmVibGUgLnBvcENsb3NlIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuI3BvcCAuYnRucyB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICAtd2Via2l0LWJveC1wYWNrOiBjZW50ZXI7XFxuICAgIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7IFxcbiAgICBwYWRkaW5nLXRvcDogMC41cmVtO1xcbn1cXG5cXG4jcG9wLnNoYXJlYmxlIC5idG5ze1xcbiAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG59XFxuXFxuI3BvcCAucG9wQnRuIHtcXG4gICAgd2lkdGg6IDIuNjhyZW07XFxuICAgIGhlaWdodDogMC43NzNyZW07XFxuICAgIGxpbmUtaGVpZ2h0OiAwLjc3M3JlbTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBjb2xvcjogI0ZGRjtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxuICAgIG1hcmdpbjogMCAwLjRyZW07XFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4yNS4wQGNzcy1sb2FkZXIhLi9zcmMvcG9wLmNzc1xuLy8gbW9kdWxlIGlkID0gMTY4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBndWlkZTogeyAvLyDlvIDlnLrlvJXlr7xcbiAgICAgICAgdHlwZTogJ3RpcCcsXG4gICAgICAgIHRpcDogJ+aVo+W4g+WcqOWuh+WumeS4reeahOelnuenmOWKm+mHj++8jOaJvuWIsOS7luS7rO+8jOelnuenmOKAnOm4oeiFv+KAneWcqOetieS9oCcsXG4gICAgICAgIGJnVHlwZTogMVxuICAgIH0sXG5cbiAgICBmb3VuZDU6IHsgLy8g5om+5YiwNeS4qlxuICAgICAgICB0eXBlOiAndGlwJyxcbiAgICAgICAgdGlwOiAn6LWe77yB5bey5Y+R546wNeS4qua4uOaIj+aYn+eQg+OAguelnuenmOKAnem4oeiFv+KAneWwseWcqOaYn+epuua3seWkhO+8jOetieS9oOWTn++8gScsXG4gICAgICAgIGJnVHlwZTogMlxuICAgIH0sXG5cbiAgICBmb3VuZDE1OiB7IC8vIOaJvuWIsDE15LiqXG4gICAgICAgIHR5cGU6ICd0aXAnLFxuICAgICAgICB0aXA6ICfllYrvvIHov5jlt6415Liq77yBPGJyPuemu+KAnOm4oeiFv+KAnei/mOW3rjXkuKrvvIEnLFxuICAgICAgICBiZ1R5cGU6IDNcbiAgICB9LFxuXG4gICAgZm91bmQyMDogeyAvLyDmib7liLAyMOS4qlxuICAgICAgICB0eXBlOiAncG9wdXAnLFxuICAgICAgICB0aXRsZTogJ+aJvuWIsOWFqOmDqOa4uOaIj+aYn+eQg++8gScsXG4gICAgICAgIHRleHQ6ICfmiJHljrvvvIHkvaDov5jnnJ/mib7lhajkuobvvIE8YnI+57uZ6Leq77yM6K+35pS25LiL5oiR55qE6bih6IW/77yBJyxcbiAgICAgICAgYmdUeXBlOiAyXG4gICAgfSxcblxuICAgIGJsYWNrc2hlZXB3YWxsOiB7IC8vIOWcsOWbvuWFqOW8gFxuICAgICAgICB0eXBlOiAncG9wdXAnLFxuICAgICAgICB0aXRsZTogJ+aJvuWIsOWFqOmDqOa4uOaIj+aYn+eQg++8gScsXG4gICAgICAgIHRleHQ6ICfli6TlpYvnmoTlsJHlubTvvIzlroflrpnmmK/kuI3mmK/lhYXmu6HkuoblpaXlppnvvIzljrtUR1DnmoTmuLjmiI/kuJbnlYzvvIzpgqPph4zkuZ/mmK/kuIDmoLfjgIInLFxuICAgICAgICBiZ1R5cGU6IDFcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3RleHRDb25maWcuanMiXSwic291cmNlUm9vdCI6IiJ9