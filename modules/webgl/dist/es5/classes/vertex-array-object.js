"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _resource = _interopRequireDefault(require("./resource"));

var _buffer = _interopRequireDefault(require("./buffer"));

var _webglUtils = require("../webgl-utils");

var _arrayUtilsFlat = require("../utils/array-utils-flat");

var _utils = require("../utils");

var _probe = require("probe.gl");

var OES_vertex_array_object = 'OES_vertex_array_object';
var ERR_ELEMENTS = 'elements must be GL.ELEMENT_ARRAY_BUFFER';

var VertexArrayObject = function (_Resource) {
  (0, _inherits2["default"])(VertexArrayObject, _Resource);
  (0, _createClass2["default"])(VertexArrayObject, null, [{
    key: "isSupported",
    value: function isSupported(gl) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (options.constantAttributeZero) {
        return (0, _webglUtils.isWebGL2)(gl) || (0, _probe.getBrowser)() === 'Chrome';
      }

      return (0, _webglUtils.isWebGL2)(gl) || gl.getExtension(OES_vertex_array_object);
    }
  }, {
    key: "getDefaultArray",
    value: function getDefaultArray(gl) {
      gl.luma = gl.luma || {};

      if (!gl.luma.defaultVertexArray) {
        gl.luma.defaultVertexArray = new VertexArrayObject(gl, {
          handle: null
        });
      }

      return gl.luma.defaultVertexArray;
    }
  }, {
    key: "getMaxAttributes",
    value: function getMaxAttributes(gl) {
      VertexArrayObject.MAX_ATTRIBUTES = VertexArrayObject.MAX_ATTRIBUTES || gl.getParameter(34921);
      return VertexArrayObject.MAX_ATTRIBUTES;
    }
  }, {
    key: "setConstant",
    value: function setConstant(gl, location, array) {
      switch (array.constructor) {
        case Float32Array:
          VertexArrayObject._setConstantFloatArray(gl, location, array);

          break;

        case Int32Array:
          VertexArrayObject._setConstantIntArray(gl, location, array);

          break;

        case Uint32Array:
          VertexArrayObject._setConstantUintArray(gl, location, array);

          break;

        default:
          (0, _utils.assert)(false);
      }
    }
  }]);

  function VertexArrayObject(gl) {
    var _this;

    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck2["default"])(this, VertexArrayObject);
    var id = opts.id || opts.program && opts.program.id;
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(VertexArrayObject).call(this, gl, Object.assign({}, opts, {
      id: id
    })));
    _this.hasVertexArrays = VertexArrayObject.isSupported(gl);
    _this.buffer = null;
    _this.bufferValue = null;

    _this.initialize(opts);

    Object.seal((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  (0, _createClass2["default"])(VertexArrayObject, [{
    key: "delete",
    value: function _delete() {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(VertexArrayObject.prototype), "delete", this).call(this);

      if (this.buffer) {
        this.buffer["delete"]();
      }
    }
  }, {
    key: "initialize",
    value: function initialize() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.setProps(props);
    }
  }, {
    key: "setProps",
    value: function setProps(props) {
      return this;
    }
  }, {
    key: "setElementBuffer",
    value: function setElementBuffer() {
      var _this2 = this;

      var elementBuffer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      (0, _utils.assert)(!elementBuffer || elementBuffer.target === 34963, ERR_ELEMENTS);
      this.bind(function () {
        _this2.gl.bindBuffer(34963, elementBuffer ? elementBuffer.handle : null);
      });
      return this;
    }
  }, {
    key: "setBuffer",
    value: function setBuffer(location, buffer, accessor) {
      if (buffer.target === 34963) {
        return this.setElementBuffer(buffer, accessor);
      }

      var size = accessor.size,
          type = accessor.type,
          stride = accessor.stride,
          offset = accessor.offset,
          normalized = accessor.normalized,
          integer = accessor.integer,
          divisor = accessor.divisor;
      var gl = this.gl;
      location = Number(location);
      this.bind(function () {
        gl.bindBuffer(34962, buffer.handle);

        if (integer) {
          (0, _utils.assert)((0, _webglUtils.isWebGL2)(gl));
          gl.vertexAttribIPointer(location, size, type, stride, offset);
        } else {
          gl.vertexAttribPointer(location, size, type, normalized, stride, offset);
        }

        gl.enableVertexAttribArray(location);
        gl.vertexAttribDivisor(location, divisor || 0);
      });
      return this;
    }
  }, {
    key: "enable",
    value: function enable(location) {
      var _this3 = this;

      var _enable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var disablingAttributeZero = !_enable && location === 0 && !VertexArrayObject.isSupported(this.gl, {
        constantAttributeZero: true
      });

      if (!disablingAttributeZero) {
        location = Number(location);
        this.bind(function () {
          return _enable ? _this3.gl.enableVertexAttribArray(location) : _this3.gl.disableVertexAttribArray(location);
        });
      }

      return this;
    }
  }, {
    key: "getConstantBuffer",
    value: function getConstantBuffer(elementCount, value, accessor) {
      var constantValue = this._normalizeConstantArrayValue(value, accessor);

      var byteLength = constantValue.byteLength * elementCount;
      var length = constantValue.length * elementCount;
      var updateNeeded = !this.buffer;
      this.buffer = this.buffer || new _buffer["default"](this.gl, byteLength);
      updateNeeded = updateNeeded || this.buffer.reallocate(byteLength);
      updateNeeded = updateNeeded || !this._compareConstantArrayValues(constantValue, this.bufferValue);

      if (updateNeeded) {
        var typedArray = (0, _arrayUtilsFlat.getScratchArray)(value.constructor, length);
        (0, _arrayUtilsFlat.fillArray)({
          target: typedArray,
          source: constantValue,
          start: 0,
          count: length
        });
        this.buffer.subData(typedArray);
        this.bufferValue = value;
      }

      return this.buffer;
    }
  }, {
    key: "_normalizeConstantArrayValue",
    value: function _normalizeConstantArrayValue(arrayValue, accessor) {
      if (Array.isArray(arrayValue)) {
        return new Float32Array(arrayValue);
      }

      return arrayValue;
    }
  }, {
    key: "_compareConstantArrayValues",
    value: function _compareConstantArrayValues(v1, v2) {
      if (!v1 || !v2 || v1.length !== v2.length || v1.constructor !== v2.constructor) {
        return false;
      }

      for (var i = 0; i < v1.length; ++i) {
        if (v1[i] !== v2[i]) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "_createHandle",
    value: function _createHandle() {
      this.hasVertexArrays = VertexArrayObject.isSupported(this.gl);

      if (this.hasVertexArrays) {
        return this.gl.createVertexArray();
      }

      return null;
    }
  }, {
    key: "_deleteHandle",
    value: function _deleteHandle(handle) {
      if (this.hasVertexArrays) {
        this.gl.deleteVertexArray(handle);
      }

      return [this.elements];
    }
  }, {
    key: "_bindHandle",
    value: function _bindHandle(handle) {
      if (this.hasVertexArrays) {
        this.gl.bindVertexArray(handle);
      }
    }
  }, {
    key: "_getParameter",
    value: function _getParameter(pname, _ref) {
      var _this4 = this;

      var location = _ref.location;
      (0, _utils.assert)(Number.isFinite(location));
      return this.bind(function () {
        switch (pname) {
          case 34373:
            return _this4.gl.getVertexAttribOffset(location, pname);

          default:
            return _this4.gl.getVertexAttrib(location, pname);
        }
      });
    }
  }, {
    key: "MAX_ATTRIBUTES",
    get: function get() {
      return VertexArrayObject.getMaxAttributes(this.gl);
    }
  }], [{
    key: "_setConstantFloatArray",
    value: function _setConstantFloatArray(gl, location, array) {
      switch (array.length) {
        case 1:
          gl.vertexAttrib1fv(location, array);
          break;

        case 2:
          gl.vertexAttrib2fv(location, array);
          break;

        case 3:
          gl.vertexAttrib3fv(location, array);
          break;

        case 4:
          gl.vertexAttrib4fv(location, array);
          break;

        default:
          (0, _utils.assert)(false);
      }
    }
  }, {
    key: "_setConstantIntArray",
    value: function _setConstantIntArray(gl, location, array) {
      (0, _utils.assert)((0, _webglUtils.isWebGL2)(gl));

      switch (array.length) {
        case 1:
          gl.vertexAttribI1iv(location, array);
          break;

        case 2:
          gl.vertexAttribI2iv(location, array);
          break;

        case 3:
          gl.vertexAttribI3iv(location, array);
          break;

        case 4:
          gl.vertexAttribI4iv(location, array);
          break;

        default:
          (0, _utils.assert)(false);
      }
    }
  }, {
    key: "_setConstantUintArray",
    value: function _setConstantUintArray(gl, location, array) {
      (0, _utils.assert)((0, _webglUtils.isWebGL2)(gl));

      switch (array.length) {
        case 1:
          gl.vertexAttribI1uiv(location, array);
          break;

        case 2:
          gl.vertexAttribI2uiv(location, array);
          break;

        case 3:
          gl.vertexAttribI3uiv(location, array);
          break;

        case 4:
          gl.vertexAttribI4uiv(location, array);
          break;

        default:
          (0, _utils.assert)(false);
      }
    }
  }]);
  return VertexArrayObject;
}(_resource["default"]);

exports["default"] = VertexArrayObject;
//# sourceMappingURL=vertex-array-object.js.map