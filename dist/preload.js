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

	module.exports = __webpack_require__(167);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
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
/* 61 */,
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
/* 104 */,
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
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
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
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
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
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
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
/* 163 */,
/* 164 */,
/* 165 */,
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

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _keys = __webpack_require__(139);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _slicedToArray2 = __webpack_require__(125);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _toConsumableArray2 = __webpack_require__(7);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	__webpack_require__(168);
	
	var _assets = __webpack_require__(170);
	
	var _util = __webpack_require__(6);
	
	var _textConfig = __webpack_require__(166);
	
	var _textConfig2 = _interopRequireDefault(_textConfig);
	
	var _ticker = __webpack_require__(147);
	
	var _ticker2 = _interopRequireDefault(_ticker);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var items = {};
	window.assetsItems = items;
	
	var preloadWrapEl = (0, _util.query)(_util.doc.body, '#preload');
	var gameWrapEl = (0, _util.query)(_util.doc.body, '#game');
	var bg1El = (0, _util.query)(preloadWrapEl, '.bg1');
	var bg2El = (0, _util.query)(preloadWrapEl, '.bg2');
	var textsEl = (0, _util.query)(preloadWrapEl, '.texts');
	
	function setBackgrounImage(viewport, id, src) {
	    var els = viewport.querySelectorAll('.' + id + '[rol="image"]');
	    if (!els.length && viewport.className.indexOf(id) > -1 && viewport.getAttribute('rol') === 'image') {
	        els = [viewport];
	    }
	    [].concat((0, _toConsumableArray3.default)(els)).forEach(function (el) {
	        if (el) {
	            el.style.backgroundImage = 'url(' + src + ')';
	        }
	    });
	}
	
	function getProgress(sVal, eVal, loaded, total) {
	    var percent = (loaded / total).toFixed(2);
	    var val = Math.round(sVal + (eVal - sVal) * percent);
	    return [percent, val];
	}
	
	function setBgClear(val) {
	    bg2El.style.opacity = val / 100;
	}
	
	function fileload(e, viewport) {
	    var item = e.item;
	
	    items[item.id] = item;
	
	    if (item.type === _util.createjs.AbstractLoader.IMAGE) {
	        setBackgrounImage(viewport, item.id, item.src);
	    } else if (item.type === _util.createjs.AbstractLoader.TEXT) {
	        (0, _util.appendStyle)('\n            @font-face {\n                font-family: \'ventouse\';\n                src: url(' + item.src + ') format(\'truetype\');\n            }\n\n            .ventouse {\n                font-family: \'ventouse\';\n                font-style: normal;\n                -webkit-font-smoothing: antialiased;\n                -webkit-text-stroke-width: 0.2px;\n            }\n        ');
	    }
	}
	
	var loadPreloadManifest = function loadPreloadManifest(viewport) {
	    return new _util.Promise(function (resolve, reject) {
	        var queue = new _util.createjs.LoadQueue(true);
	
	        queue.on('fileload', function (e) {
	            return fileload(e, viewport);
	        });
	
	        queue.on('progress', function (e) {
	            var loaded = e.loaded,
	                total = e.total;
	
	            var _getProgress = getProgress(0, 10, loaded, total),
	                _getProgress2 = (0, _slicedToArray3.default)(_getProgress, 2),
	                percent = _getProgress2[0],
	                val = _getProgress2[1];
	
	            setBgClear(val);
	        });
	
	        queue.on('error', function () {
	            return reject(viewport);
	        });
	
	        queue.on('complete', function () {
	            return resolve(viewport);
	        });
	
	        queue.loadManifest(_assets.preload);
	    });
	};
	
	var loadGameManifest = function loadGameManifest(viewport) {
	    return new _util.Promise(function (resolve, reject) {
	        var queue = new _util.createjs.LoadQueue(true);
	
	        queue.on('fileload', function (e) {
	            return fileload(e, viewport);
	        });
	
	        queue.on('progress', function (e) {
	            var loaded = e.loaded,
	                total = e.total;
	
	            var _getProgress3 = getProgress(10, 100, loaded, total),
	                _getProgress4 = (0, _slicedToArray3.default)(_getProgress3, 2),
	                percent = _getProgress4[0],
	                val = _getProgress4[1];
	
	            setBgClear(val);
	        });
	
	        queue.on('error', function () {
	            return reject(viewport);
	        });
	
	        queue.on('complete', function () {
	            return resolve(viewport);
	        });
	
	        _assets.game.forEach(function (assets) {
	            return queue.loadManifest(assets);
	        });
	    });
	};
	
	var loadImgObject = function loadImgObject(items) {
	    var promises = (0, _keys2.default)(items).filter(function (key) {
	        return items[key].type === _util.createjs.AbstractLoader.IMAGE;
	    }).map(function (key) {
	        var item = items[key];
	
	        var _loadImg = (0, _util.loadImg)(item.src),
	            _loadImg2 = (0, _slicedToArray3.default)(_loadImg, 2),
	            image = _loadImg2[0],
	            promise = _loadImg2[1];
	
	        item.obj = image;
	        return promise;
	    });
	    return _util.Promise.all(promises);
	};
	
	var ticker = new _ticker2.default();
	var tickId = void 0;
	
	window.assetsPreload = (0, _util.domready)().then(function () {
	    ticker.run();
	
	    var texts = _textConfig2.default.loading.texts;
	    var textPLen = texts.length;
	    var textPIndex = 0;
	    var textLIndex = 0;
	    var sumDelta = 301;
	
	    tickId = ticker.add(function (_ref) {
	        var delta = _ref.delta,
	            elapsed = _ref.elapsed;
	
	        if (sumDelta > 300) {
	            sumDelta = 0;
	            var p = texts[textPIndex];
	            var t = p[textLIndex];
	
	            if (textLIndex === p.length) {
	                textPIndex = (textPIndex + 1) % textPLen;
	                textLIndex = 0;
	                textsEl.innerHTML = '';
	
	                p = texts[textPIndex];
	                t = p[textLIndex];
	            }
	
	            var el = document.createElement('p');
	            el.textContent = t;
	            textsEl.appendChild(el);
	
	            textLIndex++;
	        } else {
	            sumDelta += delta;
	        }
	    });
	}).then(function () {
	    // load preload manifest
	    preloadWrapEl.style.display = 'block';
	    return loadPreloadManifest(preloadWrapEl);
	}).then(function () {
	    // load game manifest
	    return loadGameManifest(gameWrapEl);
	}).then(function () {
	    ticker.cancel();
	    preloadWrapEl.style.display = 'none';
	    gameWrapEl.style.display = 'block';
	    return loadImgObject(items);
	});

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(169);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
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
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports
	
	
	// module
	exports.push([module.id, "#preload {}\n\n#preload .bg1,\n    #preload .bg2 {\n    width: 100%;\n    height: 100%;\n    background-position: left bottom;\n    background-repeat: no-repeat;\n    background-size: cover;\n    position: absolute;\n    left: 0;\n    top: 0;\n}\n\n#preload .bg2 {\n    opacity: 0;\n}\n\n#preload .texts {\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    left: 0;\n    top: 0;\n    display: -webkit-box;\n    -webkit-box-pack: center;\n    -webkit-box-align: center;\n    -webkit-box-orient: vertical;\n    box-sizing: border-box;\n    padding-top: 4rem;\n}\n\n#preload .texts p {\n    line-height: 1.5em;\n    padding: 0;\n    margin: 0;\n    font-size: 12px;\n    color: #00cbe3;\n    text-shadow:\n        1px 0 1px rgba(0, 203, 227, 0.3),\n        0 1px 1px rgba(0, 203, 227, 0.3), \n        0 -1px 1px rgba(0, 203, 227, 0.3),\n        -1px 0 1px rgba(0, 203, 227, 0.3);\n}", ""]);
	
	// exports


