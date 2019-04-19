"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = trackContextState;
exports.pushContextState = pushContextState;
exports.popContextState = popContextState;
exports.deepEqual = exports.clone = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _webglFunctionToParametersTable = _interopRequireDefault(require("./webgl-function-to-parameters-table"));

var _webglParameterTables = require("../unified-parameter-api/webgl-parameter-tables");

var _unifiedParameterApi = require("../unified-parameter-api/unified-parameter-api");

var _utils = require("../utils");

var clone = function clone(x) {
  return Array.isArray(x) || ArrayBuffer.isView(x) ? x.slice() : x;
};

exports.clone = clone;

var deepEqual = function deepEqual(x, y) {
  var isArrayX = Array.isArray(x) || ArrayBuffer.isView(x);
  var isArrayY = Array.isArray(y) || ArrayBuffer.isView(y);

  if (isArrayX && isArrayY && x.length === y.length) {
    for (var i = 0; i < x.length; ++i) {
      if (x[i] !== y[i]) {
        return false;
      }
    }

    return true;
  }

  return x === y;
};

exports.deepEqual = deepEqual;

function installGetterOverride(gl, functionName) {
  var originalGetterFunc = gl[functionName].bind(gl);

  gl[functionName] = function get() {
    var pname = arguments.length <= 0 ? undefined : arguments[0];

    if (!(pname in gl.state.cache)) {
      gl.state.cache[pname] = originalGetterFunc.apply(void 0, arguments);
    }

    return gl.state.enable ? gl.state.cache[pname] : originalGetterFunc.apply(void 0, arguments);
  };

  Object.defineProperty(gl[functionName], 'name', {
    value: "".concat(functionName, "-from-cache"),
    configurable: false
  });
}

function installSetterSpy(gl, functionName, setter) {
  var originalSetterFunc = gl[functionName].bind(gl);

  gl[functionName] = function set() {
    for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    var _setter = setter.apply(void 0, [gl.state._updateCache].concat(params)),
        valueChanged = _setter.valueChanged,
        oldValue = _setter.oldValue;

    if (valueChanged) {
      var _gl$state;

      (_gl$state = gl.state).log.apply(_gl$state, ["gl.".concat(functionName)].concat(params));

      originalSetterFunc.apply(void 0, params);
    }

    return oldValue;
  };

  Object.defineProperty(gl[functionName], 'name', {
    value: "".concat(functionName, "-to-cache"),
    configurable: false
  });
}

var GLState = function () {
  function GLState(gl) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$copyState = _ref.copyState,
        copyState = _ref$copyState === void 0 ? false : _ref$copyState,
        _ref$log = _ref.log,
        log = _ref$log === void 0 ? function () {} : _ref$log;

    (0, _classCallCheck2["default"])(this, GLState);
    this.gl = gl;
    this.stateStack = [];
    this.enable = true;
    this.cache = copyState ? (0, _unifiedParameterApi.getParameters)(gl) : Object.assign({}, _webglParameterTables.GL_PARAMETER_DEFAULTS);
    this.log = log;
    this._updateCache = this._updateCache.bind(this);
    Object.seal(this);
  }

  (0, _createClass2["default"])(GLState, [{
    key: "push",
    value: function push() {
      var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.stateStack.push({});
    }
  }, {
    key: "pop",
    value: function pop() {
      (0, _utils.assert)(this.stateStack.length > 0);
      var oldValues = this.stateStack[this.stateStack.length - 1];
      (0, _unifiedParameterApi.setParameters)(this.gl, oldValues, this.cache);
      this.stateStack.pop();
    }
  }, {
    key: "_updateCache",
    value: function _updateCache(values) {
      var valueChanged = false;
      var oldValue;
      var oldValues = this.stateStack.length > 0 && this.stateStack[this.stateStack.length - 1];

      for (var key in values) {
        (0, _utils.assert)(key !== undefined);

        if (!deepEqual(values[key], this.cache[key])) {
          valueChanged = true;
          oldValue = this.cache[key];

          if (oldValues && !(key in oldValues)) {
            oldValues[key] = this.cache[key];
          }

          this.cache[key] = values[key];
        }
      }

      return {
        valueChanged: valueChanged,
        oldValue: oldValue
      };
    }
  }]);
  return GLState;
}();

function trackContextState(gl) {
  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref2$enable = _ref2.enable,
      enable = _ref2$enable === void 0 ? true : _ref2$enable,
      copyState = _ref2.copyState;

  (0, _utils.assert)(copyState !== undefined);

  if (!gl.state) {
    var global_ = typeof global !== 'undefined' ? global : window;

    if (global_.polyfillContext) {
      global_.polyfillContext(gl);
    }

    gl.state = new GLState(gl, {
      copyState: copyState,
      enable: enable
    });

    for (var key in _webglFunctionToParametersTable["default"]) {
      var setter = _webglFunctionToParametersTable["default"][key];
      installSetterSpy(gl, key, setter);
    }

    installGetterOverride(gl, 'getParameter');
    installGetterOverride(gl, 'isEnabled');
  }

  gl.state.enable = enable;
  return gl;
}

function pushContextState(gl) {
  if (!gl.state) {
    trackContextState(gl, {
      copyState: false
    });
  }

  gl.state.push();
}

function popContextState(gl) {
  (0, _utils.assert)(gl.state);
  gl.state.pop();
}
//# sourceMappingURL=track-context-state.js.map