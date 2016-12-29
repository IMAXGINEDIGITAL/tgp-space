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
	            _util.Promise.all([pop.close(), share.show({
	                title: '离开地表！和TGP去看看5000光年外的星辰大海',
	                desc: '\u832B\u832B\u6E38\u620F\u5B87\u5B99\u6DF1\u4E0D\u89C1\u5E95\uFF0C\u6211' + (data.m * 60 + data.n) + '\u79D2\u5C31\u6ED1\u4E86' + data.n + '\u767E\u4E07\u5149\u5E74',
	                link: 'http://mp.imaxgine.com/tgp/space/index.html',
	                imgUrl: 'http://mp.imaxgine.com/tgp/space/assets/logo.jpg'
	            })]).then(function () {
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
	        console.log(data);
	
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
	
	var Share = function () {
	    function Share(viewport) {
	        (0, _classCallCheck3.default)(this, Share);
	
	        this.shareEl = (0, _util.query)(viewport, '#share');
	        this.wxReady = false;
	    }
	
	    (0, _createClass3.default)(Share, [{
	        key: 'show',
	        value: function show(_ref) {
	            var _this = this;
	
	            var title = _ref.title,
	                desc = _ref.desc,
	                link = _ref.link,
	                imgUrl = _ref.imgUrl;
	
	            return new _util.Promise(function (resolve, reject) {
	                if (!_this.wxReady) {
	                    (function () {
	                        var hide = function hide(e) {
	                            _this.shareEl.removeEventListener('tap', hide);
	                            _this.shareEl.style.display = 'none';
	                            resolve();
	                        };
	
	                        _this.shareEl.addEventListener('tap', hide);
	                        _this.shareEl.style.display = '';
	                    })();
	                } else {
	                    wx.onMenuShareTimeline({
	                        title: title,
	                        link: link,
	                        imgUrl: imgUrl,
	                        success: resolve,
	                        cancel: resolve
	                    });
	
	                    wx.onMenuShareAppMessage({
	                        title: title, // 分享标题
	                        desc: desc, // 分享描述
	                        link: link, // 分享链接
	                        imgUrl: imgUrl, // 分享图标
	                        type: 'link', // 分享类型,music、video或link，不填默认为link
	                        success: resolve,
	                        cancel: resolve
	                    });
	                }
	            });
	        }
	    }, {
	        key: 'ready',
	        value: function ready() {
	            var _this2 = this;
	
	            return new _util.Promise(function (resolve, reject) {
	                var url = 'wx.php';
	                // const url = 'http://mp.imaxgine.net/kd/touching2016/wx.php';            
	                _xhr2.default.get(url + '?method="calculate"', function (err, resp) {
	                    if (err) {
	                        resolve();
	                        return;
	                    }
	
	                    var config = void 0;
	                    try {
	                        config = JSON.parse(resp.body);
	                    } catch (e) {}
	
	                    if (config && (config.success === true || config.sucess === 'true')) {
	                        config.data.jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage'];
	                        wx.config(config.data);
	                        wx.ready(function () {
	                            _this2.wxReady = true;
	                            resolve();
	                        });
	                    } else {
	                        resolve();
	                    }
	                });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2M4ZjdkOTBiMGEwNDkyODJhNjgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuY3NzPzY3MzciLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuY3NzIiwid2VicGFjazovLy8uL34vLjAuMjUuMEBjc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4wLjEzLjFAc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvYXJyYXkvZnJvbS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RlZmluZWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXJhdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2h0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1ncG8uanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuZnJvbS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jYWxsLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jcmVhdGUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jbGFzc29mLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRldGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qtc2FwLmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuLmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sL2l0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1zdGVwLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MtZXh0LmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN5bWJvbC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWV0YS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fa2V5b2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0ta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi1leHQuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BuLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wZC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wub2JzZXJ2YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9oZWxwZXJzL2luaGVyaXRzLmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L3NldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXByb3RvLmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4wLjEuMEBnZXN0dXJlLWpzL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMC4zLjRAZXZlbnQtZW1pdHRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4wLjEuMUBkL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3QvYXNzaWduL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3QvYXNzaWduL2lzLWltcGxlbWVudGVkLmpzIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3QvYXNzaWduL3NoaW0uanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMC4xMC4xMkBlczUtZXh0L29iamVjdC9rZXlzL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3Qva2V5cy9pcy1pbXBsZW1lbnRlZC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4wLjEwLjEyQGVzNS1leHQvb2JqZWN0L2tleXMvc2hpbS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4wLjEwLjEyQGVzNS1leHQvb2JqZWN0L3ZhbGlkLXZhbHVlLmpzIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3Qvbm9ybWFsaXplLW9wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMC4xMC4xMkBlczUtZXh0L29iamVjdC9pcy1jYWxsYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4wLjEwLjEyQGVzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMC4xMC4xMkBlczUtZXh0L3N0cmluZy8jL2NvbnRhaW5zL2lzLWltcGxlbWVudGVkLmpzIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9zdHJpbmcvIy9jb250YWlucy9zaGltLmpzIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3QvdmFsaWQtY2FsbGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YWdlLmpzIiwid2VicGFjazovLy8uL34vLjIuMC4wQGFtZmUtZW52L3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjAuMEBhbWZlLWVudi9zcmMvYWxpYXBwLmpzIiwid2VicGFjazovLy8uL34vLjIuMC4wQGFtZmUtZW52L3NyYy92ZXJzaW9uLmpzIiwid2VicGFjazovLy8uL34vLjIuMC4wQGFtZmUtZW52L3NyYy9vcy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjAuMEBhbWZlLWVudi9zcmMvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjAuMEBhbWZlLWVudi9zcmMvdGhpcmRhcHAuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi4wLjBAYW1mZS1lbnYvc3JjL3BhcmFtcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhZ2UuY3NzPzNiODIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YWdlLmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2FudmFzLmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL2lzLWl0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmlzLWl0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NsaWNlQ29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy9oZWxsb1dvcmxkLmpzIiwid2VicGFjazovLy8uL3NyYy9oZWxsb3dvcmxkLmNzcz80NmNiIiwid2VicGFjazovLy8uL3NyYy9oZWxsb3dvcmxkLmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3Rhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzLmpzIiwid2VicGFjazovLy8uL34vLjIuMC4wQGFtZmUtY3ViaWNiZXppZXIvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9mb3VuZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZm91bmQuY3NzPzA1OWIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZvdW5kLmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFwLmpzIiwid2VicGFjazovLy8uL3NyYy9tYXAuY3NzPzljZGIiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpY2tlci5qcyIsIndlYnBhY2s6Ly8vLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL21hcC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vbWFwLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5tYXAuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvbGxlY3Rpb24tc3Ryb25nLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS1hbGwuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLWluc3RhbmNlLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mb3Itb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1zcGVjaWVzLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2xsZWN0aW9uLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1tZXRob2RzLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1zcGVjaWVzLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktc3BlY2llcy1jb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcubWFwLnRvLWpzb24uanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvbGxlY3Rpb24tdG8tanNvbi5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktZnJvbS1pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcG9wLmpzIiwid2VicGFjazovLy8uL3NyYy9wb3AuY3NzPzc2ZTgiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BvcC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGlwLmNzcz8wZjMzIiwid2VicGFjazovLy8uL3NyYy90aXAuY3NzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmUuY3NzPzY1NzQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlLmNzcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjMuMkB4aHIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi8uNC4zLjFAZ2xvYmFsL3dpbmRvdy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4xLjAuMUBpcy1mdW5jdGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjAuMUBwYXJzZS1oZWFkZXJzL3BhcnNlLWhlYWRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMC4wLjFAdHJpbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4wLjMuMkBmb3ItZWFjaC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly40LjAuMUB4dGVuZC9pbW11dGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL211c2ljLmpzIiwid2VicGFjazovLy8uL3NyYy9tdXNpYy5jc3M/YjJlNyIsIndlYnBhY2s6Ly8vLi9zcmMvbXVzaWMuY3NzIiwid2VicGFjazovLy8uL3NyYy90ZXh0Q29uZmlnLmpzIl0sIm5hbWVzIjpbInByZWxvYWQiLCJhc3NldHNQcmVsb2FkIiwiaXRlbXMiLCJhc3NldHNJdGVtcyIsInZpZXdwb3J0IiwiYm9keSIsInNjcm9sbGVyIiwidGlja2VyIiwic3RhZ2UiLCJoZWxsb1dvcmxkIiwic3RhciIsImVsZW1lbnRzIiwiZm91bmQiLCJtYXAiLCJwb3AiLCJ0aXAiLCJzaGFyZSIsIm11c2ljIiwic2hvd1RpcCIsImNvbmZpZyIsImRhdGEiLCJzaG93IiwiYmdUeXBlIiwic2hvd1BvcCIsImVuYWJsZSIsInRleHQiLCJwb3B1cCIsInRpdGxlIiwic2hhcmVibGUiLCJvbmxlZnRjbGljayIsImFsbCIsImNsb3NlIiwiZGVzYyIsIm0iLCJuIiwibGluayIsImltZ1VybCIsInRoZW4iLCJvbnJpZ2h0Y2xpY2siLCJvbmNsb3NlY2xpY2siLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwicmVhZHkiLCJydW4iLCJzY3JvbGxTbG93UmF0aW8iLCJ3aWR0aCIsImhlaWdodCIsInZ3IiwidmgiLCJkcHIiLCJwcm9taXNlcyIsInB1c2giLCJmaXJzdFJlbmRlcmVkIiwic2Nyb2xsWCIsInNjcm9sbFkiLCJzdGFyUm9sbFkiLCJzdGFyUm9sbFNwZWVkIiwic3RhclJvbGxJZCIsImFkZCIsInNob3dUZXh0SWQiLCJzaG93R2xvZElkIiwiZmx5Q29pbklkIiwiaG92ZXJTbGljZSIsImdldEhvdmVyU2xpY2UiLCJmb2N1c1NsaWNlIiwiZ2V0Rm9jdXNTbGljZSIsInNsaWNlV2lkdGgiLCJzbGljZUhlaWdodCIsIm9uIiwieCIsInkiLCJ0eXBlIiwic2hvd1RleHQiLCJvcmlnaW5hbEV2ZW50IiwidGFyZ2V0IiwiY2FudmFzIiwidGFwRm9jdXNTbGljZSIsImV4IiwiZXkiLCJzaG93R29sZCIsImVuZCIsImZseUNvaW4iLCJ1cGRhdGUiLCJzcGVjaWFsQW1vdW50Iiwic3BlY2lhbEZvdW5kIiwidG90YWxBbW91bnQiLCJob3ZlcmVkQW1vdW50IiwiZHJhd0ltYWdlcyIsIm9mZnNjcmVlblJlbmRlciIsImNsZWFyUmVjdCIsImRyYXdJbWFnZSIsImltYWdlIiwicmVuZGVyIiwib2Zmc2NyZWVuQ2FudmFzIiwicmVwZWF0IiwicHJvbWlzZSIsInJlc29sdmUiLCJpIiwidGlja2VySWQiLCJwbGF5IiwiTWF0aCIsInJhbmRvbSIsInN0YXJ0IiwiaFNsaWNlIiwidlNsaWNlIiwicmFuZG9tVGV4dElkIiwicmFuZG9tVGV4dCIsInhwIiwieXAiLCJjbGVhciIsImRpc3RhbmNlIiwiZGVsZXRlIiwiYW1vdW50IiwidG90YWwiLCJmb2N1cyIsInBhcnNlSW50IiwiZWxhcHNlZCIsInMiLCJjb25zb2xlIiwibG9nIiwic2hvd24iLCJib25lWCIsImJvbmVZIiwic2Nyb2xsVG8iLCJ3aW4iLCJ3aW5kb3ciLCJkb2MiLCJkb2N1bWVudCIsIlByb21pc2UiLCJjcmVhdGVqcyIsImFwcGVuZFN0eWxlIiwiY3NzVGV4dCIsInN0eWxlIiwiY3JlYXRlRWxlbWVudCIsInRleHRDb250ZW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJhcHBlbmRDaGlsZCIsImRvbXJlYWR5IiwicmVqZWN0IiwicmVhZHlTdGF0ZSIsImRlZmVyIiwiZGVmZXJyZWQiLCJkZWxheSIsInRpbWUiLCJzZXRUaW1lb3V0IiwicXVlcnkiLCJzZWxlY3RvciIsInF1ZXJ5U2VsZWN0b3IiLCJxdWVyeUFsbCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJnZXRSZWN0IiwiZWwiLCJyZWN0cyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImdldERpc3RhbmNlIiwieDEiLCJ5MSIsIngyIiwieTIiLCJzcXJ0IiwiaW1nMkNhbnZhcyIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwicmFmIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiZm4iLCJjYWYiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsIndlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lIiwiaWQiLCJjbGVhclRpbWVvdXQiLCJTY3JvbGxlciIsInNjYWxlIiwiX2lzU2Nyb2xsaW5nIiwiX2VuYWJsZSIsIl9zY2FsZSIsImx4IiwibHkiLCJuYW1lIiwiZXh0cmEiLCJrZXkiLCJlbWl0IiwiZW1pdFRhcCIsIl9lbWl0IiwidG91Y2giLCJjbGllbnRYIiwiY2xpZW50WSIsImVtaXRTdGFydCIsImVtaXRTY3JvbGwiLCJlbWl0RW5kIiwiY2FsWFkiLCJub1NjYWxlIiwiZGlzcGxhY2VtZW50WCIsImRpc3BsYWNlbWVudFkiLCJtaW4iLCJtYXgiLCJFdmVudCIsInByb3RvdHlwZSIsImlzSU9TIiwiU3RhZ2UiLCJzdGFnZUVsIiwic2xpY2VzIiwidiIsImgiLCJpbmRleCIsIlN0cmluZyIsImhvdmVyIiwiZ2V0U2xpY2UiLCJyZWxhdGVkIiwic2xpY2UiLCJob3ZlcmVkIiwiY3giLCJjeSIsImR4IiwiZHkiLCJyYXRpbyIsImZvY3VzZWQiLCJkaXNwbGF5IiwibGVuZ3RoIiwiZmlsdGVyIiwiQ2FudmFzSW1hZ2UiLCJIVE1MQ2FudmFzRWxlbWVudCIsIl9pbWFnZSIsInBhcmFtcyIsImxvYWRlZCIsInBhcmFtIiwiaW1nIiwic3JjIiwiZm9yRWFjaCIsImFyZ3MiLCJzeCIsInN5Iiwic3ciLCJzaCIsIkltYWdlIiwidG9EYXRhVVJMIiwiQ2FudmFzUmVuZGVyIiwiX3Zpc2libGUiLCJfb2Zmc2NyZWVuIiwiY29pblgiLCJjb2luWSIsImlzRWFydGgiLCJIZWxsb1dvcmxkIiwid3JhcEVsIiwidGV4dEVsIiwic3RhcnRFbCIsImR1cmF0aW9uIiwiY291bnQiLCJkZWx0YSIsImJhY2tncm91bmRQb3NpdGlvblgiLCJvbmNsaWNrIiwiY2xhc3NOYW1lIiwiU3RhciIsImRyYXciLCJvYmoiLCJCZXppZXIiLCJvcmlnaW5TbGljZVdpZHRoIiwib3JpZ2luU2xpY2VIZWlnaHQiLCJFbGVtZW50cyIsInNjYWxlUmF0aW8iLCJ0ZXh0QWxwaGEiLCJnb2xkWSIsIm5vQ29pbiIsImNvaW4iLCJlbmRYIiwiZW5kWSIsInBlcmNlbnQiLCJzbG93IiwiaG92ZXJzIiwiY2FudmFzSW1hZ2UiLCJzdGF0aWNJbWciLCJ0ZXh0SW1nIiwiZ29sZEltZyIsImZsb3ciLCJvZmZzZXRZIiwicmFuZ2UiLCJlYXNlIiwiZWFzZUluIiwiZWFzZU91dCIsInNhdmUiLCJnbG9iYWxBbHBoYSIsInJlc3RvcmUiLCJjb2lucyIsImNvaW5JbWciLCJtYXRjaCIsIml0ZW0iLCJOdW1iZXIiLCJGb3VuZCIsInRleHROdW1iZXJFbCIsInRleHRUaXBFbCIsInRleHRCZ0VsIiwiYmFyRWwiLCJnb2xkRWwiLCJrZXlmcmFtZXMiLCJ3ZWJraXRBbmltYXRpb24iLCJNYXAiLCJjYW52YXNFbCIsImluZGljYXRvckVsIiwib3BlbmVkIiwic3VtRGVsdGEiLCJzaWduIiwic3RyIiwiY1dpZHRoIiwiY0hlaWdodCIsImlXaWR0aCIsImlIZWlnaHQiLCJzV2lkdGgiLCJzSGVpZ2h0Iiwid2Via2l0VHJhbnNmb3JtIiwiZmlsbFJlY3QiLCJmaWxsU3R5bGUiLCJnbG9iYWxDb21wb3NpdGVPcGVyYXRpb24iLCJUaWNrZXIiLCJfaWQiLCJfbWFwRiIsIl9tYXBDIiwiZiIsImhhcyIsInNldCIsImNhbmNlbCIsImdldCIsImMiLCJyaWQiLCJEYXRlIiwibm93IiwidGljayIsImtleXMiLCJQb3AiLCJwb3BFbCIsImNvbnRlbnRFbCIsImNsb3NlRWwiLCJ0aXRsZUVsIiwiYmcxRWwiLCJiZzJFbCIsImJ0bnNFbCIsImxlZnRCdG5FbCIsInJpZ2h0QnRuRWwiLCJ2aXNpYmlsaXR5IiwicmVwbGFjZSIsImlubmVySFRNTCIsImhhbmRsZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwib25MZWZ0Q2xpY2siLCJvblJpZ2h0Q2xpY2siLCJvbkNsb3NlQ2xpY2siLCJUaXAiLCJ0aXBFbCIsIlNoYXJlIiwic2hhcmVFbCIsInd4UmVhZHkiLCJoaWRlIiwid3giLCJvbk1lbnVTaGFyZVRpbWVsaW5lIiwic3VjY2VzcyIsIm9uTWVudVNoYXJlQXBwTWVzc2FnZSIsInVybCIsImVyciIsInJlc3AiLCJKU09OIiwicGFyc2UiLCJzdWNlc3MiLCJqc0FwaUxpc3QiLCJNdXNpYyIsIm11c2ljRWwiLCJiYXJzRWwiLCJhdWRpbyIsInBhdXNlIiwibG9vcCIsInN0b3BQcm9wYWdhdGlvbiIsInBhdXNlZCIsImxvYWRpbmciLCJ0ZXh0cyIsImdsIiwiZm91bmQ1IiwiZm91bmQxNSIsImZvdW5kMjAiLCJibGFja3NoZWVwd2FsbCIsImdnIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJB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QTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkJBQTBCOztBQUUxQjtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ25JQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUEsVUFBUztBQUNUO0FBQ0E7Ozs7Ozs7QUM5REE7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7O0FDSkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUTtBQUNSLGVBQWMsYUFBYSxHQUFHLGVBQWU7QUFDN0M7QUFDQTs7Ozs7OztBQ1JBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPLHNCQUFzQixFQUFFO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLGFBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNyQkE7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7O0FDSkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFLFlBQVksY0FBYztBQUM1Qjs7Ozs7OztBQ1BBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztBQ05BOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDTEE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBOzs7Ozs7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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUM3T0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBLEVBQUM7QUFDRDtBQUNBLEVBQUM7QUFDRDtBQUNBOzs7Ozs7OztBQ1JBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEU7Ozs7Ozs7QUM3QkE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNiQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdDQUF1QyxTQUFTO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5Q0FBd0MsU0FBUztBQUNqRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7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QWZPOztBQXVCWGlXLGFBQVEsRUFBRTtBQUNOL1MsZUFBTSxLQURGO0FBRUp6RCxjQUFLLDJCQUZEO0FBR0pPLGlCQUFRO0FBSEosTUF2Qkc7O0FBNkJYa1csY0FBUyxFQUFFO0FBQ1BoVCxlQUFNLEtBREQ7QUFFTHpELGNBQUssNEJBRkE7QUFHTE8saUJBQVE7QUFISCxNQTdCRTs7QUFtQ1htVyxjQUFTLEVBQUU7QUFDUGpULGVBQU0sT0FERDtBQUVMN0MsZ0JBQU8sV0FGRjtBQUdMRixhQUhLLGdCQUdBTCxJQUhBLEVBR007QUFDUCxvQkFBVUEsS0FBS2EsQ0FBZixjQUFvQmIsS0FBS2tHLENBQXpCO0FBQ0gsVUFMSTs7QUFNTGhHLGlCQUFRLENBTkg7QUFPTE0sbUJBQVU7QUFQTCxNQW5DRTs7QUE2Q1g4VixxQkFBZ0IsRUFBRTtBQUNkbFQsZUFBTSxPQURNO0FBRVo3QyxnQkFBTyxVQUZLO0FBR1pGLGFBSFksZ0JBR1BMLElBSE8sRUFHRDtBQUNQLG9CQUFVQSxLQUFLYSxDQUFmLGNBQW9CYixLQUFLa0csQ0FBekIsNENBQW1DbEcsS0FBS2MsQ0FBeEM7QUFDSCxVQUxXOztBQU1aWixpQkFBUSxDQU5JO0FBT1pNLG1CQUFVO0FBUEUsTUE3Q0w7O0FBdURYK1YsU0FBSSxFQUFFO0FBQ0ZuVCxlQUFNLE9BRE47QUFFQTdDLGdCQUFPLFdBRlA7QUFHQUYsYUFIQSxnQkFHS0wsSUFITCxFQUdXO0FBQ1Asb0JBQVVBLEtBQUthLENBQWYsY0FBb0JiLEtBQUtrRyxDQUF6QjtBQUNILFVBTEQ7O0FBTUFoRyxpQkFBUSxDQU5SO0FBT0FNLG1CQUFVO0FBUFY7QUF2RE8sRSIsImZpbGUiOiJnYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgM2M4ZjdkOTBiMGEwNDkyODJhNjgiLCJpbXBvcnQgJy4vZ2FtZS5jc3MnO1xuaW1wb3J0IHtcbiAgICB3aW4sXG4gICAgZG9jLFxuICAgIFByb21pc2UsXG4gICAgZGVmZXIsXG4gICAgcXVlcnksXG4gICAgcXVlcnlBbGwsXG4gICAgZ2V0UmVjdCxcbiAgICBkZWxheVxufSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IFNjcm9sbGVyIGZyb20gJy4vc2Nyb2xsZXInO1xuaW1wb3J0IFN0YWdlIGZyb20gJy4vc3RhZ2UnO1xuaW1wb3J0IEhlbGxvV29ybGQgZnJvbSAnLi9oZWxsb1dvcmxkJztcbmltcG9ydCBTdGFyIGZyb20gJy4vc3Rhcic7XG5pbXBvcnQgRWxlbWVudHMgZnJvbSAnLi9lbGVtZW50cyc7XG5pbXBvcnQgRm91bmQgZnJvbSAnLi9mb3VuZCc7XG5pbXBvcnQgTWFwIGZyb20gJy4vbWFwJztcbmltcG9ydCBUaWNrZXIgZnJvbSAnLi90aWNrZXInO1xuaW1wb3J0IFBvcCBmcm9tICcuL3BvcCc7XG5pbXBvcnQgVGlwIGZyb20gJy4vdGlwJztcbmltcG9ydCBTaGFyZSBmcm9tICcuL3NoYXJlJztcbmltcG9ydCBNdXNpYyBmcm9tICcuL211c2ljJztcbmltcG9ydCB0ZXh0Q29uZmlnIGZyb20gJy4vdGV4dENvbmZpZyc7XG5cbmNvbnN0IHtcbiAgICBhc3NldHNQcmVsb2FkOiBwcmVsb2FkLFxuICAgIGFzc2V0c0l0ZW1zOiBpdGVtcyxcbn0gPSB3aW47XG5cbmxldCB2aWV3cG9ydCA9IHF1ZXJ5KGRvYy5ib2R5LCAnI2dhbWUnKTtcbmxldCBzY3JvbGxlcjtcbmxldCB0aWNrZXI7XG5sZXQgc3RhZ2U7XG5sZXQgaGVsbG9Xb3JsZDtcbmxldCBzdGFyO1xubGV0IGVsZW1lbnRzO1xubGV0IGZvdW5kO1xubGV0IG1hcDtcbmxldCBwb3A7XG5sZXQgdGlwO1xubGV0IHNoYXJlO1xubGV0IG11c2ljO1xuXG5mdW5jdGlvbiBzaG93VGlwKGNvbmZpZywgZGF0YSkge1xuICAgIHJldHVybiB0aXAuc2hvdyh7XG4gICAgICAgIHRpcDogY29uZmlnLnRpcCxcbiAgICAgICAgYmdUeXBlOiBjb25maWcuYmdUeXBlXG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHNob3dQb3AoY29uZmlnLCBkYXRhKSB7XG4gICAgc2Nyb2xsZXIgJiYgKHNjcm9sbGVyLmVuYWJsZSA9IGZhbHNlKTtcblxuICAgIGNvbnN0IHRleHQgPSB0eXBlb2YgY29uZmlnLnRleHQgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgICAgICAgICAgPyBjb25maWcudGV4dChkYXRhKSA6IGNvbmZpZy50ZXh0O1xuXG4gICAgcmV0dXJuIHBvcC5wb3B1cCh7XG4gICAgICAgIHRpdGxlOiBjb25maWcudGl0bGUsXG4gICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgIHNoYXJlYmxlOiBjb25maWcuc2hhcmVibGUsXG4gICAgICAgIGJnVHlwZTogY29uZmlnLmJnVHlwZSxcbiAgICAgICAgb25sZWZ0Y2xpY2s6ICgpID0+IHtcbiAgICAgICAgICAgIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBwb3AuY2xvc2UoKSxcbiAgICAgICAgICAgICAgICBzaGFyZS5zaG93KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfnprvlvIDlnLDooajvvIHlkoxUR1DljrvnnIvnnIs1MDAw5YWJ5bm05aSW55qE5pif6L6w5aSn5rW3JyxcbiAgICAgICAgICAgICAgICAgICAgZGVzYzogYOiMq+iMq+a4uOaIj+Wuh+Wumea3seS4jeingeW6le+8jOaIkSR7ZGF0YS5tICogNjAgKyBkYXRhLm5956eS5bCx5ruR5LqGJHtkYXRhLm5955m+5LiH5YWJ5bm0YCxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJ2h0dHA6Ly9tcC5pbWF4Z2luZS5jb20vdGdwL3NwYWNlL2luZGV4Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBpbWdVcmw6ICdodHRwOi8vbXAuaW1heGdpbmUuY29tL3RncC9zcGFjZS9hc3NldHMvbG9nby5qcGcnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0pLnRoZW4oKCkgPT4gc2Nyb2xsZXIuZW5hYmxlID0gdHJ1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9ucmlnaHRjbGljazogKCkgPT4ge1xuICAgICAgICAgICAgcG9wLmNsb3NlKCkudGhlbigoKSA9PiBzY3JvbGxlci5lbmFibGUgPSB0cnVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25jbG9zZWNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICBwb3AuY2xvc2UoKS50aGVuKCgpID0+IHNjcm9sbGVyLmVuYWJsZSA9IHRydWUpO1xuICAgICAgICB9XG4gICAgfSlcbn1cblxucHJlbG9hZFxuICAgIC50aGVuKCgpID0+IHsgLy8gcHJldmVudCBldmVudFxuICAgICAgICB2aWV3cG9ydC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZSA9PiBlLnByZXZlbnREZWZhdWx0KCkpO1xuICAgICAgICB2aWV3cG9ydC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBlID0+IGUucHJldmVudERlZmF1bHQoKSk7XG4gICAgICAgIHZpZXdwb3J0LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZSA9PiBlLnByZXZlbnREZWZhdWx0KCkpO1xuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4geyAvLyBtdXNpY1xuICAgICAgICBtdXNpYyA9IG5ldyBNdXNpYyh2aWV3cG9ydCwgaXRlbXMpO1xuICAgICAgICByZXR1cm4gbXVzaWMucmVhZHkoKTtcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHsgLy8gdGlja2VyXG4gICAgICAgIHRpY2tlciA9IG5ldyBUaWNrZXIoKTtcbiAgICAgICAgdGlja2VyLnJ1bigpO1xuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4geyAvLyBoZWxsb3dvcmxkXG4gICAgICAgIGhlbGxvV29ybGQgPSBuZXcgSGVsbG9Xb3JsZCh2aWV3cG9ydCwgaXRlbXMpO1xuICAgICAgICByZXR1cm4gaGVsbG9Xb3JsZC5yZWFkeSgpO1xuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4geyAvLyBzdGFnZVxuICAgICAgICBzdGFnZSA9IG5ldyBTdGFnZSh2aWV3cG9ydCk7XG4gICAgICAgIHJldHVybiBzdGFnZS5yZWFkeSgpO1xuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4geyAvLyBzY3JvbGxlclxuICAgICAgICBjb25zdCBzY3JvbGxTbG93UmF0aW8gPSAxLjg7XG4gICAgICAgIHNjcm9sbGVyID0gbmV3IFNjcm9sbGVyKHN0YWdlLndpZHRoLCBzdGFnZS5oZWlnaHQsIHN0YWdlLnZ3LCBzdGFnZS52aCwgc2Nyb2xsU2xvd1JhdGlvLCBzdGFnZS5kcHIpO1xuICAgICAgICBzY3JvbGxlci5lbmFibGUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHNjcm9sbGVyLnJlYWR5KCk7XG4gICAgfSlcbiAgICAudGhlbigoKSA9PiB7IC8vIHRoaW5nc1xuICAgICAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuXG4gICAgICAgIHN0YXIgPSBuZXcgU3RhcihzdGFnZSwgaXRlbXMpO1xuICAgICAgICBwcm9taXNlcy5wdXNoKHN0YXIucmVhZHkoKSk7XG5cbiAgICAgICAgZWxlbWVudHMgPSBuZXcgRWxlbWVudHMoc3RhZ2UsIGl0ZW1zKTtcbiAgICAgICAgcHJvbWlzZXMucHVzaChlbGVtZW50cy5yZWFkeSgpKTtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4geyAvLyByZW5kZXJcbiAgICAgICAgbGV0IGZpcnN0UmVuZGVyZWQgPSBmYWxzZTtcbiAgICAgICAgbGV0IHNjcm9sbFggPSAwO1xuICAgICAgICBsZXQgc2Nyb2xsWSA9IDA7XG4gICAgICAgIGxldCBzdGFyUm9sbFkgPSBzdGFnZS52aDtcbiAgICAgICAgbGV0IHN0YXJSb2xsU3BlZWQgPSAwLjQ7XG4gICAgICAgIGxldCBzdGFyUm9sbElkID0gdGlja2VyLmFkZCgoKSA9PiB7XG4gICAgICAgICAgICBzdGFyUm9sbFkgLT0gc3RhclJvbGxTcGVlZDtcbiAgICAgICAgICAgIGlmIChzdGFyUm9sbFkgPCAwKSB7XG4gICAgICAgICAgICAgICAgc3RhclJvbGxZID0gc3RhZ2Uudmg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgc2hvd1RleHRJZDtcbiAgICAgICAgbGV0IHNob3dHbG9kSWQ7XG4gICAgICAgIGxldCBmbHlDb2luSWQ7XG4gICAgICAgIGxldCBob3ZlclNsaWNlID0gc3RhZ2UuZ2V0SG92ZXJTbGljZSgwLCAwKTtcbiAgICAgICAgbGV0IGZvY3VzU2xpY2UgPSBzdGFnZS5nZXRGb2N1c1NsaWNlKHN0YWdlLnNsaWNlV2lkdGggLyAyLCBzdGFnZS5zbGljZUhlaWdodCAvIDIpO1xuXG4gICAgICAgIHNjcm9sbGVyLm9uKCdzY3JvbGxzdGFydCcsIGUgPT4ge1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNjcm9sbGVyLm9uKCdzY3JvbGxpbmcnLCBlID0+IHtcbiAgICAgICAgICAgIHNjcm9sbFggPSBlLng7XG4gICAgICAgICAgICBzY3JvbGxZID0gZS55O1xuICAgICAgICAgICAgaG92ZXJTbGljZSA9IHN0YWdlLmdldEhvdmVyU2xpY2Uoc2Nyb2xsWCwgc2Nyb2xsWSk7XG4gICAgICAgICAgICBmb2N1c1NsaWNlID0gc3RhZ2UuZ2V0Rm9jdXNTbGljZShzY3JvbGxYICsgc3RhZ2Uuc2xpY2VXaWR0aCAvIDIsIHNjcm9sbFkgKyBzdGFnZS5zbGljZUhlaWdodCAvIDIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzY3JvbGxlci5vbignc2Nyb2xsZW5kJywgZSA9PiB7XG4gICAgICAgICAgICBpZiAoZm9jdXNTbGljZSkge1xuICAgICAgICAgICAgICAgIGlmIChmb2N1c1NsaWNlLnR5cGUgPj0gMikge1xuICAgICAgICAgICAgICAgICAgICBzaG93VGV4dElkID0gdGlja2VyLmFkZChlbGVtZW50cy5zaG93VGV4dChmb2N1c1NsaWNlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBzY3JvbGxlci5vbigndGFwJywgZSA9PiB7XG4gICAgICAgICAgICBpZiAoZS5vcmlnaW5hbEV2ZW50LnRhcmdldCA9PT0gc3RhZ2UuY2FudmFzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFwRm9jdXNTbGljZSA9IHN0YWdlLmdldEZvY3VzU2xpY2UoZS5leCwgZS5leSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGFwRm9jdXNTbGljZSkge1xuICAgICAgICAgICAgICAgICAgICBzaG93R2xvZElkID0gdGlja2VyLmFkZChlbGVtZW50cy5zaG93R29sZCh0YXBGb2N1c1NsaWNlKSk7XG4gICAgICAgICAgICAgICAgICAgIHRpY2tlci5lbmQoc2hvd0dsb2RJZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbHlDb2luSWQgPSB0aWNrZXIuYWRkKGVsZW1lbnRzLmZseUNvaW4odGFwRm9jdXNTbGljZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRpY2tlci5vbignYWZ0ZXJ0aWNrJywgZSA9PiB7XG4gICAgICAgICAgICBmb3VuZCAmJiBmb3VuZC51cGRhdGUoXG4gICAgICAgICAgICAgICAgc3RhZ2Uuc3BlY2lhbEFtb3VudCxcbiAgICAgICAgICAgICAgICBzdGFnZS5zcGVjaWFsRm91bmQsXG4gICAgICAgICAgICAgICAgc3RhZ2UudG90YWxBbW91bnQsXG4gICAgICAgICAgICAgICAgc3RhZ2UuaG92ZXJlZEFtb3VudFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgZWxlbWVudHMuZHJhd0ltYWdlcyhob3ZlclNsaWNlLCBmb2N1c1NsaWNlLCBzY3JvbGxYLCBzY3JvbGxZLCBlKTtcblxuICAgICAgICAgICAgc3RhZ2Uub2Zmc2NyZWVuUmVuZGVyLmNsZWFyUmVjdCgwLCAwLCBzdGFnZS52dywgc3RhZ2UudmgpO1xuICAgICAgICAgICAgc3RhZ2Uub2Zmc2NyZWVuUmVuZGVyLmRyYXdJbWFnZShzdGFyLmltYWdlLCAwLCBzdGFyUm9sbFksIHN0YWdlLnZ3LCBzdGFnZS52aCwgMCwgMCwgc3RhZ2UudncsIHN0YWdlLnZoKTtcbiAgICAgICAgICAgIHN0YWdlLm9mZnNjcmVlblJlbmRlci5kcmF3SW1hZ2UoZWxlbWVudHMuY2FudmFzLCAwLCAwLCBzdGFnZS52dywgc3RhZ2UudmgsIDAsIDAsIHN0YWdlLnZ3LCBzdGFnZS52aCk7XG5cbiAgICAgICAgICAgIHN0YWdlLnJlbmRlci5jbGVhclJlY3QoMCwgMCwgc3RhZ2UudncsIHN0YWdlLnZoKTtcbiAgICAgICAgICAgIHN0YWdlLnJlbmRlci5kcmF3SW1hZ2Uoc3RhZ2Uub2Zmc2NyZWVuQ2FudmFzLCAwLCAwLCBzdGFnZS52dywgc3RhZ2UudmgsIDAsIDAsIHN0YWdlLnZ3LCBzdGFnZS52aCk7XG4gICAgICAgIH0pO1xuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4geyAvLyBzaG93IGhlbGxvd29ybGRcbiAgICAgICAgY29uc3QgcmVwZWF0ID0gMztcbiAgICAgICAgbGV0IHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlcGVhdDsgaSsrKSB7XG4gICAgICAgICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0aWNrZXJJZCA9IHRpY2tlci5hZGQoaGVsbG9Xb3JsZC5wbGF5KCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aWNrZXIuZW5kKHRpY2tlcklkKTtcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4gZGVsYXkoNTAwICsgTWF0aC5yYW5kb20oKSAqIDIwMCkpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKCgpID0+XG4gICAgICAgICAgICAgICAgaGVsbG9Xb3JsZC5zdGFydCgoKSA9PiBtdXNpYy5wbGF5KCkpXG4gICAgICAgICAgICAgICAgKTtcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHsgLy8gbWFwXG4gICAgICAgIG1hcCA9IG5ldyBNYXAodmlld3BvcnQsIHN0YWdlLmhTbGljZSwgc3RhZ2UudlNsaWNlKTtcblxuICAgICAgICBsZXQgcmFuZG9tVGV4dElkO1xuXG4gICAgICAgIHNjcm9sbGVyLm9uKCdzY3JvbGxzdGFydCcsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKHJhbmRvbVRleHRJZCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmFuZG9tVGV4dElkID0gdGlja2VyLmFkZChtYXAucmFuZG9tVGV4dCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2Nyb2xsZXIub24oJ3Njcm9sbGluZycsIGUgPT4ge1xuICAgICAgICAgICAgY29uc3QgeHAgPSBlLnggLyBzdGFnZS53aWR0aDtcbiAgICAgICAgICAgIGNvbnN0IHlwID0gZS55IC8gc3RhZ2UuaGVpZ2h0O1xuICAgICAgICAgICAgbWFwLnVwZGF0ZSh4cCwgeXApO1xuICAgICAgICB9KTtcblxuICAgICAgICBzY3JvbGxlci5vbignc2Nyb2xsZW5kJywgZSA9PiB7XG4gICAgICAgICAgICBjb25zdCB4cCA9IGUueCAvIHN0YWdlLndpZHRoO1xuICAgICAgICAgICAgY29uc3QgeXAgPSBlLnkgLyBzdGFnZS5oZWlnaHQ7XG4gICAgICAgICAgICBtYXAuY2xlYXIoeHAsIHlwKTtcblxuICAgICAgICAgICAgY29uc3QgZm9jdXNTbGljZSA9IHN0YWdlLmdldEZvY3VzU2xpY2UoZS54ICsgc3RhZ2Uuc2xpY2VXaWR0aCAvIDIsIGUueSArIHN0YWdlLnNsaWNlSGVpZ2h0IC8gMik7XG4gICAgICAgICAgICBpZiAoZm9jdXNTbGljZSAmJiBmb2N1c1NsaWNlLmRpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgdGlja2VyLmRlbGV0ZShyYW5kb21UZXh0SWQpO1xuICAgICAgICAgICAgICAgIHJhbmRvbVRleHRJZCA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICBtYXAudGV4dChmb2N1c1NsaWNlLmRpc3RhbmNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG1hcC5yZWFkeSgpO1xuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4geyAvLyBmb3VuZFxuICAgICAgICBmb3VuZCA9IG5ldyBGb3VuZCh2aWV3cG9ydCwgaXRlbXMpO1xuXG4gICAgICAgIGZvdW5kLm9uKCd1cGRhdGUnLCAoe1xuICAgICAgICAgICAgZm91bmQsXG4gICAgICAgICAgICBhbW91bnQsXG4gICAgICAgICAgICB0b3RhbCxcbiAgICAgICAgICAgIGZvY3VzXG4gICAgICAgIH0pID0+IHtcbiAgICAgICAgICAgIGxldCBjb25maWc7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHt9O1xuXG4gICAgICAgICAgICBkYXRhLm0gPSBwYXJzZUludCh0aWNrZXIuZWxhcHNlZCAvIDEwMDAgLyA2MCk7XG4gICAgICAgICAgICBkYXRhLnMgPSBwYXJzZUludCh0aWNrZXIuZWxhcHNlZCAvIDEwMDAgLSA2MCAqIGRhdGEubSk7XG4gICAgICAgICAgICBkYXRhLm4gPSBmb3VuZDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuXG4gICAgICAgICAgICBpZiAoZm91bmQgPT09IGFtb3VudFxuICAgICAgICAgICAgICAgICYmIGZvY3VzID09PSB0b3RhbCkge1xuICAgICAgICAgICAgICAgIGNvbmZpZyA9IHRleHRDb25maWdbJ2dnJ107XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZvY3VzID09PSB0b3RhbCkge1xuICAgICAgICAgICAgICAgIGNvbmZpZyA9IHRleHRDb25maWdbJ2JsYWNrc2hlZXB3YWxsJ107XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZvdW5kID09PSAxKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnID0gdGV4dENvbmZpZ1snZ2wnXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uZmlnID0gdGV4dENvbmZpZ1tgZm91bmQke2ZvdW5kfWBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY29uZmlnICYmICFjb25maWcuc2hvd24pIHtcbiAgICAgICAgICAgICAgICBjb25maWcuc2hvd24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmIChjb25maWcudHlwZSA9PT0gJ3RpcCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd1RpcChjb25maWcsIGRhdGEpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLnR5cGUgPT09ICdwb3B1cCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd1BvcChjb25maWcsIGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZvdW5kLnJlYWR5KCk7XG4gICAgfSlcbiAgICAudGhlbigoKSA9PiB7IC8vIHBvcFxuICAgICAgICBwb3AgPSBuZXcgUG9wKHZpZXdwb3J0KTtcbiAgICAgICAgcmV0dXJuIHBvcC5yZWFkeSgpO1xuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4geyAvLyB0aXBcbiAgICAgICAgdGlwID0gbmV3IFRpcCh2aWV3cG9ydCk7XG4gICAgICAgIHJldHVybiB0aXAucmVhZHkoKTtcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHsgLy8gc2hhcmVcbiAgICAgICAgc2hhcmUgPSBuZXcgU2hhcmUodmlld3BvcnQsIGl0ZW1zKTtcbiAgICAgICAgcmV0dXJuIHNoYXJlLnJlYWR5KCk7XG4gICAgfSlcbiAgICAudGhlbigoKSA9PiB7IC8vIGJvbmVcbiAgICAgICAgY29uc3QgYm9uZVggPSBzdGFnZS53aWR0aCAvIDIgLSBzdGFnZS52dyAvIDI7XG4gICAgICAgIGNvbnN0IGJvbmVZID0gc3RhZ2UuaGVpZ2h0IC0gc3RhZ2UudmggLyAyO1xuICAgICAgICBzY3JvbGxlci5lbmFibGUgPSB0cnVlO1xuICAgICAgICBzY3JvbGxlci5zY3JvbGxUbyhib25lWCwgYm9uZVkpO1xuICAgIH0pXG4gICAgLy8gLnRoZW4oKCkgPT4gZGVsYXkoMjAwMCkpXG4gICAgLnRoZW4oKCkgPT4geyAvLyBzaG93IGd1aWRlXG4gICAgICAgIC8vIHNob3dUaXAodGV4dENvbmZpZy5mb3VuZDUpO1xuICAgICAgICAvLyBzaG93UG9wKHRleHRDb25maWcuZ2csIHtcbiAgICAgICAgLy8gICAgIG06IDEsXG4gICAgICAgIC8vICAgICBzOiA1LFxuICAgICAgICAvLyAgICAgbjogNlxuICAgICAgICAvLyB9KTtcbiAgICB9KVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9nYW1lLmpzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL2dhbWUuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLy4uL25vZGVfbW9kdWxlcy8uMC4xMy4xQHN0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvaW5kZXguanMhLi9nYW1lLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vZ2FtZS5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2dhbWUuY3NzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIjZ2FtZSB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIG1hcmdpbjogMDtcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjI1LjBAY3NzLWxvYWRlciEuL3NyYy9nYW1lLmNzc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdHZhciBsaXN0ID0gW107XHJcblxyXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcclxuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XHJcblx0XHR2YXIgcmVzdWx0ID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHRoaXNbaV07XHJcblx0XHRcdGlmKGl0ZW1bMl0pIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGl0ZW1bMV0gKyBcIn1cIik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbVsxXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHQuam9pbihcIlwiKTtcclxuXHR9O1xyXG5cclxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxyXG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcclxuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxyXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XHJcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcclxuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxyXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xyXG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXHJcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXHJcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXHJcblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXHJcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XHJcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XHJcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHRyZXR1cm4gbGlzdDtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjI1LjBAY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG52YXIgc3R5bGVzSW5Eb20gPSB7fSxcclxuXHRtZW1vaXplID0gZnVuY3Rpb24oZm4pIHtcclxuXHRcdHZhciBtZW1vO1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdFx0cmV0dXJuIG1lbW87XHJcblx0XHR9O1xyXG5cdH0sXHJcblx0aXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gL21zaWUgWzYtOV1cXGIvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSk7XHJcblx0fSksXHJcblx0Z2V0SGVhZEVsZW1lbnQgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcclxuXHR9KSxcclxuXHRzaW5nbGV0b25FbGVtZW50ID0gbnVsbCxcclxuXHRzaW5nbGV0b25Db3VudGVyID0gMCxcclxuXHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XHJcblx0aWYodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XHJcblx0XHRpZih0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcclxuXHR9XHJcblxyXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxyXG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcclxuXHJcblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIDxoZWFkPi5cclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xyXG5cclxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QpO1xyXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xyXG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcclxuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xyXG5cdFx0fVxyXG5cdFx0aWYobmV3TGlzdCkge1xyXG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QpO1xyXG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XHJcblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcclxuXHRcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspXHJcblx0XHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXSgpO1xyXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpIHtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0aWYoZG9tU3R5bGUpIHtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyhsaXN0KSB7XHJcblx0dmFyIHN0eWxlcyA9IFtdO1xyXG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xyXG5cdFx0dmFyIGlkID0gaXRlbVswXTtcclxuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xyXG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcclxuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xyXG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xyXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pXHJcblx0XHRcdHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcclxuXHR9XHJcblx0cmV0dXJuIHN0eWxlcztcclxufVxyXG5cclxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCkge1xyXG5cdHZhciBoZWFkID0gZ2V0SGVhZEVsZW1lbnQoKTtcclxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcFtzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcclxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xyXG5cdFx0aWYoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XHJcblx0XHRcdGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgaGVhZC5maXJzdENoaWxkKTtcclxuXHRcdH0gZWxzZSBpZihsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xyXG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGVFbGVtZW50KTtcclxuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcclxuXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcuIE11c3QgYmUgJ3RvcCcgb3IgJ2JvdHRvbScuXCIpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xyXG5cdHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0dmFyIGlkeCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGVFbGVtZW50KTtcclxuXHRpZihpZHggPj0gMCkge1xyXG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcblx0c3R5bGVFbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCk7XHJcblx0cmV0dXJuIHN0eWxlRWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucykge1xyXG5cdHZhciBsaW5rRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xyXG5cdGxpbmtFbGVtZW50LnJlbCA9IFwic3R5bGVzaGVldFwiO1xyXG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rRWxlbWVudCk7XHJcblx0cmV0dXJuIGxpbmtFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZShvYmosIG9wdGlvbnMpIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50LCB1cGRhdGUsIHJlbW92ZTtcclxuXHJcblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XHJcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcclxuXHRcdHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xyXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgZmFsc2UpO1xyXG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSk7XHJcblx0fSBlbHNlIGlmKG9iai5zb3VyY2VNYXAgJiZcclxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XHJcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuXHRcdFx0aWYoc3R5bGVFbGVtZW50LmhyZWYpXHJcblx0XHRcdFx0VVJMLnJldm9rZU9iamVjdFVSTChzdHlsZUVsZW1lbnQuaHJlZik7XHJcblx0XHR9O1xyXG5cdH0gZWxzZSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHR1cGRhdGUob2JqKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xyXG5cdFx0aWYobmV3T2JqKSB7XHJcblx0XHRcdGlmKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcClcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmVtb3ZlKCk7XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgdGV4dFN0b3JlID0gW107XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XHJcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XHJcblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcclxuXHR9O1xyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyhzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xyXG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcclxuXHJcblx0aWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcclxuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGVFbGVtZW50LmNoaWxkTm9kZXM7XHJcblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xyXG5cclxuXHRpZihtZWRpYSkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxyXG5cdH1cclxuXHJcblx0aWYoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XHJcblx0fSBlbHNlIHtcclxuXHRcdHdoaWxlKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVMaW5rKGxpbmtFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcclxuXHJcblx0aWYoc291cmNlTWFwKSB7XHJcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxyXG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xyXG5cdH1cclxuXHJcblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XHJcblxyXG5cdHZhciBvbGRTcmMgPSBsaW5rRWxlbWVudC5ocmVmO1xyXG5cclxuXHRsaW5rRWxlbWVudC5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuXHJcblx0aWYob2xkU3JjKVxyXG5cdFx0VVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4xMy4xQHN0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJjb25zdCB3aW4gPSB3aW5kb3c7XG5jb25zdCB7XG4gICAgZG9jdW1lbnQ6IGRvYyxcbiAgICBQcm9taXNlLFxuICAgIGNyZWF0ZWpzXG59ID0gd2luO1xuXG5mdW5jdGlvbiBhcHBlbmRTdHlsZShjc3NUZXh0KSB7XG4gICAgY29uc3Qgc3R5bGUgPSBkb2MuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBzdHlsZS50ZXh0Q29udGVudCA9IGNzc1RleHQ7XG4gICAgZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5mdW5jdGlvbiBkb21yZWFkeSgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAoZG9jLnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgcmVzb2x2ZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZGVmZXIoKSB7XG4gICAgY29uc3QgZGVmZXJyZWQgPSB7fTtcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBkZWZlcnJlZC5yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgZGVmZXJyZWQucmVqZWN0ID0gcmVqZWN0XG4gICAgfSk7XG4gICAgZGVmZXJyZWQucHJvbWlzZSA9IHByb21pc2U7XG4gICAgcmV0dXJuIGRlZmVycmVkO1xufVxuXG5mdW5jdGlvbiBkZWxheSh0aW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgc2V0VGltZW91dChyZXNvbHZlLCB0aW1lKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcXVlcnkodmlld3BvcnQsIHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIHZpZXdwb3J0LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xufVxuXG5mdW5jdGlvbiBxdWVyeUFsbCh2aWV3cG9ydCwgc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gWy4uLnZpZXdwb3J0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXTtcbn1cblxuZnVuY3Rpb24gZ2V0UmVjdChlbCkge1xuICAgIHJldHVybiBlbC5yZWN0cyB8fCAoZWwucmVjdHMgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSk7XG59XG5cbmZ1bmN0aW9uIGdldERpc3RhbmNlKHgxLCB5MSwgeDIsIHkyKSB7XG4gICAgcmV0dXJuIE1hdGguc3FydCgoeDEgLSB4MikgKiAoeDEgLSB4MikgKyAoeTEgLSB5MikgKiAoeTEgLSB5MikpO1xufVxuXG5mdW5jdGlvbiBpbWcyQ2FudmFzKGltYWdlLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgY29uc3QgY2FudmFzID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlLCAwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICByZXR1cm4gW2NhbnZhcywgY29udGV4dF07XG59XG5cbmNvbnN0IHJhZiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uKGZuKSB7cmV0dXJuIHNldFRpbWVvdXQoZm4sIDEgLyA2MCl9O1xuXG5jb25zdCBjYWYgPSB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgXG4gICAgICAgICAgICB3aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uKGlkKSB7Y2xlYXJUaW1lb3V0KGlkKX07XG5cbmV4cG9ydCB7XG4gICAgd2luLFxuICAgIGRvYyxcbiAgICBkZWZlcixcbiAgICBQcm9taXNlLFxuICAgIGNyZWF0ZWpzLFxuICAgIGFwcGVuZFN0eWxlLFxuICAgIGRvbXJlYWR5LFxuICAgIGRlbGF5LFxuICAgIGltZzJDYW52YXMsXG4gICAgcXVlcnksXG4gICAgcXVlcnlBbGwsXG4gICAgZ2V0UmVjdCxcbiAgICBnZXREaXN0YW5jZSxcbiAgICByYWYsXG4gICAgY2FmXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWwuanMiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9mcm9tID0gcmVxdWlyZShcIi4uL2NvcmUtanMvYXJyYXkvZnJvbVwiKTtcblxudmFyIF9mcm9tMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Zyb20pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcnIyW2ldID0gYXJyW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBhcnIyO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAoMCwgX2Zyb20yLmRlZmF1bHQpKGFycik7XG4gIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2FycmF5L2Zyb21cIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvYXJyYXkvZnJvbS5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuYXJyYXkuZnJvbScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuQXJyYXkuZnJvbTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9hcnJheS9mcm9tLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRhdCAgPSByZXF1aXJlKCcuL19zdHJpbmctYXQnKSh0cnVlKTtcblxuLy8gMjEuMS4zLjI3IFN0cmluZy5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShTdHJpbmcsICdTdHJpbmcnLCBmdW5jdGlvbihpdGVyYXRlZCl7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGluZGV4ID0gdGhpcy5faVxuICAgICwgcG9pbnQ7XG4gIGlmKGluZGV4ID49IE8ubGVuZ3RoKXJldHVybiB7dmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZX07XG4gIHBvaW50ID0gJGF0KE8sIGluZGV4KTtcbiAgdGhpcy5faSArPSBwb2ludC5sZW5ndGg7XG4gIHJldHVybiB7dmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZX07XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIGRlZmluZWQgICA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbi8vIHRydWUgIC0+IFN0cmluZyNhdFxuLy8gZmFsc2UgLT4gU3RyaW5nI2NvZGVQb2ludEF0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFRPX1NUUklORyl7XG4gIHJldHVybiBmdW5jdGlvbih0aGF0LCBwb3Mpe1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpXG4gICAgICAsIGkgPSB0b0ludGVnZXIocG9zKVxuICAgICAgLCBsID0gcy5sZW5ndGhcbiAgICAgICwgYSwgYjtcbiAgICBpZihpIDwgMCB8fCBpID49IGwpcmV0dXJuIFRPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGEgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbCB8fCAoYiA9IHMuY2hhckNvZGVBdChpICsgMSkpIDwgMHhkYzAwIHx8IGIgPiAweGRmZmZcbiAgICAgID8gVE9fU1RSSU5HID8gcy5jaGFyQXQoaSkgOiBhXG4gICAgICA6IFRPX1NUUklORyA/IHMuc2xpY2UoaSwgaSArIDIpIDogKGEgLSAweGQ4MDAgPDwgMTApICsgKGIgLSAweGRjMDApICsgMHgxMDAwMDtcbiAgfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3RyaW5nLWF0LmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgID0gTWF0aC5jZWlsXG4gICwgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgPT0gdW5kZWZpbmVkKXRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZICAgICAgICA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCByZWRlZmluZSAgICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCBoaWRlICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIGhhcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBJdGVyYXRvcnMgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgJGl0ZXJDcmVhdGUgICAgPSByZXF1aXJlKCcuL19pdGVyLWNyZWF0ZScpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJylcbiAgLCBJVEVSQVRPUiAgICAgICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgQlVHR1kgICAgICAgICAgPSAhKFtdLmtleXMgJiYgJ25leHQnIGluIFtdLmtleXMoKSkgLy8gU2FmYXJpIGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxuICAsIEZGX0lURVJBVE9SICAgID0gJ0BAaXRlcmF0b3InXG4gICwgS0VZUyAgICAgICAgICAgPSAna2V5cydcbiAgLCBWQUxVRVMgICAgICAgICA9ICd2YWx1ZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCl7XG4gICRpdGVyQ3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgdmFyIGdldE1ldGhvZCA9IGZ1bmN0aW9uKGtpbmQpe1xuICAgIGlmKCFCVUdHWSAmJiBraW5kIGluIHByb3RvKXJldHVybiBwcm90b1traW5kXTtcbiAgICBzd2l0Y2goa2luZCl7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgfTtcbiAgdmFyIFRBRyAgICAgICAgPSBOQU1FICsgJyBJdGVyYXRvcidcbiAgICAsIERFRl9WQUxVRVMgPSBERUZBVUxUID09IFZBTFVFU1xuICAgICwgVkFMVUVTX0JVRyA9IGZhbHNlXG4gICAgLCBwcm90byAgICAgID0gQmFzZS5wcm90b3R5cGVcbiAgICAsICRuYXRpdmUgICAgPSBwcm90b1tJVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF1cbiAgICAsICRkZWZhdWx0ICAgPSAkbmF0aXZlIHx8IGdldE1ldGhvZChERUZBVUxUKVxuICAgICwgJGVudHJpZXMgICA9IERFRkFVTFQgPyAhREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKCdlbnRyaWVzJykgOiB1bmRlZmluZWRcbiAgICAsICRhbnlOYXRpdmUgPSBOQU1FID09ICdBcnJheScgPyBwcm90by5lbnRyaWVzIHx8ICRuYXRpdmUgOiAkbmF0aXZlXG4gICAgLCBtZXRob2RzLCBrZXksIEl0ZXJhdG9yUHJvdG90eXBlO1xuICAvLyBGaXggbmF0aXZlXG4gIGlmKCRhbnlOYXRpdmUpe1xuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoJGFueU5hdGl2ZS5jYWxsKG5ldyBCYXNlKSk7XG4gICAgaWYoSXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUpe1xuICAgICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgICAgc2V0VG9TdHJpbmdUYWcoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgICAvLyBmaXggZm9yIHNvbWUgb2xkIGVuZ2luZXNcbiAgICAgIGlmKCFMSUJSQVJZICYmICFoYXMoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SKSloaWRlKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgfVxuICB9XG4gIC8vIGZpeCBBcnJheSN7dmFsdWVzLCBAQGl0ZXJhdG9yfS5uYW1lIGluIFY4IC8gRkZcbiAgaWYoREVGX1ZBTFVFUyAmJiAkbmF0aXZlICYmICRuYXRpdmUubmFtZSAhPT0gVkFMVUVTKXtcbiAgICBWQUxVRVNfQlVHID0gdHJ1ZTtcbiAgICAkZGVmYXVsdCA9IGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gJG5hdGl2ZS5jYWxsKHRoaXMpOyB9O1xuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZigoIUxJQlJBUlkgfHwgRk9SQ0VEKSAmJiAoQlVHR1kgfHwgVkFMVUVTX0JVRyB8fCAhcHJvdG9bSVRFUkFUT1JdKSl7XG4gICAgaGlkZShwcm90bywgSVRFUkFUT1IsICRkZWZhdWx0KTtcbiAgfVxuICAvLyBQbHVnIGZvciBsaWJyYXJ5XG4gIEl0ZXJhdG9yc1tOQU1FXSA9ICRkZWZhdWx0O1xuICBJdGVyYXRvcnNbVEFHXSAgPSByZXR1cm5UaGlzO1xuICBpZihERUZBVUxUKXtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiAgREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiAgICBJU19TRVQgICAgID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiAkZW50cmllc1xuICAgIH07XG4gICAgaWYoRk9SQ0VEKWZvcihrZXkgaW4gbWV0aG9kcyl7XG4gICAgICBpZighKGtleSBpbiBwcm90bykpcmVkZWZpbmUocHJvdG8sIGtleSwgbWV0aG9kc1trZXldKTtcbiAgICB9IGVsc2UgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoQlVHR1kgfHwgVkFMVUVTX0JVRyksIE5BTUUsIG1ldGhvZHMpO1xuICB9XG4gIHJldHVybiBtZXRob2RzO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IHRydWU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbGlicmFyeS5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBjdHggICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIGhpZGUgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uKHR5cGUsIG5hbWUsIHNvdXJjZSl7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GXG4gICAgLCBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HXG4gICAgLCBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TXG4gICAgLCBJU19QUk9UTyAgPSB0eXBlICYgJGV4cG9ydC5QXG4gICAgLCBJU19CSU5EICAgPSB0eXBlICYgJGV4cG9ydC5CXG4gICAgLCBJU19XUkFQICAgPSB0eXBlICYgJGV4cG9ydC5XXG4gICAgLCBleHBvcnRzICAgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KVxuICAgICwgZXhwUHJvdG8gID0gZXhwb3J0c1tQUk9UT1RZUEVdXG4gICAgLCB0YXJnZXQgICAgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdXG4gICAgLCBrZXksIG93biwgb3V0O1xuICBpZihJU19HTE9CQUwpc291cmNlID0gbmFtZTtcbiAgZm9yKGtleSBpbiBzb3VyY2Upe1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgaWYob3duICYmIGtleSBpbiBleHBvcnRzKWNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBleHBvcnRzW2tleV0gPSBJU19HTE9CQUwgJiYgdHlwZW9mIHRhcmdldFtrZXldICE9ICdmdW5jdGlvbicgPyBzb3VyY2Vba2V5XVxuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgOiBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbClcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIDogSVNfV1JBUCAmJiB0YXJnZXRba2V5XSA9PSBvdXQgPyAoZnVuY3Rpb24oQyl7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgICBpZih0aGlzIGluc3RhbmNlb2YgQyl7XG4gICAgICAgICAgc3dpdGNoKGFyZ3VtZW50cy5sZW5ndGgpe1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEM7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgQyhhKTtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDKGEsIGIpO1xuICAgICAgICAgIH0gcmV0dXJuIG5ldyBDKGEsIGIsIGMpO1xuICAgICAgICB9IHJldHVybiBDLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5tZXRob2RzLiVOQU1FJVxuICAgIGlmKElTX1BST1RPKXtcbiAgICAgIChleHBvcnRzLnZpcnR1YWwgfHwgKGV4cG9ydHMudmlydHVhbCA9IHt9KSlba2V5XSA9IG91dDtcbiAgICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5wcm90b3R5cGUuJU5BTUUlXG4gICAgICBpZih0eXBlICYgJGV4cG9ydC5SICYmIGV4cFByb3RvICYmICFleHBQcm90b1trZXldKWhpZGUoZXhwUHJvdG8sIGtleSwgb3V0KTtcbiAgICB9XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgIFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7dmVyc2lvbjogJzIuNC4wJ307XG5pZih0eXBlb2YgX19lID09ICdudW1iZXInKV9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIHRoYXQsIGxlbmd0aCl7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmKHRoYXQgPT09IHVuZGVmaW5lZClyZXR1cm4gZm47XG4gIHN3aXRjaChsZW5ndGgpe1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhLCBiKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigvKiAuLi5hcmdzICovKXtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZih0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGRQICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgZFAgICAgICAgICAgICAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcyl0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZigndmFsdWUnIGluIEF0dHJpYnV0ZXMpT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoIWlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZXNjcmlwdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnRcbiAgLy8gaW4gb2xkIElFIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnXG4gICwgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBTKXtcbiAgaWYoIWlzT2JqZWN0KGl0KSlyZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZihTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgaWYoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaXRtYXAsIHZhbHVlKXtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlICA6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlICAgIDogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZSAgICAgICA6IHZhbHVlXG4gIH07XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19oaWRlJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUuanNcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGFzLmpzXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0ge307XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlcmF0b3JzLmpzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcbnZhciBjcmVhdGUgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKVxuICAsIGRlc2NyaXB0b3IgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2hpZGUnKShJdGVyYXRvclByb3RvdHlwZSwgcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyksIGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCl7XG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwge25leHQ6IGRlc2NyaXB0b3IoMSwgbmV4dCl9KTtcbiAgc2V0VG9TdHJpbmdUYWcoQ29uc3RydWN0b3IsIE5BTUUgKyAnIEl0ZXJhdG9yJyk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxudmFyIGFuT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBkUHMgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcHMnKVxuICAsIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpXG4gICwgSUVfUFJPVE8gICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJylcbiAgLCBFbXB0eSAgICAgICA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH1cbiAgLCBQUk9UT1RZUEUgICA9ICdwcm90b3R5cGUnO1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgY3JlYXRlRGljdCA9IGZ1bmN0aW9uKCl7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2lmcmFtZScpXG4gICAgLCBpICAgICAgPSBlbnVtQnVnS2V5cy5sZW5ndGhcbiAgICAsIGx0ICAgICA9ICc8J1xuICAgICwgZ3QgICAgID0gJz4nXG4gICAgLCBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHJlcXVpcmUoJy4vX2h0bWwnKS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zY3JpcHQtdXJsXG4gIC8vIGNyZWF0ZURpY3QgPSBpZnJhbWUuY29udGVudFdpbmRvdy5PYmplY3Q7XG4gIC8vIGh0bWwucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShsdCArICdzY3JpcHQnICsgZ3QgKyAnZG9jdW1lbnQuRj1PYmplY3QnICsgbHQgKyAnL3NjcmlwdCcgKyBndCk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIGNyZWF0ZURpY3QgPSBpZnJhbWVEb2N1bWVudC5GO1xuICB3aGlsZShpLS0pZGVsZXRlIGNyZWF0ZURpY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tpXV07XG4gIHJldHVybiBjcmVhdGVEaWN0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpe1xuICB2YXIgcmVzdWx0O1xuICBpZihPICE9PSBudWxsKXtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5O1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IGNyZWF0ZURpY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRQcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGRQICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgZ2V0S2V5cyAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcyl7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyAgID0gZ2V0S2V5cyhQcm9wZXJ0aWVzKVxuICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAsIGkgPSAwXG4gICAgLCBQO1xuICB3aGlsZShsZW5ndGggPiBpKWRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XG4gIHJldHVybiBPO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHBzLmpzXG4vLyBtb2R1bGUgaWQgPSAzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKVxuICAsIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTyl7XG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBoYXMgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIHRvSU9iamVjdCAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpXG4gICwgSUVfUFJPVE8gICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgbmFtZXMpe1xuICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KG9iamVjdClcbiAgICAsIGkgICAgICA9IDBcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBrZXk7XG4gIGZvcihrZXkgaW4gTylpZihrZXkgIT0gSUVfUFJPVE8paGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKWlmKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSl7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qc1xuLy8gbW9kdWxlIGlkID0gMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpXG4gICwgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWlvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvTGVuZ3RoICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgdG9JbmRleCAgID0gcmVxdWlyZSgnLi9fdG8taW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oSVNfSU5DTFVERVMpe1xuICByZXR1cm4gZnVuY3Rpb24oJHRoaXMsIGVsLCBmcm9tSW5kZXgpe1xuICAgIHZhciBPICAgICAgPSB0b0lPYmplY3QoJHRoaXMpXG4gICAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSB0b0luZGV4KGZyb21JbmRleCwgbGVuZ3RoKVxuICAgICAgLCB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgaWYoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpd2hpbGUobGVuZ3RoID4gaW5kZXgpe1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgaWYodmFsdWUgIT0gdmFsdWUpcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjdG9JbmRleCBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKWlmKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pe1xuICAgICAgaWYoT1tpbmRleF0gPT09IGVsKXJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanNcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBtYXggICAgICAgPSBNYXRoLm1heFxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpbmRleCwgbGVuZ3RoKXtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCdrZXlzJylcbiAgLCB1aWQgICAgPSByZXF1aXJlKCcuL191aWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHNoYXJlZFtrZXldIHx8IChzaGFyZWRba2V5XSA9IHVpZChrZXkpKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qc1xuLy8gbW9kdWxlIGlkID0gNDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJ1xuICAsIHN0b3JlICA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qc1xuLy8gbW9kdWxlIGlkID0gNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgaWQgPSAwXG4gICwgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanNcbi8vIG1vZHVsZSBpZCA9IDQ3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gNDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19odG1sLmpzXG4vLyBtb2R1bGUgaWQgPSA0OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBkZWYgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mXG4gICwgaGFzID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgdGFnLCBzdGF0KXtcbiAgaWYoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSlkZWYoaXQsIFRBRywge2NvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHRhZ30pO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qc1xuLy8gbW9kdWxlIGlkID0gNTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgc3RvcmUgICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCd3a3MnKVxuICAsIHVpZCAgICAgICAgPSByZXF1aXJlKCcuL191aWQnKVxuICAsIFN5bWJvbCAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5TeW1ib2xcbiAgLCBVU0VfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PSAnZnVuY3Rpb24nO1xuXG52YXIgJGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUpe1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBVU0VfU1lNQk9MICYmIFN5bWJvbFtuYW1lXSB8fCAoVVNFX1NZTUJPTCA/IFN5bWJvbCA6IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTtcblxuJGV4cG9ydHMuc3RvcmUgPSBzdG9yZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MuanNcbi8vIG1vZHVsZSBpZCA9IDUxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gMTkuMS4yLjkgLyAxNS4yLjMuMiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciBoYXMgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgdG9PYmplY3QgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIElFX1BST1RPICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpXG4gICwgT2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbihPKXtcbiAgTyA9IHRvT2JqZWN0KE8pO1xuICBpZihoYXMoTywgSUVfUFJPVE8pKXJldHVybiBPW0lFX1BST1RPXTtcbiAgaWYodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcil7XG4gICAgcmV0dXJuIE8uY29uc3RydWN0b3IucHJvdG90eXBlO1xuICB9IHJldHVybiBPIGluc3RhbmNlb2YgT2JqZWN0ID8gT2JqZWN0UHJvdG8gOiBudWxsO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ3BvLmpzXG4vLyBtb2R1bGUgaWQgPSA1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGN0eCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgdG9PYmplY3QgICAgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIGNhbGwgICAgICAgICAgID0gcmVxdWlyZSgnLi9faXRlci1jYWxsJylcbiAgLCBpc0FycmF5SXRlciAgICA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKVxuICAsIHRvTGVuZ3RoICAgICAgID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX2NyZWF0ZS1wcm9wZXJ0eScpXG4gICwgZ2V0SXRlckZuICAgICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19pdGVyLWRldGVjdCcpKGZ1bmN0aW9uKGl0ZXIpeyBBcnJheS5mcm9tKGl0ZXIpOyB9KSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjIuMSBBcnJheS5mcm9tKGFycmF5TGlrZSwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gIGZyb206IGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlLyosIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKi8pe1xuICAgIHZhciBPICAgICAgID0gdG9PYmplY3QoYXJyYXlMaWtlKVxuICAgICAgLCBDICAgICAgID0gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyA/IHRoaXMgOiBBcnJheVxuICAgICAgLCBhTGVuICAgID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgLCBtYXBmbiAgID0gYUxlbiA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWRcbiAgICAgICwgbWFwcGluZyA9IG1hcGZuICE9PSB1bmRlZmluZWRcbiAgICAgICwgaW5kZXggICA9IDBcbiAgICAgICwgaXRlckZuICA9IGdldEl0ZXJGbihPKVxuICAgICAgLCBsZW5ndGgsIHJlc3VsdCwgc3RlcCwgaXRlcmF0b3I7XG4gICAgaWYobWFwcGluZyltYXBmbiA9IGN0eChtYXBmbiwgYUxlbiA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQsIDIpO1xuICAgIC8vIGlmIG9iamVjdCBpc24ndCBpdGVyYWJsZSBvciBpdCdzIGFycmF5IHdpdGggZGVmYXVsdCBpdGVyYXRvciAtIHVzZSBzaW1wbGUgY2FzZVxuICAgIGlmKGl0ZXJGbiAhPSB1bmRlZmluZWQgJiYgIShDID09IEFycmF5ICYmIGlzQXJyYXlJdGVyKGl0ZXJGbikpKXtcbiAgICAgIGZvcihpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKE8pLCByZXN1bHQgPSBuZXcgQzsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOyBpbmRleCsrKXtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IGNhbGwoaXRlcmF0b3IsIG1hcGZuLCBbc3RlcC52YWx1ZSwgaW5kZXhdLCB0cnVlKSA6IHN0ZXAudmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgICBmb3IocmVzdWx0ID0gbmV3IEMobGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4Kyspe1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCBtYXBwaW5nID8gbWFwZm4oT1tpbmRleF0sIGluZGV4KSA6IE9baW5kZXhdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0Lmxlbmd0aCA9IGluZGV4O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuZnJvbS5qc1xuLy8gbW9kdWxlIGlkID0gNTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBjYWxsIHNvbWV0aGluZyBvbiBpdGVyYXRvciBzdGVwIHdpdGggc2FmZSBjbG9zaW5nIG9uIGVycm9yXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXRlcmF0b3IsIGZuLCB2YWx1ZSwgZW50cmllcyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGVudHJpZXMgPyBmbihhbk9iamVjdCh2YWx1ZSlbMF0sIHZhbHVlWzFdKSA6IGZuKHZhbHVlKTtcbiAgLy8gNy40LjYgSXRlcmF0b3JDbG9zZShpdGVyYXRvciwgY29tcGxldGlvbilcbiAgfSBjYXRjaChlKXtcbiAgICB2YXIgcmV0ID0gaXRlcmF0b3JbJ3JldHVybiddO1xuICAgIGlmKHJldCAhPT0gdW5kZWZpbmVkKWFuT2JqZWN0KHJldC5jYWxsKGl0ZXJhdG9yKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNhbGwuanNcbi8vIG1vZHVsZSBpZCA9IDU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gY2hlY2sgb24gZGVmYXVsdCBBcnJheSBpdGVyYXRvclxudmFyIEl0ZXJhdG9ycyAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIElURVJBVE9SICAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgIT09IHVuZGVmaW5lZCAmJiAoSXRlcmF0b3JzLkFycmF5ID09PSBpdCB8fCBBcnJheVByb3RvW0lURVJBVE9SXSA9PT0gaXQpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA1NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcbnZhciAkZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGNyZWF0ZURlc2MgICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIGluZGV4LCB2YWx1ZSl7XG4gIGlmKGluZGV4IGluIG9iamVjdCkkZGVmaW5lUHJvcGVydHkuZihvYmplY3QsIGluZGV4LCBjcmVhdGVEZXNjKDAsIHZhbHVlKSk7XG4gIGVsc2Ugb2JqZWN0W2luZGV4XSA9IHZhbHVlO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jcmVhdGUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGNsYXNzb2YgICA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKVxuICAsIElURVJBVE9SICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvck1ldGhvZCA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgIT0gdW5kZWZpbmVkKXJldHVybiBpdFtJVEVSQVRPUl1cbiAgICB8fCBpdFsnQEBpdGVyYXRvciddXG4gICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanNcbi8vIG1vZHVsZSBpZCA9IDU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gZ2V0dGluZyB0YWcgZnJvbSAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKVxuICAsIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpXG4gIC8vIEVTMyB3cm9uZyBoZXJlXG4gICwgQVJHID0gY29mKGZ1bmN0aW9uKCl7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT0gJ0FyZ3VtZW50cyc7XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIFNjcmlwdCBBY2Nlc3MgRGVuaWVkIGVycm9yXG52YXIgdHJ5R2V0ID0gZnVuY3Rpb24oaXQsIGtleSl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgTywgVCwgQjtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKFQgPSB0cnlHZXQoTyA9IE9iamVjdChpdCksIFRBRykpID09ICdzdHJpbmcnID8gVFxuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQVJHID8gY29mKE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKEIgPSBjb2YoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiBCO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jbGFzc29mLmpzXG4vLyBtb2R1bGUgaWQgPSA1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBJVEVSQVRPUiAgICAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIFNBRkVfQ0xPU0lORyA9IGZhbHNlO1xuXG50cnkge1xuICB2YXIgcml0ZXIgPSBbN11bSVRFUkFUT1JdKCk7XG4gIHJpdGVyWydyZXR1cm4nXSA9IGZ1bmN0aW9uKCl7IFNBRkVfQ0xPU0lORyA9IHRydWU7IH07XG4gIEFycmF5LmZyb20ocml0ZXIsIGZ1bmN0aW9uKCl7IHRocm93IDI7IH0pO1xufSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMsIHNraXBDbG9zaW5nKXtcbiAgaWYoIXNraXBDbG9zaW5nICYmICFTQUZFX0NMT1NJTkcpcmV0dXJuIGZhbHNlO1xuICB2YXIgc2FmZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBhcnIgID0gWzddXG4gICAgICAsIGl0ZXIgPSBhcnJbSVRFUkFUT1JdKCk7XG4gICAgaXRlci5uZXh0ID0gZnVuY3Rpb24oKXsgcmV0dXJuIHtkb25lOiBzYWZlID0gdHJ1ZX07IH07XG4gICAgYXJyW0lURVJBVE9SXSA9IGZ1bmN0aW9uKCl7IHJldHVybiBpdGVyOyB9O1xuICAgIGV4ZWMoYXJyKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gc2FmZTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZXRlY3QuanNcbi8vIG1vZHVsZSBpZCA9IDYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiaW1wb3J0IHtcbiAgICB3aW4sXG4gICAgZG9jLFxuICAgIFByb21pc2UsXG4gICAgcXVlcnksXG4gICAgcXVlcnlBbGwsXG4gICAgZ2V0UmVjdFxufSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0ICdnZXN0dXJlLWpzJztcbmltcG9ydCBFdmVudCBmcm9tICcuL2V2ZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Nyb2xsZXIgZXh0ZW5kcyBFdmVudHtcbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0LCB2dywgdmgsIHNjYWxlID0gMSwgZHByID0gMSkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX2lzU2Nyb2xsaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2VuYWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9zY2FsZSA9IHNjYWxlO1xuICAgICAgICB0aGlzLmRwciA9IGRwcjtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy52dyA9IHZ3O1xuICAgICAgICB0aGlzLnZoID0gdmg7XG4gICAgICAgIHRoaXMueCA9IDA7XG4gICAgICAgIHRoaXMueSA9IDA7XG4gICAgICAgIHRoaXMubHggPSAwO1xuICAgICAgICB0aGlzLmx5ID0gMDtcbiAgICB9XG5cbiAgICBnZXQgaXNTY3JvbGxpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc1Njcm9sbGluZztcbiAgICB9XG5cbiAgICBnZXQgc2NhbGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZTtcbiAgICB9XG5cbiAgICBzZXQgc2NhbGUoc2NhbGUpIHtcbiAgICAgICAgdGhpcy5fc2NhbGUgPSBzY2FsZTtcbiAgICB9XG5cbiAgICBnZXQgZW5hYmxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZW5hYmxlO1xuICAgIH1cblxuICAgIHNldCBlbmFibGUoZW5hYmxlKSB7XG4gICAgICAgIHRoaXMuX2VuYWJsZSA9IGVuYWJsZTtcbiAgICB9XG5cbiAgICBfZW1pdChuYW1lLCBvcmlnaW5hbEV2ZW50LCBleHRyYSA9IHt9KSB7XG4gICAgICAgIGNvbnN0IGUgPSB7XG4gICAgICAgICAgICB4OiB0aGlzLngsXG4gICAgICAgICAgICB5OiB0aGlzLnksXG4gICAgICAgICAgICBseDogdGhpcy5seCxcbiAgICAgICAgICAgIGx5OiB0aGlzLmx5LFxuICAgICAgICAgICAgb3JpZ2luYWxFdmVudFxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIGV4dHJhKSB7XG4gICAgICAgICAgICBlW2tleV0gPSBleHRyYVtrZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbWl0KG5hbWUsIGUpO1xuICAgIH1cblxuICAgIHJlYWR5KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5faXNTY3JvbGxpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgY29uc3QgZW1pdFRhcCA9IGUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3RhcCcsIGUsIHtcbiAgICAgICAgICAgICAgICAgICAgZXg6IHRoaXMueCArIGUudG91Y2guY2xpZW50WCAqIHRoaXMuZHByLFxuICAgICAgICAgICAgICAgICAgICBleTogdGhpcy55ICsgZS50b3VjaC5jbGllbnRZICogdGhpcy5kcHJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZW1pdFN0YXJ0ID0gZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5faXNTY3JvbGxpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMubHggPSB0aGlzLng7XG4gICAgICAgICAgICAgICAgdGhpcy5seSA9IHRoaXMueTtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbWl0KCdzY3JvbGxzdGFydCcsIGUpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29uc3QgZW1pdFNjcm9sbCA9IGUgPT4gdGhpcy5fZW1pdCgnc2Nyb2xsaW5nJywgZSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGVtaXRFbmQgPSBlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pc1Njcm9sbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Njcm9sbGVuZCcsIGUpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29uc3QgY2FsWFkgPSAoZSwgbm9TY2FsZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxhY2VtZW50WCxcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxhY2VtZW50WVxuICAgICAgICAgICAgICAgIH0gPSBlO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgc2NhbGUgPSBub1NjYWxlID8gMSA6IHRoaXMuX3NjYWxlO1xuICAgICAgICAgICAgICAgIGxldCB4ID0gdGhpcy5seCAtIGRpc3BsYWNlbWVudFggKiBzY2FsZTtcbiAgICAgICAgICAgICAgICBsZXQgeSA9IHRoaXMubHkgLSBkaXNwbGFjZW1lbnRZICogc2NhbGU7XG5cbiAgICAgICAgICAgICAgICB4ID0gTWF0aC5taW4oTWF0aC5tYXgoMCwgeCksIHRoaXMud2lkdGggLSB0aGlzLnZ3KTtcbiAgICAgICAgICAgICAgICB5ID0gTWF0aC5taW4oTWF0aC5tYXgoMCwgeSksIHRoaXMuaGVpZ2h0IC0gdGhpcy52aCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICAgICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRvYy5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3RhcCcsIGUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2VuYWJsZSAmJiBlbWl0VGFwKGUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRvYy5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3BhbnN0YXJ0JywgZSA9PiBcbiAgICAgICAgICAgICAgICB0aGlzLl9lbmFibGUgJiYgZW1pdFN0YXJ0KGUpXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBkb2MuYm9keS5hZGRFdmVudExpc3RlbmVyKCdwYW5tb3ZlJywgZSA9PiBcbiAgICAgICAgICAgICAgICB0aGlzLl9lbmFibGUgJiYgY2FsWFkoZSkgJiYgZW1pdFNjcm9sbChlKSBcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGRvYy5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3BhbmVuZCcsIGUgPT4gXG4gICAgICAgICAgICAgICAgdGhpcy5fZW5hYmxlICYmIGVtaXRFbmQoZSkgICAgICBcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG8gPSAoeCwgeSkgPT4ge1xuICAgICAgICAgICAgICAgIGVtaXRTdGFydCgpO1xuICAgICAgICAgICAgICAgIGNhbFhZKHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxhY2VtZW50WDogdGhpcy54IC0geCxcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxhY2VtZW50WTogdGhpcy55IC0geVxuICAgICAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICAgICAgICAgIGVtaXRTY3JvbGwoKTtcbiAgICAgICAgICAgICAgICBlbWl0RW5kKCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2Nyb2xsZXIuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1wcm90b3R5cGUtb2ZcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanNcbi8vIG1vZHVsZSBpZCA9IDYyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmdldC1wcm90b3R5cGUtb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5nZXRQcm90b3R5cGVPZjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qc1xuLy8gbW9kdWxlIGlkID0gNjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyAxOS4xLjIuOSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciB0b09iamVjdCAgICAgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsICRnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdnZXRQcm90b3R5cGVPZicsIGZ1bmN0aW9uKCl7XG4gIHJldHVybiBmdW5jdGlvbiBnZXRQcm90b3R5cGVPZihpdCl7XG4gICAgcmV0dXJuICRnZXRQcm90b3R5cGVPZih0b09iamVjdChpdCkpO1xuICB9O1xufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmdldC1wcm90b3R5cGUtb2YuanNcbi8vIG1vZHVsZSBpZCA9IDY0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gbW9zdCBPYmplY3QgbWV0aG9kcyBieSBFUzYgc2hvdWxkIGFjY2VwdCBwcmltaXRpdmVzXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgY29yZSAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIGZhaWxzICAgPSByZXF1aXJlKCcuL19mYWlscycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihLRVksIGV4ZWMpe1xuICB2YXIgZm4gID0gKGNvcmUuT2JqZWN0IHx8IHt9KVtLRVldIHx8IE9iamVjdFtLRVldXG4gICAgLCBleHAgPSB7fTtcbiAgZXhwW0tFWV0gPSBleGVjKGZuKTtcbiAgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiBmYWlscyhmdW5jdGlvbigpeyBmbigxKTsgfSksICdPYmplY3QnLCBleHApO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qtc2FwLmpzXG4vLyBtb2R1bGUgaWQgPSA2NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanNcbi8vIG1vZHVsZSBpZCA9IDY2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmluZVByb3BlcnR5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICgwLCBfZGVmaW5lUHJvcGVydHkyLmRlZmF1bHQpKHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzXG4vLyBtb2R1bGUgaWQgPSA2N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDY4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKXtcbiAgcmV0dXJuICRPYmplY3QuZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDY5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbi8vIDE5LjEuMi40IC8gMTUuMi4zLjYgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpLCAnT2JqZWN0Jywge2RlZmluZVByb3BlcnR5OiByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF90eXBlb2YyID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG52YXIgX3R5cGVvZjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90eXBlb2YyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHNlbGYsIGNhbGwpIHtcbiAgaWYgKCFzZWxmKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIGNhbGwgJiYgKCh0eXBlb2YgY2FsbCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiAoMCwgX3R5cGVvZjMuZGVmYXVsdCkoY2FsbCkpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuLmpzXG4vLyBtb2R1bGUgaWQgPSA3MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2l0ZXJhdG9yID0gcmVxdWlyZShcIi4uL2NvcmUtanMvc3ltYm9sL2l0ZXJhdG9yXCIpO1xuXG52YXIgX2l0ZXJhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2l0ZXJhdG9yKTtcblxudmFyIF9zeW1ib2wgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9zeW1ib2xcIik7XG5cbnZhciBfc3ltYm9sMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N5bWJvbCk7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgX2l0ZXJhdG9yMi5kZWZhdWx0ID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gX3N5bWJvbDIuZGVmYXVsdCAmJiBvYmogIT09IF9zeW1ib2wyLmRlZmF1bHQucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgX3R5cGVvZihfaXRlcmF0b3IyLmRlZmF1bHQpID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG9iaik7XG59IDogZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICYmIHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBfc3ltYm9sMi5kZWZhdWx0ICYmIG9iaiAhPT0gX3N5bWJvbDIuZGVmYXVsdC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG9iaik7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy90eXBlb2YuanNcbi8vIG1vZHVsZSBpZCA9IDcyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wvaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDczXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fd2tzLWV4dCcpLmYoJ2l0ZXJhdG9yJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA3NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgZ2xvYmFsICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgaGlkZSAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIEl0ZXJhdG9ycyAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIFRPX1NUUklOR19UQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxuZm9yKHZhciBjb2xsZWN0aW9ucyA9IFsnTm9kZUxpc3QnLCAnRE9NVG9rZW5MaXN0JywgJ01lZGlhTGlzdCcsICdTdHlsZVNoZWV0TGlzdCcsICdDU1NSdWxlTGlzdCddLCBpID0gMDsgaSA8IDU7IGkrKyl7XG4gIHZhciBOQU1FICAgICAgID0gY29sbGVjdGlvbnNbaV1cbiAgICAsIENvbGxlY3Rpb24gPSBnbG9iYWxbTkFNRV1cbiAgICAsIHByb3RvICAgICAgPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlO1xuICBpZihwcm90byAmJiAhcHJvdG9bVE9fU1RSSU5HX1RBR10paGlkZShwcm90bywgVE9fU1RSSU5HX1RBRywgTkFNRSk7XG4gIEl0ZXJhdG9yc1tOQU1FXSA9IEl0ZXJhdG9ycy5BcnJheTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDc1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuL19hZGQtdG8tdW5zY29wYWJsZXMnKVxuICAsIHN0ZXAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLXN0ZXAnKVxuICAsIEl0ZXJhdG9ycyAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIHRvSU9iamVjdCAgICAgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG5cbi8vIDIyLjEuMy40IEFycmF5LnByb3RvdHlwZS5lbnRyaWVzKClcbi8vIDIyLjEuMy4xMyBBcnJheS5wcm90b3R5cGUua2V5cygpXG4vLyAyMi4xLjMuMjkgQXJyYXkucHJvdG90eXBlLnZhbHVlcygpXG4vLyAyMi4xLjMuMzAgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24oaXRlcmF0ZWQsIGtpbmQpe1xuICB0aGlzLl90ID0gdG9JT2JqZWN0KGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gIHRoaXMuX2sgPSBraW5kOyAgICAgICAgICAgICAgICAvLyBraW5kXG4vLyAyMi4xLjUuMi4xICVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGtpbmQgID0gdGhpcy5fa1xuICAgICwgaW5kZXggPSB0aGlzLl9pKys7XG4gIGlmKCFPIHx8IGluZGV4ID49IE8ubGVuZ3RoKXtcbiAgICB0aGlzLl90ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBzdGVwKDEpO1xuICB9XG4gIGlmKGtpbmQgPT0gJ2tleXMnICApcmV0dXJuIHN0ZXAoMCwgaW5kZXgpO1xuICBpZihraW5kID09ICd2YWx1ZXMnKXJldHVybiBzdGVwKDAsIE9baW5kZXhdKTtcbiAgcmV0dXJuIHN0ZXAoMCwgW2luZGV4LCBPW2luZGV4XV0pO1xufSwgJ3ZhbHVlcycpO1xuXG4vLyBhcmd1bWVudHNMaXN0W0BAaXRlcmF0b3JdIGlzICVBcnJheVByb3RvX3ZhbHVlcyUgKDkuNC40LjYsIDkuNC40LjcpXG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG5hZGRUb1Vuc2NvcGFibGVzKCdrZXlzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCd2YWx1ZXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ2VudHJpZXMnKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gNzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYWRkLXRvLXVuc2NvcGFibGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA3N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9uZSwgdmFsdWUpe1xuICByZXR1cm4ge3ZhbHVlOiB2YWx1ZSwgZG9uZTogISFkb25lfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1zdGVwLmpzXG4vLyBtb2R1bGUgaWQgPSA3OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX3drcycpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1leHQuanNcbi8vIG1vZHVsZSBpZCA9IDc5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbFwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wuanNcbi8vIG1vZHVsZSBpZCA9IDgwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3ltYm9sJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3LnN5bWJvbC5vYnNlcnZhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5TeW1ib2w7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA4MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0Jztcbi8vIEVDTUFTY3JpcHQgNiBzeW1ib2xzIHNoaW1cbnZhciBnbG9iYWwgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIERFU0NSSVBUT1JTICAgID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCByZWRlZmluZSAgICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCBNRVRBICAgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGEnKS5LRVlcbiAgLCAkZmFpbHMgICAgICAgICA9IHJlcXVpcmUoJy4vX2ZhaWxzJylcbiAgLCBzaGFyZWQgICAgICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgdWlkICAgICAgICAgICAgPSByZXF1aXJlKCcuL191aWQnKVxuICAsIHdrcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fd2tzJylcbiAgLCB3a3NFeHQgICAgICAgICA9IHJlcXVpcmUoJy4vX3drcy1leHQnKVxuICAsIHdrc0RlZmluZSAgICAgID0gcmVxdWlyZSgnLi9fd2tzLWRlZmluZScpXG4gICwga2V5T2YgICAgICAgICAgPSByZXF1aXJlKCcuL19rZXlvZicpXG4gICwgZW51bUtleXMgICAgICAgPSByZXF1aXJlKCcuL19lbnVtLWtleXMnKVxuICAsIGlzQXJyYXkgICAgICAgID0gcmVxdWlyZSgnLi9faXMtYXJyYXknKVxuICAsIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCB0b0lPYmplY3QgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBjcmVhdGVEZXNjICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxuICAsIF9jcmVhdGUgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpXG4gICwgZ09QTkV4dCAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbi1leHQnKVxuICAsICRHT1BEICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKVxuICAsICREUCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCAka2V5cyAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BEICAgICAgICAgICA9ICRHT1BELmZcbiAgLCBkUCAgICAgICAgICAgICA9ICREUC5mXG4gICwgZ09QTiAgICAgICAgICAgPSBnT1BORXh0LmZcbiAgLCAkU3ltYm9sICAgICAgICA9IGdsb2JhbC5TeW1ib2xcbiAgLCAkSlNPTiAgICAgICAgICA9IGdsb2JhbC5KU09OXG4gICwgX3N0cmluZ2lmeSAgICAgPSAkSlNPTiAmJiAkSlNPTi5zdHJpbmdpZnlcbiAgLCBQUk9UT1RZUEUgICAgICA9ICdwcm90b3R5cGUnXG4gICwgSElEREVOICAgICAgICAgPSB3a3MoJ19oaWRkZW4nKVxuICAsIFRPX1BSSU1JVElWRSAgID0gd2tzKCd0b1ByaW1pdGl2ZScpXG4gICwgaXNFbnVtICAgICAgICAgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZVxuICAsIFN5bWJvbFJlZ2lzdHJ5ID0gc2hhcmVkKCdzeW1ib2wtcmVnaXN0cnknKVxuICAsIEFsbFN5bWJvbHMgICAgID0gc2hhcmVkKCdzeW1ib2xzJylcbiAgLCBPUFN5bWJvbHMgICAgICA9IHNoYXJlZCgnb3Atc3ltYm9scycpXG4gICwgT2JqZWN0UHJvdG8gICAgPSBPYmplY3RbUFJPVE9UWVBFXVxuICAsIFVTRV9OQVRJVkUgICAgID0gdHlwZW9mICRTeW1ib2wgPT0gJ2Z1bmN0aW9uJ1xuICAsIFFPYmplY3QgICAgICAgID0gZ2xvYmFsLlFPYmplY3Q7XG4vLyBEb24ndCB1c2Ugc2V0dGVycyBpbiBRdCBTY3JpcHQsIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8xNzNcbnZhciBzZXR0ZXIgPSAhUU9iamVjdCB8fCAhUU9iamVjdFtQUk9UT1RZUEVdIHx8ICFRT2JqZWN0W1BST1RPVFlQRV0uZmluZENoaWxkO1xuXG4vLyBmYWxsYmFjayBmb3Igb2xkIEFuZHJvaWQsIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD02ODdcbnZhciBzZXRTeW1ib2xEZXNjID0gREVTQ1JJUFRPUlMgJiYgJGZhaWxzKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBfY3JlYXRlKGRQKHt9LCAnYScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiBkUCh0aGlzLCAnYScsIHt2YWx1ZTogN30pLmE7IH1cbiAgfSkpLmEgIT0gNztcbn0pID8gZnVuY3Rpb24oaXQsIGtleSwgRCl7XG4gIHZhciBwcm90b0Rlc2MgPSBnT1BEKE9iamVjdFByb3RvLCBrZXkpO1xuICBpZihwcm90b0Rlc2MpZGVsZXRlIE9iamVjdFByb3RvW2tleV07XG4gIGRQKGl0LCBrZXksIEQpO1xuICBpZihwcm90b0Rlc2MgJiYgaXQgIT09IE9iamVjdFByb3RvKWRQKE9iamVjdFByb3RvLCBrZXksIHByb3RvRGVzYyk7XG59IDogZFA7XG5cbnZhciB3cmFwID0gZnVuY3Rpb24odGFnKXtcbiAgdmFyIHN5bSA9IEFsbFN5bWJvbHNbdGFnXSA9IF9jcmVhdGUoJFN5bWJvbFtQUk9UT1RZUEVdKTtcbiAgc3ltLl9rID0gdGFnO1xuICByZXR1cm4gc3ltO1xufTtcblxudmFyIGlzU3ltYm9sID0gVVNFX05BVElWRSAmJiB0eXBlb2YgJFN5bWJvbC5pdGVyYXRvciA9PSAnc3ltYm9sJyA/IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJztcbn0gOiBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCBpbnN0YW5jZW9mICRTeW1ib2w7XG59O1xuXG52YXIgJGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgRCl7XG4gIGlmKGl0ID09PSBPYmplY3RQcm90bykkZGVmaW5lUHJvcGVydHkoT1BTeW1ib2xzLCBrZXksIEQpO1xuICBhbk9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEQpO1xuICBpZihoYXMoQWxsU3ltYm9scywga2V5KSl7XG4gICAgaWYoIUQuZW51bWVyYWJsZSl7XG4gICAgICBpZighaGFzKGl0LCBISURERU4pKWRQKGl0LCBISURERU4sIGNyZWF0ZURlc2MoMSwge30pKTtcbiAgICAgIGl0W0hJRERFTl1ba2V5XSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0paXRbSElEREVOXVtrZXldID0gZmFsc2U7XG4gICAgICBEID0gX2NyZWF0ZShELCB7ZW51bWVyYWJsZTogY3JlYXRlRGVzYygwLCBmYWxzZSl9KTtcbiAgICB9IHJldHVybiBzZXRTeW1ib2xEZXNjKGl0LCBrZXksIEQpO1xuICB9IHJldHVybiBkUChpdCwga2V5LCBEKTtcbn07XG52YXIgJGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKGl0LCBQKXtcbiAgYW5PYmplY3QoaXQpO1xuICB2YXIga2V5cyA9IGVudW1LZXlzKFAgPSB0b0lPYmplY3QoUCkpXG4gICAgLCBpICAgID0gMFxuICAgICwgbCA9IGtleXMubGVuZ3RoXG4gICAgLCBrZXk7XG4gIHdoaWxlKGwgPiBpKSRkZWZpbmVQcm9wZXJ0eShpdCwga2V5ID0ga2V5c1tpKytdLCBQW2tleV0pO1xuICByZXR1cm4gaXQ7XG59O1xudmFyICRjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaXQsIFApe1xuICByZXR1cm4gUCA9PT0gdW5kZWZpbmVkID8gX2NyZWF0ZShpdCkgOiAkZGVmaW5lUHJvcGVydGllcyhfY3JlYXRlKGl0KSwgUCk7XG59O1xudmFyICRwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKGtleSl7XG4gIHZhciBFID0gaXNFbnVtLmNhbGwodGhpcywga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKSk7XG4gIGlmKHRoaXMgPT09IE9iamVjdFByb3RvICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT1BTeW1ib2xzLCBrZXkpKXJldHVybiBmYWxzZTtcbiAgcmV0dXJuIEUgfHwgIWhhcyh0aGlzLCBrZXkpIHx8ICFoYXMoQWxsU3ltYm9scywga2V5KSB8fCBoYXModGhpcywgSElEREVOKSAmJiB0aGlzW0hJRERFTl1ba2V5XSA/IEUgOiB0cnVlO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpe1xuICBpdCAgPSB0b0lPYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBpZihpdCA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpcmV0dXJuO1xuICB2YXIgRCA9IGdPUEQoaXQsIGtleSk7XG4gIGlmKEQgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIShoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKSlELmVudW1lcmFibGUgPSB0cnVlO1xuICByZXR1cm4gRDtcbn07XG52YXIgJGdldE93blByb3BlcnR5TmFtZXMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KXtcbiAgdmFyIG5hbWVzICA9IGdPUE4odG9JT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpe1xuICAgIGlmKCFoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYga2V5ICE9IEhJRERFTiAmJiBrZXkgIT0gTUVUQSlyZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpe1xuICB2YXIgSVNfT1AgID0gaXQgPT09IE9iamVjdFByb3RvXG4gICAgLCBuYW1lcyAgPSBnT1BOKElTX09QID8gT1BTeW1ib2xzIDogdG9JT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpe1xuICAgIGlmKGhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiAoSVNfT1AgPyBoYXMoT2JqZWN0UHJvdG8sIGtleSkgOiB0cnVlKSlyZXN1bHQucHVzaChBbGxTeW1ib2xzW2tleV0pO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xuXG4vLyAxOS40LjEuMSBTeW1ib2woW2Rlc2NyaXB0aW9uXSlcbmlmKCFVU0VfTkFUSVZFKXtcbiAgJFN5bWJvbCA9IGZ1bmN0aW9uIFN5bWJvbCgpe1xuICAgIGlmKHRoaXMgaW5zdGFuY2VvZiAkU3ltYm9sKXRocm93IFR5cGVFcnJvcignU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yIScpO1xuICAgIHZhciB0YWcgPSB1aWQoYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpO1xuICAgIHZhciAkc2V0ID0gZnVuY3Rpb24odmFsdWUpe1xuICAgICAgaWYodGhpcyA9PT0gT2JqZWN0UHJvdG8pJHNldC5jYWxsKE9QU3ltYm9scywgdmFsdWUpO1xuICAgICAgaWYoaGFzKHRoaXMsIEhJRERFTikgJiYgaGFzKHRoaXNbSElEREVOXSwgdGFnKSl0aGlzW0hJRERFTl1bdGFnXSA9IGZhbHNlO1xuICAgICAgc2V0U3ltYm9sRGVzYyh0aGlzLCB0YWcsIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbiAgICB9O1xuICAgIGlmKERFU0NSSVBUT1JTICYmIHNldHRlcilzZXRTeW1ib2xEZXNjKE9iamVjdFByb3RvLCB0YWcsIHtjb25maWd1cmFibGU6IHRydWUsIHNldDogJHNldH0pO1xuICAgIHJldHVybiB3cmFwKHRhZyk7XG4gIH07XG4gIHJlZGVmaW5lKCRTeW1ib2xbUFJPVE9UWVBFXSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgICByZXR1cm4gdGhpcy5faztcbiAgfSk7XG5cbiAgJEdPUEQuZiA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gICREUC5mICAgPSAkZGVmaW5lUHJvcGVydHk7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZiA9IGdPUE5FeHQuZiA9ICRnZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICByZXF1aXJlKCcuL19vYmplY3QtcGllJykuZiAgPSAkcHJvcGVydHlJc0VudW1lcmFibGU7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJykuZiA9ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbiAgaWYoREVTQ1JJUFRPUlMgJiYgIXJlcXVpcmUoJy4vX2xpYnJhcnknKSl7XG4gICAgcmVkZWZpbmUoT2JqZWN0UHJvdG8sICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsICRwcm9wZXJ0eUlzRW51bWVyYWJsZSwgdHJ1ZSk7XG4gIH1cblxuICB3a3NFeHQuZiA9IGZ1bmN0aW9uKG5hbWUpe1xuICAgIHJldHVybiB3cmFwKHdrcyhuYW1lKSk7XG4gIH1cbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwge1N5bWJvbDogJFN5bWJvbH0pO1xuXG5mb3IodmFyIHN5bWJvbHMgPSAoXG4gIC8vIDE5LjQuMi4yLCAxOS40LjIuMywgMTkuNC4yLjQsIDE5LjQuMi42LCAxOS40LjIuOCwgMTkuNC4yLjksIDE5LjQuMi4xMCwgMTkuNC4yLjExLCAxOS40LjIuMTIsIDE5LjQuMi4xMywgMTkuNC4yLjE0XG4gICdoYXNJbnN0YW5jZSxpc0NvbmNhdFNwcmVhZGFibGUsaXRlcmF0b3IsbWF0Y2gscmVwbGFjZSxzZWFyY2gsc3BlY2llcyxzcGxpdCx0b1ByaW1pdGl2ZSx0b1N0cmluZ1RhZyx1bnNjb3BhYmxlcydcbikuc3BsaXQoJywnKSwgaSA9IDA7IHN5bWJvbHMubGVuZ3RoID4gaTsgKXdrcyhzeW1ib2xzW2krK10pO1xuXG5mb3IodmFyIHN5bWJvbHMgPSAka2V5cyh3a3Muc3RvcmUpLCBpID0gMDsgc3ltYm9scy5sZW5ndGggPiBpOyApd2tzRGVmaW5lKHN5bWJvbHNbaSsrXSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsICdTeW1ib2wnLCB7XG4gIC8vIDE5LjQuMi4xIFN5bWJvbC5mb3Ioa2V5KVxuICAnZm9yJzogZnVuY3Rpb24oa2V5KXtcbiAgICByZXR1cm4gaGFzKFN5bWJvbFJlZ2lzdHJ5LCBrZXkgKz0gJycpXG4gICAgICA/IFN5bWJvbFJlZ2lzdHJ5W2tleV1cbiAgICAgIDogU3ltYm9sUmVnaXN0cnlba2V5XSA9ICRTeW1ib2woa2V5KTtcbiAgfSxcbiAgLy8gMTkuNC4yLjUgU3ltYm9sLmtleUZvcihzeW0pXG4gIGtleUZvcjogZnVuY3Rpb24ga2V5Rm9yKGtleSl7XG4gICAgaWYoaXNTeW1ib2woa2V5KSlyZXR1cm4ga2V5T2YoU3ltYm9sUmVnaXN0cnksIGtleSk7XG4gICAgdGhyb3cgVHlwZUVycm9yKGtleSArICcgaXMgbm90IGEgc3ltYm9sIScpO1xuICB9LFxuICB1c2VTZXR0ZXI6IGZ1bmN0aW9uKCl7IHNldHRlciA9IHRydWU7IH0sXG4gIHVzZVNpbXBsZTogZnVuY3Rpb24oKXsgc2V0dGVyID0gZmFsc2U7IH1cbn0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnT2JqZWN0Jywge1xuICAvLyAxOS4xLjIuMiBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4gIGNyZWF0ZTogJGNyZWF0ZSxcbiAgLy8gMTkuMS4yLjQgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4gIGRlZmluZVByb3BlcnR5OiAkZGVmaW5lUHJvcGVydHksXG4gIC8vIDE5LjEuMi4zIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpXG4gIGRlZmluZVByb3BlcnRpZXM6ICRkZWZpbmVQcm9wZXJ0aWVzLFxuICAvLyAxOS4xLjIuNiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJGdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgLy8gMTkuMS4yLjcgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogJGdldE93blByb3BlcnR5TmFtZXMsXG4gIC8vIDE5LjEuMi44IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoTylcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiAkZ2V0T3duUHJvcGVydHlTeW1ib2xzXG59KTtcblxuLy8gMjQuMy4yIEpTT04uc3RyaW5naWZ5KHZhbHVlIFssIHJlcGxhY2VyIFssIHNwYWNlXV0pXG4kSlNPTiAmJiAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICghVVNFX05BVElWRSB8fCAkZmFpbHMoZnVuY3Rpb24oKXtcbiAgdmFyIFMgPSAkU3ltYm9sKCk7XG4gIC8vIE1TIEVkZ2UgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIHt9XG4gIC8vIFdlYktpdCBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMgbnVsbFxuICAvLyBWOCB0aHJvd3Mgb24gYm94ZWQgc3ltYm9sc1xuICByZXR1cm4gX3N0cmluZ2lmeShbU10pICE9ICdbbnVsbF0nIHx8IF9zdHJpbmdpZnkoe2E6IFN9KSAhPSAne30nIHx8IF9zdHJpbmdpZnkoT2JqZWN0KFMpKSAhPSAne30nO1xufSkpLCAnSlNPTicsIHtcbiAgc3RyaW5naWZ5OiBmdW5jdGlvbiBzdHJpbmdpZnkoaXQpe1xuICAgIGlmKGl0ID09PSB1bmRlZmluZWQgfHwgaXNTeW1ib2woaXQpKXJldHVybjsgLy8gSUU4IHJldHVybnMgc3RyaW5nIG9uIHVuZGVmaW5lZFxuICAgIHZhciBhcmdzID0gW2l0XVxuICAgICAgLCBpICAgID0gMVxuICAgICAgLCByZXBsYWNlciwgJHJlcGxhY2VyO1xuICAgIHdoaWxlKGFyZ3VtZW50cy5sZW5ndGggPiBpKWFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcmVwbGFjZXIgPSBhcmdzWzFdO1xuICAgIGlmKHR5cGVvZiByZXBsYWNlciA9PSAnZnVuY3Rpb24nKSRyZXBsYWNlciA9IHJlcGxhY2VyO1xuICAgIGlmKCRyZXBsYWNlciB8fCAhaXNBcnJheShyZXBsYWNlcikpcmVwbGFjZXIgPSBmdW5jdGlvbihrZXksIHZhbHVlKXtcbiAgICAgIGlmKCRyZXBsYWNlcil2YWx1ZSA9ICRyZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsdWUpO1xuICAgICAgaWYoIWlzU3ltYm9sKHZhbHVlKSlyZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBhcmdzWzFdID0gcmVwbGFjZXI7XG4gICAgcmV0dXJuIF9zdHJpbmdpZnkuYXBwbHkoJEpTT04sIGFyZ3MpO1xuICB9XG59KTtcblxuLy8gMTkuNC4zLjQgU3ltYm9sLnByb3RvdHlwZVtAQHRvUHJpbWl0aXZlXShoaW50KVxuJFN5bWJvbFtQUk9UT1RZUEVdW1RPX1BSSU1JVElWRV0gfHwgcmVxdWlyZSgnLi9faGlkZScpKCRTeW1ib2xbUFJPVE9UWVBFXSwgVE9fUFJJTUlUSVZFLCAkU3ltYm9sW1BST1RPVFlQRV0udmFsdWVPZik7XG4vLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZygkU3ltYm9sLCAnU3ltYm9sJyk7XG4vLyAyMC4yLjEuOSBNYXRoW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhNYXRoLCAnTWF0aCcsIHRydWUpO1xuLy8gMjQuMy4zIEpTT05bQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKGdsb2JhbC5KU09OLCAnSlNPTicsIHRydWUpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN5bWJvbC5qc1xuLy8gbW9kdWxlIGlkID0gODJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgTUVUQSAgICAgPSByZXF1aXJlKCcuL191aWQnKSgnbWV0YScpXG4gICwgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGhhcyAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBzZXREZXNjICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZcbiAgLCBpZCAgICAgICA9IDA7XG52YXIgaXNFeHRlbnNpYmxlID0gT2JqZWN0LmlzRXh0ZW5zaWJsZSB8fCBmdW5jdGlvbigpe1xuICByZXR1cm4gdHJ1ZTtcbn07XG52YXIgRlJFRVpFID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIGlzRXh0ZW5zaWJsZShPYmplY3QucHJldmVudEV4dGVuc2lvbnMoe30pKTtcbn0pO1xudmFyIHNldE1ldGEgPSBmdW5jdGlvbihpdCl7XG4gIHNldERlc2MoaXQsIE1FVEEsIHt2YWx1ZToge1xuICAgIGk6ICdPJyArICsraWQsIC8vIG9iamVjdCBJRFxuICAgIHc6IHt9ICAgICAgICAgIC8vIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH19KTtcbn07XG52YXIgZmFzdEtleSA9IGZ1bmN0aW9uKGl0LCBjcmVhdGUpe1xuICAvLyByZXR1cm4gcHJpbWl0aXZlIHdpdGggcHJlZml4XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJyA/IGl0IDogKHR5cGVvZiBpdCA9PSAnc3RyaW5nJyA/ICdTJyA6ICdQJykgKyBpdDtcbiAgaWYoIWhhcyhpdCwgTUVUQSkpe1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYoIWlzRXh0ZW5zaWJsZShpdCkpcmV0dXJuICdGJztcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmKCFjcmVhdGUpcmV0dXJuICdFJztcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gb2JqZWN0IElEXG4gIH0gcmV0dXJuIGl0W01FVEFdLmk7XG59O1xudmFyIGdldFdlYWsgPSBmdW5jdGlvbihpdCwgY3JlYXRlKXtcbiAgaWYoIWhhcyhpdCwgTUVUQSkpe1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYoIWlzRXh0ZW5zaWJsZShpdCkpcmV0dXJuIHRydWU7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZighY3JlYXRlKXJldHVybiBmYWxzZTtcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gaGFzaCB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9IHJldHVybiBpdFtNRVRBXS53O1xufTtcbi8vIGFkZCBtZXRhZGF0YSBvbiBmcmVlemUtZmFtaWx5IG1ldGhvZHMgY2FsbGluZ1xudmFyIG9uRnJlZXplID0gZnVuY3Rpb24oaXQpe1xuICBpZihGUkVFWkUgJiYgbWV0YS5ORUVEICYmIGlzRXh0ZW5zaWJsZShpdCkgJiYgIWhhcyhpdCwgTUVUQSkpc2V0TWV0YShpdCk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgbWV0YSA9IG1vZHVsZS5leHBvcnRzID0ge1xuICBLRVk6ICAgICAgTUVUQSxcbiAgTkVFRDogICAgIGZhbHNlLFxuICBmYXN0S2V5OiAgZmFzdEtleSxcbiAgZ2V0V2VhazogIGdldFdlYWssXG4gIG9uRnJlZXplOiBvbkZyZWV6ZVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19tZXRhLmpzXG4vLyBtb2R1bGUgaWQgPSA4M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBnbG9iYWwgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBMSUJSQVJZICAgICAgICA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKVxuICAsIHdrc0V4dCAgICAgICAgID0gcmVxdWlyZSgnLi9fd2tzLWV4dCcpXG4gICwgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgdmFyICRTeW1ib2wgPSBjb3JlLlN5bWJvbCB8fCAoY29yZS5TeW1ib2wgPSBMSUJSQVJZID8ge30gOiBnbG9iYWwuU3ltYm9sIHx8IHt9KTtcbiAgaWYobmFtZS5jaGFyQXQoMCkgIT0gJ18nICYmICEobmFtZSBpbiAkU3ltYm9sKSlkZWZpbmVQcm9wZXJ0eSgkU3ltYm9sLCBuYW1lLCB7dmFsdWU6IHdrc0V4dC5mKG5hbWUpfSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1kZWZpbmUuanNcbi8vIG1vZHVsZSBpZCA9IDg0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGdldEtleXMgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgZWwpe1xuICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KG9iamVjdClcbiAgICAsIGtleXMgICA9IGdldEtleXMoTylcbiAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgLCBpbmRleCAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKGxlbmd0aCA+IGluZGV4KWlmKE9ba2V5ID0ga2V5c1tpbmRleCsrXV0gPT09IGVsKXJldHVybiBrZXk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2tleW9mLmpzXG4vLyBtb2R1bGUgaWQgPSA4NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIGFsbCBlbnVtZXJhYmxlIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBzeW1ib2xzXG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BTICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKVxuICAsIHBJRSAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIHJlc3VsdCAgICAgPSBnZXRLZXlzKGl0KVxuICAgICwgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgaWYoZ2V0U3ltYm9scyl7XG4gICAgdmFyIHN5bWJvbHMgPSBnZXRTeW1ib2xzKGl0KVxuICAgICAgLCBpc0VudW0gID0gcElFLmZcbiAgICAgICwgaSAgICAgICA9IDBcbiAgICAgICwga2V5O1xuICAgIHdoaWxlKHN5bWJvbHMubGVuZ3RoID4gaSlpZihpc0VudW0uY2FsbChpdCwga2V5ID0gc3ltYm9sc1tpKytdKSlyZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0ta2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gODZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzXG4vLyBtb2R1bGUgaWQgPSA4N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanNcbi8vIG1vZHVsZSBpZCA9IDg4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gNy4yLjIgSXNBcnJheShhcmd1bWVudClcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBpc0FycmF5KGFyZyl7XG4gIHJldHVybiBjb2YoYXJnKSA9PSAnQXJyYXknO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS5qc1xuLy8gbW9kdWxlIGlkID0gODlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBmYWxsYmFjayBmb3IgSUUxMSBidWdneSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB3aXRoIGlmcmFtZSBhbmQgd2luZG93XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgZ09QTiAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mXG4gICwgdG9TdHJpbmcgID0ge30udG9TdHJpbmc7XG5cbnZhciB3aW5kb3dOYW1lcyA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xuXG52YXIgZ2V0V2luZG93TmFtZXMgPSBmdW5jdGlvbihpdCl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGdPUE4oaXQpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB3aW5kb3dOYW1lcy5zbGljZSgpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCl7XG4gIHJldHVybiB3aW5kb3dOYW1lcyAmJiB0b1N0cmluZy5jYWxsKGl0KSA9PSAnW29iamVjdCBXaW5kb3ddJyA/IGdldFdpbmRvd05hbWVzKGl0KSA6IGdPUE4odG9JT2JqZWN0KGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4tZXh0LmpzXG4vLyBtb2R1bGUgaWQgPSA5MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIDE5LjEuMi43IC8gMTUuMi4zLjQgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbnZhciAka2V5cyAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKVxuICAsIGhpZGRlbktleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJykuY29uY2F0KCdsZW5ndGgnLCAncHJvdG90eXBlJyk7XG5cbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoTyl7XG4gIHJldHVybiAka2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4uanNcbi8vIG1vZHVsZSBpZCA9IDkxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIHBJRSAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpXG4gICwgY3JlYXRlRGVzYyAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgLCB0b0lPYmplY3QgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpXG4gICwgZ09QRCAgICAgICAgICAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZ09QRCA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKXtcbiAgTyA9IHRvSU9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBpZihJRThfRE9NX0RFRklORSl0cnkge1xuICAgIHJldHVybiBnT1BEKE8sIFApO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKGhhcyhPLCBQKSlyZXR1cm4gY3JlYXRlRGVzYyghcElFLmYuY2FsbChPLCBQKSwgT1tQXSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BkLmpzXG4vLyBtb2R1bGUgaWQgPSA5MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnYXN5bmNJdGVyYXRvcicpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnN5bWJvbC5hc3luYy1pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gOTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJyZXF1aXJlKCcuL193a3MtZGVmaW5lJykoJ29ic2VydmFibGUnKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wub2JzZXJ2YWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gOTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9zZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mXCIpO1xuXG52YXIgX3NldFByb3RvdHlwZU9mMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NldFByb3RvdHlwZU9mKTtcblxudmFyIF9jcmVhdGUgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvY3JlYXRlXCIpO1xuXG52YXIgX2NyZWF0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGUpO1xuXG52YXIgX3R5cGVvZjIgPSByZXF1aXJlKFwiLi4vaGVscGVycy90eXBlb2ZcIik7XG5cbnZhciBfdHlwZW9mMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3R5cGVvZjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgKHR5cGVvZiBzdXBlckNsYXNzID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6ICgwLCBfdHlwZW9mMy5kZWZhdWx0KShzdXBlckNsYXNzKSkpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gKDAsIF9jcmVhdGUyLmRlZmF1bHQpKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2YyLmRlZmF1bHQgPyAoMCwgX3NldFByb3RvdHlwZU9mMi5kZWZhdWx0KShzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMuanNcbi8vIG1vZHVsZSBpZCA9IDk2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzXG4vLyBtb2R1bGUgaWQgPSA5N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Quc2V0UHJvdG90eXBlT2Y7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L3NldC1wcm90b3R5cGUtb2YuanNcbi8vIG1vZHVsZSBpZCA9IDk4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gMTkuMS4zLjE5IE9iamVjdC5zZXRQcm90b3R5cGVPZihPLCBwcm90bylcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtzZXRQcm90b3R5cGVPZjogcmVxdWlyZSgnLi9fc2V0LXByb3RvJykuc2V0fSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YuanNcbi8vIG1vZHVsZSBpZCA9IDk5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gV29ya3Mgd2l0aCBfX3Byb3RvX18gb25seS4gT2xkIHY4IGNhbid0IHdvcmsgd2l0aCBudWxsIHByb3RvIG9iamVjdHMuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGNoZWNrID0gZnVuY3Rpb24oTywgcHJvdG8pe1xuICBhbk9iamVjdChPKTtcbiAgaWYoIWlzT2JqZWN0KHByb3RvKSAmJiBwcm90byAhPT0gbnVsbCl0aHJvdyBUeXBlRXJyb3IocHJvdG8gKyBcIjogY2FuJ3Qgc2V0IGFzIHByb3RvdHlwZSFcIik7XG59O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8ICgnX19wcm90b19fJyBpbiB7fSA/IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBmdW5jdGlvbih0ZXN0LCBidWdneSwgc2V0KXtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNldCA9IHJlcXVpcmUoJy4vX2N0eCcpKEZ1bmN0aW9uLmNhbGwsIHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJykuZihPYmplY3QucHJvdG90eXBlLCAnX19wcm90b19fJykuc2V0LCAyKTtcbiAgICAgICAgc2V0KHRlc3QsIFtdKTtcbiAgICAgICAgYnVnZ3kgPSAhKHRlc3QgaW5zdGFuY2VvZiBBcnJheSk7XG4gICAgICB9IGNhdGNoKGUpeyBidWdneSA9IHRydWU7IH1cbiAgICAgIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90byl7XG4gICAgICAgIGNoZWNrKE8sIHByb3RvKTtcbiAgICAgICAgaWYoYnVnZ3kpTy5fX3Byb3RvX18gPSBwcm90bztcbiAgICAgICAgZWxzZSBzZXQoTywgcHJvdG8pO1xuICAgICAgICByZXR1cm4gTztcbiAgICAgIH07XG4gICAgfSh7fSwgZmFsc2UpIDogdW5kZWZpbmVkKSxcbiAgY2hlY2s6IGNoZWNrXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1wcm90by5qc1xuLy8gbW9kdWxlIGlkID0gMTAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2NyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGUoUCwgRCl7XG4gIHJldHVybiAkT2JqZWN0LmNyZWF0ZShQLCBEKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtjcmVhdGU6IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDEwM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbihmdW5jdGlvbiAod2luKSB7XG5cbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvLyBtYWpvciBldmVudHMgc3VwcG9ydGVkOlxuICAgIC8vIHBhbnN0YXJ0XG4gICAgLy8gcGFubW92ZVxuICAgIC8vIHBhbmVuZFxuICAgIC8vIHN3aXBlXG4gICAgLy8gbG9uZ3ByZXNzXG5cbiAgICAvLyBleHRyYSBldmVudHMgc3VwcG9ydGVkOlxuICAgIC8vIGR1YWx0b3VjaHN0YXJ0XG4gICAgLy8gZHVhbHRvdWNoXG4gICAgLy8gZHVhbHRvdWNoZW5kXG4gICAgLy8gdmVydGljYWxwYW5zdGFydFxuICAgIC8vIGhvcml6b250YWxwYW5zdGFydFxuICAgIC8vIHZlcnRpY2FscGFubW92ZVxuICAgIC8vIGhvcml6b250YWxwYW5tb3ZlXG4gICAgLy8gdGFwXG4gICAgLy8gZG91YmxldGFwXG4gICAgLy8gdmVydGljYWxzd2lwZVxuICAgIC8vIGhvcml6b250YWxzd2lwZVxuICAgIC8vIHByZXNzZW5kXG5cbiAgICB2YXIgZG9jID0gd2luLmRvY3VtZW50LFxuICAgICAgICBkb2NFbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQsXG4gICAgICAgIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLFxuICAgICAgICBnZXN0dXJlcyA9IHt9LFxuICAgICAgICBsYXN0VGFwID0gbnVsbDtcblxuICAgIC8qKlxuICAgICog5om+5Yiw5Lik5Liq57uT54K55YWx5ZCM55qE5pyA5bCP5qC557uT54K5XG4gICAgKiDlpoLmnpzot5/nu5PngrnkuI3lrZjlnKjvvIzliJnov5Tlm55udWxsXG4gICAgKlxuICAgICogQHBhcmFtICB7RWxlbWVudH0gZWwxIOesrOS4gOS4que7k+eCuVxuICAgICogQHBhcmFtICB7RWxlbWVudH0gZWwyIOesrOS6jOS4que7k+eCuVxuICAgICogQHJldHVybiB7RWxlbWVudH0gICAgIOaguee7k+eCuVxuICAgICovXG4gICAgZnVuY3Rpb24gZ2V0Q29tbW9uQW5jZXN0b3IoZWwxLCBlbDIpIHtcbiAgICAgICAgdmFyIGVsID0gZWwxO1xuICAgICAgICB3aGlsZSAoZWwpIHtcbiAgICAgICAgICAgIGlmIChlbC5jb250YWlucyhlbDIpIHx8IGVsID09PSBlbDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbCA9IGVsLnBhcmVudE5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiDop6blj5HkuIDkuKrkuovku7ZcbiAgICAqXG4gICAgKiBAcGFyYW0gIHtFbGVtZW50fSBlbGVtZW50IOebruagh+e7k+eCuVxuICAgICogQHBhcmFtICB7c3RyaW5nfSAgdHlwZSAgICDkuovku7bnsbvlnotcbiAgICAqIEBwYXJhbSAge29iamVjdH0gIGV4dHJhICAg5a+55LqL5Lu25a+56LGh55qE5omp5bGVXG4gICAgKi9cbiAgICBmdW5jdGlvbiBmaXJlRXZlbnQoZWxlbWVudCwgdHlwZSwgZXh0cmEpIHtcbiAgICAgICAgdmFyIGV2ZW50ID0gZG9jLmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJyk7XG4gICAgICAgIGV2ZW50LmluaXRFdmVudCh0eXBlLCB0cnVlLCB0cnVlKTtcblxuICAgICAgICBpZiAoKHR5cGVvZiBleHRyYSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoZXh0cmEpKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gZXh0cmEpIHtcbiAgICAgICAgICAgICAgICBldmVudFtwXSA9IGV4dHJhW3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIOiuoeeul+WPmOaNouaViOaenFxuICAgICog5YGH6K6+5Z2Q5qCH57O75LiK5pyJNOS4queCuUFCQ0RcbiAgICAqID4g5peL6L2s77ya5LuOQULml4vovazliLBDROeahOinkuW6plxuICAgICogPiDnvKnmlL7vvJrku45BQumVv+W6puWPmOaNouWIsENE6ZW/5bqm55qE5q+U5L6LXG4gICAgKiA+IOS9jeenu++8muS7jkHngrnkvY3np7vliLBD54K555qE5qiq57q15L2N56e7XG4gICAgKlxuICAgICogQHBhcmFtICB7bnVtYmVyfSB4MSDkuIrov7DnrKwx5Liq54K555qE5qiq5Z2Q5qCHXG4gICAgKiBAcGFyYW0gIHtudW1iZXJ9IHkxIOS4iui/sOesrDHkuKrngrnnmoTnurXlnZDmoIdcbiAgICAqIEBwYXJhbSAge251bWJlcn0geDIg5LiK6L+w56ysMuS4queCueeahOaoquWdkOagh1xuICAgICogQHBhcmFtICB7bnVtYmVyfSB5MiDkuIrov7DnrKwy5Liq54K555qE57q15Z2Q5qCHXG4gICAgKiBAcGFyYW0gIHtudW1iZXJ9IHgzIOS4iui/sOesrDPkuKrngrnnmoTmqKrlnZDmoIdcbiAgICAqIEBwYXJhbSAge251bWJlcn0geTMg5LiK6L+w56ysM+S4queCueeahOe6teWdkOagh1xuICAgICogQHBhcmFtICB7bnVtYmVyfSB4NCDkuIrov7DnrKw05Liq54K555qE5qiq5Z2Q5qCHXG4gICAgKiBAcGFyYW0gIHtudW1iZXJ9IHk0IOS4iui/sOesrDTkuKrngrnnmoTnurXlnZDmoIdcbiAgICAqIEByZXR1cm4ge29iamVjdH0gICAg5Y+Y5o2i5pWI5p6c77yM5b2i5aaCe3JvdGF0ZSwgc2NhbGUsIHRyYW5zbGF0ZVsyXSwgbWF0cml4WzNdWzNdfVxuICAgICovXG4gICAgZnVuY3Rpb24gY2FsYyh4MSwgeTEsIHgyLCB5MiwgeDMsIHkzLCB4NCwgeTQpIHtcbiAgICAgICAgdmFyIHJvdGF0ZSA9IE1hdGguYXRhbjIoeTQgLSB5MywgeDQgLSB4MykgLSBNYXRoLmF0YW4yKHkyIC0geTEsIHgyIC0geDEpLFxuICAgICAgICAgICAgc2NhbGUgPSBNYXRoLnNxcnQoKE1hdGgucG93KHk0IC0geTMsIDIpICsgTWF0aC5wb3coeDQgLSB4MywgMikpIC8gKE1hdGgucG93KHkyIC0geTEsIDIpICsgTWF0aC5wb3coeDIgLSB4MSwgMikpKSxcbiAgICAgICAgICAgIHRyYW5zbGF0ZSA9IFt4MyAtIHNjYWxlICogeDEgKiBNYXRoLmNvcyhyb3RhdGUpICsgc2NhbGUgKiB5MSAqIE1hdGguc2luKHJvdGF0ZSksIHkzIC0gc2NhbGUgKiB5MSAqIE1hdGguY29zKHJvdGF0ZSkgLSBzY2FsZSAqIHgxICogTWF0aC5zaW4ocm90YXRlKV07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByb3RhdGU6IHJvdGF0ZSxcbiAgICAgICAgICAgIHNjYWxlOiBzY2FsZSxcbiAgICAgICAgICAgIHRyYW5zbGF0ZTogdHJhbnNsYXRlLFxuICAgICAgICAgICAgbWF0cml4OiBbW3NjYWxlICogTWF0aC5jb3Mocm90YXRlKSwgLXNjYWxlICogTWF0aC5zaW4ocm90YXRlKSwgdHJhbnNsYXRlWzBdXSwgW3NjYWxlICogTWF0aC5zaW4ocm90YXRlKSwgc2NhbGUgKiBNYXRoLmNvcyhyb3RhdGUpLCB0cmFuc2xhdGVbMV1dLCBbMCwgMCwgMV1dXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiDmjZXojrd0b3VjaHN0YXJ05LqL5Lu277yM5bCG5q+P5LiA5Liq5paw5aKe55qE6Kem54K55re75Yqg5YiwZ2VzdHJ1ZXNcbiAgICAqIOWmguaenOS5i+WJjeWwmuaXoOiiq+iusOW9leeahOinpueCue+8jOWImee7keWumnRvdWNobW92ZSwgdG91Y2hlbmQsIHRvdWNoY2FuY2Vs5LqL5Lu2XG4gICAgKlxuICAgICog5paw5aKe6Kem54K56buY6K6k5aSE5LqOdGFwcGluZ+eKtuaAgVxuICAgICogNTAw5q+r56eS5LmL5ZCO5aaC5p6c6L+Y5aSE5LqOdGFwcGluZ+eKtuaAge+8jOWImeinpuWPkXByZXNz5omL5Yq/XG4gICAgKiDlpoLmnpzop6bngrnmlbDkuLoy77yM5YiZ6Kem5Y+RZHVhbHRvdWNoc3RhcnTmiYvlir/vvIzor6XmiYvlir/nmoTnm67moIfnu5PngrnkuLrkuKTkuKrop6bngrnlhbHlkIznmoTmnIDlsI/moLnnu5PngrlcbiAgICAqXG4gICAgKiBAZXZlbnRcbiAgICAqIEBwYXJhbSAge2V2ZW50fSBldmVudFxuICAgICovXG4gICAgZnVuY3Rpb24gdG91Y2hzdGFydEhhbmRsZXIoZXZlbnQpIHtcblxuICAgICAgICBpZiAoT2JqZWN0LmtleXMoZ2VzdHVyZXMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgZG9jRWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdG91Y2htb3ZlSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICAgICAgZG9jRWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0b3VjaGVuZEhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIGRvY0VsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdG91Y2hjYW5jZWxIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZ2VzdHVyZSwgdG91Y2gsIHRvdWNoUmVjb3JkLCBlbGVtZW50cztcblxuICAgICAgICBmdW5jdGlvbiBnZW5QcmVzc0hhbmRsZXIoZWxlbWVudCwgdG91Y2gpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGdlc3R1cmUuc3RhdHVzID09PSAndGFwcGluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgZ2VzdHVyZS5zdGF0dXMgPSAncHJlc3NpbmcnO1xuXG4gICAgICAgICAgICAgICAgICAgIGZpcmVFdmVudChlbGVtZW50LCAnbG9uZ3ByZXNzJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWRkIHRvdWNoIGRhdGEgZm9yIHdlZXhcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoOiB0b3VjaCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoZXM6IGV2ZW50LnRvdWNoZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VkVG91Y2hlczogZXZlbnQuY2hhbmdlZFRvdWNoZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaEV2ZW50OiBldmVudFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoZ2VzdHVyZS5wcmVzc2luZ0hhbmRsZXIpO1xuICAgICAgICAgICAgICAgIGdlc3R1cmUucHJlc3NpbmdIYW5kbGVyID0gbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZWNvcmQgZXZlcnkgdG91Y2hcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdG91Y2ggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1tpXTtcbiAgICAgICAgICAgIHRvdWNoUmVjb3JkID0ge307XG5cbiAgICAgICAgICAgIGZvciAodmFyIF9wIGluIHRvdWNoKSB7XG4gICAgICAgICAgICAgICAgdG91Y2hSZWNvcmRbX3BdID0gdG91Y2hbX3BdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBnZXN0dXJlID0ge1xuICAgICAgICAgICAgICAgIHN0YXJ0VG91Y2g6IHRvdWNoUmVjb3JkLFxuICAgICAgICAgICAgICAgIHN0YXJ0VGltZTogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICd0YXBwaW5nJyxcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBldmVudC5zcmNFbGVtZW50IHx8IGV2ZW50LnRhcmdldCxcbiAgICAgICAgICAgICAgICBwcmVzc2luZ0hhbmRsZXI6IHNldFRpbWVvdXQoZ2VuUHJlc3NIYW5kbGVyKGV2ZW50LnNyY0VsZW1lbnQgfHwgZXZlbnQudGFyZ2V0LCBldmVudC5jaGFuZ2VkVG91Y2hlc1tpXSksIDUwMClcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBnZXN0dXJlc1t0b3VjaC5pZGVudGlmaWVyXSA9IGdlc3R1cmU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoT2JqZWN0LmtleXMoZ2VzdHVyZXMpLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgZWxlbWVudHMgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBnZXN0dXJlcykge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzLnB1c2goZ2VzdHVyZXNbcF0uZWxlbWVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZpcmVFdmVudChnZXRDb21tb25BbmNlc3RvcihlbGVtZW50c1swXSwgZWxlbWVudHNbMV0pLCAnZHVhbHRvdWNoc3RhcnQnLCB7XG4gICAgICAgICAgICAgICAgdG91Y2hlczogc2xpY2UuY2FsbChldmVudC50b3VjaGVzKSxcbiAgICAgICAgICAgICAgICB0b3VjaEV2ZW50OiBldmVudFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAqIOaNleiOt3RvdWNobW92ZeS6i+S7tu+8jOWkhOeQhnBhbuWSjGR1YWznmoTnm7jlhbPmiYvlir9cbiAgICAqXG4gICAgKiAxLiDpgY3ljobmr4/kuKrop6bngrnvvJpcbiAgICAqID4g5aaC5p6c6Kem54K55LmL5YmN5aSE5LqOdGFwcGluZ+eKtuaAge+8jOS4lOS9jeenu+i2hei/hzEw5YOP57Sg77yM5YiZ6K6k5a6a5Li66L+b5YWlcGFubmluZ+eKtuaAgVxuICAgICog5YWI6Kem5Y+RcGFuc3RhcnTmiYvlir/vvIznhLblkI7moLnmja7np7vliqjnmoTmlrnlkJHpgInmi6nmgKfop6blj5Fob3Jpem9udGFscGFuc3RhcnTmiJZ2ZXJ0aWNhbHBhbnN0YXJ05omL5Yq/XG4gICAgKiA+IOWmguaenOinpueCueS5i+WJjeWkhOS6jnBhbm5pbmfnirbmgIHvvIzliJnmoLnmja5wYW7nmoTliJ3lp4vmlrnlkJHop6blj5Fob3Jpem9udGFscGFu5oiWdmVydGljYWxwYW7miYvlir9cbiAgICAqXG4gICAgKiAyLiDlpoLmnpzlvZPliY3op6bngrnmlbDkuLoy77yM5YiZ6K6h566X5Ye65Yeg5L2V5Y+Y5o2i55qE5ZCE6aG55Y+C5pWw77yM6Kem5Y+RZHVhbHRvdWNo5omL5Yq/XG4gICAgKlxuICAgICogQGV2ZW50XG4gICAgKiBAcGFyYW0gIHtldmVudH0gZXZlbnRcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHRvdWNobW92ZUhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgLy8gVE9ETzog5Ye95pWw5aSq5aSn5LqG77yM5b2x5ZON5Y+v6K+75oCn77yM5bu66K6u5YiG6Kej5bm25Yqg5b+F6KaB55qE5rOo6YeKXG5cbiAgICAgICAgLy8g6YGN5Y6G5q+P5Liq6Kem54K577yaXG4gICAgICAgIC8vIDEuIOWmguaenOinpueCueS5i+WJjeWkhOS6jnRhcHBpbmfnirbmgIHvvIzkuJTkvY3np7votoXov4cxMOWDj+e0oO+8jOWImeiupOWumuS4uui/m+WFpXBhbm5pbmfnirbmgIFcbiAgICAgICAgLy8g5YWI6Kem5Y+RcGFuc3RhcnTmiYvlir/vvIznhLblkI7moLnmja7np7vliqjnmoTmlrnlkJHpgInmi6nmgKfop6blj5Fob3Jpem9udGFscGFuc3RhcnTmiJZ2ZXJ0aWNhbHBhbnN0YXJ05omL5Yq/XG4gICAgICAgIC8vIDIuIOWmguaenOinpueCueS5i+WJjeWkhOS6jnBhbm5pbmfnirbmgIHvvIzliJnmoLnmja5wYW7nmoTliJ3lp4vmlrnlkJHop6blj5Fob3Jpem9udGFscGFu5oiWdmVydGljYWxwYW7miYvlir9cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbaV0sXG4gICAgICAgICAgICAgICAgZ2VzdHVyZSA9IGdlc3R1cmVzW3RvdWNoLmlkZW50aWZpZXJdO1xuXG4gICAgICAgICAgICBpZiAoIWdlc3R1cmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghZ2VzdHVyZS5sYXN0VG91Y2gpIHtcbiAgICAgICAgICAgICAgICBnZXN0dXJlLmxhc3RUb3VjaCA9IGdlc3R1cmUuc3RhcnRUb3VjaDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZ2VzdHVyZS5sYXN0VGltZSkge1xuICAgICAgICAgICAgICAgIGdlc3R1cmUubGFzdFRpbWUgPSBnZXN0dXJlLnN0YXJ0VGltZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZ2VzdHVyZS52ZWxvY2l0eVgpIHtcbiAgICAgICAgICAgICAgICBnZXN0dXJlLnZlbG9jaXR5WCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWdlc3R1cmUudmVsb2NpdHlZKSB7XG4gICAgICAgICAgICAgICAgZ2VzdHVyZS52ZWxvY2l0eVkgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFnZXN0dXJlLmR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgZ2VzdHVyZS5kdXJhdGlvbiA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB0aW1lID0gRGF0ZS5ub3coKSAtIGdlc3R1cmUubGFzdFRpbWU7XG4gICAgICAgICAgICB2YXIgdnggPSAodG91Y2guY2xpZW50WCAtIGdlc3R1cmUubGFzdFRvdWNoLmNsaWVudFgpIC8gdGltZSxcbiAgICAgICAgICAgICAgICB2eSA9ICh0b3VjaC5jbGllbnRZIC0gZ2VzdHVyZS5sYXN0VG91Y2guY2xpZW50WSkgLyB0aW1lO1xuXG4gICAgICAgICAgICB2YXIgUkVDT1JEX0RVUkFUSU9OID0gNzA7XG4gICAgICAgICAgICBpZiAodGltZSA+IFJFQ09SRF9EVVJBVElPTikge1xuICAgICAgICAgICAgICAgIHRpbWUgPSBSRUNPUkRfRFVSQVRJT047XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZ2VzdHVyZS5kdXJhdGlvbiArIHRpbWUgPiBSRUNPUkRfRFVSQVRJT04pIHtcbiAgICAgICAgICAgICAgICBnZXN0dXJlLmR1cmF0aW9uID0gUkVDT1JEX0RVUkFUSU9OIC0gdGltZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZ2VzdHVyZS52ZWxvY2l0eVggPSAoZ2VzdHVyZS52ZWxvY2l0eVggKiBnZXN0dXJlLmR1cmF0aW9uICsgdnggKiB0aW1lKSAvIChnZXN0dXJlLmR1cmF0aW9uICsgdGltZSk7XG4gICAgICAgICAgICBnZXN0dXJlLnZlbG9jaXR5WSA9IChnZXN0dXJlLnZlbG9jaXR5WSAqIGdlc3R1cmUuZHVyYXRpb24gKyB2eSAqIHRpbWUpIC8gKGdlc3R1cmUuZHVyYXRpb24gKyB0aW1lKTtcbiAgICAgICAgICAgIGdlc3R1cmUuZHVyYXRpb24gKz0gdGltZTtcblxuICAgICAgICAgICAgZ2VzdHVyZS5sYXN0VG91Y2ggPSB7fTtcblxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiB0b3VjaCkge1xuICAgICAgICAgICAgICAgIGdlc3R1cmUubGFzdFRvdWNoW3BdID0gdG91Y2hbcF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnZXN0dXJlLmxhc3RUaW1lID0gRGF0ZS5ub3coKTtcblxuICAgICAgICAgICAgdmFyIGRpc3BsYWNlbWVudFggPSB0b3VjaC5jbGllbnRYIC0gZ2VzdHVyZS5zdGFydFRvdWNoLmNsaWVudFgsXG4gICAgICAgICAgICAgICAgZGlzcGxhY2VtZW50WSA9IHRvdWNoLmNsaWVudFkgLSBnZXN0dXJlLnN0YXJ0VG91Y2guY2xpZW50WSxcbiAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IE1hdGguc3FydChNYXRoLnBvdyhkaXNwbGFjZW1lbnRYLCAyKSArIE1hdGgucG93KGRpc3BsYWNlbWVudFksIDIpKTtcblxuICAgICAgICAgICAgLy8gbWFnaWMgbnVtYmVyIDEwOiBtb3ZpbmcgMTBweCBtZWFucyBwYW4sIG5vdCB0YXBcbiAgICAgICAgICAgIGlmICgoZ2VzdHVyZS5zdGF0dXMgPT09ICd0YXBwaW5nJyB8fCBnZXN0dXJlLnN0YXR1cyA9PT0gJ3ByZXNzaW5nJykgJiYgZGlzdGFuY2UgPiAxMCkge1xuICAgICAgICAgICAgICAgIGdlc3R1cmUuc3RhdHVzID0gJ3Bhbm5pbmcnO1xuICAgICAgICAgICAgICAgIGdlc3R1cmUuaXNWZXJ0aWNhbCA9ICEoTWF0aC5hYnMoZGlzcGxhY2VtZW50WCkgPiBNYXRoLmFicyhkaXNwbGFjZW1lbnRZKSk7XG5cbiAgICAgICAgICAgICAgICBmaXJlRXZlbnQoZ2VzdHVyZS5lbGVtZW50LCAncGFuc3RhcnQnLCB7XG4gICAgICAgICAgICAgICAgICAgIHRvdWNoOiB0b3VjaCxcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hlczogZXZlbnQudG91Y2hlcyxcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlZFRvdWNoZXM6IGV2ZW50LmNoYW5nZWRUb3VjaGVzLFxuICAgICAgICAgICAgICAgICAgICB0b3VjaEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgaXNWZXJ0aWNhbDogZ2VzdHVyZS5pc1ZlcnRpY2FsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBmaXJlRXZlbnQoZ2VzdHVyZS5lbGVtZW50LCAoZ2VzdHVyZS5pc1ZlcnRpY2FsID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJykgKyAncGFuc3RhcnQnLCB7XG4gICAgICAgICAgICAgICAgICAgIHRvdWNoOiB0b3VjaCxcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hFdmVudDogZXZlbnRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGdlc3R1cmUuc3RhdHVzID09PSAncGFubmluZycpIHtcbiAgICAgICAgICAgICAgICBnZXN0dXJlLnBhblRpbWUgPSBEYXRlLm5vdygpO1xuXG4gICAgICAgICAgICAgICAgZmlyZUV2ZW50KGdlc3R1cmUuZWxlbWVudCwgJ3Bhbm1vdmUnLCB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYWNlbWVudFg6IGRpc3BsYWNlbWVudFgsXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYWNlbWVudFk6IGRpc3BsYWNlbWVudFksXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoOiB0b3VjaCxcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hlczogZXZlbnQudG91Y2hlcyxcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlZFRvdWNoZXM6IGV2ZW50LmNoYW5nZWRUb3VjaGVzLFxuICAgICAgICAgICAgICAgICAgICB0b3VjaEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgaXNWZXJ0aWNhbDogZ2VzdHVyZS5pc1ZlcnRpY2FsXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZ2VzdHVyZS5pc1ZlcnRpY2FsKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpcmVFdmVudChnZXN0dXJlLmVsZW1lbnQsICd2ZXJ0aWNhbHBhbm1vdmUnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGFjZW1lbnRZOiBkaXNwbGFjZW1lbnRZLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2g6IHRvdWNoLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hFdmVudDogZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZmlyZUV2ZW50KGdlc3R1cmUuZWxlbWVudCwgJ2hvcml6b250YWxwYW5tb3ZlJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxhY2VtZW50WDogZGlzcGxhY2VtZW50WCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoOiB0b3VjaCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoRXZlbnQ6IGV2ZW50XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOWmguaenOW9k+WJjeinpueCueaVsOS4ujLvvIzliJnorqHnrpflh7rlh6DkvZXlj5jmjaLnmoTlkITpobnlj4LmlbDvvIzop6blj5FkdWFsdG91Y2jmiYvlir9cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGdlc3R1cmVzKS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIHZhciBwb3NpdGlvbiA9IFtdLFxuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBbXSxcbiAgICAgICAgICAgICAgICBlbGVtZW50cyA9IFtdLFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybSA9IHZvaWQgMDtcblxuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGV2ZW50LnRvdWNoZXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIF90b3VjaCA9IGV2ZW50LnRvdWNoZXNbX2ldO1xuICAgICAgICAgICAgICAgIHZhciBfZ2VzdHVyZSA9IGdlc3R1cmVzW190b3VjaC5pZGVudGlmaWVyXTtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbi5wdXNoKFtfZ2VzdHVyZS5zdGFydFRvdWNoLmNsaWVudFgsIF9nZXN0dXJlLnN0YXJ0VG91Y2guY2xpZW50WV0pO1xuICAgICAgICAgICAgICAgIGN1cnJlbnQucHVzaChbX3RvdWNoLmNsaWVudFgsIF90b3VjaC5jbGllbnRZXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAodmFyIF9wMiBpbiBnZXN0dXJlcykge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzLnB1c2goZ2VzdHVyZXNbX3AyXS5lbGVtZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdHJhbnNmb3JtID0gY2FsYyhwb3NpdGlvblswXVswXSwgcG9zaXRpb25bMF1bMV0sIHBvc2l0aW9uWzFdWzBdLCBwb3NpdGlvblsxXVsxXSwgY3VycmVudFswXVswXSwgY3VycmVudFswXVsxXSwgY3VycmVudFsxXVswXSwgY3VycmVudFsxXVsxXSk7XG4gICAgICAgICAgICBmaXJlRXZlbnQoZ2V0Q29tbW9uQW5jZXN0b3IoZWxlbWVudHNbMF0sIGVsZW1lbnRzWzFdKSwgJ2R1YWx0b3VjaCcsIHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zZm9ybSxcbiAgICAgICAgICAgICAgICB0b3VjaGVzOiBldmVudC50b3VjaGVzLFxuICAgICAgICAgICAgICAgIHRvdWNoRXZlbnQ6IGV2ZW50XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICog5o2V6I63dG91Y2hlbmTkuovku7ZcbiAgICAqXG4gICAgKiAxLiDlpoLmnpzlvZPliY3op6bngrnmlbDkuLoy77yM5YiZ6Kem5Y+RZHVhbHRvdWNoZW5k5omL5Yq/XG4gICAgKlxuICAgICogMi4g6YGN5Y6G5q+P5Liq6Kem54K577yaXG4gICAgKiA+IOWmguaenOWkhOS6jnRhcHBpbmfnirbmgIHvvIzliJnop6blj5F0YXDmiYvlir9cbiAgICAqIOWmguaenOS5i+WJjTMwMOavq+enkuWHuueOsOi/h3RhcOaJi+WKv++8jOWImeWNh+e6p+S4umRvdWJsZXRhcOaJi+WKv1xuICAgICogPiDlpoLmnpzlpITkuo5wYW5uaW5n54q25oCB77yM5YiZ5qC55o2u5ruR5Ye655qE6YCf5bqm77yM6Kem5Y+RcGFuZW5kL2ZsaWNr5omL5Yq/XG4gICAgKiBmbGlja+aJi+WKv+iiq+inpuWPkeS5i+WQju+8jOWGjeagueaNrua7keWHuueahOaWueWQkeinpuWPkXZlcnRpY2FsZmxpY2svaG9yaXpvbnRhbGZsaWNr5omL5Yq/XG4gICAgKiA+IOWmguaenOWkhOS6jnByZXNzaW5n54q25oCB77yM5YiZ6Kem5Y+RcHJlc3NlbmTmiYvlir9cbiAgICAqXG4gICAgKiAzLiDop6Pnu5HlrprmiYDmnInnm7jlhbPkuovku7ZcbiAgICAqXG4gICAgKiBAZXZlbnRcbiAgICAqIEBwYXJhbSAge2V2ZW50fSBldmVudFxuICAgICovXG4gICAgZnVuY3Rpb24gdG91Y2hlbmRIYW5kbGVyKGV2ZW50KSB7XG5cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGdlc3R1cmVzKS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50cyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBnZXN0dXJlcykge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzLnB1c2goZ2VzdHVyZXNbcF0uZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaXJlRXZlbnQoZ2V0Q29tbW9uQW5jZXN0b3IoZWxlbWVudHNbMF0sIGVsZW1lbnRzWzFdKSwgJ2R1YWx0b3VjaGVuZCcsIHtcbiAgICAgICAgICAgICAgICB0b3VjaGVzOiBzbGljZS5jYWxsKGV2ZW50LnRvdWNoZXMpLFxuICAgICAgICAgICAgICAgIHRvdWNoRXZlbnQ6IGV2ZW50XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciB0b3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzW2ldLFxuICAgICAgICAgICAgICAgIGlkID0gdG91Y2guaWRlbnRpZmllcixcbiAgICAgICAgICAgICAgICBnZXN0dXJlID0gZ2VzdHVyZXNbaWRdO1xuXG4gICAgICAgICAgICBpZiAoIWdlc3R1cmUpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGdlc3R1cmUucHJlc3NpbmdIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGdlc3R1cmUucHJlc3NpbmdIYW5kbGVyKTtcbiAgICAgICAgICAgICAgICBnZXN0dXJlLnByZXNzaW5nSGFuZGxlciA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChnZXN0dXJlLnN0YXR1cyA9PT0gJ3RhcHBpbmcnKSB7XG4gICAgICAgICAgICAgICAgZ2VzdHVyZS50aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgIGZpcmVFdmVudChnZXN0dXJlLmVsZW1lbnQsICd0YXAnLCB7XG4gICAgICAgICAgICAgICAgICAgIHRvdWNoOiB0b3VjaCxcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hFdmVudDogZXZlbnRcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChsYXN0VGFwICYmIGdlc3R1cmUudGltZXN0YW1wIC0gbGFzdFRhcC50aW1lc3RhbXAgPCAzMDApIHtcbiAgICAgICAgICAgICAgICAgICAgZmlyZUV2ZW50KGdlc3R1cmUuZWxlbWVudCwgJ2RvdWJsZXRhcCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoOiB0b3VjaCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoRXZlbnQ6IGV2ZW50XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxhc3RUYXAgPSBnZXN0dXJlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZ2VzdHVyZS5zdGF0dXMgPT09ICdwYW5uaW5nJykge1xuICAgICAgICAgICAgICAgIHZhciBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgIHZhciBkdXJhdGlvbiA9IG5vdyAtIGdlc3R1cmUuc3RhcnRUaW1lLFxuXG4gICAgICAgICAgICAgICAgLy8gdmVsb2NpdHlYID0gKHRvdWNoLmNsaWVudFggLSBnZXN0dXJlLnN0YXJ0VG91Y2guY2xpZW50WCkgLyBkdXJhdGlvbixcbiAgICAgICAgICAgICAgICAvLyB2ZWxvY2l0eVkgPSAodG91Y2guY2xpZW50WSAtIGdlc3R1cmUuc3RhcnRUb3VjaC5jbGllbnRZKSAvIGR1cmF0aW9uLFxuICAgICAgICAgICAgICAgIGRpc3BsYWNlbWVudFggPSB0b3VjaC5jbGllbnRYIC0gZ2VzdHVyZS5zdGFydFRvdWNoLmNsaWVudFgsXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYWNlbWVudFkgPSB0b3VjaC5jbGllbnRZIC0gZ2VzdHVyZS5zdGFydFRvdWNoLmNsaWVudFk7XG5cbiAgICAgICAgICAgICAgICB2YXIgdmVsb2NpdHkgPSBNYXRoLnNxcnQoZ2VzdHVyZS52ZWxvY2l0eVkgKiBnZXN0dXJlLnZlbG9jaXR5WSArIGdlc3R1cmUudmVsb2NpdHlYICogZ2VzdHVyZS52ZWxvY2l0eVgpO1xuICAgICAgICAgICAgICAgIHZhciBpc2ZsaWNrID0gdmVsb2NpdHkgPiAwLjUgJiYgbm93IC0gZ2VzdHVyZS5sYXN0VGltZSA8IDEwMDtcbiAgICAgICAgICAgICAgICB2YXIgZXh0cmEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgaXNmbGljazogaXNmbGljayxcbiAgICAgICAgICAgICAgICAgICAgdmVsb2NpdHlYOiBnZXN0dXJlLnZlbG9jaXR5WCxcbiAgICAgICAgICAgICAgICAgICAgdmVsb2NpdHlZOiBnZXN0dXJlLnZlbG9jaXR5WSxcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxhY2VtZW50WDogZGlzcGxhY2VtZW50WCxcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxhY2VtZW50WTogZGlzcGxhY2VtZW50WSxcbiAgICAgICAgICAgICAgICAgICAgdG91Y2g6IHRvdWNoLFxuICAgICAgICAgICAgICAgICAgICB0b3VjaGVzOiBldmVudC50b3VjaGVzLFxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VkVG91Y2hlczogZXZlbnQuY2hhbmdlZFRvdWNoZXMsXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICBpc1ZlcnRpY2FsOiBnZXN0dXJlLmlzVmVydGljYWxcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgZmlyZUV2ZW50KGdlc3R1cmUuZWxlbWVudCwgJ3BhbmVuZCcsIGV4dHJhKTtcbiAgICAgICAgICAgICAgICBpZiAoaXNmbGljaykge1xuICAgICAgICAgICAgICAgICAgICBmaXJlRXZlbnQoZ2VzdHVyZS5lbGVtZW50LCAnc3dpcGUnLCBleHRyYSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGdlc3R1cmUuaXNWZXJ0aWNhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlyZUV2ZW50KGdlc3R1cmUuZWxlbWVudCwgJ3ZlcnRpY2Fsc3dpcGUnLCBleHRyYSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJlRXZlbnQoZ2VzdHVyZS5lbGVtZW50LCAnaG9yaXpvbnRhbHN3aXBlJywgZXh0cmEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZ2VzdHVyZS5zdGF0dXMgPT09ICdwcmVzc2luZycpIHtcbiAgICAgICAgICAgICAgICBmaXJlRXZlbnQoZ2VzdHVyZS5lbGVtZW50LCAncHJlc3NlbmQnLCB7XG4gICAgICAgICAgICAgICAgICAgIHRvdWNoOiB0b3VjaCxcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hFdmVudDogZXZlbnRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGVsZXRlIGdlc3R1cmVzW2lkXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhnZXN0dXJlcykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBkb2NFbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0b3VjaG1vdmVIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgICAgICBkb2NFbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRvdWNoZW5kSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICAgICAgZG9jRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0b3VjaGNhbmNlbEhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICog5o2V6I63dG91Y2hjYW5jZWzkuovku7ZcbiAgICAqXG4gICAgKiAxLiDlpoLmnpzlvZPliY3op6bngrnmlbDkuLoy77yM5YiZ6Kem5Y+RZHVhbHRvdWNoZW5k5omL5Yq/XG4gICAgKlxuICAgICogMi4g6YGN5Y6G5q+P5Liq6Kem54K577yaXG4gICAgKiA+IOWmguaenOWkhOS6jnBhbm5pbmfnirbmgIHvvIzliJnop6blj5FwYW5lbmTmiYvlir9cbiAgICAqID4g5aaC5p6c5aSE5LqOcHJlc3NpbmfnirbmgIHvvIzliJnop6blj5FwcmVzc2VuZOaJi+WKv1xuICAgICpcbiAgICAqIDMuIOino+e7keWumuaJgOacieebuOWFs+S6i+S7tlxuICAgICpcbiAgICAqIEBldmVudFxuICAgICogQHBhcmFtICB7ZXZlbnR9IGV2ZW50XG4gICAgKi9cbiAgICBmdW5jdGlvbiB0b3VjaGNhbmNlbEhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgLy8gVE9ETzog5ZKMdG91Y2hlbmRIYW5kbGVy5aSn6YeP6YeN5aSN77yM5bu66K6uRFJZXG5cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGdlc3R1cmVzKS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50cyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBnZXN0dXJlcykge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzLnB1c2goZ2VzdHVyZXNbcF0uZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaXJlRXZlbnQoZ2V0Q29tbW9uQW5jZXN0b3IoZWxlbWVudHNbMF0sIGVsZW1lbnRzWzFdKSwgJ2R1YWx0b3VjaGVuZCcsIHtcbiAgICAgICAgICAgICAgICB0b3VjaGVzOiBzbGljZS5jYWxsKGV2ZW50LnRvdWNoZXMpLFxuICAgICAgICAgICAgICAgIHRvdWNoRXZlbnQ6IGV2ZW50XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciB0b3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzW2ldLFxuICAgICAgICAgICAgICAgIGlkID0gdG91Y2guaWRlbnRpZmllcixcbiAgICAgICAgICAgICAgICBnZXN0dXJlID0gZ2VzdHVyZXNbaWRdO1xuXG4gICAgICAgICAgICBpZiAoIWdlc3R1cmUpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGdlc3R1cmUucHJlc3NpbmdIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGdlc3R1cmUucHJlc3NpbmdIYW5kbGVyKTtcbiAgICAgICAgICAgICAgICBnZXN0dXJlLnByZXNzaW5nSGFuZGxlciA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChnZXN0dXJlLnN0YXR1cyA9PT0gJ3Bhbm5pbmcnKSB7XG4gICAgICAgICAgICAgICAgZmlyZUV2ZW50KGdlc3R1cmUuZWxlbWVudCwgJ3BhbmVuZCcsIHtcbiAgICAgICAgICAgICAgICAgICAgdG91Y2g6IHRvdWNoLFxuICAgICAgICAgICAgICAgICAgICB0b3VjaGVzOiBldmVudC50b3VjaGVzLFxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VkVG91Y2hlczogZXZlbnQuY2hhbmdlZFRvdWNoZXMsXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoRXZlbnQ6IGV2ZW50XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZ2VzdHVyZS5zdGF0dXMgPT09ICdwcmVzc2luZycpIHtcbiAgICAgICAgICAgICAgICBmaXJlRXZlbnQoZ2VzdHVyZS5lbGVtZW50LCAncHJlc3NlbmQnLCB7XG4gICAgICAgICAgICAgICAgICAgIHRvdWNoOiB0b3VjaCxcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hFdmVudDogZXZlbnRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlbGV0ZSBnZXN0dXJlc1tpZF07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoT2JqZWN0LmtleXMoZ2VzdHVyZXMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgZG9jRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdG91Y2htb3ZlSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICAgICAgZG9jRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0b3VjaGVuZEhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIGRvY0VsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdG91Y2hjYW5jZWxIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkb2NFbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdG91Y2hzdGFydEhhbmRsZXIsIGZhbHNlKTtcbn0pKHdpbmRvdyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjEuMEBnZXN0dXJlLWpzL3NyYy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnZXZlbnQtZW1pdHRlcic7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudCB7fVxuRXZlbnRFbWl0dGVyKEV2ZW50LnByb3RvdHlwZSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2V2ZW50LmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZCAgICAgICAgPSByZXF1aXJlKCdkJylcbiAgLCBjYWxsYWJsZSA9IHJlcXVpcmUoJ2VzNS1leHQvb2JqZWN0L3ZhbGlkLWNhbGxhYmxlJylcblxuICAsIGFwcGx5ID0gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LCBjYWxsID0gRnVuY3Rpb24ucHJvdG90eXBlLmNhbGxcbiAgLCBjcmVhdGUgPSBPYmplY3QuY3JlYXRlLCBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eVxuICAsIGRlZmluZVByb3BlcnRpZXMgPSBPYmplY3QuZGVmaW5lUHJvcGVydGllc1xuICAsIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxuICAsIGRlc2NyaXB0b3IgPSB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlIH1cblxuICAsIG9uLCBvbmNlLCBvZmYsIGVtaXQsIG1ldGhvZHMsIGRlc2NyaXB0b3JzLCBiYXNlO1xuXG5vbiA9IGZ1bmN0aW9uICh0eXBlLCBsaXN0ZW5lcikge1xuXHR2YXIgZGF0YTtcblxuXHRjYWxsYWJsZShsaXN0ZW5lcik7XG5cblx0aWYgKCFoYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMsICdfX2VlX18nKSkge1xuXHRcdGRhdGEgPSBkZXNjcmlwdG9yLnZhbHVlID0gY3JlYXRlKG51bGwpO1xuXHRcdGRlZmluZVByb3BlcnR5KHRoaXMsICdfX2VlX18nLCBkZXNjcmlwdG9yKTtcblx0XHRkZXNjcmlwdG9yLnZhbHVlID0gbnVsbDtcblx0fSBlbHNlIHtcblx0XHRkYXRhID0gdGhpcy5fX2VlX187XG5cdH1cblx0aWYgKCFkYXRhW3R5cGVdKSBkYXRhW3R5cGVdID0gbGlzdGVuZXI7XG5cdGVsc2UgaWYgKHR5cGVvZiBkYXRhW3R5cGVdID09PSAnb2JqZWN0JykgZGF0YVt0eXBlXS5wdXNoKGxpc3RlbmVyKTtcblx0ZWxzZSBkYXRhW3R5cGVdID0gW2RhdGFbdHlwZV0sIGxpc3RlbmVyXTtcblxuXHRyZXR1cm4gdGhpcztcbn07XG5cbm9uY2UgPSBmdW5jdGlvbiAodHlwZSwgbGlzdGVuZXIpIHtcblx0dmFyIG9uY2UsIHNlbGY7XG5cblx0Y2FsbGFibGUobGlzdGVuZXIpO1xuXHRzZWxmID0gdGhpcztcblx0b24uY2FsbCh0aGlzLCB0eXBlLCBvbmNlID0gZnVuY3Rpb24gKCkge1xuXHRcdG9mZi5jYWxsKHNlbGYsIHR5cGUsIG9uY2UpO1xuXHRcdGFwcGx5LmNhbGwobGlzdGVuZXIsIHRoaXMsIGFyZ3VtZW50cyk7XG5cdH0pO1xuXG5cdG9uY2UuX19lZU9uY2VMaXN0ZW5lcl9fID0gbGlzdGVuZXI7XG5cdHJldHVybiB0aGlzO1xufTtcblxub2ZmID0gZnVuY3Rpb24gKHR5cGUsIGxpc3RlbmVyKSB7XG5cdHZhciBkYXRhLCBsaXN0ZW5lcnMsIGNhbmRpZGF0ZSwgaTtcblxuXHRjYWxsYWJsZShsaXN0ZW5lcik7XG5cblx0aWYgKCFoYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMsICdfX2VlX18nKSkgcmV0dXJuIHRoaXM7XG5cdGRhdGEgPSB0aGlzLl9fZWVfXztcblx0aWYgKCFkYXRhW3R5cGVdKSByZXR1cm4gdGhpcztcblx0bGlzdGVuZXJzID0gZGF0YVt0eXBlXTtcblxuXHRpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ29iamVjdCcpIHtcblx0XHRmb3IgKGkgPSAwOyAoY2FuZGlkYXRlID0gbGlzdGVuZXJzW2ldKTsgKytpKSB7XG5cdFx0XHRpZiAoKGNhbmRpZGF0ZSA9PT0gbGlzdGVuZXIpIHx8XG5cdFx0XHRcdFx0KGNhbmRpZGF0ZS5fX2VlT25jZUxpc3RlbmVyX18gPT09IGxpc3RlbmVyKSkge1xuXHRcdFx0XHRpZiAobGlzdGVuZXJzLmxlbmd0aCA9PT0gMikgZGF0YVt0eXBlXSA9IGxpc3RlbmVyc1tpID8gMCA6IDFdO1xuXHRcdFx0XHRlbHNlIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdGlmICgobGlzdGVuZXJzID09PSBsaXN0ZW5lcikgfHxcblx0XHRcdFx0KGxpc3RlbmVycy5fX2VlT25jZUxpc3RlbmVyX18gPT09IGxpc3RlbmVyKSkge1xuXHRcdFx0ZGVsZXRlIGRhdGFbdHlwZV07XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG5lbWl0ID0gZnVuY3Rpb24gKHR5cGUpIHtcblx0dmFyIGksIGwsIGxpc3RlbmVyLCBsaXN0ZW5lcnMsIGFyZ3M7XG5cblx0aWYgKCFoYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMsICdfX2VlX18nKSkgcmV0dXJuO1xuXHRsaXN0ZW5lcnMgPSB0aGlzLl9fZWVfX1t0eXBlXTtcblx0aWYgKCFsaXN0ZW5lcnMpIHJldHVybjtcblxuXHRpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ29iamVjdCcpIHtcblx0XHRsID0gYXJndW1lbnRzLmxlbmd0aDtcblx0XHRhcmdzID0gbmV3IEFycmF5KGwgLSAxKTtcblx0XHRmb3IgKGkgPSAxOyBpIDwgbDsgKytpKSBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcblxuXHRcdGxpc3RlbmVycyA9IGxpc3RlbmVycy5zbGljZSgpO1xuXHRcdGZvciAoaSA9IDA7IChsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXSk7ICsraSkge1xuXHRcdFx0YXBwbHkuY2FsbChsaXN0ZW5lciwgdGhpcywgYXJncyk7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuXHRcdGNhc2UgMTpcblx0XHRcdGNhbGwuY2FsbChsaXN0ZW5lcnMsIHRoaXMpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAyOlxuXHRcdFx0Y2FsbC5jYWxsKGxpc3RlbmVycywgdGhpcywgYXJndW1lbnRzWzFdKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMzpcblx0XHRcdGNhbGwuY2FsbChsaXN0ZW5lcnMsIHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcblx0XHRcdGJyZWFrO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRsID0gYXJndW1lbnRzLmxlbmd0aDtcblx0XHRcdGFyZ3MgPSBuZXcgQXJyYXkobCAtIDEpO1xuXHRcdFx0Zm9yIChpID0gMTsgaSA8IGw7ICsraSkge1xuXHRcdFx0XHRhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdH1cblx0XHRcdGFwcGx5LmNhbGwobGlzdGVuZXJzLCB0aGlzLCBhcmdzKTtcblx0XHR9XG5cdH1cbn07XG5cbm1ldGhvZHMgPSB7XG5cdG9uOiBvbixcblx0b25jZTogb25jZSxcblx0b2ZmOiBvZmYsXG5cdGVtaXQ6IGVtaXRcbn07XG5cbmRlc2NyaXB0b3JzID0ge1xuXHRvbjogZChvbiksXG5cdG9uY2U6IGQob25jZSksXG5cdG9mZjogZChvZmYpLFxuXHRlbWl0OiBkKGVtaXQpXG59O1xuXG5iYXNlID0gZGVmaW5lUHJvcGVydGllcyh7fSwgZGVzY3JpcHRvcnMpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmdW5jdGlvbiAobykge1xuXHRyZXR1cm4gKG8gPT0gbnVsbCkgPyBjcmVhdGUoYmFzZSkgOiBkZWZpbmVQcm9wZXJ0aWVzKE9iamVjdChvKSwgZGVzY3JpcHRvcnMpO1xufTtcbmV4cG9ydHMubWV0aG9kcyA9IG1ldGhvZHM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMy40QGV2ZW50LWVtaXR0ZXIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDEwNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFzc2lnbiAgICAgICAgPSByZXF1aXJlKCdlczUtZXh0L29iamVjdC9hc3NpZ24nKVxuICAsIG5vcm1hbGl6ZU9wdHMgPSByZXF1aXJlKCdlczUtZXh0L29iamVjdC9ub3JtYWxpemUtb3B0aW9ucycpXG4gICwgaXNDYWxsYWJsZSAgICA9IHJlcXVpcmUoJ2VzNS1leHQvb2JqZWN0L2lzLWNhbGxhYmxlJylcbiAgLCBjb250YWlucyAgICAgID0gcmVxdWlyZSgnZXM1LWV4dC9zdHJpbmcvIy9jb250YWlucycpXG5cbiAgLCBkO1xuXG5kID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZHNjciwgdmFsdWUvKiwgb3B0aW9ucyovKSB7XG5cdHZhciBjLCBlLCB3LCBvcHRpb25zLCBkZXNjO1xuXHRpZiAoKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB8fCAodHlwZW9mIGRzY3IgIT09ICdzdHJpbmcnKSkge1xuXHRcdG9wdGlvbnMgPSB2YWx1ZTtcblx0XHR2YWx1ZSA9IGRzY3I7XG5cdFx0ZHNjciA9IG51bGw7XG5cdH0gZWxzZSB7XG5cdFx0b3B0aW9ucyA9IGFyZ3VtZW50c1syXTtcblx0fVxuXHRpZiAoZHNjciA9PSBudWxsKSB7XG5cdFx0YyA9IHcgPSB0cnVlO1xuXHRcdGUgPSBmYWxzZTtcblx0fSBlbHNlIHtcblx0XHRjID0gY29udGFpbnMuY2FsbChkc2NyLCAnYycpO1xuXHRcdGUgPSBjb250YWlucy5jYWxsKGRzY3IsICdlJyk7XG5cdFx0dyA9IGNvbnRhaW5zLmNhbGwoZHNjciwgJ3cnKTtcblx0fVxuXG5cdGRlc2MgPSB7IHZhbHVlOiB2YWx1ZSwgY29uZmlndXJhYmxlOiBjLCBlbnVtZXJhYmxlOiBlLCB3cml0YWJsZTogdyB9O1xuXHRyZXR1cm4gIW9wdGlvbnMgPyBkZXNjIDogYXNzaWduKG5vcm1hbGl6ZU9wdHMob3B0aW9ucyksIGRlc2MpO1xufTtcblxuZC5ncyA9IGZ1bmN0aW9uIChkc2NyLCBnZXQsIHNldC8qLCBvcHRpb25zKi8pIHtcblx0dmFyIGMsIGUsIG9wdGlvbnMsIGRlc2M7XG5cdGlmICh0eXBlb2YgZHNjciAhPT0gJ3N0cmluZycpIHtcblx0XHRvcHRpb25zID0gc2V0O1xuXHRcdHNldCA9IGdldDtcblx0XHRnZXQgPSBkc2NyO1xuXHRcdGRzY3IgPSBudWxsO1xuXHR9IGVsc2Uge1xuXHRcdG9wdGlvbnMgPSBhcmd1bWVudHNbM107XG5cdH1cblx0aWYgKGdldCA9PSBudWxsKSB7XG5cdFx0Z2V0ID0gdW5kZWZpbmVkO1xuXHR9IGVsc2UgaWYgKCFpc0NhbGxhYmxlKGdldCkpIHtcblx0XHRvcHRpb25zID0gZ2V0O1xuXHRcdGdldCA9IHNldCA9IHVuZGVmaW5lZDtcblx0fSBlbHNlIGlmIChzZXQgPT0gbnVsbCkge1xuXHRcdHNldCA9IHVuZGVmaW5lZDtcblx0fSBlbHNlIGlmICghaXNDYWxsYWJsZShzZXQpKSB7XG5cdFx0b3B0aW9ucyA9IHNldDtcblx0XHRzZXQgPSB1bmRlZmluZWQ7XG5cdH1cblx0aWYgKGRzY3IgPT0gbnVsbCkge1xuXHRcdGMgPSB0cnVlO1xuXHRcdGUgPSBmYWxzZTtcblx0fSBlbHNlIHtcblx0XHRjID0gY29udGFpbnMuY2FsbChkc2NyLCAnYycpO1xuXHRcdGUgPSBjb250YWlucy5jYWxsKGRzY3IsICdlJyk7XG5cdH1cblxuXHRkZXNjID0geyBnZXQ6IGdldCwgc2V0OiBzZXQsIGNvbmZpZ3VyYWJsZTogYywgZW51bWVyYWJsZTogZSB9O1xuXHRyZXR1cm4gIW9wdGlvbnMgPyBkZXNjIDogYXNzaWduKG5vcm1hbGl6ZU9wdHMob3B0aW9ucyksIGRlc2MpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4xLjFAZC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vaXMtaW1wbGVtZW50ZWQnKSgpXG5cdD8gT2JqZWN0LmFzc2lnblxuXHQ6IHJlcXVpcmUoJy4vc2hpbScpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjEwLjEyQGVzNS1leHQvb2JqZWN0L2Fzc2lnbi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIGFzc2lnbiA9IE9iamVjdC5hc3NpZ24sIG9iajtcblx0aWYgKHR5cGVvZiBhc3NpZ24gIT09ICdmdW5jdGlvbicpIHJldHVybiBmYWxzZTtcblx0b2JqID0geyBmb286ICdyYXonIH07XG5cdGFzc2lnbihvYmosIHsgYmFyOiAnZHdhJyB9LCB7IHRyenk6ICd0cnp5JyB9KTtcblx0cmV0dXJuIChvYmouZm9vICsgb2JqLmJhciArIG9iai50cnp5KSA9PT0gJ3JhemR3YXRyenknO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4xMC4xMkBlczUtZXh0L29iamVjdC9hc3NpZ24vaXMtaW1wbGVtZW50ZWQuanNcbi8vIG1vZHVsZSBpZCA9IDEwOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxudmFyIGtleXMgID0gcmVxdWlyZSgnLi4va2V5cycpXG4gICwgdmFsdWUgPSByZXF1aXJlKCcuLi92YWxpZC12YWx1ZScpXG5cbiAgLCBtYXggPSBNYXRoLm1heDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZGVzdCwgc3JjLyosIOKApnNyY24qLykge1xuXHR2YXIgZXJyb3IsIGksIGwgPSBtYXgoYXJndW1lbnRzLmxlbmd0aCwgMiksIGFzc2lnbjtcblx0ZGVzdCA9IE9iamVjdCh2YWx1ZShkZXN0KSk7XG5cdGFzc2lnbiA9IGZ1bmN0aW9uIChrZXkpIHtcblx0XHR0cnkgeyBkZXN0W2tleV0gPSBzcmNba2V5XTsgfSBjYXRjaCAoZSkge1xuXHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlO1xuXHRcdH1cblx0fTtcblx0Zm9yIChpID0gMTsgaSA8IGw7ICsraSkge1xuXHRcdHNyYyA9IGFyZ3VtZW50c1tpXTtcblx0XHRrZXlzKHNyYykuZm9yRWFjaChhc3NpZ24pO1xuXHR9XG5cdGlmIChlcnJvciAhPT0gdW5kZWZpbmVkKSB0aHJvdyBlcnJvcjtcblx0cmV0dXJuIGRlc3Q7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjEwLjEyQGVzNS1leHQvb2JqZWN0L2Fzc2lnbi9zaGltLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9pcy1pbXBsZW1lbnRlZCcpKClcblx0PyBPYmplY3Qua2V5c1xuXHQ6IHJlcXVpcmUoJy4vc2hpbScpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjEwLjEyQGVzNS1leHQvb2JqZWN0L2tleXMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDExMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cdHRyeSB7XG5cdFx0T2JqZWN0LmtleXMoJ3ByaW1pdGl2ZScpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlKSB7IHJldHVybiBmYWxzZTsgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4xMC4xMkBlczUtZXh0L29iamVjdC9rZXlzL2lzLWltcGxlbWVudGVkLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbnZhciBrZXlzID0gT2JqZWN0LmtleXM7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCkge1xuXHRyZXR1cm4ga2V5cyhvYmplY3QgPT0gbnVsbCA/IG9iamVjdCA6IE9iamVjdChvYmplY3QpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3Qva2V5cy9zaGltLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdGlmICh2YWx1ZSA9PSBudWxsKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHVzZSBudWxsIG9yIHVuZGVmaW5lZFwiKTtcblx0cmV0dXJuIHZhbHVlO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4xMC4xMkBlczUtZXh0L29iamVjdC92YWxpZC12YWx1ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZm9yRWFjaCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLCBjcmVhdGUgPSBPYmplY3QuY3JlYXRlO1xuXG52YXIgcHJvY2VzcyA9IGZ1bmN0aW9uIChzcmMsIG9iaikge1xuXHR2YXIga2V5O1xuXHRmb3IgKGtleSBpbiBzcmMpIG9ialtrZXldID0gc3JjW2tleV07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcHRpb25zLyosIOKApm9wdGlvbnMqLykge1xuXHR2YXIgcmVzdWx0ID0gY3JlYXRlKG51bGwpO1xuXHRmb3JFYWNoLmNhbGwoYXJndW1lbnRzLCBmdW5jdGlvbiAob3B0aW9ucykge1xuXHRcdGlmIChvcHRpb25zID09IG51bGwpIHJldHVybjtcblx0XHRwcm9jZXNzKE9iamVjdChvcHRpb25zKSwgcmVzdWx0KTtcblx0fSk7XG5cdHJldHVybiByZXN1bHQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjEwLjEyQGVzNS1leHQvb2JqZWN0L25vcm1hbGl6ZS1vcHRpb25zLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBEZXByZWNhdGVkXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nOyB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjEwLjEyQGVzNS1leHQvb2JqZWN0L2lzLWNhbGxhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9pcy1pbXBsZW1lbnRlZCcpKClcblx0PyBTdHJpbmcucHJvdG90eXBlLmNvbnRhaW5zXG5cdDogcmVxdWlyZSgnLi9zaGltJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMTAuMTJAZXM1LWV4dC9zdHJpbmcvIy9jb250YWlucy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyID0gJ3JhemR3YXRyenknO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblx0aWYgKHR5cGVvZiBzdHIuY29udGFpbnMgIT09ICdmdW5jdGlvbicpIHJldHVybiBmYWxzZTtcblx0cmV0dXJuICgoc3RyLmNvbnRhaW5zKCdkd2EnKSA9PT0gdHJ1ZSkgJiYgKHN0ci5jb250YWlucygnZm9vJykgPT09IGZhbHNlKSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjEwLjEyQGVzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvaXMtaW1wbGVtZW50ZWQuanNcbi8vIG1vZHVsZSBpZCA9IDExOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxudmFyIGluZGV4T2YgPSBTdHJpbmcucHJvdG90eXBlLmluZGV4T2Y7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNlYXJjaFN0cmluZy8qLCBwb3NpdGlvbiovKSB7XG5cdHJldHVybiBpbmRleE9mLmNhbGwodGhpcywgc2VhcmNoU3RyaW5nLCBhcmd1bWVudHNbMV0pID4gLTE7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjEwLjEyQGVzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvc2hpbS5qc1xuLy8gbW9kdWxlIGlkID0gMTE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbikge1xuXHRpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB0aHJvdyBuZXcgVHlwZUVycm9yKGZuICsgXCIgaXMgbm90IGEgZnVuY3Rpb25cIik7XG5cdHJldHVybiBmbjtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3QvdmFsaWQtY2FsbGFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDEyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImltcG9ydCB7b3N9IGZyb20gJ2FtZmUtZW52JztcbmltcG9ydCAnLi9zdGFnZS5jc3MnO1xuaW1wb3J0IHtcbiAgICB3aW4sXG4gICAgZG9jLFxuICAgIFByb21pc2UsXG4gICAgcXVlcnksXG4gICAgcXVlcnlBbGwsXG4gICAgZ2V0UmVjdFxufSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHtcbiAgICBDYW52YXNSZW5kZXJcbn0gZnJvbSAnLi9jYW52YXMnO1xuaW1wb3J0IHNsaWNlQ29uZmlnIGZyb20gJy4vc2xpY2VDb25maWcnO1xuXG5jb25zdCBzbGljZVdpZHRoID0gNzUwO1xuY29uc3Qgc2xpY2VIZWlnaHQgPSAxMzM0O1xuY29uc3QgaFNsaWNlID0gOTtcbmNvbnN0IHZTbGljZSA9IDE0O1xuY29uc3Qgd2lkdGggPSBzbGljZVdpZHRoICogaFNsaWNlO1xuY29uc3QgaGVpZ2h0ID0gc2xpY2VIZWlnaHQgKiB2U2xpY2U7XG5jb25zdCBkcHIgPSBvcy5pc0lPUyA/IDIgOiAxO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFnZSBleHRlbmRzIENhbnZhc1JlbmRlcntcbiAgICBjb25zdHJ1Y3Rvcih2aWV3cG9ydCkge1xuICAgICAgICBjb25zdCBzdGFnZUVsID0gcXVlcnkodmlld3BvcnQsICcjc3RhZ2UnKTtcbiAgICAgICAgbGV0IHt3aWR0aDogdncsIGhlaWdodDogdmh9ID0gZ2V0UmVjdCh2aWV3cG9ydCk7XG5cbiAgICAgICAgdncgKj0gZHByO1xuICAgICAgICB2aCAqPSBkcHI7XG4gICAgICAgIHN1cGVyKHN0YWdlRWwsIHZ3LCB2aCk7XG5cbiAgICAgICAgdGhpcy5zdGFnZUVsID0gc3RhZ2VFbDtcbiAgICAgICAgdGhpcy52dyA9IHZ3O1xuICAgICAgICB0aGlzLnZoID0gdmg7XG4gICAgICAgIHRoaXMud2lkdGggPSB2dyAqIGhTbGljZTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSB2dyAvICh3aWR0aCAvIGhTbGljZSkgKiBoZWlnaHQ7XG4gICAgICAgIHRoaXMuaFNsaWNlID0gaFNsaWNlO1xuICAgICAgICB0aGlzLnZTbGljZSA9IHZTbGljZTtcbiAgICAgICAgdGhpcy5zbGljZVdpZHRoID0gdGhpcy53aWR0aCAvIGhTbGljZTtcbiAgICAgICAgdGhpcy5zbGljZUhlaWdodCA9IHRoaXMuaGVpZ2h0IC8gdlNsaWNlO1xuICAgICAgICB0aGlzLnNsaWNlcyA9IFtdO1xuICAgICAgICB0aGlzLmRwciA9IGRwcjtcblxuXG4gICAgICAgIGZvciAobGV0IHYgPSAwOyB2IDwgdGhpcy52U2xpY2U7IHYrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgaCA9IDA7IGggPCB0aGlzLmhTbGljZTsgaCsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB2ICogdGhpcy5oU2xpY2UgKyBoO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHYgKiB0aGlzLmhTbGljZSArIGgsXG4gICAgICAgICAgICAgICAgICAgIGgsXG4gICAgICAgICAgICAgICAgICAgIHZcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmIChzbGljZUNvbmZpZ1tTdHJpbmcoaW5kZXgpXSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBzbGljZUNvbmZpZ1tTdHJpbmcoaW5kZXgpXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnW2tleV0gPSBzbGljZUNvbmZpZ1tTdHJpbmcoaW5kZXgpXVtrZXldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5zbGljZXMucHVzaChjb25maWcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHRvdGFsQW1vdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zbGljZXMubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldCBzcGVjaWFsQW1vdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zbGljZXMuZmlsdGVyKHNsaWNlID0+XG4gICAgICAgICAgICBzbGljZS50eXBlID09PSAzXG4gICAgICAgICkubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldCBzcGVjaWFsRm91bmQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNsaWNlcy5maWx0ZXIoc2xpY2UgPT5cbiAgICAgICAgICAgIHNsaWNlLnR5cGUgPT09IDMgJiYgc2xpY2UuZm91bmRcbiAgICAgICAgKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgZ2V0IGZvY3VzZWRBbW91bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNsaWNlcy5maWx0ZXIoc2xpY2UgPT5cbiAgICAgICAgICAgIHNsaWNlLmZvY3VzZWRcbiAgICAgICAgKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgZ2V0IGhvdmVyZWRBbW91bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNsaWNlcy5maWx0ZXIoc2xpY2UgPT5cbiAgICAgICAgICAgIHNsaWNlLmhvdmVyZWRcbiAgICAgICAgKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgZ2V0U2xpY2Uoc2Nyb2xsWCwgc2Nyb2xsWSkge1xuICAgICAgICBjb25zdCBoID0gcGFyc2VJbnQoc2Nyb2xsWCAvIHRoaXMuc2xpY2VXaWR0aCk7XG4gICAgICAgIGNvbnN0IHYgPSBwYXJzZUludChzY3JvbGxZIC8gdGhpcy5zbGljZUhlaWdodCk7XG4gICAgICAgIHJldHVybiB0aGlzLnNsaWNlc1t2ICogdGhpcy5oU2xpY2UgKyBoXTtcbiAgICB9XG5cbiAgICBnZXRIb3ZlclNsaWNlKHNjcm9sbFgsIHNjcm9sbFkpIHtcbiAgICAgICAgY29uc3QgaG92ZXIgPSB0aGlzLmdldFNsaWNlKHNjcm9sbFgsIHNjcm9sbFkpO1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBoLFxuICAgICAgICAgICAgdixcbiAgICAgICAgICAgIGluZGV4XG4gICAgICAgIH0gPSBob3ZlcjtcbiAgICAgICAgY29uc3QgcmVsYXRlZCA9IFtdO1xuXG4gICAgICAgIGlmIChoIDwgdGhpcy5oU2xpY2UgLSAxKSB7XG4gICAgICAgICAgICByZWxhdGVkLnB1c2godGhpcy5zbGljZXNbaW5kZXggKyAxXSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodiA8IHRoaXMudlNsaWNlIC0gMSkge1xuICAgICAgICAgICAgcmVsYXRlZC5wdXNoKHRoaXMuc2xpY2VzW2luZGV4ICsgdGhpcy5oU2xpY2VdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoIDwgdGhpcy5oU2xpY2UgLSAxXG4gICAgICAgICAgICAmJiB2IDwgdGhpcy52U2xpY2UgLSAxKSB7XG4gICAgICAgICAgICByZWxhdGVkLnB1c2godGhpcy5zbGljZXNbaW5kZXggKyB0aGlzLmhTbGljZSArIDFdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBob3ZlcixcbiAgICAgICAgICAgIC4uLnJlbGF0ZWRcbiAgICAgICAgXS5tYXAoc2xpY2UgPT4ge1xuICAgICAgICAgICAgc2xpY2UuaG92ZXJlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gc2xpY2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldEZvY3VzU2xpY2UoY3gsIGN5KSB7XG4gICAgICAgIGNvbnN0IGggPSBwYXJzZUludChjeCAvIHRoaXMuc2xpY2VXaWR0aCk7XG4gICAgICAgIGNvbnN0IHYgPSBwYXJzZUludChjeSAvIHRoaXMuc2xpY2VIZWlnaHQpO1xuICAgICAgICBjb25zdCBkeCA9IHBhcnNlSW50KGN4ICUgdGhpcy5zbGljZVdpZHRoKTtcbiAgICAgICAgY29uc3QgZHkgPSBwYXJzZUludChjeSAlIHRoaXMuc2xpY2VIZWlnaHQpO1xuXG4gICAgICAgIGNvbnN0IHJhdGlvID0gMC44O1xuICAgICAgICBsZXQgc2xpY2U7XG4gICAgICAgIGlmIChkeCA+IHRoaXMuc2xpY2VXaWR0aCAqICgxIC0gcmF0aW8pIC8gMiAmJiBkeCA8IHRoaXMuc2xpY2VXaWR0aCAqICgxIC0gKDEgLSByYXRpbykgLyAyKVxuICAgICAgICAgICAgICAgICYmIGR5ID4gdGhpcy5zbGljZUhlaWdodCAqICgxIC0gcmF0aW8pIC8gMiAmJiBkeSA8IHRoaXMuc2xpY2VIZWlnaHQgKiAoMSAtICgxIC0gcmF0aW8pIC8gMikpIHtcbiAgICAgICAgICAgIHNsaWNlID0gdGhpcy5zbGljZXNbdiAqIHRoaXMuaFNsaWNlICsgaF07XG4gICAgICAgICAgICBzbGljZS5mb2N1c2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzbGljZTtcbiAgICB9XG5cbiAgICByZWFkeSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RhZ2VFbC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc3RhZ2UuanMiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuVmVyc2lvbiA9IGV4cG9ydHMucGFyYW1zID0gZXhwb3J0cy50aGlyZGFwcCA9IGV4cG9ydHMuYWxpYXBwID0gZXhwb3J0cy5vcyA9IGV4cG9ydHMuYnJvd3NlciA9IHVuZGVmaW5lZDtcblxudmFyIF9hbGlhcHAgPSByZXF1aXJlKCcuL2FsaWFwcCcpO1xuXG52YXIgX2FsaWFwcDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hbGlhcHApO1xuXG52YXIgX2Jyb3dzZXIgPSByZXF1aXJlKCcuL2Jyb3dzZXInKTtcblxudmFyIF9icm93c2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Jyb3dzZXIpO1xuXG52YXIgX29zID0gcmVxdWlyZSgnLi9vcycpO1xuXG52YXIgX29zMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX29zKTtcblxudmFyIF90aGlyZGFwcCA9IHJlcXVpcmUoJy4vdGhpcmRhcHAnKTtcblxudmFyIF90aGlyZGFwcDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90aGlyZGFwcCk7XG5cbnZhciBfcGFyYW1zID0gcmVxdWlyZSgnLi9wYXJhbXMnKTtcblxudmFyIF9wYXJhbXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcGFyYW1zKTtcblxudmFyIF92ZXJzaW9uID0gcmVxdWlyZSgnLi92ZXJzaW9uJyk7XG5cbnZhciBfdmVyc2lvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF92ZXJzaW9uKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5icm93c2VyID0gX2Jyb3dzZXIyLmRlZmF1bHQ7XG5leHBvcnRzLm9zID0gX29zMi5kZWZhdWx0O1xuZXhwb3J0cy5hbGlhcHAgPSBfYWxpYXBwMi5kZWZhdWx0O1xuZXhwb3J0cy50aGlyZGFwcCA9IF90aGlyZGFwcDIuZGVmYXVsdDtcbmV4cG9ydHMucGFyYW1zID0gX3BhcmFtczIuZGVmYXVsdDtcbmV4cG9ydHMuVmVyc2lvbiA9IF92ZXJzaW9uMi5kZWZhdWx0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi4wLjBAYW1mZS1lbnYvc3JjL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF92ZXJzaW9uID0gcmVxdWlyZSgnLi92ZXJzaW9uJyk7XG5cbnZhciBfdmVyc2lvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF92ZXJzaW9uKTtcblxudmFyIF9vcyA9IHJlcXVpcmUoJy4vb3MnKTtcblxudmFyIF9vczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9vcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xudmFyIGFsaWFwcCA9IGZhbHNlO1xuXG52YXIgd2luZHZhbmU7XG52YXIgbWF0Y2hlZDtcbnZhciBhcHBuYW1lID0gJyc7XG52YXIgcGxhdGZvcm0gPSAnJztcbnZhciB2ZXJzaW9uID0gJyc7XG5cbmlmIChtYXRjaGVkID0gdWEubWF0Y2goL1dpbmRWYW5lW1xcL1xcc10oW1xcZFxcLlxcX10rKS9pKSkge1xuICAgIHdpbmR2YW5lID0gbWF0Y2hlZFsxXTtcbn1cblxuaWYgKG1hdGNoZWQgPSB1YS5tYXRjaCgvQWxpQXBwXFwoKFtBLVpcXC1dKylcXC8oW1xcZFxcLl0rKVxcKS9pKSkge1xuICAgIGFsaWFwcCA9IHRydWU7XG4gICAgYXBwbmFtZSA9IG1hdGNoZWRbMV07XG4gICAgdmVyc2lvbiA9IG1hdGNoZWRbMl07XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBpZiAoYXBwbmFtZS5pbmRleE9mKCctUEQnKSA+IDApIHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmIChfb3MyLmRlZmF1bHQuaXNJT1MpIHtcbiAgICAgICAgICAgIHBsYXRmb3JtID0gJ2lQYWQnO1xuICAgICAgICB9IGVsc2UgaWYgKF9vczIuZGVmYXVsdC5pc0FuZHJvaWQpIHtcbiAgICAgICAgICAgIHBsYXRmb3JtID0gJ0FuZHJvaWRQYWQnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGxhdGZvcm0gPSBfb3MyLmRlZmF1bHQubmFtZTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHBsYXRmb3JtID0gX29zMi5kZWZhdWx0Lm5hbWU7XG4gICAgfVxufVxuXG4vLyDlhbzlrrnmiYvmt5jnmoTkuIDkuKpidWfvvIzlnKh3ZWJ2aWV35Yid5aeL5YyW5byC5bi45pe277yM5ZyodWHkuK3lj6rljIXlkKtUQklPU+Wtl+agt++8jOS5n+iupOS4uuaYr+aJi+a3mHdlYnZpZXfjgIJcbi8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuaWYgKCFhcHBuYW1lICYmIHVhLmluZGV4T2YoJ1RCSU9TJykgPiAwKSB7XG4gICAgYXBwbmFtZSA9ICdUQic7XG59XG5cbi8vIOWIpOaWrXBvcGxheWVyXG4vLyBwb3BsYXllcuebuOWFs+S/oeaBr++8jOWcqHBvcGxheWVy5Lya5pyJ6K+l5a2X5q6177yM5b2i5aaCIHdpbmRvdy5fdWFfcG9wTGF5ZXIgPSAnUG9wTGF5ZXIvMS4zLjQnXG4vLyBwb3BsYXllcuS/oeaBr+S4jeWcqHVh5Lit5piv5Zug5Li65ZyoSU9T5LiL77yM5L+u5pS5cG9wbGF5ZXLlsYLnmoR1YeS8muWvvOiHtOaJgOaciXdlYnZpZXfnmoR1YeaUueWPmO+8jOaJgOS7peWPquiDveWGmeWcqOWFqOWxgOWPmOmHj+S4rVxudmFyIHBvcGxheWVySW5mbyA9IHdpbmRvdy5fdWFfcG9wTGF5ZXIgfHwgJyc7XG52YXIgcG9wbGF5ZXIgPSBmYWxzZTtcbnZhciBwb3BsYXllclZlcnNpb24gPSAnJztcbmlmIChwb3BsYXllckluZm8gJiYgKG1hdGNoZWQgPSBwb3BsYXllckluZm8ubWF0Y2goL1BvcExheWVyXFwvKFtcXGRcXC5dKykvaSkpKSB7XG4gICAgcG9wbGF5ZXIgPSB0cnVlO1xuICAgIHBvcGxheWVyVmVyc2lvbiA9IG1hdGNoZWRbMV07XG59XG5cbmlmIChhbGlhcHApIHtcbiAgICBhbGlhcHAgPSB7XG4gICAgICAgIHdpbmR2YW5lOiBuZXcgX3ZlcnNpb24yLmRlZmF1bHQod2luZHZhbmUgfHwgJzAuMC4wJyksXG4gICAgICAgIGFwcG5hbWU6IGFwcG5hbWUgfHwgJ3Vua293bicsXG4gICAgICAgIHZlcnNpb246IG5ldyBfdmVyc2lvbjIuZGVmYXVsdCh2ZXJzaW9uIHx8ICcwLjAuMCcpLFxuICAgICAgICBwbGF0Zm9ybTogcGxhdGZvcm0gfHwgX29zMi5kZWZhdWx0Lm5hbWUsXG4gICAgICAgIHBvcGxheWVyOiBwb3BsYXllciB8fCBmYWxzZSxcbiAgICAgICAgcG9wbGF5ZXJWZXJzaW9uOiBuZXcgX3ZlcnNpb24yLmRlZmF1bHQocG9wbGF5ZXJWZXJzaW9uIHx8ICcwLjAuMCcpXG4gICAgfTtcbn1cblxuZXhwb3J0cy5kZWZhdWx0ID0gYWxpYXBwO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi4wLjBAYW1mZS1lbnYvc3JjL2FsaWFwcC5qc1xuLy8gbW9kdWxlIGlkID0gMTIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBWZXJzaW9uID0gZnVuY3Rpb24gKCkge1xuICAgIF9jcmVhdGVDbGFzcyhWZXJzaW9uLCBudWxsLCBbe1xuICAgICAgICBrZXk6ICdjb21wYXJlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBhcmUodjEsIHYyKSB7XG4gICAgICAgICAgICB2MSA9IHYxLnRvU3RyaW5nKCkuc3BsaXQoJy4nKTtcbiAgICAgICAgICAgIHYyID0gdjIudG9TdHJpbmcoKS5zcGxpdCgnLicpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHYxLmxlbmd0aCB8fCBpIDwgdjIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgbjEgPSBwYXJzZUludCh2MVtpXSwgMTApO1xuICAgICAgICAgICAgICAgIHZhciBuMiA9IHBhcnNlSW50KHYyW2ldLCAxMCk7XG5cbiAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4objEpKSB7XG4gICAgICAgICAgICAgICAgICAgIG4xID0gMDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4objIpKSB7XG4gICAgICAgICAgICAgICAgICAgIG4yID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG4xIDwgbjIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobjEgPiBuMikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIGZ1bmN0aW9uIFZlcnNpb24odikge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVmVyc2lvbik7XG5cbiAgICAgICAgaWYgKHYpIHtcbiAgICAgICAgICAgIHRoaXMudmFsID0gdi50b1N0cmluZygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52YWwgPSAnJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhWZXJzaW9uLCBbe1xuICAgICAgICBrZXk6ICdndCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBndCh2KSB7XG4gICAgICAgICAgICByZXR1cm4gVmVyc2lvbi5jb21wYXJlKHRoaXMsIHYpID4gMDtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ3RlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGd0ZSh2KSB7XG4gICAgICAgICAgICByZXR1cm4gVmVyc2lvbi5jb21wYXJlKHRoaXMsIHYpID49IDA7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2x0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGx0KHYpIHtcbiAgICAgICAgICAgIHJldHVybiBWZXJzaW9uLmNvbXBhcmUodGhpcywgdikgPCAwO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdsdGUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gbHRlKHYpIHtcbiAgICAgICAgICAgIHJldHVybiBWZXJzaW9uLmNvbXBhcmUodGhpcywgdikgPD0gMDtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZXEnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZXEodikge1xuICAgICAgICAgICAgcmV0dXJuIFZlcnNpb24uY29tcGFyZSh0aGlzLCB2KSA9PT0gMDtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAndG9TdHJpbmcnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWwudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBWZXJzaW9uO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBWZXJzaW9uO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi4wLjBAYW1mZS1lbnYvc3JjL3ZlcnNpb24uanNcbi8vIG1vZHVsZSBpZCA9IDEyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3ZlcnNpb24gPSByZXF1aXJlKCcuL3ZlcnNpb24nKTtcblxudmFyIF92ZXJzaW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3ZlcnNpb24pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgdWEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcbnZhciBvcztcbnZhciBtYXRjaGVkO1xuXG5pZiAobWF0Y2hlZCA9IHVhLm1hdGNoKC9XaW5kb3dzXFxzUGhvbmVcXHMoPzpPU1xccyk/KFtcXGRcXC5dKykvKSkge1xuICAgIG9zID0ge1xuICAgICAgICBuYW1lOiAnV2luZG93cyBQaG9uZScsXG4gICAgICAgIGlzV2luZG93c1Bob25lOiB0cnVlLFxuICAgICAgICB2ZXJzaW9uOiBuZXcgX3ZlcnNpb24yLmRlZmF1bHQobWF0Y2hlZFsxXSlcbiAgICB9O1xufSBlbHNlIGlmICghIXVhLm1hdGNoKC9TYWZhcmkvKSAmJiAobWF0Y2hlZCA9IHVhLm1hdGNoKC9BbmRyb2lkW1xcc1xcL10oW1xcZFxcLl0rKS8pKSkge1xuICAgIG9zID0ge1xuICAgICAgICB2ZXJzaW9uOiBuZXcgX3ZlcnNpb24yLmRlZmF1bHQobWF0Y2hlZFsxXSlcbiAgICB9O1xuXG4gICAgaWYgKHVhLm1hdGNoKC9Nb2JpbGVcXHMrU2FmYXJpLykpIHtcbiAgICAgICAgb3MubmFtZSA9ICdBbmRyb2lkJztcbiAgICAgICAgb3MuaXNBbmRyb2lkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBvcy5uYW1lID0gJ0FuZHJvaWRQYWQnO1xuICAgICAgICBvcy5pc0FuZHJvaWRQYWQgPSB0cnVlO1xuICAgIH1cbn0gZWxzZSBpZiAobWF0Y2hlZCA9IHVhLm1hdGNoKC8oaVBob25lfGlQYWR8aVBvZCkvKSkge1xuICAgIHZhciBuYW1lID0gbWF0Y2hlZFsxXTtcblxuICAgIGlmIChtYXRjaGVkID0gdWEubWF0Y2goL09TIChbXFxkX1xcLl0rKSBsaWtlIE1hYyBPUyBYLykpIHtcbiAgICAgICAgb3MgPSB7XG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgaXNJUGhvbmU6IG5hbWUgPT09ICdpUGhvbmUnIHx8IG5hbWUgPT09ICdpUG9kJyxcbiAgICAgICAgICAgIGlzSVBhZDogbmFtZSA9PT0gJ2lQYWQnLFxuICAgICAgICAgICAgaXNJT1M6IHRydWUsXG4gICAgICAgICAgICB2ZXJzaW9uOiBuZXcgX3ZlcnNpb24yLmRlZmF1bHQobWF0Y2hlZFsxXS5zcGxpdCgnXycpLmpvaW4oJy4nKSlcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbmlmICghb3MpIHtcbiAgICBvcyA9IHtcbiAgICAgICAgbmFtZTogJ3Vua25vd24nLFxuICAgICAgICB2ZXJzaW9uOiBuZXcgX3ZlcnNpb24yLmRlZmF1bHQoJzAuMC4wJylcbiAgICB9O1xufVxuXG5leHBvcnRzLmRlZmF1bHQgPSBvcztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuMC4wQGFtZmUtZW52L3NyYy9vcy5qc1xuLy8gbW9kdWxlIGlkID0gMTI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdmVyc2lvbiA9IHJlcXVpcmUoJy4vdmVyc2lvbicpO1xuXG52YXIgX3ZlcnNpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdmVyc2lvbik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xudmFyIGJyb3dzZXI7XG52YXIgbWF0Y2hlZDtcblxuaWYgKG1hdGNoZWQgPSB1YS5tYXRjaCgvKD86VUNXRUJ8VUNCcm93c2VyXFwvKShbXFxkXFwuXSspLykpIHtcbiAgICBicm93c2VyID0ge1xuICAgICAgICBuYW1lOiAnVUMnLFxuICAgICAgICBpc1VDOiB0cnVlLFxuICAgICAgICB2ZXJzaW9uOiBuZXcgX3ZlcnNpb24yLmRlZmF1bHQobWF0Y2hlZFsxXSlcbiAgICB9O1xufSBlbHNlIGlmIChtYXRjaGVkID0gdWEubWF0Y2goL01RUUJyb3dzZXJcXC8oW1xcZFxcLl0rKS8pKSB7XG4gICAgYnJvd3NlciA9IHtcbiAgICAgICAgbmFtZTogJ1FRJyxcbiAgICAgICAgaXNRUTogdHJ1ZSxcbiAgICAgICAgdmVyc2lvbjogbmV3IF92ZXJzaW9uMi5kZWZhdWx0KG1hdGNoZWRbMV0pXG4gICAgfTtcbn0gZWxzZSBpZiAobWF0Y2hlZCA9IHVhLm1hdGNoKC8oPzpGaXJlZm94fEZ4aU9TKVxcLyhbXFxkXFwuXSspLykpIHtcbiAgICBicm93c2VyID0ge1xuICAgICAgICBuYW1lOiAnRmlyZWZveCcsXG4gICAgICAgIGlzRmlyZWZveDogdHJ1ZSxcbiAgICAgICAgdmVyc2lvbjogbmV3IF92ZXJzaW9uMi5kZWZhdWx0KG1hdGNoZWRbMV0pXG4gICAgfTtcbn0gZWxzZSBpZiAoKG1hdGNoZWQgPSB1YS5tYXRjaCgvTVNJRVxccyhbXFxkXFwuXSspLykpIHx8IChtYXRjaGVkID0gdWEubWF0Y2goL0lFTW9iaWxlXFwvKFtcXGRcXC5dKykvKSkpIHtcblxuICAgIGJyb3dzZXIgPSB7XG4gICAgICAgIHZlcnNpb246IG5ldyBfdmVyc2lvbjIuZGVmYXVsdChtYXRjaGVkWzFdKVxuICAgIH07XG5cbiAgICBpZiAodWEubWF0Y2goL0lFTW9iaWxlLykpIHtcbiAgICAgICAgYnJvd3Nlci5uYW1lID0gJ0lFTW9iaWxlJztcbiAgICAgICAgYnJvd3Nlci5pc0lFTW9iaWxlID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBicm93c2VyLm5hbWUgPSAnSUUnO1xuICAgICAgICBicm93c2VyLmlzSUUgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICh1YS5tYXRjaCgvQW5kcm9pZHxpUGhvbmUvKSkge1xuICAgICAgICBicm93c2VyLmlzSUVMaWtlV2Via2l0ID0gdHJ1ZTtcbiAgICB9XG59IGVsc2UgaWYgKG1hdGNoZWQgPSB1YS5tYXRjaCgvKD86Q2hyb21lfENyaU9TKVxcLyhbXFxkXFwuXSspLykpIHtcbiAgICBicm93c2VyID0ge1xuICAgICAgICBuYW1lOiAnQ2hyb21lJyxcbiAgICAgICAgaXNDaHJvbWU6IHRydWUsXG4gICAgICAgIHZlcnNpb246IG5ldyBfdmVyc2lvbjIuZGVmYXVsdChtYXRjaGVkWzFdKVxuICAgIH07XG5cbiAgICBpZiAodWEubWF0Y2goL1ZlcnNpb25cXC9bXFxkK1xcLl0rXFxzKkNocm9tZS8pKSB7XG4gICAgICAgIGJyb3dzZXIubmFtZSA9ICdDaHJvbWUgV2Vidmlldyc7XG4gICAgICAgIGJyb3dzZXIuaXNXZWJ2aWV3ID0gdHJ1ZTtcbiAgICB9XG59IGVsc2UgaWYgKCEhdWEubWF0Y2goL1NhZmFyaS8pICYmIChtYXRjaGVkID0gdWEubWF0Y2goL0FuZHJvaWRbXFxzXFwvXShbXFxkXFwuXSspLykpKSB7XG4gICAgYnJvd3NlciA9IHtcbiAgICAgICAgbmFtZTogJ0FuZHJvaWQnLFxuICAgICAgICBpc0FuZHJvaWQ6IHRydWUsXG4gICAgICAgIHZlcnNpb246IG5ldyBfdmVyc2lvbjIuZGVmYXVsdChtYXRjaGVkWzFdKVxuICAgIH07XG59IGVsc2UgaWYgKHVhLm1hdGNoKC9pUGhvbmV8aVBhZHxpUG9kLykpIHtcbiAgICBpZiAodWEubWF0Y2goL1NhZmFyaS8pICYmIChtYXRjaGVkID0gdWEubWF0Y2goL1ZlcnNpb25cXC8oW1xcZFxcLl0rKS8pKSkge1xuICAgICAgICBicm93c2VyID0ge1xuICAgICAgICAgICAgbmFtZTogJ1NhZmFyaScsXG4gICAgICAgICAgICBpc1NhZmFyaTogdHJ1ZSxcbiAgICAgICAgICAgIHZlcnNpb246IG5ldyBfdmVyc2lvbjIuZGVmYXVsdChtYXRjaGVkWzFdKVxuICAgICAgICB9O1xuICAgIH0gZWxzZSBpZiAobWF0Y2hlZCA9IHVhLm1hdGNoKC9PUyAoW1xcZF9cXC5dKykgbGlrZSBNYWMgT1MgWC8pKSB7XG4gICAgICAgIGJyb3dzZXIgPSB7XG4gICAgICAgICAgICBuYW1lOiAnaU9TIFdlYnZpZXcnLFxuICAgICAgICAgICAgaXNXZWJ2aWV3OiB0cnVlLFxuICAgICAgICAgICAgdmVyc2lvbjogbmV3IF92ZXJzaW9uMi5kZWZhdWx0KG1hdGNoZWRbMV0ucmVwbGFjZSgvXFxfL2csICcuJykpXG4gICAgICAgIH07XG4gICAgfVxufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbmlmICghYnJvd3Nlcikge1xuICAgIGJyb3dzZXIgPSB7XG4gICAgICAgIG5hbWU6ICd1bmtub3duJyxcbiAgICAgICAgdmVyc2lvbjogbmV3IF92ZXJzaW9uMi5kZWZhdWx0KCcwLjAuMCcpXG4gICAgfTtcbn1cblxuZXhwb3J0cy5kZWZhdWx0ID0gYnJvd3NlcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuMC4wQGFtZmUtZW52L3NyYy9icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAxMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbnZhciB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuXG52YXIgdGhpcmRhcHA7XG5cbmlmICh1YS5tYXRjaCgvV2VpYm8vaSkpIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqIEBtZW1iZXJvZiBsaWIuZW52XG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IGFwcG5hbWUgLSDmk43kvZzns7vnu5/lkI3np7DvvIzmr5TlpoJXZWliby9XZWl4aW4vdW5rbm93buetiVxuICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gaXNXZWlibyAtIOaYr+WQpuaYr+W+ruWNmlxuICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gaXNXZWl4aW4gLSDmmK/lkKbmmK/lvq7kv6FcbiAgICAgKi9cbiAgICB0aGlyZGFwcCA9IHtcbiAgICAgICAgYXBwbmFtZTogJ1dlaWJvJyxcbiAgICAgICAgaXNXZWlibzogdHJ1ZVxuICAgIH07XG59IGVsc2UgaWYgKHVhLm1hdGNoKC9NaWNyb01lc3Nlbmdlci9pKSkge1xuICAgIHRoaXJkYXBwID0ge1xuICAgICAgICBhcHBuYW1lOiAnV2VpeGluJyxcbiAgICAgICAgaXNXZWl4aW46IHRydWVcbiAgICB9O1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG59IGVsc2Uge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICB0aGlyZGFwcCA9IGZhbHNlO1xuICAgIH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gdGhpcmRhcHA7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjAuMEBhbWZlLWVudi9zcmMvdGhpcmRhcHAuanNcbi8vIG1vZHVsZSBpZCA9IDEyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xudmFyIHBhcmFtcyA9IHt9O1xudmFyIHNlYXJjaCA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gucmVwbGFjZSgvXlxcPy8sICcnKTtcblxuaWYgKHNlYXJjaCkge1xuICAgIHZhciBzcGxpdHMgPSBzZWFyY2guc3BsaXQoJyYnKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNwbGl0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBzcGxpdHNbaV0gPSBzcGxpdHNbaV0uc3BsaXQoJz0nKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHBhcmFtc1tzcGxpdHNbaV1bMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KHNwbGl0c1tpXVsxXSk7XG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICAgICAgcGFyYW1zW3NwbGl0c1tpXVswXV0gPSBzcGxpdHNbaV1bMV07XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHBhcmFtcztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuMC4wQGFtZmUtZW52L3NyYy9wYXJhbXMuanNcbi8vIG1vZHVsZSBpZCA9IDEyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvaW5kZXguanMhLi9zdGFnZS5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjEzLjFAc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0YWdlLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vc3RhZ2UuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zdGFnZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDEyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiI3N0YWdlIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiAwO1xcbiAgICB0b3A6IDA7XFxuICAgIC13ZWJraXQtdHJhbmZvcm06IHRyYW5zbGF0ZVooOXB4KTtcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjI1LjBAY3NzLWxvYWRlciEuL3NyYy9zdGFnZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDEzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQge1xuICAgIHdpbixcbiAgICBkb2MsXG4gICAgUHJvbWlzZSxcbiAgICBkZWZlcixcbiAgICBsb2FkSW1nLFxuICAgIHF1ZXJ5LFxuICAgIHF1ZXJ5QWxsLFxuICAgIGdldFJlY3Rcbn0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGNsYXNzIENhbnZhc0ltYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihjYW52YXMsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgaWYgKCEoY2FudmFzIGluc3RhbmNlb2YgSFRNTENhbnZhc0VsZW1lbnQpKSB7XG4gICAgICAgICAgICBoZWlnaHQgPSB3aWR0aDtcbiAgICAgICAgICAgIHdpZHRoID0gY2FudmFzO1xuICAgICAgICAgICAgY2FudmFzID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzIHx8IGRvYy5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLnJlbmRlciA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIHRoaXMuX2ltYWdlO1xuICAgIH1cblxuICAgIGdldCBpbWFnZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pbWFnZSkge1xuICAgICAgICAgICAgdGhpcy5faW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlLnNyYyA9IHRoaXMuY2FudmFzLnRvRGF0YVVSTCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9pbWFnZTtcbiAgICB9XG5cbiAgICBkcmF3KHBhcmFtcykge1xuICAgICAgICBjb25zdCBsb2FkZWQgPSBwYXJhbXMubWFwKHBhcmFtID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRlZmVycmVkID0gZGVmZXIoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHBhcmFtLmltZykge1xuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocGFyYW0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbS5zcmMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBbaW1nLCBwcm9taXNlXSA9IGxvYWRJbWcocGFyYW0uc3JjKTtcbiAgICAgICAgICAgICAgICBwYXJhbS5pbWcgPSBpbWc7XG4gICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKCgpID0+IGRlZmVycmVkLnJlc29sdmUocGFyYW0pKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShwYXJhbSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwobG9hZGVkKVxuICAgICAgICAgICAgLnRoZW4ocGFyYW1zID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlci5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuXG4gICAgICAgICAgICAgICAgcGFyYW1zLmZvckVhY2gocGFyYW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhcmdzID0gW3BhcmFtLmltZ107XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtLnN4ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwYXJhbS5zeCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtLnN4ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwYXJhbS5zeSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtLnN3ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwYXJhbS5zdyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtLnNoICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwYXJhbS5zaCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocGFyYW0ueCwgcGFyYW0ueSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtLndpZHRoICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwYXJhbS53aWR0aCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtLmhlaWdodCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2gocGFyYW0uaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXIuZHJhd0ltYWdlKC4uLmFyZ3MpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7IFxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIENhbnZhc1JlbmRlciB7XG4gICAgY29uc3RydWN0b3IoY2FudmFzLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSBuZXcgQ2FudmFzSW1hZ2UoY2FudmFzLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5fb2Zmc2NyZWVuID0gbmV3IENhbnZhc0ltYWdlKHdpZHRoLCBoZWlnaHQpOyBcbiAgICB9XG5cbiAgICBnZXQgY2FudmFzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlzaWJsZS5jYW52YXM7XG4gICAgfVxuXG4gICAgZ2V0IHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Zpc2libGUucmVuZGVyO1xuICAgIH1cblxuICAgIGdldCBpbWFnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Zpc2libGUuaW1hZ2U7XG4gICAgfVxuXG4gICAgZ2V0IG9mZnNjcmVlbkNhbnZhcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29mZnNjcmVlbi5jYW52YXM7XG4gICAgfVxuXG4gICAgZ2V0IG9mZnNjcmVlblJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29mZnNjcmVlbi5yZW5kZXI7XG4gICAgfVxuXG4gICAgZ2V0IG9mZnNjcmVlbkltYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb2Zmc2NyZWVuLmltYWdlO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2FudmFzLmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfaXNJdGVyYWJsZTIgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9pcy1pdGVyYWJsZVwiKTtcblxudmFyIF9pc0l0ZXJhYmxlMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzSXRlcmFibGUyKTtcblxudmFyIF9nZXRJdGVyYXRvcjIgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9nZXQtaXRlcmF0b3JcIik7XG5cbnZhciBfZ2V0SXRlcmF0b3IzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0SXRlcmF0b3IyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkge1xuICAgIHZhciBfYXJyID0gW107XG4gICAgdmFyIF9uID0gdHJ1ZTtcbiAgICB2YXIgX2QgPSBmYWxzZTtcbiAgICB2YXIgX2UgPSB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgX2kgPSAoMCwgX2dldEl0ZXJhdG9yMy5kZWZhdWx0KShhcnIpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kID0gdHJ1ZTtcbiAgICAgIF9lID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gX2FycjtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgICAgcmV0dXJuIGFycjtcbiAgICB9IGVsc2UgaWYgKCgwLCBfaXNJdGVyYWJsZTMuZGVmYXVsdCkoT2JqZWN0KGFycikpKSB7XG4gICAgICByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbiAgICB9XG4gIH07XG59KCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9oZWxwZXJzL3NsaWNlZFRvQXJyYXkuanNcbi8vIG1vZHVsZSBpZCA9IDEzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9pcy1pdGVyYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gMTMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwicmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb3JlLmlzLWl0ZXJhYmxlJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vaXMtaXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDEzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBjbGFzc29mICAgPSByZXF1aXJlKCcuL19jbGFzc29mJylcbiAgLCBJVEVSQVRPUiAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuaXNJdGVyYWJsZSA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIE8gPSBPYmplY3QoaXQpO1xuICByZXR1cm4gT1tJVEVSQVRPUl0gIT09IHVuZGVmaW5lZFxuICAgIHx8ICdAQGl0ZXJhdG9yJyBpbiBPXG4gICAgfHwgSXRlcmF0b3JzLmhhc093blByb3BlcnR5KGNsYXNzb2YoTykpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDEzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3JcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGdldCAgICAgID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmdldEl0ZXJhdG9yID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgaXRlckZuID0gZ2V0KGl0KTtcbiAgaWYodHlwZW9mIGl0ZXJGbiAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICByZXR1cm4gYW5PYmplY3QoaXRlckZuLmNhbGwoaXQpKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMTM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiZXhwb3J0IGRlZmF1bHQge1xuICAgICdUWVBFJzoge1xuICAgICAgICAnc2luZ2xlJzogMSxcbiAgICAgICAgJ3N0YXRpYyc6IDIsXG4gICAgICAgICdkeW5hbWljJzogM1xuICAgIH0swqBcbiAgICAnMTAnOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnNTAwMOWFieW5tCcsXG4gICAgICAgIHR5cGU6IDJcbiAgICB9LFxuICAgICcxMyc6IHtcbiAgICAgICAgdHlwZTogMlxuICAgIH0sXG4gICAgJzE1Jzoge1xuICAgICAgICB0eXBlOiAxXG4gICAgfSxcbiAgICAnMTknOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnNDUw5YWJ5bm0JyxcbiAgICAgICAgdHlwZTogMlxuICAgIH0sXG4gICAgJzIxJzoge1xuICAgICAgICB5MTogMTMzNCxcbiAgICAgICAgeTI6IDAsXG4gICAgICAgIHR5cGU6IDMsXG4gICAgICAgIGNvaW5YOiAzODAsXG4gICAgICAgIGNvaW5ZOiAyMjBcbiAgICB9LFxuICAgICcyMyc6IHtcbiAgICAgICAgZGlzdGFuY2U6ICcxNDAw5YWJ5bm0JyxcbiAgICAgICAgeTE6IDEzMzQsXG4gICAgICAgIHkyOiAwLFxuICAgICAgICB0eXBlOiAzLFxuICAgICAgICBjb2luWDogMzgwLFxuICAgICAgICBjb2luWTogMjIwXG4gICAgfSxcbiAgICAnMjUnOiB7XG4gICAgICAgIHR5cGU6IDJcbiAgICB9LFxuICAgICcyOCc6IHtcbiAgICAgICAgZGlzdGFuY2U6ICc5ODDlhYnlubQnLFxuICAgICAgICB5MTogMTMzNCxcbiAgICAgICAgeTI6IDAsXG4gICAgICAgIHR5cGU6IDMsXG4gICAgICAgIGNvaW5YOiAzODAsXG4gICAgICAgIGNvaW5ZOiAyMjBcbiAgICB9LFxuICAgICczMSc6IHtcbiAgICAgICAgeTE6IDEzMzQsXG4gICAgICAgIHkyOiAwLFxuICAgICAgICB0eXBlOiAzLFxuICAgICAgICBjb2luWDogMzgwLFxuICAgICAgICBjb2luWTogMjIwXG4gICAgfSxcbiAgICAnMzMnOiB7XG4gICAgICAgIHkxOiAxMzM0LFxuICAgICAgICB5MjogMCxcbiAgICAgICAgdHlwZTogMyxcbiAgICAgICAgY29pblg6IDM4MCxcbiAgICAgICAgY29pblk6IDIyMFxuICAgIH0sXG4gICAgJzM4Jzoge1xuICAgICAgICBkaXN0YW5jZTogJzQwMDDlhYnlubQnLFxuICAgICAgICB0eXBlOiAyXG4gICAgfSxcbiAgICAnNDEnOiB7XG4gICAgICAgIHkxOiAxMzM0LFxuICAgICAgICB5MjogMCxcbiAgICAgICAgdHlwZTogMyxcbiAgICAgICAgY29pblg6IDM4MCxcbiAgICAgICAgY29pblk6IDIyMFxuICAgIH0sXG4gICAgJzQzJzoge1xuICAgICAgICBkaXN0YW5jZTogJzQwMOWFieW5tCcsXG4gICAgICAgIHkxOiAxMzM0LFxuICAgICAgICB5MjogMCxcbiAgICAgICAgdHlwZTogMyxcbiAgICAgICAgY29pblg6IDM4MCxcbiAgICAgICAgY29pblk6IDIyMFxuICAgIH0sXG4gICAgJzQ2Jzoge1xuICAgICAgICBkaXN0YW5jZTogJzguNuWFieW5tCcsXG4gICAgICAgIHkxOiAxMzM0LFxuICAgICAgICB5MjogMCxcbiAgICAgICAgdHlwZTogMyxcbiAgICAgICAgY29pblg6IDM4MCxcbiAgICAgICAgY29pblk6IDIyMFxuICAgIH0sXG4gICAgJzQ3Jzoge1xuICAgICAgICB0eXBlOiAxXG4gICAgfSxcbiAgICAnNDknOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnMjUuMDTlhYnlubQnLFxuICAgICAgICB0eXBlOiAyXG4gICAgfSxcbiAgICAnNTYnOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnNC4yMuWFieW5tCcsXG4gICAgICAgIHR5cGU6IDJcbiAgICB9LFxuICAgICc1OSc6IHtcbiAgICAgICAgZGlzdGFuY2U6ICcxNi435YWJ5bm0JyxcbiAgICAgICAgdHlwZTogMlxuICAgIH0sXG4gICAgJzYxJzoge1xuICAgICAgICBkaXN0YW5jZTogJzIwLjTlhYnlubQnLFxuICAgICAgICB0eXBlOiAyXG4gICAgfSxcbiAgICAnNjQnOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnMTA3LjcxMuS6v+WFrOmHjCcsXG4gICAgICAgIHR5cGU6IDJcbiAgICB9LFxuICAgICc2Nic6IHtcbiAgICAgICAgdHlwZTogMlxuICAgIH0sXG4gICAgJzY5Jzoge1xuICAgICAgICBkaXN0YW5jZTogJzEwMS43Mjjkur/lhazph4wnLFxuICAgICAgICB5MTogMTMzNCxcbiAgICAgICAgeTI6IDAsXG4gICAgICAgIHR5cGU6IDMsXG4gICAgICAgIGNvaW5YOiAzODAsXG4gICAgICAgIGNvaW5ZOiAyMjBcbiAgICB9LFxuICAgICc3NCc6IHtcbiAgICAgICAgZGlzdGFuY2U6ICc1OeS6v+WFrOmHjCcsXG4gICAgICAgIHkxOiAxMzM0LFxuICAgICAgICB5MjogMCxcbiAgICAgICAgdHlwZTogMyxcbiAgICAgICAgY29pblg6IDM4MCxcbiAgICAgICAgY29pblk6IDIyMFxuICAgIH0sXG4gICAgJzc2Jzoge1xuICAgICAgICB5MTogMTMzNCxcbiAgICAgICAgeTI6IDAsXG4gICAgICAgIHR5cGU6IDMsXG4gICAgICAgIGNvaW5YOiAzODAsXG4gICAgICAgIGNvaW5ZOiAyMjBcbiAgICB9LFxuICAgICc3Nyc6IHtcbiAgICAgICAgdHlwZTogMVxuICAgIH0sXG4gICAgJzc5Jzoge1xuICAgICAgICBkaXN0YW5jZTogJzQzLjXkur/lhazph4wnLFxuICAgICAgICB0eXBlOiAyXG4gICAgfSxcbiAgICAnODInOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnMjcuMTnkur/lhazph4wnLFxuICAgICAgICB5MTogMTMzNCxcbiAgICAgICAgeTI6IDAsXG4gICAgICAgIHR5cGU6IDMsXG4gICAgICAgIGNvaW5YOiAzODAsXG4gICAgICAgIGNvaW5ZOiAyMjBcbiAgICB9LFxuICAgICc4NCc6IHtcbiAgICAgICAgeTE6IDEzMzQsXG4gICAgICAgIHkyOiAwLFxuICAgICAgICB0eXBlOiAzLFxuICAgICAgICBjb2luWDogMzgwLFxuICAgICAgICBjb2luWTogMjIwXG4gICAgfSxcbiAgICAnODcnOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnMTIuOOS6v+WFrOmHjCcsXG4gICAgICAgIHkxOiAxMzM0LFxuICAgICAgICB5MjogMCxcbiAgICAgICAgdHlwZTogMyxcbiAgICAgICAgY29pblg6IDM4MCxcbiAgICAgICAgY29pblk6IDIyMFxuICAgIH0sXG4gICAgJzk0Jzoge1xuICAgICAgICBkaXN0YW5jZTogJzEuNDk25Lq/5YWs6YeMJyxcbiAgICAgICAgeTE6IDEzMzQsXG4gICAgICAgIHkyOiAwLFxuICAgICAgICB0eXBlOiAzLFxuICAgICAgICBjb2luWDogMzgwLFxuICAgICAgICBjb2luWTogMjIwXG4gICAgfSxcbiAgICAnOTYnOiB7XG4gICAgICAgIHR5cGU6IDFcbiAgICB9LFxuICAgICc5Nyc6IHtcbiAgICAgICAgdHlwZTogMVxuICAgIH0sXG4gICAgJzEwMSc6IHtcbiAgICAgICAgdHlwZTogMlxuICAgIH0sXG4gICAgJzEwMic6IHtcbiAgICAgICAgZGlzdGFuY2U6ICcwLjky5Lq/5YWs6YeMJyxcbiAgICAgICAgdHlwZTogMlxuICAgIH0sXG4gICAgJzEwNSc6IHtcbiAgICAgICAgZGlzdGFuY2U6ICc2LjPkur/lhazph4wnLFxuICAgICAgICB5MTogMTMzNCxcbiAgICAgICAgeTI6IDAsXG4gICAgICAgIHR5cGU6IDMsXG4gICAgICAgIGNvaW5YOiAzODAsXG4gICAgICAgIGNvaW5ZOiAyMjBcbiAgICB9LFxuICAgICcxMDknOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnNTUwMOS4h+WFrOmHjCcsXG4gICAgICAgIHkxOiAxMzM0LFxuICAgICAgICB5MjogMCxcbiAgICAgICAgdHlwZTogMyxcbiAgICAgICAgY29pblg6IDM4MCxcbiAgICAgICAgY29pblk6IDIyMFxuICAgIH0sXG4gICAgJzExMic6IHtcbiAgICAgICAgZGlzdGFuY2U6ICc0MTUw5LiH5YWs6YeMJyxcbiAgICAgICAgeTE6IDEzMzQsXG4gICAgICAgIHkyOiAwLFxuICAgICAgICB0eXBlOiAzLFxuICAgICAgICBjb2luWDogMzgwLFxuICAgICAgICBjb2luWTogMjIwXG4gICAgfSxcbiAgICAnMTE0Jzoge1xuICAgICAgICB0eXBlOiAyXG4gICAgfSxcbiAgICAnMTE1Jzoge1xuICAgICAgICB0eXBlOiAxXG4gICAgfSxcbiAgICAnMTIwJzoge1xuICAgICAgICB0eXBlOiAxLFxuICAgICAgICBpc0VhcnRoOiB0cnVlXG4gICAgfSxcbiAgICAnMTE5Jzoge1xuICAgICAgICB0eXBlOiAxXG4gICAgfSxcbiAgICAnMTIxJzoge1xuICAgICAgICBkaXN0YW5jZTogJzDlhazph4wnLFxuICAgICAgICB5MTogMTMzNCxcbiAgICAgICAgeTI6IDAsXG4gICAgICAgIHR5cGU6IDMsXG4gICAgICAgIGNvaW5YOiAzODAsXG4gICAgICAgIGNvaW5ZOiAyMjAsXG4gICAgICAgIGlzRWFydGg6IHRydWVcbiAgICB9LFxuICAgICcxMjInOiB7XG4gICAgICAgIHR5cGU6IDEsXG4gICAgICAgIGlzRWFydGg6IHRydWVcbiAgICB9LFxuICAgICcxMjMnOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnMzguNDTkuIflhazph4wnLFxuICAgICAgICB5MTogMTMzNCxcbiAgICAgICAgeTI6IDAsXG4gICAgICAgIHR5cGU6IDMsXG4gICAgICAgIGNvaW5YOiAzODAsXG4gICAgICAgIGNvaW5ZOiAyMjBcbiAgICB9LFxuICAgICcxMjQnOiB7XG4gICAgICAgIHR5cGU6IDJcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NsaWNlQ29uZmlnLmpzIiwiaW1wb3J0ICcuL2hlbGxvd29ybGQuY3NzJztcbmltcG9ydCB7XG4gICAgd2luLFxuICAgIGRvYyxcbiAgICBQcm9taXNlLFxuICAgIGRlZmVyLFxuICAgIGRlbGF5LFxuICAgIHF1ZXJ5LFxuICAgIHF1ZXJ5QWxsLFxuICAgIGdldFJlY3Rcbn0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVsbG9Xb3JsZCB7XG4gICAgY29uc3RydWN0b3Iodmlld3BvcnQsIGl0ZW1zKSB7XG4gICAgICAgIHRoaXMud3JhcEVsID0gcXVlcnkodmlld3BvcnQsICcjaGVsbG93b3JsZCcpO1xuICAgICAgICB0aGlzLnRleHRFbCA9IHF1ZXJ5KHRoaXMud3JhcEVsLCAnLmhlbGxvd29ybGQnKTtcbiAgICAgICAgdGhpcy5zdGFydEVsID0gcXVlcnkodGhpcy53cmFwRWwsICcuc3RhcnQnKTtcbiAgICAgICAgLy8gdGhpcy50ZXh0RWwuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke2l0ZW1zWydoZWxsb3dvcmxkJ10uc3JjfSlgO1xuICAgIH1cblxuICAgIHBsYXkoKSB7XG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gNDAwO1xuICAgICAgICBjb25zdCBjb3VudCA9IDY7XG5cbiAgICAgICAgcmV0dXJuICh7XG4gICAgICAgICAgICBlbGFwc2VkLFxuICAgICAgICAgICAgZGVsdGFcbiAgICAgICAgfSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVsYXBzZWQgPD0gZHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHBhcnNlSW50KGNvdW50ICogZWxhcHNlZCAvIGR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRFbC5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb25YID0gYC0ke2luZGV4ICogMTB9cmVtYDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0RWwuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uWCA9ICcwJztcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzdGFydChvbmNsaWNrKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0RWwuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgICAgdGhpcy5zdGFydEVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RhcCcsIGUgPT4ge1xuICAgICAgICAgICAgICAgIG9uY2xpY2sgJiYgb25jbGljaygpO1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcEVsLmNsYXNzTmFtZSArPSAnIGZhZGVvdXQnO1xuICAgICAgICAgICAgICAgIGRlbGF5KDY1MClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy53cmFwRWwuc3R5bGUuZGlzcGxheSA9ICdub25lJylcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzb2x2ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVhZHkoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLndyYXBFbC5zdHlsZS5kaXNwbGF5ID0gJyc7XG5cbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9oZWxsb1dvcmxkLmpzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL2hlbGxvd29ybGQuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLy4uL25vZGVfbW9kdWxlcy8uMC4xMy4xQHN0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvaW5kZXguanMhLi9oZWxsb3dvcmxkLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vaGVsbG93b3JsZC5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2hlbGxvd29ybGQuY3NzXG4vLyBtb2R1bGUgaWQgPSAxNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIiNoZWxsb3dvcmxkIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgbGVmdDogMDtcXG4gICAgdG9wOiAwO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIC13ZWJraXQtdHJhbmZvcm06IHRyYW5zbGF0ZVooOTk5OXB4KTtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjtcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiBvcGFjaXR5IDAuNnMgZWFzZS1vdXQgMHM7XFxufVxcblxcbiNoZWxsb3dvcmxkIC5oZWxsb3dvcmxkIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCBjZW50ZXI7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogNjByZW0gMTcuNzg2cmVtO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbn1cXG5cXG4jaGVsbG93b3JsZC5mYWRlb3V0IHtcXG4gICAgb3BhY2l0eTogMDtcXG59XFxuXFxuI2hlbGxvd29ybGQgLnN0YXJ0IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgbGVmdDogMDtcXG4gICAgYm90dG9tOiAzcmVtO1xcbiAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gICAgLXdlYmtpdC1ib3gtcGFjazogY2VudGVyO1xcbiAgICAtd2Via2l0LWJveC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4jaGVsbG93b3JsZCAuc3RhcnQgLmFycm93LWxlZnQsXFxuICAgICNoZWxsb3dvcmxkIC5zdGFydCAuYXJyb3ctcmlnaHQge1xcbiAgICB3aWR0aDogMC41MzMzcmVtO1xcbiAgICBoZWlnaHQ6IDAuMjY2N3JlbTtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxLjA2NjdyZW0gMC4yNjY3cmVtO1xcbn1cXG5cXG4jaGVsbG93b3JsZCAuc3RhcnQgLmFycm93LWxlZnQge1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAxNTAlIGNlbnRlcjtcXG4gICAgLXdlYmtpdC1hbmltYXRpb246IG1vdmVsZWZ0IDAuNnMgbGluZWFyIDBzIGluZmluaXRlO1xcbn1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgbW92ZWxlZnQge1xcbiAgICAwJSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAxNTAlIGNlbnRlcjtcXG4gICAgfVxcblxcbiAgICA0OS45OTklIHtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDE1MCUgY2VudGVyO1xcbiAgICB9XFxuICAgIDUwJSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIGNlbnRlcjtcXG4gICAgfVxcblxcbiAgICA5OS45OTklIHtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgY2VudGVyO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMTUwJSBjZW50ZXI7XFxuICAgIH1cXG59XFxuXFxuI2hlbGxvd29ybGQgLnN0YXJ0IC5hcnJvdy1yaWdodCB7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDUwJSBjZW50ZXI7XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBtb3ZlcmlnaHQgMC42cyBsaW5lYXIgMHMgaW5maW5pdGU7XFxufVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBtb3ZlcmlnaHQge1xcbiAgICAwJSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiA1MCUgY2VudGVyO1xcbiAgICB9XFxuXFxuICAgIDQ5Ljk5OSUge1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogNTAlIGNlbnRlcjtcXG4gICAgfVxcbiAgICA1MCUge1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMTAwJSBjZW50ZXI7XFxuICAgIH1cXG5cXG4gICAgOTkuOTk5JSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAxMDAlIGNlbnRlcjtcXG4gICAgfVxcbiAgICAxMDAlIHtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDUwJSBjZW50ZXI7XFxuICAgIH1cXG59XFxuXFxuI2hlbGxvd29ybGQgLnN0YXJ0IC50ZXh0IHtcXG4gICAgbWFyZ2luOiAwIDAuMnJlbTtcXG4gICAgZm9udC1zaXplOiAxMnB4O1xcbiAgICBjb2xvcjogIzAwY2JlMztcXG4gICAgdGV4dC1zaGFkb3c6XFxuICAgICAgICAxcHggMCAxcHggcmdiYSgwLCAyMDMsIDIyNywgMC4zKSxcXG4gICAgICAgIDAgMXB4IDFweCByZ2JhKDAsIDIwMywgMjI3LCAwLjMpLCBcXG4gICAgICAgIDAgLTFweCAxcHggcmdiYSgwLCAyMDMsIDIyNywgMC4zKSxcXG4gICAgICAgIC0xcHggMCAxcHggcmdiYSgwLCAyMDMsIDIyNywgMC4zKTtcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjI1LjBAY3NzLWxvYWRlciEuL3NyYy9oZWxsb3dvcmxkLmNzc1xuLy8gbW9kdWxlIGlkID0gMTQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7XG4gICAgd2luLFxuICAgIGRvYyxcbiAgICBQcm9taXNlLFxuICAgIGRlZmVyLFxuICAgIHF1ZXJ5LFxuICAgIHF1ZXJ5QWxsLFxuICAgIGdldFJlY3Rcbn0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7XG4gICAgQ2FudmFzSW1hZ2Vcbn0gZnJvbSAnLi9jYW52YXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFyIGV4dGVuZHMgQ2FudmFzSW1hZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHN0YWdlLCBpdGVtcykge1xuICAgICAgICBzdXBlcihzdGFnZS52dywgc3RhZ2UudmggKiAyKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMud2lkdGggPSBzdGFnZS52dztcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBzdGFnZS52aCAqIDI7XG4gICAgICAgIHRoaXMudncgPSBzdGFnZS52dztcbiAgICAgICAgdGhpcy52aCA9IHN0YWdlLnZoO1xuICAgICAgICB0aGlzLml0ZW1zID0gaXRlbXM7XG4gICAgfVxuXG4gICAgcmVhZHkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRyYXcoW3tcbiAgICAgICAgICAgIGltZzogdGhpcy5pdGVtc1snc3RhciddLm9iaixcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMudmhcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW1nOiB0aGlzLml0ZW1zWydzdGFyJ10ub2JqLFxuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IHRoaXMudmgsXG4gICAgICAgICAgICB3aWR0aDogdGhpcy53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy52aFxuICAgICAgICB9XSk7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zdGFyLmpzIiwiaW1wb3J0ICogYXMgQmV6aWVyIGZyb20gJ2FtZmUtY3ViaWNiZXppZXInO1xuaW1wb3J0IHtcbiAgICB3aW4sXG4gICAgZG9jLFxuICAgIFByb21pc2UsXG4gICAgZGVmZXIsXG4gICAgZGVsYXksXG4gICAgcXVlcnksXG4gICAgcXVlcnlBbGwsXG4gICAgZ2V0UmVjdCxcbiAgICBnZXREaXN0YW5jZSxcbiAgICBhcHBlbmRTdHlsZSxcbiAgICByYWYsXG4gICAgY2FmXG59IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgRXZlbnQgZnJvbSAnLi9ldmVudCc7XG5pbXBvcnQge1xuICAgIENhbnZhc0ltYWdlXG59IGZyb20gJy4vY2FudmFzJztcblxuY29uc3Qgb3JpZ2luU2xpY2VXaWR0aCA9IDc1MDtcbmNvbnN0IG9yaWdpblNsaWNlSGVpZ2h0ID0gMTMzNFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbGVtZW50cyBleHRlbmRzIENhbnZhc0ltYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihzdGFnZSwgaXRlbXMpIHtcbiAgICAgICAgc3VwZXIoc3RhZ2UudncsIHN0YWdlLnZoKTtcblxuICAgICAgICB0aGlzLmhTbGljZSA9IHN0YWdlLmhTbGljZTtcbiAgICAgICAgdGhpcy52U2xpY2UgPSBzdGFnZS52U2xpY2U7XG4gICAgICAgIHRoaXMuc2xpY2VXaWR0aCA9IHN0YWdlLnNsaWNlV2lkdGg7XG4gICAgICAgIHRoaXMuc2xpY2VIZWlnaHQgPSBzdGFnZS5zbGljZUhlaWdodDtcbiAgICAgICAgdGhpcy5pdGVtcyA9IGl0ZW1zO1xuICAgICAgICB0aGlzLnNjYWxlUmF0aW8gPSB0aGlzLnNsaWNlV2lkdGggLyBvcmlnaW5TbGljZVdpZHRoO1xuICAgIH1cblxuICAgIHNob3dUZXh0KGZvY3VzKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIHNob3duLFxuICAgICAgICAgICAgaW5kZXhcbiAgICAgICAgfSA9IGZvY3VzO1xuXG4gICAgICAgIGNvbnN0IHNsaWNlID0gdGhpcy5zbGljZXNbU3RyaW5nKGluZGV4KV07XG4gICAgICAgIGlmIChzbGljZSkge1xuICAgICAgICAgICAgaWYgKHNob3duID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkZWxheSA9IDc1MDtcbiAgICAgICAgICAgICAgICBjb25zdCBkdXJhdGlvbiA9IDUwMDtcblxuICAgICAgICAgICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgICAgICAgICBkZWx0YSxcbiAgICAgICAgICAgICAgICAgICAgZWxhcHNlZFxuICAgICAgICAgICAgICAgIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsYXBzZWQgPD0gZGVsYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNlLnRleHRBbHBoYSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1cy5zaG93biA9IDE7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxhcHNlZCAtIGRlbGF5IDw9IGR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGljZS50ZXh0QWxwaGEgPSAoZWxhcHNlZCAtIGRlbGF5KSAvIGR1cmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXMuc2hvd24gPSAxO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2UudGV4dEFscGhhID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzLnNob3duID0gMjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmb2N1cy5zaG93biA9PT0gMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93R29sZChmb2N1cykge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBmb3VuZCxcbiAgICAgICAgICAgIGluZGV4LFxuICAgICAgICAgICAgeTEsXG4gICAgICAgICAgICB5MlxuICAgICAgICB9ID0gZm9jdXM7XG5cbiAgICAgICAgY29uc3Qgc2xpY2UgPSB0aGlzLnNsaWNlc1tTdHJpbmcoaW5kZXgpXTtcbiAgICAgICAgaWYgKHNsaWNlKSB7XG4gICAgICAgICAgICBpZiAoZm91bmQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGR1cmF0aW9uID0gMTAwMDtcblxuICAgICAgICAgICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgICAgICAgICBkZWx0YSxcbiAgICAgICAgICAgICAgICAgICAgZWxhcHNlZFxuICAgICAgICAgICAgICAgIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsYXBzZWQgPD0gZHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNlLmdvbGRZID0geTEgKyAoeTIgLSB5MSkgKiBlbGFwc2VkIC8gZHVyYXRpb247XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1cy5mb3VuZCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGljZS5nb2xkWSA9IHkyO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXMuZm91bmQgPSAyO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvY3VzLmZvdW5kID09PSAyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZseUNvaW4oZm9jdXMpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgbm9Db2luLFxuICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICBjb2luWCxcbiAgICAgICAgICAgIGNvaW5ZXG4gICAgICAgIH0gPSBmb2N1cztcblxuICAgICAgICBjb25zdCBzbGljZSA9IHRoaXMuc2xpY2VzW1N0cmluZyhpbmRleCldO1xuICAgICAgICBpZiAoc2xpY2UpIHtcbiAgICAgICAgICAgIGlmICghbm9Db2luKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29pbiA9IHNsaWNlLmNvaW47XG4gICAgICAgICAgICAgICAgY29uc3QgZHVyYXRpb24gPSA1MDA7XG4gICAgICAgICAgICAgICAgY29uc3QgZW5kWCA9IDY1MDtcbiAgICAgICAgICAgICAgICBjb25zdCBlbmRZID0gNTA7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKHtcbiAgICAgICAgICAgICAgICAgICAgZGVsdGEsXG4gICAgICAgICAgICAgICAgICAgIGVsYXBzZWRcbiAgICAgICAgICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGFwc2VkIDw9IGR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwZXJjZW50ID0gZWxhcHNlZCAvIGR1cmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29pbi54ID0gY29pblggKyAoZW5kWCAtIGNvaW5YKSAqIHBlcmNlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2luLnkgPSBjb2luWSArIChlbmRZIC0gY29pblkpICogcGVyY2VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvaW4uc2NhbGUgKz0gZGVsdGEgLyBkdXJhdGlvbiAqIDU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2luLnNsb3cgLT0gZGVsdGEgLyBkdXJhdGlvbiAqIDU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2luLnggPSBlbmRYO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29pbi55ID0gZW5kWTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzLm5vQ29pbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm9jdXMubm9Db2luO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBkcmF3SW1hZ2VzKGhvdmVycywgZm9jdXMsIHNjcm9sbFgsIHNjcm9sbFksIGUpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gW107XG4gICAgICAgIGlmIChob3ZlcnMpIHtcbiAgICAgICAgICAgZm9yIChjb25zdCBob3ZlciBvZiBob3ZlcnMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgICAgICAgIGluZGV4LFxuICAgICAgICAgICAgICAgICAgICB5MSxcbiAgICAgICAgICAgICAgICAgICAgeTIsXG4gICAgICAgICAgICAgICAgICAgIGNvaW5YLFxuICAgICAgICAgICAgICAgICAgICBjb2luWSxcbiAgICAgICAgICAgICAgICAgICAgbm9Db2luLFxuICAgICAgICAgICAgICAgICAgICBpc0VhcnRoXG4gICAgICAgICAgICAgICAgfSA9IGhvdmVyO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgc2xpY2UgPSB0aGlzLnNsaWNlc1tTdHJpbmcoaW5kZXgpXTtcbiAgICAgICAgICAgICAgICBpZiAoc2xpY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgICAgICAgICAgeCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHksXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbnZhc0ltYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljSW1nLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEltZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHRBbHBoYSA9IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBnb2xkSW1nLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29pbixcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsb3dcbiAgICAgICAgICAgICAgICAgICAgfSA9IHNsaWNlO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBvZmZzZXRZID0gMDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzRWFydGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldFkgPSBmbG93LnJhbmdlWzBdICsgKGZsb3cucmFuZ2VbMV0gLSBmbG93LnJhbmdlWzBdKSAqIGZsb3cuZWFzZShmbG93LmVsYXBzZWQgLyBmbG93LmR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmbG93LmVsYXBzZWQgPiBmbG93LmR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WSA9IGZsb3cucmFuZ2VbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxvdy5yYW5nZSA9IFtmbG93LnJhbmdlWzFdLCBmbG93LnJhbmdlWzBdXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbG93LmVhc2UgPSBmbG93LmVhc2UgPT09IEJlemllci5lYXNlSW4gPyBCZXppZXIuZWFzZU91dCA6IEJlemllci5lYXNlSW47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxvdy5lbGFwc2VkID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxvdy5lbGFwc2VkICs9IGUuZGVsdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYW52YXNJbWFnZS5yZW5kZXIuY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID49IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbnZhc0ltYWdlLnJlbmRlci5kcmF3SW1hZ2Uoc3RhdGljSW1nLCAwLCAwICsgb2Zmc2V0WSwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA+PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYW52YXNJbWFnZS5yZW5kZXIuc2F2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzSW1hZ2UucmVuZGVyLmdsb2JhbEFscGhhID0gdGV4dEFscGhhO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzSW1hZ2UucmVuZGVyLmRyYXdJbWFnZSh0ZXh0SW1nLCAwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbnZhc0ltYWdlLnJlbmRlci5yZXN0b3JlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA+PSAzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzbGljZS5nb2xkWSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZ29sZFkgPSBzbGljZS5nb2xkWTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB5ID0gZ29sZFkgKiB0aGlzLnNjYWxlUmF0aW87XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzSW1hZ2UucmVuZGVyLmRyYXdJbWFnZShnb2xkSW1nLCAwLCBnb2xkWSwgb3JpZ2luU2xpY2VXaWR0aCwgb3JpZ2luU2xpY2VIZWlnaHQgLSBnb2xkWSwgMCwgeSArIG9mZnNldFksIHdpZHRoLCBoZWlnaHQgLSB5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29pbnMubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmICFub0NvaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHggPSBjb2luWCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeSA9IGNvaW5ZXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSA9IGNvaW47XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG93ID0gc2xvdyA8IDEgPyAxIDogc2xvdztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZSA9IHNjYWxlID4gMTAgPyAxMCA6IHNjYWxlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29pbkltZyA9IHRoaXMuY29pbnNbcGFyc2VJbnQoaW5kZXggLyBzbG93KV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvaW5JbWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qge3dpZHRoLCBoZWlnaHR9ID0gY29pbkltZztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzSW1hZ2UucmVuZGVyLmRyYXdJbWFnZShjb2luSW1nLCB4ICogdGhpcy5zY2FsZVJhdGlvLCB5ICogdGhpcy5zY2FsZVJhdGlvLCB3aWR0aCAvIHNjYWxlLCBoZWlnaHQgLyBzY2FsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvaW4uaW5kZXggPSAoY29pbi5pbmRleCArIDEpICUgKHRoaXMuY29pbnMubGVuZ3RoICogc2xvdyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHggLSBzY3JvbGxYLFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogeSAtIHNjcm9sbFksXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZzogY2FudmFzSW1hZ2UuY2FudmFzXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZHJhdyhwYXJhbXMpO1xuICAgIH1cblxuICAgIHJlYWR5KCkge1xuICAgICAgICBjb25zdCBsb2FkZWQgPSBbXTtcbiAgICAgICAgdGhpcy5jb2lucyA9IFtdO1xuICAgICAgICB0aGlzLnNsaWNlcyA9IHt9O1xuXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuaXRlbXMpLmZpbHRlcihpZCA9PlxuICAgICAgICAgICAgaWQubWF0Y2goL15jb2luXFxkJC8pXG4gICAgICAgICkuZm9yRWFjaChpZCA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvaW5zLnB1c2godGhpcy5pdGVtc1tpZF0ub2JqKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5pdGVtcykuZmlsdGVyKGlkID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpZC5tYXRjaCgvXmlcXGQrXFwtZVxcLShzfHd8ZykvKTtcbiAgICAgICAgfSkuZm9yRWFjaChpZCA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5pdGVtc1tpZF07XG4gICAgICAgICAgICBjb25zdCBbLCBpbmRleCwgdHlwZV0gPSBpZC5tYXRjaCgvXmkoXFxkKylcXC1lXFwtKHN8d3xnKSQvKTtcblxuICAgICAgICAgICAgY29uc3QgeCA9IE51bWJlcihpbmRleCkgJSB0aGlzLmhTbGljZTtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBwYXJzZUludChOdW1iZXIoaW5kZXgpIC8gdGhpcy5oU2xpY2UpO1xuICAgICAgICAgICAgbGV0IHNsaWNlID0gdGhpcy5zbGljZXNbU3RyaW5nKGluZGV4KV07XG4gICAgICAgICAgICBpZiAoIXNsaWNlKSB7XG4gICAgICAgICAgICAgICAgc2xpY2UgPSB0aGlzLnNsaWNlc1tTdHJpbmcoaW5kZXgpXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgY29pbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBzbG93OiA4LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGU6IDNcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZmxvdzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDgwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsYXBzZWQ6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZTogWzAsIDEwXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVhc2U6IEJlemllci5lYXNlSW5cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzSW1hZ2U6IG5ldyBDYW52YXNJbWFnZSh0aGlzLnNsaWNlV2lkdGgsIHRoaXMuc2xpY2VIZWlnaHQpLFxuICAgICAgICAgICAgICAgICAgICB4OiB4ICogdGhpcy5zbGljZVdpZHRoLFxuICAgICAgICAgICAgICAgICAgICB5OiB5ICogdGhpcy5zbGljZUhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMuc2xpY2VXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnNsaWNlSGVpZ2h0LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdzJykge1xuICAgICAgICAgICAgICAgIHNsaWNlLnN0YXRpY0ltZyA9IGl0ZW0ub2JqO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAndycpIHtcbiAgICAgICAgICAgICAgICBzbGljZS50ZXh0SW1nID0gaXRlbS5vYmo7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdnJykge1xuICAgICAgICAgICAgICAgIHNsaWNlLmdvbGRJbWcgPSBpdGVtLm9iajtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKGxvYWRlZCk7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lbGVtZW50cy5qcyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5c1wiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gMTQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmtleXMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5rZXlzO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyAxOS4xLjIuMTQgT2JqZWN0LmtleXMoTylcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgJGtleXMgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2tleXMnLCBmdW5jdGlvbigpe1xuICByZXR1cm4gZnVuY3Rpb24ga2V5cyhpdCl7XG4gICAgcmV0dXJuICRrZXlzKHRvT2JqZWN0KGl0KSk7XG4gIH07XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gMTQ3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmdlbmVyYXRlID0gZ2VuZXJhdGU7XG5mdW5jdGlvbiBnZW5lcmF0ZShwMXgsIHAxeSwgcDJ4LCBwMnkpIHtcbiAgICB2YXIgWkVST19MSU1JVCA9IDFlLTY7XG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBwb2x5bm9taWFsIGNvZWZmaWNpZW50cyxcbiAgICAvLyBpbXBsaWNpdCBmaXJzdCBhbmQgbGFzdCBjb250cm9sIHBvaW50cyBhcmUgKDAsMCkgYW5kICgxLDEpLlxuICAgIHZhciBheCA9IDMgKiBwMXggLSAzICogcDJ4ICsgMTtcbiAgICB2YXIgYnggPSAzICogcDJ4IC0gNiAqIHAxeDtcbiAgICB2YXIgY3ggPSAzICogcDF4O1xuXG4gICAgdmFyIGF5ID0gMyAqIHAxeSAtIDMgKiBwMnkgKyAxO1xuICAgIHZhciBieSA9IDMgKiBwMnkgLSA2ICogcDF5O1xuICAgIHZhciBjeSA9IDMgKiBwMXk7XG5cbiAgICBmdW5jdGlvbiBzYW1wbGVDdXJ2ZURlcml2YXRpdmVYKHQpIHtcbiAgICAgICAgLy8gYGF4IHReMyArIGJ4IHReMiArIGN4IHQnIGV4cGFuZGVkIHVzaW5nIEhvcm5lciAncyBydWxlLlxuICAgICAgICByZXR1cm4gKDMgKiBheCAqIHQgKyAyICogYngpICogdCArIGN4O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNhbXBsZUN1cnZlWCh0KSB7XG4gICAgICAgIHJldHVybiAoKGF4ICogdCArIGJ4KSAqIHQgKyBjeCkgKiB0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNhbXBsZUN1cnZlWSh0KSB7XG4gICAgICAgIHJldHVybiAoKGF5ICogdCArIGJ5KSAqIHQgKyBjeSkgKiB0O1xuICAgIH1cblxuICAgIC8vIEdpdmVuIGFuIHggdmFsdWUsIGZpbmQgYSBwYXJhbWV0cmljIHZhbHVlIGl0IGNhbWUgZnJvbS5cbiAgICBmdW5jdGlvbiBzb2x2ZUN1cnZlWCh4KSB7XG4gICAgICAgIHZhciB0MiA9IHg7XG4gICAgICAgIHZhciBkZXJpdmF0aXZlO1xuICAgICAgICB2YXIgeDI7XG5cbiAgICAgICAgLy8gaHR0cHM6Ly90cmFjLndlYmtpdC5vcmcvYnJvd3Nlci90cnVuay9Tb3VyY2UvV2ViQ29yZS9wbGF0Zm9ybS9hbmltYXRpb25cbiAgICAgICAgLy8gRmlyc3QgdHJ5IGEgZmV3IGl0ZXJhdGlvbnMgb2YgTmV3dG9uJ3MgbWV0aG9kIC0tIG5vcm1hbGx5IHZlcnkgZmFzdC5cbiAgICAgICAgLy8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9OZXd0b24nc19tZXRob2RcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgICAgICAgIC8vIGYodCkteD0wXG4gICAgICAgICAgICB4MiA9IHNhbXBsZUN1cnZlWCh0MikgLSB4O1xuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHgyKSA8IFpFUk9fTElNSVQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZXJpdmF0aXZlID0gc2FtcGxlQ3VydmVEZXJpdmF0aXZlWCh0Mik7XG4gICAgICAgICAgICAvLyA9PSAwLCBmYWlsdXJlXG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhkZXJpdmF0aXZlKSA8IFpFUk9fTElNSVQpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHQyIC09IHgyIC8gZGVyaXZhdGl2ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZhbGwgYmFjayB0byB0aGUgYmlzZWN0aW9uIG1ldGhvZCBmb3IgcmVsaWFiaWxpdHkuXG4gICAgICAgIC8vIGJpc2VjdGlvblxuICAgICAgICAvLyBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Jpc2VjdGlvbl9tZXRob2RcbiAgICAgICAgdmFyIHQxID0gMTtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgdmFyIHQwID0gMDtcblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICB0MiA9IHg7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIHdoaWxlICh0MSA+IHQwKSB7XG4gICAgICAgICAgICB4MiA9IHNhbXBsZUN1cnZlWCh0MikgLSB4O1xuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHgyKSA8IFpFUk9fTElNSVQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoeDIgPiAwKSB7XG4gICAgICAgICAgICAgICAgdDEgPSB0MjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdDAgPSB0MjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHQyID0gKHQxICsgdDApIC8gMjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZhaWx1cmVcbiAgICAgICAgcmV0dXJuIHQyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNvbHZlKHgpIHtcbiAgICAgICAgcmV0dXJuIHNhbXBsZUN1cnZlWShzb2x2ZUN1cnZlWCh4KSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNvbHZlO1xufVxuXG52YXIgbGluZWFyID0gZXhwb3J0cy5saW5lYXIgPSBnZW5lcmF0ZSgwLCAwLCAxLCAxKTtcbnZhciBlYXNlID0gZXhwb3J0cy5lYXNlID0gZ2VuZXJhdGUoLjI1LCAuMSwgLjI1LCAxKTtcbnZhciBlYXNlSW4gPSBleHBvcnRzLmVhc2VJbiA9IGdlbmVyYXRlKC40MiwgMCwgMSwgMSk7XG52YXIgZWFzZU91dCA9IGV4cG9ydHMuZWFzZU91dCA9IGdlbmVyYXRlKDAsIDAsIC41OCwgMSk7XG52YXIgZWFzZUluT3V0ID0gZXhwb3J0cy5lYXNlSW5PdXQgPSBnZW5lcmF0ZSguNDIsIDAsIC41OCwgMSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjAuMEBhbWZlLWN1YmljYmV6aWVyL3NyYy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTQ4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAnLi9mb3VuZC5jc3MnO1xuaW1wb3J0IHtcbiAgICB3aW4sXG4gICAgZG9jLFxuICAgIFByb21pc2UsXG4gICAgZGVmZXIsXG4gICAgZGVsYXksXG4gICAgcXVlcnksXG4gICAgcXVlcnlBbGwsXG4gICAgZ2V0UmVjdCxcbiAgICBnZXREaXN0YW5jZSxcbiAgICBhcHBlbmRTdHlsZSxcbiAgICByYWYsXG4gICAgY2FmXG59IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgRXZlbnQgZnJvbSAnLi9ldmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvdW5kIGV4dGVuZHMgRXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKHZpZXdwb3J0LCBpdGVtcykge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMud3JhcEVsID0gcXVlcnkodmlld3BvcnQsICcjZm91bmQnKTtcbiAgICAgICAgdGhpcy50ZXh0RWwgPSBxdWVyeSh0aGlzLndyYXBFbCwgJy50ZXh0Jyk7XG4gICAgICAgIHRoaXMudGV4dE51bWJlckVsID0gcXVlcnkodGhpcy50ZXh0RWwsICcubnVtYmVyJyk7XG4gICAgICAgIHRoaXMudGV4dFRpcEVsID0gcXVlcnkodGhpcy50ZXh0RWwsICcudGlwJyk7XG4gICAgICAgIHRoaXMudGV4dEJnRWwgPSBxdWVyeSh0aGlzLnRleHRFbCwgJy5iZycpO1xuICAgICAgICB0aGlzLmJhckVsID0gcXVlcnkodGhpcy53cmFwRWwsICcucHJvZ3Jlc3MgLmJhcicpO1xuICAgICAgICB0aGlzLmdvbGRFbCA9IHF1ZXJ5KHRoaXMud3JhcEVsLCAnLmdvbGQnKTsgXG5cbiAgICAgICAgdGhpcy5mb3VuZCA9IDA7XG4gICAgICAgIHRoaXMuYW1vdW50ID0gMDtcbiAgICAgICAgdGhpcy50b3RhbCA9IDA7XG4gICAgICAgIHRoaXMuZm9jdXMgPSAwO1xuICAgICAgICB0aGlzLml0ZW1zID0gaXRlbXM7XG4gICAgfVxuXG4gICAgdXBkYXRlKGFtb3VudCwgZm91bmQsIHRvdGFsLCBmb2N1cykge1xuICAgICAgICBpZiAoZm91bmQgIT09IHRoaXMuZm91bmQgXG4gICAgICAgICAgICB8fCBhbW91bnQgIT09IHRoaXMuYW1vdW50XG4gICAgICAgICAgICB8fCB0b3RhbCAhPT0gdGhpcy50b3RhbFxuICAgICAgICAgICAgfHwgZm9jdXMgIT09IHRoaXMuZm9jdXMpIHtcbiAgICAgICAgICAgIHRoaXMudGV4dE51bWJlckVsLnRleHRDb250ZW50ID0gYCR7Zm91bmR9LyR7YW1vdW50fWA7XG4gICAgICAgICAgICB0aGlzLmJhckVsLnN0eWxlLndpZHRoID0gYCR7Zm91bmQvYW1vdW50KjEwMH0lYDtcblxuICAgICAgICAgICAgaWYgKGZvdW5kICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCd1cGRhdGUnLCB7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kLFxuICAgICAgICAgICAgICAgICAgICBhbW91bnQsXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsLFxuICAgICAgICAgICAgICAgICAgICBmb2N1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmZvdW5kID0gZm91bmQ7XG4gICAgICAgICAgICB0aGlzLmFtb3VudCA9IGFtb3VudDtcbiAgICAgICAgICAgIHRoaXMudG90YWwgPSB0b3RhbDtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMgPSBmb2N1cztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlYWR5KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy53cmFwRWwuc3R5bGUuZGlzcGxheSA9ICcnO1xuXG4gICAgICAgICAgICBsZXQga2V5ZnJhbWVzID0gJyc7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLml0ZW1zKS5maWx0ZXIoaWQgPT5cbiAgICAgICAgICAgICAgICBpZC5tYXRjaCgvXmNvaW5cXGQkLylcbiAgICAgICAgICAgICkuZm9yRWFjaCgoaWQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5pdGVtc1tpZF07XG4gICAgICAgICAgICAgICAga2V5ZnJhbWVzICs9IGBcbiAgICAgICAgICAgICAgICAgICAgJHsxIC8gNiAqIGkgKiAxMDB9JSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtpdGVtLnNyY30pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYDtcblxuICAgICAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGtleWZyYW1lcyArPSBgXG4gICAgICAgICAgICAgICAgICAgICAgICAxMDAlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtpdGVtLnNyY30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBgOyAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGFwcGVuZFN0eWxlKGBcbiAgICAgICAgICAgICAgICBALXdlYmtpdC1rZXlmcmFtZXMgY29pbiB7XG4gICAgICAgICAgICAgICAgICAgICR7a2V5ZnJhbWVzfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGApO1xuXG4gICAgICAgICAgICB0aGlzLmdvbGRFbC5zdHlsZS53ZWJraXRBbmltYXRpb24gPSAnY29pbiAxcyBsaW5lYXIgMHMgaW5maW5pdGUnO1xuXG4gICAgICAgICAgICByZXNvbHZlKHRoaXMpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2ZvdW5kLmpzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL2ZvdW5kLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi8uLi9ub2RlX21vZHVsZXMvLjAuMTMuMUBzdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vZm91bmQuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvaW5kZXguanMhLi9mb3VuZC5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2ZvdW5kLmNzc1xuLy8gbW9kdWxlIGlkID0gMTUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIjZm91bmQge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHJpZ2h0OiAwLjczcmVtO1xcbiAgICB0b3A6IDAuNHJlbTtcXG4gICAgY29sb3I6ICMwMGRkZjE7XFxuICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICAgIC13ZWJraXQtYm94LXBhY2s6IGNlbnRlcjtcXG4gICAgLXdlYmtpdC1ib3gtYWxpZ246IGNlbnRlcjtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCBjZW50ZXI7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogMS4xMDZyZW0gMC40MTNyZW07XFxufVxcblxcbiNmb3VuZCAudGV4dFdyYXAge1xcbiAgICB3aWR0aDogMS41cmVtO1xcbiAgICBoZWlnaHQ6IDAuNTUzcmVtO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IHJpZ2h0IGNlbnRlcjtcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxLjVyZW0gMC41NTNyZW07XFxuICAgIG1hcmdpbjogLTAuMXJlbTtcXG59XFxuXFxuI2ZvdW5kIC50ZXh0IHtcXG4gICAgd2lkdGg6IDEuM3JlbTtcXG4gICAgaGVpZ2h0OiAwLjVyZW07XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC40cyBlYXNlLWluIDBzO1xcbiAgICBvdmVyZmxvdzogdmlzaWJsZTtcXG59XFxuXFxuI2ZvdW5kIC50ZXh0IC5udW1iZXIge1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAwO1xcbiAgICByaWdodDogMDtcXG4gICAgd2lkdGg6IDEuM3JlbTtcXG4gICAgaGVpZ2h0OiAwLjVyZW07XFxuICAgIGxpbmUtaGVpZ2h0OiAwLjVyZW07XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuI2ZvdW5kIC5wcm9ncmVzcyB7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIHdpZHRoOiAxLjhyZW07XFxuICAgIGhlaWdodDogMC4zcmVtO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjMDBkZGYxO1xcbiAgICBib3JkZXItcmFkaXVzOiAwLjE1cmVtO1xcbiAgICBtYXJnaW46IDAgNHB4O1xcbn1cXG5cXG4jZm91bmQgLnByb2dyZXNzIC5iYXJ7XFxuICAgIHdpZHRoOiAwO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMGRkZjE7XFxuICAgIGJvcmRlci1yYWRpdXM6IDAuMTVyZW07XFxufVxcblxcbiNmb3VuZCAuZ29sZCB7XFxuICAgIHdpZHRoOiAwLjY2N3JlbTtcXG4gICAgaGVpZ2h0OiAwLjY0cmVtO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4yNS4wQGNzcy1sb2FkZXIhLi9zcmMvZm91bmQuY3NzXG4vLyBtb2R1bGUgaWQgPSAxNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICcuL21hcC5jc3MnO1xuaW1wb3J0IHtcbiAgICB3aW4sXG4gICAgZG9jLFxuICAgIFByb21pc2UsXG4gICAgcXVlcnksXG4gICAgcXVlcnlBbGwsXG4gICAgZ2V0UmVjdFxufSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IEV2ZW50IGZyb20gJy4vZXZlbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXAgZXh0ZW5kcyBFdmVudCB7XG4gICAgY29uc3RydWN0b3Iodmlld3BvcnQsIGhTbGljZSwgdlNsaWNlKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy52aWV3cG9ydCA9IHF1ZXJ5KHZpZXdwb3J0LCAnI3N0YWdlLW1hcCcpO1xuICAgICAgICB0aGlzLndyYXBFbCA9IHF1ZXJ5KHRoaXMudmlld3BvcnQsICcud3JhcCcpO1xuICAgICAgICB0aGlzLmNhbnZhc0VsID0gcXVlcnkodGhpcy52aWV3cG9ydCwgJ2NhbnZhcycpO1xuICAgICAgICB0aGlzLnJlbmRlciA9IHRoaXMuY2FudmFzRWwuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgdGhpcy5pbmRpY2F0b3JFbCA9IHF1ZXJ5KHRoaXMudmlld3BvcnQsICcuaW5kaWNhdG9yJyk7XG4gICAgICAgIHRoaXMudGV4dEVsID0gcXVlcnkodGhpcy52aWV3cG9ydCwgJy50ZXh0IGInKTtcbiAgICAgICAgdGhpcy5oU2xpY2UgPSBoU2xpY2U7XG4gICAgICAgIHRoaXMudlNsaWNlID0gdlNsaWNlO1xuICAgICAgICB0aGlzLm9wZW5lZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJhbmRvbVRleHQoKSB7XG4gICAgICAgIGxldCBuID0gMTAwMDtcbiAgICAgICAgbGV0IHN1bURlbHRhID0gMTY7XG4gICAgICAgIGxldCBzaWduID0gLTE7XG5cbiAgICAgICAgcmV0dXJuICh7XG4gICAgICAgICAgICBlbGFwc2VkLFxuICAgICAgICAgICAgZGVsdGFcbiAgICAgICAgfSkgPT4ge1xuICAgICAgICAgICAgLy8gaWYgKHN1bURlbHRhID4gMTUpIHtcbiAgICAgICAgICAgICAgICAvLyBzdW1EZWx0YSA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKG4gPCAxMDAwICYmIHNpZ24gPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHNpZ24gPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobiA+IDEwMDAwICYgc2lnbiA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBzaWduID0gLTE7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0KG4pO1xuICAgICAgICAgICAgICAgIG4gKz0gcGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIDEwMCArIDEwMCkgKiBzaWduO1xuICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBzdW1EZWx0YSArPSBkZWx0YTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRleHQoc3RyKSB7XG4gICAgICAgIHRoaXMudGV4dEVsLnRleHRDb250ZW50ID0gc3RyO1xuICAgIH1cblxuICAgIHVwZGF0ZSh4cCwgeXApIHtcbiAgICAgICAgY29uc3Qge3dpZHRoOiBjV2lkdGgsIGhlaWdodDogY0hlaWdodH0gPSBnZXRSZWN0KHRoaXMuY2FudmFzRWwpO1xuICAgICAgICBjb25zdCB7d2lkdGg6IGlXaWR0aCwgaGVpZ2h0OiBpSGVpZ2h0fSA9IGdldFJlY3QodGhpcy5pbmRpY2F0b3JFbCk7XG4gICAgICAgIGNvbnN0IHtzbGljZVdpZHRoOiBzV2lkdGgsIHNsaWNlSGVpZ2h0OiBzSGVpZ2h0fSA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5pbmRpY2F0b3JFbC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBcbiAgICAgICAgICAgIGB0cmFuc2xhdGUzZCgke2NXaWR0aCAqIHhwICsgc1dpZHRoIC8gMiAtIGlXaWR0aCAvIDJ9cHgsICR7Y0hlaWdodCAqIHlwICsgc0hlaWdodCAvIDIgLSBpSGVpZ2h0IC8gMn1weCwgMClgO1xuICAgIH1cblxuICAgIGNsZWFyKHhwLCB5cCkge1xuICAgICAgICBjb25zdCB7d2lkdGg6IGNXaWR0aCwgaGVpZ2h0OiBjSGVpZ2h0fSA9IGdldFJlY3QodGhpcy5jYW52YXNFbCk7XG4gICAgICAgIGNvbnN0IHtzbGljZVdpZHRoOiBzV2lkdGgsIHNsaWNlSGVpZ2h0OiBzSGVpZ2h0fSA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5yZW5kZXIuZmlsbFJlY3QoY1dpZHRoICogeHAsIGNIZWlnaHQgKiB5cCwgc1dpZHRoLCBzSGVpZ2h0KTtcbiAgICB9XG5cbiAgICByZWFkeSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMudmlld3BvcnQuc3R5bGUuZGlzcGxheSA9ICcnO1xuXG4gICAgICAgICAgICBjb25zdCB7d2lkdGgsIGhlaWdodH0gPSBnZXRSZWN0KHRoaXMuY2FudmFzRWwpO1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLnNsaWNlV2lkdGggPSB3aWR0aCAvIHRoaXMuaFNsaWNlO1xuICAgICAgICAgICAgdGhpcy5zbGljZUhlaWdodCA9IGhlaWdodCAvIHRoaXMudlNsaWNlO1xuXG4gICAgICAgICAgICB0aGlzLmNhbnZhc0VsLndpZHRoID0gd2lkdGg7XG4gICAgICAgICAgICB0aGlzLmNhbnZhc0VsLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyLmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyLmZpbGxTdHlsZSA9ICcjMDE2ZmEwJztcbiAgICAgICAgICAgIHRoaXMucmVuZGVyLmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIuZmlsbFN0eWxlID0gJ3JnYmEoMCwgMCwgMCwgMSknO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ2Rlc3RpbmF0aW9uLW91dCc7XG5cbiAgICAgICAgICAgIHJlc29sdmUodGhpcyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFwLmpzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL21hcC5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjEzLjFAc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL21hcC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL21hcC5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21hcC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDE1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiI3N0YWdlLW1hcCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGVmdDogMC41cmVtO1xcbiAgICBib3R0b206IDAuNXJlbTtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMC40cmVtIDAuN3JlbTtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxLjA5cmVtIDAuODUzcmVtO1xcbiAgICBoZWlnaHQ6IDg0cHg7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDk5OXB4KTtcXG4gICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICAgIC13ZWJraXQtYm94LXBhY2s6IGNlbnRlcjtcXG4gICAgLXdlYmtpdC1ib3gtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuI3N0YWdlLW1hcCAud3JhcCB7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICMwMTZmYTA7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIHdpZHRoOiAzMC4zcHg7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuI3N0YWdlLW1hcCAubWFwIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG59XFxuXFxuI3N0YWdlLW1hcCAuaW5kaWNhdG9yIHtcXG4gICAgbGVmdDogMDtcXG4gICAgdG9wOiAwO1xcbiAgICB3aWR0aDogMTZweDtcXG4gICAgaGVpZ2h0OiAxNnB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDUwLCA1MCwgNTApO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogZmxhc2ggMC40cyBsaW5lYXIgMHMgaW5maW5pdGUgYWx0ZXJuYXRlO1xcbn1cXG5cXG5cXG4jc3RhZ2UtbWFwIC50ZXh0IHtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBRUlBQUFCQ0NBWUFBQURqVkFEb0FBQUFHWFJGV0hSVGIyWjBkMkZ5WlFCQlpHOWlaU0JKYldGblpWSmxZV1I1Y2NsbFBBQUFDU0ZKUkVGVWVOcmtuQWxzRlZVVWhxZXZZMXRxQllwU0tBcTJnS0FzTG9qaWhncUlpdEdFYUJRVmd5RnVVVkdpQXU1S1hOaFJOQzY0Z0hHUGdRakVEUkFVd1NLQ0lOQXFpNEJLVlpCRmJDMkNGSXJucE4vbzdXVGU2OHg3ODhvcm5PUlBlZE41dzczbm52dWYvNXlaYVpxMXZzeXFBOHNXNUFvYUNuSUVEUVNaQWh1bzdRVjdCSDhMS2dUbGdoMThUcXFsSmNrUmFZS2pCQzBFZVlLc0JLKzNXN0JGOEp0Z20yQi9xanRDSjF3b09KcFZUNGFwVTM0Ui9DVFlsV3FPT0Z6UVZuQ01JR0xWalZYaGtIV0NuUWZhRWJxLzJ3bGFzeDBPaE9rMjJTQllDOGZVdVNPYUN6cUhzUC9EM0RJbGdrMTE1WWgwUVNkQkt5czFiU01PMlpkTVJ5Z0JuazRhVEdYVHRMczRDSmtHY1lST3Zsc0tiUVUvVytWcm5CS2FJeG9MemhBY1p0VXZxOFFaTzJvN01lSXpFdXFqRXl6RzNNM1BWcTdORVZsY3FENDZ3ZTJNckhnZGtWN1BPTUhQZ3FiSDQ0aE85U0E3QkxHR3pDbVFJNXFuc0U1SXhGb3hOMStPc0ZHTUI2dDFOa3IvR3BOMlc3c2s4MEtHb0wyZ1FKQlByOEttY0txZzFGN0Z6MlR4aGM3eCsxZzZRcXZJSGtrb29QUjZYUVFYQ0U1and1dnBNZndOaWVWUXZyZGhzRDhMUGhUTUNTcVhmUlpxbjV0VnE5c1JKeVdCRy9TYUF5R3JXWUl2QmI5eS9DUms4RkxCdFJSTXYxRmVueWM0bjlwaGpHQXpEczJuM0c4bWFFU0U3Y1NweS8ySUo2TW1XZUhsQ0swamVvYllUOUJWdllYYTVBMUNzUmNyb1JNWnhzU0dDL3FRM2l3R3R3Z1JOMXZRUVhDMjRFY2k1Z2ZLYm5WYUdlb3hpNjEycG1DTjREV3I5aTZXOWpNK2Mrb1JjOUlGSVRwQjIzUmpyZW8rNVdBbXJwK1hzWkpEY01KeXRrazM0N3M2K2Q1RXkxQVdhQVJPT0ZJd1R6Q0Z5Q29Xck9ZNjB3WDNFaEVYK1JoamhEblh5QnI2czJXSVRoakR5azRVUEVxWVAwUlkzdzhuNkVxOEtMamQrTzVtSnRMYVF4bE9nVmZ1RTV3UzQvK2ZCaG42c1phT0R5TEc0RE5EMmc2UENSWkNkRThJU3BsOGJ5YnRxRHQxd21WV2RZL1RzZGNGVjd1dXVaVHRwZC85RmhJZFJtUkZzOE45amplVEtQdlBFZmtoUmNNZzl1NWI4TTNEZ3E4STdUN0dlZStTSlM1MVRWajM3WW5HTWMwb3Z4dlIyazh3bFpiY1hWR3lXMjdBMnFpRjZZaW1JVGloSy90NmdsVjliMElKN1I3MmVhNXgzdHVDZndRM0c4ZitGRXdXM09xNjVnekJKYTVqU3ByUFFLSTlQY1p4Q1U3MWEwMGRRWlZ0SmQ1NlR5TkZ2aWs0UVhDamg1VFYreEh2c2QrN0dzZlZhU01GTjlIM2NPd1B3VXJYVnFrZ1NxcklMUDBGWDFqL04yM3owRUdEQW5iZHNtM1hhc1ZyVHI5aXZ1QVY4dnQreUc4VnFUT2Z5V2E0blBBNGFmVmsxelZmRU56Z0N2OGxTT1FCZ3RHQzhZSnpTWU1STXRRN2RLZUNXSzRkVW9XcEU1bUpkOGRBbW5ydFk5bnpYbXExakhNdjRQZW1UVVZodG5VZDE5UjZPU3ZmQWdkZmpDT3VFV3puMzRFclV4dlNTclIyMEhUMkVpdlN4Y2QzaWdUdkV5SEh1MzYzRUczd29PdjRhclpMVnlNS0Z5RGFycUxFSGg3bkhITHNFUGloUGZ2L0R3Z3NWdit3Q0FKc3k1YklkcDJ6R0dFMDNCVkJ1czFlRmx4bkhHOE44VnFrMTBjZzRYaXNnZTNhcy9IVytPdEpjVjVWcTByaXVTaEJqWnk3bzRnM3JVTStRWWRrZTRna2pkenV4ckZHMUNSbE9DR1JPK2FaZHF6MlZZRDBzOGtSSmtUSGF1VDBNcmlpRjJuMUtJL3Y3Nk0yV0l2ZWNEdmhPeHp4dEhGc055blU0WnFjQkIxaDIxRjZFb0hDQ3RGVHpGNnRJbXhWVXp4UWk5elZLdlFwb21xRXgxaEtJZFFoaGhQVjZhT00wdnd2SExFbFVVY2tZdG1RMU84VU1Gb0hOUEZSdk8yREs2YVJDbnQ3bkxPWk9xVS9UcldvWERXajNFRWRVeENTSXE2eUVTUHg4RVFtcEhZMDJqNHpTdWk3UzkvNTVQcENvc0ZMMWE2RFRGVk1YVWkvWVNKakhVM2F6Q0QxSDVFQVNmNjNNSGFjM1I5bDdqdUppQm1JcGZreHp0L01hczdoWEUyekhXT2sxb25JN2JPb1ZiUVl1eEt1MllNY0gwVEt6a00vSkdKN2JTNGNOSVZlaGw2NG0vMDlFQVpmU21Ub0NtNmxVaXloNUQ2VFVyd3cybUFnelNWRVdpTzRvSklxMW9tMnljajROcVRWaWppVXBOdjIyQXl5VVlBdjZWYTRuaERkeEtUejRZWVhxREV5V0trQ2xGOXRENUpzSUN1MGdSdy9JY0tVSDg0eHp2dU1Qc2RUTkdNNnU1dXdjZG91MndyKzJNMEF3blV4bjhzcGpyb3pxQ2NEWEtzTXZpakJ1ZHVKR3BYZHo3cks2VzlwK1QxQkJNOUZiczhNd1JFVkVRYmoxL0tNSHFScG43THlLcDYrOFhHZFRTakZvWkNsMWhxVDJFNGFFWDFkVGxpQ0RubUF0bDhwU3JhUUtqUlJLN2NEZEgyZG5zTUtqNXhkaFB6dEFZR2Q2TXBFKytHTDVkUVNHb1hhMWo5VjhBSFJOQ3BLSlR5YlJzN0RSaEUyQ2MweU13UitVTnRobzhoMitTVE1JMWwxTDEwd21YYmFiYlRTOGlEaUhiVG9tK09nTGpSWDV0QzFlbzRVNkVXZWs5ZzJvN21lRTMwUitPSDVNUGhCZmVBSXFxMld2L3NaMnoycVJjY1drZTRHd3hPRnBMdGNveFUzRnhYWWgxWmJWZ3pGT1k1cmpEUDZxYXRwN293bnBZYnhiT1RXYWoxUWZWOGp6OVZTajJaSHNBcHpVWVhsSGlMTDZXQy9UZHRzR1Z2aERMYk9jYlVvVHIzdXg2UmtzOGhhUzJROGlKSWRHWktxMUNkcXRqaU9pTURVZmpyWkxaRzQ3Vm01UDQxcXNKbkJEZFBSQlZlUWFXTG1jUVRYZEhpam4ydTd6S01OZUM5ODgxQUlhdExpR3JwRnE4dzdYUjNJNDM2dEplYzNobC8rZ1c5S2NjNGdQaytBR3dZYSs5d1p4Q3BTOFVySXN5OTZ4RlNrazhrUXc0aUVKNjN3SGxKZnh4aVNlc3N2blNadWQ5THRQSnlkUnRhcHBFOTVPbEdRYnBCa0NkdXZHR210blBJUkViWTNwUEhWdU9WWEZ6ZUJleURKRzFzMWJ3STNJeDAyeFBrN2lZQ05LTkh6d1M5b2p1OURIbGZVbThDV2xkekhBcm9qdWpvUzZodUlqSjMwSWN6SEFteXl6Q3graHYxYVFxMlBCY1RERlVHdENVVlRhNklraHpDdFFISCt4T3J2VHVJWU50RDVzbUk1d2lZcURvYW42YnhzTjlGUWcyc2lVUlJkc1hYd1dva1g0VVppTkZKS0QwSW5sRnBSWG1PSWxTcUxMWjhQZE5jVEs0OFY2WkZhNU80U1ZGOTl0ejMwVC9iRjR3Z0xCYmNJOFZOZnJaSTU3SXFkM3cvOGF3cGFYWHJkKzlBaWEwZ0lUZ2p0TlFXTDJxSElDdkgxUWxmSkhVMzVKZHBuS1BMYmVBcFNWL3pGaGNNbVVKWFAyeng2Qks4bVNJeEZqTmtLMnhHT2x4ZlFZUXJMVk9hT05YTDdYclpMdkJYbVJ1cVpRTkdiU3E4N2FuZExuM1hRbnVmQ09CVmpuYjd1NkpianFmQUNyRWJvR3VzQXZRRHJybG9QNlZlaTNhYk5uUUlja3F5aUxhVmZrdmZxUHh6U2Z6WWhtcm4va0laK3pyRCsvME1hVmNqZlN2WjVuZjhoalg4RkdBQmc2SHd6bXFvdEhBQUFBQUJKUlU1RXJrSmdnZz09KTtcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxLjJyZW07XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciAwcmVtO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICBjb2xvcjogIzAwZGRmMTtcXG4gICAgZm9udC1zaXplOiAxMnB4O1xcbiAgICB3aWR0aDogMTAwcHg7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgbGluZS1oZWlnaHQ6IDEuNWVtO1xcbiAgICBsZWZ0OiAwLjFyZW07XFxuICAgIHRvcDogMS44cmVtO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHBhZGRpbmctdG9wOiA1MHB4O1xcbn1cXG5cXG4jc3RhZ2UtbWFwIC50ZXh0IGIge1xcbiAgICBmb250LXNpemU6IDE1cHg7XFxuICAgIG1hcmdpbi10b3A6IDRweDtcXG4gICAgY29sb3I6ICNGRkY7XFxufVxcblxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBmbGFzaCB7XFxuICAgIDAlIHtcXG4gICAgICAgIG9wYWNpdHk6IDA7XFxuICAgIH1cXG5cXG4gICAgMTAwJSB7XFxuICAgICAgICBvcGFjaXR5OiAxO1xcbiAgICB9XFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4yNS4wQGNzcy1sb2FkZXIhLi9zcmMvbWFwLmNzc1xuLy8gbW9kdWxlIGlkID0gMTU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7XG4gICAgd2luLFxuICAgIGRvYyxcbiAgICBQcm9taXNlLFxuICAgIGRlZmVyLFxuICAgIHF1ZXJ5LFxuICAgIHF1ZXJ5QWxsLFxuICAgIGdldFJlY3QsXG4gICAgZ2V0RGlzdGFuY2UsXG4gICAgcmFmLFxuICAgIGNhZlxufSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IEV2ZW50IGZyb20gJy4vZXZlbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaWNrZXIgZXh0ZW5kcyBFdmVudHtcbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuXG4gICAgICAgIHRoaXMuX2lkID0gMDtcbiAgICAgICAgdGhpcy5fbWFwRiA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5fbWFwQyA9IG5ldyBNYXAoKTtcbiAgICB9XG5cbiAgICBhZGQoZikge1xuICAgICAgICBpZiAoZiAmJiAhdGhpcy5fbWFwQy5oYXMoZikpIHtcbiAgICAgICAgICAgIGNvbnN0IGlkID0gdGhpcy5faWQrKztcbiAgICAgICAgICAgIHRoaXMuX21hcEYuc2V0KGlkLCBmKTtcbiAgICAgICAgICAgIHRoaXMuX21hcEMuc2V0KGYsIHtcbiAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQ6IGRlZmVyKCksXG4gICAgICAgICAgICAgICAgY2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdGFydDogMCxcbiAgICAgICAgICAgICAgICBlbGFwc2VkOiAwLFxuICAgICAgICAgICAgICAgIGRlbHRhOiAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhcyhpZCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGlkID09PSAnbnVtYmVyJyAmJiB0aGlzLl9tYXBGLmhhcyhpZCk7XG4gICAgfVxuXG4gICAgZGVsZXRlKGlkKSB7XG4gICAgICAgIGlmICh0aGlzLmhhcyhpZCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGYgPSB0aGlzLl9tYXBGLmdldChpZCk7XG4gICAgICAgICAgICBjb25zdCBjID0gdGhpcy5fbWFwQy5nZXQoZik7XG4gICAgICAgICAgICBjLmNhbmNlbCA9IHRydWU7XG4gICAgICAgICAgICBjLmRlZmVycmVkLnJlc29sdmUoKTtcbiAgICAgICAgICAgIHRoaXMuX21hcEYuZGVsZXRlKGlkKTtcbiAgICAgICAgICAgIHRoaXMuX21hcEMuZGVsZXRlKGYpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZW5kKGlkKSB7XG4gICAgICAgIGlmICh0aGlzLmhhcyhpZCkpIHtcbiAgICAgICAgICAgIGNvbnN0IGYgPSB0aGlzLl9tYXBGLmdldChpZCk7XG4gICAgICAgICAgICBjb25zdCBjID0gdGhpcy5fbWFwQy5nZXQoZik7XG4gICAgICAgICAgICByZXR1cm4gYy5kZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FuY2VsKCkge1xuICAgICAgICBpZiAodGhpcy5yaWQpIHtcbiAgICAgICAgICAgIGNhZih0aGlzLnJpZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBydW4oKSB7XG4gICAgICAgIHRoaXMuc3RhcnQgPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLmVsYXBzZWQgPSAwO1xuICAgICAgICB0aGlzLmRlbHRhID0gMDtcblxuICAgICAgICBjb25zdCB0aWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yaWQgPSByYWYodGljayk7XG5cbiAgICAgICAgICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgbGV0IGVsYXBzZWQgPSBub3cgLSB0aGlzLnN0YXJ0O1xuICAgICAgICAgICAgbGV0IGRlbHRhID0gZWxhcHNlZCAtIHRoaXMuZWxhcHNlZDtcblxuICAgICAgICAgICAgdGhpcy5lbWl0KCdiZWZvcmV0aWNrJywge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiB0aGlzLnN0YXJ0LFxuICAgICAgICAgICAgICAgIGRlbHRhOiBkZWx0YSxcbiAgICAgICAgICAgICAgICBlbGFwc2VkOiBlbGFwc2VkXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3Qga2V5cyA9IFsuLi50aGlzLl9tYXBDLmtleXMoKV07XG5cbiAgICAgICAgICAgIGtleXMuZm9yRWFjaChmID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjID0gdGhpcy5fbWFwQy5nZXQoZik7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWMuY2FuY2VsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgICAgICAgICAgICAgIGMuc3RhcnQgPSBjLnN0YXJ0IHx8IChjLnN0YXJ0ID0gbm93KTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGFwc2VkID0gbm93IC0gYy5zdGFydDtcbiAgICAgICAgICAgICAgICAgICAgYy5kZWx0YSA9IGVsYXBzZWQgLSBjLmVsYXBzZWQ7XG4gICAgICAgICAgICAgICAgICAgIGMuZWxhcHNlZCA9IGVsYXBzZWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGYoYywgdGhpcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlKGMuaWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgICAgICBlbGFwc2VkID0gbm93IC0gdGhpcy5zdGFydDtcbiAgICAgICAgICAgIGRlbHRhID0gZWxhcHNlZCAtIHRoaXMuZWxhcHNlZDtcblxuICAgICAgICAgICAgdGhpcy5lbWl0KCdhZnRlcnRpY2snLCB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHRoaXMuc3RhcnQsXG4gICAgICAgICAgICAgICAgZGVsdGE6IGRlbHRhLFxuICAgICAgICAgICAgICAgIGVsYXBzZWQ6IGVsYXBzZWRcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmRlbHRhID0gZGVsdGE7XG4gICAgICAgICAgICB0aGlzLmVsYXBzZWQgPSAgZWxhcHNlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmlkID0gcmFmKHRpY2spO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdGlja2VyLmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL21hcFwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9tYXAuanNcbi8vIG1vZHVsZSBpZCA9IDE1NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInJlcXVpcmUoJy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5tYXAnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM3Lm1hcC50by1qc29uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvX2NvcmUnKS5NYXA7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vbWFwLmpzXG4vLyBtb2R1bGUgaWQgPSAxNTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG52YXIgc3Ryb25nID0gcmVxdWlyZSgnLi9fY29sbGVjdGlvbi1zdHJvbmcnKTtcblxuLy8gMjMuMSBNYXAgT2JqZWN0c1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb2xsZWN0aW9uJykoJ01hcCcsIGZ1bmN0aW9uKGdldCl7XG4gIHJldHVybiBmdW5jdGlvbiBNYXAoKXsgcmV0dXJuIGdldCh0aGlzLCBhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7IH07XG59LCB7XG4gIC8vIDIzLjEuMy42IE1hcC5wcm90b3R5cGUuZ2V0KGtleSlcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoa2V5KXtcbiAgICB2YXIgZW50cnkgPSBzdHJvbmcuZ2V0RW50cnkodGhpcywga2V5KTtcbiAgICByZXR1cm4gZW50cnkgJiYgZW50cnkudjtcbiAgfSxcbiAgLy8gMjMuMS4zLjkgTWFwLnByb3RvdHlwZS5zZXQoa2V5LCB2YWx1ZSlcbiAgc2V0OiBmdW5jdGlvbiBzZXQoa2V5LCB2YWx1ZSl7XG4gICAgcmV0dXJuIHN0cm9uZy5kZWYodGhpcywga2V5ID09PSAwID8gMCA6IGtleSwgdmFsdWUpO1xuICB9XG59LCBzdHJvbmcsIHRydWUpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm1hcC5qc1xuLy8gbW9kdWxlIGlkID0gMTU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGRQICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZlxuICAsIGNyZWF0ZSAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpXG4gICwgcmVkZWZpbmVBbGwgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKVxuICAsIGN0eCAgICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBhbkluc3RhbmNlICA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJylcbiAgLCBkZWZpbmVkICAgICA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKVxuICAsIGZvck9mICAgICAgID0gcmVxdWlyZSgnLi9fZm9yLW9mJylcbiAgLCAkaXRlckRlZmluZSA9IHJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJylcbiAgLCBzdGVwICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXItc3RlcCcpXG4gICwgc2V0U3BlY2llcyAgPSByZXF1aXJlKCcuL19zZXQtc3BlY2llcycpXG4gICwgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpXG4gICwgZmFzdEtleSAgICAgPSByZXF1aXJlKCcuL19tZXRhJykuZmFzdEtleVxuICAsIFNJWkUgICAgICAgID0gREVTQ1JJUFRPUlMgPyAnX3MnIDogJ3NpemUnO1xuXG52YXIgZ2V0RW50cnkgPSBmdW5jdGlvbih0aGF0LCBrZXkpe1xuICAvLyBmYXN0IGNhc2VcbiAgdmFyIGluZGV4ID0gZmFzdEtleShrZXkpLCBlbnRyeTtcbiAgaWYoaW5kZXggIT09ICdGJylyZXR1cm4gdGhhdC5faVtpbmRleF07XG4gIC8vIGZyb3plbiBvYmplY3QgY2FzZVxuICBmb3IoZW50cnkgPSB0aGF0Ll9mOyBlbnRyeTsgZW50cnkgPSBlbnRyeS5uKXtcbiAgICBpZihlbnRyeS5rID09IGtleSlyZXR1cm4gZW50cnk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRDb25zdHJ1Y3RvcjogZnVuY3Rpb24od3JhcHBlciwgTkFNRSwgSVNfTUFQLCBBRERFUil7XG4gICAgdmFyIEMgPSB3cmFwcGVyKGZ1bmN0aW9uKHRoYXQsIGl0ZXJhYmxlKXtcbiAgICAgIGFuSW5zdGFuY2UodGhhdCwgQywgTkFNRSwgJ19pJyk7XG4gICAgICB0aGF0Ll9pID0gY3JlYXRlKG51bGwpOyAvLyBpbmRleFxuICAgICAgdGhhdC5fZiA9IHVuZGVmaW5lZDsgICAgLy8gZmlyc3QgZW50cnlcbiAgICAgIHRoYXQuX2wgPSB1bmRlZmluZWQ7ICAgIC8vIGxhc3QgZW50cnlcbiAgICAgIHRoYXRbU0laRV0gPSAwOyAgICAgICAgIC8vIHNpemVcbiAgICAgIGlmKGl0ZXJhYmxlICE9IHVuZGVmaW5lZClmb3JPZihpdGVyYWJsZSwgSVNfTUFQLCB0aGF0W0FEREVSXSwgdGhhdCk7XG4gICAgfSk7XG4gICAgcmVkZWZpbmVBbGwoQy5wcm90b3R5cGUsIHtcbiAgICAgIC8vIDIzLjEuMy4xIE1hcC5wcm90b3R5cGUuY2xlYXIoKVxuICAgICAgLy8gMjMuMi4zLjIgU2V0LnByb3RvdHlwZS5jbGVhcigpXG4gICAgICBjbGVhcjogZnVuY3Rpb24gY2xlYXIoKXtcbiAgICAgICAgZm9yKHZhciB0aGF0ID0gdGhpcywgZGF0YSA9IHRoYXQuX2ksIGVudHJ5ID0gdGhhdC5fZjsgZW50cnk7IGVudHJ5ID0gZW50cnkubil7XG4gICAgICAgICAgZW50cnkuciA9IHRydWU7XG4gICAgICAgICAgaWYoZW50cnkucCllbnRyeS5wID0gZW50cnkucC5uID0gdW5kZWZpbmVkO1xuICAgICAgICAgIGRlbGV0ZSBkYXRhW2VudHJ5LmldO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQuX2YgPSB0aGF0Ll9sID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGF0W1NJWkVdID0gMDtcbiAgICAgIH0sXG4gICAgICAvLyAyMy4xLjMuMyBNYXAucHJvdG90eXBlLmRlbGV0ZShrZXkpXG4gICAgICAvLyAyMy4yLjMuNCBTZXQucHJvdG90eXBlLmRlbGV0ZSh2YWx1ZSlcbiAgICAgICdkZWxldGUnOiBmdW5jdGlvbihrZXkpe1xuICAgICAgICB2YXIgdGhhdCAgPSB0aGlzXG4gICAgICAgICAgLCBlbnRyeSA9IGdldEVudHJ5KHRoYXQsIGtleSk7XG4gICAgICAgIGlmKGVudHJ5KXtcbiAgICAgICAgICB2YXIgbmV4dCA9IGVudHJ5Lm5cbiAgICAgICAgICAgICwgcHJldiA9IGVudHJ5LnA7XG4gICAgICAgICAgZGVsZXRlIHRoYXQuX2lbZW50cnkuaV07XG4gICAgICAgICAgZW50cnkuciA9IHRydWU7XG4gICAgICAgICAgaWYocHJldilwcmV2Lm4gPSBuZXh0O1xuICAgICAgICAgIGlmKG5leHQpbmV4dC5wID0gcHJldjtcbiAgICAgICAgICBpZih0aGF0Ll9mID09IGVudHJ5KXRoYXQuX2YgPSBuZXh0O1xuICAgICAgICAgIGlmKHRoYXQuX2wgPT0gZW50cnkpdGhhdC5fbCA9IHByZXY7XG4gICAgICAgICAgdGhhdFtTSVpFXS0tO1xuICAgICAgICB9IHJldHVybiAhIWVudHJ5O1xuICAgICAgfSxcbiAgICAgIC8vIDIzLjIuMy42IFNldC5wcm90b3R5cGUuZm9yRWFjaChjYWxsYmFja2ZuLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICAgICAgLy8gMjMuMS4zLjUgTWFwLnByb3RvdHlwZS5mb3JFYWNoKGNhbGxiYWNrZm4sIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gICAgICBmb3JFYWNoOiBmdW5jdGlvbiBmb3JFYWNoKGNhbGxiYWNrZm4gLyosIHRoYXQgPSB1bmRlZmluZWQgKi8pe1xuICAgICAgICBhbkluc3RhbmNlKHRoaXMsIEMsICdmb3JFYWNoJyk7XG4gICAgICAgIHZhciBmID0gY3R4KGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkLCAzKVxuICAgICAgICAgICwgZW50cnk7XG4gICAgICAgIHdoaWxlKGVudHJ5ID0gZW50cnkgPyBlbnRyeS5uIDogdGhpcy5fZil7XG4gICAgICAgICAgZihlbnRyeS52LCBlbnRyeS5rLCB0aGlzKTtcbiAgICAgICAgICAvLyByZXZlcnQgdG8gdGhlIGxhc3QgZXhpc3RpbmcgZW50cnlcbiAgICAgICAgICB3aGlsZShlbnRyeSAmJiBlbnRyeS5yKWVudHJ5ID0gZW50cnkucDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIC8vIDIzLjEuMy43IE1hcC5wcm90b3R5cGUuaGFzKGtleSlcbiAgICAgIC8vIDIzLjIuMy43IFNldC5wcm90b3R5cGUuaGFzKHZhbHVlKVxuICAgICAgaGFzOiBmdW5jdGlvbiBoYXMoa2V5KXtcbiAgICAgICAgcmV0dXJuICEhZ2V0RW50cnkodGhpcywga2V5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZihERVNDUklQVE9SUylkUChDLnByb3RvdHlwZSwgJ3NpemUnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBkZWZpbmVkKHRoaXNbU0laRV0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBDO1xuICB9LFxuICBkZWY6IGZ1bmN0aW9uKHRoYXQsIGtleSwgdmFsdWUpe1xuICAgIHZhciBlbnRyeSA9IGdldEVudHJ5KHRoYXQsIGtleSlcbiAgICAgICwgcHJldiwgaW5kZXg7XG4gICAgLy8gY2hhbmdlIGV4aXN0aW5nIGVudHJ5XG4gICAgaWYoZW50cnkpe1xuICAgICAgZW50cnkudiA9IHZhbHVlO1xuICAgIC8vIGNyZWF0ZSBuZXcgZW50cnlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhhdC5fbCA9IGVudHJ5ID0ge1xuICAgICAgICBpOiBpbmRleCA9IGZhc3RLZXkoa2V5LCB0cnVlKSwgLy8gPC0gaW5kZXhcbiAgICAgICAgazoga2V5LCAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGtleVxuICAgICAgICB2OiB2YWx1ZSwgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gdmFsdWVcbiAgICAgICAgcDogcHJldiA9IHRoYXQuX2wsICAgICAgICAgICAgIC8vIDwtIHByZXZpb3VzIGVudHJ5XG4gICAgICAgIG46IHVuZGVmaW5lZCwgICAgICAgICAgICAgICAgICAvLyA8LSBuZXh0IGVudHJ5XG4gICAgICAgIHI6IGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSByZW1vdmVkXG4gICAgICB9O1xuICAgICAgaWYoIXRoYXQuX2YpdGhhdC5fZiA9IGVudHJ5O1xuICAgICAgaWYocHJldilwcmV2Lm4gPSBlbnRyeTtcbiAgICAgIHRoYXRbU0laRV0rKztcbiAgICAgIC8vIGFkZCB0byBpbmRleFxuICAgICAgaWYoaW5kZXggIT09ICdGJyl0aGF0Ll9pW2luZGV4XSA9IGVudHJ5O1xuICAgIH0gcmV0dXJuIHRoYXQ7XG4gIH0sXG4gIGdldEVudHJ5OiBnZXRFbnRyeSxcbiAgc2V0U3Ryb25nOiBmdW5jdGlvbihDLCBOQU1FLCBJU19NQVApe1xuICAgIC8vIGFkZCAua2V5cywgLnZhbHVlcywgLmVudHJpZXMsIFtAQGl0ZXJhdG9yXVxuICAgIC8vIDIzLjEuMy40LCAyMy4xLjMuOCwgMjMuMS4zLjExLCAyMy4xLjMuMTIsIDIzLjIuMy41LCAyMy4yLjMuOCwgMjMuMi4zLjEwLCAyMy4yLjMuMTFcbiAgICAkaXRlckRlZmluZShDLCBOQU1FLCBmdW5jdGlvbihpdGVyYXRlZCwga2luZCl7XG4gICAgICB0aGlzLl90ID0gaXRlcmF0ZWQ7ICAvLyB0YXJnZXRcbiAgICAgIHRoaXMuX2sgPSBraW5kOyAgICAgIC8vIGtpbmRcbiAgICAgIHRoaXMuX2wgPSB1bmRlZmluZWQ7IC8vIHByZXZpb3VzXG4gICAgfSwgZnVuY3Rpb24oKXtcbiAgICAgIHZhciB0aGF0ICA9IHRoaXNcbiAgICAgICAgLCBraW5kICA9IHRoYXQuX2tcbiAgICAgICAgLCBlbnRyeSA9IHRoYXQuX2w7XG4gICAgICAvLyByZXZlcnQgdG8gdGhlIGxhc3QgZXhpc3RpbmcgZW50cnlcbiAgICAgIHdoaWxlKGVudHJ5ICYmIGVudHJ5LnIpZW50cnkgPSBlbnRyeS5wO1xuICAgICAgLy8gZ2V0IG5leHQgZW50cnlcbiAgICAgIGlmKCF0aGF0Ll90IHx8ICEodGhhdC5fbCA9IGVudHJ5ID0gZW50cnkgPyBlbnRyeS5uIDogdGhhdC5fdC5fZikpe1xuICAgICAgICAvLyBvciBmaW5pc2ggdGhlIGl0ZXJhdGlvblxuICAgICAgICB0aGF0Ll90ID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gc3RlcCgxKTtcbiAgICAgIH1cbiAgICAgIC8vIHJldHVybiBzdGVwIGJ5IGtpbmRcbiAgICAgIGlmKGtpbmQgPT0gJ2tleXMnICApcmV0dXJuIHN0ZXAoMCwgZW50cnkuayk7XG4gICAgICBpZihraW5kID09ICd2YWx1ZXMnKXJldHVybiBzdGVwKDAsIGVudHJ5LnYpO1xuICAgICAgcmV0dXJuIHN0ZXAoMCwgW2VudHJ5LmssIGVudHJ5LnZdKTtcbiAgICB9LCBJU19NQVAgPyAnZW50cmllcycgOiAndmFsdWVzJyAsICFJU19NQVAsIHRydWUpO1xuXG4gICAgLy8gYWRkIFtAQHNwZWNpZXNdLCAyMy4xLjIuMiwgMjMuMi4yLjJcbiAgICBzZXRTcGVjaWVzKE5BTUUpO1xuICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvbGxlY3Rpb24tc3Ryb25nLmpzXG4vLyBtb2R1bGUgaWQgPSAxNTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGFyZ2V0LCBzcmMsIHNhZmUpe1xuICBmb3IodmFyIGtleSBpbiBzcmMpe1xuICAgIGlmKHNhZmUgJiYgdGFyZ2V0W2tleV0pdGFyZ2V0W2tleV0gPSBzcmNba2V5XTtcbiAgICBlbHNlIGhpZGUodGFyZ2V0LCBrZXksIHNyY1trZXldKTtcbiAgfSByZXR1cm4gdGFyZ2V0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS1hbGwuanNcbi8vIG1vZHVsZSBpZCA9IDE2MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIENvbnN0cnVjdG9yLCBuYW1lLCBmb3JiaWRkZW5GaWVsZCl7XG4gIGlmKCEoaXQgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikgfHwgKGZvcmJpZGRlbkZpZWxkICE9PSB1bmRlZmluZWQgJiYgZm9yYmlkZGVuRmllbGQgaW4gaXQpKXtcbiAgICB0aHJvdyBUeXBlRXJyb3IobmFtZSArICc6IGluY29ycmVjdCBpbnZvY2F0aW9uIScpO1xuICB9IHJldHVybiBpdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4taW5zdGFuY2UuanNcbi8vIG1vZHVsZSBpZCA9IDE2MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBjdHggICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgY2FsbCAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKVxuICAsIGlzQXJyYXlJdGVyID0gcmVxdWlyZSgnLi9faXMtYXJyYXktaXRlcicpXG4gICwgYW5PYmplY3QgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIHRvTGVuZ3RoICAgID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCBnZXRJdGVyRm4gICA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJylcbiAgLCBCUkVBSyAgICAgICA9IHt9XG4gICwgUkVUVVJOICAgICAgPSB7fTtcbnZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdGVyYWJsZSwgZW50cmllcywgZm4sIHRoYXQsIElURVJBVE9SKXtcbiAgdmFyIGl0ZXJGbiA9IElURVJBVE9SID8gZnVuY3Rpb24oKXsgcmV0dXJuIGl0ZXJhYmxlOyB9IDogZ2V0SXRlckZuKGl0ZXJhYmxlKVxuICAgICwgZiAgICAgID0gY3R4KGZuLCB0aGF0LCBlbnRyaWVzID8gMiA6IDEpXG4gICAgLCBpbmRleCAgPSAwXG4gICAgLCBsZW5ndGgsIHN0ZXAsIGl0ZXJhdG9yLCByZXN1bHQ7XG4gIGlmKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXRlcmFibGUgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgLy8gZmFzdCBjYXNlIGZvciBhcnJheXMgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yXG4gIGlmKGlzQXJyYXlJdGVyKGl0ZXJGbikpZm9yKGxlbmd0aCA9IHRvTGVuZ3RoKGl0ZXJhYmxlLmxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKXtcbiAgICByZXN1bHQgPSBlbnRyaWVzID8gZihhbk9iamVjdChzdGVwID0gaXRlcmFibGVbaW5kZXhdKVswXSwgc3RlcFsxXSkgOiBmKGl0ZXJhYmxlW2luZGV4XSk7XG4gICAgaWYocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTilyZXR1cm4gcmVzdWx0O1xuICB9IGVsc2UgZm9yKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoaXRlcmFibGUpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7ICl7XG4gICAgcmVzdWx0ID0gY2FsbChpdGVyYXRvciwgZiwgc3RlcC52YWx1ZSwgZW50cmllcyk7XG4gICAgaWYocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTilyZXR1cm4gcmVzdWx0O1xuICB9XG59O1xuZXhwb3J0cy5CUkVBSyAgPSBCUkVBSztcbmV4cG9ydHMuUkVUVVJOID0gUkVUVVJOO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Zvci1vZi5qc1xuLy8gbW9kdWxlIGlkID0gMTYyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIGRQICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJylcbiAgLCBTUEVDSUVTICAgICA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oS0VZKXtcbiAgdmFyIEMgPSB0eXBlb2YgY29yZVtLRVldID09ICdmdW5jdGlvbicgPyBjb3JlW0tFWV0gOiBnbG9iYWxbS0VZXTtcbiAgaWYoREVTQ1JJUFRPUlMgJiYgQyAmJiAhQ1tTUEVDSUVTXSlkUC5mKEMsIFNQRUNJRVMsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfVxuICB9KTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXNwZWNpZXMuanNcbi8vIG1vZHVsZSBpZCA9IDE2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIG1ldGEgICAgICAgICAgID0gcmVxdWlyZSgnLi9fbWV0YScpXG4gICwgZmFpbHMgICAgICAgICAgPSByZXF1aXJlKCcuL19mYWlscycpXG4gICwgaGlkZSAgICAgICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCByZWRlZmluZUFsbCAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lLWFsbCcpXG4gICwgZm9yT2YgICAgICAgICAgPSByZXF1aXJlKCcuL19mb3Itb2YnKVxuICAsIGFuSW5zdGFuY2UgICAgID0gcmVxdWlyZSgnLi9fYW4taW5zdGFuY2UnKVxuICAsIGlzT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCBkUCAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZcbiAgLCBlYWNoICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2FycmF5LW1ldGhvZHMnKSgwKVxuICAsIERFU0NSSVBUT1JTICAgID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihOQU1FLCB3cmFwcGVyLCBtZXRob2RzLCBjb21tb24sIElTX01BUCwgSVNfV0VBSyl7XG4gIHZhciBCYXNlICA9IGdsb2JhbFtOQU1FXVxuICAgICwgQyAgICAgPSBCYXNlXG4gICAgLCBBRERFUiA9IElTX01BUCA/ICdzZXQnIDogJ2FkZCdcbiAgICAsIHByb3RvID0gQyAmJiBDLnByb3RvdHlwZVxuICAgICwgTyAgICAgPSB7fTtcbiAgaWYoIURFU0NSSVBUT1JTIHx8IHR5cGVvZiBDICE9ICdmdW5jdGlvbicgfHwgIShJU19XRUFLIHx8IHByb3RvLmZvckVhY2ggJiYgIWZhaWxzKGZ1bmN0aW9uKCl7XG4gICAgbmV3IEMoKS5lbnRyaWVzKCkubmV4dCgpO1xuICB9KSkpe1xuICAgIC8vIGNyZWF0ZSBjb2xsZWN0aW9uIGNvbnN0cnVjdG9yXG4gICAgQyA9IGNvbW1vbi5nZXRDb25zdHJ1Y3Rvcih3cmFwcGVyLCBOQU1FLCBJU19NQVAsIEFEREVSKTtcbiAgICByZWRlZmluZUFsbChDLnByb3RvdHlwZSwgbWV0aG9kcyk7XG4gICAgbWV0YS5ORUVEID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBDID0gd3JhcHBlcihmdW5jdGlvbih0YXJnZXQsIGl0ZXJhYmxlKXtcbiAgICAgIGFuSW5zdGFuY2UodGFyZ2V0LCBDLCBOQU1FLCAnX2MnKTtcbiAgICAgIHRhcmdldC5fYyA9IG5ldyBCYXNlO1xuICAgICAgaWYoaXRlcmFibGUgIT0gdW5kZWZpbmVkKWZvck9mKGl0ZXJhYmxlLCBJU19NQVAsIHRhcmdldFtBRERFUl0sIHRhcmdldCk7XG4gICAgfSk7XG4gICAgZWFjaCgnYWRkLGNsZWFyLGRlbGV0ZSxmb3JFYWNoLGdldCxoYXMsc2V0LGtleXMsdmFsdWVzLGVudHJpZXMsdG9KU09OJy5zcGxpdCgnLCcpLGZ1bmN0aW9uKEtFWSl7XG4gICAgICB2YXIgSVNfQURERVIgPSBLRVkgPT0gJ2FkZCcgfHwgS0VZID09ICdzZXQnO1xuICAgICAgaWYoS0VZIGluIHByb3RvICYmICEoSVNfV0VBSyAmJiBLRVkgPT0gJ2NsZWFyJykpaGlkZShDLnByb3RvdHlwZSwgS0VZLCBmdW5jdGlvbihhLCBiKXtcbiAgICAgICAgYW5JbnN0YW5jZSh0aGlzLCBDLCBLRVkpO1xuICAgICAgICBpZighSVNfQURERVIgJiYgSVNfV0VBSyAmJiAhaXNPYmplY3QoYSkpcmV0dXJuIEtFWSA9PSAnZ2V0JyA/IHVuZGVmaW5lZCA6IGZhbHNlO1xuICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5fY1tLRVldKGEgPT09IDAgPyAwIDogYSwgYik7XG4gICAgICAgIHJldHVybiBJU19BRERFUiA/IHRoaXMgOiByZXN1bHQ7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZignc2l6ZScgaW4gcHJvdG8pZFAoQy5wcm90b3R5cGUsICdzaXplJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gdGhpcy5fYy5zaXplO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc2V0VG9TdHJpbmdUYWcoQywgTkFNRSk7XG5cbiAgT1tOQU1FXSA9IEM7XG4gICRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GLCBPKTtcblxuICBpZighSVNfV0VBSyljb21tb24uc2V0U3Ryb25nKEMsIE5BTUUsIElTX01BUCk7XG5cbiAgcmV0dXJuIEM7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvbGxlY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IDE2NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIDAgLT4gQXJyYXkjZm9yRWFjaFxuLy8gMSAtPiBBcnJheSNtYXBcbi8vIDIgLT4gQXJyYXkjZmlsdGVyXG4vLyAzIC0+IEFycmF5I3NvbWVcbi8vIDQgLT4gQXJyYXkjZXZlcnlcbi8vIDUgLT4gQXJyYXkjZmluZFxuLy8gNiAtPiBBcnJheSNmaW5kSW5kZXhcbnZhciBjdHggICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgSU9iamVjdCAgPSByZXF1aXJlKCcuL19pb2JqZWN0JylcbiAgLCB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIGFzYyAgICAgID0gcmVxdWlyZSgnLi9fYXJyYXktc3BlY2llcy1jcmVhdGUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oVFlQRSwgJGNyZWF0ZSl7XG4gIHZhciBJU19NQVAgICAgICAgID0gVFlQRSA9PSAxXG4gICAgLCBJU19GSUxURVIgICAgID0gVFlQRSA9PSAyXG4gICAgLCBJU19TT01FICAgICAgID0gVFlQRSA9PSAzXG4gICAgLCBJU19FVkVSWSAgICAgID0gVFlQRSA9PSA0XG4gICAgLCBJU19GSU5EX0lOREVYID0gVFlQRSA9PSA2XG4gICAgLCBOT19IT0xFUyAgICAgID0gVFlQRSA9PSA1IHx8IElTX0ZJTkRfSU5ERVhcbiAgICAsIGNyZWF0ZSAgICAgICAgPSAkY3JlYXRlIHx8IGFzYztcbiAgcmV0dXJuIGZ1bmN0aW9uKCR0aGlzLCBjYWxsYmFja2ZuLCB0aGF0KXtcbiAgICB2YXIgTyAgICAgID0gdG9PYmplY3QoJHRoaXMpXG4gICAgICAsIHNlbGYgICA9IElPYmplY3QoTylcbiAgICAgICwgZiAgICAgID0gY3R4KGNhbGxiYWNrZm4sIHRoYXQsIDMpXG4gICAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKHNlbGYubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSAwXG4gICAgICAsIHJlc3VsdCA9IElTX01BUCA/IGNyZWF0ZSgkdGhpcywgbGVuZ3RoKSA6IElTX0ZJTFRFUiA/IGNyZWF0ZSgkdGhpcywgMCkgOiB1bmRlZmluZWRcbiAgICAgICwgdmFsLCByZXM7XG4gICAgZm9yKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKylpZihOT19IT0xFUyB8fCBpbmRleCBpbiBzZWxmKXtcbiAgICAgIHZhbCA9IHNlbGZbaW5kZXhdO1xuICAgICAgcmVzID0gZih2YWwsIGluZGV4LCBPKTtcbiAgICAgIGlmKFRZUEUpe1xuICAgICAgICBpZihJU19NQVApcmVzdWx0W2luZGV4XSA9IHJlczsgICAgICAgICAgICAvLyBtYXBcbiAgICAgICAgZWxzZSBpZihyZXMpc3dpdGNoKFRZUEUpe1xuICAgICAgICAgIGNhc2UgMzogcmV0dXJuIHRydWU7ICAgICAgICAgICAgICAgICAgICAvLyBzb21lXG4gICAgICAgICAgY2FzZSA1OiByZXR1cm4gdmFsOyAgICAgICAgICAgICAgICAgICAgIC8vIGZpbmRcbiAgICAgICAgICBjYXNlIDY6IHJldHVybiBpbmRleDsgICAgICAgICAgICAgICAgICAgLy8gZmluZEluZGV4XG4gICAgICAgICAgY2FzZSAyOiByZXN1bHQucHVzaCh2YWwpOyAgICAgICAgICAgICAgIC8vIGZpbHRlclxuICAgICAgICB9IGVsc2UgaWYoSVNfRVZFUlkpcmV0dXJuIGZhbHNlOyAgICAgICAgICAvLyBldmVyeVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gSVNfRklORF9JTkRFWCA/IC0xIDogSVNfU09NRSB8fCBJU19FVkVSWSA/IElTX0VWRVJZIDogcmVzdWx0O1xuICB9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1tZXRob2RzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyA5LjQuMi4zIEFycmF5U3BlY2llc0NyZWF0ZShvcmlnaW5hbEFycmF5LCBsZW5ndGgpXG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi9fYXJyYXktc3BlY2llcy1jb25zdHJ1Y3RvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9yaWdpbmFsLCBsZW5ndGgpe1xuICByZXR1cm4gbmV3IChzcGVjaWVzQ29uc3RydWN0b3Iob3JpZ2luYWwpKShsZW5ndGgpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1zcGVjaWVzLWNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTY2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBpc0FycmF5ICA9IHJlcXVpcmUoJy4vX2lzLWFycmF5JylcbiAgLCBTUEVDSUVTICA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob3JpZ2luYWwpe1xuICB2YXIgQztcbiAgaWYoaXNBcnJheShvcmlnaW5hbCkpe1xuICAgIEMgPSBvcmlnaW5hbC5jb25zdHJ1Y3RvcjtcbiAgICAvLyBjcm9zcy1yZWFsbSBmYWxsYmFja1xuICAgIGlmKHR5cGVvZiBDID09ICdmdW5jdGlvbicgJiYgKEMgPT09IEFycmF5IHx8IGlzQXJyYXkoQy5wcm90b3R5cGUpKSlDID0gdW5kZWZpbmVkO1xuICAgIGlmKGlzT2JqZWN0KEMpKXtcbiAgICAgIEMgPSBDW1NQRUNJRVNdO1xuICAgICAgaWYoQyA9PT0gbnVsbClDID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfSByZXR1cm4gQyA9PT0gdW5kZWZpbmVkID8gQXJyYXkgOiBDO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1zcGVjaWVzLWNvbnN0cnVjdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxNjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vRGF2aWRCcnVhbnQvTWFwLVNldC5wcm90b3R5cGUudG9KU09OXG52YXIgJGV4cG9ydCAgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LlIsICdNYXAnLCB7dG9KU09OOiByZXF1aXJlKCcuL19jb2xsZWN0aW9uLXRvLWpzb24nKSgnTWFwJyl9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5tYXAudG8tanNvbi5qc1xuLy8gbW9kdWxlIGlkID0gMTY4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL0RhdmlkQnJ1YW50L01hcC1TZXQucHJvdG90eXBlLnRvSlNPTlxudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuL19jbGFzc29mJylcbiAgLCBmcm9tICAgID0gcmVxdWlyZSgnLi9fYXJyYXktZnJvbS1pdGVyYWJsZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihOQU1FKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIHRvSlNPTigpe1xuICAgIGlmKGNsYXNzb2YodGhpcykgIT0gTkFNRSl0aHJvdyBUeXBlRXJyb3IoTkFNRSArIFwiI3RvSlNPTiBpc24ndCBnZW5lcmljXCIpO1xuICAgIHJldHVybiBmcm9tKHRoaXMpO1xuICB9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2xsZWN0aW9uLXRvLWpzb24uanNcbi8vIG1vZHVsZSBpZCA9IDE2OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBmb3JPZiA9IHJlcXVpcmUoJy4vX2Zvci1vZicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXIsIElURVJBVE9SKXtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3JPZihpdGVyLCBmYWxzZSwgcmVzdWx0LnB1c2gsIHJlc3VsdCwgSVRFUkFUT1IpO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWZyb20taXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDE3MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImltcG9ydCAnLi9wb3AuY3NzJztcbmltcG9ydCB7XG4gICAgd2luLFxuICAgIGRvYyxcbiAgICBQcm9taXNlLFxuICAgIHF1ZXJ5LFxuICAgIHF1ZXJ5QWxsLFxuICAgIGdldFJlY3QsXG4gICAgZ2V0RGlzdGFuY2UsXG4gICAgcmFmLFxuICAgIGRlbGF5XG59IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcCB7XG4gICAgY29uc3RydWN0b3Iodmlld3BvcnQpIHtcbiAgICAgICAgdGhpcy5wb3BFbCA9IHF1ZXJ5KHZpZXdwb3J0LCAnI3BvcCcpO1xuICAgIH1cblxuICAgIHJlYWR5KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50RWwgPSBxdWVyeSh0aGlzLnBvcEVsLCAnLmNvbnRlbnQnKTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VFbCA9IHF1ZXJ5KHRoaXMucG9wRWwsICcucG9wQ2xvc2UnKTtcbiAgICAgICAgICAgIHRoaXMudGl0bGVFbCA9IHF1ZXJ5KHRoaXMucG9wRWwsICcudGl0bGUnKTtcbiAgICAgICAgICAgIHRoaXMudGV4dEVsID0gcXVlcnkodGhpcy5wb3BFbCwgJy50ZXh0Jyk7XG4gICAgICAgICAgICB0aGlzLmJnMUVsID0gcXVlcnkodGhpcy5wb3BFbCwgJy5wb3BCZzEnKTtcbiAgICAgICAgICAgIHRoaXMuYmcyRWwgPSBxdWVyeSh0aGlzLnBvcEVsLCAnLnBvcEJnMicpO1xuICAgICAgICAgICAgdGhpcy5idG5zRWwgPSBxdWVyeSh0aGlzLnBvcEVsLCAnLmJ0bnMnKTtcbiAgICAgICAgICAgIHRoaXMubGVmdEJ0bkVsID0gcXVlcnkodGhpcy5wb3BFbCwgJy5wb3BCdG4ubGVmdCcpO1xuICAgICAgICAgICAgdGhpcy5yaWdodEJ0bkVsID0gcXVlcnkodGhpcy5wb3BFbCwgJy5wb3BCdG4ucmlnaHQnKTtcblxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgdGhpcy5jb250ZW50RWwuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgICB0aGlzLmJ0bnNFbC5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgICAgIHRoaXMucG9wRWwuY2xhc3NOYW1lID0gdGhpcy5wb3BFbC5jbGFzc05hbWUucmVwbGFjZSgnb3BlbicsICdjbG9zZScpO1xuXG4gICAgICAgIHJldHVybiBkZWxheSg2MDApLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wb3BFbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICAgICAgICB0aGlzLnBvcEVsLmNsYXNzTmFtZSA9ICcnO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwb3B1cCh7XG4gICAgICAgIHNoYXJlYmxlLFxuICAgICAgICB0aXRsZSxcbiAgICAgICAgdGV4dCxcbiAgICAgICAgYmdUeXBlLFxuICAgICAgICBvbmxlZnRjbGljayxcbiAgICAgICAgb25yaWdodGNsaWNrLFxuICAgICAgICBvbmNsb3NlY2xpY2tcbiAgICB9KSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBvcEVsLnN0eWxlLmRpc3BsYXkgPSAnJztcblxuICAgICAgICAgICAgdGhpcy50aXRsZUVsLnRleHRDb250ZW50ID0gdGl0bGU7XG4gICAgICAgICAgICB0aGlzLnRleHRFbC5pbm5lckhUTUwgPSB0ZXh0O1xuICAgICAgICAgICAgdGhpcy5wb3BFbC5jbGFzc05hbWUgKz0gYCAgYmcke2JnVHlwZX1gO1xuXG4gICAgICAgICAgICBpZiAoc2hhcmVibGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvcEVsLmNsYXNzTmFtZSArPSBgIHNoYXJlYmxlYDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgaGFuZGxlciA9IChlKSA9PiB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMubGVmdEJ0bkVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RhcCcsIG9uTGVmdENsaWNrKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0QnRuRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndGFwJywgb25SaWdodENsaWNrKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndGFwJywgb25DbG9zZUNsaWNrKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uTGVmdENsaWNrKGUpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyKGUpLnRoZW4oKCkgPT4gb25sZWZ0Y2xpY2sgJiYgb25sZWZ0Y2xpY2soKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubGVmdEJ0bkVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RhcCcsIG9uTGVmdENsaWNrKTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gb25SaWdodENsaWNrKGUpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyKGUpLnRoZW4oKCkgPT4gb25yaWdodGNsaWNrICYmIG9ucmlnaHRjbGljaygpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yaWdodEJ0bkVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RhcCcsIG9uUmlnaHRDbGljayk7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uQ2xvc2VDbGljayhlKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcihlKS50aGVuKCgpID0+IG9uY2xvc2VjbGljayAmJiBvbmNsb3NlY2xpY2soKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY2xvc2VFbC5hZGRFdmVudExpc3RlbmVyKCd0YXAnLCBvbkNsb3NlQ2xpY2spO1xuXG4gICAgICAgICAgICByYWYoKCkgPT4gdGhpcy5wb3BFbC5jbGFzc05hbWUgKz0gJyBvcGVuJyk7XG5cbiAgICAgICAgICAgIGRlbGF5KDQwMCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50RWwuc3R5bGUudmlzaWJpbGl0eSA9ICcnO1xuICAgICAgICAgICAgICAgIHRoaXMuYnRuc0VsLnN0eWxlLnZpc2liaWxpdHkgPSAnJztcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9wb3AuanMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vcG9wLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi8uLi9ub2RlX21vZHVsZXMvLjAuMTMuMUBzdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vcG9wLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vcG9wLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcG9wLmNzc1xuLy8gbW9kdWxlIGlkID0gMTcyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIjcG9wIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiAwO1xcbiAgICB0b3A6IDA7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC42KTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVooOTk5OXB4KTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICAgIC13ZWJraXQtYm94LXBhY2s6IGNlbnRlcjtcXG4gICAgLXdlYmtpdC1ib3gtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuI3BvcCAud3JhcCB7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMDtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbiNwb3AgLnBvcFBhbmVsIHtcXG4gICAgd2lkdGg6IDUwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogMjAwJSAxMDAlO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4jcG9wLnNoYXJlYmxlIC5wb3BQYW5lbCB7XFxuICAgIGhlaWdodDogODglO1xcbn1cXG5cXG4jcG9wIC5wb3BQYW5lbC5sZWZ0IHtcXG4gICAgbGVmdDogMDtcXG4gICAgdG9wOiAwO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAtMTAwJSAwO1xcbn1cXG5cXG4jcG9wIC5wb3BQYW5lbC5yaWdodCB7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICB0b3A6IDA7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDIwMCUgMDtcXG59XFxuXFxuI3BvcC5vcGVuIC5wb3BQYW5lbC5sZWZ0IHtcXG4gICAgLXdlYmtpdC1hbmltYXRpb246IG9wZW5sZWZ0d2luIDAuNHMgZWFzZS1vdXQgMHMgZm9yd2FyZHM7XFxufVxcblxcbiNwb3Aub3BlbiAucG9wUGFuZWwucmlnaHQge1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogb3BlbnJpZ2h0d2luIDAuNHMgZWFzZS1vdXQgMHMgZm9yd2FyZHM7XFxufVxcblxcbiNwb3AuY2xvc2UgLnBvcFBhbmVsLmxlZnQge1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogY2xvc2VsZWZ0d2luIDAuNHMgZWFzZS1pbiAwcyBmb3J3YXJkcztcXG59XFxuXFxuI3BvcC5jbG9zZSAucG9wUGFuZWwucmlnaHQge1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogY2xvc2VyaWdodHdpbiAwLjRzIGVhc2UtaW4gMHMgZm9yd2FyZHM7XFxufVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBvcGVubGVmdHdpbiB7XFxuICAgIDAlIHtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IC0xMDAlIDA7XFxuICAgIH1cXG5cXG4gICAgMTAwJSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XFxuICAgIH1cXG59XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIG9wZW5yaWdodHdpbiB7XFxuICAgIDAlIHtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDIwMCUgMDtcXG4gICAgfVxcblxcbiAgICAxMDAlIHtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDEwMCUgMDtcXG4gICAgfVxcbn1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgY2xvc2VsZWZ0d2luIHtcXG4gICAgMCUge1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwO1xcbiAgICB9XFxuXFxuICAgIDEwMCUge1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogLTEwMCUgMDtcXG4gICAgfVxcbn1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgY2xvc2VyaWdodHdpbiB7XFxuICAgIDAlIHtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDEwMCUgMDtcXG4gICAgfVxcblxcbiAgICAxMDAlIHtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDIwMCUgMDtcXG4gICAgfVxcbn1cXG5cXG4jcG9wIC5jb250ZW50IHtcXG4gICAgd2lkdGg6IDguNTNyZW07XFxuICAgIGhlaWdodDogNy44NHJlbTtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4jcG9wIC5wb3BCZzEge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAzLjM2cmVtO1xcbiAgICBoZWlnaHQ6IDIuOTJyZW07XFxuICAgIHJpZ2h0OiA1cHg7XFxuICAgIGJvdHRvbTogMnB4O1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXG59XFxuXFxuI3BvcC5iZzEgLnBvcEJnMSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4jcG9wIC5wb3BCZzIge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiA0LjM2cmVtO1xcbiAgICBoZWlnaHQ6IDMuMzQ2cmVtO1xcbiAgICByaWdodDogNXB4O1xcbiAgICBib3R0b206IDJweDtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxufVxcblxcbiNwb3AuYmcyIC5wb3BCZzIge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuI3BvcCAucG9wQmczIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogNC42MjZyZW07XFxuICAgIGhlaWdodDogMy41MDZyZW07XFxuICAgIHJpZ2h0OiA1cHg7XFxuICAgIGJvdHRvbTogMnB4O1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXG59XFxuXFxuI3BvcC5iZzMgLnBvcEJnMyB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4jcG9wIC5wb3BUaXAxIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiAwLjQ2N3JlbTtcXG4gICAgdG9wOiAxLjFyZW07XFxuICAgIHdpZHRoOiAxLjg2N3JlbTtcXG4gICAgaGVpZ2h0OiAxcmVtO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDFyZW07XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXG4gICAgLXdlYmtpdC1hbmltYXRpb246IHR5cGV0ZXh0MSAxLjVzIGxpbmVhciAwcyBpbmZpbml0ZTtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIHR5cGV0ZXh0MSB7XFxuICAgIDAlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMDAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMXJlbTtcXG4gICAgfVxcblxcbiAgICAxNiUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwMCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAxcmVtO1xcbiAgICB9XFxuICAgIDE2LjY2NyUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTgzLjMzMyUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjgzM3JlbTtcXG4gICAgfVxcblxcbiAgICAzMyUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTgzLjMzMyUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjgzM3JlbTtcXG4gICAgfVxcbiAgICAzMy4zMzMlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC02Ni42NjYlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC42NjZyZW07XFxuICAgIH1cXG5cXG4gICAgNDkuOTk5JSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNjYuNjY2JSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuNjY2cmVtO1xcbiAgICB9XFxuICAgIDUwJSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC41cmVtO1xcbiAgICB9XFxuXFxuICAgIDY2JSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC41cmVtO1xcbiAgICB9XFxuICAgIDY2LjY2NiUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTMzLjMzMyUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjMzM3JlbTtcXG4gICAgfVxcblxcbiAgICA4MyUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTMzLjMzMyUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjMzM3JlbTtcXG4gICAgfVxcbiAgICA4My4zMzMlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xNi42NjclKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC4xNjdyZW07XFxuICAgIH1cXG5cXG4gICAgOTkuOTk5JSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTYuNjY3JSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuMTY3cmVtO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwO1xcbiAgICB9XFxufVxcblxcblxcbiNwb3AgLnBvcFRpcDIge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxlZnQ6IDAuNDY3cmVtO1xcbiAgICB0b3A6IDQuNjhyZW07XFxuICAgIHdpZHRoOiAxLjg2N3JlbTtcXG4gICAgaGVpZ2h0OiAxLjU3M3JlbTtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAxLjU3M3JlbTtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogdHlwZXRleHQyIDJzIGxpbmVhciAwcyBpbmZpbml0ZTtcXG59XFxuXFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIHR5cGV0ZXh0MiB7XFxuICAgIDAlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMDAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMS41NzNyZW07XFxuICAgIH1cXG5cXG4gICAgOS45OTklIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMDAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMS41NzNyZW07XFxuICAgIH1cXG4gICAgMTAlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC05MCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAxLjQxNXJlbTtcXG4gICAgfVxcblxcbiAgICAxOS45OTklIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC05MCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAxLjQxNXJlbTtcXG4gICAgfVxcbiAgICAyMCUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTgwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDEuMjU4cmVtO1xcbiAgICB9XFxuXFxuICAgIDI5Ljk5OSUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTgwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDEuMjU4cmVtO1xcbiAgICB9XFxuICAgIDMwJSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNzAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMS4xMDFyZW07XFxuICAgIH1cXG5cXG4gICAgMzkuOTk5JSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNzAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMS4xMDFyZW07XFxuICAgIH1cXG4gICAgNDAlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC02MCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjk0MzhyZW07XFxuICAgIH1cXG5cXG4gICAgNDkuOTk5JSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNjAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC45NDM4cmVtO1xcbiAgICB9XFxuICAgIDUwJSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC43ODY1cmVtO1xcbiAgICB9XFxuXFxuICAgIDU5Ljk5OSUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuNzg2NXJlbTtcXG4gICAgfVxcbiAgICA2MCUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTQwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuNjI5MnJlbTtcXG4gICAgfVxcblxcbiAgICA2OS45OTklIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC00MCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjYyOTJyZW07XFxuICAgIH1cXG4gICAgNzAlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjQ3MTlyZW07XFxuICAgIH1cXG5cXG4gICAgNzkuOTk5JSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMzAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC40NzE5cmVtO1xcbiAgICB9XFxuICAgIDgwJSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMjAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC4zMTQ2cmVtO1xcbiAgICB9XFxuXFxuICAgIDg5Ljk5OSUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTIwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuMzE0NnJlbTtcXG4gICAgfVxcbiAgICA5MCUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuMTU3M3JlbTtcXG4gICAgfVxcblxcbiAgICA5OS45OTklIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjE1NzNyZW07XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMDtcXG4gICAgfVxcbn1cXG5cXG4jcG9wIC5wb3BJY29uIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiAwLjRyZW07XFxuICAgIHRvcDogMi4yMjZyZW07XFxuICAgIHdpZHRoOiAxLjhyZW07XFxuICAgIGhlaWdodDogMi4yNTNyZW07XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMDtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1zaXplOiAzLjZyZW0gMi4yNTNyZW07XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzcHJpdGVzIDFzIGxpbmVhciAwcyBpbmZpbml0ZTtcXG59XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIHNwcml0ZXMge1xcbiAgICAwJSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XFxuICAgIH1cXG5cXG4gICAgNDkuOTk5JSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XFxuICAgIH1cXG5cXG4gICAgNTAlIHtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IC0xLjhyZW0gMDtcXG4gICAgfVxcblxcbiAgICAxMDAlIHtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IC0xLjhyZW0gMDtcXG4gICAgfSBcXG59XFxuXFxuI3BvcCAudGl0bGUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiA1cmVtO1xcbiAgICBsZWZ0OiAyLjRyZW07XFxuICAgIHRvcDogMS4yOTNyZW07XFxuICAgIGZvbnQtc2l6ZTogMThweDtcXG4gICAgY29sb3I6ICNGRkY7XFxuICAgIHRleHQtc2hhZG93OlxcbiAgICAgICAgMnB4IDAgMnB4IHJnYmEoMCwgMjAzLCAyMjcsIDAuMyksXFxuICAgICAgICAwIDJweCAycHggcmdiYSgwLCAyMDMsIDIyNywgMC4zKSwgXFxuICAgICAgICAwIC0ycHggMnB4IHJnYmEoMCwgMjAzLCAyMjcsIDAuMyksXFxuICAgICAgICAtMnB4IDAgMnB4IHJnYmEoMCwgMjAzLCAyMjcsIDAuMyk7XFxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxufVxcblxcbiNwb3AgLnRleHQge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiA1cmVtO1xcbiAgICBsZWZ0OiAyLjRyZW07XFxuICAgIHRvcDogMi4yODZyZW07XFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgY29sb3I6ICMwMGNiZTM7XFxuICAgIHRleHQtc2hhZG93OlxcbiAgICAgICAgMXB4IDAgMXB4IHJnYmEoMCwgMjAzLCAyMjcsIDAuMyksXFxuICAgICAgICAwIDFweCAxcHggcmdiYSgwLCAyMDMsIDIyNywgMC4zKSwgXFxuICAgICAgICAwIC0xcHggMXB4IHJnYmEoMCwgMjAzLCAyMjcsIDAuMyksXFxuICAgICAgICAtMXB4IDAgMXB4IHJnYmEoMCwgMjAzLCAyMjcsIDAuMyk7XFxufVxcblxcbiNwb3AgLnBvcENsb3NlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiAwO1xcbiAgICBib3R0b206IDAuNTQ2cmVtO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxLjJyZW07XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogMS4ycmVtIDEuMnJlbTtcXG59XFxuXFxuI3BvcC5zaGFyZWJsZSAucG9wQ2xvc2Uge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4jcG9wIC5idG5zIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIC13ZWJraXQtYm94LXBhY2s6IGNlbnRlcjtcXG4gICAgLXdlYmtpdC1ib3gtYWxpZ246IGNlbnRlcjsgXFxuICAgIHBhZGRpbmctdG9wOiAwLjVyZW07XFxufVxcblxcbiNwb3Auc2hhcmVibGUgLmJ0bnN7XFxuICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbn1cXG5cXG4jcG9wIC5wb3BCdG4ge1xcbiAgICB3aWR0aDogMi42OHJlbTtcXG4gICAgaGVpZ2h0OiAwLjc3M3JlbTtcXG4gICAgbGluZS1oZWlnaHQ6IDAuNzczcmVtO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGNvbG9yOiAjRkZGO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXG4gICAgbWFyZ2luOiAwIDAuNHJlbTtcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjI1LjBAY3NzLWxvYWRlciEuL3NyYy9wb3AuY3NzXG4vLyBtb2R1bGUgaWQgPSAxNzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICcuL3RpcC5jc3MnO1xuaW1wb3J0IHtcbiAgICB3aW4sXG4gICAgZG9jLFxuICAgIFByb21pc2UsXG4gICAgcXVlcnksXG4gICAgcXVlcnlBbGwsXG4gICAgZ2V0UmVjdCxcbiAgICBnZXREaXN0YW5jZSxcbiAgICByYWYsXG4gICAgZGVsYXlcbn0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlwIHtcbiAgICBjb25zdHJ1Y3Rvcih2aWV3cG9ydCkge1xuICAgICAgICB0aGlzLnRpcEVsID0gcXVlcnkodmlld3BvcnQsICcjdGlwJyk7XG4gICAgfVxuXG4gICAgc2hvdyh7XG4gICAgICAgIHRpcCxcbiAgICAgICAgYmdUeXBlXG4gICAgfSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50aXBFbC5jbGFzc05hbWUgPSAndGlwIG9wZW4nO1xuXG4gICAgICAgICAgICBkZWxheSg0MDApXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpcEVsLmNsYXNzTmFtZSA9IGB0aXAgb3BlbiBiZyR7YmdUeXBlfWA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dEVsLmlubmVySFRNTCA9IHRpcDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlbGF5KDUwMDApO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpcEVsLmNsYXNzTmFtZSA9ICd0aXAgY2xvc2UnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHRFbC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlbGF5KDQwMCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlwRWwuY2xhc3NOYW1lID0gJ3RpcCc7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZWFkeSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMudGV4dEVsID0gcXVlcnkodGhpcy50aXBFbCwgJ3AnKTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90aXAuanMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vdGlwLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi8uLi9ub2RlX21vZHVsZXMvLjAuMTMuMUBzdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vdGlwLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vdGlwLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdGlwLmNzc1xuLy8gbW9kdWxlIGlkID0gMTc1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIjdGlwIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICByaWdodDogMC43MjM1cmVtO1xcbiAgICB0b3A6IDEuMXJlbTtcXG4gICAgd2lkdGg6IDA7XFxuICAgIGhlaWdodDogMDtcXG4gICAgZm9udC1zaXplOiAwO1xcbiAgICBib3JkZXI6IDBweCBzb2xpZCAjMDBkZGYxO1xcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVooOTk5OXB4KTtcXG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiB3aWR0aCAwLjRzIGVhc2UtaW4gMHMsXFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0IDAuNHMgZWFzZS1pbiAwcztcXG4gICAgb3ZlcmZsb3c6IHZpc2libGU7XFxufVxcblxcbiN0aXAub3BlbiB7XFxuICAgIHdpZHRoOiA4LjU1M3JlbTtcXG4gICAgaGVpZ2h0OiAxLjg2NnJlbTtcXG4gICAgYm9yZGVyLXdpZHRoOiAxcHg7XFxufVxcblxcbiN0aXAuY2xvc2Uge1xcbiAgICBib3JkZXItd2lkdGg6IDFweDtcXG59XFxuXFxuI3RpcCBwIHtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgbGluZS1oZWlnaHQ6IDEuMmVtO1xcbiAgICBmb250LXNpemU6IDEycHg7XFxuICAgIGNvbG9yOiAjMDBkZGYxO1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBwYWRkaW5nLWxlZnQ6IDEyJTtcXG4gICAgcGFkZGluZy10b3A6IDYlO1xcbiAgICBwYWRkaW5nLXJpZ2h0OiAzMCU7XFxuICAgIG1hcmdpbjogMDtcXG5cXG59XFxuXFxuI3RpcCAuYmcge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICByaWdodDogMDtcXG4gICAgdG9wOiAwO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMDtcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluOyBcXG59XFxuXFxuI3RpcCAudGlwQmcxIHtcXG4gICAgd2lkdGg6IDIuODkyNHJlbTtcXG4gICAgaGVpZ2h0OiAyLjUycmVtO1xcbn1cXG5cXG4jdGlwIC50aXBCZzIge1xcbiAgICB3aWR0aDogMi43MDM2cmVtO1xcbiAgICBoZWlnaHQ6IDIuMzM1MnJlbTtcXG59XFxuXFxuI3RpcC5iZzEgLnRpcEJnMSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4jdGlwLmJnMiAudGlwQmcyIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4yNS4wQGNzcy1sb2FkZXIhLi9zcmMvdGlwLmNzc1xuLy8gbW9kdWxlIGlkID0gMTc2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAnLi9zaGFyZS5jc3MnO1xuaW1wb3J0IHhociBmcm9tICd4aHInO1xuaW1wb3J0IHtcbiAgICB3aW4sXG4gICAgZG9jLFxuICAgIFByb21pc2UsXG4gICAgcXVlcnksXG4gICAgcXVlcnlBbGwsXG4gICAgZ2V0UmVjdCxcbiAgICBnZXREaXN0YW5jZSxcbiAgICByYWYsXG4gICAgZGVsYXlcbn0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hhcmUge1xuICAgIGNvbnN0cnVjdG9yKHZpZXdwb3J0KSB7XG4gICAgICAgIHRoaXMuc2hhcmVFbCA9IHF1ZXJ5KHZpZXdwb3J0LCAnI3NoYXJlJyk7XG4gICAgICAgIHRoaXMud3hSZWFkeSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHNob3coe1xuICAgICAgICB0aXRsZSxcbiAgICAgICAgZGVzYyxcbiAgICAgICAgbGluayxcbiAgICAgICAgaW1nVXJsXG4gICAgfSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnd4UmVhZHkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBoaWRlID0gZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hhcmVFbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0YXAnLCBoaWRlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGFyZUVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNoYXJlRWwuYWRkRXZlbnRMaXN0ZW5lcigndGFwJywgaGlkZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGFyZUVsLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd3gub25NZW51U2hhcmVUaW1lbGluZSh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgICAgICAgICBsaW5rLFxuICAgICAgICAgICAgICAgICAgICBpbWdVcmwsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlc29sdmUsXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbDogcmVzb2x2ZVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgd3gub25NZW51U2hhcmVBcHBNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUsIC8vIOWIhuS6q+agh+mimFxuICAgICAgICAgICAgICAgICAgICBkZXNjLCAvLyDliIbkuqvmj4/ov7BcbiAgICAgICAgICAgICAgICAgICAgbGluaywgLy8g5YiG5Lqr6ZO+5o6lXG4gICAgICAgICAgICAgICAgICAgIGltZ1VybCwgLy8g5YiG5Lqr5Zu+5qCHXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdsaW5rJywgLy8g5YiG5Lqr57G75Z6LLG11c2lj44CBdmlkZW/miJZsaW5r77yM5LiN5aGr6buY6K6k5Li6bGlua1xuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXNvbHZlLFxuICAgICAgICAgICAgICAgICAgICBjYW5jZWw6IHJlc29sdmVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVhZHkoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSAnd3gucGhwJztcbiAgICAgICAgICAgIC8vIGNvbnN0IHVybCA9ICdodHRwOi8vbXAuaW1heGdpbmUubmV0L2tkL3RvdWNoaW5nMjAxNi93eC5waHAnOyAgICAgICAgICAgIFxuICAgICAgICAgICAgeGhyLmdldChgJHt1cmx9P21ldGhvZD1cImNhbGN1bGF0ZVwiYCwgKGVyciwgcmVzcCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGNvbmZpZztcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb25maWcgPSBKU09OLnBhcnNlKHJlc3AuYm9keSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaChlKSB7fVxuXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZ1xuICAgICAgICAgICAgICAgICAgICAgICAgJiYgKGNvbmZpZy5zdWNjZXNzID09PSB0cnVlIHx8IGNvbmZpZy5zdWNlc3MgPT09ICd0cnVlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLmRhdGEuanNBcGlMaXN0ID0gWydvbk1lbnVTaGFyZVRpbWVsaW5lJywgJ29uTWVudVNoYXJlQXBwTWVzc2FnZSddO1xuICAgICAgICAgICAgICAgICAgICB3eC5jb25maWcoY29uZmlnLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB3eC5yZWFkeSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnd4UmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2hhcmUuanMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vc2hhcmUuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLy4uL25vZGVfbW9kdWxlcy8uMC4xMy4xQHN0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvaW5kZXguanMhLi9zaGFyZS5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL3NoYXJlLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc2hhcmUuY3NzXG4vLyBtb2R1bGUgaWQgPSAxNzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIiNzaGFyZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGVmdDogMDtcXG4gICAgdG9wOiAwO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuOCk7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IHJpZ2h0IHRvcDtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVooOTk5OXB4KTtcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjI1LjBAY3NzLWxvYWRlciEuL3NyYy9zaGFyZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDE3OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciB3aW5kb3cgPSByZXF1aXJlKFwiZ2xvYmFsL3dpbmRvd1wiKVxudmFyIGlzRnVuY3Rpb24gPSByZXF1aXJlKFwiaXMtZnVuY3Rpb25cIilcbnZhciBwYXJzZUhlYWRlcnMgPSByZXF1aXJlKFwicGFyc2UtaGVhZGVyc1wiKVxudmFyIHh0ZW5kID0gcmVxdWlyZShcInh0ZW5kXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlWEhSXG5jcmVhdGVYSFIuWE1MSHR0cFJlcXVlc3QgPSB3aW5kb3cuWE1MSHR0cFJlcXVlc3QgfHwgbm9vcFxuY3JlYXRlWEhSLlhEb21haW5SZXF1ZXN0ID0gXCJ3aXRoQ3JlZGVudGlhbHNcIiBpbiAobmV3IGNyZWF0ZVhIUi5YTUxIdHRwUmVxdWVzdCgpKSA/IGNyZWF0ZVhIUi5YTUxIdHRwUmVxdWVzdCA6IHdpbmRvdy5YRG9tYWluUmVxdWVzdFxuXG5mb3JFYWNoQXJyYXkoW1wiZ2V0XCIsIFwicHV0XCIsIFwicG9zdFwiLCBcInBhdGNoXCIsIFwiaGVhZFwiLCBcImRlbGV0ZVwiXSwgZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgY3JlYXRlWEhSW21ldGhvZCA9PT0gXCJkZWxldGVcIiA/IFwiZGVsXCIgOiBtZXRob2RdID0gZnVuY3Rpb24odXJpLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgICAgICBvcHRpb25zID0gaW5pdFBhcmFtcyh1cmksIG9wdGlvbnMsIGNhbGxiYWNrKVxuICAgICAgICBvcHRpb25zLm1ldGhvZCA9IG1ldGhvZC50b1VwcGVyQ2FzZSgpXG4gICAgICAgIHJldHVybiBfY3JlYXRlWEhSKG9wdGlvbnMpXG4gICAgfVxufSlcblxuZnVuY3Rpb24gZm9yRWFjaEFycmF5KGFycmF5LCBpdGVyYXRvcikge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaXRlcmF0b3IoYXJyYXlbaV0pXG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc0VtcHR5KG9iail7XG4gICAgZm9yKHZhciBpIGluIG9iail7XG4gICAgICAgIGlmKG9iai5oYXNPd25Qcm9wZXJ0eShpKSkgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHJldHVybiB0cnVlXG59XG5cbmZ1bmN0aW9uIGluaXRQYXJhbXModXJpLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIHZhciBwYXJhbXMgPSB1cmlcblxuICAgIGlmIChpc0Z1bmN0aW9uKG9wdGlvbnMpKSB7XG4gICAgICAgIGNhbGxiYWNrID0gb3B0aW9uc1xuICAgICAgICBpZiAodHlwZW9mIHVyaSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgcGFyYW1zID0ge3VyaTp1cml9XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBwYXJhbXMgPSB4dGVuZChvcHRpb25zLCB7dXJpOiB1cml9KVxuICAgIH1cblxuICAgIHBhcmFtcy5jYWxsYmFjayA9IGNhbGxiYWNrXG4gICAgcmV0dXJuIHBhcmFtc1xufVxuXG5mdW5jdGlvbiBjcmVhdGVYSFIodXJpLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIG9wdGlvbnMgPSBpbml0UGFyYW1zKHVyaSwgb3B0aW9ucywgY2FsbGJhY2spXG4gICAgcmV0dXJuIF9jcmVhdGVYSFIob3B0aW9ucylcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZVhIUihvcHRpb25zKSB7XG4gICAgaWYodHlwZW9mIG9wdGlvbnMuY2FsbGJhY2sgPT09IFwidW5kZWZpbmVkXCIpe1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYWxsYmFjayBhcmd1bWVudCBtaXNzaW5nXCIpXG4gICAgfVxuXG4gICAgdmFyIGNhbGxlZCA9IGZhbHNlXG4gICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gY2JPbmNlKGVyciwgcmVzcG9uc2UsIGJvZHkpe1xuICAgICAgICBpZighY2FsbGVkKXtcbiAgICAgICAgICAgIGNhbGxlZCA9IHRydWVcbiAgICAgICAgICAgIG9wdGlvbnMuY2FsbGJhY2soZXJyLCByZXNwb25zZSwgYm9keSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlYWR5c3RhdGVjaGFuZ2UoKSB7XG4gICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgbG9hZEZ1bmMoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Qm9keSgpIHtcbiAgICAgICAgLy8gQ2hyb21lIHdpdGggcmVxdWVzdFR5cGU9YmxvYiB0aHJvd3MgZXJyb3JzIGFycm91bmQgd2hlbiBldmVuIHRlc3RpbmcgYWNjZXNzIHRvIHJlc3BvbnNlVGV4dFxuICAgICAgICB2YXIgYm9keSA9IHVuZGVmaW5lZFxuXG4gICAgICAgIGlmICh4aHIucmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGJvZHkgPSB4aHIucmVzcG9uc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJvZHkgPSB4aHIucmVzcG9uc2VUZXh0IHx8IGdldFhtbCh4aHIpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNKc29uKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGJvZHkgPSBKU09OLnBhcnNlKGJvZHkpXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJvZHlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlcnJvckZ1bmMoZXZ0KSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0VGltZXIpXG4gICAgICAgIGlmKCEoZXZ0IGluc3RhbmNlb2YgRXJyb3IpKXtcbiAgICAgICAgICAgIGV2dCA9IG5ldyBFcnJvcihcIlwiICsgKGV2dCB8fCBcIlVua25vd24gWE1MSHR0cFJlcXVlc3QgRXJyb3JcIikgKVxuICAgICAgICB9XG4gICAgICAgIGV2dC5zdGF0dXNDb2RlID0gMFxuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXZ0LCBmYWlsdXJlUmVzcG9uc2UpXG4gICAgfVxuXG4gICAgLy8gd2lsbCBsb2FkIHRoZSBkYXRhICYgcHJvY2VzcyB0aGUgcmVzcG9uc2UgaW4gYSBzcGVjaWFsIHJlc3BvbnNlIG9iamVjdFxuICAgIGZ1bmN0aW9uIGxvYWRGdW5jKCkge1xuICAgICAgICBpZiAoYWJvcnRlZCkgcmV0dXJuXG4gICAgICAgIHZhciBzdGF0dXNcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRUaW1lcilcbiAgICAgICAgaWYob3B0aW9ucy51c2VYRFIgJiYgeGhyLnN0YXR1cz09PXVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy9JRTggQ09SUyBHRVQgc3VjY2Vzc2Z1bCByZXNwb25zZSBkb2Vzbid0IGhhdmUgYSBzdGF0dXMgZmllbGQsIGJ1dCBib2R5IGlzIGZpbmVcbiAgICAgICAgICAgIHN0YXR1cyA9IDIwMFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RhdHVzID0gKHhoci5zdGF0dXMgPT09IDEyMjMgPyAyMDQgOiB4aHIuc3RhdHVzKVxuICAgICAgICB9XG4gICAgICAgIHZhciByZXNwb25zZSA9IGZhaWx1cmVSZXNwb25zZVxuICAgICAgICB2YXIgZXJyID0gbnVsbFxuXG4gICAgICAgIGlmIChzdGF0dXMgIT09IDApe1xuICAgICAgICAgICAgcmVzcG9uc2UgPSB7XG4gICAgICAgICAgICAgICAgYm9keTogZ2V0Qm9keSgpLFxuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHN0YXR1cyxcbiAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7fSxcbiAgICAgICAgICAgICAgICB1cmw6IHVyaSxcbiAgICAgICAgICAgICAgICByYXdSZXF1ZXN0OiB4aHJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMpeyAvL3JlbWVtYmVyIHhociBjYW4gaW4gZmFjdCBiZSBYRFIgZm9yIENPUlMgaW4gSUVcbiAgICAgICAgICAgICAgICByZXNwb25zZS5oZWFkZXJzID0gcGFyc2VIZWFkZXJzKHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVyciA9IG5ldyBFcnJvcihcIkludGVybmFsIFhNTEh0dHBSZXF1ZXN0IEVycm9yXCIpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVyciwgcmVzcG9uc2UsIHJlc3BvbnNlLmJvZHkpXG4gICAgfVxuXG4gICAgdmFyIHhociA9IG9wdGlvbnMueGhyIHx8IG51bGxcblxuICAgIGlmICgheGhyKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmNvcnMgfHwgb3B0aW9ucy51c2VYRFIpIHtcbiAgICAgICAgICAgIHhociA9IG5ldyBjcmVhdGVYSFIuWERvbWFpblJlcXVlc3QoKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHhociA9IG5ldyBjcmVhdGVYSFIuWE1MSHR0cFJlcXVlc3QoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGtleVxuICAgIHZhciBhYm9ydGVkXG4gICAgdmFyIHVyaSA9IHhoci51cmwgPSBvcHRpb25zLnVyaSB8fCBvcHRpb25zLnVybFxuICAgIHZhciBtZXRob2QgPSB4aHIubWV0aG9kID0gb3B0aW9ucy5tZXRob2QgfHwgXCJHRVRcIlxuICAgIHZhciBib2R5ID0gb3B0aW9ucy5ib2R5IHx8IG9wdGlvbnMuZGF0YSB8fCBudWxsXG4gICAgdmFyIGhlYWRlcnMgPSB4aHIuaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycyB8fCB7fVxuICAgIHZhciBzeW5jID0gISFvcHRpb25zLnN5bmNcbiAgICB2YXIgaXNKc29uID0gZmFsc2VcbiAgICB2YXIgdGltZW91dFRpbWVyXG4gICAgdmFyIGZhaWx1cmVSZXNwb25zZSA9IHtcbiAgICAgICAgYm9keTogdW5kZWZpbmVkLFxuICAgICAgICBoZWFkZXJzOiB7fSxcbiAgICAgICAgc3RhdHVzQ29kZTogMCxcbiAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgIHVybDogdXJpLFxuICAgICAgICByYXdSZXF1ZXN0OiB4aHJcbiAgICB9XG5cbiAgICBpZiAoXCJqc29uXCIgaW4gb3B0aW9ucyAmJiBvcHRpb25zLmpzb24gIT09IGZhbHNlKSB7XG4gICAgICAgIGlzSnNvbiA9IHRydWVcbiAgICAgICAgaGVhZGVyc1tcImFjY2VwdFwiXSB8fCBoZWFkZXJzW1wiQWNjZXB0XCJdIHx8IChoZWFkZXJzW1wiQWNjZXB0XCJdID0gXCJhcHBsaWNhdGlvbi9qc29uXCIpIC8vRG9uJ3Qgb3ZlcnJpZGUgZXhpc3RpbmcgYWNjZXB0IGhlYWRlciBkZWNsYXJlZCBieSB1c2VyXG4gICAgICAgIGlmIChtZXRob2QgIT09IFwiR0VUXCIgJiYgbWV0aG9kICE9PSBcIkhFQURcIikge1xuICAgICAgICAgICAgaGVhZGVyc1tcImNvbnRlbnQtdHlwZVwiXSB8fCBoZWFkZXJzW1wiQ29udGVudC1UeXBlXCJdIHx8IChoZWFkZXJzW1wiQ29udGVudC1UeXBlXCJdID0gXCJhcHBsaWNhdGlvbi9qc29uXCIpIC8vRG9uJ3Qgb3ZlcnJpZGUgZXhpc3RpbmcgYWNjZXB0IGhlYWRlciBkZWNsYXJlZCBieSB1c2VyXG4gICAgICAgICAgICBib2R5ID0gSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5qc29uID09PSB0cnVlID8gYm9keSA6IG9wdGlvbnMuanNvbilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSByZWFkeXN0YXRlY2hhbmdlXG4gICAgeGhyLm9ubG9hZCA9IGxvYWRGdW5jXG4gICAgeGhyLm9uZXJyb3IgPSBlcnJvckZ1bmNcbiAgICAvLyBJRTkgbXVzdCBoYXZlIG9ucHJvZ3Jlc3MgYmUgc2V0IHRvIGEgdW5pcXVlIGZ1bmN0aW9uLlxuICAgIHhoci5vbnByb2dyZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBJRSBtdXN0IGRpZVxuICAgIH1cbiAgICB4aHIub25hYm9ydCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIGFib3J0ZWQgPSB0cnVlO1xuICAgIH1cbiAgICB4aHIub250aW1lb3V0ID0gZXJyb3JGdW5jXG4gICAgeGhyLm9wZW4obWV0aG9kLCB1cmksICFzeW5jLCBvcHRpb25zLnVzZXJuYW1lLCBvcHRpb25zLnBhc3N3b3JkKVxuICAgIC8vaGFzIHRvIGJlIGFmdGVyIG9wZW5cbiAgICBpZighc3luYykge1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gISFvcHRpb25zLndpdGhDcmVkZW50aWFsc1xuICAgIH1cbiAgICAvLyBDYW5ub3Qgc2V0IHRpbWVvdXQgd2l0aCBzeW5jIHJlcXVlc3RcbiAgICAvLyBub3Qgc2V0dGluZyB0aW1lb3V0IG9uIHRoZSB4aHIgb2JqZWN0LCBiZWNhdXNlIG9mIG9sZCB3ZWJraXRzIGV0Yy4gbm90IGhhbmRsaW5nIHRoYXQgY29ycmVjdGx5XG4gICAgLy8gYm90aCBucG0ncyByZXF1ZXN0IGFuZCBqcXVlcnkgMS54IHVzZSB0aGlzIGtpbmQgb2YgdGltZW91dCwgc28gdGhpcyBpcyBiZWluZyBjb25zaXN0ZW50XG4gICAgaWYgKCFzeW5jICYmIG9wdGlvbnMudGltZW91dCA+IDAgKSB7XG4gICAgICAgIHRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmIChhYm9ydGVkKSByZXR1cm5cbiAgICAgICAgICAgIGFib3J0ZWQgPSB0cnVlLy9JRTkgbWF5IHN0aWxsIGNhbGwgcmVhZHlzdGF0ZWNoYW5nZVxuICAgICAgICAgICAgeGhyLmFib3J0KFwidGltZW91dFwiKVxuICAgICAgICAgICAgdmFyIGUgPSBuZXcgRXJyb3IoXCJYTUxIdHRwUmVxdWVzdCB0aW1lb3V0XCIpXG4gICAgICAgICAgICBlLmNvZGUgPSBcIkVUSU1FRE9VVFwiXG4gICAgICAgICAgICBlcnJvckZ1bmMoZSlcbiAgICAgICAgfSwgb3B0aW9ucy50aW1lb3V0IClcbiAgICB9XG5cbiAgICBpZiAoeGhyLnNldFJlcXVlc3RIZWFkZXIpIHtcbiAgICAgICAgZm9yKGtleSBpbiBoZWFkZXJzKXtcbiAgICAgICAgICAgIGlmKGhlYWRlcnMuaGFzT3duUHJvcGVydHkoa2V5KSl7XG4gICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoa2V5LCBoZWFkZXJzW2tleV0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMuaGVhZGVycyAmJiAhaXNFbXB0eShvcHRpb25zLmhlYWRlcnMpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkhlYWRlcnMgY2Fubm90IGJlIHNldCBvbiBhbiBYRG9tYWluUmVxdWVzdCBvYmplY3RcIilcbiAgICB9XG5cbiAgICBpZiAoXCJyZXNwb25zZVR5cGVcIiBpbiBvcHRpb25zKSB7XG4gICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSBvcHRpb25zLnJlc3BvbnNlVHlwZVxuICAgIH1cblxuICAgIGlmIChcImJlZm9yZVNlbmRcIiBpbiBvcHRpb25zICYmXG4gICAgICAgIHR5cGVvZiBvcHRpb25zLmJlZm9yZVNlbmQgPT09IFwiZnVuY3Rpb25cIlxuICAgICkge1xuICAgICAgICBvcHRpb25zLmJlZm9yZVNlbmQoeGhyKVxuICAgIH1cblxuICAgIHhoci5zZW5kKGJvZHkpXG5cbiAgICByZXR1cm4geGhyXG5cblxufVxuXG5mdW5jdGlvbiBnZXRYbWwoeGhyKSB7XG4gICAgaWYgKHhoci5yZXNwb25zZVR5cGUgPT09IFwiZG9jdW1lbnRcIikge1xuICAgICAgICByZXR1cm4geGhyLnJlc3BvbnNlWE1MXG4gICAgfVxuICAgIHZhciBmaXJlZm94QnVnVGFrZW5FZmZlY3QgPSB4aHIuc3RhdHVzID09PSAyMDQgJiYgeGhyLnJlc3BvbnNlWE1MICYmIHhoci5yZXNwb25zZVhNTC5kb2N1bWVudEVsZW1lbnQubm9kZU5hbWUgPT09IFwicGFyc2VyZXJyb3JcIlxuICAgIGlmICh4aHIucmVzcG9uc2VUeXBlID09PSBcIlwiICYmICFmaXJlZm94QnVnVGFrZW5FZmZlY3QpIHtcbiAgICAgICAgcmV0dXJuIHhoci5yZXNwb25zZVhNTFxuICAgIH1cblxuICAgIHJldHVybiBudWxsXG59XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjMuMkB4aHIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDE4MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gd2luZG93O1xufSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBnbG9iYWw7XG59IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiKXtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHNlbGY7XG59IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0ge307XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjQuMy4xQGdsb2JhbC93aW5kb3cuanNcbi8vIG1vZHVsZSBpZCA9IDE4MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGlzRnVuY3Rpb25cblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uIChmbikge1xuICB2YXIgc3RyaW5nID0gdG9TdHJpbmcuY2FsbChmbilcbiAgcmV0dXJuIHN0cmluZyA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJyB8fFxuICAgICh0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicgJiYgc3RyaW5nICE9PSAnW29iamVjdCBSZWdFeHBdJykgfHxcbiAgICAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgLy8gSUU4IGFuZCBiZWxvd1xuICAgICAoZm4gPT09IHdpbmRvdy5zZXRUaW1lb3V0IHx8XG4gICAgICBmbiA9PT0gd2luZG93LmFsZXJ0IHx8XG4gICAgICBmbiA9PT0gd2luZG93LmNvbmZpcm0gfHxcbiAgICAgIGZuID09PSB3aW5kb3cucHJvbXB0KSlcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjEuMC4xQGlzLWZ1bmN0aW9uL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxODJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHRyaW0gPSByZXF1aXJlKCd0cmltJylcbiAgLCBmb3JFYWNoID0gcmVxdWlyZSgnZm9yLWVhY2gnKVxuICAsIGlzQXJyYXkgPSBmdW5jdGlvbihhcmcpIHtcbiAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJnKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgICB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGhlYWRlcnMpIHtcbiAgaWYgKCFoZWFkZXJzKVxuICAgIHJldHVybiB7fVxuXG4gIHZhciByZXN1bHQgPSB7fVxuXG4gIGZvckVhY2goXG4gICAgICB0cmltKGhlYWRlcnMpLnNwbGl0KCdcXG4nKVxuICAgICwgZnVuY3Rpb24gKHJvdykge1xuICAgICAgICB2YXIgaW5kZXggPSByb3cuaW5kZXhPZignOicpXG4gICAgICAgICAgLCBrZXkgPSB0cmltKHJvdy5zbGljZSgwLCBpbmRleCkpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAsIHZhbHVlID0gdHJpbShyb3cuc2xpY2UoaW5kZXggKyAxKSlcblxuICAgICAgICBpZiAodHlwZW9mKHJlc3VsdFtrZXldKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICByZXN1bHRba2V5XSA9IHZhbHVlXG4gICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShyZXN1bHRba2V5XSkpIHtcbiAgICAgICAgICByZXN1bHRba2V5XS5wdXNoKHZhbHVlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdFtrZXldID0gWyByZXN1bHRba2V5XSwgdmFsdWUgXVxuICAgICAgICB9XG4gICAgICB9XG4gIClcblxuICByZXR1cm4gcmVzdWx0XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjAuMUBwYXJzZS1oZWFkZXJzL3BhcnNlLWhlYWRlcnMuanNcbi8vIG1vZHVsZSBpZCA9IDE4M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHRyaW07XG5cbmZ1bmN0aW9uIHRyaW0oc3RyKXtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKnxcXHMqJC9nLCAnJyk7XG59XG5cbmV4cG9ydHMubGVmdCA9IGZ1bmN0aW9uKHN0cil7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyovLCAnJyk7XG59O1xuXG5leHBvcnRzLnJpZ2h0ID0gZnVuY3Rpb24oc3RyKXtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMC4xQHRyaW0vaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDE4NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNGdW5jdGlvbiA9IHJlcXVpcmUoJ2lzLWZ1bmN0aW9uJylcblxubW9kdWxlLmV4cG9ydHMgPSBmb3JFYWNoXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHlcblxuZnVuY3Rpb24gZm9yRWFjaChsaXN0LCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgIGlmICghaXNGdW5jdGlvbihpdGVyYXRvcikpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignaXRlcmF0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uJylcbiAgICB9XG5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIHtcbiAgICAgICAgY29udGV4dCA9IHRoaXNcbiAgICB9XG4gICAgXG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobGlzdCkgPT09ICdbb2JqZWN0IEFycmF5XScpXG4gICAgICAgIGZvckVhY2hBcnJheShsaXN0LCBpdGVyYXRvciwgY29udGV4dClcbiAgICBlbHNlIGlmICh0eXBlb2YgbGlzdCA9PT0gJ3N0cmluZycpXG4gICAgICAgIGZvckVhY2hTdHJpbmcobGlzdCwgaXRlcmF0b3IsIGNvbnRleHQpXG4gICAgZWxzZVxuICAgICAgICBmb3JFYWNoT2JqZWN0KGxpc3QsIGl0ZXJhdG9yLCBjb250ZXh0KVxufVxuXG5mdW5jdGlvbiBmb3JFYWNoQXJyYXkoYXJyYXksIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGFycmF5LCBpKSkge1xuICAgICAgICAgICAgaXRlcmF0b3IuY2FsbChjb250ZXh0LCBhcnJheVtpXSwgaSwgYXJyYXkpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGZvckVhY2hTdHJpbmcoc3RyaW5nLCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBzdHJpbmcubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgLy8gbm8gc3VjaCB0aGluZyBhcyBhIHNwYXJzZSBzdHJpbmcuXG4gICAgICAgIGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgc3RyaW5nLmNoYXJBdChpKSwgaSwgc3RyaW5nKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZm9yRWFjaE9iamVjdChvYmplY3QsIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgZm9yICh2YXIgayBpbiBvYmplY3QpIHtcbiAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrKSkge1xuICAgICAgICAgICAgaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmplY3Rba10sIGssIG9iamVjdClcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4zLjJAZm9yLWVhY2gvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDE4NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGV4dGVuZFxuXG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG5mdW5jdGlvbiBleHRlbmQoKSB7XG4gICAgdmFyIHRhcmdldCA9IHt9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldXG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldFxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly40LjAuMUB4dGVuZC9pbW11dGFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDE4NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgJy4vbXVzaWMuY3NzJztcbmltcG9ydCB7XG4gICAgd2luLFxuICAgIGRvYyxcbiAgICBQcm9taXNlLFxuICAgIHF1ZXJ5LFxuICAgIHF1ZXJ5QWxsLFxuICAgIGdldFJlY3QsXG4gICAgZ2V0RGlzdGFuY2UsXG4gICAgcmFmLFxuICAgIGRlbGF5XG59IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE11c2ljIHtcbiAgICBjb25zdHJ1Y3Rvcih2aWV3cG9ydCwgaXRlbXMpIHtcbiAgICAgICAgdGhpcy5tdXNpY0VsID0gcXVlcnkodmlld3BvcnQsICcjbXVzaWMnKTtcbiAgICAgICAgdGhpcy5iYXJzRWwgPSBxdWVyeUFsbCh2aWV3cG9ydCwgJy5iYXInKTtcbiAgICAgICAgdGhpcy5hdWRpbyA9IGl0ZW1zWydtdXNpYyddLm9iajtcbiAgICB9XG5cbiAgICBwbGF5KCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYmFyc0VsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmJhcnNFbFtpXS5zdHlsZS5jc3NUZXh0ID0gYC13ZWJraXQtYW5pbWF0aW9uLWR1cmF0aW9uOiAke01hdGgucmFuZG9tKCkgKiAwLjMgKyAwLjN9c2A7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hdWRpby5wbGF5KCk7XG4gICAgICAgIHRoaXMubXVzaWNFbC5jbGFzc05hbWUgPSAnJztcbiAgICB9XG5cblxuICAgIHBhdXNlKCkge1xuICAgICAgICB0aGlzLmF1ZGlvLnBhdXNlKCk7XG4gICAgICAgIHRoaXMubXVzaWNFbC5jbGFzc05hbWUgPSAnbXV0ZSc7XG4gICAgfVxuXG4gICAgcmVhZHkoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmF1ZGlvLmxvb3AgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5tdXNpY0VsLnN0eWxlLmRpc3BsYXkgPSAnJztcblxuICAgICAgICAgICAgdGhpcy5tdXNpY0VsLmFkZEV2ZW50TGlzdGVuZXIoJ3RhcCcsIGUgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5hdWRpby5wYXVzZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbXVzaWMuanMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vbXVzaWMuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLy4uL25vZGVfbW9kdWxlcy8uMC4xMy4xQHN0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvaW5kZXguanMhLi9tdXNpYy5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL211c2ljLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbXVzaWMuY3NzXG4vLyBtb2R1bGUgaWQgPSAxODhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIiNtdXNpYyB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGVmdDogMC4zcmVtO1xcbiAgICB0b3A6IDAuNXJlbTtcXG4gICAgcGFkZGluZy1yaWdodDogMC4zcmVtO1xcbiAgICBwYWRkaW5nLWJvdHRvbTogMC41cmVtO1xcblxcbn1cXG5cXG4jbXVzaWMgLm11c2ljIHtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgd2lkdGg6IDE4cHg7XFxuICAgIGhlaWdodDogMTZweDtcXG4gICAgcGFkZGluZy1ib3R0b206IDJweDtcXG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICM1NTU7XFxufVxcblxcbiNtdXNpYyAuYmFycyB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgICAtd2Via2l0LWJveC1wYWNrOiBqdXN0aWZ5O1xcbiAgICAtd2Via2l0LWJveC1hbGlnbjogZW5kO1xcbn1cXG5cXG4jbXVzaWMgLmJhciB7XFxuICAgIHdpZHRoOiAxNCU7XFxuICAgIG1hcmdpbjogMSU7XFxuICAgIGhlaWdodDogMTUlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDBkZGYxO1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1uYW1lOiBwbGF5O1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogMHM7XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbi1vdXQ7XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uLWRpcmVjdGlvbjogYWx0ZXJuYXRlO1xcbn1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgcGxheSB7XFxuICAgIDAlIHtcXG4gICAgICAgIGhlaWdodDogMTUlO1xcbiAgICB9XFxuXFxuICAgIDEwMCUge1xcbiAgICAgICAgaGVpZ2h0OiA4MCU7XFxuICAgIH1cXG59XFxuXFxuXFxuI211c2ljLm11dGUgLmJhciB7XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBub25lO1xcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMjUuMEBjc3MtbG9hZGVyIS4vc3JjL211c2ljLmNzc1xuLy8gbW9kdWxlIGlkID0gMTg5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBsb2FkaW5nOiB7XG4gICAgICAgIHRleHRzOiBbXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgJ+ato+WcqOWKoOWFpe+8micsXG4gICAgICAgICAgICAgICAgJzXmu7Tpk7bmsrMnLFxuICAgICAgICAgICAgICAgICcy5p2f6YCD5LiN5Ye66buR5rSe55qE5YWJJyxcbiAgICAgICAgICAgICAgICAnMeS4quabtOWkp+eahOa4uOaIj+S4lueVjCcsXG4gICAgICAgICAgICAgICAgJzPnvJXlpKrpmLPpo44nLFxuICAgICAgICAgICAgICAgICc354mH54eD54On55qE6Zmo55+zJyxcbiAgICAgICAgICAgICAgICAnMeS4quS7sOacm+aYn+epuueahOS6uidcbiAgICAgICAgICAgIF1cbiAgICAgICAgXVxuICAgIH0sXG5cbiAgICBnbDogeyAvLyDlvIDlnLrlvJXlr7xcbiAgICAgICAgdHlwZTogJ3BvcHVwJyxcbiAgICAgICAgdGl0bGU6ICfmrKLov47mnaXliLBUR1DmuLjmiI/kuJbnlYwnLFxuICAgICAgICB0ZXh0OiAn6L+Z5piv5pWj5biD5Zyo5a6H5a6Z5Lit55qE56We56eY5Yqb6YeP77yM6ZuG6b2Q5omA5pyJ6YeR5biB77yM5Y+s5ZSk56We56eY4oCc6bih6IW/4oCd77yBJyxcbiAgICAgICAgc2hhcmVibGU6IGZhbHNlLFxuICAgICAgICBiZ1R5cGU6IDFcbiAgICB9LFxuXG4gICAgZm91bmQ1OiB7IC8vIOaJvuWIsDXkuKpcbiAgICAgICAgdHlwZTogJ3RpcCcsXG4gICAgICAgIHRpcDogJzXpopfmmJ/nkIPooqvkvaDngrnph5HvvIw8YnIvPuelnuenmOKAnem4oeiFv+KAneato+WQkeS9oOi1sOadpScsXG4gICAgICAgIGJnVHlwZTogMVxuICAgIH0sXG5cbiAgICBmb3VuZDE1OiB7IC8vIOaJvuWIsDE15LiqXG4gICAgICAgIHR5cGU6ICd0aXAnLFxuICAgICAgICB0aXA6ICfllYrvvIHov5jlt6415Liq77yBPGJyLz7nprvnpZ7np5jigJzpuKHohb/igJ3lsLHlj6rlt6415Liq5LqG77yBJyxcbiAgICAgICAgYmdUeXBlOiAyXG4gICAgfSxcblxuICAgIGZvdW5kMjA6IHsgLy8g5om+5YiwMjDkuKpcbiAgICAgICAgdHlwZTogJ3BvcHVwJyxcbiAgICAgICAgdGl0bGU6ICfmib7liLDlhajpg6jmuLjmiI/mmJ/nkIPvvIEnLFxuICAgICAgICB0ZXh0KGRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiBgJHtkYXRhLm195YiGJHtkYXRhLnN956eS77yM5oiR5Y+R546w5LqG5omA5pyJ5ri45oiP5pif55CD77yB5a6H5a6Z6L6j5LmI5aSn77yM5oiR55qE5omL5pyA5b+r77yBYFxuICAgICAgICB9LFxuICAgICAgICBiZ1R5cGU6IDMsXG4gICAgICAgIHNoYXJlYmxlOiB0cnVlXG4gICAgfSxcblxuICAgIGJsYWNrc2hlZXB3YWxsOiB7IC8vIOWcsOWbvuWFqOW8gFxuICAgICAgICB0eXBlOiAncG9wdXAnLFxuICAgICAgICB0aXRsZTogJ+aOoue0ouS6huaVtOS4quWuh+Wume+8gScsXG4gICAgICAgIHRleHQoZGF0YSkge1xuICAgICAgICAgICAgcmV0dXJuIGAke2RhdGEubX3liIYke2RhdGEuc33np5LvvIzmiJHlj5HnjrDkuoYke2RhdGEubn3kuKrmuLjmiI/mmJ/nkIPvvIHliankuIvnmoTmnInmnKzkuovkvaDmnaXmib7vvIFgXG4gICAgICAgIH0sXG4gICAgICAgIGJnVHlwZTogMixcbiAgICAgICAgc2hhcmVibGU6IHRydWVcbiAgICB9LFxuXG4gICAgZ2c6IHsgLy/lnLDlm77lhajlvIAgKyDmib7liLAyMOS4qlxuICAgICAgICB0eXBlOiAncG9wdXAnLMKgXG4gICAgICAgIHRpdGxlOiAn5om+5Yiw5YWo6YOo5ri45oiP5pif55CD77yBJyxcbiAgICAgICAgdGV4dChkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gYCR7ZGF0YS5tfeWIhiR7ZGF0YS5zfeenku+8jOaIkeWPkeeOsOS6huaJgOaciea4uOaIj+aYn+eQg++8geWuh+Wumei+o+S5iOWkp++8jOaIkeeahOaJi+acgOW/q++8gWBcbiAgICAgICAgfSxcbiAgICAgICAgYmdUeXBlOiAzLFxuICAgICAgICBzaGFyZWJsZTogdHJ1ZVxuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdGV4dENvbmZpZy5qcyJdLCJzb3VyY2VSb290IjoiIn0=