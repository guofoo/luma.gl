"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.DRAW_MODE = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _utils = require("../utils");

var DRAW_MODE = {
  POINTS: 0x0000,
  LINES: 0x0001,
  LINE_LOOP: 0x0002,
  LINE_STRIP: 0x0003,
  TRIANGLES: 0x0004,
  TRIANGLE_STRIP: 0x0005,
  TRIANGLE_FAN: 0x0006
};
exports.DRAW_MODE = DRAW_MODE;

var Geometry = function () {
  (0, _createClass2["default"])(Geometry, null, [{
    key: "DRAW_MODE",
    get: function get() {
      return DRAW_MODE;
    }
  }]);

  function Geometry() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, Geometry);
    var _props$id = props.id,
        id = _props$id === void 0 ? (0, _utils.uid)('geometry') : _props$id,
        _props$drawMode = props.drawMode,
        drawMode = _props$drawMode === void 0 ? DRAW_MODE.TRIANGLES : _props$drawMode,
        mode = props.mode,
        _props$attributes = props.attributes,
        attributes = _props$attributes === void 0 ? {} : _props$attributes,
        _props$indices = props.indices,
        indices = _props$indices === void 0 ? null : _props$indices,
        _props$vertexCount = props.vertexCount,
        vertexCount = _props$vertexCount === void 0 ? null : _props$vertexCount;
    this.id = id;
    this.drawMode = drawMode | 0 || mode | 0;
    this.attributes = {};
    this.userData = {};

    this._setAttributes(attributes, indices);

    this.vertexCount = vertexCount || this._calculateVertexCount(this.attributes, this.indices);
  }

  (0, _createClass2["default"])(Geometry, [{
    key: "getVertexCount",
    value: function getVertexCount() {
      return this.vertexCount;
    }
  }, {
    key: "getAttributes",
    value: function getAttributes() {
      return this.indices ? (0, _objectSpread2["default"])({
        indices: this.indices
      }, this.attributes) : this.attributes;
    }
  }, {
    key: "_print",
    value: function _print(attributeName) {
      return "Geometry ".concat(this.id, " attribute ").concat(attributeName);
    }
  }, {
    key: "_setAttributes",
    value: function _setAttributes(attributes, indices) {
      if (indices) {
        this.indices = ArrayBuffer.isView(indices) ? {
          value: indices,
          size: 1
        } : indices;
      }

      for (var attributeName in attributes) {
        var attribute = attributes[attributeName];
        attribute = ArrayBuffer.isView(attribute) ? {
          value: attribute
        } : attribute;
        (0, _utils.assert)(ArrayBuffer.isView(attribute.value), "".concat(this._print(attributeName), ": must be typed array or object with value as typed array"));

        if (attributeName === 'indices') {
          (0, _utils.assert)(!this.indices);
          this.indices = attribute;

          if (this.indices.isIndexed !== undefined) {
            this.indices = Object.assign({}, this.indices);
            delete this.indices.isIndexed;
          }
        } else {
          this.attributes[attributeName] = attribute;
        }
      }

      return this;
    }
  }, {
    key: "_calculateVertexCount",
    value: function _calculateVertexCount(attributes, indices) {
      if (indices) {
        return indices.value.length;
      }

      var vertexCount = Infinity;

      for (var attributeName in attributes) {
        var attribute = attributes[attributeName];
        var value = attribute.value,
            size = attribute.size,
            constant = attribute.constant;

        if (!constant && value && size >= 1) {
          vertexCount = Math.min(vertexCount, value.length / size);
        }
      }

      if (!Number.isFinite(vertexCount)) {
        var _attribute = attributes.POSITION || attributes.positions;

        if (_attribute) {
          vertexCount = _attribute.value && _attribute.value.length / (_attribute.size || 3);
        }
      }

      (0, _utils.assert)(Number.isFinite(vertexCount));
      return vertexCount;
    }
  }, {
    key: "mode",
    get: function get() {
      return this.drawMode;
    }
  }]);
  return Geometry;
}();

exports["default"] = Geometry;
//# sourceMappingURL=geometry.js.map