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
	
	var _elements2 = _interopRequireDefault(_elements);
	
	var _found = __webpack_require__(143);
	
	var _found2 = _interopRequireDefault(_found);
	
	var _map = __webpack_require__(146);
	
	var _map2 = _interopRequireDefault(_map);
	
	var _ticker = __webpack_require__(149);
	
	var _ticker2 = _interopRequireDefault(_ticker);
	
	var _pop = __webpack_require__(165);
	
	var _pop2 = _interopRequireDefault(_pop);
	
	var _tip = __webpack_require__(168);
	
	var _tip2 = _interopRequireDefault(_tip);
	
	var _share = __webpack_require__(171);
	
	var _share2 = _interopRequireDefault(_share);
	
	var _music = __webpack_require__(174);
	
	var _music2 = _interopRequireDefault(_music);
	
	var _textConfig = __webpack_require__(177);
	
	var _textConfig2 = _interopRequireDefault(_textConfig);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var preload = _util.win.assetsPreload,
	    items = _util.win.assetsItems;
	
	
	var viewport = (0, _util.query)(_util.doc.body, '#game');
	var scroller = void 0;
	var ticker = void 0;
	var stage = void 0;
	var helloWorld = void 0;
	var cloud = void 0;
	var star = void 0;
	var elements = void 0;
	var found = void 0;
	var map = void 0;
	var pop = void 0;
	var tip = void 0;
	var share = void 0;
	var music = void 0;
	
	function showShare() {
	    return share.show();
	}
	
	function showTip(config) {
	    return tip.show({
	        tip: config.tip,
	        bgType: config.bgType
	    });
	}
	
	function showPop(config) {
	    scroller && (scroller.enable = false);
	
	    return pop.popup({
	        title: config.title,
	        text: config.text,
	        shareble: config.shareble,
	        bgType: config.bgType,
	        onleftclick: function onleftclick() {
	            _util.Promise.all([pop.close(), showShare()]).then(function () {
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
	    var scrollSlowRatio = 1;
	    scroller = new _scroller2.default(stage.width, stage.height, stage.vw, stage.vh, scrollSlowRatio);
	    scroller.enable = false;
	    return scroller.ready();
	}).then(function () {
	    // things
	    var promises = [];
	
	    star = new _star2.default(stage, items);
	    promises.push(star.ready());
	
	    elements = new _elements2.default(stage, items);
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
	        found && found.update(stage.specialAmount, stage.specialFound, stage.totalAmount, stage.focusedAmount);
	
	        elements.drawImages(hoverSlice, focusSlice, scrollX, scrollY, e);
	        cloud.drawImages(hoverSlice, focusSlice, scrollX, scrollY, e);
	
	        stage.offscreenRender.clearRect(0, 0, stage.vw, stage.vh);
	        stage.offscreenRender.drawImage(star.image, 0, starRollY, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);
	        stage.offscreenRender.drawImage(elements.canvas, 0, 0, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);
	        stage.offscreenRender.drawImage(cloud.canvas, 0, 0, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);
	
	        stage.render.clearRect(0, 0, stage.vw, stage.vh);
	        stage.render.drawImage(stage.offscreenCanvas, 0, 0, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);
	    });
	}).then(function () {
	    // show helloworld
	    var repeat = 5;
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
	                showTip(config);
	            } else if (config.type === 'popup') {
	                showPop(config);
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
	    share = new _share2.default(viewport);
	    return share.ready();
	}).then(function () {
	    // music
	    music = new _music2.default(viewport, items);
	    return music.ready();
	}).then(function () {
	    // bone
	    var boneX = stage.width / 2 - stage.vw / 2;
	    var boneY = stage.height - stage.vh / 2;
	    scroller.enable = true;
	    scroller.scrollTo(boneX, boneY);
	})
	// .then(() => delay(2000))
	.then(function () {
	    // show guide
	    // showTip(textConfig.found5);
	    // showPop(textConfig.gg);
	    music.play();
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
	        coinX: 360,
	        coinY: 200
	    },
	    '23': {
	        distance: '1400光年',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 360,
	        coinY: 200
	    },
	    '28': {
	        distance: '980光年',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 360,
	        coinY: 200
	    },
	    '31': {
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 360,
	        coinY: 200
	    },
	    '34': {
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 360,
	        coinY: 200
	    },
	    '38': {
	        distance: '4000光年',
	        type: 1
	    },
	    '41': {
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 360,
	        coinY: 200
	    },
	    '44': {
	        distance: '400光年',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 360,
	        coinY: 200
	    },
	    '46': {
	        distance: '8.6光年',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 360,
	        coinY: 200
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
	        coinX: 360,
	        coinY: 200
	    },
	    '74': {
	        distance: '59亿公里',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 360,
	        coinY: 200
	    },
	    '76': {
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 360,
	        coinY: 200
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
	        coinX: 360,
	        coinY: 200
	    },
	    '84': {
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 360,
	        coinY: 200
	    },
	    '87': {
	        distance: '12.8亿公里',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 360,
	        coinY: 200
	    },
	    '91': {
	        type: 1
	    },
	    '94': {
	        distance: '1.496亿公里',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 360,
	        coinY: 200
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
	        coinX: 360,
	        coinY: 200
	    },
	    '113': {
	        distance: '4150万公里',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 360,
	        coinY: 200
	    },
	    '115': {
	        type: 2
	    },
	    '118': {
	        distance: '5500万公里',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 360,
	        coinY: 200
	    },
	    '120': {
	        type: 1,
	        isEarth: true
	    },
	    '121': {
	        distance: '0公里',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 360,
	        coinY: 200,
	        isEarth: true
	    },
	    '122': {
	        type: 1,
	        isEarth: true
	    },
	    '123': {
	        distance: '38.44公里',
	        y1: 1334,
	        y2: 0,
	        type: 3,
	        coinX: 360,
	        coinY: 200
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
	                            var duration = 1000;
	
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
	exports.default = undefined;
	
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
	
	var _amfeCubicbezier = __webpack_require__(142);
	
	var Bezier = _interopRequireWildcard(_amfeCubicbezier);
	
	var _util = __webpack_require__(6);
	
	var _event = __webpack_require__(105);
	
	var _event2 = _interopRequireDefault(_event);
	
	var _canvas = __webpack_require__(124);
	
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
	                        var delay = 1500;
	                        var duration = 1000;
	
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
	                            scale: 5
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
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;
	
	var _keys = __webpack_require__(139);
	
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
	
	__webpack_require__(144);
	
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
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(145);
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
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "#found {\n    position: absolute;\n    right: 0.73rem;\n    top: 0.4rem;\n    color: #00ddf1;\n    font-size: 12px;\n    display: -webkit-box;\n    -webkit-box-pack: center;\n    -webkit-box-align: center;\n    background-repeat: no-repeat;\n    background-position: 0 center;\n    background-size: 1.106rem 0.413rem;\n}\n\n#found .textWrap {\n    width: 1.106rem;\n    height: 0.413rem;\n    position: relative;\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAfCAYAAAA89UfsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAANdJREFUeNqclD0LgVEYho+P8lqMMsrMrkxkNCn8LYMfQTEYSBaTUjIZRcliUaQM5ON+6o1Fby53XZ06dXW+nvOE3PrUdM7F3SctsXQBCX+Zq4solZKiSCVLRSSo5IkqlSx5kaFSSDT88WfJkvZXRJLzz+ZRKeHfJpIsJZGiUkTUqGTJihyV3nVJJavLMpUshfAfWxyaEAPCVszIKk/RtpFIc7EhV34VPfq4I3Ek0kGMacHatm5EWokF+YQP0aE9Yip2RLqIPm1hA3Em0l5MaFvuinuQ9BJgAFqNIhUPhZOEAAAAAElFTkSuQmCC);\n    background-repeat: no-repeat;\n    background-position: right center;\n    background-size: 0.173rem 0.413rem;\n    overflow: visible;\n}\n\n#found .text {\n    width: 1.3rem;\n    height: 0.5rem;\n    position: absolute;\n    border: 1px solid #00ddf1;\n    border-radius: 4px;\n    box-sizing: border-box;\n    right: 0.17rem;\n    top: -0.18rem;\n    box-shadow: 2px 3px 0px rgba(0, 221, 241, 0.5);\n    -webkit-transition: all 0.4s ease-in 0s;\n    overflow: visible;\n}\n\n#found .text .number {\n    text-align: center;\n    position: absolute;\n    top: 0;\n    right: 0;\n    width: 1.3rem;\n    height: 0.5rem;\n    line-height: 0.5rem;\n    text-align: center;\n}\n\n#found .progress {\n    box-sizing: border-box;\n    width: 1.8rem;\n    height: 0.3rem;\n    border: 1px solid #00ddf1;\n    border-radius: 0.15rem;\n    margin: 0 4px;\n}\n\n#found .progress .bar{\n    width: 0;\n    height: 100%;\n    background-color: #00ddf1;\n    border-radius: 0.15rem;\n}\n\n#found .gold {\n    width: 0.667rem;\n    height: 0.64rem;\n    background-size: contain;\n    background-position: center center;\n    background-repeat: no-repeat;\n}", ""]);
	
	// exports


/***/ },
/* 146 */
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
	
	__webpack_require__(147);
	
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
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(148);
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
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "#stage-map {\n    position: absolute;\n    left: 0.5rem;\n    bottom: 0.5rem;\n    background-position: 0.4rem 0.7rem;\n    background-repeat: no-repeat;\n    background-size: 1.09rem 0.853rem;\n    height: 84px;\n    -webkit-transform: translateZ(999px);\n    display: -webkit-box;\n    -webkit-box-pack: center;\n    -webkit-box-align: center;\n}\n\n#stage-map .wrap {\n    border: 1px solid #016fa0;\n    box-sizing: border-box;\n    width: 30.3px;\n    height: 100%;\n    background-position: 0 0;\n    background-repeat: no-repeat;\n    background-size: contain;\n    background-color: #000;\n    overflow: hidden;\n    position: relative;\n}\n\n#stage-map .map {\n    width: 100%;\n    height: 100%;\n}\n\n#stage-map .indicator {\n    left: 0;\n    top: 0;\n    width: 16px;\n    height: 16px;\n    border-radius: 50%;\n    position: absolute;\n    background-color: rgb(50, 50, 50);\n    opacity: 0;\n    -webkit-animation: flash 0.4s linear 0s infinite alternate;\n}\n\n\n#stage-map .text {\n    background-image: url(data:image/png;base64,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);\n    background-size: 1.2rem;\n    background-position: center 0.2rem;\n    background-repeat: no-repeat;\n    box-sizing: border-box;\n    color: #00ddf1;\n    font-size: 12px;\n    width: 100px;\n    height: 100%;\n    line-height: 1.5em;\n    left: 0.1rem;\n    top: 1.8rem;\n    text-align: center;\n    padding-top: 50px;\n}\n\n#stage-map .text b {\n    font-size: 15px;\n    margin-top: 4px;\n    color: #FFF;\n}\n\n\n@-webkit-keyframes flash {\n    0% {\n        opacity: 0;\n    }\n\n    100% {\n        opacity: 1;\n    }\n}", ""]);
	
	// exports


/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;
	
	var _toConsumableArray2 = __webpack_require__(7);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	var _map = __webpack_require__(150);
	
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
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(151), __esModule: true };

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(93);
	__webpack_require__(10);
	__webpack_require__(75);
	__webpack_require__(152);
	__webpack_require__(162);
	module.exports = __webpack_require__(18).Map;

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(153);
	
	// 23.1 Map Objects
	module.exports = __webpack_require__(158)('Map', function(get){
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
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var dP          = __webpack_require__(22).f
	  , create      = __webpack_require__(35)
	  , redefineAll = __webpack_require__(154)
	  , ctx         = __webpack_require__(19)
	  , anInstance  = __webpack_require__(155)
	  , defined     = __webpack_require__(13)
	  , forOf       = __webpack_require__(156)
	  , $iterDefine = __webpack_require__(14)
	  , step        = __webpack_require__(78)
	  , setSpecies  = __webpack_require__(157)
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
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(21);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 155 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 156 */
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
/* 157 */
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
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global         = __webpack_require__(17)
	  , $export        = __webpack_require__(16)
	  , meta           = __webpack_require__(83)
	  , fails          = __webpack_require__(27)
	  , hide           = __webpack_require__(21)
	  , redefineAll    = __webpack_require__(154)
	  , forOf          = __webpack_require__(156)
	  , anInstance     = __webpack_require__(155)
	  , isObject       = __webpack_require__(24)
	  , setToStringTag = __webpack_require__(50)
	  , dP             = __webpack_require__(22).f
	  , each           = __webpack_require__(159)(0)
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
/* 159 */
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
	  , asc      = __webpack_require__(160);
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
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor = __webpack_require__(161);
	
	module.exports = function(original, length){
	  return new (speciesConstructor(original))(length);
	};

/***/ },
/* 161 */
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
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(16);
	
	$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(163)('Map')});

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var classof = __webpack_require__(59)
	  , from    = __webpack_require__(164);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    return from(this);
	  };
	};

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	var forOf = __webpack_require__(156);
	
	module.exports = function(iter, ITERATOR){
	  var result = [];
	  forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};


/***/ },
/* 165 */
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
	
	__webpack_require__(166);
	
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
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(167);
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
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "#pop {\n    position: absolute;\n    left: 0;\n    top: 0;\n    background-color: rgba(255, 255, 255, 0.6);\n    -webkit-transform: translateZ(9999px);\n    width: 100%;\n    height: 100%;\n    display: -webkit-box;\n    -webkit-box-pack: center;\n    -webkit-box-align: center;\n}\n\n#pop .wrap {\n    background-position: 0 0;\n    background-repeat: no-repeat;\n    background-size: contain;\n    position: relative;\n}\n\n#pop .popPanel {\n    width: 4.26rem;\n    height: 7.84rem;\n    position: absolute;\n    background-repeat: no-repeat;\n    background-size: 8.52rem 7.84rem;\n    overflow: hidden;\n}\n\n#pop .popPanel.left {\n    left: 0;\n    top: 0;\n    background-position: -100% 0;\n}\n\n#pop .popPanel.right {\n    right: 0;\n    top: 0;\n    background-position: 200% 0;\n}\n\n#pop.open .popPanel.left {\n    -webkit-animation: openleftwin 0.4s ease-out 0s forwards;\n}\n\n#pop.open .popPanel.right {\n    -webkit-animation: openrightwin 0.4s ease-out 0s forwards;\n}\n\n#pop.close .popPanel.left {\n    -webkit-animation: closeleftwin 0.4s ease-in 0s forwards;\n}\n\n#pop.close .popPanel.right {\n    -webkit-animation: closerightwin 0.4s ease-in 0s forwards;\n}\n\n@-webkit-keyframes openleftwin {\n    0% {\n        background-position: -100% 0;\n    }\n\n    100% {\n        background-position: 0 0;\n    }\n}\n\n@-webkit-keyframes openrightwin {\n    0% {\n        background-position: 200% 0;\n    }\n\n    100% {\n        background-position: 100% 0;\n    }\n}\n\n@-webkit-keyframes closeleftwin {\n    0% {\n        background-position: 0 0;\n    }\n\n    100% {\n        background-position: -100% 0;\n    }\n}\n\n@-webkit-keyframes closerightwin {\n    0% {\n        background-position: 100% 0;\n    }\n\n    100% {\n        background-position: 200% 0;\n    }\n}\n\n#pop .content {\n    width: 8.53rem;\n    height: 7.84rem;\n    overflow: hidden;\n    position: relative;\n}\n\n#pop .popBg1 {\n    display: none;\n    position: absolute;\n    width: 3.36rem;\n    height: 2.92rem;\n    right: 5px;\n    bottom: 2px;\n    background-repeat: no-repeat;\n    background-position: 0 0;\n    background-size: contain;\n}\n\n#pop.bg1 .popBg1 {\n    display: block;\n}\n\n#pop .popBg2 {\n    display: none;\n    position: absolute;\n    width: 4.36rem;\n    height: 3.346rem;\n    right: 5px;\n    bottom: 2px;\n    background-repeat: no-repeat;\n    background-position: 0 0;\n    background-size: contain;\n}\n\n#pop.bg2 .popBg2 {\n    display: block;\n}\n\n#pop .popBg3 {\n    display: none;\n    position: absolute;\n    width: 4.626rem;\n    height: 3.506rem;\n    right: 5px;\n    bottom: 2px;\n    background-repeat: no-repeat;\n    background-position: 0 0;\n    background-size: contain;\n}\n\n#pop.bg3 .popBg3 {\n    display: block;\n}\n\n#pop .popTip1 {\n    position: absolute;\n    left: 0.467rem;\n    top: 1.1rem;\n    width: 1.867rem;\n    height: 1rem;\n    background-position: 0 1rem;\n    background-repeat: no-repeat;\n    background-size: contain;\n    -webkit-animation: typetext1 1.5s linear 0s infinite;\n    overflow: hidden;\n}\n\n@-webkit-keyframes typetext1 {\n    0% {\n        -webkit-transform: translateY(-100%);\n        background-position: 0 1rem;\n    }\n\n    16% {\n        -webkit-transform: translateY(-100%);\n        background-position: 0 1rem;\n    }\n    16.667% {\n        -webkit-transform: translateY(-83.333%);\n        background-position: 0 0.833rem;\n    }\n\n    33% {\n        -webkit-transform: translateY(-83.333%);\n        background-position: 0 0.833rem;\n    }\n    33.333% {\n        -webkit-transform: translateY(-66.666%);\n        background-position: 0 0.666rem;\n    }\n\n    49.999% {\n        -webkit-transform: translateY(-66.666%);\n        background-position: 0 0.666rem;\n    }\n    50% {\n        -webkit-transform: translateY(-50%);\n        background-position: 0 0.5rem;\n    }\n\n    66% {\n        -webkit-transform: translateY(-50%);\n        background-position: 0 0.5rem;\n    }\n    66.666% {\n        -webkit-transform: translateY(-33.333%);\n        background-position: 0 0.333rem;\n    }\n\n    83% {\n        -webkit-transform: translateY(-33.333%);\n        background-position: 0 0.333rem;\n    }\n    83.333% {\n        -webkit-transform: translateY(-16.667%);\n        background-position: 0 0.167rem;\n    }\n\n    99.999% {\n        -webkit-transform: translateY(-16.667%);\n        background-position: 0 0.167rem;\n    }\n    100% {\n        -webkit-transform: translateY(0%);\n        background-position: 0 0;\n    }\n}\n\n\n#pop .popTip2 {\n    position: absolute;\n    left: 0.467rem;\n    top: 4.68rem;\n    width: 1.867rem;\n    height: 1.573rem;\n    background-position: 0 1.573rem;\n    background-repeat: no-repeat;\n    background-size: contain;\n    -webkit-animation: typetext2 2s linear 0s infinite;\n}\n\n\n@-webkit-keyframes typetext2 {\n    0% {\n        -webkit-transform: translateY(-100%);\n        background-position: 0 1.573rem;\n    }\n\n    9.999% {\n        -webkit-transform: translateY(-100%);\n        background-position: 0 1.573rem;\n    }\n    10% {\n        -webkit-transform: translateY(-90%);\n        background-position: 0 1.415rem;\n    }\n\n    19.999% {\n        -webkit-transform: translateY(-90%);\n        background-position: 0 1.415rem;\n    }\n    20% {\n        -webkit-transform: translateY(-80%);\n        background-position: 0 1.258rem;\n    }\n\n    29.999% {\n        -webkit-transform: translateY(-80%);\n        background-position: 0 1.258rem;\n    }\n    30% {\n        -webkit-transform: translateY(-70%);\n        background-position: 0 1.101rem;\n    }\n\n    39.999% {\n        -webkit-transform: translateY(-70%);\n        background-position: 0 1.101rem;\n    }\n    40% {\n        -webkit-transform: translateY(-60%);\n        background-position: 0 0.9438rem;\n    }\n\n    49.999% {\n        -webkit-transform: translateY(-60%);\n        background-position: 0 0.9438rem;\n    }\n    50% {\n        -webkit-transform: translateY(-50%);\n        background-position: 0 0.7865rem;\n    }\n\n    59.999% {\n        -webkit-transform: translateY(-50%);\n        background-position: 0 0.7865rem;\n    }\n    60% {\n        -webkit-transform: translateY(-40%);\n        background-position: 0 0.6292rem;\n    }\n\n    69.999% {\n        -webkit-transform: translateY(-40%);\n        background-position: 0 0.6292rem;\n    }\n    70% {\n        -webkit-transform: translateY(-30%);\n        background-position: 0 0.4719rem;\n    }\n\n    79.999% {\n        -webkit-transform: translateY(-30%);\n        background-position: 0 0.4719rem;\n    }\n    80% {\n        -webkit-transform: translateY(-20%);\n        background-position: 0 0.3146rem;\n    }\n\n    89.999% {\n        -webkit-transform: translateY(-20%);\n        background-position: 0 0.3146rem;\n    }\n    90% {\n        -webkit-transform: translateY(-10%);\n        background-position: 0 0.1573rem;\n    }\n\n    99.999% {\n        -webkit-transform: translateY(-10%);\n        background-position: 0 0.1573rem;\n    }\n    100% {\n        -webkit-transform: translateY(0);\n        background-position: 0 0;\n    }\n}\n\n#pop .popIcon {\n    position: absolute;\n    left: 0.4rem;\n    top: 2.226rem;\n    width: 1.8rem;\n    height: 2.253rem;\n    background-position: 0 0;\n    background-repeat: no-repeat;\n    background-size: 3.6rem 2.253rem;\n    -webkit-animation: sprites 1s linear 0s infinite;\n}\n\n@-webkit-keyframes sprites {\n    0% {\n        background-position: 0 0;\n    }\n\n    49.999% {\n        background-position: 0 0;\n    }\n\n    50% {\n        background-position: -1.8rem 0;\n    }\n\n    100% {\n        background-position: -1.8rem 0;\n    } \n}\n\n#pop .title {\n    position: absolute;\n    width: 5rem;\n    left: 2.4rem;\n    top: 1.293rem;\n    font-size: 18px;\n    color: #FFF;\n    text-shadow:\n        2px 0 2px rgba(0, 203, 227, 0.3),\n        0 2px 2px rgba(0, 203, 227, 0.3), \n        0 -2px 2px rgba(0, 203, 227, 0.3),\n        -2px 0 2px rgba(0, 203, 227, 0.3);\n    white-space: nowrap;\n}\n\n#pop .text {\n    position: absolute;\n    width: 5rem;\n    left: 2.4rem;\n    top: 2.286rem;\n    font-size: 14px;\n    color: #00cbe3;\n    text-shadow:\n        1px 0 1px rgba(0, 203, 227, 0.3),\n        0 1px 1px rgba(0, 203, 227, 0.3), \n        0 -1px 1px rgba(0, 203, 227, 0.3),\n        -1px 0 1px rgba(0, 203, 227, 0.3);\n}\n\n#pop .popClose {\n    position: absolute;\n    left: 0;\n    bottom: 0.546rem;\n    width: 100%;\n    height: 1.2rem;\n    background-position: center center;\n    background-repeat: no-repeat;\n    background-size: 1.2rem 1.2rem;\n}\n\n#pop.shareble .popClose {\n    display: none;\n}\n\n#pop .btns {\n    display: none;\n    width: 100%;\n    -webkit-box-pack: center;\n    -webkit-box-align: center; \n    padding-top: 0.5rem;\n}\n\n#pop.shareble .btns{\n    display: -webkit-box;\n}\n\n#pop .popBtn {\n    width: 2.68rem;\n    height: 0.773rem;\n    line-height: 0.773rem;\n    text-align: center;\n    color: #FFF;\n    background-position: 0 0;\n    background-repeat: no-repeat;\n    background-size: contain;\n    margin: 0 0.4rem;\n}", ""]);
	
	// exports


/***/ },
/* 168 */
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
	
	__webpack_require__(169);
	
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
	                    return (0, _util.delay)(3000);
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
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(170);
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
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "#tip {\n    position: absolute;\n    left: 0.7235rem;\n    top: 1.1rem;\n    width: 0;\n    height: 0;\n    font-size: 0;\n    border: 0px solid #00ddf1;\n    border-radius: 4px;\n    background-size: contain;\n    background-position: center center;\n    background-repeat: no-repeat;\n    -webkit-transform: translateZ(9999px);\n    -webkit-transition: width 0.4s ease-in 0s,\n                        height 0.4s ease-in 0s;\n    overflow: visible;\n}\n\n#tip.open {\n    width: 8.553rem;\n    height: 1.866rem;\n    border-width: 1px;\n}\n\n#tip.close {\n    border-width: 1px;\n}\n\n#tip p {\n    box-sizing: border-box;\n    width: 100%;\n    height: 100%;\n    line-height: 1.2em;\n    font-size: 12px;\n    color: #00ddf1;\n    padding: 0;\n    padding-left: 12%;\n    padding-top: 6%;\n    padding-right: 30%;\n    margin: 0;\n\n}\n\n#tip .bg {\n    display: none;\n    right: 0;\n    top: 0;\n    position: absolute;\n    background-repeat: no-repeat;\n    background-position: 0 0;\n    background-size: contain; \n}\n\n#tip .tipBg1 {\n    width: 2.8924rem;\n    height: 2.52rem;\n}\n\n#tip .tipBg2 {\n    width: 2.7036rem;\n    height: 2.3352rem;\n}\n\n#tip.bg1 .tipBg1 {\n    display: block;\n}\n\n#tip.bg2 .tipBg2 {\n    display: block;\n}", ""]);
	
	// exports


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
	
	var Share = function () {
	    function Share(viewport) {
	        (0, _classCallCheck3.default)(this, Share);
	
	        this.shareEl = (0, _util.query)(viewport, '#share');
	    }
	
	    (0, _createClass3.default)(Share, [{
	        key: 'show',
	        value: function show() {
	            var _this = this;
	
	            return new _util.Promise(function (resolve, reject) {
	                var hide = function hide(e) {
	                    _this.shareEl.removeEventListener('tap', hide);
	                    _this.shareEl.style.display = 'none';
	                };
	
	                _this.shareEl.addEventListener('tap', hide);
	                _this.shareEl.style.display = '';
	            });
	        }
	    }, {
	        key: 'ready',
	        value: function ready() {
	            return new _util.Promise(function (resolve, reject) {
	                resolve();
	            });
	        }
	    }]);
	    return Share;
	}();
	
	exports.default = Share;

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
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "#share {\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.8);\n    background-size: cover;\n    background-position: right top;\n    background-repeat: no-repeat;\n    -webkit-transform: translateZ(9999px);\n}", ""]);
	
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
	
	var Music = function () {
	    function Music(viewport, items) {
	        (0, _classCallCheck3.default)(this, Music);
	
	        this.musicEl = (0, _util.query)(viewport, '#music');
	        this.audio = items['music'].obj;
	    }
	
	    (0, _createClass3.default)(Music, [{
	        key: 'play',
	        value: function play() {
	            this.audio.play();
	        }
	    }, {
	        key: 'pause',
	        value: function pause() {
	            this.audio.pause();
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
	                        _this.audio.pause();
	                        _this.musicEl.className = 'mute';
	                    } else {
	                        _this.audio.play();
	                        _this.musicEl.className = '';
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
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "#music {\n    position: absolute;\n    left: 0.3rem;\n    top: 0.5rem;\n    padding-right: 0.3rem;\n    padding-bottom: 0.5rem;\n}\n\n#music div {\n    width: 0.49333rem;\n    height: 0.44rem;\n    background-position: left 0;\n    background-repeat: no-repeat;\n    background-size: 1.06666667rem 0.44rem;\n}\n\n#music.mute div {\n    background-position: right 0;\n}", ""]);
	
	// exports


/***/ },
/* 177 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjFjODg3ZjdjZmVmZjdlMTYwNGIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuY3NzPzY3MzciLCJ3ZWJwYWNrOi8vLy4vc3JjL2dhbWUuY3NzIiwid2VicGFjazovLy8uL34vLjAuMjUuMEBjc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4wLjEzLjFAc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvYXJyYXkvZnJvbS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RlZmluZWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXJhdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2h0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1ncG8uanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuZnJvbS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jYWxsLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jcmVhdGUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jbGFzc29mLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRldGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2Nyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qtc2FwLmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuLmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sL2l0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1zdGVwLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MtZXh0LmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN5bWJvbC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWV0YS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fa2V5b2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0ta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi1leHQuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BuLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wZC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wub2JzZXJ2YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9oZWxwZXJzL2luaGVyaXRzLmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L3NldC1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXByb3RvLmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4wLjEuMEBnZXN0dXJlLWpzL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMC4zLjRAZXZlbnQtZW1pdHRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4wLjEuMUBkL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3QvYXNzaWduL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3QvYXNzaWduL2lzLWltcGxlbWVudGVkLmpzIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3QvYXNzaWduL3NoaW0uanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMC4xMC4xMkBlczUtZXh0L29iamVjdC9rZXlzL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3Qva2V5cy9pcy1pbXBsZW1lbnRlZC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4wLjEwLjEyQGVzNS1leHQvb2JqZWN0L2tleXMvc2hpbS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4wLjEwLjEyQGVzNS1leHQvb2JqZWN0L3ZhbGlkLXZhbHVlLmpzIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3Qvbm9ybWFsaXplLW9wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMC4xMC4xMkBlczUtZXh0L29iamVjdC9pcy1jYWxsYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4wLjEwLjEyQGVzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMC4xMC4xMkBlczUtZXh0L3N0cmluZy8jL2NvbnRhaW5zL2lzLWltcGxlbWVudGVkLmpzIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9zdHJpbmcvIy9jb250YWlucy9zaGltLmpzIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3QvdmFsaWQtY2FsbGFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9zdGFnZS5jc3M/M2I4MiIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhZ2UuY3NzIiwid2VicGFjazovLy8uL3NyYy9jYW52YXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvaXMtaXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2xpY2VDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbGxvV29ybGQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbGxvd29ybGQuY3NzPzQ2Y2IiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbGxvd29ybGQuY3NzIiwid2VicGFjazovLy8uL3NyYy9jbG91ZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3Rhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzLmpzIiwid2VicGFjazovLy8uL34vLjIuMC4wQGFtZmUtY3ViaWNiZXppZXIvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9mb3VuZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZm91bmQuY3NzPzA1OWIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZvdW5kLmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFwLmpzIiwid2VicGFjazovLy8uL3NyYy9tYXAuY3NzPzljZGIiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpY2tlci5qcyIsIndlYnBhY2s6Ly8vLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL21hcC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vbWFwLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5tYXAuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvbGxlY3Rpb24tc3Ryb25nLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS1hbGwuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLWluc3RhbmNlLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mb3Itb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1zcGVjaWVzLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2xsZWN0aW9uLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1tZXRob2RzLmpzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1zcGVjaWVzLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktc3BlY2llcy1jb25zdHJ1Y3Rvci5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcubWFwLnRvLWpzb24uanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvbGxlY3Rpb24tdG8tanNvbi5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktZnJvbS1pdGVyYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcG9wLmpzIiwid2VicGFjazovLy8uL3NyYy9wb3AuY3NzPzc2ZTgiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BvcC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RpcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGlwLmNzcz8wZjMzIiwid2VicGFjazovLy8uL3NyYy90aXAuY3NzIiwid2VicGFjazovLy8uL3NyYy9zaGFyZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhcmUuY3NzPzY1NzQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NoYXJlLmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvbXVzaWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL211c2ljLmNzcz9iMmU3Iiwid2VicGFjazovLy8uL3NyYy9tdXNpYy5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RleHRDb25maWcuanMiXSwibmFtZXMiOlsicHJlbG9hZCIsImFzc2V0c1ByZWxvYWQiLCJpdGVtcyIsImFzc2V0c0l0ZW1zIiwidmlld3BvcnQiLCJib2R5Iiwic2Nyb2xsZXIiLCJ0aWNrZXIiLCJzdGFnZSIsImhlbGxvV29ybGQiLCJjbG91ZCIsInN0YXIiLCJlbGVtZW50cyIsImZvdW5kIiwibWFwIiwicG9wIiwidGlwIiwic2hhcmUiLCJtdXNpYyIsInNob3dTaGFyZSIsInNob3ciLCJzaG93VGlwIiwiY29uZmlnIiwiYmdUeXBlIiwic2hvd1BvcCIsImVuYWJsZSIsInBvcHVwIiwidGl0bGUiLCJ0ZXh0Iiwic2hhcmVibGUiLCJvbmxlZnRjbGljayIsImFsbCIsImNsb3NlIiwidGhlbiIsIm9ucmlnaHRjbGljayIsIm9uY2xvc2VjbGljayIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJydW4iLCJyZWFkeSIsInNjcm9sbFNsb3dSYXRpbyIsIndpZHRoIiwiaGVpZ2h0IiwidnciLCJ2aCIsInByb21pc2VzIiwicHVzaCIsImZpcnN0UmVuZGVyZWQiLCJzY3JvbGxYIiwic2Nyb2xsWSIsInN0YXJSb2xsWSIsInN0YXJSb2xsU3BlZWQiLCJzdGFyUm9sbElkIiwiYWRkIiwic2hvd1RleHRJZCIsInNob3dHbG9kSWQiLCJmbHlDb2luSWQiLCJjbGVhckNsb3VkSWQiLCJob3ZlclNsaWNlIiwiZ2V0SG92ZXJTbGljZSIsImZvY3VzU2xpY2UiLCJnZXRGb2N1c1NsaWNlIiwic2xpY2VXaWR0aCIsInNsaWNlSGVpZ2h0Iiwib24iLCJkZWxldGUiLCJ4IiwieSIsImNsZWFyIiwidHlwZSIsInNob3dUZXh0Iiwib3JpZ2luYWxFdmVudCIsInRhcmdldCIsImNhbnZhcyIsInRhcEZvY3VzU2xpY2UiLCJleCIsImV5Iiwic2hvd0dvbGQiLCJlbmQiLCJmbHlDb2luIiwidXBkYXRlIiwic3BlY2lhbEFtb3VudCIsInNwZWNpYWxGb3VuZCIsInRvdGFsQW1vdW50IiwiZm9jdXNlZEFtb3VudCIsImRyYXdJbWFnZXMiLCJvZmZzY3JlZW5SZW5kZXIiLCJjbGVhclJlY3QiLCJkcmF3SW1hZ2UiLCJpbWFnZSIsInJlbmRlciIsIm9mZnNjcmVlbkNhbnZhcyIsInJlcGVhdCIsInByb21pc2UiLCJyZXNvbHZlIiwiaSIsInRpY2tlcklkIiwicGxheSIsIk1hdGgiLCJyYW5kb20iLCJlbmRpbmciLCJoU2xpY2UiLCJ2U2xpY2UiLCJyYW5kb21UZXh0SWQiLCJyYW5kb21UZXh0IiwieHAiLCJ5cCIsImRpc3RhbmNlIiwiYW1vdW50IiwidG90YWwiLCJmb2N1cyIsInNob3duIiwiYm9uZVgiLCJib25lWSIsInNjcm9sbFRvIiwid2luIiwid2luZG93IiwiZG9jIiwiZG9jdW1lbnQiLCJQcm9taXNlIiwiY3JlYXRlanMiLCJhcHBlbmRTdHlsZSIsImNzc1RleHQiLCJzdHlsZSIsImNyZWF0ZUVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiYXBwZW5kQ2hpbGQiLCJkb21yZWFkeSIsInJlamVjdCIsInJlYWR5U3RhdGUiLCJkZWZlciIsImRlZmVycmVkIiwiZGVsYXkiLCJ0aW1lIiwic2V0VGltZW91dCIsInF1ZXJ5Iiwic2VsZWN0b3IiLCJxdWVyeVNlbGVjdG9yIiwicXVlcnlBbGwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZ2V0UmVjdCIsImVsIiwicmVjdHMiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJnZXREaXN0YW5jZSIsIngxIiwieTEiLCJ4MiIsInkyIiwic3FydCIsImltZzJDYW52YXMiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsInJhZiIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSIsImZuIiwiY2FmIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJ3ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZSIsImlkIiwiY2xlYXJUaW1lb3V0IiwiU2Nyb2xsZXIiLCJzY2FsZSIsIl9pc1Njcm9sbGluZyIsIl9lbmFibGUiLCJfc2NhbGUiLCJseCIsImx5IiwibmFtZSIsImV4dHJhIiwia2V5IiwiZW1pdCIsImVtaXRUYXAiLCJfZW1pdCIsInRvdWNoIiwiY2xpZW50WCIsImNsaWVudFkiLCJlbWl0U3RhcnQiLCJlbWl0U2Nyb2xsIiwiZW1pdEVuZCIsImNhbFhZIiwibm9TY2FsZSIsImRpc3BsYWNlbWVudFgiLCJkaXNwbGFjZW1lbnRZIiwibWluIiwibWF4IiwiRXZlbnQiLCJwcm90b3R5cGUiLCJTdGFnZSIsInN0YWdlRWwiLCJzbGljZXMiLCJ2IiwiaCIsImluZGV4IiwiU3RyaW5nIiwicGFyc2VJbnQiLCJob3ZlciIsImdldFNsaWNlIiwicmVsYXRlZCIsInNsaWNlIiwiaG92ZXJlZCIsImN4IiwiY3kiLCJkeCIsImR5IiwiZm9jdXNlZCIsImRpc3BsYXkiLCJsZW5ndGgiLCJmaWx0ZXIiLCJDYW52YXNJbWFnZSIsIkhUTUxDYW52YXNFbGVtZW50IiwiX2ltYWdlIiwicGFyYW1zIiwibG9hZGVkIiwicGFyYW0iLCJpbWciLCJzcmMiLCJmb3JFYWNoIiwiYXJncyIsInN4Iiwic3kiLCJzdyIsInNoIiwiSW1hZ2UiLCJ0b0RhdGFVUkwiLCJDYW52YXNSZW5kZXIiLCJfdmlzaWJsZSIsIl9vZmZzY3JlZW4iLCJjb2luWCIsImNvaW5ZIiwiaXNFYXJ0aCIsIkhlbGxvV29ybGQiLCJ3cmFwRWwiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJkdXJhdGlvbiIsImNvdW50IiwiZWxhcHNlZCIsImRlbHRhIiwiYmFja2dyb3VuZFBvc2l0aW9uWCIsIkNsb3VkIiwiaG92ZXJzIiwiaWRzIiwicHVzaFBhcmFtcyIsImluZGV4T2YiLCJkcmF3IiwiY2xlYXJlZCIsImdsb2JhbEFscGhhIiwib2JqIiwiU3RhciIsIkJlemllciIsIm9yaWdpblNsaWNlV2lkdGgiLCJvcmlnaW5TbGljZUhlaWdodCIsIkVsZW1lbnRzIiwic2NhbGVSYXRpbyIsInRleHRBbHBoYSIsImdvbGRZIiwibm9Db2luIiwiY29pbiIsImVuZFgiLCJlbmRZIiwicGVyY2VudCIsInNsb3ciLCJjYW52YXNJbWFnZSIsInN0YXRpY0ltZyIsInRleHRJbWciLCJnb2xkSW1nIiwiZmxvdyIsIm9mZnNldFkiLCJyYW5nZSIsImVhc2UiLCJlYXNlSW4iLCJlYXNlT3V0Iiwic2F2ZSIsInJlc3RvcmUiLCJjb2lucyIsImNvaW5JbWciLCJtYXRjaCIsIml0ZW0iLCJOdW1iZXIiLCJGb3VuZCIsInRleHRFbCIsInRleHROdW1iZXJFbCIsInRleHRUaXBFbCIsInRleHRCZ0VsIiwiYmFyRWwiLCJnb2xkRWwiLCJrZXlmcmFtZXMiLCJ3ZWJraXRBbmltYXRpb24iLCJNYXAiLCJjYW52YXNFbCIsImluZGljYXRvckVsIiwib3BlbmVkIiwibiIsInN1bURlbHRhIiwic2lnbiIsInN0ciIsImNXaWR0aCIsImNIZWlnaHQiLCJpV2lkdGgiLCJpSGVpZ2h0Iiwic1dpZHRoIiwic0hlaWdodCIsIndlYmtpdFRyYW5zZm9ybSIsImZpbGxSZWN0IiwiZmlsbFN0eWxlIiwiZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uIiwiVGlja2VyIiwiX2lkIiwiX21hcEYiLCJfbWFwQyIsImYiLCJoYXMiLCJzZXQiLCJjYW5jZWwiLCJzdGFydCIsImdldCIsImMiLCJyaWQiLCJEYXRlIiwibm93IiwidGljayIsImtleXMiLCJQb3AiLCJwb3BFbCIsImNvbnRlbnRFbCIsImNsb3NlRWwiLCJ0aXRsZUVsIiwiYmcxRWwiLCJiZzJFbCIsImJ0bnNFbCIsImxlZnRCdG5FbCIsInJpZ2h0QnRuRWwiLCJ2aXNpYmlsaXR5IiwiY2xhc3NOYW1lIiwicmVwbGFjZSIsImlubmVySFRNTCIsImhhbmRsZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwib25MZWZ0Q2xpY2siLCJvblJpZ2h0Q2xpY2siLCJvbkNsb3NlQ2xpY2siLCJUaXAiLCJ0aXBFbCIsIlNoYXJlIiwic2hhcmVFbCIsImhpZGUiLCJNdXNpYyIsIm11c2ljRWwiLCJhdWRpbyIsInBhdXNlIiwibG9vcCIsInN0b3BQcm9wYWdhdGlvbiIsInBhdXNlZCIsImxvYWRpbmciLCJ0ZXh0cyIsImdsIiwiZm91bmQ1IiwiZm91bmQxNSIsImZvdW5kMjAiLCJibGFja3NoZWVwd2FsbCIsImdnIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQTs7QUFDQTs7QUFVQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7S0FHbUJBLE8sYUFBZkMsYTtLQUNhQyxLLGFBQWJDLFc7OztBQUdKLEtBQUlDLFdBQVcsaUJBQU0sVUFBSUMsSUFBVixFQUFnQixPQUFoQixDQUFmO0FBQ0EsS0FBSUMsaUJBQUo7QUFDQSxLQUFJQyxlQUFKO0FBQ0EsS0FBSUMsY0FBSjtBQUNBLEtBQUlDLG1CQUFKO0FBQ0EsS0FBSUMsY0FBSjtBQUNBLEtBQUlDLGFBQUo7QUFDQSxLQUFJQyxpQkFBSjtBQUNBLEtBQUlDLGNBQUo7QUFDQSxLQUFJQyxZQUFKO0FBQ0EsS0FBSUMsWUFBSjtBQUNBLEtBQUlDLFlBQUo7QUFDQSxLQUFJQyxjQUFKO0FBQ0EsS0FBSUMsY0FBSjs7QUFFQSxVQUFTQyxTQUFULEdBQXFCO0FBQ2pCLFlBQU9GLE1BQU1HLElBQU4sRUFBUDtBQUNIOztBQUVELFVBQVNDLE9BQVQsQ0FBaUJDLE1BQWpCLEVBQXlCO0FBQ3JCLFlBQU9OLElBQUlJLElBQUosQ0FBUztBQUNaSixjQUFLTSxPQUFPTixHQURBO0FBRVpPLGlCQUFRRCxPQUFPQztBQUZILE1BQVQsQ0FBUDtBQUlIOztB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Y2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGYxYzg4N2Y3Y2ZlZmY3ZTE2MDRiIiwiaW1wb3J0ICcuL2dhbWUuY3NzJztcbmltcG9ydCB7XG4gICAgd2luLFxuICAgIGRvYyxcbiAgICBQcm9taXNlLFxuICAgIGRlZmVyLFxuICAgIHF1ZXJ5LFxuICAgIHF1ZXJ5QWxsLFxuICAgIGdldFJlY3QsXG4gICAgZGVsYXlcbn0gZnJvbSAnLi91dGlsJztcbmltcG9ydCBTY3JvbGxlciBmcm9tICcuL3Njcm9sbGVyJztcbmltcG9ydCBTdGFnZSBmcm9tICcuL3N0YWdlJztcbmltcG9ydCBIZWxsb1dvcmxkIGZyb20gJy4vaGVsbG9Xb3JsZCc7XG5pbXBvcnQgQ2xvdWQgZnJvbSAnLi9jbG91ZCc7XG5pbXBvcnQgU3RhciBmcm9tICcuL3N0YXInO1xuaW1wb3J0IEVsZW1lbnRzIGZyb20gJy4vZWxlbWVudHMnO1xuaW1wb3J0IEZvdW5kIGZyb20gJy4vZm91bmQnO1xuaW1wb3J0IE1hcCBmcm9tICcuL21hcCc7XG5pbXBvcnQgVGlja2VyIGZyb20gJy4vdGlja2VyJztcbmltcG9ydCBQb3AgZnJvbSAnLi9wb3AnO1xuaW1wb3J0IFRpcCBmcm9tICcuL3RpcCc7XG5pbXBvcnQgU2hhcmUgZnJvbSAnLi9zaGFyZSc7XG5pbXBvcnQgTXVzaWMgZnJvbSAnLi9tdXNpYyc7XG5pbXBvcnQgdGV4dENvbmZpZyBmcm9tICcuL3RleHRDb25maWcnO1xuXG5jb25zdCB7XG4gICAgYXNzZXRzUHJlbG9hZDogcHJlbG9hZCxcbiAgICBhc3NldHNJdGVtczogaXRlbXMsXG59ID0gd2luO1xuXG5sZXQgdmlld3BvcnQgPSBxdWVyeShkb2MuYm9keSwgJyNnYW1lJyk7XG5sZXQgc2Nyb2xsZXI7XG5sZXQgdGlja2VyO1xubGV0IHN0YWdlO1xubGV0IGhlbGxvV29ybGQ7XG5sZXQgY2xvdWQ7XG5sZXQgc3RhcjtcbmxldCBlbGVtZW50cztcbmxldCBmb3VuZDtcbmxldCBtYXA7XG5sZXQgcG9wO1xubGV0IHRpcDtcbmxldCBzaGFyZTtcbmxldCBtdXNpYztcblxuZnVuY3Rpb24gc2hvd1NoYXJlKCkge1xuICAgIHJldHVybiBzaGFyZS5zaG93KCk7XG59XG5cbmZ1bmN0aW9uIHNob3dUaXAoY29uZmlnKSB7XG4gICAgcmV0dXJuIHRpcC5zaG93KHtcbiAgICAgICAgdGlwOiBjb25maWcudGlwLFxuICAgICAgICBiZ1R5cGU6IGNvbmZpZy5iZ1R5cGVcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gc2hvd1BvcChjb25maWcpIHtcbiAgICBzY3JvbGxlciAmJiAoc2Nyb2xsZXIuZW5hYmxlID0gZmFsc2UpO1xuXG4gICAgcmV0dXJuIHBvcC5wb3B1cCh7XG4gICAgICAgIHRpdGxlOiBjb25maWcudGl0bGUsXG4gICAgICAgIHRleHQ6IGNvbmZpZy50ZXh0LFxuICAgICAgICBzaGFyZWJsZTogY29uZmlnLnNoYXJlYmxlLFxuICAgICAgICBiZ1R5cGU6IGNvbmZpZy5iZ1R5cGUsXG4gICAgICAgIG9ubGVmdGNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgcG9wLmNsb3NlKCksXG4gICAgICAgICAgICAgICAgc2hvd1NoYXJlKClcbiAgICAgICAgICAgIF0pLnRoZW4oKCkgPT4gc2Nyb2xsZXIuZW5hYmxlID0gdHJ1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9ucmlnaHRjbGljazogKCkgPT4ge1xuICAgICAgICAgICAgcG9wLmNsb3NlKCkudGhlbigoKSA9PiBzY3JvbGxlci5lbmFibGUgPSB0cnVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25jbG9zZWNsaWNrOiAoKSA9PiB7XG4gICAgICAgICAgICBwb3AuY2xvc2UoKS50aGVuKCgpID0+IHNjcm9sbGVyLmVuYWJsZSA9IHRydWUpO1xuICAgICAgICB9XG4gICAgfSkgXG59XG5cbnByZWxvYWRcbiAgICAudGhlbigoKSA9PiB7IC8vIHByZXZlbnQgZXZlbnRcbiAgICAgICAgdmlld3BvcnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGUgPT4gZS5wcmV2ZW50RGVmYXVsdCgpKTtcbiAgICAgICAgdmlld3BvcnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZSA9PiBlLnByZXZlbnREZWZhdWx0KCkpO1xuICAgICAgICB2aWV3cG9ydC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGUgPT4gZS5wcmV2ZW50RGVmYXVsdCgpKTtcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHsgLy8gdGlja2VyXG4gICAgICAgIHRpY2tlciA9IG5ldyBUaWNrZXIoKTtcbiAgICAgICAgdGlja2VyLnJ1bigpO1xuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4geyAvLyBoZWxsb3dvcmxkXG4gICAgICAgIGhlbGxvV29ybGQgPSBuZXcgSGVsbG9Xb3JsZCh2aWV3cG9ydCwgaXRlbXMpO1xuICAgICAgICByZXR1cm4gaGVsbG9Xb3JsZC5yZWFkeSgpO1xuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4geyAvLyBzdGFnZVxuICAgICAgICBzdGFnZSA9IG5ldyBTdGFnZSh2aWV3cG9ydCk7XG4gICAgICAgIHJldHVybiBzdGFnZS5yZWFkeSgpO1xuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4geyAvLyBzY3JvbGxlclxuICAgICAgICBjb25zdCBzY3JvbGxTbG93UmF0aW8gPSAxO1xuICAgICAgICBzY3JvbGxlciA9IG5ldyBTY3JvbGxlcihzdGFnZS53aWR0aCwgc3RhZ2UuaGVpZ2h0LCBzdGFnZS52dywgc3RhZ2UudmgsIHNjcm9sbFNsb3dSYXRpbyk7XG4gICAgICAgIHNjcm9sbGVyLmVuYWJsZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gc2Nyb2xsZXIucmVhZHkoKTtcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHsgLy8gdGhpbmdzXG4gICAgICAgIGNvbnN0IHByb21pc2VzID0gW107XG5cbiAgICAgICAgc3RhciA9IG5ldyBTdGFyKHN0YWdlLCBpdGVtcyk7XG4gICAgICAgIHByb21pc2VzLnB1c2goc3Rhci5yZWFkeSgpKTtcblxuICAgICAgICBlbGVtZW50cyA9IG5ldyBFbGVtZW50cyhzdGFnZSwgaXRlbXMpO1xuICAgICAgICBwcm9taXNlcy5wdXNoKGVsZW1lbnRzLnJlYWR5KCkpO1xuXG4gICAgICAgIGNsb3VkID0gbmV3IENsb3VkKHN0YWdlLCBpdGVtcyk7XG4gICAgICAgIHByb21pc2VzLnB1c2goY2xvdWQucmVhZHkoKSk7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHsgLy8gcmVuZGVyXG4gICAgICAgIGxldCBmaXJzdFJlbmRlcmVkID0gZmFsc2U7XG4gICAgICAgIGxldCBzY3JvbGxYID0gMDtcbiAgICAgICAgbGV0IHNjcm9sbFkgPSAwO1xuICAgICAgICBsZXQgc3RhclJvbGxZID0gc3RhZ2Uudmg7XG4gICAgICAgIGxldCBzdGFyUm9sbFNwZWVkID0gMC40O1xuICAgICAgICBsZXQgc3RhclJvbGxJZCA9IHRpY2tlci5hZGQoKCkgPT4ge1xuICAgICAgICAgICAgc3RhclJvbGxZIC09IHN0YXJSb2xsU3BlZWQ7XG4gICAgICAgICAgICBpZiAoc3RhclJvbGxZIDwgMCkge1xuICAgICAgICAgICAgICAgIHN0YXJSb2xsWSA9IHN0YWdlLnZoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IHNob3dUZXh0SWQ7XG4gICAgICAgIGxldCBzaG93R2xvZElkO1xuICAgICAgICBsZXQgZmx5Q29pbklkO1xuICAgICAgICBsZXQgY2xlYXJDbG91ZElkO1xuICAgICAgICBsZXQgaG92ZXJTbGljZSA9IHN0YWdlLmdldEhvdmVyU2xpY2UoMCwgMCk7XG4gICAgICAgIGxldCBmb2N1c1NsaWNlID0gc3RhZ2UuZ2V0Rm9jdXNTbGljZShzdGFnZS5zbGljZVdpZHRoIC8gMiwgc3RhZ2Uuc2xpY2VIZWlnaHQgLyAyKTtcblxuICAgICAgICBzY3JvbGxlci5vbignc2Nyb2xsc3RhcnQnLCBlID0+IHtcbiAgICAgICAgICAgIGlmIChjbGVhckNsb3VkSWQpIHtcbiAgICAgICAgICAgICAgICB0aWNrZXIuZGVsZXRlKGNsZWFyQ2xvdWRJZCk7XG4gICAgICAgICAgICAgICAgY2xlYXJDbG91ZElkID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2Nyb2xsZXIub24oJ3Njcm9sbGluZycsIGUgPT4ge1xuICAgICAgICAgICAgc2Nyb2xsWCA9IGUueDtcbiAgICAgICAgICAgIHNjcm9sbFkgPSBlLnk7XG4gICAgICAgICAgICBob3ZlclNsaWNlID0gc3RhZ2UuZ2V0SG92ZXJTbGljZShzY3JvbGxYLCBzY3JvbGxZKTtcbiAgICAgICAgICAgIGZvY3VzU2xpY2UgPSBzdGFnZS5nZXRGb2N1c1NsaWNlKHNjcm9sbFggKyBzdGFnZS5zbGljZVdpZHRoIC8gMiwgc2Nyb2xsWSArIHN0YWdlLnNsaWNlSGVpZ2h0IC8gMik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNjcm9sbGVyLm9uKCdzY3JvbGxlbmQnLCBlID0+IHtcbiAgICAgICAgICAgIGlmIChmb2N1c1NsaWNlKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJDbG91ZElkID0gdGlja2VyLmFkZChjbG91ZC5jbGVhcihmb2N1c1NsaWNlKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZm9jdXNTbGljZS50eXBlID49IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd1RleHRJZCA9IHRpY2tlci5hZGQoZWxlbWVudHMuc2hvd1RleHQoZm9jdXNTbGljZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2Nyb2xsZXIub24oJ3RhcCcsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKGUub3JpZ2luYWxFdmVudC50YXJnZXQgPT09IHN0YWdlLmNhbnZhcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhcEZvY3VzU2xpY2UgPSBzdGFnZS5nZXRGb2N1c1NsaWNlKGUuZXgsIGUuZXkpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRhcEZvY3VzU2xpY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0dsb2RJZCA9IHRpY2tlci5hZGQoZWxlbWVudHMuc2hvd0dvbGQodGFwRm9jdXNTbGljZSkpO1xuICAgICAgICAgICAgICAgICAgICB0aWNrZXIuZW5kKHNob3dHbG9kSWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZseUNvaW5JZCA9IHRpY2tlci5hZGQoZWxlbWVudHMuZmx5Q29pbih0YXBGb2N1c1NsaWNlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGlja2VyLm9uKCdhZnRlcnRpY2snLCBlID0+IHtcbiAgICAgICAgICAgIGZvdW5kICYmIGZvdW5kLnVwZGF0ZShcbiAgICAgICAgICAgICAgICBzdGFnZS5zcGVjaWFsQW1vdW50LFxuICAgICAgICAgICAgICAgIHN0YWdlLnNwZWNpYWxGb3VuZCxcbiAgICAgICAgICAgICAgICBzdGFnZS50b3RhbEFtb3VudCxcbiAgICAgICAgICAgICAgICBzdGFnZS5mb2N1c2VkQW1vdW50XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBlbGVtZW50cy5kcmF3SW1hZ2VzKGhvdmVyU2xpY2UsIGZvY3VzU2xpY2UsIHNjcm9sbFgsIHNjcm9sbFksIGUpO1xuICAgICAgICAgICAgY2xvdWQuZHJhd0ltYWdlcyhob3ZlclNsaWNlLCBmb2N1c1NsaWNlLCBzY3JvbGxYLCBzY3JvbGxZLCBlKTtcblxuICAgICAgICAgICAgc3RhZ2Uub2Zmc2NyZWVuUmVuZGVyLmNsZWFyUmVjdCgwLCAwLCBzdGFnZS52dywgc3RhZ2UudmgpO1xuICAgICAgICAgICAgc3RhZ2Uub2Zmc2NyZWVuUmVuZGVyLmRyYXdJbWFnZShzdGFyLmltYWdlLCAwLCBzdGFyUm9sbFksIHN0YWdlLnZ3LCBzdGFnZS52aCwgMCwgMCwgc3RhZ2UudncsIHN0YWdlLnZoKTtcbiAgICAgICAgICAgIHN0YWdlLm9mZnNjcmVlblJlbmRlci5kcmF3SW1hZ2UoZWxlbWVudHMuY2FudmFzLCAwLCAwLCBzdGFnZS52dywgc3RhZ2UudmgsIDAsIDAsIHN0YWdlLnZ3LCBzdGFnZS52aCk7XG4gICAgICAgICAgICBzdGFnZS5vZmZzY3JlZW5SZW5kZXIuZHJhd0ltYWdlKGNsb3VkLmNhbnZhcywgMCwgMCwgc3RhZ2UudncsIHN0YWdlLnZoLCAwLCAwLCBzdGFnZS52dywgc3RhZ2UudmgpO1xuXG4gICAgICAgICAgICBzdGFnZS5yZW5kZXIuY2xlYXJSZWN0KDAsIDAsIHN0YWdlLnZ3LCBzdGFnZS52aCk7XG4gICAgICAgICAgICBzdGFnZS5yZW5kZXIuZHJhd0ltYWdlKHN0YWdlLm9mZnNjcmVlbkNhbnZhcywgMCwgMCwgc3RhZ2UudncsIHN0YWdlLnZoLCAwLCAwLCBzdGFnZS52dywgc3RhZ2UudmgpO1xuICAgICAgICB9KTtcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHsgLy8gc2hvdyBoZWxsb3dvcmxkXG4gICAgICAgIGNvbnN0IHJlcGVhdCA9IDU7XG4gICAgICAgIGxldCBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXBlYXQ7IGkrKykge1xuICAgICAgICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGlja2VySWQgPSB0aWNrZXIuYWRkKGhlbGxvV29ybGQucGxheSgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGlja2VyLmVuZCh0aWNrZXJJZCk7XG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IGRlbGF5KDUwMCArIE1hdGgucmFuZG9tKCkgKiA1MDApKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbigoKSA9PiBkZWxheSgxMDAwKSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBoZWxsb1dvcmxkLmVuZGluZygpKTtcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHsgLy8gbWFwXG4gICAgICAgIG1hcCA9IG5ldyBNYXAodmlld3BvcnQsIHN0YWdlLmhTbGljZSwgc3RhZ2UudlNsaWNlKTtcblxuICAgICAgICBsZXQgcmFuZG9tVGV4dElkO1xuXG4gICAgICAgIHNjcm9sbGVyLm9uKCdzY3JvbGxzdGFydCcsIGUgPT4ge1xuICAgICAgICAgICAgaWYgKHJhbmRvbVRleHRJZCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmFuZG9tVGV4dElkID0gdGlja2VyLmFkZChtYXAucmFuZG9tVGV4dCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2Nyb2xsZXIub24oJ3Njcm9sbGluZycsIGUgPT4ge1xuICAgICAgICAgICAgY29uc3QgeHAgPSBlLnggLyBzdGFnZS53aWR0aDtcbiAgICAgICAgICAgIGNvbnN0IHlwID0gZS55IC8gc3RhZ2UuaGVpZ2h0O1xuICAgICAgICAgICAgbWFwLnVwZGF0ZSh4cCwgeXApO1xuICAgICAgICB9KTtcblxuICAgICAgICBzY3JvbGxlci5vbignc2Nyb2xsZW5kJywgZSA9PiB7XG4gICAgICAgICAgICBjb25zdCB4cCA9IGUueCAvIHN0YWdlLndpZHRoO1xuICAgICAgICAgICAgY29uc3QgeXAgPSBlLnkgLyBzdGFnZS5oZWlnaHQ7XG4gICAgICAgICAgICBtYXAuY2xlYXIoeHAsIHlwKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgZm9jdXNTbGljZSA9IHN0YWdlLmdldEZvY3VzU2xpY2UoZS54ICsgc3RhZ2Uuc2xpY2VXaWR0aCAvIDIsIGUueSArIHN0YWdlLnNsaWNlSGVpZ2h0IC8gMik7XG4gICAgICAgICAgICBpZiAoZm9jdXNTbGljZSAmJiBmb2N1c1NsaWNlLmRpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgdGlja2VyLmRlbGV0ZShyYW5kb21UZXh0SWQpO1xuICAgICAgICAgICAgICAgIHJhbmRvbVRleHRJZCA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICBtYXAudGV4dChmb2N1c1NsaWNlLmRpc3RhbmNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG1hcC5yZWFkeSgpO1xuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4geyAvLyBmb3VuZFxuICAgICAgICBmb3VuZCA9IG5ldyBGb3VuZCh2aWV3cG9ydCwgaXRlbXMpO1xuXG4gICAgICAgIGZvdW5kLm9uKCd1cGRhdGUnLCAoe1xuICAgICAgICAgICAgZm91bmQsXG4gICAgICAgICAgICBhbW91bnQsXG4gICAgICAgICAgICB0b3RhbCxcbiAgICAgICAgICAgIGZvY3VzXG4gICAgICAgIH0pID0+IHtcbiAgICAgICAgICAgIGxldCBjb25maWc7XG5cbiAgICAgICAgICAgIGlmIChmb3VuZCA9PT0gYW1vdW50XG4gICAgICAgICAgICAgICAgJiYgZm9jdXMgPT09IHRvdGFsKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnID0gdGV4dENvbmZpZ1snZ2cnXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9jdXMgPT09IHRvdGFsKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnID0gdGV4dENvbmZpZ1snYmxhY2tzaGVlcHdhbGwnXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZm91bmQgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBjb25maWcgPSB0ZXh0Q29uZmlnWydnbCddO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25maWcgPSB0ZXh0Q29uZmlnW2Bmb3VuZCR7Zm91bmR9YF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjb25maWcgJiYgIWNvbmZpZy5zaG93bikge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5zaG93biA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZy50eXBlID09PSAndGlwJykge1xuICAgICAgICAgICAgICAgICAgICBzaG93VGlwKGNvbmZpZyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb25maWcudHlwZSA9PT0gJ3BvcHVwJykge1xuICAgICAgICAgICAgICAgICAgICBzaG93UG9wKGNvbmZpZyk7ICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBmb3VuZC5yZWFkeSgpO1xuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4geyAvLyBwb3BcbiAgICAgICAgcG9wID0gbmV3IFBvcCh2aWV3cG9ydCk7XG4gICAgICAgIHJldHVybiBwb3AucmVhZHkoKTtcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHsgLy8gdGlwXG4gICAgICAgIHRpcCA9IG5ldyBUaXAodmlld3BvcnQpO1xuICAgICAgICByZXR1cm4gdGlwLnJlYWR5KCk7XG4gICAgfSlcbiAgICAudGhlbigoKSA9PiB7IC8vIHNoYXJlXG4gICAgICAgIHNoYXJlID0gbmV3IFNoYXJlKHZpZXdwb3J0KTtcbiAgICAgICAgcmV0dXJuIHNoYXJlLnJlYWR5KCk7XG4gICAgfSlcbiAgICAudGhlbigoKSA9PiB7IC8vIG11c2ljXG4gICAgICAgIG11c2ljID0gbmV3IE11c2ljKHZpZXdwb3J0LCBpdGVtcyk7XG4gICAgICAgIHJldHVybiBtdXNpYy5yZWFkeSgpO1xuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4geyAvLyBib25lXG4gICAgICAgIGNvbnN0IGJvbmVYID0gc3RhZ2Uud2lkdGggLyAyIC0gc3RhZ2UudncgLyAyO1xuICAgICAgICBjb25zdCBib25lWSA9IHN0YWdlLmhlaWdodCAtIHN0YWdlLnZoIC8gMjtcbiAgICAgICAgc2Nyb2xsZXIuZW5hYmxlID0gdHJ1ZTtcbiAgICAgICAgc2Nyb2xsZXIuc2Nyb2xsVG8oYm9uZVgsIGJvbmVZKTtcbiAgICB9KVxuICAgIC8vIC50aGVuKCgpID0+IGRlbGF5KDIwMDApKVxuICAgIC50aGVuKCgpID0+IHsgLy8gc2hvdyBndWlkZVxuICAgICAgICAvLyBzaG93VGlwKHRleHRDb25maWcuZm91bmQ1KTtcbiAgICAgICAgLy8gc2hvd1BvcCh0ZXh0Q29uZmlnLmdnKTtcbiAgICAgICAgbXVzaWMucGxheSgpO1xuICAgIH0pXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2dhbWUuanMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vZ2FtZS5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjEzLjFAc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL2dhbWUuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvaW5kZXguanMhLi9nYW1lLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZ2FtZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIiNnYW1lIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgcGFkZGluZzogMDtcXG4gICAgbWFyZ2luOiAwO1xcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMjUuMEBjc3MtbG9hZGVyIS4vc3JjL2dhbWUuY3NzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHJcblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblxyXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XHJcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xyXG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcclxuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xyXG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXHJcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XHJcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcclxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcclxuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cclxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcclxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcclxuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcclxuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMjUuMEBjc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbnZhciBzdHlsZXNJbkRvbSA9IHt9LFxyXG5cdG1lbW9pemUgPSBmdW5jdGlvbihmbikge1xyXG5cdFx0dmFyIG1lbW87XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0XHRyZXR1cm4gbWVtbztcclxuXHRcdH07XHJcblx0fSxcclxuXHRpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiAvbXNpZSBbNi05XVxcYi8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTtcclxuXHR9KSxcclxuXHRnZXRIZWFkRWxlbWVudCA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xyXG5cdH0pLFxyXG5cdHNpbmdsZXRvbkVsZW1lbnQgPSBudWxsLFxyXG5cdHNpbmdsZXRvbkNvdW50ZXIgPSAwLFxyXG5cdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wID0gW107XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcclxuXHRpZih0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcclxuXHRcdGlmKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xyXG5cdH1cclxuXHJcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XHJcblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxyXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xyXG5cclxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgPGhlYWQ+LlxyXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XHJcblxyXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XHJcblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XHJcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xyXG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XHJcblx0XHR9XHJcblx0XHRpZihuZXdMaXN0KSB7XHJcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCk7XHJcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XHJcblx0XHR9XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcclxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xyXG5cdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKylcclxuXHRcdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKCk7XHJcblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucykge1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRpZihkb21TdHlsZSkge1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QpIHtcclxuXHR2YXIgc3R5bGVzID0gW107XHJcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHR2YXIgaWQgPSBpdGVtWzBdO1xyXG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XHJcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xyXG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XHJcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XHJcblx0XHRpZighbmV3U3R5bGVzW2lkXSlcclxuXHRcdFx0c3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcclxuXHRcdGVsc2VcclxuXHRcdFx0bmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xyXG5cdH1cclxuXHRyZXR1cm4gc3R5bGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KSB7XHJcblx0dmFyIGhlYWQgPSBnZXRIZWFkRWxlbWVudCgpO1xyXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wW3N0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xyXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XHJcblx0XHRpZighbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcclxuXHRcdFx0aGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCBoZWFkLmZpcnN0Q2hpbGQpO1xyXG5cdFx0fSBlbHNlIGlmKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XHJcblx0XHRcdGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AucHVzaChzdHlsZUVsZW1lbnQpO1xyXG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0Jy4gTXVzdCBiZSAndG9wJyBvciAnYm90dG9tJy5cIik7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XHJcblx0c3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHR2YXIgaWR4ID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZUVsZW1lbnQpO1xyXG5cdGlmKGlkeCA+PSAwKSB7XHJcblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuXHRzdHlsZUVsZW1lbnQudHlwZSA9IFwidGV4dC9jc3NcIjtcclxuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KTtcclxuXHRyZXR1cm4gc3R5bGVFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKSB7XHJcblx0dmFyIGxpbmtFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XHJcblx0bGlua0VsZW1lbnQucmVsID0gXCJzdHlsZXNoZWV0XCI7XHJcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmtFbGVtZW50KTtcclxuXHRyZXR1cm4gbGlua0VsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaiwgb3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQsIHVwZGF0ZSwgcmVtb3ZlO1xyXG5cclxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcclxuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gc2luZ2xldG9uRWxlbWVudCB8fCAoc2luZ2xldG9uRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCBmYWxzZSk7XHJcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCB0cnVlKTtcclxuXHR9IGVsc2UgaWYob2JqLnNvdXJjZU1hcCAmJlxyXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcclxuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0XHRpZihzdHlsZUVsZW1lbnQuaHJlZilcclxuXHRcdFx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlRWxlbWVudC5ocmVmKTtcclxuXHRcdH07XHJcblx0fSBlbHNlIHtcclxuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZShvYmopO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XHJcblx0XHRpZihuZXdPYmopIHtcclxuXHRcdFx0aWYobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZW1vdmUoKTtcclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xyXG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcclxuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcclxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xyXG5cdH07XHJcbn0pKCk7XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnKHN0eWxlRWxlbWVudCwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xyXG5cclxuXHRpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xyXG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2RlcztcclxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChjc3NOb2RlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcblxyXG5cdGlmKG1lZGlhKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXHJcblx0fVxyXG5cclxuXHRpZihzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcclxuXHR9IGVsc2Uge1xyXG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUxpbmsobGlua0VsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xyXG5cclxuXHRpZihzb3VyY2VNYXApIHtcclxuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XHJcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XHJcblx0fVxyXG5cclxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcclxuXHJcblx0dmFyIG9sZFNyYyA9IGxpbmtFbGVtZW50LmhyZWY7XHJcblxyXG5cdGxpbmtFbGVtZW50LmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG5cclxuXHRpZihvbGRTcmMpXHJcblx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjEzLjFAc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImNvbnN0IHdpbiA9IHdpbmRvdztcbmNvbnN0IHtcbiAgICBkb2N1bWVudDogZG9jLFxuICAgIFByb21pc2UsXG4gICAgY3JlYXRlanNcbn0gPSB3aW47XG5cbmZ1bmN0aW9uIGFwcGVuZFN0eWxlKGNzc1RleHQpIHtcbiAgICBjb25zdCBzdHlsZSA9IGRvYy5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHN0eWxlLnRleHRDb250ZW50ID0gY3NzVGV4dDtcbiAgICBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbmZ1bmN0aW9uIGRvbXJlYWR5KCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChkb2MucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCByZXNvbHZlKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBkZWZlcigpIHtcbiAgICBjb25zdCBkZWZlcnJlZCA9IHt9O1xuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGRlZmVycmVkLnJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICBkZWZlcnJlZC5yZWplY3QgPSByZWplY3RcbiAgICB9KTtcbiAgICBkZWZlcnJlZC5wcm9taXNlID0gcHJvbWlzZTtcbiAgICByZXR1cm4gZGVmZXJyZWQ7XG59XG5cbmZ1bmN0aW9uIGRlbGF5KHRpbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KHJlc29sdmUsIHRpbWUpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBxdWVyeSh2aWV3cG9ydCwgc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gdmlld3BvcnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG59XG5cbmZ1bmN0aW9uIHF1ZXJ5QWxsKHZpZXdwb3J0LCBzZWxlY3Rvcikge1xuICAgIHJldHVybiBbLi4udmlld3BvcnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcildO1xufVxuXG5mdW5jdGlvbiBnZXRSZWN0KGVsKSB7XG4gICAgcmV0dXJuIGVsLnJlY3RzIHx8IChlbC5yZWN0cyA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKTtcbn1cblxuZnVuY3Rpb24gZ2V0RGlzdGFuY2UoeDEsIHkxLCB4MiwgeTIpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KCh4MSAtIHgyKSAqICh4MSAtIHgyKSArICh5MSAtIHkyKSAqICh5MSAtIHkyKSk7XG59XG5cbmZ1bmN0aW9uIGltZzJDYW52YXMoaW1hZ2UsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICBjb25zdCBjYW52YXMgPSBkb2MuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcbiAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgIHJldHVybiBbY2FudmFzLCBjb250ZXh0XTtcbn1cblxuY29uc3QgcmFmID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24oZm4pIHtyZXR1cm4gc2V0VGltZW91dChmbiwgMSAvIDYwKX07XG5cbmNvbnN0IGNhZiA9IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSB8fCBcbiAgICAgICAgICAgIHdpbmRvdy53ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24oaWQpIHtjbGVhclRpbWVvdXQoaWQpfTtcblxuZXhwb3J0IHtcbiAgICB3aW4sXG4gICAgZG9jLFxuICAgIGRlZmVyLFxuICAgIFByb21pc2UsXG4gICAgY3JlYXRlanMsXG4gICAgYXBwZW5kU3R5bGUsXG4gICAgZG9tcmVhZHksXG4gICAgZGVsYXksXG4gICAgaW1nMkNhbnZhcyxcbiAgICBxdWVyeSxcbiAgICBxdWVyeUFsbCxcbiAgICBnZXRSZWN0LFxuICAgIGdldERpc3RhbmNlLFxuICAgIHJhZixcbiAgICBjYWZcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbC5qcyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2Zyb20gPSByZXF1aXJlKFwiLi4vY29yZS1qcy9hcnJheS9mcm9tXCIpO1xuXG52YXIgX2Zyb20yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZnJvbSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFycjJbaV0gPSBhcnJbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycjI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICgwLCBfZnJvbTIuZGVmYXVsdCkoYXJyKTtcbiAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2hlbHBlcnMvdG9Db25zdW1hYmxlQXJyYXkuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5hcnJheS5mcm9tJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5BcnJheS5mcm9tO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL2FycmF5L2Zyb20uanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG52YXIgJGF0ICA9IHJlcXVpcmUoJy4vX3N0cmluZy1hdCcpKHRydWUpO1xuXG4vLyAyMS4xLjMuMjcgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uKGl0ZXJhdGVkKXtcbiAgdGhpcy5fdCA9IFN0cmluZyhpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuLy8gMjEuMS41LjIuMSAlU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwgaW5kZXggPSB0aGlzLl9pXG4gICAgLCBwb2ludDtcbiAgaWYoaW5kZXggPj0gTy5sZW5ndGgpcmV0dXJuIHt2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlfTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICB0aGlzLl9pICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHt2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlfTtcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgZGVmaW5lZCAgID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xuLy8gdHJ1ZSAgLT4gU3RyaW5nI2F0XG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oVE9fU1RSSU5HKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKHRoYXQsIHBvcyl7XG4gICAgdmFyIHMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSlcbiAgICAgICwgaSA9IHRvSW50ZWdlcihwb3MpXG4gICAgICAsIGwgPSBzLmxlbmd0aFxuICAgICAgLCBhLCBiO1xuICAgIGlmKGkgPCAwIHx8IGkgPj0gbClyZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCAgPSBNYXRoLmNlaWxcbiAgLCBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCA9PSB1bmRlZmluZWQpdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RlZmluZWQuanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgICAgICAgID0gcmVxdWlyZSgnLi9fbGlicmFyeScpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHJlZGVmaW5lICAgICAgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKVxuICAsIGhpZGUgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIEl0ZXJhdG9ycyAgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCAkaXRlckNyZWF0ZSAgICA9IHJlcXVpcmUoJy4vX2l0ZXItY3JlYXRlJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKVxuICAsIElURVJBVE9SICAgICAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBCVUdHWSAgICAgICAgICA9ICEoW10ua2V5cyAmJiAnbmV4dCcgaW4gW10ua2V5cygpKSAvLyBTYWZhcmkgaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG4gICwgRkZfSVRFUkFUT1IgICAgPSAnQEBpdGVyYXRvcidcbiAgLCBLRVlTICAgICAgICAgICA9ICdrZXlzJ1xuICAsIFZBTFVFUyAgICAgICAgID0gJ3ZhbHVlcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQmFzZSwgTkFNRSwgQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKXtcbiAgJGl0ZXJDcmVhdGUoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICB2YXIgZ2V0TWV0aG9kID0gZnVuY3Rpb24oa2luZCl7XG4gICAgaWYoIUJVR0dZICYmIGtpbmQgaW4gcHJvdG8pcmV0dXJuIHByb3RvW2tpbmRdO1xuICAgIHN3aXRjaChraW5kKXtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICB9O1xuICB2YXIgVEFHICAgICAgICA9IE5BTUUgKyAnIEl0ZXJhdG9yJ1xuICAgICwgREVGX1ZBTFVFUyA9IERFRkFVTFQgPT0gVkFMVUVTXG4gICAgLCBWQUxVRVNfQlVHID0gZmFsc2VcbiAgICAsIHByb3RvICAgICAgPSBCYXNlLnByb3RvdHlwZVxuICAgICwgJG5hdGl2ZSAgICA9IHByb3RvW0lURVJBVE9SXSB8fCBwcm90b1tGRl9JVEVSQVRPUl0gfHwgREVGQVVMVCAmJiBwcm90b1tERUZBVUxUXVxuICAgICwgJGRlZmF1bHQgICA9ICRuYXRpdmUgfHwgZ2V0TWV0aG9kKERFRkFVTFQpXG4gICAgLCAkZW50cmllcyAgID0gREVGQVVMVCA/ICFERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoJ2VudHJpZXMnKSA6IHVuZGVmaW5lZFxuICAgICwgJGFueU5hdGl2ZSA9IE5BTUUgPT0gJ0FycmF5JyA/IHByb3RvLmVudHJpZXMgfHwgJG5hdGl2ZSA6ICRuYXRpdmVcbiAgICAsIG1ldGhvZHMsIGtleSwgSXRlcmF0b3JQcm90b3R5cGU7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYoJGFueU5hdGl2ZSl7XG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZigkYW55TmF0aXZlLmNhbGwobmV3IEJhc2UpKTtcbiAgICBpZihJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSl7XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvclByb3RvdHlwZSwgVEFHLCB0cnVlKTtcbiAgICAgIC8vIGZpeCBmb3Igc29tZSBvbGQgZW5naW5lc1xuICAgICAgaWYoIUxJQlJBUlkgJiYgIWhhcyhJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IpKWhpZGUoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgICB9XG4gIH1cbiAgLy8gZml4IEFycmF5I3t2YWx1ZXMsIEBAaXRlcmF0b3J9Lm5hbWUgaW4gVjggLyBGRlxuICBpZihERUZfVkFMVUVTICYmICRuYXRpdmUgJiYgJG5hdGl2ZS5uYW1lICE9PSBWQUxVRVMpe1xuICAgIFZBTFVFU19CVUcgPSB0cnVlO1xuICAgICRkZWZhdWx0ID0gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiAkbmF0aXZlLmNhbGwodGhpcyk7IH07XG4gIH1cbiAgLy8gRGVmaW5lIGl0ZXJhdG9yXG4gIGlmKCghTElCUkFSWSB8fCBGT1JDRUQpICYmIChCVUdHWSB8fCBWQUxVRVNfQlVHIHx8ICFwcm90b1tJVEVSQVRPUl0pKXtcbiAgICBoaWRlKHByb3RvLCBJVEVSQVRPUiwgJGRlZmF1bHQpO1xuICB9XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gJGRlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddICA9IHJldHVyblRoaXM7XG4gIGlmKERFRkFVTFQpe1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6ICBERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6ICAgIElTX1NFVCAgICAgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6ICRlbnRyaWVzXG4gICAgfTtcbiAgICBpZihGT1JDRUQpZm9yKGtleSBpbiBtZXRob2RzKXtcbiAgICAgIGlmKCEoa2V5IGluIHByb3RvKSlyZWRlZmluZShwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChCVUdHWSB8fCBWQUxVRVNfQlVHKSwgTkFNRSwgbWV0aG9kcyk7XG4gIH1cbiAgcmV0dXJuIG1ldGhvZHM7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gdHJ1ZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGNvcmUgICAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIGN0eCAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgaGlkZSAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24odHlwZSwgbmFtZSwgc291cmNlKXtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkZcbiAgICAsIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0LkdcbiAgICAsIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlNcbiAgICAsIElTX1BST1RPICA9IHR5cGUgJiAkZXhwb3J0LlBcbiAgICAsIElTX0JJTkQgICA9IHR5cGUgJiAkZXhwb3J0LkJcbiAgICAsIElTX1dSQVAgICA9IHR5cGUgJiAkZXhwb3J0LldcbiAgICAsIGV4cG9ydHMgICA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pXG4gICAgLCBleHBQcm90byAgPSBleHBvcnRzW1BST1RPVFlQRV1cbiAgICAsIHRhcmdldCAgICA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV1cbiAgICAsIGtleSwgb3duLCBvdXQ7XG4gIGlmKElTX0dMT0JBTClzb3VyY2UgPSBuYW1lO1xuICBmb3Ioa2V5IGluIHNvdXJjZSl7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZihvd24gJiYga2V5IGluIGV4cG9ydHMpY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbihDKXtcbiAgICAgIHZhciBGID0gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICAgIGlmKHRoaXMgaW5zdGFuY2VvZiBDKXtcbiAgICAgICAgICBzd2l0Y2goYXJndW1lbnRzLmxlbmd0aCl7XG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgQztcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDKGEpO1xuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEMoYSwgYik7XG4gICAgICAgICAgfSByZXR1cm4gbmV3IEMoYSwgYiwgYyk7XG4gICAgICAgIH0gcmV0dXJuIEMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLm1ldGhvZHMuJU5BTUUlXG4gICAgaWYoSVNfUFJPVE8pe1xuICAgICAgKGV4cG9ydHMudmlydHVhbCB8fCAoZXhwb3J0cy52aXJ0dWFsID0ge30pKVtrZXldID0gb3V0O1xuICAgICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLnByb3RvdHlwZS4lTkFNRSVcbiAgICAgIGlmKHR5cGUgJiAkZXhwb3J0LlIgJiYgZXhwUHJvdG8gJiYgIWV4cFByb3RvW2tleV0paGlkZShleHBQcm90bywga2V5LCBvdXQpO1xuICAgIH1cbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWAgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHt2ZXJzaW9uOiAnMi40LjAnfTtcbmlmKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgdGhhdCwgbGVuZ3RoKXtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYodGhhdCA9PT0gdW5kZWZpbmVkKXJldHVybiBmbjtcbiAgc3dpdGNoKGxlbmd0aCl7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYSl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgZFAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgYW5PYmplY3QgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBkUCAgICAgICAgICAgICA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpe1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYoSUU4X0RPTV9ERUZJTkUpdHJ5IHtcbiAgICByZXR1cm4gZFAoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgaWYoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKXRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmKCd2YWx1ZScgaW4gQXR0cmlidXRlcylPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZighaXNPYmplY3QoaXQpKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdkaXYnKSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudFxuICAvLyBpbiBvbGQgSUUgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCdcbiAgLCBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIFMpe1xuICBpZighaXNPYmplY3QoaXQpKXJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgaWYodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZighUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qc1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJpdG1hcCwgdmFsdWUpe1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGUgIDogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGUgICAgOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlICAgICAgIDogdmFsdWVcbiAgfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qc1xuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIGtleSl7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyYXRvcnMuanNcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNyZWF0ZSAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpXG4gICwgZGVzY3JpcHRvciAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faGlkZScpKEl0ZXJhdG9yUHJvdG90eXBlLCByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KXtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7bmV4dDogZGVzY3JpcHRvcigxLCBuZXh0KX0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG52YXIgYW5PYmplY3QgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGRQcyAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwcycpXG4gICwgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJylcbiAgLCBJRV9QUk9UTyAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKVxuICAsIEVtcHR5ICAgICAgID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfVxuICAsIFBST1RPVFlQRSAgID0gJ3Byb3RvdHlwZSc7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24oKXtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnaWZyYW1lJylcbiAgICAsIGkgICAgICA9IGVudW1CdWdLZXlzLmxlbmd0aFxuICAgICwgbHQgICAgID0gJzwnXG4gICAgLCBndCAgICAgPSAnPidcbiAgICAsIGlmcmFtZURvY3VtZW50O1xuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgcmVxdWlyZSgnLi9faHRtbCcpLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDonOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNjcmlwdC11cmxcbiAgLy8gY3JlYXRlRGljdCA9IGlmcmFtZS5jb250ZW50V2luZG93Lk9iamVjdDtcbiAgLy8gaHRtbC5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKGx0ICsgJ3NjcmlwdCcgKyBndCArICdkb2N1bWVudC5GPU9iamVjdCcgKyBsdCArICcvc2NyaXB0JyArIGd0KTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgY3JlYXRlRGljdCA9IGlmcmFtZURvY3VtZW50LkY7XG4gIHdoaWxlKGktLSlkZWxldGUgY3JlYXRlRGljdFtQUk9UT1RZUEVdW2VudW1CdWdLZXlzW2ldXTtcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcyl7XG4gIHZhciByZXN1bHQ7XG4gIGlmKE8gIT09IG51bGwpe1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHk7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gY3JlYXRlRGljdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZFBzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgZFAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBnZXRLZXlzICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBrZXlzICAgPSBnZXRLZXlzKFByb3BlcnRpZXMpXG4gICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICwgaSA9IDBcbiAgICAsIFA7XG4gIHdoaWxlKGxlbmd0aCA+IGkpZFAuZihPLCBQID0ga2V5c1tpKytdLCBQcm9wZXJ0aWVzW1BdKTtcbiAgcmV0dXJuIE87XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcHMuanNcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpXG4gICwgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKXtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGhhcyAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgdG9JT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgYXJyYXlJbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSlcbiAgLCBJRV9QUk9UTyAgICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0LCBuYW1lcyl7XG4gIHZhciBPICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxuICAgICwgaSAgICAgID0gMFxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGtleTtcbiAgZm9yKGtleSBpbiBPKWlmKGtleSAhPSBJRV9QUk9UTyloYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpaWYoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKXtcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0JylcbiAgLCBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9MZW5ndGggID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCB0b0luZGV4ICAgPSByZXF1aXJlKCcuL190by1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihJU19JTkNMVURFUyl7XG4gIHJldHVybiBmdW5jdGlvbigkdGhpcywgZWwsIGZyb21JbmRleCl7XG4gICAgdmFyIE8gICAgICA9IHRvSU9iamVjdCgkdGhpcylcbiAgICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IHRvSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpXG4gICAgICAsIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICBpZihJU19JTkNMVURFUyAmJiBlbCAhPSBlbCl3aGlsZShsZW5ndGggPiBpbmRleCl7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICBpZih2YWx1ZSAhPSB2YWx1ZSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSN0b0luZGV4IGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvcig7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspaWYoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTyl7XG4gICAgICBpZihPW2luZGV4XSA9PT0gZWwpcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qc1xuLy8gbW9kdWxlIGlkID0gNDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanNcbi8vIG1vZHVsZSBpZCA9IDQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIG1heCAgICAgICA9IE1hdGgubWF4XG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGluZGV4LCBsZW5ndGgpe1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKVxuICAsIHVpZCAgICA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzXG4vLyBtb2R1bGUgaWQgPSA0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nXG4gICwgc3RvcmUgID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzXG4vLyBtb2R1bGUgaWQgPSA0NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBpZCA9IDBcbiAgLCBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qc1xuLy8gbW9kdWxlIGlkID0gNDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSA0OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2h0bWwuanNcbi8vIG1vZHVsZSBpZCA9IDQ5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGRlZiA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZcbiAgLCBoYXMgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCB0YWcsIHN0YXQpe1xuICBpZihpdCAmJiAhaGFzKGl0ID0gc3RhdCA/IGl0IDogaXQucHJvdG90eXBlLCBUQUcpKWRlZihpdCwgVEFHLCB7Y29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogdGFnfSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzXG4vLyBtb2R1bGUgaWQgPSA1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBzdG9yZSAgICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ3drcycpXG4gICwgdWlkICAgICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpXG4gICwgU3ltYm9sICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLlN5bWJvbFxuICAsIFVTRV9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09ICdmdW5jdGlvbic7XG5cbnZhciAkZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSl7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxuICAgIFVTRV9TWU1CT0wgJiYgU3ltYm9sW25hbWVdIHx8IChVU0VfU1lNQk9MID8gU3ltYm9sIDogdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuXG4kZXhwb3J0cy5zdG9yZSA9IHN0b3JlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy5qc1xuLy8gbW9kdWxlIGlkID0gNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyAxOS4xLjIuOSAvIDE1LjIuMy4yIE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIGhhcyAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCB0b09iamVjdCAgICA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgSUVfUFJPVE8gICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJylcbiAgLCBPYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmdldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uKE8pe1xuICBPID0gdG9PYmplY3QoTyk7XG4gIGlmKGhhcyhPLCBJRV9QUk9UTykpcmV0dXJuIE9bSUVfUFJPVE9dO1xuICBpZih0eXBlb2YgTy5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIE8gaW5zdGFuY2VvZiBPLmNvbnN0cnVjdG9yKXtcbiAgICByZXR1cm4gTy5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIH0gcmV0dXJuIE8gaW5zdGFuY2VvZiBPYmplY3QgPyBPYmplY3RQcm90byA6IG51bGw7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1ncG8uanNcbi8vIG1vZHVsZSBpZCA9IDUyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gNTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG52YXIgY3R4ICAgICAgICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCB0b09iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgY2FsbCAgICAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKVxuICAsIGlzQXJyYXlJdGVyICAgID0gcmVxdWlyZSgnLi9faXMtYXJyYXktaXRlcicpXG4gICwgdG9MZW5ndGggICAgICAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fY3JlYXRlLXByb3BlcnR5JylcbiAgLCBnZXRJdGVyRm4gICAgICA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2l0ZXItZGV0ZWN0JykoZnVuY3Rpb24oaXRlcil7IEFycmF5LmZyb20oaXRlcik7IH0pLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMi4xIEFycmF5LmZyb20oYXJyYXlMaWtlLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgZnJvbTogZnVuY3Rpb24gZnJvbShhcnJheUxpa2UvKiwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQqLyl7XG4gICAgdmFyIE8gICAgICAgPSB0b09iamVjdChhcnJheUxpa2UpXG4gICAgICAsIEMgICAgICAgPSB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nID8gdGhpcyA6IEFycmF5XG4gICAgICAsIGFMZW4gICAgPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgICAsIG1hcGZuICAgPSBhTGVuID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZFxuICAgICAgLCBtYXBwaW5nID0gbWFwZm4gIT09IHVuZGVmaW5lZFxuICAgICAgLCBpbmRleCAgID0gMFxuICAgICAgLCBpdGVyRm4gID0gZ2V0SXRlckZuKE8pXG4gICAgICAsIGxlbmd0aCwgcmVzdWx0LCBzdGVwLCBpdGVyYXRvcjtcbiAgICBpZihtYXBwaW5nKW1hcGZuID0gY3R4KG1hcGZuLCBhTGVuID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZCwgMik7XG4gICAgLy8gaWYgb2JqZWN0IGlzbid0IGl0ZXJhYmxlIG9yIGl0J3MgYXJyYXkgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yIC0gdXNlIHNpbXBsZSBjYXNlXG4gICAgaWYoaXRlckZuICE9IHVuZGVmaW5lZCAmJiAhKEMgPT0gQXJyYXkgJiYgaXNBcnJheUl0ZXIoaXRlckZuKSkpe1xuICAgICAgZm9yKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoTyksIHJlc3VsdCA9IG5ldyBDOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7IGluZGV4Kyspe1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCBtYXBwaW5nID8gY2FsbChpdGVyYXRvciwgbWFwZm4sIFtzdGVwLnZhbHVlLCBpbmRleF0sIHRydWUpIDogc3RlcC52YWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICAgIGZvcihyZXN1bHQgPSBuZXcgQyhsZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKyl7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIG1hcHBpbmcgPyBtYXBmbihPW2luZGV4XSwgaW5kZXgpIDogT1tpbmRleF0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQubGVuZ3RoID0gaW5kZXg7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5mcm9tLmpzXG4vLyBtb2R1bGUgaWQgPSA1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIGNhbGwgc29tZXRoaW5nIG9uIGl0ZXJhdG9yIHN0ZXAgd2l0aCBzYWZlIGNsb3Npbmcgb24gZXJyb3JcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdGVyYXRvciwgZm4sIHZhbHVlLCBlbnRyaWVzKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZW50cmllcyA/IGZuKGFuT2JqZWN0KHZhbHVlKVswXSwgdmFsdWVbMV0pIDogZm4odmFsdWUpO1xuICAvLyA3LjQuNiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCBjb21wbGV0aW9uKVxuICB9IGNhdGNoKGUpe1xuICAgIHZhciByZXQgPSBpdGVyYXRvclsncmV0dXJuJ107XG4gICAgaWYocmV0ICE9PSB1bmRlZmluZWQpYW5PYmplY3QocmV0LmNhbGwoaXRlcmF0b3IpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY2FsbC5qc1xuLy8gbW9kdWxlIGlkID0gNTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBjaGVjayBvbiBkZWZhdWx0IEFycmF5IGl0ZXJhdG9yXG52YXIgSXRlcmF0b3JzICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgSVRFUkFUT1IgICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgQXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG9bSVRFUkFUT1JdID09PSBpdCk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LWl0ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgY3JlYXRlRGVzYyAgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgaW5kZXgsIHZhbHVlKXtcbiAgaWYoaW5kZXggaW4gb2JqZWN0KSRkZWZpbmVQcm9wZXJ0eS5mKG9iamVjdCwgaW5kZXgsIGNyZWF0ZURlc2MoMCwgdmFsdWUpKTtcbiAgZWxzZSBvYmplY3RbaW5kZXhdID0gdmFsdWU7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NyZWF0ZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgY2xhc3NvZiAgID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpXG4gICwgSVRFUkFUT1IgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmdldEl0ZXJhdG9yTWV0aG9kID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCAhPSB1bmRlZmluZWQpcmV0dXJuIGl0W0lURVJBVE9SXVxuICAgIHx8IGl0WydAQGl0ZXJhdG9yJ11cbiAgICB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qc1xuLy8gbW9kdWxlIGlkID0gNThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBnZXR0aW5nIHRhZyBmcm9tIDE5LjEuMy42IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcoKVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpXG4gICwgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJylcbiAgLy8gRVMzIHdyb25nIGhlcmVcbiAgLCBBUkcgPSBjb2YoZnVuY3Rpb24oKXsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PSAnQXJndW1lbnRzJztcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgU2NyaXB0IEFjY2VzcyBEZW5pZWQgZXJyb3JcbnZhciB0cnlHZXQgPSBmdW5jdGlvbihpdCwga2V5KXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gaXRba2V5XTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBPLCBULCBCO1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAoVCA9IHRyeUdldChPID0gT2JqZWN0KGl0KSwgVEFHKSkgPT0gJ3N0cmluZycgPyBUXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBBUkcgPyBjb2YoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAoQiA9IGNvZihPKSkgPT0gJ09iamVjdCcgJiYgdHlwZW9mIE8uY2FsbGVlID09ICdmdW5jdGlvbicgPyAnQXJndW1lbnRzJyA6IEI7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NsYXNzb2YuanNcbi8vIG1vZHVsZSBpZCA9IDU5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIElURVJBVE9SICAgICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgU0FGRV9DTE9TSU5HID0gZmFsc2U7XG5cbnRyeSB7XG4gIHZhciByaXRlciA9IFs3XVtJVEVSQVRPUl0oKTtcbiAgcml0ZXJbJ3JldHVybiddID0gZnVuY3Rpb24oKXsgU0FGRV9DTE9TSU5HID0gdHJ1ZTsgfTtcbiAgQXJyYXkuZnJvbShyaXRlciwgZnVuY3Rpb24oKXsgdGhyb3cgMjsgfSk7XG59IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYywgc2tpcENsb3Npbmcpe1xuICBpZighc2tpcENsb3NpbmcgJiYgIVNBRkVfQ0xPU0lORylyZXR1cm4gZmFsc2U7XG4gIHZhciBzYWZlID0gZmFsc2U7XG4gIHRyeSB7XG4gICAgdmFyIGFyciAgPSBbN11cbiAgICAgICwgaXRlciA9IGFycltJVEVSQVRPUl0oKTtcbiAgICBpdGVyLm5leHQgPSBmdW5jdGlvbigpeyByZXR1cm4ge2RvbmU6IHNhZmUgPSB0cnVlfTsgfTtcbiAgICBhcnJbSVRFUkFUT1JdID0gZnVuY3Rpb24oKXsgcmV0dXJuIGl0ZXI7IH07XG4gICAgZXhlYyhhcnIpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBzYWZlO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRldGVjdC5qc1xuLy8gbW9kdWxlIGlkID0gNjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJpbXBvcnQge1xuICAgIHdpbixcbiAgICBkb2MsXG4gICAgUHJvbWlzZSxcbiAgICBxdWVyeSxcbiAgICBxdWVyeUFsbCxcbiAgICBnZXRSZWN0XG59IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgJ2dlc3R1cmUtanMnO1xuaW1wb3J0IEV2ZW50IGZyb20gJy4vZXZlbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY3JvbGxlciBleHRlbmRzIEV2ZW50e1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQsIHZ3LCB2aCwgc2NhbGUgPSAxKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5faXNTY3JvbGxpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZW5hYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3NjYWxlID0gc2NhbGU7XG5cbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy52dyA9IHZ3O1xuICAgICAgICB0aGlzLnZoID0gdmg7XG4gICAgICAgIHRoaXMueCA9IDA7XG4gICAgICAgIHRoaXMueSA9IDA7XG4gICAgICAgIHRoaXMubHggPSAwO1xuICAgICAgICB0aGlzLmx5ID0gMDtcbiAgICB9XG5cbiAgICBnZXQgaXNTY3JvbGxpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc1Njcm9sbGluZztcbiAgICB9XG5cbiAgICBnZXQgc2NhbGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZTtcbiAgICB9XG5cbiAgICBzZXQgc2NhbGUoc2NhbGUpIHtcbiAgICAgICAgdGhpcy5fc2NhbGUgPSBzY2FsZTtcbiAgICB9XG5cbiAgICBnZXQgZW5hYmxlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZW5hYmxlO1xuICAgIH1cblxuICAgIHNldCBlbmFibGUoZW5hYmxlKSB7XG4gICAgICAgIHRoaXMuX2VuYWJsZSA9IGVuYWJsZTtcbiAgICB9XG5cbiAgICBfZW1pdChuYW1lLCBvcmlnaW5hbEV2ZW50LCBleHRyYSA9IHt9KSB7XG4gICAgICAgIGNvbnN0IGUgPSB7XG4gICAgICAgICAgICB4OiB0aGlzLngsXG4gICAgICAgICAgICB5OiB0aGlzLnksXG4gICAgICAgICAgICBseDogdGhpcy5seCxcbiAgICAgICAgICAgIGx5OiB0aGlzLmx5LFxuICAgICAgICAgICAgb3JpZ2luYWxFdmVudFxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIGV4dHJhKSB7XG4gICAgICAgICAgICBlW2tleV0gPSBleHRyYVtrZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbWl0KG5hbWUsIGUpO1xuICAgIH1cblxuICAgIHJlYWR5KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5faXNTY3JvbGxpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgY29uc3QgZW1pdFRhcCA9IGUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3RhcCcsIGUsIHtcbiAgICAgICAgICAgICAgICAgICAgZXg6IHRoaXMueCArIGUudG91Y2guY2xpZW50WCxcbiAgICAgICAgICAgICAgICAgICAgZXk6IHRoaXMueSArIGUudG91Y2guY2xpZW50WVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBlbWl0U3RhcnQgPSBlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pc1Njcm9sbGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5seCA9IHRoaXMueDtcbiAgICAgICAgICAgICAgICB0aGlzLmx5ID0gdGhpcy55O1xuICAgICAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Njcm9sbHN0YXJ0JywgZSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjb25zdCBlbWl0U2Nyb2xsID0gZSA9PiB0aGlzLl9lbWl0KCdzY3JvbGxpbmcnLCBlKTtcblxuICAgICAgICAgICAgY29uc3QgZW1pdEVuZCA9IGUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2lzU2Nyb2xsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5fZW1pdCgnc2Nyb2xsZW5kJywgZSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjb25zdCBjYWxYWSA9IChlLCBub1NjYWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGFjZW1lbnRYLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGFjZW1lbnRZXG4gICAgICAgICAgICAgICAgfSA9IGU7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBzY2FsZSA9IG5vU2NhbGUgPyAxIDogdGhpcy5fc2NhbGU7XG4gICAgICAgICAgICAgICAgbGV0IHggPSB0aGlzLmx4IC0gZGlzcGxhY2VtZW50WCAqIHNjYWxlO1xuICAgICAgICAgICAgICAgIGxldCB5ID0gdGhpcy5seSAtIGRpc3BsYWNlbWVudFkgKiBzY2FsZTtcblxuICAgICAgICAgICAgICAgIHggPSBNYXRoLm1pbihNYXRoLm1heCgwLCB4KSwgdGhpcy53aWR0aCAtIHRoaXMudncpO1xuICAgICAgICAgICAgICAgIHkgPSBNYXRoLm1pbihNYXRoLm1heCgwLCB5KSwgdGhpcy5oZWlnaHQgLSB0aGlzLnZoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZG9jLmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigndGFwJywgZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZW5hYmxlICYmIGVtaXRUYXAoZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZG9jLmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigncGFuc3RhcnQnLCBlID0+IFxuICAgICAgICAgICAgICAgIHRoaXMuX2VuYWJsZSAmJiBlbWl0U3RhcnQoZSlcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGRvYy5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3Bhbm1vdmUnLCBlID0+IFxuICAgICAgICAgICAgICAgIHRoaXMuX2VuYWJsZSAmJiBjYWxYWShlKSAmJiBlbWl0U2Nyb2xsKGUpIFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgZG9jLmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigncGFuZW5kJywgZSA9PiBcbiAgICAgICAgICAgICAgICB0aGlzLl9lbmFibGUgJiYgZW1pdEVuZChlKSAgICAgIFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgdGhpcy5zY3JvbGxUbyA9ICh4LCB5KSA9PiB7XG4gICAgICAgICAgICAgICAgZW1pdFN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgY2FsWFkoe1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGFjZW1lbnRYOiB0aGlzLnggLSB4LFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGFjZW1lbnRZOiB0aGlzLnkgLSB5XG4gICAgICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgZW1pdFNjcm9sbCgpO1xuICAgICAgICAgICAgICAgIGVtaXRFbmQoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JvbGxlci5qcyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZlwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qc1xuLy8gbW9kdWxlIGlkID0gNjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LXByb3RvdHlwZS1vZicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtcHJvdG90eXBlLW9mLmpzXG4vLyBtb2R1bGUgaWQgPSA2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIDE5LjEuMi45IE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIHRvT2JqZWN0ICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgJGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2dldFByb3RvdHlwZU9mJywgZnVuY3Rpb24oKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGdldFByb3RvdHlwZU9mKGl0KXtcbiAgICByZXR1cm4gJGdldFByb3RvdHlwZU9mKHRvT2JqZWN0KGl0KSk7XG4gIH07XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LXByb3RvdHlwZS1vZi5qc1xuLy8gbW9kdWxlIGlkID0gNjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBtb3N0IE9iamVjdCBtZXRob2RzIGJ5IEVTNiBzaG91bGQgYWNjZXB0IHByaW1pdGl2ZXNcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBjb3JlICAgID0gcmVxdWlyZSgnLi9fY29yZScpXG4gICwgZmFpbHMgICA9IHJlcXVpcmUoJy4vX2ZhaWxzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEtFWSwgZXhlYyl7XG4gIHZhciBmbiAgPSAoY29yZS5PYmplY3QgfHwge30pW0tFWV0gfHwgT2JqZWN0W0tFWV1cbiAgICAsIGV4cCA9IHt9O1xuICBleHBbS0VZXSA9IGV4ZWMoZm4pO1xuICAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIGZhaWxzKGZ1bmN0aW9uKCl7IGZuKDEpOyB9KSwgJ09iamVjdCcsIGV4cCk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1zYXAuanNcbi8vIG1vZHVsZSBpZCA9IDY1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qc1xuLy8gbW9kdWxlIGlkID0gNjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIik7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmaW5lUHJvcGVydHkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0oKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MuanNcbi8vIG1vZHVsZSBpZCA9IDY3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2Mpe1xuICByZXR1cm4gJE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuLy8gMTkuMS4yLjQgLyAxNS4yLjMuNiBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyksICdPYmplY3QnLCB7ZGVmaW5lUHJvcGVydHk6IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZ9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA3MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3R5cGVvZjIgPSByZXF1aXJlKFwiLi4vaGVscGVycy90eXBlb2ZcIik7XG5cbnZhciBfdHlwZW9mMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3R5cGVvZjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoc2VsZiwgY2FsbCkge1xuICBpZiAoIXNlbGYpIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gY2FsbCAmJiAoKHR5cGVvZiBjYWxsID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6ICgwLCBfdHlwZW9mMy5kZWZhdWx0KShjYWxsKSkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4uanNcbi8vIG1vZHVsZSBpZCA9IDcxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfaXRlcmF0b3IgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9zeW1ib2wvaXRlcmF0b3JcIik7XG5cbnZhciBfaXRlcmF0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXRlcmF0b3IpO1xuXG52YXIgX3N5bWJvbCA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL3N5bWJvbFwiKTtcblxudmFyIF9zeW1ib2wyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3ltYm9sKTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBfaXRlcmF0b3IyLmRlZmF1bHQgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBfc3ltYm9sMi5kZWZhdWx0ICYmIG9iaiAhPT0gX3N5bWJvbDIuZGVmYXVsdC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBfdHlwZW9mKF9pdGVyYXRvcjIuZGVmYXVsdCkgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqKTtcbn0gOiBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IF9zeW1ib2wyLmRlZmF1bHQgJiYgb2JqICE9PSBfc3ltYm9sMi5kZWZhdWx0LnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qc1xuLy8gbW9kdWxlIGlkID0gNzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gNzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL193a3MtZXh0JykuZignaXRlcmF0b3InKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDc0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwicmVxdWlyZSgnLi9lczYuYXJyYXkuaXRlcmF0b3InKTtcbnZhciBnbG9iYWwgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBoaWRlICAgICAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgSXRlcmF0b3JzICAgICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgVE9fU1RSSU5HX1RBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuXG5mb3IodmFyIGNvbGxlY3Rpb25zID0gWydOb2RlTGlzdCcsICdET01Ub2tlbkxpc3QnLCAnTWVkaWFMaXN0JywgJ1N0eWxlU2hlZXRMaXN0JywgJ0NTU1J1bGVMaXN0J10sIGkgPSAwOyBpIDwgNTsgaSsrKXtcbiAgdmFyIE5BTUUgICAgICAgPSBjb2xsZWN0aW9uc1tpXVxuICAgICwgQ29sbGVjdGlvbiA9IGdsb2JhbFtOQU1FXVxuICAgICwgcHJvdG8gICAgICA9IENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGU7XG4gIGlmKHByb3RvICYmICFwcm90b1tUT19TVFJJTkdfVEFHXSloaWRlKHByb3RvLCBUT19TVFJJTkdfVEFHLCBOQU1FKTtcbiAgSXRlcmF0b3JzW05BTUVdID0gSXRlcmF0b3JzLkFycmF5O1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gNzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4vX2FkZC10by11bnNjb3BhYmxlcycpXG4gICwgc3RlcCAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXItc3RlcCcpXG4gICwgSXRlcmF0b3JzICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgdG9JT2JqZWN0ICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcblxuLy8gMjIuMS4zLjQgQXJyYXkucHJvdG90eXBlLmVudHJpZXMoKVxuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5rZXlzKClcbi8vIDIyLjEuMy4yOSBBcnJheS5wcm90b3R5cGUudmFsdWVzKClcbi8vIDIyLjEuMy4zMCBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbihpdGVyYXRlZCwga2luZCl7XG4gIHRoaXMuX3QgPSB0b0lPYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgIC8vIGtpbmRcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwga2luZCAgPSB0aGlzLl9rXG4gICAgLCBpbmRleCA9IHRoaXMuX2krKztcbiAgaWYoIU8gfHwgaW5kZXggPj0gTy5sZW5ndGgpe1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYoa2luZCA9PSAna2V5cycgIClyZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmKGtpbmQgPT0gJ3ZhbHVlcycpcmV0dXJuIHN0ZXAoMCwgT1tpbmRleF0pO1xuICByZXR1cm4gc3RlcCgwLCBbaW5kZXgsIE9baW5kZXhdXSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJSAoOS40LjQuNiwgOS40LjQuNylcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbmFkZFRvVW5zY29wYWJsZXMoJ2tleXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ3ZhbHVlcycpO1xuYWRkVG9VbnNjb3BhYmxlcygnZW50cmllcycpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA3NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hZGQtdG8tdW5zY29wYWJsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDc3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkb25lLCB2YWx1ZSl7XG4gIHJldHVybiB7dmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmV9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLXN0ZXAuanNcbi8vIG1vZHVsZSBpZCA9IDc4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fd2tzJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWV4dC5qc1xuLy8gbW9kdWxlIGlkID0gNzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC5qc1xuLy8gbW9kdWxlIGlkID0gODBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zeW1ib2wnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3LnN5bWJvbC5hc3luYy1pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLlN5bWJvbDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDgxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuLy8gRUNNQVNjcmlwdCA2IHN5bWJvbHMgc2hpbVxudmFyIGdsb2JhbCAgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgREVTQ1JJUFRPUlMgICAgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHJlZGVmaW5lICAgICAgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKVxuICAsIE1FVEEgICAgICAgICAgID0gcmVxdWlyZSgnLi9fbWV0YScpLktFWVxuICAsICRmYWlscyAgICAgICAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKVxuICAsIHNoYXJlZCAgICAgICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCB1aWQgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpXG4gICwgd2tzICAgICAgICAgICAgPSByZXF1aXJlKCcuL193a3MnKVxuICAsIHdrc0V4dCAgICAgICAgID0gcmVxdWlyZSgnLi9fd2tzLWV4dCcpXG4gICwgd2tzRGVmaW5lICAgICAgPSByZXF1aXJlKCcuL193a3MtZGVmaW5lJylcbiAgLCBrZXlPZiAgICAgICAgICA9IHJlcXVpcmUoJy4vX2tleW9mJylcbiAgLCBlbnVtS2V5cyAgICAgICA9IHJlcXVpcmUoJy4vX2VudW0ta2V5cycpXG4gICwgaXNBcnJheSAgICAgICAgPSByZXF1aXJlKCcuL19pcy1hcnJheScpXG4gICwgYW5PYmplY3QgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIHRvSU9iamVjdCAgICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9QcmltaXRpdmUgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIGNyZWF0ZURlc2MgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpXG4gICwgX2NyZWF0ZSAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJylcbiAgLCBnT1BORXh0ICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuLWV4dCcpXG4gICwgJEdPUEQgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpXG4gICwgJERQICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsICRrZXlzICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIGdPUEQgICAgICAgICAgID0gJEdPUEQuZlxuICAsIGRQICAgICAgICAgICAgID0gJERQLmZcbiAgLCBnT1BOICAgICAgICAgICA9IGdPUE5FeHQuZlxuICAsICRTeW1ib2wgICAgICAgID0gZ2xvYmFsLlN5bWJvbFxuICAsICRKU09OICAgICAgICAgID0gZ2xvYmFsLkpTT05cbiAgLCBfc3RyaW5naWZ5ICAgICA9ICRKU09OICYmICRKU09OLnN0cmluZ2lmeVxuICAsIFBST1RPVFlQRSAgICAgID0gJ3Byb3RvdHlwZSdcbiAgLCBISURERU4gICAgICAgICA9IHdrcygnX2hpZGRlbicpXG4gICwgVE9fUFJJTUlUSVZFICAgPSB3a3MoJ3RvUHJpbWl0aXZlJylcbiAgLCBpc0VudW0gICAgICAgICA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlXG4gICwgU3ltYm9sUmVnaXN0cnkgPSBzaGFyZWQoJ3N5bWJvbC1yZWdpc3RyeScpXG4gICwgQWxsU3ltYm9scyAgICAgPSBzaGFyZWQoJ3N5bWJvbHMnKVxuICAsIE9QU3ltYm9scyAgICAgID0gc2hhcmVkKCdvcC1zeW1ib2xzJylcbiAgLCBPYmplY3RQcm90byAgICA9IE9iamVjdFtQUk9UT1RZUEVdXG4gICwgVVNFX05BVElWRSAgICAgPSB0eXBlb2YgJFN5bWJvbCA9PSAnZnVuY3Rpb24nXG4gICwgUU9iamVjdCAgICAgICAgPSBnbG9iYWwuUU9iamVjdDtcbi8vIERvbid0IHVzZSBzZXR0ZXJzIGluIFF0IFNjcmlwdCwgaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzE3M1xudmFyIHNldHRlciA9ICFRT2JqZWN0IHx8ICFRT2JqZWN0W1BST1RPVFlQRV0gfHwgIVFPYmplY3RbUFJPVE9UWVBFXS5maW5kQ2hpbGQ7XG5cbi8vIGZhbGxiYWNrIGZvciBvbGQgQW5kcm9pZCwgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTY4N1xudmFyIHNldFN5bWJvbERlc2MgPSBERVNDUklQVE9SUyAmJiAkZmFpbHMoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIF9jcmVhdGUoZFAoe30sICdhJywge1xuICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIGRQKHRoaXMsICdhJywge3ZhbHVlOiA3fSkuYTsgfVxuICB9KSkuYSAhPSA3O1xufSkgPyBmdW5jdGlvbihpdCwga2V5LCBEKXtcbiAgdmFyIHByb3RvRGVzYyA9IGdPUEQoT2JqZWN0UHJvdG8sIGtleSk7XG4gIGlmKHByb3RvRGVzYylkZWxldGUgT2JqZWN0UHJvdG9ba2V5XTtcbiAgZFAoaXQsIGtleSwgRCk7XG4gIGlmKHByb3RvRGVzYyAmJiBpdCAhPT0gT2JqZWN0UHJvdG8pZFAoT2JqZWN0UHJvdG8sIGtleSwgcHJvdG9EZXNjKTtcbn0gOiBkUDtcblxudmFyIHdyYXAgPSBmdW5jdGlvbih0YWcpe1xuICB2YXIgc3ltID0gQWxsU3ltYm9sc1t0YWddID0gX2NyZWF0ZSgkU3ltYm9sW1BST1RPVFlQRV0pO1xuICBzeW0uX2sgPSB0YWc7XG4gIHJldHVybiBzeW07XG59O1xuXG52YXIgaXNTeW1ib2wgPSBVU0VfTkFUSVZFICYmIHR5cGVvZiAkU3ltYm9sLml0ZXJhdG9yID09ICdzeW1ib2wnID8gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnO1xufSA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0IGluc3RhbmNlb2YgJFN5bWJvbDtcbn07XG5cbnZhciAkZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBEKXtcbiAgaWYoaXQgPT09IE9iamVjdFByb3RvKSRkZWZpbmVQcm9wZXJ0eShPUFN5bWJvbHMsIGtleSwgRCk7XG4gIGFuT2JqZWN0KGl0KTtcbiAga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKTtcbiAgYW5PYmplY3QoRCk7XG4gIGlmKGhhcyhBbGxTeW1ib2xzLCBrZXkpKXtcbiAgICBpZighRC5lbnVtZXJhYmxlKXtcbiAgICAgIGlmKCFoYXMoaXQsIEhJRERFTikpZFAoaXQsIEhJRERFTiwgY3JlYXRlRGVzYygxLCB7fSkpO1xuICAgICAgaXRbSElEREVOXVtrZXldID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSlpdFtISURERU5dW2tleV0gPSBmYWxzZTtcbiAgICAgIEQgPSBfY3JlYXRlKEQsIHtlbnVtZXJhYmxlOiBjcmVhdGVEZXNjKDAsIGZhbHNlKX0pO1xuICAgIH0gcmV0dXJuIHNldFN5bWJvbERlc2MoaXQsIGtleSwgRCk7XG4gIH0gcmV0dXJuIGRQKGl0LCBrZXksIEQpO1xufTtcbnZhciAkZGVmaW5lUHJvcGVydGllcyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoaXQsIFApe1xuICBhbk9iamVjdChpdCk7XG4gIHZhciBrZXlzID0gZW51bUtleXMoUCA9IHRvSU9iamVjdChQKSlcbiAgICAsIGkgICAgPSAwXG4gICAgLCBsID0ga2V5cy5sZW5ndGhcbiAgICAsIGtleTtcbiAgd2hpbGUobCA+IGkpJGRlZmluZVByb3BlcnR5KGl0LCBrZXkgPSBrZXlzW2krK10sIFBba2V5XSk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgJGNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpdCwgUCl7XG4gIHJldHVybiBQID09PSB1bmRlZmluZWQgPyBfY3JlYXRlKGl0KSA6ICRkZWZpbmVQcm9wZXJ0aWVzKF9jcmVhdGUoaXQpLCBQKTtcbn07XG52YXIgJHByb3BlcnR5SXNFbnVtZXJhYmxlID0gZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoa2V5KXtcbiAgdmFyIEUgPSBpc0VudW0uY2FsbCh0aGlzLCBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpKTtcbiAgaWYodGhpcyA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gRSB8fCAhaGFzKHRoaXMsIGtleSkgfHwgIWhhcyhBbGxTeW1ib2xzLCBrZXkpIHx8IGhhcyh0aGlzLCBISURERU4pICYmIHRoaXNbSElEREVOXVtrZXldID8gRSA6IHRydWU7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSl7XG4gIGl0ICA9IHRvSU9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGlmKGl0ID09PSBPYmplY3RQcm90byAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKE9QU3ltYm9scywga2V5KSlyZXR1cm47XG4gIHZhciBEID0gZ09QRChpdCwga2V5KTtcbiAgaWYoRCAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0pKUQuZW51bWVyYWJsZSA9IHRydWU7XG4gIHJldHVybiBEO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlOYW1lcyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpe1xuICB2YXIgbmFtZXMgID0gZ09QTih0b0lPYmplY3QoaXQpKVxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGkgICAgICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSl7XG4gICAgaWYoIWhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiBrZXkgIT0gSElEREVOICYmIGtleSAhPSBNRVRBKXJlc3VsdC5wdXNoKGtleSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgJGdldE93blByb3BlcnR5U3ltYm9scyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5U3ltYm9scyhpdCl7XG4gIHZhciBJU19PUCAgPSBpdCA9PT0gT2JqZWN0UHJvdG9cbiAgICAsIG5hbWVzICA9IGdPUE4oSVNfT1AgPyBPUFN5bWJvbHMgOiB0b0lPYmplY3QoaXQpKVxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGkgICAgICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSl7XG4gICAgaWYoaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pICYmIChJU19PUCA/IGhhcyhPYmplY3RQcm90bywga2V5KSA6IHRydWUpKXJlc3VsdC5wdXNoKEFsbFN5bWJvbHNba2V5XSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8vIDE5LjQuMS4xIFN5bWJvbChbZGVzY3JpcHRpb25dKVxuaWYoIVVTRV9OQVRJVkUpe1xuICAkU3ltYm9sID0gZnVuY3Rpb24gU3ltYm9sKCl7XG4gICAgaWYodGhpcyBpbnN0YW5jZW9mICRTeW1ib2wpdGhyb3cgVHlwZUVycm9yKCdTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3IhJyk7XG4gICAgdmFyIHRhZyA9IHVpZChhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7XG4gICAgdmFyICRzZXQgPSBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICBpZih0aGlzID09PSBPYmplY3RQcm90bykkc2V0LmNhbGwoT1BTeW1ib2xzLCB2YWx1ZSk7XG4gICAgICBpZihoYXModGhpcywgSElEREVOKSAmJiBoYXModGhpc1tISURERU5dLCB0YWcpKXRoaXNbSElEREVOXVt0YWddID0gZmFsc2U7XG4gICAgICBzZXRTeW1ib2xEZXNjKHRoaXMsIHRhZywgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xuICAgIH07XG4gICAgaWYoREVTQ1JJUFRPUlMgJiYgc2V0dGVyKXNldFN5bWJvbERlc2MoT2JqZWN0UHJvdG8sIHRhZywge2NvbmZpZ3VyYWJsZTogdHJ1ZSwgc2V0OiAkc2V0fSk7XG4gICAgcmV0dXJuIHdyYXAodGFnKTtcbiAgfTtcbiAgcmVkZWZpbmUoJFN5bWJvbFtQUk9UT1RZUEVdLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpe1xuICAgIHJldHVybiB0aGlzLl9rO1xuICB9KTtcblxuICAkR09QRC5mID0gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbiAgJERQLmYgICA9ICRkZWZpbmVQcm9wZXJ0eTtcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mID0gZ09QTkV4dC5mID0gJGdldE93blByb3BlcnR5TmFtZXM7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1waWUnKS5mICA9ICRwcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKS5mID0gJGdldE93blByb3BlcnR5U3ltYm9scztcblxuICBpZihERVNDUklQVE9SUyAmJiAhcmVxdWlyZSgnLi9fbGlicmFyeScpKXtcbiAgICByZWRlZmluZShPYmplY3RQcm90bywgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJywgJHByb3BlcnR5SXNFbnVtZXJhYmxlLCB0cnVlKTtcbiAgfVxuXG4gIHdrc0V4dC5mID0gZnVuY3Rpb24obmFtZSl7XG4gICAgcmV0dXJuIHdyYXAod2tzKG5hbWUpKTtcbiAgfVxufVxuXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCB7U3ltYm9sOiAkU3ltYm9sfSk7XG5cbmZvcih2YXIgc3ltYm9scyA9IChcbiAgLy8gMTkuNC4yLjIsIDE5LjQuMi4zLCAxOS40LjIuNCwgMTkuNC4yLjYsIDE5LjQuMi44LCAxOS40LjIuOSwgMTkuNC4yLjEwLCAxOS40LjIuMTEsIDE5LjQuMi4xMiwgMTkuNC4yLjEzLCAxOS40LjIuMTRcbiAgJ2hhc0luc3RhbmNlLGlzQ29uY2F0U3ByZWFkYWJsZSxpdGVyYXRvcixtYXRjaCxyZXBsYWNlLHNlYXJjaCxzcGVjaWVzLHNwbGl0LHRvUHJpbWl0aXZlLHRvU3RyaW5nVGFnLHVuc2NvcGFibGVzJ1xuKS5zcGxpdCgnLCcpLCBpID0gMDsgc3ltYm9scy5sZW5ndGggPiBpOyApd2tzKHN5bWJvbHNbaSsrXSk7XG5cbmZvcih2YXIgc3ltYm9scyA9ICRrZXlzKHdrcy5zdG9yZSksIGkgPSAwOyBzeW1ib2xzLmxlbmd0aCA+IGk7ICl3a3NEZWZpbmUoc3ltYm9sc1tpKytdKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgJ1N5bWJvbCcsIHtcbiAgLy8gMTkuNC4yLjEgU3ltYm9sLmZvcihrZXkpXG4gICdmb3InOiBmdW5jdGlvbihrZXkpe1xuICAgIHJldHVybiBoYXMoU3ltYm9sUmVnaXN0cnksIGtleSArPSAnJylcbiAgICAgID8gU3ltYm9sUmVnaXN0cnlba2V5XVxuICAgICAgOiBTeW1ib2xSZWdpc3RyeVtrZXldID0gJFN5bWJvbChrZXkpO1xuICB9LFxuICAvLyAxOS40LjIuNSBTeW1ib2wua2V5Rm9yKHN5bSlcbiAga2V5Rm9yOiBmdW5jdGlvbiBrZXlGb3Ioa2V5KXtcbiAgICBpZihpc1N5bWJvbChrZXkpKXJldHVybiBrZXlPZihTeW1ib2xSZWdpc3RyeSwga2V5KTtcbiAgICB0aHJvdyBUeXBlRXJyb3Ioa2V5ICsgJyBpcyBub3QgYSBzeW1ib2whJyk7XG4gIH0sXG4gIHVzZVNldHRlcjogZnVuY3Rpb24oKXsgc2V0dGVyID0gdHJ1ZTsgfSxcbiAgdXNlU2ltcGxlOiBmdW5jdGlvbigpeyBzZXR0ZXIgPSBmYWxzZTsgfVxufSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsICdPYmplY3QnLCB7XG4gIC8vIDE5LjEuMi4yIE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbiAgY3JlYXRlOiAkY3JlYXRlLFxuICAvLyAxOS4xLjIuNCBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiAgZGVmaW5lUHJvcGVydHk6ICRkZWZpbmVQcm9wZXJ0eSxcbiAgLy8gMTkuMS4yLjMgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcylcbiAgZGVmaW5lUHJvcGVydGllczogJGRlZmluZVByb3BlcnRpZXMsXG4gIC8vIDE5LjEuMi42IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUClcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICAvLyAxOS4xLjIuNyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxuICBnZXRPd25Qcm9wZXJ0eU5hbWVzOiAkZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgLy8gMTkuMS4yLjggT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhPKVxuICBnZXRPd25Qcm9wZXJ0eVN5bWJvbHM6ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHNcbn0pO1xuXG4vLyAyNC4zLjIgSlNPTi5zdHJpbmdpZnkodmFsdWUgWywgcmVwbGFjZXIgWywgc3BhY2VdXSlcbiRKU09OICYmICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKCFVU0VfTkFUSVZFIHx8ICRmYWlscyhmdW5jdGlvbigpe1xuICB2YXIgUyA9ICRTeW1ib2woKTtcbiAgLy8gTVMgRWRnZSBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMge31cbiAgLy8gV2ViS2l0IGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyBudWxsXG4gIC8vIFY4IHRocm93cyBvbiBib3hlZCBzeW1ib2xzXG4gIHJldHVybiBfc3RyaW5naWZ5KFtTXSkgIT0gJ1tudWxsXScgfHwgX3N0cmluZ2lmeSh7YTogU30pICE9ICd7fScgfHwgX3N0cmluZ2lmeShPYmplY3QoUykpICE9ICd7fSc7XG59KSksICdKU09OJywge1xuICBzdHJpbmdpZnk6IGZ1bmN0aW9uIHN0cmluZ2lmeShpdCl7XG4gICAgaWYoaXQgPT09IHVuZGVmaW5lZCB8fCBpc1N5bWJvbChpdCkpcmV0dXJuOyAvLyBJRTggcmV0dXJucyBzdHJpbmcgb24gdW5kZWZpbmVkXG4gICAgdmFyIGFyZ3MgPSBbaXRdXG4gICAgICAsIGkgICAgPSAxXG4gICAgICAsIHJlcGxhY2VyLCAkcmVwbGFjZXI7XG4gICAgd2hpbGUoYXJndW1lbnRzLmxlbmd0aCA+IGkpYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICByZXBsYWNlciA9IGFyZ3NbMV07XG4gICAgaWYodHlwZW9mIHJlcGxhY2VyID09ICdmdW5jdGlvbicpJHJlcGxhY2VyID0gcmVwbGFjZXI7XG4gICAgaWYoJHJlcGxhY2VyIHx8ICFpc0FycmF5KHJlcGxhY2VyKSlyZXBsYWNlciA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xuICAgICAgaWYoJHJlcGxhY2VyKXZhbHVlID0gJHJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWx1ZSk7XG4gICAgICBpZighaXNTeW1ib2wodmFsdWUpKXJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIGFyZ3NbMV0gPSByZXBsYWNlcjtcbiAgICByZXR1cm4gX3N0cmluZ2lmeS5hcHBseSgkSlNPTiwgYXJncyk7XG4gIH1cbn0pO1xuXG4vLyAxOS40LjMuNCBTeW1ib2wucHJvdG90eXBlW0BAdG9QcmltaXRpdmVdKGhpbnQpXG4kU3ltYm9sW1BST1RPVFlQRV1bVE9fUFJJTUlUSVZFXSB8fCByZXF1aXJlKCcuL19oaWRlJykoJFN5bWJvbFtQUk9UT1RZUEVdLCBUT19QUklNSVRJVkUsICRTeW1ib2xbUFJPVE9UWVBFXS52YWx1ZU9mKTtcbi8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKCRTeW1ib2wsICdTeW1ib2wnKTtcbi8vIDIwLjIuMS45IE1hdGhbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKE1hdGgsICdNYXRoJywgdHJ1ZSk7XG4vLyAyNC4zLjMgSlNPTltAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoZ2xvYmFsLkpTT04sICdKU09OJywgdHJ1ZSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3ltYm9sLmpzXG4vLyBtb2R1bGUgaWQgPSA4MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBNRVRBICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpKCdtZXRhJylcbiAgLCBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgaGFzICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIHNldERlc2MgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZlxuICAsIGlkICAgICAgID0gMDtcbnZhciBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGZ1bmN0aW9uKCl7XG4gIHJldHVybiB0cnVlO1xufTtcbnZhciBGUkVFWkUgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gaXNFeHRlbnNpYmxlKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSkpO1xufSk7XG52YXIgc2V0TWV0YSA9IGZ1bmN0aW9uKGl0KXtcbiAgc2V0RGVzYyhpdCwgTUVUQSwge3ZhbHVlOiB7XG4gICAgaTogJ08nICsgKytpZCwgLy8gb2JqZWN0IElEXG4gICAgdzoge30gICAgICAgICAgLy8gd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfX0pO1xufTtcbnZhciBmYXN0S2V5ID0gZnVuY3Rpb24oaXQsIGNyZWF0ZSl7XG4gIC8vIHJldHVybiBwcmltaXRpdmUgd2l0aCBwcmVmaXhcbiAgaWYoIWlzT2JqZWN0KGl0KSlyZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnID8gaXQgOiAodHlwZW9mIGl0ID09ICdzdHJpbmcnID8gJ1MnIDogJ1AnKSArIGl0O1xuICBpZighaGFzKGl0LCBNRVRBKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYoIWNyZWF0ZSlyZXR1cm4gJ0UnO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBvYmplY3QgSURcbiAgfSByZXR1cm4gaXRbTUVUQV0uaTtcbn07XG52YXIgZ2V0V2VhayA9IGZ1bmN0aW9uKGl0LCBjcmVhdGUpe1xuICBpZighaGFzKGl0LCBNRVRBKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmKCFjcmVhdGUpcmV0dXJuIGZhbHNlO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBoYXNoIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH0gcmV0dXJuIGl0W01FVEFdLnc7XG59O1xuLy8gYWRkIG1ldGFkYXRhIG9uIGZyZWV6ZS1mYW1pbHkgbWV0aG9kcyBjYWxsaW5nXG52YXIgb25GcmVlemUgPSBmdW5jdGlvbihpdCl7XG4gIGlmKEZSRUVaRSAmJiBtZXRhLk5FRUQgJiYgaXNFeHRlbnNpYmxlKGl0KSAmJiAhaGFzKGl0LCBNRVRBKSlzZXRNZXRhKGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciBtZXRhID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIEtFWTogICAgICBNRVRBLFxuICBORUVEOiAgICAgZmFsc2UsXG4gIGZhc3RLZXk6ICBmYXN0S2V5LFxuICBnZXRXZWFrOiAgZ2V0V2VhayxcbiAgb25GcmVlemU6IG9uRnJlZXplXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX21ldGEuanNcbi8vIG1vZHVsZSBpZCA9IDgzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGdsb2JhbCAgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIExJQlJBUlkgICAgICAgID0gcmVxdWlyZSgnLi9fbGlicmFyeScpXG4gICwgd2tzRXh0ICAgICAgICAgPSByZXF1aXJlKCcuL193a3MtZXh0JylcbiAgLCBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUpe1xuICB2YXIgJFN5bWJvbCA9IGNvcmUuU3ltYm9sIHx8IChjb3JlLlN5bWJvbCA9IExJQlJBUlkgPyB7fSA6IGdsb2JhbC5TeW1ib2wgfHwge30pO1xuICBpZihuYW1lLmNoYXJBdCgwKSAhPSAnXycgJiYgIShuYW1lIGluICRTeW1ib2wpKWRlZmluZVByb3BlcnR5KCRTeW1ib2wsIG5hbWUsIHt2YWx1ZTogd2tzRXh0LmYobmFtZSl9KTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gODRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgZ2V0S2V5cyAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0LCBlbCl7XG4gIHZhciBPICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxuICAgICwga2V5cyAgID0gZ2V0S2V5cyhPKVxuICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAsIGluZGV4ICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobGVuZ3RoID4gaW5kZXgpaWYoT1trZXkgPSBrZXlzW2luZGV4KytdXSA9PT0gZWwpcmV0dXJuIGtleTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fa2V5b2YuanNcbi8vIG1vZHVsZSBpZCA9IDg1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gYWxsIGVudW1lcmFibGUgb2JqZWN0IGtleXMsIGluY2x1ZGVzIHN5bWJvbHNcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIGdPUFMgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpXG4gICwgcElFICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgcmVzdWx0ICAgICA9IGdldEtleXMoaXQpXG4gICAgLCBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICBpZihnZXRTeW1ib2xzKXtcbiAgICB2YXIgc3ltYm9scyA9IGdldFN5bWJvbHMoaXQpXG4gICAgICAsIGlzRW51bSAgPSBwSUUuZlxuICAgICAgLCBpICAgICAgID0gMFxuICAgICAgLCBrZXk7XG4gICAgd2hpbGUoc3ltYm9scy5sZW5ndGggPiBpKWlmKGlzRW51bS5jYWxsKGl0LCBrZXkgPSBzeW1ib2xzW2krK10pKXJlc3VsdC5wdXNoKGtleSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSA4NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanNcbi8vIG1vZHVsZSBpZCA9IDg3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiZXhwb3J0cy5mID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qc1xuLy8gbW9kdWxlIGlkID0gODhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyA3LjIuMiBJc0FycmF5KGFyZ3VtZW50KVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXkoYXJnKXtcbiAgcmV0dXJuIGNvZihhcmcpID09ICdBcnJheSc7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSA4OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIGZhbGxiYWNrIGZvciBJRTExIGJ1Z2d5IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHdpdGggaWZyYW1lIGFuZCB3aW5kb3dcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCBnT1BOICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmZcbiAgLCB0b1N0cmluZyAgPSB7fS50b1N0cmluZztcblxudmFyIHdpbmRvd05hbWVzID0gdHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiB3aW5kb3cgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNcbiAgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh3aW5kb3cpIDogW107XG5cbnZhciBnZXRXaW5kb3dOYW1lcyA9IGZ1bmN0aW9uKGl0KXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZ09QTihpdCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHdpbmRvd05hbWVzLnNsaWNlKCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KXtcbiAgcmV0dXJuIHdpbmRvd05hbWVzICYmIHRvU3RyaW5nLmNhbGwoaXQpID09ICdbb2JqZWN0IFdpbmRvd10nID8gZ2V0V2luZG93TmFtZXMoaXQpIDogZ09QTih0b0lPYmplY3QoaXQpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi1leHQuanNcbi8vIG1vZHVsZSBpZCA9IDkwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gMTkuMS4yLjcgLyAxNS4yLjMuNCBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxudmFyICRrZXlzICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpXG4gICwgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKS5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhPKXtcbiAgcmV0dXJuICRrZXlzKE8sIGhpZGRlbktleXMpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi5qc1xuLy8gbW9kdWxlIGlkID0gOTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgcElFICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJylcbiAgLCBjcmVhdGVEZXNjICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxuICAsIHRvSU9iamVjdCAgICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9QcmltaXRpdmUgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIGhhcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJylcbiAgLCBnT1BEICAgICAgICAgICA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBnT1BEIDogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApe1xuICBPID0gdG9JT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgcmV0dXJuIGdPUEQoTywgUCk7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgaWYoaGFzKE8sIFApKXJldHVybiBjcmVhdGVEZXNjKCFwSUUuZi5jYWxsKE8sIFApLCBPW1BdKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcGQuanNcbi8vIG1vZHVsZSBpZCA9IDkyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwicmVxdWlyZSgnLi9fd2tzLWRlZmluZScpKCdhc3luY0l0ZXJhdG9yJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA5NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnb2JzZXJ2YWJsZScpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnN5bWJvbC5vYnNlcnZhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSA5NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3NldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L3NldC1wcm90b3R5cGUtb2ZcIik7XG5cbnZhciBfc2V0UHJvdG90eXBlT2YyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2V0UHJvdG90eXBlT2YpO1xuXG52YXIgX2NyZWF0ZSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9jcmVhdGVcIik7XG5cbnZhciBfY3JlYXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZSk7XG5cbnZhciBfdHlwZW9mMiA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL3R5cGVvZlwiKTtcblxudmFyIF90eXBlb2YzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdHlwZW9mMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyAodHlwZW9mIHN1cGVyQ2xhc3MgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogKDAsIF90eXBlb2YzLmRlZmF1bHQpKHN1cGVyQ2xhc3MpKSk7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSAoMCwgX2NyZWF0ZTIuZGVmYXVsdCkoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIF9zZXRQcm90b3R5cGVPZjIuZGVmYXVsdCA/ICgwLCBfc2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy9pbmhlcml0cy5qc1xuLy8gbW9kdWxlIGlkID0gOTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L3NldC1wcm90b3R5cGUtb2ZcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L3NldC1wcm90b3R5cGUtb2YuanNcbi8vIG1vZHVsZSBpZCA9IDk3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5zZXRQcm90b3R5cGVPZjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qc1xuLy8gbW9kdWxlIGlkID0gOThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyAxOS4xLjMuMTkgT2JqZWN0LnNldFByb3RvdHlwZU9mKE8sIHByb3RvKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0Jywge3NldFByb3RvdHlwZU9mOiByZXF1aXJlKCcuL19zZXQtcHJvdG8nKS5zZXR9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZi5qc1xuLy8gbW9kdWxlIGlkID0gOTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgY2hlY2sgPSBmdW5jdGlvbihPLCBwcm90byl7XG4gIGFuT2JqZWN0KE8pO1xuICBpZighaXNPYmplY3QocHJvdG8pICYmIHByb3RvICE9PSBudWxsKXRocm93IFR5cGVFcnJvcihwcm90byArIFwiOiBjYW4ndCBzZXQgYXMgcHJvdG90eXBlIVwiKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgKCdfX3Byb3RvX18nIGluIHt9ID8gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGZ1bmN0aW9uKHRlc3QsIGJ1Z2d5LCBzZXQpe1xuICAgICAgdHJ5IHtcbiAgICAgICAgc2V0ID0gcmVxdWlyZSgnLi9fY3R4JykoRnVuY3Rpb24uY2FsbCwgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKS5mKE9iamVjdC5wcm90b3R5cGUsICdfX3Byb3RvX18nKS5zZXQsIDIpO1xuICAgICAgICBzZXQodGVzdCwgW10pO1xuICAgICAgICBidWdneSA9ICEodGVzdCBpbnN0YW5jZW9mIEFycmF5KTtcbiAgICAgIH0gY2F0Y2goZSl7IGJ1Z2d5ID0gdHJ1ZTsgfVxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKXtcbiAgICAgICAgY2hlY2soTywgcHJvdG8pO1xuICAgICAgICBpZihidWdneSlPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgICAgICBlbHNlIHNldChPLCBwcm90byk7XG4gICAgICAgIHJldHVybiBPO1xuICAgICAgfTtcbiAgICB9KHt9LCBmYWxzZSkgOiB1bmRlZmluZWQpLFxuICBjaGVjazogY2hlY2tcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXByb3RvLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuY3JlYXRlJyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZShQLCBEKXtcbiAgcmV0dXJuICRPYmplY3QuY3JlYXRlKFAsIEQpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4vLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0Jywge2NyZWF0ZTogcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuKGZ1bmN0aW9uICh3aW4pIHtcblxuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIC8vIG1ham9yIGV2ZW50cyBzdXBwb3J0ZWQ6XG4gICAgLy8gcGFuc3RhcnRcbiAgICAvLyBwYW5tb3ZlXG4gICAgLy8gcGFuZW5kXG4gICAgLy8gc3dpcGVcbiAgICAvLyBsb25ncHJlc3NcblxuICAgIC8vIGV4dHJhIGV2ZW50cyBzdXBwb3J0ZWQ6XG4gICAgLy8gZHVhbHRvdWNoc3RhcnRcbiAgICAvLyBkdWFsdG91Y2hcbiAgICAvLyBkdWFsdG91Y2hlbmRcbiAgICAvLyB2ZXJ0aWNhbHBhbnN0YXJ0XG4gICAgLy8gaG9yaXpvbnRhbHBhbnN0YXJ0XG4gICAgLy8gdmVydGljYWxwYW5tb3ZlXG4gICAgLy8gaG9yaXpvbnRhbHBhbm1vdmVcbiAgICAvLyB0YXBcbiAgICAvLyBkb3VibGV0YXBcbiAgICAvLyB2ZXJ0aWNhbHN3aXBlXG4gICAgLy8gaG9yaXpvbnRhbHN3aXBlXG4gICAgLy8gcHJlc3NlbmRcblxuICAgIHZhciBkb2MgPSB3aW4uZG9jdW1lbnQsXG4gICAgICAgIGRvY0VsID0gZG9jLmRvY3VtZW50RWxlbWVudCxcbiAgICAgICAgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UsXG4gICAgICAgIGdlc3R1cmVzID0ge30sXG4gICAgICAgIGxhc3RUYXAgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgKiDmib7liLDkuKTkuKrnu5PngrnlhbHlkIznmoTmnIDlsI/moLnnu5PngrlcbiAgICAqIOWmguaenOi3n+e7k+eCueS4jeWtmOWcqO+8jOWImei/lOWbnm51bGxcbiAgICAqXG4gICAgKiBAcGFyYW0gIHtFbGVtZW50fSBlbDEg56ys5LiA5Liq57uT54K5XG4gICAgKiBAcGFyYW0gIHtFbGVtZW50fSBlbDIg56ys5LqM5Liq57uT54K5XG4gICAgKiBAcmV0dXJuIHtFbGVtZW50fSAgICAg5qC557uT54K5XG4gICAgKi9cbiAgICBmdW5jdGlvbiBnZXRDb21tb25BbmNlc3RvcihlbDEsIGVsMikge1xuICAgICAgICB2YXIgZWwgPSBlbDE7XG4gICAgICAgIHdoaWxlIChlbCkge1xuICAgICAgICAgICAgaWYgKGVsLmNvbnRhaW5zKGVsMikgfHwgZWwgPT09IGVsMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsID0gZWwucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIOinpuWPkeS4gOS4quS6i+S7tlxuICAgICpcbiAgICAqIEBwYXJhbSAge0VsZW1lbnR9IGVsZW1lbnQg55uu5qCH57uT54K5XG4gICAgKiBAcGFyYW0gIHtzdHJpbmd9ICB0eXBlICAgIOS6i+S7tuexu+Wei1xuICAgICogQHBhcmFtICB7b2JqZWN0fSAgZXh0cmEgICDlr7nkuovku7blr7nosaHnmoTmianlsZVcbiAgICAqL1xuICAgIGZ1bmN0aW9uIGZpcmVFdmVudChlbGVtZW50LCB0eXBlLCBleHRyYSkge1xuICAgICAgICB2YXIgZXZlbnQgPSBkb2MuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcbiAgICAgICAgZXZlbnQuaW5pdEV2ZW50KHR5cGUsIHRydWUsIHRydWUpO1xuXG4gICAgICAgIGlmICgodHlwZW9mIGV4dHJhID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihleHRyYSkpID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBleHRyYSkge1xuICAgICAgICAgICAgICAgIGV2ZW50W3BdID0gZXh0cmFbcF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICog6K6h566X5Y+Y5o2i5pWI5p6cXG4gICAgKiDlgYforr7lnZDmoIfns7vkuIrmnIk05Liq54K5QUJDRFxuICAgICogPiDml4vovazvvJrku45BQuaXi+i9rOWIsENE55qE6KeS5bqmXG4gICAgKiA+IOe8qeaUvu+8muS7jkFC6ZW/5bqm5Y+Y5o2i5YiwQ0Tplb/luqbnmoTmr5TkvotcbiAgICAqID4g5L2N56e777ya5LuOQeeCueS9jeenu+WIsEPngrnnmoTmqKrnurXkvY3np7tcbiAgICAqXG4gICAgKiBAcGFyYW0gIHtudW1iZXJ9IHgxIOS4iui/sOesrDHkuKrngrnnmoTmqKrlnZDmoIdcbiAgICAqIEBwYXJhbSAge251bWJlcn0geTEg5LiK6L+w56ysMeS4queCueeahOe6teWdkOagh1xuICAgICogQHBhcmFtICB7bnVtYmVyfSB4MiDkuIrov7DnrKwy5Liq54K555qE5qiq5Z2Q5qCHXG4gICAgKiBAcGFyYW0gIHtudW1iZXJ9IHkyIOS4iui/sOesrDLkuKrngrnnmoTnurXlnZDmoIdcbiAgICAqIEBwYXJhbSAge251bWJlcn0geDMg5LiK6L+w56ysM+S4queCueeahOaoquWdkOagh1xuICAgICogQHBhcmFtICB7bnVtYmVyfSB5MyDkuIrov7DnrKwz5Liq54K555qE57q15Z2Q5qCHXG4gICAgKiBAcGFyYW0gIHtudW1iZXJ9IHg0IOS4iui/sOesrDTkuKrngrnnmoTmqKrlnZDmoIdcbiAgICAqIEBwYXJhbSAge251bWJlcn0geTQg5LiK6L+w56ysNOS4queCueeahOe6teWdkOagh1xuICAgICogQHJldHVybiB7b2JqZWN0fSAgICDlj5jmjaLmlYjmnpzvvIzlvaLlpoJ7cm90YXRlLCBzY2FsZSwgdHJhbnNsYXRlWzJdLCBtYXRyaXhbM11bM119XG4gICAgKi9cbiAgICBmdW5jdGlvbiBjYWxjKHgxLCB5MSwgeDIsIHkyLCB4MywgeTMsIHg0LCB5NCkge1xuICAgICAgICB2YXIgcm90YXRlID0gTWF0aC5hdGFuMih5NCAtIHkzLCB4NCAtIHgzKSAtIE1hdGguYXRhbjIoeTIgLSB5MSwgeDIgLSB4MSksXG4gICAgICAgICAgICBzY2FsZSA9IE1hdGguc3FydCgoTWF0aC5wb3coeTQgLSB5MywgMikgKyBNYXRoLnBvdyh4NCAtIHgzLCAyKSkgLyAoTWF0aC5wb3coeTIgLSB5MSwgMikgKyBNYXRoLnBvdyh4MiAtIHgxLCAyKSkpLFxuICAgICAgICAgICAgdHJhbnNsYXRlID0gW3gzIC0gc2NhbGUgKiB4MSAqIE1hdGguY29zKHJvdGF0ZSkgKyBzY2FsZSAqIHkxICogTWF0aC5zaW4ocm90YXRlKSwgeTMgLSBzY2FsZSAqIHkxICogTWF0aC5jb3Mocm90YXRlKSAtIHNjYWxlICogeDEgKiBNYXRoLnNpbihyb3RhdGUpXTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJvdGF0ZTogcm90YXRlLFxuICAgICAgICAgICAgc2NhbGU6IHNjYWxlLFxuICAgICAgICAgICAgdHJhbnNsYXRlOiB0cmFuc2xhdGUsXG4gICAgICAgICAgICBtYXRyaXg6IFtbc2NhbGUgKiBNYXRoLmNvcyhyb3RhdGUpLCAtc2NhbGUgKiBNYXRoLnNpbihyb3RhdGUpLCB0cmFuc2xhdGVbMF1dLCBbc2NhbGUgKiBNYXRoLnNpbihyb3RhdGUpLCBzY2FsZSAqIE1hdGguY29zKHJvdGF0ZSksIHRyYW5zbGF0ZVsxXV0sIFswLCAwLCAxXV1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIOaNleiOt3RvdWNoc3RhcnTkuovku7bvvIzlsIbmr4/kuIDkuKrmlrDlop7nmoTop6bngrnmt7vliqDliLBnZXN0cnVlc1xuICAgICog5aaC5p6c5LmL5YmN5bCa5peg6KKr6K6w5b2V55qE6Kem54K577yM5YiZ57uR5a6adG91Y2htb3ZlLCB0b3VjaGVuZCwgdG91Y2hjYW5jZWzkuovku7ZcbiAgICAqXG4gICAgKiDmlrDlop7op6bngrnpu5jorqTlpITkuo50YXBwaW5n54q25oCBXG4gICAgKiA1MDDmr6vnp5LkuYvlkI7lpoLmnpzov5jlpITkuo50YXBwaW5n54q25oCB77yM5YiZ6Kem5Y+RcHJlc3PmiYvlir9cbiAgICAqIOWmguaenOinpueCueaVsOS4ujLvvIzliJnop6blj5FkdWFsdG91Y2hzdGFydOaJi+WKv++8jOivpeaJi+WKv+eahOebruagh+e7k+eCueS4uuS4pOS4quinpueCueWFseWQjOeahOacgOWwj+aguee7k+eCuVxuICAgICpcbiAgICAqIEBldmVudFxuICAgICogQHBhcmFtICB7ZXZlbnR9IGV2ZW50XG4gICAgKi9cbiAgICBmdW5jdGlvbiB0b3VjaHN0YXJ0SGFuZGxlcihldmVudCkge1xuXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhnZXN0dXJlcykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBkb2NFbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0b3VjaG1vdmVIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgICAgICBkb2NFbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRvdWNoZW5kSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICAgICAgZG9jRWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0b3VjaGNhbmNlbEhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBnZXN0dXJlLCB0b3VjaCwgdG91Y2hSZWNvcmQsIGVsZW1lbnRzO1xuXG4gICAgICAgIGZ1bmN0aW9uIGdlblByZXNzSGFuZGxlcihlbGVtZW50LCB0b3VjaCkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoZ2VzdHVyZS5zdGF0dXMgPT09ICd0YXBwaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBnZXN0dXJlLnN0YXR1cyA9ICdwcmVzc2luZyc7XG5cbiAgICAgICAgICAgICAgICAgICAgZmlyZUV2ZW50KGVsZW1lbnQsICdsb25ncHJlc3MnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgdG91Y2ggZGF0YSBmb3Igd2VleFxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2g6IHRvdWNoLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hlczogZXZlbnQudG91Y2hlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZWRUb3VjaGVzOiBldmVudC5jaGFuZ2VkVG91Y2hlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdWNoRXZlbnQ6IGV2ZW50XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChnZXN0dXJlLnByZXNzaW5nSGFuZGxlcik7XG4gICAgICAgICAgICAgICAgZ2VzdHVyZS5wcmVzc2luZ0hhbmRsZXIgPSBudWxsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlY29yZCBldmVyeSB0b3VjaFxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0b3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzW2ldO1xuICAgICAgICAgICAgdG91Y2hSZWNvcmQgPSB7fTtcblxuICAgICAgICAgICAgZm9yICh2YXIgX3AgaW4gdG91Y2gpIHtcbiAgICAgICAgICAgICAgICB0b3VjaFJlY29yZFtfcF0gPSB0b3VjaFtfcF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGdlc3R1cmUgPSB7XG4gICAgICAgICAgICAgICAgc3RhcnRUb3VjaDogdG91Y2hSZWNvcmQsXG4gICAgICAgICAgICAgICAgc3RhcnRUaW1lOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICAgIHN0YXR1czogJ3RhcHBpbmcnLFxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGV2ZW50LnNyY0VsZW1lbnQgfHwgZXZlbnQudGFyZ2V0LFxuICAgICAgICAgICAgICAgIHByZXNzaW5nSGFuZGxlcjogc2V0VGltZW91dChnZW5QcmVzc0hhbmRsZXIoZXZlbnQuc3JjRWxlbWVudCB8fCBldmVudC50YXJnZXQsIGV2ZW50LmNoYW5nZWRUb3VjaGVzW2ldKSwgNTAwKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGdlc3R1cmVzW3RvdWNoLmlkZW50aWZpZXJdID0gZ2VzdHVyZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhnZXN0dXJlcykubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICBlbGVtZW50cyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIGdlc3R1cmVzKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudHMucHVzaChnZXN0dXJlc1twXS5lbGVtZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZmlyZUV2ZW50KGdldENvbW1vbkFuY2VzdG9yKGVsZW1lbnRzWzBdLCBlbGVtZW50c1sxXSksICdkdWFsdG91Y2hzdGFydCcsIHtcbiAgICAgICAgICAgICAgICB0b3VjaGVzOiBzbGljZS5jYWxsKGV2ZW50LnRvdWNoZXMpLFxuICAgICAgICAgICAgICAgIHRvdWNoRXZlbnQ6IGV2ZW50XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICog5o2V6I63dG91Y2htb3Zl5LqL5Lu277yM5aSE55CGcGFu5ZKMZHVhbOeahOebuOWFs+aJi+WKv1xuICAgICpcbiAgICAqIDEuIOmBjeWOhuavj+S4quinpueCue+8mlxuICAgICogPiDlpoLmnpzop6bngrnkuYvliY3lpITkuo50YXBwaW5n54q25oCB77yM5LiU5L2N56e76LaF6L+HMTDlg4/ntKDvvIzliJnorqTlrprkuLrov5vlhaVwYW5uaW5n54q25oCBXG4gICAgKiDlhYjop6blj5FwYW5zdGFydOaJi+WKv++8jOeEtuWQjuagueaNruenu+WKqOeahOaWueWQkemAieaLqeaAp+inpuWPkWhvcml6b250YWxwYW5zdGFydOaIlnZlcnRpY2FscGFuc3RhcnTmiYvlir9cbiAgICAqID4g5aaC5p6c6Kem54K55LmL5YmN5aSE5LqOcGFubmluZ+eKtuaAge+8jOWImeagueaNrnBhbueahOWIneWni+aWueWQkeinpuWPkWhvcml6b250YWxwYW7miJZ2ZXJ0aWNhbHBhbuaJi+WKv1xuICAgICpcbiAgICAqIDIuIOWmguaenOW9k+WJjeinpueCueaVsOS4ujLvvIzliJnorqHnrpflh7rlh6DkvZXlj5jmjaLnmoTlkITpobnlj4LmlbDvvIzop6blj5FkdWFsdG91Y2jmiYvlir9cbiAgICAqXG4gICAgKiBAZXZlbnRcbiAgICAqIEBwYXJhbSAge2V2ZW50fSBldmVudFxuICAgICovXG4gICAgZnVuY3Rpb24gdG91Y2htb3ZlSGFuZGxlcihldmVudCkge1xuICAgICAgICAvLyBUT0RPOiDlh73mlbDlpKrlpKfkuobvvIzlvbHlk43lj6/or7vmgKfvvIzlu7rorq7liIbop6PlubbliqDlv4XopoHnmoTms6jph4pcblxuICAgICAgICAvLyDpgY3ljobmr4/kuKrop6bngrnvvJpcbiAgICAgICAgLy8gMS4g5aaC5p6c6Kem54K55LmL5YmN5aSE5LqOdGFwcGluZ+eKtuaAge+8jOS4lOS9jeenu+i2hei/hzEw5YOP57Sg77yM5YiZ6K6k5a6a5Li66L+b5YWlcGFubmluZ+eKtuaAgVxuICAgICAgICAvLyDlhYjop6blj5FwYW5zdGFydOaJi+WKv++8jOeEtuWQjuagueaNruenu+WKqOeahOaWueWQkemAieaLqeaAp+inpuWPkWhvcml6b250YWxwYW5zdGFydOaIlnZlcnRpY2FscGFuc3RhcnTmiYvlir9cbiAgICAgICAgLy8gMi4g5aaC5p6c6Kem54K55LmL5YmN5aSE5LqOcGFubmluZ+eKtuaAge+8jOWImeagueaNrnBhbueahOWIneWni+aWueWQkeinpuWPkWhvcml6b250YWxwYW7miJZ2ZXJ0aWNhbHBhbuaJi+WKv1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdG91Y2ggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1tpXSxcbiAgICAgICAgICAgICAgICBnZXN0dXJlID0gZ2VzdHVyZXNbdG91Y2guaWRlbnRpZmllcl07XG5cbiAgICAgICAgICAgIGlmICghZ2VzdHVyZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFnZXN0dXJlLmxhc3RUb3VjaCkge1xuICAgICAgICAgICAgICAgIGdlc3R1cmUubGFzdFRvdWNoID0gZ2VzdHVyZS5zdGFydFRvdWNoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFnZXN0dXJlLmxhc3RUaW1lKSB7XG4gICAgICAgICAgICAgICAgZ2VzdHVyZS5sYXN0VGltZSA9IGdlc3R1cmUuc3RhcnRUaW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFnZXN0dXJlLnZlbG9jaXR5WCkge1xuICAgICAgICAgICAgICAgIGdlc3R1cmUudmVsb2NpdHlYID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZ2VzdHVyZS52ZWxvY2l0eVkpIHtcbiAgICAgICAgICAgICAgICBnZXN0dXJlLnZlbG9jaXR5WSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWdlc3R1cmUuZHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICBnZXN0dXJlLmR1cmF0aW9uID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHRpbWUgPSBEYXRlLm5vdygpIC0gZ2VzdHVyZS5sYXN0VGltZTtcbiAgICAgICAgICAgIHZhciB2eCA9ICh0b3VjaC5jbGllbnRYIC0gZ2VzdHVyZS5sYXN0VG91Y2guY2xpZW50WCkgLyB0aW1lLFxuICAgICAgICAgICAgICAgIHZ5ID0gKHRvdWNoLmNsaWVudFkgLSBnZXN0dXJlLmxhc3RUb3VjaC5jbGllbnRZKSAvIHRpbWU7XG5cbiAgICAgICAgICAgIHZhciBSRUNPUkRfRFVSQVRJT04gPSA3MDtcbiAgICAgICAgICAgIGlmICh0aW1lID4gUkVDT1JEX0RVUkFUSU9OKSB7XG4gICAgICAgICAgICAgICAgdGltZSA9IFJFQ09SRF9EVVJBVElPTjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChnZXN0dXJlLmR1cmF0aW9uICsgdGltZSA+IFJFQ09SRF9EVVJBVElPTikge1xuICAgICAgICAgICAgICAgIGdlc3R1cmUuZHVyYXRpb24gPSBSRUNPUkRfRFVSQVRJT04gLSB0aW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBnZXN0dXJlLnZlbG9jaXR5WCA9IChnZXN0dXJlLnZlbG9jaXR5WCAqIGdlc3R1cmUuZHVyYXRpb24gKyB2eCAqIHRpbWUpIC8gKGdlc3R1cmUuZHVyYXRpb24gKyB0aW1lKTtcbiAgICAgICAgICAgIGdlc3R1cmUudmVsb2NpdHlZID0gKGdlc3R1cmUudmVsb2NpdHlZICogZ2VzdHVyZS5kdXJhdGlvbiArIHZ5ICogdGltZSkgLyAoZ2VzdHVyZS5kdXJhdGlvbiArIHRpbWUpO1xuICAgICAgICAgICAgZ2VzdHVyZS5kdXJhdGlvbiArPSB0aW1lO1xuXG4gICAgICAgICAgICBnZXN0dXJlLmxhc3RUb3VjaCA9IHt9O1xuXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHRvdWNoKSB7XG4gICAgICAgICAgICAgICAgZ2VzdHVyZS5sYXN0VG91Y2hbcF0gPSB0b3VjaFtwXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdlc3R1cmUubGFzdFRpbWUgPSBEYXRlLm5vdygpO1xuXG4gICAgICAgICAgICB2YXIgZGlzcGxhY2VtZW50WCA9IHRvdWNoLmNsaWVudFggLSBnZXN0dXJlLnN0YXJ0VG91Y2guY2xpZW50WCxcbiAgICAgICAgICAgICAgICBkaXNwbGFjZW1lbnRZID0gdG91Y2guY2xpZW50WSAtIGdlc3R1cmUuc3RhcnRUb3VjaC5jbGllbnRZLFxuICAgICAgICAgICAgICAgIGRpc3RhbmNlID0gTWF0aC5zcXJ0KE1hdGgucG93KGRpc3BsYWNlbWVudFgsIDIpICsgTWF0aC5wb3coZGlzcGxhY2VtZW50WSwgMikpO1xuXG4gICAgICAgICAgICAvLyBtYWdpYyBudW1iZXIgMTA6IG1vdmluZyAxMHB4IG1lYW5zIHBhbiwgbm90IHRhcFxuICAgICAgICAgICAgaWYgKChnZXN0dXJlLnN0YXR1cyA9PT0gJ3RhcHBpbmcnIHx8IGdlc3R1cmUuc3RhdHVzID09PSAncHJlc3NpbmcnKSAmJiBkaXN0YW5jZSA+IDEwKSB7XG4gICAgICAgICAgICAgICAgZ2VzdHVyZS5zdGF0dXMgPSAncGFubmluZyc7XG4gICAgICAgICAgICAgICAgZ2VzdHVyZS5pc1ZlcnRpY2FsID0gIShNYXRoLmFicyhkaXNwbGFjZW1lbnRYKSA+IE1hdGguYWJzKGRpc3BsYWNlbWVudFkpKTtcblxuICAgICAgICAgICAgICAgIGZpcmVFdmVudChnZXN0dXJlLmVsZW1lbnQsICdwYW5zdGFydCcsIHtcbiAgICAgICAgICAgICAgICAgICAgdG91Y2g6IHRvdWNoLFxuICAgICAgICAgICAgICAgICAgICB0b3VjaGVzOiBldmVudC50b3VjaGVzLFxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VkVG91Y2hlczogZXZlbnQuY2hhbmdlZFRvdWNoZXMsXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICBpc1ZlcnRpY2FsOiBnZXN0dXJlLmlzVmVydGljYWxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGZpcmVFdmVudChnZXN0dXJlLmVsZW1lbnQsIChnZXN0dXJlLmlzVmVydGljYWwgPyAndmVydGljYWwnIDogJ2hvcml6b250YWwnKSArICdwYW5zdGFydCcsIHtcbiAgICAgICAgICAgICAgICAgICAgdG91Y2g6IHRvdWNoLFxuICAgICAgICAgICAgICAgICAgICB0b3VjaEV2ZW50OiBldmVudFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZ2VzdHVyZS5zdGF0dXMgPT09ICdwYW5uaW5nJykge1xuICAgICAgICAgICAgICAgIGdlc3R1cmUucGFuVGltZSA9IERhdGUubm93KCk7XG5cbiAgICAgICAgICAgICAgICBmaXJlRXZlbnQoZ2VzdHVyZS5lbGVtZW50LCAncGFubW92ZScsIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxhY2VtZW50WDogZGlzcGxhY2VtZW50WCxcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxhY2VtZW50WTogZGlzcGxhY2VtZW50WSxcbiAgICAgICAgICAgICAgICAgICAgdG91Y2g6IHRvdWNoLFxuICAgICAgICAgICAgICAgICAgICB0b3VjaGVzOiBldmVudC50b3VjaGVzLFxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VkVG91Y2hlczogZXZlbnQuY2hhbmdlZFRvdWNoZXMsXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICBpc1ZlcnRpY2FsOiBnZXN0dXJlLmlzVmVydGljYWxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmIChnZXN0dXJlLmlzVmVydGljYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlyZUV2ZW50KGdlc3R1cmUuZWxlbWVudCwgJ3ZlcnRpY2FscGFubW92ZScsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYWNlbWVudFk6IGRpc3BsYWNlbWVudFksXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaDogdG91Y2gsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3VjaEV2ZW50OiBldmVudFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmaXJlRXZlbnQoZ2VzdHVyZS5lbGVtZW50LCAnaG9yaXpvbnRhbHBhbm1vdmUnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGFjZW1lbnRYOiBkaXNwbGFjZW1lbnRYLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2g6IHRvdWNoLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hFdmVudDogZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8g5aaC5p6c5b2T5YmN6Kem54K55pWw5Li6Mu+8jOWImeiuoeeul+WHuuWHoOS9leWPmOaNoueahOWQhOmhueWPguaVsO+8jOinpuWPkWR1YWx0b3VjaOaJi+WKv1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMoZ2VzdHVyZXMpLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gW10sXG4gICAgICAgICAgICAgICAgY3VycmVudCA9IFtdLFxuICAgICAgICAgICAgICAgIGVsZW1lbnRzID0gW10sXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtID0gdm9pZCAwO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgZXZlbnQudG91Y2hlcy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgX3RvdWNoID0gZXZlbnQudG91Y2hlc1tfaV07XG4gICAgICAgICAgICAgICAgdmFyIF9nZXN0dXJlID0gZ2VzdHVyZXNbX3RvdWNoLmlkZW50aWZpZXJdO1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uLnB1c2goW19nZXN0dXJlLnN0YXJ0VG91Y2guY2xpZW50WCwgX2dlc3R1cmUuc3RhcnRUb3VjaC5jbGllbnRZXSk7XG4gICAgICAgICAgICAgICAgY3VycmVudC5wdXNoKFtfdG91Y2guY2xpZW50WCwgX3RvdWNoLmNsaWVudFldKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yICh2YXIgX3AyIGluIGdlc3R1cmVzKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudHMucHVzaChnZXN0dXJlc1tfcDJdLmVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0cmFuc2Zvcm0gPSBjYWxjKHBvc2l0aW9uWzBdWzBdLCBwb3NpdGlvblswXVsxXSwgcG9zaXRpb25bMV1bMF0sIHBvc2l0aW9uWzFdWzFdLCBjdXJyZW50WzBdWzBdLCBjdXJyZW50WzBdWzFdLCBjdXJyZW50WzFdWzBdLCBjdXJyZW50WzFdWzFdKTtcbiAgICAgICAgICAgIGZpcmVFdmVudChnZXRDb21tb25BbmNlc3RvcihlbGVtZW50c1swXSwgZWxlbWVudHNbMV0pLCAnZHVhbHRvdWNoJywge1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNmb3JtLFxuICAgICAgICAgICAgICAgIHRvdWNoZXM6IGV2ZW50LnRvdWNoZXMsXG4gICAgICAgICAgICAgICAgdG91Y2hFdmVudDogZXZlbnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiDmjZXojrd0b3VjaGVuZOS6i+S7tlxuICAgICpcbiAgICAqIDEuIOWmguaenOW9k+WJjeinpueCueaVsOS4ujLvvIzliJnop6blj5FkdWFsdG91Y2hlbmTmiYvlir9cbiAgICAqXG4gICAgKiAyLiDpgY3ljobmr4/kuKrop6bngrnvvJpcbiAgICAqID4g5aaC5p6c5aSE5LqOdGFwcGluZ+eKtuaAge+8jOWImeinpuWPkXRhcOaJi+WKv1xuICAgICog5aaC5p6c5LmL5YmNMzAw5q+r56eS5Ye6546w6L+HdGFw5omL5Yq/77yM5YiZ5Y2H57qn5Li6ZG91YmxldGFw5omL5Yq/XG4gICAgKiA+IOWmguaenOWkhOS6jnBhbm5pbmfnirbmgIHvvIzliJnmoLnmja7mu5Hlh7rnmoTpgJ/luqbvvIzop6blj5FwYW5lbmQvZmxpY2vmiYvlir9cbiAgICAqIGZsaWNr5omL5Yq/6KKr6Kem5Y+R5LmL5ZCO77yM5YaN5qC55o2u5ruR5Ye655qE5pa55ZCR6Kem5Y+RdmVydGljYWxmbGljay9ob3Jpem9udGFsZmxpY2vmiYvlir9cbiAgICAqID4g5aaC5p6c5aSE5LqOcHJlc3NpbmfnirbmgIHvvIzliJnop6blj5FwcmVzc2VuZOaJi+WKv1xuICAgICpcbiAgICAqIDMuIOino+e7keWumuaJgOacieebuOWFs+S6i+S7tlxuICAgICpcbiAgICAqIEBldmVudFxuICAgICogQHBhcmFtICB7ZXZlbnR9IGV2ZW50XG4gICAgKi9cbiAgICBmdW5jdGlvbiB0b3VjaGVuZEhhbmRsZXIoZXZlbnQpIHtcblxuICAgICAgICBpZiAoT2JqZWN0LmtleXMoZ2VzdHVyZXMpLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgdmFyIGVsZW1lbnRzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIGdlc3R1cmVzKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudHMucHVzaChnZXN0dXJlc1twXS5lbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpcmVFdmVudChnZXRDb21tb25BbmNlc3RvcihlbGVtZW50c1swXSwgZWxlbWVudHNbMV0pLCAnZHVhbHRvdWNoZW5kJywge1xuICAgICAgICAgICAgICAgIHRvdWNoZXM6IHNsaWNlLmNhbGwoZXZlbnQudG91Y2hlcyksXG4gICAgICAgICAgICAgICAgdG91Y2hFdmVudDogZXZlbnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbaV0sXG4gICAgICAgICAgICAgICAgaWQgPSB0b3VjaC5pZGVudGlmaWVyLFxuICAgICAgICAgICAgICAgIGdlc3R1cmUgPSBnZXN0dXJlc1tpZF07XG5cbiAgICAgICAgICAgIGlmICghZ2VzdHVyZSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZ2VzdHVyZS5wcmVzc2luZ0hhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoZ2VzdHVyZS5wcmVzc2luZ0hhbmRsZXIpO1xuICAgICAgICAgICAgICAgIGdlc3R1cmUucHJlc3NpbmdIYW5kbGVyID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGdlc3R1cmUuc3RhdHVzID09PSAndGFwcGluZycpIHtcbiAgICAgICAgICAgICAgICBnZXN0dXJlLnRpbWVzdGFtcCA9IERhdGUubm93KCk7XG4gICAgICAgICAgICAgICAgZmlyZUV2ZW50KGdlc3R1cmUuZWxlbWVudCwgJ3RhcCcsIHtcbiAgICAgICAgICAgICAgICAgICAgdG91Y2g6IHRvdWNoLFxuICAgICAgICAgICAgICAgICAgICB0b3VjaEV2ZW50OiBldmVudFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGxhc3RUYXAgJiYgZ2VzdHVyZS50aW1lc3RhbXAgLSBsYXN0VGFwLnRpbWVzdGFtcCA8IDMwMCkge1xuICAgICAgICAgICAgICAgICAgICBmaXJlRXZlbnQoZ2VzdHVyZS5lbGVtZW50LCAnZG91YmxldGFwJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2g6IHRvdWNoLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG91Y2hFdmVudDogZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGFzdFRhcCA9IGdlc3R1cmU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChnZXN0dXJlLnN0YXR1cyA9PT0gJ3Bhbm5pbmcnKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgICAgICAgICAgdmFyIGR1cmF0aW9uID0gbm93IC0gZ2VzdHVyZS5zdGFydFRpbWUsXG5cbiAgICAgICAgICAgICAgICAvLyB2ZWxvY2l0eVggPSAodG91Y2guY2xpZW50WCAtIGdlc3R1cmUuc3RhcnRUb3VjaC5jbGllbnRYKSAvIGR1cmF0aW9uLFxuICAgICAgICAgICAgICAgIC8vIHZlbG9jaXR5WSA9ICh0b3VjaC5jbGllbnRZIC0gZ2VzdHVyZS5zdGFydFRvdWNoLmNsaWVudFkpIC8gZHVyYXRpb24sXG4gICAgICAgICAgICAgICAgZGlzcGxhY2VtZW50WCA9IHRvdWNoLmNsaWVudFggLSBnZXN0dXJlLnN0YXJ0VG91Y2guY2xpZW50WCxcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxhY2VtZW50WSA9IHRvdWNoLmNsaWVudFkgLSBnZXN0dXJlLnN0YXJ0VG91Y2guY2xpZW50WTtcblxuICAgICAgICAgICAgICAgIHZhciB2ZWxvY2l0eSA9IE1hdGguc3FydChnZXN0dXJlLnZlbG9jaXR5WSAqIGdlc3R1cmUudmVsb2NpdHlZICsgZ2VzdHVyZS52ZWxvY2l0eVggKiBnZXN0dXJlLnZlbG9jaXR5WCk7XG4gICAgICAgICAgICAgICAgdmFyIGlzZmxpY2sgPSB2ZWxvY2l0eSA+IDAuNSAmJiBub3cgLSBnZXN0dXJlLmxhc3RUaW1lIDwgMTAwO1xuICAgICAgICAgICAgICAgIHZhciBleHRyYSA9IHtcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgICAgICAgICAgICAgICBpc2ZsaWNrOiBpc2ZsaWNrLFxuICAgICAgICAgICAgICAgICAgICB2ZWxvY2l0eVg6IGdlc3R1cmUudmVsb2NpdHlYLFxuICAgICAgICAgICAgICAgICAgICB2ZWxvY2l0eVk6IGdlc3R1cmUudmVsb2NpdHlZLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGFjZW1lbnRYOiBkaXNwbGFjZW1lbnRYLFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGFjZW1lbnRZOiBkaXNwbGFjZW1lbnRZLFxuICAgICAgICAgICAgICAgICAgICB0b3VjaDogdG91Y2gsXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoZXM6IGV2ZW50LnRvdWNoZXMsXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZWRUb3VjaGVzOiBldmVudC5jaGFuZ2VkVG91Y2hlcyxcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIGlzVmVydGljYWw6IGdlc3R1cmUuaXNWZXJ0aWNhbFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBmaXJlRXZlbnQoZ2VzdHVyZS5lbGVtZW50LCAncGFuZW5kJywgZXh0cmEpO1xuICAgICAgICAgICAgICAgIGlmIChpc2ZsaWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpcmVFdmVudChnZXN0dXJlLmVsZW1lbnQsICdzd2lwZScsIGV4dHJhKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZ2VzdHVyZS5pc1ZlcnRpY2FsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJlRXZlbnQoZ2VzdHVyZS5lbGVtZW50LCAndmVydGljYWxzd2lwZScsIGV4dHJhKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcmVFdmVudChnZXN0dXJlLmVsZW1lbnQsICdob3Jpem9udGFsc3dpcGUnLCBleHRyYSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChnZXN0dXJlLnN0YXR1cyA9PT0gJ3ByZXNzaW5nJykge1xuICAgICAgICAgICAgICAgIGZpcmVFdmVudChnZXN0dXJlLmVsZW1lbnQsICdwcmVzc2VuZCcsIHtcbiAgICAgICAgICAgICAgICAgICAgdG91Y2g6IHRvdWNoLFxuICAgICAgICAgICAgICAgICAgICB0b3VjaEV2ZW50OiBldmVudFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkZWxldGUgZ2VzdHVyZXNbaWRdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGdlc3R1cmVzKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGRvY0VsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRvdWNobW92ZUhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIGRvY0VsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdG91Y2hlbmRIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgICAgICBkb2NFbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRvdWNoY2FuY2VsSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiDmjZXojrd0b3VjaGNhbmNlbOS6i+S7tlxuICAgICpcbiAgICAqIDEuIOWmguaenOW9k+WJjeinpueCueaVsOS4ujLvvIzliJnop6blj5FkdWFsdG91Y2hlbmTmiYvlir9cbiAgICAqXG4gICAgKiAyLiDpgY3ljobmr4/kuKrop6bngrnvvJpcbiAgICAqID4g5aaC5p6c5aSE5LqOcGFubmluZ+eKtuaAge+8jOWImeinpuWPkXBhbmVuZOaJi+WKv1xuICAgICogPiDlpoLmnpzlpITkuo5wcmVzc2luZ+eKtuaAge+8jOWImeinpuWPkXByZXNzZW5k5omL5Yq/XG4gICAgKlxuICAgICogMy4g6Kej57uR5a6a5omA5pyJ55u45YWz5LqL5Lu2XG4gICAgKlxuICAgICogQGV2ZW50XG4gICAgKiBAcGFyYW0gIHtldmVudH0gZXZlbnRcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHRvdWNoY2FuY2VsSGFuZGxlcihldmVudCkge1xuICAgICAgICAvLyBUT0RPOiDlkox0b3VjaGVuZEhhbmRsZXLlpKfph4/ph43lpI3vvIzlu7rorq5EUllcblxuICAgICAgICBpZiAoT2JqZWN0LmtleXMoZ2VzdHVyZXMpLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgdmFyIGVsZW1lbnRzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIGdlc3R1cmVzKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudHMucHVzaChnZXN0dXJlc1twXS5lbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpcmVFdmVudChnZXRDb21tb25BbmNlc3RvcihlbGVtZW50c1swXSwgZWxlbWVudHNbMV0pLCAnZHVhbHRvdWNoZW5kJywge1xuICAgICAgICAgICAgICAgIHRvdWNoZXM6IHNsaWNlLmNhbGwoZXZlbnQudG91Y2hlcyksXG4gICAgICAgICAgICAgICAgdG91Y2hFdmVudDogZXZlbnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbaV0sXG4gICAgICAgICAgICAgICAgaWQgPSB0b3VjaC5pZGVudGlmaWVyLFxuICAgICAgICAgICAgICAgIGdlc3R1cmUgPSBnZXN0dXJlc1tpZF07XG5cbiAgICAgICAgICAgIGlmICghZ2VzdHVyZSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZ2VzdHVyZS5wcmVzc2luZ0hhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoZ2VzdHVyZS5wcmVzc2luZ0hhbmRsZXIpO1xuICAgICAgICAgICAgICAgIGdlc3R1cmUucHJlc3NpbmdIYW5kbGVyID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGdlc3R1cmUuc3RhdHVzID09PSAncGFubmluZycpIHtcbiAgICAgICAgICAgICAgICBmaXJlRXZlbnQoZ2VzdHVyZS5lbGVtZW50LCAncGFuZW5kJywge1xuICAgICAgICAgICAgICAgICAgICB0b3VjaDogdG91Y2gsXG4gICAgICAgICAgICAgICAgICAgIHRvdWNoZXM6IGV2ZW50LnRvdWNoZXMsXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZWRUb3VjaGVzOiBldmVudC5jaGFuZ2VkVG91Y2hlcyxcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hFdmVudDogZXZlbnRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChnZXN0dXJlLnN0YXR1cyA9PT0gJ3ByZXNzaW5nJykge1xuICAgICAgICAgICAgICAgIGZpcmVFdmVudChnZXN0dXJlLmVsZW1lbnQsICdwcmVzc2VuZCcsIHtcbiAgICAgICAgICAgICAgICAgICAgdG91Y2g6IHRvdWNoLFxuICAgICAgICAgICAgICAgICAgICB0b3VjaEV2ZW50OiBldmVudFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVsZXRlIGdlc3R1cmVzW2lkXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhnZXN0dXJlcykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBkb2NFbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0b3VjaG1vdmVIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgICAgICBkb2NFbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRvdWNoZW5kSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICAgICAgZG9jRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0b3VjaGNhbmNlbEhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRvY0VsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0b3VjaHN0YXJ0SGFuZGxlciwgZmFsc2UpO1xufSkod2luZG93KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMS4wQGdlc3R1cmUtanMvc3JjL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxMDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICdldmVudC1lbWl0dGVyJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50IHt9XG5FdmVudEVtaXR0ZXIoRXZlbnQucHJvdG90eXBlKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZXZlbnQuanMiLCIndXNlIHN0cmljdCc7XG5cbnZhciBkICAgICAgICA9IHJlcXVpcmUoJ2QnKVxuICAsIGNhbGxhYmxlID0gcmVxdWlyZSgnZXM1LWV4dC9vYmplY3QvdmFsaWQtY2FsbGFibGUnKVxuXG4gICwgYXBwbHkgPSBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHksIGNhbGwgPSBGdW5jdGlvbi5wcm90b3R5cGUuY2FsbFxuICAsIGNyZWF0ZSA9IE9iamVjdC5jcmVhdGUsIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5XG4gICwgZGVmaW5lUHJvcGVydGllcyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzXG4gICwgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5XG4gICwgZGVzY3JpcHRvciA9IHsgY29uZmlndXJhYmxlOiB0cnVlLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUgfVxuXG4gICwgb24sIG9uY2UsIG9mZiwgZW1pdCwgbWV0aG9kcywgZGVzY3JpcHRvcnMsIGJhc2U7XG5cbm9uID0gZnVuY3Rpb24gKHR5cGUsIGxpc3RlbmVyKSB7XG5cdHZhciBkYXRhO1xuXG5cdGNhbGxhYmxlKGxpc3RlbmVyKTtcblxuXHRpZiAoIWhhc093blByb3BlcnR5LmNhbGwodGhpcywgJ19fZWVfXycpKSB7XG5cdFx0ZGF0YSA9IGRlc2NyaXB0b3IudmFsdWUgPSBjcmVhdGUobnVsbCk7XG5cdFx0ZGVmaW5lUHJvcGVydHkodGhpcywgJ19fZWVfXycsIGRlc2NyaXB0b3IpO1xuXHRcdGRlc2NyaXB0b3IudmFsdWUgPSBudWxsO1xuXHR9IGVsc2Uge1xuXHRcdGRhdGEgPSB0aGlzLl9fZWVfXztcblx0fVxuXHRpZiAoIWRhdGFbdHlwZV0pIGRhdGFbdHlwZV0gPSBsaXN0ZW5lcjtcblx0ZWxzZSBpZiAodHlwZW9mIGRhdGFbdHlwZV0gPT09ICdvYmplY3QnKSBkYXRhW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuXHRlbHNlIGRhdGFbdHlwZV0gPSBbZGF0YVt0eXBlXSwgbGlzdGVuZXJdO1xuXG5cdHJldHVybiB0aGlzO1xufTtcblxub25jZSA9IGZ1bmN0aW9uICh0eXBlLCBsaXN0ZW5lcikge1xuXHR2YXIgb25jZSwgc2VsZjtcblxuXHRjYWxsYWJsZShsaXN0ZW5lcik7XG5cdHNlbGYgPSB0aGlzO1xuXHRvbi5jYWxsKHRoaXMsIHR5cGUsIG9uY2UgPSBmdW5jdGlvbiAoKSB7XG5cdFx0b2ZmLmNhbGwoc2VsZiwgdHlwZSwgb25jZSk7XG5cdFx0YXBwbHkuY2FsbChsaXN0ZW5lciwgdGhpcywgYXJndW1lbnRzKTtcblx0fSk7XG5cblx0b25jZS5fX2VlT25jZUxpc3RlbmVyX18gPSBsaXN0ZW5lcjtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG5vZmYgPSBmdW5jdGlvbiAodHlwZSwgbGlzdGVuZXIpIHtcblx0dmFyIGRhdGEsIGxpc3RlbmVycywgY2FuZGlkYXRlLCBpO1xuXG5cdGNhbGxhYmxlKGxpc3RlbmVyKTtcblxuXHRpZiAoIWhhc093blByb3BlcnR5LmNhbGwodGhpcywgJ19fZWVfXycpKSByZXR1cm4gdGhpcztcblx0ZGF0YSA9IHRoaXMuX19lZV9fO1xuXHRpZiAoIWRhdGFbdHlwZV0pIHJldHVybiB0aGlzO1xuXHRsaXN0ZW5lcnMgPSBkYXRhW3R5cGVdO1xuXG5cdGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnb2JqZWN0Jykge1xuXHRcdGZvciAoaSA9IDA7IChjYW5kaWRhdGUgPSBsaXN0ZW5lcnNbaV0pOyArK2kpIHtcblx0XHRcdGlmICgoY2FuZGlkYXRlID09PSBsaXN0ZW5lcikgfHxcblx0XHRcdFx0XHQoY2FuZGlkYXRlLl9fZWVPbmNlTGlzdGVuZXJfXyA9PT0gbGlzdGVuZXIpKSB7XG5cdFx0XHRcdGlmIChsaXN0ZW5lcnMubGVuZ3RoID09PSAyKSBkYXRhW3R5cGVdID0gbGlzdGVuZXJzW2kgPyAwIDogMV07XG5cdFx0XHRcdGVsc2UgbGlzdGVuZXJzLnNwbGljZShpLCAxKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0aWYgKChsaXN0ZW5lcnMgPT09IGxpc3RlbmVyKSB8fFxuXHRcdFx0XHQobGlzdGVuZXJzLl9fZWVPbmNlTGlzdGVuZXJfXyA9PT0gbGlzdGVuZXIpKSB7XG5cdFx0XHRkZWxldGUgZGF0YVt0eXBlXTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdGhpcztcbn07XG5cbmVtaXQgPSBmdW5jdGlvbiAodHlwZSkge1xuXHR2YXIgaSwgbCwgbGlzdGVuZXIsIGxpc3RlbmVycywgYXJncztcblxuXHRpZiAoIWhhc093blByb3BlcnR5LmNhbGwodGhpcywgJ19fZWVfXycpKSByZXR1cm47XG5cdGxpc3RlbmVycyA9IHRoaXMuX19lZV9fW3R5cGVdO1xuXHRpZiAoIWxpc3RlbmVycykgcmV0dXJuO1xuXG5cdGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnb2JqZWN0Jykge1xuXHRcdGwgPSBhcmd1bWVudHMubGVuZ3RoO1xuXHRcdGFyZ3MgPSBuZXcgQXJyYXkobCAtIDEpO1xuXHRcdGZvciAoaSA9IDE7IGkgPCBsOyArK2kpIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuXG5cdFx0bGlzdGVuZXJzID0gbGlzdGVuZXJzLnNsaWNlKCk7XG5cdFx0Zm9yIChpID0gMDsgKGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldKTsgKytpKSB7XG5cdFx0XHRhcHBseS5jYWxsKGxpc3RlbmVyLCB0aGlzLCBhcmdzKTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0c3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG5cdFx0Y2FzZSAxOlxuXHRcdFx0Y2FsbC5jYWxsKGxpc3RlbmVycywgdGhpcyk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDI6XG5cdFx0XHRjYWxsLmNhbGwobGlzdGVuZXJzLCB0aGlzLCBhcmd1bWVudHNbMV0pO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAzOlxuXHRcdFx0Y2FsbC5jYWxsKGxpc3RlbmVycywgdGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuXHRcdFx0YnJlYWs7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdGwgPSBhcmd1bWVudHMubGVuZ3RoO1xuXHRcdFx0YXJncyA9IG5ldyBBcnJheShsIC0gMSk7XG5cdFx0XHRmb3IgKGkgPSAxOyBpIDwgbDsgKytpKSB7XG5cdFx0XHRcdGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0fVxuXHRcdFx0YXBwbHkuY2FsbChsaXN0ZW5lcnMsIHRoaXMsIGFyZ3MpO1xuXHRcdH1cblx0fVxufTtcblxubWV0aG9kcyA9IHtcblx0b246IG9uLFxuXHRvbmNlOiBvbmNlLFxuXHRvZmY6IG9mZixcblx0ZW1pdDogZW1pdFxufTtcblxuZGVzY3JpcHRvcnMgPSB7XG5cdG9uOiBkKG9uKSxcblx0b25jZTogZChvbmNlKSxcblx0b2ZmOiBkKG9mZiksXG5cdGVtaXQ6IGQoZW1pdClcbn07XG5cbmJhc2UgPSBkZWZpbmVQcm9wZXJ0aWVzKHt9LCBkZXNjcmlwdG9ycyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZ1bmN0aW9uIChvKSB7XG5cdHJldHVybiAobyA9PSBudWxsKSA/IGNyZWF0ZShiYXNlKSA6IGRlZmluZVByb3BlcnRpZXMoT2JqZWN0KG8pLCBkZXNjcmlwdG9ycyk7XG59O1xuZXhwb3J0cy5tZXRob2RzID0gbWV0aG9kcztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4zLjRAZXZlbnQtZW1pdHRlci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYXNzaWduICAgICAgICA9IHJlcXVpcmUoJ2VzNS1leHQvb2JqZWN0L2Fzc2lnbicpXG4gICwgbm9ybWFsaXplT3B0cyA9IHJlcXVpcmUoJ2VzNS1leHQvb2JqZWN0L25vcm1hbGl6ZS1vcHRpb25zJylcbiAgLCBpc0NhbGxhYmxlICAgID0gcmVxdWlyZSgnZXM1LWV4dC9vYmplY3QvaXMtY2FsbGFibGUnKVxuICAsIGNvbnRhaW5zICAgICAgPSByZXF1aXJlKCdlczUtZXh0L3N0cmluZy8jL2NvbnRhaW5zJylcblxuICAsIGQ7XG5cbmQgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkc2NyLCB2YWx1ZS8qLCBvcHRpb25zKi8pIHtcblx0dmFyIGMsIGUsIHcsIG9wdGlvbnMsIGRlc2M7XG5cdGlmICgoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHx8ICh0eXBlb2YgZHNjciAhPT0gJ3N0cmluZycpKSB7XG5cdFx0b3B0aW9ucyA9IHZhbHVlO1xuXHRcdHZhbHVlID0gZHNjcjtcblx0XHRkc2NyID0gbnVsbDtcblx0fSBlbHNlIHtcblx0XHRvcHRpb25zID0gYXJndW1lbnRzWzJdO1xuXHR9XG5cdGlmIChkc2NyID09IG51bGwpIHtcblx0XHRjID0gdyA9IHRydWU7XG5cdFx0ZSA9IGZhbHNlO1xuXHR9IGVsc2Uge1xuXHRcdGMgPSBjb250YWlucy5jYWxsKGRzY3IsICdjJyk7XG5cdFx0ZSA9IGNvbnRhaW5zLmNhbGwoZHNjciwgJ2UnKTtcblx0XHR3ID0gY29udGFpbnMuY2FsbChkc2NyLCAndycpO1xuXHR9XG5cblx0ZGVzYyA9IHsgdmFsdWU6IHZhbHVlLCBjb25maWd1cmFibGU6IGMsIGVudW1lcmFibGU6IGUsIHdyaXRhYmxlOiB3IH07XG5cdHJldHVybiAhb3B0aW9ucyA/IGRlc2MgOiBhc3NpZ24obm9ybWFsaXplT3B0cyhvcHRpb25zKSwgZGVzYyk7XG59O1xuXG5kLmdzID0gZnVuY3Rpb24gKGRzY3IsIGdldCwgc2V0LyosIG9wdGlvbnMqLykge1xuXHR2YXIgYywgZSwgb3B0aW9ucywgZGVzYztcblx0aWYgKHR5cGVvZiBkc2NyICE9PSAnc3RyaW5nJykge1xuXHRcdG9wdGlvbnMgPSBzZXQ7XG5cdFx0c2V0ID0gZ2V0O1xuXHRcdGdldCA9IGRzY3I7XG5cdFx0ZHNjciA9IG51bGw7XG5cdH0gZWxzZSB7XG5cdFx0b3B0aW9ucyA9IGFyZ3VtZW50c1szXTtcblx0fVxuXHRpZiAoZ2V0ID09IG51bGwpIHtcblx0XHRnZXQgPSB1bmRlZmluZWQ7XG5cdH0gZWxzZSBpZiAoIWlzQ2FsbGFibGUoZ2V0KSkge1xuXHRcdG9wdGlvbnMgPSBnZXQ7XG5cdFx0Z2V0ID0gc2V0ID0gdW5kZWZpbmVkO1xuXHR9IGVsc2UgaWYgKHNldCA9PSBudWxsKSB7XG5cdFx0c2V0ID0gdW5kZWZpbmVkO1xuXHR9IGVsc2UgaWYgKCFpc0NhbGxhYmxlKHNldCkpIHtcblx0XHRvcHRpb25zID0gc2V0O1xuXHRcdHNldCA9IHVuZGVmaW5lZDtcblx0fVxuXHRpZiAoZHNjciA9PSBudWxsKSB7XG5cdFx0YyA9IHRydWU7XG5cdFx0ZSA9IGZhbHNlO1xuXHR9IGVsc2Uge1xuXHRcdGMgPSBjb250YWlucy5jYWxsKGRzY3IsICdjJyk7XG5cdFx0ZSA9IGNvbnRhaW5zLmNhbGwoZHNjciwgJ2UnKTtcblx0fVxuXG5cdGRlc2MgPSB7IGdldDogZ2V0LCBzZXQ6IHNldCwgY29uZmlndXJhYmxlOiBjLCBlbnVtZXJhYmxlOiBlIH07XG5cdHJldHVybiAhb3B0aW9ucyA/IGRlc2MgOiBhc3NpZ24obm9ybWFsaXplT3B0cyhvcHRpb25zKSwgZGVzYyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjEuMUBkL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxMDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9pcy1pbXBsZW1lbnRlZCcpKClcblx0PyBPYmplY3QuYXNzaWduXG5cdDogcmVxdWlyZSgnLi9zaGltJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3QvYXNzaWduL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxMDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgYXNzaWduID0gT2JqZWN0LmFzc2lnbiwgb2JqO1xuXHRpZiAodHlwZW9mIGFzc2lnbiAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuIGZhbHNlO1xuXHRvYmogPSB7IGZvbzogJ3JheicgfTtcblx0YXNzaWduKG9iaiwgeyBiYXI6ICdkd2EnIH0sIHsgdHJ6eTogJ3RyenknIH0pO1xuXHRyZXR1cm4gKG9iai5mb28gKyBvYmouYmFyICsgb2JqLnRyenkpID09PSAncmF6ZHdhdHJ6eSc7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjEwLjEyQGVzNS1leHQvb2JqZWN0L2Fzc2lnbi9pcy1pbXBsZW1lbnRlZC5qc1xuLy8gbW9kdWxlIGlkID0gMTA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIga2V5cyAgPSByZXF1aXJlKCcuLi9rZXlzJylcbiAgLCB2YWx1ZSA9IHJlcXVpcmUoJy4uL3ZhbGlkLXZhbHVlJylcblxuICAsIG1heCA9IE1hdGgubWF4O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkZXN0LCBzcmMvKiwg4oCmc3JjbiovKSB7XG5cdHZhciBlcnJvciwgaSwgbCA9IG1heChhcmd1bWVudHMubGVuZ3RoLCAyKSwgYXNzaWduO1xuXHRkZXN0ID0gT2JqZWN0KHZhbHVlKGRlc3QpKTtcblx0YXNzaWduID0gZnVuY3Rpb24gKGtleSkge1xuXHRcdHRyeSB7IGRlc3Rba2V5XSA9IHNyY1trZXldOyB9IGNhdGNoIChlKSB7XG5cdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGU7XG5cdFx0fVxuXHR9O1xuXHRmb3IgKGkgPSAxOyBpIDwgbDsgKytpKSB7XG5cdFx0c3JjID0gYXJndW1lbnRzW2ldO1xuXHRcdGtleXMoc3JjKS5mb3JFYWNoKGFzc2lnbik7XG5cdH1cblx0aWYgKGVycm9yICE9PSB1bmRlZmluZWQpIHRocm93IGVycm9yO1xuXHRyZXR1cm4gZGVzdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3QvYXNzaWduL3NoaW0uanNcbi8vIG1vZHVsZSBpZCA9IDExMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2lzLWltcGxlbWVudGVkJykoKVxuXHQ/IE9iamVjdC5rZXlzXG5cdDogcmVxdWlyZSgnLi9zaGltJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3Qva2V5cy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblx0dHJ5IHtcblx0XHRPYmplY3Qua2V5cygncHJpbWl0aXZlJyk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGUpIHsgcmV0dXJuIGZhbHNlOyB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjEwLjEyQGVzNS1leHQvb2JqZWN0L2tleXMvaXMtaW1wbGVtZW50ZWQuanNcbi8vIG1vZHVsZSBpZCA9IDExMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxudmFyIGtleXMgPSBPYmplY3Qua2V5cztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG5cdHJldHVybiBrZXlzKG9iamVjdCA9PSBudWxsID8gb2JqZWN0IDogT2JqZWN0KG9iamVjdCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4xMC4xMkBlczUtZXh0L29iamVjdC9rZXlzL3NoaW0uanNcbi8vIG1vZHVsZSBpZCA9IDExM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0aWYgKHZhbHVlID09IG51bGwpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgdXNlIG51bGwgb3IgdW5kZWZpbmVkXCIpO1xuXHRyZXR1cm4gdmFsdWU7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjEwLjEyQGVzNS1leHQvb2JqZWN0L3ZhbGlkLXZhbHVlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbnZhciBmb3JFYWNoID0gQXJyYXkucHJvdG90eXBlLmZvckVhY2gsIGNyZWF0ZSA9IE9iamVjdC5jcmVhdGU7XG5cbnZhciBwcm9jZXNzID0gZnVuY3Rpb24gKHNyYywgb2JqKSB7XG5cdHZhciBrZXk7XG5cdGZvciAoa2V5IGluIHNyYykgb2JqW2tleV0gPSBzcmNba2V5XTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9wdGlvbnMvKiwg4oCmb3B0aW9ucyovKSB7XG5cdHZhciByZXN1bHQgPSBjcmVhdGUobnVsbCk7XG5cdGZvckVhY2guY2FsbChhcmd1bWVudHMsIGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cdFx0aWYgKG9wdGlvbnMgPT0gbnVsbCkgcmV0dXJuO1xuXHRcdHByb2Nlc3MoT2JqZWN0KG9wdGlvbnMpLCByZXN1bHQpO1xuXHR9KTtcblx0cmV0dXJuIHJlc3VsdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3Qvbm9ybWFsaXplLW9wdGlvbnMuanNcbi8vIG1vZHVsZSBpZCA9IDExNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIERlcHJlY2F0ZWRcblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbic7IH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3QvaXMtY2FsbGFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDExNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2lzLWltcGxlbWVudGVkJykoKVxuXHQ/IFN0cmluZy5wcm90b3R5cGUuY29udGFpbnNcblx0OiByZXF1aXJlKCcuL3NoaW0nKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4xMC4xMkBlczUtZXh0L3N0cmluZy8jL2NvbnRhaW5zL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbnZhciBzdHIgPSAncmF6ZHdhdHJ6eSc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXHRpZiAodHlwZW9mIHN0ci5jb250YWlucyAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuIGZhbHNlO1xuXHRyZXR1cm4gKChzdHIuY29udGFpbnMoJ2R3YScpID09PSB0cnVlKSAmJiAoc3RyLmNvbnRhaW5zKCdmb28nKSA9PT0gZmFsc2UpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMTAuMTJAZXM1LWV4dC9zdHJpbmcvIy9jb250YWlucy9pcy1pbXBsZW1lbnRlZC5qc1xuLy8gbW9kdWxlIGlkID0gMTE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5kZXhPZiA9IFN0cmluZy5wcm90b3R5cGUuaW5kZXhPZjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2VhcmNoU3RyaW5nLyosIHBvc2l0aW9uKi8pIHtcblx0cmV0dXJuIGluZGV4T2YuY2FsbCh0aGlzLCBzZWFyY2hTdHJpbmcsIGFyZ3VtZW50c1sxXSkgPiAtMTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMTAuMTJAZXM1LWV4dC9zdHJpbmcvIy9jb250YWlucy9zaGltLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuKSB7XG5cdGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHRocm93IG5ldyBUeXBlRXJyb3IoZm4gKyBcIiBpcyBub3QgYSBmdW5jdGlvblwiKTtcblx0cmV0dXJuIGZuO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4xMC4xMkBlczUtZXh0L29iamVjdC92YWxpZC1jYWxsYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gMTIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiaW1wb3J0ICcuL3N0YWdlLmNzcyc7XG5pbXBvcnQge1xuICAgIHdpbixcbiAgICBkb2MsXG4gICAgUHJvbWlzZSxcbiAgICBxdWVyeSxcbiAgICBxdWVyeUFsbCxcbiAgICBnZXRSZWN0XG59IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQge1xuICAgIENhbnZhc1JlbmRlclxufSBmcm9tICcuL2NhbnZhcyc7XG5pbXBvcnQgc2xpY2VDb25maWcgZnJvbSAnLi9zbGljZUNvbmZpZyc7XG5cbmNvbnN0IHNsaWNlV2lkdGggPSA3NTA7XG5jb25zdCBzbGljZUhlaWdodCA9IDEzMzQ7XG5jb25zdCBoU2xpY2UgPSA5O1xuY29uc3QgdlNsaWNlID0gMTQ7XG5jb25zdCB3aWR0aCA9IHNsaWNlV2lkdGggKiBoU2xpY2U7XG5jb25zdCBoZWlnaHQgPSBzbGljZUhlaWdodCAqIHZTbGljZTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhZ2UgZXh0ZW5kcyBDYW52YXNSZW5kZXJ7XG4gICAgY29uc3RydWN0b3Iodmlld3BvcnQpIHtcbiAgICAgICAgY29uc3Qge3dpZHRoOiB2dywgaGVpZ2h0OiB2aH0gPSBnZXRSZWN0KHZpZXdwb3J0KTtcbiAgICAgICAgY29uc3Qgc3RhZ2VFbCA9IHF1ZXJ5KHZpZXdwb3J0LCAnI3N0YWdlJyk7XG5cbiAgICAgICAgc3VwZXIoc3RhZ2VFbCwgdncsIHZoKTtcblxuICAgICAgICB0aGlzLnN0YWdlRWwgPSBzdGFnZUVsO1xuICAgICAgICB0aGlzLnZ3ID0gdnc7XG4gICAgICAgIHRoaXMudmggPSB2aDtcbiAgICAgICAgdGhpcy53aWR0aCA9IHZ3ICogaFNsaWNlO1xuICAgICAgICB0aGlzLmhlaWdodCA9IHZ3IC8gKHdpZHRoIC8gaFNsaWNlKSAqIGhlaWdodDtcbiAgICAgICAgdGhpcy5oU2xpY2UgPSBoU2xpY2U7XG4gICAgICAgIHRoaXMudlNsaWNlID0gdlNsaWNlO1xuICAgICAgICB0aGlzLnNsaWNlV2lkdGggPSB0aGlzLndpZHRoIC8gaFNsaWNlO1xuICAgICAgICB0aGlzLnNsaWNlSGVpZ2h0ID0gdGhpcy5oZWlnaHQgLyB2U2xpY2U7XG4gICAgICAgIHRoaXMuc2xpY2VzID0gW107XG5cblxuICAgICAgICBmb3IgKGxldCB2ID0gMDsgdiA8IHRoaXMudlNsaWNlOyB2KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGggPSAwOyBoIDwgdGhpcy5oU2xpY2U7IGgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdiAqIHRoaXMuaFNsaWNlICsgaDtcbiAgICAgICAgICAgICAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiB2ICogdGhpcy5oU2xpY2UgKyBoLFxuICAgICAgICAgICAgICAgICAgICBoLFxuICAgICAgICAgICAgICAgICAgICB2XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAoc2xpY2VDb25maWdbU3RyaW5nKGluZGV4KV0pIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gc2xpY2VDb25maWdbU3RyaW5nKGluZGV4KV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ1trZXldID0gc2xpY2VDb25maWdbU3RyaW5nKGluZGV4KV1ba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuc2xpY2VzLnB1c2goY29uZmlnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB0b3RhbEFtb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2xpY2VzLmxlbmd0aDtcbiAgICB9XG5cbiAgICBnZXQgc3BlY2lhbEFtb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2xpY2VzLmZpbHRlcihzbGljZSA9PlxuICAgICAgICAgICAgc2xpY2UudHlwZSA9PT0gM1xuICAgICAgICApLmxlbmd0aDtcbiAgICB9XG5cbiAgICBnZXQgc3BlY2lhbEZvdW5kKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zbGljZXMuZmlsdGVyKHNsaWNlID0+XG4gICAgICAgICAgICBzbGljZS50eXBlID09PSAzICYmIHNsaWNlLmZvdW5kXG4gICAgICAgICkubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldCBmb2N1c2VkQW1vdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zbGljZXMuZmlsdGVyKHNsaWNlID0+XG4gICAgICAgICAgICBzbGljZS5mb2N1c2VkXG4gICAgICAgICkubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldCBob3ZlcmVkQW1vdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zbGljZXMuZmlsdGVyKHNsaWNlID0+XG4gICAgICAgICAgICBzbGljZS5ob3ZlcmVkXG4gICAgICAgICkubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldFNsaWNlKHNjcm9sbFgsIHNjcm9sbFkpIHtcbiAgICAgICAgY29uc3QgaCA9IHBhcnNlSW50KHNjcm9sbFggLyB0aGlzLnNsaWNlV2lkdGgpO1xuICAgICAgICBjb25zdCB2ID0gcGFyc2VJbnQoc2Nyb2xsWSAvIHRoaXMuc2xpY2VIZWlnaHQpO1xuICAgICAgICByZXR1cm4gdGhpcy5zbGljZXNbdiAqIHRoaXMuaFNsaWNlICsgaF07XG4gICAgfVxuXG4gICAgZ2V0SG92ZXJTbGljZShzY3JvbGxYLCBzY3JvbGxZKSB7XG4gICAgICAgIGNvbnN0IGhvdmVyID0gdGhpcy5nZXRTbGljZShzY3JvbGxYLCBzY3JvbGxZKTtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgaCxcbiAgICAgICAgICAgIHYsXG4gICAgICAgICAgICBpbmRleFxuICAgICAgICB9ID0gaG92ZXI7XG4gICAgICAgIGNvbnN0IHJlbGF0ZWQgPSBbXTtcblxuICAgICAgICBpZiAoaCA8IHRoaXMuaFNsaWNlIC0gMSkge1xuICAgICAgICAgICAgcmVsYXRlZC5wdXNoKHRoaXMuc2xpY2VzW2luZGV4ICsgMV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHYgPCB0aGlzLnZTbGljZSAtIDEpIHtcbiAgICAgICAgICAgIHJlbGF0ZWQucHVzaCh0aGlzLnNsaWNlc1tpbmRleCArIHRoaXMuaFNsaWNlXSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaCA8IHRoaXMuaFNsaWNlIC0gMVxuICAgICAgICAgICAgJiYgdiA8IHRoaXMudlNsaWNlIC0gMSkge1xuICAgICAgICAgICAgcmVsYXRlZC5wdXNoKHRoaXMuc2xpY2VzW2luZGV4ICsgdGhpcy5oU2xpY2UgKyAxXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgaG92ZXIsXG4gICAgICAgICAgICAuLi5yZWxhdGVkXG4gICAgICAgIF0ubWFwKHNsaWNlID0+IHtcbiAgICAgICAgICAgIHNsaWNlLmhvdmVyZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHNsaWNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRGb2N1c1NsaWNlKGN4LCBjeSkge1xuICAgICAgICBjb25zdCBoID0gcGFyc2VJbnQoY3ggLyB0aGlzLnNsaWNlV2lkdGgpO1xuICAgICAgICBjb25zdCB2ID0gcGFyc2VJbnQoY3kgLyB0aGlzLnNsaWNlSGVpZ2h0KTtcbiAgICAgICAgY29uc3QgZHggPSBwYXJzZUludChjeCAlIHRoaXMuc2xpY2VXaWR0aCk7XG4gICAgICAgIGNvbnN0IGR5ID0gcGFyc2VJbnQoY3kgJSB0aGlzLnNsaWNlSGVpZ2h0KTtcblxuICAgICAgICBsZXQgc2xpY2U7XG4gICAgICAgIGlmIChkeCA+IHRoaXMuc2xpY2VXaWR0aCAqIDAuMjUgJiYgZHggPCB0aGlzLnNsaWNlV2lkdGggKiAwLjc1XG4gICAgICAgICAgICAgICAgJiYgZHkgPiB0aGlzLnNsaWNlSGVpZ2h0ICogMC4yNSAmJiBkeSA8IHRoaXMuc2xpY2VIZWlnaHQgKiAwLjc1KSB7XG4gICAgICAgICAgICBzbGljZSA9IHRoaXMuc2xpY2VzW3YgKiB0aGlzLmhTbGljZSArIGhdO1xuICAgICAgICAgICAgc2xpY2UuZm9jdXNlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2xpY2U7XG4gICAgfVxuXG4gICAgcmVhZHkoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0YWdlRWwuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3N0YWdlLmpzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0YWdlLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi8uLi9ub2RlX21vZHVsZXMvLjAuMTMuMUBzdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vc3RhZ2UuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvaW5kZXguanMhLi9zdGFnZS5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3N0YWdlLmNzc1xuLy8gbW9kdWxlIGlkID0gMTIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIjc3RhZ2Uge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHRvcDogMDtcXG4gICAgLXdlYmtpdC10cmFuZm9ybTogdHJhbnNsYXRlWig5cHgpO1xcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMjUuMEBjc3MtbG9hZGVyIS4vc3JjL3N0YWdlLmNzc1xuLy8gbW9kdWxlIGlkID0gMTIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7XG4gICAgd2luLFxuICAgIGRvYyxcbiAgICBQcm9taXNlLFxuICAgIGRlZmVyLFxuICAgIGxvYWRJbWcsXG4gICAgcXVlcnksXG4gICAgcXVlcnlBbGwsXG4gICAgZ2V0UmVjdFxufSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgY2xhc3MgQ2FudmFzSW1hZ2Uge1xuICAgIGNvbnN0cnVjdG9yKGNhbnZhcywgd2lkdGgsIGhlaWdodCkge1xuICAgICAgICBpZiAoIShjYW52YXMgaW5zdGFuY2VvZiBIVE1MQ2FudmFzRWxlbWVudCkpIHtcbiAgICAgICAgICAgIGhlaWdodCA9IHdpZHRoO1xuICAgICAgICAgICAgd2lkdGggPSBjYW52YXM7XG4gICAgICAgICAgICBjYW52YXMgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXMgfHwgZG9jLmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMucmVuZGVyID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgdGhpcy5faW1hZ2U7XG4gICAgfVxuXG4gICAgZ2V0IGltYWdlKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2ltYWdlKSB7XG4gICAgICAgICAgICB0aGlzLl9pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2Uuc3JjID0gdGhpcy5jYW52YXMudG9EYXRhVVJMKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2ltYWdlO1xuICAgIH1cblxuICAgIGRyYXcocGFyYW1zKSB7XG4gICAgICAgIGNvbnN0IGxvYWRlZCA9IHBhcmFtcy5tYXAocGFyYW0gPT4ge1xuICAgICAgICAgICAgY29uc3QgZGVmZXJyZWQgPSBkZWZlcigpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocGFyYW0uaW1nKSB7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShwYXJhbSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtLnNyYykge1xuICAgICAgICAgICAgICAgIGNvbnN0IFtpbWcsIHByb21pc2VdID0gbG9hZEltZyhwYXJhbS5zcmMpO1xuICAgICAgICAgICAgICAgIHBhcmFtLmltZyA9IGltZztcbiAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oKCkgPT4gZGVmZXJyZWQucmVzb2x2ZShwYXJhbSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHBhcmFtKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChsb2FkZWQpXG4gICAgICAgICAgICAudGhlbihwYXJhbXMgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyLmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG5cbiAgICAgICAgICAgICAgICBwYXJhbXMuZm9yRWFjaChwYXJhbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFyZ3MgPSBbcGFyYW0uaW1nXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW0uc3ggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHBhcmFtLnN4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW0uc3ggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHBhcmFtLnN5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW0uc3cgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHBhcmFtLnN3KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW0uc2ggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHBhcmFtLnNoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwYXJhbS54LCBwYXJhbS55KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW0ud2lkdGggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKHBhcmFtLndpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW0uaGVpZ2h0ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChwYXJhbS5oZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlci5kcmF3SW1hZ2UoLi4uYXJncyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTsgXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2FudmFzUmVuZGVyIHtcbiAgICBjb25zdHJ1Y3RvcihjYW52YXMsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IG5ldyBDYW52YXNJbWFnZShjYW52YXMsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB0aGlzLl9vZmZzY3JlZW4gPSBuZXcgQ2FudmFzSW1hZ2Uod2lkdGgsIGhlaWdodCk7IFxuICAgIH1cblxuICAgIGdldCBjYW52YXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aXNpYmxlLmNhbnZhcztcbiAgICB9XG5cbiAgICBnZXQgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlzaWJsZS5yZW5kZXI7XG4gICAgfVxuXG4gICAgZ2V0IGltYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlzaWJsZS5pbWFnZTtcbiAgICB9XG5cbiAgICBnZXQgb2Zmc2NyZWVuQ2FudmFzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb2Zmc2NyZWVuLmNhbnZhcztcbiAgICB9XG5cbiAgICBnZXQgb2Zmc2NyZWVuUmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb2Zmc2NyZWVuLnJlbmRlcjtcbiAgICB9XG5cbiAgICBnZXQgb2Zmc2NyZWVuSW1hZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vZmZzY3JlZW4uaW1hZ2U7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jYW52YXMuanMiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9pc0l0ZXJhYmxlMiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL2lzLWl0ZXJhYmxlXCIpO1xuXG52YXIgX2lzSXRlcmFibGUzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNJdGVyYWJsZTIpO1xuXG52YXIgX2dldEl0ZXJhdG9yMiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL2dldC1pdGVyYXRvclwiKTtcblxudmFyIF9nZXRJdGVyYXRvcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXRJdGVyYXRvcjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7XG4gICAgdmFyIF9hcnIgPSBbXTtcbiAgICB2YXIgX24gPSB0cnVlO1xuICAgIHZhciBfZCA9IGZhbHNlO1xuICAgIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfaSA9ICgwLCBfZ2V0SXRlcmF0b3IzLmRlZmF1bHQpKGFyciksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2QgPSB0cnVlO1xuICAgICAgX2UgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBfYXJyO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH0gZWxzZSBpZiAoKDAsIF9pc0l0ZXJhYmxlMy5kZWZhdWx0KShPYmplY3QoYXJyKSkpIHtcbiAgICAgIHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xuICAgIH1cbiAgfTtcbn0oKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheS5qc1xuLy8gbW9kdWxlIGlkID0gMTI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL2lzLWl0ZXJhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUnKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gMTI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGNsYXNzb2YgICA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKVxuICAsIElURVJBVE9SICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5pc0l0ZXJhYmxlID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgTyA9IE9iamVjdChpdCk7XG4gIHJldHVybiBPW0lURVJBVE9SXSAhPT0gdW5kZWZpbmVkXG4gICAgfHwgJ0BAaXRlcmF0b3InIGluIE9cbiAgICB8fCBJdGVyYXRvcnMuaGFzT3duUHJvcGVydHkoY2xhc3NvZihPKSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5pcy1pdGVyYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gMTI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDEyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3InKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDEzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgZ2V0ICAgICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3IgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBpdGVyRm4gPSBnZXQoaXQpO1xuICBpZih0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIHJldHVybiBhbk9iamVjdChpdGVyRm4uY2FsbChpdCkpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgJ1RZUEUnOiB7XG4gICAgICAgICdzaW5nbGUnOiAxLFxuICAgICAgICAnc3RhdGljJzogMixcbiAgICAgICAgJ2R5bmFtaWMnOiAzXG4gICAgfSxcbiAgICAnMic6IHtcbiAgICAgICAgdHlwZTogMlxuICAgIH0sXG4gICAgJzgnOiB7XG4gICAgICAgIHR5cGU6IDJcbiAgICB9LMKgXG4gICAgJzEwJzoge1xuICAgICAgICBkaXN0YW5jZTogJzUwMDDlhYnlubQnLFxuICAgICAgICB0eXBlOiAyXG4gICAgfSxcbiAgICAnMTgnOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnNDUw5YWJ5bm0JyxcbiAgICAgICAgdHlwZTogMlxuICAgIH0sXG4gICAgJzIxJzoge1xuICAgICAgICB5MTogMTMzNCxcbiAgICAgICAgeTI6IDAsXG4gICAgICAgIHR5cGU6IDMsXG4gICAgICAgIGNvaW5YOiAzNjAsXG4gICAgICAgIGNvaW5ZOiAyMDBcbiAgICB9LFxuICAgICcyMyc6IHtcbiAgICAgICAgZGlzdGFuY2U6ICcxNDAw5YWJ5bm0JyxcbiAgICAgICAgeTE6IDEzMzQsXG4gICAgICAgIHkyOiAwLFxuICAgICAgICB0eXBlOiAzLFxuICAgICAgICBjb2luWDogMzYwLFxuICAgICAgICBjb2luWTogMjAwXG4gICAgfSxcbiAgICAnMjgnOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnOTgw5YWJ5bm0JyxcbiAgICAgICAgeTE6IDEzMzQsXG4gICAgICAgIHkyOiAwLFxuICAgICAgICB0eXBlOiAzLFxuICAgICAgICBjb2luWDogMzYwLFxuICAgICAgICBjb2luWTogMjAwXG4gICAgfSxcbiAgICAnMzEnOiB7XG4gICAgICAgIHkxOiAxMzM0LFxuICAgICAgICB5MjogMCxcbiAgICAgICAgdHlwZTogMyxcbiAgICAgICAgY29pblg6IDM2MCxcbiAgICAgICAgY29pblk6IDIwMFxuICAgIH0sXG4gICAgJzM0Jzoge1xuICAgICAgICB5MTogMTMzNCxcbiAgICAgICAgeTI6IDAsXG4gICAgICAgIHR5cGU6IDMsXG4gICAgICAgIGNvaW5YOiAzNjAsXG4gICAgICAgIGNvaW5ZOiAyMDBcbiAgICB9LFxuICAgICczOCc6IHtcbiAgICAgICAgZGlzdGFuY2U6ICc0MDAw5YWJ5bm0JyxcbiAgICAgICAgdHlwZTogMVxuICAgIH0sXG4gICAgJzQxJzoge1xuICAgICAgICB5MTogMTMzNCxcbiAgICAgICAgeTI6IDAsXG4gICAgICAgIHR5cGU6IDMsXG4gICAgICAgIGNvaW5YOiAzNjAsXG4gICAgICAgIGNvaW5ZOiAyMDBcbiAgICB9LFxuICAgICc0NCc6IHtcbiAgICAgICAgZGlzdGFuY2U6ICc0MDDlhYnlubQnLFxuICAgICAgICB5MTogMTMzNCxcbiAgICAgICAgeTI6IDAsXG4gICAgICAgIHR5cGU6IDMsXG4gICAgICAgIGNvaW5YOiAzNjAsXG4gICAgICAgIGNvaW5ZOiAyMDBcbiAgICB9LFxuICAgICc0Nic6IHtcbiAgICAgICAgZGlzdGFuY2U6ICc4LjblhYnlubQnLFxuICAgICAgICB5MTogMTMzNCxcbiAgICAgICAgeTI6IDAsXG4gICAgICAgIHR5cGU6IDMsXG4gICAgICAgIGNvaW5YOiAzNjAsXG4gICAgICAgIGNvaW5ZOiAyMDBcbiAgICB9LFxuICAgICc0OSc6IHtcbiAgICAgICAgZGlzdGFuY2U6ICcyNS4wNOWFieW5tCcsXG4gICAgICAgIHR5cGU6IDJcbiAgICB9LFxuICAgICc1Nic6IHtcbiAgICAgICAgZGlzdGFuY2U6ICc0LjIy5YWJ5bm0JyxcbiAgICAgICAgdHlwZTogMlxuICAgIH0sXG4gICAgJzU5Jzoge1xuICAgICAgICBkaXN0YW5jZTogJzE2LjflhYnlubQnLFxuICAgICAgICB0eXBlOiAyXG4gICAgfSxcbiAgICAnNjEnOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnMjAuNOWFieW5tCcsXG4gICAgICAgIHR5cGU6IDJcbiAgICB9LFxuICAgICc2NCc6IHtcbiAgICAgICAgZGlzdGFuY2U6ICcxMDcuNzEy5Lq/5YWs6YeMJyxcbiAgICAgICAgdHlwZTogMlxuICAgIH0sXG4gICAgJzY3Jzoge1xuICAgICAgICB0eXBlOiAyXG4gICAgfSxcbiAgICAnNjknOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnMTAxLjcyOOS6v+WFrOmHjCcsXG4gICAgICAgIHkxOiAxMzM0LFxuICAgICAgICB5MjogMCxcbiAgICAgICAgdHlwZTogMyxcbiAgICAgICAgY29pblg6IDM2MCxcbiAgICAgICAgY29pblk6IDIwMFxuICAgIH0sXG4gICAgJzc0Jzoge1xuICAgICAgICBkaXN0YW5jZTogJzU55Lq/5YWs6YeMJyxcbiAgICAgICAgeTE6IDEzMzQsXG4gICAgICAgIHkyOiAwLFxuICAgICAgICB0eXBlOiAzLFxuICAgICAgICBjb2luWDogMzYwLFxuICAgICAgICBjb2luWTogMjAwXG4gICAgfSxcbiAgICAnNzYnOiB7XG4gICAgICAgIHkxOiAxMzM0LFxuICAgICAgICB5MjogMCxcbiAgICAgICAgdHlwZTogMyxcbiAgICAgICAgY29pblg6IDM2MCxcbiAgICAgICAgY29pblk6IDIwMFxuICAgIH0sXG4gICAgJzc5Jzoge1xuICAgICAgICBkaXN0YW5jZTogJzQzLjXkur/lhazph4wnLFxuICAgICAgICB0eXBlOiAyXG4gICAgfSxcbiAgICAnODInOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnMjcuMTnkur/lhazph4wnLFxuICAgICAgICB5MTogMTMzNCxcbiAgICAgICAgeTI6IDAsXG4gICAgICAgIHR5cGU6IDMsXG4gICAgICAgIGNvaW5YOiAzNjAsXG4gICAgICAgIGNvaW5ZOiAyMDBcbiAgICB9LFxuICAgICc4NCc6IHtcbiAgICAgICAgeTE6IDEzMzQsXG4gICAgICAgIHkyOiAwLFxuICAgICAgICB0eXBlOiAzLFxuICAgICAgICBjb2luWDogMzYwLFxuICAgICAgICBjb2luWTogMjAwXG4gICAgfSxcbiAgICAnODcnOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnMTIuOOS6v+WFrOmHjCcsXG4gICAgICAgIHkxOiAxMzM0LFxuICAgICAgICB5MjogMCxcbiAgICAgICAgdHlwZTogMyxcbiAgICAgICAgY29pblg6IDM2MCxcbiAgICAgICAgY29pblk6IDIwMFxuICAgIH0sXG4gICAgJzkxJzoge1xuICAgICAgICB0eXBlOiAxXG4gICAgfSxcbiAgICAnOTQnOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnMS40OTbkur/lhazph4wnLFxuICAgICAgICB5MTogMTMzNCxcbiAgICAgICAgeTI6IDAsXG4gICAgICAgIHR5cGU6IDMsXG4gICAgICAgIGNvaW5YOiAzNjAsXG4gICAgICAgIGNvaW5ZOiAyMDBcbiAgICB9LFxuICAgICc5Nyc6IHtcbiAgICAgICAgdHlwZTogMVxuICAgIH0sXG4gICAgJzk5Jzoge1xuICAgICAgICB0eXBlOiAyXG4gICAgfSxcbiAgICAnMTAyJzoge1xuICAgICAgICBkaXN0YW5jZTogJzAuOTLkur/lhazph4wnLFxuICAgICAgICB0eXBlOiAyXG4gICAgfSxcbiAgICAnMTA1Jzoge1xuICAgICAgICBkaXN0YW5jZTogJzYuM+S6v+WFrOmHjCcsXG4gICAgICAgIHkxOiAxMzM0LFxuICAgICAgICB5MjogMCxcbiAgICAgICAgdHlwZTogMyxcbiAgICAgICAgY29pblg6IDM2MCxcbiAgICAgICAgY29pblk6IDIwMFxuICAgIH0sXG4gICAgJzExMyc6IHtcbiAgICAgICAgZGlzdGFuY2U6ICc0MTUw5LiH5YWs6YeMJyxcbiAgICAgICAgeTE6IDEzMzQsXG4gICAgICAgIHkyOiAwLFxuICAgICAgICB0eXBlOiAzLFxuICAgICAgICBjb2luWDogMzYwLFxuICAgICAgICBjb2luWTogMjAwXG4gICAgfSxcbiAgICAnMTE1Jzoge1xuICAgICAgICB0eXBlOiAyXG4gICAgfSxcbiAgICAnMTE4Jzoge1xuICAgICAgICBkaXN0YW5jZTogJzU1MDDkuIflhazph4wnLFxuICAgICAgICB5MTogMTMzNCxcbiAgICAgICAgeTI6IDAsXG4gICAgICAgIHR5cGU6IDMsXG4gICAgICAgIGNvaW5YOiAzNjAsXG4gICAgICAgIGNvaW5ZOiAyMDBcbiAgICB9LFxuICAgICcxMjAnOiB7XG4gICAgICAgIHR5cGU6IDEsXG4gICAgICAgIGlzRWFydGg6IHRydWVcbiAgICB9LFxuICAgICcxMjEnOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnMOWFrOmHjCcsXG4gICAgICAgIHkxOiAxMzM0LFxuICAgICAgICB5MjogMCxcbiAgICAgICAgdHlwZTogMyxcbiAgICAgICAgY29pblg6IDM2MCxcbiAgICAgICAgY29pblk6IDIwMCxcbiAgICAgICAgaXNFYXJ0aDogdHJ1ZVxuICAgIH0sXG4gICAgJzEyMic6IHtcbiAgICAgICAgdHlwZTogMSxcbiAgICAgICAgaXNFYXJ0aDogdHJ1ZVxuICAgIH0sXG4gICAgJzEyMyc6IHtcbiAgICAgICAgZGlzdGFuY2U6ICczOC40NOWFrOmHjCcsXG4gICAgICAgIHkxOiAxMzM0LFxuICAgICAgICB5MjogMCxcbiAgICAgICAgdHlwZTogMyxcbiAgICAgICAgY29pblg6IDM2MCxcbiAgICAgICAgY29pblk6IDIwMFxuICAgIH0sXG4gICAgJzEyNSc6IHtcbiAgICAgICAgdHlwZTogMlxuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2xpY2VDb25maWcuanMiLCJpbXBvcnQgJy4vaGVsbG93b3JsZC5jc3MnO1xuaW1wb3J0IHtcbiAgICB3aW4sXG4gICAgZG9jLFxuICAgIFByb21pc2UsXG4gICAgZGVmZXIsXG4gICAgcXVlcnksXG4gICAgcXVlcnlBbGwsXG4gICAgZ2V0UmVjdFxufSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWxsb1dvcmxkIHtcbiAgICBjb25zdHJ1Y3Rvcih2aWV3cG9ydCwgaXRlbXMpIHtcbiAgICAgICAgdGhpcy53cmFwRWwgPSBxdWVyeSh2aWV3cG9ydCwgJyNoZWxsb3dvcmxkJyk7XG4gICAgICAgIHRoaXMud3JhcEVsLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtpdGVtc1snaGVsbG93b3JsZCddLnNyY30pYDtcbiAgICB9XG5cbiAgICBwbGF5KCkge1xuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IDQwMDtcbiAgICAgICAgY29uc3QgY291bnQgPSA2O1xuXG4gICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgZWxhcHNlZCxcbiAgICAgICAgICAgIGRlbHRhXG4gICAgICAgIH0pID0+IHtcbiAgICAgICAgICAgIGlmIChlbGFwc2VkIDw9IGR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBwYXJzZUludChjb3VudCAqIGVsYXBzZWQgLyBkdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwRWwuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uWCA9IGAtJHtpbmRleCAqIDEwfXJlbWA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcEVsLnN0eWxlLmJhY2tncm91bmRQb3NpdGlvblggPSAnMCc7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZW5kaW5nKCkge1xuICAgICAgICB0aGlzLndyYXBFbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cblxuICAgIHJlYWR5KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy53cmFwRWwuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2hlbGxvV29ybGQuanMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vaGVsbG93b3JsZC5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjEzLjFAc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL2hlbGxvd29ybGQuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvaW5kZXguanMhLi9oZWxsb3dvcmxkLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvaGVsbG93b3JsZC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDEzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiI2hlbGxvd29ybGQge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIGNlbnRlcjtcXG4gICAgYmFja2dyb3VuZC1zaXplOiA2MHJlbSAxNy43ODZyZW07XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgLXdlYmtpdC10cmFuZm9ybTogdHJhbnNsYXRlWig5OTk5cHgpO1xcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMjUuMEBjc3MtbG9hZGVyIS4vc3JjL2hlbGxvd29ybGQuY3NzXG4vLyBtb2R1bGUgaWQgPSAxMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtcbiAgICB3aW4sXG4gICAgZG9jLFxuICAgIFByb21pc2UsXG4gICAgZGVmZXIsXG4gICAgaW1nMkNhbnZhcyxcbiAgICBxdWVyeSxcbiAgICBxdWVyeUFsbCxcbiAgICBnZXRSZWN0LFxuICAgIGdldERpc3RhbmNlXG59IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQge1xuICAgIENhbnZhc0ltYWdlXG59IGZyb20gJy4vY2FudmFzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xvdWQgZXh0ZW5kcyBDYW52YXNJbWFnZSB7XG4gICAgY29uc3RydWN0b3Ioc3RhZ2UsIGl0ZW1zKSB7XG4gICAgICAgIHN1cGVyKHN0YWdlLnZ3LCBzdGFnZS52aCk7XG5cbiAgICAgICAgdGhpcy5oU2xpY2UgPSBzdGFnZS5oU2xpY2U7XG4gICAgICAgIHRoaXMudlNsaWNlID0gc3RhZ2UudlNsaWNlO1xuICAgICAgICB0aGlzLnNsaWNlV2lkdGggPSBzdGFnZS5zbGljZVdpZHRoO1xuICAgICAgICB0aGlzLnNsaWNlSGVpZ2h0ID0gc3RhZ2Uuc2xpY2VIZWlnaHQ7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBpdGVtcztcbiAgICB9XG5cbiAgICBkcmF3SW1hZ2VzKGhvdmVycywgZm9jdXMsIHNjcm9sbFgsIHNjcm9sbFkpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gW107XG4gICAgICAgIGNvbnN0IGlkcyA9IFtdO1xuICAgICAgICBjb25zdCBzY2FsZSA9IDAuNDtcblxuICAgICAgICBjb25zdCBwdXNoUGFyYW1zID0gaWQgPT4ge1xuICAgICAgICAgICAgaWYgKGlkcy5pbmRleE9mKGlkKSA8IDBcbiAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5zbGljZXNbaWRdKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgICAgICB4LFxuICAgICAgICAgICAgICAgICAgICB5LFxuICAgICAgICAgICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBjYW52YXNcbiAgICAgICAgICAgICAgICB9ID0gdGhpcy5zbGljZXNbaWRdO1xuXG4gICAgICAgICAgICAgICAgcGFyYW1zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB4OiB4IC0gd2lkdGggKiBzY2FsZSAvIDIgLSBzY3JvbGxYLFxuICAgICAgICAgICAgICAgICAgICB5OiB5IC0gaGVpZ2h0ICogc2NhbGUgLyAyIC0gc2Nyb2xsWSxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoICogKDEgKyBzY2FsZSksXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0ICogKDEgKyBzY2FsZSksXG4gICAgICAgICAgICAgICAgICAgIGltZzogY2FudmFzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZHMucHVzaChpZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaG92ZXJzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGhvdmVyIG9mIGhvdmVycykge1xuICAgICAgICAgICAgICAgIHB1c2hQYXJhbXMoU3RyaW5nKGhvdmVyLmluZGV4KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZm9jdXMpIHtcbiAgICAgICAgICAgIGlmIChmb2N1cy5oIDwgdGhpcy5oU2xpY2UgLSAxKSB7XG4gICAgICAgICAgICAgICAgcHVzaFBhcmFtcyhmb2N1cy5pbmRleCArIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZm9jdXMuaCA+IDEpIHtcbiAgICAgICAgICAgICAgICBwdXNoUGFyYW1zKGZvY3VzLmluZGV4IC0gMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChmb2N1cy52IDwgdGhpcy52U2xpY2UgLSAxKSB7XG4gICAgICAgICAgICAgICAgcHVzaFBhcmFtcyhmb2N1cy5pbmRleCArIHRoaXMuaFNsaWNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGZvY3VzLnYgPiAxKSB7XG4gICAgICAgICAgICAgICAgcHVzaFBhcmFtcyhmb2N1cy5pbmRleCAtIHRoaXMuaFNsaWNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZHJhdyhwYXJhbXMpO1xuICAgIH1cblxuICAgIGNsZWFyKGZvY3VzKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGNsZWFyZWQsXG4gICAgICAgICAgICBpbmRleFxuICAgICAgICB9ID0gZm9jdXM7XG5cbiAgICAgICAgY29uc3Qgc2xpY2UgPSB0aGlzLnNsaWNlc1tTdHJpbmcoaW5kZXgpXTtcblxuICAgICAgICBpZiAoc2xpY2UpIHtcbiAgICAgICAgICAgIGxldCB7XG4gICAgICAgICAgICAgICAgaW1nLFxuICAgICAgICAgICAgICAgIHJlbmRlclxuICAgICAgICAgICAgfSA9IHNsaWNlO1xuXG4gICAgICAgICAgICBpZiAoIWNsZWFyZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkdXJhdGlvbiA9IDEwMDA7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKHtcbiAgICAgICAgICAgICAgICAgICAgZGVsdGEsXG4gICAgICAgICAgICAgICAgICAgIGVsYXBzZWRcbiAgICAgICAgICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGFwc2VkIDw9IGR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXIuZ2xvYmFsQWxwaGEgLT0gZGVsdGEgLyBkdXJhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlci5nbG9iYWxBbHBoYSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1cy5jbGVhcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZW5kZXIuY2xlYXJSZWN0KDAsIDAsIHRoaXMuc2xpY2VXaWR0aCwgdGhpcy5zbGljZUhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlci5kcmF3SW1hZ2UoaW1nLCAwLCAwLCB0aGlzLnNsaWNlV2lkdGgsIHRoaXMuc2xpY2VIZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm9jdXMuY2xlYXJlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZWFkeSgpIHtcbiAgICAgICAgdGhpcy5zbGljZXMgPSB7fTtcblxuICAgICAgICBjb25zdCBpbWcgPSB0aGlzLml0ZW1zWydjbG91ZCddLm9iajtcblxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSB0aGlzLmhTbGljZSAqIHRoaXMudlNsaWNlOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHggPSAoaSAtIDEpICUgdGhpcy5oU2xpY2U7XG4gICAgICAgICAgICBjb25zdCB5ID0gcGFyc2VJbnQoKGkgLSAxKSAvIHRoaXMuaFNsaWNlKTtcbiAgICAgICAgICAgIGNvbnN0IFtjYW52YXMsIHJlbmRlcl0gPSBpbWcyQ2FudmFzKGltZywgdGhpcy5zbGljZVdpZHRoLCB0aGlzLnNsaWNlSGVpZ2h0KTtcblxuICAgICAgICAgICAgdGhpcy5zbGljZXNbU3RyaW5nKGkgLSAxKV0gPSB7XG4gICAgICAgICAgICAgICAgaW1nLFxuICAgICAgICAgICAgICAgIGNhbnZhcyxcbiAgICAgICAgICAgICAgICByZW5kZXIsXG4gICAgICAgICAgICAgICAgeDogeCAqIHRoaXMuc2xpY2VXaWR0aCxcbiAgICAgICAgICAgICAgICB5OiB5ICogdGhpcy5zbGljZUhlaWdodCxcbiAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy5zbGljZVdpZHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodDogdGhpcy5zbGljZUhlaWdodFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY2xvdWQuanMiLCJpbXBvcnQge1xuICAgIHdpbixcbiAgICBkb2MsXG4gICAgUHJvbWlzZSxcbiAgICBkZWZlcixcbiAgICBxdWVyeSxcbiAgICBxdWVyeUFsbCxcbiAgICBnZXRSZWN0XG59IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQge1xuICAgIENhbnZhc0ltYWdlXG59IGZyb20gJy4vY2FudmFzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhciBleHRlbmRzIENhbnZhc0ltYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihzdGFnZSwgaXRlbXMpIHtcbiAgICAgICAgc3VwZXIoc3RhZ2UudncsIHN0YWdlLnZoICogMik7XG4gICAgICAgIFxuICAgICAgICB0aGlzLndpZHRoID0gc3RhZ2Uudnc7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gc3RhZ2UudmggKiAyO1xuICAgICAgICB0aGlzLnZ3ID0gc3RhZ2Uudnc7XG4gICAgICAgIHRoaXMudmggPSBzdGFnZS52aDtcbiAgICAgICAgdGhpcy5pdGVtcyA9IGl0ZW1zO1xuICAgIH1cblxuICAgIHJlYWR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kcmF3KFt7XG4gICAgICAgICAgICBpbWc6IHRoaXMuaXRlbXNbJ3N0YXInXS5vYmosXG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnZoXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGltZzogdGhpcy5pdGVtc1snc3RhciddLm9iaixcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiB0aGlzLnZoLFxuICAgICAgICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMudmhcbiAgICAgICAgfV0pO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc3Rhci5qcyIsImltcG9ydCAqIGFzIEJlemllciBmcm9tICdhbWZlLWN1YmljYmV6aWVyJztcbmltcG9ydCB7XG4gICAgd2luLFxuICAgIGRvYyxcbiAgICBQcm9taXNlLFxuICAgIGRlZmVyLFxuICAgIGRlbGF5LFxuICAgIHF1ZXJ5LFxuICAgIHF1ZXJ5QWxsLFxuICAgIGdldFJlY3QsXG4gICAgZ2V0RGlzdGFuY2UsXG4gICAgYXBwZW5kU3R5bGUsXG4gICAgcmFmLFxuICAgIGNhZlxufSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IEV2ZW50IGZyb20gJy4vZXZlbnQnO1xuaW1wb3J0IHtcbiAgICBDYW52YXNJbWFnZVxufSBmcm9tICcuL2NhbnZhcyc7XG5cbmNvbnN0IG9yaWdpblNsaWNlV2lkdGggPSA3NTA7XG5jb25zdCBvcmlnaW5TbGljZUhlaWdodCA9IDEzMzRcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWxlbWVudHMgZXh0ZW5kcyBDYW52YXNJbWFnZSB7XG4gICAgY29uc3RydWN0b3Ioc3RhZ2UsIGl0ZW1zKSB7XG4gICAgICAgIHN1cGVyKHN0YWdlLnZ3LCBzdGFnZS52aCk7XG5cbiAgICAgICAgdGhpcy5oU2xpY2UgPSBzdGFnZS5oU2xpY2U7XG4gICAgICAgIHRoaXMudlNsaWNlID0gc3RhZ2UudlNsaWNlO1xuICAgICAgICB0aGlzLnNsaWNlV2lkdGggPSBzdGFnZS5zbGljZVdpZHRoO1xuICAgICAgICB0aGlzLnNsaWNlSGVpZ2h0ID0gc3RhZ2Uuc2xpY2VIZWlnaHQ7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBpdGVtcztcbiAgICAgICAgdGhpcy5zY2FsZVJhdGlvID0gdGhpcy5zbGljZVdpZHRoIC8gb3JpZ2luU2xpY2VXaWR0aDtcbiAgICB9XG5cbiAgICBzaG93VGV4dChmb2N1cykge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBzaG93bixcbiAgICAgICAgICAgIGluZGV4XG4gICAgICAgIH0gPSBmb2N1cztcblxuICAgICAgICBjb25zdCBzbGljZSA9IHRoaXMuc2xpY2VzW1N0cmluZyhpbmRleCldO1xuICAgICAgICBpZiAoc2xpY2UpIHtcbiAgICAgICAgICAgIGlmIChzaG93biA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGVsYXkgPSAxNTAwO1xuICAgICAgICAgICAgICAgIGNvbnN0IGR1cmF0aW9uID0gMTAwMDtcblxuICAgICAgICAgICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgICAgICAgICBkZWx0YSxcbiAgICAgICAgICAgICAgICAgICAgZWxhcHNlZFxuICAgICAgICAgICAgICAgIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsYXBzZWQgPD0gZGVsYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNlLnRleHRBbHBoYSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1cy5zaG93biA9IDE7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxhcHNlZCAtIGRlbGF5IDw9IGR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGljZS50ZXh0QWxwaGEgPSAoZWxhcHNlZCAtIGRlbGF5KSAvIGR1cmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXMuc2hvd24gPSAxO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2UudGV4dEFscGhhID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzLnNob3duID0gMjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmb2N1cy5zaG93biA9PT0gMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93R29sZChmb2N1cykge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBmb3VuZCxcbiAgICAgICAgICAgIGluZGV4LFxuICAgICAgICAgICAgeTEsXG4gICAgICAgICAgICB5MlxuICAgICAgICB9ID0gZm9jdXM7XG5cbiAgICAgICAgY29uc3Qgc2xpY2UgPSB0aGlzLnNsaWNlc1tTdHJpbmcoaW5kZXgpXTtcbiAgICAgICAgaWYgKHNsaWNlKSB7XG4gICAgICAgICAgICBpZiAoZm91bmQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGR1cmF0aW9uID0gMTAwMDtcblxuICAgICAgICAgICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgICAgICAgICBkZWx0YSxcbiAgICAgICAgICAgICAgICAgICAgZWxhcHNlZFxuICAgICAgICAgICAgICAgIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsYXBzZWQgPD0gZHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWNlLmdvbGRZID0geTEgKyAoeTIgLSB5MSkgKiBlbGFwc2VkIC8gZHVyYXRpb247XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1cy5mb3VuZCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGljZS5nb2xkWSA9IHkyO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXMuZm91bmQgPSAyO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvY3VzLmZvdW5kID09PSAyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZseUNvaW4oZm9jdXMpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgbm9Db2luLFxuICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICBjb2luWCxcbiAgICAgICAgICAgIGNvaW5ZXG4gICAgICAgIH0gPSBmb2N1cztcblxuICAgICAgICBjb25zdCBzbGljZSA9IHRoaXMuc2xpY2VzW1N0cmluZyhpbmRleCldO1xuICAgICAgICBpZiAoc2xpY2UpIHtcbiAgICAgICAgICAgIGlmICghbm9Db2luKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29pbiA9IHNsaWNlLmNvaW47XG4gICAgICAgICAgICAgICAgY29uc3QgZHVyYXRpb24gPSA1MDA7XG4gICAgICAgICAgICAgICAgY29uc3QgZW5kWCA9IDY1MDtcbiAgICAgICAgICAgICAgICBjb25zdCBlbmRZID0gNTA7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKHtcbiAgICAgICAgICAgICAgICAgICAgZGVsdGEsXG4gICAgICAgICAgICAgICAgICAgIGVsYXBzZWRcbiAgICAgICAgICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGFwc2VkIDw9IGR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwZXJjZW50ID0gZWxhcHNlZCAvIGR1cmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29pbi54ID0gY29pblggKyAoZW5kWCAtIGNvaW5YKSAqIHBlcmNlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2luLnkgPSBjb2luWSArIChlbmRZIC0gY29pblkpICogcGVyY2VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvaW4uc2NhbGUgKz0gZGVsdGEgLyBkdXJhdGlvbiAqIDU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2luLnNsb3cgLT0gZGVsdGEgLyBkdXJhdGlvbiAqIDU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2luLnggPSBlbmRYO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29pbi55ID0gZW5kWTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzLm5vQ29pbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm9jdXMubm9Db2luO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBkcmF3SW1hZ2VzKGhvdmVycywgZm9jdXMsIHNjcm9sbFgsIHNjcm9sbFksIGUpIHtcbiAgICAgICAgY29uc3QgcGFyYW1zID0gW107XG4gICAgICAgIGlmIChob3ZlcnMpIHtcbiAgICAgICAgICAgZm9yIChjb25zdCBob3ZlciBvZiBob3ZlcnMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgICAgICAgIGluZGV4LFxuICAgICAgICAgICAgICAgICAgICB5MSxcbiAgICAgICAgICAgICAgICAgICAgeTIsXG4gICAgICAgICAgICAgICAgICAgIGNvaW5YLFxuICAgICAgICAgICAgICAgICAgICBjb2luWSxcbiAgICAgICAgICAgICAgICAgICAgbm9Db2luLFxuICAgICAgICAgICAgICAgICAgICBpc0VhcnRoXG4gICAgICAgICAgICAgICAgfSA9IGhvdmVyO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgc2xpY2UgPSB0aGlzLnNsaWNlc1tTdHJpbmcoaW5kZXgpXTtcbiAgICAgICAgICAgICAgICBpZiAoc2xpY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgICAgICAgICAgeCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHksXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbnZhc0ltYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljSW1nLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dEltZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHRBbHBoYSA9IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBnb2xkSW1nLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29pbixcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsb3dcbiAgICAgICAgICAgICAgICAgICAgfSA9IHNsaWNlO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBvZmZzZXRZID0gMDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzRWFydGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldFkgPSBmbG93LnJhbmdlWzBdICsgKGZsb3cucmFuZ2VbMV0gLSBmbG93LnJhbmdlWzBdKSAqIGZsb3cuZWFzZShmbG93LmVsYXBzZWQgLyBmbG93LmR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmbG93LmVsYXBzZWQgPiBmbG93LmR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WSA9IGZsb3cucmFuZ2VbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxvdy5yYW5nZSA9IFtmbG93LnJhbmdlWzFdLCBmbG93LnJhbmdlWzBdXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbG93LmVhc2UgPSBmbG93LmVhc2UgPT09IEJlemllci5lYXNlSW4gPyBCZXppZXIuZWFzZU91dCA6IEJlemllci5lYXNlSW47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxvdy5lbGFwc2VkID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxvdy5lbGFwc2VkICs9IGUuZGVsdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYW52YXNJbWFnZS5yZW5kZXIuY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID49IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbnZhc0ltYWdlLnJlbmRlci5kcmF3SW1hZ2Uoc3RhdGljSW1nLCAwLCAwICsgb2Zmc2V0WSwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA+PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYW52YXNJbWFnZS5yZW5kZXIuc2F2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzSW1hZ2UucmVuZGVyLmdsb2JhbEFscGhhID0gdGV4dEFscGhhO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzSW1hZ2UucmVuZGVyLmRyYXdJbWFnZSh0ZXh0SW1nLCAwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbnZhc0ltYWdlLnJlbmRlci5yZXN0b3JlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA+PSAzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzbGljZS5nb2xkWSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZ29sZFkgPSBzbGljZS5nb2xkWTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB5ID0gZ29sZFkgKiB0aGlzLnNjYWxlUmF0aW87XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzSW1hZ2UucmVuZGVyLmRyYXdJbWFnZShnb2xkSW1nLCAwLCBnb2xkWSwgb3JpZ2luU2xpY2VXaWR0aCwgb3JpZ2luU2xpY2VIZWlnaHQgLSBnb2xkWSwgMCwgeSArIG9mZnNldFksIHdpZHRoLCBoZWlnaHQgLSB5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29pbnMubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmICFub0NvaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvdyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHggPSBjb2luWCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeSA9IGNvaW5ZXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSA9IGNvaW47XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG93ID0gc2xvdyA8IDEgPyAxIDogc2xvdztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZSA9IHNjYWxlID4gMTAgPyAxMCA6IHNjYWxlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29pbkltZyA9IHRoaXMuY29pbnNbcGFyc2VJbnQoaW5kZXggLyBzbG93KV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvaW5JbWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qge3dpZHRoLCBoZWlnaHR9ID0gY29pbkltZztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FudmFzSW1hZ2UucmVuZGVyLmRyYXdJbWFnZShjb2luSW1nLCB4ICogdGhpcy5zY2FsZVJhdGlvLCB5ICogdGhpcy5zY2FsZVJhdGlvLCB3aWR0aCAvIHNjYWxlLCBoZWlnaHQgLyBzY2FsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvaW4uaW5kZXggPSAoY29pbi5pbmRleCArIDEpICUgKHRoaXMuY29pbnMubGVuZ3RoICogc2xvdyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHggLSBzY3JvbGxYLFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogeSAtIHNjcm9sbFksXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGltZzogY2FudmFzSW1hZ2UuY2FudmFzXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZHJhdyhwYXJhbXMpO1xuICAgIH1cblxuICAgIHJlYWR5KCkge1xuICAgICAgICBjb25zdCBsb2FkZWQgPSBbXTtcbiAgICAgICAgdGhpcy5jb2lucyA9IFtdO1xuICAgICAgICB0aGlzLnNsaWNlcyA9IHt9O1xuXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuaXRlbXMpLmZpbHRlcihpZCA9PlxuICAgICAgICAgICAgaWQubWF0Y2goL15jb2luXFxkJC8pXG4gICAgICAgICkuZm9yRWFjaChpZCA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvaW5zLnB1c2godGhpcy5pdGVtc1tpZF0ub2JqKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5pdGVtcykuZmlsdGVyKGlkID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpZC5tYXRjaCgvXmlcXGQrXFwtZVxcLShzfHd8ZykvKTtcbiAgICAgICAgfSkuZm9yRWFjaChpZCA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5pdGVtc1tpZF07XG4gICAgICAgICAgICBjb25zdCBbLCBpbmRleCwgdHlwZV0gPSBpZC5tYXRjaCgvXmkoXFxkKylcXC1lXFwtKHN8d3xnKSQvKTtcblxuICAgICAgICAgICAgY29uc3QgeCA9IE51bWJlcihpbmRleCkgJSB0aGlzLmhTbGljZTtcbiAgICAgICAgICAgIGNvbnN0IHkgPSBwYXJzZUludChOdW1iZXIoaW5kZXgpIC8gdGhpcy5oU2xpY2UpO1xuICAgICAgICAgICAgbGV0IHNsaWNlID0gdGhpcy5zbGljZXNbU3RyaW5nKGluZGV4KV07XG4gICAgICAgICAgICBpZiAoIXNsaWNlKSB7XG4gICAgICAgICAgICAgICAgc2xpY2UgPSB0aGlzLnNsaWNlc1tTdHJpbmcoaW5kZXgpXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgY29pbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBzbG93OiA4LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGU6IDVcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZmxvdzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDgwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsYXBzZWQ6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZTogWzAsIDEwXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVhc2U6IEJlemllci5lYXNlSW5cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgY2FudmFzSW1hZ2U6IG5ldyBDYW52YXNJbWFnZSh0aGlzLnNsaWNlV2lkdGgsIHRoaXMuc2xpY2VIZWlnaHQpLFxuICAgICAgICAgICAgICAgICAgICB4OiB4ICogdGhpcy5zbGljZVdpZHRoLFxuICAgICAgICAgICAgICAgICAgICB5OiB5ICogdGhpcy5zbGljZUhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMuc2xpY2VXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnNsaWNlSGVpZ2h0LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdzJykge1xuICAgICAgICAgICAgICAgIHNsaWNlLnN0YXRpY0ltZyA9IGl0ZW0ub2JqO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAndycpIHtcbiAgICAgICAgICAgICAgICBzbGljZS50ZXh0SW1nID0gaXRlbS5vYmo7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdnJykge1xuICAgICAgICAgICAgICAgIHNsaWNlLmdvbGRJbWcgPSBpdGVtLm9iajtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKGxvYWRlZCk7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lbGVtZW50cy5qcyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5c1wiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gMTM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmtleXMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5rZXlzO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyAxOS4xLjIuMTQgT2JqZWN0LmtleXMoTylcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgJGtleXMgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2tleXMnLCBmdW5jdGlvbigpe1xuICByZXR1cm4gZnVuY3Rpb24ga2V5cyhpdCl7XG4gICAgcmV0dXJuICRrZXlzKHRvT2JqZWN0KGl0KSk7XG4gIH07XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gMTQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmdlbmVyYXRlID0gZ2VuZXJhdGU7XG5mdW5jdGlvbiBnZW5lcmF0ZShwMXgsIHAxeSwgcDJ4LCBwMnkpIHtcbiAgICB2YXIgWkVST19MSU1JVCA9IDFlLTY7XG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBwb2x5bm9taWFsIGNvZWZmaWNpZW50cyxcbiAgICAvLyBpbXBsaWNpdCBmaXJzdCBhbmQgbGFzdCBjb250cm9sIHBvaW50cyBhcmUgKDAsMCkgYW5kICgxLDEpLlxuICAgIHZhciBheCA9IDMgKiBwMXggLSAzICogcDJ4ICsgMTtcbiAgICB2YXIgYnggPSAzICogcDJ4IC0gNiAqIHAxeDtcbiAgICB2YXIgY3ggPSAzICogcDF4O1xuXG4gICAgdmFyIGF5ID0gMyAqIHAxeSAtIDMgKiBwMnkgKyAxO1xuICAgIHZhciBieSA9IDMgKiBwMnkgLSA2ICogcDF5O1xuICAgIHZhciBjeSA9IDMgKiBwMXk7XG5cbiAgICBmdW5jdGlvbiBzYW1wbGVDdXJ2ZURlcml2YXRpdmVYKHQpIHtcbiAgICAgICAgLy8gYGF4IHReMyArIGJ4IHReMiArIGN4IHQnIGV4cGFuZGVkIHVzaW5nIEhvcm5lciAncyBydWxlLlxuICAgICAgICByZXR1cm4gKDMgKiBheCAqIHQgKyAyICogYngpICogdCArIGN4O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNhbXBsZUN1cnZlWCh0KSB7XG4gICAgICAgIHJldHVybiAoKGF4ICogdCArIGJ4KSAqIHQgKyBjeCkgKiB0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNhbXBsZUN1cnZlWSh0KSB7XG4gICAgICAgIHJldHVybiAoKGF5ICogdCArIGJ5KSAqIHQgKyBjeSkgKiB0O1xuICAgIH1cblxuICAgIC8vIEdpdmVuIGFuIHggdmFsdWUsIGZpbmQgYSBwYXJhbWV0cmljIHZhbHVlIGl0IGNhbWUgZnJvbS5cbiAgICBmdW5jdGlvbiBzb2x2ZUN1cnZlWCh4KSB7XG4gICAgICAgIHZhciB0MiA9IHg7XG4gICAgICAgIHZhciBkZXJpdmF0aXZlO1xuICAgICAgICB2YXIgeDI7XG5cbiAgICAgICAgLy8gaHR0cHM6Ly90cmFjLndlYmtpdC5vcmcvYnJvd3Nlci90cnVuay9Tb3VyY2UvV2ViQ29yZS9wbGF0Zm9ybS9hbmltYXRpb25cbiAgICAgICAgLy8gRmlyc3QgdHJ5IGEgZmV3IGl0ZXJhdGlvbnMgb2YgTmV3dG9uJ3MgbWV0aG9kIC0tIG5vcm1hbGx5IHZlcnkgZmFzdC5cbiAgICAgICAgLy8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9OZXd0b24nc19tZXRob2RcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgICAgICAgIC8vIGYodCkteD0wXG4gICAgICAgICAgICB4MiA9IHNhbXBsZUN1cnZlWCh0MikgLSB4O1xuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHgyKSA8IFpFUk9fTElNSVQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZXJpdmF0aXZlID0gc2FtcGxlQ3VydmVEZXJpdmF0aXZlWCh0Mik7XG4gICAgICAgICAgICAvLyA9PSAwLCBmYWlsdXJlXG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhkZXJpdmF0aXZlKSA8IFpFUk9fTElNSVQpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHQyIC09IHgyIC8gZGVyaXZhdGl2ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZhbGwgYmFjayB0byB0aGUgYmlzZWN0aW9uIG1ldGhvZCBmb3IgcmVsaWFiaWxpdHkuXG4gICAgICAgIC8vIGJpc2VjdGlvblxuICAgICAgICAvLyBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Jpc2VjdGlvbl9tZXRob2RcbiAgICAgICAgdmFyIHQxID0gMTtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgdmFyIHQwID0gMDtcblxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICB0MiA9IHg7XG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgIHdoaWxlICh0MSA+IHQwKSB7XG4gICAgICAgICAgICB4MiA9IHNhbXBsZUN1cnZlWCh0MikgLSB4O1xuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHgyKSA8IFpFUk9fTElNSVQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoeDIgPiAwKSB7XG4gICAgICAgICAgICAgICAgdDEgPSB0MjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdDAgPSB0MjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHQyID0gKHQxICsgdDApIC8gMjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZhaWx1cmVcbiAgICAgICAgcmV0dXJuIHQyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNvbHZlKHgpIHtcbiAgICAgICAgcmV0dXJuIHNhbXBsZUN1cnZlWShzb2x2ZUN1cnZlWCh4KSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNvbHZlO1xufVxuXG52YXIgbGluZWFyID0gZXhwb3J0cy5saW5lYXIgPSBnZW5lcmF0ZSgwLCAwLCAxLCAxKTtcbnZhciBlYXNlID0gZXhwb3J0cy5lYXNlID0gZ2VuZXJhdGUoLjI1LCAuMSwgLjI1LCAxKTtcbnZhciBlYXNlSW4gPSBleHBvcnRzLmVhc2VJbiA9IGdlbmVyYXRlKC40MiwgMCwgMSwgMSk7XG52YXIgZWFzZU91dCA9IGV4cG9ydHMuZWFzZU91dCA9IGdlbmVyYXRlKDAsIDAsIC41OCwgMSk7XG52YXIgZWFzZUluT3V0ID0gZXhwb3J0cy5lYXNlSW5PdXQgPSBnZW5lcmF0ZSguNDIsIDAsIC41OCwgMSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjAuMEBhbWZlLWN1YmljYmV6aWVyL3NyYy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAnLi9mb3VuZC5jc3MnO1xuaW1wb3J0IHtcbiAgICB3aW4sXG4gICAgZG9jLFxuICAgIFByb21pc2UsXG4gICAgZGVmZXIsXG4gICAgZGVsYXksXG4gICAgcXVlcnksXG4gICAgcXVlcnlBbGwsXG4gICAgZ2V0UmVjdCxcbiAgICBnZXREaXN0YW5jZSxcbiAgICBhcHBlbmRTdHlsZSxcbiAgICByYWYsXG4gICAgY2FmXG59IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgRXZlbnQgZnJvbSAnLi9ldmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvdW5kIGV4dGVuZHMgRXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKHZpZXdwb3J0LCBpdGVtcykge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMud3JhcEVsID0gcXVlcnkodmlld3BvcnQsICcjZm91bmQnKTtcbiAgICAgICAgdGhpcy50ZXh0RWwgPSBxdWVyeSh0aGlzLndyYXBFbCwgJy50ZXh0Jyk7XG4gICAgICAgIHRoaXMudGV4dE51bWJlckVsID0gcXVlcnkodGhpcy50ZXh0RWwsICcubnVtYmVyJyk7XG4gICAgICAgIHRoaXMudGV4dFRpcEVsID0gcXVlcnkodGhpcy50ZXh0RWwsICcudGlwJyk7XG4gICAgICAgIHRoaXMudGV4dEJnRWwgPSBxdWVyeSh0aGlzLnRleHRFbCwgJy5iZycpO1xuICAgICAgICB0aGlzLmJhckVsID0gcXVlcnkodGhpcy53cmFwRWwsICcucHJvZ3Jlc3MgLmJhcicpO1xuICAgICAgICB0aGlzLmdvbGRFbCA9IHF1ZXJ5KHRoaXMud3JhcEVsLCAnLmdvbGQnKTsgXG5cbiAgICAgICAgdGhpcy5mb3VuZCA9IDA7XG4gICAgICAgIHRoaXMuYW1vdW50ID0gMDtcbiAgICAgICAgdGhpcy50b3RhbCA9IDA7XG4gICAgICAgIHRoaXMuZm9jdXMgPSAwO1xuICAgICAgICB0aGlzLml0ZW1zID0gaXRlbXM7XG4gICAgfVxuXG4gICAgdXBkYXRlKGFtb3VudCwgZm91bmQsIHRvdGFsLCBmb2N1cykge1xuICAgICAgICBpZiAoZm91bmQgIT09IHRoaXMuZm91bmQgXG4gICAgICAgICAgICB8fCBhbW91bnQgIT09IHRoaXMuYW1vdW50XG4gICAgICAgICAgICB8fCB0b3RhbCAhPT0gdGhpcy50b3RhbFxuICAgICAgICAgICAgfHwgZm9jdXMgIT09IHRoaXMuZm9jdXMpIHtcbiAgICAgICAgICAgIHRoaXMudGV4dE51bWJlckVsLnRleHRDb250ZW50ID0gYCR7Zm91bmR9LyR7YW1vdW50fWA7XG4gICAgICAgICAgICB0aGlzLmJhckVsLnN0eWxlLndpZHRoID0gYCR7Zm91bmQvYW1vdW50KjEwMH0lYDtcblxuICAgICAgICAgICAgaWYgKGZvdW5kICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCd1cGRhdGUnLCB7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kLFxuICAgICAgICAgICAgICAgICAgICBhbW91bnQsXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsLFxuICAgICAgICAgICAgICAgICAgICBmb2N1c1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmZvdW5kID0gZm91bmQ7XG4gICAgICAgICAgICB0aGlzLmFtb3VudCA9IGFtb3VudDtcbiAgICAgICAgICAgIHRoaXMudG90YWwgPSB0b3RhbDtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMgPSBmb2N1cztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlYWR5KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy53cmFwRWwuc3R5bGUuZGlzcGxheSA9ICcnO1xuXG4gICAgICAgICAgICBsZXQga2V5ZnJhbWVzID0gJyc7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLml0ZW1zKS5maWx0ZXIoaWQgPT5cbiAgICAgICAgICAgICAgICBpZC5tYXRjaCgvXmNvaW5cXGQkLylcbiAgICAgICAgICAgICkuZm9yRWFjaCgoaWQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5pdGVtc1tpZF07XG4gICAgICAgICAgICAgICAga2V5ZnJhbWVzICs9IGBcbiAgICAgICAgICAgICAgICAgICAgJHsxIC8gNiAqIGkgKiAxMDB9JSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtpdGVtLnNyY30pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYDtcblxuICAgICAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGtleWZyYW1lcyArPSBgXG4gICAgICAgICAgICAgICAgICAgICAgICAxMDAlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtpdGVtLnNyY30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBgOyAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGFwcGVuZFN0eWxlKGBcbiAgICAgICAgICAgICAgICBALXdlYmtpdC1rZXlmcmFtZXMgY29pbiB7XG4gICAgICAgICAgICAgICAgICAgICR7a2V5ZnJhbWVzfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGApO1xuXG4gICAgICAgICAgICB0aGlzLmdvbGRFbC5zdHlsZS53ZWJraXRBbmltYXRpb24gPSAnY29pbiAxcyBsaW5lYXIgMHMgaW5maW5pdGUnO1xuXG4gICAgICAgICAgICByZXNvbHZlKHRoaXMpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2ZvdW5kLmpzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL2ZvdW5kLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi8uLi9ub2RlX21vZHVsZXMvLjAuMTMuMUBzdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vZm91bmQuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvaW5kZXguanMhLi9mb3VuZC5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2ZvdW5kLmNzc1xuLy8gbW9kdWxlIGlkID0gMTQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIjZm91bmQge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHJpZ2h0OiAwLjczcmVtO1xcbiAgICB0b3A6IDAuNHJlbTtcXG4gICAgY29sb3I6ICMwMGRkZjE7XFxuICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICAgIC13ZWJraXQtYm94LXBhY2s6IGNlbnRlcjtcXG4gICAgLXdlYmtpdC1ib3gtYWxpZ246IGNlbnRlcjtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCBjZW50ZXI7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogMS4xMDZyZW0gMC40MTNyZW07XFxufVxcblxcbiNmb3VuZCAudGV4dFdyYXAge1xcbiAgICB3aWR0aDogMS4xMDZyZW07XFxuICAgIGhlaWdodDogMC40MTNyZW07XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQTBBQUFBZkNBWUFBQUE4OVVmc0FBQUFHWFJGV0hSVGIyWjBkMkZ5WlFCQlpHOWlaU0JKYldGblpWSmxZV1I1Y2NsbFBBQUFBTmRKUkVGVWVOcWNsRDBMZ1ZFWWhvK1A4bHFNTXNyTXJreGtOQ244TFlNZlFURVlTQmFUVWpJWlJjbGlVYVFNNU9OKzZvMUZieTUzWFowNmRYVytudk9FM1ByVWRNN0YzU2N0c1hRQkNYK1pxNHNvbFpLaVNDVkxSU1NvNUlrcWxTeDVrYUZTU0RUODhXZkprdlpYUkpMenorWlJLZUhmSnBJc0paR2lVa1RVcUdUSmloeVYzblZKSmF2TE1wVXNoZkFmV3h5YUVBUENWc3pJS2svUnRwRkljN0VoVjM0VlBmcTRJM0VrMGtHTWFjSGF0bTVFV29rRitZUVAwYUU5WWlwMlJMcUlQbTFoQTNFbTBsNU1hRnZ1aW51UTlCSmdBRnFOSWhVUGhaT0VBQUFBQUVsRlRrU3VRbUNDKTtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogcmlnaHQgY2VudGVyO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDAuMTczcmVtIDAuNDEzcmVtO1xcbiAgICBvdmVyZmxvdzogdmlzaWJsZTtcXG59XFxuXFxuI2ZvdW5kIC50ZXh0IHtcXG4gICAgd2lkdGg6IDEuM3JlbTtcXG4gICAgaGVpZ2h0OiAwLjVyZW07XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzAwZGRmMTtcXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICByaWdodDogMC4xN3JlbTtcXG4gICAgdG9wOiAtMC4xOHJlbTtcXG4gICAgYm94LXNoYWRvdzogMnB4IDNweCAwcHggcmdiYSgwLCAyMjEsIDI0MSwgMC41KTtcXG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC40cyBlYXNlLWluIDBzO1xcbiAgICBvdmVyZmxvdzogdmlzaWJsZTtcXG59XFxuXFxuI2ZvdW5kIC50ZXh0IC5udW1iZXIge1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAwO1xcbiAgICByaWdodDogMDtcXG4gICAgd2lkdGg6IDEuM3JlbTtcXG4gICAgaGVpZ2h0OiAwLjVyZW07XFxuICAgIGxpbmUtaGVpZ2h0OiAwLjVyZW07XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuI2ZvdW5kIC5wcm9ncmVzcyB7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIHdpZHRoOiAxLjhyZW07XFxuICAgIGhlaWdodDogMC4zcmVtO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjMDBkZGYxO1xcbiAgICBib3JkZXItcmFkaXVzOiAwLjE1cmVtO1xcbiAgICBtYXJnaW46IDAgNHB4O1xcbn1cXG5cXG4jZm91bmQgLnByb2dyZXNzIC5iYXJ7XFxuICAgIHdpZHRoOiAwO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMGRkZjE7XFxuICAgIGJvcmRlci1yYWRpdXM6IDAuMTVyZW07XFxufVxcblxcbiNmb3VuZCAuZ29sZCB7XFxuICAgIHdpZHRoOiAwLjY2N3JlbTtcXG4gICAgaGVpZ2h0OiAwLjY0cmVtO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4yNS4wQGNzcy1sb2FkZXIhLi9zcmMvZm91bmQuY3NzXG4vLyBtb2R1bGUgaWQgPSAxNDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICcuL21hcC5jc3MnO1xuaW1wb3J0IHtcbiAgICB3aW4sXG4gICAgZG9jLFxuICAgIFByb21pc2UsXG4gICAgcXVlcnksXG4gICAgcXVlcnlBbGwsXG4gICAgZ2V0UmVjdFxufSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IEV2ZW50IGZyb20gJy4vZXZlbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXAgZXh0ZW5kcyBFdmVudCB7XG4gICAgY29uc3RydWN0b3Iodmlld3BvcnQsIGhTbGljZSwgdlNsaWNlKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy52aWV3cG9ydCA9IHF1ZXJ5KHZpZXdwb3J0LCAnI3N0YWdlLW1hcCcpO1xuICAgICAgICB0aGlzLndyYXBFbCA9IHF1ZXJ5KHRoaXMudmlld3BvcnQsICcud3JhcCcpO1xuICAgICAgICB0aGlzLmNhbnZhc0VsID0gcXVlcnkodGhpcy52aWV3cG9ydCwgJ2NhbnZhcycpO1xuICAgICAgICB0aGlzLnJlbmRlciA9IHRoaXMuY2FudmFzRWwuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgdGhpcy5pbmRpY2F0b3JFbCA9IHF1ZXJ5KHRoaXMudmlld3BvcnQsICcuaW5kaWNhdG9yJyk7XG4gICAgICAgIHRoaXMudGV4dEVsID0gcXVlcnkodGhpcy52aWV3cG9ydCwgJy50ZXh0IGInKTtcbiAgICAgICAgdGhpcy5oU2xpY2UgPSBoU2xpY2U7XG4gICAgICAgIHRoaXMudlNsaWNlID0gdlNsaWNlO1xuICAgICAgICB0aGlzLm9wZW5lZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJhbmRvbVRleHQoKSB7XG4gICAgICAgIGxldCBuID0gMTAwMDtcbiAgICAgICAgbGV0IHN1bURlbHRhID0gMTY7XG4gICAgICAgIGxldCBzaWduID0gLTE7XG5cbiAgICAgICAgcmV0dXJuICh7XG4gICAgICAgICAgICBlbGFwc2VkLFxuICAgICAgICAgICAgZGVsdGFcbiAgICAgICAgfSkgPT4ge1xuICAgICAgICAgICAgLy8gaWYgKHN1bURlbHRhID4gMTUpIHtcbiAgICAgICAgICAgICAgICAvLyBzdW1EZWx0YSA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKG4gPCAxMDAwICYmIHNpZ24gPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHNpZ24gPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobiA+IDEwMDAwICYgc2lnbiA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBzaWduID0gLTE7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0KG4pO1xuICAgICAgICAgICAgICAgIG4gKz0gcGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIDEwMCArIDEwMCkgKiBzaWduO1xuICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBzdW1EZWx0YSArPSBkZWx0YTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRleHQoc3RyKSB7XG4gICAgICAgIHRoaXMudGV4dEVsLnRleHRDb250ZW50ID0gc3RyO1xuICAgIH1cblxuICAgIHVwZGF0ZSh4cCwgeXApIHtcbiAgICAgICAgY29uc3Qge3dpZHRoOiBjV2lkdGgsIGhlaWdodDogY0hlaWdodH0gPSBnZXRSZWN0KHRoaXMuY2FudmFzRWwpO1xuICAgICAgICBjb25zdCB7d2lkdGg6IGlXaWR0aCwgaGVpZ2h0OiBpSGVpZ2h0fSA9IGdldFJlY3QodGhpcy5pbmRpY2F0b3JFbCk7XG4gICAgICAgIGNvbnN0IHtzbGljZVdpZHRoOiBzV2lkdGgsIHNsaWNlSGVpZ2h0OiBzSGVpZ2h0fSA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5pbmRpY2F0b3JFbC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBcbiAgICAgICAgICAgIGB0cmFuc2xhdGUzZCgke2NXaWR0aCAqIHhwICsgc1dpZHRoIC8gMiAtIGlXaWR0aCAvIDJ9cHgsICR7Y0hlaWdodCAqIHlwICsgc0hlaWdodCAvIDIgLSBpSGVpZ2h0IC8gMn1weCwgMClgO1xuICAgIH1cblxuICAgIGNsZWFyKHhwLCB5cCkge1xuICAgICAgICBjb25zdCB7d2lkdGg6IGNXaWR0aCwgaGVpZ2h0OiBjSGVpZ2h0fSA9IGdldFJlY3QodGhpcy5jYW52YXNFbCk7XG4gICAgICAgIGNvbnN0IHtzbGljZVdpZHRoOiBzV2lkdGgsIHNsaWNlSGVpZ2h0OiBzSGVpZ2h0fSA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5yZW5kZXIuZmlsbFJlY3QoY1dpZHRoICogeHAsIGNIZWlnaHQgKiB5cCwgc1dpZHRoLCBzSGVpZ2h0KTtcbiAgICB9XG5cbiAgICByZWFkeSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMudmlld3BvcnQuc3R5bGUuZGlzcGxheSA9ICcnO1xuXG4gICAgICAgICAgICBjb25zdCB7d2lkdGgsIGhlaWdodH0gPSBnZXRSZWN0KHRoaXMuY2FudmFzRWwpO1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLnNsaWNlV2lkdGggPSB3aWR0aCAvIHRoaXMuaFNsaWNlO1xuICAgICAgICAgICAgdGhpcy5zbGljZUhlaWdodCA9IGhlaWdodCAvIHRoaXMudlNsaWNlO1xuXG4gICAgICAgICAgICB0aGlzLmNhbnZhc0VsLndpZHRoID0gd2lkdGg7XG4gICAgICAgICAgICB0aGlzLmNhbnZhc0VsLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyLmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyLmZpbGxTdHlsZSA9ICcjMDE2ZmEwJztcbiAgICAgICAgICAgIHRoaXMucmVuZGVyLmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIuZmlsbFN0eWxlID0gJ3JnYmEoMCwgMCwgMCwgMSknO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ2Rlc3RpbmF0aW9uLW91dCc7XG5cbiAgICAgICAgICAgIHJlc29sdmUodGhpcyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFwLmpzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL21hcC5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjEzLjFAc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL21hcC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL21hcC5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21hcC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDE0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiI3N0YWdlLW1hcCB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGVmdDogMC41cmVtO1xcbiAgICBib3R0b206IDAuNXJlbTtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMC40cmVtIDAuN3JlbTtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxLjA5cmVtIDAuODUzcmVtO1xcbiAgICBoZWlnaHQ6IDg0cHg7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDk5OXB4KTtcXG4gICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICAgIC13ZWJraXQtYm94LXBhY2s6IGNlbnRlcjtcXG4gICAgLXdlYmtpdC1ib3gtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuI3N0YWdlLW1hcCAud3JhcCB7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICMwMTZmYTA7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIHdpZHRoOiAzMC4zcHg7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuI3N0YWdlLW1hcCAubWFwIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG59XFxuXFxuI3N0YWdlLW1hcCAuaW5kaWNhdG9yIHtcXG4gICAgbGVmdDogMDtcXG4gICAgdG9wOiAwO1xcbiAgICB3aWR0aDogMTZweDtcXG4gICAgaGVpZ2h0OiAxNnB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDUwLCA1MCwgNTApO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogZmxhc2ggMC40cyBsaW5lYXIgMHMgaW5maW5pdGUgYWx0ZXJuYXRlO1xcbn1cXG5cXG5cXG4jc3RhZ2UtbWFwIC50ZXh0IHtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBRUlBQUFCQ0NBWUFBQURqVkFEb0FBQUFHWFJGV0hSVGIyWjBkMkZ5WlFCQlpHOWlaU0JKYldGblpWSmxZV1I1Y2NsbFBBQUFDU0ZKUkVGVWVOcmtuQWxzRlZVVWhxZXZZMXRxQllwU0tBcTJnS0FzTG9qaWhncUlpdEdFYUJRVmd5RnVVVkdpQXU1S1hOaFJOQzY0Z0hHUGdRakVEUkFVd1NLQ0lOQXFpNEJLVlpCRmJDMkNGSXJucE4vbzdXVGU2OHg3ODhvcm5PUlBlZE41dzczbm52dWYvNXlaYVpxMXZzeXFBOHNXNUFvYUNuSUVEUVNaQWh1bzdRVjdCSDhMS2dUbGdoMThUcXFsSmNrUmFZS2pCQzBFZVlLc0JLKzNXN0JGOEp0Z20yQi9xanRDSjF3b09KcFZUNGFwVTM0Ui9DVFlsV3FPT0Z6UVZuQ01JR0xWalZYaGtIV0NuUWZhRWJxLzJ3bGFzeDBPaE9rMjJTQllDOGZVdVNPYUN6cUhzUC9EM0RJbGdrMTE1WWgwUVNkQkt5czFiU01PMlpkTVJ5Z0JuazRhVEdYVHRMczRDSmtHY1lST3Zsc0tiUVUvVytWcm5CS2FJeG9MemhBY1p0VXZxOFFaTzJvN01lSXpFdXFqRXl6RzNNM1BWcTdORVZsY3FENDZ3ZTJNckhnZGtWN1BPTUhQZ3FiSDQ0aE85U0E3QkxHR3pDbVFJNXFuc0U1SXhGb3hOMStPc0ZHTUI2dDFOa3IvR3BOMlc3c2s4MEtHb0wyZ1FKQlByOEttY0txZzFGN0Z6MlR4aGM3eCsxZzZRcXZJSGtrb29QUjZYUVFYQ0U1and1dnBNZndOaWVWUXZyZGhzRDhMUGhUTUNTcVhmUlpxbjV0VnE5c1JKeVdCRy9TYUF5R3JXWUl2QmI5eS9DUms4RkxCdFJSTXYxRmVueWM0bjlwaGpHQXpEczJuM0c4bWFFU0U3Y1NweS8ySUo2TW1XZUhsQ0swamVvYllUOUJWdllYYTVBMUNzUmNyb1JNWnhzU0dDL3FRM2l3R3R3Z1JOMXZRUVhDMjRFY2k1Z2ZLYm5WYUdlb3hpNjEycG1DTjREV3I5aTZXOWpNK2Mrb1JjOUlGSVRwQjIzUmpyZW8rNVdBbXJwK1hzWkpEY01KeXRrazM0N3M2K2Q1RXkxQVdhQVJPT0ZJd1R6Q0Z5Q29Xck9ZNjB3WDNFaEVYK1JoamhEblh5QnI2czJXSVRoakR5azRVUEVxWVAwUlkzdzhuNkVxOEtMamQrTzVtSnRMYVF4bE9nVmZ1RTV3UzQvK2ZCaG42c1phT0R5TEc0RE5EMmc2UENSWkNkRThJU3BsOGJ5YnRxRHQxd21WV2RZL1RzZGNGVjd1dXVaVHRwZC85RmhJZFJtUkZzOE45amplVEtQdlBFZmtoUmNNZzl1NWI4TTNEZ3E4STdUN0dlZStTSlM1MVRWajM3WW5HTWMwb3Z4dlIyazh3bFpiY1hWR3lXMjdBMnFpRjZZaW1JVGloSy90NmdsVjliMElKN1I3MmVhNXgzdHVDZndRM0c4ZitGRXdXM09xNjVnekJKYTVqU3ByUFFLSTlQY1p4Q1U3MWEwMGRRWlZ0SmQ1NlR5TkZ2aWs0UVhDamg1VFYreEh2c2QrN0dzZlZhU01GTjlIM2NPd1B3VXJYVnFrZ1NxcklMUDBGWDFqL04yM3owRUdEQW5iZHNtM1hhc1ZyVHI5aXZ1QVY4dnQreUc4VnFUT2Z5V2E0blBBNGFmVmsxelZmRU56Z0N2OGxTT1FCZ3RHQzhZSnpTWU1STXRRN2RLZUNXSzRkVW9XcEU1bUpkOGRBbW5ydFk5bnpYbXExakhNdjRQZW1UVVZodG5VZDE5UjZPU3ZmQWdkZmpDT3VFV3puMzRFclV4dlNTclIyMEhUMkVpdlN4Y2QzaWdUdkV5SEh1MzYzRUczd29PdjRhclpMVnlNS0Z5RGFycUxFSGg3bkhITHNFUGloUGZ2L0R3Z3NWdit3Q0FKc3k1YklkcDJ6R0dFMDNCVkJ1czFlRmx4bkhHOE44VnFrMTBjZzRYaXNnZTNhcy9IVytPdEpjVjVWcTByaXVTaEJqWnk3bzRnM3JVTStRWWRrZTRna2pkenV4ckZHMUNSbE9DR1JPK2FaZHF6MlZZRDBzOGtSSmtUSGF1VDBNcmlpRjJuMUtJL3Y3Nk0yV0l2ZWNEdmhPeHp4dEhGc055blU0WnFjQkIxaDIxRjZFb0hDQ3RGVHpGNnRJbXhWVXp4UWk5elZLdlFwb21xRXgxaEtJZFFoaGhQVjZhT00wdnd2SExFbFVVY2tZdG1RMU84VU1Gb0hOUEZSdk8yREs2YVJDbnQ3bkxPWk9xVS9UcldvWERXajNFRWRVeENTSXE2eUVTUHg4RVFtcEhZMDJqNHpTdWk3UzkvNTVQcENvc0ZMMWE2RFRGVk1YVWkvWVNKakhVM2F6Q0QxSDVFQVNmNjNNSGFjM1I5bDdqdUppQm1JcGZreHp0L01hczdoWEUyekhXT2sxb25JN2JPb1ZiUVl1eEt1MllNY0gwVEt6a00vSkdKN2JTNGNOSVZlaGw2NG0vMDlFQVpmU21Ub0NtNmxVaXloNUQ2VFVyd3cybUFnelNWRVdpTzRvSklxMW9tMnljajROcVRWaWppVXBOdjIyQXl5VVlBdjZWYTRuaERkeEtUejRZWVhxREV5V0trQ2xGOXRENUpzSUN1MGdSdy9JY0tVSDg0eHp2dU1Qc2RUTkdNNnU1dXdjZG91MndyKzJNMEF3blV4bjhzcGpyb3pxQ2NEWEtzTXZpakJ1ZHVKR3BYZHo3cks2VzlwK1QxQkJNOUZiczhNd1JFVkVRYmoxL0tNSHFScG43THlLcDYrOFhHZFRTakZvWkNsMWhxVDJFNGFFWDFkVGxpQ0RubUF0bDhwU3JhUUtqUlJLN2NEZEgyZG5zTUtqNXhkaFB6dEFZR2Q2TXBFKytHTDVkUVNHb1hhMWo5VjhBSFJOQ3BLSlR5YlJzN0RSaEUyQ2MweU13UitVTnRobzhoMitTVE1JMWwxTDEwd21YYmFiYlRTOGlEaUhiVG9tK09nTGpSWDV0QzFlbzRVNkVXZWs5ZzJvN21lRTMwUitPSDVNUGhCZmVBSXFxMld2L3NaMnoycVJjY1drZTRHd3hPRnBMdGNveFUzRnhYWWgxWmJWZ3pGT1k1cmpEUDZxYXRwN293bnBZYnhiT1RXYWoxUWZWOGp6OVZTajJaSHNBcHpVWVhsSGlMTDZXQy9UZHRzR1Z2aERMYk9jYlVvVHIzdXg2UmtzOGhhUzJROGlKSWRHWktxMUNkcXRqaU9pTURVZmpyWkxaRzQ3Vm01UDQxcXNKbkJEZFBSQlZlUWFXTG1jUVRYZEhpam4ydTd6S01OZUM5ODgxQUlhdExpR3JwRnE4dzdYUjNJNDM2dEplYzNobC8rZ1c5S2NjNGdQaytBR3dZYSs5d1p4Q3BTOFVySXN5OTZ4RlNrazhrUXc0aUVKNjN3SGxKZnh4aVNlc3N2blNadWQ5THRQSnlkUnRhcHBFOTVPbEdRYnBCa0NkdXZHR210blBJUkViWTNwUEhWdU9WWEZ6ZUJleURKRzFzMWJ3STNJeDAyeFBrN2lZQ05LTkh6d1M5b2p1OURIbGZVbThDV2xkekhBcm9qdWpvUzZodUlqSjMwSWN6SEFteXl6Q3graHYxYVFxMlBCY1RERlVHdENVVlRhNklraHpDdFFISCt4T3J2VHVJWU50RDVzbUk1d2lZcURvYW42YnhzTjlGUWcyc2lVUlJkc1hYd1dva1g0VVppTkZKS0QwSW5sRnBSWG1PSWxTcUxMWjhQZE5jVEs0OFY2WkZhNU80U1ZGOTl0ejMwVC9iRjR3Z0xCYmNJOFZOZnJaSTU3SXFkM3cvOGF3cGFYWHJkKzlBaWEwZ0lUZ2p0TlFXTDJxSElDdkgxUWxmSkhVMzVKZHBuS1BMYmVBcFNWL3pGaGNNbVVKWFAyeng2Qks4bVNJeEZqTmtLMnhHT2x4ZlFZUXJMVk9hT05YTDdYclpMdkJYbVJ1cVpRTkdiU3E4N2FuZExuM1hRbnVmQ09CVmpuYjd1NkpianFmQUNyRWJvR3VzQXZRRHJybG9QNlZlaTNhYk5uUUlja3F5aUxhVmZrdmZxUHh6U2Z6WWhtcm4va0laK3pyRCsvME1hVmNqZlN2WjVuZjhoalg4RkdBQmc2SHd6bXFvdEhBQUFBQUJKUlU1RXJrSmdnZz09KTtcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxLjJyZW07XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciAwLjJyZW07XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIGNvbG9yOiAjMDBkZGYxO1xcbiAgICBmb250LXNpemU6IDEycHg7XFxuICAgIHdpZHRoOiAxMDBweDtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBsaW5lLWhlaWdodDogMS41ZW07XFxuICAgIGxlZnQ6IDAuMXJlbTtcXG4gICAgdG9wOiAxLjhyZW07XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgcGFkZGluZy10b3A6IDUwcHg7XFxufVxcblxcbiNzdGFnZS1tYXAgLnRleHQgYiB7XFxuICAgIGZvbnQtc2l6ZTogMTVweDtcXG4gICAgbWFyZ2luLXRvcDogNHB4O1xcbiAgICBjb2xvcjogI0ZGRjtcXG59XFxuXFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIGZsYXNoIHtcXG4gICAgMCUge1xcbiAgICAgICAgb3BhY2l0eTogMDtcXG4gICAgfVxcblxcbiAgICAxMDAlIHtcXG4gICAgICAgIG9wYWNpdHk6IDE7XFxuICAgIH1cXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjI1LjBAY3NzLWxvYWRlciEuL3NyYy9tYXAuY3NzXG4vLyBtb2R1bGUgaWQgPSAxNDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHtcbiAgICB3aW4sXG4gICAgZG9jLFxuICAgIFByb21pc2UsXG4gICAgZGVmZXIsXG4gICAgcXVlcnksXG4gICAgcXVlcnlBbGwsXG4gICAgZ2V0UmVjdCxcbiAgICBnZXREaXN0YW5jZSxcbiAgICByYWYsXG4gICAgY2FmXG59IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgRXZlbnQgZnJvbSAnLi9ldmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpY2tlciBleHRlbmRzIEV2ZW50e1xuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAgICAgdGhpcy5faWQgPSAwO1xuICAgICAgICB0aGlzLl9tYXBGID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLl9tYXBDID0gbmV3IE1hcCgpO1xuICAgIH1cblxuICAgIGFkZChmKSB7XG4gICAgICAgIGlmIChmICYmICF0aGlzLl9tYXBDLmhhcyhmKSkge1xuICAgICAgICAgICAgY29uc3QgaWQgPSB0aGlzLl9pZCsrO1xuICAgICAgICAgICAgdGhpcy5fbWFwRi5zZXQoaWQsIGYpO1xuICAgICAgICAgICAgdGhpcy5fbWFwQy5zZXQoZiwge1xuICAgICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgICBkZWZlcnJlZDogZGVmZXIoKSxcbiAgICAgICAgICAgICAgICBjYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN0YXJ0OiAwLFxuICAgICAgICAgICAgICAgIGVsYXBzZWQ6IDAsXG4gICAgICAgICAgICAgICAgZGVsdGE6IDBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFzKGlkKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgaWQgPT09ICdudW1iZXInICYmIHRoaXMuX21hcEYuaGFzKGlkKTtcbiAgICB9XG5cbiAgICBkZWxldGUoaWQpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzKGlkKSkge1xuICAgICAgICAgICAgY29uc3QgZiA9IHRoaXMuX21hcEYuZ2V0KGlkKTtcbiAgICAgICAgICAgIGNvbnN0IGMgPSB0aGlzLl9tYXBDLmdldChmKTtcbiAgICAgICAgICAgIGMuY2FuY2VsID0gdHJ1ZTtcbiAgICAgICAgICAgIGMuZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgdGhpcy5fbWFwRi5kZWxldGUoaWQpO1xuICAgICAgICAgICAgdGhpcy5fbWFwQy5kZWxldGUoZik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlbmQoaWQpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzKGlkKSkge1xuICAgICAgICAgICAgY29uc3QgZiA9IHRoaXMuX21hcEYuZ2V0KGlkKTtcbiAgICAgICAgICAgIGNvbnN0IGMgPSB0aGlzLl9tYXBDLmdldChmKTtcbiAgICAgICAgICAgIHJldHVybiBjLmRlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnJpZCkge1xuICAgICAgICAgICAgY2FmKHRoaXMucmlkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJ1bigpIHtcbiAgICAgICAgdGhpcy5zdGFydCA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuZWxhcHNlZCA9IDA7XG4gICAgICAgIHRoaXMuZGVsdGEgPSAwO1xuXG4gICAgICAgIGNvbnN0IHRpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJpZCA9IHJhZih0aWNrKTtcblxuICAgICAgICAgICAgbGV0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgICAgICBsZXQgZWxhcHNlZCA9IG5vdyAtIHRoaXMuc3RhcnQ7XG4gICAgICAgICAgICBsZXQgZGVsdGEgPSBlbGFwc2VkIC0gdGhpcy5lbGFwc2VkO1xuXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2JlZm9yZXRpY2snLCB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHRoaXMuc3RhcnQsXG4gICAgICAgICAgICAgICAgZGVsdGE6IGRlbHRhLFxuICAgICAgICAgICAgICAgIGVsYXBzZWQ6IGVsYXBzZWRcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBrZXlzID0gWy4uLnRoaXMuX21hcEMua2V5cygpXTtcblxuICAgICAgICAgICAga2V5cy5mb3JFYWNoKGYgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGMgPSB0aGlzLl9tYXBDLmdldChmKTtcblxuICAgICAgICAgICAgICAgIGlmICghYy5jYW5jZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICAgICAgYy5zdGFydCA9IGMuc3RhcnQgfHwgKGMuc3RhcnQgPSBub3cpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsYXBzZWQgPSBub3cgLSBjLnN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICBjLmRlbHRhID0gZWxhcHNlZCAtIGMuZWxhcHNlZDtcbiAgICAgICAgICAgICAgICAgICAgYy5lbGFwc2VkID0gZWxhcHNlZDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZihjLCB0aGlzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxldGUoYy5pZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIGVsYXBzZWQgPSBub3cgLSB0aGlzLnN0YXJ0O1xuICAgICAgICAgICAgZGVsdGEgPSBlbGFwc2VkIC0gdGhpcy5lbGFwc2VkO1xuXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2FmdGVydGljaycsIHtcbiAgICAgICAgICAgICAgICBzdGFydDogdGhpcy5zdGFydCxcbiAgICAgICAgICAgICAgICBkZWx0YTogZGVsdGEsXG4gICAgICAgICAgICAgICAgZWxhcHNlZDogZWxhcHNlZFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuZGVsdGEgPSBkZWx0YTtcbiAgICAgICAgICAgIHRoaXMuZWxhcHNlZCA9ICBlbGFwc2VkO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yaWQgPSByYWYodGljayk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90aWNrZXIuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vbWFwXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL21hcC5qc1xuLy8gbW9kdWxlIGlkID0gMTUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwicmVxdWlyZSgnLi4vbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZycpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2Lm1hcCcpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczcubWFwLnRvLWpzb24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9fY29yZScpLk1hcDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9tYXAuanNcbi8vIG1vZHVsZSBpZCA9IDE1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcbnZhciBzdHJvbmcgPSByZXF1aXJlKCcuL19jb2xsZWN0aW9uLXN0cm9uZycpO1xuXG4vLyAyMy4xIE1hcCBPYmplY3RzXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvbGxlY3Rpb24nKSgnTWFwJywgZnVuY3Rpb24oZ2V0KXtcbiAgcmV0dXJuIGZ1bmN0aW9uIE1hcCgpeyByZXR1cm4gZ2V0KHRoaXMsIGFyZ3VtZW50cy5sZW5ndGggPiAwID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkKTsgfTtcbn0sIHtcbiAgLy8gMjMuMS4zLjYgTWFwLnByb3RvdHlwZS5nZXQoa2V5KVxuICBnZXQ6IGZ1bmN0aW9uIGdldChrZXkpe1xuICAgIHZhciBlbnRyeSA9IHN0cm9uZy5nZXRFbnRyeSh0aGlzLCBrZXkpO1xuICAgIHJldHVybiBlbnRyeSAmJiBlbnRyeS52O1xuICB9LFxuICAvLyAyMy4xLjMuOSBNYXAucHJvdG90eXBlLnNldChrZXksIHZhbHVlKVxuICBzZXQ6IGZ1bmN0aW9uIHNldChrZXksIHZhbHVlKXtcbiAgICByZXR1cm4gc3Ryb25nLmRlZih0aGlzLCBrZXkgPT09IDAgPyAwIDoga2V5LCB2YWx1ZSk7XG4gIH1cbn0sIHN0cm9uZywgdHJ1ZSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYubWFwLmpzXG4vLyBtb2R1bGUgaWQgPSAxNTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG52YXIgZFAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mXG4gICwgY3JlYXRlICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJylcbiAgLCByZWRlZmluZUFsbCA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lLWFsbCcpXG4gICwgY3R4ICAgICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIGFuSW5zdGFuY2UgID0gcmVxdWlyZSgnLi9fYW4taW5zdGFuY2UnKVxuICAsIGRlZmluZWQgICAgID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpXG4gICwgZm9yT2YgICAgICAgPSByZXF1aXJlKCcuL19mb3Itb2YnKVxuICAsICRpdGVyRGVmaW5lID0gcmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKVxuICAsIHN0ZXAgICAgICAgID0gcmVxdWlyZSgnLi9faXRlci1zdGVwJylcbiAgLCBzZXRTcGVjaWVzICA9IHJlcXVpcmUoJy4vX3NldC1zcGVjaWVzJylcbiAgLCBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJylcbiAgLCBmYXN0S2V5ICAgICA9IHJlcXVpcmUoJy4vX21ldGEnKS5mYXN0S2V5XG4gICwgU0laRSAgICAgICAgPSBERVNDUklQVE9SUyA/ICdfcycgOiAnc2l6ZSc7XG5cbnZhciBnZXRFbnRyeSA9IGZ1bmN0aW9uKHRoYXQsIGtleSl7XG4gIC8vIGZhc3QgY2FzZVxuICB2YXIgaW5kZXggPSBmYXN0S2V5KGtleSksIGVudHJ5O1xuICBpZihpbmRleCAhPT0gJ0YnKXJldHVybiB0aGF0Ll9pW2luZGV4XTtcbiAgLy8gZnJvemVuIG9iamVjdCBjYXNlXG4gIGZvcihlbnRyeSA9IHRoYXQuX2Y7IGVudHJ5OyBlbnRyeSA9IGVudHJ5Lm4pe1xuICAgIGlmKGVudHJ5LmsgPT0ga2V5KXJldHVybiBlbnRyeTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldENvbnN0cnVjdG9yOiBmdW5jdGlvbih3cmFwcGVyLCBOQU1FLCBJU19NQVAsIEFEREVSKXtcbiAgICB2YXIgQyA9IHdyYXBwZXIoZnVuY3Rpb24odGhhdCwgaXRlcmFibGUpe1xuICAgICAgYW5JbnN0YW5jZSh0aGF0LCBDLCBOQU1FLCAnX2knKTtcbiAgICAgIHRoYXQuX2kgPSBjcmVhdGUobnVsbCk7IC8vIGluZGV4XG4gICAgICB0aGF0Ll9mID0gdW5kZWZpbmVkOyAgICAvLyBmaXJzdCBlbnRyeVxuICAgICAgdGhhdC5fbCA9IHVuZGVmaW5lZDsgICAgLy8gbGFzdCBlbnRyeVxuICAgICAgdGhhdFtTSVpFXSA9IDA7ICAgICAgICAgLy8gc2l6ZVxuICAgICAgaWYoaXRlcmFibGUgIT0gdW5kZWZpbmVkKWZvck9mKGl0ZXJhYmxlLCBJU19NQVAsIHRoYXRbQURERVJdLCB0aGF0KTtcbiAgICB9KTtcbiAgICByZWRlZmluZUFsbChDLnByb3RvdHlwZSwge1xuICAgICAgLy8gMjMuMS4zLjEgTWFwLnByb3RvdHlwZS5jbGVhcigpXG4gICAgICAvLyAyMy4yLjMuMiBTZXQucHJvdG90eXBlLmNsZWFyKClcbiAgICAgIGNsZWFyOiBmdW5jdGlvbiBjbGVhcigpe1xuICAgICAgICBmb3IodmFyIHRoYXQgPSB0aGlzLCBkYXRhID0gdGhhdC5faSwgZW50cnkgPSB0aGF0Ll9mOyBlbnRyeTsgZW50cnkgPSBlbnRyeS5uKXtcbiAgICAgICAgICBlbnRyeS5yID0gdHJ1ZTtcbiAgICAgICAgICBpZihlbnRyeS5wKWVudHJ5LnAgPSBlbnRyeS5wLm4gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgZGVsZXRlIGRhdGFbZW50cnkuaV07XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC5fZiA9IHRoYXQuX2wgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoYXRbU0laRV0gPSAwO1xuICAgICAgfSxcbiAgICAgIC8vIDIzLjEuMy4zIE1hcC5wcm90b3R5cGUuZGVsZXRlKGtleSlcbiAgICAgIC8vIDIzLjIuMy40IFNldC5wcm90b3R5cGUuZGVsZXRlKHZhbHVlKVxuICAgICAgJ2RlbGV0ZSc6IGZ1bmN0aW9uKGtleSl7XG4gICAgICAgIHZhciB0aGF0ICA9IHRoaXNcbiAgICAgICAgICAsIGVudHJ5ID0gZ2V0RW50cnkodGhhdCwga2V5KTtcbiAgICAgICAgaWYoZW50cnkpe1xuICAgICAgICAgIHZhciBuZXh0ID0gZW50cnkublxuICAgICAgICAgICAgLCBwcmV2ID0gZW50cnkucDtcbiAgICAgICAgICBkZWxldGUgdGhhdC5faVtlbnRyeS5pXTtcbiAgICAgICAgICBlbnRyeS5yID0gdHJ1ZTtcbiAgICAgICAgICBpZihwcmV2KXByZXYubiA9IG5leHQ7XG4gICAgICAgICAgaWYobmV4dCluZXh0LnAgPSBwcmV2O1xuICAgICAgICAgIGlmKHRoYXQuX2YgPT0gZW50cnkpdGhhdC5fZiA9IG5leHQ7XG4gICAgICAgICAgaWYodGhhdC5fbCA9PSBlbnRyeSl0aGF0Ll9sID0gcHJldjtcbiAgICAgICAgICB0aGF0W1NJWkVdLS07XG4gICAgICAgIH0gcmV0dXJuICEhZW50cnk7XG4gICAgICB9LFxuICAgICAgLy8gMjMuMi4zLjYgU2V0LnByb3RvdHlwZS5mb3JFYWNoKGNhbGxiYWNrZm4sIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gICAgICAvLyAyMy4xLjMuNSBNYXAucHJvdG90eXBlLmZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgICAgIGZvckVhY2g6IGZ1bmN0aW9uIGZvckVhY2goY2FsbGJhY2tmbiAvKiwgdGhhdCA9IHVuZGVmaW5lZCAqLyl7XG4gICAgICAgIGFuSW5zdGFuY2UodGhpcywgQywgJ2ZvckVhY2gnKTtcbiAgICAgICAgdmFyIGYgPSBjdHgoY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQsIDMpXG4gICAgICAgICAgLCBlbnRyeTtcbiAgICAgICAgd2hpbGUoZW50cnkgPSBlbnRyeSA/IGVudHJ5Lm4gOiB0aGlzLl9mKXtcbiAgICAgICAgICBmKGVudHJ5LnYsIGVudHJ5LmssIHRoaXMpO1xuICAgICAgICAgIC8vIHJldmVydCB0byB0aGUgbGFzdCBleGlzdGluZyBlbnRyeVxuICAgICAgICAgIHdoaWxlKGVudHJ5ICYmIGVudHJ5LnIpZW50cnkgPSBlbnRyeS5wO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgLy8gMjMuMS4zLjcgTWFwLnByb3RvdHlwZS5oYXMoa2V5KVxuICAgICAgLy8gMjMuMi4zLjcgU2V0LnByb3RvdHlwZS5oYXModmFsdWUpXG4gICAgICBoYXM6IGZ1bmN0aW9uIGhhcyhrZXkpe1xuICAgICAgICByZXR1cm4gISFnZXRFbnRyeSh0aGlzLCBrZXkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmKERFU0NSSVBUT1JTKWRQKEMucHJvdG90eXBlLCAnc2l6ZScsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIGRlZmluZWQodGhpc1tTSVpFXSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIEM7XG4gIH0sXG4gIGRlZjogZnVuY3Rpb24odGhhdCwga2V5LCB2YWx1ZSl7XG4gICAgdmFyIGVudHJ5ID0gZ2V0RW50cnkodGhhdCwga2V5KVxuICAgICAgLCBwcmV2LCBpbmRleDtcbiAgICAvLyBjaGFuZ2UgZXhpc3RpbmcgZW50cnlcbiAgICBpZihlbnRyeSl7XG4gICAgICBlbnRyeS52ID0gdmFsdWU7XG4gICAgLy8gY3JlYXRlIG5ldyBlbnRyeVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGF0Ll9sID0gZW50cnkgPSB7XG4gICAgICAgIGk6IGluZGV4ID0gZmFzdEtleShrZXksIHRydWUpLCAvLyA8LSBpbmRleFxuICAgICAgICBrOiBrZXksICAgICAgICAgICAgICAgICAgICAgICAgLy8gPC0ga2V5XG4gICAgICAgIHY6IHZhbHVlLCAgICAgICAgICAgICAgICAgICAgICAvLyA8LSB2YWx1ZVxuICAgICAgICBwOiBwcmV2ID0gdGhhdC5fbCwgICAgICAgICAgICAgLy8gPC0gcHJldmlvdXMgZW50cnlcbiAgICAgICAgbjogdW5kZWZpbmVkLCAgICAgICAgICAgICAgICAgIC8vIDwtIG5leHQgZW50cnlcbiAgICAgICAgcjogZmFsc2UgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIHJlbW92ZWRcbiAgICAgIH07XG4gICAgICBpZighdGhhdC5fZil0aGF0Ll9mID0gZW50cnk7XG4gICAgICBpZihwcmV2KXByZXYubiA9IGVudHJ5O1xuICAgICAgdGhhdFtTSVpFXSsrO1xuICAgICAgLy8gYWRkIHRvIGluZGV4XG4gICAgICBpZihpbmRleCAhPT0gJ0YnKXRoYXQuX2lbaW5kZXhdID0gZW50cnk7XG4gICAgfSByZXR1cm4gdGhhdDtcbiAgfSxcbiAgZ2V0RW50cnk6IGdldEVudHJ5LFxuICBzZXRTdHJvbmc6IGZ1bmN0aW9uKEMsIE5BTUUsIElTX01BUCl7XG4gICAgLy8gYWRkIC5rZXlzLCAudmFsdWVzLCAuZW50cmllcywgW0BAaXRlcmF0b3JdXG4gICAgLy8gMjMuMS4zLjQsIDIzLjEuMy44LCAyMy4xLjMuMTEsIDIzLjEuMy4xMiwgMjMuMi4zLjUsIDIzLjIuMy44LCAyMy4yLjMuMTAsIDIzLjIuMy4xMVxuICAgICRpdGVyRGVmaW5lKEMsIE5BTUUsIGZ1bmN0aW9uKGl0ZXJhdGVkLCBraW5kKXtcbiAgICAgIHRoaXMuX3QgPSBpdGVyYXRlZDsgIC8vIHRhcmdldFxuICAgICAgdGhpcy5fayA9IGtpbmQ7ICAgICAgLy8ga2luZFxuICAgICAgdGhpcy5fbCA9IHVuZGVmaW5lZDsgLy8gcHJldmlvdXNcbiAgICB9LCBmdW5jdGlvbigpe1xuICAgICAgdmFyIHRoYXQgID0gdGhpc1xuICAgICAgICAsIGtpbmQgID0gdGhhdC5fa1xuICAgICAgICAsIGVudHJ5ID0gdGhhdC5fbDtcbiAgICAgIC8vIHJldmVydCB0byB0aGUgbGFzdCBleGlzdGluZyBlbnRyeVxuICAgICAgd2hpbGUoZW50cnkgJiYgZW50cnkucillbnRyeSA9IGVudHJ5LnA7XG4gICAgICAvLyBnZXQgbmV4dCBlbnRyeVxuICAgICAgaWYoIXRoYXQuX3QgfHwgISh0aGF0Ll9sID0gZW50cnkgPSBlbnRyeSA/IGVudHJ5Lm4gOiB0aGF0Ll90Ll9mKSl7XG4gICAgICAgIC8vIG9yIGZpbmlzaCB0aGUgaXRlcmF0aW9uXG4gICAgICAgIHRoYXQuX3QgPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBzdGVwKDEpO1xuICAgICAgfVxuICAgICAgLy8gcmV0dXJuIHN0ZXAgYnkga2luZFxuICAgICAgaWYoa2luZCA9PSAna2V5cycgIClyZXR1cm4gc3RlcCgwLCBlbnRyeS5rKTtcbiAgICAgIGlmKGtpbmQgPT0gJ3ZhbHVlcycpcmV0dXJuIHN0ZXAoMCwgZW50cnkudik7XG4gICAgICByZXR1cm4gc3RlcCgwLCBbZW50cnkuaywgZW50cnkudl0pO1xuICAgIH0sIElTX01BUCA/ICdlbnRyaWVzJyA6ICd2YWx1ZXMnICwgIUlTX01BUCwgdHJ1ZSk7XG5cbiAgICAvLyBhZGQgW0BAc3BlY2llc10sIDIzLjEuMi4yLCAyMy4yLjIuMlxuICAgIHNldFNwZWNpZXMoTkFNRSk7XG4gIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29sbGVjdGlvbi1zdHJvbmcuanNcbi8vIG1vZHVsZSBpZCA9IDE1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0YXJnZXQsIHNyYywgc2FmZSl7XG4gIGZvcih2YXIga2V5IGluIHNyYyl7XG4gICAgaWYoc2FmZSAmJiB0YXJnZXRba2V5XSl0YXJnZXRba2V5XSA9IHNyY1trZXldO1xuICAgIGVsc2UgaGlkZSh0YXJnZXQsIGtleSwgc3JjW2tleV0pO1xuICB9IHJldHVybiB0YXJnZXQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLWFsbC5qc1xuLy8gbW9kdWxlIGlkID0gMTU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgQ29uc3RydWN0b3IsIG5hbWUsIGZvcmJpZGRlbkZpZWxkKXtcbiAgaWYoIShpdCBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSB8fCAoZm9yYmlkZGVuRmllbGQgIT09IHVuZGVmaW5lZCAmJiBmb3JiaWRkZW5GaWVsZCBpbiBpdCkpe1xuICAgIHRocm93IFR5cGVFcnJvcihuYW1lICsgJzogaW5jb3JyZWN0IGludm9jYXRpb24hJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1pbnN0YW5jZS5qc1xuLy8gbW9kdWxlIGlkID0gMTU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGN0eCAgICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBjYWxsICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXItY2FsbCcpXG4gICwgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJylcbiAgLCBhbk9iamVjdCAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgdG9MZW5ndGggICAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIGdldEl0ZXJGbiAgID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKVxuICAsIEJSRUFLICAgICAgID0ge31cbiAgLCBSRVRVUk4gICAgICA9IHt9O1xudmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXJhYmxlLCBlbnRyaWVzLCBmbiwgdGhhdCwgSVRFUkFUT1Ipe1xuICB2YXIgaXRlckZuID0gSVRFUkFUT1IgPyBmdW5jdGlvbigpeyByZXR1cm4gaXRlcmFibGU7IH0gOiBnZXRJdGVyRm4oaXRlcmFibGUpXG4gICAgLCBmICAgICAgPSBjdHgoZm4sIHRoYXQsIGVudHJpZXMgPyAyIDogMSlcbiAgICAsIGluZGV4ICA9IDBcbiAgICAsIGxlbmd0aCwgc3RlcCwgaXRlcmF0b3IsIHJlc3VsdDtcbiAgaWYodHlwZW9mIGl0ZXJGbiAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdGVyYWJsZSArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICAvLyBmYXN0IGNhc2UgZm9yIGFycmF5cyB3aXRoIGRlZmF1bHQgaXRlcmF0b3JcbiAgaWYoaXNBcnJheUl0ZXIoaXRlckZuKSlmb3IobGVuZ3RoID0gdG9MZW5ndGgoaXRlcmFibGUubGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4Kyspe1xuICAgIHJlc3VsdCA9IGVudHJpZXMgPyBmKGFuT2JqZWN0KHN0ZXAgPSBpdGVyYWJsZVtpbmRleF0pWzBdLCBzdGVwWzFdKSA6IGYoaXRlcmFibGVbaW5kZXhdKTtcbiAgICBpZihyZXN1bHQgPT09IEJSRUFLIHx8IHJlc3VsdCA9PT0gUkVUVVJOKXJldHVybiByZXN1bHQ7XG4gIH0gZWxzZSBmb3IoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChpdGVyYWJsZSk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgKXtcbiAgICByZXN1bHQgPSBjYWxsKGl0ZXJhdG9yLCBmLCBzdGVwLnZhbHVlLCBlbnRyaWVzKTtcbiAgICBpZihyZXN1bHQgPT09IEJSRUFLIHx8IHJlc3VsdCA9PT0gUkVUVVJOKXJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5leHBvcnRzLkJSRUFLICA9IEJSRUFLO1xuZXhwb3J0cy5SRVRVUk4gPSBSRVRVUk47XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZm9yLW9mLmpzXG4vLyBtb2R1bGUgaWQgPSAxNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGNvcmUgICAgICAgID0gcmVxdWlyZSgnLi9fY29yZScpXG4gICwgZFAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKVxuICAsIFNQRUNJRVMgICAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihLRVkpe1xuICB2YXIgQyA9IHR5cGVvZiBjb3JlW0tFWV0gPT0gJ2Z1bmN0aW9uJyA/IGNvcmVbS0VZXSA6IGdsb2JhbFtLRVldO1xuICBpZihERVNDUklQVE9SUyAmJiBDICYmICFDW1NQRUNJRVNdKWRQLmYoQywgU1BFQ0lFUywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9XG4gIH0pO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtc3BlY2llcy5qc1xuLy8gbW9kdWxlIGlkID0gMTU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCAgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgbWV0YSAgICAgICAgICAgPSByZXF1aXJlKCcuL19tZXRhJylcbiAgLCBmYWlscyAgICAgICAgICA9IHJlcXVpcmUoJy4vX2ZhaWxzJylcbiAgLCBoaWRlICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIHJlZGVmaW5lQWxsICAgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUtYWxsJylcbiAgLCBmb3JPZiAgICAgICAgICA9IHJlcXVpcmUoJy4vX2Zvci1vZicpXG4gICwgYW5JbnN0YW5jZSAgICAgPSByZXF1aXJlKCcuL19hbi1pbnN0YW5jZScpXG4gICwgaXNPYmplY3QgICAgICAgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIGRQICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZlxuICAsIGVhY2ggICAgICAgICAgID0gcmVxdWlyZSgnLi9fYXJyYXktbWV0aG9kcycpKDApXG4gICwgREVTQ1JJUFRPUlMgICAgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE5BTUUsIHdyYXBwZXIsIG1ldGhvZHMsIGNvbW1vbiwgSVNfTUFQLCBJU19XRUFLKXtcbiAgdmFyIEJhc2UgID0gZ2xvYmFsW05BTUVdXG4gICAgLCBDICAgICA9IEJhc2VcbiAgICAsIEFEREVSID0gSVNfTUFQID8gJ3NldCcgOiAnYWRkJ1xuICAgICwgcHJvdG8gPSBDICYmIEMucHJvdG90eXBlXG4gICAgLCBPICAgICA9IHt9O1xuICBpZighREVTQ1JJUFRPUlMgfHwgdHlwZW9mIEMgIT0gJ2Z1bmN0aW9uJyB8fCAhKElTX1dFQUsgfHwgcHJvdG8uZm9yRWFjaCAmJiAhZmFpbHMoZnVuY3Rpb24oKXtcbiAgICBuZXcgQygpLmVudHJpZXMoKS5uZXh0KCk7XG4gIH0pKSl7XG4gICAgLy8gY3JlYXRlIGNvbGxlY3Rpb24gY29uc3RydWN0b3JcbiAgICBDID0gY29tbW9uLmdldENvbnN0cnVjdG9yKHdyYXBwZXIsIE5BTUUsIElTX01BUCwgQURERVIpO1xuICAgIHJlZGVmaW5lQWxsKEMucHJvdG90eXBlLCBtZXRob2RzKTtcbiAgICBtZXRhLk5FRUQgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIEMgPSB3cmFwcGVyKGZ1bmN0aW9uKHRhcmdldCwgaXRlcmFibGUpe1xuICAgICAgYW5JbnN0YW5jZSh0YXJnZXQsIEMsIE5BTUUsICdfYycpO1xuICAgICAgdGFyZ2V0Ll9jID0gbmV3IEJhc2U7XG4gICAgICBpZihpdGVyYWJsZSAhPSB1bmRlZmluZWQpZm9yT2YoaXRlcmFibGUsIElTX01BUCwgdGFyZ2V0W0FEREVSXSwgdGFyZ2V0KTtcbiAgICB9KTtcbiAgICBlYWNoKCdhZGQsY2xlYXIsZGVsZXRlLGZvckVhY2gsZ2V0LGhhcyxzZXQsa2V5cyx2YWx1ZXMsZW50cmllcyx0b0pTT04nLnNwbGl0KCcsJyksZnVuY3Rpb24oS0VZKXtcbiAgICAgIHZhciBJU19BRERFUiA9IEtFWSA9PSAnYWRkJyB8fCBLRVkgPT0gJ3NldCc7XG4gICAgICBpZihLRVkgaW4gcHJvdG8gJiYgIShJU19XRUFLICYmIEtFWSA9PSAnY2xlYXInKSloaWRlKEMucHJvdG90eXBlLCBLRVksIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgICBhbkluc3RhbmNlKHRoaXMsIEMsIEtFWSk7XG4gICAgICAgIGlmKCFJU19BRERFUiAmJiBJU19XRUFLICYmICFpc09iamVjdChhKSlyZXR1cm4gS0VZID09ICdnZXQnID8gdW5kZWZpbmVkIDogZmFsc2U7XG4gICAgICAgIHZhciByZXN1bHQgPSB0aGlzLl9jW0tFWV0oYSA9PT0gMCA/IDAgOiBhLCBiKTtcbiAgICAgICAgcmV0dXJuIElTX0FEREVSID8gdGhpcyA6IHJlc3VsdDtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmKCdzaXplJyBpbiBwcm90bylkUChDLnByb3RvdHlwZSwgJ3NpemUnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiB0aGlzLl9jLnNpemU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzZXRUb1N0cmluZ1RhZyhDLCBOQU1FKTtcblxuICBPW05BTUVdID0gQztcbiAgJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYsIE8pO1xuXG4gIGlmKCFJU19XRUFLKWNvbW1vbi5zZXRTdHJvbmcoQywgTkFNRSwgSVNfTUFQKTtcblxuICByZXR1cm4gQztcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29sbGVjdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMTU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gMCAtPiBBcnJheSNmb3JFYWNoXG4vLyAxIC0+IEFycmF5I21hcFxuLy8gMiAtPiBBcnJheSNmaWx0ZXJcbi8vIDMgLT4gQXJyYXkjc29tZVxuLy8gNCAtPiBBcnJheSNldmVyeVxuLy8gNSAtPiBBcnJheSNmaW5kXG4vLyA2IC0+IEFycmF5I2ZpbmRJbmRleFxudmFyIGN0eCAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBJT2JqZWN0ICA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgYXNjICAgICAgPSByZXF1aXJlKCcuL19hcnJheS1zcGVjaWVzLWNyZWF0ZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihUWVBFLCAkY3JlYXRlKXtcbiAgdmFyIElTX01BUCAgICAgICAgPSBUWVBFID09IDFcbiAgICAsIElTX0ZJTFRFUiAgICAgPSBUWVBFID09IDJcbiAgICAsIElTX1NPTUUgICAgICAgPSBUWVBFID09IDNcbiAgICAsIElTX0VWRVJZICAgICAgPSBUWVBFID09IDRcbiAgICAsIElTX0ZJTkRfSU5ERVggPSBUWVBFID09IDZcbiAgICAsIE5PX0hPTEVTICAgICAgPSBUWVBFID09IDUgfHwgSVNfRklORF9JTkRFWFxuICAgICwgY3JlYXRlICAgICAgICA9ICRjcmVhdGUgfHwgYXNjO1xuICByZXR1cm4gZnVuY3Rpb24oJHRoaXMsIGNhbGxiYWNrZm4sIHRoYXQpe1xuICAgIHZhciBPICAgICAgPSB0b09iamVjdCgkdGhpcylcbiAgICAgICwgc2VsZiAgID0gSU9iamVjdChPKVxuICAgICAgLCBmICAgICAgPSBjdHgoY2FsbGJhY2tmbiwgdGhhdCwgMylcbiAgICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoc2VsZi5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IDBcbiAgICAgICwgcmVzdWx0ID0gSVNfTUFQID8gY3JlYXRlKCR0aGlzLCBsZW5ndGgpIDogSVNfRklMVEVSID8gY3JlYXRlKCR0aGlzLCAwKSA6IHVuZGVmaW5lZFxuICAgICAgLCB2YWwsIHJlcztcbiAgICBmb3IoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKWlmKE5PX0hPTEVTIHx8IGluZGV4IGluIHNlbGYpe1xuICAgICAgdmFsID0gc2VsZltpbmRleF07XG4gICAgICByZXMgPSBmKHZhbCwgaW5kZXgsIE8pO1xuICAgICAgaWYoVFlQRSl7XG4gICAgICAgIGlmKElTX01BUClyZXN1bHRbaW5kZXhdID0gcmVzOyAgICAgICAgICAgIC8vIG1hcFxuICAgICAgICBlbHNlIGlmKHJlcylzd2l0Y2goVFlQRSl7XG4gICAgICAgICAgY2FzZSAzOiByZXR1cm4gdHJ1ZTsgICAgICAgICAgICAgICAgICAgIC8vIHNvbWVcbiAgICAgICAgICBjYXNlIDU6IHJldHVybiB2YWw7ICAgICAgICAgICAgICAgICAgICAgLy8gZmluZFxuICAgICAgICAgIGNhc2UgNjogcmV0dXJuIGluZGV4OyAgICAgICAgICAgICAgICAgICAvLyBmaW5kSW5kZXhcbiAgICAgICAgICBjYXNlIDI6IHJlc3VsdC5wdXNoKHZhbCk7ICAgICAgICAgICAgICAgLy8gZmlsdGVyXG4gICAgICAgIH0gZWxzZSBpZihJU19FVkVSWSlyZXR1cm4gZmFsc2U7ICAgICAgICAgIC8vIGV2ZXJ5XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBJU19GSU5EX0lOREVYID8gLTEgOiBJU19TT01FIHx8IElTX0VWRVJZID8gSVNfRVZFUlkgOiByZXN1bHQ7XG4gIH07XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LW1ldGhvZHMuanNcbi8vIG1vZHVsZSBpZCA9IDE1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIDkuNC4yLjMgQXJyYXlTcGVjaWVzQ3JlYXRlKG9yaWdpbmFsQXJyYXksIGxlbmd0aClcbnZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19hcnJheS1zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob3JpZ2luYWwsIGxlbmd0aCl7XG4gIHJldHVybiBuZXcgKHNwZWNpZXNDb25zdHJ1Y3RvcihvcmlnaW5hbCkpKGxlbmd0aCk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LXNwZWNpZXMtY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAxNjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGlzQXJyYXkgID0gcmVxdWlyZSgnLi9faXMtYXJyYXknKVxuICAsIFNQRUNJRVMgID0gcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvcmlnaW5hbCl7XG4gIHZhciBDO1xuICBpZihpc0FycmF5KG9yaWdpbmFsKSl7XG4gICAgQyA9IG9yaWdpbmFsLmNvbnN0cnVjdG9yO1xuICAgIC8vIGNyb3NzLXJlYWxtIGZhbGxiYWNrXG4gICAgaWYodHlwZW9mIEMgPT0gJ2Z1bmN0aW9uJyAmJiAoQyA9PT0gQXJyYXkgfHwgaXNBcnJheShDLnByb3RvdHlwZSkpKUMgPSB1bmRlZmluZWQ7XG4gICAgaWYoaXNPYmplY3QoQykpe1xuICAgICAgQyA9IENbU1BFQ0lFU107XG4gICAgICBpZihDID09PSBudWxsKUMgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9IHJldHVybiBDID09PSB1bmRlZmluZWQgPyBBcnJheSA6IEM7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LXNwZWNpZXMtY29uc3RydWN0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDE2MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EYXZpZEJydWFudC9NYXAtU2V0LnByb3RvdHlwZS50b0pTT05cbnZhciAkZXhwb3J0ICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuUiwgJ01hcCcsIHt0b0pTT046IHJlcXVpcmUoJy4vX2NvbGxlY3Rpb24tdG8tanNvbicpKCdNYXAnKX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3Lm1hcC50by1qc29uLmpzXG4vLyBtb2R1bGUgaWQgPSAxNjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vRGF2aWRCcnVhbnQvTWFwLVNldC5wcm90b3R5cGUudG9KU09OXG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKVxuICAsIGZyb20gICAgPSByZXF1aXJlKCcuL19hcnJheS1mcm9tLWl0ZXJhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE5BTUUpe1xuICByZXR1cm4gZnVuY3Rpb24gdG9KU09OKCl7XG4gICAgaWYoY2xhc3NvZih0aGlzKSAhPSBOQU1FKXRocm93IFR5cGVFcnJvcihOQU1FICsgXCIjdG9KU09OIGlzbid0IGdlbmVyaWNcIik7XG4gICAgcmV0dXJuIGZyb20odGhpcyk7XG4gIH07XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvbGxlY3Rpb24tdG8tanNvbi5qc1xuLy8gbW9kdWxlIGlkID0gMTYzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGZvck9mID0gcmVxdWlyZSgnLi9fZm9yLW9mJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXRlciwgSVRFUkFUT1Ipe1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvck9mKGl0ZXIsIGZhbHNlLCByZXN1bHQucHVzaCwgcmVzdWx0LCBJVEVSQVRPUik7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktZnJvbS1pdGVyYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gMTY0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiaW1wb3J0ICcuL3BvcC5jc3MnO1xuaW1wb3J0IHtcbiAgICB3aW4sXG4gICAgZG9jLFxuICAgIFByb21pc2UsXG4gICAgcXVlcnksXG4gICAgcXVlcnlBbGwsXG4gICAgZ2V0UmVjdCxcbiAgICBnZXREaXN0YW5jZSxcbiAgICByYWYsXG4gICAgZGVsYXlcbn0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wIHtcbiAgICBjb25zdHJ1Y3Rvcih2aWV3cG9ydCkge1xuICAgICAgICB0aGlzLnBvcEVsID0gcXVlcnkodmlld3BvcnQsICcjcG9wJyk7XG4gICAgfVxuXG4gICAgcmVhZHkoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRFbCA9IHF1ZXJ5KHRoaXMucG9wRWwsICcuY29udGVudCcpO1xuICAgICAgICAgICAgdGhpcy5jbG9zZUVsID0gcXVlcnkodGhpcy5wb3BFbCwgJy5wb3BDbG9zZScpO1xuICAgICAgICAgICAgdGhpcy50aXRsZUVsID0gcXVlcnkodGhpcy5wb3BFbCwgJy50aXRsZScpO1xuICAgICAgICAgICAgdGhpcy50ZXh0RWwgPSBxdWVyeSh0aGlzLnBvcEVsLCAnLnRleHQnKTtcbiAgICAgICAgICAgIHRoaXMuYmcxRWwgPSBxdWVyeSh0aGlzLnBvcEVsLCAnLnBvcEJnMScpO1xuICAgICAgICAgICAgdGhpcy5iZzJFbCA9IHF1ZXJ5KHRoaXMucG9wRWwsICcucG9wQmcyJyk7XG4gICAgICAgICAgICB0aGlzLmJ0bnNFbCA9IHF1ZXJ5KHRoaXMucG9wRWwsICcuYnRucycpO1xuICAgICAgICAgICAgdGhpcy5sZWZ0QnRuRWwgPSBxdWVyeSh0aGlzLnBvcEVsLCAnLnBvcEJ0bi5sZWZ0Jyk7XG4gICAgICAgICAgICB0aGlzLnJpZ2h0QnRuRWwgPSBxdWVyeSh0aGlzLnBvcEVsLCAnLnBvcEJ0bi5yaWdodCcpO1xuXG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNsb3NlKCkge1xuICAgICAgICB0aGlzLmNvbnRlbnRFbC5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgICAgIHRoaXMuYnRuc0VsLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgICAgdGhpcy5wb3BFbC5jbGFzc05hbWUgPSB0aGlzLnBvcEVsLmNsYXNzTmFtZS5yZXBsYWNlKCdvcGVuJywgJ2Nsb3NlJyk7XG5cbiAgICAgICAgcmV0dXJuIGRlbGF5KDYwMCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBvcEVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgICAgICAgIHRoaXMucG9wRWwuY2xhc3NOYW1lID0gJyc7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHBvcHVwKHtcbiAgICAgICAgc2hhcmVibGUsXG4gICAgICAgIHRpdGxlLFxuICAgICAgICB0ZXh0LFxuICAgICAgICBiZ1R5cGUsXG4gICAgICAgIG9ubGVmdGNsaWNrLFxuICAgICAgICBvbnJpZ2h0Y2xpY2ssXG4gICAgICAgIG9uY2xvc2VjbGlja1xuICAgIH0pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMucG9wRWwuc3R5bGUuZGlzcGxheSA9ICcnO1xuXG4gICAgICAgICAgICB0aGlzLnRpdGxlRWwudGV4dENvbnRlbnQgPSB0aXRsZTtcbiAgICAgICAgICAgIHRoaXMudGV4dEVsLmlubmVySFRNTCA9IHRleHQ7XG4gICAgICAgICAgICB0aGlzLnBvcEVsLmNsYXNzTmFtZSArPSBgICBiZyR7YmdUeXBlfWA7XG5cbiAgICAgICAgICAgIGlmIChzaGFyZWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucG9wRWwuY2xhc3NOYW1lICs9IGAgc2hhcmVibGVgO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBoYW5kbGVyID0gKGUpID0+IHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5sZWZ0QnRuRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndGFwJywgb25MZWZ0Q2xpY2spO1xuICAgICAgICAgICAgICAgIHRoaXMucmlnaHRCdG5FbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0YXAnLCBvblJpZ2h0Q2xpY2spO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VFbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0YXAnLCBvbkNsb3NlQ2xpY2spO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gb25MZWZ0Q2xpY2soZSkge1xuICAgICAgICAgICAgICAgIGhhbmRsZXIoZSkudGhlbigoKSA9PiBvbmxlZnRjbGljayAmJiBvbmxlZnRjbGljaygpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5sZWZ0QnRuRWwuYWRkRXZlbnRMaXN0ZW5lcigndGFwJywgb25MZWZ0Q2xpY2spO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBvblJpZ2h0Q2xpY2soZSkge1xuICAgICAgICAgICAgICAgIGhhbmRsZXIoZSkudGhlbigoKSA9PiBvbnJpZ2h0Y2xpY2sgJiYgb25yaWdodGNsaWNrKCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnJpZ2h0QnRuRWwuYWRkRXZlbnRMaXN0ZW5lcigndGFwJywgb25SaWdodENsaWNrKTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gb25DbG9zZUNsaWNrKGUpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyKGUpLnRoZW4oKCkgPT4gb25jbG9zZWNsaWNrICYmIG9uY2xvc2VjbGljaygpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jbG9zZUVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RhcCcsIG9uQ2xvc2VDbGljayk7XG5cbiAgICAgICAgICAgIHJhZigoKSA9PiB0aGlzLnBvcEVsLmNsYXNzTmFtZSArPSAnIG9wZW4nKTtcblxuICAgICAgICAgICAgZGVsYXkoNDAwKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRFbC5zdHlsZS52aXNpYmlsaXR5ID0gJyc7XG4gICAgICAgICAgICAgICAgdGhpcy5idG5zRWwuc3R5bGUudmlzaWJpbGl0eSA9ICcnO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3BvcC5qcyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvaW5kZXguanMhLi9wb3AuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLy4uL25vZGVfbW9kdWxlcy8uMC4xMy4xQHN0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvaW5kZXguanMhLi9wb3AuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvaW5kZXguanMhLi9wb3AuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9wb3AuY3NzXG4vLyBtb2R1bGUgaWQgPSAxNjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIiNwb3Age1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHRvcDogMDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWig5OTk5cHgpO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gICAgLXdlYmtpdC1ib3gtcGFjazogY2VudGVyO1xcbiAgICAtd2Via2l0LWJveC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4jcG9wIC53cmFwIHtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuI3BvcCAucG9wUGFuZWwge1xcbiAgICB3aWR0aDogNC4yNnJlbTtcXG4gICAgaGVpZ2h0OiA3Ljg0cmVtO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogOC41MnJlbSA3Ljg0cmVtO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4jcG9wIC5wb3BQYW5lbC5sZWZ0IHtcXG4gICAgbGVmdDogMDtcXG4gICAgdG9wOiAwO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAtMTAwJSAwO1xcbn1cXG5cXG4jcG9wIC5wb3BQYW5lbC5yaWdodCB7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICB0b3A6IDA7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDIwMCUgMDtcXG59XFxuXFxuI3BvcC5vcGVuIC5wb3BQYW5lbC5sZWZ0IHtcXG4gICAgLXdlYmtpdC1hbmltYXRpb246IG9wZW5sZWZ0d2luIDAuNHMgZWFzZS1vdXQgMHMgZm9yd2FyZHM7XFxufVxcblxcbiNwb3Aub3BlbiAucG9wUGFuZWwucmlnaHQge1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogb3BlbnJpZ2h0d2luIDAuNHMgZWFzZS1vdXQgMHMgZm9yd2FyZHM7XFxufVxcblxcbiNwb3AuY2xvc2UgLnBvcFBhbmVsLmxlZnQge1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogY2xvc2VsZWZ0d2luIDAuNHMgZWFzZS1pbiAwcyBmb3J3YXJkcztcXG59XFxuXFxuI3BvcC5jbG9zZSAucG9wUGFuZWwucmlnaHQge1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogY2xvc2VyaWdodHdpbiAwLjRzIGVhc2UtaW4gMHMgZm9yd2FyZHM7XFxufVxcblxcbkAtd2Via2l0LWtleWZyYW1lcyBvcGVubGVmdHdpbiB7XFxuICAgIDAlIHtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IC0xMDAlIDA7XFxuICAgIH1cXG5cXG4gICAgMTAwJSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XFxuICAgIH1cXG59XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIG9wZW5yaWdodHdpbiB7XFxuICAgIDAlIHtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDIwMCUgMDtcXG4gICAgfVxcblxcbiAgICAxMDAlIHtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDEwMCUgMDtcXG4gICAgfVxcbn1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgY2xvc2VsZWZ0d2luIHtcXG4gICAgMCUge1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwO1xcbiAgICB9XFxuXFxuICAgIDEwMCUge1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogLTEwMCUgMDtcXG4gICAgfVxcbn1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgY2xvc2VyaWdodHdpbiB7XFxuICAgIDAlIHtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDEwMCUgMDtcXG4gICAgfVxcblxcbiAgICAxMDAlIHtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDIwMCUgMDtcXG4gICAgfVxcbn1cXG5cXG4jcG9wIC5jb250ZW50IHtcXG4gICAgd2lkdGg6IDguNTNyZW07XFxuICAgIGhlaWdodDogNy44NHJlbTtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4jcG9wIC5wb3BCZzEge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAzLjM2cmVtO1xcbiAgICBoZWlnaHQ6IDIuOTJyZW07XFxuICAgIHJpZ2h0OiA1cHg7XFxuICAgIGJvdHRvbTogMnB4O1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXG59XFxuXFxuI3BvcC5iZzEgLnBvcEJnMSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4jcG9wIC5wb3BCZzIge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiA0LjM2cmVtO1xcbiAgICBoZWlnaHQ6IDMuMzQ2cmVtO1xcbiAgICByaWdodDogNXB4O1xcbiAgICBib3R0b206IDJweDtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XFxufVxcblxcbiNwb3AuYmcyIC5wb3BCZzIge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuI3BvcCAucG9wQmczIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogNC42MjZyZW07XFxuICAgIGhlaWdodDogMy41MDZyZW07XFxuICAgIHJpZ2h0OiA1cHg7XFxuICAgIGJvdHRvbTogMnB4O1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXG59XFxuXFxuI3BvcC5iZzMgLnBvcEJnMyB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4jcG9wIC5wb3BUaXAxIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiAwLjQ2N3JlbTtcXG4gICAgdG9wOiAxLjFyZW07XFxuICAgIHdpZHRoOiAxLjg2N3JlbTtcXG4gICAgaGVpZ2h0OiAxcmVtO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDFyZW07XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXG4gICAgLXdlYmtpdC1hbmltYXRpb246IHR5cGV0ZXh0MSAxLjVzIGxpbmVhciAwcyBpbmZpbml0ZTtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIHR5cGV0ZXh0MSB7XFxuICAgIDAlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMDAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMXJlbTtcXG4gICAgfVxcblxcbiAgICAxNiUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwMCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAxcmVtO1xcbiAgICB9XFxuICAgIDE2LjY2NyUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTgzLjMzMyUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjgzM3JlbTtcXG4gICAgfVxcblxcbiAgICAzMyUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTgzLjMzMyUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjgzM3JlbTtcXG4gICAgfVxcbiAgICAzMy4zMzMlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC02Ni42NjYlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC42NjZyZW07XFxuICAgIH1cXG5cXG4gICAgNDkuOTk5JSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNjYuNjY2JSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuNjY2cmVtO1xcbiAgICB9XFxuICAgIDUwJSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC41cmVtO1xcbiAgICB9XFxuXFxuICAgIDY2JSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC41cmVtO1xcbiAgICB9XFxuICAgIDY2LjY2NiUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTMzLjMzMyUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjMzM3JlbTtcXG4gICAgfVxcblxcbiAgICA4MyUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTMzLjMzMyUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjMzM3JlbTtcXG4gICAgfVxcbiAgICA4My4zMzMlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xNi42NjclKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC4xNjdyZW07XFxuICAgIH1cXG5cXG4gICAgOTkuOTk5JSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTYuNjY3JSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuMTY3cmVtO1xcbiAgICB9XFxuICAgIDEwMCUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwO1xcbiAgICB9XFxufVxcblxcblxcbiNwb3AgLnBvcFRpcDIge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxlZnQ6IDAuNDY3cmVtO1xcbiAgICB0b3A6IDQuNjhyZW07XFxuICAgIHdpZHRoOiAxLjg2N3JlbTtcXG4gICAgaGVpZ2h0OiAxLjU3M3JlbTtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAxLjU3M3JlbTtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogdHlwZXRleHQyIDJzIGxpbmVhciAwcyBpbmZpbml0ZTtcXG59XFxuXFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIHR5cGV0ZXh0MiB7XFxuICAgIDAlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMDAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMS41NzNyZW07XFxuICAgIH1cXG5cXG4gICAgOS45OTklIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMDAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMS41NzNyZW07XFxuICAgIH1cXG4gICAgMTAlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC05MCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAxLjQxNXJlbTtcXG4gICAgfVxcblxcbiAgICAxOS45OTklIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC05MCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAxLjQxNXJlbTtcXG4gICAgfVxcbiAgICAyMCUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTgwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDEuMjU4cmVtO1xcbiAgICB9XFxuXFxuICAgIDI5Ljk5OSUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTgwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDEuMjU4cmVtO1xcbiAgICB9XFxuICAgIDMwJSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNzAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMS4xMDFyZW07XFxuICAgIH1cXG5cXG4gICAgMzkuOTk5JSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNzAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMS4xMDFyZW07XFxuICAgIH1cXG4gICAgNDAlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC02MCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjk0MzhyZW07XFxuICAgIH1cXG5cXG4gICAgNDkuOTk5JSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNjAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC45NDM4cmVtO1xcbiAgICB9XFxuICAgIDUwJSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC43ODY1cmVtO1xcbiAgICB9XFxuXFxuICAgIDU5Ljk5OSUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuNzg2NXJlbTtcXG4gICAgfVxcbiAgICA2MCUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTQwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuNjI5MnJlbTtcXG4gICAgfVxcblxcbiAgICA2OS45OTklIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC00MCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjYyOTJyZW07XFxuICAgIH1cXG4gICAgNzAlIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjQ3MTlyZW07XFxuICAgIH1cXG5cXG4gICAgNzkuOTk5JSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMzAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC40NzE5cmVtO1xcbiAgICB9XFxuICAgIDgwJSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMjAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMC4zMTQ2cmVtO1xcbiAgICB9XFxuXFxuICAgIDg5Ljk5OSUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTIwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuMzE0NnJlbTtcXG4gICAgfVxcbiAgICA5MCUge1xcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDAuMTU3M3JlbTtcXG4gICAgfVxcblxcbiAgICA5OS45OTklIHtcXG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMCUpO1xcbiAgICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwLjE1NzNyZW07XFxuICAgIH1cXG4gICAgMTAwJSB7XFxuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMDtcXG4gICAgfVxcbn1cXG5cXG4jcG9wIC5wb3BJY29uIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiAwLjRyZW07XFxuICAgIHRvcDogMi4yMjZyZW07XFxuICAgIHdpZHRoOiAxLjhyZW07XFxuICAgIGhlaWdodDogMi4yNTNyZW07XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDAgMDtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1zaXplOiAzLjZyZW0gMi4yNTNyZW07XFxuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzcHJpdGVzIDFzIGxpbmVhciAwcyBpbmZpbml0ZTtcXG59XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIHNwcml0ZXMge1xcbiAgICAwJSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XFxuICAgIH1cXG5cXG4gICAgNDkuOTk5JSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XFxuICAgIH1cXG5cXG4gICAgNTAlIHtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IC0xLjhyZW0gMDtcXG4gICAgfVxcblxcbiAgICAxMDAlIHtcXG4gICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IC0xLjhyZW0gMDtcXG4gICAgfSBcXG59XFxuXFxuI3BvcCAudGl0bGUge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiA1cmVtO1xcbiAgICBsZWZ0OiAyLjRyZW07XFxuICAgIHRvcDogMS4yOTNyZW07XFxuICAgIGZvbnQtc2l6ZTogMThweDtcXG4gICAgY29sb3I6ICNGRkY7XFxuICAgIHRleHQtc2hhZG93OlxcbiAgICAgICAgMnB4IDAgMnB4IHJnYmEoMCwgMjAzLCAyMjcsIDAuMyksXFxuICAgICAgICAwIDJweCAycHggcmdiYSgwLCAyMDMsIDIyNywgMC4zKSwgXFxuICAgICAgICAwIC0ycHggMnB4IHJnYmEoMCwgMjAzLCAyMjcsIDAuMyksXFxuICAgICAgICAtMnB4IDAgMnB4IHJnYmEoMCwgMjAzLCAyMjcsIDAuMyk7XFxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxufVxcblxcbiNwb3AgLnRleHQge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiA1cmVtO1xcbiAgICBsZWZ0OiAyLjRyZW07XFxuICAgIHRvcDogMi4yODZyZW07XFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgY29sb3I6ICMwMGNiZTM7XFxuICAgIHRleHQtc2hhZG93OlxcbiAgICAgICAgMXB4IDAgMXB4IHJnYmEoMCwgMjAzLCAyMjcsIDAuMyksXFxuICAgICAgICAwIDFweCAxcHggcmdiYSgwLCAyMDMsIDIyNywgMC4zKSwgXFxuICAgICAgICAwIC0xcHggMXB4IHJnYmEoMCwgMjAzLCAyMjcsIDAuMyksXFxuICAgICAgICAtMXB4IDAgMXB4IHJnYmEoMCwgMjAzLCAyMjcsIDAuMyk7XFxufVxcblxcbiNwb3AgLnBvcENsb3NlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiAwO1xcbiAgICBib3R0b206IDAuNTQ2cmVtO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxLjJyZW07XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogMS4ycmVtIDEuMnJlbTtcXG59XFxuXFxuI3BvcC5zaGFyZWJsZSAucG9wQ2xvc2Uge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4jcG9wIC5idG5zIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIC13ZWJraXQtYm94LXBhY2s6IGNlbnRlcjtcXG4gICAgLXdlYmtpdC1ib3gtYWxpZ246IGNlbnRlcjsgXFxuICAgIHBhZGRpbmctdG9wOiAwLjVyZW07XFxufVxcblxcbiNwb3Auc2hhcmVibGUgLmJ0bnN7XFxuICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbn1cXG5cXG4jcG9wIC5wb3BCdG4ge1xcbiAgICB3aWR0aDogMi42OHJlbTtcXG4gICAgaGVpZ2h0OiAwLjc3M3JlbTtcXG4gICAgbGluZS1oZWlnaHQ6IDAuNzczcmVtO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGNvbG9yOiAjRkZGO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwIDA7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcXG4gICAgbWFyZ2luOiAwIDAuNHJlbTtcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjI1LjBAY3NzLWxvYWRlciEuL3NyYy9wb3AuY3NzXG4vLyBtb2R1bGUgaWQgPSAxNjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICcuL3RpcC5jc3MnO1xuaW1wb3J0IHtcbiAgICB3aW4sXG4gICAgZG9jLFxuICAgIFByb21pc2UsXG4gICAgcXVlcnksXG4gICAgcXVlcnlBbGwsXG4gICAgZ2V0UmVjdCxcbiAgICBnZXREaXN0YW5jZSxcbiAgICByYWYsXG4gICAgZGVsYXlcbn0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlwIHtcbiAgICBjb25zdHJ1Y3Rvcih2aWV3cG9ydCkge1xuICAgICAgICB0aGlzLnRpcEVsID0gcXVlcnkodmlld3BvcnQsICcjdGlwJyk7XG4gICAgfVxuXG4gICAgc2hvdyh7XG4gICAgICAgIHRpcCxcbiAgICAgICAgYmdUeXBlXG4gICAgfSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50aXBFbC5jbGFzc05hbWUgPSAndGlwIG9wZW4nO1xuXG4gICAgICAgICAgICBkZWxheSg0MDApXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpcEVsLmNsYXNzTmFtZSA9IGB0aXAgb3BlbiBiZyR7YmdUeXBlfWA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dEVsLmlubmVySFRNTCA9IHRpcDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlbGF5KDMwMDApO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpcEVsLmNsYXNzTmFtZSA9ICd0aXAgY2xvc2UnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHRFbC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlbGF5KDQwMCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlwRWwuY2xhc3NOYW1lID0gJ3RpcCc7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZWFkeSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMudGV4dEVsID0gcXVlcnkodGhpcy50aXBFbCwgJ3AnKTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90aXAuanMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vdGlwLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi8uLi9ub2RlX21vZHVsZXMvLjAuMTMuMUBzdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vdGlwLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vdGlwLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdGlwLmNzc1xuLy8gbW9kdWxlIGlkID0gMTY5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIjdGlwIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiAwLjcyMzVyZW07XFxuICAgIHRvcDogMS4xcmVtO1xcbiAgICB3aWR0aDogMDtcXG4gICAgaGVpZ2h0OiAwO1xcbiAgICBmb250LXNpemU6IDA7XFxuICAgIGJvcmRlcjogMHB4IHNvbGlkICMwMGRkZjE7XFxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWig5OTk5cHgpO1xcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IHdpZHRoIDAuNHMgZWFzZS1pbiAwcyxcXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQgMC40cyBlYXNlLWluIDBzO1xcbiAgICBvdmVyZmxvdzogdmlzaWJsZTtcXG59XFxuXFxuI3RpcC5vcGVuIHtcXG4gICAgd2lkdGg6IDguNTUzcmVtO1xcbiAgICBoZWlnaHQ6IDEuODY2cmVtO1xcbiAgICBib3JkZXItd2lkdGg6IDFweDtcXG59XFxuXFxuI3RpcC5jbG9zZSB7XFxuICAgIGJvcmRlci13aWR0aDogMXB4O1xcbn1cXG5cXG4jdGlwIHAge1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBsaW5lLWhlaWdodDogMS4yZW07XFxuICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgY29sb3I6ICMwMGRkZjE7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIHBhZGRpbmctbGVmdDogMTIlO1xcbiAgICBwYWRkaW5nLXRvcDogNiU7XFxuICAgIHBhZGRpbmctcmlnaHQ6IDMwJTtcXG4gICAgbWFyZ2luOiAwO1xcblxcbn1cXG5cXG4jdGlwIC5iZyB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICB0b3A6IDA7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogMCAwO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47IFxcbn1cXG5cXG4jdGlwIC50aXBCZzEge1xcbiAgICB3aWR0aDogMi44OTI0cmVtO1xcbiAgICBoZWlnaHQ6IDIuNTJyZW07XFxufVxcblxcbiN0aXAgLnRpcEJnMiB7XFxuICAgIHdpZHRoOiAyLjcwMzZyZW07XFxuICAgIGhlaWdodDogMi4zMzUycmVtO1xcbn1cXG5cXG4jdGlwLmJnMSAudGlwQmcxIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbiN0aXAuYmcyIC50aXBCZzIge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjI1LjBAY3NzLWxvYWRlciEuL3NyYy90aXAuY3NzXG4vLyBtb2R1bGUgaWQgPSAxNzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICcuL3NoYXJlLmNzcyc7XG5pbXBvcnQge1xuICAgIHdpbixcbiAgICBkb2MsXG4gICAgUHJvbWlzZSxcbiAgICBxdWVyeSxcbiAgICBxdWVyeUFsbCxcbiAgICBnZXRSZWN0LFxuICAgIGdldERpc3RhbmNlLFxuICAgIHJhZixcbiAgICBkZWxheVxufSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGFyZSB7XG4gICAgY29uc3RydWN0b3Iodmlld3BvcnQpIHtcbiAgICAgICAgdGhpcy5zaGFyZUVsID0gcXVlcnkodmlld3BvcnQsICcjc2hhcmUnKTtcbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaGlkZSA9IGUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hhcmVFbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0YXAnLCBoaWRlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNoYXJlRWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zaGFyZUVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RhcCcsIGhpZGUpO1xuICAgICAgICAgICAgdGhpcy5zaGFyZUVsLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVhZHkoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2hhcmUuanMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vc2hhcmUuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLy4uL25vZGVfbW9kdWxlcy8uMC4xMy4xQHN0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvaW5kZXguanMhLi9zaGFyZS5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL3NoYXJlLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc2hhcmUuY3NzXG4vLyBtb2R1bGUgaWQgPSAxNzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIiNzaGFyZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbGVmdDogMDtcXG4gICAgdG9wOiAwO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuOCk7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IHJpZ2h0IHRvcDtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVooOTk5OXB4KTtcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjI1LjBAY3NzLWxvYWRlciEuL3NyYy9zaGFyZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDE3M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgJy4vbXVzaWMuY3NzJztcbmltcG9ydCB7XG4gICAgd2luLFxuICAgIGRvYyxcbiAgICBQcm9taXNlLFxuICAgIHF1ZXJ5LFxuICAgIHF1ZXJ5QWxsLFxuICAgIGdldFJlY3QsXG4gICAgZ2V0RGlzdGFuY2UsXG4gICAgcmFmLFxuICAgIGRlbGF5XG59IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE11c2ljIHtcbiAgICBjb25zdHJ1Y3Rvcih2aWV3cG9ydCwgaXRlbXMpIHtcbiAgICAgICAgdGhpcy5tdXNpY0VsID0gcXVlcnkodmlld3BvcnQsICcjbXVzaWMnKTtcbiAgICAgICAgdGhpcy5hdWRpbyA9IGl0ZW1zWydtdXNpYyddLm9iajtcbiAgICB9XG5cbiAgICBwbGF5KCkge1xuICAgICAgICB0aGlzLmF1ZGlvLnBsYXkoKTtcbiAgICB9XG5cblxuICAgIHBhdXNlKCkge1xuICAgICAgICB0aGlzLmF1ZGlvLnBhdXNlKCk7XG4gICAgfVxuXG4gICAgcmVhZHkoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmF1ZGlvLmxvb3AgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5tdXNpY0VsLnN0eWxlLmRpc3BsYXkgPSAnJztcblxuICAgICAgICAgICAgdGhpcy5tdXNpY0VsLmFkZEV2ZW50TGlzdGVuZXIoJ3RhcCcsIGUgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5hdWRpby5wYXVzZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdWRpby5wYXVzZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm11c2ljRWwuY2xhc3NOYW1lID0gJ211dGUnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXVkaW8ucGxheSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm11c2ljRWwuY2xhc3NOYW1lID0gJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tdXNpYy5qcyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvaW5kZXguanMhLi9tdXNpYy5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjEzLjFAc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL211c2ljLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vbXVzaWMuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9tdXNpYy5jc3Ncbi8vIG1vZHVsZSBpZCA9IDE3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiI211c2ljIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiAwLjNyZW07XFxuICAgIHRvcDogMC41cmVtO1xcbiAgICBwYWRkaW5nLXJpZ2h0OiAwLjNyZW07XFxuICAgIHBhZGRpbmctYm90dG9tOiAwLjVyZW07XFxufVxcblxcbiNtdXNpYyBkaXYge1xcbiAgICB3aWR0aDogMC40OTMzM3JlbTtcXG4gICAgaGVpZ2h0OiAwLjQ0cmVtO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBsZWZ0IDA7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogMS4wNjY2NjY2N3JlbSAwLjQ0cmVtO1xcbn1cXG5cXG4jbXVzaWMubXV0ZSBkaXYge1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiByaWdodCAwO1xcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMjUuMEBjc3MtbG9hZGVyIS4vc3JjL211c2ljLmNzc1xuLy8gbW9kdWxlIGlkID0gMTc2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBsb2FkaW5nOiB7XG4gICAgICAgIHRleHRzOiBbXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgWyfmrKLov47mnaXliLBUR1DmuLjmiI/kuJbnlYwnXSxcbiAgICAgICAgICAgICAgICBbJ+asoui/juadpeWIsFRHUOa4uOaIj+S4lueVjCddLFxuICAgICAgICAgICAgICAgIFsn5qyi6L+O5p2l5YiwVEdQ5ri45oiP5LiW55WMJ10sXG4gICAgICAgICAgICAgICAgWyfmrKLov47mnaXliLBUR1DmuLjmiI/kuJbnlYwnXVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbJ+asoui/juadpeWIsFRHUOa4uOaIj+S4lueVjCddLFxuICAgICAgICAgICAgICAgIFsn5qyi6L+O5p2l5YiwVEdQ5ri45oiP5LiW55WMJ10sXG4gICAgICAgICAgICAgICAgWyfmrKLov47mnaXliLBUR1DmuLjmiI/kuJbnlYwnXVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbJ+asoui/juadpeWIsFRHUOa4uOaIj+S4lueVjCddLFxuICAgICAgICAgICAgICAgIFsn5qyi6L+O5p2l5YiwVEdQ5ri45oiP5LiW55WMJ10sXG4gICAgICAgICAgICAgICAgWyfmrKLov47mnaXliLBUR1DmuLjmiI/kuJbnlYwnXSxcbiAgICAgICAgICAgICAgICBbJ+asoui/juadpeWIsFRHUOa4uOaIj+S4lueVjCddLFxuICAgICAgICAgICAgICAgIFsn5qyi6L+O5p2l5YiwVEdQ5ri45oiP5LiW55WMJ11cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgWyfmrKLov47mnaXliLBUR1DmuLjmiI/kuJbnlYwnXSxcbiAgICAgICAgICAgICAgICBbJ+asoui/juadpeWIsFRHUOa4uOaIj+S4lueVjCddLFxuICAgICAgICAgICAgICAgIFsn5qyi6L+O5p2l5YiwVEdQ5ri45oiP5LiW55WMJ10sXG4gICAgICAgICAgICAgICAgWyfmrKLov47mnaXliLBUR1DmuLjmiI/kuJbnlYwnXVxuICAgICAgICAgICAgXSAgIFxuICAgICAgICBdXG4gICAgfSxcblxuICAgIGdsOiB7IC8vIOW8gOWcuuW8leWvvFxuICAgICAgICB0eXBlOiAncG9wdXAnLFxuICAgICAgICB0aXRsZTogJ+asoui/juadpeWIsFRHUOa4uOaIj+S4lueVjCcsXG4gICAgICAgIHRleHQ6ICfmlaPluIPlnKjlroflrpnkuK3nmoTnpZ7np5jlipvph4/vvIzmib7liLDku5bku6zvvIznpZ7np5jigJzpuKHohb/igJ3lnKjnrYnkvaAnLFxuICAgICAgICBzaGFyZWJsZTogZmFsc2UsXG4gICAgICAgIGJnVHlwZTogMVxuICAgIH0sXG5cbiAgICBmb3VuZDU6IHsgLy8g5om+5YiwNeS4qlxuICAgICAgICB0eXBlOiAndGlwJyxcbiAgICAgICAgdGlwOiAn6LWe77yB5bey5Y+R546wNeS4qua4uOaIj+aYn+eQg+OAgjxici8+56We56eY4oCd6bih6IW/4oCd5bCx5Zyo5pif56m65rex5aSE77yM562J5L2g5ZOf77yBJyxcbiAgICAgICAgYmdUeXBlOiAxXG4gICAgfSxcblxuICAgIGZvdW5kMTU6IHsgLy8g5om+5YiwMTXkuKpcbiAgICAgICAgdHlwZTogJ3RpcCcsXG4gICAgICAgIHRpcDogJ+WViu+8gei/mOW3rjXkuKrvvIE8YnIvPuemu+KAnOm4oeiFv+KAnei/mOW3rjXkuKrvvIEnLFxuICAgICAgICBiZ1R5cGU6IDJcbiAgICB9LFxuXG4gICAgZm91bmQyMDogeyAvLyDmib7liLAyMOS4qlxuICAgICAgICB0eXBlOiAncG9wdXAnLFxuICAgICAgICB0aXRsZTogJ+aJvuWIsOWFqOmDqOa4uOaIj+aYn+eQg++8gScsXG4gICAgICAgIHRleHQ6ICfmiJHljrvvvIHkvaDov5jnnJ/mib7lhajkuobvvIE8YnIvPue7mei3qu+8jOivt+aUtuS4i+aIkeeahOm4oeiFv++8gScsXG4gICAgICAgIGJnVHlwZTogMyxcbiAgICAgICAgc2hhcmVibGU6IHRydWVcbiAgICB9LFxuXG4gICAgYmxhY2tzaGVlcHdhbGw6IHsgLy8g5Zyw5Zu+5YWo5byAXG4gICAgICAgIHR5cGU6ICdwb3B1cCcsXG4gICAgICAgIHRpdGxlOiAn5o6i57Si5LqG5pW05Liq5a6H5a6Z77yBJyxcbiAgICAgICAgdGV4dDogJ+WLpOWli+eahOWwkeW5tO+8jOWuh+WumeaYr+S4jeaYr+WFhea7oeS6huWlpeWmme+8jOWOu1RHUOeahOa4uOaIj+S4lueVjO+8jOmCo+mHjOS5n+aYr+S4gOagt+OAgicsXG4gICAgICAgIGJnVHlwZTogMixcbiAgICAgICAgc2hhcmVibGU6IHRydWVcbiAgICB9LFxuXG4gICAgZ2c6IHsgLy/lnLDlm77lhajlvIAgKyDmib7liLAyMOS4qlxuICAgICAgICB0eXBlOiAncG9wdXAnLMKgXG4gICAgICAgIHRpdGxlOiAn5om+5Yiw5YWo6YOo5ri45oiP5pif55CD77yBJyxcbiAgICAgICAgdGV4dDogJ+iHs+atpOS9oOW3sueci+WujO+8jOWlpeWmmeeahOWuh+WumeWSjOe6t+e5geeahFRHUOS4lueVjO+8jOS9oOWPr+S7peWOu+WIhuS6q+S6huOAgicsXG4gICAgICAgIGJnVHlwZTogMyxcbiAgICAgICAgc2hhcmVibGU6IHRydWVcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3RleHRDb25maWcuanMiXSwic291cmNlUm9vdCI6IiJ9