/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.game = exports.preload = undefined;
	
	var _keys = __webpack_require__(139);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _amfeEnv = __webpack_require__(171);
	
	var _sliceConfig = __webpack_require__(132);
	
	var _sliceConfig2 = _interopRequireDefault(_sliceConfig);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var assetsPrefix = _amfeEnv.os.isIOS ? '2x' : '1x';
	
	var preload = exports.preload = {
	    path: 'assets/' + assetsPrefix + '/preload/',
	    manifest: [{ id: 'bg1', src: 'bg1.jpg' }, { id: 'bg2', src: 'bg2.jpg' }]
	};
	
	var openingManifest = [{
	    id: 'openingChicken', src: 'chicken.png'
	}];
	var openingFrameCount = 30;
	var openingStarCount = 3;
	for (var i = 1; i <= openingFrameCount; i++) {
	    openingManifest.push({
	        id: 'opening' + i,
	        src: i + '.png'
	    });
	}
	
	for (var _i = 1; _i <= openingStarCount; _i++) {
	    openingManifest.push({
	        id: 'openingStar' + _i,
	        src: 'star-' + _i + '.png'
	    });
	}
	
	var elementsManifest = [];
	(0, _keys2.default)(_sliceConfig2.default).forEach(function (key) {
	    if (key.match(/^\d+$/)) {
	        var config = _sliceConfig2.default[key];
	        if (config.type >= 1) {
	            elementsManifest.push({
	                id: 'i' + key + '-e-s',
	                src: 'i' + key + '-e-s.png'
	            });
	        }
	
	        if (config.type >= 2) {
	            elementsManifest.push({
	                id: 'i' + key + '-e-w',
	                src: 'i' + key + '-e-w.png'
	            });
	        }
	
	        if (config.type >= 3) {
	            elementsManifest.push({
	                id: 'i' + key + '-e-g',
	                src: 'i' + key + '-e-g.png'
	            });
	        }
	    }
	});
	
	var game = exports.game = [{
	    path: 'assets/' + assetsPrefix + '/game/',
	    manifest: [{ id: 'star', src: 'star.jpg' }, { id: 'helloworld', src: 'helloworld.png' }, { id: 'cloud', src: 'cloud.png' }, { id: 'popPanel', src: 'popPanel.png' }, { id: 'popTip1', src: 'popTip-1.png' }, { id: 'popTip2', src: 'popTip-2.png' }, { id: 'popIcon', src: 'popIcon.png' }, { id: 'popClose', src: 'popClose.png' }, { id: 'popBtn', src: 'popBtn.png' }, { id: 'popBg1', src: 'popBg-1.png' }, { id: 'popBg2', src: 'popBg-2.png' }, { id: 'popBg3', src: 'popBg-3.png' }, { id: 'tipBg1', src: 'tipBg-1.png' }, { id: 'tipBg2', src: 'tipBg-2.png' }, { id: 'coin1', src: 'coin-1.png' }, { id: 'coin2', src: 'coin-2.png' }, { id: 'coin3', src: 'coin-3.png' }, { id: 'coin4', src: 'coin-4.png' }, { id: 'coin5', src: 'coin-5.png' }, { id: 'coin6', src: 'coin-6.png' }]
	}, {
	    path: 'assets/' + assetsPrefix + '/game/opening/',
	    manifest: openingManifest
	}, {
	    path: 'assets/' + assetsPrefix + '/game/elements/',
	    manifest: elementsManifest
	}, {
	    path: 'assets/',
	    manifest: ['font.ttf']
	}, {
	    path: 'dist/',
	    manifest: ['game.js']
	}];

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Version = exports.params = exports.thirdapp = exports.aliapp = exports.os = exports.browser = undefined;
	
	var _aliapp = __webpack_require__(172);
	
	var _aliapp2 = _interopRequireDefault(_aliapp);
	
	var _browser = __webpack_require__(175);
	
	var _browser2 = _interopRequireDefault(_browser);
	
	var _os = __webpack_require__(174);
	
	var _os2 = _interopRequireDefault(_os);
	
	var _thirdapp = __webpack_require__(176);
	
	var _thirdapp2 = _interopRequireDefault(_thirdapp);
	
	var _params = __webpack_require__(177);
	
	var _params2 = _interopRequireDefault(_params);
	
	var _version = __webpack_require__(173);
	
	var _version2 = _interopRequireDefault(_version);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.browser = _browser2.default;
	exports.os = _os2.default;
	exports.aliapp = _aliapp2.default;
	exports.thirdapp = _thirdapp2.default;
	exports.params = _params2.default;
	exports.Version = _version2.default;

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _version = __webpack_require__(173);
	
	var _version2 = _interopRequireDefault(_version);
	
	var _os = __webpack_require__(174);
	
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
/* 173 */
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
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _version = __webpack_require__(173);
	
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
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _version = __webpack_require__(173);
	
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
/* 176 */
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
/* 177 */
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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzIzNjk0YmFhMmUzZjU1NTAzMWE/OGZiOSIsIndlYnBhY2s6Ly8vLi9+Ly4wLjI1LjBAY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanM/ZmU5MCIsIndlYnBhY2s6Ly8vLi9+Ly4wLjEzLjFAc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qcz85MmQxIiwid2VicGFjazovLy8uL3NyYy91dGlsLmpzP2FkMDAiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy90b0NvbnN1bWFibGVBcnJheS5qcz8zODVmIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvYXJyYXkvZnJvbS5qcz8zNzdmIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9hcnJheS9mcm9tLmpzPzk3NjgiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qcz8wNDRmIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanM/M2Q5YiIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcz80NTFjIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzP2E3MzYiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzPzA0YTciLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2xpYnJhcnkuanM/ZTgzMCIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzP2UxOTUiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcz9hZWM0Iiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzPzk0NTQiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qcz9kZTQ0Iiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzP2UzNDMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanM/ZDU0NSIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzPzdlODEiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qcz9lMDBmIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanM/OTEwZCIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanM/MWY4OSIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanM/NDBhOSIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanM/N2IxOCIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcz9jYTc0Iiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanM/Y2U1MSIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcz8zMDc5Iiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS5qcz84MGM4Iiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanM/OTgxMiIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlcmF0b3JzLmpzPzMzYzgiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY3JlYXRlLmpzP2RmZGYiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1jcmVhdGUuanM/NGE0MCIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwcy5qcz85YTVmIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy5qcz9jZTAzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qcz9kMDUzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzPzQzM2QiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanM/YjU1ZSIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzPzFhMDMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzPzdkYzYiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWxlbmd0aC5qcz9iYTAwIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbmRleC5qcz8xZTkxIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzPzEwYjQiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qcz8yMTI5Iiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanM/MzUzYSIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcz8xOTA1Iiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19odG1sLmpzPzc2NjciLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzP2FjMDciLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy5qcz8zMjRlIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ3BvLmpzPzc3MTgiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcz83ZDhjIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5mcm9tLmpzP2UzODkiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY2FsbC5qcz80ZDhhIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzPzA1MWQiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NyZWF0ZS1wcm9wZXJ0eS5qcz8zZDJhIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qcz84OWRhIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jbGFzc29mLmpzPzM1YjAiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGV0ZWN0LmpzPzU5OGUiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qcz85MzY1Iiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qcz9jM2Q5Iiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LXByb3RvdHlwZS1vZi5qcz8zODUzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qtc2FwLmpzPzMzOTIiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qcz83YzI0Iiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MuanM/ZWUwMSIsIndlYnBhY2s6Ly8vLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanM/YzRkYiIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcz9jMjhjIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzPzIxMzciLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuLmpzPzdmMzUiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy90eXBlb2YuanM/MzljOSIsIndlYnBhY2s6Ly8vLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvci5qcz9iOWQ4Iiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaXRlcmF0b3IuanM/ZTkyYyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzPzU3YTAiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzPzlkOGUiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qcz85ZjdiIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLXN0ZXAuanM/OTgyZiIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWV4dC5qcz8yZGZiIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sLmpzPzEyOWQiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pbmRleC5qcz8wOGNlIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zeW1ib2wuanM/OWViNiIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWV0YS5qcz8zNmY1Iiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MtZGVmaW5lLmpzPzM2MGYiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2tleW9mLmpzPzc1NzIiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0ta2V5cy5qcz82M2QyIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wcy5qcz80NWFjIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtcGllLmpzPzUwZjQiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LmpzPzkxYmIiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BuLWV4dC5qcz8yZmU4Iiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi5qcz9lOWUzIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wZC5qcz8yZWY2Iiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3IuanM/N2RmYSIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUuanM/YjM5ZCIsIndlYnBhY2s6Ly8vLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9oZWxwZXJzL2luaGVyaXRzLmpzPzVlNjIiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qcz83NDNiIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qcz81ZjljIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZi5qcz84YTE0Iiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtcHJvdG8uanM/MWE3NiIsIndlYnBhY2s6Ly8vLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9jcmVhdGUuanM/YzFjMSIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZS5qcz8wZTdmIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuY3JlYXRlLmpzPzhkYjYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V2ZW50LmpzP2QwNjAiLCJ3ZWJwYWNrOi8vLy4vfi8uMC4zLjRAZXZlbnQtZW1pdHRlci9pbmRleC5qcz9mNGM5Iiwid2VicGFjazovLy8uL34vLjAuMS4xQGQvaW5kZXguanM/ZDI5YSIsIndlYnBhY2s6Ly8vLi9+Ly4wLjEwLjEyQGVzNS1leHQvb2JqZWN0L2Fzc2lnbi9pbmRleC5qcz9jNWRmIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3QvYXNzaWduL2lzLWltcGxlbWVudGVkLmpzP2IyNGUiLCJ3ZWJwYWNrOi8vLy4vfi8uMC4xMC4xMkBlczUtZXh0L29iamVjdC9hc3NpZ24vc2hpbS5qcz9mOTFhIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3Qva2V5cy9pbmRleC5qcz9lY2VmIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3Qva2V5cy9pcy1pbXBsZW1lbnRlZC5qcz9hYjViIiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3Qva2V5cy9zaGltLmpzP2VkYWYiLCJ3ZWJwYWNrOi8vLy4vfi8uMC4xMC4xMkBlczUtZXh0L29iamVjdC92YWxpZC12YWx1ZS5qcz8yNDY1Iiwid2VicGFjazovLy8uL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3Qvbm9ybWFsaXplLW9wdGlvbnMuanM/NDhlOCIsIndlYnBhY2s6Ly8vLi9+Ly4wLjEwLjEyQGVzNS1leHQvb2JqZWN0L2lzLWNhbGxhYmxlLmpzP2IzNTYiLCJ3ZWJwYWNrOi8vLy4vfi8uMC4xMC4xMkBlczUtZXh0L3N0cmluZy8jL2NvbnRhaW5zL2luZGV4LmpzPzc0ZTMiLCJ3ZWJwYWNrOi8vLy4vfi8uMC4xMC4xMkBlczUtZXh0L3N0cmluZy8jL2NvbnRhaW5zL2lzLWltcGxlbWVudGVkLmpzP2IzNzMiLCJ3ZWJwYWNrOi8vLy4vfi8uMC4xMC4xMkBlczUtZXh0L3N0cmluZy8jL2NvbnRhaW5zL3NoaW0uanM/MzVkNCIsIndlYnBhY2s6Ly8vLi9+Ly4wLjEwLjEyQGVzNS1leHQvb2JqZWN0L3ZhbGlkLWNhbGxhYmxlLmpzPzUwNWYiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzPzlkMWMiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9pcy1pdGVyYWJsZS5qcz9iZjVhIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZS5qcz8zNzQ5Iiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUuanM/N2RiZCIsIndlYnBhY2s6Ly8vLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvci5qcz82NjRmIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3IuanM/YzU1NyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci5qcz80ODcxIiwid2VicGFjazovLy8uL3NyYy9zbGljZUNvbmZpZy5qcz8xMjFlIiwid2VicGFjazovLy8uL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2tleXMuanM/ZWVmOSIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXMuanM/NWE0ZSIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmtleXMuanM/YTk0NiIsIndlYnBhY2s6Ly8vLi9zcmMvdGlja2VyLmpzPzM0MDEiLCJ3ZWJwYWNrOi8vLy4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9tYXAuanM/YWQ5OSIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vbWFwLmpzPzhhOTQiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm1hcC5qcz8zMDljIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2xsZWN0aW9uLXN0cm9uZy5qcz9hMjQ0Iiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS1hbGwuanM/MjkwMSIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4taW5zdGFuY2UuanM/NmVkZSIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZm9yLW9mLmpzPzJiMTMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1zcGVjaWVzLmpzP2U5MjAiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvbGxlY3Rpb24uanM/ZDFhNCIsIndlYnBhY2s6Ly8vLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktbWV0aG9kcy5qcz9lZDRmIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1zcGVjaWVzLWNyZWF0ZS5qcz8xOGY3Iiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1zcGVjaWVzLWNvbnN0cnVjdG9yLmpzP2QyZDkiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3Lm1hcC50by1qc29uLmpzPzMzNzUiLCJ3ZWJwYWNrOi8vLy4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvbGxlY3Rpb24tdG8tanNvbi5qcz9mMTUyIiwid2VicGFjazovLy8uL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1mcm9tLWl0ZXJhYmxlLmpzPzg0MmYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RleHRDb25maWcuanM/N2U0NSIsIndlYnBhY2s6Ly8vLi9zcmMvcHJlbG9hZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJlbG9hZC5jc3M/ZTU2YyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJlbG9hZC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjAuMEBhbWZlLWVudi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi4wLjBAYW1mZS1lbnYvc3JjL2FsaWFwcC5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjAuMEBhbWZlLWVudi9zcmMvdmVyc2lvbi5qcyIsIndlYnBhY2s6Ly8vLi9+Ly4yLjAuMEBhbWZlLWVudi9zcmMvb3MuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi4wLjBAYW1mZS1lbnYvc3JjL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi8uMi4wLjBAYW1mZS1lbnYvc3JjL3RoaXJkYXBwLmpzIiwid2VicGFjazovLy8uL34vLjIuMC4wQGFtZmUtZW52L3NyYy9wYXJhbXMuanMiXSwibmFtZXMiOlsid2luIiwid2luZG93IiwiZG9jIiwiZG9jdW1lbnQiLCJQcm9taXNlIiwiY3JlYXRlanMiLCJhcHBlbmRTdHlsZSIsImNzc1RleHQiLCJzdHlsZSIsImNyZWF0ZUVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiYXBwZW5kQ2hpbGQiLCJkb21yZWFkeSIsInJlc29sdmUiLCJyZWplY3QiLCJyZWFkeVN0YXRlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImRlZmVyIiwiZGVmZXJyZWQiLCJwcm9taXNlIiwiZGVsYXkiLCJ0aW1lIiwic2V0VGltZW91dCIsInF1ZXJ5Iiwidmlld3BvcnQiLCJzZWxlY3RvciIsInF1ZXJ5U2VsZWN0b3IiLCJxdWVyeUFsbCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJnZXRSZWN0IiwiZWwiLCJyZWN0cyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImdldERpc3RhbmNlIiwieDEiLCJ5MSIsIngyIiwieTIiLCJNYXRoIiwic3FydCIsImxvYWRJbWciLCJzcmMiLCJpbWFnZSIsIkltYWdlIiwib25sb2FkIiwiaW1nMkNhbnZhcyIsIndpZHRoIiwiaGVpZ2h0IiwiY2FudmFzIiwiY29udGV4dCIsImdldENvbnRleHQiLCJkcmF3SW1hZ2UiLCJyYWYiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ3ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJmbiIsImNhZiIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwid2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJpZCIsImNsZWFyVGltZW91dCIsIkV2ZW50IiwicHJvdG90eXBlIiwidHlwZSIsImRpc3RhbmNlIiwiY29pblgiLCJjb2luWSIsIlRpY2tlciIsImFyZ3MiLCJfaWQiLCJfbWFwRiIsIl9tYXBDIiwiZiIsImhhcyIsInNldCIsImNhbmNlbCIsInN0YXJ0IiwiZWxhcHNlZCIsImRlbHRhIiwiZ2V0IiwiYyIsImRlbGV0ZSIsInJpZCIsIkRhdGUiLCJub3ciLCJ0aWNrIiwiZW1pdCIsImtleXMiLCJmb3JFYWNoIiwibG9hZGluZyIsInRleHRzIiwiZ2wiLCJ0aXRsZSIsInRleHQiLCJzaGFyZWJsZSIsImJnVHlwZSIsImZvdW5kNSIsInRpcCIsImZvdW5kMTUiLCJmb3VuZDIwIiwiYmxhY2tzaGVlcHdhbGwiLCJnZyIsIml0ZW1zIiwiYXNzZXRzSXRlbXMiLCJwcmVsb2FkV3JhcEVsIiwiYm9keSIsImdhbWVXcmFwRWwiLCJiZzFFbCIsImJnMkVsIiwidGV4dHNFbCIsInNldEJhY2tncm91bkltYWdlIiwiZWxzIiwibGVuZ3RoIiwiY2xhc3NOYW1lIiwiaW5kZXhPZiIsImdldEF0dHJpYnV0ZSIsImJhY2tncm91bmRJbWFnZSIsImdldFByb2dyZXNzIiwic1ZhbCIsImVWYWwiLCJsb2FkZWQiLCJ0b3RhbCIsInBlcmNlbnQiLCJ0b0ZpeGVkIiwidmFsIiwicm91bmQiLCJzZXRCZ0NsZWFyIiwib3BhY2l0eSIsImZpbGVsb2FkIiwiZSIsIml0ZW0iLCJBYnN0cmFjdExvYWRlciIsIklNQUdFIiwiVEVYVCIsImxvYWRQcmVsb2FkTWFuaWZlc3QiLCJxdWV1ZSIsIkxvYWRRdWV1ZSIsIm9uIiwibG9hZE1hbmlmZXN0IiwibG9hZEdhbWVNYW5pZmVzdCIsImFzc2V0cyIsImxvYWRJbWdPYmplY3QiLCJwcm9taXNlcyIsImZpbHRlciIsImtleSIsIm1hcCIsIm9iaiIsImFsbCIsInRpY2tlciIsInRpY2tJZCIsImFzc2V0c1ByZWxvYWQiLCJ0aGVuIiwicnVuIiwidGV4dFBMZW4iLCJ0ZXh0UEluZGV4IiwidGV4dExJbmRleCIsInN1bURlbHRhIiwiYWRkIiwicCIsInQiLCJpbm5lckhUTUwiLCJkaXNwbGF5IiwiYXNzZXRzUHJlZml4IiwiaXNJT1MiLCJwcmVsb2FkIiwicGF0aCIsIm1hbmlmZXN0Iiwib3BlbmluZ01hbmlmZXN0Iiwib3BlbmluZ0ZyYW1lQ291bnQiLCJvcGVuaW5nU3RhckNvdW50IiwiaSIsInB1c2giLCJlbGVtZW50c01hbmlmZXN0IiwibWF0Y2giLCJjb25maWciLCJnYW1lIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0EseUNBQXdDLGdCQUFnQjtBQUN4RCxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQVksb0JBQW9CO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFnQixtQkFBbUI7QUFDbkM7QUFD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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQWtCOztBQUVsQjs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsY0FBYSw0QkFBNEI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE9BQU87O0FBRXBCO0FBQ0EsY0FBYSwyQkFBMkI7QUFDeEM7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMEI7O0FBRTFCO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbklBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQSxVQUFTO0FBQ1Q7QUFDQTs7Ozs7OztBQzlEQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFRO0FBQ1IsZUFBYyxhQUFhLEdBQUcsZUFBZTtBQUM3QztBQUNBOzs7Ozs7O0FDUkE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU8sc0JBQXNCLEVBQUU7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsYUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3JCQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUUsWUFBWSxjQUFjO0FBQzVCOzs7Ozs7O0FDUEE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7O0FDTkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNMQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7Ozs7Ozs7QUNoQkE7O0FBRUE7O0FBRUEsa0NBQWlDLGtDQUFrQzs7Ozs7OztBQ0puRTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1BBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztBQ05BOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ0xBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHVDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5REFBd0QsK0JBQStCO0FBQ3ZGOztBQUVBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxFQUFDLEc7Ozs7OztBQ2xERCxtQkFBa0IseUQ7Ozs7OztBQ0FsQjtBQUNBO0FBQ0EsMkM7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHOzs7Ozs7QUNSQSxtQkFBa0IseUQ7Ozs7OztBQ0FsQjtBQUNBO0FBQ0EsMkM7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7Ozs7Ozs7O21CQ05lO0FBQ1gsYUFBUTtBQUNKLG1CQUFVLENBRE47QUFFSixtQkFBVSxDQUZOO0FBR0osb0JBQVc7QUFIUCxNQURHO0FBTVgsVUFBSztBQUNEQyxlQUFNO0FBREwsTUFOTTtBQVNYLFVBQUs7QUFDREEsZUFBTTtBQURMLE1BVE07QUFZWCxXQUFNO0FBQ0ZDLG1CQUFVLFFBRFI7QUFFRkQsZUFBTTtBQUZKLE1BWks7QUFnQlgsV0FBTTtBQUNGQyxtQkFBVSxPQURSO0FBRUZELGVBQU07QUFGSixNQWhCSztBQW9CWCxXQUFNO0FBQ0Y1QixhQUFJLElBREY7QUFFRkUsYUFBSSxDQUZGO0FBR0YwQixlQUFNLENBSEo7QUFJRkUsZ0JBQU8sR0FKTDtBQUtGQyxnQkFBTztBQUxMLE1BcEJLO0FBMkJYLFdBQU07QUFDRkYsbUJBQVUsUUFEUjtBQUVGN0IsYUFBSSxJQUZGO0FBR0ZFLGFBQUksQ0FIRjtBQUlGMEIsZUFBTSxDQUpKO0FBS0ZFLGdCQUFPLEdBTEw7QUFNRkMsZ0JBQU87QUFOTCxNQTNCSztBQW1DWCxXQUFNO0FBQ0ZGLG1CQUFVLE9BRFI7QUFFRjdCLGFBQUksSUFGRjtBQUdGRSxhQUFJLENBSEY7QUFJRjBCLGVBQU0sQ0FKSjtBQUtGRSxnQkFBTyxHQUxMO0FBTUZDLGdCQUFPO0FBTkwsTUFuQ0s7QUEyQ1gsV0FBTTtBQUNGL0IsYUFBSSxJQURGO0FBRUZFLGFBQUksQ0FGRjtBQUdGMEIsZUFBTSxDQUhKO0FBSUZFLGdCQUFPLEdBSkw7QUFLRkMsZ0JBQU87QUFMTCxNQTNDSztBQWtEWCxXQUFNO0FBQ0YvQixhQUFJLElBREY7QUFFRkUsYUFBSSxDQUZGO0FBR0YwQixlQUFNLENBSEo7QUFJRkUsZ0JBQU8sR0FKTDtBQUtGQyxnQkFBTztBQUxMLE1BbERLO0FBeURYLFdBQU07QUFDRkYsbUJBQVUsUUFEUjtBQUVGRCxlQUFNO0FBRkosTUF6REs7QUE2RFgsV0FBTTtBQUNGNUIsYUFBSSxJQURGO0FBRUZFLGFBQUksQ0FGRjtBQUdGMEIsZUFBTSxDQUhKO0FBSUZFLGdCQUFPLEdBSkw7QUFLRkMsZ0JBQU87QUFMTCxNQTdESztBQW9FWCxXQUFNO0FBQ0ZGLG1CQUFVLE9BRFI7QUFFRjdCLGFBQUksSUFGRjtBQUdGRSxhQUFJLENBSEY7QUFJRjBCLGVBQU0sQ0FKSjtBQUtGRSxnQkFBTyxHQUxMO0FBTUZDLGdCQUFPO0FBTkwsTUFwRUs7QUE0RVgsV0FBTTtBQUNGRixtQkFBVSxPQURSO0FBRUY3QixhQUFJLElBRkY7QUFHRkUsYUFBSSxDQUhGO0FBSUYwQixlQUFNLENBSko7QUFLRkUsZ0JBQU8sR0FMTDtBQU1GQyxnQkFBTztBQU5MLE1BNUVLO0FBb0ZYLFdBQU07QUFDRkYsbUJBQVUsU0FEUjtBQUVGRCxlQUFNO0FBRkosTUFwRks7QUF3RlgsV0FBTTtBQUNGQyxtQkFBVSxRQURSO0FBRUZELGVBQU07QUFGSixNQXhGSztBQTRGWCxXQUFNO0FBQ0ZDLG1CQUFVLFFBRFI7QUFFRkQsZUFBTTtBQUZKLE1BNUZLO0FBZ0dYLFdBQU07QUFDRkMsbUJBQVUsUUFEUjtBQUVGRCxlQUFNO0FBRkosTUFoR0s7QUFvR1gsV0FBTTtBQUNGQyxtQkFBVSxZQURSO0FBRUZELGVBQU07QUFGSixNQXBHSztBQXdHWCxXQUFNO0FBQ0ZBLGVBQU07QUFESixNQXhHSztBQTJHWCxXQUFNO0FBQ0ZDLG1CQUFVLFlBRFI7QUFFRjdCLGFBQUksSUFGRjtBQUdGRSxhQUFJLENBSEY7QUFJRjBCLGVBQU0sQ0FKSjtBQUtGRSxnQkFBTyxHQUxMO0FBTUZDLGdCQUFPO0FBTkwsTUEzR0s7QUFtSFgsV0FBTTtBQUNGRixtQkFBVSxPQURSO0FBRUY3QixhQUFJLElBRkY7QUFHRkUsYUFBSSxDQUhGO0FBSUYwQixlQUFNLENBSko7QUFLRkUsZ0JBQU8sR0FMTDtBQU1GQyxnQkFBTztBQU5MLE1BbkhLO0FBMkhYLFdBQU07QUFDRi9CLGFBQUksSUFERjtBQUVGRSxhQUFJLENBRkY7QUFHRjBCLGVBQU0sQ0FISjtBQUlGRSxnQkFBTyxHQUpMO0FBS0ZDLGdCQUFPO0FBTEwsTUEzSEs7QUFrSVgsV0FBTTtBQUNGRixtQkFBVSxTQURSO0FBRUZELGVBQU07QUFGSixNQWxJSztBQXNJWCxXQUFNO0FBQ0ZDLG1CQUFVLFVBRFI7QUFFRjdCLGFBQUksSUFGRjtBQUdGRSxhQUFJLENBSEY7QUFJRjBCLGVBQU0sQ0FKSjtBQUtGRSxnQkFBTyxHQUxMO0FBTUZDLGdCQUFPO0FBTkwsTUF0SUs7QUE4SVgsV0FBTTtBQUNGL0IsYUFBSSxJQURGO0FBRUZFLGFBQUksQ0FGRjtBQUdGMEIsZUFBTSxDQUhKO0FBSUZFLGdCQUFPLEdBSkw7QUFLRkMsZ0JBQU87QUFMTCxNQTlJSztBQXFKWCxXQUFNO0FBQ0ZGLG1CQUFVLFNBRFI7QUFFRjdCLGFBQUksSUFGRjtBQUdGRSxhQUFJLENBSEY7QUFJRjBCLGVBQU0sQ0FKSjtBQUtGRSxnQkFBTyxHQUxMO0FBTUZDLGdCQUFPO0FBTkwsTUFySks7QUE2SlgsV0FBTTtBQUNGSCxlQUFNO0FBREosTUE3Sks7QUFnS1gsV0FBTTtBQUNGQyxtQkFBVSxVQURSO0FBRUY3QixhQUFJLElBRkY7QUFHRkUsYUFBSSxDQUhGO0FBSUYwQixlQUFNLENBSko7QUFLRkUsZ0JBQU8sR0FMTDtBQU1GQyxnQkFBTztBQU5MLE1BaEtLO0FBd0tYLFdBQU07QUFDRkgsZUFBTTtBQURKLE1BeEtLO0FBMktYLFdBQU07QUFDRkEsZUFBTTtBQURKLE1BM0tLO0FBOEtYLFlBQU87QUFDSEMsbUJBQVUsU0FEUDtBQUVIRCxlQUFNO0FBRkgsTUE5S0k7QUFrTFgsWUFBTztBQUNIQyxtQkFBVSxRQURQO0FBRUg3QixhQUFJLElBRkQ7QUFHSEUsYUFBSSxDQUhEO0FBSUgwQixlQUFNLENBSkg7QUFLSEUsZ0JBQU8sR0FMSjtBQU1IQyxnQkFBTztBQU5KLE1BbExJO0FBMExYLFlBQU87QUFDSEYsbUJBQVUsU0FEUDtBQUVIN0IsYUFBSSxJQUZEO0FBR0hFLGFBQUksQ0FIRDtBQUlIMEIsZUFBTSxDQUpIO0FBS0hFLGdCQUFPLEdBTEo7QUFNSEMsZ0JBQU87QUFOSixNQTFMSTtBQWtNWCxZQUFPO0FBQ0hILGVBQU07QUFESCxNQWxNSTtBQXFNWCxZQUFPO0FBQ0hDLG1CQUFVLFNBRFA7QUFFSDdCLGFBQUksSUFGRDtBQUdIRSxhQUFJLENBSEQ7QUFJSDBCLGVBQU0sQ0FKSDtBQUtIRSxnQkFBTyxHQUxKO0FBTUhDLGdCQUFPO0FBTkosTUFyTUk7QUE2TVgsWUFBTztBQUNISCxlQUFNO0FBREgsTUE3TUk7QUFnTlgsWUFBTztBQUNIQyxtQkFBVSxLQURQO0FBRUg3QixhQUFJLElBRkQ7QUFHSEUsYUFBSSxDQUhEO0FBSUgwQixlQUFNLENBSkg7QUFLSEUsZ0JBQU8sR0FMSjtBQU1IQyxnQkFBTztBQU5KLE1BaE5JO0FBd05YLFlBQU87QUFDSEgsZUFBTTtBQURILE1BeE5JO0FBMk5YLFlBQU87QUFDSEMsbUJBQVUsU0FEUDtBQUVIN0IsYUFBSSxJQUZEO0FBR0hFLGFBQUksQ0FIRDtBQUlIMEIsZUFBTSxDQUpIO0FBS0hFLGdCQUFPLEdBTEo7QUFNSEMsZ0JBQU87QUFOSixNQTNOSTtBQW1PWCxZQUFPO0FBQ0hILGVBQU07QUFESDtBQW5PSSxFOzs7Ozs7Ozs7Ozs7QUNBZixtQkFBa0IseUQ7Ozs7OztBQ0FsQjtBQUNBLHNEOzs7Ozs7QUNEQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSRDs7QUFZQTs7Ozs7O0tBRXFCSSxNOzs7QUFDakIsdUJBQXFCO0FBQUE7O0FBQUE7O0FBQUEsMkNBQU5DLElBQU07QUFBTkEsaUJBQU07QUFBQTs7QUFBQSxzS0FDUkEsSUFEUTs7QUFHakIsZUFBS0MsR0FBTCxHQUFXLENBQVg7QUFDQSxlQUFLQyxLQUFMLEdBQWEsbUJBQWI7QUFDQSxlQUFLQyxLQUFMLEdBQWEsbUJBQWI7QUFMaUI7QUFNcEI7Ozs7NkJBRUdDLEMsRUFBRztBQUNILGlCQUFJQSxLQUFLLENBQUMsS0FBS0QsS0FBTCxDQUFXRSxHQUFYLENBQWVELENBQWYsQ0FBVixFQUE2QjtBQUN6QixxQkFBTWIsS0FBSyxLQUFLVSxHQUFMLEVBQVg7QUFDQSxzQkFBS0MsS0FBTCxDQUFXSSxHQUFYLENBQWVmLEVBQWYsRUFBbUJhLENBQW5CO0FBQ0Esc0JBQUtELEtBQUwsQ0FBV0csR0FBWCxDQUFlRixDQUFmLEVBQWtCO0FBQ2RiLHlCQUFJQSxFQURVO0FBRWR6QywrQkFBVSxrQkFGSTtBQUdkeUQsNkJBQVEsS0FITTtBQUlkQyw0QkFBTyxDQUpPO0FBS2RDLDhCQUFTLENBTEs7QUFNZEMsNEJBQU87QUFOTyxrQkFBbEI7QUFRQSx3QkFBT25CLEVBQVA7QUFDSDtBQUNKOzs7NkJBRUdBLEUsRUFBSTtBQUNKLG9CQUFPLE9BQU9BLEVBQVAsS0FBYyxRQUFkLElBQTBCLEtBQUtXLEtBQUwsQ0FBV0csR0FBWCxDQUFlZCxFQUFmLENBQWpDO0FBQ0g7OztpQ0FFTUEsRSxFQUFJO0FBQ1AsaUJBQUksS0FBS2MsR0FBTCxDQUFTZCxFQUFULENBQUosRUFBa0I7QUFDZCxxQkFBTWEsSUFBSSxLQUFLRixLQUFMLENBQVdTLEdBQVgsQ0FBZXBCLEVBQWYsQ0FBVjtBQUNBLHFCQUFNcUIsSUFBSSxLQUFLVCxLQUFMLENBQVdRLEdBQVgsQ0FBZVAsQ0FBZixDQUFWO0FBQ0FRLG1CQUFFTCxNQUFGLEdBQVcsSUFBWDtBQUNBSyxtQkFBRTlELFFBQUYsQ0FBV0wsT0FBWDtBQUNBLHNCQUFLeUQsS0FBTCxDQUFXVyxNQUFYLENBQWtCdEIsRUFBbEI7QUFDQSxzQkFBS1ksS0FBTCxDQUFXVSxNQUFYLENBQWtCVCxDQUFsQjtBQUNIO0FBQ0o7Ozs2QkFFR2IsRSxFQUFJO0FBQ0osaUJBQUksS0FBS2MsR0FBTCxDQUFTZCxFQUFULENBQUosRUFBa0I7QUFDZCxxQkFBTWEsSUFBSSxLQUFLRixLQUFMLENBQVdTLEdBQVgsQ0FBZXBCLEVBQWYsQ0FBVjtBQUNBLHFCQUFNcUIsSUFBSSxLQUFLVCxLQUFMLENBQVdRLEdBQVgsQ0FBZVAsQ0FBZixDQUFWO0FBQ0Esd0JBQU9RLEVBQUU5RCxRQUFGLENBQVdDLE9BQWxCO0FBQ0gsY0FKRCxNQUlPO0FBQ0gsd0JBQU8sY0FBUU4sT0FBUixFQUFQO0FBQ0g7QUFDSjs7O2tDQUVRO0FBQ0wsaUJBQUksS0FBS3FFLEdBQVQsRUFBYztBQUNWLGdDQUFJLEtBQUtBLEdBQVQ7QUFDSDtBQUNKOzs7K0JBRUs7QUFBQTs7QUFDRixrQkFBS04sS0FBTCxHQUFhTyxLQUFLQyxHQUFMLEVBQWI7QUFDQSxrQkFBS1AsT0FBTCxHQUFlLENBQWY7QUFDQSxrQkFBS0MsS0FBTCxHQUFhLENBQWI7O0FBRUEsaUJBQU1PLE9BQU8sU0FBUEEsSUFBTyxHQUFNO0FBQ2Ysd0JBQUtILEdBQUwsR0FBVyxlQUFJRyxJQUFKLENBQVg7O0FBRUEscUJBQUlELE1BQU1ELEtBQUtDLEdBQUwsRUFBVjtBQUNBLHFCQUFJUCxVQUFVTyxNQUFNLE9BQUtSLEtBQXpCOztBQUVBLHdCQUFLRSxLQUFMLEdBQWFELFVBQVUsT0FBS0EsT0FBNUI7QUFDQSx3QkFBS0EsT0FBTCxHQUFlQSxPQUFmOztBQUVBLHdCQUFLUyxJQUFMLENBQVUsWUFBVixFQUF3QjtBQUNwQlYsNEJBQU8sT0FBS0EsS0FEUTtBQUVwQkUsNEJBQU8sT0FBS0EsS0FGUTtBQUdwQkQsOEJBQVMsT0FBS0E7QUFITSxrQkFBeEI7O0FBTUEscUJBQU1VLGtEQUFXLE9BQUtoQixLQUFMLENBQVdnQixJQUFYLEVBQVgsRUFBTjs7QUFFQUEsc0JBQUtDLE9BQUwsQ0FBYSxhQUFLO0FBQ2QseUJBQU1SLElBQUksT0FBS1QsS0FBTCxDQUFXUSxHQUFYLENBQWVQLENBQWYsQ0FBVjs7QUFFQSx5QkFBSSxDQUFDUSxFQUFFTCxNQUFQLEVBQWU7QUFDWCw2QkFBTVMsT0FBTUQsS0FBS0MsR0FBTCxFQUFaO0FBQ0FKLDJCQUFFSixLQUFGLEdBQVVJLEVBQUVKLEtBQUYsS0FBWUksRUFBRUosS0FBRixHQUFVUSxJQUF0QixDQUFWOztBQUVBLDZCQUFNUCxXQUFVTyxPQUFNSixFQUFFSixLQUF4QjtBQUNBSSwyQkFBRUYsS0FBRixHQUFVRCxXQUFVRyxFQUFFSCxPQUF0QjtBQUNBRywyQkFBRUgsT0FBRixHQUFZQSxRQUFaOztBQUVBLDZCQUFJTCxFQUFFUSxDQUFGLFNBQUosRUFBZ0I7QUFDWixvQ0FBS0MsTUFBTCxDQUFZRCxFQUFFckIsRUFBZDtBQUNIO0FBQ0o7QUFDSixrQkFmRDs7QUFpQkF5Qix1QkFBTUQsS0FBS0MsR0FBTCxFQUFOO0FBQ0FQLDJCQUFVTyxNQUFNLE9BQUtSLEtBQXJCOztBQUVBLHdCQUFLRSxLQUFMLEdBQWFELFVBQVUsT0FBS0EsT0FBNUI7QUFDQSx3QkFBS0EsT0FBTCxHQUFlQSxPQUFmOztBQUVBLHdCQUFLUyxJQUFMLENBQVUsV0FBVixFQUF1QjtBQUNuQlYsNEJBQU8sT0FBS0EsS0FETztBQUVuQkUsNEJBQU8sT0FBS0EsS0FGTztBQUduQkQsOEJBQVMsT0FBS0E7QUFISyxrQkFBdkI7QUFLSCxjQTdDRDs7QUErQ0Esa0JBQUtLLEdBQUwsR0FBVyxlQUFJRyxJQUFKLENBQVg7O0FBRUEsb0JBQU8sSUFBUDtBQUNIOzs7OzttQkEvR2dCbEIsTTs7Ozs7O0FDZHJCLG1CQUFrQix5RDs7Ozs7O0FDQWxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Qzs7Ozs7O0FDTEE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUJBQXdCLG1FQUFtRTtBQUMzRixFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLGdCOzs7Ozs7QUNoQkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXNCLE9BQU87QUFDN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQTZCO0FBQzdCLDJCQUEwQjtBQUMxQiwyQkFBMEI7QUFDMUIsc0JBQXFCO0FBQ3JCO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQTZELE9BQU87QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQXlCO0FBQ3pCLHNCQUFxQjtBQUNyQiwyQkFBMEI7QUFDMUIsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsRzs7Ozs7O0FDN0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0gsRzs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILEc7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxpQkFBaUIsRUFBRTtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWdFLGdCQUFnQjtBQUNoRjtBQUNBO0FBQ0EsSUFBRywyQ0FBMkMsZ0NBQWdDO0FBQzlFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Qjs7Ozs7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFvQixhQUFhO0FBQ2pDLElBQUc7QUFDSCxHOzs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1AsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxHOzs7Ozs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTLGVBQWU7QUFDeEI7QUFDQTtBQUNBO0FBQ0EsdUNBQXNDO0FBQ3RDO0FBQ0EsK0JBQThCO0FBQzlCLDhCQUE2QjtBQUM3QixnQ0FBK0I7QUFDL0Isb0NBQW1DO0FBQ25DLFVBQVMsK0JBQStCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRzs7Ozs7O0FDM0NBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEc7Ozs7OztBQ0xBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSCxHOzs7Ozs7QUNmQTtBQUNBOztBQUVBLHdDQUF1Qyx3Q0FBZ0QsRTs7Ozs7O0FDSHZGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHOzs7Ozs7QUNSQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7bUJDTmU7QUFDWHNCLGNBQVM7QUFDTEMsZ0JBQU8sQ0FDSCxDQUNJLENBQUMsYUFBRCxDQURKLEVBRUksQ0FBQyxhQUFELENBRkosRUFHSSxDQUFDLGFBQUQsQ0FISixFQUlJLENBQUMsYUFBRCxDQUpKLENBREcsRUFPSCxDQUNJLENBQUMsYUFBRCxDQURKLEVBRUksQ0FBQyxhQUFELENBRkosRUFHSSxDQUFDLGFBQUQsQ0FISixDQVBHLEVBWUgsQ0FDSSxDQUFDLGFBQUQsQ0FESixFQUVJLENBQUMsYUFBRCxDQUZKLEVBR0ksQ0FBQyxhQUFELENBSEosRUFJSSxDQUFDLGFBQUQsQ0FKSixFQUtJLENBQUMsYUFBRCxDQUxKLENBWkcsRUFtQkgsQ0FDSSxDQUFDLGFBQUQsQ0FESixFQUVJLENBQUMsYUFBRCxDQUZKLEVBR0ksQ0FBQyxhQUFELENBSEosRUFJSSxDQUFDLGFBQUQsQ0FKSixDQW5CRztBQURGLE1BREU7O0FBOEJYQyxTQUFJLEVBQUU7QUFDRjVCLGVBQU0sT0FETjtBQUVBNkIsZ0JBQU8sYUFGUDtBQUdBQyxlQUFNLDRCQUhOO0FBSUFDLG1CQUFVLEtBSlY7QUFLQUMsaUJBQVE7QUFMUixNQTlCTzs7QUFzQ1hDLGFBQVEsRUFBRTtBQUNOakMsZUFBTSxLQURGO0FBRUprQyxjQUFLLG9DQUZEO0FBR0pGLGlCQUFRO0FBSEosTUF0Q0c7O0FBNENYRyxjQUFTLEVBQUU7QUFDUG5DLGVBQU0sS0FERDtBQUVMa0MsY0FBSyx3QkFGQTtBQUdMRixpQkFBUTtBQUhILE1BNUNFOztBQWtEWEksY0FBUyxFQUFFO0FBQ1BwQyxlQUFNLE9BREQ7QUFFTDZCLGdCQUFPLFdBRkY7QUFHTEMsZUFBTSw0QkFIRDtBQUlMRSxpQkFBUSxDQUpIO0FBS0xELG1CQUFVO0FBTEwsTUFsREU7O0FBMERYTSxxQkFBZ0IsRUFBRTtBQUNkckMsZUFBTSxPQURNO0FBRVo2QixnQkFBTyxVQUZLO0FBR1pDLGVBQU0sb0NBSE07QUFJWkUsaUJBQVEsQ0FKSTtBQUtaRCxtQkFBVTtBQUxFLE1BMURMOztBQWtFWE8sU0FBSSxFQUFFO0FBQ0Z0QyxlQUFNLE9BRE47QUFFQTZCLGdCQUFPLFdBRlA7QUFHQUMsZUFBTSxnQ0FITjtBQUlBRSxpQkFBUSxDQUpSO0FBS0FELG1CQUFVO0FBTFY7QUFsRU8sRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBZjs7QUFDQTs7QUFJQTs7QUFlQTs7OztBQUNBOzs7Ozs7QUFFQSxLQUFNUSxRQUFRLEVBQWQ7QUFDQXRHLFFBQU91RyxXQUFQLEdBQXFCRCxLQUFyQjs7QUFFQSxLQUFNRSxnQkFBZ0IsaUJBQU0sVUFBSUMsSUFBVixFQUFnQixVQUFoQixDQUF0QjtBQUNBLEtBQU1DLGFBQWEsaUJBQU0sVUFBSUQsSUFBVixFQUFnQixPQUFoQixDQUFuQjtBQUNBLEtBQU1FLFFBQVEsaUJBQU1ILGFBQU4sRUFBcUIsTUFBckIsQ0FBZDtBQUNBLEtBQU1JLFFBQVEsaUJBQU1KLGFBQU4sRUFBcUIsTUFBckIsQ0FBZDtBQUNBLEtBQU1LLFVBQVUsaUJBQU1MLGFBQU4sRUFBcUIsUUFBckIsQ0FBaEI7O0FBRUEsVUFBU00saUJBQVQsQ0FBMkJ0RixRQUEzQixFQUFxQ21DLEVBQXJDLEVBQXlDbEIsR0FBekMsRUFBOEM7QUFDMUMsU0FBSXNFLE1BQU12RixTQUFTSSxnQkFBVCxPQUE4QitCLEVBQTlCLG1CQUFWO0FBQ0EsU0FBSSxDQUFDb0QsSUFBSUMsTUFBTCxJQUNNeEYsU0FBU3lGLFNBQVQsQ0FBbUJDLE9BQW5CLENBQTJCdkQsRUFBM0IsSUFBaUMsQ0FBQyxDQUR4QyxJQUVNbkMsU0FBUzJGLFlBQVQsQ0FBc0IsS0FBdEIsTUFBaUMsT0FGM0MsRUFFb0Q7QUFDaERKLGVBQU0sQ0FBQ3ZGLFFBQUQsQ0FBTjtBQUNIO0FBQ0QsZ0RBQUl1RixHQUFKLEdBQVN2QixPQUFULENBQWlCLGNBQU07QUFDbkIsYUFBSTFELEVBQUosRUFBUTtBQUNKQSxnQkFBR3ZCLEtBQUgsQ0FBUzZHLGVBQVQsWUFBa0MzRSxHQUFsQztBQUNIO0FBQ0osTUFKRDtBQUtIOztBQUVELFVBQVM0RSxXQUFULENBQXFCQyxJQUFyQixFQUEyQkMsSUFBM0IsRUFBaUNDLE1BQWpDLEVBQXlDQyxLQUF6QyxFQUFnRDtBQUM1QyxTQUFNQyxVQUFVLENBQUNGLFNBQVNDLEtBQVYsRUFBaUJFLE9BQWpCLENBQXlCLENBQXpCLENBQWhCO0FBQ0EsU0FBTUMsTUFBTXRGLEtBQUt1RixLQUFMLENBQVdQLE9BQU8sQ0FBQ0MsT0FBT0QsSUFBUixJQUFnQkksT0FBbEMsQ0FBWjtBQUNBLFlBQU8sQ0FBQ0EsT0FBRCxFQUFVRSxHQUFWLENBQVA7QUFDSDs7QUFFRCxVQUFTRSxVQUFULENBQW9CRixHQUFwQixFQUF5QjtBQUNyQmhCLFdBQU1yRyxLQUFOLENBQVl3SCxPQUFaLEdBQXNCSCxNQUFNLEdBQTVCO0FBQ0g7O0FBRUQsVUFBU0ksUUFBVCxDQUFrQkMsQ0FBbEIsRUFBcUJ6RyxRQUFyQixFQUErQjtBQUFBLFNBQ3BCMEcsSUFEb0IsR0FDWkQsQ0FEWSxDQUNwQkMsSUFEb0I7O0FBRTNCNUIsV0FBTTRCLEtBQUt2RSxFQUFYLElBQWlCdUUsSUFBakI7O0FBRUEsU0FBSUEsS0FBS25FLElBQUwsS0FBYyxlQUFTb0UsY0FBVCxDQUF3QkMsS0FBMUMsRUFBaUQ7QUFDN0N0QiwyQkFBa0J0RixRQUFsQixFQUE0QjBHLEtBQUt2RSxFQUFqQyxFQUFxQ3VFLEtBQUt6RixHQUExQztBQUNILE1BRkQsTUFFTyxJQUFJeUYsS0FBS25FLElBQUwsS0FBYyxlQUFTb0UsY0FBVCxDQUF3QkUsSUFBMUMsRUFBZ0Q7QUFDbkQsc0lBR21CSCxLQUFLekYsR0FIeEI7QUFhSDtBQUNKOztBQUVELEtBQU02RixzQkFBc0IsU0FBdEJBLG1CQUFzQjtBQUFBLFlBQVksa0JBQVksVUFBQ3pILE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNyRSxhQUFNeUgsUUFBUSxJQUFJLGVBQVNDLFNBQWIsQ0FBdUIsSUFBdkIsQ0FBZDs7QUFFQUQsZUFBTUUsRUFBTixDQUFTLFVBQVQsRUFBcUI7QUFBQSxvQkFBS1QsU0FBU0MsQ0FBVCxFQUFZekcsUUFBWixDQUFMO0FBQUEsVUFBckI7O0FBRUErRyxlQUFNRSxFQUFOLENBQVMsVUFBVCxFQUFxQixhQUFLO0FBQUEsaUJBRWxCakIsTUFGa0IsR0FJbEJTLENBSmtCLENBRWxCVCxNQUZrQjtBQUFBLGlCQUdsQkMsS0FIa0IsR0FJbEJRLENBSmtCLENBR2xCUixLQUhrQjs7QUFBQSxnQ0FNQ0osWUFBWSxDQUFaLEVBQWUsRUFBZixFQUFtQkcsTUFBbkIsRUFBMkJDLEtBQTNCLENBTkQ7QUFBQTtBQUFBLGlCQU1mQyxPQU5lO0FBQUEsaUJBTU5FLEdBTk07O0FBT3RCRSx3QkFBV0YsR0FBWDtBQUNILFVBUkQ7O0FBVUFXLGVBQU1FLEVBQU4sQ0FBUyxPQUFULEVBQWtCO0FBQUEsb0JBQU0zSCxPQUFPVSxRQUFQLENBQU47QUFBQSxVQUFsQjs7QUFFQStHLGVBQU1FLEVBQU4sQ0FBUyxVQUFULEVBQXFCO0FBQUEsb0JBQU01SCxRQUFRVyxRQUFSLENBQU47QUFBQSxVQUFyQjs7QUFFQStHLGVBQU1HLFlBQU47QUFDSCxNQXBCdUMsQ0FBWjtBQUFBLEVBQTVCOztBQXNCQSxLQUFNQyxtQkFBbUIsU0FBbkJBLGdCQUFtQjtBQUFBLFlBQVksa0JBQVksVUFBQzlILE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUNsRSxhQUFNeUgsUUFBUSxJQUFJLGVBQVNDLFNBQWIsQ0FBdUIsSUFBdkIsQ0FBZDs7QUFFQUQsZUFBTUUsRUFBTixDQUFTLFVBQVQsRUFBc0I7QUFBQSxvQkFBS1QsU0FBU0MsQ0FBVCxFQUFZekcsUUFBWixDQUFMO0FBQUEsVUFBdEI7O0FBRUErRyxlQUFNRSxFQUFOLENBQVMsVUFBVCxFQUFxQixhQUFLO0FBQUEsaUJBRWxCakIsTUFGa0IsR0FJbEJTLENBSmtCLENBRWxCVCxNQUZrQjtBQUFBLGlCQUdsQkMsS0FIa0IsR0FJbEJRLENBSmtCLENBR2xCUixLQUhrQjs7QUFBQSxpQ0FNQ0osWUFBWSxFQUFaLEVBQWdCLEdBQWhCLEVBQXFCRyxNQUFyQixFQUE2QkMsS0FBN0IsQ0FORDtBQUFBO0FBQUEsaUJBTWZDLE9BTmU7QUFBQSxpQkFNTkUsR0FOTTs7QUFPdEJFLHdCQUFXRixHQUFYO0FBQ0gsVUFSRDs7QUFVQVcsZUFBTUUsRUFBTixDQUFTLE9BQVQsRUFBa0I7QUFBQSxvQkFBTTNILE9BQU9VLFFBQVAsQ0FBTjtBQUFBLFVBQWxCOztBQUVBK0csZUFBTUUsRUFBTixDQUFTLFVBQVQsRUFBcUI7QUFBQSxvQkFBTTVILFFBQVFXLFFBQVIsQ0FBTjtBQUFBLFVBQXJCOztBQUVBLHNCQUFXZ0UsT0FBWCxDQUFtQjtBQUFBLG9CQUNmK0MsTUFBTUcsWUFBTixDQUFtQkUsTUFBbkIsQ0FEZTtBQUFBLFVBQW5CO0FBR0gsTUF0Qm9DLENBQVo7QUFBQSxFQUF6Qjs7QUF3QkEsS0FBTUMsZ0JBQWdCLFNBQWhCQSxhQUFnQixDQUFDdkMsS0FBRCxFQUFXO0FBQzdCLFNBQU13QyxXQUFXLG9CQUFZeEMsS0FBWixFQUNaeUMsTUFEWSxDQUNMO0FBQUEsZ0JBQU96QyxNQUFNMEMsR0FBTixFQUFXakYsSUFBWCxLQUFvQixlQUFTb0UsY0FBVCxDQUF3QkMsS0FBbkQ7QUFBQSxNQURLLEVBRVphLEdBRlksQ0FFUixlQUFPO0FBQ1IsYUFBTWYsT0FBTzVCLE1BQU0wQyxHQUFOLENBQWI7O0FBRFEsd0JBRWlCLG1CQUFRZCxLQUFLekYsR0FBYixDQUZqQjtBQUFBO0FBQUEsYUFFREMsS0FGQztBQUFBLGFBRU12QixPQUZOOztBQUdSK0csY0FBS2dCLEdBQUwsR0FBV3hHLEtBQVg7QUFDQSxnQkFBT3ZCLE9BQVA7QUFDSCxNQVBZLENBQWpCO0FBUUEsWUFBTyxjQUFRZ0ksR0FBUixDQUFZTCxRQUFaLENBQVA7QUFDSCxFQVZEOztBQVlBLEtBQU1NLFNBQVMsc0JBQWY7QUFDQSxLQUFJQyxlQUFKOztBQUVBckosUUFBT3NKLGFBQVAsR0FBdUIsc0JBQ2xCQyxJQURrQixDQUNiLFlBQU07QUFDUkgsWUFBT0ksR0FBUDs7QUFFQSxTQUFNOUQsUUFBUSxxQkFBV0QsT0FBWCxDQUFtQkMsS0FBakM7QUFDQSxTQUFNK0QsV0FBVy9ELE1BQU1zQixNQUF2QjtBQUNBLFNBQUkwQyxhQUFhLENBQWpCO0FBQ0EsU0FBSUMsYUFBYSxDQUFqQjtBQUNBLFNBQUlDLFdBQVcsR0FBZjs7QUFFQVAsY0FBU0QsT0FBT1MsR0FBUCxDQUFXLGdCQUdkO0FBQUEsYUFGRi9FLEtBRUUsUUFGRkEsS0FFRTtBQUFBLGFBREZELE9BQ0UsUUFERkEsT0FDRTs7QUFDRixhQUFJK0UsV0FBVyxHQUFmLEVBQW9CO0FBQ2hCQSx3QkFBVyxDQUFYO0FBQ0EsaUJBQUlFLElBQUlwRSxNQUFNZ0UsVUFBTixDQUFSO0FBQ0EsaUJBQUlLLElBQUlELEVBQUVILFVBQUYsQ0FBUjs7QUFFQSxpQkFBSUEsZUFBZUcsRUFBRTlDLE1BQXJCLEVBQTZCO0FBQ3pCMEMsOEJBQWEsQ0FBQ0EsYUFBYSxDQUFkLElBQW1CRCxRQUFoQztBQUNBRSw4QkFBYSxDQUFiO0FBQ0E5Qyx5QkFBUW1ELFNBQVIsR0FBb0IsRUFBcEI7O0FBRUFGLHFCQUFJcEUsTUFBTWdFLFVBQU4sQ0FBSjtBQUNBSyxxQkFBSUQsRUFBRUgsVUFBRixDQUFKO0FBQ0g7O0FBRUQsaUJBQU03SCxLQUFLNUIsU0FBU00sYUFBVCxDQUF1QixHQUF2QixDQUFYO0FBQ0FzQixnQkFBR3JCLFdBQUgsR0FBaUJzSixDQUFqQjtBQUNBbEQscUJBQVFsRyxXQUFSLENBQW9CbUIsRUFBcEI7O0FBRUE2SDtBQUNILFVBbkJELE1BbUJPO0FBQ0hDLHlCQUFZOUUsS0FBWjtBQUNIO0FBQ0osTUExQlEsQ0FBVDtBQTJCSCxFQXJDa0IsRUFzQ2xCeUUsSUF0Q2tCLENBc0NiLFlBQU07QUFBRTtBQUNWL0MsbUJBQWNqRyxLQUFkLENBQW9CMEosT0FBcEIsR0FBOEIsT0FBOUI7QUFDQSxZQUFPM0Isb0JBQW9COUIsYUFBcEIsQ0FBUDtBQUNILEVBekNrQixFQTBDbEIrQyxJQTFDa0IsQ0EwQ2IsWUFBTTtBQUFHO0FBQ1gsWUFBT1osaUJBQWlCakMsVUFBakIsQ0FBUDtBQUNILEVBNUNrQixFQTZDbEI2QyxJQTdDa0IsQ0E2Q2IsWUFBTTtBQUNSSCxZQUFPekUsTUFBUDtBQUNBNkIsbUJBQWNqRyxLQUFkLENBQW9CMEosT0FBcEIsR0FBOEIsTUFBOUI7QUFDQXZELGdCQUFXbkcsS0FBWCxDQUFpQjBKLE9BQWpCLEdBQTJCLE9BQTNCO0FBQ0EsWUFBT3BCLGNBQWN2QyxLQUFkLENBQVA7QUFDSCxFQWxEa0IsQ0FBdkIsQzs7Ozs7O0FDNUlBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQXdGO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsaUNBQWdDLFVBQVUsRUFBRTtBQUM1QyxFOzs7Ozs7QUNwQkE7QUFDQTs7O0FBR0E7QUFDQSxzQ0FBcUMsdUNBQXVDLGtCQUFrQixtQkFBbUIsdUNBQXVDLG1DQUFtQyw2QkFBNkIseUJBQXlCLGNBQWMsYUFBYSxHQUFHLG1CQUFtQixpQkFBaUIsR0FBRyxxQkFBcUIsa0JBQWtCLG1CQUFtQix5QkFBeUIsY0FBYyxhQUFhLDJCQUEyQiwrQkFBK0IsZ0NBQWdDLG1DQUFtQyw2QkFBNkIsd0JBQXdCLEdBQUcsdUJBQXVCLHlCQUF5QixpQkFBaUIsZ0JBQWdCLHNCQUFzQixxQkFBcUIsaU1BQWlNLEdBQUc7O0FBRXo1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUEE7O0FBQ0E7Ozs7OztBQUVBLEtBQU00RCxlQUFlLFlBQUdDLEtBQUgsR0FBVyxJQUFYLEdBQWtCLElBQXZDOztBQUVPLEtBQU1DLDRCQUFVO0FBQ25CQyx1QkFBZ0JILFlBQWhCLGNBRG1CO0FBRW5CSSxlQUFVLENBQ04sRUFBQzNHLElBQUksS0FBTCxFQUFZbEIsS0FBSyxTQUFqQixFQURNLEVBRU4sRUFBQ2tCLElBQUksS0FBTCxFQUFZbEIsS0FBSyxTQUFqQixFQUZNO0FBRlMsRUFBaEI7O0FBUVAsS0FBTThILGtCQUFrQixDQUFDO0FBQ3JCNUcsU0FBSSxnQkFEaUIsRUFDQ2xCLEtBQUs7QUFETixFQUFELENBQXhCO0FBR0EsS0FBTStILG9CQUFvQixFQUExQjtBQUNBLEtBQU1DLG1CQUFtQixDQUF6QjtBQUNBLE1BQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxLQUFLRixpQkFBckIsRUFBd0NFLEdBQXhDLEVBQTZDO0FBQ3pDSCxxQkFBZ0JJLElBQWhCLENBQXFCO0FBQ2pCaEgseUJBQWMrRyxDQURHO0FBRWpCakksY0FBUWlJLENBQVI7QUFGaUIsTUFBckI7QUFJSDs7QUFFRCxNQUFLLElBQUlBLEtBQUksQ0FBYixFQUFnQkEsTUFBS0QsZ0JBQXJCLEVBQXVDQyxJQUF2QyxFQUE0QztBQUN4Q0gscUJBQWdCSSxJQUFoQixDQUFxQjtBQUNqQmhILDZCQUFrQitHLEVBREQ7QUFFakJqSSx3QkFBYWlJLEVBQWI7QUFGaUIsTUFBckI7QUFJSDs7QUFFRCxLQUFNRSxtQkFBbUIsRUFBekI7QUFDQSw0Q0FBeUJwRixPQUF6QixDQUFpQyxlQUFPO0FBQ3BDLFNBQUl3RCxJQUFJNkIsS0FBSixDQUFVLE9BQVYsQ0FBSixFQUF3QjtBQUNwQixhQUFNQyxTQUFTLHNCQUFZOUIsR0FBWixDQUFmO0FBQ0EsYUFBSThCLE9BQU8vRyxJQUFQLElBQWUsQ0FBbkIsRUFBc0I7QUFDbEI2Ryw4QkFBaUJELElBQWpCLENBQXNCO0FBQ2xCaEgsMkJBQVFxRixHQUFSLFNBRGtCO0FBRWxCdkcsNEJBQVN1RyxHQUFUO0FBRmtCLGNBQXRCO0FBSUg7O0FBRUQsYUFBSThCLE9BQU8vRyxJQUFQLElBQWUsQ0FBbkIsRUFBc0I7QUFDbEI2Ryw4QkFBaUJELElBQWpCLENBQXNCO0FBQ2xCaEgsMkJBQVFxRixHQUFSLFNBRGtCO0FBRWxCdkcsNEJBQVN1RyxHQUFUO0FBRmtCLGNBQXRCO0FBSUg7O0FBRUQsYUFBSThCLE9BQU8vRyxJQUFQLElBQWUsQ0FBbkIsRUFBc0I7QUFDbEI2Ryw4QkFBaUJELElBQWpCLENBQXNCO0FBQ2xCaEgsMkJBQVFxRixHQUFSLFNBRGtCO0FBRWxCdkcsNEJBQVN1RyxHQUFUO0FBRmtCLGNBQXRCO0FBSUg7QUFDSjtBQUNKLEVBeEJEOztBQTBCTyxLQUFNK0Isc0JBQU8sQ0FDaEI7QUFDSVYsdUJBQWdCSCxZQUFoQixXQURKO0FBRUlJLGVBQVUsQ0FDTixFQUFDM0csSUFBSSxNQUFMLEVBQWFsQixLQUFLLFVBQWxCLEVBRE0sRUFFTixFQUFDa0IsSUFBSSxZQUFMLEVBQW1CbEIsS0FBSyxnQkFBeEIsRUFGTSxFQUdOLEVBQUNrQixJQUFJLE9BQUwsRUFBY2xCLEtBQUssV0FBbkIsRUFITSxFQUlOLEVBQUNrQixJQUFJLFVBQUwsRUFBaUJsQixLQUFLLGNBQXRCLEVBSk0sRUFLTixFQUFDa0IsSUFBSSxTQUFMLEVBQWdCbEIsS0FBSyxjQUFyQixFQUxNLEVBTU4sRUFBQ2tCLElBQUksU0FBTCxFQUFnQmxCLEtBQUssY0FBckIsRUFOTSxFQU9OLEVBQUNrQixJQUFJLFNBQUwsRUFBZ0JsQixLQUFLLGFBQXJCLEVBUE0sRUFRTixFQUFDa0IsSUFBSSxVQUFMLEVBQWlCbEIsS0FBSyxjQUF0QixFQVJNLEVBU04sRUFBQ2tCLElBQUksUUFBTCxFQUFlbEIsS0FBSyxZQUFwQixFQVRNLEVBVU4sRUFBQ2tCLElBQUksUUFBTCxFQUFlbEIsS0FBSyxhQUFwQixFQVZNLEVBV04sRUFBQ2tCLElBQUksUUFBTCxFQUFlbEIsS0FBSyxhQUFwQixFQVhNLEVBWU4sRUFBQ2tCLElBQUksUUFBTCxFQUFlbEIsS0FBSyxhQUFwQixFQVpNLEVBYU4sRUFBQ2tCLElBQUksUUFBTCxFQUFlbEIsS0FBSyxhQUFwQixFQWJNLEVBY04sRUFBQ2tCLElBQUksUUFBTCxFQUFlbEIsS0FBSyxhQUFwQixFQWRNLEVBZU4sRUFBQ2tCLElBQUksT0FBTCxFQUFjbEIsS0FBSyxZQUFuQixFQWZNLEVBZ0JOLEVBQUNrQixJQUFJLE9BQUwsRUFBY2xCLEtBQUssWUFBbkIsRUFoQk0sRUFpQk4sRUFBQ2tCLElBQUksT0FBTCxFQUFjbEIsS0FBSyxZQUFuQixFQWpCTSxFQWtCTixFQUFDa0IsSUFBSSxPQUFMLEVBQWNsQixLQUFLLFlBQW5CLEVBbEJNLEVBbUJOLEVBQUNrQixJQUFJLE9BQUwsRUFBY2xCLEtBQUssWUFBbkIsRUFuQk0sRUFvQk4sRUFBQ2tCLElBQUksT0FBTCxFQUFjbEIsS0FBSyxZQUFuQixFQXBCTTtBQUZkLEVBRGdCLEVBMEJoQjtBQUNJNEgsdUJBQWdCSCxZQUFoQixtQkFESjtBQUVJSSxlQUFVQztBQUZkLEVBMUJnQixFQThCaEI7QUFDSUYsdUJBQWdCSCxZQUFoQixvQkFESjtBQUVJSSxlQUFVTTtBQUZkLEVBOUJnQixFQWtDaEI7QUFDSVAsV0FBTSxTQURWO0FBRUlDLGVBQVUsQ0FDTixVQURNO0FBRmQsRUFsQ2dCLEVBd0NoQjtBQUNJRCxXQUFNLE9BRFY7QUFFSUMsZUFBVSxDQUNOLFNBRE07QUFGZCxFQXhDZ0IsQ0FBYixDOzs7Ozs7QUMzRFA7O0FBRUE7QUFDQTtBQUNBLEVBQUM7QUFDRDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSx1Q0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDOzs7Ozs7QUN0Q0E7O0FBRUE7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsdUNBQXNDLHVDQUF1QyxnQkFBZ0I7O0FBRTdGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEI7Ozs7OztBQzVFQTs7QUFFQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRCxpQ0FBZ0MsMkNBQTJDLGdCQUFnQixrQkFBa0IsT0FBTywyQkFBMkIsd0RBQXdELGdDQUFnQyx1REFBdUQsMkRBQTJELEVBQUUsRUFBRSx5REFBeUQscUVBQXFFLDZEQUE2RCxvQkFBb0IsR0FBRyxFQUFFOztBQUVqakIsa0RBQWlELDBDQUEwQywwREFBMEQsRUFBRTs7QUFFdko7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDRCQUEyQixnQ0FBZ0M7QUFDM0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBLEVBQUM7O0FBRUQsMkI7Ozs7OztBQ3JGQTs7QUFFQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDs7QUFFQTs7QUFFQSx1Q0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0I7Ozs7OztBQ3ZEQTs7QUFFQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDs7QUFFQTs7QUFFQSx1Q0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJCOzs7Ozs7QUM1RkE7O0FBRUE7QUFDQTtBQUNBLEVBQUM7QUFDRDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsZUFBYztBQUNkO0FBQ0EsbUJBQWtCLE9BQU87QUFDekIsbUJBQWtCLFFBQVE7QUFDMUIsbUJBQWtCLFFBQVE7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQSw0Qjs7Ozs7O0FDaENBOztBQUVBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW1CLG1CQUFtQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBCIiwiZmlsZSI6InByZWxvYWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBjMjM2OTRiYWEyZTNmNTU1MDMxYSIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHJcblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblxyXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XHJcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xyXG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcclxuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xyXG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXHJcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XHJcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcclxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcclxuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cclxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcclxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcclxuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcclxuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMjUuMEBjc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbnZhciBzdHlsZXNJbkRvbSA9IHt9LFxyXG5cdG1lbW9pemUgPSBmdW5jdGlvbihmbikge1xyXG5cdFx0dmFyIG1lbW87XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0XHRyZXR1cm4gbWVtbztcclxuXHRcdH07XHJcblx0fSxcclxuXHRpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiAvbXNpZSBbNi05XVxcYi8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTtcclxuXHR9KSxcclxuXHRnZXRIZWFkRWxlbWVudCA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xyXG5cdH0pLFxyXG5cdHNpbmdsZXRvbkVsZW1lbnQgPSBudWxsLFxyXG5cdHNpbmdsZXRvbkNvdW50ZXIgPSAwLFxyXG5cdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wID0gW107XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcclxuXHRpZih0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcclxuXHRcdGlmKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xyXG5cdH1cclxuXHJcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XHJcblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxyXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xyXG5cclxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgPGhlYWQ+LlxyXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XHJcblxyXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XHJcblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XHJcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xyXG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XHJcblx0XHR9XHJcblx0XHRpZihuZXdMaXN0KSB7XHJcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCk7XHJcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XHJcblx0XHR9XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcclxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xyXG5cdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKylcclxuXHRcdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKCk7XHJcblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucykge1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRpZihkb21TdHlsZSkge1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QpIHtcclxuXHR2YXIgc3R5bGVzID0gW107XHJcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHR2YXIgaWQgPSBpdGVtWzBdO1xyXG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XHJcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xyXG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XHJcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XHJcblx0XHRpZighbmV3U3R5bGVzW2lkXSlcclxuXHRcdFx0c3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcclxuXHRcdGVsc2VcclxuXHRcdFx0bmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xyXG5cdH1cclxuXHRyZXR1cm4gc3R5bGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KSB7XHJcblx0dmFyIGhlYWQgPSBnZXRIZWFkRWxlbWVudCgpO1xyXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wW3N0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xyXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XHJcblx0XHRpZighbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcclxuXHRcdFx0aGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCBoZWFkLmZpcnN0Q2hpbGQpO1xyXG5cdFx0fSBlbHNlIGlmKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XHJcblx0XHRcdGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AucHVzaChzdHlsZUVsZW1lbnQpO1xyXG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0Jy4gTXVzdCBiZSAndG9wJyBvciAnYm90dG9tJy5cIik7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XHJcblx0c3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHR2YXIgaWR4ID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZUVsZW1lbnQpO1xyXG5cdGlmKGlkeCA+PSAwKSB7XHJcblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuXHRzdHlsZUVsZW1lbnQudHlwZSA9IFwidGV4dC9jc3NcIjtcclxuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KTtcclxuXHRyZXR1cm4gc3R5bGVFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKSB7XHJcblx0dmFyIGxpbmtFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XHJcblx0bGlua0VsZW1lbnQucmVsID0gXCJzdHlsZXNoZWV0XCI7XHJcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmtFbGVtZW50KTtcclxuXHRyZXR1cm4gbGlua0VsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaiwgb3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQsIHVwZGF0ZSwgcmVtb3ZlO1xyXG5cclxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcclxuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gc2luZ2xldG9uRWxlbWVudCB8fCAoc2luZ2xldG9uRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCBmYWxzZSk7XHJcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCB0cnVlKTtcclxuXHR9IGVsc2UgaWYob2JqLnNvdXJjZU1hcCAmJlxyXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcclxuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0XHRpZihzdHlsZUVsZW1lbnQuaHJlZilcclxuXHRcdFx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlRWxlbWVudC5ocmVmKTtcclxuXHRcdH07XHJcblx0fSBlbHNlIHtcclxuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZShvYmopO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XHJcblx0XHRpZihuZXdPYmopIHtcclxuXHRcdFx0aWYobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZW1vdmUoKTtcclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xyXG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcclxuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcclxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xyXG5cdH07XHJcbn0pKCk7XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnKHN0eWxlRWxlbWVudCwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xyXG5cclxuXHRpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xyXG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2RlcztcclxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChjc3NOb2RlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcblxyXG5cdGlmKG1lZGlhKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXHJcblx0fVxyXG5cclxuXHRpZihzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcclxuXHR9IGVsc2Uge1xyXG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUxpbmsobGlua0VsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xyXG5cclxuXHRpZihzb3VyY2VNYXApIHtcclxuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XHJcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XHJcblx0fVxyXG5cclxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcclxuXHJcblx0dmFyIG9sZFNyYyA9IGxpbmtFbGVtZW50LmhyZWY7XHJcblxyXG5cdGxpbmtFbGVtZW50LmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG5cclxuXHRpZihvbGRTcmMpXHJcblx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjEzLjFAc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImNvbnN0IHdpbiA9IHdpbmRvdztcbmNvbnN0IHtcbiAgICBkb2N1bWVudDogZG9jLFxuICAgIFByb21pc2UsXG4gICAgY3JlYXRlanNcbn0gPSB3aW47XG5cbmZ1bmN0aW9uIGFwcGVuZFN0eWxlKGNzc1RleHQpIHtcbiAgICBjb25zdCBzdHlsZSA9IGRvYy5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHN0eWxlLnRleHRDb250ZW50ID0gY3NzVGV4dDtcbiAgICBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbmZ1bmN0aW9uIGRvbXJlYWR5KCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChkb2MucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCByZXNvbHZlKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBkZWZlcigpIHtcbiAgICBjb25zdCBkZWZlcnJlZCA9IHt9O1xuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGRlZmVycmVkLnJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICBkZWZlcnJlZC5yZWplY3QgPSByZWplY3RcbiAgICB9KTtcbiAgICBkZWZlcnJlZC5wcm9taXNlID0gcHJvbWlzZTtcbiAgICByZXR1cm4gZGVmZXJyZWQ7XG59XG5cbmZ1bmN0aW9uIGRlbGF5KHRpbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KHJlc29sdmUsIHRpbWUpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBxdWVyeSh2aWV3cG9ydCwgc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gdmlld3BvcnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG59XG5cbmZ1bmN0aW9uIHF1ZXJ5QWxsKHZpZXdwb3J0LCBzZWxlY3Rvcikge1xuICAgIHJldHVybiBbLi4udmlld3BvcnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcildO1xufVxuXG5mdW5jdGlvbiBnZXRSZWN0KGVsKSB7XG4gICAgcmV0dXJuIGVsLnJlY3RzIHx8IChlbC5yZWN0cyA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKTtcbn1cblxuZnVuY3Rpb24gZ2V0RGlzdGFuY2UoeDEsIHkxLCB4MiwgeTIpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KCh4MSAtIHgyKSAqICh4MSAtIHgyKSArICh5MSAtIHkyKSAqICh5MSAtIHkyKSk7XG59XG5cbmZ1bmN0aW9uIGxvYWRJbWcoc3JjKSB7XG4gICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcblxuICAgIHJldHVybiBbXG4gICAgICAgIGltYWdlLFxuICAgICAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBpbWFnZS5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKGltYWdlKTtcbiAgICAgICAgICAgIGltYWdlLnNyYyA9IHNyYztcbiAgICAgICAgfSlcbiAgICBdO1xufVxuXG5mdW5jdGlvbiBpbWcyQ2FudmFzKGltYWdlLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgY29uc3QgY2FudmFzID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlLCAwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICByZXR1cm4gW2NhbnZhcywgY29udGV4dF07XG59XG5cbmNvbnN0IHJhZiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uKGZuKSB7cmV0dXJuIHNldFRpbWVvdXQoZm4sIDEgLyA2MCl9O1xuXG5jb25zdCBjYWYgPSB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgXG4gICAgICAgICAgICB3aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uKGlkKSB7Y2xlYXJUaW1lb3V0KGlkKX07XG5cbmV4cG9ydCB7XG4gICAgd2luLFxuICAgIGRvYyxcbiAgICBkZWZlcixcbiAgICBQcm9taXNlLFxuICAgIGNyZWF0ZWpzLFxuICAgIGFwcGVuZFN0eWxlLFxuICAgIGRvbXJlYWR5LFxuICAgIGRlbGF5LFxuICAgIGxvYWRJbWcsXG4gICAgaW1nMkNhbnZhcyxcbiAgICBxdWVyeSxcbiAgICBxdWVyeUFsbCxcbiAgICBnZXRSZWN0LFxuICAgIGdldERpc3RhbmNlLFxuICAgIHJhZixcbiAgICBjYWZcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbC5qcyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2Zyb20gPSByZXF1aXJlKFwiLi4vY29yZS1qcy9hcnJheS9mcm9tXCIpO1xuXG52YXIgX2Zyb20yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZnJvbSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFycjJbaV0gPSBhcnJbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycjI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICgwLCBfZnJvbTIuZGVmYXVsdCkoYXJyKTtcbiAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2hlbHBlcnMvdG9Db25zdW1hYmxlQXJyYXkuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5hcnJheS5mcm9tJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5BcnJheS5mcm9tO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL2FycmF5L2Zyb20uanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG52YXIgJGF0ICA9IHJlcXVpcmUoJy4vX3N0cmluZy1hdCcpKHRydWUpO1xuXG4vLyAyMS4xLjMuMjcgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uKGl0ZXJhdGVkKXtcbiAgdGhpcy5fdCA9IFN0cmluZyhpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuLy8gMjEuMS41LjIuMSAlU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwgaW5kZXggPSB0aGlzLl9pXG4gICAgLCBwb2ludDtcbiAgaWYoaW5kZXggPj0gTy5sZW5ndGgpcmV0dXJuIHt2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlfTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICB0aGlzLl9pICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHt2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlfTtcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgZGVmaW5lZCAgID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xuLy8gdHJ1ZSAgLT4gU3RyaW5nI2F0XG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oVE9fU1RSSU5HKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKHRoYXQsIHBvcyl7XG4gICAgdmFyIHMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSlcbiAgICAgICwgaSA9IHRvSW50ZWdlcihwb3MpXG4gICAgICAsIGwgPSBzLmxlbmd0aFxuICAgICAgLCBhLCBiO1xuICAgIGlmKGkgPCAwIHx8IGkgPj0gbClyZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCAgPSBNYXRoLmNlaWxcbiAgLCBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCA9PSB1bmRlZmluZWQpdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RlZmluZWQuanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgICAgICAgID0gcmVxdWlyZSgnLi9fbGlicmFyeScpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHJlZGVmaW5lICAgICAgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKVxuICAsIGhpZGUgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIEl0ZXJhdG9ycyAgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCAkaXRlckNyZWF0ZSAgICA9IHJlcXVpcmUoJy4vX2l0ZXItY3JlYXRlJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKVxuICAsIElURVJBVE9SICAgICAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBCVUdHWSAgICAgICAgICA9ICEoW10ua2V5cyAmJiAnbmV4dCcgaW4gW10ua2V5cygpKSAvLyBTYWZhcmkgaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG4gICwgRkZfSVRFUkFUT1IgICAgPSAnQEBpdGVyYXRvcidcbiAgLCBLRVlTICAgICAgICAgICA9ICdrZXlzJ1xuICAsIFZBTFVFUyAgICAgICAgID0gJ3ZhbHVlcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQmFzZSwgTkFNRSwgQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKXtcbiAgJGl0ZXJDcmVhdGUoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICB2YXIgZ2V0TWV0aG9kID0gZnVuY3Rpb24oa2luZCl7XG4gICAgaWYoIUJVR0dZICYmIGtpbmQgaW4gcHJvdG8pcmV0dXJuIHByb3RvW2tpbmRdO1xuICAgIHN3aXRjaChraW5kKXtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICB9O1xuICB2YXIgVEFHICAgICAgICA9IE5BTUUgKyAnIEl0ZXJhdG9yJ1xuICAgICwgREVGX1ZBTFVFUyA9IERFRkFVTFQgPT0gVkFMVUVTXG4gICAgLCBWQUxVRVNfQlVHID0gZmFsc2VcbiAgICAsIHByb3RvICAgICAgPSBCYXNlLnByb3RvdHlwZVxuICAgICwgJG5hdGl2ZSAgICA9IHByb3RvW0lURVJBVE9SXSB8fCBwcm90b1tGRl9JVEVSQVRPUl0gfHwgREVGQVVMVCAmJiBwcm90b1tERUZBVUxUXVxuICAgICwgJGRlZmF1bHQgICA9ICRuYXRpdmUgfHwgZ2V0TWV0aG9kKERFRkFVTFQpXG4gICAgLCAkZW50cmllcyAgID0gREVGQVVMVCA/ICFERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoJ2VudHJpZXMnKSA6IHVuZGVmaW5lZFxuICAgICwgJGFueU5hdGl2ZSA9IE5BTUUgPT0gJ0FycmF5JyA/IHByb3RvLmVudHJpZXMgfHwgJG5hdGl2ZSA6ICRuYXRpdmVcbiAgICAsIG1ldGhvZHMsIGtleSwgSXRlcmF0b3JQcm90b3R5cGU7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYoJGFueU5hdGl2ZSl7XG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZigkYW55TmF0aXZlLmNhbGwobmV3IEJhc2UpKTtcbiAgICBpZihJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSl7XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvclByb3RvdHlwZSwgVEFHLCB0cnVlKTtcbiAgICAgIC8vIGZpeCBmb3Igc29tZSBvbGQgZW5naW5lc1xuICAgICAgaWYoIUxJQlJBUlkgJiYgIWhhcyhJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IpKWhpZGUoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgICB9XG4gIH1cbiAgLy8gZml4IEFycmF5I3t2YWx1ZXMsIEBAaXRlcmF0b3J9Lm5hbWUgaW4gVjggLyBGRlxuICBpZihERUZfVkFMVUVTICYmICRuYXRpdmUgJiYgJG5hdGl2ZS5uYW1lICE9PSBWQUxVRVMpe1xuICAgIFZBTFVFU19CVUcgPSB0cnVlO1xuICAgICRkZWZhdWx0ID0gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiAkbmF0aXZlLmNhbGwodGhpcyk7IH07XG4gIH1cbiAgLy8gRGVmaW5lIGl0ZXJhdG9yXG4gIGlmKCghTElCUkFSWSB8fCBGT1JDRUQpICYmIChCVUdHWSB8fCBWQUxVRVNfQlVHIHx8ICFwcm90b1tJVEVSQVRPUl0pKXtcbiAgICBoaWRlKHByb3RvLCBJVEVSQVRPUiwgJGRlZmF1bHQpO1xuICB9XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gJGRlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddICA9IHJldHVyblRoaXM7XG4gIGlmKERFRkFVTFQpe1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6ICBERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6ICAgIElTX1NFVCAgICAgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6ICRlbnRyaWVzXG4gICAgfTtcbiAgICBpZihGT1JDRUQpZm9yKGtleSBpbiBtZXRob2RzKXtcbiAgICAgIGlmKCEoa2V5IGluIHByb3RvKSlyZWRlZmluZShwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChCVUdHWSB8fCBWQUxVRVNfQlVHKSwgTkFNRSwgbWV0aG9kcyk7XG4gIH1cbiAgcmV0dXJuIG1ldGhvZHM7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gdHJ1ZTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGNvcmUgICAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIGN0eCAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgaGlkZSAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24odHlwZSwgbmFtZSwgc291cmNlKXtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkZcbiAgICAsIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0LkdcbiAgICAsIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlNcbiAgICAsIElTX1BST1RPICA9IHR5cGUgJiAkZXhwb3J0LlBcbiAgICAsIElTX0JJTkQgICA9IHR5cGUgJiAkZXhwb3J0LkJcbiAgICAsIElTX1dSQVAgICA9IHR5cGUgJiAkZXhwb3J0LldcbiAgICAsIGV4cG9ydHMgICA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pXG4gICAgLCBleHBQcm90byAgPSBleHBvcnRzW1BST1RPVFlQRV1cbiAgICAsIHRhcmdldCAgICA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV1cbiAgICAsIGtleSwgb3duLCBvdXQ7XG4gIGlmKElTX0dMT0JBTClzb3VyY2UgPSBuYW1lO1xuICBmb3Ioa2V5IGluIHNvdXJjZSl7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZihvd24gJiYga2V5IGluIGV4cG9ydHMpY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbihDKXtcbiAgICAgIHZhciBGID0gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICAgIGlmKHRoaXMgaW5zdGFuY2VvZiBDKXtcbiAgICAgICAgICBzd2l0Y2goYXJndW1lbnRzLmxlbmd0aCl7XG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgQztcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDKGEpO1xuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEMoYSwgYik7XG4gICAgICAgICAgfSByZXR1cm4gbmV3IEMoYSwgYiwgYyk7XG4gICAgICAgIH0gcmV0dXJuIEMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLm1ldGhvZHMuJU5BTUUlXG4gICAgaWYoSVNfUFJPVE8pe1xuICAgICAgKGV4cG9ydHMudmlydHVhbCB8fCAoZXhwb3J0cy52aXJ0dWFsID0ge30pKVtrZXldID0gb3V0O1xuICAgICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLnByb3RvdHlwZS4lTkFNRSVcbiAgICAgIGlmKHR5cGUgJiAkZXhwb3J0LlIgJiYgZXhwUHJvdG8gJiYgIWV4cFByb3RvW2tleV0paGlkZShleHBQcm90bywga2V5LCBvdXQpO1xuICAgIH1cbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWAgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHt2ZXJzaW9uOiAnMi40LjAnfTtcbmlmKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgdGhhdCwgbGVuZ3RoKXtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYodGhhdCA9PT0gdW5kZWZpbmVkKXJldHVybiBmbjtcbiAgc3dpdGNoKGxlbmd0aCl7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYSl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgZFAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgYW5PYmplY3QgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBkUCAgICAgICAgICAgICA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpe1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYoSUU4X0RPTV9ERUZJTkUpdHJ5IHtcbiAgICByZXR1cm4gZFAoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgaWYoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKXRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmKCd2YWx1ZScgaW4gQXR0cmlidXRlcylPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZighaXNPYmplY3QoaXQpKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdkaXYnKSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudFxuICAvLyBpbiBvbGQgSUUgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCdcbiAgLCBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIFMpe1xuICBpZighaXNPYmplY3QoaXQpKXJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgaWYodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZighUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qc1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJpdG1hcCwgdmFsdWUpe1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGUgIDogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGUgICAgOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlICAgICAgIDogdmFsdWVcbiAgfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qc1xuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIGtleSl7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyYXRvcnMuanNcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNyZWF0ZSAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpXG4gICwgZGVzY3JpcHRvciAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faGlkZScpKEl0ZXJhdG9yUHJvdG90eXBlLCByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KXtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7bmV4dDogZGVzY3JpcHRvcigxLCBuZXh0KX0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG52YXIgYW5PYmplY3QgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGRQcyAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwcycpXG4gICwgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJylcbiAgLCBJRV9QUk9UTyAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKVxuICAsIEVtcHR5ICAgICAgID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfVxuICAsIFBST1RPVFlQRSAgID0gJ3Byb3RvdHlwZSc7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24oKXtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnaWZyYW1lJylcbiAgICAsIGkgICAgICA9IGVudW1CdWdLZXlzLmxlbmd0aFxuICAgICwgbHQgICAgID0gJzwnXG4gICAgLCBndCAgICAgPSAnPidcbiAgICAsIGlmcmFtZURvY3VtZW50O1xuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgcmVxdWlyZSgnLi9faHRtbCcpLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDonOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNjcmlwdC11cmxcbiAgLy8gY3JlYXRlRGljdCA9IGlmcmFtZS5jb250ZW50V2luZG93Lk9iamVjdDtcbiAgLy8gaHRtbC5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKGx0ICsgJ3NjcmlwdCcgKyBndCArICdkb2N1bWVudC5GPU9iamVjdCcgKyBsdCArICcvc2NyaXB0JyArIGd0KTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgY3JlYXRlRGljdCA9IGlmcmFtZURvY3VtZW50LkY7XG4gIHdoaWxlKGktLSlkZWxldGUgY3JlYXRlRGljdFtQUk9UT1RZUEVdW2VudW1CdWdLZXlzW2ldXTtcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcyl7XG4gIHZhciByZXN1bHQ7XG4gIGlmKE8gIT09IG51bGwpe1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHk7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gY3JlYXRlRGljdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZFBzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgZFAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBnZXRLZXlzICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBrZXlzICAgPSBnZXRLZXlzKFByb3BlcnRpZXMpXG4gICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICwgaSA9IDBcbiAgICAsIFA7XG4gIHdoaWxlKGxlbmd0aCA+IGkpZFAuZihPLCBQID0ga2V5c1tpKytdLCBQcm9wZXJ0aWVzW1BdKTtcbiAgcmV0dXJuIE87XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcHMuanNcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpXG4gICwgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKXtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGhhcyAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgdG9JT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgYXJyYXlJbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSlcbiAgLCBJRV9QUk9UTyAgICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0LCBuYW1lcyl7XG4gIHZhciBPICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxuICAgICwgaSAgICAgID0gMFxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGtleTtcbiAgZm9yKGtleSBpbiBPKWlmKGtleSAhPSBJRV9QUk9UTyloYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpaWYoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKXtcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0JylcbiAgLCBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9MZW5ndGggID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCB0b0luZGV4ICAgPSByZXF1aXJlKCcuL190by1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihJU19JTkNMVURFUyl7XG4gIHJldHVybiBmdW5jdGlvbigkdGhpcywgZWwsIGZyb21JbmRleCl7XG4gICAgdmFyIE8gICAgICA9IHRvSU9iamVjdCgkdGhpcylcbiAgICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IHRvSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpXG4gICAgICAsIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICBpZihJU19JTkNMVURFUyAmJiBlbCAhPSBlbCl3aGlsZShsZW5ndGggPiBpbmRleCl7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICBpZih2YWx1ZSAhPSB2YWx1ZSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSN0b0luZGV4IGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvcig7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspaWYoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTyl7XG4gICAgICBpZihPW2luZGV4XSA9PT0gZWwpcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qc1xuLy8gbW9kdWxlIGlkID0gNDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanNcbi8vIG1vZHVsZSBpZCA9IDQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIG1heCAgICAgICA9IE1hdGgubWF4XG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGluZGV4LCBsZW5ndGgpe1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKVxuICAsIHVpZCAgICA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzXG4vLyBtb2R1bGUgaWQgPSA0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nXG4gICwgc3RvcmUgID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzXG4vLyBtb2R1bGUgaWQgPSA0NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBpZCA9IDBcbiAgLCBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qc1xuLy8gbW9kdWxlIGlkID0gNDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSA0OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2h0bWwuanNcbi8vIG1vZHVsZSBpZCA9IDQ5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGRlZiA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZcbiAgLCBoYXMgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCB0YWcsIHN0YXQpe1xuICBpZihpdCAmJiAhaGFzKGl0ID0gc3RhdCA/IGl0IDogaXQucHJvdG90eXBlLCBUQUcpKWRlZihpdCwgVEFHLCB7Y29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogdGFnfSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzXG4vLyBtb2R1bGUgaWQgPSA1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBzdG9yZSAgICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ3drcycpXG4gICwgdWlkICAgICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpXG4gICwgU3ltYm9sICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLlN5bWJvbFxuICAsIFVTRV9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09ICdmdW5jdGlvbic7XG5cbnZhciAkZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSl7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxuICAgIFVTRV9TWU1CT0wgJiYgU3ltYm9sW25hbWVdIHx8IChVU0VfU1lNQk9MID8gU3ltYm9sIDogdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuXG4kZXhwb3J0cy5zdG9yZSA9IHN0b3JlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy5qc1xuLy8gbW9kdWxlIGlkID0gNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyAxOS4xLjIuOSAvIDE1LjIuMy4yIE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIGhhcyAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCB0b09iamVjdCAgICA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgSUVfUFJPVE8gICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJylcbiAgLCBPYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmdldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uKE8pe1xuICBPID0gdG9PYmplY3QoTyk7XG4gIGlmKGhhcyhPLCBJRV9QUk9UTykpcmV0dXJuIE9bSUVfUFJPVE9dO1xuICBpZih0eXBlb2YgTy5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIE8gaW5zdGFuY2VvZiBPLmNvbnN0cnVjdG9yKXtcbiAgICByZXR1cm4gTy5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIH0gcmV0dXJuIE8gaW5zdGFuY2VvZiBPYmplY3QgPyBPYmplY3RQcm90byA6IG51bGw7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1ncG8uanNcbi8vIG1vZHVsZSBpZCA9IDUyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gNTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG52YXIgY3R4ICAgICAgICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCB0b09iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgY2FsbCAgICAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKVxuICAsIGlzQXJyYXlJdGVyICAgID0gcmVxdWlyZSgnLi9faXMtYXJyYXktaXRlcicpXG4gICwgdG9MZW5ndGggICAgICAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fY3JlYXRlLXByb3BlcnR5JylcbiAgLCBnZXRJdGVyRm4gICAgICA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2l0ZXItZGV0ZWN0JykoZnVuY3Rpb24oaXRlcil7IEFycmF5LmZyb20oaXRlcik7IH0pLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMi4xIEFycmF5LmZyb20oYXJyYXlMaWtlLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgZnJvbTogZnVuY3Rpb24gZnJvbShhcnJheUxpa2UvKiwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQqLyl7XG4gICAgdmFyIE8gICAgICAgPSB0b09iamVjdChhcnJheUxpa2UpXG4gICAgICAsIEMgICAgICAgPSB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nID8gdGhpcyA6IEFycmF5XG4gICAgICAsIGFMZW4gICAgPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgICAsIG1hcGZuICAgPSBhTGVuID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZFxuICAgICAgLCBtYXBwaW5nID0gbWFwZm4gIT09IHVuZGVmaW5lZFxuICAgICAgLCBpbmRleCAgID0gMFxuICAgICAgLCBpdGVyRm4gID0gZ2V0SXRlckZuKE8pXG4gICAgICAsIGxlbmd0aCwgcmVzdWx0LCBzdGVwLCBpdGVyYXRvcjtcbiAgICBpZihtYXBwaW5nKW1hcGZuID0gY3R4KG1hcGZuLCBhTGVuID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZCwgMik7XG4gICAgLy8gaWYgb2JqZWN0IGlzbid0IGl0ZXJhYmxlIG9yIGl0J3MgYXJyYXkgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yIC0gdXNlIHNpbXBsZSBjYXNlXG4gICAgaWYoaXRlckZuICE9IHVuZGVmaW5lZCAmJiAhKEMgPT0gQXJyYXkgJiYgaXNBcnJheUl0ZXIoaXRlckZuKSkpe1xuICAgICAgZm9yKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoTyksIHJlc3VsdCA9IG5ldyBDOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7IGluZGV4Kyspe1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCBtYXBwaW5nID8gY2FsbChpdGVyYXRvciwgbWFwZm4sIFtzdGVwLnZhbHVlLCBpbmRleF0sIHRydWUpIDogc3RlcC52YWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICAgIGZvcihyZXN1bHQgPSBuZXcgQyhsZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKyl7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIG1hcHBpbmcgPyBtYXBmbihPW2luZGV4XSwgaW5kZXgpIDogT1tpbmRleF0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQubGVuZ3RoID0gaW5kZXg7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5mcm9tLmpzXG4vLyBtb2R1bGUgaWQgPSA1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIGNhbGwgc29tZXRoaW5nIG9uIGl0ZXJhdG9yIHN0ZXAgd2l0aCBzYWZlIGNsb3Npbmcgb24gZXJyb3JcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdGVyYXRvciwgZm4sIHZhbHVlLCBlbnRyaWVzKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZW50cmllcyA/IGZuKGFuT2JqZWN0KHZhbHVlKVswXSwgdmFsdWVbMV0pIDogZm4odmFsdWUpO1xuICAvLyA3LjQuNiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCBjb21wbGV0aW9uKVxuICB9IGNhdGNoKGUpe1xuICAgIHZhciByZXQgPSBpdGVyYXRvclsncmV0dXJuJ107XG4gICAgaWYocmV0ICE9PSB1bmRlZmluZWQpYW5PYmplY3QocmV0LmNhbGwoaXRlcmF0b3IpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY2FsbC5qc1xuLy8gbW9kdWxlIGlkID0gNTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBjaGVjayBvbiBkZWZhdWx0IEFycmF5IGl0ZXJhdG9yXG52YXIgSXRlcmF0b3JzICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgSVRFUkFUT1IgICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgQXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG9bSVRFUkFUT1JdID09PSBpdCk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LWl0ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgY3JlYXRlRGVzYyAgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgaW5kZXgsIHZhbHVlKXtcbiAgaWYoaW5kZXggaW4gb2JqZWN0KSRkZWZpbmVQcm9wZXJ0eS5mKG9iamVjdCwgaW5kZXgsIGNyZWF0ZURlc2MoMCwgdmFsdWUpKTtcbiAgZWxzZSBvYmplY3RbaW5kZXhdID0gdmFsdWU7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NyZWF0ZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgY2xhc3NvZiAgID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpXG4gICwgSVRFUkFUT1IgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmdldEl0ZXJhdG9yTWV0aG9kID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCAhPSB1bmRlZmluZWQpcmV0dXJuIGl0W0lURVJBVE9SXVxuICAgIHx8IGl0WydAQGl0ZXJhdG9yJ11cbiAgICB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qc1xuLy8gbW9kdWxlIGlkID0gNThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBnZXR0aW5nIHRhZyBmcm9tIDE5LjEuMy42IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcoKVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpXG4gICwgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJylcbiAgLy8gRVMzIHdyb25nIGhlcmVcbiAgLCBBUkcgPSBjb2YoZnVuY3Rpb24oKXsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PSAnQXJndW1lbnRzJztcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgU2NyaXB0IEFjY2VzcyBEZW5pZWQgZXJyb3JcbnZhciB0cnlHZXQgPSBmdW5jdGlvbihpdCwga2V5KXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gaXRba2V5XTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBPLCBULCBCO1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAoVCA9IHRyeUdldChPID0gT2JqZWN0KGl0KSwgVEFHKSkgPT0gJ3N0cmluZycgPyBUXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBBUkcgPyBjb2YoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAoQiA9IGNvZihPKSkgPT0gJ09iamVjdCcgJiYgdHlwZW9mIE8uY2FsbGVlID09ICdmdW5jdGlvbicgPyAnQXJndW1lbnRzJyA6IEI7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NsYXNzb2YuanNcbi8vIG1vZHVsZSBpZCA9IDU5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIElURVJBVE9SICAgICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgU0FGRV9DTE9TSU5HID0gZmFsc2U7XG5cbnRyeSB7XG4gIHZhciByaXRlciA9IFs3XVtJVEVSQVRPUl0oKTtcbiAgcml0ZXJbJ3JldHVybiddID0gZnVuY3Rpb24oKXsgU0FGRV9DTE9TSU5HID0gdHJ1ZTsgfTtcbiAgQXJyYXkuZnJvbShyaXRlciwgZnVuY3Rpb24oKXsgdGhyb3cgMjsgfSk7XG59IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYywgc2tpcENsb3Npbmcpe1xuICBpZighc2tpcENsb3NpbmcgJiYgIVNBRkVfQ0xPU0lORylyZXR1cm4gZmFsc2U7XG4gIHZhciBzYWZlID0gZmFsc2U7XG4gIHRyeSB7XG4gICAgdmFyIGFyciAgPSBbN11cbiAgICAgICwgaXRlciA9IGFycltJVEVSQVRPUl0oKTtcbiAgICBpdGVyLm5leHQgPSBmdW5jdGlvbigpeyByZXR1cm4ge2RvbmU6IHNhZmUgPSB0cnVlfTsgfTtcbiAgICBhcnJbSVRFUkFUT1JdID0gZnVuY3Rpb24oKXsgcmV0dXJuIGl0ZXI7IH07XG4gICAgZXhlYyhhcnIpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBzYWZlO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRldGVjdC5qc1xuLy8gbW9kdWxlIGlkID0gNjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1wcm90b3R5cGUtb2ZcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanNcbi8vIG1vZHVsZSBpZCA9IDYyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmdldC1wcm90b3R5cGUtb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5nZXRQcm90b3R5cGVPZjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qc1xuLy8gbW9kdWxlIGlkID0gNjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyAxOS4xLjIuOSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciB0b09iamVjdCAgICAgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsICRnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdnZXRQcm90b3R5cGVPZicsIGZ1bmN0aW9uKCl7XG4gIHJldHVybiBmdW5jdGlvbiBnZXRQcm90b3R5cGVPZihpdCl7XG4gICAgcmV0dXJuICRnZXRQcm90b3R5cGVPZih0b09iamVjdChpdCkpO1xuICB9O1xufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmdldC1wcm90b3R5cGUtb2YuanNcbi8vIG1vZHVsZSBpZCA9IDY0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gbW9zdCBPYmplY3QgbWV0aG9kcyBieSBFUzYgc2hvdWxkIGFjY2VwdCBwcmltaXRpdmVzXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgY29yZSAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIGZhaWxzICAgPSByZXF1aXJlKCcuL19mYWlscycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihLRVksIGV4ZWMpe1xuICB2YXIgZm4gID0gKGNvcmUuT2JqZWN0IHx8IHt9KVtLRVldIHx8IE9iamVjdFtLRVldXG4gICAgLCBleHAgPSB7fTtcbiAgZXhwW0tFWV0gPSBleGVjKGZuKTtcbiAgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiBmYWlscyhmdW5jdGlvbigpeyBmbigxKTsgfSksICdPYmplY3QnLCBleHApO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qtc2FwLmpzXG4vLyBtb2R1bGUgaWQgPSA2NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanNcbi8vIG1vZHVsZSBpZCA9IDY2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmluZVByb3BlcnR5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICgwLCBfZGVmaW5lUHJvcGVydHkyLmRlZmF1bHQpKHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzXG4vLyBtb2R1bGUgaWQgPSA2N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDY4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKXtcbiAgcmV0dXJuICRPYmplY3QuZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDY5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbi8vIDE5LjEuMi40IC8gMTUuMi4zLjYgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpLCAnT2JqZWN0Jywge2RlZmluZVByb3BlcnR5OiByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF90eXBlb2YyID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG52YXIgX3R5cGVvZjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90eXBlb2YyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHNlbGYsIGNhbGwpIHtcbiAgaWYgKCFzZWxmKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIGNhbGwgJiYgKCh0eXBlb2YgY2FsbCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiAoMCwgX3R5cGVvZjMuZGVmYXVsdCkoY2FsbCkpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuLmpzXG4vLyBtb2R1bGUgaWQgPSA3MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2l0ZXJhdG9yID0gcmVxdWlyZShcIi4uL2NvcmUtanMvc3ltYm9sL2l0ZXJhdG9yXCIpO1xuXG52YXIgX2l0ZXJhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2l0ZXJhdG9yKTtcblxudmFyIF9zeW1ib2wgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9zeW1ib2xcIik7XG5cbnZhciBfc3ltYm9sMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N5bWJvbCk7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgX2l0ZXJhdG9yMi5kZWZhdWx0ID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gX3N5bWJvbDIuZGVmYXVsdCAmJiBvYmogIT09IF9zeW1ib2wyLmRlZmF1bHQucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgX3R5cGVvZihfaXRlcmF0b3IyLmRlZmF1bHQpID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG9iaik7XG59IDogZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICYmIHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBfc3ltYm9sMi5kZWZhdWx0ICYmIG9iaiAhPT0gX3N5bWJvbDIuZGVmYXVsdC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG9iaik7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy90eXBlb2YuanNcbi8vIG1vZHVsZSBpZCA9IDcyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wvaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDczXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fd2tzLWV4dCcpLmYoJ2l0ZXJhdG9yJyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA3NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgZ2xvYmFsICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgaGlkZSAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIEl0ZXJhdG9ycyAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIFRPX1NUUklOR19UQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxuZm9yKHZhciBjb2xsZWN0aW9ucyA9IFsnTm9kZUxpc3QnLCAnRE9NVG9rZW5MaXN0JywgJ01lZGlhTGlzdCcsICdTdHlsZVNoZWV0TGlzdCcsICdDU1NSdWxlTGlzdCddLCBpID0gMDsgaSA8IDU7IGkrKyl7XG4gIHZhciBOQU1FICAgICAgID0gY29sbGVjdGlvbnNbaV1cbiAgICAsIENvbGxlY3Rpb24gPSBnbG9iYWxbTkFNRV1cbiAgICAsIHByb3RvICAgICAgPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlO1xuICBpZihwcm90byAmJiAhcHJvdG9bVE9fU1RSSU5HX1RBR10paGlkZShwcm90bywgVE9fU1RSSU5HX1RBRywgTkFNRSk7XG4gIEl0ZXJhdG9yc1tOQU1FXSA9IEl0ZXJhdG9ycy5BcnJheTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDc1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuL19hZGQtdG8tdW5zY29wYWJsZXMnKVxuICAsIHN0ZXAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLXN0ZXAnKVxuICAsIEl0ZXJhdG9ycyAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIHRvSU9iamVjdCAgICAgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG5cbi8vIDIyLjEuMy40IEFycmF5LnByb3RvdHlwZS5lbnRyaWVzKClcbi8vIDIyLjEuMy4xMyBBcnJheS5wcm90b3R5cGUua2V5cygpXG4vLyAyMi4xLjMuMjkgQXJyYXkucHJvdG90eXBlLnZhbHVlcygpXG4vLyAyMi4xLjMuMzAgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24oaXRlcmF0ZWQsIGtpbmQpe1xuICB0aGlzLl90ID0gdG9JT2JqZWN0KGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gIHRoaXMuX2sgPSBraW5kOyAgICAgICAgICAgICAgICAvLyBraW5kXG4vLyAyMi4xLjUuMi4xICVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGtpbmQgID0gdGhpcy5fa1xuICAgICwgaW5kZXggPSB0aGlzLl9pKys7XG4gIGlmKCFPIHx8IGluZGV4ID49IE8ubGVuZ3RoKXtcbiAgICB0aGlzLl90ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBzdGVwKDEpO1xuICB9XG4gIGlmKGtpbmQgPT0gJ2tleXMnICApcmV0dXJuIHN0ZXAoMCwgaW5kZXgpO1xuICBpZihraW5kID09ICd2YWx1ZXMnKXJldHVybiBzdGVwKDAsIE9baW5kZXhdKTtcbiAgcmV0dXJuIHN0ZXAoMCwgW2luZGV4LCBPW2luZGV4XV0pO1xufSwgJ3ZhbHVlcycpO1xuXG4vLyBhcmd1bWVudHNMaXN0W0BAaXRlcmF0b3JdIGlzICVBcnJheVByb3RvX3ZhbHVlcyUgKDkuNC40LjYsIDkuNC40LjcpXG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG5hZGRUb1Vuc2NvcGFibGVzKCdrZXlzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCd2YWx1ZXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ2VudHJpZXMnKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gNzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYWRkLXRvLXVuc2NvcGFibGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA3N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9uZSwgdmFsdWUpe1xuICByZXR1cm4ge3ZhbHVlOiB2YWx1ZSwgZG9uZTogISFkb25lfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1zdGVwLmpzXG4vLyBtb2R1bGUgaWQgPSA3OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX3drcycpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1leHQuanNcbi8vIG1vZHVsZSBpZCA9IDc5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbFwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wuanNcbi8vIG1vZHVsZSBpZCA9IDgwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3ltYm9sJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3LnN5bWJvbC5vYnNlcnZhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5TeW1ib2w7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA4MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0Jztcbi8vIEVDTUFTY3JpcHQgNiBzeW1ib2xzIHNoaW1cbnZhciBnbG9iYWwgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIERFU0NSSVBUT1JTICAgID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCByZWRlZmluZSAgICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCBNRVRBICAgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGEnKS5LRVlcbiAgLCAkZmFpbHMgICAgICAgICA9IHJlcXVpcmUoJy4vX2ZhaWxzJylcbiAgLCBzaGFyZWQgICAgICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgdWlkICAgICAgICAgICAgPSByZXF1aXJlKCcuL191aWQnKVxuICAsIHdrcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fd2tzJylcbiAgLCB3a3NFeHQgICAgICAgICA9IHJlcXVpcmUoJy4vX3drcy1leHQnKVxuICAsIHdrc0RlZmluZSAgICAgID0gcmVxdWlyZSgnLi9fd2tzLWRlZmluZScpXG4gICwga2V5T2YgICAgICAgICAgPSByZXF1aXJlKCcuL19rZXlvZicpXG4gICwgZW51bUtleXMgICAgICAgPSByZXF1aXJlKCcuL19lbnVtLWtleXMnKVxuICAsIGlzQXJyYXkgICAgICAgID0gcmVxdWlyZSgnLi9faXMtYXJyYXknKVxuICAsIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCB0b0lPYmplY3QgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBjcmVhdGVEZXNjICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxuICAsIF9jcmVhdGUgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpXG4gICwgZ09QTkV4dCAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbi1leHQnKVxuICAsICRHT1BEICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKVxuICAsICREUCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCAka2V5cyAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BEICAgICAgICAgICA9ICRHT1BELmZcbiAgLCBkUCAgICAgICAgICAgICA9ICREUC5mXG4gICwgZ09QTiAgICAgICAgICAgPSBnT1BORXh0LmZcbiAgLCAkU3ltYm9sICAgICAgICA9IGdsb2JhbC5TeW1ib2xcbiAgLCAkSlNPTiAgICAgICAgICA9IGdsb2JhbC5KU09OXG4gICwgX3N0cmluZ2lmeSAgICAgPSAkSlNPTiAmJiAkSlNPTi5zdHJpbmdpZnlcbiAgLCBQUk9UT1RZUEUgICAgICA9ICdwcm90b3R5cGUnXG4gICwgSElEREVOICAgICAgICAgPSB3a3MoJ19oaWRkZW4nKVxuICAsIFRPX1BSSU1JVElWRSAgID0gd2tzKCd0b1ByaW1pdGl2ZScpXG4gICwgaXNFbnVtICAgICAgICAgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZVxuICAsIFN5bWJvbFJlZ2lzdHJ5ID0gc2hhcmVkKCdzeW1ib2wtcmVnaXN0cnknKVxuICAsIEFsbFN5bWJvbHMgICAgID0gc2hhcmVkKCdzeW1ib2xzJylcbiAgLCBPUFN5bWJvbHMgICAgICA9IHNoYXJlZCgnb3Atc3ltYm9scycpXG4gICwgT2JqZWN0UHJvdG8gICAgPSBPYmplY3RbUFJPVE9UWVBFXVxuICAsIFVTRV9OQVRJVkUgICAgID0gdHlwZW9mICRTeW1ib2wgPT0gJ2Z1bmN0aW9uJ1xuICAsIFFPYmplY3QgICAgICAgID0gZ2xvYmFsLlFPYmplY3Q7XG4vLyBEb24ndCB1c2Ugc2V0dGVycyBpbiBRdCBTY3JpcHQsIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8xNzNcbnZhciBzZXR0ZXIgPSAhUU9iamVjdCB8fCAhUU9iamVjdFtQUk9UT1RZUEVdIHx8ICFRT2JqZWN0W1BST1RPVFlQRV0uZmluZENoaWxkO1xuXG4vLyBmYWxsYmFjayBmb3Igb2xkIEFuZHJvaWQsIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD02ODdcbnZhciBzZXRTeW1ib2xEZXNjID0gREVTQ1JJUFRPUlMgJiYgJGZhaWxzKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBfY3JlYXRlKGRQKHt9LCAnYScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiBkUCh0aGlzLCAnYScsIHt2YWx1ZTogN30pLmE7IH1cbiAgfSkpLmEgIT0gNztcbn0pID8gZnVuY3Rpb24oaXQsIGtleSwgRCl7XG4gIHZhciBwcm90b0Rlc2MgPSBnT1BEKE9iamVjdFByb3RvLCBrZXkpO1xuICBpZihwcm90b0Rlc2MpZGVsZXRlIE9iamVjdFByb3RvW2tleV07XG4gIGRQKGl0LCBrZXksIEQpO1xuICBpZihwcm90b0Rlc2MgJiYgaXQgIT09IE9iamVjdFByb3RvKWRQKE9iamVjdFByb3RvLCBrZXksIHByb3RvRGVzYyk7XG59IDogZFA7XG5cbnZhciB3cmFwID0gZnVuY3Rpb24odGFnKXtcbiAgdmFyIHN5bSA9IEFsbFN5bWJvbHNbdGFnXSA9IF9jcmVhdGUoJFN5bWJvbFtQUk9UT1RZUEVdKTtcbiAgc3ltLl9rID0gdGFnO1xuICByZXR1cm4gc3ltO1xufTtcblxudmFyIGlzU3ltYm9sID0gVVNFX05BVElWRSAmJiB0eXBlb2YgJFN5bWJvbC5pdGVyYXRvciA9PSAnc3ltYm9sJyA/IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJztcbn0gOiBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCBpbnN0YW5jZW9mICRTeW1ib2w7XG59O1xuXG52YXIgJGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgRCl7XG4gIGlmKGl0ID09PSBPYmplY3RQcm90bykkZGVmaW5lUHJvcGVydHkoT1BTeW1ib2xzLCBrZXksIEQpO1xuICBhbk9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEQpO1xuICBpZihoYXMoQWxsU3ltYm9scywga2V5KSl7XG4gICAgaWYoIUQuZW51bWVyYWJsZSl7XG4gICAgICBpZighaGFzKGl0LCBISURERU4pKWRQKGl0LCBISURERU4sIGNyZWF0ZURlc2MoMSwge30pKTtcbiAgICAgIGl0W0hJRERFTl1ba2V5XSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0paXRbSElEREVOXVtrZXldID0gZmFsc2U7XG4gICAgICBEID0gX2NyZWF0ZShELCB7ZW51bWVyYWJsZTogY3JlYXRlRGVzYygwLCBmYWxzZSl9KTtcbiAgICB9IHJldHVybiBzZXRTeW1ib2xEZXNjKGl0LCBrZXksIEQpO1xuICB9IHJldHVybiBkUChpdCwga2V5LCBEKTtcbn07XG52YXIgJGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKGl0LCBQKXtcbiAgYW5PYmplY3QoaXQpO1xuICB2YXIga2V5cyA9IGVudW1LZXlzKFAgPSB0b0lPYmplY3QoUCkpXG4gICAgLCBpICAgID0gMFxuICAgICwgbCA9IGtleXMubGVuZ3RoXG4gICAgLCBrZXk7XG4gIHdoaWxlKGwgPiBpKSRkZWZpbmVQcm9wZXJ0eShpdCwga2V5ID0ga2V5c1tpKytdLCBQW2tleV0pO1xuICByZXR1cm4gaXQ7XG59O1xudmFyICRjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaXQsIFApe1xuICByZXR1cm4gUCA9PT0gdW5kZWZpbmVkID8gX2NyZWF0ZShpdCkgOiAkZGVmaW5lUHJvcGVydGllcyhfY3JlYXRlKGl0KSwgUCk7XG59O1xudmFyICRwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKGtleSl7XG4gIHZhciBFID0gaXNFbnVtLmNhbGwodGhpcywga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKSk7XG4gIGlmKHRoaXMgPT09IE9iamVjdFByb3RvICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT1BTeW1ib2xzLCBrZXkpKXJldHVybiBmYWxzZTtcbiAgcmV0dXJuIEUgfHwgIWhhcyh0aGlzLCBrZXkpIHx8ICFoYXMoQWxsU3ltYm9scywga2V5KSB8fCBoYXModGhpcywgSElEREVOKSAmJiB0aGlzW0hJRERFTl1ba2V5XSA/IEUgOiB0cnVlO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpe1xuICBpdCAgPSB0b0lPYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBpZihpdCA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpcmV0dXJuO1xuICB2YXIgRCA9IGdPUEQoaXQsIGtleSk7XG4gIGlmKEQgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIShoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKSlELmVudW1lcmFibGUgPSB0cnVlO1xuICByZXR1cm4gRDtcbn07XG52YXIgJGdldE93blByb3BlcnR5TmFtZXMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KXtcbiAgdmFyIG5hbWVzICA9IGdPUE4odG9JT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpe1xuICAgIGlmKCFoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYga2V5ICE9IEhJRERFTiAmJiBrZXkgIT0gTUVUQSlyZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpe1xuICB2YXIgSVNfT1AgID0gaXQgPT09IE9iamVjdFByb3RvXG4gICAgLCBuYW1lcyAgPSBnT1BOKElTX09QID8gT1BTeW1ib2xzIDogdG9JT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpe1xuICAgIGlmKGhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiAoSVNfT1AgPyBoYXMoT2JqZWN0UHJvdG8sIGtleSkgOiB0cnVlKSlyZXN1bHQucHVzaChBbGxTeW1ib2xzW2tleV0pO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xuXG4vLyAxOS40LjEuMSBTeW1ib2woW2Rlc2NyaXB0aW9uXSlcbmlmKCFVU0VfTkFUSVZFKXtcbiAgJFN5bWJvbCA9IGZ1bmN0aW9uIFN5bWJvbCgpe1xuICAgIGlmKHRoaXMgaW5zdGFuY2VvZiAkU3ltYm9sKXRocm93IFR5cGVFcnJvcignU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yIScpO1xuICAgIHZhciB0YWcgPSB1aWQoYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpO1xuICAgIHZhciAkc2V0ID0gZnVuY3Rpb24odmFsdWUpe1xuICAgICAgaWYodGhpcyA9PT0gT2JqZWN0UHJvdG8pJHNldC5jYWxsKE9QU3ltYm9scywgdmFsdWUpO1xuICAgICAgaWYoaGFzKHRoaXMsIEhJRERFTikgJiYgaGFzKHRoaXNbSElEREVOXSwgdGFnKSl0aGlzW0hJRERFTl1bdGFnXSA9IGZhbHNlO1xuICAgICAgc2V0U3ltYm9sRGVzYyh0aGlzLCB0YWcsIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbiAgICB9O1xuICAgIGlmKERFU0NSSVBUT1JTICYmIHNldHRlcilzZXRTeW1ib2xEZXNjKE9iamVjdFByb3RvLCB0YWcsIHtjb25maWd1cmFibGU6IHRydWUsIHNldDogJHNldH0pO1xuICAgIHJldHVybiB3cmFwKHRhZyk7XG4gIH07XG4gIHJlZGVmaW5lKCRTeW1ib2xbUFJPVE9UWVBFXSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgICByZXR1cm4gdGhpcy5faztcbiAgfSk7XG5cbiAgJEdPUEQuZiA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gICREUC5mICAgPSAkZGVmaW5lUHJvcGVydHk7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZiA9IGdPUE5FeHQuZiA9ICRnZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICByZXF1aXJlKCcuL19vYmplY3QtcGllJykuZiAgPSAkcHJvcGVydHlJc0VudW1lcmFibGU7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJykuZiA9ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbiAgaWYoREVTQ1JJUFRPUlMgJiYgIXJlcXVpcmUoJy4vX2xpYnJhcnknKSl7XG4gICAgcmVkZWZpbmUoT2JqZWN0UHJvdG8sICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsICRwcm9wZXJ0eUlzRW51bWVyYWJsZSwgdHJ1ZSk7XG4gIH1cblxuICB3a3NFeHQuZiA9IGZ1bmN0aW9uKG5hbWUpe1xuICAgIHJldHVybiB3cmFwKHdrcyhuYW1lKSk7XG4gIH1cbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwge1N5bWJvbDogJFN5bWJvbH0pO1xuXG5mb3IodmFyIHN5bWJvbHMgPSAoXG4gIC8vIDE5LjQuMi4yLCAxOS40LjIuMywgMTkuNC4yLjQsIDE5LjQuMi42LCAxOS40LjIuOCwgMTkuNC4yLjksIDE5LjQuMi4xMCwgMTkuNC4yLjExLCAxOS40LjIuMTIsIDE5LjQuMi4xMywgMTkuNC4yLjE0XG4gICdoYXNJbnN0YW5jZSxpc0NvbmNhdFNwcmVhZGFibGUsaXRlcmF0b3IsbWF0Y2gscmVwbGFjZSxzZWFyY2gsc3BlY2llcyxzcGxpdCx0b1ByaW1pdGl2ZSx0b1N0cmluZ1RhZyx1bnNjb3BhYmxlcydcbikuc3BsaXQoJywnKSwgaSA9IDA7IHN5bWJvbHMubGVuZ3RoID4gaTsgKXdrcyhzeW1ib2xzW2krK10pO1xuXG5mb3IodmFyIHN5bWJvbHMgPSAka2V5cyh3a3Muc3RvcmUpLCBpID0gMDsgc3ltYm9scy5sZW5ndGggPiBpOyApd2tzRGVmaW5lKHN5bWJvbHNbaSsrXSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsICdTeW1ib2wnLCB7XG4gIC8vIDE5LjQuMi4xIFN5bWJvbC5mb3Ioa2V5KVxuICAnZm9yJzogZnVuY3Rpb24oa2V5KXtcbiAgICByZXR1cm4gaGFzKFN5bWJvbFJlZ2lzdHJ5LCBrZXkgKz0gJycpXG4gICAgICA/IFN5bWJvbFJlZ2lzdHJ5W2tleV1cbiAgICAgIDogU3ltYm9sUmVnaXN0cnlba2V5XSA9ICRTeW1ib2woa2V5KTtcbiAgfSxcbiAgLy8gMTkuNC4yLjUgU3ltYm9sLmtleUZvcihzeW0pXG4gIGtleUZvcjogZnVuY3Rpb24ga2V5Rm9yKGtleSl7XG4gICAgaWYoaXNTeW1ib2woa2V5KSlyZXR1cm4ga2V5T2YoU3ltYm9sUmVnaXN0cnksIGtleSk7XG4gICAgdGhyb3cgVHlwZUVycm9yKGtleSArICcgaXMgbm90IGEgc3ltYm9sIScpO1xuICB9LFxuICB1c2VTZXR0ZXI6IGZ1bmN0aW9uKCl7IHNldHRlciA9IHRydWU7IH0sXG4gIHVzZVNpbXBsZTogZnVuY3Rpb24oKXsgc2V0dGVyID0gZmFsc2U7IH1cbn0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnT2JqZWN0Jywge1xuICAvLyAxOS4xLjIuMiBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4gIGNyZWF0ZTogJGNyZWF0ZSxcbiAgLy8gMTkuMS4yLjQgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4gIGRlZmluZVByb3BlcnR5OiAkZGVmaW5lUHJvcGVydHksXG4gIC8vIDE5LjEuMi4zIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpXG4gIGRlZmluZVByb3BlcnRpZXM6ICRkZWZpbmVQcm9wZXJ0aWVzLFxuICAvLyAxOS4xLjIuNiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJGdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgLy8gMTkuMS4yLjcgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogJGdldE93blByb3BlcnR5TmFtZXMsXG4gIC8vIDE5LjEuMi44IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoTylcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiAkZ2V0T3duUHJvcGVydHlTeW1ib2xzXG59KTtcblxuLy8gMjQuMy4yIEpTT04uc3RyaW5naWZ5KHZhbHVlIFssIHJlcGxhY2VyIFssIHNwYWNlXV0pXG4kSlNPTiAmJiAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICghVVNFX05BVElWRSB8fCAkZmFpbHMoZnVuY3Rpb24oKXtcbiAgdmFyIFMgPSAkU3ltYm9sKCk7XG4gIC8vIE1TIEVkZ2UgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIHt9XG4gIC8vIFdlYktpdCBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMgbnVsbFxuICAvLyBWOCB0aHJvd3Mgb24gYm94ZWQgc3ltYm9sc1xuICByZXR1cm4gX3N0cmluZ2lmeShbU10pICE9ICdbbnVsbF0nIHx8IF9zdHJpbmdpZnkoe2E6IFN9KSAhPSAne30nIHx8IF9zdHJpbmdpZnkoT2JqZWN0KFMpKSAhPSAne30nO1xufSkpLCAnSlNPTicsIHtcbiAgc3RyaW5naWZ5OiBmdW5jdGlvbiBzdHJpbmdpZnkoaXQpe1xuICAgIGlmKGl0ID09PSB1bmRlZmluZWQgfHwgaXNTeW1ib2woaXQpKXJldHVybjsgLy8gSUU4IHJldHVybnMgc3RyaW5nIG9uIHVuZGVmaW5lZFxuICAgIHZhciBhcmdzID0gW2l0XVxuICAgICAgLCBpICAgID0gMVxuICAgICAgLCByZXBsYWNlciwgJHJlcGxhY2VyO1xuICAgIHdoaWxlKGFyZ3VtZW50cy5sZW5ndGggPiBpKWFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcmVwbGFjZXIgPSBhcmdzWzFdO1xuICAgIGlmKHR5cGVvZiByZXBsYWNlciA9PSAnZnVuY3Rpb24nKSRyZXBsYWNlciA9IHJlcGxhY2VyO1xuICAgIGlmKCRyZXBsYWNlciB8fCAhaXNBcnJheShyZXBsYWNlcikpcmVwbGFjZXIgPSBmdW5jdGlvbihrZXksIHZhbHVlKXtcbiAgICAgIGlmKCRyZXBsYWNlcil2YWx1ZSA9ICRyZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsdWUpO1xuICAgICAgaWYoIWlzU3ltYm9sKHZhbHVlKSlyZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBhcmdzWzFdID0gcmVwbGFjZXI7XG4gICAgcmV0dXJuIF9zdHJpbmdpZnkuYXBwbHkoJEpTT04sIGFyZ3MpO1xuICB9XG59KTtcblxuLy8gMTkuNC4zLjQgU3ltYm9sLnByb3RvdHlwZVtAQHRvUHJpbWl0aXZlXShoaW50KVxuJFN5bWJvbFtQUk9UT1RZUEVdW1RPX1BSSU1JVElWRV0gfHwgcmVxdWlyZSgnLi9faGlkZScpKCRTeW1ib2xbUFJPVE9UWVBFXSwgVE9fUFJJTUlUSVZFLCAkU3ltYm9sW1BST1RPVFlQRV0udmFsdWVPZik7XG4vLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZygkU3ltYm9sLCAnU3ltYm9sJyk7XG4vLyAyMC4yLjEuOSBNYXRoW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhNYXRoLCAnTWF0aCcsIHRydWUpO1xuLy8gMjQuMy4zIEpTT05bQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKGdsb2JhbC5KU09OLCAnSlNPTicsIHRydWUpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN5bWJvbC5qc1xuLy8gbW9kdWxlIGlkID0gODJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgTUVUQSAgICAgPSByZXF1aXJlKCcuL191aWQnKSgnbWV0YScpXG4gICwgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGhhcyAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBzZXREZXNjICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZcbiAgLCBpZCAgICAgICA9IDA7XG52YXIgaXNFeHRlbnNpYmxlID0gT2JqZWN0LmlzRXh0ZW5zaWJsZSB8fCBmdW5jdGlvbigpe1xuICByZXR1cm4gdHJ1ZTtcbn07XG52YXIgRlJFRVpFID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIGlzRXh0ZW5zaWJsZShPYmplY3QucHJldmVudEV4dGVuc2lvbnMoe30pKTtcbn0pO1xudmFyIHNldE1ldGEgPSBmdW5jdGlvbihpdCl7XG4gIHNldERlc2MoaXQsIE1FVEEsIHt2YWx1ZToge1xuICAgIGk6ICdPJyArICsraWQsIC8vIG9iamVjdCBJRFxuICAgIHc6IHt9ICAgICAgICAgIC8vIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH19KTtcbn07XG52YXIgZmFzdEtleSA9IGZ1bmN0aW9uKGl0LCBjcmVhdGUpe1xuICAvLyByZXR1cm4gcHJpbWl0aXZlIHdpdGggcHJlZml4XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJyA/IGl0IDogKHR5cGVvZiBpdCA9PSAnc3RyaW5nJyA/ICdTJyA6ICdQJykgKyBpdDtcbiAgaWYoIWhhcyhpdCwgTUVUQSkpe1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYoIWlzRXh0ZW5zaWJsZShpdCkpcmV0dXJuICdGJztcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmKCFjcmVhdGUpcmV0dXJuICdFJztcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gb2JqZWN0IElEXG4gIH0gcmV0dXJuIGl0W01FVEFdLmk7XG59O1xudmFyIGdldFdlYWsgPSBmdW5jdGlvbihpdCwgY3JlYXRlKXtcbiAgaWYoIWhhcyhpdCwgTUVUQSkpe1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYoIWlzRXh0ZW5zaWJsZShpdCkpcmV0dXJuIHRydWU7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZighY3JlYXRlKXJldHVybiBmYWxzZTtcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gaGFzaCB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9IHJldHVybiBpdFtNRVRBXS53O1xufTtcbi8vIGFkZCBtZXRhZGF0YSBvbiBmcmVlemUtZmFtaWx5IG1ldGhvZHMgY2FsbGluZ1xudmFyIG9uRnJlZXplID0gZnVuY3Rpb24oaXQpe1xuICBpZihGUkVFWkUgJiYgbWV0YS5ORUVEICYmIGlzRXh0ZW5zaWJsZShpdCkgJiYgIWhhcyhpdCwgTUVUQSkpc2V0TWV0YShpdCk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgbWV0YSA9IG1vZHVsZS5leHBvcnRzID0ge1xuICBLRVk6ICAgICAgTUVUQSxcbiAgTkVFRDogICAgIGZhbHNlLFxuICBmYXN0S2V5OiAgZmFzdEtleSxcbiAgZ2V0V2VhazogIGdldFdlYWssXG4gIG9uRnJlZXplOiBvbkZyZWV6ZVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19tZXRhLmpzXG4vLyBtb2R1bGUgaWQgPSA4M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBnbG9iYWwgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBMSUJSQVJZICAgICAgICA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKVxuICAsIHdrc0V4dCAgICAgICAgID0gcmVxdWlyZSgnLi9fd2tzLWV4dCcpXG4gICwgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgdmFyICRTeW1ib2wgPSBjb3JlLlN5bWJvbCB8fCAoY29yZS5TeW1ib2wgPSBMSUJSQVJZID8ge30gOiBnbG9iYWwuU3ltYm9sIHx8IHt9KTtcbiAgaWYobmFtZS5jaGFyQXQoMCkgIT0gJ18nICYmICEobmFtZSBpbiAkU3ltYm9sKSlkZWZpbmVQcm9wZXJ0eSgkU3ltYm9sLCBuYW1lLCB7dmFsdWU6IHdrc0V4dC5mKG5hbWUpfSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1kZWZpbmUuanNcbi8vIG1vZHVsZSBpZCA9IDg0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGdldEtleXMgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgZWwpe1xuICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KG9iamVjdClcbiAgICAsIGtleXMgICA9IGdldEtleXMoTylcbiAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgLCBpbmRleCAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKGxlbmd0aCA+IGluZGV4KWlmKE9ba2V5ID0ga2V5c1tpbmRleCsrXV0gPT09IGVsKXJldHVybiBrZXk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2tleW9mLmpzXG4vLyBtb2R1bGUgaWQgPSA4NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIGFsbCBlbnVtZXJhYmxlIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBzeW1ib2xzXG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BTICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKVxuICAsIHBJRSAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIHJlc3VsdCAgICAgPSBnZXRLZXlzKGl0KVxuICAgICwgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgaWYoZ2V0U3ltYm9scyl7XG4gICAgdmFyIHN5bWJvbHMgPSBnZXRTeW1ib2xzKGl0KVxuICAgICAgLCBpc0VudW0gID0gcElFLmZcbiAgICAgICwgaSAgICAgICA9IDBcbiAgICAgICwga2V5O1xuICAgIHdoaWxlKHN5bWJvbHMubGVuZ3RoID4gaSlpZihpc0VudW0uY2FsbChpdCwga2V5ID0gc3ltYm9sc1tpKytdKSlyZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0ta2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gODZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzXG4vLyBtb2R1bGUgaWQgPSA4N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanNcbi8vIG1vZHVsZSBpZCA9IDg4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gNy4yLjIgSXNBcnJheShhcmd1bWVudClcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBpc0FycmF5KGFyZyl7XG4gIHJldHVybiBjb2YoYXJnKSA9PSAnQXJyYXknO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS5qc1xuLy8gbW9kdWxlIGlkID0gODlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBmYWxsYmFjayBmb3IgSUUxMSBidWdneSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB3aXRoIGlmcmFtZSBhbmQgd2luZG93XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgZ09QTiAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mXG4gICwgdG9TdHJpbmcgID0ge30udG9TdHJpbmc7XG5cbnZhciB3aW5kb3dOYW1lcyA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xuXG52YXIgZ2V0V2luZG93TmFtZXMgPSBmdW5jdGlvbihpdCl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGdPUE4oaXQpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB3aW5kb3dOYW1lcy5zbGljZSgpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCl7XG4gIHJldHVybiB3aW5kb3dOYW1lcyAmJiB0b1N0cmluZy5jYWxsKGl0KSA9PSAnW29iamVjdCBXaW5kb3ddJyA/IGdldFdpbmRvd05hbWVzKGl0KSA6IGdPUE4odG9JT2JqZWN0KGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4tZXh0LmpzXG4vLyBtb2R1bGUgaWQgPSA5MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIDE5LjEuMi43IC8gMTUuMi4zLjQgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbnZhciAka2V5cyAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKVxuICAsIGhpZGRlbktleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJykuY29uY2F0KCdsZW5ndGgnLCAncHJvdG90eXBlJyk7XG5cbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoTyl7XG4gIHJldHVybiAka2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4uanNcbi8vIG1vZHVsZSBpZCA9IDkxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIHBJRSAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpXG4gICwgY3JlYXRlRGVzYyAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgLCB0b0lPYmplY3QgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpXG4gICwgZ09QRCAgICAgICAgICAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZ09QRCA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKXtcbiAgTyA9IHRvSU9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBpZihJRThfRE9NX0RFRklORSl0cnkge1xuICAgIHJldHVybiBnT1BEKE8sIFApO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKGhhcyhPLCBQKSlyZXR1cm4gY3JlYXRlRGVzYyghcElFLmYuY2FsbChPLCBQKSwgT1tQXSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BkLmpzXG4vLyBtb2R1bGUgaWQgPSA5MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnYXN5bmNJdGVyYXRvcicpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnN5bWJvbC5hc3luYy1pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gOTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJyZXF1aXJlKCcuL193a3MtZGVmaW5lJykoJ29ic2VydmFibGUnKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wub2JzZXJ2YWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gOTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9zZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mXCIpO1xuXG52YXIgX3NldFByb3RvdHlwZU9mMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NldFByb3RvdHlwZU9mKTtcblxudmFyIF9jcmVhdGUgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvY3JlYXRlXCIpO1xuXG52YXIgX2NyZWF0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGUpO1xuXG52YXIgX3R5cGVvZjIgPSByZXF1aXJlKFwiLi4vaGVscGVycy90eXBlb2ZcIik7XG5cbnZhciBfdHlwZW9mMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3R5cGVvZjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgKHR5cGVvZiBzdXBlckNsYXNzID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6ICgwLCBfdHlwZW9mMy5kZWZhdWx0KShzdXBlckNsYXNzKSkpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gKDAsIF9jcmVhdGUyLmRlZmF1bHQpKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2YyLmRlZmF1bHQgPyAoMCwgX3NldFByb3RvdHlwZU9mMi5kZWZhdWx0KShzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMuanNcbi8vIG1vZHVsZSBpZCA9IDk2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzXG4vLyBtb2R1bGUgaWQgPSA5N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Quc2V0UHJvdG90eXBlT2Y7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L3NldC1wcm90b3R5cGUtb2YuanNcbi8vIG1vZHVsZSBpZCA9IDk4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gMTkuMS4zLjE5IE9iamVjdC5zZXRQcm90b3R5cGVPZihPLCBwcm90bylcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtzZXRQcm90b3R5cGVPZjogcmVxdWlyZSgnLi9fc2V0LXByb3RvJykuc2V0fSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YuanNcbi8vIG1vZHVsZSBpZCA9IDk5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gV29ya3Mgd2l0aCBfX3Byb3RvX18gb25seS4gT2xkIHY4IGNhbid0IHdvcmsgd2l0aCBudWxsIHByb3RvIG9iamVjdHMuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGNoZWNrID0gZnVuY3Rpb24oTywgcHJvdG8pe1xuICBhbk9iamVjdChPKTtcbiAgaWYoIWlzT2JqZWN0KHByb3RvKSAmJiBwcm90byAhPT0gbnVsbCl0aHJvdyBUeXBlRXJyb3IocHJvdG8gKyBcIjogY2FuJ3Qgc2V0IGFzIHByb3RvdHlwZSFcIik7XG59O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8ICgnX19wcm90b19fJyBpbiB7fSA/IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBmdW5jdGlvbih0ZXN0LCBidWdneSwgc2V0KXtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNldCA9IHJlcXVpcmUoJy4vX2N0eCcpKEZ1bmN0aW9uLmNhbGwsIHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJykuZihPYmplY3QucHJvdG90eXBlLCAnX19wcm90b19fJykuc2V0LCAyKTtcbiAgICAgICAgc2V0KHRlc3QsIFtdKTtcbiAgICAgICAgYnVnZ3kgPSAhKHRlc3QgaW5zdGFuY2VvZiBBcnJheSk7XG4gICAgICB9IGNhdGNoKGUpeyBidWdneSA9IHRydWU7IH1cbiAgICAgIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90byl7XG4gICAgICAgIGNoZWNrKE8sIHByb3RvKTtcbiAgICAgICAgaWYoYnVnZ3kpTy5fX3Byb3RvX18gPSBwcm90bztcbiAgICAgICAgZWxzZSBzZXQoTywgcHJvdG8pO1xuICAgICAgICByZXR1cm4gTztcbiAgICAgIH07XG4gICAgfSh7fSwgZmFsc2UpIDogdW5kZWZpbmVkKSxcbiAgY2hlY2s6IGNoZWNrXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1wcm90by5qc1xuLy8gbW9kdWxlIGlkID0gMTAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2NyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGUoUCwgRCl7XG4gIHJldHVybiAkT2JqZWN0LmNyZWF0ZShQLCBEKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtjcmVhdGU6IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDEwM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnZXZlbnQtZW1pdHRlcic7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudCB7fVxuRXZlbnRFbWl0dGVyKEV2ZW50LnByb3RvdHlwZSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2V2ZW50LmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZCAgICAgICAgPSByZXF1aXJlKCdkJylcbiAgLCBjYWxsYWJsZSA9IHJlcXVpcmUoJ2VzNS1leHQvb2JqZWN0L3ZhbGlkLWNhbGxhYmxlJylcblxuICAsIGFwcGx5ID0gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LCBjYWxsID0gRnVuY3Rpb24ucHJvdG90eXBlLmNhbGxcbiAgLCBjcmVhdGUgPSBPYmplY3QuY3JlYXRlLCBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eVxuICAsIGRlZmluZVByb3BlcnRpZXMgPSBPYmplY3QuZGVmaW5lUHJvcGVydGllc1xuICAsIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxuICAsIGRlc2NyaXB0b3IgPSB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlIH1cblxuICAsIG9uLCBvbmNlLCBvZmYsIGVtaXQsIG1ldGhvZHMsIGRlc2NyaXB0b3JzLCBiYXNlO1xuXG5vbiA9IGZ1bmN0aW9uICh0eXBlLCBsaXN0ZW5lcikge1xuXHR2YXIgZGF0YTtcblxuXHRjYWxsYWJsZShsaXN0ZW5lcik7XG5cblx0aWYgKCFoYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMsICdfX2VlX18nKSkge1xuXHRcdGRhdGEgPSBkZXNjcmlwdG9yLnZhbHVlID0gY3JlYXRlKG51bGwpO1xuXHRcdGRlZmluZVByb3BlcnR5KHRoaXMsICdfX2VlX18nLCBkZXNjcmlwdG9yKTtcblx0XHRkZXNjcmlwdG9yLnZhbHVlID0gbnVsbDtcblx0fSBlbHNlIHtcblx0XHRkYXRhID0gdGhpcy5fX2VlX187XG5cdH1cblx0aWYgKCFkYXRhW3R5cGVdKSBkYXRhW3R5cGVdID0gbGlzdGVuZXI7XG5cdGVsc2UgaWYgKHR5cGVvZiBkYXRhW3R5cGVdID09PSAnb2JqZWN0JykgZGF0YVt0eXBlXS5wdXNoKGxpc3RlbmVyKTtcblx0ZWxzZSBkYXRhW3R5cGVdID0gW2RhdGFbdHlwZV0sIGxpc3RlbmVyXTtcblxuXHRyZXR1cm4gdGhpcztcbn07XG5cbm9uY2UgPSBmdW5jdGlvbiAodHlwZSwgbGlzdGVuZXIpIHtcblx0dmFyIG9uY2UsIHNlbGY7XG5cblx0Y2FsbGFibGUobGlzdGVuZXIpO1xuXHRzZWxmID0gdGhpcztcblx0b24uY2FsbCh0aGlzLCB0eXBlLCBvbmNlID0gZnVuY3Rpb24gKCkge1xuXHRcdG9mZi5jYWxsKHNlbGYsIHR5cGUsIG9uY2UpO1xuXHRcdGFwcGx5LmNhbGwobGlzdGVuZXIsIHRoaXMsIGFyZ3VtZW50cyk7XG5cdH0pO1xuXG5cdG9uY2UuX19lZU9uY2VMaXN0ZW5lcl9fID0gbGlzdGVuZXI7XG5cdHJldHVybiB0aGlzO1xufTtcblxub2ZmID0gZnVuY3Rpb24gKHR5cGUsIGxpc3RlbmVyKSB7XG5cdHZhciBkYXRhLCBsaXN0ZW5lcnMsIGNhbmRpZGF0ZSwgaTtcblxuXHRjYWxsYWJsZShsaXN0ZW5lcik7XG5cblx0aWYgKCFoYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMsICdfX2VlX18nKSkgcmV0dXJuIHRoaXM7XG5cdGRhdGEgPSB0aGlzLl9fZWVfXztcblx0aWYgKCFkYXRhW3R5cGVdKSByZXR1cm4gdGhpcztcblx0bGlzdGVuZXJzID0gZGF0YVt0eXBlXTtcblxuXHRpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ29iamVjdCcpIHtcblx0XHRmb3IgKGkgPSAwOyAoY2FuZGlkYXRlID0gbGlzdGVuZXJzW2ldKTsgKytpKSB7XG5cdFx0XHRpZiAoKGNhbmRpZGF0ZSA9PT0gbGlzdGVuZXIpIHx8XG5cdFx0XHRcdFx0KGNhbmRpZGF0ZS5fX2VlT25jZUxpc3RlbmVyX18gPT09IGxpc3RlbmVyKSkge1xuXHRcdFx0XHRpZiAobGlzdGVuZXJzLmxlbmd0aCA9PT0gMikgZGF0YVt0eXBlXSA9IGxpc3RlbmVyc1tpID8gMCA6IDFdO1xuXHRcdFx0XHRlbHNlIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdGlmICgobGlzdGVuZXJzID09PSBsaXN0ZW5lcikgfHxcblx0XHRcdFx0KGxpc3RlbmVycy5fX2VlT25jZUxpc3RlbmVyX18gPT09IGxpc3RlbmVyKSkge1xuXHRcdFx0ZGVsZXRlIGRhdGFbdHlwZV07XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG5lbWl0ID0gZnVuY3Rpb24gKHR5cGUpIHtcblx0dmFyIGksIGwsIGxpc3RlbmVyLCBsaXN0ZW5lcnMsIGFyZ3M7XG5cblx0aWYgKCFoYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMsICdfX2VlX18nKSkgcmV0dXJuO1xuXHRsaXN0ZW5lcnMgPSB0aGlzLl9fZWVfX1t0eXBlXTtcblx0aWYgKCFsaXN0ZW5lcnMpIHJldHVybjtcblxuXHRpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ29iamVjdCcpIHtcblx0XHRsID0gYXJndW1lbnRzLmxlbmd0aDtcblx0XHRhcmdzID0gbmV3IEFycmF5KGwgLSAxKTtcblx0XHRmb3IgKGkgPSAxOyBpIDwgbDsgKytpKSBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcblxuXHRcdGxpc3RlbmVycyA9IGxpc3RlbmVycy5zbGljZSgpO1xuXHRcdGZvciAoaSA9IDA7IChsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXSk7ICsraSkge1xuXHRcdFx0YXBwbHkuY2FsbChsaXN0ZW5lciwgdGhpcywgYXJncyk7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuXHRcdGNhc2UgMTpcblx0XHRcdGNhbGwuY2FsbChsaXN0ZW5lcnMsIHRoaXMpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAyOlxuXHRcdFx0Y2FsbC5jYWxsKGxpc3RlbmVycywgdGhpcywgYXJndW1lbnRzWzFdKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMzpcblx0XHRcdGNhbGwuY2FsbChsaXN0ZW5lcnMsIHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcblx0XHRcdGJyZWFrO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRsID0gYXJndW1lbnRzLmxlbmd0aDtcblx0XHRcdGFyZ3MgPSBuZXcgQXJyYXkobCAtIDEpO1xuXHRcdFx0Zm9yIChpID0gMTsgaSA8IGw7ICsraSkge1xuXHRcdFx0XHRhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdH1cblx0XHRcdGFwcGx5LmNhbGwobGlzdGVuZXJzLCB0aGlzLCBhcmdzKTtcblx0XHR9XG5cdH1cbn07XG5cbm1ldGhvZHMgPSB7XG5cdG9uOiBvbixcblx0b25jZTogb25jZSxcblx0b2ZmOiBvZmYsXG5cdGVtaXQ6IGVtaXRcbn07XG5cbmRlc2NyaXB0b3JzID0ge1xuXHRvbjogZChvbiksXG5cdG9uY2U6IGQob25jZSksXG5cdG9mZjogZChvZmYpLFxuXHRlbWl0OiBkKGVtaXQpXG59O1xuXG5iYXNlID0gZGVmaW5lUHJvcGVydGllcyh7fSwgZGVzY3JpcHRvcnMpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmdW5jdGlvbiAobykge1xuXHRyZXR1cm4gKG8gPT0gbnVsbCkgPyBjcmVhdGUoYmFzZSkgOiBkZWZpbmVQcm9wZXJ0aWVzKE9iamVjdChvKSwgZGVzY3JpcHRvcnMpO1xufTtcbmV4cG9ydHMubWV0aG9kcyA9IG1ldGhvZHM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMy40QGV2ZW50LWVtaXR0ZXIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDEwNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFzc2lnbiAgICAgICAgPSByZXF1aXJlKCdlczUtZXh0L29iamVjdC9hc3NpZ24nKVxuICAsIG5vcm1hbGl6ZU9wdHMgPSByZXF1aXJlKCdlczUtZXh0L29iamVjdC9ub3JtYWxpemUtb3B0aW9ucycpXG4gICwgaXNDYWxsYWJsZSAgICA9IHJlcXVpcmUoJ2VzNS1leHQvb2JqZWN0L2lzLWNhbGxhYmxlJylcbiAgLCBjb250YWlucyAgICAgID0gcmVxdWlyZSgnZXM1LWV4dC9zdHJpbmcvIy9jb250YWlucycpXG5cbiAgLCBkO1xuXG5kID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZHNjciwgdmFsdWUvKiwgb3B0aW9ucyovKSB7XG5cdHZhciBjLCBlLCB3LCBvcHRpb25zLCBkZXNjO1xuXHRpZiAoKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB8fCAodHlwZW9mIGRzY3IgIT09ICdzdHJpbmcnKSkge1xuXHRcdG9wdGlvbnMgPSB2YWx1ZTtcblx0XHR2YWx1ZSA9IGRzY3I7XG5cdFx0ZHNjciA9IG51bGw7XG5cdH0gZWxzZSB7XG5cdFx0b3B0aW9ucyA9IGFyZ3VtZW50c1syXTtcblx0fVxuXHRpZiAoZHNjciA9PSBudWxsKSB7XG5cdFx0YyA9IHcgPSB0cnVlO1xuXHRcdGUgPSBmYWxzZTtcblx0fSBlbHNlIHtcblx0XHRjID0gY29udGFpbnMuY2FsbChkc2NyLCAnYycpO1xuXHRcdGUgPSBjb250YWlucy5jYWxsKGRzY3IsICdlJyk7XG5cdFx0dyA9IGNvbnRhaW5zLmNhbGwoZHNjciwgJ3cnKTtcblx0fVxuXG5cdGRlc2MgPSB7IHZhbHVlOiB2YWx1ZSwgY29uZmlndXJhYmxlOiBjLCBlbnVtZXJhYmxlOiBlLCB3cml0YWJsZTogdyB9O1xuXHRyZXR1cm4gIW9wdGlvbnMgPyBkZXNjIDogYXNzaWduKG5vcm1hbGl6ZU9wdHMob3B0aW9ucyksIGRlc2MpO1xufTtcblxuZC5ncyA9IGZ1bmN0aW9uIChkc2NyLCBnZXQsIHNldC8qLCBvcHRpb25zKi8pIHtcblx0dmFyIGMsIGUsIG9wdGlvbnMsIGRlc2M7XG5cdGlmICh0eXBlb2YgZHNjciAhPT0gJ3N0cmluZycpIHtcblx0XHRvcHRpb25zID0gc2V0O1xuXHRcdHNldCA9IGdldDtcblx0XHRnZXQgPSBkc2NyO1xuXHRcdGRzY3IgPSBudWxsO1xuXHR9IGVsc2Uge1xuXHRcdG9wdGlvbnMgPSBhcmd1bWVudHNbM107XG5cdH1cblx0aWYgKGdldCA9PSBudWxsKSB7XG5cdFx0Z2V0ID0gdW5kZWZpbmVkO1xuXHR9IGVsc2UgaWYgKCFpc0NhbGxhYmxlKGdldCkpIHtcblx0XHRvcHRpb25zID0gZ2V0O1xuXHRcdGdldCA9IHNldCA9IHVuZGVmaW5lZDtcblx0fSBlbHNlIGlmIChzZXQgPT0gbnVsbCkge1xuXHRcdHNldCA9IHVuZGVmaW5lZDtcblx0fSBlbHNlIGlmICghaXNDYWxsYWJsZShzZXQpKSB7XG5cdFx0b3B0aW9ucyA9IHNldDtcblx0XHRzZXQgPSB1bmRlZmluZWQ7XG5cdH1cblx0aWYgKGRzY3IgPT0gbnVsbCkge1xuXHRcdGMgPSB0cnVlO1xuXHRcdGUgPSBmYWxzZTtcblx0fSBlbHNlIHtcblx0XHRjID0gY29udGFpbnMuY2FsbChkc2NyLCAnYycpO1xuXHRcdGUgPSBjb250YWlucy5jYWxsKGRzY3IsICdlJyk7XG5cdH1cblxuXHRkZXNjID0geyBnZXQ6IGdldCwgc2V0OiBzZXQsIGNvbmZpZ3VyYWJsZTogYywgZW51bWVyYWJsZTogZSB9O1xuXHRyZXR1cm4gIW9wdGlvbnMgPyBkZXNjIDogYXNzaWduKG5vcm1hbGl6ZU9wdHMob3B0aW9ucyksIGRlc2MpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4xLjFAZC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vaXMtaW1wbGVtZW50ZWQnKSgpXG5cdD8gT2JqZWN0LmFzc2lnblxuXHQ6IHJlcXVpcmUoJy4vc2hpbScpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjEwLjEyQGVzNS1leHQvb2JqZWN0L2Fzc2lnbi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIGFzc2lnbiA9IE9iamVjdC5hc3NpZ24sIG9iajtcblx0aWYgKHR5cGVvZiBhc3NpZ24gIT09ICdmdW5jdGlvbicpIHJldHVybiBmYWxzZTtcblx0b2JqID0geyBmb286ICdyYXonIH07XG5cdGFzc2lnbihvYmosIHsgYmFyOiAnZHdhJyB9LCB7IHRyenk6ICd0cnp5JyB9KTtcblx0cmV0dXJuIChvYmouZm9vICsgb2JqLmJhciArIG9iai50cnp5KSA9PT0gJ3JhemR3YXRyenknO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4xMC4xMkBlczUtZXh0L29iamVjdC9hc3NpZ24vaXMtaW1wbGVtZW50ZWQuanNcbi8vIG1vZHVsZSBpZCA9IDEwOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxudmFyIGtleXMgID0gcmVxdWlyZSgnLi4va2V5cycpXG4gICwgdmFsdWUgPSByZXF1aXJlKCcuLi92YWxpZC12YWx1ZScpXG5cbiAgLCBtYXggPSBNYXRoLm1heDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZGVzdCwgc3JjLyosIOKApnNyY24qLykge1xuXHR2YXIgZXJyb3IsIGksIGwgPSBtYXgoYXJndW1lbnRzLmxlbmd0aCwgMiksIGFzc2lnbjtcblx0ZGVzdCA9IE9iamVjdCh2YWx1ZShkZXN0KSk7XG5cdGFzc2lnbiA9IGZ1bmN0aW9uIChrZXkpIHtcblx0XHR0cnkgeyBkZXN0W2tleV0gPSBzcmNba2V5XTsgfSBjYXRjaCAoZSkge1xuXHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlO1xuXHRcdH1cblx0fTtcblx0Zm9yIChpID0gMTsgaSA8IGw7ICsraSkge1xuXHRcdHNyYyA9IGFyZ3VtZW50c1tpXTtcblx0XHRrZXlzKHNyYykuZm9yRWFjaChhc3NpZ24pO1xuXHR9XG5cdGlmIChlcnJvciAhPT0gdW5kZWZpbmVkKSB0aHJvdyBlcnJvcjtcblx0cmV0dXJuIGRlc3Q7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjEwLjEyQGVzNS1leHQvb2JqZWN0L2Fzc2lnbi9zaGltLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9pcy1pbXBsZW1lbnRlZCcpKClcblx0PyBPYmplY3Qua2V5c1xuXHQ6IHJlcXVpcmUoJy4vc2hpbScpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjEwLjEyQGVzNS1leHQvb2JqZWN0L2tleXMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDExMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cdHRyeSB7XG5cdFx0T2JqZWN0LmtleXMoJ3ByaW1pdGl2ZScpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlKSB7IHJldHVybiBmYWxzZTsgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4xMC4xMkBlczUtZXh0L29iamVjdC9rZXlzL2lzLWltcGxlbWVudGVkLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbnZhciBrZXlzID0gT2JqZWN0LmtleXM7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCkge1xuXHRyZXR1cm4ga2V5cyhvYmplY3QgPT0gbnVsbCA/IG9iamVjdCA6IE9iamVjdChvYmplY3QpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3Qva2V5cy9zaGltLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdGlmICh2YWx1ZSA9PSBudWxsKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHVzZSBudWxsIG9yIHVuZGVmaW5lZFwiKTtcblx0cmV0dXJuIHZhbHVlO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4xMC4xMkBlczUtZXh0L29iamVjdC92YWxpZC12YWx1ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZm9yRWFjaCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLCBjcmVhdGUgPSBPYmplY3QuY3JlYXRlO1xuXG52YXIgcHJvY2VzcyA9IGZ1bmN0aW9uIChzcmMsIG9iaikge1xuXHR2YXIga2V5O1xuXHRmb3IgKGtleSBpbiBzcmMpIG9ialtrZXldID0gc3JjW2tleV07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcHRpb25zLyosIOKApm9wdGlvbnMqLykge1xuXHR2YXIgcmVzdWx0ID0gY3JlYXRlKG51bGwpO1xuXHRmb3JFYWNoLmNhbGwoYXJndW1lbnRzLCBmdW5jdGlvbiAob3B0aW9ucykge1xuXHRcdGlmIChvcHRpb25zID09IG51bGwpIHJldHVybjtcblx0XHRwcm9jZXNzKE9iamVjdChvcHRpb25zKSwgcmVzdWx0KTtcblx0fSk7XG5cdHJldHVybiByZXN1bHQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjEwLjEyQGVzNS1leHQvb2JqZWN0L25vcm1hbGl6ZS1vcHRpb25zLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBEZXByZWNhdGVkXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nOyB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjEwLjEyQGVzNS1leHQvb2JqZWN0L2lzLWNhbGxhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9pcy1pbXBsZW1lbnRlZCcpKClcblx0PyBTdHJpbmcucHJvdG90eXBlLmNvbnRhaW5zXG5cdDogcmVxdWlyZSgnLi9zaGltJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMTAuMTJAZXM1LWV4dC9zdHJpbmcvIy9jb250YWlucy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyID0gJ3JhemR3YXRyenknO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblx0aWYgKHR5cGVvZiBzdHIuY29udGFpbnMgIT09ICdmdW5jdGlvbicpIHJldHVybiBmYWxzZTtcblx0cmV0dXJuICgoc3RyLmNvbnRhaW5zKCdkd2EnKSA9PT0gdHJ1ZSkgJiYgKHN0ci5jb250YWlucygnZm9vJykgPT09IGZhbHNlKSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjEwLjEyQGVzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvaXMtaW1wbGVtZW50ZWQuanNcbi8vIG1vZHVsZSBpZCA9IDExOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxudmFyIGluZGV4T2YgPSBTdHJpbmcucHJvdG90eXBlLmluZGV4T2Y7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNlYXJjaFN0cmluZy8qLCBwb3NpdGlvbiovKSB7XG5cdHJldHVybiBpbmRleE9mLmNhbGwodGhpcywgc2VhcmNoU3RyaW5nLCBhcmd1bWVudHNbMV0pID4gLTE7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4wLjEwLjEyQGVzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvc2hpbS5qc1xuLy8gbW9kdWxlIGlkID0gMTE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbikge1xuXHRpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB0aHJvdyBuZXcgVHlwZUVycm9yKGZuICsgXCIgaXMgbm90IGEgZnVuY3Rpb25cIik7XG5cdHJldHVybiBmbjtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjAuMTAuMTJAZXM1LWV4dC9vYmplY3QvdmFsaWQtY2FsbGFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDEyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2lzSXRlcmFibGUyID0gcmVxdWlyZShcIi4uL2NvcmUtanMvaXMtaXRlcmFibGVcIik7XG5cbnZhciBfaXNJdGVyYWJsZTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0l0ZXJhYmxlMik7XG5cbnZhciBfZ2V0SXRlcmF0b3IyID0gcmVxdWlyZShcIi4uL2NvcmUtanMvZ2V0LWl0ZXJhdG9yXCIpO1xuXG52YXIgX2dldEl0ZXJhdG9yMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldEl0ZXJhdG9yMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHtcbiAgICB2YXIgX2FyciA9IFtdO1xuICAgIHZhciBfbiA9IHRydWU7XG4gICAgdmFyIF9kID0gZmFsc2U7XG4gICAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAodmFyIF9pID0gKDAsIF9nZXRJdGVyYXRvcjMuZGVmYXVsdCkoYXJyKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBfZCA9IHRydWU7XG4gICAgICBfZSA9IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIF9hcnI7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICAgIHJldHVybiBhcnI7XG4gICAgfSBlbHNlIGlmICgoMCwgX2lzSXRlcmFibGUzLmRlZmF1bHQpKE9iamVjdChhcnIpKSkge1xuICAgICAgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG4gICAgfVxuICB9O1xufSgpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSAxMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vaXMtaXRlcmFibGVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjYuMTguMEBiYWJlbC1ydW50aW1lL2NvcmUtanMvaXMtaXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDEyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29yZS5pcy1pdGVyYWJsZScpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgY2xhc3NvZiAgID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpXG4gICwgSVRFUkFUT1IgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmlzSXRlcmFibGUgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBPID0gT2JqZWN0KGl0KTtcbiAgcmV0dXJuIE9bSVRFUkFUT1JdICE9PSB1bmRlZmluZWRcbiAgICB8fCAnQEBpdGVyYXRvcicgaW4gT1xuICAgIHx8IEl0ZXJhdG9ycy5oYXNPd25Qcm9wZXJ0eShjbGFzc29mKE8pKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmlzLWl0ZXJhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly42LjE4LjBAYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMTI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwicmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvcicpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMTMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBnZXQgICAgICA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvciA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIGl0ZXJGbiA9IGdldChpdCk7XG4gIGlmKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgcmV0dXJuIGFuT2JqZWN0KGl0ZXJGbi5jYWxsKGl0KSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDEzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICAnVFlQRSc6IHtcbiAgICAgICAgJ3NpbmdsZSc6IDEsXG4gICAgICAgICdzdGF0aWMnOiAyLFxuICAgICAgICAnZHluYW1pYyc6IDNcbiAgICB9LFxuICAgICcyJzoge1xuICAgICAgICB0eXBlOiAyXG4gICAgfSxcbiAgICAnOCc6IHtcbiAgICAgICAgdHlwZTogMlxuICAgIH0swqBcbiAgICAnMTAnOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnNTAwMOWFieW5tCcsXG4gICAgICAgIHR5cGU6IDJcbiAgICB9LFxuICAgICcxOCc6IHtcbiAgICAgICAgZGlzdGFuY2U6ICc0NTDlhYnlubQnLFxuICAgICAgICB0eXBlOiAyXG4gICAgfSxcbiAgICAnMjEnOiB7XG4gICAgICAgIHkxOiAxMzM0LFxuICAgICAgICB5MjogMCxcbiAgICAgICAgdHlwZTogMyxcbiAgICAgICAgY29pblg6IDQwMCxcbiAgICAgICAgY29pblk6IDE1MFxuICAgIH0sXG4gICAgJzIzJzoge1xuICAgICAgICBkaXN0YW5jZTogJzE0MDDlhYnlubQnLFxuICAgICAgICB5MTogMTMzNCxcbiAgICAgICAgeTI6IDAsXG4gICAgICAgIHR5cGU6IDMsXG4gICAgICAgIGNvaW5YOiA0MDAsXG4gICAgICAgIGNvaW5ZOiAxNTBcbiAgICB9LFxuICAgICcyOCc6IHtcbiAgICAgICAgZGlzdGFuY2U6ICc5ODDlhYnlubQnLFxuICAgICAgICB5MTogMTMzNCxcbiAgICAgICAgeTI6IDAsXG4gICAgICAgIHR5cGU6IDMsXG4gICAgICAgIGNvaW5YOiA0MDAsXG4gICAgICAgIGNvaW5ZOiAxNTBcbiAgICB9LFxuICAgICczMSc6IHtcbiAgICAgICAgeTE6IDEzMzQsXG4gICAgICAgIHkyOiAwLFxuICAgICAgICB0eXBlOiAzLFxuICAgICAgICBjb2luWDogNDAwLFxuICAgICAgICBjb2luWTogMTUwXG4gICAgfSxcbiAgICAnMzQnOiB7XG4gICAgICAgIHkxOiAxMzM0LFxuICAgICAgICB5MjogMCxcbiAgICAgICAgdHlwZTogMyxcbiAgICAgICAgY29pblg6IDQwMCxcbiAgICAgICAgY29pblk6IDE1MFxuICAgIH0sXG4gICAgJzM4Jzoge1xuICAgICAgICBkaXN0YW5jZTogJzQwMDDlhYnlubQnLFxuICAgICAgICB0eXBlOiAxXG4gICAgfSxcbiAgICAnNDEnOiB7XG4gICAgICAgIHkxOiAxMzM0LFxuICAgICAgICB5MjogMCxcbiAgICAgICAgdHlwZTogMyxcbiAgICAgICAgY29pblg6IDQwMCxcbiAgICAgICAgY29pblk6IDE1MFxuICAgIH0sXG4gICAgJzQ0Jzoge1xuICAgICAgICBkaXN0YW5jZTogJzQwMOWFieW5tCcsXG4gICAgICAgIHkxOiAxMzM0LFxuICAgICAgICB5MjogMCxcbiAgICAgICAgdHlwZTogMyxcbiAgICAgICAgY29pblg6IDQwMCxcbiAgICAgICAgY29pblk6IDE1MFxuICAgIH0sXG4gICAgJzQ2Jzoge1xuICAgICAgICBkaXN0YW5jZTogJzguNuWFieW5tCcsXG4gICAgICAgIHkxOiAxMzM0LFxuICAgICAgICB5MjogMCxcbiAgICAgICAgdHlwZTogMyxcbiAgICAgICAgY29pblg6IDQwMCxcbiAgICAgICAgY29pblk6IDE1MFxuICAgIH0sXG4gICAgJzQ5Jzoge1xuICAgICAgICBkaXN0YW5jZTogJzI1LjA05YWJ5bm0JyxcbiAgICAgICAgdHlwZTogMlxuICAgIH0sXG4gICAgJzU2Jzoge1xuICAgICAgICBkaXN0YW5jZTogJzQuMjLlhYnlubQnLFxuICAgICAgICB0eXBlOiAyXG4gICAgfSxcbiAgICAnNTknOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnMTYuN+WFieW5tCcsXG4gICAgICAgIHR5cGU6IDJcbiAgICB9LFxuICAgICc2MSc6IHtcbiAgICAgICAgZGlzdGFuY2U6ICcyMC405YWJ5bm0JyxcbiAgICAgICAgdHlwZTogMlxuICAgIH0sXG4gICAgJzY0Jzoge1xuICAgICAgICBkaXN0YW5jZTogJzEwNy43MTLkur/lhazph4wnLFxuICAgICAgICB0eXBlOiAyXG4gICAgfSxcbiAgICAnNjcnOiB7XG4gICAgICAgIHR5cGU6IDJcbiAgICB9LFxuICAgICc2OSc6IHtcbiAgICAgICAgZGlzdGFuY2U6ICcxMDEuNzI45Lq/5YWs6YeMJyxcbiAgICAgICAgeTE6IDEzMzQsXG4gICAgICAgIHkyOiAwLFxuICAgICAgICB0eXBlOiAzLFxuICAgICAgICBjb2luWDogNDAwLFxuICAgICAgICBjb2luWTogMTUwXG4gICAgfSxcbiAgICAnNzQnOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnNTnkur/lhazph4wnLFxuICAgICAgICB5MTogMTMzNCxcbiAgICAgICAgeTI6IDAsXG4gICAgICAgIHR5cGU6IDMsXG4gICAgICAgIGNvaW5YOiA0MDAsXG4gICAgICAgIGNvaW5ZOiAxNTBcbiAgICB9LFxuICAgICc3Nic6IHtcbiAgICAgICAgeTE6IDEzMzQsXG4gICAgICAgIHkyOiAwLFxuICAgICAgICB0eXBlOiAzLFxuICAgICAgICBjb2luWDogNDAwLFxuICAgICAgICBjb2luWTogMTUwXG4gICAgfSxcbiAgICAnNzknOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnNDMuNeS6v+WFrOmHjCcsXG4gICAgICAgIHR5cGU6IDJcbiAgICB9LFxuICAgICc4Mic6IHtcbiAgICAgICAgZGlzdGFuY2U6ICcyNy4xOeS6v+WFrOmHjCcsXG4gICAgICAgIHkxOiAxMzM0LFxuICAgICAgICB5MjogMCxcbiAgICAgICAgdHlwZTogMyxcbiAgICAgICAgY29pblg6IDQwMCxcbiAgICAgICAgY29pblk6IDE1MFxuICAgIH0sXG4gICAgJzg0Jzoge1xuICAgICAgICB5MTogMTMzNCxcbiAgICAgICAgeTI6IDAsXG4gICAgICAgIHR5cGU6IDMsXG4gICAgICAgIGNvaW5YOiA0MDAsXG4gICAgICAgIGNvaW5ZOiAxNTBcbiAgICB9LFxuICAgICc4Nyc6IHtcbiAgICAgICAgZGlzdGFuY2U6ICcxMi445Lq/5YWs6YeMJyxcbiAgICAgICAgeTE6IDEzMzQsXG4gICAgICAgIHkyOiAwLFxuICAgICAgICB0eXBlOiAzLFxuICAgICAgICBjb2luWDogNDAwLFxuICAgICAgICBjb2luWTogMTUwXG4gICAgfSxcbiAgICAnOTEnOiB7XG4gICAgICAgIHR5cGU6IDFcbiAgICB9LFxuICAgICc5NCc6IHtcbiAgICAgICAgZGlzdGFuY2U6ICcxLjQ5NuS6v+WFrOmHjCcsXG4gICAgICAgIHkxOiAxMzM0LFxuICAgICAgICB5MjogMCxcbiAgICAgICAgdHlwZTogMyxcbiAgICAgICAgY29pblg6IDQwMCxcbiAgICAgICAgY29pblk6IDE1MFxuICAgIH0sXG4gICAgJzk3Jzoge1xuICAgICAgICB0eXBlOiAxXG4gICAgfSxcbiAgICAnOTknOiB7XG4gICAgICAgIHR5cGU6IDJcbiAgICB9LFxuICAgICcxMDInOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnMC45MuS6v+WFrOmHjCcsXG4gICAgICAgIHR5cGU6IDJcbiAgICB9LFxuICAgICcxMDUnOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnNi4z5Lq/5YWs6YeMJyxcbiAgICAgICAgeTE6IDEzMzQsXG4gICAgICAgIHkyOiAwLFxuICAgICAgICB0eXBlOiAzLFxuICAgICAgICBjb2luWDogNDAwLFxuICAgICAgICBjb2luWTogMTUwXG4gICAgfSxcbiAgICAnMTEzJzoge1xuICAgICAgICBkaXN0YW5jZTogJzQxNTDkuIflhazph4wnLFxuICAgICAgICB5MTogMTMzNCxcbiAgICAgICAgeTI6IDAsXG4gICAgICAgIHR5cGU6IDMsXG4gICAgICAgIGNvaW5YOiA0MDAsXG4gICAgICAgIGNvaW5ZOiAxNTBcbiAgICB9LFxuICAgICcxMTUnOiB7XG4gICAgICAgIHR5cGU6IDJcbiAgICB9LFxuICAgICcxMTgnOiB7XG4gICAgICAgIGRpc3RhbmNlOiAnNTUwMOS4h+WFrOmHjCcsXG4gICAgICAgIHkxOiAxMzM0LFxuICAgICAgICB5MjogMCxcbiAgICAgICAgdHlwZTogMyxcbiAgICAgICAgY29pblg6IDQwMCxcbiAgICAgICAgY29pblk6IDE1MFxuICAgIH0sXG4gICAgJzEyMCc6IHtcbiAgICAgICAgdHlwZTogMVxuICAgIH0sXG4gICAgJzEyMSc6IHtcbiAgICAgICAgZGlzdGFuY2U6ICcw5YWs6YeMJyxcbiAgICAgICAgeTE6IDEzMzQsXG4gICAgICAgIHkyOiAwLFxuICAgICAgICB0eXBlOiAzLFxuICAgICAgICBjb2luWDogNDAwLFxuICAgICAgICBjb2luWTogMTUwXG4gICAgfSxcbiAgICAnMTIyJzoge1xuICAgICAgICB0eXBlOiAxXG4gICAgfSxcbiAgICAnMTIzJzoge1xuICAgICAgICBkaXN0YW5jZTogJzM4LjQ05YWs6YeMJyxcbiAgICAgICAgeTE6IDEzMzQsXG4gICAgICAgIHkyOiAwLFxuICAgICAgICB0eXBlOiAzLFxuICAgICAgICBjb2luWDogNDAwLFxuICAgICAgICBjb2luWTogMTUwXG4gICAgfSxcbiAgICAnMTI1Jzoge1xuICAgICAgICB0eXBlOiAyXG4gICAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zbGljZUNvbmZpZy5qcyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5c1wiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gMTM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmtleXMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5rZXlzO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyAxOS4xLjIuMTQgT2JqZWN0LmtleXMoTylcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgJGtleXMgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2tleXMnLCBmdW5jdGlvbigpe1xuICByZXR1cm4gZnVuY3Rpb24ga2V5cyhpdCl7XG4gICAgcmV0dXJuICRrZXlzKHRvT2JqZWN0KGl0KSk7XG4gIH07XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gMTQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiaW1wb3J0IHtcbiAgICB3aW4sXG4gICAgZG9jLFxuICAgIFByb21pc2UsXG4gICAgZGVmZXIsXG4gICAgcXVlcnksXG4gICAgcXVlcnlBbGwsXG4gICAgZ2V0UmVjdCxcbiAgICBnZXREaXN0YW5jZSxcbiAgICByYWYsXG4gICAgY2FmXG59IGZyb20gJy4vdXRpbCc7XG5pbXBvcnQgRXZlbnQgZnJvbSAnLi9ldmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpY2tlciBleHRlbmRzIEV2ZW50e1xuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7XG5cbiAgICAgICAgdGhpcy5faWQgPSAwO1xuICAgICAgICB0aGlzLl9tYXBGID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLl9tYXBDID0gbmV3IE1hcCgpO1xuICAgIH1cblxuICAgIGFkZChmKSB7XG4gICAgICAgIGlmIChmICYmICF0aGlzLl9tYXBDLmhhcyhmKSkge1xuICAgICAgICAgICAgY29uc3QgaWQgPSB0aGlzLl9pZCsrO1xuICAgICAgICAgICAgdGhpcy5fbWFwRi5zZXQoaWQsIGYpO1xuICAgICAgICAgICAgdGhpcy5fbWFwQy5zZXQoZiwge1xuICAgICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgICBkZWZlcnJlZDogZGVmZXIoKSxcbiAgICAgICAgICAgICAgICBjYW5jZWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHN0YXJ0OiAwLFxuICAgICAgICAgICAgICAgIGVsYXBzZWQ6IDAsXG4gICAgICAgICAgICAgICAgZGVsdGE6IDBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFzKGlkKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgaWQgPT09ICdudW1iZXInICYmIHRoaXMuX21hcEYuaGFzKGlkKTtcbiAgICB9XG5cbiAgICBkZWxldGUoaWQpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzKGlkKSkge1xuICAgICAgICAgICAgY29uc3QgZiA9IHRoaXMuX21hcEYuZ2V0KGlkKTtcbiAgICAgICAgICAgIGNvbnN0IGMgPSB0aGlzLl9tYXBDLmdldChmKTtcbiAgICAgICAgICAgIGMuY2FuY2VsID0gdHJ1ZTtcbiAgICAgICAgICAgIGMuZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgdGhpcy5fbWFwRi5kZWxldGUoaWQpO1xuICAgICAgICAgICAgdGhpcy5fbWFwQy5kZWxldGUoZik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlbmQoaWQpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzKGlkKSkge1xuICAgICAgICAgICAgY29uc3QgZiA9IHRoaXMuX21hcEYuZ2V0KGlkKTtcbiAgICAgICAgICAgIGNvbnN0IGMgPSB0aGlzLl9tYXBDLmdldChmKTtcbiAgICAgICAgICAgIHJldHVybiBjLmRlZmVycmVkLnByb21pc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLnJpZCkge1xuICAgICAgICAgICAgY2FmKHRoaXMucmlkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJ1bigpIHtcbiAgICAgICAgdGhpcy5zdGFydCA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuZWxhcHNlZCA9IDA7XG4gICAgICAgIHRoaXMuZGVsdGEgPSAwO1xuXG4gICAgICAgIGNvbnN0IHRpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJpZCA9IHJhZih0aWNrKTtcblxuICAgICAgICAgICAgbGV0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgICAgICBsZXQgZWxhcHNlZCA9IG5vdyAtIHRoaXMuc3RhcnQ7XG5cbiAgICAgICAgICAgIHRoaXMuZGVsdGEgPSBlbGFwc2VkIC0gdGhpcy5lbGFwc2VkO1xuICAgICAgICAgICAgdGhpcy5lbGFwc2VkID0gZWxhcHNlZDtcblxuICAgICAgICAgICAgdGhpcy5lbWl0KCdiZWZvcmV0aWNrJywge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiB0aGlzLnN0YXJ0LFxuICAgICAgICAgICAgICAgIGRlbHRhOiB0aGlzLmRlbHRhLFxuICAgICAgICAgICAgICAgIGVsYXBzZWQ6IHRoaXMuZWxhcHNlZFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGtleXMgPSBbLi4udGhpcy5fbWFwQy5rZXlzKCldO1xuXG4gICAgICAgICAgICBrZXlzLmZvckVhY2goZiA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYyA9IHRoaXMuX21hcEMuZ2V0KGYpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFjLmNhbmNlbCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgICAgICBjLnN0YXJ0ID0gYy5zdGFydCB8fCAoYy5zdGFydCA9IG5vdyk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxhcHNlZCA9IG5vdyAtIGMuc3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgIGMuZGVsdGEgPSBlbGFwc2VkIC0gYy5lbGFwc2VkO1xuICAgICAgICAgICAgICAgICAgICBjLmVsYXBzZWQgPSBlbGFwc2VkO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChmKGMsIHRoaXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZShjLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgZWxhcHNlZCA9IG5vdyAtIHRoaXMuc3RhcnQ7XG5cbiAgICAgICAgICAgIHRoaXMuZGVsdGEgPSBlbGFwc2VkIC0gdGhpcy5lbGFwc2VkO1xuICAgICAgICAgICAgdGhpcy5lbGFwc2VkID0gZWxhcHNlZDtcblxuICAgICAgICAgICAgdGhpcy5lbWl0KCdhZnRlcnRpY2snLCB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHRoaXMuc3RhcnQsXG4gICAgICAgICAgICAgICAgZGVsdGE6IHRoaXMuZGVsdGEsXG4gICAgICAgICAgICAgICAgZWxhcHNlZDogdGhpcy5lbGFwc2VkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmlkID0gcmFmKHRpY2spO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdGlja2VyLmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL21hcFwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uNi4xOC4wQGJhYmVsLXJ1bnRpbWUvY29yZS1qcy9tYXAuanNcbi8vIG1vZHVsZSBpZCA9IDE0OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInJlcXVpcmUoJy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5tYXAnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM3Lm1hcC50by1qc29uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvX2NvcmUnKS5NYXA7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvZm4vbWFwLmpzXG4vLyBtb2R1bGUgaWQgPSAxNDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG52YXIgc3Ryb25nID0gcmVxdWlyZSgnLi9fY29sbGVjdGlvbi1zdHJvbmcnKTtcblxuLy8gMjMuMSBNYXAgT2JqZWN0c1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb2xsZWN0aW9uJykoJ01hcCcsIGZ1bmN0aW9uKGdldCl7XG4gIHJldHVybiBmdW5jdGlvbiBNYXAoKXsgcmV0dXJuIGdldCh0aGlzLCBhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7IH07XG59LCB7XG4gIC8vIDIzLjEuMy42IE1hcC5wcm90b3R5cGUuZ2V0KGtleSlcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoa2V5KXtcbiAgICB2YXIgZW50cnkgPSBzdHJvbmcuZ2V0RW50cnkodGhpcywga2V5KTtcbiAgICByZXR1cm4gZW50cnkgJiYgZW50cnkudjtcbiAgfSxcbiAgLy8gMjMuMS4zLjkgTWFwLnByb3RvdHlwZS5zZXQoa2V5LCB2YWx1ZSlcbiAgc2V0OiBmdW5jdGlvbiBzZXQoa2V5LCB2YWx1ZSl7XG4gICAgcmV0dXJuIHN0cm9uZy5kZWYodGhpcywga2V5ID09PSAwID8gMCA6IGtleSwgdmFsdWUpO1xuICB9XG59LCBzdHJvbmcsIHRydWUpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm1hcC5qc1xuLy8gbW9kdWxlIGlkID0gMTUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGRQICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZlxuICAsIGNyZWF0ZSAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpXG4gICwgcmVkZWZpbmVBbGwgPSByZXF1aXJlKCcuL19yZWRlZmluZS1hbGwnKVxuICAsIGN0eCAgICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBhbkluc3RhbmNlICA9IHJlcXVpcmUoJy4vX2FuLWluc3RhbmNlJylcbiAgLCBkZWZpbmVkICAgICA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKVxuICAsIGZvck9mICAgICAgID0gcmVxdWlyZSgnLi9fZm9yLW9mJylcbiAgLCAkaXRlckRlZmluZSA9IHJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJylcbiAgLCBzdGVwICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXItc3RlcCcpXG4gICwgc2V0U3BlY2llcyAgPSByZXF1aXJlKCcuL19zZXQtc3BlY2llcycpXG4gICwgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpXG4gICwgZmFzdEtleSAgICAgPSByZXF1aXJlKCcuL19tZXRhJykuZmFzdEtleVxuICAsIFNJWkUgICAgICAgID0gREVTQ1JJUFRPUlMgPyAnX3MnIDogJ3NpemUnO1xuXG52YXIgZ2V0RW50cnkgPSBmdW5jdGlvbih0aGF0LCBrZXkpe1xuICAvLyBmYXN0IGNhc2VcbiAgdmFyIGluZGV4ID0gZmFzdEtleShrZXkpLCBlbnRyeTtcbiAgaWYoaW5kZXggIT09ICdGJylyZXR1cm4gdGhhdC5faVtpbmRleF07XG4gIC8vIGZyb3plbiBvYmplY3QgY2FzZVxuICBmb3IoZW50cnkgPSB0aGF0Ll9mOyBlbnRyeTsgZW50cnkgPSBlbnRyeS5uKXtcbiAgICBpZihlbnRyeS5rID09IGtleSlyZXR1cm4gZW50cnk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRDb25zdHJ1Y3RvcjogZnVuY3Rpb24od3JhcHBlciwgTkFNRSwgSVNfTUFQLCBBRERFUil7XG4gICAgdmFyIEMgPSB3cmFwcGVyKGZ1bmN0aW9uKHRoYXQsIGl0ZXJhYmxlKXtcbiAgICAgIGFuSW5zdGFuY2UodGhhdCwgQywgTkFNRSwgJ19pJyk7XG4gICAgICB0aGF0Ll9pID0gY3JlYXRlKG51bGwpOyAvLyBpbmRleFxuICAgICAgdGhhdC5fZiA9IHVuZGVmaW5lZDsgICAgLy8gZmlyc3QgZW50cnlcbiAgICAgIHRoYXQuX2wgPSB1bmRlZmluZWQ7ICAgIC8vIGxhc3QgZW50cnlcbiAgICAgIHRoYXRbU0laRV0gPSAwOyAgICAgICAgIC8vIHNpemVcbiAgICAgIGlmKGl0ZXJhYmxlICE9IHVuZGVmaW5lZClmb3JPZihpdGVyYWJsZSwgSVNfTUFQLCB0aGF0W0FEREVSXSwgdGhhdCk7XG4gICAgfSk7XG4gICAgcmVkZWZpbmVBbGwoQy5wcm90b3R5cGUsIHtcbiAgICAgIC8vIDIzLjEuMy4xIE1hcC5wcm90b3R5cGUuY2xlYXIoKVxuICAgICAgLy8gMjMuMi4zLjIgU2V0LnByb3RvdHlwZS5jbGVhcigpXG4gICAgICBjbGVhcjogZnVuY3Rpb24gY2xlYXIoKXtcbiAgICAgICAgZm9yKHZhciB0aGF0ID0gdGhpcywgZGF0YSA9IHRoYXQuX2ksIGVudHJ5ID0gdGhhdC5fZjsgZW50cnk7IGVudHJ5ID0gZW50cnkubil7XG4gICAgICAgICAgZW50cnkuciA9IHRydWU7XG4gICAgICAgICAgaWYoZW50cnkucCllbnRyeS5wID0gZW50cnkucC5uID0gdW5kZWZpbmVkO1xuICAgICAgICAgIGRlbGV0ZSBkYXRhW2VudHJ5LmldO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQuX2YgPSB0aGF0Ll9sID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGF0W1NJWkVdID0gMDtcbiAgICAgIH0sXG4gICAgICAvLyAyMy4xLjMuMyBNYXAucHJvdG90eXBlLmRlbGV0ZShrZXkpXG4gICAgICAvLyAyMy4yLjMuNCBTZXQucHJvdG90eXBlLmRlbGV0ZSh2YWx1ZSlcbiAgICAgICdkZWxldGUnOiBmdW5jdGlvbihrZXkpe1xuICAgICAgICB2YXIgdGhhdCAgPSB0aGlzXG4gICAgICAgICAgLCBlbnRyeSA9IGdldEVudHJ5KHRoYXQsIGtleSk7XG4gICAgICAgIGlmKGVudHJ5KXtcbiAgICAgICAgICB2YXIgbmV4dCA9IGVudHJ5Lm5cbiAgICAgICAgICAgICwgcHJldiA9IGVudHJ5LnA7XG4gICAgICAgICAgZGVsZXRlIHRoYXQuX2lbZW50cnkuaV07XG4gICAgICAgICAgZW50cnkuciA9IHRydWU7XG4gICAgICAgICAgaWYocHJldilwcmV2Lm4gPSBuZXh0O1xuICAgICAgICAgIGlmKG5leHQpbmV4dC5wID0gcHJldjtcbiAgICAgICAgICBpZih0aGF0Ll9mID09IGVudHJ5KXRoYXQuX2YgPSBuZXh0O1xuICAgICAgICAgIGlmKHRoYXQuX2wgPT0gZW50cnkpdGhhdC5fbCA9IHByZXY7XG4gICAgICAgICAgdGhhdFtTSVpFXS0tO1xuICAgICAgICB9IHJldHVybiAhIWVudHJ5O1xuICAgICAgfSxcbiAgICAgIC8vIDIzLjIuMy42IFNldC5wcm90b3R5cGUuZm9yRWFjaChjYWxsYmFja2ZuLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICAgICAgLy8gMjMuMS4zLjUgTWFwLnByb3RvdHlwZS5mb3JFYWNoKGNhbGxiYWNrZm4sIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gICAgICBmb3JFYWNoOiBmdW5jdGlvbiBmb3JFYWNoKGNhbGxiYWNrZm4gLyosIHRoYXQgPSB1bmRlZmluZWQgKi8pe1xuICAgICAgICBhbkluc3RhbmNlKHRoaXMsIEMsICdmb3JFYWNoJyk7XG4gICAgICAgIHZhciBmID0gY3R4KGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkLCAzKVxuICAgICAgICAgICwgZW50cnk7XG4gICAgICAgIHdoaWxlKGVudHJ5ID0gZW50cnkgPyBlbnRyeS5uIDogdGhpcy5fZil7XG4gICAgICAgICAgZihlbnRyeS52LCBlbnRyeS5rLCB0aGlzKTtcbiAgICAgICAgICAvLyByZXZlcnQgdG8gdGhlIGxhc3QgZXhpc3RpbmcgZW50cnlcbiAgICAgICAgICB3aGlsZShlbnRyeSAmJiBlbnRyeS5yKWVudHJ5ID0gZW50cnkucDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIC8vIDIzLjEuMy43IE1hcC5wcm90b3R5cGUuaGFzKGtleSlcbiAgICAgIC8vIDIzLjIuMy43IFNldC5wcm90b3R5cGUuaGFzKHZhbHVlKVxuICAgICAgaGFzOiBmdW5jdGlvbiBoYXMoa2V5KXtcbiAgICAgICAgcmV0dXJuICEhZ2V0RW50cnkodGhpcywga2V5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZihERVNDUklQVE9SUylkUChDLnByb3RvdHlwZSwgJ3NpemUnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBkZWZpbmVkKHRoaXNbU0laRV0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBDO1xuICB9LFxuICBkZWY6IGZ1bmN0aW9uKHRoYXQsIGtleSwgdmFsdWUpe1xuICAgIHZhciBlbnRyeSA9IGdldEVudHJ5KHRoYXQsIGtleSlcbiAgICAgICwgcHJldiwgaW5kZXg7XG4gICAgLy8gY2hhbmdlIGV4aXN0aW5nIGVudHJ5XG4gICAgaWYoZW50cnkpe1xuICAgICAgZW50cnkudiA9IHZhbHVlO1xuICAgIC8vIGNyZWF0ZSBuZXcgZW50cnlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhhdC5fbCA9IGVudHJ5ID0ge1xuICAgICAgICBpOiBpbmRleCA9IGZhc3RLZXkoa2V5LCB0cnVlKSwgLy8gPC0gaW5kZXhcbiAgICAgICAgazoga2V5LCAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGtleVxuICAgICAgICB2OiB2YWx1ZSwgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gdmFsdWVcbiAgICAgICAgcDogcHJldiA9IHRoYXQuX2wsICAgICAgICAgICAgIC8vIDwtIHByZXZpb3VzIGVudHJ5XG4gICAgICAgIG46IHVuZGVmaW5lZCwgICAgICAgICAgICAgICAgICAvLyA8LSBuZXh0IGVudHJ5XG4gICAgICAgIHI6IGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSByZW1vdmVkXG4gICAgICB9O1xuICAgICAgaWYoIXRoYXQuX2YpdGhhdC5fZiA9IGVudHJ5O1xuICAgICAgaWYocHJldilwcmV2Lm4gPSBlbnRyeTtcbiAgICAgIHRoYXRbU0laRV0rKztcbiAgICAgIC8vIGFkZCB0byBpbmRleFxuICAgICAgaWYoaW5kZXggIT09ICdGJyl0aGF0Ll9pW2luZGV4XSA9IGVudHJ5O1xuICAgIH0gcmV0dXJuIHRoYXQ7XG4gIH0sXG4gIGdldEVudHJ5OiBnZXRFbnRyeSxcbiAgc2V0U3Ryb25nOiBmdW5jdGlvbihDLCBOQU1FLCBJU19NQVApe1xuICAgIC8vIGFkZCAua2V5cywgLnZhbHVlcywgLmVudHJpZXMsIFtAQGl0ZXJhdG9yXVxuICAgIC8vIDIzLjEuMy40LCAyMy4xLjMuOCwgMjMuMS4zLjExLCAyMy4xLjMuMTIsIDIzLjIuMy41LCAyMy4yLjMuOCwgMjMuMi4zLjEwLCAyMy4yLjMuMTFcbiAgICAkaXRlckRlZmluZShDLCBOQU1FLCBmdW5jdGlvbihpdGVyYXRlZCwga2luZCl7XG4gICAgICB0aGlzLl90ID0gaXRlcmF0ZWQ7ICAvLyB0YXJnZXRcbiAgICAgIHRoaXMuX2sgPSBraW5kOyAgICAgIC8vIGtpbmRcbiAgICAgIHRoaXMuX2wgPSB1bmRlZmluZWQ7IC8vIHByZXZpb3VzXG4gICAgfSwgZnVuY3Rpb24oKXtcbiAgICAgIHZhciB0aGF0ICA9IHRoaXNcbiAgICAgICAgLCBraW5kICA9IHRoYXQuX2tcbiAgICAgICAgLCBlbnRyeSA9IHRoYXQuX2w7XG4gICAgICAvLyByZXZlcnQgdG8gdGhlIGxhc3QgZXhpc3RpbmcgZW50cnlcbiAgICAgIHdoaWxlKGVudHJ5ICYmIGVudHJ5LnIpZW50cnkgPSBlbnRyeS5wO1xuICAgICAgLy8gZ2V0IG5leHQgZW50cnlcbiAgICAgIGlmKCF0aGF0Ll90IHx8ICEodGhhdC5fbCA9IGVudHJ5ID0gZW50cnkgPyBlbnRyeS5uIDogdGhhdC5fdC5fZikpe1xuICAgICAgICAvLyBvciBmaW5pc2ggdGhlIGl0ZXJhdGlvblxuICAgICAgICB0aGF0Ll90ID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gc3RlcCgxKTtcbiAgICAgIH1cbiAgICAgIC8vIHJldHVybiBzdGVwIGJ5IGtpbmRcbiAgICAgIGlmKGtpbmQgPT0gJ2tleXMnICApcmV0dXJuIHN0ZXAoMCwgZW50cnkuayk7XG4gICAgICBpZihraW5kID09ICd2YWx1ZXMnKXJldHVybiBzdGVwKDAsIGVudHJ5LnYpO1xuICAgICAgcmV0dXJuIHN0ZXAoMCwgW2VudHJ5LmssIGVudHJ5LnZdKTtcbiAgICB9LCBJU19NQVAgPyAnZW50cmllcycgOiAndmFsdWVzJyAsICFJU19NQVAsIHRydWUpO1xuXG4gICAgLy8gYWRkIFtAQHNwZWNpZXNdLCAyMy4xLjIuMiwgMjMuMi4yLjJcbiAgICBzZXRTcGVjaWVzKE5BTUUpO1xuICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvbGxlY3Rpb24tc3Ryb25nLmpzXG4vLyBtb2R1bGUgaWQgPSAxNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGFyZ2V0LCBzcmMsIHNhZmUpe1xuICBmb3IodmFyIGtleSBpbiBzcmMpe1xuICAgIGlmKHNhZmUgJiYgdGFyZ2V0W2tleV0pdGFyZ2V0W2tleV0gPSBzcmNba2V5XTtcbiAgICBlbHNlIGhpZGUodGFyZ2V0LCBrZXksIHNyY1trZXldKTtcbiAgfSByZXR1cm4gdGFyZ2V0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS1hbGwuanNcbi8vIG1vZHVsZSBpZCA9IDE1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIENvbnN0cnVjdG9yLCBuYW1lLCBmb3JiaWRkZW5GaWVsZCl7XG4gIGlmKCEoaXQgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikgfHwgKGZvcmJpZGRlbkZpZWxkICE9PSB1bmRlZmluZWQgJiYgZm9yYmlkZGVuRmllbGQgaW4gaXQpKXtcbiAgICB0aHJvdyBUeXBlRXJyb3IobmFtZSArICc6IGluY29ycmVjdCBpbnZvY2F0aW9uIScpO1xuICB9IHJldHVybiBpdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4taW5zdGFuY2UuanNcbi8vIG1vZHVsZSBpZCA9IDE1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBjdHggICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgY2FsbCAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKVxuICAsIGlzQXJyYXlJdGVyID0gcmVxdWlyZSgnLi9faXMtYXJyYXktaXRlcicpXG4gICwgYW5PYmplY3QgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIHRvTGVuZ3RoICAgID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCBnZXRJdGVyRm4gICA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJylcbiAgLCBCUkVBSyAgICAgICA9IHt9XG4gICwgUkVUVVJOICAgICAgPSB7fTtcbnZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdGVyYWJsZSwgZW50cmllcywgZm4sIHRoYXQsIElURVJBVE9SKXtcbiAgdmFyIGl0ZXJGbiA9IElURVJBVE9SID8gZnVuY3Rpb24oKXsgcmV0dXJuIGl0ZXJhYmxlOyB9IDogZ2V0SXRlckZuKGl0ZXJhYmxlKVxuICAgICwgZiAgICAgID0gY3R4KGZuLCB0aGF0LCBlbnRyaWVzID8gMiA6IDEpXG4gICAgLCBpbmRleCAgPSAwXG4gICAgLCBsZW5ndGgsIHN0ZXAsIGl0ZXJhdG9yLCByZXN1bHQ7XG4gIGlmKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXRlcmFibGUgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgLy8gZmFzdCBjYXNlIGZvciBhcnJheXMgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yXG4gIGlmKGlzQXJyYXlJdGVyKGl0ZXJGbikpZm9yKGxlbmd0aCA9IHRvTGVuZ3RoKGl0ZXJhYmxlLmxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKXtcbiAgICByZXN1bHQgPSBlbnRyaWVzID8gZihhbk9iamVjdChzdGVwID0gaXRlcmFibGVbaW5kZXhdKVswXSwgc3RlcFsxXSkgOiBmKGl0ZXJhYmxlW2luZGV4XSk7XG4gICAgaWYocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTilyZXR1cm4gcmVzdWx0O1xuICB9IGVsc2UgZm9yKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoaXRlcmFibGUpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7ICl7XG4gICAgcmVzdWx0ID0gY2FsbChpdGVyYXRvciwgZiwgc3RlcC52YWx1ZSwgZW50cmllcyk7XG4gICAgaWYocmVzdWx0ID09PSBCUkVBSyB8fCByZXN1bHQgPT09IFJFVFVSTilyZXR1cm4gcmVzdWx0O1xuICB9XG59O1xuZXhwb3J0cy5CUkVBSyAgPSBCUkVBSztcbmV4cG9ydHMuUkVUVVJOID0gUkVUVVJOO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Zvci1vZi5qc1xuLy8gbW9kdWxlIGlkID0gMTU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIGRQICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJylcbiAgLCBTUEVDSUVTICAgICA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oS0VZKXtcbiAgdmFyIEMgPSB0eXBlb2YgY29yZVtLRVldID09ICdmdW5jdGlvbicgPyBjb3JlW0tFWV0gOiBnbG9iYWxbS0VZXTtcbiAgaWYoREVTQ1JJUFRPUlMgJiYgQyAmJiAhQ1tTUEVDSUVTXSlkUC5mKEMsIFNQRUNJRVMsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfVxuICB9KTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjQuMUBjb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXNwZWNpZXMuanNcbi8vIG1vZHVsZSBpZCA9IDE1NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIG1ldGEgICAgICAgICAgID0gcmVxdWlyZSgnLi9fbWV0YScpXG4gICwgZmFpbHMgICAgICAgICAgPSByZXF1aXJlKCcuL19mYWlscycpXG4gICwgaGlkZSAgICAgICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCByZWRlZmluZUFsbCAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lLWFsbCcpXG4gICwgZm9yT2YgICAgICAgICAgPSByZXF1aXJlKCcuL19mb3Itb2YnKVxuICAsIGFuSW5zdGFuY2UgICAgID0gcmVxdWlyZSgnLi9fYW4taW5zdGFuY2UnKVxuICAsIGlzT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCBkUCAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZcbiAgLCBlYWNoICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2FycmF5LW1ldGhvZHMnKSgwKVxuICAsIERFU0NSSVBUT1JTICAgID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihOQU1FLCB3cmFwcGVyLCBtZXRob2RzLCBjb21tb24sIElTX01BUCwgSVNfV0VBSyl7XG4gIHZhciBCYXNlICA9IGdsb2JhbFtOQU1FXVxuICAgICwgQyAgICAgPSBCYXNlXG4gICAgLCBBRERFUiA9IElTX01BUCA/ICdzZXQnIDogJ2FkZCdcbiAgICAsIHByb3RvID0gQyAmJiBDLnByb3RvdHlwZVxuICAgICwgTyAgICAgPSB7fTtcbiAgaWYoIURFU0NSSVBUT1JTIHx8IHR5cGVvZiBDICE9ICdmdW5jdGlvbicgfHwgIShJU19XRUFLIHx8IHByb3RvLmZvckVhY2ggJiYgIWZhaWxzKGZ1bmN0aW9uKCl7XG4gICAgbmV3IEMoKS5lbnRyaWVzKCkubmV4dCgpO1xuICB9KSkpe1xuICAgIC8vIGNyZWF0ZSBjb2xsZWN0aW9uIGNvbnN0cnVjdG9yXG4gICAgQyA9IGNvbW1vbi5nZXRDb25zdHJ1Y3Rvcih3cmFwcGVyLCBOQU1FLCBJU19NQVAsIEFEREVSKTtcbiAgICByZWRlZmluZUFsbChDLnByb3RvdHlwZSwgbWV0aG9kcyk7XG4gICAgbWV0YS5ORUVEID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBDID0gd3JhcHBlcihmdW5jdGlvbih0YXJnZXQsIGl0ZXJhYmxlKXtcbiAgICAgIGFuSW5zdGFuY2UodGFyZ2V0LCBDLCBOQU1FLCAnX2MnKTtcbiAgICAgIHRhcmdldC5fYyA9IG5ldyBCYXNlO1xuICAgICAgaWYoaXRlcmFibGUgIT0gdW5kZWZpbmVkKWZvck9mKGl0ZXJhYmxlLCBJU19NQVAsIHRhcmdldFtBRERFUl0sIHRhcmdldCk7XG4gICAgfSk7XG4gICAgZWFjaCgnYWRkLGNsZWFyLGRlbGV0ZSxmb3JFYWNoLGdldCxoYXMsc2V0LGtleXMsdmFsdWVzLGVudHJpZXMsdG9KU09OJy5zcGxpdCgnLCcpLGZ1bmN0aW9uKEtFWSl7XG4gICAgICB2YXIgSVNfQURERVIgPSBLRVkgPT0gJ2FkZCcgfHwgS0VZID09ICdzZXQnO1xuICAgICAgaWYoS0VZIGluIHByb3RvICYmICEoSVNfV0VBSyAmJiBLRVkgPT0gJ2NsZWFyJykpaGlkZShDLnByb3RvdHlwZSwgS0VZLCBmdW5jdGlvbihhLCBiKXtcbiAgICAgICAgYW5JbnN0YW5jZSh0aGlzLCBDLCBLRVkpO1xuICAgICAgICBpZighSVNfQURERVIgJiYgSVNfV0VBSyAmJiAhaXNPYmplY3QoYSkpcmV0dXJuIEtFWSA9PSAnZ2V0JyA/IHVuZGVmaW5lZCA6IGZhbHNlO1xuICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5fY1tLRVldKGEgPT09IDAgPyAwIDogYSwgYik7XG4gICAgICAgIHJldHVybiBJU19BRERFUiA/IHRoaXMgOiByZXN1bHQ7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZignc2l6ZScgaW4gcHJvdG8pZFAoQy5wcm90b3R5cGUsICdzaXplJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gdGhpcy5fYy5zaXplO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc2V0VG9TdHJpbmdUYWcoQywgTkFNRSk7XG5cbiAgT1tOQU1FXSA9IEM7XG4gICRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GLCBPKTtcblxuICBpZighSVNfV0VBSyljb21tb24uc2V0U3Ryb25nKEMsIE5BTUUsIElTX01BUCk7XG5cbiAgcmV0dXJuIEM7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvbGxlY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IDE1NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIDAgLT4gQXJyYXkjZm9yRWFjaFxuLy8gMSAtPiBBcnJheSNtYXBcbi8vIDIgLT4gQXJyYXkjZmlsdGVyXG4vLyAzIC0+IEFycmF5I3NvbWVcbi8vIDQgLT4gQXJyYXkjZXZlcnlcbi8vIDUgLT4gQXJyYXkjZmluZFxuLy8gNiAtPiBBcnJheSNmaW5kSW5kZXhcbnZhciBjdHggICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgSU9iamVjdCAgPSByZXF1aXJlKCcuL19pb2JqZWN0JylcbiAgLCB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIGFzYyAgICAgID0gcmVxdWlyZSgnLi9fYXJyYXktc3BlY2llcy1jcmVhdGUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oVFlQRSwgJGNyZWF0ZSl7XG4gIHZhciBJU19NQVAgICAgICAgID0gVFlQRSA9PSAxXG4gICAgLCBJU19GSUxURVIgICAgID0gVFlQRSA9PSAyXG4gICAgLCBJU19TT01FICAgICAgID0gVFlQRSA9PSAzXG4gICAgLCBJU19FVkVSWSAgICAgID0gVFlQRSA9PSA0XG4gICAgLCBJU19GSU5EX0lOREVYID0gVFlQRSA9PSA2XG4gICAgLCBOT19IT0xFUyAgICAgID0gVFlQRSA9PSA1IHx8IElTX0ZJTkRfSU5ERVhcbiAgICAsIGNyZWF0ZSAgICAgICAgPSAkY3JlYXRlIHx8IGFzYztcbiAgcmV0dXJuIGZ1bmN0aW9uKCR0aGlzLCBjYWxsYmFja2ZuLCB0aGF0KXtcbiAgICB2YXIgTyAgICAgID0gdG9PYmplY3QoJHRoaXMpXG4gICAgICAsIHNlbGYgICA9IElPYmplY3QoTylcbiAgICAgICwgZiAgICAgID0gY3R4KGNhbGxiYWNrZm4sIHRoYXQsIDMpXG4gICAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKHNlbGYubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSAwXG4gICAgICAsIHJlc3VsdCA9IElTX01BUCA/IGNyZWF0ZSgkdGhpcywgbGVuZ3RoKSA6IElTX0ZJTFRFUiA/IGNyZWF0ZSgkdGhpcywgMCkgOiB1bmRlZmluZWRcbiAgICAgICwgdmFsLCByZXM7XG4gICAgZm9yKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKylpZihOT19IT0xFUyB8fCBpbmRleCBpbiBzZWxmKXtcbiAgICAgIHZhbCA9IHNlbGZbaW5kZXhdO1xuICAgICAgcmVzID0gZih2YWwsIGluZGV4LCBPKTtcbiAgICAgIGlmKFRZUEUpe1xuICAgICAgICBpZihJU19NQVApcmVzdWx0W2luZGV4XSA9IHJlczsgICAgICAgICAgICAvLyBtYXBcbiAgICAgICAgZWxzZSBpZihyZXMpc3dpdGNoKFRZUEUpe1xuICAgICAgICAgIGNhc2UgMzogcmV0dXJuIHRydWU7ICAgICAgICAgICAgICAgICAgICAvLyBzb21lXG4gICAgICAgICAgY2FzZSA1OiByZXR1cm4gdmFsOyAgICAgICAgICAgICAgICAgICAgIC8vIGZpbmRcbiAgICAgICAgICBjYXNlIDY6IHJldHVybiBpbmRleDsgICAgICAgICAgICAgICAgICAgLy8gZmluZEluZGV4XG4gICAgICAgICAgY2FzZSAyOiByZXN1bHQucHVzaCh2YWwpOyAgICAgICAgICAgICAgIC8vIGZpbHRlclxuICAgICAgICB9IGVsc2UgaWYoSVNfRVZFUlkpcmV0dXJuIGZhbHNlOyAgICAgICAgICAvLyBldmVyeVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gSVNfRklORF9JTkRFWCA/IC0xIDogSVNfU09NRSB8fCBJU19FVkVSWSA/IElTX0VWRVJZIDogcmVzdWx0O1xuICB9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1tZXRob2RzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyA5LjQuMi4zIEFycmF5U3BlY2llc0NyZWF0ZShvcmlnaW5hbEFycmF5LCBsZW5ndGgpXG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi9fYXJyYXktc3BlY2llcy1jb25zdHJ1Y3RvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9yaWdpbmFsLCBsZW5ndGgpe1xuICByZXR1cm4gbmV3IChzcGVjaWVzQ29uc3RydWN0b3Iob3JpZ2luYWwpKShsZW5ndGgpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1zcGVjaWVzLWNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBpc0FycmF5ICA9IHJlcXVpcmUoJy4vX2lzLWFycmF5JylcbiAgLCBTUEVDSUVTICA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob3JpZ2luYWwpe1xuICB2YXIgQztcbiAgaWYoaXNBcnJheShvcmlnaW5hbCkpe1xuICAgIEMgPSBvcmlnaW5hbC5jb25zdHJ1Y3RvcjtcbiAgICAvLyBjcm9zcy1yZWFsbSBmYWxsYmFja1xuICAgIGlmKHR5cGVvZiBDID09ICdmdW5jdGlvbicgJiYgKEMgPT09IEFycmF5IHx8IGlzQXJyYXkoQy5wcm90b3R5cGUpKSlDID0gdW5kZWZpbmVkO1xuICAgIGlmKGlzT2JqZWN0KEMpKXtcbiAgICAgIEMgPSBDW1NQRUNJRVNdO1xuICAgICAgaWYoQyA9PT0gbnVsbClDID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfSByZXR1cm4gQyA9PT0gdW5kZWZpbmVkID8gQXJyYXkgOiBDO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1zcGVjaWVzLWNvbnN0cnVjdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxNTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vRGF2aWRCcnVhbnQvTWFwLVNldC5wcm90b3R5cGUudG9KU09OXG52YXIgJGV4cG9ydCAgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LlIsICdNYXAnLCB7dG9KU09OOiByZXF1aXJlKCcuL19jb2xsZWN0aW9uLXRvLWpzb24nKSgnTWFwJyl9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5tYXAudG8tanNvbi5qc1xuLy8gbW9kdWxlIGlkID0gMTYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL0RhdmlkQnJ1YW50L01hcC1TZXQucHJvdG90eXBlLnRvSlNPTlxudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuL19jbGFzc29mJylcbiAgLCBmcm9tICAgID0gcmVxdWlyZSgnLi9fYXJyYXktZnJvbS1pdGVyYWJsZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihOQU1FKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIHRvSlNPTigpe1xuICAgIGlmKGNsYXNzb2YodGhpcykgIT0gTkFNRSl0aHJvdyBUeXBlRXJyb3IoTkFNRSArIFwiI3RvSlNPTiBpc24ndCBnZW5lcmljXCIpO1xuICAgIHJldHVybiBmcm9tKHRoaXMpO1xuICB9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuNC4xQGNvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2xsZWN0aW9uLXRvLWpzb24uanNcbi8vIG1vZHVsZSBpZCA9IDE2MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBmb3JPZiA9IHJlcXVpcmUoJy4vX2Zvci1vZicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXIsIElURVJBVE9SKXtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3JPZihpdGVyLCBmYWxzZSwgcmVzdWx0LnB1c2gsIHJlc3VsdCwgSVRFUkFUT1IpO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi40LjFAY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWZyb20taXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDE2MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICBsb2FkaW5nOiB7XG4gICAgICAgIHRleHRzOiBbXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgWyfmrKLov47mnaXliLBUR1DmuLjmiI/kuJbnlYwnXSxcbiAgICAgICAgICAgICAgICBbJ+asoui/juadpeWIsFRHUOa4uOaIj+S4lueVjCddLFxuICAgICAgICAgICAgICAgIFsn5qyi6L+O5p2l5YiwVEdQ5ri45oiP5LiW55WMJ10sXG4gICAgICAgICAgICAgICAgWyfmrKLov47mnaXliLBUR1DmuLjmiI/kuJbnlYwnXVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbJ+asoui/juadpeWIsFRHUOa4uOaIj+S4lueVjCddLFxuICAgICAgICAgICAgICAgIFsn5qyi6L+O5p2l5YiwVEdQ5ri45oiP5LiW55WMJ10sXG4gICAgICAgICAgICAgICAgWyfmrKLov47mnaXliLBUR1DmuLjmiI/kuJbnlYwnXVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICBbJ+asoui/juadpeWIsFRHUOa4uOaIj+S4lueVjCddLFxuICAgICAgICAgICAgICAgIFsn5qyi6L+O5p2l5YiwVEdQ5ri45oiP5LiW55WMJ10sXG4gICAgICAgICAgICAgICAgWyfmrKLov47mnaXliLBUR1DmuLjmiI/kuJbnlYwnXSxcbiAgICAgICAgICAgICAgICBbJ+asoui/juadpeWIsFRHUOa4uOaIj+S4lueVjCddLFxuICAgICAgICAgICAgICAgIFsn5qyi6L+O5p2l5YiwVEdQ5ri45oiP5LiW55WMJ11cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgWyfmrKLov47mnaXliLBUR1DmuLjmiI/kuJbnlYwnXSxcbiAgICAgICAgICAgICAgICBbJ+asoui/juadpeWIsFRHUOa4uOaIj+S4lueVjCddLFxuICAgICAgICAgICAgICAgIFsn5qyi6L+O5p2l5YiwVEdQ5ri45oiP5LiW55WMJ10sXG4gICAgICAgICAgICAgICAgWyfmrKLov47mnaXliLBUR1DmuLjmiI/kuJbnlYwnXVxuICAgICAgICAgICAgXSAgIFxuICAgICAgICBdXG4gICAgfSxcblxuICAgIGdsOiB7IC8vIOW8gOWcuuW8leWvvFxuICAgICAgICB0eXBlOiAncG9wdXAnLFxuICAgICAgICB0aXRsZTogJ+asoui/juadpeWIsFRHUOa4uOaIj+S4lueVjCcsXG4gICAgICAgIHRleHQ6ICfmlaPluIPlnKjlroflrpnkuK3nmoTnpZ7np5jlipvph4/vvIzmib7liLDku5bku6zvvIznpZ7np5jigJzpuKHohb/igJ3lnKjnrYnkvaAnLFxuICAgICAgICBzaGFyZWJsZTogZmFsc2UsXG4gICAgICAgIGJnVHlwZTogMVxuICAgIH0sXG5cbiAgICBmb3VuZDU6IHsgLy8g5om+5YiwNeS4qlxuICAgICAgICB0eXBlOiAndGlwJyxcbiAgICAgICAgdGlwOiAn6LWe77yB5bey5Y+R546wNeS4qua4uOaIj+aYn+eQg+OAgjxici8+56We56eY4oCd6bih6IW/4oCd5bCx5Zyo5pif56m65rex5aSE77yM562J5L2g5ZOf77yBJyxcbiAgICAgICAgYmdUeXBlOiAxXG4gICAgfSxcblxuICAgIGZvdW5kMTU6IHsgLy8g5om+5YiwMTXkuKpcbiAgICAgICAgdHlwZTogJ3RpcCcsXG4gICAgICAgIHRpcDogJ+WViu+8gei/mOW3rjXkuKrvvIE8YnIvPuemu+KAnOm4oeiFv+KAnei/mOW3rjXkuKrvvIEnLFxuICAgICAgICBiZ1R5cGU6IDJcbiAgICB9LFxuXG4gICAgZm91bmQyMDogeyAvLyDmib7liLAyMOS4qlxuICAgICAgICB0eXBlOiAncG9wdXAnLFxuICAgICAgICB0aXRsZTogJ+aJvuWIsOWFqOmDqOa4uOaIj+aYn+eQg++8gScsXG4gICAgICAgIHRleHQ6ICfmiJHljrvvvIHkvaDov5jnnJ/mib7lhajkuobvvIE8YnIvPue7mei3qu+8jOivt+aUtuS4i+aIkeeahOm4oeiFv++8gScsXG4gICAgICAgIGJnVHlwZTogMyxcbiAgICAgICAgc2hhcmVibGU6IHRydWVcbiAgICB9LFxuXG4gICAgYmxhY2tzaGVlcHdhbGw6IHsgLy8g5Zyw5Zu+5YWo5byAXG4gICAgICAgIHR5cGU6ICdwb3B1cCcsXG4gICAgICAgIHRpdGxlOiAn5o6i57Si5LqG5pW05Liq5a6H5a6Z77yBJyxcbiAgICAgICAgdGV4dDogJ+WLpOWli+eahOWwkeW5tO+8jOWuh+WumeaYr+S4jeaYr+WFhea7oeS6huWlpeWmme+8jOWOu1RHUOeahOa4uOaIj+S4lueVjO+8jOmCo+mHjOS5n+aYr+S4gOagt+OAgicsXG4gICAgICAgIGJnVHlwZTogMixcbiAgICAgICAgc2hhcmVibGU6IHRydWVcbiAgICB9LFxuXG4gICAgZ2c6IHsgLy/lnLDlm77lhajlvIAgKyDmib7liLAyMOS4qlxuICAgICAgICB0eXBlOiAncG9wdXAnLMKgXG4gICAgICAgIHRpdGxlOiAn5om+5Yiw5YWo6YOo5ri45oiP5pif55CD77yBJyxcbiAgICAgICAgdGV4dDogJ+iHs+atpOS9oOW3sueci+WujO+8jOWlpeWmmeeahOWuh+WumeWSjOe6t+e5geeahFRHUOS4lueVjO+8jOS9oOWPr+S7peWOu+WIhuS6q+S6huOAgicsXG4gICAgICAgIGJnVHlwZTogMyxcbiAgICAgICAgc2hhcmVibGU6IHRydWVcbiAgICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3RleHRDb25maWcuanMiLCJpbXBvcnQgJy4vcHJlbG9hZC5jc3MnO1xuaW1wb3J0IHtcbiAgICBwcmVsb2FkIGFzIHByZWxvYWRBc3NldHMsXG4gICAgZ2FtZSBhcyBnYW1lQXNzZXRzXG59IGZyb20gJy4vYXNzZXRzJztcbmltcG9ydCB7XG4gICAgd2luLFxuICAgIGRvYyxcbiAgICBhcHBlbmRTdHlsZSxcbiAgICBkb21yZWFkeSxcbiAgICBQcm9taXNlLFxuICAgIGxvYWRJbWcsXG4gICAgZGVsYXksXG4gICAgZGVmZXIsXG4gICAgcXVlcnksXG4gICAgcXVlcnlBbGwsXG4gICAgY3JlYXRlanMsXG4gICAgcmFmLFxuICAgIGNhZlxufSBmcm9tICcuL3V0aWwnO1xuaW1wb3J0IHRleHRDb25maWcgZnJvbSAnLi90ZXh0Q29uZmlnJztcbmltcG9ydCBUaWNrZXIgZnJvbSAnLi90aWNrZXInO1xuXG5jb25zdCBpdGVtcyA9IHt9O1xud2luZG93LmFzc2V0c0l0ZW1zID0gaXRlbXM7XG5cbmNvbnN0IHByZWxvYWRXcmFwRWwgPSBxdWVyeShkb2MuYm9keSwgJyNwcmVsb2FkJyk7XG5jb25zdCBnYW1lV3JhcEVsID0gcXVlcnkoZG9jLmJvZHksICcjZ2FtZScpO1xuY29uc3QgYmcxRWwgPSBxdWVyeShwcmVsb2FkV3JhcEVsLCAnLmJnMScpO1xuY29uc3QgYmcyRWwgPSBxdWVyeShwcmVsb2FkV3JhcEVsLCAnLmJnMicpO1xuY29uc3QgdGV4dHNFbCA9IHF1ZXJ5KHByZWxvYWRXcmFwRWwsICcudGV4dHMnKTtcblxuZnVuY3Rpb24gc2V0QmFja2dyb3VuSW1hZ2Uodmlld3BvcnQsIGlkLCBzcmMpIHtcbiAgICBsZXQgZWxzID0gdmlld3BvcnQucXVlcnlTZWxlY3RvckFsbChgLiR7aWR9W3JvbD1cImltYWdlXCJdYCk7XG4gICAgaWYgKCFlbHMubGVuZ3RoXG4gICAgICAgICAgICYmIHZpZXdwb3J0LmNsYXNzTmFtZS5pbmRleE9mKGlkKSA+IC0xXG4gICAgICAgICAgICYmIHZpZXdwb3J0LmdldEF0dHJpYnV0ZSgncm9sJykgPT09ICdpbWFnZScpIHtcbiAgICAgICAgZWxzID0gW3ZpZXdwb3J0XTtcbiAgICB9XG4gICAgWy4uLmVsc10uZm9yRWFjaChlbCA9PiB7XG4gICAgICAgIGlmIChlbCkge1xuICAgICAgICAgICAgZWwuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke3NyY30pYDtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRQcm9ncmVzcyhzVmFsLCBlVmFsLCBsb2FkZWQsIHRvdGFsKSB7XG4gICAgY29uc3QgcGVyY2VudCA9IChsb2FkZWQgLyB0b3RhbCkudG9GaXhlZCgyKTtcbiAgICBjb25zdCB2YWwgPSBNYXRoLnJvdW5kKHNWYWwgKyAoZVZhbCAtIHNWYWwpICogcGVyY2VudCk7XG4gICAgcmV0dXJuIFtwZXJjZW50LCB2YWxdO1xufVxuXG5mdW5jdGlvbiBzZXRCZ0NsZWFyKHZhbCkge1xuICAgIGJnMkVsLnN0eWxlLm9wYWNpdHkgPSB2YWwgLyAxMDA7IFxufVxuXG5mdW5jdGlvbiBmaWxlbG9hZChlLCB2aWV3cG9ydCkge1xuICAgIGNvbnN0IHtpdGVtfSA9IGU7XG4gICAgaXRlbXNbaXRlbS5pZF0gPSBpdGVtO1xuXG4gICAgaWYgKGl0ZW0udHlwZSA9PT0gY3JlYXRlanMuQWJzdHJhY3RMb2FkZXIuSU1BR0UpIHtcbiAgICAgICAgc2V0QmFja2dyb3VuSW1hZ2Uodmlld3BvcnQsIGl0ZW0uaWQsIGl0ZW0uc3JjKTtcbiAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gY3JlYXRlanMuQWJzdHJhY3RMb2FkZXIuVEVYVCkge1xuICAgICAgICBhcHBlbmRTdHlsZShgXG4gICAgICAgICAgICBAZm9udC1mYWNlIHtcbiAgICAgICAgICAgICAgICBmb250LWZhbWlseTogJ3ZlbnRvdXNlJztcbiAgICAgICAgICAgICAgICBzcmM6IHVybCgke2l0ZW0uc3JjfSkgZm9ybWF0KCd0cnVldHlwZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAudmVudG91c2Uge1xuICAgICAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAndmVudG91c2UnO1xuICAgICAgICAgICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICAgICAgICAgICAgICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcbiAgICAgICAgICAgICAgICAtd2Via2l0LXRleHQtc3Ryb2tlLXdpZHRoOiAwLjJweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgYCk7XG4gICAgfVxufVxuXG5jb25zdCBsb2FkUHJlbG9hZE1hbmlmZXN0ID0gdmlld3BvcnQgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHF1ZXVlID0gbmV3IGNyZWF0ZWpzLkxvYWRRdWV1ZSh0cnVlKTtcblxuICAgIHF1ZXVlLm9uKCdmaWxlbG9hZCcsIGUgPT4gZmlsZWxvYWQoZSwgdmlld3BvcnQpKTtcblxuICAgIHF1ZXVlLm9uKCdwcm9ncmVzcycsIGUgPT4ge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBsb2FkZWQsXG4gICAgICAgICAgICB0b3RhbFxuICAgICAgICB9ID0gZTtcblxuICAgICAgICBjb25zdCBbcGVyY2VudCwgdmFsXSA9IGdldFByb2dyZXNzKDAsIDEwLCBsb2FkZWQsIHRvdGFsKTtcbiAgICAgICAgc2V0QmdDbGVhcih2YWwpO1xuICAgIH0pO1xuXG4gICAgcXVldWUub24oJ2Vycm9yJywgKCkgPT4gcmVqZWN0KHZpZXdwb3J0KSk7XG5cbiAgICBxdWV1ZS5vbignY29tcGxldGUnLCAoKSA9PiByZXNvbHZlKHZpZXdwb3J0KSk7XG5cbiAgICBxdWV1ZS5sb2FkTWFuaWZlc3QocHJlbG9hZEFzc2V0cyk7XG59KTtcblxuY29uc3QgbG9hZEdhbWVNYW5pZmVzdCA9IHZpZXdwb3J0ID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBxdWV1ZSA9IG5ldyBjcmVhdGVqcy5Mb2FkUXVldWUodHJ1ZSk7XG5cbiAgICBxdWV1ZS5vbignZmlsZWxvYWQnLCAgZSA9PiBmaWxlbG9hZChlLCB2aWV3cG9ydCkpO1xuXG4gICAgcXVldWUub24oJ3Byb2dyZXNzJywgZSA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGxvYWRlZCxcbiAgICAgICAgICAgIHRvdGFsXG4gICAgICAgIH0gPSBlO1xuXG4gICAgICAgIGNvbnN0IFtwZXJjZW50LCB2YWxdID0gZ2V0UHJvZ3Jlc3MoMTAsIDEwMCwgbG9hZGVkLCB0b3RhbCk7XG4gICAgICAgIHNldEJnQ2xlYXIodmFsKTtcbiAgICB9KTtcblxuICAgIHF1ZXVlLm9uKCdlcnJvcicsICgpID0+IHJlamVjdCh2aWV3cG9ydCkpO1xuXG4gICAgcXVldWUub24oJ2NvbXBsZXRlJywgKCkgPT4gcmVzb2x2ZSh2aWV3cG9ydCkpO1xuXG4gICAgZ2FtZUFzc2V0cy5mb3JFYWNoKGFzc2V0cyA9PiBcbiAgICAgICAgcXVldWUubG9hZE1hbmlmZXN0KGFzc2V0cylcbiAgICApO1xufSk7XG5cbmNvbnN0IGxvYWRJbWdPYmplY3QgPSAoaXRlbXMpID0+IHtcbiAgICBjb25zdCBwcm9taXNlcyA9IE9iamVjdC5rZXlzKGl0ZW1zKVxuICAgICAgICAuZmlsdGVyKGtleSA9PiBpdGVtc1trZXldLnR5cGUgPT09IGNyZWF0ZWpzLkFic3RyYWN0TG9hZGVyLklNQUdFKVxuICAgICAgICAubWFwKGtleSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gaXRlbXNba2V5XTtcbiAgICAgICAgICAgIGNvbnN0IFtpbWFnZSwgcHJvbWlzZV0gPSBsb2FkSW1nKGl0ZW0uc3JjKTtcbiAgICAgICAgICAgIGl0ZW0ub2JqID0gaW1hZ2U7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgICAgfSk7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5cbmNvbnN0IHRpY2tlciA9IG5ldyBUaWNrZXIoKTtcbmxldCB0aWNrSWQ7XG5cbndpbmRvdy5hc3NldHNQcmVsb2FkID0gZG9tcmVhZHkoKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGlja2VyLnJ1bigpO1xuXG4gICAgICAgIGNvbnN0IHRleHRzID0gdGV4dENvbmZpZy5sb2FkaW5nLnRleHRzO1xuICAgICAgICBjb25zdCB0ZXh0UExlbiA9IHRleHRzLmxlbmd0aDtcbiAgICAgICAgbGV0IHRleHRQSW5kZXggPSAwO1xuICAgICAgICBsZXQgdGV4dExJbmRleCA9IDA7XG4gICAgICAgIGxldCBzdW1EZWx0YSA9IDMwMTtcblxuICAgICAgICB0aWNrSWQgPSB0aWNrZXIuYWRkKCh7XG4gICAgICAgICAgICBkZWx0YSxcbiAgICAgICAgICAgIGVsYXBzZWRcbiAgICAgICAgfSkgPT4ge1xuICAgICAgICAgICAgaWYgKHN1bURlbHRhID4gMzAwKSB7XG4gICAgICAgICAgICAgICAgc3VtRGVsdGEgPSAwO1xuICAgICAgICAgICAgICAgIGxldCBwID0gdGV4dHNbdGV4dFBJbmRleF07XG4gICAgICAgICAgICAgICAgbGV0IHQgPSBwW3RleHRMSW5kZXhdO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRleHRMSW5kZXggPT09IHAubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRQSW5kZXggPSAodGV4dFBJbmRleCArIDEpICUgdGV4dFBMZW47XG4gICAgICAgICAgICAgICAgICAgIHRleHRMSW5kZXggPSAwO1xuICAgICAgICAgICAgICAgICAgICB0ZXh0c0VsLmlubmVySFRNTCA9ICcnO1xuXG4gICAgICAgICAgICAgICAgICAgIHAgPSB0ZXh0c1t0ZXh0UEluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgdCA9IHBbdGV4dExJbmRleF07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICAgICAgZWwudGV4dENvbnRlbnQgPSB0O1xuICAgICAgICAgICAgICAgIHRleHRzRWwuYXBwZW5kQ2hpbGQoZWwpO1xuXG4gICAgICAgICAgICAgICAgdGV4dExJbmRleCsrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdW1EZWx0YSArPSBkZWx0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSlcbiAgICAudGhlbigoKSA9PiB7IC8vIGxvYWQgcHJlbG9hZCBtYW5pZmVzdFxuICAgICAgICBwcmVsb2FkV3JhcEVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICByZXR1cm4gbG9hZFByZWxvYWRNYW5pZmVzdChwcmVsb2FkV3JhcEVsKTtcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHsgIC8vIGxvYWQgZ2FtZSBtYW5pZmVzdFxuICAgICAgICByZXR1cm4gbG9hZEdhbWVNYW5pZmVzdChnYW1lV3JhcEVsKTtcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGlja2VyLmNhbmNlbCgpO1xuICAgICAgICBwcmVsb2FkV3JhcEVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGdhbWVXcmFwRWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIHJldHVybiBsb2FkSW1nT2JqZWN0KGl0ZW1zKTtcbiAgICB9KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcHJlbG9hZC5qcyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvaW5kZXguanMhLi9wcmVsb2FkLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi8uLi9ub2RlX21vZHVsZXMvLjAuMTMuMUBzdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi9ub2RlX21vZHVsZXMvLjAuMjUuMEBjc3MtbG9hZGVyL2luZGV4LmpzIS4vcHJlbG9hZC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzLy4wLjI1LjBAY3NzLWxvYWRlci9pbmRleC5qcyEuL3ByZWxvYWQuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9wcmVsb2FkLmNzc1xuLy8gbW9kdWxlIGlkID0gMTY4XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uL25vZGVfbW9kdWxlcy8uMC4yNS4wQGNzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIjcHJlbG9hZCB7fVxcblxcbiNwcmVsb2FkIC5iZzEsXFxuICAgICNwcmVsb2FkIC5iZzIge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBsZWZ0IGJvdHRvbTtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBsZWZ0OiAwO1xcbiAgICB0b3A6IDA7XFxufVxcblxcbiNwcmVsb2FkIC5iZzIge1xcbiAgICBvcGFjaXR5OiAwO1xcbn1cXG5cXG4jcHJlbG9hZCAudGV4dHMge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHRvcDogMDtcXG4gICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICAgIC13ZWJraXQtYm94LXBhY2s6IGNlbnRlcjtcXG4gICAgLXdlYmtpdC1ib3gtYWxpZ246IGNlbnRlcjtcXG4gICAgLXdlYmtpdC1ib3gtb3JpZW50OiB2ZXJ0aWNhbDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgcGFkZGluZy10b3A6IDRyZW07XFxufVxcblxcbiNwcmVsb2FkIC50ZXh0cyBwIHtcXG4gICAgbGluZS1oZWlnaHQ6IDEuNWVtO1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBtYXJnaW46IDA7XFxuICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgY29sb3I6ICMwMGNiZTM7XFxuICAgIHRleHQtc2hhZG93OlxcbiAgICAgICAgMXB4IDAgMXB4IHJnYmEoMCwgMjAzLCAyMjcsIDAuMyksXFxuICAgICAgICAwIDFweCAxcHggcmdiYSgwLCAyMDMsIDIyNywgMC4zKSwgXFxuICAgICAgICAwIC0xcHggMXB4IHJnYmEoMCwgMjAzLCAyMjcsIDAuMyksXFxuICAgICAgICAtMXB4IDAgMXB4IHJnYmEoMCwgMjAzLCAyMjcsIDAuMyk7XFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMC4yNS4wQGNzcy1sb2FkZXIhLi9zcmMvcHJlbG9hZC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDE2OVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJpbXBvcnQge29zfSBmcm9tICdhbWZlLWVudic7XG5pbXBvcnQgc2xpY2VDb25maWcgZnJvbSAnLi9zbGljZUNvbmZpZyc7XG5cbmNvbnN0IGFzc2V0c1ByZWZpeCA9IG9zLmlzSU9TID8gJzJ4JyA6ICcxeCc7XG5cbmV4cG9ydCBjb25zdCBwcmVsb2FkID0ge1xuICAgIHBhdGg6IGBhc3NldHMvJHthc3NldHNQcmVmaXh9L3ByZWxvYWQvYCxcbiAgICBtYW5pZmVzdDogW1xuICAgICAgICB7aWQ6ICdiZzEnLCBzcmM6ICdiZzEuanBnJ30sXG4gICAgICAgIHtpZDogJ2JnMicsIHNyYzogJ2JnMi5qcGcnfVxuICAgIF1cbn07XG5cbmNvbnN0IG9wZW5pbmdNYW5pZmVzdCA9IFt7XG4gICAgaWQ6ICdvcGVuaW5nQ2hpY2tlbicsIHNyYzogJ2NoaWNrZW4ucG5nJ1xufV07XG5jb25zdCBvcGVuaW5nRnJhbWVDb3VudCA9IDMwO1xuY29uc3Qgb3BlbmluZ1N0YXJDb3VudCA9IDM7XG5mb3IgKGxldCBpID0gMTsgaSA8PSBvcGVuaW5nRnJhbWVDb3VudDsgaSsrKSB7XG4gICAgb3BlbmluZ01hbmlmZXN0LnB1c2goe1xuICAgICAgICBpZDogYG9wZW5pbmcke2l9YCxcbiAgICAgICAgc3JjOiBgJHtpfS5wbmdgXG4gICAgfSk7XG59XG5cbmZvciAobGV0IGkgPSAxOyBpIDw9IG9wZW5pbmdTdGFyQ291bnQ7IGkrKykge1xuICAgIG9wZW5pbmdNYW5pZmVzdC5wdXNoKHtcbiAgICAgICAgaWQ6IGBvcGVuaW5nU3RhciR7aX1gLFxuICAgICAgICBzcmM6IGBzdGFyLSR7aX0ucG5nYFxuICAgIH0pO1xufVxuXG5jb25zdCBlbGVtZW50c01hbmlmZXN0ID0gW107XG5PYmplY3Qua2V5cyhzbGljZUNvbmZpZykuZm9yRWFjaChrZXkgPT4ge1xuICAgIGlmIChrZXkubWF0Y2goL15cXGQrJC8pKSB7XG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IHNsaWNlQ29uZmlnW2tleV07XG4gICAgICAgIGlmIChjb25maWcudHlwZSA+PSAxKSB7XG4gICAgICAgICAgICBlbGVtZW50c01hbmlmZXN0LnB1c2goe1xuICAgICAgICAgICAgICAgIGlkOiBgaSR7a2V5fS1lLXNgLFxuICAgICAgICAgICAgICAgIHNyYzogYGkke2tleX0tZS1zLnBuZ2BcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbmZpZy50eXBlID49IDIpIHtcbiAgICAgICAgICAgIGVsZW1lbnRzTWFuaWZlc3QucHVzaCh7XG4gICAgICAgICAgICAgICAgaWQ6IGBpJHtrZXl9LWUtd2AsXG4gICAgICAgICAgICAgICAgc3JjOiBgaSR7a2V5fS1lLXcucG5nYFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29uZmlnLnR5cGUgPj0gMykge1xuICAgICAgICAgICAgZWxlbWVudHNNYW5pZmVzdC5wdXNoKHtcbiAgICAgICAgICAgICAgICBpZDogYGkke2tleX0tZS1nYCxcbiAgICAgICAgICAgICAgICBzcmM6IGBpJHtrZXl9LWUtZy5wbmdgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5leHBvcnQgY29uc3QgZ2FtZSA9IFtcbiAgICB7XG4gICAgICAgIHBhdGg6IGBhc3NldHMvJHthc3NldHNQcmVmaXh9L2dhbWUvYCxcbiAgICAgICAgbWFuaWZlc3Q6IFtcbiAgICAgICAgICAgIHtpZDogJ3N0YXInLCBzcmM6ICdzdGFyLmpwZyd9LFxuICAgICAgICAgICAge2lkOiAnaGVsbG93b3JsZCcsIHNyYzogJ2hlbGxvd29ybGQucG5nJ30sXG4gICAgICAgICAgICB7aWQ6ICdjbG91ZCcsIHNyYzogJ2Nsb3VkLnBuZyd9LFxuICAgICAgICAgICAge2lkOiAncG9wUGFuZWwnLCBzcmM6ICdwb3BQYW5lbC5wbmcnfSxcbiAgICAgICAgICAgIHtpZDogJ3BvcFRpcDEnLCBzcmM6ICdwb3BUaXAtMS5wbmcnfSxcbiAgICAgICAgICAgIHtpZDogJ3BvcFRpcDInLCBzcmM6ICdwb3BUaXAtMi5wbmcnfSxcbiAgICAgICAgICAgIHtpZDogJ3BvcEljb24nLCBzcmM6ICdwb3BJY29uLnBuZyd9LFxuICAgICAgICAgICAge2lkOiAncG9wQ2xvc2UnLCBzcmM6ICdwb3BDbG9zZS5wbmcnfSxcbiAgICAgICAgICAgIHtpZDogJ3BvcEJ0bicsIHNyYzogJ3BvcEJ0bi5wbmcnfSxcbiAgICAgICAgICAgIHtpZDogJ3BvcEJnMScsIHNyYzogJ3BvcEJnLTEucG5nJ30sXG4gICAgICAgICAgICB7aWQ6ICdwb3BCZzInLCBzcmM6ICdwb3BCZy0yLnBuZyd9LFxuICAgICAgICAgICAge2lkOiAncG9wQmczJywgc3JjOiAncG9wQmctMy5wbmcnfSxcbiAgICAgICAgICAgIHtpZDogJ3RpcEJnMScsIHNyYzogJ3RpcEJnLTEucG5nJ30sXG4gICAgICAgICAgICB7aWQ6ICd0aXBCZzInLCBzcmM6ICd0aXBCZy0yLnBuZyd9LFxuICAgICAgICAgICAge2lkOiAnY29pbjEnLCBzcmM6ICdjb2luLTEucG5nJ30sXG4gICAgICAgICAgICB7aWQ6ICdjb2luMicsIHNyYzogJ2NvaW4tMi5wbmcnfSxcbiAgICAgICAgICAgIHtpZDogJ2NvaW4zJywgc3JjOiAnY29pbi0zLnBuZyd9LFxuICAgICAgICAgICAge2lkOiAnY29pbjQnLCBzcmM6ICdjb2luLTQucG5nJ30sXG4gICAgICAgICAgICB7aWQ6ICdjb2luNScsIHNyYzogJ2NvaW4tNS5wbmcnfSxcbiAgICAgICAgICAgIHtpZDogJ2NvaW42Jywgc3JjOiAnY29pbi02LnBuZyd9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogYGFzc2V0cy8ke2Fzc2V0c1ByZWZpeH0vZ2FtZS9vcGVuaW5nL2AsXG4gICAgICAgIG1hbmlmZXN0OiBvcGVuaW5nTWFuaWZlc3RcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogYGFzc2V0cy8ke2Fzc2V0c1ByZWZpeH0vZ2FtZS9lbGVtZW50cy9gLFxuICAgICAgICBtYW5pZmVzdDogZWxlbWVudHNNYW5pZmVzdFxuICAgIH0sXG4gICAge1xuICAgICAgICBwYXRoOiAnYXNzZXRzLycsXG4gICAgICAgIG1hbmlmZXN0OiBbXG4gICAgICAgICAgICAnZm9udC50dGYnXG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogJ2Rpc3QvJyxcbiAgICAgICAgbWFuaWZlc3Q6IFtcbiAgICAgICAgICAgICdnYW1lLmpzJ1xuICAgICAgICBdXG4gICAgfVxuXTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzZXRzLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLlZlcnNpb24gPSBleHBvcnRzLnBhcmFtcyA9IGV4cG9ydHMudGhpcmRhcHAgPSBleHBvcnRzLmFsaWFwcCA9IGV4cG9ydHMub3MgPSBleHBvcnRzLmJyb3dzZXIgPSB1bmRlZmluZWQ7XG5cbnZhciBfYWxpYXBwID0gcmVxdWlyZSgnLi9hbGlhcHAnKTtcblxudmFyIF9hbGlhcHAyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYWxpYXBwKTtcblxudmFyIF9icm93c2VyID0gcmVxdWlyZSgnLi9icm93c2VyJyk7XG5cbnZhciBfYnJvd3NlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9icm93c2VyKTtcblxudmFyIF9vcyA9IHJlcXVpcmUoJy4vb3MnKTtcblxudmFyIF9vczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9vcyk7XG5cbnZhciBfdGhpcmRhcHAgPSByZXF1aXJlKCcuL3RoaXJkYXBwJyk7XG5cbnZhciBfdGhpcmRhcHAyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdGhpcmRhcHApO1xuXG52YXIgX3BhcmFtcyA9IHJlcXVpcmUoJy4vcGFyYW1zJyk7XG5cbnZhciBfcGFyYW1zMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3BhcmFtcyk7XG5cbnZhciBfdmVyc2lvbiA9IHJlcXVpcmUoJy4vdmVyc2lvbicpO1xuXG52YXIgX3ZlcnNpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdmVyc2lvbik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuYnJvd3NlciA9IF9icm93c2VyMi5kZWZhdWx0O1xuZXhwb3J0cy5vcyA9IF9vczIuZGVmYXVsdDtcbmV4cG9ydHMuYWxpYXBwID0gX2FsaWFwcDIuZGVmYXVsdDtcbmV4cG9ydHMudGhpcmRhcHAgPSBfdGhpcmRhcHAyLmRlZmF1bHQ7XG5leHBvcnRzLnBhcmFtcyA9IF9wYXJhbXMyLmRlZmF1bHQ7XG5leHBvcnRzLlZlcnNpb24gPSBfdmVyc2lvbjIuZGVmYXVsdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vLjIuMC4wQGFtZmUtZW52L3NyYy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTcxXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3ZlcnNpb24gPSByZXF1aXJlKCcuL3ZlcnNpb24nKTtcblxudmFyIF92ZXJzaW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3ZlcnNpb24pO1xuXG52YXIgX29zID0gcmVxdWlyZSgnLi9vcycpO1xuXG52YXIgX29zMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX29zKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIHVhID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG52YXIgYWxpYXBwID0gZmFsc2U7XG5cbnZhciB3aW5kdmFuZTtcbnZhciBtYXRjaGVkO1xudmFyIGFwcG5hbWUgPSAnJztcbnZhciBwbGF0Zm9ybSA9ICcnO1xudmFyIHZlcnNpb24gPSAnJztcblxuaWYgKG1hdGNoZWQgPSB1YS5tYXRjaCgvV2luZFZhbmVbXFwvXFxzXShbXFxkXFwuXFxfXSspL2kpKSB7XG4gICAgd2luZHZhbmUgPSBtYXRjaGVkWzFdO1xufVxuXG5pZiAobWF0Y2hlZCA9IHVhLm1hdGNoKC9BbGlBcHBcXCgoW0EtWlxcLV0rKVxcLyhbXFxkXFwuXSspXFwpL2kpKSB7XG4gICAgYWxpYXBwID0gdHJ1ZTtcbiAgICBhcHBuYW1lID0gbWF0Y2hlZFsxXTtcbiAgICB2ZXJzaW9uID0gbWF0Y2hlZFsyXTtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmIChhcHBuYW1lLmluZGV4T2YoJy1QRCcpID4gMCkge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKF9vczIuZGVmYXVsdC5pc0lPUykge1xuICAgICAgICAgICAgcGxhdGZvcm0gPSAnaVBhZCc7XG4gICAgICAgIH0gZWxzZSBpZiAoX29zMi5kZWZhdWx0LmlzQW5kcm9pZCkge1xuICAgICAgICAgICAgcGxhdGZvcm0gPSAnQW5kcm9pZFBhZCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwbGF0Zm9ybSA9IF9vczIuZGVmYXVsdC5uYW1lO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcGxhdGZvcm0gPSBfb3MyLmRlZmF1bHQubmFtZTtcbiAgICB9XG59XG5cbi8vIOWFvOWuueaJi+a3mOeahOS4gOS4qmJ1Z++8jOWcqHdlYnZpZXfliJ3lp4vljJblvILluLjml7bvvIzlnKh1YeS4reWPquWMheWQq1RCSU9T5a2X5qC377yM5Lmf6K6k5Li65piv5omL5reYd2Vidmlld+OAglxuLyogaXN0YW5idWwgaWdub3JlIGlmICovXG5pZiAoIWFwcG5hbWUgJiYgdWEuaW5kZXhPZignVEJJT1MnKSA+IDApIHtcbiAgICBhcHBuYW1lID0gJ1RCJztcbn1cblxuLy8g5Yik5patcG9wbGF5ZXJcbi8vIHBvcGxheWVy55u45YWz5L+h5oGv77yM5ZyocG9wbGF5ZXLkvJrmnInor6XlrZfmrrXvvIzlvaLlpoIgd2luZG93Ll91YV9wb3BMYXllciA9ICdQb3BMYXllci8xLjMuNCdcbi8vIHBvcGxheWVy5L+h5oGv5LiN5ZyodWHkuK3mmK/lm6DkuLrlnKhJT1PkuIvvvIzkv67mlLlwb3BsYXllcuWxgueahHVh5Lya5a+86Ie05omA5pyJd2Vidmlld+eahHVh5pS55Y+Y77yM5omA5Lul5Y+q6IO95YaZ5Zyo5YWo5bGA5Y+Y6YeP5LitXG52YXIgcG9wbGF5ZXJJbmZvID0gd2luZG93Ll91YV9wb3BMYXllciB8fCAnJztcbnZhciBwb3BsYXllciA9IGZhbHNlO1xudmFyIHBvcGxheWVyVmVyc2lvbiA9ICcnO1xuaWYgKHBvcGxheWVySW5mbyAmJiAobWF0Y2hlZCA9IHBvcGxheWVySW5mby5tYXRjaCgvUG9wTGF5ZXJcXC8oW1xcZFxcLl0rKS9pKSkpIHtcbiAgICBwb3BsYXllciA9IHRydWU7XG4gICAgcG9wbGF5ZXJWZXJzaW9uID0gbWF0Y2hlZFsxXTtcbn1cblxuaWYgKGFsaWFwcCkge1xuICAgIGFsaWFwcCA9IHtcbiAgICAgICAgd2luZHZhbmU6IG5ldyBfdmVyc2lvbjIuZGVmYXVsdCh3aW5kdmFuZSB8fCAnMC4wLjAnKSxcbiAgICAgICAgYXBwbmFtZTogYXBwbmFtZSB8fCAndW5rb3duJyxcbiAgICAgICAgdmVyc2lvbjogbmV3IF92ZXJzaW9uMi5kZWZhdWx0KHZlcnNpb24gfHwgJzAuMC4wJyksXG4gICAgICAgIHBsYXRmb3JtOiBwbGF0Zm9ybSB8fCBfb3MyLmRlZmF1bHQubmFtZSxcbiAgICAgICAgcG9wbGF5ZXI6IHBvcGxheWVyIHx8IGZhbHNlLFxuICAgICAgICBwb3BsYXllclZlcnNpb246IG5ldyBfdmVyc2lvbjIuZGVmYXVsdChwb3BsYXllclZlcnNpb24gfHwgJzAuMC4wJylcbiAgICB9O1xufVxuXG5leHBvcnRzLmRlZmF1bHQgPSBhbGlhcHA7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjAuMEBhbWZlLWVudi9zcmMvYWxpYXBwLmpzXG4vLyBtb2R1bGUgaWQgPSAxNzJcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBWZXJzaW9uID0gZnVuY3Rpb24gKCkge1xuICAgIF9jcmVhdGVDbGFzcyhWZXJzaW9uLCBudWxsLCBbe1xuICAgICAgICBrZXk6ICdjb21wYXJlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBhcmUodjEsIHYyKSB7XG4gICAgICAgICAgICB2MSA9IHYxLnRvU3RyaW5nKCkuc3BsaXQoJy4nKTtcbiAgICAgICAgICAgIHYyID0gdjIudG9TdHJpbmcoKS5zcGxpdCgnLicpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHYxLmxlbmd0aCB8fCBpIDwgdjIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgbjEgPSBwYXJzZUludCh2MVtpXSwgMTApO1xuICAgICAgICAgICAgICAgIHZhciBuMiA9IHBhcnNlSW50KHYyW2ldLCAxMCk7XG5cbiAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4objEpKSB7XG4gICAgICAgICAgICAgICAgICAgIG4xID0gMDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4objIpKSB7XG4gICAgICAgICAgICAgICAgICAgIG4yID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG4xIDwgbjIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobjEgPiBuMikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIGZ1bmN0aW9uIFZlcnNpb24odikge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVmVyc2lvbik7XG5cbiAgICAgICAgaWYgKHYpIHtcbiAgICAgICAgICAgIHRoaXMudmFsID0gdi50b1N0cmluZygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52YWwgPSAnJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhWZXJzaW9uLCBbe1xuICAgICAgICBrZXk6ICdndCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBndCh2KSB7XG4gICAgICAgICAgICByZXR1cm4gVmVyc2lvbi5jb21wYXJlKHRoaXMsIHYpID4gMDtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ3RlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGd0ZSh2KSB7XG4gICAgICAgICAgICByZXR1cm4gVmVyc2lvbi5jb21wYXJlKHRoaXMsIHYpID49IDA7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2x0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGx0KHYpIHtcbiAgICAgICAgICAgIHJldHVybiBWZXJzaW9uLmNvbXBhcmUodGhpcywgdikgPCAwO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdsdGUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gbHRlKHYpIHtcbiAgICAgICAgICAgIHJldHVybiBWZXJzaW9uLmNvbXBhcmUodGhpcywgdikgPD0gMDtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZXEnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZXEodikge1xuICAgICAgICAgICAgcmV0dXJuIFZlcnNpb24uY29tcGFyZSh0aGlzLCB2KSA9PT0gMDtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAndG9TdHJpbmcnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWwudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBWZXJzaW9uO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBWZXJzaW9uO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi4wLjBAYW1mZS1lbnYvc3JjL3ZlcnNpb24uanNcbi8vIG1vZHVsZSBpZCA9IDE3M1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF92ZXJzaW9uID0gcmVxdWlyZSgnLi92ZXJzaW9uJyk7XG5cbnZhciBfdmVyc2lvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF92ZXJzaW9uKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIHVhID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG52YXIgb3M7XG52YXIgbWF0Y2hlZDtcblxuaWYgKG1hdGNoZWQgPSB1YS5tYXRjaCgvV2luZG93c1xcc1Bob25lXFxzKD86T1NcXHMpPyhbXFxkXFwuXSspLykpIHtcbiAgICBvcyA9IHtcbiAgICAgICAgbmFtZTogJ1dpbmRvd3MgUGhvbmUnLFxuICAgICAgICBpc1dpbmRvd3NQaG9uZTogdHJ1ZSxcbiAgICAgICAgdmVyc2lvbjogbmV3IF92ZXJzaW9uMi5kZWZhdWx0KG1hdGNoZWRbMV0pXG4gICAgfTtcbn0gZWxzZSBpZiAoISF1YS5tYXRjaCgvU2FmYXJpLykgJiYgKG1hdGNoZWQgPSB1YS5tYXRjaCgvQW5kcm9pZFtcXHNcXC9dKFtcXGRcXC5dKykvKSkpIHtcbiAgICBvcyA9IHtcbiAgICAgICAgdmVyc2lvbjogbmV3IF92ZXJzaW9uMi5kZWZhdWx0KG1hdGNoZWRbMV0pXG4gICAgfTtcblxuICAgIGlmICh1YS5tYXRjaCgvTW9iaWxlXFxzK1NhZmFyaS8pKSB7XG4gICAgICAgIG9zLm5hbWUgPSAnQW5kcm9pZCc7XG4gICAgICAgIG9zLmlzQW5kcm9pZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgb3MubmFtZSA9ICdBbmRyb2lkUGFkJztcbiAgICAgICAgb3MuaXNBbmRyb2lkUGFkID0gdHJ1ZTtcbiAgICB9XG59IGVsc2UgaWYgKG1hdGNoZWQgPSB1YS5tYXRjaCgvKGlQaG9uZXxpUGFkfGlQb2QpLykpIHtcbiAgICB2YXIgbmFtZSA9IG1hdGNoZWRbMV07XG5cbiAgICBpZiAobWF0Y2hlZCA9IHVhLm1hdGNoKC9PUyAoW1xcZF9cXC5dKykgbGlrZSBNYWMgT1MgWC8pKSB7XG4gICAgICAgIG9zID0ge1xuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIGlzSVBob25lOiBuYW1lID09PSAnaVBob25lJyB8fCBuYW1lID09PSAnaVBvZCcsXG4gICAgICAgICAgICBpc0lQYWQ6IG5hbWUgPT09ICdpUGFkJyxcbiAgICAgICAgICAgIGlzSU9TOiB0cnVlLFxuICAgICAgICAgICAgdmVyc2lvbjogbmV3IF92ZXJzaW9uMi5kZWZhdWx0KG1hdGNoZWRbMV0uc3BsaXQoJ18nKS5qb2luKCcuJykpXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5pZiAoIW9zKSB7XG4gICAgb3MgPSB7XG4gICAgICAgIG5hbWU6ICd1bmtub3duJyxcbiAgICAgICAgdmVyc2lvbjogbmV3IF92ZXJzaW9uMi5kZWZhdWx0KCcwLjAuMCcpXG4gICAgfTtcbn1cblxuZXhwb3J0cy5kZWZhdWx0ID0gb3M7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjAuMEBhbWZlLWVudi9zcmMvb3MuanNcbi8vIG1vZHVsZSBpZCA9IDE3NFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF92ZXJzaW9uID0gcmVxdWlyZSgnLi92ZXJzaW9uJyk7XG5cbnZhciBfdmVyc2lvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF92ZXJzaW9uKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIHVhID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG52YXIgYnJvd3NlcjtcbnZhciBtYXRjaGVkO1xuXG5pZiAobWF0Y2hlZCA9IHVhLm1hdGNoKC8oPzpVQ1dFQnxVQ0Jyb3dzZXJcXC8pKFtcXGRcXC5dKykvKSkge1xuICAgIGJyb3dzZXIgPSB7XG4gICAgICAgIG5hbWU6ICdVQycsXG4gICAgICAgIGlzVUM6IHRydWUsXG4gICAgICAgIHZlcnNpb246IG5ldyBfdmVyc2lvbjIuZGVmYXVsdChtYXRjaGVkWzFdKVxuICAgIH07XG59IGVsc2UgaWYgKG1hdGNoZWQgPSB1YS5tYXRjaCgvTVFRQnJvd3NlclxcLyhbXFxkXFwuXSspLykpIHtcbiAgICBicm93c2VyID0ge1xuICAgICAgICBuYW1lOiAnUVEnLFxuICAgICAgICBpc1FROiB0cnVlLFxuICAgICAgICB2ZXJzaW9uOiBuZXcgX3ZlcnNpb24yLmRlZmF1bHQobWF0Y2hlZFsxXSlcbiAgICB9O1xufSBlbHNlIGlmIChtYXRjaGVkID0gdWEubWF0Y2goLyg/OkZpcmVmb3h8RnhpT1MpXFwvKFtcXGRcXC5dKykvKSkge1xuICAgIGJyb3dzZXIgPSB7XG4gICAgICAgIG5hbWU6ICdGaXJlZm94JyxcbiAgICAgICAgaXNGaXJlZm94OiB0cnVlLFxuICAgICAgICB2ZXJzaW9uOiBuZXcgX3ZlcnNpb24yLmRlZmF1bHQobWF0Y2hlZFsxXSlcbiAgICB9O1xufSBlbHNlIGlmICgobWF0Y2hlZCA9IHVhLm1hdGNoKC9NU0lFXFxzKFtcXGRcXC5dKykvKSkgfHwgKG1hdGNoZWQgPSB1YS5tYXRjaCgvSUVNb2JpbGVcXC8oW1xcZFxcLl0rKS8pKSkge1xuXG4gICAgYnJvd3NlciA9IHtcbiAgICAgICAgdmVyc2lvbjogbmV3IF92ZXJzaW9uMi5kZWZhdWx0KG1hdGNoZWRbMV0pXG4gICAgfTtcblxuICAgIGlmICh1YS5tYXRjaCgvSUVNb2JpbGUvKSkge1xuICAgICAgICBicm93c2VyLm5hbWUgPSAnSUVNb2JpbGUnO1xuICAgICAgICBicm93c2VyLmlzSUVNb2JpbGUgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGJyb3dzZXIubmFtZSA9ICdJRSc7XG4gICAgICAgIGJyb3dzZXIuaXNJRSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHVhLm1hdGNoKC9BbmRyb2lkfGlQaG9uZS8pKSB7XG4gICAgICAgIGJyb3dzZXIuaXNJRUxpa2VXZWJraXQgPSB0cnVlO1xuICAgIH1cbn0gZWxzZSBpZiAobWF0Y2hlZCA9IHVhLm1hdGNoKC8oPzpDaHJvbWV8Q3JpT1MpXFwvKFtcXGRcXC5dKykvKSkge1xuICAgIGJyb3dzZXIgPSB7XG4gICAgICAgIG5hbWU6ICdDaHJvbWUnLFxuICAgICAgICBpc0Nocm9tZTogdHJ1ZSxcbiAgICAgICAgdmVyc2lvbjogbmV3IF92ZXJzaW9uMi5kZWZhdWx0KG1hdGNoZWRbMV0pXG4gICAgfTtcblxuICAgIGlmICh1YS5tYXRjaCgvVmVyc2lvblxcL1tcXGQrXFwuXStcXHMqQ2hyb21lLykpIHtcbiAgICAgICAgYnJvd3Nlci5uYW1lID0gJ0Nocm9tZSBXZWJ2aWV3JztcbiAgICAgICAgYnJvd3Nlci5pc1dlYnZpZXcgPSB0cnVlO1xuICAgIH1cbn0gZWxzZSBpZiAoISF1YS5tYXRjaCgvU2FmYXJpLykgJiYgKG1hdGNoZWQgPSB1YS5tYXRjaCgvQW5kcm9pZFtcXHNcXC9dKFtcXGRcXC5dKykvKSkpIHtcbiAgICBicm93c2VyID0ge1xuICAgICAgICBuYW1lOiAnQW5kcm9pZCcsXG4gICAgICAgIGlzQW5kcm9pZDogdHJ1ZSxcbiAgICAgICAgdmVyc2lvbjogbmV3IF92ZXJzaW9uMi5kZWZhdWx0KG1hdGNoZWRbMV0pXG4gICAgfTtcbn0gZWxzZSBpZiAodWEubWF0Y2goL2lQaG9uZXxpUGFkfGlQb2QvKSkge1xuICAgIGlmICh1YS5tYXRjaCgvU2FmYXJpLykgJiYgKG1hdGNoZWQgPSB1YS5tYXRjaCgvVmVyc2lvblxcLyhbXFxkXFwuXSspLykpKSB7XG4gICAgICAgIGJyb3dzZXIgPSB7XG4gICAgICAgICAgICBuYW1lOiAnU2FmYXJpJyxcbiAgICAgICAgICAgIGlzU2FmYXJpOiB0cnVlLFxuICAgICAgICAgICAgdmVyc2lvbjogbmV3IF92ZXJzaW9uMi5kZWZhdWx0KG1hdGNoZWRbMV0pXG4gICAgICAgIH07XG4gICAgfSBlbHNlIGlmIChtYXRjaGVkID0gdWEubWF0Y2goL09TIChbXFxkX1xcLl0rKSBsaWtlIE1hYyBPUyBYLykpIHtcbiAgICAgICAgYnJvd3NlciA9IHtcbiAgICAgICAgICAgIG5hbWU6ICdpT1MgV2VidmlldycsXG4gICAgICAgICAgICBpc1dlYnZpZXc6IHRydWUsXG4gICAgICAgICAgICB2ZXJzaW9uOiBuZXcgX3ZlcnNpb24yLmRlZmF1bHQobWF0Y2hlZFsxXS5yZXBsYWNlKC9cXF8vZywgJy4nKSlcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuaWYgKCFicm93c2VyKSB7XG4gICAgYnJvd3NlciA9IHtcbiAgICAgICAgbmFtZTogJ3Vua25vd24nLFxuICAgICAgICB2ZXJzaW9uOiBuZXcgX3ZlcnNpb24yLmRlZmF1bHQoJzAuMC4wJylcbiAgICB9O1xufVxuXG5leHBvcnRzLmRlZmF1bHQgPSBicm93c2VyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi8uMi4wLjBAYW1mZS1lbnYvc3JjL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDE3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbnZhciB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuXG52YXIgdGhpcmRhcHA7XG5cbmlmICh1YS5tYXRjaCgvV2VpYm8vaSkpIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqIEBtZW1iZXJvZiBsaWIuZW52XG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IGFwcG5hbWUgLSDmk43kvZzns7vnu5/lkI3np7DvvIzmr5TlpoJXZWliby9XZWl4aW4vdW5rbm93buetiVxuICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gaXNXZWlibyAtIOaYr+WQpuaYr+W+ruWNmlxuICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gaXNXZWl4aW4gLSDmmK/lkKbmmK/lvq7kv6FcbiAgICAgKi9cbiAgICB0aGlyZGFwcCA9IHtcbiAgICAgICAgYXBwbmFtZTogJ1dlaWJvJyxcbiAgICAgICAgaXNXZWlibzogdHJ1ZVxuICAgIH07XG59IGVsc2UgaWYgKHVhLm1hdGNoKC9NaWNyb01lc3Nlbmdlci9pKSkge1xuICAgIHRoaXJkYXBwID0ge1xuICAgICAgICBhcHBuYW1lOiAnV2VpeGluJyxcbiAgICAgICAgaXNXZWl4aW46IHRydWVcbiAgICB9O1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG59IGVsc2Uge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICB0aGlyZGFwcCA9IGZhbHNlO1xuICAgIH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gdGhpcmRhcHA7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjAuMEBhbWZlLWVudi9zcmMvdGhpcmRhcHAuanNcbi8vIG1vZHVsZSBpZCA9IDE3NlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbnZhciBwYXJhbXMgPSB7fTtcbnZhciBzZWFyY2ggPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJyk7XG5cbmlmIChzZWFyY2gpIHtcbiAgICB2YXIgc3BsaXRzID0gc2VhcmNoLnNwbGl0KCcmJyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzcGxpdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc3BsaXRzW2ldID0gc3BsaXRzW2ldLnNwbGl0KCc9Jyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBwYXJhbXNbc3BsaXRzW2ldWzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChzcGxpdHNbaV1bMV0pO1xuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgICAgIHBhcmFtc1tzcGxpdHNbaV1bMF1dID0gc3BsaXRzW2ldWzFdO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnRzLmRlZmF1bHQgPSBwYXJhbXM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+Ly4yLjAuMEBhbWZlLWVudi9zcmMvcGFyYW1zLmpzXG4vLyBtb2R1bGUgaWQgPSAxNzdcbi8vIG1vZHVsZSBjaHVua3MgPSAxIl0sInNvdXJjZVJvb3QiOiIifQ==