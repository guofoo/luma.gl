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

var MaskPass = function (_Pass) {
  (0, _inherits2["default"])(MaskPass, _Pass);

  function MaskPass(gl, props) {
    var _this;

    (0, _classCallCheck2["default"])(this, MaskPass);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(MaskPass).call(this, gl, Object.assign({
      id: 'mask-pass'
    }, props)));
    _this.inverse = false;
    _this.clearStencil = true;
    return _this;
  }

  (0, _createClass2["default"])(MaskPass, [{
    key: "_renderPass",
    value: function _renderPass(_ref) {
      var gl = _ref.gl;
      var writeValue = 1;
      var clearValue = 0;

      if (this.inverse) {
        writeValue = 0;
        clearValue = 1;
      }

      gl.colorMask(false, false, false, false);
      gl.depthMask(false);
      gl.enable(2960);
      gl.stencilOp(7681, 7681, 7681);
      gl.stencilFunc(519, writeValue, 0xffffffff);
      gl.clearStencil(clearValue);
      gl.colorMask(true, true, true, true);
      gl.depthMask(true);
      gl.stencilFunc(514, 1, 0xffffffff);
      gl.stencilOp(7680, 7680, 7680);
    }
  }]);
  return MaskPass;
}(_pass["default"]);

exports["default"] = MaskPass;
//# sourceMappingURL=mask-pass.js.map