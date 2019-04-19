import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import ClipSpace from '../lib/clip-space';
import Pass from './pass';
var fs = "uniform sampler2D uDiffuseSampler;\nuniform float uOpacity;\n\nvarying vec2 uv;\n\nvoid main() {\n  vec4 texel = texture2D(uDiffuseSampler, uv);\n  gl_FragColor = uOpacity * texel;\n}\n";

var CopyPass = function (_Pass) {
  _inherits(CopyPass, _Pass);

  function CopyPass(gl) {
    var _this;

    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, CopyPass);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CopyPass).call(this, gl, Object.assign({
      id: 'copy-pass',
      swap: true
    }, props)));
    _this.clipspace = new ClipSpace(gl, {
      id: 'copy-pass',
      fs: fs
    });
    return _this;
  }

  _createClass(CopyPass, [{
    key: "_renderPass",
    value: function _renderPass(_ref) {
      var inputBuffer = _ref.inputBuffer;
      var _this$props$opacity = this.props.opacity,
          opacity = _this$props$opacity === void 0 ? 1.0 : _this$props$opacity;
      this.clipspace.draw({
        uniforms: {
          uDiffuseSampler: inputBuffer,
          uOpacity: opacity
        },
        parameters: {
          depthWrite: false,
          depthTest: false
        }
      });
    }
  }]);

  return CopyPass;
}(Pass);

export { CopyPass as default };
//# sourceMappingURL=copy-pass.js.map