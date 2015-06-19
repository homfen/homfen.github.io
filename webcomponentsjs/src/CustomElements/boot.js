/**
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
(function(scope){

// imports
var useNative = scope.useNative;
var initializeModules = scope.initializeModules;

var isIE11OrOlder = /Trident/.test(navigator.userAgent);

// If native, setup stub api and bail.
// NOTE: we fire `WebComponentsReady` under native for api compatibility
if (useNative) {
  // stub
  var nop = function() {};

  // exports
  scope.watchShadow = nop;
  scope.upgrade = nop;
  scope.upgradeAll = nop;
  scope.upgradeDocumentTree = nop;
  scope.upgradeSubtree = nop;
  scope.takeRecords = nop;

  scope.instanceof = function(obj, base) {
    return obj instanceof base;
  };

} else {
  // Initialize polyfill modules. Note, polyfill modules are loaded but not
  // executed; this is a convenient way to control which modules run when
  // the polyfill is required and allows the polyfill to load even when it's
  // not needed.
  initializeModules();
}

// imports
var upgradeDocumentTree = scope.upgradeDocumentTree;

// ShadowDOM polyfill wraps elements but some elements like `document`
// cannot be wrapped so we help the polyfill by wrapping some elements.
if (!window.wrap) {
  if (window.ShadowDOMPolyfill) {
    window.wrap = window.ShadowDOMPolyfill.wrapIfNeeded;
    window.unwrap = window.ShadowDOMPolyfill.unwrapIfNeeded;
  } else {
    window.wrap = window.unwrap = function(node) {
      return node;
    };
  }
}


// bootstrap parsing
function bootstrap() {
  // parse document
  upgradeDocumentTree(window.wrap(document));
  // install upgrade hook if HTMLImports are available
  if (window.HTMLImports) {
    window.HTMLImports.__importsParsingHook = function(elt) {
      upgradeDocumentTree(window.wrap(elt.import));
      //CustomElements.parser.parse(elt.import);
    };
  }
  // set internal 'ready' flag, now document.registerElement will trigger
  // synchronous upgrades
  window.CustomElements.ready = true;
  // async to ensure *native* custom elements upgrade prior to this
  // DOMContentLoaded can fire before elements upgrade (e.g. when there's
  // an external script)
  setTimeout(function() {
    // capture blunt profiling data
    window.CustomElements.readyTime = Date.now();
    if (window.HTMLImports) {
      window.CustomElements.elapsed = window.CustomElements.readyTime - window.HTMLImports.readyTime;
    }
    // notify the system that we are bootstrapped
    document.dispatchEvent(
      new CustomEvent('WebComponentsReady', {bubbles: true})
    );
  });
}

// CustomEvent shim for IE <= 11
// NOTE: we explicitly test for IE since Safari has a type `object` CustomEvent
if (isIE11OrOlder && (typeof window.CustomEvent !== 'function')) {
  window.CustomEvent = function(inType, params) {
    params = params || {};
    var e = document.createEvent('CustomEvent');
    e.initCustomEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable), params.detail);
    // IE does not set `defaultPrevented` when `preventDefault()` is called on
    // CustomEvents
    // http://stackoverflow.com/questions/23349191/event-preventdefault-is-not-working-in-ie-11-for-custom-events
    e.preventDefault = function() {
      Object.defineProperty(this, 'defaultPrevented', {
        get: function() {
          return true;
        }
      });
    };
    return e;
  };
  window.CustomEvent.prototype = window.Event.prototype;
}

// When loading at readyState complete time (or via flag), boot custom elements
// immediately.
// If relevant, HTMLImports must already be loaded.
if (document.readyState === 'complete' || scope.flags.eager) {
  bootstrap();
// When loading at readyState interactive time, bootstrap only if HTMLImports
// are not pending. Also avoid IE as the semantics of this state are unreliable.
} else if (document.readyState === 'interactive' && !window.attachEvent &&
    (!window.HTMLImports || window.HTMLImports.ready)) {
  bootstrap();
// When loading at other readyStates, wait for the appropriate DOM event to
// bootstrap.
} else {
  var loadEvent = window.HTMLImports && !window.HTMLImports.ready ?
      'HTMLImportsLoaded' : 'DOMContentLoaded';
  window.addEventListener(loadEvent, bootstrap);
}

// exports
scope.isIE11OrOlder = isIE11OrOlder;

})(window.CustomElements);
