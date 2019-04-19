import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import { Framebuffer } from '@luma.gl/webgl';

var RenderState = function () {
  function RenderState(gl) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, RenderState);

    this.gl = gl;
    this.framebuffer1 = new Framebuffer(gl, {
      id: 'multi-pass-1',
      stencil: true
    });
    this.framebuffer2 = new Framebuffer(gl, {
      id: 'multi-pass-2',
      stencil: true
    });
    this.reset();
  }

  _createClass(RenderState, [{
    key: "reset",
    value: function reset() {
      this.framebuffer1.resize();
      this.framebuffer2.resize();
      this.writeBuffer = this.framebuffer1;
      this.readBuffer = this.framebuffer2;
      this.maskActive = false;
    }
  }, {
    key: "_swapFramebuffers",
    value: function _swapFramebuffers() {
      var tmp = this.readBuffer;
      this.readBuffer = this.writeBuffer;
      this.writeBuffer = tmp;
    }
  }]);

  return RenderState;
}();

export { RenderState as default };
//# sourceMappingURL=render-state.js.map