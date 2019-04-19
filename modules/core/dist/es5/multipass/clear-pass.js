"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _pass = _interopRequireDefault(require("./pass"));

var ClearPass = function (_Pass) {
  (0, _inherits2["default"])(ClearPass, _Pass);

  function ClearPass(gl) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck2["default"])(this, ClearPass);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ClearPass).call(this, gl, Object.assign({
      id: 'clear-pass'
    }, props)));
  }

  (0, _createClass2["default"])(ClearPass, [{
    key: "_renderPass",
    value: function _renderPass(_ref) {
      var gl = _ref.gl;
      var _this$props$clearBits = this.props.clearBits,
          clearBits = _this$props$clearBits === void 0 ? 16384 | 256 : _this$props$clearBits;
      gl.clear(clearBits);
    }
  }]);
  return ClearPass;
}(_pass["default"]);

exports["default"] = ClearPass;
//# sourceMappingURL=clear-pass.js.map