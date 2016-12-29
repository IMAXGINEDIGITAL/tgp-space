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
	
	var _helloWorld = __webpack_require__(140);
	
	var _helloWorld2 = _interopRequireDefault(_helloWorld);
	
	var _star = __webpack_require__(143);
	
	var _star2 = _interopRequireDefault(_star);
	
	var _elements = __webpack_require__(144);
	
	var _elements2 = _interopRequireDefault(_elements);
	
	var _found = __webpack_require__(149);
	
	var _found2 = _interopRequireDefault(_found);
	
	var _map = __webpack_require__(152);
	
	var _map2 = _interopRequireDefault(_map);
	
	var _ticker = __webpack_require__(155);
	
	var _ticker2 = _interopRequireDefault(_ticker);
	
	var _pop = __webpack_require__(171);
	
	var _pop2 = _interopRequireDefault(_pop);
	
	var _tip = __webpack_require__(174);
	
	var _tip2 = _interopRequireDefault(_tip);
	
	var _share = __webpack_require__(177);
	
	var _share2 = _interopRequireDefault(_share);
	
	var _music = __webpack_require__(187);
	
	var _music2 = _interopRequireDefault(_music);
	
	var _textConfig = __webpack_require__(190);
	
	var _textConfig2 = _interopRequireDefault(_textConfig);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var preload = _util.win.assetsPreload,
	    items = _util.win.assetsItems;
	
	
	var viewport = (0, _util.query)(_util.doc.body, '#game');
	var scroller = void 0;
	var ticker = void 0;
	var stage = void 0;
	var helloWorld = void 0;
	var star = void 0;
	var elements = void 0;
	var found = void 0;
	var map = void 0;
	var pop = void 0;
	var tip = void 0;
	var share = void 0;
	var music = void 0;
	
	function showTip(config, data) {
	    return tip.show({
	        tip: config.tip,
	        bgType: config.bgType
	    });
	}
	
	function showPop(config, data) {
	    scroller && (scroller.enable = false);
	
	    var text = typeof config.text === 'function' ? config.text(data) : config.text;
	
	    return pop.popup({
	        title: config.title,
	        text: text,
	        shareble: config.shareble,
	        bgType: config.bgType,
	        onleftclick: function onleftclick() {
	            _util.Promise.all([pop.close(), share.show()]).then(function () {
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
	
	function shareWx(data) {
	    share.shareWx({
	        title: '离开地表！和TGP去看看5000光年外的星辰大海',
	        desc: '\u832B\u832B\u6E38\u620F\u5B87\u5B99\u6DF1\u4E0D\u89C1\u5E95\uFF0C\u6211' + (data.m * 60 + data.n) + '\u79D2\u5C31\u6ED1\u4E86' + data.n + '\u767E\u4E07\u5149\u5E74',
	        link: 'http://mp.imaxgine.com/tgp/space/index.html',
	        imgUrl: 'http://mp.imaxgine.com/tgp/space/assets/logo.jpg'
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
	    // music
	    music = new _music2.default(viewport, items);
	    return music.ready();
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
	    var scrollSlowRatio = 1.8;
	    scroller = new _scroller2.default(stage.width, stage.height, stage.vw, stage.vh, scrollSlowRatio, stage.dpr);
	    scroller.enable = false;
	    return scroller.ready();
	}).then(function () {
	    // things
	    var promises = [];
	
	    star = new _star2.default(stage, items);
	    promises.push(star.ready());
	
	    elements = new _elements2.default(stage, items);
	    promises.push(elements.ready());
	
	    return _util.Promise.all(promises);
	}).then(function () {
	    // render
	    var firstRendered = false;
	    var scrollX = 0;
	    var scrollY = 0;
	    var starRollY = stage.vh;
	    var starRollSpeed = 0.4;
	    var starRollId = ticker.add(function () {
	        starRollY -= starRollSpeed;
	        if (starRollY < 0) {
	            starRollY = stage.vh;
	        }
	    });
	    var showTextId = void 0;
	    var showGlodId = void 0;
	    var flyCoinId = void 0;
	    var hoverSlice = stage.getHoverSlice(0, 0);
	    var focusSlice = stage.getFocusSlice(stage.sliceWidth / 2, stage.sliceHeight / 2);
	
	    scroller.on('scrollstart', function (e) {});
	
	    scroller.on('scrolling', function (e) {
	        scrollX = e.x;
	        scrollY = e.y;
	        hoverSlice = stage.getHoverSlice(scrollX, scrollY);
	        focusSlice = stage.getFocusSlice(scrollX + stage.sliceWidth / 2, scrollY + stage.sliceHeight / 2);
	    });
	
	    scroller.on('scrollend', function (e) {
	        if (focusSlice) {
	            if (focusSlice.type >= 2) {
	                showTextId = ticker.add(elements.showText(focusSlice));
	            }
	        }
	    });
	
	    scroller.on('tap', function (e) {
	        if (e.originalEvent.target === stage.canvas) {
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
	        found && found.update(stage.specialAmount, stage.specialFound, stage.totalAmount, stage.hoveredAmount);
	
	        elements.drawImages(hoverSlice, focusSlice, scrollX, scrollY, e);
	
	        stage.offscreenRender.clearRect(0, 0, stage.vw, stage.vh);
	        stage.offscreenRender.drawImage(star.image, 0, starRollY, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);
	        stage.offscreenRender.drawImage(elements.canvas, 0, 0, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);
	
	        stage.render.clearRect(0, 0, stage.vw, stage.vh);
	        stage.render.drawImage(stage.offscreenCanvas, 0, 0, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);
	    });
	}).then(function () {
	    // show helloworld
	    var repeat = 3;
	    var promise = _util.Promise.resolve();
	
	    for (var i = 0; i < repeat; i++) {
	        promise = promise.then(function () {
	            var tickerId = ticker.add(helloWorld.play());
	            return ticker.end(tickerId);
	        }).then(function () {
	            return (0, _util.delay)(500 + Math.random() * 200);
	        });
	    }
	
	    return promise.then(function () {
	        return helloWorld.start(function () {
	            return music.play();
	        });
	    });
	}).then(function () {
	    // map
	    map = new _map2.default(viewport, stage.hSlice, stage.vSlice);
	
	    var randomTextId = void 0;
	
	    scroller.on('scrollstart', function (e) {
	        if (randomTextId == null) {
	            randomTextId = ticker.add(map.randomText());
	        }
	    });
	
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
	            ticker.delete(randomTextId);
	            randomTextId = null;
	
	            map.text(focusSlice.distance);
	        }
	    });
	
	    return map.ready();
	}).then(function () {
	    // found
	    found = new _found2.default(viewport, items);
	
	    found.on('update', function (_ref) {
	        var found = _ref.found,
	            amount = _ref.amount,
	            total = _ref.total,
	            focus = _ref.focus;
	
	        var config = void 0;
	        var data = {};
	
	        data.m = parseInt(ticker.elapsed / 1000 / 60);
	        data.s = parseInt(ticker.elapsed / 1000 - 60 * data.m);
	        data.n = found;
	
	        shareWx(data);
	
	        if (found === amount && focus === total) {
	            config = _textConfig2.default['gg'];
	        } else if (focus === total) {
	            config = _textConfig2.default['blacksheepwall'];
	        } else if (found === 1) {
	            config = _textConfig2.default['gl'];
	        } else {
	            config = _textConfig2.default['found' + found];
	        }
	
	        if (config && !config.shown) {
	            config.shown = true;
	            if (config.type === 'tip') {
	                showTip(config, data);
	            } else if (config.type === 'popup') {
	                showPop(config, data);
	            }
	        }
	    });
	
	    return found.ready();
	}).then(function () {
	    // pop
	    pop = new _pop2.default(viewport);
	    return pop.ready();
	}).then(function () {
	    // tip
	    tip = new _tip2.default(viewport);
	    return tip.ready();
	}).then(function () {
	    // share
	    share = new _share2.default(viewport, items);
	    return share.ready();
	}).then(function () {
	    // bone
	    var boneX = stage.width / 2 - stage.vw / 2;
	    var boneY = stage.height - stage.vh / 2;
	    scroller.enable = true;
	    scroller.scrollTo(boneX, boneY);
	})
	// .then(() => delay(2000))
	.then(function () {// show guide
	    // showTip(textConfig.found5);
	    // showPop(textConfig.gg, {
	    //     m: 1,
	    //     s: 5,
	    //     n: 6
	    // });
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
	exports.caf = exports.raf = exports.getDistance = exports.getRect = exports.queryAll = exports.query = exports.img2Canvas = exports.delay = exports.domready = exports.appendStyle = exports.createjs = exports.Promise = exports.defer = exports.doc = exports.win = undefined;
	
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
	        var dpr = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
	        (0, _classCallCheck3.default)(this, Scroller);
	
	        var _this = (0, _possibleConstructorReturn3.default)(this, (Scroller.__proto__ || (0, _getPrototypeOf2.default)(Scroller)).call(this));
	
	        _this._isScrolling = false;
	        _this._enable = false;
	        _this._scale = scale;
	        _this.dpr = dpr;
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
	                        ex: _this2.x + e.touch.clientX * _this2.dpr,
	                        ey: _this2.y + e.touch.clientY * _this2.dpr
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
	
	var _amfeEnv = __webpack_require__(122);
	
	__webpack_require__(129);
	
	var _util = __webpack_require__(6);
	
	var _canvas = __webpack_require__(131);
	
	var _sliceConfig = __webpack_require__(139);
	
	var _sliceConfig2 = _interopRequireDefault(_sliceConfig);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var sliceWidth = 750;
	var sliceHeight = 1334;
	var hSlice = 9;
	var vSlice = 14;
	var width = sliceWidth * hSlice;
	var height = sliceHeight * vSlice;
	var dpr = _amfeEnv.os.isIOS ? 2 : 1;
	
	var Stage = function (_CanvasRender) {
	    (0, _inherits3.default)(Stage, _CanvasRender);
	
	    function Stage(viewport) {
	        (0, _classCallCheck3.default)(this, Stage);
	
	        var stageEl = (0, _util.query)(viewport, '#stage');
	
	        var _getRect = (0, _util.getRect)(viewport),
	            vw = _getRect.width,
	            vh = _getRect.height;
	
	        vw *= dpr;
	        vh *= dpr;
	
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
	        _this.dpr = dpr;
	
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
	
	            var ratio = 0.8;
	            var slice = void 0;
	            if (dx > this.sliceWidth * (1 - ratio) / 2 && dx < this.sliceWidth * (1 - (1 - ratio) / 2) && dy > this.sliceHeight * (1 - ratio) / 2 && dy < this.sliceHeight * (1 - (1 - ratio) / 2)) {
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

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Version = exports.params = exports.thirdapp = exports.aliapp = exports.os = exports.browser = undefined;
	
	var _aliapp = __webpack_require__(123);
	
	var _aliapp2 = _interopRequireDefault(_aliapp);
	
	var _browser = __webpack_require__(126);
	
	var _browser2 = _interopRequireDefault(_browser);
	
	var _os = __webpack_require__(125);
	
	var _os2 = _interopRequireDefault(_os);
	
	var _thirdapp = __webpack_require__(127);
	
	var _thirdapp2 = _interopRequireDefault(_thirdapp);
	
	var _params = __webpack_require__(128);
	
	var _params2 = _interopRequireDefault(_params);
	
	var _version = __webpack_require__(124);
	
	var _version2 = _interopRequireDefault(_version);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.browser = _browser2.default;
	exports.os = _os2.default;
	exports.aliapp = _aliapp2.default;
	exports.thirdapp = _thirdapp2.default;
	exports.params = _params2.default;
	exports.Version = _version2.default;

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _version = __webpack_require__(124);
	
	var _version2 = _interopRequireDefault(_version);
	
	var _os = __webpack_require__(125);
	
	var _os2 = _interopRequireDefault(_os);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ua = window.navigator.userAgent;
	var aliapp = false;
	
	var windvane;
	var matched;
	var appname = '';
	var platform = '';
	var version = '';
	
	if (matched = ua.match(/WindVane[\/\s]([\d\.\_]+)/i)) {
	    windvane = matched[1];
	}
	
	if (matched = ua.match(/AliApp\(([A-Z\-]+)\/([\d\.]+)\)/i)) {
	    aliapp = true;
	    appname = matched[1];
	    version = matched[2];
	    /* istanbul ignore next */
	    if (appname.indexOf('-PD') > 0) {
	        /* istanbul ignore if */
	        if (_os2.default.isIOS) {
	            platform = 'iPad';
	        } else if (_os2.default.isAndroid) {
	            platform = 'AndroidPad';
	        } else {
	            platform = _os2.default.name;
	        }
	    } else {
	        platform = _os2.default.name;
	    }
	}
	
	// 兼容手淘的一个bug，在webview初始化异常时，在ua中只包含TBIOS字样，也认为是手淘webview。
	/* istanbul ignore if */
	if (!appname && ua.indexOf('TBIOS') > 0) {
	    appname = 'TB';
	}
	
	// 判断poplayer
	// poplayer相关信息，在poplayer会有该字段，形如 window._ua_popLayer = 'PopLayer/1.3.4'
	// poplayer信息不在ua中是因为在IOS下，修改poplayer层的ua会导致所有webview的ua改变，所以只能写在全局变量中
	var poplayerInfo = window._ua_popLayer || '';
	var poplayer = false;
	var poplayerVersion = '';
	if (poplayerInfo && (matched = poplayerInfo.match(/PopLayer\/([\d\.]+)/i))) {
	    poplayer = true;
	    poplayerVersion = matched[1];
	}
	
	if (aliapp) {
	    aliapp = {
	        windvane: new _version2.default(windvane || '0.0.0'),
	        appname: appname || 'unkown',
	        version: new _version2.default(version || '0.0.0'),
	        platform: platform || _os2.default.name,
	        poplayer: poplayer || false,
	        poplayerVersion: new _version2.default(poplayerVersion || '0.0.0')
	    };
	}
	
	exports.default = aliapp;

/***/ },
/* 124 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Version = function () {
	    _createClass(Version, null, [{
	        key: 'compare',
	        value: function compare(v1, v2) {
	            v1 = v1.toString().split('.');
	            v2 = v2.toString().split('.');
	
	            for (var i = 0; i < v1.length || i < v2.length; i++) {
	                var n1 = parseInt(v1[i], 10);
	                var n2 = parseInt(v2[i], 10);
	
	                /* istanbul ignore if */
	                if (isNaN(n1)) {
	                    n1 = 0;
	                }
	
	                /* istanbul ignore if */
	                if (isNaN(n2)) {
	                    n2 = 0;
	                }
	                if (n1 < n2) {
	                    return -1;
	                } else if (n1 > n2) {
	                    return 1;
	                }
	            }
	            return 0;
	        }
	    }]);
	
	    function Version(v) {
	        _classCallCheck(this, Version);
	
	        if (v) {
	            this.val = v.toString();
	        } else {
	            this.val = '';
	        }
	    }
	
	    _createClass(Version, [{
	        key: 'gt',
	        value: function gt(v) {
	            return Version.compare(this, v) > 0;
	        }
	    }, {
	        key: 'gte',
	        value: function gte(v) {
	            return Version.compare(this, v) >= 0;
	        }
	    }, {
	        key: 'lt',
	        value: function lt(v) {
	            return Version.compare(this, v) < 0;
	        }
	    }, {
	        key: 'lte',
	        value: function lte(v) {
	            return Version.compare(this, v) <= 0;
	        }
	    }, {
	        key: 'eq',
	        value: function eq(v) {
	            return Version.compare(this, v) === 0;
	        }
	    }, {
	        key: 'toString',
	        value: function toString() {
	            return this.val.toString();
	        }
	    }]);
	
	    return Version;
	}();
	
	exports.default = Version;

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _version = __webpack_require__(124);
	
	var _version2 = _interopRequireDefault(_version);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ua = window.navigator.userAgent;
	var os;
	var matched;
	
	if (matched = ua.match(/Windows\sPhone\s(?:OS\s)?([\d\.]+)/)) {
	    os = {
	        name: 'Windows Phone',
	        isWindowsPhone: true,
	        version: new _version2.default(matched[1])
	    };
	} else if (!!ua.match(/Safari/) && (matched = ua.match(/Android[\s\/]([\d\.]+)/))) {
	    os = {
	        version: new _version2.default(matched[1])
	    };
	
	    if (ua.match(/Mobile\s+Safari/)) {
	        os.name = 'Android';
	        os.isAndroid = true;
	    } else {
	        os.name = 'AndroidPad';
	        os.isAndroidPad = true;
	    }
	} else if (matched = ua.match(/(iPhone|iPad|iPod)/)) {
	    var name = matched[1];
	
	    if (matched = ua.match(/OS ([\d_\.]+) like Mac OS X/)) {
	        os = {
	            name: name,
	            isIPhone: name === 'iPhone' || name === 'iPod',
	            isIPad: name === 'iPad',
	            isIOS: true,
	            version: new _version2.default(matched[1].split('_').join('.'))
	        };
	    }
	}
	
	if (!os) {
	    os = {
	        name: 'unknown',
	        version: new _version2.default('0.0.0')
	    };
	}
	
	exports.default = os;

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _version = __webpack_require__(124);
	
	var _version2 = _interopRequireDefault(_version);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ua = window.navigator.userAgent;
	var browser;
	var matched;
	
	if (matched = ua.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/)) {
	    browser = {
	        name: 'UC',
	        isUC: true,
	        version: new _version2.default(matched[1])
	    };
	} else if (matched = ua.match(/MQQBrowser\/([\d\.]+)/)) {
	    browser = {
	        name: 'QQ',
	        isQQ: true,
	        version: new _version2.default(matched[1])
	    };
	} else if (matched = ua.match(/(?:Firefox|FxiOS)\/([\d\.]+)/)) {
	    browser = {
	        name: 'Firefox',
	        isFirefox: true,
	        version: new _version2.default(matched[1])
	    };
	} else if ((matched = ua.match(/MSIE\s([\d\.]+)/)) || (matched = ua.match(/IEMobile\/([\d\.]+)/))) {
	
	    browser = {
	        version: new _version2.default(matched[1])
	    };
	
	    if (ua.match(/IEMobile/)) {
	        browser.name = 'IEMobile';
	        browser.isIEMobile = true;
	    } else {
	        browser.name = 'IE';
	        browser.isIE = true;
	    }
	
	    if (ua.match(/Android|iPhone/)) {
	        browser.isIELikeWebkit = true;
	    }
	} else if (matched = ua.match(/(?:Chrome|CriOS)\/([\d\.]+)/)) {
	    browser = {
	        name: 'Chrome',
	        isChrome: true,
	        version: new _version2.default(matched[1])
	    };
	
	    if (ua.match(/Version\/[\d+\.]+\s*Chrome/)) {
	        browser.name = 'Chrome Webview';
	        browser.isWebview = true;
	    }
	} else if (!!ua.match(/Safari/) && (matched = ua.match(/Android[\s\/]([\d\.]+)/))) {
	    browser = {
	        name: 'Android',
	        isAndroid: true,
	        version: new _version2.default(matched[1])
	    };
	} else if (ua.match(/iPhone|iPad|iPod/)) {
	    if (ua.match(/Safari/) && (matched = ua.match(/Version\/([\d\.]+)/))) {
	        browser = {
	            name: 'Safari',
	            isSafari: true,
	            version: new _version2.default(matched[1])
	        };
	    } else if (matched = ua.match(/OS ([\d_\.]+) like Mac OS X/)) {
	        browser = {
	            name: 'iOS Webview',
	            isWebview: true,
	            version: new _version2.default(matched[1].replace(/\_/g, '.'))
	        };
	    }
	}
	
	/* istanbul ignore if */
	if (!browser) {
	    browser = {
	        name: 'unknown',
	        version: new _version2.default('0.0.0')
	    };
	}
	
	exports.default = browser;

/***/ },
/* 127 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var ua = window.navigator.userAgent;
	
	var thirdapp;
	
	if (ua.match(/Weibo/i)) {
	    /**
	     * @type {Object}
	     * @memberof lib.env
	     * @property {String} appname - 操作系统名称，比如Weibo/Weixin/unknown等
	     * @property {Boolean} isWeibo - 是否是微博
	     * @property {Boolean} isWeixin - 是否是微信
	     */
	    thirdapp = {
	        appname: 'Weibo',
	        isWeibo: true
	    };
	} else if (ua.match(/MicroMessenger/i)) {
	    thirdapp = {
	        appname: 'Weixin',
	        isWeixin: true
	    };
	    /* istanbul ignore next */
	} else {
	        /* istanbul ignore next */
	        thirdapp = false;
	    }
	
	exports.default = thirdapp;

/***/ },
/* 128 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var params = {};
	var search = window.location.search.replace(/^\?/, '');
	
	if (search) {
	    var splits = search.split('&');
	    for (var i = 0; i < splits.length; i++) {
	        splits[i] = splits[i].split('=');
	        try {
	            params[splits[i][0]] = decodeURIComponent(splits[i][1]);
	            /* istanbul ignore next */
	        } catch (e) {
	            /* istanbul ignore next */
	            params[splits[i][0]] = splits[i][1];
	        }
	    }
	}
	
	exports.default = params;

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(130);
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
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "#stage {\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    left: 0;\n    top: 0;\n    -webkit-tranform: translateZ(9px);\n}", ""]);
	
	// exports


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CanvasRender = exports.CanvasImage = undefined;
	
	var _slicedToArray2 = __webpack_require__(132);
	
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
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _isIterable2 = __webpack_require__(133);
	
	var _isIterable3 = _interopRequireDefault(_isIterable2);
	
	var _getIterator2 = __webpack_require__(136);
	
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
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(134), __esModule: true };

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(75);
	__webpack_require__(10);
	module.exports = __webpack_require__(135);

/***/ },
/* 135 */
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
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(137), __esModule: true };

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(75);
	__webpack_require__(10);
	module.exports = __webpack_require__(138);

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(23)
	  , get      = __webpack_require__(58);
	module.exports = __webpack_require__(18).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 139 */
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
	    '10': {
	        distance: '5000光年',
	        type: 2
	    },
	    '13': {
	        type: 2
	    },
	    '15': {
	        type: 1
	    },
	    '19': {
	        distance: '450光年',
	        type: 2
	    },
	    '21': {
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 380,
	        coinY: 220
	    },
	    '23': {
	        distance: '1400光年',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 380,
	        coinY: 220
	    },
	    '25': {
	        type: 2
	    },
	    '28': {
	        distance: '980光年',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 380,
	        coinY: 220
	    },
	    '31': {
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 380,
	        coinY: 220
	    },
	    '33': {
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 380,
	        coinY: 220
	    },
	    '38': {
	        distance: '4000光年',
	        type: 2
	    },
	    '41': {
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 380,
	        coinY: 220
	    },
	    '43': {
	        distance: '400光年',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 380,
	        coinY: 220
	    },
	    '46': {
	        distance: '8.6光年',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 380,
	        coinY: 220
	    },
	    '47': {
	        type: 1
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
	    '66': {
	        type: 2
	    },
	    '69': {
	        distance: '101.728亿公里',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 380,
	        coinY: 220
	    },
	    '74': {
	        distance: '59亿公里',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 380,
	        coinY: 220
	    },
	    '76': {
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 380,
	        coinY: 220
	    },
	    '77': {
	        type: 1
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
	        coinX: 380,
	        coinY: 220
	    },
	    '84': {
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 380,
	        coinY: 220
	    },
	    '87': {
	        distance: '12.8亿公里',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 380,
	        coinY: 220
	    },
	    '94': {
	        distance: '1.496亿公里',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 380,
	        coinY: 220
	    },
	    '96': {
	        type: 1
	    },
	    '97': {
	        type: 1
	    },
	    '101': {
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
	        coinX: 380,
	        coinY: 220
	    },
	    '109': {
	        distance: '5500万公里',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 380,
	        coinY: 220
	    },
	    '112': {
	        distance: '4150万公里',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 380,
	        coinY: 220
	    },
	    '114': {
	        type: 2
	    },
	    '115': {
	        type: 1
	    },
	    '120': {
	        type: 1,
	        isEarth: true
	    },
	    '119': {
	        type: 1
	    },
	    '121': {
	        distance: '0公里',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 380,
	        coinY: 220,
	        isEarth: true
	    },
	    '122': {
	        type: 1,
	        isEarth: true
	    },
	    '123': {
	        distance: '38.44万公里',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 380,
	        coinY: 220
	    },
	    '124': {
	        type: 2
	    }
	};

/***/ },
/* 140 */
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
	
	__webpack_require__(141);
	
	var _util = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var HelloWorld = function () {
	    function HelloWorld(viewport, items) {
	        (0, _classCallCheck3.default)(this, HelloWorld);
	
	        this.wrapEl = (0, _util.query)(viewport, '#helloworld');
	        this.textEl = (0, _util.query)(this.wrapEl, '.helloworld');
	        this.startEl = (0, _util.query)(this.wrapEl, '.start');
	        // this.textEl.style.backgroundImage = `url(${items['helloworld'].src})`;
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
	                    _this.textEl.style.backgroundPositionX = '-' + index * 10 + 'rem';
	                } else {
	                    _this.textEl.style.backgroundPositionX = '0';
	                    return true;
	                }
	            };
	        }
	    }, {
	        key: 'start',
	        value: function start(onclick) {
	            var _this2 = this;
	
	            return new _util.Promise(function (resolve, reject) {
	                _this2.startEl.style.display = '';
	                _this2.startEl.addEventListener('tap', function (e) {
	                    onclick && onclick();
	                    _this2.wrapEl.className += ' fadeout';
	                    (0, _util.delay)(650).then(function () {
	                        return _this2.wrapEl.style.display = 'none';
	                    }).then(resolve);
	                });
	            });
	        }
	    }, {
	        key: 'ready',
	        value: function ready() {
	            var _this3 = this;
	
	            return new _util.Promise(function (resolve, reject) {
	                _this3.wrapEl.style.display = '';
	
	                resolve();
	            });
	        }
	    }]);
	    return HelloWorld;
	}();
	
	exports.default = HelloWorld;

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(142);
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
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "#helloworld {\n    width: 100%;\n    height: 100%;\n    left: 0;\n    top: 0;\n    position: absolute;\n    -webkit-tranform: translateZ(9999px);\n    background-position: center center;\n    background-size: cover;\n    background-repeat: no-repeat;\n    opacity: 1;\n    -webkit-transition: opacity 0.6s ease-out 0s;\n}\n\n#helloworld .helloworld {\n    width: 100%;\n    height: 100%;\n    background-position: 0 center;\n    background-size: 60rem 17.786rem;\n    background-repeat: no-repeat;\n}\n\n#helloworld.fadeout {\n    opacity: 0;\n}\n\n#helloworld .start {\n    position: absolute;\n    width: 100%;\n    left: 0;\n    bottom: 3rem;\n    display: -webkit-box;\n    -webkit-box-pack: center;\n    -webkit-box-align: center;\n}\n\n#helloworld .start .arrow-left,\n    #helloworld .start .arrow-right {\n    width: 0.5333rem;\n    height: 0.2667rem;\n    background-repeat: no-repeat;\n    background-size: 1.0667rem 0.2667rem;\n}\n\n#helloworld .start .arrow-left {\n    background-position: 150% center;\n    -webkit-animation: moveleft 0.6s linear 0s infinite;\n}\n\n@-webkit-keyframes moveleft {\n    0% {\n        background-position: 150% center;\n    }\n\n    49.999% {\n        background-position: 150% center;\n    }\n    50% {\n        background-position: 0 center;\n    }\n\n    99.999% {\n        background-position: 0 center;\n    }\n    100% {\n        background-position: 150% center;\n    }\n}\n\n#helloworld .start .arrow-right {\n    background-position: 50% center;\n    -webkit-animation: moveright 0.6s linear 0s infinite;\n}\n\n@-webkit-keyframes moveright {\n    0% {\n        background-position: 50% center;\n    }\n\n    49.999% {\n        background-position: 50% center;\n    }\n    50% {\n        background-position: 100% center;\n    }\n\n    99.999% {\n        background-position: 100% center;\n    }\n    100% {\n        background-position: 50% center;\n    }\n}\n\n#helloworld .start .text {\n    margin: 0 0.2rem;\n    font-size: 12px;\n    color: #00cbe3;\n    text-shadow:\n        1px 0 1px rgba(0, 203, 227, 0.3),\n        0 1px 1px rgba(0, 203, 227, 0.3), \n        0 -1px 1px rgba(0, 203, 227, 0.3),\n        -1px 0 1px rgba(0, 203, 227, 0.3);\n}", ""]);
	
	// exports


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
	
	var _canvas = __webpack_require__(131);
	
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
	exports.default = undefined;
	
	var _slicedToArray2 = __webpack_require__(132);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _keys = __webpack_require__(145);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _getIterator2 = __webpack_require__(136);
	
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
	
	var _amfeCubicbezier = __webpack_require__(148);
	
	var Bezier = _interopRequireWildcard(_amfeCubicbezier);
	
	var _util = __webpack_require__(6);
	
	var _event = __webpack_require__(105);
	
	var _event2 = _interopRequireDefault(_event);
	
	var _canvas = __webpack_require__(131);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var originSliceWidth = 750;
	var originSliceHeight = 1334;
	
	var Elements = function (_CanvasImage) {
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
	                if (shown == null) {
	                    var _ret = function () {
	                        var delay = 750;
	                        var duration = 500;
	
	                        return {
	                            v: function v(_ref) {
	                                var delta = _ref.delta,
	                                    elapsed = _ref.elapsed;
	
	                                if (elapsed <= delay) {
	                                    slice.textAlpha = 0;
	                                    focus.shown = 1;
	                                } else if (elapsed - delay <= duration) {
	                                    slice.textAlpha = (elapsed - delay) / duration;
	                                    focus.shown = 1;
	                                } else {
	                                    slice.textAlpha = 1;
	                                    focus.shown = 2;
	                                }
	
	                                return focus.shown === 2;
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
	                if (found == null) {
	                    var _ret2 = function () {
	                        var duration = 1000;
	
	                        return {
	                            v: function v(_ref2) {
	                                var delta = _ref2.delta,
	                                    elapsed = _ref2.elapsed;
	
	                                if (elapsed <= duration) {
	                                    slice.goldY = y1 + (y2 - y1) * elapsed / duration;
	                                    focus.found = 1;
	                                } else {
	                                    slice.goldY = y2;
	                                    focus.found = 2;
	                                }
	
	                                return focus.found === 2;
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
	        value: function drawImages(hovers, focus, scrollX, scrollY, e) {
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
	                            isEarth = hover.isEarth;
	
	
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
	                                coin = slice.coin,
	                                flow = slice.flow;
	
	
	                            var offsetY = 0;
	
	                            if (!isEarth) {
	                                offsetY = flow.range[0] + (flow.range[1] - flow.range[0]) * flow.ease(flow.elapsed / flow.duration);
	                                if (flow.elapsed > flow.duration) {
	                                    offsetY = flow.range[1];
	                                    flow.range = [flow.range[1], flow.range[0]];
	                                    flow.ease = flow.ease === Bezier.easeIn ? Bezier.easeOut : Bezier.easeIn;
	                                    flow.elapsed = 0;
	                                } else {
	                                    flow.elapsed += e.delta;
	                                }
	                            }
	
	                            canvasImage.render.clearRect(0, 0, width, height);
	
	                            if (type >= 1) {
	                                canvasImage.render.drawImage(staticImg, 0, 0 + offsetY, width, height);
	                            }
	
	                            if (type >= 2) {
	                                canvasImage.render.save();
	                                canvasImage.render.globalAlpha = textAlpha;
	                                canvasImage.render.drawImage(textImg, 0, 0, width, height);
	                                canvasImage.render.restore();
	                            }
	
	                            if (type >= 3) {
	
	                                if (slice.goldY != null) {
	                                    var goldY = slice.goldY;
	                                    var _y = goldY * this.scaleRatio;
	                                    canvasImage.render.drawImage(goldImg, 0, goldY, originSliceWidth, originSliceHeight - goldY, 0, _y + offsetY, width, height - _y);
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
	                        flow: {
	                            duration: 800,
	                            elapsed: 0,
	                            range: [0, 10],
	                            ease: Bezier.easeIn
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
	
	exports.default = Elements;

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(146), __esModule: true };

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(147);
	module.exports = __webpack_require__(18).Object.keys;

/***/ },
/* 147 */
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
/* 148 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.generate = generate;
	function generate(p1x, p1y, p2x, p2y) {
	    var ZERO_LIMIT = 1e-6;
	    // Calculate the polynomial coefficients,
	    // implicit first and last control points are (0,0) and (1,1).
	    var ax = 3 * p1x - 3 * p2x + 1;
	    var bx = 3 * p2x - 6 * p1x;
	    var cx = 3 * p1x;
	
	    var ay = 3 * p1y - 3 * p2y + 1;
	    var by = 3 * p2y - 6 * p1y;
	    var cy = 3 * p1y;
	
	    function sampleCurveDerivativeX(t) {
	        // `ax t^3 + bx t^2 + cx t' expanded using Horner 's rule.
	        return (3 * ax * t + 2 * bx) * t + cx;
	    }
	
	    function sampleCurveX(t) {
	        return ((ax * t + bx) * t + cx) * t;
	    }
	
	    function sampleCurveY(t) {
	        return ((ay * t + by) * t + cy) * t;
	    }
	
	    // Given an x value, find a parametric value it came from.
	    function solveCurveX(x) {
	        var t2 = x;
	        var derivative;
	        var x2;
	
	        // https://trac.webkit.org/browser/trunk/Source/WebCore/platform/animation
	        // First try a few iterations of Newton's method -- normally very fast.
	        // http://en.wikipedia.org/wiki/Newton's_method
	        for (var i = 0; i < 8; i++) {
	            // f(t)-x=0
	            x2 = sampleCurveX(t2) - x;
	            if (Math.abs(x2) < ZERO_LIMIT) {
	                return t2;
	            }
	            derivative = sampleCurveDerivativeX(t2);
	            // == 0, failure
	            /* istanbul ignore if */
	            if (Math.abs(derivative) < ZERO_LIMIT) {
	                break;
	            }
	            t2 -= x2 / derivative;
	        }
	
	        // Fall back to the bisection method for reliability.
	        // bisection
	        // http://en.wikipedia.org/wiki/Bisection_method
	        var t1 = 1;
	        /* istanbul ignore next */
	        var t0 = 0;
	
	        /* istanbul ignore next */
	        t2 = x;
	        /* istanbul ignore next */
	        while (t1 > t0) {
	            x2 = sampleCurveX(t2) - x;
	            if (Math.abs(x2) < ZERO_LIMIT) {
	                return t2;
	            }
	            if (x2 > 0) {
	                t1 = t2;
	            } else {
	                t0 = t2;
	            }
	            t2 = (t1 + t0) / 2;
	        }
	
	        // Failure
	        return t2;
	    }
	
	    function solve(x) {
	        return sampleCurveY(solveCurveX(x));
	    }
	
	    return solve;
	}
	
	var linear = exports.linear = generate(0, 0, 1, 1);
	var ease = exports.ease = generate(.25, .1, .25, 1);
	var easeIn = exports.easeIn = generate(.42, 0, 1, 1);
	var easeOut = exports.easeOut = generate(0, 0, .58, 1);
	var easeInOut = exports.easeInOut = generate(.42, 0, .58, 1);

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;
	
	var _keys = __webpack_require__(145);
	
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
	
	__webpack_require__(150);
	
	var _util = __webpack_require__(6);
	
	var _event = __webpack_require__(105);
	
	var _event2 = _interopRequireDefault(_event);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Found = function (_Event) {
	    (0, _inherits3.default)(Found, _Event);
	
	    function Found(viewport, items) {
	        (0, _classCallCheck3.default)(this, Found);
	
	        var _this = (0, _possibleConstructorReturn3.default)(this, (Found.__proto__ || (0, _getPrototypeOf2.default)(Found)).call(this));
	
	        _this.wrapEl = (0, _util.query)(viewport, '#found');
	        _this.textEl = (0, _util.query)(_this.wrapEl, '.text');
	        _this.textNumberEl = (0, _util.query)(_this.textEl, '.number');
	        _this.textTipEl = (0, _util.query)(_this.textEl, '.tip');
	        _this.textBgEl = (0, _util.query)(_this.textEl, '.bg');
	        _this.barEl = (0, _util.query)(_this.wrapEl, '.progress .bar');
	        _this.goldEl = (0, _util.query)(_this.wrapEl, '.gold');
	
	        _this.found = 0;
	        _this.amount = 0;
	        _this.total = 0;
	        _this.focus = 0;
	        _this.items = items;
	        return _this;
	    }
	
	    (0, _createClass3.default)(Found, [{
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
	        key: 'ready',
	        value: function ready() {
	            var _this2 = this;
	
	            return new _util.Promise(function (resolve, reject) {
	                _this2.wrapEl.style.display = '';
	
	                var keyframes = '';
	                (0, _keys2.default)(_this2.items).filter(function (id) {
	                    return id.match(/^coin\d$/);
	                }).forEach(function (id, i) {
	                    var item = _this2.items[id];
	                    keyframes += '\n                    ' + 1 / 6 * i * 100 + '% {\n                        background-image: url(' + item.src + ');\n                    }\n                ';
	
	                    if (i === 0) {
	                        keyframes += '\n                        100% {\n                            background-image: url(' + item.src + ');\n                        }\n                    ';
	                    }
	                });
	
	                (0, _util.appendStyle)('\n                @-webkit-keyframes coin {\n                    ' + keyframes + '\n                }\n            ');
	
	                _this2.goldEl.style.webkitAnimation = 'coin 1s linear 0s infinite';
	
	                resolve(_this2);
	            });
	        }
	    }]);
	    return Found;
	}(_event2.default);
	
	exports.default = Found;

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(151);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/.0.25.0@css-loader/index.js!./found.css", function() {
				var newContent = require("!!./../node_modules/.0.25.0@css-loader/index.js!./found.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "#found {\n    position: absolute;\n    right: 0.73rem;\n    top: 0.4rem;\n    color: #00ddf1;\n    font-size: 12px;\n    display: -webkit-box;\n    -webkit-box-pack: center;\n    -webkit-box-align: center;\n    background-repeat: no-repeat;\n    background-position: 0 center;\n    background-size: 1.106rem 0.413rem;\n}\n\n#found .textWrap {\n    width: 1.5rem;\n    height: 0.553rem;\n    position: relative;\n    background-repeat: no-repeat;\n    background-position: right center;\n    background-size: 1.5rem 0.553rem;\n    margin: -0.1rem;\n}\n\n#found .text {\n    width: 1.3rem;\n    height: 0.5rem;\n    position: absolute;\n    -webkit-transition: all 0.4s ease-in 0s;\n    overflow: visible;\n}\n\n#found .text .number {\n    text-align: center;\n    position: absolute;\n    top: 0;\n    right: 0;\n    width: 1.3rem;\n    height: 0.5rem;\n    line-height: 0.5rem;\n    text-align: center;\n}\n\n#found .progress {\n    box-sizing: border-box;\n    width: 1.8rem;\n    height: 0.3rem;\n    border: 1px solid #00ddf1;\n    border-radius: 0.15rem;\n    margin: 0 4px;\n}\n\n#found .progress .bar{\n    width: 0;\n    height: 100%;\n    background-color: #00ddf1;\n    border-radius: 0.15rem;\n}\n\n#found .gold {\n    width: 0.667rem;\n    height: 0.64rem;\n    background-size: contain;\n    background-position: center center;\n    background-repeat: no-repeat;\n}", ""]);
	
	// exports


/***/ },
/* 152 */
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
	
	__webpack_require__(153);
	
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
	        key: 'randomText',
	        value: function randomText() {
	            var _this2 = this;
	
	            var n = 1000;
	            var sumDelta = 16;
	            var sign = -1;
	
	            return function (_ref) {
	                var elapsed = _ref.elapsed,
	                    delta = _ref.delta;
	
	                // if (sumDelta > 15) {
	                // sumDelta = 0;
	                if (n < 1000 && sign === -1) {
	                    sign = 1;
	                } else if (n > 10000 & sign === 1) {
	                    sign = -1;
	                }
	
	                _this2.text(n);
	                n += parseInt(Math.random() * 100 + 100) * sign;
	                // } else {
	                // sumDelta += delta;
	                // }
	            };
	        }
	    }, {
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
	            var _this3 = this;
	
	            return new _util.Promise(function (resolve, reject) {
	                _this3.viewport.style.display = '';
	
	                var _getRect4 = (0, _util.getRect)(_this3.canvasEl),
	                    width = _getRect4.width,
	                    height = _getRect4.height;
	
	                _this3.width = width;
	                _this3.height = height;
	                _this3.sliceWidth = width / _this3.hSlice;
	                _this3.sliceHeight = height / _this3.vSlice;
	
	                _this3.canvasEl.width = width;
	                _this3.canvasEl.height = height;
	                _this3.render.clearRect(0, 0, width, height);
	                _this3.render.fillStyle = '#016fa0';
	                _this3.render.fillRect(0, 0, width, height);
	                _this3.render.fillStyle = 'rgba(0, 0, 0, 1)';
	                _this3.render.globalCompositeOperation = 'destination-out';
	
	                resolve(_this3);
	            });
	        }
	    }]);
	    return Map;
	}(_event2.default);
	
	exports.default = Map;

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(154);
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
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "#stage-map {\n    position: absolute;\n    left: 0.5rem;\n    bottom: 0.5rem;\n    background-position: 0.4rem 0.7rem;\n    background-repeat: no-repeat;\n    background-size: 1.09rem 0.853rem;\n    height: 84px;\n    -webkit-transform: translateZ(999px);\n    display: -webkit-box;\n    -webkit-box-pack: center;\n    -webkit-box-align: center;\n}\n\n#stage-map .wrap {\n    border: 1px solid #016fa0;\n    box-sizing: border-box;\n    width: 30.3px;\n    height: 100%;\n    background-position: 0 0;\n    background-repeat: no-repeat;\n    background-size: contain;\n    background-color: #000;\n    overflow: hidden;\n    position: relative;\n}\n\n#stage-map .map {\n    width: 100%;\n    height: 100%;\n}\n\n#stage-map .indicator {\n    left: 0;\n    top: 0;\n    width: 16px;\n    height: 16px;\n    border-radius: 50%;\n    position: absolute;\n    background-color: rgb(50, 50, 50);\n    opacity: 0;\n    -webkit-animation: flash 0.4s linear 0s infinite alternate;\n}\n\n\n#stage-map .text {\n    background-image: url(data:image/png;base64,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);\n    background-size: 1.2rem;\n    background-position: center 0rem;\n    background-repeat: no-repeat;\n    box-sizing: border-box;\n    color: #00ddf1;\n    font-size: 12px;\n    width: 100px;\n    height: 100%;\n    line-height: 1.5em;\n    left: 0.1rem;\n    top: 1.8rem;\n    text-align: center;\n    padding-top: 50px;\n}\n\n#stage-map .text b {\n    font-size: 15px;\n    margin-top: 4px;\n    color: #FFF;\n}\n\n\n@-webkit-keyframes flash {\n    0% {\n        opacity: 0;\n    }\n\n    100% {\n        opacity: 1;\n    }\n}", ""]);
	
	// exports


/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;
	
	var _toConsumableArray2 = __webpack_require__(7);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	var _map = __webpack_require__(156);
	
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
	                var delta = elapsed - _this2.elapsed;
	
	                _this2.emit('beforetick', {
	                    start: _this2.start,
	                    delta: delta,
	                    elapsed: elapsed
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
	                delta = elapsed - _this2.elapsed;
	
	                _this2.emit('aftertick', {
	                    start: _this2.start,
	                    delta: delta,
	                    elapsed: elapsed
	                });
	
	                _this2.delta = delta;
	                _this2.elapsed = elapsed;
	            };
	
	            this.rid = (0, _util.raf)(tick);
	
	            return true;
	        }
	    }]);
	    return Ticker;
	}(_event2.default);
	
	exports.default = Ticker;

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(157), __esModule: true };

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(93);
	__webpack_require__(10);
	__webpack_require__(75);
	__webpack_require__(158);
	__webpack_require__(168);
	module.exports = __webpack_require__(18).Map;

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(159);
	
	// 23.1 Map Objects
	module.exports = __webpack_require__(164)('Map', function(get){
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
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var dP          = __webpack_require__(22).f
	  , create      = __webpack_require__(35)
	  , redefineAll = __webpack_require__(160)
	  , ctx         = __webpack_require__(19)
	  , anInstance  = __webpack_require__(161)
	  , defined     = __webpack_require__(13)
	  , forOf       = __webpack_require__(162)
	  , $iterDefine = __webpack_require__(14)
	  , step        = __webpack_require__(78)
	  , setSpecies  = __webpack_require__(163)
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
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(21);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 161 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 162 */
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
/* 163 */
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
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global         = __webpack_require__(17)
	  , $export        = __webpack_require__(16)
	  , meta           = __webpack_require__(83)
	  , fails          = __webpack_require__(27)
	  , hide           = __webpack_require__(21)
	  , redefineAll    = __webpack_require__(160)
	  , forOf          = __webpack_require__(162)
	  , anInstance     = __webpack_require__(161)
	  , isObject       = __webpack_require__(24)
	  , setToStringTag = __webpack_require__(50)
	  , dP             = __webpack_require__(22).f
	  , each           = __webpack_require__(165)(0)
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
/* 165 */
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
	  , asc      = __webpack_require__(166);
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
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor = __webpack_require__(167);
	
	module.exports = function(original, length){
	  return new (speciesConstructor(original))(length);
	};

/***/ },
/* 167 */
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
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(16);
	
	$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(169)('Map')});

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var classof = __webpack_require__(59)
	  , from    = __webpack_require__(170);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    return from(this);
	  };
	};

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	var forOf = __webpack_require__(162);
	
	module.exports = function(iter, ITERATOR){
	  var result = [];
	  forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};


/***/ },
/* 171 */
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
	
	__webpack_require__(172);
	
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
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(173);
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
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "#pop {\n    position: absolute;\n    left: 0;\n    top: 0;\n    background-color: rgba(0, 0, 0, 0.6);\n    -webkit-transform: translateZ(9999px);\n    width: 100%;\n    height: 100%;\n    display: -webkit-box;\n    -webkit-box-pack: center;\n    -webkit-box-align: center;\n}\n\n#pop .wrap {\n    background-position: 0 0;\n    background-repeat: no-repeat;\n    background-size: contain;\n    position: relative;\n}\n\n#pop .popPanel {\n    width: 50%;\n    height: 100%;\n    position: absolute;\n    background-repeat: no-repeat;\n    background-size: 200% 100%;\n    overflow: hidden;\n}\n\n#pop.shareble .popPanel {\n    height: 88%;\n}\n\n#pop .popPanel.left {\n    left: 0;\n    top: 0;\n    background-position: -100% 0;\n}\n\n#pop .popPanel.right {\n    right: 0;\n    top: 0;\n    background-position: 200% 0;\n}\n\n#pop.open .popPanel.left {\n    -webkit-animation: openleftwin 0.4s ease-out 0s forwards;\n}\n\n#pop.open .popPanel.right {\n    -webkit-animation: openrightwin 0.4s ease-out 0s forwards;\n}\n\n#pop.close .popPanel.left {\n    -webkit-animation: closeleftwin 0.4s ease-in 0s forwards;\n}\n\n#pop.close .popPanel.right {\n    -webkit-animation: closerightwin 0.4s ease-in 0s forwards;\n}\n\n@-webkit-keyframes openleftwin {\n    0% {\n        background-position: -100% 0;\n    }\n\n    100% {\n        background-position: 0 0;\n    }\n}\n\n@-webkit-keyframes openrightwin {\n    0% {\n        background-position: 200% 0;\n    }\n\n    100% {\n        background-position: 100% 0;\n    }\n}\n\n@-webkit-keyframes closeleftwin {\n    0% {\n        background-position: 0 0;\n    }\n\n    100% {\n        background-position: -100% 0;\n    }\n}\n\n@-webkit-keyframes closerightwin {\n    0% {\n        background-position: 100% 0;\n    }\n\n    100% {\n        background-position: 200% 0;\n    }\n}\n\n#pop .content {\n    width: 8.53rem;\n    height: 7.84rem;\n    overflow: hidden;\n    position: relative;\n}\n\n#pop .popBg1 {\n    display: none;\n    position: absolute;\n    width: 3.36rem;\n    height: 2.92rem;\n    right: 5px;\n    bottom: 2px;\n    background-repeat: no-repeat;\n    background-position: 0 0;\n    background-size: contain;\n}\n\n#pop.bg1 .popBg1 {\n    display: block;\n}\n\n#pop .popBg2 {\n    display: none;\n    position: absolute;\n    width: 4.36rem;\n    height: 3.346rem;\n    right: 5px;\n    bottom: 2px;\n    background-repeat: no-repeat;\n    background-position: 0 0;\n    background-size: contain;\n}\n\n#pop.bg2 .popBg2 {\n    display: block;\n}\n\n#pop .popBg3 {\n    display: none;\n    position: absolute;\n    width: 4.626rem;\n    height: 3.506rem;\n    right: 5px;\n    bottom: 2px;\n    background-repeat: no-repeat;\n    background-position: 0 0;\n    background-size: contain;\n}\n\n#pop.bg3 .popBg3 {\n    display: block;\n}\n\n#pop .popTip1 {\n    position: absolute;\n    left: 0.467rem;\n    top: 1.1rem;\n    width: 1.867rem;\n    height: 1rem;\n    background-position: 0 1rem;\n    background-repeat: no-repeat;\n    background-size: contain;\n    -webkit-animation: typetext1 1.5s linear 0s infinite;\n    overflow: hidden;\n}\n\n@-webkit-keyframes typetext1 {\n    0% {\n        -webkit-transform: translateY(-100%);\n        background-position: 0 1rem;\n    }\n\n    16% {\n        -webkit-transform: translateY(-100%);\n        background-position: 0 1rem;\n    }\n    16.667% {\n        -webkit-transform: translateY(-83.333%);\n        background-position: 0 0.833rem;\n    }\n\n    33% {\n        -webkit-transform: translateY(-83.333%);\n        background-position: 0 0.833rem;\n    }\n    33.333% {\n        -webkit-transform: translateY(-66.666%);\n        background-position: 0 0.666rem;\n    }\n\n    49.999% {\n        -webkit-transform: translateY(-66.666%);\n        background-position: 0 0.666rem;\n    }\n    50% {\n        -webkit-transform: translateY(-50%);\n        background-position: 0 0.5rem;\n    }\n\n    66% {\n        -webkit-transform: translateY(-50%);\n        background-position: 0 0.5rem;\n    }\n    66.666% {\n        -webkit-transform: translateY(-33.333%);\n        background-position: 0 0.333rem;\n    }\n\n    83% {\n        -webkit-transform: translateY(-33.333%);\n        background-position: 0 0.333rem;\n    }\n    83.333% {\n        -webkit-transform: translateY(-16.667%);\n        background-position: 0 0.167rem;\n    }\n\n    99.999% {\n        -webkit-transform: translateY(-16.667%);\n        background-position: 0 0.167rem;\n    }\n    100% {\n        -webkit-transform: translateY(0%);\n        background-position: 0 0;\n    }\n}\n\n\n#pop .popTip2 {\n    position: absolute;\n    left: 0.467rem;\n    top: 4.68rem;\n    width: 1.867rem;\n    height: 1.573rem;\n    background-position: 0 1.573rem;\n    background-repeat: no-repeat;\n    background-size: contain;\n    -webkit-animation: typetext2 2s linear 0s infinite;\n}\n\n\n@-webkit-keyframes typetext2 {\n    0% {\n        -webkit-transform: translateY(-100%);\n        background-position: 0 1.573rem;\n    }\n\n    9.999% {\n        -webkit-transform: translateY(-100%);\n        background-position: 0 1.573rem;\n    }\n    10% {\n        -webkit-transform: translateY(-90%);\n        background-position: 0 1.415rem;\n    }\n\n    19.999% {\n        -webkit-transform: translateY(-90%);\n        background-position: 0 1.415rem;\n    }\n    20% {\n        -webkit-transform: translateY(-80%);\n        background-position: 0 1.258rem;\n    }\n\n    29.999% {\n        -webkit-transform: translateY(-80%);\n        background-position: 0 1.258rem;\n    }\n    30% {\n        -webkit-transform: translateY(-70%);\n        background-position: 0 1.101rem;\n    }\n\n    39.999% {\n        -webkit-transform: translateY(-70%);\n        background-position: 0 1.101rem;\n    }\n    40% {\n        -webkit-transform: translateY(-60%);\n        background-position: 0 0.9438rem;\n    }\n\n    49.999% {\n        -webkit-transform: translateY(-60%);\n        background-position: 0 0.9438rem;\n    }\n    50% {\n        -webkit-transform: translateY(-50%);\n        background-position: 0 0.7865rem;\n    }\n\n    59.999% {\n        -webkit-transform: translateY(-50%);\n        background-position: 0 0.7865rem;\n    }\n    60% {\n        -webkit-transform: translateY(-40%);\n        background-position: 0 0.6292rem;\n    }\n\n    69.999% {\n        -webkit-transform: translateY(-40%);\n        background-position: 0 0.6292rem;\n    }\n    70% {\n        -webkit-transform: translateY(-30%);\n        background-position: 0 0.4719rem;\n    }\n\n    79.999% {\n        -webkit-transform: translateY(-30%);\n        background-position: 0 0.4719rem;\n    }\n    80% {\n        -webkit-transform: translateY(-20%);\n        background-position: 0 0.3146rem;\n    }\n\n    89.999% {\n        -webkit-transform: translateY(-20%);\n        background-position: 0 0.3146rem;\n    }\n    90% {\n        -webkit-transform: translateY(-10%);\n        background-position: 0 0.1573rem;\n    }\n\n    99.999% {\n        -webkit-transform: translateY(-10%);\n        background-position: 0 0.1573rem;\n    }\n    100% {\n        -webkit-transform: translateY(0);\n        background-position: 0 0;\n    }\n}\n\n#pop .popIcon {\n    position: absolute;\n    left: 0.4rem;\n    top: 2.226rem;\n    width: 1.8rem;\n    height: 2.253rem;\n    background-position: 0 0;\n    background-repeat: no-repeat;\n    background-size: 3.6rem 2.253rem;\n    -webkit-animation: sprites 1s linear 0s infinite;\n}\n\n@-webkit-keyframes sprites {\n    0% {\n        background-position: 0 0;\n    }\n\n    49.999% {\n        background-position: 0 0;\n    }\n\n    50% {\n        background-position: -1.8rem 0;\n    }\n\n    100% {\n        background-position: -1.8rem 0;\n    } \n}\n\n#pop .title {\n    position: absolute;\n    width: 5rem;\n    left: 2.4rem;\n    top: 1.293rem;\n    font-size: 18px;\n    color: #FFF;\n    text-shadow:\n        2px 0 2px rgba(0, 203, 227, 0.3),\n        0 2px 2px rgba(0, 203, 227, 0.3), \n        0 -2px 2px rgba(0, 203, 227, 0.3),\n        -2px 0 2px rgba(0, 203, 227, 0.3);\n    white-space: nowrap;\n}\n\n#pop .text {\n    position: absolute;\n    width: 5rem;\n    left: 2.4rem;\n    top: 2.286rem;\n    font-size: 14px;\n    color: #00cbe3;\n    text-shadow:\n        1px 0 1px rgba(0, 203, 227, 0.3),\n        0 1px 1px rgba(0, 203, 227, 0.3), \n        0 -1px 1px rgba(0, 203, 227, 0.3),\n        -1px 0 1px rgba(0, 203, 227, 0.3);\n}\n\n#pop .popClose {\n    position: absolute;\n    left: 0;\n    bottom: 0.546rem;\n    width: 100%;\n    height: 1.2rem;\n    background-position: center center;\n    background-repeat: no-repeat;\n    background-size: 1.2rem 1.2rem;\n}\n\n#pop.shareble .popClose {\n    display: none;\n}\n\n#pop .btns {\n    display: none;\n    width: 100%;\n    -webkit-box-pack: center;\n    -webkit-box-align: center; \n    padding-top: 0.5rem;\n}\n\n#pop.shareble .btns{\n    display: -webkit-box;\n}\n\n#pop .popBtn {\n    width: 2.68rem;\n    height: 0.773rem;\n    line-height: 0.773rem;\n    text-align: center;\n    color: #FFF;\n    background-position: 0 0;\n    background-repeat: no-repeat;\n    background-size: contain;\n    margin: 0 0.4rem;\n}", ""]);
	
	// exports


/***/ },
/* 174 */
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
	
	__webpack_require__(175);
	
	var _util = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Tip = function () {
	    function Tip(viewport) {
	        (0, _classCallCheck3.default)(this, Tip);
	
	        this.tipEl = (0, _util.query)(viewport, '#tip');
	    }
	
	    (0, _createClass3.default)(Tip, [{
	        key: 'show',
	        value: function show(_ref) {
	            var _this = this;
	
	            var tip = _ref.tip,
	                bgType = _ref.bgType;
	
	            return new _util.Promise(function (resolve, reject) {
	                _this.tipEl.className = 'tip open';
	
	                (0, _util.delay)(400).then(function () {
	                    _this.tipEl.className = 'tip open bg' + bgType;
	                    _this.textEl.innerHTML = tip;
	                    return (0, _util.delay)(5000);
	                }).then(function () {
	                    _this.tipEl.className = 'tip close';
	                    _this.textEl.innerHTML = '';
	                    return (0, _util.delay)(400);
	                }).then(function () {
	                    _this.tipEl.className = 'tip';
	                    resolve();
	                });
	            });
	        }
	    }, {
	        key: 'ready',
	        value: function ready() {
	            var _this2 = this;
	
	            return new _util.Promise(function (resolve, reject) {
	                _this2.textEl = (0, _util.query)(_this2.tipEl, 'p');
	                resolve();
	            });
	        }
	    }]);
	    return Tip;
	}();
	
	exports.default = Tip;

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(176);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/.0.25.0@css-loader/index.js!./tip.css", function() {
				var newContent = require("!!./../node_modules/.0.25.0@css-loader/index.js!./tip.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "#tip {\n    position: absolute;\n    right: 0.7235rem;\n    top: 1.1rem;\n    width: 0;\n    height: 0;\n    font-size: 0;\n    border: 0px solid #00ddf1;\n    border-radius: 4px;\n    background-size: contain;\n    background-position: center center;\n    background-repeat: no-repeat;\n    -webkit-transform: translateZ(9999px);\n    -webkit-transition: width 0.4s ease-in 0s,\n                        height 0.4s ease-in 0s;\n    overflow: visible;\n}\n\n#tip.open {\n    width: 8.553rem;\n    height: 1.866rem;\n    border-width: 1px;\n}\n\n#tip.close {\n    border-width: 1px;\n}\n\n#tip p {\n    box-sizing: border-box;\n    width: 100%;\n    height: 100%;\n    line-height: 1.2em;\n    font-size: 12px;\n    color: #00ddf1;\n    padding: 0;\n    padding-left: 12%;\n    padding-top: 6%;\n    padding-right: 30%;\n    margin: 0;\n\n}\n\n#tip .bg {\n    display: none;\n    right: 0;\n    top: 0;\n    position: absolute;\n    background-repeat: no-repeat;\n    background-position: 0 0;\n    background-size: contain; \n}\n\n#tip .tipBg1 {\n    width: 2.8924rem;\n    height: 2.52rem;\n}\n\n#tip .tipBg2 {\n    width: 2.7036rem;\n    height: 2.3352rem;\n}\n\n#tip.bg1 .tipBg1 {\n    display: block;\n}\n\n#tip.bg2 .tipBg2 {\n    display: block;\n}", ""]);
	
	// exports


/***/ },
/* 177 */
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
	
	__webpack_require__(178);
	
	var _xhr = __webpack_require__(180);
	
	var _xhr2 = _interopRequireDefault(_xhr);
	
	var _util = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createCORSRequest(method, url) {
	    var xhr = new XMLHttpRequest();
	
	    if ("withCredentials" in xhr) {
	        // XHR for Chrome/Firefox/Opera/Safari.
	        xhr.open(method, url, true);
	    } else {
	        // CORS not supported.
	        xhr = null;
	    }
	    return xhr;
	}
	
	function makeCorsRequest(method, url) {
	    // This is a sample server that supports CORS.
	    return new _util.Promise(function (resolve, reject) {
	        var xhr = createCORSRequest(method, url);
	
	        if (!xhr) {
	            reject();
	            return;
	        }
	
	        // Response handlers.
	        xhr.onload = function () {
	            return resolve(xhr);
	        };
	        xhr.onerror = function () {
	            return reject(xhr);
	        };
	        xhr.send();
	    });
	}
	
	var Share = function () {
	    function Share(viewport) {
	        (0, _classCallCheck3.default)(this, Share);
	
	        this.shareEl = (0, _util.query)(viewport, '#share');
	        this.wxReady = false;
	    }
	
	    (0, _createClass3.default)(Share, [{
	        key: 'shareWx',
	        value: function shareWx(_ref) {
	            var title = _ref.title,
	                desc = _ref.desc,
	                link = _ref.link,
	                imgUrl = _ref.imgUrl;
	
	            if (this.wxReady) {
	                wx.onMenuShareTimeline({
	                    title: title,
	                    link: link,
	                    imgUrl: imgUrl,
	                    success: function success(e) {
	                        // alert('success')
	                    },
	                    cancel: function cancel(e) {
	                        // alert(JSON.stringify(e))
	                    }
	                });
	
	                wx.onMenuShareAppMessage({
	                    title: title, // 分享标题
	                    desc: desc, // 分享描述
	                    link: link, // 分享链接
	                    imgUrl: imgUrl, // 分享图标
	                    type: 'link', // 分享类型,music、video或link，不填默认为link
	                    success: function success(e) {
	                        // alert('success')
	                    },
	                    cancel: function cancel(e) {
	                        // alert(JSON.stringify(e))
	                    }
	                });
	            }
	        }
	    }, {
	        key: 'show',
	        value: function show(_ref2) {
	            var _this = this;
	
	            var title = _ref2.title,
	                desc = _ref2.desc,
	                link = _ref2.link,
	                imgUrl = _ref2.imgUrl;
	
	            return new _util.Promise(function (resolve, reject) {
	                var hide = function hide(e) {
	                    _this.shareEl.removeEventListener('tap', hide);
	                    _this.shareEl.style.display = 'none';
	                    resolve();
	                };
	
	                _this.shareEl.addEventListener('tap', hide);
	                _this.shareEl.style.display = '';
	            });
	        }
	    }, {
	        key: 'ready',
	        value: function ready() {
	            var _this2 = this;
	
	            var method = 'GET';
	            var url = 'wx.php';
	            // const url = 'http://120.76.215.155/tgp/space/wx.php';
	
	            return makeCorsRequest(method, url + '?method=calculate').then(function (xhr) {
	                // debugger
	                var config = void 0;
	                try {
	                    config = JSON.parse(xhr.responseText);
	                } catch (e) {}
	
	                if (config && (config.success === true || config.sucess === 'true')) {
	                    config.data.jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage'];
	                    return new _util.Promise(function (resolve, reject) {
	                        wx.config(config.data);
	                        wx.ready(function () {
	                            // alert('wx ready');
	                            _this2.wxReady = true;
	                            // resolve();
	                        });
	                        wx.error(function (e) {
	                            // alert('wx not ready');
	                            // alert(JSON.stringify(e));
	                            _this2.wxReady = false;
	                            // resolve();
	                        });
	                        resolve();
	                    });
	                } else {
	                    return _util.Promise.resolve();
	                }
	            }).catch(function (xhr) {
	                _this2.wvReady = true;
	            });
	        }
	    }]);
	    return Share;
	}();
	
	exports.default = Share;

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(179);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/.0.25.0@css-loader/index.js!./share.css", function() {
				var newContent = require("!!./../node_modules/.0.25.0@css-loader/index.js!./share.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "#share {\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.8);\n    background-size: cover;\n    background-position: right top;\n    background-repeat: no-repeat;\n    -webkit-transform: translateZ(9999px);\n}", ""]);
	
	// exports


/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var window = __webpack_require__(181)
	var isFunction = __webpack_require__(182)
	var parseHeaders = __webpack_require__(183)
	var xtend = __webpack_require__(186)
	
	module.exports = createXHR
	createXHR.XMLHttpRequest = window.XMLHttpRequest || noop
	createXHR.XDomainRequest = "withCredentials" in (new createXHR.XMLHttpRequest()) ? createXHR.XMLHttpRequest : window.XDomainRequest
	
	forEachArray(["get", "put", "post", "patch", "head", "delete"], function(method) {
	    createXHR[method === "delete" ? "del" : method] = function(uri, options, callback) {
	        options = initParams(uri, options, callback)
	        options.method = method.toUpperCase()
	        return _createXHR(options)
	    }
	})
	
	function forEachArray(array, iterator) {
	    for (var i = 0; i < array.length; i++) {
	        iterator(array[i])
	    }
	}
	
	function isEmpty(obj){
	    for(var i in obj){
	        if(obj.hasOwnProperty(i)) return false
	    }
	    return true
	}
	
	function initParams(uri, options, callback) {
	    var params = uri
	
	    if (isFunction(options)) {
	        callback = options
	        if (typeof uri === "string") {
	            params = {uri:uri}
	        }
	    } else {
	        params = xtend(options, {uri: uri})
	    }
	
	    params.callback = callback
	    return params
	}
	
	function createXHR(uri, options, callback) {
	    options = initParams(uri, options, callback)
	    return _createXHR(options)
	}
	
	function _createXHR(options) {
	    if(typeof options.callback === "undefined"){
	        throw new Error("callback argument missing")
	    }
	
	    var called = false
	    var callback = function cbOnce(err, response, body){
	        if(!called){
	            called = true
	            options.callback(err, response, body)
	        }
	    }
	
	    function readystatechange() {
	        if (xhr.readyState === 4) {
	            loadFunc()
	        }
	    }
	
	    function getBody() {
	        // Chrome with requestType=blob throws errors arround when even testing access to responseText
	        var body = undefined
	
	        if (xhr.response) {
	            body = xhr.response
	        } else {
	            body = xhr.responseText || getXml(xhr)
	        }
	
	        if (isJson) {
	            try {
	                body = JSON.parse(body)
	            } catch (e) {}
	        }
	
	        return body
	    }
	
	    function errorFunc(evt) {
	        clearTimeout(timeoutTimer)
	        if(!(evt instanceof Error)){
	            evt = new Error("" + (evt || "Unknown XMLHttpRequest Error") )
	        }
	        evt.statusCode = 0
	        return callback(evt, failureResponse)
	    }
	
	    // will load the data & process the response in a special response object
	    function loadFunc() {
	        if (aborted) return
	        var status
	        clearTimeout(timeoutTimer)
	        if(options.useXDR && xhr.status===undefined) {
	            //IE8 CORS GET successful response doesn't have a status field, but body is fine
	            status = 200
	        } else {
	            status = (xhr.status === 1223 ? 204 : xhr.status)
	        }
	        var response = failureResponse
	        var err = null
	
	        if (status !== 0){
	            response = {
	                body: getBody(),
	                statusCode: status,
	                method: method,
	                headers: {},
	                url: uri,
	                rawRequest: xhr
	            }
	            if(xhr.getAllResponseHeaders){ //remember xhr can in fact be XDR for CORS in IE
	                response.headers = parseHeaders(xhr.getAllResponseHeaders())
	            }
	        } else {
	            err = new Error("Internal XMLHttpRequest Error")
	        }
	        return callback(err, response, response.body)
	    }
	
	    var xhr = options.xhr || null
	
	    if (!xhr) {
	        if (options.cors || options.useXDR) {
	            xhr = new createXHR.XDomainRequest()
	        }else{
	            xhr = new createXHR.XMLHttpRequest()
	        }
	    }
	
	    var key
	    var aborted
	    var uri = xhr.url = options.uri || options.url
	    var method = xhr.method = options.method || "GET"
	    var body = options.body || options.data || null
	    var headers = xhr.headers = options.headers || {}
	    var sync = !!options.sync
	    var isJson = false
	    var timeoutTimer
	    var failureResponse = {
	        body: undefined,
	        headers: {},
	        statusCode: 0,
	        method: method,
	        url: uri,
	        rawRequest: xhr
	    }
	
	    if ("json" in options && options.json !== false) {
	        isJson = true
	        headers["accept"] || headers["Accept"] || (headers["Accept"] = "application/json") //Don't override existing accept header declared by user
	        if (method !== "GET" && method !== "HEAD") {
	            headers["content-type"] || headers["Content-Type"] || (headers["Content-Type"] = "application/json") //Don't override existing accept header declared by user
	            body = JSON.stringify(options.json === true ? body : options.json)
	        }
	    }
	
	    xhr.onreadystatechange = readystatechange
	    xhr.onload = loadFunc
	    xhr.onerror = errorFunc
	    // IE9 must have onprogress be set to a unique function.
	    xhr.onprogress = function () {
	        // IE must die
	    }
	    xhr.onabort = function(){
	        aborted = true;
	    }
	    xhr.ontimeout = errorFunc
	    xhr.open(method, uri, !sync, options.username, options.password)
	    //has to be after open
	    if(!sync) {
	        xhr.withCredentials = !!options.withCredentials
	    }
	    // Cannot set timeout with sync request
	    // not setting timeout on the xhr object, because of old webkits etc. not handling that correctly
	    // both npm's request and jquery 1.x use this kind of timeout, so this is being consistent
	    if (!sync && options.timeout > 0 ) {
	        timeoutTimer = setTimeout(function(){
	            if (aborted) return
	            aborted = true//IE9 may still call readystatechange
	            xhr.abort("timeout")
	            var e = new Error("XMLHttpRequest timeout")
	            e.code = "ETIMEDOUT"
	            errorFunc(e)
	        }, options.timeout )
	    }
	
	    if (xhr.setRequestHeader) {
	        for(key in headers){
	            if(headers.hasOwnProperty(key)){
	                xhr.setRequestHeader(key, headers[key])
	            }
	        }
	    } else if (options.headers && !isEmpty(options.headers)) {
	        throw new Error("Headers cannot be set on an XDomainRequest object")
	    }
	
	    if ("responseType" in options) {
	        xhr.responseType = options.responseType
	    }
	
	    if ("beforeSend" in options &&
	        typeof options.beforeSend === "function"
	    ) {
	        options.beforeSend(xhr)
	    }
	
	    xhr.send(body)
	
	    return xhr
	
	
	}
	
	function getXml(xhr) {
	    if (xhr.responseType === "document") {
	        return xhr.responseXML
	    }
	    var firefoxBugTakenEffect = xhr.status === 204 && xhr.responseXML && xhr.responseXML.documentElement.nodeName === "parsererror"
	    if (xhr.responseType === "" && !firefoxBugTakenEffect) {
	        return xhr.responseXML
	    }
	
	    return null
	}
	
	function noop() {}


/***/ },
/* 181 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {if (typeof window !== "undefined") {
	    module.exports = window;
	} else if (typeof global !== "undefined") {
	    module.exports = global;
	} else if (typeof self !== "undefined"){
	    module.exports = self;
	} else {
	    module.exports = {};
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 182 */
/***/ function(module, exports) {

	module.exports = isFunction
	
	var toString = Object.prototype.toString
	
	function isFunction (fn) {
	  var string = toString.call(fn)
	  return string === '[object Function]' ||
	    (typeof fn === 'function' && string !== '[object RegExp]') ||
	    (typeof window !== 'undefined' &&
	     // IE8 and below
	     (fn === window.setTimeout ||
	      fn === window.alert ||
	      fn === window.confirm ||
	      fn === window.prompt))
	};


/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	var trim = __webpack_require__(184)
	  , forEach = __webpack_require__(185)
	  , isArray = function(arg) {
	      return Object.prototype.toString.call(arg) === '[object Array]';
	    }
	
	module.exports = function (headers) {
	  if (!headers)
	    return {}
	
	  var result = {}
	
	  forEach(
	      trim(headers).split('\n')
	    , function (row) {
	        var index = row.indexOf(':')
	          , key = trim(row.slice(0, index)).toLowerCase()
	          , value = trim(row.slice(index + 1))
	
	        if (typeof(result[key]) === 'undefined') {
	          result[key] = value
	        } else if (isArray(result[key])) {
	          result[key].push(value)
	        } else {
	          result[key] = [ result[key], value ]
	        }
	      }
	  )
	
	  return result
	}

/***/ },
/* 184 */
/***/ function(module, exports) {

	
	exports = module.exports = trim;
	
	function trim(str){
	  return str.replace(/^\s*|\s*$/g, '');
	}
	
	exports.left = function(str){
	  return str.replace(/^\s*/, '');
	};
	
	exports.right = function(str){
	  return str.replace(/\s*$/, '');
	};


/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(182)
	
	module.exports = forEach
	
	var toString = Object.prototype.toString
	var hasOwnProperty = Object.prototype.hasOwnProperty
	
	function forEach(list, iterator, context) {
	    if (!isFunction(iterator)) {
	        throw new TypeError('iterator must be a function')
	    }
	
	    if (arguments.length < 3) {
	        context = this
	    }
	    
	    if (toString.call(list) === '[object Array]')
	        forEachArray(list, iterator, context)
	    else if (typeof list === 'string')
	        forEachString(list, iterator, context)
	    else
	        forEachObject(list, iterator, context)
	}
	
	function forEachArray(array, iterator, context) {
	    for (var i = 0, len = array.length; i < len; i++) {
	        if (hasOwnProperty.call(array, i)) {
	            iterator.call(context, array[i], i, array)
	        }
	    }
	}
	
	function forEachString(string, iterator, context) {
	    for (var i = 0, len = string.length; i < len; i++) {
	        // no such thing as a sparse string.
	        iterator.call(context, string.charAt(i), i, string)
	    }
	}
	
	function forEachObject(object, iterator, context) {
	    for (var k in object) {
	        if (hasOwnProperty.call(object, k)) {
	            iterator.call(context, object[k], k, object)
	        }
	    }
	}


/***/ },
/* 186 */
/***/ function(module, exports) {

	module.exports = extend
	
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	
	function extend() {
	    var target = {}
	
	    for (var i = 0; i < arguments.length; i++) {
	        var source = arguments[i]
	
	        for (var key in source) {
	            if (hasOwnProperty.call(source, key)) {
	                target[key] = source[key]
	            }
	        }
	    }
	
	    return target
	}


/***/ },
/* 187 */
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
	
	__webpack_require__(188);
	
	var _util = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Music = function () {
	    function Music(viewport, items) {
	        (0, _classCallCheck3.default)(this, Music);
	
	        this.musicEl = (0, _util.query)(viewport, '#music');
	        this.barsEl = (0, _util.queryAll)(viewport, '.bar');
	        this.audio = items['music'].obj;
	    }
	
	    (0, _createClass3.default)(Music, [{
	        key: 'play',
	        value: function play() {
	            for (var i = 0; i < this.barsEl.length; i++) {
	                this.barsEl[i].style.cssText = '-webkit-animation-duration: ' + (Math.random() * 0.3 + 0.3) + 's';
	            }
	            this.audio.play();
	            this.musicEl.className = '';
	        }
	    }, {
	        key: 'pause',
	        value: function pause() {
	            this.audio.pause();
	            this.musicEl.className = 'mute';
	        }
	    }, {
	        key: 'ready',
	        value: function ready() {
	            var _this = this;
	
	            return new _util.Promise(function (resolve, reject) {
	                _this.audio.loop = true;
	                _this.musicEl.style.display = '';
	
	                _this.musicEl.addEventListener('tap', function (e) {
	                    e.preventDefault();
	                    e.stopPropagation();
	                    if (!_this.audio.paused) {
	                        _this.pause();
	                    } else {
	                        _this.play();
	                    }
	                });
	
	                resolve();
	            });
	        }
	    }]);
	    return Music;
	}();
	
	exports.default = Music;

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(189);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/.0.25.0@css-loader/index.js!./music.css", function() {
				var newContent = require("!!./../node_modules/.0.25.0@css-loader/index.js!./music.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "#music {\n    position: absolute;\n    left: 0.3rem;\n    top: 0.5rem;\n    padding-right: 0.3rem;\n    padding-bottom: 0.5rem;\n\n}\n\n#music .music {\n    box-sizing: border-box;\n    width: 18px;\n    height: 16px;\n    padding-bottom: 2px;\n    border-bottom: 2px solid #555;\n}\n\n#music .bars {\n    width: 100%;\n    height: 100%;\n    display: -webkit-box;\n    -webkit-box-pack: justify;\n    -webkit-box-align: end;\n}\n\n#music .bar {\n    width: 14%;\n    margin: 1%;\n    height: 15%;\n    background-color: #00ddf1;\n    -webkit-animation-name: play;\n    -webkit-animation-delay: 0s;\n    -webkit-animation-timing-function: ease-in-out;\n    -webkit-animation-iteration-count: infinite;\n    -webkit-animation-direction: alternate;\n}\n\n@-webkit-keyframes play {\n    0% {\n        height: 15%;\n    }\n\n    100% {\n        height: 80%;\n    }\n}\n\n\n#music.mute .bar {\n    -webkit-animation: none;\n}", ""]);
	
	// exports


/***/ },
/* 190 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    loading: {
	        texts: [['正在加入：', '5滴银河', '2束逃不出黑洞的光', '1个更大的游戏世界', '3缕太阳风', '7片燃烧的陨石', '1个仰望星空的人']]
	    },
	
	    gl: { // 开场引导
	        type: 'popup',
	        title: '欢迎来到TGP游戏世界',
	        text: '这是散布在宇宙中的神秘力量，集齐所有金币，召唤神秘“鸡腿”！',
	        shareble: false,
	        bgType: 1
	    },
	
	    found5: { // 找到5个
	        type: 'tip',
	        tip: '5颗星球被你点金，<br/>神秘”鸡腿”正向你走来',
	        bgType: 1
	    },
	
	    found15: { // 找到15个
	        type: 'tip',
	        tip: '啊！还差5个！<br/>离神秘“鸡腿”就只差5个了！',
	        bgType: 2
	    },
	
	    found20: { // 找到20个
	        type: 'popup',
	        title: '找到全部游戏星球！',
	        text: function text(data) {
	            return data.m + '\u5206' + data.s + '\u79D2\uFF0C\u6211\u53D1\u73B0\u4E86\u6240\u6709\u6E38\u620F\u661F\u7403\uFF01\u5B87\u5B99\u8FA3\u4E48\u5927\uFF0C\u6211\u7684\u624B\u6700\u5FEB\uFF01';
	        },
	
	        bgType: 3,
	        shareble: true
	    },
	
	    blacksheepwall: { // 地图全开
	        type: 'popup',
	        title: '探索了整个宇宙！',
	        text: function text(data) {
	            return data.m + '\u5206' + data.s + '\u79D2\uFF0C\u6211\u53D1\u73B0\u4E86' + data.n + '\u4E2A\u6E38\u620F\u661F\u7403\uFF01\u5269\u4E0B\u7684\u6709\u672C\u4E8B\u4F60\u6765\u627E\uFF01';
	        },
	
	        bgType: 2,
	        shareble: true
	    },
	
	    gg: { //地图全开 + 找到20个
	        type: 'popup',
	        title: '找到全部游戏星球！',
	        text: function text(data) {
	            return data.m + '\u5206' + data.s + '\u79D2\uFF0C\u6211\u53D1\u73B0\u4E86\u6240\u6709\u6E38\u620F\u661F\u7403\uFF01\u5B87\u5B99\u8FA3\u4E48\u5927\uFF0C\u6211\u7684\u624B\u6700\u5FEB\uFF01';
	        },
	
	        bgType: 3,
	        shareble: true
	    }
	};

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTQ5Zjk5MmQ0MDdiMzBkNjBmN2EiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuY3NzPzY3MzciLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuY3NzIiwid2VicGFjazovLy8uL34vLjAuMjUuMEBjc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4wLjEzLjFAc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvYXJyYXkvZnJvbS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RlZmluZWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXJhdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2h0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1ncG8uanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuZnJvbS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jYWxsLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jcmVhdGUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jbGFzc29mLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRldGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qtc2FwLmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuLmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sL2l0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1zdGVwLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MtZXh0LmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN5bWJvbC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWV0YS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fa2V5b2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0ta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi1leHQuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BuLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wZC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wub2JzZXJ2YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9oZWxwZXJzL2luaGVyaXRzLmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L3NldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXByb3RvLmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4wLjEuMEBnZXN0dXJlLWpzL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMC4zLjRAZXZlbnQtZW1pdHRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4wLjEuMUBkL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3QvYXNzaWduL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3QvYXNzaWduL2lzLWltcGxlbWVudGVkLmpzIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3QvYXNzaWduL3NoaW0uanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMC4xMC4xMkBlczUtZXh0L29iamVjdC9rZXlzL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3Qva2V5cy9pcy1pbXBsZW1lbnRlZC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4wLjEwLjEyQGVzNS1leHQvb2JqZWN0L2tleXMvc2hpbS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4wLjEwLjEyQGVzNS1leHQvb2JqZWN0L3ZhbGlkLXZhbHVlLmpzIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3Qvbm9ybWFsaXplLW9wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMC4xMC4xMkBlczUtZXh0L29iamVjdC9pcy1jYWxsYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4wLjEwLjEyQGVzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMC4xMC4xMkBlczUtZXh0L3N0cmluZy8jL2NvbnRhaW5zL2lzLWltcGxlbWVudGVkLmpzIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9zdHJpbmcvIy9jb250YWlucy9zaGltLmpzIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3QvdmFsaWQtY2FsbGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YWdlLmpzIiwid2VicGFjazovLy8uL34vLjIuMC4wQGFtZmUtZW52L3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjAuMEBhbWZlLWVudi9zcmMvYWxpYXBwLmpzIiwid2VicGFjazovLy8uL34vLjIuMC4wQGFtZmUtZW52L3NyYy92ZXJzaW9uLmpzIiwid2VicGFjazovLy8uL34vLjIuMC4wQGFtZmUtZW52L3NyYy9vcy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjAuMEBhbWZlLWVudi9zcmMvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjAuMEBhbWZlLWVudi9zcmMvdGhpcmRhcHAuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi4wLjBAYW1mZS1lbnYvc3JjL3BhcmFtcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhZ2UuY3NzPzNiODIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YWdlLmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2FudmFzLmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL2lzLWl0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmlzLWl0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NsaWNlQ29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy9oZWxsb1dvcmxkLmpzIiwid2VicGFjazovLy8uL3NyYy9oZWxsb3dvcmxkLmNzcz80NmNiIiwid2VicGFjazovLy8uL3NyYy9oZWxsb3dvcmxkLmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3Rhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzLmpzIiwid2VicGFjazovLy8uL34vLjIuMC4wQGFtZmUtY3ViaWNiZXppZXIvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9mb3VuZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZm91bmQuY3NzPzA1OWIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZvdW5kLmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFwLmpzIiwid2VicGFjazovLy8uL3NyYy9tYXAuY3NzPzljZGIiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpY2tlci5qcyIsIndlYnBhY2s6Ly8vLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL21hcC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vbWFwLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5tYXAuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvbGxlY3Rpb24tc3Ryb25nLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS1hbGwuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLWluc3RhbmNlLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mb3Itb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1zcGVjaWVzLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2xsZWN0aW9uLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1tZXRob2RzLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1zcGVjaWVzLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktc3BlY2llcy1jb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcubWFwLnRvLWpzb24uanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvbGxlY3Rpb24tdG8tanNvbi5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktZnJvbS1pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcG9wLmpzIiwid2VicGFjazovLy8uL3NyYy9wb3AuY3NzPzc2ZTgiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BvcC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGlwLmNzcz8wZjMzIiwid2VicGFjazovLy8uL3NyYy90aXAuY3NzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmUuY3NzPzY1NzQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlLmNzcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjMuMkB4aHIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi8uNC4zLjFAZ2xvYmFsL3dpbmRvdy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4xLjAuMUBpcy1mdW5jdGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjAuMUBwYXJzZS1oZWFkZXJzL3BhcnNlLWhlYWRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMC4wLjFAdHJpbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4wLjMuMkBmb3ItZWFjaC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly40LjAuMUB4dGVuZC9pbW11dGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL211c2ljLmpzIiwid2VicGFjazovLy8uL3NyYy9tdXNpYy5jc3M/YjJlNyIsIndlYnBhY2s6Ly8vLi9zcmMvbXVzaWMuY3NzIiwid2VicGFjazovLy8uL3NyYy90ZXh0Q29uZmlnLmpzIl0sIm5hbWVzIjpbInByZWxvYWQiLCJhc3NldHNQcmVsb2FkIiwiaXRlbXMiLCJhc3NldHNJdGVtcyIsInZpZXdwb3J0IiwiYm9keSIsInNjcm9sbGVyIiwidGlja2VyIiwic3RhZ2UiLCJoZWxsb1dvcmxkIiwic3RhciIsImVsZW1lbnRzIiwiZm91bmQiLCJtYXAiLCJwb3AiLCJ0aXAiLCJzaGFyZSIsIm11c2ljIiwic2hvd1RpcCIsImNvbmZpZyIsImRhdGEiLCJzaG93IiwiYmdUeXBlIiwic2hvd1BvcCIsImVuYWJsZSIsInRleHQiLCJwb3B1cCIsInRpdGxlIiwic2hhcmVibGUiLCJvbmxlZnRjbGljayIsImFsbCIsImNsb3NlIiwidGhlbiIsIm9ucmlnaHRjbGljayIsIm9uY2xvc2VjbGljayIsInNoYXJlV3giLCJkZXNjIiwibSIsIm4iLCJsaW5rIiwiaW1nVXJsIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInJlYWR5IiwicnVuIiwic2Nyb2xsU2xvd1JhdGlvIiwid2lkdGgiLCJoZWlnaHQiLCJ2dyIsInZoIiwiZHByIiwicHJvbWlzZXMiLCJwdXNoIiwiZmlyc3RSZW5kZXJlZCIsInNjcm9sbFgiLCJzY3JvbGxZIiwic3RhclJvbGxZIiwic3RhclJvbGxTcGVlZCIsInN0YXJSb2xsSWQiLCJhZGQiLCJzaG93VGV4dElkIiwic2hvd0dsb2RJZCIsImZseUNvaW5JZCIsImhvdmVyU2xpY2UiLCJnZXRIb3ZlclNsaWNlIiwiZm9jdXNTbGljZSIsImdldEZvY3VzU2xpY2UiLCJzbGljZVdpZHRoIiwic2xpY2VIZWlnaHQiLCJvbiIsIngiLCJ5IiwidHlwZSIsInNob3dUZXh0Iiwib3JpZ2luYWxFdmVudCIsInRhcmdldCIsImNhbnZhcyIsInRhcEZvY3VzU2xpY2UiLCJleCIsImV5Iiwic2hvd0dvbGQiLCJlbmQiLCJmbHlDb2luIiwidXBkYXRlIiwic3BlY2lhbEFtb3VudCIsInNwZWNpYWxGb3VuZCIsInRvdGFsQW1vdW50IiwiaG92ZXJlZEFtb3VudCIsImRyYXdJbWFnZXMiLCJvZmZzY3JlZW5SZW5kZXIiLCJjbGVhclJlY3QiLCJkcmF3SW1hZ2UiLCJpbWFnZSIsInJlbmRlciIsIm9mZnNjcmVlbkNhbnZhcyIsInJlcGVhdCIsInByb21pc2UiLCJyZXNvbHZlIiwiaSIsInRpY2tlcklkIiwicGxheSIsIk1hdGgiLCJyYW5kb20iLCJzdGFydCIsImhTbGljZSIsInZTbGljZSIsInJhbmRvbVRleHRJZCIsInJhbmRvbVRleHQiLCJ4cCIsInlwIiwiY2xlYXIiLCJkaXN0YW5jZSIsImRlbGV0ZSIsImFtb3VudCIsInRvdGFsIiwiZm9jdXMiLCJwYXJzZUludCIsImVsYXBzZWQiLCJzIiwic2hvd24iLCJib25lWCIsImJvbmVZIiwic2Nyb2xsVG8iLCJ3aW4iLCJ3aW5kb3ciLCJkb2MiLCJkb2N1bWVudCIsIlByb21pc2UiLCJjcmVhdGVqcyIsImFwcGVuZFN0eWxlIiwiY3NzVGV4dCIsInN0eWxlIiwiY3JlYXRlRWxlbWVudCIsInRleHRDb250ZW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJhcHBlbmRDaGlsZCIsImRvbXJlYWR5IiwicmVqZWN0IiwicmVhZHlTdGF0ZSIsImRlZmVyIiwiZGVmZXJyZWQiLCJkZWxheSIsInRpbWUiLCJzZXRUaW1lb3V0IiwicXVlcnkiLCJzZWxlY3RvciIsInF1ZXJ5U2VsZWN0b3IiLCJxdWVyeUFsbCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJnZXRSZWN0IiwiZWwiLCJyZWN0cyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImdldERpc3RhbmNlIiwieDEiLCJ5MSIsIngyIiwieTIiLCJzcXJ0IiwiaW1nMkNhbnZhcyIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwicmFmIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiZm4iLCJjYWYiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsIndlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lIiwiaWQiLCJjbGVhclRpbWVvdXQiLCJTY3JvbGxlciIsInNjYWxlIiwiX2lzU2Nyb2xsaW5nIiwiX2VuYWJsZSIsIl9zY2FsZSIsImx4IiwibHkiLCJuYW1lIiwiZXh0cmEiLCJrZXkiLCJlbWl0IiwiZW1pdFRhcCIsIl9lbWl0IiwidG91Y2giLCJjbGllbnRYIiwiY2xpZW50WSIsImVtaXRTdGFydCIsImVtaXRTY3JvbGwiLCJlbWl0RW5kIiwiY2FsWFkiLCJub1NjYWxlIiwiZGlzcGxhY2VtZW50WCIsImRpc3BsYWNlbWVudFkiLCJtaW4iLCJtYXgiLCJFdmVudCIsInByb3RvdHlwZSIsImlzSU9TIiwiU3RhZ2UiLCJzdGFnZUVsIiwic2xpY2VzIiwidiIsImgiLCJpbmRleCIsIlN0cmluZyIsImhvdmVyIiwiZ2V0U2xpY2UiLCJyZWxhdGVkIiwic2xpY2UiLCJob3ZlcmVkIiwiY3giLCJjeSIsImR4IiwiZHkiLCJyYXRpbyIsImZvY3VzZWQiLCJkaXNwbGF5IiwibGVuZ3RoIiwiZmlsdGVyIiwiQ2FudmFzSW1hZ2UiLCJIVE1MQ2FudmFzRWxlbWVudCIsIl9pbWFnZSIsInBhcmFtcyIsImxvYWRlZCIsInBhcmFtIiwiaW1nIiwic3JjIiwiZm9yRWFjaCIsImFyZ3MiLCJzeCIsInN5Iiwic3ciLCJzaCIsIkltYWdlIiwidG9EYXRhVVJMIiwiQ2FudmFzUmVuZGVyIiwiX3Zpc2libGUiLCJfb2Zmc2NyZWVuIiwiY29pblgiLCJjb2luWSIsImlzRWFydGgiLCJIZWxsb1dvcmxkIiwid3JhcEVsIiwidGV4dEVsIiwic3RhcnRFbCIsImR1cmF0aW9uIiwiY291bnQiLCJkZWx0YSIsImJhY2tncm91bmRQb3NpdGlvblgiLCJvbmNsaWNrIiwiY2xhc3NOYW1lIiwiU3RhciIsImRyYXciLCJvYmoiLCJCZXppZXIiLCJvcmlnaW5TbGljZVdpZHRoIiwib3JpZ2luU2xpY2VIZWlnaHQiLCJFbGVtZW50cyIsInNjYWxlUmF0aW8iLCJ0ZXh0QWxwaGEiLCJnb2xkWSIsIm5vQ29pbiIsImNvaW4iLCJlbmRYIiwiZW5kWSIsInBlcmNlbnQiLCJzbG93IiwiaG92ZXJzIiwiY2FudmFzSW1hZ2UiLCJzdGF0aWNJbWciLCJ0ZXh0SW1nIiwiZ29sZEltZyIsImZsb3ciLCJvZmZzZXRZIiwicmFuZ2UiLCJlYXNlIiwiZWFzZUluIiwiZWFzZU91dCIsInNhdmUiLCJnbG9iYWxBbHBoYSIsInJlc3RvcmUiLCJjb2lucyIsImNvaW5JbWciLCJtYXRjaCIsIml0ZW0iLCJOdW1iZXIiLCJGb3VuZCIsInRleHROdW1iZXJFbCIsInRleHRUaXBFbCIsInRleHRCZ0VsIiwiYmFyRWwiLCJnb2xkRWwiLCJrZXlmcmFtZXMiLCJ3ZWJraXRBbmltYXRpb24iLCJNYXAiLCJjYW52YXNFbCIsImluZGljYXRvckVsIiwib3BlbmVkIiwic3VtRGVsdGEiLCJzaWduIiwic3RyIiwiY1dpZHRoIiwiY0hlaWdodCIsImlXaWR0aCIsImlIZWlnaHQiLCJzV2lkdGgiLCJzSGVpZ2h0Iiwid2Via2l0VHJhbnNmb3JtIiwiZmlsbFJlY3QiLCJmaWxsU3R5bGUiLCJnbG9iYWxDb21wb3NpdGVPcGVyYXRpb24iLCJUaWNrZXIiLCJfaWQiLCJfbWFwRiIsIl9tYXBDIiwiZiIsImhhcyIsInNldCIsImNhbmNlbCIsImdldCIsImMiLCJyaWQiLCJEYXRlIiwibm93IiwidGljayIsImtleXMiLCJQb3AiLCJwb3BFbCIsImNvbnRlbnRFbCIsImNsb3NlRWwiLCJ0aXRsZUVsIiwiYmcxRWwiLCJiZzJFbCIsImJ0bnNFbCIsImxlZnRCdG5FbCIsInJpZ2h0QnRuRWwiLCJ2aXNpYmlsaXR5IiwicmVwbGFjZSIsImlubmVySFRNTCIsImhhbmRsZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwib25MZWZ0Q2xpY2siLCJvblJpZ2h0Q2xpY2siLCJvbkNsb3NlQ2xpY2siLCJUaXAiLCJ0aXBFbCIsImNyZWF0ZUNPUlNSZXF1ZXN0IiwibWV0aG9kIiwidXJsIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwibWFrZUNvcnNSZXF1ZXN0Iiwib25sb2FkIiwib25lcnJvciIsInNlbmQiLCJTaGFyZSIsInNoYXJlRWwiLCJ3eFJlYWR5Iiwid3giLCJvbk1lbnVTaGFyZVRpbWVsaW5lIiwic3VjY2VzcyIsIm9uTWVudVNoYXJlQXBwTWVzc2FnZSIsImhpZGUiLCJKU09OIiwicGFyc2UiLCJyZXNwb25zZVRleHQiLCJzdWNlc3MiLCJqc0FwaUxpc3QiLCJlcnJvciIsImNhdGNoIiwid3ZSZWFkeSIsIk11c2ljIiwibXVzaWNFbCIsImJhcnNFbCIsImF1ZGlvIiwicGF1c2UiLCJsb29wIiwic3RvcFByb3BhZ2F0aW9uIiwicGF1c2VkIiwibG9hZGluZyIsInRleHRzIiwi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Q0E7QUFDQTtBQUNBLDRCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSwyQ0FBMEM7QUFDMUM7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7O0FDN09BO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQSxFQUFDO0FBQ0Q7QUFDQSxFQUFDO0FBQ0Q7QUFDQTs7Ozs7Ozs7QUNSQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFOzs7Ozs7O0FDN0JBOztB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QUFDUCxvQkFBVUEsS0FBS2lCLENBQWYsY0FBb0JqQixLQUFLbUcsQ0FBekI7QUFDSCxVQUxEOztBQU1BakcsaUJBQVEsQ0FOUjtBQU9BTSxtQkFBVTtBQVBWO0FBdkRPLEUiLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDk0OWY5OTJkNDA3YjMwZDYwZjdhIiwiaW1wb3J0ICcuL2dhbWUuY3NzJztcbmltcG9ydCB7XG4gICAgd2luLFxuICAgIGRvYyxcbiAgICBQcm9taXNlLFxuICAgIGRlZmVyLFxuICAgIHF1ZXJ5LFxuICAgIHF1ZXJ5QWxsLFxuICAgIGdldFJlY3QsXG4gICAgZGVsYXlcbn0gZnJvbSAnLi91dGlsJztcbmltcG9ydCBTY3JvbGxlciBmcm9tICcuL3Njcm9sbGVyJztcbmltcG9ydCBTdGFnZSBmcm9tICcuL3N0YWdlJztcbmltcG9ydCBIZWxsb1dvcmxkIGZyb20gJy4vaGVsbG9Xb3JsZCc7XG5pbXBvcnQgU3RhciBmcm9tICcuL3N0YXInO1xuaW1wb3J0IEVsZW1lbnRzIGZyb20gJy4vZWxlbWVudHMnO1xuaW1wb3J0IEZvdW5kIGZyb20gJy4vZm91bmQnO1xuaW1wb3J0IE1hcCBmcm9tICcuL21hcCc7XG5pbXBvcnQgVGlja2VyIGZyb20gJy4vdGlja2VyJztcbmltcG9ydCBQb3AgZnJvbSAnLi9wb3AnO1xuaW1wb3J0IFRpcCBmcm9tICcuL3RpcCc7XG5pbXBvcnQgU2hhcmUgZnJvbSAnLi9zaGFyZSc7XG5pbXBvcnQgTXVzaWMgZnJvbSAnLi9tdXNpYyc7XG5pbXBvcnQgdGV4dENvbmZpZyBmcm9tICcuL3RleHRDb25maWcnO1xuXG5jb25zdCB7XG4gICAgYXNzZXRzUHJlbG9hZDogcHJlbG9hZCxcbiAgICBhc3NldHNJdGVtczogaXRlbXMsXG59ID0gd2luO1xuXG5sZXQgdmlld3BvcnQgPSBxdWVyeShkb2MuYm9keSwgJyNnYW1lJyk7XG5sZXQgc2Nyb2xsZXI7XG5sZXQgdGlja2VyO1xubGV0IHN0YWdlO1xubGV0IGhlbGxvV29ybGQ7XG5sZXQgc3RhcjtcbmxldCBlbGVtZW50cztcbmxldCBmb3VuZDtcbmxldCBtYXA7XG5sZXQgcG9wO1xubGV0IHRpcDtcbmxldCBzaGFyZTtcbmxldCBtdXNpYztcblxuZnVuY3Rpb24gc2hvd1RpcChjb25maWcsIGRhdGEpIHtcbiAgICByZXR1cm4gdGlwLnNob3coe1xuICAgICAgICB0aXA6IGNvbmZpZy50aXAsXG4gICAgICAgIGJnVHlwZTogY29uZmlnLmJnVHlwZVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBzaG93UG9wKGNvbmZpZywgZGF0YSkge1xuICAgIHNjcm9sbGVyICYmIChzY3JvbGxlci5lbmFibGUgPSBmYWxzZSk7XG5cbiAgICBjb25zdCB0ZXh0ID0gdHlwZW9mIGNvbmZpZy50ZXh0ID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICAgICAgICAgID8gY29uZmlnLnRleHQoZGF0YSkgOiBjb25maWcudGV4dDtcblxuICAgIHJldHVybiBwb3AucG9wdXAoe1xuICAgICAgICB0aXRsZTogY29uZmlnLnRpdGxlLFxuICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICBzaGFyZWJsZTogY29uZmlnLnNoYXJlYmxlLFxuICAgICAgICBiZ1R5cGU6IGNvbmZpZy5iZ1R5cGUsXG4gICAgICAgIG9ubGVmdGNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgcG9wLmNsb3NlKCksXG4gICAgICAgICAgICAgICAgc2hhcmUuc2hvdygpXG4gICAgICAgICAgICBdKS50aGVuKCgpID0+IHNjcm9sbGVyLmVuYWJsZSA9IHRydWUpO1xuICAgICAgICB9LFxuICAgICAgICBvbnJpZ2h0Y2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgIHBvcC5jbG9zZSgpLnRoZW4oKCkgPT4gc2Nyb2xsZXIuZW5hYmxlID0gdHJ1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uY2xvc2VjbGljazogKCkgPT4ge1xuICAgICAgICAgICAgcG9wLmNsb3NlKCkudGhlbigoKSA9PiBzY3JvbGxlci5lbmFibGUgPSB0cnVlKTtcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHNoYXJlV3goZGF0YSkge1xuICAgIHNoYXJlLnNoYXJlV3goe1xuICAgICAgICB0aXRsZTogJ+emu+W8gOWcsOihqO+8geWSjFRHUOWOu+eci+ecizUwMDDlhYnlubTlpJbnmoTmmJ/ovrDlpKfmtbcnLFxuICAgICAgICBkZXNjOiBg6Iyr6Iyr5ri45oiP5a6H5a6Z5rex5LiN6KeB5bqV77yM5oiRJHtkYXRhLm0gKiA2MCArIGRhdGEubn3np5LlsLHmu5HkuoYke2RhdGEubn3nmb7kuIflhYnlubRgLFxuICAgICAgICBsaW5rOiAnaHR0cDovL21wLmltYXhnaW5lLmNvbS90Z3Avc3BhY2UvaW5kZXguaHRtbCcsXG4gICAgICAgIGltZ1VybDogJ2h0dHA6Ly9tcC5pbWF4Z2luZS5jb20vdGdwL3NwYWNlL2Fzc2V0cy9sb2dvLmpwZydcbiAgICB9KTtcbn1cblxucHJlbG9hZFxuICAgIC50aGVuKCgpID0+IHsgLy8gcHJldmVudCBldmVudFxuICAgICAgICB2aWV3cG9ydC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZSA9PiBlLnByZXZlbnREZWZhdWx0KCkpO1xuICAgICAgICB2aWV3cG9ydC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBlID0+IGUucHJldmVudERlZmF1bHQoKSk7XG4gICAgICAgIHZpZXdwb3J0LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZSA9PiBlLnByZXZlbnREZWZhdWx0KCkpO1xuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4geyAvLyBtdXNpY1xuICAgICAgICBtdXNpYyA9IG5ldyBNdXNpYyh2aWV3cG9ydCwgaXRlbXMpO1xuICAgICAgICByZXR1cm4gbXVzaWMucmVhZHkoKTtcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHsgLy8gdGlja2VyXG4gICAgICAgIHRpY2tlciA9IG5ldyBUaWNrZXIoKTtcbiAgICAgICAgdGlja2VyLnJ1bigpO1xuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4geyAvLyBoZWxsb3dvcmxkXG4gICAgICAgIGhlbGxvV29ybGQgPSBuZXcgSGVsbG9Xb3JsZCh2aWV3cG9ydCwgaXRlbXMpO1xuICAgICAgICByZXR1cm4gaGVsbG9Xb3JsZC5yZWFkeSgpO1xuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4geyAvLyBzdGFnZVxuICAgICAgICBzdGFnZSA9IG5ldyBTdGFnZSh2aWV3cG9ydCk7XG4gICAgICAgIHJldHVybiBzdGFnZS5yZWFkeSgpO1xuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4geyAvLyBzY3JvbGxlclxuICAgICAgICBjb25zdCBzY3JvbGxTbG93UmF0aW8gPSAxLjg7XG4gICAgICAgIHNjcm9sbGVyID0gbmV3IFNjcm9sbGVyKHN0YWdlLndpZHRoLCBzdGFnZS5oZWlnaHQsIHN0YWdlLnZ3LCBzdGFnZS52aCwgc2Nyb2xsU2xvd1JhdGlvLCBzdGFnZS5kcHIpO1xuICAgICAgICBzY3JvbGxlci5lbmFibGUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHNjcm9sbGVyLnJlYWR5KCk7XG4gICAgfSlcbiAgICAudGhlbigoKSA9PiB7IC8vIHRoaW5nc1xuICAgICAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuXG4gICAgICAgIHN0YXIgPSBuZXcgU3RhcihzdGFnZSwgaXRlbXMpO1xuICAgICAgICBwcm9taXNlcy5wdXNoKHN0YXIucmVhZHkoKSk7XG5cbiAgICAgICAgZWxlbWVudHMgPSBuZXcgRWxlbWVudHMoc3RhZ2UsIGl0ZW1zKTtcbiAgICAgICAgcHJvbWlzZXMucHVzaChlbGVtZW50cy5yZWFkeSgpKTtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4geyAvLyByZW5kZXJcbiAgICAgICAgbGV0IGZpcnN0UmVuZGVyZWQgPSBmYWxzZTtcbiAgICAgICAgbGV0IHNjcm9sbFggPSAwO1xuICAgICAgICBsZXQgc2Nyb2xsWSA9IDA7XG4gICAgICAgIGxldCBzdGFyUm9sbFkgPSBzdGFnZS52aDtcbiAgICAgICAgbGV0IHN0YXJSb2xsU3BlZWQgPSAwLjQ7XG4gICAgICAgIGxldCBzdGFyUm9sbElkID0gdGlja2VyLmFkZCgoKSA9PiB7XG4gICAgICAgICAgICBzdGFyUm9sbFkgLT0gc3RhclJvbGxTcGVlZDtcbiAgICAgICAgICAgIGlmIChzdGFyUm9sbFkgPCAwKSB7XG4gICAgICAgICAgICAgICAgc3RhclJvbGxZID0gc3RhZ2Uudmg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgc2hvd1RleHRJZDtcbiAgICAgICAgbGV0IHNob3dHbG9kSWQ7XG4gICAgICAgIGxldCBmbHlDb2luSWQ7XG4gICAgICAgIGxldCBob3ZlclNsaWNlID0gc3RhZ2UuZ2V0SG92ZXJTbGljZSgwLCAwKTtcbiAgICAgICAgbGV0IGZvY3VzU2xpY2UgPSBzdGFnZS5nZXRGb2N1c1NsaWNlKHN0YWdlLnNsaWNlV2lkdGggLyAyLCBzdGFnZS5zbGljZUhlaWdodCAvIDIpO1xuXG4gICAgICAgIHNjcm9sbGVyLm9uKCdzY3JvbGxzdGFydCcsIGUgPT4ge1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNjcm9sbGVyLm9uKCdzY3JvbGxpbmcnLCBlID0+IHtcbiAgICAgICAgICAgIHNjcm9sbFggPSBlLng7XG4gICAgICAgICAgICBzY3JvbGxZID0gZS55O1xuICAgICAgICAgICAgaG92ZXJTbGljZSA9IHN0YWdlLmdldEhvdmVyU2xpY2Uoc2Nyb2xsWCwgc2Nyb2xsWSk7XG4gICAgICAgICAgICBmb2N1c1NsaWNlID0gc3RhZ2UuZ2V0Rm9jdXNTbGljZShzY3JvbGxYICsgc3RhZ2Uuc2xpY2VXaWR0aCAvIDIsIHNjcm9sbFkgKyBzdGFnZS5zbGljZUhlaWdodCAvIDIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzY3JvbGxlci5vbignc2Nyb2xsZW5kJywgZSA9PiB7XG4gICAgICAgICAgICBpZiAoZm9jdXNTbGljZSkge1xuICAgICAgICAgICAgICAgIGlmIChmb2N1c1NsaWNlLnR5cGUgPj0gMikge1xuICAgICAgICAgICAgICAgICAgICBzaG93VGV4dElkID0gdGlja2VyLmFkZChlbGVtZW50cy5zaG93VGV4dChmb2N1c1NsaWNlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBzY3JvbGxlci5vbigndGFwJywgZSA9PiB7XG4gICAgICAgICAgICBpZiAoZS5vcmlnaW5hbEV2ZW50LnRhcmdldCA9PT0gc3RhZ2UuY2FudmFzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFwRm9jdXNTbGljZSA9IHN0YWdlLmdldEZvY3VzU2xpY2UoZS5leCwgZS5leSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGFwRm9jdXNTbGljZSkge1xuICAgICAgICAgICAgICAgICAgICBzaG93R2xvZElkID0gdGlja2VyLmFkZChlbGVtZW50cy5zaG93R29sZCh0YXBGb2N1c1NsaWNlKSk7XG4gICAgICAgICAgICAgICAgICAgIHRpY2tlci5lbmQoc2hvd0dsb2RJZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbHlDb2luSWQgPSB0aWNrZXIuYWRkKGVsZW1lbnRzLmZseUNvaW4odGFwRm9jdXNTbGljZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRpY2tlci5vbignYWZ0ZXJ0aWNrJywgZSA9PiB7XG4gICAgICAgICAgICBmb3VuZCAmJiBmb3VuZC51cGRhdGUoXG4gICAgICAgICAgICAgICAgc3RhZ2Uuc3BlY2lhbEFtb3VudCxcbiAgICAgICAgICAgICAgICBzdGFnZS5zcGVjaWFsRm91bmQsXG4gICAgICAgICAgICAgICAgc3RhZ2UudG90YWxBbW91bnQsXG4gICAgICAgICAgICAgICAgc3RhZ2UuaG92ZXJlZEFtb3VudFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgZWxlbWVudHMuZHJhd0ltYWdlcyhob3ZlclNsaWNlLCBmb2N1c1NsaWNlLCBzY3JvbGxYLCBzY3JvbGxZLCBlKTtcblxuICAgICAgICAgICAgc3RhZ2Uub2Zmc2NyZWVuUmVuZGVyLmNsZWFyUmVjdCgwLCAwLCBzdGFnZS52dywgc3RhZ2UudmgpO1xuICAgICAgICAgICAgc3RhZ2Uub2Zmc2NyZWVuUmVuZGVyLmRyYXdJbWFnZShzdGFyLmltYWdlLCAwLCBzdGFyUm9sbFksIHN0YWdlLnZ3LCBzdGFnZS52aCwgMCwgMCwgc3RhZ2UudncsIHN0YWdlLnZoKTtcbiAgICAgICAgICAgIHN0YWdlLm9mZnNjcmVlblJlbmRlci5kcmF3SW1hZ2UoZWxlbWVudHMuY2FudmFzLCAwLCAwLCBzdGFnZS52dywgc3RhZ2UudmgsIDAsIDAsIHN0YWdlLnZ3LCBzdGFnZS52aCk7XG5cbiAgICAgICAgICAgIHN0YWdlLnJlbmRlci5jbGVhclJlY3QoMCwgMCwgc3RhZ2UudncsIHN0YWdlLnZoKTtcbiAgICAgICAgICAgIHN0YWdlLnJlbmRlci5kcmF3SW1hZ2Uoc3RhZ2Uub2Zmc2NyZWVuQ2FudmFzLCAwLCAwLCBzdGFnZS52dywgc3RhZ2UudmgsIDAsIDAsIHN0YWdlLnZ3LCBzdGFnZS52aCk7XG4gICAgICAgIH0pO1xuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4geyAvLyBzaG93IGhlbGxvd29ybGRcbiAgICAgICAgY29uc3QgcmVwZWF0ID0gMztcbiAgICAgICAgbGV0IHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlcGVhdDsgaSsrKSB7XG4gICAgICAgICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0aWNrZXJJZCA9IHRpY2tlci5hZGQoaGVsbG9Xb3JsZC5wbGF5KCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aWNrZXIuZW5kKHRpY2tlcklkKTtcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4gZGVsYXkoNTAwICsgTWF0aC5yYW5kb20oKSAqIDIwMCkpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKCgpID0+XG4gICAgICAgICAgICAgICAgaGVsbG9Xb3JsZC5zdGFydCgoKSA9PiBtdXNpYy5wbGF5KCkpXG4gICAgICAgICAgICAgICAgKTtcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHsgLy8gbWFwXG4gICAgICAgIG1hcCA9IG5ldyBNYXAodmlld3BvcnQsIHN0YWdlLmhTbGljZSwgc3RhZ2UudlNsaWNlKTtcblxuICAgICAgICBsZXQgcmFuZG9tVGV4dElkO1xuXG4gICAgICAgIHNjcm9sbGVyLm9uKCdzY3JvbGxzdGFydCcsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKHJhbmRvbVRleHRJZCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmFuZG9tVGV4dElkID0gdGlja2VyLmFkZChtYXAucmFuZG9tVGV4dCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2Nyb2xsZXIub24oJ3Njcm9sbGluZycsIGUgPT4ge1xuICAgICAgICAgICAgY29uc3QgeHAgPSBlLnggLyBzdGFnZS53aWR0aDtcbiAgICAgICAgICAgIGNvbnN0IHlwID0gZS55IC8gc3RhZ2UuaGVpZ2h0O1xuICAgICAgICAgICAgbWFwLnVwZGF0ZSh4cCwgeXApO1xuICAgICAgICB9KTtcblxuICAgICAgICBzY3JvbGxlci5vbignc2Nyb2xsZW5kJywgZSA9PiB7XG4gICAgICAgICAgICBjb25zdCB4cCA9IGUueCAvIHN0YWdlLndpZHRoO1xuICAgICAgICAgICAgY29uc3QgeXAgPSBlLnkgLyBzdGFnZS5oZWlnaHQ7XG4gICAgICAgICAgICBtYXAuY2xlYXIoeHAsIHlwKTtcblxuICAgICAgICAgICAgY29uc3QgZm9jdXNTbGljZSA9IHN0YWdlLmdldEZvY3VzU2xpY2UoZS54ICsgc3RhZ2Uuc2xpY2VXaWR0aCAvIDIsIGUueSArIHN0YWdlLnNsaWNlSGVpZ2h0IC8gMik7XG4gICAgICAgICAgICBpZiAoZm9jdXNTbGljZSAmJiBmb2N1c1NsaWNlLmRpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgdGlja2VyLmRlbGV0ZShyYW5kb21UZXh0SWQpO1xuICAgICAgICAgICAgICAgIHJhbmRvbVRleHRJZCA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICBtYXAudGV4dChmb2N1c1NsaWNlLmRpc3RhbmNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG1hcC5yZWFkeSgpO1xuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4geyAvLyBmb3VuZFxuICAgICAgICBmb3VuZCA9IG5ldyBGb3VuZCh2aWV3cG9ydCwgaXRlbXMpO1xuXG4gICAgICAgIGZvdW5kLm9uKCd1cGRhdGUnLCAoe1xuICAgICAgICAgICAgZm91bmQsXG4gICAgICAgICAgICBhbW91bnQsXG4gICAgICAgICAgICB0b3RhbCxcbiAgICAgICAgICAgIGZvY3VzXG4gICAgICAgIH0pID0+IHtcbiAgICAgICAgICAgIGxldCBjb25maWc7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHt9O1xuXG4gICAgICAgICAgICBkYXRhLm0gPSBwYXJzZUludCh0aWNrZXIuZWxhcHNlZCAvIDEwMDAgLyA2MCk7XG4gICAgICAgICAgICBkYXRhLnMgPSBwYXJzZUludCh0aWNrZXIuZWxhcHNlZCAvIDEwMDAgLSA2MCAqIGRhdGEubSk7XG4gICAgICAgICAgICBkYXRhLm4gPSBmb3VuZDtcblxuICAgICAgICAgICAgc2hhcmVXeChkYXRhKTtcblxuICAgICAgICAgICAgaWYgKGZvdW5kID09PSBhbW91bnRcbiAgICAgICAgICAgICAgICAmJiBmb2N1cyA9PT0gdG90YWwpIHtcbiAgICAgICAgICAgICAgICBjb25maWcgPSB0ZXh0Q29uZmlnWydnZyddO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChmb2N1cyA9PT0gdG90YWwpIHtcbiAgICAgICAgICAgICAgICBjb25maWcgPSB0ZXh0Q29uZmlnWydibGFja3NoZWVwd2FsbCddO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChmb3VuZCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGNvbmZpZyA9IHRleHRDb25maWdbJ2dsJ107XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbmZpZyA9IHRleHRDb25maWdbYGZvdW5kJHtmb3VuZH1gXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNvbmZpZyAmJiAhY29uZmlnLnNob3duKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLnNob3duID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnLnR5cGUgPT09ICd0aXAnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dUaXAoY29uZmlnLCBkYXRhKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy50eXBlID09PSAncG9wdXAnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dQb3AoY29uZmlnLCBkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBmb3VuZC5yZWFkeSgpO1xuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4geyAvLyBwb3BcbiAgICAgICAgcG9wID0gbmV3IFBvcCh2aWV3cG9ydCk7XG4gICAgICAgIHJldHVybiBwb3AucmVhZHkoKTtcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHsgLy8gdGlwXG4gICAgICAgIHRpcCA9IG5ldyBUaXAodmlld3BvcnQpO1xuICAgICAgICByZXR1cm4gdGlwLnJlYWR5KCk7XG4gICAgfSlcbiAgICAudGhlbigoKSA9PiB7IC8vIHNoYXJlXG4gICAgICAgIHNoYXJlID0gbmV3IFNoYXJlKHZpZXdwb3J0LCBpdGVtcyk7XG4gICAgICAgIHJldHVybiBzaGFyZS5yZWFkeSgpO1xuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4geyAvLyBib25lXG4gICAgICAgIGNvbnN0IGJvbmVYID0gc3RhZ2Uud2lkdGggLyAyIC0gc3RhZ2UudncgLyAyO1xuICAgICAgICBjb25zdCBib25lWSA9IHN0YWdlLmhlaWdodCAtIHN0YWdlLnZoIC8gMjtcbiAgICAgICAgc2Nyb2xsZXIuZW5hYmxlID0gdHJ1ZTtcbiAgICAgICAgc2Nyb2xsZXIuc2Nyb2xsVG8oYm9uZVgsIGJvbmVZKTtcbiAgICB9KVxuICAgIC8vIC50aGVuKCgpID0+IGRlbGF5KDIwMDApKVxuICAgIC50aGVuKCgpID0+IHsgLy8gc2hvdyBndWlkZVxuICAgICAgICAvLyBzaG93VGlwKHRleHRDb25maWcuZm91bmQ1KTtcbiAgICAgICAgLy8gc2hvd1BvcCh0ZXh0Q29uZmlnLmdnLCB7XG4gICAgICAgIC8vICAgICBtOiAxLFxuICAgICAgICAvLyAgICAgczogNSxcbiAgICAgICAgLy8gICAgIG46IDZcbiAgICAgICAgLy8gfSk7XG4gICAgfSlcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZ2FtZS5qcyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvaW5kZXguanMhLi9nYW1lLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi8uLi9ub2RlX21vZHVsZXMvLjAuMTMuMUBzdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vZ2FtZS5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL2dhbWUuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9nYW1lLmNzc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiI2dhbWUge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBtYXJnaW46IDA7XFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4yNS4wQGNzcy1sb2FkZXIhLi9zcmMvZ2FtZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cclxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHJcblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcclxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XHJcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xyXG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XHJcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcclxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcclxuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxyXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xyXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxyXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxyXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xyXG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xyXG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4yNS4wQGNzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxudmFyIHN0eWxlc0luRG9tID0ge30sXHJcblx0bWVtb2l6ZSA9IGZ1bmN0aW9uKGZuKSB7XHJcblx0XHR2YXIgbWVtbztcclxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHRcdHJldHVybiBtZW1vO1xyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIC9tc2llIFs2LTldXFxiLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpO1xyXG5cdH0pLFxyXG5cdGdldEhlYWRFbGVtZW50ID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XHJcblx0fSksXHJcblx0c2luZ2xldG9uRWxlbWVudCA9IG51bGwsXHJcblx0c2luZ2xldG9uQ291bnRlciA9IDAsXHJcblx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AgPSBbXTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xyXG5cdGlmKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xyXG5cdFx0aWYodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XHJcblx0fVxyXG5cclxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cclxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXHJcblx0aWYgKHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XHJcblxyXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiA8aGVhZD4uXHJcblx0aWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcclxuXHJcblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0KTtcclxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcclxuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XHJcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcclxuXHRcdH1cclxuXHRcdGlmKG5ld0xpc3QpIHtcclxuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0KTtcclxuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcclxuXHRcdH1cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xyXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XHJcblx0XHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKVxyXG5cdFx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oKTtcclxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKSB7XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdGlmKGRvbVN0eWxlKSB7XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIHBhcnRzID0gW107XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMobGlzdCkge1xyXG5cdHZhciBzdHlsZXMgPSBbXTtcclxuXHR2YXIgbmV3U3R5bGVzID0ge307XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcclxuXHRcdHZhciBpZCA9IGl0ZW1bMF07XHJcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcclxuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XHJcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcclxuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcclxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKVxyXG5cdFx0XHRzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XHJcblx0fVxyXG5cdHJldHVybiBzdHlsZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZUVsZW1lbnQpIHtcclxuXHR2YXIgaGVhZCA9IGdldEhlYWRFbGVtZW50KCk7XHJcblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Bbc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XHJcblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcclxuXHRcdGlmKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xyXG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGhlYWQuZmlyc3RDaGlsZCk7XHJcblx0XHR9IGVsc2UgaWYobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcclxuXHRcdFx0aGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlRWxlbWVudCk7XHJcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XHJcblx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnLiBNdXN0IGJlICd0b3AnIG9yICdib3R0b20nLlwiKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcclxuXHRzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdHZhciBpZHggPSBzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlRWxlbWVudCk7XHJcblx0aWYoaWR4ID49IDApIHtcclxuXHRcdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG5cdHN0eWxlRWxlbWVudC50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xyXG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZUVsZW1lbnQpO1xyXG5cdHJldHVybiBzdHlsZUVsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpIHtcclxuXHR2YXIgbGlua0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcclxuXHRsaW5rRWxlbWVudC5yZWwgPSBcInN0eWxlc2hlZXRcIjtcclxuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGlua0VsZW1lbnQpO1xyXG5cdHJldHVybiBsaW5rRWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCwgdXBkYXRlLCByZW1vdmU7XHJcblxyXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xyXG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBzaW5nbGV0b25FbGVtZW50IHx8IChzaW5nbGV0b25FbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIGZhbHNlKTtcclxuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIHRydWUpO1xyXG5cdH0gZWxzZSBpZihvYmouc291cmNlTWFwICYmXHJcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xyXG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCk7XHJcblx0XHRyZW1vdmUgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XHJcblx0XHRcdGlmKHN0eWxlRWxlbWVudC5ocmVmKVxyXG5cdFx0XHRcdFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGVFbGVtZW50LmhyZWYpO1xyXG5cdFx0fTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xyXG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCk7XHJcblx0XHRyZW1vdmUgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0dXBkYXRlKG9iaik7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZShuZXdPYmopIHtcclxuXHRcdGlmKG5ld09iaikge1xyXG5cdFx0XHRpZihuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJlbW92ZSgpO1xyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XHJcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xyXG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xyXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XHJcblx0fTtcclxufSkoKTtcclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcoc3R5bGVFbGVtZW50LCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcclxuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XHJcblxyXG5cdGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XHJcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlRWxlbWVudC5jaGlsZE5vZGVzO1xyXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xyXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcclxuXHJcblx0aWYobWVkaWEpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcclxuXHR9XHJcblxyXG5cdGlmKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR3aGlsZShzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlTGluayhsaW5rRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XHJcblxyXG5cdGlmKHNvdXJjZU1hcCkge1xyXG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcclxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcclxuXHR9XHJcblxyXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xyXG5cclxuXHR2YXIgb2xkU3JjID0gbGlua0VsZW1lbnQuaHJlZjtcclxuXHJcblx0bGlua0VsZW1lbnQuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcblxyXG5cdGlmKG9sZFNyYylcclxuXHRcdFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMTMuMUBzdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiY29uc3Qgd2luID0gd2luZG93O1xuY29uc3Qge1xuICAgIGRvY3VtZW50OiBkb2MsXG4gICAgUHJvbWlzZSxcbiAgICBjcmVhdGVqc1xufSA9IHdpbjtcblxuZnVuY3Rpb24gYXBwZW5kU3R5bGUoY3NzVGV4dCkge1xuICAgIGNvbnN0IHN0eWxlID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgc3R5bGUudGV4dENvbnRlbnQgPSBjc3NUZXh0O1xuICAgIGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxuZnVuY3Rpb24gZG9tcmVhZHkoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKGRvYy5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHJlc29sdmUpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGRlZmVyKCkge1xuICAgIGNvbnN0IGRlZmVycmVkID0ge307XG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgIGRlZmVycmVkLnJlamVjdCA9IHJlamVjdFxuICAgIH0pO1xuICAgIGRlZmVycmVkLnByb21pc2UgPSBwcm9taXNlO1xuICAgIHJldHVybiBkZWZlcnJlZDtcbn1cblxuZnVuY3Rpb24gZGVsYXkodGltZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgdGltZSk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHF1ZXJ5KHZpZXdwb3J0LCBzZWxlY3Rvcikge1xuICAgIHJldHVybiB2aWV3cG9ydC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbn1cblxuZnVuY3Rpb24gcXVlcnlBbGwodmlld3BvcnQsIHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIFsuLi52aWV3cG9ydC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKV07XG59XG5cbmZ1bmN0aW9uIGdldFJlY3QoZWwpIHtcbiAgICByZXR1cm4gZWwucmVjdHMgfHwgKGVsLnJlY3RzID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpO1xufVxuXG5mdW5jdGlvbiBnZXREaXN0YW5jZSh4MSwgeTEsIHgyLCB5Mikge1xuICAgIHJldHVybiBNYXRoLnNxcnQoKHgxIC0geDIpICogKHgxIC0geDIpICsgKHkxIC0geTIpICogKHkxIC0geTIpKTtcbn1cblxuZnVuY3Rpb24gaW1nMkNhbnZhcyhpbWFnZSwgd2lkdGgsIGhlaWdodCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGRvYy5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBjb250ZXh0LmRyYXdJbWFnZShpbWFnZSwgMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgcmV0dXJuIFtjYW52YXMsIGNvbnRleHRdO1xufVxuXG5jb25zdCByYWYgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICBmdW5jdGlvbihmbikge3JldHVybiBzZXRUaW1lb3V0KGZuLCAxIC8gNjApfTtcblxuY29uc3QgY2FmID0gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IFxuICAgICAgICAgICAgd2luZG93LndlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICAgICBmdW5jdGlvbihpZCkge2NsZWFyVGltZW91dChpZCl9O1xuXG5leHBvcnQge1xuICAgIHdpbixcbiAgICBkb2MsXG4gICAgZGVmZXIsXG4gICAgUHJvbWlzZSxcbiAgICBjcmVhdGVqcyxcbiAgICBhcHBlbmRTdHlsZSxcbiAgICBkb21yZWFkeSxcbiAgICBkZWxheSxcbiAgICBpbWcyQ2FudmFzLFxuICAgIHF1ZXJ5LFxuICAgIHF1ZXJ5QWxsLFxuICAgIGdldFJlY3QsXG4gICAgZ2V0RGlzdGFuY2UsXG4gICAgcmFmLFxuICAgIGNhZlxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlsLmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZnJvbSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL2FycmF5L2Zyb21cIik7XG5cbnZhciBfZnJvbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9mcm9tKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyMltpXSA9IGFycltpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyMjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gKDAsIF9mcm9tMi5kZWZhdWx0KShhcnIpO1xuICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy90b0NvbnN1bWFibGVBcnJheS5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9hcnJheS9mcm9tXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL2FycmF5L2Zyb20uanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LmFycmF5LmZyb20nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLkFycmF5LmZyb207XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbS5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcbnZhciAkYXQgID0gcmVxdWlyZSgnLi9fc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24oaXRlcmF0ZWQpe1xuICB0aGlzLl90ID0gU3RyaW5nKGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4vLyAyMS4xLjUuMi4xICVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBpbmRleCA9IHRoaXMuX2lcbiAgICAsIHBvaW50O1xuICBpZihpbmRleCA+PSBPLmxlbmd0aClyZXR1cm4ge3ZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWV9O1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIHRoaXMuX2kgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4ge3ZhbHVlOiBwb2ludCwgZG9uZTogZmFsc2V9O1xufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBkZWZpbmVkICAgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG4vLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihUT19TVFJJTkcpe1xuICByZXR1cm4gZnVuY3Rpb24odGhhdCwgcG9zKXtcbiAgICB2YXIgcyA9IFN0cmluZyhkZWZpbmVkKHRoYXQpKVxuICAgICAgLCBpID0gdG9JbnRlZ2VyKHBvcylcbiAgICAgICwgbCA9IHMubGVuZ3RoXG4gICAgICAsIGEsIGI7XG4gICAgaWYoaSA8IDAgfHwgaSA+PSBsKXJldHVybiBUT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGwgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxuICAgICAgOiBUT19TVFJJTkcgPyBzLnNsaWNlKGksIGkgKyAyKSA6IChhIC0gMHhkODAwIDw8IDEwKSArIChiIC0gMHhkYzAwKSArIDB4MTAwMDA7XG4gIH07XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3N0cmluZy1hdC5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsICA9IE1hdGguY2VpbFxuICAsIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSAgICAgICAgPSByZXF1aXJlKCcuL19saWJyYXJ5JylcbiAgLCAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgcmVkZWZpbmUgICAgICAgPSByZXF1aXJlKCcuL19yZWRlZmluZScpXG4gICwgaGlkZSAgICAgICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgSXRlcmF0b3JzICAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsICRpdGVyQ3JlYXRlICAgID0gcmVxdWlyZSgnLi9faXRlci1jcmVhdGUnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpXG4gICwgSVRFUkFUT1IgICAgICAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIEJVR0dZICAgICAgICAgID0gIShbXS5rZXlzICYmICduZXh0JyBpbiBbXS5rZXlzKCkpIC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbiAgLCBGRl9JVEVSQVRPUiAgICA9ICdAQGl0ZXJhdG9yJ1xuICAsIEtFWVMgICAgICAgICAgID0gJ2tleXMnXG4gICwgVkFMVUVTICAgICAgICAgPSAndmFsdWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpe1xuICAkaXRlckNyZWF0ZShDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG4gIHZhciBnZXRNZXRob2QgPSBmdW5jdGlvbihraW5kKXtcbiAgICBpZighQlVHR1kgJiYga2luZCBpbiBwcm90bylyZXR1cm4gcHJvdG9ba2luZF07XG4gICAgc3dpdGNoKGtpbmQpe1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gIH07XG4gIHZhciBUQUcgICAgICAgID0gTkFNRSArICcgSXRlcmF0b3InXG4gICAgLCBERUZfVkFMVUVTID0gREVGQVVMVCA9PSBWQUxVRVNcbiAgICAsIFZBTFVFU19CVUcgPSBmYWxzZVxuICAgICwgcHJvdG8gICAgICA9IEJhc2UucHJvdG90eXBlXG4gICAgLCAkbmF0aXZlICAgID0gcHJvdG9bSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdXG4gICAgLCAkZGVmYXVsdCAgID0gJG5hdGl2ZSB8fCBnZXRNZXRob2QoREVGQVVMVClcbiAgICAsICRlbnRyaWVzICAgPSBERUZBVUxUID8gIURFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZCgnZW50cmllcycpIDogdW5kZWZpbmVkXG4gICAgLCAkYW55TmF0aXZlID0gTkFNRSA9PSAnQXJyYXknID8gcHJvdG8uZW50cmllcyB8fCAkbmF0aXZlIDogJG5hdGl2ZVxuICAgICwgbWV0aG9kcywga2V5LCBJdGVyYXRvclByb3RvdHlwZTtcbiAgLy8gRml4IG5hdGl2ZVxuICBpZigkYW55TmF0aXZlKXtcbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKCRhbnlOYXRpdmUuY2FsbChuZXcgQmFzZSkpO1xuICAgIGlmKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlKXtcbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xuICAgICAgLy8gZml4IGZvciBzb21lIG9sZCBlbmdpbmVzXG4gICAgICBpZighTElCUkFSWSAmJiAhaGFzKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUikpaGlkZShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgIH1cbiAgfVxuICAvLyBmaXggQXJyYXkje3ZhbHVlcywgQEBpdGVyYXRvcn0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmKERFRl9WQUxVRVMgJiYgJG5hdGl2ZSAmJiAkbmF0aXZlLm5hbWUgIT09IFZBTFVFUyl7XG4gICAgVkFMVUVTX0JVRyA9IHRydWU7XG4gICAgJGRlZmF1bHQgPSBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuICRuYXRpdmUuY2FsbCh0aGlzKTsgfTtcbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYoKCFMSUJSQVJZIHx8IEZPUkNFRCkgJiYgKEJVR0dZIHx8IFZBTFVFU19CVUcgfHwgIXByb3RvW0lURVJBVE9SXSkpe1xuICAgIGhpZGUocHJvdG8sIElURVJBVE9SLCAkZGVmYXVsdCk7XG4gIH1cbiAgLy8gUGx1ZyBmb3IgbGlicmFyeVxuICBJdGVyYXRvcnNbTkFNRV0gPSAkZGVmYXVsdDtcbiAgSXRlcmF0b3JzW1RBR10gID0gcmV0dXJuVGhpcztcbiAgaWYoREVGQVVMVCl7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogIERFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChWQUxVRVMpLFxuICAgICAga2V5czogICAgSVNfU0VUICAgICA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogJGVudHJpZXNcbiAgICB9O1xuICAgIGlmKEZPUkNFRClmb3Ioa2V5IGluIG1ldGhvZHMpe1xuICAgICAgaWYoIShrZXkgaW4gcHJvdG8pKXJlZGVmaW5lKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XG4gICAgfSBlbHNlICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKEJVR0dZIHx8IFZBTFVFU19CVUcpLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxuICByZXR1cm4gbWV0aG9kcztcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZWZpbmUuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSB0cnVlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2xpYnJhcnkuanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgID0gcmVxdWlyZSgnLi9fY29yZScpXG4gICwgY3R4ICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBoaWRlICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbih0eXBlLCBuYW1lLCBzb3VyY2Upe1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRlxuICAgICwgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuR1xuICAgICwgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuU1xuICAgICwgSVNfUFJPVE8gID0gdHlwZSAmICRleHBvcnQuUFxuICAgICwgSVNfQklORCAgID0gdHlwZSAmICRleHBvcnQuQlxuICAgICwgSVNfV1JBUCAgID0gdHlwZSAmICRleHBvcnQuV1xuICAgICwgZXhwb3J0cyAgID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSlcbiAgICAsIGV4cFByb3RvICA9IGV4cG9ydHNbUFJPVE9UWVBFXVxuICAgICwgdGFyZ2V0ICAgID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXVxuICAgICwga2V5LCBvd24sIG91dDtcbiAgaWYoSVNfR0xPQkFMKXNvdXJjZSA9IG5hbWU7XG4gIGZvcihrZXkgaW4gc291cmNlKXtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIGlmKG93biAmJiBrZXkgaW4gZXhwb3J0cyljb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uKEMpe1xuICAgICAgdmFyIEYgPSBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgICAgaWYodGhpcyBpbnN0YW5jZW9mIEMpe1xuICAgICAgICAgIHN3aXRjaChhcmd1bWVudHMubGVuZ3RoKXtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBDO1xuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IEMoYSk7XG4gICAgICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgQyhhLCBiKTtcbiAgICAgICAgICB9IHJldHVybiBuZXcgQyhhLCBiLCBjKTtcbiAgICAgICAgfSByZXR1cm4gQy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIEZbUFJPVE9UWVBFXSA9IENbUFJPVE9UWVBFXTtcbiAgICAgIHJldHVybiBGO1xuICAgIC8vIG1ha2Ugc3RhdGljIHZlcnNpb25zIGZvciBwcm90b3R5cGUgbWV0aG9kc1xuICAgIH0pKG91dCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUubWV0aG9kcy4lTkFNRSVcbiAgICBpZihJU19QUk9UTyl7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYodHlwZSAmICRleHBvcnQuUiAmJiBleHBQcm90byAmJiAhZXhwUHJvdG9ba2V5XSloaWRlKGV4cFByb3RvLCBrZXksIG91dCk7XG4gICAgfVxuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YCBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZiA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZih0eXBlb2YgX19nID09ICdudW1iZXInKV9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0ge3ZlcnNpb246ICcyLjQuMCd9O1xuaWYodHlwZW9mIF9fZSA9PSAnbnVtYmVyJylfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCB0aGF0LCBsZW5ndGgpe1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZih0aGF0ID09PSB1bmRlZmluZWQpcmV0dXJuIGZuO1xuICBzd2l0Y2gobGVuZ3RoKXtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbihhKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24oYSwgYil7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oLyogLi4uYXJncyAqLyl7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBkUCAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBhbk9iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpXG4gICwgdG9QcmltaXRpdmUgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIGRQICAgICAgICAgICAgID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyl7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZihJRThfRE9NX0RFRklORSl0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICBpZignZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKU9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKCFpc09iamVjdChpdCkpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50XG4gIC8vIGluIG9sZCBJRSB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0J1xuICAsIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgUyl7XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZih0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYml0bWFwLCB2YWx1ZSl7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZSAgOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZSAgICA6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWUgICAgICAgOiB2YWx1ZVxuICB9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faGlkZScpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwga2V5KXtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qc1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXJhdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG52YXIgY3JlYXRlICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJylcbiAgLCBkZXNjcmlwdG9yICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG5cbi8vIDI1LjEuMi4xLjEgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19oaWRlJykoSXRlcmF0b3JQcm90b3R5cGUsIHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpLCBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpe1xuICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHtuZXh0OiBkZXNjcmlwdG9yKDEsIG5leHQpfSk7XG4gIHNldFRvU3RyaW5nVGFnKENvbnN0cnVjdG9yLCBOQU1FICsgJyBJdGVyYXRvcicpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbnZhciBhbk9iamVjdCAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgZFBzICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHBzJylcbiAgLCBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKVxuICAsIElFX1BST1RPICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpXG4gICwgRW1wdHkgICAgICAgPSBmdW5jdGlvbigpeyAvKiBlbXB0eSAqLyB9XG4gICwgUFJPVE9UWVBFICAgPSAncHJvdG90eXBlJztcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIGNyZWF0ZURpY3QgPSBmdW5jdGlvbigpe1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdpZnJhbWUnKVxuICAgICwgaSAgICAgID0gZW51bUJ1Z0tleXMubGVuZ3RoXG4gICAgLCBsdCAgICAgPSAnPCdcbiAgICAsIGd0ICAgICA9ICc+J1xuICAgICwgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICByZXF1aXJlKCcuL19odG1sJykuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0Oic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2NyaXB0LXVybFxuICAvLyBjcmVhdGVEaWN0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuT2JqZWN0O1xuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUobHQgKyAnc2NyaXB0JyArIGd0ICsgJ2RvY3VtZW50LkY9T2JqZWN0JyArIGx0ICsgJy9zY3JpcHQnICsgZ3QpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICBjcmVhdGVEaWN0ID0gaWZyYW1lRG9jdW1lbnQuRjtcbiAgd2hpbGUoaS0tKWRlbGV0ZSBjcmVhdGVEaWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbaV1dO1xuICByZXR1cm4gY3JlYXRlRGljdCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKXtcbiAgdmFyIHJlc3VsdDtcbiAgaWYoTyAhPT0gbnVsbCl7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eTtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBjcmVhdGVEaWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkUHMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBkUCAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGdldEtleXMgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpe1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgICA9IGdldEtleXMoUHJvcGVydGllcylcbiAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgLCBpID0gMFxuICAgICwgUDtcbiAgd2hpbGUobGVuZ3RoID4gaSlkUC5mKE8sIFAgPSBrZXlzW2krK10sIFByb3BlcnRpZXNbUF0pO1xuICByZXR1cm4gTztcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwcy5qc1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbnZhciAka2V5cyAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJylcbiAgLCBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pe1xuICByZXR1cm4gJGtleXMoTywgZW51bUJ1Z0tleXMpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgaGFzICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCB0b0lPYmplY3QgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKVxuICAsIElFX1BST1RPICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIG5hbWVzKXtcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwga2V5O1xuICBmb3Ioa2V5IGluIE8paWYoa2V5ICE9IElFX1BST1RPKWhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSlpZihoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpe1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanNcbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanNcbi8vIG1vZHVsZSBpZCA9IDQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCB0b0xlbmd0aCAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIHRvSW5kZXggICA9IHJlcXVpcmUoJy4vX3RvLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKElTX0lOQ0xVREVTKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKCR0aGlzLCBlbCwgZnJvbUluZGV4KXtcbiAgICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KCR0aGlzKVxuICAgICAgLCBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aClcbiAgICAgICwgaW5kZXggID0gdG9JbmRleChmcm9tSW5kZXgsIGxlbmd0aClcbiAgICAgICwgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIGlmKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKXdoaWxlKGxlbmd0aCA+IGluZGV4KXtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIGlmKHZhbHVlICE9IHZhbHVlKXJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I3RvSW5kZXggaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKylpZihJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKXtcbiAgICAgIGlmKE9baW5kZXhdID09PSBlbClyZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWxlbmd0aC5qc1xuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgbWF4ICAgICAgID0gTWF0aC5tYXhcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaW5kZXgsIGxlbmd0aCl7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWluZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpXG4gICwgdWlkICAgID0gcmVxdWlyZSgnLi9fdWlkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanNcbi8vIG1vZHVsZSBpZCA9IDQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXydcbiAgLCBzdG9yZSAgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQuanNcbi8vIG1vZHVsZSBpZCA9IDQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGlkID0gMFxuICAsIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdWlkLmpzXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gKFxuICAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJ1xuKS5zcGxpdCgnLCcpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDQ4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faHRtbC5qc1xuLy8gbW9kdWxlIGlkID0gNDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgZGVmID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZlxuICAsIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIHRhZywgc3RhdCl7XG4gIGlmKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpZGVmKGl0LCBUQUcsIHtjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiB0YWd9KTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXRvLXN0cmluZy10YWcuanNcbi8vIG1vZHVsZSBpZCA9IDUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIHN0b3JlICAgICAgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgnd2tzJylcbiAgLCB1aWQgICAgICAgID0gcmVxdWlyZSgnLi9fdWlkJylcbiAgLCBTeW1ib2wgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuU3ltYm9sXG4gICwgVVNFX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT0gJ2Z1bmN0aW9uJztcblxudmFyICRleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgVVNFX1NZTUJPTCAmJiBTeW1ib2xbbmFtZV0gfHwgKFVTRV9TWU1CT0wgPyBTeW1ib2wgOiB1aWQpKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07XG5cbiRleHBvcnRzLnN0b3JlID0gc3RvcmU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLmpzXG4vLyBtb2R1bGUgaWQgPSA1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIDE5LjEuMi45IC8gMTUuMi4zLjIgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG52YXIgaGFzICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIHRvT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBJRV9QUk9UTyAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKVxuICAsIE9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24oTyl7XG4gIE8gPSB0b09iamVjdChPKTtcbiAgaWYoaGFzKE8sIElFX1BST1RPKSlyZXR1cm4gT1tJRV9QUk9UT107XG4gIGlmKHR5cGVvZiBPLmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgTyBpbnN0YW5jZW9mIE8uY29uc3RydWN0b3Ipe1xuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvIDogbnVsbDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdwby5qc1xuLy8gbW9kdWxlIGlkID0gNTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSA1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcbnZhciBjdHggICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHRvT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBjYWxsICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXItY2FsbCcpXG4gICwgaXNBcnJheUl0ZXIgICAgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJylcbiAgLCB0b0xlbmd0aCAgICAgICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgY3JlYXRlUHJvcGVydHkgPSByZXF1aXJlKCcuL19jcmVhdGUtcHJvcGVydHknKVxuICAsIGdldEl0ZXJGbiAgICAgID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKShmdW5jdGlvbihpdGVyKXsgQXJyYXkuZnJvbShpdGVyKTsgfSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4yLjEgQXJyYXkuZnJvbShhcnJheUxpa2UsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICBmcm9tOiBmdW5jdGlvbiBmcm9tKGFycmF5TGlrZS8qLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZCovKXtcbiAgICB2YXIgTyAgICAgICA9IHRvT2JqZWN0KGFycmF5TGlrZSlcbiAgICAgICwgQyAgICAgICA9IHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgPyB0aGlzIDogQXJyYXlcbiAgICAgICwgYUxlbiAgICA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgICwgbWFwZm4gICA9IGFMZW4gPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkXG4gICAgICAsIG1hcHBpbmcgPSBtYXBmbiAhPT0gdW5kZWZpbmVkXG4gICAgICAsIGluZGV4ICAgPSAwXG4gICAgICAsIGl0ZXJGbiAgPSBnZXRJdGVyRm4oTylcbiAgICAgICwgbGVuZ3RoLCByZXN1bHQsIHN0ZXAsIGl0ZXJhdG9yO1xuICAgIGlmKG1hcHBpbmcpbWFwZm4gPSBjdHgobWFwZm4sIGFMZW4gPiAyID8gYXJndW1lbnRzWzJdIDogdW5kZWZpbmVkLCAyKTtcbiAgICAvLyBpZiBvYmplY3QgaXNuJ3QgaXRlcmFibGUgb3IgaXQncyBhcnJheSB3aXRoIGRlZmF1bHQgaXRlcmF0b3IgLSB1c2Ugc2ltcGxlIGNhc2VcbiAgICBpZihpdGVyRm4gIT0gdW5kZWZpbmVkICYmICEoQyA9PSBBcnJheSAmJiBpc0FycmF5SXRlcihpdGVyRm4pKSl7XG4gICAgICBmb3IoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChPKSwgcmVzdWx0ID0gbmV3IEM7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgaW5kZXgrKyl7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIG1hcHBpbmcgPyBjYWxsKGl0ZXJhdG9yLCBtYXBmbiwgW3N0ZXAudmFsdWUsIGluZGV4XSwgdHJ1ZSkgOiBzdGVwLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgICAgZm9yKHJlc3VsdCA9IG5ldyBDKGxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKXtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IG1hcGZuKE9baW5kZXhdLCBpbmRleCkgOiBPW2luZGV4XSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5sZW5ndGggPSBpbmRleDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5LmZyb20uanNcbi8vIG1vZHVsZSBpZCA9IDU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gY2FsbCBzb21ldGhpbmcgb24gaXRlcmF0b3Igc3RlcCB3aXRoIHNhZmUgY2xvc2luZyBvbiBlcnJvclxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXJhdG9yLCBmbiwgdmFsdWUsIGVudHJpZXMpe1xuICB0cnkge1xuICAgIHJldHVybiBlbnRyaWVzID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gIH0gY2F0Y2goZSl7XG4gICAgdmFyIHJldCA9IGl0ZXJhdG9yWydyZXR1cm4nXTtcbiAgICBpZihyZXQgIT09IHVuZGVmaW5lZClhbk9iamVjdChyZXQuY2FsbChpdGVyYXRvcikpO1xuICAgIHRocm93IGU7XG4gIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jYWxsLmpzXG4vLyBtb2R1bGUgaWQgPSA1NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3JcbnZhciBJdGVyYXRvcnMgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCBJVEVSQVRPUiAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBBcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ICE9PSB1bmRlZmluZWQgJiYgKEl0ZXJhdG9ycy5BcnJheSA9PT0gaXQgfHwgQXJyYXlQcm90b1tJVEVSQVRPUl0gPT09IGl0KTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtYXJyYXktaXRlci5qc1xuLy8gbW9kdWxlIGlkID0gNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG52YXIgJGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBjcmVhdGVEZXNjICAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0LCBpbmRleCwgdmFsdWUpe1xuICBpZihpbmRleCBpbiBvYmplY3QpJGRlZmluZVByb3BlcnR5LmYob2JqZWN0LCBpbmRleCwgY3JlYXRlRGVzYygwLCB2YWx1ZSkpO1xuICBlbHNlIG9iamVjdFtpbmRleF0gPSB2YWx1ZTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3JlYXRlLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBjbGFzc29mICAgPSByZXF1aXJlKCcuL19jbGFzc29mJylcbiAgLCBJVEVSQVRPUiAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3JNZXRob2QgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ICE9IHVuZGVmaW5lZClyZXR1cm4gaXRbSVRFUkFUT1JdXG4gICAgfHwgaXRbJ0BAaXRlcmF0b3InXVxuICAgIHx8IEl0ZXJhdG9yc1tjbGFzc29mKGl0KV07XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kLmpzXG4vLyBtb2R1bGUgaWQgPSA1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKVxuICAvLyBFUzMgd3JvbmcgaGVyZVxuICAsIEFSRyA9IGNvZihmdW5jdGlvbigpeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUQUcpKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY2xhc3NvZi5qc1xuLy8gbW9kdWxlIGlkID0gNTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgSVRFUkFUT1IgICAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBTQUZFX0NMT1NJTkcgPSBmYWxzZTtcblxudHJ5IHtcbiAgdmFyIHJpdGVyID0gWzddW0lURVJBVE9SXSgpO1xuICByaXRlclsncmV0dXJuJ10gPSBmdW5jdGlvbigpeyBTQUZFX0NMT1NJTkcgPSB0cnVlOyB9O1xuICBBcnJheS5mcm9tKHJpdGVyLCBmdW5jdGlvbigpeyB0aHJvdyAyOyB9KTtcbn0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjLCBza2lwQ2xvc2luZyl7XG4gIGlmKCFza2lwQ2xvc2luZyAmJiAhU0FGRV9DTE9TSU5HKXJldHVybiBmYWxzZTtcbiAgdmFyIHNhZmUgPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyICA9IFs3XVxuICAgICAgLCBpdGVyID0gYXJyW0lURVJBVE9SXSgpO1xuICAgIGl0ZXIubmV4dCA9IGZ1bmN0aW9uKCl7IHJldHVybiB7ZG9uZTogc2FmZSA9IHRydWV9OyB9O1xuICAgIGFycltJVEVSQVRPUl0gPSBmdW5jdGlvbigpeyByZXR1cm4gaXRlcjsgfTtcbiAgICBleGVjKGFycik7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIHNhZmU7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGV0ZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSA2MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImltcG9ydCB7XG4gICAgd2luLFxuICAgIGRvYyxcbiAgICBQcm9taXNlLFxuICAgIHF1ZXJ5LFxuICAgIHF1ZXJ5QWxsLFxuICAgIGdldFJlY3Rcbn0gZnJvbSAnLi91dGlsJztcbmltcG9ydCAnZ2VzdHVyZS1qcyc7XG5pbXBvcnQgRXZlbnQgZnJvbSAnLi9ldmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcm9sbGVyIGV4dGVuZHMgRXZlbnR7XG4gICAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCwgdncsIHZoLCBzY2FsZSA9IDEsIGRwciA9IDEpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9pc1Njcm9sbGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9lbmFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy5kcHIgPSBkcHI7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMudncgPSB2dztcbiAgICAgICAgdGhpcy52aCA9IHZoO1xuICAgICAgICB0aGlzLnggPSAwO1xuICAgICAgICB0aGlzLnkgPSAwO1xuICAgICAgICB0aGlzLmx4ID0gMDtcbiAgICAgICAgdGhpcy5seSA9IDA7XG4gICAgfVxuXG4gICAgZ2V0IGlzU2Nyb2xsaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNTY3JvbGxpbmc7XG4gICAgfVxuXG4gICAgZ2V0IHNjYWxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NhbGU7XG4gICAgfVxuXG4gICAgc2V0IHNjYWxlKHNjYWxlKSB7XG4gICAgICAgIHRoaXMuX3NjYWxlID0gc2NhbGU7XG4gICAgfVxuXG4gICAgZ2V0IGVuYWJsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuYWJsZTtcbiAgICB9XG5cbiAgICBzZXQgZW5hYmxlKGVuYWJsZSkge1xuICAgICAgICB0aGlzLl9lbmFibGUgPSBlbmFibGU7XG4gICAgfVxuXG4gICAgX2VtaXQobmFtZSwgb3JpZ2luYWxFdmVudCwgZXh0cmEgPSB7fSkge1xuICAgICAgICBjb25zdCBlID0ge1xuICAgICAgICAgICAgeDogdGhpcy54LFxuICAgICAgICAgICAgeTogdGhpcy55LFxuICAgICAgICAgICAgbHg6IHRoaXMubHgsXG4gICAgICAgICAgICBseTogdGhpcy5seSxcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnRcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBleHRyYSkge1xuICAgICAgICAgICAgZVtrZXldID0gZXh0cmFba2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW1pdChuYW1lLCBlKTtcbiAgICB9XG5cbiAgICByZWFkeSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2lzU2Nyb2xsaW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGNvbnN0IGVtaXRUYXAgPSBlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbWl0KCd0YXAnLCBlLCB7XG4gICAgICAgICAgICAgICAgICAgIGV4OiB0aGlzLnggKyBlLnRvdWNoLmNsaWVudFggKiB0aGlzLmRwcixcbiAgICAgICAgICAgICAgICAgICAgZXk6IHRoaXMueSArIGUudG91Y2guY2xpZW50WSAqIHRoaXMuZHByXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGVtaXRTdGFydCA9IGUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2lzU2Nyb2xsaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmx4ID0gdGhpcy54O1xuICAgICAgICAgICAgICAgIHRoaXMubHkgPSB0aGlzLnk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZW1pdCgnc2Nyb2xsc3RhcnQnLCBlKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IGVtaXRTY3JvbGwgPSBlID0+IHRoaXMuX2VtaXQoJ3Njcm9sbGluZycsIGUpO1xuXG4gICAgICAgICAgICBjb25zdCBlbWl0RW5kID0gZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5faXNTY3JvbGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbWl0KCdzY3JvbGxlbmQnLCBlKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IGNhbFhZID0gKGUsIG5vU2NhbGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYWNlbWVudFgsXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYWNlbWVudFlcbiAgICAgICAgICAgICAgICB9ID0gZTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHNjYWxlID0gbm9TY2FsZSA/IDEgOiB0aGlzLl9zY2FsZTtcbiAgICAgICAgICAgICAgICBsZXQgeCA9IHRoaXMubHggLSBkaXNwbGFjZW1lbnRYICogc2NhbGU7XG4gICAgICAgICAgICAgICAgbGV0IHkgPSB0aGlzLmx5IC0gZGlzcGxhY2VtZW50WSAqIHNjYWxlO1xuXG4gICAgICAgICAgICAgICAgeCA9IE1hdGgubWluKE1hdGgubWF4KDAsIHgpLCB0aGlzLndpZHRoIC0gdGhpcy52dyk7XG4gICAgICAgICAgICAgICAgeSA9IE1hdGgubWluKE1hdGgubWF4KDAsIHkpLCB0aGlzLmhlaWdodCAtIHRoaXMudmgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkb2MuYm9keS5hZGRFdmVudExpc3RlbmVyKCd0YXAnLCBlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbmFibGUgJiYgZW1pdFRhcChlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkb2MuYm9keS5hZGRFdmVudExpc3RlbmVyKCdwYW5zdGFydCcsIGUgPT4gXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5hYmxlICYmIGVtaXRTdGFydChlKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgZG9jLmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigncGFubW92ZScsIGUgPT4gXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5hYmxlICYmIGNhbFhZKGUpICYmIGVtaXRTY3JvbGwoZSkgXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBkb2MuYm9keS5hZGRFdmVudExpc3RlbmVyKCdwYW5lbmQnLCBlID0+IFxuICAgICAgICAgICAgICAgIHRoaXMuX2VuYWJsZSAmJiBlbWl0RW5kKGUpICAgICAgXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB0aGlzLnNjcm9sbFRvID0gKHgsIHkpID0+IHtcbiAgICAgICAgICAgICAgICBlbWl0U3RhcnQoKTtcbiAgICAgICAgICAgICAgICBjYWxYWSh7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYWNlbWVudFg6IHRoaXMueCAtIHgsXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYWNlbWVudFk6IHRoaXMueSAtIHlcbiAgICAgICAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgICAgICAgICBlbWl0U2Nyb2xsKCk7XG4gICAgICAgICAgICAgICAgZW1pdEVuZCgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3Njcm9sbGVyLmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtcHJvdG90eXBlLW9mXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9nZXQtcHJvdG90eXBlLW9mLmpzXG4vLyBtb2R1bGUgaWQgPSA2MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtcHJvdG90eXBlLW9mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanNcbi8vIG1vZHVsZSBpZCA9IDYzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gMTkuMS4yLjkgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG52YXIgdG9PYmplY3QgICAgICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCAkZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgnZ2V0UHJvdG90eXBlT2YnLCBmdW5jdGlvbigpe1xuICByZXR1cm4gZnVuY3Rpb24gZ2V0UHJvdG90eXBlT2YoaXQpe1xuICAgIHJldHVybiAkZ2V0UHJvdG90eXBlT2YodG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtcHJvdG90eXBlLW9mLmpzXG4vLyBtb2R1bGUgaWQgPSA2NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIG1vc3QgT2JqZWN0IG1ldGhvZHMgYnkgRVM2IHNob3VsZCBhY2NlcHQgcHJpbWl0aXZlc1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGNvcmUgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBmYWlscyAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oS0VZLCBleGVjKXtcbiAgdmFyIGZuICA9IChjb3JlLk9iamVjdCB8fCB7fSlbS0VZXSB8fCBPYmplY3RbS0VZXVxuICAgICwgZXhwID0ge307XG4gIGV4cFtLRVldID0gZXhlYyhmbik7XG4gICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogZmFpbHMoZnVuY3Rpb24oKXsgZm4oMSk7IH0pLCAnT2JqZWN0JywgZXhwKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXNhcC5qc1xuLy8gbW9kdWxlIGlkID0gNjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzXG4vLyBtb2R1bGUgaWQgPSA2NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2RlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZpbmVQcm9wZXJ0eSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9O1xufSgpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qc1xuLy8gbW9kdWxlIGlkID0gNjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA2OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHknKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyl7XG4gIHJldHVybiAkT2JqZWN0LmRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA2OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHtkZWZpbmVQcm9wZXJ0eTogcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDcwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfdHlwZW9mMiA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL3R5cGVvZlwiKTtcblxudmFyIF90eXBlb2YzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdHlwZW9mMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzZWxmLCBjYWxsKSB7XG4gIGlmICghc2VsZikge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBjYWxsICYmICgodHlwZW9mIGNhbGwgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogKDAsIF90eXBlb2YzLmRlZmF1bHQpKGNhbGwpKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVybi5qc1xuLy8gbW9kdWxlIGlkID0gNzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9pdGVyYXRvciA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvclwiKTtcblxudmFyIF9pdGVyYXRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pdGVyYXRvcik7XG5cbnZhciBfc3ltYm9sID0gcmVxdWlyZShcIi4uL2NvcmUtanMvc3ltYm9sXCIpO1xuXG52YXIgX3N5bWJvbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zeW1ib2wpO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIF9pdGVyYXRvcjIuZGVmYXVsdCA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IF9zeW1ib2wyLmRlZmF1bHQgJiYgb2JqICE9PSBfc3ltYm9sMi5kZWZhdWx0LnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIF90eXBlb2YoX2l0ZXJhdG9yMi5kZWZhdWx0KSA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopO1xufSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gX3N5bWJvbDIuZGVmYXVsdCAmJiBvYmogIT09IF9zeW1ib2wyLmRlZmF1bHQucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzXG4vLyBtb2R1bGUgaWQgPSA3MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaXRlcmF0b3JcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sL2l0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA3M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX3drcy1leHQnKS5mKCdpdGVyYXRvcicpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gNzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJyZXF1aXJlKCcuL2VzNi5hcnJheS5pdGVyYXRvcicpO1xudmFyIGdsb2JhbCAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGhpZGUgICAgICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBJdGVyYXRvcnMgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCBUT19TVFJJTkdfVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbmZvcih2YXIgY29sbGVjdGlvbnMgPSBbJ05vZGVMaXN0JywgJ0RPTVRva2VuTGlzdCcsICdNZWRpYUxpc3QnLCAnU3R5bGVTaGVldExpc3QnLCAnQ1NTUnVsZUxpc3QnXSwgaSA9IDA7IGkgPCA1OyBpKyspe1xuICB2YXIgTkFNRSAgICAgICA9IGNvbGxlY3Rpb25zW2ldXG4gICAgLCBDb2xsZWN0aW9uID0gZ2xvYmFsW05BTUVdXG4gICAgLCBwcm90byAgICAgID0gQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZTtcbiAgaWYocHJvdG8gJiYgIXByb3RvW1RPX1NUUklOR19UQUddKWhpZGUocHJvdG8sIFRPX1NUUklOR19UQUcsIE5BTUUpO1xuICBJdGVyYXRvcnNbTkFNRV0gPSBJdGVyYXRvcnMuQXJyYXk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSA3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJylcbiAgLCBzdGVwICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faXRlci1zdGVwJylcbiAgLCBJdGVyYXRvcnMgICAgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCB0b0lPYmplY3QgICAgICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoQXJyYXksICdBcnJheScsIGZ1bmN0aW9uKGl0ZXJhdGVkLCBraW5kKXtcbiAgdGhpcy5fdCA9IHRvSU9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAgLy8ga2luZFxuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBraW5kICA9IHRoaXMuX2tcbiAgICAsIGluZGV4ID0gdGhpcy5faSsrO1xuICBpZighTyB8fCBpbmRleCA+PSBPLmxlbmd0aCl7XG4gICAgdGhpcy5fdCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gc3RlcCgxKTtcbiAgfVxuICBpZihraW5kID09ICdrZXlzJyAgKXJldHVybiBzdGVwKDAsIGluZGV4KTtcbiAgaWYoa2luZCA9PSAndmFsdWVzJylyZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDc2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpeyAvKiBlbXB0eSAqLyB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qc1xuLy8gbW9kdWxlIGlkID0gNzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRvbmUsIHZhbHVlKXtcbiAgcmV0dXJuIHt2YWx1ZTogdmFsdWUsIGRvbmU6ICEhZG9uZX07XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItc3RlcC5qc1xuLy8gbW9kdWxlIGlkID0gNzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJleHBvcnRzLmYgPSByZXF1aXJlKCcuL193a3MnKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MtZXh0LmpzXG4vLyBtb2R1bGUgaWQgPSA3OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2xcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sLmpzXG4vLyBtb2R1bGUgaWQgPSA4MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN5bWJvbCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZycpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczcuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNy5zeW1ib2wub2JzZXJ2YWJsZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuU3ltYm9sO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gODFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG4vLyBFQ01BU2NyaXB0IDYgc3ltYm9scyBzaGltXG52YXIgZ2xvYmFsICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGhhcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBERVNDUklQVE9SUyAgICA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJylcbiAgLCAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgcmVkZWZpbmUgICAgICAgPSByZXF1aXJlKCcuL19yZWRlZmluZScpXG4gICwgTUVUQSAgICAgICAgICAgPSByZXF1aXJlKCcuL19tZXRhJykuS0VZXG4gICwgJGZhaWxzICAgICAgICAgPSByZXF1aXJlKCcuL19mYWlscycpXG4gICwgc2hhcmVkICAgICAgICAgPSByZXF1aXJlKCcuL19zaGFyZWQnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIHVpZCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fdWlkJylcbiAgLCB3a3MgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3drcycpXG4gICwgd2tzRXh0ICAgICAgICAgPSByZXF1aXJlKCcuL193a3MtZXh0JylcbiAgLCB3a3NEZWZpbmUgICAgICA9IHJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKVxuICAsIGtleU9mICAgICAgICAgID0gcmVxdWlyZSgnLi9fa2V5b2YnKVxuICAsIGVudW1LZXlzICAgICAgID0gcmVxdWlyZSgnLi9fZW51bS1rZXlzJylcbiAgLCBpc0FycmF5ICAgICAgICA9IHJlcXVpcmUoJy4vX2lzLWFycmF5JylcbiAgLCBhbk9iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgdG9JT2JqZWN0ICAgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgY3JlYXRlRGVzYyAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgLCBfY3JlYXRlICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKVxuICAsIGdPUE5FeHQgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4tZXh0JylcbiAgLCAkR09QRCAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJylcbiAgLCAkRFAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgJGtleXMgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpXG4gICwgZ09QRCAgICAgICAgICAgPSAkR09QRC5mXG4gICwgZFAgICAgICAgICAgICAgPSAkRFAuZlxuICAsIGdPUE4gICAgICAgICAgID0gZ09QTkV4dC5mXG4gICwgJFN5bWJvbCAgICAgICAgPSBnbG9iYWwuU3ltYm9sXG4gICwgJEpTT04gICAgICAgICAgPSBnbG9iYWwuSlNPTlxuICAsIF9zdHJpbmdpZnkgICAgID0gJEpTT04gJiYgJEpTT04uc3RyaW5naWZ5XG4gICwgUFJPVE9UWVBFICAgICAgPSAncHJvdG90eXBlJ1xuICAsIEhJRERFTiAgICAgICAgID0gd2tzKCdfaGlkZGVuJylcbiAgLCBUT19QUklNSVRJVkUgICA9IHdrcygndG9QcmltaXRpdmUnKVxuICAsIGlzRW51bSAgICAgICAgID0ge30ucHJvcGVydHlJc0VudW1lcmFibGVcbiAgLCBTeW1ib2xSZWdpc3RyeSA9IHNoYXJlZCgnc3ltYm9sLXJlZ2lzdHJ5JylcbiAgLCBBbGxTeW1ib2xzICAgICA9IHNoYXJlZCgnc3ltYm9scycpXG4gICwgT1BTeW1ib2xzICAgICAgPSBzaGFyZWQoJ29wLXN5bWJvbHMnKVxuICAsIE9iamVjdFByb3RvICAgID0gT2JqZWN0W1BST1RPVFlQRV1cbiAgLCBVU0VfTkFUSVZFICAgICA9IHR5cGVvZiAkU3ltYm9sID09ICdmdW5jdGlvbidcbiAgLCBRT2JqZWN0ICAgICAgICA9IGdsb2JhbC5RT2JqZWN0O1xuLy8gRG9uJ3QgdXNlIHNldHRlcnMgaW4gUXQgU2NyaXB0LCBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMTczXG52YXIgc2V0dGVyID0gIVFPYmplY3QgfHwgIVFPYmplY3RbUFJPVE9UWVBFXSB8fCAhUU9iamVjdFtQUk9UT1RZUEVdLmZpbmRDaGlsZDtcblxuLy8gZmFsbGJhY2sgZm9yIG9sZCBBbmRyb2lkLCBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9Njg3XG52YXIgc2V0U3ltYm9sRGVzYyA9IERFU0NSSVBUT1JTICYmICRmYWlscyhmdW5jdGlvbigpe1xuICByZXR1cm4gX2NyZWF0ZShkUCh7fSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpeyByZXR1cm4gZFAodGhpcywgJ2EnLCB7dmFsdWU6IDd9KS5hOyB9XG4gIH0pKS5hICE9IDc7XG59KSA/IGZ1bmN0aW9uKGl0LCBrZXksIEQpe1xuICB2YXIgcHJvdG9EZXNjID0gZ09QRChPYmplY3RQcm90bywga2V5KTtcbiAgaWYocHJvdG9EZXNjKWRlbGV0ZSBPYmplY3RQcm90b1trZXldO1xuICBkUChpdCwga2V5LCBEKTtcbiAgaWYocHJvdG9EZXNjICYmIGl0ICE9PSBPYmplY3RQcm90bylkUChPYmplY3RQcm90bywga2V5LCBwcm90b0Rlc2MpO1xufSA6IGRQO1xuXG52YXIgd3JhcCA9IGZ1bmN0aW9uKHRhZyl7XG4gIHZhciBzeW0gPSBBbGxTeW1ib2xzW3RhZ10gPSBfY3JlYXRlKCRTeW1ib2xbUFJPVE9UWVBFXSk7XG4gIHN5bS5fayA9IHRhZztcbiAgcmV0dXJuIHN5bTtcbn07XG5cbnZhciBpc1N5bWJvbCA9IFVTRV9OQVRJVkUgJiYgdHlwZW9mICRTeW1ib2wuaXRlcmF0b3IgPT0gJ3N5bWJvbCcgPyBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCc7XG59IDogZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgaW5zdGFuY2VvZiAkU3ltYm9sO1xufTtcblxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIEQpe1xuICBpZihpdCA9PT0gT2JqZWN0UHJvdG8pJGRlZmluZVByb3BlcnR5KE9QU3ltYm9scywga2V5LCBEKTtcbiAgYW5PYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBhbk9iamVjdChEKTtcbiAgaWYoaGFzKEFsbFN5bWJvbHMsIGtleSkpe1xuICAgIGlmKCFELmVudW1lcmFibGUpe1xuICAgICAgaWYoIWhhcyhpdCwgSElEREVOKSlkUChpdCwgSElEREVOLCBjcmVhdGVEZXNjKDEsIHt9KSk7XG4gICAgICBpdFtISURERU5dW2tleV0gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZihoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKWl0W0hJRERFTl1ba2V5XSA9IGZhbHNlO1xuICAgICAgRCA9IF9jcmVhdGUoRCwge2VudW1lcmFibGU6IGNyZWF0ZURlc2MoMCwgZmFsc2UpfSk7XG4gICAgfSByZXR1cm4gc2V0U3ltYm9sRGVzYyhpdCwga2V5LCBEKTtcbiAgfSByZXR1cm4gZFAoaXQsIGtleSwgRCk7XG59O1xudmFyICRkZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhpdCwgUCl7XG4gIGFuT2JqZWN0KGl0KTtcbiAgdmFyIGtleXMgPSBlbnVtS2V5cyhQID0gdG9JT2JqZWN0KFApKVxuICAgICwgaSAgICA9IDBcbiAgICAsIGwgPSBrZXlzLmxlbmd0aFxuICAgICwga2V5O1xuICB3aGlsZShsID4gaSkkZGVmaW5lUHJvcGVydHkoaXQsIGtleSA9IGtleXNbaSsrXSwgUFtrZXldKTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciAkY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGl0LCBQKXtcbiAgcmV0dXJuIFAgPT09IHVuZGVmaW5lZCA/IF9jcmVhdGUoaXQpIDogJGRlZmluZVByb3BlcnRpZXMoX2NyZWF0ZShpdCksIFApO1xufTtcbnZhciAkcHJvcGVydHlJc0VudW1lcmFibGUgPSBmdW5jdGlvbiBwcm9wZXJ0eUlzRW51bWVyYWJsZShrZXkpe1xuICB2YXIgRSA9IGlzRW51bS5jYWxsKHRoaXMsIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSkpO1xuICBpZih0aGlzID09PSBPYmplY3RQcm90byAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKE9QU3ltYm9scywga2V5KSlyZXR1cm4gZmFsc2U7XG4gIHJldHVybiBFIHx8ICFoYXModGhpcywga2V5KSB8fCAhaGFzKEFsbFN5bWJvbHMsIGtleSkgfHwgaGFzKHRoaXMsIEhJRERFTikgJiYgdGhpc1tISURERU5dW2tleV0gPyBFIDogdHJ1ZTtcbn07XG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KXtcbiAgaXQgID0gdG9JT2JqZWN0KGl0KTtcbiAga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKTtcbiAgaWYoaXQgPT09IE9iamVjdFByb3RvICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT1BTeW1ib2xzLCBrZXkpKXJldHVybjtcbiAgdmFyIEQgPSBnT1BEKGl0LCBrZXkpO1xuICBpZihEICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICEoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSkpRC5lbnVtZXJhYmxlID0gdHJ1ZTtcbiAgcmV0dXJuIEQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eU5hbWVzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCl7XG4gIHZhciBuYW1lcyAgPSBnT1BOKHRvSU9iamVjdChpdCkpXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwgaSAgICAgID0gMFxuICAgICwga2V5O1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKXtcbiAgICBpZighaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pICYmIGtleSAhPSBISURERU4gJiYga2V5ICE9IE1FVEEpcmVzdWx0LnB1c2goa2V5KTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGl0KXtcbiAgdmFyIElTX09QICA9IGl0ID09PSBPYmplY3RQcm90b1xuICAgICwgbmFtZXMgID0gZ09QTihJU19PUCA/IE9QU3ltYm9scyA6IHRvSU9iamVjdChpdCkpXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwgaSAgICAgID0gMFxuICAgICwga2V5O1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKXtcbiAgICBpZihoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYgKElTX09QID8gaGFzKE9iamVjdFByb3RvLCBrZXkpIDogdHJ1ZSkpcmVzdWx0LnB1c2goQWxsU3ltYm9sc1trZXldKTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcblxuLy8gMTkuNC4xLjEgU3ltYm9sKFtkZXNjcmlwdGlvbl0pXG5pZighVVNFX05BVElWRSl7XG4gICRTeW1ib2wgPSBmdW5jdGlvbiBTeW1ib2woKXtcbiAgICBpZih0aGlzIGluc3RhbmNlb2YgJFN5bWJvbCl0aHJvdyBUeXBlRXJyb3IoJ1N5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvciEnKTtcbiAgICB2YXIgdGFnID0gdWlkKGFyZ3VtZW50cy5sZW5ndGggPiAwID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkKTtcbiAgICB2YXIgJHNldCA9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgIGlmKHRoaXMgPT09IE9iamVjdFByb3RvKSRzZXQuY2FsbChPUFN5bWJvbHMsIHZhbHVlKTtcbiAgICAgIGlmKGhhcyh0aGlzLCBISURERU4pICYmIGhhcyh0aGlzW0hJRERFTl0sIHRhZykpdGhpc1tISURERU5dW3RhZ10gPSBmYWxzZTtcbiAgICAgIHNldFN5bWJvbERlc2ModGhpcywgdGFnLCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG4gICAgfTtcbiAgICBpZihERVNDUklQVE9SUyAmJiBzZXR0ZXIpc2V0U3ltYm9sRGVzYyhPYmplY3RQcm90bywgdGFnLCB7Y29uZmlndXJhYmxlOiB0cnVlLCBzZXQ6ICRzZXR9KTtcbiAgICByZXR1cm4gd3JhcCh0YWcpO1xuICB9O1xuICByZWRlZmluZSgkU3ltYm9sW1BST1RPVFlQRV0sICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCl7XG4gICAgcmV0dXJuIHRoaXMuX2s7XG4gIH0pO1xuXG4gICRHT1BELmYgPSAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuICAkRFAuZiAgID0gJGRlZmluZVByb3BlcnR5O1xuICByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmYgPSBnT1BORXh0LmYgPSAkZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpLmYgID0gJHByb3BlcnR5SXNFbnVtZXJhYmxlO1xuICByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpLmYgPSAkZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG4gIGlmKERFU0NSSVBUT1JTICYmICFyZXF1aXJlKCcuL19saWJyYXJ5Jykpe1xuICAgIHJlZGVmaW5lKE9iamVjdFByb3RvLCAncHJvcGVydHlJc0VudW1lcmFibGUnLCAkcHJvcGVydHlJc0VudW1lcmFibGUsIHRydWUpO1xuICB9XG5cbiAgd2tzRXh0LmYgPSBmdW5jdGlvbihuYW1lKXtcbiAgICByZXR1cm4gd3JhcCh3a3MobmFtZSkpO1xuICB9XG59XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIHtTeW1ib2w6ICRTeW1ib2x9KTtcblxuZm9yKHZhciBzeW1ib2xzID0gKFxuICAvLyAxOS40LjIuMiwgMTkuNC4yLjMsIDE5LjQuMi40LCAxOS40LjIuNiwgMTkuNC4yLjgsIDE5LjQuMi45LCAxOS40LjIuMTAsIDE5LjQuMi4xMSwgMTkuNC4yLjEyLCAxOS40LjIuMTMsIDE5LjQuMi4xNFxuICAnaGFzSW5zdGFuY2UsaXNDb25jYXRTcHJlYWRhYmxlLGl0ZXJhdG9yLG1hdGNoLHJlcGxhY2Usc2VhcmNoLHNwZWNpZXMsc3BsaXQsdG9QcmltaXRpdmUsdG9TdHJpbmdUYWcsdW5zY29wYWJsZXMnXG4pLnNwbGl0KCcsJyksIGkgPSAwOyBzeW1ib2xzLmxlbmd0aCA+IGk7ICl3a3Moc3ltYm9sc1tpKytdKTtcblxuZm9yKHZhciBzeW1ib2xzID0gJGtleXMod2tzLnN0b3JlKSwgaSA9IDA7IHN5bWJvbHMubGVuZ3RoID4gaTsgKXdrc0RlZmluZShzeW1ib2xzW2krK10pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnU3ltYm9sJywge1xuICAvLyAxOS40LjIuMSBTeW1ib2wuZm9yKGtleSlcbiAgJ2Zvcic6IGZ1bmN0aW9uKGtleSl7XG4gICAgcmV0dXJuIGhhcyhTeW1ib2xSZWdpc3RyeSwga2V5ICs9ICcnKVxuICAgICAgPyBTeW1ib2xSZWdpc3RyeVtrZXldXG4gICAgICA6IFN5bWJvbFJlZ2lzdHJ5W2tleV0gPSAkU3ltYm9sKGtleSk7XG4gIH0sXG4gIC8vIDE5LjQuMi41IFN5bWJvbC5rZXlGb3Ioc3ltKVxuICBrZXlGb3I6IGZ1bmN0aW9uIGtleUZvcihrZXkpe1xuICAgIGlmKGlzU3ltYm9sKGtleSkpcmV0dXJuIGtleU9mKFN5bWJvbFJlZ2lzdHJ5LCBrZXkpO1xuICAgIHRocm93IFR5cGVFcnJvcihrZXkgKyAnIGlzIG5vdCBhIHN5bWJvbCEnKTtcbiAgfSxcbiAgdXNlU2V0dGVyOiBmdW5jdGlvbigpeyBzZXR0ZXIgPSB0cnVlOyB9LFxuICB1c2VTaW1wbGU6IGZ1bmN0aW9uKCl7IHNldHRlciA9IGZhbHNlOyB9XG59KTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgJ09iamVjdCcsIHtcbiAgLy8gMTkuMS4yLjIgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuICBjcmVhdGU6ICRjcmVhdGUsXG4gIC8vIDE5LjEuMi40IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuICBkZWZpbmVQcm9wZXJ0eTogJGRlZmluZVByb3BlcnR5LFxuICAvLyAxOS4xLjIuMyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKVxuICBkZWZpbmVQcm9wZXJ0aWVzOiAkZGVmaW5lUHJvcGVydGllcyxcbiAgLy8gMTkuMS4yLjYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKVxuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsXG4gIC8vIDE5LjEuMi43IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG4gIGdldE93blByb3BlcnR5TmFtZXM6ICRnZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICAvLyAxOS4xLjIuOCBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKE8pXG4gIGdldE93blByb3BlcnR5U3ltYm9sczogJGdldE93blByb3BlcnR5U3ltYm9sc1xufSk7XG5cbi8vIDI0LjMuMiBKU09OLnN0cmluZ2lmeSh2YWx1ZSBbLCByZXBsYWNlciBbLCBzcGFjZV1dKVxuJEpTT04gJiYgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoIVVTRV9OQVRJVkUgfHwgJGZhaWxzKGZ1bmN0aW9uKCl7XG4gIHZhciBTID0gJFN5bWJvbCgpO1xuICAvLyBNUyBFZGdlIGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyB7fVxuICAvLyBXZWJLaXQgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIG51bGxcbiAgLy8gVjggdGhyb3dzIG9uIGJveGVkIHN5bWJvbHNcbiAgcmV0dXJuIF9zdHJpbmdpZnkoW1NdKSAhPSAnW251bGxdJyB8fCBfc3RyaW5naWZ5KHthOiBTfSkgIT0gJ3t9JyB8fCBfc3RyaW5naWZ5KE9iamVjdChTKSkgIT0gJ3t9Jztcbn0pKSwgJ0pTT04nLCB7XG4gIHN0cmluZ2lmeTogZnVuY3Rpb24gc3RyaW5naWZ5KGl0KXtcbiAgICBpZihpdCA9PT0gdW5kZWZpbmVkIHx8IGlzU3ltYm9sKGl0KSlyZXR1cm47IC8vIElFOCByZXR1cm5zIHN0cmluZyBvbiB1bmRlZmluZWRcbiAgICB2YXIgYXJncyA9IFtpdF1cbiAgICAgICwgaSAgICA9IDFcbiAgICAgICwgcmVwbGFjZXIsICRyZXBsYWNlcjtcbiAgICB3aGlsZShhcmd1bWVudHMubGVuZ3RoID4gaSlhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICAgIHJlcGxhY2VyID0gYXJnc1sxXTtcbiAgICBpZih0eXBlb2YgcmVwbGFjZXIgPT0gJ2Z1bmN0aW9uJykkcmVwbGFjZXIgPSByZXBsYWNlcjtcbiAgICBpZigkcmVwbGFjZXIgfHwgIWlzQXJyYXkocmVwbGFjZXIpKXJlcGxhY2VyID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSl7XG4gICAgICBpZigkcmVwbGFjZXIpdmFsdWUgPSAkcmVwbGFjZXIuY2FsbCh0aGlzLCBrZXksIHZhbHVlKTtcbiAgICAgIGlmKCFpc1N5bWJvbCh2YWx1ZSkpcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgYXJnc1sxXSA9IHJlcGxhY2VyO1xuICAgIHJldHVybiBfc3RyaW5naWZ5LmFwcGx5KCRKU09OLCBhcmdzKTtcbiAgfVxufSk7XG5cbi8vIDE5LjQuMy40IFN5bWJvbC5wcm90b3R5cGVbQEB0b1ByaW1pdGl2ZV0oaGludClcbiRTeW1ib2xbUFJPVE9UWVBFXVtUT19QUklNSVRJVkVdIHx8IHJlcXVpcmUoJy4vX2hpZGUnKSgkU3ltYm9sW1BST1RPVFlQRV0sIFRPX1BSSU1JVElWRSwgJFN5bWJvbFtQUk9UT1RZUEVdLnZhbHVlT2YpO1xuLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoJFN5bWJvbCwgJ1N5bWJvbCcpO1xuLy8gMjAuMi4xLjkgTWF0aFtAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoTWF0aCwgJ01hdGgnLCB0cnVlKTtcbi8vIDI0LjMuMyBKU09OW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhnbG9iYWwuSlNPTiwgJ0pTT04nLCB0cnVlKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zeW1ib2wuanNcbi8vIG1vZHVsZSBpZCA9IDgyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIE1FVEEgICAgID0gcmVxdWlyZSgnLi9fdWlkJykoJ21ldGEnKVxuICAsIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBoYXMgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgc2V0RGVzYyAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mXG4gICwgaWQgICAgICAgPSAwO1xudmFyIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGUgfHwgZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHRydWU7XG59O1xudmFyIEZSRUVaRSA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBpc0V4dGVuc2libGUoT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zKHt9KSk7XG59KTtcbnZhciBzZXRNZXRhID0gZnVuY3Rpb24oaXQpe1xuICBzZXREZXNjKGl0LCBNRVRBLCB7dmFsdWU6IHtcbiAgICBpOiAnTycgKyArK2lkLCAvLyBvYmplY3QgSURcbiAgICB3OiB7fSAgICAgICAgICAvLyB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9fSk7XG59O1xudmFyIGZhc3RLZXkgPSBmdW5jdGlvbihpdCwgY3JlYXRlKXtcbiAgLy8gcmV0dXJuIHByaW1pdGl2ZSB3aXRoIHByZWZpeFxuICBpZighaXNPYmplY3QoaXQpKXJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCcgPyBpdCA6ICh0eXBlb2YgaXQgPT0gJ3N0cmluZycgPyAnUycgOiAnUCcpICsgaXQ7XG4gIGlmKCFoYXMoaXQsIE1FVEEpKXtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmKCFpc0V4dGVuc2libGUoaXQpKXJldHVybiAnRic7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZighY3JlYXRlKXJldHVybiAnRSc7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIG9iamVjdCBJRFxuICB9IHJldHVybiBpdFtNRVRBXS5pO1xufTtcbnZhciBnZXRXZWFrID0gZnVuY3Rpb24oaXQsIGNyZWF0ZSl7XG4gIGlmKCFoYXMoaXQsIE1FVEEpKXtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmKCFpc0V4dGVuc2libGUoaXQpKXJldHVybiB0cnVlO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYoIWNyZWF0ZSlyZXR1cm4gZmFsc2U7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIGhhc2ggd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfSByZXR1cm4gaXRbTUVUQV0udztcbn07XG4vLyBhZGQgbWV0YWRhdGEgb24gZnJlZXplLWZhbWlseSBtZXRob2RzIGNhbGxpbmdcbnZhciBvbkZyZWV6ZSA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoRlJFRVpFICYmIG1ldGEuTkVFRCAmJiBpc0V4dGVuc2libGUoaXQpICYmICFoYXMoaXQsIE1FVEEpKXNldE1ldGEoaXQpO1xuICByZXR1cm4gaXQ7XG59O1xudmFyIG1ldGEgPSBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgS0VZOiAgICAgIE1FVEEsXG4gIE5FRUQ6ICAgICBmYWxzZSxcbiAgZmFzdEtleTogIGZhc3RLZXksXG4gIGdldFdlYWs6ICBnZXRXZWFrLFxuICBvbkZyZWV6ZTogb25GcmVlemVcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWV0YS5qc1xuLy8gbW9kdWxlIGlkID0gODNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgZ2xvYmFsICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGNvcmUgICAgICAgICAgID0gcmVxdWlyZSgnLi9fY29yZScpXG4gICwgTElCUkFSWSAgICAgICAgPSByZXF1aXJlKCcuL19saWJyYXJ5JylcbiAgLCB3a3NFeHQgICAgICAgICA9IHJlcXVpcmUoJy4vX3drcy1leHQnKVxuICAsIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSl7XG4gIHZhciAkU3ltYm9sID0gY29yZS5TeW1ib2wgfHwgKGNvcmUuU3ltYm9sID0gTElCUkFSWSA/IHt9IDogZ2xvYmFsLlN5bWJvbCB8fCB7fSk7XG4gIGlmKG5hbWUuY2hhckF0KDApICE9ICdfJyAmJiAhKG5hbWUgaW4gJFN5bWJvbCkpZGVmaW5lUHJvcGVydHkoJFN5bWJvbCwgbmFtZSwge3ZhbHVlOiB3a3NFeHQuZihuYW1lKX0pO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MtZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSA4NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBnZXRLZXlzICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpXG4gICwgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIGVsKXtcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgLCBrZXlzICAgPSBnZXRLZXlzKE8pXG4gICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICwgaW5kZXggID0gMFxuICAgICwga2V5O1xuICB3aGlsZShsZW5ndGggPiBpbmRleClpZihPW2tleSA9IGtleXNbaW5kZXgrK11dID09PSBlbClyZXR1cm4ga2V5O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19rZXlvZi5qc1xuLy8gbW9kdWxlIGlkID0gODVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBhbGwgZW51bWVyYWJsZSBvYmplY3Qga2V5cywgaW5jbHVkZXMgc3ltYm9sc1xudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpXG4gICwgZ09QUyAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJylcbiAgLCBwSUUgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHZhciByZXN1bHQgICAgID0gZ2V0S2V5cyhpdClcbiAgICAsIGdldFN5bWJvbHMgPSBnT1BTLmY7XG4gIGlmKGdldFN5bWJvbHMpe1xuICAgIHZhciBzeW1ib2xzID0gZ2V0U3ltYm9scyhpdClcbiAgICAgICwgaXNFbnVtICA9IHBJRS5mXG4gICAgICAsIGkgICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShzeW1ib2xzLmxlbmd0aCA+IGkpaWYoaXNFbnVtLmNhbGwoaXQsIGtleSA9IHN5bWJvbHNbaSsrXSkpcmVzdWx0LnB1c2goa2V5KTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDg2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wcy5qc1xuLy8gbW9kdWxlIGlkID0gODdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJleHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtcGllLmpzXG4vLyBtb2R1bGUgaWQgPSA4OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIDcuMi4yIElzQXJyYXkoYXJndW1lbnQpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gaXNBcnJheShhcmcpe1xuICByZXR1cm4gY29mKGFyZykgPT0gJ0FycmF5Jztcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtYXJyYXkuanNcbi8vIG1vZHVsZSBpZCA9IDg5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gZmFsbGJhY2sgZm9yIElFMTEgYnVnZ3kgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgd2l0aCBpZnJhbWUgYW5kIHdpbmRvd1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIGdPUE4gICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZlxuICAsIHRvU3RyaW5nICA9IHt9LnRvU3RyaW5nO1xuXG52YXIgd2luZG93TmFtZXMgPSB0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIHdpbmRvdyAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lc1xuICA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHdpbmRvdykgOiBbXTtcblxudmFyIGdldFdpbmRvd05hbWVzID0gZnVuY3Rpb24oaXQpe1xuICB0cnkge1xuICAgIHJldHVybiBnT1BOKGl0KTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gd2luZG93TmFtZXMuc2xpY2UoKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMuZiA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpe1xuICByZXR1cm4gd2luZG93TmFtZXMgJiYgdG9TdHJpbmcuY2FsbChpdCkgPT0gJ1tvYmplY3QgV2luZG93XScgPyBnZXRXaW5kb3dOYW1lcyhpdCkgOiBnT1BOKHRvSU9iamVjdChpdCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BuLWV4dC5qc1xuLy8gbW9kdWxlIGlkID0gOTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyAxOS4xLjIuNyAvIDE1LjIuMy40IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG52YXIgJGtleXMgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJylcbiAgLCBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpLmNvbmNhdCgnbGVuZ3RoJywgJ3Byb3RvdHlwZScpO1xuXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pe1xuICByZXR1cm4gJGtleXMoTywgaGlkZGVuS2V5cyk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BuLmpzXG4vLyBtb2R1bGUgaWQgPSA5MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBwSUUgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKVxuICAsIGNyZWF0ZURlc2MgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpXG4gICwgdG9JT2JqZWN0ICAgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKVxuICAsIGdPUEQgICAgICAgICAgID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGdPUEQgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCl7XG4gIE8gPSB0b0lPYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgaWYoSUU4X0RPTV9ERUZJTkUpdHJ5IHtcbiAgICByZXR1cm4gZ09QRChPLCBQKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICBpZihoYXMoTywgUCkpcmV0dXJuIGNyZWF0ZURlc2MoIXBJRS5mLmNhbGwoTywgUCksIE9bUF0pO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wZC5qc1xuLy8gbW9kdWxlIGlkID0gOTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJyZXF1aXJlKCcuL193a3MtZGVmaW5lJykoJ2FzeW5jSXRlcmF0b3InKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDk0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwicmVxdWlyZSgnLi9fd2tzLWRlZmluZScpKCdvYnNlcnZhYmxlJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDk1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZlwiKTtcblxudmFyIF9zZXRQcm90b3R5cGVPZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zZXRQcm90b3R5cGVPZik7XG5cbnZhciBfY3JlYXRlID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2NyZWF0ZVwiKTtcblxudmFyIF9jcmVhdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlKTtcblxudmFyIF90eXBlb2YyID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG52YXIgX3R5cGVvZjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90eXBlb2YyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArICh0eXBlb2Ygc3VwZXJDbGFzcyA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiAoMCwgX3R5cGVvZjMuZGVmYXVsdCkoc3VwZXJDbGFzcykpKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9ICgwLCBfY3JlYXRlMi5kZWZhdWx0KShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBzdWJDbGFzcyxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mMi5kZWZhdWx0ID8gKDAsIF9zZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9oZWxwZXJzL2luaGVyaXRzLmpzXG4vLyBtb2R1bGUgaWQgPSA5NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZlwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qc1xuLy8gbW9kdWxlIGlkID0gOTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LnNldFByb3RvdHlwZU9mO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzXG4vLyBtb2R1bGUgaWQgPSA5OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIDE5LjEuMy4xOSBPYmplY3Quc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7c2V0UHJvdG90eXBlT2Y6IHJlcXVpcmUoJy4vX3NldC1wcm90bycpLnNldH0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mLmpzXG4vLyBtb2R1bGUgaWQgPSA5OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIFdvcmtzIHdpdGggX19wcm90b19fIG9ubHkuIE9sZCB2OCBjYW4ndCB3b3JrIHdpdGggbnVsbCBwcm90byBvYmplY3RzLlxuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBjaGVjayA9IGZ1bmN0aW9uKE8sIHByb3RvKXtcbiAgYW5PYmplY3QoTyk7XG4gIGlmKCFpc09iamVjdChwcm90bykgJiYgcHJvdG8gIT09IG51bGwpdGhyb3cgVHlwZUVycm9yKHByb3RvICsgXCI6IGNhbid0IHNldCBhcyBwcm90b3R5cGUhXCIpO1xufTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZnVuY3Rpb24odGVzdCwgYnVnZ3ksIHNldCl7XG4gICAgICB0cnkge1xuICAgICAgICBzZXQgPSByZXF1aXJlKCcuL19jdHgnKShGdW5jdGlvbi5jYWxsLCByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpLmYoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldCwgMik7XG4gICAgICAgIHNldCh0ZXN0LCBbXSk7XG4gICAgICAgIGJ1Z2d5ID0gISh0ZXN0IGluc3RhbmNlb2YgQXJyYXkpO1xuICAgICAgfSBjYXRjaChlKXsgYnVnZ3kgPSB0cnVlOyB9XG4gICAgICByZXR1cm4gZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pe1xuICAgICAgICBjaGVjayhPLCBwcm90byk7XG4gICAgICAgIGlmKGJ1Z2d5KU8uX19wcm90b19fID0gcHJvdG87XG4gICAgICAgIGVsc2Ugc2V0KE8sIHByb3RvKTtcbiAgICAgICAgcmV0dXJuIE87XG4gICAgICB9O1xuICAgIH0oe30sIGZhbHNlKSA6IHVuZGVmaW5lZCksXG4gIGNoZWNrOiBjaGVja1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtcHJvdG8uanNcbi8vIG1vZHVsZSBpZCA9IDEwMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvY3JlYXRlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDEwMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUnKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlKFAsIEQpe1xuICByZXR1cm4gJE9iamVjdC5jcmVhdGUoUCwgRCk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDEwMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jylcbi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7Y3JlYXRlOiByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJyl9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG4oZnVuY3Rpb24gKHdpbikge1xuXG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLy8gbWFqb3IgZXZlbnRzIHN1cHBvcnRlZDpcbiAgICAvLyBwYW5zdGFydFxuICAgIC8vIHBhbm1vdmVcbiAgICAvLyBwYW5lbmRcbiAgICAvLyBzd2lwZVxuICAgIC8vIGxvbmdwcmVzc1xuXG4gICAgLy8gZXh0cmEgZXZlbnRzIHN1cHBvcnRlZDpcbiAgICAvLyBkdWFsdG91Y2hzdGFydFxuICAgIC8vIGR1YWx0b3VjaFxuICAgIC8vIGR1YWx0b3VjaGVuZFxuICAgIC8vIHZlcnRpY2FscGFuc3RhcnRcbiAgICAvLyBob3Jpem9udGFscGFuc3RhcnRcbiAgICAvLyB2ZXJ0aWNhbHBhbm1vdmVcbiAgICAvLyBob3Jpem9udGFscGFubW92ZVxuICAgIC8vIHRhcFxuICAgIC8vIGRvdWJsZXRhcFxuICAgIC8vIHZlcnRpY2Fsc3dpcGVcbiAgICAvLyBob3Jpem9udGFsc3dpcGVcbiAgICAvLyBwcmVzc2VuZFxuXG4gICAgdmFyIGRvYyA9IHdpbi5kb2N1bWVudCxcbiAgICAgICAgZG9jRWwgPSBkb2MuZG9jdW1lbnRFbGVtZW50LFxuICAgICAgICBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZSxcbiAgICAgICAgZ2VzdHVyZXMgPSB7fSxcbiAgICAgICAgbGFzdFRhcCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAqIOaJvuWIsOS4pOS4que7k+eCueWFseWQjOeahOacgOWwj+aguee7k+eCuVxuICAgICog5aaC5p6c6Lef57uT54K55LiN5a2Y5Zyo77yM5YiZ6L+U5ZuebnVsbFxuICAgICpcbiAgICAqIEBwYXJhbSAge0VsZW1lbnR9IGVsMSDnrKzkuIDkuKrnu5PngrlcbiAgICAqIEBwYXJhbSAge0VsZW1lbnR9IGVsMiDnrKzkuozkuKrnu5PngrlcbiAgICAqIEByZXR1cm4ge0VsZW1lbnR9ICAgICDmoLnnu5PngrlcbiAgICAqL1xuICAgIGZ1bmN0aW9uIGdldENvbW1vbkFuY2VzdG9yKGVsMSwgZWwyKSB7XG4gICAgICAgIHZhciBlbCA9IGVsMTtcbiAgICAgICAgd2hpbGUgKGVsKSB7XG4gICAgICAgICAgICBpZiAoZWwuY29udGFpbnMoZWwyKSB8fCBlbCA9PT0gZWwyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWwgPSBlbC5wYXJlbnROb2RlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICog6Kem5Y+R5LiA5Liq5LqL5Lu2XG4gICAgKlxuICAgICogQHBhcmFtICB7RWxlbWVudH0gZWxlbWVudCDnm67moIfnu5PngrlcbiAgICAqIEBwYXJhbSAge3N0cmluZ30gIHR5cGUgICAg5LqL5Lu257G75Z6LXG4gICAgKiBAcGFyYW0gIHtvYmplY3R9ICBleHRyYSAgIOWvueS6i+S7tuWvueixoeeahOaJqeWxlVxuICAgICovXG4gICAgZnVuY3Rpb24gZmlyZUV2ZW50KGVsZW1lbnQsIHR5cGUsIGV4dHJhKSB7XG4gICAgICAgIHZhciBldmVudCA9IGRvYy5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpO1xuICAgICAgICBldmVudC5pbml0RXZlbnQodHlwZSwgdHJ1ZSwgdHJ1ZSk7XG5cbiAgICAgICAgaWYgKCh0eXBlb2YgZXh0cmEgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGV4dHJhKSkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIGV4dHJhKSB7XG4gICAgICAgICAgICAgICAgZXZlbnRbcF0gPSBleHRyYVtwXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiDorqHnrpflj5jmjaLmlYjmnpxcbiAgICAqIOWBh+iuvuWdkOagh+ezu+S4iuaciTTkuKrngrlBQkNEXG4gICAgKiA+IOaXi+i9rO+8muS7jkFC5peL6L2s5YiwQ0TnmoTop5LluqZcbiAgICAqID4g57yp5pS+77ya5LuOQULplb/luqblj5jmjaLliLBDROmVv+W6pueahOavlOS+i1xuICAgICogPiDkvY3np7vvvJrku45B54K55L2N56e75YiwQ+eCueeahOaoque6teS9jeenu1xuICAgICpcbiAgICAqIEBwYXJhbSAge251bWJlcn0geDEg5LiK6L+w56ysMeS4queCueeahOaoquWdkOagh1xuICAgICogQHBhcmFtICB7bnVtYmVyfSB5MSDkuIrov7DnrKwx5Liq54K555qE57q15Z2Q5qCHXG4gICAgKiBAcGFyYW0gIHtudW1iZXJ9IHgyIOS4iui/sOesrDLkuKrngrnnmoTmqKrlnZDmoIdcbiAgICAqIEBwYXJhbSAge251bWJlcn0geTIg5LiK6L+w56ysMuS4queCueeahOe6teWdkOagh1xuICAgICogQHBhcmFtICB7bnVtYmVyfSB4MyDkuIrov7DnrKwz5Liq54K555qE5qiq5Z2Q5qCHXG4gICAgKiBAcGFyYW0gIHtudW1iZXJ9IHkzIOS4iui/sOesrDPkuKrngrnnmoTnurXlnZDmoIdcbiAgICAqIEBwYXJhbSAge251bWJlcn0geDQg5LiK6L+w56ysNOS4queCueeahOaoquWdkOagh1xuICAgICogQHBhcmFtICB7bnVtYmVyfSB5NCDkuIrov7DnrKw05Liq54K555qE57q15Z2Q5qCHXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9ICAgIOWPmOaNouaViOaenO+8jOW9ouWmgntyb3RhdGUsIHNjYWxlLCB0cmFuc2xhdGVbMl0sIG1hdHJpeFszXVszXX1cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGNhbGMoeDEsIHkxLCB4MiwgeTIsIHgzLCB5MywgeDQsIHk0KSB7XG4gICAgICAgIHZhciByb3RhdGUgPSBNYXRoLmF0YW4yKHk0IC0geTMsIHg0IC0geDMpIC0gTWF0aC5hdGFuMih5MiAtIHkxLCB4MiAtIHgxKSxcbiAgICAgICAgICAgIHNjYWxlID0gTWF0aC5zcXJ0KChNYXRoLnBvdyh5NCAtIHkzLCAyKSArIE1hdGgucG93KHg0IC0geDMsIDIpKSAvIChNYXRoLnBvdyh5MiAtIHkxLCAyKSArIE1hdGgucG93KHgyIC0geDEsIDIpKSksXG4gICAgICAgICAgICB0cmFuc2xhdGUgPSBbeDMgLSBzY2FsZSAqIHgxICogTWF0aC5jb3Mocm90YXRlKSArIHNjYWxlICogeTEgKiBNYXRoLnNpbihyb3RhdGUpLCB5MyAtIHNjYWxlICogeTEgKiBNYXRoLmNvcyhyb3RhdGUpIC0gc2NhbGUgKiB4MSAqIE1hdGguc2luKHJvdGF0ZSldO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcm90YXRlOiByb3RhdGUsXG4gICAgICAgICAgICBzY2FsZTogc2NhbGUsXG4gICAgICAgICAgICB0cmFuc2xhdGU6IHRyYW5zbGF0ZSxcbiAgICAgICAgICAgIG1hdHJpeDogW1tzY2FsZSAqIE1hdGguY29zKHJvdGF0ZSksIC1zY2FsZSAqIE1hdGguc2luKHJvdGF0ZSksIHRyYW5zbGF0ZVswXV0sIFtzY2FsZSAqIE1hdGguc2luKHJvdGF0ZSksIHNjYWxlICogTWF0aC5jb3Mocm90YXRlKSwgdHJhbnNsYXRlWzFdXSwgWzAsIDAsIDFdXVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICog5o2V6I63dG91Y2hzdGFydOS6i+S7tu+8jOWwhuavj+S4gOS4quaWsOWinueahOinpueCuea3u+WKoOWIsGdlc3RydWVzXG4gICAgKiDlpoLmnpzkuYvliY3lsJrml6DooqvorrDlvZXnmoTop6bngrnvvIzliJnnu5Hlrpp0b3VjaG1vdmUsIHRvdWNoZW5kLCB0b3VjaGNhbmNlbOS6i+S7tlxuICAgICpcbiAgICAqIOaWsOWinuinpueCuem7mOiupOWkhOS6jnRhcHBpbmfnirbmgIFcbiAgICAqIDUwMOavq+enkuS5i+WQjuWmguaenOi/mOWkhOS6jnRhcHBpbmfnirbmgIHvvIzliJnop6blj5FwcmVzc+aJi+WKv1xuICAgICog5aaC5p6c6Kem54K55pWw5Li6Mu+8jOWImeinpuWPkWR1YWx0b3VjaHN0YXJ05omL5Yq/77yM6K+l5omL5Yq/55qE55uu5qCH57uT54K55Li65Lik5Liq6Kem54K55YWx5ZCM55qE5pyA5bCP5qC557uT54K5XG4gICAgKlxuICAgICogQGV2ZW50XG4gICAgKiBAcGFyYW0gIHtldmVudH0gZXZlbnRcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHRvdWNoc3RhcnRIYW5kbGVyKGV2ZW50KSB7XG5cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGdlc3R1cmVzKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGRvY0VsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRvdWNobW92ZUhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIGRvY0VsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdG91Y2hlbmRIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgICAgICBkb2NFbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRvdWNoY2FuY2VsSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGdlc3R1cmUsIHRvdWNoLCB0b3VjaFJlY29yZCwgZWxlbWVudHM7XG5cbiAgICAgICAgZnVuY3Rpb24gZ2VuUHJlc3NIYW5kbGVyKGVsZW1lbnQsIHRvdWNoKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChnZXN0dXJlLnN0YXR1cyA9PT0gJ3RhcHBpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGdlc3R1cmUuc3RhdHVzID0gJ3ByZXNzaW5nJztcblxuICAgICAgICAgICAgICAgICAgICBmaXJlRXZlbnQoZWxlbWVudCwgJ2xvbmdwcmVzcycsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCB0b3VjaCBkYXRhIGZvciB3ZWV4XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaDogdG91Y2gsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaGVzOiBldmVudC50b3VjaGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlZFRvdWNoZXM6IGV2ZW50LmNoYW5nZWRUb3VjaGVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hFdmVudDogZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGdlc3R1cmUucHJlc3NpbmdIYW5kbGVyKTtcbiAgICAgICAgICAgICAgICBnZXN0dXJlLnByZXNzaW5nSGFuZGxlciA9IG51bGw7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVjb3JkIGV2ZXJ5IHRvdWNoXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbaV07XG4gICAgICAgICAgICB0b3VjaFJlY29yZCA9IHt9O1xuXG4gICAgICAgICAgICBmb3IgKHZhciBfcCBpbiB0b3VjaCkge1xuICAgICAgICAgICAgICAgIHRvdWNoUmVjb3JkW19wXSA9IHRvdWNoW19wXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZ2VzdHVyZSA9IHtcbiAgICAgICAgICAgICAgICBzdGFydFRvdWNoOiB0b3VjaFJlY29yZCxcbiAgICAgICAgICAgICAgICBzdGFydFRpbWU6IERhdGUubm93KCksXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAndGFwcGluZycsXG4gICAgICAgICAgICAgICAgZWxlbWVudDogZXZlbnQuc3JjRWxlbWVudCB8fCBldmVudC50YXJnZXQsXG4gICAgICAgICAgICAgICAgcHJlc3NpbmdIYW5kbGVyOiBzZXRUaW1lb3V0KGdlblByZXNzSGFuZGxlcihldmVudC5zcmNFbGVtZW50IHx8IGV2ZW50LnRhcmdldCwgZXZlbnQuY2hhbmdlZFRvdWNoZXNbaV0pLCA1MDApXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZ2VzdHVyZXNbdG91Y2guaWRlbnRpZmllcl0gPSBnZXN0dXJlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGdlc3R1cmVzKS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIGVsZW1lbnRzID0gW107XG5cbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gZ2VzdHVyZXMpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5wdXNoKGdlc3R1cmVzW3BdLmVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmaXJlRXZlbnQoZ2V0Q29tbW9uQW5jZXN0b3IoZWxlbWVudHNbMF0sIGVsZW1lbnRzWzFdKSwgJ2R1YWx0b3VjaHN0YXJ0Jywge1xuICAgICAgICAgICAgICAgIHRvdWNoZXM6IHNsaWNlLmNhbGwoZXZlbnQudG91Y2hlcyksXG4gICAgICAgICAgICAgICAgdG91Y2hFdmVudDogZXZlbnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiDmjZXojrd0b3VjaG1vdmXkuovku7bvvIzlpITnkIZwYW7lkoxkdWFs55qE55u45YWz5omL5Yq/XG4gICAgKlxuICAgICogMS4g6YGN5Y6G5q+P5Liq6Kem54K577yaXG4gICAgKiA+IOWmguaenOinpueCueS5i+WJjeWkhOS6jnRhcHBpbmfnirbmgIHvvIzkuJTkvY3np7votoXov4cxMOWDj+e0oO+8jOWImeiupOWumuS4uui/m+WFpXBhbm5pbmfnirbmgIFcbiAgICAqIOWFiOinpuWPkXBhbnN0YXJ05omL5Yq/77yM54S25ZCO5qC55o2u56e75Yqo55qE5pa55ZCR6YCJ5oup5oCn6Kem5Y+RaG9yaXpvbnRhbHBhbnN0YXJ05oiWdmVydGljYWxwYW5zdGFydOaJi+WKv1xuICAgICogPiDlpoLmnpzop6bngrnkuYvliY3lpITkuo5wYW5uaW5n54q25oCB77yM5YiZ5qC55o2ucGFu55qE5Yid5aeL5pa55ZCR6Kem5Y+RaG9yaXpvbnRhbHBhbuaIlnZlcnRpY2FscGFu5omL5Yq/XG4gICAgKlxuICAgICogMi4g5aaC5p6c5b2T5YmN6Kem54K55pWw5Li6Mu+8jOWImeiuoeeul+WHuuWHoOS9leWPmOaNoueahOWQhOmhueWPguaVsO+8jOinpuWPkWR1YWx0b3VjaOaJi+WKv1xuICAgICpcbiAgICAqIEBldmVudFxuICAgICogQHBhcmFtICB7ZXZlbnR9IGV2ZW50XG4gICAgKi9cbiAgICBmdW5jdGlvbiB0b3VjaG1vdmVIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIC8vIFRPRE86IOWHveaVsOWkquWkp+S6hu+8jOW9seWTjeWPr+ivu+aAp++8jOW7uuiuruWIhuino+W5tuWKoOW/heimgeeahOazqOmHilxuXG4gICAgICAgIC8vIOmBjeWOhuavj+S4quinpueCue+8mlxuICAgICAgICAvLyAxLiDlpoLmnpzop6bngrnkuYvliY3lpITkuo50YXBwaW5n54q25oCB77yM5LiU5L2N56e76LaF6L+HMTDlg4/ntKDvvIzliJnorqTlrprkuLrov5vlhaVwYW5uaW5n54q25oCBXG4gICAgICAgIC8vIOWFiOinpuWPkXBhbnN0YXJ05omL5Yq/77yM54S25ZCO5qC55o2u56e75Yqo55qE5pa55ZCR6YCJ5oup5oCn6Kem5Y+RaG9yaXpvbnRhbHBhbnN0YXJ05oiWdmVydGljYWxwYW5zdGFydOaJi+WKv1xuICAgICAgICAvLyAyLiDlpoLmnpzop6bngrnkuYvliY3lpITkuo5wYW5uaW5n54q25oCB77yM5YiZ5qC55o2ucGFu55qE5Yid5aeL5pa55ZCR6Kem5Y+RaG9yaXpvbnRhbHBhbuaIlnZlcnRpY2FscGFu5omL5Yq/XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciB0b3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzW2ldLFxuICAgICAgICAgICAgICAgIGdlc3R1cmUgPSBnZXN0dXJlc1t0b3VjaC5pZGVudGlmaWVyXTtcblxuICAgICAgICAgICAgaWYgKCFnZXN0dXJlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWdlc3R1cmUubGFzdFRvdWNoKSB7XG4gICAgICAgICAgICAgICAgZ2VzdHVyZS5sYXN0VG91Y2ggPSBnZXN0dXJlLnN0YXJ0VG91Y2g7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWdlc3R1cmUubGFzdFRpbWUpIHtcbiAgICAgICAgICAgICAgICBnZXN0dXJlLmxhc3RUaW1lID0gZ2VzdHVyZS5zdGFydFRpbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWdlc3R1cmUudmVsb2NpdHlYKSB7XG4gICAgICAgICAgICAgICAgZ2VzdHVyZS52ZWxvY2l0eVggPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFnZXN0dXJlLnZlbG9jaXR5WSkge1xuICAgICAgICAgICAgICAgIGdlc3R1cmUudmVsb2NpdHlZID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZ2VzdHVyZS5kdXJhdGlvbikge1xuICAgICAgICAgICAgICAgIGdlc3R1cmUuZHVyYXRpb24gPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdGltZSA9IERhdGUubm93KCkgLSBnZXN0dXJlLmxhc3RUaW1lO1xuICAgICAgICAgICAgdmFyIHZ4ID0gKHRvdWNoLmNsaWVudFggLSBnZXN0dXJlLmxhc3RUb3VjaC5jbGllbnRYKSAvIHRpbWUsXG4gICAgICAgICAgICAgICAgdnkgPSAodG91Y2guY2xpZW50WSAtIGdlc3R1cmUubGFzdFRvdWNoLmNsaWVudFkpIC8gdGltZTtcblxuICAgICAgICAgICAgdmFyIFJFQ09SRF9EVVJBVElPTiA9IDcwO1xuICAgICAgICAgICAgaWYgKHRpbWUgPiBSRUNPUkRfRFVSQVRJT04pIHtcbiAgICAgICAgICAgICAgICB0aW1lID0gUkVDT1JEX0RVUkFUSU9OO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGdlc3R1cmUuZHVyYXRpb24gKyB0aW1lID4gUkVDT1JEX0RVUkFUSU9OKSB7XG4gICAgICAgICAgICAgICAgZ2VzdHVyZS5kdXJhdGlvbiA9IFJFQ09SRF9EVVJBVElPTiAtIHRpbWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGdlc3R1cmUudmVsb2NpdHlYID0gKGdlc3R1cmUudmVsb2NpdHlYICogZ2VzdHVyZS5kdXJhdGlvbiArIHZ4ICogdGltZSkgLyAoZ2VzdHVyZS5kdXJhdGlvbiArIHRpbWUpO1xuICAgICAgICAgICAgZ2VzdHVyZS52ZWxvY2l0eVkgPSAoZ2VzdHVyZS52ZWxvY2l0eVkgKiBnZXN0dXJlLmR1cmF0aW9uICsgdnkgKiB0aW1lKSAvIChnZXN0dXJlLmR1cmF0aW9uICsgdGltZSk7XG4gICAgICAgICAgICBnZXN0dXJlLmR1cmF0aW9uICs9IHRpbWU7XG5cbiAgICAgICAgICAgIGdlc3R1cmUubGFzdFRvdWNoID0ge307XG5cbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gdG91Y2gpIHtcbiAgICAgICAgICAgICAgICBnZXN0dXJlLmxhc3RUb3VjaFtwXSA9IHRvdWNoW3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ2VzdHVyZS5sYXN0VGltZSA9IERhdGUubm93KCk7XG5cbiAgICAgICAgICAgIHZhciBkaXNwbGFjZW1lbnRYID0gdG91Y2guY2xpZW50WCAtIGdlc3R1cmUuc3RhcnRUb3VjaC5jbGllbnRYLFxuICAgICAgICAgICAgICAgIGRpc3BsYWNlbWVudFkgPSB0b3VjaC5jbGllbnRZIC0gZ2VzdHVyZS5zdGFydFRvdWNoLmNsaWVudFksXG4gICAgICAgICAgICAgICAgZGlzdGFuY2UgPSBNYXRoLnNxcnQoTWF0aC5wb3coZGlzcGxhY2VtZW50WCwgMikgKyBNYXRoLnBvdyhkaXNwbGFjZW1lbnRZLCAyKSk7XG5cbiAgICAgICAgICAgIC8vIG1hZ2ljIG51bWJlciAxMDogbW92aW5nIDEwcHggbWVhbnMgcGFuLCBub3QgdGFwXG4gICAgICAgICAgICBpZiAoKGdlc3R1cmUuc3RhdHVzID09PSAndGFwcGluZycgfHwgZ2VzdHVyZS5zdGF0dXMgPT09ICdwcmVzc2luZycpICYmIGRpc3RhbmNlID4gMTApIHtcbiAgICAgICAgICAgICAgICBnZXN0dXJlLnN0YXR1cyA9ICdwYW5uaW5nJztcbiAgICAgICAgICAgICAgICBnZXN0dXJlLmlzVmVydGljYWwgPSAhKE1hdGguYWJzKGRpc3BsYWNlbWVudFgpID4gTWF0aC5hYnMoZGlzcGxhY2VtZW50WSkpO1xuXG4gICAgICAgICAgICAgICAgZmlyZUV2ZW50KGdlc3R1cmUuZWxlbWVudCwgJ3BhbnN0YXJ0Jywge1xuICAgICAgICAgICAgICAgICAgICB0b3VjaDogdG91Y2gsXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoZXM6IGV2ZW50LnRvdWNoZXMsXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZWRUb3VjaGVzOiBldmVudC5jaGFuZ2VkVG91Y2hlcyxcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIGlzVmVydGljYWw6IGdlc3R1cmUuaXNWZXJ0aWNhbFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgZmlyZUV2ZW50KGdlc3R1cmUuZWxlbWVudCwgKGdlc3R1cmUuaXNWZXJ0aWNhbCA/ICd2ZXJ0aWNhbCcgOiAnaG9yaXpvbnRhbCcpICsgJ3BhbnN0YXJ0Jywge1xuICAgICAgICAgICAgICAgICAgICB0b3VjaDogdG91Y2gsXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoRXZlbnQ6IGV2ZW50XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChnZXN0dXJlLnN0YXR1cyA9PT0gJ3Bhbm5pbmcnKSB7XG4gICAgICAgICAgICAgICAgZ2VzdHVyZS5wYW5UaW1lID0gRGF0ZS5ub3coKTtcblxuICAgICAgICAgICAgICAgIGZpcmVFdmVudChnZXN0dXJlLmVsZW1lbnQsICdwYW5tb3ZlJywge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGFjZW1lbnRYOiBkaXNwbGFjZW1lbnRYLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGFjZW1lbnRZOiBkaXNwbGFjZW1lbnRZLFxuICAgICAgICAgICAgICAgICAgICB0b3VjaDogdG91Y2gsXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoZXM6IGV2ZW50LnRvdWNoZXMsXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZWRUb3VjaGVzOiBldmVudC5jaGFuZ2VkVG91Y2hlcyxcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIGlzVmVydGljYWw6IGdlc3R1cmUuaXNWZXJ0aWNhbFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGdlc3R1cmUuaXNWZXJ0aWNhbCkge1xuICAgICAgICAgICAgICAgICAgICBmaXJlRXZlbnQoZ2VzdHVyZS5lbGVtZW50LCAndmVydGljYWxwYW5tb3ZlJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxhY2VtZW50WTogZGlzcGxhY2VtZW50WSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoOiB0b3VjaCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoRXZlbnQ6IGV2ZW50XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZpcmVFdmVudChnZXN0dXJlLmVsZW1lbnQsICdob3Jpem9udGFscGFubW92ZScsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYWNlbWVudFg6IGRpc3BsYWNlbWVudFgsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaDogdG91Y2gsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaEV2ZW50OiBldmVudFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyDlpoLmnpzlvZPliY3op6bngrnmlbDkuLoy77yM5YiZ6K6h566X5Ye65Yeg5L2V5Y+Y5o2i55qE5ZCE6aG55Y+C5pWw77yM6Kem5Y+RZHVhbHRvdWNo5omL5Yq/XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhnZXN0dXJlcykubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICB2YXIgcG9zaXRpb24gPSBbXSxcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gW10sXG4gICAgICAgICAgICAgICAgZWxlbWVudHMgPSBbXSxcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm0gPSB2b2lkIDA7XG5cbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBldmVudC50b3VjaGVzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHZhciBfdG91Y2ggPSBldmVudC50b3VjaGVzW19pXTtcbiAgICAgICAgICAgICAgICB2YXIgX2dlc3R1cmUgPSBnZXN0dXJlc1tfdG91Y2guaWRlbnRpZmllcl07XG4gICAgICAgICAgICAgICAgcG9zaXRpb24ucHVzaChbX2dlc3R1cmUuc3RhcnRUb3VjaC5jbGllbnRYLCBfZ2VzdHVyZS5zdGFydFRvdWNoLmNsaWVudFldKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50LnB1c2goW190b3VjaC5jbGllbnRYLCBfdG91Y2guY2xpZW50WV0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKHZhciBfcDIgaW4gZ2VzdHVyZXMpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5wdXNoKGdlc3R1cmVzW19wMl0uZWxlbWVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRyYW5zZm9ybSA9IGNhbGMocG9zaXRpb25bMF1bMF0sIHBvc2l0aW9uWzBdWzFdLCBwb3NpdGlvblsxXVswXSwgcG9zaXRpb25bMV1bMV0sIGN1cnJlbnRbMF1bMF0sIGN1cnJlbnRbMF1bMV0sIGN1cnJlbnRbMV1bMF0sIGN1cnJlbnRbMV1bMV0pO1xuICAgICAgICAgICAgZmlyZUV2ZW50KGdldENvbW1vbkFuY2VzdG9yKGVsZW1lbnRzWzBdLCBlbGVtZW50c1sxXSksICdkdWFsdG91Y2gnLCB7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2Zvcm0sXG4gICAgICAgICAgICAgICAgdG91Y2hlczogZXZlbnQudG91Y2hlcyxcbiAgICAgICAgICAgICAgICB0b3VjaEV2ZW50OiBldmVudFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAqIOaNleiOt3RvdWNoZW5k5LqL5Lu2XG4gICAgKlxuICAgICogMS4g5aaC5p6c5b2T5YmN6Kem54K55pWw5Li6Mu+8jOWImeinpuWPkWR1YWx0b3VjaGVuZOaJi+WKv1xuICAgICpcbiAgICAqIDIuIOmBjeWOhuavj+S4quinpueCue+8mlxuICAgICogPiDlpoLmnpzlpITkuo50YXBwaW5n54q25oCB77yM5YiZ6Kem5Y+RdGFw5omL5Yq/XG4gICAgKiDlpoLmnpzkuYvliY0zMDDmr6vnp5Llh7rnjrDov4d0YXDmiYvlir/vvIzliJnljYfnuqfkuLpkb3VibGV0YXDmiYvlir9cbiAgICAqID4g5aaC5p6c5aSE5LqOcGFubmluZ+eKtuaAge+8jOWImeagueaNrua7keWHuueahOmAn+W6pu+8jOinpuWPkXBhbmVuZC9mbGlja+aJi+WKv1xuICAgICogZmxpY2vmiYvlir/ooqvop6blj5HkuYvlkI7vvIzlho3moLnmja7mu5Hlh7rnmoTmlrnlkJHop6blj5F2ZXJ0aWNhbGZsaWNrL2hvcml6b250YWxmbGlja+aJi+WKv1xuICAgICogPiDlpoLmnpzlpITkuo5wcmVzc2luZ+eKtuaAge+8jOWImeinpuWPkXByZXNzZW5k5omL5Yq/XG4gICAgKlxuICAgICogMy4g6Kej57uR5a6a5omA5pyJ55u45YWz5LqL5Lu2XG4gICAgKlxuICAgICogQGV2ZW50XG4gICAgKiBAcGFyYW0gIHtldmVudH0gZXZlbnRcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHRvdWNoZW5kSGFuZGxlcihldmVudCkge1xuXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhnZXN0dXJlcykubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudHMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gZ2VzdHVyZXMpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5wdXNoKGdlc3R1cmVzW3BdLmVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlyZUV2ZW50KGdldENvbW1vbkFuY2VzdG9yKGVsZW1lbnRzWzBdLCBlbGVtZW50c1sxXSksICdkdWFsdG91Y2hlbmQnLCB7XG4gICAgICAgICAgICAgICAgdG91Y2hlczogc2xpY2UuY2FsbChldmVudC50b3VjaGVzKSxcbiAgICAgICAgICAgICAgICB0b3VjaEV2ZW50OiBldmVudFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdG91Y2ggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1tpXSxcbiAgICAgICAgICAgICAgICBpZCA9IHRvdWNoLmlkZW50aWZpZXIsXG4gICAgICAgICAgICAgICAgZ2VzdHVyZSA9IGdlc3R1cmVzW2lkXTtcblxuICAgICAgICAgICAgaWYgKCFnZXN0dXJlKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChnZXN0dXJlLnByZXNzaW5nSGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChnZXN0dXJlLnByZXNzaW5nSGFuZGxlcik7XG4gICAgICAgICAgICAgICAgZ2VzdHVyZS5wcmVzc2luZ0hhbmRsZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZ2VzdHVyZS5zdGF0dXMgPT09ICd0YXBwaW5nJykge1xuICAgICAgICAgICAgICAgIGdlc3R1cmUudGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICBmaXJlRXZlbnQoZ2VzdHVyZS5lbGVtZW50LCAndGFwJywge1xuICAgICAgICAgICAgICAgICAgICB0b3VjaDogdG91Y2gsXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoRXZlbnQ6IGV2ZW50XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAobGFzdFRhcCAmJiBnZXN0dXJlLnRpbWVzdGFtcCAtIGxhc3RUYXAudGltZXN0YW1wIDwgMzAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpcmVFdmVudChnZXN0dXJlLmVsZW1lbnQsICdkb3VibGV0YXAnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaDogdG91Y2gsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaEV2ZW50OiBldmVudFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsYXN0VGFwID0gZ2VzdHVyZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGdlc3R1cmUuc3RhdHVzID09PSAncGFubmluZycpIHtcbiAgICAgICAgICAgICAgICB2YXIgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICB2YXIgZHVyYXRpb24gPSBub3cgLSBnZXN0dXJlLnN0YXJ0VGltZSxcblxuICAgICAgICAgICAgICAgIC8vIHZlbG9jaXR5WCA9ICh0b3VjaC5jbGllbnRYIC0gZ2VzdHVyZS5zdGFydFRvdWNoLmNsaWVudFgpIC8gZHVyYXRpb24sXG4gICAgICAgICAgICAgICAgLy8gdmVsb2NpdHlZID0gKHRvdWNoLmNsaWVudFkgLSBnZXN0dXJlLnN0YXJ0VG91Y2guY2xpZW50WSkgLyBkdXJhdGlvbixcbiAgICAgICAgICAgICAgICBkaXNwbGFjZW1lbnRYID0gdG91Y2guY2xpZW50WCAtIGdlc3R1cmUuc3RhcnRUb3VjaC5jbGllbnRYLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGFjZW1lbnRZID0gdG91Y2guY2xpZW50WSAtIGdlc3R1cmUuc3RhcnRUb3VjaC5jbGllbnRZO1xuXG4gICAgICAgICAgICAgICAgdmFyIHZlbG9jaXR5ID0gTWF0aC5zcXJ0KGdlc3R1cmUudmVsb2NpdHlZICogZ2VzdHVyZS52ZWxvY2l0eVkgKyBnZXN0dXJlLnZlbG9jaXR5WCAqIGdlc3R1cmUudmVsb2NpdHlYKTtcbiAgICAgICAgICAgICAgICB2YXIgaXNmbGljayA9IHZlbG9jaXR5ID4gMC41ICYmIG5vdyAtIGdlc3R1cmUubGFzdFRpbWUgPCAxMDA7XG4gICAgICAgICAgICAgICAgdmFyIGV4dHJhID0ge1xuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXG4gICAgICAgICAgICAgICAgICAgIGlzZmxpY2s6IGlzZmxpY2ssXG4gICAgICAgICAgICAgICAgICAgIHZlbG9jaXR5WDogZ2VzdHVyZS52ZWxvY2l0eVgsXG4gICAgICAgICAgICAgICAgICAgIHZlbG9jaXR5WTogZ2VzdHVyZS52ZWxvY2l0eVksXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYWNlbWVudFg6IGRpc3BsYWNlbWVudFgsXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYWNlbWVudFk6IGRpc3BsYWNlbWVudFksXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoOiB0b3VjaCxcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hlczogZXZlbnQudG91Y2hlcyxcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlZFRvdWNoZXM6IGV2ZW50LmNoYW5nZWRUb3VjaGVzLFxuICAgICAgICAgICAgICAgICAgICB0b3VjaEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgaXNWZXJ0aWNhbDogZ2VzdHVyZS5pc1ZlcnRpY2FsXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGZpcmVFdmVudChnZXN0dXJlLmVsZW1lbnQsICdwYW5lbmQnLCBleHRyYSk7XG4gICAgICAgICAgICAgICAgaWYgKGlzZmxpY2spIHtcbiAgICAgICAgICAgICAgICAgICAgZmlyZUV2ZW50KGdlc3R1cmUuZWxlbWVudCwgJ3N3aXBlJywgZXh0cmEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChnZXN0dXJlLmlzVmVydGljYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcmVFdmVudChnZXN0dXJlLmVsZW1lbnQsICd2ZXJ0aWNhbHN3aXBlJywgZXh0cmEpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlyZUV2ZW50KGdlc3R1cmUuZWxlbWVudCwgJ2hvcml6b250YWxzd2lwZScsIGV4dHJhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGdlc3R1cmUuc3RhdHVzID09PSAncHJlc3NpbmcnKSB7XG4gICAgICAgICAgICAgICAgZmlyZUV2ZW50KGdlc3R1cmUuZWxlbWVudCwgJ3ByZXNzZW5kJywge1xuICAgICAgICAgICAgICAgICAgICB0b3VjaDogdG91Y2gsXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoRXZlbnQ6IGV2ZW50XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRlbGV0ZSBnZXN0dXJlc1tpZF07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoT2JqZWN0LmtleXMoZ2VzdHVyZXMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgZG9jRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdG91Y2htb3ZlSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICAgICAgZG9jRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0b3VjaGVuZEhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIGRvY0VsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdG91Y2hjYW5jZWxIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAqIOaNleiOt3RvdWNoY2FuY2Vs5LqL5Lu2XG4gICAgKlxuICAgICogMS4g5aaC5p6c5b2T5YmN6Kem54K55pWw5Li6Mu+8jOWImeinpuWPkWR1YWx0b3VjaGVuZOaJi+WKv1xuICAgICpcbiAgICAqIDIuIOmBjeWOhuavj+S4quinpueCue+8mlxuICAgICogPiDlpoLmnpzlpITkuo5wYW5uaW5n54q25oCB77yM5YiZ6Kem5Y+RcGFuZW5k5omL5Yq/XG4gICAgKiA+IOWmguaenOWkhOS6jnByZXNzaW5n54q25oCB77yM5YiZ6Kem5Y+RcHJlc3NlbmTmiYvlir9cbiAgICAqXG4gICAgKiAzLiDop6Pnu5HlrprmiYDmnInnm7jlhbPkuovku7ZcbiAgICAqXG4gICAgKiBAZXZlbnRcbiAgICAqIEBwYXJhbSAge2V2ZW50fSBldmVudFxuICAgICovXG4gICAgZnVuY3Rpb24gdG91Y2hjYW5jZWxIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIC8vIFRPRE86IOWSjHRvdWNoZW5kSGFuZGxlcuWkp+mHj+mHjeWkje+8jOW7uuiurkRSWVxuXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhnZXN0dXJlcykubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudHMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gZ2VzdHVyZXMpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5wdXNoKGdlc3R1cmVzW3BdLmVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlyZUV2ZW50KGdldENvbW1vbkFuY2VzdG9yKGVsZW1lbnRzWzBdLCBlbGVtZW50c1sxXSksICdkdWFsdG91Y2hlbmQnLCB7XG4gICAgICAgICAgICAgICAgdG91Y2hlczogc2xpY2UuY2FsbChldmVudC50b3VjaGVzKSxcbiAgICAgICAgICAgICAgICB0b3VjaEV2ZW50OiBldmVudFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdG91Y2ggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1tpXSxcbiAgICAgICAgICAgICAgICBpZCA9IHRvdWNoLmlkZW50aWZpZXIsXG4gICAgICAgICAgICAgICAgZ2VzdHVyZSA9IGdlc3R1cmVzW2lkXTtcblxuICAgICAgICAgICAgaWYgKCFnZXN0dXJlKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChnZXN0dXJlLnByZXNzaW5nSGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChnZXN0dXJlLnByZXNzaW5nSGFuZGxlcik7XG4gICAgICAgICAgICAgICAgZ2VzdHVyZS5wcmVzc2luZ0hhbmRsZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZ2VzdHVyZS5zdGF0dXMgPT09ICdwYW5uaW5nJykge1xuICAgICAgICAgICAgICAgIGZpcmVFdmVudChnZXN0dXJlLmVsZW1lbnQsICdwYW5lbmQnLCB7XG4gICAgICAgICAgICAgICAgICAgIHRvdWNoOiB0b3VjaCxcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hlczogZXZlbnQudG91Y2hlcyxcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlZFRvdWNoZXM6IGV2ZW50LmNoYW5nZWRUb3VjaGVzLFxuICAgICAgICAgICAgICAgICAgICB0b3VjaEV2ZW50OiBldmVudFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGdlc3R1cmUuc3RhdHVzID09PSAncHJlc3NpbmcnKSB7XG4gICAgICAgICAgICAgICAgZmlyZUV2ZW50KGdlc3R1cmUuZWxlbWVudCwgJ3ByZXNzZW5kJywge1xuICAgICAgICAgICAgICAgICAgICB0b3VjaDogdG91Y2gsXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoRXZlbnQ6IGV2ZW50XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWxldGUgZ2VzdHVyZXNbaWRdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGdlc3R1cmVzKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGRvY0VsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRvdWNobW92ZUhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIGRvY0VsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdG91Y2hlbmRIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgICAgICBkb2NFbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRvdWNoY2FuY2VsSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZG9jRWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRvdWNoc3RhcnRIYW5kbGVyLCBmYWxzZSk7XG59KSh3aW5kb3cpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4xLjBAZ2VzdHVyZS1qcy9zcmMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDEwNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJ2V2ZW50LWVtaXR0ZXInO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnQge31cbkV2ZW50RW1pdHRlcihFdmVudC5wcm90b3R5cGUpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ldmVudC5qcyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGQgICAgICAgID0gcmVxdWlyZSgnZCcpXG4gICwgY2FsbGFibGUgPSByZXF1aXJlKCdlczUtZXh0L29iamVjdC92YWxpZC1jYWxsYWJsZScpXG5cbiAgLCBhcHBseSA9IEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseSwgY2FsbCA9IEZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsXG4gICwgY3JlYXRlID0gT2JqZWN0LmNyZWF0ZSwgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHlcbiAgLCBkZWZpbmVQcm9wZXJ0aWVzID0gT2JqZWN0LmRlZmluZVByb3BlcnRpZXNcbiAgLCBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHlcbiAgLCBkZXNjcmlwdG9yID0geyBjb25maWd1cmFibGU6IHRydWUsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSB9XG5cbiAgLCBvbiwgb25jZSwgb2ZmLCBlbWl0LCBtZXRob2RzLCBkZXNjcmlwdG9ycywgYmFzZTtcblxub24gPSBmdW5jdGlvbiAodHlwZSwgbGlzdGVuZXIpIHtcblx0dmFyIGRhdGE7XG5cblx0Y2FsbGFibGUobGlzdGVuZXIpO1xuXG5cdGlmICghaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLCAnX19lZV9fJykpIHtcblx0XHRkYXRhID0gZGVzY3JpcHRvci52YWx1ZSA9IGNyZWF0ZShudWxsKTtcblx0XHRkZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX19lZV9fJywgZGVzY3JpcHRvcik7XG5cdFx0ZGVzY3JpcHRvci52YWx1ZSA9IG51bGw7XG5cdH0gZWxzZSB7XG5cdFx0ZGF0YSA9IHRoaXMuX19lZV9fO1xuXHR9XG5cdGlmICghZGF0YVt0eXBlXSkgZGF0YVt0eXBlXSA9IGxpc3RlbmVyO1xuXHRlbHNlIGlmICh0eXBlb2YgZGF0YVt0eXBlXSA9PT0gJ29iamVjdCcpIGRhdGFbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG5cdGVsc2UgZGF0YVt0eXBlXSA9IFtkYXRhW3R5cGVdLCBsaXN0ZW5lcl07XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG5vbmNlID0gZnVuY3Rpb24gKHR5cGUsIGxpc3RlbmVyKSB7XG5cdHZhciBvbmNlLCBzZWxmO1xuXG5cdGNhbGxhYmxlKGxpc3RlbmVyKTtcblx0c2VsZiA9IHRoaXM7XG5cdG9uLmNhbGwodGhpcywgdHlwZSwgb25jZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRvZmYuY2FsbChzZWxmLCB0eXBlLCBvbmNlKTtcblx0XHRhcHBseS5jYWxsKGxpc3RlbmVyLCB0aGlzLCBhcmd1bWVudHMpO1xuXHR9KTtcblxuXHRvbmNlLl9fZWVPbmNlTGlzdGVuZXJfXyA9IGxpc3RlbmVyO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbm9mZiA9IGZ1bmN0aW9uICh0eXBlLCBsaXN0ZW5lcikge1xuXHR2YXIgZGF0YSwgbGlzdGVuZXJzLCBjYW5kaWRhdGUsIGk7XG5cblx0Y2FsbGFibGUobGlzdGVuZXIpO1xuXG5cdGlmICghaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLCAnX19lZV9fJykpIHJldHVybiB0aGlzO1xuXHRkYXRhID0gdGhpcy5fX2VlX187XG5cdGlmICghZGF0YVt0eXBlXSkgcmV0dXJuIHRoaXM7XG5cdGxpc3RlbmVycyA9IGRhdGFbdHlwZV07XG5cblx0aWYgKHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdvYmplY3QnKSB7XG5cdFx0Zm9yIChpID0gMDsgKGNhbmRpZGF0ZSA9IGxpc3RlbmVyc1tpXSk7ICsraSkge1xuXHRcdFx0aWYgKChjYW5kaWRhdGUgPT09IGxpc3RlbmVyKSB8fFxuXHRcdFx0XHRcdChjYW5kaWRhdGUuX19lZU9uY2VMaXN0ZW5lcl9fID09PSBsaXN0ZW5lcikpIHtcblx0XHRcdFx0aWYgKGxpc3RlbmVycy5sZW5ndGggPT09IDIpIGRhdGFbdHlwZV0gPSBsaXN0ZW5lcnNbaSA/IDAgOiAxXTtcblx0XHRcdFx0ZWxzZSBsaXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRpZiAoKGxpc3RlbmVycyA9PT0gbGlzdGVuZXIpIHx8XG5cdFx0XHRcdChsaXN0ZW5lcnMuX19lZU9uY2VMaXN0ZW5lcl9fID09PSBsaXN0ZW5lcikpIHtcblx0XHRcdGRlbGV0ZSBkYXRhW3R5cGVdO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0aGlzO1xufTtcblxuZW1pdCA9IGZ1bmN0aW9uICh0eXBlKSB7XG5cdHZhciBpLCBsLCBsaXN0ZW5lciwgbGlzdGVuZXJzLCBhcmdzO1xuXG5cdGlmICghaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLCAnX19lZV9fJykpIHJldHVybjtcblx0bGlzdGVuZXJzID0gdGhpcy5fX2VlX19bdHlwZV07XG5cdGlmICghbGlzdGVuZXJzKSByZXR1cm47XG5cblx0aWYgKHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdvYmplY3QnKSB7XG5cdFx0bCA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cdFx0YXJncyA9IG5ldyBBcnJheShsIC0gMSk7XG5cdFx0Zm9yIChpID0gMTsgaSA8IGw7ICsraSkgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG5cblx0XHRsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuc2xpY2UoKTtcblx0XHRmb3IgKGkgPSAwOyAobGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV0pOyArK2kpIHtcblx0XHRcdGFwcGx5LmNhbGwobGlzdGVuZXIsIHRoaXMsIGFyZ3MpO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcblx0XHRjYXNlIDE6XG5cdFx0XHRjYWxsLmNhbGwobGlzdGVuZXJzLCB0aGlzKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMjpcblx0XHRcdGNhbGwuY2FsbChsaXN0ZW5lcnMsIHRoaXMsIGFyZ3VtZW50c1sxXSk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDM6XG5cdFx0XHRjYWxsLmNhbGwobGlzdGVuZXJzLCB0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSk7XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0bCA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cdFx0XHRhcmdzID0gbmV3IEFycmF5KGwgLSAxKTtcblx0XHRcdGZvciAoaSA9IDE7IGkgPCBsOyArK2kpIHtcblx0XHRcdFx0YXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG5cdFx0XHR9XG5cdFx0XHRhcHBseS5jYWxsKGxpc3RlbmVycywgdGhpcywgYXJncyk7XG5cdFx0fVxuXHR9XG59O1xuXG5tZXRob2RzID0ge1xuXHRvbjogb24sXG5cdG9uY2U6IG9uY2UsXG5cdG9mZjogb2ZmLFxuXHRlbWl0OiBlbWl0XG59O1xuXG5kZXNjcmlwdG9ycyA9IHtcblx0b246IGQob24pLFxuXHRvbmNlOiBkKG9uY2UpLFxuXHRvZmY6IGQob2ZmKSxcblx0ZW1pdDogZChlbWl0KVxufTtcblxuYmFzZSA9IGRlZmluZVByb3BlcnRpZXMoe30sIGRlc2NyaXB0b3JzKTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZnVuY3Rpb24gKG8pIHtcblx0cmV0dXJuIChvID09IG51bGwpID8gY3JlYXRlKGJhc2UpIDogZGVmaW5lUHJvcGVydGllcyhPYmplY3QobyksIGRlc2NyaXB0b3JzKTtcbn07XG5leHBvcnRzLm1ldGhvZHMgPSBtZXRob2RzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjMuNEBldmVudC1lbWl0dGVyL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxMDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbnZhciBhc3NpZ24gICAgICAgID0gcmVxdWlyZSgnZXM1LWV4dC9vYmplY3QvYXNzaWduJylcbiAgLCBub3JtYWxpemVPcHRzID0gcmVxdWlyZSgnZXM1LWV4dC9vYmplY3Qvbm9ybWFsaXplLW9wdGlvbnMnKVxuICAsIGlzQ2FsbGFibGUgICAgPSByZXF1aXJlKCdlczUtZXh0L29iamVjdC9pcy1jYWxsYWJsZScpXG4gICwgY29udGFpbnMgICAgICA9IHJlcXVpcmUoJ2VzNS1leHQvc3RyaW5nLyMvY29udGFpbnMnKVxuXG4gICwgZDtcblxuZCA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGRzY3IsIHZhbHVlLyosIG9wdGlvbnMqLykge1xuXHR2YXIgYywgZSwgdywgb3B0aW9ucywgZGVzYztcblx0aWYgKChhcmd1bWVudHMubGVuZ3RoIDwgMikgfHwgKHR5cGVvZiBkc2NyICE9PSAnc3RyaW5nJykpIHtcblx0XHRvcHRpb25zID0gdmFsdWU7XG5cdFx0dmFsdWUgPSBkc2NyO1xuXHRcdGRzY3IgPSBudWxsO1xuXHR9IGVsc2Uge1xuXHRcdG9wdGlvbnMgPSBhcmd1bWVudHNbMl07XG5cdH1cblx0aWYgKGRzY3IgPT0gbnVsbCkge1xuXHRcdGMgPSB3ID0gdHJ1ZTtcblx0XHRlID0gZmFsc2U7XG5cdH0gZWxzZSB7XG5cdFx0YyA9IGNvbnRhaW5zLmNhbGwoZHNjciwgJ2MnKTtcblx0XHRlID0gY29udGFpbnMuY2FsbChkc2NyLCAnZScpO1xuXHRcdHcgPSBjb250YWlucy5jYWxsKGRzY3IsICd3Jyk7XG5cdH1cblxuXHRkZXNjID0geyB2YWx1ZTogdmFsdWUsIGNvbmZpZ3VyYWJsZTogYywgZW51bWVyYWJsZTogZSwgd3JpdGFibGU6IHcgfTtcblx0cmV0dXJuICFvcHRpb25zID8gZGVzYyA6IGFzc2lnbihub3JtYWxpemVPcHRzKG9wdGlvbnMpLCBkZXNjKTtcbn07XG5cbmQuZ3MgPSBmdW5jdGlvbiAoZHNjciwgZ2V0LCBzZXQvKiwgb3B0aW9ucyovKSB7XG5cdHZhciBjLCBlLCBvcHRpb25zLCBkZXNjO1xuXHRpZiAodHlwZW9mIGRzY3IgIT09ICdzdHJpbmcnKSB7XG5cdFx0b3B0aW9ucyA9IHNldDtcblx0XHRzZXQgPSBnZXQ7XG5cdFx0Z2V0ID0gZHNjcjtcblx0XHRkc2NyID0gbnVsbDtcblx0fSBlbHNlIHtcblx0XHRvcHRpb25zID0gYXJndW1lbnRzWzNdO1xuXHR9XG5cdGlmIChnZXQgPT0gbnVsbCkge1xuXHRcdGdldCA9IHVuZGVmaW5lZDtcblx0fSBlbHNlIGlmICghaXNDYWxsYWJsZShnZXQpKSB7XG5cdFx0b3B0aW9ucyA9IGdldDtcblx0XHRnZXQgPSBzZXQgPSB1bmRlZmluZWQ7XG5cdH0gZWxzZSBpZiAoc2V0ID09IG51bGwpIHtcblx0XHRzZXQgPSB1bmRlZmluZWQ7XG5cdH0gZWxzZSBpZiAoIWlzQ2FsbGFibGUoc2V0KSkge1xuXHRcdG9wdGlvbnMgPSBzZXQ7XG5cdFx0c2V0ID0gdW5kZWZpbmVkO1xuXHR9XG5cdGlmIChkc2NyID09IG51bGwpIHtcblx0XHRjID0gdHJ1ZTtcblx0XHRlID0gZmFsc2U7XG5cdH0gZWxzZSB7XG5cdFx0YyA9IGNvbnRhaW5zLmNhbGwoZHNjciwgJ2MnKTtcblx0XHRlID0gY29udGFpbnMuY2FsbChkc2NyLCAnZScpO1xuXHR9XG5cblx0ZGVzYyA9IHsgZ2V0OiBnZXQsIHNldDogc2V0LCBjb25maWd1cmFibGU6IGMsIGVudW1lcmFibGU6IGUgfTtcblx0cmV0dXJuICFvcHRpb25zID8gZGVzYyA6IGFzc2lnbihub3JtYWxpemVPcHRzKG9wdGlvbnMpLCBkZXNjKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMS4xQGQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDEwN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2lzLWltcGxlbWVudGVkJykoKVxuXHQ/IE9iamVjdC5hc3NpZ25cblx0OiByZXF1aXJlKCcuL3NoaW0nKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4xMC4xMkBlczUtZXh0L29iamVjdC9hc3NpZ24vaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDEwOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBhc3NpZ24gPSBPYmplY3QuYXNzaWduLCBvYmo7XG5cdGlmICh0eXBlb2YgYXNzaWduICE9PSAnZnVuY3Rpb24nKSByZXR1cm4gZmFsc2U7XG5cdG9iaiA9IHsgZm9vOiAncmF6JyB9O1xuXHRhc3NpZ24ob2JqLCB7IGJhcjogJ2R3YScgfSwgeyB0cnp5OiAndHJ6eScgfSk7XG5cdHJldHVybiAob2JqLmZvbyArIG9iai5iYXIgKyBvYmoudHJ6eSkgPT09ICdyYXpkd2F0cnp5Jztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3QvYXNzaWduL2lzLWltcGxlbWVudGVkLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbnZhciBrZXlzICA9IHJlcXVpcmUoJy4uL2tleXMnKVxuICAsIHZhbHVlID0gcmVxdWlyZSgnLi4vdmFsaWQtdmFsdWUnKVxuXG4gICwgbWF4ID0gTWF0aC5tYXg7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGRlc3QsIHNyYy8qLCDigKZzcmNuKi8pIHtcblx0dmFyIGVycm9yLCBpLCBsID0gbWF4KGFyZ3VtZW50cy5sZW5ndGgsIDIpLCBhc3NpZ247XG5cdGRlc3QgPSBPYmplY3QodmFsdWUoZGVzdCkpO1xuXHRhc3NpZ24gPSBmdW5jdGlvbiAoa2V5KSB7XG5cdFx0dHJ5IHsgZGVzdFtrZXldID0gc3JjW2tleV07IH0gY2F0Y2ggKGUpIHtcblx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZTtcblx0XHR9XG5cdH07XG5cdGZvciAoaSA9IDE7IGkgPCBsOyArK2kpIHtcblx0XHRzcmMgPSBhcmd1bWVudHNbaV07XG5cdFx0a2V5cyhzcmMpLmZvckVhY2goYXNzaWduKTtcblx0fVxuXHRpZiAoZXJyb3IgIT09IHVuZGVmaW5lZCkgdGhyb3cgZXJyb3I7XG5cdHJldHVybiBkZXN0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4xMC4xMkBlczUtZXh0L29iamVjdC9hc3NpZ24vc2hpbS5qc1xuLy8gbW9kdWxlIGlkID0gMTEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vaXMtaW1wbGVtZW50ZWQnKSgpXG5cdD8gT2JqZWN0LmtleXNcblx0OiByZXF1aXJlKCcuL3NoaW0nKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4xMC4xMkBlczUtZXh0L29iamVjdC9rZXlzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXHR0cnkge1xuXHRcdE9iamVjdC5rZXlzKCdwcmltaXRpdmUnKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZSkgeyByZXR1cm4gZmFsc2U7IH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3Qva2V5cy9pcy1pbXBsZW1lbnRlZC5qc1xuLy8gbW9kdWxlIGlkID0gMTEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIga2V5cyA9IE9iamVjdC5rZXlzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QpIHtcblx0cmV0dXJuIGtleXMob2JqZWN0ID09IG51bGwgPyBvYmplY3QgOiBPYmplY3Qob2JqZWN0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjEwLjEyQGVzNS1leHQvb2JqZWN0L2tleXMvc2hpbS5qc1xuLy8gbW9kdWxlIGlkID0gMTEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRpZiAodmFsdWUgPT0gbnVsbCkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgbnVsbCBvciB1bmRlZmluZWRcIik7XG5cdHJldHVybiB2YWx1ZTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3QvdmFsaWQtdmFsdWUuanNcbi8vIG1vZHVsZSBpZCA9IDExNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxudmFyIGZvckVhY2ggPSBBcnJheS5wcm90b3R5cGUuZm9yRWFjaCwgY3JlYXRlID0gT2JqZWN0LmNyZWF0ZTtcblxudmFyIHByb2Nlc3MgPSBmdW5jdGlvbiAoc3JjLCBvYmopIHtcblx0dmFyIGtleTtcblx0Zm9yIChrZXkgaW4gc3JjKSBvYmpba2V5XSA9IHNyY1trZXldO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3B0aW9ucy8qLCDigKZvcHRpb25zKi8pIHtcblx0dmFyIHJlc3VsdCA9IGNyZWF0ZShudWxsKTtcblx0Zm9yRWFjaC5jYWxsKGFyZ3VtZW50cywgZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0XHRpZiAob3B0aW9ucyA9PSBudWxsKSByZXR1cm47XG5cdFx0cHJvY2VzcyhPYmplY3Qob3B0aW9ucyksIHJlc3VsdCk7XG5cdH0pO1xuXHRyZXR1cm4gcmVzdWx0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4xMC4xMkBlczUtZXh0L29iamVjdC9ub3JtYWxpemUtb3B0aW9ucy5qc1xuLy8gbW9kdWxlIGlkID0gMTE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gRGVwcmVjYXRlZFxuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJzsgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4xMC4xMkBlczUtZXh0L29iamVjdC9pcy1jYWxsYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gMTE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vaXMtaW1wbGVtZW50ZWQnKSgpXG5cdD8gU3RyaW5nLnByb3RvdHlwZS5jb250YWluc1xuXHQ6IHJlcXVpcmUoJy4vc2hpbScpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjEwLjEyQGVzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDExN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxudmFyIHN0ciA9ICdyYXpkd2F0cnp5JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cdGlmICh0eXBlb2Ygc3RyLmNvbnRhaW5zICE9PSAnZnVuY3Rpb24nKSByZXR1cm4gZmFsc2U7XG5cdHJldHVybiAoKHN0ci5jb250YWlucygnZHdhJykgPT09IHRydWUpICYmIChzdHIuY29udGFpbnMoJ2ZvbycpID09PSBmYWxzZSkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4xMC4xMkBlczUtZXh0L3N0cmluZy8jL2NvbnRhaW5zL2lzLWltcGxlbWVudGVkLmpzXG4vLyBtb2R1bGUgaWQgPSAxMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbnZhciBpbmRleE9mID0gU3RyaW5nLnByb3RvdHlwZS5pbmRleE9mO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzZWFyY2hTdHJpbmcvKiwgcG9zaXRpb24qLykge1xuXHRyZXR1cm4gaW5kZXhPZi5jYWxsKHRoaXMsIHNlYXJjaFN0cmluZywgYXJndW1lbnRzWzFdKSA+IC0xO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4xMC4xMkBlczUtZXh0L3N0cmluZy8jL2NvbnRhaW5zL3NoaW0uanNcbi8vIG1vZHVsZSBpZCA9IDExOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4pIHtcblx0aWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykgdGhyb3cgbmV3IFR5cGVFcnJvcihmbiArIFwiIGlzIG5vdCBhIGZ1bmN0aW9uXCIpO1xuXHRyZXR1cm4gZm47XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjEwLjEyQGVzNS1leHQvb2JqZWN0L3ZhbGlkLWNhbGxhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJpbXBvcnQge29zfSBmcm9tICdhbWZlLWVudic7XG5pbXBvcnQgJy4vc3RhZ2UuY3NzJztcbmltcG9ydCB7XG4gICAgd2luLFxuICAgIGRvYyxcbiAgICBQcm9taXNlLFxuICAgIHF1ZXJ5LFxuICAgIHF1ZXJ5QWxsLFxuICAgIGdldFJlY3Rcbn0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7XG4gICAgQ2FudmFzUmVuZGVyXG59IGZyb20gJy4vY2FudmFzJztcbmltcG9ydCBzbGljZUNvbmZpZyBmcm9tICcuL3NsaWNlQ29uZmlnJztcblxuY29uc3Qgc2xpY2VXaWR0aCA9IDc1MDtcbmNvbnN0IHNsaWNlSGVpZ2h0ID0gMTMzNDtcbmNvbnN0IGhTbGljZSA9IDk7XG5jb25zdCB2U2xpY2UgPSAxNDtcbmNvbnN0IHdpZHRoID0gc2xpY2VXaWR0aCAqIGhTbGljZTtcbmNvbnN0IGhlaWdodCA9IHNsaWNlSGVpZ2h0ICogdlNsaWNlO1xuY29uc3QgZHByID0gb3MuaXNJT1MgPyAyIDogMTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhZ2UgZXh0ZW5kcyBDYW52YXNSZW5kZXJ7XG4gICAgY29uc3RydWN0b3Iodmlld3BvcnQpIHtcbiAgICAgICAgY29uc3Qgc3RhZ2VFbCA9IHF1ZXJ5KHZpZXdwb3J0LCAnI3N0YWdlJyk7XG4gICAgICAgIGxldCB7d2lkdGg6IHZ3LCBoZWlnaHQ6IHZofSA9IGdldFJlY3Qodmlld3BvcnQpO1xuXG4gICAgICAgIHZ3ICo9IGRwcjtcbiAgICAgICAgdmggKj0gZHByO1xuICAgICAgICBzdXBlcihzdGFnZUVsLCB2dywgdmgpO1xuXG4gICAgICAgIHRoaXMuc3RhZ2VFbCA9IHN0YWdlRWw7XG4gICAgICAgIHRoaXMudncgPSB2dztcbiAgICAgICAgdGhpcy52aCA9IHZoO1xuICAgICAgICB0aGlzLndpZHRoID0gdncgKiBoU2xpY2U7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdncgLyAod2lkdGggLyBoU2xpY2UpICogaGVpZ2h0O1xuICAgICAgICB0aGlzLmhTbGljZSA9IGhTbGljZTtcbiAgICAgICAgdGhpcy52U2xpY2UgPSB2U2xpY2U7XG4gICAgICAgIHRoaXMuc2xpY2VXaWR0aCA9IHRoaXMud2lkdGggLyBoU2xpY2U7XG4gICAgICAgIHRoaXMuc2xpY2VIZWlnaHQgPSB0aGlzLmhlaWdodCAvIHZTbGljZTtcbiAgICAgICAgdGhpcy5zbGljZXMgPSBbXTtcbiAgICAgICAgdGhpcy5kcHIgPSBkcHI7XG5cblxuICAgICAgICBmb3IgKGxldCB2ID0gMDsgdiA8IHRoaXMudlNsaWNlOyB2KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGggPSAwOyBoIDwgdGhpcy5oU2xpY2U7IGgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdiAqIHRoaXMuaFNsaWNlICsgaDtcbiAgICAgICAgICAgICAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiB2ICogdGhpcy5oU2xpY2UgKyBoLFxuICAgICAgICAgICAgICAgICAgICBoLFxuICAgICAgICAgICAgICAgICAgICB2XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAoc2xpY2VDb25maWdbU3RyaW5nKGluZGV4KV0pIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gc2xpY2VDb25maWdbU3RyaW5nKGluZGV4KV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ1trZXldID0gc2xpY2VDb25maWdbU3RyaW5nKGluZGV4KV1ba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuc2xpY2VzLnB1c2goY29uZmlnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB0b3RhbEFtb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2xpY2VzLmxlbmd0aDtcbiAgICB9XG5cbiAgICBnZXQgc3BlY2lhbEFtb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2xpY2VzLmZpbHRlcihzbGljZSA9PlxuICAgICAgICAgICAgc2xpY2UudHlwZSA9PT0gM1xuICAgICAgICApLmxlbmd0aDtcbiAgICB9XG5cbiAgICBnZXQgc3BlY2lhbEZvdW5kKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zbGljZXMuZmlsdGVyKHNsaWNlID0+XG4gICAgICAgICAgICBzbGljZS50eXBlID09PSAzICYmIHNsaWNlLmZvdW5kXG4gICAgICAgICkubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldCBmb2N1c2VkQW1vdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zbGljZXMuZmlsdGVyKHNsaWNlID0+XG4gICAgICAgICAgICBzbGljZS5mb2N1c2VkXG4gICAgICAgICkubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldCBob3ZlcmVkQW1vdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zbGljZXMuZmlsdGVyKHNsaWNlID0+XG4gICAgICAgICAgICBzbGljZS5ob3ZlcmVkXG4gICAgICAgICkubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldFNsaWNlKHNjcm9sbFgsIHNjcm9sbFkpIHtcbiAgICAgICAgY29uc3QgaCA9IHBhcnNlSW50KHNjcm9sbFggLyB0aGlzLnNsaWNlV2lkdGgpO1xuICAgICAgICBjb25zdCB2ID0gcGFyc2VJbnQoc2Nyb2xsWSAvIHRoaXMuc2xpY2VIZWlnaHQpO1xuICAgICAgICByZXR1cm4gdGhpcy5zbGljZXNbdiAqIHRoaXMuaFNsaWNlICsgaF07XG4gICAgfVxuXG4gICAgZ2V0SG92ZXJTbGljZShzY3JvbGxYLCBzY3JvbGxZKSB7XG4gICAgICAgIGNvbnN0IGhvdmVyID0gdGhpcy5nZXRTbGljZShzY3JvbGxYLCBzY3JvbGxZKTtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgaCxcbiAgICAgICAgICAgIHYsXG4gICAgICAgICAgICBpbmRleFxuICAgICAgICB9ID0gaG92ZXI7XG4gICAgICAgIGNvbnN0IHJlbGF0ZWQgPSBbXTtcblxuICAgICAgICBpZiAoaCA8IHRoaXMuaFNsaWNlIC0gMSkge1xuICAgICAgICAgICAgcmVsYXRlZC5wdXNoKHRoaXMuc2xpY2VzW2luZGV4ICsgMV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHYgPCB0aGlzLnZTbGljZSAtIDEpIHtcbiAgICAgICAgICAgIHJlbGF0ZWQucHVzaCh0aGlzLnNsaWNlc1tpbmRleCArIHRoaXMuaFNsaWNlXSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaCA8IHRoaXMuaFNsaWNlIC0gMVxuICAgICAgICAgICAgJiYgdiA8IHRoaXMudlNsaWNlIC0gMSkge1xuICAgICAgICAgICAgcmVsYXRlZC5wdXNoKHRoaXMuc2xpY2VzW2luZGV4ICsgdGhpcy5oU2xpY2UgKyAxXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgaG92ZXIsXG4gICAgICAgICAgICAuLi5yZWxhdGVkXG4gICAgICAgIF0ubWFwKHNsaWNlID0+IHtcbiAgICAgICAgICAgIHNsaWNlLmhvdmVyZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHNsaWNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRGb2N1c1NsaWNlKGN4LCBjeSkge1xuICAgICAgICBjb25zdCBoID0gcGFyc2VJbnQoY3ggLyB0aGlzLnNsaWNlV2lkdGgpO1xuICAgICAgICBjb25zdCB2ID0gcGFyc2VJbnQoY3kgLyB0aGlzLnNsaWNlSGVpZ2h0KTtcbiAgICAgICAgY29uc3QgZHggPSBwYXJzZUludChjeCAlIHRoaXMuc2xpY2VXaWR0aCk7XG4gICAgICAgIGNvbnN0IGR5ID0gcGFyc2VJbnQoY3kgJSB0aGlzLnNsaWNlSGVpZ2h0KTtcblxuICAgICAgICBjb25zdCByYXRpbyA9IDAuODtcbiAgICAgICAgbGV0IHNsaWNlO1xuICAgICAgICBpZiAoZHggPiB0aGlzLnNsaWNlV2lkdGggKiAoMSAtIHJhdGlvKSAvIDIgJiYgZHggPCB0aGlzLnNsaWNlV2lkdGggKiAoMSAtICgxIC0gcmF0aW8pIC8gMilcbiAgICAgICAgICAgICAgICAmJiBkeSA+IHRoaXMuc2xpY2VIZWlnaHQgKiAoMSAtIHJhdGlvKSAvIDIgJiYgZHkgPCB0aGlzLnNsaWNlSGVpZ2h0ICogKDEgLSAoMSAtIHJhdGlvKSAvIDIpKSB7XG4gICAgICAgICAgICBzbGljZSA9IHRoaXMuc2xpY2VzW3YgKiB0aGlzLmhTbGljZSArIGhdO1xuICAgICAgICAgICAgc2xpY2UuZm9jdXNlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2xpY2U7XG4gICAgfVxuXG4gICAgcmVhZHkoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0YWdlRWwuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3N0YWdlLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlZlcnNpb24gPSBleHBvcnRzLnBhcmFtcyA9IGV4cG9ydHMudGhpcmRhcHAgPSBleHBvcnRzLmFsaWFwcCA9IGV4cG9ydHMub3MgPSBleHBvcnRzLmJyb3dzZXIgPSB1bmRlZmluZWQ7XG5cbnZhciBfYWxpYXBwID0gcmVxdWlyZSgnLi9hbGlhcHAnKTtcblxudmFyIF9hbGlhcHAyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYWxpYXBwKTtcblxudmFyIF9icm93c2VyID0gcmVxdWlyZSgnLi9icm93c2VyJyk7XG5cbnZhciBfYnJvd3NlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9icm93c2VyKTtcblxudmFyIF9vcyA9IHJlcXVpcmUoJy4vb3MnKTtcblxudmFyIF9vczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9vcyk7XG5cbnZhciBfdGhpcmRhcHAgPSByZXF1aXJlKCcuL3RoaXJkYXBwJyk7XG5cbnZhciBfdGhpcmRhcHAyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdGhpcmRhcHApO1xuXG52YXIgX3BhcmFtcyA9IHJlcXVpcmUoJy4vcGFyYW1zJyk7XG5cbnZhciBfcGFyYW1zMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3BhcmFtcyk7XG5cbnZhciBfdmVyc2lvbiA9IHJlcXVpcmUoJy4vdmVyc2lvbicpO1xuXG52YXIgX3ZlcnNpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdmVyc2lvbik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuYnJvd3NlciA9IF9icm93c2VyMi5kZWZhdWx0O1xuZXhwb3J0cy5vcyA9IF9vczIuZGVmYXVsdDtcbmV4cG9ydHMuYWxpYXBwID0gX2FsaWFwcDIuZGVmYXVsdDtcbmV4cG9ydHMudGhpcmRhcHAgPSBfdGhpcmRhcHAyLmRlZmF1bHQ7XG5leHBvcnRzLnBhcmFtcyA9IF9wYXJhbXMyLmRlZmF1bHQ7XG5leHBvcnRzLlZlcnNpb24gPSBfdmVyc2lvbjIuZGVmYXVsdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuMC4wQGFtZmUtZW52L3NyYy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdmVyc2lvbiA9IHJlcXVpcmUoJy4vdmVyc2lvbicpO1xuXG52YXIgX3ZlcnNpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdmVyc2lvbik7XG5cbnZhciBfb3MgPSByZXF1aXJlKCcuL29zJyk7XG5cbnZhciBfb3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfb3MpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgdWEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcbnZhciBhbGlhcHAgPSBmYWxzZTtcblxudmFyIHdpbmR2YW5lO1xudmFyIG1hdGNoZWQ7XG52YXIgYXBwbmFtZSA9ICcnO1xudmFyIHBsYXRmb3JtID0gJyc7XG52YXIgdmVyc2lvbiA9ICcnO1xuXG5pZiAobWF0Y2hlZCA9IHVhLm1hdGNoKC9XaW5kVmFuZVtcXC9cXHNdKFtcXGRcXC5cXF9dKykvaSkpIHtcbiAgICB3aW5kdmFuZSA9IG1hdGNoZWRbMV07XG59XG5cbmlmIChtYXRjaGVkID0gdWEubWF0Y2goL0FsaUFwcFxcKChbQS1aXFwtXSspXFwvKFtcXGRcXC5dKylcXCkvaSkpIHtcbiAgICBhbGlhcHAgPSB0cnVlO1xuICAgIGFwcG5hbWUgPSBtYXRjaGVkWzFdO1xuICAgIHZlcnNpb24gPSBtYXRjaGVkWzJdO1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKGFwcG5hbWUuaW5kZXhPZignLVBEJykgPiAwKSB7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICBpZiAoX29zMi5kZWZhdWx0LmlzSU9TKSB7XG4gICAgICAgICAgICBwbGF0Zm9ybSA9ICdpUGFkJztcbiAgICAgICAgfSBlbHNlIGlmIChfb3MyLmRlZmF1bHQuaXNBbmRyb2lkKSB7XG4gICAgICAgICAgICBwbGF0Zm9ybSA9ICdBbmRyb2lkUGFkJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBsYXRmb3JtID0gX29zMi5kZWZhdWx0Lm5hbWU7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBwbGF0Zm9ybSA9IF9vczIuZGVmYXVsdC5uYW1lO1xuICAgIH1cbn1cblxuLy8g5YW85a655omL5reY55qE5LiA5LiqYnVn77yM5Zyod2Vidmlld+WIneWni+WMluW8guW4uOaXtu+8jOWcqHVh5Lit5Y+q5YyF5ZCrVEJJT1PlrZfmoLfvvIzkuZ/orqTkuLrmmK/miYvmt5h3ZWJ2aWV344CCXG4vKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbmlmICghYXBwbmFtZSAmJiB1YS5pbmRleE9mKCdUQklPUycpID4gMCkge1xuICAgIGFwcG5hbWUgPSAnVEInO1xufVxuXG4vLyDliKTmlq1wb3BsYXllclxuLy8gcG9wbGF5ZXLnm7jlhbPkv6Hmga/vvIzlnKhwb3BsYXllcuS8muacieivpeWtl+aute+8jOW9ouWmgiB3aW5kb3cuX3VhX3BvcExheWVyID0gJ1BvcExheWVyLzEuMy40J1xuLy8gcG9wbGF5ZXLkv6Hmga/kuI3lnKh1YeS4reaYr+WboOS4uuWcqElPU+S4i++8jOS/ruaUuXBvcGxheWVy5bGC55qEdWHkvJrlr7zoh7TmiYDmnIl3ZWJ2aWV355qEdWHmlLnlj5jvvIzmiYDku6Xlj6rog73lhpnlnKjlhajlsYDlj5jph4/kuK1cbnZhciBwb3BsYXllckluZm8gPSB3aW5kb3cuX3VhX3BvcExheWVyIHx8ICcnO1xudmFyIHBvcGxheWVyID0gZmFsc2U7XG52YXIgcG9wbGF5ZXJWZXJzaW9uID0gJyc7XG5pZiAocG9wbGF5ZXJJbmZvICYmIChtYXRjaGVkID0gcG9wbGF5ZXJJbmZvLm1hdGNoKC9Qb3BMYXllclxcLyhbXFxkXFwuXSspL2kpKSkge1xuICAgIHBvcGxheWVyID0gdHJ1ZTtcbiAgICBwb3BsYXllclZlcnNpb24gPSBtYXRjaGVkWzFdO1xufVxuXG5pZiAoYWxpYXBwKSB7XG4gICAgYWxpYXBwID0ge1xuICAgICAgICB3aW5kdmFuZTogbmV3IF92ZXJzaW9uMi5kZWZhdWx0KHdpbmR2YW5lIHx8ICcwLjAuMCcpLFxuICAgICAgICBhcHBuYW1lOiBhcHBuYW1lIHx8ICd1bmtvd24nLFxuICAgICAgICB2ZXJzaW9uOiBuZXcgX3ZlcnNpb24yLmRlZmF1bHQodmVyc2lvbiB8fCAnMC4wLjAnKSxcbiAgICAgICAgcGxhdGZvcm06IHBsYXRmb3JtIHx8IF9vczIuZGVmYXVsdC5uYW1lLFxuICAgICAgICBwb3BsYXllcjogcG9wbGF5ZXIgfHwgZmFsc2UsXG4gICAgICAgIHBvcGxheWVyVmVyc2lvbjogbmV3IF92ZXJzaW9uMi5kZWZhdWx0KHBvcGxheWVyVmVyc2lvbiB8fCAnMC4wLjAnKVxuICAgIH07XG59XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGFsaWFwcDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuMC4wQGFtZmUtZW52L3NyYy9hbGlhcHAuanNcbi8vIG1vZHVsZSBpZCA9IDEyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgVmVyc2lvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICBfY3JlYXRlQ2xhc3MoVmVyc2lvbiwgbnVsbCwgW3tcbiAgICAgICAga2V5OiAnY29tcGFyZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wYXJlKHYxLCB2Mikge1xuICAgICAgICAgICAgdjEgPSB2MS50b1N0cmluZygpLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICB2MiA9IHYyLnRvU3RyaW5nKCkuc3BsaXQoJy4nKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2MS5sZW5ndGggfHwgaSA8IHYyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIG4xID0gcGFyc2VJbnQodjFbaV0sIDEwKTtcbiAgICAgICAgICAgICAgICB2YXIgbjIgPSBwYXJzZUludCh2MltpXSwgMTApO1xuXG4gICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKG4xKSkge1xuICAgICAgICAgICAgICAgICAgICBuMSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKG4yKSkge1xuICAgICAgICAgICAgICAgICAgICBuMiA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChuMSA8IG4yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG4xID4gbjIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICBmdW5jdGlvbiBWZXJzaW9uKHYpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFZlcnNpb24pO1xuXG4gICAgICAgIGlmICh2KSB7XG4gICAgICAgICAgICB0aGlzLnZhbCA9IHYudG9TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmFsID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoVmVyc2lvbiwgW3tcbiAgICAgICAga2V5OiAnZ3QnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ3Qodikge1xuICAgICAgICAgICAgcmV0dXJuIFZlcnNpb24uY29tcGFyZSh0aGlzLCB2KSA+IDA7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2d0ZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBndGUodikge1xuICAgICAgICAgICAgcmV0dXJuIFZlcnNpb24uY29tcGFyZSh0aGlzLCB2KSA+PSAwO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdsdCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBsdCh2KSB7XG4gICAgICAgICAgICByZXR1cm4gVmVyc2lvbi5jb21wYXJlKHRoaXMsIHYpIDwgMDtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnbHRlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGx0ZSh2KSB7XG4gICAgICAgICAgICByZXR1cm4gVmVyc2lvbi5jb21wYXJlKHRoaXMsIHYpIDw9IDA7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2VxJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGVxKHYpIHtcbiAgICAgICAgICAgIHJldHVybiBWZXJzaW9uLmNvbXBhcmUodGhpcywgdikgPT09IDA7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3RvU3RyaW5nJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gVmVyc2lvbjtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gVmVyc2lvbjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuMC4wQGFtZmUtZW52L3NyYy92ZXJzaW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAxMjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF92ZXJzaW9uID0gcmVxdWlyZSgnLi92ZXJzaW9uJyk7XG5cbnZhciBfdmVyc2lvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF92ZXJzaW9uKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIHVhID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG52YXIgb3M7XG52YXIgbWF0Y2hlZDtcblxuaWYgKG1hdGNoZWQgPSB1YS5tYXRjaCgvV2luZG93c1xcc1Bob25lXFxzKD86T1NcXHMpPyhbXFxkXFwuXSspLykpIHtcbiAgICBvcyA9IHtcbiAgICAgICAgbmFtZTogJ1dpbmRvd3MgUGhvbmUnLFxuICAgICAgICBpc1dpbmRvd3NQaG9uZTogdHJ1ZSxcbiAgICAgICAgdmVyc2lvbjogbmV3IF92ZXJzaW9uMi5kZWZhdWx0KG1hdGNoZWRbMV0pXG4gICAgfTtcbn0gZWxzZSBpZiAoISF1YS5tYXRjaCgvU2FmYXJpLykgJiYgKG1hdGNoZWQgPSB1YS5tYXRjaCgvQW5kcm9pZFtcXHNcXC9dKFtcXGRcXC5dKykvKSkpIHtcbiAgICBvcyA9IHtcbiAgICAgICAgdmVyc2lvbjogbmV3IF92ZXJzaW9uMi5kZWZhdWx0KG1hdGNoZWRbMV0pXG4gICAgfTtcblxuICAgIGlmICh1YS5tYXRjaCgvTW9iaWxlXFxzK1NhZmFyaS8pKSB7XG4gICAgICAgIG9zLm5hbWUgPSAnQW5kcm9pZCc7XG4gICAgICAgIG9zLmlzQW5kcm9pZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgb3MubmFtZSA9ICdBbmRyb2lkUGFkJztcbiAgICAgICAgb3MuaXNBbmRyb2lkUGFkID0gdHJ1ZTtcbiAgICB9XG59IGVsc2UgaWYgKG1hdGNoZWQgPSB1YS5tYXRjaCgvKGlQaG9uZXxpUGFkfGlQb2QpLykpIHtcbiAgICB2YXIgbmFtZSA9IG1hdGNoZWRbMV07XG5cbiAgICBpZiAobWF0Y2hlZCA9IHVhLm1hdGNoKC9PUyAoW1xcZF9cXC5dKykgbGlrZSBNYWMgT1MgWC8pKSB7XG4gICAgICAgIG9zID0ge1xuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIGlzSVBob25lOiBuYW1lID09PSAnaVBob25lJyB8fCBuYW1lID09PSAnaVBvZCcsXG4gICAgICAgICAgICBpc0lQYWQ6IG5hbWUgPT09ICdpUGFkJyxcbiAgICAgICAgICAgIGlzSU9TOiB0cnVlLFxuICAgICAgICAgICAgdmVyc2lvbjogbmV3IF92ZXJzaW9uMi5kZWZhdWx0KG1hdGNoZWRbMV0uc3BsaXQoJ18nKS5qb2luKCcuJykpXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5pZiAoIW9zKSB7XG4gICAgb3MgPSB7XG4gICAgICAgIG5hbWU6ICd1bmtub3duJyxcbiAgICAgICAgdmVyc2lvbjogbmV3IF92ZXJzaW9uMi5kZWZhdWx0KCcwLjAuMCcpXG4gICAgfTtcbn1cblxuZXhwb3J0cy5kZWZhdWx0ID0gb3M7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjAuMEBhbWZlLWVudi9zcmMvb3MuanNcbi8vIG1vZHVsZSBpZCA9IDEyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3ZlcnNpb24gPSByZXF1aXJlKCcuL3ZlcnNpb24nKTtcblxudmFyIF92ZXJzaW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3ZlcnNpb24pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgdWEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcbnZhciBicm93c2VyO1xudmFyIG1hdGNoZWQ7XG5cbmlmIChtYXRjaGVkID0gdWEubWF0Y2goLyg/OlVDV0VCfFVDQnJvd3NlclxcLykoW1xcZFxcLl0rKS8pKSB7XG4gICAgYnJvd3NlciA9IHtcbiAgICAgICAgbmFtZTogJ1VDJyxcbiAgICAgICAgaXNVQzogdHJ1ZSxcbiAgICAgICAgdmVyc2lvbjogbmV3IF92ZXJzaW9uMi5kZWZhdWx0KG1hdGNoZWRbMV0pXG4gICAgfTtcbn0gZWxzZSBpZiAobWF0Y2hlZCA9IHVhLm1hdGNoKC9NUVFCcm93c2VyXFwvKFtcXGRcXC5dKykvKSkge1xuICAgIGJyb3dzZXIgPSB7XG4gICAgICAgIG5hbWU6ICdRUScsXG4gICAgICAgIGlzUVE6IHRydWUsXG4gICAgICAgIHZlcnNpb246IG5ldyBfdmVyc2lvbjIuZGVmYXVsdChtYXRjaGVkWzFdKVxuICAgIH07XG59IGVsc2UgaWYgKG1hdGNoZWQgPSB1YS5tYXRjaCgvKD86RmlyZWZveHxGeGlPUylcXC8oW1xcZFxcLl0rKS8pKSB7XG4gICAgYnJvd3NlciA9IHtcbiAgICAgICAgbmFtZTogJ0ZpcmVmb3gnLFxuICAgICAgICBpc0ZpcmVmb3g6IHRydWUsXG4gICAgICAgIHZlcnNpb246IG5ldyBfdmVyc2lvbjIuZGVmYXVsdChtYXRjaGVkWzFdKVxuICAgIH07XG59IGVsc2UgaWYgKChtYXRjaGVkID0gdWEubWF0Y2goL01TSUVcXHMoW1xcZFxcLl0rKS8pKSB8fCAobWF0Y2hlZCA9IHVhLm1hdGNoKC9JRU1vYmlsZVxcLyhbXFxkXFwuXSspLykpKSB7XG5cbiAgICBicm93c2VyID0ge1xuICAgICAgICB2ZXJzaW9uOiBuZXcgX3ZlcnNpb24yLmRlZmF1bHQobWF0Y2hlZFsxXSlcbiAgICB9O1xuXG4gICAgaWYgKHVhLm1hdGNoKC9JRU1vYmlsZS8pKSB7XG4gICAgICAgIGJyb3dzZXIubmFtZSA9ICdJRU1vYmlsZSc7XG4gICAgICAgIGJyb3dzZXIuaXNJRU1vYmlsZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYnJvd3Nlci5uYW1lID0gJ0lFJztcbiAgICAgICAgYnJvd3Nlci5pc0lFID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodWEubWF0Y2goL0FuZHJvaWR8aVBob25lLykpIHtcbiAgICAgICAgYnJvd3Nlci5pc0lFTGlrZVdlYmtpdCA9IHRydWU7XG4gICAgfVxufSBlbHNlIGlmIChtYXRjaGVkID0gdWEubWF0Y2goLyg/OkNocm9tZXxDcmlPUylcXC8oW1xcZFxcLl0rKS8pKSB7XG4gICAgYnJvd3NlciA9IHtcbiAgICAgICAgbmFtZTogJ0Nocm9tZScsXG4gICAgICAgIGlzQ2hyb21lOiB0cnVlLFxuICAgICAgICB2ZXJzaW9uOiBuZXcgX3ZlcnNpb24yLmRlZmF1bHQobWF0Y2hlZFsxXSlcbiAgICB9O1xuXG4gICAgaWYgKHVhLm1hdGNoKC9WZXJzaW9uXFwvW1xcZCtcXC5dK1xccypDaHJvbWUvKSkge1xuICAgICAgICBicm93c2VyLm5hbWUgPSAnQ2hyb21lIFdlYnZpZXcnO1xuICAgICAgICBicm93c2VyLmlzV2VidmlldyA9IHRydWU7XG4gICAgfVxufSBlbHNlIGlmICghIXVhLm1hdGNoKC9TYWZhcmkvKSAmJiAobWF0Y2hlZCA9IHVhLm1hdGNoKC9BbmRyb2lkW1xcc1xcL10oW1xcZFxcLl0rKS8pKSkge1xuICAgIGJyb3dzZXIgPSB7XG4gICAgICAgIG5hbWU6ICdBbmRyb2lkJyxcbiAgICAgICAgaXNBbmRyb2lkOiB0cnVlLFxuICAgICAgICB2ZXJzaW9uOiBuZXcgX3ZlcnNpb24yLmRlZmF1bHQobWF0Y2hlZFsxXSlcbiAgICB9O1xufSBlbHNlIGlmICh1YS5tYXRjaCgvaVBob25lfGlQYWR8aVBvZC8pKSB7XG4gICAgaWYgKHVhLm1hdGNoKC9TYWZhcmkvKSAmJiAobWF0Y2hlZCA9IHVhLm1hdGNoKC9WZXJzaW9uXFwvKFtcXGRcXC5dKykvKSkpIHtcbiAgICAgICAgYnJvd3NlciA9IHtcbiAgICAgICAgICAgIG5hbWU6ICdTYWZhcmknLFxuICAgICAgICAgICAgaXNTYWZhcmk6IHRydWUsXG4gICAgICAgICAgICB2ZXJzaW9uOiBuZXcgX3ZlcnNpb24yLmRlZmF1bHQobWF0Y2hlZFsxXSlcbiAgICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKG1hdGNoZWQgPSB1YS5tYXRjaCgvT1MgKFtcXGRfXFwuXSspIGxpa2UgTWFjIE9TIFgvKSkge1xuICAgICAgICBicm93c2VyID0ge1xuICAgICAgICAgICAgbmFtZTogJ2lPUyBXZWJ2aWV3JyxcbiAgICAgICAgICAgIGlzV2VidmlldzogdHJ1ZSxcbiAgICAgICAgICAgIHZlcnNpb246IG5ldyBfdmVyc2lvbjIuZGVmYXVsdChtYXRjaGVkWzFdLnJlcGxhY2UoL1xcXy9nLCAnLicpKVxuICAgICAgICB9O1xuICAgIH1cbn1cblxuLyogaXN0YW5idWwgaWdub3JlIGlmICovXG5pZiAoIWJyb3dzZXIpIHtcbiAgICBicm93c2VyID0ge1xuICAgICAgICBuYW1lOiAndW5rbm93bicsXG4gICAgICAgIHZlcnNpb246IG5ldyBfdmVyc2lvbjIuZGVmYXVsdCgnMC4wLjAnKVxuICAgIH07XG59XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGJyb3dzZXI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjAuMEBhbWZlLWVudi9zcmMvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gMTI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgdWEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcblxudmFyIHRoaXJkYXBwO1xuXG5pZiAodWEubWF0Y2goL1dlaWJvL2kpKSB7XG4gICAgLyoqXG4gICAgICogQHR5cGUge09iamVjdH1cbiAgICAgKiBAbWVtYmVyb2YgbGliLmVudlxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBhcHBuYW1lIC0g5pON5L2c57O757uf5ZCN56ew77yM5q+U5aaCV2VpYm8vV2VpeGluL3Vua25vd27nrYlcbiAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGlzV2VpYm8gLSDmmK/lkKbmmK/lvq7ljZpcbiAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGlzV2VpeGluIC0g5piv5ZCm5piv5b6u5L+hXG4gICAgICovXG4gICAgdGhpcmRhcHAgPSB7XG4gICAgICAgIGFwcG5hbWU6ICdXZWlibycsXG4gICAgICAgIGlzV2VpYm86IHRydWVcbiAgICB9O1xufSBlbHNlIGlmICh1YS5tYXRjaCgvTWljcm9NZXNzZW5nZXIvaSkpIHtcbiAgICB0aGlyZGFwcCA9IHtcbiAgICAgICAgYXBwbmFtZTogJ1dlaXhpbicsXG4gICAgICAgIGlzV2VpeGluOiB0cnVlXG4gICAgfTtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xufSBlbHNlIHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgdGhpcmRhcHAgPSBmYWxzZTtcbiAgICB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHRoaXJkYXBwO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi4wLjBAYW1mZS1lbnYvc3JjL3RoaXJkYXBwLmpzXG4vLyBtb2R1bGUgaWQgPSAxMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbnZhciBwYXJhbXMgPSB7fTtcbnZhciBzZWFyY2ggPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJyk7XG5cbmlmIChzZWFyY2gpIHtcbiAgICB2YXIgc3BsaXRzID0gc2VhcmNoLnNwbGl0KCcmJyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzcGxpdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc3BsaXRzW2ldID0gc3BsaXRzW2ldLnNwbGl0KCc9Jyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBwYXJhbXNbc3BsaXRzW2ldWzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChzcGxpdHNbaV1bMV0pO1xuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgICAgIHBhcmFtc1tzcGxpdHNbaV1bMF1dID0gc3BsaXRzW2ldWzFdO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnRzLmRlZmF1bHQgPSBwYXJhbXM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjAuMEBhbWZlLWVudi9zcmMvcGFyYW1zLmpzXG4vLyBtb2R1bGUgaWQgPSAxMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vc3RhZ2UuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLy4uL25vZGVfbW9kdWxlcy8uMC4xMy4xQHN0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvaW5kZXguanMhLi9zdGFnZS5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0YWdlLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc3RhZ2UuY3NzXG4vLyBtb2R1bGUgaWQgPSAxMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIiNzdGFnZSB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGVmdDogMDtcXG4gICAgdG9wOiAwO1xcbiAgICAtd2Via2l0LXRyYW5mb3JtOiB0cmFuc2xhdGVaKDlweCk7XFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4yNS4wQGNzcy1sb2FkZXIhLi9zcmMvc3RhZ2UuY3NzXG4vLyBtb2R1bGUgaWQgPSAxMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtcbiAgICB3aW4sXG4gICAgZG9jLFxuICAgIFByb21pc2UsXG4gICAgZGVmZXIsXG4gICAgbG9hZEltZyxcbiAgICBxdWVyeSxcbiAgICBxdWVyeUFsbCxcbiAgICBnZXRSZWN0XG59IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBjbGFzcyBDYW52YXNJbWFnZSB7XG4gICAgY29uc3RydWN0b3IoY2FudmFzLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIGlmICghKGNhbnZhcyBpbnN0YW5jZW9mIEhUTUxDYW52YXNFbGVtZW50KSkge1xuICAgICAgICAgICAgaGVpZ2h0ID0gd2lkdGg7XG4gICAgICAgICAgICB3aWR0aCA9IGNhbnZhcztcbiAgICAgICAgICAgIGNhbnZhcyA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcyB8fCBkb2MuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5yZW5kZXIgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICB0aGlzLl9pbWFnZTtcbiAgICB9XG5cbiAgICBnZXQgaW1hZ2UoKSB7XG4gICAgICAgIGlmICghdGhpcy5faW1hZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICB0aGlzLl9pbWFnZS5zcmMgPSB0aGlzLmNhbnZhcy50b0RhdGFVUkwoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5faW1hZ2U7XG4gICAgfVxuXG4gICAgZHJhdyhwYXJhbXMpIHtcbiAgICAgICAgY29uc3QgbG9hZGVkID0gcGFyYW1zLm1hcChwYXJhbSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkZWZlcnJlZCA9IGRlZmVyKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChwYXJhbS5pbWcpIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHBhcmFtKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW0uc3JjKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgW2ltZywgcHJvbWlzZV0gPSBsb2FkSW1nKHBhcmFtLnNyYyk7XG4gICAgICAgICAgICAgICAgcGFyYW0uaW1nID0gaW1nO1xuICAgICAgICAgICAgICAgIHByb21pc2UudGhlbigoKSA9PiBkZWZlcnJlZC5yZXNvbHZlKHBhcmFtKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocGFyYW0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKGxvYWRlZClcbiAgICAgICAgICAgIC50aGVuKHBhcmFtcyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXIuY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcblxuICAgICAgICAgICAgICAgIHBhcmFtcy5mb3JFYWNoKHBhcmFtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJncyA9IFtwYXJhbS5pbWddO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbS5zeCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocGFyYW0uc3gpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbS5zeCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocGFyYW0uc3kpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbS5zdyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocGFyYW0uc3cpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbS5zaCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocGFyYW0uc2gpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHBhcmFtLngsIHBhcmFtLnkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbS53aWR0aCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocGFyYW0ud2lkdGgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbS5oZWlnaHQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHBhcmFtLmhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyLmRyYXdJbWFnZSguLi5hcmdzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pOyBcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDYW52YXNSZW5kZXIge1xuICAgIGNvbnN0cnVjdG9yKGNhbnZhcywgd2lkdGgsIGhlaWdodCkge1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLl92aXNpYmxlID0gbmV3IENhbnZhc0ltYWdlKGNhbnZhcywgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIHRoaXMuX29mZnNjcmVlbiA9IG5ldyBDYW52YXNJbWFnZSh3aWR0aCwgaGVpZ2h0KTsgXG4gICAgfVxuXG4gICAgZ2V0IGNhbnZhcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Zpc2libGUuY2FudmFzO1xuICAgIH1cblxuICAgIGdldCByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aXNpYmxlLnJlbmRlcjtcbiAgICB9XG5cbiAgICBnZXQgaW1hZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aXNpYmxlLmltYWdlO1xuICAgIH1cblxuICAgIGdldCBvZmZzY3JlZW5DYW52YXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vZmZzY3JlZW4uY2FudmFzO1xuICAgIH1cblxuICAgIGdldCBvZmZzY3JlZW5SZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vZmZzY3JlZW4ucmVuZGVyO1xuICAgIH1cblxuICAgIGdldCBvZmZzY3JlZW5JbWFnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29mZnNjcmVlbi5pbWFnZTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NhbnZhcy5qcyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2lzSXRlcmFibGUyID0gcmVxdWlyZShcIi4uL2NvcmUtanMvaXMtaXRlcmFibGVcIik7XG5cbnZhciBfaXNJdGVyYWJsZTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0l0ZXJhYmxlMik7XG5cbnZhciBfZ2V0SXRlcmF0b3IyID0gcmVxdWlyZShcIi4uL2NvcmUtanMvZ2V0LWl0ZXJhdG9yXCIpO1xuXG52YXIgX2dldEl0ZXJhdG9yMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldEl0ZXJhdG9yMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHtcbiAgICB2YXIgX2FyciA9IFtdO1xuICAgIHZhciBfbiA9IHRydWU7XG4gICAgdmFyIF9kID0gZmFsc2U7XG4gICAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAodmFyIF9pID0gKDAsIF9nZXRJdGVyYXRvcjMuZGVmYXVsdCkoYXJyKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBfZCA9IHRydWU7XG4gICAgICBfZSA9IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIF9hcnI7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICAgIHJldHVybiBhcnI7XG4gICAgfSBlbHNlIGlmICgoMCwgX2lzSXRlcmFibGUzLmRlZmF1bHQpKE9iamVjdChhcnIpKSkge1xuICAgICAgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG4gICAgfVxuICB9O1xufSgpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSAxMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vaXMtaXRlcmFibGVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvaXMtaXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDEzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29yZS5pcy1pdGVyYWJsZScpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgY2xhc3NvZiAgID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpXG4gICwgSVRFUkFUT1IgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmlzSXRlcmFibGUgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBPID0gT2JqZWN0KGl0KTtcbiAgcmV0dXJuIE9bSVRFUkFUT1JdICE9PSB1bmRlZmluZWRcbiAgICB8fCAnQEBpdGVyYXRvcicgaW4gT1xuICAgIHx8IEl0ZXJhdG9ycy5oYXNPd25Qcm9wZXJ0eShjbGFzc29mKE8pKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmlzLWl0ZXJhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMTM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwicmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvcicpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMTM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBnZXQgICAgICA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvciA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIGl0ZXJGbiA9IGdldChpdCk7XG4gIGlmKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgcmV0dXJuIGFuT2JqZWN0KGl0ZXJGbi5jYWxsKGl0KSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDEzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICAnVFlQRSc6IHtcbiAgICAgICAgJ3NpbmdsZSc6IDEsXG4gICAgICAgICdzdGF0aWMnOiAyLFxuICAgICAgICAnZHluYW1pYyc6IDNcbiAgICB9LMKgXG4gICAgJzEwJzoge1xuICAgICAgICBkaXN0YW5jZTogJzUwMDDlhYnlubQnLFxuICAgICAgICB0eXBlOiAyXG4gICAgfSxcbiAgICAnMTMnOiB7XG4gICAgICAgIHR5cGU6IDJcbiAgICB9LFxuICAgICcxNSc6IHtcbiAgICAgICAgdHlwZTogMVxuICAgIH0sXG4gICAgJzE5Jzoge1xuICAgICAgICBkaXN0YW5jZTogJzQ1MOWFieW5tCcsXG4gICAgICAgIHR5cGU6IDJcbiAgICB9LFxuICAgICcyMSc6IHtcbiAgICAgICAgeTE6IDEzMzQsXG4gICAgICAgIHkyOiAwLFxuICAgICAgICB0eXBlOiAzLFxuICAgICAgICBjb2luWDogMzgwLFxuICAgICAgICBjb2luWTogMjIwXG4gICAgfSxcbiAgICAnMjMnOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnMTQwMOWFieW5tCcsXG4gICAgICAgIHkxOiAxMzM0LFxuICAgICAgICB5MjogMCxcbiAgICAgICAgdHlwZTogMyxcbiAgICAgICAgY29pblg6IDM4MCxcbiAgICAgICAgY29pblk6IDIyMFxuICAgIH0sXG4gICAgJzI1Jzoge1xuICAgICAgICB0eXBlOiAyXG4gICAgfSxcbiAgICAnMjgnOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnOTgw5YWJ5bm0JyxcbiAgICAgICAgeTE6IDEzMzQsXG4gICAgICAgIHkyOiAwLFxuICAgICAgICB0eXBlOiAzLFxuICAgICAgICBjb2luWDogMzgwLFxuICAgICAgICBjb2luWTogMjIwXG4gICAgfSxcbiAgICAnMzEnOiB7XG4gICAgICAgIHkxOiAxMzM0LFxuICAgICAgICB5MjogMCxcbiAgICAgICAgdHlwZTogMyxcbiAgICAgICAgY29pblg6IDM4MCxcbiAgICAgICAgY29pblk6IDIyMFxuICAgIH0sXG4gICAgJzMzJzoge1xuICAgICAgICB5MTogMTMzNCxcbiAgICAgICAgeTI6IDAsXG4gICAgICAgIHR5cGU6IDMsXG4gICAgICAgIGNvaW5YOiAzODAsXG4gICAgICAgIGNvaW5ZOiAyMjBcbiAgICB9LFxuICAgICczOCc6IHtcbiAgICAgICAgZGlzdGFuY2U6ICc0MDAw5YWJ5bm0JyxcbiAgICAgICAgdHlwZTogMlxuICAgIH0sXG4gICAgJzQxJzoge1xuICAgICAgICB5MTogMTMzNCxcbiAgICAgICAgeTI6IDAsXG4gICAgICAgIHR5cGU6IDMsXG4gICAgICAgIGNvaW5YOiAzODAsXG4gICAgICAgIGNvaW5ZOiAyMjBcbiAgICB9LFxuICAgICc0Myc6IHtcbiAgICAgICAgZGlzdGFuY2U6ICc0MDDlhYnlubQnLFxuICAgICAgICB5MTogMTMzNCxcbiAgICAgICAgeTI6IDAsXG4gICAgICAgIHR5cGU6IDMsXG4gICAgICAgIGNvaW5YOiAzODAsXG4gICAgICAgIGNvaW5ZOiAyMjBcbiAgICB9LFxuICAgICc0Nic6IHtcbiAgICAgICAgZGlzdGFuY2U6ICc4LjblhYnlubQnLFxuICAgICAgICB5MTogMTMzNCxcbiAgICAgICAgeTI6IDAsXG4gICAgICAgIHR5cGU6IDMsXG4gICAgICAgIGNvaW5YOiAzODAsXG4gICAgICAgIGNvaW5ZOiAyMjBcbiAgICB9LFxuICAgICc0Nyc6IHtcbiAgICAgICAgdHlwZTogMVxuICAgIH0sXG4gICAgJzQ5Jzoge1xuICAgICAgICBkaXN0YW5jZTogJzI1LjA05YWJ5bm0JyxcbiAgICAgICAgdHlwZTogMlxuICAgIH0sXG4gICAgJzU2Jzoge1xuICAgICAgICBkaXN0YW5jZTogJzQuMjLlhYnlubQnLFxuICAgICAgICB0eXBlOiAyXG4gICAgfSxcbiAgICAnNTknOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnMTYuN+WFieW5tCcsXG4gICAgICAgIHR5cGU6IDJcbiAgICB9LFxuICAgICc2MSc6IHtcbiAgICAgICAgZGlzdGFuY2U6ICcyMC405YWJ5bm0JyxcbiAgICAgICAgdHlwZTogMlxuICAgIH0sXG4gICAgJzY0Jzoge1xuICAgICAgICBkaXN0YW5jZTogJzEwNy43MTLkur/lhazph4wnLFxuICAgICAgICB0eXBlOiAyXG4gICAgfSxcbiAgICAnNjYnOiB7XG4gICAgICAgIHR5cGU6IDJcbiAgICB9LFxuICAgICc2OSc6IHtcbiAgICAgICAgZGlzdGFuY2U6ICcxMDEuNzI45Lq/5YWs6YeMJyxcbiAgICAgICAgeTE6IDEzMzQsXG4gICAgICAgIHkyOiAwLFxuICAgICAgICB0eXBlOiAzLFxuICAgICAgICBjb2luWDogMzgwLFxuICAgICAgICBjb2luWTogMjIwXG4gICAgfSxcbiAgICAnNzQnOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnNTnkur/lhazph4wnLFxuICAgICAgICB5MTogMTMzNCxcbiAgICAgICAgeTI6IDAsXG4gICAgICAgIHR5cGU6IDMsXG4gICAgICAgIGNvaW5YOiAzODAsXG4gICAgICAgIGNvaW5ZOiAyMjBcbiAgICB9LFxuICAgICc3Nic6IHtcbiAgICAgICAgeTE6IDEzMzQsXG4gICAgICAgIHkyOiAwLFxuICAgICAgICB0eXBlOiAzLFxuICAgICAgICBjb2luWDogMzgwLFxuICAgICAgICBjb2luWTogMjIwXG4gICAgfSxcbiAgICAnNzcnOiB7XG4gICAgICAgIHR5cGU6IDFcbiAgICB9LFxuICAgICc3OSc6IHtcbiAgICAgICAgZGlzdGFuY2U6ICc0My415Lq/5YWs6YeMJyxcbiAgICAgICAgdHlwZTogMlxuICAgIH0sXG4gICAgJzgyJzoge1xuICAgICAgICBkaXN0YW5jZTogJzI3LjE55Lq/5YWs6YeMJyxcbiAgICAgICAgeTE6IDEzMzQsXG4gICAgICAgIHkyOiAwLFxuICAgICAgICB0eXBlOiAzLFxuICAgICAgICBjb2luWDogMzgwLFxuICAgICAgICBjb2luWTogMjIwXG4gICAgfSxcbiAgICAnODQnOiB7XG4gICAgICAgIHkxOiAxMzM0LFxuICAgICAgICB5MjogMCxcbiAgICAgICAgdHlwZTogMyxcbiAgICAgICAgY29pblg6IDM4MCxcbiAgICAgICAgY29pblk6IDIyMFxuICAgIH0sXG4gICAgJzg3Jzoge1xuICAgICAgICBkaXN0YW5jZTogJzEyLjjkur/lhazph4wnLFxuICAgICAgICB5MTogMTMzNCxcbiAgICAgICAgeTI6IDAsXG4gICAgICAgIHR5cGU6IDMsXG4gICAgICAgIGNvaW5YOiAzODAsXG4gICAgICAgIGNvaW5ZOiAyMjBcbiAgICB9LFxuICAgICc5NCc6IHtcbiAgICAgICAgZGlzdGFuY2U6ICcxLjQ5NuS6v+WFrOmHjCcsXG4gICAgICAgIHkxOiAxMzM0LFxuICAgICAgICB5MjogMCxcbiAgICAgICAgdHlwZTogMyxcbiAgICAgICAgY29pblg6IDM4MCxcbiAgICAgICAgY29pblk6IDIyMFxuICAgIH0sXG4gICAgJzk2Jzoge1xuICAgICAgICB0eXBlOiAxXG4gICAgfSxcbiAgICAnOTcnOiB7XG4gICAgICAgIHR5cGU6IDFcbiAgICB9LFxuICAgICcxMDEnOiB7XG4gICAgICAgIHR5cGU6IDJcbiAgICB9LFxuICAgICcxMDInOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnMC45MuS6v+WFrOmHjCcsXG4gICAgICAgIHR5cGU6IDJcbiAgICB9LFxuICAgICcxMDUnOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnNi4z5Lq/5YWs6YeMJyxcbiAgICAgICAgeTE6IDEzMzQsXG4gICAgICAgIHkyOiAwLFxuICAgICAgICB0eXBlOiAzLFxuICAgICAgICBjb2luWDogMzgwLFxuICAgICAgICBjb2luWTogMjIwXG4gICAgfSxcbiAgICAnMTA5Jzoge1xuICAgICAgICBkaXN0YW5jZTogJzU1MDDkuIflhazph4wnLFxuICAgICAgICB5MTogMTMzNCxcbiAgICAgICAgeTI6IDAsXG4gICAgICAgIHR5cGU6IDMsXG4gICAgICAgIGNvaW5YOiAzODAsXG4gICAgICAgIGNvaW5ZOiAyMjBcbiAgICB9LFxuICAgICcxMTInOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnNDE1MOS4h+WFrOmHjCcsXG4gICAgICAgIHkxOiAxMzM0LFxuICAgICAgICB5MjogMCxcbiAgICAgICAgdHlwZTogMyxcbiAgICAgICAgY29pblg6IDM4MCxcbiAgICAgICAgY29pblk6IDIyMFxuICAgIH0sXG4gICAgJzExNCc6IHtcbiAgICAgICAgdHlwZTogMlxuICAgIH0sXG4gICAgJzExNSc6IHtcbiAgICAgICAgdHlwZTogMVxuICAgIH0sXG4gICAgJzEyMCc6IHtcbiAgICAgICAgdHlwZTogMSxcbiAgICAgICAgaXNFYXJ0aDogdHJ1ZVxuICAgIH0sXG4gICAgJzExOSc6IHtcbiAgICAgICAgdHlwZTogMVxuICAgIH0sXG4gICAgJzEyMSc6IHtcbiAgICAgICAgZGlzdGFuY2U6ICcw5YWs6YeMJyxcbiAgICAgICAgeTE6IDEzMzQsXG4gICAgICAgIHkyOiAwLFxuICAgICAgICB0eXBlOiAzLFxuICAgICAgICBjb2luWDogMzgwLFxuICAgICAgICBjb2luWTogMjIwLFxuICAgICAgICBpc0VhcnRoOiB0cnVlXG4gICAgfSxcbiAgICAnMTIyJzoge1xuICAgICAgICB0eXBlOiAxLFxuICAgICAgICBpc0VhcnRoOiB0cnVlXG4gICAgfSxcbiAgICAnMTIzJzoge1xuICAgICAgICBkaXN0YW5jZTogJzM4LjQ05LiH5YWs6YeMJyxcbiAgICAgICAgeTE6IDEzMzQsXG4gICAgICAgIHkyOiAwLFxuICAgICAgICB0eXBlOiAzLFxuICAgICAgICBjb2luWDogMzgwLFxuICAgICAgICBjb2luWTogMjIwXG4gICAgfSxcbiAgICAnMTI0Jzoge1xuICAgICAgICB0eXBlOiAyXG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zbGljZUNvbmZpZy5qcyIsImltcG9ydCAnLi9oZWxsb3dvcmxkLmNzcyc7XG5pbXBvcnQge1xuICAgIHdpbixcbiAgICBkb2MsXG4gICAgUHJvbWlzZSxcbiAgICBkZWZlcixcbiAgICBkZWxheSxcbiAgICBxdWVyeSxcbiAgICBxdWVyeUFsbCxcbiAgICBnZXRSZWN0XG59IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlbGxvV29ybGQge1xuICAgIGNvbnN0cnVjdG9yKHZpZXdwb3J0LCBpdGVtcykge1xuICAgICAgICB0aGlzLndyYXBFbCA9IHF1ZXJ5KHZpZXdwb3J0LCAnI2hlbGxvd29ybGQnKTtcbiAgICAgICAgdGhpcy50ZXh0RWwgPSBxdWVyeSh0aGlzLndyYXBFbCwgJy5oZWxsb3dvcmxkJyk7XG4gICAgICAgIHRoaXMuc3RhcnRFbCA9IHF1ZXJ5KHRoaXMud3JhcEVsLCAnLnN0YXJ0Jyk7XG4gICAgICAgIC8vIHRoaXMudGV4dEVsLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtpdGVtc1snaGVsbG93b3JsZCddLnNyY30pYDtcbiAgICB9XG5cbiAgICBwbGF5KCkge1xuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IDQwMDtcbiAgICAgICAgY29uc3QgY291bnQgPSA2O1xuXG4gICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgZWxhcHNlZCxcbiAgICAgICAgICAgIGRlbHRhXG4gICAgICAgIH0pID0+IHtcbiAgICAgICAgICAgIGlmIChlbGFwc2VkIDw9IGR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBwYXJzZUludChjb3VudCAqIGVsYXBzZWQgLyBkdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0RWwuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uWCA9IGAtJHtpbmRleCAqIDEwfXJlbWA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudGV4dEVsLnN0eWxlLmJhY2tncm91bmRQb3NpdGlvblggPSAnMCc7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc3RhcnQob25jbGljaykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdGFydEVsLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgICAgIHRoaXMuc3RhcnRFbC5hZGRFdmVudExpc3RlbmVyKCd0YXAnLCBlID0+IHtcbiAgICAgICAgICAgICAgICBvbmNsaWNrICYmIG9uY2xpY2soKTtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBFbC5jbGFzc05hbWUgKz0gJyBmYWRlb3V0JztcbiAgICAgICAgICAgICAgICBkZWxheSg2NTApXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHRoaXMud3JhcEVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZScpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc29sdmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlYWR5KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy53cmFwRWwuc3R5bGUuZGlzcGxheSA9ICcnO1xuXG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaGVsbG9Xb3JsZC5qcyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvaW5kZXguanMhLi9oZWxsb3dvcmxkLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi8uLi9ub2RlX21vZHVsZXMvLjAuMTMuMUBzdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vaGVsbG93b3JsZC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL2hlbGxvd29ybGQuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9oZWxsb3dvcmxkLmNzc1xuLy8gbW9kdWxlIGlkID0gMTQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIjaGVsbG93b3JsZCB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHRvcDogMDtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAtd2Via2l0LXRyYW5mb3JtOiB0cmFuc2xhdGVaKDk5OTlweCk7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogb3BhY2l0eSAwLjZzIGVhc2Utb3V0IDBzO1xcbn1cXG5cXG4jaGVsbG93b3JsZCAuaGVsbG93b3JsZCB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgY2VudGVyO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDYwcmVtIDE3Ljc4NnJlbTtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG59XFxuXFxuI2hlbGxvd29ybGQuZmFkZW91dCB7XFxuICAgIG9wYWNpdHk6IDA7XFxufVxcblxcbiNoZWxsb3dvcmxkIC5zdGFydCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGxlZnQ6IDA7XFxuICAgIGJvdHRvbTogM3JlbTtcXG4gICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICAgIC13ZWJraXQtYm94LXBhY2s6IGNlbnRlcjtcXG4gICAgLXdlYmtpdC1ib3gtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuI2hlbGxvd29ybGQgLnN0YXJ0IC5hcnJvdy1sZWZ0LFxcbiAgICAjaGVsbG93b3JsZCAuc3RhcnQgLmFycm93LXJpZ2h0IHtcXG4gICAgd2lkdGg6IDAuNTMzM3JlbTtcXG4gICAgaGVpZ2h0OiAwLjI2NjdyZW07XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogMS4wNjY3cmVtIDAuMjY2N3JlbTtcXG59XFxuXFxuI2hlbGxvd29ybGQgLnN0YXJ0IC5hcnJvdy1sZWZ0IHtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMTUwJSBjZW50ZXI7XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBtb3ZlbGVmdCAwLjZzIGxpbmVhciAwcyBpbmZpbml0ZTtcXG59XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIG1vdmVsZWZ0IHtcXG4gICAgMCUge1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMTUwJSBjZW50ZXI7XFxuICAgIH1cXG5cXG4gICAgNDkuOTk5JSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAxNTAlIGNlbnRlcjtcXG4gICAgfVxcbiAgICA1MCUge1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCBjZW50ZXI7XFxuICAgIH1cXG5cXG4gICAgOTkuOTk5JSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIGNlbnRlcjtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDE1MCUgY2VudGVyO1xcbiAgICB9XFxufVxcblxcbiNoZWxsb3dvcmxkIC5zdGFydCAuYXJyb3ctcmlnaHQge1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiA1MCUgY2VudGVyO1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogbW92ZXJpZ2h0IDAuNnMgbGluZWFyIDBzIGluZmluaXRlO1xcbn1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgbW92ZXJpZ2h0IHtcXG4gICAgMCUge1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogNTAlIGNlbnRlcjtcXG4gICAgfVxcblxcbiAgICA0OS45OTklIHtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDUwJSBjZW50ZXI7XFxuICAgIH1cXG4gICAgNTAlIHtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDEwMCUgY2VudGVyO1xcbiAgICB9XFxuXFxuICAgIDk5Ljk5OSUge1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMTAwJSBjZW50ZXI7XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiA1MCUgY2VudGVyO1xcbiAgICB9XFxufVxcblxcbiNoZWxsb3dvcmxkIC5zdGFydCAudGV4dCB7XFxuICAgIG1hcmdpbjogMCAwLjJyZW07XFxuICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgY29sb3I6ICMwMGNiZTM7XFxuICAgIHRleHQtc2hhZG93OlxcbiAgICAgICAgMXB4IDAgMXB4IHJnYmEoMCwgMjAzLCAyMjcsIDAuMyksXFxuICAgICAgICAwIDFweCAxcHggcmdiYSgwLCAyMDMsIDIyNywgMC4zKSwgXFxuICAgICAgICAwIC0xcHggMXB4IHJnYmEoMCwgMjAzLCAyMjcsIDAuMyksXFxuICAgICAgICAtMXB4IDAgMXB4IHJnYmEoMCwgMjAzLCAyMjcsIDAuMyk7XFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4yNS4wQGNzcy1sb2FkZXIhLi9zcmMvaGVsbG93b3JsZC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDE0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge1xuICAgIHdpbixcbiAgICBkb2MsXG4gICAgUHJvbWlzZSxcbiAgICBkZWZlcixcbiAgICBxdWVyeSxcbiAgICBxdWVyeUFsbCxcbiAgICBnZXRSZWN0XG59IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQge1xuICAgIENhbnZhc0ltYWdlXG59IGZyb20gJy4vY2FudmFzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhciBleHRlbmRzIENhbnZhc0ltYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihzdGFnZSwgaXRlbXMpIHtcbiAgICAgICAgc3VwZXIoc3RhZ2UudncsIHN0YWdlLnZoICogMik7XG4gICAgICAgIFxuICAgICAgICB0aGlzLndpZHRoID0gc3RhZ2Uudnc7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gc3RhZ2UudmggKiAyO1xuICAgICAgICB0aGlzLnZ3ID0gc3RhZ2Uudnc7XG4gICAgICAgIHRoaXMudmggPSBzdGFnZS52aDtcbiAgICAgICAgdGhpcy5pdGVtcyA9IGl0ZW1zO1xuICAgIH1cblxuICAgIHJlYWR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kcmF3KFt7XG4gICAgICAgICAgICBpbWc6IHRoaXMuaXRlbXNbJ3N0YXInXS5vYmosXG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnZoXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGltZzogdGhpcy5pdGVtc1snc3RhciddLm9iaixcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiB0aGlzLnZoLFxuICAgICAgICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMudmhcbiAgICAgICAgfV0pO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc3Rhci5qcyIsImltcG9ydCAqIGFzIEJlemllciBmcm9tICdhbWZlLWN1YmljYmV6aWVyJztcbmltcG9ydCB7XG4gICAgd2luLFxuICAgIGRvYyxcbiAgICBQcm9taXNlLFxuICAgIGRlZmVyLFxuICAgIGRlbGF5LFxuICAgIHF1ZXJ5LFxuICAgIHF1ZXJ5QWxsLFxuICAgIGdldFJlY3QsXG4gICAgZ2V0RGlzdGFuY2UsXG4gICAgYXBwZW5kU3R5bGUsXG4gICAgcmFmLFxuICAgIGNhZlxufSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IEV2ZW50IGZyb20gJy4vZXZlbnQnO1xuaW1wb3J0IHtcbiAgICBDYW52YXNJbWFnZVxufSBmcm9tICcuL2NhbnZhcyc7XG5cbmNvbnN0IG9yaWdpblNsaWNlV2lkdGggPSA3NTA7XG5jb25zdCBvcmlnaW5TbGljZUhlaWdodCA9IDEzMzRcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWxlbWVudHMgZXh0ZW5kcyBDYW52YXNJbWFnZSB7XG4gICAgY29uc3RydWN0b3Ioc3RhZ2UsIGl0ZW1zKSB7XG4gICAgICAgIHN1cGVyKHN0YWdlLnZ3LCBzdGFnZS52aCk7XG5cbiAgICAgICAgdGhpcy5oU2xpY2UgPSBzdGFnZS5oU2xpY2U7XG4gICAgICAgIHRoaXMudlNsaWNlID0gc3RhZ2UudlNsaWNlO1xuICAgICAgICB0aGlzLnNsaWNlV2lkdGggPSBzdGFnZS5zbGljZVdpZHRoO1xuICAgICAgICB0aGlzLnNsaWNlSGVpZ2h0ID0gc3RhZ2Uuc2xpY2VIZWlnaHQ7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBpdGVtcztcbiAgICAgICAgdGhpcy5zY2FsZVJhdGlvID0gdGhpcy5zbGljZVdpZHRoIC8gb3JpZ2luU2xpY2VXaWR0aDtcbiAgICB9XG5cbiAgICBzaG93VGV4dChmb2N1cykge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBzaG93bixcbiAgICAgICAgICAgIGluZGV4XG4gICAgICAgIH0gPSBmb2N1cztcblxuICAgICAgICBjb25zdCBzbGljZSA9IHRoaXMuc2xpY2VzW1N0cmluZyhpbmRleCldO1xuICAgICAgICBpZiAoc2xpY2UpIHtcbiAgICAgICAgICAgIGlmIChzaG93biA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGVsYXkgPSA3NTA7XG4gICAgICAgICAgICAgICAgY29uc3QgZHVyYXRpb24gPSA1MDA7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKHtcbiAgICAgICAgICAgICAgICAgICAgZGVsdGEsXG4gICAgICAgICAgICAgICAgICAgIGVsYXBzZWRcbiAgICAgICAgICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGFwc2VkIDw9IGRlbGF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGljZS50ZXh0QWxwaGEgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXMuc2hvd24gPSAxO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVsYXBzZWQgLSBkZWxheSA8PSBkdXJhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2UudGV4dEFscGhhID0gKGVsYXBzZWQgLSBkZWxheSkgLyBkdXJhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzLnNob3duID0gMTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNlLnRleHRBbHBoYSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1cy5zaG93biA9IDI7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm9jdXMuc2hvd24gPT09IDI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd0dvbGQoZm9jdXMpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgZm91bmQsXG4gICAgICAgICAgICBpbmRleCxcbiAgICAgICAgICAgIHkxLFxuICAgICAgICAgICAgeTJcbiAgICAgICAgfSA9IGZvY3VzO1xuXG4gICAgICAgIGNvbnN0IHNsaWNlID0gdGhpcy5zbGljZXNbU3RyaW5nKGluZGV4KV07XG4gICAgICAgIGlmIChzbGljZSkge1xuICAgICAgICAgICAgaWYgKGZvdW5kID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkdXJhdGlvbiA9IDEwMDA7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKHtcbiAgICAgICAgICAgICAgICAgICAgZGVsdGEsXG4gICAgICAgICAgICAgICAgICAgIGVsYXBzZWRcbiAgICAgICAgICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGFwc2VkIDw9IGR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGljZS5nb2xkWSA9IHkxICsgKHkyIC0geTEpICogZWxhcHNlZCAvIGR1cmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXMuZm91bmQgPSAxO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2UuZ29sZFkgPSB5MjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzLmZvdW5kID0gMjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmb2N1cy5mb3VuZCA9PT0gMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmbHlDb2luKGZvY3VzKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIG5vQ29pbixcbiAgICAgICAgICAgIGluZGV4LFxuICAgICAgICAgICAgY29pblgsXG4gICAgICAgICAgICBjb2luWVxuICAgICAgICB9ID0gZm9jdXM7XG5cbiAgICAgICAgY29uc3Qgc2xpY2UgPSB0aGlzLnNsaWNlc1tTdHJpbmcoaW5kZXgpXTtcbiAgICAgICAgaWYgKHNsaWNlKSB7XG4gICAgICAgICAgICBpZiAoIW5vQ29pbikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvaW4gPSBzbGljZS5jb2luO1xuICAgICAgICAgICAgICAgIGNvbnN0IGR1cmF0aW9uID0gNTAwO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVuZFggPSA2NTA7XG4gICAgICAgICAgICAgICAgY29uc3QgZW5kWSA9IDUwO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuICh7XG4gICAgICAgICAgICAgICAgICAgIGRlbHRhLFxuICAgICAgICAgICAgICAgICAgICBlbGFwc2VkXG4gICAgICAgICAgICAgICAgfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxhcHNlZCA8PSBkdXJhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGVyY2VudCA9IGVsYXBzZWQgLyBkdXJhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvaW4ueCA9IGNvaW5YICsgKGVuZFggLSBjb2luWCkgKiBwZXJjZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29pbi55ID0gY29pblkgKyAoZW5kWSAtIGNvaW5ZKSAqIHBlcmNlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2luLnNjYWxlICs9IGRlbHRhIC8gZHVyYXRpb24gKiA1O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29pbi5zbG93IC09IGRlbHRhIC8gZHVyYXRpb24gKiA1O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29pbi54ID0gZW5kWDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvaW4ueSA9IGVuZFk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1cy5ub0NvaW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvY3VzLm5vQ29pbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZHJhd0ltYWdlcyhob3ZlcnMsIGZvY3VzLCBzY3JvbGxYLCBzY3JvbGxZLCBlKSB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IFtdO1xuICAgICAgICBpZiAoaG92ZXJzKSB7XG4gICAgICAgICAgIGZvciAoY29uc3QgaG92ZXIgb2YgaG92ZXJzKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgICAgICBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgeTEsXG4gICAgICAgICAgICAgICAgICAgIHkyLFxuICAgICAgICAgICAgICAgICAgICBjb2luWCxcbiAgICAgICAgICAgICAgICAgICAgY29pblksXG4gICAgICAgICAgICAgICAgICAgIG5vQ29pbixcbiAgICAgICAgICAgICAgICAgICAgaXNFYXJ0aFxuICAgICAgICAgICAgICAgIH0gPSBob3ZlcjtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHNsaWNlID0gdGhpcy5zbGljZXNbU3RyaW5nKGluZGV4KV07XG4gICAgICAgICAgICAgICAgaWYgKHNsaWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHgsXG4gICAgICAgICAgICAgICAgICAgICAgICB5LFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW52YXNJbWFnZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0ltZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHRJbWcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0QWxwaGEgPSAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ29sZEltZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvaW4sXG4gICAgICAgICAgICAgICAgICAgICAgICBmbG93XG4gICAgICAgICAgICAgICAgICAgIH0gPSBzbGljZTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0WSA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0VhcnRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXRZID0gZmxvdy5yYW5nZVswXSArIChmbG93LnJhbmdlWzFdIC0gZmxvdy5yYW5nZVswXSkgKiBmbG93LmVhc2UoZmxvdy5lbGFwc2VkIC8gZmxvdy5kdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmxvdy5lbGFwc2VkID4gZmxvdy5kdXJhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldFkgPSBmbG93LnJhbmdlWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsb3cucmFuZ2UgPSBbZmxvdy5yYW5nZVsxXSwgZmxvdy5yYW5nZVswXV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxvdy5lYXNlID0gZmxvdy5lYXNlID09PSBCZXppZXIuZWFzZUluID8gQmV6aWVyLmVhc2VPdXQgOiBCZXppZXIuZWFzZUluO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsb3cuZWxhcHNlZCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsb3cuZWxhcHNlZCArPSBlLmRlbHRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2FudmFzSW1hZ2UucmVuZGVyLmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA+PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYW52YXNJbWFnZS5yZW5kZXIuZHJhd0ltYWdlKHN0YXRpY0ltZywgMCwgMCArIG9mZnNldFksIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPj0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzSW1hZ2UucmVuZGVyLnNhdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbnZhc0ltYWdlLnJlbmRlci5nbG9iYWxBbHBoYSA9IHRleHRBbHBoYTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbnZhc0ltYWdlLnJlbmRlci5kcmF3SW1hZ2UodGV4dEltZywgMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYW52YXNJbWFnZS5yZW5kZXIucmVzdG9yZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPj0gMykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2xpY2UuZ29sZFkgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGdvbGRZID0gc2xpY2UuZ29sZFk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeSA9IGdvbGRZICogdGhpcy5zY2FsZVJhdGlvO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbnZhc0ltYWdlLnJlbmRlci5kcmF3SW1hZ2UoZ29sZEltZywgMCwgZ29sZFksIG9yaWdpblNsaWNlV2lkdGgsIG9yaWdpblNsaWNlSGVpZ2h0IC0gZ29sZFksIDAsIHkgKyBvZmZzZXRZLCB3aWR0aCwgaGVpZ2h0IC0geSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvaW5zLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiAhbm9Db2luKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4ID0gY29pblgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHkgPSBjb2luWVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gPSBjb2luO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvdyA9IHNsb3cgPCAxID8gMSA6IHNsb3c7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUgPSBzY2FsZSA+IDEwID8gMTAgOiBzY2FsZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvaW5JbWcgPSB0aGlzLmNvaW5zW3BhcnNlSW50KGluZGV4IC8gc2xvdyldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2luSW1nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHt3aWR0aCwgaGVpZ2h0fSA9IGNvaW5JbWc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbnZhc0ltYWdlLnJlbmRlci5kcmF3SW1hZ2UoY29pbkltZywgeCAqIHRoaXMuc2NhbGVSYXRpbywgeSAqIHRoaXMuc2NhbGVSYXRpbywgd2lkdGggLyBzY2FsZSwgaGVpZ2h0IC8gc2NhbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2luLmluZGV4ID0gKGNvaW4uaW5kZXggKyAxKSAlICh0aGlzLmNvaW5zLmxlbmd0aCAqIHNsb3cpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBwYXJhbXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiB4IC0gc2Nyb2xsWCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHkgLSBzY3JvbGxZLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWc6IGNhbnZhc0ltYWdlLmNhbnZhc1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRyYXcocGFyYW1zKTtcbiAgICB9XG5cbiAgICByZWFkeSgpIHtcbiAgICAgICAgY29uc3QgbG9hZGVkID0gW107XG4gICAgICAgIHRoaXMuY29pbnMgPSBbXTtcbiAgICAgICAgdGhpcy5zbGljZXMgPSB7fTtcblxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLml0ZW1zKS5maWx0ZXIoaWQgPT5cbiAgICAgICAgICAgIGlkLm1hdGNoKC9eY29pblxcZCQvKVxuICAgICAgICApLmZvckVhY2goaWQgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb2lucy5wdXNoKHRoaXMuaXRlbXNbaWRdLm9iaik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuaXRlbXMpLmZpbHRlcihpZCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaWQubWF0Y2goL15pXFxkK1xcLWVcXC0oc3x3fGcpLyk7XG4gICAgICAgIH0pLmZvckVhY2goaWQgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuaXRlbXNbaWRdO1xuICAgICAgICAgICAgY29uc3QgWywgaW5kZXgsIHR5cGVdID0gaWQubWF0Y2goL15pKFxcZCspXFwtZVxcLShzfHd8ZykkLyk7XG5cbiAgICAgICAgICAgIGNvbnN0IHggPSBOdW1iZXIoaW5kZXgpICUgdGhpcy5oU2xpY2U7XG4gICAgICAgICAgICBjb25zdCB5ID0gcGFyc2VJbnQoTnVtYmVyKGluZGV4KSAvIHRoaXMuaFNsaWNlKTtcbiAgICAgICAgICAgIGxldCBzbGljZSA9IHRoaXMuc2xpY2VzW1N0cmluZyhpbmRleCldO1xuICAgICAgICAgICAgaWYgKCFzbGljZSkge1xuICAgICAgICAgICAgICAgIHNsaWNlID0gdGhpcy5zbGljZXNbU3RyaW5nKGluZGV4KV0gPSB7XG4gICAgICAgICAgICAgICAgICAgIGNvaW46IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2xvdzogOCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlOiAzXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZsb3c6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiA4MDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGFwc2VkOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2U6IFswLCAxMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBlYXNlOiBCZXppZXIuZWFzZUluXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGNhbnZhc0ltYWdlOiBuZXcgQ2FudmFzSW1hZ2UodGhpcy5zbGljZVdpZHRoLCB0aGlzLnNsaWNlSGVpZ2h0KSxcbiAgICAgICAgICAgICAgICAgICAgeDogeCAqIHRoaXMuc2xpY2VXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgeTogeSAqIHRoaXMuc2xpY2VIZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLnNsaWNlV2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogdGhpcy5zbGljZUhlaWdodCxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAncycpIHtcbiAgICAgICAgICAgICAgICBzbGljZS5zdGF0aWNJbWcgPSBpdGVtLm9iajtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3cnKSB7XG4gICAgICAgICAgICAgICAgc2xpY2UudGV4dEltZyA9IGl0ZW0ub2JqO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnZycpIHtcbiAgICAgICAgICAgICAgICBzbGljZS5nb2xkSW1nID0gaXRlbS5vYmo7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChsb2FkZWQpO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZWxlbWVudHMuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXNcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2tleXMuanNcbi8vIG1vZHVsZSBpZCA9IDE0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Qua2V5cztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gMTQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gMTkuMS4yLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsICRrZXlzICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdrZXlzJywgZnVuY3Rpb24oKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGtleXMoaXQpe1xuICAgIHJldHVybiAka2V5cyh0b09iamVjdChpdCkpO1xuICB9O1xufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDE0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5nZW5lcmF0ZSA9IGdlbmVyYXRlO1xuZnVuY3Rpb24gZ2VuZXJhdGUocDF4LCBwMXksIHAyeCwgcDJ5KSB7XG4gICAgdmFyIFpFUk9fTElNSVQgPSAxZS02O1xuICAgIC8vIENhbGN1bGF0ZSB0aGUgcG9seW5vbWlhbCBjb2VmZmljaWVudHMsXG4gICAgLy8gaW1wbGljaXQgZmlyc3QgYW5kIGxhc3QgY29udHJvbCBwb2ludHMgYXJlICgwLDApIGFuZCAoMSwxKS5cbiAgICB2YXIgYXggPSAzICogcDF4IC0gMyAqIHAyeCArIDE7XG4gICAgdmFyIGJ4ID0gMyAqIHAyeCAtIDYgKiBwMXg7XG4gICAgdmFyIGN4ID0gMyAqIHAxeDtcblxuICAgIHZhciBheSA9IDMgKiBwMXkgLSAzICogcDJ5ICsgMTtcbiAgICB2YXIgYnkgPSAzICogcDJ5IC0gNiAqIHAxeTtcbiAgICB2YXIgY3kgPSAzICogcDF5O1xuXG4gICAgZnVuY3Rpb24gc2FtcGxlQ3VydmVEZXJpdmF0aXZlWCh0KSB7XG4gICAgICAgIC8vIGBheCB0XjMgKyBieCB0XjIgKyBjeCB0JyBleHBhbmRlZCB1c2luZyBIb3JuZXIgJ3MgcnVsZS5cbiAgICAgICAgcmV0dXJuICgzICogYXggKiB0ICsgMiAqIGJ4KSAqIHQgKyBjeDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzYW1wbGVDdXJ2ZVgodCkge1xuICAgICAgICByZXR1cm4gKChheCAqIHQgKyBieCkgKiB0ICsgY3gpICogdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzYW1wbGVDdXJ2ZVkodCkge1xuICAgICAgICByZXR1cm4gKChheSAqIHQgKyBieSkgKiB0ICsgY3kpICogdDtcbiAgICB9XG5cbiAgICAvLyBHaXZlbiBhbiB4IHZhbHVlLCBmaW5kIGEgcGFyYW1ldHJpYyB2YWx1ZSBpdCBjYW1lIGZyb20uXG4gICAgZnVuY3Rpb24gc29sdmVDdXJ2ZVgoeCkge1xuICAgICAgICB2YXIgdDIgPSB4O1xuICAgICAgICB2YXIgZGVyaXZhdGl2ZTtcbiAgICAgICAgdmFyIHgyO1xuXG4gICAgICAgIC8vIGh0dHBzOi8vdHJhYy53ZWJraXQub3JnL2Jyb3dzZXIvdHJ1bmsvU291cmNlL1dlYkNvcmUvcGxhdGZvcm0vYW5pbWF0aW9uXG4gICAgICAgIC8vIEZpcnN0IHRyeSBhIGZldyBpdGVyYXRpb25zIG9mIE5ld3RvbidzIG1ldGhvZCAtLSBub3JtYWxseSB2ZXJ5IGZhc3QuXG4gICAgICAgIC8vIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTmV3dG9uJ3NfbWV0aG9kXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICAgICAgICAvLyBmKHQpLXg9MFxuICAgICAgICAgICAgeDIgPSBzYW1wbGVDdXJ2ZVgodDIpIC0geDtcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyh4MikgPCBaRVJPX0xJTUlUKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHQyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVyaXZhdGl2ZSA9IHNhbXBsZUN1cnZlRGVyaXZhdGl2ZVgodDIpO1xuICAgICAgICAgICAgLy8gPT0gMCwgZmFpbHVyZVxuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMoZGVyaXZhdGl2ZSkgPCBaRVJPX0xJTUlUKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0MiAtPSB4MiAvIGRlcml2YXRpdmU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGYWxsIGJhY2sgdG8gdGhlIGJpc2VjdGlvbiBtZXRob2QgZm9yIHJlbGlhYmlsaXR5LlxuICAgICAgICAvLyBiaXNlY3Rpb25cbiAgICAgICAgLy8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9CaXNlY3Rpb25fbWV0aG9kXG4gICAgICAgIHZhciB0MSA9IDE7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIHZhciB0MCA9IDA7XG5cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgdDIgPSB4O1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICB3aGlsZSAodDEgPiB0MCkge1xuICAgICAgICAgICAgeDIgPSBzYW1wbGVDdXJ2ZVgodDIpIC0geDtcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyh4MikgPCBaRVJPX0xJTUlUKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHQyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHgyID4gMCkge1xuICAgICAgICAgICAgICAgIHQxID0gdDI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHQwID0gdDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0MiA9ICh0MSArIHQwKSAvIDI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGYWlsdXJlXG4gICAgICAgIHJldHVybiB0MjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzb2x2ZSh4KSB7XG4gICAgICAgIHJldHVybiBzYW1wbGVDdXJ2ZVkoc29sdmVDdXJ2ZVgoeCkpO1xuICAgIH1cblxuICAgIHJldHVybiBzb2x2ZTtcbn1cblxudmFyIGxpbmVhciA9IGV4cG9ydHMubGluZWFyID0gZ2VuZXJhdGUoMCwgMCwgMSwgMSk7XG52YXIgZWFzZSA9IGV4cG9ydHMuZWFzZSA9IGdlbmVyYXRlKC4yNSwgLjEsIC4yNSwgMSk7XG52YXIgZWFzZUluID0gZXhwb3J0cy5lYXNlSW4gPSBnZW5lcmF0ZSguNDIsIDAsIDEsIDEpO1xudmFyIGVhc2VPdXQgPSBleHBvcnRzLmVhc2VPdXQgPSBnZW5lcmF0ZSgwLCAwLCAuNTgsIDEpO1xudmFyIGVhc2VJbk91dCA9IGV4cG9ydHMuZWFzZUluT3V0ID0gZ2VuZXJhdGUoLjQyLCAwLCAuNTgsIDEpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi4wLjBAYW1mZS1jdWJpY2Jlemllci9zcmMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDE0OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgJy4vZm91bmQuY3NzJztcbmltcG9ydCB7XG4gICAgd2luLFxuICAgIGRvYyxcbiAgICBQcm9taXNlLFxuICAgIGRlZmVyLFxuICAgIGRlbGF5LFxuICAgIHF1ZXJ5LFxuICAgIHF1ZXJ5QWxsLFxuICAgIGdldFJlY3QsXG4gICAgZ2V0RGlzdGFuY2UsXG4gICAgYXBwZW5kU3R5bGUsXG4gICAgcmFmLFxuICAgIGNhZlxufSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IEV2ZW50IGZyb20gJy4vZXZlbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3VuZCBleHRlbmRzIEV2ZW50IHtcbiAgICBjb25zdHJ1Y3Rvcih2aWV3cG9ydCwgaXRlbXMpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLndyYXBFbCA9IHF1ZXJ5KHZpZXdwb3J0LCAnI2ZvdW5kJyk7XG4gICAgICAgIHRoaXMudGV4dEVsID0gcXVlcnkodGhpcy53cmFwRWwsICcudGV4dCcpO1xuICAgICAgICB0aGlzLnRleHROdW1iZXJFbCA9IHF1ZXJ5KHRoaXMudGV4dEVsLCAnLm51bWJlcicpO1xuICAgICAgICB0aGlzLnRleHRUaXBFbCA9IHF1ZXJ5KHRoaXMudGV4dEVsLCAnLnRpcCcpO1xuICAgICAgICB0aGlzLnRleHRCZ0VsID0gcXVlcnkodGhpcy50ZXh0RWwsICcuYmcnKTtcbiAgICAgICAgdGhpcy5iYXJFbCA9IHF1ZXJ5KHRoaXMud3JhcEVsLCAnLnByb2dyZXNzIC5iYXInKTtcbiAgICAgICAgdGhpcy5nb2xkRWwgPSBxdWVyeSh0aGlzLndyYXBFbCwgJy5nb2xkJyk7IFxuXG4gICAgICAgIHRoaXMuZm91bmQgPSAwO1xuICAgICAgICB0aGlzLmFtb3VudCA9IDA7XG4gICAgICAgIHRoaXMudG90YWwgPSAwO1xuICAgICAgICB0aGlzLmZvY3VzID0gMDtcbiAgICAgICAgdGhpcy5pdGVtcyA9IGl0ZW1zO1xuICAgIH1cblxuICAgIHVwZGF0ZShhbW91bnQsIGZvdW5kLCB0b3RhbCwgZm9jdXMpIHtcbiAgICAgICAgaWYgKGZvdW5kICE9PSB0aGlzLmZvdW5kIFxuICAgICAgICAgICAgfHwgYW1vdW50ICE9PSB0aGlzLmFtb3VudFxuICAgICAgICAgICAgfHwgdG90YWwgIT09IHRoaXMudG90YWxcbiAgICAgICAgICAgIHx8IGZvY3VzICE9PSB0aGlzLmZvY3VzKSB7XG4gICAgICAgICAgICB0aGlzLnRleHROdW1iZXJFbC50ZXh0Q29udGVudCA9IGAke2ZvdW5kfS8ke2Ftb3VudH1gO1xuICAgICAgICAgICAgdGhpcy5iYXJFbC5zdHlsZS53aWR0aCA9IGAke2ZvdW5kL2Ftb3VudCoxMDB9JWA7XG5cbiAgICAgICAgICAgIGlmIChmb3VuZCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgndXBkYXRlJywge1xuICAgICAgICAgICAgICAgICAgICBmb3VuZCxcbiAgICAgICAgICAgICAgICAgICAgYW1vdW50LFxuICAgICAgICAgICAgICAgICAgICB0b3RhbCxcbiAgICAgICAgICAgICAgICAgICAgZm9jdXNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5mb3VuZCA9IGZvdW5kO1xuICAgICAgICAgICAgdGhpcy5hbW91bnQgPSBhbW91bnQ7XG4gICAgICAgICAgICB0aGlzLnRvdGFsID0gdG90YWw7XG4gICAgICAgICAgICB0aGlzLmZvY3VzID0gZm9jdXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWFkeSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMud3JhcEVsLnN0eWxlLmRpc3BsYXkgPSAnJztcblxuICAgICAgICAgICAgbGV0IGtleWZyYW1lcyA9ICcnO1xuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5pdGVtcykuZmlsdGVyKGlkID0+XG4gICAgICAgICAgICAgICAgaWQubWF0Y2goL15jb2luXFxkJC8pXG4gICAgICAgICAgICApLmZvckVhY2goKGlkLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuaXRlbXNbaWRdO1xuICAgICAgICAgICAgICAgIGtleWZyYW1lcyArPSBgXG4gICAgICAgICAgICAgICAgICAgICR7MSAvIDYgKiBpICogMTAwfSUge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7aXRlbS5zcmN9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGA7XG5cbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBrZXlmcmFtZXMgKz0gYFxuICAgICAgICAgICAgICAgICAgICAgICAgMTAwJSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7aXRlbS5zcmN9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYDsgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBhcHBlbmRTdHlsZShgXG4gICAgICAgICAgICAgICAgQC13ZWJraXQta2V5ZnJhbWVzIGNvaW4ge1xuICAgICAgICAgICAgICAgICAgICAke2tleWZyYW1lc31cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBgKTtcblxuICAgICAgICAgICAgdGhpcy5nb2xkRWwuc3R5bGUud2Via2l0QW5pbWF0aW9uID0gJ2NvaW4gMXMgbGluZWFyIDBzIGluZmluaXRlJztcblxuICAgICAgICAgICAgcmVzb2x2ZSh0aGlzKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9mb3VuZC5qcyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvaW5kZXguanMhLi9mb3VuZC5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjEzLjFAc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL2ZvdW5kLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vZm91bmQuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9mb3VuZC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDE1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiI2ZvdW5kIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICByaWdodDogMC43M3JlbTtcXG4gICAgdG9wOiAwLjRyZW07XFxuICAgIGNvbG9yOiAjMDBkZGYxO1xcbiAgICBmb250LXNpemU6IDEycHg7XFxuICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgICAtd2Via2l0LWJveC1wYWNrOiBjZW50ZXI7XFxuICAgIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgY2VudGVyO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEuMTA2cmVtIDAuNDEzcmVtO1xcbn1cXG5cXG4jZm91bmQgLnRleHRXcmFwIHtcXG4gICAgd2lkdGg6IDEuNXJlbTtcXG4gICAgaGVpZ2h0OiAwLjU1M3JlbTtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiByaWdodCBjZW50ZXI7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogMS41cmVtIDAuNTUzcmVtO1xcbiAgICBtYXJnaW46IC0wLjFyZW07XFxufVxcblxcbiNmb3VuZCAudGV4dCB7XFxuICAgIHdpZHRoOiAxLjNyZW07XFxuICAgIGhlaWdodDogMC41cmVtO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDAuNHMgZWFzZS1pbiAwcztcXG4gICAgb3ZlcmZsb3c6IHZpc2libGU7XFxufVxcblxcbiNmb3VuZCAudGV4dCAubnVtYmVyIHtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMDtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIHdpZHRoOiAxLjNyZW07XFxuICAgIGhlaWdodDogMC41cmVtO1xcbiAgICBsaW5lLWhlaWdodDogMC41cmVtO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbiNmb3VuZCAucHJvZ3Jlc3Mge1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICB3aWR0aDogMS44cmVtO1xcbiAgICBoZWlnaHQ6IDAuM3JlbTtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzAwZGRmMTtcXG4gICAgYm9yZGVyLXJhZGl1czogMC4xNXJlbTtcXG4gICAgbWFyZ2luOiAwIDRweDtcXG59XFxuXFxuI2ZvdW5kIC5wcm9ncmVzcyAuYmFye1xcbiAgICB3aWR0aDogMDtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBkZGYxO1xcbiAgICBib3JkZXItcmFkaXVzOiAwLjE1cmVtO1xcbn1cXG5cXG4jZm91bmQgLmdvbGQge1xcbiAgICB3aWR0aDogMC42NjdyZW07XFxuICAgIGhlaWdodDogMC42NHJlbTtcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMjUuMEBjc3MtbG9hZGVyIS4vc3JjL2ZvdW5kLmNzc1xuLy8gbW9kdWxlIGlkID0gMTUxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAnLi9tYXAuY3NzJztcbmltcG9ydCB7XG4gICAgd2luLFxuICAgIGRvYyxcbiAgICBQcm9taXNlLFxuICAgIHF1ZXJ5LFxuICAgIHF1ZXJ5QWxsLFxuICAgIGdldFJlY3Rcbn0gZnJvbSAnLi91dGlsJztcbmltcG9ydCBFdmVudCBmcm9tICcuL2V2ZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFwIGV4dGVuZHMgRXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKHZpZXdwb3J0LCBoU2xpY2UsIHZTbGljZSkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMudmlld3BvcnQgPSBxdWVyeSh2aWV3cG9ydCwgJyNzdGFnZS1tYXAnKTtcbiAgICAgICAgdGhpcy53cmFwRWwgPSBxdWVyeSh0aGlzLnZpZXdwb3J0LCAnLndyYXAnKTtcbiAgICAgICAgdGhpcy5jYW52YXNFbCA9IHF1ZXJ5KHRoaXMudmlld3BvcnQsICdjYW52YXMnKTtcbiAgICAgICAgdGhpcy5yZW5kZXIgPSB0aGlzLmNhbnZhc0VsLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIHRoaXMuaW5kaWNhdG9yRWwgPSBxdWVyeSh0aGlzLnZpZXdwb3J0LCAnLmluZGljYXRvcicpO1xuICAgICAgICB0aGlzLnRleHRFbCA9IHF1ZXJ5KHRoaXMudmlld3BvcnQsICcudGV4dCBiJyk7XG4gICAgICAgIHRoaXMuaFNsaWNlID0gaFNsaWNlO1xuICAgICAgICB0aGlzLnZTbGljZSA9IHZTbGljZTtcbiAgICAgICAgdGhpcy5vcGVuZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByYW5kb21UZXh0KCkge1xuICAgICAgICBsZXQgbiA9IDEwMDA7XG4gICAgICAgIGxldCBzdW1EZWx0YSA9IDE2O1xuICAgICAgICBsZXQgc2lnbiA9IC0xO1xuXG4gICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgZWxhcHNlZCxcbiAgICAgICAgICAgIGRlbHRhXG4gICAgICAgIH0pID0+IHtcbiAgICAgICAgICAgIC8vIGlmIChzdW1EZWx0YSA+IDE1KSB7XG4gICAgICAgICAgICAgICAgLy8gc3VtRGVsdGEgPSAwO1xuICAgICAgICAgICAgICAgIGlmIChuIDwgMTAwMCAmJiBzaWduID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBzaWduID0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG4gPiAxMDAwMCAmIHNpZ24gPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgc2lnbiA9IC0xO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMudGV4dChuKTtcbiAgICAgICAgICAgICAgICBuICs9IHBhcnNlSW50KE1hdGgucmFuZG9tKCkgKiAxMDAgKyAxMDApICogc2lnbjtcbiAgICAgICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gc3VtRGVsdGEgKz0gZGVsdGE7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0ZXh0KHN0cikge1xuICAgICAgICB0aGlzLnRleHRFbC50ZXh0Q29udGVudCA9IHN0cjtcbiAgICB9XG5cbiAgICB1cGRhdGUoeHAsIHlwKSB7XG4gICAgICAgIGNvbnN0IHt3aWR0aDogY1dpZHRoLCBoZWlnaHQ6IGNIZWlnaHR9ID0gZ2V0UmVjdCh0aGlzLmNhbnZhc0VsKTtcbiAgICAgICAgY29uc3Qge3dpZHRoOiBpV2lkdGgsIGhlaWdodDogaUhlaWdodH0gPSBnZXRSZWN0KHRoaXMuaW5kaWNhdG9yRWwpO1xuICAgICAgICBjb25zdCB7c2xpY2VXaWR0aDogc1dpZHRoLCBzbGljZUhlaWdodDogc0hlaWdodH0gPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuaW5kaWNhdG9yRWwuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gXG4gICAgICAgICAgICBgdHJhbnNsYXRlM2QoJHtjV2lkdGggKiB4cCArIHNXaWR0aCAvIDIgLSBpV2lkdGggLyAyfXB4LCAke2NIZWlnaHQgKiB5cCArIHNIZWlnaHQgLyAyIC0gaUhlaWdodCAvIDJ9cHgsIDApYDtcbiAgICB9XG5cbiAgICBjbGVhcih4cCwgeXApIHtcbiAgICAgICAgY29uc3Qge3dpZHRoOiBjV2lkdGgsIGhlaWdodDogY0hlaWdodH0gPSBnZXRSZWN0KHRoaXMuY2FudmFzRWwpO1xuICAgICAgICBjb25zdCB7c2xpY2VXaWR0aDogc1dpZHRoLCBzbGljZUhlaWdodDogc0hlaWdodH0gPSB0aGlzO1xuXG4gICAgICAgIHRoaXMucmVuZGVyLmZpbGxSZWN0KGNXaWR0aCAqIHhwLCBjSGVpZ2h0ICogeXAsIHNXaWR0aCwgc0hlaWdodCk7XG4gICAgfVxuXG4gICAgcmVhZHkoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZpZXdwb3J0LnN0eWxlLmRpc3BsYXkgPSAnJztcblxuICAgICAgICAgICAgY29uc3Qge3dpZHRoLCBoZWlnaHR9ID0gZ2V0UmVjdCh0aGlzLmNhbnZhc0VsKTtcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy5zbGljZVdpZHRoID0gd2lkdGggLyB0aGlzLmhTbGljZTtcbiAgICAgICAgICAgIHRoaXMuc2xpY2VIZWlnaHQgPSBoZWlnaHQgLyB0aGlzLnZTbGljZTtcblxuICAgICAgICAgICAgdGhpcy5jYW52YXNFbC53aWR0aCA9IHdpZHRoO1xuICAgICAgICAgICAgdGhpcy5jYW52YXNFbC5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLnJlbmRlci5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlci5maWxsU3R5bGUgPSAnIzAxNmZhMCc7XG4gICAgICAgICAgICB0aGlzLnJlbmRlci5maWxsUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyLmZpbGxTdHlsZSA9ICdyZ2JhKDAsIDAsIDAsIDEpJztcbiAgICAgICAgICAgIHRoaXMucmVuZGVyLmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdkZXN0aW5hdGlvbi1vdXQnO1xuXG4gICAgICAgICAgICByZXNvbHZlKHRoaXMpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hcC5qcyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvaW5kZXguanMhLi9tYXAuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLy4uL25vZGVfbW9kdWxlcy8uMC4xMy4xQHN0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvaW5kZXguanMhLi9tYXAuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvaW5kZXguanMhLi9tYXAuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tYXAuY3NzXG4vLyBtb2R1bGUgaWQgPSAxNTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIiNzdGFnZS1tYXAge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxlZnQ6IDAuNXJlbTtcXG4gICAgYm90dG9tOiAwLjVyZW07XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAuNHJlbSAwLjdyZW07XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogMS4wOXJlbSAwLjg1M3JlbTtcXG4gICAgaGVpZ2h0OiA4NHB4O1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWig5OTlweCk7XFxuICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgICAtd2Via2l0LWJveC1wYWNrOiBjZW50ZXI7XFxuICAgIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbiNzdGFnZS1tYXAgLndyYXAge1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjMDE2ZmEwO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICB3aWR0aDogMzAuM3B4O1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMDtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbiNzdGFnZS1tYXAgLm1hcCB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbiNzdGFnZS1tYXAgLmluZGljYXRvciB7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHRvcDogMDtcXG4gICAgd2lkdGg6IDE2cHg7XFxuICAgIGhlaWdodDogMTZweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig1MCwgNTAsIDUwKTtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgLXdlYmtpdC1hbmltYXRpb246IGZsYXNoIDAuNHMgbGluZWFyIDBzIGluZmluaXRlIGFsdGVybmF0ZTtcXG59XFxuXFxuXFxuI3N0YWdlLW1hcCAudGV4dCB7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUVJQUFBQkNDQVlBQUFEalZBRG9BQUFBR1hSRldIUlRiMlowZDJGeVpRQkJaRzlpWlNCSmJXRm5aVkpsWVdSNWNjbGxQQUFBQ1NGSlJFRlVlTnJrbkFsc0ZWVVVocWV2WTF0cUJZcFNLQXEyZ0tBc0xvamloZ3FJaXRHRWFCUVZneUZ1VVZHaUF1NUtYTmhSTkM2NGdIR1BnUWpFRFJBVXdTS0NJTkFxaTRCS1ZaQkZiQzJDRklybnBOL283V1RlNjh4Nzg4b3JuT1JQZWRONXc3M25udnVmLzV5WmFacTF2c3lxQThzVzVBb2FDbklFRFFTWkFodW83UVY3Qkg4TEtnVGxnaDE4VHFxbEpja1JhWUtqQkMwRWVZS3NCSyszVzdCRjhKdGdtMkIvcWp0Q0oxd29PSnBWVDRhcFUzNFIvQ1RZbFdxT09GelFWbkNNSUdMVmpWWGhrSFdDblFmYUVicS8yd2xhc3gwT2hPazIyU0JZQzhmVXVTT2FDenFIc1AvRDNESWxnazExNVloMFFTZEJLeXMxYlNNTzJaZE1SeWdCbms0YVRHWFR0THM0Q0prR2NZUk92bHNLYlFVL1crVnJuQkthSXhvTHpoQWNadFV2cThRWk8ybzdNZUl6RXVxakV5ekczTTNQVnE3TkVWbGNxRDQ2d2UyTXJIZ2RrVjdQT01IUGdxYkg0NGhPOVNBN0JMR0d6Q21RSTVxbnNFNUl4Rm94TjErT3NGR01CNnQxTmtyL0dwTjJXN3NrODBLR29MMmdRSkJQcjhLbWNLcWcxRjdGejJUeGhjN3grMWc2UXF2SUhra29vUFI2WFFRWENFNWp3dXZwTWZ3TmllVlF2cmRoc0Q4TFBoVE1DU3FYZlJacW41dFZxOXNSSnlXQkcvU2FBeUdyV1lJdkJiOXkvQ1JrOEZMQnRSUk12MUZlbnljNG45cGhqR0F6RHMybjNHOG1hRVNFN2NTcHkvMklKNk1tV2VIbENLMGplb2JZVDlCVnZZWGE1QTFDc1Jjcm9STVp4c1NHQy9xUTNpd0d0d2dSTjF2UVFYQzI0RWNpNWdmS2JuVmFHZW94aTYxMnBtQ040RFdyOWk2VzlqTStjK29SYzlJRklUcEIyM1JqcmVvKzVXQW1ycCtYc1pKRGNNSnl0a2szNDdzNitkNUV5MUFXYUFST09GSXdUekNGeUNvV3JPWTYwd1gzRWhFWCtSaGpoRG5YeUJyNnMyV0lUaGpEeWs0VVBFcVlQMFJZM3c4bjZFcThLTGpkK081bUp0TGFReGxPZ1ZmdUU1d1M0LytmQmhuNnNaYU9EeUxHNERORDJnNlBDUlpDZEU4SVNwbDhieWJ0cUR0MXdtVldkWS9Uc2RjRlY3dXV1WlR0cGQvOUZoSWRSbVJGczhOOWpqZVRLUHZQRWZraFJjTWc5dTViOE0zRGdxOEk3VDdHZWUrU0pTNTFUVmozN1luR01jMG92eHZSMms4d2xaYmNYVkd5VzI3QTJxaUY2WWltSVRpaEsvdDZnbFY5YjBJSjdSNzJlYTV4M3R1Q2Z3UTNHOGYrRkV3VzNPcTY1Z3pCSmE1alNwclBRS0k5UGNaeENVNzFhMDBkUVpWdEpkNTZUeU5GdmlrNFFYQ2poNVRWK3hIdnNkKzdHc2ZWYVNNRk45SDNjT3dQd1VyWFZxa2dTcXJJTFAwRlgxai9OMjN6MEVHREFuYmRzbTNYYXNWclRyOWl2dUFWOHZ0K3lHOFZxVE9meVdhNG5QQTRhZlZrMXpWZkVOemdDdjhsU09RQmd0R0M4WUp6U1lNUk10UTdkS2VDV0s0ZFVvV3BFNW1KZDhkQW1ucnRZOW56WG1xMWpITXY0UGVtVFVWaHRuVWQxOVI2T1N2ZkFnZGZqQ091RVd6bjM0RXJVeHZTU3JSMjBIVDJFaXZTeGNkM2lnVHZFeUhIdTM2M0VHM3dvT3Y0YXJaTFZ5TUtGeURhcnFMRUhoN25ISExzRVBpaFBmdi9Ed2dzVnYrd0NBSnN5NWJJZHAyekdHRTAzQlZCdXMxZUZseG5IRzhOOFZxazEwY2c0WGlzZ2UzYXMvSFcrT3RKY1Y1VnEwcml1U2hCalp5N280ZzNyVU0rUVlka2U0Z2tqZHp1eHJGRzFDUmxPQ0dSTythWmRxejJWWUQwczhrUkprVEhhdVQwTXJpaUYybjFLSS92NzZNMldJdmVjRHZoT3h6eHRIRnNOeW5VNFpxY0JCMWgyMUY2RW9IQ0N0RlR6RjZ0SW14VlV6eFFpOXpWS3ZRcG9tcUV4MWhLSWRRaGhoUFY2YU9NMHZ3dkhMRWxVVWNrWXRtUTFPOFVNRm9ITlBGUnZPMkRLNmFSQ250N25MT1pPcVUvVHJXb1hEV2ozRUVkVXhDU0lxNnlFU1B4OEVRbXBIWTAyajR6U3VpN1M5LzU1UHBDb3NGTDFhNkRURlZNWFVpL1lTSmpIVTNhekNEMUg1RUFTZjYzTUhhYzNSOWw3anVKaUJtSXBma3h6dC9NYXM3aFhFMnpIV09rMW9uSTdiT29WYlFZdXhLdTJZTWNIMFRLemtNL0pHSjdiUzRjTklWZWhsNjRtLzA5RUFaZlNtVG9DbTZsVWl5aDVENlRVcnd3Mm1BZ3pTVkVXaU80b0pJcTFvbTJ5Y2o0TnFUVmlqaVVwTnYyMkF5eVVZQXY2VmE0bmhEZHhLVHo0WVlYcURFeVdLa0NsRjl0RDVKc0lDdTBnUncvSWNLVUg4NHh6dnVNUHNkVE5HTTZ1NXV3Y2RvdTJ3cisyTTBBd25VeG44c3Bqcm96cUNjRFhLc012aWpCdWR1SkdwWGR6N3JLNlc5cCtUMUJCTTlGYnM4TXdSRVZFUWJqMS9LTUhxUnBuN0x5S3A2KzhYR2RUU2pGb1pDbDFocVQyRTRhRVgxZFRsaUNEbm1BdGw4cFNyYVFLalJSSzdjRGRIMmRuc01LajV4ZGhQenRBWUdkNk1wRSsrR0w1ZFFTR29YYTFqOVY4QUhSTkNwS0pUeWJSczdEUmhFMkNjMHlNd1IrVU50aG84aDIrU1RNSTFsMUwxMHdtWGJhYmJUUzhpRGlIYlRvbStPZ0xqUlg1dEMxZW80VTZFV2VrOWcybzdtZUUzMFIrT0g1TVBoQmZlQUlxcTJXdi9zWjJ6MnFSY2NXa2U0R3d4T0ZwTHRjb3hVM0Z4WFloMVpiVmd6Rk9ZNXJqRFA2cWF0cDdvd25wWWJ4Yk9UV2FqMVFmVjhqejlWU2oyWkhzQXB6VVlYbEhpTEw2V0MvVGR0c0dWdmhETGJPY2JVb1RyM3V4NlJrczhoYVMyUThpSklkR1pLcTFDZHF0amlPaU1EVWZqclpMWkc0N1ZtNVA0MXFzSm5CRGRQUkJWZVFhV0xtY1FUWGRIaWpuMnU3ektNTmVDOTg4MUFJYXRMaUdycEZxOHc3WFIzSTQzNnRKZWMzaGwvK2dXOUtjYzRnUGsrQUd3WWErOXdaeENwUzhVcklzeTk2eEZTa2s4a1F3NGlFSjYzd0hsSmZ4eGlTZXNzdm5TWnVkOUx0UEp5ZFJ0YXBwRTk1T2xHUWJwQmtDZHV2R0dtdG5QSVJFYlkzcFBIVnVPVlhGemVCZXlESkcxczFid0kzSXgwMnhQazdpWUNOS05IendTOW9qdTlESGxmVW04Q1dsZHpIQXJvanVqb1M2aHVJakozMEljekhBbXl5ekN4K2h2MWFRcTJQQmNUREZVR3RDVVZUYTZJa2h6Q3RRSEgreE9ydlR1SVlOdEQ1c21JNXdpWXFEb2FuNmJ4c045RlFnMnNpVVJSZHNYWHdXb2tYNFVaaU5GSktEMElubEZwUlhtT0lsU3FMTFo4UGROY1RLNDhWNlpGYTVPNFNWRjk5dHozMFQvYkY0d2dMQmJjSThWTmZyWkk1N0lxZDN3Lzhhd3BhWFhyZCs5QWlhMGdJVGdqdE5RV0wycUhJQ3ZIMVFsZkpIVTM1SmRwbktQTGJlQXBTVi96RmhjTW1VSlhQMnp4NkJLOG1TSXhGak5rSzJ4R09seGZRWVFyTFZPYU9OWEw3WHJaTHZCWG1SdXFaUU5HYlNxODdhbmRMbjNYUW51ZkNPQlZqbmI3dTZKYmpxZkFDckVib0d1c0F2UURycmxvUDZWZWkzYWJOblFJY2txeWlMYVZma3ZmcVB4elNmellobXJuL2tJWit6ckQrLzBNYVZjamZTdlo1bmY4aGpYOEZHQUJnNkh3em1xb3RIQUFBQUFCSlJVNUVya0pnZ2c9PSk7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogMS4ycmVtO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgMHJlbTtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgY29sb3I6ICMwMGRkZjE7XFxuICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgd2lkdGg6IDEwMHB4O1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGxpbmUtaGVpZ2h0OiAxLjVlbTtcXG4gICAgbGVmdDogMC4xcmVtO1xcbiAgICB0b3A6IDEuOHJlbTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBwYWRkaW5nLXRvcDogNTBweDtcXG59XFxuXFxuI3N0YWdlLW1hcCAudGV4dCBiIHtcXG4gICAgZm9udC1zaXplOiAxNXB4O1xcbiAgICBtYXJnaW4tdG9wOiA0cHg7XFxuICAgIGNvbG9yOiAjRkZGO1xcbn1cXG5cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgZmxhc2gge1xcbiAgICAwJSB7XFxuICAgICAgICBvcGFjaXR5OiAwO1xcbiAgICB9XFxuXFxuICAgIDEwMCUge1xcbiAgICAgICAgb3BhY2l0eTogMTtcXG4gICAgfVxcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMjUuMEBjc3MtbG9hZGVyIS4vc3JjL21hcC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDE1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge1xuICAgIHdpbixcbiAgICBkb2MsXG4gICAgUHJvbWlzZSxcbiAgICBkZWZlcixcbiAgICBxdWVyeSxcbiAgICBxdWVyeUFsbCxcbiAgICBnZXRSZWN0LFxuICAgIGdldERpc3RhbmNlLFxuICAgIHJhZixcbiAgICBjYWZcbn0gZnJvbSAnLi91dGlsJztcbmltcG9ydCBFdmVudCBmcm9tICcuL2V2ZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlja2VyIGV4dGVuZHMgRXZlbnR7XG4gICAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgICAgICBzdXBlciguLi5hcmdzKTtcblxuICAgICAgICB0aGlzLl9pZCA9IDA7XG4gICAgICAgIHRoaXMuX21hcEYgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuX21hcEMgPSBuZXcgTWFwKCk7XG4gICAgfVxuXG4gICAgYWRkKGYpIHtcbiAgICAgICAgaWYgKGYgJiYgIXRoaXMuX21hcEMuaGFzKGYpKSB7XG4gICAgICAgICAgICBjb25zdCBpZCA9IHRoaXMuX2lkKys7XG4gICAgICAgICAgICB0aGlzLl9tYXBGLnNldChpZCwgZik7XG4gICAgICAgICAgICB0aGlzLl9tYXBDLnNldChmLCB7XG4gICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgIGRlZmVycmVkOiBkZWZlcigpLFxuICAgICAgICAgICAgICAgIGNhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgc3RhcnQ6IDAsXG4gICAgICAgICAgICAgICAgZWxhcHNlZDogMCxcbiAgICAgICAgICAgICAgICBkZWx0YTogMFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gaWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYXMoaWQpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBpZCA9PT0gJ251bWJlcicgJiYgdGhpcy5fbWFwRi5oYXMoaWQpO1xuICAgIH1cblxuICAgIGRlbGV0ZShpZCkge1xuICAgICAgICBpZiAodGhpcy5oYXMoaWQpKSB7XG4gICAgICAgICAgICBjb25zdCBmID0gdGhpcy5fbWFwRi5nZXQoaWQpO1xuICAgICAgICAgICAgY29uc3QgYyA9IHRoaXMuX21hcEMuZ2V0KGYpO1xuICAgICAgICAgICAgYy5jYW5jZWwgPSB0cnVlO1xuICAgICAgICAgICAgYy5kZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICB0aGlzLl9tYXBGLmRlbGV0ZShpZCk7XG4gICAgICAgICAgICB0aGlzLl9tYXBDLmRlbGV0ZShmKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVuZChpZCkge1xuICAgICAgICBpZiAodGhpcy5oYXMoaWQpKSB7XG4gICAgICAgICAgICBjb25zdCBmID0gdGhpcy5fbWFwRi5nZXQoaWQpO1xuICAgICAgICAgICAgY29uc3QgYyA9IHRoaXMuX21hcEMuZ2V0KGYpO1xuICAgICAgICAgICAgcmV0dXJuIGMuZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMucmlkKSB7XG4gICAgICAgICAgICBjYWYodGhpcy5yaWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcnVuKCkge1xuICAgICAgICB0aGlzLnN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdGhpcy5lbGFwc2VkID0gMDtcbiAgICAgICAgdGhpcy5kZWx0YSA9IDA7XG5cbiAgICAgICAgY29uc3QgdGljayA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmlkID0gcmFmKHRpY2spO1xuXG4gICAgICAgICAgICBsZXQgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIGxldCBlbGFwc2VkID0gbm93IC0gdGhpcy5zdGFydDtcbiAgICAgICAgICAgIGxldCBkZWx0YSA9IGVsYXBzZWQgLSB0aGlzLmVsYXBzZWQ7XG5cbiAgICAgICAgICAgIHRoaXMuZW1pdCgnYmVmb3JldGljaycsIHtcbiAgICAgICAgICAgICAgICBzdGFydDogdGhpcy5zdGFydCxcbiAgICAgICAgICAgICAgICBkZWx0YTogZGVsdGEsXG4gICAgICAgICAgICAgICAgZWxhcHNlZDogZWxhcHNlZFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGtleXMgPSBbLi4udGhpcy5fbWFwQy5rZXlzKCldO1xuXG4gICAgICAgICAgICBrZXlzLmZvckVhY2goZiA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYyA9IHRoaXMuX21hcEMuZ2V0KGYpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFjLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgICAgICBjLnN0YXJ0ID0gYy5zdGFydCB8fCAoYy5zdGFydCA9IG5vdyk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxhcHNlZCA9IG5vdyAtIGMuc3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgIGMuZGVsdGEgPSBlbGFwc2VkIC0gYy5lbGFwc2VkO1xuICAgICAgICAgICAgICAgICAgICBjLmVsYXBzZWQgPSBlbGFwc2VkO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChmKGMsIHRoaXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZShjLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgZWxhcHNlZCA9IG5vdyAtIHRoaXMuc3RhcnQ7XG4gICAgICAgICAgICBkZWx0YSA9IGVsYXBzZWQgLSB0aGlzLmVsYXBzZWQ7XG5cbiAgICAgICAgICAgIHRoaXMuZW1pdCgnYWZ0ZXJ0aWNrJywge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiB0aGlzLnN0YXJ0LFxuICAgICAgICAgICAgICAgIGRlbHRhOiBkZWx0YSxcbiAgICAgICAgICAgICAgICBlbGFwc2VkOiBlbGFwc2VkXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5kZWx0YSA9IGRlbHRhO1xuICAgICAgICAgICAgdGhpcy5lbGFwc2VkID0gIGVsYXBzZWQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJpZCA9IHJhZih0aWNrKTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3RpY2tlci5qcyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9tYXBcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvbWFwLmpzXG4vLyBtb2R1bGUgaWQgPSAxNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYubWFwJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNy5tYXAudG8tanNvbicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL19jb3JlJykuTWFwO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL21hcC5qc1xuLy8gbW9kdWxlIGlkID0gMTU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHN0cm9uZyA9IHJlcXVpcmUoJy4vX2NvbGxlY3Rpb24tc3Ryb25nJyk7XG5cbi8vIDIzLjEgTWFwIE9iamVjdHNcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29sbGVjdGlvbicpKCdNYXAnLCBmdW5jdGlvbihnZXQpe1xuICByZXR1cm4gZnVuY3Rpb24gTWFwKCl7IHJldHVybiBnZXQodGhpcywgYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpOyB9O1xufSwge1xuICAvLyAyMy4xLjMuNiBNYXAucHJvdG90eXBlLmdldChrZXkpXG4gIGdldDogZnVuY3Rpb24gZ2V0KGtleSl7XG4gICAgdmFyIGVudHJ5ID0gc3Ryb25nLmdldEVudHJ5KHRoaXMsIGtleSk7XG4gICAgcmV0dXJuIGVudHJ5ICYmIGVudHJ5LnY7XG4gIH0sXG4gIC8vIDIzLjEuMy45IE1hcC5wcm90b3R5cGUuc2V0KGtleSwgdmFsdWUpXG4gIHNldDogZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUpe1xuICAgIHJldHVybiBzdHJvbmcuZGVmKHRoaXMsIGtleSA9PT0gMCA/IDAgOiBrZXksIHZhbHVlKTtcbiAgfVxufSwgc3Ryb25nLCB0cnVlKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5tYXAuanNcbi8vIG1vZHVsZSBpZCA9IDE1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcbnZhciBkUCAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZcbiAgLCBjcmVhdGUgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKVxuICAsIHJlZGVmaW5lQWxsID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUtYWxsJylcbiAgLCBjdHggICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgYW5JbnN0YW5jZSAgPSByZXF1aXJlKCcuL19hbi1pbnN0YW5jZScpXG4gICwgZGVmaW5lZCAgICAgPSByZXF1aXJlKCcuL19kZWZpbmVkJylcbiAgLCBmb3JPZiAgICAgICA9IHJlcXVpcmUoJy4vX2Zvci1vZicpXG4gICwgJGl0ZXJEZWZpbmUgPSByZXF1aXJlKCcuL19pdGVyLWRlZmluZScpXG4gICwgc3RlcCAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLXN0ZXAnKVxuICAsIHNldFNwZWNpZXMgID0gcmVxdWlyZSgnLi9fc2V0LXNwZWNpZXMnKVxuICAsIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKVxuICAsIGZhc3RLZXkgICAgID0gcmVxdWlyZSgnLi9fbWV0YScpLmZhc3RLZXlcbiAgLCBTSVpFICAgICAgICA9IERFU0NSSVBUT1JTID8gJ19zJyA6ICdzaXplJztcblxudmFyIGdldEVudHJ5ID0gZnVuY3Rpb24odGhhdCwga2V5KXtcbiAgLy8gZmFzdCBjYXNlXG4gIHZhciBpbmRleCA9IGZhc3RLZXkoa2V5KSwgZW50cnk7XG4gIGlmKGluZGV4ICE9PSAnRicpcmV0dXJuIHRoYXQuX2lbaW5kZXhdO1xuICAvLyBmcm96ZW4gb2JqZWN0IGNhc2VcbiAgZm9yKGVudHJ5ID0gdGhhdC5fZjsgZW50cnk7IGVudHJ5ID0gZW50cnkubil7XG4gICAgaWYoZW50cnkuayA9PSBrZXkpcmV0dXJuIGVudHJ5O1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0Q29uc3RydWN0b3I6IGZ1bmN0aW9uKHdyYXBwZXIsIE5BTUUsIElTX01BUCwgQURERVIpe1xuICAgIHZhciBDID0gd3JhcHBlcihmdW5jdGlvbih0aGF0LCBpdGVyYWJsZSl7XG4gICAgICBhbkluc3RhbmNlKHRoYXQsIEMsIE5BTUUsICdfaScpO1xuICAgICAgdGhhdC5faSA9IGNyZWF0ZShudWxsKTsgLy8gaW5kZXhcbiAgICAgIHRoYXQuX2YgPSB1bmRlZmluZWQ7ICAgIC8vIGZpcnN0IGVudHJ5XG4gICAgICB0aGF0Ll9sID0gdW5kZWZpbmVkOyAgICAvLyBsYXN0IGVudHJ5XG4gICAgICB0aGF0W1NJWkVdID0gMDsgICAgICAgICAvLyBzaXplXG4gICAgICBpZihpdGVyYWJsZSAhPSB1bmRlZmluZWQpZm9yT2YoaXRlcmFibGUsIElTX01BUCwgdGhhdFtBRERFUl0sIHRoYXQpO1xuICAgIH0pO1xuICAgIHJlZGVmaW5lQWxsKEMucHJvdG90eXBlLCB7XG4gICAgICAvLyAyMy4xLjMuMSBNYXAucHJvdG90eXBlLmNsZWFyKClcbiAgICAgIC8vIDIzLjIuMy4yIFNldC5wcm90b3R5cGUuY2xlYXIoKVxuICAgICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCl7XG4gICAgICAgIGZvcih2YXIgdGhhdCA9IHRoaXMsIGRhdGEgPSB0aGF0Ll9pLCBlbnRyeSA9IHRoYXQuX2Y7IGVudHJ5OyBlbnRyeSA9IGVudHJ5Lm4pe1xuICAgICAgICAgIGVudHJ5LnIgPSB0cnVlO1xuICAgICAgICAgIGlmKGVudHJ5LnApZW50cnkucCA9IGVudHJ5LnAubiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBkZWxldGUgZGF0YVtlbnRyeS5pXTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0Ll9mID0gdGhhdC5fbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhhdFtTSVpFXSA9IDA7XG4gICAgICB9LFxuICAgICAgLy8gMjMuMS4zLjMgTWFwLnByb3RvdHlwZS5kZWxldGUoa2V5KVxuICAgICAgLy8gMjMuMi4zLjQgU2V0LnByb3RvdHlwZS5kZWxldGUodmFsdWUpXG4gICAgICAnZGVsZXRlJzogZnVuY3Rpb24oa2V5KXtcbiAgICAgICAgdmFyIHRoYXQgID0gdGhpc1xuICAgICAgICAgICwgZW50cnkgPSBnZXRFbnRyeSh0aGF0LCBrZXkpO1xuICAgICAgICBpZihlbnRyeSl7XG4gICAgICAgICAgdmFyIG5leHQgPSBlbnRyeS5uXG4gICAgICAgICAgICAsIHByZXYgPSBlbnRyeS5wO1xuICAgICAgICAgIGRlbGV0ZSB0aGF0Ll9pW2VudHJ5LmldO1xuICAgICAgICAgIGVudHJ5LnIgPSB0cnVlO1xuICAgICAgICAgIGlmKHByZXYpcHJldi5uID0gbmV4dDtcbiAgICAgICAgICBpZihuZXh0KW5leHQucCA9IHByZXY7XG4gICAgICAgICAgaWYodGhhdC5fZiA9PSBlbnRyeSl0aGF0Ll9mID0gbmV4dDtcbiAgICAgICAgICBpZih0aGF0Ll9sID09IGVudHJ5KXRoYXQuX2wgPSBwcmV2O1xuICAgICAgICAgIHRoYXRbU0laRV0tLTtcbiAgICAgICAgfSByZXR1cm4gISFlbnRyeTtcbiAgICAgIH0sXG4gICAgICAvLyAyMy4yLjMuNiBTZXQucHJvdG90eXBlLmZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgICAgIC8vIDIzLjEuMy41IE1hcC5wcm90b3R5cGUuZm9yRWFjaChjYWxsYmFja2ZuLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICAgICAgZm9yRWFjaDogZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFja2ZuIC8qLCB0aGF0ID0gdW5kZWZpbmVkICovKXtcbiAgICAgICAgYW5JbnN0YW5jZSh0aGlzLCBDLCAnZm9yRWFjaCcpO1xuICAgICAgICB2YXIgZiA9IGN0eChjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCwgMylcbiAgICAgICAgICAsIGVudHJ5O1xuICAgICAgICB3aGlsZShlbnRyeSA9IGVudHJ5ID8gZW50cnkubiA6IHRoaXMuX2Ype1xuICAgICAgICAgIGYoZW50cnkudiwgZW50cnkuaywgdGhpcyk7XG4gICAgICAgICAgLy8gcmV2ZXJ0IHRvIHRoZSBsYXN0IGV4aXN0aW5nIGVudHJ5XG4gICAgICAgICAgd2hpbGUoZW50cnkgJiYgZW50cnkucillbnRyeSA9IGVudHJ5LnA7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAvLyAyMy4xLjMuNyBNYXAucHJvdG90eXBlLmhhcyhrZXkpXG4gICAgICAvLyAyMy4yLjMuNyBTZXQucHJvdG90eXBlLmhhcyh2YWx1ZSlcbiAgICAgIGhhczogZnVuY3Rpb24gaGFzKGtleSl7XG4gICAgICAgIHJldHVybiAhIWdldEVudHJ5KHRoaXMsIGtleSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYoREVTQ1JJUFRPUlMpZFAoQy5wcm90b3R5cGUsICdzaXplJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gZGVmaW5lZCh0aGlzW1NJWkVdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gQztcbiAgfSxcbiAgZGVmOiBmdW5jdGlvbih0aGF0LCBrZXksIHZhbHVlKXtcbiAgICB2YXIgZW50cnkgPSBnZXRFbnRyeSh0aGF0LCBrZXkpXG4gICAgICAsIHByZXYsIGluZGV4O1xuICAgIC8vIGNoYW5nZSBleGlzdGluZyBlbnRyeVxuICAgIGlmKGVudHJ5KXtcbiAgICAgIGVudHJ5LnYgPSB2YWx1ZTtcbiAgICAvLyBjcmVhdGUgbmV3IGVudHJ5XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoYXQuX2wgPSBlbnRyeSA9IHtcbiAgICAgICAgaTogaW5kZXggPSBmYXN0S2V5KGtleSwgdHJ1ZSksIC8vIDwtIGluZGV4XG4gICAgICAgIGs6IGtleSwgICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSBrZXlcbiAgICAgICAgdjogdmFsdWUsICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIHZhbHVlXG4gICAgICAgIHA6IHByZXYgPSB0aGF0Ll9sLCAgICAgICAgICAgICAvLyA8LSBwcmV2aW91cyBlbnRyeVxuICAgICAgICBuOiB1bmRlZmluZWQsICAgICAgICAgICAgICAgICAgLy8gPC0gbmV4dCBlbnRyeVxuICAgICAgICByOiBmYWxzZSAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gcmVtb3ZlZFxuICAgICAgfTtcbiAgICAgIGlmKCF0aGF0Ll9mKXRoYXQuX2YgPSBlbnRyeTtcbiAgICAgIGlmKHByZXYpcHJldi5uID0gZW50cnk7XG4gICAgICB0aGF0W1NJWkVdKys7XG4gICAgICAvLyBhZGQgdG8gaW5kZXhcbiAgICAgIGlmKGluZGV4ICE9PSAnRicpdGhhdC5faVtpbmRleF0gPSBlbnRyeTtcbiAgICB9IHJldHVybiB0aGF0O1xuICB9LFxuICBnZXRFbnRyeTogZ2V0RW50cnksXG4gIHNldFN0cm9uZzogZnVuY3Rpb24oQywgTkFNRSwgSVNfTUFQKXtcbiAgICAvLyBhZGQgLmtleXMsIC52YWx1ZXMsIC5lbnRyaWVzLCBbQEBpdGVyYXRvcl1cbiAgICAvLyAyMy4xLjMuNCwgMjMuMS4zLjgsIDIzLjEuMy4xMSwgMjMuMS4zLjEyLCAyMy4yLjMuNSwgMjMuMi4zLjgsIDIzLjIuMy4xMCwgMjMuMi4zLjExXG4gICAgJGl0ZXJEZWZpbmUoQywgTkFNRSwgZnVuY3Rpb24oaXRlcmF0ZWQsIGtpbmQpe1xuICAgICAgdGhpcy5fdCA9IGl0ZXJhdGVkOyAgLy8gdGFyZ2V0XG4gICAgICB0aGlzLl9rID0ga2luZDsgICAgICAvLyBraW5kXG4gICAgICB0aGlzLl9sID0gdW5kZWZpbmVkOyAvLyBwcmV2aW91c1xuICAgIH0sIGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgdGhhdCAgPSB0aGlzXG4gICAgICAgICwga2luZCAgPSB0aGF0Ll9rXG4gICAgICAgICwgZW50cnkgPSB0aGF0Ll9sO1xuICAgICAgLy8gcmV2ZXJ0IHRvIHRoZSBsYXN0IGV4aXN0aW5nIGVudHJ5XG4gICAgICB3aGlsZShlbnRyeSAmJiBlbnRyeS5yKWVudHJ5ID0gZW50cnkucDtcbiAgICAgIC8vIGdldCBuZXh0IGVudHJ5XG4gICAgICBpZighdGhhdC5fdCB8fCAhKHRoYXQuX2wgPSBlbnRyeSA9IGVudHJ5ID8gZW50cnkubiA6IHRoYXQuX3QuX2YpKXtcbiAgICAgICAgLy8gb3IgZmluaXNoIHRoZSBpdGVyYXRpb25cbiAgICAgICAgdGhhdC5fdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIHN0ZXAoMSk7XG4gICAgICB9XG4gICAgICAvLyByZXR1cm4gc3RlcCBieSBraW5kXG4gICAgICBpZihraW5kID09ICdrZXlzJyAgKXJldHVybiBzdGVwKDAsIGVudHJ5LmspO1xuICAgICAgaWYoa2luZCA9PSAndmFsdWVzJylyZXR1cm4gc3RlcCgwLCBlbnRyeS52KTtcbiAgICAgIHJldHVybiBzdGVwKDAsIFtlbnRyeS5rLCBlbnRyeS52XSk7XG4gICAgfSwgSVNfTUFQID8gJ2VudHJpZXMnIDogJ3ZhbHVlcycgLCAhSVNfTUFQLCB0cnVlKTtcblxuICAgIC8vIGFkZCBbQEBzcGVjaWVzXSwgMjMuMS4yLjIsIDIzLjIuMi4yXG4gICAgc2V0U3BlY2llcyhOQU1FKTtcbiAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2xsZWN0aW9uLXN0cm9uZy5qc1xuLy8gbW9kdWxlIGlkID0gMTU5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRhcmdldCwgc3JjLCBzYWZlKXtcbiAgZm9yKHZhciBrZXkgaW4gc3JjKXtcbiAgICBpZihzYWZlICYmIHRhcmdldFtrZXldKXRhcmdldFtrZXldID0gc3JjW2tleV07XG4gICAgZWxzZSBoaWRlKHRhcmdldCwga2V5LCBzcmNba2V5XSk7XG4gIH0gcmV0dXJuIHRhcmdldDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUtYWxsLmpzXG4vLyBtb2R1bGUgaWQgPSAxNjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBDb25zdHJ1Y3RvciwgbmFtZSwgZm9yYmlkZGVuRmllbGQpe1xuICBpZighKGl0IGluc3RhbmNlb2YgQ29uc3RydWN0b3IpIHx8IChmb3JiaWRkZW5GaWVsZCAhPT0gdW5kZWZpbmVkICYmIGZvcmJpZGRlbkZpZWxkIGluIGl0KSl7XG4gICAgdGhyb3cgVHlwZUVycm9yKG5hbWUgKyAnOiBpbmNvcnJlY3QgaW52b2NhdGlvbiEnKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLWluc3RhbmNlLmpzXG4vLyBtb2R1bGUgaWQgPSAxNjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgY3R4ICAgICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIGNhbGwgICAgICAgID0gcmVxdWlyZSgnLi9faXRlci1jYWxsJylcbiAgLCBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKVxuICAsIGFuT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCB0b0xlbmd0aCAgICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgZ2V0SXRlckZuICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpXG4gICwgQlJFQUsgICAgICAgPSB7fVxuICAsIFJFVFVSTiAgICAgID0ge307XG52YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXRlcmFibGUsIGVudHJpZXMsIGZuLCB0aGF0LCBJVEVSQVRPUil7XG4gIHZhciBpdGVyRm4gPSBJVEVSQVRPUiA/IGZ1bmN0aW9uKCl7IHJldHVybiBpdGVyYWJsZTsgfSA6IGdldEl0ZXJGbihpdGVyYWJsZSlcbiAgICAsIGYgICAgICA9IGN0eChmbiwgdGhhdCwgZW50cmllcyA/IDIgOiAxKVxuICAgICwgaW5kZXggID0gMFxuICAgICwgbGVuZ3RoLCBzdGVwLCBpdGVyYXRvciwgcmVzdWx0O1xuICBpZih0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ZXJhYmxlICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIC8vIGZhc3QgY2FzZSBmb3IgYXJyYXlzIHdpdGggZGVmYXVsdCBpdGVyYXRvclxuICBpZihpc0FycmF5SXRlcihpdGVyRm4pKWZvcihsZW5ndGggPSB0b0xlbmd0aChpdGVyYWJsZS5sZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKyl7XG4gICAgcmVzdWx0ID0gZW50cmllcyA/IGYoYW5PYmplY3Qoc3RlcCA9IGl0ZXJhYmxlW2luZGV4XSlbMF0sIHN0ZXBbMV0pIDogZihpdGVyYWJsZVtpbmRleF0pO1xuICAgIGlmKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pcmV0dXJuIHJlc3VsdDtcbiAgfSBlbHNlIGZvcihpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKGl0ZXJhYmxlKTsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOyApe1xuICAgIHJlc3VsdCA9IGNhbGwoaXRlcmF0b3IsIGYsIHN0ZXAudmFsdWUsIGVudHJpZXMpO1xuICAgIGlmKHJlc3VsdCA9PT0gQlJFQUsgfHwgcmVzdWx0ID09PSBSRVRVUk4pcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcbmV4cG9ydHMuQlJFQUsgID0gQlJFQUs7XG5leHBvcnRzLlJFVFVSTiA9IFJFVFVSTjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mb3Itb2YuanNcbi8vIG1vZHVsZSBpZCA9IDE2MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBkUCAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpXG4gICwgU1BFQ0lFUyAgICAgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEtFWSl7XG4gIHZhciBDID0gdHlwZW9mIGNvcmVbS0VZXSA9PSAnZnVuY3Rpb24nID8gY29yZVtLRVldIDogZ2xvYmFsW0tFWV07XG4gIGlmKERFU0NSSVBUT1JTICYmIEMgJiYgIUNbU1BFQ0lFU10pZFAuZihDLCBTUEVDSUVTLCB7XG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH1cbiAgfSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1zcGVjaWVzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBtZXRhICAgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGEnKVxuICAsIGZhaWxzICAgICAgICAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKVxuICAsIGhpZGUgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgcmVkZWZpbmVBbGwgICAgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKVxuICAsIGZvck9mICAgICAgICAgID0gcmVxdWlyZSgnLi9fZm9yLW9mJylcbiAgLCBhbkluc3RhbmNlICAgICA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJylcbiAgLCBpc09iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgZFAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mXG4gICwgZWFjaCAgICAgICAgICAgPSByZXF1aXJlKCcuL19hcnJheS1tZXRob2RzJykoMClcbiAgLCBERVNDUklQVE9SUyAgICA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oTkFNRSwgd3JhcHBlciwgbWV0aG9kcywgY29tbW9uLCBJU19NQVAsIElTX1dFQUspe1xuICB2YXIgQmFzZSAgPSBnbG9iYWxbTkFNRV1cbiAgICAsIEMgICAgID0gQmFzZVxuICAgICwgQURERVIgPSBJU19NQVAgPyAnc2V0JyA6ICdhZGQnXG4gICAgLCBwcm90byA9IEMgJiYgQy5wcm90b3R5cGVcbiAgICAsIE8gICAgID0ge307XG4gIGlmKCFERVNDUklQVE9SUyB8fCB0eXBlb2YgQyAhPSAnZnVuY3Rpb24nIHx8ICEoSVNfV0VBSyB8fCBwcm90by5mb3JFYWNoICYmICFmYWlscyhmdW5jdGlvbigpe1xuICAgIG5ldyBDKCkuZW50cmllcygpLm5leHQoKTtcbiAgfSkpKXtcbiAgICAvLyBjcmVhdGUgY29sbGVjdGlvbiBjb25zdHJ1Y3RvclxuICAgIEMgPSBjb21tb24uZ2V0Q29uc3RydWN0b3Iod3JhcHBlciwgTkFNRSwgSVNfTUFQLCBBRERFUik7XG4gICAgcmVkZWZpbmVBbGwoQy5wcm90b3R5cGUsIG1ldGhvZHMpO1xuICAgIG1ldGEuTkVFRCA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgQyA9IHdyYXBwZXIoZnVuY3Rpb24odGFyZ2V0LCBpdGVyYWJsZSl7XG4gICAgICBhbkluc3RhbmNlKHRhcmdldCwgQywgTkFNRSwgJ19jJyk7XG4gICAgICB0YXJnZXQuX2MgPSBuZXcgQmFzZTtcbiAgICAgIGlmKGl0ZXJhYmxlICE9IHVuZGVmaW5lZClmb3JPZihpdGVyYWJsZSwgSVNfTUFQLCB0YXJnZXRbQURERVJdLCB0YXJnZXQpO1xuICAgIH0pO1xuICAgIGVhY2goJ2FkZCxjbGVhcixkZWxldGUsZm9yRWFjaCxnZXQsaGFzLHNldCxrZXlzLHZhbHVlcyxlbnRyaWVzLHRvSlNPTicuc3BsaXQoJywnKSxmdW5jdGlvbihLRVkpe1xuICAgICAgdmFyIElTX0FEREVSID0gS0VZID09ICdhZGQnIHx8IEtFWSA9PSAnc2V0JztcbiAgICAgIGlmKEtFWSBpbiBwcm90byAmJiAhKElTX1dFQUsgJiYgS0VZID09ICdjbGVhcicpKWhpZGUoQy5wcm90b3R5cGUsIEtFWSwgZnVuY3Rpb24oYSwgYil7XG4gICAgICAgIGFuSW5zdGFuY2UodGhpcywgQywgS0VZKTtcbiAgICAgICAgaWYoIUlTX0FEREVSICYmIElTX1dFQUsgJiYgIWlzT2JqZWN0KGEpKXJldHVybiBLRVkgPT0gJ2dldCcgPyB1bmRlZmluZWQgOiBmYWxzZTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuX2NbS0VZXShhID09PSAwID8gMCA6IGEsIGIpO1xuICAgICAgICByZXR1cm4gSVNfQURERVIgPyB0aGlzIDogcmVzdWx0O1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYoJ3NpemUnIGluIHByb3RvKWRQKEMucHJvdG90eXBlLCAnc2l6ZScsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Muc2l6ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNldFRvU3RyaW5nVGFnKEMsIE5BTUUpO1xuXG4gIE9bTkFNRV0gPSBDO1xuICAkZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiwgTyk7XG5cbiAgaWYoIUlTX1dFQUspY29tbW9uLnNldFN0cm9uZyhDLCBOQU1FLCBJU19NQVApO1xuXG4gIHJldHVybiBDO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2xsZWN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAxNjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyAwIC0+IEFycmF5I2ZvckVhY2hcbi8vIDEgLT4gQXJyYXkjbWFwXG4vLyAyIC0+IEFycmF5I2ZpbHRlclxuLy8gMyAtPiBBcnJheSNzb21lXG4vLyA0IC0+IEFycmF5I2V2ZXJ5XG4vLyA1IC0+IEFycmF5I2ZpbmRcbi8vIDYgLT4gQXJyYXkjZmluZEluZGV4XG52YXIgY3R4ICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIElPYmplY3QgID0gcmVxdWlyZSgnLi9faW9iamVjdCcpXG4gICwgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCBhc2MgICAgICA9IHJlcXVpcmUoJy4vX2FycmF5LXNwZWNpZXMtY3JlYXRlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFRZUEUsICRjcmVhdGUpe1xuICB2YXIgSVNfTUFQICAgICAgICA9IFRZUEUgPT0gMVxuICAgICwgSVNfRklMVEVSICAgICA9IFRZUEUgPT0gMlxuICAgICwgSVNfU09NRSAgICAgICA9IFRZUEUgPT0gM1xuICAgICwgSVNfRVZFUlkgICAgICA9IFRZUEUgPT0gNFxuICAgICwgSVNfRklORF9JTkRFWCA9IFRZUEUgPT0gNlxuICAgICwgTk9fSE9MRVMgICAgICA9IFRZUEUgPT0gNSB8fCBJU19GSU5EX0lOREVYXG4gICAgLCBjcmVhdGUgICAgICAgID0gJGNyZWF0ZSB8fCBhc2M7XG4gIHJldHVybiBmdW5jdGlvbigkdGhpcywgY2FsbGJhY2tmbiwgdGhhdCl7XG4gICAgdmFyIE8gICAgICA9IHRvT2JqZWN0KCR0aGlzKVxuICAgICAgLCBzZWxmICAgPSBJT2JqZWN0KE8pXG4gICAgICAsIGYgICAgICA9IGN0eChjYWxsYmFja2ZuLCB0aGF0LCAzKVxuICAgICAgLCBsZW5ndGggPSB0b0xlbmd0aChzZWxmLmxlbmd0aClcbiAgICAgICwgaW5kZXggID0gMFxuICAgICAgLCByZXN1bHQgPSBJU19NQVAgPyBjcmVhdGUoJHRoaXMsIGxlbmd0aCkgOiBJU19GSUxURVIgPyBjcmVhdGUoJHRoaXMsIDApIDogdW5kZWZpbmVkXG4gICAgICAsIHZhbCwgcmVzO1xuICAgIGZvcig7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspaWYoTk9fSE9MRVMgfHwgaW5kZXggaW4gc2VsZil7XG4gICAgICB2YWwgPSBzZWxmW2luZGV4XTtcbiAgICAgIHJlcyA9IGYodmFsLCBpbmRleCwgTyk7XG4gICAgICBpZihUWVBFKXtcbiAgICAgICAgaWYoSVNfTUFQKXJlc3VsdFtpbmRleF0gPSByZXM7ICAgICAgICAgICAgLy8gbWFwXG4gICAgICAgIGVsc2UgaWYocmVzKXN3aXRjaChUWVBFKXtcbiAgICAgICAgICBjYXNlIDM6IHJldHVybiB0cnVlOyAgICAgICAgICAgICAgICAgICAgLy8gc29tZVxuICAgICAgICAgIGNhc2UgNTogcmV0dXJuIHZhbDsgICAgICAgICAgICAgICAgICAgICAvLyBmaW5kXG4gICAgICAgICAgY2FzZSA2OiByZXR1cm4gaW5kZXg7ICAgICAgICAgICAgICAgICAgIC8vIGZpbmRJbmRleFxuICAgICAgICAgIGNhc2UgMjogcmVzdWx0LnB1c2godmFsKTsgICAgICAgICAgICAgICAvLyBmaWx0ZXJcbiAgICAgICAgfSBlbHNlIGlmKElTX0VWRVJZKXJldHVybiBmYWxzZTsgICAgICAgICAgLy8gZXZlcnlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIElTX0ZJTkRfSU5ERVggPyAtMSA6IElTX1NPTUUgfHwgSVNfRVZFUlkgPyBJU19FVkVSWSA6IHJlc3VsdDtcbiAgfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktbWV0aG9kcy5qc1xuLy8gbW9kdWxlIGlkID0gMTY1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gOS40LjIuMyBBcnJheVNwZWNpZXNDcmVhdGUob3JpZ2luYWxBcnJheSwgbGVuZ3RoKVxudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX2FycmF5LXNwZWNpZXMtY29uc3RydWN0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvcmlnaW5hbCwgbGVuZ3RoKXtcbiAgcmV0dXJuIG5ldyAoc3BlY2llc0NvbnN0cnVjdG9yKG9yaWdpbmFsKSkobGVuZ3RoKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktc3BlY2llcy1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDE2NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgaXNBcnJheSAgPSByZXF1aXJlKCcuL19pcy1hcnJheScpXG4gICwgU1BFQ0lFUyAgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9yaWdpbmFsKXtcbiAgdmFyIEM7XG4gIGlmKGlzQXJyYXkob3JpZ2luYWwpKXtcbiAgICBDID0gb3JpZ2luYWwuY29uc3RydWN0b3I7XG4gICAgLy8gY3Jvc3MtcmVhbG0gZmFsbGJhY2tcbiAgICBpZih0eXBlb2YgQyA9PSAnZnVuY3Rpb24nICYmIChDID09PSBBcnJheSB8fCBpc0FycmF5KEMucHJvdG90eXBlKSkpQyA9IHVuZGVmaW5lZDtcbiAgICBpZihpc09iamVjdChDKSl7XG4gICAgICBDID0gQ1tTUEVDSUVTXTtcbiAgICAgIGlmKEMgPT09IG51bGwpQyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0gcmV0dXJuIEMgPT09IHVuZGVmaW5lZCA/IEFycmF5IDogQztcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktc3BlY2llcy1jb25zdHJ1Y3Rvci5qc1xuLy8gbW9kdWxlIGlkID0gMTY3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL0RhdmlkQnJ1YW50L01hcC1TZXQucHJvdG90eXBlLnRvSlNPTlxudmFyICRleHBvcnQgID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5SLCAnTWFwJywge3RvSlNPTjogcmVxdWlyZSgnLi9fY29sbGVjdGlvbi10by1qc29uJykoJ01hcCcpfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcubWFwLnRvLWpzb24uanNcbi8vIG1vZHVsZSBpZCA9IDE2OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EYXZpZEJydWFudC9NYXAtU2V0LnByb3RvdHlwZS50b0pTT05cbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpXG4gICwgZnJvbSAgICA9IHJlcXVpcmUoJy4vX2FycmF5LWZyb20taXRlcmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oTkFNRSl7XG4gIHJldHVybiBmdW5jdGlvbiB0b0pTT04oKXtcbiAgICBpZihjbGFzc29mKHRoaXMpICE9IE5BTUUpdGhyb3cgVHlwZUVycm9yKE5BTUUgKyBcIiN0b0pTT04gaXNuJ3QgZ2VuZXJpY1wiKTtcbiAgICByZXR1cm4gZnJvbSh0aGlzKTtcbiAgfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29sbGVjdGlvbi10by1qc29uLmpzXG4vLyBtb2R1bGUgaWQgPSAxNjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgZm9yT2YgPSByZXF1aXJlKCcuL19mb3Itb2YnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdGVyLCBJVEVSQVRPUil7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgZm9yT2YoaXRlciwgZmFsc2UsIHJlc3VsdC5wdXNoLCByZXN1bHQsIElURVJBVE9SKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1mcm9tLWl0ZXJhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSAxNzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJpbXBvcnQgJy4vcG9wLmNzcyc7XG5pbXBvcnQge1xuICAgIHdpbixcbiAgICBkb2MsXG4gICAgUHJvbWlzZSxcbiAgICBxdWVyeSxcbiAgICBxdWVyeUFsbCxcbiAgICBnZXRSZWN0LFxuICAgIGdldERpc3RhbmNlLFxuICAgIHJhZixcbiAgICBkZWxheVxufSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3Age1xuICAgIGNvbnN0cnVjdG9yKHZpZXdwb3J0KSB7XG4gICAgICAgIHRoaXMucG9wRWwgPSBxdWVyeSh2aWV3cG9ydCwgJyNwb3AnKTtcbiAgICB9XG5cbiAgICByZWFkeSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudEVsID0gcXVlcnkodGhpcy5wb3BFbCwgJy5jb250ZW50Jyk7XG4gICAgICAgICAgICB0aGlzLmNsb3NlRWwgPSBxdWVyeSh0aGlzLnBvcEVsLCAnLnBvcENsb3NlJyk7XG4gICAgICAgICAgICB0aGlzLnRpdGxlRWwgPSBxdWVyeSh0aGlzLnBvcEVsLCAnLnRpdGxlJyk7XG4gICAgICAgICAgICB0aGlzLnRleHRFbCA9IHF1ZXJ5KHRoaXMucG9wRWwsICcudGV4dCcpO1xuICAgICAgICAgICAgdGhpcy5iZzFFbCA9IHF1ZXJ5KHRoaXMucG9wRWwsICcucG9wQmcxJyk7XG4gICAgICAgICAgICB0aGlzLmJnMkVsID0gcXVlcnkodGhpcy5wb3BFbCwgJy5wb3BCZzInKTtcbiAgICAgICAgICAgIHRoaXMuYnRuc0VsID0gcXVlcnkodGhpcy5wb3BFbCwgJy5idG5zJyk7XG4gICAgICAgICAgICB0aGlzLmxlZnRCdG5FbCA9IHF1ZXJ5KHRoaXMucG9wRWwsICcucG9wQnRuLmxlZnQnKTtcbiAgICAgICAgICAgIHRoaXMucmlnaHRCdG5FbCA9IHF1ZXJ5KHRoaXMucG9wRWwsICcucG9wQnRuLnJpZ2h0Jyk7XG5cbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIHRoaXMuY29udGVudEVsLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgICAgdGhpcy5idG5zRWwuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgICB0aGlzLnBvcEVsLmNsYXNzTmFtZSA9IHRoaXMucG9wRWwuY2xhc3NOYW1lLnJlcGxhY2UoJ29wZW4nLCAnY2xvc2UnKTtcblxuICAgICAgICByZXR1cm4gZGVsYXkoNjAwKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucG9wRWwuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICAgICAgICAgdGhpcy5wb3BFbC5jbGFzc05hbWUgPSAnJztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcG9wdXAoe1xuICAgICAgICBzaGFyZWJsZSxcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIHRleHQsXG4gICAgICAgIGJnVHlwZSxcbiAgICAgICAgb25sZWZ0Y2xpY2ssXG4gICAgICAgIG9ucmlnaHRjbGljayxcbiAgICAgICAgb25jbG9zZWNsaWNrXG4gICAgfSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wb3BFbC5zdHlsZS5kaXNwbGF5ID0gJyc7XG5cbiAgICAgICAgICAgIHRoaXMudGl0bGVFbC50ZXh0Q29udGVudCA9IHRpdGxlO1xuICAgICAgICAgICAgdGhpcy50ZXh0RWwuaW5uZXJIVE1MID0gdGV4dDtcbiAgICAgICAgICAgIHRoaXMucG9wRWwuY2xhc3NOYW1lICs9IGAgIGJnJHtiZ1R5cGV9YDtcblxuICAgICAgICAgICAgaWYgKHNoYXJlYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3BFbC5jbGFzc05hbWUgKz0gYCBzaGFyZWJsZWA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXIgPSAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxlZnRCdG5FbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0YXAnLCBvbkxlZnRDbGljayk7XG4gICAgICAgICAgICAgICAgdGhpcy5yaWdodEJ0bkVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RhcCcsIG9uUmlnaHRDbGljayk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbG9zZUVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RhcCcsIG9uQ2xvc2VDbGljayk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBvbkxlZnRDbGljayhlKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcihlKS50aGVuKCgpID0+IG9ubGVmdGNsaWNrICYmIG9ubGVmdGNsaWNrKCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmxlZnRCdG5FbC5hZGRFdmVudExpc3RlbmVyKCd0YXAnLCBvbkxlZnRDbGljayk7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uUmlnaHRDbGljayhlKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcihlKS50aGVuKCgpID0+IG9ucmlnaHRjbGljayAmJiBvbnJpZ2h0Y2xpY2soKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucmlnaHRCdG5FbC5hZGRFdmVudExpc3RlbmVyKCd0YXAnLCBvblJpZ2h0Q2xpY2spO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBvbkNsb3NlQ2xpY2soZSkge1xuICAgICAgICAgICAgICAgIGhhbmRsZXIoZSkudGhlbigoKSA9PiBvbmNsb3NlY2xpY2sgJiYgb25jbG9zZWNsaWNrKCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNsb3NlRWwuYWRkRXZlbnRMaXN0ZW5lcigndGFwJywgb25DbG9zZUNsaWNrKTtcblxuICAgICAgICAgICAgcmFmKCgpID0+IHRoaXMucG9wRWwuY2xhc3NOYW1lICs9ICcgb3BlbicpO1xuXG4gICAgICAgICAgICBkZWxheSg0MDApLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudEVsLnN0eWxlLnZpc2liaWxpdHkgPSAnJztcbiAgICAgICAgICAgICAgICB0aGlzLmJ0bnNFbC5zdHlsZS52aXNpYmlsaXR5ID0gJyc7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcG9wLmpzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL3BvcC5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjEzLjFAc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL3BvcC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL3BvcC5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3BvcC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDE3MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiI3BvcCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGVmdDogMDtcXG4gICAgdG9wOiAwO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNik7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDk5OTlweCk7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgICAtd2Via2l0LWJveC1wYWNrOiBjZW50ZXI7XFxuICAgIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbiNwb3AgLndyYXAge1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4jcG9wIC5wb3BQYW5lbCB7XFxuICAgIHdpZHRoOiA1MCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDIwMCUgMTAwJTtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuI3BvcC5zaGFyZWJsZSAucG9wUGFuZWwge1xcbiAgICBoZWlnaHQ6IDg4JTtcXG59XFxuXFxuI3BvcCAucG9wUGFuZWwubGVmdCB7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHRvcDogMDtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogLTEwMCUgMDtcXG59XFxuXFxuI3BvcCAucG9wUGFuZWwucmlnaHQge1xcbiAgICByaWdodDogMDtcXG4gICAgdG9wOiAwO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAyMDAlIDA7XFxufVxcblxcbiNwb3Aub3BlbiAucG9wUGFuZWwubGVmdCB7XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBvcGVubGVmdHdpbiAwLjRzIGVhc2Utb3V0IDBzIGZvcndhcmRzO1xcbn1cXG5cXG4jcG9wLm9wZW4gLnBvcFBhbmVsLnJpZ2h0IHtcXG4gICAgLXdlYmtpdC1hbmltYXRpb246IG9wZW5yaWdodHdpbiAwLjRzIGVhc2Utb3V0IDBzIGZvcndhcmRzO1xcbn1cXG5cXG4jcG9wLmNsb3NlIC5wb3BQYW5lbC5sZWZ0IHtcXG4gICAgLXdlYmtpdC1hbmltYXRpb246IGNsb3NlbGVmdHdpbiAwLjRzIGVhc2UtaW4gMHMgZm9yd2FyZHM7XFxufVxcblxcbiNwb3AuY2xvc2UgLnBvcFBhbmVsLnJpZ2h0IHtcXG4gICAgLXdlYmtpdC1hbmltYXRpb246IGNsb3NlcmlnaHR3aW4gMC40cyBlYXNlLWluIDBzIGZvcndhcmRzO1xcbn1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgb3BlbmxlZnR3aW4ge1xcbiAgICAwJSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAtMTAwJSAwO1xcbiAgICB9XFxuXFxuICAgIDEwMCUge1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwO1xcbiAgICB9XFxufVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBvcGVucmlnaHR3aW4ge1xcbiAgICAwJSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAyMDAlIDA7XFxuICAgIH1cXG5cXG4gICAgMTAwJSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAxMDAlIDA7XFxuICAgIH1cXG59XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIGNsb3NlbGVmdHdpbiB7XFxuICAgIDAlIHtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMDtcXG4gICAgfVxcblxcbiAgICAxMDAlIHtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IC0xMDAlIDA7XFxuICAgIH1cXG59XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIGNsb3NlcmlnaHR3aW4ge1xcbiAgICAwJSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAxMDAlIDA7XFxuICAgIH1cXG5cXG4gICAgMTAwJSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAyMDAlIDA7XFxuICAgIH1cXG59XFxuXFxuI3BvcCAuY29udGVudCB7XFxuICAgIHdpZHRoOiA4LjUzcmVtO1xcbiAgICBoZWlnaHQ6IDcuODRyZW07XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuI3BvcCAucG9wQmcxIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMy4zNnJlbTtcXG4gICAgaGVpZ2h0OiAyLjkycmVtO1xcbiAgICByaWdodDogNXB4O1xcbiAgICBib3R0b206IDJweDtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxufVxcblxcbiNwb3AuYmcxIC5wb3BCZzEge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuI3BvcCAucG9wQmcyIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogNC4zNnJlbTtcXG4gICAgaGVpZ2h0OiAzLjM0NnJlbTtcXG4gICAgcmlnaHQ6IDVweDtcXG4gICAgYm90dG9tOiAycHg7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMDtcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xcbn1cXG5cXG4jcG9wLmJnMiAucG9wQmcyIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbiNwb3AgLnBvcEJnMyB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDQuNjI2cmVtO1xcbiAgICBoZWlnaHQ6IDMuNTA2cmVtO1xcbiAgICByaWdodDogNXB4O1xcbiAgICBib3R0b206IDJweDtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxufVxcblxcbiNwb3AuYmczIC5wb3BCZzMge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuI3BvcCAucG9wVGlwMSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGVmdDogMC40NjdyZW07XFxuICAgIHRvcDogMS4xcmVtO1xcbiAgICB3aWR0aDogMS44NjdyZW07XFxuICAgIGhlaWdodDogMXJlbTtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAxcmVtO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiB0eXBldGV4dDEgMS41cyBsaW5lYXIgMHMgaW5maW5pdGU7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyB0eXBldGV4dDEge1xcbiAgICAwJSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTAwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDFyZW07XFxuICAgIH1cXG5cXG4gICAgMTYlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMDAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMXJlbTtcXG4gICAgfVxcbiAgICAxNi42NjclIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC04My4zMzMlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC44MzNyZW07XFxuICAgIH1cXG5cXG4gICAgMzMlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC04My4zMzMlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC44MzNyZW07XFxuICAgIH1cXG4gICAgMzMuMzMzJSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNjYuNjY2JSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuNjY2cmVtO1xcbiAgICB9XFxuXFxuICAgIDQ5Ljk5OSUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTY2LjY2NiUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjY2NnJlbTtcXG4gICAgfVxcbiAgICA1MCUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuNXJlbTtcXG4gICAgfVxcblxcbiAgICA2NiUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuNXJlbTtcXG4gICAgfVxcbiAgICA2Ni42NjYlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMy4zMzMlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC4zMzNyZW07XFxuICAgIH1cXG5cXG4gICAgODMlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMy4zMzMlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC4zMzNyZW07XFxuICAgIH1cXG4gICAgODMuMzMzJSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTYuNjY3JSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuMTY3cmVtO1xcbiAgICB9XFxuXFxuICAgIDk5Ljk5OSUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTE2LjY2NyUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjE2N3JlbTtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMDtcXG4gICAgfVxcbn1cXG5cXG5cXG4jcG9wIC5wb3BUaXAyIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiAwLjQ2N3JlbTtcXG4gICAgdG9wOiA0LjY4cmVtO1xcbiAgICB3aWR0aDogMS44NjdyZW07XFxuICAgIGhlaWdodDogMS41NzNyZW07XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMS41NzNyZW07XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXG4gICAgLXdlYmtpdC1hbmltYXRpb246IHR5cGV0ZXh0MiAycyBsaW5lYXIgMHMgaW5maW5pdGU7XFxufVxcblxcblxcbkAtd2Via2l0LWtleWZyYW1lcyB0eXBldGV4dDIge1xcbiAgICAwJSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTAwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDEuNTczcmVtO1xcbiAgICB9XFxuXFxuICAgIDkuOTk5JSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTAwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDEuNTczcmVtO1xcbiAgICB9XFxuICAgIDEwJSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtOTAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMS40MTVyZW07XFxuICAgIH1cXG5cXG4gICAgMTkuOTk5JSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtOTAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMS40MTVyZW07XFxuICAgIH1cXG4gICAgMjAlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC04MCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAxLjI1OHJlbTtcXG4gICAgfVxcblxcbiAgICAyOS45OTklIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC04MCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAxLjI1OHJlbTtcXG4gICAgfVxcbiAgICAzMCUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTcwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDEuMTAxcmVtO1xcbiAgICB9XFxuXFxuICAgIDM5Ljk5OSUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTcwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDEuMTAxcmVtO1xcbiAgICB9XFxuICAgIDQwJSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNjAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC45NDM4cmVtO1xcbiAgICB9XFxuXFxuICAgIDQ5Ljk5OSUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTYwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuOTQzOHJlbTtcXG4gICAgfVxcbiAgICA1MCUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuNzg2NXJlbTtcXG4gICAgfVxcblxcbiAgICA1OS45OTklIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjc4NjVyZW07XFxuICAgIH1cXG4gICAgNjAlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC00MCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjYyOTJyZW07XFxuICAgIH1cXG5cXG4gICAgNjkuOTk5JSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNDAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC42MjkycmVtO1xcbiAgICB9XFxuICAgIDcwJSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMzAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC40NzE5cmVtO1xcbiAgICB9XFxuXFxuICAgIDc5Ljk5OSUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTMwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuNDcxOXJlbTtcXG4gICAgfVxcbiAgICA4MCUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTIwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuMzE0NnJlbTtcXG4gICAgfVxcblxcbiAgICA4OS45OTklIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0yMCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjMxNDZyZW07XFxuICAgIH1cXG4gICAgOTAlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjE1NzNyZW07XFxuICAgIH1cXG5cXG4gICAgOTkuOTk5JSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC4xNTczcmVtO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XFxuICAgIH1cXG59XFxuXFxuI3BvcCAucG9wSWNvbiB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGVmdDogMC40cmVtO1xcbiAgICB0b3A6IDIuMjI2cmVtO1xcbiAgICB3aWR0aDogMS44cmVtO1xcbiAgICBoZWlnaHQ6IDIuMjUzcmVtO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogMy42cmVtIDIuMjUzcmVtO1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogc3ByaXRlcyAxcyBsaW5lYXIgMHMgaW5maW5pdGU7XFxufVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBzcHJpdGVzIHtcXG4gICAgMCUge1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwO1xcbiAgICB9XFxuXFxuICAgIDQ5Ljk5OSUge1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwO1xcbiAgICB9XFxuXFxuICAgIDUwJSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAtMS44cmVtIDA7XFxuICAgIH1cXG5cXG4gICAgMTAwJSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAtMS44cmVtIDA7XFxuICAgIH0gXFxufVxcblxcbiNwb3AgLnRpdGxlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogNXJlbTtcXG4gICAgbGVmdDogMi40cmVtO1xcbiAgICB0b3A6IDEuMjkzcmVtO1xcbiAgICBmb250LXNpemU6IDE4cHg7XFxuICAgIGNvbG9yOiAjRkZGO1xcbiAgICB0ZXh0LXNoYWRvdzpcXG4gICAgICAgIDJweCAwIDJweCByZ2JhKDAsIDIwMywgMjI3LCAwLjMpLFxcbiAgICAgICAgMCAycHggMnB4IHJnYmEoMCwgMjAzLCAyMjcsIDAuMyksIFxcbiAgICAgICAgMCAtMnB4IDJweCByZ2JhKDAsIDIwMywgMjI3LCAwLjMpLFxcbiAgICAgICAgLTJweCAwIDJweCByZ2JhKDAsIDIwMywgMjI3LCAwLjMpO1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbn1cXG5cXG4jcG9wIC50ZXh0IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogNXJlbTtcXG4gICAgbGVmdDogMi40cmVtO1xcbiAgICB0b3A6IDIuMjg2cmVtO1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxuICAgIGNvbG9yOiAjMDBjYmUzO1xcbiAgICB0ZXh0LXNoYWRvdzpcXG4gICAgICAgIDFweCAwIDFweCByZ2JhKDAsIDIwMywgMjI3LCAwLjMpLFxcbiAgICAgICAgMCAxcHggMXB4IHJnYmEoMCwgMjAzLCAyMjcsIDAuMyksIFxcbiAgICAgICAgMCAtMXB4IDFweCByZ2JhKDAsIDIwMywgMjI3LCAwLjMpLFxcbiAgICAgICAgLTFweCAwIDFweCByZ2JhKDAsIDIwMywgMjI3LCAwLjMpO1xcbn1cXG5cXG4jcG9wIC5wb3BDbG9zZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGVmdDogMDtcXG4gICAgYm90dG9tOiAwLjU0NnJlbTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMS4ycmVtO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEuMnJlbSAxLjJyZW07XFxufVxcblxcbiNwb3Auc2hhcmVibGUgLnBvcENsb3NlIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuI3BvcCAuYnRucyB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICAtd2Via2l0LWJveC1wYWNrOiBjZW50ZXI7XFxuICAgIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7IFxcbiAgICBwYWRkaW5nLXRvcDogMC41cmVtO1xcbn1cXG5cXG4jcG9wLnNoYXJlYmxlIC5idG5ze1xcbiAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG59XFxuXFxuI3BvcCAucG9wQnRuIHtcXG4gICAgd2lkdGg6IDIuNjhyZW07XFxuICAgIGhlaWdodDogMC43NzNyZW07XFxuICAgIGxpbmUtaGVpZ2h0OiAwLjc3M3JlbTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBjb2xvcjogI0ZGRjtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxuICAgIG1hcmdpbjogMCAwLjRyZW07XFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4yNS4wQGNzcy1sb2FkZXIhLi9zcmMvcG9wLmNzc1xuLy8gbW9kdWxlIGlkID0gMTczXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAnLi90aXAuY3NzJztcbmltcG9ydCB7XG4gICAgd2luLFxuICAgIGRvYyxcbiAgICBQcm9taXNlLFxuICAgIHF1ZXJ5LFxuICAgIHF1ZXJ5QWxsLFxuICAgIGdldFJlY3QsXG4gICAgZ2V0RGlzdGFuY2UsXG4gICAgcmFmLFxuICAgIGRlbGF5XG59IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpcCB7XG4gICAgY29uc3RydWN0b3Iodmlld3BvcnQpIHtcbiAgICAgICAgdGhpcy50aXBFbCA9IHF1ZXJ5KHZpZXdwb3J0LCAnI3RpcCcpO1xuICAgIH1cblxuICAgIHNob3coe1xuICAgICAgICB0aXAsXG4gICAgICAgIGJnVHlwZVxuICAgIH0pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMudGlwRWwuY2xhc3NOYW1lID0gJ3RpcCBvcGVuJztcblxuICAgICAgICAgICAgZGVsYXkoNDAwKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aXBFbC5jbGFzc05hbWUgPSBgdGlwIG9wZW4gYmcke2JnVHlwZX1gO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHRFbC5pbm5lckhUTUwgPSB0aXA7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWxheSg1MDAwKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aXBFbC5jbGFzc05hbWUgPSAndGlwIGNsb3NlJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0RWwuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWxheSg0MDApO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpcEVsLmNsYXNzTmFtZSA9ICd0aXAnO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVhZHkoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRleHRFbCA9IHF1ZXJ5KHRoaXMudGlwRWwsICdwJyk7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdGlwLmpzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL3RpcC5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjEzLjFAc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL3RpcC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL3RpcC5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3RpcC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDE3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiI3RpcCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgcmlnaHQ6IDAuNzIzNXJlbTtcXG4gICAgdG9wOiAxLjFyZW07XFxuICAgIHdpZHRoOiAwO1xcbiAgICBoZWlnaHQ6IDA7XFxuICAgIGZvbnQtc2l6ZTogMDtcXG4gICAgYm9yZGVyOiAwcHggc29saWQgIzAwZGRmMTtcXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDk5OTlweCk7XFxuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogd2lkdGggMC40cyBlYXNlLWluIDBzLFxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodCAwLjRzIGVhc2UtaW4gMHM7XFxuICAgIG92ZXJmbG93OiB2aXNpYmxlO1xcbn1cXG5cXG4jdGlwLm9wZW4ge1xcbiAgICB3aWR0aDogOC41NTNyZW07XFxuICAgIGhlaWdodDogMS44NjZyZW07XFxuICAgIGJvcmRlci13aWR0aDogMXB4O1xcbn1cXG5cXG4jdGlwLmNsb3NlIHtcXG4gICAgYm9yZGVyLXdpZHRoOiAxcHg7XFxufVxcblxcbiN0aXAgcCB7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGxpbmUtaGVpZ2h0OiAxLjJlbTtcXG4gICAgZm9udC1zaXplOiAxMnB4O1xcbiAgICBjb2xvcjogIzAwZGRmMTtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgcGFkZGluZy1sZWZ0OiAxMiU7XFxuICAgIHBhZGRpbmctdG9wOiA2JTtcXG4gICAgcGFkZGluZy1yaWdodDogMzAlO1xcbiAgICBtYXJnaW46IDA7XFxuXFxufVxcblxcbiN0aXAgLmJnIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgcmlnaHQ6IDA7XFxuICAgIHRvcDogMDtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjsgXFxufVxcblxcbiN0aXAgLnRpcEJnMSB7XFxuICAgIHdpZHRoOiAyLjg5MjRyZW07XFxuICAgIGhlaWdodDogMi41MnJlbTtcXG59XFxuXFxuI3RpcCAudGlwQmcyIHtcXG4gICAgd2lkdGg6IDIuNzAzNnJlbTtcXG4gICAgaGVpZ2h0OiAyLjMzNTJyZW07XFxufVxcblxcbiN0aXAuYmcxIC50aXBCZzEge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuI3RpcC5iZzIgLnRpcEJnMiB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMjUuMEBjc3MtbG9hZGVyIS4vc3JjL3RpcC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDE3NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgJy4vc2hhcmUuY3NzJztcbmltcG9ydCB4aHIgZnJvbSAneGhyJztcbmltcG9ydCB7XG4gICAgd2luLFxuICAgIGRvYyxcbiAgICBQcm9taXNlLFxuICAgIHF1ZXJ5LFxuICAgIHF1ZXJ5QWxsLFxuICAgIGdldFJlY3QsXG4gICAgZ2V0RGlzdGFuY2UsXG4gICAgcmFmLFxuICAgIGRlbGF5XG59IGZyb20gJy4vdXRpbCc7XG5cbmZ1bmN0aW9uIGNyZWF0ZUNPUlNSZXF1ZXN0KG1ldGhvZCwgdXJsKSB7XG4gIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICBpZiAoXCJ3aXRoQ3JlZGVudGlhbHNcIiBpbiB4aHIpIHtcbiAgICAvLyBYSFIgZm9yIENocm9tZS9GaXJlZm94L09wZXJhL1NhZmFyaS5cbiAgICB4aHIub3BlbihtZXRob2QsIHVybCwgdHJ1ZSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gQ09SUyBub3Qgc3VwcG9ydGVkLlxuICAgIHhociA9IG51bGw7XG4gIH1cbiAgcmV0dXJuIHhocjtcbn1cblxuZnVuY3Rpb24gbWFrZUNvcnNSZXF1ZXN0KG1ldGhvZCwgdXJsKSB7XG4gIC8vIFRoaXMgaXMgYSBzYW1wbGUgc2VydmVyIHRoYXQgc3VwcG9ydHMgQ09SUy5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHhociA9IGNyZWF0ZUNPUlNSZXF1ZXN0KG1ldGhvZCwgdXJsKTtcblxuICAgICAgaWYgKCF4aHIpIHtcbiAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUmVzcG9uc2UgaGFuZGxlcnMuXG4gICAgICB4aHIub25sb2FkID0gKCkgPT4gcmVzb2x2ZSh4aHIpXG4gICAgICB4aHIub25lcnJvciA9ICgpID0+IHJlamVjdCh4aHIpO1xuICAgICAgeGhyLnNlbmQoKTtcbiAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hhcmUge1xuICAgIGNvbnN0cnVjdG9yKHZpZXdwb3J0KSB7XG4gICAgICAgIHRoaXMuc2hhcmVFbCA9IHF1ZXJ5KHZpZXdwb3J0LCAnI3NoYXJlJyk7XG4gICAgICAgIHRoaXMud3hSZWFkeSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHNoYXJlV3goe1xuICAgICAgICB0aXRsZSxcbiAgICAgICAgZGVzYyxcbiAgICAgICAgbGluayxcbiAgICAgICAgaW1nVXJsXG4gICAgfSkge1xuICAgICAgICBpZiAodGhpcy53eFJlYWR5KSB7XG4gICAgICAgICAgICB3eC5vbk1lbnVTaGFyZVRpbWVsaW5lKHtcbiAgICAgICAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICAgICAgICBsaW5rLFxuICAgICAgICAgICAgICAgIGltZ1VybCxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBhbGVydCgnc3VjY2VzcycpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjYW5jZWw6IChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGFsZXJ0KEpTT04uc3RyaW5naWZ5KGUpKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB3eC5vbk1lbnVTaGFyZUFwcE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHRpdGxlLCAvLyDliIbkuqvmoIfpophcbiAgICAgICAgICAgICAgICBkZXNjLCAvLyDliIbkuqvmj4/ov7BcbiAgICAgICAgICAgICAgICBsaW5rLCAvLyDliIbkuqvpk77mjqVcbiAgICAgICAgICAgICAgICBpbWdVcmwsIC8vIOWIhuS6q+Wbvuagh1xuICAgICAgICAgICAgICAgIHR5cGU6ICdsaW5rJywgLy8g5YiG5Lqr57G75Z6LLG11c2lj44CBdmlkZW/miJZsaW5r77yM5LiN5aGr6buY6K6k5Li6bGlua1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGFsZXJ0KCdzdWNjZXNzJylcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNhbmNlbDogKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYWxlcnQoSlNPTi5zdHJpbmdpZnkoZSkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93KHtcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGRlc2MsXG4gICAgICAgIGxpbmssXG4gICAgICAgIGltZ1VybFxuICAgIH0pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGhpZGUgPSBlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNoYXJlRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndGFwJywgaGlkZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGFyZUVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNoYXJlRWwuYWRkRXZlbnRMaXN0ZW5lcigndGFwJywgaGlkZSk7XG4gICAgICAgICAgICB0aGlzLnNoYXJlRWwuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZWFkeSgpIHtcbiAgICAgICAgY29uc3QgbWV0aG9kID0gJ0dFVCc7XG4gICAgICAgIGNvbnN0IHVybCA9ICd3eC5waHAnO1xuICAgICAgICAvLyBjb25zdCB1cmwgPSAnaHR0cDovLzEyMC43Ni4yMTUuMTU1L3RncC9zcGFjZS93eC5waHAnO1xuXG4gICAgICAgIHJldHVybiBtYWtlQ29yc1JlcXVlc3QobWV0aG9kLCBgJHt1cmx9P21ldGhvZD1jYWxjdWxhdGVgKSAgXG4gICAgICAgICAgICAudGhlbigoeGhyKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gZGVidWdnZXJcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZyA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaChlKSB7fVxuXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ1xuICAgICAgICAgICAgICAgICAgICAgICAgJiYgKGNvbmZpZy5zdWNjZXNzID09PSB0cnVlIHx8IGNvbmZpZy5zdWNlc3MgPT09ICd0cnVlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLmRhdGEuanNBcGlMaXN0ID0gWydvbk1lbnVTaGFyZVRpbWVsaW5lJywgJ29uTWVudVNoYXJlQXBwTWVzc2FnZSddO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgd3guY29uZmlnKGNvbmZpZy5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHd4LnJlYWR5KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhbGVydCgnd3ggcmVhZHknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnd4UmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgd3guZXJyb3IoKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhbGVydCgnd3ggbm90IHJlYWR5Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWxlcnQoSlNPTi5zdHJpbmdpZnkoZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud3hSZWFkeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCh4aHIgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMud3ZSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NoYXJlLmpzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL3NoYXJlLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi8uLi9ub2RlX21vZHVsZXMvLjAuMTMuMUBzdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vc2hhcmUuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvaW5kZXguanMhLi9zaGFyZS5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3NoYXJlLmNzc1xuLy8gbW9kdWxlIGlkID0gMTc4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIjc2hhcmUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHRvcDogMDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjgpO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiByaWdodCB0b3A7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDk5OTlweCk7XFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4yNS4wQGNzcy1sb2FkZXIhLi9zcmMvc2hhcmUuY3NzXG4vLyBtb2R1bGUgaWQgPSAxNzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgd2luZG93ID0gcmVxdWlyZShcImdsb2JhbC93aW5kb3dcIilcbnZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZShcImlzLWZ1bmN0aW9uXCIpXG52YXIgcGFyc2VIZWFkZXJzID0gcmVxdWlyZShcInBhcnNlLWhlYWRlcnNcIilcbnZhciB4dGVuZCA9IHJlcXVpcmUoXCJ4dGVuZFwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVhIUlxuY3JlYXRlWEhSLlhNTEh0dHBSZXF1ZXN0ID0gd2luZG93LlhNTEh0dHBSZXF1ZXN0IHx8IG5vb3BcbmNyZWF0ZVhIUi5YRG9tYWluUmVxdWVzdCA9IFwid2l0aENyZWRlbnRpYWxzXCIgaW4gKG5ldyBjcmVhdGVYSFIuWE1MSHR0cFJlcXVlc3QoKSkgPyBjcmVhdGVYSFIuWE1MSHR0cFJlcXVlc3QgOiB3aW5kb3cuWERvbWFpblJlcXVlc3RcblxuZm9yRWFjaEFycmF5KFtcImdldFwiLCBcInB1dFwiLCBcInBvc3RcIiwgXCJwYXRjaFwiLCBcImhlYWRcIiwgXCJkZWxldGVcIl0sIGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgIGNyZWF0ZVhIUlttZXRob2QgPT09IFwiZGVsZXRlXCIgPyBcImRlbFwiIDogbWV0aG9kXSA9IGZ1bmN0aW9uKHVyaSwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICAgICAgb3B0aW9ucyA9IGluaXRQYXJhbXModXJpLCBvcHRpb25zLCBjYWxsYmFjaylcbiAgICAgICAgb3B0aW9ucy5tZXRob2QgPSBtZXRob2QudG9VcHBlckNhc2UoKVxuICAgICAgICByZXR1cm4gX2NyZWF0ZVhIUihvcHRpb25zKVxuICAgIH1cbn0pXG5cbmZ1bmN0aW9uIGZvckVhY2hBcnJheShhcnJheSwgaXRlcmF0b3IpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGl0ZXJhdG9yKGFycmF5W2ldKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNFbXB0eShvYmope1xuICAgIGZvcih2YXIgaSBpbiBvYmope1xuICAgICAgICBpZihvYmouaGFzT3duUHJvcGVydHkoaSkpIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxufVxuXG5mdW5jdGlvbiBpbml0UGFyYW1zKHVyaSwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICB2YXIgcGFyYW1zID0gdXJpXG5cbiAgICBpZiAoaXNGdW5jdGlvbihvcHRpb25zKSkge1xuICAgICAgICBjYWxsYmFjayA9IG9wdGlvbnNcbiAgICAgICAgaWYgKHR5cGVvZiB1cmkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHBhcmFtcyA9IHt1cmk6dXJpfVxuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcGFyYW1zID0geHRlbmQob3B0aW9ucywge3VyaTogdXJpfSlcbiAgICB9XG5cbiAgICBwYXJhbXMuY2FsbGJhY2sgPSBjYWxsYmFja1xuICAgIHJldHVybiBwYXJhbXNcbn1cblxuZnVuY3Rpb24gY3JlYXRlWEhSKHVyaSwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICBvcHRpb25zID0gaW5pdFBhcmFtcyh1cmksIG9wdGlvbnMsIGNhbGxiYWNrKVxuICAgIHJldHVybiBfY3JlYXRlWEhSKG9wdGlvbnMpXG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVYSFIob3B0aW9ucykge1xuICAgIGlmKHR5cGVvZiBvcHRpb25zLmNhbGxiYWNrID09PSBcInVuZGVmaW5lZFwiKXtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2FsbGJhY2sgYXJndW1lbnQgbWlzc2luZ1wiKVxuICAgIH1cblxuICAgIHZhciBjYWxsZWQgPSBmYWxzZVxuICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uIGNiT25jZShlcnIsIHJlc3BvbnNlLCBib2R5KXtcbiAgICAgICAgaWYoIWNhbGxlZCl7XG4gICAgICAgICAgICBjYWxsZWQgPSB0cnVlXG4gICAgICAgICAgICBvcHRpb25zLmNhbGxiYWNrKGVyciwgcmVzcG9uc2UsIGJvZHkpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWFkeXN0YXRlY2hhbmdlKCkge1xuICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgIGxvYWRGdW5jKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEJvZHkoKSB7XG4gICAgICAgIC8vIENocm9tZSB3aXRoIHJlcXVlc3RUeXBlPWJsb2IgdGhyb3dzIGVycm9ycyBhcnJvdW5kIHdoZW4gZXZlbiB0ZXN0aW5nIGFjY2VzcyB0byByZXNwb25zZVRleHRcbiAgICAgICAgdmFyIGJvZHkgPSB1bmRlZmluZWRcblxuICAgICAgICBpZiAoeGhyLnJlc3BvbnNlKSB7XG4gICAgICAgICAgICBib2R5ID0geGhyLnJlc3BvbnNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBib2R5ID0geGhyLnJlc3BvbnNlVGV4dCB8fCBnZXRYbWwoeGhyKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzSnNvbikge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBib2R5ID0gSlNPTi5wYXJzZShib2R5KVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBib2R5XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXJyb3JGdW5jKGV2dCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dFRpbWVyKVxuICAgICAgICBpZighKGV2dCBpbnN0YW5jZW9mIEVycm9yKSl7XG4gICAgICAgICAgICBldnQgPSBuZXcgRXJyb3IoXCJcIiArIChldnQgfHwgXCJVbmtub3duIFhNTEh0dHBSZXF1ZXN0IEVycm9yXCIpIClcbiAgICAgICAgfVxuICAgICAgICBldnQuc3RhdHVzQ29kZSA9IDBcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGV2dCwgZmFpbHVyZVJlc3BvbnNlKVxuICAgIH1cblxuICAgIC8vIHdpbGwgbG9hZCB0aGUgZGF0YSAmIHByb2Nlc3MgdGhlIHJlc3BvbnNlIGluIGEgc3BlY2lhbCByZXNwb25zZSBvYmplY3RcbiAgICBmdW5jdGlvbiBsb2FkRnVuYygpIHtcbiAgICAgICAgaWYgKGFib3J0ZWQpIHJldHVyblxuICAgICAgICB2YXIgc3RhdHVzXG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0VGltZXIpXG4gICAgICAgIGlmKG9wdGlvbnMudXNlWERSICYmIHhoci5zdGF0dXM9PT11bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vSUU4IENPUlMgR0VUIHN1Y2Nlc3NmdWwgcmVzcG9uc2UgZG9lc24ndCBoYXZlIGEgc3RhdHVzIGZpZWxkLCBidXQgYm9keSBpcyBmaW5lXG4gICAgICAgICAgICBzdGF0dXMgPSAyMDBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0YXR1cyA9ICh4aHIuc3RhdHVzID09PSAxMjIzID8gMjA0IDogeGhyLnN0YXR1cylcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzcG9uc2UgPSBmYWlsdXJlUmVzcG9uc2VcbiAgICAgICAgdmFyIGVyciA9IG51bGxcblxuICAgICAgICBpZiAoc3RhdHVzICE9PSAwKXtcbiAgICAgICAgICAgIHJlc3BvbnNlID0ge1xuICAgICAgICAgICAgICAgIGJvZHk6IGdldEJvZHkoKSxcbiAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiBzdGF0dXMsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge30sXG4gICAgICAgICAgICAgICAgdXJsOiB1cmksXG4gICAgICAgICAgICAgICAgcmF3UmVxdWVzdDogeGhyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKXsgLy9yZW1lbWJlciB4aHIgY2FuIGluIGZhY3QgYmUgWERSIGZvciBDT1JTIGluIElFXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuaGVhZGVycyA9IHBhcnNlSGVhZGVycyh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlcnIgPSBuZXcgRXJyb3IoXCJJbnRlcm5hbCBYTUxIdHRwUmVxdWVzdCBFcnJvclwiKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIsIHJlc3BvbnNlLCByZXNwb25zZS5ib2R5KVxuICAgIH1cblxuICAgIHZhciB4aHIgPSBvcHRpb25zLnhociB8fCBudWxsXG5cbiAgICBpZiAoIXhocikge1xuICAgICAgICBpZiAob3B0aW9ucy5jb3JzIHx8IG9wdGlvbnMudXNlWERSKSB7XG4gICAgICAgICAgICB4aHIgPSBuZXcgY3JlYXRlWEhSLlhEb21haW5SZXF1ZXN0KClcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB4aHIgPSBuZXcgY3JlYXRlWEhSLlhNTEh0dHBSZXF1ZXN0KClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBrZXlcbiAgICB2YXIgYWJvcnRlZFxuICAgIHZhciB1cmkgPSB4aHIudXJsID0gb3B0aW9ucy51cmkgfHwgb3B0aW9ucy51cmxcbiAgICB2YXIgbWV0aG9kID0geGhyLm1ldGhvZCA9IG9wdGlvbnMubWV0aG9kIHx8IFwiR0VUXCJcbiAgICB2YXIgYm9keSA9IG9wdGlvbnMuYm9keSB8fCBvcHRpb25zLmRhdGEgfHwgbnVsbFxuICAgIHZhciBoZWFkZXJzID0geGhyLmhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnMgfHwge31cbiAgICB2YXIgc3luYyA9ICEhb3B0aW9ucy5zeW5jXG4gICAgdmFyIGlzSnNvbiA9IGZhbHNlXG4gICAgdmFyIHRpbWVvdXRUaW1lclxuICAgIHZhciBmYWlsdXJlUmVzcG9uc2UgPSB7XG4gICAgICAgIGJvZHk6IHVuZGVmaW5lZCxcbiAgICAgICAgaGVhZGVyczoge30sXG4gICAgICAgIHN0YXR1c0NvZGU6IDAsXG4gICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICB1cmw6IHVyaSxcbiAgICAgICAgcmF3UmVxdWVzdDogeGhyXG4gICAgfVxuXG4gICAgaWYgKFwianNvblwiIGluIG9wdGlvbnMgJiYgb3B0aW9ucy5qc29uICE9PSBmYWxzZSkge1xuICAgICAgICBpc0pzb24gPSB0cnVlXG4gICAgICAgIGhlYWRlcnNbXCJhY2NlcHRcIl0gfHwgaGVhZGVyc1tcIkFjY2VwdFwiXSB8fCAoaGVhZGVyc1tcIkFjY2VwdFwiXSA9IFwiYXBwbGljYXRpb24vanNvblwiKSAvL0Rvbid0IG92ZXJyaWRlIGV4aXN0aW5nIGFjY2VwdCBoZWFkZXIgZGVjbGFyZWQgYnkgdXNlclxuICAgICAgICBpZiAobWV0aG9kICE9PSBcIkdFVFwiICYmIG1ldGhvZCAhPT0gXCJIRUFEXCIpIHtcbiAgICAgICAgICAgIGhlYWRlcnNbXCJjb250ZW50LXR5cGVcIl0gfHwgaGVhZGVyc1tcIkNvbnRlbnQtVHlwZVwiXSB8fCAoaGVhZGVyc1tcIkNvbnRlbnQtVHlwZVwiXSA9IFwiYXBwbGljYXRpb24vanNvblwiKSAvL0Rvbid0IG92ZXJyaWRlIGV4aXN0aW5nIGFjY2VwdCBoZWFkZXIgZGVjbGFyZWQgYnkgdXNlclxuICAgICAgICAgICAgYm9keSA9IEpTT04uc3RyaW5naWZ5KG9wdGlvbnMuanNvbiA9PT0gdHJ1ZSA/IGJvZHkgOiBvcHRpb25zLmpzb24pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gcmVhZHlzdGF0ZWNoYW5nZVxuICAgIHhoci5vbmxvYWQgPSBsb2FkRnVuY1xuICAgIHhoci5vbmVycm9yID0gZXJyb3JGdW5jXG4gICAgLy8gSUU5IG11c3QgaGF2ZSBvbnByb2dyZXNzIGJlIHNldCB0byBhIHVuaXF1ZSBmdW5jdGlvbi5cbiAgICB4aHIub25wcm9ncmVzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gSUUgbXVzdCBkaWVcbiAgICB9XG4gICAgeGhyLm9uYWJvcnQgPSBmdW5jdGlvbigpe1xuICAgICAgICBhYm9ydGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgeGhyLm9udGltZW91dCA9IGVycm9yRnVuY1xuICAgIHhoci5vcGVuKG1ldGhvZCwgdXJpLCAhc3luYywgb3B0aW9ucy51c2VybmFtZSwgb3B0aW9ucy5wYXNzd29yZClcbiAgICAvL2hhcyB0byBiZSBhZnRlciBvcGVuXG4gICAgaWYoIXN5bmMpIHtcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9ICEhb3B0aW9ucy53aXRoQ3JlZGVudGlhbHNcbiAgICB9XG4gICAgLy8gQ2Fubm90IHNldCB0aW1lb3V0IHdpdGggc3luYyByZXF1ZXN0XG4gICAgLy8gbm90IHNldHRpbmcgdGltZW91dCBvbiB0aGUgeGhyIG9iamVjdCwgYmVjYXVzZSBvZiBvbGQgd2Via2l0cyBldGMuIG5vdCBoYW5kbGluZyB0aGF0IGNvcnJlY3RseVxuICAgIC8vIGJvdGggbnBtJ3MgcmVxdWVzdCBhbmQganF1ZXJ5IDEueCB1c2UgdGhpcyBraW5kIG9mIHRpbWVvdXQsIHNvIHRoaXMgaXMgYmVpbmcgY29uc2lzdGVudFxuICAgIGlmICghc3luYyAmJiBvcHRpb25zLnRpbWVvdXQgPiAwICkge1xuICAgICAgICB0aW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpZiAoYWJvcnRlZCkgcmV0dXJuXG4gICAgICAgICAgICBhYm9ydGVkID0gdHJ1ZS8vSUU5IG1heSBzdGlsbCBjYWxsIHJlYWR5c3RhdGVjaGFuZ2VcbiAgICAgICAgICAgIHhoci5hYm9ydChcInRpbWVvdXRcIilcbiAgICAgICAgICAgIHZhciBlID0gbmV3IEVycm9yKFwiWE1MSHR0cFJlcXVlc3QgdGltZW91dFwiKVxuICAgICAgICAgICAgZS5jb2RlID0gXCJFVElNRURPVVRcIlxuICAgICAgICAgICAgZXJyb3JGdW5jKGUpXG4gICAgICAgIH0sIG9wdGlvbnMudGltZW91dCApXG4gICAgfVxuXG4gICAgaWYgKHhoci5zZXRSZXF1ZXN0SGVhZGVyKSB7XG4gICAgICAgIGZvcihrZXkgaW4gaGVhZGVycyl7XG4gICAgICAgICAgICBpZihoZWFkZXJzLmhhc093blByb3BlcnR5KGtleSkpe1xuICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgaGVhZGVyc1trZXldKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChvcHRpb25zLmhlYWRlcnMgJiYgIWlzRW1wdHkob3B0aW9ucy5oZWFkZXJzKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJIZWFkZXJzIGNhbm5vdCBiZSBzZXQgb24gYW4gWERvbWFpblJlcXVlc3Qgb2JqZWN0XCIpXG4gICAgfVxuXG4gICAgaWYgKFwicmVzcG9uc2VUeXBlXCIgaW4gb3B0aW9ucykge1xuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gb3B0aW9ucy5yZXNwb25zZVR5cGVcbiAgICB9XG5cbiAgICBpZiAoXCJiZWZvcmVTZW5kXCIgaW4gb3B0aW9ucyAmJlxuICAgICAgICB0eXBlb2Ygb3B0aW9ucy5iZWZvcmVTZW5kID09PSBcImZ1bmN0aW9uXCJcbiAgICApIHtcbiAgICAgICAgb3B0aW9ucy5iZWZvcmVTZW5kKHhocilcbiAgICB9XG5cbiAgICB4aHIuc2VuZChib2R5KVxuXG4gICAgcmV0dXJuIHhoclxuXG5cbn1cblxuZnVuY3Rpb24gZ2V0WG1sKHhocikge1xuICAgIGlmICh4aHIucmVzcG9uc2VUeXBlID09PSBcImRvY3VtZW50XCIpIHtcbiAgICAgICAgcmV0dXJuIHhoci5yZXNwb25zZVhNTFxuICAgIH1cbiAgICB2YXIgZmlyZWZveEJ1Z1Rha2VuRWZmZWN0ID0geGhyLnN0YXR1cyA9PT0gMjA0ICYmIHhoci5yZXNwb25zZVhNTCAmJiB4aHIucmVzcG9uc2VYTUwuZG9jdW1lbnRFbGVtZW50Lm5vZGVOYW1lID09PSBcInBhcnNlcmVycm9yXCJcbiAgICBpZiAoeGhyLnJlc3BvbnNlVHlwZSA9PT0gXCJcIiAmJiAhZmlyZWZveEJ1Z1Rha2VuRWZmZWN0KSB7XG4gICAgICAgIHJldHVybiB4aHIucmVzcG9uc2VYTUxcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbFxufVxuXG5mdW5jdGlvbiBub29wKCkge31cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi4zLjJAeGhyL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxODBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZ2xvYmFsO1xufSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIil7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBzZWxmO1xufSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHt9O1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly40LjMuMUBnbG9iYWwvd2luZG93LmpzXG4vLyBtb2R1bGUgaWQgPSAxODFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBpc0Z1bmN0aW9uXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcblxuZnVuY3Rpb24gaXNGdW5jdGlvbiAoZm4pIHtcbiAgdmFyIHN0cmluZyA9IHRvU3RyaW5nLmNhbGwoZm4pXG4gIHJldHVybiBzdHJpbmcgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXScgfHxcbiAgICAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nICYmIHN0cmluZyAhPT0gJ1tvYmplY3QgUmVnRXhwXScpIHx8XG4gICAgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgIC8vIElFOCBhbmQgYmVsb3dcbiAgICAgKGZuID09PSB3aW5kb3cuc2V0VGltZW91dCB8fFxuICAgICAgZm4gPT09IHdpbmRvdy5hbGVydCB8fFxuICAgICAgZm4gPT09IHdpbmRvdy5jb25maXJtIHx8XG4gICAgICBmbiA9PT0gd2luZG93LnByb21wdCkpXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4xLjAuMUBpcy1mdW5jdGlvbi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTgyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciB0cmltID0gcmVxdWlyZSgndHJpbScpXG4gICwgZm9yRWFjaCA9IHJlcXVpcmUoJ2Zvci1lYWNoJylcbiAgLCBpc0FycmF5ID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gICAgfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChoZWFkZXJzKSB7XG4gIGlmICghaGVhZGVycylcbiAgICByZXR1cm4ge31cblxuICB2YXIgcmVzdWx0ID0ge31cblxuICBmb3JFYWNoKFxuICAgICAgdHJpbShoZWFkZXJzKS5zcGxpdCgnXFxuJylcbiAgICAsIGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gcm93LmluZGV4T2YoJzonKVxuICAgICAgICAgICwga2V5ID0gdHJpbShyb3cuc2xpY2UoMCwgaW5kZXgpKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgLCB2YWx1ZSA9IHRyaW0ocm93LnNsaWNlKGluZGV4ICsgMSkpXG5cbiAgICAgICAgaWYgKHR5cGVvZihyZXN1bHRba2V5XSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgcmVzdWx0W2tleV0gPSB2YWx1ZVxuICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkocmVzdWx0W2tleV0pKSB7XG4gICAgICAgICAgcmVzdWx0W2tleV0ucHVzaCh2YWx1ZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHRba2V5XSA9IFsgcmVzdWx0W2tleV0sIHZhbHVlIF1cbiAgICAgICAgfVxuICAgICAgfVxuICApXG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi4wLjFAcGFyc2UtaGVhZGVycy9wYXJzZS1oZWFkZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSAxODNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSB0cmltO1xuXG5mdW5jdGlvbiB0cmltKHN0cil7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyp8XFxzKiQvZywgJycpO1xufVxuXG5leHBvcnRzLmxlZnQgPSBmdW5jdGlvbihzdHIpe1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqLywgJycpO1xufTtcblxuZXhwb3J0cy5yaWdodCA9IGZ1bmN0aW9uKHN0cil7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjAuMUB0cmltL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxODRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzRnVuY3Rpb24gPSByZXF1aXJlKCdpcy1mdW5jdGlvbicpXG5cbm1vZHVsZS5leHBvcnRzID0gZm9yRWFjaFxuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5XG5cbmZ1bmN0aW9uIGZvckVhY2gobGlzdCwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgICBpZiAoIWlzRnVuY3Rpb24oaXRlcmF0b3IpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2l0ZXJhdG9yIG11c3QgYmUgYSBmdW5jdGlvbicpXG4gICAgfVxuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAzKSB7XG4gICAgICAgIGNvbnRleHQgPSB0aGlzXG4gICAgfVxuICAgIFxuICAgIGlmICh0b1N0cmluZy5jYWxsKGxpc3QpID09PSAnW29iamVjdCBBcnJheV0nKVxuICAgICAgICBmb3JFYWNoQXJyYXkobGlzdCwgaXRlcmF0b3IsIGNvbnRleHQpXG4gICAgZWxzZSBpZiAodHlwZW9mIGxpc3QgPT09ICdzdHJpbmcnKVxuICAgICAgICBmb3JFYWNoU3RyaW5nKGxpc3QsIGl0ZXJhdG9yLCBjb250ZXh0KVxuICAgIGVsc2VcbiAgICAgICAgZm9yRWFjaE9iamVjdChsaXN0LCBpdGVyYXRvciwgY29udGV4dClcbn1cblxuZnVuY3Rpb24gZm9yRWFjaEFycmF5KGFycmF5LCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBhcnJheS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChhcnJheSwgaSkpIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgYXJyYXlbaV0sIGksIGFycmF5KVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBmb3JFYWNoU3RyaW5nKHN0cmluZywgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gc3RyaW5nLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIC8vIG5vIHN1Y2ggdGhpbmcgYXMgYSBzcGFyc2Ugc3RyaW5nLlxuICAgICAgICBpdGVyYXRvci5jYWxsKGNvbnRleHQsIHN0cmluZy5jaGFyQXQoaSksIGksIHN0cmluZylcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGZvckVhY2hPYmplY3Qob2JqZWN0LCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgIGZvciAodmFyIGsgaW4gb2JqZWN0KSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgaykpIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqZWN0W2tdLCBrLCBvYmplY3QpXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMy4yQGZvci1lYWNoL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxODVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBleHRlbmRcblxudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuZnVuY3Rpb24gZXh0ZW5kKCkge1xuICAgIHZhciB0YXJnZXQgPSB7fVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXVxuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXRcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNC4wLjFAeHRlbmQvaW1tdXRhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSAxODZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICcuL211c2ljLmNzcyc7XG5pbXBvcnQge1xuICAgIHdpbixcbiAgICBkb2MsXG4gICAgUHJvbWlzZSxcbiAgICBxdWVyeSxcbiAgICBxdWVyeUFsbCxcbiAgICBnZXRSZWN0LFxuICAgIGdldERpc3RhbmNlLFxuICAgIHJhZixcbiAgICBkZWxheVxufSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNdXNpYyB7XG4gICAgY29uc3RydWN0b3Iodmlld3BvcnQsIGl0ZW1zKSB7XG4gICAgICAgIHRoaXMubXVzaWNFbCA9IHF1ZXJ5KHZpZXdwb3J0LCAnI211c2ljJyk7XG4gICAgICAgIHRoaXMuYmFyc0VsID0gcXVlcnlBbGwodmlld3BvcnQsICcuYmFyJyk7XG4gICAgICAgIHRoaXMuYXVkaW8gPSBpdGVtc1snbXVzaWMnXS5vYmo7XG4gICAgfVxuXG4gICAgcGxheSgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJhcnNFbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5iYXJzRWxbaV0uc3R5bGUuY3NzVGV4dCA9IGAtd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjogJHtNYXRoLnJhbmRvbSgpICogMC4zICsgMC4zfXNgO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXVkaW8ucGxheSgpO1xuICAgICAgICB0aGlzLm11c2ljRWwuY2xhc3NOYW1lID0gJyc7XG4gICAgfVxuXG5cbiAgICBwYXVzZSgpIHtcbiAgICAgICAgdGhpcy5hdWRpby5wYXVzZSgpO1xuICAgICAgICB0aGlzLm11c2ljRWwuY2xhc3NOYW1lID0gJ211dGUnO1xuICAgIH1cblxuICAgIHJlYWR5KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hdWRpby5sb29wID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubXVzaWNFbC5zdHlsZS5kaXNwbGF5ID0gJyc7XG5cbiAgICAgICAgICAgIHRoaXMubXVzaWNFbC5hZGRFdmVudExpc3RlbmVyKCd0YXAnLCBlID0+IHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuYXVkaW8ucGF1c2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL211c2ljLmpzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL211c2ljLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi8uLi9ub2RlX21vZHVsZXMvLjAuMTMuMUBzdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vbXVzaWMuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvaW5kZXguanMhLi9tdXNpYy5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL211c2ljLmNzc1xuLy8gbW9kdWxlIGlkID0gMTg4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIjbXVzaWMge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxlZnQ6IDAuM3JlbTtcXG4gICAgdG9wOiAwLjVyZW07XFxuICAgIHBhZGRpbmctcmlnaHQ6IDAuM3JlbTtcXG4gICAgcGFkZGluZy1ib3R0b206IDAuNXJlbTtcXG5cXG59XFxuXFxuI211c2ljIC5tdXNpYyB7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIHdpZHRoOiAxOHB4O1xcbiAgICBoZWlnaHQ6IDE2cHg7XFxuICAgIHBhZGRpbmctYm90dG9tOiAycHg7XFxuICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjNTU1O1xcbn1cXG5cXG4jbXVzaWMgLmJhcnMge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gICAgLXdlYmtpdC1ib3gtcGFjazoganVzdGlmeTtcXG4gICAgLXdlYmtpdC1ib3gtYWxpZ246IGVuZDtcXG59XFxuXFxuI211c2ljIC5iYXIge1xcbiAgICB3aWR0aDogMTQlO1xcbiAgICBtYXJnaW46IDElO1xcbiAgICBoZWlnaHQ6IDE1JTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwZGRmMTtcXG4gICAgLXdlYmtpdC1hbmltYXRpb24tbmFtZTogcGxheTtcXG4gICAgLXdlYmtpdC1hbmltYXRpb24tZGVsYXk6IDBzO1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2UtaW4tb3V0O1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlO1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kaXJlY3Rpb246IGFsdGVybmF0ZTtcXG59XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIHBsYXkge1xcbiAgICAwJSB7XFxuICAgICAgICBoZWlnaHQ6IDE1JTtcXG4gICAgfVxcblxcbiAgICAxMDAlIHtcXG4gICAgICAgIGhlaWdodDogODAlO1xcbiAgICB9XFxufVxcblxcblxcbiNtdXNpYy5tdXRlIC5iYXIge1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogbm9uZTtcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjI1LjBAY3NzLWxvYWRlciEuL3NyYy9tdXNpYy5jc3Ncbi8vIG1vZHVsZSBpZCA9IDE4OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgbG9hZGluZzoge1xuICAgICAgICB0ZXh0czogW1xuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICfmraPlnKjliqDlhaXvvJonLFxuICAgICAgICAgICAgICAgICc15ru06ZO25rKzJyxcbiAgICAgICAgICAgICAgICAnMuadn+mAg+S4jeWHuum7kea0nueahOWFiScsXG4gICAgICAgICAgICAgICAgJzHkuKrmm7TlpKfnmoTmuLjmiI/kuJbnlYwnLFxuICAgICAgICAgICAgICAgICcz57yV5aSq6Ziz6aOOJyxcbiAgICAgICAgICAgICAgICAnN+eJh+eHg+eDp+eahOmZqOefsycsXG4gICAgICAgICAgICAgICAgJzHkuKrku7DmnJvmmJ/nqbrnmoTkuronXG4gICAgICAgICAgICBdXG4gICAgICAgIF1cbiAgICB9LFxuXG4gICAgZ2w6IHsgLy8g5byA5Zy65byV5a+8XG4gICAgICAgIHR5cGU6ICdwb3B1cCcsXG4gICAgICAgIHRpdGxlOiAn5qyi6L+O5p2l5YiwVEdQ5ri45oiP5LiW55WMJyxcbiAgICAgICAgdGV4dDogJ+i/meaYr+aVo+W4g+WcqOWuh+WumeS4reeahOelnuenmOWKm+mHj++8jOmbhum9kOaJgOaciemHkeW4ge+8jOWPrOWUpOelnuenmOKAnOm4oeiFv+KAne+8gScsXG4gICAgICAgIHNoYXJlYmxlOiBmYWxzZSxcbiAgICAgICAgYmdUeXBlOiAxXG4gICAgfSxcblxuICAgIGZvdW5kNTogeyAvLyDmib7liLA15LiqXG4gICAgICAgIHR5cGU6ICd0aXAnLFxuICAgICAgICB0aXA6ICc16aKX5pif55CD6KKr5L2g54K56YeR77yMPGJyLz7npZ7np5jigJ3puKHohb/igJ3mraPlkJHkvaDotbDmnaUnLFxuICAgICAgICBiZ1R5cGU6IDFcbiAgICB9LFxuXG4gICAgZm91bmQxNTogeyAvLyDmib7liLAxNeS4qlxuICAgICAgICB0eXBlOiAndGlwJyxcbiAgICAgICAgdGlwOiAn5ZWK77yB6L+Y5beuNeS4qu+8gTxici8+56a756We56eY4oCc6bih6IW/4oCd5bCx5Y+q5beuNeS4quS6hu+8gScsXG4gICAgICAgIGJnVHlwZTogMlxuICAgIH0sXG5cbiAgICBmb3VuZDIwOiB7IC8vIOaJvuWIsDIw5LiqXG4gICAgICAgIHR5cGU6ICdwb3B1cCcsXG4gICAgICAgIHRpdGxlOiAn5om+5Yiw5YWo6YOo5ri45oiP5pif55CD77yBJyxcbiAgICAgICAgdGV4dChkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gYCR7ZGF0YS5tfeWIhiR7ZGF0YS5zfeenku+8jOaIkeWPkeeOsOS6huaJgOaciea4uOaIj+aYn+eQg++8geWuh+Wumei+o+S5iOWkp++8jOaIkeeahOaJi+acgOW/q++8gWBcbiAgICAgICAgfSxcbiAgICAgICAgYmdUeXBlOiAzLFxuICAgICAgICBzaGFyZWJsZTogdHJ1ZVxuICAgIH0sXG5cbiAgICBibGFja3NoZWVwd2FsbDogeyAvLyDlnLDlm77lhajlvIBcbiAgICAgICAgdHlwZTogJ3BvcHVwJyxcbiAgICAgICAgdGl0bGU6ICfmjqLntKLkuobmlbTkuKrlroflrpnvvIEnLFxuICAgICAgICB0ZXh0KGRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiBgJHtkYXRhLm195YiGJHtkYXRhLnN956eS77yM5oiR5Y+R546w5LqGJHtkYXRhLm595Liq5ri45oiP5pif55CD77yB5Ymp5LiL55qE5pyJ5pys5LqL5L2g5p2l5om+77yBYFxuICAgICAgICB9LFxuICAgICAgICBiZ1R5cGU6IDIsXG4gICAgICAgIHNoYXJlYmxlOiB0cnVlXG4gICAgfSxcblxuICAgIGdnOiB7IC8v5Zyw5Zu+5YWo5byAICsg5om+5YiwMjDkuKpcbiAgICAgICAgdHlwZTogJ3BvcHVwJyzCoFxuICAgICAgICB0aXRsZTogJ+aJvuWIsOWFqOmDqOa4uOaIj+aYn+eQg++8gScsXG4gICAgICAgIHRleHQoZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIGAke2RhdGEubX3liIYke2RhdGEuc33np5LvvIzmiJHlj5HnjrDkuobmiYDmnInmuLjmiI/mmJ/nkIPvvIHlroflrpnovqPkuYjlpKfvvIzmiJHnmoTmiYvmnIDlv6vvvIFgXG4gICAgICAgIH0sXG4gICAgICAgIGJnVHlwZTogMyxcbiAgICAgICAgc2hhcmVibGU6IHRydWVcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3RleHRDb25maWcuanMiXSwic291cmNlUm9vdCI6IiJ9