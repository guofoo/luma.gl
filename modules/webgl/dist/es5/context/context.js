"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isWebGL = isWebGL;
exports.isWebGL2 = isWebGL2;
exports.assertWebGLContext = assertWebGLContext;
exports.assertWebGL2Context = assertWebGL2Context;
exports.setGLContextDefaults = setGLContextDefaults;
exports.createGLContext = createGLContext;
exports.instrumentGLContext = instrumentGLContext;
exports.destroyGLContext = destroyGLContext;
exports.resizeGLContext = resizeGLContext;
exports.ERR_WEBGL2 = exports.ERR_WEBGL = exports.ERR_CONTEXT = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _webglStateTracker = require("@luma.gl/webgl-state-tracker");

var _createHeadlessContext = require("./create-headless-context");

var _createCanvas = require("./create-canvas");

var _createBrowserContext = require("./create-browser-context");

var _getContextDebugInfo = require("../debug/get-context-debug-info");

var _webglUtils = require("../webgl-utils");

var _utils = require("../utils");

var _globals = require("../utils/globals");

var ERR_CONTEXT = 'Invalid WebGLRenderingContext';
exports.ERR_CONTEXT = ERR_CONTEXT;
var ERR_WEBGL = ERR_CONTEXT;
exports.ERR_WEBGL = ERR_WEBGL;
var ERR_WEBGL2 = 'Requires WebGL2';
exports.ERR_WEBGL2 = ERR_WEBGL2;

function isWebGL(gl) {
  return Boolean(gl && Number.isFinite(gl._version));
}

function isWebGL2(gl) {
  return Boolean(gl && gl._version === 2);
}

function assertWebGLContext(gl) {
  (0, _utils.assert)(isWebGL(gl), ERR_CONTEXT);
}

function assertWebGL2Context(gl) {
  (0, _utils.assert)(isWebGL2(gl), ERR_WEBGL2);
}

var contextDefaults = {
  webgl2: true,
  webgl1: true,
  throwOnFailure: true,
  manageState: true,
  canvas: null,
  debug: false,
  width: 800,
  height: 600
};

function setGLContextDefaults() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  Object.assign(contextDefaults, {
    width: 1,
    height: 1
  }, options);
}

function createGLContext() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  options = Object.assign({}, contextDefaults, options);
  var _options = options,
      width = _options.width,
      height = _options.height;

  function onError(message) {
    if (options.throwOnError) {
      throw new Error(message);
    }

    return null;
  }

  var gl;

  if (_utils.isBrowser) {
    var _options2 = options,
        canvas = _options2.canvas;
    var targetCanvas = (0, _createCanvas.getCanvas)({
      canvas: canvas,
      width: width,
      height: height,
      onError: onError
    });
    gl = (0, _createBrowserContext.createBrowserContext)(targetCanvas, options);
  } else {
    gl = (0, _createHeadlessContext.createHeadlessContext)((0, _objectSpread2["default"])({}, options, {
      width: width,
      height: height,
      onError: onError
    }));
  }

  if (!gl) {
    return null;
  }

  gl = instrumentGLContext(gl, options);
  logInfo(gl);
  return gl;
}

function instrumentGLContext(gl) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (gl._instrumented) {
    return gl;
  }

  gl._version = gl._version || getVersion(gl);
  options = Object.assign({}, contextDefaults, options);
  var _options3 = options,
      manageState = _options3.manageState,
      debug = _options3.debug;

  if (manageState) {
    (0, _webglStateTracker.trackContextState)(gl, {
      copyState: false,
      log: function log() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _utils.log.log.apply(_utils.log, [1].concat(args))();
      }
    });
  }

  if (_utils.isBrowser && debug) {
    if (!_globals.global.makeDebugContext) {
      _utils.log.warn('WebGL debug mode not activated. import "@luma.gl/debug" to enable.')();
    } else {
      gl = _globals.global.makeDebugContext(gl, {
        debug: debug
      });
      _utils.log.priority = Math.max(_utils.log.priority, 1);
    }
  }

  gl._instrumented = true;
  return gl;
}

function destroyGLContext(gl) {
  var ext = gl.getExtension('STACKGL_destroy_context');

  if (ext) {
    ext.destroy();
  }
}

function resizeGLContext(gl) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (gl.canvas) {
    var devicePixelRatio = options.useDevicePixels ? window.devicePixelRatio || 1 : 1;
    var width = "width" in options ? options.width : gl.canvas.clientWidth;
    var height = "height" in options ? options.height : gl.canvas.clientHeight;
    gl.canvas.width = width * devicePixelRatio;
    gl.canvas.height = height * devicePixelRatio;
    return;
  }

  var ext = gl.getExtension('STACKGL_resize_drawingbuffer');

  if (ext && "width" in options && "height" in options) {
    ext.resize(options.width, options.height);
  }
}

function logInfo(gl) {
  var webGL = isWebGL2(gl) ? 'WebGL2' : 'WebGL1';
  var info = (0, _getContextDebugInfo.getContextDebugInfo)(gl);
  var driver = info ? "(".concat(info.vendor, ",").concat(info.renderer, ")") : '';
  var debug = gl.debug ? ' debug' : '';

  _utils.log.once(1, "".concat(webGL).concat(debug, " context ").concat(driver))();
}

function getVersion(gl) {
  if (typeof _webglUtils.WebGL2RenderingContext !== 'undefined' && gl instanceof _webglUtils.WebGL2RenderingContext) {
    return 2;
  }

  return 1;
}
//# sourceMappingURL=context.js.map