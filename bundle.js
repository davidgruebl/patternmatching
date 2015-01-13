(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'

var $ = require('jquery')
var tracking = require('tracking')
var face = require('face')
var eye = require('eye')
var mouth = require('mouth')

window.onload = function() {
  var video = document.getElementById('video')
  var canvas = document.getElementById('canvas')
  var context = canvas.getContext('2d')
  var objects = new tracking.ObjectTracker(['face', 'eye', 'mouth']);
  objects.setInitialScale(4)
  objects.setStepSize(2)
  objects.setEdgesDensity(0.1)
  tracking.track('#video', objects, {
    camera: true
  })
  objects.on('track', function(event) {
    if (event.data.length === 0) console.log('ligga?')
    event.data.forEach(function(rect) {
      console.log(rect)
      context.clearRect(0, 0, canvas.width, canvas.height)
      window.plot(rect.x, rect.y, rect.width, rect.height)
    })
  })
  window.plot = function(x, y, w, h) {
    context.strokeStyle = 'pink'
    context.strokeRect(x, y, w, h)
  }
}


},{"eye":3,"face":4,"jquery":2,"mouth":5,"tracking":6}],2:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v2.1.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-18T15:11Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.3",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

},{}],3:[function(require,module,exports){
(function (global){
;__browserify_shim_require__=require;(function browserifyShim(module, exports, require, define, browserify_shim__define__module__export__) {
/**
 * tracking.js - A modern approach for Computer Vision on the web.
 * @author Eduardo Lundgren <edu@rdo.io>
 * @version v1.0.0
 * @link http://trackingjs.com
 * @license BSD
 */
tracking.ViolaJones.classifiers.eye=new Float64Array([20,20,-1.4562760591506958,6,0,2,0,8,20,12,-1,0,14,20,6,2,.129639595746994,-.7730420827865601,.6835014820098877,0,2,9,1,4,15,-1,9,6,4,5,3,-.0463268086314201,.5735275149345398,-.4909768998622894,0,2,6,10,9,2,-1,9,10,3,2,3,-.0161730907857418,.6025434136390686,-.3161070942878723,0,2,7,0,10,9,-1,7,3,10,3,3,-.0458288416266441,.6417754888534546,-.1554504036903381,0,2,12,2,2,18,-1,12,8,2,6,3,-.0537596195936203,.5421931743621826,-.2048082947731018,0,2,8,6,8,6,-1,8,9,8,3,2,.0341711901128292,-.2338819056749344,.4841090142726898,-1.2550230026245117,12,0,2,2,0,17,18,-1,2,6,17,6,3,-.2172762006521225,.7109889984130859,-.5936073064804077,0,2,10,10,1,8,-1,10,14,1,4,2,.0120719699189067,-.2824048101902008,.5901355147361755,0,2,7,10,9,2,-1,10,10,3,2,3,-.0178541392087936,.5313752293586731,-.2275896072387695,0,2,5,1,6,6,-1,5,3,6,2,3,.0223336108028889,-.1755609959363937,.633561372756958,0,2,3,1,15,9,-1,3,4,15,3,3,-.091420017182827,.6156309247016907,-.1689953058958054,0,2,6,3,9,6,-1,6,5,9,2,3,.028973650187254,-.1225007995963097,.7440117001533508,0,2,8,17,6,3,-1,10,17,2,3,3,.007820346392691135,.1697437018156052,-.6544165015220642,0,2,9,10,9,1,-1,12,10,3,1,3,.0203404892235994,-.1255664974451065,.8271045088768005,0,2,1,7,6,11,-1,3,7,2,11,3,-.0119261499494314,.3860568106174469,-.2099234014749527,0,2,9,18,3,1,-1,10,18,1,1,3,-.000972811016254127,-.6376119256019592,.129523903131485,0,2,16,16,1,2,-1,16,17,1,1,2,18322050891583785e-21,-.3463147878646851,.2292426973581314,0,2,9,17,6,3,-1,11,17,2,3,3,-.008085441775619984,-.6366580128669739,.1307865977287293,-1.372818946838379,9,0,2,8,0,5,18,-1,8,6,5,6,3,-.1181226968765259,.6784452199935913,-.5004578232765198,0,2,6,7,9,7,-1,9,7,3,7,3,-.0343327596783638,.6718636155128479,-.3574487864971161,0,2,14,6,6,10,-1,16,6,2,10,3,-.0215307995676994,.7222070097923279,-.1819241940975189,0,2,9,8,9,5,-1,12,8,3,5,3,-.0219099707901478,.6652938723564148,-.2751022875308991,0,2,3,7,9,6,-1,6,7,3,6,3,-.0287135392427444,.6995570063591003,-.1961558014154434,0,2,1,7,6,6,-1,3,7,2,6,3,-.0114674801006913,.5926734805107117,-.2209735065698624,0,2,16,0,4,18,-1,16,6,4,6,3,-.0226111691445112,.3448306918144226,-.3837955892086029,0,2,0,17,3,3,-1,0,18,3,1,3,-.0019308089977130294,-.794457197189331,.1562865972518921,0,2,16,0,2,1,-1,17,0,1,1,2,5641991083393805e-20,-.3089601099491119,.3543108999729157,-1.2879480123519897,16,0,2,0,8,20,12,-1,0,14,20,6,2,.1988652050495148,-.5286070108413696,.3553672134876251,0,2,6,6,9,8,-1,9,6,3,8,3,-.0360089391469955,.4210968911647797,-.393489807844162,0,2,5,3,12,9,-1,5,6,12,3,3,-.0775698497891426,.4799154102802277,-.2512216866016388,0,2,4,16,1,2,-1,4,17,1,1,2,8263085328508168e-20,-.3847548961639404,.318492203950882,0,2,18,10,2,1,-1,19,10,1,1,2,.00032773229759186506,-.2642731964588165,.3254724144935608,0,2,9,8,6,5,-1,11,8,2,5,3,-.0185748506337404,.4673658907413483,-.1506727039813995,0,2,0,0,2,1,-1,1,0,1,1,2,-7000876212259755e-20,.2931315004825592,-.2536509931087494,0,2,6,8,6,6,-1,8,8,2,6,3,-.0185521300882101,.4627366065979004,-.1314805001020432,0,2,11,7,6,7,-1,13,7,2,7,3,-.0130304200574756,.4162721931934357,-.1775148957967758,0,2,19,14,1,2,-1,19,15,1,1,2,6569414108525962e-20,-.2803510129451752,.2668074071407318,0,2,6,17,1,2,-1,6,18,1,1,2,.00017005260451696813,-.2702724933624268,.2398165017366409,0,2,14,7,2,7,-1,15,7,1,7,2,-.0033129199873656034,.4441143870353699,-.1442888975143433,0,2,6,8,2,4,-1,7,8,1,4,2,.0017583490116521716,-.1612619012594223,.4294076859951019,0,2,5,8,12,6,-1,5,10,12,2,3,-.0251947492361069,.4068729877471924,-.1820258051156998,0,2,2,17,1,3,-1,2,18,1,1,3,.0014031709870323539,.0847597867250443,-.8001856803894043,0,2,6,7,3,6,-1,7,7,1,6,3,-.007399172987788916,.5576609969139099,-.1184315979480743,-1.2179850339889526,23,0,2,6,7,9,12,-1,9,7,3,12,3,-.0299430806189775,.3581081032752991,-.3848763108253479,0,2,6,2,11,12,-1,6,6,11,4,3,-.1256738007068634,.3931693136692047,-.3001225888729096,0,2,1,12,5,8,-1,1,16,5,4,2,.0053635272197425365,-.4390861988067627,.1925701051950455,0,2,14,7,6,7,-1,16,7,2,7,3,-.008097182027995586,.399066686630249,-.2340787053108215,0,2,10,8,6,6,-1,12,8,2,6,3,-.0165979098528624,.4209528863430023,-.2267484068870544,0,2,16,18,4,2,-1,16,19,4,1,2,-.0020199299324303865,-.7415673136711121,.1260118931531906,0,2,18,17,2,3,-1,18,18,2,1,3,-.0015202340437099338,-.7615460157394409,.0863736122846603,0,2,9,7,3,7,-1,10,7,1,7,3,-.004966394044458866,.4218223989009857,-.1790491938591003,0,2,5,6,6,8,-1,7,6,2,8,3,-.0192076005041599,.4689489901065826,-.1437875032424927,0,2,2,6,6,11,-1,4,6,2,11,3,-.0122226802632213,.3284207880496979,-.218021497130394,0,2,8,10,12,8,-1,8,14,12,4,2,.0575486682355404,-.3676880896091461,.2435711026191711,0,2,7,17,6,3,-1,9,17,2,3,3,-.00957940798252821,-.7224506735801697,.0636645630002022,0,2,10,9,3,3,-1,11,9,1,3,3,-.002954574069008231,.358464390039444,-.1669632941484451,0,2,8,8,3,6,-1,9,8,1,6,3,-.004201799165457487,.390948086977005,-.1204179003834724,0,2,7,0,6,5,-1,9,0,2,5,3,-.0136249903589487,-.5876771807670593,.0884047299623489,0,2,6,17,1,3,-1,6,18,1,1,3,6285311246756464e-20,-.2634845972061157,.2141927927732468,0,2,0,18,4,2,-1,0,19,4,1,2,-.0026782939676195383,-.7839016914367676,.0805269628763199,0,2,4,1,11,9,-1,4,4,11,3,3,-.0705971792340279,.414692610502243,-.1398995965719223,0,2,3,1,14,9,-1,3,4,14,3,3,.0920936465263367,-.1305518001317978,.5043578147888184,0,2,0,9,6,4,-1,2,9,2,4,3,-.008800438605248928,.3660975098609924,-.1403664946556091,0,2,18,13,1,2,-1,18,14,1,1,2,750809776945971e-19,-.2970443964004517,.207029402256012,0,2,13,5,3,11,-1,14,5,1,11,3,-.002987045096233487,.3561570048332214,-.1544596999883652,0,3,0,18,8,2,-1,0,18,4,1,2,4,19,4,1,2,-.002644150983542204,-.5435351729393005,.1029511019587517,-1.2905240058898926,27,0,2,5,8,12,5,-1,9,8,4,5,3,-.0478624701499939,.4152823984622955,-.3418582081794739,0,2,4,7,11,10,-1,4,12,11,5,2,.087350532412529,-.3874978125095367,.2420420050621033,0,2,14,9,6,4,-1,16,9,2,4,3,-.0168494991958141,.5308247804641724,-.1728291064500809,0,2,0,7,6,8,-1,3,7,3,8,2,-.0288700293749571,.3584350943565369,-.2240259051322937,0,2,0,16,3,3,-1,0,17,3,1,3,.00256793899461627,.1499049961566925,-.6560940742492676,0,2,7,11,12,1,-1,11,11,4,1,3,-.0241166595369577,.5588967800140381,-.148102805018425,0,2,4,8,9,4,-1,7,8,3,4,3,-.0328266583383083,.4646868109703064,-.1078552976250649,0,2,5,16,6,4,-1,7,16,2,4,3,-.0152330603450537,-.7395442724227905,.056236881762743,0,2,18,17,1,3,-1,18,18,1,1,3,-.0003020951116923243,-.4554882049560547,.0970698371529579,0,2,18,17,1,3,-1,18,18,1,1,3,.0007536510820500553,.0951472967863083,-.5489501953125,0,3,4,9,4,10,-1,4,9,2,5,2,6,14,2,5,2,-.0106389503926039,.4091297090053558,-.1230840981006622,0,2,4,8,6,4,-1,6,8,2,4,3,-.007521783001720905,.4028914868831635,-.1604878008365631,0,2,10,2,2,18,-1,10,8,2,6,3,-.1067709997296333,.6175932288169861,-.0730911865830421,0,3,0,5,8,6,-1,0,5,4,3,2,4,8,4,3,2,.0162569191306829,-.1310368031263351,.3745365142822266,0,2,6,0,6,5,-1,8,0,2,5,3,-.020679360255599,-.71402907371521,.0523900091648102,0,2,18,0,2,14,-1,18,7,2,7,2,.0170523691922426,.1282286047935486,-.3108068108558655,0,2,8,18,4,2,-1,10,18,2,2,2,-.0057122060097754,-.605565071105957,.0818847566843033,0,2,1,17,6,3,-1,1,18,6,1,3,20851430235779844e-21,-.2681298851966858,.1445384025573731,0,2,11,8,3,5,-1,12,8,1,5,3,.007928443141281605,-.078795351088047,.5676258206367493,0,2,11,8,3,4,-1,12,8,1,4,3,-.0025217379443347454,.3706862926483154,-.1362057030200958,0,2,11,0,6,5,-1,13,0,2,5,3,-.0224261991679668,-.6870499849319458,.0510628595948219,0,2,1,7,6,7,-1,3,7,2,7,3,-.007645144127309322,.2349222004413605,-.1790595948696137,0,2,0,13,1,3,-1,0,14,1,1,3,-.0011175329564139247,-.5986905097961426,.0743244364857674,0,2,3,2,9,6,-1,3,4,9,2,3,.0192127898335457,-.1570255011320114,.2973746955394745,0,2,8,6,9,2,-1,8,7,9,1,2,.00562934298068285,-.0997690185904503,.4213027060031891,0,2,0,14,3,6,-1,0,16,3,2,3,-.00956718623638153,-.6085879802703857,.0735062584280968,0,2,1,11,6,4,-1,3,11,2,4,3,.0112179601565003,-.103208102285862,.4190984964370728,-1.160048007965088,28,0,2,6,9,9,3,-1,9,9,3,3,3,-.0174864400178194,.3130728006362915,-.3368118107318878,0,2,6,0,9,6,-1,6,2,9,2,3,.0307146497070789,-.1876619011163712,.5378080010414124,0,2,8,5,6,6,-1,8,7,6,2,3,-.0221887193620205,.3663788139820099,-.1612481027841568,0,2,1,12,2,1,-1,2,12,1,1,2,-50700771680567414e-21,.2124571055173874,-.2844462096691132,0,2,10,10,6,2,-1,12,10,2,2,3,-.007017042022198439,.3954311013221741,-.1317359060049057,0,2,13,8,6,6,-1,15,8,2,6,3,-.00685636093840003,.3037385940551758,-.2065781950950623,0,2,6,16,6,4,-1,8,16,2,4,3,-.0141292596235871,-.7650300860404968,.0982131883502007,0,2,8,0,9,9,-1,8,3,9,3,3,-.047915481030941,.483073890209198,-.1300680935382843,0,2,18,17,1,3,-1,18,18,1,1,3,47032979637151584e-21,-.2521657049655914,.2438668012619019,0,2,18,17,1,3,-1,18,18,1,1,3,.0010221180273219943,.0688576027750969,-.6586114168167114,0,2,7,10,3,3,-1,8,10,1,3,3,-.002605610992759466,.4294202923774719,-.1302246004343033,0,3,9,14,2,2,-1,9,14,1,1,2,10,15,1,1,2,5450534081319347e-20,-.1928862035274506,.2895849943161011,0,3,9,14,2,2,-1,9,14,1,1,2,10,15,1,1,2,-6672115705441684e-20,.3029071092605591,-.1985436975955963,0,2,0,8,19,12,-1,0,14,19,6,2,.2628143131732941,-.2329394072294235,.2369246035814285,0,2,7,6,9,14,-1,10,6,3,14,3,-.0235696695744991,.1940104067325592,-.2848461866378784,0,2,13,8,3,4,-1,14,8,1,4,3,-.003912017215043306,.5537897944450378,-.0956656783819199,0,2,4,17,1,3,-1,4,18,1,1,3,5078879985376261e-20,-.239126592874527,.217994898557663,0,2,4,9,6,3,-1,6,9,2,3,3,-.007873201742768288,.4069742858409882,-.1276804059743881,0,2,2,18,5,2,-1,2,19,5,1,2,-.0016778609715402126,-.5774465799331665,.0973247885704041,0,3,7,8,2,2,-1,7,8,1,1,2,8,9,1,1,2,-.0002683243073988706,.2902188003063202,-.1683126986026764,0,3,7,8,2,2,-1,7,8,1,1,2,8,9,1,1,2,7868718239478767e-20,-.1955157071352005,.2772096991539002,0,2,5,10,13,2,-1,5,11,13,1,2,.0129535002633929,-.0968383178114891,.4032387137413025,0,2,10,8,1,9,-1,10,11,1,3,3,-.0130439596250653,.4719856977462769,-.0892875492572784,0,3,15,8,2,12,-1,15,8,1,6,2,16,14,1,6,2,.0030261781066656113,-.1362338066101074,.3068627119064331,0,2,4,0,3,5,-1,5,0,1,5,3,-.006043803878128529,-.779541015625,.0573163107037544,0,2,12,6,3,7,-1,13,6,1,7,3,-.0022507249377667904,.3087705969810486,-.1500630974769592,0,2,7,16,6,4,-1,9,16,2,4,3,.0158268101513386,.0645518898963928,-.7245556712150574,0,2,9,16,2,1,-1,10,16,1,1,2,6586450763279572e-20,-.1759884059429169,.2321038991212845,-1.2257250547409058,36,0,2,6,10,9,2,-1,9,10,3,2,3,-.0278548691421747,.4551844894886017,-.1809991002082825,0,2,0,6,15,14,-1,0,13,15,7,2,.1289504021406174,-.5256553292274475,.1618890017271042,0,2,9,1,5,6,-1,9,3,5,2,3,.0244031809270382,-.1497496068477631,.4235737919807434,0,2,3,9,3,4,-1,4,9,1,4,3,-.0024458570405840874,.3294866979122162,-.1744769066572189,0,2,5,7,3,6,-1,6,7,1,6,3,-.0035336529836058617,.4742664098739624,-.0736183598637581,0,2,17,16,1,2,-1,17,17,1,1,2,5135815081303008e-20,-.3042193055152893,.1563327014446259,0,2,9,8,6,12,-1,11,8,2,12,3,-.0162256807088852,.2300218045711517,-.2035982012748718,0,2,6,10,6,1,-1,8,10,2,1,3,-.004600700922310352,.4045926928520203,-.1348544061183929,0,2,7,17,9,3,-1,10,17,3,3,3,-.0219289995729923,-.6872448921203613,.0806842669844627,0,2,14,18,6,2,-1,14,19,6,1,2,-.002897121012210846,-.6961960792541504,.0485452190041542,0,2,9,5,3,14,-1,10,5,1,14,3,-.0044074649922549725,.2516626119613648,-.1623664945363998,0,2,8,16,9,4,-1,11,16,3,4,3,.0284371692687273,.0603942610323429,-.6674445867538452,0,2,0,0,4,14,-1,0,7,4,7,2,.0832128822803497,.0643579214811325,-.5362604260444641,0,2,8,1,6,3,-1,10,1,2,3,3,-.0124193299561739,-.708168625831604,.0575266107916832,0,2,6,8,3,4,-1,7,8,1,4,3,-.004699259996414185,.5125433206558228,-.0873508006334305,0,2,4,8,3,4,-1,5,8,1,4,3,-.0007802580948919058,.266876608133316,-.1796150952577591,0,2,5,1,6,5,-1,7,1,2,5,3,-.0197243392467499,-.6756373047828674,.0729419067502022,0,2,1,18,1,2,-1,1,19,1,1,2,.001026925048790872,.0539193190634251,-.5554018020629883,0,2,7,0,6,6,-1,7,2,6,2,3,-.0259571895003319,.5636252760887146,-.0718983933329582,0,2,0,18,4,2,-1,0,19,4,1,2,-.0012552699772641063,-.5034663081169128,.0896914526820183,0,2,12,3,8,12,-1,12,7,8,4,3,-.0499705784022808,.1768511980772018,-.2230195999145508,0,2,12,9,3,4,-1,13,9,1,4,3,-.002989961067214608,.391224205493927,-.1014975011348724,0,2,12,8,3,5,-1,13,8,1,5,3,.004854684229940176,-.1177017986774445,.4219093918800354,0,2,16,0,2,1,-1,17,0,1,1,2,.0001044886012095958,-.1733397990465164,.223444402217865,0,2,5,17,1,3,-1,5,18,1,1,3,5968926052446477e-20,-.2340963035821915,.1655824035406113,0,2,10,2,3,6,-1,10,4,3,2,3,-.0134239196777344,.4302381873130798,-.0997236520051956,0,2,4,17,2,3,-1,4,18,2,1,3,.002258199965581298,.0727209895849228,-.5750101804733276,0,2,12,7,1,9,-1,12,10,1,3,3,-.0125462803989649,.3618457913398743,-.1145701035857201,0,2,7,6,3,9,-1,8,6,1,9,3,-.002870576921850443,.2821053862571716,-.1236755028367043,0,2,17,13,3,6,-1,17,15,3,2,3,.0197856407612562,.0478767491877079,-.806662380695343,0,2,7,7,3,8,-1,8,7,1,8,3,.004758893046528101,-.1092538982629776,.3374697864055634,0,2,5,0,3,5,-1,6,0,1,5,3,-.006997426971793175,-.8029593825340271,.0457067005336285,0,2,4,6,9,8,-1,7,6,3,8,3,-.0130334803834558,.18680439889431,-.176889106631279,0,2,2,9,3,3,-1,3,9,1,3,3,-.0013742579612880945,.2772547900676727,-.1280900985002518,0,2,16,18,4,2,-1,16,19,4,1,2,.0027657810132950544,.0907589420676231,-.4259473979473114,0,2,17,10,3,10,-1,17,15,3,5,2,.0002894184144679457,-.388163298368454,.089267797768116,-1.2863140106201172,47,0,2,8,9,6,4,-1,10,9,2,4,3,-.0144692296162248,.3750782907009125,-.2492828965187073,0,2,5,2,10,12,-1,5,6,10,4,3,-.1331762969493866,.3016637861728668,-.2241407036781311,0,2,6,9,6,3,-1,8,9,2,3,3,-.010132160037756,.3698559105396271,-.1785001009702683,0,2,11,7,3,7,-1,12,7,1,7,3,-.007851118221879005,.4608676135540009,-.1293139010667801,0,2,12,8,6,4,-1,14,8,2,4,3,-.0142958397045732,.4484142959117889,-.1022624000906944,0,2,14,8,6,5,-1,16,8,2,5,3,-.005960694048553705,.279279887676239,-.1532382965087891,0,2,12,12,2,4,-1,12,14,2,2,2,.010932769626379,-.1514174044132233,.3988964855670929,0,2,3,15,1,2,-1,3,16,1,1,2,50430990086169913e-21,-.2268157005310059,.2164438962936401,0,2,12,7,3,4,-1,13,7,1,4,3,-.0058431681245565414,.4542014896869659,-.1258715987205505,0,2,10,0,6,6,-1,12,0,2,6,3,-.0223462097346783,-.6269019246101379,.0824031233787537,0,2,10,6,3,8,-1,11,6,1,8,3,-.00488366698846221,.2635925114154816,-.1468663066625595,0,2,16,17,1,2,-1,16,18,1,1,2,7550600275862962e-20,-.2450702041387558,.1667888015508652,0,2,16,16,1,3,-1,16,17,1,1,3,-.0004902699729427695,-.426499605178833,.0899735614657402,0,2,11,11,1,2,-1,11,12,1,1,2,.0014861579984426498,-.1204025000333786,.3009765148162842,0,2,3,7,6,9,-1,5,7,2,9,3,-.0119883399456739,.278524786233902,-.122443400323391,0,2,4,18,9,1,-1,7,18,3,1,3,.0105022396892309,.0404527597129345,-.7405040860176086,0,2,0,11,4,9,-1,0,14,4,3,3,-.0309630092233419,-.6284269094467163,.048013761639595,0,2,9,17,6,3,-1,11,17,2,3,3,.0114145204424858,.0394052118062973,-.7167412042617798,0,2,7,8,6,12,-1,9,8,2,12,3,-.0123370001092553,.1994132995605469,-.1927430033683777,0,2,6,8,3,4,-1,7,8,1,4,3,-.005994226783514023,.5131816267967224,-.0616580583155155,0,2,3,17,1,3,-1,3,18,1,1,3,-.0011923230485990644,-.72605299949646,.0506527200341225,0,2,11,9,6,4,-1,13,9,2,4,3,-.0074582789093256,.2960307896137238,-.1175478994846344,0,2,6,1,3,2,-1,7,1,1,2,3,.0027877509128302336,.0450687110424042,-.6953541040420532,0,2,1,0,2,1,-1,2,0,1,1,2,-.0002250320976600051,.200472503900528,-.1577524989843369,0,3,1,0,2,14,-1,1,0,1,7,2,2,7,1,7,2,-.005036788992583752,.292998194694519,-.1170049980282784,0,2,5,5,11,8,-1,5,9,11,4,2,.0747421607375145,-.1139231994748116,.3025662004947662,0,2,9,3,5,6,-1,9,5,5,2,3,.0202555190771818,-.1051589027047157,.4067046046257019,0,2,7,9,5,10,-1,7,14,5,5,2,.0442145094275475,-.2763164043426514,.1236386969685555,0,2,15,10,2,2,-1,16,10,1,2,2,-.0008725955849513412,.2435503005981445,-.1330094933509827,0,2,0,18,8,2,-1,0,19,8,1,2,-.0024453739169985056,-.5386617183685303,.062510646879673,0,2,7,17,1,3,-1,7,18,1,1,3,827253534225747e-19,-.2077220976352692,.1627043932676315,0,2,7,2,11,6,-1,7,4,11,2,3,-.036627110093832,.3656840920448303,-.0903302803635597,0,2,8,3,9,3,-1,8,4,9,1,3,.0030996399000287056,-.1318302005529404,.2535429894924164,0,2,0,9,2,2,-1,0,10,2,1,2,-.0024709280114620924,-.5685349702835083,.0535054318606853,0,2,0,5,3,6,-1,0,7,3,2,3,-.0141146704554558,-.4859901070594788,.0584852509200573,0,3,6,7,2,2,-1,6,7,1,1,2,7,8,1,1,2,.0008453726186417043,-.0800936371088028,.4026564955711365,0,2,7,6,3,6,-1,8,6,1,6,3,-.007109863217920065,.4470323920249939,-.0629474371671677,0,2,12,1,6,4,-1,14,1,2,4,3,-.0191259607672691,-.6642286777496338,.0498227700591087,0,2,9,11,6,8,-1,11,11,2,8,3,-.005077301058918238,.1737940013408661,-.168505996465683,0,2,17,15,3,3,-1,17,16,3,1,3,-.002919828984886408,-.6011028289794922,.0574279390275478,0,2,6,6,3,9,-1,6,9,3,3,3,-.0249021500349045,.233979806303978,-.1181845963001251,0,3,0,5,8,6,-1,0,5,4,3,2,4,8,4,3,2,.02014777995646,-.0894598215818405,.3602440059185028,0,2,0,6,1,3,-1,0,7,1,1,3,.001759764039888978,.0494584403932095,-.6310262084007263,0,2,17,0,2,6,-1,18,0,1,6,2,.0013812039978802204,-.1521805971860886,.1897173970937729,0,2,10,17,6,3,-1,12,17,2,3,3,-.0109045403078198,-.5809738039970398,.0448627285659313,0,3,13,15,2,2,-1,13,15,1,1,2,14,16,1,1,2,7515717879869044e-20,-.1377734988927841,.1954316049814224,0,2,4,0,12,3,-1,4,1,12,1,3,.003864977043122053,-.1030222997069359,.2537496984004974,-1.1189440488815308,48,0,2,5,3,10,9,-1,5,6,10,3,3,-.102158896625042,.4168125987052918,-.1665562987327576,0,2,7,7,9,7,-1,10,7,3,7,3,-.051939819008112,.3302395045757294,-.2071571052074432,0,2,5,8,9,6,-1,8,8,3,6,3,-.0427177809178829,.2609373033046722,-.1601389050483704,0,2,0,16,6,2,-1,0,17,6,1,2,.00043890418601222336,-.3475053012371063,.1391891986131668,0,2,12,6,7,14,-1,12,13,7,7,2,.0242643896490335,-.4255205988883972,.1357838064432144,0,2,13,7,6,8,-1,15,7,2,8,3,-.0238205995410681,.3174980878829956,-.1665204018354416,0,2,2,10,6,3,-1,4,10,2,3,3,-.007051818072795868,.3094717860221863,-.1333830058574677,0,2,18,17,1,3,-1,18,18,1,1,3,-.0006851715734228492,-.6008226275444031,.0877470001578331,0,2,7,1,6,2,-1,7,2,6,1,2,.0053705149330198765,-.1231144964694977,.3833355009555817,0,2,6,0,6,4,-1,6,2,6,2,2,-.0134035395458341,.3387736976146698,-.1014048978686333,0,2,8,18,6,2,-1,10,18,2,2,3,-.006685636006295681,-.6119359731674194,.0477402210235596,0,2,7,6,5,2,-1,7,7,5,1,2,-.0042887418530881405,.2527579069137573,-.1443451046943665,0,2,6,7,3,6,-1,7,7,1,6,3,-.0108767496421933,.5477573275566101,-.0594554804265499,0,3,18,18,2,2,-1,18,18,1,1,2,19,19,1,1,2,.0003788264002650976,.0834103003144264,-.4422636926174164,0,2,16,8,3,7,-1,17,8,1,7,3,-.002455014968290925,.2333099991083145,-.1396448016166687,0,2,0,16,2,3,-1,0,17,2,1,3,.0012721839593723416,.0604802891612053,-.4945608973503113,0,2,5,19,6,1,-1,7,19,2,1,3,-.004893315955996513,-.6683326959609985,.0462184995412827,0,2,9,5,6,6,-1,9,7,6,2,3,.0264499895274639,-.0732353627681732,.4442596137523651,0,2,0,10,2,4,-1,0,12,2,2,2,-.003370607038959861,-.4246433973312378,.0686765611171722,0,2,0,9,4,3,-1,2,9,2,3,2,-.0029559480026364326,.1621803939342499,-.1822299957275391,0,2,1,10,6,9,-1,3,10,2,9,3,.0306199099868536,-.0586433410644531,.532636284828186,0,2,9,0,6,2,-1,11,0,2,2,3,-.009576590731739998,-.6056268215179443,.0533459894359112,0,2,14,1,2,1,-1,15,1,1,1,2,6637249316554517e-20,-.1668083965778351,.1928416043519974,0,2,0,8,1,4,-1,0,10,1,2,2,.005097595043480396,.0441195107996464,-.574588418006897,0,3,15,6,2,2,-1,15,6,1,1,2,16,7,1,1,2,.0003711271856445819,-.1108639985322952,.2310539036989212,0,2,7,5,3,6,-1,8,5,1,6,3,-.008660758845508099,.4045628905296326,-.062446091324091,0,2,19,17,1,3,-1,19,18,1,1,3,.0008748915861360729,.0648751482367516,-.4487104117870331,0,2,7,10,3,1,-1,8,10,1,1,3,.0011120870476588607,-.09386146068573,.3045391142368317,0,2,12,1,6,6,-1,14,1,2,6,3,-.0238378196954727,-.5888742804527283,.0466594211757183,0,2,15,5,2,1,-1,16,5,1,1,2,.00022272899514064193,-.1489859968423843,.1770195066928864,0,2,8,2,7,4,-1,8,4,7,2,2,.0244674701243639,-.0557896010577679,.4920830130577087,0,2,4,0,14,15,-1,4,5,14,5,3,-.1423932015895844,.1519200056791306,-.1877889931201935,0,2,7,8,6,6,-1,9,8,2,6,3,-.0201231203973293,.2178010046482086,-.1208190023899078,0,2,11,17,1,3,-1,11,18,1,1,3,.00011513679783092812,-.1685658991336823,.1645192950963974,0,3,12,16,2,4,-1,12,16,1,2,2,13,18,1,2,2,-.0027556740678846836,-.6944203972816467,.039449468255043,0,2,10,13,2,1,-1,11,13,1,1,2,-7584391278214753e-20,.1894136965274811,-.151838406920433,0,2,11,8,3,3,-1,12,8,1,3,3,-.0070697711780667305,.4706459939479828,-.0579276196658611,0,2,2,0,6,8,-1,4,0,2,8,3,-.0373931787908077,-.7589244842529297,.0341160483658314,0,3,3,5,6,6,-1,3,5,3,3,2,6,8,3,3,2,-.0159956105053425,.3067046999931335,-.0875255763530731,0,2,10,8,3,3,-1,11,8,1,3,3,-.003118399064987898,.2619537115097046,-.0912148877978325,0,2,5,17,4,2,-1,5,18,4,1,2,.001065136049874127,-.1742756068706513,.1527764052152634,0,2,8,16,5,2,-1,8,17,5,1,2,-.0016029420075938106,.3561263084411621,-.0766299962997437,0,2,0,4,3,3,-1,0,5,3,1,3,.004361990839242935,.04935697093606,-.5922877192497253,0,2,6,3,6,2,-1,8,3,2,2,3,-.0107799097895622,-.6392217874526978,.0332045406103134,0,2,4,4,9,3,-1,7,4,3,3,3,-.004359086975455284,.1610738933086395,-.1522132009267807,0,2,0,13,1,4,-1,0,15,1,2,2,.007459606975317001,.0331729613244534,-.7500774264335632,0,2,0,17,8,3,-1,0,18,8,1,3,.008138544857501984,.0263252798467875,-.7173116207122803,0,2,6,1,11,6,-1,6,3,11,2,3,-.0333384908735752,.3353661000728607,-.070803590118885,-1.1418989896774292,55,0,2,4,10,6,2,-1,6,10,2,2,3,.0195539798587561,-.1043972000479698,.5312895178794861,0,2,10,8,1,12,-1,10,14,1,6,2,.0221229195594788,-.2474727034568787,.2084725052118301,0,2,5,8,3,4,-1,6,8,1,4,3,-.004182938951998949,.3828943967819214,-.1471157968044281,0,2,0,17,1,3,-1,0,18,1,1,3,-.0008638172876089811,-.6263288855552673,.1199325993657112,0,2,0,17,1,3,-1,0,18,1,1,3,.0007995861233212054,.0925734713673592,-.5516883134841919,0,2,13,8,3,4,-1,14,8,1,4,3,.009152757003903389,-.0729298070073128,.5551251173019409,0,2,1,5,5,4,-1,1,7,5,2,2,-.003938868176192045,.2019603997468948,-.2091203927993774,0,2,18,14,1,2,-1,18,15,1,1,2,.00014613410166930407,-.278618186712265,.1381741017103195,0,2,13,8,2,4,-1,14,8,1,4,2,-.0031691689509898424,.3668589890003204,-.0763082429766655,0,2,10,6,6,8,-1,12,6,2,8,3,-.0221893899142742,.39096599817276,-.1097154021263123,0,2,8,6,6,10,-1,10,6,2,10,3,-.007452360820025206,.1283859014511108,-.2415986955165863,0,2,17,16,1,3,-1,17,17,1,1,3,.000779970025178045,.0719780698418617,-.4397650063037872,0,2,1,7,2,10,-1,2,7,1,10,2,-.004678363911807537,.2156984955072403,-.1420592069625855,0,2,5,9,6,3,-1,7,9,2,3,3,-.0151886399835348,.364587813615799,-.08267592638731,0,2,0,8,5,12,-1,0,14,5,6,2,.0050619798712432384,-.3438040912151337,.0920682325959206,0,2,0,11,1,3,-1,0,12,1,1,3,-.0017351920250803232,-.6172549724578857,.0492144785821438,0,2,6,16,6,4,-1,8,16,2,4,3,-.012423450127244,-.5855895280838013,.0461126007139683,0,2,0,6,2,6,-1,0,8,2,2,3,-.0130314296111465,-.5971078872680664,.0406724587082863,0,2,11,18,2,1,-1,12,18,1,1,2,-.0012369629694148898,-.6833416819572449,.0331561788916588,0,2,5,1,9,2,-1,5,2,9,1,2,.006102210842072964,-.0947292372584343,.3010224103927612,0,2,0,0,1,2,-1,0,1,1,1,2,.0006695284973829985,.0818168669939041,-.351960301399231,0,2,15,9,3,3,-1,16,9,1,3,3,-.001797058037482202,.2371897995471954,-.1176870986819267,0,2,18,16,1,3,-1,18,17,1,1,3,-.0007107452838681638,-.4476378858089447,.0576824806630611,0,2,11,10,6,1,-1,13,10,2,1,3,-.005912647116929293,.4342541098594666,-.0668685734272003,0,2,1,3,4,4,-1,3,3,2,4,2,-.003313214983791113,.181500107049942,-.1418032050132752,0,2,11,2,1,18,-1,11,8,1,6,3,-.0608146600425243,.4722171127796173,-.0614106394350529,0,2,9,1,5,12,-1,9,5,5,4,3,-.0967141836881638,.2768316864967346,-.0944900363683701,0,2,12,0,8,1,-1,16,0,4,1,2,.003907355014234781,-.1227853000164032,.2105740010738373,0,2,8,6,3,10,-1,9,6,1,10,3,-.009043186902999878,.3564156889915466,-.0778062269091606,0,2,19,2,1,6,-1,19,4,1,2,3,-.004880003165453672,-.4103479087352753,.0696943774819374,0,2,18,6,2,2,-1,18,7,2,1,2,-.00435474282130599,-.7301788926124573,.0366551503539085,0,2,7,7,3,4,-1,8,7,1,4,3,-.009650062769651413,.5518112778663635,-.0531680807471275,0,2,5,0,6,5,-1,7,0,2,5,3,-.0173973105847836,-.5708423256874084,.0502140894532204,0,2,0,3,7,3,-1,0,4,7,1,3,-.006830432917922735,-.4618028104305267,.0502026900649071,0,2,1,6,2,1,-1,2,6,1,1,2,.00033255619928240776,-.0953627303242683,.2598375976085663,0,3,4,8,2,10,-1,4,8,1,5,2,5,13,1,5,2,-.0023100529797375202,.2287247031927109,-.1053353026509285,0,3,2,18,18,2,-1,2,18,9,1,2,11,19,9,1,2,-.0075426651164889336,-.5699051022529602,.0488634593784809,0,3,2,7,4,4,-1,2,7,2,2,2,4,9,2,2,2,-.0052723060362041,.3514518141746521,-.0823901072144508,0,2,17,3,3,4,-1,18,3,1,4,3,-.004857896827161312,-.6041762232780457,.0445394404232502,0,3,16,9,2,8,-1,16,9,1,4,2,17,13,1,4,2,.001586731057614088,-.1034090965986252,.2328201979398727,0,2,15,7,1,6,-1,15,9,1,2,3,-.004742781165987253,.284902811050415,-.0980904996395111,0,2,14,2,2,2,-1,14,3,2,1,2,-.0013515240279957652,.2309643030166626,-.113618403673172,0,2,17,0,2,3,-1,17,1,2,1,3,.0022526069078594446,.0644783228635788,-.4220589101314545,0,3,16,18,2,2,-1,16,18,1,1,2,17,19,1,1,2,-.0003803865984082222,-.3807620108127594,.0600432902574539,0,2,10,4,4,3,-1,10,5,4,1,3,.004904392175376415,-.076104998588562,.3323217034339905,0,2,0,2,8,6,-1,4,2,4,6,2,-.009096967056393623,.1428779065608978,-.1688780039548874,0,2,7,14,6,6,-1,7,16,6,2,3,-.0069317929446697235,.2725540995597839,-.0928795635700226,0,2,11,15,2,2,-1,11,16,2,1,2,.0011471060570329428,-.1527305990457535,.1970240026712418,0,2,7,1,9,4,-1,10,1,3,4,3,-.0376628898084164,-.5932043790817261,.0407386012375355,0,2,9,7,3,7,-1,10,7,1,7,3,-.006816557142883539,.2549408972263336,-.0940819606184959,0,3,6,17,2,2,-1,6,17,1,1,2,7,18,1,1,2,.0006620556232519448,.0467957183718681,-.4845437109470367,0,2,4,6,3,9,-1,5,6,1,9,3,-.004220255184918642,.2468214929103851,-.0946739763021469,0,2,0,10,19,10,-1,0,15,19,5,2,-.0689865127205849,-.6651480197906494,.0359263904392719,0,2,5,17,6,1,-1,7,17,2,1,3,.006170760840177536,.0258333198726177,-.7268627285957336,0,2,0,12,6,3,-1,3,12,3,3,2,.0105362497270107,-.0818289965391159,.2976079881191254,-1.1255199909210205,32,0,2,2,5,18,5,-1,8,5,6,5,3,-.0627587288618088,.2789908051490784,-.2965610921382904,0,2,1,15,6,4,-1,1,17,6,2,2,.003451647935435176,-.3463588058948517,.2090384066104889,0,2,14,10,6,6,-1,16,10,2,6,3,-.007869948633015156,.2414488941431046,-.1920557022094727,0,2,0,14,4,3,-1,0,15,4,1,3,-.0034624869003891945,-.5915178060531616,.1248644962906838,0,2,1,7,6,11,-1,3,7,2,11,3,-.009481876157224178,.1839154064655304,-.2485826015472412,0,2,13,17,7,2,-1,13,18,7,1,2,.00023226840130519122,-.3304725885391235,.1099926009774208,0,2,0,14,2,3,-1,0,15,2,1,3,.0018101120367646217,.0987440124154091,-.4963478147983551,0,2,0,0,6,2,-1,3,0,3,2,2,-.005442243069410324,.2934441864490509,-.1309475004673004,0,2,0,1,6,3,-1,3,1,3,3,2,.007414812222123146,-.1476269960403442,.3327716886997223,0,2,0,8,2,6,-1,0,10,2,2,3,-.0155651401728392,-.6840490102767944,.0998726934194565,0,3,1,2,6,14,-1,1,2,3,7,2,4,9,3,7,2,.0287205204367638,-.148332804441452,.3090257942676544,0,3,17,5,2,2,-1,17,5,1,1,2,18,6,1,1,2,9668739221524447e-20,-.1743104010820389,.2140295952558518,0,2,11,10,9,4,-1,14,10,3,4,3,.0523710586130619,-.0701568573713303,.4922299087047577,0,2,2,9,12,4,-1,6,9,4,4,3,-.0864856913685799,.5075724720954895,-.0752942115068436,0,2,7,10,12,2,-1,11,10,4,2,3,-.0421698689460754,.4568096101284027,-.0902199000120163,0,2,2,13,1,2,-1,2,14,1,1,2,45369830331765115e-21,-.2653827965259552,.1618953943252564,0,2,16,7,4,3,-1,16,8,4,1,3,.0052918000146746635,.0748901516199112,-.540546715259552,0,2,19,16,1,3,-1,19,17,1,1,3,-.0007551165181212127,-.4926199018955231,.0587239488959312,0,2,18,11,1,2,-1,18,12,1,1,2,7510813884437084e-20,-.2143210023641586,.1407776027917862,0,3,12,7,8,2,-1,12,7,4,1,2,16,8,4,1,2,.004998120944947004,-.0905473381280899,.3571606874465942,0,2,14,9,2,4,-1,15,9,1,4,2,-.0014929979806765914,.2562345862388611,-.1422906965017319,0,3,14,2,6,4,-1,14,2,3,2,2,17,4,3,2,2,.0027239411137998104,-.1564925014972687,.2108871042728424,0,2,14,0,6,1,-1,17,0,3,1,2,.002221832051873207,-.1507298946380615,.2680186927318573,0,2,3,12,2,1,-1,4,12,1,1,2,-.0007399307214654982,.2954699099063873,-.1069239005446434,0,2,17,2,3,1,-1,18,2,1,1,3,.0020113459322601557,.0506143495440483,-.7168337106704712,0,2,1,16,18,2,-1,7,16,6,2,3,.0114528704434633,-.1271906942129135,.241527795791626,0,2,2,19,8,1,-1,6,19,4,1,2,-.0010782170575112104,.2481300979852676,-.1346119940280914,0,2,1,17,4,3,-1,1,18,4,1,3,.00334176910109818,.0535783097147942,-.5227416753768921,0,2,19,13,1,2,-1,19,14,1,1,2,6939865124877542e-20,-.2169874012470245,.1281217932701111,0,3,9,16,10,4,-1,9,16,5,2,2,14,18,5,2,2,-.0040982551872730255,.2440188974142075,-.1157058998942375,0,3,12,9,2,4,-1,12,9,1,2,2,13,11,1,2,2,-.0016289720078930259,.2826147079467773,-.1065946966409683,0,2,19,11,1,9,-1,19,14,1,3,3,.0139848599210382,.0427158996462822,-.7364631295204163,-1.1729990243911743,30,0,2,6,6,14,14,-1,6,13,14,7,2,.164165198802948,-.4896030128002167,.1760770976543427,0,2,2,17,4,2,-1,2,18,4,1,2,.0008341306238435209,-.2822043001651764,.2419957965612412,0,2,0,2,1,3,-1,0,3,1,1,3,-.0017193210078403354,-.714858889579773,.0861622169613838,0,2,0,12,1,3,-1,0,13,1,1,3,-.001565495040267706,-.7297238111495972,.0940706729888916,0,2,15,15,4,4,-1,15,17,4,2,2,.0019124479731544852,-.3118715882301331,.1814339011907578,0,2,2,5,18,7,-1,8,5,6,7,3,-.1351236999034882,.2957729995250702,-.2217925041913986,0,2,1,16,5,3,-1,1,17,5,1,3,-.004030054900795221,-.6659513711929321,.0854310169816017,0,2,0,4,2,3,-1,0,5,2,1,3,-.002864046022295952,-.6208636164665222,.0531060211360455,0,2,0,6,2,6,-1,1,6,1,6,2,-.0014065420255064964,.2234628945589066,-.2021100968122482,0,2,16,14,4,3,-1,16,15,4,1,3,-.0035820449702441692,-.5403040051460266,.0682136192917824,0,3,0,0,10,6,-1,0,0,5,3,2,5,3,5,3,2,.04154447093606,-.0652158409357071,.6210923194885254,0,2,2,2,3,6,-1,3,2,1,6,3,-.009170955047011375,-.75553297996521,.0526404492557049,0,2,2,0,3,10,-1,3,0,1,10,3,.006155273877084255,.0909394025802612,-.4424613118171692,0,2,5,5,2,2,-1,5,6,2,1,2,-.0010043520014733076,.242923304438591,-.1866979002952576,0,2,12,6,4,4,-1,12,8,4,2,2,.0115198297426105,-.1176315024495125,.3672345876693726,0,2,13,5,7,3,-1,13,6,7,1,3,-.008904073387384415,-.4893133044242859,.1089702025055885,0,2,10,13,1,2,-1,10,14,1,1,2,.0005397367058321834,-.2185039967298508,.1848998963832855,0,2,16,16,4,2,-1,18,16,2,2,2,.0013727260520681739,-.1507291048765183,.2917312979698181,0,2,16,12,4,7,-1,18,12,2,7,2,-.0108073903247714,.4289745092391968,-.1028013974428177,0,2,16,17,1,3,-1,16,18,1,1,3,.0012670770520344377,.0741921588778496,-.6420825123786926,0,2,19,9,1,3,-1,19,10,1,1,3,.002299112966284156,.0471002794802189,-.723352313041687,0,2,18,7,2,6,-1,19,7,1,6,2,.002718751085922122,-.1708686947822571,.235135093331337,0,2,8,1,3,4,-1,9,1,1,4,3,-.006661918014287949,-.7897542715072632,.0450846701860428,0,2,14,0,6,9,-1,16,0,2,9,3,-.0482666492462158,-.6957991719245911,.0419760793447495,0,2,4,2,10,2,-1,9,2,5,2,2,.0152146900072694,-.1081828027963638,.3646062016487122,0,3,2,12,8,4,-1,2,12,4,2,2,6,14,4,2,2,-.006008013151586056,.309709906578064,-.1135921031236649,0,2,0,4,7,3,-1,0,5,7,1,3,.006612715777009726,.0806653425097466,-.4665853083133698,0,2,14,14,3,3,-1,15,14,1,3,3,-.007960701361298561,-.8720194101333618,.0367745906114578,0,2,0,3,4,3,-1,2,3,2,3,2,.003884719917550683,-.11666289716959,.3307026922702789,0,2,1,0,2,7,-1,2,0,1,7,2,-.001098881009966135,.2387257069349289,-.1765675991773605,-1.036829948425293,44,0,2,15,16,4,4,-1,15,18,4,2,2,.0035903379321098328,-.2368807941675186,.2463164031505585,0,2,5,8,12,4,-1,5,10,12,2,2,.006481593009084463,-.3137362003326416,.1867575943470001,0,2,3,17,1,2,-1,3,18,1,1,2,7304840255528688e-20,-.2764435112476349,.1649623960256577,0,2,6,1,3,4,-1,7,1,1,4,3,-.00385146401822567,-.5601450800895691,.1129473969340324,0,2,6,2,3,4,-1,7,2,1,4,3,.003858821000903845,.0398489981889725,-.5807185769081116,0,2,6,8,9,12,-1,9,8,3,12,3,-.0246512200683355,.1675501018762589,-.2534367144107819,0,2,8,1,8,6,-1,8,3,8,2,3,.0472455210983753,-.1066208034753799,.3945198059082031,0,2,14,2,6,3,-1,17,2,3,3,2,.00659646512940526,-.1774425059556961,.2728019058704376,0,2,0,6,1,3,-1,0,7,1,1,3,-.0013177490327507257,-.5427265167236328,.0486065894365311,0,2,10,0,10,2,-1,15,0,5,2,2,-.005026170983910561,.2439424991607666,-.1314364969730377,0,2,11,0,3,2,-1,12,0,1,2,3,.003463276894763112,.0690493434667587,-.7033624053001404,0,2,3,19,10,1,-1,8,19,5,1,2,.0021692588925361633,-.1328946053981781,.2209852933883667,0,2,0,4,7,16,-1,0,12,7,8,2,.0293958708643913,-.2853052020072937,.1354399025440216,0,2,2,16,1,3,-1,2,17,1,1,3,-.0009618144831620157,-.580413818359375,.0374506488442421,0,2,7,8,12,6,-1,11,8,4,6,3,-.1082099974155426,.3946728110313416,-.078655943274498,0,2,14,9,6,7,-1,16,9,2,7,3,-.0180248692631722,.2735562920570374,-.1341529935598373,0,2,12,17,6,1,-1,14,17,2,1,3,.006250984035432339,.023388059809804,-.8008859157562256,0,2,16,1,3,1,-1,17,1,1,1,3,-.0016088379779830575,-.5676252245903015,.0412156693637371,0,3,0,17,8,2,-1,0,17,4,1,2,4,18,4,1,2,.0007756475242786109,-.1489126980304718,.1908618062734604,0,2,17,0,2,1,-1,18,0,1,1,2,8712233830010518e-20,-.155575305223465,.194282203912735,0,2,4,15,6,5,-1,6,15,2,5,3,-.0207553207874298,-.6300653219223022,.0361343808472157,0,2,7,2,8,2,-1,7,3,8,1,2,-.0062931738793849945,.2560924887657166,-.1058826968073845,0,2,4,1,8,4,-1,4,3,8,2,2,.0108441496267915,-.1012485027313232,.3032212853431702,0,2,5,19,2,1,-1,6,19,1,1,2,-6375277735060081e-20,.1911157965660095,-.1384923011064529,0,2,5,19,2,1,-1,6,19,1,1,2,6648096314165741e-20,-.1520525068044663,.2170630991458893,0,2,16,17,1,3,-1,16,18,1,1,3,.0013560829684138298,.0494317896664143,-.6427984237670898,0,2,0,11,2,3,-1,1,11,1,3,2,-.0009066255879588425,.1798201054334641,-.1404460966587067,0,2,0,19,4,1,-1,2,19,2,1,2,.0010473709553480148,-.1093354970216751,.242659404873848,0,2,0,18,4,2,-1,2,18,2,2,2,-.0010243969736620784,.2716268002986908,-.1182091981172562,0,2,2,17,1,3,-1,2,18,1,1,3,-.0012024149764329195,-.701511025428772,.0394898988306522,0,2,5,7,11,2,-1,5,8,11,1,2,.007691164966672659,-.0922189131379128,.3104628920555115,0,2,9,2,4,10,-1,9,7,4,5,2,-.139665499329567,.6897938847541809,-.0397061184048653,0,2,0,2,4,3,-1,0,3,4,1,3,.0021276050247251987,.0972776114940643,-.2884179949760437,0,2,10,19,10,1,-1,15,19,5,1,2,-.0027594310231506824,.2416867017745972,-.1127782016992569,0,2,11,17,8,3,-1,15,17,4,3,2,.005223613232374191,-.1143027991056442,.2425678074359894,0,2,8,19,3,1,-1,9,19,1,1,3,-.0012590440455824137,-.5967938899993896,.0476639606058598,0,2,14,0,3,4,-1,15,0,1,4,3,-.0037192099262028933,-.464141309261322,.0528476908802986,0,2,10,6,4,3,-1,10,7,4,1,3,.005969615187495947,-.0732442885637283,.3874309062957764,0,2,0,8,3,2,-1,0,9,3,1,2,-.005177672021090984,-.7419322729110718,.0404967106878757,0,2,7,12,3,6,-1,7,14,3,2,3,.005003510043025017,-.1388880014419556,.1876762062311173,0,2,1,18,1,2,-1,1,19,1,1,2,-.0005201345775276423,-.5494061708450317,.0494178496301174,0,2,0,12,4,4,-1,2,12,2,4,2,.00531687680631876,-.0824829787015915,.3174056112766266,0,2,1,8,6,7,-1,3,8,2,7,3,-.0147745897993445,.2081609964370728,-.1211555972695351,0,2,0,8,4,5,-1,2,8,2,5,2,-.0414164513349533,-.8243780732154846,.0333291888237,-1.0492420196533203,53,0,2,19,16,1,3,-1,19,17,1,1,3,.0009096252033486962,.0845799669623375,-.5611841082572937,0,2,1,5,18,6,-1,7,5,6,6,3,-.0561397895216942,.1534174978733063,-.2696731984615326,0,2,2,15,4,2,-1,2,16,4,1,2,.0010292009683325887,-.2048998028039932,.2015317976474762,0,2,18,6,2,11,-1,19,6,1,11,2,.00287830107845366,-.1735114008188248,.2129794955253601,0,2,0,12,2,6,-1,0,14,2,2,3,-.0074144392274320126,-.5962486863136292,.0470779500901699,0,2,12,5,3,2,-1,12,6,3,1,2,-.0014831849839538336,.1902461051940918,-.1598639041185379,0,2,1,3,2,3,-1,1,4,2,1,3,.0045968941412866116,.0314471311867237,-.6869434118270874,0,2,16,14,4,4,-1,16,16,4,2,2,.0024255330208688974,-.23609359562397,.1103610992431641,0,2,6,8,12,5,-1,10,8,4,5,3,-.0849505662918091,.2310716062784195,-.1377653032541275,0,2,13,7,2,7,-1,14,7,1,7,2,-.005014568101614714,.3867610991001129,-.0562173798680305,0,2,1,8,2,6,-1,2,8,1,6,2,-.002148206112906337,.1819159984588623,-.1761569976806641,0,2,15,0,3,7,-1,16,0,1,7,3,-.0103967702016234,-.7535138130187988,.0240919701755047,0,2,4,2,6,2,-1,6,2,2,2,3,-.0134667502716184,-.7211886048316956,.0349493697285652,0,2,0,9,20,9,-1,0,12,20,3,3,-.0844354778528214,-.3379263877868652,.0711138173937798,0,2,10,14,2,2,-1,10,15,2,1,2,.00247714901342988,-.1176510974764824,.225419893860817,0,2,6,5,10,4,-1,6,7,10,2,2,.015828050673008,-.0695362165570259,.313953697681427,0,2,6,1,5,9,-1,6,4,5,3,3,.0649169832468033,-.0750435888767242,.4067733883857727,0,3,16,18,2,2,-1,16,18,1,1,2,17,19,1,1,2,.00029652469675056636,.0739533603191376,-.3454400897026062,0,2,0,14,2,4,-1,0,16,2,2,2,.001312952022999525,-.1690943986177445,.1525837033987045,0,2,10,8,2,5,-1,11,8,1,5,2,-.0058032129891216755,.3526014983654022,-.0834440663456917,0,2,3,7,12,7,-1,7,7,4,7,3,-.1479167938232422,.4300465881824493,-.0573099292814732,0,2,0,0,6,6,-1,3,0,3,6,2,-.016584150493145,.2343268990516663,-.1090764030814171,0,2,1,0,4,4,-1,3,0,2,4,2,.003018327057361603,-.1360093951225281,.264092892408371,0,2,0,0,6,8,-1,2,0,2,8,3,-.0364719182252884,-.628097414970398,.0435451082885265,0,2,0,0,2,1,-1,1,0,1,1,2,-7311922672670335e-20,.1647063046693802,-.1646378040313721,0,2,0,0,3,3,-1,0,1,3,1,3,-.003671945072710514,-.4742136001586914,.0485869199037552,0,2,5,4,2,4,-1,5,6,2,2,2,-.004015117883682251,.1822218000888825,-.1409751027822495,0,2,2,10,9,1,-1,5,10,3,1,3,.0199480205774307,-.0697876587510109,.3670746088027954,0,2,1,17,1,3,-1,1,18,1,1,3,.0007669943734072149,.0557292997837067,-.4458543062210083,0,2,0,17,2,3,-1,0,18,2,1,3,-.0011806039838120341,-.4687662124633789,.0489022210240364,0,2,0,15,16,3,-1,8,15,8,3,2,.0158473495393991,-.1212020963430405,.2056653052568436,0,2,0,5,4,1,-1,2,5,2,1,2,-.0011985700111836195,.2026209980249405,-.1282382011413574,0,2,1,0,6,20,-1,3,0,2,20,3,-.1096495985984802,-.8661919236183167,.0303518492728472,0,3,2,5,4,6,-1,2,5,2,3,2,4,8,2,3,2,-.009253260679543018,.2934311926364899,-.0853619500994682,0,2,9,16,6,3,-1,11,16,2,3,3,.0146865304559469,.0327986218035221,-.7755656242370605,0,2,11,17,6,1,-1,14,17,3,1,2,-.0013514430029317737,.244269996881485,-.1150325015187264,0,2,3,17,15,2,-1,8,17,5,2,3,-.004372809082269669,.2168767005205154,-.1398448050022125,0,2,18,0,2,3,-1,18,1,2,1,3,.0034263390116393566,.0456142202019691,-.545677125453949,0,2,13,1,7,4,-1,13,3,7,2,2,-.0038404068909585476,.149495005607605,-.1506250947713852,0,3,13,6,4,4,-1,13,6,2,2,2,15,8,2,2,2,.0037988980766385794,-.0873016268014908,.2548153102397919,0,2,17,6,3,4,-1,17,8,3,2,2,-.0020094281062483788,.1725907027721405,-.1428847014904022,0,2,14,9,2,2,-1,15,9,1,2,2,-.002437070943415165,.2684809863567352,-.0818982198834419,0,2,17,17,1,3,-1,17,18,1,1,3,.001048539998009801,.0461132600903511,-.4724327921867371,0,2,3,19,8,1,-1,7,19,4,1,2,.00174607802182436,-.1103043034672737,.2037972956895828,0,2,0,9,3,6,-1,0,12,3,3,2,.005860862787812948,-.1561965942382813,.1592743992805481,0,2,4,7,15,5,-1,9,7,5,5,3,-.0277249794453382,.1134911999106407,-.2188514024019241,0,2,6,9,9,5,-1,9,9,3,5,3,.0470806397497654,-.0416887290775776,.5363004803657532,0,2,8,1,6,2,-1,10,1,2,2,3,-.007928377017378807,-.5359513163566589,.0442375093698502,0,2,4,0,12,2,-1,10,0,6,2,2,-.0128805404528975,.2323794960975647,-.102462500333786,0,2,7,0,10,3,-1,12,0,5,3,2,.0236047692596912,-.0882914364337921,.3056105971336365,0,2,5,0,9,6,-1,5,2,9,2,3,.0159022007137537,-.1223810985684395,.1784912049770355,0,2,8,3,6,4,-1,8,5,6,2,2,.007993949577212334,-.0837290063500404,.3231959044933319,0,2,17,4,2,3,-1,17,5,2,1,3,.005710086785256863,.038479208946228,-.6813815236091614,-1.1122100353240967,51,0,2,5,2,4,3,-1,5,3,4,1,3,.002248072065412998,-.1641687005758286,.4164853096008301,0,2,5,9,2,6,-1,6,9,1,6,2,.004581355024129152,-.1246595978736877,.4038512110710144,0,2,14,10,2,6,-1,15,10,1,6,2,-.0016073239967226982,.260824590921402,-.202825203537941,0,2,7,4,3,3,-1,7,5,3,1,3,.0025205370038747787,-.1055722981691361,.3666911125183106,0,3,12,4,8,2,-1,12,4,4,1,2,16,5,4,1,2,.0024119189474731684,-.1387760043144226,.2995991110801697,0,2,15,8,1,6,-1,15,10,1,2,3,.005715617910027504,-.0776834636926651,.4848192036151886,0,2,4,17,11,3,-1,4,18,11,1,3,.0031093840952962637,-.1122900024056435,.2921550869941711,0,2,3,0,16,20,-1,3,10,16,10,2,-.0868366286158562,-.367796003818512,.0725972428917885,0,2,12,4,4,6,-1,12,6,4,2,3,.0052652182057499886,-.1089029014110565,.3179126083850861,0,2,11,0,6,6,-1,13,0,2,6,3,-.0199135299772024,-.5337343811988831,.0705857127904892,0,3,13,1,6,4,-1,13,1,3,2,2,16,3,3,2,2,.00382978399284184,-.135759100317955,.2278887927532196,0,2,11,0,6,4,-1,13,0,2,4,3,.0104318596422672,.0887979120016098,-.4795897006988525,0,2,8,6,6,9,-1,10,6,2,9,3,-.0200404394418001,.1574553996324539,-.1777157038450241,0,2,7,0,3,4,-1,8,0,1,4,3,-.005296729039400816,-.6843491792678833,.0356714613735676,0,3,0,17,14,2,-1,0,17,7,1,2,7,18,7,1,2,-.0021624139044433832,.2831803858280182,-.098511278629303,0,3,6,18,2,2,-1,6,18,1,1,2,7,19,1,1,2,-.00035464888787828386,-.3707734048366547,.0809329524636269,0,2,18,17,1,3,-1,18,18,1,1,3,-.00018152060511056334,-.322070300579071,.0775510594248772,0,3,17,18,2,2,-1,17,18,1,1,2,18,19,1,1,2,-.000275630212854594,-.3244127929210663,.0879494771361351,0,2,5,7,1,9,-1,5,10,1,3,3,.006382381077855825,-.0889247134327888,.3172721862792969,0,2,5,3,6,4,-1,7,3,2,4,3,.0111509095877409,.0710198432207108,-.4049403965473175,0,3,1,9,6,2,-1,1,9,3,1,2,4,10,3,1,2,-.0010593760525807738,.2605066895484924,-.1176564022898674,0,2,6,9,2,3,-1,7,9,1,3,2,.002390648005530238,-.0843886211514473,.3123055100440979,0,2,6,8,6,12,-1,8,8,2,12,3,-.0110007496550679,.1915224939584732,-.1521002054214478,0,3,4,18,2,2,-1,4,18,1,1,2,5,19,1,1,2,-.00024643228971399367,-.3176515996456146,.0865822583436966,0,2,9,1,6,6,-1,9,3,6,2,3,.0230532698333263,-.1008976027369499,.2576929032802582,0,2,6,17,6,2,-1,6,18,6,1,2,-.0022135660983622074,.4568921029567719,-.0524047911167145,0,2,3,18,16,2,-1,3,19,16,1,2,-.000971397093962878,-.3551838099956513,.0800943821668625,0,2,3,0,3,11,-1,4,0,1,11,3,.0015676229959353805,.1009142026305199,-.2160304039716721,0,2,13,18,3,1,-1,14,18,1,1,3,.0007546080159954727,.0578961782157421,-.4046111106872559,0,2,6,0,9,6,-1,6,2,9,2,3,-.0206989701837301,.3154363036155701,-.0807130485773087,0,3,1,2,12,4,-1,1,2,6,2,2,7,4,6,2,2,-.0206199400126934,.271816611289978,-.0763586163520813,0,2,3,3,6,4,-1,5,3,2,4,3,.0216111298650503,.0394934490323067,-.5942965149879456,0,2,12,0,8,1,-1,16,0,4,1,2,.006567674223333597,-.0983536690473557,.2364927977323532,0,2,9,0,6,2,-1,11,0,2,2,3,-.008843479678034782,-.5252342820167542,.0430999211966991,0,2,3,3,12,1,-1,9,3,6,1,2,-.009426074102520943,.2466513067483902,-.0941307172179222,0,3,2,7,6,2,-1,2,7,3,1,2,5,8,3,1,2,-.001983023015782237,.2674370110034943,-.0900693163275719,0,2,0,8,4,6,-1,0,10,4,2,3,-.001735839992761612,.1594001948833466,-.157894104719162,0,2,9,6,3,7,-1,10,6,1,7,3,-.0135138696059585,.4079233109951019,-.0642231181263924,0,2,9,6,6,13,-1,11,6,2,13,3,-.0193940103054047,.1801564991474152,-.1373140066862106,0,2,11,12,6,1,-1,13,12,2,1,3,-.003268477041274309,.2908039093017578,-.0801619067788124,0,2,18,9,2,6,-1,18,12,2,3,2,.00041773589327931404,-.2141298055648804,.1127343997359276,0,2,17,2,3,9,-1,18,2,1,9,3,-.007635111920535564,-.4536595940589905,.0546250604093075,0,3,13,8,4,6,-1,13,8,2,3,2,15,11,2,3,2,-.008365297690033913,.2647292017936707,-.0943341106176376,0,2,4,2,12,6,-1,10,2,6,6,2,.027768449857831,-.1013671010732651,.2074397951364517,0,2,4,14,16,6,-1,12,14,8,6,2,-.0548912286758423,.2884030938148499,-.075312040746212,0,2,6,19,10,1,-1,11,19,5,1,2,.002579333959147334,-.1108852997422218,.2172496020793915,0,2,6,17,1,3,-1,6,18,1,1,3,6619651685468853e-20,-.1887210011482239,.1444068998098373,0,2,4,14,10,3,-1,4,15,10,1,3,.005090725142508745,-.0776012316346169,.2939837872982025,0,2,6,0,12,12,-1,6,4,12,4,3,-.1044425964355469,.2013310939073563,-.1090397015213966,0,3,5,7,4,2,-1,5,7,2,1,2,7,8,2,1,2,-.0006727309082634747,.1794590055942535,-.1202367022633553,0,2,17,5,3,2,-1,18,5,1,2,3,.0032412849832326174,.0406881310045719,-.5460057258605957,-1.2529590129852295,44,0,2,8,13,6,3,-1,8,14,6,1,3,.005296532064676285,-.1215452998876572,.6442037224769592,0,2,8,13,5,3,-1,8,14,5,1,3,-.002532626036554575,.5123322010040283,-.111082598567009,0,2,13,2,1,18,-1,13,11,1,9,2,-.0029183230362832546,-.5061542987823486,.1150197982788086,0,2,6,10,9,2,-1,9,10,3,2,3,-.0236923396587372,.3716728091239929,-.1467268019914627,0,2,11,0,7,4,-1,11,2,7,2,2,.0201774705201387,-.1738884001970291,.4775949120521545,0,2,1,0,6,8,-1,3,0,2,8,3,-.021723210811615,-.4388009011745453,.1357689946889877,0,2,9,15,3,3,-1,9,16,3,1,3,.0028369780629873276,-.1251206994056702,.4678902924060822,0,2,9,17,9,3,-1,9,18,9,1,3,.002714842092245817,-.0880188569426537,.3686651885509491,0,2,12,12,3,3,-1,12,13,3,1,3,.003262568963691592,-.0853353068232536,.5164473056793213,0,2,4,1,3,5,-1,5,1,1,5,3,-.0035618850961327553,-.445039302110672,.0917381718754768,0,2,10,14,2,3,-1,10,15,2,1,3,.001922774943523109,-.1107731014490128,.3941699862480164,0,3,18,17,2,2,-1,18,17,1,1,2,19,18,1,1,2,-.0003511196991894394,-.3777570128440857,.1216617003083229,0,3,18,18,2,2,-1,18,18,1,1,2,19,19,1,1,2,.0001912177976919338,.0748160183429718,-.4076710045337677,0,3,18,18,2,2,-1,18,18,1,1,2,19,19,1,1,2,-.00026525629800744355,-.3315171897411346,.1129112020134926,0,2,4,10,9,1,-1,7,10,3,1,3,.0200867000967264,-.0615981183946133,.5612881779670715,0,2,3,9,6,5,-1,5,9,2,5,3,.0367832481861115,-.0602513886988163,.5219249129295349,0,2,18,8,1,12,-1,18,14,1,6,2,.0013941619545221329,-.3550305068492889,.1086302027106285,0,3,0,2,8,6,-1,0,2,4,3,2,4,5,4,3,2,-.0151816699653864,.2273965030908585,-.1625299006700516,0,2,9,4,3,3,-1,9,5,3,1,3,.0046796840615570545,-.0575350411236286,.4812423884868622,0,3,3,18,2,2,-1,3,18,1,1,2,4,19,1,1,2,-.00017988319450523704,-.3058767020702362,.1086815968155861,0,2,6,4,4,3,-1,6,5,4,1,3,-.0035850999411195517,.3859694004058838,-.0921940729022026,0,3,16,7,4,2,-1,16,7,2,1,2,18,8,2,1,2,.001079336041584611,-.1119038984179497,.31125208735466,0,2,5,17,1,3,-1,5,18,1,1,3,7328580250032246e-20,-.2023991048336029,.155866801738739,0,2,2,0,15,20,-1,2,10,15,10,2,.1367873996496201,-.2167285978794098,.1442039012908936,0,3,8,11,6,4,-1,8,11,3,2,2,11,13,3,2,2,-.0117292599752545,.4350377023220062,-.0748865306377411,0,2,8,16,4,3,-1,8,17,4,1,3,.003923084121197462,-.0502893291413784,.5883116126060486,0,3,8,18,2,2,-1,8,18,1,1,2,9,19,1,1,2,-.0002981912111863494,-.3823240101337433,.0924511328339577,0,2,2,16,13,3,-1,2,17,13,1,3,-.004799277056008577,.4848878979682922,-.0731365233659744,0,3,16,16,2,2,-1,16,16,1,1,2,17,17,1,1,2,-.0003015589027199894,-.3575735986232758,.1058188006281853,0,2,8,1,6,3,-1,10,1,2,3,3,.0103907696902752,.0529204681515694,-.5724965929985046,0,3,16,7,2,2,-1,16,7,1,1,2,17,8,1,1,2,-.0009448804194107652,.449668288230896,-.0830755233764648,0,3,14,7,4,2,-1,14,7,2,1,2,16,8,2,1,2,.0012651870492845774,-.0966954380273819,.3130227029323578,0,2,4,0,14,1,-1,11,0,7,1,2,.0170945394784212,-.081248976290226,.3611383140087128,0,3,10,4,8,2,-1,10,4,4,1,2,14,5,4,1,2,.002597335958853364,-.1133835017681122,.2223394960165024,0,2,8,2,3,2,-1,9,2,1,2,3,.0014527440071105957,.0697504431009293,-.3672071099281311,0,2,12,11,6,3,-1,12,12,6,1,3,.00476386584341526,-.0657889619469643,.383285403251648,0,2,1,5,1,4,-1,1,7,1,2,2,-.006250108126550913,-.7075446844100952,.038350198417902,0,2,1,1,1,18,-1,1,7,1,6,3,-.003176532918587327,.1375540047883987,-.2324002981185913,0,2,11,13,3,2,-1,11,14,3,1,2,.003219116944819689,-.1293545067310333,.2273788005113602,0,3,0,1,12,2,-1,0,1,6,1,2,6,2,6,1,2,-.005636557936668396,.380671501159668,-.0672468394041061,0,3,10,18,2,2,-1,10,18,1,1,2,11,19,1,1,2,-.00023844049428589642,-.3112238049507141,.0838383585214615,0,3,4,5,4,4,-1,4,5,2,2,2,6,7,2,2,2,-.004101756028831005,.2606728076934815,-.1044974029064179,0,2,6,7,1,3,-1,6,8,1,1,3,.0013336989795789123,-.0582501403987408,.4768244028091431,0,2,14,10,6,2,-1,16,10,2,2,3,-.0012090239906683564,.148345097899437,-.1732946932315826,-1.118873953819275,72,0,2,16,8,3,6,-1,17,8,1,6,3,-.003176093101501465,.3333333134651184,-.166423499584198,0,2,4,10,6,2,-1,6,10,2,2,3,.0248580798506737,-.0727288722991943,.5667458176612854,0,2,6,5,3,7,-1,7,5,1,7,3,-.007759728003293276,.4625856876373291,-.0931121781468391,0,2,0,13,6,6,-1,0,16,6,3,2,.007823902182281017,-.2741461098194122,.1324304938316345,0,2,12,5,1,9,-1,12,8,1,3,3,-.010948839597404,.2234548032283783,-.1496544927358627,0,2,5,9,3,3,-1,6,9,1,3,3,-.0034349008928984404,.3872498869895935,-.0661217272281647,0,2,7,5,6,13,-1,9,5,2,13,3,-.0311562903225422,.2407827973365784,-.1140690967440605,0,2,19,8,1,10,-1,19,13,1,5,2,.001110051991418004,-.2820797860622406,.1327542960643768,0,2,11,18,6,1,-1,13,18,2,1,3,.003176274010911584,.0345859304070473,-.5137431025505066,0,2,9,7,6,12,-1,11,7,2,12,3,-.0279774591326714,.2392677962779999,-.1325591951608658,0,2,12,7,6,6,-1,14,7,2,6,3,-.0230979397892952,.3901962041854858,-.0784780085086823,0,2,15,8,3,4,-1,16,8,1,4,3,-.003973193001002073,.3069106936454773,-.0706014037132263,0,2,6,11,4,2,-1,6,12,4,1,2,.003033574903383851,-.1400219053030014,.191348597407341,0,2,1,6,6,8,-1,3,6,2,8,3,-.0108443703502417,.1654873043298721,-.1565777957439423,0,2,11,15,6,5,-1,13,15,2,5,3,-.0181505102664232,-.6324359178543091,.0395618192851543,0,2,15,17,4,2,-1,15,18,4,1,2,.0007105229888111353,-.1851557046175003,.1340880990028381,0,2,13,11,6,1,-1,15,11,2,1,3,.0108933402225375,-.0267302300781012,.6097180247306824,0,3,5,18,2,2,-1,5,18,1,1,2,6,19,1,1,2,-.0002878090017475188,-.3006514012813568,.0731714591383934,0,3,4,8,4,4,-1,4,8,2,2,2,6,10,2,2,2,-.0035855069290846586,.2621760964393616,-.0797140970826149,0,2,11,7,9,3,-1,11,8,9,1,3,-.0197592806071043,-.5903922915458679,.0406989715993404,0,3,0,3,10,4,-1,0,3,5,2,2,5,5,5,2,2,-.010845210403204,.1636455953121185,-.1258606016635895,0,2,7,18,6,1,-1,9,18,2,1,3,-.004318309016525745,-.5747488141059875,.0376443117856979,0,2,0,8,3,3,-1,0,9,3,1,3,.0014913700288161635,.0609134696424007,-.3022292852401733,0,3,0,0,6,8,-1,0,0,3,4,2,3,4,3,4,2,.0156756993383169,-.0731459110975266,.2937945127487183,0,2,7,6,3,8,-1,8,6,1,8,3,-.0110335601493716,.393188089132309,-.0470843203365803,0,2,13,7,7,3,-1,13,8,7,1,3,.008855575695633888,.0376013815402985,-.4910849034786224,0,2,3,3,2,2,-1,3,4,2,1,2,-.0008966567111201584,.1795202046632767,-.1108623966574669,0,2,0,3,3,3,-1,0,4,3,1,3,-.0030592409893870354,-.4442946016788483,.0510054305195808,0,2,9,3,5,2,-1,9,4,5,1,2,.006320117972791195,-.0528410896658897,.3719710111618042,0,2,6,5,9,4,-1,9,5,3,4,3,.020682830363512,.0576671697199345,-.3690159916877747,0,2,3,10,12,3,-1,7,10,4,3,3,.0998226627707481,-.037377018481493,.5816559195518494,0,2,8,7,3,6,-1,9,7,1,6,3,-.006585422903299332,.2850944101810455,-.0609780699014664,0,2,5,5,6,5,-1,8,5,3,5,2,-.0609003007411957,-.5103176832199097,.0377874001860619,0,2,0,5,2,3,-1,0,6,2,1,3,-.0029991709161549807,-.4794301092624664,.0388338901102543,0,2,9,7,3,4,-1,10,7,1,4,3,-.009890643879771233,.4060907959938049,-.047869648784399,0,2,1,0,6,15,-1,3,0,2,15,3,-.0826889276504517,-.7067118287086487,.0274877492338419,0,2,15,1,3,5,-1,16,1,1,5,3,.00500603998079896,.028208440169692,-.5290969014167786,0,2,9,2,3,10,-1,10,2,1,10,3,.006169503089040518,-.0545548610389233,.3283798098564148,0,2,8,8,6,12,-1,10,8,2,12,3,-.0033914761152118444,.0921176671981812,-.2163711041212082,0,2,16,4,3,4,-1,16,6,3,2,2,-.0026131230406463146,.1365101933479309,-.1378113031387329,0,3,16,7,2,2,-1,16,7,1,1,2,17,8,1,1,2,.0008049065945670009,-.0686371102929115,.3358106911182404,0,2,13,0,6,9,-1,13,3,6,3,3,-.0381065085530281,.2944543063640595,-.068239226937294,0,2,7,17,1,3,-1,7,18,1,1,3,7245079905260354e-20,-.167501300573349,.1217823028564453,0,2,12,1,4,2,-1,12,2,4,1,2,.0015837959945201874,-.0920428484678268,.213489904999733,0,2,17,3,1,3,-1,17,4,1,1,3,.0012924340553581715,.0629172325134277,-.3617450892925263,0,2,0,16,9,3,-1,0,17,9,1,3,.00991467759013176,.0195340607315302,-.8101503849029541,0,3,3,6,2,4,-1,3,6,1,2,2,4,8,1,2,2,-.0017086310544982553,.2552523910999298,-.0682294592261314,0,2,13,18,3,1,-1,14,18,1,1,3,.002184439916163683,.0233140494674444,-.8429678082466125,0,2,0,18,4,2,-1,2,18,2,2,2,-.003424433059990406,.2721368968486786,-.0763952285051346,0,2,1,19,2,1,-1,2,19,1,1,2,.00027591470279730856,-.1074284017086029,.2288897037506104,0,2,0,18,4,2,-1,0,19,4,1,2,-.0006000517751090229,-.2985421121120453,.0634797364473343,0,2,2,17,1,3,-1,2,18,1,1,3,-.00025001438916660845,-.2717896997928619,.0696150064468384,0,2,4,8,3,5,-1,5,8,1,5,3,.006875139195472002,-.0571858994662762,.3669595122337341,0,2,2,1,6,7,-1,4,1,2,7,3,.0127619002014399,.0679556876420975,-.2853415012359619,0,3,3,6,2,8,-1,3,6,1,4,2,4,10,1,4,2,-.0014752789866179228,.2068066000938416,-.1005939021706581,0,2,4,5,11,10,-1,4,10,11,5,2,.1213881969451904,-.0971267968416214,.1978961974382401,0,2,0,13,20,2,-1,10,13,10,2,2,-.0500812791287899,.2841717898845673,-.0678799971938133,0,2,1,13,16,3,-1,9,13,8,3,2,.0314549505710602,-.0894686728715897,.2129842042922974,0,3,16,4,4,4,-1,16,4,2,2,2,18,6,2,2,2,.0018878319533541799,-.1165644004940987,.166635200381279,0,3,16,0,4,12,-1,16,0,2,6,2,18,6,2,6,2,-.005721196066588163,.2370214015245438,-.0907766073942184,0,2,14,15,3,1,-1,15,15,1,1,3,-.00018076719425152987,.1795192956924439,-.1079348027706146,0,2,3,4,12,10,-1,3,9,12,5,2,-.1976184993982315,.4567429125308991,-.0404801592230797,0,3,9,18,2,2,-1,9,18,1,1,2,10,19,1,1,2,-.00023846809926908463,-.2373300939798355,.0759221613407135,0,3,9,18,2,2,-1,9,18,1,1,2,10,19,1,1,2,.00021540730085689574,.0816880166530609,-.2868503034114838,0,3,13,4,2,14,-1,13,4,1,7,2,14,11,1,7,2,.0101630901917815,-.0412500202655792,.4803834855556488,0,2,4,2,6,4,-1,7,2,3,4,2,-.007218487095087767,.1745858043432236,-.1014650017023087,0,3,0,0,18,20,-1,0,0,9,10,2,9,10,9,10,2,.2426317036151886,.05342648178339,-.3231852948665619,0,2,15,11,1,2,-1,15,12,1,1,2,.0006930410163477063,-.1149917989969254,.1479393988847733,0,3,16,10,2,4,-1,16,10,1,2,2,17,12,1,2,2,.003547519911080599,-.0394249781966209,.5312618017196655,0,3,18,17,2,2,-1,18,17,1,1,2,19,18,1,1,2,.00021403690334409475,.0697538331151009,-.2731958031654358,0,2,9,17,1,2,-1,9,18,1,1,2,-.0005711946287192404,.3436990082263947,-.0576990097761154,0,2,8,4,9,6,-1,11,4,3,6,3,-.006629006937146187,.1175848990678787,-.1502013951539993,-1.088881015777588,66,0,2,6,9,9,10,-1,9,9,3,10,3,-.0265134498476982,.2056864053010941,-.2647390067577362,0,2,5,0,5,4,-1,5,2,5,2,2,.00977274589240551,-.111928403377533,.325705498456955,0,2,5,7,11,4,-1,5,9,11,2,2,.0322903506457806,-.0985747575759888,.3177917003631592,0,2,2,4,2,14,-1,3,4,1,14,2,-.00281032407656312,.1521389931440353,-.1968640983104706,0,2,8,6,3,5,-1,9,6,1,5,3,-.0109914299100637,.5140765905380249,-.0437072105705738,0,2,8,4,3,9,-1,9,4,1,9,3,.006313383113592863,-.0927810221910477,.3470247089862824,0,2,0,8,20,6,-1,0,10,20,2,3,.0871059820055962,.030053649097681,-.8281481862068176,0,2,14,16,6,1,-1,17,16,3,1,2,.0011799359926953912,-.1292842030525208,.2064612060785294,0,2,17,18,2,2,-1,17,19,2,1,2,-.0009305689018219709,-.5002143979072571,.0936669930815697,0,2,8,17,6,3,-1,10,17,2,3,3,-.0136871701106429,-.793581485748291,-.006673363968729973,0,2,4,1,9,15,-1,7,1,3,15,3,-.0759174525737762,.3046964108943939,-.0796558931469917,0,2,11,5,3,12,-1,12,5,1,12,3,-.0028559709899127483,.2096146047115326,-.1273255050182343,0,2,0,15,4,3,-1,0,16,4,1,3,-.004023151006549597,-.6581727862358093,.0506836399435997,0,2,0,0,15,1,-1,5,0,5,1,3,.0175580400973558,-.0853826925158501,.3617455959320068,0,2,6,0,6,4,-1,8,0,2,4,3,.0219882391393185,.062943696975708,-.7089633941650391,0,2,2,0,9,3,-1,5,0,3,3,3,-.002859958913177252,.1468378007411957,-.1646597981452942,0,2,13,6,3,7,-1,14,6,1,7,3,-.0100308498367667,.4957993924617767,-.0271883402019739,0,2,7,6,4,2,-1,7,7,4,1,2,-.006956032942980528,.2797777950763702,-.0779533311724663,0,2,6,18,6,1,-1,8,18,2,1,3,-.0038356808945536613,-.58163982629776,.0357399396598339,0,2,18,6,2,2,-1,18,7,2,1,2,-.0032647319603711367,-.4994508028030396,.0469864904880524,0,2,6,4,7,3,-1,6,5,7,1,3,-.007841235026717186,.34532830119133,-.0688104033470154,0,2,12,7,3,1,-1,13,7,1,1,3,-8171811350621283e-20,.1504171043634415,-.1414667963981628,0,3,15,1,2,10,-1,15,1,1,5,2,16,6,1,5,2,-.0032448628917336464,.227245107293129,-.0928602069616318,0,2,0,18,2,2,-1,0,19,2,1,2,-.0007856115116737783,-.4431901872158051,.0578124411404133,0,2,19,4,1,8,-1,19,8,1,4,2,-.0006247424753382802,.1395238935947418,-.1466871947050095,0,2,1,17,1,3,-1,1,18,1,1,3,-.0003294294874649495,-.2990157008171082,.0760667398571968,0,3,0,15,6,4,-1,0,15,3,2,2,3,17,3,2,2,.0012605739757418633,-.1612560003995895,.1395380049943924,0,2,19,0,1,18,-1,19,6,1,6,3,-.0516670197248459,-.5314283967018127,.0407195203006268,0,2,10,2,6,2,-1,12,2,2,2,3,-.0152856195345521,-.7820637822151184,.0271837692707777,0,2,2,8,12,2,-1,6,8,4,2,3,.0690298229455948,-.0364270210266113,.7110251784324646,0,2,16,0,4,1,-1,18,0,2,1,2,.001452274969778955,-.0968905165791512,.2166842073202133,0,2,8,4,2,6,-1,8,7,2,3,2,-.0024765590205788612,.1164531037211418,-.1822797954082489,0,2,14,5,2,10,-1,15,5,1,10,2,-.0015134819550439715,.1786397993564606,-.1221496984362602,0,2,13,4,2,2,-1,13,5,2,1,2,-.0015099470037966967,.1808623969554901,-.1144606992602348,0,2,11,1,3,6,-1,11,3,3,2,3,-.006705462001264095,.2510659992694855,-.0918714627623558,0,2,6,9,12,2,-1,10,9,4,2,3,-.014075200073421,.1370750963687897,-.173335000872612,0,2,9,16,4,2,-1,9,17,4,1,2,-.0022400720044970512,.4009298086166382,-.0475768782198429,0,2,5,14,15,4,-1,5,16,15,2,2,.0197823699563742,-.1904035061597824,.1492341011762619,0,2,18,16,2,2,-1,18,17,2,1,2,.002600287087261677,.0469717681407928,-.4330765902996063,0,3,16,18,2,2,-1,16,18,1,1,2,17,19,1,1,2,-.0005344562814570963,-.4374423027038574,.0415201894938946,0,2,6,4,3,8,-1,7,4,1,8,3,-.0174665097147226,.6581817269325256,-.0344474911689758,0,2,5,9,3,1,-1,6,9,1,1,3,-.00204255897551775,.3965792953968048,-.044052429497242,0,2,0,8,1,6,-1,0,10,1,2,3,.0026661779265850782,.0587709583342075,-.3280636966228485,0,2,11,2,9,6,-1,14,2,3,6,3,-.0559823699295521,-.5173547267913818,.0357918404042721,0,2,12,2,6,4,-1,14,2,2,4,3,-.0015066330088302493,.1512386947870255,-.1252018064260483,0,2,1,7,2,4,-1,1,9,2,2,2,-.0114723695442081,-.6293053030967712,.0347043313086033,0,2,13,1,6,4,-1,13,3,6,2,2,.0234096292406321,-.0580633506178856,.3866822123527527,0,3,4,10,2,10,-1,4,10,1,5,2,5,15,1,5,2,-.002324372995644808,.1875409930944443,-.0983946695923805,0,2,2,16,9,3,-1,5,16,3,3,3,-.0290392991155386,-.5448690056800842,.0409263409674168,0,2,1,2,3,9,-1,2,2,1,9,3,-.014474649913609,-.6724839210510254,.0231288503855467,0,2,19,7,1,4,-1,19,9,1,2,2,-.005208609160035849,-.4327144026756287,.0437806509435177,0,3,14,11,6,8,-1,14,11,3,4,2,17,15,3,4,2,.004938289988785982,-.1087862029671669,.1934258937835693,0,3,15,12,4,6,-1,15,12,2,3,2,17,15,2,3,2,-.004319393076002598,.2408093065023422,-.1038080006837845,0,3,16,15,2,2,-1,16,15,1,1,2,17,16,1,1,2,.0002370566944591701,-.087349072098732,.2046623975038528,0,3,17,16,2,2,-1,17,16,1,1,2,18,17,1,1,2,.0004785807977896184,.0456245802342892,-.3885467052459717,0,3,17,16,2,2,-1,17,16,1,1,2,18,17,1,1,2,-.0008534283842891455,-.550779402256012,.0358258895576,0,3,2,3,2,2,-1,2,3,1,1,2,3,4,1,1,2,5477212107507512e-20,-.1122523993253708,.1750351935625076,0,2,10,10,3,3,-1,11,10,1,3,3,-.0038445889949798584,.2452670037746429,-.0811325684189796,0,2,5,9,7,8,-1,5,13,7,4,2,-.0401284582912922,-.6312270760536194,.0269726701080799,0,3,7,16,2,2,-1,7,16,1,1,2,8,17,1,1,2,-.0001788636000128463,.1985509991645813,-.1033368036150932,0,3,7,16,2,2,-1,7,16,1,1,2,8,17,1,1,2,.00017668239888735116,-.0913590118288994,.1984872072935104,0,2,9,8,10,3,-1,14,8,5,3,2,.0727633833885193,.0500755794346333,-.3385263085365295,0,3,6,7,4,8,-1,6,7,2,4,2,8,11,2,4,2,.0101816300302744,-.0932299792766571,.2005959004163742,0,2,1,6,4,3,-1,1,7,4,1,3,.0024409969337284565,.0646366328001022,-.2692174017429352,0,2,6,10,6,10,-1,8,10,2,10,3,-.003622748889029026,.1316989064216614,-.1251484006643295,0,2,4,6,3,6,-1,5,6,1,6,3,-.0013635610230267048,.1635046005249023,-.106659397482872,-1.0408929586410522,69,0,3,3,10,4,4,-1,3,10,2,2,2,5,12,2,2,2,-.009699116460978985,.6112532019615173,-.0662253126502037,0,3,3,10,4,4,-1,3,10,2,2,2,5,12,2,2,2,-.009642653167247772,-1,.0027699959464371204,0,3,3,10,4,4,-1,3,10,2,2,2,5,12,2,2,2,-.009638186544179916,1,-.00029904270195402205,0,2,14,8,2,6,-1,15,8,1,6,2,-.004255393985658884,.2846438884735107,-.1554012000560761,0,3,3,10,4,4,-1,3,10,2,2,2,5,12,2,2,2,-.009622352197766304,-1,.0439991801977158,0,3,3,10,4,4,-1,3,10,2,2,2,5,12,2,2,2,-.009123124182224274,.8686934113502502,-.0027267890982329845,0,2,12,4,3,9,-1,13,4,1,9,3,-.008624043315649033,.4535248875617981,-.0860713794827461,0,2,12,3,1,12,-1,12,7,1,4,3,-.008932414464652538,.1337555944919586,-.2601251900196075,0,2,2,0,18,1,-1,8,0,6,1,3,-.0142078101634979,.3207764029502869,-.0972264111042023,0,3,10,0,10,6,-1,10,0,5,3,2,15,3,5,3,2,.0259110108017921,-.1296408027410507,.2621864974498749,0,2,18,16,2,2,-1,18,17,2,1,2,.00020531509653665125,-.1240428015589714,.2106295973062515,0,3,3,5,4,2,-1,3,5,2,1,2,5,6,2,1,2,-54795680625829846e-21,.1197429969906807,-.2320127934217453,0,2,11,8,3,3,-1,12,8,1,3,3,.006855519954115152,-.0632761269807816,.4104425013065338,0,2,11,7,3,5,-1,12,7,1,5,3,-.0122530404478312,.5488333106040955,-.0397311002016068,0,2,3,19,15,1,-1,8,19,5,1,3,-.0039058770053088665,.2419098019599915,-.0970960110425949,0,2,8,13,3,2,-1,8,14,3,1,2,.0027560980524867773,-.1256967931985855,.1945665031671524,0,3,2,12,8,4,-1,2,12,4,2,2,6,14,4,2,2,-.0077662160620093346,.2976570129394531,-.0968181565403938,0,3,16,16,2,2,-1,16,16,1,1,2,17,17,1,1,2,.00038997188676148653,.0621884018182755,-.4204089939594269,0,2,7,0,3,2,-1,8,0,1,2,3,.0033579880837351084,.0474981404840946,-.6321688294410706,0,2,6,7,2,5,-1,7,7,1,5,2,-.0167455393821001,.7109813094139099,-.0391573496162891,0,2,18,0,2,17,-1,19,0,1,17,2,-.0065409899689257145,-.3504317104816437,.0706169530749321,0,2,16,16,1,3,-1,16,17,1,1,3,.0003001634031534195,.091902457177639,-.2461867034435272,0,2,14,8,3,7,-1,15,8,1,7,3,.0149189904332161,-.0519094504415989,.5663604140281677,0,3,10,17,2,2,-1,10,17,1,1,2,11,18,1,1,2,.00048153079114854336,.064659558236599,-.3659060895442963,0,2,4,9,1,3,-1,4,10,1,1,3,-.00030211321427486837,.1792656928300858,-.1141066029667854,0,2,18,10,2,3,-1,18,11,2,1,3,.0003852141962852329,.1034561991691589,-.2007246017456055,0,2,12,1,3,10,-1,13,1,1,10,3,.008083713240921497,-.0660734623670578,.3028424978256226,0,2,8,12,9,1,-1,11,12,3,1,3,-.0228049699217081,.5296235084533691,-.0401189997792244,0,3,5,18,2,2,-1,5,18,1,1,2,6,19,1,1,2,.00019440450705587864,.0818548202514648,-.2466336041688919,0,2,19,6,1,9,-1,19,9,1,3,3,-.0128480903804302,-.3497331142425537,.0569162294268608,0,3,4,7,2,4,-1,4,7,1,2,2,5,9,1,2,2,-.001093729049898684,.2336868047714233,-.0916048064827919,0,2,1,4,6,14,-1,3,4,2,14,3,.0010032650316134095,.1185218021273613,-.1846919059753418,0,2,10,5,9,3,-1,13,5,3,3,3,-.0446884296834469,-.6436246037483215,.0303632691502571,0,2,18,7,2,6,-1,18,9,2,2,3,.00816575437784195,.0436746589839458,-.4300208985805512,0,2,5,6,2,7,-1,6,6,1,7,2,-.0117178102955222,.4178147912025452,-.0482336990535259,0,2,10,4,6,8,-1,13,4,3,8,2,.0842771306633949,.053461279720068,-.379521906375885,0,2,0,8,2,9,-1,0,11,2,3,3,.0142118399962783,.0449009388685226,-.4298149943351746,0,2,0,7,5,3,-1,0,8,5,1,3,.001502834027633071,.0822276398539543,-.2470639944076538,0,2,8,1,7,2,-1,8,2,7,1,2,.0100035797804594,-.057221669703722,.3460937142372131,0,2,7,5,3,5,-1,8,5,1,5,3,-.009070632047951221,.450580894947052,-.0427953191101551,0,2,19,2,1,2,-1,19,3,1,1,2,-.0003314162022434175,.1833691000938416,-.1075994968414307,0,2,6,7,10,11,-1,11,7,5,11,2,.19723279774189,-.030363829806447,.6642342805862427,0,2,9,19,6,1,-1,11,19,2,1,3,-.007125880103558302,-.8922504782676697,.0256699901074171,0,2,3,0,12,1,-1,7,0,4,1,3,.00869213417172432,-.0707643702626228,.2821052968502045,0,2,4,1,6,5,-1,6,1,2,5,3,.008926212787628174,.0710782334208488,-.3023256063461304,0,2,6,12,12,6,-1,10,12,4,6,3,.0572860091924667,.0509741306304932,-.3919695019721985,0,2,16,13,2,3,-1,16,14,2,1,3,.0037920880131423473,.0338419415056705,-.510162889957428,0,2,7,14,4,2,-1,7,15,4,1,2,-.0014508679741993546,.3087914884090424,-.063845083117485,0,2,7,14,2,2,-1,7,15,2,1,2,.00098390132188797,-.1302956938743591,.1460441052913666,0,3,3,10,2,4,-1,3,10,1,2,2,4,12,1,2,2,-.0017221809830516577,.2915700972080231,-.0685495585203171,0,2,0,3,2,6,-1,0,5,2,2,3,.0109482500702143,.0343514084815979,-.4770225882530212,0,3,1,10,2,2,-1,1,10,1,1,2,2,11,1,1,2,-1717630948405713e-20,.1605526953935623,-.1169084012508392,0,2,16,4,4,3,-1,16,5,4,1,3,-.005488420836627483,-.4341588914394379,.0461062416434288,0,3,5,10,2,4,-1,5,10,1,2,2,6,12,1,2,2,-.0030975250992923975,.3794333934783936,-.05686055123806,0,2,5,11,13,2,-1,5,12,13,1,2,.006418208125978708,-.1585821062326431,.1233541965484619,0,2,10,2,3,11,-1,11,2,1,11,3,.0118312397971749,-.0409292913973331,.458789587020874,0,2,10,2,4,4,-1,10,4,4,2,2,.013540499843657,-.0537255592644215,.3505612015724182,0,2,8,8,6,2,-1,10,8,2,2,3,-.002593215089291334,.1101052016019821,-.1675221025943756,0,2,11,2,3,3,-1,12,2,1,3,3,.0016856270376592875,.0665743574500084,-.3083502054214478,0,3,6,18,14,2,-1,6,18,7,1,2,13,19,7,1,2,.002652469091117382,.0663184821605682,-.2786133885383606,0,2,17,7,1,12,-1,17,11,1,4,3,-.007734172977507114,.1971835941076279,-.1078291982412338,0,2,10,5,10,3,-1,10,6,10,1,3,.005094427149742842,.0853374898433685,-.2484700977802277,0,2,6,1,3,3,-1,7,1,1,3,3,-.0029162371065467596,-.4747635126113892,.033566489815712,0,2,13,8,3,1,-1,14,8,1,1,3,.0030121419113129377,-.0475753806531429,.4258680045604706,0,2,10,14,2,6,-1,10,16,2,2,3,.0031694869976490736,-.1051945015788078,.1716345995664597,0,2,4,1,12,14,-1,8,1,4,14,3,.2232756018638611,-.0143702095374465,.9248365163803101,0,2,14,1,6,14,-1,16,1,2,14,3,-.0955850481987,-.7420663833618164,.0278189703822136,0,3,3,16,2,2,-1,3,16,1,1,2,4,17,1,1,2,3477372956695035e-20,-.1276578009128571,.129266694188118,0,2,0,16,2,2,-1,0,17,2,1,2,7245977030834183e-20,-.1651857942342758,.1003680974245071,-1.0566600561141968,59,0,3,15,6,4,6,-1,15,6,2,3,2,17,9,2,3,2,-.006577827036380768,.3381525874137878,-.1528190970420837,0,2,12,5,2,2,-1,12,6,2,1,2,-.0010922809597104788,.2228236943483353,-.1930849999189377,0,2,7,6,6,13,-1,9,6,2,13,3,-.0297595895826817,.2595987021923065,-.1540940999984741,0,2,1,9,6,5,-1,3,9,2,5,3,-.0131475403904915,.1903381049633026,-.1654399931430817,0,2,0,5,3,4,-1,0,7,3,2,2,-.0014396329643204808,.200717106461525,-.1233894005417824,0,3,4,1,16,2,-1,4,1,8,1,2,12,2,8,1,2,-.0035928250290453434,.2398552000522614,-.129221498966217,0,3,1,18,4,2,-1,1,18,2,1,2,3,19,2,1,2,-.0015314699849113822,-.4901489913463593,.102750301361084,0,2,7,7,3,4,-1,8,7,1,4,3,-.0062372139655053616,.31214639544487,-.114056296646595,0,2,3,4,9,3,-1,6,4,3,3,3,-.033364649862051,-.4952087998390198,.0513284504413605,0,2,4,6,6,10,-1,6,6,2,10,3,-.0228276997804642,.3255882859230042,-.0650893077254295,0,2,9,0,8,10,-1,13,0,4,10,2,-.0861990973353386,-.6764633059501648,.0269856993108988,0,2,8,0,8,1,-1,12,0,4,1,2,-.002106598112732172,.2245243042707443,-.1261022984981537,0,3,6,2,8,16,-1,6,2,4,8,2,10,10,4,8,2,.0391201488673687,.1132939979434013,-.2686063051223755,0,3,14,10,2,10,-1,14,10,1,5,2,15,15,1,5,2,.0035082739777863026,-.1135995984077454,.2564977109432221,0,2,12,11,1,2,-1,12,12,1,1,2,.0005928989849053323,-.1494296938180924,.164098396897316,0,2,16,0,3,8,-1,17,0,1,8,3,.0007176685030572116,.0999056920409203,-.2196796983480454,0,2,14,0,6,10,-1,17,0,3,10,2,-.0218036007136106,-.3171172142028809,.082889586687088,0,2,16,0,3,5,-1,17,0,1,5,3,-.003296277951449156,-.3804872930049896,.0608193799853325,0,2,4,5,11,2,-1,4,6,11,1,2,.0024196270387619734,-.0960130169987679,.2854058146476746,0,2,1,0,2,1,-1,2,0,1,1,2,-.00044187481398694217,.2212793976068497,-.0974349081516266,0,2,0,0,2,3,-1,0,1,2,1,3,.0034523929934948683,.0375531204044819,-.5796905159950256,0,2,11,6,6,11,-1,13,6,2,11,3,-.0218346007168293,.295621395111084,-.0800483003258705,0,2,14,0,3,1,-1,15,0,1,1,3,-.00021309500152710825,.2281450927257538,-.1011418998241425,0,2,19,7,1,2,-1,19,8,1,1,2,-.0016166249988600612,-.5054119825363159,.0447645410895348,0,2,17,0,3,9,-1,18,0,1,9,3,.007595960982143879,.0459865406155586,-.4119768142700195,0,2,12,7,3,4,-1,13,7,1,4,3,.003860180964693427,-.0865631699562073,.2480999976396561,0,3,0,1,14,2,-1,0,1,7,1,2,7,2,7,1,2,.006062223110347986,-.0755573734641075,.2843326032161713,0,2,3,1,3,2,-1,4,1,1,2,3,-.0017097420059144497,-.3529582023620606,.0584104992449284,0,2,4,0,15,2,-1,9,0,5,2,3,.0165155790746212,-.0804869532585144,.2353743016719818,0,2,10,2,6,1,-1,12,2,2,1,3,.004846510011702776,.041895218193531,-.4844304919242859,0,2,9,4,6,11,-1,11,4,2,11,3,-.0311671700328588,.1919230967760086,-.1026815995573998,0,2,2,16,2,4,-1,2,18,2,2,2,.0006189228151924908,-.210857704281807,.0938869267702103,0,2,6,17,6,3,-1,8,17,2,3,3,.0119463102892041,.0390961691737175,-.6224862933158875,0,2,7,9,6,2,-1,9,9,2,2,3,-.0075677200220525265,.1593683958053589,-.1225078031420708,0,2,6,8,9,2,-1,9,8,3,2,3,-.0537474118173122,-.5562217831611633,.0411900095641613,0,3,6,6,2,10,-1,6,6,1,5,2,7,11,1,5,2,.0155135300010443,-.0398268811404705,.6240072846412659,0,2,0,11,2,3,-1,0,12,2,1,3,.0015246650436893106,.0701386779546738,-.3078907132148743,0,2,11,15,4,1,-1,13,15,2,1,2,-.0004831510013900697,.178876593708992,-.109586201608181,0,2,6,17,1,2,-1,6,18,1,1,2,.0027374739293009043,.0274785906076431,-.8848956823348999,0,2,0,0,6,20,-1,2,0,2,20,3,-.0657877177000046,-.4643214046955109,.0350371487438679,0,2,3,10,2,2,-1,4,10,1,2,2,.0012409730115905404,-.0964792370796204,.2877922058105469,0,2,4,7,3,5,-1,5,7,1,5,3,.0008139880956150591,.1151171997189522,-.1676616072654724,0,2,3,12,6,2,-1,5,12,2,2,3,.0239018201828003,-.0326031893491745,.6001734733581543,0,2,6,15,7,4,-1,6,17,7,2,2,.0275566000491381,-.0661373436450958,.2999447882175446,0,3,17,16,2,2,-1,17,16,1,1,2,18,17,1,1,2,-.00038070970913395286,-.3388118147850037,.0644507706165314,0,2,15,1,3,16,-1,16,1,1,16,3,-.0013335429830476642,.1458866000175476,-.1321762055158615,0,2,6,16,6,3,-1,8,16,2,3,3,-.009350799024105072,-.5117782950401306,.0349694713950157,0,2,15,14,3,2,-1,15,15,3,1,2,.00762152299284935,.0232495293021202,-.6961941123008728,0,2,12,16,1,2,-1,12,17,1,1,2,-5340786083252169e-20,.2372737973928452,-.0869107097387314,0,3,0,2,4,4,-1,0,2,2,2,2,2,4,2,2,2,-.0015332329785451293,.192284107208252,-.1042239964008331,0,3,1,1,6,4,-1,1,1,3,2,2,4,3,3,2,2,.004313589073717594,-.0962195470929146,.2560121119022369,0,2,1,18,1,2,-1,1,19,1,1,2,-.000230428806389682,-.3156475126743317,.0588385984301567,0,2,4,7,2,3,-1,4,8,2,1,3,-.007841182872653008,-.6634092926979065,.0245009995996952,0,2,1,0,9,14,-1,1,7,9,7,2,.1710374057292938,.033831499516964,-.4561594128608704,0,3,4,9,2,6,-1,4,9,1,3,2,5,12,1,3,2,-.001601114054210484,.2157489061355591,-.0836225301027298,0,2,3,9,4,3,-1,5,9,2,3,2,-.0105357803404331,.2455231994390488,-.0823844894766808,0,2,0,9,2,4,-1,0,11,2,2,2,-.005835163872689009,-.4780732989311218,.0440862216055393,0,2,16,6,3,10,-1,17,6,1,10,3,-.0187061093747616,-.6002402901649475,.0214100405573845,0,2,16,11,2,1,-1,17,11,1,1,2,-.0009330743923783302,.2432359009981155,-.0741657167673111,-.9769343137741089,88,0,2,5,7,4,4,-1,5,9,4,2,2,.0106462296098471,-.1386138945817947,.2649407088756561,0,2,10,11,9,2,-1,13,11,3,2,3,.0352982692420483,-.075821727514267,.3902106881141663,0,3,15,10,2,2,-1,15,10,1,1,2,16,11,1,1,2,.0007563838735222816,-.095521442592144,.2906199991703033,0,2,10,6,6,14,-1,10,13,6,7,2,.092497706413269,-.2770423889160156,.0794747024774551,0,2,14,7,3,5,-1,15,7,1,5,3,-.002934087999165058,.2298953980207443,-.0785500109195709,0,2,6,11,12,3,-1,10,11,4,3,3,-.0865358486771584,.4774481058120728,-.006823122035712004,0,2,17,16,1,2,-1,17,17,1,1,2,54699288739357144e-21,-.2264260947704315,.0881921127438545,0,2,8,5,5,4,-1,8,7,5,2,2,-.0365925207734108,.2735387086868286,-.0986067429184914,0,2,11,6,4,2,-1,11,7,4,1,2,.0026469118893146515,-.0440839789807796,.3144528865814209,0,3,3,4,8,2,-1,3,4,4,1,2,7,5,4,1,2,-.004427181091159582,.2382272928953171,-.0867842733860016,0,2,0,8,6,6,-1,2,8,2,6,3,-.005188248120248318,.1504276990890503,-.1267210990190506,0,2,7,4,6,2,-1,7,5,6,1,2,.004553040023893118,-.0559450201690197,.3650163114070892,0,2,7,3,6,3,-1,9,3,2,3,3,.0145624103024602,.0363977700471878,-.5355919003486633,0,2,2,17,3,3,-1,2,18,3,1,3,6867756746942177e-20,-.1747962981462479,.1106870993971825,0,2,3,10,6,1,-1,5,10,2,1,3,-.005974490195512772,.3107787072658539,-.0665302276611328,0,2,7,2,6,2,-1,9,2,2,2,3,-.0058691250160336494,-.3190149068832398,.063931830227375,0,2,4,11,9,1,-1,7,11,3,1,3,-.0111403102055192,.2436479032039642,-.0809351801872253,0,2,7,7,11,12,-1,7,13,11,6,2,-.0586435310542583,-.7608326077461243,.0308096297085285,0,2,3,2,3,4,-1,4,2,1,4,3,-.0046097282320261,-.45315021276474,.0298790596425533,0,2,9,7,9,3,-1,12,7,3,3,3,-.00930321030318737,.1451337933540344,-.1103316992521286,0,3,15,11,2,6,-1,15,11,1,3,2,16,14,1,3,2,.0013253629440441728,-.0976989567279816,.196464404463768,0,2,0,5,5,3,-1,0,6,5,1,3,.004980076104402542,.0336480811238289,-.3979220986366272,0,2,8,1,6,12,-1,10,1,2,12,3,-.007654216140508652,.090841993689537,-.1596754938364029,0,2,3,7,15,13,-1,8,7,5,13,3,-.3892059028148651,-.6657109260559082,.0190288294106722,0,2,0,9,9,9,-1,0,12,9,3,3,-.1001966968178749,-.5755926966667175,.0242827795445919,0,2,16,0,3,8,-1,17,0,1,8,3,.0007354121189564466,.0879198014736176,-.161953404545784,0,2,16,2,4,2,-1,18,2,2,2,2,-.0034802639856934547,.2606449127197266,-.0602008104324341,0,2,13,0,6,5,-1,16,0,3,5,2,.008400042541325092,-.1097972989082336,.1570730954408646,0,2,15,1,3,2,-1,16,1,1,2,3,.0023786011151969433,.0360582396388054,-.4727719128131867,0,2,11,8,3,2,-1,12,8,1,2,3,.007383168209344149,-.0357563607394695,.4949859082698822,0,3,1,8,2,12,-1,1,8,1,6,2,2,14,1,6,2,.003211562056094408,-.1012556031346321,.1574798971414566,0,2,0,1,6,12,-1,2,1,2,12,3,-.0782096683979034,-.7662708163261414,.0229658298194408,0,2,19,17,1,3,-1,19,18,1,1,3,5330398926162161e-20,-.1341435015201569,.1111491993069649,0,2,11,3,3,10,-1,12,3,1,10,3,-.009641915559768677,.2506802976131439,-.0666081383824348,0,2,8,1,9,8,-1,11,1,3,8,3,-.0710926726460457,-.4005681872367859,.0402977913618088,0,3,18,16,2,2,-1,18,16,1,1,2,19,17,1,1,2,.00035171560011804104,.041861180216074,-.3296119868755341,0,3,18,16,2,2,-1,18,16,1,1,2,19,17,1,1,2,-.0003345815057400614,-.2602983117103577,.0678927376866341,0,2,6,13,2,6,-1,6,15,2,2,3,-.0041451421566307545,.2396769970655441,-.0720933377742767,0,2,9,14,2,2,-1,9,15,2,1,2,.003175450023263693,-.0712352693080902,.241284504532814,0,3,14,10,2,4,-1,14,10,1,2,2,15,12,1,2,2,-.005518449004739523,.5032023787498474,-.0296866800636053,0,3,0,15,2,2,-1,0,15,1,1,2,1,16,1,1,2,-.00030242869979701936,.2487905025482178,-.0567585788667202,0,3,6,7,2,2,-1,6,7,1,1,2,7,8,1,1,2,-.0013125919504091144,.3174780011177063,-.0418458618223667,0,3,11,18,2,2,-1,11,18,1,1,2,12,19,1,1,2,-.00027123570907860994,-.2704207003116608,.0568289905786514,0,3,0,0,6,4,-1,0,0,3,2,2,3,2,3,2,2,-.007324177771806717,.2755667865276337,-.0542529709637165,0,2,4,1,6,6,-1,6,1,2,6,3,-.0168517101556063,-.3485291004180908,.0453689992427826,0,2,15,13,5,4,-1,15,15,5,2,2,.0299021005630493,.0316210798919201,-.4311437010765076,0,2,7,17,6,1,-1,9,17,2,1,3,.0028902660124003887,.0380299612879753,-.3702709972858429,0,2,16,19,4,1,-1,18,19,2,1,2,-.0019242949783802032,.2480027973651886,-.059333298355341,0,2,16,16,4,4,-1,18,16,2,4,2,.004935414995998144,-.0830684006214142,.2204380929470062,0,2,7,8,9,4,-1,10,8,3,4,3,.0820756033062935,-.0194134395569563,.6908928751945496,0,3,16,18,2,2,-1,16,18,1,1,2,17,19,1,1,2,-.0002469948958605528,-.2466056942939758,.0647764503955841,0,3,2,9,2,4,-1,2,9,1,2,2,3,11,1,2,2,-.0018365769647061825,.2883616089820862,-.0533904582262039,0,3,0,3,8,4,-1,0,3,4,2,2,4,5,4,2,2,-.004955381155014038,.1274082958698273,-.1255941987037659,0,2,0,1,8,1,-1,4,1,4,1,2,-.008308662101626396,.2347811013460159,-.07167649269104,0,2,0,5,8,9,-1,4,5,4,9,2,-.1087991967797279,-.2599223852157593,.0586897395551205,0,2,7,18,6,2,-1,9,18,2,2,3,-.009678645059466362,-.707204282283783,.0187492594122887,0,2,0,4,1,12,-1,0,8,1,4,3,-.0271368306130171,-.5838422775268555,.021684130653739,0,2,19,13,1,6,-1,19,15,1,2,3,-.006538977846503258,-.5974891185760498,.0214803107082844,0,2,2,8,6,8,-1,4,8,2,8,3,-.0120956301689148,.1326903998851776,-.099722720682621,0,2,0,0,9,17,-1,3,0,3,17,3,-.1677609980106354,-.5665506720542908,.0321230888366699,0,2,7,9,6,8,-1,9,9,2,8,3,-.0132625503465533,.1149559020996094,-.1173838973045349,0,2,5,10,9,4,-1,8,10,3,4,3,.076744519174099,-.0314132310450077,.5993549227714539,0,2,5,0,8,3,-1,5,1,8,1,3,.005078522954136133,-.0529119409620762,.2334239929914475,0,3,16,6,4,4,-1,16,6,2,2,2,18,8,2,2,2,.0031800279393792152,-.0777343884110451,.1765290945768356,0,3,17,4,2,8,-1,17,4,1,4,2,18,8,1,4,2,-.0017729829996824265,.1959162950515747,-.0797521993517876,0,2,2,16,1,3,-1,2,17,1,1,3,-.00048560940194875,-.2880037128925324,.0490471199154854,0,2,2,16,1,3,-1,2,17,1,1,3,.00036554320831783116,.0679228976368904,-.2249943017959595,0,2,11,0,1,3,-1,11,1,1,1,3,-.0002693867136258632,.1658217012882233,-.0897440984845161,0,2,11,2,9,7,-1,14,2,3,7,3,.0786842331290245,.0260816793888807,-.5569373965263367,0,2,10,2,3,6,-1,11,2,1,6,3,-.0007377481088042259,.1403687000274658,-.1180030032992363,0,2,5,9,15,2,-1,5,10,15,1,2,.0239578299224377,.0304707400500774,-.4615997970104218,0,2,8,16,6,2,-1,8,17,6,1,2,-.001623908057808876,.2632707953453064,-.0567653700709343,0,3,9,16,10,2,-1,9,16,5,1,2,14,17,5,1,2,-.0009081974858418107,.1546245962381363,-.1108706966042519,0,3,9,17,2,2,-1,9,17,1,1,2,10,18,1,1,2,.0003980624896939844,.0556303709745407,-.2833195924758911,0,3,10,15,6,4,-1,10,15,3,2,2,13,17,3,2,2,.002050644950941205,-.0916048362851143,.1758553981781006,0,2,4,5,15,12,-1,9,5,5,12,3,.0267425496131182,.062003031373024,-.2448700070381165,0,2,11,13,2,3,-1,11,14,2,1,3,-.0021497008856385946,.2944929897785187,-.0532181486487389,0,2,8,13,7,3,-1,8,14,7,1,3,.005667165853083134,-.0642982423305511,.249056801199913,0,2,1,12,1,2,-1,1,13,1,1,2,6831790233263746e-20,-.1681963056325913,.0965485796332359,0,3,16,18,2,2,-1,16,18,1,1,2,17,19,1,1,2,.0001760043960530311,.0653080120682716,-.2426788061857224,0,2,1,19,18,1,-1,7,19,6,1,3,.004186160862445831,-.0979885831475258,.1805288940668106,0,2,1,17,6,1,-1,4,17,3,1,2,-.0021808340679854155,.192312702536583,-.0941239297389984,0,2,1,3,1,12,-1,1,9,1,6,2,.021730400621891,.0355785116553307,-.4508853852748871,0,2,0,9,3,6,-1,0,11,3,2,3,-.0147802699357271,-.4392701089382172,.0317355915904045,0,2,5,4,3,10,-1,6,4,1,10,3,-.0036145891062915325,.1981147974729538,-.0777014195919037,0,2,6,17,2,1,-1,7,17,1,1,2,.0018892709631472826,.0199624393135309,-.7204172015190125,0,2,1,0,6,12,-1,3,0,2,12,3,-.0013822480104863644,.0984669476747513,-.1488108038902283,0,2,4,7,9,2,-1,7,7,3,2,3,-.0039505911991000175,.1159323006868362,-.1279197037220001,-1.012935996055603,58,0,2,6,11,9,1,-1,9,11,3,1,3,-.0193955395370722,.474747508764267,-.1172109022736549,0,2,17,10,2,10,-1,17,15,2,5,2,.013118919916451,-.255521297454834,.1637880057096481,0,3,4,10,2,10,-1,4,10,1,5,2,5,15,1,5,2,-.0005160680157132447,.1945261955261231,-.17448890209198,0,2,12,3,3,12,-1,13,3,1,12,3,-.0131841599941254,.441814512014389,-.0900487527251244,0,3,15,3,4,6,-1,15,3,2,3,2,17,6,2,3,2,.0034657081123441458,-.1347709000110626,.1805634051561356,0,2,12,8,3,3,-1,13,8,1,3,3,.006298020016402006,-.0541649796068668,.3603338003158569,0,2,4,14,2,4,-1,4,16,2,2,2,.0016879989998415112,-.1999794989824295,.1202159970998764,0,2,6,16,1,3,-1,6,17,1,1,3,.00036039709812030196,.1052414029836655,-.2411606013774872,0,2,1,1,2,3,-1,2,1,1,3,2,-.001527684973552823,.2813552916049957,-.0689648166298866,0,2,0,2,4,1,-1,2,2,2,1,2,.00350335706025362,-.0825195834040642,.4071359038352966,0,2,8,17,12,3,-1,12,17,4,3,3,-.004733716137707233,.1972700953483582,-.117101401090622,0,2,9,16,6,4,-1,11,16,2,4,3,-.0115571497008204,-.5606111288070679,.0681709572672844,0,2,4,6,3,6,-1,4,9,3,3,2,-.0274457205086946,.4971862137317658,-.0623801499605179,0,2,6,2,12,9,-1,6,5,12,3,3,-.0528257787227631,.169212207198143,-.1309355050325394,0,3,6,0,14,20,-1,6,0,7,10,2,13,10,7,10,2,-.2984969913959503,-.6464967131614685,.0400768183171749,0,3,15,16,2,2,-1,15,16,1,1,2,16,17,1,1,2,-.00026307269581593573,.2512794137001038,-.0894948393106461,0,3,15,16,2,2,-1,15,16,1,1,2,16,17,1,1,2,.00023261709429789335,-.0868439897894859,.2383197993040085,0,2,19,8,1,3,-1,19,9,1,1,3,.00023631360090803355,.1155446022748947,-.189363494515419,0,2,13,4,1,2,-1,13,5,1,1,2,.0020742209162563086,-.0485948510468006,.5748599171638489,0,2,0,4,4,2,-1,0,5,4,1,2,-.007030888926237822,-.5412080883979797,.0487437509000301,0,2,19,5,1,6,-1,19,7,1,2,3,.00826522707939148,.0264945197850466,-.6172845959663391,0,2,16,0,2,1,-1,17,0,1,1,2,.0002004276029765606,-.1176863014698029,.1633386015892029,0,2,13,1,1,3,-1,13,2,1,1,3,.0016470040427520871,-.0599549189209938,.3517970144748688,0,2,17,17,1,3,-1,17,18,1,1,3,-.0003564253856893629,-.344202995300293,.0649482533335686,0,3,5,4,8,8,-1,5,4,4,4,2,9,8,4,4,2,-.0309358704835176,.1997970044612885,-.0976936966180801,0,3,1,2,2,2,-1,1,2,1,1,2,2,3,1,1,2,-.0006357877282425761,-.3148139119148254,.0594250410795212,0,3,0,0,8,6,-1,0,0,4,3,2,4,3,4,3,2,-.0118621801957488,.2004369050264359,-.0894475430250168,0,2,6,3,4,2,-1,6,4,4,1,2,.007150893099606037,-.0390060618519783,.5332716107368469,0,2,1,0,3,3,-1,1,1,3,1,3,-.0020059191156178713,-.2846972048282623,.0707236081361771,0,2,6,1,7,2,-1,6,2,7,1,2,.0036412389017641544,-.1066031977534294,.2494480013847351,0,2,2,6,12,6,-1,6,6,4,6,3,-.1346742957830429,.4991008043289185,-.0403322204947472,0,2,1,16,9,2,-1,4,16,3,2,3,-.002254765946418047,.1685169041156769,-.1111928001046181,0,2,7,15,6,4,-1,9,15,2,4,3,.004384228959679604,.0861394926905632,-.2743177115917206,0,2,6,15,12,1,-1,12,15,6,1,2,-.007336116861552,.2487521022558212,-.0959191620349884,0,2,17,17,1,3,-1,17,18,1,1,3,.0006466691265814006,.0674315765500069,-.3375408053398132,0,3,17,15,2,2,-1,17,15,1,1,2,18,16,1,1,2,.0002298376930411905,-.0839030519127846,.24584099650383,0,2,3,13,3,3,-1,3,14,3,1,3,.006703907158225775,.0290793292224407,-.6905593872070312,0,2,10,17,1,3,-1,10,18,1,1,3,5073488864582032e-20,-.1569671928882599,.1196542978286743,0,2,4,0,14,8,-1,11,0,7,8,2,-.2033555954694748,-.6950634717941284,.0275075193494558,0,2,2,0,12,2,-1,6,0,4,2,3,.009493941441178322,-.0874493718147278,.2396833002567291,0,2,2,0,4,3,-1,4,0,2,3,2,-.002405524021014571,.2115096002817154,-.1314893066883087,0,2,13,1,1,2,-1,13,2,1,1,2,-.00011342419747961685,.1523378938436508,-.1272590011358261,0,2,7,5,3,6,-1,8,5,1,6,3,.0149922100827098,-.0341279692947865,.506240725517273,0,3,18,2,2,2,-1,18,2,1,1,2,19,3,1,1,2,.0007406820077449083,.0487647503614426,-.4022532105445862,0,2,15,1,2,14,-1,16,1,1,14,2,-.004245944786816835,.2155476063489914,-.0871269926428795,0,3,15,6,2,2,-1,15,6,1,1,2,16,7,1,1,2,.0006865510949864984,-.0754187181591988,.2640590965747833,0,2,3,1,6,3,-1,5,1,2,3,3,-.0167514607310295,-.6772903203964233,.0329187288880348,0,3,7,16,2,2,-1,7,16,1,1,2,8,17,1,1,2,-.00026301678735762835,.2272586971521378,-.0905348733067513,0,3,5,17,2,2,-1,5,17,1,1,2,6,18,1,1,2,.0004339861043263227,.0558943785727024,-.3559266924858093,0,2,9,10,6,10,-1,11,10,2,10,3,-.0201501492410898,.1916276067495346,-.0949299708008766,0,2,10,17,6,3,-1,12,17,2,3,3,-.0144521296024323,-.6851034164428711,.0254221707582474,0,2,14,5,2,10,-1,14,10,2,5,2,-.0211497396230698,.3753319084644318,-.0514965802431107,0,2,11,12,6,2,-1,11,13,6,1,2,.0211377702653408,.0290830805897713,-.8943036794662476,0,2,8,1,1,3,-1,8,2,1,1,3,.0011524349683895707,-.0696949362754822,.2729980051517487,0,3,12,15,2,2,-1,12,15,1,1,2,13,16,1,1,2,-.00019070580310653895,.1822811961174011,-.0983670726418495,0,3,6,8,6,4,-1,6,8,3,2,2,9,10,3,2,2,-.0363496318459511,-.8369309902191162,.0250557605177164,0,2,7,5,3,5,-1,8,5,1,5,3,-.009063207544386387,.4146350026130676,-.0544134490191936,0,2,0,5,7,3,-1,0,6,7,1,3,-.0020535490475594997,-.1975031048059464,.1050689965486527,-.9774749279022217,93,0,2,7,9,6,6,-1,9,9,2,6,3,-.0227170195430517,.2428855001926422,-.1474552005529404,0,2,5,7,8,8,-1,5,11,8,4,2,.0255059506744146,-.2855173945426941,.1083720996975899,0,3,4,9,2,6,-1,4,9,1,3,2,5,12,1,3,2,-.0026640091091394424,.2927573025226593,-.1037271022796631,0,2,10,11,6,1,-1,12,11,2,1,3,-.003811528906226158,.2142689973115921,-.1381113976240158,0,2,13,6,6,11,-1,15,6,2,11,3,-.0167326908558607,.2655026018619537,-.0439113304018974,0,3,8,17,2,2,-1,8,17,1,1,2,9,18,1,1,2,.0004927701083943248,.02110455930233,-.4297136068344116,0,2,4,12,12,1,-1,8,12,4,1,3,-.0366911105811596,.5399242043495178,-.0436488017439842,0,2,11,17,3,2,-1,11,18,3,1,2,.0012615970335900784,-.1293386965990067,.1663877069950104,0,2,8,17,6,1,-1,10,17,2,1,3,-.008410685695707798,-.9469841122627258,.0214658491313457,0,2,4,1,14,6,-1,4,3,14,2,3,.0649027228355408,-.0717277601361275,.2661347985267639,0,2,14,2,2,12,-1,14,8,2,6,2,.0303050000220537,-.0827824920415878,.2769432067871094,0,2,12,13,3,2,-1,12,14,3,1,2,.0025875340215861797,-.1296616941690445,.1775663048028946,0,2,6,1,6,1,-1,8,1,2,1,3,-.00702404510229826,-.6424317955970764,.0399432107806206,0,2,10,6,6,1,-1,12,6,2,1,3,-.0010099769569933414,.1417661011219025,-.1165997013449669,0,2,3,19,2,1,-1,4,19,1,1,2,-4117907155887224e-20,.1568766981363297,-.1112734004855156,0,3,18,16,2,2,-1,18,16,1,1,2,19,17,1,1,2,-.0004729315114673227,-.3355455994606018,.0459777303040028,0,2,16,11,3,7,-1,17,11,1,7,3,-.0017178079579025507,.1695290952920914,-.1057806983590126,0,2,19,5,1,6,-1,19,8,1,3,2,-.0133331697434187,-.5825781226158142,.0309784300625324,0,2,9,8,4,3,-1,9,9,4,1,3,-.0018783430568873882,.1426687985658646,-.111312597990036,0,3,16,8,4,4,-1,16,8,2,2,2,18,10,2,2,2,-.006576598156243563,.2756136059761047,-.0531003288924694,0,3,2,8,2,2,-1,2,8,1,1,2,3,9,1,1,2,-7721038127783686e-20,.1324024051427841,-.111677996814251,0,3,3,5,6,4,-1,3,5,3,2,2,6,7,3,2,2,.0219685398042202,-.0269681606441736,.5006716847419739,0,3,2,3,8,16,-1,2,3,4,8,2,6,11,4,8,2,-.027445750311017,-.240867406129837,.0604782700538635,0,2,17,17,1,3,-1,17,18,1,1,3,7830584945622832e-20,-.1333488970994949,.1012346968054771,0,2,7,2,8,11,-1,11,2,4,11,2,.0701906830072403,-.0548637807369232,.2480994015932083,0,2,13,3,6,14,-1,16,3,3,14,2,-.0719021335244179,-.3784669041633606,.0422109998762608,0,2,0,9,18,2,-1,6,9,6,2,3,-.1078097969293594,-.3748658895492554,.0428334400057793,0,2,6,10,14,3,-1,6,11,14,1,3,.0014364200178533792,.0804763585329056,-.1726378947496414,0,2,10,9,9,3,-1,13,9,3,3,3,.068289190530777,-.0355957895517349,.4076131880283356,0,3,3,5,4,6,-1,3,5,2,3,2,5,8,2,3,2,-.00680371792986989,.1923379004001617,-.0823680236935616,0,2,3,7,3,7,-1,4,7,1,7,3,-.0005619348958134651,.1305712014436722,-.1435514986515045,0,2,2,8,11,6,-1,2,10,11,2,3,-.0582766495645046,-.3012543916702271,.0528196506202221,0,2,8,9,6,3,-1,8,10,6,1,3,-.006120571866631508,.2204390019178391,-.0756917521357536,0,2,3,3,3,11,-1,4,3,1,11,3,-.0135943097993732,-.3904936015605927,.0418571084737778,0,2,0,19,6,1,-1,3,19,3,1,2,.0013626200379803777,-.0953634232282639,.1497032046318054,0,2,18,18,1,2,-1,18,19,1,1,2,-.0001507421984570101,-.2394558042287827,.0647983327507973,0,3,8,0,12,6,-1,8,0,6,3,2,14,3,6,3,2,-.077414259314537,.5594198107719421,-.0245168805122375,0,2,19,5,1,3,-1,19,6,1,1,3,.0009211787255480886,.0549288615584373,-.2793481051921845,0,2,5,8,2,1,-1,6,8,1,1,2,.001025078003294766,-.0621673092246056,.249763697385788,0,2,13,11,2,1,-1,14,11,1,1,2,-.000811747508123517,.2343793958425522,-.0657258108258247,0,2,3,6,15,13,-1,8,6,5,13,3,.0834310203790665,.0509548000991344,-.3102098107337952,0,2,4,3,6,2,-1,6,3,2,2,3,-.009201445616781712,-.3924253880977631,.0329269506037235,0,2,0,18,1,2,-1,0,19,1,1,2,-.00029086650465615094,-.3103975057601929,.0497118197381496,0,2,7,8,2,6,-1,8,8,1,6,2,.00775768980383873,-.0440407507121563,.3643135130405426,0,2,3,0,6,19,-1,5,0,2,19,3,-.1246609017252922,-.819570779800415,.0191506408154964,0,2,3,1,6,5,-1,5,1,2,5,3,.0132425501942635,.0389888398349285,-.3323068022727966,0,2,17,14,3,6,-1,17,16,3,2,3,-.006677012890577316,-.357901394367218,.0404602102935314,0,2,17,13,2,6,-1,18,13,1,6,2,-.0027479929849505424,.2525390088558197,-.0564278215169907,0,2,17,18,2,2,-1,18,18,1,2,2,.0008265965152531862,-.07198865711689,.2278047949075699,0,2,11,14,9,4,-1,14,14,3,4,3,-.0501534007489681,-.630364716053009,.027462050318718,0,3,15,8,4,6,-1,15,8,2,3,2,17,11,2,3,2,.007420314941555262,-.0666107162833214,.2778733968734741,0,2,1,16,1,3,-1,1,17,1,1,3,-.0006795178051106632,-.3632706105709076,.0427954308688641,0,2,7,0,3,14,-1,8,0,1,14,3,-.0019305750029161572,.1419623047113419,-.1075998023152351,0,2,12,0,2,1,-1,13,0,1,1,2,-.0003813267103396356,.2159176021814346,-.0702026635408401,0,2,7,9,6,5,-1,10,9,3,5,2,-.0709903463721275,.4526660144329071,-.0407504811882973,0,2,15,5,4,9,-1,17,5,2,9,2,-.0533680804073811,-.6767405867576599,.0192883405834436,0,2,11,0,6,6,-1,13,0,2,6,3,-.0200648494064808,-.4336543083190918,.0318532884120941,0,3,16,15,2,2,-1,16,15,1,1,2,17,16,1,1,2,.001197636011056602,-.0265598706901073,.5079718232154846,0,3,16,15,2,2,-1,16,15,1,1,2,17,16,1,1,2,-.0002269730030093342,.1801259964704514,-.0836065486073494,0,2,13,2,2,18,-1,13,11,2,9,2,.0152626996859908,-.2023892998695374,.067422017455101,0,2,8,4,8,10,-1,8,9,8,5,2,-.2081176936626434,.6694386005401611,-.0224521104246378,0,2,8,3,2,3,-1,8,4,2,1,3,.001551436958834529,-.0751218423247337,.17326919734478,0,2,11,1,6,9,-1,11,4,6,3,3,-.0529240109026432,.2499251961708069,-.0628791674971581,0,2,15,4,5,6,-1,15,6,5,2,3,-.0216488502919674,-.2919428050518036,.0526144914329052,0,3,12,18,2,2,-1,12,18,1,1,2,13,19,1,1,2,-.00022905069636180997,-.2211730033159256,.0631683394312859,0,2,1,17,1,3,-1,1,18,1,1,3,5017007060814649e-20,-.1151070967316628,.1161144003272057,0,2,12,19,2,1,-1,13,19,1,1,2,-.0001641606941120699,.1587152034044266,-.0826006010174751,0,2,8,10,6,6,-1,10,10,2,6,3,-.0120032895356417,.1221809014678001,-.112296998500824,0,2,14,2,6,5,-1,16,2,2,5,3,-.0177841000258923,-.3507278859615326,.0313419215381145,0,2,9,5,2,6,-1,9,7,2,2,3,-.006345758214592934,.1307806968688965,-.1057441011071205,0,2,1,15,2,2,-1,2,15,1,2,2,-.0007952324231155217,.1720467060804367,-.086001992225647,0,2,18,17,1,3,-1,18,18,1,1,3,-.00031029590172693133,-.2843317091464996,.0518171191215515,0,2,10,14,4,6,-1,10,16,4,2,3,-.0170537102967501,.3924242854118347,-.0401432700455189,0,2,9,7,3,2,-1,10,7,1,2,3,.004650495946407318,-.031837560236454,.4123769998550415,0,3,6,9,6,2,-1,6,9,3,1,2,9,10,3,1,2,-.0103587601333857,-.5699319839477539,.0292483791708946,0,2,0,2,1,12,-1,0,6,1,4,3,-.0221962407231331,-.4560528993606567,.0262859892100096,0,2,4,0,15,1,-1,9,0,5,1,3,-.0070536029525101185,.1599832028150559,-.091594859957695,0,3,9,0,8,2,-1,9,0,4,1,2,13,1,4,1,2,-.0005709429970011115,-.1407632976770401,.1028741970658302,0,2,12,2,8,1,-1,16,2,4,1,2,-.0022152599412947893,.1659359931945801,-.0852739885449409,0,2,7,1,10,6,-1,7,3,10,2,3,-.0280848909169436,.2702234089374542,-.0558738112449646,0,2,18,6,2,3,-1,18,7,2,1,3,.0021515151020139456,.0424728915095329,-.3200584948062897,0,3,4,12,2,2,-1,4,12,1,1,2,5,13,1,1,2,-.00029733829433098435,.1617716997861862,-.0851155892014503,0,2,6,6,6,2,-1,8,6,2,2,3,-.0166947804391384,-.4285877048969269,.0305416099727154,0,2,0,9,9,6,-1,3,9,3,6,3,.1198299005627632,-.0162772908806801,.7984678149223328,0,2,17,18,2,2,-1,18,18,1,2,2,-.000354994204826653,.1593593955039978,-.0832728818058968,0,2,11,2,6,16,-1,13,2,2,16,3,-.0182262696325779,.1952728033065796,-.0739398896694183,0,2,2,4,15,13,-1,7,4,5,13,3,-.00040238600922748446,.0791018083691597,-.2080612927675247,0,2,16,2,3,10,-1,17,2,1,10,3,.0004089206049684435,.1003663018345833,-.1512821018695831,0,2,6,10,2,1,-1,7,10,1,1,2,.0009536811267025769,-.0730116665363312,.2175202071666718,0,2,1,1,18,16,-1,10,1,9,16,2,.4308179914951325,-.0274506993591785,.570615828037262,0,2,14,4,3,15,-1,15,4,1,15,3,.0005356483161449432,.1158754006028175,-.1279056072235107,0,2,19,13,1,2,-1,19,14,1,1,2,2443073026370257e-20,-.1681662946939468,.0804499834775925,0,2,2,6,5,8,-1,2,10,5,4,2,-.0553456507623196,.4533894956111908,-.0312227793037891]);

; browserify_shim__define__module__export__(typeof eye != "undefined" ? eye : window.eye);

}).call(global, undefined, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
(function (global){
;__browserify_shim_require__=require;(function browserifyShim(module, exports, require, define, browserify_shim__define__module__export__) {
/**
 * tracking.js - A modern approach for Computer Vision on the web.
 * @author Eduardo Lundgren <edu@rdo.io>
 * @version v1.0.0
 * @link http://trackingjs.com
 * @license BSD
 */
tracking.ViolaJones.classifiers.face=new Float64Array([20,20,.822689414024353,3,0,2,3,7,14,4,-1,3,9,14,2,2,.004014195874333382,.0337941907346249,.8378106951713562,0,2,1,2,18,4,-1,7,2,6,4,3,.0151513395830989,.1514132022857666,.7488812208175659,0,2,1,7,15,9,-1,1,10,15,3,3,.004210993181914091,.0900492817163467,.6374819874763489,6.956608772277832,16,0,2,5,6,2,6,-1,5,9,2,3,2,.0016227109590545297,.0693085864186287,.7110946178436279,0,2,7,5,6,3,-1,9,5,2,3,3,.002290664939209819,.1795803010463715,.6668692231178284,0,2,4,0,12,9,-1,4,3,12,3,3,.005002570804208517,.1693672984838486,.6554006934165955,0,2,6,9,10,8,-1,6,13,10,4,2,.007965989410877228,.5866332054138184,.0914145186543465,0,2,3,6,14,8,-1,3,10,14,4,2,-.003522701095789671,.1413166970014572,.6031895875930786,0,2,14,1,6,10,-1,14,1,3,10,2,.0366676896810532,.3675672113895416,.7920318245887756,0,2,7,8,5,12,-1,7,12,5,4,3,.009336147457361221,.6161385774612427,.2088509947061539,0,2,1,1,18,3,-1,7,1,6,3,3,.008696131408214569,.2836230993270874,.6360273957252502,0,2,1,8,17,2,-1,1,9,17,1,2,.0011488880263641477,.2223580926656723,.5800700783729553,0,2,16,6,4,2,-1,16,7,4,1,2,-.002148468978703022,.2406464070081711,.5787054896354675,0,2,5,17,2,2,-1,5,18,2,1,2,.002121906029060483,.5559654831886292,.136223703622818,0,2,14,2,6,12,-1,14,2,3,12,2,-.0939491465687752,.8502737283706665,.4717740118503571,0,3,4,0,4,12,-1,4,0,2,6,2,6,6,2,6,2,.0013777789426967502,.5993673801422119,.2834529876708984,0,2,2,11,18,8,-1,8,11,6,8,3,.0730631574988365,.4341886043548584,.7060034275054932,0,2,5,7,10,2,-1,5,8,10,1,2,.00036767389974556863,.3027887940406799,.6051574945449829,0,2,15,11,5,3,-1,15,12,5,1,3,-.0060479710809886456,.17984339594841,.5675256848335266,9.498542785644531,21,0,2,5,3,10,9,-1,5,6,10,3,3,-.0165106896311045,.6644225120544434,.1424857974052429,0,2,9,4,2,14,-1,9,11,2,7,2,.002705249935388565,.6325352191925049,.1288477033376694,0,2,3,5,4,12,-1,3,9,4,4,3,.002806986914947629,.1240288019180298,.6193193197250366,0,2,4,5,12,5,-1,8,5,4,5,3,-.0015402400167658925,.1432143002748489,.5670015811920166,0,2,5,6,10,8,-1,5,10,10,4,2,-.0005638627917505801,.1657433062791824,.5905207991600037,0,2,8,0,6,9,-1,8,3,6,3,3,.0019253729842603207,.2695507109165192,.5738824009895325,0,2,9,12,1,8,-1,9,16,1,4,2,-.005021484103053808,.1893538981676102,.5782774090766907,0,2,0,7,20,6,-1,0,9,20,2,3,.0026365420781075954,.2309329062700272,.5695425868034363,0,2,7,0,6,17,-1,9,0,2,17,3,-.0015127769438549876,.2759602069854736,.5956642031669617,0,2,9,0,6,4,-1,11,0,2,4,3,-.0101574398577213,.1732538044452667,.5522047281265259,0,2,5,1,6,4,-1,7,1,2,4,3,-.011953660286963,.1339409947395325,.5559014081954956,0,2,12,1,6,16,-1,14,1,2,16,3,.004885949194431305,.3628703951835632,.6188849210739136,0,3,0,5,18,8,-1,0,5,9,4,2,9,9,9,4,2,-.0801329165697098,.0912110507488251,.5475944876670837,0,3,8,15,10,4,-1,13,15,5,2,2,8,17,5,2,2,.0010643280111253262,.3715142905712128,.5711399912834167,0,3,3,1,4,8,-1,3,1,2,4,2,5,5,2,4,2,-.0013419450260698795,.5953313708305359,.331809788942337,0,3,3,6,14,10,-1,10,6,7,5,2,3,11,7,5,2,-.0546011403203011,.1844065934419632,.5602846145629883,0,2,2,1,6,16,-1,4,1,2,16,3,.0029071690514683723,.3594244122505188,.6131715178489685,0,2,0,18,20,2,-1,0,19,20,1,2,.0007471871795132756,.5994353294372559,.3459562957286835,0,2,8,13,4,3,-1,8,14,4,1,3,.004301380831748247,.4172652065753937,.6990845203399658,0,2,9,14,2,3,-1,9,15,2,1,3,.004501757211983204,.4509715139865875,.7801457047462463,0,2,0,12,9,6,-1,0,14,9,2,3,.0241385009139776,.5438212752342224,.1319826990365982,18.4129695892334,39,0,2,5,7,3,4,-1,5,9,3,2,2,.001921223010867834,.1415266990661621,.6199870705604553,0,2,9,3,2,16,-1,9,11,2,8,2,-.00012748669541906565,.6191074252128601,.1884928941726685,0,2,3,6,13,8,-1,3,10,13,4,2,.0005140993162058294,.1487396955490112,.5857927799224854,0,2,12,3,8,2,-1,12,3,4,2,2,.004187860991805792,.2746909856796265,.6359239816665649,0,2,8,8,4,12,-1,8,12,4,4,3,.005101571790874004,.5870851278305054,.2175628989934921,0,3,11,3,8,6,-1,15,3,4,3,2,11,6,4,3,2,-.002144844038411975,.5880944728851318,.2979590892791748,0,2,7,1,6,19,-1,9,1,2,19,3,-.0028977119363844395,.2373327016830444,.5876647233963013,0,2,9,0,6,4,-1,11,0,2,4,3,-.0216106791049242,.1220654994249344,.5194202065467834,0,2,3,1,9,3,-1,6,1,3,3,3,-.004629931878298521,.263123095035553,.5817409157752991,0,3,8,15,10,4,-1,13,15,5,2,2,8,17,5,2,2,.000593937118537724,.363862007856369,.5698544979095459,0,2,0,3,6,10,-1,3,3,3,10,2,.0538786612451077,.4303531050682068,.7559366226196289,0,2,3,4,15,15,-1,3,9,15,5,3,.0018887349870055914,.2122603058815002,.561342716217041,0,2,6,5,8,6,-1,6,7,8,2,3,-.0023635339457541704,.563184916973114,.2642767131328583,0,3,4,4,12,10,-1,10,4,6,5,2,4,9,6,5,2,.0240177996456623,.5797107815742493,.2751705944538117,0,2,6,4,4,4,-1,8,4,2,4,2,.00020543030404951423,.2705242037773132,.575256884098053,0,2,15,11,1,2,-1,15,12,1,1,2,.0008479019743390381,.5435624718666077,.2334876954555512,0,2,3,11,2,2,-1,3,12,2,1,2,.0014091329649090767,.5319424867630005,.2063155025243759,0,2,16,11,1,3,-1,16,12,1,1,3,.0014642629539594054,.5418980717658997,.3068861067295075,0,3,3,15,6,4,-1,3,15,3,2,2,6,17,3,2,2,.0016352549428120255,.3695372939109802,.6112868189811707,0,2,6,7,8,2,-1,6,8,8,1,2,.0008317275205627084,.3565036952495575,.6025236248970032,0,2,3,11,1,3,-1,3,12,1,1,3,-.0020998890977352858,.1913982033729553,.5362827181816101,0,2,6,0,12,2,-1,6,1,12,1,2,-.0007421398186124861,.3835555016994476,.552931010723114,0,2,9,14,2,3,-1,9,15,2,1,3,.0032655049581080675,.4312896132469177,.7101895809173584,0,2,7,15,6,2,-1,7,16,6,1,2,.0008913499186746776,.3984830975532532,.6391963958740234,0,2,0,5,4,6,-1,0,7,4,2,3,-.0152841797098517,.2366732954978943,.5433713793754578,0,2,4,12,12,2,-1,8,12,4,2,3,.004838141147047281,.5817500948905945,.3239189088344574,0,2,6,3,1,9,-1,6,6,1,3,3,-.0009109317907132208,.5540593862533569,.2911868989467621,0,2,10,17,3,2,-1,11,17,1,2,3,-.006127506028860807,.1775255054235458,.5196629166603088,0,2,9,9,2,2,-1,9,10,2,1,2,-.00044576259097084403,.3024170100688934,.5533593893051147,0,2,7,6,6,4,-1,9,6,2,4,3,.0226465407758951,.4414930939674377,.6975377202033997,0,2,7,17,3,2,-1,8,17,1,2,3,-.0018804960418492556,.2791394889354706,.5497952103614807,0,2,10,17,3,3,-1,11,17,1,3,3,.007088910788297653,.5263199210166931,.2385547012090683,0,2,8,12,3,2,-1,8,13,3,1,2,.0017318050377070904,.4319379031658173,.6983600854873657,0,2,9,3,6,2,-1,11,3,2,2,3,-.006848270073533058,.3082042932510376,.5390920042991638,0,2,3,11,14,4,-1,3,13,14,2,2,-15062530110299122e-21,.552192211151123,.3120366036891937,0,3,1,10,18,4,-1,10,10,9,2,2,1,12,9,2,2,.0294755697250366,.5401322841644287,.1770603060722351,0,2,0,10,3,3,-1,0,11,3,1,3,.008138732984662056,.5178617835044861,.121101900935173,0,2,9,1,6,6,-1,11,1,2,6,3,.0209429506212473,.5290294289588928,.3311221897602081,0,2,8,7,3,6,-1,9,7,1,6,3,-.009566552937030792,.7471994161605835,.4451968967914581,15.324139595031738,33,0,2,1,0,18,9,-1,1,3,18,3,3,-.00028206960996612906,.2064086049795151,.6076732277870178,0,2,12,10,2,6,-1,12,13,2,3,2,.00167906004935503,.5851997137069702,.1255383938550949,0,2,0,5,19,8,-1,0,9,19,4,2,.0006982791237533092,.094018429517746,.5728961229324341,0,2,7,0,6,9,-1,9,0,2,9,3,.0007895901217125356,.1781987994909287,.5694308876991272,0,2,5,3,6,1,-1,7,3,2,1,3,-.002856049919500947,.1638399064540863,.5788664817810059,0,2,11,3,6,1,-1,13,3,2,1,3,-.0038122469559311867,.2085440009832382,.5508564710617065,0,2,5,10,4,6,-1,5,13,4,3,2,.0015896620461717248,.5702760815620422,.1857215017080307,0,2,11,3,6,1,-1,13,3,2,1,3,.0100783398374915,.5116943120956421,.2189770042896271,0,2,4,4,12,6,-1,4,6,12,2,3,-.0635263025760651,.7131379842758179,.4043813049793243,0,2,15,12,2,6,-1,15,14,2,2,3,-.009103149175643921,.2567181885242462,.54639732837677,0,2,9,3,2,2,-1,10,3,1,2,2,-.002403500024229288,.1700665950775147,.559097409248352,0,2,9,3,3,1,-1,10,3,1,1,3,.001522636041045189,.5410556793212891,.2619054019451141,0,2,1,1,4,14,-1,3,1,2,14,2,.0179974399507046,.3732436895370483,.6535220742225647,0,3,9,0,4,4,-1,11,0,2,2,2,9,2,2,2,2,-.00645381910726428,.2626481950283051,.5537446141242981,0,2,7,5,1,14,-1,7,12,1,7,2,-.0118807600811124,.2003753930330277,.5544745922088623,0,2,19,0,1,4,-1,19,2,1,2,2,.0012713660253211856,.5591902732849121,.303197592496872,0,2,5,5,6,4,-1,8,5,3,4,2,.0011376109905540943,.2730407118797302,.5646508932113647,0,2,9,18,3,2,-1,10,18,1,2,3,-.00426519988104701,.1405909061431885,.5461820960044861,0,2,8,18,3,2,-1,9,18,1,2,3,-.0029602861031889915,.1795035004615784,.5459290146827698,0,2,4,5,12,6,-1,4,7,12,2,3,-.008844822645187378,.5736783146858215,.280921995639801,0,2,3,12,2,6,-1,3,14,2,2,3,-.006643068976700306,.2370675951242447,.5503826141357422,0,2,10,8,2,12,-1,10,12,2,4,3,.003999780863523483,.5608199834823608,.3304282128810883,0,2,7,18,3,2,-1,8,18,1,2,3,-.004122172016650438,.1640105992555618,.5378993153572083,0,2,9,0,6,2,-1,11,0,2,2,3,.0156249096617103,.5227649211883545,.2288603931665421,0,2,5,11,9,3,-1,5,12,9,1,3,-.0103564197197557,.7016193866729736,.4252927899360657,0,2,9,0,6,2,-1,11,0,2,2,3,-.008796080946922302,.2767347097396851,.5355830192565918,0,2,1,1,18,5,-1,7,1,6,5,3,.1622693985700607,.434224009513855,.744257926940918,0,3,8,0,4,4,-1,10,0,2,2,2,8,2,2,2,2,.0045542530715465546,.5726485848426819,.2582125067710877,0,2,3,12,1,3,-1,3,13,1,1,3,-.002130920998752117,.2106848061084747,.5361018776893616,0,2,8,14,5,3,-1,8,15,5,1,3,-.0132084200158715,.7593790888786316,.4552468061447144,0,3,5,4,10,12,-1,5,4,5,6,2,10,10,5,6,2,-.0659966766834259,.125247597694397,.5344039797782898,0,2,9,6,9,12,-1,9,10,9,4,3,.007914265617728233,.3315384089946747,.5601043105125427,0,3,2,2,12,14,-1,2,2,6,7,2,8,9,6,7,2,.0208942797034979,.5506049990653992,.2768838107585907,21.010639190673828,44,0,2,4,7,12,2,-1,8,7,4,2,3,.0011961159761995077,.1762690991163254,.6156241297721863,0,2,7,4,6,4,-1,7,6,6,2,2,-.0018679830245673656,.6118106842041016,.1832399964332581,0,2,4,5,11,8,-1,4,9,11,4,2,-.00019579799845814705,.0990442633628845,.5723816156387329,0,2,3,10,16,4,-1,3,12,16,2,2,-.0008025565766729414,.5579879879951477,.2377282977104187,0,2,0,0,16,2,-1,0,1,16,1,2,-.0024510810617357492,.2231457978487015,.5858935117721558,0,2,7,5,6,2,-1,9,5,2,2,3,.0005036185029894114,.2653993964195252,.5794103741645813,0,3,3,2,6,10,-1,3,2,3,5,2,6,7,3,5,2,.0040293349884450436,.5803827047348022,.2484865039587021,0,2,10,5,8,15,-1,10,10,8,5,3,-.0144517095759511,.1830351948738098,.5484204888343811,0,3,3,14,8,6,-1,3,14,4,3,2,7,17,4,3,2,.0020380979403853416,.3363558948040009,.6051092743873596,0,2,14,2,2,2,-1,14,3,2,1,2,-.0016155190533027053,.2286642044782639,.5441246032714844,0,2,1,10,7,6,-1,1,13,7,3,2,.0033458340913057327,.5625913143157959,.2392338067293167,0,2,15,4,4,3,-1,15,4,2,3,2,.0016379579901695251,.3906993865966797,.5964621901512146,0,3,2,9,14,6,-1,2,9,7,3,2,9,12,7,3,2,.0302512105554342,.524848222732544,.1575746983289719,0,2,5,7,10,4,-1,5,9,10,2,2,.037251990288496,.4194310903549194,.6748418807983398,0,3,6,9,8,8,-1,6,9,4,4,2,10,13,4,4,2,-.0251097902655602,.1882549971342087,.5473451018333435,0,2,14,1,3,2,-1,14,2,3,1,2,-.005309905856847763,.133997306227684,.5227110981941223,0,2,1,4,4,2,-1,3,4,2,2,2,.0012086479691788554,.3762088119983673,.6109635829925537,0,2,11,10,2,8,-1,11,14,2,4,2,-.0219076797366142,.266314297914505,.5404006838798523,0,2,0,0,5,3,-1,0,1,5,1,3,.0054116579703986645,.5363578796386719,.2232273072004318,0,3,2,5,18,8,-1,11,5,9,4,2,2,9,9,4,2,.069946326315403,.5358232855796814,.2453698068857193,0,2,6,6,1,6,-1,6,9,1,3,2,.00034520021290518343,.2409671992063522,.5376930236816406,0,2,19,1,1,3,-1,19,2,1,1,3,.0012627709656953812,.5425856709480286,.3155693113803864,0,2,7,6,6,6,-1,9,6,2,6,3,.0227195098996162,.4158405959606171,.6597865223884583,0,2,19,1,1,3,-1,19,2,1,1,3,-.001811100053600967,.2811253070831299,.5505244731903076,0,2,3,13,2,3,-1,3,14,2,1,3,.0033469670452177525,.526002824306488,.1891465038061142,0,3,8,4,8,12,-1,12,4,4,6,2,8,10,4,6,2,.00040791751234792173,.5673509240150452,.3344210088253021,0,2,5,2,6,3,-1,7,2,2,3,3,.0127347996458411,.5343592166900635,.2395612001419067,0,2,6,1,9,10,-1,6,6,9,5,2,-.007311972789466381,.6010890007019043,.4022207856178284,0,2,0,4,6,12,-1,2,4,2,12,3,-.0569487512111664,.8199151158332825,.4543190896511078,0,2,15,13,2,3,-1,15,14,2,1,3,-.005011659115552902,.2200281023979187,.5357710719108582,0,2,7,14,5,3,-1,7,15,5,1,3,.006033436860889196,.4413081109523773,.7181751132011414,0,2,15,13,3,3,-1,15,14,3,1,3,.0039437441155314445,.547886073589325,.2791733145713806,0,2,6,14,8,3,-1,6,15,8,1,3,-.0036591119132936,.635786771774292,.3989723920822144,0,2,15,13,3,3,-1,15,14,3,1,3,-.0038456181064248085,.3493686020374298,.5300664901733398,0,2,2,13,3,3,-1,2,14,3,1,3,-.007192626129835844,.1119614988565445,.5229672789573669,0,3,4,7,12,12,-1,10,7,6,6,2,4,13,6,6,2,-.0527989417314529,.2387102991342545,.54534512758255,0,2,9,7,2,6,-1,10,7,1,6,2,-.007953766733407974,.7586917877197266,.4439376890659332,0,2,8,9,5,2,-1,8,10,5,1,2,-.0027344180271029472,.2565476894378662,.5489321947097778,0,2,8,6,3,4,-1,9,6,1,4,3,-.0018507939530536532,.6734347939491272,.4252474904060364,0,2,9,6,2,8,-1,9,10,2,4,2,.0159189198166132,.548835277557373,.2292661964893341,0,2,7,7,3,6,-1,8,7,1,6,3,-.0012687679845839739,.6104331016540527,.4022389948368073,0,2,11,3,3,3,-1,12,3,1,3,3,.006288391072303057,.5310853123664856,.1536193042993546,0,2,5,4,6,1,-1,7,4,2,1,3,-.0062259892001748085,.1729111969470978,.524160623550415,0,2,5,6,10,3,-1,5,7,10,1,3,-.0121325999498367,.659775972366333,.4325182139873505,23.918790817260742,50,0,2,7,3,6,9,-1,7,6,6,3,3,-.0039184908382594585,.6103435158729553,.1469330936670303,0,2,6,7,9,1,-1,9,7,3,1,3,.0015971299726516008,.2632363140583038,.5896466970443726,0,2,2,8,16,8,-1,2,12,16,4,2,.0177801102399826,.587287425994873,.1760361939668655,0,2,14,6,2,6,-1,14,9,2,3,2,.0006533476989716291,.1567801982164383,.5596066117286682,0,2,1,5,6,15,-1,1,10,6,5,3,-.00028353091329336166,.1913153976202011,.5732036232948303,0,2,10,0,6,9,-1,10,3,6,3,3,.0016104689566418529,.2914913892745972,.5623080730438232,0,2,6,6,7,14,-1,6,13,7,7,2,-.0977506190538406,.194347694516182,.5648233294487,0,2,13,7,3,6,-1,13,9,3,2,3,.0005518235848285258,.3134616911411285,.5504639744758606,0,2,1,8,15,4,-1,6,8,5,4,3,-.0128582203760743,.253648191690445,.5760142803192139,0,2,11,2,3,10,-1,11,7,3,5,2,.004153023939579725,.5767722129821777,.36597740650177,0,2,3,7,4,6,-1,3,9,4,2,3,.0017092459602281451,.2843191027641296,.5918939113616943,0,2,13,3,6,10,-1,15,3,2,10,3,.007521735969930887,.4052427113056183,.6183109283447266,0,3,5,7,8,10,-1,5,7,4,5,2,9,12,4,5,2,.0022479810286313295,.578375518321991,.3135401010513306,0,3,4,4,12,12,-1,10,4,6,6,2,4,10,6,6,2,.0520062111318111,.5541312098503113,.1916636973619461,0,2,1,4,6,9,-1,3,4,2,9,3,.0120855299755931,.4032655954360962,.6644591093063354,0,2,11,3,2,5,-1,11,3,1,5,2,14687820112158079e-21,.3535977900028229,.5709382891654968,0,2,7,3,2,5,-1,8,3,1,5,2,7139518857002258e-21,.3037444949150085,.5610269904136658,0,2,10,14,2,3,-1,10,15,2,1,3,-.0046001640148460865,.7181087136268616,.4580326080322266,0,2,5,12,6,2,-1,8,12,3,2,2,.0020058949012309313,.5621951818466187,.2953684031963348,0,2,9,14,2,3,-1,9,15,2,1,3,.004505027085542679,.4615387916564941,.7619017958641052,0,2,4,11,12,6,-1,4,14,12,3,2,.0117468303069472,.5343837141990662,.1772529035806656,0,2,11,11,5,9,-1,11,14,5,3,3,-.0583163388073444,.1686245948076248,.5340772271156311,0,2,6,15,3,2,-1,6,16,3,1,2,.00023629379575140774,.3792056143283844,.6026803851127625,0,2,11,0,3,5,-1,12,0,1,5,3,-.007815618067979813,.151286706328392,.5324323773384094,0,2,5,5,6,7,-1,8,5,3,7,2,-.0108761601150036,.2081822007894516,.5319945216178894,0,2,13,0,1,9,-1,13,3,1,3,3,-.0027745519764721394,.4098246991634369,.5210328102111816,0,3,3,2,4,8,-1,3,2,2,4,2,5,6,2,4,2,-.0007827638182789087,.5693274140357971,.3478842079639435,0,2,13,12,4,6,-1,13,14,4,2,3,.0138704096898437,.5326750874519348,.2257698029279709,0,2,3,12,4,6,-1,3,14,4,2,3,-.0236749108880758,.1551305055618286,.5200707912445068,0,2,13,11,3,4,-1,13,13,3,2,2,-14879409718560055e-21,.5500566959381104,.3820176124572754,0,2,4,4,4,3,-1,4,5,4,1,3,.00361906411126256,.4238683879375458,.6639748215675354,0,2,7,5,11,8,-1,7,9,11,4,2,-.0198171101510525,.2150038033723831,.5382357835769653,0,2,7,8,3,4,-1,8,8,1,4,3,-.0038154039066284895,.6675711274147034,.4215297102928162,0,2,9,1,6,1,-1,11,1,2,1,3,-.0049775829538702965,.2267289012670517,.5386328101158142,0,2,5,5,3,3,-1,5,6,3,1,3,.002244102070108056,.4308691024780273,.6855735778808594,0,3,0,9,20,6,-1,10,9,10,3,2,0,12,10,3,2,.0122824599966407,.5836614966392517,.3467479050159454,0,2,8,6,3,5,-1,9,6,1,5,3,-.002854869933798909,.7016944885253906,.4311453998088837,0,2,11,0,1,3,-1,11,1,1,1,3,-.0037875669077038765,.2895345091819763,.5224946141242981,0,2,4,2,4,2,-1,4,3,4,1,2,-.0012201230274513364,.2975570857524872,.5481644868850708,0,2,12,6,4,3,-1,12,7,4,1,3,.010160599835217,.4888817965984345,.8182697892189026,0,2,5,0,6,4,-1,7,0,2,4,3,-.0161745697259903,.1481492966413498,.5239992737770081,0,2,9,7,3,8,-1,10,7,1,8,3,.0192924607545137,.4786309897899628,.7378190755844116,0,2,9,7,2,2,-1,10,7,1,2,2,-.003247953951358795,.7374222874641418,.4470643997192383,0,3,6,7,14,4,-1,13,7,7,2,2,6,9,7,2,2,-.009380348026752472,.3489154875278473,.5537996292114258,0,2,0,5,3,6,-1,0,7,3,2,3,-.0126061299815774,.2379686981439591,.5315443277359009,0,2,13,11,3,4,-1,13,13,3,2,2,-.0256219301372766,.1964688003063202,.5138769745826721,0,2,4,11,3,4,-1,4,13,3,2,2,-7574149640277028e-20,.5590522885322571,.3365853130817413,0,3,5,9,12,8,-1,11,9,6,4,2,5,13,6,4,2,-.0892108827829361,.0634046569466591,.516263484954834,0,2,9,12,1,3,-1,9,13,1,1,3,-.002767048077657819,.732346773147583,.4490706026554108,0,2,10,15,2,4,-1,10,17,2,2,2,.0002715257869567722,.411483496427536,.5985518097877502,24.52787971496582,51,0,2,7,7,6,1,-1,9,7,2,1,3,.001478621968999505,.266354501247406,.6643316745758057,0,3,12,3,6,6,-1,15,3,3,3,2,12,6,3,3,2,-.001874165958724916,.6143848896026611,.2518512904644013,0,2,0,4,10,6,-1,0,6,10,2,3,-.001715100952424109,.5766341090202332,.2397463023662567,0,3,8,3,8,14,-1,12,3,4,7,2,8,10,4,7,2,-.0018939269939437509,.5682045817375183,.2529144883155823,0,2,4,4,7,15,-1,4,9,7,5,3,-.005300605203956366,.1640675961971283,.5556079745292664,0,3,12,2,6,8,-1,15,2,3,4,2,12,6,3,4,2,-.0466625317931175,.6123154163360596,.4762830138206482,0,3,2,2,6,8,-1,2,2,3,4,2,5,6,3,4,2,-.000794313324149698,.5707858800888062,.2839404046535492,0,2,2,13,18,7,-1,8,13,6,7,3,.0148916700854898,.4089672863483429,.6006367206573486,0,3,4,3,8,14,-1,4,3,4,7,2,8,10,4,7,2,-.0012046529445797205,.5712450742721558,.2705289125442505,0,2,18,1,2,6,-1,18,3,2,2,3,.006061938125640154,.526250422000885,.3262225985527039,0,2,9,11,2,3,-1,9,12,2,1,3,-.0025286648888140917,.6853830814361572,.4199256896972656,0,2,18,1,2,6,-1,18,3,2,2,3,-.005901021882891655,.3266282081604004,.5434812903404236,0,2,0,1,2,6,-1,0,3,2,2,3,.005670276004821062,.5468410849571228,.2319003939628601,0,2,1,5,18,6,-1,1,7,18,2,3,-.003030410036444664,.557066798210144,.2708238065242767,0,2,0,2,6,7,-1,3,2,3,7,2,.002980364952236414,.3700568974018097,.5890625715255737,0,2,7,3,6,14,-1,7,10,6,7,2,-.0758405104279518,.2140070050954819,.5419948101043701,0,2,3,7,13,10,-1,3,12,13,5,2,.0192625392228365,.5526772141456604,.2726590037345886,0,2,11,15,2,2,-1,11,16,2,1,2,.00018888259364757687,.3958011865615845,.6017209887504578,0,3,2,11,16,4,-1,2,11,8,2,2,10,13,8,2,2,.0293695498257875,.5241373777389526,.1435758024454117,0,3,13,7,6,4,-1,16,7,3,2,2,13,9,3,2,2,.0010417619487270713,.3385409116744995,.5929983258247375,0,2,6,10,3,9,-1,6,13,3,3,3,.0026125640142709017,.5485377907752991,.3021597862243652,0,2,14,6,1,6,-1,14,9,1,3,2,.0009697746718302369,.3375276029109955,.553203284740448,0,2,5,10,4,1,-1,7,10,2,1,2,.0005951265920884907,.563174307346344,.3359399139881134,0,2,3,8,15,5,-1,8,8,5,5,3,-.1015655994415283,.0637350380420685,.5230425000190735,0,2,1,6,5,4,-1,1,8,5,2,2,.0361566990613937,.5136963129043579,.1029528975486755,0,2,3,1,17,6,-1,3,3,17,2,3,.003462414024397731,.3879320025444031,.5558289289474487,0,2,6,7,8,2,-1,10,7,4,2,2,.0195549800992012,.5250086784362793,.1875859946012497,0,2,9,7,3,2,-1,10,7,1,2,3,-.0023121440317481756,.667202889919281,.4679641127586365,0,2,8,7,3,2,-1,9,7,1,2,3,-.001860528951510787,.7163379192352295,.4334670901298523,0,2,8,9,4,2,-1,8,10,4,1,2,-.0009402636205777526,.302136093378067,.5650203227996826,0,2,8,8,4,3,-1,8,9,4,1,3,-.005241833161562681,.1820009052753449,.5250256061553955,0,2,9,5,6,4,-1,9,5,3,4,2,.00011729019752237946,.3389188051223755,.544597327709198,0,2,8,13,4,3,-1,8,14,4,1,3,.0011878840159624815,.4085349142551422,.6253563165664673,0,3,4,7,12,6,-1,10,7,6,3,2,4,10,6,3,2,-.0108813596889377,.3378399014472961,.5700082778930664,0,2,8,14,4,3,-1,8,15,4,1,3,.0017354859737679362,.4204635918140411,.6523038744926453,0,2,9,7,3,3,-1,9,8,3,1,3,-.00651190523058176,.2595216035842896,.5428143739700317,0,2,7,4,3,8,-1,8,4,1,8,3,-.0012136430013924837,.6165143847465515,.3977893888950348,0,2,10,0,3,6,-1,11,0,1,6,3,-.010354240424931,.1628028005361557,.5219504833221436,0,2,6,3,4,8,-1,8,3,2,8,2,.0005585883045569062,.3199650943279266,.5503574013710022,0,2,14,3,6,13,-1,14,3,3,13,2,.0152996499091387,.4103994071483612,.6122388243675232,0,2,8,13,3,6,-1,8,16,3,3,2,-.021588210016489,.103491298854351,.519738495349884,0,2,14,3,6,13,-1,14,3,3,13,2,-.1283462941646576,.8493865132331848,.4893102943897247,0,3,0,7,10,4,-1,0,7,5,2,2,5,9,5,2,2,-.0022927189711481333,.3130157887935638,.5471575260162354,0,2,14,3,6,13,-1,14,3,3,13,2,.0799151062965393,.4856320917606354,.6073989272117615,0,2,0,3,6,13,-1,3,3,3,13,2,-.0794410929083824,.8394674062728882,.462453305721283,0,2,9,1,4,1,-1,9,1,2,1,2,-.00528000108897686,.1881695985794067,.5306698083877563,0,2,8,0,2,1,-1,9,0,1,1,2,.0010463109938427806,.5271229147911072,.2583065927028656,0,3,10,16,4,4,-1,12,16,2,2,2,10,18,2,2,2,.00026317298761568964,.4235304892063141,.5735440850257874,0,2,9,6,2,3,-1,10,6,1,3,2,-.0036173160187900066,.6934396028518677,.4495444893836975,0,2,4,5,12,2,-1,8,5,4,2,3,.0114218797534704,.590092122554779,.4138193130493164,0,2,8,7,3,5,-1,9,7,1,5,3,-.0019963278900831938,.6466382741928101,.4327239990234375,27.153350830078125,56,0,2,6,4,8,6,-1,6,6,8,2,3,-.00996912457048893,.6142324209213257,.2482212036848068,0,2,9,5,2,12,-1,9,11,2,6,2,.0007307305932044983,.5704951882362366,.2321965992450714,0,2,4,6,6,8,-1,4,10,6,4,2,.0006404530140571296,.2112251967191696,.5814933180809021,0,2,12,2,8,5,-1,12,2,4,5,2,.004542401991784573,.2950482070446014,.586631178855896,0,2,0,8,18,3,-1,0,9,18,1,3,9247744310414419e-20,.2990990877151489,.5791326761245728,0,2,8,12,4,8,-1,8,16,4,4,2,-.008660314604640007,.2813029885292053,.5635542273521423,0,2,0,2,8,5,-1,4,2,4,5,2,.008051581680774689,.3535369038581848,.6054757237434387,0,2,13,11,3,4,-1,13,13,3,2,2,.00043835240649059415,.5596532225608826,.2731510996818543,0,2,5,11,6,1,-1,7,11,2,1,3,-981689736363478e-19,.5978031754493713,.3638561069965363,0,2,11,3,3,1,-1,12,3,1,1,3,-.0011298790341243148,.2755252122879028,.5432729125022888,0,2,7,13,5,3,-1,7,14,5,1,3,.006435615010559559,.4305641949176788,.7069833278656006,0,2,11,11,7,6,-1,11,14,7,3,2,-.0568293295800686,.2495242953300476,.5294997096061707,0,2,2,11,7,6,-1,2,14,7,3,2,.004066816996783018,.5478553175926208,.2497723996639252,0,2,12,14,2,6,-1,12,16,2,2,3,481647984997835e-19,.3938601016998291,.5706356167793274,0,2,8,14,3,3,-1,8,15,3,1,3,.00617950176820159,.440760612487793,.7394766807556152,0,2,11,0,3,5,-1,12,0,1,5,3,.006498575210571289,.5445243120193481,.2479152977466583,0,2,6,1,4,9,-1,8,1,2,9,2,-.0010211090557277203,.2544766962528229,.5338971018791199,0,2,10,3,6,1,-1,12,3,2,1,3,-.005424752831459045,.2718858122825623,.5324069261550903,0,2,8,8,3,4,-1,8,10,3,2,2,-.0010559899965301156,.3178288042545319,.553450882434845,0,2,8,12,4,2,-1,8,13,4,1,2,.0006646580877713859,.4284219145774841,.6558194160461426,0,2,5,18,4,2,-1,5,19,4,1,2,-.00027524109464138746,.5902860760688782,.3810262978076935,0,2,2,1,18,6,-1,2,3,18,2,3,.004229320213198662,.381648987531662,.5709385871887207,0,2,6,0,3,2,-1,7,0,1,2,3,-.0032868210691958666,.1747743934392929,.5259544253349304,0,3,13,8,6,2,-1,16,8,3,1,2,13,9,3,1,2,.0001561187964398414,.3601722121238709,.5725612044334412,0,2,6,10,3,6,-1,6,13,3,3,2,-7362138148891972e-21,.540185809135437,.3044497072696686,0,3,0,13,20,4,-1,10,13,10,2,2,0,15,10,2,2,-.014767250046134,.3220770061016083,.5573434829711914,0,2,7,7,6,5,-1,9,7,2,5,3,.0244895908981562,.4301528036594391,.6518812775611877,0,2,11,0,2,2,-1,11,1,2,1,2,-.000376520911231637,.356458306312561,.5598236918449402,0,3,1,8,6,2,-1,1,8,3,1,2,4,9,3,1,2,736576885174145e-20,.3490782976150513,.556189775466919,0,3,0,2,20,2,-1,10,2,10,1,2,0,3,10,1,2,-.0150999398902059,.1776272058486939,.5335299968719482,0,2,7,14,5,3,-1,7,15,5,1,3,-.0038316650316119194,.6149687767028809,.4221394062042236,0,3,7,13,6,6,-1,10,13,3,3,2,7,16,3,3,2,.0169254001230001,.5413014888763428,.2166585028171539,0,2,9,12,2,3,-1,9,13,2,1,3,-.003047785023227334,.6449490785598755,.4354617893695831,0,2,16,11,1,6,-1,16,13,1,2,3,.003214058931916952,.5400155186653137,.3523217141628265,0,2,3,11,1,6,-1,3,13,1,2,3,-.004002320114523172,.2774524092674255,.5338417291641235,0,3,4,4,14,12,-1,11,4,7,6,2,4,10,7,6,2,.0074182129465043545,.567673921585083,.3702817857265472,0,2,5,4,3,3,-1,5,5,3,1,3,-.008876458741724491,.7749221920967102,.4583688974380493,0,2,12,3,3,3,-1,13,3,1,3,3,.002731173997744918,.5338721871376038,.3996661007404327,0,2,6,6,8,3,-1,6,7,8,1,3,-.0025082379579544067,.5611963272094727,.377749890089035,0,2,12,3,3,3,-1,13,3,1,3,3,-.008054107427597046,.291522890329361,.5179182887077332,0,3,3,1,4,10,-1,3,1,2,5,2,5,6,2,5,2,-.0009793881326913834,.5536432862281799,.3700192868709564,0,2,5,7,10,2,-1,5,7,5,2,2,-.005874590948224068,.3754391074180603,.5679376125335693,0,2,8,7,3,3,-1,9,7,1,3,3,-.00449367193505168,.7019699215888977,.4480949938297272,0,2,15,12,2,3,-1,15,13,2,1,3,-.00543892290443182,.2310364991426468,.5313386917114258,0,2,7,8,3,4,-1,8,8,1,4,3,-.0007509464048780501,.5864868760108948,.4129343032836914,0,2,13,4,1,12,-1,13,10,1,6,2,14528800420521293e-21,.3732407093048096,.5619621276855469,0,3,4,5,12,12,-1,4,5,6,6,2,10,11,6,6,2,.0407580696046352,.5312091112136841,.2720521986484528,0,2,7,14,7,3,-1,7,15,7,1,3,.006650593131780624,.4710015952587128,.6693493723869324,0,2,3,12,2,3,-1,3,13,2,1,3,.0045759351924061775,.5167819261550903,.1637275964021683,0,3,3,2,14,2,-1,10,2,7,1,2,3,3,7,1,2,.0065269311890006065,.5397608876228333,.2938531935214996,0,2,0,1,3,10,-1,1,1,1,10,3,-.0136603796854615,.7086488008499146,.453220009803772,0,2,9,0,6,5,-1,11,0,2,5,3,.0273588690906763,.5206481218338013,.3589231967926025,0,2,5,7,6,2,-1,8,7,3,2,2,.0006219755159690976,.3507075905799866,.5441123247146606,0,2,7,1,6,10,-1,7,6,6,5,2,-.0033077080734074116,.5859522819519043,.402489185333252,0,2,1,1,18,3,-1,7,1,6,3,3,-.0106311095878482,.6743267178535461,.4422602951526642,0,2,16,3,3,6,-1,16,5,3,2,3,.0194416493177414,.5282716155052185,.1797904968261719,34.55411148071289,71,0,2,6,3,7,6,-1,6,6,7,3,2,-.005505216773599386,.5914731025695801,.2626559138298035,0,2,4,7,12,2,-1,8,7,4,2,3,.001956227933987975,.2312581986188889,.5741627216339111,0,2,0,4,17,10,-1,0,9,17,5,2,-.008892478421330452,.1656530052423477,.5626654028892517,0,2,3,4,15,16,-1,3,12,15,8,2,.0836383774876595,.5423449873924255,.1957294940948486,0,2,7,15,6,4,-1,7,17,6,2,2,.0012282270472496748,.3417904078960419,.5992503762245178,0,2,15,2,4,9,-1,15,2,2,9,2,.0057629169896245,.3719581961631775,.6079903841018677,0,2,2,3,3,2,-1,2,4,3,1,2,-.0016417410224676132,.2577486038208008,.5576915740966797,0,2,13,6,7,9,-1,13,9,7,3,3,.0034113149158656597,.2950749099254608,.5514171719551086,0,2,8,11,4,3,-1,8,12,4,1,3,-.0110693201422691,.7569358944892883,.4477078914642334,0,3,0,2,20,6,-1,10,2,10,3,2,0,5,10,3,2,.0348659716546535,.5583708882331848,.2669621109962463,0,3,3,2,6,10,-1,3,2,3,5,2,6,7,3,5,2,.0006570109981112182,.5627313256263733,.2988890111446381,0,2,13,10,3,4,-1,13,12,3,2,2,-.0243391301482916,.2771185040473938,.5108863115310669,0,2,4,10,3,4,-1,4,12,3,2,2,.0005943520227447152,.5580651760101318,.3120341897010803,0,2,7,5,6,3,-1,9,5,2,3,3,.0022971509024500847,.3330250084400177,.5679075717926025,0,2,7,6,6,8,-1,7,10,6,4,2,-.0037801829166710377,.2990534901618958,.5344808101654053,0,2,0,11,20,6,-1,0,14,20,3,2,-.13420669734478,.1463858932256699,.5392568111419678,0,3,4,13,4,6,-1,4,13,2,3,2,6,16,2,3,2,.0007522454834543169,.3746953904628754,.5692734718322754,0,3,6,0,8,12,-1,10,0,4,6,2,6,6,4,6,2,-.040545541793108,.2754747867584229,.5484297871589661,0,2,2,0,15,2,-1,2,1,15,1,2,.0012572970008477569,.3744584023952484,.5756075978279114,0,2,9,12,2,3,-1,9,13,2,1,3,-.007424994837492704,.7513859272003174,.4728231132030487,0,2,3,12,1,2,-1,3,13,1,1,2,.0005090812919661403,.540489673614502,.2932321131229401,0,2,9,11,2,3,-1,9,12,2,1,3,-.001280845026485622,.6169779896736145,.4273349046707153,0,2,7,3,3,1,-1,8,3,1,1,3,-.0018348860321566463,.2048496007919312,.5206472277641296,0,2,17,7,3,6,-1,17,9,3,2,3,.0274848695844412,.5252984762191772,.1675522029399872,0,2,7,2,3,2,-1,8,2,1,2,3,.0022372419480234385,.5267782807350159,.2777658104896545,0,2,11,4,5,3,-1,11,5,5,1,3,-.008863529190421104,.69545578956604,.4812048971652985,0,2,4,4,5,3,-1,4,5,5,1,3,.004175397101789713,.4291887879371643,.6349195837974548,0,2,19,3,1,2,-1,19,4,1,1,2,-.0017098189564421773,.2930536866188049,.5361248850822449,0,2,5,5,4,3,-1,5,6,4,1,3,.006532854866236448,.4495325088500977,.7409694194793701,0,2,17,7,3,6,-1,17,9,3,2,3,-.009537290781736374,.3149119913578033,.5416501760482788,0,2,0,7,3,6,-1,0,9,3,2,3,.0253109894692898,.5121892094612122,.1311707943677902,0,2,14,2,6,9,-1,14,5,6,3,3,.0364609695971012,.5175911784172058,.2591339945793152,0,2,0,4,5,6,-1,0,6,5,2,3,.0208543296903372,.5137140154838562,.1582316011190414,0,2,10,5,6,2,-1,12,5,2,2,3,-.0008720774785615504,.5574309825897217,.439897894859314,0,2,4,5,6,2,-1,6,5,2,2,3,-15227000403683633e-21,.5548940896987915,.3708069920539856,0,2,8,1,4,6,-1,8,3,4,2,3,-.0008431650931015611,.3387419879436493,.5554211139678955,0,2,0,2,3,6,-1,0,4,3,2,3,.0036037859972566366,.5358061790466309,.3411171138286591,0,2,6,6,8,3,-1,6,7,8,1,3,-.006805789191275835,.6125202775001526,.4345862865447998,0,2,0,1,5,9,-1,0,4,5,3,3,-.0470216609537601,.2358165979385376,.519373893737793,0,2,16,0,4,15,-1,16,0,2,15,2,-.0369541086256504,.7323111295700073,.4760943949222565,0,2,1,10,3,2,-1,1,11,3,1,2,.0010439479956403375,.5419455170631409,.3411330878734589,0,2,14,4,1,10,-1,14,9,1,5,2,-.00021050689974799752,.2821694016456604,.5554947257041931,0,2,0,1,4,12,-1,2,1,2,12,2,-.0808315873146057,.9129930138587952,.4697434902191162,0,2,11,11,4,2,-1,11,11,2,2,2,-.0003657905908767134,.6022670269012451,.3978292942047119,0,2,5,11,4,2,-1,7,11,2,2,2,-.00012545920617412776,.5613213181495667,.384553998708725,0,2,3,8,15,5,-1,8,8,5,5,3,-.0687864869832993,.2261611968278885,.5300496816635132,0,2,0,0,6,10,-1,3,0,3,10,2,.0124157899990678,.4075691998004913,.5828812122344971,0,2,11,4,3,2,-1,12,4,1,2,3,-.004717481788247824,.2827253937721252,.5267757773399353,0,2,8,12,3,8,-1,8,16,3,4,2,.0381368584930897,.5074741244316101,.1023615971207619,0,2,8,14,5,3,-1,8,15,5,1,3,-.0028168049175292253,.6169006824493408,.4359692931175232,0,2,7,14,4,3,-1,7,15,4,1,3,.008130360394716263,.4524433016777039,.76060950756073,0,2,11,4,3,2,-1,12,4,1,2,3,.006005601957440376,.5240408778190613,.185971200466156,0,3,3,15,14,4,-1,3,15,7,2,2,10,17,7,2,2,.0191393196582794,.5209379196166992,.2332071959972382,0,3,2,2,16,4,-1,10,2,8,2,2,2,4,8,2,2,.0164457596838474,.5450702905654907,.3264234960079193,0,2,0,8,6,12,-1,3,8,3,12,2,-.0373568907380104,.6999046802520752,.4533241987228394,0,2,5,7,10,2,-1,5,7,5,2,2,-.0197279006242752,.2653664946556091,.54128098487854,0,2,9,7,2,5,-1,10,7,1,5,2,.0066972579807043076,.4480566084384918,.7138652205467224,0,3,13,7,6,4,-1,16,7,3,2,2,13,9,3,2,2,.0007445752853527665,.4231350123882294,.5471320152282715,0,2,0,13,8,2,-1,0,14,8,1,2,.0011790640419349074,.5341702103614807,.3130455017089844,0,3,13,7,6,4,-1,16,7,3,2,2,13,9,3,2,2,.0349806100130081,.5118659734725952,.343053013086319,0,3,1,7,6,4,-1,1,7,3,2,2,4,9,3,2,2,.0005685979267582297,.3532187044620514,.5468639731407166,0,2,12,6,1,12,-1,12,12,1,6,2,-.0113406497985125,.2842353880405426,.5348700881004333,0,2,9,5,2,6,-1,10,5,1,6,2,-.00662281084805727,.6883640289306641,.4492664933204651,0,2,14,12,2,3,-1,14,13,2,1,3,-.008016033098101616,.1709893941879273,.5224308967590332,0,2,4,12,2,3,-1,4,13,2,1,3,.0014206819469109178,.5290846228599548,.299338310956955,0,2,8,12,4,3,-1,8,13,4,1,3,-.002780171111226082,.6498854160308838,.4460499882698059,0,3,5,2,2,4,-1,5,2,1,2,2,6,4,1,2,2,-.0014747589593753219,.3260438144207001,.5388113260269165,0,2,5,5,11,3,-1,5,6,11,1,3,-.0238303393125534,.7528941035270691,.4801219999790192,0,2,7,6,4,12,-1,7,12,4,6,2,.00693697901442647,.5335165858268738,.3261427879333496,0,2,12,13,8,5,-1,12,13,4,5,2,.008280625566840172,.458039402961731,.5737829804420471,0,2,7,6,1,12,-1,7,12,1,6,2,-.0104395002126694,.2592320144176483,.5233827829360962,39.1072883605957,80,0,2,1,2,6,3,-1,4,2,3,3,2,.0072006587870419025,.325888603925705,.6849808096885681,0,3,9,5,6,10,-1,12,5,3,5,2,9,10,3,5,2,-.002859358908608556,.5838881134986877,.2537829875946045,0,3,5,5,8,12,-1,5,5,4,6,2,9,11,4,6,2,.0006858052802272141,.5708081722259521,.2812424004077911,0,2,0,7,20,6,-1,0,9,20,2,3,.007958019152283669,.2501051127910614,.5544260740280151,0,2,4,2,2,2,-1,4,3,2,1,2,-.0012124150525778532,.2385368049144745,.5433350205421448,0,2,4,18,12,2,-1,8,18,4,2,3,.00794261321425438,.3955070972442627,.6220757961273193,0,2,7,4,4,16,-1,7,12,4,8,2,.0024630590341985226,.5639708042144775,.2992357909679413,0,2,7,6,7,8,-1,7,10,7,4,2,-.006039659958332777,.218651294708252,.541167676448822,0,2,6,3,3,1,-1,7,3,1,1,3,-.0012988339876756072,.23507060110569,.5364584922790527,0,2,11,15,2,4,-1,11,17,2,2,2,.00022299369447864592,.380411297082901,.572960615158081,0,2,3,5,4,8,-1,3,9,4,4,2,.0014654280385002494,.2510167956352234,.5258268713951111,0,2,7,1,6,12,-1,7,7,6,6,2,-.0008121004211716354,.5992823839187622,.3851158916950226,0,2,4,6,6,2,-1,6,6,2,2,3,-.0013836020370945334,.5681396126747131,.3636586964130402,0,2,16,4,4,6,-1,16,6,4,2,3,-.0279364492744207,.1491317003965378,.5377560257911682,0,2,3,3,5,2,-1,3,4,5,1,2,-.0004691955109592527,.3692429959774017,.5572484731674194,0,2,9,11,2,3,-1,9,12,2,1,3,-.004982965998351574,.6758509278297424,.4532504081726074,0,2,2,16,4,2,-1,2,17,4,1,2,.001881530974060297,.5368022918701172,.2932539880275726,0,3,7,13,6,6,-1,10,13,3,3,2,7,16,3,3,2,-.0190675500780344,.1649377048015595,.5330067276954651,0,2,7,0,3,4,-1,8,0,1,4,3,-.0046906559728085995,.1963925957679749,.5119361877441406,0,2,8,15,4,3,-1,8,16,4,1,3,.005977713968604803,.467117190361023,.7008398175239563,0,2,0,4,4,6,-1,0,6,4,2,3,-.0333031304180622,.1155416965484619,.5104162096977234,0,2,5,6,12,3,-1,9,6,4,3,3,.0907441079616547,.5149660110473633,.1306173056364059,0,2,7,6,6,14,-1,9,6,2,14,3,.0009355589863844216,.3605481088161469,.543985903263092,0,2,9,7,3,3,-1,10,7,1,3,3,.0149016501381993,.4886212050914764,.7687569856643677,0,2,6,12,2,4,-1,6,14,2,2,2,.0006159411859698594,.5356813073158264,.3240939080715179,0,2,10,12,7,6,-1,10,14,7,2,3,-.0506709888577461,.1848621964454651,.5230404138565063,0,2,1,0,15,2,-1,1,1,15,1,2,.0006866574985906482,.3840579986572266,.5517945885658264,0,2,14,0,6,6,-1,14,0,3,6,2,.008371243253350258,.4288564026355743,.6131753921508789,0,2,5,3,3,1,-1,6,3,1,1,3,-.0012953069526702166,.2913674116134644,.528073787689209,0,2,14,0,6,6,-1,14,0,3,6,2,-.0419416800141335,.7554799914360046,.4856030941009522,0,2,0,3,20,10,-1,0,8,20,5,2,-.0235293805599213,.2838279902935028,.5256081223487854,0,2,14,0,6,6,-1,14,0,3,6,2,.0408574491739273,.4870935082435608,.6277297139167786,0,2,0,0,6,6,-1,3,0,3,6,2,-.0254068691283464,.7099707722663879,.4575029015541077,0,2,19,15,1,2,-1,19,16,1,1,2,-.00041415440500713885,.4030886888504028,.5469412207603455,0,2,0,2,4,8,-1,2,2,2,8,2,.0218241196125746,.4502024054527283,.6768701076507568,0,3,2,1,18,4,-1,11,1,9,2,2,2,3,9,2,2,.0141140399500728,.5442860722541809,.3791700005531311,0,2,8,12,1,2,-1,8,13,1,1,2,6721459067193791e-20,.4200463891029358,.5873476266860962,0,3,5,2,10,6,-1,10,2,5,3,2,5,5,5,3,2,-.00794176384806633,.3792561888694763,.5585265755653381,0,2,9,7,2,4,-1,10,7,1,4,2,-.00721444096416235,.7253103852272034,.4603548943996429,0,2,9,7,3,3,-1,10,7,1,3,3,.002581733977422118,.4693301916122437,.5900238752365112,0,2,4,5,12,8,-1,8,5,4,8,3,.1340931951999664,.5149213075637817,.1808844953775406,0,2,15,15,4,3,-1,15,16,4,1,3,.0022962710354477167,.5399743914604187,.3717867136001587,0,2,8,18,3,1,-1,9,18,1,1,3,-.002157584996894002,.2408495992422104,.5148863792419434,0,2,9,13,4,3,-1,9,14,4,1,3,-.004919618833810091,.6573588252067566,.4738740026950836,0,2,7,13,4,3,-1,7,14,4,1,3,.0016267469618469477,.4192821979522705,.6303114295005798,0,2,19,15,1,2,-1,19,16,1,1,2,.00033413388882763684,.5540298223495483,.3702101111412048,0,2,0,15,8,4,-1,0,17,8,2,2,-.0266980808228254,.1710917949676514,.5101410746574402,0,2,9,3,6,4,-1,11,3,2,4,3,-.0305618792772293,.1904218047857285,.5168793797492981,0,2,8,14,4,3,-1,8,15,4,1,3,.002851154888048768,.4447506964206696,.6313853859901428,0,2,3,14,14,6,-1,3,16,14,2,3,-.0362114794552326,.2490727007389069,.5377349257469177,0,2,6,3,6,6,-1,6,6,6,3,2,-.002411518944427371,.5381243228912354,.3664236962795258,0,2,5,11,10,6,-1,5,14,10,3,2,-.0007725320174358785,.5530232191085815,.3541550040245056,0,2,3,10,3,4,-1,4,10,1,4,3,.0002948172914329916,.4132699072360992,.5667243003845215,0,2,13,9,2,2,-1,13,9,1,2,2,-.006233456078916788,.0987872332334518,.5198668837547302,0,2,5,3,6,4,-1,7,3,2,4,3,-.0262747295200825,.0911274924874306,.5028107166290283,0,2,9,7,3,3,-1,10,7,1,3,3,.005321226082742214,.4726648926734924,.6222720742225647,0,2,2,12,2,3,-1,2,13,2,1,3,-.004112905822694302,.2157457023859024,.5137804746627808,0,2,9,8,3,12,-1,9,12,3,4,3,.0032457809429615736,.5410770773887634,.3721776902675629,0,3,3,14,4,6,-1,3,14,2,3,2,5,17,2,3,2,-.0163597092032433,.7787874937057495,.4685291945934296,0,2,16,15,2,2,-1,16,16,2,1,2,.00032166109303943813,.5478987097740173,.4240373969078064,0,2,2,15,2,2,-1,2,16,2,1,2,.000644524407107383,.5330560803413391,.3501324951648712,0,2,8,12,4,3,-1,8,13,4,1,3,-.0078909732401371,.6923521161079407,.4726569056510925,0,2,0,7,20,1,-1,10,7,10,1,2,.048336211591959,.50559002161026,.0757492035627365,0,2,7,6,8,3,-1,7,6,4,3,2,-.000751781277358532,.3783741891384125,.5538573861122131,0,2,5,7,8,2,-1,9,7,4,2,2,-.002495391061529517,.3081651031970978,.5359612107276917,0,2,9,7,3,5,-1,10,7,1,5,3,-.0022385010961443186,.663395881652832,.4649342894554138,0,2,8,7,3,5,-1,9,7,1,5,3,-.0017988430336117744,.6596844792366028,.4347187876701355,0,2,11,1,3,5,-1,12,1,1,5,3,.008786091580986977,.523183286190033,.2315579950809479,0,2,6,2,3,6,-1,7,2,1,6,3,.003671538084745407,.520425021648407,.2977376878261566,0,2,14,14,6,5,-1,14,14,3,5,2,-.0353364497423172,.7238878011703491,.4861505031585693,0,2,9,8,2,2,-1,9,9,2,1,2,-.0006918924045749009,.3105022013187408,.5229824781417847,0,2,10,7,1,3,-1,10,8,1,1,3,-.003394610946998,.3138968050479889,.5210173726081848,0,3,6,6,2,2,-1,6,6,1,1,2,7,7,1,1,2,.0009856928372755647,.4536580145359039,.6585097908973694,0,3,2,11,18,4,-1,11,11,9,2,2,2,13,9,2,2,-.0501631014049053,.1804454028606415,.5198916792869568,0,3,6,6,2,2,-1,6,6,1,1,2,7,7,1,1,2,-.0022367259953171015,.7255702018737793,.4651359021663666,0,2,0,15,20,2,-1,0,16,20,1,2,.0007432628772221506,.4412921071052551,.5898545980453491,0,2,4,14,2,3,-1,4,15,2,1,3,-.0009348518215119839,.3500052988529205,.5366017818450928,0,2,8,14,4,3,-1,8,15,4,1,3,.0174979399889708,.4912194907665253,.8315284848213196,0,2,8,7,2,3,-1,8,8,2,1,3,-.0015200000489130616,.3570275902748108,.537056028842926,0,2,9,10,2,3,-1,9,11,2,1,3,.0007800394087098539,.4353772103786469,.5967335104942322,50.61048126220703,103,0,2,5,4,10,4,-1,5,6,10,2,2,-.00999455526471138,.6162583231925964,.3054533004760742,0,3,9,7,6,4,-1,12,7,3,2,2,9,9,3,2,2,-.001108522992581129,.5818294882774353,.3155578076839447,0,2,4,7,3,6,-1,4,9,3,2,3,.001036438043229282,.2552052140235901,.5692911744117737,0,3,11,15,4,4,-1,13,15,2,2,2,11,17,2,2,2,.000682113110087812,.3685089945793152,.5934931039810181,0,2,7,8,4,2,-1,7,9,4,1,2,-.0006805734010413289,.2332392036914825,.5474792122840881,0,2,13,1,4,3,-1,13,1,2,3,2,.0002606878988444805,.325745701789856,.5667545795440674,0,3,5,15,4,4,-1,5,15,2,2,2,7,17,2,2,2,.0005160737200640142,.3744716942310333,.5845472812652588,0,2,9,5,4,7,-1,9,5,2,7,2,.0008500752155669034,.3420371115207672,.5522807240486145,0,2,5,6,8,3,-1,9,6,4,3,2,-.0018607829697430134,.2804419994354248,.5375424027442932,0,2,9,9,2,2,-1,9,10,2,1,2,-.001503397012129426,.2579050958156586,.5498952269554138,0,2,7,15,5,3,-1,7,16,5,1,3,.0023478909861296415,.4175156056880951,.6313710808753967,0,2,11,10,4,3,-1,11,10,2,3,2,-.00028880240279249847,.5865169763565063,.4052666127681732,0,2,6,9,8,10,-1,6,14,8,5,2,.008940547704696655,.5211141109466553,.231865406036377,0,2,10,11,6,2,-1,10,11,3,2,2,-.0193277392536402,.2753432989120483,.5241525769233704,0,2,4,11,6,2,-1,7,11,3,2,2,-.0002020206011366099,.5722978711128235,.3677195906639099,0,2,11,3,8,1,-1,11,3,4,1,2,.002117906929925084,.4466108083724976,.5542430877685547,0,2,6,3,3,2,-1,7,3,1,2,3,-.0017743760254234076,.2813253104686737,.5300959944725037,0,2,14,5,6,5,-1,14,5,3,5,2,.004223445896059275,.439970999956131,.5795428156852722,0,2,7,5,2,12,-1,7,11,2,6,2,-.0143752200528979,.2981117963790894,.5292059183120728,0,2,8,11,4,3,-1,8,12,4,1,3,-.0153491804376245,.7705215215682983,.4748171865940094,0,2,4,1,2,3,-1,5,1,1,3,2,15152279956964776e-21,.3718844056129456,.5576897263526917,0,2,18,3,2,6,-1,18,5,2,2,3,-.009129391983151436,.3615196049213409,.5286766886711121,0,2,0,3,2,6,-1,0,5,2,2,3,.0022512159775942564,.5364704728126526,.3486298024654388,0,2,9,12,2,3,-1,9,13,2,1,3,-.0049696918576955795,.6927651762962341,.4676836133003235,0,2,7,13,4,3,-1,7,14,4,1,3,-.0128290103748441,.7712153792381287,.4660735130310059,0,2,18,0,2,6,-1,18,2,2,2,3,-.009366006590425968,.3374983966350555,.5351287722587585,0,2,0,0,2,6,-1,0,2,2,2,3,.0032452319283038378,.5325189828872681,.3289610147476196,0,2,8,14,6,3,-1,8,15,6,1,3,-.0117235602810979,.6837652921676636,.4754300117492676,0,2,7,4,2,4,-1,8,4,1,4,2,2925794069597032e-20,.357208788394928,.5360502004623413,0,2,8,5,4,6,-1,8,7,4,2,3,-22244219508138485e-21,.5541427135467529,.3552064001560211,0,2,6,4,2,2,-1,7,4,1,2,2,.005088150966912508,.5070844292640686,.1256462037563324,0,3,3,14,14,4,-1,10,14,7,2,2,3,16,7,2,2,.0274296794086695,.5269560217857361,.1625818014144898,0,3,6,15,6,2,-1,6,15,3,1,2,9,16,3,1,2,-.00641428679227829,.7145588994026184,.4584197103977203,0,2,14,15,6,2,-1,14,16,6,1,2,.003347995923832059,.5398612022399902,.3494696915149689,0,2,2,12,12,8,-1,2,16,12,4,2,-.0826354920864105,.2439192980527878,.5160226225852966,0,2,7,7,7,2,-1,7,8,7,1,2,.0010261740535497665,.3886891901493073,.5767908096313477,0,2,0,2,18,2,-1,0,3,18,1,2,-.0016307090409100056,.3389458060264587,.5347700715065002,0,2,9,6,2,5,-1,9,6,1,5,2,.0024546680506318808,.4601413905620575,.638724684715271,0,2,7,5,3,8,-1,8,5,1,8,3,-.0009947651997208595,.5769879221916199,.4120396077632904,0,2,9,6,3,4,-1,10,6,1,4,3,.0154091902077198,.4878709018230438,.7089822292327881,0,2,4,13,3,2,-1,4,14,3,1,2,.001178440055809915,.5263553261756897,.2895244956016541,0,2,9,4,6,3,-1,11,4,2,3,3,-.0277019198983908,.149882897734642,.5219606757164001,0,2,5,4,6,3,-1,7,4,2,3,3,-.0295053999871016,.024893319234252,.4999816119670868,0,2,14,11,5,2,-1,14,12,5,1,2,.0004515943001024425,.5464622974395752,.4029662907123566,0,2,1,2,6,9,-1,3,2,2,9,3,.007177263963967562,.4271056950092316,.5866296887397766,0,2,14,6,6,13,-1,14,6,3,13,2,-.0741820484399796,.6874179244041443,.4919027984142304,0,3,3,6,14,8,-1,3,6,7,4,2,10,10,7,4,2,-.0172541607171297,.3370676040649414,.534873902797699,0,2,16,0,4,11,-1,16,0,2,11,2,.0148515598848462,.4626792967319489,.6129904985427856,0,3,3,4,12,12,-1,3,4,6,6,2,9,10,6,6,2,.0100020002573729,.5346122980117798,.3423453867435455,0,2,11,4,5,3,-1,11,5,5,1,3,.0020138120744377375,.4643830060958862,.5824304223060608,0,2,4,11,4,2,-1,4,12,4,1,2,.0015135470312088728,.5196396112442017,.2856149971485138,0,2,10,7,2,2,-1,10,7,1,2,2,.003138143103569746,.4838162958621979,.5958529710769653,0,2,8,7,2,2,-1,9,7,1,2,2,-.005145044066011906,.8920302987098694,.4741412103176117,0,2,9,17,3,2,-1,10,17,1,2,3,-.004473670851439238,.2033942937850952,.5337278842926025,0,2,5,6,3,3,-1,5,7,3,1,3,.001962847076356411,.457163393497467,.6725863218307495,0,2,10,0,3,3,-1,11,0,1,3,3,.005426045041531324,.5271108150482178,.2845670878887177,0,3,5,6,6,2,-1,5,6,3,1,2,8,7,3,1,2,.0004961146041750908,.4138312935829163,.5718597769737244,0,2,12,16,4,3,-1,12,17,4,1,3,.009372878819704056,.5225151181221008,.2804847061634064,0,2,3,12,3,2,-1,3,13,3,1,2,.0006050089723430574,.523676872253418,.3314523994922638,0,2,9,12,3,2,-1,9,13,3,1,2,.0005679255118593574,.4531059861183167,.6276971101760864,0,3,1,11,16,4,-1,1,11,8,2,2,9,13,8,2,2,.0246443394571543,.5130851864814758,.2017143964767456,0,2,12,4,3,3,-1,12,5,3,1,3,-.0102904504165053,.7786595225334167,.4876641035079956,0,2,4,4,5,3,-1,4,5,5,1,3,.002062941901385784,.4288598895072937,.5881264209747314,0,2,12,16,4,3,-1,12,17,4,1,3,-.005051948130130768,.3523977994918823,.5286008715629578,0,2,5,4,3,3,-1,5,5,3,1,3,-.0057692620903253555,.6841086149215698,.4588094055652618,0,2,9,0,2,2,-1,9,1,2,1,2,-.0004578994121402502,.356552004814148,.5485978126525879,0,2,8,9,4,2,-1,8,10,4,1,2,-.0007591883768327534,.336879312992096,.5254197120666504,0,2,8,8,4,3,-1,8,9,4,1,3,-.001773725962266326,.3422161042690277,.5454015135765076,0,2,0,13,6,3,-1,2,13,2,3,3,-.008561046794056892,.6533612012863159,.4485856890678406,0,2,16,14,3,2,-1,16,15,3,1,2,.0017277270089834929,.5307580232620239,.3925352990627289,0,2,1,18,18,2,-1,7,18,6,2,3,-.0281996093690395,.685745894908905,.4588584005832672,0,2,16,14,3,2,-1,16,15,3,1,2,-.001778110978193581,.4037851095199585,.5369856953620911,0,2,1,14,3,2,-1,1,15,3,1,2,.00033177141449414194,.539979875087738,.3705750107765198,0,2,7,14,6,3,-1,7,15,6,1,3,.0026385399978607893,.4665437042713165,.6452730894088745,0,2,5,14,8,3,-1,5,15,8,1,3,-.0021183069329708815,.5914781093597412,.4064677059650421,0,2,10,6,4,14,-1,10,6,2,14,2,-.0147732896730304,.3642038106918335,.5294762849807739,0,2,6,6,4,14,-1,8,6,2,14,2,-.0168154407292604,.2664231956005096,.5144972801208496,0,2,13,5,2,3,-1,13,6,2,1,3,-.006337014026939869,.6779531240463257,.4852097928524017,0,2,7,16,6,1,-1,9,16,2,1,3,-44560048991115764e-21,.5613964796066284,.4153054058551788,0,2,9,12,3,3,-1,9,13,3,1,3,-.0010240620467811823,.5964478254318237,.4566304087638855,0,2,7,0,3,3,-1,8,0,1,3,3,-.00231616897508502,.2976115047931671,.5188159942626953,0,2,4,0,16,18,-1,4,9,16,9,2,.5321757197380066,.5187839269638062,.220263198018074,0,2,1,1,16,14,-1,1,8,16,7,2,-.1664305031299591,.1866022944450378,.5060343146324158,0,2,3,9,15,4,-1,8,9,5,4,3,.112535297870636,.5212125182151794,.1185022965073586,0,2,6,12,7,3,-1,6,13,7,1,3,.009304686449468136,.4589937031269074,.6826149225234985,0,2,14,15,2,3,-1,14,16,2,1,3,-.004625509958714247,.3079940974712372,.5225008726119995,0,3,2,3,16,14,-1,2,3,8,7,2,10,10,8,7,2,-.1111646965146065,.2101044058799744,.5080801844596863,0,3,16,2,4,18,-1,18,2,2,9,2,16,11,2,9,2,-.0108884396031499,.5765355229377747,.4790464043617249,0,2,4,15,2,3,-1,4,16,2,1,3,.005856430158019066,.5065100193023682,.1563598960638046,0,3,16,2,4,18,-1,18,2,2,9,2,16,11,2,9,2,.0548543892800808,.49669149518013,.7230510711669922,0,2,1,1,8,3,-1,1,2,8,1,3,-.0111973397433758,.2194979041814804,.5098798274993896,0,2,8,11,4,3,-1,8,12,4,1,3,.004406907130032778,.4778401851654053,.6770902872085571,0,2,5,11,5,9,-1,5,14,5,3,3,-.0636652931571007,.1936362981796265,.5081024169921875,0,2,16,0,4,11,-1,16,0,2,11,2,-.009808149188756943,.599906325340271,.4810341000556946,0,2,7,0,6,1,-1,9,0,2,1,3,-.0021717099007219076,.3338333964347839,.5235472917556763,0,2,16,3,3,7,-1,17,3,1,7,3,-.0133155202493072,.6617069840431213,.4919213056564331,0,2,1,3,3,7,-1,2,3,1,7,3,.002544207964092493,.4488744139671326,.6082184910774231,0,2,7,8,6,12,-1,7,12,6,4,3,.0120378397405148,.540939211845398,.3292432129383087,0,2,0,0,4,11,-1,2,0,2,11,2,-.0207010507583618,.6819120049476624,.4594995975494385,0,2,14,0,6,20,-1,14,0,3,20,2,.0276082791388035,.4630792140960693,.5767282843589783,0,2,0,3,1,2,-1,0,4,1,1,2,.0012370620388537645,.5165379047393799,.2635016143321991,0,3,5,5,10,8,-1,10,5,5,4,2,5,9,5,4,2,-.037669338285923,.2536393105983734,.5278980135917664,0,3,4,7,12,4,-1,4,7,6,2,2,10,9,6,2,2,-.0018057259730994701,.3985156118869782,.5517500042915344,54.62007141113281,111,0,2,2,1,6,4,-1,5,1,3,4,2,.004429902881383896,.2891018092632294,.633522629737854,0,3,9,7,6,4,-1,12,7,3,2,2,9,9,3,2,2,-.0023813319858163595,.621178925037384,.3477487862110138,0,2,5,6,2,6,-1,5,9,2,3,2,.0022915711160749197,.2254412025213242,.5582118034362793,0,3,9,16,6,4,-1,12,16,3,2,2,9,18,3,2,2,.0009945794008672237,.3711710870265961,.5930070877075195,0,2,9,4,2,12,-1,9,10,2,6,2,.0007716466789133847,.565172016620636,.334799587726593,0,2,7,1,6,18,-1,9,1,2,18,3,-.001138641033321619,.3069126009941101,.5508630871772766,0,2,4,12,12,2,-1,8,12,4,2,3,-.0001640303962631151,.576282799243927,.3699047863483429,0,2,8,8,6,2,-1,8,9,6,1,2,29793529392918572e-21,.2644244134426117,.5437911152839661,0,2,8,0,3,6,-1,9,0,1,6,3,.008577490225434303,.5051138997077942,.1795724928379059,0,2,11,18,3,2,-1,11,19,3,1,2,-.0002603268949314952,.5826969146728516,.4446826875209808,0,2,1,1,17,4,-1,1,3,17,2,2,-.006140463054180145,.3113852143287659,.5346971750259399,0,2,11,8,4,12,-1,11,8,2,12,2,-.0230869501829147,.32779461145401,.533119797706604,0,2,8,14,4,3,-1,8,15,4,1,3,-.0142436502501369,.7381709814071655,.4588063061237335,0,2,12,3,2,17,-1,12,3,1,17,2,.0194871295243502,.5256630778312683,.2274471968412399,0,2,4,7,6,1,-1,6,7,2,1,3,-.0009668110869824886,.5511230826377869,.3815006911754608,0,2,18,3,2,3,-1,18,4,2,1,3,.003147470997646451,.5425636768341064,.2543726861476898,0,2,8,4,3,4,-1,8,6,3,2,2,-.00018026070029009134,.5380191802978516,.3406304121017456,0,2,4,5,12,10,-1,4,10,12,5,2,-.006026626098901033,.3035801947116852,.54205721616745,0,2,5,18,4,2,-1,7,18,2,2,2,.00044462960795499384,.3990997076034546,.5660110116004944,0,2,17,2,3,6,-1,17,4,3,2,3,.002260976005345583,.5562806725502014,.3940688073635101,0,2,7,7,6,6,-1,9,7,2,6,3,.0511330589652061,.4609653949737549,.7118561863899231,0,2,17,2,3,6,-1,17,4,3,2,3,-.0177863091230392,.2316166013479233,.5322144031524658,0,2,8,0,3,4,-1,9,0,1,4,3,-.004967962857335806,.233077198266983,.5122029185295105,0,2,9,14,2,3,-1,9,15,2,1,3,.002066768938675523,.4657444059848785,.6455488204956055,0,2,0,12,6,3,-1,0,13,6,1,3,.007441376801580191,.5154392123222351,.236163392663002,0,2,8,14,4,3,-1,8,15,4,1,3,-.003627727972343564,.6219773292541504,.4476661086082459,0,2,3,12,2,3,-1,3,13,2,1,3,-.005353075917810202,.1837355047464371,.5102208256721497,0,2,5,6,12,7,-1,9,6,4,7,3,.1453091949224472,.5145987272262573,.1535930931568146,0,2,0,2,3,6,-1,0,4,3,2,3,.0024394490756094456,.5343660116195679,.3624661862850189,0,2,14,6,1,3,-1,14,7,1,1,3,-.003128339070826769,.6215007901191711,.4845592081546783,0,2,2,0,3,14,-1,3,0,1,14,3,.0017940260004252195,.4299261868000031,.5824198126792908,0,2,12,14,5,6,-1,12,16,5,2,3,.0362538211047649,.5260334014892578,.1439467966556549,0,2,4,14,5,6,-1,4,16,5,2,3,-.005174672231078148,.350653886795044,.5287045240402222,0,3,11,10,2,2,-1,12,10,1,1,2,11,11,1,1,2,.0006538329762406647,.4809640944004059,.6122040152549744,0,2,5,0,3,14,-1,6,0,1,14,3,-.0264802295714617,.1139362007379532,.5045586228370667,0,2,10,15,2,3,-1,10,16,2,1,3,-.0030440660193562508,.6352095007896423,.4794734120368958,0,2,0,2,2,3,-1,0,3,2,1,3,.0036993520334362984,.5131118297576904,.2498510926961899,0,2,5,11,12,6,-1,5,14,12,3,2,-.0003676293126773089,.54213947057724,.3709532022476196,0,2,6,11,3,9,-1,6,14,3,3,3,-.041382260620594,.1894959956407547,.5081691741943359,0,3,11,10,2,2,-1,12,10,1,1,2,11,11,1,1,2,-.0010532729793339968,.645436704158783,.4783608913421631,0,2,5,6,1,3,-1,5,7,1,1,3,-.0021648600231856108,.6215031147003174,.449982613325119,0,2,4,9,13,3,-1,4,10,13,1,3,-.0005674774874933064,.3712610900402069,.5419334769248962,0,2,1,7,15,6,-1,6,7,5,6,3,.173758402466774,.5023643970489502,.1215742006897926,0,2,4,5,12,6,-1,8,5,4,6,3,-.0029049699660390615,.3240267932415009,.5381883978843689,0,2,8,10,4,3,-1,8,11,4,1,3,.0012299539521336555,.4165507853031158,.5703486204147339,0,2,15,14,1,3,-1,15,15,1,1,3,-.0005432923790067434,.3854042887687683,.554754912853241,0,2,1,11,5,3,-1,1,12,5,1,3,-.008329725824296474,.2204494029283524,.5097082853317261,0,2,7,1,7,12,-1,7,7,7,6,2,-.00010417630255687982,.560706615447998,.4303036034107208,0,3,0,1,6,10,-1,0,1,3,5,2,3,6,3,5,2,.0312047004699707,.4621657133102417,.6982004046440125,0,2,16,1,4,3,-1,16,2,4,1,3,.007894350215792656,.5269594192504883,.226906806230545,0,2,5,5,2,3,-1,5,6,2,1,3,-.004364531021565199,.6359223127365112,.4537956118583679,0,2,12,2,3,5,-1,13,2,1,5,3,.007679305970668793,.5274767875671387,.274048388004303,0,2,0,3,4,6,-1,0,5,4,2,3,-.0254311393946409,.2038519978523254,.5071732997894287,0,2,8,12,4,2,-1,8,13,4,1,2,.0008200060110539198,.4587455093860626,.6119868159294128,0,2,8,18,3,1,-1,9,18,1,1,3,.002928460016846657,.5071274042129517,.2028204947710037,0,3,11,10,2,2,-1,12,10,1,1,2,11,11,1,1,2,4525647091213614e-20,.4812104105949402,.5430821776390076,0,3,7,10,2,2,-1,7,10,1,1,2,8,11,1,1,2,.0013158309739083052,.4625813961029053,.6779323220252991,0,2,11,11,4,4,-1,11,13,4,2,2,.0015870389761403203,.5386291742324829,.3431465029716492,0,2,8,12,3,8,-1,9,12,1,8,3,-.0215396601706743,.025942500680685,.5003222823143005,0,2,13,0,6,3,-1,13,1,6,1,3,.014334480278194,.5202844738960266,.1590632945299149,0,2,8,8,3,4,-1,9,8,1,4,3,-.008388138376176357,.728248119354248,.4648044109344482,0,3,5,7,10,10,-1,10,7,5,5,2,5,12,5,5,2,.00919068418443203,.556235671043396,.3923191130161285,0,3,3,18,8,2,-1,3,18,4,1,2,7,19,4,1,2,-.005845305975526571,.6803392767906189,.4629127979278565,0,2,10,2,6,8,-1,12,2,2,8,3,-.0547077991068363,.2561671137809753,.5206125974655151,0,2,4,2,6,8,-1,6,2,2,8,3,.009114277549088001,.518962025642395,.3053877055644989,0,2,11,0,3,7,-1,12,0,1,7,3,-.0155750000849366,.1295074969530106,.5169094800949097,0,2,7,11,2,1,-1,8,11,1,1,2,-.0001205060034408234,.5735098123550415,.4230825006961823,0,2,15,14,1,3,-1,15,15,1,1,3,.0012273970060050488,.5289878249168396,.4079791903495789,0,3,7,15,2,2,-1,7,15,1,1,2,8,16,1,1,2,-.0012186600361019373,.6575639843940735,.4574409127235413,0,2,15,14,1,3,-1,15,15,1,1,3,-.0033256649039685726,.3628047108650208,.5195019841194153,0,2,6,0,3,7,-1,7,0,1,7,3,-.0132883097976446,.1284265965223312,.504348874092102,0,2,18,1,2,7,-1,18,1,1,7,2,-.0033839771058410406,.6292240023612976,.475750595331192,0,2,2,0,8,20,-1,2,10,8,10,2,-.2195422053337097,.148773193359375,.5065013766288757,0,2,3,0,15,6,-1,3,2,15,2,3,.004911170806735754,.425610214471817,.5665838718414307,0,2,4,3,12,2,-1,4,4,12,1,2,-.00018744950648397207,.4004144072532654,.5586857199668884,0,2,16,0,4,5,-1,16,0,2,5,2,-.00521786417812109,.6009116172790527,.4812706112861633,0,2,7,0,3,4,-1,8,0,1,4,3,-.0011111519997939467,.3514933884143829,.5287089943885803,0,2,16,0,4,5,-1,16,0,2,5,2,.004403640050441027,.4642275869846344,.5924085974693298,0,2,1,7,6,13,-1,3,7,2,13,3,.1229949966073036,.5025529265403748,.0691524818539619,0,2,16,0,4,5,-1,16,0,2,5,2,-.0123135102912784,.5884591937065125,.4934012889862061,0,2,0,0,4,5,-1,2,0,2,5,2,.004147103987634182,.4372239112854004,.589347779750824,0,2,14,12,3,6,-1,14,14,3,2,3,-.003550264984369278,.4327551126480103,.5396270155906677,0,2,3,12,3,6,-1,3,14,3,2,3,-.0192242693156004,.1913134008646011,.5068330764770508,0,2,16,1,4,3,-1,16,2,4,1,3,.0014395059552043676,.5308178067207336,.424353301525116,0,3,8,7,2,10,-1,8,7,1,5,2,9,12,1,5,2,-.00677519990131259,.6365395784378052,.4540086090564728,0,2,11,11,4,4,-1,11,13,4,2,2,.007011963054537773,.5189834237098694,.302619993686676,0,2,0,1,4,3,-1,0,2,4,1,3,.005401465110480785,.5105062127113342,.2557682991027832,0,2,13,4,1,3,-1,13,5,1,1,3,.0009027498890645802,.4696914851665497,.5861827731132507,0,2,7,15,3,5,-1,8,15,1,5,3,.0114744501188397,.5053645968437195,.152717798948288,0,2,9,7,3,5,-1,10,7,1,5,3,-.006702343001961708,.6508980989456177,.4890604019165039,0,2,8,7,3,5,-1,9,7,1,5,3,-.0020462959073483944,.6241816878318787,.4514600038528442,0,2,10,6,4,14,-1,10,6,2,14,2,-.009995156899094582,.3432781100273132,.5400953888893127,0,2,0,5,5,6,-1,0,7,5,2,3,-.0357007086277008,.1878059059381485,.5074077844619751,0,2,9,5,6,4,-1,9,5,3,4,2,.0004558456130325794,.3805277049541473,.5402569770812988,0,2,0,0,18,10,-1,6,0,6,10,3,-.0542606003582478,.6843714714050293,.4595097005367279,0,2,10,6,4,14,-1,10,6,2,14,2,.0060600461438298225,.5502905249595642,.450052797794342,0,2,6,6,4,14,-1,8,6,2,14,2,-.006479183211922646,.3368858098983765,.5310757160186768,0,2,13,4,1,3,-1,13,5,1,1,3,-.0014939469983801246,.6487640142440796,.4756175875663757,0,2,5,1,2,3,-1,6,1,1,3,2,14610530342906713e-21,.403457909822464,.5451064109802246,0,3,18,1,2,18,-1,19,1,1,9,2,18,10,1,9,2,-.00723219383507967,.6386873722076416,.4824739992618561,0,2,2,1,4,3,-1,2,2,4,1,3,-.004064581822603941,.2986421883106232,.5157335996627808,0,3,18,1,2,18,-1,19,1,1,9,2,18,10,1,9,2,.0304630808532238,.5022199749946594,.7159956097602844,0,3,1,14,4,6,-1,1,14,2,3,2,3,17,2,3,2,-.008054491132497787,.6492452025413513,.4619275033473969,0,2,10,11,7,6,-1,10,13,7,2,3,.0395051389932632,.5150570869445801,.2450613975524902,0,3,0,10,6,10,-1,0,10,3,5,2,3,15,3,5,2,.008453020825982094,.4573669135570526,.6394037008285522,0,2,11,0,3,4,-1,12,0,1,4,3,-.0011688120430335402,.3865512013435364,.548366129398346,0,2,5,10,5,6,-1,5,13,5,3,2,.002807067008689046,.5128579139709473,.2701480090618134,0,2,14,6,1,8,-1,14,10,1,4,2,.000473652093205601,.4051581919193268,.5387461185455322,0,3,1,7,18,6,-1,1,7,9,3,2,10,10,9,3,2,.0117410803213716,.5295950174331665,.3719413876533508,0,2,9,7,2,2,-1,9,7,1,2,2,.0031833238899707794,.4789406955242157,.6895126104354858,0,2,5,9,4,5,-1,7,9,2,5,2,.0007024150108918548,.5384489297866821,.3918080925941467,50.16973114013672,102,0,2,7,6,6,3,-1,9,6,2,3,3,.0170599296689034,.3948527872562408,.7142534852027893,0,2,1,0,18,4,-1,7,0,6,4,3,.0218408405780792,.3370316028594971,.6090016961097717,0,2,7,15,2,4,-1,7,17,2,2,2,.00024520049919374287,.3500576019287109,.5987902283668518,0,2,1,0,19,9,-1,1,3,19,3,3,.008327260613441467,.3267528116703033,.5697240829467773,0,2,3,7,3,6,-1,3,9,3,2,3,.0005714829894714057,.3044599890708923,.5531656742095947,0,3,13,7,4,4,-1,15,7,2,2,2,13,9,2,2,2,.0006737398798577487,.3650012016296387,.567263126373291,0,3,3,7,4,4,-1,3,7,2,2,2,5,9,2,2,2,3468159047770314e-20,.3313541114330292,.5388727188110352,0,2,9,6,10,8,-1,9,10,10,4,2,-.005856339819729328,.2697942852973938,.5498778820037842,0,2,3,8,14,12,-1,3,14,14,6,2,.00851022731512785,.5269358158111572,.2762879133224487,0,3,6,5,10,12,-1,11,5,5,6,2,6,11,5,6,2,-.0698172077536583,.2909603118896484,.5259246826171875,0,2,9,11,2,3,-1,9,12,2,1,3,-.0008611367084085941,.5892577171325684,.4073697924613953,0,2,9,5,6,5,-1,9,5,3,5,2,.0009714924963191152,.3523564040660858,.5415862202644348,0,2,9,4,2,4,-1,9,6,2,2,2,-1472749045206001e-20,.5423017740249634,.3503156006336212,0,2,9,5,6,5,-1,9,5,3,5,2,.0484202913939953,.51939457654953,.3411195874214172,0,2,5,5,6,5,-1,8,5,3,5,2,.0013257140526548028,.315776914358139,.5335376262664795,0,2,11,2,6,1,-1,13,2,2,1,3,1492214960308047e-20,.4451299905776978,.5536553859710693,0,2,3,2,6,1,-1,5,2,2,1,3,-.002717339899390936,.3031741976737976,.5248088836669922,0,2,13,5,2,3,-1,13,6,2,1,3,.0029219500720500946,.4781453013420105,.6606041789054871,0,2,0,10,1,4,-1,0,12,1,2,2,-.0019804988987743855,.3186308145523071,.5287625193595886,0,2,13,5,2,3,-1,13,6,2,1,3,-.004001210909336805,.6413596868515015,.4749928116798401,0,2,8,18,3,2,-1,9,18,1,2,3,-.004349199123680592,.1507498025894165,.5098996758460999,0,2,6,15,9,2,-1,6,16,9,1,2,.0013490889687091112,.4316158890724182,.5881167054176331,0,2,8,14,4,3,-1,8,15,4,1,3,.0185970701277256,.4735553860664368,.9089794158935547,0,2,18,4,2,4,-1,18,6,2,2,2,-.001856237999163568,.3553189039230347,.5577837228775024,0,2,5,5,2,3,-1,5,6,2,1,3,.002294043079018593,.4500094950199127,.6580877900123596,0,2,15,16,3,2,-1,15,17,3,1,2,.00029982850537635386,.5629242062568665,.3975878953933716,0,2,0,0,3,9,-1,0,3,3,3,3,.0035455459728837013,.5381547212600708,.3605485856533051,0,2,9,7,3,3,-1,9,8,3,1,3,.009610472247004509,.5255997180938721,.1796745955944061,0,2,8,7,3,3,-1,8,8,3,1,3,-.0062783220782876015,.227285698056221,.5114030241966248,0,2,9,5,2,6,-1,9,5,1,6,2,.0034598479978740215,.4626308083534241,.6608219146728516,0,2,8,6,3,4,-1,9,6,1,4,3,-.0013112019514665008,.6317539811134338,.4436857998371124,0,3,7,6,8,12,-1,11,6,4,6,2,7,12,4,6,2,.002687617903575301,.5421109795570374,.4054022133350372,0,3,5,6,8,12,-1,5,6,4,6,2,9,12,4,6,2,.003911816980689764,.5358477830886841,.3273454904556274,0,2,12,4,3,3,-1,12,5,3,1,3,-.014206450432539,.7793576717376709,.4975781142711639,0,2,2,16,3,2,-1,2,17,3,1,2,.0007170552853494883,.5297319889068604,.3560903966426849,0,2,12,4,3,3,-1,12,5,3,1,3,.001663501956500113,.467809408903122,.5816481709480286,0,2,2,12,6,6,-1,2,14,6,2,3,.0033686188980937004,.5276734232902527,.3446420133113861,0,2,7,13,6,3,-1,7,14,6,1,3,.0127995302900672,.4834679961204529,.7472159266471863,0,2,6,14,6,3,-1,6,15,6,1,3,.0033901201095432043,.4511859118938446,.6401721239089966,0,2,14,15,5,3,-1,14,16,5,1,3,.004707077983766794,.533565878868103,.355522096157074,0,2,5,4,3,3,-1,5,5,3,1,3,.0014819339849054813,.4250707030296326,.5772724151611328,0,2,14,15,5,3,-1,14,16,5,1,3,-.0069995759986341,.3003320097923279,.5292900204658508,0,2,5,3,6,2,-1,7,3,2,2,3,.0159390103071928,.5067319273948669,.1675581932067871,0,2,8,15,4,3,-1,8,16,4,1,3,.007637734990566969,.4795069992542267,.7085601091384888,0,2,1,15,5,3,-1,1,16,5,1,3,.006733404006808996,.5133113265037537,.2162470072507858,0,3,8,13,4,6,-1,10,13,2,3,2,8,16,2,3,2,-.012858809903264,.1938841938972473,.525137186050415,0,2,7,8,3,3,-1,8,8,1,3,3,-.0006227080011740327,.5686538219451904,.419786810874939,0,2,12,0,5,4,-1,12,2,5,2,2,-.0005265168147161603,.4224168956279755,.5429695844650269,0,3,0,2,20,2,-1,0,2,10,1,2,10,3,10,1,2,.0110750999301672,.5113775134086609,.2514517903327942,0,2,1,0,18,4,-1,7,0,6,4,3,-.0367282517254353,.7194662094116211,.4849618971347809,0,2,4,3,6,1,-1,6,3,2,1,3,-.00028207109426148236,.3840261995792389,.539444625377655,0,2,4,18,13,2,-1,4,19,13,1,2,-.0027489690110087395,.593708872795105,.4569182097911835,0,2,2,10,3,6,-1,2,12,3,2,3,.0100475195795298,.5138576030731201,.2802298069000244,0,3,14,12,6,8,-1,17,12,3,4,2,14,16,3,4,2,-.008149784058332443,.6090037226676941,.4636121094226837,0,3,4,13,10,6,-1,4,13,5,3,2,9,16,5,3,2,-.006883388850837946,.3458611071109772,.5254660248756409,0,2,14,12,1,2,-1,14,13,1,1,2,-140393603942357e-19,.5693104267120361,.4082083106040955,0,2,8,13,4,3,-1,8,14,4,1,3,.001549841952510178,.4350537061691284,.5806517004966736,0,2,14,12,2,2,-1,14,13,2,1,2,-.006784149911254644,.1468873023986816,.5182775259017944,0,2,4,12,2,2,-1,4,13,2,1,2,.00021705629478674382,.5293524265289307,.345617413520813,0,2,8,12,9,2,-1,8,13,9,1,2,.00031198898795992136,.4652450978755951,.5942413806915283,0,2,9,14,2,3,-1,9,15,2,1,3,.005450753029435873,.4653508961200714,.7024846076965332,0,2,11,10,3,6,-1,11,13,3,3,2,-.00025818689027801156,.5497295260429382,.3768967092037201,0,2,5,6,9,12,-1,5,12,9,6,2,-.0174425393342972,.3919087946414948,.5457497835159302,0,2,11,10,3,6,-1,11,13,3,3,2,-.045343529433012,.1631357073783875,.5154908895492554,0,2,6,10,3,6,-1,6,13,3,3,2,.0019190689781680703,.514589786529541,.2791895866394043,0,2,5,4,11,3,-1,5,5,11,1,3,-.006017786916345358,.6517636179924011,.4756332933902741,0,2,7,1,5,10,-1,7,6,5,5,2,-.004072073847055435,.5514652729034424,.4092685878276825,0,2,2,8,18,2,-1,2,9,18,1,2,.00039855059003457427,.316524088382721,.5285550951957703,0,2,7,17,5,3,-1,7,18,5,1,3,-.0065418570302426815,.6853377819061279,.4652808904647827,0,2,5,9,12,1,-1,9,9,4,1,3,.003484508953988552,.5484588146209717,.4502759873867035,0,3,0,14,6,6,-1,0,14,3,3,2,3,17,3,3,2,-.0136967804282904,.6395779848098755,.4572555124759674,0,2,5,9,12,1,-1,9,9,4,1,3,-.017347140237689,.2751072943210602,.5181614756584167,0,2,3,9,12,1,-1,7,9,4,1,3,-.004088542889803648,.3325636088848114,.5194984078407288,0,2,14,10,6,7,-1,14,10,3,7,2,-.009468790143728256,.5942280888557434,.485181987285614,0,2,1,0,16,2,-1,1,1,16,1,2,.0017084840219467878,.4167110919952393,.5519806146621704,0,2,10,9,10,9,-1,10,12,10,3,3,.009480909444391727,.5433894991874695,.4208514988422394,0,2,0,1,10,2,-1,5,1,5,2,2,-.004738965071737766,.6407189965248108,.4560655057430267,0,2,17,3,2,3,-1,17,4,2,1,3,.006576105020940304,.5214555263519287,.2258227020502091,0,2,1,3,2,3,-1,1,4,2,1,3,-.0021690549328923225,.3151527941226959,.5156704783439636,0,2,9,7,3,6,-1,10,7,1,6,3,.014660170301795,.4870837032794952,.668994128704071,0,2,6,5,4,3,-1,8,5,2,3,2,.00017231999663636088,.3569748997688294,.5251078009605408,0,2,7,5,6,6,-1,9,5,2,6,3,-.0218037609010935,.8825920820236206,.496632993221283,0,3,3,4,12,12,-1,3,4,6,6,2,9,10,6,6,2,-.0947361066937447,.1446162015199661,.5061113834381104,0,2,9,2,6,15,-1,11,2,2,15,3,.0055825551971793175,.5396478772163391,.4238066077232361,0,2,2,2,6,17,-1,4,2,2,17,3,.001951709040440619,.4170410931110382,.5497786998748779,0,2,14,10,6,7,-1,14,10,3,7,2,.0121499001979828,.4698367118835449,.5664274096488953,0,2,0,10,6,7,-1,3,10,3,7,2,-.007516962010413408,.6267772912979126,.4463135898113251,0,2,9,2,6,15,-1,11,2,2,15,3,-.0716679096221924,.3097011148929596,.5221003293991089,0,2,5,2,6,15,-1,7,2,2,15,3,-.0882924199104309,.0811238884925842,.5006365180015564,0,2,17,9,3,6,-1,17,11,3,2,3,.0310630798339844,.5155503749847412,.1282255947589874,0,2,6,7,6,6,-1,8,7,2,6,3,.0466218404471874,.4699777960777283,.736396074295044,0,3,1,10,18,6,-1,10,10,9,3,2,1,13,9,3,2,-.0121894897893071,.3920530080795288,.5518996715545654,0,2,0,9,10,9,-1,0,12,10,3,3,.0130161102861166,.5260658264160156,.3685136139392853,0,2,8,15,4,3,-1,8,16,4,1,3,-.003495289944112301,.6339294910430908,.4716280996799469,0,2,5,12,3,4,-1,5,14,3,2,2,-4401503974804655e-20,.5333027243614197,.3776184916496277,0,2,3,3,16,12,-1,3,9,16,6,2,-.1096649020910263,.1765342056751251,.5198346972465515,0,3,1,1,12,12,-1,1,1,6,6,2,7,7,6,6,2,-.0009027955820783973,.5324159860610962,.3838908076286316,0,3,10,4,2,4,-1,11,4,1,2,2,10,6,1,2,2,.0007112664170563221,.4647929966449738,.5755224227905273,0,3,0,9,10,2,-1,0,9,5,1,2,5,10,5,1,2,-.003125027986243367,.323670893907547,.5166770815849304,0,2,9,11,3,3,-1,9,12,3,1,3,.002414467977359891,.4787439107894898,.6459717750549316,0,2,3,12,9,2,-1,3,13,9,1,2,.00044391240226104856,.4409308135509491,.6010255813598633,0,2,9,9,2,2,-1,9,10,2,1,2,-.0002261118934256956,.4038113951683044,.5493255853652954,66.66912078857422,135,0,2,3,4,13,6,-1,3,6,13,2,3,-.0469012893736362,.660017192363739,.3743801116943359,0,3,9,7,6,4,-1,12,7,3,2,2,9,9,3,2,2,-.001456834957934916,.578399121761322,.3437797129154205,0,2,1,0,6,8,-1,4,0,3,8,2,.005559836979955435,.3622266948223114,.5908216238021851,0,2,9,5,2,12,-1,9,11,2,6,2,.0007317048730328679,.550041913986206,.2873558104038239,0,2,4,4,3,10,-1,4,9,3,5,2,.001331800944171846,.267316997051239,.5431019067764282,0,2,6,17,8,3,-1,6,18,8,1,3,.00024347059661522508,.3855027854442596,.574138879776001,0,2,0,5,10,6,-1,0,7,10,2,3,-.0030512469820678234,.5503209829330444,.3462845087051392,0,2,13,2,3,2,-1,13,3,3,1,2,-.0006865719915367663,.3291221857070923,.5429509282112122,0,2,7,5,4,5,-1,9,5,2,5,2,.001466820016503334,.3588382005691528,.5351811051368713,0,2,12,14,3,6,-1,12,16,3,2,3,.0003202187072020024,.429684191942215,.5700234174728394,0,2,1,11,8,2,-1,1,12,8,1,2,.0007412218837998807,.5282164812088013,.3366870880126953,0,2,7,13,6,3,-1,7,14,6,1,3,.0038330298848450184,.4559567868709564,.6257336139678955,0,2,0,5,3,6,-1,0,7,3,2,3,-.0154564399272203,.2350116968154907,.512945294380188,0,2,13,2,3,2,-1,13,3,3,1,2,.002679677912965417,.5329415202140808,.4155062139034271,0,3,4,14,4,6,-1,4,14,2,3,2,6,17,2,3,2,.0028296569362282753,.4273087978363037,.5804538130760193,0,2,13,2,3,2,-1,13,3,3,1,2,-.0039444249123334885,.2912611961364746,.5202686190605164,0,2,8,2,4,12,-1,8,6,4,4,3,.002717955969274044,.5307688117027283,.3585677146911621,0,3,14,0,6,8,-1,17,0,3,4,2,14,4,3,4,2,.005907762795686722,.470377504825592,.5941585898399353,0,2,7,17,3,2,-1,8,17,1,2,3,-.004224034957587719,.2141567021608353,.5088796019554138,0,2,8,12,4,2,-1,8,13,4,1,2,.0040725888684391975,.4766413867473602,.6841061115264893,0,3,6,0,8,12,-1,6,0,4,6,2,10,6,4,6,2,.0101495301350951,.5360798835754395,.3748497068881989,0,3,14,0,2,10,-1,15,0,1,5,2,14,5,1,5,2,-.00018864999583456665,.5720130205154419,.3853805065155029,0,3,5,3,8,6,-1,5,3,4,3,2,9,6,4,3,2,-.0048864358104765415,.3693122863769531,.5340958833694458,0,3,14,0,6,10,-1,17,0,3,5,2,14,5,3,5,2,.0261584799736738,.4962374866008759,.6059989929199219,0,2,9,14,1,2,-1,9,15,1,1,2,.0004856075975112617,.4438945949077606,.6012468934059143,0,2,15,10,4,3,-1,15,11,4,1,3,.0112687097862363,.5244250297546387,.1840388029813767,0,2,8,14,2,3,-1,8,15,2,1,3,-.0028114619199186563,.6060283780097961,.4409897029399872,0,3,3,13,14,4,-1,10,13,7,2,2,3,15,7,2,2,-.005611272994428873,.3891170918941498,.5589237213134766,0,2,1,10,4,3,-1,1,11,4,1,3,.008568009361624718,.5069345831871033,.2062619030475617,0,2,9,11,6,1,-1,11,11,2,1,3,-.00038172779022715986,.5882201790809631,.41926109790802,0,2,5,11,6,1,-1,7,11,2,1,3,-.00017680290329735726,.5533605813980103,.400336891412735,0,2,3,5,16,15,-1,3,10,16,5,3,.006511253770440817,.3310146927833557,.5444191098213196,0,2,6,12,4,2,-1,8,12,2,2,2,-6594868318643421e-20,.5433831810951233,.3944905996322632,0,3,4,4,12,10,-1,10,4,6,5,2,4,9,6,5,2,.006993905175477266,.5600358247756958,.4192714095115662,0,2,8,6,3,4,-1,9,6,1,4,3,-.0046744439750909805,.6685466766357422,.4604960978031158,0,3,8,12,4,8,-1,10,12,2,4,2,8,16,2,4,2,.0115898502990603,.5357121229171753,.2926830053329468,0,2,8,14,4,3,-1,8,15,4,1,3,.013007840141654,.4679817855358124,.730746328830719,0,2,12,2,3,2,-1,13,2,1,2,3,-.0011008579749614,.3937501013278961,.5415065288543701,0,2,8,15,3,2,-1,8,16,3,1,2,.0006047264905646443,.4242376089096069,.5604041218757629,0,2,6,0,9,14,-1,9,0,3,14,3,-.0144948400557041,.3631210029125214,.5293182730674744,0,2,9,6,2,3,-1,10,6,1,3,2,-.005305694881826639,.686045229434967,.4621821045875549,0,2,10,8,2,3,-1,10,9,2,1,3,-.00081829127157107,.3944096863269806,.542043924331665,0,2,0,9,4,6,-1,0,11,4,2,3,-.0190775208175182,.1962621957063675,.5037891864776611,0,2,6,0,8,2,-1,6,1,8,1,2,.00035549470339901745,.4086259007453919,.5613973140716553,0,2,6,14,7,3,-1,6,15,7,1,3,.0019679730758070946,.448912113904953,.5926123261451721,0,2,8,10,8,9,-1,8,13,8,3,3,.006918914150446653,.5335925817489624,.3728385865688324,0,2,5,2,3,2,-1,6,2,1,2,3,.002987277926877141,.5111321210861206,.2975643873214722,0,3,14,1,6,8,-1,17,1,3,4,2,14,5,3,4,2,-.006226461846381426,.5541489720344543,.4824537932872772,0,3,0,1,6,8,-1,0,1,3,4,2,3,5,3,4,2,.013353300280869,.4586423933506012,.6414797902107239,0,3,1,2,18,6,-1,10,2,9,3,2,1,5,9,3,2,.0335052385926247,.5392425060272217,.3429994881153107,0,2,9,3,2,1,-1,10,3,1,1,2,-.0025294460356235504,.1703713983297348,.5013315081596375,0,3,13,2,4,6,-1,15,2,2,3,2,13,5,2,3,2,-.001280162949115038,.5305461883544922,.4697405099868774,0,2,5,4,3,3,-1,5,5,3,1,3,.007068738806992769,.4615545868873596,.643650472164154,0,2,13,5,1,3,-1,13,6,1,1,3,.0009688049904070795,.4833599030971527,.6043894290924072,0,2,2,16,5,3,-1,2,17,5,1,3,.003964765928685665,.5187637209892273,.323181688785553,0,3,13,2,4,6,-1,15,2,2,3,2,13,5,2,3,2,-.022057730704546,.4079256951808929,.520098090171814,0,3,3,2,4,6,-1,3,2,2,3,2,5,5,2,3,2,-.0006690631271339953,.533160924911499,.3815600872039795,0,2,13,5,1,2,-1,13,6,1,1,2,-.0006700932863168418,.5655422210693359,.4688901901245117,0,2,5,5,2,2,-1,5,6,2,1,2,.000742845528293401,.4534381031990051,.6287400126457214,0,2,13,9,2,2,-1,13,9,1,2,2,.0022227810695767403,.5350633263587952,.3303655982017517,0,2,5,9,2,2,-1,6,9,1,2,2,-.005413052160292864,.1113687008619309,.500543475151062,0,2,13,17,3,2,-1,13,18,3,1,2,-14520040167553816e-21,.5628737807273865,.4325133860111237,0,3,6,16,4,4,-1,6,16,2,2,2,8,18,2,2,2,.00023369169502984732,.4165835082530975,.5447791218757629,0,2,9,16,2,3,-1,9,17,2,1,3,.004289454780519009,.4860391020774841,.6778649091720581,0,2,0,13,9,6,-1,0,15,9,2,3,.0059103150852024555,.52623051404953,.3612113893032074,0,2,9,14,2,6,-1,9,17,2,3,2,.0129005396738648,.5319377183914185,.32502880692482,0,2,9,15,2,3,-1,9,16,2,1,3,.004698297940194607,.461824506521225,.6665925979614258,0,2,1,10,18,6,-1,1,12,18,2,3,.0104398597031832,.550567090511322,.3883604109287262,0,2,8,11,4,2,-1,8,12,4,1,2,.0030443191062659025,.4697853028774262,.7301844954490662,0,2,7,9,6,2,-1,7,10,6,1,2,-.0006159375188872218,.3830839097499847,.5464984178543091,0,2,8,8,2,3,-1,8,9,2,1,3,-.0034247159492224455,.256630003452301,.5089530944824219,0,2,17,5,3,4,-1,18,5,1,4,3,-.009353856556117535,.6469966173171997,.49407958984375,0,2,1,19,18,1,-1,7,19,6,1,3,.0523389987647533,.4745982885360718,.787877082824707,0,2,9,0,3,2,-1,10,0,1,2,3,.0035765620414167643,.5306664705276489,.2748498022556305,0,2,1,8,1,6,-1,1,10,1,2,3,.0007155531784519553,.541312575340271,.4041908979415894,0,2,12,17,8,3,-1,12,17,4,3,2,-.0105166798457503,.6158512234687805,.4815283119678497,0,2,0,5,3,4,-1,1,5,1,4,3,.007734792772680521,.4695805907249451,.7028980851173401,0,2,9,7,2,3,-1,9,8,2,1,3,-.004322677850723267,.2849566042423248,.5304684042930603,0,3,7,11,2,2,-1,7,11,1,1,2,8,12,1,1,2,-.0025534399319440126,.7056984901428223,.4688892066478729,0,2,11,3,2,5,-1,11,3,1,5,2,.00010268510231981054,.3902932107448578,.5573464035987854,0,2,7,3,2,5,-1,8,3,1,5,2,7139518857002258e-21,.368423193693161,.526398777961731,0,2,15,13,2,3,-1,15,14,2,1,3,-.0016711989883333445,.3849175870418549,.5387271046638489,0,2,5,6,2,3,-1,5,7,2,1,3,.004926044959574938,.4729771912097931,.7447251081466675,0,2,4,19,15,1,-1,9,19,5,1,3,.0043908702209591866,.4809181094169617,.5591921806335449,0,2,1,19,15,1,-1,6,19,5,1,3,-.0177936293184757,.6903678178787231,.4676927030086517,0,2,15,13,2,3,-1,15,14,2,1,3,.002046966925263405,.5370690226554871,.3308162093162537,0,2,5,0,4,15,-1,7,0,2,15,2,.0298914890736341,.5139865279197693,.3309059143066406,0,2,9,6,2,5,-1,9,6,1,5,2,.0015494900289922953,.466023713350296,.6078342795372009,0,2,9,5,2,7,-1,10,5,1,7,2,.001495696953497827,.4404835999011993,.5863919854164124,0,2,16,11,3,3,-1,16,12,3,1,3,.0009588592802174389,.5435971021652222,.4208523035049439,0,2,1,11,3,3,-1,1,12,3,1,3,.0004964370164088905,.5370578169822693,.4000622034072876,0,2,6,6,8,3,-1,6,7,8,1,3,-.00272808107547462,.5659412741661072,.4259642958641052,0,2,0,15,6,2,-1,0,16,6,1,2,.0023026480339467525,.5161657929420471,.3350869119167328,0,2,1,0,18,6,-1,7,0,6,6,3,.2515163123607636,.4869661927223206,.714730978012085,0,2,6,0,3,4,-1,7,0,1,4,3,-.004632802214473486,.27274489402771,.5083789825439453,0,3,14,10,4,10,-1,16,10,2,5,2,14,15,2,5,2,-.0404344908893108,.6851438879966736,.5021767020225525,0,2,3,2,3,2,-1,4,2,1,2,3,14972220014897175e-21,.428446501493454,.5522555112838745,0,2,11,2,2,2,-1,11,3,2,1,2,-.00024050309730228037,.4226118922233582,.5390074849128723,0,3,2,10,4,10,-1,2,10,2,5,2,4,15,2,5,2,.0236578397452831,.4744631946086884,.7504366040229797,0,3,0,13,20,6,-1,10,13,10,3,2,0,16,10,3,2,-.00814491044729948,.424505889415741,.5538362860679626,0,2,0,5,2,15,-1,1,5,1,15,2,-.003699213033542037,.5952357053756714,.4529713094234467,0,3,1,7,18,4,-1,10,7,9,2,2,1,9,9,2,2,-.0067718601785600185,.4137794077396393,.5473399758338928,0,2,0,0,2,17,-1,1,0,1,17,2,.004266953095793724,.4484114944934845,.5797994136810303,0,3,2,6,16,6,-1,10,6,8,3,2,2,9,8,3,2,.0017791989957913756,.5624858736991882,.4432444870471954,0,2,8,14,1,3,-1,8,15,1,1,3,.0016774770338088274,.4637751877307892,.63642418384552,0,2,8,15,4,2,-1,8,16,4,1,2,.0011732629500329494,.4544503092765808,.5914415717124939,0,3,5,2,8,2,-1,5,2,4,1,2,9,3,4,1,2,.000869981711730361,.5334752798080444,.3885917961597443,0,2,6,11,8,6,-1,6,14,8,3,2,.0007637834060005844,.5398585200309753,.374494194984436,0,2,9,13,2,2,-1,9,14,2,1,2,.00015684569370932877,.4317873120307922,.5614616274833679,0,2,18,4,2,6,-1,18,6,2,2,3,-.0215113703161478,.1785925030708313,.5185542702674866,0,2,9,12,2,2,-1,9,13,2,1,2,.00013081369979772717,.4342499077320099,.5682849884033203,0,2,18,4,2,6,-1,18,6,2,2,3,.021992040798068,.5161716938018799,.2379394024610519,0,2,9,13,1,3,-1,9,14,1,1,3,-.0008013650076463819,.598676323890686,.4466426968574524,0,2,18,4,2,6,-1,18,6,2,2,3,-.008273609913885593,.410821795463562,.5251057147979736,0,2,0,4,2,6,-1,0,6,2,2,3,.0036831789184361696,.5173814296722412,.339751809835434,0,2,9,12,3,3,-1,9,13,3,1,3,-.007952568121254444,.6888983249664307,.4845924079418182,0,2,3,13,2,3,-1,3,14,2,1,3,.0015382299898192286,.5178567171096802,.3454113900661469,0,2,13,13,4,3,-1,13,14,4,1,3,-.0140435304492712,.1678421050310135,.518866777420044,0,2,5,4,3,3,-1,5,5,3,1,3,.0014315890148282051,.436825692653656,.5655773878097534,0,2,5,2,10,6,-1,5,4,10,2,3,-.0340142287313938,.7802296280860901,.4959217011928558,0,2,3,13,4,3,-1,3,14,4,1,3,-.0120272999629378,.1585101038217545,.503223180770874,0,2,3,7,15,5,-1,8,7,5,5,3,.1331661939620972,.5163304805755615,.2755128145217896,0,2,3,7,12,2,-1,7,7,4,2,3,-.0015221949433907866,.372831791639328,.5214552283287048,0,2,10,3,3,9,-1,11,3,1,9,3,-.000939292716793716,.5838379263877869,.4511165022850037,0,2,8,6,4,6,-1,10,6,2,6,2,.0277197398245335,.4728286862373352,.7331544756889343,0,2,9,7,4,3,-1,9,8,4,1,3,.003103015013039112,.5302202105522156,.4101563096046448,0,2,0,9,4,9,-1,2,9,2,9,2,.0778612196445465,.4998334050178528,.127296194434166,0,2,9,13,3,5,-1,10,13,1,5,3,-.0158549398183823,.0508333593606949,.5165656208992004,0,2,7,7,6,3,-1,9,7,2,3,3,-.00497253006324172,.6798133850097656,.4684231877326965,0,2,9,7,3,5,-1,10,7,1,5,3,-.0009767650626599789,.6010771989822388,.4788931906223297,0,2,5,7,8,2,-1,9,7,4,2,2,-.0024647710379213095,.3393397927284241,.5220503807067871,0,2,5,9,12,2,-1,9,9,4,2,3,-.006793770007789135,.4365136921405792,.5239663124084473,0,2,5,6,10,3,-1,10,6,5,3,2,.0326080210506916,.505272388458252,.2425214946269989,0,2,10,12,3,1,-1,11,12,1,1,3,-.0005851442110724747,.5733973979949951,.4758574068546295,0,2,0,1,11,15,-1,0,6,11,5,3,-.0296326000243425,.3892289102077484,.5263597965240479,67.69892120361328,137,0,2,1,0,18,6,-1,7,0,6,6,3,.0465508513152599,.3276950120925903,.6240522861480713,0,2,7,7,6,1,-1,9,7,2,1,3,.007953712716698647,.4256485104560852,.6942939162254333,0,3,5,16,6,4,-1,5,16,3,2,2,8,18,3,2,2,.0006822156137786806,.3711487054824829,.59007328748703,0,2,6,5,9,8,-1,6,9,9,4,2,-.00019348249770700932,.2041133940219879,.53005450963974,0,2,5,10,2,6,-1,5,13,2,3,2,-.0002671050897333771,.5416126251220703,.3103179037570953,0,3,7,6,8,10,-1,11,6,4,5,2,7,11,4,5,2,.0027818060480058193,.5277832746505737,.3467069864273071,0,3,5,6,8,10,-1,5,6,4,5,2,9,11,4,5,2,-.000467790785478428,.5308231115341187,.3294492065906525,0,2,9,5,2,2,-1,9,6,2,1,2,-30335160772665404e-21,.577387273311615,.3852097094058991,0,2,5,12,8,2,-1,5,13,8,1,2,.0007803800981491804,.4317438900470734,.6150057911872864,0,2,10,2,8,2,-1,10,3,8,1,2,-.004255385138094425,.2933903932571411,.5324292778968811,0,3,4,0,2,10,-1,4,0,1,5,2,5,5,1,5,2,-.0002473561035003513,.5468844771385193,.3843030035495758,0,2,9,10,2,2,-1,9,11,2,1,2,-.00014724259381182492,.4281542897224426,.5755587220191956,0,2,2,8,15,3,-1,2,9,15,1,3,.0011864770203828812,.374730110168457,.5471466183662415,0,2,8,13,4,3,-1,8,14,4,1,3,.0023936580400913954,.4537783861160278,.6111528873443604,0,2,7,2,3,2,-1,8,2,1,2,3,-.0015390539774671197,.2971341907978058,.518953800201416,0,2,7,13,6,3,-1,7,14,6,1,3,-.007196879014372826,.6699066758155823,.4726476967334747,0,2,9,9,2,2,-1,9,10,2,1,2,-.0004149978922214359,.3384954035282135,.5260317921638489,0,2,17,2,3,6,-1,17,4,3,2,3,.004435983020812273,.539912223815918,.3920140862464905,0,2,1,5,3,4,-1,2,5,1,4,3,.0026606200262904167,.4482578039169312,.6119617819786072,0,2,14,8,4,6,-1,14,10,4,2,3,-.0015287200221791863,.3711237907409668,.5340266227722168,0,2,1,4,3,8,-1,2,4,1,8,3,-.0047397250309586525,.603108823299408,.4455145001411438,0,2,8,13,4,6,-1,8,16,4,3,2,-.0148291299119592,.2838754057884216,.5341861844062805,0,2,3,14,2,2,-1,3,15,2,1,2,.0009227555710822344,.5209547281265259,.3361653983592987,0,2,14,8,4,6,-1,14,10,4,2,3,.0835298076272011,.5119969844818115,.0811644494533539,0,2,2,8,4,6,-1,2,10,4,2,3,-.0007563314866274595,.331712007522583,.5189831256866455,0,2,10,14,1,6,-1,10,17,1,3,2,.009840385988354683,.524759829044342,.233495905995369,0,2,7,5,3,6,-1,8,5,1,6,3,-.0015953830443322659,.5750094056129456,.4295622110366821,0,3,11,2,2,6,-1,12,2,1,3,2,11,5,1,3,2,34766020689858124e-21,.4342445135116577,.5564029216766357,0,2,6,6,6,5,-1,8,6,2,5,3,.0298629105091095,.4579147100448608,.6579188108444214,0,2,17,1,3,6,-1,17,3,3,2,3,.0113255903124809,.5274311900138855,.3673888146877289,0,2,8,7,3,5,-1,9,7,1,5,3,-.008782864548265934,.7100368738174438,.4642167091369629,0,2,9,18,3,2,-1,10,18,1,2,3,.004363995976746082,.5279216170310974,.2705877125263214,0,2,8,18,3,2,-1,9,18,1,2,3,.004180472809821367,.5072525143623352,.2449083030223846,0,2,12,3,5,2,-1,12,4,5,1,2,-.0004566851130221039,.4283105134963989,.5548691153526306,0,2,7,1,5,12,-1,7,7,5,6,2,-.0037140368949621916,.5519387722015381,.4103653132915497,0,2,1,0,18,4,-1,7,0,6,4,3,-.025304289534688,.6867002248764038,.48698890209198,0,2,4,2,2,2,-1,4,3,2,1,2,-.0003445408074185252,.3728874027729034,.528769314289093,0,3,11,14,4,2,-1,13,14,2,1,2,11,15,2,1,2,-.0008393523166887462,.6060152053833008,.4616062045097351,0,2,0,2,3,6,-1,0,4,3,2,3,.0172800496220589,.5049635767936707,.1819823980331421,0,2,9,7,2,3,-1,9,8,2,1,3,-.006359507795423269,.1631239950656891,.5232778787612915,0,2,5,5,1,3,-1,5,6,1,1,3,.0010298109846189618,.446327805519104,.6176549196243286,0,2,10,10,6,1,-1,10,10,3,1,2,.0010117109632119536,.5473384857177734,.4300698935985565,0,2,4,10,6,1,-1,7,10,3,1,2,-.010308800265193,.1166985034942627,.5000867247581482,0,2,9,17,3,3,-1,9,18,3,1,3,.005468201823532581,.4769287109375,.6719213724136353,0,2,4,14,1,3,-1,4,15,1,1,3,-.0009169646073132753,.3471089899539948,.5178164839744568,0,2,12,5,3,3,-1,12,6,3,1,3,.002392282010987401,.4785236120223999,.6216310858726501,0,2,4,5,12,3,-1,4,6,12,1,3,-.007557381875813007,.5814796090126038,.4410085082054138,0,2,9,8,2,3,-1,9,9,2,1,3,-.0007702403236180544,.387800008058548,.546572208404541,0,2,4,9,3,3,-1,5,9,1,3,3,-.00871259905397892,.1660051047801971,.4995836019515991,0,2,6,0,9,17,-1,9,0,3,17,3,-.0103063201531768,.4093391001224518,.5274233818054199,0,2,9,12,1,3,-1,9,13,1,1,3,-.002094097901135683,.6206194758415222,.4572280049324036,0,2,9,5,2,15,-1,9,10,2,5,3,.006809905171394348,.5567759275436401,.4155600070953369,0,2,8,14,2,3,-1,8,15,2,1,3,-.0010746059706434608,.5638927817344666,.4353024959564209,0,2,10,14,1,3,-1,10,15,1,1,3,.0021550289820879698,.4826265871524811,.6749758124351501,0,2,7,1,6,5,-1,9,1,2,5,3,.0317423194646835,.5048379898071289,.188324898481369,0,2,0,0,20,2,-1,0,0,10,2,2,-.0783827230334282,.2369548976421356,.5260158181190491,0,2,2,13,5,3,-1,2,14,5,1,3,.005741511937230825,.5048828721046448,.2776469886302948,0,2,9,11,2,3,-1,9,12,2,1,3,-.0029014600440859795,.6238604784011841,.4693317115306854,0,2,2,5,9,15,-1,2,10,9,5,3,-.0026427931152284145,.3314141929149628,.5169777274131775,0,3,5,0,12,10,-1,11,0,6,5,2,5,5,6,5,2,-.1094966009259224,.2380045056343079,.5183441042900085,0,2,5,1,2,3,-1,6,1,1,3,2,7407591328956187e-20,.406963586807251,.5362150073051453,0,2,10,7,6,1,-1,12,7,2,1,3,-.0005059380200691521,.5506706237792969,.437459409236908,0,3,3,1,2,10,-1,3,1,1,5,2,4,6,1,5,2,-.0008213177789002657,.5525709986686707,.4209375977516174,0,2,13,7,2,1,-1,13,7,1,1,2,-60276539443293586e-21,.5455474853515625,.4748266041278839,0,2,4,13,4,6,-1,4,15,4,2,3,.006806514225900173,.5157995820045471,.3424577116966248,0,2,13,7,2,1,-1,13,7,1,1,2,.0017202789895236492,.5013207793235779,.6331263780593872,0,2,5,7,2,1,-1,6,7,1,1,2,-.0001301692973356694,.5539718270301819,.4226869940757752,0,3,2,12,18,4,-1,11,12,9,2,2,2,14,9,2,2,-.004801638890057802,.4425095021724701,.5430780053138733,0,3,5,7,2,2,-1,5,7,1,1,2,6,8,1,1,2,-.002539931097999215,.7145782113075256,.4697605073451996,0,2,16,3,4,2,-1,16,4,4,1,2,-.0014278929447755218,.4070445001125336,.539960503578186,0,3,0,2,2,18,-1,0,2,1,9,2,1,11,1,9,2,-.0251425504684448,.7884690761566162,.4747352004051209,0,3,1,2,18,4,-1,10,2,9,2,2,1,4,9,2,2,-.0038899609353393316,.4296191930770874,.5577110052108765,0,2,9,14,1,3,-1,9,15,1,1,3,.004394745919853449,.4693162143230438,.702394425868988,0,3,2,12,18,4,-1,11,12,9,2,2,2,14,9,2,2,.0246784202754498,.5242322087287903,.3812510073184967,0,3,0,12,18,4,-1,0,12,9,2,2,9,14,9,2,2,.0380476787686348,.5011739730834961,.1687828004360199,0,2,11,4,5,3,-1,11,5,5,1,3,.007942486554384232,.4828582108020783,.6369568109512329,0,2,6,4,7,3,-1,6,5,7,1,3,-.0015110049862414598,.5906485915184021,.4487667977809906,0,2,13,17,3,3,-1,13,18,3,1,3,.0064201741479337215,.5241097807884216,.2990570068359375,0,2,8,1,3,4,-1,9,1,1,4,3,-.0029802159406244755,.3041465878486633,.5078489780426025,0,2,11,4,2,4,-1,11,4,1,4,2,-.0007458007894456387,.4128139019012451,.5256826281547546,0,2,0,17,9,3,-1,3,17,3,3,3,-.0104709500446916,.5808395147323608,.4494296014308929,0,3,11,0,2,8,-1,12,0,1,4,2,11,4,1,4,2,.009336920455098152,.524655282497406,.265894889831543,0,3,0,8,6,12,-1,0,8,3,6,2,3,14,3,6,2,.0279369000345469,.4674955010414124,.7087256908416748,0,2,10,7,4,12,-1,10,13,4,6,2,.007427767850458622,.5409486889839172,.3758518099784851,0,2,5,3,8,14,-1,5,10,8,7,2,-.0235845092684031,.3758639991283417,.5238550901412964,0,2,14,10,6,1,-1,14,10,3,1,2,.0011452640173956752,.4329578876495361,.5804247260093689,0,2,0,4,10,4,-1,0,6,10,2,2,-.0004346866044215858,.5280618071556091,.3873069882392883,0,2,10,0,5,8,-1,10,4,5,4,2,.0106485402211547,.4902113080024719,.5681251883506775,0,3,8,1,4,8,-1,8,1,2,4,2,10,5,2,4,2,-.0003941805043723434,.5570880174636841,.4318251013755798,0,2,9,11,6,1,-1,11,11,2,1,3,-.00013270479394122958,.5658439993858337,.4343554973602295,0,2,8,9,3,4,-1,9,9,1,4,3,-.002012551063671708,.6056739091873169,.4537523984909058,0,2,18,4,2,6,-1,18,6,2,2,3,.0024854319635778666,.5390477180480957,.4138010144233704,0,2,8,8,3,4,-1,9,8,1,4,3,.0018237880431115627,.4354828894138336,.5717188715934753,0,2,7,1,13,3,-1,7,2,13,1,3,-.0166566595435143,.3010913133621216,.521612286567688,0,2,7,13,6,1,-1,9,13,2,1,3,.0008034955826587975,.5300151109695435,.3818396925926209,0,2,12,11,3,6,-1,12,13,3,2,3,.003417037893086672,.5328028798103333,.4241400063037872,0,2,5,11,6,1,-1,7,11,2,1,3,-.00036222729249857366,.5491728186607361,.418697714805603,0,3,1,4,18,10,-1,10,4,9,5,2,1,9,9,5,2,-.1163002029061317,.1440722048282623,.522645115852356,0,2,8,6,4,9,-1,8,9,4,3,3,-.0146950101479888,.7747725248336792,.4715717136859894,0,2,8,6,4,3,-1,8,7,4,1,3,.0021972130052745342,.5355433821678162,.3315644860267639,0,2,8,7,3,3,-1,9,7,1,3,3,-.00046965209185145795,.5767235159873962,.4458136856555939,0,2,14,15,4,3,-1,14,16,4,1,3,.006514499895274639,.5215674042701721,.3647888898849487,0,2,5,10,3,10,-1,6,10,1,10,3,.0213000606745481,.4994204938411713,.1567950993776321,0,2,8,15,4,3,-1,8,16,4,1,3,.0031881409231573343,.4742200076580048,.6287270188331604,0,2,0,8,1,6,-1,0,10,1,2,3,.0009001977741718292,.5347954034805298,.394375205039978,0,2,10,15,1,3,-1,10,16,1,1,3,-.005177227780222893,.6727191805839539,.5013138055801392,0,2,2,15,4,3,-1,2,16,4,1,3,-.004376464989036322,.3106675148010254,.5128793120384216,0,3,18,3,2,8,-1,19,3,1,4,2,18,7,1,4,2,.002629996044561267,.488631010055542,.5755215883255005,0,3,0,3,2,8,-1,0,3,1,4,2,1,7,1,4,2,-.002045868895947933,.6025794148445129,.4558076858520508,0,3,3,7,14,10,-1,10,7,7,5,2,3,12,7,5,2,.0694827064871788,.5240747928619385,.2185259014368057,0,2,0,7,19,3,-1,0,8,19,1,3,.0240489393472672,.501186728477478,.2090622037649155,0,2,12,6,3,3,-1,12,7,3,1,3,.003109534038230777,.4866712093353272,.7108548283576965,0,2,0,6,1,3,-1,0,7,1,1,3,-.00125032605137676,.3407891094684601,.5156195163726807,0,2,12,6,3,3,-1,12,7,3,1,3,-.0010281190043315291,.557557225227356,.443943202495575,0,2,5,6,3,3,-1,5,7,3,1,3,-.008889362215995789,.6402000784873962,.4620442092418671,0,2,8,2,4,2,-1,8,3,4,1,2,-.0006109480164013803,.3766441941261292,.5448899865150452,0,2,6,3,4,12,-1,8,3,2,12,2,-.005768635775893927,.3318648934364319,.5133677124977112,0,2,13,6,2,3,-1,13,7,2,1,3,.0018506490159779787,.4903570115566254,.6406934857368469,0,2,0,10,20,4,-1,0,12,20,2,2,-.0997994691133499,.1536051034927368,.5015562176704407,0,2,2,0,17,14,-1,2,7,17,7,2,-.3512834906578064,.0588231310248375,.5174378752708435,0,3,0,0,6,10,-1,0,0,3,5,2,3,5,3,5,2,-.0452445708215237,.6961488723754883,.4677872955799103,0,2,14,6,6,4,-1,14,6,3,4,2,.0714815780520439,.5167986154556274,.1038092970848084,0,2,0,6,6,4,-1,3,6,3,4,2,.0021895780228078365,.4273078143596649,.5532060861587524,0,2,13,2,7,2,-1,13,3,7,1,2,-.0005924265133216977,.46389439702034,.5276389122009277,0,2,0,2,7,2,-1,0,3,7,1,2,.0016788389766588807,.530164897441864,.3932034969329834,0,3,6,11,14,2,-1,13,11,7,1,2,6,12,7,1,2,-.0022163488902151585,.5630694031715393,.4757033884525299,0,3,8,5,2,2,-1,8,5,1,1,2,9,6,1,1,2,.00011568699846975505,.4307535886764526,.5535702705383301,0,2,13,9,2,3,-1,13,9,1,3,2,-.007201728876680136,.144488200545311,.5193064212799072,0,2,1,1,3,12,-1,2,1,1,12,3,.0008908127201721072,.4384432137012482,.5593621134757996,0,2,17,4,1,3,-1,17,5,1,1,3,.00019605009583756328,.5340415835380554,.4705956876277924,0,2,2,4,1,3,-1,2,5,1,1,3,.0005202214233577251,.5213856101036072,.3810079097747803,0,2,14,5,1,3,-1,14,6,1,1,3,.0009458857239224017,.4769414961338043,.6130738854408264,0,2,7,16,2,3,-1,7,17,2,1,3,916984718060121e-19,.4245009124279022,.5429363250732422,0,3,8,13,4,6,-1,10,13,2,3,2,8,16,2,3,2,.002183320000767708,.5457730889320374,.419107586145401,0,2,5,5,1,3,-1,5,6,1,1,3,-.0008603967144154012,.5764588713645935,.4471659958362579,0,2,16,0,4,20,-1,16,0,2,20,2,-.0132362395524979,.6372823119163513,.4695009887218475,0,3,5,1,2,6,-1,5,1,1,3,2,6,4,1,3,2,.0004337670106906444,.5317873954772949,.394582986831665,69.22987365722656,140,0,2,5,4,10,4,-1,5,6,10,2,2,-.024847149848938,.6555516719818115,.3873311877250671,0,2,15,2,4,12,-1,15,2,2,12,2,.006134861148893833,.374807208776474,.5973997712135315,0,2,7,6,4,12,-1,7,12,4,6,2,.006449849810451269,.542549192905426,.2548811137676239,0,2,14,5,1,8,-1,14,9,1,4,2,.0006349121103994548,.2462442070245743,.5387253761291504,0,3,1,4,14,10,-1,1,4,7,5,2,8,9,7,5,2,.0014023890253156424,.5594322085380554,.3528657853603363,0,3,11,6,6,14,-1,14,6,3,7,2,11,13,3,7,2,.0003004400059580803,.3958503901958466,.576593816280365,0,3,3,6,6,14,-1,3,6,3,7,2,6,13,3,7,2,.00010042409849120304,.3698996901512146,.5534998178482056,0,2,4,9,15,2,-1,9,9,5,2,3,-.005084149073809385,.3711090981960297,.5547800064086914,0,2,7,14,6,3,-1,7,15,6,1,3,-.0195372607558966,.7492755055427551,.4579297006130219,0,3,6,3,14,4,-1,13,3,7,2,2,6,5,7,2,2,-7453274065483129e-21,.5649787187576294,.390406996011734,0,2,1,9,15,2,-1,6,9,5,2,3,-.0036079459823668003,.3381088078022003,.5267801284790039,0,2,6,11,8,9,-1,6,14,8,3,3,.002069750102236867,.5519291162490845,.3714388906955719,0,2,7,4,3,8,-1,8,4,1,8,3,-.0004646384040825069,.5608214735984802,.4113566875457764,0,2,14,6,2,6,-1,14,9,2,3,2,.0007549045258201659,.3559206128120422,.532935619354248,0,3,5,7,6,4,-1,5,7,3,2,2,8,9,3,2,2,-.0009832223877310753,.5414795875549316,.3763205111026764,0,2,1,1,18,19,-1,7,1,6,19,3,-.0199406407773495,.634790301322937,.4705299139022827,0,2,1,2,6,5,-1,4,2,3,5,2,.0037680300883948803,.3913489878177643,.5563716292381287,0,2,12,17,6,2,-1,12,18,6,1,2,-.009452850557863712,.2554892897605896,.5215116739273071,0,2,2,17,6,2,-1,2,18,6,1,2,.002956084907054901,.5174679160118103,.3063920140266419,0,2,17,3,3,6,-1,17,5,3,2,3,.009107873775064945,.5388448238372803,.2885963022708893,0,2,8,17,3,3,-1,8,18,3,1,3,.0018219229532405734,.4336043000221252,.58521968126297,0,2,10,13,2,6,-1,10,16,2,3,2,.0146887395530939,.5287361741065979,.2870005965232849,0,2,7,13,6,3,-1,7,14,6,1,3,-.0143879903480411,.701944887638092,.4647370874881744,0,2,17,3,3,6,-1,17,5,3,2,3,-.0189866498112679,.2986552119255066,.5247011780738831,0,2,8,13,2,3,-1,8,14,2,1,3,.0011527639580890536,.4323473870754242,.593166172504425,0,2,9,3,6,2,-1,11,3,2,2,3,.0109336702153087,.5286864042282104,.3130319118499756,0,2,0,3,3,6,-1,0,5,3,2,3,-.0149327302351594,.2658419013023377,.508407711982727,0,2,8,5,4,6,-1,8,7,4,2,3,-.0002997053961735219,.5463526844978333,.374072402715683,0,2,5,5,3,2,-1,5,6,3,1,2,.004167762119323015,.4703496992588043,.7435721755027771,0,2,10,1,3,4,-1,11,1,1,4,3,-.00639053201302886,.2069258987903595,.5280538201332092,0,2,1,2,5,9,-1,1,5,5,3,3,.004502960946410894,.518264889717102,.348354309797287,0,2,13,6,2,3,-1,13,7,2,1,3,-.009204036556184292,.680377721786499,.4932360053062439,0,2,0,6,14,3,-1,7,6,7,3,2,.0813272595405579,.5058398842811584,.2253051996231079,0,2,2,11,18,8,-1,2,15,18,4,2,-.150792807340622,.2963424921035767,.5264679789543152,0,2,5,6,2,3,-1,5,7,2,1,3,.0033179009333252907,.4655495882034302,.7072932124137878,0,3,10,6,4,2,-1,12,6,2,1,2,10,7,2,1,2,.0007740280125290155,.4780347943305969,.5668237805366516,0,3,6,6,4,2,-1,6,6,2,1,2,8,7,2,1,2,.0006819954141974449,.4286996126174927,.5722156763076782,0,2,10,1,3,4,-1,11,1,1,4,3,.0053671570494771,.5299307107925415,.3114621937274933,0,2,7,1,2,7,-1,8,1,1,7,2,9701866656541824e-20,.3674638867378235,.5269461870193481,0,2,4,2,15,14,-1,4,9,15,7,2,-.1253408938646317,.2351492047309876,.5245791077613831,0,2,8,7,3,2,-1,9,7,1,2,3,-.005251626949757338,.7115936875343323,.4693767130374908,0,3,2,3,18,4,-1,11,3,9,2,2,2,5,9,2,2,-.007834210991859436,.4462651014328003,.5409085750579834,0,2,9,7,2,2,-1,10,7,1,2,2,-.001131006982177496,.5945618748664856,.4417662024497986,0,2,13,9,2,3,-1,13,9,1,3,2,.0017601120052859187,.5353249907493591,.3973453044891357,0,2,5,2,6,2,-1,7,2,2,2,3,-.00081581249833107,.3760268092155457,.5264726877212524,0,2,9,5,2,7,-1,9,5,1,7,2,-.003868758911266923,.6309912800788879,.4749819934368134,0,2,5,9,2,3,-1,6,9,1,3,2,.0015207129763439298,.5230181813240051,.3361223936080933,0,2,6,0,14,18,-1,6,9,14,9,2,.545867383480072,.5167139768600464,.1172635033726692,0,2,2,16,6,3,-1,2,17,6,1,3,.0156501904129982,.4979439079761505,.1393294930458069,0,2,9,7,3,6,-1,10,7,1,6,3,-.0117318602278829,.7129650712013245,.4921196103096008,0,2,7,8,4,3,-1,7,9,4,1,3,-.006176512222737074,.2288102954626083,.5049701929092407,0,2,7,12,6,3,-1,7,13,6,1,3,.0022457661107182503,.4632433950901032,.6048725843429565,0,2,9,12,2,3,-1,9,13,2,1,3,-.005191586911678314,.6467421054840088,.4602192938327789,0,2,7,12,6,2,-1,9,12,2,2,3,-.0238278806209564,.1482000946998596,.5226079225540161,0,2,5,11,4,6,-1,5,14,4,3,2,.0010284580057486892,.5135489106178284,.3375957012176514,0,2,11,12,7,2,-1,11,13,7,1,2,-.0100788502022624,.2740561068058014,.5303567051887512,0,3,6,10,8,6,-1,6,10,4,3,2,10,13,4,3,2,.002616893034428358,.533267080783844,.3972454071044922,0,2,11,10,3,4,-1,11,12,3,2,2,.000543853675480932,.5365604162216187,.4063411951065064,0,2,9,16,2,3,-1,9,17,2,1,3,.005351051222532988,.4653759002685547,.6889045834541321,0,2,13,3,1,9,-1,13,6,1,3,3,-.0015274790348485112,.5449501276016235,.3624723851680756,0,2,1,13,14,6,-1,1,15,14,2,3,-.0806244164705276,.1656087040901184,.5000287294387817,0,2,13,6,1,6,-1,13,9,1,3,2,.0221920292824507,.5132731199264526,.2002808004617691,0,2,0,4,3,8,-1,1,4,1,8,3,.007310063112527132,.4617947936058044,.6366536021232605,0,2,18,0,2,18,-1,18,0,1,18,2,-.006406307220458984,.5916250944137573,.4867860972881317,0,2,2,3,6,2,-1,2,4,6,1,2,-.0007641504053026438,.388840913772583,.5315797924995422,0,2,9,0,8,6,-1,9,2,8,2,3,.0007673448999412358,.4159064888954163,.5605279803276062,0,2,6,6,1,6,-1,6,9,1,3,2,.0006147450185380876,.3089022040367127,.5120148062705994,0,2,14,8,6,3,-1,14,9,6,1,3,-.005010527092963457,.3972199857234955,.5207306146621704,0,2,0,0,2,18,-1,1,0,1,18,2,-.008690913207828999,.6257408261299133,.4608575999736786,0,3,1,18,18,2,-1,10,18,9,1,2,1,19,9,1,2,-.016391459852457,.2085209935903549,.5242266058921814,0,2,3,15,2,2,-1,3,16,2,1,2,.00040973909199237823,.5222427248954773,.3780320882797241,0,2,8,14,5,3,-1,8,15,5,1,3,-.002524228999391198,.5803927183151245,.4611890017986298,0,2,8,14,2,3,-1,8,15,2,1,3,.0005094531225040555,.4401271939277649,.5846015810966492,0,2,12,3,3,3,-1,13,3,1,3,3,.001965641975402832,.5322325229644775,.4184590876102448,0,2,7,5,6,2,-1,9,5,2,2,3,.0005629889783449471,.3741844892501831,.5234565734863281,0,2,15,5,5,2,-1,15,6,5,1,2,-.0006794679793529212,.4631041884422302,.5356478095054626,0,2,0,5,5,2,-1,0,6,5,1,2,.007285634987056255,.5044670104980469,.2377564013004303,0,2,17,14,1,6,-1,17,17,1,3,2,-.0174594894051552,.7289121150970459,.5050435066223145,0,2,2,9,9,3,-1,5,9,3,3,3,-.0254217498004436,.6667134761810303,.4678100049495697,0,2,12,3,3,3,-1,13,3,1,3,3,-.0015647639520466328,.4391759037971497,.532362699508667,0,2,0,0,4,18,-1,2,0,2,18,2,.0114443600177765,.4346440136432648,.5680012106895447,0,2,17,6,1,3,-1,17,7,1,1,3,-.0006735255010426044,.44771409034729,.5296812057495117,0,2,2,14,1,6,-1,2,17,1,3,2,.009319420903921127,.4740200042724609,.7462607026100159,0,2,19,8,1,2,-1,19,9,1,1,2,.00013328490604180843,.536506175994873,.475213497877121,0,2,5,3,3,3,-1,6,3,1,3,3,-.007881579920649529,.1752219051122665,.5015255212783813,0,2,9,16,2,3,-1,9,17,2,1,3,-.005798568017780781,.7271236777305603,.4896200895309448,0,2,2,6,1,3,-1,2,7,1,1,3,-.0003892249951604754,.4003908932209015,.5344941020011902,0,3,12,4,8,2,-1,16,4,4,1,2,12,5,4,1,2,-.0019288610201328993,.5605612993240356,.4803955852985382,0,3,0,4,8,2,-1,0,4,4,1,2,4,5,4,1,2,.008421415463089943,.4753246903419495,.7623608708381653,0,2,2,16,18,4,-1,2,18,18,2,2,.008165587671101093,.5393261909484863,.419164389371872,0,2,7,15,2,4,-1,7,17,2,2,2,.00048280550981871784,.4240800142288208,.5399821996688843,0,2,4,0,14,3,-1,4,1,14,1,3,-.002718663075938821,.4244599938392639,.5424923896789551,0,2,0,0,4,20,-1,2,0,2,20,2,-.0125072300434113,.5895841717720032,.4550411105155945,0,3,12,4,4,8,-1,14,4,2,4,2,12,8,2,4,2,-.0242865197360516,.2647134959697723,.518917977809906,0,3,6,7,2,2,-1,6,7,1,1,2,7,8,1,1,2,-.0029676330741494894,.734768271446228,.4749749898910523,0,2,10,6,2,3,-1,10,7,2,1,3,-.0125289997085929,.2756049931049347,.5177599787712097,0,2,8,7,3,2,-1,8,8,3,1,2,-.0010104000102728605,.3510560989379883,.5144724249839783,0,2,8,2,6,12,-1,8,8,6,6,2,-.0021348530426621437,.5637925863265991,.466731995344162,0,2,4,0,11,12,-1,4,4,11,4,3,.0195642597973347,.4614573121070862,.6137639880180359,0,2,14,9,6,11,-1,16,9,2,11,3,-.0971463471651077,.2998378872871399,.5193555951118469,0,2,0,14,4,3,-1,0,15,4,1,3,.00450145686045289,.5077884793281555,.3045755922794342,0,2,9,10,2,3,-1,9,11,2,1,3,.006370697170495987,.486101895570755,.6887500882148743,0,2,5,11,3,2,-1,5,12,3,1,2,-.009072152897715569,.1673395931720734,.5017563104629517,0,2,9,15,3,3,-1,10,15,1,3,3,-.005353720858693123,.2692756950855255,.524263322353363,0,2,8,8,3,4,-1,9,8,1,4,3,-.0109328404068947,.7183864116668701,.4736028909683228,0,2,9,15,3,3,-1,10,15,1,3,3,.008235607296228409,.5223966836929321,.2389862984418869,0,2,7,7,3,2,-1,8,7,1,2,3,-.0010038160253316164,.5719355940818787,.4433943033218384,0,3,2,10,16,4,-1,10,10,8,2,2,2,12,8,2,2,.004085912834852934,.5472841858863831,.4148836135864258,0,2,2,3,4,17,-1,4,3,2,17,2,.1548541933298111,.4973812103271484,.0610615983605385,0,2,15,13,2,7,-1,15,13,1,7,2,.00020897459762636572,.4709174036979675,.542388916015625,0,2,2,2,6,1,-1,5,2,3,1,2,.0003331699117552489,.4089626967906952,.5300992131233215,0,2,5,2,12,4,-1,9,2,4,4,3,-.0108134001493454,.6104369759559631,.4957334101200104,0,3,6,0,8,12,-1,6,0,4,6,2,10,6,4,6,2,.0456560105085373,.5069689154624939,.2866660058498383,0,3,13,7,2,2,-1,14,7,1,1,2,13,8,1,1,2,.0012569549726322293,.484691709280014,.631817102432251,0,2,0,12,20,6,-1,0,14,20,2,3,-.120150700211525,.0605261400341988,.4980959892272949,0,2,14,7,2,3,-1,14,7,1,3,2,-.00010533799650147557,.5363109707832336,.4708042144775391,0,2,0,8,9,12,-1,3,8,3,12,3,-.2070319056510925,.059660330414772,.497909814119339,0,2,3,0,16,2,-1,3,0,8,2,2,.00012909180077258497,.4712977111339569,.5377997756004333,0,2,6,15,3,3,-1,6,16,3,1,3,.000388185289921239,.4363538026809692,.5534191131591797,0,2,8,15,6,3,-1,8,16,6,1,3,-.0029243610333651304,.5811185836791992,.4825215935707092,0,2,0,10,1,6,-1,0,12,1,2,3,.0008388233254663646,.5311700105667114,.403813898563385,0,2,10,9,4,3,-1,10,10,4,1,3,-.0019061550265178084,.3770701885223389,.526001513004303,0,2,9,15,2,3,-1,9,16,2,1,3,.00895143486559391,.4766167998313904,.7682183980941772,0,2,5,7,10,1,-1,5,7,5,1,2,.0130834598094225,.5264462828636169,.3062222003936768,0,2,4,0,12,19,-1,10,0,6,19,2,-.2115933001041412,.6737198233604431,.4695810079574585,0,3,0,6,20,6,-1,10,6,10,3,2,0,9,10,3,2,.0031493250280618668,.5644835233688354,.4386953115463257,0,3,3,6,2,2,-1,3,6,1,1,2,4,7,1,1,2,.00039754100725986063,.4526061117649078,.5895630121231079,0,3,15,6,2,2,-1,16,6,1,1,2,15,7,1,1,2,-.0013814480043947697,.6070582270622253,.4942413866519928,0,3,3,6,2,2,-1,3,6,1,1,2,4,7,1,1,2,-.0005812218878418207,.5998213291168213,.4508252143859863,0,2,14,4,1,12,-1,14,10,1,6,2,-.002390532987192273,.420558899641037,.5223848223686218,0,3,2,5,16,10,-1,2,5,8,5,2,10,10,8,5,2,.0272689294070005,.5206447243690491,.3563301861286163,0,2,9,17,3,2,-1,10,17,1,2,3,-.0037658358924090862,.3144704103469849,.5218814015388489,0,2,1,4,2,2,-1,1,5,2,1,2,-.0014903489500284195,.338019609451294,.5124437212944031,0,2,5,0,15,5,-1,10,0,5,5,3,-.0174282304942608,.5829960703849792,.4919725954532623,0,2,0,0,15,5,-1,5,0,5,5,3,-.0152780301868916,.6163144707679749,.4617887139320374,0,2,11,2,2,17,-1,11,2,1,17,2,.0319956094026566,.5166357159614563,.171276405453682,0,2,7,2,2,17,-1,8,2,1,17,2,-.003825671039521694,.3408012092113495,.5131387710571289,0,2,15,11,2,9,-1,15,11,1,9,2,-.00851864367723465,.6105518937110901,.4997941851615906,0,2,3,11,2,9,-1,4,11,1,9,2,.0009064162150025368,.4327270984649658,.5582311153411865,0,2,5,16,14,4,-1,5,16,7,4,2,.0103448498994112,.4855653047561646,.5452420115470886,79.24907684326172,160,0,2,1,4,18,1,-1,7,4,6,1,3,.007898182608187199,.333252489566803,.5946462154388428,0,3,13,7,6,4,-1,16,7,3,2,2,13,9,3,2,2,.0016170160379260778,.3490641117095947,.5577868819236755,0,2,9,8,2,12,-1,9,12,2,4,3,-.0005544974119402468,.5542566180229187,.3291530013084412,0,2,12,1,6,6,-1,12,3,6,2,3,.001542898011393845,.3612579107284546,.5545979142189026,0,3,5,2,6,6,-1,5,2,3,3,2,8,5,3,3,2,-.0010329450014978647,.3530139029026032,.5576140284538269,0,3,9,16,6,4,-1,12,16,3,2,2,9,18,3,2,2,.0007769815856590867,.3916778862476349,.5645321011543274,0,2,1,2,18,3,-1,7,2,6,3,3,.143203005194664,.4667482078075409,.7023633122444153,0,2,7,4,9,10,-1,7,9,9,5,2,-.007386649027466774,.3073684871196747,.5289257764816284,0,2,5,9,4,4,-1,7,9,2,4,2,-.0006293674232438207,.562211811542511,.4037049114704132,0,2,11,10,3,6,-1,11,13,3,3,2,.0007889352855272591,.5267661213874817,.3557874858379364,0,2,7,11,5,3,-1,7,12,5,1,3,-.0122280502691865,.6668320894241333,.4625549912452698,0,3,7,11,6,6,-1,10,11,3,3,2,7,14,3,3,2,.0035420239437371492,.5521438121795654,.3869673013687134,0,2,0,0,10,9,-1,0,3,10,3,3,-.0010585320414975286,.3628678023815155,.5320926904678345,0,2,13,14,1,6,-1,13,16,1,2,3,14935660146875307e-21,.4632444977760315,.5363323092460632,0,2,0,2,3,6,-1,0,4,3,2,3,.005253770854324102,.5132231712341309,.3265708982944489,0,2,8,14,4,3,-1,8,15,4,1,3,-.008233802393078804,.6693689823150635,.4774140119552612,0,2,6,14,1,6,-1,6,16,1,2,3,2186681012972258e-20,.405386209487915,.5457931160926819,0,2,9,15,2,3,-1,9,16,2,1,3,-.0038150229956954718,.645499587059021,.4793178141117096,0,2,6,4,3,3,-1,7,4,1,3,3,.0011105879675596952,.5270407199859619,.3529678881168366,0,2,9,0,11,3,-1,9,1,11,1,3,-.005770768970251083,.3803547024726868,.5352957844734192,0,2,0,6,20,3,-1,0,7,20,1,3,-.003015833906829357,.533940315246582,.3887133002281189,0,2,10,1,1,2,-1,10,2,1,1,2,-.0008545368909835815,.3564616143703461,.5273603796958923,0,2,9,6,2,6,-1,10,6,1,6,2,.0110505102202296,.4671907126903534,.6849737763404846,0,2,5,8,12,1,-1,9,8,4,1,3,.0426058396697044,.51514732837677,.0702200904488564,0,2,3,8,12,1,-1,7,8,4,1,3,-.0030781750101596117,.3041661083698273,.5152602195739746,0,2,9,7,3,5,-1,10,7,1,5,3,-.005481572821736336,.6430295705795288,.4897229969501495,0,2,3,9,6,2,-1,6,9,3,2,2,.003188186092302203,.5307493209838867,.3826209902763367,0,2,12,9,3,3,-1,12,10,3,1,3,.00035947180003859103,.4650047123432159,.5421904921531677,0,2,7,0,6,1,-1,9,0,2,1,3,-.004070503171533346,.2849679887294769,.5079116225242615,0,2,12,9,3,3,-1,12,10,3,1,3,-.0145941702648997,.2971645891666412,.5128461718559265,0,2,7,10,2,1,-1,8,10,1,1,2,-.00011947689927183092,.563109815120697,.4343082010746002,0,2,6,4,9,13,-1,9,4,3,13,3,-.0006934464909136295,.4403578042984009,.5359959006309509,0,2,6,8,4,2,-1,6,9,4,1,2,14834799912932795e-21,.3421008884906769,.5164697766304016,0,2,16,2,4,6,-1,16,2,2,6,2,.009029698558151722,.4639343023300171,.6114075183868408,0,2,0,17,6,3,-1,0,18,6,1,3,-.008064081892371178,.2820158898830414,.5075494050979614,0,2,10,10,3,10,-1,10,15,3,5,2,.0260621197521687,.5208905935287476,.2688778042793274,0,2,8,7,3,5,-1,9,7,1,5,3,.0173146594315767,.4663713872432709,.6738539934158325,0,2,10,4,4,3,-1,10,4,2,3,2,.0226666405797005,.5209349989891052,.2212723940610886,0,2,8,4,3,8,-1,9,4,1,8,3,-.002196592977270484,.6063101291656494,.4538190066814423,0,2,6,6,9,13,-1,9,6,3,13,3,-.009528247639536858,.4635204970836639,.5247430801391602,0,3,6,0,8,12,-1,6,0,4,6,2,10,6,4,6,2,.00809436198323965,.5289440155029297,.3913882076740265,0,2,14,2,6,8,-1,16,2,2,8,3,-.0728773325681686,.7752001881599426,.4990234971046448,0,2,6,0,3,6,-1,7,0,1,6,3,-.006900952197611332,.2428039014339447,.5048090219497681,0,2,14,2,6,8,-1,16,2,2,8,3,-.0113082397729158,.5734364986419678,.4842376112937927,0,2,0,5,6,6,-1,0,8,6,3,2,.0596132017672062,.5029836297035217,.2524977028369904,0,3,9,12,6,2,-1,12,12,3,1,2,9,13,3,1,2,-.0028624620754271746,.6073045134544373,.4898459911346436,0,2,8,17,3,2,-1,9,17,1,2,3,.00447814492508769,.5015289187431335,.2220316976308823,0,3,11,6,2,2,-1,12,6,1,1,2,11,7,1,1,2,-.001751324045471847,.6614428758621216,.4933868944644928,0,2,1,9,18,2,-1,7,9,6,2,3,.0401634201407433,.5180878043174744,.3741044998168945,0,3,11,6,2,2,-1,12,6,1,1,2,11,7,1,1,2,.0003476894926279783,.4720416963100433,.5818032026290894,0,2,3,4,12,8,-1,7,4,4,8,3,.00265516503714025,.3805010914802551,.5221335887908936,0,2,13,11,5,3,-1,13,12,5,1,3,-.008770627900958061,.294416606426239,.5231295228004456,0,2,9,10,2,3,-1,9,11,2,1,3,-.005512209143489599,.7346177101135254,.4722816944122315,0,2,14,7,2,3,-1,14,7,1,3,2,.0006867204210720956,.5452876091003418,.424241304397583,0,2,5,4,1,3,-1,5,5,1,1,3,.0005601966986432672,.439886212348938,.5601285099983215,0,2,13,4,2,3,-1,13,5,2,1,3,.0024143769405782223,.4741686880588532,.6136621832847595,0,2,5,4,2,3,-1,5,5,2,1,3,-.0015680900542065501,.604455292224884,.4516409933567047,0,2,9,8,2,3,-1,9,9,2,1,3,-.0036827491130679846,.2452459037303925,.5294982194900513,0,2,8,9,2,2,-1,8,10,2,1,2,-.000294091907562688,.3732838034629822,.5251451134681702,0,2,15,14,1,4,-1,15,16,1,2,2,.00042847759323194623,.5498809814453125,.4065535068511963,0,2,3,12,2,2,-1,3,13,2,1,2,-.004881707020103931,.2139908969402313,.4999957084655762,0,3,12,15,2,2,-1,13,15,1,1,2,12,16,1,1,2,.00027272020815871656,.465028703212738,.581342875957489,0,2,9,13,2,2,-1,9,14,2,1,2,.00020947199664078653,.4387486875057221,.5572792887687683,0,2,4,11,14,9,-1,4,14,14,3,3,.0485011897981167,.5244972705841064,.3212889134883881,0,2,7,13,4,3,-1,7,14,4,1,3,-.004516641143709421,.605681300163269,.4545882046222687,0,2,15,14,1,4,-1,15,16,1,2,2,-.0122916800901294,.2040929049253464,.5152214169502258,0,2,4,14,1,4,-1,4,16,1,2,2,.0004854967992287129,.5237604975700378,.3739503026008606,0,2,14,0,6,13,-1,16,0,2,13,3,.0305560491979122,.4960533976554871,.5938246250152588,0,3,4,1,2,12,-1,4,1,1,6,2,5,7,1,6,2,-.00015105320198927075,.5351303815841675,.4145204126834869,0,3,11,14,6,6,-1,14,14,3,3,2,11,17,3,3,2,.0024937440175563097,.4693366885185242,.5514941215515137,0,3,3,14,6,6,-1,3,14,3,3,2,6,17,3,3,2,-.012382130138576,.6791396737098694,.4681667983531952,0,2,14,17,3,2,-1,14,18,3,1,2,-.005133346188813448,.3608739078044891,.5229160189628601,0,2,3,17,3,2,-1,3,18,3,1,2,.0005191927775740623,.5300073027610779,.3633613884449005,0,2,14,0,6,13,-1,16,0,2,13,3,.1506042033433914,.515731692314148,.2211782038211823,0,2,0,0,6,13,-1,2,0,2,13,3,.007714414969086647,.4410496950149536,.5776609182357788,0,2,10,10,7,6,-1,10,12,7,2,3,.009444352239370346,.5401855111122131,.375665009021759,0,3,6,15,2,2,-1,6,15,1,1,2,7,16,1,1,2,.00025006249779835343,.4368270933628082,.5607374906539917,0,3,6,11,8,6,-1,10,11,4,3,2,6,14,4,3,2,-.003307715058326721,.4244799017906189,.551823079586029,0,3,7,6,2,2,-1,7,6,1,1,2,8,7,1,1,2,.0007404891075566411,.4496962130069733,.5900576710700989,0,3,2,2,16,6,-1,10,2,8,3,2,2,5,8,3,2,.0440920516848564,.5293493270874023,.3156355023384094,0,2,5,4,3,3,-1,5,5,3,1,3,.0033639909233897924,.4483296871185303,.5848662257194519,0,2,11,7,3,10,-1,11,12,3,5,2,-.003976007923483849,.4559507071971893,.5483639240264893,0,2,6,7,3,10,-1,6,12,3,5,2,.0027716930489987135,.534178614616394,.3792484104633331,0,2,10,7,3,2,-1,11,7,1,2,3,-.00024123019829858094,.5667188763618469,.4576973021030426,0,2,8,12,4,2,-1,8,13,4,1,2,.0004942566738463938,.4421244859695435,.5628787279129028,0,2,10,1,1,3,-1,10,2,1,1,3,-.0003887646889779717,.4288370907306671,.5391063094139099,0,3,1,2,4,18,-1,1,2,2,9,2,3,11,2,9,2,-.0500488989055157,.6899513006210327,.4703742861747742,0,2,12,4,4,12,-1,12,10,4,6,2,-.0366354808211327,.2217779010534287,.5191826224327087,0,2,0,0,1,6,-1,0,2,1,2,3,.0024273579474538565,.5136224031448364,.3497397899627686,0,2,9,11,2,3,-1,9,12,2,1,3,.001955803018063307,.4826192855834961,.640838086605072,0,2,8,7,4,3,-1,8,8,4,1,3,-.0017494610510766506,.3922835886478424,.5272685289382935,0,2,10,7,3,2,-1,11,7,1,2,3,.0139550799503922,.507820188999176,.8416504859924316,0,2,7,7,3,2,-1,8,7,1,2,3,-.00021896739781368524,.5520489811897278,.4314234852790833,0,2,9,4,6,1,-1,11,4,2,1,3,-.0015131309628486633,.3934605121612549,.5382571220397949,0,2,8,7,2,3,-1,9,7,1,3,2,-.004362280014902353,.7370628714561462,.4736475944519043,0,3,12,7,8,6,-1,16,7,4,3,2,12,10,4,3,2,.0651605874300003,.5159279704093933,.328159511089325,0,3,0,7,8,6,-1,0,7,4,3,2,4,10,4,3,2,-.0023567399475723505,.3672826886177063,.5172886252403259,0,3,18,2,2,10,-1,19,2,1,5,2,18,7,1,5,2,.0151466596871614,.5031493902206421,.6687604188919067,0,2,0,2,6,4,-1,3,2,3,4,2,-.0228509604930878,.676751971244812,.4709596931934357,0,2,9,4,6,1,-1,11,4,2,1,3,.004886765033006668,.5257998108863831,.4059878885746002,0,3,7,15,2,2,-1,7,15,1,1,2,8,16,1,1,2,.0017619599821045995,.4696272909641266,.6688278913497925,0,2,11,13,1,6,-1,11,16,1,3,2,-.0012942519970238209,.4320712983608246,.5344281792640686,0,2,8,13,1,6,-1,8,16,1,3,2,.0109299495816231,.4997706115245819,.1637486070394516,0,2,14,3,2,1,-1,14,3,1,1,2,2995848990394734e-20,.4282417893409729,.5633224248886108,0,2,8,15,2,3,-1,8,16,2,1,3,-.0065884361974895,.677212119102478,.4700526893138886,0,2,12,15,7,4,-1,12,17,7,2,2,.0032527779694646597,.531339704990387,.4536148905754089,0,2,4,14,12,3,-1,4,15,12,1,3,-.00404357397928834,.5660061836242676,.4413388967514038,0,2,10,3,3,2,-1,11,3,1,2,3,-.0012523540062829852,.3731913864612579,.5356451869010925,0,2,4,12,2,2,-1,4,13,2,1,2,.00019246719602961093,.5189986228942871,.3738811016082764,0,2,10,11,4,6,-1,10,14,4,3,2,-.038589671254158,.2956373989582062,.51888108253479,0,3,7,13,2,2,-1,7,13,1,1,2,8,14,1,1,2,.0001548987056594342,.4347135126590729,.5509533286094666,0,3,4,11,14,4,-1,11,11,7,2,2,4,13,7,2,2,-.0337638482451439,.3230330049991608,.5195475816726685,0,2,1,18,18,2,-1,7,18,6,2,3,-.008265706710517406,.5975489020347595,.4552114009857178,0,3,11,18,2,2,-1,12,18,1,1,2,11,19,1,1,2,14481440302915871e-21,.4745678007602692,.5497426986694336,0,3,7,18,2,2,-1,7,18,1,1,2,8,19,1,1,2,14951299817766994e-21,.4324473142623901,.5480644106864929,0,2,12,18,8,2,-1,12,19,8,1,2,-.018741799518466,.1580052971839905,.517853319644928,0,2,7,14,6,2,-1,7,15,6,1,2,.0017572239739820361,.4517636895179749,.5773764252662659,0,3,8,12,4,8,-1,10,12,2,4,2,8,16,2,4,2,-.0031391119118779898,.4149647951126099,.5460842251777649,0,2,4,9,3,3,-1,4,10,3,1,3,6665677938144654e-20,.4039090871810913,.5293084979057312,0,2,7,10,6,2,-1,9,10,2,2,3,.006774342153221369,.4767651855945587,.612195611000061,0,2,5,0,4,15,-1,7,0,2,15,2,-.0073868161998689175,.3586258888244629,.5187280774116516,0,2,8,6,12,14,-1,12,6,4,14,3,.0140409301966429,.4712139964103699,.5576155781745911,0,2,5,16,3,3,-1,5,17,3,1,3,-.005525832995772362,.2661027014255524,.5039281249046326,0,2,8,1,12,19,-1,12,1,4,19,3,.3868423998355866,.5144339799880981,.2525899112224579,0,2,3,0,3,2,-1,3,1,3,1,2,.0001145924034062773,.4284994900226593,.5423371195793152,0,2,10,12,4,5,-1,10,12,2,5,2,-.0184675697237253,.3885835111141205,.5213062167167664,0,2,6,12,4,5,-1,8,12,2,5,2,-.0004590701137203723,.541256308555603,.4235909879207611,0,3,11,11,2,2,-1,12,11,1,1,2,11,12,1,1,2,.0012527540093287826,.4899305105209351,.6624091267585754,0,2,0,2,3,6,-1,0,4,3,2,3,.001491060946136713,.5286778211593628,.4040051996707916,0,3,11,11,2,2,-1,12,11,1,1,2,11,12,1,1,2,-.0007543556275777519,.6032990217208862,.4795120060443878,0,2,7,6,4,10,-1,7,11,4,5,2,-.0069478838704526424,.408440113067627,.5373504161834717,0,3,11,11,2,2,-1,12,11,1,1,2,11,12,1,1,2,.0002809292054735124,.4846062958240509,.5759382247924805,0,2,2,13,5,2,-1,2,14,5,1,2,.0009607371757738292,.5164741277694702,.3554979860782623,0,3,11,11,2,2,-1,12,11,1,1,2,11,12,1,1,2,-.0002688392996788025,.5677582025527954,.4731765985488892,0,3,7,11,2,2,-1,7,11,1,1,2,8,12,1,1,2,.0021599370520561934,.4731487035751343,.7070567011833191,0,2,14,13,3,3,-1,14,14,3,1,3,.005623530130833387,.5240243077278137,.2781791985034943,0,2,3,13,3,3,-1,3,14,3,1,3,-.005024399142712355,.2837013900279999,.5062304139137268,0,2,9,14,2,3,-1,9,15,2,1,3,-.009761163964867592,.7400717735290527,.4934569001197815,0,2,8,7,3,3,-1,8,8,3,1,3,.004151510074734688,.5119131207466125,.3407008051872253,0,2,13,5,3,3,-1,13,6,3,1,3,.006246508099138737,.4923788011074066,.6579058766365051,0,2,0,9,5,3,-1,0,10,5,1,3,-.007059747818857431,.2434711009263992,.503284215927124,0,2,13,5,3,3,-1,13,6,3,1,3,-.0020587709732353687,.590031087398529,.469508707523346,0,3,9,12,2,8,-1,9,12,1,4,2,10,16,1,4,2,-.0024146060459315777,.3647317886352539,.5189201831817627,0,3,11,7,2,2,-1,12,7,1,1,2,11,8,1,1,2,-.0014817609917372465,.6034948229789734,.4940128028392792,0,2,0,16,6,4,-1,3,16,3,4,2,-.0063016400672495365,.5818989872932434,.4560427963733673,0,2,10,6,2,3,-1,10,7,2,1,3,.00347634288482368,.5217475891113281,.3483993113040924,0,2,9,5,2,6,-1,9,7,2,2,3,-.0222508702427149,.2360700070858002,.5032082796096802,0,2,12,15,8,4,-1,12,15,4,4,2,-.030612550675869,.6499186754226685,.4914919137954712,0,2,0,14,8,6,-1,4,14,4,6,2,.013057479634881,.4413323104381561,.5683764219284058,0,2,9,0,3,2,-1,10,0,1,2,3,-.0006009574281051755,.4359731078147888,.5333483219146729,0,2,4,15,4,2,-1,6,15,2,2,2,-.0004151425091549754,.550406277179718,.4326060116291046,0,2,12,7,3,13,-1,13,7,1,13,3,-.013776290230453,.4064112901687622,.5201548933982849,0,2,5,7,3,13,-1,6,7,1,13,3,-.0322965085506439,.0473519712686539,.4977194964885712,0,2,9,6,3,9,-1,9,9,3,3,3,.0535569787025452,.4881733059883118,.666693925857544,0,2,4,4,7,12,-1,4,10,7,6,2,.008188954554498196,.5400037169456482,.4240820109844208,0,3,12,12,2,2,-1,13,12,1,1,2,12,13,1,1,2,.00021055320394225419,.4802047908306122,.5563852787017822,0,3,6,12,2,2,-1,6,12,1,1,2,7,13,1,1,2,-.00243827304802835,.7387793064117432,.4773685038089752,0,3,8,9,4,2,-1,10,9,2,1,2,8,10,2,1,2,.003283557016402483,.5288546085357666,.3171291947364807,0,3,3,6,2,2,-1,3,6,1,1,2,4,7,1,1,2,.00237295706756413,.4750812947750092,.7060170769691467,0,2,16,6,3,2,-1,16,7,3,1,2,-.0014541699783876538,.3811730146408081,.533073902130127,87.69602966308594,177,0,2,0,7,19,4,-1,0,9,19,2,2,.0557552389800549,.4019156992435455,.6806036829948425,0,2,10,2,10,1,-1,10,2,5,1,2,.002473024884238839,.3351148962974548,.5965719819068909,0,2,9,4,2,12,-1,9,10,2,6,2,-.00035031698644161224,.5557708144187927,.3482286930084229,0,2,12,18,4,1,-1,12,18,2,1,2,.0005416763015091419,.426085889339447,.5693380832672119,0,3,1,7,6,4,-1,1,7,3,2,2,4,9,3,2,2,.0007719367858953774,.3494240045547485,.5433688759803772,0,2,12,0,6,13,-1,14,0,2,13,3,-.0015999219613149762,.4028499126434326,.5484359264373779,0,2,2,0,6,13,-1,4,0,2,13,3,-.00011832080053864047,.3806901872158051,.5425465106964111,0,2,10,5,8,8,-1,10,9,8,4,2,.0003290903114248067,.262010008096695,.5429521799087524,0,2,8,3,2,5,-1,9,3,1,5,2,.0002951810893137008,.379976898431778,.5399264097213745,0,2,8,4,9,1,-1,11,4,3,1,3,9046671038959175e-20,.4433645009994507,.5440226197242737,0,2,3,4,9,1,-1,6,4,3,1,3,15007190086180344e-21,.3719654977321625,.5409119725227356,0,2,1,0,18,10,-1,7,0,6,10,3,.1393561065196991,.552539587020874,.4479042887687683,0,2,7,17,5,3,-1,7,18,5,1,3,.0016461990308016539,.4264501035213471,.5772169828414917,0,2,7,11,6,1,-1,9,11,2,1,3,.0004998443182557821,.4359526038169861,.5685871243476868,0,2,2,2,3,2,-1,2,3,3,1,2,-.001097128028050065,.3390136957168579,.5205408930778503,0,2,8,12,4,2,-1,8,13,4,1,2,.0006691989256069064,.4557456076145172,.598065972328186,0,2,6,10,3,6,-1,6,13,3,3,2,.0008647104259580374,.5134841203689575,.2944033145904541,0,2,11,4,2,4,-1,11,4,1,4,2,-.0002718259929679334,.3906578123569489,.5377181172370911,0,2,7,4,2,4,-1,8,4,1,4,2,3024949910468422e-20,.3679609894752502,.5225688815116882,0,2,9,6,2,4,-1,9,6,1,4,2,-.008522589690983295,.7293102145195007,.4892365038394928,0,2,6,13,8,3,-1,6,14,8,1,3,.0016705560265108943,.43453249335289,.5696138143539429,0,2,9,15,3,4,-1,10,15,1,4,3,-.0071433838456869125,.2591280043125153,.5225623846054077,0,2,9,2,2,17,-1,10,2,1,17,2,-.0163193698972464,.6922279000282288,.4651575982570648,0,2,7,0,6,1,-1,9,0,2,1,3,.004803426098078489,.5352262854576111,.3286302983760834,0,2,8,15,3,4,-1,9,15,1,4,3,-.0075421929359436035,.2040544003248215,.5034546256065369,0,2,7,13,7,3,-1,7,14,7,1,3,-.0143631100654602,.6804888844490051,.4889059066772461,0,2,8,16,3,3,-1,9,16,1,3,3,.0008906358852982521,.5310695767402649,.3895480930805206,0,2,6,2,8,10,-1,6,7,8,5,2,-.004406019113957882,.5741562843322754,.4372426867485046,0,2,2,5,8,8,-1,2,9,8,4,2,-.0001886254030978307,.2831785976886749,.5098205208778381,0,2,14,16,2,2,-1,14,17,2,1,2,-.0037979281041771173,.3372507989406586,.5246580243110657,0,2,4,16,2,2,-1,4,17,2,1,2,.00014627049677073956,.5306674242019653,.391171008348465,0,2,10,11,4,6,-1,10,14,4,3,2,-49164638767251745e-21,.5462496280670166,.3942720890045166,0,2,6,11,4,6,-1,6,14,4,3,2,-.0335825011134148,.2157824039459229,.5048211812973022,0,2,10,14,1,3,-1,10,15,1,1,3,-.0035339309833943844,.6465312242507935,.4872696995735169,0,2,8,14,4,3,-1,8,15,4,1,3,.005014411173760891,.4617668092250824,.6248074769973755,0,3,10,0,4,6,-1,12,0,2,3,2,10,3,2,3,2,.0188173707574606,.5220689177513123,.2000052034854889,0,2,0,3,20,2,-1,0,4,20,1,2,-.001343433978036046,.4014537930488586,.53016197681427,0,3,12,0,8,2,-1,16,0,4,1,2,12,1,4,1,2,.001755796023644507,.4794039130210877,.5653169751167297,0,2,2,12,10,8,-1,2,16,10,4,2,-.0956374630331993,.2034195065498352,.5006706714630127,0,3,17,7,2,10,-1,18,7,1,5,2,17,12,1,5,2,-.0222412291914225,.7672473192214966,.5046340227127075,0,3,1,7,2,10,-1,1,7,1,5,2,2,12,1,5,2,-.0155758196488023,.7490342259407043,.4755851030349731,0,2,15,10,3,6,-1,15,12,3,2,3,.005359911825507879,.5365303754806519,.4004670977592468,0,2,4,4,6,2,-1,6,4,2,2,3,-.0217634998261929,.0740154981613159,.4964174926280975,0,2,0,5,20,6,-1,0,7,20,2,3,-.165615901350975,.2859103083610535,.5218086242675781,0,3,0,0,8,2,-1,0,0,4,1,2,4,1,4,1,2,.0001646132004680112,.4191615879535675,.5380793213844299,0,2,1,0,18,4,-1,7,0,6,4,3,-.008907750248908997,.6273192763328552,.4877404868602753,0,2,1,13,6,2,-1,1,14,6,1,2,.0008634644909761846,.5159940719604492,.3671025931835175,0,2,10,8,3,4,-1,11,8,1,4,3,-.0013751760125160217,.5884376764297485,.4579083919525147,0,2,6,1,6,1,-1,8,1,2,1,3,-.0014081239933148026,.3560509979724884,.5139945149421692,0,2,8,14,4,3,-1,8,15,4,1,3,-.003934288863092661,.5994288921356201,.466427206993103,0,2,1,6,18,2,-1,10,6,9,2,2,-.0319669283926487,.3345462083816528,.5144183039665222,0,2,15,11,1,2,-1,15,12,1,1,2,-15089280168467667e-21,.5582656264305115,.441405713558197,0,2,6,5,1,2,-1,6,6,1,1,2,.0005199447041377425,.4623680114746094,.6168993711471558,0,2,13,4,1,3,-1,13,5,1,1,3,-.0034220460802316666,.6557074785232544,.4974805116653442,0,2,2,15,1,2,-1,2,16,1,1,2,.00017723299970384687,.5269501805305481,.3901908099651337,0,2,12,4,4,3,-1,12,5,4,1,3,.0015716759953647852,.4633373022079468,.5790457725524902,0,2,0,0,7,3,-1,0,1,7,1,3,-.00890413299202919,.2689608037471771,.5053591132164001,0,2,9,12,6,2,-1,9,12,3,2,2,.00040677518700249493,.5456603169441223,.4329898953437805,0,2,5,4,2,3,-1,5,5,2,1,3,.0067604780197143555,.4648993909358978,.6689761877059937,0,2,18,4,2,3,-1,18,5,2,1,3,.0029100088868290186,.5309703946113586,.3377839922904968,0,2,3,0,8,6,-1,3,2,8,2,3,.0013885459629818797,.4074738919734955,.5349133014678955,0,3,0,2,20,6,-1,10,2,10,3,2,0,5,10,3,2,-.0767642632126808,.1992176026105881,.522824227809906,0,2,4,7,2,4,-1,5,7,1,4,2,-.00022688310127705336,.5438501834869385,.4253072142601013,0,2,3,10,15,2,-1,8,10,5,2,3,-.006309415213763714,.4259178936481476,.5378909707069397,0,2,3,0,12,11,-1,9,0,6,11,2,-.1100727990269661,.6904156804084778,.4721749126911163,0,2,13,0,2,6,-1,13,0,1,6,2,.0002861965913325548,.4524914920330048,.5548306107521057,0,2,0,19,2,1,-1,1,19,1,1,2,2942532955785282e-20,.5370373725891113,.4236463904380798,0,3,16,10,4,10,-1,18,10,2,5,2,16,15,2,5,2,-.0248865708708763,.6423557996749878,.4969303905963898,0,2,4,8,10,3,-1,4,9,10,1,3,.0331488512456417,.4988475143909454,.1613811999559403,0,2,14,12,3,3,-1,14,13,3,1,3,.0007849169196560979,.541602611541748,.4223009049892426,0,3,0,10,4,10,-1,0,10,2,5,2,2,15,2,5,2,.004708718974143267,.4576328992843628,.6027557849884033,0,2,18,3,2,6,-1,18,5,2,2,3,.0024144479539245367,.530897319316864,.4422498941421509,0,2,6,6,1,3,-1,6,7,1,1,3,.0019523180089890957,.4705634117126465,.666332483291626,0,2,7,7,7,2,-1,7,8,7,1,2,.0013031980488449335,.4406126141548157,.5526962280273438,0,2,0,3,2,6,-1,0,5,2,2,3,.004473549779504538,.5129023790359497,.3301498889923096,0,2,11,1,3,1,-1,12,1,1,1,3,-.002665286883711815,.3135471045970917,.5175036191940308,0,2,5,0,2,6,-1,6,0,1,6,2,.0001366677024634555,.4119370877742767,.530687689781189,0,2,1,1,18,14,-1,7,1,6,14,3,-.0171264503151178,.6177806258201599,.4836578965187073,0,2,4,6,8,3,-1,8,6,4,3,2,-.0002660143072716892,.3654330968856812,.5169736742973328,0,2,9,12,6,2,-1,9,12,3,2,2,-.022932380437851,.349091500043869,.5163992047309875,0,2,5,12,6,2,-1,8,12,3,2,2,.0023316550068557262,.5166299939155579,.3709389865398407,0,2,10,7,3,5,-1,11,7,1,5,3,.016925660893321,.501473605632782,.8053988218307495,0,2,7,7,3,5,-1,8,7,1,5,3,-.008985882624983788,.6470788717269897,.465702086687088,0,2,13,0,3,10,-1,14,0,1,10,3,-.0118746999651194,.3246378898620606,.5258755087852478,0,2,4,11,3,2,-1,4,12,3,1,2,.00019350569345988333,.5191941857337952,.3839643895626068,0,2,17,3,3,6,-1,18,3,1,6,3,.005871349014341831,.4918133914470673,.6187043190002441,0,2,1,8,18,10,-1,1,13,18,5,2,-.2483879029750824,.1836802959442139,.4988150000572205,0,2,13,0,3,10,-1,14,0,1,10,3,.0122560001909733,.5227053761482239,.3632029891014099,0,2,9,14,2,3,-1,9,15,2,1,3,.0008399017970077693,.4490250051021576,.5774148106575012,0,2,16,3,3,7,-1,17,3,1,7,3,.002540736924856901,.4804787039756775,.5858299136161804,0,2,4,0,3,10,-1,5,0,1,10,3,-.0148224299773574,.2521049976348877,.5023537278175354,0,2,16,3,3,7,-1,17,3,1,7,3,-.005797395948320627,.5996695756912231,.4853715002536774,0,2,0,9,1,2,-1,0,10,1,1,2,.000726621481589973,.5153716802597046,.3671779930591583,0,2,18,1,2,10,-1,18,1,1,10,2,-.0172325801104307,.6621719002723694,.4994656145572662,0,2,0,1,2,10,-1,1,1,1,10,2,.007862408645451069,.4633395075798035,.6256101727485657,0,2,10,16,3,4,-1,11,16,1,4,3,-.004734362009912729,.3615573048591614,.5281885266304016,0,2,2,8,3,3,-1,3,8,1,3,3,.0008304847870022058,.4442889094352722,.5550957918167114,0,3,11,0,2,6,-1,12,0,1,3,2,11,3,1,3,2,.00766021991148591,.5162935256958008,.2613354921340942,0,3,7,0,2,6,-1,7,0,1,3,2,8,3,1,3,2,-.004104837775230408,.2789632081985474,.5019031763076782,0,2,16,3,3,7,-1,17,3,1,7,3,.004851257894188166,.4968984127044678,.5661668181419373,0,2,1,3,3,7,-1,2,3,1,7,3,.0009989645332098007,.4445607960224152,.5551813244819641,0,2,14,1,6,16,-1,16,1,2,16,3,-.2702363133430481,.0293882098048925,.515131413936615,0,2,0,1,6,16,-1,2,1,2,16,3,-.0130906803533435,.5699399709701538,.4447459876537323,0,3,2,0,16,8,-1,10,0,8,4,2,2,4,8,4,2,-.009434279054403305,.4305466115474701,.5487895011901855,0,2,6,8,5,3,-1,6,9,5,1,3,-.0015482039889320731,.3680317103862763,.512808084487915,0,2,9,7,3,3,-1,10,7,1,3,3,.005374613218009472,.4838916957378388,.6101555824279785,0,2,8,8,4,3,-1,8,9,4,1,3,.0015786769799888134,.5325223207473755,.4118548035621643,0,2,9,6,2,4,-1,9,6,1,4,2,.003685605013743043,.4810948073863983,.6252303123474121,0,2,0,7,15,1,-1,5,7,5,1,3,.009388701990246773,.520022988319397,.3629410862922669,0,2,8,2,7,9,-1,8,5,7,3,3,.0127926301211119,.4961709976196289,.673801600933075,0,3,1,7,16,4,-1,1,7,8,2,2,9,9,8,2,2,-.003366104094311595,.4060279130935669,.5283598899841309,0,2,6,12,8,2,-1,6,13,8,1,2,.00039771420415490866,.4674113988876343,.5900775194168091,0,2,8,11,3,3,-1,8,12,3,1,3,.0014868030557408929,.4519116878509522,.6082053780555725,0,3,4,5,14,10,-1,11,5,7,5,2,4,10,7,5,2,-.0886867493391037,.2807899117469788,.5180991888046265,0,2,4,12,3,2,-1,4,13,3,1,2,-7429611287079751e-20,.5295584201812744,.408762514591217,0,2,9,11,6,1,-1,11,11,2,1,3,-14932939848222304e-21,.5461400151252747,.4538542926311493,0,2,4,9,7,6,-1,4,11,7,2,3,.005916223861277103,.5329161286354065,.4192134141921997,0,2,7,10,6,3,-1,7,11,6,1,3,.001114164013415575,.4512017965316773,.5706217288970947,0,2,9,11,2,2,-1,9,12,2,1,2,8924936264520511e-20,.4577805995941162,.5897638201713562,0,2,0,5,20,6,-1,0,7,20,2,3,.0025319510605186224,.5299603939056396,.3357639014720917,0,2,6,4,6,1,-1,8,4,2,1,3,.0124262003228068,.4959059059619904,.1346601992845535,0,2,9,11,6,1,-1,11,11,2,1,3,.0283357501029968,.5117079019546509,.0006104363710619509,0,2,5,11,6,1,-1,7,11,2,1,3,.006616588216274977,.4736349880695343,.7011628150939941,0,2,10,16,3,4,-1,11,16,1,4,3,.008046876639127731,.5216417908668518,.3282819986343384,0,2,8,7,3,3,-1,9,7,1,3,3,-.001119398046284914,.5809860825538635,.4563739001750946,0,2,2,12,16,8,-1,2,16,16,4,2,.0132775902748108,.5398362278938293,.4103901088237763,0,2,0,15,15,2,-1,0,16,15,1,2,.0004879473999608308,.424928605556488,.5410590767860413,0,2,15,4,5,6,-1,15,6,5,2,3,.0112431701272726,.526996374130249,.3438215851783752,0,2,9,5,2,4,-1,10,5,1,4,2,-.0008989666821435094,.5633075833320618,.4456613063812256,0,2,8,10,9,6,-1,8,12,9,2,3,.006667715962976217,.5312889218330383,.4362679123878479,0,2,2,19,15,1,-1,7,19,5,1,3,.0289472993463278,.4701794981956482,.657579779624939,0,2,10,16,3,4,-1,11,16,1,4,3,-.0234000496566296,0,.5137398838996887,0,2,0,15,20,4,-1,0,17,20,2,2,-.0891170501708984,.0237452797591686,.4942430853843689,0,2,10,16,3,4,-1,11,16,1,4,3,-.0140546001493931,.3127323091030121,.511751115322113,0,2,7,16,3,4,-1,8,16,1,4,3,.008123939856886864,.50090491771698,.2520025968551636,0,2,9,16,3,3,-1,9,17,3,1,3,-.004996465053409338,.6387143731117249,.4927811920642853,0,2,8,11,4,6,-1,8,14,4,3,2,.0031253970228135586,.5136849880218506,.3680452108383179,0,2,9,6,2,12,-1,9,10,2,4,3,.006766964215785265,.5509843826293945,.4363631904125214,0,2,8,17,4,3,-1,8,18,4,1,3,-.002371144015341997,.6162335276603699,.4586946964263916,0,3,9,18,8,2,-1,13,18,4,1,2,9,19,4,1,2,-.005352279171347618,.6185457706451416,.4920490980148315,0,2,1,18,8,2,-1,1,19,8,1,2,-.0159688591957092,.1382617950439453,.4983252882957459,0,2,13,5,6,15,-1,15,5,2,15,3,.004767606034874916,.4688057899475098,.5490046143531799,0,2,9,8,2,2,-1,9,9,2,1,2,-.002471469109877944,.2368514984846115,.5003952980041504,0,2,9,5,2,3,-1,9,5,1,3,2,-.0007103378884494305,.5856394171714783,.4721533060073853,0,2,1,5,6,15,-1,3,5,2,15,3,-.1411755979061127,.0869000628590584,.4961591064929962,0,3,4,1,14,8,-1,11,1,7,4,2,4,5,7,4,2,.1065180972218514,.5138837099075317,.1741005033254623,0,3,2,4,4,16,-1,2,4,2,8,2,4,12,2,8,2,-.0527447499334812,.7353636026382446,.4772881865501404,0,2,12,4,3,12,-1,12,10,3,6,2,-.00474317604675889,.3884406089782715,.5292701721191406,0,3,4,5,10,12,-1,4,5,5,6,2,9,11,5,6,2,.0009967676596716046,.5223492980003357,.4003424048423767,0,2,9,14,2,3,-1,9,15,2,1,3,.00802841316908598,.4959106147289276,.7212964296340942,0,2,5,4,2,3,-1,5,5,2,1,3,.0008602585876360536,.4444884061813355,.55384761095047,0,3,12,2,4,10,-1,14,2,2,5,2,12,7,2,5,2,.0009319150121882558,.539837121963501,.4163244068622589,0,2,6,4,7,3,-1,6,5,7,1,3,-.002508206060156226,.5854265093803406,.456250011920929,0,3,2,0,18,2,-1,11,0,9,1,2,2,1,9,1,2,-.0021378761157393456,.4608069062232971,.5280259251594543,0,3,0,0,18,2,-1,0,0,9,1,2,9,1,9,1,2,-.002154604997485876,.3791126906871796,.5255997180938721,0,3,13,13,4,6,-1,15,13,2,3,2,13,16,2,3,2,-.007621400989592075,.5998609066009521,.4952073991298676,0,3,3,13,4,6,-1,3,13,2,3,2,5,16,2,3,2,.002205536002293229,.4484206140041351,.5588530898094177,0,2,10,12,2,6,-1,10,15,2,3,2,.0012586950324475765,.5450747013092041,.4423840939998627,0,3,5,9,10,10,-1,5,9,5,5,2,10,14,5,5,2,-.005092672072350979,.4118275046348572,.5263035893440247,0,3,11,4,4,2,-1,13,4,2,1,2,11,5,2,1,2,-.0025095739401876926,.5787907838821411,.4998494982719421,0,2,7,12,6,8,-1,10,12,3,8,2,-.0773275569081306,.8397865891456604,.481112003326416,0,3,12,2,4,10,-1,14,2,2,5,2,12,7,2,5,2,-.041485819965601,.240861102938652,.5176993012428284,0,2,8,11,2,1,-1,9,11,1,1,2,.00010355669655837119,.4355360865592957,.5417054295539856,0,2,10,5,1,12,-1,10,9,1,4,3,.0013255809899419546,.5453971028327942,.4894095063209534,0,2,0,11,6,9,-1,3,11,3,9,2,-.00805987324565649,.5771024227142334,.4577918946743012,0,3,12,2,4,10,-1,14,2,2,5,2,12,7,2,5,2,.019058620557189,.5169867873191833,.3400475084781647,0,3,4,2,4,10,-1,4,2,2,5,2,6,7,2,5,2,-.0350578911602497,.2203243970870972,.5000503063201904,0,3,11,4,4,2,-1,13,4,2,1,2,11,5,2,1,2,.005729605909436941,.5043408274650574,.6597570776939392,0,2,0,14,6,3,-1,0,15,6,1,3,-.0116483299061656,.2186284959316254,.4996652901172638,0,3,11,4,4,2,-1,13,4,2,1,2,11,5,2,1,2,.0014544479781761765,.5007681846618652,.5503727793693542,0,2,6,1,3,2,-1,7,1,1,2,3,-.00025030909455381334,.4129841029644013,.524167001247406,0,3,11,4,4,2,-1,13,4,2,1,2,11,5,2,1,2,-.000829072727356106,.541286826133728,.4974496066570282,0,3,5,4,4,2,-1,5,4,2,1,2,7,5,2,1,2,.0010862209601327777,.460552990436554,.5879228711128235,0,3,13,0,2,12,-1,14,0,1,6,2,13,6,1,6,2,.0002000050008064136,.5278854966163635,.4705209136009216,0,2,6,0,3,10,-1,7,0,1,10,3,.0029212920926511288,.5129609704017639,.375553697347641,0,2,3,0,17,8,-1,3,4,17,4,2,.0253874007612467,.4822691977024078,.5790768265724182,0,2,0,4,20,4,-1,0,6,20,2,2,-.00319684692658484,.5248395204544067,.3962840139865875,90.25334930419922,182,0,2,0,3,8,2,-1,4,3,4,2,2,.005803173873573542,.3498983979225159,.596198320388794,0,2,8,11,4,3,-1,8,12,4,1,3,-.009000306949019432,.6816636919975281,.4478552043437958,0,3,5,7,6,4,-1,5,7,3,2,2,8,9,3,2,2,-.00115496595390141,.5585706233978271,.3578251004219055,0,2,8,3,4,9,-1,8,6,4,3,3,-.0011069850297644734,.5365036129951477,.3050428032875061,0,2,8,15,1,4,-1,8,17,1,2,2,.00010308309720130637,.363909512758255,.5344635844230652,0,2,4,5,12,7,-1,8,5,4,7,3,-.005098483990877867,.2859157025814056,.5504264831542969,0,3,4,2,4,10,-1,4,2,2,5,2,6,7,2,5,2,.0008257220033556223,.5236523747444153,.3476041853427887,0,2,3,0,17,2,-1,3,1,17,1,2,.009978332556784153,.4750322103500366,.621964693069458,0,2,2,2,16,15,-1,2,7,16,5,3,-.0374025292694569,.334337592124939,.527806282043457,0,2,15,2,5,2,-1,15,3,5,1,2,.0048548257909715176,.5192180871963501,.3700444102287293,0,2,9,3,2,2,-1,10,3,1,2,2,-.001866447040811181,.2929843962192535,.5091944932937622,0,2,4,5,16,15,-1,4,10,16,5,3,.0168888904154301,.3686845898628235,.5431225895881653,0,2,7,13,5,6,-1,7,16,5,3,2,-.005837262142449617,.3632183969020844,.5221335887908936,0,2,10,7,3,2,-1,11,7,1,2,3,-.00147137395106256,.5870683789253235,.4700650870800018,0,2,8,3,3,1,-1,9,3,1,1,3,-.0011522950371727347,.3195894956588745,.5140954256057739,0,2,9,16,3,3,-1,9,17,3,1,3,-.004256030078977346,.6301859021186829,.4814921021461487,0,2,0,2,5,2,-1,0,3,5,1,2,-.006737829186022282,.1977048069238663,.5025808215141296,0,2,12,5,4,3,-1,12,6,4,1,3,.0113826701417565,.495413213968277,.6867045760154724,0,2,1,7,12,1,-1,5,7,4,1,3,.005179470870643854,.5164427757263184,.3350647985935211,0,2,7,5,6,14,-1,7,12,6,7,2,-.1174378991127014,.2315246015787125,.5234413743019104,0,3,0,0,8,10,-1,0,0,4,5,2,4,5,4,5,2,.0287034492939711,.4664297103881836,.6722521185874939,0,2,9,1,3,2,-1,10,1,1,2,3,.004823103081434965,.5220875144004822,.2723532915115356,0,2,8,1,3,2,-1,9,1,1,2,3,.0026798530016094446,.5079277157783508,.2906948924064636,0,2,12,4,3,3,-1,12,5,3,1,3,.008050408214330673,.4885950982570648,.6395021080970764,0,2,7,4,6,16,-1,7,12,6,8,2,.004805495962500572,.5197256803512573,.365666389465332,0,2,12,4,3,3,-1,12,5,3,1,3,-.0022420159075409174,.6153467893600464,.4763701856136322,0,2,2,3,2,6,-1,2,5,2,2,3,-.0137577103450894,.2637344896793366,.5030903220176697,0,2,14,2,6,9,-1,14,5,6,3,3,-.1033829972147942,.2287521958351135,.5182461142539978,0,2,5,4,3,3,-1,5,5,3,1,3,-.009443208575248718,.6953303813934326,.4694949090480804,0,2,9,17,3,2,-1,10,17,1,2,3,.0008027118165045977,.5450655221939087,.4268783926963806,0,2,5,5,2,3,-1,5,6,2,1,3,-.004194566980004311,.6091387867927551,.4571642875671387,0,2,13,11,3,6,-1,13,13,3,2,3,.0109422104433179,.5241063237190247,.3284547030925751,0,2,3,14,2,6,-1,3,17,2,3,2,-.0005784106906503439,.5387929081916809,.4179368913173676,0,2,14,3,6,2,-1,14,4,6,1,2,-.002088862005621195,.4292691051959992,.5301715731620789,0,2,0,8,16,2,-1,0,9,16,1,2,.0032383969519287348,.379234790802002,.5220744013786316,0,2,14,3,6,2,-1,14,4,6,1,2,.004907502792775631,.5237283110618591,.4126757979393005,0,2,0,0,5,6,-1,0,2,5,2,3,-.0322779417037964,.1947655975818634,.4994502067565918,0,2,12,5,4,3,-1,12,6,4,1,3,-.008971123024821281,.6011285185813904,.4929032027721405,0,2,4,11,3,6,-1,4,13,3,2,3,.0153210898861289,.5009753704071045,.2039822041988373,0,2,12,5,4,3,-1,12,6,4,1,3,.002085556974634528,.4862189888954163,.5721694827079773,0,2,9,5,1,3,-1,9,6,1,1,3,.005061502102762461,.5000218749046326,.1801805943250656,0,2,12,5,4,3,-1,12,6,4,1,3,-.0037174751050770283,.5530117154121399,.4897592961788178,0,2,6,6,8,12,-1,6,12,8,6,2,-.0121705001220107,.4178605973720551,.5383723974227905,0,2,12,5,4,3,-1,12,6,4,1,3,.004624839872121811,.4997169971466065,.5761327147483826,0,2,5,12,9,2,-1,8,12,3,2,3,-.0002104042941937223,.5331807136535645,.4097681045532227,0,2,12,5,4,3,-1,12,6,4,1,3,-.0146417804062366,.5755925178527832,.5051776170730591,0,2,4,5,4,3,-1,4,6,4,1,3,.00331994891166687,.4576976895332336,.6031805872917175,0,2,6,6,9,2,-1,9,6,3,2,3,.003723687957972288,.4380396902561188,.541588306427002,0,2,4,11,1,3,-1,4,12,1,1,3,.0008295116131193936,.5163031816482544,.3702219128608704,0,2,14,12,6,6,-1,14,12,3,6,2,-.0114084901288152,.6072946786880493,.4862565100193024,0,2,7,0,3,7,-1,8,0,1,7,3,-.004532012157142162,.3292475938796997,.5088962912559509,0,2,9,8,3,3,-1,10,8,1,3,3,.00512760179117322,.4829767942428589,.6122708916664124,0,2,8,8,3,3,-1,9,8,1,3,3,.00985831581056118,.4660679996013641,.6556177139282227,0,2,5,10,11,3,-1,5,11,11,1,3,.036985918879509,.5204849243164062,.1690472066402435,0,2,5,7,10,1,-1,10,7,5,1,2,.004649116192013025,.5167322158813477,.3725225031375885,0,2,9,7,3,2,-1,10,7,1,2,3,-.004266470205038786,.6406493186950684,.4987342953681946,0,2,8,7,3,2,-1,9,7,1,2,3,-.0004795659042429179,.5897293090820312,.4464873969554901,0,2,11,9,4,2,-1,11,9,2,2,2,.0036827160511165857,.5441560745239258,.347266286611557,0,2,5,9,4,2,-1,7,9,2,2,2,-.0100598800927401,.2143162935972214,.500482976436615,0,2,14,10,2,4,-1,14,12,2,2,2,-.0003036184061784297,.538642406463623,.4590323865413666,0,2,7,7,3,2,-1,8,7,1,2,3,-.0014545479789376259,.5751184225082397,.4497095048427582,0,2,14,17,6,3,-1,14,18,6,1,3,.0016515209572389722,.5421937704086304,.4238520860671997,0,3,4,5,12,12,-1,4,5,6,6,2,10,11,6,6,2,-.007846863940358162,.4077920913696289,.5258157253265381,0,3,6,9,8,8,-1,10,9,4,4,2,6,13,4,4,2,-.005125985015183687,.422927588224411,.5479453206062317,0,2,0,4,15,4,-1,5,4,5,4,3,-.0368909612298012,.6596375703811646,.4674678146839142,0,2,13,2,4,1,-1,13,2,2,1,2,.0002403563994448632,.4251135885715485,.5573202967643738,0,2,4,12,2,2,-1,4,13,2,1,2,-15150169929256663e-21,.5259246826171875,.4074114859104157,0,2,8,13,4,3,-1,8,14,4,1,3,.0022108471021056175,.4671722948551178,.5886352062225342,0,2,9,13,2,3,-1,9,14,2,1,3,-.0011568620102480054,.5711066126823425,.4487161934375763,0,2,13,11,2,3,-1,13,12,2,1,3,.004999629221856594,.5264198184013367,.2898327112197876,0,3,7,12,4,4,-1,7,12,2,2,2,9,14,2,2,2,-.0014656189596280456,.3891738057136536,.5197871923446655,0,3,10,11,2,2,-1,11,11,1,1,2,10,12,1,1,2,-.0011975039960816503,.5795872807502747,.4927955865859985,0,2,8,17,3,2,-1,9,17,1,2,3,-.0044954330660402775,.2377603054046631,.5012555122375488,0,3,10,11,2,2,-1,11,11,1,1,2,10,12,1,1,2,.00014997160178609192,.4876626133918762,.5617607831954956,0,2,0,17,6,3,-1,0,18,6,1,3,.002639150945469737,.516808807849884,.3765509128570557,0,3,10,11,2,2,-1,11,11,1,1,2,10,12,1,1,2,-.0002936813107226044,.5446649193763733,.4874630868434906,0,3,8,11,2,2,-1,8,11,1,1,2,9,12,1,1,2,.0014211760135367513,.4687897861003876,.669133186340332,0,2,12,5,8,4,-1,12,5,4,4,2,.0794276371598244,.5193443894386292,.273294597864151,0,2,0,5,8,4,-1,4,5,4,4,2,.0799375027418137,.4971731007099152,.1782083958387375,0,2,13,2,4,1,-1,13,2,2,1,2,.0110892597585917,.5165994763374329,.3209475874900818,0,2,3,2,4,1,-1,5,2,2,1,2,.00016560709627810866,.4058471918106079,.5307276248931885,0,3,10,0,4,2,-1,12,0,2,1,2,10,1,2,1,2,-.0053354292176663876,.3445056974887848,.5158129930496216,0,2,7,12,3,1,-1,8,12,1,1,3,.0011287260567769408,.4594863057136536,.6075533032417297,0,3,8,11,4,8,-1,10,11,2,4,2,8,15,2,4,2,-.0219692196696997,.1680400967597961,.5228595733642578,0,2,9,9,2,2,-1,9,10,2,1,2,-.00021775320055894554,.3861596882343292,.5215672850608826,0,2,3,18,15,2,-1,3,19,15,1,2,.00020200149447191507,.5517979264259338,.4363039135932922,0,3,2,6,2,12,-1,2,6,1,6,2,3,12,1,6,2,-.0217331498861313,.7999460101127625,.4789851009845734,0,2,9,8,2,3,-1,9,9,2,1,3,-.0008439993252977729,.4085975885391235,.5374773144721985,0,2,7,10,3,2,-1,8,10,1,2,3,-.00043895249837078154,.5470405220985413,.4366143047809601,0,2,11,11,3,1,-1,12,11,1,1,3,.0015092400135472417,.4988996982574463,.5842149257659912,0,2,6,11,3,1,-1,7,11,1,1,3,-.003554783994331956,.6753690242767334,.4721005856990814,0,3,9,2,4,2,-1,11,2,2,1,2,9,3,2,1,2,.00048191400128416717,.541585385799408,.4357109069824219,0,2,4,12,2,3,-1,4,13,2,1,3,-.00602643983438611,.2258509993553162,.499188095331192,0,2,2,1,18,3,-1,8,1,6,3,3,-.0116681400686502,.625655472278595,.4927498996257782,0,2,5,1,4,14,-1,7,1,2,14,2,-.0028718370012938976,.3947784900665283,.524580180644989,0,2,8,16,12,3,-1,8,16,6,3,2,.0170511696487665,.4752511084079742,.5794224143028259,0,2,1,17,18,3,-1,7,17,6,3,3,-.0133520802482963,.6041104793548584,.4544535875320435,0,2,9,14,2,6,-1,9,17,2,3,2,-.0003930180100724101,.4258275926113129,.5544905066490173,0,2,9,12,1,8,-1,9,16,1,4,2,.0030483349692076445,.5233420133590698,.3780272901058197,0,2,9,14,2,3,-1,9,15,2,1,3,-.00435792887583375,.6371889114379883,.4838674068450928,0,2,9,6,2,12,-1,9,10,2,4,3,.0056661018170416355,.5374705791473389,.4163666069507599,0,2,12,9,3,3,-1,12,10,3,1,3,6067733920644969e-20,.4638795852661133,.5311625003814697,0,2,0,1,4,8,-1,2,1,2,8,2,.0367381609976292,.4688656032085419,.6466524004936218,0,3,9,1,6,2,-1,12,1,3,1,2,9,2,3,1,2,.008652813732624054,.5204318761825562,.2188657969236374,0,2,1,3,12,14,-1,1,10,12,7,2,-.1537135988473892,.1630371958017349,.4958840012550354,0,3,8,12,4,2,-1,10,12,2,1,2,8,13,2,1,2,-.00041560421232134104,.577445924282074,.4696458876132965,0,3,1,9,10,2,-1,1,9,5,1,2,6,10,5,1,2,-.0012640169588848948,.3977175951004028,.5217198133468628,0,2,8,15,4,3,-1,8,16,4,1,3,-.003547334112226963,.6046528220176697,.480831503868103,0,2,6,8,8,3,-1,6,9,8,1,3,3001906952704303e-20,.3996723890304565,.5228201150894165,0,2,9,15,5,3,-1,9,16,5,1,3,.00131130195222795,.4712158143520355,.5765997767448425,0,2,8,7,4,3,-1,8,8,4,1,3,-.0013374709524214268,.4109584987163544,.5253170132637024,0,2,7,7,6,2,-1,7,8,6,1,2,.0208767093718052,.5202993750572205,.1757981926202774,0,3,5,7,8,2,-1,5,7,4,1,2,9,8,4,1,2,-.007549794856458902,.6566609740257263,.4694975018501282,0,2,12,9,3,3,-1,12,10,3,1,3,.0241885501891375,.5128673911094666,.3370220959186554,0,2,4,7,4,2,-1,4,8,4,1,2,-.002935882890596986,.658078670501709,.4694541096687317,0,2,14,2,6,9,-1,14,5,6,3,3,.0575579293072224,.5146445035934448,.2775259912014008,0,2,4,9,3,3,-1,5,9,1,3,3,-.0011343370424583554,.3836601972579956,.5192667245864868,0,2,12,9,3,3,-1,12,10,3,1,3,.0168169997632504,.5085592865943909,.6177260875701904,0,2,0,2,6,9,-1,0,5,6,3,3,.005053517874330282,.5138763189315796,.3684791922569275,0,2,17,3,3,6,-1,18,3,1,6,3,-.004587471019476652,.5989655256271362,.4835202097892761,0,2,0,3,3,6,-1,1,3,1,6,3,.001688246033154428,.4509486854076386,.5723056793212891,0,2,17,14,1,2,-1,17,15,1,1,2,-.0016554000321775675,.3496770858764648,.5243319272994995,0,2,4,9,4,3,-1,6,9,2,3,2,-.0193738006055355,.1120536997914314,.496871292591095,0,2,12,9,3,3,-1,12,10,3,1,3,.0103744501248002,.5148196816444397,.4395213127136231,0,2,5,9,3,3,-1,5,10,3,1,3,.00014973050565458834,.4084999859333038,.526988685131073,0,3,9,5,6,8,-1,12,5,3,4,2,9,9,3,4,2,-.042981930077076,.6394104957580566,.501850426197052,0,3,5,5,6,8,-1,5,5,3,4,2,8,9,3,4,2,.008306593634188175,.470755398273468,.6698353290557861,0,2,16,1,4,6,-1,16,4,4,3,2,-.0041285790503025055,.4541369080543518,.5323647260665894,0,2,1,0,6,20,-1,3,0,2,20,3,.0017399420030415058,.433396190404892,.5439866185188293,0,2,12,11,3,2,-1,13,11,1,2,3,.00011739750334527344,.4579687118530273,.5543426275253296,0,2,5,11,3,2,-1,6,11,1,2,3,.00018585780344437808,.4324643909931183,.5426754951477051,0,2,9,4,6,1,-1,11,4,2,1,3,.005558769218623638,.525722086429596,.3550611138343811,0,2,0,0,8,3,-1,4,0,4,3,2,-.007985156029462814,.6043018102645874,.4630635976791382,0,2,15,0,2,5,-1,15,0,1,5,2,.0006059412262402475,.4598254859447479,.55331951379776,0,2,4,1,3,2,-1,5,1,1,2,3,-.0002298304025316611,.4130752086639404,.5322461128234863,0,2,7,0,6,15,-1,9,0,2,15,3,.0004374021082185209,.4043039977550507,.5409289002418518,0,2,6,11,3,1,-1,7,11,1,1,3,.0002948202018160373,.4494963884353638,.5628852248191833,0,2,12,0,3,4,-1,13,0,1,4,3,.0103126596659422,.5177510976791382,.2704316973686218,0,2,5,4,6,1,-1,7,4,2,1,3,-.007724110968410969,.1988019049167633,.4980553984642029,0,2,12,7,3,2,-1,12,8,3,1,2,-.004679720848798752,.6644750237464905,.5018296241760254,0,2,0,1,4,6,-1,0,4,4,3,2,-.005075545981526375,.3898304998874664,.5185269117355347,0,2,12,7,3,2,-1,12,8,3,1,2,.00224797404371202,.4801808893680573,.5660336017608643,0,2,2,16,3,3,-1,2,17,3,1,3,.0008332700817845762,.5210919976234436,.3957188129425049,0,3,13,8,6,10,-1,16,8,3,5,2,13,13,3,5,2,-.0412793308496475,.6154541969299316,.5007054209709167,0,2,0,9,5,2,-1,0,10,5,1,2,-.0005093018990010023,.3975942134857178,.5228403806686401,0,3,12,11,2,2,-1,13,11,1,1,2,12,12,1,1,2,.0012568780221045017,.4979138076305389,.5939183235168457,0,2,3,15,3,3,-1,3,16,3,1,3,.008004849776625633,.4984497129917145,.1633366048336029,0,2,12,7,3,2,-1,12,8,3,1,2,-.0011879300000146031,.5904964804649353,.4942624866962433,0,2,5,7,3,2,-1,5,8,3,1,2,.0006194895249791443,.4199557900428772,.5328726172447205,0,2,9,5,9,9,-1,9,8,9,3,3,.006682985927909613,.5418602824211121,.490588903427124,0,2,5,0,3,7,-1,6,0,1,7,3,-.0037062340416014194,.3725939095020294,.5138000249862671,0,2,5,2,12,5,-1,9,2,4,5,3,-.0397394113242626,.6478961110115051,.5050346851348877,0,3,6,11,2,2,-1,6,11,1,1,2,7,12,1,1,2,.0014085009461268783,.4682339131832123,.6377884149551392,0,2,15,15,3,2,-1,15,16,3,1,2,.0003932268882635981,.5458530187606812,.415048211812973,0,2,2,15,3,2,-1,2,16,3,1,2,-.0018979819724336267,.3690159916877747,.5149704217910767,0,3,14,12,6,8,-1,17,12,3,4,2,14,16,3,4,2,-.0139704402536154,.6050562858581543,.4811357855796814,0,2,2,8,15,6,-1,7,8,5,6,3,-.1010081991553307,.2017080038785934,.4992361962795258,0,2,2,2,18,17,-1,8,2,6,17,3,-.0173469204455614,.5713148713111877,.4899486005306244,0,2,5,1,4,1,-1,7,1,2,1,2,.000156197595060803,.4215388894081116,.5392642021179199,0,2,5,2,12,5,-1,9,2,4,5,3,.1343892961740494,.5136151909828186,.3767612874507904,0,2,3,2,12,5,-1,7,2,4,5,3,-.0245822407305241,.7027357816696167,.4747906923294067,0,3,4,9,12,4,-1,10,9,6,2,2,4,11,6,2,2,-.0038553720805794,.4317409098148346,.5427716970443726,0,3,5,15,6,2,-1,5,15,3,1,2,8,16,3,1,2,-.002316524973139167,.594269871711731,.4618647992610931,0,2,10,14,2,3,-1,10,15,2,1,3,-.004851812031120062,.6191568970680237,.4884895086288452,0,3,0,13,20,2,-1,0,13,10,1,2,10,14,10,1,2,.002469993894919753,.5256664752960205,.4017199873924255,0,3,4,9,12,8,-1,10,9,6,4,2,4,13,6,4,2,.0454969592392445,.5237867832183838,.2685773968696594,0,2,8,13,3,6,-1,8,16,3,3,2,-.0203195996582508,.213044598698616,.4979738891124725,0,2,10,12,2,2,-1,10,13,2,1,2,.0002699499891605228,.481404185295105,.5543122291564941,0,3,9,12,2,2,-1,9,12,1,1,2,10,13,1,1,2,-.0018232699949294329,.6482579708099365,.4709989130496979,0,3,4,11,14,4,-1,11,11,7,2,2,4,13,7,2,2,-.006301579065620899,.4581927955150604,.5306236147880554,0,2,8,5,4,2,-1,8,6,4,1,2,-.0002413949987385422,.5232086777687073,.4051763117313385,0,2,10,10,6,3,-1,12,10,2,3,3,-.001033036969602108,.5556201934814453,.4789193868637085,0,2,2,14,1,2,-1,2,15,1,1,2,.0001804116036510095,.5229442715644836,.4011810123920441,0,3,13,8,6,12,-1,16,8,3,6,2,13,14,3,6,2,-.0614078603684902,.62986820936203,.5010703206062317,0,3,1,8,6,12,-1,1,8,3,6,2,4,14,3,6,2,-.0695439130067825,.7228280901908875,.4773184061050415,0,2,10,0,6,10,-1,12,0,2,10,3,-.0705426633358002,.2269513010978699,.5182529091835022,0,3,5,11,8,4,-1,5,11,4,2,2,9,13,4,2,2,.0024423799477517605,.5237097144126892,.4098151028156281,0,3,10,16,8,4,-1,14,16,4,2,2,10,18,4,2,2,.0015494349645450711,.4773750901222229,.5468043088912964,0,2,7,7,6,6,-1,9,7,2,6,3,-.0239142198115587,.7146975994110107,.4783824980258942,0,2,10,2,4,10,-1,10,2,2,10,2,-.0124536901712418,.2635296881198883,.5241122841835022,0,2,6,1,4,9,-1,8,1,2,9,2,-.00020760179904755205,.3623757064342499,.5113608837127686,0,2,12,19,2,1,-1,12,19,1,1,2,29781080229440704e-21,.4705932140350342,.5432801842689514,104.74919891357422,211,0,2,1,2,4,9,-1,3,2,2,9,2,.0117727499455214,.3860518932342529,.6421167254447937,0,2,7,5,6,4,-1,9,5,2,4,3,.0270375702530146,.4385654926300049,.675403892993927,0,2,9,4,2,4,-1,9,6,2,2,2,-3641950024757534e-20,.5487101078033447,.34233158826828,0,2,14,5,2,8,-1,14,9,2,4,2,.001999540952965617,.3230532109737396,.5400317907333374,0,2,7,6,5,12,-1,7,12,5,6,2,.0045278300531208515,.5091639757156372,.2935043871402741,0,2,14,6,2,6,-1,14,9,2,3,2,.00047890920541249216,.4178153872489929,.5344064235687256,0,2,4,6,2,6,-1,4,9,2,3,2,.0011720920447260141,.2899182140827179,.5132070779800415,0,3,8,15,10,4,-1,13,15,5,2,2,8,17,5,2,2,.0009530570241622627,.428012490272522,.5560845136642456,0,2,6,18,2,2,-1,7,18,1,2,2,15099150004971307e-21,.4044871926307678,.5404760241508484,0,2,11,3,6,2,-1,11,4,6,1,2,-.0006081790197640657,.4271768927574158,.5503466129302979,0,2,2,0,16,6,-1,2,2,16,2,3,.003322452073916793,.3962723910808563,.5369734764099121,0,2,11,3,6,2,-1,11,4,6,1,2,-.0011037490330636501,.4727177917957306,.5237749814987183,0,2,4,11,10,3,-1,4,12,10,1,3,-.0014350269921123981,.5603008270263672,.4223509132862091,0,2,11,3,6,2,-1,11,4,6,1,2,.0020767399109899998,.5225917100906372,.4732725918292999,0,2,3,3,6,2,-1,3,4,6,1,2,-.00016412809782195836,.3999075889587402,.5432739853858948,0,2,16,0,4,7,-1,16,0,2,7,2,.008830243721604347,.4678385853767395,.6027327179908752,0,2,0,14,9,6,-1,0,16,9,2,3,-.0105520701035857,.3493967056274414,.5213974714279175,0,2,9,16,3,3,-1,9,17,3,1,3,-.00227316003292799,.6185818910598755,.4749062955379486,0,2,4,6,6,2,-1,6,6,2,2,3,-.0008478633244521916,.5285341143608093,.3843482136726379,0,2,15,11,1,3,-1,15,12,1,1,3,.0012081359745934606,.536064088344574,.3447335958480835,0,2,5,5,2,3,-1,5,6,2,1,3,.002651273040100932,.4558292031288147,.6193962097167969,0,2,10,9,2,2,-1,10,10,2,1,2,-.0011012479662895203,.368023008108139,.5327628254890442,0,2,3,1,4,3,-1,5,1,2,3,2,.0004956151824444532,.396059513092041,.5274940729141235,0,2,16,0,4,7,-1,16,0,2,7,2,-.0439017713069916,.7020444869995117,.4992839097976685,0,2,0,0,20,1,-1,10,0,10,1,2,.0346903502941132,.5049164295196533,.276660293340683,0,2,15,11,1,3,-1,15,12,1,1,3,-.002744219033047557,.2672632932662964,.5274971127510071,0,2,0,4,3,4,-1,1,4,1,4,3,.003331658896058798,.4579482972621918,.6001101732254028,0,2,16,3,3,6,-1,16,5,3,2,3,-.0200445707887411,.3171594142913818,.523571789264679,0,2,1,3,3,6,-1,1,5,3,2,3,.0013492030557245016,.5265362858772278,.4034324884414673,0,3,6,2,12,6,-1,12,2,6,3,2,6,5,6,3,2,.0029702018946409225,.5332456827163696,.4571984112262726,0,2,8,10,4,3,-1,8,11,4,1,3,.006303998176008463,.4593310952186585,.6034635901451111,0,3,4,2,14,6,-1,11,2,7,3,2,4,5,7,3,2,-.0129365902394056,.4437963962554932,.5372971296310425,0,2,9,11,2,3,-1,9,12,2,1,3,.004014872945845127,.4680323898792267,.6437833905220032,0,2,15,13,2,3,-1,15,14,2,1,3,-.002640167949721217,.3709631860256195,.5314332842826843,0,2,8,12,4,3,-1,8,13,4,1,3,.0139184398576617,.4723555147647858,.713080883026123,0,2,15,11,1,3,-1,15,12,1,1,3,-.00045087869511917233,.4492394030094147,.5370404124259949,0,2,7,13,5,2,-1,7,14,5,1,2,.00025384349282830954,.4406864047050476,.5514402985572815,0,2,7,12,6,3,-1,7,13,6,1,3,.002271000063046813,.4682416915893555,.5967984199523926,0,2,5,11,4,4,-1,5,13,4,2,2,.002412077970802784,.5079392194747925,.3018598854541779,0,2,11,4,3,3,-1,12,4,1,3,3,-3602567085181363e-20,.560103714466095,.4471096992492676,0,2,6,4,3,3,-1,7,4,1,3,3,-.0074905529618263245,.2207535058259964,.4989944100379944,0,2,16,5,3,6,-1,17,5,1,6,3,-.017513120546937,.6531215906143188,.5017648935317993,0,2,3,6,12,7,-1,7,6,4,7,3,.1428163051605225,.4967963099479675,.1482062041759491,0,2,16,5,3,6,-1,17,5,1,6,3,.005534526892006397,.4898946881294251,.5954223871231079,0,2,3,13,2,3,-1,3,14,2,1,3,-.0009632359142415226,.3927116990089417,.519607424736023,0,2,16,5,3,6,-1,17,5,1,6,3,-.0020370010752230883,.5613325238227844,.4884858131408691,0,2,1,5,3,6,-1,2,5,1,6,3,.0016614829655736685,.4472880065441132,.5578880906105042,0,2,1,9,18,1,-1,7,9,6,1,3,-.0031188090797513723,.3840532898902893,.5397477746009827,0,2,0,9,8,7,-1,4,9,4,7,2,-.006400061771273613,.5843983888626099,.4533218145370483,0,2,12,11,8,2,-1,12,12,8,1,2,.0003131960111204535,.5439221858978271,.4234727919101715,0,2,0,11,8,2,-1,0,12,8,1,2,-.0182220991700888,.1288464963436127,.4958404898643494,0,2,9,13,2,3,-1,9,14,2,1,3,.008796924725174904,.49512979388237,.7153480052947998,0,3,4,10,12,4,-1,4,10,6,2,2,10,12,6,2,2,-.004239507019519806,.3946599960327148,.5194936990737915,0,2,9,3,3,7,-1,10,3,1,7,3,.009708627127110958,.4897503852844238,.6064900159835815,0,2,7,2,3,5,-1,8,2,1,5,3,-.003993417136371136,.3245440125465393,.5060828924179077,0,3,9,12,4,6,-1,11,12,2,3,2,9,15,2,3,2,-.0167850591242313,.1581953018903732,.5203778743743896,0,2,8,7,3,6,-1,9,7,1,6,3,.018272090703249,.4680935144424439,.6626979112625122,0,2,15,4,4,2,-1,15,5,4,1,2,.00568728381767869,.5211697816848755,.3512184917926788,0,2,8,7,3,3,-1,9,7,1,3,3,-.0010739039862528443,.5768386125564575,.4529845118522644,0,2,14,2,6,4,-1,14,4,6,2,2,-.00370938703417778,.4507763087749481,.5313581228256226,0,2,7,16,6,1,-1,9,16,2,1,3,-.0002111070934915915,.5460820198059082,.4333376884460449,0,2,15,13,2,3,-1,15,14,2,1,3,.0010670139454305172,.5371856093406677,.4078390896320343,0,2,8,7,3,10,-1,9,7,1,10,3,.0035943021066486835,.4471287131309509,.5643836259841919,0,2,11,10,2,6,-1,11,12,2,2,3,-.005177603103220463,.4499393105506897,.5280330181121826,0,2,6,10,4,1,-1,8,10,2,1,2,-.00025414369883947074,.5516173243522644,.4407708048820496,0,2,10,9,2,2,-1,10,10,2,1,2,.006352256052196026,.5194190144538879,.2465227991342545,0,2,8,9,2,2,-1,8,10,2,1,2,-.00044205080484971404,.3830705881118774,.5139682292938232,0,3,12,7,2,2,-1,13,7,1,1,2,12,8,1,1,2,.0007448872784152627,.4891090989112854,.5974786877632141,0,3,5,7,2,2,-1,5,7,1,1,2,6,8,1,1,2,-.0035116379149258137,.7413681745529175,.4768764972686768,0,2,13,0,3,14,-1,14,0,1,14,3,-.0125409103929996,.3648819029331207,.5252826809883118,0,2,4,0,3,14,-1,5,0,1,14,3,.009493185207247734,.5100492835044861,.362958699464798,0,2,13,4,3,14,-1,14,4,1,14,3,.0129611501470208,.5232442021369934,.4333561062812805,0,2,9,14,2,3,-1,9,15,2,1,3,.004720944911241531,.4648149013519287,.6331052780151367,0,2,8,14,4,3,-1,8,15,4,1,3,-.0023119079414755106,.5930309891700745,.4531058073043823,0,2,4,2,3,16,-1,5,2,1,16,3,-.002826229901984334,.3870477974414825,.5257101058959961,0,2,7,2,8,10,-1,7,7,8,5,2,-.0014311339473351836,.552250325679779,.4561854898929596,0,2,6,14,7,3,-1,6,15,7,1,3,.0019378310535103083,.4546220898628235,.5736966729164124,0,3,9,2,10,12,-1,14,2,5,6,2,9,8,5,6,2,.00026343559147790074,.5345739126205444,.4571875035762787,0,2,6,7,8,2,-1,6,8,8,1,2,.0007825752254575491,.3967815935611725,.5220187902450562,0,2,8,13,4,6,-1,8,16,4,3,2,-.0195504408329725,.282964289188385,.5243508219718933,0,2,6,6,1,3,-1,6,7,1,1,3,.00043914958951063454,.4590066969394684,.589909017086029,0,2,16,2,4,6,-1,16,4,4,2,3,.0214520003646612,.523141086101532,.2855378985404968,0,3,6,6,4,2,-1,6,6,2,1,2,8,7,2,1,2,.0005897358059883118,.4397256970405579,.550642192363739,0,2,16,2,4,6,-1,16,4,4,2,3,-.0261576101183891,.3135079145431519,.5189175009727478,0,2,0,2,4,6,-1,0,4,4,2,3,-.0139598604291677,.3213272988796234,.5040717720985413,0,2,9,6,2,6,-1,9,6,1,6,2,-.006369901821017265,.6387544870376587,.4849506914615631,0,2,3,4,6,10,-1,3,9,6,5,2,-.008561382070183754,.2759132087230682,.5032019019126892,0,2,9,5,2,6,-1,9,5,1,6,2,.000966229010373354,.4685640931129456,.5834879279136658,0,2,3,13,2,3,-1,3,14,2,1,3,.0007655026856809855,.5175207257270813,.389642208814621,0,2,13,13,3,2,-1,13,14,3,1,2,-.008183334022760391,.2069136947393417,.5208122134208679,0,3,2,16,10,4,-1,2,16,5,2,2,7,18,5,2,2,-.009397693909704685,.6134091019630432,.4641222953796387,0,3,5,6,10,6,-1,10,6,5,3,2,5,9,5,3,2,.004802898038178682,.5454108119010925,.439521998167038,0,2,7,14,1,3,-1,7,15,1,1,3,-.003568056970834732,.6344485282897949,.4681093990802765,0,2,14,16,6,3,-1,14,17,6,1,3,.0040733120404183865,.5292683243751526,.4015620052814484,0,2,5,4,3,3,-1,5,5,3,1,3,.0012568129459396005,.4392988085746765,.5452824831008911,0,2,7,4,10,3,-1,7,5,10,1,3,-.0029065010603517294,.5898832082748413,.4863379895687103,0,2,0,4,5,4,-1,0,6,5,2,2,-.00244093406945467,.4069364964962006,.5247421860694885,0,2,13,11,3,9,-1,13,14,3,3,3,.0248307008296251,.5182725787162781,.3682524859905243,0,2,4,11,3,9,-1,4,14,3,3,3,-.0488540083169937,.1307577937841415,.496128112077713,0,2,9,7,2,1,-1,9,7,1,1,2,-.001611037994734943,.6421005725860596,.4872662127017975,0,2,5,0,6,17,-1,7,0,2,17,3,-.0970094799995422,.0477693490684032,.495098888874054,0,2,10,3,6,3,-1,10,3,3,3,2,.0011209240183234215,.4616267085075378,.5354745984077454,0,2,2,2,15,4,-1,7,2,5,4,3,-.001306409016251564,.626185417175293,.4638805985450745,0,3,8,2,8,2,-1,12,2,4,1,2,8,3,4,1,2,.00045771620352752507,.5384417772293091,.4646640121936798,0,2,8,1,3,6,-1,8,3,3,2,3,-.0006314995116554201,.3804047107696533,.51302570104599,0,2,9,17,2,2,-1,9,18,2,1,2,.0001450597046641633,.4554310142993927,.5664461851119995,0,2,0,0,2,14,-1,1,0,1,14,2,-.0164745505899191,.6596958041191101,.4715859889984131,0,2,12,0,7,3,-1,12,1,7,1,3,.0133695797994733,.519546627998352,.3035964965820313,0,2,1,14,1,2,-1,1,15,1,1,2,.00010271780047332868,.522917628288269,.4107066094875336,0,3,14,12,2,8,-1,15,12,1,4,2,14,16,1,4,2,-.0055311559699475765,.6352887749671936,.4960907101631165,0,2,1,0,7,3,-1,1,1,7,1,3,-.0026187049224972725,.3824546039104462,.5140984058380127,0,3,14,12,2,8,-1,15,12,1,4,2,14,16,1,4,2,.005083426833152771,.4950439929962158,.6220818758010864,0,3,6,0,8,12,-1,6,0,4,6,2,10,6,4,6,2,.0798181593418121,.4952335953712463,.1322475969791412,0,2,6,1,8,9,-1,6,4,8,3,3,-.0992265865206718,.7542728781700134,.5008416771888733,0,2,5,2,2,2,-1,5,3,2,1,2,-.0006517401780001819,.3699302971363068,.5130121111869812,0,3,13,14,6,6,-1,16,14,3,3,2,13,17,3,3,2,-.018996849656105,.6689178943634033,.4921202957630158,0,3,0,17,20,2,-1,0,17,10,1,2,10,18,10,1,2,.0173468999564648,.4983300864696503,.1859198063611984,0,3,10,3,2,6,-1,11,3,1,3,2,10,6,1,3,2,.0005508210160769522,.4574424028396606,.5522121787071228,0,2,5,12,6,2,-1,8,12,3,2,2,.002005605027079582,.5131744742393494,.3856469988822937,0,2,10,7,6,13,-1,10,7,3,13,2,-.007768819108605385,.4361700117588043,.5434309244155884,0,2,5,15,10,5,-1,10,15,5,5,2,.0508782789111137,.4682720899581909,.6840639710426331,0,2,10,4,4,10,-1,10,4,2,10,2,-.0022901780903339386,.4329245090484619,.5306099057197571,0,2,5,7,2,1,-1,6,7,1,1,2,-.00015715380141045898,.5370057225227356,.4378164112567902,0,2,10,3,6,7,-1,10,3,3,7,2,.1051924005150795,.5137274265289307,.0673614665865898,0,2,4,3,6,7,-1,7,3,3,7,2,.002719891956076026,.4112060964107513,.5255665183067322,0,2,1,7,18,5,-1,7,7,6,5,3,.0483377799391747,.5404623746871948,.4438967108726502,0,2,3,17,4,3,-1,5,17,2,3,2,.0009570376132614911,.4355969130992889,.5399510860443115,0,3,8,14,12,6,-1,14,14,6,3,2,8,17,6,3,2,-.0253712590783834,.5995175242424011,.5031024813652039,0,3,0,13,20,4,-1,0,13,10,2,2,10,15,10,2,2,.0524579510092735,.4950287938117981,.1398351043462753,0,3,4,5,14,2,-1,11,5,7,1,2,4,6,7,1,2,-.0123656298965216,.639729917049408,.496410608291626,0,3,1,2,10,12,-1,1,2,5,6,2,6,8,5,6,2,-.1458971947431564,.1001669988036156,.494632214307785,0,2,6,1,14,3,-1,6,2,14,1,3,-.0159086007624865,.3312329947948456,.5208340883255005,0,2,8,16,2,3,-1,8,17,2,1,3,.00039486068999394774,.4406363964080811,.5426102876663208,0,2,9,17,3,2,-1,10,17,1,2,3,-.0052454001270234585,.2799589931964874,.5189967155456543,0,3,5,15,4,2,-1,5,15,2,1,2,7,16,2,1,2,-.005042179953306913,.6987580060958862,.4752142131328583,0,2,10,15,1,3,-1,10,16,1,1,3,.0029812189750373363,.4983288943767548,.6307479739189148,0,3,8,16,4,4,-1,8,16,2,2,2,10,18,2,2,2,-.007288430817425251,.298233300447464,.5026869773864746,0,2,6,11,8,6,-1,6,14,8,3,2,.0015094350092113018,.5308442115783691,.3832970857620239,0,2,2,13,5,2,-1,2,14,5,1,2,-.009334079921245575,.2037964016199112,.4969817101955414,0,3,13,14,6,6,-1,16,14,3,3,2,13,17,3,3,2,.0286671407520771,.5025696754455566,.6928027272224426,0,2,1,9,18,4,-1,7,9,6,4,3,.1701968014240265,.4960052967071533,.1476442962884903,0,3,13,14,6,6,-1,16,14,3,3,2,13,17,3,3,2,-.003261447884142399,.5603063702583313,.4826056063175201,0,2,0,2,1,6,-1,0,4,1,2,3,.0005576927796937525,.5205562114715576,.4129633009433746,0,2,5,0,15,20,-1,5,10,15,10,2,.3625833988189697,.5221652984619141,.3768612146377564,0,3,1,14,6,6,-1,1,14,3,3,2,4,17,3,3,2,-.0116151301190257,.6022682785987854,.4637489914894104,0,3,8,14,4,6,-1,10,14,2,3,2,8,17,2,3,2,-.004079519771039486,.4070447087287903,.5337479114532471,0,2,7,11,2,1,-1,8,11,1,1,2,.0005720430053770542,.4601835012435913,.5900393128395081,0,2,9,17,3,2,-1,10,17,1,2,3,.000675433489959687,.5398252010345459,.4345428943634033,0,2,8,17,3,2,-1,9,17,1,2,3,.0006329569732770324,.5201563239097595,.4051358997821808,0,3,12,14,4,6,-1,14,14,2,3,2,12,17,2,3,2,.00124353205319494,.4642387926578522,.5547441244125366,0,3,4,14,4,6,-1,4,14,2,3,2,6,17,2,3,2,-.004736385773867369,.6198567152023315,.4672552049160004,0,3,13,14,2,6,-1,14,14,1,3,2,13,17,1,3,2,-.006465846206992865,.6837332844734192,.5019000768661499,0,3,5,14,2,6,-1,5,14,1,3,2,6,17,1,3,2,.000350173213519156,.4344803094863892,.5363622903823853,0,2,7,0,6,12,-1,7,4,6,4,3,.00015754920605104417,.4760079085826874,.5732020735740662,0,2,0,7,12,2,-1,4,7,4,2,3,.009977436624467373,.5090985894203186,.3635039925575256,0,2,10,3,3,13,-1,11,3,1,13,3,-.0004146452993154526,.5570064783096313,.4593802094459534,0,2,7,3,3,13,-1,8,3,1,13,3,-.00035888899583369493,.5356845855712891,.4339134991168976,0,2,10,8,6,3,-1,10,9,6,1,3,.0004046325047966093,.4439803063869476,.5436776876449585,0,2,3,11,3,2,-1,4,11,1,2,3,-.0008218478760682046,.4042294919490814,.5176299214363098,0,3,13,12,6,8,-1,16,12,3,4,2,13,16,3,4,2,.005946741905063391,.4927651882171631,.5633779764175415,0,2,7,6,6,5,-1,9,6,2,5,3,-.0217533893883228,.8006293773651123,.480084091424942,0,2,17,11,2,7,-1,17,11,1,7,2,-.0145403798669577,.3946054875850678,.5182222723960876,0,2,3,13,8,2,-1,7,13,4,2,2,-.0405107699334621,.0213249903172255,.4935792982578278,0,2,6,9,8,3,-1,6,10,8,1,3,-.0005845826817676425,.4012795984745026,.5314025282859802,0,2,4,3,4,3,-1,4,4,4,1,3,.005515180062502623,.4642418920993805,.5896260738372803,0,2,11,3,4,3,-1,11,4,4,1,3,-.006062622182071209,.6502159237861633,.5016477704048157,0,2,1,4,17,12,-1,1,8,17,4,3,.0945358425378799,.5264708995819092,.4126827120780945,0,2,11,3,4,3,-1,11,4,4,1,3,.004731505177915096,.4879199862480164,.5892447829246521,0,2,4,8,6,3,-1,4,9,6,1,3,-.0005257147131487727,.391728013753891,.5189412832260132,0,2,12,3,5,3,-1,12,4,5,1,3,-.002546404954046011,.5837599039077759,.498570591211319,0,2,1,11,2,7,-1,2,11,1,7,2,-.0260756891220808,.1261983960866928,.4955821931362152,0,3,15,12,2,8,-1,16,12,1,4,2,15,16,1,4,2,-.00547797093167901,.5722513794898987,.5010265707969666,0,2,4,8,11,3,-1,4,9,11,1,3,.005133774131536484,.527326226234436,.4226376116275787,0,3,9,13,6,2,-1,12,13,3,1,2,9,14,3,1,2,.000479449809063226,.4450066983699799,.5819587111473083,0,2,6,13,4,3,-1,6,14,4,1,3,-.0021114079281687737,.5757653117179871,.451171487569809,0,2,9,12,3,3,-1,10,12,1,3,3,-.0131799904629588,.1884381026029587,.5160734057426453,0,2,5,3,3,3,-1,5,4,3,1,3,-.004796809982508421,.6589789986610413,.4736118912696838,0,2,9,4,2,3,-1,9,5,2,1,3,.0067483168095350266,.5259429812431335,.3356395065784454,0,2,0,2,16,3,-1,0,3,16,1,3,.0014623369788751006,.5355271100997925,.4264092147350311,0,3,15,12,2,8,-1,16,12,1,4,2,15,16,1,4,2,.004764515906572342,.5034406781196594,.5786827802658081,0,3,3,12,2,8,-1,3,12,1,4,2,4,16,1,4,2,.0068066660314798355,.475660502910614,.6677829027175903,0,2,14,13,3,6,-1,14,15,3,2,3,.0036608621012419462,.5369611978530884,.4311546981334686,0,2,3,13,3,6,-1,3,15,3,2,3,.0214496403932571,.4968641996383667,.1888816058635712,0,3,6,5,10,2,-1,11,5,5,1,2,6,6,5,1,2,.004167890176177025,.4930733144283295,.5815368890762329,0,2,2,14,14,6,-1,2,17,14,3,2,.008646756410598755,.5205205082893372,.4132595062255859,0,2,10,14,1,3,-1,10,15,1,1,3,-.0003611407882999629,.5483555197715759,.4800927937030792,0,3,4,16,2,2,-1,4,16,1,1,2,5,17,1,1,2,.0010808729566633701,.4689902067184448,.6041421294212341,0,2,10,6,2,3,-1,10,7,2,1,3,.005771995987743139,.5171142220497131,.3053277134895325,0,3,0,17,20,2,-1,0,17,10,1,2,10,18,10,1,2,.001572077046148479,.5219978094100952,.4178803861141205,0,2,13,6,1,3,-1,13,7,1,1,3,-.0019307859474793077,.5860369801521301,.4812920093536377,0,2,8,13,3,2,-1,9,13,1,2,3,-.007892627269029617,.1749276965856552,.497173398733139,0,2,12,2,3,3,-1,13,2,1,3,3,-.002222467912361026,.434258908033371,.521284818649292,0,3,3,18,2,2,-1,3,18,1,1,2,4,19,1,1,2,.0019011989934369922,.4765186905860901,.689205527305603,0,2,9,16,3,4,-1,10,16,1,4,3,.0027576119173318148,.5262191295623779,.4337486028671265,0,2,6,6,1,3,-1,6,7,1,1,3,.005178744904696941,.4804069101810455,.7843729257583618,0,2,13,1,5,2,-1,13,2,5,1,2,-.0009027334162965417,.412084698677063,.5353423953056335,0,3,7,14,6,2,-1,7,14,3,1,2,10,15,3,1,2,.005179795902222395,.4740372896194458,.6425960063934326,0,2,11,3,3,4,-1,12,3,1,4,3,-.0101140001788735,.2468792051076889,.5175017714500427,0,2,1,13,12,6,-1,5,13,4,6,3,-.0186170600354671,.5756294131278992,.4628978967666626,0,2,14,11,5,2,-1,14,12,5,1,2,.0059225959703326225,.5169625878334045,.3214271068572998,0,3,2,15,14,4,-1,2,15,7,2,2,9,17,7,2,2,-.006294507998973131,.3872014880180359,.5141636729240417,0,3,3,7,14,2,-1,10,7,7,1,2,3,8,7,1,2,.0065353019163012505,.4853048920631409,.6310489773750305,0,2,1,11,4,2,-1,1,12,4,1,2,.0010878399480134249,.5117315053939819,.3723258972167969,0,2,14,0,6,14,-1,16,0,2,14,3,-.0225422400981188,.5692740082740784,.4887112975120544,0,2,4,11,1,3,-1,4,12,1,1,3,-.003006566083058715,.2556012868881226,.5003992915153503,0,2,14,0,6,14,-1,16,0,2,14,3,.007474127225577831,.4810872972011566,.5675926804542542,0,2,1,10,3,7,-1,2,10,1,7,3,.0261623207479715,.4971194863319397,.1777237057685852,0,2,8,12,9,2,-1,8,13,9,1,2,.0009435273823328316,.4940010905265808,.549125075340271,0,2,0,6,20,1,-1,10,6,10,1,2,.0333632417023182,.5007612109184265,.2790724039077759,0,2,8,4,4,4,-1,8,4,2,4,2,-.0151186501607299,.7059578895568848,.4973031878471375,0,2,0,0,2,2,-1,0,1,2,1,2,.0009864894673228264,.5128620266914368,.3776761889457703,105.76110076904297,213,0,2,5,3,10,9,-1,5,6,10,3,3,-.0951507985591888,.6470757126808167,.4017286896705627,0,2,15,2,4,10,-1,15,2,2,10,2,.006270234007388353,.399982213973999,.574644923210144,0,2,8,2,2,7,-1,9,2,1,7,2,.000300180894555524,.355877012014389,.5538809895515442,0,2,7,4,12,1,-1,11,4,4,1,3,.0011757409665733576,.425653487443924,.5382617712020874,0,2,3,4,9,1,-1,6,4,3,1,3,4423526843311265e-20,.3682908117771149,.5589926838874817,0,2,15,10,1,4,-1,15,12,1,2,2,-29936920327600092e-21,.5452470183372498,.4020367860794067,0,2,4,10,6,4,-1,7,10,3,4,2,.003007319988682866,.5239058136940002,.3317843973636627,0,2,15,9,1,6,-1,15,12,1,3,2,-.0105138896033168,.4320689141750336,.5307983756065369,0,2,7,17,6,3,-1,7,18,6,1,3,.008347682654857635,.4504637122154236,.6453298926353455,0,3,14,3,2,16,-1,15,3,1,8,2,14,11,1,8,2,-.0031492270063608885,.4313425123691559,.5370525121688843,0,2,4,9,1,6,-1,4,12,1,3,2,-1443564997316571e-20,.5326603055000305,.381797194480896,0,2,12,1,5,2,-1,12,2,5,1,2,-.00042855090578086674,.430516391992569,.5382009744644165,0,3,6,18,4,2,-1,6,18,2,1,2,8,19,2,1,2,.00015062429883982986,.4235970973968506,.5544965267181396,0,3,2,4,16,10,-1,10,4,8,5,2,2,9,8,5,2,.0715598315000534,.5303059816360474,.2678802907466888,0,2,6,5,1,10,-1,6,10,1,5,2,.0008409518050029874,.3557108938694,.5205433964729309,0,2,4,8,15,2,-1,9,8,5,2,3,.0629865005612373,.5225362777709961,.2861376106739044,0,2,1,8,15,2,-1,6,8,5,2,3,-.0033798629883676767,.3624185919761658,.5201697945594788,0,2,9,5,3,6,-1,9,7,3,2,3,-.00011810739670181647,.547447681427002,.3959893882274628,0,2,5,7,8,2,-1,9,7,4,2,2,-.0005450560129247606,.3740422129631043,.5215715765953064,0,2,9,11,2,3,-1,9,12,2,1,3,-.0018454910023137927,.5893052220344543,.4584448933601379,0,2,1,0,16,3,-1,1,1,16,1,3,-.0004383237101137638,.4084582030773163,.5385351181030273,0,2,11,2,7,2,-1,11,3,7,1,2,-.002400083001703024,.377745509147644,.5293580293655396,0,2,5,1,10,18,-1,5,7,10,6,3,-.0987957417964935,.2963612079620361,.5070089101791382,0,2,17,4,3,2,-1,18,4,1,2,3,.0031798239797353745,.4877632856369019,.6726443767547607,0,2,8,13,1,3,-1,8,14,1,1,3,.00032406419632025063,.4366911053657532,.5561109781265259,0,2,3,14,14,6,-1,3,16,14,2,3,-.0325472503900528,.31281578540802,.5308616161346436,0,2,0,2,3,4,-1,1,2,1,4,3,-.007756113074719906,.6560224890708923,.4639872014522553,0,2,12,1,5,2,-1,12,2,5,1,2,.0160272493958473,.5172680020332336,.3141897916793823,0,2,3,1,5,2,-1,3,2,5,1,2,710023505234858e-20,.4084446132183075,.5336294770240784,0,2,10,13,2,3,-1,10,14,2,1,3,.007342280820012093,.4966922104358673,.660346508026123,0,2,8,13,2,3,-1,8,14,2,1,3,-.0016970280557870865,.5908237099647522,.4500182867050171,0,2,14,12,2,3,-1,14,13,2,1,3,.0024118260480463505,.5315160751342773,.3599720895290375,0,2,7,2,2,3,-1,7,3,2,1,3,-.005530093796551228,.2334040999412537,.4996814131736755,0,3,5,6,10,4,-1,10,6,5,2,2,5,8,5,2,2,-.0026478730142116547,.5880935788154602,.4684734046459198,0,2,9,13,1,6,-1,9,16,1,3,2,.0112956296652555,.4983777105808258,.1884590983390808,0,3,10,12,2,2,-1,11,12,1,1,2,10,13,1,1,2,-.000669528788421303,.5872138142585754,.4799019992351532,0,2,4,12,2,3,-1,4,13,2,1,3,.0014410680159926414,.5131189227104187,.350101113319397,0,2,14,4,6,6,-1,14,6,6,2,3,.0024637870956212282,.5339372158050537,.4117639064788818,0,2,8,17,2,3,-1,8,18,2,1,3,.0003311451873742044,.4313383102416992,.5398246049880981,0,2,16,4,4,6,-1,16,6,4,2,3,-.0335572697222233,.26753368973732,.5179154872894287,0,2,0,4,4,6,-1,0,6,4,2,3,.0185394193977118,.4973869919776917,.2317177057266235,0,2,14,6,2,3,-1,14,6,1,3,2,-.00029698139405809343,.552970826625824,.4643664062023163,0,2,4,9,8,1,-1,8,9,4,1,2,-.0004557725915219635,.5629584193229675,.4469191133975983,0,2,8,12,4,3,-1,8,13,4,1,3,-.0101589802652597,.6706212759017944,.4925918877124786,0,2,5,12,10,6,-1,5,14,10,2,3,-22413829356082715e-21,.5239421725273132,.3912901878356934,0,2,11,12,1,2,-1,11,13,1,1,2,7203496352303773e-20,.4799438118934631,.5501788854598999,0,2,8,15,4,2,-1,8,16,4,1,2,-.006926720961928368,.6930009722709656,.4698084890842438,0,3,6,9,8,8,-1,10,9,4,4,2,6,13,4,4,2,-.007699783891439438,.409962385892868,.5480883121490479,0,3,7,12,4,6,-1,7,12,2,3,2,9,15,2,3,2,-.007313054986298084,.3283475935459137,.5057886242866516,0,2,10,11,3,1,-1,11,11,1,1,3,.0019650589674711227,.4978047013282776,.6398249864578247,0,3,9,7,2,10,-1,9,7,1,5,2,10,12,1,5,2,.007164760027080774,.4661160111427307,.6222137212753296,0,2,8,0,6,6,-1,10,0,2,6,3,-.0240786392241716,.2334644943475723,.5222162008285522,0,2,3,11,2,6,-1,3,13,2,2,3,-.0210279691964388,.1183653995394707,.4938226044178009,0,2,16,12,1,2,-1,16,13,1,1,2,.00036017020465806127,.5325019955635071,.4116711020469666,0,3,1,14,6,6,-1,1,14,3,3,2,4,17,3,3,2,-.0172197297215462,.6278762221336365,.4664269089698792,0,2,13,1,3,6,-1,14,1,1,6,3,-.007867214269936085,.3403415083885193,.5249736905097961,0,2,8,8,2,2,-1,8,9,2,1,2,-.000447773898486048,.3610411882400513,.5086259245872498,0,2,9,9,3,3,-1,10,9,1,3,3,.005548601038753986,.4884265959262848,.6203498244285583,0,2,8,7,3,3,-1,8,8,3,1,3,-.00694611482322216,.262593001127243,.5011097192764282,0,2,14,0,2,3,-1,14,0,1,3,2,.00013569870498031378,.4340794980525971,.5628312230110168,0,2,1,0,18,9,-1,7,0,6,9,3,-.0458802506327629,.6507998704910278,.4696274995803833,0,2,11,5,4,15,-1,11,5,2,15,2,-.0215825606137514,.3826502859592438,.5287616848945618,0,2,5,5,4,15,-1,7,5,2,15,2,-.0202095396816731,.3233368098735809,.5074477195739746,0,2,14,0,2,3,-1,14,0,1,3,2,.005849671084433794,.5177603960037231,.4489670991897583,0,2,4,0,2,3,-1,5,0,1,3,2,-5747637987951748e-20,.4020850956439972,.5246363878250122,0,3,11,12,2,2,-1,12,12,1,1,2,11,13,1,1,2,-.001151310047134757,.6315072178840637,.490515410900116,0,3,7,12,2,2,-1,7,12,1,1,2,8,13,1,1,2,.0019862831104546785,.4702459871768951,.6497151255607605,0,2,12,0,3,4,-1,13,0,1,4,3,-.005271951202303171,.3650383949279785,.5227652788162231,0,2,4,11,3,3,-1,4,12,3,1,3,.0012662699446082115,.5166100859642029,.387761801481247,0,2,12,7,4,2,-1,12,8,4,1,2,-.006291944067925215,.737589418888092,.5023847818374634,0,2,8,10,3,2,-1,9,10,1,2,3,.000673601112794131,.4423226118087769,.5495585799217224,0,2,9,9,3,2,-1,10,9,1,2,3,-.0010523450328037143,.5976396203041077,.4859583079814911,0,2,8,9,3,2,-1,9,9,1,2,3,-.00044216238893568516,.5955939292907715,.4398930966854096,0,2,12,0,3,4,-1,13,0,1,4,3,.0011747940443456173,.5349888205528259,.4605058133602142,0,2,5,0,3,4,-1,6,0,1,4,3,.005245743785053492,.5049191117286682,.2941577136516571,0,3,4,14,12,4,-1,10,14,6,2,2,4,16,6,2,2,-.0245397202670574,.2550177872180939,.5218586921691895,0,2,8,13,2,3,-1,8,14,2,1,3,.0007379304151982069,.4424861073493958,.5490816235542297,0,2,10,10,3,8,-1,10,14,3,4,2,.0014233799884095788,.5319514274597168,.4081355929374695,0,3,8,10,4,8,-1,8,10,2,4,2,10,14,2,4,2,-.0024149110540747643,.4087659120559692,.5238950252532959,0,2,10,8,3,1,-1,11,8,1,1,3,-.0012165299849584699,.567457914352417,.4908052980899811,0,2,9,12,1,6,-1,9,15,1,3,2,-.0012438809499144554,.4129425883293152,.5256118178367615,0,2,10,8,3,1,-1,11,8,1,1,3,.006194273941218853,.5060194134712219,.7313653230667114,0,2,7,8,3,1,-1,8,8,1,1,3,-.0016607169527560472,.5979632139205933,.4596369862556458,0,2,5,2,15,14,-1,5,9,15,7,2,-.0273162592202425,.4174365103244782,.5308842062950134,0,3,2,1,2,10,-1,2,1,1,5,2,3,6,1,5,2,-.00158455700147897,.56158047914505,.4519486129283905,0,2,14,14,2,3,-1,14,15,2,1,3,-.0015514739789068699,.4076187014579773,.5360785126686096,0,2,2,7,3,3,-1,3,7,1,3,3,.0003844655875582248,.4347293972969055,.5430442094802856,0,2,17,4,3,3,-1,17,5,3,1,3,-.0146722598001361,.1659304946660996,.5146093964576721,0,2,0,4,3,3,-1,0,5,3,1,3,.008160888217389584,.4961819052696228,.1884745955467224,0,3,13,5,6,2,-1,16,5,3,1,2,13,6,3,1,2,.0011121659772470593,.4868263900279999,.6093816161155701,0,2,4,19,12,1,-1,8,19,4,1,3,-.007260377053171396,.6284325122833252,.4690375924110413,0,2,12,12,2,4,-1,12,14,2,2,2,-.00024046430189628154,.5575000047683716,.4046044051647186,0,2,3,15,1,3,-1,3,16,1,1,3,-.00023348190006799996,.4115762114524841,.5252848267555237,0,2,11,16,6,4,-1,11,16,3,4,2,.005573648028075695,.4730072915554047,.5690100789070129,0,2,2,10,3,10,-1,3,10,1,10,3,.0306237693876028,.4971886873245239,.1740095019340515,0,2,12,8,2,4,-1,12,8,1,4,2,.0009207479888573289,.5372117757797241,.4354872107505798,0,2,6,8,2,4,-1,7,8,1,4,2,-4355073906481266e-20,.5366883873939514,.4347316920757294,0,2,10,14,2,3,-1,10,14,1,3,2,-.006645271088927984,.3435518145561218,.516053318977356,0,2,5,1,10,3,-1,10,1,5,3,2,.0432219989597797,.4766792058944702,.7293652892112732,0,2,10,7,3,2,-1,11,7,1,2,3,.0022331769578158855,.5029315948486328,.5633171200752258,0,2,5,6,9,2,-1,8,6,3,2,3,.0031829739455133677,.4016092121601105,.5192136764526367,0,2,9,8,2,2,-1,9,9,2,1,2,-.00018027749320026487,.4088315963745117,.5417919754981995,0,3,2,11,16,6,-1,2,11,8,3,2,10,14,8,3,2,-.0052934689447283745,.407567709684372,.5243561863899231,0,3,12,7,2,2,-1,13,7,1,1,2,12,8,1,1,2,.0012750959722325206,.4913282990455627,.6387010812759399,0,2,9,5,2,3,-1,9,6,2,1,3,.004338532220572233,.5031672120094299,.2947346866130829,0,2,9,7,3,2,-1,10,7,1,2,3,.00852507445961237,.4949789047241211,.6308869123458862,0,2,5,1,8,12,-1,5,7,8,6,2,-.0009426635224372149,.5328366756439209,.4285649955272675,0,2,13,5,2,2,-1,13,6,2,1,2,.0013609660090878606,.4991525113582611,.5941501259803772,0,2,5,5,2,2,-1,5,6,2,1,2,.0004478250921238214,.4573504030704498,.5854480862617493,0,2,12,4,3,3,-1,12,5,3,1,3,.001336005050688982,.4604358971118927,.584905207157135,0,2,4,14,2,3,-1,4,15,2,1,3,-.0006096754805184901,.3969388902187347,.522942304611206,0,2,12,4,3,3,-1,12,5,3,1,3,-.002365678083151579,.5808320045471191,.4898357093334198,0,2,5,4,3,3,-1,5,5,3,1,3,.001073434017598629,.435121089220047,.5470039248466492,0,3,9,14,2,6,-1,10,14,1,3,2,9,17,1,3,2,.0021923359017819166,.535506010055542,.3842903971672058,0,2,8,14,3,2,-1,9,14,1,2,3,.005496861878782511,.5018138885498047,.2827191948890686,0,2,9,5,6,6,-1,11,5,2,6,3,-.0753688216209412,.1225076019763947,.5148826837539673,0,2,5,5,6,6,-1,7,5,2,6,3,.0251344703137875,.4731766879558563,.702544629573822,0,2,13,13,1,2,-1,13,14,1,1,2,-2935859993158374e-20,.5430532097816467,.465608686208725,0,2,0,2,10,2,-1,0,3,10,1,2,-.0005835591000504792,.4031040072441101,.5190119743347168,0,2,13,13,1,2,-1,13,14,1,1,2,-.0026639450807124376,.4308126866817474,.5161771178245544,0,3,5,7,2,2,-1,5,7,1,1,2,6,8,1,1,2,-.0013804089976474643,.621982991695404,.4695515930652618,0,2,13,5,2,7,-1,13,5,1,7,2,.0012313219485804439,.5379363894462585,.4425831139087677,0,2,6,13,1,2,-1,6,14,1,1,2,-14644179827882908e-21,.5281640291213989,.4222503006458283,0,2,11,0,3,7,-1,12,0,1,7,3,-.0128188095986843,.2582092881202698,.5179932713508606,0,3,0,3,2,16,-1,0,3,1,8,2,1,11,1,8,2,.0228521898388863,.4778693020343781,.7609264254570007,0,2,11,0,3,7,-1,12,0,1,7,3,.0008230597013607621,.5340992212295532,.4671724140644074,0,2,6,0,3,7,-1,7,0,1,7,3,.0127701200544834,.4965761005878449,.1472366005182266,0,2,11,16,8,4,-1,11,16,4,4,2,-.0500515103340149,.641499400138855,.5016592144966125,0,2,1,16,8,4,-1,5,16,4,4,2,.0157752707600594,.4522320032119751,.5685362219810486,0,2,13,5,2,7,-1,13,5,1,7,2,-.0185016207396984,.2764748930931091,.5137959122657776,0,2,5,5,2,7,-1,6,5,1,7,2,.0024626250378787518,.5141941905021667,.3795408010482788,0,2,18,6,2,14,-1,18,13,2,7,2,.0629161670804024,.5060648918151855,.658043384552002,0,2,6,10,3,4,-1,6,12,3,2,2,-21648500478477217e-21,.5195388197898865,.401988685131073,0,2,14,7,1,2,-1,14,8,1,1,2,.0021180990152060986,.4962365031242371,.5954458713531494,0,3,0,1,18,6,-1,0,1,9,3,2,9,4,9,3,2,-.0166348908096552,.3757933080196381,.517544686794281,0,2,14,7,1,2,-1,14,8,1,1,2,-.002889947034418583,.6624013781547546,.5057178735733032,0,2,0,6,2,14,-1,0,13,2,7,2,.076783262193203,.4795796871185303,.8047714829444885,0,2,17,0,3,12,-1,18,0,1,12,3,.003917067777365446,.4937882125377655,.5719941854476929,0,2,0,6,18,3,-1,0,7,18,1,3,-.0726706013083458,.0538945607841015,.4943903982639313,0,2,6,0,14,16,-1,6,8,14,8,2,.5403950214385986,.5129774212837219,.1143338978290558,0,2,0,0,3,12,-1,1,0,1,12,3,.0029510019812732935,.4528343975543976,.5698574185371399,0,2,13,0,3,7,-1,14,0,1,7,3,.0034508369863033295,.5357726812362671,.4218730926513672,0,2,5,7,1,2,-1,5,8,1,1,2,-.0004207793972454965,.5916172862052917,.4637925922870636,0,2,14,4,6,6,-1,14,6,6,2,3,.0033051050268113613,.5273385047912598,.438204288482666,0,2,5,7,7,2,-1,5,8,7,1,2,.0004773506079800427,.4046528041362763,.5181884765625,0,2,8,6,6,9,-1,8,9,6,3,3,-.0259285103529692,.7452235817909241,.5089386105537415,0,2,5,4,6,1,-1,7,4,2,1,3,-.002972979098558426,.3295435905456543,.5058795213699341,0,3,13,0,6,4,-1,16,0,3,2,2,13,2,3,2,2,.005850832909345627,.4857144057750702,.5793024897575378,0,2,1,2,18,12,-1,1,6,18,4,3,-.0459675192832947,.4312731027603149,.5380653142929077,0,2,3,2,17,12,-1,3,6,17,4,3,.1558596044778824,.5196170210838318,.1684713959693909,0,2,5,14,7,3,-1,5,15,7,1,3,.0151648297905922,.4735757112503052,.6735026836395264,0,2,10,14,1,3,-1,10,15,1,1,3,-.0010604249546304345,.5822926759719849,.4775702953338623,0,2,3,14,3,3,-1,3,15,3,1,3,.006647629197686911,.4999198913574219,.231953501701355,0,2,14,4,6,6,-1,14,6,6,2,3,-.0122311301529408,.4750893115997315,.5262982249259949,0,2,0,4,6,6,-1,0,6,6,2,3,.005652888212352991,.5069767832756042,.3561818897724152,0,2,12,5,4,3,-1,12,6,4,1,3,.0012977829901501536,.4875693917274475,.5619062781333923,0,2,4,5,4,3,-1,4,6,4,1,3,.0107815898954868,.4750770032405853,.6782308220863342,0,2,18,0,2,6,-1,18,2,2,2,3,.002865477930754423,.5305461883544922,.4290736019611359,0,2,8,1,4,9,-1,10,1,2,9,2,.0028663428965955973,.4518479108810425,.5539351105690002,0,2,6,6,8,2,-1,6,6,4,2,2,-.005198332015424967,.4149119853973389,.5434188842773438,0,3,6,5,4,2,-1,6,5,2,1,2,8,6,2,1,2,.005373999010771513,.471789687871933,.6507657170295715,0,2,10,5,2,3,-1,10,6,2,1,3,-.0146415298804641,.2172164022922516,.5161777138710022,0,2,9,5,1,3,-1,9,6,1,1,3,-15042580344015732e-21,.533738374710083,.4298836886882782,0,2,9,10,2,2,-1,9,11,2,1,2,-.0001187566012958996,.4604594111442566,.5582447052001953,0,2,0,8,4,3,-1,0,9,4,1,3,.0169955305755138,.4945895075798035,.0738800764083862,0,2,6,0,8,6,-1,6,3,8,3,2,-.0350959412753582,.70055091381073,.4977591037750244,0,3,1,0,6,4,-1,1,0,3,2,2,4,2,3,2,2,.0024217350874096155,.4466265141963959,.5477694272994995,0,2,13,0,3,7,-1,14,0,1,7,3,-.0009634033776819706,.4714098870754242,.5313338041305542,0,2,9,16,2,2,-1,9,17,2,1,2,.00016391130338888615,.4331546127796173,.5342242121696472,0,2,11,4,6,10,-1,11,9,6,5,2,-.0211414601653814,.2644700109958649,.5204498767852783,0,2,0,10,19,2,-1,0,11,19,1,2,.0008777520270086825,.5208349823951721,.4152742922306061,0,2,9,5,8,9,-1,9,8,8,3,3,-.0279439203441143,.6344125270843506,.5018811821937561,0,2,4,0,3,7,-1,5,0,1,7,3,.006729737855494022,.5050438046455383,.3500863909721375,0,3,8,6,4,12,-1,10,6,2,6,2,8,12,2,6,2,.0232810396701097,.4966318011283875,.6968677043914795,0,2,0,2,6,4,-1,0,4,6,2,2,-.0116449799388647,.3300260007381439,.5049629807472229,0,2,8,15,4,3,-1,8,16,4,1,3,.0157643090933561,.4991598129272461,.7321153879165649,0,2,8,0,3,7,-1,9,0,1,7,3,-.001361147966235876,.3911735117435455,.5160670876502991,0,2,9,5,3,4,-1,10,5,1,4,3,-.0008152233785949647,.5628911256790161,.49497190117836,0,2,8,5,3,4,-1,9,5,1,4,3,-.0006006627227179706,.585359513759613,.4550595879554749,0,2,7,6,6,1,-1,9,6,2,1,3,.0004971551825292408,.4271470010280609,.5443599224090576,0,3,7,14,4,4,-1,7,14,2,2,2,9,16,2,2,2,.0023475370835512877,.5143110752105713,.3887656927108765,0,3,13,14,4,6,-1,15,14,2,3,2,13,17,2,3,2,-.008926156908273697,.6044502258300781,.497172087430954,0,2,7,8,1,8,-1,7,12,1,4,2,-.013919910416007,.2583160996437073,.5000367760658264,0,3,16,0,2,8,-1,17,0,1,4,2,16,4,1,4,2,.0010209949687123299,.4857374131679535,.5560358166694641,0,3,2,0,2,8,-1,2,0,1,4,2,3,4,1,4,2,-.0027441629208624363,.5936884880065918,.464577704668045,0,2,6,1,14,3,-1,6,2,14,1,3,-.0162001308053732,.3163014948368073,.5193495154380798,0,2,7,9,3,10,-1,7,14,3,5,2,.004333198070526123,.5061224102973938,.3458878993988037,0,2,9,14,2,2,-1,9,15,2,1,2,.0005849793087691069,.4779017865657806,.5870177745819092,0,2,7,7,6,8,-1,7,11,6,4,2,-.0022466450463980436,.4297851026058197,.5374773144721985,0,2,9,7,3,6,-1,9,10,3,3,2,.0023146099410951138,.5438671708106995,.4640969932079315,0,2,7,13,3,3,-1,7,14,3,1,3,.008767912164330482,.472689300775528,.6771789789199829,0,2,9,9,2,2,-1,9,10,2,1,2,-.00022448020172305405,.4229173064231873,.5428048968315125,0,2,0,1,18,2,-1,6,1,6,2,3,-.007433602120727301,.6098880767822266,.4683673977851868,0,2,7,1,6,14,-1,7,8,6,7,2,-.0023189240600913763,.5689436793327332,.4424242079257965,0,2,1,9,18,1,-1,7,9,6,1,3,-.0021042178850620985,.3762221038341522,.5187087059020996,0,2,9,7,2,2,-1,9,7,1,2,2,.000460348412161693,.4699405133724213,.5771207213401794,0,2,9,3,2,9,-1,10,3,1,9,2,.0010547629790380597,.4465216994285584,.5601701736450195,0,2,18,14,2,3,-1,18,15,2,1,3,.0008714881842024624,.544980525970459,.3914709091186523,0,2,7,11,3,1,-1,8,11,1,1,3,.00033364820410497487,.4564009010791779,.5645738840103149,0,2,10,8,3,4,-1,11,8,1,4,3,-.0014853250468149781,.5747377872467041,.4692778885364533,0,2,7,14,3,6,-1,8,14,1,6,3,.0030251620337367058,.5166196823120117,.3762814104557037,0,2,10,8,3,4,-1,11,8,1,4,3,.005028074141591787,.5002111792564392,.6151527166366577,0,2,7,8,3,4,-1,8,8,1,4,3,-.0005816451157443225,.5394598245620728,.4390751123428345,0,2,7,9,6,9,-1,7,12,6,3,3,.0451415292918682,.5188326835632324,.206303596496582,0,2,0,14,2,3,-1,0,15,2,1,3,-.001079562003724277,.3904685080051422,.5137907266616821,0,2,11,12,1,2,-1,11,13,1,1,2,.00015995999274309725,.4895322918891907,.5427504181861877,0,2,4,3,8,3,-1,8,3,4,3,2,-.0193592701107264,.6975228786468506,.4773507118225098,0,2,0,4,20,6,-1,0,4,10,6,2,.207255095243454,.5233635902404785,.3034991919994354,0,2,9,14,1,3,-1,9,15,1,1,3,-.00041953290929086506,.5419396758079529,.4460186064243317,0,2,8,14,4,3,-1,8,15,4,1,3,.0022582069505006075,.4815764129161835,.6027408838272095,0,2,0,15,14,4,-1,0,17,14,2,2,-.0067811207845807076,.3980278968811035,.5183305740356445,0,2,1,14,18,6,-1,1,17,18,3,2,.0111543098464608,.543123185634613,.4188759922981262,0,3,0,0,10,6,-1,0,0,5,3,2,5,3,5,3,2,.0431624315679073,.4738228023052216,.6522961258888245]);

; browserify_shim__define__module__export__(typeof face != "undefined" ? face : window.face);

}).call(global, undefined, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
(function (global){
;__browserify_shim_require__=require;(function browserifyShim(module, exports, require, define, browserify_shim__define__module__export__) {
/**
 * tracking.js - A modern approach for Computer Vision on the web.
 * @author Eduardo Lundgren <edu@rdo.io>
 * @version v1.0.0
 * @link http://trackingjs.com
 * @license BSD
 */
tracking.ViolaJones.classifiers.mouth=new Float64Array([25,15,-1.4372119903564453,13,0,2,0,0,14,9,-1,0,3,14,3,3,-.1192855015397072,.7854182124137878,-.4541360139846802,0,2,17,1,8,14,-1,17,8,8,7,2,-.0641647726297379,-.7407680749893188,.265203595161438,0,2,7,3,11,6,-1,7,5,11,2,3,.0910761803388596,-.2063370943069458,.8400946259498596,0,2,5,2,15,6,-1,5,4,15,2,3,-.1129330024123192,.8284121751785278,-.1866362988948822,0,2,6,4,11,6,-1,6,6,11,2,3,-.0741933435201645,.8354660272598267,-.1527701020240784,0,2,17,1,6,3,-1,19,1,2,3,3,21404659491963685e-21,-.0716945603489876,.1858334988355637,0,2,5,0,15,6,-1,5,2,15,2,3,-.0996975302696228,.6870458126068115,-.1721730977296829,0,2,7,3,13,6,-1,7,5,13,2,3,-.0900413617491722,.7310237884521484,-.1368771940469742,0,2,5,3,6,5,-1,8,3,3,5,2,.0002513831132091582,-.3469826877117157,.3647777140140533,0,2,21,14,4,1,-1,21,14,2,1,2,16144449546118267e-21,-.3085466027259827,.2320024073123932,0,2,0,3,3,12,-1,0,7,3,4,3,1936390981427394e-20,-.381985604763031,.2404107004404068,0,2,22,10,3,4,-1,22,11,3,2,2,.006967364810407162,.0545878112316132,-.748706579208374,0,2,0,10,3,4,-1,0,11,3,2,2,-.004718930926173925,-.7476686835289001,.1205869019031525,-1.541659951210022,13,0,2,5,0,15,8,-1,5,2,15,4,2,-.1006335020065308,.7848083972930908,-.3866829872131348,0,2,20,0,5,9,-1,20,3,5,3,3,-.0366767607629299,.545323371887207,-.401267796754837,0,2,6,2,13,4,-1,6,4,13,2,2,.0815562233328819,-.1315398067235947,.808495819568634,0,2,7,2,15,6,-1,7,4,15,2,3,-.10641860216856,.6782389879226685,-.2083356976509094,0,2,2,3,4,12,-1,2,9,4,6,2,.0156307406723499,-.3749788105487824,.3150509893894196,0,2,6,1,14,6,-1,6,3,14,2,3,.0711290463805199,-.15573850274086,.7050542831420898,0,2,8,3,9,6,-1,8,5,9,2,3,.0736639127135277,-.1547683030366898,.6715884804725647,0,2,21,0,4,6,-1,21,3,4,3,2,-.00010592950275167823,.1365388035774231,-.2670182883739471,0,2,1,12,1,3,-1,1,13,1,1,3,-.001923952018842101,-.7261438965797424,.136457696557045,0,2,23,12,1,3,-1,23,13,1,1,3,.002305730013176799,.0706136971712112,-.6423184275627136,0,2,1,12,1,3,-1,1,13,1,1,3,.0018073299434036016,.1355642974376679,-.7050786018371582,0,2,7,7,11,8,-1,7,9,11,4,2,-.0664333626627922,.6158788204193115,-.1400263011455536,0,2,8,4,9,6,-1,8,6,9,2,3,-.0689277201890945,.6765924096107483,-.1224988028407097,-1.532431960105896,29,0,2,1,0,15,9,-1,1,3,15,3,3,-.182265505194664,.5961514711380005,-.3195483088493347,0,2,9,0,11,15,-1,9,5,11,5,3,.2893281877040863,-.0240151602774858,.3762707114219666,0,2,0,8,3,4,-1,0,9,3,2,2,-.00424566213041544,-.7117397785186768,.1214720010757446,0,2,7,9,12,6,-1,7,12,12,3,2,.0545681491494179,-.1822118014097214,.4597271978855133,0,2,0,5,2,6,-1,0,7,2,2,3,-.0044434829615056515,-.5354676842689514,.1655835956335068,0,2,14,0,2,11,-1,14,0,1,11,2,-.0204923897981644,-.8770608901977539,-.0151639897376299,0,2,0,9,2,6,-1,0,11,2,2,3,-.004800747148692608,-.5431423187255859,.1356130987405777,0,3,1,0,24,12,-1,13,0,12,6,2,1,6,12,6,2,.1226660013198853,.112447202205658,-.657440185546875,0,2,0,0,3,4,-1,0,2,3,2,2,-5525497908820398e-20,.1536739021539688,-.3841981887817383,0,2,7,3,14,6,-1,7,5,14,2,3,-.1131860986351967,.4927195906639099,-.1094276010990143,0,2,5,3,15,4,-1,5,5,15,2,2,.0792956873774529,-.164746105670929,.4720517992973328,0,2,8,13,12,1,-1,12,13,4,1,3,.0148729300126433,.0740143731236458,-.5926275849342346,0,2,2,3,12,6,-1,8,3,6,6,2,.0538397915661335,-.2111544013023377,.3537890911102295,1,2,21,2,4,9,-1,21,2,2,9,2,-.0759592726826668,.5931801795959473,-.1090068966150284,0,2,6,2,13,6,-1,6,4,13,2,3,.1158166006207466,-.0984905213117599,.5940334796905518,0,2,5,3,15,2,-1,5,4,15,1,2,-.0160826407372952,.3794195055961609,-.165405198931694,0,2,0,11,5,3,-1,0,12,5,1,3,.0067254770547151566,.0937571078538895,-.7060937881469727,0,2,14,0,11,14,-1,14,7,11,7,2,-.0611884109675884,-.4381029903888702,.0796229690313339,1,2,2,10,4,1,-1,3,11,2,1,2,-.005515203811228275,-.7019357085227966,.0781789273023605,0,3,1,0,24,12,-1,13,0,12,6,2,1,6,12,6,2,-.1988534033298492,-.6726130843162537,.0560497716069222,0,3,0,4,6,6,-1,0,4,3,3,2,3,7,3,3,2,.0194473192095757,-.1165110021829605,.4151527881622315,1,2,23,9,1,4,-1,22,10,1,2,2,-.004670621827244759,-.6090158820152283,.1049979999661446,1,2,2,9,4,1,-1,3,10,2,1,2,.0040827528573572636,.0689968466758728,-.5490871071815491,0,3,16,4,8,10,-1,20,4,4,5,2,16,9,4,5,2,-.0201979596167803,.2884930074214935,-.1804888993501663,0,2,8,7,9,6,-1,8,9,9,2,3,.0504430681467056,-.0897706300020218,.4609920978546143,0,2,11,12,4,3,-1,12,12,2,3,2,-.005013956222683191,-.4820869863033295,.0588099807500839,0,2,0,0,3,3,-1,0,1,3,1,3,.008574193343520164,.0568646714091301,-.5979083180427551,0,2,11,9,14,2,-1,11,9,7,2,2,-.0121624497696757,.1446305960416794,-.1168325990438461,0,2,9,13,4,1,-1,10,13,2,1,2,-.0019329390488564968,-.5450860857963562,.060978390276432,-1.4849940538406372,34,0,2,0,0,8,6,-1,0,3,8,3,2,-.0320550985634327,.4280030131340027,-.4258942902088165,0,2,5,1,15,6,-1,5,3,15,2,3,-.1231034025549889,.5121241807937622,-.2055584937334061,0,2,0,7,4,3,-1,0,8,4,1,3,-.005858825985342264,-.7101820707321167,.1075906008481979,0,2,3,3,20,6,-1,8,3,10,6,2,.0977141335606575,-.1477957963943481,.45711749792099,0,2,0,6,24,5,-1,6,6,12,5,2,-.0527394600212574,.3743767142295837,-.2183827012777329,0,2,8,5,9,6,-1,8,7,9,2,3,.0584189109504223,-.1386294066905975,.4993282854557037,0,2,5,2,14,4,-1,5,4,14,2,2,.0887569189071655,-.1315895020961762,.6216561794281006,0,2,22,8,3,6,-1,22,10,3,2,3,.0145876696333289,.0915696695446968,-.5815675258636475,0,3,3,9,18,2,-1,3,9,9,1,2,12,10,9,1,2,.1044600009918213,.005274035967886448,-56644.51953125,0,2,22,8,3,6,-1,22,10,3,2,3,-.008432278409600258,-.4866046011447907,.0979617610573769,0,3,0,0,24,6,-1,0,0,12,3,2,12,3,12,3,2,.040655929595232,.1391579061746597,-.3656015992164612,0,2,14,11,4,4,-1,15,11,2,4,2,.006336689926683903,.064174547791481,-.6245471239089966,0,2,5,5,15,2,-1,5,6,15,1,2,.0158455893397331,-.1791914999485016,.2889905869960785,0,2,5,4,15,6,-1,5,6,15,2,3,-.0746863335371017,.5424023270606995,-.1314727962017059,0,2,0,7,2,3,-1,0,8,2,1,3,.004769525025039911,.0965340435504913,-.6561154723167419,0,2,6,6,13,6,-1,6,8,13,2,3,-.0535226687788963,.4636800885200501,-.135343000292778,0,2,0,11,6,3,-1,0,12,6,1,3,-.006364875007420778,-.6624563932418823,.0684857368469238,0,2,11,0,14,14,-1,11,7,14,7,2,-.2447337061166763,-.8181337118148804,.0450799688696861,0,2,7,13,4,1,-1,8,13,2,1,2,-.0024634969886392355,-.7681804895401001,.0495845898985863,0,2,6,9,13,6,-1,6,11,13,2,3,-.0358034893870354,.3749603927135468,-.1447928994894028,0,2,0,9,4,4,-1,0,10,4,2,2,-.005672052968293428,-.6127536296844482,.0935847163200378,0,2,21,0,4,6,-1,21,3,4,3,2,-.0132687101140618,.286378413438797,-.255188912153244,0,2,0,12,6,3,-1,0,13,6,1,3,-.006251893937587738,-.5896773934364319,.067711167037487,0,2,16,11,4,3,-1,17,11,2,3,2,.007309257052838802,.0272198095917702,-.5714861154556274,0,3,0,7,10,8,-1,0,7,5,4,2,5,11,5,4,2,.0258194394409657,-.132600799202919,.305025190114975,1,2,22,2,3,8,-1,22,2,3,4,2,-.0211078803986311,.1200629025697708,-.1475265026092529,0,2,1,3,16,4,-1,9,3,8,4,2,.0408483408391476,-.1736883074045181,.253044605255127,0,3,1,13,24,2,-1,13,13,12,1,2,1,14,12,1,2,-.0179475992918015,-.7117617130279541,.0583698004484177,0,2,5,5,4,10,-1,6,5,2,10,2,-.0138895902782679,-.6778132915496826,.04356300085783,1,2,13,7,2,6,-1,11,9,2,2,3,-.009848898276686668,.1479212939739227,-.0897465273737907,0,2,8,9,8,6,-1,8,12,8,3,2,-.0659847036004066,.5683801770210266,-.0681742578744888,0,2,24,7,1,4,-1,24,8,1,2,2,-.0018370660254731774,-.4986937940120697,.0779643580317497,0,2,5,7,15,6,-1,5,9,15,2,3,-.0277651809155941,.2679949104785919,-.1382624953985214,0,2,21,8,4,3,-1,21,9,4,1,3,.00998893566429615,.0445619411766529,-.7317379117012024,-1.5437099933624268,42,0,2,5,2,15,4,-1,5,3,15,2,2,-.0456383489072323,.6275423169136047,-.2494937032461166,0,2,6,4,15,3,-1,6,5,15,1,3,-.031067680567503,.6427816152572632,-.1671900004148483,0,3,0,3,2,12,-1,0,3,1,6,2,1,9,1,6,2,.00301934196613729,-.2399346977472305,.3676818013191223,0,2,7,3,11,4,-1,7,4,11,2,2,.0315676406025887,-.1147691980004311,.5750172734260559,0,2,0,0,6,6,-1,0,3,6,3,2,-.006414634175598621,.2154625058174133,-.3768770098686218,0,2,24,3,1,12,-1,24,7,1,4,3,-.005701086018234491,-.4533824026584625,.0946888476610184,0,3,0,0,24,12,-1,0,0,12,6,2,12,6,12,6,2,.1890300065279007,.0801155269145966,-.7184885144233704,0,3,1,1,24,14,-1,13,1,12,7,2,1,8,12,7,2,.1293978989124298,.1093719005584717,-.5197048783302307,1,2,5,3,8,4,-1,5,3,8,2,2,-.0657683908939362,.5003104209899902,-.1238735020160675,1,2,24,9,1,4,-1,23,10,1,2,2,-.0040884059853851795,-.5118011236190796,.0594223700463772,0,2,7,7,11,8,-1,7,9,11,4,2,-.0306642707437277,.2964648902416229,-.1741248071193695,1,2,24,9,1,4,-1,23,10,1,2,2,.0027700960636138916,.0846907272934914,-.4009515047073364,0,2,0,6,1,9,-1,0,9,1,3,3,-.0062402039766311646,-.5560923218727112,.0800850465893745,0,2,8,2,9,3,-1,8,3,9,1,3,.010515259578824,-.1309404969215393,.3612711131572723,0,2,9,4,7,4,-1,9,5,7,2,2,.0181792695075274,-.124518096446991,.3556562960147858,0,2,22,0,3,2,-1,22,1,3,1,2,.005303769838064909,.0638220235705376,-.6178466081619263,0,2,0,0,13,14,-1,0,7,13,7,2,-.1947806030511856,-.7228901982307434,.0475768186151981,0,2,21,9,4,4,-1,21,10,4,2,2,.007223042193800211,.0453382283449173,-.5460836291313171,0,2,0,9,4,4,-1,0,10,4,2,2,.005037583876401186,.080446831882,-.4817472100257874,1,2,22,9,1,4,-1,21,10,1,2,2,-.00719348294660449,-.5018991827964783,.0128700295463204,1,2,3,9,4,1,-1,4,10,2,1,2,-.004494159948080778,-.5862709879875183,.0634675025939941,0,3,15,3,10,12,-1,20,3,5,6,2,15,9,5,6,2,.0874131396412849,-.0676202401518822,.4797031879425049,0,3,0,8,14,6,-1,0,8,7,3,2,7,11,7,3,2,-.0377015694975853,.3913342952728272,-.0978809297084808,1,2,23,10,1,4,-1,22,11,1,2,2,.0030070370994508266,.0484924912452698,-.2472224980592728,0,3,0,3,10,12,-1,0,3,5,6,2,5,9,5,6,2,.0974098667502403,-.0669010728597641,.5813519954681396,1,2,23,0,2,1,-1,23,0,1,1,2,-.004016656894236803,-.5456554293632507,.0363924615085125,0,2,8,3,9,3,-1,8,4,9,1,3,.0104924896731973,-.1087466031312943,.3253425061702728,0,2,7,5,11,4,-1,7,6,11,2,2,.024965999647975,-.1137896031141281,.3056510984897614,0,2,2,7,20,8,-1,12,7,10,8,2,.1301030069589615,-.1220476999878883,.303536593914032,0,2,12,5,9,8,-1,15,5,3,8,3,-.0843720883131027,-.6943122148513794,.0178856607526541,1,2,2,0,1,2,-1,2,0,1,1,2,-.002926785033196211,-.5401834845542908,.0564073212444782,1,2,21,3,4,4,-1,22,4,2,4,2,-.0206745099276304,.4180921018123627,-.0685340464115143,0,2,4,5,9,8,-1,7,5,3,8,3,-.05145063996315,-.6289098262786865,.0529876984655857,1,2,22,10,3,2,-1,22,10,3,1,2,-.008926119655370712,-.4644356071949005,.023655079305172,0,2,0,5,24,5,-1,6,5,12,5,2,-.0830484703183174,.3304196894168854,-.093869760632515,0,2,9,7,7,3,-1,9,8,7,1,3,.0113369999453425,-.0979600325226784,.3484053015708923,0,2,2,0,20,9,-1,7,0,10,9,2,.0827779024839401,-.1159391030669212,.2680957913398743,0,2,11,2,8,9,-1,13,2,4,9,2,-.0478848814964294,-.6079211235046387,.0222362894564867,1,2,1,8,4,1,-1,2,9,2,1,2,-.003858269890770316,-.4688901007175446,.0554540418088436,0,3,19,5,6,10,-1,22,5,3,5,2,19,10,3,5,2,-.0334531292319298,.4192667901515961,-.0631088465452194,0,3,0,5,6,10,-1,0,5,3,5,2,3,10,3,5,2,.0126036396250129,-.1227632984519005,.2175220996141434,0,2,10,10,9,2,-1,13,10,3,2,3,.0262600891292095,.0162896700203419,-.5688759088516235,-1.5637760162353516,64,0,2,5,2,15,2,-1,5,3,15,1,2,-.019779309630394,.447209507226944,-.2573797106742859,0,2,21,4,4,3,-1,21,4,2,3,2,-.009199723601341248,.4397894144058228,-.1382309943437576,0,2,1,5,15,4,-1,1,6,15,2,2,.0222425796091557,-.1761150062084198,.3406811952590942,0,3,21,5,4,10,-1,23,5,2,5,2,21,10,2,5,2,.005365055054426193,-.1087490990757942,.1631094068288803,0,2,0,0,21,8,-1,7,0,7,8,3,.7425013780593872,.00046233131433837116,-1417.2740478515625,0,2,5,0,15,6,-1,5,2,15,2,3,-.1289999037981033,.4220936894416809,-.1264209002256393,0,2,2,2,21,3,-1,9,2,7,3,3,.4214023947715759,.003029906889423728,1207.18701171875,0,2,6,3,15,6,-1,6,5,15,2,3,-.1431712061166763,.5070012211799622,-.1091170981526375,0,3,0,5,4,10,-1,0,5,2,5,2,2,10,2,5,2,.004436612129211426,-.2218814045190811,.2446105927228928,1,2,22,10,1,4,-1,21,11,1,2,2,.003017731010913849,.1072233989834786,-.3470205068588257,0,2,0,7,3,4,-1,0,8,3,2,2,-.004822094924747944,-.6534119248390198,.0803434476256371,0,2,1,3,24,3,-1,7,3,12,3,2,.0362788289785385,-.220707505941391,.2242490947246552,0,2,0,0,24,13,-1,6,0,12,13,2,-.1675994992256165,.4059072136878967,-.1054169982671738,0,2,5,3,15,4,-1,5,4,15,2,2,-.0509919412434101,.3452283143997192,-.1206474006175995,0,2,5,4,14,3,-1,5,5,14,1,3,.0161635298281908,-.1465175002813339,.3696750998497009,1,2,23,8,2,4,-1,22,9,2,2,2,.00832686759531498,.0642398297786713,-.5490669012069702,1,2,2,8,4,2,-1,3,9,2,2,2,-.007261487189680338,-.6105815768241882,.0538330897688866,0,2,9,8,9,6,-1,9,10,9,2,3,-.0427855290472507,.3435507118701935,-.1058441996574402,0,2,0,0,11,14,-1,0,7,11,7,2,-.0558885596692562,-.4213463068008423,.0855342373251915,0,3,1,0,24,12,-1,13,0,12,6,2,1,6,12,6,2,.1077039018273354,.0796676799654961,-.5105268955230713,0,2,0,0,3,4,-1,0,2,3,2,2,-48622798203723505e-21,.1164970993995667,-.3022361099720001,0,2,7,2,15,4,-1,7,3,15,2,2,.0272718109190464,-.0831976532936096,.3410704135894775,1,2,2,10,4,1,-1,3,11,2,1,2,.002794212894514203,.0836139172315598,-.4521746933460236,0,2,21,11,4,4,-1,21,12,4,2,2,-.005964955780655146,-.5814967751502991,.0588471181690693,0,3,1,7,12,8,-1,1,7,6,4,2,7,11,6,4,2,-.0364551208913326,.2987614870071411,-.116396501660347,0,2,7,8,11,6,-1,7,11,11,3,2,.0560359284281731,-.1189749017357826,.349049985408783,0,2,0,13,2,2,-1,0,14,2,1,2,.0019068910041823983,.0623399801552296,-.5222734212875366,0,2,10,3,8,6,-1,12,3,4,6,2,-.0314803011715412,-.5988280177116394,.0221100505441427,0,2,7,3,8,6,-1,9,3,4,6,2,-.0291779898107052,-.7628328204154968,.037851981818676,0,2,22,6,3,3,-1,22,7,3,1,3,.009344181977212429,.0293787997215986,-.5464184880256653,0,2,0,5,5,6,-1,0,7,5,2,3,.0012941689928993583,-.2152619063854218,.1293071061372757,0,2,8,7,9,6,-1,8,9,9,2,3,.0399527512490749,-.0815632417798042,.3440327942371368,0,2,2,0,20,13,-1,12,0,10,13,2,.2579689919948578,-.0829713121056557,.2971759140491486,0,3,19,3,6,4,-1,22,3,3,2,2,19,5,3,2,2,.008397597819566727,-.1235759034752846,.3130742907524109,0,2,3,8,12,3,-1,9,8,6,3,2,-.0210481006652117,.2553890943527222,-.1077592000365257,1,2,22,3,2,5,-1,22,3,1,5,2,.0184192396700382,-.0348858311772347,.4613004922866821,0,2,6,7,8,8,-1,8,7,4,8,2,-.0335993207991123,-.6385626196861267,.0432357601821423,1,2,20,0,3,1,-1,21,1,1,1,3,-.005936917848885059,-.3381235003471375,.0261388104408979,1,2,5,0,1,3,-1,4,1,1,1,3,.007424450945109129,.041649479418993,-.601313591003418,1,2,22,11,1,3,-1,21,12,1,1,3,-.003834150033071637,-.3147934973239899,.0227260906249285,0,2,1,4,4,3,-1,3,4,2,3,2,.00592639297246933,-.0845179632306099,.2986125946044922,0,3,19,4,6,8,-1,22,4,3,4,2,19,8,3,4,2,-.0194444190710783,.2213757932186127,-.0513583682477474,0,3,0,4,8,8,-1,0,4,4,4,2,4,8,4,4,2,.0187752693891525,-.1223364025354385,.2647691071033478,1,2,22,11,1,3,-1,21,12,1,1,3,.006485750898718834,.0205634497106075,-.5246906280517578,0,3,0,1,24,14,-1,0,1,12,7,2,12,8,12,7,2,-.2598725855350494,-.6570193767547607,.0345496907830238,0,2,23,8,2,4,-1,23,9,2,2,2,-.005815083160996437,-.6595460772514343,.0302442405372858,0,2,5,3,15,4,-1,5,4,15,2,2,-.0261219404637814,.187040701508522,-.1252924054861069,0,2,8,1,9,3,-1,8,2,9,1,3,-.0057821800000965595,.2328509986400604,-.1182496026158333,0,2,0,8,2,4,-1,0,9,2,2,2,-.002959564095363021,-.4579938054084778,.0564655400812626,0,2,18,10,7,2,-1,18,11,7,1,2,-.0120882000774145,-.5189349055290222,.0244996603578329,0,2,6,11,12,4,-1,6,12,12,2,2,-.008810916915535927,.2570025026798248,-.0927671566605568,0,2,14,0,6,15,-1,16,0,2,15,3,-.0459428504109383,-.447971910238266,.0299462303519249,0,2,0,10,7,2,-1,0,11,7,1,2,-.0100041404366493,-.6149634122848511,.0364212691783905,0,3,15,5,6,6,-1,18,5,3,3,2,15,8,3,3,2,-.0116753997281194,.117287702858448,-.0613474808633327,0,2,5,0,6,15,-1,7,0,2,15,3,-.0524668507277966,-.7613652944564819,.0306894704699516,0,2,8,7,9,4,-1,8,8,9,2,2,.0182263404130936,-.0854801833629608,.2695373892784119,0,2,7,6,10,6,-1,7,8,10,2,3,-.0452684201300144,.3264470100402832,-.0773756429553032,1,2,19,11,1,3,-1,18,12,1,1,3,-.008142688311636448,-.4582937955856323,.009397351182997227,1,2,6,11,3,1,-1,7,12,1,1,3,-.005334928166121244,-.5775498151779175,.0352523885667324,0,2,16,10,4,1,-1,16,10,2,1,2,-.0010754769900813699,.1434753984212875,-.1015762984752655,0,2,0,0,1,2,-1,0,1,1,1,2,-.0035198600962758064,-.6082041263580322,.0328880697488785,0,2,8,1,9,3,-1,8,2,9,1,3,.0112483501434326,-.0905500426888466,.2323783040046692,0,2,0,6,5,3,-1,0,7,5,1,3,-.0119920196011662,-.5705332159996033,.0367036312818527,1,2,21,8,1,4,-1,20,9,1,2,2,-.012105530127883,-.708626925945282,.004459870047867298,-1.5267670154571533,57,0,2,5,1,15,6,-1,5,3,15,2,3,-.1112890988588333,.5214446783065796,-.2762526869773865,0,3,23,0,2,2,-1,24,0,1,1,2,23,1,1,1,2,-.003131008008494973,-.6073393225669861,.0243980996310711,0,2,3,3,15,6,-1,3,5,15,2,3,-.09750135242939,.5489286780357361,-.1652427017688751,0,2,19,0,6,9,-1,19,3,6,3,3,-.0652247071266174,.3402006924152374,-.2693930864334106,0,2,5,2,15,6,-1,5,4,15,2,3,.1191802993416786,-.1123576015233994,.63959801197052,0,2,17,3,8,3,-1,17,4,8,1,3,-.0140629801899195,.3342761993408203,-.1284538954496384,1,2,4,3,8,4,-1,4,3,8,2,2,-.056402500718832,.3790628910064697,-.1554156988859177,0,2,16,4,6,2,-1,16,5,6,1,2,.00717424089089036,-.1133088991045952,.1825089007616043,0,3,0,0,24,12,-1,0,0,12,6,2,12,6,12,6,2,.1259752959012985,.0945485532283783,-.485344409942627,1,2,22,10,3,2,-1,22,10,3,1,2,.0059177991934120655,.0701321363449097,-.5377039909362793,1,2,6,3,6,6,-1,4,5,6,2,3,-.0439277403056622,.395074188709259,-.1080185994505882,1,2,14,4,9,1,-1,17,7,3,1,3,-.009831470437347889,.0959606170654297,-.0468075983226299,1,2,3,10,2,3,-1,3,10,1,3,2,.005635340232402086,.0943416282534599,-.5247716903686523,1,2,20,8,5,2,-1,20,8,5,1,2,-.0115382801741362,-.5154880285263062,.0138055300340056,0,3,0,9,16,6,-1,0,9,8,3,2,8,12,8,3,2,.0286462493240833,-.1382701992988586,.275043785572052,0,2,6,2,13,3,-1,6,3,13,1,3,.0138679798692465,-.1203586980700493,.3521435856819153,0,2,0,1,3,4,-1,0,3,3,2,2,-.0004046937101520598,.1522637009620667,-.2590084075927734,0,2,8,0,9,12,-1,8,6,9,6,2,-.1594581007957459,-.6391854882240295,.0514649897813797,1,2,4,0,1,2,-1,4,0,1,1,2,-.0027928699273616076,-.5840150713920593,.0542793795466423,0,2,5,3,15,3,-1,5,4,15,1,3,.0183532107621431,-.1051151007413864,.3529815971851349,1,2,3,10,2,3,-1,3,10,1,3,2,-.00518105598166585,-.4741767942905426,.0798512324690819,0,3,19,4,6,4,-1,22,4,3,2,2,19,6,3,2,2,.009232129901647568,-.0759327188134193,.1852813959121704,0,3,0,3,8,4,-1,0,3,4,2,2,4,5,4,2,2,.0121171101927757,-.1117528975009918,.285363495349884,0,2,19,10,5,3,-1,19,11,5,1,3,-.007261281833052635,-.5885108709335327,.0526883192360401,0,2,1,10,5,3,-1,1,11,5,1,3,.005613490007817745,.0474684908986092,-.5394589900970459,0,2,12,1,13,14,-1,12,8,13,7,2,-.1945167928934097,-.5634222030639648,.0302108898758888,0,2,0,1,13,14,-1,0,8,13,7,2,.355094313621521,.0630894526839256,-.4980587959289551,0,3,11,3,6,12,-1,14,3,3,6,2,11,9,3,6,2,.0331119708716869,.034632470458746,-.5246484875679016,0,3,9,5,6,10,-1,9,5,3,5,2,12,10,3,5,2,.0342818088829517,.0431439802050591,-.6470713019371033,0,2,20,8,5,4,-1,20,9,5,2,2,-.007825661450624466,-.4688000977039337,.0402393713593483,0,2,0,8,5,4,-1,0,9,5,2,2,.0111560495570302,.0401505008339882,-.609553873538971,0,2,8,9,9,3,-1,8,10,9,1,3,.0113630602136254,-.0827489867806435,.3811689019203186,0,2,7,10,6,4,-1,9,10,2,4,3,.020405100658536,.0425756387412548,-.7467774152755737,0,2,6,6,14,4,-1,6,7,14,2,2,.019111629575491,-.123919703066349,.2226520031690598,0,2,9,6,5,4,-1,9,7,5,2,2,-.0073364898562431335,.3034206926822662,-.0926956906914711,0,2,22,5,3,6,-1,22,7,3,2,3,-.008653892204165459,-.3351745009422302,.0585405789315701,0,2,0,5,3,6,-1,0,7,3,2,3,.0347895994782448,.0337578095495701,-.7483453154563904,0,2,17,1,5,4,-1,17,2,5,2,2,-.0174188297241926,.2445363998413086,-.0698786973953247,0,2,3,1,6,4,-1,3,2,6,2,2,.003511907998472452,-.1277886927127838,.2403315007686615,0,2,21,14,4,1,-1,21,14,2,1,2,.0005066979792900383,-.1169779002666473,.1439380049705505,1,2,4,8,3,2,-1,5,9,1,2,3,-.005951274186372757,-.5078160762786865,.0478522293269634,0,2,14,2,4,7,-1,14,2,2,7,2,.0503778010606766,.002928252099081874,-.7751696109771729,0,2,7,2,4,7,-1,9,2,2,7,2,.003886251011863351,-.1550420969724655,.1570920050144196,0,2,9,3,8,5,-1,11,3,4,5,2,.0385116301476955,.0230970401316881,-.6291617155075073,0,2,5,10,15,1,-1,10,10,5,1,3,-.0055746049620211124,.1807070970535278,-.1298052966594696,0,2,2,6,21,9,-1,9,6,7,9,3,.1266476064920425,-.0865593999624252,.2957325875759125,0,2,0,4,6,6,-1,0,6,6,2,3,.005412611179053783,-.152832493185997,.1662916988134384,0,2,1,12,24,3,-1,7,12,12,3,2,-.0361530818045139,.2797313034534454,-.1039886027574539,0,2,6,7,6,2,-1,6,8,6,1,2,.007167399860918522,-.0945642217993736,.2778528034687042,1,2,13,8,2,4,-1,13,8,2,2,2,-.006779035087674856,.1679068058729172,-.0839543119072914,0,2,8,6,8,5,-1,10,6,4,5,2,-.029867609962821,-.7236117124557495,.0346310697495937,0,2,11,5,6,4,-1,11,6,6,2,2,.006526551209390163,-.1173760965466499,.1346033960580826,0,2,0,14,4,1,-1,2,14,2,1,2,340809601766523e-19,-.1753176003694534,.1322204023599625,0,2,16,2,4,13,-1,17,2,2,13,2,-.0176294595003128,-.5160853862762451,.0253861900418997,0,2,0,7,1,4,-1,0,8,1,2,2,-.0015446309698745608,-.4142186045646668,.0513300895690918,0,2,24,0,1,2,-1,24,1,1,1,2,.0011520429980009794,.0366159491240978,-.3692800998687744,0,2,0,5,2,4,-1,1,5,1,4,2,-.002961277961730957,.2446188032627106,-.0842714235186577,-1.4507639408111572,64,0,2,0,1,8,4,-1,0,3,8,2,2,-.0141031695529819,.2699790894985199,-.3928318023681641,0,3,15,11,10,4,-1,20,11,5,2,2,15,13,5,2,2,.005471440032124519,-.2269169986248016,.2749052047729492,0,2,7,5,11,3,-1,7,6,11,1,3,.0166354794055223,-.1547908037900925,.322420209646225,0,2,21,4,4,3,-1,21,4,2,3,2,-.008447717875242233,.3320780992507935,-.1249654963612557,0,2,0,5,4,1,-1,2,5,2,1,2,-.0024904569145292044,.2900204956531525,-.1460298001766205,0,2,7,3,12,4,-1,7,4,12,2,2,.0282104406505823,-.0831937119364738,.4805397987365723,0,2,8,6,7,3,-1,8,7,7,1,3,.009317990392446518,-.1692426949739456,.3482030928134918,0,2,16,0,9,14,-1,16,7,9,7,2,-.0579102896153927,-.5040398836135864,.0840934887528419,0,3,0,0,24,6,-1,0,0,12,3,2,12,3,12,3,2,.0882126465439796,.073309987783432,-.4883395135402679,0,2,23,13,2,1,-1,23,13,1,1,2,60974380176048726e-21,-.1594507992267609,.147327795624733,0,3,0,13,24,2,-1,0,13,12,1,2,12,14,12,1,2,-.0142063600942492,-.6365684866905212,.0507153607904911,0,2,19,12,5,3,-1,19,13,5,1,3,-.007718190085142851,-.6330028772354126,.0328688994050026,0,2,9,7,7,4,-1,9,8,7,2,2,.0120071703568101,-.1254525035619736,.2893699109554291,1,2,14,0,4,7,-1,14,0,2,7,2,.0707826167345047,.0305656604468822,-.5666698217391968,1,2,11,0,7,4,-1,11,0,7,2,2,-.050412330776453,-.5089793801307678,.0710048824548721,0,2,9,4,14,2,-1,9,5,14,1,2,.0220727995038033,-.1444841027259827,.2781184911727905,0,2,3,2,15,4,-1,3,3,15,2,2,.0147649403661489,-.1283989995718002,.3290185928344727,0,2,19,12,5,3,-1,19,13,5,1,3,.0068206568248569965,.0654795467853546,-.5463265776634216,0,3,0,11,8,4,-1,0,11,4,2,2,4,13,4,2,2,.0020179790444672108,-.2028342932462692,.167965903878212,0,2,7,9,11,6,-1,7,11,11,2,3,.0250812191516161,-.1104943975806236,.3191860020160675,0,2,0,11,7,4,-1,0,12,7,2,2,.008939135819673538,.0734132081270218,-.553839921951294,0,2,20,0,5,2,-1,20,1,5,1,2,-.00046396959805861115,.1123031005263329,-.169712707400322,1,2,5,10,3,2,-1,6,11,1,2,3,-.008560219779610634,-.7347347736358643,.0417169481515884,0,3,17,4,8,10,-1,21,4,4,5,2,17,9,4,5,2,-.0389347188174725,.2292626947164536,-.0792299434542656,0,2,5,3,15,2,-1,5,4,15,1,2,-.0215415991842747,.3007172048091888,-.1152340024709702,0,2,16,4,5,2,-1,16,5,5,1,2,.0049337721429765224,-.1002838015556335,.1348572969436646,0,3,1,0,22,10,-1,1,0,11,5,2,12,5,11,5,2,.1615066975355148,.0588171891868114,-.5656744837760925,0,2,20,0,5,2,-1,20,1,5,1,2,-.0123260198161006,-.2823328077793121,.0187596306204796,0,2,0,0,5,2,-1,0,1,5,1,2,.0052987951785326,.0524063482880592,-.5719032287597656,0,3,10,1,6,12,-1,13,1,3,6,2,10,7,3,6,2,.0289043206721544,.047710869461298,-.4854584038257599,0,2,0,0,1,8,-1,0,4,1,4,2,.0155697297304869,.0493178516626358,-.5100051760673523,0,2,6,0,13,6,-1,6,2,13,2,3,-.093812070786953,.2564809024333954,-.1057069003582001,1,2,4,3,4,4,-1,3,4,4,2,2,-.0286933295428753,.5247043967247009,-.05095025151968,0,2,20,8,5,3,-1,20,9,5,1,3,.0072301640175282955,.0583653002977371,-.4894312024116516,0,3,7,13,2,2,-1,7,13,1,1,2,8,14,1,1,2,8266483928309754e-20,-.143721804022789,.1820268929004669,0,3,16,13,2,2,-1,17,13,1,1,2,16,14,1,1,2,.001524175051599741,.0201267991214991,-.3884589970111847,0,3,7,13,2,2,-1,7,13,1,1,2,8,14,1,1,2,-6551230762852356e-20,.2280354052782059,-.1581206023693085,0,2,19,5,6,1,-1,21,5,2,1,3,.0024175599683076143,-.0890450775623322,.2839250862598419,0,2,0,8,6,6,-1,0,10,6,2,3,.0343084894120693,.0391304790973663,-.626339316368103,0,2,6,8,13,4,-1,6,9,13,2,2,.0127667998895049,-.0984294191002846,.2857427895069122,0,2,3,10,8,1,-1,7,10,4,1,2,-.0027450299821794033,.2090786993503571,-.1267945021390915,0,2,16,11,4,4,-1,17,11,2,4,2,-.007062985096126795,-.4784719944000244,.0229746792465448,0,2,5,6,15,2,-1,5,7,15,1,2,.0109674101695418,-.1310741007328033,.1712857037782669,0,2,3,1,20,10,-1,3,1,10,10,2,-.1530689001083374,.2361073046922684,-.096540167927742,0,2,2,4,3,3,-1,2,5,3,1,3,.002167609054595232,-.1028804033994675,.2537584006786346,0,2,16,11,4,4,-1,17,11,2,4,2,.0107051497325301,.0160892698913813,-.5868526101112366,0,2,5,11,4,4,-1,6,11,2,4,2,-.006114291958510876,-.6146798133850098,.034404631704092,0,3,17,4,8,10,-1,21,4,4,5,2,17,9,4,5,2,-.0160057693719864,.0954133197665215,-.0657811686396599,0,2,0,8,5,3,-1,0,9,5,1,3,.008554169908165932,.042579360306263,-.5490341186523438,0,2,23,13,2,1,-1,23,13,1,1,2,-5574294118559919e-20,.1505846977233887,-.0978325977921486,0,2,0,13,2,1,-1,1,13,1,1,2,4988848013454117e-20,-.1522217988967896,.1464709937572479,0,2,10,1,7,3,-1,10,2,7,1,3,.00939861312508583,-.0793018564581871,.2222844958305359,0,3,0,3,8,12,-1,0,3,4,6,2,4,9,4,6,2,-.0445945896208286,.3217073082923889,-.0712599530816078,0,2,6,0,16,11,-1,6,0,8,11,2,.2763071060180664,-.0312894396483898,.4636780917644501,0,2,2,0,21,3,-1,9,0,7,3,3,-.0459242798388004,.2685551047325134,-.0946981832385063,1,2,23,1,2,12,-1,23,1,2,6,2,.0328284502029419,.0420088581740856,-.1909179985523224,1,2,2,0,1,2,-1,2,0,1,1,2,.005841621197760105,.0443820804357529,-.5017232894897461,0,2,15,0,6,3,-1,17,0,2,3,3,.0253127701580524,.007676819805055857,-.4524691104888916,0,2,8,9,6,4,-1,10,9,2,4,3,-.0206803791224957,-.708233118057251,.02775271050632,0,2,20,5,5,6,-1,20,7,5,2,3,.0019456259906291962,-.1725641041994095,.0885240733623505,0,3,0,4,24,8,-1,0,4,12,4,2,12,8,12,4,2,.1318278014659882,.0378756709396839,-.5236573815345764,1,2,22,10,1,4,-1,21,11,1,2,2,-.004844982177019119,-.3831801116466522,.0295521095395088,0,2,7,0,11,3,-1,7,1,11,1,3,.005329558160156012,-.1172816008329392,.1712217032909393,0,2,6,0,13,4,-1,6,1,13,2,2,-.035328458994627,.3731549978256226,-.0650273412466049,-1.3936280012130737,77,0,2,7,11,11,4,-1,7,13,11,2,2,.0136478496715426,-.2802368998527527,.3575335144996643,0,3,21,3,4,12,-1,23,3,2,6,2,21,9,2,6,2,.0123078199103475,-.1484645009040833,.2714886069297791,0,2,2,4,21,6,-1,9,6,7,2,9,.4659403860569,-.0705008506774902,.5868018865585327,0,3,23,3,2,10,-1,24,3,1,5,2,23,8,1,5,2,.001569333951920271,-.1150237023830414,.1375536024570465,0,3,0,3,2,10,-1,0,3,1,5,2,1,8,1,5,2,.002517673885449767,-.1778890937566757,.2172407060861588,1,2,24,10,1,4,-1,23,11,1,2,2,.004529970232397318,.0458603501319885,-.5376703143119812,1,2,1,10,4,1,-1,2,11,2,1,2,.004029551055282354,.0599071383476257,-.5803095102310181,0,2,8,10,9,4,-1,8,11,9,2,2,.009028165601193905,-.088961161673069,.3474006950855255,0,2,5,8,13,6,-1,5,11,13,3,2,-.0710994601249695,.4003205001354218,-.0876752585172653,0,2,5,0,15,4,-1,5,2,15,2,2,-.0905078798532486,.3202385008335114,-.1107280030846596,0,2,1,0,22,15,-1,12,0,11,15,2,.3949914872646332,-.0544822700321674,.4376561045646668,0,2,10,14,8,1,-1,12,14,4,1,2,.0060021281242370605,.0412968583405018,-.6277515888214111,0,2,1,3,8,4,-1,1,4,8,2,2,-.0126753300428391,.1864306032657623,-.158659502863884,0,2,15,13,1,2,-1,15,14,1,1,2,.0005252318806014955,-.0737809464335442,.1131825000047684,0,2,5,2,15,6,-1,5,4,15,2,3,.151985302567482,-.0698502063751221,.5526459217071533,1,2,23,12,2,1,-1,23,12,1,1,2,-.005917444825172424,-.4224376976490021,.0234292708337307,1,2,2,12,1,2,-1,2,12,1,1,2,.0005108569748699665,-.1782114058732987,.1747542023658752,0,2,8,13,9,2,-1,11,13,3,2,3,-.0286266505718231,-.7806789875030518,.0430335216224194,0,2,8,0,8,2,-1,8,1,8,1,2,.0032388539984822273,-.1174874976277351,.2301342934370041,0,2,20,12,4,3,-1,20,13,4,1,3,-.0068310899659991264,-.5170273780822754,.0224770605564117,0,3,3,0,18,10,-1,3,0,9,5,2,12,5,9,5,2,-.1381812989711762,-.6718307137489319,.0339458398520947,0,2,10,12,6,3,-1,12,12,2,3,3,.0129029303789139,.0190411508083344,-.4739249050617218,0,2,0,0,1,8,-1,0,2,1,4,2,.0063398052006959915,.0412811301648617,-.5821130871772766,0,2,22,5,3,4,-1,22,6,3,2,2,8406751294387504e-20,-.2301639020442963,.124085396528244,0,2,0,5,4,4,-1,0,6,4,2,2,.0172388590872288,.0539665818214417,-.5818564891815186,0,3,6,0,14,10,-1,13,0,7,5,2,6,5,7,5,2,-.0786773264408112,-.4061115086078644,.056923508644104,0,2,1,12,4,3,-1,1,13,4,1,3,.005585959181189537,.0368424393236637,-.5646867752075195,0,3,20,7,2,2,-1,21,7,1,1,2,20,8,1,1,2,-.0006132239941507578,.1785047054290772,-.0668883100152016,0,3,3,7,2,2,-1,3,7,1,1,2,4,8,1,1,2,.0007940084906294942,-.0783978328108788,.3054557144641876,0,2,22,6,3,4,-1,22,7,3,2,2,.012827199883759,.0404374599456787,-.6479570865631104,0,2,9,6,7,3,-1,9,7,7,1,3,.0119779799133539,-.0993791595101357,.2267276048660278,0,2,11,6,4,2,-1,11,7,4,1,2,-.00493787694722414,.270632803440094,-.0839221030473709,0,2,0,6,5,4,-1,0,7,5,2,2,.0203377306461334,.040057111531496,-.6170961260795593,0,2,5,3,15,6,-1,5,5,15,2,3,-.1582631021738052,.371801108121872,-.0776448771357536,0,2,4,4,5,2,-1,4,5,5,1,2,.004515057895332575,-.1424572020769119,.1946897059679031,0,2,11,12,6,3,-1,13,12,2,3,3,-.0179421696811914,-.7258480787277222,.0292347799986601,1,2,3,0,1,3,-1,2,1,1,1,3,.005215315148234367,.0460041500627995,-.4536756873130798,0,2,7,11,12,2,-1,11,11,4,2,3,-.007786383852362633,.1746426969766617,-.1098980978131294,0,2,0,8,4,4,-1,0,9,4,2,2,.009413344785571098,.0346476286649704,-.5983666181564331,0,2,8,7,9,3,-1,8,8,9,1,3,.00762187410145998,-.1057026013731957,.2037336975336075,0,2,8,8,9,6,-1,8,10,9,2,3,.0216018799692392,-.0909303426742554,.2887038886547089,0,2,20,11,5,4,-1,20,12,5,2,2,-.0118230897933245,-.6303614974021912,.0240826196968555,0,2,7,5,8,3,-1,9,5,4,3,2,-.020232979208231,-.7420278787612915,.0235212203115225,0,3,16,0,2,2,-1,17,0,1,1,2,16,1,1,1,2,.0006451014778576791,-.0552557893097401,.1650166064500809,0,2,0,11,5,4,-1,0,12,5,2,2,-.008187602274119854,-.5770931839942932,.0352346412837505,0,3,16,0,2,2,-1,17,0,1,1,2,16,1,1,1,2,-.00045044958824291825,.1859780997037888,-.08243677765131,0,2,5,9,6,6,-1,7,9,2,6,3,-.0273097790777683,-.7204548716545105,.0276838503777981,0,3,14,10,10,4,-1,19,10,5,2,2,14,12,5,2,2,.007305101957172155,-.0758159905672073,.1228180006146431,0,2,6,6,3,1,-1,7,6,1,1,3,.0007211818010546267,-.0847066268324852,.2212305068969727,0,2,16,6,3,2,-1,17,6,1,2,3,-.0005579470889642835,.092200443148613,-.0512673109769821,0,2,6,6,3,2,-1,7,6,1,2,3,-.0012906070332974195,.236485093832016,-.085636742413044,1,2,13,3,8,4,-1,12,4,8,2,2,-.0234409496188164,-.341759204864502,.0303556900471449,1,2,2,0,1,2,-1,2,0,1,1,2,6700373342027888e-20,-.1778312027454376,.1098366007208824,1,2,21,0,2,1,-1,21,0,1,1,2,-.0020913260523229837,-.3296548128128052,.0488219298422337,1,2,4,0,1,2,-1,4,0,1,1,2,.005288336891680956,.047602079808712,-.4229690134525299,1,2,13,1,8,6,-1,11,3,8,2,3,.1046722009778023,.0145577099174261,-.5163959860801697,1,2,12,3,4,8,-1,13,4,2,8,2,.0410936884582043,.0255694594234228,-.6734575033187866,0,2,3,0,20,15,-1,3,0,10,15,2,.4545299112796783,-.0473212711513042,.4647259116172791,0,2,9,0,7,3,-1,9,1,7,1,3,-.004420027136802673,.2172905951738358,-.0805237367749214,0,2,12,1,5,2,-1,12,2,5,1,2,-.0033253689762204885,.1196364015340805,-.084737166762352,0,2,6,1,13,3,-1,6,2,13,1,3,.0152236903086305,-.0892436280846596,.2284111976623535,0,3,14,3,10,12,-1,19,3,5,6,2,14,9,5,6,2,-.0312239099293947,.1464260965585709,-.1012998968362808,0,2,1,6,21,6,-1,8,6,7,6,3,-.0729675367474556,.1977909952402115,-.0998045280575752,0,2,12,0,10,12,-1,12,0,5,12,2,.0434687100350857,-.0738932862877846,.1571179032325745,0,2,7,8,11,3,-1,7,9,11,1,3,.007742725778371096,-.090792253613472,.244967594742775,0,2,2,5,22,10,-1,2,5,11,10,2,-.0834884494543076,.1732859015464783,-.1288128942251205,0,2,5,4,15,4,-1,5,6,15,2,2,.0421115085482597,-.1475321054458618,.1373448967933655,0,2,7,1,15,6,-1,7,3,15,2,3,.0966737270355225,-.0551961399614811,.3563303947448731,0,2,0,8,2,6,-1,0,10,2,2,3,-.008899398148059845,-.5261930823326111,.0388906002044678,0,2,5,1,15,4,-1,5,2,15,2,2,-.0238508302718401,.1924559026956558,-.1050153970718384,0,3,7,8,2,2,-1,7,8,1,1,2,8,9,1,1,2,-.000749021302908659,.2476740926504135,-.073859728872776,0,2,11,9,9,2,-1,14,9,3,2,3,-.0230488497763872,-.5220348238945007,.0295383799821138,0,3,7,8,2,2,-1,7,8,1,1,2,8,9,1,1,2,.0005792090087197721,-.080705501139164,.2493984997272492,0,2,17,10,8,4,-1,17,11,8,2,2,-.0254354309290648,-.6520490050315857,.0163280703127384,0,2,0,10,8,4,-1,0,11,8,2,2,.01763916015625,.0246949195861816,-.6850522756576538,0,2,16,11,6,4,-1,18,11,2,4,3,.0205357391387224,.0165182203054428,-.4285225868225098,0,2,0,13,24,1,-1,6,13,12,1,2,.0111132804304361,-.0871591791510582,.2062001973390579,-1.3217060565948486,73,0,3,0,9,10,6,-1,0,9,5,3,2,5,12,5,3,2,.0140618495643139,-.2737283110618591,.4017829895019531,0,3,13,5,10,10,-1,18,5,5,5,2,13,10,5,5,2,-.0334245301783085,.3433864116668701,-.1524070948362351,0,2,0,4,4,2,-1,2,4,2,2,2,-.003398272907361388,.3046114146709442,-.2162856012582779,0,3,13,5,12,10,-1,19,5,6,5,2,13,10,6,5,2,.0673939511179924,-.0539562106132507,.3304964005947113,0,3,0,5,12,10,-1,0,5,6,5,2,6,10,6,5,2,-.0515447482466698,.3804036974906921,-.1334261000156403,0,2,11,11,3,4,-1,11,13,3,2,2,.0036630779504776,-.1760202944278717,.2139966934919357,1,2,5,8,2,5,-1,5,8,1,5,2,.007883662357926369,.0570616200566292,-.5150743126869202,0,2,4,14,18,1,-1,4,14,9,1,2,-.008948004804551601,.2230996936559677,-.1190536990761757,0,2,1,0,1,6,-1,1,3,1,3,2,-.0005576058756560087,.0999659672379494,-.2558285892009735,0,2,8,9,9,4,-1,8,10,9,2,2,.009538939222693443,-.0655315071344376,.3246265947818756,0,2,0,9,5,4,-1,0,10,5,2,2,.007790413219481707,.0450260303914547,-.6068859100341797,0,2,19,5,6,2,-1,21,5,2,2,3,.004069277085363865,-.0624743513762951,.1570695042610169,0,2,0,5,6,2,-1,2,5,2,2,3,.0031110940035432577,-.0744680091738701,.2600801885128021,0,2,13,9,6,3,-1,15,9,2,3,3,.0156514495611191,.0255663506686687,-.5172523260116577,0,2,2,3,21,9,-1,9,3,7,9,3,.2044613063335419,-.0763430967926979,.332390695810318,0,2,11,9,10,2,-1,11,9,5,2,2,-.0101691596210003,.1606681048870087,-.1091597974300385,0,3,0,0,24,14,-1,0,0,12,7,2,12,7,12,7,2,.1894780993461609,.0538599416613579,-.5398759841918945,0,2,5,2,15,6,-1,5,4,15,2,3,-.14792400598526,.2385465949773789,-.1132820993661881,0,2,2,0,16,11,-1,10,0,8,11,2,-.1483031064271927,.3646511137485504,-.0753156766295433,0,2,5,0,15,6,-1,5,2,15,2,3,-.132553294301033,.2919555902481079,-.0949441567063332,0,2,10,5,5,4,-1,10,6,5,2,2,-.0163901709020138,.3920511901378632,-.0685021281242371,0,2,23,0,2,3,-1,23,1,2,1,3,-.006324097979813814,-.6633772253990173,.0337768010795116,0,2,0,0,6,3,-1,0,1,6,1,3,.0147409504279494,.0431423708796501,-.5016931891441345,0,2,10,5,15,2,-1,10,6,15,1,2,.0171020403504372,-.1739968061447144,.2036074995994568,0,3,0,4,6,4,-1,0,4,3,2,2,3,6,3,2,2,-.007523206062614918,.2614240050315857,-.0894730314612389,1,2,21,7,2,4,-1,20,8,2,2,2,.008089945651590824,.0491316393017769,-.3869245946407318,1,2,4,7,4,2,-1,5,8,2,2,2,-.0111914901062846,-.7151393890380859,.0292793400585651,0,2,24,13,1,2,-1,24,14,1,1,2,-6485549238277599e-20,.1147895976901054,-.1195824965834618,0,2,2,0,4,15,-1,3,0,2,15,2,.0263162907212973,.0260859299451113,-.8071029186248779,1,2,21,0,4,1,-1,22,1,2,1,2,-.0132494196295738,-.321144312620163,.0075486088171601295,1,2,4,0,1,4,-1,3,1,1,2,2,.006218059919774532,.0555592402815819,-.4065248966217041,0,3,1,1,24,14,-1,13,1,12,7,2,1,8,12,7,2,.1724980026483536,.0407503582537174,-.5056337714195251,0,2,6,9,6,6,-1,8,9,2,6,3,-.0216798391193151,-.6235452890396118,.0264780297875404,0,2,5,3,15,4,-1,10,3,5,4,3,.0167031493037939,-.1379484981298447,.1374935954809189,0,2,0,0,20,10,-1,5,0,10,10,2,-.0904578119516373,.2364515066146851,-.0822857320308685,0,3,19,3,6,12,-1,22,3,3,6,2,19,9,3,6,2,-.0319220200181007,.2578540146350861,-.0472433306276798,0,2,3,2,7,2,-1,3,3,7,1,2,-.0107858600094914,.1915684044361115,-.1092626005411148,0,3,19,3,6,12,-1,22,3,3,6,2,19,9,3,6,2,.0153568601235747,-.0915980264544487,.1492947041988373,0,3,0,3,6,12,-1,0,3,3,6,2,3,9,3,6,2,-.0298386197537184,.3693186044692993,-.0698615685105324,0,2,19,14,6,1,-1,19,14,3,1,2,.0015088700456544757,-.0684053674340248,.1167493984103203,0,2,4,2,6,13,-1,6,2,2,13,3,-.0391593612730503,-.5139203071594238,.037696298211813,0,2,17,14,8,1,-1,19,14,4,1,2,.009695762768387794,.0178152993321419,-.4685910940170288,0,2,0,14,8,1,-1,2,14,4,1,2,.0007268316112458706,-.13107830286026,.157490000128746,1,2,23,11,2,2,-1,23,11,2,1,2,.003989457152783871,.0452235005795956,-.4237715899944305,1,2,2,11,2,2,-1,2,11,1,2,2,-.005160097032785416,-.5150998830795288,.03480564057827,0,2,8,4,9,4,-1,8,5,9,2,2,-.0237389300018549,.2213699966669083,-.0842292308807373,0,2,8,4,9,3,-1,8,5,9,1,3,.0145637700334191,-.0898087024688721,.2186468988656998,0,3,22,6,2,4,-1,23,6,1,2,2,22,8,1,2,2,.0007284965831786394,-.0709035396575928,.1204996034502983,0,2,7,3,6,8,-1,9,3,2,8,3,-.031149860471487,-.6067348122596741,.0294798705726862,0,2,22,4,3,4,-1,22,5,3,2,2,.0167685598134995,.0236525908112526,-.4164066910743713,1,2,3,9,4,2,-1,4,10,2,2,2,-.008903334848582745,-.5536022186279297,.0302125699818134,0,3,17,7,2,2,-1,18,7,1,1,2,17,8,1,1,2,.0005396113265305758,-.0588473901152611,.1531303972005844,0,2,9,11,6,1,-1,11,11,2,1,3,-.008388601243495941,-.7052780985832214,.0250979401171207,0,3,17,7,2,2,-1,18,7,1,1,2,17,8,1,1,2,-.00034085000515915453,.177186906337738,-.1048467978835106,0,2,0,7,2,4,-1,0,8,2,2,2,.006182800978422165,.0330388285219669,-.4948574900627136,0,2,20,5,5,6,-1,20,7,5,2,3,.0008270256803371012,-.1844830960035324,.0777885988354683,0,3,6,7,2,2,-1,6,7,1,1,2,7,8,1,1,2,-.0006098083104006946,.1959578990936279,-.0837520435452461,0,3,17,7,2,2,-1,18,7,1,1,2,17,8,1,1,2,.00012273030006326735,-.0814708098769188,.1209300011396408,0,3,6,7,2,2,-1,6,7,1,1,2,7,8,1,1,2,.00046565610682591796,-.0953319519758224,.2288299947977066,0,2,15,0,4,9,-1,16,0,2,9,2,-.0216477997601032,-.69338059425354,.0170615408569574,0,3,5,1,14,14,-1,5,1,7,7,2,12,8,7,7,2,.0595006607472897,.0526031702756882,-.2782197892665863,0,2,15,0,4,9,-1,16,0,2,9,2,.025365199893713,.00899545382708311,-.6383489966392517,0,2,0,7,5,3,-1,0,8,5,1,3,-.0039667091332376,-.3175272047519684,.0470112897455692,1,2,21,2,3,4,-1,22,3,1,4,3,.008278477936983109,-.0544440597295761,.2219938933849335,0,2,6,0,4,15,-1,7,0,2,15,2,-.0221254508942366,-.6738150715827942,.0225456394255161,1,2,21,2,3,4,-1,22,3,1,4,3,-.0180159192532301,.1972057968378067,-.0419279783964157,1,2,4,2,4,3,-1,3,3,4,1,3,.008442623540759087,-.0605471916496754,.2649214863777161,1,2,13,5,3,7,-1,14,6,1,7,3,-.0325668416917324,-.7107285857200623,.0118406098335981,0,2,4,10,15,1,-1,9,10,5,1,3,-.004765549208968878,.1384397000074387,-.1150531992316246,0,2,12,6,10,9,-1,12,6,5,9,2,.056936290115118,-.0613397099077702,.2665694057941437,0,2,1,1,22,14,-1,12,1,11,14,2,.1374146044254303,-.1139679029583931,.1789363026618958,0,2,11,8,3,2,-1,11,9,3,1,2,.003412300953641534,-.0668940767645836,.259561687707901,0,2,2,5,11,2,-1,2,6,11,1,2,.0116290198639035,-.1346206963062286,.1518495976924896,-1.4393190145492554,102,1,2,4,1,10,4,-1,3,2,10,2,2,-.0302658006548882,.3809668123722076,-.133776992559433,0,2,5,1,15,6,-1,5,3,15,2,3,-.1888993978500366,.3472220003604889,-.1143490970134735,0,3,0,9,6,6,-1,0,9,3,3,2,3,12,3,3,2,.004475660156458616,-.1779001951217651,.1983720064163208,0,2,19,3,5,2,-1,19,4,5,1,2,-.0092559102922678,.2553296089172363,-.0956856831908226,0,3,2,10,14,4,-1,2,10,7,2,2,9,12,7,2,2,.0103751895949245,-.1290100961923599,.2047273963689804,0,2,1,3,24,8,-1,9,3,8,8,3,.2527360022068024,-.0779134780168533,.341371089220047,0,2,0,8,2,6,-1,0,10,2,2,3,.007995231077075005,.119166798889637,-.4138369858264923,0,2,23,14,2,1,-1,23,14,1,1,2,66510503529571e-18,-.2305306047201157,.1328932046890259,0,3,0,4,6,4,-1,0,4,3,2,2,3,6,3,2,2,.0104297399520874,-.0622061118483543,.2935121059417725,0,2,3,13,21,1,-1,10,13,7,1,3,-.009451309219002724,.1671503931283951,-.1161310002207756,0,3,0,0,24,14,-1,0,0,12,7,2,12,7,12,7,2,-.138630598783493,-.4514685869216919,.0725729763507843,0,2,24,0,1,10,-1,24,5,1,5,2,-.0154232997447252,-.4277118146419525,.0248409193009138,1,2,4,11,2,2,-1,4,11,1,2,2,-.006578299216926098,-.6540787816047668,.0402618311345577,0,2,23,14,2,1,-1,23,14,1,1,2,-68917557655368e-18,.2068260014057159,-.1195247992873192,0,2,0,14,2,1,-1,1,14,1,1,2,7141628884710371e-20,-.1625899970531464,.1518989056348801,0,2,7,2,11,6,-1,7,4,11,2,3,.1354866027832031,-.0504554286599159,.4712490141391754,1,2,2,2,2,2,-1,2,2,1,2,2,.001128623029217124,-.1934940963983536,.149202898144722,0,2,24,0,1,10,-1,24,5,1,5,2,.0376871302723885,-.0006513047264888883,-.5566216707229614,0,2,0,0,1,10,-1,0,5,1,5,2,-.0177724994719028,-.5733047127723694,.0462512709200382,0,2,12,11,6,2,-1,14,11,2,2,3,-.0141524598002434,-.7905998826026917,.0153570203110576,0,2,2,0,20,2,-1,7,0,10,2,2,-.019447410479188,.2123239040374756,-.1021943986415863,0,2,10,0,10,4,-1,10,0,5,4,2,.012915019877255,-.0788644626736641,.1457864940166473,0,2,0,0,20,1,-1,10,0,10,1,2,.007728312164545059,-.1338106989860535,.2055318057537079,0,2,8,4,10,3,-1,8,5,10,1,3,-.0264210291206837,.272904098033905,-.0841038301587105,0,2,9,6,7,6,-1,9,8,7,2,3,-.0216425806283951,.2165616005659103,-.0997976064682007,0,2,8,5,9,3,-1,8,6,9,1,3,-.0186041705310345,.3167817890644074,-.0684646219015121,1,2,6,0,1,3,-1,5,1,1,1,3,.007918447256088257,.038932591676712,-.5849621891975403,0,2,24,0,1,4,-1,24,2,1,2,2,-9086877980735153e-20,.1183537989854813,-.2693997025489807,0,2,9,10,2,1,-1,10,10,1,1,2,-6327161099761724e-20,.1483621001243591,-.1414014995098114,1,2,22,10,1,4,-1,21,11,1,2,2,.003012385917827487,.0475597009062767,-.3168076872825623,0,2,4,0,6,5,-1,6,0,2,5,3,.0202028602361679,.0363369397819042,-.4958786964416504,0,3,17,3,8,12,-1,21,3,4,6,2,17,9,4,6,2,.0681129470467567,-.0636018067598343,.3745648860931397,0,3,0,3,8,12,-1,0,3,4,6,2,4,9,4,6,2,-.0613449215888977,.3703984022140503,-.0626903176307678,0,3,10,3,6,10,-1,13,3,3,5,2,10,8,3,5,2,-.0239223092794418,-.3475331962108612,.0568292401731014,1,2,3,10,4,1,-1,4,11,2,1,2,.004427940119057894,.0318974405527115,-.5085908770561218,1,2,16,2,9,4,-1,16,2,9,2,2,-.0923664569854736,-.4889659881591797,.009993869811296463,1,2,9,2,4,9,-1,9,2,2,9,2,-.003187831025570631,.0857494324445724,-.2382344007492065,0,2,20,9,3,3,-1,20,10,3,1,3,.006260529160499573,.0244128108024597,-.5500137209892273,0,2,6,1,13,4,-1,6,2,13,2,2,.0217170491814613,-.084798701107502,.2182479947805405,0,2,10,4,5,4,-1,10,5,5,2,2,.0102959601208568,-.1032914966344833,.1945870965719223,0,2,0,5,3,3,-1,0,6,3,1,3,.0121496301144362,.0322238989174366,-.5932865738868713,0,2,21,5,4,4,-1,21,6,4,2,2,.0191168300807476,.0309407506138086,-.4538871943950653,0,2,0,5,4,4,-1,0,6,4,2,2,.0007106770062819123,-.1545806974172592,.1262297928333283,0,2,8,9,9,6,-1,8,11,9,2,3,-.029427420347929,.2070481926202774,-.0861818864941597,1,2,4,11,3,1,-1,5,12,1,1,3,-.003706746967509389,-.5155926942825317,.0383589081466198,0,2,23,14,2,1,-1,23,14,1,1,2,60146670875838026e-21,-.102361798286438,.0884054377675056,0,2,0,14,2,1,-1,1,14,1,1,2,-6871361256344244e-20,.1984436959028244,-.0994443595409393,0,2,11,1,4,14,-1,11,8,4,7,2,-.0848333984613419,-.3900933861732483,.0397581607103348,1,2,4,0,2,3,-1,3,1,2,1,3,.0115453395992517,.0299104899168015,-.5021548867225647,0,2,24,12,1,2,-1,24,13,1,1,2,.001272176974453032,.0357883498072624,-.3856284022331238,0,2,0,1,14,14,-1,0,8,14,7,2,.378940612077713,.0429151207208633,-.3726823925971985,0,2,13,0,6,15,-1,15,0,2,15,3,.0587286688387394,.0175066608935595,-.7129334807395935,0,2,0,1,1,4,-1,0,3,1,2,2,-7266741886269301e-20,.0852374136447906,-.1796067953109741,0,2,24,13,1,2,-1,24,14,1,1,2,-.0025661939289420843,-.4941900074481964,.0211067497730255,0,2,0,13,1,2,-1,0,14,1,1,2,-6254477193579078e-20,.1260727941989899,-.1358107030391693,0,2,23,11,2,4,-1,23,12,2,2,2,-.0033382088877260685,-.342547595500946,.0313290804624558,0,2,0,11,2,4,-1,0,12,2,2,2,.004003258887678385,.0353341810405254,-.4785414040088654,0,3,16,10,2,2,-1,17,10,1,1,2,16,11,1,1,2,7872544665588066e-20,-.0865093916654587,.1098069027066231,0,3,7,10,2,2,-1,7,10,1,1,2,8,11,1,1,2,.0003541138139553368,-.0866223275661469,.1815810948610306,0,3,1,0,24,6,-1,13,0,12,3,2,1,3,12,3,2,-.100329302251339,-.4118100106716156,.0407990105450153,0,2,6,1,6,12,-1,8,1,2,12,3,.0457341782748699,.0250630006194115,-.5801063179969788,0,2,19,6,6,3,-1,19,7,6,1,3,.014357109554112,.0273739993572235,-.3111906945705414,0,2,5,6,7,2,-1,5,7,7,1,2,.004282395821064711,-.1212206035852432,.1300680041313171,0,2,9,6,7,4,-1,9,7,7,2,2,-.0191692691296339,.3547115027904511,-.0586979016661644,0,2,0,6,6,3,-1,0,7,6,1,3,.0203719399869442,.0270470399409533,-.6216102838516235,0,2,6,8,13,4,-1,6,9,13,2,2,-.0119816595688462,.1762886941432953,-.094315692782402,0,3,7,10,2,2,-1,7,10,1,1,2,8,11,1,1,2,-9427832264918834e-20,.1507049947977066,-.1071290969848633,0,2,12,11,6,2,-1,14,11,2,2,3,.0101822800934315,.016143349930644,-.3503915071487427,0,3,6,0,12,10,-1,6,0,6,5,2,12,5,6,5,2,-.0520590804517269,-.312146008014679,.0477841906249523,0,2,12,11,6,2,-1,14,11,2,2,3,-.0249434690922499,-.7933396100997925,-.00040430951048620045,0,3,7,0,2,2,-1,7,0,1,1,2,8,1,1,1,2,-.0006225982797332108,.2043831050395966,-.0712744519114494,0,3,16,0,2,2,-1,17,0,1,1,2,16,1,1,1,2,-5685929863830097e-20,.0861500576138496,-.0658712089061737,0,3,7,0,2,2,-1,7,0,1,1,2,8,1,1,1,2,.00040834350511431694,-.1051706001162529,.2224697023630142,0,2,12,11,6,2,-1,14,11,2,2,3,-.0011075460352003574,.0464305393397808,-.0319086797535419,0,2,7,11,6,2,-1,9,11,2,2,3,-.0123662399128079,-.6207143068313599,.0261646900326014,0,2,5,12,18,3,-1,11,12,6,3,3,-.0354762189090252,.1230582967400551,-.0519298203289509,1,2,2,0,1,2,-1,2,0,1,1,2,-.002379444893449545,-.3795419931411743,.0417488515377045,0,3,21,4,4,2,-1,23,4,2,1,2,21,5,2,1,2,.0013966970145702362,-.0851486772298813,.1512037962675095,0,2,9,3,7,3,-1,9,4,7,1,3,.005143789108842611,-.0816644281148911,.1789588034152985,1,2,13,2,8,5,-1,15,4,4,5,2,-.1239939033985138,-.6658980846405029,.00952041894197464,1,2,12,1,6,4,-1,11,2,6,2,2,.0393908508121967,.0182536505162716,-.7637290954589844,0,2,22,0,2,2,-1,22,1,2,1,2,.0029372270219027996,.0226261299103498,-.3233875036239624,0,2,4,1,16,12,-1,12,1,8,12,2,.1816650927066803,-.0618673898279667,.229893296957016,0,2,3,0,20,10,-1,3,0,10,10,2,.0892752110958099,-.0848015919327736,.2109096944332123,0,3,0,4,6,6,-1,0,4,3,3,2,3,7,3,3,2,.0179201308637857,-.0663900971412659,.2243462055921555,1,2,22,4,3,3,-1,23,5,1,3,3,.005502411164343357,-.055913619697094,.1079157963395119,1,2,3,4,3,3,-1,2,5,3,1,3,-.0126318400725722,.3352184891700745,-.0470694787800312,0,2,22,7,3,4,-1,22,8,3,2,2,.008204018697142601,.0521674789488316,-.5830680727958679,0,2,3,1,4,7,-1,4,1,2,7,2,.0215438604354858,.0103719802573323,-.8169081807136536,0,2,22,7,3,4,-1,22,8,3,2,2,-.0042779878713190556,-.3437061011791229,.034835658967495,1,2,2,0,1,2,-1,2,0,1,1,2,.00957217626273632,.0160374492406845,-.7592146992683411,0,2,18,4,6,2,-1,18,5,6,1,2,.005949999205768108,-.0835138633847237,.0937561765313149,0,2,5,3,15,6,-1,5,5,15,2,3,-.0868803784251213,.1977919936180115,-.0735685229301453,0,2,16,4,8,4,-1,16,5,8,2,2,.005769073031842709,-.0611343309283257,.0826714411377907,0,3,0,1,24,10,-1,0,1,12,5,2,12,6,12,5,2,.148064598441124,.0396532900631428,-.408526211977005,0,2,14,0,4,7,-1,15,0,2,7,2,-.018668269738555,-.6671301126480103,.015644509345293,0,2,0,7,3,4,-1,0,8,3,2,2,.0101426700130105,.0211487896740437,-.5610821843147278,0,3,18,5,4,4,-1,20,5,2,2,2,18,7,2,2,2,-.002626311033964157,.0881423130631447,-.0586008317768574,0,3,5,5,6,2,-1,5,5,3,1,2,8,6,3,1,2,.0030406240839511156,-.0699731782078743,.1942113041877747,0,2,21,9,2,3,-1,21,10,2,1,3,-.004052311182022095,-.3989843130111694,.0284519009292126,0,3,7,1,2,2,-1,7,1,1,1,2,8,2,1,1,2,.00033293411252088845,-.0920187085866928,.1521372944116592,0,3,16,1,2,2,-1,17,1,1,1,2,16,2,1,1,2,-.00014471479516942054,.1328881978988648,-.0869787335395813,-1.3500690460205078,115,0,2,9,7,7,6,-1,9,9,7,2,3,-.0305288899689913,.3361127972602844,-.1605879068374634,0,2,17,2,7,2,-1,17,3,7,1,2,-.0068238358944654465,.2510839104652405,-.2578383982181549,1,2,4,2,9,4,-1,3,3,9,2,2,-.0260700508952141,.3176701068878174,-.111156202852726,0,2,19,14,6,1,-1,19,14,3,1,2,.0016021650517359376,-.1096177026629448,.1561331003904343,0,2,6,9,11,6,-1,6,11,11,2,3,-.0346175394952297,.2614395916461945,-.0955564379692078,0,3,17,3,8,12,-1,21,3,4,6,2,17,9,4,6,2,.0825498923659325,-.0359772108495235,.3189736902713776,0,3,0,7,24,8,-1,0,7,12,4,2,12,11,12,4,2,-.1079908013343811,-.4661987125873566,.0965379774570465,0,3,5,3,16,12,-1,13,3,8,6,2,5,9,8,6,2,-.0710962936282158,-.3290941119194031,.0201707594096661,0,2,0,3,24,6,-1,8,5,8,2,9,.6102272272109985,-.0410851910710335,.5919780731201172,0,2,1,8,24,1,-1,7,8,12,1,2,-.009618048556149006,.1845327019691467,-.1256957054138184,0,3,1,9,14,6,-1,1,9,7,3,2,8,12,7,3,2,-.0216567497700453,.355886310338974,-.0654195472598076,0,2,19,5,3,2,-1,19,6,3,1,2,.0032288730144500732,-.1597114056348801,.1442176997661591,0,2,0,14,10,1,-1,5,14,5,1,2,.0036023850552737713,-.1301265954971314,.1848530024290085,0,2,5,1,15,6,-1,5,3,15,2,3,.1224254965782166,-.050962008535862,.478727400302887,0,2,1,1,7,6,-1,1,3,7,2,3,-.0398168414831162,.1911015063524246,-.1490415036678314,0,2,15,12,6,3,-1,17,13,2,1,9,.0165654607117176,.0250385701656342,-.2660810947418213,1,2,4,0,1,3,-1,3,1,1,1,3,.006731497123837471,.0361662209033966,-.5751237273216248,0,2,1,12,24,3,-1,7,12,12,3,2,-.0238826293498278,.1817242056131363,-.1013408973813057,0,2,3,12,6,3,-1,5,13,2,1,9,.0168766304850578,.0499957092106342,-.496448814868927,0,3,1,0,24,12,-1,13,0,12,6,2,1,6,12,6,2,.0814632922410965,.0508196912705898,-.3092927038669586,0,2,2,0,21,15,-1,9,0,7,15,3,.1567866057157517,-.0846417918801308,.209758996963501,0,2,17,3,6,2,-1,17,4,6,1,2,.0107369897887111,-.0588766187429428,.2673564851284027,0,2,3,3,14,2,-1,3,4,14,1,2,-.0162507798522711,.21858249604702,-.1275278925895691,0,2,4,0,21,4,-1,11,0,7,4,3,-.0513998307287693,.1707165986299515,-.0564976185560226,0,2,6,13,4,1,-1,7,13,2,1,2,.0018661050125956535,.0403385981917381,-.4740450084209442,0,3,17,3,8,12,-1,21,3,4,6,2,17,9,4,6,2,-.0494354106485844,.1537600010633469,-.0417859293520451,0,3,0,3,8,12,-1,0,3,4,6,2,4,9,4,6,2,.0696671828627586,-.0588539093732834,.309996485710144,0,3,5,0,16,8,-1,13,0,8,4,2,5,4,8,4,2,-.0781185403466225,-.41095170378685,.0523068793118,1,2,3,7,4,2,-1,4,8,2,2,2,-.008616194128990173,-.5668942928314209,.0286804605275393,0,2,5,11,15,4,-1,5,12,15,2,2,.006891637109220028,-.0957784205675125,.1680631041526794,0,2,10,13,1,2,-1,10,14,1,1,2,8473441994283348e-20,-.1476065963506699,.1278074979782105,0,2,12,14,6,1,-1,14,14,2,1,3,-.0065460228361189365,-.5353912711143494,.0211423803120852,0,2,9,5,6,4,-1,9,6,6,2,2,-.0119369700551033,.2489618957042694,-.0659059137105942,0,2,12,5,13,2,-1,12,6,13,1,2,.0160134993493557,-.0751639306545258,.0920000970363617,0,2,5,0,15,6,-1,5,2,15,2,3,-.179788202047348,.3122220933437347,-.0546800307929516,0,2,3,0,20,15,-1,3,0,10,15,2,.4293603003025055,-.0467442497611046,.4671711027622223,0,2,1,1,22,14,-1,12,1,11,14,2,.1762980967760086,-.1196762025356293,.2303612977266312,0,2,15,5,10,2,-1,15,6,10,1,2,.0434980615973473,.0213767793029547,-.3402695953845978,0,2,0,5,13,2,-1,0,6,13,1,2,.0168955195695162,-.1305568963289261,.1834042966365814,0,2,5,2,15,4,-1,5,3,15,2,2,.0185353793203831,-.0754243135452271,.2354936003684998,0,2,5,4,15,3,-1,5,5,15,1,3,.0173294302076101,-.0853839814662933,.2036404013633728,0,2,21,11,4,4,-1,21,12,4,2,2,.008663074113428593,.0385910011827946,-.6201460957527161,1,2,5,0,1,2,-1,5,0,1,1,2,.005705268122255802,.0312472805380821,-.4070529043674469,0,2,23,3,2,4,-1,23,3,1,4,2,-.0018030379433184862,.1957851052284241,-.1433366984128952,0,2,7,1,4,6,-1,8,1,2,6,2,-.0187879204750061,-.8691418766975403,.0169819705188274,0,2,8,6,11,3,-1,8,7,11,1,3,.0186009202152491,-.0818153098225594,.189138799905777,0,2,0,13,2,1,-1,1,13,1,1,2,8412059833062813e-20,-.1289912015199661,.1211050972342491,0,2,21,12,3,3,-1,21,13,3,1,3,-.005605712998658419,-.4698300957679749,.0159890707582235,0,2,1,12,3,3,-1,1,13,3,1,3,.003519257064908743,.0361930206418037,-.4484112858772278,0,2,23,3,2,4,-1,23,3,1,4,2,.0017741440096870065,-.0433034710586071,.139557495713234,0,2,0,3,2,4,-1,1,3,1,4,2,-.001635042019188404,.1395068019628525,-.1124152988195419,0,3,21,3,4,10,-1,23,3,2,5,2,21,8,2,5,2,.006479477044194937,-.0600515604019165,.0728941932320595,0,3,0,3,4,10,-1,0,3,2,5,2,2,8,2,5,2,-.0203247498720884,.429781585931778,-.0396846085786819,0,2,24,1,1,4,-1,24,2,1,2,2,-.006345304194837809,-.2533842921257019,.0242939405143261,0,2,0,0,1,6,-1,0,2,1,2,3,.009095997549593449,.0340887792408466,-.4518730044364929,0,2,16,1,4,4,-1,17,1,2,4,2,.0161635801196098,.0068225921131670475,-.7205737829208374,0,2,5,1,4,4,-1,6,1,2,4,2,-.0112293101847172,-.6191986203193665,.0222914796322584,0,2,15,2,10,12,-1,15,8,10,6,2,-.1763328015804291,-.6819115877151489,.008840755559504032,0,2,8,5,9,3,-1,8,6,9,1,3,.0192962400615215,-.079629048705101,.2013067007064819,0,2,6,7,14,2,-1,6,8,14,1,2,.0105654401704669,-.0832984521985054,.1872760951519013,0,2,10,7,5,4,-1,10,8,5,2,2,-.006761673837900162,.2069583982229233,-.0813189968466759,0,2,23,12,2,3,-1,23,13,2,1,3,-.0023086878936737776,-.2798121869564056,.0293897707015276,0,2,0,7,4,4,-1,0,8,4,2,2,-.006918931845575571,-.5095586180686951,.0291001908481121,0,2,3,13,21,2,-1,10,13,7,2,3,-.019592609256506,.1248695999383926,-.0666698589920998,0,2,6,1,3,1,-1,7,1,1,1,3,-.000566988019272685,.1772525012493134,-.0755556300282478,0,3,16,0,2,2,-1,17,0,1,1,2,16,1,1,1,2,.0006518710870295763,-.0468317084014416,.1377387940883637,0,3,7,0,2,2,-1,7,0,1,1,2,8,1,1,1,2,-.0004324443871155381,.1750548034906387,-.0822173282504082,0,2,23,12,2,3,-1,23,13,2,1,3,.003209128975868225,.0258904304355383,-.3546032905578613,0,2,8,8,9,2,-1,11,8,3,2,3,-.028899360448122,-.7315214276313782,.0180548094213009,0,2,23,12,2,3,-1,23,13,2,1,3,988036990747787e-19,-.0383186303079128,.0343451388180256,0,2,0,12,2,3,-1,0,13,2,1,3,-.0022848090156912804,-.3603490889072418,.0380517281591892,0,2,8,4,9,9,-1,8,7,9,3,3,.2230083048343658,-.035387709736824,.4118692874908447,0,3,3,11,12,4,-1,3,11,6,2,2,9,13,6,2,2,.0038663020823150873,-.114794097840786,.1196625977754593,0,2,10,10,5,4,-1,10,11,5,2,2,.0036781090311706066,-.088786207139492,.2093122005462647,0,2,7,14,6,1,-1,9,14,2,1,3,.0036886930465698242,.0420652516186237,-.3311671912670136,0,2,4,0,18,15,-1,4,0,9,15,2,-.5000842809677124,.4582319855690002,-.0300164502114058,0,2,0,3,4,4,-1,1,3,2,4,2,.00324575905688107,-.058139480650425,.2244455963373184,0,2,22,0,3,4,-1,22,2,3,2,2,-.000725153717212379,.0857456997036934,-.2164471000432968,0,2,0,0,20,8,-1,5,0,10,8,2,.0756241232156754,-.0728698670864105,.1809341013431549,0,3,1,5,24,10,-1,13,5,12,5,2,1,10,12,5,2,-.1401147991418839,-.3049497008323669,.0322263389825821,0,2,0,5,5,6,-1,0,7,5,2,3,.0012914249673485756,-.1651930958032608,.0796989724040031,0,2,18,3,4,2,-1,18,4,4,1,2,.004806306213140488,-.0511631406843662,.1528493016958237,1,2,2,3,4,2,-1,2,3,4,1,2,.0197005104273558,-.0214679203927517,.589863121509552,0,2,14,1,6,6,-1,16,1,2,6,3,-.0282465498894453,-.3611007034778595,.021594600751996,0,2,5,1,6,6,-1,7,1,2,6,3,.0318388007581234,.0213881190866232,-.5591915845870972,0,2,11,10,6,1,-1,13,10,2,1,3,.005292695946991444,.0171414706856012,-.3245368003845215,0,2,6,8,11,4,-1,6,9,11,2,2,.009317620657384396,-.069147951900959,.1877806931734085,0,3,23,13,2,2,-1,24,13,1,1,2,23,14,1,1,2,.0001981267996598035,-.0710251703858376,.1166272014379501,0,2,6,0,13,4,-1,6,1,13,2,2,.0172033403068781,-.0834768265485764,.1448491960763931,1,2,17,0,3,1,-1,18,1,1,1,3,.008054856210947037,.0214444492012262,-.2763100862503052,1,2,8,0,1,3,-1,7,1,1,1,3,.006741908844560385,.0341341383755207,-.355537086725235,0,3,22,12,2,2,-1,23,12,1,1,2,22,13,1,1,2,5713692007702775e-20,-.0699329003691673,.0822271332144737,0,2,0,13,2,1,-1,1,13,1,1,2,-6001443034620024e-20,.1533315926790237,-.080194279551506,0,2,22,13,2,1,-1,22,13,1,1,2,-6637762271566316e-20,.0740585327148438,-.0435769110918045,0,2,1,13,2,1,-1,2,13,1,1,2,7060549251036718e-20,-.1192411035299301,.1157367005944252,0,2,22,13,3,1,-1,23,13,1,1,3,7230143819469959e-20,-.0702318474650383,.0793638303875923,0,2,1,2,2,12,-1,2,2,1,12,2,-.0014867830323055387,.124576099216938,-.1076287999749184,0,2,18,3,4,2,-1,18,4,4,1,2,-.005243482068181038,.111677497625351,-.0614912398159504,0,2,3,3,4,2,-1,3,4,4,1,2,.007805523928254843,-.0496800504624844,.3046393096446991,0,2,24,0,1,12,-1,24,3,1,6,2,.0167157892137766,.0242684707045555,-.5641499757766724,0,2,5,8,15,6,-1,5,10,15,2,3,-.0197794307023287,.129310205578804,-.101400800049305,1,2,19,7,6,2,-1,19,7,6,1,2,-6775221845600754e-20,.0773630663752556,-.0876037329435349,0,2,1,10,5,3,-1,1,11,5,1,3,-.0129433302208781,-.8692914843559265,.0158042199909687,0,2,24,0,1,12,-1,24,3,1,6,2,-.0125468103215098,-.1350758969783783,.045630618929863,0,2,0,0,1,12,-1,0,3,1,6,2,.007972786203026772,.0405779294669628,-.3409133851528168,0,2,9,0,12,1,-1,13,0,4,1,3,-.006315289996564388,.137299194931984,-.056167159229517,0,2,4,0,12,1,-1,8,0,4,1,3,-.0036897659301757812,.1639326065778732,-.0914164036512375,0,2,3,0,20,1,-1,8,0,10,1,2,.005057888105511665,-.0800797268748283,.1433712989091873,0,2,1,0,9,2,-1,4,0,3,2,3,-.0299335699528456,-.5326762199401855,.0227312203496695,0,2,11,6,8,2,-1,11,7,8,1,2,.0070810988545417786,-.0732182189822197,.1027508974075317,0,2,11,3,3,8,-1,11,7,3,4,2,.0508137904107571,.0516868904232979,-.2544622123241425,1,2,20,4,4,2,-1,21,5,2,2,2,.0047044758684933186,-.0572907589375973,.076064832508564,1,2,6,7,2,6,-1,6,7,1,6,2,.0046408819034695625,.0559986904263496,-.2172269970178604,1,2,20,4,4,2,-1,21,5,2,2,2,-.009512174874544144,.1812860071659088,-.0377242304384708,1,2,5,4,2,4,-1,4,5,2,2,2,.002572624944150448,-.1238458007574081,.1421934068202972,-1.3960490226745605,128,0,2,7,5,11,3,-1,7,6,11,1,3,.0184330195188522,-.1618741005659103,.3351263999938965,0,2,20,1,3,4,-1,20,2,3,2,2,.0048202150501310825,-.097200833261013,.2755692005157471,0,2,8,4,9,3,-1,8,5,9,1,3,.0214508101344109,-.1013654991984367,.3922119140625,0,2,9,6,9,3,-1,9,7,9,1,3,.0201995000243187,-.1041551977396011,.3485709130764008,0,3,0,7,8,8,-1,0,7,4,4,2,4,11,4,4,2,.0154604399576783,-.1814713031053543,.2296576052904129,0,2,9,7,7,3,-1,9,8,7,1,3,.0121146701276302,-.0955794528126717,.3321264982223511,0,2,8,3,9,3,-1,8,4,9,1,3,.0166161693632603,-.0751067474484444,.3475660085678101,1,2,21,1,1,6,-1,19,3,1,2,3,-.0151290399953723,.1396238952875137,-.1150512024760246,0,2,0,7,24,5,-1,6,7,12,5,2,-.0707296282052994,.2683610916137695,-.1016533970832825,1,2,24,11,1,2,-1,24,11,1,1,2,.002283175941556692,.0443518795073032,-.4632245898246765,1,2,5,2,8,5,-1,5,2,4,5,2,.005585364997386932,.0919516831636429,-.3147256970405579,0,3,16,3,8,12,-1,20,3,4,6,2,16,9,4,6,2,-.040678508579731,.1471066027879715,-.0726505890488625,0,3,0,0,24,12,-1,0,0,12,6,2,12,6,12,6,2,-.1358978003263474,-.5053529739379883,.0469954796135426,0,3,8,2,10,8,-1,13,2,5,4,2,8,6,5,4,2,-.0384974703192711,-.3717043101787567,.05520835891366,0,3,0,3,2,8,-1,0,3,1,4,2,1,7,1,4,2,.0027928350027650595,-.1162076964974403,.1937797069549561,0,2,22,11,2,4,-1,22,12,2,2,2,.005341255106031895,.0129640102386475,-.4924449026584625,0,2,1,11,2,4,-1,1,12,2,2,2,-.002660450991243124,-.4564127027988434,.0437755398452282,0,2,12,2,13,12,-1,12,8,13,6,2,.3209887146949768,.0484563298523426,-.3930096924304962,1,2,5,8,2,4,-1,5,8,1,4,2,-.007249520160257816,-.4188942015171051,.0410884395241737,0,2,15,6,6,7,-1,17,6,2,7,3,.0233532395213842,.0302080996334553,-.3757928013801575,0,2,4,6,6,6,-1,6,6,2,6,3,-.022498020902276,-.4524075090885162,.0389229394495487,0,2,13,13,9,2,-1,16,13,3,2,3,-.0238666702061892,-.5288146734237671,.0138155296444893,1,2,4,4,7,4,-1,3,5,7,2,2,-.0336419306695461,.4436714053153992,-.0403416194021702,0,3,18,4,6,8,-1,21,4,3,4,2,18,8,3,4,2,.0221408791840076,-.0495454296469688,.2051838934421539,0,2,3,14,9,1,-1,6,14,3,1,3,.010603429749608,.0319968499243259,-.5148760080337524,0,3,11,11,14,4,-1,18,11,7,2,2,11,13,7,2,2,.009635714814066887,-.1237379983067513,.1527843028306961,0,3,1,4,6,8,-1,1,4,3,4,2,4,8,3,4,2,.0297187492251396,-.0567854084074497,.2904588878154755,1,2,23,0,2,2,-1,23,0,1,2,2,.0002054842043435201,-.2718465924263001,.1070784032344818,0,2,6,0,13,4,-1,6,1,13,2,2,-.0486726500093937,.4235774874687195,-.0456859990954399,0,2,11,0,4,2,-1,11,1,4,1,2,.0025377809070050716,-.0727348327636719,.2103600949048996,1,2,2,0,2,2,-1,2,0,2,1,2,-.003394152969121933,-.3815236985683441,.0445483289659023,0,2,20,9,5,6,-1,20,11,5,2,3,-.0237451493740082,-.4413619935512543,.0249414704740047,0,2,5,2,15,3,-1,5,3,15,1,3,-.020092299208045,.1694606989622116,-.0953345969319344,0,2,9,2,7,3,-1,9,3,7,1,3,.0110265100374818,-.0721762925386429,.2484644949436188,0,2,2,14,21,1,-1,9,14,7,1,3,-.0158068798482418,.2241718024015427,-.0724460408091545,0,2,8,11,16,4,-1,8,11,8,4,2,.0490073598921299,-.0551217384636402,.2583925127983093,0,2,0,12,24,2,-1,12,12,12,2,2,.0288716107606888,-.1153011992573738,.1924846023321152,0,2,22,9,3,6,-1,22,11,3,2,3,.007399017922580242,.0522995889186859,-.2191856950521469,0,3,0,1,12,2,-1,0,1,6,1,2,6,2,6,1,2,-.0061737848445773125,.2038096934556961,-.0696693286299706,0,2,8,9,9,3,-1,8,10,9,1,3,.009433256462216377,-.0534071698784828,.2586283981800079,0,2,0,9,3,6,-1,0,11,3,2,3,.0143210804089904,.0336425192654133,-.4679594039916992,0,3,11,11,14,4,-1,18,11,7,2,2,11,13,7,2,2,.0224872808903456,-.0431007482111454,.1123055964708328,0,2,7,9,4,6,-1,8,9,2,6,2,-.008801883086562157,-.5997744798660278,.0238500293344259,0,2,10,12,6,2,-1,12,12,2,2,3,-.009282492101192474,-.3792850077152252,.0247395392507315,0,2,0,12,1,2,-1,0,13,1,1,2,-3828879926004447e-20,.1094501987099648,-.127059206366539,0,3,15,3,10,12,-1,20,3,5,6,2,15,9,5,6,2,-.1060767024755478,.1223917007446289,-.0179706607013941,0,3,10,9,4,6,-1,10,9,2,3,2,12,12,2,3,2,.0145011199638247,.0254385806620121,-.5499516725540161,0,2,11,3,6,4,-1,11,3,3,4,2,-.0294254906475544,-.4407989084720612,.0163295306265354,0,2,0,0,14,14,-1,0,7,14,7,2,-.2141247987747192,-.581714928150177,.0224080495536327,0,3,15,2,10,12,-1,20,2,5,6,2,15,8,5,6,2,-.0159379299730062,.0447719283401966,-.0470217689871788,0,2,8,3,6,4,-1,11,3,3,4,2,.0358322896063328,.0257156305015087,-.5430511236190796,0,2,23,5,2,6,-1,23,7,2,2,3,-.011497899889946,-.4132392108440399,.0246592592447996,0,2,10,8,5,3,-1,10,9,5,1,3,.0076680490747094154,-.0596144981682301,.2419749945402145,0,2,20,7,5,4,-1,20,8,5,2,2,.0123357502743602,.0375008806586266,-.4776956140995026,0,2,7,10,11,4,-1,7,11,11,2,2,.0130474697798491,-.0609255395829678,.2419895976781845,0,2,16,13,1,2,-1,16,14,1,1,2,52074559789616615e-21,-.0981822684407234,.0891881734132767,0,2,3,1,5,4,-1,3,2,5,2,2,.0032866070978343487,-.0941056609153748,.1441165059804916,0,2,17,3,8,2,-1,17,4,8,1,2,-.0417326614260674,-.6405817270278931,.0221338905394077,0,2,0,7,5,4,-1,0,8,5,2,2,.00976381916552782,.0412781611084938,-.33542799949646,0,2,9,4,12,6,-1,13,4,4,6,3,.1077456995844841,.008176249451935291,-.4347884058952332,0,2,4,4,12,6,-1,8,4,4,6,3,.1119699031114578,.0199715103954077,-.6503595113754272,0,2,11,0,12,9,-1,11,0,6,9,2,.0680430680513382,-.0602735094726086,.138449102640152,0,2,4,5,16,8,-1,12,5,8,8,2,.1206192970275879,-.0666261836886406,.2128939926624298,0,2,16,12,2,1,-1,16,12,1,1,2,-.0027089789509773254,-.421476811170578,.007006293162703514,0,2,7,12,2,1,-1,8,12,1,1,2,-9879899153020233e-20,.1287330985069275,-.1178120002150536,0,3,19,3,6,4,-1,22,3,3,2,2,19,5,3,2,2,.017797689884901,-.0398075394332409,.2582241892814636,0,2,8,10,6,3,-1,10,10,2,3,3,-.0155267501249909,-.5375617146492004,.0254285801202059,0,3,16,6,2,2,-1,17,6,1,1,2,16,7,1,1,2,-.001137480023317039,.1497129052877426,-.0317900516092777,0,3,0,0,24,2,-1,0,0,12,1,2,12,1,12,1,2,.0219873897731304,.0302675794810057,-.4156928062438965,0,3,16,6,2,2,-1,17,6,1,1,2,16,7,1,1,2,5988097109366208e-20,-.0641673132777214,.079953707754612,0,3,0,3,6,4,-1,0,3,3,2,2,3,5,3,2,2,.007696608081459999,-.0727465227246284,.1708455979824066,0,2,22,0,3,4,-1,22,2,3,2,2,.0006279948865994811,.0341552086174488,-.1379152983427048,0,2,11,0,2,3,-1,11,1,2,1,3,-.001262214034795761,.1615235060453415,-.0755578279495239,1,2,21,7,2,4,-1,20,8,2,2,2,-.0110059296712279,-.4823004007339478,.0268340297043324,0,2,4,9,10,1,-1,9,9,5,1,2,-.009579379111528397,.1946887969970703,-.0669640377163887,0,3,16,6,2,2,-1,17,6,1,1,2,16,7,1,1,2,-9182195935864002e-20,.0793757066130638,-.0674495473504066,0,3,7,6,2,2,-1,7,6,1,1,2,8,7,1,1,2,.0012134959688410163,-.0511140711605549,.2775780856609345,0,3,16,6,2,2,-1,17,6,1,1,2,16,7,1,1,2,.0007920680218376219,-.0284809302538633,.1130611971020699,0,2,0,0,1,4,-1,0,2,1,2,2,.002719694981351495,.036205168813467,-.3822895884513855,0,3,16,6,2,2,-1,17,6,1,1,2,16,7,1,1,2,-.0070203691720962524,-.7084425091743469,9621540084481239e-20,0,3,7,6,2,2,-1,7,6,1,1,2,8,7,1,1,2,-.0007491076248697937,.1899659931659699,-.0707588419318199,0,2,8,9,9,6,-1,11,11,3,2,9,-.0300100892782211,.1409595012664795,-.0833628922700882,0,2,0,5,2,6,-1,0,7,2,2,3,.0211524497717619,.025880130007863,-.4697616100311279,1,2,14,4,4,7,-1,15,5,2,7,2,-.0319705903530121,-.512407124042511,.0121158296242356,0,3,2,13,20,2,-1,2,13,10,1,2,12,14,10,1,2,.01050771959126,.038660790771246,-.3098644018173218,0,3,23,7,2,2,-1,24,7,1,1,2,23,8,1,1,2,48152811359614134e-21,-.061655979603529,.0678063929080963,0,2,3,2,1,4,-1,3,3,1,2,2,.0009649511775933206,-.0613585598766804,.1991685926914215,0,2,11,2,14,4,-1,11,3,14,2,2,-.0404121391475201,.1341411024332047,-.0717744380235672,0,2,5,7,4,5,-1,6,7,2,5,2,.0058856019750237465,.0359793491661549,-.3332307040691376,1,2,23,8,1,4,-1,22,9,1,2,2,.0053272489458322525,.032898910343647,-.5153871178627014,0,2,2,0,10,8,-1,7,0,5,8,2,.0532727986574173,-.078457422554493,.158265694975853,0,2,1,5,24,3,-1,9,6,8,1,9,.0174429006874561,.1339583992958069,-.1186174973845482,0,2,10,0,4,10,-1,10,5,4,5,2,-.0433590598404408,-.2269790023565292,.0467031300067902,0,2,5,4,15,3,-1,5,5,15,1,3,-.0231206398457289,.1634031981229782,-.0685165524482727,0,2,11,6,3,6,-1,11,8,3,2,3,-.009379617869853973,.1582739949226379,-.0771108269691467,0,2,18,8,7,3,-1,18,9,7,1,3,-.014122249558568,-.5691561102867126,.0232016704976559,0,2,0,0,4,2,-1,0,1,4,1,2,-.0155957797542214,-.719995379447937,.0111829601228237,1,2,20,0,2,1,-1,20,0,1,1,2,.0007452989812009037,-.076692558825016,.0582969412207603,0,2,0,6,1,8,-1,0,8,1,4,2,-.00512205995619297,-.4147517085075378,.0252124201506376,0,3,23,7,2,2,-1,24,7,1,1,2,23,8,1,1,2,-572679091419559e-19,.0905847102403641,-.066890686750412,0,3,0,7,2,2,-1,0,7,1,1,2,1,8,1,1,2,.0008843176765367389,-.0570513382554054,.2420555055141449,1,2,24,8,1,4,-1,23,9,1,2,2,-.006399252917617559,-.4766991138458252,.0172231607139111,1,2,1,8,3,1,-1,2,9,1,1,3,.00342156202532351,.0330659411847591,-.3505514860153198,0,3,21,7,2,2,-1,22,7,1,1,2,21,8,1,1,2,.0006076180143281817,-.0633307918906212,.1801937073469162,0,2,5,8,15,6,-1,5,10,15,2,3,-.0271245595067739,.1347420066595078,-.0843034014105797,0,2,6,7,14,8,-1,6,9,14,4,2,.0320383384823799,-.0676692426204681,.179666593670845,0,2,1,4,10,2,-1,1,5,10,1,2,.007258396130055189,-.0986167713999748,.1166217997670174,0,2,12,5,3,3,-1,13,6,1,1,9,-.0037803640589118004,.1233021020889282,-.0477618910372257,0,2,0,4,7,3,-1,0,5,7,1,3,.0392416305840015,.0167705602943897,-.7329750061035156,0,3,21,7,2,2,-1,22,7,1,1,2,21,8,1,1,2,-53865249356022105e-21,.0850126668810844,-.0751027390360832,0,3,2,7,2,2,-1,2,7,1,1,2,3,8,1,1,2,.0008259296882897615,-.055150531232357,.2059426009654999,1,2,22,9,1,3,-1,21,10,1,1,3,-5640352901536971e-20,.0762555226683617,-.0699946209788322,0,3,11,13,2,2,-1,11,13,1,1,2,12,14,1,1,2,-.0005692833219654858,-.2483194023370743,.0468857996165752,0,3,19,3,6,12,-1,22,3,3,6,2,19,9,3,6,2,.0424826890230179,-.0344216786324978,.1484764963388443,0,3,0,3,6,12,-1,0,3,3,6,2,3,9,3,6,2,-.0339534096419811,.2843470871448517,-.0431083589792252,0,2,17,1,4,11,-1,18,1,2,11,2,.0188998207449913,.0142998602241278,-.4192070066928864,0,2,0,10,6,3,-1,0,11,6,1,3,.0019765710458159447,.0621932409703732,-.1786025017499924,0,2,23,11,2,1,-1,23,11,1,1,2,-5089443948236294e-20,.0948854833841324,-.0689786225557327,0,2,4,1,4,11,-1,5,1,2,11,2,.0114915501326323,.0331886112689972,-.3628959059715271,0,3,21,3,4,12,-1,23,3,2,6,2,21,9,2,6,2,-.0215106792747974,.2759737968444824,-.03174914047122,0,3,0,3,4,12,-1,0,3,2,6,2,2,9,2,6,2,.0130551997572184,-.0830815583467484,.1449849009513855,0,2,11,11,6,4,-1,11,12,6,2,2,.006674758158624172,-.0461902506649494,.1383360028266907,0,2,6,11,13,4,-1,6,12,13,2,2,-.007061630021780729,.1968749016523361,-.0837985798716545,0,2,11,10,3,1,-1,12,10,1,1,3,.0006148166139610112,.0542011298239231,-.1981233954429627,0,2,5,2,13,8,-1,5,6,13,4,2,.2860183119773865,.0232954602688551,-.4173370003700256,0,2,15,2,10,6,-1,15,4,10,2,3,.0463717207312584,-.0290123391896486,.1808013021945953,0,2,0,2,10,6,-1,0,4,10,2,3,-.0557247512042522,.1358146965503693,-.106122300028801,0,2,12,1,13,8,-1,12,3,13,4,2,-.2584396898746491,-.4910731911659241,.0151501996442676,-1.3937480449676514,113,0,2,5,3,15,3,-1,5,4,15,1,3,-.0417404398322105,.4202992916107178,-.138658806681633,0,2,9,3,9,3,-1,9,4,9,1,3,.02743861079216,-.0691855624318123,.6378138065338135,1,2,3,2,7,3,-1,2,3,7,1,3,-.0319233611226082,.5562999844551086,-.0588022507727146,0,2,5,2,15,3,-1,5,3,15,1,3,-.0426339097321033,.3957036137580872,-.0923223569989204,0,2,5,4,15,3,-1,5,5,15,1,3,-.0453329794108868,.4831672012805939,-.0990284606814384,0,3,17,6,2,2,-1,18,6,1,1,2,17,7,1,1,2,.0014149550115689635,-.038321029394865,.3782787919044495,1,2,5,10,2,3,-1,5,10,1,3,2,.003184457076713443,.0845874175429344,-.3629348874092102,0,2,23,11,2,4,-1,23,13,2,2,2,.007986554875969887,.0660245269536972,-.4990949034690857,0,3,0,11,14,4,-1,0,11,7,2,2,7,13,7,2,2,.008363707922399044,-.1568834036588669,.1732781976461411,0,2,10,4,6,3,-1,10,5,6,1,3,.0166161693632603,-.1092156991362572,.3208172023296356,0,3,0,1,24,14,-1,0,1,12,7,2,12,8,12,7,2,-.108372300863266,-.3144314885139465,.0960887372493744,0,3,1,5,24,8,-1,13,5,12,4,2,1,9,12,4,2,-.0552641600370407,-.3238588869571686,.0760045275092125,0,3,0,0,24,12,-1,0,0,12,6,2,12,6,12,6,2,.1263256967067719,.0652572736144066,-.4011892974376679,0,2,10,0,15,14,-1,10,7,15,7,2,.388045608997345,.0290472805500031,-.2850419878959656,1,2,1,11,2,1,-1,1,11,1,1,2,.0021647498942911625,.0566388815641403,-.4483107030391693,0,2,1,11,24,4,-1,1,11,12,4,2,-.0850358307361603,.2374248951673508,-.1127642020583153,0,2,7,7,10,3,-1,7,8,10,1,3,.0297137200832367,-.0403699316084385,.4747174084186554,0,2,9,5,7,3,-1,9,6,7,1,3,.0189488306641579,-.0794471576809883,.2721098959445953,0,2,0,9,2,6,-1,0,11,2,2,3,-.005443382076919079,-.4018659889698029,.0573576912283897,1,2,22,8,3,2,-1,22,8,3,1,2,-.0074416291899979115,-.4642170965671539,.0343283303081989,0,2,12,6,1,3,-1,12,7,1,1,3,.003174582961946726,-.0719946026802063,.2899833023548126,0,2,24,6,1,6,-1,24,8,1,2,3,-.004643504042178392,-.4219543039798737,.0394870713353157,1,2,3,3,7,2,-1,3,3,7,1,2,-.0225970800966024,.2745698094367981,-.0772427767515183,0,3,10,4,6,10,-1,13,4,3,5,2,10,9,3,5,2,.0175681803375483,.060469850897789,-.2755838930606842,0,2,0,3,14,6,-1,0,6,14,3,2,.2285360991954804,.0372774116694927,-.5375431180000305,0,3,9,0,8,8,-1,13,0,4,4,2,9,4,4,4,2,.0323306396603584,.0458961501717567,-.3844825029373169,1,2,3,4,5,3,-1,2,5,5,1,3,-.0285396501421928,.5891790986061096,-.0340728089213371,0,2,18,9,7,6,-1,18,11,7,2,3,.0286119598895311,.024174140766263,-.2325512021780014,0,2,0,9,7,6,-1,0,11,7,2,3,.0190214607864618,.0562911406159401,-.3404670059680939,0,2,12,1,3,3,-1,12,2,3,1,3,-.005794208031147718,.2392093986272812,-.0638626366853714,0,3,9,2,6,8,-1,9,2,3,4,2,12,6,3,4,2,.0198575407266617,.0513716302812099,-.3405377864837647,0,2,1,14,24,1,-1,7,14,12,1,2,-.0227794591337442,.2922581136226654,-.0604945607483387,0,3,0,3,12,12,-1,0,3,6,6,2,6,9,6,6,2,.1480142027139664,-.0343834199011326,.466711699962616,0,2,11,3,9,4,-1,14,3,3,4,3,-.0337039716541767,-.3770483136177063,.0263036508113146,0,3,9,4,6,6,-1,9,4,3,3,2,12,7,3,3,2,-.0162283908575773,-.338245689868927,.0570861399173737,1,2,20,0,4,1,-1,20,0,2,1,2,-.00429419195279479,-.329514890909195,.0434178002178669,0,2,8,3,9,4,-1,11,3,3,4,3,-.0235741101205349,-.3945200145244598,.0398236103355885,0,2,14,4,6,9,-1,16,4,2,9,3,.0218487493693829,.0268086697906256,-.2596569955348969,0,2,5,4,6,9,-1,7,4,2,9,3,-.0209309905767441,-.3641955852508545,.043782789260149,0,3,16,5,2,2,-1,17,5,1,1,2,16,6,1,1,2,.0016019339673221111,-.0240206904709339,.218288004398346,0,2,0,0,15,12,-1,0,4,15,4,3,-.548965573310852,-.5673372149467468,.0286840796470642,0,2,8,1,11,3,-1,8,2,11,1,3,.0151870902627707,-.081696130335331,.2107073962688446,0,2,0,6,1,6,-1,0,8,1,2,3,-.003065345110371709,-.3701387047767639,.0471426397562027,0,2,14,5,1,3,-1,14,6,1,1,3,-.0022847671061754227,.1813296973705292,-.0419041812419891,0,3,7,2,2,2,-1,7,2,1,1,2,8,3,1,1,2,.0013886080123484135,-.0477169714868069,.3120515942573547,1,2,22,9,1,4,-1,21,10,1,2,2,-.0042354268953204155,-.3120726943016052,.0365724302828312,0,2,10,5,5,3,-1,10,6,5,1,3,.004923470783978701,-.1105178967118263,.1364745944738388,0,2,14,5,1,3,-1,14,6,1,1,3,-.000978243537247181,.101911298930645,-.0396985597908497,0,2,0,0,2,2,-1,0,1,2,1,2,.0023952899500727654,.0345855616033077,-.4620797038078308,1,2,22,9,1,4,-1,21,10,1,2,2,-27391599360271357e-21,.0470036789774895,-.0576489008963108,1,2,3,9,4,1,-1,4,10,2,1,2,-.003789501031860709,-.3904446959495544,.03927081823349,0,2,8,8,9,3,-1,8,9,9,1,3,.025150740519166,-.0313480608165264,.4742729067802429,0,2,2,8,21,3,-1,9,9,7,1,9,-.0545641481876373,.1494560986757278,-.0982013270258904,0,2,10,6,8,8,-1,12,6,4,8,2,-.0416621901094913,-.4245094060897827,.0152987902984023,0,2,7,3,6,12,-1,9,3,2,12,3,-.0207394007593393,-.3218981921672821,.0479229800403118,0,2,11,0,3,1,-1,12,0,1,1,3,-.0009790281765162945,.2330693006515503,-.0597994215786457,0,2,10,10,4,4,-1,11,10,2,4,2,-.004154779948294163,-.3040251135826111,.0456931404769421,0,3,16,5,2,2,-1,17,5,1,1,2,16,6,1,1,2,-26045470804092474e-21,.055388018488884,-.0540977194905281,0,3,7,5,2,2,-1,7,5,1,1,2,8,6,1,1,2,.0010567409917712212,-.052676759660244,.2473292946815491,0,3,1,0,24,8,-1,13,0,12,4,2,1,4,12,4,2,.1842923015356064,.0165581107139587,-.5789644718170166,0,2,6,6,3,1,-1,7,6,1,1,3,.0014177090488374233,-.0524071305990219,.2524789869785309,0,2,21,12,4,3,-1,21,13,4,1,3,-.004088235087692738,-.3066633939743042,.0269502196460962,0,3,0,3,4,4,-1,0,3,2,2,2,2,5,2,2,2,.008542191237211227,-.0481166206300259,.2716326117515564,1,2,19,0,2,3,-1,19,0,1,3,2,.0195690393447876,.0251199807971716,-.3371602892875671,0,2,2,2,15,6,-1,2,5,15,3,2,.267735093832016,.0231193397194147,-.5075724124908447,0,2,5,0,15,2,-1,5,1,15,1,2,-.0326806083321571,.2773688137531281,-.048139289021492,0,2,0,0,2,4,-1,0,1,2,2,2,-.005057450849562883,-.3639586865901947,.0363070890307426,1,2,23,1,2,12,-1,20,4,2,6,2,.0791702270507813,-.0295530706644058,.1632819026708603,0,2,4,2,2,3,-1,4,3,2,1,3,.0022955629974603653,-.0644191280007362,.192163497209549,1,2,20,0,2,2,-1,20,0,1,2,2,.00021744619880337268,-.1248127967119217,.0513428300619125,0,2,0,12,4,3,-1,0,13,4,1,3,-.0059793200343847275,-.5400406122207642,.0236572697758675,0,2,13,1,12,8,-1,13,3,12,4,2,-.2183004021644592,-.3002713024616242,.0188296400010586,1,2,5,0,2,2,-1,5,0,2,1,2,-.002578265964984894,-.2936800122261047,.0437353104352951,0,2,11,2,14,12,-1,11,8,14,6,2,-.1344317942857742,-.2982031106948853,.021951649338007,0,2,0,2,14,12,-1,0,8,14,6,2,.3329834043979645,.0417996607720852,-.3464672863483429,0,2,16,7,6,8,-1,18,7,2,8,3,-.0276046600192785,-.3169625997543335,.0150398099794984,1,2,7,0,13,2,-1,7,0,13,1,2,.0284599401056767,.031132759526372,-.4115855097770691,0,2,16,7,6,8,-1,18,7,2,8,3,.0568751804530621,.0031998890917748213,-.849632978439331,0,2,3,7,6,8,-1,5,7,2,8,3,-.0264140591025352,-.4030340015888214,.028532799333334,0,3,17,7,2,2,-1,18,7,1,1,2,17,8,1,1,2,.0008267092052847147,-.047888670116663,.2083473950624466,1,2,12,5,3,6,-1,13,6,1,6,3,-.0174812003970146,-.4784274101257324,.0261973403394222,0,2,20,2,1,6,-1,20,4,1,2,3,.0102093704044819,-.0323491990566254,.3333239853382111,0,3,7,2,2,2,-1,7,2,1,1,2,8,3,1,1,2,-.0009044284233823419,.2252988964319229,-.0502184815704823,0,2,19,10,2,1,-1,19,10,1,1,2,-5515550947166048e-20,.0854163095355034,-.0922556668519974,0,2,6,4,8,2,-1,8,4,4,2,2,-.0075864349491894245,-.2745333909988403,.0428331792354584,0,2,9,5,16,7,-1,13,5,8,7,2,.0689363330602646,-.0362212397158146,.220213994383812,0,3,6,7,2,2,-1,6,7,1,1,2,7,8,1,1,2,.0010017789900302887,-.0464680194854736,.2603206038475037,0,3,17,7,2,2,-1,18,7,1,1,2,17,8,1,1,2,-.0015333900228142738,.283126711845398,-.0321949794888496,0,3,11,13,2,2,-1,11,13,1,1,2,12,14,1,1,2,.0005027548177167773,.054722610861063,-.2383649945259094,0,3,17,7,2,2,-1,18,7,1,1,2,17,8,1,1,2,6782740820199251e-20,-.0391390211880207,.0501381084322929,0,3,6,7,2,2,-1,6,7,1,1,2,7,8,1,1,2,-.0009686368284747005,.2108709067106247,-.0608406700193882,0,2,20,8,5,3,-1,20,9,5,1,3,.0157267302274704,.0115508204326034,-.8977199196815491,0,3,11,13,2,2,-1,11,13,1,1,2,12,14,1,1,2,-.0006198352784849703,-.2865422964096069,.0380632318556309,0,2,5,11,15,4,-1,5,12,15,2,2,-.0148898903280497,.218888595700264,-.0534253492951393,0,2,0,8,6,3,-1,0,9,6,1,3,.0091423774138093,.0289719104766846,-.4331383109092712,0,2,19,10,2,1,-1,19,10,1,1,2,4456711030798033e-20,-.0493506006896496,.0829902365803719,0,2,4,10,2,1,-1,5,10,1,1,2,-4629544127965346e-20,.1145173981785774,-.1154157966375351,0,3,1,0,24,6,-1,13,0,12,3,2,1,3,12,3,2,-.09515430778265,-.3621807992458344,.0389639586210251,1,2,5,1,2,5,-1,5,1,1,5,2,.0114479204639792,-.0633771494030952,.1799890995025635,0,3,21,3,4,12,-1,23,3,2,6,2,21,9,2,6,2,.0168469492346048,-.079555906355381,.2080432027578354,0,3,0,3,4,12,-1,0,3,2,6,2,2,9,2,6,2,-.0195328295230865,.3306660056114197,-.0368879809975624,0,2,24,2,1,6,-1,24,5,1,3,2,-.009995151311159134,-.2601873874664307,.020032050088048,0,2,5,2,9,8,-1,8,2,3,8,3,.0559661500155926,.0298731103539467,-.3797968029975891,0,2,24,2,1,6,-1,24,5,1,3,2,.0223989300429821,.009444269351661205,-.3070712089538574,0,2,0,2,1,6,-1,0,5,1,3,2,-.011130659841001,-.4547461867332459,.0237820893526077,0,2,9,6,9,4,-1,9,7,9,2,2,.0103914495557547,-.0801509991288185,.1017400026321411,0,2,11,6,3,4,-1,11,7,3,2,2,-.009707638993859291,.322004497051239,-.0475250408053398,0,2,20,14,2,1,-1,20,14,1,1,2,1917052941280417e-20,-.061904601752758,.0758714973926544,0,2,0,8,6,4,-1,0,9,6,2,2,-.005766047164797783,-.2893261909484863,.0357113592326641,0,3,16,0,2,2,-1,17,0,1,1,2,16,1,1,1,2,-.000801895628683269,.1487676948308945,-.0337995104491711,0,2,8,0,9,15,-1,11,5,3,5,9,-.4516898989677429,-.5800644755363464,.0182942803949118,0,2,13,9,4,6,-1,14,9,2,6,2,.007116700056940317,.0221952199935913,-.4342006146907806,0,2,8,2,9,3,-1,8,3,9,1,3,.0214324798434973,-.0425198413431644,.271175891160965,-1.3605639934539795,172,0,3,0,9,8,6,-1,0,9,4,3,2,4,12,4,3,2,.008846518583595753,-.2059727013111115,.2158975005149841,0,2,20,1,5,4,-1,20,3,5,2,2,-.0114869000390172,.1450283974409103,-.2512278854846954,0,2,4,3,16,7,-1,8,3,8,7,2,.06137790158391,-.1210888996720314,.2893109023571014,0,2,15,0,10,8,-1,15,2,10,4,2,-.05146674066782,.0770430117845535,-.1447598934173584,0,3,0,2,24,10,-1,0,2,12,5,2,12,7,12,5,2,.0990432873368263,.0879464074969292,-.3668490052223206,0,2,20,9,5,4,-1,20,10,5,2,2,.00602407893165946,.0559716187417507,-.423053503036499,0,2,0,14,22,1,-1,11,14,11,1,2,.009322894737124443,-.1488721966743469,.1423504054546356,1,2,22,0,3,12,-1,22,0,3,6,2,-.0837828367948532,-.0506230294704437,.0671857669949532,0,2,0,4,2,2,-1,1,4,1,2,2,-.001436957041732967,.1669974029064179,-.118479497730732,0,2,20,9,5,4,-1,20,10,5,2,2,-.008492374792695045,-.5746508240699768,.0469529181718826,0,2,0,9,5,4,-1,0,10,5,2,2,.006158161908388138,.0387838594615459,-.4179377853870392,0,2,7,3,18,6,-1,13,5,6,2,9,.3882668018341065,-.0341588892042637,.3883490860462189,0,2,4,10,10,1,-1,9,10,5,1,2,-.0062880381010472775,.1877942979335785,-.1096756979823113,1,2,21,1,4,10,-1,21,1,2,10,2,-.0886473506689072,.2961074113845825,-.0496502704918385,1,2,4,1,10,4,-1,4,1,10,2,2,.0573849491775036,-.0621429793536663,.4039953947067261,0,2,16,8,4,7,-1,17,8,2,7,2,.006304989103227854,.03024085983634,-.2553277909755707,0,2,5,8,4,7,-1,6,8,2,7,2,-.0128176100552082,-.749150276184082,.0188356805592775,0,2,6,0,13,2,-1,6,1,13,1,2,.006515969056636095,-.0749715119600296,.1975888013839722,0,2,0,12,8,3,-1,0,13,8,1,3,.00829929206520319,.0329895503818989,-.434665709733963,1,2,22,0,2,1,-1,22,0,1,1,2,.006391171831637621,.0297571904957294,-.3072845935821533,1,2,3,0,1,2,-1,3,0,1,1,2,6894963735248893e-20,-.1729405969381332,.09270279109478,0,3,17,3,8,8,-1,21,3,4,4,2,17,7,4,4,2,.0413548089563847,-.0279047600924969,.1629645973443985,0,2,6,2,13,6,-1,6,4,13,2,3,.1899937987327576,-.031295470893383,.4835174977779388,0,2,10,0,15,14,-1,10,7,15,7,2,-.1273290067911148,-.4309565126895905,.0414485186338425,1,2,1,1,12,1,-1,1,1,6,1,2,-.0356059707701206,-.2009662985801697,.0775555819272995,0,2,18,3,4,2,-1,18,4,4,1,2,-.007276066113263369,.1169442981481552,-.0564889013767242,0,2,7,11,6,4,-1,9,11,2,4,3,-.0167282801121473,-.5582438707351685,.024678710848093,0,2,20,4,5,6,-1,20,6,5,2,3,.003516335040330887,-.1312393993139267,.0638676136732101,0,2,1,12,5,3,-1,1,13,5,1,3,-.003770946990698576,-.33209028840065,.0413776598870754,0,3,1,0,24,2,-1,13,0,12,1,2,1,1,12,1,2,-.0138869602233171,-.3127424120903015,.0425702482461929,1,2,3,3,5,3,-1,2,4,5,1,3,.00935373269021511,-.0667856708168983,.1907455027103424,0,2,17,6,8,4,-1,19,6,4,4,2,-.0194346699863672,.315269410610199,-.047358151525259,1,2,5,0,1,3,-1,4,1,1,1,3,.006251101847738028,.0309588797390461,-.3830946981906891,0,2,23,0,2,4,-1,23,2,2,2,2,-.025296900421381,-.2962245941162109,.0151915997266769,0,2,0,0,3,6,-1,0,3,3,3,2,-.003075412940233946,.0729133188724518,-.1764045059680939,0,3,11,1,14,2,-1,18,1,7,1,2,11,2,7,1,2,.007800100836902857,-.0501575507223606,.1162889003753662,0,3,0,1,14,2,-1,0,1,7,1,2,7,2,7,1,2,-.007768054027110338,.2415755987167358,-.0778944417834282,0,2,5,4,15,6,-1,5,6,15,2,3,-.0880923122167587,.2515082955360413,-.0482993088662624,0,2,10,7,2,2,-1,10,8,2,1,2,-.0017023129621520638,.1797576993703842,-.0970716699957848,1,2,13,2,8,5,-1,15,4,4,5,2,-.099703423678875,-.4700092971324921,.0155829498544335,1,2,2,9,2,2,-1,2,9,1,2,2,.004665717016905546,.029513580724597,-.4018146991729736,0,2,12,8,6,3,-1,14,8,2,3,3,-.0176613796502352,-.5449513792991638,.0168585199862719,0,2,0,9,24,6,-1,8,11,8,2,9,-.2230933010578156,.1843273043632507,-.0632233396172524,0,2,1,12,24,3,-1,9,13,8,1,9,.052850779145956,-.0734771713614464,.1994421929121018,0,2,5,11,15,4,-1,5,13,15,2,2,-.0246656592935324,.2699545025825501,-.0523515492677689,1,2,24,10,1,4,-1,23,11,1,2,2,-.0049799769185483456,-.4495851993560791,.026983380317688,1,2,1,10,4,1,-1,2,11,2,1,2,.003053586930036545,.0375075116753578,-.3464896082878113,0,2,15,1,10,14,-1,15,8,10,7,2,-.0263100396841764,-.1766241043806076,.0256136003881693,0,2,0,7,4,2,-1,2,7,2,2,2,-.004868402145802975,.187709704041481,-.0605575516819954,0,2,20,4,5,6,-1,20,6,5,2,3,.0458405800163746,.0330421291291714,-.2026686072349548,0,2,0,4,7,6,-1,0,6,7,2,3,.006748796906322241,-.1384654939174652,.1144922971725464,0,2,11,7,6,3,-1,11,8,6,1,3,.010793830268085,-.0550474487245083,.1810662001371384,0,2,8,10,9,1,-1,11,10,3,1,3,-.0132016502320766,-.4654887914657593,.0258085392415524,0,2,5,10,15,1,-1,10,10,5,1,3,-.0049963342025876045,.1138966009020805,-.1140139997005463,0,2,7,8,6,3,-1,9,8,2,3,3,-.0158193595707417,-.4853562116622925,.0220876205712557,0,2,23,12,2,1,-1,23,12,1,1,2,682646204950288e-19,-.0819193720817566,.0840993970632553,0,3,0,13,24,2,-1,0,13,12,1,2,12,14,12,1,2,-.0156373791396618,-.4515635073184967,.0227358005940914,0,2,9,9,7,3,-1,9,10,7,1,3,.008300557732582092,-.0514142103493214,.2212347984313965,0,2,0,6,2,4,-1,0,7,2,2,2,.006699975114315748,.0297896005213261,-.35434889793396,0,2,18,2,5,4,-1,18,3,5,2,2,.005174416117370129,-.0496886894106865,.220291405916214,0,3,1,4,8,2,-1,1,4,4,1,2,5,5,4,1,2,.006127804052084684,-.0630758926272392,.1783366054296494,0,2,21,8,4,4,-1,21,9,4,2,2,.0068791587837040424,.0284415297210217,-.2993854880332947,0,2,4,4,8,4,-1,4,5,8,2,2,-.0217361003160477,.1791318953037262,-.0602877512574196,0,2,11,4,14,4,-1,11,5,14,2,2,.0140090202912688,-.1060196980834007,.1548174023628235,0,2,3,0,18,9,-1,12,0,9,9,2,.2186813950538635,-.0483517609536648,.257346898317337,0,2,3,0,20,15,-1,3,0,10,15,2,.2838009893894196,-.0509055890142918,.293605387210846,1,2,12,1,6,8,-1,14,3,2,8,3,.1209316030144692,.017309570685029,-.6926872134208679,1,2,17,4,1,9,-1,14,7,1,3,3,.0569618307054043,-.0186788197606802,.3227567970752716,0,2,6,7,4,8,-1,7,7,2,8,2,-.00905009638518095,-.4240661859512329,.0268415194004774,0,2,21,5,4,3,-1,21,6,4,1,3,.0231182798743248,.0105462800711393,-.5228689908981323,0,3,7,0,2,2,-1,7,0,1,1,2,8,1,1,1,2,.0011480690445750952,-.0459857396781445,.2319914996623993,0,2,21,8,4,3,-1,21,9,4,1,3,-.009890930727124214,-.5407552123069763,.0142617002129555,0,3,7,1,2,2,-1,7,1,1,1,2,8,2,1,1,2,.0007059997878968716,-.0649549588561058,.1677557975053787,0,3,16,1,2,2,-1,17,1,1,1,2,16,2,1,1,2,-8231129322666675e-20,.0727679133415222,-.0542482398450375,0,2,0,8,4,3,-1,0,9,4,1,3,.005338047165423632,.0320924408733845,-.3186857998371124,0,3,20,9,2,2,-1,21,9,1,1,2,20,10,1,1,2,598358892602846e-19,-.0492977797985077,.0571143105626106,0,3,3,9,2,2,-1,3,9,1,1,2,4,10,1,1,2,4074164098710753e-20,-.0992263928055763,.1105673015117645,0,3,19,3,6,12,-1,22,3,3,6,2,19,9,3,6,2,-.0271146595478058,.2459900975227356,-.0621489509940147,0,3,7,1,2,2,-1,7,1,1,1,2,8,2,1,1,2,-.000884772278368473,.202344998717308,-.0529261194169521,0,2,7,4,12,3,-1,7,5,12,1,3,-.0192636791616678,.1516259014606476,-.0715369805693626,0,2,0,0,11,2,-1,0,1,11,1,2,.009689152240753174,.035710871219635,-.3255082964897156,0,2,13,2,6,5,-1,15,2,2,5,3,-.0228419005870819,-.3499914109706879,.0171892996877432,0,3,0,0,24,10,-1,0,0,12,5,2,12,5,12,5,2,-.1477797031402588,-.4319078028202057,.0216299500316381,0,2,20,4,2,3,-1,20,5,2,1,3,.0023399880155920982,-.0442668199539185,.0963377729058266,0,2,0,3,7,4,-1,0,4,7,2,2,-.0728321895003319,-.818618893623352,.0117990002036095,0,2,11,1,14,14,-1,11,8,14,7,2,-.3072721064090729,-.7007309198379517,.003556411014869809,0,2,6,2,6,5,-1,8,2,2,5,3,-.0207666493952274,-.3913905024528503,.0246222894638777,0,3,16,0,2,2,-1,17,0,1,1,2,16,1,1,1,2,-.0036341920495033264,-.4501088857650757,.0055562350898981094,0,3,7,0,2,2,-1,7,0,1,1,2,8,1,1,1,2,-7079407077981159e-20,.1087834984064102,-.0905004590749741,0,3,16,0,2,2,-1,17,0,1,1,2,16,1,1,1,2,-8831486047711223e-20,.0641764104366302,-.0494646318256855,0,2,2,0,20,1,-1,7,0,10,1,2,-.0110706500709057,.1473083049058914,-.0670493170619011,0,2,11,0,14,1,-1,11,0,7,1,2,.006362635176628828,-.0400333292782307,.0926633775234222,0,2,9,3,6,2,-1,9,4,6,1,2,-.007749951910227537,.1392461061477661,-.0774780735373497,0,2,11,3,3,4,-1,11,4,3,2,2,.004753272980451584,-.0729171708226204,.1706562042236328,0,2,0,11,18,3,-1,6,12,6,1,9,-.0168079808354378,.130800798535347,-.0801806673407555,0,3,15,3,10,12,-1,20,3,5,6,2,15,9,5,6,2,.1279494017362595,-.0199226494878531,.3711799085140228,0,2,0,3,14,3,-1,0,4,14,1,3,-.018189599737525,.1235873028635979,-.0830406174063683,0,2,9,4,8,3,-1,11,4,4,3,2,-.0161725897341967,-.449065089225769,.0227566491812468,0,2,0,12,2,1,-1,1,12,1,1,2,6804615259170532e-20,-.1011824011802673,.0935735777020454,0,3,23,13,2,2,-1,24,13,1,1,2,23,14,1,1,2,.00011714019638020545,-.0810816064476967,.1062628999352455,0,3,0,13,2,2,-1,0,13,1,1,2,1,14,1,1,2,5452167897601612e-20,-.0932891815900803,.1159989982843399,0,2,9,12,8,1,-1,11,12,4,1,2,-.009509580209851265,-.505190372467041,.0141592798754573,0,2,0,7,6,4,-1,0,8,6,2,2,-.0028461390174925327,-.1991575956344605,.0473652109503746,0,3,19,3,6,12,-1,22,3,3,6,2,19,9,3,6,2,.0232862401753664,-.0403292290866375,.0805157274007797,0,3,0,3,6,12,-1,0,3,3,6,2,3,9,3,6,2,-.0426056496798992,.3344807922840118,-.0383727103471756,0,2,23,7,2,4,-1,23,8,2,2,2,.004510118160396814,.0263549294322729,-.2349215000867844,0,2,0,7,2,4,-1,0,8,2,2,2,.006181781180202961,.0211725104600191,-.4420514106750488,0,3,13,7,8,4,-1,17,7,4,2,2,13,9,4,2,2,-.0106069697067142,.0654574930667877,-.0324725992977619,0,2,0,1,10,14,-1,0,8,10,7,2,-.085813581943512,-.3406231105327606,.0301514994353056,0,2,9,8,7,3,-1,9,9,7,1,3,.006275806110352278,-.0619911886751652,.1503033936023712,0,2,9,8,3,4,-1,9,9,3,2,2,-.0030965260230004787,.1481299996376038,-.0813362672924995,1,2,18,10,2,3,-1,17,11,2,1,3,-.0111239803954959,-.4638158082962036,.0152134699746966,1,2,7,10,3,2,-1,8,11,1,2,3,-.011103980243206,-.6005380153656006,.0135854296386242,1,2,23,0,2,1,-1,23,0,1,1,2,-.003294483060017228,-.4641366004943848,.026226969435811,1,2,12,8,4,3,-1,12,8,2,3,2,.0113766100257635,-.0565435998141766,.1575082987546921,0,2,5,7,15,3,-1,10,8,5,1,9,-.0294652003794909,.1486423015594482,-.0651882514357567,0,2,0,0,20,8,-1,10,0,10,8,2,.0491673015058041,-.0922251716256142,.1015425994992256,1,2,21,0,4,3,-1,20,1,4,1,3,-.0209590997546911,.1749638020992279,-.0255501996725798,1,2,4,0,3,4,-1,5,1,1,4,3,.0054627470672130585,-.0626592189073563,.1695216000080109,0,2,18,3,5,2,-1,18,4,5,1,2,-.0043515427969396114,.0822615697979927,-.0598390214145184,0,2,2,3,5,2,-1,2,4,5,1,2,.007477249950170517,-.049545519053936,.2469687014818192,1,2,13,0,2,5,-1,13,0,1,5,2,-.0374278612434864,-.9178332090377808,.0035620180424302816,0,2,5,12,6,3,-1,7,13,2,1,9,-.0248439908027649,-.4893918037414551,.0171825792640448,1,2,13,0,2,5,-1,13,0,1,5,2,.008012044243514538,.02174236997962,-.0648176670074463,0,2,9,6,4,2,-1,9,7,4,1,2,.005730602890253067,-.0707883909344673,.1390995979309082,0,2,18,9,4,3,-1,18,10,4,1,3,.0109893204644322,.007036118768155575,-.3556833863258362,0,2,3,9,4,3,-1,3,10,4,1,3,-.0035342550836503506,-.2303902953863144,.0395394414663315,0,2,7,9,15,6,-1,7,12,15,3,2,.0326121784746647,-.0834509506821632,.0961622893810272,0,3,4,1,12,6,-1,4,1,6,3,2,10,4,6,3,2,-.0519190989434719,-.3597438931465149,.023558309301734,0,2,10,5,14,10,-1,10,10,14,5,2,.2802706062793732,.0191025994718075,-.2738722860813141,0,2,10,6,2,3,-1,10,7,2,1,3,-.0018680640496313572,.1557087004184723,-.0592420399188995,1,2,13,4,4,6,-1,14,5,2,6,2,.0412711799144745,.00921028945595026,-.6225361824035645,1,2,12,4,6,4,-1,11,5,6,2,2,-.0341574586927891,-.6910676956176758,.0140588199719787,0,2,19,0,5,3,-1,19,1,5,1,3,.0281112492084503,.006389203947037458,-.6016489267349243,0,2,6,7,3,1,-1,7,7,1,1,3,-.0009767578449100256,.1663821935653687,-.053310938179493,0,2,19,0,5,3,-1,19,1,5,1,3,-.0284041091799736,-.8431190848350525,.004920249804854393,0,2,6,7,3,1,-1,7,7,1,1,3,.000976581359282136,-.0524366609752178,.1696853935718536,0,2,11,0,6,15,-1,13,0,2,15,3,-.079386442899704,-.7418122291564941,.004584290087223053,0,3,0,2,2,6,-1,0,2,1,3,2,1,5,1,3,2,.0029205000028014183,-.0499707907438278,.1705241948366165,1,2,21,0,2,1,-1,21,0,1,1,2,-.00497920997440815,-.4247047007083893,.0113332699984312,1,2,4,0,1,2,-1,4,0,1,1,2,.007530936039984226,.0200634505599737,-.4817556142807007,0,2,9,0,14,8,-1,9,0,7,8,2,-.1206317022442818,.1783839017152786,-.0404023304581642,0,3,7,0,2,2,-1,7,0,1,1,2,8,1,1,1,2,6450695218518376e-20,-.08585424721241,.1069532036781311,0,2,4,6,18,4,-1,4,6,9,4,2,.1407386958599091,-.0227742493152618,.4258378148078919,0,3,0,7,2,2,-1,0,7,1,1,2,1,8,1,1,2,.0005870871245861053,-.0585701502859592,.1556326001882553,0,3,23,7,2,2,-1,24,7,1,1,2,23,8,1,1,2,42137140553677455e-21,-.057670820504427,.0648988783359528,0,3,0,7,2,2,-1,0,7,1,1,2,1,8,1,1,2,-5485915971803479e-20,.1383187025785446,-.0935516208410263,0,3,23,7,2,2,-1,24,7,1,1,2,23,8,1,1,2,-8131826325552538e-20,.0786737129092216,-.0584529899060726,0,3,0,7,2,2,-1,0,7,1,1,2,1,8,1,1,2,.00010710170317906886,-.1036069020628929,.1105291023850441,0,2,24,6,1,4,-1,24,7,1,2,2,.005948519799858332,.0124739902094007,-.6046726703643799,0,2,0,6,1,4,-1,0,7,1,2,2,-.003834115108475089,-.5651066899299622,.0139579800888896,0,2,11,0,6,15,-1,13,0,2,15,3,.048183299601078,.006878762040287256,-.2265198975801468,0,2,0,1,2,3,-1,0,2,2,1,3,.009846852160990238,.0149204200133681,-.5408421754837036,0,2,8,1,9,3,-1,8,2,9,1,3,.007079598028212786,-.0740584135055542,.1212510019540787,0,2,8,1,3,3,-1,9,2,1,1,9,-.001718766987323761,.1150275021791458,-.0767944231629372,1,2,19,7,5,3,-1,18,8,5,1,3,.0141321197152138,.0222348105162382,-.3713991045951843,1,2,6,7,3,5,-1,7,8,1,5,3,-.008070403710007668,-.2536310851573944,.0307344105094671,0,3,1,0,24,14,-1,13,0,12,7,2,1,7,12,7,2,.2283755987882614,.0168569702655077,-.5456647872924805,0,2,8,11,9,4,-1,8,12,9,2,2,-.0106975501403213,.1705504059791565,-.048232439905405,0,2,6,11,14,4,-1,6,12,14,2,2,.006105799227952957,-.0747807994484901,.1244964972138405,0,2,0,11,3,4,-1,0,12,3,2,2,.003582532051950693,.0343106091022491,-.2529211938381195,0,2,17,11,8,2,-1,17,12,8,1,2,.008796939626336098,.0227318406105042,-.2092120051383972,0,2,0,11,8,2,-1,0,12,8,1,2,-.0117600196972489,-.578932523727417,.0150208799168468,0,2,23,13,1,2,-1,23,14,1,1,2,.0014420140068978071,.0108067002147436,-.174350306391716,0,2,1,13,1,2,-1,1,14,1,1,2,-4906246977043338e-20,.0891510024666786,-.0946391522884369,0,2,9,0,14,8,-1,9,0,7,8,2,.0330546088516712,-.0502973310649395,.072425939142704,0,2,0,1,14,8,-1,0,3,14,4,2,-.0449321903288364,.0714013203978539,-.1246540024876595,0,2,20,4,2,3,-1,20,5,2,1,3,-.0123274503275752,.2216438055038452,-.0160399992018938,0,2,0,1,14,9,-1,0,4,14,3,3,-.3724926114082336,-.3693152964115143,.0260022208094597,0,2,9,13,9,1,-1,12,13,3,1,3,.0152763100340962,.0053399899043142796,-.5456783771514893,0,2,7,13,9,1,-1,10,13,3,1,3,-.0145687395706773,-.5883231163024902,.0139877004548907,0,3,20,7,2,2,-1,21,7,1,1,2,20,8,1,1,2,.000998902483843267,-.0358810797333717,.174325704574585,-1.2964390516281128,201,0,2,5,9,15,6,-1,5,12,15,3,2,.0572950802743435,-.1768665015697479,.2448291033506393,0,2,21,0,2,6,-1,21,3,2,3,2,-.010082540102303,.1378919035196304,-.2031147032976151,0,3,4,4,8,10,-1,4,4,4,5,2,8,9,4,5,2,-.0185250397771597,.1623972952365875,-.1676190942525864,0,2,16,1,8,6,-1,16,3,8,2,3,-.0527544915676117,.134710505604744,-.1428814977407455,1,2,2,1,11,2,-1,2,1,11,1,2,.024354750290513,-.0266546793282032,.4326488971710205,0,2,20,4,5,6,-1,20,6,5,2,3,.0634179636836052,.0422610901296139,-.401317685842514,0,2,0,4,5,6,-1,0,6,5,2,3,.0038921029772609472,-.1906750947237015,.1267316043376923,0,3,19,11,6,4,-1,22,11,3,2,2,19,13,3,2,2,.0015238909982144833,-.1371546983718872,.1246439963579178,0,2,10,4,5,2,-1,10,5,5,1,2,-.006765741854906082,.2558242976665497,-.0607152618467808,0,2,7,6,11,4,-1,7,7,11,2,2,-.0241763703525066,.285988986492157,-.0642128363251686,1,2,9,2,4,4,-1,9,2,2,4,2,-.009176191873848438,.1021848022937775,-.1999447047710419,0,2,1,0,24,11,-1,7,0,12,11,2,-.1578399986028671,.239830806851387,-.0785783529281616,0,2,4,0,10,10,-1,9,0,5,10,2,.0487401895225048,-.1100914031267166,.1558353006839752,1,2,23,8,2,4,-1,23,8,2,2,2,.0191179793328047,.0197066999971867,-.3720233142375946,1,2,2,8,4,2,-1,2,8,2,2,2,-.0127781601622701,-.4160012900829315,.0353787206113338,0,3,23,3,2,12,-1,24,3,1,6,2,23,9,1,6,2,.0026996301021426916,-.0985597372055054,.1149144023656845,0,3,9,3,6,12,-1,9,3,3,6,2,12,9,3,6,2,.0245021991431713,.0430920794606209,-.3663294017314911,0,3,1,0,24,12,-1,13,0,12,6,2,1,6,12,6,2,.0850031301379204,.0430114008486271,-.2886289954185486,0,3,0,3,2,12,-1,0,3,1,6,2,1,9,1,6,2,.003164753085002303,-.114293098449707,.1279425024986267,1,2,14,8,3,4,-1,14,8,3,2,2,.0116577902808785,-.0515255816280842,.1422376930713654,0,2,0,0,6,1,-1,2,0,2,1,3,-.006680144928395748,-.4743103981018066,.0287305805832148,0,2,9,2,16,7,-1,13,2,8,7,2,-.0388207696378231,.0953134000301361,-.0473909191787243,1,2,8,7,1,6,-1,8,7,1,3,2,-.0254217702895403,-.4219881892204285,.028437789529562,0,2,8,7,9,4,-1,8,8,9,2,2,-.0121460696682334,.1830082982778549,-.0762820765376091,0,2,7,5,10,4,-1,7,6,10,2,2,-.026787219569087,.2859373092651367,-.0522297993302345,1,2,14,2,1,6,-1,12,4,1,2,3,-.0116149904206395,.1138594970107079,-.0663506835699081,0,3,0,3,8,12,-1,0,3,4,6,2,4,9,4,6,2,-.0599568895995617,.2777940034866333,-.0470041483640671,0,2,19,13,6,2,-1,19,13,3,2,2,-.00867370143532753,.2129196971654892,-.0287764091044664,0,2,0,13,6,2,-1,3,13,3,2,2,.002854354912415147,-.1221636980772018,.1421594023704529,0,2,23,12,1,3,-1,23,13,1,1,3,.002271306002512574,.0182375106960535,-.4104354083538055,0,2,1,12,1,3,-1,1,13,1,1,3,-.0012334890197962523,-.3772745132446289,.035043578594923,0,2,23,12,1,3,-1,23,13,1,1,3,-.0026904400438070297,-.4196098148822784,.0100445803254843,0,2,4,10,10,1,-1,9,10,5,1,2,-.0026551370974630117,.1150795966386795,-.1072231009602547,0,2,23,12,1,3,-1,23,13,1,1,3,-56895318266469985e-21,.0416303612291813,-.0317232310771942,0,2,1,12,1,3,-1,1,13,1,1,3,.000987313687801361,.0429715514183044,-.2815021872520447,0,2,11,2,12,4,-1,11,3,12,2,2,.0182135794311762,-.0451830588281155,.1914888024330139,0,2,3,1,12,6,-1,3,3,12,2,3,-.0872772708535194,.171896293759346,-.121959999203682,1,2,23,0,2,2,-1,23,0,1,2,2,-.005389865022152662,-.386665403842926,.0155352503061295,1,2,2,0,2,2,-1,2,0,2,1,2,.0108539797365665,.0364841781556606,-.3959751129150391,0,2,14,13,4,2,-1,15,13,2,2,2,-.004180129151791334,-.4820233881473541,.0170424394309521,1,2,3,6,6,3,-1,2,7,6,1,3,-.0234517697244883,.4986476898193359,-.0220960807055235,0,2,14,13,4,2,-1,15,13,2,2,2,.0029061511158943176,.0269486699253321,-.3256624042987824,0,3,0,7,24,4,-1,0,7,12,2,2,12,9,12,2,2,.0463646091520786,.026882030069828,-.3762974143028259,0,2,23,0,2,2,-1,23,1,2,1,2,-.00021972910326439887,.0705367177724838,-.1089593023061752,0,2,7,13,4,2,-1,8,13,2,2,2,-.0037804399617016315,-.4887917041778565,.0199932008981705,0,3,16,11,2,2,-1,17,11,1,1,2,16,12,1,1,2,6064217086532153e-20,-.0753576681017876,.0811428874731064,0,2,8,11,9,4,-1,8,12,9,2,2,-.0106888897716999,.2206722944974899,-.0562041401863098,0,2,2,12,21,3,-1,9,13,7,1,9,.0436831787228584,-.0610822103917599,.1712581962347031,0,2,1,13,21,2,-1,8,13,7,2,3,-.0202471297234297,.1565587073564529,-.0770068317651749,1,2,22,10,1,4,-1,21,11,1,2,2,-.005928528029471636,-.4369310140609741,.0202764291316271,1,2,3,5,6,3,-1,2,6,6,1,3,.01134920027107,-.0597750283777714,.1651744991540909,1,2,13,2,8,5,-1,15,4,4,5,2,-.1365716010332108,-.8707361817359924,.004286841955035925,0,2,4,2,8,6,-1,4,4,8,2,3,.0663046464323998,-.0388697795569897,.2649452090263367,0,2,5,1,15,4,-1,5,2,15,2,2,.0195911191403866,-.0803443267941475,.1665123999118805,0,2,0,1,8,4,-1,0,2,8,2,2,.0340932197868824,.026182109490037,-.4526833891868591,0,2,10,0,15,14,-1,10,7,15,7,2,-.2061661928892136,-.4254589080810547,.0156788490712643,0,2,9,13,6,2,-1,11,13,2,2,3,-.007667514029890299,-.3513334095478058,.0274340193718672,0,2,8,9,11,4,-1,8,10,11,2,2,-.0129145104438066,.1359857022762299,-.0633687376976013,1,2,8,6,3,3,-1,9,7,1,3,3,.0160742308944464,.0215212907642126,-.4643712937831879,0,2,21,5,4,6,-1,21,7,4,2,3,.0369430296123028,.0274755004793406,-.3073608875274658,1,2,12,3,6,6,-1,10,5,6,2,3,-.075521357357502,-.4241931140422821,.0237817000597715,0,2,12,9,10,6,-1,12,9,5,6,2,.0243982393294573,-.0493879318237305,.1672402024269104,0,2,3,9,10,6,-1,8,9,5,6,2,.1157704964280129,.0166440103203058,-.6928011178970337,0,2,12,0,4,1,-1,13,0,2,1,2,.000915299984626472,-.0502800084650517,.1328525990247726,1,2,3,10,4,1,-1,4,11,2,1,2,-.003624845063313842,-.3066833913326263,.028492359444499,1,2,18,12,1,2,-1,18,12,1,1,2,-.0007358163129538298,.0559885688126087,-.0392797887325287,0,2,2,0,20,10,-1,12,0,10,10,2,.2000436931848526,-.0568408109247684,.1685038954019547,1,2,22,2,3,6,-1,23,3,1,6,3,-.0178776904940605,.193175196647644,-.0514639392495155,1,2,3,2,6,3,-1,2,3,6,1,3,.011350380256772,-.0489644110202789,.2181939035654068,0,3,21,1,4,6,-1,23,1,2,3,2,21,4,2,3,2,.0125029096379876,-.0419848784804344,.2713862061500549,0,3,0,1,4,6,-1,0,1,2,3,2,2,4,2,3,2,-.009303327649831772,.1590452045202255,-.0626974031329155,0,2,24,0,1,6,-1,24,3,1,3,2,.009820517152547836,.015533110126853,-.330407589673996,0,2,0,0,1,6,-1,0,3,1,3,2,.0044993069022893906,.0376702398061752,-.3112137019634247,0,2,18,0,6,6,-1,18,2,6,2,3,.0140464501455426,-.0434262491762638,.1032719984650612,0,2,5,1,15,4,-1,5,2,15,2,2,-.0411175191402435,.1867991983890533,-.0664343684911728,0,2,4,8,18,1,-1,10,8,6,1,3,-.0107145197689533,.1244383975863457,-.0663585364818573,0,2,8,6,6,4,-1,8,7,6,2,2,.009289542213082314,-.0821698531508446,.1224353983998299,0,2,9,5,8,2,-1,11,5,4,2,2,-.0130508001893759,-.400338888168335,.016636909916997,0,2,5,0,6,6,-1,7,0,2,6,3,-.0364681892096996,-.5473737716674805,.0148177295923233,0,2,21,8,2,1,-1,21,8,1,1,2,-7537294004578143e-20,.0594716407358646,-.0578790009021759,1,2,7,1,2,2,-1,7,1,2,1,2,.0142522901296616,.0252972692251205,-.3336473107337952,0,2,17,4,8,4,-1,17,5,8,2,2,.0033469200134277344,-.0707368031144142,.0745013207197189,0,2,6,0,13,2,-1,6,1,13,1,2,.004444595891982317,-.0672459527850151,.1451885998249054,0,2,21,5,4,6,-1,21,7,4,2,3,-.008720582351088524,-.202135294675827,.0275202393531799,0,2,0,5,4,6,-1,0,7,4,2,3,.0469216890633106,.0161568503826857,-.5311927795410156,0,2,21,8,2,1,-1,21,8,1,1,2,58387980971019715e-21,-.0557161718606949,.0720106214284897,0,2,2,8,2,1,-1,3,8,1,1,2,-4610310134012252e-20,.0959030091762543,-.0971473827958107,1,2,23,0,2,1,-1,23,0,1,1,2,.006065776105970144,.0240712091326714,-.2376091033220291,0,2,4,0,15,4,-1,4,1,15,2,2,-.0555203706026077,.3074511885643005,-.0299711804836988,0,2,15,1,10,8,-1,15,3,10,4,2,-.0365539006888866,.0328120291233063,-.0570152215659618,0,3,0,5,4,2,-1,0,5,2,1,2,2,6,2,1,2,.0018784699495881796,-.0653261989355087,.1390983015298843,1,2,23,0,2,1,-1,23,0,1,1,2,-.007482212036848068,-.7748216986656189,.00592863280326128,0,2,0,5,1,4,-1,0,6,1,2,2,-.0033365150447934866,-.3616085052490234,.0226737502962351,0,2,19,13,4,2,-1,19,14,4,1,2,-.0122549999505281,-.6580218076705933,.0043241591192781925,0,3,7,12,2,2,-1,7,12,1,1,2,8,13,1,1,2,-.0002502274001017213,.1368491053581238,-.0613101907074451,0,3,1,0,24,8,-1,13,0,12,4,2,1,4,12,4,2,.1189583986997604,.024467010051012,-.3081929087638855,0,2,2,4,3,3,-1,2,5,3,1,3,.0018534749979153275,-.0657177790999413,.1380506008863449,1,2,20,6,4,3,-1,19,7,4,1,3,-.0139663796871901,-.4281671941280365,.0166652500629425,1,2,5,6,3,4,-1,6,7,1,4,3,-.0120118902996182,-.4546675086021423,.0174813903868198,0,3,16,11,2,2,-1,17,11,1,1,2,16,12,1,1,2,.0008638032013550401,.0268306396901608,-.1949577033519745,0,3,7,11,2,2,-1,7,11,1,1,2,8,12,1,1,2,-.0005486354930326343,.172817200422287,-.0519250482320786,0,2,9,5,9,3,-1,12,5,3,3,3,.0356420204043388,.011997340247035,-.2636224925518036,0,2,0,0,6,1,-1,2,0,2,1,3,.009283074177801609,.0153813296929002,-.5276867151260376,0,2,17,4,8,1,-1,19,4,4,1,2,.003344479948282242,-.0448165088891983,.1556369960308075,0,2,7,5,9,3,-1,10,5,3,3,3,-.0348524898290634,-.6144651770591736,.014714409597218,0,2,17,4,8,1,-1,19,4,4,1,2,-.0036836538929492235,.0679996237158775,-.0403181910514832,0,2,0,4,8,1,-1,2,4,4,1,2,.002637067111209035,-.0527165904641151,.1650273054838181,0,3,16,11,2,2,-1,17,11,1,1,2,16,12,1,1,2,-.001140838023275137,-.1495666950941086,.0155292097479105,0,2,6,11,12,2,-1,9,11,6,2,2,-.005560464225709438,.1015162020921707,-.0783084183931351,0,2,4,6,20,9,-1,9,6,10,9,2,.031304020434618,-.0519621782004833,.1036399006843567,0,2,6,8,12,2,-1,6,9,12,1,2,.00929038506001234,-.0539887212216854,.1653061956167221,0,2,6,8,13,4,-1,6,9,13,2,2,-.0108930300921202,.1281013935804367,-.0734129622578621,0,2,2,13,4,2,-1,2,14,4,1,2,-.004919060971587896,-.3507530987262726,.0244891606271267,0,2,11,1,3,12,-1,11,4,3,6,2,.0811754167079926,.0209406390786171,-.3776533007621765,0,2,7,10,11,4,-1,7,11,11,2,2,-.007118931971490383,.1320966929197311,-.074379600584507,0,2,5,9,15,6,-1,5,11,15,2,3,.0290335901081562,-.0601534284651279,.1686525046825409,0,2,1,5,14,10,-1,1,10,14,5,2,.2666859030723572,.030215110629797,-.3336375057697296,0,3,13,10,2,2,-1,14,10,1,1,2,13,11,1,1,2,.001343771000392735,.0244619604200125,-.3497652113437653,0,2,0,0,4,2,-1,0,1,4,1,2,-6406597094610333e-20,.0681859701871872,-.1218236982822418,0,2,18,3,4,2,-1,18,4,4,1,2,-.0022273659706115723,.0591664388775826,-.0569609887897968,0,2,0,7,4,4,-1,0,8,4,2,2,.0001082283997675404,-.118367500603199,.0699028074741364,0,2,12,12,6,2,-1,14,12,2,2,3,.007776250131428242,.0182663407176733,-.3238837122917175,0,2,7,0,3,1,-1,8,0,1,1,3,-.0008562789880670607,.1596496999263763,-.0523401089012623,0,2,15,0,2,1,-1,15,0,1,1,2,.003980595152825117,.0056993248872458935,-.6384922862052917,0,2,8,0,2,1,-1,9,0,1,1,2,-.0004905238165520132,.1629474014043808,-.0742301419377327,0,2,18,3,2,10,-1,18,3,1,10,2,-.0184035003185272,-.6773443222045898,.010705940425396,0,3,7,1,2,2,-1,7,1,1,1,2,8,2,1,1,2,-.0008971457136794925,.1691973060369492,-.0477185398340225,0,2,18,0,7,3,-1,18,1,7,1,3,-.0167341101914644,-.3151237964630127,.0124420495703816,0,2,7,12,6,2,-1,9,12,2,2,3,-.0119769899174571,-.5293223857879639,.0144362701103091,0,2,20,7,4,3,-1,20,8,4,1,3,.007036808878183365,.0264915898442268,-.2470992058515549,0,2,5,3,2,10,-1,6,3,1,10,2,-.0105798998847604,-.4092808067798615,.0187591798603535,0,3,16,0,2,2,-1,17,0,1,1,2,16,1,1,1,2,.0006084999768063426,-.0334094502031803,.0843884497880936,0,3,7,0,2,2,-1,7,0,1,1,2,8,1,1,1,2,-.000594453071244061,.1412419974803925,-.0555582903325558,0,2,15,0,6,2,-1,17,0,2,2,3,-.0157594103366137,-.3833500146865845,.0156633593142033,0,2,0,0,1,4,-1,0,2,1,2,2,-.0101080304011703,-.3391439020633698,.0209970101714134,1,2,22,1,2,12,-1,18,5,2,4,3,.008824238553643227,.046882901340723,-.0345581099390984,1,2,4,0,12,3,-1,8,4,4,3,3,.1695280969142914,-.0297883804887533,.2978200018405914,0,3,14,13,2,2,-1,15,13,1,1,2,14,14,1,1,2,.0014175090473145247,.0145506802946329,-.2557711899280548,0,2,11,6,3,3,-1,12,7,1,1,9,-.006245535798370838,.1703144013881683,-.0457185097038746,0,2,15,1,10,8,-1,15,3,10,4,2,.08297199010849,-.0108856502920389,.2358570992946625,0,2,0,1,10,8,-1,0,3,10,4,2,-.036387961357832,.0720635578036308,-.1351491957902908,0,2,11,3,14,10,-1,11,8,14,5,2,.2605817019939423,.0307604894042015,-.208186000585556,0,3,0,0,24,12,-1,0,0,12,6,2,12,6,12,6,2,-.1837086975574493,-.4619984030723572,.0176900699734688,0,2,20,7,4,3,-1,20,8,4,1,3,-.00397269893437624,-.1660892963409424,.0209467206150293,0,2,0,1,7,3,-1,0,2,7,1,3,.0214559100568295,.0231478307396173,-.3625465929508209,0,2,20,7,4,3,-1,20,8,4,1,3,.0144318202510476,.004468928091228008,-.2445929050445557,0,2,0,7,1,8,-1,0,9,1,4,2,-.0033524229656904936,-.2480840981006622,.0316352993249893,1,2,22,4,3,4,-1,23,5,1,4,3,-.0156694706529379,.3172483146190643,-.0374899208545685,1,2,11,2,12,1,-1,15,6,4,1,3,-.0400774292647839,-.2589775919914246,.0327349714934826,1,2,22,4,3,4,-1,23,5,1,4,3,.0123612098395824,-.0450748614966869,.169064998626709,0,2,1,7,4,3,-1,1,8,4,1,3,.0109678898006678,.0187921095639467,-.4384852945804596,0,2,13,9,6,2,-1,15,9,2,2,3,-.0137434704229236,-.4609765112400055,.0122369602322578,0,3,6,7,2,2,-1,6,7,1,1,2,7,8,1,1,2,-.001032243948429823,.1648599952459335,-.0516587682068348,0,2,13,9,6,2,-1,15,9,2,2,3,.008831336162984371,.015935530886054,-.2015953958034515,0,2,4,0,6,2,-1,6,0,2,2,3,.0144206797704101,.0160773508250713,-.4641633033752441,0,2,13,9,6,2,-1,15,9,2,2,3,-.0018205989617854357,.0433134213089943,-.0280837193131447,1,2,7,7,2,6,-1,7,7,1,6,2,.003930467180907726,.0497011989355087,-.1514773964881897,0,2,24,0,1,10,-1,24,5,1,5,2,-.008321069180965424,-.1029928028583527,.0179813895374537,0,2,6,7,3,1,-1,7,7,1,1,3,-.0011277500307187438,.1659521013498306,-.0483443103730679,0,3,14,13,2,2,-1,15,13,1,1,2,14,14,1,1,2,-.000783850671723485,-.1946461051702499,.0250845197588205,0,2,8,7,4,1,-1,9,7,2,1,2,-.0008546434110030532,.1473073959350586,-.0529893897473812,1,2,24,4,1,9,-1,21,7,1,3,3,-.006144941784441471,.0951583385467529,-.0323545187711716,1,2,1,4,9,1,-1,4,7,3,1,3,.0537422299385071,-.0160139091312885,.5178387761116028,0,2,11,1,6,13,-1,13,1,2,13,3,-.009177369065582752,.0658730715513229,-.0286986008286476,0,2,10,2,4,7,-1,11,2,2,7,2,-.001626214012503624,.1165013015270233,-.0662005692720413,0,2,11,1,6,13,-1,13,1,2,13,3,-.0702467709779739,-.5561671257019043,.0033650770783424377,0,2,8,1,6,13,-1,10,1,2,13,3,-.045713048428297,-.5554363131523132,.0145238302648067,0,2,16,9,4,1,-1,16,9,2,1,2,-.0016252630157396197,.0774459466338158,-.0477535910904408,0,2,5,9,4,1,-1,7,9,2,1,2,-.00877845473587513,-.6660557985305786,.0114997997879982,1,2,17,4,1,9,-1,14,7,1,3,3,.0581780597567558,-.0126901902258396,.2431164979934692,0,3,7,4,2,2,-1,7,4,1,1,2,8,5,1,1,2,-.0010166700230911374,.1701835989952087,-.0434626787900925,0,3,13,9,2,2,-1,14,9,1,1,2,13,10,1,1,2,-.0008318690815940499,-.1554417014122009,.0277679692953825,0,3,7,11,2,2,-1,7,11,1,1,2,8,12,1,1,2,.0001063566014636308,-.0799610763788223,.0975525230169296,0,3,13,9,2,2,-1,14,9,1,1,2,13,10,1,1,2,.0007735859835520387,.0280197393149138,-.1640979051589966,0,2,6,13,10,1,-1,11,13,5,1,2,-.005128828808665276,.1435500979423523,-.0521811507642269,0,2,9,8,10,7,-1,9,8,5,7,2,-.0296237897127867,.1256711930036545,-.0727018266916275,0,2,4,5,15,10,-1,9,5,5,10,3,.0479203201830387,-.0627507865428925,.1496749967336655,0,2,20,6,5,4,-1,20,7,5,2,2,.0299077890813351,.0033279890194535255,-.5352283716201782,0,2,0,6,5,4,-1,0,7,5,2,2,-.00311031611636281,-.184633806347847,.0402609407901764,0,2,11,7,3,1,-1,12,7,1,1,3,.0011777599574998021,-.0421488806605339,.1833201944828033,0,2,9,4,7,3,-1,9,5,7,1,3,.0149721698835492,-.0501780100166798,.1479559987783432,0,2,15,4,4,3,-1,15,4,2,3,2,.022697489708662,.008885804563760757,-.3510260879993439,0,2,6,4,4,3,-1,8,4,2,3,2,.0128841297701001,.0346549116075039,-.2406193017959595,0,3,16,6,2,2,-1,17,6,1,1,2,16,7,1,1,2,-.0011240700259804726,.1314530968666077,-.0288430396467447,0,3,7,6,2,2,-1,7,6,1,1,2,8,7,1,1,2,-.0013627869775518775,.2013843953609467,-.0379555486142635,0,3,14,13,2,2,-1,15,13,1,1,2,14,14,1,1,2,.0005355795728974044,.0279592797160149,-.1196514964103699,1,2,6,0,4,2,-1,6,0,4,1,2,-.0152801796793938,-.4851869940757752,.0156223699450493,0,2,20,14,2,1,-1,20,14,1,1,2,4641250052372925e-20,-.0589389093220234,.0601089298725128,0,3,1,13,6,2,-1,1,13,3,1,2,4,14,3,1,2,965538783930242e-19,-.0965948700904846,.0779175236821175,0,2,12,1,2,2,-1,12,2,2,1,2,.0038991239853203297,-.0261822007596493,.1902385950088501,0,3,8,0,8,8,-1,8,0,4,4,2,12,4,4,4,2,.0237854700535536,.0403596796095371,-.1793317049741745,0,3,16,12,2,2,-1,17,12,1,1,2,16,13,1,1,2,5911722837481648e-20,-.0676945373415947,.0789666101336479,0,3,0,4,8,8,-1,0,4,4,4,2,4,8,4,4,2,.0585355199873447,-.0279133208096027,.2635962069034576,0,2,19,4,2,1,-1,19,4,1,1,2,-.006712567061185837,-.8246011137962341,.0036960430443286896,0,2,4,4,2,1,-1,5,4,1,1,2,-.0046747662127017975,-.7625464797019958,.009274384006857872,0,3,20,0,2,2,-1,21,0,1,1,2,20,1,1,1,2,.005398152861744165,.0019147379789501429,-.8057739734649658,0,2,0,5,15,3,-1,0,6,15,1,3,.007725214120000601,-.0822006091475487,.0925986021757126,0,2,13,5,1,3,-1,13,6,1,1,3,-.001167214009910822,.1147938966751099,-.0459650196135044,1,2,4,9,3,2,-1,5,10,1,2,3,-.007402225863188505,-.4262216091156006,.0174518898129463,0,3,20,0,2,2,-1,21,0,1,1,2,20,1,1,1,2,6543080235132948e-20,-.0445476993918419,.0498182512819767,0,3,3,0,2,2,-1,3,0,1,1,2,4,1,1,1,2,463534306618385e-19,-.082009993493557,.0922331288456917,-1.254032015800476,218,0,3,0,11,12,4,-1,0,11,6,2,2,6,13,6,2,2,.0105607798323035,-.1728546023368835,.2072951048612595,0,2,17,1,8,4,-1,17,3,8,2,2,-.038237389177084,.1771112978458405,-.1585303992033005,0,2,6,6,13,6,-1,6,8,13,2,3,-.0541206710040569,.2564443051815033,-.0884335711598396,0,2,23,4,2,3,-1,23,4,1,3,2,-.002200446091592312,.2010346055030823,-.1101640984416008,0,2,2,13,10,2,-1,2,14,10,1,2,.0654388666152954,.0007821313920430839,-4350.8232421875,0,2,23,4,2,3,-1,23,4,1,3,2,-.0135645801201463,-.5407810807228088,.004865359049290419,0,2,0,4,2,3,-1,1,4,1,3,2,-.0018708320567384362,.1633561998605728,-.1228590980172157,0,2,2,7,21,3,-1,9,8,7,1,9,.1699268966913223,-.004541059955954552,.4810850024223328,1,2,2,11,2,2,-1,2,11,1,2,2,.003598150098696351,.0356757305562496,-.4236158132553101,0,2,2,2,21,6,-1,9,4,7,2,9,.5448976159095764,-.0198735594749451,.5460472106933594,0,2,1,1,8,6,-1,1,3,8,2,3,-.0627753064036369,.1722137033939362,-.1143800020217896,0,2,6,4,15,4,-1,6,5,15,2,2,-.0459444113075733,.2595784068107605,-.0732216089963913,1,2,2,10,4,1,-1,3,11,2,1,2,.002180942101404071,.0495434813201427,-.3175086975097656,0,2,4,14,18,1,-1,4,14,9,1,2,-.00965660810470581,.1581763029098511,-.0890468433499336,0,3,0,3,24,10,-1,0,3,12,5,2,12,8,12,5,2,.080804243683815,.0503276288509369,-.2887117862701416,0,3,15,3,10,12,-1,20,3,5,6,2,15,9,5,6,2,.0987789332866669,-.0381883382797241,.3119831085205078,0,2,9,5,6,3,-1,9,6,6,1,3,.008411401882767677,-.0949936509132385,.1344850063323975,0,2,2,13,21,1,-1,9,13,7,1,3,-.0147700998932123,.1715719997882843,-.0750405564904213,0,3,0,3,10,12,-1,0,3,5,6,2,5,9,5,6,2,.105756402015686,-.0440231785178185,.3495194017887116,0,2,5,3,15,4,-1,5,4,15,2,2,.0401043891906738,-.0572791509330273,.2763915061950684,0,2,8,6,9,3,-1,8,7,9,1,3,.0135993398725986,-.0886402428150177,.1596630066633225,0,2,14,13,3,1,-1,15,13,1,1,3,-.003337878966704011,-.499087005853653,.007176036946475506,0,2,7,1,10,2,-1,7,2,10,1,2,.006549019832164049,-.0597806982696056,.2110590040683746,0,2,14,13,3,1,-1,15,13,1,1,3,-6275867053773254e-20,.0655476525425911,-.0541992485523224,0,2,8,13,3,1,-1,9,13,1,1,3,.000908895512111485,.042570099234581,-.2828716039657593,0,3,1,0,24,12,-1,13,0,12,6,2,1,6,12,6,2,.0881031826138496,.0406627096235752,-.298372894525528,0,2,0,0,13,14,-1,0,7,13,7,2,-.1351538002490997,-.4011076092720032,.025998929515481,1,2,21,6,3,3,-1,20,7,3,1,3,.0105496803298593,.0265602301806211,-.3554666042327881,0,2,8,9,8,4,-1,8,10,8,2,2,-.0109745198860765,.1540209054946899,-.0715849623084068,0,2,13,10,6,4,-1,15,10,2,4,3,-.01281054969877,-.2680475115776062,.0205432493239641,1,2,11,3,4,4,-1,11,3,2,4,2,-.067375123500824,-.5299177169799805,.0192500203847885,0,2,13,10,6,4,-1,15,10,2,4,3,.0133285904303193,.0141924796625972,-.2692896127700806,0,2,7,10,10,4,-1,7,12,10,2,2,-.034924790263176,.2877762019634247,-.0366922505199909,0,2,13,10,6,4,-1,15,10,2,4,3,-.0259607005864382,-.5250588059425354,.004201324190944433,0,2,6,10,6,4,-1,8,10,2,4,3,-.0144326100125909,-.4404621124267578,.0239412691444159,0,2,21,14,4,1,-1,21,14,2,1,2,.0010242980206385255,-.0813294127583504,.1090075969696045,0,2,0,7,4,4,-1,0,8,4,2,2,-.0033913699444383383,-.2744260132312775,.0353980511426926,0,3,19,3,6,12,-1,22,3,3,6,2,19,9,3,6,2,-.0254591107368469,.1884281933307648,-.0505212917923927,0,2,5,1,15,2,-1,5,2,15,1,2,-.0250639300793409,.1583306044340134,-.067982017993927,0,2,19,1,3,4,-1,19,2,3,2,2,.00457573588937521,-.0512838996946812,.114658497273922,0,2,2,5,20,4,-1,12,5,10,4,2,-.1538352966308594,.42741459608078,-.0233538504689932,0,2,21,14,4,1,-1,21,14,2,1,2,.00674419803544879,.0116364201530814,-.1990616023540497,0,2,0,14,4,1,-1,2,14,2,1,2,.0004985763225704432,-.1112217977643013,.0913273170590401,0,3,19,3,6,12,-1,22,3,3,6,2,19,9,3,6,2,.0416502095758915,-.0342307090759277,.1340909004211426,0,3,0,3,6,12,-1,0,3,3,6,2,3,9,3,6,2,-.0486865788698196,.3840608894824982,-.0367092713713646,0,2,19,1,3,4,-1,19,2,3,2,2,-.0142661100253463,.1904101967811585,-.0373262614011765,0,2,3,1,3,4,-1,3,2,3,2,2,.002073825104162097,-.0940800234675407,.1367546021938324,0,2,10,1,10,2,-1,10,1,5,2,2,-.0127805396914482,.0790209397673607,-.0321417711675167,0,2,5,0,8,3,-1,9,0,4,3,2,.008742088451981544,-.0805833786725998,.1433219015598297,1,2,21,0,2,1,-1,21,0,1,1,2,6978053716011345e-20,-.1539752036333084,.0694082602858543,1,2,2,8,4,2,-1,3,9,2,2,2,-.007998161017894745,-.4497911930084229,.0232297703623772,1,2,21,0,2,1,-1,21,0,1,1,2,.005380451213568449,.0246548391878605,-.1725358963012695,0,2,2,0,21,1,-1,9,0,7,1,3,-.0200069397687912,.165263906121254,-.0625987574458122,1,2,21,0,2,1,-1,21,0,1,1,2,-.004465640988200903,-.3730463087558746,.0105512700974941,1,2,4,0,1,2,-1,4,0,1,1,2,-.0031919090542942286,-.4411549866199493,.0209588091820478,0,3,1,11,24,4,-1,13,11,12,2,2,1,13,12,2,2,-.0622704289853573,-.5413467884063721,.0132205402478576,0,3,0,11,24,4,-1,0,11,12,2,2,12,13,12,2,2,-.044956348836422,-.4331294000148773,.0206683203577995,0,3,16,5,2,2,-1,17,5,1,1,2,16,6,1,1,2,.0011595709947869182,-.0236924402415752,.1087998002767563,0,3,7,5,2,2,-1,7,5,1,1,2,8,6,1,1,2,-.0008840562077239156,.1649617999792099,-.0524947308003902,0,2,18,1,6,2,-1,18,1,3,2,2,.0266917701810598,.0148458201438189,-.5571644902229309,0,2,2,0,21,2,-1,9,0,7,2,3,.0182767305523157,-.066286213696003,.1257701069116592,0,2,13,0,10,15,-1,13,0,5,15,2,-.0809113383293152,.1131376996636391,-.049807820469141,0,2,6,0,13,4,-1,6,1,13,2,2,-.036403700709343,.2336605936288834,-.0383339710533619,0,2,11,3,9,3,-1,11,4,9,1,3,-.0139478798955679,.0991646125912666,-.0678260922431946,1,2,3,2,10,3,-1,2,3,10,1,3,-.0224205106496811,.1904506981372833,-.0484246909618378,0,2,6,6,16,8,-1,6,6,8,8,2,.0995163321495056,-.0482200607657433,.2056124061346054,0,2,5,0,12,15,-1,8,0,6,15,2,.1495629996061325,.0141723398119211,-.6450886726379395,0,2,23,8,2,4,-1,23,8,1,4,2,.0009669344290159643,-.0378436110913754,.0635498985648155,0,2,0,5,3,3,-1,0,6,3,1,3,.0120417503640056,.018035089597106,-.4774137139320374,0,2,21,5,4,2,-1,22,5,2,2,2,.0023097700905054808,-.0415334291756153,.1302794069051743,0,2,0,5,4,2,-1,1,5,2,2,2,.002201986964792013,-.0514689311385155,.1736146062612534,1,2,21,2,3,4,-1,22,3,1,4,3,.0272558908909559,-.0153390001505613,.3625235855579376,1,2,4,2,4,3,-1,3,3,4,1,3,.008874750696122646,-.0426916293799877,.2076780050992966,1,2,23,2,2,2,-1,23,2,2,1,2,.0047241621650755405,-.0500567816197872,.087361179292202,0,2,0,5,4,4,-1,0,6,4,2,2,7316731353057548e-20,-.1244131028652191,.0726777836680412,0,2,23,7,2,5,-1,23,7,1,5,2,-.001263994025066495,.0776199027895927,-.0404986217617989,0,2,0,0,1,4,-1,0,1,1,2,2,.003690955927595496,.0311388503760099,-.3086219131946564,0,2,23,1,2,4,-1,23,3,2,2,2,-.028352240100503,-.3550184071063995,.0135328602045774,0,2,0,1,2,4,-1,0,3,2,2,2,-.0009666720288805664,.0676028430461884,-.1432974934577942,0,2,19,3,5,4,-1,19,4,5,2,2,-.0587403103709221,-.5506312847137451,.0042741261422634125,1,2,12,1,6,2,-1,12,1,6,1,2,-.0272757392376661,-.6493160724639893,.012534529902041,0,2,19,11,6,4,-1,19,12,6,2,2,-.0117558799684048,-.5648565292358398,.0137637602165341,0,2,1,3,6,4,-1,1,4,6,2,2,.007592375855892897,-.0431140698492527,.200558602809906,1,2,23,0,2,1,-1,23,0,1,1,2,-.0007197940140031278,-.1374174952507019,.0340671092271805,1,2,2,0,1,2,-1,2,0,1,1,2,.004119044169783592,.0367105789482594,-.2477497011423111,0,2,19,0,4,2,-1,20,0,2,2,2,.007544305175542831,.007234477903693914,-.4473736882209778,0,3,0,0,2,12,-1,0,0,1,6,2,1,6,1,6,2,-.005235828924924135,.2173164039850235,-.0386803299188614,0,3,22,4,2,8,-1,23,4,1,4,2,22,8,1,4,2,.0007468659896403551,-.0371707193553448,.0385193713009357,0,3,1,4,2,8,-1,1,4,1,4,2,2,8,1,4,2,.0008846849086694419,-.1020980030298233,.0926149412989616,0,2,17,9,4,1,-1,17,9,2,1,2,-.0011738609755411744,.110879197716713,-.0856960415840149,1,2,12,2,5,8,-1,10,4,5,4,2,-.0989599674940109,-.4499149918556213,.0212421305477619,0,3,18,13,2,2,-1,19,13,1,1,2,18,14,1,1,2,.0008824847172945738,.0228975899517536,-.1995048969984055,0,2,6,9,13,6,-1,6,11,13,2,3,-.0413776896893978,.1549389958381653,-.0591393709182739,0,2,6,10,13,4,-1,6,11,13,2,2,.00679467897862196,-.0783610120415688,.1739570051431656,0,3,0,8,24,4,-1,0,8,12,2,2,12,10,12,2,2,.0447585098445416,.0260890107601881,-.3311159014701843,0,2,17,10,8,3,-1,17,11,8,1,3,.0029978479724377394,.0459281504154205,-.1491470038890839,0,3,4,0,16,8,-1,4,0,8,4,2,12,4,8,4,2,-.059589359909296,-.2485350966453552,.032523650676012,0,2,14,0,1,2,-1,14,1,1,1,2,.0009419932030141354,-.0425546802580357,.1344856023788452,0,2,3,9,6,6,-1,5,9,2,6,3,-.0239475108683109,-.4583190977573395,.0178181305527687,0,2,13,10,12,3,-1,16,10,6,3,2,.007446235977113247,-.0423585288226604,.0580310709774494,0,2,0,10,12,3,-1,3,10,6,3,2,-.0129095697775483,.197303906083107,-.0445232689380646,0,2,19,8,5,3,-1,19,9,5,1,3,.0028930921107530594,.0428810603916645,-.1371746063232422,0,2,7,1,3,1,-1,8,1,1,1,3,-.0006818625843152404,.1337869018316269,-.0565496906638145,0,2,15,1,3,1,-1,16,1,1,1,3,.0009088438237085938,-.0361675098538399,.1220118999481201,0,2,7,1,3,1,-1,8,1,1,1,3,.0004230542981531471,-.0695094764232636,.1302513927221298,0,2,20,8,2,3,-1,20,9,2,1,3,-.0016460029873996973,-.1300535947084427,.032738208770752,0,2,2,0,4,2,-1,3,0,2,2,2,.007249381858855486,.0122888395562768,-.6227869987487793,0,2,19,8,5,3,-1,19,9,5,1,3,.007820780389010906,.007436948828399181,-.1486981958150864,0,2,4,1,6,11,-1,6,1,2,11,3,.0359272807836533,.0188675802201033,-.3921496868133545,0,2,16,9,2,1,-1,16,9,1,1,2,-6161881174193695e-20,.0568877793848515,-.0677392184734344,0,2,5,2,15,4,-1,5,3,15,2,2,.0374080687761307,-.038547120988369,.2218790054321289,0,2,11,2,3,3,-1,11,3,3,1,3,-.005215566139668226,.1363334953784943,-.0673948600888252,0,2,2,7,18,6,-1,11,7,9,6,2,-.0935681909322739,.1743745058774948,-.0487747117877007,0,2,1,6,24,9,-1,7,6,12,9,2,.076228141784668,-.0574758499860764,.1471180021762848,0,2,0,0,1,10,-1,0,5,1,5,2,-.0200377702713013,-.4157789945602417,.0179230198264122,0,2,9,3,10,2,-1,9,4,10,1,2,-.0118243796750903,.1144623011350632,-.0700482204556465,0,2,12,6,1,3,-1,12,7,1,1,3,-.0016057320171967149,.1678820997476578,-.0499466583132744,0,2,16,9,2,1,-1,16,9,1,1,2,-.002551743993535638,-.3828516900539398,.011361270211637,0,2,7,9,2,1,-1,8,9,1,1,2,-9951562969945371e-20,.0925496816635132,-.0903496667742729,0,3,16,7,6,6,-1,19,7,3,3,2,16,10,3,3,2,-.0167104993015528,.1787143051624298,-.0413177497684956,0,3,10,10,2,2,-1,10,10,1,1,2,11,11,1,1,2,-.0009668730199337006,-.2522006928920746,.0305528100579977,0,3,16,9,2,2,-1,17,9,1,1,2,16,10,1,1,2,-6082893014536239e-20,.0542593784630299,-.0474381409585476,0,3,7,9,2,2,-1,7,9,1,1,2,8,10,1,1,2,-.0008633537217974663,.1779994070529938,-.0423120781779289,0,3,13,10,2,2,-1,14,10,1,1,2,13,11,1,1,2,-.0008921846165321767,-.1845878958702087,.0251416098326445,0,2,11,7,2,3,-1,11,8,2,1,3,-.003487017937004566,.1677664965391159,-.0460440590977669,0,2,19,0,6,3,-1,19,1,6,1,3,.0195988900959492,.0180558506399393,-.3022567927837372,0,2,0,0,6,3,-1,0,1,6,1,3,-.0109872100874782,-.3727653026580811,.0197681505233049,0,2,24,0,1,2,-1,24,1,1,1,2,-6639063940383494e-20,.0768569633364677,-.1268360018730164,0,2,0,0,16,1,-1,4,0,8,1,2,-.004260623827576637,.1132820025086403,-.0696604028344154,0,2,19,11,6,4,-1,19,12,6,2,2,.007314716000109911,.0329976715147495,-.2646273076534271,0,2,0,11,6,4,-1,0,12,6,2,2,-.0101194800809026,-.470618486404419,.0138464700430632,0,2,5,3,15,6,-1,5,6,15,3,2,.0921443328261375,-.0886306688189507,.0808285027742386,0,2,8,3,9,3,-1,8,4,9,1,3,.0118425898253918,-.0542713403701782,.1590622961521149,0,2,12,0,1,12,-1,12,3,1,6,2,.0260604508221149,.0202190801501274,-.3709642887115479,0,2,1,3,14,8,-1,1,7,14,4,2,.2863250076770783,.0171639006584883,-.3946934938430786,0,2,15,0,6,4,-1,17,0,2,4,3,-.019337460398674,-.2173891961574554,.0148878796026111,0,3,3,7,4,2,-1,3,7,2,1,2,5,8,2,1,2,.0006899603758938611,-.0642509534955025,.1074123978614807,0,2,14,5,1,8,-1,14,9,1,4,2,.0273154806345701,.005089373793452978,-.5541477799415588,0,2,0,7,3,3,-1,0,8,3,1,3,-.007314932066947222,-.5788456201553345,.0114226602017879,0,2,11,12,6,3,-1,13,12,2,3,3,.0134929800406098,.0069531891494989395,-.3359794020652771,0,2,8,12,6,3,-1,10,12,2,3,3,.0170349292457104,.009658707305788994,-.6638085842132568,0,3,16,5,6,10,-1,19,5,3,5,2,16,10,3,5,2,-.0495363213121891,-.1099594011902809,.007144455797970295,0,3,3,5,6,10,-1,3,5,3,5,2,6,10,3,5,2,-.0326232202351093,.188817098736763,-.0416569598019123,0,2,17,8,8,1,-1,19,8,4,1,2,.0025752598885446787,-.0510260090231895,.1057118028402329,0,2,0,8,8,1,-1,2,8,4,1,2,.0024968909565359354,-.0559858083724976,.1347001940011978,0,2,9,13,14,2,-1,9,13,7,2,2,-.0116916997358203,.0694792568683624,-.0498108491301537,0,2,1,14,20,1,-1,6,14,10,1,2,.005096627864986658,-.0719841867685318,.120134100317955,0,3,17,7,2,2,-1,18,7,1,1,2,17,8,1,1,2,.0008642909815534949,-.0280915908515453,.110590897500515,0,2,0,8,2,2,-1,0,9,2,1,2,-.0030658349860459566,-.4070394039154053,.0187105592340231,0,3,17,7,2,2,-1,18,7,1,1,2,17,8,1,1,2,-55272910685744137e-21,.0707912817597389,-.0700317397713661,0,3,6,7,2,2,-1,6,7,1,1,2,7,8,1,1,2,.0006569849792867899,-.0492957085371017,.154824897646904,0,3,13,10,2,2,-1,14,10,1,1,2,13,11,1,1,2,.0005370734143070877,.0302961803972721,-.1238510981202126,0,2,4,0,6,4,-1,6,0,2,4,3,-.027268910780549,-.4674024879932404,.0149874398484826,0,2,10,0,6,2,-1,12,0,2,2,3,-.002613895107060671,.116668201982975,-.0615368783473969,0,2,8,1,8,3,-1,10,1,4,3,2,-.027707589790225,-.6434546709060669,.0120052499696612,1,2,14,6,7,2,-1,14,6,7,1,2,-.0200542695820332,-.3493579030036926,.0109763201326132,0,2,8,10,4,1,-1,9,10,2,1,2,.0006917031714692712,.0442647784948349,-.1491888016462326,0,3,16,11,2,2,-1,17,11,1,1,2,16,12,1,1,2,6456066330429167e-20,-.0422041602432728,.0473436005413532,0,3,7,11,2,2,-1,7,11,1,1,2,8,12,1,1,2,-8837810310069472e-20,.1016054973006249,-.0740641728043556,0,3,16,11,2,2,-1,17,11,1,1,2,16,12,1,1,2,-661065278109163e-19,.0759406536817551,-.0495208092033863,0,3,7,11,2,2,-1,7,11,1,1,2,8,12,1,1,2,.00042288508848287165,-.0588600113987923,.1385688036680222,0,2,17,9,4,1,-1,17,9,2,1,2,.0025251980405300856,-.0302844792604446,.1643659025430679,0,2,4,9,4,1,-1,6,9,2,1,2,-.009034793823957443,-.6502289175987244,.0117079298943281,0,2,11,8,3,4,-1,11,9,3,2,2,-.0042698681354522705,.1213309019804001,-.0608336813747883,1,2,9,6,3,2,-1,10,7,1,2,3,.0166539791971445,.0145571101456881,-.5031678080558777,1,2,21,0,4,8,-1,19,2,4,4,2,-.1178558021783829,-.3486539125442505,.005829961039125919,1,2,4,0,8,4,-1,6,2,4,4,2,-.0389890410006046,.1082129999995232,-.0824354067444801,1,2,20,1,5,2,-1,20,1,5,1,2,-.006974487099796534,.0920993909239769,-.0447417609393597,0,2,0,6,6,4,-1,0,7,6,2,2,.0154374102130532,.029481740668416,-.2408691942691803,0,2,20,6,5,4,-1,20,7,5,2,2,-.005959998816251755,-.2254153043031693,.025642080232501,0,2,6,8,3,1,-1,7,8,1,1,3,-.0005335814203135669,.1183808967471123,-.0571242086589336,0,3,1,8,24,2,-1,13,8,12,1,2,1,9,12,1,2,.0176937691867352,.0266077890992165,-.3055857121944428,0,2,8,8,8,3,-1,8,9,8,1,3,.005359944887459278,-.0569497905671597,.1210888996720314,0,2,17,11,6,4,-1,19,11,2,4,3,.0158548094332218,.0215572193264961,-.2521420121192932,0,2,0,0,18,1,-1,9,0,9,1,2,.0549633502960205,.0106362197548151,-.5730599761009216,1,2,14,6,3,2,-1,15,7,1,2,3,-.0037383600138127804,.077441543340683,-.0306048095226288,0,2,5,6,13,2,-1,5,7,13,1,2,.0182623900473118,-.0549028292298317,.1176588013768196,1,2,14,6,3,2,-1,15,7,1,2,3,-.0318278707563877,-.9110031723976135,.0013938200427219272,0,2,10,6,2,6,-1,10,8,2,2,3,-.00364661798812449,.1085240989923477,-.0722526162862778,1,2,20,1,5,2,-1,20,1,5,1,2,-.0517431795597076,-.9186943173408508,.001879784045740962,1,2,5,1,2,5,-1,5,1,1,5,2,-.009044954553246498,.1787680983543396,-.038844209164381,0,2,24,7,1,8,-1,24,9,1,4,2,-.004534022882580757,-.2472573071718216,.029726779088378,0,2,7,7,11,3,-1,7,8,11,1,3,.006873410195112228,-.0675214827060699,.1065412983298302,0,3,13,11,2,2,-1,14,11,1,1,2,13,12,1,1,2,.0007732778904028237,.022192569449544,-.1398307979106903,0,2,10,11,3,1,-1,11,11,1,1,3,-8525294106220827e-20,.0903024971485138,-.0786189734935761,0,2,24,7,1,8,-1,24,9,1,4,2,.0048931739293038845,.0311242006719112,-.1617130041122437,1,2,10,5,2,4,-1,10,5,2,2,2,-.0357618294656277,-.3406237065792084,.0201859101653099,1,2,22,1,2,3,-1,21,2,2,1,3,-.0110698901116848,.1165141984820366,-.0340334698557854,1,2,3,1,3,2,-1,4,2,1,2,3,.0034201510716229677,-.0530161187052727,.1339436024427414,0,2,16,4,3,3,-1,17,5,1,1,9,-.049969270825386,-.8493295907974243,.002754738088697195,1,2,3,0,3,2,-1,3,0,3,1,2,-.0011221430031582713,-.1629413068294525,.0413381010293961,0,2,17,0,8,3,-1,17,0,4,3,2,.0371481291949749,.0171750299632549,-.2840433120727539,0,2,0,12,4,3,-1,0,13,4,1,3,.00238473410718143,.0348382107913494,-.1844726949930191,0,2,2,3,21,3,-1,9,3,7,3,3,.1431124955415726,.0252217296510935,-.2543725967407227,1,2,8,1,2,5,-1,8,1,1,5,2,-.0119188595563173,.1655784994363785,-.0447442717850208,0,3,19,7,6,4,-1,22,7,3,2,2,19,9,3,2,2,.006477945018559694,-.0250237993896008,.0799132883548737,0,3,0,7,6,4,-1,0,7,3,2,2,3,9,3,2,2,.0014581739669665694,-.0797923728823662,.0829188674688339,0,2,24,4,1,4,-1,24,5,1,2,2,.0062418850138783455,.013290929608047,-.2995111048221588,1,2,4,7,3,4,-1,3,8,3,2,2,-.0227145906537771,.4398984909057617,-.0150371296331286,0,2,17,9,4,1,-1,18,9,2,1,2,-.0043001482263207436,-.3546585142612457,.007952126674354076,0,2,4,9,4,1,-1,5,9,2,1,2,.0010604769922792912,.0385937690734863,-.1762923002243042,0,2,23,6,2,2,-1,23,7,2,1,2,.0043205441907048225,.0171245392411947,-.1075016036629677,0,2,0,6,2,2,-1,0,7,2,1,2,-.0038217399269342422,-.4589209854602814,.0141258295625448,0,2,12,0,3,1,-1,13,0,1,1,3,.0009733684710226953,-.0361551195383072,.1268056929111481,0,3,1,7,2,2,-1,1,7,1,1,2,2,8,1,1,2,-.0007908184779807925,.1707147061824799,-.0376146212220192,0,3,22,7,2,2,-1,23,7,1,1,2,22,8,1,1,2,-.0007615988724865019,.2311398983001709,-.0603629797697067,0,2,2,11,6,4,-1,4,11,2,4,3,-.0210315398871899,-.4918564856052399,.0156012997031212,0,3,14,1,10,4,-1,19,1,5,2,2,14,3,5,2,2,.0180973205715418,-.0467358492314816,.1050693020224571,0,2,6,2,12,2,-1,6,3,12,1,2,-.0131208598613739,.1018344014883041,-.0857265591621399,0,2,9,6,8,9,-1,9,9,8,3,3,.2012819051742554,-.009487469680607319,.5418189764022827,0,2,3,8,3,3,-1,4,9,1,1,9,.007332609035074711,.0282447207719088,-.2452981024980545,0,3,22,7,2,2,-1,23,7,1,1,2,22,8,1,1,2,.0009054064285010099,-.0559650883078575,.2322594970464706,0,3,11,10,2,2,-1,11,10,1,1,2,12,11,1,1,2,.0005353200249373913,.0432194508612156,-.1652047038078308,0,3,22,7,2,2,-1,23,7,1,1,2,22,8,1,1,2,-802397116785869e-19,.0588538907468319,-.0475415214896202,0,2,4,13,10,1,-1,9,13,5,1,2,.004840339999645948,-.0541158504784107,.1303326934576035,0,2,3,0,20,15,-1,3,0,10,15,2,.6619219779968262,-.0147952698171139,.5785722732543945,0,2,0,13,24,1,-1,6,13,12,1,2,-.008544123731553555,.1165743991732597,-.0628988370299339,0,3,22,7,2,2,-1,23,7,1,1,2,22,8,1,1,2,54021849791752174e-21,-.0602008998394012,.0699716731905937]);

; browserify_shim__define__module__export__(typeof mouth != "undefined" ? mouth : window.mouth);

}).call(global, undefined, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],6:[function(require,module,exports){
(function (global){
;__browserify_shim_require__=require;(function browserifyShim(module, exports, require, define, browserify_shim__define__module__export__) {
/**
 * tracking.js - A modern approach for Computer Vision on the web.
 * @author Eduardo Lundgren <edu@rdo.io>
 * @version v1.0.0
 * @link http://trackingjs.com
 * @license BSD
 */
(function(window, undefined) {
  window.tracking = window.tracking || {};

  /**
   * Inherit the prototype methods from one constructor into another.
   *
   * Usage:
   * <pre>
   * function ParentClass(a, b) { }
   * ParentClass.prototype.foo = function(a) { }
   *
   * function ChildClass(a, b, c) {
   *   tracking.base(this, a, b);
   * }
   * tracking.inherits(ChildClass, ParentClass);
   *
   * var child = new ChildClass('a', 'b', 'c');
   * child.foo();
   * </pre>
   *
   * @param {Function} childCtor Child class.
   * @param {Function} parentCtor Parent class.
   */
  tracking.inherits = function(childCtor, parentCtor) {
    function TempCtor() {
    }
    TempCtor.prototype = parentCtor.prototype;
    childCtor.superClass_ = parentCtor.prototype;
    childCtor.prototype = new TempCtor();
    childCtor.prototype.constructor = childCtor;

    /**
     * Calls superclass constructor/method.
     *
     * This function is only available if you use tracking.inherits to express
     * inheritance relationships between classes.
     *
     * @param {!object} me Should always be "this".
     * @param {string} methodName The method name to call. Calling superclass
     *     constructor can be done with the special string 'constructor'.
     * @param {...*} var_args The arguments to pass to superclass
     *     method/constructor.
     * @return {*} The return value of the superclass method/constructor.
     */
    childCtor.base = function(me, methodName) {
      var args = Array.prototype.slice.call(arguments, 2);
      return parentCtor.prototype[methodName].apply(me, args);
    };
  };

  /**
   * Captures the user camera when tracking a video element and set its source
   * to the camera stream.
   * @param {HTMLVideoElement} element Canvas element to track.
   * @param {object} opt_options Optional configuration to the tracker.
   */
  tracking.initUserMedia_ = function(element, opt_options) {
    window.navigator.getUserMedia({
      video: true,
      audio: opt_options.audio
    }, function(stream) {
        try {
          element.src = window.URL.createObjectURL(stream);
        } catch (err) {
          element.src = stream;
        }
      }, function() {
        throw Error('Cannot capture user camera.');
      }
    );
  };

  /**
   * Tests whether the object is a dom node.
   * @param {object} o Object to be tested.
   * @return {boolean} True if the object is a dom node.
   */
  tracking.isNode = function(o) {
    return o.nodeType || this.isWindow(o);
  };

  /**
   * Tests whether the object is the `window` object.
   * @param {object} o Object to be tested.
   * @return {boolean} True if the object is the `window` object.
   */
  tracking.isWindow = function(o) {
    return !!(o && o.alert && o.document);
  };

  /**
   * Selects a dom node from a CSS3 selector using `document.querySelector`.
   * @param {string} selector
   * @param {object} opt_element The root element for the query. When not
   *     specified `document` is used as root element.
   * @return {HTMLElement} The first dom element that matches to the selector.
   *     If not found, returns `null`.
   */
  tracking.one = function(selector, opt_element) {
    if (this.isNode(selector)) {
      return selector;
    }
    return (opt_element || document).querySelector(selector);
  };

  /**
   * Tracks a canvas, image or video element based on the specified `tracker`
   * instance. This method extract the pixel information of the input element
   * to pass to the `tracker` instance. When tracking a video, the
   * `tracker.track(pixels, width, height)` will be in a
   * `requestAnimationFrame` loop in order to track all video frames.
   *
   * Example:
   * var tracker = new tracking.ColorTracker();
   *
   * tracking.track('#video', tracker);
   * or
   * tracking.track('#video', tracker, { camera: true });
   *
   * tracker.on('track', function(event) {
   *   // console.log(event.data[0].x, event.data[0].y)
   * });
   *
   * @param {HTMLElement} element The element to track, canvas, image or
   *     video.
   * @param {tracking.Tracker} tracker The tracker instance used to track the
   *     element.
   * @param {object} opt_options Optional configuration to the tracker.
   */
  tracking.track = function(element, tracker, opt_options) {
    element = tracking.one(element);
    if (!element) {
      throw new Error('Element not found, try a different element or selector.');
    }
    if (!tracker) {
      throw new Error('Tracker not specified, try `tracking.track(element, new tracking.FaceTracker())`.');
    }

    switch (element.nodeName.toLowerCase()) {
      case 'canvas':
        return this.trackCanvas_(element, tracker, opt_options);
      case 'img':
        return this.trackImg_(element, tracker, opt_options);
      case 'video':
        if (opt_options) {
          if (opt_options.camera) {
            this.initUserMedia_(element, opt_options);
          }
        }
        return this.trackVideo_(element, tracker, opt_options);
      default:
        throw new Error('Element not supported, try in a canvas, img, or video.');
    }
  };

  /**
   * Tracks a canvas element based on the specified `tracker` instance and
   * returns a `TrackerTask` for this track.
   * @param {HTMLCanvasElement} element Canvas element to track.
   * @param {tracking.Tracker} tracker The tracker instance used to track the
   *     element.
   * @param {object} opt_options Optional configuration to the tracker.
   * @return {tracking.TrackerTask}
   * @private
   */
  tracking.trackCanvas_ = function(element, tracker) {
    var self = this;
    var task = new tracking.TrackerTask(tracker);
    task.on('run', function() {
      self.trackCanvasInternal_(element, tracker);
    });
    return task.run();
  };

  /**
   * Tracks a canvas element based on the specified `tracker` instance. This
   * method extract the pixel information of the input element to pass to the
   * `tracker` instance.
   * @param {HTMLCanvasElement} element Canvas element to track.
   * @param {tracking.Tracker} tracker The tracker instance used to track the
   *     element.
   * @param {object} opt_options Optional configuration to the tracker.
   * @private
   */
  tracking.trackCanvasInternal_ = function(element, tracker) {
    var width = element.width;
    var height = element.height;
    var context = element.getContext('2d');
    var imageData = context.getImageData(0, 0, width, height);
    tracker.track(imageData.data, width, height);
  };

  /**
   * Tracks a image element based on the specified `tracker` instance. This
   * method extract the pixel information of the input element to pass to the
   * `tracker` instance.
   * @param {HTMLImageElement} element Canvas element to track.
   * @param {tracking.Tracker} tracker The tracker instance used to track the
   *     element.
   * @param {object} opt_options Optional configuration to the tracker.
   * @private
   */
  tracking.trackImg_ = function(element, tracker) {
    var width = element.width;
    var height = element.height;
    var canvas = document.createElement('canvas');

    canvas.width = width;
    canvas.height = height;

    var task = new tracking.TrackerTask(tracker);
    task.on('run', function() {
      tracking.Canvas.loadImage(canvas, element.src, 0, 0, width, height, function() {
        tracking.trackCanvasInternal_(canvas, tracker);
      });
    });
    return task.run();
  };

  /**
   * Tracks a video element based on the specified `tracker` instance. This
   * method extract the pixel information of the input element to pass to the
   * `tracker` instance. The `tracker.track(pixels, width, height)` will be in
   * a `requestAnimationFrame` loop in order to track all video frames.
   * @param {HTMLVideoElement} element Canvas element to track.
   * @param {tracking.Tracker} tracker The tracker instance used to track the
   *     element.
   * @param {object} opt_options Optional configuration to the tracker.
   * @private
   */
  tracking.trackVideo_ = function(element, tracker) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var width;
    var height;

    var resizeCanvas_ = function() {
      width = element.offsetWidth;
      height = element.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resizeCanvas_();
    element.addEventListener('resize', resizeCanvas_);

    var requestId;
    var requestAnimationFrame_ = function() {
      requestId = window.requestAnimationFrame(function() {
        if (element.readyState === element.HAVE_ENOUGH_DATA) {
          try {
            // Firefox v~30.0 gets confused with the video readyState firing an
            // erroneous HAVE_ENOUGH_DATA just before HAVE_CURRENT_DATA state,
            // hence keep trying to read it until resolved.
            context.drawImage(element, 0, 0, width, height);
          } catch (err) {}
          tracking.trackCanvasInternal_(canvas, tracker);
        }
        requestAnimationFrame_();
      });
    };

    var task = new tracking.TrackerTask(tracker);
    task.on('stop', function() {
      window.cancelAnimationFrame(requestId);
    });
    task.on('run', function() {
      requestAnimationFrame_();
    });
    return task.run();
  };

  // Browser polyfills
  //===================

  if (!window.URL) {
    window.URL = window.URL || window.webkitURL || window.msURL || window.oURL;
  }

  if (!navigator.getUserMedia) {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia;
  }
}(window));

(function() {
  /**
   * EventEmitter utility.
   * @constructor
   */
  tracking.EventEmitter = function() {};

  /**
   * Holds event listeners scoped by event type.
   * @type {object}
   * @private
   */
  tracking.EventEmitter.prototype.events_ = null;

  /**
   * Adds a listener to the end of the listeners array for the specified event.
   * @param {string} event
   * @param {function} listener
   * @return {object} Returns emitter, so calls can be chained.
   */
  tracking.EventEmitter.prototype.addListener = function(event, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }
    if (!this.events_) {
      this.events_ = {};
    }

    this.emit('newListener', event, listener);

    if (!this.events_[event]) {
      this.events_[event] = [];
    }

    this.events_[event].push(listener);

    return this;
  };

  /**
   * Returns an array of listeners for the specified event.
   * @param {string} event
   * @return {array} Array of listeners.
   */
  tracking.EventEmitter.prototype.listeners = function(event) {
    return this.events_ && this.events_[event];
  };

  /**
   * Execute each of the listeners in order with the supplied arguments.
   * @param {string} event
   * @param {*} opt_args [arg1], [arg2], [...]
   * @return {boolean} Returns true if event had listeners, false otherwise.
   */
  tracking.EventEmitter.prototype.emit = function(event) {
    var listeners = this.listeners(event);
    if (listeners) {
      var args = Array.prototype.slice.call(arguments, 1);
      for (var i = 0; i < listeners.length; i++) {
        if (listeners[i]) {
          listeners[i].apply(this, args);
        }
      }
      return true;
    }
    return false;
  };

  /**
   * Adds a listener to the end of the listeners array for the specified event.
   * @param {string} event
   * @param {function} listener
   * @return {object} Returns emitter, so calls can be chained.
   */
  tracking.EventEmitter.prototype.on = tracking.EventEmitter.prototype.addListener;

  /**
   * Adds a one time listener for the event. This listener is invoked only the
   * next time the event is fired, after which it is removed.
   * @param {string} event
   * @param {function} listener
   * @return {object} Returns emitter, so calls can be chained.
   */
  tracking.EventEmitter.prototype.once = function(event, listener) {
    var self = this;
    self.on(event, function handlerInternal() {
      self.removeListener(event, handlerInternal);
      listener.apply(this, arguments);
    });
  };

  /**
   * Removes all listeners, or those of the specified event. It's not a good
   * idea to remove listeners that were added elsewhere in the code,
   * especially when it's on an emitter that you didn't create.
   * @param {string} event
   * @return {object} Returns emitter, so calls can be chained.
   */
  tracking.EventEmitter.prototype.removeAllListeners = function(opt_event) {
    if (!this.events_) {
      return this;
    }
    if (opt_event) {
      delete this.events_[opt_event];
    } else {
      delete this.events_;
    }
    return this;
  };

  /**
   * Remove a listener from the listener array for the specified event.
   * Caution: changes array indices in the listener array behind the listener.
   * @param {string} event
   * @param {function} listener
   * @return {object} Returns emitter, so calls can be chained.
   */
  tracking.EventEmitter.prototype.removeListener = function(event, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('Listener must be a function');
    }
    if (!this.events_) {
      return this;
    }

    var listeners = this.listeners(event);
    if (Array.isArray(listeners)) {
      var i = listeners.indexOf(listener);
      if (i < 0) {
        return this;
      }
      listeners.splice(i, 1);
    }

    return this;
  };

  /**
   * By default EventEmitters will print a warning if more than 10 listeners
   * are added for a particular event. This is a useful default which helps
   * finding memory leaks. Obviously not all Emitters should be limited to 10.
   * This function allows that to be increased. Set to zero for unlimited.
   * @param {number} n The maximum number of listeners.
   */
  tracking.EventEmitter.prototype.setMaxListeners = function() {
    throw new Error('Not implemented');
  };

}());

(function() {
  /**
   * Canvas utility.
   * @static
   * @constructor
   */
  tracking.Canvas = {};

  /**
   * Loads an image source into the canvas.
   * @param {HTMLCanvasElement} canvas The canvas dom element.
   * @param {string} src The image source.
   * @param {number} x The canvas horizontal coordinate to load the image.
   * @param {number} y The canvas vertical coordinate to load the image.
   * @param {number} width The image width.
   * @param {number} height The image height.
   * @param {function} opt_callback Callback that fires when the image is loaded
   *     into the canvas.
   * @static
   */
  tracking.Canvas.loadImage = function(canvas, src, x, y, width, height, opt_callback) {
    var instance = this;
    var img = new window.Image();

    img.onload = function() {
      var context = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      context.drawImage(img, x, y, width, height);
      if (opt_callback) {
        opt_callback.call(instance);
      }
      img = null;
    };
    img.src = src;
  };
}());

(function() {
  /**
   * DisjointSet utility with path compression. Some applications involve
   * grouping n distinct objects into a collection of disjoint sets. Two
   * important operations are then finding which set a given object belongs to
   * and uniting the two sets. A disjoint set data structure maintains a
   * collection S={ S1 , S2 ,..., Sk } of disjoint dynamic sets. Each set is
   * identified by a representative, which usually is a member in the set.
   * @static
   * @constructor
   */
  tracking.DisjointSet = function(length) {
    if (length === undefined) {
      throw new Error('DisjointSet length not specified.');
    }
    this.length = length;
    this.parent = new Uint32Array(length);
    for (var i = 0; i < length; i++) {
      this.parent[i] = i;
    }
  };

  /**
   * Holds the length of the internal set.
   * @type {number}
   */
  tracking.DisjointSet.prototype.length = null;

  /**
   * Holds the set containing the representative values.
   * @type {Array.<number>}
   */
  tracking.DisjointSet.prototype.parent = null;

  /**
   * Finds a pointer to the representative of the set containing i.
   * @param {number} i
   * @return {number} The representative set of i.
   */
  tracking.DisjointSet.prototype.find = function(i) {
    if (this.parent[i] === i) {
      return i;
    } else {
      return (this.parent[i] = this.find(this.parent[i]));
    }
  };

  /**
   * Unites two dynamic sets containing objects i and j, say Si and Sj, into
   * a new set that Si ∪ Sj, assuming that Si ∩ Sj = ∅;
   * @param {number} i
   * @param {number} j
   */
  tracking.DisjointSet.prototype.union = function(i, j) {
    var iRepresentative = this.find(i);
    var jRepresentative = this.find(j);
    this.parent[iRepresentative] = jRepresentative;
  };

}());

(function() {
  /**
   * Image utility.
   * @static
   * @constructor
   */
  tracking.Image = {};

  /**
   * Computes gaussian blur. Adpated from
   * https://github.com/kig/canvasfilters.
   * @param {pixels} pixels The pixels in a linear [r,g,b,a,...] array.
   * @param {number} width The image width.
   * @param {number} height The image height.
   * @param {number} diameter Gaussian blur diameter, must be greater than 1.
   * @return {array} The edge pixels in a linear [r,g,b,a,...] array.
   */
  tracking.Image.blur = function(pixels, width, height, diameter) {
    diameter = Math.abs(diameter);
    if (diameter <= 1) {
      throw new Error('Diameter should be greater than 1.');
    }
    var radius = diameter / 2;
    var len = Math.ceil(diameter) + (1 - (Math.ceil(diameter) % 2));
    var weights = new Float32Array(len);
    var rho = (radius + 0.5) / 3;
    var rhoSq = rho * rho;
    var gaussianFactor = 1 / Math.sqrt(2 * Math.PI * rhoSq);
    var rhoFactor = -1 / (2 * rho * rho);
    var wsum = 0;
    var middle = Math.floor(len / 2);
    for (var i = 0; i < len; i++) {
      var x = i - middle;
      var gx = gaussianFactor * Math.exp(x * x * rhoFactor);
      weights[i] = gx;
      wsum += gx;
    }
    for (var j = 0; j < weights.length; j++) {
      weights[j] /= wsum;
    }
    return this.separableConvolve(pixels, width, height, weights, weights, false);
  };

  /**
   * Computes the integral image for summed, squared, rotated and sobel pixels.
   * @param {array} pixels The pixels in a linear [r,g,b,a,...] array to loop
   *     through.
   * @param {number} width The image width.
   * @param {number} height The image height.
   * @param {array} opt_integralImage Empty array of size `width * height` to
   *     be filled with the integral image values. If not specified compute sum
   *     values will be skipped.
   * @param {array} opt_integralImageSquare Empty array of size `width *
   *     height` to be filled with the integral image squared values. If not
   *     specified compute squared values will be skipped.
   * @param {array} opt_tiltedIntegralImage Empty array of size `width *
   *     height` to be filled with the rotated integral image values. If not
   *     specified compute sum values will be skipped.
   * @param {array} opt_integralImageSobel Empty array of size `width *
   *     height` to be filled with the integral image of sobel values. If not
   *     specified compute sobel filtering will be skipped.
   * @static
   */
  tracking.Image.computeIntegralImage = function(pixels, width, height, opt_integralImage, opt_integralImageSquare, opt_tiltedIntegralImage, opt_integralImageSobel) {
    if (arguments.length < 4) {
      throw new Error('You should specify at least one output array in the order: sum, square, tilted, sobel.');
    }
    var pixelsSobel;
    if (opt_integralImageSobel) {
      pixelsSobel = tracking.Image.sobel(pixels, width, height);
    }
    for (var i = 0; i < height; i++) {
      for (var j = 0; j < width; j++) {
        var w = i * width * 4 + j * 4;
        var pixel = ~~(pixels[w] * 0.299 + pixels[w + 1] * 0.587 + pixels[w + 2] * 0.114);
        if (opt_integralImage) {
          this.computePixelValueSAT_(opt_integralImage, width, i, j, pixel);
        }
        if (opt_integralImageSquare) {
          this.computePixelValueSAT_(opt_integralImageSquare, width, i, j, pixel * pixel);
        }
        if (opt_tiltedIntegralImage) {
          var w1 = w - width * 4;
          var pixelAbove = ~~(pixels[w1] * 0.299 + pixels[w1 + 1] * 0.587 + pixels[w1 + 2] * 0.114);
          this.computePixelValueRSAT_(opt_tiltedIntegralImage, width, i, j, pixel, pixelAbove || 0);
        }
        if (opt_integralImageSobel) {
          this.computePixelValueSAT_(opt_integralImageSobel, width, i, j, pixelsSobel[w]);
        }
      }
    }
  };

  /**
   * Helper method to compute the rotated summed area table (RSAT) by the
   * formula:
   *
   * RSAT(x, y) = RSAT(x-1, y-1) + RSAT(x+1, y-1) - RSAT(x, y-2) + I(x, y) + I(x, y-1)
   *
   * @param {number} width The image width.
   * @param {array} RSAT Empty array of size `width * height` to be filled with
   *     the integral image values. If not specified compute sum values will be
   *     skipped.
   * @param {number} i Vertical position of the pixel to be evaluated.
   * @param {number} j Horizontal position of the pixel to be evaluated.
   * @param {number} pixel Pixel value to be added to the integral image.
   * @static
   * @private
   */
  tracking.Image.computePixelValueRSAT_ = function(RSAT, width, i, j, pixel, pixelAbove) {
    var w = i * width + j;
    RSAT[w] = (RSAT[w - width - 1] || 0) + (RSAT[w - width + 1] || 0) - (RSAT[w - width - width] || 0) + pixel + pixelAbove;
  };

  /**
   * Helper method to compute the summed area table (SAT) by the formula:
   *
   * SAT(x, y) = SAT(x, y-1) + SAT(x-1, y) + I(x, y) - SAT(x-1, y-1)
   *
   * @param {number} width The image width.
   * @param {array} SAT Empty array of size `width * height` to be filled with
   *     the integral image values. If not specified compute sum values will be
   *     skipped.
   * @param {number} i Vertical position of the pixel to be evaluated.
   * @param {number} j Horizontal position of the pixel to be evaluated.
   * @param {number} pixel Pixel value to be added to the integral image.
   * @static
   * @private
   */
  tracking.Image.computePixelValueSAT_ = function(SAT, width, i, j, pixel) {
    var w = i * width + j;
    SAT[w] = (SAT[w - width] || 0) + (SAT[w - 1] || 0) + pixel - (SAT[w - width - 1] || 0);
  };

  /**
   * Converts a color from a colorspace based on an RGB color model to a
   * grayscale representation of its luminance. The coefficients represent the
   * measured intensity perception of typical trichromat humans, in
   * particular, human vision is most sensitive to green and least sensitive
   * to blue.
   * @param {pixels} pixels The pixels in a linear [r,g,b,a,...] array.
   * @param {number} width The image width.
   * @param {number} height The image height.
   * @param {boolean} fillRGBA If the result should fill all RGBA values with the gray scale
   *  values, instead of returning a single value per pixel.
   * @param {Uint8ClampedArray} The grayscale pixels in a linear array ([p,p,p,a,...] if fillRGBA
   *  is true and [p1, p2, p3, ...] if fillRGBA is false).
   * @static
   */
  tracking.Image.grayscale = function(pixels, width, height, fillRGBA) {
    var gray = new Uint8ClampedArray(fillRGBA ? pixels.length : pixels.length >> 2);
    var p = 0;
    var w = 0;
    for (var i = 0; i < height; i++) {
      for (var j = 0; j < width; j++) {
        var value = pixels[w] * 0.299 + pixels[w + 1] * 0.587 + pixels[w + 2] * 0.114;
        gray[p++] = value;

        if (fillRGBA) {
          gray[p++] = value;
          gray[p++] = value;
          gray[p++] = pixels[w + 3];
        }

        w += 4;
      }
    }
    return gray;
  };

  /**
   * Fast horizontal separable convolution. A point spread function (PSF) is
   * said to be separable if it can be broken into two one-dimensional
   * signals: a vertical and a horizontal projection. The convolution is
   * performed by sliding the kernel over the image, generally starting at the
   * top left corner, so as to move the kernel through all the positions where
   * the kernel fits entirely within the boundaries of the image. Adpated from
   * https://github.com/kig/canvasfilters.
   * @param {pixels} pixels The pixels in a linear [r,g,b,a,...] array.
   * @param {number} width The image width.
   * @param {number} height The image height.
   * @param {array} weightsVector The weighting vector, e.g [-1,0,1].
   * @param {number} opaque
   * @return {array} The convoluted pixels in a linear [r,g,b,a,...] array.
   */
  tracking.Image.horizontalConvolve = function(pixels, width, height, weightsVector, opaque) {
    var side = weightsVector.length;
    var halfSide = Math.floor(side / 2);
    var output = new Float32Array(width * height * 4);
    var alphaFac = opaque ? 1 : 0;

    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        var sy = y;
        var sx = x;
        var offset = (y * width + x) * 4;
        var r = 0;
        var g = 0;
        var b = 0;
        var a = 0;
        for (var cx = 0; cx < side; cx++) {
          var scy = sy;
          var scx = Math.min(width - 1, Math.max(0, sx + cx - halfSide));
          var poffset = (scy * width + scx) * 4;
          var wt = weightsVector[cx];
          r += pixels[poffset] * wt;
          g += pixels[poffset + 1] * wt;
          b += pixels[poffset + 2] * wt;
          a += pixels[poffset + 3] * wt;
        }
        output[offset] = r;
        output[offset + 1] = g;
        output[offset + 2] = b;
        output[offset + 3] = a + alphaFac * (255 - a);
      }
    }
    return output;
  };

  /**
   * Fast vertical separable convolution. A point spread function (PSF) is
   * said to be separable if it can be broken into two one-dimensional
   * signals: a vertical and a horizontal projection. The convolution is
   * performed by sliding the kernel over the image, generally starting at the
   * top left corner, so as to move the kernel through all the positions where
   * the kernel fits entirely within the boundaries of the image. Adpated from
   * https://github.com/kig/canvasfilters.
   * @param {pixels} pixels The pixels in a linear [r,g,b,a,...] array.
   * @param {number} width The image width.
   * @param {number} height The image height.
   * @param {array} weightsVector The weighting vector, e.g [-1,0,1].
   * @param {number} opaque
   * @return {array} The convoluted pixels in a linear [r,g,b,a,...] array.
   */
  tracking.Image.verticalConvolve = function(pixels, width, height, weightsVector, opaque) {
    var side = weightsVector.length;
    var halfSide = Math.floor(side / 2);
    var output = new Float32Array(width * height * 4);
    var alphaFac = opaque ? 1 : 0;

    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        var sy = y;
        var sx = x;
        var offset = (y * width + x) * 4;
        var r = 0;
        var g = 0;
        var b = 0;
        var a = 0;
        for (var cy = 0; cy < side; cy++) {
          var scy = Math.min(height - 1, Math.max(0, sy + cy - halfSide));
          var scx = sx;
          var poffset = (scy * width + scx) * 4;
          var wt = weightsVector[cy];
          r += pixels[poffset] * wt;
          g += pixels[poffset + 1] * wt;
          b += pixels[poffset + 2] * wt;
          a += pixels[poffset + 3] * wt;
        }
        output[offset] = r;
        output[offset + 1] = g;
        output[offset + 2] = b;
        output[offset + 3] = a + alphaFac * (255 - a);
      }
    }
    return output;
  };

  /**
   * Fast separable convolution. A point spread function (PSF) is said to be
   * separable if it can be broken into two one-dimensional signals: a
   * vertical and a horizontal projection. The convolution is performed by
   * sliding the kernel over the image, generally starting at the top left
   * corner, so as to move the kernel through all the positions where the
   * kernel fits entirely within the boundaries of the image. Adpated from
   * https://github.com/kig/canvasfilters.
   * @param {pixels} pixels The pixels in a linear [r,g,b,a,...] array.
   * @param {number} width The image width.
   * @param {number} height The image height.
   * @param {array} horizWeights The horizontal weighting vector, e.g [-1,0,1].
   * @param {array} vertWeights The vertical vector, e.g [-1,0,1].
   * @param {number} opaque
   * @return {array} The convoluted pixels in a linear [r,g,b,a,...] array.
   */
  tracking.Image.separableConvolve = function(pixels, width, height, horizWeights, vertWeights, opaque) {
    var vertical = this.verticalConvolve(pixels, width, height, vertWeights, opaque);
    return this.horizontalConvolve(vertical, width, height, horizWeights, opaque);
  };

  /**
   * Compute image edges using Sobel operator. Computes the vertical and
   * horizontal gradients of the image and combines the computed images to
   * find edges in the image. The way we implement the Sobel filter here is by
   * first grayscaling the image, then taking the horizontal and vertical
   * gradients and finally combining the gradient images to make up the final
   * image. Adpated from https://github.com/kig/canvasfilters.
   * @param {pixels} pixels The pixels in a linear [r,g,b,a,...] array.
   * @param {number} width The image width.
   * @param {number} height The image height.
   * @return {array} The edge pixels in a linear [r,g,b,a,...] array.
   */
  tracking.Image.sobel = function(pixels, width, height) {
    pixels = this.grayscale(pixels, width, height, true);
    var output = new Float32Array(width * height * 4);
    var sobelSignVector = new Float32Array([-1, 0, 1]);
    var sobelScaleVector = new Float32Array([1, 2, 1]);
    var vertical = this.separableConvolve(pixels, width, height, sobelSignVector, sobelScaleVector);
    var horizontal = this.separableConvolve(pixels, width, height, sobelScaleVector, sobelSignVector);

    for (var i = 0; i < output.length; i += 4) {
      var v = vertical[i];
      var h = horizontal[i];
      var p = Math.sqrt(h * h + v * v);
      output[i] = p;
      output[i + 1] = p;
      output[i + 2] = p;
      output[i + 3] = 255;
    }

    return output;
  };

}());

(function() {
  /**
   * ViolaJones utility.
   * @static
   * @constructor
   */
  tracking.ViolaJones = {};

  /**
   * Holds the minimum area of intersection that defines when a rectangle is
   * from the same group. Often when a face is matched multiple rectangles are
   * classified as possible rectangles to represent the face, when they
   * intersects they are grouped as one face.
   * @type {number}
   * @default 0.5
   * @static
   */
  tracking.ViolaJones.REGIONS_OVERLAP = 0.5;

  /**
   * Holds the HAAR cascade classifiers converted from OpenCV training.
   * @type {array}
   * @static
   */
  tracking.ViolaJones.classifiers = {};

  /**
   * Detects through the HAAR cascade data rectangles matches.
   * @param {pixels} pixels The pixels in a linear [r,g,b,a,...] array.
   * @param {number} width The image width.
   * @param {number} height The image height.
   * @param {number} initialScale The initial scale to start the block
   *     scaling.
   * @param {number} scaleFactor The scale factor to scale the feature block.
   * @param {number} stepSize The block step size.
   * @param {number} edgesDensity Percentage density edges inside the
   *     classifier block. Value from [0.0, 1.0], defaults to 0.2. If specified
   *     edge detection will be applied to the image to prune dead areas of the
   *     image, this can improve significantly performance.
   * @param {number} data The HAAR cascade data.
   * @return {array} Found rectangles.
   * @static
   */
  tracking.ViolaJones.detect = function(pixels, width, height, initialScale, scaleFactor, stepSize, edgesDensity, data) {
    var total = 0;
    var rects = [];
    var integralImage = new Int32Array(width * height);
    var integralImageSquare = new Int32Array(width * height);
    var tiltedIntegralImage = new Int32Array(width * height);

    var integralImageSobel;
    if (edgesDensity > 0) {
      integralImageSobel = new Int32Array(width * height);
    }

    tracking.Image.computeIntegralImage(pixels, width, height, integralImage, integralImageSquare, tiltedIntegralImage, integralImageSobel);

    var minWidth = data[0];
    var minHeight = data[1];
    var scale = initialScale * scaleFactor;
    var blockWidth = (scale * minWidth) | 0;
    var blockHeight = (scale * minHeight) | 0;

    while (blockWidth < width && blockHeight < height) {
      var step = (scale * stepSize + 0.5) | 0;
      for (var i = 0; i < (height - blockHeight); i += step) {
        for (var j = 0; j < (width - blockWidth); j += step) {

          if (edgesDensity > 0) {
            if (this.isTriviallyExcluded(edgesDensity, integralImageSobel, i, j, width, blockWidth, blockHeight)) {
              continue;
            }
          }

          if (this.evalStages_(data, integralImage, integralImageSquare, tiltedIntegralImage, i, j, width, blockWidth, blockHeight, scale)) {
            rects[total++] = {
              width: blockWidth,
              height: blockHeight,
              x: j,
              y: i
            };
          }
        }
      }

      scale *= scaleFactor;
      blockWidth = (scale * minWidth) | 0;
      blockHeight = (scale * minHeight) | 0;
    }
    return this.mergeRectangles_(rects);
  };

  /**
   * Fast check to test whether the edges density inside the block is greater
   * than a threshold, if true it tests the stages. This can improve
   * significantly performance.
   * @param {number} edgesDensity Percentage density edges inside the
   *     classifier block.
   * @param {array} integralImageSobel The integral image of a sobel image.
   * @param {number} i Vertical position of the pixel to be evaluated.
   * @param {number} j Horizontal position of the pixel to be evaluated.
   * @param {number} width The image width.
   * @return {boolean} True whether the block at position i,j can be skipped,
   *     false otherwise.
   * @static
   * @protected
   */
  tracking.ViolaJones.isTriviallyExcluded = function(edgesDensity, integralImageSobel, i, j, width, blockWidth, blockHeight) {
    var wbA = i * width + j;
    var wbB = wbA + blockWidth;
    var wbD = wbA + blockHeight * width;
    var wbC = wbD + blockWidth;
    var blockEdgesDensity = (integralImageSobel[wbA] - integralImageSobel[wbB] - integralImageSobel[wbD] + integralImageSobel[wbC]) / (blockWidth * blockHeight * 255);
    if (blockEdgesDensity < edgesDensity) {
      return true;
    }
    return false;
  };

  /**
   * Evaluates if the block size on i,j position is a valid HAAR cascade
   * stage.
   * @param {number} data The HAAR cascade data.
   * @param {number} i Vertical position of the pixel to be evaluated.
   * @param {number} j Horizontal position of the pixel to be evaluated.
   * @param {number} width The image width.
   * @param {number} blockSize The block size.
   * @param {number} scale The scale factor of the block size and its original
   *     size.
   * @param {number} inverseArea The inverse area of the block size.
   * @return {boolean} Whether the region passes all the stage tests.
   * @private
   * @static
   */
  tracking.ViolaJones.evalStages_ = function(data, integralImage, integralImageSquare, tiltedIntegralImage, i, j, width, blockWidth, blockHeight, scale) {
    var inverseArea = 1.0 / (blockWidth * blockHeight);
    var wbA = i * width + j;
    var wbB = wbA + blockWidth;
    var wbD = wbA + blockHeight * width;
    var wbC = wbD + blockWidth;
    var mean = (integralImage[wbA] - integralImage[wbB] - integralImage[wbD] + integralImage[wbC]) * inverseArea;
    var variance = (integralImageSquare[wbA] - integralImageSquare[wbB] - integralImageSquare[wbD] + integralImageSquare[wbC]) * inverseArea - mean * mean;

    var standardDeviation = 1;
    if (variance > 0) {
      standardDeviation = Math.sqrt(variance);
    }

    var length = data.length;

    for (var w = 2; w < length; ) {
      var stageSum = 0;
      var stageThreshold = data[w++];
      var nodeLength = data[w++];

      while (nodeLength--) {
        var rectsSum = 0;
        var tilted = data[w++];
        var rectsLength = data[w++];

        for (var r = 0; r < rectsLength; r++) {
          var rectLeft = (j + data[w++] * scale + 0.5) | 0;
          var rectTop = (i + data[w++] * scale + 0.5) | 0;
          var rectWidth = (data[w++] * scale + 0.5) | 0;
          var rectHeight = (data[w++] * scale + 0.5) | 0;
          var rectWeight = data[w++];

          var w1;
          var w2;
          var w3;
          var w4;
          if (tilted) {
            // RectSum(r) = RSAT(x-h+w, y+w+h-1) + RSAT(x, y-1) - RSAT(x-h, y+h-1) - RSAT(x+w, y+w-1)
            w1 = (rectLeft - rectHeight + rectWidth) + (rectTop + rectWidth + rectHeight - 1) * width;
            w2 = rectLeft + (rectTop - 1) * width;
            w3 = (rectLeft - rectHeight) + (rectTop + rectHeight - 1) * width;
            w4 = (rectLeft + rectWidth) + (rectTop + rectWidth - 1) * width;
            rectsSum += (tiltedIntegralImage[w1] + tiltedIntegralImage[w2] - tiltedIntegralImage[w3] - tiltedIntegralImage[w4]) * rectWeight;
          } else {
            // RectSum(r) = SAT(x-1, y-1) + SAT(x+w-1, y+h-1) - SAT(x-1, y+h-1) - SAT(x+w-1, y-1)
            w1 = rectTop * width + rectLeft;
            w2 = w1 + rectWidth;
            w3 = w1 + rectHeight * width;
            w4 = w3 + rectWidth;
            rectsSum += (integralImage[w1] - integralImage[w2] - integralImage[w3] + integralImage[w4]) * rectWeight;
            // TODO: Review the code below to analyze performance when using it instead.
            // w1 = (rectLeft - 1) + (rectTop - 1) * width;
            // w2 = (rectLeft + rectWidth - 1) + (rectTop + rectHeight - 1) * width;
            // w3 = (rectLeft - 1) + (rectTop + rectHeight - 1) * width;
            // w4 = (rectLeft + rectWidth - 1) + (rectTop - 1) * width;
            // rectsSum += (integralImage[w1] + integralImage[w2] - integralImage[w3] - integralImage[w4]) * rectWeight;
          }
        }

        var nodeThreshold = data[w++];
        var nodeLeft = data[w++];
        var nodeRight = data[w++];

        if (rectsSum * inverseArea < nodeThreshold * standardDeviation) {
          stageSum += nodeLeft;
        } else {
          stageSum += nodeRight;
        }
      }

      if (stageSum < stageThreshold) {
        return false;
      }
    }
    return true;
  };

  /**
   * Postprocess the detected sub-windows in order to combine overlapping
   * detections into a single detection.
   * @param {array} rects
   * @return {array}
   * @private
   * @static
   */
  tracking.ViolaJones.mergeRectangles_ = function(rects) {
    var disjointSet = new tracking.DisjointSet(rects.length);

    for (var i = 0; i < rects.length; i++) {
      var r1 = rects[i];
      for (var j = 0; j < rects.length; j++) {
        var r2 = rects[j];
        if (tracking.Math.intersectRect(r1.x, r1.y, r1.x + r1.width, r1.y + r1.height, r2.x, r2.y, r2.x + r2.width, r2.y + r2.height)) {
          var x1 = Math.max(r1.x, r2.x);
          var y1 = Math.max(r1.y, r2.y);
          var x2 = Math.min(r1.x + r1.width, r2.x + r2.width);
          var y2 = Math.min(r1.y + r1.height, r2.y + r2.height);
          var overlap = (x1 - x2) * (y1 - y2);
          var area1 = (r1.width * r1.height);
          var area2 = (r2.width * r2.height);

          if ((overlap / (area1 * (area1 / area2)) >= this.REGIONS_OVERLAP) &&
            (overlap / (area2 * (area1 / area2)) >= this.REGIONS_OVERLAP)) {
            disjointSet.union(i, j);
          }
        }
      }
    }

    var map = {};
    for (var k = 0; k < disjointSet.length; k++) {
      var rep = disjointSet.find(k);
      if (!map[rep]) {
        map[rep] = {
          total: 1,
          width: rects[k].width,
          height: rects[k].height,
          x: rects[k].x,
          y: rects[k].y
        };
        continue;
      }
      map[rep].total++;
      map[rep].width += rects[k].width;
      map[rep].height += rects[k].height;
      map[rep].x += rects[k].x;
      map[rep].y += rects[k].y;
    }

    var result = [];
    Object.keys(map).forEach(function(key) {
      var rect = map[key];
      result.push({
        total: rect.total,
        width: (rect.width / rect.total + 0.5) | 0,
        height: (rect.height / rect.total + 0.5) | 0,
        x: (rect.x / rect.total + 0.5) | 0,
        y: (rect.y / rect.total + 0.5) | 0
      });
    });

    return result;
  };

}());

(function() {
  /**
   * Brief intends for "Binary Robust Independent Elementary Features".This
   * method generates a binary string for each keypoint found by an extractor
   * method.
   * @static
   * @constructor
   */
  tracking.Brief = {};

  /**
   * The set of binary tests is defined by the nd (x,y)-location pairs
   * uniquely chosen during the initialization. Values could vary between N =
   * 128,256,512. N=128 yield good compromises between speed, storage
   * efficiency, and recognition rate.
   * @type {number}
   */
  tracking.Brief.N = 512;

  /**
   * Caches coordinates values of (x,y)-location pairs uniquely chosen during
   * the initialization.
   * @type {Object.<number, Int32Array>}
   * @private
   * @static
   */
  tracking.Brief.randomImageOffsets_ = {};

  /**
   * Caches delta values of (x,y)-location pairs uniquely chosen during
   * the initialization.
   * @type {Int32Array}
   * @private
   * @static
   */
  tracking.Brief.randomWindowOffsets_ = null;

  /**
   * Generates a brinary string for each found keypoints extracted using an
   * extractor method.
   * @param {array} The grayscale pixels in a linear [p1,p2,...] array.
   * @param {number} width The image width.
   * @param {array} keypoints
   * @return {Int32Array} Returns an array where for each four sequence int
   *     values represent the descriptor binary string (128 bits) necessary
   *     to describe the corner, e.g. [0,0,0,0, 0,0,0,0, ...].
   * @static
   */
  tracking.Brief.getDescriptors = function(pixels, width, keypoints) {
    // Optimizing divide by 32 operation using binary shift
    // (this.N >> 5) === this.N/32.
    var descriptors = new Int32Array((keypoints.length >> 1) * (this.N >> 5));
    var descriptorWord = 0;
    var offsets = this.getRandomOffsets_(width);
    var position = 0;

    for (var i = 0; i < keypoints.length; i += 2) {
      var w = width * keypoints[i + 1] + keypoints[i];

      var offsetsPosition = 0;
      for (var j = 0, n = this.N; j < n; j++) {
        if (pixels[offsets[offsetsPosition++] + w] < pixels[offsets[offsetsPosition++] + w]) {
          // The bit in the position `j % 32` of descriptorWord should be set to 1. We do
          // this by making an OR operation with a binary number that only has the bit
          // in that position set to 1. That binary number is obtained by shifting 1 left by
          // `j % 32` (which is the same as `j & 31` left) positions.
          descriptorWord |= 1 << (j & 31);
        }

        // If the next j is a multiple of 32, we will need to use a new descriptor word to hold
        // the next results.
        if (!((j + 1) & 31)) {
          descriptors[position++] = descriptorWord;
          descriptorWord = 0;
        }
      }
    }

    return descriptors;
  };

  /**
   * Matches sets of features {mi} and {m′j} extracted from two images taken
   * from similar, and often successive, viewpoints. A classical procedure
   * runs as follows. For each point {mi} in the first image, search in a
   * region of the second image around location {mi} for point {m′j}. The
   * search is based on the similarity of the local image windows, also known
   * as kernel windows, centered on the points, which strongly characterizes
   * the points when the images are sufficiently close. Once each keypoint is
   * described with its binary string, they need to be compared with the
   * closest matching point. Distance metric is critical to the performance of
   * in- trusion detection systems. Thus using binary strings reduces the size
   * of the descriptor and provides an interesting data structure that is fast
   * to operate whose similarity can be measured by the Hamming distance.
   * @param {array} keypoints1
   * @param {array} descriptors1
   * @param {array} keypoints2
   * @param {array} descriptors2
   * @return {Int32Array} Returns an array where the index is the corner1
   *     index coordinate, and the value is the corresponding match index of
   *     corner2, e.g. keypoints1=[x0,y0,x1,y1,...] and
   *     keypoints2=[x'0,y'0,x'1,y'1,...], if x0 matches x'1 and x1 matches x'0,
   *     the return array would be [3,0].
   * @static
   */
  tracking.Brief.match = function(keypoints1, descriptors1, keypoints2, descriptors2) {
    var len1 = keypoints1.length >> 1;
    var len2 = keypoints2.length >> 1;
    var matches = new Array(len1);

    for (var i = 0; i < len1; i++) {
      var min = Infinity;
      var minj = 0;
      for (var j = 0; j < len2; j++) {
        var dist = 0;
        // Optimizing divide by 32 operation using binary shift
        // (this.N >> 5) === this.N/32.
        for (var k = 0, n = this.N >> 5; k < n; k++) {
          dist += tracking.Math.hammingWeight(descriptors1[i * n + k] ^ descriptors2[j * n + k]);
        }
        if (dist < min) {
          min = dist;
          minj = j;
        }
      }
      matches[i] = {
        index1: i,
        index2: minj,
        keypoint1: [keypoints1[2 * i], keypoints1[2 * i + 1]],
        keypoint2: [keypoints2[2 * minj], keypoints2[2 * minj + 1]],
        confidence: 1 - min / this.N
      };
    }

    return matches;
  };

  /**
   * Removes matches outliers by testing matches on both directions.
   * @param {array} keypoints1
   * @param {array} descriptors1
   * @param {array} keypoints2
   * @param {array} descriptors2
   * @return {Int32Array} Returns an array where the index is the corner1
   *     index coordinate, and the value is the corresponding match index of
   *     corner2, e.g. keypoints1=[x0,y0,x1,y1,...] and
   *     keypoints2=[x'0,y'0,x'1,y'1,...], if x0 matches x'1 and x1 matches x'0,
   *     the return array would be [3,0].
   * @static
   */
  tracking.Brief.reciprocalMatch = function(keypoints1, descriptors1, keypoints2, descriptors2) {
    var matches = [];
    if (keypoints1.length === 0 || keypoints2.length === 0) {
      return matches;
    }

    var matches1 = tracking.Brief.match(keypoints1, descriptors1, keypoints2, descriptors2);
    var matches2 = tracking.Brief.match(keypoints2, descriptors2, keypoints1, descriptors1);
    for (var i = 0; i < matches1.length; i++) {
      if (matches2[matches1[i].index2].index2 === i) {
        matches.push(matches1[i]);
      }
    }
    return matches;
  };

  /**
   * Gets the coordinates values of (x,y)-location pairs uniquely chosen
   * during the initialization.
   * @return {array} Array with the random offset values.
   * @private
   */
  tracking.Brief.getRandomOffsets_ = function(width) {
    if (!this.randomWindowOffsets_) {
      var windowPosition = 0;
      var windowOffsets = new Int32Array(4 * this.N);
      for (var i = 0; i < this.N; i++) {
        windowOffsets[windowPosition++] = Math.round(tracking.Math.uniformRandom(-15, 16));
        windowOffsets[windowPosition++] = Math.round(tracking.Math.uniformRandom(-15, 16));
        windowOffsets[windowPosition++] = Math.round(tracking.Math.uniformRandom(-15, 16));
        windowOffsets[windowPosition++] = Math.round(tracking.Math.uniformRandom(-15, 16));
      }
      this.randomWindowOffsets_ = windowOffsets;
    }

    if (!this.randomImageOffsets_[width]) {
      var imagePosition = 0;
      var imageOffsets = new Int32Array(2 * this.N);
      for (var j = 0; j < this.N; j++) {
        imageOffsets[imagePosition++] = this.randomWindowOffsets_[4 * j] * width + this.randomWindowOffsets_[4 * j + 1];
        imageOffsets[imagePosition++] = this.randomWindowOffsets_[4 * j + 2] * width + this.randomWindowOffsets_[4 * j + 3];
      }
      this.randomImageOffsets_[width] = imageOffsets;
    }

    return this.randomImageOffsets_[width];
  };
}());

(function() {
  /**
   * FAST intends for "Features from Accelerated Segment Test". This method
   * performs a point segment test corner detection. The segment test
   * criterion operates by considering a circle of sixteen pixels around the
   * corner candidate p. The detector classifies p as a corner if there exists
   * a set of n contiguous pixelsin the circle which are all brighter than the
   * intensity of the candidate pixel Ip plus a threshold t, or all darker
   * than Ip − t.
   *
   *       15 00 01
   *    14          02
   * 13                03
   * 12       []       04
   * 11                05
   *    10          06
   *       09 08 07
   *
   * For more reference:
   * http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.60.3991&rep=rep1&type=pdf
   * @static
   * @constructor
   */
  tracking.Fast = {};

  /**
   * Holds the threshold to determine whether the tested pixel is brighter or
   * darker than the corner candidate p.
   * @type {number}
   * @default 40
   * @static
   */
  tracking.Fast.THRESHOLD = 40;

  /**
   * Caches coordinates values of the circle surounding the pixel candidate p.
   * @type {Object.<number, Int32Array>}
   * @private
   * @static
   */
  tracking.Fast.circles_ = {};

  /**
   * Finds corners coordinates on the graysacaled image.
   * @param {array} The grayscale pixels in a linear [p1,p2,...] array.
   * @param {number} width The image width.
   * @param {number} height The image height.
   * @param {number} threshold to determine whether the tested pixel is brighter or
   *     darker than the corner candidate p. Default value is 40.
   * @return {array} Array containing the coordinates of all found corners,
   *     e.g. [x0,y0,x1,y1,...], where P(x0,y0) represents a corner coordinate.
   * @static
   */
  tracking.Fast.findCorners = function(pixels, width, height, opt_threshold) {
    var circleOffsets = this.getCircleOffsets_(width);
    var circlePixels = new Int32Array(16);
    var corners = [];

    if (opt_threshold === undefined) {
      opt_threshold = this.THRESHOLD;
    }

    // When looping through the image pixels, skips the first three lines from
    // the image boundaries to constrain the surrounding circle inside the image
    // area.
    for (var i = 3; i < height - 3; i++) {
      for (var j = 3; j < width - 3; j++) {
        var w = i * width + j;
        var p = pixels[w];

        // Loops the circle offsets to read the pixel value for the sixteen
        // surrounding pixels.
        for (var k = 0; k < 16; k++) {
          circlePixels[k] = pixels[w + circleOffsets[k]];
        }

        if (this.isCorner(p, circlePixels, opt_threshold)) {
          // The pixel p is classified as a corner, as optimization increment j
          // by the circle radius 3 to skip the neighbor pixels inside the
          // surrounding circle. This can be removed without compromising the
          // result.
          corners.push(j, i);
          j += 3;
        }
      }
    }

    return corners;
  };

  /**
   * Checks if the circle pixel is brigther than the candidate pixel p by
   * a threshold.
   * @param {number} circlePixel The circle pixel value.
   * @param {number} p The value of the candidate pixel p.
   * @param {number} threshold
   * @return {Boolean}
   * @static
   */
  tracking.Fast.isBrighter = function(circlePixel, p, threshold) {
    return circlePixel - p > threshold;
  };

  /**
   * Checks if the circle pixel is within the corner of the candidate pixel p
   * by a threshold.
   * @param {number} p The value of the candidate pixel p.
   * @param {number} circlePixel The circle pixel value.
   * @param {number} threshold
   * @return {Boolean}
   * @static
   */
  tracking.Fast.isCorner = function(p, circlePixels, threshold) {
    if (this.isTriviallyExcluded(circlePixels, p, threshold)) {
      return false;
    }

    for (var x = 0; x < 16; x++) {
      var darker = true;
      var brighter = true;

      for (var y = 0; y < 9; y++) {
        var circlePixel = circlePixels[(x + y) & 15];

        if (!this.isBrighter(p, circlePixel, threshold)) {
          brighter = false;
          if (darker === false) {
            break;
          }
        }

        if (!this.isDarker(p, circlePixel, threshold)) {
          darker = false;
          if (brighter === false) {
            break;
          }
        }
      }

      if (brighter || darker) {
        return true;
      }
    }

    return false;
  };

  /**
   * Checks if the circle pixel is darker than the candidate pixel p by
   * a threshold.
   * @param {number} circlePixel The circle pixel value.
   * @param {number} p The value of the candidate pixel p.
   * @param {number} threshold
   * @return {Boolean}
   * @static
   */
  tracking.Fast.isDarker = function(circlePixel, p, threshold) {
    return p - circlePixel > threshold;
  };

  /**
   * Fast check to test if the candidate pixel is a trivially excluded value.
   * In order to be a corner, the candidate pixel value should be darker or
   * brigther than 9-12 surrouding pixels, when at least three of the top,
   * bottom, left and right pixels are brither or darker it can be
   * automatically excluded improving the performance.
   * @param {number} circlePixel The circle pixel value.
   * @param {number} p The value of the candidate pixel p.
   * @param {number} threshold
   * @return {Boolean}
   * @static
   * @protected
   */
  tracking.Fast.isTriviallyExcluded = function(circlePixels, p, threshold) {
    var count = 0;
    var circleBottom = circlePixels[8];
    var circleLeft = circlePixels[12];
    var circleRight = circlePixels[4];
    var circleTop = circlePixels[0];

    if (this.isBrighter(circleTop, p, threshold)) {
      count++;
    }
    if (this.isBrighter(circleRight, p, threshold)) {
      count++;
    }
    if (this.isBrighter(circleBottom, p, threshold)) {
      count++;
    }
    if (this.isBrighter(circleLeft, p, threshold)) {
      count++;
    }

    if (count < 3) {
      count = 0;
      if (this.isDarker(circleTop, p, threshold)) {
        count++;
      }
      if (this.isDarker(circleRight, p, threshold)) {
        count++;
      }
      if (this.isDarker(circleBottom, p, threshold)) {
        count++;
      }
      if (this.isDarker(circleLeft, p, threshold)) {
        count++;
      }
      if (count < 3) {
        return true;
      }
    }

    return false;
  };

  /**
   * Gets the sixteen offset values of the circle surrounding pixel.
   * @param {number} width The image width.
   * @return {array} Array with the sixteen offset values of the circle
   *     surrounding pixel.
   * @private
   */
  tracking.Fast.getCircleOffsets_ = function(width) {
    if (this.circles_[width]) {
      return this.circles_[width];
    }

    var circle = new Int32Array(16);

    circle[0] = -width - width - width;
    circle[1] = circle[0] + 1;
    circle[2] = circle[1] + width + 1;
    circle[3] = circle[2] + width + 1;
    circle[4] = circle[3] + width;
    circle[5] = circle[4] + width;
    circle[6] = circle[5] + width - 1;
    circle[7] = circle[6] + width - 1;
    circle[8] = circle[7] - 1;
    circle[9] = circle[8] - 1;
    circle[10] = circle[9] - width - 1;
    circle[11] = circle[10] - width - 1;
    circle[12] = circle[11] - width;
    circle[13] = circle[12] - width;
    circle[14] = circle[13] - width + 1;
    circle[15] = circle[14] - width + 1;

    this.circles_[width] = circle;
    return circle;
  };
}());

(function() {
  /**
   * Math utility.
   * @static
   * @constructor
   */
  tracking.Math = {};

  /**
   * Euclidean distance between two points P(x0, y0) and P(x1, y1).
   * @param {number} x0 Horizontal coordinate of P0.
   * @param {number} y0 Vertical coordinate of P0.
   * @param {number} x1 Horizontal coordinate of P1.
   * @param {number} y1 Vertical coordinate of P1.
   * @return {number} The euclidean distance.
   */
  tracking.Math.distance = function(x0, y0, x1, y1) {
    var dx = x1 - x0;
    var dy = y1 - y0;

    return Math.sqrt(dx * dx + dy * dy);
  };

  /**
   * Calculates the Hamming weight of a string, which is the number of symbols that are
   * different from the zero-symbol of the alphabet used. It is thus
   * equivalent to the Hamming distance from the all-zero string of the same
   * length. For the most typical case, a string of bits, this is the number
   * of 1's in the string.
   *
   * Example:
   *
   * <pre>
   *  Binary string     Hamming weight
   *   11101                 4
   *   11101010              5
   * </pre>
   *
   * @param {number} i Number that holds the binary string to extract the hamming weight.
   * @return {number} The hamming weight.
   */
  tracking.Math.hammingWeight = function(i) {
    i = i - ((i >> 1) & 0x55555555);
    i = (i & 0x33333333) + ((i >> 2) & 0x33333333);

    return ((i + (i >> 4) & 0xF0F0F0F) * 0x1010101) >> 24;
  };

  /**
   * Generates a random number between [a, b] interval.
   * @param {number} a
   * @param {number} b
   * @return {number}
   */
  tracking.Math.uniformRandom = function(a, b) {
    return a + Math.random() * (b - a);
  };

  /**
   * Tests if a rectangle intersects with another.
   *
   *  <pre>
   *  x0y0 --------       x2y2 --------
   *      |       |           |       |
   *      -------- x1y1       -------- x3y3
   * </pre>
   *
   * @param {number} x0 Horizontal coordinate of P0.
   * @param {number} y0 Vertical coordinate of P0.
   * @param {number} x1 Horizontal coordinate of P1.
   * @param {number} y1 Vertical coordinate of P1.
   * @param {number} x2 Horizontal coordinate of P2.
   * @param {number} y2 Vertical coordinate of P2.
   * @param {number} x3 Horizontal coordinate of P3.
   * @param {number} y3 Vertical coordinate of P3.
   * @return {boolean}
   */
  tracking.Math.intersectRect = function(x0, y0, x1, y1, x2, y2, x3, y3) {
    return !(x2 > x1 || x3 < x0 || y2 > y1 || y3 < y0);
  };

}());

(function() {
  /**
   * Matrix utility.
   * @static
   * @constructor
   */
  tracking.Matrix = {};

  /**
   * Loops the array organized as major-row order and executes `fn` callback
   * for each iteration. The `fn` callback receives the following parameters:
   * `(r,g,b,a,index,i,j)`, where `r,g,b,a` represents the pixel color with
   * alpha channel, `index` represents the position in the major-row order
   * array and `i,j` the respective indexes positions in two dimentions.
   * @param {array} pixels The pixels in a linear [r,g,b,a,...] array to loop
   *     through.
   * @param {number} width The image width.
   * @param {number} height The image height.
   * @param {function} fn The callback function for each pixel.
   * @param {number} opt_jump Optional jump for the iteration, by default it
   *     is 1, hence loops all the pixels of the array.
   * @static
   */
  tracking.Matrix.forEach = function(pixels, width, height, fn, opt_jump) {
    opt_jump = opt_jump || 1;
    for (var i = 0; i < height; i += opt_jump) {
      for (var j = 0; j < width; j += opt_jump) {
        var w = i * width * 4 + j * 4;
        fn.call(this, pixels[w], pixels[w + 1], pixels[w + 2], pixels[w + 3], w, i, j);
      }
    }
  };

}());

(function() {
  /**
   * EPnp utility.
   * @static
   * @constructor
   */
  tracking.EPnP = {};

  tracking.EPnP.solve = function(objectPoints, imagePoints, cameraMatrix) {};
}());

(function() {
  /**
   * Tracker utility.
   * @constructor
   * @extends {tracking.EventEmitter}
   */
  tracking.Tracker = function() {
    tracking.Tracker.base(this, 'constructor');
  };

  tracking.inherits(tracking.Tracker, tracking.EventEmitter);

  /**
   * Tracks the pixels on the array. This method is called for each video
   * frame in order to emit `track` event.
   * @param {Uint8ClampedArray} pixels The pixels data to track.
   * @param {number} width The pixels canvas width.
   * @param {number} height The pixels canvas height.
   */
  tracking.Tracker.prototype.track = function() {};
}());

(function() {
  /**
   * TrackerTask utility.
   * @constructor
   * @extends {tracking.EventEmitter}
   */
  tracking.TrackerTask = function(tracker) {
    tracking.TrackerTask.base(this, 'constructor');

    if (!tracker) {
      throw new Error('Tracker instance not specified.');
    }

    this.setTracker(tracker);
  };

  tracking.inherits(tracking.TrackerTask, tracking.EventEmitter);

  /**
   * Holds the tracker instance managed by this task.
   * @type {tracking.Tracker}
   * @private
   */
  tracking.TrackerTask.prototype.tracker_ = null;

  /**
   * Holds if the tracker task is in running.
   * @type {boolean}
   * @private
   */
  tracking.TrackerTask.prototype.running_ = false;

  /**
   * Gets the tracker instance managed by this task.
   * @return {tracking.Tracker}
   */
  tracking.TrackerTask.prototype.getTracker = function() {
    return this.tracker_;
  };

  /**
   * Returns true if the tracker task is in running, false otherwise.
   * @return {boolean}
   * @private
   */
  tracking.TrackerTask.prototype.inRunning = function() {
    return this.running_;
  };

  /**
   * Sets if the tracker task is in running.
   * @param {boolean} running
   * @private
   */
  tracking.TrackerTask.prototype.setRunning = function(running) {
    this.running_ = running;
  };

  /**
   * Sets the tracker instance managed by this task.
   * @return {tracking.Tracker}
   */
  tracking.TrackerTask.prototype.setTracker = function(tracker) {
    this.tracker_ = tracker;
  };

  /**
   * Emits a `run` event on the tracker task for the implementers to run any
   * child action, e.g. `requestAnimationFrame`.
   * @return {object} Returns itself, so calls can be chained.
   */
  tracking.TrackerTask.prototype.run = function() {
    var self = this;

    if (this.inRunning()) {
      return;
    }

    this.setRunning(true);
    this.reemitTrackEvent_ = function(event) {
      self.emit('track', event);
    };
    this.tracker_.on('track', this.reemitTrackEvent_);
    this.emit('run');
    return this;
  };

  /**
   * Emits a `stop` event on the tracker task for the implementers to stop any
   * child action being done, e.g. `requestAnimationFrame`.
   * @return {object} Returns itself, so calls can be chained.
   */
  tracking.TrackerTask.prototype.stop = function() {
    if (!this.inRunning()) {
      return;
    }

    this.setRunning(false);
    this.emit('stop');
    this.tracker_.removeListener('track', this.reemitTrackEvent_);
    return this;
  };
}());

(function() {
  /**
   * ColorTracker utility to track colored blobs in a frrame using color
   * difference evaluation.
   * @constructor
   * @param {string|Array.<string>} opt_colors Optional colors to track.
   * @extends {tracking.Tracker}
   */
  tracking.ColorTracker = function(opt_colors) {
    tracking.ColorTracker.base(this, 'constructor');

    if (typeof opt_colors === 'string') {
      opt_colors = [opt_colors];
    }

    if (opt_colors) {
      opt_colors.forEach(function(color) {
        if (!tracking.ColorTracker.getColor(color)) {
          throw new Error('Color not valid, try `new tracking.ColorTracker("magenta")`.');
        }
      });
      this.setColors(opt_colors);
    }
  };

  tracking.inherits(tracking.ColorTracker, tracking.Tracker);

  /**
   * Holds the known colors.
   * @type {Object.<string, function>}
   * @private
   * @static
   */
  tracking.ColorTracker.knownColors_ = {};

  /**
   * Caches coordinates values of the neighbours surrounding a pixel.
   * @type {Object.<number, Int32Array>}
   * @private
   * @static
   */
  tracking.ColorTracker.neighbours_ = {};

  /**
   * Registers a color as known color.
   * @param {string} name The color name.
   * @param {function} fn The color function to test if the passed (r,g,b) is
   *     the desired color.
   * @static
   */
  tracking.ColorTracker.registerColor = function(name, fn) {
    tracking.ColorTracker.knownColors_[name] = fn;
  };

  /**
   * Gets the known color function that is able to test whether an (r,g,b) is
   * the desired color.
   * @param {string} name The color name.
   * @return {function} The known color test function.
   * @static
   */
  tracking.ColorTracker.getColor = function(name) {
    return tracking.ColorTracker.knownColors_[name];
  };

  /**
   * Holds the colors to be tracked by the `ColorTracker` instance.
   * @default ['magenta']
   * @type {Array.<string>}
   */
  tracking.ColorTracker.prototype.colors = ['magenta'];

  /**
   * Holds the minimum dimension to classify a rectangle.
   * @default 20
   * @type {number}
   */
  tracking.ColorTracker.prototype.minDimension = 20;

  /**
   * Holds the maximum dimension to classify a rectangle.
   * @default Infinity
   * @type {number}
   */
  tracking.ColorTracker.prototype.maxDimension = Infinity;


  /**
   * Holds the minimum group size to be classified as a rectangle.
   * @default 30
   * @type {number}
   */
  tracking.ColorTracker.prototype.minGroupSize = 30;

  /**
   * Calculates the central coordinate from the cloud points. The cloud points
   * are all points that matches the desired color.
   * @param {Array.<number>} cloud Major row order array containing all the
   *     points from the desired color, e.g. [x1, y1, c2, y2, ...].
   * @param {number} total Total numbers of pixels of the desired color.
   * @return {object} Object contaning the x, y and estimated z coordinate of
   *     the blog extracted from the cloud points.
   * @private
   */
  tracking.ColorTracker.prototype.calculateDimensions_ = function(cloud, total) {
    var maxx = -1;
    var maxy = -1;
    var minx = Infinity;
    var miny = Infinity;

    for (var c = 0; c < total; c += 2) {
      var x = cloud[c];
      var y = cloud[c + 1];

      if (x < minx) {
        minx = x;
      }
      if (x > maxx) {
        maxx = x;
      }
      if (y < miny) {
        miny = y;
      }
      if (y > maxy) {
        maxy = y;
      }
    }

    return {
      width: maxx - minx,
      height: maxy - miny,
      x: minx,
      y: miny
    };
  };

  /**
   * Gets the colors being tracked by the `ColorTracker` instance.
   * @return {Array.<string>}
   */
  tracking.ColorTracker.prototype.getColors = function() {
    return this.colors;
  };

  /**
   * Gets the minimum dimension to classify a rectangle.
   * @return {number}
   */
  tracking.ColorTracker.prototype.getMinDimension = function() {
    return this.minDimension;
  };

  /**
   * Gets the maximum dimension to classify a rectangle.
   * @return {number}
   */
  tracking.ColorTracker.prototype.getMaxDimension = function() {
    return this.maxDimension;
  };

  /**
   * Gets the minimum group size to be classified as a rectangle.
   * @return {number}
   */
  tracking.ColorTracker.prototype.getMinGroupSize = function() {
    return this.minGroupSize;
  };

  /**
   * Gets the eight offset values of the neighbours surrounding a pixel.
   * @param {number} width The image width.
   * @return {array} Array with the eight offset values of the neighbours
   *     surrounding a pixel.
   * @private
   */
  tracking.ColorTracker.prototype.getNeighboursForWidth_ = function(width) {
    if (tracking.ColorTracker.neighbours_[width]) {
      return tracking.ColorTracker.neighbours_[width];
    }

    var neighbours = new Int32Array(8);

    neighbours[0] = -width * 4;
    neighbours[1] = -width * 4 + 4;
    neighbours[2] = 4;
    neighbours[3] = width * 4 + 4;
    neighbours[4] = width * 4;
    neighbours[5] = width * 4 - 4;
    neighbours[6] = -4;
    neighbours[7] = -width * 4 - 4;

    tracking.ColorTracker.neighbours_[width] = neighbours;

    return neighbours;
  };

  /**
   * Unites groups whose bounding box intersect with each other.
   * @param {Array.<Object>} rects
   * @private
   */
  tracking.ColorTracker.prototype.mergeRectangles_ = function(rects) {
    var intersects;
    var results = [];
    var minDimension = this.getMinDimension();
    var maxDimension = this.getMaxDimension();

    for (var r = 0; r < rects.length; r++) {
      var r1 = rects[r];
      intersects = true;
      for (var s = r + 1; s < rects.length; s++) {
        var r2 = rects[s];
        if (tracking.Math.intersectRect(r1.x, r1.y, r1.x + r1.width, r1.y + r1.height, r2.x, r2.y, r2.x + r2.width, r2.y + r2.height)) {
          intersects = false;
          var x1 = Math.min(r1.x, r2.x);
          var y1 = Math.min(r1.y, r2.y);
          var x2 = Math.max(r1.x + r1.width, r2.x + r2.width);
          var y2 = Math.max(r1.y + r1.height, r2.y + r2.height);
          r2.height = y2 - y1;
          r2.width = x2 - x1;
          r2.x = x1;
          r2.y = y1;
          break;
        }
      }

      if (intersects) {
        if (r1.width >= minDimension && r1.height >= minDimension) {
          if (r1.width <= maxDimension && r1.height <= maxDimension) {
            results.push(r1);
          }
        }
      }
    }

    return results;
  };

  /**
   * Sets the colors to be tracked by the `ColorTracker` instance.
   * @param {Array.<string>} colors
   */
  tracking.ColorTracker.prototype.setColors = function(colors) {
    this.colors = colors;
  };

  /**
   * Sets the minimum dimension to classify a rectangle.
   * @param {number} minDimension
   */
  tracking.ColorTracker.prototype.setMinDimension = function(minDimension) {
    this.minDimension = minDimension;
  };

  /**
   * Sets the maximum dimension to classify a rectangle.
   * @param {number} maxDimension
   */
  tracking.ColorTracker.prototype.setMaxDimension = function(maxDimension) {
    this.maxDimension = maxDimension;
  };

  /**
   * Sets the minimum group size to be classified as a rectangle.
   * @param {number} minGroupSize
   */
  tracking.ColorTracker.prototype.setMinGroupSize = function(minGroupSize) {
    this.minGroupSize = minGroupSize;
  };

  /**
   * Tracks the `Video` frames. This method is called for each video frame in
   * order to emit `track` event.
   * @param {Uint8ClampedArray} pixels The pixels data to track.
   * @param {number} width The pixels canvas width.
   * @param {number} height The pixels canvas height.
   */
  tracking.ColorTracker.prototype.track = function(pixels, width, height) {
    var self = this;
    var colors = this.getColors();

    if (!colors) {
      throw new Error('Colors not specified, try `new tracking.ColorTracker("magenta")`.');
    }

    var results = [];

    colors.forEach(function(color) {
      results = results.concat(self.trackColor_(pixels, width, height, color));
    });

    this.emit('track', {
      data: results
    });
  };

  /**
   * Find the given color in the given matrix of pixels using Flood fill
   * algorithm to determines the area connected to a given node in a
   * multi-dimensional array.
   * @param {Uint8ClampedArray} pixels The pixels data to track.
   * @param {number} width The pixels canvas width.
   * @param {number} height The pixels canvas height.
   * @param {string} color The color to be found
   * @private
   */
  tracking.ColorTracker.prototype.trackColor_ = function(pixels, width, height, color) {
    var colorFn = tracking.ColorTracker.knownColors_[color];
    var currGroup = new Int32Array(pixels.length >> 2);
    var currGroupSize;
    var currI;
    var currJ;
    var currW;
    var marked = new Int8Array(pixels.length);
    var minGroupSize = this.getMinGroupSize();
    var neighboursW = this.getNeighboursForWidth_(width);
    var queue = new Int32Array(pixels.length);
    var queuePosition;
    var results = [];
    var w = -4;

    if (!colorFn) {
      return results;
    }

    for (var i = 0; i < height; i++) {
      for (var j = 0; j < width; j++) {
        w += 4;

        if (marked[w]) {
          continue;
        }

        currGroupSize = 0;

        queuePosition = -1;
        queue[++queuePosition] = w;
        queue[++queuePosition] = i;
        queue[++queuePosition] = j;

        marked[w] = 1;

        while (queuePosition >= 0) {
          currJ = queue[queuePosition--];
          currI = queue[queuePosition--];
          currW = queue[queuePosition--];

          if (colorFn(pixels[currW], pixels[currW + 1], pixels[currW + 2], pixels[currW + 3], currW, currI, currJ)) {
            currGroup[currGroupSize++] = currJ;
            currGroup[currGroupSize++] = currI;

            for (var k = 0; k < neighboursW.length; k++) {
              var otherW = currW + neighboursW[k];
              var otherI = currI + neighboursI[k];
              var otherJ = currJ + neighboursJ[k];
              if (!marked[otherW] && otherI >= 0 && otherI < height && otherJ >= 0 && otherJ < width) {
                queue[++queuePosition] = otherW;
                queue[++queuePosition] = otherI;
                queue[++queuePosition] = otherJ;

                marked[otherW] = 1;
              }
            }
          }
        }

        if (currGroupSize >= minGroupSize) {
          var data = this.calculateDimensions_(currGroup, currGroupSize);
          if (data) {
            data.color = color;
            results.push(data);
          }
        }
      }
    }

    return this.mergeRectangles_(results);
  };

  // Default colors
  //===================

  tracking.ColorTracker.registerColor('cyan', function(r, g, b) {
    var thresholdGreen = 50,
      thresholdBlue = 70,
      dx = r - 0,
      dy = g - 255,
      dz = b - 255;

    if ((g - r) >= thresholdGreen && (b - r) >= thresholdBlue) {
      return true;
    }
    return dx * dx + dy * dy + dz * dz < 6400;
  });

  tracking.ColorTracker.registerColor('magenta', function(r, g, b) {
    var threshold = 50,
      dx = r - 255,
      dy = g - 0,
      dz = b - 255;

    if ((r - g) >= threshold && (b - g) >= threshold) {
      return true;
    }
    return dx * dx + dy * dy + dz * dz < 19600;
  });

  tracking.ColorTracker.registerColor('yellow', function(r, g, b) {
    var threshold = 50,
      dx = r - 255,
      dy = g - 255,
      dz = b - 0;

    if ((r - b) >= threshold && (g - b) >= threshold) {
      return true;
    }
    return dx * dx + dy * dy + dz * dz < 10000;
  });


  // Caching neighbour i/j offset values.
  //=====================================
  var neighboursI = new Int32Array([-1, -1, 0, 1, 1, 1, 0, -1]);
  var neighboursJ = new Int32Array([0, 1, 1, 1, 0, -1, -1, -1]);
}());

(function() {
  /**
   * ObjectTracker utility.
   * @constructor
   * @param {string|Array.<string|Array.<number>>} opt_classifiers Optional
   *     object classifiers to track.
   * @extends {tracking.Tracker}
   */
  tracking.ObjectTracker = function(opt_classifiers) {
    tracking.ObjectTracker.base(this, 'constructor');

    if (opt_classifiers) {
      if (!Array.isArray(opt_classifiers)) {
        opt_classifiers = [opt_classifiers];
      }

      if (Array.isArray(opt_classifiers)) {
        opt_classifiers.forEach(function(classifier, i) {
          if (typeof classifier === 'string') {
            opt_classifiers[i] = tracking.ViolaJones.classifiers[classifier];
          }
          if (!opt_classifiers[i]) {
            throw new Error('Object classifier not valid, try `new tracking.ObjectTracker("face")`.');
          }
        });
      }
    }

    this.setClassifiers(opt_classifiers);
  };

  tracking.inherits(tracking.ObjectTracker, tracking.Tracker);

  /**
   * Specifies the edges density of a block in order to decide whether to skip
   * it or not.
   * @default 0.2
   * @type {number}
   */
  tracking.ObjectTracker.prototype.edgesDensity = 0.2;

  /**
   * Specifies the initial scale to start the feature block scaling.
   * @default 1.0
   * @type {number}
   */
  tracking.ObjectTracker.prototype.initialScale = 1.0;

  /**
   * Specifies the scale factor to scale the feature block.
   * @default 1.25
   * @type {number}
   */
  tracking.ObjectTracker.prototype.scaleFactor = 1.25;

  /**
   * Specifies the block step size.
   * @default 1.5
   * @type {number}
   */
  tracking.ObjectTracker.prototype.stepSize = 1.5;

  /**
   * Gets the tracker HAAR classifiers.
   * @return {TypedArray.<number>}
   */
  tracking.ObjectTracker.prototype.getClassifiers = function() {
    return this.classifiers;
  };

  /**
   * Gets the edges density value.
   * @return {number}
   */
  tracking.ObjectTracker.prototype.getEdgesDensity = function() {
    return this.edgesDensity;
  };

  /**
   * Gets the initial scale to start the feature block scaling.
   * @return {number}
   */
  tracking.ObjectTracker.prototype.getInitialScale = function() {
    return this.initialScale;
  };

  /**
   * Gets the scale factor to scale the feature block.
   * @return {number}
   */
  tracking.ObjectTracker.prototype.getScaleFactor = function() {
    return this.scaleFactor;
  };

  /**
   * Gets the block step size.
   * @return {number}
   */
  tracking.ObjectTracker.prototype.getStepSize = function() {
    return this.stepSize;
  };

  /**
   * Tracks the `Video` frames. This method is called for each video frame in
   * order to emit `track` event.
   * @param {Uint8ClampedArray} pixels The pixels data to track.
   * @param {number} width The pixels canvas width.
   * @param {number} height The pixels canvas height.
   */
  tracking.ObjectTracker.prototype.track = function(pixels, width, height) {
    var self = this;
    var classifiers = this.getClassifiers();

    if (!classifiers) {
      throw new Error('Object classifier not specified, try `new tracking.ObjectTracker("face")`.');
    }

    var results = [];

    classifiers.forEach(function(classifier) {
      results = results.concat(tracking.ViolaJones.detect(pixels, width, height, self.getInitialScale(), self.getScaleFactor(), self.getStepSize(), self.getEdgesDensity(), classifier));
    });

    this.emit('track', {
      data: results
    });
  };

  /**
   * Sets the tracker HAAR classifiers.
   * @param {TypedArray.<number>} classifiers
   */
  tracking.ObjectTracker.prototype.setClassifiers = function(classifiers) {
    this.classifiers = classifiers;
  };

  /**
   * Sets the edges density.
   * @param {number} edgesDensity
   */
  tracking.ObjectTracker.prototype.setEdgesDensity = function(edgesDensity) {
    this.edgesDensity = edgesDensity;
  };

  /**
   * Sets the initial scale to start the block scaling.
   * @param {number} initialScale
   */
  tracking.ObjectTracker.prototype.setInitialScale = function(initialScale) {
    this.initialScale = initialScale;
  };

  /**
   * Sets the scale factor to scale the feature block.
   * @param {number} scaleFactor
   */
  tracking.ObjectTracker.prototype.setScaleFactor = function(scaleFactor) {
    this.scaleFactor = scaleFactor;
  };

  /**
   * Sets the block step size.
   * @param {number} stepSize
   */
  tracking.ObjectTracker.prototype.setStepSize = function(stepSize) {
    this.stepSize = stepSize;
  };

}());

; browserify_shim__define__module__export__(typeof tracking != "undefined" ? tracking : window.tracking);

}).call(global, undefined, undefined, undefined, undefined, function defineExport(ex) { module.exports = ex; });

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
